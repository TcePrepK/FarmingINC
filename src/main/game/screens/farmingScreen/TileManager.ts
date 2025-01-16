import { createCanvas, getElementById } from "../../../core/HTMLUtils";
import { ButtonType } from "../../../core/MouseAttachment";
import { Vector2D } from "../../../core/Vector2D";
import { Root } from "../../Root";
import { InitializableObject } from "../../types/InitializableObject";
import { Background } from "../Background";
import { FarmLand } from "./FarmLand";

export class TileManager extends InitializableObject {
    private background: Background;
    private mouseCanvas!: HTMLCanvasElement;
    private farmTiles: Map<string, FarmLand> = new Map();
    private toggledTile: Vector2D | null = null;

    private readonly tileSize: number;

    public constructor(root: Root, background: Background, tileSize: number) {
        super(root);
        this.background = background;
        this.tileSize = tileSize;
    }

    public initialize(): void {
        this.mouseCanvas = createCanvas({ id: "mouse-canvas" });
        const padding = 16;
        this.mouseCanvas.width = this.tileSize + padding
        this.mouseCanvas.height = this.tileSize + padding;

        const farmingScreen = getElementById("farming-screen");
        farmingScreen.appendChild(this.mouseCanvas);

        { // Mouse movements and leaves
            this.root.windowMouse.onMove = () => {
                const mouse = this.root.windowMouse;
                const world = this.background.screenToWorld(mouse.x, mouse.y);
                const tile = world.div(this.tileSize).floor().mult(this.tileSize);
                const screen = this.background.worldToScreen(tile.x, tile.y);

                this.mouseCanvas.style.left = screen.x - padding / 2 + "px";
                this.mouseCanvas.style.top = screen.y - padding / 2 + "px";
            }

            this.root.windowMouse.onLeave = () => {
                this.mouseCanvas.style.left = "-100px";
                this.mouseCanvas.style.top = "-100px";
            }
        }

        { // Background updates
            this.background.onUpdate.add(() => {
                if (!this.toggledTile) {
                    return;
                }

                const tile = this.toggledTile;
                console.log(tile);
            });
        }

        { // Draw the background once
            const ctx = this.mouseCanvas.getContext("2d")!;

            const padding = 10;
            const radius = 10;
            const size = this.mouseCanvas.width;
            ctx.strokeStyle = "#4f3";
            ctx.lineWidth = 2;

            const left = padding;
            const right = size - padding;
            const top = padding;
            const bottom = size - padding;

            ctx.beginPath();
            ctx.moveTo(left + radius, top);
            ctx.lineTo(right - radius, top);
            ctx.arc(right - radius, top + radius, radius, -Math.PI / 2, 0);
            ctx.lineTo(right, bottom - radius);
            ctx.arc(right - radius, bottom - radius, radius, 0, Math.PI / 2);
            ctx.lineTo(left + radius, bottom);
            ctx.arc(left + radius, bottom - radius, radius, Math.PI / 2, Math.PI);
            ctx.lineTo(left, top + radius);
            ctx.arc(left + radius, top + radius, radius, Math.PI, Math.PI * 3 / 2);
            ctx.closePath();
            ctx.stroke();
        }

        { // Tile placement
            this.background.attachment.onClick = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                const world = this.background.screenToWorld(this.root.windowMouse.x, this.root.windowMouse.y);
                this.toggledTile = world.div(this.tileSize).floor();
            }
        }
    }

    public getFarmTile(x: number, y: number): FarmLand | null {
        return this.farmTiles.get(this.getId(x, y)) || null;
    }

    public createFarmTile(x: number, y: number): FarmLand {
        const id = this.getId(x, y);
        if (this.farmTiles.has(id)) return this.farmTiles.get(id)!;

        const farmLand = new FarmLand(this.root, x, y);
        this.farmTiles.set(id, farmLand);
        return farmLand;
    }

    private getId(x: number, y: number): string {
        return `(${x}, ${y})`;
    }
}
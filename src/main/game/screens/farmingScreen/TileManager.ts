import { DraggableElement } from "../../../core/DraggableElement";
import { createCanvas, getElementById } from "../../../core/HTMLUtils";
import { ButtonType } from "../../../core/MouseAttachment";
import { Rectangle } from "../../../core/Rectangle";
import { Vector2D } from "../../../core/Vector2D";
import { Root } from "../../Root";
import { InitializableObject } from "../../types/InitializableObject";
import { Background } from "../Background";
import { FarmLand } from "./FarmLand";
import { FarmTileImage } from "./FarmTileImage.ts";

export class TileManager extends InitializableObject {
    private background: Background;
    private mouseCanvas!: HTMLCanvasElement;
    private farmTiles: Map<string, FarmLand> = new Map();

    private readonly farmTilesBody: HTMLDivElement;
    public farmRect: Rectangle;

    private grabbingTile: FarmLand | null = null;
    private dragging: DraggableElement | null = null;

    /**
     * Creates a new instance of the tile manager
     * @param root The root of the game
     * @param background The background of the game
     */
    public constructor(root: Root, background: Background) {
        super(root);
        this.background = background;

        // Get the farm-tiles element
        this.farmTilesBody = getElementById("farm-tiles");

        // Initialize the first farming area, first 4x4 area
        this.farmRect = new Rectangle(-2, -2, 4, 4);
    }

    public initialize(): void {
        if (!FarmTileImage.loaded) {
            FarmTileImage.loadedImage.add(() => this.initialize());
            return;
        }

        const tileSize = this.root.tileSize;

        { // Farm tile placement
            this.farmTilesBody.style.width = tileSize * this.farmRect.width + "px";
            this.farmTilesBody.style.height = tileSize * this.farmRect.height + "px";

            this.background.onUpdate.add(() => {
                const center = this.background.getCenter();
                this.farmTilesBody.style.left = center.x + "px";
                this.farmTilesBody.style.top = center.y + "px";
            });

            const center = this.background.getCenter();
            this.farmTilesBody.style.left = center.x + "px";
            this.farmTilesBody.style.top = center.y + "px";
        }

        { // Mouse movements and leaves
            this.root.windowMouse.onMove = () => {
                const mouse = this.root.windowMouse;
                const world = this.background.screenToWorld(mouse.x, mouse.y);
                const tile = world.div(tileSize).floor().mult(tileSize);
                const screen = this.background.worldToScreen(tile.x, tile.y);

                this.mouseCanvas.style.left = screen.x + "px";
                this.mouseCanvas.style.top = screen.y + "px";
            }

            this.root.windowMouse.onLeave = () => {
                this.mouseCanvas.style.left = "-100px";
                this.mouseCanvas.style.top = "-100px";
            }
        }

        { // Initialize the mouse canvas
            this.mouseCanvas = createCanvas({ id: "mouse-canvas" });
            this.mouseCanvas.width = tileSize;
            this.mouseCanvas.height = tileSize;
            this.mouseCanvas.style.visibility = "hidden";

            const farmingScreen = getElementById("farming-screen");
            farmingScreen.appendChild(this.mouseCanvas);

            const ctx = this.mouseCanvas.getContext("2d")!;

            const padding = 4;
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

        { // Tile replacement
            const attachment = this.background.attachment;

            let grabbingPosition: Vector2D | null = null;
            let grabbingTimeout: number | null = null;
            attachment.onDown = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;

                const screenX = this.root.windowMouse.x;
                const screenY = this.root.windowMouse.y;
                const tile = this.screenToTile(screenX, screenY);
                this.grabbingTile = this.getFarmTile(tile.x, tile.y);
                if (!this.grabbingTile) return;

                grabbingPosition = tile;
                this.grabbingTile.body.classList.add("grabbing");

                this.background.grabbing = false;
                grabbingTimeout = setTimeout(() => {
                    // Add grabbed
                    this.grabbingTile!.body.classList.add("grabbed");
                    this.background.grabbing = false;

                    // Make mouse canvas visible
                    this.mouseCanvas.style.visibility = "visible";

                    // Generate the dragging
                    this.dragging = new DraggableElement(this.root, this.grabbingTile!.cloneBody());

                    const world = this.background.screenToWorld(screenX, screenY).div(tileSize);
                    const tileOffset = world.sub(tile);
                    this.dragging.setHolding(tileOffset.x, tileOffset.y);

                    grabbingTimeout = null;
                }, 1000);
            }

            attachment.onMove = () => {
                if (!grabbingTimeout) return;
                if (!grabbingPosition) return;

                const mouseX = this.root.windowMouse.x;
                const mouseY = this.root.windowMouse.y;
                const tile = this.screenToTile(mouseX, mouseY);
                if (tile.x === grabbingPosition.x && tile.y === grabbingPosition.y) {
                    return;
                }

                this.stopDragging();
                clearTimeout(grabbingTimeout);
                grabbingTimeout = null;
            }

            attachment.onUp = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;

                if (grabbingTimeout) {
                    clearTimeout(grabbingTimeout);
                    grabbingTimeout = null;
                }

                if (!this.grabbingTile) {
                    return;
                }

                const classList = this.grabbingTile.body.classList;

                // Add the drop-pop class to get the little pop effect
                classList.add("drop-pop");
                setTimeout(() => classList.remove("drop-pop"), 200);

                const mouseX = this.root.windowMouse.x;
                const mouseY = this.root.windowMouse.y;
                const tile = this.screenToTile(mouseX, mouseY);

                const inFarmRect = this.farmRect.contains(tile.x, tile.y);
                const hoveredTile = this.getFarmTile(tile.x, tile.y);
                if (inFarmRect && !hoveredTile) {
                    const prevID = this.getId(this.grabbingTile.x, this.grabbingTile.y);
                    const newID = this.getId(tile.x, tile.y);

                    this.farmTiles.delete(prevID);
                    this.farmTiles.set(newID, this.grabbingTile);
                    this.grabbingTile.updatePosition(tile.x, tile.y, this.farmRect);
                }

                this.stopDragging();
            }

            // attachment.onLeave = () => {
            //     this.stopDragging();
            //     clearTimeout(grabbingTimeout!);
            //     grabbingTimeout = null;
            // }
        }

        // We start with a single farm tile
        this.addFarmTile();
    }

    /**
     * Updates the dragging element
     * @param dt The passed delta time
     */
    public update(dt: number): void {
        if (!this.dragging) return;
        this.dragging.update(dt);
    }

    /**
     * Gets the farm tile at the given coordinates
     * @param x The x coordinate of the tile
     * @param y The y coordinate of the tile
     *
     * @returns The farm tile at the given coordinates or null if it doesn't exist
     */
    public getFarmTile(x: number, y: number): FarmLand | null {
        return this.farmTiles.get(this.getId(x, y)) || null;
    }

    /**
     * Checks if the given coordinates are inside the farm
     * @param x The x coordinate of the tile
     * @param y The y coordinate of the tile
     *
     * @returns True if the coordinates are inside the farm, false otherwise
     */
    public isInsideFarm(x: number, y: number): boolean {
        return this.farmRect.contains(x, y);
    }

    /**
     * Adda a new farm tile to the farm and initializes it.
     * The Maximum number of tiles is 4x4.
     *
     * # Errors
     * - If the farm is full
     */
    public addFarmTile(): void {
        const maxTiles = this.farmRect.width * this.farmRect.height;
        if (this.farmTiles.size >= maxTiles) {
            throw new Error("Farm is full, can't add more tiles!");
        }

        for (let j = this.farmRect.top; j < this.farmRect.bottom; j++) {
            for (let i = this.farmRect.left; i < this.farmRect.right; i++) {
                const id = this.getId(i, j);
                if (this.farmTiles.has(id)) continue;

                const farmLand = new FarmLand(this.root, i, j);
                const tileImage = FarmTileImage.tileImage;
                farmLand.createElement(this.farmTilesBody);
                farmLand.drawTileImage(tileImage);
                farmLand.updatePosition(i, j, this.farmRect);

                this.farmTiles.set(id, farmLand);
                return;
            }
        }
    }

    /**
     * If the user is dragging a tile, this method stops the dragging.
     * Which involves:
     * - Setting the mouse canvas invisible
     * - Destroying the dragging element
     * @private
     */
    private stopDragging(): void {
        if (!this.grabbingTile) return;

        // Set mouse canvas invisible
        this.mouseCanvas.style.visibility = "hidden";

        // Remove the grabbing/grabbed whenever the tile is dropped
        this.grabbingTile.body.classList.remove("grabbing");
        this.grabbingTile.body.classList.remove("grabbed");

        this.grabbingTile = null;
        this.dragging?.destroy();
        this.dragging = null;
    }

    /**
     * Gets the id of a tile at the given coordinates
     * @param x The x coordinate of the tile
     * @param y The y coordinate of the tile
     * @returns The id of the tile at the given coordinates
     * @private
     */
    private getId(x: number, y: number): string {
        return `(${x}, ${y})`;
    }

    /**
     * Converts a screen coordinate to a tile coordinate
     * @param x The x coordinate of the screen
     * @param y The y coordinate of the screen
     * @returns The tile coordinate
     * @private
     */
    private screenToTile(x: number, y: number): Vector2D {
        const world = this.background.screenToWorld(x, y);
        return world.div(this.root.tileSize).floor();
    }
}
import { createCanvas } from "../../../core/HTMLUtils";
import { Root } from "../../Root";
import { BaseScreen } from "../../types/BaseScreen";
import { Background } from "../Background";
import { TechTree } from "./TechTree";

export class TechnologyScreen extends BaseScreen {
    private background!: Background;
    private tileCanvas!: HTMLCanvasElement;

    private readonly tileSize = 100;

    private readonly techTree: TechTree;

    public constructor(root: Root) {
        super(root, "technology");

        this.background = new Background(root, "technology-background");
        this.techTree = new TechTree(root);
    }

    public initialize(): void {
        this.background.initialize();
        this.background.onCenterChange.add(this.updateWorldTransform.bind(this));

        this.techTree.initialize();

        this.setupTileCanvas();
        this.updateWorldTransform();
    }

    public update(dt: number): void {
        this.techTree.update(dt);
    }

    public updateFrame(): void {
        this.drawBackground();
        this.updateWorldTransform();
    }

    private updateWorldTransform(): void {
        const center = this.background.getCenter();
        this.techTree.updateWorldTransform(center.x, center.y);
    }

    /* ------------------- Drawing Background ------------------- */

    /**
     * Draws singular tile to its own canvas once then just copy/pastes it in draw calls
     * @private
     */
    private setupTileCanvas(): void {
        this.tileCanvas = createCanvas();

        const size = this.tileSize;
        this.tileCanvas.width = size;
        this.tileCanvas.height = size;

        const ctx = this.tileCanvas.getContext("2d")!;

        // Background, for circle design corners
        ctx.fillStyle = "#569";
        ctx.fillRect(0, 0, size, size);

        // Inner circle, dark blue area
        ctx.fillStyle = "#303f66";
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.65, 0, 2.0 * Math.PI);
        ctx.fill();

        // The lines that separate grids
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#569";
        ctx.strokeRect(0, 0, size, size);
    }

    /**
     * Draws the current grid design we are using to every tile position (canvas to canvas)
     * @private
     */
    private drawBackground(): void {
        this.background.startDrawing();

        const ctx = this.background.context;

        const w = this.root.windowWidth;
        const h = this.root.windowHeight;
        const x = this.background.worldX;
        const y = this.background.worldY;

        const right = Math.floor((w / 2 - x) / this.tileSize);
        const bottom = Math.floor((h / 2 - y) / this.tileSize);
        const left = Math.floor((-w / 2 - x) / this.tileSize);
        const top = Math.floor((-h / 2 - y) / this.tileSize);

        for (let i = left; i <= right; i++) {
            for (let j = top; j <= bottom; j++) {
                ctx.drawImage(this.tileCanvas, i * this.tileSize, j * this.tileSize);
            }
        }

        this.background.finalizeDrawing();
    }
}
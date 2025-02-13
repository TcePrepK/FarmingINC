import { mkAlea } from "../../../core/AleaPRNG";
import { ButtonType } from "../../../core/MouseAttachment";
import { Rectangle } from "../../../core/Rectangle";
import { mkSimplexNoise } from "../../../core/SimplexNoise";
import { Root } from "../../Root";
import { BaseScreen } from "../../types/BaseScreen";
import { Background } from "../Background";
import { FlowerSet } from "./FlowerSet";
import { GrassTileSet } from "./GrassTileSet";
import { Inventory } from "./Inventory";
import { TileManager } from "./TileManager";

export class FarmingScreen extends BaseScreen {
    public background!: Background;

    private readonly tileSize = 63;
    private readonly grassTileSet = new GrassTileSet();
    private readonly flowerSet = new FlowerSet();

    public tileManager: TileManager;
    public inventory = new Inventory(this.root);

    public constructor(root: Root) {
        super(root, "farming");

        this.background = new Background(root, "farming-background");
        this.tileManager = new TileManager(root, this.background, this.tileSize);

        // this.farmTileSet.loadedEvent.add(() => this.drawBackground());
        // this.grassTileSet.loadedEvent.add(() => this.drawBackground());
        // this.flowerSet.loadedEvent.add(() => this.drawBackground());
    }

    public initialize(): void {
        this.background.initialize();
        this.inventory.initialize();
        this.tileManager.initialize();

        { // Background events
            this.background.attachment.onClick = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                this.inventory.completelyClose();
            };
        }

    }

    public update(dt: number): void {
        this.inventory.update(dt);
        this.tileManager.update(dt);
    }

    public updateFrame(): void {
        this.drawBackground();
        this.inventory.updateFrame();
        this.tileManager.updateFrame();
    }

    /* ----------------- Helper Drawing Methods ----------------- */

    /**
     * For every tile position, we draw the necessary elements (canvas to canvas)
     * For farm tiles, we draw the farm itself.
     * For grass tiles, we draw the grass itself and add flowers.
     * @private
     */
    private drawBackground(): void {
        if (!this.grassTileSet.loaded) return;
        if (!this.flowerSet.loaded) return;

        const ctx = this.background.context;
        ctx.imageSmoothingEnabled = false;

        this.background.startDrawing();

        const renderRect = this.background.renderRect;
        const farmRect = this.tileManager.farmRect;
        const expandedRect = farmRect.expandBy(1, 1);

        const scale = Math.ceil(this.tileSize / 32);

        // Draw the grass
        const { random } = mkAlea(this.root.seed);
        const { noise2D } = mkSimplexNoise(random);
        const rect = renderRect.scaleBy(1 / this.tileSize).floor();
        for (let i = rect.left; i <= rect.right + 1; i++) {
            for (let j = rect.top; j <= rect.bottom + 1; j++) {
                ctx.translate(i * this.tileSize, j * this.tileSize);
                ctx.scale(scale, scale);

                // If the <i, j> is inside the farm, draw the farm otherwise draw grass
                if (farmRect.contains(i, j)) {
                    ctx.fillStyle = "#e4a672";
                    ctx.fillRect(0, 0, 32, 32);
                } else {
                    this.drawGrass(ctx, noise2D, i, j, expandedRect);
                }

                ctx.scale(1 / scale, 1 / scale);
                ctx.translate(-i * this.tileSize, -j * this.tileSize);
            }
        }

        // Draw the flowers
        for (let i = rect.left; i <= rect.right + 1; i++) {
            for (let j = rect.top; j <= rect.bottom + 1; j++) {
                if (expandedRect.contains(i, j)) continue;

                ctx.translate(i * this.tileSize, j * this.tileSize);
                ctx.scale(scale, scale);

                const farmTile = this.tileManager.getFarmTile(i, j);
                const neighbors = this.getNeighbors(i, j);
                if (!farmTile && neighbors.every(n => !n)) {
                    for (let dx = 0; dx < 2; dx++) {
                        for (let dy = 0; dy < 2; dy++) {
                            const x = i * 2 + dx;
                            const y = j * 2 + dy;

                            const { random } = mkAlea(`${this.root.seed} (${x}, ${y})`);
                            if (random() > 0.2) continue;

                            const image = this.flowerSet.getFlower(random);
                            const offX = random() * 16 - 8;
                            const offY = random() * 16 - 8;
                            const rotation = (random() - 0.5) * 0.4;
                            if (image) {
                                ctx.translate(dx * 16 + 8, dy * 16 + 8);
                                ctx.rotate(rotation);
                                ctx.drawImage(image, offX - 8, offY - 8);
                                ctx.rotate(-rotation);
                                ctx.translate(-dx * 16 - 8, -dy * 16 - 8);
                            }
                        }
                    }
                }

                ctx.scale(1 / scale, 1 / scale);
                ctx.translate(-i * this.tileSize, -j * this.tileSize);
            }
        }

        this.background.finalizeDrawing();
    }

    /**
     * Draws a grass tile.
     * Each quadrant of the tile is drawn with a different color.
     * The color is determined by the noise function.
     * @param ctx The canvas context to draw on
     * @param noise2D The noise function to use
     * @param i The x coordinate of the tile
     * @param j The y coordinate of the tile
     * @param expandedRect The farm rectangle expanded by one tile
     * @private
     */
    private drawGrass(ctx: CanvasRenderingContext2D, noise2D: (x: number, y: number) => number, i: number, j: number, expandedRect: Rectangle): void {
        for (let dx = 0; dx < 2; dx++) {
            for (let dy = 0; dy < 2; dy++) {
                const x = i * 2 + dx;
                const y = j * 2 + dy;

                const ds = 25;
                const dc = noise2D(x / ds, y / ds) * 15;
                ctx.fillStyle = `rgb(${62 + dc} ${137 + dc} ${72 + dc})`;
                ctx.fillRect(dx * 16 + 1, dy * 16 + 1, 17, 17);
            }
        }

        if (!expandedRect.contains(i, j)) return;

        const neighbors = this.getNeighbors(i, j);
        const state = this.grassTileSet.getTextureByRules(neighbors)!;
        ctx.drawImage(state, 0, 0);
    }

    /**
     * Checks all eight neighbors of the given tile and returns an array of booleans
     * @param x The x coordinate of the tile
     * @param y The y coordinate of the tile
     * @private
     */
    private getNeighbors(x: number, y: number): Array<boolean> {
        return [
            this.tileManager.isInsideFarm(x - 1, y - 1),
            this.tileManager.isInsideFarm(x, y - 1),
            this.tileManager.isInsideFarm(x + 1, y - 1),
            this.tileManager.isInsideFarm(x - 1, y),
            this.tileManager.isInsideFarm(x + 1, y),
            this.tileManager.isInsideFarm(x - 1, y + 1),
            this.tileManager.isInsideFarm(x, y + 1),
            this.tileManager.isInsideFarm(x + 1, y + 1)
        ];
    }
}
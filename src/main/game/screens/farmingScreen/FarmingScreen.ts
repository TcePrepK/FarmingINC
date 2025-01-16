import { mkAlea } from "../../../core/AleaPRNG";
import { ButtonType } from "../../../core/MouseAttachment";
import { mkSimplexNoise } from "../../../core/SimplexNoise";
import { Root } from "../../Root";
import { BaseScreen } from "../../types/BaseScreen";
import { Background } from "../Background";
import { FarmTileSet } from "./FarmTileSet";
import { FlowerSet } from "./FlowerSet";
import { GrassTileSet } from "./GrassTileSet";
import { Inventory } from "./Inventory";
import { TileManager } from "./TileManager";

export class FarmingScreen extends BaseScreen {
    public background!: Background;

    private readonly tileSize = 63;
    private readonly farmTileSet = new FarmTileSet();
    private readonly grassTileSet = new GrassTileSet();
    private readonly flowerSet = new FlowerSet();

    public tileManager;
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
            this.background.onUpdate.add(() => {
                // this.drawBackground();
            });
        }

    }

    public update(dt: number): void {
        this.inventory.update(dt);
    }

    public updateFrame(): void {
        this.drawBackground();
        this.inventory.updateFrame();
        this.tileManager.updateFrame();
    }

    /* ----------------- Helper Drawing Methods ----------------- */

    /**
     * Draws the current grid design we are using to every tile position (canvas to canvas)
     * @private
     */
    private drawBackground(): void {
        if (!this.farmTileSet.loaded) return;
        if (!this.grassTileSet.loaded) return;
        if (!this.flowerSet.loaded) return;

        const ctx = this.background.context;
        ctx.imageSmoothingEnabled = false;

        this.background.startDrawing();

        const renderRect = this.background.renderRect;
        const scale = Math.ceil(this.tileSize / 32);

        const { random } = mkAlea(this.root.seed);
        const { noise2D } = mkSimplexNoise(random);
        const rect = renderRect.scaleBy(1 / this.tileSize).floor();
        for (let i = rect.left; i <= rect.right + 1; i++) {
            for (let j = rect.top; j <= rect.bottom + 1; j++) {
                ctx.translate(i * this.tileSize, j * this.tileSize);
                ctx.scale(scale, scale);

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
                // const ds = 10;
                // const dc = noise2D(i / ds, j / ds) * 10;
                // ctx.fillStyle = `rgb(${62 + dc} ${137 + dc} ${72 + dc})`;
                // ctx.fillRect(1, 1, 32, 32);

                const farmTile = this.tileManager.getFarmTile(i, j);
                const tileSet = farmTile ? this.farmTileSet : this.grassTileSet;
                const neighbors = this.getNeighbors(i, j);
                const state = tileSet.getTextureByRules(neighbors)!;

                ctx.drawImage(state, 0, 0);

                ctx.scale(1 / scale, 1 / scale);
                ctx.translate(-i * this.tileSize, -j * this.tileSize);
            }
        }

        for (let i = rect.left; i <= rect.right + 1; i++) {
            for (let j = rect.top; j <= rect.bottom + 1; j++) {
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

    private getNeighbors(x: number, y: number): Array<boolean> {
        return [
            !!this.tileManager.getFarmTile(x - 1, y - 1),
            !!this.tileManager.getFarmTile(x, y - 1),
            !!this.tileManager.getFarmTile(x + 1, y - 1),
            !!this.tileManager.getFarmTile(x - 1, y),
            !!this.tileManager.getFarmTile(x + 1, y),
            !!this.tileManager.getFarmTile(x - 1, y + 1),
            !!this.tileManager.getFarmTile(x, y + 1),
            !!this.tileManager.getFarmTile(x + 1, y + 1)
        ];
    }
}
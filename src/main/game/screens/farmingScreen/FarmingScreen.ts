import { ButtonType } from "../../../core/MouseAttachment";
import { Root } from "../../Root";
import { BaseScreen } from "../../types/BaseScreen";
import { BaseTileSet } from "../../types/BaseTileSet";
import { Background } from "../Background";
import { FarmLand } from "./FarmLand";
import { FarmTileSet } from "./FarmTileSet";
import { GrassTileSet } from "./GrassTileSet";
import { Inventory } from "./Inventory";

export class FarmingScreen extends BaseScreen {
    public background!: Background;

    private readonly tileSize = 127;
    private readonly farmTileSet = new FarmTileSet();
    private readonly grassTileSet = new GrassTileSet();

    private farmTiles: Map<string, FarmLand> = new Map();

    public inventory = new Inventory(this.root);

    public constructor(root: Root) {
        super(root, "farming");

        this.background = new Background(root, "farming-background");

        this.farmTileSet.loadedEvent.add(() => this.drawBackground());
        this.grassTileSet.loadedEvent.add(() => this.drawBackground());
    }

    public initialize(): void {
        this.background.initialize();
        // this.farmingBackground.scss.onCenterChange.add(this.updateWorldTransform.bind(this));

        { // Background events
            this.background.attachment.onClick = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                this.inventory.completelyClose();
            };
            this.background.onUpdate.add(() => {
                this.drawBackground();
            });
        }

        this.inventory.initialize();

        this.background.attachment.onClickRaw = (event: MouseEvent) => {
            if (event.button !== ButtonType.LEFT) return;
            const world = this.background.screenToWorld(event.offsetX, event.offsetY);
            const tile = world.div(this.tileSize).floor();

            const farmLand = new FarmLand(this.root, tile.x, tile.y);
            this.farmTiles.set(tile.toString(), farmLand);
            this.drawBackground();
        }
    }

    public update(dt: number): void {
        this.inventory.update(dt);
    }

    public updateFrame(): void {
        this.inventory.updateFrame();
    }

    /* ----------------- Helper Drawing Methods ----------------- */

    /**
     * Draws the current grid design we are using to every tile position (canvas to canvas)
     * @private
     */
    private drawBackground(): void {
        if (!this.farmTileSet.loaded) return;
        if (!this.grassTileSet.loaded) return;

        this.background.startDrawing();

        const ctx = this.background.context;
        ctx.imageSmoothingEnabled = false;

        const renderRect = this.background.renderRect;
        const scale = Math.ceil(this.tileSize / 32);

        const rect = renderRect.scaleBy(1 / this.tileSize).floor();
        for (let i = rect.left; i <= rect.right + 1; i++) {
            for (let j = rect.top; j <= rect.bottom + 1; j++) {
                ctx.translate(i * this.tileSize, j * this.tileSize);
                ctx.scale(scale, scale);
                const tileSet = this.farmTiles.has(`(${i}, ${j})`) ? this.farmTileSet : this.grassTileSet;
                const state = this.checkState(i, j, tileSet);
                ctx.drawImage(state, 0, 0);
                ctx.scale(1 / scale, 1 / scale);
                ctx.translate(-i * this.tileSize, -j * this.tileSize);
            }
        }

        this.background.finalizeDrawing();
    }

    private checkState(x: number, y: number, tileSet: BaseTileSet): HTMLCanvasElement {
        const neighbors = [
            !!this.farmTiles.get(`(${x - 1}, ${y - 1})`),
            !!this.farmTiles.get(`(${x}, ${y - 1})`),
            !!this.farmTiles.get(`(${x + 1}, ${y - 1})`),
            !!this.farmTiles.get(`(${x - 1}, ${y})`),
            !!this.farmTiles.get(`(${x + 1}, ${y})`),
            !!this.farmTiles.get(`(${x - 1}, ${y + 1})`),
            !!this.farmTiles.get(`(${x}, ${y + 1})`),
            !!this.farmTiles.get(`(${x + 1}, ${y + 1})`)
        ];
        return tileSet.getTextureByRules(neighbors)!;
    }
}
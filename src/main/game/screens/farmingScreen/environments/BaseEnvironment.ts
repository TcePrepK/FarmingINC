import { mkAlea } from "../../../../core/AleaPRNG";
import { mkSimplexNoise } from "../../../../core/SimplexNoise";
import { Root } from "../../../Root";
import { Background } from "../../Background";
import { FlowerImage } from "../FlowerImage";
import { GrassTileSet } from "../GrassTileSet";
import { TileManager } from "../TileManager";

export abstract class BaseEnvironment {
    protected readonly root: Root;

    protected readonly background: Background;
    protected readonly tileManager: TileManager;

    protected readonly grassTileSet = new GrassTileSet();
    protected readonly flowerSet = new FlowerImage();

    protected readonly random: () => number;
    protected readonly noise2D: (x: number, y: number) => number;

    public constructor(root: Root, background: Background, tileManager: TileManager) {
        this.root = root;
        this.background = background;
        this.tileManager = tileManager;

        const { random } = mkAlea(this.root.seed);
        const { noise2D } = mkSimplexNoise(random);
        this.random = random;
        this.noise2D = noise2D;
    }

    public drawEnvironment(): void {
        if (!this.grassTileSet.loaded) return;
        if (!this.flowerSet.loaded) return;

        this.drawBackground();
    }

    /**
     * For every tile position, we draw the necessary elements (canvas to canvas)
     * For farm tiles, we draw the farm itself.
     * For grass tiles, we draw the grass itself and add flowers.
     *
     * # Does nothing
     * - If the grass tile set or flower set is not loaded
     * @private
     */
    public abstract drawBackground(): void;

    /**
     * Checks all eight neighbors of the given tile and returns an array of booleans
     * @param x The x coordinate of the tile
     * @param y The y coordinate of the tile
     * @private
     */
    protected getNeighbors(x: number, y: number): Array<boolean> {
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
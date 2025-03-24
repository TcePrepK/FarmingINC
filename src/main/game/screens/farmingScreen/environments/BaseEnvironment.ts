import { mkAlea } from "../../../../core/AleaPRNG";
import { mkSimplexNoise } from "../../../../core/SimplexNoise";
import { Root } from "../../../Root";
import { Background } from "../../Background";
import { TileManager } from "../TileManager";

export abstract class BaseEnvironment {
    protected readonly root: Root;

    protected readonly background: Background;
    protected readonly tileManager: TileManager;

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
        this.drawBackground();
        this.drawForeground();
    }

    /**
     * Draws background elements such as grass and farm tiles for starting environment.
     * @private
     */
    public abstract drawBackground(): void;

    /**
     * Draws foreground elements such as flowers for starting environment.
     * @private
     */
    public abstract drawForeground(): void;

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
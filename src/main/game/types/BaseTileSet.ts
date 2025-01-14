import { Signal } from "../../core/Signal";

export abstract class BaseTileSet {
    public readonly sides: Array<string> = [];
    public readonly imagesByName: Map<string, HTMLImageElement> = new Map();
    public readonly texturesByHash: Array<HTMLCanvasElement> = [];

    public loaded = false;
    public readonly loadedEvent: Signal<[]> = new Signal();

    public abstract getTextureByRules(neighbors: Array<boolean>): HTMLCanvasElement | null;

    protected loadImages(): Promise<Array<{ name: string, image: HTMLImageElement }>> {
        return Promise.all(
            this.sides.map((name) => {
                return new Promise<{ name: string, image: HTMLImageElement }>((resolve, reject) => {
                    const image = new Image();
                    const src = `assets/images/tiles/${name}.png`;
                    image.src = src;
                    image.onload = () => resolve({ name, image });
                    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                });
            })
        );
    }

    protected abstract createTexturesByRules(): void;

    protected hashToNeighbors(hash: number): Array<boolean> {
        const neighbors = Array(8).fill(false);
        for (let i = 0; i < 8; i++) {
            neighbors[i] = (hash & (1 << i)) !== 0;
        }
        return neighbors;
    }

    protected neighborsToHash(neighbors: Array<boolean>): number {
        return neighbors.reduce((acc, cur, i) => acc + (cur ? 1 << i : 0), 0);
    }
}
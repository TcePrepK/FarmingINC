import { createCanvas } from "../../../core/HTMLUtils";
import { BaseTileSet } from "../../types/BaseTileSet";

export class GrassTileSet extends BaseTileSet {
    public readonly sides = ["grass-corner", "grass-side", "grass-middle", "grass-outer-corner"];

    public constructor() {
        super();

        const promises = this.loadImages();
        promises.then(images => {
            for (const { name, image } of images) {
                this.imagesByName.set(name, image);
            }
            this.createTexturesByRules();
        });
    }

    public getTextureByRules(neighbors: Array<boolean>): HTMLCanvasElement | null {
        const hash = this.neighborsToHash(neighbors);
        const texture = this.texturesByHash[hash];
        if (!texture) {
            throw new Error(`No texture for neighbors: ${neighbors.join(", ")}`);
        }
        return texture;
    }

    protected createTexturesByRules(): void {
        for (let hash = 0; hash < 2 ** 8; hash++) {
            const neighbors = this.hashToNeighbors(hash);

            const canvas = createCanvas();
            canvas.width = 32;
            canvas.height = 32;

            const ctx = canvas.getContext("2d")!;

            const corner = this.imagesByName.get("grass-corner")!;
            const outerCorner = this.imagesByName.get("grass-outer-corner")!;
            const side = this.imagesByName.get("grass-side")!;
            const middle = this.imagesByName.get("grass-middle")!;

            const sidesByCorner = [[3, 0, 1], [1, 2, 4], [6, 5, 3], [4, 7, 6]];
            const rotationsByCorner = [0, Math.PI / 2, -Math.PI / 2, Math.PI];
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    const cornerIdx = x + 2 * y;
                    const sides = sidesByCorner[cornerIdx];
                    const rotation = rotationsByCorner[cornerIdx];

                    const left = neighbors[sides[0]];
                    const top_left = neighbors[sides[1]];
                    const top = neighbors[sides[2]];

                    ctx.save();
                    ctx.translate(x * 16 + 8, y * 16 + 8);
                    ctx.rotate(rotation);
                    if (left && top_left && top) {
                        ctx.drawImage(corner, -8, -8);
                    } else if (!left && top) {
                        ctx.rotate(Math.PI / 2);
                        ctx.drawImage(side, -8, -8);
                    } else if (left && !top) {
                        ctx.drawImage(side, -8, -8);
                    } else if (!left && !top && top_left) {
                        ctx.drawImage(outerCorner, -8, -8);
                    } else if (left && top && !top_left) {
                        ctx.drawImage(corner, -8, -8);
                    } else {
                        ctx.drawImage(middle, -8, -8);
                    }
                    ctx.restore();
                }
            }

            this.texturesByHash[hash] = canvas;
        }

        this.loaded = true;
        this.loadedEvent.dispatch();
    }
}
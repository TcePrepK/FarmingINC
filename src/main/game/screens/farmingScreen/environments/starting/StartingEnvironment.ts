import { mkAlea } from "../../../../../core/AleaPRNG.ts";
import { Rectangle } from "../../../../../core/Rectangle.ts";
import { BaseEnvironment } from "../BaseEnvironment.ts";
import { FlowerImage } from "./FlowerImage.ts";
import { GrassTileSet } from "./GrassTileSet.ts";

export class StartingEnvironment extends BaseEnvironment {
    protected readonly grassTileSet = new GrassTileSet();
    protected readonly flowerSet = new FlowerImage();

    public drawBackground(): void {
        if (!this.grassTileSet.loaded) return;

        const ctx = this.background.context;
        ctx.imageSmoothingEnabled = false;

        this.background.startDrawing();

        const renderRect = this.background.renderRect;
        const farmRect = this.tileManager.farmRect;
        const tileSize = this.root.tileSize;
        const scale = Math.ceil(tileSize / 32);

        // Draw the grass
        const rect = renderRect.scaleBy(1 / tileSize).floor();
        for (let i = rect.left; i <= rect.right + 1; i++) {
            for (let j = rect.top; j <= rect.bottom + 1; j++) {
                ctx.translate(i * tileSize, j * tileSize);
                ctx.scale(scale, scale);

                // If the <i, j> is inside the farm, draw the farm otherwise draw grass
                if (farmRect.contains(i, j)) {
                    ctx.fillStyle = "#e4a672";
                    ctx.fillRect(0, 0, 32, 32);
                } else {
                    this.drawGrass(ctx, i, j, farmRect);
                }

                ctx.scale(1 / scale, 1 / scale);
                ctx.translate(-i * tileSize, -j * tileSize);
            }
        }

        this.background.finalizeDrawing();
    }

    public drawForeground() {
        if (!this.flowerSet.loaded) return;
        
        const ctx = this.background.context;

        this.background.startDrawing();

        const renderRect = this.background.renderRect;
        const farmRect = this.tileManager.farmRect;
        const tileSize = this.root.tileSize;
        const scale = Math.ceil(tileSize / 32);
        const rect = renderRect.scaleBy(1 / tileSize).floor();

        // Draw the flowers
        const expandedRect = farmRect.expandBy(1, 1);
        for (let i = rect.left; i <= rect.right + 1; i++) {
            for (let j = rect.top; j <= rect.bottom + 1; j++) {
                if (expandedRect.contains(i, j)) continue;

                ctx.translate(i * tileSize, j * tileSize);
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
                ctx.translate(-i * tileSize, -j * tileSize);
            }
        }

        this.background.finalizeDrawing();
    }

    /**
     * Draws a grass tile.
     * Each quadrant of the tile is drawn with a different color.
     * The color is determined by the noise function.
     * @param ctx The canvas context to draw on
     * @param i The x coordinate of the tile
     * @param j The y coordinate of the tile
     * @param farmRect The farm rectangle
     * @private
     */
    private drawGrass(ctx: CanvasRenderingContext2D, i: number, j: number, farmRect: Rectangle): void {
        for (let dx = 0; dx < 2; dx++) {
            for (let dy = 0; dy < 2; dy++) {
                const x = i * 2 + dx;
                const y = j * 2 + dy;

                const ds = 25;
                const dc = this.noise2D(x / ds, y / ds) * 15;
                ctx.fillStyle = `rgb(${62 + dc} ${137 + dc} ${72 + dc})`;
                ctx.fillRect(dx * 16 + 1, dy * 16 + 1, 17, 17);
            }
        }

        const expandedRect = farmRect.expandBy(1, 1);
        if (!expandedRect.contains(i, j)) return;

        const neighbors = this.getNeighbors(i, j);
        const state = this.grassTileSet.getTextureByRules(neighbors)!;
        ctx.drawImage(state, 0, 0);
    }
}
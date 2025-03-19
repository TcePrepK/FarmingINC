import { createCanvas } from "../../../core/HTMLUtils";

export class FarmTileImage {
    public static readonly sides = ["farm-corner", "wetness"];
    public static readonly tileImage = createCanvas();
    public static loaded = false;

    static {
        const promises = this.loadImages();
        promises.then(images => {
            this.generateTheFarmTile(images);
            this.loaded = true;
        });
    }

    /**
     * Generates the generic farm tile from the given images.
     * Considering [farm-corner, wetness]
     * @param images
     * @private
     */
    private static generateTheFarmTile(images: Array<{ name: string, image: HTMLImageElement }>): void {
        this.tileImage.width = 32;
        this.tileImage.height = 32;

        const ctx = this.tileImage.getContext("2d")!;

        for (let i = 0; i < 4; i++) {
            ctx.drawImage(images[0].image, 0, 0);
            ctx.rotate(Math.PI / 2);
        }
        ctx.drawImage(images[1].image, 8, 8);
    }

    private static loadImages(): Promise<Array<{ name: string, image: HTMLImageElement }>> {
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
}
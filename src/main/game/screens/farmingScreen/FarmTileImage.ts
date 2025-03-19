import { createCanvas } from "../../../core/HTMLUtils";
import { Signal } from "../../../core/Signal.ts";

export class FarmTileImage {
    public static readonly sides = ["farm-corner", "wetness"];
    public static readonly tileImage = createCanvas();

    public static loaded = false;
    public static loadedImage: Signal<[]> = new Signal();

    static {
        const promises = this.loadImages();
        promises.then(images => {
            this.generateTheFarmTile(images);
            this.loaded = true;
            this.loadedImage.dispatch();
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
        
        ctx.translate(16, 16);
        for (let i = 0; i < 4; i++) {
            ctx.drawImage(images[0].image, -16, -16);
            ctx.rotate(Math.PI / 2);
        }
        ctx.translate(-16, -16);
        ctx.drawImage(images[1].image, 0, 0);
    }

    private static loadImages(): Promise<Array<{ name: string, image: HTMLImageElement }>> {
        return Promise.all(
            this.sides.map((name) => {
                return new Promise<{ name: string, image: HTMLImageElement }>((resolve, reject) => {
                    const image = new Image();
                    const src = `src/assets/images/tiles/${name}.png`;
                    image.src = src;
                    image.onload = () => resolve({ name, image });
                    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                });
            })
        );
    }
}
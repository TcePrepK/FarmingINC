import { createCanvas } from "../../../../../core/HTMLUtils.ts";
import { ImageLoader } from "../../../../../core/ImageLoader.ts";
import { Signal } from "../../../../../core/Signal.ts";

export class FlowerImage {
    private readonly flowers = new Array(32).fill(0).map((_, i) => "grassandflowers" + (i + 1));
    private readonly flowerCanvases: Array<HTMLCanvasElement> = [];

    public loaded = false;
    public readonly loadedEvent: Signal<[]> = new Signal();

    public constructor() {
        const promises = this.loadImages();
        promises.then(images => {
            for (const image of images) {
                this.flowerCanvases.push(this.setupFlower(image));
            }
            this.loaded = true;
            this.loadedEvent.dispatch();
        });

    }

    public getFlower(random: () => number): HTMLCanvasElement | null {
        const flower = Math.floor(random() * this.flowers.length);
        return this.flowerCanvases[flower]!;
    }

    private setupFlower(image: HTMLImageElement): HTMLCanvasElement {
        const canvas = createCanvas();
        canvas.width = 16;
        canvas.height = 16;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(image, 0, 0);

        return canvas;
    }

    protected loadImages(): Promise<Array<HTMLImageElement>> {
        return ImageLoader.loadImages(this.flowers.map(name => `src/assets/images/flowers/${name}.png`));
    }
}
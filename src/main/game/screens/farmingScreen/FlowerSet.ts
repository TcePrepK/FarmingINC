import { createCanvas } from "../../../core/HTMLUtils";
import { Signal } from "../../../core/Signal";

export class FlowerSet {
    private readonly flowers = new Array(32).fill(0).map((_, i) => "grassandflowers" + (i + 1));
    private readonly flowerCanvases: Array<HTMLCanvasElement> = [];

    public loaded = false;
    public readonly loadedEvent: Signal<[]> = new Signal();

    public constructor() {
        const promises = this.loadImages();
        promises.then(images => {
            for (const { image } of images) {
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

    protected loadImages(): Promise<Array<{ name: string, image: HTMLImageElement }>> {
        return Promise.all(
            this.flowers.map((name) => {
                return new Promise<{ name: string, image: HTMLImageElement }>((resolve, reject) => {
                    const image = new Image();
                    const src = `assets/images/flowers/${name}.png`;
                    image.src = src;
                    image.onload = () => resolve({ name, image });
                    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                });
            })
        );
    }
}
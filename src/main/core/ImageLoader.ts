export class ImageLoader {
    public static loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
    }

    public static loadImages(srces: Array<string>): Promise<Array<HTMLImageElement>> {
        return Promise.all(srces.map(src => this.loadImage(src)));
    }

    public static loadImageWithName(src: string, name: string): Promise<{ name: string, image: HTMLImageElement }> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve({ name, image });
            image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
    }

    public static loadImagesWithNames(srces: Array<{ path: string, name: string }>): Promise<Array<{
        name: string,
        image: HTMLImageElement
    }>> {
        return Promise.all(srces.map(({ path, name }) => this.loadImageWithName(path, name)));
    }
}
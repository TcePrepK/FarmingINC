import { createDiv } from "../core/HTMLUtils";
import { Root } from "./Root";
import { ScreenElement } from "./types/ScreenElement";

export class Crop extends ScreenElement {
    public name: string;
    public desc: string;

    public unlocked = false;
    public seenBefore = false;

    public constructor(root: Root, name: string, desc: string) {
        super(root);

        this.name = name;
        this.desc = desc;
    }

    public updateFrame(): void {
        this.body.classList.toggle("unlocked", this.unlocked);
        this.body.classList.toggle("seen-before", this.seenBefore);
    }

    /**
     * Returns the image path of the crop.
     */
    public getImage(): string {
        return `assets/images/crops/${this.name}.png`;
    }

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ classes: ["crop"], parent: parent });
        if (this.name !== "") this.body.innerHTML = `<img class="icon" src="${this.getImage()}" alt="${this.name}">`;
    }
}
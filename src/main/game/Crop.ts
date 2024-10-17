import { createDiv } from "../core/HTMLUtils";
import { Root } from "./Root";
import { ScreenElement } from "./types/ScreenElement";

export class Crop extends ScreenElement {
    public name: string;
    public desc: string;
    public amount = 0;

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

    /**
     * Creates the html of the crop to be used in other parts.
     */
    public createHTML(): HTMLDivElement {
        const body = createDiv({ classes: ["crop"] });
        if (this.name !== "") body.innerHTML = `<img class="icon" src="${this.getImage()}" alt="${this.name}">`;
        return body;
    }

    public createElement(parent: HTMLElement): void {
        this.body = this.createHTML();
        parent.appendChild(this.body);
    }
}
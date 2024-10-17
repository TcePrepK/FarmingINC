import { createDiv } from "../core/HTMLUtils";
import { Root } from "./Root";
import { ScreenElement } from "./types/ScreenElement";

export class Crop extends ScreenElement {
    public name: string;
    public desc: string;
    public amount = 0;

    private unlocked = false;
    private seenBefore = false;

    public constructor(root: Root, name: string, desc: string) {
        super(root);

        this.name = name;
        this.desc = desc;
    }

    /**
     * Used to set the new state of unlocked variable.
     * @param state
     */
    public setUnlocked(state: boolean): void {
        this.unlocked = state;
        this.body.classList.toggle("unlocked", this.unlocked);

        if (this.unlocked) this.setSeenBefore(true);
    }

    public setSeenBefore(state: boolean): void {
        this.seenBefore = state;
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
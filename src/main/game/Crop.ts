import { createDiv } from "../core/HtmlUtils";
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

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({
            classes: ["crop"], parent: parent
        });

        if (this.name !== "") this.body.innerHTML = `<img class="icon" src="assets/images/crops/${this.name}.png" alt="${this.name}">`;
    }
}
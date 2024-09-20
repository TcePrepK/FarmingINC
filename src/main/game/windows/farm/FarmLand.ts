import { createDiv } from "../../../core/HtmlUtils";
import { Crop } from "../../Crop";
import { Root } from "../../Root";
import { ScreenElement } from "../../types/ScreenElement";

export class FarmLand extends ScreenElement {
    private currentCrop: Crop | null = null;

    public constructor(root: Root) {
        super(root);
    }

    public updateFrame(): void {
        if (this.currentCrop === null) return;
        this.body.appendChild(this.currentCrop.body);
    }

    public createElement(parent: HTMLElement): void {
        const wrapper = createDiv({ classes: ["land-wrapper"], parent: parent });
        this.body = createDiv({ classes: ["land"], parent: wrapper });

        this.updateFrame();
    }
}
import { createButton, createElement, createSpan } from "../../../core/HtmlUtils";
import { BaseBuyable } from "../../types/BaseBuyable";

export class MainGenerator extends BaseBuyable {
    private nameElement!: HTMLHeadingElement;

    public createElement(parent: HTMLElement): void {
        super.createElement(parent);
        this.body.classList.add("generator");

        this.nameElement = createElement<HTMLHeadingElement>("h2", { classes: ["name"] })
        createButton({ classes: ["button"], parent: this.body },
            this.nameElement,
            createSpan({ classes: ["desc"], innerText: this.desc })
        );
        this.updateFrame();
    }

    public updateFrame(): void {
        this.nameElement.innerText = `${this.name} [${this.boughtAmount}`;

        const diff = this.boughtAmount.sub(this.effectiveAmount);
        if (diff.lessThanScalar(0)) {
            this.nameElement.innerText += ` + ${this.effectiveAmount}`;
        }

        this.nameElement.innerText += "]";
    }
}
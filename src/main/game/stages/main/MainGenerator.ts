import { createButton, createElement, createSpan } from "../../../core/HtmlUtils";
import { BaseBuyable } from "../../types/BaseBuyable";

export class MainGenerator extends BaseBuyable {
    public createElement(parent: HTMLElement): void {
        super.createElement(parent);
        this.body.classList.add("main-generator");

        createButton({ classes: [ "button" ], parent: this.body },
            createElement<HTMLHeadingElement>("h2", { classes: [ "name" ], innerText: this.name }),
            createSpan({ classes: [ "desc" ], innerText: this.desc })
        );
    }
}
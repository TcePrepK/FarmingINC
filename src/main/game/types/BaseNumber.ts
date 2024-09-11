import { createSpan } from "../../core/HtmlUtils";
import { Root } from "../Root";
import { ScreenElement } from "./ScreenElement";

export abstract class BaseNumber extends ScreenElement {
    public amount: number;

    protected constructor(root: Root, amount: number) {
        super(root);

        this.amount = amount;
    }

    public updateFrame(): void {
        this.body.innerText = `${this.amount}`;
    }

    public createElement(parent: HTMLElement): void {
        this.body = createSpan({ innerText: `${this.amount}`, classes: [ "currency" ], parent: parent });
    }
}
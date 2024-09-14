import { createSpan } from "../../core/HtmlUtils";
import { CustomNumber } from "../CustomNumber";
import { Root } from "../Root";
import { ScreenElement } from "./ScreenElement";

export abstract class BaseCurrency extends ScreenElement {
    public readonly name: string;

    public amount: CustomNumber;

    protected constructor(root: Root, name: string, amount: number) {
        super(root);

        this.name = name;
        this.amount = CustomNumber.fromNumber(amount);
    }

    public updateFrame(): void {
        this.body.innerText = `${this.amount} ${this.name}`;
    }

    public createElement(parent: HTMLElement): void {
        this.body = createSpan({ innerText: `${this.amount} ${this.name}`, classes: ["currency"], parent: parent });
    }
}
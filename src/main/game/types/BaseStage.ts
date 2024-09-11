import { createDiv } from "../../core/HtmlUtils";
import { Root } from "../Root";
import { BaseCurrency } from "./BaseCurrency";
import { ScreenElement } from "./ScreenElement";

export abstract class BaseStage extends ScreenElement {
    protected readonly id: string;

    protected readonly currency?: BaseCurrency;

    protected constructor(root: Root, id: string, currency?: BaseCurrency) {
        super(root);

        this.id = id;
        this.currency = currency;
    }

    public abstract initialize(): void;

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ id: this.id, classes: [ "stage" ], parent: parent });
    }
}
import { AttachedMouse, ButtonType } from "../../core/AttachedMouse";
import { createDiv } from "../../core/HtmlUtils";
import { CustomNumber } from "../CustomNumber";
import { Root } from "../Root";
import { ScreenElement } from "./ScreenElement";

export class BaseBuyable extends ScreenElement {
    public name: string;
    public desc: string;

    public boughtAmount: CustomNumber;
    public effectiveAmount: CustomNumber;

    public constructor(root: Root, name: string, desc: string, initialAmount = 0) {
        super(root);

        this.name = name;
        this.desc = desc;
        this.boughtAmount = CustomNumber.fromNumber(initialAmount);
        this.effectiveAmount = CustomNumber.fromNumber(initialAmount);
    }

    public initialize(root: Root): void {
        this.root = root;
    }

    public onClick(button: ButtonType): void {
        if (button !== ButtonType.LEFT) return;
        this.boughtAmount = this.boughtAmount.addScalar(1);
        this.effectiveAmount = this.effectiveAmount.addScalar(1);
    }

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ id: this.name, classes: ["buyable"], parent: parent });

        const attachment = AttachedMouse.getAttachment(this.body);
        attachment.onUp = this.onClick.bind(this);
    }
}
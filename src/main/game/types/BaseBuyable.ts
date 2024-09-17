import { createDiv } from "../../core/HtmlUtils";
import { ButtonType, MouseAttachment } from "../../core/MouseAttachment";
import { CustomNumber } from "../CustomNumber";
import { Root } from "../Root";
import { BaseCurrency } from "./BaseCurrency";
import { ScreenElement } from "./ScreenElement";

export class BaseBuyable extends ScreenElement {
    public name: string;
    public desc: string;

    public boughtAmount: CustomNumber;
    public effectiveAmount: CustomNumber;

    public maxAmount: number;

    public price: number;
    public currency: BaseCurrency;

    public constructor(root: Root, name: string, desc: string, maxAmount: number, currency: BaseCurrency) {
        super(root);

        this.name = name;
        this.desc = desc;

        this.boughtAmount = CustomNumber.fromNumber(0);
        this.effectiveAmount = CustomNumber.fromNumber(0);
        this.maxAmount = maxAmount;

        this.price = 0;
        this.currency = currency;
    }

    public updateFrame(): void {
        const affordable = !this.currency.amount.lessThanScalar(this.price);
        this.body.style.setProperty("--affordable", `${affordable}`);
    }

    public onClick(button: ButtonType): void {
        if (button !== ButtonType.LEFT) return;
        if (this.maxAmount > 0 && !this.boughtAmount.lessThanScalar(this.maxAmount)) return;
        if (this.currency.amount.lessThanScalar(this.price)) return;
        this.boughtAmount = this.boughtAmount.addScalar(1);
        this.effectiveAmount = this.effectiveAmount.addScalar(1);
    }

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ id: this.name, classes: ["buyable"], parent: parent });

        const attachment = MouseAttachment.attach(this.body);
        attachment.onUp = this.onClick.bind(this);
    }
}
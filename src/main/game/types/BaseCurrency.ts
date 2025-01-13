import { CustomNumber } from "../../core/CustomNumber";
import { Root } from "../Root";
import { InitializableObject } from "./InitializableObject";

export abstract class BaseCurrency extends InitializableObject {
    public readonly name: string;
    // public readonly icon: string;
    public readonly color: string;

    public amount: CustomNumber;

    protected constructor(root: Root, name: string, color: string, amount: number) {
        super(root);

        this.name = name;
        this.color = color;
        this.amount = CustomNumber.fromNumber(amount);
    }

    public attachElement(element: HTMLElement): void {
        this.amount.attachElement(element);
        element.style.setProperty("--currency-color", this.color);
    }
}
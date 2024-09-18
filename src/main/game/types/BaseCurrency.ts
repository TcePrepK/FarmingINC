import { CustomNumber } from "../CustomNumber";
import { Root } from "../Root";
import { InitializableObject } from "./InitializableObject";

export abstract class BaseCurrency extends InitializableObject {
    public readonly name: string;

    public amount: CustomNumber;

    protected constructor(root: Root, name: string, amount: number) {
        super(root);

        this.name = name;
        this.amount = CustomNumber.fromNumber(amount);
    }
}
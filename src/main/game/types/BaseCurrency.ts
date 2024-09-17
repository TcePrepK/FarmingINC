import { CustomNumber } from "../CustomNumber";
import { InitializableObject } from "../InitializableObject";
import { Root } from "../Root";

export abstract class BaseCurrency extends InitializableObject {
    public readonly name: string;

    public amount: CustomNumber;

    protected constructor(root: Root, name: string, amount: number) {
        super(root);

        this.name = name;
        this.amount = CustomNumber.fromNumber(amount);
    }
}
import { Root } from "../Root";
import { CustomNumber } from "../screens/mainScreen/CustomNumber";
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
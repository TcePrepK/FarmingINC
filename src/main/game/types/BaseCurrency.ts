import { Root } from "../Root";
import { BaseNumber } from "./BaseNumber";

export abstract class BaseCurrency extends BaseNumber {
    public readonly name: string;

    protected constructor(root: Root, name: string, amount: number) {
        super(root, amount);

        this.name = name;
    }

    public update(): void {
    }
}
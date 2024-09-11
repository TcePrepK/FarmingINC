import { Root } from "../../Root";
import { BaseCurrency } from "../../types/BaseCurrency";

export class MainCurrency extends BaseCurrency {
    public constructor(root: Root) {
        super(root, "Main Currency", 100);
    }
}
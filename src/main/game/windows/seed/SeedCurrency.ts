import { Root } from "../../Root";
import { BaseCurrency } from "../../types/BaseCurrency";

export class SeedCurrency extends BaseCurrency {
    public constructor(root: Root) {
        super(root, "Seeds", 0);
    }
}
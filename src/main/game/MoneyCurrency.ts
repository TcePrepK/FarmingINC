import { Root } from "./Root";
import { BaseCurrency } from "./types/BaseCurrency";

export class MoneyCurrency extends BaseCurrency {
    public constructor(root: Root) {
        super(root, "Money", 0);
    }
}
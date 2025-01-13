import { Root } from "../../Root";
import { BaseCurrency } from "../../types/BaseCurrency";

export class TechnologyCurrency extends BaseCurrency {
    public constructor(root: Root) {
        super(root, "Plant-Food", "#af4", 0);
    }
}
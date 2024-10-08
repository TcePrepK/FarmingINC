import { checkFor } from "../core/HTMLUtils";
import { BaseCurrency } from "./types/BaseCurrency";

export class CurrencyManager {
    private static currencies: Map<string, BaseCurrency> = new Map();

    public static registerCurrency(id: string, currency: BaseCurrency): void {
        this.currencies.set(id, currency);
    }

    public static getCurrency(id: string): BaseCurrency {
        const currency = this.currencies.get(id);
        checkFor(currency, `Currency with id "${id}" not found!`);
        return currency;
    }
}
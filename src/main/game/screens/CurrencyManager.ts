import { checkFor, createDiv, createElement, getElementById } from "../../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../../core/MouseAttachment";
import { BaseCurrency } from "../types/BaseCurrency";
import { InitializableObject } from "../types/InitializableObject";

export class CurrencyManager extends InitializableObject {
    private static currencies: Map<string, BaseCurrency> = new Map();

    public initialize(): void {
        const currencyScreen = getElementById("currency-screen-wrapper");

        MouseAttachment.attach(currencyScreen).onClickRaw = (event) => {
            if (event.button !== ButtonType.LEFT) return;
            currencyScreen.classList.toggle("enabled");

            event.stopPropagation();
        };
    }

    public static registerCurrency(currency: BaseCurrency): void {
        this.currencies.set(currency.name, currency);
        this.setupCurrencyElement(currency);
    }

    public static getCurrency(id: string): BaseCurrency {
        const currency = this.currencies.get(id);
        checkFor(currency, `Currency with id "${id}" not found!`);
        return currency;
    }

    private static setupCurrencyElement(currency: BaseCurrency): void {
        const currencyScreen = getElementById("currency-screen");
        if (this.currencies.size > 1) {
            createDiv({
                classes: ["divider"],
                parent: currencyScreen
            })
        }
        const currencyElement = createDiv({
            id: `${currency.name}-research`,
            classes: ["currency"],
            parent: currencyScreen
        }, createElement<HTMLImageElement>("img", {
            classes: ["currency-icon"],
            src: `src/assets/images/currencies/${currency.name}.png`
        }));
        const amount = createDiv({ classes: ["currency-amount"], parent: currencyElement });
        currency.attachElement(amount);
    }
}
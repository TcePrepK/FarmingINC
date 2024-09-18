import { BaseBuyable } from "../../types/BaseBuyable";

export class SeedGenerator extends BaseBuyable {
    private haveAmount!: HTMLHeadingElement;
    private prodAmount!: HTMLSpanElement;

    public createElement(parent: HTMLElement): void {
        super.createElement(parent);
        this.body.classList.add("generator");

        this.body.innerHTML = `
            <div class="data">
                <img class="icon" src="${"assets/images/shrimp.png"}" alt="">
                <span class="name">${this.name}</span>
                <span class="amount"></span>
            </div>
            <button class="buy-button">
                <div class="amount"><span>1</span></div>
                <span class="price">120</span>
            </button>
        `;

        this.haveAmount = this.getByQuery(".data .amount");
        this.updateFrame();
    }

    public updateFrame(): void {
        this.haveAmount.innerText = `${this.effectiveAmount}`;

        const diff = this.boughtAmount.sub(this.effectiveAmount);
        if (diff.lessThanScalar(0)) {
            this.haveAmount.innerText += ` [${this.boughtAmount}]`;
        }
    }
}
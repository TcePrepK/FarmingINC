import { Root } from "../../Root";
import { BaseBuyable } from "../../types/BaseBuyable";

export class MoneyUpgrade extends BaseBuyable {
    public constructor(root: Root, name: string, desc: string) {
        super(root, name, desc, 1, root.structure.upgrades.currency);
    }

    public createElement(parent: HTMLElement): void {
        super.createElement(parent);
        this.body.classList.add("upgrade");

        this.body.innerHTML = `
           <img class="icon" src="${"assets/images/shrimp_grey.png"}" alt="">
        `;
    }
}
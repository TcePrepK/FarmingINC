import { createDiv } from "../../../core/HtmlUtils";
import { MouseAttachment } from "../../../core/MouseAttachment";
import { Root } from "../../Root";
import { BaseWindow } from "../../types/BaseWindow";
import { MoneyUpgrade } from "./MoneyUpgrade";

export class UpgradeWindow extends BaseWindow {
    private moneyBody!: HTMLDivElement;
    private upgradeBody!: HTMLDivElement;
    private descDrawer!: HTMLDivElement;

    private readonly upgrades: Array<MoneyUpgrade> = [];

    public constructor(root: Root) {
        super(root, "upgrade-window");
    }

    /**
     * Initializes the upgrades
     */
    public initialize(): void {
        for (let i = 0; i < 10; i++) {
            const upgrade = new MoneyUpgrade(this.root, "Diamond Hoe", "Makes each prop drop 50% more. And some useless text here to make it longer also knowing nobody will be reading these except the translators which we do not have and will never see this text because I will be removing this text within a few hours of adding proper upgrade management lmao this is still funny and I am still yapping to try make this text even longer GOD I am tired and I need help... Please send help!");
            this.upgrades.push(upgrade);
        }
    }

    /**
     * IDK what it is supposed to do here, doubt anything...
     * @param dt
     */
    public update(dt: number): void {
        this.currency.amount = this.currency.amount.addScalar(10 * dt);
    }

    /**
     * Update the number in the header
     */
    public updateFrame(): void {
        this.moneyBody.innerText = `${this.currency.amount}`;
    }

    /**
     * Renders the upgrade in the header instead
     * @param upgrade
     * @private
     */
    private renderUpgrade(upgrade: MoneyUpgrade): void {
        this.descDrawer.innerHTML = `
            <div class="header">
                <span class="name">${upgrade.name}</span>
                <span class="price">[${upgrade.price} ${upgrade.currency.name}]</span>
            </div>
            <div class="desc">${upgrade.desc}</div>
        `;
        // const header = this.structure.header;
    }

    /**
     * Creates the main structure of the upgrade window
     * @param parent
     */
    public createElement(parent: HTMLElement): void {
        super.createElement(parent);

        { // Inner Body
            const innerBody = this.structure.innerBody;
            innerBody.innerHTML = `
                <div class="header">
                    You have 
                    <span class="money">${this.currency.amount}</span> 
                    <span class="money-text">${this.currency.name}</span>
                </div>
                <div class="divider"></div>
                <div class="upgrade-body"></div>
            `;

            this.moneyBody = innerBody.querySelector(".header .money")!;
            this.upgradeBody = innerBody.querySelector(".upgrade-body")!;
        }

        { // Upgrades and description drawer
            const wrapper = createDiv({ classes: ["desc-wrapper"], parent: this.body });
            this.descDrawer = createDiv({ classes: ["desc-drawer"], parent: wrapper });

            for (const upgrade of this.upgrades) {
                upgrade.createElement(this.upgradeBody);

                const attachment = MouseAttachment.attach(upgrade.body);
                attachment.onEnter = this.renderUpgrade.bind(this, upgrade);
            }

            this.renderUpgrade(this.upgrades[0]); // TODO: Remove this
        }

    }
}
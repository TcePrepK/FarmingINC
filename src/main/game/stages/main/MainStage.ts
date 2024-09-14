import { createDiv } from "../../../core/HtmlUtils";
import { Root } from "../../Root";
import { BaseStage } from "../../types/BaseStage";
import { MainGenerator } from "./MainGenerator";

export class MainStage extends BaseStage {
    private generators: Array<MainGenerator> = [];

    public constructor(root: Root) {
        super(root, "main-stage");
    }

    public initialize(): void {
        this.setupGenerator("Farmland", "Generates Seeds");
        this.setupGenerator("Slaves", "Generates Farmland");
        this.setupGenerator("Human Trafficking", "Generates Slaves");
    }

    public update(dt: number): void {
        for (let i = 0; i < this.generators.length; i++) {
            const generator = this.generators[i];
            const genResult = generator.effectiveAmount.multScalar(dt);

            if (i === 0) {
                this.currency.amount = this.currency.amount.add(genResult);
            } else {
                this.generators[i - 1].effectiveAmount = this.generators[i - 1].effectiveAmount.add(genResult);
            }
        }
    }

    public updateFrame(): void {
        this.currency.updateFrame();

        for (const generator of this.generators) {
            generator.updateFrame();
        }
    }

    private setupGenerator(name: string, desc: string): void {
        const generator = new MainGenerator(this.root, name, desc);
        generator.initialize(this.root);
        this.generators.push(generator);
    }

    public createElement(parent: HTMLDivElement): void {
        super.createElement(parent);
        this.structure.header.title.innerText = "Main Stage";

        const innerBody = this.structure.innerBody;
        const currencyBody = createDiv({ classes: ["currency-body"], parent: innerBody });
        this.currency.createElement(currencyBody);

        const buyableBody = createDiv({ classes: ["buyable-body"], parent: innerBody });
        const generatorBody = createDiv({ classes: ["generator-body"], parent: buyableBody });
        for (const generator of this.generators) {
            generator.createElement(generatorBody);
        }

        this.setupDragging();
    }
}
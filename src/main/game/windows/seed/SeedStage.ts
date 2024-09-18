import { createDiv } from "../../../core/HtmlUtils";
import { Root } from "../../Root";
import { BaseWindow } from "../../types/BaseWindow";
import { SeedGenerator } from "./SeedGenerator";

export class SeedStage extends BaseWindow {
    private generators: Array<SeedGenerator> = [];

    public constructor(root: Root) {
        super(root, "seed-stage");
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
        const generator = new SeedGenerator(this.root, name, desc, -1, this.currency);
        generator.initialize();
        this.generators.push(generator);
    }

    public createElement(parent: HTMLDivElement): void {
        super.createElement(parent);
        this.structure.header.title.innerText = "Main Stage";

        const innerBody = this.structure.innerBody;

        const buyableBody = createDiv({ classes: ["buyable-body"], parent: innerBody });
        const generatorBody = createDiv({ classes: ["generator-body"], parent: buyableBody });
        for (const generator of this.generators) {
            generator.createElement(generatorBody);
        }
    }
}
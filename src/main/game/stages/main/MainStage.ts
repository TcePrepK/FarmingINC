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
        this.setupGenerator("Generator 1", "Generates Num");
        this.setupGenerator("Generator 2", "Generates Gen1");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
        this.setupGenerator("Generator 3", "Generates Gen2");
    }

    private setupGenerator(name: string, desc: string): void {
        const generator = new MainGenerator(this.root, name, desc);
        generator.initialize(this.root);
        this.generators.push(generator);
    }

    public createElement(parent: HTMLDivElement): void {
        super.createElement(parent);

        const header = createDiv({ id: "main-header", classes: [ "header" ], parent: this.body });

        const generatorArea = createDiv({ id: "main-generators", classes: [ "generator-area" ], parent: this.body });
        for (const generator of this.generators) {
            generator.createElement(generatorArea);
        }
    }
}
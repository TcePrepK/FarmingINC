import { InitializableObject } from "./InitializableObject";
import { Root } from "./Root";
import { Structure } from "./types/Structure";

export class Simulation extends InitializableObject {
    private readonly structure;

    public constructor(root: Root) {
        super(root);
        this.structure = new Structure(this.root);
    }

    public initialize(): void {
        this.structure.initialize();
        this.structure.setupStages();
    }
}
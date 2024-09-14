import { InitializableObject } from "./InitializableObject";
import { Root } from "./Root";
import { Structure } from "./Structure";

export class Simulation extends InitializableObject {
    private readonly structure: Structure;

    public constructor(root: Root) {
        super(root);
        this.structure = new Structure(this.root);
    }

    public initialize(): void {
        this.structure.initialize();
        this.structure.setupStages();
    }

    public update(dt: number): void {
        this.structure.update(dt);
    }

    public updateFrame(): void {
        this.structure.updateFrame();
    }

    /**
     * Updates the stages to make them fit the new worldX/Y coordinates.
     */
    public updateWorldTransform(): void {
        this.structure.updateWorldTransform();
    }
}
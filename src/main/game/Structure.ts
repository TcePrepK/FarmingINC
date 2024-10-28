import { getElementById } from "../core/HTMLUtils";
import { Inventory } from "./Inventory";
import { BaseWindow } from "./types/BaseWindow";
import { InitializableObject } from "./types/InitializableObject";
import { FarmingWindow } from "./windows/farm/FarmingWindow";

export class Structure extends InitializableObject {
    private body!: HTMLDivElement;
    private stagesBody!: HTMLDivElement;

    private readonly stages: Array<BaseWindow> = [];

    public inventory = new Inventory(this.root);

    public farm = new FarmingWindow(this.root);

    public initialize(): void {
        this.body = getElementById("structure");
        this.stagesBody = getElementById("stages");

        this.inventory.initialize();

        this.setupStage(this.farm);
    }

    public update(dt: number): void {
        this.inventory.update(dt);

        for (const stage of this.stages) {
            stage.update(dt);
        }
    }

    public updateFrame(): void {
        this.inventory.updateFrame();

        for (const stage of this.stages) {
            stage.updateFrame();
        }
    }

    private setupStage(stage: BaseWindow): void {
        stage.initialize();
        stage.createElement(this.stagesBody);
        stage.setupDragging();
        this.stages.push(stage);
    }

    /**
     * Updates the stages to make them fit the new worldX/Y coordinates.
     */
    public updateWorldTransform(): void {
        for (const stage of this.stages) {
            stage.updateTransform();
        }
    }
}
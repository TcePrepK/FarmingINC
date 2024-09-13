import { getElementById } from "../core/HtmlUtils";
import { InitializableObject } from "./InitializableObject";
import { MainStage } from "./stages/main/MainStage";
import { BaseStage } from "./types/BaseStage";

export class Structure extends InitializableObject {
    private body!: HTMLDivElement;
    private readonly stages: Array<BaseStage> = [];

    public initialize(): void {
        this.body = getElementById("structure");
    }

    public setupStages(): void {
        this.setupStage(new MainStage(this.root));
    }

    private setupStage(stage: BaseStage): void {
        stage.initialize();
        stage.createElement(this.body);
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
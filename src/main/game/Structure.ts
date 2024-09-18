import { getElementById } from "../core/HtmlUtils";
import { BaseWindow } from "./types/BaseWindow";
import { InitializableObject } from "./types/InitializableObject";
import { SeedStage } from "./windows/seed/SeedStage";
import { UpgradeWindow } from "./windows/upgrades/UpgradeWindow";

export class Structure extends InitializableObject {
    private body!: HTMLDivElement;
    private stagesBody!: HTMLDivElement;

    private readonly stages: Array<BaseWindow> = [];

    public upgrades = new UpgradeWindow(this.root);
    public seed = new SeedStage(this.root);

    public initialize(): void {
        this.body = getElementById("structure");
        this.stagesBody = getElementById("stages");

        this.setupStage(this.upgrades);
        // this.setupStage(this.seed);
    }

    public update(dt: number): void {
        for (const stage of this.stages) {
            stage.update(dt);
        }
    }

    public updateFrame(): void {
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
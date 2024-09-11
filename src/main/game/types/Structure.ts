import {createDiv} from "../../core/HtmlUtils";
import {InitializableObject} from "../InitializableObject";
import {MainStage} from "../stages/main/MainStage";
import {BaseStage} from "./BaseStage";

export class Structure extends InitializableObject {
    private body!: HTMLDivElement;
    private readonly stages: Array<BaseStage> = [];

    public initialize(): void {
        this.body = createDiv({id: "structure", parent: document.body});
    }

    public setupStages(): void {
        this.setupStage(new MainStage(this.root));
    }

    private setupStage(stage: BaseStage): void {
        stage.initialize();
        stage.createElement(this.body);
        this.stages.push(stage);
    }
}
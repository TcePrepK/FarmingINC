import { getElementById } from "../../../core/HTMLUtils";
import { BaseWindow } from "../../types/BaseWindow";
import { InitializableObject } from "../../types/InitializableObject";
import { Background } from "../Background";
import { Inventory } from "./Inventory";
import { FarmingWindow } from "./windows/farm/FarmingWindow";

export class Structure extends InitializableObject {
    private body!: HTMLDivElement;
    private stagesBody!: HTMLDivElement;

    public background!: Background;

    private readonly stages: Array<BaseWindow> = [];

    public inventory = new Inventory(this.root);

    public farm = new FarmingWindow(this.root);

    public initialize(): void {
        this.background = new Background(this.root, "playground-canvas");
        this.background.initialize();

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
        this.drawBackground();

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

    /* ----------------- Helper Drawing Methods ----------------- */

    private drawBackground(): void {
        this.background.startDrawing();
        this.lines(128, 2, "#454570");
        this.lines(32, 1, "#353560");
        this.background.finalizeDrawing();
    }

    private lines(size: number, width: number, color: string): void {
        const ctx = this.background.context;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        const w = this.root.windowWidth / 2;
        const h = this.root.windowHeight / 2;

        const left = Math.floor(-w / size) * size;
        const top = Math.floor(-h / size) * size;
        const right = Math.ceil(w / size) * size;
        const bottom = Math.ceil(h / size) * size;

        for (let i = left; i < right; i++) {
            ctx.beginPath();
            ctx.moveTo(i * size, top * size);
            ctx.lineTo(i * size, bottom * size);
            ctx.stroke();
        }

        for (let i = top; i < bottom; i++) {
            ctx.beginPath();
            ctx.moveTo(left * size, i * size);
            ctx.lineTo(right * size, i * size);
            ctx.stroke();
        }
    }
}
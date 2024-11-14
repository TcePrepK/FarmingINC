import { getElementById } from "../../../core/HTMLUtils";
import { BaseWindow } from "../../types/BaseWindow";
import { InitializableObject } from "../../types/InitializableObject";
import { Background } from "../Background";
import { Inventory } from "./Inventory";
import { FarmingWindow } from "./windows/farm/FarmingWindow";

export class Structure extends InitializableObject {
    private body!: HTMLDivElement;
    private windowBody!: HTMLDivElement;

    public background!: Background;

    private readonly stages: Array<BaseWindow> = [];

    public inventory = new Inventory(this.root);

    public farm = new FarmingWindow(this.root);

    public initialize(): void {
        this.background = new Background(this.root, "playground-canvas");
        this.background.initialize();
        this.background.onCenterChange.add(this.updateWorldTransform.bind(this));

        this.body = getElementById("structure");
        this.windowBody = getElementById("window-body");

        this.inventory.initialize();

        { // Windows
            this.setupWindow(this.farm);
        }

        this.updateWorldTransform();
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

    /**
     * Creates and sets up each window. Main parent is windowBody
     * @param window
     * @private
     */
    private setupWindow(window: BaseWindow): void {
        window.initialize();
        window.createElement(this.windowBody);
        window.setupDragging();
        this.stages.push(window);
    }

    /**
     * Updates the logo and windows to make them fit to the new worldX/Y coordinates.
     */
    public updateWorldTransform(): void {
        const logo = getElementById("logo-wrapper");

        const center = this.background.getCenter();
        logo.style.left = `${center.x}px`;
        logo.style.top = `${center.y}px`;

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
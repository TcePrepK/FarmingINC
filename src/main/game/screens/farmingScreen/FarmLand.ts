import { createCanvas, createDiv } from "../../../core/HTMLUtils";
import { Rectangle } from "../../../core/Rectangle";
import { Root } from "../../Root";
import { ScreenElement } from "../../types/ScreenElement";
import { Crop } from "./Crop";

export class FarmLand extends ScreenElement {
    private tileImage!: HTMLCanvasElement;

    private currentCrop: Crop | null = null;
    private cropBody: HTMLDivElement | null = null;

    private growthState = 0;
    public progress = 0;

    private growthWobble: NodeJS.Timeout | null = null;

    public x: number;
    public y: number;

    public constructor(root: Root, x: number, y: number) {
        super(root);

        this.x = x;
        this.y = y;
    }

    /**
     * Updates the crop progress and checks if the crop is done.
     * @param dt The passed delta time
     */
    public update(dt: number): void {
        if (!this.currentCrop) return;

        // Max progress is 100, if it is lower than that, crop is still growing
        if (this.progress < 100) {
            this.progress += 100 / this.currentCrop.growTime * dt;

            if (this.progress < 100) return;

            if (this.currentCrop.replantAble) {
                this.replantCrop();
            } else {
                this.cropBody!.classList.add("done");
                setTimeout(this.cleanCrop.bind(this), 500);
            }
        }
    }

    /**
     * Updates the crop animation and checks if the crop is done.
     */
    public updateFrame(): void {
        if (!this.cropBody) return;

        const currentGrowthState = Math.floor(this.progress / 25); // 0-100 -> 0-4
        if (this.growthState === currentGrowthState) return;
        this.growthState = currentGrowthState

        this.cropBody!.classList.add("wobble");
        if (this.growthWobble) clearTimeout(this.growthWobble);
        this.growthWobble = setTimeout(() => this.cropBody!.classList.remove("wobble"), 500);

        this.cropBody.style.setProperty("--progress", `${this.growthState / 5 + 0.2}`);
    }

    public updatePosition(x: number, y: number, rect: Rectangle): void {
        this.x = x;
        this.y = y;

        const left = this.x - rect.left;
        const top = this.y - rect.top;

        this.body.style.left = left * 63 + "px";
        this.body.style.top = top * 63 + "px";
    }

    private harvestCrop(): void {
        if (!this.currentCrop) return;
        if (!this.cropBody) return;
        if (this.progress < 100) return;

        this.currentCrop.amount++;
    }

    private cleanCrop(): void {
        if (!this.currentCrop) return;
        if (!this.cropBody) return;
        this.harvestCrop();

        this.cropBody.remove();
        if (this.growthWobble) clearTimeout(this.growthWobble);

        this.currentCrop = null;
        this.cropBody = null;
    }

    public plantCrop(crop: Crop): void {
        this.currentCrop = crop;
        this.cropBody = crop.createHTML();
        this.cropBody.style.setProperty("--progress", "0.20");
        this.body.appendChild(this.cropBody);

        this.progress = 0;
    }

    private replantCrop(): void {
        if (!this.currentCrop) return;
        if (!this.cropBody) return;
        this.harvestCrop();

        this.cropBody.style.setProperty("--progress", "0.2");
        this.progress = 0;
    }

    public isEmpty(): boolean {
        return !this.currentCrop;
    }

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ classes: ["land-wrapper"], parent: parent });
        this.tileImage = createCanvas({ classes: ["land-tile"], parent: this.body });

        this.tileImage.width = 32;
        this.tileImage.height = 32;

        this.updateFrame();
    }

    public drawTileImage(tileImage: HTMLCanvasElement): void {
        const ctx = this.tileImage.getContext("2d")!;
        ctx.drawImage(tileImage, 0, 0);
    }

    public cloneBody(): HTMLElement {
        const clone = this.body.cloneNode(true) as HTMLElement;
        clone.style.left = "";
        clone.style.top = "";

        const canvas = clone.querySelector("canvas")!;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(this.tileImage, 0, 0);

        return clone;
    }
}
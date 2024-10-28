import { createDiv } from "../../../core/HTMLUtils";
import { Crop } from "../../Crop";
import { ScreenElement } from "../../types/ScreenElement";

export class FarmLand extends ScreenElement {
    private currentCrop: Crop | null = null;
    private cropBody: HTMLDivElement | null = null;

    private growthState = 0;
    public progress = 0;

    private growthWobble: NodeJS.Timeout | null = null;

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
        const wrapper = createDiv({ classes: ["land-wrapper"], parent: parent });
        this.body = createDiv({ classes: ["land"], parent: wrapper });

        this.updateFrame();
    }
}
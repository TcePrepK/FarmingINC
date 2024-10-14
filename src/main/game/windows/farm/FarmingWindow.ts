import { createDiv } from "../../../core/HTMLUtils";
import { MouseAttachment } from "../../../core/MouseAttachment";
import { Root } from "../../Root";
import { BaseWindow } from "../../types/BaseWindow";
import { FarmLand } from "./FarmLand";

export class FarmingWindow extends BaseWindow {
    private farmBody!: HTMLDivElement;

    private farmLands: Array<FarmLand> = [];

    public constructor(root: Root) {
        super(root, "Farming");

        this.stageY = 200;
    }

    public initialize(): void {
        for (let i = 0; i < 9; i++) {
            this.farmLands.push(new FarmLand(this.root));
        }
    }

    public update(dt: number): void {
        for (const land of this.farmLands) {
            land.update(dt);
        }
    }

    public updateFrame(): void {
        for (const land of this.farmLands) {
            land.updateFrame();
        }
    }

    /**
     * Creates the main structure of the farming window
     * @param parent
     */
    public createElement(parent: HTMLElement): void {
        super.createElement(parent);

        const innerBody = this.structure.innerBody;
        // const wrapper = createDiv({ classes: ["farm-wrapper"], parent: innerBody });
        this.farmBody = createDiv({ classes: ["farm-body"], parent: innerBody });

        for (const farmLand of this.farmLands) {
            farmLand.createElement(this.farmBody);

            const attachment = MouseAttachment.attach(farmLand.body);
            attachment.onMove = () => {
                if (!farmLand.isEmpty()) return;
                const inventory = this.root.structure.inventory;
                if (!inventory.draggingCrop) return;
                farmLand.plantCrop(inventory.draggingCrop);
            }
        }
    }
}
import { createDiv, getElementById } from "../core/HtmlUtils";
import { ButtonType, MouseAttachment } from "../core/MouseAttachment";
import { Crop } from "./Crop";
import { Root } from "./Root";
import { InitializableObject } from "./types/InitializableObject";

export class Inventory extends InitializableObject {
    private readonly innerBody: HTMLDivElement;
    private informationDrawer!: HTMLDivElement;

    public readonly inventory: Array<Array<Crop>> = [];

    private renderingCrop: Crop | null = null;

    public constructor(root: Root) {
        super(root);

        this.innerBody = getElementById("inv-container");
    }

    public initialize(): void {
        const plantNames = ["Cabbage", "Carrot", "Corn", "Cucumber", "Eggplant", "Green_bell_pepper", "Onion", "Pineapple", "Potato", "Pumpkin", "Spinach", "Strawberry", "Sweet_potato", "Tomato", "Turnip"];
        const stageColors = ["#742", "#346", "#734"];
        const stageAmount = 3;
        for (let i = 0; i < stageAmount; i++) {
            const crops = [];

            const wrapper = createDiv({ classes: ["stage-crops"], parent: this.innerBody });
            wrapper.style.setProperty("--stage-color", stageColors[i]);

            const stageCrops = Math.random() * 15 + 5;
            for (let j = 0; j < stageCrops; j++) {
                const crop = new Crop(this.root, plantNames[(Math.random() * plantNames.length) | 0], "idk");
                crops.push(crop);

                // HTML Part
                crop.createElement(wrapper);

                const attachment = MouseAttachment.attach(crop.body);
                attachment.onDown = button => {
                    if (button !== ButtonType.LEFT) return;
                    this.toggleCropRender(crop);
                }

            }

            this.inventory.push(crops);
        }
    }

    private toggleCropRender(crop: Crop): void {
        if (this.renderingCrop === crop) this.renderingCrop = null;
        else this.renderingCrop = crop;

        console.log(this.renderingCrop);

        const drawer = this.informationDrawer;
        if (this.renderingCrop !== null) {

        }
    }
}
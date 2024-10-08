import { createDiv, getElementById } from "../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../core/MouseAttachment";
import { Crop } from "./Crop";
import { Root } from "./Root";
import { InitializableObject } from "./types/InitializableObject";

export class Inventory extends InitializableObject {
    private readonly body: HTMLDivElement;
    private readonly innerBody: HTMLDivElement;
    private readonly informOuter!: HTMLDivElement;

    public readonly inventory: Array<Array<Crop>> = [];

    private renderingCrop: Crop | null = null;

    private expanded = false;
    private informExpanded = false;

    private toggleable = true;

    public constructor(root: Root) {
        super(root);

        this.body = getElementById("inventory");
        this.innerBody = getElementById("inv-container");
        this.informOuter = getElementById("inform-outer");
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
                const crop = new Crop(this.root, plantNames[(Math.random() * plantNames.length) | 0],
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dolor nibh, consequat in accumsan vehicula, sollicitudin a nunc. Integer sollicitudin justo in ligula pharetra efficitur. Duis at elit ut orci luctus tincidunt. Aliquam pellentesque, enim sit amet tincidunt aliquam, eros felis feugiat sem, ut placerat erat dolor sit amet ex. Duis aliquam tellus id aliquet pulvinar. Quisque neque ante, blandit a laoreet quis, aliquam sed nisl. Aliquam ipsum orci, volutpat eu feugiat sit amet, hendrerit ac tortor. Nunc scelerisque risus vitae augue bibendum fermentum. Sed accumsan justo eu risus tristique mollis. Etiam iaculis facilisis mi, sit amet tempor sem feugiat eget. Phasellus imperdiet ornare mauris, sed varius neque ornare vitae. Proin vitae iaculis metus. Maecenas cursus ante vel ipsum tempus, a fringilla lacus fermentum. Aliquam urna sem, tristique vitae eros in, feugiat lacinia augue. In non libero et ex tempor pellentesque sollicitudin a nunc. Aenean urna purus, rutrum eget vestibulum eget, fringilla et diam Vivamus sed dui quis elit varius semper. Sed elementum mauris diam, vel aliquet eros tincidunt ut. Aliquam placerat tempor neque ac imperdiet. Praesent sollicitudin ex arcu, vitae dignissim orci commodo vitae. Phasellus in interdum arcu. Donec dignissim porta orci, eu scelerisque libero molestie ornare. Suspendisse nec erat semper, tincidunt nisi eu, maximus tellus. In a egestas lacus. Vivamus tristique ultricies ultrices. Nullam at dui gravida, porttitor odio id, dignissim felis. Mauris nec laoreet dui, ac mattis magna. Aliquam erat volutpat. Morbi porttitor ut nunc nec fermentum. In aliquam et tortor eu pharetra. Fusce ornare pretium purus."
                    // ""
                );
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

        { // Handle
            const handle = getElementById("drawer-handle");
            handle.addEventListener("click", () => this.toggleSelection());
        }
    }

    public toggleSelection(): void {
        if (!this.toggleable) return;
        this.toggleable = false;
        setTimeout(() => this.toggleable = true, 500);

        if (this.informExpanded) {
            this.informExpanded = false;
            this.renderingCrop = null;
            this.getAudio("closing").play();
        } else if (this.expanded) {
            this.expanded = false;
            this.getAudio("closing").play();
        } else {
            this.expanded = true;
            this.getAudio("opening").play();
        }

        this.body.classList.toggle("open", this.expanded);
        this.informOuter.classList.toggle("open", this.informExpanded);
    }

    private getAudio(state: string): HTMLAudioElement {
        return getElementById(`drawer-${state}`);
    }

    private toggleCropRender(crop: Crop): void {
        if (!this.toggleable) return;
        if (this.renderingCrop === null || this.renderingCrop === crop) {
            this.toggleable = false;
            setTimeout(() => this.toggleable = true, 500);
        }

        if (this.renderingCrop === crop) this.renderingCrop = null;
        else this.renderingCrop = crop;

        const formattedName = crop.name.split("_").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");

        const drawer = getElementById("inform-drawer");

        if (this.informExpanded !== !!this.renderingCrop) {
            this.informExpanded = !!this.renderingCrop;
            this.informOuter.classList.toggle("open", this.informExpanded);

            this.getAudio(this.informExpanded ? "opening" : "closing").play();
        }

        this.informOuter.classList.toggle("open", this.informExpanded);
        if (this.renderingCrop) {
            drawer.innerHTML = `
                <div class="header">
                    <span class="name">${formattedName}</span>
                    <span class="desc">${crop.desc}</span>
                </div>
                <div class="divider"></div>
                <div class="body">
                    <div class="buttons">
                        <button class="sell">Sell 1</button>
                        <button class="sell">Sell 10</button>
                        <button class="sell-all">Sell All</button>
                    </div>
                </div>
            `;
        }
    }
}
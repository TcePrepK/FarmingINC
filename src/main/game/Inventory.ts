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
    public draggingCrop: Crop | null = null;
    public dragging: HTMLDivElement | null = null;

    private expanded = false;
    private informExpanded = false;

    private toggleable = true;

    // Dragging physics
    private prevX = -1;
    private prevY = -1;
    private angle = 0;
    private angleVel = 0;

    // Dragging physics

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
                attachment.onUp = button => {
                    if (button !== ButtonType.LEFT) return;
                    this.toggleCropRender(crop);
                }

                attachment.onDown = button => {
                    if (button !== ButtonType.LEFT) return;
                    this.startDraggingCrop(crop);
                }
            }

            this.inventory.push(crops);
        }

        { // Plant Dragging
            this.root.windowMouse.onUp = button => {
                if (button !== ButtonType.LEFT) return;
                this.dragging?.remove();
                this.dragging = null;
                this.draggingCrop = null;
            }

            const attachment = MouseAttachment.attach(this.body);
            attachment.onLeave = () => {
                if (!this.draggingCrop) return;

                if (!this.toggleable) setTimeout(() => this.completelyClose(), 500);
                this.completelyClose();
            }
        }

        { // Handle
            const handle = getElementById("drawer-handle");
            handle.addEventListener("click", () => this.toggleSelection());
        }
    }

    public update(dt: number): void {
        if (!this.dragging) return;

        const mouseX = this.root.windowMouse.x;
        const mouseY = this.root.windowMouse.y;
        const gravity = 50;

        if (this.prevX < 0) this.prevX = mouseX;
        if (this.prevY < 0) this.prevY = mouseY;

        const velX = (mouseX - this.prevX) / dt * 0.1;
        const velY = (mouseY - this.prevY) / dt * 0.1;

        const degAcc = velX * Math.cos(this.angle - Math.PI / 4) - (gravity - velY) * Math.sin(this.angle - Math.PI / 4);
        this.angleVel += degAcc * dt;
        this.angle += this.angleVel * dt;
        // this.angle = (this.angle % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI);
        // const fixAngle = this.angle * 180 / Math.PI;
        // if (fixAngle > 180 + 45 && fixAngle < 360 - 45) {
        //     this.angle = (360 - 45) * Math.PI / 180;
        //     this.angleVel = 0;
        // } else if (fixAngle > 135 && fixAngle < 180 + 45) {
        //     this.angle = (135) * Math.PI / 180;
        //     this.angleVel = 0;
        // }

        this.angleVel *= 0.995;

        this.prevX = mouseX;
        this.prevY = mouseY;

        this.dragging.style.left = mouseX + "px";
        this.dragging.style.top = mouseY + "px";
        const image = this.dragging.firstChild as HTMLImageElement;
        image.style.transform = `rotate(${this.angle - Math.PI / 4}rad) translateY(35%) rotate(45deg)`;
    }

    private toggleSelection(): void {
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

    public completelyClose(): void {
        if (!this.toggleable) {
            setTimeout(() => this.completelyClose(), 500);
            return;
        }

        if (!this.informExpanded && !this.expanded) return;

        this.expanded = false;
        this.informExpanded = false;
        this.body.classList.toggle("open", false);
        this.informOuter.classList.toggle("open", false);
        this.getAudio("closing").play();
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

    private startDraggingCrop(crop: Crop): void {
        if (this.dragging) return;

        this.draggingCrop = crop;
        this.dragging = crop.createHTML();

        this.prevX = -1;
        this.prevY = -1;
        this.angle = 0;
        this.angleVel = 0;

        getElementById("plantDrag").appendChild(this.dragging);
    }

    /* -------------------- Helper Methods -------------------- */

    private getAudio(state: string): HTMLAudioElement {
        return getElementById(`drawer-${state}`);
    }
}
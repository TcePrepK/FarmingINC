import { createDiv, getElementById } from "../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../core/MouseAttachment";
import { Crop } from "./Crop";
import { Root } from "./Root";
import { InitializableObject } from "./types/InitializableObject";

type InventoryStage = {
    name: string;
    color: string;
    crops: Array<Crop>;
    body: HTMLDivElement;
}

export class Inventory extends InitializableObject {
    private readonly body: HTMLDivElement;
    private readonly innerBody: HTMLDivElement;
    private readonly informOuter!: HTMLDivElement;

    public readonly inventory: Array<InventoryStage> = [];

    private renderingCrop: Crop | null = null;
    public draggingCrop: Crop | null = null;
    public dragging: HTMLDivElement | null = null;
    public draggingTimeout: NodeJS.Timeout | null = null;

    private expanded = false;
    private informExpanded = false;

    private toggleable = true;

    // Dragging physics
    private prevX = -1;
    private prevY = -1;
    private angle = 0;
    private angleVel = 0;

    public constructor(root: Root) {
        super(root);

        this.body = getElementById("inventory");
        this.innerBody = getElementById("inv-container");
        this.informOuter = getElementById("inform-outer");
    }

    public initialize(): void {
        /* TODO: Plant Names:
            [
             "Cabbage", "Carrot", "Corn", "Cucumber", "Eggplant",
             "Green_bell_pepper", "Onion", "Pineapple", "Potato", "Pumpkin",
             "Spinach", "Strawberry", "Sweet_potato", "Tomato", "Turnip"
            ];
        */

        const firstStage = this.registerStage("first", "#742");
        const secondStage = this.registerStage("second", "#346");
        const thirdStage = this.registerStage("third", "#734");
        { // Registering all the plants
            // Stage 1
            this.registerCrop(firstStage, {
                name: "Cabbage",
                desc: "A cabbage is a vegetable that is a member of the Brassicaceae family. It is a cruciferous plant, with a tough, fibrous stem, and large, dark green leaves.",
                unlocked: true
            });

            // Stage 2
            this.registerCrop(secondStage, {
                name: "Carrot",
                desc: "A carrot is a root vegetable that is a member of the Apiaceae family. It is a cruciferous plant, with a tough, fibrous stem, and large, dark green leaves."
            });

            // Stage 3
            this.registerCrop(thirdStage, {
                name: "Corn",
                desc: "A corn is a vegetable that is a member of the Fabaceae family. It is a cruciferous plant, with a tough, fibrous stem, and large, dark green leaves."
            });
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
                if (!this.draggingCrop && !this.draggingTimeout) return;

                if (!this.toggleable) setTimeout(() => this.completelyClose(), 500);
                this.completelyClose();
            }
        }

        { // Handle
            const handle = getElementById("drawer-handle");
            handle.addEventListener("click", () => this.toggleSelection());
        }
    }

    private registerStage(name: string, color: string): InventoryStage {
        const body = createDiv({ id: `stage-${name}`, classes: ["stage-crops"], parent: this.innerBody });
        body.style.setProperty("--stage-color", color);
        return {
            name: name,
            color: color,
            crops: [],
            body: body
        } as InventoryStage;
    }

    private registerCrop(stage: InventoryStage, data: { name: string, desc: string, unlocked?: boolean }): void {
        const crop = new Crop(this.root, data.name, data.desc);
        stage.crops.push(crop);

        // HTML Part
        crop.createElement(stage.body);
        if (data.unlocked) crop.setUnlocked(true);
        if (data.name === "Carrot") crop.setSeenBefore(true);

        const attachment = MouseAttachment.attach(crop.body);
        attachment.onClick = button => {
            if (button !== ButtonType.LEFT) return;
            this.toggleCropRender(crop);
        }

        attachment.onDown = button => {
            if (button !== ButtonType.LEFT) return;
            this.draggingTimeout = setTimeout(this.startDraggingCrop.bind(this, crop), 200);
        }

        attachment.onUp = button => {
            if (button !== ButtonType.LEFT) return;
            if (!this.draggingTimeout) return;
            clearTimeout(this.draggingTimeout);
            this.draggingTimeout = null;
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
        if (!this.toggleable) {
            setTimeout(this.toggleCropRender.bind(this), 100);
            return;
        }

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
                    <span class="name">${formattedName}</span><span class="amount">[${crop.amount}]</span>
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
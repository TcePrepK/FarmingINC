import { createDiv } from "../../core/HtmlUtils";
import { ButtonType, MouseAttachment } from "../../core/MouseAttachment";
import { Root } from "../Root";
import { MoneyCurrency } from "../windows/upgrades/MoneyCurrency";
import { BaseCurrency } from "./BaseCurrency";
import { ScreenElement } from "./ScreenElement";

export type WindowHeader = {
    body: HTMLDivElement;
    title: HTMLDivElement;
    buttons: Array<HTMLDivElement>;
}

export type WindowStructure = {
    body: HTMLDivElement;
    header: WindowHeader;
    innerBody: HTMLDivElement;
}

export abstract class BaseWindow extends ScreenElement {
    protected readonly id: string;
    protected structure!: WindowStructure;

    public readonly currency: BaseCurrency;

    protected stageX = 0;
    protected stageY = 0;

    protected constructor(root: Root, id: string) {
        super(root);

        this.id = id;
        this.currency = new MoneyCurrency(root);
    }

    /**
     * Creates the whole structure of the stage. Always call even in override!!!
     * @param parent
     */
    public createElement(parent: HTMLElement): void {
        const body = createDiv({ id: this.id, classes: ["stage"], parent: parent });
        const header = this.createHeader(body);
        const innerBody = createDiv({ classes: ["inner-body"], parent: body });

        this.body = body;
        this.structure = { body, header, innerBody };
    }

    /**
     * Creates the header of the stage, header contains the title and the stylish buttons.
     * @param parent
     * @protected
     */
    protected createHeader(parent: HTMLDivElement): WindowHeader {
        const body = createDiv({ classes: ["header"], parent: parent });
        const title = createDiv({ classes: ["title"], parent: body });
        const buttons = this.createHeaderButtons(body);
        return { body, title, buttons };
    }

    /**
     * Creates each stylish buttons, called from createHeader.
     * @param parent
     * @protected
     */
    protected createHeaderButtons(parent: HTMLDivElement): Array<HTMLDivElement> {
        const buttonHolder = createDiv({ classes: ["button-holder"], parent: parent });
        const colors = ["#fd3", "#1f2", "#f21"];
        const buttons = [];
        for (let i = 0; i < 3; i++) {
            const button = createDiv({ classes: ["button"], parent: buttonHolder });
            button.style.setProperty("--button-color", colors[i]);
            buttons.push(button);
        }
        return buttons;
    }

    /**
     * Sets up the necessary listeners for the stage to get dragged from the header.
     * @protected
     */
    public setupDragging(): void {
        const attachment = MouseAttachment.attach(this.structure.header.body);

        let dragging = false;
        attachment.onDownRaw = event => {
            if (event.button !== ButtonType.LEFT) return;
            if (dragging) return;
            dragging = true;
        }

        this.root.windowMouse.onMove = (dx, dy) => {
            if (!dragging) return;
            this.stageX += dx;
            this.stageY += dy;
            this.updateTransform();
        }

        this.root.windowMouse.onUp = attachment.onClick = button => {
            if (button !== ButtonType.LEFT) return;
            if (!dragging) return;
            dragging = false;
        }

        this.root.windowMouse.onLeave = () => dragging = false;

        this.updateTransform();
        this.root.windowMouse.onResize = () => {
            this.updateTransform();
        }
    }

    public updateTransform(): void {
        const rect = this.body.getBoundingClientRect();
        const worldX = this.root.background.worldX;
        const worldY = this.root.background.worldY;
        const cornerX = this.stageX + worldX - (rect.width - this.root.windowWidth) / 2;
        const cornerY = this.stageY + worldY - (rect.height - this.root.windowHeight) / 2;

        this.body.style.left = `${cornerX}px`;
        this.body.style.top = `${cornerY}px`;
    }
}
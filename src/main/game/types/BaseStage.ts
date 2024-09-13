import { AttachedMouse, ButtonType } from "../../core/AttachedMouse";
import { createDiv } from "../../core/HtmlUtils";
import { Root } from "../Root";
import { BaseCurrency } from "./BaseCurrency";
import { ScreenElement } from "./ScreenElement";

export type StageHeader = {
    body: HTMLDivElement;
    title: HTMLDivElement;
    buttons: Array<HTMLDivElement>;
}

export type StageStructure = {
    body: HTMLDivElement;
    header: StageHeader;
    innerBody: HTMLDivElement;
}

export abstract class BaseStage extends ScreenElement {
    protected readonly id: string;
    protected structure!: StageStructure;

    protected readonly currency?: BaseCurrency;

    protected stageX = 0;
    protected stageY = 0;

    protected constructor(root: Root, id: string, currency?: BaseCurrency) {
        super(root);

        this.id = id;
        this.currency = currency;
    }

    public abstract initialize(): void;

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
    protected createHeader(parent: HTMLDivElement): StageHeader {
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
            button.style.setProperty("--color", colors[i]);
            buttons.push(button);
        }
        return buttons;
    }

    /**
     * Sets up the necessary listeners for the stage to get dragged from the header.
     * @protected
     */
    protected setupDragging(): void {
        const attachment = AttachedMouse.getAttachment(this.structure.header.body);

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
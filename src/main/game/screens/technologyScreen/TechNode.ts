import { createDiv } from "../../../core/HTMLUtils";
import { MouseAttachment } from "../../../core/MouseAttachment";
import { Root } from "../../Root";
import { ScreenElement } from "../../types/ScreenElement";

export enum TechNodeType {
    RESOURCE,
    TECHNOLOGY,
}

export class TechNode extends ScreenElement {
    private readonly x: number;
    private readonly y: number;

    public readonly name: string;
    public readonly desc: string;

    private readonly requires: Array<string> = [];

    // public readonly price: CustomNumber;

    public constructor(root: Root, x: number, y: number, name: string, desc: string, requirements: Array<string>) {
        super(root);

        this.x = x;
        this.y = y;
        this.name = name;
        this.desc = desc;

        this.requires = requirements;
    }

    public initialize(): void {
        const attachment = MouseAttachment.attach(this.body);

        attachment.onHover = () => {
            console.log("hover");
        }
    }

    /* ------------------- ScreenElement ------------------- */

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ id: this.name, parent: parent });
    }
}
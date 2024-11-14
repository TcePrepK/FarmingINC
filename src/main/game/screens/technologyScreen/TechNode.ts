import { createDiv } from "../../../core/HTMLUtils";
import { MouseAttachment } from "../../../core/MouseAttachment";
import { Root } from "../../Root";
import { ScreenElement } from "../../types/ScreenElement";

export class TechNode extends ScreenElement {
    public x: number;
    public y: number;

    private prevX: number;
    public prevY: number;

    public readonly name: string;
    public readonly desc: string;

    private readonly requires: Array<string> = [];

    // public readonly price: CustomNumber;

    public constructor(root: Root, x: number, y: number, name: string, desc: string, requirements: Array<string>) {
        super(root);

        this.prevX = this.x = x;
        this.prevY = this.y = y;
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

    public updateWorldTransform(centerX: number, centerY: number): void {
        this.body.style.left = `${centerX + this.x}px`;
        this.body.style.top = `${centerY + this.y}px`;
    }

    /* ------------------- TechTree Physics ------------------- */

    public update(dt: number): void {
        const velX = this.x - this.prevX;
        const velY = this.y - this.prevY;

        const accX = 0;
        const accY = 0;

        this.prevX = this.x;
        this.prevY = this.y;
        this.x += velX * 0.99 + accX * dt * dt;
        this.y += velY * 0.99 + accY * dt * dt;
    }

    public pushNode(other: TechNode): void {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dist2 = dx * dx + dy * dy;
        let dist = Math.sqrt(dist2);

        const force = 20 - dist2 / 1000;

        if (dist < 10) dist = 10;
        other.x += force / 100 * dx / dist;
        other.y += force / 100 * dy / dist;
    }

    /* ------------------- ScreenElement ------------------- */

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ id: this.name, classes: ["tech-node"], parent: parent });
    }
}
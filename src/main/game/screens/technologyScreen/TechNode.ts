import { createDiv } from "../../../core/HTMLUtils";
import { MouseAttachment } from "../../../core/MouseAttachment";
import { Vector2D } from "../../../core/Vector2D";
import { Root } from "../../Root";
import { ScreenElement } from "../../types/ScreenElement";
import { TechTree } from "./TechTree";

export class TechNode extends ScreenElement {
    public x: number;
    public y: number;
    public prevX: number;
    public prevY: number;

    public staticPoint: boolean;
    public readonly name: string;
    public readonly desc: string;

    public readonly requires: Array<string> = [];

    // public readonly price: CustomNumber;

    public constructor(root: Root, x: number, y: number, staticPoint: boolean, name: string, desc: string, requirements: Array<string>) {
        super(root);

        this.prevX = this.x = x;
        this.prevY = this.y = y;

        this.staticPoint = staticPoint;

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

    /**
     * Finds the average attraction of all nodes towards this node and moves towards it
     * @param attractors
     */
    public attractTowards(attractors: Array<Vector2D>): void {
        let forceX = 0;
        let forceY = 0;
        for (let i = 0; i < attractors.length; i++) {
            const attractor = attractors[i];
            const dx = attractor.x - this.x;
            const dy = attractor.y - this.y;
            const dist2 = dx * dx + dy * dy;

            const force = 1 / dist2;
            forceX += dx * force;
            forceY += dy * force;
        }

        this.x += forceX;
        this.y += forceY;
    }

    /**
     * Kills all attractors that are too close to this node
     * @param attractors
     */
    public killAttractors(attractors: Array<Vector2D>): void {
        const killDistance = 50;
        for (let i = 0; i < attractors.length; i++) {
            const attractor = attractors[i];
            const dx = attractor.x - this.x;
            const dy = attractor.y - this.y;
            const dist2 = dx * dx + dy * dy;

            if (dist2 < killDistance * killDistance) {
                attractors.splice(i, 1);
                i--;
            }
        }
    }

    public update(): void {
        if (this.staticPoint) return;

        // const velX = this.x - this.prevX;
        // const velY = this.y - this.prevY;

        this.prevX = this.x;
        this.prevY = this.y;
        // this.x += velX * 0.2 + this.velX;
        // this.y += velY * 0.2 + this.velY;
    }

    public maintainChains(): void {
        for (const key of this.requires) {
            const otherNode = TechTree.nodesByName.get(key)!;
            this.chainNodes(otherNode);
        }
    }

    private chainNodes(other: TechNode): void {
        if (this.staticPoint) return;

        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist2 = dx * dx + dy * dy;
        const dist = Math.sqrt(dist2);

        let heightVal = -this.y;
        if (heightVal < 0) heightVal = 0;

        const expectedDist = 100 - heightVal / 100;
        if (dist < expectedDist) return;

        const nx = expectedDist * dx / dist;
        const ny = expectedDist * dy / dist;

        this.x = other.x + nx;
        this.y = other.y + ny;
    }

    public pushNode(other: TechNode): void {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dist2 = dx * dx + dy * dy;
        // if (dist2 < 10) dist2 = 10;

        const dist = Math.sqrt(dist2);
        if (dist < 0.01) return;
        if (dist > 100) return;

        let force = 1 / (dist / 200);
        if (force > 500) force = 500;

        const nx = force * dx / dist;
        const ny = force * dy / dist;

        if (!this.staticPoint) {
            this.x -= nx;
            this.y -= ny;
        }
        if (!other.staticPoint) {
            other.x += nx;
            other.y += ny;
        }
    }

    /* ------------------- ScreenElement ------------------- */

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({ id: this.name, classes: ["tech-node"], parent: parent });
    }
}
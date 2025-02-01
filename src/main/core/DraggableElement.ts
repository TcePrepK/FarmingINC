import { Root } from "../game/Root";
import { InitializableObject } from "../game/types/InitializableObject";
import { createDiv, getElementById } from "./HTMLUtils";

export class DraggableElement extends InitializableObject {
    private readonly wrapper: HTMLElement;
    private readonly body: HTMLElement;

    private holdingX = 0;
    private holdingY = 0;

    private prevX = -1;
    private prevY = -1;
    private angle = 0;
    private angleVel = 0;

    public constructor(root: Root, body: HTMLElement) {
        super(root);

        this.wrapper = createDiv({ classes: ["draggable-wrapper"] }, body);
        this.body = body;

        getElementById("drag-area").appendChild(this.wrapper);
    }

    /**
     * Handles the dragging physics
     * @param dt
     */
    public update(dt: number): void {
        dt /= 1000;

        const mouseX = this.root.windowMouse.x;
        const mouseY = this.root.windowMouse.y;
        const gravity = 50;

        if (this.prevX < 0) this.prevX = mouseX;
        if (this.prevY < 0) this.prevY = mouseY;

        const velX = (this.prevX - mouseX) * 10;
        const velY = (this.prevY - mouseY) * 10 + gravity;

        const radius = (0.5 - this.holdingX) ** 2 + (0.5 - this.holdingY) ** 2;
        const beta = Math.atan2(0.5 - this.holdingY, 0.5 - this.holdingX);

        const torqueY = velY * Math.cos(this.angle + beta) * Math.sqrt(radius);
        const torqueX = velX * -Math.sin(this.angle + beta) * Math.sqrt(radius);
        const torque = torqueX + torqueY;

        this.angleVel += torque * dt;
        this.angle += this.angleVel * dt;
        // const degAcc = velX * Math.cos(this.angle - Math.PI / 4) - (gravity - velY) * Math.sin(this.angle - Math.PI / 4);
        // this.angleVel += degAcc * dt;
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

        this.wrapper.style.setProperty("--holding-x", `${this.holdingX}`);
        this.wrapper.style.setProperty("--holding-y", `${this.holdingY}`);
        this.wrapper.style.setProperty("--rotation", `${this.angle}rad`);

        this.wrapper.style.left = mouseX + "px";
        this.wrapper.style.top = mouseY + "px";
    }

    /**
     * Sets the holding position of the draggable element
     * @param x
     * @param y
     */
    public setHolding(x: number, y: number): void {
        this.holdingX = x;
        this.holdingY = y;
    }

    public destroy(): void {
        this.wrapper.remove();
    }
}
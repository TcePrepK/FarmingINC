import { getElementById } from "../../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../../core/MouseAttachment";
import { Rectangle } from "../../core/Rectangle";
import { Signal } from "../../core/Signal";
import { Vector2D } from "../../core/Vector2D";
import { Root } from "../Root";
import { InitializableObject } from "../types/InitializableObject";

export class Background extends InitializableObject {
    private readonly background!: HTMLCanvasElement;
    public readonly attachment!: MouseAttachment<HTMLCanvasElement>;
    public readonly context!: CanvasRenderingContext2D;

    public readonly onCenterChange: Signal<[number, number]> = new Signal();
    public readonly onUpdate: Signal<[]> = new Signal();

    public worldX = 0;
    public worldY = 0;

    public renderRect = new Rectangle(0, 0, 0, 0);
    public top = 0;
    public right = 0;
    public bottom = 0;
    public left = 0;

    public grabbing = false;

    public constructor(root: Root, canvasID: string) {
        super(root);

        this.background = getElementById(canvasID) as HTMLCanvasElement;
        this.attachment = MouseAttachment.attach(this.background);
        this.context = this.background.getContext("2d") as CanvasRenderingContext2D;
    }

    public initialize(): void {
        { // Canvas resizing
            this.background.width = this.root.windowWidth;
            this.background.height = this.root.windowHeight;
            this.root.windowMouse.onResize = (w, h) => {
                this.background.width = w;
                this.background.height = h;
                this.reinitializeSides();

                const center = this.getCenter();
                this.onCenterChange.dispatch(center.x, center.y);
                this.onUpdate.dispatch();
            };
            this.reinitializeSides();
        }

        { // Canvas movement
            this.attachment.onDown = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                this.grabbing = true;
            };

            this.root.windowMouse.onUp = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                this.grabbing = false;
            };

            this.root.windowMouse.onLeave = () => this.grabbing = false;

            this.root.windowMouse.onMove = (dx: number, dy: number) => {
                if (!this.grabbing) return;
                this.worldX += dx;
                this.worldY += dy;
                this.reinitializeSides();

                const center = this.getCenter();
                this.onCenterChange.dispatch(center.x, center.y);
                this.onUpdate.dispatch();
            };
        }
    }

    public screenToWorld(x: number, y: number): Vector2D {
        const center = this.getCenter();
        return new Vector2D(x - center.x, y - center.y);
    }

    public worldToScreen(x: number, y: number): Vector2D {
        const center = this.getCenter();
        return new Vector2D(x + center.x, y + center.y);
    }

    private reinitializeSides(): void {
        const w = this.root.windowWidth;
        const h = this.root.windowHeight;
        const x = this.worldX;
        const y = this.worldY;

        this.right = w / 2 - x;
        this.bottom = h / 2 - y;
        this.left = -w / 2 - x;
        this.top = -h / 2 - y;

        this.renderRect.x = this.left;
        this.renderRect.y = this.top;
        this.renderRect.width = this.right - this.left;
        this.renderRect.height = this.bottom - this.top;
    }

    public startDrawing(): void {
        const center = this.getCenter();
        this.context.save();
        this.context.translate(center.x, center.y);
    }

    public finalizeDrawing(): void {
        this.context.restore();
    }

    /* ------------------- Getters ------------------- */

    public getCenter(): Vector2D {
        return new Vector2D(this.worldX + this.root.windowWidth / 2, this.worldY + this.root.windowHeight / 2);
    }
}
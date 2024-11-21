import { getElementById } from "../../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../../core/MouseAttachment";
import { Signal } from "../../core/Signal";
import { Vector2D } from "../../core/Vector2D";
import { Root } from "../Root";
import { InitializableObject } from "../types/InitializableObject";

export class Background extends InitializableObject {
    private readonly background!: HTMLCanvasElement;
    public readonly context!: CanvasRenderingContext2D;

    public readonly onCenterChange: Signal<[number, number]> = new Signal();

    public worldX = 0;
    public worldY = 0;

    public constructor(root: Root, canvasID: string) {
        super(root);

        this.background = getElementById(canvasID) as HTMLCanvasElement;
        this.context = this.background.getContext("2d") as CanvasRenderingContext2D;
    }

    public initialize(): void {
        { // Canvas resizing
            this.background.width = this.root.windowWidth;
            this.background.height = this.root.windowHeight;
            this.root.windowMouse.onResize = (w, h) => {
                this.background.width = w;
                this.background.height = h;

                const center = this.getCenter();
                this.onCenterChange.dispatch(center.x, center.y);
            };
        }

        { // Canvas movement
            const attachment = MouseAttachment.attach(this.background);

            let grabbing = false;
            attachment.onDown = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                this.root.structure.inventory.completelyClose();
                grabbing = true;
            };

            this.root.windowMouse.onUp = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                grabbing = false;
            };

            this.root.windowMouse.onLeave = () => grabbing = false;

            this.root.windowMouse.onMove = (dx: number, dy: number) => {
                if (!grabbing) return;
                this.worldX += dx;
                this.worldY += dy;

                const center = this.getCenter();
                this.onCenterChange.dispatch(center.x, center.y);
            };
        }
    }

    public startDrawing(): void {
        this.context.clearRect(0, 0, this.root.windowWidth, this.root.windowHeight);

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
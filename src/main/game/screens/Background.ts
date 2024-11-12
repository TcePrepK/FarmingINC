import { getElementById } from "../../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../../core/MouseAttachment";
import { Root } from "../Root";
import { InitializableObject } from "../types/InitializableObject";

export class Background extends InitializableObject {
    private readonly background!: HTMLCanvasElement;
    public readonly context!: CanvasRenderingContext2D;

    public worldX = 0;
    public worldY = 0;

    public constructor(root: Root, canvasID: string) {
        super(root);

        this.background = getElementById(canvasID) as HTMLCanvasElement;
        this.context = this.background.getContext("2d") as CanvasRenderingContext2D;
    }

    public initialize(): void {
        const logo = getElementById("logo-wrapper");
        logo.style.left = `${this.root.windowWidth / 2}px`;
        logo.style.top = `${this.root.windowHeight / 2}px`;

        this.background.width = this.root.windowWidth;
        this.background.height = this.root.windowHeight;
        this.root.windowMouse.onResize = (w, h) => {
            this.background.width = w;
            this.background.height = h;

            logo.style.left = `${this.root.windowWidth / 2}px`;
            logo.style.top = `${this.root.windowHeight / 2}px`;
        };

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
                this.root.structure.updateWorldTransform();

                const logoX = this.worldX + this.root.windowWidth / 2;
                const logoY = this.worldY + this.root.windowHeight / 2;
                logo.style.left = `${logoX}px`;
                logo.style.top = `${logoY}px`;
            };
        }
    }

    public startDrawing(): void {
        this.context.clearRect(0, 0, this.root.windowWidth, this.root.windowHeight);

        const dx = this.worldX + this.root.windowWidth / 2;
        const dy = this.worldY + this.root.windowHeight / 2;

        this.context.save();
        this.context.translate(dx, dy);
    }

    public finalizeDrawing(): void {
        this.context.restore();
    }
}
import { getElementById } from "../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../core/MouseAttachment";
import { InitializableObject } from "./types/InitializableObject";

export class Background extends InitializableObject {
    private ctx!: CanvasRenderingContext2D;

    public worldX = 0;
    public worldY = 0;

    public initialize(): void {
        const canvas: HTMLCanvasElement = getElementById("playground-canvas");
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const logo = getElementById("logo-wrapper");
        logo.style.left = `${this.root.windowWidth / 2}px`;
        logo.style.top = `${this.root.windowHeight / 2}px`;

        canvas.width = this.root.windowWidth;
        canvas.height = this.root.windowHeight;
        this.root.windowMouse.onResize = (w, h) => {
            canvas.width = w;
            canvas.height = h;

            logo.style.left = `${this.root.windowWidth / 2}px`;
            logo.style.top = `${this.root.windowHeight / 2}px`;
        };

        { // Canvas movement
            const playground = getElementById("stages");
            const attachment = MouseAttachment.attach(playground);

            let grabbing = false;
            attachment.onDown = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                grabbing = true;
            };

            attachment.onUp = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                grabbing = false;
            };

            attachment.onLeave = () => grabbing = false;

            attachment.onMove = (dx: number, dy: number) => {
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

    public updateFrame(): void {
        this.ctx.clearRect(0, 0, this.root.windowWidth, this.root.windowHeight);

        const dx = this.worldX + this.root.windowWidth / 2;
        const dy = this.worldY + this.root.windowHeight / 2;
        this.ctx.translate(dx, dy);
        this.lines(128, 2, "#454570");
        this.lines(32, 1, "#353560");
        this.ctx.translate(-dx, -dy);
    }

    private lines(size: number, width: number, color: string): void {
        const ctx = this.ctx;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        const w = this.root.windowWidth / 2;
        const h = this.root.windowHeight / 2;

        const left = Math.floor(-w / size) * size;
        const top = Math.floor(-h / size) * size;
        const right = Math.ceil(w / size) * size;
        const bottom = Math.ceil(h / size) * size;

        for (let i = left; i < right; i++) {
            ctx.beginPath();
            ctx.moveTo(i * size, top * size);
            ctx.lineTo(i * size, bottom * size);
            ctx.stroke();
        }

        for (let i = top; i < bottom; i++) {
            ctx.beginPath();
            ctx.moveTo(left * size, i * size);
            ctx.lineTo(right * size, i * size);
            ctx.stroke();
        }
    }
}
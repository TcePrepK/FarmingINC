import { getElementById } from "../core/HtmlUtils";
import { InitializableObject } from "./InitializableObject";

export class Background extends InitializableObject {
    private ctx!: CanvasRenderingContext2D;

    public initialize(): void {
        const canvas: HTMLCanvasElement = getElementById("playground-canvas");
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        canvas.width = this.root.windowWidth;
        canvas.height = this.root.windowHeight;
        this.root.windowMouse.onResize = (w, h) => {
            canvas.width = w;
            canvas.height = h;
        };
    }

    public updateFrame(): void {
        this.lines(128, 2, "#454570");
        this.lines(32, 1, "#353560");
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
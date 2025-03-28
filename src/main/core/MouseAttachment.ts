import { checkFor } from "./HTMLUtils";

export enum ButtonType {
    LEFT,
    MIDDLE,
    RIGHT
}

export class MouseAttachment<T extends HTMLElement> {
    private static instances: Map<HTMLElement, MouseAttachment<never>> = new Map();

    public x = 0;
    public y = 0;

    private element!: T;

    private constructor(element: T) {
        this.element = element;

        checkFor(element, "MouseAttachment can only be attached to HTMLElements.");
        this.element.addEventListener("mousemove", e => {
            this.x = e.clientX;
            this.y = e.clientY;
        });
    }

    static attach<T extends HTMLElement>(element: T): MouseAttachment<T> {
        if (MouseAttachment.instances.has(element)) return MouseAttachment.instances.get(element)!;
        return new MouseAttachment(element);
    }

    /* ------------------- Listener Methods ------------------- */

    set onDown(fun: (button: ButtonType | never) => unknown) {
        this.element.addEventListener("mousedown", e => fun(e.button));
    }

    set onUp(fun: (button: ButtonType | never) => unknown) {
        this.element.addEventListener("mouseup", e => fun(e.button));
    }

    set onClick(fun: (button: ButtonType | never) => unknown) {
        this.element.addEventListener("click", e => fun(e.button));
    }

    set onMove(fun: (dx: number, dy: number) => unknown) {
        this.element.addEventListener("mousemove", e => fun(e.movementX, e.movementY));
    }

    set onDrag(fun: (dx: number, dy: number) => unknown) {
        this.element.addEventListener("drag", e => fun(e.movementX, e.movementY));
    }

    set onDragStart(fun: () => unknown) {
        this.element.addEventListener("dragstart", () => fun());
    }

    set onDragStop(fun: () => unknown) {
        this.element.addEventListener("dragend", () => fun());
    }

    set onDragOver(fun: () => unknown) {
        this.element.addEventListener("dragover", () => fun());
    }

    set onEnter(fun: () => unknown) {
        this.element.addEventListener("mouseenter", () => fun());
    }

    set onHover(fun: () => unknown) {
        this.element.addEventListener("mouseover", () => fun());
    }

    set onLeave(fun: () => unknown) {
        this.element.addEventListener("mouseleave", () => fun());
    }

    set onWheel(fun: (delta: number) => unknown) {
        this.element.addEventListener("wheel", e => fun(e.deltaY));
    }

    set onResize(fun: (width: number, height: number) => unknown) {
        this.element.addEventListener("resize", () => fun(this.element.clientWidth, this.element.clientHeight));
    }

    //-------------------------- Raw Methods --------------------------//

    set onDownRaw(fun: (event: MouseEvent) => unknown) {
        this.element.addEventListener("mousedown", fun);
    }

    set onUpRaw(fun: (event: MouseEvent) => unknown) {
        this.element.addEventListener("mouseup", fun);
    }

    set onClickRaw(fun: (event: MouseEvent) => unknown) {
        this.element.addEventListener("click", fun);
    }

    set onMoveRaw(fun: (event: MouseEvent) => unknown) {
        this.element.addEventListener("mousemove", fun);
    }

    set onDragRaw(fun: (event: DragEvent) => unknown) {
        this.element.addEventListener("drag", fun);
    }

    set onDragStartRaw(fun: (event: DragEvent) => unknown) {
        this.element.addEventListener("dragstart", fun);
    }

    set onDragStopRaw(fun: (event: DragEvent) => unknown) {
        this.element.addEventListener("dragend", fun);
    }

    set onDragOverRaw(fun: (event: DragEvent) => unknown) {
        this.element.addEventListener("dragover", fun);
    }

    set onEnterRaw(fun: (event: MouseEvent) => unknown) {
        this.element.addEventListener("mouseenter", fun);
    }

    set onHoverRaw(fun: (event: MouseEvent) => unknown) {
        this.element.addEventListener("mouseover", fun);
    }

    set onLeaveRaw(fun: (event: MouseEvent) => unknown) {
        this.element.addEventListener("mouseleave", fun);
    }

    set onWheelRaw(fun: (event: WheelEvent) => unknown) {
        this.element.addEventListener("wheel", fun);
    }
}
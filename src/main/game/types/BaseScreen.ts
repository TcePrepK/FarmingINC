import { MouseAttachment } from "../../core/MouseAttachment";
import { Root } from "../Root";
import { InitializableObject } from "./InitializableObject";

export class BaseScreen extends InitializableObject {
    protected body!: HTMLDivElement;
    protected selector!: HTMLButtonElement;

    public constructor(root: Root, id: string) {
        super(root);

        this.body = document.getElementById(`${id}-screen`) as HTMLDivElement;
        this.selector = document.getElementById(`${id}-screen-option`) as HTMLButtonElement;

        MouseAttachment.attach(this.selector).onClickRaw = (event) => this.enable(root, event);
    }

    public enable(root: Root, event: MouseEvent | null): void {
        root.disableAllScreens();

        this.selector.classList.add("selected");
        this.body.classList.add("active");

        if (event) event.stopPropagation();
    }

    public disable(): void {
        this.selector.classList.remove("selected");
        this.body.classList.remove("active");
    }
}
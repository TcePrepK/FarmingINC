import { MouseAttachment } from "../core/MouseAttachment";
import { Root } from "./Root";

export class BaseScreen {
    protected body!: HTMLDivElement;
    protected selector!: HTMLButtonElement;

    public static create(root: Root, id: string): BaseScreen {
        return new BaseScreen(root, id);
    }

    private constructor(root: Root, id: string) {
        this.body = document.getElementById(`${id}-screen`) as HTMLDivElement;
        this.selector = document.getElementById(`${id}-screen-option`) as HTMLButtonElement;

        MouseAttachment.attach(this.selector).onClick = this.enable.bind(this, root);
    }

    public enable(root: Root): void {
        root.disableAllScreens();

        this.selector.classList.add("selected");
        this.body.style.opacity = "1";
    }

    public disable(): void {
        this.selector.classList.remove("selected");
        this.body.style.opacity = "0";
    }
}
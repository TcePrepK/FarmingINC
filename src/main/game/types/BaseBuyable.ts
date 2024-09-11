import {createDiv} from "../../core/HtmlUtils";
import {Root} from "../Root";
import {ScreenElement} from "./ScreenElement";

export class BaseBuyable extends ScreenElement {
    public name: string;
    public desc: string;

    public constructor(root: Root, name: string, desc: string) {
        super(root);

        this.name = name;
        this.desc = desc;
    }

    public initialize(root: Root): void {
        this.root = root;
    }

    public createElement(parent: HTMLElement): void {
        this.body = createDiv({id: this.name, classes: ["buyable"], parent: parent});
    }
}
import { Root } from "../../Root";
import { InitializableObject } from "../../types/InitializableObject";

export class NodeConnection extends InitializableObject {
    public readonly from: string;
    public readonly to: string;

    public constructor(root: Root, from: string, to: string) {
        super(root);
        
        this.from = from;
        this.to = to;
    }

    public createElement(parent: HTMLElement): void {
        const line = document.createElement("div");
        line.classList.add("node-connection");
        parent.appendChild(line);
    }
}
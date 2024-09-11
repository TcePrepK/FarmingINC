import {Root} from "./Root";

export abstract class InitializableObject {
    protected root: Root;

    public constructor(root: Root) {
        this.root = root;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public update(): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public updateFrame(): void {
    }
}
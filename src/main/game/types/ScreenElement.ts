import {InitializableObject} from "../InitializableObject";

export abstract class ScreenElement extends InitializableObject {
    public body!: HTMLElement;

    public abstract createElement(parent: HTMLElement): void;

    public getChild<T extends HTMLElement>(id: string): T | undefined {
        return this.body.querySelector(`#${id}`) as T;
    }
}
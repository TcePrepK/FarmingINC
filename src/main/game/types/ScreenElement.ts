import { InitializableObject } from "./InitializableObject";

export abstract class ScreenElement extends InitializableObject {
    public body!: HTMLElement;

    public abstract createElement(parent: HTMLElement): void;

    public getByQuery<T extends HTMLElement>(query: string): T {
        const children = this.body.querySelector(query);
        if (children === null) throw new Error(`No children with query ${query} found`);
        return children as T;
    }

    public getFirstChildClass<T extends HTMLElement>(cls: string): T {
        const children = this.body.querySelector(`.${cls}`);
        if (children === null) throw new Error(`No children with class ${cls} found`);
        return children as T;
    }

    public getChildID<T extends HTMLElement>(id: string): T {
        const children = this.body.querySelector(`#${id}`);
        if (children === null) throw new Error(`No children with id ${id} found`);
        return children as T;
    }
}
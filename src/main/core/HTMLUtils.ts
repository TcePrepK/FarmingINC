export function checkFor<T>(check: T | undefined | null, message: string, error: string | null = ""): asserts check is T {
    if (check === null || check === undefined) {
        throw new Error(message + "\n" + error);
    }
}

export type ElementArgs = {
    parent?: HTMLElement
    classes?: string[]
};

type PossibleChildren = HTMLElement | string;

export function createElement<T extends HTMLElement>(tagName: string, data?: Partial<T> & ElementArgs, ...children: PossibleChildren[]): T {
    const element = document.createElement(tagName) as T;

    if (data !== undefined) {
        if (data.parent !== undefined) {
            data.parent.appendChild(element);
            delete data.parent;
        }

        if (data.classes !== undefined && data.classes.length > 0) {
            element.classList.add(...data.classes);
            delete data.classes;
        }

        Object.assign(element, data);
    }

    element.append(...children);

    return element;
}

export function createDiv(data?: Partial<HTMLDivElement> & ElementArgs, ...args: PossibleChildren[]): HTMLDivElement {
    return createElement<HTMLDivElement>("div", data, ...args);
}

export function createSpan(data?: Partial<HTMLSpanElement> & ElementArgs, ...args: PossibleChildren[]): HTMLSpanElement {
    return createElement<HTMLSpanElement>("span", data, ...args);
}

export function createButton(data?: Partial<HTMLButtonElement> & ElementArgs, ...args: PossibleChildren[]): HTMLButtonElement {
    return createElement<HTMLButtonElement>("button", data, ...args);
}

export function createInput(data?: Partial<HTMLInputElement> & ElementArgs, ...args: PossibleChildren[]): HTMLInputElement {
    return createElement<HTMLInputElement>("input", data, ...args);
}

export function createCanvas(data?: Partial<HTMLCanvasElement> & ElementArgs, ...args: PossibleChildren[]): HTMLCanvasElement {
    return createElement<HTMLCanvasElement>("canvas", data, ...args);
}

export function swapElements(parent: HTMLElement, oldElement: HTMLElement, newElement: HTMLElement): void {
    parent.insertBefore(newElement, oldElement);
    parent.removeChild(oldElement);
}

export function getElementById<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    checkFor(element, `Element with id "${id}" not found.`);
    return element as T;
}

export function getElementsByClass<T extends HTMLElement>(className: string): T[] {
    return [...document.getElementsByClassName(className)] as T[];
}

export function getElementsByQuery<T extends HTMLElement>(query: string): T[] {
    return [...document.querySelectorAll(query)] as T[];
}

export function getElementByQuery<T extends HTMLElement>(query: string): T {
    return document.querySelector(query) as T;
}

export function fixEveryPreload(): void {
    setTimeout(() => {
        const preloads = [...document.getElementsByClassName("preload")];
        for (const element of preloads) {
            element.classList.remove("preload");
        }
    }, 500);
}

// Totally stolen from GPT-4.0
export function createHTML(html: string): void {
    const parser = new DOMParser();

    // Parse the HTML string into a document
    const doc = parser.parseFromString(html, "text/html");

    // Get the body content of the parsed document
    const bodyContent = doc.body;

    // Append each child element of the parsed body to the actual document body
    while (bodyContent.firstChild) {
        document.body.appendChild(bodyContent.firstChild);
    }
}
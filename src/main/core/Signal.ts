type Listener<T extends unknown[]> = (...args: T) => void;

export class Signal<T extends unknown[]> {
    private listeners: Listener<T>[] = [];

    public add(listener: Listener<T>): void {
        this.listeners.push(listener);
    }

    public dispatch(...args: T): void {
        for (const listener of this.listeners) {
            listener(...args);
        }
    }
}
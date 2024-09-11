export class Timer {
    private lastTime: number = performance.now();

    public start(): void {
        this.lastTime = performance.now();
    }

    public peek(): number {
        return (performance.now() - this.lastTime) / 1000;
    }

    public stop(): number {
        return this.peek();
    }

    public update(): number {
        const num = this.peek();
        this.lastTime = performance.now();
        return num;
    }
}
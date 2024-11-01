export class FPSCounter {
    private lastTime: number = performance.now();
    public FPS = 0;

    public update(): number {
        const now = performance.now();
        const dt = now - this.lastTime;

        this.lastTime = now;
        this.FPS = 1000 / dt;

        return dt;
    }
}
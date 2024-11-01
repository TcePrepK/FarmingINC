import "../assets/style/style.scss";
import { FPSCounter } from "./core/FPSCounter";
import { fixEveryPreload } from "./core/HTMLUtils";

import { Root } from "./game/Root";
import { BrowserSupport } from "./ui/BrowserSupport";
import { ErrorScreen } from "./ui/ErrorScreen";

export class Main {
    public readonly root = new Root();

    private readonly fpsCounter = new FPSCounter();

    public initialize(): void {
        BrowserSupport.initialize();

        this.root.initialize();

        this.preload();
        this.startRunning();
    }

    private preload(): void {
        fixEveryPreload();
        ErrorScreen.setInactive();
    }

    public startRunning(): void {
        const dt = this.fpsCounter.update();

        this.root.update(dt / 1000);
        this.root.updateFrame();

        requestAnimationFrame(() => this.startRunning());
    }
}
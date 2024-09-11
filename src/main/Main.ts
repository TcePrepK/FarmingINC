import "../assets/style/style.scss";
import {FpsCounter} from "./core/FpsCounter";
import {GlobalVariables} from "./core/GlobalVariables";
import {fixEveryPreload} from "./core/HtmlUtils";

import {Root} from "./game/Root";
import {BrowserSupport} from "./ui/BrowserSupport";
import {ErrorScreen} from "./ui/ErrorScreen";

export class Main {
    public readonly root = new Root();

    private readonly fpsCounter = new FpsCounter();

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
        GlobalVariables.time += dt / 1000;

        this.root.update();
        this.root.updateFrame();

        requestAnimationFrame(() => this.startRunning());
    }
}
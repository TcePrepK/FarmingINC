import { AttachedMouse } from "../core/AttachedMouse";
import { Background } from "./Background";
import { Simulation } from "./Simulation";

export class Root {
    public windowMouse!: AttachedMouse<HTMLBodyElement>;
    public windowWidth = 0;
    public windowHeight = 0;

    public readonly background;
    public readonly simulation;

    public constructor() {
        this.background = new Background(this);
        this.simulation = new Simulation(this);
    }

    public initialize(): void {
        this.windowMouse = AttachedMouse.getAttachment(document.body as HTMLBodyElement);

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        document.body.dispatchEvent(new Event("resize"));
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            document.body.dispatchEvent(new Event("resize"));
        });

        this.background.initialize();
        this.simulation.initialize();
    }

    public update(): void {
    }

    public updateFrame(): void {
        this.background.updateFrame();
    }
}
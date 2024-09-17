import { MouseAttachment } from "../core/MouseAttachment";
import { Background } from "./Background";
import { Structure } from "./Structure";

export class Root {
    public windowMouse!: MouseAttachment<HTMLBodyElement>;
    public windowWidth = 0;
    public windowHeight = 0;

    public readonly background: Background;
    public readonly structure: Structure;

    public constructor() {
        this.background = new Background(this);
        this.structure = new Structure(this);
    }

    public initialize(): void {
        this.windowMouse = MouseAttachment.attach(document.body as HTMLBodyElement);

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        document.body.dispatchEvent(new Event("resize"));
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            document.body.dispatchEvent(new Event("resize"));
        });

        this.background.initialize();
        this.structure.initialize();
    }

    public update(dt: number): void {
        this.structure.update(dt);
    }

    public updateFrame(): void {
        this.background.updateFrame();
        this.structure.updateFrame();
    }
}
import { MouseAttachment } from "../core/MouseAttachment";
import { Structure } from "./screens/mainScreen/Structure";
import { Settings } from "./screens/settingsScreen/Settings";
import { TechnologyScreen } from "./screens/technologyScreen/TechnologyScreen";
import { BaseScreen } from "./types/BaseScreen";

export class Root {
    public windowMouse!: MouseAttachment<HTMLBodyElement>;
    public windowWidth = 0;
    public windowHeight = 0;

    public readonly allScreens: BaseScreen[] = [];

    public readonly settings: Settings;
    public readonly structure: Structure;

    public constructor() {
        this.allScreens.push(new BaseScreen(this, "main"));
        this.allScreens.push(new TechnologyScreen(this));
        this.allScreens.push(new BaseScreen(this, "settings"));

        this.disableAllScreens();
        this.allScreens[1].enable(this);

        this.settings = new Settings(this);
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

        /** DEBUG: Prints target lol **/
        // this.windowMouse.onClickRaw = event => {
        //     console.log(event.target);
        // }

        this.settings.initialize();
        this.structure.initialize();

        this.allScreens.forEach(screen => screen.initialize())
    }

    public disableAllScreens(): void {
        this.allScreens.forEach(screen => screen.disable());
    }

    public update(dt: number): void {
        this.structure.update(dt);

        this.allScreens.forEach(screen => screen.update(dt));
    }

    public updateFrame(): void {
        this.structure.updateFrame();

        this.allScreens.forEach(screen => screen.updateFrame());
    }
}
import { MouseAttachment } from "../core/MouseAttachment";
import { CurrencyManager } from "./screens/CurrencyManager";
import { FarmingScreen } from "./screens/farmingScreen/FarmingScreen";
import { Settings } from "./screens/settingsScreen/Settings";
import { TechnologyScreen } from "./screens/technologyScreen/TechnologyScreen";
import { BaseScreen } from "./types/BaseScreen";

export class Root {
    public windowMouse!: MouseAttachment<HTMLBodyElement>;
    public windowWidth = 0;
    public windowHeight = 0;

    public readonly allScreens: BaseScreen[] = [];

    public readonly settings: Settings;
    public readonly currencyManager: CurrencyManager;

    public constructor() {
        this.allScreens.push(new FarmingScreen(this));
        this.allScreens.push(new TechnologyScreen(this));
        this.allScreens.push(new BaseScreen(this, "settings"));

        this.disableAllScreens();
        this.allScreens[0].enable(this, null);

        this.settings = new Settings(this);
        this.currencyManager = new CurrencyManager(this);
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
        this.currencyManager.initialize();

        this.allScreens.forEach(screen => screen.initialize())
    }

    public disableAllScreens(): void {
        this.allScreens.forEach(screen => screen.disable());
    }

    public update(dt: number): void {
        this.allScreens.forEach(screen => screen.update(dt));
    }

    public updateFrame(): void {
        this.allScreens.forEach(screen => screen.updateFrame());
    }
}
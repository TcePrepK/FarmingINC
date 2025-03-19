import { ButtonType } from "../../../core/MouseAttachment";
import { Root } from "../../Root";
import { BaseScreen } from "../../types/BaseScreen";
import { Background } from "../Background";
import { BaseEnvironment } from "./environments/BaseEnvironment";
import { StartingEnvironment } from "./environments/StartingEnvironment";
import { Inventory } from "./Inventory";
import { TileManager } from "./TileManager";

export class FarmingScreen extends BaseScreen {
    public background!: Background;
    
    public tileManager: TileManager;
    public inventory = new Inventory(this.root);

    public environment!: BaseEnvironment;

    public constructor(root: Root) {
        super(root, "farming");

        this.background = new Background(root, "farming-background");
        this.tileManager = new TileManager(root, this.background);
        this.environment = new StartingEnvironment(root, this.background, this.tileManager);

        // this.grassTileSet.loadedEvent.add(() => this.drawBackground());
        // this.flowerSet.loadedEvent.add(() => this.drawBackground());
    }

    public initialize(): void {
        this.background.initialize();
        this.inventory.initialize();
        this.tileManager.initialize();

        { // Background events
            this.background.attachment.onClick = (button: ButtonType) => {
                if (button !== ButtonType.LEFT) return;
                this.inventory.completelyClose();
            };
        }
    }

    /**
     * Updates the state of the screen,
     * Which involves:
     * - Updating the inventory
     * - Updating the tile manager
     * @param dt The passed delta time
     */
    public update(dt: number): void {
        this.inventory.update(dt);
        this.tileManager.update(dt);
    }

    /**
     * Updates the frame of the screen,
     * Which involves:
     * - Drawing the environment
     * - Updating the inventory
     * - Updating the tile manager
     */
    public updateFrame(): void {
        this.environment.drawEnvironment();
        this.inventory.updateFrame();
        this.tileManager.updateFrame();
    }

    /* ----------------- Helper Drawing Methods ----------------- */
}
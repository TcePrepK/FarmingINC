import { Logger } from "./main/core/Logger";
import { Main } from "./main/Main";
import { ErrorScreen } from "./main/ui/ErrorScreen";
// @ts-ignore
import "./assets/style/style.scss";

const logger = new Logger("Index Initialization", "✅");

logger.log("Renderer initialized successfully!");

logger.log("Imported main successfully!");
logger.log("Starting the main process...");

try {
    const main = new Main();
    main.initialize();
} catch (error) {
    ErrorScreen.setActive(error);
}

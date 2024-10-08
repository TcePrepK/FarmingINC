import { getElementsByClass } from "../core/HTMLUtils";
import { Logger } from "../core/Logger";

export enum Browser {
    Chrome,
    Firefox,
    Safari,
    Edge,
    IE,
    Opera,
    Unknown
}

const logger = new Logger("Browser Support", "✔️");

export class BrowserSupport {
    private static browser: Browser;

    public static initialize(): void {
        this.browser = this.detectBrowser();
        logger.log("Browser: " + Browser[this.browser]);

        this.updateScrollbars();
    }

    private static updateScrollbars(): void {
        if (this.browser !== Browser.Firefox) return;
        const selection = getElementsByClass("scrollable");
        for (const element of selection) {
            element.classList.remove("scrollable");
            element.classList.add("firefox-scrollbar");
        }
    }

    private static detectBrowser(): Browser {
        const userAgent = navigator.userAgent;

        if (/chrome|crios|crmo/i.test(userAgent)) {
            return Browser.Chrome;
        } else if (/firefox|fxios/i.test(userAgent)) {
            return Browser.Firefox;
        } else if (/safari/i.test(userAgent)) {
            return Browser.Safari;
        } else if (/edg/i.test(userAgent)) {
            return Browser.Edge;
        } else if (/trident/i.test(userAgent)) {
            return Browser.IE;
        } else if (/opr\//i.test(userAgent)) {
            return Browser.Opera;
        } else {
            return Browser.Unknown;
        }
    }
}

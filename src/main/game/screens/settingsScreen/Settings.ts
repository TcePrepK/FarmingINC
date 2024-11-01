import { getElementByQuery } from "../../../core/HTMLUtils";
import { ButtonType, MouseAttachment } from "../../../core/MouseAttachment";
import { InitializableObject } from "../../types/InitializableObject";

export class Settings extends InitializableObject {
    private autoSave = true;
    private exportToClipboard = false;

    public initialize(): void {
        this.initializeSaveSettings();
    }

    private initializeSaveSettings(): void {
        { // Auto Save Toggle
            const autoSaveToggle = getElementByQuery("#auto-save-toggle");
            MouseAttachment.attach(autoSaveToggle).onClick = (button) => {
                if (button !== ButtonType.LEFT) return;
                const thumb = autoSaveToggle.querySelector(".checkbox-thumb")!;
                thumb.classList.toggle("enabled");
                this.autoSave = !this.autoSave;
            };
        }

        { // Export To Clipboard
            const exportToClipboard = getElementByQuery("#export-clipboard");
            MouseAttachment.attach(exportToClipboard).onClick = (button) => {
                if (button !== ButtonType.LEFT) return;
                const thumb = exportToClipboard.querySelector(".checkbox-thumb")!;
                thumb.classList.toggle("enabled");
                this.exportToClipboard = !this.exportToClipboard;
            };
        }

        { // Import/Export Save
            const importSave = getElementByQuery("#import-save");
            MouseAttachment.attach(importSave).onClick = (button) => {
                if (button !== ButtonType.LEFT) return;
                // Import save here, open the dialog.
            };

            const exportSave = getElementByQuery("#export-save");
            MouseAttachment.attach(exportSave).onClick = (button) => {
                if (button !== ButtonType.LEFT) return;
                // Export save here, depending on
            };
        }
    }
}
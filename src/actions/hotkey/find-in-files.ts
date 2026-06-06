import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { Icons } from "../../utils/icons";

/** Sends the Find in Files hotkey (Ctrl+Shift+F) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-find-in-files" })
export class HotkeyFindInFiles extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.FIND_IN_FILES);
		} catch (error) {
			streamDeck.logger.error("HotkeyFindInFiles failed:", error);
			await ev.action.showAlert();
		}
	}

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setImage(Icons.FIND);
	}
}

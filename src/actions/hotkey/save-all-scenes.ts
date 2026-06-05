import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Save All Scenes hotkey (Ctrl+Shift+Alt+S) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-save-all-scenes" })
export class HotkeySaveAllScenes extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.SAVE_ALL_SCENES);
		} catch (error) {
			streamDeck.logger.error("HotkeySaveAllScenes failed:", error);
			await ev.action.showAlert();
		}
	}
}

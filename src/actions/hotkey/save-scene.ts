import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Save Scene hotkey (Ctrl+S) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-save-scene" })
export class HotkeySaveScene extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.SAVE_SCENE);
		} catch (error) {
			streamDeck.logger.error("HotkeySaveScene failed:", error);
			await ev.action.showAlert();
		}
	}
}

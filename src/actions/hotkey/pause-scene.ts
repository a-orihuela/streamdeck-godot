import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Pause hotkey (F7) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-pause-scene" })
export class HotkeyPauseScene extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.PAUSE_SCENE);
		} catch (error) {
			streamDeck.logger.error("HotkeyPauseScene failed:", error);
			await ev.action.showAlert();
		}
	}
}

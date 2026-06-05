import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Distraction Free Mode hotkey (Ctrl+Shift+F11) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-distraction-free" })
export class HotkeyDistractionFree extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.DISTRACTION_FREE);
		} catch (error) {
			streamDeck.logger.error("HotkeyDistractionFree failed:", error);
			await ev.action.showAlert();
		}
	}
}

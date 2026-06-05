import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Redo hotkey (Ctrl+Y) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-redo" })
export class HotkeyRedo extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.REDO);
		} catch (error) {
			streamDeck.logger.error("HotkeyRedo failed:", error);
			await ev.action.showAlert();
		}
	}
}

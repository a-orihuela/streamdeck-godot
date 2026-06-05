import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Undo hotkey (Ctrl+Z) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-undo" })
export class HotkeyUndo extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.UNDO);
		} catch (error) {
			streamDeck.logger.error("HotkeyUndo failed:", error);
			await ev.action.showAlert();
		}
	}
}

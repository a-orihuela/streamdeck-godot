import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Command Palette hotkey (Ctrl+Shift+P) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-command-palette" })
export class HotkeyCommandPalette extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.COMMAND_PALETTE);
		} catch (error) {
			streamDeck.logger.error("HotkeyCommandPalette failed:", error);
			await ev.action.showAlert();
		}
	}
}

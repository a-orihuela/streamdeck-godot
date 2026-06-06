import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { Icons } from "../../utils/icons";

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

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setImage(Icons.CMD_PALETTE);
	}
}

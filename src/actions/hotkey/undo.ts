import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { Icons } from "../../utils/icons";

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

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setImage(Icons.UNDO);
	}
}

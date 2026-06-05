import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Toggle Comment hotkey (Ctrl+K) to the Godot script editor. */
@action({ UUID: "com.aom.godotengine.hotkey-toggle-comment" })
export class HotkeyToggleComment extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.TOGGLE_COMMENT);
		} catch (error) {
			streamDeck.logger.error("HotkeyToggleComment failed:", error);
			await ev.action.showAlert();
		}
	}
}

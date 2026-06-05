import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Toggle Last Panel hotkey (Ctrl+J) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-toggle-last-panel" })
export class HotkeyToggleLastPanel extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.TOGGLE_LAST_PANEL);
		} catch (error) {
			streamDeck.logger.error("HotkeyToggleLastPanel failed:", error);
			await ev.action.showAlert();
		}
	}
}

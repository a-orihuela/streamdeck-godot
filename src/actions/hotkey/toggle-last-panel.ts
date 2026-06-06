import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { parseKeyCombo, type HotkeySettings } from "../../utils/parse-key-combo";
import { Icons } from "../../utils/icons";

/** Sends the Toggle Last Panel hotkey (Ctrl+J) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-toggle-last-panel" })
export class HotkeyToggleLastPanel extends SingletonAction<HotkeySettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<HotkeySettings>): Promise<void> {
		const keys = ev.payload.settings.keyCombo
			? parseKeyCombo(ev.payload.settings.keyCombo)
			: GodotKeys.TOGGLE_LAST_PANEL;
		try {
			await sendKeys(keys);
		} catch (error) {
			streamDeck.logger.error("HotkeyToggleLastPanel failed:", error);
			await ev.action.showAlert();
		}
	}

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent<HotkeySettings>): Promise<void> {
		await ev.action.setImage(Icons.PANEL);
	}
}

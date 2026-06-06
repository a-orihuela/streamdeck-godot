import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { parseKeyCombo, type HotkeySettings } from "../../utils/parse-key-combo";
import { Icons } from "../../utils/icons";

/** Sends the Toggle Breakpoint hotkey (F9) to the Godot script editor. */
@action({ UUID: "com.aom.godotengine.hotkey-toggle-breakpoint" })
export class HotkeyToggleBreakpoint extends SingletonAction<HotkeySettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<HotkeySettings>): Promise<void> {
		const keys = ev.payload.settings.keyCombo
			? parseKeyCombo(ev.payload.settings.keyCombo)
			: GodotKeys.TOGGLE_BREAKPOINT;
		try {
			await sendKeys(keys);
		} catch (error) {
			streamDeck.logger.error("HotkeyToggleBreakpoint failed:", error);
			await ev.action.showAlert();
		}
	}

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent<HotkeySettings>): Promise<void> {
		await ev.action.setImage(Icons.BREAKPOINT);
	}
}

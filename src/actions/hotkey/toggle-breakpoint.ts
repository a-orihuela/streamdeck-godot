import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Toggle Breakpoint hotkey (F9) to the Godot script editor. */
@action({ UUID: "com.aom.godotengine.hotkey-toggle-breakpoint" })
export class HotkeyToggleBreakpoint extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.TOGGLE_BREAKPOINT);
		} catch (error) {
			streamDeck.logger.error("HotkeyToggleBreakpoint failed:", error);
			await ev.action.showAlert();
		}
	}
}

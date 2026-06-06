import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { Icons } from "../../utils/icons";

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

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setImage(Icons.BREAKPOINT);
	}
}

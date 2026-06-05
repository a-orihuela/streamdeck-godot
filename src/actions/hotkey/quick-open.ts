import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Quick Open resource hotkey (Shift+Alt+O) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-quick-open" })
export class HotkeyQuickOpen extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.QUICK_OPEN);
		} catch (error) {
			streamDeck.logger.error("HotkeyQuickOpen failed:", error);
			await ev.action.showAlert();
		}
	}
}

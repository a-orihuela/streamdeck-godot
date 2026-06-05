import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Quick Open Scene hotkey (Ctrl+Shift+O) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-quick-open-scene" })
export class HotkeyQuickOpenScene extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.QUICK_OPEN_SCENE);
		} catch (error) {
			streamDeck.logger.error("HotkeyQuickOpenScene failed:", error);
			await ev.action.showAlert();
		}
	}
}

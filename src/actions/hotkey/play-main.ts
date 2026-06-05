import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Play Main Scene hotkey (F5) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-play-main" })
export class HotkeyPlayMain extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.PLAY_MAIN_SCENE);
		} catch (error) {
			streamDeck.logger.error("HotkeyPlayMain failed:", error);
			await ev.action.showAlert();
		}
	}
}

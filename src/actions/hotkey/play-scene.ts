import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Play Current Scene hotkey (F6) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-play-scene" })
export class HotkeyPlayScene extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.PLAY_CURRENT_SCENE);
		} catch (error) {
			streamDeck.logger.error("HotkeyPlayScene failed:", error);
			await ev.action.showAlert();
		}
	}
}

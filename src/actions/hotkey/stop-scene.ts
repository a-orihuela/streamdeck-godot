import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Stop hotkey (F8) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-stop-scene" })
export class HotkeyStopScene extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.STOP_SCENE);
		} catch (error) {
			streamDeck.logger.error("HotkeyStopScene failed:", error);
			await ev.action.showAlert();
		}
	}
}

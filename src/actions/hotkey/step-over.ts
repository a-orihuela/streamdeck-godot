import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Step Over hotkey (F10) to the Godot debugger. */
@action({ UUID: "com.aom.godotengine.hotkey-step-over" })
export class HotkeyStepOver extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.STEP_OVER);
		} catch (error) {
			streamDeck.logger.error("HotkeyStepOver failed:", error);
			await ev.action.showAlert();
		}
	}
}

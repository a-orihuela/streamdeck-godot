import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Step Into hotkey (F11) to the Godot debugger. */
@action({ UUID: "com.aom.godotengine.hotkey-step-into" })
export class HotkeyStepInto extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.STEP_INTO);
		} catch (error) {
			streamDeck.logger.error("HotkeyStepInto failed:", error);
			await ev.action.showAlert();
		}
	}
}

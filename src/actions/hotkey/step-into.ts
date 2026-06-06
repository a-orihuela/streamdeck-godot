import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { Icons } from "../../utils/icons";

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

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setImage(Icons.STEP_INTO);
	}
}

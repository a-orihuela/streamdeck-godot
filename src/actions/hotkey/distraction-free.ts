import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { Icons } from "../../utils/icons";

/** Sends the Distraction Free Mode hotkey (Ctrl+Shift+F11) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-distraction-free" })
export class HotkeyDistractionFree extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.DISTRACTION_FREE);
		} catch (error) {
			streamDeck.logger.error("HotkeyDistractionFree failed:", error);
			await ev.action.showAlert();
		}
	}

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setImage(Icons.DISTRACTION_FREE);
	}
}

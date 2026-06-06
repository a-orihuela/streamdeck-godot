import streamDeck, { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";
import { Icons } from "../../utils/icons";

/** Sends the Pause hotkey (F7) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-pause-scene" })
export class HotkeyPauseScene extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.PAUSE_SCENE);
		} catch (error) {
			streamDeck.logger.error("HotkeyPauseScene failed:", error);
			await ev.action.showAlert();
		}
	}

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		await ev.action.setImage(Icons.PAUSE);
	}
}

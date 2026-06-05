import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Duplicate Node hotkey (Ctrl+D) to the Godot editor. */
@action({ UUID: "com.aom.godotengine.hotkey-duplicate-node" })
export class HotkeyDuplicateNode extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.DUPLICATE_NODE);
		} catch (error) {
			streamDeck.logger.error("HotkeyDuplicateNode failed:", error);
			await ev.action.showAlert();
		}
	}
}

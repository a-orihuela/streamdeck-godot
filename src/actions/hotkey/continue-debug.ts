import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys } from "../../utils/send-keys";

/** Sends the Continue hotkey (F12) to resume execution after a breakpoint. */
@action({ UUID: "com.aom.godotengine.hotkey-continue-debug" })
export class HotkeyContinueDebug extends SingletonAction {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			await sendKeys(GodotKeys.CONTINUE_DEBUG);
		} catch (error) {
			streamDeck.logger.error("HotkeyContinueDebug failed:", error);
			await ev.action.showAlert();
		}
	}
}

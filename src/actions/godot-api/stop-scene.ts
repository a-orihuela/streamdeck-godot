import { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";

/** Stops scene playback via the Godot bridge HTTP API. */
@action({ UUID: "com.aom.godotengine.api-stop" })
export class ApiStop extends SingletonAction<ApiSettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<ApiSettings>): Promise<void> {
		try {
			await callGodotApi("/stop", ev.payload.settings);
			await ev.action.showOk();
		} catch {
			await ev.action.showAlert();
		}
	}
}

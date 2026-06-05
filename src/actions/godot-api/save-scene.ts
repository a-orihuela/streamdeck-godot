import { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";

/** Saves the current scene via the Godot bridge HTTP API. */
@action({ UUID: "com.aom.godotengine.api-save-scene" })
export class ApiSaveScene extends SingletonAction<ApiSettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<ApiSettings>): Promise<void> {
		try {
			await callGodotApi("/save", ev.payload.settings);
			await ev.action.showOk();
		} catch {
			await ev.action.showAlert();
		}
	}
}

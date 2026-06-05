import { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";

/** Reloads the current scene from disk via the Godot bridge HTTP API. */
@action({ UUID: "com.aom.godotengine.api-reload-scene" })
export class ApiReloadScene extends SingletonAction<ApiSettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<ApiSettings>): Promise<void> {
		try {
			await callGodotApi("/reload-scene", ev.payload.settings);
			await ev.action.showOk();
		} catch {
			await ev.action.showAlert();
		}
	}
}

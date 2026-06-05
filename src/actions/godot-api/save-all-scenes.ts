import { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";

/** Saves all open scenes via the Godot bridge HTTP API. */
@action({ UUID: "com.aom.godotengine.api-save-all" })
export class ApiSaveAll extends SingletonAction<ApiSettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<ApiSettings>): Promise<void> {
		try {
			await callGodotApi("/save-all", ev.payload.settings);
			await ev.action.showOk();
		} catch {
			await ev.action.showAlert();
		}
	}
}

import { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";
import { Icons } from "../../utils/icons";

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

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent<ApiSettings>): Promise<void> {
		await ev.action.setImage(Icons.SAVE_ALL);
	}
}

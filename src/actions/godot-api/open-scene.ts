import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";

/** Settings for the Open Scene action. */
type OpenSceneSettings = ApiSettings & {
	/** Godot resource path of the scene to open, e.g. res://scenes/main.tscn. */
	scenePath?: string;
};

/** Opens a configured scene in the Godot editor via the HTTP bridge API. */
@action({ UUID: "com.aom.godotengine.api-open-scene" })
export class ApiOpenScene extends SingletonAction<OpenSceneSettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<OpenSceneSettings>): Promise<void> {
		const { scenePath, ...apiSettings } = ev.payload.settings;
		if (!scenePath) {
			streamDeck.logger.warn("ApiOpenScene: no scenePath configured");
			await ev.action.showAlert();
			return;
		}
		try {
			await callGodotApi("/open-scene", apiSettings, { path: scenePath });
			await ev.action.showOk();
		} catch {
			await ev.action.showAlert();
		}
	}
}

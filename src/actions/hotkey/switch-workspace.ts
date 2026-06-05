import streamDeck, { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { sendKeys, GodotKeys, type KeysDescriptor } from "../../utils/send-keys";

/** Settings for the Switch Workspace action. */
type WorkspaceSettings = {
	/** Target Godot editor workspace. */
	workspace?: "2D" | "3D" | "AssetLib" | "Script";
};

const WORKSPACE_KEYS: Record<string, KeysDescriptor> = {
	"2D":       GodotKeys.SWITCH_2D,
	"3D":       GodotKeys.SWITCH_3D,
	"Script":   GodotKeys.SWITCH_SCRIPT,
	"AssetLib": GodotKeys.SWITCH_ASSETLIB,
};

/** Sends the workspace switch hotkey (Ctrl+F1–F4) for the configured workspace. */
@action({ UUID: "com.aom.godotengine.hotkey-switch-workspace" })
export class HotkeySwitchWorkspace extends SingletonAction<WorkspaceSettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<WorkspaceSettings>): Promise<void> {
		const workspace = ev.payload.settings.workspace ?? "2D";
		const keys = WORKSPACE_KEYS[workspace];
		if (!keys) {
			await ev.action.showAlert();
			return;
		}
		try {
			await sendKeys(keys);
		} catch (error) {
			streamDeck.logger.error("HotkeySwitchWorkspace failed:", error);
			await ev.action.showAlert();
		}
	}
}

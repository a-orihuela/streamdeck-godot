import { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";
import { Icons } from "../../utils/icons";

/** Workspace options available in the Godot editor. */
type Workspace = "2D" | "3D" | "AssetLib" | "Script";

/** Settings for the API Switch Workspace action. */
type SwitchWorkspaceSettings = ApiSettings & {
	/** Target workspace to switch to. */
	workspace?: Workspace;
};

const WORKSPACE_ICONS: Record<Workspace, string> = {
	"2D":       Icons.WORKSPACE_2D,
	"3D":       Icons.WORKSPACE_3D,
	"Script":   Icons.WORKSPACE_SCRIPT,
	"AssetLib": Icons.WORKSPACE_ASSETLIB,
};

/** Switches the Godot editor workspace via the HTTP bridge API. */
@action({ UUID: "com.aom.godotengine.api-switch-workspace" })
export class ApiSwitchWorkspace extends SingletonAction<SwitchWorkspaceSettings> {
	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<SwitchWorkspaceSettings>): Promise<void> {
		const { workspace, ...apiSettings } = ev.payload.settings;
		const target = workspace ?? "2D";
		try {
			await callGodotApi("/switch-workspace", apiSettings, { workspace: target });
			await ev.action.showOk();
		} catch {
			await ev.action.showAlert();
		}
	}

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent<SwitchWorkspaceSettings>): Promise<void> {
		const ws = ev.payload.settings.workspace ?? "2D";
		await ev.action.setImage(WORKSPACE_ICONS[ws]);
	}
}

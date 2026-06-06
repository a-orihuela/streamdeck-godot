import { action, type KeyDownEvent, type WillAppearEvent, SingletonAction } from "@elgato/streamdeck";
import { callGodotApi, type ApiSettings } from "./api-client";
import { Icons } from "../../utils/icons";

/** Response shape from the Godot HTTP bridge /status endpoint. */
type StatusResponse = {
	/** Whether the Godot editor is currently playing a scene. */
	playing: boolean;
};

/** Plays the current scene via the Godot bridge HTTP API, with live play/idle indicator. */
@action({ UUID: "com.aom.godotengine.api-play-scene" })
export class ApiPlayScene extends SingletonAction<ApiSettings> {
	/** Polling interval handle; defined while at least one instance is visible. */
	private _interval: ReturnType<typeof setInterval> | undefined;

	/** Number of currently visible instances of this action. */
	private _visibleCount = 0;

	/** @inheritdoc */
	public override async onKeyDown(ev: KeyDownEvent<ApiSettings>): Promise<void> {
		try {
			await callGodotApi("/play-current", ev.payload.settings);
		} catch {
			await ev.action.showAlert();
		}
	}

	/** @inheritdoc */
	public override async onWillAppear(ev: WillAppearEvent<ApiSettings>): Promise<void> {
		await ev.action.setImage(Icons.PLAY_IDLE);
		this._visibleCount++;
		if (this._visibleCount === 1) {
			this._interval = setInterval(this._poll.bind(this), 2000);
		}
	}

	/** @inheritdoc */
	public override onWillDisappear(): void {
		this._visibleCount--;
		if (this._visibleCount === 0) {
			clearInterval(this._interval);
			this._interval = undefined;
		}
	}

	/** Calls _tick and discards the returned Promise; used as a synchronous interval callback. */
	private _poll(): void {
		void this._tick();
	}

	/** Polls /status and updates all visible instances with the current play state. */
	private async _tick(): Promise<void> {
		for (const act of this.actions) {
			if (!act.isKey()) continue;
			const settings = await act.getSettings<ApiSettings>();
			try {
				const host = settings.host?.trim() || "127.0.0.1";
				const port = settings.port ?? 9876;
				const ctrl = new AbortController();
				setTimeout(ctrl.abort.bind(ctrl), 1500);
				const res = await fetch(`http://${host}:${port}/status`, { signal: ctrl.signal });
				const data = (await res.json()) as StatusResponse;
				await act.setImage(data.playing ? Icons.PLAY_ACTIVE : Icons.PLAY_IDLE);
			} catch {
				// Godot not running — keep current icon
			}
		}
	}
}

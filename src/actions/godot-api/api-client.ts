import streamDeck from "@elgato/streamdeck";

const DEFAULT_PORT = 9876;

/** Settings shared by all Godot API actions. */
export type ApiSettings = {
	/** HTTP port of the Godot bridge plugin (default: 9876). */
	port?: number;
};

/** Thrown when an HTTP request to the Godot bridge plugin fails. */
export class GodotApiError extends Error {
	/** Whether the error was caused by the Godot editor not being reachable. */
	public readonly isConnectionRefused: boolean;

	/**
	 * @param message - Human-readable description of the failure.
	 * @param isConnectionRefused - True when the Godot editor is not reachable.
	 */
	constructor(message: string, isConnectionRefused: boolean) {
		super(message);
		this.name = "GodotApiError";
		this.isConnectionRefused = isConnectionRefused;
	}
}

/**
 * Makes an HTTP request to the Godot bridge plugin running on localhost.
 * @param path - API endpoint path, e.g. "/play-current".
 * @param settings - Action settings containing the optional port override.
 * @param body - Optional JSON body for POST requests.
 */
export async function callGodotApi(
	path: string,
	settings: ApiSettings,
	body?: Record<string, string>
): Promise<void> {
	const port = settings.port ?? DEFAULT_PORT;
	const url = `http://127.0.0.1:${port}${path}`;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 2000);

	try {
		const response = await fetch(url, {
			method: body ? "POST" : "GET",
			headers: body ? { "Content-Type": "application/json" } : {},
			body: body ? JSON.stringify(body) : undefined,
			signal: controller.signal,
		});

		if (!response.ok) {
			throw new GodotApiError(`HTTP ${response.status} from Godot API`, false);
		}
	} catch (error) {
		if (error instanceof GodotApiError) throw error;

		const isConnectionRefused =
			error instanceof Error &&
			(error.message.includes("ECONNREFUSED") ||
				error.message.includes("ECONNRESET") ||
				error.name === "AbortError");

		const message = isConnectionRefused
			? "Godot editor is not running or the StreamDeck bridge plugin is not enabled"
			: `Godot API call failed: ${error}`;

		streamDeck.logger.error(message);
		throw new GodotApiError(message, isConnectionRefused);
	} finally {
		clearTimeout(timeoutId);
	}
}

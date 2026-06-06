import { type KeysDescriptor } from "./send-keys";

/** Settings shared by all configurable hotkey actions. */
export type HotkeySettings = {
	/** Custom key combination (e.g. "Ctrl+Z", "F10"); undefined uses the Godot default. */
	keyCombo?: string;
};

const F_KEY_CODES: Record<number, number> = {
	1: 122, 2: 120, 3: 99, 4: 118, 5: 96,
	6: 97, 7: 98, 8: 100, 9: 101, 10: 109, 11: 103, 12: 111,
};

/**
 * Converts a human-readable key combo string into platform-specific descriptors.
 * Supports modifiers "Ctrl", "Shift", "Alt" and keys A–Z, F1–F12.
 * Example inputs: "Ctrl+Z", "F10", "Ctrl+Shift+F".
 * @param combo - Key combo string, e.g. "Ctrl+Z" or "F10".
 * @returns Platform-specific descriptor for Windows SendKeys and macOS osascript.
 */
export function parseKeyCombo(combo: string): KeysDescriptor {
	const parts = combo.split("+");
	const key = parts[parts.length - 1];
	const mods = parts.slice(0, -1).map((m) => m.toLowerCase());

	let win = "";
	if (mods.includes("ctrl")) win += "^";
	if (mods.includes("shift")) win += "+";
	if (mods.includes("alt")) win += "%";

	const fMatch = key.match(/^F(\d{1,2})$/i);
	if (fMatch) {
		win += `{F${fMatch[1]}}`;
	} else if (key.length === 1) {
		win += key.toLowerCase();
	} else {
		win += `{${key}}`;
	}

	const macMods: string[] = [];
	if (mods.includes("ctrl")) macMods.push("command down");
	if (mods.includes("shift")) macMods.push("shift down");
	if (mods.includes("alt")) macMods.push("option down");
	const using = macMods.length > 0 ? ` using {${macMods.join(", ")}}` : "";

	let mac: string;
	if (fMatch) {
		const code = F_KEY_CODES[parseInt(fMatch[1])] ?? 0;
		mac = `key code ${code}${using}`;
	} else {
		mac = `keystroke "${key.toLowerCase()}"${using}`;
	}

	return { windows: win, mac };
}

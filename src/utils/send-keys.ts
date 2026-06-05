import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

/** Platform-agnostic hotkey descriptor for sending shortcuts to the Godot editor. */
export type KeysDescriptor = {
	/** [System.Windows.Forms.SendKeys]::SendWait() format string. */
	windows: string;
	/** osascript System Events command fragment, e.g. 'key code 96' or 'keystroke "s" using {command down}'. */
	mac: string;
};

// Godot 4.x default keyboard shortcuts.
// Windows uses Ctrl; macOS uses Cmd (command) for most editor shortcuts.
// macOS F-key codes: F1=122 F2=120 F3=99 F4=118 F5=96 F6=97 F7=98 F8=100 F9=101 F10=109 F11=103 F12=111
export const GodotKeys = {
	// Playback
	PLAY_MAIN_SCENE:    { windows: "{F5}",    mac: "key code 96" },
	PLAY_CURRENT_SCENE: { windows: "{F6}",    mac: "key code 97" },
	PAUSE_SCENE:        { windows: "{F7}",    mac: "key code 98" },
	STOP_SCENE:         { windows: "{F8}",    mac: "key code 100" },
	// Debug
	TOGGLE_BREAKPOINT:  { windows: "{F9}",    mac: "key code 101" },
	STEP_OVER:          { windows: "{F10}",   mac: "key code 109" },
	STEP_INTO:          { windows: "{F11}",   mac: "key code 103" },
	CONTINUE_DEBUG:     { windows: "{F12}",   mac: "key code 111" },
	// Scene & project
	SAVE_SCENE:         { windows: "^s",      mac: 'keystroke "s" using {command down}' },
	SAVE_ALL_SCENES:    { windows: "^+%s",    mac: 'keystroke "s" using {command down, shift down, option down}' },
	QUICK_OPEN_SCENE:   { windows: "^+o",     mac: 'keystroke "o" using {command down, shift down}' },
	QUICK_OPEN:         { windows: "+%o",     mac: 'keystroke "o" using {shift down, option down}' },
	// Workspace navigation
	SWITCH_2D:          { windows: "^{F1}",   mac: "key code 122 using {command down}" },
	SWITCH_3D:          { windows: "^{F2}",   mac: "key code 120 using {command down}" },
	SWITCH_SCRIPT:      { windows: "^{F3}",   mac: "key code 99 using {command down}" },
	SWITCH_ASSETLIB:    { windows: "^{F4}",   mac: "key code 118 using {command down}" },
	COMMAND_PALETTE:    { windows: "^+p",     mac: 'keystroke "p" using {command down, shift down}' },
	DISTRACTION_FREE:   { windows: "^+{F11}", mac: "key code 103 using {command down, shift down}" },
	TOGGLE_LAST_PANEL:  { windows: "^j",      mac: 'keystroke "j" using {command down}' },
	// Node & editing
	UNDO:               { windows: "^z",      mac: 'keystroke "z" using {command down}' },
	REDO:               { windows: "^y",      mac: 'keystroke "z" using {command down, shift down}' },
	DUPLICATE_NODE:     { windows: "^d",      mac: 'keystroke "d" using {command down}' },
	// Script editor
	TOGGLE_COMMENT:     { windows: "^k",      mac: 'keystroke "k" using {command down}' },
	FIND_IN_FILES:      { windows: "^+f",     mac: 'keystroke "f" using {command down, shift down}' },
} as const;

/**
 * Sends keys on Windows via PowerShell SendKeys.
 * @param key - [System.Windows.Forms.SendKeys]::SendWait() format string.
 */
async function sendKeysWindows(key: string): Promise<void> {
	// All key strings are hardcoded constants — no user input reaches here
	const script = [
		"Add-Type -AssemblyName System.Windows.Forms",
		"Add-Type -AssemblyName Microsoft.VisualBasic",
		"try { [void][Microsoft.VisualBasic.Interaction]::AppActivate('Godot'); Start-Sleep -Milliseconds 150 } catch {}",
		`[System.Windows.Forms.SendKeys]::SendWait('${key}')`,
	].join("; ");

	await execFileAsync("powershell", ["-NonInteractive", "-NoProfile", "-Command", script]);
}

/**
 * Sends keys on macOS via osascript System Events.
 * @param command - osascript System Events command fragment.
 */
async function sendKeysMac(command: string): Promise<void> {
	await execFileAsync("osascript", ["-e", `tell application "System Events" to ${command}`]);
}

/**
 * Sends a hotkey to the Godot editor on the current platform.
 * @param descriptor - Platform-specific key descriptor.
 */
export async function sendKeys(descriptor: KeysDescriptor): Promise<void> {
	if (process.platform === "darwin") {
		await sendKeysMac(descriptor.mac);
	} else {
		await sendKeysWindows(descriptor.windows);
	}
}

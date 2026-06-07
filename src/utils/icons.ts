import playIdle from "../../com.aom.godotengine.sdPlugin/imgs/actions/play/icon.svg";
import playActive from "../../com.aom.godotengine.sdPlugin/imgs/actions/play/key-active.svg";
import stop from "../../com.aom.godotengine.sdPlugin/imgs/actions/stop/icon.svg";
import pause from "../../com.aom.godotengine.sdPlugin/imgs/actions/pause/icon.svg";
import save from "../../com.aom.godotengine.sdPlugin/imgs/actions/save/icon.svg";
import saveAll from "../../com.aom.godotengine.sdPlugin/imgs/actions/save-all/icon.svg";
import reload from "../../com.aom.godotengine.sdPlugin/imgs/actions/reload/icon.svg";
import openScene from "../../com.aom.godotengine.sdPlugin/imgs/actions/open-scene/icon.svg";
import workspace2d from "../../com.aom.godotengine.sdPlugin/imgs/actions/workspace/2d.svg";
import workspace3d from "../../com.aom.godotengine.sdPlugin/imgs/actions/workspace/3d.svg";
import workspaceScript from "../../com.aom.godotengine.sdPlugin/imgs/actions/workspace/script.svg";
import workspaceAssetLib from "../../com.aom.godotengine.sdPlugin/imgs/actions/workspace/assetlib.svg";
import breakpoint from "../../com.aom.godotengine.sdPlugin/imgs/actions/breakpoint/icon.svg";
import stepOver from "../../com.aom.godotengine.sdPlugin/imgs/actions/step-over/icon.svg";
import stepInto from "../../com.aom.godotengine.sdPlugin/imgs/actions/step-into/icon.svg";
import continueDebug from "../../com.aom.godotengine.sdPlugin/imgs/actions/continue/icon.svg";
import undo from "../../com.aom.godotengine.sdPlugin/imgs/actions/undo/icon.svg";
import redo from "../../com.aom.godotengine.sdPlugin/imgs/actions/redo/icon.svg";
import duplicate from "../../com.aom.godotengine.sdPlugin/imgs/actions/duplicate/icon.svg";
import comment from "../../com.aom.godotengine.sdPlugin/imgs/actions/comment/icon.svg";
import find from "../../com.aom.godotengine.sdPlugin/imgs/actions/find/icon.svg";
import quickOpenScene from "../../com.aom.godotengine.sdPlugin/imgs/actions/quick-open-scene/icon.svg";
import quickOpen from "../../com.aom.godotengine.sdPlugin/imgs/actions/quick-open/icon.svg";
import cmdPalette from "../../com.aom.godotengine.sdPlugin/imgs/actions/cmd-palette/icon.svg";
import panel from "../../com.aom.godotengine.sdPlugin/imgs/actions/panel/icon.svg";
import distractionFree from "../../com.aom.godotengine.sdPlugin/imgs/actions/distraction-free/icon.svg";

/** SVG icon strings for Stream Deck key display, inlined at build time from imgs/actions/. */
export const Icons = {
	// ── Playback ─────────────────────────────────────────────────────────────
	/** White play triangle (game idle). */
	PLAY_IDLE: playIdle,
	/** Green play triangle with indicator dot (game running). */
	PLAY_ACTIVE: playActive,
	/** White filled square (stop). */
	STOP: stop,
	/** Two white vertical bars (pause). */
	PAUSE: pause,

	// ── Scene management ──────────────────────────────────────────────────────
	/** Floppy disk outline (save). */
	SAVE: save,
	/** Two overlapping floppy disks (save all). */
	SAVE_ALL: saveAll,
	/** Circular arrow (reload/refresh). */
	RELOAD: reload,
	/** Folder with arrow (open scene). */
	OPEN_SCENE: openScene,

	// ── Workspace ────────────────────────────────────────────────────────────
	/** "2D" text label. */
	WORKSPACE_2D: workspace2d,
	/** "3D" text label. */
	WORKSPACE_3D: workspace3d,
	/** Code angle brackets (script editor). */
	WORKSPACE_SCRIPT: workspaceScript,
	/** Four squares grid (asset library). */
	WORKSPACE_ASSETLIB: workspaceAssetLib,

	// ── Debug ────────────────────────────────────────────────────────────────
	/** Red filled circle (breakpoint). */
	BREAKPOINT: breakpoint,
	/** Arrow jumping over a dot (step over). */
	STEP_OVER: stepOver,
	/** Arrow pointing straight down (step into). */
	STEP_INTO: stepInto,
	/** Play with a vertical bar (continue/resume). */
	CONTINUE: continueDebug,

	// ── Editing ──────────────────────────────────────────────────────────────
	/** Curved arrow left (undo). */
	UNDO: undo,
	/** Curved arrow right (redo). */
	REDO: redo,
	/** Two overlapping rectangles (duplicate). */
	DUPLICATE: duplicate,
	/** Hash symbol (toggle comment). */
	COMMENT: comment,

	// ── Search & navigation ──────────────────────────────────────────────────
	/** Magnifying glass (find in files). */
	FIND: find,
	/** File with magnifying glass (quick open scene). */
	QUICK_OPEN_SCENE: quickOpenScene,
	/** File with arrow (quick open resource). */
	QUICK_OPEN: quickOpen,
	/** Terminal prompt (command palette). */
	CMD_PALETTE: cmdPalette,

	// ── UI panels ────────────────────────────────────────────────────────────
	/** Window with highlighted bottom panel (toggle panel). */
	PANEL: panel,
	/** Expand corners (distraction free). */
	DISTRACTION_FREE: distractionFree,
} as const;

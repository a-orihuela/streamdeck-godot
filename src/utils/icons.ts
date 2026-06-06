import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const actionsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'imgs', 'actions');

/**
 * Reads an SVG file from the bundled imgs/actions directory.
 * @param folder - Subfolder name under imgs/actions (e.g. "play", "stop").
 * @param name - File name without .svg extension; defaults to "icon".
 * @returns Complete SVG string suitable for use with action.setImage().
 */
function svg(folder: string, name = 'icon'): string {
	return readFileSync(join(actionsDir, folder, `${name}.svg`), 'utf8');
}

/** SVG icon strings for Stream Deck key display, loaded from imgs/actions/. */
export const Icons = {
	// ── Playback ─────────────────────────────────────────────────────────────
	/** White play triangle (game idle). */
	PLAY_IDLE: svg('play'),
	/** Green play triangle with indicator dot (game running). */
	PLAY_ACTIVE: svg('play', 'key-active'),
	/** White filled square (stop). */
	STOP: svg('stop'),
	/** Two white vertical bars (pause). */
	PAUSE: svg('pause'),

	// ── Scene management ──────────────────────────────────────────────────────
	/** Floppy disk outline (save). */
	SAVE: svg('save'),
	/** Two overlapping floppy disks (save all). */
	SAVE_ALL: svg('save-all'),
	/** Circular arrow (reload/refresh). */
	RELOAD: svg('reload'),
	/** Folder with arrow (open scene). */
	OPEN_SCENE: svg('open-scene'),

	// ── Workspace ────────────────────────────────────────────────────────────
	/** "2D" text label. */
	WORKSPACE_2D: svg('workspace', '2d'),
	/** "3D" text label. */
	WORKSPACE_3D: svg('workspace', '3d'),
	/** Code angle brackets (script editor). */
	WORKSPACE_SCRIPT: svg('workspace', 'script'),
	/** Four squares grid (asset library). */
	WORKSPACE_ASSETLIB: svg('workspace', 'assetlib'),

	// ── Debug ────────────────────────────────────────────────────────────────
	/** Red filled circle (breakpoint). */
	BREAKPOINT: svg('breakpoint'),
	/** Arrow jumping over a dot (step over). */
	STEP_OVER: svg('step-over'),
	/** Arrow pointing straight down (step into). */
	STEP_INTO: svg('step-into'),
	/** Play with a vertical bar (continue/resume). */
	CONTINUE: svg('continue'),

	// ── Editing ──────────────────────────────────────────────────────────────
	/** Curved arrow left (undo). */
	UNDO: svg('undo'),
	/** Curved arrow right (redo). */
	REDO: svg('redo'),
	/** Two overlapping rectangles (duplicate). */
	DUPLICATE: svg('duplicate'),
	/** Hash symbol (toggle comment). */
	COMMENT: svg('comment'),

	// ── Search & navigation ──────────────────────────────────────────────────
	/** Magnifying glass (find in files). */
	FIND: svg('find'),
	/** File with magnifying glass (quick open scene). */
	QUICK_OPEN_SCENE: svg('quick-open-scene'),
	/** File with arrow (quick open resource). */
	QUICK_OPEN: svg('quick-open'),
	/** Terminal prompt (command palette). */
	CMD_PALETTE: svg('cmd-palette'),

	// ── UI panels ────────────────────────────────────────────────────────────
	/** Window with highlighted bottom panel (toggle panel). */
	PANEL: svg('panel'),
	/** Expand corners (distraction free). */
	DISTRACTION_FREE: svg('distraction-free'),
} as const;

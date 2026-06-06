const W = "#FFFFFF";
const G = "#22c55e";
const R = "#ef4444";
const S = `stroke-linecap="round" stroke-linejoin="round"`;

/**
 * Wraps SVG body content in a 72×72 SVG element.
 * @param body - Inner SVG elements as a string.
 * @returns Complete SVG string suitable for use with action.setImage().
 */
function icon(body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">${body}</svg>`;
}

/** SVG icon strings for Stream Deck key display (72×72, transparent background). */
export const Icons = {
	// ── Playback ─────────────────────────────────────────────────────────────
	/** White play triangle (game idle). */
	PLAY_IDLE: icon(
		`<polygon points="16,12 16,60 58,36" fill="${W}"/>`
	),
	/** Green play triangle (game running). */
	PLAY_ACTIVE: icon(
		`<polygon points="16,12 16,60 58,36" fill="${G}"/>`
		+ `<circle cx="58" cy="14" r="8" fill="${G}" stroke="${W}" stroke-width="2"/>`
	),
	/** White filled square (stop). */
	STOP: icon(
		`<rect x="18" y="18" width="36" height="36" rx="3" fill="${W}"/>`
	),
	/** Two white vertical bars (pause). */
	PAUSE: icon(
		`<rect x="14" y="14" width="14" height="44" rx="3" fill="${W}"/>`
		+ `<rect x="44" y="14" width="14" height="44" rx="3" fill="${W}"/>`
	),

	// ── Scene management ──────────────────────────────────────────────────────
	/** Floppy disk outline (save). */
	SAVE: icon(
		`<rect x="10" y="10" width="52" height="52" rx="5" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<rect x="18" y="10" width="24" height="22" fill="${W}"/>`
		+ `<rect x="22" y="12" width="10" height="14" fill="none" stroke="#222" stroke-width="2"/>`
		+ `<rect x="18" y="42" width="36" height="16" rx="2" fill="none" stroke="${W}" stroke-width="3"/>`
	),
	/** Two overlapping floppy disks (save all). */
	SAVE_ALL: icon(
		`<rect x="6" y="18" width="42" height="42" rx="5" fill="none" stroke="${W}" stroke-width="3.5" ${S}/>`
		+ `<rect x="24" y="8" width="42" height="42" rx="5" fill="none" stroke="${W}" stroke-width="3.5" ${S}/>`
		+ `<rect x="30" y="8" width="20" height="18" fill="${W}"/>`
	),
	/** Circular arrow (reload/refresh). */
	RELOAD: icon(
		`<path d="M57,36 a21,21 0 1,1-4.5,-13" fill="none" stroke="${W}" stroke-width="5" ${S}/>`
		+ `<polygon points="48,10 62,22 62,10" fill="${W}"/>`
	),
	/** Folder with arrow (open scene). */
	OPEN_SCENE: icon(
		`<path d="M12,28 h48 v28 a4,4 0 0 1-4,4 h-40 a4,4 0 0 1-4,-4 z" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<path d="M12,28 l6,-12 h16 l4,12" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<polygon points="26,40 26,56 46,48" fill="${W}"/>`
	),

	// ── Workspace ────────────────────────────────────────────────────────────
	/** "2D" text label. */
	WORKSPACE_2D: icon(
		`<text x="36" y="52" text-anchor="middle" font-family="monospace" font-size="30" font-weight="bold" fill="${W}">2D</text>`
	),
	/** "3D" text label. */
	WORKSPACE_3D: icon(
		`<text x="36" y="52" text-anchor="middle" font-family="monospace" font-size="30" font-weight="bold" fill="${W}">3D</text>`
	),
	/** Code angle brackets (script editor). */
	WORKSPACE_SCRIPT: icon(
		`<text x="36" y="50" text-anchor="middle" font-family="monospace" font-size="26" font-weight="bold" fill="${W}">&lt;/&gt;</text>`
	),
	/** Four squares grid (asset library). */
	WORKSPACE_ASSETLIB: icon(
		`<rect x="10" y="10" width="22" height="22" rx="3" fill="${W}"/>`
		+ `<rect x="40" y="10" width="22" height="22" rx="3" fill="${W}"/>`
		+ `<rect x="10" y="40" width="22" height="22" rx="3" fill="${W}"/>`
		+ `<rect x="40" y="40" width="22" height="22" rx="3" fill="${W}"/>`
	),

	// ── Debug ────────────────────────────────────────────────────────────────
	/** Red filled circle (breakpoint). */
	BREAKPOINT: icon(
		`<circle cx="36" cy="36" r="22" fill="${R}"/>`
	),
	/** Arrow jumping over a dot (step over). */
	STEP_OVER: icon(
		`<path d="M14,36 h44" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<polygon points="46,24 60,36 46,48" fill="${W}"/>`
		+ `<path d="M24,26 a12,12 0 0 1 24,0" fill="none" stroke="${W}" stroke-width="3" stroke-dasharray="4,3" ${S}/>`
	),
	/** Arrow pointing straight down (step into). */
	STEP_INTO: icon(
		`<line x1="36" y1="12" x2="36" y2="52" stroke="${W}" stroke-width="5" ${S}/>`
		+ `<polygon points="24,44 36,60 48,44" fill="${W}"/>`
	),
	/** Play with a vertical bar (continue/resume). */
	CONTINUE: icon(
		`<polygon points="14,14 14,58 48,36" fill="${W}"/>`
		+ `<rect x="52" y="14" width="8" height="44" rx="3" fill="${W}"/>`
	),

	// ── Editing ──────────────────────────────────────────────────────────────
	/** Curved arrow left (undo). */
	UNDO: icon(
		`<path d="M54,52 a22,22 0 1,0-40,-16" fill="none" stroke="${W}" stroke-width="5" ${S}/>`
		+ `<polygon points="4,22 18,32 20,16" fill="${W}"/>`
	),
	/** Curved arrow right (redo). */
	REDO: icon(
		`<path d="M18,52 a22,22 0 1,1 40,-16" fill="none" stroke="${W}" stroke-width="5" ${S}/>`
		+ `<polygon points="68,22 54,32 52,16" fill="${W}"/>`
	),
	/** Two overlapping rectangles (duplicate). */
	DUPLICATE: icon(
		`<rect x="8" y="20" width="36" height="44" rx="4" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<rect x="28" y="8" width="36" height="44" rx="4" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
	),
	/** Hash symbol (toggle comment). */
	COMMENT: icon(
		`<text x="36" y="54" text-anchor="middle" font-family="monospace" font-size="52" font-weight="bold" fill="${W}">#</text>`
	),

	// ── Search & navigation ──────────────────────────────────────────────────
	/** Magnifying glass (find in files). */
	FIND: icon(
		`<circle cx="30" cy="30" r="18" fill="none" stroke="${W}" stroke-width="5"/>`
		+ `<line x1="43" y1="43" x2="60" y2="60" stroke="${W}" stroke-width="6" ${S}/>`
	),
	/** File with magnifying glass (quick open scene). */
	QUICK_OPEN_SCENE: icon(
		`<rect x="12" y="8" width="38" height="50" rx="4" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<line x1="20" y1="20" x2="42" y2="20" stroke="${W}" stroke-width="3" ${S}/>`
		+ `<circle cx="28" cy="36" r="9" fill="none" stroke="${W}" stroke-width="3"/>`
		+ `<line x1="34" y1="42" x2="42" y2="50" stroke="${W}" stroke-width="4" ${S}/>`
	),
	/** File with arrow (quick open resource). */
	QUICK_OPEN: icon(
		`<rect x="14" y="8" width="34" height="44" rx="4" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<path d="M14,38 h20 l8,14" fill="none" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<polygon points="34,46 50,60 50,44" fill="${W}"/>`
	),
	/** Terminal prompt (command palette). */
	CMD_PALETTE: icon(
		`<rect x="8" y="14" width="56" height="44" rx="5" fill="none" stroke="${W}" stroke-width="4"/>`
		+ `<line x1="20" y1="28" x2="28" y2="36" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<line x1="28" y1="36" x2="20" y2="44" stroke="${W}" stroke-width="4" ${S}/>`
		+ `<line x1="34" y1="44" x2="52" y2="44" stroke="${W}" stroke-width="4" ${S}/>`
	),

	// ── UI panels ────────────────────────────────────────────────────────────
	/** Window with highlighted bottom panel (toggle panel). */
	PANEL: icon(
		`<rect x="8" y="8" width="56" height="56" rx="4" fill="none" stroke="${W}" stroke-width="4"/>`
		+ `<line x1="8" y1="46" x2="64" y2="46" stroke="${W}" stroke-width="4"/>`
		+ `<rect x="8" y="47" width="56" height="17" rx="0" fill="${W}" opacity="0.4"/>`
	),
	/** Expand corners (distraction free). */
	DISTRACTION_FREE: icon(
		`<polyline points="8,24 8,8 24,8" fill="none" stroke="${W}" stroke-width="5" ${S}/>`
		+ `<polyline points="48,8 64,8 64,24" fill="none" stroke="${W}" stroke-width="5" ${S}/>`
		+ `<polyline points="64,48 64,64 48,64" fill="none" stroke="${W}" stroke-width="5" ${S}/>`
		+ `<polyline points="24,64 8,64 8,48" fill="none" stroke="${W}" stroke-width="5" ${S}/>`
	),
} as const;

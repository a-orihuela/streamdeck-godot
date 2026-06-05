import streamDeck from "@elgato/streamdeck";

import { IncrementCounter } from "./actions/increment-counter";

// ── Fase 1: Hotkey actions ─────────────────────────────────────────────────
import { HotkeyPlayScene } from "./actions/hotkey/play-scene";
import { HotkeyPlayMain } from "./actions/hotkey/play-main";
import { HotkeyStopScene } from "./actions/hotkey/stop-scene";
import { HotkeyPauseScene } from "./actions/hotkey/pause-scene";
import { HotkeyToggleBreakpoint } from "./actions/hotkey/toggle-breakpoint";
import { HotkeyStepOver } from "./actions/hotkey/step-over";
import { HotkeyStepInto } from "./actions/hotkey/step-into";
import { HotkeyContinueDebug } from "./actions/hotkey/continue-debug";
import { HotkeySaveScene } from "./actions/hotkey/save-scene";
import { HotkeySaveAllScenes } from "./actions/hotkey/save-all-scenes";
import { HotkeyQuickOpenScene } from "./actions/hotkey/quick-open-scene";
import { HotkeyQuickOpen } from "./actions/hotkey/quick-open";
import { HotkeySwitchWorkspace } from "./actions/hotkey/switch-workspace";
import { HotkeyCommandPalette } from "./actions/hotkey/command-palette";
import { HotkeyDistractionFree } from "./actions/hotkey/distraction-free";
import { HotkeyToggleLastPanel } from "./actions/hotkey/toggle-last-panel";
import { HotkeyUndo } from "./actions/hotkey/undo";
import { HotkeyRedo } from "./actions/hotkey/redo";
import { HotkeyDuplicateNode } from "./actions/hotkey/duplicate-node";
import { HotkeyToggleComment } from "./actions/hotkey/toggle-comment";
import { HotkeyFindInFiles } from "./actions/hotkey/find-in-files";

// ── Fase 2: Godot API actions (require companion Godot plugin) ─────────────
import { ApiPlayScene } from "./actions/godot-api/play-scene";
import { ApiPlayMain } from "./actions/godot-api/play-main";
import { ApiStop } from "./actions/godot-api/stop-scene";
import { ApiSaveScene } from "./actions/godot-api/save-scene";
import { ApiSaveAll } from "./actions/godot-api/save-all-scenes";
import { ApiOpenScene } from "./actions/godot-api/open-scene";
import { ApiReloadScene } from "./actions/godot-api/reload-scene";

streamDeck.logger.setLevel("info");

// Legacy example action
streamDeck.actions.registerAction(new IncrementCounter());

// Fase 1 — Playback & debug
streamDeck.actions.registerAction(new HotkeyPlayScene());
streamDeck.actions.registerAction(new HotkeyPlayMain());
streamDeck.actions.registerAction(new HotkeyStopScene());
streamDeck.actions.registerAction(new HotkeyPauseScene());
streamDeck.actions.registerAction(new HotkeyToggleBreakpoint());
streamDeck.actions.registerAction(new HotkeyStepOver());
streamDeck.actions.registerAction(new HotkeyStepInto());
streamDeck.actions.registerAction(new HotkeyContinueDebug());

// Fase 1 — Scene & project
streamDeck.actions.registerAction(new HotkeySaveScene());
streamDeck.actions.registerAction(new HotkeySaveAllScenes());
streamDeck.actions.registerAction(new HotkeyQuickOpenScene());
streamDeck.actions.registerAction(new HotkeyQuickOpen());

// Fase 1 — Navigation & editor
streamDeck.actions.registerAction(new HotkeySwitchWorkspace());
streamDeck.actions.registerAction(new HotkeyCommandPalette());
streamDeck.actions.registerAction(new HotkeyDistractionFree());
streamDeck.actions.registerAction(new HotkeyToggleLastPanel());

// Fase 1 — Node & script editing
streamDeck.actions.registerAction(new HotkeyUndo());
streamDeck.actions.registerAction(new HotkeyRedo());
streamDeck.actions.registerAction(new HotkeyDuplicateNode());
streamDeck.actions.registerAction(new HotkeyToggleComment());
streamDeck.actions.registerAction(new HotkeyFindInFiles());

// Fase 2 — Godot API (requires StreamDeck bridge plugin enabled in Godot)
streamDeck.actions.registerAction(new ApiPlayScene());
streamDeck.actions.registerAction(new ApiPlayMain());
streamDeck.actions.registerAction(new ApiStop());
streamDeck.actions.registerAction(new ApiSaveScene());
streamDeck.actions.registerAction(new ApiSaveAll());
streamDeck.actions.registerAction(new ApiOpenScene());
streamDeck.actions.registerAction(new ApiReloadScene());

streamDeck.connect();

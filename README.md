# Godot Engine Boost — Stream Deck Plugin

A Stream Deck plugin that connects directly to the Godot 4.x editor, letting you trigger editor actions from your Stream Deck with real-time visual feedback.

Two components work together:

- **Stream Deck plugin** — installs in the Stream Deck app
- **Godot addon** — a lightweight HTTP bridge that runs inside the Godot editor

Both are available in the [latest release](https://github.com/a-orihuela/streamdeck-godot/releases/latest).

## Requirements

- Stream Deck app 7.1 or later
- Godot Engine 4.x
- Windows 10+ or macOS 12+

## Installation

### 1. Stream Deck plugin

Install directly from the [Elgato Marketplace](https://marketplace.elgato.com/product/godot-engine-boost-PLACEHOLDER), or download `com.aom.godotengine.streamDeckPlugin` from the [latest release](https://github.com/a-orihuela/streamdeck-godot/releases/latest) and double-click to install.

### 2. Godot addon

The addon is required for API actions (play, stop, save, etc.). Hotkey actions work without it.

1. Download `streamdeck-godot-addon.zip` from the [latest release](https://github.com/a-orihuela/streamdeck-godot/releases/latest)
2. Extract the `addons/` folder into your Godot project root
3. In Godot: **Project → Project Settings → Plugins** → enable **Stream Deck Godot**

The addon starts a local HTTP server on `127.0.0.1:9876` that the Stream Deck plugin connects to.

## Actions

### API actions — require the Godot addon

| Action | Description |
|---|---|
| **Play Scene** | Plays the current scene. Icon turns green while the game is running. |
| **Play Main Scene** | Runs the project from the main scene. Icon turns green while running. |
| **Stop** | Stops the running scene. |
| **Save Scene** | Saves the current scene. |
| **Save All** | Saves all open scenes. |
| **Open Scene** | Opens a specific scene by path (configure the path in the action settings). |
| **Reload Scene** | Reloads the current scene from disk. |
| **Switch Workspace** | Switches the editor workspace: 2D, 3D, Script, or AssetLib. |

### Hotkey actions — no addon required

These actions send keyboard shortcuts to the Godot editor window. Each action lets you configure a custom key combo if you've changed the default shortcuts in Godot's editor settings.

| Action | Default shortcut |
|---|---|
| **Pause** | F7 |
| **Toggle Breakpoint** | F9 |
| **Step Over** | F10 |
| **Step Into** | F11 |
| **Continue** | F12 |
| **Quick Open Scene** | Ctrl+Shift+O |
| **Quick Open** | Shift+Alt+O |
| **Command Palette** | Ctrl+Shift+P |
| **Distraction Free** | Ctrl+Shift+F11 |
| **Toggle Panel** | Ctrl+J |
| **Undo** | Ctrl+Z |
| **Redo** | Ctrl+Y |
| **Duplicate Node** | Ctrl+D |
| **Toggle Comment** | Ctrl+K |
| **Find in Files** | Ctrl+Shift+F |

### Custom hotkeys

If you've changed a shortcut in Godot's editor settings, click the action in Stream Deck, press **Capture combo**, then press your key combination. The action uses that combo from then on.

## Configuration

API actions share a connection configuration:

| Setting | Default | Description |
|---|---|---|
| Host | `127.0.0.1` | Address where the Godot addon is running |
| Port | `9876` | Port the addon listens on |

These only need to change if you have a port conflict or a non-standard setup.

## Development

```bash
npm install
npm run watch          # compile and reload on change
npx streamdeck validate com.aom.godotengine.sdPlugin
npx streamdeck pack com.aom.godotengine.sdPlugin
```

To publish a new release, push a version tag:

```bash
git tag v1.0.0.0
git push origin v1.0.0.0
```

GitHub Actions will build, validate, pack and attach both the Stream Deck plugin and the Godot addon zip to the release automatically.

## License

MIT

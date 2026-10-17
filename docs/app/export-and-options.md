# Export & Options

## Export

Click the **Export Image** button in the toolbar to open the export dialog.
Configure:

- **File Name** — the download file name (default: `formulavize`, max 255
  characters)
- **File Type** — the formats the **active renderer** supports. With the default
  Cytoscape renderer these are:
  - **png** — raster image (default)
  - **jpg** — raster image
  - **svg** — scalable vector graphic
- **Image Scaling (%)** — scale factor for the export (greater than 0 and at
  most 10000, default 100%)

Click **Download** to save the file.

The format list follows whichever renderer the recipe selects, so a recipe using
`^minimal{ }` offers `txt` instead. If a selected format is not available after
switching renderers, the dialog falls back to the new renderer's first format.
See [Renderers](/guide/renderers).

### Background and Descriptions

The exported image is filled with the canvas color from the recipe's
`^cytoscape{ background-color: … }` directive, so the export matches the editor
view. Without one, PNG and SVG export transparent and JPG exports white.

Node and edge [descriptions](/guide/styling#descriptions) are baked into
exported images as text, not just shown as hover popovers.

To render a file without opening the app at all, use the
[command line](/app/cli).

## Options

Click the **Options** (gear) button in the toolbar to open the options dialog.
Your selections locally persist between sessions.

### Tab to Indent / Autocomplete

Off by default, so that `Tab` moves focus to the next UI element rather than
trapping it in the editor. When enabled, `Tab` accepts the highlighted
autocomplete suggestion, or indents when no suggestion is open. Press `Esc` to
make the next `Tab` move focus instead.

### Debug Mode

Enable debug mode to show additional tabs alongside the graph, and to unlock
every [tutorial](/app/editor#tutorial-system) puzzlet regardless of progress.

The tabs are:

| Tab | Shows |
|---|---|
| **Output** | The rendered graph (always present) |
| **AST** | The abstract syntax tree produced by the parser |
| **DAG** | The compiled directed acyclic graph structure |
| **Errors** | Every [compilation error and warning](/reference/errors), with severity, source, and offsets |
| **Autocomplete** | The current completion index |
| **Imports** | The [import tree](/guide/imports#inspecting-imports) of the current recipe, nested by level |

Debug mode also turns on a cursor tooltip in the editor, which is useful for
seeing what the parser thinks is under the caret.

### Theme

Choose **Light**, **Dark**, or **System**. The theme applies to the app,
the editor's syntax highlighting, and the graph's default node, edge, and
namespace colors. **System** follows your OS preference and updates when it
changes.

Theme affects only the built-in defaults. Any color a recipe sets explicitly is
used as written in both themes.

## Toolbar

| Button | Action |
|---|---|
| **Tutorial** | Toggle tutorial mode |
| **Copy Fiz** | Copy the current editor contents to the clipboard |
| **Export Image** | Open the export dialog |
| **View Project GitHub** | Open the project repository |
| **Options** | Open the options dialog |

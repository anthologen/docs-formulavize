# Editor

Formulavize uses a split-pane layout with a code editor on the left and a live
graph on the right. The recipe recompiles as you type, so the graph and the
diagnostics stay current with the source.

## Split-Pane Layout

The editor and graph view are separated by a draggable divider. Resize the panes
to focus on writing or on viewing the graph.

## Syntax Highlighting

The editor is CodeMirror 6 with a fiz language mode built on the Lezer parser.
Highlighting covers:

- Identifiers and call names
- String, number, and color literals
- Style property names and values
- Comments (line and block)
- Operators and punctuation (`=`, `@`, `#`, `%`, `*`, `^`, `~`)

The highlighting theme follows the app [theme](/app/export-and-options#theme).

## Editor Features

Standard CodeMirror editing is enabled: undo history, bracket closing and
matching, code folding, active-line highlighting, line numbers, and
search-and-replace (`Ctrl+F` / `Cmd+F`). Occurrences of the current selection
are highlighted throughout the document.

## Autocomplete

Context-aware suggestions appear as you type, driven by the current compilation
rather than by a static word list:

- **Call and variable names** — names already defined in the recipe
- **Qualified names** — members of a namespace after `ns.`
- **Style tags** — `#tag` references, including qualified `#ns.tag`
- **Style properties** — offered by the active renderer, narrowed by element
  type inside a global style block
- **Global style keywords** — `node`, `edge`, `subgraph` after `*`
- **Renderer names** — whatever is registered, offered after `^`
- **Directive keys** — the active renderer's directive vocabulary inside a
  `^<name>{ }` block, narrowed by the `layout` the block already declares
- **About note names and keys** — offered after `~` and inside its block
- **Imported names** — whatever an import brings into scope, offered the way
  the import scopes it: unqualified for a merged import, under the alias for a
  named one. See [Imports](/guide/imports#how-an-import-is-scoped).

Because the suggestions come from the renderer, a `^cytoscape{ layout: "elk" }`
block offers ELK's options while a `layout: "dagre"` block offers dagre's. See
[Renderer Directives](/reference/renderer-directives).

Trigger autocomplete explicitly with `Ctrl+Space`. With
[Tab to Indent / Autocomplete](/app/export-and-options#tab-to-indent-autocomplete)
enabled, `Tab` accepts the highlighted suggestion.

## Inline Error Diagnostics

Compilation errors and warnings appear as inline diagnostics, highlighting the
offending span with a description and the reporting source. Warnings do not stop
the graph from drawing. See [Compilation Errors](/reference/errors) for the full
list of codes.

## Tutorial System

Click the **Tutorial** button in the toolbar to enter tutorial mode, which
teaches the language through a sequence of modules:

| Module | Covers |
|---|---|
| Intro | Creating your first node |
| Functions | Calls, arguments, and nesting |
| Assignment | Naming and reusing results |
| Style | Inline styles, style tags, and bindings |
| Namespaces | Grouping and scope |
| Renderers | Renderer directives and layouts |
| Imports | Pulling in external recipes |
| Outro | Finishing up |

Each module contains **puzzlets** which are individual challenges. A puzzlet shows its
instructions above the editor along with a **goal checklist**, which ticks off
each success criterion as your recipe satisfies it, so you can see exactly what
is still missing.

A level-select sidebar lets you jump between modules and tracks your progress,
which persists between sessions. Puzzlets unlock as you complete them. Turning on
[Debug Mode](/app/export-and-options#debug-mode) unlocks all of them.

## Tab-to-Indent

By default, the `Tab` key moves focus to the next UI element, so keyboard
navigation is never trapped in the editor. Enable
[Tab to Indent / Autocomplete](/app/export-and-options#tab-to-indent-autocomplete)
to use `Tab` for completions and indentation instead. When enabled, press `Esc`
first to restore the default `Tab` behavior for the next keypress.

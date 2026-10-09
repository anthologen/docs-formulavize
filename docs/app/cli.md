# Command Line

Formulavize can render a `.fiz` recipe to a file without a browser. The CLI
compiles the recipe and hands the DAG to the renderer the recipe itself selects,
so a file renders from the terminal exactly as it draws in the app.

## Running It

The CLI is run from the `formulavize` package:

```sh
pnpm cli recipe.fiz
```

It is not published as a standalone binary; `pnpm cli` runs
`src/cli/cliMain.ts` through `tsx`. The program identifies itself as `fviz` in
its own help output:

```sh
pnpm cli --help
```

## Usage

```text
fviz [options] <input.fiz>
```

| Option | Description |
|---|---|
| `-o, --output <path>` | Output file path. Default: `<input>.<format>` in the current directory. The extension sets the format unless `--format` is given. |
| `-f, --format <fmt>` | `png`, `jpg`, `svg`, or `txt`. Default: inferred from `--output`, else the renderer's own first supported format. |
| `-s, --scale <number>` | Scaling factor, where `1` is the app's 100%. Default `1`. Must be positive. |
| `--theme <mode>` | `light` or `dark`. Default `light`. |
| `--no-descriptions` | Do not render node and edge description text. |
| `-h, --help` | Show help. |

## Examples

Render to `recipe.png` in the current directory:

```sh
pnpm cli recipe.fiz
```

Render a dark, double-scale SVG to a chosen path:

```sh
pnpm cli recipe.fiz -o out/graph.svg --theme dark --scale 2
```

The format follows the output extension, so this writes a JPG:

```sh
pnpm cli recipe.fiz -o graph.jpg
```

Dump the DAG as text with the `minimal` renderer, selected by the recipe itself:

```
// summary.fiz
^minimal{ }
x = load()
y = f(x)
```

```sh
pnpm cli summary.fiz        # writes summary.txt
```

## How the Format Is Chosen

The renderer resolves first, then the format, in this order:

1. `--format`, if given.
2. The extension of `--output`, if given.
3. The resolved renderer's first supported format.

Asking a renderer for a format it cannot write is an error rather than a silent
substitution. `cytoscape` writes `png`, `jpg`, and `svg`; `minimal` writes `txt`.

## The Background Color

A headless render takes its canvas fill from the recipe's own
`^cytoscape{ background-color: … }` directive rather than from a flag, so the
exported image matches what the recipe describes. See
[Renderers](/guide/renderers#the-cytoscape-canvas).

## Compilation Errors

The CLI reports every issue the compiler found, with severity, source, and
character offsets:

```text
Compilation reported 1 issue(s):
  [error] Reference @12-18: Variable 'missing' not found
```

Warnings are printed and the render proceeds. Any issue of severity `error`
stops the run with exit code `1`.

## Browser-Only Renderers

A renderer that cannot draw outside a browser is still known to the CLI, so a
recipe asking for one is told so rather than quietly drawn by a different
renderer:

```text
Error: renderer "somerenderer" cannot render outside a browser
```

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Wrote the output file |
| `1` | Unreadable input, a compilation error, an unsupported format, a renderer that cannot draw headlessly, or an invalid `--scale` |

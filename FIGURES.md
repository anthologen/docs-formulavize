# Recipe Figures

Maintainer notes for the graph images in this site. Nothing here is needed to
read or edit the docs. These notes are only for adding or regenerating a figure.

The graph images under `docs/public/img/` are generated from the fiz code blocks
they sit beneath, using the formulavize CLI. They are committed, not built, so
regenerating them is a manual step.

## How They Are Generated

Each figure is rendered twice from the same recipe, once per theme, with the CLI
run from the `formulavize` package:

```sh
pnpm cli <recipe.fiz> -o <out>/fig-NN.light.svg --theme light
pnpm cli <recipe.fiz> -o <out>/fig-NN.dark.svg  --theme dark
```

Everything else is left at its default, which is what keeps the figures
consistent with each other and with the app.

The recipe handed to the CLI is the contents of the fenced block verbatim, with
one exception noted under *Figures with a prelude*.

## Why Each Figure Is a Pair

The CLI draws on a transparent background and takes its label color from the
theme: `--theme light` labels in black, `--theme dark` in near-white. A single
image would therefore be unreadable in one of the two site themes, so every
figure ships as a light/dark pair and the stylesheet shows only the matching
one.

## Embedding

Images are embedded directly after the closing fence as a markdown pair, one
per theme:

```md
![Rendered graph for the recipe above](/img/guide/styling/fig-01.light.svg){.fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/styling/fig-01.dark.svg){.fiz-figure-dark}
```

The `{.class}` attribute syntax comes from `@mdit/plugin-attrs`, which VitePress
bundles and enables by default (the `markdown.attrs` config option). Note that
the plugin's `fence` rule is off by default, so curly attributes work on inline
images like these but not on code blocks.

The two classes are defined in `docs/.vitepress/theme/custom.css`, which is the
only reason `docs/.vitepress/theme/` exists — the site otherwise uses the
default theme untouched.

## Which Blocks Get a Figure

Only a block that both compiles and produces at least one node. This is decided
by rendering, rather than by reading. Blocks with no
figure, and why:

- **No nodes.** Metadata-only (`~about{ … }`), directive-only
  (`^cytoscape{ layout: "elk" }`), and style-tag definitions on their own all
  compile fine but draw nothing.
- **Deliberate errors.** Examples that exist to show a parse or reference error.
- **Syntax fragments.** Bare identifiers, literals, and standalone style blocks
  in `reference/language-syntax.md`.
- **Imports.** `guide/imports.md` references files such as `./helpers.fiz` that
  do not exist; rendering them would mean inventing fixtures whose contents the
  page never shows.
- **`manual` layout.** It hands placement to the user, so headless there are no
  saved positions and every node collapses onto the origin with its labels
  overprinted. The result reads as a rendering bug, so that block is left bare.

## The Layout Comparison

The `dagre`, `breadthfirst`, and `elk` sections of `guide/renderers.md` share
one four-node recipe on purpose, so their figures differ only by the layout and
its options. Keep them identical when editing for easy comparison.

Their option values are chosen so the figure reads. `breadthfirst` is set to
`spacingFactor: 2.5` because at a smaller factor the two same-depth nodes
overlap each other and their labels collide — the figure looks like a bug
rather than a layout. Note that `breadthfirst` spacing is viewport-dependent,
and the CLI renders into a fixed 1024x768 container, so its figure is not
pixel-identical to what the app draws at an arbitrary window size.

## Figures with a Prelude

Two blocks in `guide/styling.md` apply the `#finish` tag that the block above
them defines, so they do not compile alone. Their figures are rendered from a
temporary file with that definition prepended. **The page source is unchanged** —
the prelude exists only to render what a reader already understands to be in
scope.

# Getting Started

## What is Formulavize?

Formulavize is a visual workflow editor for the **fiz** domain-specific
language (DSL). You write fiz recipes in a code editor, and Formulavize compiles
them into directed acyclic graphs (DAGs) that get drawn as you type.

The app opens with a default example loaded, and a built-in
[tutorial](/app/editor#tutorial-system) teaches the language a puzzle at a time.

## Your First Recipe

The simplest fiz program is a single call:

```
f()
```

![Rendered graph for the recipe above](/img/getting-started/fig-01.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/getting-started/fig-01.dark.svg){.fiz-figure .fiz-figure-dark}

That is a complete recipe: one node, named `f`. **Every call creates a node.**

## Adding Structure

Use **assignments** to name a call's node, then pass that name to another call
to draw an edge:

```
a = rinse()
b = dry(a)
c = chop(b)
```

![Rendered graph for the recipe above](/img/getting-started/fig-02.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/getting-started/fig-02.dark.svg){.fiz-figure .fiz-figure-dark}

This is three nodes (`rinse`, `dry`, `chop`) and two edge
(`rinse → dry → chop`). The names `a`, `b`, and `c` are not nodes: an assignment just names the node created
by its right-hand side. Edges are drawn to the name's referent node.

An argument always refers to something already bound, so a name has to be
assigned before a call can use it.

Referencing a variable more than once fans out from the same node:

```
butter = fetch()
m = melt(butter)
r = rest(butter)
partial = combine(m, r)
```

![Rendered graph for the recipe above](/img/getting-started/fig-03.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/getting-started/fig-03.dark.svg){.fiz-figure .fiz-figure-dark}

Here `fetch` feeds both `melt` and `rest`, which both feed `combine`.

## Adding Style

Give nodes a visual identity with **inline styles**. A style block on a call
styles the node that call creates:

```
x = pour()
y = chill(x){ background-color: #80ebff }
```

![Rendered graph for the recipe above](/img/getting-started/fig-04.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/getting-started/fig-04.dark.svg){.fiz-figure .fiz-figure-dark}

Or define a reusable **style tag** and apply it:

```
#highlight { background-color: #80ebff; shape: "diamond" }
x = pour()
y = chill(x){ #highlight }
```

![Rendered graph for the recipe above](/img/getting-started/fig-05.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/getting-started/fig-05.dark.svg){.fiz-figure .fiz-figure-dark}

A style block on an assigned **name** styles the edges that name draws instead:

```
x = pour()
y{ line-color: "red" } = drip(x)
chill(y) // this edge is red
```

![Rendered graph for the recipe above](/img/getting-started/fig-06.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/getting-started/fig-06.dark.svg){.fiz-figure .fiz-figure-dark}

Note that keyword values are strings (e.g. `shape: "diamond"`, not `shape: diamond`).

## Next Steps

The examples above are just a quick introduction to fiz.
The best way to learn fiz is to play through the formulavize tutorial.
For more detailed language behaviours, see the following pages:

- [Calls & Variables](/guide/calls-and-variables) — Calls, arguments, assignments, and variables
- [Namespaces](/guide/namespaces) — Group statements into nested sub-graphs
- [Imports](/guide/imports) — Pull in external fiz files
- [Styling](/guide/styling) — The complete styling system
- [Renderers](/guide/renderers) — Pick a renderer and configure its layout
- [About Notes](/guide/about-notes) — Attach metadata to a recipe

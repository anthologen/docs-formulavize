# Namespaces

Namespaces group statements into **nested sub-graphs** (compound nodes). They
give both scope isolation and visual hierarchy in the rendered DAG.

## Basic Namespace

Wrap statements in square brackets with a name:

```
prep[
  a = mix()
  b = knead(a)
]
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-01.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-01.dark.svg){.fiz-figure .fiz-figure-dark}

This creates a compound node `prep` holding the nodes its calls create
(`mix` and `knead`) and the edge between them. In the visualization, those
nodes are drawn inside the `prep` box.

As everywhere else, only calls create nodes: `a` and `b` are names for `mix`'s
and `knead`'s nodes, and `a` is what draws the `mix → knead` edge. See
[Calls & Variables](/guide/calls-and-variables).

## Namespaces with Arguments

Pass arguments into a namespace by adding an argument list after the closing
bracket:

```
d = fetch()
prep[
  a = knead()
](d)
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-02.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-02.dark.svg){.fiz-figure .fiz-figure-dark}

The edge runs from `fetch` **to the `prep` compound node itself** where the
box is the endpoint. A namespaces's argument does not reach in and attach to a
particular node inside.

## Namespaces with Styling

Apply styles to the compound node itself:

```
prep[
  a = knead()
](){ background-color: "wheat" }
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-03.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-03.dark.svg){.fiz-figure .fiz-figure-dark}

The empty `()` can be omitted if you only need styling:

```
prep[
  a = knead()
]{ background-color: "wheat" }
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-04.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-04.dark.svg){.fiz-figure .fiz-figure-dark}

A `*subgraph` [global style binding](/guide/styling#global-style-bindings)
styles every compound node at once.

## Anonymous Namespaces

Omit the name for an unnamed grouping:

```
[
  a = mix()
  b = knead(a)
]
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-05.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-05.dark.svg){.fiz-figure .fiz-figure-dark}

An anonymous namespace still creates a compound node, but with no name it has
nothing for a qualified reference to address, so nothing outside can reach into
it.

## Scope Isolation

Variables defined inside a namespace are **scoped** to that namespace. Access
them from outside with a qualified name:

```
fryer[
  donut = fry()
]

// Access from outside:
plain = cool(fryer.donut)
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-06.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-06.dark.svg){.fiz-figure .fiz-figure-dark}

Unlike an argument into a namespace, a qualified reference reaches **the inner
node**: the edge here runs `fry → cool`, crossing the namespace boundary
rather than stopping at the box.

Referencing a name that the namespace does not define reports
`REF_VAR_NOT_FOUND`.

Style tags are scoped the same way, and are referenced as `#fryer.tagName` — see
[Qualified Style Tags](/guide/styling#qualified-style-tags).

## Nesting Namespaces

Namespaces nest to create deeper hierarchies, and qualified names chain:

```
outer[
  inner[
    y = f()
  ]
  z = g(inner.y)
]
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-07.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-07.dark.svg){.fiz-figure .fiz-figure-dark}

The `f → g` edge crosses out of `inner` while both nodes stay inside `outer`.

## Assigning Namespaces

A namespace can appear on the right-hand side of an assignment, which names the
**compound node**:

```
d = fetch()
batch = prep[
  a = knead()
](d)

fry(batch)
```

![Rendered graph for the recipe above](/img/guide/namespaces/fig-08.light.svg){.fiz-figure .fiz-figure-light}
![Rendered graph for the recipe above](/img/guide/namespaces/fig-08.dark.svg){.fiz-figure .fiz-figure-dark}

`batch` refers to the `prep` box, so `fry(batch)` draws an edge from the box
to `fry`.

Assigning a namespace to a variable is the only way to pass it as an argument
to a call. The fiz language intentionally disallows namespaces to be passed
directly into calls for readability purposes.

## Layout Note

Namespaces are compound nodes, which not every layout handles. The
`breadthfirst` layout ignores compound parents and will draw children over the
namespace box; `dagre` and `elk` both nest correctly. See
[Renderers](/guide/renderers#layouts).

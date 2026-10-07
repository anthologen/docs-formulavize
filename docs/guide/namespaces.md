# Namespaces

Namespaces group statements into **nested sub-graphs** (compound nodes). They
give both scope isolation and visual hierarchy in the rendered DAG.

## Basic Namespace

Wrap statements in square brackets with a name:

```
pipeline[
  a = f()
  b = g(a)
]
```

This creates a compound node `pipeline` holding the nodes its calls create
(`f` and `g`) and the edge between them. In the visualization, those nodes are
drawn inside the `pipeline` box.

As everywhere else, only calls create nodes: `a` and `b` are names for `f`'s and
`g`'s nodes, and `a` is what draws the `f → g` edge. See
[Calls & Variables](/guide/calls-and-variables).

## Namespaces with Arguments

Pass arguments into a namespace by adding an argument list after the closing
bracket:

```
d = load()
pipeline[
  a = f()
](d)
```

The edge runs from `load` **to the `pipeline` compound node itself** where the
box is the endpoint. A namespaces's argument does not reach in and attach to a
particular node inside.

## Namespaces with Styling

Apply styles to the compound node itself:

```
pipeline[
  a = f()
](){ background-color: #eeeeff }
```

The empty `()` can be omitted if you only need styling:

```
pipeline[
  a = f()
]{ background-color: #eeeeff }
```

A `*subgraph` [global style binding](/guide/styling#global-style-bindings)
styles every compound node at once.

## Anonymous Namespaces

Omit the name for an unnamed grouping:

```
[
  a = f()
  b = g(a)
]
```

An anonymous namespace still creates a compound node, but with no name it has
nothing for a qualified reference to address, so nothing outside can reach into
it.

## Scope Isolation

Variables defined inside a namespace are **scoped** to that namespace. Access
them from outside with a qualified name:

```
ns[
  result = process()
]

// Access from outside:
final = consume(ns.result)
```

Unlike an argument into a namespace, a qualified reference reaches **the inner
node**: the edge here runs `process → consume`, crossing the namespace boundary
rather than stopping at the box.

Referencing a name that the namespace does not define reports
`REF_VAR_NOT_FOUND`.

Style tags are scoped the same way, and are referenced as `#ns.tagName` — see
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

The `f → g` edge crosses out of `inner` while both nodes stay inside `outer`.

## Assigning Namespaces

A namespace can appear on the right-hand side of an assignment, which names the
**compound node**:

```
d = load()
result = pipeline[
  a = f()
](d)

q(result)
```

`result` refers to the `pipeline` box, so `q(result)` draws an edge from the box
to `q`.

Assigning a namespace to a variable is the only way to pass it as an argument
to a call. The fiz language intentionally disallows namespaces to be passed
directly into calls for readability purposes.

## Layout Note

Namespaces are compound nodes, which not every layout handles. The
`breadthfirst` layout ignores compound parents and will draw children over the
namespace box; `dagre` and `elk` both nest correctly. See
[Renderers](/guide/renderers#layouts).

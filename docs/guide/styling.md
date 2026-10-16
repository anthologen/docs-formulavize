# Styling

Fiz provides a layered styling system that maps to Cytoscape.js CSS properties.
Styles can be applied at multiple levels, from global defaults to individual
elements.

## Inline Styles

Apply styles directly with curly braces. **What a style block targets depends on
where it sits**, because a call is a node and a variable is an edge:

```
x = load()
f(x){ background-color: #cc4444; border-width: 3 }   // styles the f node
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-01.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-01.dark.svg" alt="Rendered graph for the recipe above">

On an assignment's left-hand side, the block styles the **edges that name
draws** rather than a node:

```
x = load()
result{ line-color: #cc4444 } = f(x)
g(result)   // this edge is red
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-02.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-02.dark.svg" alt="Rendered graph for the recipe above">

To style a node, put the block on the call that creates it. See
[Calls & Variables](/guide/calls-and-variables#styling-on-lhs-variables).

Style declarations use the syntax `property: value` and are separated by
semicolons (auto-inserted at newlines). Declaring the same property twice in one
block results in a warning (`SYN_DUPLICATE_STYLE_PROPERTY_NAME`) and only the
last value will be applied.

## Style Tags

Define a **named style tag** with `#` and reuse it across multiple elements:

```
#important {
  background-color: #ffcc00
  border-width: 4
  border-color: #ff8800
}

x = load()
a = f(x){ #important }
b = g(x){ #important }
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-03.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-03.dark.svg" alt="Rendered graph for the recipe above">

### Applying Style Tags

Reference a style tag inside any style block with `#name`:

```
data = load()
result = process(data){ #important }
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-04.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-04.dark.svg" alt="Rendered graph for the recipe above">

You can mix style tags with inline properties. Tags apply in declaration order,
and inline properties win over all of them:

```
data = load()
result = process(data){ #important shape: "diamond" }
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-05.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-05.dark.svg" alt="Rendered graph for the recipe above">

::: warning
A semicolon may only follow a **declaration**, never a style tag or a bare
string. `{ #important shape: "diamond" }` parses; `{ #important; shape: … }`
does not. Putting the tag last works too: `{ shape: "diamond"; #important }`.
:::

Referencing a tag that nothing declares in scope reports
`REF_STYLE_TAG_NOT_FOUND`.

### Qualified Style Tags

Inside namespaces, style tags can be referenced with qualified names:

```
ns[
  #local { background-color: #aaccff }
]

// From outside:
x{ #ns.local } = f()
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-06.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-06.dark.svg" alt="Rendered graph for the recipe above">

## Style Bindings

A **style binding** with `%` applies styles to all elements whose **name**
matches the keyword:

```
%load { background-color: #88cc88 }
%process { background-color: #8888cc }

y = load()
z = process(y)
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-07.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-07.dark.svg" alt="Rendered graph for the recipe above">

Every node named `load` gets a green background. Every node named `process` gets
a blue background.

Edges also carry names from the variable that drew it so a binding can
target edges as well:

```
%raw { line-color: #cc8888 }

raw = load()
process(raw)   // this edge is pink
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-08.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-08.dark.svg" alt="Rendered graph for the recipe above">

Binding blocks accept style tags as well as inline properties:

```
#rounded { shape: "round-rectangle" }
%output { #rounded font-size: 10 }
```

## Global Style Bindings

A **global style binding** with `*` applies styles to all elements of a given
type:

```
*node { background-color: #f0f0f0 }
*edge { line-color: #888888 }
*subgraph { background-color: #e8e8ff }
```

The three global keywords are:

| Keyword | Applies to |
|---|---|
| `*node` | All leaf nodes (non-compound) |
| `*edge` | All edges |
| `*subgraph` | All compound nodes (namespaces) |

Any other keyword reports `SYN_INVALID_GLOBAL_STYLE_KEYWORD`.

## Descriptions

The `description` property attaches explanatory text to an element:

```
x = source()
f(x){ description: "This node loads the data" }
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-09.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-09.dark.svg" alt="Rendered graph for the recipe above">

They work on nodes, edges, and namespace (compound) nodes, and can be attached
through any styling level — inline, a style tag, or a name binding:

```
#documented { description: "Documented step" }
%load { description: "Reads from disk" }
```

### Description Shorthand

A bare string literal in a style block *is* a description, which is usually
easier to read than spelling out the property:

```
x = source()
f(x){ "This node loads the data" }
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-10.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-10.dark.svg" alt="Rendered graph for the recipe above">

Several strings in one block join with newlines, which is a convenient way to
write multi-line text:

```
x = source()
f(x){
  "Loads the data."
  "Fails loudly if the file is missing."
}
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-11.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-11.dark.svg" alt="Rendered graph for the recipe above">

### Styling Description Text

Every label-styling property has a `description-` prefixed counterpart that
styles the description text independent of the element's own label:

```
x = source()
f(x){
  "A well-dressed description"
  description-font-size: 14
  description-color: #333333
  description-text-background-color: #ffffee
}
```

<img class="fiz-figure fiz-figure-light" src="/img/guide/styling/fig-12.light.svg" alt="Rendered graph for the recipe above">
<img class="fiz-figure fiz-figure-dark" src="/img/guide/styling/fig-12.dark.svg" alt="Rendered graph for the recipe above">

See [Style Properties](/reference/style-properties#description-properties) for
the full list. `description-text-halign` and `description-text-valign` do not
exist: in Cytoscape those control label *position* relative to the node body
rather than alignment within a block, which is incompatible with how
descriptions are drawn for export.

## Style Priority

When multiple styles target the same element, they are applied in this order
(later entries override earlier ones):

1. **Base styles** — built-in defaults (labels, arrow shapes, theme colors)
2. **Global style bindings** (`*node`, `*edge`, `*subgraph`)
3. **Class styles** — style tags applied via `#tag`
4. **Name style bindings** — `%keyword` matches
5. **Element styles** — inline styles on individual nodes/edges
6. **Compound node styles** — styles on namespace containers

Within nested DAGs, child styles are applied after parent styles.

## Value Types

Style values can be:

| Type | Examples |
|---|---|
| Colors | `#ff0000`, `#4488cc`, `#abc` |
| Numbers | `3`, `0.5`, `100` |
| Numbers with units | `12px`, `2em` |
| Strings | `"hello"`, `'world'` |

There are no bare-word values, so a keyword-valued property needs quotes:
`shape: "diamond"`, not `shape: diamond`. Within a string, `\n` becomes a real
newline so renderers can wrap a label.

Multiple values for one property are comma-separated:

```
{ background-gradient-stop-colors: #ff0000, #0000ff }
```

## Beyond the Stylesheet

Some things a renderer needs are not element styles at all (e.g. which layout
runs, what color the canvas is). Those go in a
[renderer directive](/guide/renderers) rather than a style block:

```
^cytoscape{ layout: "elk"; background-color: #1e1e1e }
```

See [Style Properties](/reference/style-properties) for the complete list of
available element properties.

# Renderer Directives

Complete reference for the keys a `^<rendererName>{ }` block accepts. See
[Renderers](/guide/renderers) for the concepts.

Every value in a renderer directive is a string, number, or color literal.
Enumerated values are **quoted strings**. Unknown keys are ignored and
unparseable values are dropped, so the renderer's own default applies.

## `^cytoscape`

### Canvas

| Key | Type | Description |
|---|---|---|
| `background-color` | color | Fills the drawing surface, in the editor view / exported images |

### Layout Selection

| Key | Values | Default |
|---|---|---|
| `layout` | `"dagre"`, `"breadthfirst"`, `"elk"`, `"manual"` | `"dagre"` |

An absent or unrecognized value resolves to `"dagre"`.

### Shared Layout Options

Read by Cytoscape itself, so every layout understands them.

| Key | Type | Description |
|---|---|---|
| `fit` | boolean | Refit the viewport to the graph after layout |
| `padding` | number ≥ 0 | Padding around the graph when fitting |
| `animate` | boolean | Animate node positions into place |
| `animationDuration` | number ≥ 0 | Animation length in milliseconds |
| `nodeDimensionsIncludeLabels` | boolean | Count label size in node dimensions (not available for `manual`) |

Booleans accept `"true"`, `"false"`, `"1"`, and `"0"`.

### `layout: "dagre"`

[cytoscape.js-dagre API](https://github.com/cytoscape/cytoscape.js-dagre#api)

| Key | Values | Description |
|---|---|---|
| `rankDir` | `"TB"`, `"BT"`, `"LR"`, `"RL"` | Direction ranks flow in |
| `align` | `"UL"`, `"UR"`, `"DL"`, `"DR"` | Node alignment within a rank |
| `ranker` | `"network-simplex"`, `"tight-tree"`, `"longest-path"` | Rank assignment algorithm |
| `acyclicer` | `"greedy"` | Cycle-breaking heuristic |
| `nodeSep` | number ≥ 0 | Separation between nodes in the same rank |
| `edgeSep` | number ≥ 0 | Separation between adjacent edges |
| `rankSep` | number ≥ 0 | Separation between ranks |
| `spacingFactor` | number > 0 | Overall spacing multiplier |

Enum values are case-insensitive: `"lr"` and `"LR"` both work.

### `layout: "breadthfirst"`

[Cytoscape breadthfirst](https://js.cytoscape.org/#layouts/breadthfirst)

| Key | Values | Description |
|---|---|---|
| `direction` | `"downward"`, `"upward"`, `"rightward"`, `"leftward"` | Direction the tree grows |
| `directed` | boolean | Follow edge direction when assigning depth (default `true`) |
| `circle` | boolean | Arrange in concentric circles |
| `grid` | boolean | Align nodes to a grid |
| `maximal` | boolean | Place nodes at their maximal depth |
| `avoidOverlap` | boolean | Space nodes so bodies do not overlap |
| `spacingFactor` | number > 0 | Overall spacing multiplier |

::: warning
`breadthfirst` ignores compound parents, so namespaces are not drawn as
containers of their children.
:::

`roots` is deliberately not exposed: it takes element ids, which are generated
UUIDs a recipe does not name.

### `layout: "elk"`

[cytoscape.js-elk](https://github.com/cytoscape/cytoscape.js-elk) ·
[ELK option reference](https://eclipse.dev/elk/reference/options.html)

ELK option ids are dotted; a fiz property name cannot contain `.`, so they are
written with dashes and rewritten on the way out.

| Key | Values | Default |
|---|---|---|
| `elk-algorithm` | `"layered"`, `"mrtree"`, `"force"`, `"stress"`, `"radial"`, `"box"`, `"disco"`, `"random"` | `"layered"` |
| `elk-direction` | `"DOWN"`, `"UP"`, `"RIGHT"`, `"LEFT"`, `"UNDEFINED"` | — |
| `elk-edgeRouting` | `"ORTHOGONAL"`, `"POLYLINE"`, `"SPLINES"`, `"UNDEFINED"` | — |
| `elk-hierarchyHandling` | `"INCLUDE_CHILDREN"`, `"SEPARATE_CHILDREN"`, `"INHERIT"` | `"INCLUDE_CHILDREN"` |
| `elk-aspectRatio` | number > 0 | — |
| `elk-randomSeed` | integer | — |
| `elk-spacing-nodeNode` | number ≥ 0 | — |
| `elk-layered-spacing-nodeNodeBetweenLayers` | number ≥ 0 | — |
| `elk-layered-nodePlacement-strategy` | `"SIMPLE"`, `"INTERACTIVE"`, `"LINEAR_SEGMENTS"`, `"BRANDES_KOEPF"`, `"NETWORK_SIMPLEX"` | — |
| `elk-layered-crossingMinimization-strategy` | `"LAYER_SWEEP"`, `"INTERACTIVE"`, `"NONE"` | — |
| `elk-layered-cycleBreaking-strategy` | `"GREEDY"`, `"DEPTH_FIRST"`, `"INTERACTIVE"`, `"MODEL_ORDER"`, `"GREEDY_MODEL_ORDER"` | — |
| `elk-layered-considerModelOrder-strategy` | `"NONE"`, `"NODES_AND_EDGES"`, `"PREFER_EDGES"`, `"PREFER_NODES"` | `"NODES_AND_EDGES"` |

`elk.hierarchyHandling` defaults to `INCLUDE_CHILDREN` because namespaces become
compound nodes with edges crossing their boundary, which ELK only routes
correctly when children are included.

**Escape hatch.** Any `elk-*` key not listed above is passed through with the
same dash-to-dot rewriting, reaching the rest of the ELK option namespace:

```
^cytoscape{
  layout: "elk"
  elk-layered-mergeEdges: "true"
}
```

These keys are unvalidated; ELK ignores ids it does not know.

### `layout: "manual"`

[Cytoscape preset](https://js.cytoscape.org/#layouts/preset)

`manual` runs Cytoscape's `preset` layout, which leaves every node where it
already is, and makes nodes draggable regardless of other options. Node
positions live only in the rendered graph, and a rebuild carries them across by
element id.

| Key | Type | Default |
|---|---|---|
| `fit` | boolean | `false` |
| `padding` | number ≥ 0 | — |
| `animate` | boolean | — |
| `animationDuration` | number ≥ 0 | — |

`fit` defaults to `false` so that editing the recipe does not refit the viewport
and take back the control manual mode exists to give you.

`positions`, `zoom`, and `pan` are not exposed because they take coordinates,
which belong to the dragged graph rather than to the recipe.
`nodeDimensionsIncludeLabels` is not exposed because `preset` has no notion of
node dimensions.

## `^minimal`

The minimal example renderer declares no vocabulary of its own, so its directive
block accepts nothing and the editor suggests nothing inside it. It is selected
with an empty block:

```
^minimal{ }
```

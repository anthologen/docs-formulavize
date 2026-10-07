# Style Properties

All available Cytoscape.js CSS properties that can be used in fiz style blocks.
Properties are grouped by category.

For detailed value documentation, see the [Cytoscape.js style documentation](https://js.cytoscape.org/#style).

::: info
This vocabulary belongs to the **Cytoscape renderer**, which is the default. A
different [renderer](/guide/renderers) declares its own property list, and the
editor's autocomplete offers whichever one is active. Properties a recipe uses
that the active renderer does not know are simply passed along and ignored.

Keyword values are strings and need quotes — `shape: "diamond"`, not
`shape: diamond`. Settings that are not element styles at all, such as the
layout and the canvas color, go in a
[renderer directive](/reference/renderer-directives).
:::

## Special Properties

| Property | Applies To | Description |
|---|---|---|
| `description` | Nodes, edges, namespaces | Explanatory text, shown as a secondary label |

`description` has a shorthand: a bare string literal in a style block becomes
the description. See [Descriptions](/guide/styling#descriptions).

## Description Properties

Each of these styles the **description text** rather than the element's own
label. They mirror the label-styling properties below, prefixed with
`description-`.

| Property | Description |
|---|---|
| `description-font-family` | Description text's `font-family` |
| `description-font-style` | Description text's `font-style` |
| `description-font-weight` | Description text's `font-weight` |
| `description-font-size` | Description text's `font-size` |
| `description-text-transform` | Description text's `text-transform` |
| `description-text-wrap` | Description text's `text-wrap` |
| `description-text-overflow-wrap` | Description text's `text-overflow-wrap` |
| `description-text-max-width` | Description text's `text-max-width` |
| `description-text-outline-width` | Description text's `text-outline-width` |
| `description-line-height` | Description text's `line-height` |
| `description-color` | Description text's `color` |
| `description-text-outline-color` | Description text's `text-outline-color` |
| `description-text-outline-opacity` | Description text's `text-outline-opacity` |
| `description-text-background-color` | Description text's `text-background-color` |
| `description-text-background-opacity` | Description text's `text-background-opacity` |
| `description-text-background-padding` | Description text's `text-background-padding` |
| `description-text-border-opacity` | Description text's `text-border-opacity` |
| `description-text-border-color` | Description text's `text-border-color` |
| `description-text-border-width` | Description text's `text-border-width` |
| `description-text-border-style` | Description text's `text-border-style` |
| `description-text-background-shape` | Description text's `text-background-shape` |
| `description-text-justification` | Description text's `text-justification` |
| `description-text-opacity` | Description text's `text-opacity` |
| `description-min-zoomed-font-size` | Description text's `min-zoomed-font-size` |

`description-text-halign` and `description-text-valign` do not exist. In
Cytoscape those control label *position* relative to the node body rather than
alignment within a block, which is incompatible with the way descriptions are
drawn for export.

## Node Body

| Property | Description |
|---|---|
| `height` | Node height |
| `width` | Node width |
| `shape` | Node shape (e.g., `ellipse`, `rectangle`, `diamond`, `triangle`) |
| `shape-polygon-points` | Custom polygon shape points |
| `corner-radius` | Rounded corner radius |
| `background-color` | Node fill color |
| `background-fill` | Fill type (`solid`, `linear-gradient`, `radial-gradient`) |
| `background-opacity` | Fill opacity (0–1) |
| `background-blacken` | Darken/lighten factor (-1 to 1) |
| `background-gradient-stop-colors` | Gradient colors |
| `background-gradient-stop-positions` | Gradient stop positions |
| `background-gradient-direction` | Gradient direction |
| `padding` | Internal padding |
| `padding-relative-to` | Padding reference (`width`, `height`, `average`, `min`, `max`) |
| `bounds-expansion` | Expand hit area beyond bounds |

## Node Border

| Property | Description |
|---|---|
| `border-color` | Border color |
| `border-opacity` | Border opacity |
| `border-width` | Border thickness |
| `border-style` | Border style (`solid`, `dotted`, `dashed`, `double`) |
| `border-cap` | Border line cap |
| `border-join` | Border line join |
| `border-dash-pattern` | Custom dash pattern |
| `border-dash-offset` | Dash offset |
| `border-position` | Border position (`center`, `inside`, `outside`) |

## Node Outline

| Property | Description |
|---|---|
| `outline-color` | Outline color |
| `outline-opacity` | Outline opacity |
| `outline-width` | Outline thickness |
| `outline-style` | Outline style |
| `outline-offset` | Outline offset from border |

## Background Image

| Property | Description |
|---|---|
| `background-image` | Image URL |
| `background-image-crossorigin` | CORS setting |
| `background-image-opacity` | Image opacity |
| `background-image-containment` | Containment mode |
| `background-image-smoothing` | Image smoothing |
| `background-position-x` | Horizontal position |
| `background-position-y` | Vertical position |
| `background-width-relative-to` | Width reference |
| `background-height-relative-to` | Height reference |
| `background-repeat` | Repeat mode |
| `background-fit` | Fit mode (`none`, `contain`, `cover`) |
| `background-clip` | Clip mode |
| `background-width` | Image width |
| `background-height` | Image height |
| `background-offset-x` | Horizontal offset |
| `background-offset-y` | Vertical offset |

## Labels

| Property | Applies To | Description |
|---|---|---|
| `label` | Both | Label text |
| `text-rotation` | Both | Label rotation angle |
| `text-margin-x` | Both | Horizontal label offset |
| `text-margin-y` | Both | Vertical label offset |
| `source-label` | Edges | Label near source |
| `source-text-rotation` | Edges | Source label rotation |
| `source-text-margin-x` | Edges | Source label horizontal offset |
| `source-text-margin-y` | Edges | Source label vertical offset |
| `source-text-offset` | Edges | Source label offset along edge |
| `target-label` | Edges | Label near target |
| `target-text-rotation` | Edges | Target label rotation |
| `target-text-margin-x` | Edges | Target label horizontal offset |
| `target-text-margin-y` | Edges | Target label vertical offset |
| `target-text-offset` | Edges | Target label offset along edge |

## Label Styling

| Property | Applies To | Description |
|---|---|---|
| `font-family` | Both | Font family |
| `font-style` | Both | Font style (`normal`, `italic`) |
| `font-weight` | Both | Font weight |
| `font-size` | Both | Font size |
| `text-transform` | Both | Text transform (`none`, `uppercase`, `lowercase`) |
| `text-wrap` | Both | Wrap mode (`none`, `wrap`, `ellipsis`) |
| `text-overflow-wrap` | Both | Overflow wrap behavior |
| `text-max-width` | Both | Max label width before wrapping |
| `text-outline-width` | Both | Text outline thickness |
| `line-height` | Both | Line height for wrapped text |
| `text-valign` | Both | Vertical alignment (`top`, `center`, `bottom`) |
| `text-halign` | Both | Horizontal alignment (`left`, `center`, `right`) |
| `color` | Both | Text color |
| `text-outline-color` | Both | Text outline color |
| `text-outline-opacity` | Both | Text outline opacity |
| `text-background-color` | Both | Label background color |
| `text-background-opacity` | Both | Label background opacity |
| `text-background-padding` | Both | Label background padding |
| `text-border-opacity` | Both | Label border opacity |
| `text-border-color` | Both | Label border color |
| `text-border-width` | Both | Label border width |
| `text-border-style` | Both | Label border style |
| `text-background-shape` | Both | Label background shape |
| `text-justification` | Both | Multi-line text justification |

## Visibility

| Property | Applies To | Description |
|---|---|---|
| `display` | Both | Display mode (`element`, `none`) |
| `visibility` | Both | Visibility (`visible`, `hidden`) |
| `opacity` | Both | Element opacity (0–1) |
| `text-opacity` | Both | Label opacity (0–1) |
| `min-zoomed-font-size` | Both | Hide label below this font size |
| `z-index` | Both | Stack order |

## Edge Line

| Property | Description |
|---|---|
| `line-style` | Line style (`solid`, `dotted`, `dashed`) |
| `line-color` | Line color |
| `line-fill` | Line fill type |
| `line-cap` | Line cap style |
| `line-opacity` | Line opacity |
| `line-dash-pattern` | Custom dash pattern |
| `line-dash-offset` | Dash offset |
| `line-outline-width` | Line outline thickness |
| `line-outline-color` | Line outline color |
| `line-gradient-stop-colors` | Line gradient colors |
| `line-gradient-stop-positions` | Line gradient positions |
| `curve-style` | Curve type (`bezier`, `taxi`, `segments`, `haystack`, etc.) |
| `haystack-radius` | Haystack radius |
| `source-endpoint` | Source connection point |
| `target-endpoint` | Target connection point |
| `control-point-step-size` | Control point spacing |
| `control-point-distances` | Control point distances |
| `control-point-weights` | Control point weights |
| `segment-distances` | Segment distances |
| `segment-weights` | Segment weights |
| `segment-radii` | Segment radii |
| `radius-type` | Radius type |
| `taxi-turn` | Taxi turn position |
| `taxi-turn-min-distance` | Minimum taxi turn distance |
| `taxi-direction` | Taxi direction |
| `taxi-radius` | Taxi corner radius |
| `edge-distances` | Edge distance calculation mode |
| `arrow-scale` | Arrow size multiplier |
| `loop-direction` | Self-loop direction |
| `loop-sweep` | Self-loop sweep angle |
| `source-distance-from-node` | Gap between edge start and source node |
| `target-distance-from-node` | Gap between edge end and target node |

## Edge Arrows

Arrow properties are available for four positions: `source`, `mid-source`, `target`, and `mid-target`.

| Property | Description |
|---|---|
| `source-arrow-shape` | Source arrow shape |
| `source-arrow-color` | Source arrow color |
| `source-arrow-fill` | Source arrow fill (`filled`, `hollow`) |
| `source-arrow-width` | Source arrow width |
| `mid-source-arrow-shape` | Mid-source arrow shape |
| `mid-source-arrow-color` | Mid-source arrow color |
| `mid-source-arrow-fill` | Mid-source arrow fill |
| `mid-source-arrow-width` | Mid-source arrow width |
| `target-arrow-shape` | Target arrow shape |
| `target-arrow-color` | Target arrow color |
| `target-arrow-fill` | Target arrow fill |
| `target-arrow-width` | Target arrow width |
| `mid-target-arrow-shape` | Mid-target arrow shape |
| `mid-target-arrow-color` | Mid-target arrow color |
| `mid-target-arrow-fill` | Mid-target arrow fill |
| `mid-target-arrow-width` | Mid-target arrow width |

Common arrow shapes: `triangle`, `triangle-tee`, `circle-triangle`, `triangle-cross`, `triangle-backcurve`, `vee`, `tee`, `square`, `circle`, `diamond`, `chevron`, `none`.

## Not Style Properties

Some things a renderer needs are not properties of any node or edge, so they are
not in this list:

| Setting | Where it goes |
|---|---|
| Which layout runs, and its options | `^cytoscape{ layout: … }` - see [Renderer Directives](/reference/renderer-directives) |
| The canvas background color | `^cytoscape{ background-color: … }` |
| Which renderer draws at all | `^<name>{ }` - see [Renderers](/guide/renderers) |
| Recipe metadata | `~<name>{ }` - see [About Notes](/guide/about-notes) |

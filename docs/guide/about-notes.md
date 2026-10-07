# About Notes

An **about note** attaches metadata to a recipe file. It is written with `~`, an
optional name, and a block:

```
~author{ name: "Remy"; email: "remy@example.com" }
```

Think of it as a **semi-structured comment**: it describes the recipe rather than
the graph, and it produces no nodes, edges, or styling.

## Named and Unnamed Notes

The name is optional. An unnamed note is keyed by the empty string:

```
~{ "A recipe that does nothing in particular" }

~about{
  title: "Cubic Pipeline"
  version: 2
}
```

## Nothing Is Validated

The compiler ascribes no meaning to a note's name or to its keys.
Any name and any key is accepted.

The metadata for fiz recipes is deliberately left open for the community
to experiment with. This feature is added for extensibility of metadata driven
uses cases like watermarking, attributions, languange version pinning,
file version tracking, license compliance, etc.

Style tags used inside a note block **are** checked. Like anywhere else, an
unknown tag reports `REF_STYLE_TAG_NOT_FOUND`.

## Top Level Only

An about note describes the recipe as a whole, so it is only allowed at the top
level. A note nested in a namespace cannot be read from the root DAG and is an
error (`SYN_ABOUT_NOTE_NOT_TOP_LEVEL`):

```
ns[
  ~author{ name: "Remy" }   // error: not at top level
]
```

## Value Syntax

A note block is a style block, so the same value rules apply: strings, numbers,
and colors. Bare words are not values, so text needs quotes.

```
~about{
  title: "My Recipe"     // string
  revision: 3            // number
  accent: #4488cc        // color
}
```

A bare string in the block becomes the block's `description`, the same shorthand
[styling](/guide/styling#description-shorthand) uses:

```
~{ "First line" "Second line" }
```

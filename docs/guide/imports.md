# Imports

Imports let you include external fiz files into your recipe. An import location
is fetched over the network, so it can be any URL that serves the file's raw
text.

## Basic Import

Use `@` followed by a string path:

```
@ "./helpers.fiz"
```

This inlines the contents of `helpers.fiz` into the current recipe.

## Named Import

Give the import a name to place it in its own namespace:

```
lib @ "./helpers.fiz"
```

The imported recipe's variables are accessible via qualified names like
`lib.result`, and so are its style tags: `f(x){ #lib.highlight }`.

## File Extension

Import paths **must** end with `.fiz`. The check happens before any fetch is
attempted, so a wrong extension never hits the network.

```
// Valid
@ "./utils.fiz"

// Invalid — will produce an error
@ "./utils.txt"
```

## Caching

Imports are cached by location — if the same path is imported several times,
even across nested imports, it is fetched and compiled once.

Since the location is the cache key, versioning is the package author's
responsibility. It is recommended to put the version in the path
(e.g. `"./pkg-1.0.0.fiz"`).

## Ordering

Imports are processed in the order they appear rather than fetched in parallel,
so a recipe whose later statements depend on an earlier import behaves
predictably.

## Assigning Imports

Like namespaces, imports can appear on the right-hand side of assignments:

```
helpers = lib @ "./helpers.fiz"
```

Also like namespaces, assigning a name to an import's namespace is the only way
to pass it to a call because the fiz language intentionally disallows the
directly passing a namespace into a call for readability purposes.

## When an Import Fails

Every import failure reports as `IMP_FETCH_FAILED`, with a message naming the
cause:

| Message | Cause |
|---|---|
| `Package '…' missing file extension .fiz` | The path does not end in `.fiz` |
| `Failed to fetch package from '…': <status>` | The request did not succeed |
| `Expected a fiz file but received HTML from '…'` | The response was `text/html` |
| `Circular import detected: …` | The file is already on the current import chain |

The HTML check catches the most common mistake: pointing at a repository's web
page or a 404 page rather than at the raw file. A circular import is detected
and reported rather than looped on.

See [Compilation Errors](/reference/errors#import-codes) for the full list.

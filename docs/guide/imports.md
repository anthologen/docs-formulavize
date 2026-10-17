# Imports

Imports let you include external fiz files into your recipe. An import location
is read by the host the compiler runs in: in the app it is fetched over the
network, so it can be any URL that serves the file's raw text, while the
[CLI](/app/cli#imports) also reads local paths relative to the recipe.

## Basic Import

Use `@` followed by a string path:

```
@ "./helpers.fiz"
```

This merges the contents of `helpers.fiz` into the current recipe: its nodes,
edges, variables, and style tags all land in the importing scope as if they had
been written there.

## Named Import

Give the import an alias to place its contents in a namespace of their own:

```
lib @ "./helpers.fiz"
```

The imported recipe's variables are accessible via qualified names like
`lib.result`, and so are its style tags: `f(x){ #lib.highlight }`. The alias
draws a compound node around the imported contents, exactly as a
[namespace](/guide/namespaces) does.

## Assigning Imports

Like namespaces, imports can appear on the right-hand side of an assignment:

```
helpers = lib @ "./helpers.fiz"
```

Also like namespaces, assigning a name to an import's namespace is the only way
to pass it to a call, because the fiz language intentionally disallows directly
passing a namespace into a call for readability purposes.

## How an Import Is Scoped

An import's contents keep a scope of their own whenever they are provided with an alias name. An assignment points a variable at said name. Four
forms follow from that:

| Form | What happens |
|---|---|
| `@ "pkg.fiz"` | Contents are **merged** into the importing scope. Nothing is nested; names are used unqualified. |
| `lib @ "pkg.fiz"` | Contents go in a namespace called `lib`, reachable as `lib.name` and `#lib.tag`. |
| `x = lib @ "pkg.fiz"` | Same namespace as above, and `x` also names the compound node, so `f(x)` draws an edge from the box. |
| `x = @ "pkg.fiz"` | Contents go in an **unnamed** scope. `x` names the box, but nothing reaches inside it: `x.inner` does not resolve. |

Editor [autocomplete](/app/editor#autocomplete) follows the same rules, so a
merged import offers its names unqualified, an alias offers them under the
alias, and an unnamed assigned import offers only the assigned variable.

## File Extension

Import paths **must** end with `.fiz`. The check happens before any fetch is
attempted, so a wrong extension never hits the network.

```
// Valid
@ "./utils.fiz"

// Invalid — will produce an error
@ "./utils.txt"
```

The check looks at the location's **path**, not the whole string, so a query
string or fragment does not change the answer:

```
@ "./pkg.fiz?v=2"       // valid — the path still ends in .fiz
@ "./index.html#pkg.fiz" // invalid — the path is index.html
```

A location too malformed to parse as a path at all is passed through to the
fetch, which reports what is actually wrong with it rather than rejecting the
extension.

## Where a Location Is Read From

| Host | A relative location | An absolute location |
|---|---|---|
| App (browser) | Resolved against the page the app is served from | Fetched as given |
| [CLI](/app/cli#imports) | Read from disk, relative to the **entry recipe's** directory | `http(s):` is fetched; `file:` and absolute filesystem paths are read from disk |

A package's own relative imports resolve the same way, so under the CLI a
transitive `@ "./dep.fiz"` is still resolved against the directory of the recipe
that was run, not against the directory of the file that declared it.

## Fetch Limits

A network import is held to three limits, so a wrong URL fails quickly and
loudly rather than hanging or filling memory:

| Limit | Value | Reported as |
|---|---|---|
| Deadline | 10 seconds, covering the response body as well as the headers | `Failed to fetch package from '…': timed out after 10000ms` |
| Size | 4 MiB, enforced on the declared `content-length` and again while the body streams in | `Package '…' exceeds the 4194304 byte import limit` |
| Content type | `text/*`, `application/octet-stream`, `application/x-*`, or no type at all | `Expected a fiz file but received '…' from '…'` |

The content-type allow-list is deliberately generous: raw fiz files are served
as `text/plain` by GitHub raw, as `application/octet-stream` by some object
stores, and with no type at all by plenty of static servers. `text/html` is
rejected on its own, because pointing at a repository's web page or a 404 page
instead of the raw file is the most common mistake.

## Caching

Imports are cached by location for the lifetime of the editor session: if the
same path is imported several times, even across nested imports, it is fetched
and parsed once.

What is cached is the **parsed recipe**, not a compiled graph. Each import site
builds its own graph from that shared parse, so two sites importing one package
get two independent subgraphs with distinct ids rather than one graph that potentially collides with itself:

```
x @ "pkg.fiz"
y @ "pkg.fiz"
```

Both `x` and `y` hold a full copy of the package's nodes, and a node inside `x`
never shares an id with its counterpart inside `y`.

A failed fetch is **not** kept, so a transient network error is retried on the
next compile rather than becoming permanent for the session. A successful fetch,
on the other hand, is not re-requested. For changes to a remote package to take effect, one must reload the app to clear the cache and force a re-request.

Since the location is the cache key, versioning is the package author's
responsibility. It is recommended to put the version in the path
(e.g. `"./pkg-1.0.0.fiz"`).

## Ordering

Imports are processed in the order they appear rather than fetched in parallel,
so a recipe whose later statements depend on an earlier import behaves
deterministically.

## Circular Imports

An import whose location is already being imported further up the chain is
refused and reported as `IMP_CIRCULAR`, rather than looped on. The package that
declared it will still compile. However, it will compile without the contents of the
import that closed the cycle.

That omission applies only to the import chain being compiled; it does not
permanently remove either package's contents. If `a.fiz` and `b.fiz` import
each other, compiling `@ "a.fiz"` follows `a` to `b` and omits the import
from `b` back to `a`, because `a` is already on that chain. Starting a separate
compile with `@ "b.fiz"` reverses the traversal: it includes `b` and `a`, then
omits the import from `a` back to `b` when the chain returns to `b`.

## When an Import Fails

Each failure carries its own code and a message explaining the cause:

| Code | Message | Cause |
|---|---|---|
| `IMP_MISSING_EXTENSION` | `Package '…' missing file extension .fiz` | The path does not end in `.fiz`, so no fetch is attempted |
| `IMP_FETCH_FAILED` | `Failed to fetch package from '…': <reason>` | The request did not succeed, timed out, or dropped mid-body |
| `IMP_FETCH_FAILED` | `Package '…' exceeds the 4194304 byte import limit` | The response was over the size cap |
| `IMP_FETCH_FAILED` | `Failed to read package from '…': <reason>` | Under the CLI, a local file could not be read |
| `IMP_HTML_RESPONSE` | `Expected a fiz file but received HTML from '…'` | The response was `text/html` |
| `IMP_INVALID_CONTENT_TYPE` | `Expected a fiz file but received '…' from '…'` | The response's content type is not on the allow-list |
| `IMP_CIRCULAR` | `Circular import detected: …` | The file is already on the current import chain |

Every one of these is reported as an `error` positioned on the import statement
itself. See [Compilation Errors](/reference/errors#import-codes).

## When an Imported Package Has Errors

A package that fetches but does not compile cleanly reports one aggregated
**warning** against the import statement:

```text
[warning] Import @0-9: Imported package 'p.fiz' reported 1 issue(s): Variable 'x' not found
```

The imported file's own diagnostics are never forwarded as separate errors,
because their character offsets index that file's text rather than the open
document. The count and the first message are surfaced instead, so a silently
empty or partial subgraph is never left unexplained. Being a warning, it does
not stop the recipe from drawing.

## Inspecting Imports

Turning on [debug mode](/app/export-and-options#debug-mode) adds an **Imports**
tab showing the import tree of the current recipe, nested by level, with
`*cyclic dependency*` marking a location already seen on that branch. The tab
reports only what is already cached and never triggers a fetch of its own, so a
package that failed to load simply appears without children.

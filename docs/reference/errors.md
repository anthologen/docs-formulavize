# Compilation Errors

Every issue the compiler reports carries a source, a severity, a
character range, and a stable code.

Errors appear as inline diagnostics in the editor, in the **Errors** tab in
[debug mode](/app/export-and-options#debug-mode), and on stderr from the
[CLI](/app/cli#compilation-errors).

## Severity

| Severity | Effect |
|---|---|
| `error` | The recipe is not valid. The CLI exits `1`. |
| `warning` | Compilation continues; the recipe still draws. |
| `info`, `hint` | Informational only. |

A recipe with only warnings renders. The app draws whatever the compiler managed
to build, so a partial graph is normal while a recipe is mid-edit.

## Sources

| Source | Meaning |
|---|---|
| `Syntax` | The text does not parse, or a construct is in a place it is not allowed |
| `Reference` | A name was used that nothing declares |
| `Import` | An imported file could not be fetched or compiled |
| `Internal` | A compiler invariant was violated — a bug worth reporting |

## Syntax Codes

| Code | Severity | Reported when |
|---|---|---|
| `SYN_UNEXPECTED_TOKEN` | error | The parser cannot make sense of a token: `Unexpected token '…'` |
| `SYN_MISMATCHED_BRACKET` | error | A bracket is unclosed, unopened, or closed by the wrong kind: `Unclosed bracket '('`, `Unexpected closing bracket ')'`, `Mismatched bracket '}'` |
| `SYN_MISSING_LHS` | error | An assignment has nothing on its left: `Left hand side is missing` |
| `SYN_MISSING_RHS` | error | An assignment has nothing on its right: `Right hand side is missing` |
| `SYN_DUPLICATE_LHS_NAME` | **warning** | The same name appears twice on one left-hand side: `Duplicate left hand side variable 'a'` |
| `SYN_DUPLICATE_STYLE_PROPERTY_NAME` | **warning** | A style block declares a property twice: `Duplicate style property 'border-width'`. The last value wins. |
| `SYN_INVALID_GLOBAL_STYLE_KEYWORD` | error | A `*keyword` block names something other than `node`, `edge`, or `subgraph`: `Invalid global style binding keyword 'nodes'` |
| `SYN_RENDERER_DIRECTIVE_NOT_TOP_LEVEL` | error | A `^<name>{ }` directive appears inside a namespace |
| `SYN_ABOUT_NOTE_NOT_TOP_LEVEL` | error | A `~<name>{ }` note appears inside a namespace |

Bracket diagnostics are collected over the whole source when the parser enters
error recovery, so an unclosed bracket is reported at the opener rather than at
the end of the file.

## Reference Codes

| Code | Severity | Reported when |
|---|---|---|
| `REF_VAR_NOT_FOUND` | error | A variable is used that no assignment in scope declares: `Variable 'x' not found`. Raised both for call arguments and for a bare right-hand side. |
| `REF_STYLE_TAG_NOT_FOUND` | error | A `#tag` is referenced that no declaration in scope provides: `Style tag 'ns.local' not found`. Checked in style blocks, style bindings, renderer directives, and about notes alike. |

Both scenarios respect namespace scoping. A name declared inside a namespace is
only reachable from outside through a qualified name. See
[Namespaces](/guide/namespaces#scope-isolation).

## Import Codes

| Code | Severity | Reported when |
|---|---|---|
| `IMP_FETCH_FAILED` | error | Any import failure, carrying the underlying reason |

The messages distinguish the cases:

| Message | Cause |
|---|---|
| `Package '…' missing file extension .fiz` | The path does not end in `.fiz`, so no fetch is attempted |
| `Failed to fetch package from '…': <status>` | The request did not succeed |
| `Expected a fiz file but received HTML from '…'` | The response was `text/html`, usually a 404 page or a repository web page instead of a raw file |
| `Circular import detected: …` | The file is already on the current import chain |

::: info
`IMP_CIRCULAR`, `IMP_MISSING_EXTENSION`, and `IMP_HTML_RESPONSE` exist in the
error-code enum but are not attached to these cases. All four currently
report as `IMP_FETCH_FAILED`. Match on the message, not the code, if you need to
tell them apart.
:::

## Internal Codes

These indicate a compiler bug rather than a problem with the recipe.

| Code | Reported when |
|---|---|
| `INT_UNKNOWN_ARG_TYPE` | A call argument was of a type the DAG builder does not handle |
| `INT_INVALID_RHS_TYPE` | An assignment's right-hand side was of an unhandled type |
| `INT_UNKNOWN_STMT_TYPE` | A statement was of an unhandled type |

## CLI Output Format

The CLI prints one line per issue:

```text
  [<severity>] <Source> @<from>-<to>: <message>
```

For example:

```text
Compilation reported 1 issue(s):
  [error] Reference @12-18: Variable 'missing' not found
```

A single-character span prints as `@<offset>` rather than a range.

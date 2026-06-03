---
aliases:
  - Linda Hygiene Tab
  - Hygiene Tab
---

# Linda Dashboard Hygiene

## Status

Active

## Dashboard Navigation

- [Linda Dashboard](../dashboard.md)
- [Home](home.md)
- [Summary](summary.md)
- [Focus](focus.md)
- [Calendar](calendar.md)
- [Pending Decisions](pending-decisions.md)
- [Run Log](run-log.md)
- [Hygiene](hygiene.md)
- [Common Dashboard Spec](../../common-spec.md)

## Purpose

Hygiene makes source-link and note-health problems actionable.

## Sources

Hygiene may read:

| Source | Use |
| --- | --- |
| active Markdown files outside `app/` | Wiki-link scan source. |
| frontmatter aliases in Markdown files | Link-resolution candidates. |
| template and example Markdown files | Placeholder-link classification. |
| [Common Dashboard Spec](../../common-spec.md) | Shared source-link and actionability rules. |
| [Files And Folders](../../../source-of-truth/files-and-folders.md) | Source folder contract that affects what counts as live. |
| [Look Here First](../../../lookherefirst.md) | Important hub links and fill-order context. |

## Configurable Inputs

James can define:

| Input | Current value | Notes for rebuild |
| --- | --- | --- |
| Scan scope | Active Markdown outside `app/`, `.git/`, generated artifacts, and archived review-later material | Keep scan scope explicit. |
| Placeholder targets | Known template/example targets such as `idea-name`, `project-name`, `sop-name` | Should be configurable later. |
| Hygiene score formula | Penalize real unresolved links more than placeholders | Current formula is implementation-defined. |
| Grouping rule | Group by file | Prefer grouped file summaries. |
| Calls to action | Mark/exclude placeholders; inspect real broken links after live/future scope is clear | Every group needs an action. |

## Current State

Hygiene currently shows:

- overall hygiene score
- pie chart for unresolved link composition
- wiki-link count
- unresolved-link count
- placeholder-link count
- needs-review count
- grouped files where link noise exists

Each grouped file shows a call to action.

Current operator action:

1. Mark placeholders as examples or exclude them from strict checks.
2. Inspect real broken links after live/future scope is clear.

## Required Behavior

- Hygiene must not only show counts.
- Every group must tell James what to do.
- Placeholder/template links should be separated from real broken links.
- Prefer grouped file summaries over long raw broken-link lists.
- File references must be clickable.

## Rebuild Contract

To rebuild Hygiene, provide:

- Markdown scan scope
- wiki-link total count
- unresolved-link count
- placeholder-link count
- needs-review count
- hygiene score and score formula
- grouped file summary with file path, count, placeholder count, needs-review count, and call to action

If a link is a deliberate template placeholder, classify it separately from a real broken link.

## Related

- [Linda Dashboard](../dashboard.md)
- [Common Dashboard Spec](../../common-spec.md)
- [Files And Folders](../../../source-of-truth/files-and-folders.md)
- [Look Here First](../../../lookherefirst.md)

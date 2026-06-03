---
aliases:
  - Linda Summary Tab
  - Summary Tab
---

# Linda Dashboard Summary

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

Summary shows Linda's current repo-health state, score context, audit vectors, and the few themes James should keep in mind before working.

## Sources

Summary may read:

| Source | Use |
| --- | --- |
| [Linda Repo Health Memory](../../../source-of-truth/memory/linda-repo-health.md) | Score, previous score, delta, weakest area, last run, must-look findings, and challenge. |
| [Look Here First](../../../lookherefirst.md) | Tomorrow to-do count and ordered source sequence. |
| [Decision Index](../../../source-of-truth/decisions/index.md) | Source decision record count. |
| active Markdown inventory outside `app/` | Scope count. |
| `dashboard_actions` table | Accepted dashboard action count. |
| `dashboard_snapshots` table | Prior snapshot date and trend comparison. |
| [Common Dashboard Spec](../../common-spec.md) | Six audit-vector labels and colors. |

## Configurable Inputs

James can define:

| Input | Current value | Notes for rebuild |
| --- | --- | --- |
| Score source | Linda memory | Must not invent a score if memory is missing. |
| Score label | `Score` | Do not use `Linda score`. |
| Audit vectors | Six configured vectors | Exactly six vectors. |
| Tomorrow themes | One to three themes | Current themes are `Clarity`, `Daily use`, `File placement`. |
| Must-look count | Current Linda memory list | Keep short and link source files. |
| Trend source | Prior database snapshot | Show `Missing` when no prior snapshot exists. |

## Current State

Summary currently shows:

- `Score`
- `Scope`
- `Source decision records`
- `Accepted actions`
- `Tomorrow to-dos`
- score trend and prior snapshot context
- Linda's current must-look findings
- an audit-vector bar chart
- one to three tomorrow themes
- Linda's current challenge

The current theme labels use the shared six audit vectors:

- `Clarity`
- `Daily use`
- `File placement`

## Required Behavior

- The score label must be `Score`, not `Linda score`.
- Source decision records must be separated from dashboard actions.
- The audit chart must use the six configured audit vectors.
- Theme labels must use plain words from the audit-vector configuration.
- File references in findings must be clickable.
- Prior snapshot context belongs near the score, not in a separate unexplained card.

## Rebuild Contract

To rebuild Summary, provide:

- current score and score source
- prior score or `Missing`
- prior snapshot date or `Missing`
- scope count
- source decision record count
- accepted dashboard action count
- to-do count
- six audit-vector scores
- one to three tomorrow themes
- must-look findings with optional source files

Do not summarize source decision records as dashboard actions.

## Related

- [Linda Dashboard](../dashboard.md)
- [Focus](focus.md)
- [Run Log](run-log.md)
- [Common Dashboard Spec](../../common-spec.md)
- [Linda Repo Health Memory](../../../source-of-truth/memory/linda-repo-health.md)

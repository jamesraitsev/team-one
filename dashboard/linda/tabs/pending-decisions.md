---
aliases:
  - Linda Pending Decisions Tab
  - Pending Decisions Tab
---

# Linda Dashboard Pending Decisions

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

Pending Decisions shows decisions James needs to make before the repo can be treated as a clean live operating system.

## Sources

Pending Decisions may read:

| Source | Use |
| --- | --- |
| [Common Dashboard Spec](../../common-spec.md) | Shared action rules, audit-vector rules, and tab contract. |
| [Structural Questions](../../../question.md) | Structural questions that may need decisions. |
| [Look Here First](../../../lookherefirst.md) | Ordered source files and priority context. |
| [Files And Folders](../../../source-of-truth/files-and-folders.md) | Source folder contract decision inputs. |
| [GitHub](../../../source-of-truth/github.md) | GitHub/file-first execution posture decision inputs. |
| [Operating Model Overview](../../../operating-model/README.md) | Authority order and live-vs-spec decision inputs. |
| [Agent Schedules](../../../agents/agent-schedules.md) and [Agent Workflows](../../../agents/agent-workflows.md) | Daily loop decision inputs. |
| [Decision Index](../../../source-of-truth/decisions/index.md) | Durable source decision context. |
| `dashboard_actions` table | Dashboard action history for Accept, Deny, Delay. |

## Configurable Inputs

James can define:

| Input | Current value | Notes for rebuild |
| --- | --- | --- |
| Decision categories | Source rules, Execution setup, Authority, Open questions, Operating loop | Keep categories plain. |
| Decision states | red, yellow, green | Current UI maps these to urgency colors. |
| Audit-vector filter | Six vectors plus `All vectors` | Every decision must have a vector. |
| Accept meaning | Go ahead with the recommendation | This records a dashboard action, not a durable source decision. |
| Deny meaning | Reject the recommendation | This records a dashboard action. |
| Delay meaning | Revisit later or backlog | This records a dashboard action and may rebook work. |
| Required card fields | title, category, vector, status, score, action, Linda take, source links | Missing source links should block authoritative display. |

## Current State

Pending Decisions currently shows five active decision cards.

The page currently has a vector filter row:

- `All vectors`
- `Clarity`
- `Duplication`
- `Work order`
- `File placement`
- `Daily use`
- `Memory`

Each card currently shows:

- audit-vector tag
- category
- status
- score
- decision question
- recommended action
- Linda's short take
- source file links
- Accept, Deny, and Delay controls

The card's left border is aligned with its audit-vector color.

## Required Behavior

- This tab must not become a raw file list.
- Every card must state what James should decide.
- Every card must show the audit vector.
- The vector filter must narrow the visible decision cards.
- Source files must be clickable.
- Dashboard actions must be recorded separately from durable source decision records.

## Rebuild Contract

To rebuild Pending Decisions, provide one record per decision with:

- `id`
- `title`
- `category`
- `auditVector`
- `status`
- `score`
- `recommendedAction`
- `shortExplanation`
- `sourceLinks`
- `availableActions`

If James wants different meanings for Accept, Deny, or Delay, update this file and the common action rules before changing the UI.

## Related

- [Linda Dashboard](../dashboard.md)
- [Focus](focus.md)
- [Run Log](run-log.md)
- [Common Dashboard Spec](../../common-spec.md)
- [Decision Index](../../../source-of-truth/decisions/index.md)

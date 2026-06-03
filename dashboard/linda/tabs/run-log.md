---
aliases:
  - Linda Run Log Tab
  - Run Log Tab
---

# Linda Dashboard Run Log

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

Run Log separates existing source decision records from dashboard actions taken in the app.

## Sources

Run Log may read:

| Source | Use |
| --- | --- |
| [Decision Index](../../../source-of-truth/decisions/index.md) | Source decision record list and statuses. |
| [Decision Index](../../../source-of-truth/decisions/index.md) and linked decision records | Individual durable decision details. |
| `dashboard_actions` table | Dashboard action log. |
| `app/decision-log/YYYY-MM-DD/*.md` | Markdown audit trail for dashboard actions. |
| [Common Dashboard Spec](../../common-spec.md) | Shared action and persistence rules. |

## Configurable Inputs

James can define:

| Input | Current value | Notes for rebuild |
| --- | --- | --- |
| Source decision statuses shown | Accepted source records | Should come from decision index, not action log. |
| Dashboard actions shown | Accept, Deny, Delay, other operator actions | Should come from dashboard action storage. |
| Action owner | `James`, default | Stored with dashboard action. |
| Action log destination | Postgres and `app/decision-log/YYYY-MM-DD/` | Keep both until changed explicitly. |
| Empty state | Not yet customized | Should explain no dashboard actions exist yet. |

## Current State

Run Log currently has two sections:

- `Source decision records`
- `Dashboard action log`

Source decision records come from `source-of-truth/decisions/` and the decision index. They are existing Markdown records.

Dashboard action log entries come from Accept, Deny, Delay, and related app actions. These actions write to Postgres and to Markdown under `app/decision-log/YYYY-MM-DD/`.

## Required Behavior

- Do not imply James accepted a new dashboard action just because a source decision record has `Accepted` status.
- Accepted dashboard actions should update the Summary accepted-action count.
- Source decision records and dashboard actions must remain visually and semantically separate.
- Empty dashboard action logs should remain understandable.

## Rebuild Contract

To rebuild Run Log, provide:

- source decision records with id, title, status, date, dependency, and review trigger
- dashboard actions with title, action type, decision, owner, created time, related entity, description, delay date, and log path
- clear section labels separating source records from dashboard actions

Never merge source decision status and dashboard action status into one list.

## Related

- [Linda Dashboard](../dashboard.md)
- [Pending Decisions](pending-decisions.md)
- [Summary](summary.md)
- [Common Dashboard Spec](../../common-spec.md)
- [Decision Index](../../../source-of-truth/decisions/index.md)

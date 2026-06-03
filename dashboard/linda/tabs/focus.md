---
aliases:
  - Linda Focus Tab
  - Focus Tab
---

# Linda Dashboard Focus

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

Focus packages the next focused work day as actionable work blocks.

## Sources

Focus may read:

| Source                                        | Use                                                       |
| --------------------------------------------- | --------------------------------------------------------- |
| [Calendar](calendar.md) | Work-window, theme, blocked-day, and scheduling guidance. |
| [Look Here First](../../../lookherefirst.md) | Ordered source files and to-dos for work generation. |
| [Linda Repo Health Memory](../../../source-of-truth/memory/linda-repo-health.md) | Linda must-look findings and current challenge. |
| [Decision Index](../../../source-of-truth/decisions/index.md) | Decision-record source links. |
| `dashboard_actions` table                     | Accepted, denied, delayed, and backlog action state.      |
| [Common Dashboard Spec](../../common-spec.md) | Shared action rules and delay options. |

## Configurable Inputs

James can define:

| Input | Current value | Notes for rebuild |
| --- | --- | --- |
| Focus date rule | Tomorrow from local current date | Never hard-code stale dates. |
| Work blocks | Generated from Linda memory and [Look Here First](../../../lookherefirst.md) | Each block needs title, time, vector, outcome, expected decision, and sources. |
| Bottom line | Fix live/future boundary, then daily operating loop | Keep this as a short operator summary. |
| Action meanings | Accept, Deny, Delay | Accept gives go-ahead; Deny rejects; Delay reschedules or backlogs. |
| Delay choices | `1`, `3`, `5`, `7` days, `Backlog` | Must update action state. |
| Blocked focus days | Not configured yet | James should be able to block a day or part of a day later. |

## Current State

Focus currently calculates tomorrow from the local current date. In the current environment, `2026-06-01` produces a focus date of `2026-06-02`.

The page currently shows:

- a one-day calendar for tomorrow
- clickable calendar events
- an event-detail panel
- a highlighted bottom-line card
- work cards for tomorrow's blocks
- audit-vector tags on work cards
- source file links
- Accept, Deny, and Delay controls

Action controls sit in a distinct shaded action area. Delay uses preset choices:

- `1 day`
- `3 days`
- `5 days`
- `7 days`
- `Backlog`

## Required Behavior

- Focus must not hard-code a stale date.
- Every work block must say what James is doing and why it matters.
- Every work block must show its audit vector.
- Every work block must link to its source files.
- Accept, Deny, and Delay must be aligned consistently.
- Delay must record the chosen delay and rebook work or move it to backlog.

## Rebuild Contract

To rebuild Focus, provide:

- local date and timezone
- focus date rule
- work-window rule
- list of focus work blocks
- audit vector for every block
- source links for every block
- action state for accepted, denied, delayed, or backlog items
- bottom-line message

If a work block lacks an expected decision or source link, keep it out of Focus until the source is clear.

## Related

- [Linda Dashboard](../dashboard.md)
- [Calendar](calendar.md)
- [Pending Decisions](pending-decisions.md)
- [Common Dashboard Spec](../../common-spec.md)

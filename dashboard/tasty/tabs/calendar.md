---
aliases:
  - Linda Calendar Tab
  - Calendar Tab
---
# Dashboard Calendar

## Status

Active

## Dashboard Navigation

- [Linda Dashboard](about.md)
- [Home](home.md)
- [Summary](summary.md)
- [Focus](focus.md)
- [Calendar](calendar.md)
- [Pending Decisions](pending-decisions.md)
- [Run Log](run-log.md)
- [Hygiene](hygiene.md)
- [Common Dashboard Spec](common-spec.md)

## Purpose

Calendar shows the one-day and seven-day work plan so James can see what follows and inspect scheduled work.

## Sources

Calendar may read:

| Source                                        | Use                                                                    |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| [Common Dashboard Spec](common-spec.md) | Shared calendar rules, clickable event requirements, and action rules. |
| [Focus](focus.md) | Focus-day relationship and action behavior. |
| [Look Here First](../../../lookherefirst.md) | Ordered source sequence and repo work candidates. |
| [Linda Repo Health Memory](../../../source-of-truth/memory/linda-repo-health.md) | Linda findings and challenge for work generation. |
| `dashboard_actions` table                     | Delay, backlog, accepted, and denied action state.                     |
| local timezone                                | Local current date and displayed time.                                 |

## Configurable Inputs

James can define:

| Input | Current value | Notes for rebuild |
| --- | --- | --- |
| Working hours | `08:30` to `16:00`, provisional | Should support after-hours-only or before-hours-only rules later. |
| Days shown | Seven days from local current date | Leftmost day must be today. |
| One-day view date | Tomorrow's focus date | Should align with Focus. |
| Blocked days | Not configured yet | James should be able to mark a full day unavailable. |
| Blocked time windows | Not configured yet | James should be able to mark a partial day unavailable. |
| Daily theme | Not configured yet | Example themes: learning, building, testing, deploying. |
| Break rules | Informal gaps between blocks | Future config should define minimum break length. |
| Event fields | Title, start, end, vector, outcome, decision, sources, action state | Required for rendering and event detail. |

## Current State

Calendar currently supports:

- `One day`
- `Seven days`

The default view is the seven-day view. It starts with the local current date as the leftmost day.

Calendar events are color-coded by audit vector and are clickable. Clicking an event shows:

- what James is doing during the event
- why it matters
- source files
- expected decision or action
- audit vector
- Accept, Deny, and Delay controls

The lower list shows scheduled work blocks with source links and vector tags.

## Required Behavior

- Seven-day view must start on the local current date.
- One-day view should show tomorrow's focus day.
- Events must be clickable.
- Event detail must explain the work, not just repeat the title.
- Events should use audit-vector color, not arbitrary status colors.
- Future configuration should support work windows such as only booking time after 5 p.m.

## Rebuild Contract

To rebuild Calendar, provide:

- local current date and timezone
- working hours
- blocked days and blocked windows, if any
- daily themes, if any
- list of events with start/end times
- audit vector for every event
- source links for every event
- event-detail text describing what James is doing
- action state for accepted, denied, delayed, or backlog items

If James has not defined working hours, use the provisional window and mark it as configurable.

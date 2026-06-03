---
aliases:
  - Linda Home Tab
  - Home Tab
---

# Linda Dashboard Home

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

Home is the app-level project dashboard entry view. It helps James choose which project dashboard to open without reading chat.

## Sources

Home may read:

| Source | Use |
| --- | --- |
| [Common Dashboard Spec](../../common-spec.md) | Shared entry-view rules, card layout, and filter behavior. |
| [Linda Dashboard](../dashboard.md) | Linda project name, description, and live/mock project boundary. |
| [Linda Repo Health Memory](../../../source-of-truth/memory/linda-repo-health.md) | Current Linda score. |
| active Markdown inventory outside `app/` | Scope count. |
| `dashboard_actions` table | Accepted dashboard action count. |

## Configurable Inputs

James can define:

| Input | Current value | Notes for rebuild |
| --- | --- | --- |
| Project card list | Linda live, Launch Console mock, Backlog Control mock | Each card needs name, description, state, detail, tags, and whether it is live. |
| Filter tags | `All`, `Most active`, `Most neglected`, `Planned` | Filters should be plain words. |
| Cards per row | Three on wide screens, two on medium screens | Cards must stay equal height. |
| Live project action buttons | `Summary`, `Tomorrow's Focus` | Mock cards should not show live navigation. |
| Project status labels | `Most active`, `Planned`, `Most neglected` | Labels should not imply live data when cards are mock. |

## Current State

Home currently shows three equal-height project cards in a responsive grid:

- `Linda Repo Health`
- `Launch Console`
- `Backlog Control`

The page currently has a filter row:

- `All`
- `Most active`
- `Most neglected`
- `Planned`

The Linda card is the only live card. It shows the repo-health score, Markdown scope, accepted dashboard action count, and routes to `Summary` or `Tomorrow's Focus`.

The `Launch Console` and `Backlog Control` cards are mock cards. They exist to validate the multi-project layout and tag filtering pattern.

## Required Behavior

- Cards must be equal height.
- The layout should support three cards per row on wide screens.
- Filters should hide cards that do not match the selected tag.
- Labels should use normal operator-facing words.
- Mock cards must not pretend to be live dashboards.

## Rebuild Contract

To rebuild Home, provide a project-card list with:

- `id`
- `name`
- `description`
- `tags`
- `state`
- `detail`
- `isLive`
- `primaryAction`
- `secondaryAction`

If a project is mock or planned, mark it explicitly and disable live actions.

## Related

- [Dashboard Specification](../../README.md)
- [Linda Dashboard](../dashboard.md)
- [Summary](summary.md)
- [Focus](focus.md)
- [Common Dashboard Spec](../../common-spec.md)

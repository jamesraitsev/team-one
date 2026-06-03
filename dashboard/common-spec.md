---
aliases:
  - Common Dashboard Spec
  - Dashboard Specification
  - Dashboard Principles
  - Dashboard Tabs
  - Dashboard Card Contract
  - Dashboard Data Contract
  - Dashboard Actions
  - Dashboard Metric Definitions
  - Dashboard MVP
  - Dashboard Open Questions
  - Approval Queues
  - approval-queues
  - dashboard-principles
  - dashboard-tabs
  - dashboard-card-contract
  - dashboard-data-contract
  - dashboard-actions
  - dashboard-metric-definitions
  - dashboard-mvp
  - dashboard-open-questions
---

# Common Dashboard Spec

## Purpose

This file defines repo-level dashboard rules that apply to every dashboard surface rendered by the local app.

When James gives dashboard feedback, update this file when the feedback applies broadly across dashboards. When the feedback applies only to one dashboard, update that dashboard's specific spec instead.

## Source Of Truth For Dashboard Work

Use these files before changing dashboard UI:

1. [Common Dashboard Spec](common-spec.md) for shared dashboard behavior.
2. The project dashboard spec, such as [Linda Dashboard](linda/dashboard.md).
3. The current implementation in `app/src/App.jsx` and `app/server/`.

If the implementation and spec disagree, update the spec first or alongside the implementation.

## System Shape

This repository is an agentic working system with a visual representation in the local dashboard.

The Markdown specs define what the dashboard should show, what sources it may trust, and what information James needs to provide before the dashboard can be rebuilt or extended. The app implementation should be treated as a render layer over those specs and source records.

## Project Spec Folder Rule

Each project dashboard must have one folder under `dashboard/`.

The folder must contain:

- one project dashboard index file
- one Markdown file per standard tab

For Linda, the folder is:

```text
dashboard/linda/
  dashboard.md
  tabs/
    home.md
    summary.md
    focus.md
    calendar.md
    pending-decisions.md
    run-log.md
    hygiene.md
```

The project dashboard index must link to every tab file with clickable Markdown links.

Each tab file must include:

- `Status`: `Active` or `Inactive`
- `Purpose`: what job the tab does for James
- `Sources`: records, APIs, specs, or generated data the tab may read
- `Configurable Inputs`: what James can define or override for that tab
- `Current State`: what the dashboard shows right now
- `Required Behavior`: non-negotiable behavior for that tab
- `Rebuild Contract`: the minimum information needed to rebuild the tab from Markdown specs and source records

Do not leave dashboard behavior implied in chat. If James gives feedback that changes a tab, update the relevant tab file.

Inactive tabs may remain defined in Markdown, but the app should not show them unless James turns them on.

## Dashboard Entry View

The app should have a dashboard entry view before any specific dashboard.

The entry view should:

- show dashboard cards without redundant labels such as `Available dashboards`
- show cards at equal height in a consistent grid
- support two or three cards per row depending on available width
- provide a simple filter above the cards
- explain what each dashboard is for
- show the current high-level state for each dashboard
- show plain tags such as `Most active`, `Most neglected`, `Planned`, or `All`
- route the operator into the dashboard without requiring chat text

For the current app, the entry view includes `Linda Repo Health` and may include mock dashboard cards to show the multi-dashboard pattern.

## Standard Dashboard Tabs

Every project dashboard in this app uses the same tab pattern. Project-specific specs fill the content for the tabs, but they must not rename the tabs or invent a different tab model.

| Tab | Shared guidance |
| --- | --- |
| `Home` | App-level project dashboard entry view with equal-size project cards and a project filter. |
| `Summary` | Current state, score, trend, audit-vector chart, and one to three plain-language themes. |
| `Focus` | The next focused work day. Every card must say what the operator is doing, why it matters, source links, and the available actions. |
| `Calendar` | One-day and seven-day planning view. Events must be clickable and must reveal the work description, source files, expected decision, vector, and actions. |
| `Pending Decisions` | Decisions waiting for the operator, filterable by audit vector. Cards must show the vector, category, status, action, source links, and action buttons. |
| `Run Log` | Existing source decision records and dashboard actions shown separately. |
| `Hygiene` | Link/source integrity with an overall score, visual composition, grouped problem areas, and a call to action for every group. |

## Audit Vector Rules

Each project dashboard must use exactly six audit vectors.

The common dashboard contract requires:

- exactly six vectors
- plain-English vector names
- a stable vector id for filtering and persisted actions
- one color per vector for tags, calendar events, and pending-decision alignment
- vector definitions in the dashboard spec before the UI uses them
- no project-specific override of the tab model

The current app uses these six shared vectors:

| ID | Label | Meaning | Color |
| --- | --- | --- | --- |
| `clarity` | Clarity | Whether the operator can tell what is live, what is future, and what decision is needed. | `#7f1d1d` |
| `duplication` | Duplication | Whether two notes, queues, or rules are trying to define the same thing. | `#b45309` |
| `work-order` | Work order | Whether the next step is sequenced before lower-priority or dependent work. | `#2563eb` |
| `file-placement` | File placement | Whether information is stored in the right layer and source path. | `#5f7d6d` |
| `daily-use` | Daily use | Whether the dashboard turns the repo into a practical operating loop. | `#475569` |
| `memory` | Memory | Whether durable memory, source decisions, and run history are separated and useful. | `#7c3aed` |

Use these labels in the UI instead of jargon such as `source posture`.

## Layout Rules

Dashboard screens should be work surfaces, not marketing pages.

Rules:

- use dense but readable panels
- avoid decorative content that does not help the operator decide
- keep every visible metric tied to an operator action or interpretation
- avoid raw lists when a grouped summary would explain the work better
- keep file references clickable when a file is mentioned
- use browser-local time for displayed generated timestamps

## Navigation Rules

Tabs should use operator jobs, not internal implementation terms.

For the current dashboard, the navigation pattern is:

- `Home`: app-level dashboard entry point
- dashboard-specific summary tab
- dashboard-specific focus/work tab
- dashboard-specific calendar tab when time sequencing matters
- dashboard-specific file/source tab when source records matter
- dashboard-specific decision/action log when operator actions are recorded
- dashboard-specific hygiene/quality tab when source integrity matters

## Action Rules

Every actionable recommendation must expose clear operator choices.

The standard actions are:

- `Accept`: James gives the work a go-ahead. It may be done by James or delegated later.
- `Deny`: James rejects the recommendation.
- `Delay`: James postpones the recommendation.

Delay must ask how long to delay.

Delay choices should be simple preset choices, not a raw browser prompt:

- `1 day`
- `3 days`
- `5 days`
- `7 days`
- `Backlog`

Actions must be recorded. In this app, dashboard actions write to:

- Postgres `dashboard_actions`
- Markdown under `app/decision-log/YYYY-MM-DD/`

Source decision records and dashboard actions are not the same thing. The UI must label them separately.

Action buttons should sit in a visually distinct action area so the operator can find `Accept`, `Deny`, and `Delay` quickly without crowding the card body.

## Persistence Rules

Dashboard state must be deterministic and queryable later.

The app stores:

- dashboard specs in `dashboard_specs`
- operator actions in `dashboard_actions`
- daily dashboard snapshots in `dashboard_snapshots`

Specs are synced from [Common Dashboard Spec](common-spec.md), the active project dashboard index, and the active project's tab spec files into Postgres. The dashboard payload stores the spec hash used for the current run.

The dashboard should be able to answer what changed since the prior stored snapshot. Snapshot comparison must come from the database, not from chat memory.

Prototype or test actions must not count as real operator decisions.

## File Reference Rules

When the dashboard mentions a repo Markdown file, the file reference should be clickable.

Clicking a file should let the operator inspect that Markdown content without leaving the dashboard.

Raw file paths should not dominate the UI. Prefer:

- short file label
- clear action
- clickable file link
- optional source path in smaller supporting text

## Calendar Rules

Calendar views should support:

- a focused one-day view when the operator needs tomorrow's work
- a seven-day view when sequencing beyond tomorrow matters

Calendar work blocks should be grouped when adjacent work targets the same source area.

Seven-day calendar should default to the local current date as the leftmost day and show the next seven days. Do not hard-code a stale date into the calendar.

The app should support a work-window configuration later, because James may only want this dashboard to book time before or after a certain hour.

Calendar events must be clickable. Clicking an event should show:

- what the operator is doing during the event
- why it matters
- source file or files
- expected decision or action
- audit vector
- action buttons when the event is actionable

Every work block should state:

- what to do
- why it matters
- source file or files
- expected operator decision or action

## Testing Expectations

Before calling dashboard work complete:

- run `npm run build`
- verify `/api/dashboard` returns the expected dashboard payload
- verify relevant file-preview endpoints work when file links were changed
- keep the local dashboard runnable at `http://localhost:5555`

Visual browser verification is preferred when the browser tool can access the local URL.

## Related

- [Dashboard Specification](README.md)
- [Linda Dashboard](linda/dashboard.md)
- [Dashboard Model](../operating-model/dashboard-model.md)

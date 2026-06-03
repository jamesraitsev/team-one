---
aliases:
  - Linda Dashboard
  - Linda Repo Health Dashboard
  - Project Health Dashboard Spec
---

# Project Health Dashboard Spec

## Purpose

The Linda Repo Health dashboard packages Linda's real assessment of this repository into work James can process.

This project is an agent orchestration scaffold. It is meant to become a portable system that can be dropped into another project to monitor repo health, decisions, agents, source-of-truth hygiene, and next operator actions.

Linda is the current project dashboard for the `my-team` agentic working system. The dashboard is the visual representation of that system.

## Authority

Linda is the authority for this dashboard.

The dashboard must read real repo Markdown and exclude `app/` from Linda's source scan. The app may still store its own spec and implementation files under `app/`.

Primary source inputs:

- [Linda Repo Health Memory](../../source-of-truth/memory/linda-repo-health.md)
- [Look Here First](../../lookherefirst.md)
- [Decision Index](../../source-of-truth/decisions/index.md)
- active Markdown files outside `app/`, `.git/`, generated artifacts, and archived review-later material

## Sources

Linda may read:

| Source | Use |
| --- | --- |
| [Common Dashboard Spec](../common-spec.md) | Shared dashboard tab model, vector rules, action rules, and rebuild expectations. |
| [Home](tabs/home.md), [Summary](tabs/summary.md), [Focus](tabs/focus.md), [Calendar](tabs/calendar.md), [Pending Decisions](tabs/pending-decisions.md), [Run Log](tabs/run-log.md), and [Hygiene](tabs/hygiene.md) | Linda-specific tab definitions and current state. |
| [Linda Repo Health Memory](../../source-of-truth/memory/linda-repo-health.md) | Linda score, prior score, must-look findings, challenge, and carried-forward memory. |
| [Look Here First](../../lookherefirst.md) | Ordered repo fill sequence and to-do list. |
| [Decision Index](../../source-of-truth/decisions/index.md) | Durable source decision records. |
| [Decision Index](../../source-of-truth/decisions/index.md) and linked decision records | Individual durable decision records. |
| active Markdown files outside `app/` | File inventory, source links, and wiki-link hygiene. |
| `dashboard_actions` table | Accepted, denied, delayed, and other dashboard actions. |
| `dashboard_snapshots` table | Prior dashboard snapshots for trend comparison. |

## Configurable Inputs

James should be able to define these without changing React code:

| Input | Current value | Where it should live |
| --- | --- | --- |
| Project name | `Linda` / `Linda Repo Health` | This project spec index. |
| Project description | Agent orchestration scaffold and visual dashboard for `my-team`. | This project spec index and [Home](tabs/home.md). |
| Six audit vectors | `Clarity`, `Duplication`, `Work order`, `File placement`, `Daily use`, `Memory` | [Common Dashboard Spec](../common-spec.md) and this index. |
| Work window | `08:30` to `16:00`, provisional | [Calendar](tabs/calendar.md). |
| Delay options | `1 day`, `3 days`, `5 days`, `7 days`, `Backlog` | [Common Dashboard Spec](../common-spec.md). |
| Project cards | Linda live, Launch Console mock, Backlog Control mock | [Home](tabs/home.md). |
| Calendar themes | Current sequence is repo cleanup, operating loop, hygiene, memory. | [Calendar](tabs/calendar.md) and [Focus](tabs/focus.md). |
| Pending decision meanings | Accept, Deny, Delay as dashboard actions, not durable source decisions. | [Pending Decisions](tabs/pending-decisions.md) and [Run Log](tabs/run-log.md). |

## Standard Tabs

This dashboard uses the standard app tab model from [Common Dashboard Spec](../common-spec.md).

Dashboard navigation:

- [Dashboard Home](../README.md)
- [Common Dashboard Spec](../common-spec.md)
- [Home](tabs/home.md)
- [Summary](tabs/summary.md)
- [Focus](tabs/focus.md)
- [Calendar](tabs/calendar.md)
- [Pending Decisions](tabs/pending-decisions.md)
- [Run Log](tabs/run-log.md)
- [Hygiene](tabs/hygiene.md)

Tab specs:

- [Home](tabs/home.md)
- [Summary](tabs/summary.md)
- [Focus](tabs/focus.md)
- [Calendar](tabs/calendar.md)
- [Pending Decisions](tabs/pending-decisions.md)
- [Run Log](tabs/run-log.md)
- [Hygiene](tabs/hygiene.md)

## Linda Audit Vectors

Linda uses the shared six-vector dashboard contract from [Common Dashboard Spec](../common-spec.md).

For this project, the six vectors mean:

| Vector | Linda meaning |
| --- | --- |
| `Clarity` | Can James tell what is live, future, or undecided? |
| `Duplication` | Are multiple notes defining the same rule or backlog truth? |
| `Work order` | Is the next work sequenced before dependent or lower-priority cleanup? |
| `File placement` | Is the content in the right operating layer and source path? |
| `Daily use` | Does the dashboard give James practical work for the next operating pass? |
| `Memory` | Are durable memory, accepted decisions, and dashboard actions separated? |

## Current Implementation Notes

Current app routes:

- `GET /api/dashboard`: returns the Linda dashboard payload
- `GET /api/dashboard/history`: returns stored dashboard snapshot history
- `GET /api/file?path=<repo-md-path>`: returns Markdown file content for preview
- `POST /api/actions`: records Accept, Deny, Delay, and other dashboard actions

Current app persistence:

- `dashboard_specs`: synced app dashboard specs and hashes
- `dashboard_actions`: real operator actions from the dashboard
- `dashboard_snapshots`: one deterministic dashboard snapshot per local date

Tomorrow's assessment should compare against the prior stored database snapshot.

Current local URL:

- `http://localhost:5555`

Current backend URL:

- `http://localhost:5556`

## Update Rule

When James gives feedback about this dashboard, update this project spec or the relevant tab file.

When asked to update shared dashboard behavior, update [Common Dashboard Spec](../common-spec.md).

## Rebuild Contract

A future agent should be able to rebuild the Linda dashboard by reading:

1. [Common Dashboard Spec](../common-spec.md)
2. this project index
3. every linked tab file
4. the source records listed above

If a tab file does not state sources, configurable inputs, current state, and required behavior, treat the spec as incomplete before making UI changes.

## Related

- [Dashboard Specification](../README.md)
- [Common Dashboard Spec](../common-spec.md)
- [Home](tabs/home.md)
- [Summary](tabs/summary.md)
- [Focus](tabs/focus.md)
- [Calendar](tabs/calendar.md)
- [Pending Decisions](tabs/pending-decisions.md)
- [Run Log](tabs/run-log.md)
- [Hygiene](tabs/hygiene.md)

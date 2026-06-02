---
aliases:
  - Dashboard Specification
  - Decision Centered Dashboard Specification
---

# Dashboard Specification

This folder defines Step 6 of the agent operating model: a decision-centered dashboard specification.

Use it with:

- [[operating-model/README|Operating Model Overview]]
- [[operating-model/dashboard-model|Dashboard Model]]
- [[operating-model/decision-gates|Decision Gates]]
- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]
- [[sop-registry|SOP Registry]]

## Purpose

Define the dashboard as a written specification before any UI or application code is built.

The dashboard exists to help a human operator answer:

- what needs a decision now
- what is blocked and why
- what should happen next
- what evidence, cost, and confidence support that recommendation

The dashboard must not become:

- an activity feed
- a duplicate GitHub issue tracker
- a chat transcript viewer
- a place that invents state not present in the source records

## Why It Is Decision Centered

The operating model already defines lifecycle stages, gate approvals, runtime agent status, SOP execution, and durable decision records. This specification narrows the dashboard's job:

- surface decisions before raw work activity
- surface blockers before noise
- surface recommended actions before passive reporting
- link every card back to the governing source record

Lifecycle columns from [[operating-model/dashboard-model|Dashboard Model]] may still exist, but the default operator experience should prioritize decision queues and exceptions over stage browsing.

## Operator Outcomes

The dashboard should help the human operator:

- approve or reject gate movements
- resolve blocked work quickly
- confirm whether top backlog priorities still make sense
- review recent and conflicting decisions
- inspect metrics with lifecycle context
- understand AI, tool, infrastructure, and acquisition cost without guessing
- compare per-project spend, outcomes, CAC, and the current `keep going` or `pause` recommendation

## Data Discipline

This specification inherits the current repo rules:

- durable knowledge lives under `source-of-truth/`
- reusable SOP definitions live in `sop-library/`
- active runtime agent status lives in `source-of-truth/agent-status/`
- durable decisions live in `source-of-truth/decisions/`
- GitHub Issues are the executable backlog unless that rule changes in [[source-of-truth/github|GitHub]]

If these sources conflict, the dashboard must show the conflict and block write actions until a human resolves it.

## Dashboard As An Autonomy Prerequisite

The dashboard is not only a reporting surface. It is also the prerequisite for wider agent autonomy.

Before permissions are increased, the dashboard should already be able to show:

- what the agent did
- what changed
- why it changed
- which source records justify the change
- what approvals are still required
- what blockers and new risks remain

If the dashboard cannot show what happened, autonomy should not be expanded.

## Obsidian-Friendly Rules

These notes are intentionally written for an Obsidian-style knowledge base:

- prefer wiki links for related notes
- keep file names stable
- use `Related` sections for backlinks
- reference canonical note titles instead of loose prose labels

## Files In This Folder

| File | Purpose |
| --- | --- |
| `README.md` | Overview of the dashboard specification and how it fits the operating model. |
| [[approval-queues]] | Approval queue workflow, status vocabulary, audit trail rules, and history behavior. |
| [[dashboard-principles]] | Decision-centered design rules that every tab, card, and action must follow. |
| [[dashboard-tabs]] | Definition of the first dashboard tabs and their behavior. |
| [[dashboard-card-contract]] | Reusable card types and field-level rules. |
| [[dashboard-metric-definitions]] | Canonical definitions for dashboard metrics, spend categories, CAC, and project ROI recommendation fields. |
| [[dashboard-data-contract]] | Source-by-source read contract, trust rules, and stale/conflict rules. |
| [[dashboard-actions]] | Allowed human actions, audit requirements, and follow-on agent behavior. |
| [[dashboard-mvp]] | First buildable MVP scope and done criteria. |
| [[dashboard-open-questions]] | Human decisions that should be resolved before build. |

## Related

- [[operating-model/dashboard-model|Dashboard Model]]
- [[operating-model/decision-gates|Decision Gates]]
- [[operating-model/agent-status-schema/agent-status-dashboard-contract|Agent Status Dashboard Contract]]
- [[source-of-truth/decisions/index|Decision Index]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

<!-- Reviewed and Approved on -->

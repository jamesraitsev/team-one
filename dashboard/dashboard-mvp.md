---
aliases:
  - Dashboard MVP
---

# Dashboard MVP

This file defines the first buildable MVP for the dashboard.

The MVP includes only:

1. `Today`
2. `Needs approval`
3. `Blocked agents`

## MVP Goal

Prove that the dashboard can help a human operator restore flow and make decisions without building a full application shell, issue tracker replacement, or analytics suite.

Approval queues are explicitly in MVP because the current dashboard direction depends on human approvals happening in the dashboard instead of only in terminal output.

## Required Data

The MVP requires:

- `source-of-truth/agent-status/index.md`
- active status files in `source-of-truth/agent-status/`
- `source-of-truth/decisions/index.md`
- decision records in `source-of-truth/decisions/`
- `sop-library/sop-registry.md`
- `dashboard/approval-queues.md`
- source-of-truth and GitHub contract notes: [[source-of-truth/files-and-folders|Files And Folders]] and [[source-of-truth/github|GitHub]]

GitHub issue data is conditionally required:

- required for live executable-backlog links when GitHub is actually configured
- optional for the first MVP render if the repo still has placeholder-only GitHub configuration

## Required Cards

The MVP must support:

- decision cards
- approval cards
- blocker cards
- recommendation cards
- risk cards

The MVP approval card must support:

- exact decision needed
- agent recommendation
- consequence of approve, reject, and defer or schedule
- risk, confidence, and cost impact
- linked source records
- approval status and history link

Metric cards, cost cards, project ROI cards, and backlog cards are out of scope for the first build unless they are needed as supporting detail inside `Today`.

The MVP may still include lightweight GitHub readability surfaces inside `Today` when they are rendered as summary slices rather than full dedicated tabs.

Allowed `Today` slices in MVP:

- top 5 priorities
- what changed overnight
- regression risk
- blocked work summary

Deferred until after MVP as full dedicated surfaces:

- full duplicate-issues queue
- full stale-issues queue
- full Top Backlog tab behavior
- full conflict-card backlog workflow

## Required Actions

The MVP must support at least these actions, even if they are read-only first:

- approve
- reject
- revise
- schedule
- promote to issue
- archive

## Out Of Scope Items

Do not include these in MVP:

- full `Top backlog`
- full `Recent decisions`
- full `Metrics`
- full `Cost`
- full per-project ROI tracking
- GitHub issue editing as a replacement for GitHub
- freeform activity feeds
- direct external integrations that do not already exist
- fake metrics or cost datasets

The metric-definition note in [[dashboard-metric-definitions]] is still in scope before or during MVP planning so later metrics and ROI work do not ship with ambiguous formulas.

The MVP may remain read-only first for approval actions, but it must define the exact audit destination and resulting state for each action.

## Done Criteria

The MVP is done when:

1. `Today` shows the highest-priority decisions, recommendations, new blockers, and new approval waits.
2. `Needs approval` shows only active approval cards that truly require a human approval to continue.
3. `Blocked agents` shows blockers with blocker reason, blocked-since, impacted work, unblock action, and links to any blocking approval card.
4. Every surfaced item links back to the governing source record.
5. Every surfaced item shows one recommended next action.
6. The dashboard clearly distinguishes `Actual`, `Estimated`, and `Unknown` cost where cost is shown.
7. Source conflicts disable write actions and surface a conflict explanation.
8. GitHub placeholder config does not cause the dashboard to pretend live sync exists.
9. Active approval items use only `Pending`, `Needs Revision`, or `Scheduled`.
10. Approved, rejected, promoted, and archived approval items move to history.

## Manual Fallback If Data Is Missing

If any required feed is missing:

- fall back to the human-readable index note first when available
- show the precise missing source in the error state
- provide the next manual review path, such as opening [[source-of-truth/agent-status/index|Agent Status Index]] or [[source-of-truth/decisions/index|Decision Index]]
- do not synthesize missing items from chat, commit history, or memory alone

## Recommended MVP Build Order

1. Read and validate `source-of-truth/agent-status/` and `source-of-truth/decisions/`.
2. Build the shared approval queue contract and source-link model.
3. Build `Needs approval` first because approval queues are now core MVP behavior.
4. Build `Blocked agents` second with explicit approval-blocked linking.
5. Build `Today` last as a composed prioritization view over approvals, blockers, and decisions.
6. Add read-only actions before any write-enabled workflow.

## Related

- [[approval-queues]]
- [[dashboard-tabs]]
- [[dashboard-card-contract]]
- [[dashboard-data-contract]]
- [[dashboard-metric-definitions]]
- [[dashboard-open-questions]]

<!-- Reviewed and Approved on -->

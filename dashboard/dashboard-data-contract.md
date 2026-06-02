---
aliases:
  - Dashboard Data Contract
---

# Dashboard Data Contract

This file defines what the dashboard reads, what is optional, what is required, what is trusted, and what conflicts must block actions.

Use it with [[dashboard-card-contract]], [[dashboard-metric-definitions]], [[dashboard-tabs]], [[source-of-truth/files-and-folders|Files And Folders]], and [[source-of-truth/github|GitHub]].

## Trust Precedence

Use this precedence when multiple sources speak about the same fact:

1. Accepted decision records in `source-of-truth/decisions/`
2. Approved durable source-of-truth records under `source-of-truth/`
3. Active agent status files in `source-of-truth/agent-status/` for runtime state
4. GitHub issue metadata for executable backlog state when configured
5. Derived dashboard summaries

The dashboard must never let a derived summary override a higher-trust source.

## GitHub Issues

| Field | Definition |
| --- | --- |
| What is read | Issue title, issue number, stage, status, owner, labels, linked durable records, approval state, blocker hints, issue timestamps. |
| What is optional | Comments, assignees beyond the owner, milestones, project fields, estimates, labels outside the operating model. |
| What is required | A linked issue for active work unless the GitHub contract is explicitly changed. |
| What is trusted | Executable backlog identity and issue-local execution metadata when `github_repo` and local auth are truly configured. |
| What conflicts must block dashboard actions | Issue stage or status conflicts with linked durable records, missing required issue on active work, placeholder-only GitHub config treated as live. |
| What stale data means | Last issue sync is older than the operator's accepted threshold or the issue changed after the last confirmed durable update. |

## Agent Status Files

| Field | Definition |
| --- | --- |
| What is read | Required fields from [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]], especially status, blocked, needs approval, current task, next action, confidence, cost, linked issue, last updated. |
| What is optional | Idea, decision, journal, project, artifact, and SOP links when not applicable. |
| What is required | Every field marked required in [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]] for non-archived records. |
| What is trusted | Current runtime execution state for active agents. |
| What conflicts must block dashboard actions | Conflicting active status files for one execution context, missing required fields, blocker or approval claims that contradict linked decisions or issues. |
| What stale data means | `Last updated` is older than the expected cadence for active work, blocked work, or approval waiting work. |

## Decision Records

| Field | Definition |
| --- | --- |
| What is read | Decision ID, title, status, date, related links, rationale, dependencies, invalidation trigger, supersession state. |
| What is optional | Related project, related journal, related issue when one does not exist yet. |
| What is required | Stable ID, title, status, date, related section, and current index entry. |
| What is trusted | Durable operating, policy, architecture, and governance decisions. |
| What conflicts must block dashboard actions | Two Accepted decisions conflict, decision index disagrees with the decision file, work depends on an undocumented durable decision. |
| What stale data means | The decision file changed without a matching update to [[source-of-truth/decisions/index|Decision Index]] or linked work still references superseded state. |

## SOP Registry

| Field | Definition |
| --- | --- |
| What is read | SOP name, versioned file path, lifecycle stage, used-by agents, required inputs, outputs, approval boundaries, related decisions. |
| What is optional | Category-specific details not needed for dashboard decisions. |
| What is required | One current registry row for every active SOP used by surfaced work. |
| What is trusted | Approved SOP identity, version, and approval boundary. |
| What conflicts must block dashboard actions | An active SOP is missing from the registry, a surfaced SOP version does not match the registry, or an SOP conflicts with an Accepted decision. |
| What stale data means | SOP file changed without the registry being updated in the same change. |

## Journals

| Field | Definition |
| --- | --- |
| What is read | Overnight changes, risk notes, execution reversals, launch observations, operator notes, links to related work. |
| What is optional | Narrative detail that does not change a decision or blocker. |
| What is required | Journal link only when the dashboard claims a journal-backed overnight change or escalation. |
| What is trusted | Human-readable context and chronology when linked to source records. |
| What conflicts must block dashboard actions | Journal claims contradict an Accepted decision or linked status file and no authoritative resolution exists. |
| What stale data means | A journal is being cited as the latest state but newer linked status or decision records exist. |

## Ideas

| Field | Definition |
| --- | --- |
| What is read | Idea title, summary, problem, expected outcome, owner, risk, related decisions. |
| What is optional | Source and extended narrative when not needed for ranking or traceability. |
| What is required | Idea link when backlog or decision records claim to derive from an idea. |
| What is trusted | Problem framing and early expected outcome, not live execution state. |
| What conflicts must block dashboard actions | Duplicate or contradictory idea identity for the same backlog item, broken backlinks from decisions or projects. |
| What stale data means | Execution is using the idea as current truth after a later decision or project note superseded it. |

## Metrics Files Or APIs

| Field | Definition |
| --- | --- |
| What is read | Project scope, metric names, values, baselines, targets, timestamps, reporting windows, dimensions, stage or initiative scope, and links back to [[dashboard-metric-definitions]] when required. |
| What is optional | Deep raw telemetry not needed for operator decisions. |
| What is required | Source provenance, timestamp, lifecycle context, project scope, and a definition reference for every surfaced metric used in per-project ROI summaries. |
| What is trusted | Measured values from the configured source, provided the source and timestamp are present. |
| What conflicts must block dashboard actions | Metric source is missing, target context is missing, the dashboard cannot tell whether a value is actual, derived, or stale, or a project ROI field has no governing definition. |
| What stale data means | Timestamp is outside the accepted refresh cadence for that metric or the last successful import is older than the metric's reporting period. |

## Cost Files Or APIs

| Field | Definition |
| --- | --- |
| What is read | Project scope, cost category, amount, period, reporting window, actual or estimated state, attribution notes, unit economics, timestamp, and source provenance. |
| What is optional | Account-level detail not needed for decision support. |
| What is required | Provenance, timestamp, project scope, and actual or estimated or unknown classification for every surfaced cost claim. |
| What is trusted | Reported spend from the configured source and cost fields from agent status when no better source exists. |
| What conflicts must block dashboard actions | Dashboard shows precise spend with no source, cost period conflicts across sources, project attribution differs across sources, or the dashboard presents an estimate as actual. |
| What stale data means | Billing or usage timestamp is outside the accepted reporting cadence or the estimate has not been refreshed after a material scope change. |

## Dashboard Metric Definitions

| Field | Definition |
| --- | --- |
| What is read | Metric definitions, formula notes, counting rules, reporting-window guidance, and recommendation thresholds from [[dashboard-metric-definitions]]. |
| What is optional | Project-specific notes that do not change interpretation of surfaced fields. |
| What is required | A definition row or equivalent entry for every surfaced per-project ROI field that is not self-evident from its source alone. |
| What is trusted | The current spec-level interpretation of dashboard metrics and ROI recommendation fields until a higher-trust Accepted decision changes them. |
| What conflicts must block dashboard actions | A surfaced ROI field has no definition, two definition notes disagree, or an Accepted decision overrides a metric meaning that the dashboard has not adopted. |
| What stale data means | A field is still rendered using a superseded metric or ROI definition. |

## Conflict Handling Rule

When any blocking conflict exists:

1. surface the conflict in the dashboard
2. disable write actions for affected items
3. link every conflicting source record
4. recommend the exact human resolution step

## Conflict Breakdown Rule

When the dashboard detects a conflict, it must decompose the conflict before escalation whenever possible.

Use this order:

1. `Identity conflict`
   Use when two records may describe the same issue, initiative, or deliverable.
2. `Ranking conflict`
   Use when records agree on identity but disagree on priority order, urgency, or investment timing.
3. `Dependency conflict`
   Use when rank or readiness differs because dependency order or unblock assumptions differ.
4. `Evidence conflict`
   Use when the disagreement comes from different or stale evidence rather than policy.
5. `Decision conflict`
   Use when an Accepted or Proposed durable decision is the governing disagreement.

The dashboard must prefer the smallest accurate conflict type instead of a generic catch-all.

If more than one type applies:

1. surface separate conflict cards when the operator can resolve them independently
2. show the dependency order between those conflict cards
3. escalate the decision conflict last unless it is the root cause

Agents and dashboard logic must not treat these as equivalent:

- duplicate issue problem
- stale issue problem
- blocked dependency problem
- missing evidence problem
- accepted-decision conflict

## Related

- [[dashboard-principles]]
- [[dashboard-card-contract]]
- [[dashboard-metric-definitions]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]

<!-- Reviewed and Approved on -->

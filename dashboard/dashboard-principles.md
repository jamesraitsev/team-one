---
aliases:
  - Dashboard Principles
---

# Dashboard Principles

Use these principles with [[dashboard-tabs]], [[dashboard-metric-definitions]], [[dashboard-card-contract]], [[dashboard-data-contract]], and [[dashboard-actions]].

## 1. Show Decisions Before Activity

The dashboard should rank items by decision pressure, not by how recently an agent typed, committed, or commented.

Required behavior:

- surface approvals, conflicts, reversals, and durable decisions before status chatter
- treat raw activity as supporting evidence, not as the primary view

## 2. Show Blockers Before Noise

A blocked item should outrank unblocked progress updates.

Required behavior:

- group blocked work by severity, blocker age, and operator impact
- suppress non-material updates when blocked work still needs attention

## 3. Show Recommended Next Actions

Every surfaced item must carry one clear next action.

Required behavior:

- recommendations use concrete verbs such as `approve`, `reject`, `review`, `resolve`, `create`, `link`, or `escalate`
- recommendations point to the fastest action that restores flow
- vague actions such as `follow up later` are not allowed

## 4. Show Source Links For Every Claim

Every claim on a card must be traceable to a source record.

Required behavior:

- every card shows one or more direct links to the governing note, issue, or status file
- cards should prefer wiki links for repo-native records
- claims without a source link must render as `Unknown` or be omitted

## 5. Show Confidence And Cost Where Available

The dashboard should show uncertainty and spend, not hide them.

Required behavior:

- render confidence using the runtime values in [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]]
- render cost as `actual`, `estimated`, or `unknown`
- render ambiguous ROI fields such as `conversion`, `CAC`, and `keep going or pause` only when they have a definition in [[dashboard-metric-definitions]]
- never invent precise numbers

## 6. Never Duplicate GitHub As A Full Issue Tracker

The dashboard may summarize executable backlog items, but it must not replace GitHub issue management.

Required behavior:

- show only the subset of issue data needed for decisions, blockers, priorities, metrics, and cost
- do not expose the full issue list, comment stream, or issue-editing surface as the main product

## 7. Never Show Agent Activity Without Explaining Why It Matters

Agent output is only useful when tied to a decision, risk, blocker, cost, or recommendation.

Required behavior:

- every activity snippet must answer `why should the operator care`
- if the activity has no decision value, hide it from the default views

## 8. Make GitHub Readable, Not Exhaustive

The dashboard should compress the backlog into the smallest set of views that help the operator decide what to do next.

Required behavior:

- show the top 5 priorities rather than a full issue list
- surface duplicate issues as a cleanup and priority-distortion problem
- surface stale issues as a freshness and ownership problem
- surface blocked work as a flow-restoration problem
- surface regression risk as a ship-safety and quality problem
- surface overnight changes as a daily-triage problem
- summarize issue state only when it changes priority, risk, or approval pressure

## 9. Break Down Conflicts Before Escalating Them

When priorities or source records conflict, the dashboard should force the conflict into smaller decision parts instead of presenting one vague disagreement.

Required behavior:

- separate identity conflicts, priority conflicts, dependency conflicts, evidence conflicts, and decision conflicts
- name the exact records that disagree
- state what is actually blocked by the conflict
- recommend the smallest human decision that restores flow
- prevent agents from escalating a bundled conflict when it can be decomposed into smaller operator actions

## Global Enforcement Rules

| Rule | Required behavior |
| --- | --- |
| Source conflict | Show a conflict state and block write actions until resolved. |
| Missing required source | Show an actionable missing-data state, not fake completeness. |
| Approval ambiguity | Do not show a generic approval item; state the exact approval needed and consequence of each outcome. |
| Blocker ambiguity | Do not show `blocked` without a reason, blocked-since timestamp, impacted work, and unblock path. |
| Vanity metric | Do not show isolated metrics with no lifecycle context or target comparison. |
| Cost ambiguity | Label every cost value as `Actual`, `Estimated`, or `Unknown`. |
| Priority ambiguity | Do not show a high-priority item without a clear ranking rationale, owner signal, and supporting source links. |
| Bundled conflict | Do not show `conflict` as one blob when the disagreement can be split into identity, ranking, dependency, evidence, or decision pieces. |

## Related

- [[operating-model/dashboard-model|Dashboard Model]]
- [[dashboard-metric-definitions]]
- [[operating-model/agent-status-schema/agent-status-dashboard-contract|Agent Status Dashboard Contract]]
- [[operating-model/decision-record-system/decision-record-rules|Decision Record Rules]]

<!-- Reviewed and Approved on -->

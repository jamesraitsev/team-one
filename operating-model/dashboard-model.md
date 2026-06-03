---
aliases:
  - Dashboard Model
  - Lifecycle Dashboard Model
---

# Dashboard Model

## Before You Edit This File

Frame of mind: This file defines the dashboard concept inside the operating model. Keep it about lifecycle visibility, decisions, blockers, approvals, and next actions.

Ask yourself before changing it:
- What should the dashboard make obvious without opening every file?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.
- Which dashboard ideas come from lifecycle and decision gates?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.
- What belongs in the detailed dashboard folder instead?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.

Cross-check [[dashboard/README|Dashboard Specification]], [[lifecycle]], [[decision-gates|Decision Gates]], and [[agent-status-dashboard-contract|Agent Status Dashboard Contract]].


This document defines how the initiative lifecycle should appear in a dashboard so humans and agents can see flow, blockers, approvals, and next actions without opening every ticket.

For the decision-centered Step 6 dashboard specification, use [[dashboard/README|Dashboard Specification]] with this document.

See also: [[lifecycle]], [[decision-gates]], [[agent-responsibilities]], [[operating-model/README|Operating Model Overview]]

## Dashboard Objectives

The dashboard should make five things obvious:

- where each initiative sits in the lifecycle
- what is waiting for human approval
- what is blocked and why
- whether current metrics are healthy
- what action should happen next

## Stage Columns

Use one column per lifecycle stage plus one explicit blocked view:

These columns should mirror the canonical stage labels in [[lifecycle#Label Vocabulary]].

| Column | Purpose |
| --- | --- |
| Idea | New or triaged ideas awaiting validation decision. |
| Validation | Evidence gathering and validation review. |
| Plan | Planning, scoping, and execution design. |
| Build | Active implementation work. |
| Launch | Release readiness, go or no-go, and rollout monitoring. |
| Learn | Post-launch evaluation and recommendation. |
| Scale | Approved initiatives receiving additional investment. |
| Kill | Stopped initiatives retained for learning history. |
| Blocked | Cross-stage queue for anything currently impeded. |

Recommended behavior:

- Each initiative appears in its current stage column.
- If blocked, the card still belongs to its stage but is also surfaced in `Blocked`.
- `Scale` and `Kill` can be terminal views rather than work queues if volume is low.

## Status Cards

Each card should show the minimum data needed for triage:

| Card field | Why it matters |
| --- | --- |
| Initiative name | Fast identification. |
| Current stage | Confirms lifecycle placement. |
| Status | Shows `in-progress`, `awaiting-approval`, `blocked`, or `complete`. |
| Owner | Makes accountability visible. |
| Risk level | Helps sort attention. |
| Age in stage | Detects stall conditions. |
| Required next action | Tells humans and agents what to do next. |
| Approval needed from | Identifies decision bottleneck. |
| Key metric snapshot | Shows whether the initiative is trending well. |
| Blocker reason | Explains why work is not moving. |

Recommended card color semantics:

- neutral for normal flow
- amber for `awaiting-approval`
- red for `blocked` or poor health
- green for `ready to advance`

When an initiative has active agents, the dashboard should also be able to read runtime fields from the agent status system in [[operating-model/agent-status-schema/README|Agent Status Schema]].

## Approval Queues

Approval should not be hidden inside stage columns. Add a dedicated approval queue with these views:

Each queue corresponds to a gate in [[decision-gates]].

| Queue | Contents |
| --- | --- |
| Awaiting triage | Ideas that need a validation decision. |
| Awaiting validation approval | Validated initiatives waiting to enter plan. |
| Awaiting plan approval | Planned initiatives waiting to start build. |
| Awaiting launch approval | Launch-ready initiatives waiting for go or no-go. |
| Awaiting learn decision | Initiatives waiting for scale or kill decision. |

Each approval item should include:

- approver
- due date or SLA
- evidence completeness score
- unresolved risks
- recommended decision from the agent

## Blocked Work

Blocked work should be visible in two forms:

| View | Purpose |
| --- | --- |
| Blocked queue | All blocked initiatives across stages, sorted by blocker age and severity. |
| Blocker breakdown | Grouped counts by blocker type such as dependency, approval, technical, compliance, or staffing. |

Required blocker fields:

- blocker type
- blocker description
- blocker owner
- blocker raised date
- last update date
- unblock action

Escalation rules:

- Alert when a blocker exceeds the stage SLA.
- Alert when a blocker has no owner.
- Alert when the same blocker reappears across multiple initiatives.

## Metrics

The dashboard should expose both flow metrics and outcome metrics.

Stage-specific metrics originate in [[lifecycle]].

### Flow Metrics

| Metric | Why it matters |
| --- | --- |
| Count by stage | Shows work distribution. |
| Average age in stage | Detects slow movement. |
| Approval wait time | Shows decision bottlenecks. |
| Blocked rate | Shows execution friction. |
| Kill rate | Shows selectivity and learning discipline. |
| Rework rate | Shows weak gates or poor planning. |

### Outcome Metrics

| Metric | Why it matters |
| --- | --- |
| Launch success rate | Tracks execution quality. |
| Target metric attainment | Shows whether launched work delivered value. |
| Adoption or usage | Measures market or user response. |
| Quality signals | Defects, incidents, support burden, reliability changes. |
| Scale conversion rate | Percent of launched initiatives that earn more investment. |

## Alerts

The dashboard should generate alerts for conditions that require intervention.

| Alert | Trigger |
| --- | --- |
| Stage aging | Initiative exceeds expected time in stage. |
| Approval overdue | Required approval is waiting beyond SLA. |
| Missing artifact | Required artifact for the current stage is absent. |
| Blocker stale | No blocker update within the expected interval. |
| Metric regression | Launch or learn metrics move below threshold. |
| Scope drift | Build scope changed without approved exception. |
| Owner missing | Initiative or blocker has no accountable owner. |

Recommended severity:

- `info` for watch conditions
- `warning` for aging and incomplete evidence
- `critical` for launch risk, severe regression, or ownerless blocked work

## Agent Runtime Status

The initiative dashboard should be able to consume runtime status from `source-of-truth/agent-status/` in addition to lifecycle and issue state.

Recommended agent-runtime views:

- active agents
- blocked agents
- agents needing approval
- agents with low confidence
- agents missing linked issues
- agents blocked by missing decisions
- agents blocked by source-of-truth conflicts

## Recommended Next Action

Every card should carry exactly one recommended next action generated from stage rules.

The recommendation engine should respect the approval boundaries in [[agent-responsibilities]] and the evidence requirements in [[decision-gates]].

| Situation | Recommended next action |
| --- | --- |
| Idea missing owner | Assign owner before triage. |
| Validation evidence incomplete | Complete missing validation artifact. |
| Plan pending approval | Review plan and approve or request revision. |
| Build blocked by dependency | Escalate dependency owner and update unblock date. |
| Launch awaiting go or no-go | Review readiness packet and decide. |
| Learn complete | Approve scale, request iteration, or kill. |

Recommendation rules:

- Prefer action verbs such as `approve`, `assign`, `review`, `complete`, `escalate`, or `kill`.
- Recommendations should point to the next stage gate or the blocker preventing it.
- If multiple actions are possible, choose the one that restores flow fastest.

## Dashboard Data Contract

Each initiative record should be able to provide:

| Field | Required |
| --- | --- |
| Initiative ID | Yes |
| Title | Yes |
| Current stage | Yes |
| Current status | Yes |
| Owner | Yes |
| Approver | When approval is required |
| Risk level | Yes |
| Metrics snapshot | Yes once in validation or later |
| Required artifacts list | Yes |
| Missing artifacts list | Yes |
| Blocker data | When blocked |
| Recommended next action | Yes |
| Last updated timestamp | Yes |
| Related agent status files | Yes when active agents exist |

This data contract should drive both dashboard rendering and automation.

## Related

- [[operating-model/README|Operating Model Overview]]
- [[dashboard/README|Dashboard Specification]]
- [[dashboard/common-spec|Common Dashboard Spec]]
- [[dashboard/common-spec|Common Dashboard Spec]]
- [[operating-model/agent-status-schema/agent-status-dashboard-contract|Agent Status Dashboard Contract]]

<!-- Reviewed and Approved on -->

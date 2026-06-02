---
aliases:
  - Dashboard Card Contract
---

# Dashboard Card Contract

This file defines reusable dashboard card types. Use it with [[dashboard-tabs]], [[dashboard-metric-definitions]], [[dashboard-data-contract]], [[dashboard-actions]], and [[approval-queues]].

## Common Contract For Every Card

Every card must include these fields. If a value is not known, render `Unknown`, `None`, or `Missing` according to the underlying source contract instead of inventing data.

| Field | Rule |
| --- | --- |
| Title | Required. Use the governing record title or a stable derived label. |
| Summary | Required. One short explanation of the item. |
| Why it matters | Required. Explain operator impact, not raw activity. |
| Recommended action | Required. Exactly one concrete next action. |
| Confidence | Required. Use `High`, `Medium`, `Low`, or `Unknown` when available. |
| Cost impact if known | Required. Label as `Actual`, `Estimated`, or `Unknown`. |
| Related issue | Required field. Link the issue or show `Missing` or `None` per source rules. |
| Related idea | Required field. Link the idea or show `None`. |
| Related decision record | Required field. Link the decision or show `None`. |
| Related SOP | Required field. Link the SOP and version or show `None`. |
| Related journal entry | Required field. Link the journal or show `None`. |
| Last updated | Required. Use the source timestamp, not dashboard render time. |
| Available human actions | Required. Must match [[dashboard-actions]]. |
| Source links | Required. At least one direct link supporting the claim. |

## Rendering Rules

- prefer wiki links for repo-native records
- keep the card scannable and decision-oriented
- never show raw logs or comment streams as the card body
- do not permit card actions when the source records are conflicting

## Decision Card

| Field | Definition |
| --- | --- |
| Purpose | Represent a durable decision that is proposed, accepted, superseded, or conflicting. |
| Primary source | `source-of-truth/decisions/` and [[source-of-truth/decisions/index|Decision Index]] |
| Type-specific fields | Decision status, date, depends on, supersedes, superseded by, invalidation trigger. |
| Available human actions | Approve, reject, revise, defer, archive, request agent follow up. |

## Approval Card

| Field | Definition |
| --- | --- |
| Purpose | Represent work waiting for a human approval before flow can continue. |
| Primary source | [[approval-queues]], agent status files, decision records, launch artifacts, and GitHub issues when configured. |
| Type-specific fields | Title, approval type, exact decision needed, agent recommendation, why this matters, consequence if approved, consequence if rejected, consequence if deferred or scheduled, risk level, confidence, cost impact, linked issue, linked idea, linked decision record, linked SOP, created by agent, created at, due date if any, current status, source links, recommended human action, last updated. |
| Available human actions | Approve, reject, revise, schedule, promote to issue, archive. |

Approval card status must use only:

- `Pending`
- `Approved`
- `Rejected`
- `Needs Revision`
- `Scheduled`
- `Promoted`
- `Archived`

Approval cards should appear in the active queue only when status is:

- `Pending`
- `Needs Revision`
- `Scheduled`

## Blocker Card

| Field | Definition |
| --- | --- |
| Purpose | Represent work that is stopped by a concrete blocker. |
| Primary source | Agent status files in `source-of-truth/agent-status/` |
| Type-specific fields | Blocker type, blocker reason, blocked since, impacted work, unblock action, blocker owner when known. |
| Available human actions | Mark unblocked, mark blocked, approve, reject, revise, defer, request agent follow up. |

## Backlog Card

| Field | Definition |
| --- | --- |
| Purpose | Represent a top-ranked backlog item with ranking rationale. |
| Primary source | GitHub Issues when configured, linked ideas, linked projects, backlog outputs. |
| Type-specific fields | Rank, impact, urgency, dependency order, risk reduction, learning value, effort estimate when known, owner or owner gap, stale state, duplicate state, blocker state, regression-risk state, priority rationale. |
| Available human actions | Approve, reject, revise, defer, promote to issue, create decision record, archive. |

Backlog cards used in the `Top 5 priorities` surface must also include:

- why this item is top 5 now
- what would move it up
- what would move it down
- what is waiting behind it

## Conflict Card

| Field | Definition |
| --- | --- |
| Purpose | Represent a decomposed conflict that is blocking ranking, approval, execution, or dashboard trust. |
| Primary source | Conflicting issues, decisions, status files, ideas, projects, or journals. |
| Type-specific fields | Conflict type, records in disagreement, what is distorted, blocked outcome, smallest resolution step, escalation owner when known. |
| Available human actions | Approve, reject, revise, defer, create decision record, request agent follow up, archive. |

Conflict card type must use only these conflict types:

- `Identity conflict`
- `Ranking conflict`
- `Dependency conflict`
- `Evidence conflict`
- `Decision conflict`

## Metric Card

| Field | Definition |
| --- | --- |
| Purpose | Represent one lifecycle-aware metric with target, trend, and decision context. |
| Primary source | Metrics files or APIs, launch and learn artifacts, linked projects. |
| Type-specific fields | Project scope, reporting window, metric name, value, target or baseline, trend, lifecycle stage, threshold state, definition reference. |
| Available human actions | Revise, defer, create decision record, request agent follow up, archive. |

## Cost Card

| Field | Definition |
| --- | --- |
| Purpose | Represent cost or efficiency data with provenance and uncertainty. |
| Primary source | Cost files or APIs, agent status cost fields, linked project or journal estimates. |
| Type-specific fields | Project scope, reporting window, cost category, period, actual or estimated or unknown, variance, cost per useful output when available, definition reference. |
| Available human actions | Approve, reject, revise, defer, create decision record, request agent follow up, archive. |

## Project ROI Card

| Field | Definition |
| --- | --- |
| Purpose | Represent one project's cost, output, acquisition, and recommendation summary in a single decision-ready view. |
| Primary source | Metrics files or APIs, cost files or APIs, linked project notes, launch or learn artifacts, and the definitions in [[dashboard-metric-definitions]]. |
| Type-specific fields | Project name, reporting window, AI spend, tool spend, ad spend, total attributable spend, tickets closed, downloads when applicable, conversion definition, conversion value, CAC definition, CAC value, current recommendation as `Keep going` or `Pause` or `Unknown`, recommendation rationale, source links, last updated. |
| Available human actions | Approve, reject, revise, defer, create decision record, request agent follow up, archive. |

## Risk Card

| Field | Definition |
| --- | --- |
| Purpose | Represent a risk that changes priority, approval, launch, or investment decisions. |
| Primary source | Agent status files, decision records, journals, launch artifacts, issue metadata when configured. |
| Type-specific fields | Risk level, risk statement, trigger, impact area, mitigation or containment action. |
| Available human actions | Approve, reject, revise, defer, mark blocked, create decision record, request agent follow up. |

## Recommendation Card

| Field | Definition |
| --- | --- |
| Purpose | Represent the single recommended next action distilled from one or more source records. |
| Primary source | Derived from the governing source record, usually a status file, decision, issue, or metric source. |
| Type-specific fields | Recommendation target, reason, expected outcome, confidence reason when confidence is low or unknown. |
| Available human actions | Approve, reject, revise, defer, request agent follow up. |

## Validation Rules

| Rule | Required behavior |
| --- | --- |
| No source link | Do not render the claim as authoritative. |
| No recommended action | Treat the card as invalid for operator triage. |
| Conflicting sources | Render as conflict state and disable write actions. |
| Missing related issue where required | Show `Missing` and surface the item in a warning queue. |
| Unknown cost plus low confidence | Elevate severity per [[operating-model/agent-status-schema/agent-status-dashboard-contract|Agent Status Dashboard Contract]]. |
| Approval card without exact decision needed | Treat the card as invalid and keep it out of the active approval queue. |
| Approval card without audit destination | Treat the card as incomplete until a valid source-of-truth write path exists. |
| Project ROI card without reporting window or project scope | Treat the card as incomplete and keep it out of ranked ROI summaries. |
| Project ROI card without linked metric definitions | Treat ambiguous fields such as `conversion`, `downloads`, `CAC`, or `keep going or pause` as `Unknown`. |

## Related

- [[dashboard-tabs]]
- [[dashboard-metric-definitions]]
- [[dashboard-data-contract]]
- [[dashboard-actions]]
- [[approval-queues]]
- [[operating-model/agent-status-schema/agent-status-dashboard-contract|Agent Status Dashboard Contract]]

<!-- Reviewed and Approved on -->

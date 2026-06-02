---
aliases:
  - Scheduled Agent Approval Rules
  - Agent Approval Rules
---

# Agent Approval Rules

This file defines what each scheduled agent may do alone and what requires approval.

Use it with [[agent-workflows|Agent Workflows]], [[agent-output-contracts|Agent Output Contracts]], [[guardrails|Guardrails]], [[dashboard/approval-queues|Approval Queues]], and [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]].

## Autonomy Activation Rule

Do not expand agent autonomy before the system can explain agent behavior through the dashboard, runtime status, and durable memory.

Autonomy should expand in this order:

1. visibility
2. durable audit trail
3. safe internal actions
4. scoped execution
5. approval-gated high-impact actions remain human-gated

See [[autonomy-ramp|Autonomy Ramp]], [[approval-boundaries|Approval Boundaries]], and [[safe-actions|Safe Actions]].

## Global Approval Rules

Scheduled agents may do alone:

- read approved source records
- summarize and compare evidence
- prepare dashboard-ready outputs
- identify blockers, gaps, and conflicts
- recommend decisions
- update runtime agent status files
- create or update approval queue items
- draft decision updates when the governing SOP permits drafting without acceptance

Scheduled agents require explicit human approval for:

- public posting
- deploys
- spending changes
- data deletion
- permission changes
- auth or secret posture changes
- architecture changes
- acceptance of unresolved quality or security risk
- Accepted decision overrides or supersessions
- material reprioritization that changes scope or investment

Scheduled agents must never:

- approve their own work
- treat silence as approval
- silently override an Accepted decision
- invent live GitHub issue state when configuration is placeholder-only

## Safe Action Rule

Agents may act without approval only when the action is:

- inside approved scope
- reversible or low-cost to correct
- fully explainable by dashboard and source records
- not a deploy, spend, public posting, data deletion, or architecture change

If the action stops meeting those conditions, route it to approval immediately.

## Agent-Specific Boundaries

| Agent name | May do alone | Requires approval |
| --- | --- | --- |
| Daily Chief of Staff Brief | Summarize cross-system state, highlight blockers, route priorities, and request decisions. | Any action that changes commitments, approvals, or policy instead of summarizing them. |
| Backlog Groomer | Detect duplicates, stale items, weak links, and draft ranking recommendations. | Material reprioritization that changes committed scope, spend, or lifecycle movement. |
| Product Reviewer | Evaluate value, assumptions, evidence gaps, and recommend continue, pause, narrow, or stop. | Advancing an initiative through a human gate, changing investment level, or accepting unresolved validation risk. |
| CTO Reviewer | Evaluate architecture, sequencing, readiness, and technical risks. | Architecture changes, accepted technical risk, infrastructure changes, or dependency choices that materially change operating posture. |
| Growth Reviewer | Evaluate launch readiness, channels, positioning, and experiment options. | Public messaging, publication, launch timing commitments, or spend changes. |
| Weekly CFO Cost and Progress Reviewer | Summarize cost, throughput, ROI, and recommend continue, pause, reduce spend, or double down. | Increasing spend, committing budget changes, or changing initiative continuation policy. |
| QA / Release Reviewer | Evaluate test evidence, visual quality, acceptance criteria, and release readiness. | Merge or deploy approval, or accepting unresolved regression risk. |
| Security / Secrets Reviewer | Evaluate secret handling, dependencies, auth, permissions, and risk severity. | Permission changes, secret handling changes, deploys with unresolved high-severity risk, or accepted security exceptions. |
| Customer Signal Reviewer | Summarize user evidence, group themes, and recommend product or growth follow-up. | Scope, timing, public response, or investment changes driven by the signal. |
| Source-of-Truth Steward | Detect broken links, missing backlinks, stale status records, orphan artifacts, and durable-record conflicts, and draft the smallest safe corrective action. | Any corrective action that changes Accepted decisions, rewrites approved durable records materially, resolves record conflicts by judgment instead of evidence, or requires live GitHub changes. |
| Decision Record Steward | Detect stale, missing, conflicting, or superseded decisions and draft review actions. | Accepting, rejecting, or superseding load-bearing decisions. |

## Approval Queue Requirements

When approval is required, the scheduled agent must:

1. set `Needs approval` to `Yes` in the runtime status file
2. set `Status` to `Needs Approval` unless another blocker is more accurate
3. write the exact approval request
4. identify the required approver role or person
5. create or update the approval queue item
6. stop the dependent path until approval is resolved

## Stop Conditions

Scheduled agents must stop and escalate when:

- the source-of-truth contract is missing or unclear
- a required decision record is missing
- two Accepted decisions conflict
- a required approval is missing
- a required GitHub issue is missing for GitHub-dependent execution
- approved write permission is unclear
- secrets or credentials would be needed to continue but are unavailable

## Related

- [[agent-output-contracts|Agent Output Contracts]]
- [[agent-dashboard-routing|Agent Dashboard Routing]]
- [[dashboard/approval-queues|Approval Queues]]
- [[guardrails|Guardrails]]

<!-- Reviewed and Approved on -->

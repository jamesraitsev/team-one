---
aliases:
  - Lifecycle Definition
  - Initiative Lifecycle
---

# Lifecycle Definition

This document defines the required behavior for each stage in the initiative lifecycle.

See also: [[decision-gates]], [[dashboard-model]], [[agent-responsibilities]], [[operating-model/README|Operating Model Overview]]

## Standard Status Vocabulary

Use these status values across dashboards and tickets. The dashboard presentation is defined in [[dashboard-model]].

- `not-started`
- `in-progress`
- `awaiting-approval`
- `blocked`
- `complete`
- `killed`

## Label Vocabulary

Apply one stage label at a time. These labels should drive dashboard grouping in [[dashboard-model]] and stage movement checks in [[decision-gates]].

- `stage:idea`
- `stage:validation`
- `stage:plan`
- `stage:build`
- `stage:launch`
- `stage:learn`
- `stage:scale`
- `stage:kill`

Optional cross-cutting labels:

- `status:blocked`
- `status:awaiting-approval`
- `risk:low`
- `risk:medium`
- `risk:high`
- `priority:p1`
- `priority:p2`
- `priority:p3`

## Idea

Decision gate: [[decision-gates#Idea -> Validation|Idea -> Validation]]

| Field | Definition |
| --- | --- |
| Purpose | Capture a potential initiative in a consistent format before time is spent validating or building it. |
| Entry criteria | A problem, opportunity, or request exists and someone is willing to own the idea. |
| Exit criteria | The idea is clearly framed, linked to an owner, and accepted for validation or explicitly rejected. |
| Human decision required | Decide whether the idea is worth spending validation effort on. |
| Agent work allowed | Draft the initiative brief, normalize inputs, identify duplicates, estimate likely scope, and suggest validation questions. |
| Required artifacts | Initiative brief with problem statement, target user or customer, expected outcome, owner, source of idea, and initial risk level. |
| Dashboard status | `Idea / awaiting triage`, `Idea / in review`, or `Idea / rejected`. |
| GitHub issue labels | `stage:idea` plus optional `priority:*` and `risk:*`. |
| Metrics to track | Idea intake volume, time to triage, duplicate rate, ideas accepted to validation, ideas rejected. |
| Failure signals | No owner, vague problem statement, no plausible user value, obvious duplicate, or idea depends on unavailable capability. |

## Validation

Decision gate: [[decision-gates#Validation -> Plan|Validation -> Plan]]

| Field | Definition |
| --- | --- |
| Purpose | Test whether the initiative deserves planning by gathering evidence on demand, feasibility, value, and risk. |
| Entry criteria | An idea has been accepted for validation and has a named owner. |
| Exit criteria | Evidence supports one of three outcomes: proceed to plan, return to idea for reframing, or kill. |
| Human decision required | Decide whether the evidence is strong enough to justify planning effort. |
| Agent work allowed | Research comparable solutions, collect internal context, summarize user or market signals, run technical feasibility checks, identify dependencies, and draft a validation summary. |
| Required artifacts | Validation summary, assumptions list, risk list, proposed success metrics, and recommendation. |
| Dashboard status | `Validation / collecting evidence`, `Validation / awaiting decision`, or `Validation / failed`. |
| GitHub issue labels | `stage:validation`, optional `status:awaiting-approval`, optional `risk:*`. |
| Metrics to track | Validation cycle time, evidence completeness, key assumptions validated, dependency count, projected impact, projected effort. |
| Failure signals | Weak user need, no measurable upside, unacceptable compliance or security risk, blocked dependency, or technical feasibility below threshold. |

## Plan

Decision gate: [[decision-gates#Plan -> Build|Plan -> Build]]

| Field | Definition |
| --- | --- |
| Purpose | Turn a validated opportunity into an execution-ready plan with explicit scope, milestones, and constraints. |
| Entry criteria | Validation evidence recommends proceeding and a human approves planning. |
| Exit criteria | A reviewed plan exists with scope, milestones, owners, risks, dependencies, and launch success criteria. |
| Human decision required | Approve the plan baseline, including scope, investment level, and risk posture. |
| Agent work allowed | Break work into milestones, propose issue breakdown, draft timelines, enumerate dependencies, propose metrics instrumentation, and draft ADRs for key design choices. |
| Required artifacts | Execution plan, milestone list, dependency map, risk register, launch readiness criteria, and metric definition sheet. |
| Dashboard status | `Plan / drafting`, `Plan / awaiting approval`, or `Plan / revision required`. |
| GitHub issue labels | `stage:plan`, optional `status:awaiting-approval`, optional `risk:*`. |
| Metrics to track | Planning cycle time, scope volatility, unresolved dependencies, risk count by severity, estimate confidence. |
| Failure signals | Undefined scope, no success metric, unresolved critical dependency, no owner for execution, or plan cost exceeds expected value. |

## Build

Decision gate: [[decision-gates#Build -> Launch|Build -> Launch]]

| Field | Definition |
| --- | --- |
| Purpose | Execute the approved plan and produce a launch-ready deliverable. |
| Entry criteria | The plan is approved and execution work is authorized. |
| Exit criteria | Planned build scope is complete or explicitly descoped, tests and checks pass, and launch readiness evidence is assembled. |
| Human decision required | Approve material scope changes, risk exceptions, and any deviation that affects cost, timeline, or user impact. |
| Agent work allowed | Implement approved work, update tickets, run tests, draft release notes, prepare launch checklists, and surface blockers early. |
| Required artifacts | Delivery notes, linked pull requests, test evidence, updated docs, launch checklist draft, and exception log if scope changed. |
| Dashboard status | `Build / active`, `Build / blocked`, `Build / at risk`, or `Build / ready for launch review`. |
| GitHub issue labels | `stage:build`, optional `status:blocked`, optional `risk:*`. |
| Metrics to track | Lead time, completion against plan, defect rate, blocker age, test pass rate, scope change count. |
| Failure signals | Persistent blockers, repeated test failures, undocumented scope drift, low implementation confidence, or launch criteria not trending to green. |

## Launch

Decision gate: [[decision-gates#Launch -> Learn|Launch -> Learn]]

| Field | Definition |
| --- | --- |
| Purpose | Move the completed work into production or live use with controlled risk and clear accountability. |
| Entry criteria | Build work is complete, readiness evidence exists, and launch checklist is ready for review. |
| Exit criteria | The initiative is live, launch is documented, and immediate post-launch monitoring is active. |
| Human decision required | Approve the go or no-go decision for production release or public rollout. |
| Agent work allowed | Verify checklist completion, prepare comms drafts, monitor rollout metrics, update dashboard state, and record launch outcomes. |
| Required artifacts | Final launch checklist, go or no-go record, release notes, rollback plan, owner on call, and initial launch metric snapshot. |
| Dashboard status | `Launch / awaiting go-no-go`, `Launch / in progress`, `Launch / monitoring`, or `Launch / rolled back`. |
| GitHub issue labels | `stage:launch`, optional `status:awaiting-approval`, optional `risk:*`. |
| Metrics to track | Launch success rate, incidents, rollback rate, early adoption, latency or reliability deltas, support volume. |
| Failure signals | Missing rollback path, unresolved launch blocker, degraded core metrics, incident triggered, or owner unavailable during rollout. |

## Learn

Decision gates: [[decision-gates#Learn -> Scale|Learn -> Scale]] and [[decision-gates#Learn -> Kill|Learn -> Kill]]

| Field | Definition |
| --- | --- |
| Purpose | Evaluate whether the initiative created the intended result and decide whether to scale it, iterate, or kill it. |
| Entry criteria | The initiative is launched and enough observation time has passed to measure meaningful outcomes. |
| Exit criteria | Learning review is complete and a human decides to scale, iterate with a new plan, or kill. |
| Human decision required | Decide whether to continue investing, redirect, or stop. |
| Agent work allowed | Gather metrics, compare actuals to expected outcomes, synthesize lessons, identify anomalies, and draft the recommendation. |
| Required artifacts | Learning review, metric comparison against baseline and target, incident summary, lessons learned, and recommendation memo. |
| Dashboard status | `Learn / collecting results`, `Learn / awaiting decision`, `Learn / recommend scale`, or `Learn / recommend kill`. |
| GitHub issue labels | `stage:learn`, optional `status:awaiting-approval`. |
| Metrics to track | Outcome versus target, adoption, retention, quality, revenue or savings impact, support burden, time to learn. |
| Failure signals | No measurable improvement, negative user impact, rising support cost, poor adoption, or results too ambiguous to justify more investment. |

## Scale

Agent boundary reference: [[agent-responsibilities#Stage Matrix]]

| Field | Definition |
| --- | --- |
| Purpose | Increase investment in an initiative that demonstrated sufficient value and manageable risk. |
| Entry criteria | Learn-stage review recommends scaling and a human approves more investment. |
| Exit criteria | A follow-on plan is created or the initiative is absorbed into standard operations. |
| Human decision required | Approve the amount and form of additional investment. |
| Agent work allowed | Prepare the scale proposal, identify expansion options, forecast operational load, and draft the next plan. |
| Required artifacts | Scale decision record, updated roadmap placement, next-scope proposal, and any new ADRs. |
| Dashboard status | `Scale / approved` or `Scale / planning next phase`. |
| GitHub issue labels | `stage:scale`. |
| Metrics to track | Expansion ROI, operational readiness, capacity needs, additional demand created. |
| Failure signals | Scale cost now exceeds value, operational capacity is not ready, or earlier success does not generalize. |

## Kill

Agent boundary reference: [[agent-responsibilities#Stage Matrix]]

| Field | Definition |
| --- | --- |
| Purpose | Stop an initiative deliberately, capture the learning, and prevent hidden rework on weak ideas. |
| Entry criteria | Validation, planning, build, launch, or learning evidence supports stopping the initiative. |
| Exit criteria | The initiative is closed, the reason is documented, and reusable lessons are preserved. |
| Human decision required | Confirm the kill decision when material effort, customer impact, or strategic significance exists. |
| Agent work allowed | Assemble kill rationale, document sunk work, summarize lessons, archive tickets, and propose recovery actions if needed. |
| Required artifacts | Kill decision record, learning summary, closure note, linked follow-up items if any, and archived artifacts. |
| Dashboard status | `Kill / approved` or `Kill / closed`. |
| GitHub issue labels | `stage:kill`. |
| Metrics to track | Kill rate, time to kill, sunk effort before kill, recurring failure reasons, lessons reused later. |
| Failure signals | Initiative lingers without closure, reasons are not documented, or work quietly continues after the stop decision. |

## Related

- [[operating-model/README|Operating Model Overview]]
- [[decision-gates]]
- [[agent-responsibilities]]
- [[dashboard-model]]
- [[source-of-truth/github|GitHub]]

<!-- Reviewed and Approved on -->

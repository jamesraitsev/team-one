---
aliases:
  - Decision Gates
  - Lifecycle Decision Gates
---

# Decision Gates

## Before You Edit This File

Frame of mind: Decision gates are where work earns permission to move. Think like a reviewer: evidence first, approval second, movement last.

Ask yourself before changing it:
- What evidence is required before the next stage?
  Prompt: State the current stage, the next stage, and the evidence needed before movement.
- Who may approve, and what must block the move?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- When does the gate outcome need a durable decision record instead of a light note?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[lifecycle]], [[agent-responsibilities|Agent Responsibilities]], [[approval-boundaries|Approval Boundaries]], and [[source-of-truth/decisions/index|Decision Index]].


Decision gates control movement between lifecycle stages. A gate should be treated as a checkpoint with evidence, an approver, and a recorded outcome.

See also: [[lifecycle]], [[agent-responsibilities]], [[dashboard-model]], [[operating-model/README|Operating Model Overview]]

## Gate Rules

These rules operationalize the stage definitions in [[lifecycle]] and the approval boundaries in [[agent-responsibilities]].

| Rule | Meaning |
| --- | --- |
| No gate without evidence | Movement requires artifacts, not verbal intent. |
| Approval must be recorded | The decision should be captured in the primary issue, memory, or ADR as appropriate. |
| Blockers are explicit | Missing evidence, unresolved risk, or absent ownership should block progression rather than be implied. |
| Durable decisions are written down | If the gate changes strategy, architecture, policy, or operating assumptions, write it to memory or an ADR. |

## Idea -> Validation

| Field | Definition |
| --- | --- |
| Evidence required | Initiative brief, named owner, clear problem statement, expected outcome, initial risk level, and duplicate check. |
| Who or what can approve movement | Human owner, team lead, or a predefined intake triage role. |
| What should block progression | No owner, duplicate initiative, unclear problem, no plausible value, or idea outside current mandate. |
| What gets written to memory or ADRs | Write to memory only if the idea establishes a new recurring problem space, owner pattern, or intake category. |

## Validation -> Plan

| Field | Definition |
| --- | --- |
| Evidence required | Validation summary, assumptions list, feasibility assessment, risk review, expected impact, and proposed success metrics. |
| Who or what can approve movement | Human decision maker accountable for resource allocation. |
| What should block progression | Weak demand, low feasibility, unacceptable risk, unresolved dependency, or no measurable upside. |
| What gets written to memory or ADRs | Write durable findings to memory. Create an ADR if the initiative depends on a material technical or policy direction. |

## Plan -> Build

| Field | Definition |
| --- | --- |
| Evidence required | Approved execution plan, milestone breakdown, owner assignments, dependency map, risk register, and launch success criteria. |
| Who or what can approve movement | Human delivery owner, product owner, or equivalent accountable approver. |
| What should block progression | Undefined scope, unowned milestones, critical dependency unresolved, no success metric, or cost not accepted. |
| What gets written to memory or ADRs | Create ADRs for approved architecture or process changes. Write plan assumptions and operating constraints to memory. |

## Build -> Launch

| Field | Definition |
| --- | --- |
| Evidence required | Completed scope, test evidence, known issue list, final launch checklist, rollback plan, release notes, and owner coverage. |
| Who or what can approve movement | Human release approver, product owner, or incident-responsible operator. |
| What should block progression | Failed checks, missing rollback path, open critical defects, unresolved security or compliance issue, or no owner available during launch. |
| What gets written to memory or ADRs | Record launch exceptions, release caveats, and permanent operating changes to memory. Add an ADR only if launch readiness required a durable architecture decision. |

## Launch -> Learn

| Field | Definition |
| --- | --- |
| Evidence required | Launch record, monitoring active, metric baseline captured, observation window defined, and immediate incidents logged. |
| Who or what can approve movement | This gate can be automated once the launch record is complete and monitoring is confirmed. Human override remains available. |
| What should block progression | Missing production metrics, incomplete launch record, rollout still unstable, or no defined observation window. |
| What gets written to memory or ADRs | Write launch outcomes, operational surprises, and monitoring lessons to memory. |

## Learn -> Scale

| Field | Definition |
| --- | --- |
| Evidence required | Learning review, actual versus target metrics, support and incident summary, ROI or impact estimate, and scale recommendation. |
| Who or what can approve movement | Human strategic owner or budget owner. |
| What should block progression | Ambiguous results, weak economics, operational capacity not ready, or success not reproducible outside the initial rollout. |
| What gets written to memory or ADRs | Write confirmed lessons and reusable patterns to memory. Create an ADR if scaling changes architecture, operating model, or policy. |

## Learn -> Kill

| Field | Definition |
| --- | --- |
| Evidence required | Learning review or failure review, metric shortfall, cost or risk summary, recommendation to stop, and closure plan. |
| Who or what can approve movement | Human strategic owner. This may be pre-authorized for small experiments below a defined investment threshold. |
| What should block progression | Missing learning summary, unclear shutdown ownership, unresolved customer obligations, or inability to explain why the initiative is stopping. |
| What gets written to memory or ADRs | Write kill reason, lessons learned, and any operating-model/guardrails that should prevent similar waste later. Use an ADR only if the kill changes a durable strategic or technical direction. |

## Decision Record Format

Each gate decision should be captured in a compact, repeatable format:

| Field | Description |
| --- | --- |
| Initiative | Name or issue link |
| From stage | Current stage |
| To stage | Approved next stage or `Kill` |
| Decision | `approved`, `blocked`, `rework-required`, or `killed` |
| Decision date | Date of approval or rejection |
| Approver | Human or approved automation identity |
| Evidence links | Links to required artifacts |
| Key risks | Remaining accepted risks |
| Notes | Short rationale |

This record should be visible in the approval queues described in [[dashboard-model#Approval Queues]].

## When To Use Memory Versus ADRs

| Write to memory when | Write an ADR when |
| --- | --- |
| The information is operational, reusable, and likely to help future agents make better decisions. | The decision changes architecture, policy, governance, platform direction, or another durable constraint. |
| Examples: recurring blocker patterns, validated user needs, launch watchouts, reliable evaluation criteria. | Examples: choosing a system design, approving a rollout model, setting a required approval policy. |

If unsure, prefer memory for facts and ADRs for decisions.

For where these records surface operationally, see [[dashboard-model#Dashboard Data Contract]].

## Related

- [[operating-model/README|Operating Model Overview]]
- [[lifecycle]]
- [[agent-responsibilities]]
- [[dashboard-model]]
- [[common-spec|Common Dashboard Spec]]

<!-- Reviewed and Approved on -->

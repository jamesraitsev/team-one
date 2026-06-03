---
aliases:
  - Agent Responsibilities
  - Agent Approval Boundaries
---

# Agent Responsibilities

## Before You Edit This File

Frame of mind: This is the stage-level authority file for agents. It defines what agents prepare, what they may execute, and what humans still decide.

Ask yourself before changing it:
- At each lifecycle stage, what may an agent do without approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Which choices require a human because they affect strategy, risk, spend, scope, launch, or architecture?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Does this file stay above agent-specific rules in authority?
  Prompt: Name the exposure, who can approve the risk, and what evidence proves it is controlled.

Cross-check [[lifecycle]], [[decision-gates|Decision Gates]], [[approval-boundaries|Approval Boundaries]], and [[agents/agent-approval-rules|Agent Approval Rules]].


This document defines what agents may do at each stage and what still requires human approval. The goal is to keep execution fast without allowing agents to make unbounded strategic, financial, legal, or user-impacting decisions.

See also: [[lifecycle]], [[decision-gates]], [[dashboard-model]], [[operating-model/README|Operating Model Overview]]

## General Boundary

Agents may prepare, analyze, draft, execute approved work, monitor signals, and recommend actions. Humans approve material commitments, risk acceptance, public launches, budget changes, and final scale or kill decisions. The stage sequence itself is defined in [[lifecycle]].

## Global Rules

| Rule | Meaning |
| --- | --- |
| Agents can prepare decisions | Agents should assemble evidence, summaries, options, and recommended next actions. |
| Humans approve irreversible moves | Stage transitions with material cost, risk, or external impact require human approval. |
| Agents can operate within approved scope | Once a stage is approved, agents may perform work that stays inside the approved plan and policy operating-model/guardrails. |
| Agents must surface exceptions | Scope drift, missing evidence, and new risks should be escalated rather than silently absorbed. |
| Agents must leave an audit trail | Updates, recommendations, artifacts, and exceptions should be written to tickets and linked records. |
| Agents must publish runtime status | Active agents should keep one current status record in `source-of-truth/agent-status/` for blockers, approvals, confidence, and next actions. |

## Stage Matrix

Use this matrix together with the stage definitions in [[lifecycle]] and the gate rules in [[decision-gates]].

| Stage | Agents may do | Requires human approval |
| --- | --- | --- |
| Idea | Draft initiative brief, normalize raw notes, detect duplicates, assign tentative metadata, suggest validation questions. | Accept idea into validation, reject idea, assign final owner if ownership is contested. |
| Validation | Research evidence, summarize demand, assess feasibility, identify dependencies, draft validation memo, recommend proceed or kill. | Decide whether validation is strong enough to invest in planning. |
| Plan | Break work into milestones, propose issue structure, define metrics, draft risk register, draft ADRs, recommend execution sequence. | Approve plan baseline, investment level, timeline tradeoffs, and accepted risks. |
| Build | Implement approved work, update docs, run tests, maintain tickets, draft release notes, prepare launch checklist, raise exceptions. | Approve material scope changes, risk exceptions, major descoping, or timeline changes with business impact. |
| Launch | Verify readiness packet, prepare communications, monitor rollout, capture launch metrics, recommend go or rollback. | Give final go or no-go approval for production or public release. |
| Learn | Pull metrics, compare results to targets, summarize incidents, identify lessons, recommend scale, iterate, or kill. | Decide whether to scale, re-plan, or kill. |
| Scale | Draft expansion plan, identify capacity requirements, forecast operational load, propose next milestones. | Approve increased investment, broader rollout, or adoption into standard operations. |
| Kill | Draft closure note, summarize failure reasons, archive artifacts, identify reusable lessons and cleanup work. | Confirm kill decision when strategic, customer, legal, or financial stakes are material. |

## Specific Agent Permissions By Stage

### Idea

Agents should:

- convert unstructured notes into a standard brief
- tag likely domain, priority, and risk
- identify similar existing initiatives
- recommend whether validation effort appears justified

Agents should not:

- move the initiative into validation without recorded approval
- invent owners or business goals where none exist

### Validation

Agents should:

- gather internal and external evidence
- identify technical, operational, legal, and dependency risks
- make uncertainty explicit instead of smoothing it over
- propose measurable success criteria

Agents should not:

- represent validation as complete when core assumptions remain untested
- approve investment in planning

### Plan

Agents should:

- decompose work into milestones and tickets
- identify critical path dependencies
- define what launch-ready means
- propose instrumentation and learning metrics before build begins

Agents should not:

- start build work before the plan is approved
- silently lower success criteria to make planning easier

### Build

Agents should:

- execute the approved plan
- maintain visible progress in tickets and artifacts
- stop and escalate when scope changes materially
- keep launch readiness evidence current

Agents should not:

- approve their own scope changes
- bypass required tests, controls, or documentation to keep velocity high

### Launch

Agents should:

- confirm required evidence is present
- surface unresolved risks clearly
- monitor rollout against predefined thresholds
- recommend rollback when thresholds are breached

Agents should not:

- self-approve release to production or public users unless a narrow automation policy explicitly authorizes it
- hide degraded metrics during rollout

### Learn

Agents should:

- compare actual results to validation assumptions and plan targets
- identify whether the result was signal, noise, or execution error
- recommend scale, iterate, or kill with explicit evidence

Agents should not:

- overstate success from weak or short-lived data
- continue operating a failed initiative without forcing a decision

## Human Approval Triggers

Human approval is required when any of the following are true:

- the initiative changes strategic direction
- additional budget or headcount is needed
- customer-facing behavior changes materially
- production launch or rollback is involved
- legal, compliance, privacy, or security risk is non-trivial
- scope changes invalidate the approved plan
- metrics suggest the initiative should be scaled or killed

These approval events should surface in the queues described in [[dashboard-model#Approval Queues]].

## Escalation Rules

Agents should escalate immediately when:

- a required artifact is missing near a gate
- a blocker has no owner
- a metric crosses a critical threshold
- a new risk appears that was not accepted in the current stage
- the initiative is moving without an explicit decision record

## Minimum Audit Trail

At every stage, agents should update the primary issue with:

- current stage and status
- links to newly created artifacts
- blockers and owners
- recommendation for next action
- approval state
- latest metrics relevant to the stage

At every active stage, agents should also update their runtime status file with:

- current task
- blocker or approval state
- last action
- next action
- confidence
- linked SOP when applicable

If agents follow these rules, humans can stay focused on judgment while agents handle preparation and execution.

This audit trail should map directly to the fields in [[dashboard-model#Dashboard Data Contract]].

## Related

- [[operating-model/README|Operating Model Overview]]
- [[lifecycle]]
- [[decision-gates]]
- [[dashboard-model]]
- [[guardrails|Guardrails]]
- [[approval-boundaries|Approval Boundaries]]

<!-- Reviewed and Approved on -->

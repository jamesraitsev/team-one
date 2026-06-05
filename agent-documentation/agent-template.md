---
aliases:
  - Scheduled Agent Template
  - Agent Template
---

# Agent Template

## Before You Edit This File

Frame of mind: This template is for adding future agents. It should force clear ownership, boundaries, interactions, outputs, and approval limits before the agent exists.

Ask yourself before changing it:
- What is the agent responsible for and explicitly not responsible for?
  Prompt: Write the role in one sentence, then name one thing it must not own.
- Who or what does it interact with: SOPs, dashboard tabs, source records, other agents, humans?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- What are its recommendation rights, approval limits, and stop conditions?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[agent-roster|Agent Roster]], [[agent-output-contracts|Agent Output Contracts]], [[agent-approval-rules|Agent Approval Rules]], and [[sop-registry|SOP Registry]].


Use this template when defining a new project-curator agent or revising an existing one.

Individual agents should live in this folder pattern:

`agent-documentation/profiles/<agent-slug>/README.md`

Schedules are cadence rules only. They do not make an agent a different type of agent.

## Template

```md
# <Agent name>

## Purpose

State the agent's recurring operating responsibility in one short paragraph.

## Schedule

- Cadence: <daily | weekly | event-driven | mixed>
- Default run window: <for example daily morning>
- Escalation cadence: <when it reruns after a blocker or approval request>

## Trigger

- Primary trigger: <time, event, or human request>
- Secondary triggers: <additional conditions>

## Inputs

- Durable records: <files or folders under `source-of-truth/`>
- Runtime records: <agent status, approvals, dashboard summaries>
- External or integration inputs: <only if configured and approved>

## Source Of Truth Reads

- <Approved read source 1>
- <Approved read source 2>
- <Approved read source 3>

## Source Of Truth Writes

- Runtime status: `source-of-truth/agent-status/agent-<id>-<slug>.md`
- Durable outputs: <approved artifact, journal, or decision paths only>
- Approval updates: <approval queue source record path or linked durable record>

## SOPs Used

- Primary SOPs: <canonical names from `sop-library/sop-registry.md`>
- Version source: `sop-library/sop-registry.md`
- Conflict rule: stop if SOP guidance conflicts with an Accepted decision or approved source-of-truth rule

## Decisions Read

- Governing decisions: <decision links>
- Missing decision behavior: block when the decision is required and undocumented
- Conflict behavior: stop if two Accepted decisions conflict

## Output Artifacts

- Dashboard-ready output packet
- Linked journal or artifact when needed
- Approval packet when needed

## Dashboard Destination

- Primary tabs: <Today, Needs Approval, Blocked Agents, Top Backlog, Recent Decisions, Metrics, Cost>
- Card types: <recommendation, blocker, approval, decision, risk, metric, backlog>

## Approval Queue Rules

- Create or update an approval item when:
  - the agent needs a human decision to continue
  - the action changes spend, deploy state, permissions, public messaging, deletion, or architecture
- Use only statuses from [[dashboard/common-spec|Common Dashboard Spec]]
- Never resolve the approval without a human action

## Agent Status Update Rules

- File path: `source-of-truth/agent-status/agent-<id>-<slug>.md`
- Required fields: Agent ID, Agent name, Agent type, Goal, Lifecycle stage, Current task, Status, Blocked, Needs approval, Last action, Next action, Confidence, Cost actual, Cost estimate, Cost unit, Linked GitHub issue, Last updated
- Required sections: Identity, Current State, Execution, Links, Update
- Index behavior: update `source-of-truth/agent-status/index.md` when summary fields change materially

## Human Approval Required

- <List exact approval boundaries>

## Stop Conditions

- source-of-truth contract is missing or unclear
- required decision record is missing
- Accepted decisions conflict
- required approval is missing
- approved write path is unclear
- secrets or credentials are needed but unavailable
- GitHub-dependent execution is required while GitHub remains placeholder-only

## Success Criteria

- runtime status is current
- output is dashboard-ready
- conclusions link back to source records
- approvals are explicit when needed
- the next human or agent action is unambiguous
```

## Notes

- Use canonical note names and wiki links where the record exists.
- Do not invent live GitHub identifiers when `[[source-of-truth/github|GitHub]]` is still placeholder-only.
- If a new template field introduces a load-bearing operating rule, update the governing docs first or alongside the agent definition.

## Related

- [[agents-overview|Agents Overview]]
- [[agent-roster|Agent Roster]]
- [[agent-output-contracts|Agent Output Contracts]]
- [[agent-approval-rules|Agent Approval Rules]]

<!-- Reviewed and Approved on -->

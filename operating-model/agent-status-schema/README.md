---
aliases:
  - Agent Status Schema
  - Agent Status System
---

# Agent Status Schema

## Before You Edit This File

Frame of mind: This is the front door for runtime status. It should explain status as live execution state, not decisions, journals, or project truth.

Ask yourself before changing it:
- What is an agent status file for?
  Prompt: Keep this to current state: what is happening, what is blocked, and the next action.
- How does status connect to dashboard cards and approval queues?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Where does status stop and durable decision or journal writing begin?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[agent-status-file-contract|Agent Status File Contract]], [[source-of-truth/agent-status/index|Agent Status Index]], and [[memory-and-decision-hygiene|Memory And Decision Hygiene]].


This folder defines the standard runtime status model for agents working inside this operating system.

Use it with:

- [[operating-model/README|Operating Model Overview]]
- [[lifecycle]]
- [[decision-gates]]
- [[dashboard-model]]
- [[agent-responsibilities]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]
- [[sop-usage-rules|SOP Usage Rules]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

## What The Agent Status Schema Is

The agent status schema is the shared contract for how agents publish their current execution state.

It standardizes:

- who the agent is
- what lifecycle stage the agent is serving
- what task the agent is doing now
- whether the agent is blocked
- whether the agent needs human approval
- what SOP the agent is using
- what it did last and what it will do next
- how confident it is
- what the current or estimated cost is
- which durable records and issues the work is linked to

The schema documents the rules in `operating-model/agent-status-schema/` and stores live runtime records in `source-of-truth/agent-status/`.

## Why It Exists

Without a shared runtime status format, agents can update issues, journals, artifacts, and decisions without giving humans or dashboards one reliable place to read current execution state.

This schema exists so the system can answer these questions consistently:

- which agents are active right now
- which agents are blocked and why
- which agents need approval
- which agents are operating with low confidence
- which agents are working without required links, SOPs, or decisions
- which human action would restore flow fastest

## How Agents Update It

Agents should create one status file when they start active work on an initiative, issue, or governed operating task.

Agents should then update the same file whenever:

- the current task changes materially
- the lifecycle stage changes
- the status changes
- a blocker appears or clears
- a human approval becomes required or is resolved
- the active SOP changes
- a linked issue, decision, journal, project, or artifact changes materially
- the cost, confidence, or next action changes materially

Agents should not create multiple active status files for the same active execution context.

## How The Dashboard Consumes It

The dashboard should treat `source-of-truth/agent-status/` as the runtime status feed for agents.

It should use the status files to surface:

- active agents
- blocked agents
- agents awaiting human approval
- agents with low confidence
- agents with rising cost or unknown cost
- agents missing linked issues
- agents missing current SOP references when an SOP is in use
- agents blocked by missing decisions
- agents blocked by source-of-truth conflicts
- recommended human actions

The runtime index in [[source-of-truth/agent-status/index|Agent Status Index]] is the human-readable summary. Individual status files are the detailed source records.

## How It Connects To The Rest Of The Repo

| System | Connection |
| --- | --- |
| GitHub Issues | Each active agent should link to its related issue unless the GitHub contract changes. |
| `source-of-truth/ideas/` | Use idea links when the work traces to an idea record. |
| `source-of-truth/decisions/` | Link governing decision records and stop if Accepted decisions conflict. |
| `source-of-truth/journals/` | Link journals that explain progress, blockers, or reversals. |
| `source-of-truth/projects/` | Link the project or initiative record when one exists. |
| `source-of-truth/research/` | Link research notes when they materially inform the active task. |
| `source-of-truth/artifacts/` | Link durable outputs created by the agent. |
| `sop-library/` | Record the active SOP name and version when the agent is executing an SOP-governed workflow. |
| Dashboard | Read runtime fields from status files instead of inferring state from chat or issue comments alone. |

## Scope Boundary

This schema defines agent runtime state. It does not replace:

- initiative lifecycle stages in [[lifecycle]]
- lifecycle gate decisions in [[decision-gates]]
- durable decision records in `source-of-truth/decisions/`
- issue state in the GitHub backlog contract

The agent status values defined here are runtime execution statuses for agents. They are intentionally separate from the initiative status vocabulary used in lifecycle dashboards and tickets.

## Related

- [[agent-status-template]]
- [[agent-status-rules]]
- [[agent-status-dashboard-contract]]
- [[agent-status-file-contract]]
- [[agent-status-index-template]]
- [[operating-model/agent-status-schema/examples|Agent Status Examples]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

<!-- Reviewed and Approved on -->

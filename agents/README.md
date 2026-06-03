---
aliases:
  - Agents Folder
  - Agents Directory
---

# Agents Folder

## Before You Edit This File

Frame of mind: This folder is the portable project-curator layer. It should explain what agents are, where individual profiles live, and why schedules are only cadence rules.

Ask yourself before changing it:
- Can this folder be dropped into another software project with small edits?
  Prompt: Keep project-specific facts out of profiles and put them in source-of-truth records.
- Is every individual agent under `agents/profiles/`?
  Prompt: Do not create loose one-off agent files at the root of `agents/`.
- Is schedule being treated as cadence, not agent identity?
  Prompt: Agents are curators first; a schedule is just one way to invoke them.

Cross-check [[agents/profiles/README|Agent Profiles]], [[agent-roster|Agent Roster]], and [[agent-schedules|Agent Schedules]].

## Purpose

`agents/` defines the project-curator agents that can sit beside a software project and help monitor its health, quality, decisions, backlog, risk, cost, and source-of-truth discipline.

This folder should be portable. A future project should be able to copy this agent system in, adjust project-specific source records, and begin using the same curator profiles.

## Folder Shape

| Path | Purpose |
| --- | --- |
| `agents/profiles/` | Individual agent profiles. Every agent gets a folder and a `README.md`. |
| `agents/agent-roster.md` | Canonical list of agents and their profile links. |
| `agents/agent-schedules.md` | Cadence rules. This does not define a separate agent type. |
| `agents/agent-workflows.md` | Shared orchestration flow for agent runs. |
| `agents/agent-output-contracts.md` | Required output packet structure. |
| `agents/agent-dashboard-routing.md` | Where agent findings route in the dashboard. |
| `agents/agent-approval-rules.md` | What agents may do alone and what requires approval. |
| `agents/memory-and-decision-hygiene.md` | Where agent status, memory, journals, decisions, and artifacts belong. |
| `agents/agent-template.md` | Template for adding another project-curator agent. |

## Rule

Individual agents live in `agents/profiles/<agent-slug>/README.md`.

Do not create special loose files such as `agents/linda.md`. Linda is a normal agent profile, not a structurally special case.

## Related

- [[agents/profiles/README|Agent Profiles]]
- [[agent-roster|Agent Roster]]
- [[agent-template|Agent Template]]
- [[agents-overview|Agents Overview]]

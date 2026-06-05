---
aliases:
  - Agent Documentation
  - Agent Documentation Folder
---

# Agent Documentation

## Before You Edit This File

Frame of mind: This folder is the portable project-curator documentation layer. It should explain what agents are, where documentation profiles live, and why schedules are only cadence rules.

Ask yourself before changing it:
- Can this folder be dropped into another software project with small edits?
  Prompt: Keep project-specific facts out of profiles and put them in source-of-truth records.
- Is every individual agent under `agent-documentation/profiles/`?
  Prompt: Do not create loose one-off agent files at the root of `agent-documentation/`.
- Is schedule being treated as cadence, not agent identity?
  Prompt: Agents are curators first; a schedule is just one way to invoke them.

Cross-check [[agent-documentation/profiles/README|Agent Profiles]], [[agent-roster|Agent Roster]], and [[agent-schedules|Agent Schedules]].

## Purpose

`agent-documentation/` documents the project-curator agents that can sit beside a software project and help monitor its health, quality, decisions, backlog, risk, cost, and source-of-truth discipline.

This folder should be portable. A future project should be able to copy this agent system in, adjust project-specific source records, and begin using the same curator profiles.

Codex runtime agent files belong in `.codex/agents/`.

This folder is for Obsidian-friendly documentation, governance links, rosters, schedules, workflows, output contracts, and approval boundaries.

## Folder Shape

| Path | Purpose |
| --- | --- |
| `.codex/agents/` | Codex runtime custom-agent TOML files. |
| `agent-documentation/profiles/` | Obsidian-friendly agent documentation profiles. Every documented agent gets a folder and a `README.md`. |
| `agent-documentation/agent-roster.md` | Canonical list of agents and their profile links. |
| `agent-documentation/agent-schedules.md` | Cadence rules. This does not define a separate agent type. |
| `agent-documentation/agent-workflows.md` | Shared orchestration flow for agent runs. |
| `agent-documentation/agent-output-contracts.md` | Required output packet structure. |
| `agent-documentation/agent-dashboard-routing.md` | Where agent findings route in the dashboard. |
| `agent-documentation/agent-approval-rules.md` | What agents may do alone and what requires approval. |
| `agent-documentation/memory-and-decision-hygiene.md` | Where agent status, memory, journals, decisions, and artifacts belong. |
| `agent-documentation/agent-template.md` | Template for adding another project-curator agent. |

## Rule

Runtime agents live in `.codex/agents/<agent-name>.toml`.

Agent documentation lives in `agent-documentation/profiles/<agent-slug>/README.md`.

Do not create special loose files such as `agent-documentation/linda.md`. Linda is a normal agent profile, not a structurally special case.

## Related

- [[agent-documentation/profiles/README|Agent Profiles]]
- [[agent-roster|Agent Roster]]
- [[agent-template|Agent Template]]
- [[agents-overview|Agents Overview]]

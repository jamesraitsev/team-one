---
aliases:
  - Memory
  - Source Of Truth Memory
---

# Memory

## Before You Edit This File

Frame of mind: This folder stores durable agent memory that must persist across runs but is not itself a decision record, journal, project, or artifact.

Ask yourself before changing it:
- Is this memory or a decision?
  Prompt: If future work depends on the answer, write it as a decision record, not just a memory note.
- Which agent owns this memory?
  Prompt: Name the accountable agent or role; if unclear, write `Unassigned` rather than guessing.
- What should be carried forward to the next run?
  Prompt: Write what tomorrow needs to know, not a transcript of everything that happened.

Cross-check [[source-of-truth/files-and-folders|Files And Folders]], [[memory-and-decision-hygiene|Memory And Decision Hygiene]], and [[source-of-truth/decisions/index|Decision Index]].

## Purpose

`source-of-truth/memory/` stores durable, agent-specific memory that should persist across runs.

Use it for recurring context such as Linda's repo-health score history, carried-forward findings, and prior run summaries.

## Rules

- Memory may summarize operating facts, scores, findings, and carry-forward context.
- Memory must link to decisions when a finding depends on accepted authority.
- Memory must not replace decision records.
- Memory must not store secrets.
- Memory must not become a chat transcript.

## Active Memory Files

| File | Owner | Purpose |
| --- | --- | --- |
| [[linda-repo-health|Linda Repo Health Memory]] | Linda | Repo-health score history, must-look findings, and carried-forward audit context. |

## Related

- [[source-of-truth/files-and-folders|Files And Folders]]
- [[memory-and-decision-hygiene|Memory And Decision Hygiene]]
- [[source-of-truth/decisions/index|Decision Index]]

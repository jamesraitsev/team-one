---
aliases:
  - Decision Record Examples
  - DR Examples
---

# Examples

## Before You Edit This File

Frame of mind: Examples should teach the pattern without becoming new policy. Keep them realistic and clearly subordinate to the rules.

Ask yourself before changing it:
- Does the example use the current naming and template rules?
  Prompt: Keep examples clearly fake and templates easy to copy without inventing live facts.
- Does it show when a decision is load-bearing?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- Could someone mistake this example for an accepted repo decision?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[decision-record-template|Decision Record Template]], [[decision-record-rules|Decision Record Rules]], and [[source-of-truth/decisions/index|Decision Index]].


These are format examples only. They are not live decisions.

## Example 1: GitHub Issues As The Executable Backlog

```md
# DR-9001: Use GitHub Issues As The Executable Backlog

## Metadata

| Field | Value |
| --- | --- |
| ID | DR-9001 |
| Title | Use GitHub Issues As The Executable Backlog |
| Status | Accepted |
| Date | 2026-06-01 |
| Owner | Human owner |

## Related

| Field | Value |
| --- | --- |
| Related ideas | [[backlog-operating-model|Backlog Operating Model]] |
| Related GitHub issues | #123 |
| Related projects | [[initiative-intake-project|Initiative Intake Project]] |
| Related journals | [[2026-06-01-journal|2026-06-01 Journal]] |
| Related source-of-truth docs | [[github|GitHub]] |

## Context

The team needs one executable backlog that agents and humans can both update without creating duplicate queues.

## Decision

Use GitHub Issues as the executable backlog.

## Why This Decision Was Made

GitHub Issues already matches the repo workflow, supports linking to durable notes, and gives a shared execution surface for humans and agents.
```

## Example 2: Obsidian-Style Links For Idea References

```md
# DR-9002: Use Obsidian-Style Links For Idea References

## Metadata

| Field | Value |
| --- | --- |
| ID | DR-9002 |
| Title | Use Obsidian-Style Links For Idea References |
| Status | Accepted |
| Date | 2026-06-01 |
| Owner | Human owner |

## Related

| Field | Value |
| --- | --- |
| Related ideas | [[knowledge-graph-hygiene|Knowledge Graph Hygiene]] |
| Related GitHub issues | #124 |
| Related projects | [[source-of-truth-cleanup|Source Of Truth Cleanup]] |
| Related journals | [[2026-06-01-journal|2026-06-01 Journal]] |
| Related source-of-truth docs | [[files-and-folders|Files And Folders]] |

## Context

The durable knowledge layer needs links that are readable, resilient inside Obsidian, and easy for agents to generate consistently.

## Decision

Use wiki links such as `[[idea-name|Idea Name]]` for idea references whenever possible.

## Why This Decision Was Made

Wiki links improve backlinking, note discovery, and graph navigation without requiring fragile raw URLs between local notes.
```

## Related

- [[decision-record-template|Decision Record Template]]
- [[decision-record-naming|Decision Record Naming]]

<!-- Reviewed and Approved on -->

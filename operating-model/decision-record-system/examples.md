---
aliases:
  - Decision Record Examples
  - DR Examples
---

# Examples

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

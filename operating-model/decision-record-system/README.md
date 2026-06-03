---
aliases:
  - Decision Record System
  - Decision Records
  - DR System
---

# Decision Record System

## Before You Edit This File

Frame of mind: This is the front door for durable decisions. Keep it clear enough that a non-technical owner knows when a decision record is required.

Ask yourself before changing it:
- What makes a decision load-bearing?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- Where are actual decision records stored?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- How should decisions connect to ideas, projects, journals, issues, and dashboard state?
  Prompt: Answer with the current fallback first: file-only, GitHub-linked, or GitHub-required.

Cross-check [[source-of-truth/decisions/index|Decision Index]], [[decision-record-rules|Decision Record Rules]], and [[source-of-truth/files-and-folders|Files And Folders]].


This folder defines the rules, templates, and workflow for durable decision records.

Use it with:

- [[operating-model/README|Operating Model Overview]]
- [[decision-gates]]
- [[dashboard-model]]
- [[agent-responsibilities]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]
- [[source-of-truth/decisions/index|Decision Index]]

## What Decision Records Are

Decision records are durable Markdown notes for load-bearing decisions.

A load-bearing decision is any decision that other work depends on. If future agents or humans need to know what was decided, why it was decided, what depends on it, or when it should be reviewed, record it in `source-of-truth/decisions/`.

## Why They Exist

Without durable decision records, the repo can accumulate:

- stale assumptions
- conflicting agent memory
- untraceable project changes
- silent overrides of earlier decisions
- dashboard state that no longer matches the governing rules

Decision records keep durable decisions in one approved location so the repo can be read and operated like a connected knowledge base rather than a pile of scattered notes.

## System Split

Use these two locations for different purposes:

| Location | Purpose |
| --- | --- |
| `operating-model/decision-record-system/` | Defines the decision record rules, templates, naming, and workflow. |
| `source-of-truth/decisions/` | Stores the actual durable decision records and the decision index. |

Agents must not scatter durable decisions across random files, issue comments, or ad hoc notes when those decisions should live in `source-of-truth/decisions/`.

## When Agents Must Create A Decision Record

Create a decision record when work depends on a durable choice about:

- lifecycle rules
- source-of-truth rules
- dashboard behavior
- permissions or approval boundaries
- folder contracts
- data models
- integrations
- launch rules
- architecture
- policy
- other operating assumptions that future work will inherit

Create one before proceeding if the work depends on an undocumented decision.

## When Agents Must Update A Decision Record

Update an existing decision record when:

- the status changes
- the rationale changes
- new dependencies appear
- the review trigger changes
- the decision is deprecated, superseded, or rejected
- linked ideas, projects, journals, or issues change materially

Do not silently replace an Accepted decision with a new assumption.

## How Decision Records Connect To The Rest Of The Repo

| System | Required connection |
| --- | --- |
| `source-of-truth/ideas/` | Each decision should link to one or more governing ideas with wiki links such as `[[idea-name|Idea Name]]`. |
| GitHub Issues | Related issues are the executable backlog and should link to the governing decision records. |
| `source-of-truth/journals/` | Journal entries should reference decisions when they explain progress, blockers, or reversals. |
| `source-of-truth/projects/` | Project docs should link to the decisions that constrain scope, design, or launch behavior. |
| Dashboard state | The dashboard should surface decision status, review triggers, conflicts, and work blocked by missing decisions. |

## How Decision Records Prevent Stale Or Contradictory Memory

Decision records reduce drift by enforcing these habits:

- read relevant records before changing durable behavior
- update the existing record instead of replacing context informally
- mark superseded records explicitly
- stop when Accepted records conflict
- keep `source-of-truth/decisions/index.md` current

This makes the durable file system the source of truth instead of chat history or issue comments alone.

## Obsidian-Friendly Conventions

This system is intentionally Obsidian-friendly:

- prefer wiki links over plain-text references
- use readable note titles and aliases
- keep durable notes in stable folders
- include a `Related` section in each decision record
- use backlinks between ideas, decisions, journals, projects, and issue references
- avoid renaming files casually because it breaks external references

## Dashboard Expectations

The dashboard should show:

1. recent decisions
2. proposed decisions awaiting approval
3. accepted load-bearing decisions
4. superseded decisions
5. conflicting decisions
6. decisions with review triggers
7. work items blocked by missing decisions
8. work items affected by a changed decision

## Related

- [[decision-record-template]]
- [[decision-record-rules]]
- [[decision-record-index-template]]
- [[decision-record-naming]]
- [[operating-model/decision-record-system/examples|Decision Record Examples]]
- [[source-of-truth/decisions/index|Decision Index]]

<!-- Reviewed and Approved on -->

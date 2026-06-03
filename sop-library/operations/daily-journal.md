---
aliases:
  - Daily Journal
---

# Daily Journal

## Before You Edit This File

Frame of mind: This SOP defines daily memory. Keep it useful for tomorrow's operator, not a transcript of everything that happened.

Ask yourself before changing it:
- What changed today that must survive chat history?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- Were decisions made, assumptions changed, risks found, or tickets created/closed?
  Prompt: Answer with the current fallback first: file-only, GitHub-linked, or GitHub-required.
- Does any item need a decision record instead of only a journal entry?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[memory-and-decision-hygiene|Memory And Decision Hygiene]], [[source-of-truth/files-and-folders|Files And Folders]], and [[decision-record-rules|Decision Record Rules]].


Version: `v1.0`

## Purpose

Capture the daily operating record for active work so progress, blockers, decisions, and links remain durable.

## When To Use It

Use this SOP at the end of an execution day or a major work block when active initiatives need a durable progress record.

## Inputs Required

- date
- active issues and stages
- related ideas, decisions, and projects
- blockers, approvals, and output artifacts created

## Steps

1. Read the active issues and linked records, then create or update one journal entry in `source-of-truth/journals/` for the date.
2. Record what moved, what blocked, what was approved, and what artifacts were created.
3. Add explicit sections for `Decisions made`, `Assumptions changed`, `Open questions`, `New risks`, `Tickets created`, and `Tickets closed`.
4. Link the journal to related ideas, decisions, projects, and issues using Obsidian links where possible.
5. Add any new follow-up actions or escalation needs to the relevant issue rather than leaving them only in the journal.
6. If the journal reveals a new durable operating decision, stop and create or propose a decision record.

## Agent Actions Allowed

- write the daily journal entry
- summarize progress and blockers
- add backlinks and execution references

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| journal identifies a new material risk or commitment change | accountable human owner review |

## Output Artifacts

- journal entry in `source-of-truth/journals/`
- linked issue updates for actionable items

## Required Journal Sections

Each daily journal entry should include:

1. `Decisions made`
2. `Assumptions changed`
3. `Open questions`
4. `New risks`
5. `Tickets created`
6. `Tickets closed`

Use `None` when a section has no updates.

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[operating-model/decision-record-system/README|Decision Record System]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- one journal entry per date
- links resolve to related ideas, decisions, projects, and issues where they exist
- actionable items are copied to the executable backlog
- the journal does not become the only place where blockers live
- the journal contains the required memory-hygiene sections
- durable decisions are linked or escalated instead of being buried in the journal alone

## Stop Conditions

- the related issue state contradicts the journal summary
- a new load-bearing decision is discovered but not recorded
- the journal would require writing outside approved folders

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Daily Journal` |
| Current step | `collect-updates`, `write-entry`, `link-records`, or `sync-issues` |
| Blocked step | unresolved issue-state conflict |
| Human approval needed | only when a new material risk or commitment change is surfaced |
| Output artifact | journal file path |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `sop:daily-journal`
- stage labels remain issue-specific and should not be changed by the journal alone

## Done Criteria

- daily journal entry exists
- related records are linked
- actionable follow-ups are reflected in issues
- memory-hygiene sections are present and current

<!-- Reviewed and Approved on -->

---
aliases:
  - Decision Record Template
  - DR Template
---

# Decision Record Template

## Before You Edit This File

Frame of mind: This is the copyable decision shape. Keep it complete but not intimidating; it should help a person make a clear record quickly.

Ask yourself before changing it:
- Does the template capture context, decision, rationale, dependencies, consequences, and review trigger?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- Can a future agent tell whether the decision is accepted, superseded, or still proposed?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.
- Are required links obvious?
  Prompt: Name the exact files or records someone should open before trusting this answer.

Cross-check [[decision-record-rules|Decision Record Rules]], [[decision-record-naming|Decision Record Naming]], and [[source-of-truth/files-and-folders|Files And Folders]].


Use this template for durable records in `source-of-truth/decisions/`.

Recommended filename pattern:

`DR-0001-short-slug.md`

```md
---
aliases:
  - "Decision 0001"
  - "DR 0001"
---

# DR-0001: Replace With Decision Title

## Metadata

| Field | Value |
| --- | --- |
| ID | DR-0001 |
| Title | Replace with decision title |
| Status | Proposed |
| Date | YYYY-MM-DD |
| Owner | Replace with owner |

## Related

| Field | Value |
| --- | --- |
| Related ideas | [[idea-name|Idea Name]] |
| Related GitHub issues | #123 |
| Related projects | [[project-name|Project Name]] |
| Related journals | [[2026-06-01-journal|2026-06-01 Journal]] |
| Related source-of-truth docs | [[files-and-folders|Files And Folders]] |

## Context

Describe the problem, constraint, trigger, or ambiguity that requires this decision.

## Decision

State the decision in direct language.

## Why This Decision Was Made

Explain the reasoning, tradeoffs, evidence, and alternatives considered.

## What Depends On This Decision

List the work, systems, workflows, or assumptions that depend on this decision.

## What This Decision Enables

List the actions or capabilities that become valid because of this decision.

## What This Decision Blocks

List what should not proceed, or what is intentionally ruled out, because of this decision.

## What Would Invalidate This Decision

State the future facts, metric changes, policy changes, or architecture changes that would make this decision no longer valid.

## Review Trigger

State the event, date, threshold, or condition that should force a review.

## Consequences

Describe the short-term and long-term consequences of accepting this decision.

## Supersedes

- None

## Superseded By

- None
```

## Required Notes

- Use only these statuses: `Proposed`, `Accepted`, `Deprecated`, `Superseded`, `Rejected`
- Every decision record must include a `Related` section
- Every decision record must link to at least one idea, issue, journal, project, or source-of-truth document
- Prefer wiki links where possible

## Related

- [[decision-record-rules]]
- [[decision-record-naming]]
- [[source-of-truth/decisions/index|Decision Index]]

<!-- Reviewed and Approved on -->

---
aliases:
  - Decision Record Review
---

# Decision Record Review

## Before You Edit This File

Frame of mind: This SOP reviews decision health. It should help find missing, stale, conflicting, or superseded decisions without making the decision itself.

Ask yourself before changing it:
- Which accepted decisions govern the current work?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- Are any decisions stale, contradictory, or missing review triggers?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- Does a human need to accept, reject, or supersede anything?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[operating-model/decision-record-system/README|Decision Record System]], [[source-of-truth/decisions/index|Decision Index]], and [[decision-record-rules|Decision Record Rules]].


Version: `v1.0`

## Purpose

Review a proposed or changed decision record for completeness, consistency, and operating impact before acceptance or supersession.

## When To Use It

Use this SOP when a durable operating, architecture, policy, or governance decision is being proposed, updated, or challenged.

## Inputs Required

- candidate decision record
- linked ideas, issues, projects, or journals
- related Accepted decisions and decision index
- affected operating rules or workflows

## Steps

1. Read the candidate record, the decision index, and related source-of-truth docs, then record `[[decision-record-review|Decision Record Review]] v1.0` in the related issue or note.
2. Confirm the decision is truly load-bearing and not a routine status update.
3. Check the record against the decision template: metadata, related links, rationale, dependencies, consequences, and review trigger.
4. Check for conflict, duplication, or supersession with existing Accepted decisions.
5. Propose edits or a new superseding record when needed, then stop for human acceptance or supersession approval.
6. Update the decision index and linked issue references once the decision outcome is clear.

## Agent Actions Allowed

- draft or refine decision records
- identify conflicts, duplicates, and missing rationale
- update the index after the decision outcome is recorded

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| accepting a proposed decision | accountable human owner approval |
| superseding an Accepted decision | accountable human owner approval |

## Output Artifacts

- updated decision record in `source-of-truth/decisions/`
- updated `source-of-truth/decisions/index.md`
- issue update with decision status

## Links To Source Of Truth

- [[operating-model/decision-record-system/README|Decision Record System]]
- [[decision-record-template|Decision Record Template]]
- [[decision-record-rules|Decision Record Rules]]
- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- record follows naming and template rules
- conflicts with Accepted decisions are explicit
- the decision index matches the file state
- related links are present and readable

## Stop Conditions

- two Accepted decisions conflict
- the decision is load-bearing but lacks an accountable approver
- the index cannot be updated consistently

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Decision Record Review` |
| Current step | `validate-record`, `check-conflicts`, `prepare-outcome`, or `update-index` |
| Blocked step | conflict resolution or missing approver |
| Human approval needed | accept, reject, or supersede |
| Output artifact | decision file or index row |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `sop:decision-record-review`
- `status:awaiting-approval` when decision acceptance is next

## Done Criteria

- decision record is complete and consistent
- conflicts are resolved or escalated
- index and issue links are current

<!-- Reviewed and Approved on -->

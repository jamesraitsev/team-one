---
aliases:
  - Idea Triage
---

# Idea Triage

Version: `v1.0`

## Purpose

Turn raw requests or concepts into a clean idea record and a clear triage recommendation.

## When To Use It

Use this SOP when a new idea, request, or opportunity appears and needs intake discipline before validation effort begins.

## Inputs Required

- raw idea note, request, or issue
- owner candidate or intake source
- duplicate context if available
- current mandate or scope constraints

## Steps

1. Read the incoming request and the current operating rules, then record `[[idea-triage|Idea Triage]] v1.0` in the related issue or intake note.
2. Check for duplicate or overlapping ideas before creating a new durable idea record.
3. Create or update one idea note in `source-of-truth/ideas/` with a clear problem statement, owner candidate, source, expected outcome, and initial risk.
4. Add related links to issues, existing projects, decisions, or journals where they exist.
5. Recommend one of three outcomes: validate, reframe, or reject.
6. Stop and wait for human approval before moving the idea into validation.

## Agent Actions Allowed

- normalize raw intake into a standard idea record
- detect likely duplicates
- suggest a validation path and open questions

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| moving the idea into validation | human intake or product owner approval |
| rejecting an idea with strategic implications | accountable human owner approval |

## Output Artifacts

- idea record in `source-of-truth/ideas/`
- issue update with triage recommendation
- optional brief note linking related records

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[decision-gates]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- exactly one durable idea record is created or updated
- the idea title is readable and not a duplicate
- related links use Obsidian format where possible
- triage outcome is explicit

## Stop Conditions

- no owner candidate exists
- the idea duplicates an existing active idea and needs human resolution
- intake requires a folder or write path outside the approved contract

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Idea Triage` |
| Current step | `check-duplicates`, `write-idea`, `recommend`, or `await-approval` |
| Blocked step | owner assignment or duplicate resolution |
| Human approval needed | validate or reject |
| Output artifact | idea file path |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:idea`
- `sop:idea-triage`
- `status:awaiting-approval` when triage is complete

## Done Criteria

- idea record exists with required fields
- duplicates are addressed
- triage recommendation is recorded
- human validation decision is clearly queued

<!-- Reviewed and Approved on -->

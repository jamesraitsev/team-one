---
aliases:
  - Source Of Truth Check
---

# Source Of Truth Check

## Before You Edit This File

Frame of mind: This SOP protects the integrity of the repo. Think like a librarian: find broken links, missing records, stale state, and conflicting truth.

Ask yourself before changing it:
- What records must be read before declaring the source of truth healthy?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- What is safe to fix automatically versus approval-gated?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- How should conflicts be reported without resolving them by guesswork?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.

Cross-check [[source-of-truth/files-and-folders|Files And Folders]], [[decision-record-review|Decision Record Review]], and [[agent-approval-rules|Agent Approval Rules]].


Version: `v1.0`

## Purpose

Verify that issues, durable records, artifacts, and SOP references are aligned with the documented source-of-truth contract.

## When To Use It

Use this SOP when execution context looks inconsistent, before major reviews, or whenever a repo-wide integrity check is needed.

## Inputs Required

- linked issues and their related records
- relevant idea, decision, journal, and project files
- artifact paths and backlinks
- current SOP references and versions

## Steps

1. Read the relevant issues and durable records, then record `[[source-of-truth-check|Source Of Truth Check]] v1.0` in the review context.
2. Compare issue state to linked files: stage, status, idea links, decisions, projects, artifacts, and SOP references.
3. Check that durable files live only in approved locations and that artifacts have backlinks.
4. Correct safe link or metadata gaps where the authoritative source is obvious.
5. Record mismatches, orphan artifacts, missing links, or conflicting records in a discrepancy report.
6. Stop and escalate any conflict that would require choosing between two competing authoritative records.

## Agent Actions Allowed

- audit link integrity and file placement
- fix safe metadata gaps
- produce a discrepancy report

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| conflict between authoritative records | accountable human owner review |
| change to approved write-path rules | decision-record approval |

## Output Artifacts

- discrepancy report
- updated links or metadata where safe
- issue update describing remaining conflicts

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[dashboard-model]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- every mismatch cites the conflicting records
- no file is treated as authoritative without reading it
- orphan artifacts are explicitly listed
- fixes stay inside approved write paths

## Stop Conditions

- two records conflict and neither clearly wins
- the check reveals an undocumented load-bearing decision
- required folders or files are missing

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Source Of Truth Check` |
| Current step | `compare-records`, `fix-safe-gaps`, `log-conflicts`, or `escalate` |
| Blocked step | unresolved authoritative conflict |
| Human approval needed | record conflict or contract change |
| Output artifact | discrepancy report |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `sop:source-of-truth-check`
- `status:blocked` when conflicts prevent execution

## Done Criteria

- safe inconsistencies are fixed
- remaining conflicts are documented with links
- issue and durable-record alignment is clear

<!-- Reviewed and Approved on -->

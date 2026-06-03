---
aliases:
  - Release Checklist
---

# Release Checklist

## Before You Edit This File

Frame of mind: This SOP defines release readiness. It should prevent shipping without owners, rollback, test evidence, and explicit approval where needed.

Ask yourself before changing it:
- What is shipping, who owns it, and what rollback exists?
  Prompt: Name the accountable person or role; if unclear, write `Unassigned` rather than guessing.
- Are tests, security, visual review, and known issues documented?
  Prompt: Answer with the current fallback first: file-only, GitHub-linked, or GitHub-required.
- Does deploy or public launch require approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[feature-delivery|Feature Delivery]], [[testing|Testing]], [[security-review|Security Review]], and [[approval-boundaries|Approval Boundaries]].


Version: `v1.0`

## Purpose

Assemble the launch-readiness packet needed for a clear go or no-go decision.

## When To Use It

Use this SOP when build work is complete and the issue is preparing to move from `stage:build` to `stage:launch`.

## Inputs Required

- approved build output
- linked issue and owner coverage
- test, visual, and security review results
- rollback path and release notes inputs

## Steps

1. Read the linked issue, evidence, and decisions, then record `[[release-checklist|Release Checklist]] v1.0` in the issue.
2. Confirm required readiness evidence exists: scope complete, test status, known issues, rollback path, and owner coverage.
3. Assemble the launch checklist and link all supporting artifacts in the issue or `source-of-truth/artifacts/`.
4. Mark unresolved risks and state whether they block launch or require explicit approval.
5. Prepare the go or no-go packet with one recommendation and one next action.
6. Stop and wait for human release approval before treating the work as launch-ready.

## Agent Actions Allowed

- assemble and validate readiness evidence
- draft release notes and launch checklist
- recommend go, no-go, or rework

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| final production or public release decision | human release approver |
| accepted launch risk | accountable human owner approval |
| missing rollback or owner coverage exception | human release approver |

## Output Artifacts

- launch checklist
- issue update with readiness status and recommendation
- optional durable readiness packet in `source-of-truth/artifacts/`

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[decision-gates]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- every required readiness artifact is linked
- unresolved risks are explicit
- rollback path and owner coverage are confirmed
- no launch approval is implied by an agent recommendation

## Stop Conditions

- required evidence is missing
- rollback path is unconfirmed
- no human approver is identified

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Release Checklist` |
| Current step | `collect-evidence`, `assemble-checklist`, `prepare-packet`, or `await-approval` |
| Blocked step | missing evidence, rollback path, or owner coverage |
| Human approval needed | go or no-go |
| Output artifact | launch checklist or readiness packet |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:launch`
- `status:awaiting-approval`
- `sop:release-checklist`

## Done Criteria

- launch checklist is complete
- readiness recommendation is recorded
- human go or no-go approval is the only remaining step

<!-- Reviewed and Approved on -->

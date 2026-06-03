---
aliases:
  - Content Approval
---

# Content Approval

## Before You Edit This File

Frame of mind: This SOP governs publication. Treat public posting as approval-gated because it changes reputation, commitments, and sometimes legal risk.

Ask yourself before changing it:
- What exactly will be published, where, and by whom?
  Prompt: Name the accountable person or role; if unclear, write `Unassigned` rather than guessing.
- What claims, screenshots, pricing, or promises need review?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- What record proves approval happened?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[copy-review|Copy Review]], [[launch-planning|Launch Planning]], and [[dashboard/common-spec|Common Dashboard Spec]].


Version: `v1.0`

## Purpose

Control the final approval and publication readiness of launch-related content.

## When To Use It

Use this SOP after copy, assets, or content pieces are drafted and reviewed but before they are published or sent externally.

## Inputs Required

- reviewed content draft
- publication channel and owner
- linked issue and launch timing
- any policy or brand constraints

## Steps

1. Read the linked issue, content draft, and applicable rules, then record `[[content-approval|Content Approval]] v1.0` in the issue.
2. Confirm the content has passed [[copy-review|Copy Review]] or an equivalent review.
3. Verify the publication owner, channel, timing, and rollback or correction path.
4. Prepare the final approval request with one recommendation and one list of unresolved items, if any.
5. Wait for explicit human publication approval before marking the content ready.
6. Record the approval outcome and publication note in the issue.

## Agent Actions Allowed

- assemble the final approval packet
- verify prerequisites and ownership
- record approval results once provided

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| final publication or send | content or launch owner approval |
| policy-sensitive or regulated content | appropriate human compliance owner approval |

## Output Artifacts

- issue update with approval request and outcome
- publication note or durable artifact when later reference is needed

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[decision-gates]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- reviewed content is the exact draft submitted for approval
- publication owner and timing are explicit
- unresolved items are listed before approval
- approval is recorded, not inferred

## Stop Conditions

- reviewed draft is missing
- publication owner is unidentified
- a required compliance approval is missing

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Content Approval` |
| Current step | `verify-prereqs`, `prepare-approval`, `await-approval`, or `record-outcome` |
| Blocked step | missing owner or compliance review |
| Human approval needed | final publication approval |
| Output artifact | approval log or issue update |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:launch`
- `sop:content-approval`
- `status:awaiting-approval`

## Done Criteria

- approval packet is complete
- human approval outcome is recorded
- publication status is visible in the issue

<!-- Reviewed and Approved on -->

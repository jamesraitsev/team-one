---
aliases:
  - Copy Review
---

# Copy Review

## Before You Edit This File

Frame of mind: This SOP reviews messaging before it becomes public. Be direct about claims, audience fit, clarity, and risk.

Ask yourself before changing it:
- Is the copy true, specific, and aligned with the target user?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.
- Does it make unsupported claims or imply capabilities that are not live?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.
- Does public use require approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[content-approval|Content Approval]], [[launch-planning|Launch Planning]], and [[approval-boundaries|Approval Boundaries]].


Version: `v1.0`

## Purpose

Review launch or product copy for clarity, accuracy, and alignment with approved claims before publication.

## When To Use It

Use this SOP for release notes, product announcements, onboarding text, CTAs, support copy, or any user-facing message tied to a launch.

## Inputs Required

- draft copy
- intended audience and channel
- approved product claims and constraints
- linked issue and launch context

## Steps

1. Read the linked issue, launch context, and approved claims, then record `[[copy-review|Copy Review]] v1.0` in the issue.
2. Review the draft for accuracy, clarity, consistency, and overclaim risk.
3. Check that the copy matches the real product state, rollout scope, and available support path.
4. Mark required edits, optional polish edits, and any claims that need owner approval.
5. Update the issue with reviewed status and the exact approval or revision needed.
6. Handoff to [[content-approval|Content Approval]] once the draft is accurate and owner-reviewed.

## Agent Actions Allowed

- review wording for clarity and factual alignment
- propose revisions
- flag unsupported claims or risky ambiguity

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| final public-facing copy approval | content, product, or marketing owner approval |
| any claim that changes positioning or promise | accountable human owner approval |

## Output Artifacts

- reviewed copy note in the issue
- optional durable copy review artifact when it needs later reference
- explicit approval request for final publication

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[agent-responsibilities]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- copy does not promise unavailable behavior
- edits distinguish required vs optional
- channel and audience are explicit
- final approval is not implied by agent edits

## Stop Conditions

- no approved claims source exists
- the draft conflicts with product reality
- final owner approval is required and missing

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Copy Review` |
| Current step | `read-claims`, `review-copy`, `mark-edits`, or `await-approval` |
| Blocked step | unsupported claim or missing owner |
| Human approval needed | final public copy approval |
| Output artifact | reviewed draft or issue note |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:launch`
- `sop:copy-review`
- `status:awaiting-approval` when owner review is next

## Done Criteria

- copy has been reviewed for factual accuracy and clarity
- risky claims are flagged
- final approval is clearly handed to the human owner

<!-- Reviewed and Approved on -->

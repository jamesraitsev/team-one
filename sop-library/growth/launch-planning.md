---
aliases:
  - Launch Planning
---

# Launch Planning

## Before You Edit This File

Frame of mind: This SOP defines launch readiness. Keep the focus on audience, channel, proof, risk, timing, and go/no-go decision quality.

Ask yourself before changing it:
- Who is the launch for, and what action should they take?
  Prompt: Name the accountable person or role; if unclear, write `Unassigned` rather than guessing.
- What evidence says the product, messaging, and support path are ready?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- What public, spend, or timing decisions require approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[content-approval|Content Approval]], [[copy-review|Copy Review]], and [[common-spec|Common Dashboard Spec]].


Version: `v1.0`

## Purpose

Prepare the operational and communication plan for a launch so release work is coordinated and reviewable.

## When To Use It

Use this SOP when a build is on track for launch and launch timing, audience, channels, or supporting comms need planning.

## Inputs Required

- approved launch scope
- target audience and rollout shape
- launch timing constraints
- linked issue, release owner, and known risks

## Steps

1. Read the linked issue, release context, and decisions, then record `[[launch-planning|Launch Planning]] v1.0` in the issue.
2. Define the launch objective, target audience, rollout sequence, owners, and communication needs.
3. Identify dependencies between product readiness, messaging, support coverage, and monitoring.
4. Draft the launch plan and link the supporting release artifacts.
5. Flag any public commitment, timing dependency, or messaging risk that requires human sign-off.
6. Handoff to [[copy-review|Copy Review]], [[content-approval|Content Approval]], or [[release-checklist|Release Checklist]] as needed.

## Agent Actions Allowed

- draft the launch plan and coordination checklist
- identify readiness dependencies and sequencing
- recommend a rollout approach

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| public launch timing commitment | accountable launch owner approval |
| public claim or positioning choice | product or marketing owner approval |

## Output Artifacts

- launch plan note or issue section
- linked communication checklist
- issue update with dependencies and next actions

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[decision-gates]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- rollout owners are named
- communication steps match actual launch scope
- dependencies and blockers are explicit
- public commitments are not implied without approval

## Stop Conditions

- launch scope is not approved
- release owner or support coverage is missing
- public messaging would exceed approved claims

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Launch Planning` |
| Current step | `define-launch`, `map-dependencies`, `draft-plan`, or `handoff` |
| Blocked step | missing launch owner, timing, or dependency |
| Human approval needed | public timing or messaging commitment |
| Output artifact | launch plan or issue update |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:launch`
- `sop:launch-planning`
- `status:blocked` when launch dependencies are unresolved

## Done Criteria

- launch plan exists
- owners, dependencies, and next actions are visible
- required follow-on approvals are queued

<!-- Reviewed and Approved on -->

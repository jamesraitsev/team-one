---
aliases:
  - Backlog Grooming
---

# Backlog Grooming

## Before You Edit This File

Frame of mind: This SOP keeps the backlog usable. It should remove ambiguity before debating priority.

Ask yourself before changing it:
- Are items duplicated, stale, ownerless, or missing links?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- What ranking recommendation is evidence-based versus opinion-only?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- Does reprioritization require human approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[source-of-truth/github|GitHub]], [[agent-approval-rules|Agent Approval Rules]], and [[agents/agent-roster|Agent Roster]].


Version: `v1.0`

## Purpose

Keep the executable backlog aligned to the operating model, current priorities, and stage rules.

## When To Use It

Use this SOP during planning, milestone reshaping, or recurring backlog review when issue structure or sequencing needs cleanup.

## Inputs Required

- current issue list and stage labels
- linked ideas, projects, and decisions
- priority context and constraints
- active blockers and dependencies

## Steps

1. Read the current issue set, linked records, and stage rules, then record `[[backlog-grooming|Backlog Grooming]] v1.0` in the primary issue or review note.
2. Confirm each active issue has one current stage, one owner, and the required related links.
3. Identify stale, duplicate, oversized, or incorrectly staged issues.
4. Propose the minimum backlog changes needed: split, merge, relabel, reorder, or close.
5. Apply non-controversial cleanup inside approved scope and escalate any reprioritization with material scope or investment impact.
6. Update the affected issues with their next action and any missing artifact requests.

## Agent Actions Allowed

- clean labels, links, and issue structure
- propose sequencing and dependency fixes
- close obvious duplicates when a human-approved duplicate policy exists

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| reprioritization with material business impact | product or delivery owner approval |
| scope changes that alter the approved plan | accountable human owner approval |

## Output Artifacts

- updated issues and labels
- backlog review note if durable evidence is useful
- explicit dependency or sequencing recommendations

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[dashboard-model]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- each issue has one stage label
- related links are present where required
- issue changes do not silently change approved scope
- blocked issues include blocker owner and next action

## Stop Conditions

- issue state conflicts with durable records
- priority changes require human judgment and no approver is identified
- backlog cleanup would imply a new operating rule

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Backlog Grooming` |
| Current step | `audit-issues`, `propose-cleanup`, `apply-safe-fixes`, or `escalate` |
| Blocked step | reprioritization or stage conflict |
| Human approval needed | material reprioritization or scope change |
| Output artifact | updated issue set or review note |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:plan`
- `sop:backlog-grooming`
- `status:blocked` when issue conflicts prevent cleanup

## Done Criteria

- issue structure is current and internally consistent
- stage labels and links are corrected
- material changes are escalated instead of applied silently

<!-- Reviewed and Approved on -->

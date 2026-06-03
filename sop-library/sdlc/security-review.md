---
aliases:
  - Security Review
---

# Security Review

## Before You Edit This File

Frame of mind: This SOP reviews security before risk becomes accepted by accident. Keep it practical: secrets, auth, permissions, dependencies, data, and deploy posture.

Ask yourself before changing it:
- Could this expose secrets, private data, credentials, or unsafe permissions?
  Prompt: Define the source, calculation, freshness, and what threshold changes the decision.
- Does remediation require approval or architecture change?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- What severity and unblock action should be recorded?
  Prompt: Name the risk, severity, and the smallest safe next step.

Cross-check [[agent-permission-review|Agent Permission Review]], [[approval-boundaries|Approval Boundaries]], and [[tech/README|Tech]].


Version: `v1.0`

## Purpose

Check build-stage changes for new security risk before launch approval or risk acceptance.

## When To Use It

Use this SOP for changes affecting authentication, authorization, secrets, external inputs, dependencies, data handling, or admin capability.

## Inputs Required

- change scope and affected components
- linked issue and related decisions
- dependency or package changes if any
- expected trust boundaries and sensitive data paths

## Steps

1. Read the linked issue, relevant decisions, and risk context, then record `[[security-review|Security Review]] v1.0` in the issue.
2. Identify the changed attack surface: inputs, outputs, permissions, secret handling, and dependency changes.
3. Check for common failures such as missing authorization, insecure defaults, unchecked inputs, sensitive logging, or unsafe dependency updates.
4. Record findings by severity and state whether they block launch, require fixes, or require explicit human risk acceptance.
5. Store a durable findings summary in `source-of-truth/artifacts/` only when the result should be reusable or auditable.
6. Update the issue with the review outcome and the exact next action.

## Agent Actions Allowed

- inspect the change for common and context-specific security risks
- document findings and remediation recommendations
- request follow-up review or escalation

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| high-severity finding accepted without fix | explicit human risk acceptance |
| policy or permission boundary changes | appropriate human policy or security owner approval |
| unresolved security issue before launch | go or no-go approver decision |

## Output Artifacts

- issue update with security review result
- optional security findings summary in `source-of-truth/artifacts/`
- follow-up decision proposal if a new durable control decision is needed

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[decision-gates]]
- [[agent-responsibilities]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- trust boundaries and sensitive paths were explicitly checked
- findings have severity and concrete evidence
- accepted risk is never implied
- durable summaries include backlinks when stored

## Stop Conditions

- security-sensitive scope is unclear
- a required approval for accepted risk is missing
- the change conflicts with an Accepted security or permission decision

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Security Review` |
| Current step | `map-surface`, `inspect`, `classify-findings`, or `report` |
| Blocked step | unresolved security finding or missing approval |
| Human approval needed | accepted risk or permission boundary change |
| Output artifact | findings note or issue update |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:build`
- `sop:security-review`
- `risk:high` when applicable
- `status:blocked` when findings block launch

## Done Criteria

- changed attack surface is reviewed
- findings are classified and visible
- blocking issues are fixed or escalated for explicit approval

<!-- Reviewed and Approved on -->

---
aliases:
  - Agent Status Examples
---

# Agent Status Examples

## Healthy Active Agent

```md
---
agent_id: agent-frontend-01
agent_name: Frontend Delivery Agent
agent_type: delivery
status: Active
lifecycle_stage: Build
linked_github_issue: "#142"
last_updated: 2026-06-01T16:10:00Z
---

# Agent Status: Frontend Delivery Agent

## Identity

| Field | Value |
| --- | --- |
| Agent ID | agent-frontend-01 |
| Agent name | Frontend Delivery Agent |
| Agent type | delivery |

## Current State

| Field | Value |
| --- | --- |
| Goal | Deliver the approved onboarding flow updates without changing approved scope |
| Lifecycle stage | Build |
| Current task | Implement the final form validation state for the onboarding flow |
| Current SOP | [[feature-delivery|Feature Delivery]] v1.0 |
| Status | Active |
| Blocked | No |
| Blocker reason | None |
| Needs approval | No |
| Approval request | None |
| Approval needed from | None |

## Execution

| Field | Value |
| --- | --- |
| Last action | Linked the updated delivery notes and completed the validation-state UI changes |
| Next action | Run the [[testing|Testing]] SOP checks for onboarding validation behavior and record the result in #142 |
| Confidence | Medium |
| Confidence reason | The implementation path is clear, but the full test pass is still pending |
| Cost actual | Unknown |
| Cost estimate | 90 |
| Cost unit | minutes |

## Links

| Field | Value |
| --- | --- |
| Linked GitHub issue | #142 |
| Linked idea | [[onboarding-conversion-improvements|Onboarding Conversion Improvements]] |
| Linked decision record | [[dr-0002-agent-status-runtime-location-and-contract|Agent Status Runtime Location And Contract]] |
| Linked journal entry | [[2026-06-01-daily-journal|2026-06-01 Daily Journal]] |
| Linked project | [[onboarding-refresh|Onboarding Refresh]] |
| Output artifacts | [[onboarding-validation-notes|Onboarding Validation Notes]] |

## Update

| Field | Value |
| --- | --- |
| Last updated | 2026-06-01T16:10:00Z |
```

## Blocked Agent Needing Human Approval

```md
---
agent_id: agent-launch-01
agent_name: Launch Coordination Agent
agent_type: launch
status: Blocked
lifecycle_stage: Launch
linked_github_issue: "#177"
last_updated: 2026-06-01T17:20:00Z
---

# Agent Status: Launch Coordination Agent

## Identity

| Field | Value |
| --- | --- |
| Agent ID | agent-launch-01 |
| Agent name | Launch Coordination Agent |
| Agent type | launch |

## Current State

| Field | Value |
| --- | --- |
| Goal | Complete launch readiness review and prepare the final go or no-go packet |
| Lifecycle stage | Launch |
| Current task | Hold the release packet until the final approval decision is made |
| Current SOP | [[release-checklist|Release Checklist]] v1.0 |
| Status | Blocked |
| Blocked | Yes |
| Blocker reason | Human release approval is required before production launch can proceed |
| Needs approval | Yes |
| Approval request | Approve or reject the production go or no-go decision for issue #177 |
| Approval needed from | Release approver |

## Execution

| Field | Value |
| --- | --- |
| Last action | Compiled the final checklist, rollback plan, and known-issues summary into the launch packet |
| Next action | Review the launch packet and record the go or no-go decision in #177 |
| Confidence | Low |
| Confidence reason | Launch readiness is documented, but release cannot proceed without the explicit human decision |
| Cost actual | Unknown |
| Cost estimate | Unknown |
| Cost unit | unknown |

## Links

| Field | Value |
| --- | --- |
| Linked GitHub issue | #177 |
| Linked idea | [[self-serve-trial-launch|Self-Serve Trial Launch]] |
| Linked decision record | [[dr-0002-agent-status-runtime-location-and-contract|Agent Status Runtime Location And Contract]] |
| Linked journal entry | [[2026-06-01-daily-journal|2026-06-01 Daily Journal]] |
| Linked project | [[trial-launch-project|Trial Launch Project]] |
| Output artifacts | [[launch-packet|Launch Packet]] |

## Update

| Field | Value |
| --- | --- |
| Last updated | 2026-06-01T17:20:00Z |
```

## Related

- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[agent-status-template]]
- [[agent-status-rules]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

<!-- Reviewed and Approved on -->

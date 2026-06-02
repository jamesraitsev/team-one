---
aliases:
  - Validation Planning
---

# Validation Planning

Version: `v1.0`

## Purpose

Design the validation work needed to test whether an accepted idea should advance into planning.

## When To Use It

Use this SOP after an idea is accepted into validation and before evidence gathering starts drifting into unstructured research.

## Inputs Required

- accepted idea record
- linked issue and owner
- key assumptions and constraints
- known risks or dependencies

## Steps

1. Read the idea, issue, and governing decisions, then record `[[validation-planning|Validation Planning]] v1.0` in the issue.
2. List the assumptions that most affect go or no-go value, feasibility, and risk.
3. Define the validation activities needed to test those assumptions, including evidence sources and success metrics.
4. Record the plan in the issue or a durable note under an approved folder if the plan must be reused.
5. Flag dependency, security, compliance, or ownership gaps that could block useful validation.
6. Handoff to validation execution and stop for human approval when the evidence package is ready to judge.

## Agent Actions Allowed

- frame assumptions and evidence plans
- propose metrics, questions, and research tasks
- identify missing prerequisites for useful validation

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| proceeding from validation to plan | human resource or product owner approval |
| changing validation scope with material cost | accountable human owner approval |

## Output Artifacts

- validation plan in the issue or an approved durable note
- explicit assumptions list
- proposed success metrics

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[decision-gates]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- assumptions are specific and testable
- evidence activities map to a decision, not generic discovery
- success metrics are measurable
- blockers are explicit

## Stop Conditions

- the idea record is incomplete
- no measurable success criteria can be defined
- validation depends on an undocumented load-bearing decision

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Validation Planning` |
| Current step | `list-assumptions`, `design-evidence`, `define-metrics`, or `handoff` |
| Blocked step | missing owner, dependency, or metric definition |
| Human approval needed | proceed to plan after validation |
| Output artifact | validation plan or issue note |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:validation`
- `sop:validation-planning`
- `status:blocked` when dependencies prevent useful validation

## Done Criteria

- validation plan exists
- assumptions, evidence sources, and metrics are explicit
- blockers and approval points are visible

<!-- Reviewed and Approved on -->

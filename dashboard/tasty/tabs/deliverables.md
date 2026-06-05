---
aliases:
  - Tasty Deliverables Tab
  - Deliverables Tab
---
# Deliverables

## Status

Active

## Purpose

Deliverables shows the expected outputs from [Tasty Deliverables](../resources/sow/deliverables.md) and lets James inspect status, evidence, findings, risks, and recommendation drafts by deliverable.

## Sources

Deliverables may read:

| Source | Use |
| --- | --- |
| [Tasty Deliverables](../resources/sow/deliverables.md) | Required deliverable list, phase grouping, deliverable IDs, and status values. |
| `dashboard/tasty/memory/` | Accepted evidence logs and Linda interpretation for each deliverable. |
| [Tasty Score](../Score.md) | Scoring and memory-evidence rules. |
| `dashboard_actions` table | Draft accept, deny, delay, and edit action state. |
| OpenAI suggestion output | Draft-only recommendation and next-step suggestions before James accepts them. |

## Current State

Deliverables should show the 12 expected outputs from the SOW:

- `D1-30-1` through `D1-30-4`
- `D31-60-1` through `D31-60-4`
- `D61-90-1` through `D61-90-4`

The default phase filter is `Days 1 To 30`.

The phase filter options are:

- `Days 1 To 30`
- `Days 31 To 60`
- `Days 61 To 90`
- `All deliverables`

Each deliverable row or card should show:

- deliverable ID
- phase
- expected output
- status
- evidence-log count
- findings-and-risks count
- recommendation-draft count
- source link to [Tasty Deliverables](../resources/sow/deliverables.md)

## Interaction Model

Clicking a deliverable selects that deliverable and filters the dashboard context to it.

The selected-deliverable detail should show:

- the expected output
- status from Linda memory interpretation
- accepted evidence logs, if any
- related findings and risks
- related recommendation drafts
- sources used
- `Ask Linda`
- `Ask OpenAI`
- `Accept`
- `Deny`
- `Delay`
- editable draft text before acceptance

`Ask Linda` reads `dashboard/tasty/memory/` and produces a source-backed interpretation.

`Ask OpenAI` may suggest how to approach the deliverable, where to focus, and what James should do next. OpenAI suggestions are draft-only until James accepts them.

When James accepts an edited or unedited suggestion, the accepted version becomes permanent Tasty memory under `dashboard/tasty/memory/`.

Denying a suggestion records dashboard action history but must not create permanent Tasty memory.

Delaying a suggestion records dashboard action history and keeps the deliverable in its current status.

## Required Behavior

- Deliverables must be read from [Tasty Deliverables](../resources/sow/deliverables.md), not hard-coded in implementation.
- Deliverable status must come from Linda's interpretation of memory and accepted evidence logs.
- The dashboard must not invent evidence when no memory exists.
- If no evidence exists for a deliverable, show `Not started`.
- OpenAI suggestions must remain draft suggestions until James accepts them.
- James must be able to edit a suggestion before accepting it as permanent memory.
- Accepting an edited suggestion writes the edited version, not the original draft, to `dashboard/tasty/memory/`.
- Every finding, risk, or recommendation shown from this tab must retain its deliverable ID.
- Source-file links must open in the source file drawer.

## Rebuild Contract

To rebuild Deliverables, provide:

- phase filter options
- deliverable IDs
- deliverable expected outputs
- deliverable status values
- selected-deliverable detail
- evidence logs by deliverable
- findings and risks by deliverable
- recommendation drafts by deliverable
- Linda request action
- OpenAI request action
- editable draft acceptance flow
- accept, deny, and delay action recording

## Related

- [Tasty Deliverables](../resources/sow/deliverables.md)
- [Findings And Risks](findings-and-risks.md)
- [Recommendations](recommendations.md)
- [Tasty Score](../Score.md)

---
aliases:
  - Tasty Recommendations Tab
  - Recommendations Tab
---
# Recommendations

## Status

Active

## Purpose

Recommendations shows deliverable-linked suggestions for what James should do next. Recommendations must come from the deliverables, Linda memory interpretation, or OpenAI draft suggestions tied to a deliverable.

## Sources

Recommendations may read:

| Source | Use |
| --- | --- |
| [Tasty Deliverables](../resources/sow/deliverables.md) | Required deliverables and phase grouping. |
| [Deliverables](deliverables.md) | Selected deliverable and status behavior. |
| [Findings And Risks](findings-and-risks.md) | Findings and risks that motivate a recommendation. |
| `dashboard/tasty/memory/` | Accepted evidence logs and accepted recommendations. |
| OpenAI suggestion output | Draft-only recommendation text before James accepts it. |
| `dashboard_actions` table | Accept, deny, delay, and edit action state. |

## Current State

The default filter is `Days 1 To 30`.

Filter options:

- `Days 1 To 30`
- `Days 31 To 60`
- `Days 61 To 90`
- `All deliverables`
- `Accepted`
- `Draft`
- `Delayed`
- `Denied`

Each recommendation should show:

- deliverable ID
- deliverable expected output
- status
- recommendation title
- recommendation text
- reason this recommendation matters
- related findings and risks
- source evidence
- source type: `Linda`, `OpenAI`, or `James edit`
- accept, deny, and delay controls for draft items

## Suggestion Workflow

Recommendations are created through a draft-first flow.

1. James selects a deliverable.
2. Linda reads `dashboard/tasty/memory/` and interprets evidence for that deliverable.
3. OpenAI may produce draft suggestions for focus, approach, next action, or operating assessment questions.
4. The dashboard shows the draft recommendation.
5. James may edit the draft.
6. James may accept, deny, or delay the draft.
7. Accepted edited text is written as permanent Tasty memory under `dashboard/tasty/memory/`.

OpenAI output is never permanent memory by itself.

Linda remains the authority for interpreting whether accepted memory supports deliverable status, findings, risks, or score movement.

## Daily Assessment Workflow

A local daily assessment may call Linda to produce new deliverable-linked draft memories.

Daily assessment output should answer questions such as:

- How should James deepen the operating assessment within Engineering?
- Which deliverable should James focus on next?
- What evidence is missing?
- What finding or risk is becoming clearer?
- What recommendation should James consider?

Daily assessment output must be presented as approve, deny, delay, and edit actions before becoming permanent memory.

## Required Behavior

- Recommendations must be tied to a deliverable ID from [Tasty Deliverables](../resources/sow/deliverables.md).
- Recommendations must not appear as standalone advice detached from deliverables.
- OpenAI recommendations are draft suggestions until James accepts them.
- James must be able to edit a recommendation before accepting it.
- Accepting an edited recommendation writes the edited version to `dashboard/tasty/memory/`.
- Denied recommendations remain dashboard action history only.
- Delayed recommendations remain drafts or scheduled follow-ups and must not become memory.
- Accepted recommendations may update deliverable status only through Linda's later memory interpretation.
- Source-file links must open in the source file drawer.

## Rebuild Contract

To rebuild Recommendations, provide:

- phase filters
- recommendation status filters
- deliverable-linked recommendation records
- related findings and risks
- Linda interpretation source
- OpenAI draft source
- editable draft text
- accept, deny, and delay action recording
- permanent memory write for accepted edited text

## Related

- [Deliverables](deliverables.md)
- [Findings And Risks](findings-and-risks.md)
- [Tasty Deliverables](../resources/sow/deliverables.md)
- [Tasty Score](../Score.md)

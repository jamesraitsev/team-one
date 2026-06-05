---
aliases:
  - Tasty Findings And Risks Tab
  - Findings And Risks Tab
---
# Findings And Risks

## Status

Active

## Purpose

Findings And Risks shows deliverable-linked friction, bottlenecks, unclear ownership, reliability gaps, and dependencies.

## Sources

Findings And Risks may read:

| Source | Use |
| --- | --- |
| [Tasty Deliverables](../resources/sow/deliverables.md) | Deliverable IDs and phase filters. |
| `dashboard/tasty/memory/` | Accepted evidence logs and Linda-interpreted findings and risks. |
| [Tasty Score](../Score.md) | Evidence quality and memory rules. |
| OpenAI suggestion output | Draft-only findings and risks before James accepts them. |
| `dashboard_actions` table | Accept, deny, delay, and edit action state. |

## Finding And Risk Types

The tab uses exactly these finding and risk types:

| Type | Meaning |
| --- | --- |
| `Friction` | Work slows because process, ownership, handoff, communication, or decision flow is harder than it should be. |
| `Bottleneck` | A person, team, approval step, system, or dependency constrains throughput. |
| `Unclear ownership` | The owner, decision-maker, accountable party, or handoff owner is not clear. |
| `Reliability gap` | Delivery, release, incident, platform, quality, or operational reliability is weaker than the SOW outcome requires. |
| `Dependency` | Progress depends on another person, team, decision, artifact, access path, or input. |

Do not add other finding or risk types unless this file changes first.

## Current State

The default filter is `Days 1 To 30`.

Filter options:

- `Days 1 To 30`
- `Days 31 To 60`
- `Days 61 To 90`
- `All deliverables`
- `Friction`
- `Bottleneck`
- `Unclear ownership`
- `Reliability gap`
- `Dependency`

Each finding or risk card should show:

- deliverable ID
- deliverable expected output
- finding or risk type
- title
- Linda interpretation
- evidence source
- severity
- owner, if known
- dependency, if any
- recommendation link, if any
- accept, deny, and delay controls for draft items

If no memory-backed finding or risk exists for the selected filter, show that no accepted evidence exists yet.

## Interaction Model

Selecting a deliverable in [Deliverables](deliverables.md) should filter Findings And Risks to that deliverable.

Selecting a finding or risk should show:

- full finding or risk text
- evidence logs behind it
- related deliverable
- related recommendation draft, if any
- editable draft field for Linda or OpenAI suggestions
- accept, deny, and delay controls

Accepting an edited finding or risk writes the edited version as permanent Tasty memory under `dashboard/tasty/memory/`.

Denying a draft records dashboard action history but must not create permanent Tasty memory.

Delaying a draft records dashboard action history and keeps the finding or risk as a draft.

## Required Behavior

- Every finding or risk must be linked to a deliverable ID.
- Findings and risks must be evidence-backed by `dashboard/tasty/memory/` before they are shown as accepted.
- OpenAI may produce draft findings or risks, but those drafts are not memory until James accepts them.
- James must be able to edit a draft before accepting it.
- Accepted drafts must preserve the edited text, deliverable ID, source, date, and decision.
- The tab must not become a raw memory-file list.
- Source-file links must open in the source file drawer.

## Rebuild Contract

To rebuild Findings And Risks, provide:

- phase filters
- risk type filters
- deliverable-linked finding and risk records
- accepted evidence logs
- draft suggestion state
- editable acceptance flow
- accept, deny, and delay action recording
- empty state when no accepted evidence exists

## Related

- [Deliverables](deliverables.md)
- [Recommendations](recommendations.md)
- [Tasty Deliverables](../resources/sow/deliverables.md)
- [Tasty Score](../Score.md)

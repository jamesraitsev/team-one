---
aliases:
  - Tasty Header
  - Dashboard Header
  - Tasty Dashboard Header
---
# Tasty Dashboard Header

## Status

Active

## Purpose

Header defines the shared top area that appears above every Tasty dashboard tab.

Nothing in the shared header should be invented in implementation code. If the visible header copy, timestamp label, placement, or navigation changes, update this file first.

## Sources

Header may read:

| Source | Use |
| --- | --- |
| [[../about|Tasty About]] | Project identity and dashboard context. |
| [[home|Home]] through [[hygiene|Hygiene]] | Tab labels and tab order. |
| [[deliverables|Deliverables]] | SOW expected-output navigation. |
| [[findings-and-risks|Findings And Risks]] | Deliverable-linked friction, bottlenecks, unclear ownership, reliability gaps, and dependencies. |
| [[recommendations|Recommendations]] | Deliverable-linked recommendation drafts and accepted recommendation memory. |

## Content

| Field | Required value |
| --- | --- |
| Eyebrow icon | Sparkles icon. |
| Eyebrow label | `Scope: Tasty project dashboard` |
| Title | `Tasty Project Health` |
| Description | `This dashboard reads Tasty Markdown specs, Linda memory, project resources, and dashboard action history. The Markdown specs are the source of truth for what the UI should show.` |
| Timestamp label | `Generated in browser time` |
| Timestamp value | Show the dashboard payload generation time in the user's browser-local display format. |
| Timestamp placement | Upper right of the shared header on desktop; below the title area on narrow screens. |

## Navigation

The shared header includes the Tasty tab navigation immediately below it.

Required tab order:

1. [[home|Home]]
2. [[deliverables|Deliverables]]
3. [[findings-and-risks|Findings And Risks]]
4. [[recommendations|Recommendations]]
5. [[summary|Summary]]
6. [[focus|Focus]]
7. [[calendar|Calendar]]
8. [[pending-decisions|Pending Decisions]]
9. [[run-log|Run Log]]
10. [[hygiene|Hygiene]]

The tab row must use the tab labels from the tab specs. If a tab label changes, update the relevant tab spec and this file in the same change.

## Required Behavior

- Header must appear above every Tasty tab.
- Header copy must come from this file.
- Timestamp label must come from this file.
- Timestamp value may be generated at runtime, but the decision to show it and its label must come from this file.
- Implementation must not hard-code visible header copy that is missing from this file.
- The title must be `Tasty Project Health`; do not use `from the repo itself` in the title.

## Rebuild Contract

To rebuild Header, provide:

- eyebrow icon
- eyebrow label
- title
- description
- timestamp label
- timestamp value rule
- timestamp placement
- tab order and labels

## Related

- [[../about|Tasty About]]
- [[home|Home]]
- [[deliverables|Deliverables]]
- [[findings-and-risks|Findings And Risks]]
- [[recommendations|Recommendations]]
- [[summary|Summary]]
- [[focus|Focus]]
- [[calendar|Calendar]]
- [[pending-decisions|Pending Decisions]]
- [[run-log|Run Log]]
- [[hygiene|Hygiene]]

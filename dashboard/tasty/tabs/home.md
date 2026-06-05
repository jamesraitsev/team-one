---
aliases:
  - TastyTabs Home Tab
  - Tasty Home Tab
  - Home Tab
---
# Home

## Purpose
Home is a tab on the Tasty project dashboard.

The project identity is represented by [[about|about.md]], which lives in the dashboard project folder `dashboard/tasty/`.

If the folder is renamed, update [[about#Name|about.md - Name]] and this Home note in the same change.

Home should show the most useful high-level information about this project: what it is, what state it is in, how healthy it is, and where to go next.

## Card

Each project gets one card.

For this dashboard, the `Tasty` project gets one Home card.

The card should show:

- Project name
  - Source: [[about#Name|about.md - Name]].
  - Folder fallback: use the containing dashboard project folder name only if `about.md - Name` is missing.
- Status
  - Shows: one current label.
  - Default: `Active`.
  - Definition: [[#Status Values]].
- Description
  - Shows: short project description.
  - Source: [[about#Description|about.md - Description]].
- Current state
  - Shows: project score, either `-` when not started or a numeric score from `1/100` to `100/100` after Linda has evidence-backed scoring.
  - Definition: [[#Health Metric]].
- Actions
  - Shows: clickable elements for `Summary` and `Focus`.

The project name and description may be clickable references back to their source sections, but they must look like normal card text. Do not underline the project name or description by default, and do not add an underline on hover. The explicit source-file link, such as `dashboard/tasty/about.md`, may use normal link styling and should open the source file drawer.

The description should use the full available card width. If the card content area is width `X`, the description text area should also be width `X` except for intentional padding and margins.

Dashboard Home may show multiple project cards. Lay project cards out with no more than three project cards in a single row.

## Implementation Detail

### Status Values

Each card has one primary status label.

Default status:

- `Active`

Allowed statuses:

| Label | Meaning | Required color |
| --- | --- | --- |
| `Active` | Project is live and currently moving. | White text `rgb(255, 255, 255)` on dark green background `rgb(22, 101, 52)` with matching dark green border `rgb(22, 101, 52)`. |
| `Inactive` | Project is not currently moving, but is not formally paused. | Dark amber text `rgb(120, 53, 15)` on muted yellow background `rgb(254, 243, 199)` with darker yellow border `rgb(217, 119, 6)`. |
| `On hold` | Project is intentionally paused or waiting. | White text `rgb(255, 255, 255)` on gray background `rgb(107, 114, 128)` with matching gray border `rgb(107, 114, 128)`. |

Do not generate or display other Home status labels.

Click behavior:

- Clicking the status label rotates it through `Active`, `Inactive`, and `On hold`.
- After `On hold`, the next click returns to `Active`.
- If no saved status exists, show `Active`.

### Health Metric

Current state is the project health score.

Linda is solely responsible for changing the current-state score. The dashboard may display Linda's latest score, but it must not calculate, overwrite, or invent that score.

Linda's Tasty scoring method belongs in the project dashboard folder:

- [[Score|Tasty Score]]
- [[agent-documentation/profiles/linda/health-score/README|Linda Health Score Method]]

Tasty scoring is based on the SOW and project memory. It is not an equal-weight checklist.

Use these display rules:

| Condition | Display |
| --- | --- |
| `dashboard/tasty/memory/` is missing, empty, or has no evidence of project action | `-` with status `Not started` |
| Tasty memory exists but Linda has not recorded an evidence-backed numeric score | `-` with the current non-numeric status |
| Linda has recorded a score using [[Score|Tasty Score]] | `<score>/100` |

The dashboard must not convert `Not started` into `0/100`. A dash means the project has not started or cannot yet be scored; zero implies scored failure.

### Actions

Each card should include:

- `Summary`: clickable element that opens [[summary|Summary]].
- `Focus`: clickable element that opens [[focus|Focus]].

These are navigation elements.

### Example Card

Example only:

- Project: `Tasty`
- Status: `Active`
- Description: text pulled from [[about#Description|about.md - Description]].
- Current state: `-` until Linda records an evidence-backed score using [[Score|Tasty Score]].
- Actions: `Summary`, `Focus`

### Required Behavior

- Show one card for the `Tasty` project.
- Support additional project cards later, with no more than three project cards per row.
- Keep cards short and scannable.
- Do not invent live project state, scores, or labels.
- Only Linda may change the current-state score.
- Use plain English labels.
- Use only the allowed status labels and required RGB colors from [[#Status Values]].
- Keep description text visually normal even when it is clickable.
- Let description text use the full available card width.
- Keep every card field referenceable to a source file or to a section in this tab spec.
- If a source section such as `about.md` `Description` is renamed, update this tab's source links in the same change.

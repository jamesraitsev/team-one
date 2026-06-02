---
aliases:
  - Dashboard Metric Definitions
  - Dashboard ROI Definitions
---

# Dashboard Metric Definitions

This file is the canonical place to define dashboard metrics before build and before any dashboard import treats a field as authoritative.

Use it with [[dashboard-tabs]], [[dashboard-card-contract]], and [[dashboard-data-contract]].

## Purpose

Every surfaced metric or cost field must have:

- a stable name
- a clear project scope
- a reporting window
- a source of truth
- a formula or counting rule
- an explicit interpretation rule

If a metric does not have those fields, the dashboard may show it only as `Unknown` or keep it out of ROI summaries.

## Required Definition Fields

Use these fields for every metric or decision signal:

| Field | Definition |
| --- | --- |
| Metric name | Stable display and storage name used across cards and summaries. |
| Scope | The project, initiative, product line, or campaign the value belongs to. |
| Reporting window | The exact time window the value covers, for example `Last 7 days` or `2026-06`. |
| Source of truth | File, export, or API that governs the value. |
| Definition | Plain-language explanation of what the metric means. |
| Formula or counting rule | How the value is computed or counted. |
| Actual, estimated, or derived | Whether the value is measured directly, estimated, or computed from other values. |
| Refresh cadence | How often the value should be updated. |
| Missing-data rule | What the dashboard should render when the value is absent or stale. |
| Notes | Assumptions, exclusions, and project-specific caveats. |

## Required Per-Project ROI Fields

Every project ROI summary must define these fields before the dashboard treats the summary as complete:

| Field | Minimum definition rule |
| --- | --- |
| AI spend | Attributable model, API, inference, or token spend for the project during the reporting window. |
| Tool spend | Attributable third-party software or workflow-tool spend for the project during the reporting window. |
| Ad spend | Attributable paid acquisition or promotion spend for the project during the reporting window. |
| Tickets closed | Count of project-linked tickets moved to the accepted closed state during the reporting window. |
| Downloads | Count of project-linked downloads during the reporting window. Define the exact event source. |
| Conversion | Define the conversion event and denominator explicitly for the project. Do not assume one shared repo-wide meaning. |
| CAC | Customer acquisition cost or equivalent acquisition cost for the project. Define the acquisition event, denominator, and included spend categories. |
| Keep going or pause | Operator-facing recommendation derived from the defined thresholds, not from ad hoc judgment alone. |

## Default Definitions

These defaults apply unless a project-level decision or metric note overrides them.

| Metric name | Default definition | Default formula or counting rule |
| --- | --- | --- |
| AI spend | Spend directly attributable to AI usage for the project. | Sum of project-attributed model or API charges in the reporting window. |
| Tool spend | Spend directly attributable to non-AI tools used to deliver or operate the project. | Sum of project-attributed tool charges in the reporting window. |
| Ad spend | Paid distribution or acquisition spend attributable to the project. | Sum of project-attributed ad charges in the reporting window. |
| Tickets closed | Closed work items tied to the project. | Count of linked tickets entering the accepted closed state in the reporting window. |
| Downloads | Completed download events tied to the project. | Count of defined download events in the reporting window. |
| Conversion | Share of qualified users or sessions completing the project's defined success event. | `Conversions / defined conversion denominator`. |
| CAC | Acquisition efficiency for the project. | `Included acquisition spend / acquired customers` or another explicitly defined acquired-unit denominator. |
| Keep going or pause | Current investment recommendation for the project. | Evaluate the project's thresholds for spend, traction, conversion, and learning; render `Keep going`, `Pause`, or `Unknown` when required inputs are missing. |

## Project ROI Summary Contract

A project ROI summary is complete only when it includes:

- project name or stable identifier
- reporting window
- AI spend
- tool spend
- ad spend
- total attributable spend
- tickets closed
- downloads when applicable
- conversion definition and value when applicable
- CAC definition and value when applicable
- current recommendation: `Keep going`, `Pause`, or `Unknown`
- recommendation rationale
- direct source links for every non-derived field

## Related

- [[dashboard-tabs]]
- [[dashboard-card-contract]]
- [[dashboard-data-contract]]

<!-- Reviewed and Approved on -->

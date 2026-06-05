---
aliases:
  - Linda Dashboard
  - Linda Repo Health Dashboard
  - Project Health Dashboard Spec
---
# Project Health Dashboard Spec

## Name

Tasty

## Description

The purpose of this project is to provide a structured system for tracking 30, 60, and 90 day assessments while keeping consultant focused on their key deliverables. It helps create clear checkpoints, measure progress, identify gaps, and ensure that each consultant stays aligned with the goals, timelines, and expectations of the engagement.

The project also serves as a central place to manage both project data and consultant related information, including expenses, invoices, reports, assessments, and other supporting materials. By keeping this information organized and accessible, the project helps consultants move forward efficiently, stay accountable, and complete their assigned tasks with better visibility and control.

## Authority

Agent Linda is the authority for this dashboard.

### Linda Audit Vectors

Linda uses the shared six-vector dashboard contract from [Common Dashboard Spec](common-spec.md).

For this project, the six vectors mean:

| Vector | Linda meaning |
| --- | --- |
| `Clarity` | Can James tell what is live, future, or undecided? |
| `Duplication` | Are multiple notes defining the same rule or backlog truth? |
| `Work order` | Is the next work sequenced before dependent or lower-priority cleanup? |
| `File placement` | Is the content in the right operating layer and source path? |
| `Daily use` | Does the dashboard give James practical work for the next operating pass? |
| `Memory` | Are durable memory, accepted decisions, and dashboard actions separated? |

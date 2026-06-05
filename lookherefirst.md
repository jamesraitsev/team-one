---
aliases:
  - Look Here First
  - Definition Order
  - Repo Fill Order
---

# Look Here First

Use this file as the fill order for the active repo.

Start here, then go in order. Do not fill lower-level docs before the parent authority above them is clear.

This list intentionally excludes `.git/`, `.DS_Store`, generated `artifacts/`, and `review later/`. The current `gtm-council/` folder has no active Markdown files, so there is nothing to fill there yet.

## Start Here

1. [[AGENTS|AGENTS.md]] - Define the repo-wide editing rules, authority assumptions, and validation expectations.
2. [[question|question.md]] - Resolve the structural questions enough to know what is live, what is future, and what is non-authoritative.
3. [[operating-model/README|Operating Model Overview]] - Define the operating model in one page: purpose, scope, live-vs-spec posture, and folder authority order.

## Source Of Truth And Backlog

4. [[source-of-truth/files-and-folders|Files And Folders]] - Define active folders now, approved future folders, write rules, backlink rules, and top-level exceptions.
5. [[source-of-truth/github|GitHub]] - Decide whether GitHub is file-adjacent, optional, or mandatory; fill repo, auth, issue, and sync configuration only when real.
6. [[source-of-truth/decisions/index|Decision Index]] - Keep the accepted decision inventory current and linked.
7. [[source-of-truth/decisions/dr-0001-sop-library-location-and-governance|DR-0001 - SOP Library Location And Governance]] - Confirm or revise why `sop-library/` is a top-level exception.
8. [[source-of-truth/decisions/dr-0002-agent-status-runtime-location-and-contract|DR-0002 - Agent Status Runtime Location And Contract]] - Confirm or revise why runtime status lives in `source-of-truth/agent-status/`.
9. [[source-of-truth/decisions/dr-0003-linda-repo-health-auditor-and-memory|DR-0003 - Linda Repo Health Auditor And Memory]] - Confirm or revise Linda's authority, scoring role, and memory write path.
10. [[source-of-truth/ideas/sop-library-system|SOP Library System Idea]] - Define the idea record that supports the SOP library decision.
11. [[source-of-truth/agent-status/index|Agent Status Index]] - Define how active agent status files will be summarized once runs begin.
12. [[source-of-truth/memory/README|Memory]] - Define durable recurring agent memory and how it differs from decisions, journals, and status.
13. [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]] - Track Linda's repo-health score history, must-look items, and carried-forward findings.

## Lifecycle And Approval Authority

14. [[operating-model/lifecycle|Lifecycle]] - Define stage labels, stage meanings, status vocabulary, and the shape of initiative flow.
15. [[operating-model/decision-gates|Decision Gates]] - Define what evidence, approvals, blockers, and records are required between stages.
16. [[operating-model/guardrails/guardrails|Guardrails]] - Define the global safety posture and non-negotiable operating constraints.
17. [[operating-model/guardrails/approval-boundaries|Approval Boundaries]] - Define what agents may do alone and what always requires approval.
18. [[operating-model/guardrails/safe-actions|Safe Actions]] - Define the low-risk autonomous action classes.
19. [[operating-model/guardrails/autonomy-ramp|Autonomy Ramp]] - Define how autonomy increases only after visibility and auditability exist.
20. [[operating-model/agent-responsibilities|Agent Responsibilities]] - Define stage-by-stage agent permissions and human approval triggers.

## Decision Record System

21. [[operating-model/decision-record-system/README|Decision Record System]] - Define what counts as a load-bearing decision and where it is recorded.
22. [[operating-model/decision-record-system/decision-record-rules|Decision Record Rules]] - Define creation, update, supersession, review, and conflict rules.
23. [[operating-model/decision-record-system/decision-record-naming|Decision Record Naming]] - Define IDs, file naming, aliases, and title rules.
24. [[operating-model/decision-record-system/decision-record-template|Decision Record Template]] - Define the standard record structure to copy.
25. [[operating-model/decision-record-system/decision-record-index-template|Decision Record Index Template]] - Define the standard index structure.
26. [[operating-model/decision-record-system/examples|Decision Record Examples]] - Add realistic examples only after the rules and template are stable.

## Agent Status Schema

27. [[operating-model/agent-status-schema/README|Agent Status Schema]] - Define what runtime status is and how it connects to the dashboard.
28. [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]] - Define status creation, update, blocker, approval, and close rules.
29. [[operating-model/agent-status-schema/agent-status-file-contract|Agent Status File Contract]] - Define filenames, fields, archive behavior, and required links.
30. [[operating-model/agent-status-schema/agent-status-template|Agent Status Template]] - Define the standard active status file.
31. [[operating-model/agent-status-schema/agent-status-index-template|Agent Status Index Template]] - Define how active statuses summarize into an index.
32. [[operating-model/agent-status-schema/agent-status-dashboard-contract|Agent Status Dashboard Contract]] - Define which status fields the dashboard may read.
33. [[operating-model/agent-status-schema/examples|Agent Status Examples]] - Add realistic examples after field rules are stable.

## SOP Library Foundation

34. [[sop-library/README|SOP Library]] - Define what SOPs are, what belongs here, and what must never be stored here.
35. [[sop-library/categories|SOP Categories]] - Define category boundaries and ownership.
36. [[sop-library/sop-usage-rules|SOP Usage Rules]] - Define how SOPs are selected, executed, linked, stopped, and reported.
37. [[sop-library/sop-registry|SOP Registry]] - Fill every active SOP row with owner, version, inputs, outputs, and approval boundaries.
38. [[sop-library/sop-template|SOP Template]] - Define the canonical SOP structure.
39. [[sop-library/sop-config.example|SOP Config Example]] - Define optional local/shared SOP resolution only if you actually need overrides.

## Governance SOPs

40. [[sop-library/governance/source-of-truth-check|Source Of Truth Check]] - Define the procedure for link health, missing records, stale state, and conflicts.
41. [[sop-library/governance/decision-record-review|Decision Record Review]] - Define the procedure for stale, missing, conflicting, or superseded decisions.
42. [[sop-library/governance/agent-permission-review|Agent Permission Review]] - Define the procedure for reviewing autonomy, approvals, auth, and unsafe permissions.
43. [[sop-library/governance/repo-health-audit|Repo Health Audit]] - Define Linda's repo-health audit procedure, score rubric, report shape, and memory update.

## Operations SOPs

44. [[sop-library/operations/daily-journal|Daily Journal]] - Define what a daily memory record must contain and when it is required.
45. [[sop-library/operations/dashboard-review|Dashboard Review]] - Define the human or agent procedure for reviewing dashboard state.
46. [[sop-library/operations/weekly-review|Weekly Review]] - Define weekly review inputs, decisions, outputs, and follow-up records.

## Product SOPs

47. [[sop-library/product/idea-triage|Idea Triage]] - Define how raw ideas become accepted, rejected, merged, or moved to validation.
48. [[sop-library/product/validation-planning|Validation Planning]] - Define how demand, feasibility, risk, and success metrics are validated.
49. [[sop-library/product/backlog-grooming|Backlog Grooming]] - Define duplicate handling, ranking, stale work, missing links, and backlog recommendations.

## Growth SOPs

50. [[sop-library/growth/launch-planning|Launch Planning]] - Define launch readiness, channel plan, evidence, risks, and go/no-go packet.
51. [[sop-library/growth/copy-review|Copy Review]] - Define copy quality, claims, positioning, audience fit, and approval rules.
52. [[sop-library/growth/content-approval|Content Approval]] - Define public-content approval, review boundaries, and publication stop conditions.

## SDLC SOPs

53. [[sop-library/sdlc/feature-delivery|Feature Delivery]] - Define how features move from plan to completed delivery.
54. [[sop-library/sdlc/testing|Testing]] - Define required test evidence, test types, and failure handling.
55. [[sop-library/sdlc/visual-review|Visual Review]] - Define visual QA, screenshot expectations, and layout review rules.
56. [[sop-library/sdlc/security-review|Security Review]] - Define security checks, dependency checks, auth/secret handling, and escalation.
57. [[sop-library/sdlc/release-checklist|Release Checklist]] - Define release readiness, rollback, owner coverage, and post-release capture.

## Agents

58. [[agent-documentation/README|Agent Documentation]] - Explain the portable agent documentation structure and why schedules are only cadence rules.
59. [[agent-documentation/agents-overview|Agents Overview]] - Define the agent system and explain that schedules are optional cadence, not a different kind of agent.
60. [[agent-documentation/profiles/README|Agent Profiles]] - Define the shared folder structure and index for every individual project-curator agent.
61. [[agent-documentation/profiles/daily-chief-of-staff-brief/README|Daily Chief of Staff Brief]] - Define the daily summary agent, its boundaries, inputs, outputs, and handoffs.
62. [[agent-documentation/profiles/backlog-groomer/README|Backlog Groomer]] - Define the backlog-quality agent, ranking limits, and GitHub/file-first behavior.
63. [[agent-documentation/profiles/product-reviewer/README|Product Reviewer]] - Define the product-value and validation agent.
64. [[agent-documentation/profiles/cto-reviewer/README|CTO Reviewer]] - Define the technical-readiness agent, architecture boundaries, and tech cross-references.
65. [[agent-documentation/profiles/growth-reviewer/README|Growth Reviewer]] - Define the launch, positioning, channel, and experiment agent.
66. [[agent-documentation/profiles/weekly-cfo-cost-and-progress-reviewer/README|Weekly CFO Cost and Progress Reviewer]] - Define the cost, throughput, ROI, and spend-review agent.
67. [[agent-documentation/profiles/qa-release-reviewer/README|QA / Release Reviewer]] - Define the test, release-readiness, and regression-risk agent.
68. [[agent-documentation/profiles/security-secrets-reviewer/README|Security / Secrets Reviewer]] - Define the secrets, auth, permissions, and security-risk agent.
69. [[agent-documentation/profiles/customer-signal-reviewer/README|Customer Signal Reviewer]] - Define the feedback, analytics, complaints, and demand-signal agent.
70. [[agent-documentation/profiles/linda/README|Linda]] - Define Linda as the repo-health curator and audit agent.
71. [[agent-documentation/profiles/source-of-truth-steward/README|Source-of-Truth Steward]] - Define the file-integrity, backlink, and durable-record-health agent.
72. [[agent-documentation/profiles/decision-record-steward/README|Decision Record Steward]] - Define the durable-decision hygiene and conflict-review agent.
73. [[agent-documentation/agent-roster|Agent Roster]] - Define the canonical table of agents and link each profile.
74. [[agent-documentation/agent-schedules|Agent Schedules]] - Define cadence rules for daily, weekly, event-driven, and on-demand runs.
75. [[agent-documentation/agent-workflows|Agent Workflows]] - Define orchestration steps only: read, status, route, stop, approve, and write.
76. [[agent-documentation/agent-output-contracts|Agent Output Contracts]] - Define the output packet fields every agent must produce.
77. [[agent-documentation/agent-dashboard-routing|Agent Dashboard Routing]] - Define where each agent sends cards, approvals, metrics, and blockers.
78. [[agent-documentation/agent-approval-rules|Agent Approval Rules]] - Define agent-specific approval boundaries without weakening operating-model guardrails.
79. [[agent-documentation/memory-and-decision-hygiene|Memory And Decision Hygiene]] - Define status, memory, journal, decision, and artifact write boundaries for agents.
80. [[agent-documentation/agent-template|Agent Template]] - Define the standard template for any future project-curator agent profile.

## Dashboard Specification

81. [[operating-model/dashboard-model|Dashboard Model]] - Define the conceptual dashboard relationship to lifecycle, status, blockers, and approvals.
82. [[2. dashboard/README|Dashboard Specification]] - Define the one-root-folder dashboard definition layer and project folder rule.
83. [[common-spec|Common Dashboard Spec]] - Define shared dashboard rules, tab contracts, card rules, source rules, actions, metrics, and rebuild requirements.
84. [[about|Linda Dashboard]] - Define the current Linda project dashboard and link to its tab specs.
85. [[home|Linda Home Tab]] - Define the active Home tab.
86. [[summary|Linda Summary Tab]] - Define the active Summary tab.
87. [[focus|Linda Focus Tab]] - Define the active Focus tab.
88. [[calendar|Linda Calendar Tab]] - Define the active Calendar tab.
89. [[pending-decisions|Linda Pending Decisions Tab]] - Define the active Pending Decisions tab.
90. [[run-log|Linda Run Log Tab]] - Define the active Run Log tab.
91. [[hygiene|Linda Hygiene Tab]] - Define the active Hygiene tab.

## Tech

92. [[spec|Tech]] - Keep this deferred until a build decision exists; then define the software artifact, stack, data sources, auth, deployment, and integrations.

## To-Dos After The First Pass

1. Add an explicit authority order to [[operating-model/README|Operating Model Overview]].
2. Split active-now folders from approved-future folders in [[source-of-truth/files-and-folders|Files And Folders]].
3. Mark [[source-of-truth/github|GitHub]] as `not live until configured`, or fully configure it.
4. Add a root-level folder boundary table covering `operating-model/`, `dashboard/`, `agent-documentation/`, `sop-library/`, `source-of-truth/`, `tech/`, `artifacts/`, and `review later/`.
5. Mark `review later/` as non-authoritative until files are restored to the active tree.
6. Decide whether root `artifacts/` should move into `source-of-truth/artifacts/` or remain generated output.
7. Shorten [[agent-documentation/agent-workflows|Agent Workflows]] wherever a reusable SOP already defines the procedure.
8. Update [[sop-library/sop-registry|SOP Registry]] after every SOP edit.
9. Add or update a decision record for every structural resolution that changes authority, folder contracts, backlog truth, dashboard behavior, or implementation scope.
10. After the docs are filled, run a link-health pass and make sure every hub note has a `Related` section pointing to the right canonical files.

## Related

- [[AGENTS|AGENTS.md]]
- [[question|question.md]]
- [[operating-model/README|Operating Model Overview]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/decisions/index|Decision Index]]

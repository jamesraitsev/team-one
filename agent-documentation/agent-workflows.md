---
aliases:
  - Scheduled Agent Workflows
  - Agent Workflows
---

# Agent Workflows

## Before You Edit This File

Frame of mind: This file defines agent orchestration, not every procedural detail. Keep workflows focused on read, status, review, route, approval, and write behavior.

Ask yourself before changing it:
- What records must the agent read first?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Which SOPs does it run instead of duplicating steps here?
  Prompt: State whether this belongs in a reusable SOP, an agent workflow, or a one-time record.
- When must it stop for approval, missing configuration, or source-of-truth conflict?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[sop-library/README|SOP Library]], [[sop-registry|SOP Registry]], [[agent-approval-rules|Agent Approval Rules]], and [[memory-and-decision-hygiene|Memory And Decision Hygiene]].


This file defines what each agent does step by step.

Use it with [[agent-roster|Agent Roster]], [[agent-schedules|Agent Schedules]], [[agent-output-contracts|Agent Output Contracts]], and [[agent-approval-rules|Agent Approval Rules]].

## Shared Workflow Skeleton

Every agent should begin with this shared sequence:

1. Read the governing source records, relevant SOPs, and related decision records.
2. Create or update the runtime status file in `source-of-truth/agent-status/`.
3. Confirm the approved write path for any output.
4. Stop immediately if source-of-truth rules are missing, Accepted decisions conflict, or required permissions are unclear.
5. Perform the agent-specific review.
6. Write or update the durable memory record required for the run.
7. Produce dashboard-ready output.
8. Create or update an approval queue item if the next step needs human approval.
9. Update `Next action` in the status file with the exact follow-on step.

## Shared Priority And Conflict Thinking Rule

When an agent is judging priorities or surfacing a conflict, it should think in this order:

1. Is this really the same work item, or do we have an identity problem first.
2. If identity is clear, what operator outcome is being optimized: flow, learning, launch safety, revenue, cost, or risk reduction.
3. What is the smallest change that would reorder the priority list.
4. What is the smallest missing decision, missing evidence, or blocked dependency.
5. Can the conflict be split into smaller cards the human can resolve independently.
6. Is the agent about to escalate a bundled disagreement that should be decomposed first.

Agents should prefer this decomposition:

- duplicate issue before priority debate
- stale issue before ownerless urgency claims
- blocked dependency before effort debate
- regression risk before ship-pressure arguments
- decision conflict before policy-free prioritization

Agents must not say only `these priorities conflict`.

They should instead state:

- what kind of conflict exists
- what records disagree
- what gets distorted if the conflict stays unresolved
- what smallest human decision restores flow

## Shared Memory And Decision Thinking Rule

When an agent finishes a recurring run, it should ask:

1. What must be remembered tomorrow even if the chat is gone.
2. Which items belong in the daily memory record versus a decision record.
3. Which assumptions changed enough to affect later work.
4. Which open questions still shape priority or risk.
5. Which new risks need to be carried forward.
6. Which tickets were created or closed and therefore changed the executable backlog.

Agents should prefer this write order:

1. update runtime status
2. update the daily memory record
3. create or update any required decision record
4. update linked issues, projects, or artifacts

Agents must not leave durable reasoning only in a summary paragraph.

They should write explicit sections for:

- decisions made
- assumptions changed
- open questions
- new risks
- tickets created
- tickets closed

## Daily Chief Of Staff Brief

1. Read active agent status files, recent decision records, active approvals, and the latest linked journals.
2. Summarize overnight changes, new blockers, new approvals, major risks, and top recommended decisions.
3. Write or update the daily memory record with sections for decisions made, assumptions changed, open questions, new risks, tickets created, and tickets closed.
4. Cross-check that each surfaced item links back to a durable source record.
5. Route the brief to Today, Needs Approval, and Blocked Agents.
6. If the brief identifies a load-bearing conflict, request a human decision instead of normalizing the conflict away.
7. Update status with the exact follow-up brief or escalation action.

## Backlog Groomer

1. Read backlog-related durable records, the latest product priorities, and GitHub issues when GitHub is actually configured.
2. Detect duplicates, stale items, missing links, weak priorities, blocked work, and items that no longer fit the current lifecycle stage.
3. If GitHub is placeholder-only, continue with file-first ranking only when the runtime status and output packet record the GitHub sync limitation explicitly.
4. Draft the top backlog recommendations with supporting rationale and linked source records.
5. Route ranked items to Top Backlog and route approvals for material reprioritization to Needs Approval.
6. Stop if a required issue action cannot be completed because live GitHub configuration is missing.

## Product Reviewer

1. Read idea, validation, project, research, customer-signal, and decision records related to the active initiatives.
2. Evaluate user value, stage fit, assumptions, evidence quality, and validation gaps.
3. Identify whether the initiative should continue, pause, narrow scope, gather more evidence, or stop.
4. Draft recommendations and highlight assumptions that need explicit human acceptance.
5. Route decision-ready items to Today and Recent Decisions, and route ranking implications to Top Backlog or Metrics.
6. Raise approval when moving forward requires a human lifecycle or investment decision.

## CTO Reviewer

1. Read implementation plans, technical decisions, dependencies, active blockers, and engineering-related SOP outputs.
2. Evaluate architecture fit, sequencing, reliability, scalability, operational risk, and readiness to start or continue implementation.
3. Detect missing architectural decisions, risky dependency chains, and acceptance of technical risk without approval.
4. Draft the recommended technical next step, including sequencing or risk-reduction actions.
5. Route blockers to Blocked Agents, decision packets to Needs Approval or Recent Decisions, and major recommendations to Today.
6. Stop if an architecture change is required and explicit approval is not yet present.

## Growth Reviewer

1. Read launch plans, copy artifacts, content approvals, current metrics, and linked customer-signal evidence.
2. Evaluate positioning, channels, conversion path, traction signals, and next experiments.
3. Distinguish between analysis that can proceed autonomously and messaging or spend changes that require approval.
4. Draft experiment recommendations, launch-readiness notes, and any approval packet for public content or timing.
5. Route performance and experiment insights to Metrics and Today, and route public-approval items to Needs Approval.
6. Stop if public posting or launch timing needs a human decision.

## Weekly CFO Cost And Progress Reviewer

1. Read weekly progress summaries, dashboard metrics, active blockers, and available cost or spend signals.
2. Compare cost movement against throughput, lifecycle stage, and evidence of value creation.
3. Classify initiatives as continue, pause, reduce spend, or double down, with rationale tied to source records.
4. Draft explicit tradeoff recommendations instead of passive cost reporting.
5. Route cost and ROI summaries to Cost and Today, and route spend-change approvals to Needs Approval.
6. Stop if the recommendation would increase spend without explicit approval.

## QA / Release Reviewer

1. Read acceptance criteria, test evidence, visual review evidence, active defects, and release checklist materials.
2. Evaluate regression risk, missing coverage, unmet criteria, visual quality, and rollback readiness.
3. Decide whether the work is ready for merge, ready for deploy review, or blocked on defects or evidence gaps.
4. Draft the release recommendation with concrete ship or do-not-ship reasoning.
5. Route release blockers to Blocked Agents, release approvals to Needs Approval, and the summary to Today.
6. Stop if deploy or risk acceptance requires human approval.

## Security / Secrets Reviewer

1. Read security review inputs, dependency changes, permission changes, auth changes, and secret-handling evidence.
2. Evaluate secret exposure risk, unsafe permissions, dependency risk, auth regressions, and data-exposure paths.
3. Distinguish issues the agent can document from changes that require approval or human remediation.
4. Draft the security recommendation, including severity and exact unblock action.
5. Route approval-bound security findings to Needs Approval, active security blockers to Blocked Agents, and high-priority summaries to Today or Recent Decisions.
6. Stop if the next step changes permissions, secrets handling, deployment posture, or accepted security risk without approval.

## Customer Signal Reviewer

1. Read support notes, analytics summaries, complaints, feature requests, journal entries, and launch metrics.
2. Group signals into activation, retention, complaint, demand, and request themes.
3. Separate anecdotal noise from repeated evidence that should change product, growth, or backlog decisions.
4. Draft clear signal summaries with confidence and recommended follow-up experiments or backlog changes.
5. Route key patterns to Metrics and Today, and route high-value product implications to Top Backlog.
6. Raise approval when the recommended response materially changes scope, timing, public messaging, or investment.

## Linda

1. Read [[agent-documentation/profiles/linda/README|Linda]], [[repo-health-audit|Repo Health Audit]], [[lookherefirst|Look Here First]], [[question|question.md]], the source-of-truth contract, decision index, SOP registry, active agent roster, and [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]].
2. Create or update Linda's active runtime status when the request is an active Linda run.
3. Identify the project or repo area James wants Linda to inspect, then read the relevant source files before summarizing or scoring.
4. Ignore generated artifacts, `.git/`, `.DS_Store`, archived `review later/`, and guidance scaffolding such as `Before You Edit This File` blocks when scoring core repo quality.
5. Audit clarity first, then overlaps, sequencing, placement, utilization, and memory continuity.
6. Produce concise project status and source-backed insights. If source state is unclear, ask James one direct clarifying question instead of guessing.
7. Compare the current score with the prior Linda score and identify the weakest area when a repo-health score is part of the run.
8. Write the score, delta, must-look findings, one-day work, and challenge question to [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]] when completing a repo-health audit.
9. Route must-look findings to Today, trust-blocking issues to Blocked Agents, and decision-bearing findings to Recent Decisions or Needs Approval.
10. Stop if the requested fix would change accepted authority, source-of-truth contracts, file placement rules, or agent powers without approval.

## Source-of-Truth Steward

1. Read the durable record system under `source-of-truth/`, active agent status records, decision index, linked decisions, and source-of-truth governance docs.
2. Detect broken or ambiguous links, missing backlinks, stale status summaries, orphan artifacts, index drift, and conflicting durable records.
3. Distinguish issues the agent can document immediately from issues that require a human decision because they would change approved records or Accepted decisions.
4. Draft the smallest corrective action for each integrity problem instead of bundling multiple hygiene failures into one escalation.
5. Route active integrity blockers to Blocked Agents, decision-bearing hygiene issues to Recent Decisions or Needs Approval, and the highest-priority system-health summary to Today.
6. Stop if fixing the problem would require silently changing an Accepted decision, inventing missing GitHub state, or writing outside approved durable paths.

## Decision Record Steward

1. Read the decision index, recent decision records, linked blockers, and dependent projects or issues.
2. Detect missing ADRs, stale decisions, conflicting Accepted decisions, and decisions that should be superseded or reviewed.
3. Draft the minimal decision-hygiene action needed for each finding.
4. Route decision changes and conflicts to Recent Decisions, and route required human review items to Needs Approval or Blocked Agents.
5. Update or draft decision records only when the governing SOP and approval state allow it.
6. Stop if an Accepted conflict exists until the human resolves the conflict explicitly.

## Related

- [[agent-schedules|Agent Schedules]]
- [[agent-output-contracts|Agent Output Contracts]]
- [[agent-dashboard-routing|Agent Dashboard Routing]]
- [[agent-approval-rules|Agent Approval Rules]]
- [[memory-and-decision-hygiene|Memory And Decision Hygiene]]

<!-- Reviewed and Approved on -->

---
aliases:
  - Memory And Decision Hygiene
  - Memory Hygiene
  - Decision Hygiene
---

# Memory And Decision Hygiene

## Before You Edit This File

Frame of mind: This file teaches agents what to remember and where. It should prevent decisions, daily memory, runtime status, and artifacts from blurring together.

Ask yourself before changing it:
- Is this a status update, journal note, decision record, or artifact?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- What minimum durable write is required?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- What must be linked instead of duplicated?
  Prompt: Name the exact files or records someone should open before trusting this answer.

Cross-check [[daily-journal|Daily Journal]], [[Decision Record System]], [[source-of-truth/files-and-folders|Files And Folders]], and [[agent-status-rules|Agent Status Rules]].


This note consolidates how agents should manage durable memory and decisions.

Use it with [[agents-overview|Agents Overview]], [[agent-workflows|Agent Workflows]], [[agent-output-contracts|Agent Output Contracts]], [[daily-journal|Daily Journal]], [[operating-model/decision-record-system/README|Decision Record System]], and [[decision-record-rules|Decision Record Rules]].

## Purpose

The repo already distinguishes between:

- runtime state in `source-of-truth/agent-status/`
- durable recurring agent memory in `source-of-truth/memory/`
- daily or operational memory in `source-of-truth/journals/`
- load-bearing decisions in `source-of-truth/decisions/`

This note turns that split into one practical operating rule so agents know what to write, where to write it, and when to stop.

## Core Rule

If a fact needs to be remembered after the current run, it must be written to an approved durable location.

Use this split:

- write runtime execution state to `source-of-truth/agent-status/`
- write recurring agent memory, such as Linda's score history, to `source-of-truth/memory/`
- write daily memory and operating context to `source-of-truth/journals/`
- write load-bearing decisions to `source-of-truth/decisions/`

Do not leave durable memory only in:

- chat output
- temporary issue comments
- terminal summaries
- dashboard render state

## Daily Memory Hygiene Requirement

Every daily run must write or update a daily memory record, usually through [[daily-journal|Daily Journal]].

Each daily run should write these clear sections:

1. `Decisions made`
2. `Assumptions changed`
3. `Open questions`
4. `New risks`
5. `Tickets created`
6. `Tickets closed`

If a section has no updates, write `None` instead of omitting it.

## What Goes In Memory Versus Decisions

### Write To Daily Memory

Write to daily memory when the information is:

- a daily operating fact
- a progress change
- a blocker or unblock event
- a changed assumption not yet accepted as durable policy
- an open question
- a newly observed risk
- a ticket created or closed
- a launch observation, surprise, or lesson

### Write To Recurring Agent Memory

Write to recurring agent memory when the information is:

- specific to one named agent's continuity across runs
- a score history, prior finding, or carried-forward audit item
- useful for comparing today's run with yesterday's run
- not a load-bearing decision and not a full daily journal

Linda's repo-health score history belongs in [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]].

### Write To A Decision Record

Write to a decision record when the information is:

- a load-bearing decision
- a durable change in strategy, architecture, policy, workflow, or operating rule
- a decision other work will depend on later
- a supersession or rejection of a prior durable decision
- a decision needed to resolve a blocked path that affects more than one artifact or workflow

### Write To Both

Write to both the daily memory record and a decision record when:

- a durable decision was made during the run
- an Accepted decision was updated, superseded, or rejected
- a major assumption changed and that change now governs future work

In that case:

1. write the daily memory summary in the journal
2. create or update the decision record
3. link the journal and decision to each other
4. update any affected issue, project, or status file

## Daily Memory Sections

### Decisions Made

For each item, state:

- the exact decision
- current status
- related issue or issues
- related decision record when one exists
- why it matters

### Assumptions Changed

For each item, state:

- old assumption
- new assumption
- what changed the assumption
- what work is affected
- whether a durable decision is now required

### Open Questions

For each item, state:

- the question
- why it matters
- who or what should answer it
- whether it blocks ranking, approval, implementation, launch, or cost decisions

### New Risks

For each item, state:

- the risk
- affected work
- severity or risk level when known
- mitigation or containment path
- whether human approval or risk acceptance is required

### Tickets Created

For each item, state:

- ticket reference
- reason it was created
- related idea, project, or decision
- next action

If GitHub is placeholder-only, record `Missing` instead of inventing an issue identifier and state the file-first fallback.

### Tickets Closed

For each item, state:

- ticket reference
- reason it was closed
- whether it was completed, merged, rejected, duplicated, killed, or superseded
- what durable records were updated as part of closure

## Daily Memory Template

```md
## Memory and decision hygiene

### Decisions made
- <decision, status, linked issue or decision, why it matters>

### Assumptions changed
- <old assumption -> new assumption, trigger, affected work, decision needed or None>

### Open questions
- <question, why it matters, owner, blocking effect>

### New risks
- <risk, affected work, severity, mitigation, approval need>

### Tickets created
- <ticket reference or Missing, why created, related record, next action>

### Tickets closed
- <ticket reference or Missing, closure reason, closure type, related updates>
```

## Decision Hygiene Rules

Agents must:

- read relevant decisions before changing durable behavior
- update an existing decision instead of restating it elsewhere
- stop if Accepted decisions conflict
- create or propose a decision record when work depends on an undocumented durable decision
- update `source-of-truth/decisions/index.md` when a decision record changes

Agents must not:

- treat a journal note as a replacement for a decision record
- silently replace an Accepted decision with a new assumption
- leave a durable decision only in a daily memory note

## Linking Rules

Every memory-hygiene block should link to the records it changes or references:

- issue
- idea
- decision
- project
- journal
- status file

Prefer wiki links for repo-native records and normal issue references or URLs for tickets.

## Stop Conditions

Stop and escalate when:

- a daily run needs to record a durable decision but no decision record exists
- two Accepted decisions conflict
- journal claims would contradict the authoritative decision or status record
- a required ticket reference is missing for GitHub-dependent execution
- the agent cannot write to the approved durable path

## Related

- [[agents-overview|Agents Overview]]
- [[agent-workflows|Agent Workflows]]
- [[agent-output-contracts|Agent Output Contracts]]
- [[daily-journal|Daily Journal]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[decision-record-rules|Decision Record Rules]]

<!-- Reviewed and Approved on -->

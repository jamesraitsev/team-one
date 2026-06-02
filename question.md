---
aliases:
  - Structural Questions
  - Repo Questions
---

# Questions You Must Answer Before Expanding This Repo

This repo is already coherent enough to read, but it is not yet structurally settled.

The main problem is not formatting. The main problem is that several concepts exist in more than one place, and some parts of the repo describe a live operating system while other parts still describe a future one.

Read this file first, then answer these questions before adding much more structure.

## What The Current Structure Appears To Be

Right now the repo is split into six conceptual layers:

- `operating-model/` defines the system rules.
- `dashboard/` defines a dashboard that reads and acts on those rules.
- `agents/` defines recurring operator agents.
- `sop-library/` defines reusable procedures those agents may use.
- `source-of-truth/` is supposed to hold live durable records.
- `tech/` implies an eventual software product or implementation target.

That is a reasonable shape, but several boundaries are still unresolved.

## The Biggest Overlaps You Need To Resolve

These are not formatting issues. These are authority issues.

### 1. Is This Repo A Spec, A Live Operating System, Or Both

Overlap to review:

- [[operating-model/README|Operating Model Overview]]
- [[dashboard/README|Dashboard Specification]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[tech/README|Tech]]

Questions:

1. Is this repo primarily a design/specification for a future system?
2. Is it already the live system of record?
3. If it is both, what is the rule for separating `future design` from `current truth`?
4. What should be considered executable today versus merely aspirational?

Resolve explicitly:

- whether this repo is `spec-first`, `live-first`, or `hybrid`
- where speculative design belongs
- where active operational records belong

### 2. Which Layer Has Final Authority When Docs Conflict

Overlap to review:

- [[operating-model/agent-responsibilities|Agent Responsibilities]]
- [[operating-model/guardrails/guardrails|Guardrails]]
- [[operating-model/guardrails/approval-boundaries|Approval Boundaries]]
- [[agents/agent-approval-rules|Agent Approval Rules]]
- [[operating-model/decision-gates|Decision Gates]]

Questions:

1. If an approval rule appears in both `operating-model/` and `agents/`, which one wins?
2. Should `agents/` restate rules, or only specialize them?
3. Are `guardrails`, `approval boundaries`, `agent responsibilities`, and `decision gates` four distinct concepts, or are they partially duplicate views of the same concept?
4. Which of these files is canonical, and which ones should be derivative summaries?

Resolve explicitly:

- one precedence order for rule conflicts
- which files are authoritative
- which files may summarize but not define

### 3. What The Dashboard Actually Is Relative To The Operating Model

Overlap to review:

- [[operating-model/dashboard-model|Dashboard Model]]
- [[dashboard/README|Dashboard Specification]]
- [[dashboard/dashboard-tabs|Dashboard Tabs]]
- [[dashboard/dashboard-card-contract|Dashboard Card Contract]]

Questions:

1. Is `operating-model/dashboard-model.md` the conceptual summary, while `dashboard/` is the build spec?
2. Or are both trying to define the same system at different levels of detail?
3. Should `dashboard/` remain top-level, or should it live under `operating-model/` if it is only one subsystem of the model?
4. What should exist in exactly one place versus referenced from another?

Resolve explicitly:

- whether `dashboard-model.md` is canonical or introductory
- whether `dashboard/` is a subsystem spec or a parallel authority
- whether both locations should continue to exist

### 4. Whether Agents Define Workflows Or SOPs Define Workflows

Overlap to review:

- [[agents/agent-workflows|Agent Workflows]]
- [[agents/agent-roster|Agent Roster]]
- [[sop-library/README|SOP Library]]
- [[sop-library/product/backlog-grooming|Backlog Grooming]]
- [[sop-library/governance/source-of-truth-check|Source Of Truth Check]]

Questions:

1. Should agents contain their own step-by-step workflows?
2. Or should agents mainly orchestrate SOPs and contain only scheduling, routing, and escalation logic?
3. When an agent workflow and an SOP disagree, which one wins?
4. Are some agent workflows currently duplicating SOP content that should not be duplicated?

Resolve explicitly:

- whether SOPs are the procedural authority
- whether agent docs should describe orchestration only
- what belongs in an agent workflow versus an SOP

### 5. What The Real Execution Backlog Is

Overlap to review:

- [[source-of-truth/github|GitHub]]
- [[dashboard/dashboard-open-questions|Dashboard Open Questions]]
- [[operating-model/README|Operating Model Overview]]
- [[source-of-truth/files-and-folders|Files And Folders]]

Questions:

1. Is GitHub truly required for execution, or merely the default option?
2. Can this system operate file-first without GitHub and still be considered complete?
3. If GitHub stays placeholder-only for now, which docs should stop speaking as if the issue system is already live?
4. If GitHub is mandatory, what is the minimum configuration milestone that flips the repo from conceptual to operational?

Resolve explicitly:

- whether backlog truth is `GitHub-first`, `file-first`, or `dual`
- what happens before GitHub is configured
- which docs need to be softened or hardened accordingly

### 6. What The Minimum Live Source Of Truth Actually Is

Overlap to review:

- [[source-of-truth/files-and-folders|Files And Folders]]
- the actual `source-of-truth/` directory

Current mismatch:

- the rules define `journals/`, `projects/`, `research/`, and `artifacts/`
- the repo currently has only `agent-status/`, `decisions/`, and `ideas/`

Questions:

1. Are the missing folders intentionally deferred?
2. Are they mandatory parts of v1, or only future capacity?
3. Should the contract define only folders that exist now?
4. Or should the contract stay broader than the current filesystem on purpose?

Resolve explicitly:

- the smallest set of durable folders required right now
- whether absent folders are omissions or intentional future slots
- whether the contract should describe current state or target state

### 7. What Belongs In Memory, Journals, Decisions, And Status

Overlap to review:

- [[agents/memory-and-decision-hygiene|Memory And Decision Hygiene]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[source-of-truth/files-and-folders|Files And Folders]]

Questions:

1. What is the exact boundary between runtime status, daily memory, and durable decisions?
2. What information currently risks being recorded in more than one place?
3. Are journals required for every meaningful run, or only for daily/weekly summaries?
4. When should a journal entry exist without a decision record?
5. When should a decision record exist without a journal entry?

Resolve explicitly:

- one sentence definition for `status`, `journal`, `decision`, and `artifact`
- the smallest durable write required for each kind of event
- what must never be duplicated

### 8. Whether This Repo Needs A Canonical Open-Questions System

Overlap to review:

- [[dashboard/dashboard-open-questions|Dashboard Open Questions]]
- [[tech/README|Tech]]
- unresolved placeholders across [[source-of-truth/github|GitHub]]

Questions:

1. Why do unresolved structural questions currently live in multiple places?
2. Should there be one canonical place for unresolved system questions?
3. How does a question move from `open` to `resolved`?
4. Where is the durable record of the resolution?

Resolve explicitly:

- one home for open structural questions
- one workflow for resolving them
- one place where the resulting decision is recorded

### 9. What `tech/README.md` Is Supposed To Be

Overlap to review:

- [[tech/README|Tech]]
- [[dashboard/README|Dashboard Specification]]
- [[operating-model/README|Operating Model Overview]]

Questions:

1. Is `tech/README.md` for the implementation of the dashboard only?
2. Is it for the broader operating system as software?
3. Is it premature to keep this file at all before the product boundary is decided?
4. If the repo remains documentation-first for a while, what decisions belong here versus nowhere yet?

Resolve explicitly:

- whether `tech/` is active, deferred, or out of scope
- what software artifact it is intended to describe
- what would trigger it becoming a real source of truth

### 10. What The Top-Level Folders Mean As Boundaries

Review the top-level folders together:

- `agents/`
- `dashboard/`
- `operating-model/`
- `sop-library/`
- `source-of-truth/`
- `tech/`

Questions:

1. Which of these are governing layers?
2. Which are runtime layers?
3. Which are implementation layers?
4. Which are reusable libraries versus instance-specific records?
5. Could a new person explain the difference between `operating-model/`, `agents/`, and `sop-library/` in under two minutes?

Resolve explicitly:

- one sentence purpose for each top-level folder
- whether any top-level folder should move under another one
- whether any folder exists only because the system was designed in numbered steps rather than as a stable information architecture

## Questions About What To Merge, Split, Or Delete

Answer these directly. They are structural.

1. Should `dashboard/` stay separate from `operating-model/`, or is that a false separation?
2. Should `agents/` remain its own top-level area, or is it really `operating-model/agents/`?
3. Should `tech/README.md` exist before implementation starts?
4. Should open questions live in one place instead of appearing in dashboard and tech contexts separately?
5. Should agent workflow steps be shortened if SOPs are the real procedure source?
6. Should the source-of-truth contract be narrowed to only currently active folders?

## Required Review Pairs

Review these pairs together and record a resolution for each pair:

1. [[operating-model/dashboard-model|Dashboard Model]] and [[dashboard/README|Dashboard Specification]]
2. [[operating-model/agent-responsibilities|Agent Responsibilities]] and [[agents/agent-approval-rules|Agent Approval Rules]]
3. [[agents/agent-workflows|Agent Workflows]] and [[sop-library/README|SOP Library]]
4. [[agents/memory-and-decision-hygiene|Memory And Decision Hygiene]] and [[operating-model/decision-record-system/README|Decision Record System]]
5. [[source-of-truth/github|GitHub]] and [[dashboard/dashboard-open-questions|Dashboard Open Questions]]
6. [[source-of-truth/files-and-folders|Files And Folders]] and the actual `source-of-truth/` directory
7. [[tech/README|Tech]] and [[dashboard/README|Dashboard Specification]]

For each pair, answer:

- which file is canonical
- which file is derivative
- whether both should continue to exist
- what exact structural change would reduce ambiguity

## The One Question Under Everything Else

What is the smallest coherent version of this system that you actually want to run now?

Until that is answered, the repo risks continuing to grow as a complete theoretical operating system rather than a sharply bounded one.

## Write Your Answers Somewhere Durable

Do not answer these only in chat.

After answering, decide where the durable resolution belongs:

- a decision record in [[operating-model/decision-record-system/README|Decision Record System]]
- an update to [[source-of-truth/files-and-folders|Files And Folders]]
- an update to [[operating-model/README|Operating Model Overview]]
- an update to [[dashboard/README|Dashboard Specification]]
- an update to [[tech/README|Tech]]

## Related

- [[operating-model/README|Operating Model Overview]]
- [[dashboard/README|Dashboard Specification]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]
- [[dashboard/dashboard-open-questions|Dashboard Open Questions]]
- [[tech/README|Tech]]

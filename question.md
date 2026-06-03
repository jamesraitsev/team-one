---
aliases:
  - Structural Questions
  - Repo Questions
---

# Questions You Must Answer Before Expanding This Repo

## Before You Edit This File

Frame of mind: This is the structural thinking file. Treat it as the place where ambiguity is named before it becomes accidental architecture.

Ask yourself before changing it:
- Is this question about live truth, future design, or folder authority?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.
- Would resolving it require a decision record in `source-of-truth/decisions/`?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Does the answer clarify what to fill next rather than creating more theory?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.

Cross-check [[lookherefirst|Look Here First]], [[operating-model/README|Operating Model Overview]], and [[source-of-truth/decisions/index|Decision Index]].


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
- [[dashboard/common-spec|Common Dashboard Spec]]
- [[dashboard/common-spec|Common Dashboard Spec]]

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
- [[dashboard/README|Dashboard]]
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

- [[dashboard/README|Dashboard]]
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
5. [[source-of-truth/github|GitHub]] and [[dashboard/README|Dashboard]]
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

## Opinions And Recommended Resolutions

These opinions are based on the current repo shape, including `AGENTS.md`, `operating-model/`, `dashboard/`, `agents/`, `sop-library/`, `source-of-truth/`, `tech/`, `gtm-council/`, `review later/`, and root `artifacts/`.

### 1. Is This Repo A Spec, A Live Operating System, Or Both

Opinion: this repo should be treated as a `hybrid`, but with a strict split between governing specs and live records.

1. This repo is a design/specification for the operating system in `operating-model/`, `dashboard/`, `agents/`, `sop-library/`, and `tech/`.
2. It is already a live system of record only for accepted decisions, agent status indexes, source-of-truth contracts, SOP definitions, and durable artifacts that are intentionally stored here.
3. The separation rule should be: `source-of-truth/` plus Accepted decision records define current truth; `operating-model/`, `dashboard/`, `agents/`, and `sop-library/` define how the system should operate; `tech/` is deferred target-state design until implementation begins.
4. Executable today means file-first documentation operations: decision records, SOP updates, status records, source-of-truth checks, and dashboard specs. GitHub execution, dashboard automation, and app implementation are aspirational until configured and built.

Resolution: keep the repo `hybrid`, but label the live parts explicitly. Do not let future-facing dashboard or tech language imply a capability is already operational.

### 2. Which Layer Has Final Authority When Docs Conflict

Opinion: the repo needs a written precedence order.

1. If an approval rule appears in both `operating-model/` and `agents/`, the global rule in `operating-model/guardrails/` or `operating-model/agent-responsibilities.md` wins. `agents/agent-approval-rules.md` may only specialize within that boundary.
2. `agents/` should restate only enough to make agent execution clear. It should not define new global approval policy.
3. `guardrails`, `approval boundaries`, `agent responsibilities`, and `decision gates` are distinct but overlapping views: guardrails define safety principles, approval boundaries define action classes, agent responsibilities define stage behavior, and decision gates define lifecycle transition evidence.
4. Canonical files should be: `operating-model/guardrails/guardrails.md` for global safety posture, `operating-model/guardrails/approval-boundaries.md` for approval classes, `operating-model/agent-responsibilities.md` for stage-level agent authority, and `operating-model/decision-gates.md` for lifecycle movement. `agents/agent-approval-rules.md` should be derivative and agent-specific.

Resolution: add a short authority note to `operating-model/README.md` and `agents/agent-approval-rules.md` saying agent rules cannot weaken operating-model guardrails.

### 3. What The Dashboard Actually Is Relative To The Operating Model

Opinion: `operating-model/dashboard-model.md` should be the conceptual dashboard model, while `dashboard/` should remain the build/specification folder.

1. Yes, `operating-model/dashboard-model.md` is the conceptual summary.
2. `dashboard/` is not a duplicate authority if it is framed as the detailed Step 6 subsystem spec.
3. `dashboard/` should remain top-level because it is large enough to be a subsystem, and `operating-model/README.md` already explains why it is top-level.
4. Lifecycle concepts, data precedence, and approval requirements should exist once in `operating-model/`. Tab layout, card contracts, actions, metrics, and MVP scope should exist once in `dashboard/` and reference the operating model.

Resolution: keep both locations. Make `dashboard-model.md` explicitly introductory and make `dashboard/common-spec.md` the detailed read/write contract for implementation.

### 4. Whether Agents Define Workflows Or SOPs Define Workflows

Opinion: agents should orchestrate; SOPs should define reusable procedure.

1. Agents should contain step-by-step workflow only for agent orchestration: what to read, what to route, when to stop, what to update, and which SOPs to invoke.
2. Agents should not duplicate reusable procedure steps that belong in `sop-library/`.
3. If an agent workflow and SOP disagree, use this precedence: Accepted decision record, operating-model guardrail, source-of-truth contract, SOP, then agent workflow.
4. Yes, some agent workflow content is close to procedural SOP content. It is acceptable as a routing skeleton, but detailed execution should move into SOPs as those SOPs mature.

Resolution: shorten agent workflows over time by replacing procedural detail with links to SOPs and retaining only scheduling, routing, status, and escalation logic.

### 5. What The Real Execution Backlog Is

Opinion: the repo should operate `file-first now`, with GitHub as the intended executable backlog once configuration is real.

1. GitHub is not truly required for current documentation operations. It is required only for issue-backed execution workflows that claim to act on live tickets.
2. Yes, the system can operate file-first and still be complete for v1 documentation governance.
3. If GitHub stays placeholder-only, docs should stop saying live issue actions are available. They can say GitHub is the default target backlog once configured.
4. If GitHub is mandatory, the minimum milestone is: `github_repo`, auth method, issue labels, issue template, sync rules, and dashboard conflict behavior are configured and validated.

Resolution: change the current posture to `file-first operational, GitHub-ready`. Harden it to GitHub-first only after the GitHub contract is populated and tested.

### 6. What The Minimum Live Source Of Truth Actually Is

Opinion: the current live source-of-truth folders are intentionally minimal, but the contract overstates what exists today.

1. The missing folders appear intentionally deferred, not necessarily mistakes.
2. For v1, mandatory folders should be only `agent-status/`, `decisions/`, and `ideas/`.
3. The contract should define active folders separately from future approved folders.
4. The contract can stay broader than the filesystem, but only if it labels inactive folders as allowed future capacity.

Resolution: update `source-of-truth/files-and-folders.md` to split `Active folders today` from `Approved future folders`.

### 7. What Belongs In Memory, Journals, Decisions, And Status

Opinion: the repo already has the right conceptual split, but it needs one compact operating definition.

1. Runtime status is current execution state; journals are daily operating memory; decisions are load-bearing choices; artifacts are durable outputs or deliverables.
2. The main duplication risk is blockers, approval state, assumptions, and decisions being repeated across status files, journals, issue comments, and decision records.
3. Journals should be required for daily/weekly operating runs, not for every small meaningful action.
4. A journal entry should exist without a decision record when the update is progress, observation, blocker movement, or a non-final assumption.
5. A decision record should exist without a journal entry when a durable decision is made outside a daily run or when the decision is imported from prior approved context.

Resolution: keep `agents/memory-and-decision-hygiene.md` as the practical guide, and make `source-of-truth/files-and-folders.md` point to it for write-boundary examples.

Definitions:

- `status`: current execution state for an active agent or execution context.
- `journal`: daily or weekly operating memory that preserves what changed.
- `decision`: durable, load-bearing choice that future work must obey.
- `artifact`: durable output produced by work and linked back to its governing record.

Smallest durable write:

- Status change: update the relevant file in `source-of-truth/agent-status/`.
- Daily operating change: update or create the relevant journal when journals are active.
- Load-bearing decision: create or update a decision record in `source-of-truth/decisions/`.
- Deliverable: store it as an artifact only when it has a backlink to a governing idea, project, decision, journal, or issue.

Never duplicate the authoritative decision text outside `source-of-truth/decisions/`; summaries may link to it.

### 8. Whether This Repo Needs A Canonical Open-Questions System

Opinion: yes, open structural questions need one canonical home.

1. Open questions currently live in multiple places because each subsystem captured its own unresolved build questions as it was created.
2. There should be one canonical place for unresolved system questions.
3. A question should move from `open` to `resolved` only when an Accepted decision record exists or the governing doc is updated with an explicit resolution.
4. The durable record of the resolution belongs in `source-of-truth/decisions/` when it changes structure, authority, or execution behavior.

Resolution: make root `question.md` the current structural open-question register until replaced by a formal `source-of-truth/open-questions/` or decision-index workflow. Dashboard-specific questions may remain in `dashboard/README.md`, but must link back here for structural questions.

### 9. What `tech/README.md` Is Supposed To Be

Opinion: `tech/README.md` is premature as a live source of truth, but useful as a deferred implementation intake template.

1. It is not for the dashboard only unless the repo decides the dashboard is the first software artifact.
2. It currently reads like broader operating-system software planning.
3. It should remain, but be clearly marked `Deferred` until a build decision is accepted.
4. If the repo remains documentation-first, only implementation boundary decisions belong there: app target, platform, data sources, auth model, deployment posture, and integration choices. Empty stack placeholders should not be treated as decisions.

Resolution: keep `tech/README.md`, add a status note that it is not authoritative until implementation starts, and link it to the decision that activates software build work.

### 10. What The Top-Level Folders Mean As Boundaries

Opinion: the top-level folders are mostly valid, but `gtm-council/`, `review later/`, and root `artifacts/` need classification.

1. Governing layers: `operating-model/`, `dashboard/`, `agents/`, `sop-library/`, `source-of-truth/`, and `AGENTS.md`.
2. Runtime layers: `source-of-truth/agent-status/` and, once active, `source-of-truth/journals/`, `source-of-truth/projects/`, and GitHub Issues.
3. Implementation layers: `tech/` and any future app/code folders.
4. Reusable libraries: `sop-library/` and potentially `gtm-council/` if retained as a reusable evaluation framework. Instance-specific records: `source-of-truth/`, root `artifacts/`, and anything under `review later/`.
5. A new person could explain `operating-model/`, `agents/`, and `sop-library/` in under two minutes only if the repo adds a short boundary table to the root or operating-model README.

Recommended one-sentence purposes:

- `operating-model/`: governing rules for lifecycle, approvals, autonomy, dashboard concepts, decisions, and source-of-truth behavior.
- `dashboard/`: detailed specification for the decision-centered dashboard subsystem.
- `agents/`: agent roster, cadence, routing, outputs, and agent-specific operating rules.
- `sop-library/`: reusable procedures agents and humans can run across projects.
- `source-of-truth/`: durable live records and accepted decisions.
- `tech/`: deferred implementation planning for software build work.
- `gtm-council/`: reusable GTM evaluation framework, currently separate from the main operating model unless explicitly integrated.
- `review later/`: holding area for older or deferred material; not authoritative.
- `artifacts/`: generated deliverables; should either move under `source-of-truth/artifacts/` when durable or remain ignored/temporary when not.

Resolution: no top-level folder must move immediately. The highest-value change is to mark `review later/` and root `artifacts/` as non-authoritative, then decide whether `gtm-council/` is active or archived.

## Opinions On What To Merge, Split, Or Delete

1. `dashboard/` should stay separate from `operating-model/`; the separation is useful if authority is clarified.
2. `agents/` should remain top-level because agents are a major subsystem, but it must be explicitly derivative of operating-model guardrails.
3. `tech/README.md` should exist before implementation starts only as a deferred intake template, not as an active decision source.
4. Open questions should live in one canonical place for structural questions. Subsystem-specific open questions can remain local if they link to the canonical register when structural.
5. Agent workflow steps should be shortened as SOPs mature. Agent docs should describe orchestration, routing, status, and stop conditions.
6. The source-of-truth contract should not be narrowed to only currently active folders; it should be split into active-now and approved-future folders.

## Opinions On Required Review Pairs

1. `operating-model/dashboard-model.md` and `dashboard/README.md`: `dashboard-model.md` is canonical for conceptual lifecycle dashboard behavior; `dashboard/README.md` is canonical for the dashboard subsystem spec. Keep both. Reduce ambiguity by adding a note that `dashboard/` implements the model and may not redefine lifecycle authority.
2. `operating-model/agent-responsibilities.md` and `agents/agent-approval-rules.md`: `agent-responsibilities.md` is canonical for stage-level authority; `agent-approval-rules.md` is derivative and agent-specific. Keep both. Reduce ambiguity by adding precedence language.
3. `agents/agent-workflows.md` and `sop-library/README.md`: `sop-library/README.md` is canonical for reusable procedures; `agent-workflows.md` is canonical for agent orchestration. Keep both. Reduce ambiguity by replacing repeated procedure details with SOP links.
4. `agents/memory-and-decision-hygiene.md` and `operating-model/decision-record-system/README.md`: the decision-record system is canonical for durable decisions; memory hygiene is canonical for agent write behavior across status, journals, and decisions. Keep both. Reduce ambiguity by adding a decision/status/journal/artifact boundary table to the source-of-truth contract.
5. `source-of-truth/github.md` and `dashboard/README.md`: `source-of-truth/github.md` is canonical for GitHub configuration and issue contract; dashboard open questions are derivative build questions. Keep both. Reduce ambiguity by marking GitHub `not live until configured`.
6. `source-of-truth/files-and-folders.md` and the actual `source-of-truth/` directory: the file contract is canonical, but it currently describes target capacity more than live state. Keep both. Reduce ambiguity by splitting active folders from approved future folders.
7. `tech/README.md` and `dashboard/README.md`: `dashboard/README.md` is canonical for dashboard requirements; `tech/README.md` is a deferred implementation template. Keep both only if `tech/README.md` is clearly marked deferred.

## Opinion On The One Question Under Everything Else

The smallest coherent version to run now is:

1. A documentation-first, file-first operating model.
2. `source-of-truth/decisions/` as the durable decision layer.
3. `source-of-truth/agent-status/` as the active runtime status layer.
4. `sop-library/` as the reusable procedure layer.
5. `agents/` as curator orchestration specs, not autonomous executors.
6. `dashboard/` as a written decision-dashboard spec, not yet an app.
7. `tech/` as deferred until a build decision is accepted.
8. GitHub as configured repository storage and future issue backlog, but not the required execution source until the GitHub contract is populated.

This is the version that can actually run now without pretending a dashboard app, issue automation, journals, projects, research folders, or hosted software already exists.

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
- [[dashboard/README|Dashboard]]
- [[tech/README|Tech]]

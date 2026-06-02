---
aliases:
  - Decision Record Rules
  - DR Rules
---

# Decision Record Rules

These rules define when decision records are required and how they are maintained.

Use them with:

- [[operating-model/decision-record-system/README|Decision Record System]]
- [[decision-record-template|Decision Record Template]]
- [[decision-record-naming|Decision Record Naming]]
- [[decision-record-index-template|Decision Record Index Template]]
- [[source-of-truth/decisions/index|Decision Index]]

## When To Create A Decision Record

Create a decision record when:

- an Accepted choice will constrain later work
- a decision changes strategy, architecture, policy, workflow, integration behavior, or launch rules
- a decision affects more than one artifact, issue, project, or stage
- future agents would otherwise have to infer the reasoning from chat or issue comments
- a lifecycle gate produces a durable operating decision
- work is blocked by an undocumented decision

## When Not To Create One

Do not create a decision record for:

- routine status updates
- temporary implementation details with no durable impact
- local experiments that produced no governing decision
- duplicate restatements of an existing Accepted decision
- one-off notes that belong in a journal, project doc, or issue comment instead

If the decision is not load-bearing, it probably belongs somewhere other than `source-of-truth/decisions/`.

## How To Update An Existing Decision

When a decision changes but remains the same record:

1. update the existing file in `source-of-truth/decisions/`
2. revise the rationale, dependencies, consequences, or review trigger as needed
3. keep the same stable ID
4. update `source-of-truth/decisions/index.md`
5. update linked project, issue, or journal notes if they rely on the changed content

Do not create a second record just to fix wording or append ordinary clarifications.

## How To Supersede A Decision

Supersede a decision when the new decision replaces the old one rather than merely clarifying it.

Required behavior:

1. create a new decision record with a new stable ID
2. mark the old record `Superseded`
3. link the old record in the new record's `Supersedes` section
4. link the new record in the old record's `Superseded By` section
5. update `source-of-truth/decisions/index.md`
6. update any affected issue, project, or dashboard references

## How To Reject A Proposed Decision

When a proposed decision is not accepted:

1. keep the same record
2. set `Status` to `Rejected`
3. explain why it was rejected
4. link any replacement proposal if one exists
5. update `source-of-truth/decisions/index.md`

Rejected decisions remain useful because they preserve reasoning and prevent repeated debate.

## How To Handle Conflicting Accepted Decisions

If two Accepted decision records conflict:

1. stop the dependent work
2. report the conflict explicitly
3. link both decisions in the report
4. do not silently choose one
5. create a new proposed decision only after the conflict is visible to the human approver

Conflicting Accepted decisions are a source-of-truth failure and should surface in the dashboard.

## How To Handle Work That Depends On An Undocumented Decision

If work depends on a durable decision that is not documented:

1. stop before changing the durable behavior
2. create or propose a decision record
3. link the triggering idea, issue, project, journal, or source-of-truth note
4. resume only when the decision is recorded at the appropriate status

## How To Link Decisions To Other Notes

Use these linking rules:

| Target | Preferred format |
| --- | --- |
| Idea | `[[idea-name|Idea Name]]` |
| Decision | `[[dr-0001-short-slug|Decision Title]]` when an alias improves readability |
| Project | `[[project-name|Project Name]]` |
| Journal | `[[2026-06-01-journal|2026-06-01 Journal]]` or the existing journal note name |
| Source-of-truth docs | `[[files-and-folders|Files And Folders]]`, `[[github|GitHub]]`, or direct wiki links to the relevant note |
| GitHub issue | `#123` or a normal GitHub URL when needed |

Every decision record must include a `Related` section.

## How Agents Should Read Decisions Before Acting

Agents must read relevant decision records before changing:

- lifecycle rules
- source-of-truth rules
- dashboard behavior
- permissions or approval boundaries
- folder contracts
- data models
- integrations
- launch rules

Reading behavior should follow this order:

1. read the linked decision records in `source-of-truth/decisions/`
2. read the related idea, project, journal, and source-of-truth notes
3. check `source-of-truth/decisions/index.md` for newer or superseding records
4. stop if Accepted decisions conflict or if a required durable decision is missing

## Dashboard Behavior For Decisions

The dashboard should show:

- recent decisions
- proposed decisions awaiting approval
- accepted load-bearing decisions
- superseded decisions
- conflicting decisions
- decisions with review triggers
- work items blocked by missing decisions
- work items affected by a changed decision

## Related

- [[operating-model/decision-record-system/README|Decision Record System]]
- [[decision-record-template|Decision Record Template]]
- [[decision-record-naming|Decision Record Naming]]
- [[source-of-truth/decisions/index|Decision Index]]

<!-- Reviewed and Approved on -->

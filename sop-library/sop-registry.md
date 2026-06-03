---
aliases:
  - SOP Registry
---

# SOP Registry

## Before You Edit This File

Frame of mind: This is the inventory of active SOPs. It should be accurate enough that agents can choose procedures without guessing.

Ask yourself before changing it:
- Is every active SOP listed with version, owner, inputs, outputs, and approval boundaries?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Do categories match [[categories|SOP Categories]]?
  Prompt: State whether this belongs in a reusable SOP, an agent workflow, or a one-time record.
- Did any SOP file change without this registry changing too?
  Prompt: State whether this belongs in a reusable SOP, an agent workflow, or a one-time record.

Cross-check [[sop-library/README|SOP Library]], [[sop-usage-rules|SOP Usage Rules]], and every SOP file.


This registry is the canonical index of active SOPs in this repo.

| SOP name | Category | File path | Lifecycle stage | Used by agents | Required inputs | Output artifacts | Human approval required | Related decision records |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Feature Delivery | SDLC | `sop-library/sdlc/feature-delivery.md` | Build | delivery, coding, release agents | approved plan, related issue, linked project, applicable decisions | issue updates, delivery notes, artifact links, release inputs | yes for scope change or launch-impacting deviation | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Testing | SDLC | `sop-library/sdlc/testing.md` | Build | delivery, QA, review agents | implementation target, acceptance criteria, risk areas | test evidence, defect log, issue update | yes when risk acceptance or skipped coverage is required | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Visual Review | SDLC | `sop-library/sdlc/visual-review.md` | Build | frontend, QA, review agents | UI target, expected references, environment access | visual review notes, issue update, artifact links | yes for intentional visual deviation from approved behavior | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Security Review | SDLC | `sop-library/sdlc/security-review.md` | Build | security, delivery, review agents | scope, threat areas, dependency list, linked issue | security findings summary, issue update, decision follow-up if needed | yes for accepted risk or unresolved high-severity finding | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Release Checklist | SDLC | `sop-library/sdlc/release-checklist.md` | Launch | release, delivery, operations agents | approved build, checklist scope, rollback owner | launch checklist, release note links, go or no-go packet | yes for go or no-go | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Idea Triage | Product | `sop-library/product/idea-triage.md` | Idea | product, intake, research agents | raw idea, owner candidate, duplicate context | idea record, triage note, issue update | yes to accept into validation or reject | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Validation Planning | Product | `sop-library/product/validation-planning.md` | Validation | product, research, strategy agents | accepted idea, hypothesis set, constraints | validation plan, metric proposal, issue update | yes to proceed into plan after validation | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Backlog Grooming | Product | `sop-library/product/backlog-grooming.md` | Plan | product, delivery, planning agents | related issues, priorities, current stage labels | updated backlog structure, priority notes, issue updates | yes for reprioritization with material scope or investment impact | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Launch Planning | Growth | `sop-library/growth/launch-planning.md` | Launch | growth, marketing, launch agents | approved launch scope, target audience, release timing | launch plan, comms checklist, issue update | yes for public messaging or launch timing commitments | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Copy Review | Growth | `sop-library/growth/copy-review.md` | Launch | content, marketing, review agents | draft copy, audience, policy constraints | reviewed copy note, issue update, approval request | yes for final public copy approval | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Content Approval | Growth | `sop-library/growth/content-approval.md` | Launch | content, compliance, launch agents | approved draft, owner, publication channel | approval log, publication note, issue update | yes for final publication approval | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Daily Journal | Operations | `sop-library/operations/daily-journal.md` | Cross-stage | operations, project, coordination agents | date, active issues, related ideas and decisions | journal entry in `source-of-truth/journals/`, linked issue updates | no unless the journal raises a new risk needing escalation | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Weekly Review | Operations | `sop-library/operations/weekly-review.md` | Cross-stage | operations, PM, coordination agents | active initiatives, metrics, blockers | weekly review note, action list, issue updates | yes for escalation decisions that change commitments | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Dashboard Review | Operations | `sop-library/operations/dashboard-review.md` | Cross-stage | operations, analytics, coordination agents | dashboard fields, active issues, stage data | dashboard review note, exception list, issue updates | yes for intervention decisions beyond approved scope | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Decision Record Review | Governance | `sop-library/governance/decision-record-review.md` | Cross-stage | governance, architecture, review agents | candidate decision, linked idea or project, affected issues | updated decision record, issue update, action note | yes to accept or supersede a decision | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Source Of Truth Check | Governance | `sop-library/governance/source-of-truth-check.md` | Cross-stage | governance, review, coordination agents | linked records, issue state, artifact paths | discrepancy report, fixed links, issue update | yes when resolving a conflict requires changing approved records | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Agent Permission Review | Governance | `sop-library/governance/agent-permission-review.md` | Cross-stage | governance, security, delivery agents | planned action, active stage, risk context | permission review note, escalation request if needed | yes when the action crosses approval boundaries | [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]] |
| Repo Health Audit | Governance | `sop-library/governance/repo-health-audit.md` | Cross-stage | Linda, governance, source-of-truth agents | active repo docs, decision index, file contract, SOP registry, Linda memory | repo-health score, must-look findings, one-day work, challenge question, Linda memory update | yes when fixing findings would change accepted authority, file placement, or source-of-truth contracts | [[dr-0003-linda-repo-health-auditor-and-memory|Decision 003 - Linda Repo Health Auditor And Memory]] |

## Related

- [[sop-library/README|SOP Library]]
- [[categories|SOP Categories]]
- [[sop-template|SOP Template]]
- [[sop-usage-rules|SOP Usage Rules]]
- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

<!-- Reviewed and Approved on -->

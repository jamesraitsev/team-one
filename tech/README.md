---
aliases:
  - Tech
  - Tech Stack
  - Technology Decisions
---

# Tech

## Before You Edit This File

Frame of mind: This file is deferred until a real build decision exists. Do not fill stack details as guesses; fill them only when they become implementation commitments.

Ask yourself before changing it:
- What software artifact is being built: dashboard only, broader operating system, or something else?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.
- What data sources, auth, deployment, and security choices are actually decided?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Which decisions need to be recorded before engineering starts?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[dashboard/README|Dashboard Specification]], [[dashboard/common-spec|Common Dashboard Spec]], [[security-review|Security Review]], [[testing|Testing]], and [[source-of-truth/github|GitHub]].


Use this file to define the technology choices for the app before build work starts.

Fill in the sections below as decisions are made.

Use it with [[source-of-truth/github|GitHub]], [[source-of-truth/files-and-folders|Files And Folders]], [[lifecycle]], [[dashboard/README|Dashboard Specification]], [[testing|Testing]], [[security-review|Security Review]], and [[release-checklist|Release Checklist]] when those choices affect delivery, review, or launch behavior.

## App Overview

- App name:
- Primary goal:
- Core users:
- Platforms:
- Notes:

## Product Shape

- App type:
- Single app or multi-app setup:
- Web, mobile, desktop, API, internal tool, or marketplace:
- Monolith or distributed system:
- Key constraints:

## Frontend

- Frontend framework:
- Language:
- Styling approach:
- Component library:
- State management:
- Routing:
- Form handling:
- Validation:
- Data fetching:
- Build tool:
- Frontend testing:
- Notes:

## Backend

- Backend framework:
- Language:
- API style:
- Background jobs:
- Real-time support:
- File processing needs:
- Backend testing:
- Notes:

## Database

- Primary database:
- Database provider:
- SQL or NoSQL:
- Expected core entities:
- Migration strategy:
- Seed data approach:
- Backup plan:
- Notes:

## ORM Or Data Layer

- ORM or query builder:
- Schema ownership:
- Data access conventions:
- Notes:

## Authentication And Authorization

- Auth provider:
- Login methods:
- Session strategy:
- Roles:
- Permissions model:
- Multi-tenant needs:
- Notes:

## Infrastructure

- Hosting platform:
- Runtime environment:
- Container strategy:
- CDN:
- DNS:
- Environment management:
- Secrets management:
- Notes:

## DevOps And Deployment

- Source control:
- CI platform:
- CD approach:
- Preview environments:
- Release strategy:
- Rollback strategy:
- Notes:

## Storage

- File storage provider:
- Private file handling:
- Public asset handling:
- Upload limits:
- Notes:

## Observability

- Logging:
- Error tracking:
- Metrics:
- Tracing:
- Alerting:
- Dashboarding:
- Notes:

## Analytics

- Product analytics:
- Event tracking plan:
- Attribution:
- Session replay:
- Notes:

## Communication

- Transactional email:
- Marketing email:
- SMS or messaging:
- Push notifications:
- Notes:

## Payments

- Payment provider:
- Billing model:
- Subscription support:
- Invoicing:
- Tax handling:
- Notes:

## Search

- Search provider:
- Indexing strategy:
- Filters and ranking needs:
- Notes:

## AI Or Automation

- LLM provider:
- Embeddings provider:
- Vector database:
- Agent workflows:
- Prompt storage approach:
- Safety or moderation layer:
- Notes:

## Security

- Security requirements:
- Encryption requirements:
- Compliance targets:
- Rate limiting:
- Audit logging:
- Access review process:
- Notes:

## Testing Strategy

- Unit testing:
- Integration testing:
- End-to-end testing:
- Load testing:
- Security testing:
- Notes:

## Developer Experience

- Package manager:
- Monorepo tool:
- Local setup expectations:
- Code quality tooling:
- Documentation standard:
- Notes:

## Third-Party Integrations

- CRM:
- Support tools:
- CMS:
- Search:
- Maps:
- Calendar:
- Webhooks:
- Notes:

## Environments

- Local:
- Development:
- Staging:
- Production:
- Differences between environments:
- Notes:

## Open Questions

- Question 1:
- Question 2:
- Question 3:

## Decisions Already Made

- Decision:
- Decision:
- Decision:

## Not In Scope

- Item:

## Related

- [[source-of-truth/github|GitHub]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[lifecycle]]
- [[dashboard/README|Dashboard Specification]]
- [[testing|Testing]]
- [[security-review|Security Review]]
- [[release-checklist|Release Checklist]]
- Item:
- Item:

<!-- Reviewed and Approved on -->

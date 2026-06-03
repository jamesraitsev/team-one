# CTO Operator Dashboard

Local dashboard for reviewing Linda's real repo-health signal, tomorrow's Markdown-file work sequence, accepted decision records, link hygiene, and recorded dashboard actions.

Dashboard implementation is governed by:

- `dashboard/common-spec.md`
- `dashboard/linda/dashboard.md`
- `dashboard/linda/tabs/*.md`

## Run

```sh
npm install
npm run db:up
npm run dev
```

Or run the full local reset/start helper:

```sh
npm run bounce
```

- Dashboard: http://localhost:5555
- API: http://localhost:5556
- Postgres: `localhost:55432`

## Data

The dashboard reads real Markdown preparation files from the repo root and excludes `app/`.

The main live inputs are:

- `source-of-truth/memory/linda-repo-health.md`
- `lookherefirst.md`
- `source-of-truth/decisions/index.md`
- active Markdown files outside `app/`, `.git/`, generated artifacts, and archived review-later material

The dashboard shows:

- Linda's current repo-health score and must-look findings
- a local-date work calendar generated from the root dashboard specs and repo source records
- pending decisions with source links and audit-vector tags
- source decision records separated from dashboard actions
- wiki-link hygiene counts and unresolved links
- recorded dashboard actions

Every dashboard action writes to Postgres and to Markdown under:

```text
app/decision-log/YYYY-MM-DD/
```

The folder date uses `DECISION_LOG_TIMEZONE`, defaulting to `America/Denver`.

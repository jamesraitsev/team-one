---
aliases:
  - Dashboard Open Questions
---

# Dashboard Open Questions

These questions should be resolved before build or during MVP planning.

## 1. Local Only Or Web Hosted

Decision to make:

- should the dashboard run only against the local repo and local files
- or should it be reachable as a hosted web surface

Why it matters:

- changes auth, deployment, data freshness, and write-action design

## 2. Read Only First Or Write Enabled

Decision to make:

- should MVP only open and stage source updates
- or should it write back to issues and source-of-truth files

Why it matters:

- changes audit design, safety controls, and confirmation rules

## 3. GitHub Issues As Required Or Optional

Decision to make:

- should a dashboard item be considered incomplete without a linked issue
- or may some operator workflows remain file-first

Why it matters:

- the current contract says issues are the executable backlog, but the live GitHub config is still placeholder-only

## 4. Where Metrics Come From

Decision to make:

- which files, exports, or APIs are authoritative for metrics

Why it matters:

- without an explicit source, metrics will become either stale or invented

## 5. Where Cost Data Comes From

Decision to make:

- which files, exports, or APIs are authoritative for AI, tool, infrastructure, and ad cost

Why it matters:

- cost cannot be trustworthy if the provenance is undefined

## 6. How Project ROI Fields Are Defined

Decision to make:

- what exact event counts as a `download`
- what exact event counts as a `conversion`
- what spend categories count toward `CAC`
- what thresholds flip a project from `keep going` to `pause`

Why it matters:

- ROI summaries will be misleading if every project or agent interprets those fields differently

## 7. Whether Approvals Write To GitHub Comments, Decision Records, Or Both

Decision to make:

- should an approval live primarily in the issue system
- in the durable decision record
- or in both with a clear precedence rule

Why it matters:

- approval history needs one reliable audit trail

## 8. Whether Dashboard Actions Can Trigger Agents

Decision to make:

- should dashboard actions only update records
- or may they also start or resume agent work

Why it matters:

- changes permission boundaries, cost exposure, and operator expectations

## Additional Constraint To Resolve

The current repo contract names GitHub Issues as the executable backlog, but [[source-of-truth/github|GitHub]] still contains placeholder values for:

- `github_repo`
- `env_file_path`
- `token_env_var_name`

Before any write-enabled GitHub flow is built, decide whether:

- GitHub will be configured as a live dependency for the dashboard
- or the first release should remain fully file-first

## Related

- [[dashboard-mvp]]
- [[dashboard-actions]]
- [[source-of-truth/github|GitHub]]

<!-- Reviewed and Approved on -->

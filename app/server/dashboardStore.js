import { readFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { query } from "./db.js";

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..");
export const DASHBOARD_KEY = "linda-repo-health";
const SPEC_FILES = [
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "common",
    relativePath: "dashboard/common-spec.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-repo-health",
    relativePath: "dashboard/linda/dashboard.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-home",
    relativePath: "dashboard/linda/tabs/home.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-summary",
    relativePath: "dashboard/linda/tabs/summary.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-focus",
    relativePath: "dashboard/linda/tabs/focus.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-calendar",
    relativePath: "dashboard/linda/tabs/calendar.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-pending-decisions",
    relativePath: "dashboard/linda/tabs/pending-decisions.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-run-log",
    relativePath: "dashboard/linda/tabs/run-log.md",
  },
  {
    dashboardKey: DASHBOARD_KEY,
    specName: "linda-hygiene",
    relativePath: "dashboard/linda/tabs/hygiene.md",
  },
];

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function localDate(timeZone = process.env.DECISION_LOG_TIMEZONE || process.env.TZ || "America/Denver") {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date())
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export async function syncDashboardSpecs() {
  const specs = [];
  for (const spec of SPEC_FILES) {
    const content = await readFile(path.join(REPO_ROOT, spec.relativePath), "utf8");
    const contentHash = sha256(content);
    await query(
      `insert into dashboard_specs
      (dashboard_key, spec_name, path, content, content_hash, synced_at)
      values ($1,$2,$3,$4,$5,now())
      on conflict (dashboard_key, spec_name)
      do update set
        path = excluded.path,
        content = excluded.content,
        content_hash = excluded.content_hash,
        synced_at = now()`,
      [spec.dashboardKey, spec.specName, spec.relativePath, content, contentHash],
    );
    specs.push({ ...spec, contentHash });
  }
  return {
    specs,
    specHash: sha256(specs.map((spec) => `${spec.specName}:${spec.contentHash}`).join("|")),
  };
}

export async function getDashboardActions() {
  const result = await query(
    "select * from dashboard_actions where dashboard_key = $1 order by created_at desc limit 100",
    [DASHBOARD_KEY],
  );
  return result.rows;
}

export async function insertDashboardAction(entry, logPath) {
  const result = await query(
    `insert into dashboard_actions
    (dashboard_key, title, action_type, decision, related_entity, owner, description, rationale, impact, follow_up, delay_until, delegated_to, log_path)
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    returning *`,
    [
      DASHBOARD_KEY,
      entry.title,
      entry.action_type,
      entry.decision,
      entry.related_entity,
      entry.owner,
      entry.description,
      entry.rationale,
      entry.impact,
      entry.follow_up,
      entry.delay_until,
      entry.delegated_to,
      logPath,
    ],
  );
  return result.rows[0];
}

function snapshotForHash(payload) {
  const clone = structuredClone(payload);
  delete clone.generatedAt;
  return clone;
}

export async function saveDashboardSnapshot(payload, specHash) {
  const day = localDate();
  const hashable = snapshotForHash(payload);
  const payloadHash = sha256(JSON.stringify(hashable));
  const result = await query(
    `insert into dashboard_snapshots
    (dashboard_key, local_date, spec_hash, payload, payload_hash, created_at, updated_at)
    values ($1,$2,$3,$4,$5,now(),now())
    on conflict (dashboard_key, local_date)
    do update set
      spec_hash = excluded.spec_hash,
      payload = excluded.payload,
      payload_hash = excluded.payload_hash,
      updated_at = now()
    returning *`,
    [DASHBOARD_KEY, day, specHash, JSON.stringify(payload), payloadHash],
  );
  return result.rows[0];
}

export async function getPreviousSnapshot() {
  const day = localDate();
  const result = await query(
    `select * from dashboard_snapshots
    where dashboard_key = $1 and local_date < $2
    order by local_date desc
    limit 1`,
    [DASHBOARD_KEY, day],
  );
  return result.rows[0] || null;
}

export function compareSnapshots(currentPayload, previousSnapshot) {
  if (!previousSnapshot) {
    return {
      previousDate: null,
      summary: "No prior database snapshot yet.",
      scoreDelta: null,
      markdownDelta: null,
      unresolvedLinkDelta: null,
      acceptedActionDelta: null,
    };
  }

  const previous = previousSnapshot.payload;
  return {
    previousDate: previousSnapshot.local_date,
    summary: "Compared against the previous stored dashboard snapshot.",
    scoreDelta: currentPayload.summary.repoHealth - previous.summary.repoHealth,
    markdownDelta: currentPayload.summary.markdownFiles - previous.summary.markdownFiles,
    unresolvedLinkDelta: currentPayload.summary.unresolvedLinks - previous.summary.unresolvedLinks,
    acceptedActionDelta: currentPayload.summary.acceptedActions - previous.summary.acceptedActions,
  };
}

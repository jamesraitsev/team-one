import "dotenv/config";
import express from "express";
import cors from "cors";
import { query } from "./db.js";
import { migrateAndSeed } from "./seed.js";
import { writeDecisionLog } from "./decisionLog.js";
import { buildRepoDashboard, readRepoMarkdownFile } from "./repoAudit.js";
import {
  compareSnapshots,
  getDashboardActions,
  getPreviousSnapshot,
  insertDashboardAction,
  saveDashboardSnapshot,
  syncDashboardSpecs,
} from "./dashboardStore.js";

const app = express();
const port = Number(process.env.API_PORT || 5556);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/dashboard", async (_req, res, next) => {
  try {
    const [specState, actionRows, previousSnapshot] = await Promise.all([
      syncDashboardSpecs(),
      getDashboardActions(),
      getPreviousSnapshot(),
    ]);
    const dashboard = await buildRepoDashboard(actionRows);
    dashboard.spec = specState;
    dashboard.changeSincePrevious = compareSnapshots(dashboard, previousSnapshot);
    await saveDashboardSnapshot(dashboard, specState.specHash);

    res.json(dashboard);
  } catch (error) {
    next(error);
  }
});

app.get("/api/dashboard/history", async (_req, res, next) => {
  try {
    const result = await query(
      `select dashboard_key, local_date, spec_hash, payload_hash, created_at, updated_at
      from dashboard_snapshots
      order by local_date desc
      limit 30`,
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/api/file", async (req, res, next) => {
  try {
    const file = await readRepoMarkdownFile(req.query.path);
    res.json(file);
  } catch (error) {
    next(error);
  }
});

app.post("/api/actions", async (req, res, next) => {
  try {
    const entry = {
      title: req.body.title || "Dashboard decision",
      action_type: req.body.actionType || "operator-action",
      decision: req.body.decision || "recorded",
      related_entity: req.body.relatedEntity || null,
      owner: req.body.owner || "James",
      description: req.body.description || "",
      rationale: req.body.rationale || "",
      impact: req.body.impact || "",
      follow_up: req.body.followUp || "",
      delay_until: req.body.delayUntil || "",
      delegated_to: req.body.delegatedTo || "",
    };
    const logPath = await writeDecisionLog(entry);
    res.status(201).json(await insertDashboardAction(entry, logPath));
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    error: "Dashboard API error",
    detail: error.message,
  });
});

migrateAndSeed()
  .then(() => syncDashboardSpecs())
  .then(() => {
    app.listen(port, () => {
      console.log(`CTO dashboard API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start API", error);
    process.exit(1);
  });

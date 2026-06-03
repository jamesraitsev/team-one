import { query } from "./db.js";

const today = new Date("2026-06-01T09:00:00-06:00");

function dayOffset(days, hour = 9, minutes = 0) {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  d.setHours(hour, minutes, 0, 0);
  return d.toISOString();
}

export async function migrateAndSeed() {
  await query(`
    create table if not exists projects (
      id serial primary key,
      name text not null,
      stage text not null,
      health_score integer not null,
      risk_level text not null,
      priority_rank integer not null,
      owner text not null,
      open_issues integer not null,
      critical_bugs integer not null,
      stale_days integer not null,
      cycle_time_days numeric not null,
      weekly_hours numeric not null,
      spend_usd numeric not null,
      next_action text not null,
      insight text not null
    );

    create table if not exists agents (
      id serial primary key,
      name text not null,
      profile text not null,
      status text not null,
      load_score integer not null,
      confidence text not null,
      output_count integer not null,
      blocked_count integer not null,
      last_run timestamptz not null,
      insight text not null
    );

    create table if not exists priorities (
      id serial primary key,
      rank integer not null,
      title text not null,
      project text not null,
      owner text not null,
      urgency text not null,
      effort_hours numeric not null,
      impact text not null,
      linda_take text not null,
      recommended_decision text not null
    );

    create table if not exists calendar_items (
      id serial primary key,
      title text not null,
      starts_at timestamptz not null,
      ends_at timestamptz not null,
      kind text not null,
      project text not null,
      owner text not null,
      risk text not null
    );

    create table if not exists decisions (
      id serial primary key,
      title text not null,
      action_type text not null,
      decision text not null,
      related_entity text,
      owner text not null default 'James',
      description text,
      rationale text,
      impact text,
      follow_up text,
      log_path text,
      created_at timestamptz not null default now()
    );

    create table if not exists dashboard_specs (
      id serial primary key,
      dashboard_key text not null,
      spec_name text not null,
      path text not null,
      content text not null,
      content_hash text not null,
      synced_at timestamptz not null default now(),
      unique (dashboard_key, spec_name)
    );

    create table if not exists dashboard_actions (
      id serial primary key,
      dashboard_key text not null default 'linda-repo-health',
      title text not null,
      action_type text not null,
      decision text not null,
      related_entity text,
      owner text not null default 'James',
      description text,
      rationale text,
      impact text,
      follow_up text,
      delay_until text,
      delegated_to text,
      log_path text,
      created_at timestamptz not null default now()
    );

    create table if not exists dashboard_snapshots (
      id serial primary key,
      dashboard_key text not null,
      local_date date not null,
      spec_hash text not null,
      payload jsonb not null,
      payload_hash text not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (dashboard_key, local_date)
    );
  `);

  const existing = await query("select count(*)::int as count from projects");
  if (existing.rows[0].count > 0) return;

  await query(
    `insert into projects
    (name, stage, health_score, risk_level, priority_rank, owner, open_issues, critical_bugs, stale_days, cycle_time_days, weekly_hours, spend_usd, next_action, insight)
    values
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14),
    ($15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28),
    ($29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42),
    ($43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56)`,
    [
      "Atlas Billing Recovery",
      "Build",
      72,
      "High",
      1,
      "CTO Reviewer",
      18,
      3,
      5,
      6.8,
      41,
      1240,
      "Resolve invoice retry defects before adding new billing states.",
      "Revenue-impacting bugs are clustered in retry handling; adding scope now will hide the real blocker.",
      "Mobile Onboarding Reset",
      "Validation",
      61,
      "High",
      2,
      "Product Reviewer",
      26,
      5,
      8,
      9.4,
      36,
      890,
      "Narrow the experiment to activation step two and pause the personalization branch.",
      "The team is spending heavily, but the signal is still ambiguous because two experiments overlap.",
      "Agent Ops Kit",
      "Plan",
      83,
      "Medium",
      3,
      "Linda",
      11,
      1,
      2,
      4.1,
      28,
      520,
      "Approve the portable agent profile structure, then freeze folder naming for one week.",
      "The project is structurally strong but needs naming stability before more automation.",
      "Public Launch Console",
      "Launch",
      68,
      "Medium",
      4,
      "Growth Reviewer",
      14,
      2,
      3,
      5.3,
      22,
      760,
      "Require copy approval and rollback notes before publishing launch assets.",
      "Launch work is close, but content approval and rollback ownership are not yet explicit.",
    ],
  );

  await query(
    `insert into agents
    (name, profile, status, load_score, confidence, output_count, blocked_count, last_run, insight)
    values
    ($1,$2,$3,$4,$5,$6,$7,$8,$9),
    ($10,$11,$12,$13,$14,$15,$16,$17,$18),
    ($19,$20,$21,$22,$23,$24,$25,$26,$27),
    ($28,$29,$30,$31,$32,$33,$34,$35,$36),
    ($37,$38,$39,$40,$41,$42,$43,$44,$45),
    ($46,$47,$48,$49,$50,$51,$52,$53,$54)`,
    [
      "Linda",
      "agents/profiles/linda/README.md",
      "Active",
      76,
      "High",
      7,
      2,
      dayOffset(0, 8, 10),
      "Linda is finding naming and sequencing drift faster than the dashboard specs can absorb it.",
      "CTO Reviewer",
      "agents/profiles/cto-reviewer/README.md",
      "Overloaded",
      91,
      "Medium",
      11,
      4,
      dayOffset(0, 7, 45),
      "Too much architecture and release-risk review is landing on CTO at the same time.",
      "QA / Release Reviewer",
      "agents/profiles/qa-release-reviewer/README.md",
      "Active",
      67,
      "High",
      9,
      3,
      dayOffset(-1, 17, 20),
      "QA has clear blockers, but two releases still lack rollback evidence.",
      "Security / Secrets Reviewer",
      "agents/profiles/security-secrets-reviewer/README.md",
      "Watch",
      54,
      "Medium",
      4,
      1,
      dayOffset(-1, 16, 40),
      "Security is underused relative to the number of auth and dependency changes.",
      "Backlog Groomer",
      "agents/profiles/backlog-groomer/README.md",
      "Active",
      62,
      "High",
      8,
      2,
      dayOffset(0, 8, 30),
      "Backlog quality is improving, but stale issue closure is still lagging.",
      "Growth Reviewer",
      "agents/profiles/growth-reviewer/README.md",
      "Underused",
      31,
      "Low",
      2,
      0,
      dayOffset(-3, 10, 0),
      "Growth should be engaged earlier; launch assets are being reviewed too late.",
    ],
  );

  await query(
    `insert into priorities
    (rank, title, project, owner, urgency, effort_hours, impact, linda_take, recommended_decision)
    values
    ($1,$2,$3,$4,$5,$6,$7,$8,$9),
    ($10,$11,$12,$13,$14,$15,$16,$17,$18),
    ($19,$20,$21,$22,$23,$24,$25,$26,$27),
    ($28,$29,$30,$31,$32,$33,$34,$35,$36)`,
    [
      1,
      "Kill the billing retry ambiguity",
      "Atlas Billing Recovery",
      "CTO Reviewer",
      "Critical",
      6,
      "Protects revenue and unblocks release confidence.",
      "This is the cleanest high-leverage task. Do it before any new billing scope.",
      "Approve focused defect burn-down for retry handling.",
      2,
      "Freeze agent folder naming for one week",
      "Agent Ops Kit",
      "Linda",
      "High",
      2,
      "Prevents structural drift while the portable agent system stabilizes.",
      "The repo keeps improving, but naming churn is now the risk.",
      "Approve naming freeze after the profile structure lands.",
      3,
      "Reduce onboarding experiment overlap",
      "Mobile Onboarding Reset",
      "Product Reviewer",
      "High",
      4,
      "Separates signal from noise in activation data.",
      "Two experiments are masking each other. One must pause.",
      "Pause personalization branch for seven days.",
      4,
      "Pull Security into dependency review",
      "Public Launch Console",
      "Security / Secrets Reviewer",
      "Medium",
      3,
      "Avoids late launch blockers from auth and third-party changes.",
      "Security is underused, and launch has enough dependency movement to justify review.",
      "Schedule security review before launch approval.",
    ],
  );

  const calendar = [
    ["Linda repo health audit", 0, 8, 0, 8, 40, "audit", "Agent Ops Kit", "Linda", "medium"],
    ["Billing retry burn-down", 0, 9, 0, 11, 0, "focus", "Atlas Billing Recovery", "CTO Reviewer", "high"],
    ["Onboarding experiment decision", 0, 13, 0, 13, 45, "decision", "Mobile Onboarding Reset", "Product Reviewer", "high"],
    ["Release rollback review", 1, 10, 0, 11, 0, "review", "Public Launch Console", "QA / Release Reviewer", "medium"],
    ["Agent profile freeze checkpoint", 1, 14, 0, 14, 30, "decision", "Agent Ops Kit", "Linda", "medium"],
    ["Security dependency sweep", 2, 9, 30, 10, 30, "review", "Public Launch Console", "Security / Secrets Reviewer", "medium"],
    ["Backlog stale issue closure", 2, 15, 0, 16, 0, "hygiene", "Atlas Billing Recovery", "Backlog Groomer", "low"],
    ["Mobile activation readout", 3, 11, 0, 12, 0, "review", "Mobile Onboarding Reset", "Customer Signal Reviewer", "high"],
    ["Launch copy approval", 4, 10, 0, 10, 45, "approval", "Public Launch Console", "Growth Reviewer", "medium"],
    ["Weekly cost and progress review", 5, 8, 30, 9, 15, "review", "Portfolio", "Weekly CFO Cost and Progress Reviewer", "medium"],
    ["Seven-day plan reset", 6, 9, 0, 10, 0, "planning", "Portfolio", "Daily Chief of Staff Brief", "medium"],
  ];

  for (const [title, d, sh, sm, eh, em, kind, project, owner, risk] of calendar) {
    await query(
      `insert into calendar_items (title, starts_at, ends_at, kind, project, owner, risk)
       values ($1,$2,$3,$4,$5,$6,$7)`,
      [title, dayOffset(d, sh, sm), dayOffset(d, eh, em), kind, project, owner, risk],
    );
  }

  await query(
    `insert into decisions
    (title, action_type, decision, related_entity, owner, description, rationale, impact, follow_up, log_path)
    values
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      "Seed decision: use file-first dashboard mock",
      "system-seed",
      "approved",
      "CTO Operator Dashboard",
      "James",
      "Initial local dashboard uses realistic seeded data until GitHub and time-tracking integrations are live.",
      "This lets the dashboard validate operator workflow before integration work.",
      "Local insight-first dashboard can be reviewed immediately.",
      "Replace seeded data with live connectors after workflow is accepted.",
      "seed",
    ],
  );
}

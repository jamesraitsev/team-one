import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..");
const EXCLUDED_DIRS = new Set([".git", "app", "node_modules", "artifacts", "review later"]);
const AUDIT_VECTORS = [
  {
    id: "clarity",
    label: "Clarity",
    color: "#7f1d1d",
    meaning: "Can the operator tell what is live, future, or undecided?",
  },
  {
    id: "duplication",
    label: "Duplication",
    color: "#b45309",
    meaning: "Are multiple notes or queues defining the same thing?",
  },
  {
    id: "work-order",
    label: "Work order",
    color: "#2563eb",
    meaning: "Is the next work sequenced before dependent or lower-priority work?",
  },
  {
    id: "file-placement",
    label: "File placement",
    color: "#5f7d6d",
    meaning: "Is information stored in the right layer and source path?",
  },
  {
    id: "daily-use",
    label: "Daily use",
    color: "#475569",
    meaning: "Does the dashboard produce a practical operating loop?",
  },
  {
    id: "memory",
    label: "Memory",
    color: "#7c3aed",
    meaning: "Are memory, source decisions, and action history separated?",
  },
];
const PLACEHOLDER_TARGETS = new Set([
  "idea-name",
  "decision-name",
  "project-name",
  "journal-name",
  "note-name",
  "sop-name",
  "dr-0001-short-slug",
  "new-mobile-app-idea",
  "decision-001-pilot-scope",
  "mobile-pilot-project",
]);

function repoPath(relativePath) {
  return path.join(REPO_ROOT, relativePath);
}

export function normalizeRepoFile(relativePath) {
  const cleanPath = String(relativePath || "")
    .replace(/^\/+/, "")
    .replace(/\.md$/, "");
  const withExtension = cleanPath.endsWith(".md") ? cleanPath : `${cleanPath}.md`;
  const absolute = path.resolve(REPO_ROOT, withExtension);
  const relative = path.relative(REPO_ROOT, absolute).replaceAll(path.sep, "/");

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("File path must stay inside the repo.");
  }
  if ([...EXCLUDED_DIRS].some((excluded) => relative === excluded || relative.startsWith(`${excluded}/`))) {
    throw new Error("File path is outside the dashboard source scope.");
  }
  if (!relative.endsWith(".md")) {
    throw new Error("Only Markdown files can be opened from this dashboard.");
  }

  return { absolute, relative };
}

export async function readRepoMarkdownFile(relativePath) {
  const file = normalizeRepoFile(relativePath);
  return {
    path: file.relative,
    content: await readFile(file.absolute, "utf8"),
  };
}

async function readMarkdown(relativePath) {
  return readFile(repoPath(relativePath), "utf8");
}

function cleanWikiTarget(rawTarget) {
  return rawTarget.split("|")[0].split("#")[0].trim();
}

function cleanWikiDisplay(value = "") {
  return value
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1");
}

function splitTableRow(line) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = [];
  let current = "";
  let wikiDepth = 0;

  for (let index = 0; index < trimmed.length; index += 1) {
    const char = trimmed[index];
    const pair = trimmed.slice(index, index + 2);
    if (pair === "[[") {
      wikiDepth += 1;
      current += pair;
      index += 1;
      continue;
    }
    if (pair === "]]" && wikiDepth > 0) {
      wikiDepth -= 1;
      current += pair;
      index += 1;
      continue;
    }
    if (char === "|" && wikiDepth === 0) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  cells.push(current.trim());
  return cells;
}

async function listMarkdownFiles(dir = REPO_ROOT) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(absolute)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(absolute);
    }
  }

  return files;
}

function parseFrontmatterAliases(markdown) {
  if (!markdown.startsWith("---")) return [];
  const [, frontmatter] = markdown.split("---", 3);
  if (!frontmatter) return [];

  const aliases = [];
  let inAliases = false;

  for (const line of frontmatter.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("aliases:")) {
      inAliases = true;
      const inline = trimmed.slice("aliases:".length).trim();
      if (inline && inline !== "|" && inline !== ">") {
        aliases.push(...inline.replace(/^\[/, "").replace(/\]$/, "").split(","));
      }
      continue;
    }

    if (inAliases && trimmed.startsWith("- ")) {
      aliases.push(trimmed.slice(2));
      continue;
    }

    if (inAliases && trimmed && !line.startsWith(" ")) {
      inAliases = false;
    }
  }

  return aliases.map((alias) => alias.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
}

async function wikiLinkHealth(markdownFiles) {
  const candidates = new Set();
  const fileTexts = new Map();

  for (const absolute of markdownFiles) {
    const relative = path.relative(REPO_ROOT, absolute).replaceAll(path.sep, "/");
    const withoutExtension = relative.replace(/\.md$/, "");
    const text = await readFile(absolute, "utf8");
    fileTexts.set(relative, text);

    candidates.add(relative);
    candidates.add(withoutExtension);
    candidates.add(path.basename(withoutExtension));
    for (const alias of parseFrontmatterAliases(text)) candidates.add(alias);
  }

  const missing = [];
  let total = 0;

  for (const [file, text] of fileTexts) {
    for (const match of text.matchAll(/\[\[([^\]]+)\]\]/g)) {
      total += 1;
      const target = cleanWikiTarget(match[1]);
      if (!target) continue;
      const withoutExtension = target.replace(/\.md$/, "");
      const basename = path.basename(withoutExtension);
      const exists = candidates.has(target) || candidates.has(withoutExtension) || candidates.has(basename);
      if (!exists) {
        missing.push({
          file,
          target,
          raw: match[1],
          kind:
            PLACEHOLDER_TARGETS.has(target) || file.includes("template") || file.includes("examples")
              ? "placeholder"
              : "needs-review",
        });
      }
    }
  }

  return {
    total,
    missing,
    missingReviewCount: missing.filter((item) => item.kind === "needs-review").length,
    missingPlaceholderCount: missing.filter((item) => item.kind === "placeholder").length,
  };
}

function parseLindaMemory(markdown) {
  const fields = {};
  for (const line of markdown.split("\n")) {
    if (!line.startsWith("|")) continue;
    const [field, value] = splitTableRow(line);
    if (!field || field === "Field" || field === "---") continue;
    fields[field] = value;
  }

  const reportMatch = markdown.match(/## 20\d\d-\d\d-\d\d([\s\S]*?)(?=\n## Carried-Forward|\n## Linda Report Template|$)/);
  const report = reportMatch ? reportMatch[1].trim() : "";
  const mustLook = [];
  const oneDayWork = [];
  const carriedForward = [];
  let challenge = "";
  let mode = "";

  for (const line of report.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "Must look:") {
      mode = "must";
      continue;
    }
    if (trimmed === "One-day work:") {
      mode = "work";
      continue;
    }
    if (trimmed === "Challenge:") {
      mode = "challenge";
      continue;
    }
    if (!trimmed) continue;

    if (mode === "must") {
      const match = trimmed.match(/^\d+\.\s+(.+)/);
      if (match) mustLook.push(match[1]);
    } else if (mode === "work" && trimmed.startsWith("- ")) {
      oneDayWork.push(trimmed.slice(2));
    } else if (mode === "challenge" && trimmed.startsWith("- ")) {
      challenge = trimmed.slice(2);
    }
  }

  const carriedMatch = markdown.match(/## Carried-Forward Must-Look Items([\s\S]*?)(?=\n## Linda Report Template|$)/);
  if (carriedMatch) {
    for (const line of carriedMatch[1].split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ")) carriedForward.push(trimmed.slice(2));
    }
  }

  return {
    score: Number(fields["Latest score"] || 0),
    previousScore: fields["Previous score"],
    delta: fields.Delta,
    lastRunDate: fields["Last run date"],
    weakestArea: fields["Weakest area"],
    nextAudit: fields["Next recommended audit"],
    mustLook: mustLook.map((item, index) => formatMustLook(item, index)),
    oneDayWork,
    challenge,
    carriedForward,
  };
}

function fileUrl(relativePath) {
  if (!relativePath) return null;
  return `/api/file?path=${encodeURIComponent(relativePath)}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function localDateString(date = new Date(), timeZone = process.env.DECISION_LOG_TIMEZONE || process.env.TZ || "America/Denver") {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function addLocalDays(localDate, days) {
  const next = new Date(`${localDate}T12:00:00`);
  next.setDate(next.getDate() + days);
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
}

function dateAt(localDate, time) {
  return `${localDate}T${time}:00`;
}

function formatMustLook(item, index) {
  const fileMatch = item.match(/`([^`]+\.md)`/);
  const source = fileMatch ? fileMatch[1] : null;
  const cleaned = item.replace(/`([^`]+)`/g, "$1");
  const summary = [
    "Decide what is live now versus future capacity.",
    "Make GitHub explicitly file-first until real config exists.",
    "Reduce the daily operating loop before adding more system surface.",
    "Define the first v1 activation order for agents.",
    "Mark example/template links so hygiene checks stay useful.",
  ][index];

  return {
    id: index + 1,
    title: summary || cleaned.split(". ")[0],
    source,
    url: fileUrl(source),
    detail: cleaned,
    action:
      [
        "Update the source-of-truth folder contract.",
        "Update the GitHub contract so agents do not imply live GitHub execution.",
        "Keep tomorrow focused on the smallest daily loop.",
        "Pick the first recurring agent sequence before more automation.",
        "Separate fake example links from real broken links.",
      ][index] || "Review and decide whether this blocks tomorrow's work.",
    severity: index < 2 ? "high" : index < 4 ? "medium" : "watch",
  };
}

function parseLookHereFirst(markdown) {
  const sequence = [];
  const todos = [];
  let section = "";
  let inTodos = false;

  for (const line of markdown.split("\n")) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      section = heading[1].trim();
      inTodos = section === "To-Dos After The First Pass";
      continue;
    }

    const sequenceMatch = line.match(/^(\d+)\.\s+\[\[([^\]]+)\]\]\s+-\s+(.+)/);
    if (sequenceMatch && !inTodos) {
      const [, order, target, why] = sequenceMatch;
      const [filePath, title] = target.split("|");
      sequence.push({
        order: Number(order),
        section,
        title: title || filePath,
        path: filePath,
        url: fileUrl(filePath),
        why,
      });
      continue;
    }

    const todoMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (inTodos && todoMatch) {
      const [, order, text] = todoMatch;
      const linkMatch = text.match(/\[\[([^\]]+)\]\]/);
      const linked = linkMatch ? linkMatch[1].split("|")[0] : null;
      todos.push({
        order: Number(order),
        text,
        path: linked,
        url: fileUrl(linked),
      });
    }
  }

  return { sequence, todos };
}

function assessSequenceFile(file) {
  const overrides = {
    AGENTS: {
      status: "yellow",
      score: 74,
      action: "Confirm the house rules still match the dashboard and Linda workflow.",
      lindaTake: "Mostly usable. It needs only a light pass after the live-vs-future wording is cleaned up.",
    },
    question: {
      status: "red",
      score: 42,
      action: "Answer or close the structural questions that still govern the rest of the repo.",
      lindaTake: "This is the real bottleneck. Too many downstream docs depend on these answers.",
    },
    "operating-model/README": {
      status: "red",
      score: 55,
      action: "Add a clear authority order and live-vs-spec posture.",
      lindaTake: "This is the front door. If it is vague, everything else inherits the ambiguity.",
    },
    "source-of-truth/files-and-folders": {
      status: "red",
      score: 46,
      action: "Split active folders today from approved future folders.",
      lindaTake: "This is the highest-leverage cleanup because it stops agents from writing to imaginary capacity.",
    },
    "source-of-truth/github": {
      status: "red",
      score: 39,
      action: "Mark GitHub as file-first operational and GitHub-ready later until real config exists.",
      lindaTake: "The current wording overpromises live execution.",
    },
  };
  const fallbackBySection = {
    "Source Of Truth And Backlog": {
      status: "yellow",
      score: 68,
      action: "Check whether this file describes current truth or future capacity.",
    },
    "Lifecycle And Approval Authority": {
      status: "yellow",
      score: 70,
      action: "Check whether this file defines authority or only restates another authority.",
    },
    Agents: {
      status: "green",
      score: 82,
      action: "Keep this aligned, but do not start here unless the parent authority is clear.",
    },
  };
  const assessment = overrides[file.path] || fallbackBySection[file.section] || {
    status: "green",
    score: 78,
    action: "Review only after the parent files above it are clear.",
  };

  return {
    ...file,
    ...assessment,
    lindaTake: assessment.lindaTake || file.why,
  };
}

function parseDecisionIndex(markdown) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("| DR-"))
    .map((line) => {
      const [id, title, status, date, relatedIdea, relatedProject, dependsOn, supersedes, supersededBy, reviewTrigger] =
        splitTableRow(line);
      return {
        id,
        title: cleanWikiDisplay(title),
        status,
        date,
        relatedIdea: cleanWikiDisplay(relatedIdea),
        relatedProject: cleanWikiDisplay(relatedProject),
        dependsOn: cleanWikiDisplay(dependsOn),
        supersedes: cleanWikiDisplay(supersedes),
        supersededBy: cleanWikiDisplay(supersededBy),
        reviewTrigger,
      };
    });
}

function buildRubric(linda, linkHealth) {
  return [
    {
      vectorId: "clarity",
      score: 18,
      max: 25,
      note: "Strong edit guidance, but live vs future wording still causes confusion.",
    },
    {
      vectorId: "duplication",
      score: 15,
      max: 20,
      note: "Agent/profile duplication is controlled; GitHub and source-of-truth rules still diverge.",
    },
    {
      vectorId: "work-order",
      score: 17,
      max: 20,
      note: "Look Here First gives a usable order; activation order still needs a v1 loop.",
    },
    {
      vectorId: "file-placement",
      score: 11,
      max: 15,
      note: "Agents are now correctly placed; future source folders are named before they exist.",
    },
    {
      vectorId: "daily-use",
      score: 5,
      max: 10,
      note: "The system is rich, but daily use has not been narrowed enough.",
    },
    {
      vectorId: "memory",
      score: 6,
      max: 10,
      note: `Linda memory now has a baseline; ${linkHealth.missingPlaceholderCount} placeholder links still add audit noise.`,
    },
  ].map((item) => {
    const vector = AUDIT_VECTORS.find((candidate) => candidate.id === item.vectorId);
    return {
      ...item,
      area: vector.label,
      vector,
      percent: Math.round((item.score / item.max) * 100),
      lindaScore: linda.score,
    };
  });
}

function buildCalendar(actionRows = []) {
  const calendarStart = localDateString();
  const focusDate = addLocalDays(calendarStart, 1);
  const day2 = addLocalDays(calendarStart, 2);
  const day3 = addLocalDays(calendarStart, 3);
  const day4 = addLocalDays(calendarStart, 4);
  const day5 = addLocalDays(calendarStart, 5);
  const day6 = addLocalDays(calendarStart, 6);

  const blocks = [
    {
      title: "Baseline stored",
      vectorId: "memory",
      date: calendarStart,
      start: "20:30",
      end: "21:00",
      kind: "snapshot",
      sources: ["dashboard/linda/dashboard.md"],
      decision: "Keep today's clean database snapshot as the baseline.",
      outcome: "Tomorrow can compare against a real stored state.",
      risk: "low",
    },
    {
      title: "Read Linda baseline",
      vectorId: "memory",
      date: focusDate,
      start: "08:30",
      end: "09:00",
      kind: "brief",
      sources: ["source-of-truth/memory/linda-repo-health.md"],
      decision: "Accept the 72/100 baseline as tomorrow's starting point.",
      outcome: "Know the exact weaknesses before editing.",
      risk: "low",
    },
    {
      title: "Clarify live source rules",
      vectorId: "clarity",
      date: focusDate,
      start: "09:00",
      end: "10:45",
      kind: "decision",
      sources: ["source-of-truth/files-and-folders.md", "source-of-truth/github.md"],
      decision: "Decide what is live today and state that GitHub is file-first until configured.",
      outcome: "Remove the largest ambiguity in the system.",
      risk: "high",
    },
    {
      title: "Write authority order",
      vectorId: "clarity",
      date: focusDate,
      start: "11:30",
      end: "12:15",
      kind: "decision",
      sources: ["operating-model/README.md"],
      decision: "Accepted decisions, source-of-truth, operating model, SOPs, agents, dashboard summaries.",
      outcome: "Resolve which file wins when docs disagree.",
      risk: "medium",
    },
    {
      title: "Choose first daily loop",
      vectorId: "daily-use",
      date: focusDate,
      start: "13:15",
      end: "14:00",
      kind: "sequence",
      sources: ["agents/agent-schedules.md", "agents/agent-workflows.md"],
      decision: "Linda -> Source-of-Truth Steward -> Decision Record Steward -> Daily Chief of Staff.",
      outcome: "Make the system runnable before adding more surface.",
      risk: "medium",
    },
    {
      title: "Quiet placeholder link noise",
      vectorId: "file-placement",
      date: focusDate,
      start: "14:15",
      end: "15:00",
      kind: "hygiene",
      sources: ["operating-model/decision-record-system/examples.md", "operating-model/agent-status-schema/examples.md"],
      decision: "Mark example/template links as intentionally unresolved or replace with real records.",
      outcome: "Make future link checks trustworthy.",
      risk: "medium",
    },
    {
      title: "Record structural changes",
      vectorId: "memory",
      date: focusDate,
      start: "15:15",
      end: "16:00",
      kind: "decision",
      sources: ["source-of-truth/decisions/index.md"],
      decision: "Create or update DRs only for load-bearing authority changes.",
      outcome: "Keep tomorrow's edits durable and auditable.",
      risk: "low",
    },
    {
      title: "Re-run Linda and compare score",
      vectorId: "memory",
      date: day2,
      start: "08:30",
      end: "09:00",
      kind: "brief",
      sources: ["source-of-truth/memory/linda-repo-health.md"],
      decision: "Decide whether the cleanup moved the score enough to continue or stop.",
      outcome: "Turn tomorrow's work into a measurable score movement.",
      risk: "low",
    },
    {
      title: "Review pending decisions",
      vectorId: "work-order",
      date: day2,
      start: "10:00",
      end: "11:00",
      kind: "decision",
      sources: ["question.md", "operating-model/README.md"],
      decision: "Close or convert the highest-impact structural questions.",
      outcome: "Reduce downstream ambiguity before more implementation.",
      risk: "high",
    },
    {
      title: "Clean remaining real link issues",
      vectorId: "file-placement",
      date: day3,
      start: "09:00",
      end: "10:30",
      kind: "hygiene",
      sources: ["AGENTS.md", "source-of-truth/github.md"],
      decision: "Fix real broken links after placeholders are excluded.",
      outcome: "Make link-health numbers actionable.",
      risk: "medium",
    },
    {
      title: "Review daily loop usefulness",
      vectorId: "daily-use",
      date: day3,
      start: "13:00",
      end: "13:45",
      kind: "review",
      sources: ["agents/agent-schedules.md", "agents/agent-dashboard-routing.md"],
      decision: "Keep, shrink, or change the first daily loop.",
      outcome: "Prevent the system from becoming ritual without value.",
      risk: "medium",
    },
    {
      title: "Draft source rule changes",
      vectorId: "clarity",
      date: day4,
      start: "09:30",
      end: "11:00",
      kind: "edit",
      sources: ["source-of-truth/files-and-folders.md", "source-of-truth/github.md"],
      decision: "Prepare the concrete edits for active vs future scope.",
      outcome: "Turn decisions into actual Markdown updates.",
      risk: "medium",
    },
    {
      title: "Validate dashboard spec drift",
      vectorId: "duplication",
      date: day4,
      start: "14:00",
      end: "15:00",
      kind: "review",
      sources: ["dashboard/common-spec.md", "dashboard/linda/dashboard.md"],
      decision: "Confirm implementation still matches the recorded spec.",
      outcome: "Keep feedback durable instead of trapped in chat.",
      risk: "low",
    },
    {
      title: "Run hygiene pass",
      vectorId: "file-placement",
      date: day5,
      start: "09:00",
      end: "10:30",
      kind: "hygiene",
      sources: ["operating-model/agent-status-schema/examples.md", "operating-model/decision-record-system/examples.md"],
      decision: "Mark example placeholders or fix real broken links.",
      outcome: "Make hygiene metrics trustworthy.",
      risk: "medium",
    },
    {
      title: "Review source decision records",
      vectorId: "memory",
      date: day5,
      start: "13:30",
      end: "14:30",
      kind: "decision",
      sources: ["source-of-truth/decisions/index.md"],
      decision: "Decide whether existing source records are still valid.",
      outcome: "Separate old accepted file status from new dashboard actions.",
      risk: "medium",
    },
    {
      title: "Dry-run daily operating loop",
      vectorId: "daily-use",
      date: day6,
      start: "09:30",
      end: "11:00",
      kind: "sequence",
      sources: ["agents/agent-workflows.md", "agents/agent-output-contracts.md"],
      decision: "Decide if the first loop can run without more structure.",
      outcome: "Test whether the repo can operate, not just describe operation.",
      risk: "high",
    },
    {
      title: "Weekly Linda checkpoint",
      vectorId: "memory",
      date: day6,
      start: "13:00",
      end: "14:00",
      kind: "review",
      sources: ["source-of-truth/memory/linda-repo-health.md"],
      decision: "Compare score, hygiene, and accepted actions against the first stored baseline.",
      outcome: "Know if the project is getting clearer or just larger.",
      risk: "medium",
    },
  ];

  return {
    calendarStart,
    focusDate,
    workWindow: {
      start: "08:30",
      end: "16:00",
      configurable: true,
    note: "Future config should allow booking only before or after a chosen hour.",
    },
    items: blocks.map((block, index) => {
      const actionState = findLatestAction(block, actionRows);
      const delayedDate =
        actionState?.decision === "delayed" && /^\d{4}-\d{2}-\d{2}$/.test(actionState.delayUntil || "")
          ? actionState.delayUntil
          : null;
      const isBacklog = actionState?.decision === "delayed" && actionState.delayUntil === "backlog";
      const scheduledDate = delayedDate || block.date;

      return {
        id: `work-${index + 1}`,
        ...block,
        vector: AUDIT_VECTORS.find((vector) => vector.id === block.vectorId),
        originalDate: block.date,
        date: scheduledDate,
        source: block.sources[0],
        sourceUrls: block.sources.map((source) => ({ path: source, url: fileUrl(source) })),
        starts_at: isBacklog ? null : dateAt(scheduledDate, block.start),
        ends_at: isBacklog ? null : dateAt(scheduledDate, block.end),
        owner: "James + Linda",
        schedulingState: isBacklog ? "backlog" : delayedDate ? "delayed" : "scheduled",
        actionState,
      };
    }),
  };
}

function findLatestAction(block, actionRows) {
  const match = actionRows.find((row) => {
    const title = String(row.title || "").toLowerCase();
    return title.endsWith(`: ${block.title.toLowerCase()}`) || title.includes(block.title.toLowerCase());
  });
  if (!match) return null;
  return {
    decision: match.decision,
    delayUntil: match.delay_until,
    createdAt: match.created_at,
  };
}

function actionSummary(decisionRows) {
  const lindaRows = decisionRows.filter((row) => String(row.action_type || "").startsWith("linda-"));
  return {
    accepted: lindaRows.filter((row) => row.decision === "accepted").length,
    denied: lindaRows.filter((row) => row.decision === "denied").length,
    delayed: lindaRows.filter((row) => row.decision === "delayed").length,
    total: lindaRows.length,
  };
}

function hygieneSummary(linkHealth) {
  const byFile = new Map();
  for (const item of linkHealth.missing) {
    const existing = byFile.get(item.file) || { file: item.file, total: 0, placeholders: 0, needsReview: 0 };
    existing.total += 1;
    if (item.kind === "placeholder") existing.placeholders += 1;
    if (item.kind === "needs-review") existing.needsReview += 1;
    byFile.set(item.file, existing);
  }
  return [...byFile.values()].sort((a, b) => b.total - a.total).slice(0, 8).map((item) => ({
    ...item,
    action:
      item.needsReview > 0
        ? "Inspect real broken links after live/future scope is clear."
        : "Mark as example/template placeholder or exclude from strict checks.",
    url: fileUrl(item.file),
  }));
}

function buildThemes() {
  return [
    {
      id: "clarity",
      vectorId: "clarity",
      title: "Clarity",
      detail: "Decide what is live today, what is future capacity, and whether GitHub is file-first or live.",
      risk: "high",
    },
    {
      id: "daily-use",
      vectorId: "daily-use",
      title: "Daily use",
      detail: "Pick the smallest daily agent sequence before adding more structure.",
      risk: "medium",
    },
    {
      id: "file-placement",
      vectorId: "file-placement",
      title: "File placement",
      detail: "Separate placeholder link noise from real broken links.",
      risk: "medium",
    },
  ].map((theme) => ({
    ...theme,
    vector: AUDIT_VECTORS.find((vector) => vector.id === theme.vectorId),
  }));
}

function buildPendingDecisions() {
  return [
    {
      id: "source-folder-contract",
      vectorId: "clarity",
      category: "Source rules",
      title: "Which source-of-truth folders are live today?",
      status: "red",
      score: 46,
      action: "Split active folders from approved future folders.",
      source: "source-of-truth/files-and-folders.md",
      sourceUrls: [{ path: "source-of-truth/files-and-folders.md", url: fileUrl("source-of-truth/files-and-folders.md") }],
      lindaTake: "This is the highest-leverage decision because it controls where agents may write.",
    },
    {
      id: "github-posture",
      vectorId: "clarity",
      category: "Execution setup",
      title: "Is GitHub live or only ready for later?",
      status: "red",
      score: 39,
      action: "Mark GitHub as file-first operational until real repo/auth config exists.",
      source: "source-of-truth/github.md",
      sourceUrls: [{ path: "source-of-truth/github.md", url: fileUrl("source-of-truth/github.md") }],
      lindaTake: "The current contract overpromises live execution.",
    },
    {
      id: "authority-order",
      vectorId: "duplication",
      category: "Authority",
      title: "Which file wins when docs disagree?",
      status: "red",
      score: 55,
      action: "Add one explicit authority order to the operating-model overview.",
      source: "operating-model/README.md",
      sourceUrls: [{ path: "operating-model/README.md", url: fileUrl("operating-model/README.md") }],
      lindaTake: "This is the front door. If it is vague, everything else inherits ambiguity.",
    },
    {
      id: "structural-questions",
      vectorId: "work-order",
      category: "Open questions",
      title: "Which structural questions must be answered before more build work?",
      status: "red",
      score: 42,
      action: "Close, answer, or convert the highest-impact questions into decision records.",
      source: "question.md",
      sourceUrls: [{ path: "question.md", url: fileUrl("question.md") }],
      lindaTake: "This file is the bottleneck because downstream docs depend on it.",
    },
    {
      id: "first-daily-loop",
      vectorId: "daily-use",
      category: "Operating loop",
      title: "What is the first daily agent loop?",
      status: "yellow",
      score: 68,
      action: "Choose the smallest loop that will actually run.",
      source: "agents/agent-schedules.md",
      sourceUrls: [
        { path: "agents/agent-schedules.md", url: fileUrl("agents/agent-schedules.md") },
        { path: "agents/agent-workflows.md", url: fileUrl("agents/agent-workflows.md") },
      ],
      lindaTake: "A smaller loop is better than a complete system that does not run.",
    },
  ].map((item) => ({
    ...item,
    vector: AUDIT_VECTORS.find((vector) => vector.id === item.vectorId),
  }));
}

function hygieneScore(linkHealth) {
  return Math.max(
    0,
    Math.min(100, Math.round(100 - linkHealth.missingReviewCount * 5 - linkHealth.missingPlaceholderCount * 0.6)),
  );
}

export async function buildRepoDashboard(decisionRows = []) {
  const [lindaMemory, lookHereFirst, decisionIndex] = await Promise.all([
    readMarkdown("source-of-truth/memory/linda-repo-health.md"),
    readMarkdown("lookherefirst.md"),
    readMarkdown("source-of-truth/decisions/index.md"),
  ]);
  const markdownFiles = await listMarkdownFiles();
  const linkHealth = await wikiLinkHealth(markdownFiles);
  const linda = parseLindaMemory(lindaMemory);
  const { sequence, todos } = parseLookHereFirst(lookHereFirst);
  const decisions = parseDecisionIndex(decisionIndex);
  const rubric = buildRubric(linda, linkHealth);
  const calendarState = buildCalendar(decisionRows);
  const calendar = calendarState.items;
  const firstFiles = sequence.slice(0, 12).map(assessSequenceFile);
  const actionCounts = actionSummary(decisionRows);
  const hygiene = {
    score: hygieneScore(linkHealth),
    chart: [
      { name: "Placeholders", value: linkHealth.missingPlaceholderCount, fill: "#c58b2a" },
      { name: "Needs review", value: linkHealth.missingReviewCount, fill: "#7f1d1d" },
    ],
  };
  const tomorrowFiles = Array.from(
    new Set(calendar.flatMap((item) => item.sources).concat(firstFiles.slice(0, 5).map((file) => file.path))),
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "linda-repo-audit",
    scope: "Real Markdown files outside app/",
    summary: {
      repoHealth: linda.score,
      markdownFiles: markdownFiles.length,
      wikiLinks: linkHealth.total,
      unresolvedLinks: linkHealth.missing.length,
      placeholderLinks: linkHealth.missingPlaceholderCount,
      reviewLinks: linkHealth.missingReviewCount,
      hygieneScore: hygiene.score,
      sourceDecisionRecords: decisions.length,
      acceptedSourceDecisions: decisions.filter((decision) => decision.status === "Accepted").length,
      acceptedActions: actionCounts.accepted,
      todos: todos.length,
      sequenceFiles: sequence.length,
    },
    linda,
    auditVectors: AUDIT_VECTORS,
    rubric,
    themes: buildThemes(),
    priorities: todos.slice(0, 10).map((todo, index) => ({
      id: index + 1,
      rank: index + 1,
      title: todo.text.replace(/\[\[|\]\]/g, ""),
      path: todo.path,
      url: todo.url,
      urgency: index < 3 ? "High" : "Medium",
      lindaTake:
        index < 3
          ? "This directly reduces ambiguity in tomorrow's operating loop."
          : "Useful after the live-vs-future boundary is clarified.",
    })),
    sequence,
    firstFiles,
    pendingDecisions: buildPendingDecisions(),
    tomorrowFiles,
    decisions,
    calendarStart: calendarState.calendarStart,
    focusDate: calendarState.focusDate,
    workWindow: calendarState.workWindow,
    calendar,
    hygiene,
    linkHealth: {
      ...linkHealth,
      missing: linkHealth.missing.slice(0, 20),
      summary: hygieneSummary(linkHealth),
    },
    actionCounts,
    actionLog: decisionRows,
  };
}

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function dateParts(date, timeZone) {
  return Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

function localStamp(date, timeZone) {
  const parts = dateParts(date, timeZone);
  return {
    day: `${parts.year}-${parts.month}-${parts.day}`,
    stamp: `${parts.year}-${parts.month}-${parts.day}T${parts.hour}-${parts.minute}-${parts.second}`,
    display: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} ${timeZone}`,
  };
}

export async function writeDecisionLog(entry) {
  const now = new Date();
  const timeZone = process.env.DECISION_LOG_TIMEZONE || process.env.TZ || "America/Denver";
  const { day, stamp, display } = localStamp(now, timeZone);
  const baseDir = process.env.DECISION_LOG_DIR || "decision-log";
  const dir = path.resolve(process.cwd(), baseDir, day);
  await mkdir(dir, { recursive: true });

  const fileName = `${stamp}-${slugify(entry.title || entry.action_type)}.md`;
  const filePath = path.join(dir, fileName);

  const body = `# ${entry.title}

| Field | Value |
| --- | --- |
| Date | ${display} |
| UTC timestamp | ${now.toISOString()} |
| Action type | ${entry.action_type} |
| Decision | ${entry.decision} |
| Related entity | ${entry.related_entity || "None"} |
| Owner | ${entry.owner || "James"} |
| Impact | ${entry.impact || "Not specified"} |
| Delegated to | ${entry.delegated_to || "Not delegated"} |
| Delay until | ${entry.delay_until || "Not delayed"} |

## Context

${entry.description || "No context provided."}

## Rationale

${entry.rationale || "Captured from dashboard action."}

## Follow-Up

${entry.follow_up || "Review in the next Linda or CTO dashboard pass."}
`;

  await writeFile(filePath, body, "utf8");
  return path.relative(process.cwd(), filePath);
}

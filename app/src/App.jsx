import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Link2Off,
  ListChecks,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parseISO } from "date-fns";
import { clsx } from "clsx";

async function getDashboard() {
  const response = await fetch("/api/dashboard");
  if (!response.ok) throw new Error("Dashboard API failed");
  return response.json();
}

async function recordAction(payload) {
  const response = await fetch("/api/actions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Decision write failed");
  return response.json();
}

const tabs = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "summary", label: "Summary", icon: Gauge },
  { id: "focus", label: "Focus", icon: CalendarDays },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "pending", label: "Pending Decisions", icon: ListChecks },
  { id: "runlog", label: "Run Log", icon: FileText },
  { id: "hygiene", label: "Hygiene", icon: Link2Off },
];

function addLocalDays(dateString, days) {
  const date = parseISO(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return format(date, "yyyy-MM-dd");
}

function formatLocalDate(dateString, pattern = "EEEE, MMMM d, yyyy") {
  return format(parseISO(`${dateString}T12:00:00`), pattern);
}

function vectorStyle(vector) {
  return vector?.color
    ? { borderColor: vector.color, color: vector.color, backgroundColor: `${vector.color}14` }
    : undefined;
}

function Pill({ children, tone = "neutral" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "high" && "border-red-200 bg-red-50 text-red-700",
        tone === "medium" && "border-amber-200 bg-amber-50 text-amber-700",
        tone === "low" && "border-sage/20 bg-sage/10 text-sage",
        tone === "watch" && "border-line bg-paper text-muted",
        tone === "neutral" && "border-line bg-white text-muted",
      )}
    >
      {children}
    </span>
  );
}

function Panel({ children, className }) {
  return (
    <section className={clsx("rounded-lg border border-line bg-panel p-4 shadow-soft", className)}>
      {children}
    </section>
  );
}

function Metric({ label, value, detail, icon: Icon }) {
  return (
    <Panel>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
          <div className="mt-2 text-3xl font-semibold text-ink">{value}</div>
          <div className="mt-1 text-sm text-muted">{detail}</div>
        </div>
        <div className="rounded-md border border-line bg-paper p-2 text-ink">
          <Icon size={18} />
        </div>
      </div>
    </Panel>
  );
}

function ActionButton({ children, payload, tone = "dark" }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: recordAction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
  });

  return (
    <button
      onClick={() => mutation.mutate(payload)}
      disabled={mutation.isPending}
      className={clsx(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition",
        tone === "dark" && "bg-ink text-white hover:bg-black disabled:bg-muted",
        tone === "light" && "border border-line bg-white text-ink hover:bg-paper disabled:text-muted",
      )}
    >
      {mutation.isSuccess ? <Check size={16} /> : <ArrowRight size={16} />}
      {mutation.isSuccess ? "Recorded" : children}
    </button>
  );
}

function FileLink({ path, openFile, children }) {
  if (!path) return null;
  return (
    <button
      type="button"
      onClick={() => openFile(path)}
      className="inline-flex items-center gap-1 rounded-sm text-left text-xs font-semibold text-sage underline-offset-2 hover:underline"
    >
      <FileText size={13} />
      {children || path}
    </button>
  );
}

function WorkActions({ item }) {
  const queryClient = useQueryClient();
  const [delayOpen, setDelayOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: recordAction,
    onSuccess: () => {
      setDelayOpen(false);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  function record(decision, extra = {}) {
    mutation.mutate({
      title: `${decision}: ${item.title}`,
      actionType: `linda-${item.kind || "work"}`,
      decision,
      relatedEntity: item.sources?.join(", ") || item.source || item.path,
      description: item.outcome || item.action || item.lindaTake || "",
      rationale: item.decision || item.why || "",
      impact: "Captured from Linda's real repo dashboard.",
      ...extra,
    });
  }

  function delay(days) {
    const delayUntil = days === "backlog" ? "backlog" : addLocalDays(item.date, days);
    const followUp =
      days === "backlog"
        ? "Moved to backlog for eventual review."
        : `Rebooked ${days} day${days === 1 ? "" : "s"} later.`;
    record("delayed", { delayUntil, followUp });
  }

  return (
    <div className="relative grid w-full gap-2 rounded-lg border border-line bg-paper p-2 sm:w-32">
      <button
        onClick={() => record("accepted")}
        disabled={mutation.isPending}
        className="inline-flex items-center justify-center gap-1 rounded-md bg-ink px-2.5 py-1.5 text-xs font-semibold text-white disabled:bg-muted"
      >
        <Check size={14} />
        Accept
      </button>
      <button
        onClick={() => record("denied")}
        disabled={mutation.isPending}
        className="inline-flex items-center justify-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink disabled:text-muted"
      >
        <X size={14} />
        Deny
      </button>
      <button
        onClick={() => setDelayOpen((current) => !current)}
        disabled={mutation.isPending}
        className="inline-flex items-center justify-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink disabled:text-muted"
      >
        Delay
      </button>
      {delayOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 grid w-36 gap-1 rounded-md border border-line bg-white p-2 shadow-soft">
          <div className="px-2 pb-1 text-xs font-semibold text-muted">Delay by</div>
          {[
            [1, "1 day"],
            [3, "3 days"],
            [5, "5 days"],
            [7, "7 days"],
            ["backlog", "Backlog"],
          ].map(([value, label]) => (
            <button
              key={label}
              onClick={() => delay(value)}
              className="rounded px-2 py-1.5 text-left text-xs font-semibold text-ink hover:bg-paper"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FileDrawer({ file, onClose }) {
  if (!file) return null;
  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-3xl flex-col border-l border-line bg-white shadow-2xl">
      <div className="flex items-start justify-between gap-3 border-b border-line p-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">File preview</div>
          <div className="mt-1 font-semibold text-ink">{file.path}</div>
        </div>
        <button onClick={onClose} className="rounded-md border border-line p-2 text-muted hover:text-ink">
          <X size={16} />
        </button>
      </div>
      <pre className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap p-4 text-sm leading-6 text-ink">
        {file.content}
      </pre>
    </div>
  );
}

function Header({ data }) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-sage">
          <Sparkles size={16} />
          Scope: Linda repo-health dashboard
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">
          Tomorrow's work, from the repo itself.
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          This dashboard reads real Markdown files outside <code>app/</code>. Linda's memory, the
          decision index, source-of-truth docs, and <code>lookherefirst.md</code> drive the work plan.
        </p>
      </div>
      <div className="rounded-lg border border-line bg-white px-4 py-3 text-sm text-muted">
        <div className="font-semibold text-ink">Generated in browser time</div>
        <div>{format(parseISO(data.generatedAt), "MMM d, yyyy h:mm a")}</div>
      </div>
    </div>
  );
}

function ScoreVisual({ linda, changeSincePrevious, openFile }) {
  const snapshotLabel = changeSincePrevious?.previousDate
    ? format(parseISO(changeSincePrevious.previousDate), "MMM d")
    : "Missing";
  const scoreDelta =
    typeof changeSincePrevious?.scoreDelta === "number"
      ? `${changeSincePrevious.scoreDelta > 0 ? "+" : ""}${changeSincePrevious.scoreDelta}`
      : "No stored trend";

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <div className="relative h-56 min-h-[224px] min-w-0">
        <div
          className="absolute inset-6 rounded-full"
          style={{
            background: `conic-gradient(#171717 ${linda.score * 3.6}deg, #eee7dc 0deg)`,
          }}
        />
        <div className="absolute inset-12 rounded-full bg-panel" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-semibold text-ink">{linda.score}</div>
          <div className="text-sm font-semibold text-muted">/100</div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Brain size={17} />
          Score trend
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Pill tone="medium">Memory previous: {linda.previousScore}</Pill>
          <Pill tone="medium">{linda.delta}</Pill>
          <Pill>{linda.weakestArea}</Pill>
          <Pill tone={changeSincePrevious?.previousDate ? "low" : "watch"}>
            Snapshot: {snapshotLabel}
          </Pill>
          <Pill tone="watch">{scoreDelta}</Pill>
          <Pill tone="low">last run {linda.lastRunDate}</Pill>
        </div>
        <div className="mt-4 grid gap-2">
          {linda.mustLook.map((item) => (
            <div key={item.id} className="rounded-md border border-line bg-white p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="font-semibold text-ink">{item.title}</div>
                <Pill tone={item.severity}>{item.severity}</Pill>
              </div>
              <p className="mt-1 text-sm leading-5 text-muted">{item.action}</p>
              {item.source && (
                <div className="mt-2">
                  <FileLink path={item.source} openFile={openFile} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Home({ data, setActiveTab }) {
  const [filter, setFilter] = useState("all");
  const projects = [
    {
      id: "linda",
      name: "Linda Repo Health",
      description:
        "This project is an agent orchestration scaffold. It is meant to become a portable system that can be dropped into another project to monitor repo health, decisions, agents, source-of-truth hygiene, and next operator actions.",
      tags: ["Most active"],
      state: `${data.summary.repoHealth}/100`,
      detail: `${data.summary.markdownFiles} Markdown files, ${data.summary.acceptedActions} accepted dashboard actions.`,
      actions: true,
    },
    {
      id: "launch",
      name: "Launch Console",
      description:
        "A future project dashboard for launch readiness, copy approval, rollback ownership, and growth-review follow-up.",
      tags: ["Planned"],
      state: "Not live",
      detail: "Mock card for validating the multi-project dashboard grid.",
      actions: false,
    },
    {
      id: "backlog",
      name: "Backlog Control",
      description:
        "A future project dashboard for neglected work, stale decisions, issue cleanup, and owner gaps.",
      tags: ["Most neglected", "Planned"],
      state: "Mock",
      detail: "Shows how neglected projects will appear once connected.",
      actions: false,
    },
  ];
  const filteredProjects =
    filter === "all" ? projects : projects.filter((project) => project.tags.includes(filter));

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {[
          ["all", "All"],
          ["Most active", "Most active"],
          ["Most neglected", "Most neglected"],
          ["Planned", "Planned"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={clsx(
              "rounded-md border px-3 py-2 text-sm font-semibold",
              filter === id ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <Panel key={project.id} className={clsx("flex min-h-[280px] flex-col", project.id === "linda" && "border-ink/15")}>
            <div className="flex flex-1 flex-col justify-between gap-5">
              <div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Pill key={tag} tone={project.id === "linda" ? "low" : "watch"}>{tag}</Pill>
                  ))}
                </div>
                <h2 className="mt-3 text-xl font-semibold text-ink">{project.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-lg border border-line bg-paper p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">Current state</div>
                  <div className="mt-2 text-3xl font-semibold text-ink">{project.state}</div>
                  <div className="mt-1 text-sm text-muted">{project.detail}</div>
                </div>
                {project.actions ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab("summary")}
                      className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white"
                    >
                      Summary
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => setActiveTab("focus")}
                      className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink"
                    >
                      Tomorrow's Focus
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-line bg-paper px-3 py-2 text-sm font-semibold text-muted"
                  >
                    Not live yet
                  </button>
                )}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function LindaHome({ data, openFile }) {
  const rubricData = data.rubric.map((item) => ({
    name: item.area,
    value: item.score,
    max: item.max,
    percent: item.percent,
  }));

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Score" value={`${data.summary.repoHealth}/100`} detail="Real baseline from Linda memory" icon={Gauge} />
        <Metric label="Scope" value={data.summary.markdownFiles} detail="Active Markdown files outside app/" icon={FileText} />
        <Metric label="Source decision records" value={data.summary.sourceDecisionRecords} detail="Existing source records, not new approvals" icon={ShieldCheck} />
        <Metric label="Accepted actions" value={data.summary.acceptedActions} detail="You accepted from this dashboard" icon={Check} />
        <Metric label="Tomorrow to-dos" value={data.summary.todos} detail="From lookherefirst.md" icon={ListChecks} />
      </div>

      <Panel className="border-ink/15">
        <ScoreVisual linda={data.linda} changeSincePrevious={data.changeSincePrevious} openFile={openFile} />
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel>
          <h2 className="text-lg font-semibold text-ink">Audit vectors</h2>
          <p className="text-sm text-muted">The score is weighted by the six configured vectors for this dashboard.</p>
          <div className="mt-4 h-80 min-h-[320px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rubricData} layout="vertical" margin={{ left: 12 }}>
                <CartesianGrid stroke="#eee7dc" horizontal={false} />
                <XAxis type="number" domain={[0, 25]} />
                <YAxis dataKey="name" type="category" width={86} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 5, 5, 0]}>
                  {data.rubric.map((entry) => (
                    <Cell key={entry.area} fill={entry.vector?.color || "#5f7d6d"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-semibold text-ink">Tomorrow's themes</h2>
          <p className="text-sm text-muted">Keep the focus narrow enough to finish.</p>
          <div className="mt-4 grid gap-3">
            {data.themes.map((item, index) => (
              <div key={item.id} className="rounded-lg border border-line bg-white p-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
                        style={vectorStyle(item.vector)}
                      >
                        {item.title}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-muted">{item.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
          <span className="font-semibold">Linda's challenge:</span> {data.linda.challenge}
        </div>
      </Panel>
    </div>
  );
}

function calendarEvents(items) {
  return items.filter((item) => item.starts_at && item.actionState?.delayUntil !== "backlog").map((item) => {
    const color = item.vector?.color || (item.risk === "high" ? "#7f1d1d" : item.risk === "medium" ? "#c58b2a" : "#5f7d6d");
    return {
      id: item.id,
      title: item.actionState?.decision === "delayed" ? `Delayed: ${item.title}` : item.title,
      start: item.starts_at,
      end: item.ends_at,
      backgroundColor: color,
      borderColor: color,
      extendedProps: { item },
    };
  });
}

function EventDetail({ item, openFile, onClose }) {
  if (!item) {
    return (
      <Panel>
        <h2 className="text-lg font-semibold text-ink">Event detail</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Click a calendar event to see what you are doing, why it matters, and which source files govern it.
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="border-ink/15">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
              style={vectorStyle(item.vector)}
            >
              {item.vector?.label || item.kind}
            </span>
            <Pill tone={item.risk}>{item.risk}</Pill>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-ink">{item.title}</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-md border border-line p-2 text-muted hover:text-ink">
            <X size={14} />
          </button>
        )}
      </div>
      <div className="mt-3 text-xs font-semibold text-muted">
        {format(parseISO(item.starts_at), "MMM d, h:mm a")} - {format(parseISO(item.ends_at), "h:mm a")}
      </div>
      <p className="mt-3 text-sm leading-6 text-ink">{item.outcome}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{item.decision}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.sourceUrls.map((source) => (
          <FileLink key={source.path} path={source.path} openFile={openFile} />
        ))}
      </div>
      <div className="mt-4">
        <WorkActions item={item} />
      </div>
    </Panel>
  );
}

function Focus({ data, openFile }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const tomorrowItems = data.calendar.filter((item) => item.date === data.focusDate);
  const events = calendarEvents(tomorrowItems);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <Panel>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">{formatLocalDate(data.focusDate)}</h2>
            <p className="text-sm text-muted">Real repo cleanup blocks, sequenced from Linda and lookherefirst.md.</p>
          </div>
          <Pill tone="low">focus day</Pill>
        </div>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          initialDate={data.focusDate}
          events={events}
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="17:00:00"
          height="720px"
          nowIndicator={false}
          headerToolbar={{ left: "", center: "title", right: "" }}
          eventClick={(info) => setSelectedEvent(info.event.extendedProps.item)}
        />
      </Panel>

      <div className="grid gap-3">
        <EventDetail item={selectedEvent} openFile={openFile} onClose={selectedEvent ? () => setSelectedEvent(null) : null} />
        <Panel className="border-amber-200 bg-amber-50">
          <h2 className="text-lg font-semibold text-ink">Bottom line</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Tomorrow is not about reading everything. It is about fixing the live-vs-future boundary,
            then deciding the first daily operating loop.
          </p>
        </Panel>
        {tomorrowItems.map((item) => (
          <Panel key={item.id}>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
                    style={vectorStyle(item.vector)}
                  >
                    {item.vector?.label || item.kind}
                  </span>
                  <Pill tone={item.risk}>{item.kind}</Pill>
                  <div className="text-xs font-semibold text-muted">
                    {format(parseISO(item.starts_at), "h:mm a")} - {format(parseISO(item.ends_at), "h:mm a")}
                  </div>
                </div>
                <h3 className="mt-2 font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-5 text-muted">{item.outcome}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{item.decision}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.sourceUrls.map((source) => (
                    <FileLink key={source.path} path={source.path} openFile={openFile} />
                  ))}
                </div>
                {item.actionState && (
                  <div className="mt-2 text-xs font-semibold text-muted">
                    Recorded: {item.actionState.decision}
                    {item.actionState.delayUntil ? ` to ${item.actionState.delayUntil}` : ""}
                  </div>
                )}
              </div>
              <WorkActions item={item} />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function CalendarView({ data, openFile }) {
  const [view, setView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const events = calendarEvents(data.calendar);

  return (
    <div className="grid gap-4">
      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">Work calendar</h2>
            <p className="text-sm text-muted">
              Defaults to the next seven days from {formatLocalDate(data.calendarStart, "MMM d")}. Click any event to inspect the work.
            </p>
          </div>
          <div className="flex rounded-md border border-line bg-white p-1">
            {[
              ["day", "One day"],
              ["week", "Seven days"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={clsx(
                  "rounded px-3 py-1.5 text-sm font-semibold",
                  view === id ? "bg-ink text-white" : "text-muted hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <FullCalendar
          key={view}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView={view === "day" ? "timeGridDay" : "timeGridSevenDays"}
          initialDate={view === "day" ? data.focusDate : data.calendarStart}
          views={{ timeGridSevenDays: { type: "timeGrid", duration: { days: 7 } } }}
          visibleRange={
            view === "week"
              ? { start: data.calendarStart, end: addLocalDays(data.calendarStart, 7) }
              : undefined
          }
          events={events}
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="17:00:00"
          height="720px"
          nowIndicator={false}
          headerToolbar={{ left: "", center: "title", right: "" }}
          eventClick={(info) => setSelectedEvent(info.event.extendedProps.item)}
        />
      </Panel>
      <EventDetail item={selectedEvent} openFile={openFile} onClose={selectedEvent ? () => setSelectedEvent(null) : null} />
      <Panel>
        <div className="grid gap-2 md:grid-cols-2">
          {data.calendar.map((item) => (
            <div key={item.id} className="rounded-md border border-line bg-white p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-ink">{item.title}</div>
                  <div className="mt-1 text-xs text-muted">
                    {item.actionState?.delayUntil === "backlog" ? "Backlog" : format(parseISO(item.starts_at), "MMM d, h:mm a")}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
                      style={vectorStyle(item.vector)}
                    >
                      {item.vector?.label || item.kind}
                    </span>
                    {item.sourceUrls.map((source) => (
                      <FileLink key={source.path} path={source.path} openFile={openFile} />
                    ))}
                  </div>
                </div>
                <Pill tone={item.risk}>{item.risk}</Pill>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function statusTone(status) {
  if (status === "red") return "high";
  if (status === "yellow") return "medium";
  return "low";
}

function PendingDecisions({ data, openFile }) {
  const [selectedVector, setSelectedVector] = useState("all");
  const pendingDecisions =
    selectedVector === "all"
      ? data.pendingDecisions
      : data.pendingDecisions.filter((item) => item.vector?.id === selectedVector);

  return (
    <div className="grid gap-4">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">Pending decisions</h2>
            <p className="text-sm text-muted">
              Decide these before treating the repo as a live operating system. Linda is surfacing
              the highest-leverage slice from {data.summary.sequenceFiles} ordered source files.
            </p>
          </div>
          <Pill tone="medium">{pendingDecisions.length} active</Pill>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedVector("all")}
            className={clsx(
              "rounded-md border px-3 py-1.5 text-sm font-semibold",
              selectedVector === "all" ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:text-ink",
            )}
          >
            All vectors
          </button>
          {data.auditVectors.map((vector) => (
            <button
              key={vector.id}
              onClick={() => setSelectedVector(vector.id)}
              className={clsx(
                "rounded-md border px-3 py-1.5 text-sm font-semibold",
                selectedVector === vector.id ? "bg-white" : "bg-white text-muted hover:text-ink",
              )}
              style={selectedVector === vector.id ? vectorStyle(vector) : { borderColor: vector.color }}
            >
              {vector.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3">
          {pendingDecisions.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-line bg-white p-4"
              style={{ borderLeftColor: item.vector?.color, borderLeftWidth: 5 }}
            >
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
                      style={vectorStyle(item.vector)}
                    >
                      {item.vector?.label}
                    </span>
                    <Pill>{item.category}</Pill>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <Pill tone={statusTone(item.status)}>{item.status}</Pill>
                    <Pill>{item.score}/100</Pill>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">{item.action}</p>
                  <p className="mt-2 text-sm text-muted">{item.lindaTake}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.sourceUrls.map((source) => (
                      <FileLink key={source.path} path={source.path} openFile={openFile} />
                    ))}
                  </div>
                </div>
                <WorkActions item={{ ...item, kind: "decision", sources: item.sourceUrls.map((source) => source.path), date: data.focusDate }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function RunLog({ data }) {
  return (
    <div className="grid gap-4">
      <Panel>
        <h2 className="text-lg font-semibold text-ink">Source decision records</h2>
        <p className="text-sm text-muted">
          These are file statuses from <code>source-of-truth/decisions/</code>. They are not the same as actions you accept in the dashboard.
        </p>
        <div className="mt-4 grid gap-3">
          {data.decisions.map((decision) => (
            <div key={decision.id} className="rounded-lg border border-line bg-white p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="low">{decision.status}</Pill>
                    <h3 className="font-semibold text-ink">{decision.id}: {decision.title}</h3>
                  </div>
                  <div className="mt-2 text-sm text-muted">Review trigger: {decision.reviewTrigger}</div>
                  <div className="mt-2 text-xs text-muted">Depends on: {decision.dependsOn}</div>
                </div>
                <div className="text-sm font-semibold text-muted">{decision.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-semibold text-ink">Dashboard action log</h2>
        <p className="text-sm text-muted">
          Accept, deny, and delay actions write here. Accepted actions also update the Summary count.
        </p>
        <div className="mt-4 grid gap-3">
          {data.actionLog.map((decision) => (
            <div key={decision.id} className="rounded-lg border border-line bg-white p-4">
              <div className="font-semibold text-ink">{decision.title}</div>
              <div className="mt-1 text-sm text-muted">{decision.description}</div>
              <div className="mt-2 text-xs text-muted">
                {format(parseISO(decision.created_at), "MMM d, h:mm a")} · {decision.action_type} · {decision.log_path || "No file"}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Hygiene({ data, openFile }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <Panel>
        <h2 className="text-lg font-semibold text-ink">Hygiene score</h2>
        <p className="text-sm text-muted">
          Action: mark placeholders as examples first. Then inspect the small set of real broken links.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-[160px_1fr] md:items-center">
          <div className="relative h-40">
            <PieChart width={160} height={160}>
              <Pie data={data.hygiene.chart} dataKey="value" nameKey="name" innerRadius={42} outerRadius={68} paddingAngle={2}>
                {data.hygiene.chart.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-2xl font-semibold text-ink">
              {data.summary.hygieneScore}
            </div>
          </div>
          <div className="text-sm leading-6 text-muted">
            Overall score penalizes real unresolved links more heavily than placeholder/template links.
            Use the grouped list to decide whether each file needs cleanup or exclusion.
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          <Metric label="Wiki links" value={data.summary.wikiLinks} detail="Scope for link health" icon={GitBranch} />
          <Metric label="Unresolved" value={data.summary.unresolvedLinks} detail="Set cleanup policy" icon={AlertTriangle} />
          <Metric label="Placeholders" value={data.summary.placeholderLinks} detail="Mark or exclude examples" icon={FileText} />
          <Metric label="Needs review" value={data.summary.reviewLinks} detail="Inspect actual broken links" icon={Link2Off} />
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-semibold text-ink">Where the noise is</h2>
        <p className="text-sm text-muted">Grouped by file so you can decide what to fix or exclude.</p>
        <div className="mt-4 grid gap-2">
          {data.linkHealth.summary.map((item) => (
            <div key={item.file} className="rounded-md border border-line bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <FileLink path={item.file} openFile={openFile} />
                <Pill tone={item.needsReview > 0 ? "medium" : "watch"}>{item.total} links</Pill>
              </div>
              <div className="mt-2 text-sm text-muted">{item.action}</div>
              <div className="mt-2 flex gap-2">
                <Pill tone="watch">{item.placeholders} placeholders</Pill>
                <Pill tone={item.needsReview > 0 ? "medium" : "low"}>{item.needsReview} review</Pill>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [openFileState, setOpenFileState] = useState(null);
  const { data, isLoading, error } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboard });

  async function openFile(path) {
    setOpenFileState({ path, content: "Loading..." });
    const response = await fetch(`/api/file?path=${encodeURIComponent(path)}`);
    if (!response.ok) {
      setOpenFileState({ path, content: "Could not load this file." });
      return;
    }
    setOpenFileState(await response.json());
  }

  const content = useMemo(() => {
    if (!data) return null;
    if (activeTab === "summary") return <LindaHome data={data} openFile={openFile} />;
    if (activeTab === "focus") return <Focus data={data} openFile={openFile} />;
    if (activeTab === "calendar") return <CalendarView data={data} openFile={openFile} />;
    if (activeTab === "pending") return <PendingDecisions data={data} openFile={openFile} />;
    if (activeTab === "runlog") return <RunLog data={data} />;
    if (activeTab === "hygiene") return <Hygiene data={data} openFile={openFile} />;
    return <Home data={data} setActiveTab={setActiveTab} />;
  }, [activeTab, data]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-muted">Loading Linda dashboard...</div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Panel className="max-w-xl">
          <h1 className="text-xl font-semibold text-ink">Dashboard API is not ready</h1>
          <p className="mt-2 text-sm text-muted">
            Run <code>npm run bounce</code> from the <code>app/</code> folder.
          </p>
        </Panel>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-6 lg:px-8">
      <Header data={data} />
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition",
                activeTab === tab.id
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-muted hover:text-ink",
              )}
            >
              <Icon size={16} />
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={14} />}
            </button>
          );
        })}
      </div>
      <div className="mt-5">{content}</div>
      <FileDrawer file={openFileState} onClose={() => setOpenFileState(null)} />
    </main>
  );
}

export default App;

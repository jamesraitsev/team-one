from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUT_DIR = Path("artifacts/toward_business_plan")
PDF_PATH = OUT_DIR / "toward.to_business_plan_2026-05-29.pdf"

BLUE = colors.HexColor("#2E74B5")
DARK_BLUE = colors.HexColor("#1F4D78")
NAVY = colors.HexColor("#17365D")
GRAY = colors.HexColor("#F2F4F7")
LIGHT_BLUE = colors.HexColor("#D9EAF7")
LIGHT_RED = colors.HexColor("#FCE4D6")
LIGHT_YELLOW = colors.HexColor("#FFF2CC")
LIGHT_GREEN = colors.HexColor("#E2F0D9")
GRID = colors.HexColor("#D9E2F3")


def styles():
    base = getSampleStyleSheet()
    base["Normal"].fontName = "Helvetica"
    base["Normal"].fontSize = 9.8
    base["Normal"].leading = 12.2
    base["Normal"].spaceAfter = 6
    base.add(
        ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=29,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            "CoverSub",
            parent=base["Normal"],
            fontSize=13,
            leading=16,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#404040"),
            spaceAfter=18,
        )
    )
    base.add(
        ParagraphStyle(
            "H1Plan",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=BLUE,
            spaceBefore=12,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            "H2Plan",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.5,
            leading=15,
            textColor=BLUE,
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    base.add(
        ParagraphStyle(
            "H3Plan",
            parent=base["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=10.8,
            leading=13,
            textColor=DARK_BLUE,
            spaceBefore=6,
            spaceAfter=3,
        )
    )
    base.add(
        ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontSize=8.2,
            leading=10,
            spaceAfter=3,
        )
    )
    base.add(
        ParagraphStyle(
            "Cell",
            parent=base["Normal"],
            fontSize=7.8,
            leading=9.4,
            spaceAfter=0,
        )
    )
    base.add(
        ParagraphStyle(
            "CellHeader",
            parent=base["Cell"],
            fontName="Helvetica-Bold",
            textColor=colors.white,
        )
    )
    return base


S = styles()


def para(text: str, style: str = "Normal") -> Paragraph:
    return Paragraph(text.replace("&", "&amp;"), S[style])


def bullet(text: str) -> Paragraph:
    return Paragraph("&#8226;&nbsp;&nbsp;" + text.replace("&", "&amp;"), S["Normal"])


def numbered(items: list[str]) -> list[Paragraph]:
    return [Paragraph(f"{i}.&nbsp;&nbsp;{item.replace('&', '&amp;')}", S["Normal"]) for i, item in enumerate(items, 1)]


def make_table(headers: list[str], rows: list[list[str]], widths: list[float], severity_col: int | None = None) -> Table:
    data = [[para(h, "CellHeader") for h in headers]]
    for row in rows:
        data.append([para(cell, "Cell") for cell in row])
    tbl = Table(data, colWidths=[w * inch for w in widths], repeatRows=1, hAlign="LEFT")
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), BLUE),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.4, GRID),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#FAFBFC")]),
    ]
    if severity_col is not None:
        for idx, row in enumerate(rows, start=1):
            severity = row[severity_col].strip()
            fill = LIGHT_RED if severity == "Critical" else LIGHT_YELLOW if severity == "High" else LIGHT_GREEN
            style.append(("BACKGROUND", (severity_col, idx), (severity_col, idx), fill))
    tbl.setStyle(TableStyle(style))
    return tbl


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D9E2F3"))
    canvas.line(inch, 0.62 * inch, 7.5 * inch, 0.62 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawString(inch, 0.42 * inch, "toward.to business plan | prepared May 29, 2026")
    canvas.drawRightString(7.5 * inch, 0.42 * inch, f"Page {doc.page}")
    canvas.restoreState()


def add_sources(story):
    story.append(para("Sources and Inspection Notes", "H1Plan"))
    story.append(
        make_table(
            ["Source", "Use in plan"],
            [
                ["toward.to public site and client app source inspected May 29, 2026", "Product positioning, routes, use cases, advisor workflow, quick-advice workflow, blog/resource content, and launch-readiness observations."],
                ["Pew Research Center, '34% of U.S. adults have used ChatGPT, about double the share in 2023' (June 25, 2025)", "AI adoption by age, education, and work use."],
                ["U.S. Bureau of Labor Statistics, CPS Annual Averages, Table 11, 2025", "Scale of management, professional, business, and financial occupations."],
                ["Kauffman Indicators of Entrepreneurship, National Report on Early-Stage Entrepreneurship in the United States: 2025", "Entrepreneurship trend and founder/operator market rationale."],
                ["Federal Reserve Small Business Credit Survey report index, 2025-2026", "Small-business performance, owner-demographic reporting, and uncertainty/growth context."],
            ],
            [2.45, 4.05],
        )
    )
    story.append(
        para(
            "Important assumption: this plan is based on the public and client-side product surface available during inspection. Server-side implementation, private analytics, customer data, revenue history, and legal documents were not available."
        )
    )


def build_pdf() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=letter,
        rightMargin=inch,
        leftMargin=inch,
        topMargin=0.78 * inch,
        bottomMargin=0.82 * inch,
        title="toward.to Business Plan",
        author="Codex",
    )
    story = []

    story.append(Spacer(1, 0.25 * inch))
    story.append(para("toward.to Business Plan", "CoverTitle"))
    story.append(para("Market focus, demographic rationale, GTM plan, and launch-gap register", "CoverSub"))
    story.append(para("Prepared for review | Site inspected May 29, 2026", "CoverSub"))
    story.append(Spacer(1, 0.25 * inch))
    story.append(
        make_table(
            ["Decision", "Recommendation"],
            [
                ["Recommended beachhead", "AI-native founder/operators and independent professionals making costly business decisions in the next 30 days."],
                ["Positioning", "A decision lab that turns messy context into a defensible next action, not another task manager or generic chatbot."],
                ["Pre-launch priority", "Narrow the ICP, ship production hardening, add pricing, trust controls, and decision auditability."],
            ],
            [1.75, 4.7],
        )
    )
    story.append(Spacer(1, 0.3 * inch))
    story.append(para("<b>Bottom line:</b> Launch toward.to around one urgent decision moment and one customer profile. The strongest first market is not broad consumer productivity; it is business operators who need a defensible decision now."))
    story.append(PageBreak())

    story.append(para("Executive Summary", "H1Plan"))
    story.append(para("Toward is best understood as a decision-intelligence workspace: it captures messy context, lets a user query advisor perspectives, and converts uncertainty into a next best action. The current product language is strong, but it is still too broad for a launch. The market should not hear 'AI productivity app.' The market should hear: 'Make the business decision you can defend.'"))
    story.append(para("Recommendation: market first to founder/operators and independent professionals.", "H2Plan"))
    for item in [
        "Primary ICP: solo founders, small-team operators, consultants, fractional leaders, agency owners, and independent builders facing ambiguous decisions tied to revenue, customers, pricing, launches, hiring, or client delivery.",
        "Why now: AI usage is already mainstream among younger, educated, working adults, but generic chat tools do not preserve context, surface blind spots consistently, or create a durable decision record.",
        "Avoid at launch: broad consumer life decisions, generic productivity, and enterprise management teams. Those markets are larger but noisier, less urgent, or require heavier trust/procurement maturity.",
    ]:
        story.append(bullet(item))
    story.append(para("Business Plan Snapshot", "H2Plan"))
    story.append(
        make_table(
            ["Area", "Plan"],
            [
                ["Product category", "Decision-intelligence workspace for high-stakes next actions."],
                ["Wedge offer", "One high-quality decision brief in under 20 minutes for a current business decision."],
                ["Audience", "AI-comfortable founder/operators and independent professionals, mostly 25-44, college-educated knowledge workers."],
                ["Model", "Freemium or low-friction trial, then Pro subscription; later team/workspace plan."],
                ["Launch motion", "Use-case landing pages, founder communities, consulting/fractional-leader partnerships, decision-template lead magnets, and example briefs."],
                ["Key risk", "Broad positioning plus weak trust/pricing/auditability can make Toward feel like a nicer wrapper around ChatGPT."],
            ],
            [1.45, 5.05],
        )
    )
    story.append(PageBreak())

    story.append(para("What Toward Is Today", "H1Plan"))
    story.append(para("The current public surface positions toward.to around 'Decision Intelligence System,' 'Next Best Action,' and 'Make the higher quality decision, faster.' The app surface includes account login, projects/initiatives, key results, notes/files/constraints/guidance, quick advice, an advisor library, and a blog/resource area."))
    story.append(para("Observed strengths", "H2Plan"))
    for item in [
        "The product has a coherent decision theme: scattered signals, blind spots, tradeoffs, advisor perspectives, and a next move.",
        "Advisor selection is differentiated enough to feel like a structured thinking system rather than a raw prompt box.",
        "The workspace model can support compounding context across decisions, which is the main strategic advantage over one-off AI chats.",
        "Use cases already include business-relevant moments: startup strategy, hiring, complex projects, prioritization, and launching an invite-only beta.",
    ]:
        story.append(bullet(item))
    story.append(para("Observed weaknesses", "H2Plan"))
    for item in [
        "The use-case spread is too wide for crisp launch messaging: career, negotiations, purchases, startup strategy, hiring, and complex projects all compete for attention.",
        "The site does not yet make the paid conversion path obvious.",
        "The value claim 'defensible decision' needs more explicit evidence handling, assumption tracking, and decision history.",
        "The latest inspected deployment appears to expose development-style source routes. This should be treated as a launch blocker until a production build and security review are complete.",
    ]:
        story.append(bullet(item))

    story.append(para("Market Recommendation", "H1Plan"))
    story.append(para("Market Toward first to people who make consequential decisions without a strategy staff. These customers are overloaded with inputs, already comfortable using AI, and willing to pay for clarity because a bad decision has visible cost."))
    story.append(para("Beachhead ICP", "H2Plan"))
    story.append(
        make_table(
            ["Attribute", "Definition"],
            [
                ["Who", "Founder/operators, solo business owners, agency owners, consultants, fractional leaders, and independent builders."],
                ["Moment", "A business decision due in the next 30 days: launch, pricing, offer design, segment choice, hiring, contract negotiation, or scope tradeoff."],
                ["Demographics", "Likely 25-44, college-educated, knowledge-work or owner/operator roles, urban/suburban, digitally native, already using AI for work or learning."],
                ["Psychographics", "Ambitious, time-constrained, self-directed, skeptical of generic advice, wants an answer they can explain to a partner, client, investor, or team."],
                ["Budget", "Individual SaaS budget or business card. Test $19-$39/month Pro; $79-$149/month small-team workspace after team features mature."],
                ["Core promise", "Turn a messy decision into a defensible next action and a short decision brief."],
            ],
            [1.35, 5.15],
        )
    )
    story.append(PageBreak())

    story.append(para("Segment Prioritization", "H1Plan"))
    story.append(
        make_table(
            ["Segment", "Priority", "Likely demographics", "Launch implication"],
            [
                ["Founder/operators and solo businesses", "High", "25-44; college-educated; AI-comfortable; decisions tied to revenue, hiring, launch, pricing, positioning.", "Best beachhead: urgent pain, clear willingness to pay, short feedback loops, and language already present in Toward."],
                ["Consultants, fractional leaders, agencies", "High", "30-54; professional services; client-facing; decisions must be defensible and shared.", "Strong second wedge because PDF/shareable decision briefs can become part of client workflow."],
                ["Career switchers and negotiators", "Medium", "22-44; knowledge workers; likely to use AI for learning and work; episodic high-stakes decisions.", "Good content and template segment, but harder retention unless tied to a sequence of decisions."],
                ["Managers inside larger companies", "Medium", "30-54; management/professional occupations; higher budget potential but slower procurement.", "Attractive later if privacy, admin controls, auditability, and team sharing mature."],
                ["General consumers making purchases/life choices", "Low now", "Broad age/income mix; intent is fragmented; trust expectations vary widely.", "Avoid as launch ICP. Too expensive to message and too close to generic AI assistant positioning."],
            ],
            [1.4, 0.75, 2.1, 2.25],
        )
    )
    story.append(para("Demographic Demand Signals", "H1Plan"))
    story.append(para("The best launch market sits where three patterns overlap: high decision load, high AI adoption, and clear economic consequence. The sources below support a younger, educated, professional, founder/operator-oriented wedge rather than a broad consumer launch."))
    story.append(
        make_table(
            ["Signal", "Evidence", "Implication for Toward"],
            [
                ["AI adoption is high enough for a specialized AI workflow.", "Pew reports that 34% of U.S. adults had used ChatGPT by early 2025, including 58% of adults under 30. Usage is higher among bachelor's and postgraduate degree holders.", "Do not spend launch energy teaching the market what AI is. Target users already experimenting with AI and sell structure, judgment, and memory."],
                ["Work use is growing quickly.", "Pew reports 28% of employed adults used ChatGPT for work, with higher usage among younger workers and those with higher education.", "Toward can compete as the work-grade decision layer above generic AI chats."],
                ["The professional/managerial base is large.", "BLS 2025 annual averages list 71.3 million people in management, professional, and related occupations, including 31.0 million in management, business, and financial operations.", "The eventual market is large, but launch focus should be narrower than the full knowledge-work base."],
                ["Entrepreneurship remains elevated.", "Kauffman reports the U.S. rate of new entrepreneurs increased in 2025 and remained above pre-pandemic levels.", "Founder/operator decision moments are abundant and recurring enough for a beachhead."],
                ["Small businesses face uncertain growth conditions.", "Federal Reserve Small Business Credit Survey pages report steady employment growth but mixed revenue and future-growth expectations in recent survey cycles.", "Small operators have pressure to make better choices with limited resources, which fits Toward's 'next best action' promise."],
            ],
            [1.3, 2.55, 2.65],
        )
    )
    story.append(PageBreak())

    story.append(para("Practical Demographic Targeting", "H1Plan"))
    for item in [
        "Age: concentrate acquisition on 25-44. This is old enough to own consequential work decisions and young enough to show strong AI adoption.",
        "Education/occupation: college-educated knowledge workers, founders, consultants, managers, product/marketing/sales operators, and professional-service owners.",
        "Income/business context: users with discretionary tool budgets, business-card purchasing, or direct financial upside from better decisions.",
        "Decision intent: target search and social around urgent decisions, not identity labels alone: 'which customer segment to target,' 'should I launch now,' 'how to price consulting offer,' 'hire contractor or wait,' 'what am I missing in this strategy.'",
    ]:
        story.append(bullet(item))
    story.append(para("Positioning", "H1Plan"))
    story.append(
        make_table(
            ["Element", "Recommendation"],
            [
                ["Category", "Decision-intelligence workspace."],
                ["One-line promise", "Turn a messy business decision into a defensible next action in 20 minutes."],
                ["Tagline option", "Make the decision you can defend."],
                ["Primary CTA", "Create my decision brief."],
                ["Proof object", "A saved brief with context, assumptions, alternatives, risks, advisor perspectives, and next action."],
                ["Do not lead with", "AI life coach, productivity app, project manager, or generic advisor marketplace."],
            ],
            [1.35, 5.15],
        )
    )
    story.append(para("Messaging Pillars", "H2Plan"))
    for item in [
        "Clarity under pressure: Toward organizes context when the user is overloaded.",
        "Blind-spot detection: advisor perspectives challenge the user's default framing.",
        "Defensible action: the product explains why a next action is recommended.",
        "Decision memory: each decision becomes a durable record, not a lost chat thread.",
    ]:
        story.append(bullet(item))

    story.append(para("Competitive Landscape", "H1Plan"))
    story.append(
        make_table(
            ["Category", "Examples", "User job", "Toward differentiation"],
            [
                ["Generic AI chat", "ChatGPT, Claude, Gemini", "Ask for advice or brainstorm.", "More structure, saved context, advisor selection, and decision record."],
                ["Productivity/task tools", "Notion, Asana, Todoist, ClickUp", "Track work and tasks.", "Focuses upstream on what decision to make and why, before task execution."],
                ["Coaching/advisory", "Executive coaches, mentors, consultants", "Get perspective and accountability.", "Cheaper, faster, always-on first pass; can feed better inputs into human advisors."],
                ["Strategy templates", "Miro, Coda, worksheets", "Structure thinking manually.", "Automates synthesis and next-action generation from live context."],
                ["Decision frameworks", "Mental-model courses, books", "Learn better thinking.", "Turns frameworks into a working product loop at the moment of decision."],
            ],
            [1.1, 1.25, 1.55, 2.6],
        )
    )
    story.append(para("The main competitive threat is not a direct clone. It is user inertia: people will try to get the same answer from a generic AI chat. Toward must prove that structure, memory, and evidence produce a materially better decision brief."))
    story.append(PageBreak())

    story.append(para("Business Model", "H1Plan"))
    story.append(
        make_table(
            ["Plan", "What to test"],
            [
                ["Free entry", "One complete decision brief with export watermark or limited saved decisions."],
                ["Pro", "$19-$39/month for unlimited active decisions, advisor packs, exports, follow-up reviews, and saved decision history."],
                ["Decision packs", "$9-$19 one-off premium brief for users not ready for a subscription."],
                ["Team", "$79-$149/month for shared decisions, comments, role-based access, admin controls, and team history."],
                ["Services-assisted validation", "Founding customer cohort with white-glove onboarding to learn language, templates, and willingness to pay."],
            ],
            [1.55, 4.95],
        )
    )
    story.append(para("Simple first-year model for planning only", "H2Plan"))
    story.append(
        make_table(
            ["Assumption", "Conservative", "Base", "Aggressive"],
            [
                ["Monthly site visitors by month 12", "10,000", "30,000", "75,000"],
                ["Visitor-to-free decision", "3%", "5%", "7%"],
                ["Free-to-paid conversion", "4%", "7%", "10%"],
                ["Average paid ARPU", "$24", "$29", "$39"],
                ["Estimated month-12 MRR", "$2.9k", "$30.5k", "$204.8k"],
            ],
            [2.1, 1.45, 1.45, 1.45],
        )
    )
    story.append(para("Treat this model as a planning scaffold, not a forecast. The key validation is whether a user with a real decision will complete a brief, trust it, and either pay or return for another decision."))
    story.append(para("Go-To-Market Plan", "H1Plan"))
    story.append(para("Offer a 'Founder Decision Brief' workflow: pick a decision type, add context, select advisors, receive a short brief, and schedule a review. The brief is the product's proof object and the conversion artifact."))
    story.append(
        make_table(
            ["Channel", "Execution", "Why it fits"],
            [
                ["Founder/operator communities", "Run weekly decision clinics in indie hacker, startup, agency, and solo-business communities.", "Puts Toward in front of users with active decisions and creates examples quickly."],
                ["SEO use-case pages", "Build pages for launch/no-launch, pricing, customer segment, hiring, negotiation, and offer design decisions.", "Captures high-intent queries better than broad productivity content."],
                ["Template lead magnets", "Publish decision brief templates and downloadable checklists.", "Turns abstract decision quality into a tangible artifact."],
                ["Consultant/fractional partnerships", "Give advisors a client-facing brief format they can use before calls.", "Toward can become preparation infrastructure for paid human advice."],
                ["Founder stories", "Publish before/after decision case studies with anonymized context.", "Trust comes from seeing the product reason through real ambiguity."],
            ],
            [1.3, 2.65, 2.55],
        )
    )
    story.append(PageBreak())

    story.append(para("90-Day Validation Roadmap", "H1Plan"))
    for item in numbered([
        "Weeks 1-2: pick the beachhead, rewrite landing and onboarding examples, define three decision templates, and harden production deployment.",
        "Weeks 3-4: recruit 25 founder/operator users with active decisions; manually review outputs; collect language, objections, and willingness-to-pay data.",
        "Weeks 5-8: launch public Founder Decision Brief offer, pricing test, analytics, and email follow-up loops.",
        "Weeks 9-12: publish case studies, expand templates, add export/share flow, and decide whether to double down on founders or add consultants as the second ICP.",
    ]):
        story.append(item)
    story.append(para("Success metrics", "H2Plan"))
    for item in [
        "Activation: 40%+ of signed-up users complete and save a first decision brief.",
        "Time-to-value: median time from signup to first brief under 20 minutes.",
        "Trust: 60%+ of completed brief users rate the recommendation as useful or decision-changing.",
        "Behavior: 30%+ complete the recommended next action or return for a decision review.",
        "Revenue: 5-8% free-to-paid conversion from users who complete a brief.",
    ]:
        story.append(bullet(item))
    story.append(para("Biggest Business Gaps Before Launch", "H1Plan"))
    story.append(
        make_table(
            ["#", "Gap", "Severity", "Why it matters", "Pre-launch requirement"],
            [
                ["1", "Launch ICP is too broad", "Critical", "The site spans career, negotiations, major purchases, startup strategy, hiring, and projects. That makes the product sound useful but not urgent.", "Choose one beachhead: founder/operators making business decisions in the next 30 days. Rewrite landing, onboarding examples, advisor defaults, and templates around that wedge."],
                ["2", "Production readiness / public source exposure", "Critical", "The latest site inspected at toward.to serves a Vite-style client app with source routes visible under /src. That is normal in development, but not a launch posture.", "Ship a production build, audit source maps and environment exposure, confirm auth/session settings, add monitoring, and run a security/privacy review before paid launch."],
                ["3", "No visible monetization architecture", "Critical", "The public surface sells value but does not show pricing, trial boundaries, paid limits, or a conversion path from decision moment to purchase.", "Add a pricing test: free first decision brief, Pro for unlimited decisions/advisor packs/export, Team for shared projects and admin controls."],
            ],
            [0.3, 1.05, 0.65, 2.05, 2.45],
            severity_col=2,
        )
    )
    story.append(PageBreak())

    story.append(para("Biggest Business Gaps Before Launch, continued", "H1Plan"))
    story.append(
        make_table(
            ["#", "Gap", "Severity", "Why it matters", "Pre-launch requirement"],
            [
                ["4", "Trust, liability, and data handling are under-specified", "High", "Toward touches career, hiring, negotiation, business strategy, and major purchases. Users may upload sensitive files and rely on outputs.", "Publish privacy/TOS, sensitive-data warnings, retention controls, deletion/export guarantees, and disclaimers for legal/financial/medical/hiring advice."],
                ["5", "Evidence and auditability gap", "High", "A 'defensible decision' needs assumptions, evidence, tradeoffs, confidence, and a record of why the recommendation changed.", "Add a decision brief format with assumptions register, missing information, alternatives rejected, confidence, and 'what would change this recommendation.'"],
                ["6", "Onboarding may feel abstract", "High", "The core product asks for context, constraints, files, advisors, and goals. Without templates, a new user may not know what a good input looks like.", "Create ICP-specific decision templates: choose first segment, launch beta, price offer, hire contractor, negotiate contract, cut scope."],
                ["7", "Retention loop is not yet obvious", "Medium", "Decision tools can become one-off utilities unless the product returns to outcomes and learning.", "Build next-action check-ins, decision review, outcome capture, weekly open-decision digest, and saved playbooks."],
                ["8", "Distribution surface is thin", "Medium", "The resource library currently has a small number of decision/productivity articles, so organic acquisition is early.", "Build use-case SEO pages and community-led distribution around founder decision moments; collect public examples and case studies."],
                ["9", "No launch metrics contract", "Medium", "The business needs to know whether Toward creates better action, not merely more AI output.", "Define activation as first saved/shared decision brief; track time-to-brief, next-action completion, return rate, and paid conversion by decision type."],
            ],
            [0.3, 1.05, 0.65, 2.05, 2.45],
            severity_col=2,
        )
    )
    story.append(para("Launch Readiness Checklist", "H1Plan"))
    story.append(
        make_table(
            ["Readiness area", "Minimum bar before launch"],
            [
                ["ICP and message", "One beachhead, one primary decision moment, one clear CTA, and landing copy rewritten around that user."],
                ["Product proof", "Decision brief includes context, assumptions, alternatives, advisor perspectives, risks, and next action."],
                ["Production/security", "Production build, no unintended source/config exposure, monitored auth, data deletion/export, backups, and incident contact."],
                ["Trust/legal", "Privacy policy, terms, sensitive-data guidance, disclaimers, and explicit scope for high-risk advice categories."],
                ["Pricing", "Public pricing or controlled pricing test with free-to-paid conversion path."],
                ["Analytics", "Events for signup, first decision, brief saved/exported, advisor use, rating, return, paid conversion, and churn reason."],
                ["Distribution", "At least six use-case pages, three example briefs, two founder-community campaigns, and one partner channel test."],
            ],
            [1.6, 4.9],
        )
    )

    story.append(PageBreak())
    story.append(para("Decisions for Founder Review", "H1Plan"))
    for item in [
        "Approve or reject the beachhead: founder/operators and independent professionals.",
        "Pick the first three decision templates: customer segment, launch/no-launch, pricing/offer.",
        "Decide the first monetization test: free first brief into Pro subscription, or paid one-off decision pack.",
        "Assign launch blockers: production deployment, privacy/TOS, pricing, analytics, and decision brief auditability.",
    ]:
        story.append(bullet(item))
    add_sources(story)

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(PDF_PATH)


if __name__ == "__main__":
    build_pdf()

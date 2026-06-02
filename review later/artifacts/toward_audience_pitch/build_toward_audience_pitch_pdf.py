from __future__ import annotations

import os
from dataclasses import dataclass
from datetime import date

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    Flowable,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.graphics.shapes import Drawing, Line, Rect, String


ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "toward.to_audience_pitch_2026-05-30.pdf")


PALETTE = {
    "ink": colors.HexColor("#17201B"),
    "muted": colors.HexColor("#5D6A61"),
    "line": colors.HexColor("#CBD7CE"),
    "soft": colors.HexColor("#F4F7F2"),
    "paper": colors.HexColor("#FFFDF8"),
    "green": colors.HexColor("#1D6B4F"),
    "green_light": colors.HexColor("#DCEBDF"),
    "amber": colors.HexColor("#B66B1F"),
    "amber_light": colors.HexColor("#F5E4CD"),
    "blue": colors.HexColor("#2E5E78"),
    "blue_light": colors.HexColor("#D9E8EE"),
    "red": colors.HexColor("#9B3E36"),
    "red_light": colors.HexColor("#F0DAD6"),
}


SOURCES = {
    "S1": (
        "toward.to public product surface, inspected May 30, 2026",
        "https://toward.to",
    ),
    "S2": (
        "Upwork Future Workforce Index press release, Apr. 23, 2025",
        "https://www.upwork.com/press/releases/upwork-study-finds-1-in-4-u-s-skilled-knowledge-workers-now-work-independently-generating-1-5-trillion-in-earnings",
    ),
    "S3": (
        "BLS CPS Annual Averages, Table 11b, 2025",
        "https://www.bls.gov/cps/cpsaat11b.htm",
    ),
    "S4": (
        "BLS median weekly earnings by occupation, 2025",
        "https://www.bls.gov/news.release/wkyeng.t08.htm",
    ),
    "S5": (
        "Pew Research Center, ChatGPT use among U.S. adults, Jun. 25, 2025",
        "https://www.pewresearch.org/short-reads/2025/06/25/34-of-us-adults-have-used-chatgpt-about-double-the-share-in-2023/",
    ),
    "S6": (
        "Gallup artificial intelligence workplace indicator, Q1 2026",
        "https://www.gallup.com/699797/indicator-artificial-intelligence.aspx",
    ),
    "S7": (
        "SBA Office of Advocacy small-business FAQ, Feb. 3, 2026",
        "https://advocacy.sba.gov/2026/02/03/advocacy-releases-frequently-asked-questions-about-small-businesses-2026/",
    ),
    "S8": (
        "Federal Reserve Banks, 2026 Report on Employer Firms",
        "https://www.fedsmallbusiness.org/2026-report-on-employer-firms",
    ),
    "S9": (
        "U.S. Census Bureau, AI Use at U.S. Businesses, May 26, 2026",
        "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
    ),
    "S10": (
        "Federal Reserve, Economic Well-Being of U.S. Households in 2025, May 2026",
        "https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-employment-and-job-quality.htm",
    ),
    "S11": (
        "Federal Reserve Bank of New York, SCE Labor Market Survey, Mar. 2026",
        "https://www.newyorkfed.org/microeconomics/sce/labor",
    ),
    "S12": (
        "Meta Advertising Standards and ad-targeting guidance",
        "https://transparency.meta.com/policies/ad-standards/",
    ),
}


@dataclass(frozen=True)
class Audience:
    name: str
    short: str
    rank: int
    definition: str
    age: str
    gender: str
    anchor: str
    problem: str
    source_notes: str
    scores: dict[str, float]
    color: colors.Color
    light: colors.Color


AUDIENCES = [
    Audience(
        name="Consultants / Service Sellers",
        short="Service Sellers",
        rank=1,
        definition=(
            "Solo consultants, agency owners, fractional operators, recruiters, coaches, accountants, "
            "and advisors whose product is judgment."
        ),
        age="30-54",
        gender="All genders",
        anchor="I cannot hand a client a fuzzy recommendation.",
        problem=(
            "A client wants a scope change, pricing call, hiring recommendation, or go/no-go decision. "
            "The seller needs a sharper point of view before the next call."
        ),
        source_notes=(
            "Upwork reports 28% of U.S. knowledge workers freelance or work independently, translating "
            "to 20M+ people and $1.5T in 2024 earnings. [S2]"
        ),
        scores={
            "Pain": 5,
            "Repeat": 5,
            "Budget": 4,
            "Reach": 3.5,
            "AI fit": 4.5,
            "Policy safety": 4,
        },
        color=PALETTE["green"],
        light=PALETTE["green_light"],
    ),
    Audience(
        name="White-Collar Decision Owners",
        short="Internal Decision Owners",
        rank=2,
        definition=(
            "PMs, ops leads, marketers, analysts, recruiters, chiefs of staff, and managers who must "
            "bring recommendations upward."
        ),
        age="27-45",
        gender="All genders",
        anchor="I need to walk into the meeting with an answer I can defend.",
        problem=(
            "They have to recommend launch, delay, cut scope, hire, change priority, or pick a segment "
            "while knowing the second question may expose weak thinking."
        ),
        source_notes=(
            "BLS counts 71.3M people in management, professional, and related occupations. Gallup says "
            "50% of U.S. employees now use AI at work at least a few times a year. [S3][S6]"
        ),
        scores={
            "Pain": 4,
            "Repeat": 4,
            "Budget": 3,
            "Reach": 5,
            "AI fit": 5,
            "Policy safety": 3,
        },
        color=PALETTE["blue"],
        light=PALETTE["blue_light"],
    ),
    Audience(
        name="Small-Business Decision Owners",
        short="Owner-Operators",
        rank=3,
        definition=(
            "Digitally active owners and operators in 2-50 person firms who make pricing, hiring, "
            "client, software, and growth calls."
        ),
        age="30-60",
        gender="All genders",
        anchor="If this call is wrong, I am the one who pays for it.",
        problem=(
            "They need to decide whether to hire, raise prices, fire a client, invest in a channel, "
            "buy software, or launch an offer."
        ),
        source_notes=(
            "SBA counts 36.2M U.S. small businesses. Fed SBCS finds 57% report reaching customers/growing "
            "sales as an operational challenge and 73% report increased costs as a financial challenge. [S7][S8]"
        ),
        scores={
            "Pain": 5,
            "Repeat": 5,
            "Budget": 3,
            "Reach": 4,
            "AI fit": 3.5,
            "Policy safety": 4,
        },
        color=PALETTE["amber"],
        light=PALETTE["amber_light"],
    ),
]


def styles():
    base = getSampleStyleSheet()
    base.add(
        ParagraphStyle(
            "TitleLarge",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=30,
            leading=34,
            textColor=PALETTE["ink"],
            spaceAfter=12,
            alignment=TA_LEFT,
        )
    )
    base.add(
        ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=12.5,
            leading=18,
            textColor=PALETTE["muted"],
            spaceAfter=14,
        )
    )
    base.add(
        ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=19,
            leading=24,
            textColor=PALETTE["ink"],
            spaceBefore=8,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=PALETTE["ink"],
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    base.add(
        ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=13.2,
            textColor=PALETTE["ink"],
            spaceAfter=6,
        )
    )
    base.add(
        ParagraphStyle(
            "BodySmall",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=10.8,
            textColor=PALETTE["ink"],
            spaceAfter=4,
        )
    )
    base.add(
        ParagraphStyle(
            "Caption",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.3,
            leading=9.4,
            textColor=PALETTE["muted"],
            spaceAfter=7,
        )
    )
    base.add(
        ParagraphStyle(
            "Pull",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=13.5,
            leading=18,
            textColor=PALETTE["ink"],
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            "Center",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=14,
            alignment=TA_CENTER,
            textColor=PALETTE["ink"],
        )
    )
    return base


class BarChart(Flowable):
    def __init__(self, title, rows, width=6.7 * inch, height=2.3 * inch, max_value=100, source=""):
        super().__init__()
        self.title = title
        self.rows = rows
        self.width = width
        self.height = height
        self.max_value = max_value
        self.source = source

    def draw(self):
        c = self.canv
        c.setFillColor(PALETTE["ink"])
        c.setFont("Helvetica-Bold", 11)
        c.drawString(0, self.height - 10, self.title)
        y = self.height - 33
        label_w = 142
        bar_w = self.width - label_w - 42
        for label, value, color, suffix in self.rows:
            c.setFillColor(PALETTE["muted"])
            c.setFont("Helvetica", 7.8)
            c.drawRightString(label_w - 8, y + 3, label)
            c.setFillColor(PALETTE["soft"])
            c.rect(label_w, y, bar_w, 12, fill=1, stroke=0)
            c.setFillColor(color)
            c.rect(label_w, y, bar_w * min(value / self.max_value, 1), 12, fill=1, stroke=0)
            c.setFillColor(PALETTE["ink"])
            c.setFont("Helvetica-Bold", 8)
            c.drawString(label_w + bar_w + 8, y + 2, f"{value:g}{suffix}")
            y -= 21
        if self.source:
            c.setFillColor(PALETTE["muted"])
            c.setFont("Helvetica", 6.8)
            c.drawString(0, 2, self.source)


class FitMatrix(Flowable):
    def __init__(self, audiences, width=6.85 * inch, height=2.8 * inch):
        super().__init__()
        self.audiences = audiences
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        dims = ["Pain", "Repeat", "Budget", "Reach", "AI fit", "Policy safety"]
        left = 122
        top = self.height - 28
        cell_w = (self.width - left - 10) / len(dims)
        row_h = 24
        c.setFillColor(PALETTE["ink"])
        c.setFont("Helvetica-Bold", 11)
        c.drawString(0, self.height - 10, "Audience fit scorecard")
        c.setFont("Helvetica", 6.7)
        c.setFillColor(PALETTE["muted"])
        for i, d in enumerate(dims):
            c.drawCentredString(left + i * cell_w + cell_w / 2, top + 11, d)
        for r, audience in enumerate(self.audiences):
            y = top - (r + 1) * row_h
            c.setFillColor(audience.light)
            c.roundRect(0, y - 1, self.width, row_h - 2, 4, fill=1, stroke=0)
            c.setFillColor(audience.color)
            c.setFont("Helvetica-Bold", 8.2)
            c.drawString(8, y + 6, f"#{audience.rank} {audience.short}")
            for i, d in enumerate(dims):
                value = audience.scores[d]
                x = left + i * cell_w + 7
                c.setFillColor(colors.white)
                c.roundRect(x, y + 5, cell_w - 14, 7, 3.5, fill=1, stroke=0)
                c.setFillColor(audience.color)
                c.roundRect(x, y + 5, (cell_w - 14) * value / 5, 7, 3.5, fill=1, stroke=0)
                c.setFillColor(PALETTE["ink"])
                c.setFont("Helvetica-Bold", 6.4)
                c.drawCentredString(left + i * cell_w + cell_w / 2, y - 3, f"{value:g}/5")
        c.setFillColor(PALETTE["muted"])
        c.setFont("Helvetica", 6.8)
        c.drawString(0, 6, "Scores are synthesis ratings from source-backed evidence: 5 is strongest.")


class DecisionMap(Flowable):
    def __init__(self, width=6.85 * inch, height=2.65 * inch):
        super().__init__()
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(PALETTE["ink"])
        c.drawString(0, self.height - 12, "The positioning map")
        x0, y0 = 78, 40
        w, h = self.width - 120, self.height - 78
        c.setStrokeColor(PALETTE["line"])
        c.setLineWidth(1)
        c.line(x0, y0, x0 + w, y0)
        c.line(x0, y0, x0, y0 + h)
        c.setFillColor(PALETTE["muted"])
        c.setFont("Helvetica", 7.3)
        c.drawCentredString(x0 + w / 2, 18, "Decision recurrence")
        c.saveState()
        c.translate(20, y0 + h / 2)
        c.rotate(90)
        c.drawCentredString(0, 0, "Emotional consequence")
        c.restoreState()

        points = [
            ("Consultants", 0.86, 0.58, PALETTE["green"], "Client-facing judgment", 10, -10),
            ("Internal owners", 0.62, 0.43, PALETTE["blue"], "Visible recommendation risk", 10, -6),
            ("Owner-operators", 0.84, 0.86, PALETTE["amber"], "Personal economic downside", 10, 4),
            ("Career decisions", 0.30, 0.84, PALETTE["red"], "High pain, low recurrence", 10, 0),
        ]
        for name, px, py, color, caption, dx, dy in points:
            x = x0 + w * px
            y = y0 + h * py
            c.setFillColor(color)
            c.circle(x, y, 7, fill=1, stroke=0)
            c.setFillColor(PALETTE["ink"])
            c.setFont("Helvetica-Bold", 8)
            c.drawString(x + dx, y + dy + 1, name)
            c.setFillColor(PALETTE["muted"])
            c.setFont("Helvetica", 6.8)
            c.drawString(x + dx, y + dy - 8, caption)


class QuoteBox(Flowable):
    def __init__(self, text, width=6.7 * inch, fill=PALETTE["soft"], stroke=PALETTE["line"]):
        super().__init__()
        self.text = text
        self.width = width
        self.fill = fill
        self.stroke = stroke
        self.height = 58

    def draw(self):
        c = self.canv
        c.setFillColor(self.fill)
        c.setStrokeColor(self.stroke)
        c.roundRect(0, 0, self.width, self.height, 6, fill=1, stroke=1)
        c.setFillColor(PALETTE["ink"])
        c.setFont("Helvetica-Bold", 13)
        lines = wrap_text(self.text, "Helvetica-Bold", 13, self.width - 34)
        y = self.height - 23
        for line in lines[:2]:
            c.drawString(17, y, line)
            y -= 17


def wrap_text(text, font_name, font_size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else current + " " + word
        if stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def para(text, style):
    return Paragraph(text, style)


def table(data, widths, style_commands):
    t = Table(data, colWidths=widths, hAlign="LEFT", repeatRows=1)
    base = [
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 7.5),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("BACKGROUND", (0, 0), (-1, 0), PALETTE["green"]),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 7.4),
        ("LEADING", (0, 1), (-1, -1), 9.2),
        ("TEXTCOLOR", (0, 1), (-1, -1), PALETTE["ink"]),
        ("GRID", (0, 0), (-1, -1), 0.35, PALETTE["line"]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    t.setStyle(TableStyle(base + style_commands))
    return t


def bullets(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), bulletColor=PALETTE["green"]) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=14,
        bulletFontSize=5,
    )


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PALETTE["paper"])
    canvas.rect(0, 0, LETTER[0], LETTER[1], fill=1, stroke=0)
    canvas.setStrokeColor(PALETTE["line"])
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, 0.55 * inch, LETTER[0] - doc.rightMargin, 0.55 * inch)
    canvas.setFillColor(PALETTE["muted"])
    canvas.setFont("Helvetica", 7)
    canvas.drawString(doc.leftMargin, 0.34 * inch, "toward.to audience pitch")
    canvas.drawRightString(LETTER[0] - doc.rightMargin, 0.34 * inch, f"{doc.page}")
    canvas.restoreState()


def build():
    s = styles()
    doc = SimpleDocTemplate(
        OUT,
        pagesize=LETTER,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.62 * inch,
        bottomMargin=0.72 * inch,
        title="toward.to Audience Pitch",
        author="Codex",
    )
    story = []

    # Cover
    story.append(Spacer(1, 0.35 * inch))
    story.append(para("toward.to Audience Pitch", s["TitleLarge"]))
    story.append(
        para(
            "The first paid-acquisition audiences should be people who have to make a call they may later have to defend.",
            s["Subtitle"],
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    story.append(QuoteBox("Sell the moment before commitment: 'What am I missing before I say yes?'"))
    story.append(Spacer(1, 0.22 * inch))
    story.append(
        para(
            "<b>Decision:</b> keep the three-audience system, but make each audience narrower. "
            "The winning wedge is not generic productivity, generic founders, or broad fear. It is pressure-tested judgment: "
            "a recommendation, a business call, or a next best action that carries consequences.",
            s["Body"],
        )
    )
    story.append(FitMatrix(AUDIENCES))
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        BarChart(
            "Current market scale signals",
            [
                ("Independent knowledge workers", 20, PALETTE["green"], "M+"),
                ("Management/professional workers", 71.3, PALETTE["blue"], "M"),
                ("U.S. small businesses", 36.2, PALETTE["amber"], "M"),
            ],
            max_value=80,
            source="Sources: Upwork Future Workforce Index [S2], BLS CPS annual averages [S3], SBA FAQ [S7].",
        )
    )
    story.append(PageBreak())

    # Thesis
    story.append(para("The Recommendation", s["H1"]))
    story.append(
        para(
            "The best audience is not the bravest person, the most anxious person, or the broadest person. "
            "It is the person whose status, revenue, or margin depends on making a better call under imperfect information.",
            s["Pull"],
        )
    )
    story.append(
        para(
            "toward.to's public product language already points in this direction: advisor perspectives, constraints, blind spots, "
            "and a next best action. That creates a clean paid message: bring one messy decision, get a defensible next move. [S1]",
            s["Body"],
        )
    )
    story.append(
        table(
            [
                ["Rank", "Audience", "Plain-English buyer", "Emotional anchor", "Example decision"],
                *[
                    [
                        f"#{a.rank}",
                        para(f"<b>{a.name}</b>", s["BodySmall"]),
                        para(a.definition, s["BodySmall"]),
                        para(a.anchor, s["BodySmall"]),
                        para(a.problem, s["BodySmall"]),
                    ]
                    for a in AUDIENCES
                ],
            ],
            [0.36 * inch, 1.45 * inch, 1.75 * inch, 1.55 * inch, 1.75 * inch],
            [
                ("BACKGROUND", (0, 1), (-1, 1), PALETTE["green_light"]),
                ("BACKGROUND", (0, 2), (-1, 2), PALETTE["blue_light"]),
                ("BACKGROUND", (0, 3), (-1, 3), PALETTE["amber_light"]),
            ],
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(DecisionMap())
    story.append(
        para(
            "The demoted audience is career-transition professionals. It has high emotion but weak recurrence: the Federal Reserve reports "
            "13% of adults started a new job in 2025, and the New York Fed's March 2026 survey put expected employer-change likelihood at 9.7%. "
            "Use it as a lead magnet, not as a core audience. [S10][S11]",
            s["Caption"],
        )
    )
    story.append(PageBreak())

    # Evidence
    story.append(para("Evidence That Matters", s["H1"]))
    story.append(
        para(
            "The core assumption is that people will not pay for another AI assistant. They may pay for a structured way to stop carrying a decision alone.",
            s["Body"],
        )
    )
    story.append(
        BarChart(
            "AI readiness: there is enough existing behavior to sell structure, not education",
            [
                ("Employees using AI at work at least yearly", 50, PALETTE["blue"], "%"),
                ("Employees using AI weekly or more", 28, PALETTE["blue"], "%"),
                ("Employed adults using ChatGPT for work", 28, PALETTE["green"], "%"),
                ("Employer firms using AI for work", 46, PALETTE["amber"], "%"),
                ("BTOS strict firm AI usage range", 20, PALETTE["red"], "%"),
            ],
            max_value=60,
            source="Sources: Gallup Q1 2026 [S6], Pew Jun. 2025 [S5], Fed SBCS 2026 [S8], Census BTOS May 2026 [S9].",
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(
        BarChart(
            "Small-business pain is concrete and decision-shaped",
            [
                ("Increased costs", 73, PALETTE["amber"], "%"),
                ("Reaching customers / growing sales", 57, PALETTE["amber"], "%"),
                ("Paying operating expenses", 54, PALETTE["amber"], "%"),
                ("Uneven cash flow", 50, PALETTE["amber"], "%"),
                ("Hiring / retaining staff", 46, PALETTE["amber"], "%"),
            ],
            max_value=80,
            source="Source: Federal Reserve Banks, 2026 Report on Employer Firms [S8].",
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        table(
            [
                ["Signal", "What the data says", "Implication for toward.to"],
                [
                    para("Service sellers have budget logic", s["BodySmall"]),
                    para(
                        "Upwork reports 28% of U.S. knowledge workers freelance or work independently; exclusive freelancers reported median income of $85K. [S2]",
                        s["BodySmall"],
                    ),
                    para(
                        "One improved client recommendation can justify a low-friction subscription.",
                        s["BodySmall"],
                    ),
                ],
                [
                    para("White-collar pool is huge", s["BodySmall"]),
                    para(
                        "BLS reports 71.3M people in management, professional, and related occupations; management/professional weekly median earnings were $1,645 in 2025. [S3][S4]",
                        s["BodySmall"],
                    ),
                    para(
                        "This is not a tiny niche, but the message must target recommendation owners, not all office workers.",
                        s["BodySmall"],
                    ),
                ],
                [
                    para("Small firms have pain and AI curiosity", s["BodySmall"]),
                    para(
                        "SBA counts 36.2M small businesses; Fed SBCS says 46% of employer firms used AI for work at survey time and 15% planned to use it within 12 months. [S7][S8]",
                        s["BodySmall"],
                    ),
                    para(
                        "The best target is the digitally active owner-operator, not the entire SMB universe.",
                        s["BodySmall"],
                    ),
                ],
            ],
            [1.2 * inch, 2.9 * inch, 2.45 * inch],
            [],
        )
    )
    story.append(PageBreak())

    # Audience deep dives
    story.append(para("Audience 1: Consultants / Service Sellers", s["H1"]))
    a = AUDIENCES[0]
    story.append(para(f"<b>Definition:</b> {a.definition}", s["Body"]))
    story.append(para(f"<b>Age:</b> {a.age}. <b>Gender:</b> {a.gender}. Do not split by gender at launch; the buying trigger is client-facing pressure.", s["Body"]))
    story.append(para(f"<b>Emotional anchor:</b> {a.anchor}", s["Pull"]))
    story.append(para(a.source_notes, s["Body"]))
    story.append(
        bullets(
            [
                "Best offer: <b>Client Decision Brief</b> - turn notes, constraints, and messy client context into a recommendation you can defend.",
                "Best problem pages: scope creep, pricing recommendation, client priority call, agency strategy recommendation, hiring a contractor.",
                "Primary ad danger: sounding like generic AI writing. They do not want more words; they want a sharper point of view.",
            ],
            s["Body"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(para("<b>Ad slogans to test</b>", s["H2"]))
    story.append(
        table(
            [
                ["Hook", "Emotional job", "CTA"],
                [
                    para("Before you send the recommendation, ask what you're missing.", s["BodySmall"]),
                    para("Protect credibility before the client sees the answer.", s["BodySmall"]),
                    para("Build my client decision brief", s["BodySmall"]),
                ],
                [
                    para("Your client bought judgment. Bring the sharper version.", s["BodySmall"]),
                    para("Reframe toward.to as professional leverage, not AI novelty.", s["BodySmall"]),
                    para("Pressure-test this client call", s["BodySmall"]),
                ],
                [
                    para("Turn a messy client call into a decision your client can say yes to.", s["BodySmall"]),
                    para("Move from discussion to commitment.", s["BodySmall"]),
                    para("Get the next best action", s["BodySmall"]),
                ],
            ],
            [2.35 * inch, 2.65 * inch, 1.55 * inch],
            [("BACKGROUND", (0, 1), (-1, -1), PALETTE["green_light"])],
        )
    )

    story.append(PageBreak())
    story.append(para("Audience 2: White-Collar Decision Owners", s["H1"]))
    a = AUDIENCES[1]
    story.append(para(f"<b>Definition:</b> {a.definition}", s["Body"]))
    story.append(para(f"<b>Age:</b> {a.age}. <b>Gender:</b> {a.gender}. Use role and problem targeting; gender is not a strategic variable here.", s["Body"]))
    story.append(para(f"<b>Emotional anchor:</b> {a.anchor}", s["Pull"]))
    story.append(para(a.source_notes, s["Body"]))
    story.append(
        bullets(
            [
                "Best offer: <b>Meeting Decision Check</b> - pressure-test the recommendation before the room pressures you.",
                "Best problem pages: launch/no launch, cut scope or delay, segment choice, budget tradeoff, hiring recommendation.",
                "Primary ad danger: never imply the viewer is insecure, failing, replaceable, or about to lose a job. Make the work moment visible, not the person's vulnerability. [S12]",
            ],
            s["Body"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(para("<b>Ad slogans to test</b>", s["H2"]))
    story.append(
        table(
            [
                ["Hook", "Emotional job", "CTA"],
                [
                    para("Bring the answer that survives the second question.", s["BodySmall"]),
                    para("Status protection in a visible work moment.", s["BodySmall"]),
                    para("Pressure-test my recommendation", s["BodySmall"]),
                ],
                [
                    para("Before the meeting, find the blind spot.", s["BodySmall"]),
                    para("Reduce the fear of being exposed by a better question.", s["BodySmall"]),
                    para("Check this decision", s["BodySmall"]),
                ],
                [
                    para("Less second-guessing. Better next move.", s["BodySmall"]),
                    para("Turn ambiguity into an action the team can evaluate.", s["BodySmall"]),
                    para("Get my next best action", s["BodySmall"]),
                ],
            ],
            [2.35 * inch, 2.65 * inch, 1.55 * inch],
            [("BACKGROUND", (0, 1), (-1, -1), PALETTE["blue_light"])],
        )
    )

    story.append(PageBreak())
    story.append(para("Audience 3: Small-Business Decision Owners", s["H1"]))
    a = AUDIENCES[2]
    story.append(para(f"<b>Definition:</b> {a.definition}", s["Body"]))
    story.append(para(f"<b>Age:</b> {a.age}. <b>Gender:</b> {a.gender}. Target by business ownership, software behavior, and decision problem.", s["Body"]))
    story.append(para(f"<b>Emotional anchor:</b> {a.anchor}", s["Pull"]))
    story.append(para(a.source_notes, s["Body"]))
    story.append(
        bullets(
            [
                "Best offer: <b>Owner's Decision Brief</b> - make the call before it burns time, cash, or trust.",
                "Best problem pages: raise prices, hire or wait, fire a client, buy software, invest in a channel, launch a new offer.",
                "Primary ad danger: targeting every small-business owner. The wedge is digitally active operators, especially services and knowledge-heavy firms.",
            ],
            s["Body"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(para("<b>Ad slogans to test</b>", s["H2"]))
    story.append(
        table(
            [
                ["Hook", "Emotional job", "CTA"],
                [
                    para("Small business decisions do not feel small when you are the one paying.", s["BodySmall"]),
                    para("Name the owner burden without pity.", s["BodySmall"]),
                    para("Build my owner's decision brief", s["BodySmall"]),
                ],
                [
                    para("Before you hire, raise prices, or say yes, get the next best action.", s["BodySmall"]),
                    para("Compress the common decision set into one promise.", s["BodySmall"]),
                    para("Check this business call", s["BodySmall"]),
                ],
                [
                    para("Turn owner's doubt into a decision plan.", s["BodySmall"]),
                    para("Make doubt usable instead of paralyzing.", s["BodySmall"]),
                    para("Get the next move", s["BodySmall"]),
                ],
            ],
            [2.35 * inch, 2.65 * inch, 1.55 * inch],
            [("BACKGROUND", (0, 1), (-1, -1), PALETTE["amber_light"])],
        )
    )
    story.append(PageBreak())

    # Campaign plan
    story.append(para("The Pitch", s["H1"]))
    story.append(
        para(
            "toward.to is not an AI productivity app. It is the place you go before a consequential yes, no, or not yet.",
            s["Pull"],
        )
    )
    story.append(
        para(
            "The ad should make the user feel the moment before commitment: the email before the client sees the recommendation, "
            "the meeting before an executive asks the second question, the hire before payroll becomes heavier. The promise is not confidence as a vibe. "
            "The promise is a more defensible next action.",
            s["Body"],
        )
    )
    story.append(
        table(
            [
                ["Campaign", "Audience", "Landing-page promise", "Primary CTA", "First test metric"],
                [
                    para("Client Call Rescue", s["BodySmall"]),
                    para("Consultants / service sellers", s["BodySmall"]),
                    para("Turn messy client context into a recommendation you can defend.", s["BodySmall"]),
                    para("Build my client decision brief", s["BodySmall"]),
                    para("Completed decision brief / landing-page visit", s["BodySmall"]),
                ],
                [
                    para("Before The Meeting", s["BodySmall"]),
                    para("White-collar decision owners", s["BodySmall"]),
                    para("Find the blind spot before the room does.", s["BodySmall"]),
                    para("Pressure-test my recommendation", s["BodySmall"]),
                    para("Quick-advice starts / landing-page visit", s["BodySmall"]),
                ],
                [
                    para("Owner's Next Move", s["BodySmall"]),
                    para("Small-business decision owners", s["BodySmall"]),
                    para("Make the call before it burns cash, time, or trust.", s["BodySmall"]),
                    para("Check this business call", s["BodySmall"]),
                    para("Email capture or trial start / landing-page visit", s["BodySmall"]),
                ],
            ],
            [1.15 * inch, 1.45 * inch, 1.8 * inch, 1.25 * inch, 1.25 * inch],
            [],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(para("30-Day Test Plan", s["H2"]))
    story.append(
        bullets(
            [
                "Run three ad sets with equal starting budget: one audience, one pain, one landing promise per ad set.",
                "Use two emotional hooks per audience and one product proof creative: a sample decision brief, a blind-spot checklist, or a before/after decision frame.",
                "Do not optimize on click-through alone. Track: landing-page view, quick-advice start, decision brief completion, email capture, and paid intent.",
                "Kill broad fear language early. The copy should never sound like it knows the viewer is failing, replaceable, broke, or desperate.",
                "Retain the career-decision angle as a content offer: 'Accept the offer?' can drive leads, but it should not replace the three core audiences.",
            ],
            s["Body"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(para("Copy Guardrails", s["H2"]))
    story.append(
        table(
            [
                ["Weak / risky", "Use instead"],
                [
                    para("Worried you'll lose your job?", s["BodySmall"]),
                    para("Before the meeting, pressure-test your recommendation.", s["BodySmall"]),
                ],
                [
                    para("Are you a struggling small-business owner?", s["BodySmall"]),
                    para("Before you hire, raise prices, or say yes, get the next best action.", s["BodySmall"]),
                ],
                [
                    para("Need AI to think for you?", s["BodySmall"]),
                    para("Bring the context. Toward finds the blind spots and next move.", s["BodySmall"]),
                ],
                [
                    para("Founders, be brave.", s["BodySmall"]),
                    para("Before you commit, ask what the decision depends on.", s["BodySmall"]),
                ],
            ],
            [2.5 * inch, 4.05 * inch],
            [
                ("BACKGROUND", (0, 1), (0, -1), PALETTE["red_light"]),
                ("BACKGROUND", (1, 1), (1, -1), PALETTE["green_light"]),
            ],
        )
    )
    story.append(PageBreak())

    # References
    story.append(para("References", s["H1"]))
    story.append(
        para(
            "All cited numbers in this memo are tied to the references below. Private platform benchmarks should still be validated with your own funnel data.",
            s["Body"],
        )
    )
    ref_rows = [["ID", "Source", "URL"]]
    for sid, (name, url) in SOURCES.items():
        ref_rows.append([sid, para(name, s["BodySmall"]), para(url, s["Caption"])])
    story.append(
        table(
            ref_rows,
            [0.42 * inch, 2.55 * inch, 3.65 * inch],
            [
                ("FONTSIZE", (0, 1), (0, -1), 7),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
            ],
        )
    )

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    return OUT


if __name__ == "__main__":
    print(build())

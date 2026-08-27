/*
 * NAVGAS Limited — 6-Month Performance Review (Maintenance Engineer)
 * Generates: dist/NAVGAS-6-Month-Performance-Review.pptx
 *
 * Built on the same layout system as deck/build-deck.js: a two-layer slide
 * head (a claim over its supporting line), a bottom evidence band, one page
 * margin, and Cambria/Calibri throughout. The palette is the review's own
 * NAVGAS identity rather than the case study's.
 *
 * Every list on this deck is ONE text box with real bullet runs. The source
 * file this replaces gave each bullet its own auto-sized shape and stepped the
 * y offset in the wrong unit, so items 2..n landed between 9" and 39" down a
 * 7.5" slide — off the page. Keep lists in a single addText call.
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "dist", "NAVGAS-6-Month-Performance-Review.pptx");

// ── palette ────────────────────────────────────────────────────────────────
const INK   = "0B1F33"; // deep navy — dominant on dark slides
const INK2  = "16324F"; // lifted navy for layering on dark
const TEAL  = "147D7E"; // primary accent
const BLUE  = "1F4E79"; // secondary
const AMBER = "C9942E"; // third
const GREEN = "2F7D4B"; // fourth
const PAPER = "FFFFFF";
const MIST  = "F1F4F8"; // card tint
const MIST2 = "E4EAF1"; // deeper card tint
const TEALT = "EAF6F6"; // teal tint — the "where this is going" panel
const SLATE = "56677A"; // muted body
const LINE  = "CFD8E3";
const FAINT = "8494A6";
const ONDARK  = "B9CBDD"; // body text on navy
const ONDARK2 = "7FA8CE"; // kickers on navy

const HEAD = "Cambria";
const BODY = "Calibri";

const W = 13.33, H = 7.5;
const M = 0.62;              // page margin
const CW = W - M * 2;        // content width = 12.09
const BODY_Y = 1.80;         // every content slide starts its body here
const BAND_Y = 6.50;         // evidence band
const BODY_H = BAND_Y - BODY_Y - 0.16; // 4.54 — max height for a body block

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Aniekeme Umoren";
// pptxgenjs writes docProps/app.xml unescaped, so keep "&" out of the metadata
pres.company = "NAVGAS Limited, Maintenance and Reliability";
pres.title = "6-Month Performance Review — Maintenance Engineer";

// ── helpers ────────────────────────────────────────────────────────────────
// pptxgenjs converts option objects to EMU in place, so every call builds a
// fresh one rather than sharing a module-level constant.
const shadow = () => ({
  type: "outer", color: "8A99AC", blur: 8, offset: 1.5, angle: 90, opacity: 0.16,
});

function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: INK };
  return s;
}

function lightSlide() {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  return s;
}

/**
 * Two-layer slide head: the claim a reviewer can act on, over the line that
 * qualifies it. valign middle lets a one- or two-line claim sit correctly in
 * the same box, and the box stops short of BODY_Y either way.
 */
function slideHead(s, kicker, claim, support) {
  s.addText(kicker.toUpperCase(), {
    x: M, y: 0.32, w: CW, h: 0.24, isTextBox: true,
    fontFace: BODY, fontSize: 11, bold: true, color: TEAL,
    charSpacing: 1.6, margin: 0, valign: "middle",
  });
  s.addText(claim, {
    x: M, y: 0.54, w: CW, h: 0.88, isTextBox: true,
    fontFace: HEAD, fontSize: 24, bold: true, color: INK,
    margin: 0, valign: "middle", lineSpacing: 29,
  });
  if (support) {
    s.addText(support, {
      x: M, y: 1.44, w: CW, h: 0.28, isTextBox: true,
      fontFace: BODY, fontSize: 12, italic: true, color: SLATE,
      margin: 0, valign: "middle",
    });
  }
}

/** Bottom evidence band — what substantiates the slide above it. */
function evidenceBand(s, parts) {
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: BAND_Y, w: CW, h: 0.52, rectRadius: 0.06,
    fill: { color: MIST }, line: { color: LINE, width: 0.75 },
  });
  const cell = CW / parts.length;
  parts.forEach((p, i) => {
    s.addText(
      [
        { text: p.k + "  ", options: { bold: true, color: INK } },
        { text: p.v, options: { color: SLATE } },
      ],
      {
        x: M + i * cell + 0.16, y: BAND_Y, w: cell - 0.32, h: 0.52, isTextBox: true,
        fontFace: BODY, fontSize: 9.5, margin: 0, valign: "middle", lineSpacing: 12,
      }
    );
  });
}

/** Full-width dark statement bar — the one takeaway from the slide. */
function takeaway(s, text) {
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: BAND_Y, w: CW, h: 0.52, rectRadius: 0.06,
    fill: { color: INK }, line: { type: "none" },
  });
  s.addText(text, {
    x: M + 0.22, y: BAND_Y, w: CW - 0.44, h: 0.52, isTextBox: true,
    fontFace: BODY, fontSize: 11.5, bold: true, color: PAPER,
    margin: 0, valign: "middle", align: "center",
  });
}

function card(s, o) {
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.05,
    fill: { color: o.fill || MIST },
    line: o.line === null ? { type: "none" } : { color: o.line || LINE, width: 0.75 },
    shadow: o.shadow ? shadow() : undefined,
  });
}

/** Small caps label used inside a card. Width is always explicit — the source
 *  file left these at w=0, which renders one letter per line. */
function eyebrow(s, text, x, y, w, color) {
  s.addText(text.toUpperCase(), {
    x, y, w, h: 0.22, isTextBox: true,
    fontFace: BODY, fontSize: 9.5, bold: true, color: color || TEAL,
    charSpacing: 1.2, margin: 0, valign: "middle",
  });
}

/**
 * One bulleted list in ONE text box. `size` and `gap` are tuned per slide so
 * the block fills its card without overflowing it.
 */
function bullets(s, items, o) {
  s.addText(
    items.map((t, i) => ({
      text: t,
      options: { bullet: { code: "2022" }, breakLine: i < items.length - 1 },
    })),
    {
      x: o.x, y: o.y, w: o.w, h: o.h, isTextBox: true,
      fontFace: BODY, fontSize: o.size || 11.5, color: o.color || "1F2933",
      margin: 0, valign: "top", lineSpacing: o.lineSpacing || 14,
      paraSpaceAfter: o.gap === undefined ? 6 : o.gap,
    }
  );
}

/** Numbered circular badge — the deck's repeating motif. */
function badge(s, x, y, d, label, fill) {
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" },
  });
  s.addText(label, {
    x, y, w: d, h: d, align: "center", valign: "middle", isTextBox: true,
    fontFace: BODY, fontSize: d > 0.5 ? 13 : 10, bold: true, color: PAPER, margin: 0,
  });
}

/** Metric tile: the figure, what it counts, and where the figure comes from. */
function stat(s, o) {
  card(s, { x: o.x, y: o.y, w: o.w, h: o.h, fill: o.fill || MIST, line: LINE });
  s.addText(o.value, {
    x: o.x + 0.2, y: o.y + 0.12, w: o.w - 0.4, h: 0.62, isTextBox: true,
    fontFace: HEAD, fontSize: o.valueSize || 30, bold: true, color: o.color,
    margin: 0, valign: "middle",
  });
  s.addText(o.label, {
    x: o.x + 0.2, y: o.y + 0.76, w: o.w - 0.4, h: o.src ? 0.34 : 0.5, isTextBox: true,
    fontFace: BODY, fontSize: 10.5, bold: true, color: INK,
    margin: 0, valign: "top", lineSpacing: 12.5,
  });
  if (o.src) {
    s.addText(o.src, {
      x: o.x + 0.2, y: o.y + o.h - 0.32, w: o.w - 0.4, h: 0.24, isTextBox: true,
      fontFace: BODY, fontSize: 9, color: FAINT, margin: 0, valign: "middle",
    });
  }
}

/** Forward-looking chip. Reads as a commitment, not decoration. */
function chip(s, text, o) {
  const h = o.h || 0.34;
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h, rectRadius: 0.05,
    fill: { color: o.fill || PAPER }, line: { color: o.line || TEAL, width: 0.75 },
  });
  s.addText(text, {
    x: o.x + 0.12, y: o.y, w: o.w - 0.24, h, isTextBox: true,
    fontFace: BODY, fontSize: 9.5, bold: true, color: o.color || TEAL,
    margin: 0, valign: "middle", align: "center",
  });
}

/* ════════════════════════════════════════════════════════════════════════
   1 — TITLE
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = darkSlide();

  s.addText("6-MONTH PERFORMANCE REVIEW  ·  PROBATION", {
    x: M, y: 1.36, w: CW, h: 0.3, isTextBox: true,
    fontFace: BODY, fontSize: 11.5, bold: true, color: ONDARK2,
    charSpacing: 2, margin: 0, valign: "middle",
  });

  s.addText("Maintenance Engineer", {
    x: M, y: 1.68, w: CW, h: 1.0, isTextBox: true,
    fontFace: HEAD, fontSize: 50, bold: true, color: PAPER, margin: 0, valign: "middle",
  });

  s.addText("NAVGAS Limited  ·  Maintenance & Reliability (M&R)", {
    x: M, y: 2.74, w: CW, h: 0.36, isTextBox: true,
    fontFace: BODY, fontSize: 16, color: ONDARK, margin: 0, valign: "middle",
  });

  s.addText("February – August 2026  ·  Start date 9 February 2026  ·  Probation period 6 months", {
    x: M, y: 3.12, w: CW, h: 0.32, isTextBox: true,
    fontFace: BODY, fontSize: 13, italic: true, color: "88A6C4", margin: 0, valign: "middle",
  });

  s.addText("THE ARC OF THE FIRST SIX MONTHS", {
    x: M, y: 4.24, w: CW, h: 0.28, isTextBox: true,
    fontFace: BODY, fontSize: 10.5, bold: true, color: ONDARK2,
    charSpacing: 1.6, margin: 0, valign: "middle",
  });

  const stages = ["Learning", "Supporting", "Taking ownership", "Ready for greater responsibility"];
  const sw = 2.86, sgap = 0.19;
  stages.forEach((t, i) => {
    const x = M + i * (sw + sgap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 4.58, w: sw, h: 0.66, rectRadius: 0.05,
      fill: { color: INK2 }, line: { color: "35597F", width: 0.75 },
    });
    s.addText(t, {
      x: x + 0.12, y: 4.58, w: sw - 0.24, h: 0.66, isTextBox: true,
      fontFace: BODY, fontSize: 12, bold: true, color: PAPER,
      margin: 0, align: "center", valign: "middle",
    });
    if (i < stages.length - 1) {
      s.addText("→", {
        x: x + sw, y: 4.58, w: sgap, h: 0.66, isTextBox: true,
        fontFace: BODY, fontSize: 12, color: ONDARK2,
        margin: 0, align: "center", valign: "middle",
      });
    }
  });

  s.addText("Prepared by Aniekeme Umoren  ·  28 August 2026", {
    x: M, y: 6.5, w: CW, h: 0.3, isTextBox: true,
    fontFace: BODY, fontSize: 11, color: "6E8CAB", margin: 0, valign: "middle",
  });

  s.addNotes(
    "Opening line: I joined on 9 February as Maintenance Engineer in M&R, and this is a review of the first six months against the contract, the working JD and the assigned 2026 KPI framework.\n\n" +
    "Set the frame with the four stages along the bottom: I came in learning the plant and the systems, moved to supporting the work, then took ownership of specific parts of it — CMMS and stores in particular — and I am asking to be assessed as ready for more.\n\n" +
    "Say up front that every figure in this deck is traceable to a record: Ultimo, the monthly inventory reports, procurement records, PTWs and the M&R shared folder. Then move on — do not linger on this slide."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   2 — EXECUTIVE SUMMARY
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Executive summary",
    "Four areas carried the first six months.",
    "CMMS ownership, stores control, documentation and hands-on maintenance support — in that order of contribution."
  );

  const areas = [
    { n: "01", t: "CMMS / Ultimo", c: TEAL,
      d: "Raise and schedule work orders, create contractor PTWs, and follow up execution and closeout — now done independently." },
    { n: "02", t: "Stores / Inventory", c: BLUE,
      d: "Reorganised the store, tagged 300+ items, started monthly reporting in April and keep consumables replenished." },
    { n: "03", t: "Documentation", c: AMBER,
      d: "Maintain a traceable record of maintenance, inventory and project activity across Ultimo and the M&R shared folder." },
    { n: "04", t: "Maintenance support", c: GREEN,
      d: "Support terminal maintenance, asset integrity, contractor supervision and troubleshooting across the site." },
  ];

  const cw2 = (CW - 0.28) / 2, ch = (BODY_H - 0.24) / 2;
  areas.forEach((a, i) => {
    const x = M + (i % 2) * (cw2 + 0.28);
    const y = BODY_Y + Math.floor(i / 2) * (ch + 0.24);
    card(s, { x, y, w: cw2, h: ch, fill: PAPER, shadow: true });
    badge(s, x + 0.28, y + 0.3, 0.56, a.n, a.c);
    s.addText(a.t, {
      x: x + 1.0, y: y + 0.3, w: cw2 - 1.28, h: 0.42, isTextBox: true,
      fontFace: HEAD, fontSize: 17, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(a.d, {
      x: x + 1.0, y: y + 0.8, w: cw2 - 1.28, h: 0.96, isTextBox: true,
      fontFace: BODY, fontSize: 12, color: "1F2933", margin: 0, valign: "top", lineSpacing: 16,
    });
  });

  takeaway(s, "Overall theme: broader plant familiarity, stronger system ownership, and increasing readiness for independent routine maintenance.");

  s.addNotes(
    "This is the whole review in one slide — if the conversation goes somewhere else after this, these are the four things I want remembered.\n\n" +
    "01 CMMS is where the change is clearest: I arrived with no Ultimo experience and now run the day-to-day maintenance control in it.\n" +
    "02 Stores is where the measurable improvement is: 300+ items tagged, monthly reporting running since April.\n" +
    "03 Documentation is honest work in progress — the records exist and are traceable, but I want to move from uploading when due to capturing as produced.\n" +
    "04 Maintenance support is breadth: valves, gauges, PRVs, pipeline testing, corrosion control, contractor supervision.\n\n" +
    "Land the takeaway line and move to the baseline slide."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   3 — ROLE & PERFORMANCE EXPECTATIONS
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "The baseline",
    "What the role was set up to deliver.",
    "Taken from the employment contract, the working job description and the assigned 2026 KPI framework."
  );

  const lw = 4.1, rw = CW - lw - 0.3, rx = M + lw + 0.3;

  // left — role baseline
  card(s, { x: M, y: BODY_Y, w: lw, h: BODY_H, fill: MIST });
  eyebrow(s, "Role baseline", M + 0.28, BODY_Y + 0.26, lw - 0.56);
  s.addText("Maintenance Engineer", {
    x: M + 0.28, y: BODY_Y + 0.52, w: lw - 0.56, h: 0.38, isTextBox: true,
    fontFace: HEAD, fontSize: 17, bold: true, color: INK, margin: 0, valign: "middle",
  });
  s.addText("Maintenance & Reliability Department", {
    x: M + 0.28, y: BODY_Y + 0.9, w: lw - 0.56, h: 0.28, isTextBox: true,
    fontFace: BODY, fontSize: 12, bold: true, color: TEAL, margin: 0, valign: "middle",
  });
  eyebrow(s, "Contracted duties", M + 0.28, BODY_Y + 1.34, lw - 0.56, SLATE);
  bullets(s, [
    "Inspect and maintain operating equipment to schedule",
    "Maintain measurement accuracy through checks and calibration",
    "Manage and monitor maintenance contractors",
    "Troubleshoot and improve operations processes",
    "Support project / construction compliance inspections",
    "Ensure qualified contractor personnel are engaged",
  ], { x: M + 0.28, y: BODY_Y + 1.64, w: lw - 0.56, h: 2.8, size: 11, lineSpacing: 14, gap: 7 });

  // right — assigned ownership and KPI themes
  card(s, { x: rx, y: BODY_Y, w: rw, h: BODY_H, fill: PAPER, shadow: true });
  eyebrow(s, "Assigned ownership & 2026 KPI themes", rx + 0.28, BODY_Y + 0.26, rw - 0.56);

  const themes = [
    { t: "CMMS / Ultimo",        d: "Work orders · PTWs · scheduling · follow-up · closeout · asset tree", c: TEAL },
    { t: "Stores / Inventory",   d: "Tagging · reconciliation · replenishment · monthly reporting",       c: BLUE },
    { t: "Documentation",        d: "M&R shared folder · project records · PTW traceability",             c: AMBER },
    { t: "Safety & Compliance",  d: "PTW · TRA · LOTO · SCE · contractor controls · audits",              c: GREEN },
    { t: "Maintenance & Reliability", d: "PM / CM execution · equipment reliability · integrity support", c: TEAL },
    { t: "Procurement",          d: "RFQs · requisitions · POs · maintenance material follow-up",         c: BLUE },
  ];
  const rowH = 0.6, ry0 = BODY_Y + 0.58;
  themes.forEach((t, i) => {
    const y = ry0 + i * rowH;
    s.addShape(pres.ShapeType.ellipse, {
      x: rx + 0.28, y: y + 0.21, w: 0.13, h: 0.13, fill: { color: t.c }, line: { type: "none" },
    });
    s.addText(t.t, {
      x: rx + 0.52, y, w: 2.5, h: rowH, isTextBox: true,
      fontFace: BODY, fontSize: 11.5, bold: true, color: INK, margin: 0, valign: "middle", lineSpacing: 13,
    });
    s.addText(t.d, {
      x: rx + 3.1, y, w: rw - 3.38, h: rowH, isTextBox: true,
      fontFace: BODY, fontSize: 11, color: SLATE, margin: 0, valign: "middle",
    });
    if (i < themes.length - 1) {
      s.addShape(pres.ShapeType.line, {
        x: rx + 0.28, y: y + rowH, w: rw - 0.56, h: 0,
        line: { color: MIST2, width: 0.75 },
      });
    }
  });

  evidenceBand(s, [
    { k: "Start date", v: "9 February 2026" },
    { k: "Probation", v: "6 months" },
    { k: "Basis", v: "Contract · working JD · 2026 KPI framework" },
  ]);

  s.addNotes(
    "Purpose of this slide: agree the yardstick before I claim anything against it.\n\n" +
    "Left is the contracted role — six duties from the employment contract and the working JD.\n" +
    "Right is what I was actually assigned to own day to day, grouped into the six 2026 KPI themes. The rest of the deck follows the first four of these.\n\n" +
    "One caveat to state openly: the JD in the shared folder is treated as a working reference rather than a signed document, so I have also worked to the responsibilities and KPI framework I was assigned directly. If HR has a more current JD I would welcome it.\n\n" +
    "Do not read the six themes out — point at them and move on."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   4 — FOCUS AREA 01 · CMMS / ULTIMO
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Focus area 01  ·  CMMS / Ultimo",
    "From no prior Ultimo experience to daily CMMS ownership.",
    "Work orders, permits, scheduling and follow-up are now raised and tracked without supervision."
  );

  const stats = [
    { v: "3+", l: "Work orders raised per week", src: "Ultimo · since mid-March", c: TEAL },
    { v: "5+", l: "PTWs created per week", src: "Ultimo · since mid-March", c: BLUE },
    { v: "5+", l: "Contractor jobs processed per week", src: "Ultimo · since mid-March", c: AMBER },
    { v: "Monthly", l: "Work-order reporting and follow-up", src: "Reporting cycle", c: GREEN, size: 24 },
  ];
  const sw = (CW - 0.3 * 3) / 4;
  stats.forEach((st, i) => {
    stat(s, {
      x: M + i * (sw + 0.3), y: BODY_Y, w: sw, h: 1.5,
      value: st.v, label: st.l, src: st.src, color: st.c, valueSize: st.size || 30, fill: PAPER,
    });
  });

  const y2 = BODY_Y + 1.72, h2 = BODY_H - 1.72;
  const lw = 6.4, rw = CW - lw - 0.3, rx = M + lw + 0.3;

  card(s, { x: M, y: y2, w: lw, h: h2, fill: PAPER, shadow: true });
  eyebrow(s, "What I now do independently", M + 0.28, y2 + 0.24, lw - 0.56);
  bullets(s, [
    "Create and raise maintenance work orders",
    "Schedule maintenance activities",
    "Create permit-to-work requirements for contractors",
    "Follow up pending work orders and maintenance execution",
    "Support technical closeout and record visibility",
  ], { x: M + 0.28, y: y2 + 0.58, w: lw - 0.56, h: h2 - 0.82, size: 12, lineSpacing: 15, gap: 8 });

  card(s, { x: rx, y: y2, w: rw, h: h2, fill: TEALT, line: "BDE0DF" });
  eyebrow(s, "Development impact", rx + 0.28, y2 + 0.24, rw - 0.56);
  s.addText("I started with zero Ultimo knowledge. The CMMS is now the system I use to control day-to-day maintenance, not one I need help to operate.", {
    x: rx + 0.28, y: y2 + 0.58, w: rw - 0.56, h: 1.2, isTextBox: true,
    fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 17,
  });
  eyebrow(s, "Next focus", rx + 0.28, y2 + 1.86, rw - 0.56, SLATE);
  chip(s, "Close work orders promptly", { x: rx + 0.28, y: y2 + 2.14, w: rw - 0.56 });
  chip(s, "Review redundant / obsolete orders", { x: rx + 0.28, y: y2 + 2.56, w: rw - 0.56 });

  evidenceBand(s, [
    { k: "Evidence", v: "Ultimo work-order and PTW records" },
    { k: "Basis of figures", v: "Weekly minimum since mid-March" },
    { k: "Verifiable by", v: "Ultimo export on request" },
  ]);

  s.addNotes(
    "This is the strongest area, so spend the most time here.\n\n" +
    "The four figures are deliberately stated as weekly minimums held since mid-March, not averages — they are the floor, and I would rather understate than have a number challenged. If the reviewer wants exact totals I can pull the Ultimo export.\n\n" +
    "BEFORE PRESENTING: pull the Ultimo Excel export and replace the three '+' minimums with the exact six-month totals. Stronger evidence, and it pre-empts the obvious question. The generator holds these numbers in one place near the top of the CMMS section.\n\n" +
    "The five items on the left are the honest test of independence: I do all five without being asked and without checking. What I do not yet do well is close out promptly — say that before they do. That is why 'close work orders promptly' is the first commitment on the right, and it links directly to the work-order tracking challenge later in the deck."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   5 — FOCUS AREA 02 · STORES & INVENTORY
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Focus area 02  ·  Stores & inventory",
    "Spares can now be found, counted and replaced on record.",
    "Reorganisation, tagging and monthly reporting turned the store from a room into a traceable system."
  );

  const stats = [
    { v: "300+", l: "Items currently in the store", src: "Inventory records", c: TEAL },
    { v: "~100%", l: "Store items tagged for identification", src: "Tagging register", c: BLUE },
    { v: "April", l: "Monthly inventory reporting started", src: "Monthly reports", c: AMBER },
    { v: "Ongoing", l: "Consumable replenishment as issued", src: "Stock records", c: GREEN, size: 24 },
  ];
  const sw = (CW - 0.3 * 3) / 4;
  stats.forEach((st, i) => {
    stat(s, {
      x: M + i * (sw + 0.3), y: BODY_Y, w: sw, h: 1.5,
      value: st.v, label: st.l, src: st.src, color: st.c, valueSize: st.size || 30, fill: PAPER,
    });
  });

  const y2 = BODY_Y + 1.72, h2 = BODY_H - 1.72;
  const lw = 6.4, rw = CW - lw - 0.3, rx = M + lw + 0.3;

  card(s, { x: M, y: y2, w: lw, h: h2, fill: PAPER, shadow: true });
  eyebrow(s, "Actions taken", M + 0.28, y2 + 0.24, lw - 0.56);
  bullets(s, [
    "Reorganised store items for easier identification",
    "Tagged items and maintained inventory records",
    "Prepared and circulated monthly inventory reports",
    "Replenished consumables as items were issued",
    "Supported monthly reconciliation and stock visibility",
  ], { x: M + 0.28, y: y2 + 0.58, w: lw - 0.56, h: h2 - 0.82, size: 12, lineSpacing: 15, gap: 8 });

  card(s, { x: rx, y: y2, w: rw, h: h2, fill: TEALT, line: "BDE0DF" });
  eyebrow(s, "Operational value", rx + 0.28, y2 + 0.24, rw - 0.56);
  s.addText("Spares can be located when they are needed, and the documentation behind them reduces the risk of a maintenance delay caused by an item that is unavailable or unidentified.", {
    x: rx + 0.28, y: y2 + 0.58, w: rw - 0.56, h: 1.5, isTextBox: true,
    fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 17,
  });
  eyebrow(s, "Next focus", rx + 0.28, y2 + 2.16, rw - 0.56, SLATE);
  chip(s, "Support the Microsoft Dynamics transition", { x: rx + 0.28, y: y2 + 2.44, w: rw - 0.56 });

  evidenceBand(s, [
    { k: "Evidence", v: "Monthly inventory reports, April onward" },
    { k: "Also", v: "Tagging register · reconciliation records" },
    { k: "Circulated to", v: "M&R, by email and shared folder" },
  ]);

  s.addNotes(
    "The point to make here is that this is the area with a measurable before and after, and it is the one a reviewer can walk into the store and verify in five minutes.\n\n" +
    "Before: items were hard to identify and there was no monthly reporting cycle.\n" +
    "After: 300+ items tagged, reconciliation supported, and a monthly report circulated since April.\n\n" +
    "The operational value line is the one that matters to the business — an untagged spare is a maintenance delay waiting to happen. Frame the value as avoided downtime, not tidiness.\n\n" +
    "If asked what is next: the Dynamics transition. I want to be part of that rather than have inventory move systems around me. Say it as an offer, not a request.\n\n" +
    "BEFORE PRESENTING: confirm the current item count against the latest monthly report so '300+' is still the right floor."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   6 — FOCUS AREA 03 · DOCUMENTATION & TRACEABILITY
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Focus area 03  ·  Documentation & traceability",
    "Maintenance information is accessible, current and auditable.",
    "This is the area I am most self-critical about — the records exist, but capture is not yet immediate."
  );

  const cw3 = (CW - 0.3 * 2) / 3;

  // col 1 — records maintained
  card(s, { x: M, y: BODY_Y, w: cw3, h: BODY_H, fill: PAPER, shadow: true });
  eyebrow(s, "Records maintained", M + 0.28, BODY_Y + 0.26, cw3 - 0.56);
  bullets(s, [
    "Ultimo work orders",
    "Permit-to-Work records",
    "Monthly inventory reports",
    "Procurement records",
    "Project / maintenance documents",
    "M&R shared OneDrive / folder",
  ], { x: M + 0.28, y: BODY_Y + 0.6, w: cw3 - 0.56, h: BODY_H - 0.88, size: 12, lineSpacing: 15, gap: 10 });

  // col 2 — current contribution
  const x2 = M + cw3 + 0.3;
  card(s, { x: x2, y: BODY_Y, w: cw3, h: BODY_H, fill: MIST });
  eyebrow(s, "Current contribution", x2 + 0.28, BODY_Y + 0.26, cw3 - 0.56, BLUE);
  s.addText("I maintain a traceable record of maintenance, inventory and project activity across the systems and shared repositories M&R uses.", {
    x: x2 + 0.28, y: BODY_Y + 0.6, w: cw3 - 0.56, h: 1.3, isTextBox: true,
    fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 17,
  });
  s.addText("Monthly inventory reporting has been established and running since April.", {
    x: x2 + 0.28, y: BODY_Y + 2.0, w: cw3 - 0.56, h: 0.8, isTextBox: true,
    fontFace: BODY, fontSize: 12, color: SLATE, margin: 0, valign: "top", lineSpacing: 16,
  });
  chip(s, "Evidence: email + shared folder + Ultimo", {
    x: x2 + 0.28, y: BODY_Y + BODY_H - 0.72, w: cw3 - 0.56, h: 0.46,
    fill: PAPER, line: AMBER, color: AMBER,
  });

  // col 3 — improvement priority
  const x3 = x2 + cw3 + 0.3;
  card(s, { x: x3, y: BODY_Y, w: cw3, h: BODY_H, fill: TEALT, line: "BDE0DF" });
  eyebrow(s, "Improvement priority", x3 + 0.28, BODY_Y + 0.26, cw3 - 0.56);
  s.addText("Move from “upload when due” to “capture as produced”.", {
    x: x3 + 0.28, y: BODY_Y + 0.6, w: cw3 - 0.56, h: 0.72, isTextBox: true,
    fontFace: HEAD, fontSize: 14.5, bold: true, color: INK, margin: 0, valign: "top", lineSpacing: 19,
  });
  bullets(s, [
    "Upload files immediately as records are generated",
    "Use a consistent naming and filing convention",
    "Explore practical automation for document capture and routing",
  ], { x: x3 + 0.28, y: BODY_Y + 1.46, w: cw3 - 0.56, h: BODY_H - 1.74, size: 12, lineSpacing: 15, gap: 10 });

  evidenceBand(s, [
    { k: "Systems", v: "Ultimo · M&R shared OneDrive · email" },
    { k: "Established", v: "Monthly inventory reporting since April 2026" },
    { k: "Gap", v: "Capture lag between doing the work and filing the record" },
  ]);

  s.addNotes(
    "Present this one honestly — it is the weakest of the four areas and saying so first is worth more than being told.\n\n" +
    "What is true: the records exist, across all six categories on the left, and they are traceable. Nothing is missing.\n" +
    "What is not yet true: capture is not immediate. Documentation gets deferred when higher-priority maintenance is running, and it is then uploaded when it is due rather than when it is produced.\n\n" +
    "That is the whole point of the right-hand column — 'upload when due' to 'capture as produced' is the behaviour change I am committing to, and the three bullets under it are how.\n\n" +
    "If asked about automation: I am not proposing a system purchase. I mean practical routing and naming — templates, a consistent convention, and using what we already have so filing is not a separate task at the end of the day."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   7 — FOCUS AREA 04 · MAINTENANCE & ASSET SUPPORT
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Focus area 04  ·  Maintenance & asset support",
    "Broad hands-on exposure across terminal equipment and integrity work.",
    "Executed, supervised or supported across three strands during the period."
  );

  const cols = [
    {
      t: "Equipment & maintenance", c: TEAL, fill: PAPER,
      items: [
        "1 deadman valve replaced",
        "~5 pressure gauges replaced",
        "~2 limit switches repaired",
        "~5 breakaway-pin replacements",
        "Most damaged lighting fixtures replaced",
        "Applicable PRVs calibrated",
      ],
    },
    {
      t: "Integrity & projects", c: BLUE, fill: MIST,
      items: [
        "2 pipeline sections tested",
        "T101 decommissioning / bolt replacement",
        "Corrosion-control activities supervised",
        "Denso tape applied to treated areas",
        "Temporary civil repairs at the loading bay",
        "Caravan store floor refurbishment supervised",
      ],
    },
    {
      t: "Routine engineering exposure", c: AMBER, fill: PAPER,
      items: [
        "Daily equipment condition checks",
        "Pumps, compressors and generators",
        "Remote-operated and relief valves",
        "Contractor maintenance across disciplines",
        "Troubleshooting of terminal equipment",
        "Growing ability to identify maintenance needs",
      ],
    },
  ];

  const cw3 = (CW - 0.3 * 2) / 3;
  cols.forEach((col, i) => {
    const x = M + i * (cw3 + 0.3);
    card(s, { x, y: BODY_Y, w: cw3, h: BODY_H, fill: col.fill, shadow: col.fill === PAPER });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.28, y: BODY_Y + 0.34, w: 0.15, h: 0.15,
      fill: { color: col.c }, line: { type: "none" },
    });
    s.addText(col.t, {
      x: x + 0.54, y: BODY_Y + 0.24, w: cw3 - 0.82, h: 0.36, isTextBox: true,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK, margin: 0, valign: "middle",
    });
    bullets(s, col.items, {
      x: x + 0.28, y: BODY_Y + 0.76, w: cw3 - 0.56, h: BODY_H - 1.04,
      size: 12, lineSpacing: 15, gap: 10,
    });
  });

  takeaway(s, "Positioning: strong practical exposure, with progressively increasing readiness for independent routine inspections and basic maintenance.");

  s.addNotes(
    "This slide is breadth, not depth — the message is that there is very little on this terminal I have not now been near.\n\n" +
    "Column 1 is work I did or led. Column 2 is integrity and project work I supported or supervised — the T101 decommissioning and the corrosion-control campaign are the two worth naming out loud. Column 3 is routine exposure that has built the judgement behind the other two.\n\n" +
    "Be precise about the qualifiers. '~' means an estimate from my own records, not an Ultimo count. 'Supervised' means I oversaw a contractor doing it; 'replaced' means hands on. Do not blur those two — being exact here is what makes the rest of the deck credible.\n\n" +
    "The takeaway bar is the ask in miniature: I am not claiming I can run major jobs alone. I am claiming readiness for independent routine inspections and basic maintenance, with contractors still used for major and specialised work."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   8 — SAFETY, CONTRACTOR COORDINATION & PROCUREMENT
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Safety  ·  Contractors  ·  Procurement",
    "Work moved through the systems that authorise and supply it.",
    "Maintenance is only as good as the permit that allows it and the material that arrives for it."
  );

  const cw3 = (CW - 0.3 * 2) / 3;

  // col 1 — safety participation
  card(s, { x: M, y: BODY_Y, w: cw3, h: BODY_H, fill: PAPER, shadow: true });
  eyebrow(s, "Safety participation", M + 0.28, BODY_Y + 0.26, cw3 - 0.56, GREEN);
  bullets(s, [
    "Daily Operations toolbox meetings",
    "Weekly toolbox sessions",
    "Monthly Safety Council meetings",
    "Employee forums — all attended",
    "1 Safety Beacon session handled personally",
    "Multiple safety observations raised",
    "PTW / TRA / LOTO applied to maintenance and contractor work",
  ], { x: M + 0.28, y: BODY_Y + 0.6, w: cw3 - 0.56, h: BODY_H - 0.88, size: 11.5, lineSpacing: 14, gap: 7 });

  // col 2 — contractor coordination
  const x2 = M + cw3 + 0.3;
  card(s, { x: x2, y: BODY_Y, w: cw3, h: BODY_H, fill: MIST });
  eyebrow(s, "Contractor coordination", x2 + 0.28, BODY_Y + 0.26, cw3 - 0.56, BLUE);
  s.addText("I supervise contractors confidently across six disciplines:", {
    x: x2 + 0.28, y: BODY_Y + 0.6, w: cw3 - 0.56, h: 0.5, isTextBox: true,
    fontFace: BODY, fontSize: 12, color: INK, margin: 0, valign: "top", lineSpacing: 16,
  });
  bullets(s, [
    "Painting",
    "Welding / fabrication",
    "Civil works",
    "Pump and valve maintenance",
    "Air-conditioning maintenance",
    "Corrosion control",
  ], { x: x2 + 0.28, y: BODY_Y + 1.16, w: cw3 - 0.56, h: 2.5, size: 12, lineSpacing: 15, gap: 9 });
  chip(s, "Focus: develop project-planning capability", {
    x: x2 + 0.28, y: BODY_Y + BODY_H - 0.72, w: cw3 - 0.56, h: 0.46,
  });

  // col 3 — procurement support
  const x3 = x2 + cw3 + 0.3;
  card(s, { x: x3, y: BODY_Y, w: cw3, h: BODY_H, fill: PAPER, shadow: true });
  eyebrow(s, "Procurement support", x3 + 0.28, BODY_Y + 0.26, cw3 - 0.56, AMBER);
  const sw2 = (cw3 - 0.56 - 0.22) / 2;
  [
    { v: "30+", l: "RFQs raised", c: AMBER },
    { v: "10+", l: "POs generated", c: BLUE },
  ].forEach((st, i) => {
    const x = x3 + 0.28 + i * (sw2 + 0.22);
    card(s, { x, y: BODY_Y + 0.6, w: sw2, h: 1.16, fill: MIST });
    s.addText(st.v, {
      x: x + 0.16, y: BODY_Y + 0.7, w: sw2 - 0.32, h: 0.52, isTextBox: true,
      fontFace: HEAD, fontSize: 26, bold: true, color: st.c, margin: 0, valign: "middle",
    });
    s.addText(st.l, {
      x: x + 0.16, y: BODY_Y + 1.24, w: sw2 - 0.32, h: 0.42, isTextBox: true,
      fontFace: BODY, fontSize: 10.5, bold: true, color: INK, margin: 0, valign: "top",
    });
  });
  eyebrow(s, "Typical material handled", x3 + 0.28, BODY_Y + 2.02, cw3 - 0.56, SLATE);
  bullets(s, [
    "Maintenance grease",
    "Loading-bay gaskets",
  ], { x: x3 + 0.28, y: BODY_Y + 2.32, w: cw3 - 0.56, h: 0.8, size: 12, lineSpacing: 15, gap: 9 });

  evidenceBand(s, [
    { k: "Evidence", v: "PTW / TRA / LOTO records · toolbox and Safety Council attendance" },
    { k: "And", v: "Procurement records — RFQs, requisitions, POs" },
  ]);

  s.addNotes(
    "Three supporting systems on one slide, so keep it moving — about two minutes total.\n\n" +
    "Safety: the message is participation is routine, not occasional. Daily and weekly toolbox, monthly Safety Council, employee forums, and I have handled a Safety Beacon session myself. PTW, TRA and LOTO are applied as a matter of course to maintenance and contractor work, not treated as paperwork.\n\n" +
    "Contractors: six disciplines is the credibility point. It says I can hold a contractor to a scope across trades, which is what makes the readiness claim on the previous slide reasonable.\n\n" +
    "Procurement: 30+ RFQs and 10+ POs shows I can move a maintenance requirement through the commercial process rather than stopping at 'we need the part'. The named examples keep it concrete.\n\n" +
    "The chip is the honest limit: I can supply and supervise, but I cannot yet plan a project end to end. That is the bridge into the development plan."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   9 — PERFORMANCE EVIDENCE AT A GLANCE
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Evidence",
    "Every claim in this review traces to a record.",
    "The strongest evidence available for the period, with the source named against each figure."
  );

  const items = [
    { v: "3+ / wk", l: "Work orders raised", src: "Ultimo", c: TEAL },
    { v: "5+ / wk", l: "PTWs created", src: "Ultimo", c: BLUE },
    { v: "300+", l: "Store items tagged", src: "Inventory records", c: AMBER },
    { v: "30+", l: "RFQs raised", src: "Procurement records", c: GREEN },
    { v: "10+", l: "POs generated", src: "Procurement records", c: BLUE },
    { v: "2", l: "Pipeline sections tested", src: "Integrity activity", c: TEAL },
    { v: "~5", l: "Pressure gauges replaced", src: "Maintenance records", c: AMBER },
    { v: "1", l: "Deadman valve replaced", src: "Maintenance records", c: GREEN },
  ];

  const sw = (CW - 0.28 * 3) / 4, sh = 1.8, vgap = 0.3;
  const gy = BODY_Y + (BODY_H - (sh * 2 + vgap)) / 2;
  items.forEach((it, i) => {
    stat(s, {
      x: M + (i % 4) * (sw + 0.28),
      y: gy + Math.floor(i / 4) * (sh + vgap),
      w: sw, h: sh,
      value: it.v, label: it.l, src: it.src, color: it.c, valueSize: 27, fill: PAPER,
    });
  });

  evidenceBand(s, [
    { k: "Sources", v: "Ultimo · monthly inventory reports · procurement records · PTWs · M&R shared folder · maintenance and project records" },
  ]);

  s.addNotes(
    "This is the slide to leave up if the conversation turns into questions — everything a reviewer might want to check is on it, with its source underneath.\n\n" +
    "Do not read the tiles out. Say: these are the eight figures I would stand behind, each one traceable to the record named under it, and I can produce any of them.\n\n" +
    "Be clear about precision. '+' and '/ wk' are sustained minimums, not averages. '~' is my own estimate from maintenance records. The exact counts are 1, 2, 10+, 30+ and 300+.\n\n" +
    "BEFORE PRESENTING: replace the two Ultimo weekly minimums with exact six-month totals from the Ultimo Excel export if it is available. A precise number is worth more than a defensible floor, and it removes the only soft spot on this slide."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   10 — CHALLENGES, ACTIONS & LESSONS
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Challenges",
    "Three things went wrong, and what I changed because of them.",
    "The recurring difficulty has been competing maintenance and administrative priorities landing at once."
  );

  const cols = [2.35, 3.5, 3.9, 2.34]; // area · challenge · action · outcome
  const gap = 0.0;
  const xs = [];
  let acc = M;
  cols.forEach((c) => { xs.push(acc); acc += c; });

  const heads = ["Area", "The challenge", "Action taken", "Outcome"];
  heads.forEach((h, i) => {
    s.addText(h.toUpperCase(), {
      x: xs[i] + (i === 0 ? 0.28 : 0.2), y: BODY_Y, w: cols[i] - 0.4, h: 0.26, isTextBox: true,
      fontFace: BODY, fontSize: 9.5, bold: true, color: SLATE,
      charSpacing: 1.2, margin: 0, valign: "middle",
    });
  });

  const rows = [
    {
      a: "Work-order tracking", c: TEAL,
      ch: "Pending work orders were sometimes overlooked, which caused overdue closeout.",
      ac: "Use the original required completion date as an earlier tracking trigger, and follow up progressively rather than at the deadline.",
      out: "More proactive work-order control",
    },
    {
      a: "Workload and time management", c: BLUE,
      ch: "Maintenance, Ultimo, inventory, documentation and procurement can all converge at once.",
      ac: "Break work into smaller tasks, prioritise by urgency and impact, and start recurring deliverables earlier in the cycle.",
      out: "Reduced task accumulation",
    },
    {
      a: "Record keeping", c: AMBER,
      ch: "Documentation gets deferred while higher-priority work is being handled.",
      ac: "Upload records progressively as they are produced and develop a more structured filing routine.",
      out: "Improved traceability and visibility",
    },
  ];

  const rowH = 1.28, ry0 = BODY_Y + 0.34;
  rows.forEach((r, i) => {
    const y = ry0 + i * (rowH + 0.16);
    card(s, { x: M, y, w: CW, h: rowH, fill: i % 2 ? MIST : PAPER, shadow: i % 2 === 0 });
    s.addShape(pres.ShapeType.ellipse, {
      x: xs[0] + 0.28, y: y + 0.32, w: 0.14, h: 0.14, fill: { color: r.c }, line: { type: "none" },
    });
    s.addText(r.a, {
      x: xs[0] + 0.52, y: y + 0.16, w: cols[0] - 0.76, h: rowH - 0.32, isTextBox: true,
      fontFace: HEAD, fontSize: 14, bold: true, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
    s.addText(r.ch, {
      x: xs[1] + 0.2, y: y + 0.16, w: cols[1] - 0.4, h: rowH - 0.32, isTextBox: true,
      fontFace: BODY, fontSize: 11.5, color: "1F2933", margin: 0, valign: "top", lineSpacing: 15,
    });
    s.addText(r.ac, {
      x: xs[2] + 0.2, y: y + 0.16, w: cols[2] - 0.4, h: rowH - 0.32, isTextBox: true,
      fontFace: BODY, fontSize: 11.5, color: "1F2933", margin: 0, valign: "top", lineSpacing: 15,
    });
    s.addText(r.out, {
      x: xs[3] + 0.2, y: y + 0.16, w: cols[3] - 0.4, h: rowH - 0.32, isTextBox: true,
      fontFace: BODY, fontSize: 12, bold: true, color: TEAL, margin: 0, valign: "middle", lineSpacing: 16,
    });
  });

  takeaway(s, "Key lesson: consistent task capture and early follow-up matter as much as technical execution.");

  s.addNotes(
    "Do not rush this slide or apologise through it. Volunteering the three weaknesses, each with the change already made, is more persuasive than the achievements — it shows self-assessment without supervision.\n\n" +
    "Row 1 links back to the CMMS commitment: the fix is a tracking trigger, using the original required completion date instead of waiting for the deadline to pass.\n" +
    "Row 2 is the underlying cause of the other two — five workstreams converging. The fix is sequencing, not working longer.\n" +
    "Row 3 is the documentation gap already admitted on slide 6. Consistency between the two is the point.\n\n" +
    "If asked which is still open: record keeping. Work-order tracking is improving and measurable; filing discipline is the one I am still building the habit for. Say that plainly."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   11 — COMPETENCIES DEVELOPED
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Competency movement",
    "Where I started, and where I am now.",
    "Six areas, assessed against what I could actually do unsupervised on day one."
  );

  const c1 = 2.6, c2 = 3.2, c3 = CW - c1 - c2;
  const heads = [
    { t: "Area", x: M + 0.28, w: c1 - 0.4 },
    { t: "When I joined", x: M + c1 + 0.2, w: c2 - 0.4 },
    { t: "Current capability", x: M + c1 + c2 + 0.2, w: c3 - 0.4 },
  ];
  heads.forEach((h) => {
    s.addText(h.t.toUpperCase(), {
      x: h.x, y: BODY_Y, w: h.w, h: 0.26, isTextBox: true,
      fontFace: BODY, fontSize: 9.5, bold: true, color: SLATE,
      charSpacing: 1.2, margin: 0, valign: "middle",
    });
  });

  const rows = [
    { a: "Technical knowledge", c: TEAL,
      was: "Limited terminal familiarity",
      now: "Practical understanding of pumps, compressors, generators, valves, relief systems and other terminal equipment" },
    { a: "CMMS / Ultimo", c: BLUE,
      was: "Zero prior knowledge",
      now: "Independent work-order creation, scheduling, PTW creation and follow-up" },
    { a: "Maintenance judgement", c: AMBER,
      was: "Developing",
      now: "Faster identification of maintenance needs, with safety-critical and operational-impact items prioritised" },
    { a: "Safety systems", c: GREEN,
      was: "Learning terminal-specific application",
      now: "Stronger understanding of PTW, TRA and LOTO as prerequisites to safe work" },
    { a: "Contractor management", c: TEAL,
      was: "Limited exposure",
      now: "Comfortably supervise multiple contractor disciplines" },
    { a: "Operations interface", c: BLUE,
      was: "Developing familiarity",
      now: "More confident communication and understanding of plant terminology and process lines" },
  ];

  const rowH = 0.7, ry0 = BODY_Y + 0.32;
  rows.forEach((r, i) => {
    const y = ry0 + i * rowH;
    if (i % 2 === 0) {
      s.addShape(pres.ShapeType.roundRect, {
        x: M, y, w: CW, h: rowH, rectRadius: 0.04,
        fill: { color: MIST }, line: { type: "none" },
      });
    }
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.28, y: y + 0.25, w: 0.13, h: 0.13, fill: { color: r.c }, line: { type: "none" },
    });
    s.addText(r.a, {
      x: M + 0.52, y, w: c1 - 0.64, h: rowH, isTextBox: true,
      fontFace: BODY, fontSize: 11.5, bold: true, color: INK, margin: 0, valign: "middle", lineSpacing: 13,
    });
    s.addText(r.was, {
      x: M + c1 + 0.2, y, w: c2 - 0.4, h: rowH, isTextBox: true,
      fontFace: BODY, fontSize: 11, italic: true, color: FAINT, margin: 0, valign: "middle", lineSpacing: 13,
    });
    s.addText("→", {
      x: M + c1 + c2 - 0.24, y, w: 0.24, h: rowH, isTextBox: true,
      fontFace: BODY, fontSize: 11, color: LINE, margin: 0, valign: "middle", align: "center",
    });
    s.addText(r.now, {
      x: M + c1 + c2 + 0.2, y, w: c3 - 0.4, h: rowH, isTextBox: true,
      fontFace: BODY, fontSize: 11, color: "1F2933", margin: 0, valign: "middle", lineSpacing: 13,
    });
  });

  takeaway(s, "Overall progression: from learning the plant and its systems to managing key parts of the maintenance workflow with increasing independence.");

  s.addNotes(
    "Read this slide left to right, not top to bottom — the arrow is the argument.\n\n" +
    "The two rows to say out loud are CMMS / Ultimo, because 'zero prior knowledge' to independent operation is the sharpest movement in the deck, and contractor management, because it is what makes the readiness ask credible.\n\n" +
    "The 'when I joined' column is deliberately unflattering. Being honest about starting at limited or zero is what gives the current column its weight.\n\n" +
    "If asked which competency is furthest behind: project planning — it is not on this table because it barely started, which is exactly why it is item 5 on the next slide."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   12 — NEXT 6–12 MONTHS
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Next 6–12 months",
    "Turning exposure into independent capability.",
    "Six commitments, each one traceable back to a gap identified earlier in this review."
  );

  const plan = [
    { n: "1", t: "Technical independence", c: TEAL,
      d: "Perform routine inspections, checklists and basic maintenance with minimal supervision, continuing to use contractors for major and specialised jobs." },
    { n: "2", t: "CMMS quality", c: BLUE,
      d: "Improve prompt work-order closure and review obsolete or redundant maintenance orders in Ultimo." },
    { n: "3", t: "Digital inventory", c: AMBER,
      d: "Support the Microsoft Dynamics transition and strengthen real-time stock visibility." },
    { n: "4", t: "Documentation", c: GREEN,
      d: "Upload records immediately as they are generated and explore practical automation for filing and routing." },
    { n: "5", t: "Project planning", c: TEAL,
      d: "Develop stronger planning skills across scope, materials, contractors, schedule and closeout." },
    { n: "6", t: "Professional growth", c: BLUE,
      d: "Complete or support closure of one major maintenance project and obtain a Maintenance & Reliability certification." },
  ];

  const cw2 = (CW - 0.28) / 2, ch = (BODY_H - 0.32) / 3;
  plan.forEach((p, i) => {
    const x = M + (i % 2) * (cw2 + 0.28);
    const y = BODY_Y + Math.floor(i / 2) * (ch + 0.16);
    card(s, { x, y, w: cw2, h: ch, fill: i % 2 ? MIST : PAPER, shadow: i % 2 === 0 });
    badge(s, x + 0.26, y + 0.26, 0.44, p.n, p.c);
    s.addText(p.t, {
      x: x + 0.86, y: y + 0.22, w: cw2 - 1.14, h: 0.34, isTextBox: true,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(p.d, {
      x: x + 0.86, y: y + 0.6, w: cw2 - 1.14, h: ch - 0.78, isTextBox: true,
      fontFace: BODY, fontSize: 11.5, color: "1F2933", margin: 0, valign: "top", lineSpacing: 15,
    });
  });

  takeaway(s, "The outcome I am working toward: greater independent routine maintenance ownership, while strengthening the systems that keep maintenance safe, visible and controlled.");

  s.addNotes(
    "Frame this as commitments, not aspirations — each one answers a gap already admitted in the deck, and I expect to be measured against them at the next review.\n\n" +
    "1 answers the readiness positioning on slide 7. Note the deliberate limit: routine work unsupervised, contractors still used for major and specialised jobs. Do not overclaim.\n" +
    "2 answers the closeout weakness on slide 4 and the tracking challenge on slide 10.\n" +
    "3 and 4 answer the stores and documentation next-focus items.\n" +
    "5 answers the planning limit admitted on slide 8.\n" +
    "6 is the only one needing support from the company — a Maintenance & Reliability certification, and the chance to see one major project through to closure.\n\n" +
    "Item 6 is the one thing to actively ask for. Make it a clear ask, then stop talking and let them respond."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   13 — CLOSING PERSPECTIVE
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = darkSlide();

  s.addText("CLOSING PERSPECTIVE", {
    x: M, y: 0.72, w: CW, h: 0.3, isTextBox: true,
    fontFace: BODY, fontSize: 11.5, bold: true, color: ONDARK2,
    charSpacing: 2, margin: 0, valign: "middle",
  });
  s.addText("Six months spent building a foundation that can be relied on.", {
    x: M, y: 1.04, w: 9.2, h: 0.9, isTextBox: true,
    fontFace: HEAD, fontSize: 30, bold: true, color: PAPER, margin: 0, valign: "middle", lineSpacing: 36,
  });

  const rows = [
    { v: "Own", c: TEAL,  d: "CMMS / Ultimo activities, with increasing independence" },
    { v: "Control", c: AMBER, d: "Inventory and maintenance documentation, with better visibility" },
    { v: "Support", c: GREEN, d: "Safe, timely execution across a broad range of maintenance activities" },
    { v: "Develop", c: BLUE,  d: "Deeper technical capability and stronger project-planning skills" },
  ];
  const rh = 0.78, ry0 = 2.26;
  rows.forEach((r, i) => {
    const y = ry0 + i * rh;
    s.addShape(pres.ShapeType.ellipse, {
      x: M, y: y + 0.13, w: 0.5, h: 0.5, fill: { color: r.c }, line: { type: "none" },
    });
    s.addText(r.v, {
      x: M + 0.7, y, w: 1.5, h: rh, isTextBox: true,
      fontFace: HEAD, fontSize: 16, bold: true, color: PAPER, margin: 0, valign: "middle",
    });
    s.addText(r.d, {
      x: M + 2.3, y, w: 6.9, h: rh, isTextBox: true,
      fontFace: BODY, fontSize: 13.5, color: ONDARK, margin: 0, valign: "middle", lineSpacing: 17,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.66, w: 9.2, h: 0.78, rectRadius: 0.06,
    fill: { color: TEAL }, line: { type: "none" },
  });
  s.addText("Ready for greater responsibility, with continued development in technical independence, time management and documentation.", {
    x: M + 0.28, y: 5.66, w: 8.64, h: 0.78, isTextBox: true,
    fontFace: BODY, fontSize: 13, bold: true, color: PAPER, margin: 0, valign: "middle", lineSpacing: 17,
  });

  // right-hand sign-off column
  const sx = M + 9.6, sw = CW - 9.6;
  s.addText("Thank you", {
    x: sx, y: 2.26, w: sw, h: 0.6, isTextBox: true,
    fontFace: HEAD, fontSize: 26, bold: true, color: PAPER, margin: 0, valign: "middle",
  });
  s.addText("Aniekeme Umoren", {
    x: sx, y: 2.94, w: sw, h: 0.32, isTextBox: true,
    fontFace: BODY, fontSize: 14, bold: true, color: ONDARK, margin: 0, valign: "middle",
  });
  s.addText("Maintenance Engineer", {
    x: sx, y: 3.24, w: sw, h: 0.3, isTextBox: true,
    fontFace: BODY, fontSize: 13, color: ONDARK2, margin: 0, valign: "middle",
  });
  s.addText("NAVGAS Limited\nMaintenance & Reliability", {
    x: sx, y: 3.58, w: sw, h: 0.62, isTextBox: true,
    fontFace: BODY, fontSize: 12, color: "6E8CAB", margin: 0, valign: "top", lineSpacing: 16,
  });
  s.addText("28 August 2026", {
    x: sx, y: 4.32, w: sw, h: 0.3, isTextBox: true,
    fontFace: BODY, fontSize: 11, italic: true, color: "6E8CAB", margin: 0, valign: "middle",
  });

  s.addNotes(
    "Close on the four verbs, not on a summary. Own, control, support, develop — that is the shape of the six months and the shape of what I am asking for.\n\n" +
    "Say the teal line out loud, in full: ready for greater responsibility, with continued development in technical independence, time management and documentation. It concedes and it asks in the same sentence, which is the right note to end on.\n\n" +
    "Then stop and hand over. Do not fill the silence.\n\n" +
    "Have ready for questions: the Ultimo export, the latest monthly inventory report, the T101 decommissioning detail, and the certification I want to pursue with rough cost and duration."
  );
}

/* ── page numbers on every slide except the title ────────────────────────── */
pres.slides.forEach((s, i) => {
  if (i === 0) return;
  const dark = i === pres.slides.length - 1;
  s.addText("NAVGAS  ·  Maintenance & Reliability", {
    x: M, y: 7.14, w: 5.0, h: 0.28, isTextBox: true,
    fontFace: BODY, fontSize: 9, color: dark ? "5C7A99" : FAINT, margin: 0, valign: "middle",
  });
  s.addText(`6-Month Performance Review  ·  ${i + 1}`, {
    x: W - M - 5.0, y: 7.14, w: 5.0, h: 0.28, isTextBox: true,
    fontFace: BODY, fontSize: 9, color: dark ? "5C7A99" : FAINT,
    margin: 0, valign: "middle", align: "right",
  });
});

pres.writeFile({ fileName: OUT }).then(() => {
  console.log("wrote " + path.relative(ROOT, OUT) + `  (${pres.slides.length} slides)`);
});

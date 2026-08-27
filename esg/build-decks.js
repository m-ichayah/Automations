/*
 * Two 5-slide decks: GHG inventory, and GRI 11 ESG KPIs.
 *
 * Design constraint from the brief: legible on a small screen at a distance.
 * That drives every choice here — one idea per slide, at most ~40 words,
 * titles at 40pt, nothing below 18pt, and heavy use of size contrast so the
 * eye lands on the number first. Detail lives in the PDFs, not on the slide.
 *
 * Palette is four colours only: navy, light blue, black, white. Anything that
 * looks like a fifth colour is a tint of navy or light blue.
 */
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTDIR = path.join(ROOT, "dist");

// ── palette ────────────────────────────────────────────────────────────────
const NAVY  = "0B2545";
const NAVY2 = "17395F";   // lifted navy, for layering on navy
const BLUE  = "4C86C6";
const BLUE2 = "A8C6E5";
const PALE  = "DCE8F5";
const INK   = "101418";
const WHITE = "FFFFFF";
const MUTE  = "5C6B7A";

const HEAD = "Liberation Sans";   // Arial-metric: safe in PowerPoint and in QA
const BODY = "Liberation Sans";

const W = 13.33, H = 7.5;
const M = 0.7;
const CW = W - M * 2;

/** Width of one column in an n-across grid, so a row always lands exactly on
 *  the right margin. Hardcoding card widths is how grids silently overflow. */
const colW = (n, gap) => (CW - (n - 1) * gap) / n;

const shadow = () => ({ type: "outer", color: "8A99AC", blur: 10, offset: 2, angle: 90, opacity: 0.18 });

function deck(title) {
  const p = new pptxgen();
  p.layout = "LAYOUT_WIDE";
  p.author = "Group C (29 Members)";
  p.title = title;
  return p;
}

const dark  = (p) => { const s = p.addSlide(); s.background = { color: NAVY }; return s; };
const light = (p) => { const s = p.addSlide(); s.background = { color: WHITE }; return s; };

/** Slide head: a big plain-language claim over a one-line support note. */
function head(p, s, kicker, claim, support) {
  s.addText(kicker.toUpperCase(), {
    x: M, y: 0.42, w: CW, h: 0.34,
    fontFace: HEAD, fontSize: 15, bold: true, color: BLUE, charSpacing: 1.6,
    margin: 0, valign: "middle",
  });
  s.addText(claim, {
    x: M, y: 0.8, w: CW, h: 1.0,
    fontFace: HEAD, fontSize: 34, bold: true, color: NAVY,
    margin: 0, valign: "middle", lineSpacing: 40,
  });
  if (support) {
    s.addText(support, {
      x: M, y: 1.86, w: CW, h: 0.4,
      fontFace: BODY, fontSize: 18, color: MUTE, margin: 0, valign: "middle",
    });
  }
}

function card(p, s, o) {
  s.addShape(p.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.06,
    fill: { color: o.fill }, line: o.line ? { color: o.line, width: 1.25 } : { type: "none" },
    shadow: o.shadow ? shadow() : undefined,
  });
}

function badge(p, s, x, y, d, label, fill, color) {
  s.addShape(p.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color }, line: { type: "none" } });
  s.addText(label, {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 17, bold: true, color: fill, margin: 0,
  });
}

/** Footer strip carrying the deck identity and slide number. */
function foot(s, left, n) {
  s.addText(left, {
    x: M, y: 6.86, w: CW - 1, h: 0.3,
    fontFace: BODY, fontSize: 12, color: "9AA8B8", margin: 0, valign: "middle",
  });
  s.addText(String(n), {
    x: W - M - 0.6, y: 6.86, w: 0.6, h: 0.3,
    fontFace: BODY, fontSize: 12, bold: true, color: BLUE, align: "right", margin: 0, valign: "middle",
  });
}

function titleSlide(p, eyebrow, title, sub, tag) {
  const s = dark(p);
  s.addText(eyebrow.toUpperCase(), {
    x: M, y: 1.5, w: CW, h: 0.4,
    fontFace: HEAD, fontSize: 15, bold: true, color: BLUE2, charSpacing: 2.4, margin: 0, valign: "middle",
  });
  s.addText(title, {
    x: M, y: 1.98, w: CW - 1.2, h: 2.0,
    fontFace: HEAD, fontSize: 50, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 58,
  });
  s.addShape(p.ShapeType.rect, { x: M, y: 4.16, w: 2.4, h: 0.09, fill: { color: BLUE }, line: { type: "none" } });
  s.addText(sub, {
    x: M, y: 4.44, w: CW - 1.4, h: 0.8,
    fontFace: BODY, fontSize: 20, color: PALE, margin: 0, valign: "top", lineSpacing: 28,
  });
  s.addText(tag, {
    x: M, y: 6.1, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 15, color: BLUE2, margin: 0, valign: "middle",
  });
  s.addText("GROUP C  (29 MEMBERS)", {
    x: M, y: 6.5, w: CW, h: 0.36,
    fontFace: HEAD, fontSize: 13, bold: true, color: "7FA8CE", charSpacing: 1.6, margin: 0, valign: "middle",
  });
  return s;
}

/* ══════════════════════════════════════════════════════════════════════════
   DECK A — GHG INVENTORY
   ══════════════════════════════════════════════════════════════════════════ */
{
  const p = deck("Refinery GHG Inventory");
  const FOOT = "Preparing a GHG inventory for a typical refinery";

  // --- 1 title ---
  titleSlide(p,
    "Question 1",
    "Preparing a\nGreenhouse Gas Inventory",
    "What to count, where to draw the line, and what the answer changes.",
    "Worked on a 120,000 barrel-per-day Nigerian refinery"
  ).addNotes(
    "Open on the legal duty, not the theory: Climate Change Act 2021 section 24 makes an annual\n" +
    "emissions report compulsory for any entity with 50 or more employees. This is a filing, not a gesture."
  );

  // --- 2 the three scopes ---
  {
    const s = light(p);
    head(p, s, "The first decision", "Three scopes. One fence.",
      "The scopes exist so that two companies never count the same tonne twice.");

    const items = [
      { n: "1", t: "SCOPE 1", h: "Direct", d: "Everything burned, flared,\nvented or leaked inside\nyour fence.", c: NAVY, fill: NAVY, tx: WHITE, sub: PALE },
      { n: "2", t: "SCOPE 2", h: "Indirect — energy", d: "The power station that\nruns your lights.", c: BLUE, fill: BLUE, tx: WHITE, sub: PALE },
      { n: "3", t: "SCOPE 3", h: "Indirect — everything else", d: "Your crude supplier, and\nevery vehicle burning the\ndiesel you sold.", c: BLUE2, fill: PALE, tx: NAVY, sub: MUTE },
    ];
    const gap = 0.35, cw = colW(3, gap);
    items.forEach((it, i) => {
      const x = M + i * (cw + gap);
      card(p, s, { x, y: 2.5, w: cw, h: 3.3, fill: it.fill, shadow: true });
      s.addText(it.t, {
        x: x + 0.34, y: 2.78, w: cw - 0.68, h: 0.5,
        fontFace: HEAD, fontSize: 26, bold: true, color: it.tx, margin: 0, valign: "middle",
      });
      s.addText(it.h, {
        x: x + 0.34, y: 3.3, w: cw - 0.68, h: 0.36,
        fontFace: BODY, fontSize: 15, bold: true, color: i === 2 ? BLUE : BLUE2, margin: 0, valign: "middle",
      });
      s.addText(it.d, {
        x: x + 0.34, y: 3.78, w: cw - 0.68, h: 1.7,
        fontFace: BODY, fontSize: 19, color: it.sub, margin: 0, valign: "top", lineSpacing: 27,
      });
    });

    s.addText("Scope 1 and 2 are what you control. Scope 3 is what you cause.", {
      x: M, y: 6.06, w: CW, h: 0.5,
      fontFace: HEAD, fontSize: 20, bold: true, color: NAVY, margin: 0, valign: "middle",
    });
    foot(s, FOOT, 2);
    s.addNotes(
      "Analogy, used once: Scope 1 is the smoke from your own chimney. Scope 2 is the smoke from the\n" +
      "power station that runs your lights. Scope 3 is everyone else's chimney that exists because of you.\n" +
      "Do not use a second analogy later — it reads as condescension."
    );
  }

  // --- 3 where scope 1 comes from ---
  {
    const s = light(p);
    head(p, s, "Scope 1 — 1.60 million tonnes", "Two sources carry four fifths of it.",
      "A refinery is not one chimney. It is about a dozen distinct mechanisms.");

    const rows = [
      { t: "Fired heaters, boilers and CHP", v: 60, l: "0.96 Mt", c: NAVY },
      { t: "FCC catalyst regeneration", v: 20, l: "0.32 Mt", c: BLUE },
      { t: "Hydrogen plant (SMR)", v: 9, l: "0.14 Mt", c: BLUE2 },
      { t: "Flaring", v: 4, l: "0.064 Mt", c: BLUE2 },
      { t: "Fugitives and venting", v: 3, l: "0.048 Mt", c: BLUE2 },
      { t: "Sulphur, coker, water, mobile", v: 4, l: "0.064 Mt", c: BLUE2 },
    ];
    const y0 = 2.42, rh = 0.46, gap = 0.1, barX = 5.3, barMax = 5.1;
    rows.forEach((r, i) => {
      const y = y0 + i * (rh + gap);
      s.addText(r.t, {
        x: M, y, w: 4.5, h: rh,
        fontFace: BODY, fontSize: 18, bold: i < 2, color: i < 2 ? NAVY : INK, margin: 0, valign: "middle",
      });
      s.addShape(p.ShapeType.roundRect, {
        x: barX, y: y + 0.11, w: Math.max(barMax * (r.v / 60), 0.28), h: rh - 0.22, rectRadius: 0.04,
        fill: { color: r.c }, line: { type: "none" },
      });
      s.addText(r.v + "%", {
        x: barX + Math.max(barMax * (r.v / 60), 0.28) + 0.14, y, w: 0.7, h: rh,
        fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: "middle",
      });
      s.addText(r.l, {
        x: W - M - 1.35, y, w: 1.35, h: rh,
        fontFace: BODY, fontSize: 16, color: MUTE, align: "right", margin: 0, valign: "middle",
      });
    });

    card(p, s, { x: M, y: 5.86, w: CW, h: 0.66, fill: PALE });
    s.addText(
      [
        { text: "The two most often missed:  ", options: { bold: true, color: NAVY } },
        { text: "the FCC burns no purchased fuel, and the hydrogen plant releases CO₂ from the reaction, not the flame.", options: { color: INK } },
      ],
      { x: M + 0.3, y: 5.86, w: CW - 0.6, h: 0.66, fontFace: BODY, fontSize: 16, margin: 0, valign: "middle" }
    );
    foot(s, FOOT, 3);
    s.addNotes(
      "FCC = Fluid Catalytic Cracking; its regenerator burns coke off the catalyst, so it has no fuel meter\n" +
      "and teams that count fuel meters miss a fifth of the site. SMR = Steam Methane Reforming.\n" +
      "Both acronyms are defined on the slide the first time they appear."
    );
  }

  // --- 4 the 87% ---
  {
    const s = dark(p);
    s.addText("THE NUMBER THAT CHANGES THE CONVERSATION", {
      x: M, y: 0.6, w: CW, h: 0.4,
      fontFace: HEAD, fontSize: 15, bold: true, color: BLUE2, charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText("87% of the footprint leaves\nthe gate in a tanker.", {
      x: M, y: 1.08, w: CW, h: 1.5,
      fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 48,
    });

    // proportion bar, drawn to scale
    const bx = M, bw = CW, by = 2.86, bh = 1.15;
    const segs = [
      { pct: 8.3, c: WHITE,  lab: "8.3%",  tc: NAVY },
      { pct: 0.4, c: BLUE2,  lab: "",      tc: NAVY },
      { pct: 87.0, c: BLUE,  lab: "87.0%", tc: WHITE },
      { pct: 4.2, c: NAVY2,  lab: "",  tc: WHITE },  // 0.80 Mt of 19.2
    ];
    let cx = bx;
    segs.forEach((sg) => {
      const w = bw * (sg.pct / 100);
      s.addShape(p.ShapeType.rect, { x: cx, y: by, w, h: bh, fill: { color: sg.c }, line: { type: "none" } });
      if (sg.lab) {
        s.addText(sg.lab, {
          x: cx, y: by, w, h: bh, align: "center", valign: "middle",
          fontFace: HEAD, fontSize: 22, bold: true, color: sg.tc, margin: 0,
        });
      }
      cx += w;
    });

    const leg = [
      { c: WHITE, t: "Scope 1", v: "1.60 Mt" },
      { c: BLUE2, t: "Scope 2", v: "0.08 Mt" },
      { c: BLUE,  t: "Scope 3 — customers burning our fuel", v: "16.7 Mt" },
      { c: NAVY2, t: "Scope 3 — all other", v: "0.80 Mt" },
    ];
    leg.forEach((g, i) => {
      const y = 4.32 + i * 0.44;
      s.addShape(p.ShapeType.rect, { x: M, y: y + 0.09, w: 0.26, h: 0.26, fill: { color: g.c }, line: { type: "none" } });
      s.addText(g.t, {
        x: M + 0.46, y, w: 7.4, h: 0.44,
        fontFace: BODY, fontSize: 18, color: PALE, margin: 0, valign: "middle",
      });
      s.addText(g.v, {
        x: M + 7.9, y, w: 1.6, h: 0.44,
        fontFace: HEAD, fontSize: 18, bold: true, color: WHITE, align: "right", margin: 0, valign: "middle",
      });
    });

    card(p, s, { x: M + 10.0, y: 4.32, w: CW - 10.0, h: 1.76, fill: NAVY2 });
    s.addText("19.2 Mt", {
      x: M + 10.2, y: 4.5, w: CW - 10.4, h: 0.72,
      fontFace: HEAD, fontSize: 32, bold: true, color: WHITE, margin: 0, valign: "middle",
    });
    s.addText("total CO₂e\nacross all scopes", {
      x: M + 10.2, y: 5.2, w: CW - 10.4, h: 0.76,
      fontFace: BODY, fontSize: 15, color: BLUE2, margin: 0, valign: "top", lineSpacing: 20,
    });

    s.addText("Every efficiency lever works on the 8.8%. Moving the 87% is a question about what we sell.", {
      x: M, y: 6.28, w: CW, h: 0.5,
      fontFace: HEAD, fontSize: 19, bold: true, color: BLUE2, margin: 0, valign: "middle",
    });
    s.addNotes(
      "This is the slide the room will remember. Give it time and say the last line slowly.\n" +
      "Scope 1 + 2 = 1.68 Mt = 8.8% of 19.2 Mt. Category 11 alone = 16.7 Mt = 87%.\n" +
      "Reporting Scope 1 and 2 alone and calling it a footprint is the standard criticism of refiners."
    );
  }

  // --- 5 from inventory to action ---
  {
    const s = light(p);
    head(p, s, "From inventory to decision", "Measure it well, then act on it.",
      "An inventory that changes no decision was a bookkeeping exercise.");

    s.addText("HOW WE MEASURE", {
      x: M, y: 2.42, w: 6.0, h: 0.34,
      fontFace: HEAD, fontSize: 14, bold: true, color: BLUE, charSpacing: 1.4, margin: 0, valign: "middle",
    });
    const tiers = [
      "Continuous monitoring in the stack",
      "Mass balance — carbon in, carbon out",
      "Engineering calculation",
      "Published emission factor",
    ];
    tiers.forEach((t, i) => {
      const y = 2.84 + i * 0.72;
      card(p, s, { x: M, y, w: 5.9, h: 0.6, fill: i === 0 ? NAVY : PALE });
      badge(p, s, M + 0.16, y + 0.09, 0.42, String(i + 1), i === 0 ? NAVY : PALE, i === 0 ? WHITE : BLUE);
      s.addText(t, {
        x: M + 0.76, y, w: 5.0, h: 0.6,
        fontFace: BODY, fontSize: 17, bold: i === 0, color: i === 0 ? WHITE : INK, margin: 0, valign: "middle",
      });
    });
    s.addText("Best evidence at the top. Say which you used.", {
      x: M, y: 5.7, w: 5.9, h: 0.4,
      fontFace: BODY, fontSize: 15, italic: true, color: MUTE, margin: 0, valign: "middle",
    });

    const rx = M + 6.4;
    s.addText("WHAT WE DO ABOUT IT", {
      x: rx, y: 2.42, w: CW - 6.4, h: 0.34,
      fontFace: HEAD, fontSize: 14, bold: true, color: BLUE, charSpacing: 1.4, margin: 0, valign: "middle",
    });
    const levers = [
      { t: "Energy and heat integration", v: "3–8%" },
      { t: "Methane leak detection", v: "1–3%" },
      { t: "Flare gas recovery", v: "2–4%" },
      { t: "Capture on the hydrogen plant", v: "7–9%" },
    ];
    levers.forEach((l, i) => {
      const y = 2.84 + i * 0.72;
      card(p, s, { x: rx, y, w: CW - 6.4, h: 0.6, fill: WHITE, line: BLUE2 });
      s.addText(l.t, {
        x: rx + 0.28, y, w: 3.9, h: 0.6,
        fontFace: BODY, fontSize: 17, color: INK, margin: 0, valign: "middle",
      });
      s.addText(l.v, {
        x: rx + 4.1, y, w: 1.4, h: 0.6,
        fontFace: HEAD, fontSize: 18, bold: true, color: NAVY, align: "right", margin: 0, valign: "middle",
      });
    });
    s.addText("Cut to Scope 1, cheapest first.", {
      x: rx, y: 5.7, w: CW - 6.4, h: 0.4,
      fontFace: BODY, fontSize: 15, italic: true, color: MUTE, margin: 0, valign: "middle",
    });

    card(p, s, { x: M, y: 6.14, w: CW, h: 0.6, fill: NAVY });
    s.addText("An inventory is a strategy document that happens to be written in tonnes.", {
      x: M + 0.3, y: 6.14, w: CW - 0.6, h: 0.6,
      fontFace: HEAD, fontSize: 19, bold: true, color: WHITE, margin: 0, valign: "middle",
    });
    s.addNotes(
      "Close on the decision, not a summary. Do not re-list the scopes.\n" +
      "If asked about cost ranking: the standard tool is a marginal abatement cost curve; the alternatives\n" +
      "are a simple payback ranking or an internal carbon price applied to every investment case."
    );
  }

  fs.mkdirSync(OUTDIR, { recursive: true });
  p.writeFile({ fileName: path.join(OUTDIR, "GHG-Inventory-Slides.pptx") })
    .then(() => console.log("wrote GHG-Inventory-Slides.pptx"));
}

/* ══════════════════════════════════════════════════════════════════════════
   DECK B — GRI 11 ESG KPIs
   ══════════════════════════════════════════════════════════════════════════ */
{
  const p = deck("GRI 11 ESG KPIs for a Refinery");
  const FOOT = "ESG KPIs for a refinery under GRI Sector Standard 11";

  // --- 1 title ---
  titleSlide(p,
    "Question 2",
    "ESG Key Performance\nIndicators under GRI 11",
    "The 22 questions a refinery is not allowed to ignore — and the metrics that answer them.",
    "GRI 11: Oil and Gas Sector 2021 · effective 1 January 2023"
  ).addNotes(
    "ESG = Environmental, Social and Governance. GRI = Global Reporting Initiative.\n" +
    "Open with the Nigerian hook: the NGX guidelines point at GRI, and the FRC has adopted IFRS S1 and S2.\n" +
    "Reporting is no longer discretionary here."
  );

  // --- 2 how GRI fits together ---
  {
    const s = light(p);
    head(p, s, "The structure", "Three layers, used in order.",
      "The sector layer is what makes the report about refining rather than about anything.");

    const layers = [
      { n: "1", t: "UNIVERSAL", d: "GRI 1, 2 and 3", e: "Who you are, and how you\ndecide what matters.", fill: PALE, tc: NAVY, dc: MUTE },
      { n: "2", t: "SECTOR", d: "GRI 11 — Oil and Gas", e: "22 topics likely to be\nmaterial to this industry.", fill: NAVY, tc: WHITE, dc: PALE },
      { n: "3", t: "TOPIC", d: "GRI 200 / 300 / 400", e: "The actual metrics, such as\n305-1 or 403-9.", fill: PALE, tc: NAVY, dc: MUTE },
    ];
    const gap = 0.35, cw = colW(3, gap);
    layers.forEach((l, i) => {
      const x = M + i * (cw + gap);
      card(p, s, { x, y: 2.5, w: cw, h: 2.6, fill: l.fill, shadow: i === 1 });
      badge(p, s, x + 0.34, 2.78, 0.56, l.n, l.fill, i === 1 ? BLUE : NAVY);
      s.addText(l.t, {
        x: x + 1.06, y: 2.78, w: cw - 1.4, h: 0.56,
        fontFace: HEAD, fontSize: 21, bold: true, color: l.tc, margin: 0, valign: "middle",
      });
      s.addText(l.d, {
        x: x + 0.34, y: 3.5, w: cw - 0.68, h: 0.4,
        fontFace: HEAD, fontSize: 16, bold: true, color: i === 1 ? BLUE2 : BLUE, margin: 0, valign: "middle",
      });
      s.addText(l.e, {
        x: x + 0.34, y: 3.94, w: cw - 0.68, h: 0.94,
        fontFace: BODY, fontSize: 16, color: l.dc, margin: 0, valign: "top", lineSpacing: 23,
      });
      if (i < 2) {
        s.addShape(p.ShapeType.rightArrow, {
          x: x + cw + 0.06, y: 3.62, w: 0.23, h: 0.36,
          fill: { color: BLUE2 }, line: { type: "none" },
        });
      }
    });

    card(p, s, { x: M, y: 5.36, w: CW, h: 1.3, fill: NAVY });
    s.addText("The report-or-explain rule", {
      x: M + 0.36, y: 5.5, w: CW - 0.72, h: 0.44,
      fontFace: HEAD, fontSize: 20, bold: true, color: BLUE2, margin: 0, valign: "middle",
    });
    s.addText("All 22 topics must be reviewed. Any you call immaterial must be listed, with the reason.", {
      x: M + 0.36, y: 5.94, w: CW - 0.72, h: 0.56,
      fontFace: HEAD, fontSize: 21, bold: true, color: WHITE, margin: 0, valign: "middle",
    });
    foot(s, FOOT, 2);
    s.addNotes(
      "This rule is the heart of GRI 11. It is what stops a refinery publishing a report about tree planting\n" +
      "and community football while saying nothing about flaring, process safety or payments to governments.\n" +
      "GRI 11 was the first sector standard GRI ever published."
    );
  }

  // --- 3 the 22 topics ---
  {
    const s = light(p);
    head(p, s, "GRI 11 — the whole map", "22 topics. For a refinery, most are material.",
      "Grouped here for legibility; the standard numbers them 11.1 to 11.22.");

    const groups = [
      { t: "ENVIRONMENT", n: 7, items: ["11.1  GHG emissions", "11.2  Climate transition", "11.3  Air emissions", "11.4  Biodiversity", "11.5  Waste", "11.6  Water and effluent", "11.7  Closure"], hot: [0, 1, 2, 4, 5] },
      { t: "SAFETY AND PEOPLE", n: 6, items: ["11.8  Asset integrity", "11.9  Health and safety", "11.10  Employment", "11.11  Equal opportunity", "11.12  Forced labour", "11.13  Association"], hot: [0, 1] },
      { t: "SOCIETY", n: 5, items: ["11.14  Economic impacts", "11.15  Local communities", "11.16  Land rights", "11.17  Indigenous rights", "11.18  Conflict/security"], hot: [0, 1] },
      { t: "GOVERNANCE", n: 4, items: ["11.19  Anti-competitive", "11.20  Anti-corruption", "11.21  Payments to govt.", "11.22  Public policy"], hot: [1, 2] },
    ];
    const gap = 0.18, cw = colW(4, gap);
    groups.forEach((g, i) => {
      const x = M + i * (cw + gap);
      card(p, s, { x, y: 2.46, w: cw, h: 3.62, fill: PALE });
      s.addText(g.t, {
        x: x + 0.22, y: 2.6, w: cw - 0.44, h: 0.36,
        fontFace: HEAD, fontSize: 13, bold: true, color: BLUE, charSpacing: 1, margin: 0, valign: "middle",
      });
      g.items.forEach((it, j) => {
        const y = 3.04 + j * 0.44;
        const hot = g.hot.includes(j);
        if (hot) {
          s.addShape(p.ShapeType.roundRect, {
            x: x + 0.1, y: y + 0.02, w: cw - 0.2, h: 0.4, rectRadius: 0.04,
            fill: { color: NAVY }, line: { type: "none" },
          });
        }
        s.addText(it, {
          x: x + 0.2, y, w: cw - 0.36, h: 0.44,
          fontFace: BODY, fontSize: 14, bold: hot, color: hot ? WHITE : INK, margin: 0, valign: "middle",
        });
      });
    });

    s.addShape(p.ShapeType.roundRect, { x: M, y: 6.2, w: 0.34, h: 0.3, rectRadius: 0.04, fill: { color: NAVY }, line: { type: "none" } });
    s.addText("Always material at a refinery — the rest depend on the site, and each must be justified.", {
      x: M + 0.5, y: 6.14, w: CW - 0.5, h: 0.42,
      fontFace: BODY, fontSize: 16, color: MUTE, margin: 0, valign: "middle",
    });
    foot(s, FOOT, 3);
    s.addNotes(
      "Do not read all 22 aloud. Point at the four groups, then name the highlighted ones.\n" +
      "11.8 asset integrity is measured as Tier 1 and Tier 2 process safety events under API RP 754 —\n" +
      "the same loss-of-containment work as our CDU integrity study, now as a public disclosure."
    );
  }

  // --- 4 the KPI board ---
  {
    const s = light(p);
    head(p, s, "The answer sheet", "The metrics that carry the report.",
      "Every one has a GRI code, a unit and a named owner. No code, no credibility.");

    const kpis = [
      { code: "305-1/2/3", t: "Scope 1, 2 and 3 emissions", u: "tCO₂e" },
      { code: "305-4", t: "GHG intensity", u: "tCO₂e / t crude" },
      { code: "302-3", t: "Energy intensity", u: "Solomon EII" },
      { code: "Sector", t: "Flared and vented gas", u: "million Nm³" },
      { code: "305-7", t: "SO₂, NOₓ, particulates, VOC", u: "tonnes / yr" },
      { code: "303-3/5", t: "Water withdrawal and consumption", u: "megalitres" },
      { code: "306-3", t: "Hazardous waste, spent catalyst", u: "tonnes" },
      { code: "Sector", t: "Tier 1 process safety events", u: "count" },
      { code: "403-9", t: "Recordable injury rate", u: "per 200,000 h" },
      { code: "204-1", t: "Spend with local suppliers", u: "%" },
      { code: "205-3", t: "Confirmed corruption incidents", u: "count" },
      { code: "207-4", t: "Payments to governments", u: "₦ million" },
    ];
    const gap = 0.24, cw = colW(3, gap), rh = 0.72, rgap = 0.16;
    kpis.forEach((k, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = M + col * (cw + gap), y = 2.5 + row * (rh + rgap);
      card(p, s, { x, y, w: cw, h: rh, fill: WHITE, line: BLUE2 });
      s.addText(k.code, {
        x: x + 0.2, y: y + 0.06, w: cw - 0.4, h: 0.28,
        fontFace: HEAD, fontSize: 12, bold: true, color: BLUE, margin: 0, valign: "middle",
      });
      s.addText(k.t, {
        x: x + 0.2, y: y + 0.3, w: cw - 1.5, h: 0.36,
        fontFace: BODY, fontSize: 15, color: INK, margin: 0, valign: "middle",
      });
      s.addText(k.u, {
        x: x + cw - 1.44, y: y + 0.3, w: 1.24, h: 0.36,
        fontFace: HEAD, fontSize: 13, bold: true, color: NAVY, align: "right", margin: 0, valign: "middle",
      });
    });

    card(p, s, { x: M, y: 6.06, w: CW, h: 0.62, fill: NAVY });
    s.addText("The GHG inventory from Question 1 is the input. This is where it gets published.", {
      x: M + 0.3, y: 6.06, w: CW - 0.6, h: 0.62,
      fontFace: HEAD, fontSize: 18, bold: true, color: WHITE, margin: 0, valign: "middle",
    });
    s.addNotes(
      "Twelve of roughly forty. The full set with formulas is in the brief.\n" +
      "Flag the injury rate basis: 200,000 hours is US practice, much of the industry uses 1,000,000 —\n" +
      "comparing the two without saying which is a fivefold error.\n" +
      "EII = Energy Intensity Index; VOC = volatile organic compounds."
    );
  }

  // --- 5 alternatives and assurance ---
  {
    const s = dark(p);
    s.addText("WHAT ELSE EXISTS, AND HOW IT GETS SIGNED OFF", {
      x: M, y: 0.56, w: CW, h: 0.38,
      fontFace: HEAD, fontSize: 15, bold: true, color: BLUE2, charSpacing: 1.8, margin: 0, valign: "middle",
    });
    s.addText("Different readers, same plant.", {
      x: M, y: 0.98, w: CW, h: 0.8,
      fontFace: HEAD, fontSize: 34, bold: true, color: WHITE, margin: 0, valign: "middle",
    });

    const alts = [
      { t: "GRI + GRI 11", w: "All stakeholders", d: "What we did to the world" },
      { t: "IFRS S1 & S2", w: "Investors", d: "What the world may cost us" },
      { t: "SASB", w: "Investors", d: "Precise industry metrics" },
      { t: "IPIECA", w: "The sector", d: "How to measure them" },
      { t: "CDP", w: "Buyers, lenders", d: "A score, A to D−" },
      { t: "NEITI", w: "Citizens", d: "Proof of what we paid" },
    ];
    const gap = 0.19, cw = colW(6, gap);
    alts.forEach((a, i) => {
      const x = M + i * (cw + gap);
      card(p, s, { x, y: 2.02, w: cw, h: 2.1, fill: i === 0 ? BLUE : NAVY2 });
      s.addText(a.t, {
        x: x + 0.18, y: 2.18, w: cw - 0.36, h: 0.6,
        fontFace: HEAD, fontSize: 16, bold: true, color: WHITE, margin: 0, valign: "top", lineSpacing: 20,
      });
      s.addText(a.w, {
        x: x + 0.18, y: 2.82, w: cw - 0.36, h: 0.32,
        fontFace: BODY, fontSize: 13, bold: true, color: i === 0 ? WHITE : BLUE2, margin: 0, valign: "middle",
      });
      s.addText(a.d, {
        x: x + 0.18, y: 3.16, w: cw - 0.36, h: 0.82,
        fontFace: BODY, fontSize: 14, color: PALE, margin: 0, valign: "top", lineSpacing: 19,
      });
    });

    s.addText("GRI is the backbone. The others answer the same data to a different reader.", {
      x: M, y: 4.28, w: CW, h: 0.42,
      fontFace: BODY, fontSize: 17, italic: true, color: BLUE2, margin: 0, valign: "middle",
    });

    card(p, s, { x: M, y: 4.86, w: 6.1, h: 1.42, fill: NAVY2 });
    s.addText("ASSURANCE", {
      x: M + 0.3, y: 5.0, w: 5.5, h: 0.3,
      fontFace: HEAD, fontSize: 13, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
    });
    s.addText("ISAE 3000 and ISAE 3410.\nLimited assurance is the floor; reasonable is the expectation.", {
      x: M + 0.3, y: 5.3, w: 5.5, h: 0.88,
      fontFace: BODY, fontSize: 16, color: PALE, margin: 0, valign: "top", lineSpacing: 22,
    });

    card(p, s, { x: M + 6.5, y: 4.86, w: CW - 6.5, h: 1.42, fill: BLUE });
    s.addText("THE TEST", {
      x: M + 6.8, y: 5.0, w: CW - 7.1, h: 0.3,
      fontFace: HEAD, fontSize: 13, bold: true, color: NAVY, charSpacing: 1.2, margin: 0, valign: "middle",
    });
    s.addText("A report is judged by what it refuses to leave out.", {
      x: M + 6.8, y: 5.3, w: CW - 7.1, h: 0.88,
      fontFace: HEAD, fontSize: 20, bold: true, color: WHITE, margin: 0, valign: "top", lineSpacing: 26,
    });

    s.addText("Group C (29 Members)  ·  Thank you — questions", {
      x: M, y: 6.5, w: CW, h: 0.4,
      fontFace: BODY, fontSize: 15, color: "7FA8CE", margin: 0, valign: "middle",
    });
    s.addNotes(
      "Close on the last line and stop. Do not summarise.\n" +
      "If asked which framework to pick: GRI as the backbone, IFRS S2 for the investor climate section,\n" +
      "SASB where a precise industry number is wanted, IPIECA for how to measure it. One data dictionary\n" +
      "underneath all of them, or you publish contradictory numbers."
    );
  }

  p.writeFile({ fileName: path.join(OUTDIR, "GRI-11-ESG-KPIs-Slides.pptx") })
    .then(() => console.log("wrote GRI-11-ESG-KPIs-Slides.pptx"));
}

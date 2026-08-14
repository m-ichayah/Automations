/*
 * CDU Integrity Case Study — Group C (29 Members)
 * Generates: dist/CDU-Integrity-Group-C.pptx
 *
 * Logo: drop the official file at assets/dangote-logo.png (or .jpg) and re-run.
 * If it is absent the title slide renders a clearly marked logo slot of the
 * same size and position, so swapping it in changes nothing else on the page.
 */

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "dist", "CDU-Integrity-Group-C.pptx");

// ── palette ────────────────────────────────────────────────────────────────
const INK   = "0A2540"; // deep petroleum navy — dominant
const INK2  = "12395F"; // lifted navy for layering on dark
const BLUE  = "00539B"; // primary accent
const RED    = "C8102E"; // failure / critical — used sparingly
const AMBER = "C87F16"; // high / caution
const GREEN = "2E7D5B"; // controlled / worked
const PURPLE = "6B4E9B"; // fifth register entry only
const PAPER = "FFFFFF";
const MIST  = "F1F4F8"; // card tint
const MIST2 = "E4EAF1"; // deeper card tint
const SLATE = "56677A"; // muted body
const LINE  = "CFD8E3";
const FAINT = "8494A6";

const HEAD = "Cambria";
const BODY = "Calibri";

const W = 13.33, H = 7.5;
const M = 0.62;              // page margin
const CW = W - M * 2;        // content width = 12.09
const BODY_Y = 1.80;         // every content slide starts its body here
const BAND_Y = 6.62;         // technical substantiation band

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Group C (29 Members)";
pres.company = "Crude Distillation Unit Integrity Case Study";
pres.title = "From Failure to Control";

// ── helpers ────────────────────────────────────────────────────────────────
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
 * Two-layer slide head: a plain-language claim a manager can act on, over a
 * technical support line for the engineers. Sized to hold a two-line claim
 * without ever reaching the body, which starts at BODY_Y.
 */
function slideHead(s, kicker, claim, support) {
  s.addText(kicker.toUpperCase(), {
    x: M, y: 0.32, w: CW, h: 0.24,
    fontFace: BODY, fontSize: 11, bold: true, color: BLUE,
    charSpacing: 1.6, margin: 0, valign: "middle",
  });
  // valign middle so a one-line claim sits close to its support line, while a
  // two-line claim still fills the box without ever reaching BODY_Y
  s.addText(claim, {
    x: M, y: 0.54, w: CW, h: 0.88,
    fontFace: HEAD, fontSize: 24, bold: true, color: INK,
    margin: 0, valign: "middle", lineSpacing: 29,
  });
  if (support) {
    s.addText(support, {
      x: M, y: 1.44, w: CW, h: 0.28,
      fontFace: BODY, fontSize: 12, italic: true, color: SLATE,
      margin: 0, valign: "middle",
    });
  }
}

/** Bottom technical substantiation band — the engineers' layer. */
function techBand(s, parts) {
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
        x: M + i * cell + 0.16, y: BAND_Y, w: cell - 0.32, h: 0.52,
        fontFace: BODY, fontSize: 9.5, margin: 0, valign: "middle", lineSpacing: 12,
      }
    );
  });
}

function sectionDivider(n, kicker, title, blurb) {
  const s = darkSlide();
  s.addText(n, {
    x: M, y: 1.5, w: 3.2, h: 2.6,
    fontFace: HEAD, fontSize: 150, bold: true, color: INK2, margin: 0,
  });
  // text block clears the right edge of the numeral's box (M + 3.2)
  const tx = M + 3.3, tw = W - M - tx;
  s.addText(kicker.toUpperCase(), {
    x: tx, y: 2.35, w: tw, h: 0.3,
    fontFace: BODY, fontSize: 12, bold: true, color: "7FA8CE",
    charSpacing: 2, margin: 0, valign: "middle",
  });
  s.addText(title, {
    x: tx, y: 2.64, w: tw, h: 1.14,
    fontFace: HEAD, fontSize: 36, bold: true, color: PAPER, margin: 0, valign: "top",
  });
  s.addText(blurb, {
    x: tx, y: 3.9, w: tw - 0.5, h: 0.95,
    fontFace: BODY, fontSize: 14, color: "B9CBDD", margin: 0, lineSpacing: 21, valign: "top",
  });
  return s;
}

/** Small numbered circular badge — the deck's repeating motif. */
function badge(s, x, y, d, label, fill, txtColor) {
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" },
  });
  s.addText(label, {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: BODY, fontSize: d > 0.55 ? 15 : 11, bold: true,
    color: txtColor || PAPER, margin: 0,
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

/**
 * Trim surrounding transparent/white margin from a logo and cache the result
 * next to it. Returns the trimmed path, or the original if sharp is missing or
 * the trim fails — the deck must still build without the optional dependency.
 */
function trimmedLogo(srcPath) {
  const out = path.join(path.dirname(srcPath), ".logo-trimmed.png");
  try {
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(srcPath).mtimeMs) {
      return out;
    }
    const { execFileSync } = require("child_process");
    execFileSync(process.execPath, [
      "-e",
      `require('sharp')(${JSON.stringify(srcPath)})
         .trim({ threshold: 5 })
         .png()
         .toFile(${JSON.stringify(out)})
         .then(() => process.exit(0), () => process.exit(1));`,
    ], { stdio: "ignore" });
    return fs.existsSync(out) ? out : srcPath;
  } catch {
    return srcPath;
  }
}

const riskColor = (n) => (n >= 15 ? RED : n >= 10 ? AMBER : n >= 5 ? BLUE : GREEN);
const riskBand = (n) => (n >= 15 ? "CRITICAL" : n >= 10 ? "HIGH" : n >= 5 ? "MEDIUM" : "LOW");

/* ════════════════════════════════════════════════════════════════════════
   1 — TITLE
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = darkSlide();

  const logoDir = path.join(ROOT, "assets");
  const src = ["dangote-logo.png", "dangote-logo.jpg", "dangote-logo.jpeg"]
    .map((f) => path.join(logoDir, f))
    .find((p) => fs.existsSync(p));

  // Logo files usually ship with transparent or white margin baked in, which
  // would make the mark render small inside its plate. Trim it to the actual
  // content so the box below is filled predictably whatever file is supplied.
  const found = src ? trimmedLogo(src) : null;

  // The mark is navy on transparent, so on a navy slide it needs a white plate
  // behind it. Plate is sized to the logo's 3:2 aspect plus even padding.
  const LX = M, LY = 0.62, LW = 2.0, LH = 0.98, PAD_X = 0.2, PAD_Y = 0.17;
  if (found) {
    s.addShape(pres.ShapeType.roundRect, {
      x: LX, y: LY, w: LW + PAD_X * 2, h: LH + PAD_Y * 2, rectRadius: 0.05,
      fill: { color: PAPER }, line: { type: "none" },
    });
    s.addImage({
      path: found, x: LX + PAD_X, y: LY + PAD_Y, w: LW, h: LH,
      sizing: { type: "contain", w: LW, h: LH },
    });
  } else {
    s.addShape(pres.ShapeType.roundRect, {
      x: LX, y: LY, w: LW + PAD_X * 2, h: LH + PAD_Y * 2, rectRadius: 0.05,
      fill: { color: INK2 }, line: { color: "45688C", width: 1, dashType: "dash" },
    });
    s.addText("DANGOTE LOGO\nplace assets/dangote-logo.png", {
      x: LX, y: LY, w: LW + PAD_X * 2, h: LH + PAD_Y * 2, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 9, color: "8FB0CE", margin: 0, lineSpacing: 12,
    });
  }

  s.addText("CRUDE DISTILLATION UNIT  ·  INTEGRITY CASE STUDY", {
    x: M, y: 2.34, w: CW, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: "7FA8CE",
    charSpacing: 2, margin: 0, valign: "middle",
  });

  s.addText("From Failure to Control", {
    x: M, y: 2.66, w: CW, h: 1.0,
    fontFace: HEAD, fontSize: 50, bold: true, color: PAPER, margin: 0, valign: "middle",
  });

  s.addText("Root cause analysis · risk register · permit to work · job safety analysis", {
    x: M, y: 3.72, w: CW, h: 0.36,
    fontFace: BODY, fontSize: 16, color: "B9CBDD", margin: 0, valign: "middle",
  });

  s.addText("One unit. One causal chain. Four deliverables that hand over to each other.", {
    x: M, y: 4.1, w: CW, h: 0.32,
    fontFace: BODY, fontSize: 13, italic: true, color: "88A6C4", margin: 0, valign: "middle",
  });

  s.addText("PRESENTED BY  ·  GROUP C  (29 MEMBERS)", {
    x: M, y: 5.14, w: CW, h: 0.28,
    fontFace: BODY, fontSize: 10.5, bold: true, color: "7FA8CE",
    charSpacing: 1.6, margin: 0, valign: "middle",
  });

  const names = [
    "Abu Omosomi Joy",
    "Iniovosa Michayah Olamide",
    "Abdulkadir Garba Yusuf Aondoakaa",
    "Doochivir Christopher",
  ];
  const nw = 2.86, ngap = 0.19;
  names.forEach((n, i) => {
    const x = M + i * (nw + ngap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 5.5, w: nw, h: 0.76, rectRadius: 0.05,
      fill: { color: INK2 }, line: { color: "2C5580", width: 0.75 },
    });
    s.addText(n, {
      x: x + 0.14, y: 5.5, w: nw - 0.28, h: 0.76,
      fontFace: BODY, fontSize: 11.5, bold: true, color: "DCE7F2",
      align: "center", valign: "middle", margin: 0, lineSpacing: 14,
    });
  });

  s.addNotes(
    "Do not open with methodology. Open with the event on slide 2.\n" +
    "Confirm before presenting: the official Dangote logo has replaced the slot at top-left."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   2 — THE OPENING LOSS
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = darkSlide();

  s.addText("TWELVE MONTHS ON ONE CRUDE DISTILLATION UNIT", {
    x: M, y: 0.78, w: CW, h: 0.3,
    fontFace: BODY, fontSize: 12, bold: true, color: "7FA8CE",
    charSpacing: 2, margin: 0, valign: "middle",
  });
  s.addText("Three failures. Nobody was hurt.", {
    x: M, y: 1.14, w: CW, h: 0.78,
    fontFace: HEAD, fontSize: 36, bold: true, color: PAPER, margin: 0, valign: "middle",
  });

  const stats = [
    { v: "$23.1M", k: "Direct cost", sub: "lost margin and repair" },
    { v: "28", k: "Days of lost production", sub: "across three events" },
    { v: "3", k: "High-potential near misses", sub: "H₂S, pool fire, firebox fire" },
    { v: "0", k: "Injuries", sub: "not entirely by design" },
  ];
  const cw2 = 2.86, gap = 0.19;
  stats.forEach((st, i) => {
    const x = M + i * (cw2 + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.26, w: cw2, h: 2.02, rectRadius: 0.06,
      fill: { color: INK2 }, line: { type: "none" },
    });
    s.addText(st.v, {
      x: x + 0.2, y: 2.42, w: cw2 - 0.4, h: 0.74,
      fontFace: HEAD, fontSize: 33, bold: true,
      color: i === 3 ? "7FA8CE" : PAPER, margin: 0, valign: "middle",
    });
    s.addText(st.k, {
      x: x + 0.2, y: 3.2, w: cw2 - 0.4, h: 0.44,
      fontFace: BODY, fontSize: 12, bold: true, color: "DCE7F2",
      margin: 0, valign: "top", lineSpacing: 15,
    });
    s.addText(st.sub, {
      x: x + 0.2, y: 3.68, w: cw2 - 0.4, h: 0.42,
      fontFace: BODY, fontSize: 10.5, color: "8FA9C2", margin: 0, valign: "top", lineSpacing: 13,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.62, w: CW, h: 1.26, rectRadius: 0.06,
    fill: { color: INK2 }, line: { type: "none" },
  });
  s.addText(
    [
      { text: "The zero is not a result. ", options: { bold: true, color: PAPER } },
      {
        text:
          "Two of these three could have killed somebody and did not, for reasons that were not under " +
          "our control. A hot oil release found no ignition source. A tube ruptured when nobody was " +
          "standing at the heater. That is luck, and luck is not a barrier.",
        options: { color: "C6D6E6" },
      },
    ],
    {
      x: M + 0.34, y: 4.62, w: CW - 0.68, h: 1.26,
      fontFace: BODY, fontSize: 14.5, margin: 0, valign: "middle", lineSpacing: 23,
    }
  );

  s.addText("Figures are indicative, from a constructed teaching case — see Basis and Scope in the handout.", {
    x: M, y: 6.14, w: CW, h: 0.3,
    fontFace: BODY, fontSize: 10, italic: true, color: "6D89A6", margin: 0, valign: "middle",
  });

  s.addNotes(
    "Say the money and the days before any technical word. Everyone in the room understands loss.\n" +
    "Land the last line slowly: luck is not a barrier. That sentence is the reason for the next 40 minutes."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   3 and 20 — THE MAP  (persistent visual, returned to between sections)
   ════════════════════════════════════════════════════════════════════════ */
const CHAIN = [
  {
    n: "01", t: "Root Cause Analysis", q: "Why did it fail?",
    d: "Three failures, one template, down to the organisational root.",
    hand: "what we learn becomes tracked risk", c: BLUE,
  },
  {
    n: "02", t: "Risk Register", q: "What could still fail?",
    d: "Five entries, scored twice, every one with a named owner.",
    hand: "tracked risk generates work on live plant", c: AMBER,
  },
  {
    n: "03", t: "Permit to Work", q: "Who authorises it?",
    d: "A control architecture, evidenced by a form.",
    hand: "the permit authorises the task", c: GREEN,
  },
  {
    n: "04", t: "Job Safety Analysis", q: "How is it done safely?",
    d: "Twelve steps at the hands of a fitter with a spanner.",
    hand: null, c: RED,
  },
];

function chainSlide(opts = {}) {
  const s = lightSlide();
  slideHead(s, opts.kicker, opts.claim, opts.support);

  const cw3 = 2.79, gap = 0.31;
  const y = BODY_Y, h = opts.cardH || 3.72;

  CHAIN.forEach((c, i) => {
    const x = M + i * (cw3 + gap);
    card(s, { x, y, w: cw3, h, fill: PAPER, line: c.c, shadow: true });
    badge(s, x + 0.28, y + 0.3, 0.62, c.n, c.c);
    s.addText(c.t, {
      x: x + 0.28, y: y + 1.08, w: cw3 - 0.56, h: 0.66,
      fontFace: HEAD, fontSize: 16, bold: true, color: INK, margin: 0, valign: "top", lineSpacing: 19,
    });
    s.addText(c.q, {
      x: x + 0.28, y: y + 1.76, w: cw3 - 0.56, h: 0.3,
      fontFace: BODY, fontSize: 12, bold: true, italic: true, color: c.c, margin: 0, valign: "middle",
    });
    s.addText(c.d, {
      x: x + 0.28, y: y + 2.12, w: cw3 - 0.56, h: 1.0,
      fontFace: BODY, fontSize: 11, color: SLATE, margin: 0, valign: "top", lineSpacing: 14,
    });
    if (i < 3) {
      s.addShape(pres.ShapeType.rightArrow, {
        x: x + cw3 + 0.045, y: y + 0.44, w: 0.22, h: 0.34,
        fill: { color: c.c }, line: { type: "none" },
      });
    }
  });

  // handover captions, each centred on the gap it describes — tiled, never overlapping
  const capY = y + h + 0.14;
  CHAIN.slice(0, 3).forEach((c, i) => {
    const centre = M + i * (cw3 + gap) + cw3 + gap / 2;
    s.addText("→  " + c.hand, {
      x: centre - (cw3 + gap) / 2, y: capY, w: cw3 + gap, h: 0.34,
      fontFace: BODY, fontSize: 8.5, italic: true, color: FAINT,
      align: "center", margin: 0, valign: "top", lineSpacing: 11,
    });
  });

  return s;
}

{
  const s = chainSlide({
    kicker: "How the four deliverables connect",
    claim: "Backward look, forward look, authorisation, execution.",
    support: "Each deliverable produces what the next one consumes. That is the whole session in one line.",
  });
  techBand(s, [
    { k: "Unit", v: "CDU, 120,000 bpsd, medium sour blend" },
    { k: "Period", v: "12 months to 30 June 2026" },
    { k: "Standards", v: "API RP 571 / 580 / 584 / 682 · ISO 45001" },
  ]);
  s.addNotes(
    "This is the map. Put it up, say the sentence, and come back to it between sections.\n" +
    "Three things failed, so we analyse why. What we learn becomes risk that has to be tracked. Tracked risk\n" +
    "generates work on live hydrocarbon equipment, so that work has to be authorised. And the permit authorises\n" +
    "a task that still has to be done safely by hand."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   4 — DIVIDER 01
   ════════════════════════════════════════════════════════════════════════ */
sectionDivider(
  "01", "The backward look", "Why three things failed",
  "Three different mechanisms — aqueous corrosion, mechanical reliability, high-temperature metallurgy. One analysis template."
).addNotes("18 minutes for this section. Slow down on the latent roots — that is where the value is.");

/* ════════════════════════════════════════════════════════════════════════
   5 — THE TEMPLATE
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "One method, applied three times",
    "The same seven questions, asked of every failure.",
    "The repetition is deliberate. By the third failure you will be predicting the structure and listening to the content."
  );

  const steps = [
    { n: "A", t: "Event and consequence", d: "What happened, what it cost, who could have been hurt" },
    { n: "B", t: "Evidence preserved", d: "What we secured before anything was cleaned or repaired" },
    { n: "C", t: "Physical root", d: "What the metal actually did, named per API RP 571" },
    { n: "D", t: "Human root", d: "What people did, or did not do, and why it was reasonable to them" },
    { n: "E", t: "Latent / system root", d: "What the organisation permitted or never asked for" },
    { n: "F", t: "Barrier analysis", d: "What should have stopped it — absent, degraded, or working" },
    { n: "G", t: "Corrective actions", d: "Ranked against the hierarchy of controls, not listed at random" },
  ];

  const colW = 5.86, colGap = 0.37, rowH = 0.78, gapY = 0.16;
  steps.forEach((st, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * (colW + colGap);
    const y = BODY_Y + row * (rowH + gapY);
    const emph = st.n === "E";

    card(s, { x, y, w: colW, h: rowH, fill: emph ? MIST2 : MIST, line: emph ? BLUE : LINE });
    badge(s, x + 0.2, y + 0.19, 0.4, st.n, emph ? BLUE : "8FA0B4");
    s.addText(st.t, {
      x: x + 0.72, y: y + 0.1, w: colW - 0.94, h: 0.3,
      fontFace: BODY, fontSize: 12.5, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(st.d, {
      x: x + 0.72, y: y + 0.4, w: colW - 0.94, h: 0.3,
      fontFace: BODY, fontSize: 10.5, color: SLATE, margin: 0, valign: "middle",
    });
  });

  const cx = M + colW + colGap, cy = BODY_Y + 3 * (rowH + gapY);
  card(s, { x: cx, y: cy, w: colW, h: rowH, fill: INK, line: null });
  s.addText(
    [
      { text: "Section E is where the value is. ", options: { bold: true, color: PAPER } },
      { text: "A report that stops at C and D is a maintenance record.", options: { color: "B9CBDD" } },
    ],
    {
      x: cx + 0.24, y: cy, w: colW - 0.48, h: rowH,
      fontFace: BODY, fontSize: 11.5, margin: 0, valign: "middle", lineSpacing: 15,
    }
  );

  s.addText(
    "Drawn as a logic tree in the handout; the Five Whys chain runs underneath each one as a narrative caption.",
    { x: M, y: 5.72, w: CW, h: 0.3, fontFace: BODY, fontSize: 11, italic: true, color: SLATE, margin: 0, valign: "middle" }
  );

  techBand(s, [
    { k: "Mechanism naming", v: "API RP 571 terminology throughout — never the word “corrosion” on its own" },
    { k: "Action ranking", v: "Eliminate → substitute → engineering → administrative → PPE" },
  ]);

  s.addNotes("Walk the template once, here, so you never have to explain it again on slides 6, 7 and 8.");
}

/* ════════════════════════════════════════════════════════════════════════
   6, 7, 8 — THE THREE FAILURES
   ════════════════════════════════════════════════════════════════════════ */
function failureSlide(f) {
  const s = lightSlide();
  slideHead(s, f.kicker, f.claim, f.support);

  // ── left: the causal chain, read top to bottom ──
  const lx = M, lw = 6.9;
  const rows = [
    { label: "EVENT", text: f.event, c: RED, h: 0.96 },
    { label: "PHYSICAL ROOT", text: f.physical, c: INK, h: 0.96 },
    { label: "HUMAN ROOT", text: f.human, c: INK, h: 0.96 },
    { label: "LATENT / SYSTEM ROOT", text: f.latent, c: BLUE, h: 1.3 },
  ];
  let ry = BODY_Y;
  rows.forEach((r, i) => {
    const last = i === 3;
    card(s, {
      x: lx, y: ry, w: lw, h: r.h,
      fill: last ? MIST2 : MIST, line: last ? BLUE : LINE, shadow: last,
    });
    s.addText(r.label, {
      x: lx + 0.22, y: ry + 0.08, w: lw - 0.44, h: 0.2,
      fontFace: BODY, fontSize: 8.5, bold: true, color: r.c, charSpacing: 1.2, margin: 0, valign: "middle",
    });
    s.addText(r.text, {
      x: lx + 0.22, y: ry + 0.28, w: lw - 0.44, h: r.h - 0.36,
      fontFace: BODY, fontSize: 11, color: last ? INK : SLATE, bold: last,
      margin: 0, lineSpacing: 14, valign: "top",
    });
    if (!last) {
      s.addShape(pres.ShapeType.downArrow, {
        x: lx + 0.42, y: ry + r.h + 0.005, w: 0.2, h: 0.15,
        fill: { color: "AEBBCA" }, line: { type: "none" },
      });
    }
    ry += r.h + 0.15;
  });

  // ── right: numbers, then barriers ──
  const rx = M + lw + 0.34, rw = CW - lw - 0.34;

  card(s, { x: rx, y: BODY_Y, w: rw, h: 2.22, fill: INK, line: null });
  s.addText("THE NUMBERS", {
    x: rx + 0.24, y: BODY_Y + 0.12, w: rw - 0.48, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: "7FA8CE", charSpacing: 1.2, margin: 0, valign: "middle",
  });
  f.numbers.forEach((n, i) => {
    const y = BODY_Y + 0.4 + i * 0.36;
    s.addText(n.k, {
      x: rx + 0.24, y, w: rw - 1.66, h: 0.34,
      fontFace: BODY, fontSize: 10.5, color: "B9CBDD", margin: 0, valign: "middle",
    });
    s.addText(n.v, {
      x: rx + rw - 1.68, y, w: 1.44, h: 0.34,
      fontFace: BODY, fontSize: 11, bold: true, color: n.hot ? "FF8A94" : PAPER,
      align: "right", margin: 0, valign: "middle",
    });
  });

  const by = BODY_Y + 2.37;
  card(s, { x: rx, y: by, w: rw, h: 2.26, fill: MIST, line: LINE });
  s.addText("BARRIERS", {
    x: rx + 0.24, y: by + 0.12, w: rw - 0.48, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
  });
  f.barriers.forEach((b, i) => {
    const y = by + 0.4 + i * 0.3;
    const col = b.s === "worked" ? GREEN : b.s === "absent" ? RED : AMBER;
    s.addShape(pres.ShapeType.ellipse, {
      x: rx + 0.24, y: y + 0.07, w: 0.13, h: 0.13,
      fill: { color: col }, line: { type: "none" },
    });
    s.addText(b.t, {
      x: rx + 0.48, y, w: rw - 0.72, h: 0.3,
      fontFace: BODY, fontSize: 10, color: b.s === "worked" ? INK : SLATE,
      bold: b.s === "worked", margin: 0, valign: "middle",
    });
  });

  techBand(s, f.tech);
  s.addNotes(f.notes);
  return s;
}

failureSlide({
  kicker: "Failure 1 of 3  ·  E-1103A overhead condenser  ·  14 Nov 2025",
  claim: "We inspected the wrong part of this line for years.",
  support: "Ammonium chloride salt corrosion, progressing to hydrochloric acid attack once free water condensed (API RP 571).",
  event:
    "Through-wall leak in the upper tube rows and the overhead elbow. Sour hydrocarbon and sour water released at grade; H₂S measured 28 ppm at source. Six days down, $4.2M.",
  physical:
    "Hygroscopic NH₄Cl salts deposit above the water dew point, pull moisture from the vapour and form a concentrated acidic brine against the wall — localised attack while the bulk stream still looks dry.",
  human:
    "The crude slate moved to a higher-chloride blend and desalter wash water was never increased to match. Overhead chemistry sampling fell from daily to weekly during a staffing gap.",
  latent:
    "No Management of Change was raised for the crude slate change — blending was treated as an operating adjustment, not a change. So the corrosion loop review never triggered, and the monitoring locations stayed where the wrong mechanism would show.",
  numbers: [
    { k: "Nominal wall", v: "9.53 mm" },
    { k: "Retirement limit", v: "4.80 mm" },
    { k: "Measured at failure", v: "2.10 mm", hot: true },
    { k: "Rate, historic", v: "0.12 mm/yr" },
    { k: "Rate, final 9 months", v: "1.80 mm/yr", hot: true },
  ],
  barriers: [
    { t: "Chloride cap in blend spec", s: "absent" },
    { t: "MOC on feedstock change", s: "absent" },
    { t: "Desalter performance", s: "degraded" },
    { t: "Overhead water wash", s: "degraded" },
    { t: "Chemistry monitoring (IOW)", s: "degraded" },
    { t: "Gas detection and unit trip", s: "worked" },
  ],
  tech: [
    { k: "Mechanism", v: "NH₄Cl salt → HCl corrosion, API RP 571" },
    { k: "Boot water pH", v: "4.1 against a 5.5–6.5 band" },
    { k: "Desalted chloride", v: "41 ptb against ≤ 20 ptb design" },
  ],
  notes:
    "The headline is the whole point: the inspection programme was competent and aimed at the wrong location.\n" +
    "A 15-fold step change in corrosion rate was visible in the data. Nobody owned the question.\n" +
    "For the engineers: TMLs sat on the bottom of the horizontal run, catching erosion and water drop-out.",
});

failureSlide({
  kicker: "Failure 2 of 3  ·  P-1104A heavy gas oil pump  ·  3 Mar 2026",
  claim: "This pump told us three times. Nobody asked why.",
  support: "Mechanical seal failure on 290 °C hydrocarbon service — loss of containment above the flash point, with contractors 30 m away.",
  event:
    "The seal failed catastrophically; 2.1 m³ of gas oil at 290 °C released and pooled. Gas detection alarmed, the pump tripped, area ESD initiated. It did not ignite. 18 hours down, $0.9M.",
  physical:
    "The Plan 11 flush line was blocked with coke fines at the orifice. With no flush the seal chamber lost cooling and pressure margin, the faces ran dry, and the carbon face cracked by thermal shock.",
  human:
    "Three seal failures in eighteen months were each closed as a maintenance job — like-for-like, no investigation. The vibration alarm was acknowledged and reset without a work order.",
  latent:
    "No defect elimination process and no bad-actor threshold. Nothing said that three failures in eighteen months is abnormal, so the repeats were never visible as a pattern — only as a series of small, well-handled jobs.",
  numbers: [
    { k: "Seal arrangement", v: "API 682 Arr. 1" },
    { k: "Vibration at failure", v: "11.4 mm/s", hot: true },
    { k: "ISO 10816-3 alarm", v: "7.10 mm/s" },
    { k: "Failures in 18 months", v: "3", hot: true },
    { k: "MTBF, achieved / target", v: "6 / 36 mo", hot: true },
  ],
  barriers: [
    { t: "Seal flush (Plan 11)", s: "absent" },
    { t: "Dual seal containment", s: "absent" },
    { t: "Bad actor / RCA trigger", s: "absent" },
    { t: "Vibration alarm response", s: "degraded" },
    { t: "Ignition control — untested", s: "degraded" },
    { t: "Gas detection and ESD", s: "worked" },
  ],
  tech: [
    { k: "Mechanism", v: "Seal face thermal shock from loss of flush" },
    { k: "Service", v: "290 °C, above the 195 °C flash point" },
    { k: "Fix", v: "API 682 Arr. 2 dual seal, Plan 53B barrier fluid" },
  ],
  notes:
    "Land the ignition line: ignition control was never tested, because there was no ignition source. That is not a barrier.\n" +
    "For the managers: maintenance did nothing wrong on any of the three jobs. The system had no way to add them up.",
});

failureSlide({
  kicker: "Failure 3 of 3  ·  H-1101 crude charge heater  ·  22 May 2026",
  claim: "The instrument that would have seen this coming was switched off.",
  support: "Creep and stress rupture from localised overheating with internal coke deposition (API RP 571), on a 9Cr-1Mo radiant tube.",
  event:
    "A Pass 3 radiant tube bulged and ruptured longitudinally. Crude discharged into the firebox and ignited. Heater tripped, emergency depressuring initiated, refractory and adjacent tubes damaged. 21 days down, $18.0M.",
  physical:
    "A partly plugged burner tip impinged flame on the tube. Coke laid down inside; coke insulates, so heat stayed in the wall instead of reaching the process; metal temperature climbed, which laid down coke faster.",
  human:
    "The Pass 3 tube skin thermocouple failed and was inhibited in the DCS to stop nuisance alarms — eight months before the rupture. Pass flow imbalance had been normalised on the panel.",
  latent:
    "Instrument inhibits could be applied indefinitely with no register, no expiry and no risk assessment. A reasonable person solved a real problem, and the organisation provided no mechanism that would ever ask for the measurement back.",
  numbers: [
    { k: "Tube material", v: "A335 P9" },
    { k: "Design TMT", v: "620 °C" },
    { k: "Estimated peak TMT", v: "760 °C", hot: true },
    { k: "Internal coke layer", v: "6 mm" },
    { k: "Diameter increase", v: "6.2%", hot: true },
  ],
  barriers: [
    { t: "Tube metal temperature monitoring", s: "absent" },
    { t: "Integrity Operating Window", s: "absent" },
    { t: "Condition-based decoking", s: "absent" },
    { t: "Pass flow balancing", s: "degraded" },
    { t: "IR thermography survey", s: "degraded" },
    { t: "Trip and emergency depressuring", s: "worked" },
  ],
  tech: [
    { k: "Mechanism", v: "Creep / stress rupture, API RP 571" },
    { k: "Damage indicator", v: "> 3% diameter increase; 6.2% measured" },
    { k: "Fix", v: "Redundant TMT, inhibit register, API RP 584 IOW" },
  ],
  notes:
    "The strongest line in the deck: a safety-relevant measurement was switched off by a reasonable person\n" +
    "solving a reasonable problem, and nothing in the organisation would ever ask for it back.\n" +
    "Ask the room: how many inhibits are live on your plant right now, and who could tell you?",
});

/* ════════════════════════════════════════════════════════════════════════
   9 — THE PATTERN
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "What the three have in common",
    "Every one had a competent engineering answer and an uncomfortable organisational one underneath it.",
    "Not one of these was caused by somebody being careless on the day."
  );

  const cols = [
    { h: "RCA-01  Overhead", p: "NH₄Cl under-deposit corrosion", l: "Crude slate change without MOC", q: "Inspecting the wrong location", c: BLUE },
    { h: "RCA-02  Pump seal", p: "Dry-running seal faces", l: "No bad-actor threshold", q: "Fixing without asking why", c: AMBER },
    { h: "RCA-03  Heater tube", p: "Creep from localised overheating", l: "Inhibit with no expiry", q: "A measurement switched off", c: RED },
  ];

  const cw4 = 3.85, gap = 0.27, ch = 2.66;
  cols.forEach((c, i) => {
    const x = M + i * (cw4 + gap);
    card(s, { x, y: BODY_Y, w: cw4, h: ch, fill: MIST, line: LINE });
    s.addText(c.h, {
      x: x + 0.22, y: BODY_Y + 0.12, w: cw4 - 0.44, h: 0.3,
      fontFace: BODY, fontSize: 12, bold: true, color: c.c, margin: 0, valign: "middle",
    });
    s.addText("PHYSICAL ROOT", {
      x: x + 0.22, y: BODY_Y + 0.48, w: cw4 - 0.44, h: 0.2,
      fontFace: BODY, fontSize: 8.5, bold: true, color: "8FA0B4", charSpacing: 1, margin: 0, valign: "middle",
    });
    s.addText(c.p, {
      x: x + 0.22, y: BODY_Y + 0.68, w: cw4 - 0.44, h: 0.46,
      fontFace: BODY, fontSize: 11.5, color: SLATE, margin: 0, valign: "top", lineSpacing: 14,
    });
    s.addText("LATENT ROOT", {
      x: x + 0.22, y: BODY_Y + 1.2, w: cw4 - 0.44, h: 0.2,
      fontFace: BODY, fontSize: 8.5, bold: true, color: c.c, charSpacing: 1, margin: 0, valign: "middle",
    });
    s.addText(c.l, {
      x: x + 0.22, y: BODY_Y + 1.4, w: cw4 - 0.44, h: 0.5,
      fontFace: BODY, fontSize: 12, bold: true, color: INK, margin: 0, valign: "top", lineSpacing: 15,
    });
    s.addText("“" + c.q + "”", {
      x: x + 0.22, y: BODY_Y + 1.98, w: cw4 - 0.44, h: 0.5,
      fontFace: BODY, fontSize: 11, italic: true, color: FAINT, margin: 0, valign: "top", lineSpacing: 14,
    });
  });

  const fy = BODY_Y + ch + 0.18;
  card(s, { x: M, y: fy, w: CW, h: 1.38, fill: INK, line: null });
  s.addText(
    [
      { text: "The finding.  ", options: { bold: true, color: PAPER, fontSize: 15 } },
      {
        text:
          "Each was caused by a system that permitted a reasonable local decision to remove a barrier " +
          "permanently, and had no route by which anyone would notice. Fixing three pieces of equipment does " +
          "not fix that. Everything that follows exists to close it.",
        options: { color: "C6D6E6", fontSize: 14 },
      },
    ],
    { x: M + 0.34, y: fy, w: CW - 0.68, h: 1.38, fontFace: BODY, margin: 0, valign: "middle", lineSpacing: 22 }
  );

  techBand(s, [
    { k: "Hierarchy of controls", v: "Every corrective action ranked — eliminate and substitute before administrative" },
    { k: "PPE", v: "Appears in none of the three action tables. No respirator prevents a condenser from corroding." },
  ]);

  s.addNotes("This is the hinge of the presentation. Pause after 'and had no route by which anyone would notice.'");
}

/* ════════════════════════════════════════════════════════════════════════
   10 — DIVIDER 02
   ════════════════════════════════════════════════════════════════════════ */
sectionDivider(
  "02", "The forward look", "What could still fail",
  "Three of the five entries are the equipment that just failed. The RCA findings have to land somewhere, on somebody, on a date."
).addNotes("Seven minutes. The matrix two slides on is what they will remember.");

/* ════════════════════════════════════════════════════════════════════════
   11 — THE REGISTER
   ════════════════════════════════════════════════════════════════════════ */
const REG = [
  { ref: "RR-01", eq: "E-1103A overhead condenser", sc: "Under-deposit corrosion perforates tubes — sour hydrocarbon and H₂S at grade", ip: 5, ic: 4, rp: 2, rc: 4, own: "Inspection Engineer", rev: "Quarterly", tag: "failed" },
  { ref: "RR-02", eq: "P-1104A HGO pump", sc: "Seal failure releases 290 °C hydrocarbon above its flash point — pool fire", ip: 5, ic: 4, rp: 2, rc: 3, own: "Rotating Equipment Engineer", rev: "Monthly", tag: "failed" },
  { ref: "RR-03", eq: "H-1101 radiant tubes", sc: "Creep rupture discharges crude into the firebox with escalation potential", ip: 4, ic: 5, rp: 2, rc: 5, own: "Fired Heater Specialist", rev: "Monthly", tag: "failed" },
  { ref: "RR-04", eq: "T-1101 flash zone shell", sc: "Sulfidation wall loss — catastrophic loss of tower inventory", ip: 3, ic: 5, rp: 1, rc: 5, own: "Inspection Manager", rev: "Annual", tag: "design" },
  { ref: "RR-05", eq: "E-1108 cooling water side", sc: "Tube leak admits hydrocarbon to the cooling tower — flammable release", ip: 4, ic: 3, rp: 4, rc: 3, own: "Utilities Engineer", rev: "Monthly", tag: "weak" },
];

{
  const s = lightSlide();
  slideHead(
    s,
    "Deliverable 2  ·  Register RR-CDU-2026-02",
    "Three of these five are the equipment you just watched fail.",
    "Scored twice — once with no credit for controls, once after them. The gap between the two is what the control spend buys."
  );

  const rh = 0.82, gapY = 0.1;
  REG.forEach((r, i) => {
    const y = BODY_Y + i * (rh + gapY);
    const inh = r.ip * r.ic, res = r.rp * r.rc;
    const stalled = inh === res;

    card(s, { x: M, y, w: CW, h: rh, fill: stalled ? "FBF2F2" : MIST, line: stalled ? RED : LINE });

    s.addText(r.ref, {
      x: M + 0.2, y: y + 0.08, w: 0.9, h: 0.3,
      fontFace: BODY, fontSize: 11.5, bold: true, color: BLUE, margin: 0, valign: "middle",
    });
    s.addText(r.tag === "failed" ? "failed" : r.tag === "weak" ? "no cover" : "by design", {
      x: M + 0.2, y: y + 0.4, w: 0.95, h: 0.26,
      fontFace: BODY, fontSize: 8.5, italic: true,
      color: r.tag === "design" ? GREEN : RED, margin: 0, valign: "middle",
    });

    s.addText(r.eq, {
      x: M + 1.22, y: y + 0.08, w: 4.85, h: 0.3,
      fontFace: BODY, fontSize: 11.5, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(r.sc, {
      x: M + 1.22, y: y + 0.38, w: 4.85, h: 0.36,
      fontFace: BODY, fontSize: 9.5, color: SLATE, margin: 0, valign: "top", lineSpacing: 12,
    });

    const chip = (cx, score) => {
      s.addShape(pres.ShapeType.roundRect, {
        x: cx, y: y + 0.17, w: 1.06, h: 0.48, rectRadius: 0.05,
        fill: { color: riskColor(score) }, line: { type: "none" },
      });
      s.addText(String(score), {
        x: cx, y: y + 0.18, w: 1.06, h: 0.27,
        fontFace: BODY, fontSize: 13, bold: true, color: PAPER, align: "center", margin: 0, valign: "middle",
      });
      s.addText(riskBand(score), {
        x: cx, y: y + 0.44, w: 1.06, h: 0.18,
        fontFace: BODY, fontSize: 6.5, bold: true, color: PAPER,
        align: "center", charSpacing: 0.5, margin: 0, valign: "middle",
      });
    };
    chip(M + 6.24, inh);
    s.addShape(pres.ShapeType.rightArrow, {
      x: M + 7.44, y: y + 0.33, w: 0.28, h: 0.16,
      fill: { color: stalled ? "D8B4B4" : "9AA8B8" }, line: { type: "none" },
    });
    chip(M + 7.86, res);

    s.addText(r.own, {
      x: M + 9.16, y: y + 0.08, w: 2.75, h: 0.3,
      fontFace: BODY, fontSize: 11, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText("review: " + r.rev, {
      x: M + 9.16, y: y + 0.38, w: 2.75, h: 0.26,
      fontFace: BODY, fontSize: 9.5, color: SLATE, margin: 0, valign: "middle",
    });
  });

  const ny = BODY_Y + 5 * (rh + gapY) + 0.1;
  s.addText(
    [
      { text: "RR-05 does not move. ", options: { bold: true, color: RED } },
      {
        text:
          "Every barrier on that line is broken, overdue or not installed, so none of them earns a reduction. " +
          "A register that quietly scored it down would be lying — and the identical numbers are the strongest argument for funding it.",
        options: { color: SLATE },
      },
    ],
    { x: M, y: ny, w: CW, h: 0.5, fontFace: BODY, fontSize: 11, margin: 0, valign: "top", lineSpacing: 14 }
  );

  s.addNotes(
    "Two columns do the persuasive work. The inherent-to-residual split shows what the controls buy.\n" +
    "The owner column is the difference between a register and a wish list — a department name there is a wish list.\n" +
    "Full columns in the handout: mechanism, existing barriers, IOW, technique, action dates."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   12 — THE MATRIX  (the graphic they remember)
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Risk ranking  ·  5 × 5 matrix",
    "Four Critical entries become one High and three Medium. One does not move at all.",
    "Solid marker = inherent risk, with no credit for controls. Ringed marker = residual, after the barriers are in place and verified."
  );

  const gx = 1.66, gy = 2.02, cwc = 1.04, chh = 0.76;
  const cellX = (c) => gx + (c - 1) * cwc;
  const cellY = (p) => gy + (5 - p) * chh;
  const ctrX = (c) => cellX(c) + cwc / 2;
  const ctrY = (p) => cellY(p) + chh / 2;

  for (let p = 1; p <= 5; p++) {
    for (let c = 1; c <= 5; c++) {
      const sc = p * c;
      s.addShape(pres.ShapeType.rect, {
        x: cellX(c), y: cellY(p), w: cwc, h: chh,
        fill: { color: riskColor(sc), transparency: 82 },
        line: { color: PAPER, width: 1.5 },
      });
      // score sits in the corner so a centred marker never covers it
      s.addText(String(sc), {
        x: cellX(c) + 0.07, y: cellY(p) + 0.03, w: 0.4, h: 0.2,
        fontFace: BODY, fontSize: 8.5, color: FAINT, align: "left", margin: 0, valign: "middle",
      });
    }
  }

  for (let p = 1; p <= 5; p++) {
    s.addText("P" + p, {
      x: gx - 0.6, y: cellY(p), w: 0.48, h: chh,
      fontFace: BODY, fontSize: 11, bold: true, color: SLATE,
      align: "right", valign: "middle", margin: 0,
    });
  }
  for (let c = 1; c <= 5; c++) {
    s.addText("C" + c, {
      x: cellX(c), y: gy + 5 * chh + 0.04, w: cwc, h: 0.26,
      fontFace: BODY, fontSize: 11, bold: true, color: SLATE, align: "center", margin: 0, valign: "middle",
    });
  }
  s.addText("PROBABILITY", {
    x: gx - 1.5, y: gy + 1.3, w: 1.5, h: 1.2,
    fontFace: BODY, fontSize: 8.5, bold: true, color: "9AA8B8",
    align: "center", valign: "middle", charSpacing: 1, margin: 0, rotate: 270,
  });
  s.addText("CONSEQUENCE", {
    x: gx, y: gy + 5 * chh + 0.32, w: 5 * cwc, h: 0.26,
    fontFace: BODY, fontSize: 8.5, bold: true, color: "9AA8B8",
    align: "center", charSpacing: 1, margin: 0, valign: "middle",
  });

  /**
   * Dashed connector from (x1,y1) to (x2,y2), arrowhead on the target.
   * A pptxgenjs line always runs to the max-x corner of its bounding box (or
   * max-y when vertical), so when the target is the *other* end the arrow has
   * to be put on the start instead — otherwise diagonals point backwards.
   */
  function connect(x1, y1, x2, y2, color) {
    const dx = x2 - x1, dy = y2 - y1;
    const vertical = Math.abs(dx) < 0.01;
    const x = Math.min(x1, x2), y = Math.min(y1, y2);
    const w = Math.abs(dx) || 0.004, h = Math.abs(dy) || 0.004;
    const flipV = !vertical && dx * dy < 0;
    const targetIsEnd = vertical ? dy > 0 : dx > 0;
    s.addShape(pres.ShapeType.line, {
      x, y, w, h, flipV,
      line: {
        color, width: 1.75, dashType: "sysDash",
        ...(targetIsEnd ? { endArrowType: "triangle" } : { beginArrowType: "triangle" }),
      },
    });
  }

  // markers — offset within a cell where two entries share it
  const MK = [
    { n: "1", ip: 5, ic: 4, rp: 2, rc: 4, off: -0.22, roff: -0.22, c: BLUE },
    { n: "2", ip: 5, ic: 4, rp: 2, rc: 3, off: 0.22, roff: 0, c: AMBER },
    { n: "3", ip: 4, ic: 5, rp: 2, rc: 5, off: 0, roff: 0, c: RED },
    { n: "4", ip: 3, ic: 5, rp: 1, rc: 5, off: 0, roff: 0, c: GREEN },
    { n: "5", ip: 4, ic: 3, rp: 4, rc: 3, off: 0, roff: 0, c: PURPLE },
  ];
  const D = 0.32;

  MK.forEach((m) => {
    const stalled = m.ip === m.rp && m.ic === m.rc;
    if (stalled) return;
    connect(
      ctrX(m.ic) + m.off, ctrY(m.ip) + D / 2 + 0.02,
      ctrX(m.rc) + m.roff, ctrY(m.rp) + D / 2 + 0.04,
      m.c
    );
  });

  MK.forEach((m) => {
    const stalled = m.ip === m.rp && m.ic === m.rc;
    if (!stalled) {
      const rx = ctrX(m.rc) + m.roff - D / 2, ry = ctrY(m.rp) - D / 2;
      s.addShape(pres.ShapeType.ellipse, {
        x: rx, y: ry, w: D, h: D, fill: { color: PAPER }, line: { color: m.c, width: 2 },
      });
      s.addText(m.n, {
        x: rx, y: ry, w: D, h: D, align: "center", valign: "middle",
        fontFace: BODY, fontSize: 10, bold: true, color: m.c, margin: 0,
      });
    }
    const ix = ctrX(m.ic) + m.off - D / 2, iy = ctrY(m.ip) - D / 2;
    s.addShape(pres.ShapeType.ellipse, {
      x: ix, y: iy, w: D, h: D, fill: { color: m.c }, line: { color: PAPER, width: 1.5 },
    });
    s.addText(m.n, {
      x: ix, y: iy, w: D, h: D, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 10, bold: true, color: PAPER, margin: 0,
    });
  });

  // legend
  const lx = 7.72, lw2 = W - lx - M;
  const LG = [
    { n: "1", t: "E-1103A overhead condenser", f: "20 Critical", to: "8 Medium", c: BLUE },
    { n: "2", t: "P-1104A HGO pump", f: "20 Critical", to: "6 Medium", c: AMBER },
    { n: "3", t: "H-1101 radiant tubes", f: "20 Critical", to: "10 High", c: RED },
    { n: "4", t: "T-1101 flash zone", f: "15 Critical", to: "5 Medium", c: GREEN },
    { n: "5", t: "E-1108 cooling water side", f: "12 High", to: "12 High", c: PURPLE },
  ];
  LG.forEach((g, i) => {
    const y = BODY_Y + 0.16 + i * 0.62;
    badge(s, lx, y + 0.05, 0.34, g.n, g.c);
    s.addText(g.t, {
      x: lx + 0.46, y: y - 0.02, w: lw2 - 0.46, h: 0.26,
      fontFace: BODY, fontSize: 11, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(
      [
        { text: g.f, options: { color: SLATE } },
        { text: "   →   ", options: { color: "AEBBCA" } },
        { text: g.to, options: { bold: true, color: g.f === g.to ? RED : GREEN } },
      ],
      { x: lx + 0.46, y: y + 0.24, w: lw2 - 0.46, h: 0.26, fontFace: BODY, fontSize: 10.5, margin: 0, valign: "middle" }
    );
  });

  card(s, { x: lx, y: 5.2, w: lw2, h: 1.38, fill: MIST2, line: BLUE });
  s.addText(
    [
      { text: "Marker 3 stays High. Marker 5 does not move.\n", options: { bold: true, color: INK } },
      {
        text: "A fired heater on crude service carries irreducible consequence — the answer is continued active management, not a lower score.",
        options: { color: SLATE },
      },
    ],
    { x: lx + 0.24, y: 5.2, w: lw2 - 0.48, h: 1.38, fontFace: BODY, fontSize: 10.5, margin: 0, valign: "middle", lineSpacing: 14 }
  );

  s.addNotes(
    "This is the graphic the managers will remember. Give it time.\n" +
    "Analogy, used once: risk-based inspection is spending your security budget where the exposure actually is,\n" +
    "rather than putting one guard on every door.\n" +
    "Markers 1 and 2 share the inherent cell at P5/C4 — say so, it looks like an error otherwise."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   13 — DIVIDER 03
   ════════════════════════════════════════════════════════════════════════ */
sectionDivider(
  "03", "Authorisation", "Controlling the work the register created",
  "Eleven actions on live hydrocarbon equipment. Every one is more dangerous to perform than to leave alone, for the duration of the job."
).addNotes("Seven minutes. Resist explaining the form. Explain the architecture.");

/* ════════════════════════════════════════════════════════════════════════
   14 — PTW AS ARCHITECTURE
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Deliverable 3  ·  PTW-SYS-CDU Rev 4",
    "A permit to work is not a form. It is who may do what, where, and under what conditions.",
    "A site can have an excellent form and no system. The form is only the evidence that the architecture was applied."
  );

  s.addText("LIFECYCLE", {
    x: M, y: BODY_Y, w: 2, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
  });
  const LC = ["Plan", "Assess", "Isolate", "Test", "Issue", "Brief", "Execute", "Suspend", "Revalidate", "Handback", "Close", "Audit"];
  const lcw = (CW - 11 * 0.08) / 12;
  LC.forEach((t, i) => {
    const x = M + i * (lcw + 0.08);
    const hot = ["Isolate", "Revalidate", "Audit"].includes(t);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: BODY_Y + 0.26, w: lcw, h: 0.5, rectRadius: 0.05,
      fill: { color: hot ? BLUE : MIST }, line: { color: hot ? BLUE : LINE, width: 0.75 },
    });
    s.addText(t, {
      x, y: BODY_Y + 0.26, w: lcw, h: 0.5, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 9, bold: hot, color: hot ? PAPER : SLATE, margin: 0,
    });
  });

  const c3w = 3.85, c3g = 0.27, cy = BODY_Y + 1.02, c3h = 3.48;

  card(s, { x: M, y: cy, w: c3w, h: c3h, fill: MIST, line: LINE });
  s.addText("PERMIT TYPES", {
    x: M + 0.22, y: cy + 0.14, w: c3w - 0.44, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
  });
  [
    ["Hot Work Type A", "spark or flame"],
    ["Hot Work Type B", "hot surface, vehicle entry"],
    ["Cold Work", "mechanical, no ignition source"],
    ["Line Breaking", "any breach of an envelope"],
    ["Confined Space", "continuous monitoring"],
    ["Electrical / LOTO", "duration of isolation"],
    ["Excavation", "revalidated daily"],
    ["Working at Height", "above 1.8 m"],
    ["Radiography", "per exposure window"],
  ].forEach((t, i) => {
    s.addText(
      [
        { text: t[0], options: { bold: true, color: INK } },
        { text: "  ·  " + t[1], options: { color: SLATE } },
      ],
      {
        x: M + 0.22, y: cy + 0.44 + i * 0.33, w: c3w - 0.44, h: 0.3,
        fontFace: BODY, fontSize: 10, margin: 0, valign: "middle",
      }
    );
  });

  const rx2 = M + c3w + c3g;
  card(s, { x: rx2, y: cy, w: c3w, h: c3h, fill: MIST, line: LINE });
  s.addText("ROLES  ·  SEPARATION OF DUTIES", {
    x: rx2 + 0.22, y: cy + 0.14, w: c3w - 0.44, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
  });
  [
    ["Performing Authority", "scope, JSA, controls in the field"],
    ["Issuing Authority", "verifies isolations and gas tests"],
    ["Area Authority", "plant condition, cross-permit conflicts"],
    ["Isolating Authority", "applies and proves isolations"],
    ["Authorised Gas Tester", "all atmospheric testing"],
    ["Site Controller", "SIMOPS and emergency authority"],
  ].forEach((t, i) => {
    const y = cy + 0.46 + i * 0.4;
    s.addText(t[0], {
      x: rx2 + 0.22, y, w: c3w - 0.44, h: 0.2,
      fontFace: BODY, fontSize: 10.5, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: rx2 + 0.22, y: y + 0.18, w: c3w - 0.44, h: 0.2,
      fontFace: BODY, fontSize: 9.5, color: SLATE, margin: 0, valign: "middle",
    });
  });
  card(s, { x: rx2 + 0.22, y: cy + 2.92, w: c3w - 0.44, h: 0.46, fill: INK, line: null });
  s.addText("No one person may hold PA and IA on the same permit.", {
    x: rx2 + 0.34, y: cy + 2.92, w: c3w - 0.68, h: 0.46,
    fontFace: BODY, fontSize: 9.5, bold: true, color: PAPER, margin: 0, valign: "middle",
  });

  const tx = rx2 + c3w + c3g;
  card(s, { x: tx, y: cy, w: c3w, h: c3h, fill: MIST, line: LINE });
  s.addText("SUPPORTING CERTIFICATES", {
    x: tx + 0.22, y: cy + 0.14, w: c3w - 0.44, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
  });
  [
    ["Isolation certificate", "every point listed, locked, proved dead"],
    ["LOTO register", "a personal lock for every exposed person"],
    ["Confined space entry", "atmosphere, standby, rescue plan"],
    ["Excavation", "services located, shoring, access"],
    ["Radiography", "barriers, dose rates, timing"],
  ].forEach((t, i) => {
    const y = cy + 0.46 + i * 0.4;
    s.addText(t[0], {
      x: tx + 0.22, y, w: c3w - 0.44, h: 0.2,
      fontFace: BODY, fontSize: 10.5, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: tx + 0.22, y: y + 0.18, w: c3w - 0.44, h: 0.2,
      fontFace: BODY, fontSize: 9.5, color: SLATE, margin: 0, valign: "middle",
    });
  });
  s.addText(
    "The permit authorises the work. The certificates prove the conditions that make it safe — each signed by a different competent person.",
    {
      x: tx + 0.22, y: cy + 2.56, w: c3w - 0.44, h: 0.74,
      fontFace: BODY, fontSize: 9.5, italic: true, color: SLATE, margin: 0, valign: "top", lineSpacing: 12,
    }
  );

  s.addText("Analogy, used once: owning a key is not the same as being authorised to use it at a particular moment.", {
    x: M, y: 6.5, w: CW, h: 0.3,
    fontFace: BODY, fontSize: 10.5, italic: true, color: FAINT, margin: 0, valign: "middle",
  });

  s.addNotes(
    "The highlighted lifecycle stages — Isolate, Revalidate, Audit — are what the next slide is about.\n" +
    "The pump seal job needs three permit types at once: Cold Work, Line Breaking, Electrical Isolation."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   15 — WHERE PTW ACTUALLY FAILS
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "The three that matter",
    "Every site has a permit form. Incident histories cluster on the same three failures.",
    "A system that does not address these explicitly is a filing exercise."
  );

  const items = [
    {
      n: "01", t: "Cross-referencing and SIMOPS",
      lead: "Two permits, each individually safe, become dangerous together.",
      body: [
        "A permit map — every live permit plotted on the unit plot plan, on the board and mirrored electronically",
        "A SIMOPS matrix classifying every activity pair green, amber or red",
        "A daily coordination meeting before shift start, chaired by the Site Controller",
        "Cross-reference fields on the permit; the Area Authority signs the deconfliction",
      ],
      c: BLUE,
    },
    {
      n: "02", t: "Shift handover and validity",
      lead: "The night shift inherits an assumption instead of a verified condition.",
      body: [
        "No permit is valid beyond the shift that issued it — 12 hours maximum, regardless",
        "A permit continuing is suspended and revalidated: the oncoming IA walks the job and re-checks every isolation",
        "Outgoing and oncoming IA review the live permit register face to face at the board",
        "Any permit suspended for an ESD or gas alarm is cancelled, not revalidated. It starts again",
      ],
      c: AMBER,
    },
    {
      n: "03", t: "The audit and assurance loop",
      lead: "Does what was written on the permit match what is happening on the ground?",
      body: [
        "Level 1 — field verification by the Issuing Authority, every permit, every shift",
        "Level 2 — supervisory spot audit, 10% of live permits, weekly",
        "Level 3 — independent HSE assurance, monthly, plus annual external",
        "Leading indicators tracked monthly — and audit findings become risk register entries",
      ],
      c: GREEN,
    },
  ];

  const cw5 = 3.85, gap = 0.27, ch = 4.5;
  items.forEach((it, i) => {
    const x = M + i * (cw5 + gap);
    card(s, { x, y: BODY_Y, w: cw5, h: ch, fill: MIST, line: LINE, shadow: true });
    badge(s, x + 0.24, BODY_Y + 0.2, 0.5, it.n, it.c);
    s.addText(it.t, {
      x: x + 0.86, y: BODY_Y + 0.16, w: cw5 - 1.1, h: 0.58,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: INK, margin: 0, valign: "middle", lineSpacing: 17,
    });
    s.addText(it.lead, {
      x: x + 0.24, y: BODY_Y + 0.84, w: cw5 - 0.48, h: 0.62,
      fontFace: BODY, fontSize: 11.5, bold: true, italic: true, color: it.c,
      margin: 0, valign: "top", lineSpacing: 15,
    });
    s.addText(
      it.body.map((b, j) => ({
        text: b,
        options: { bullet: true, breakLine: j < it.body.length - 1, paraSpaceAfter: 8 },
      })),
      {
        x: x + 0.3, y: BODY_Y + 1.52, w: cw5 - 0.58, h: 2.84,
        fontFace: BODY, fontSize: 10, color: SLATE, margin: 0, lineSpacing: 13, valign: "top",
      }
    );
  });

  techBand(s, [
    {
      k: "Applied on the live permit",
      v: "A hot work permit 22 m away was suspended for the duration of the line break — red on the SIMOPS matrix, not a judgement call on the day",
    },
  ]);

  s.addNotes(
    "These three are chosen because they have the worst incident histories, not because they are hard.\n" +
    "If you only have time for one, take shift handover — everybody in the room has lived through it."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   16 — THE LIVE PERMIT
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Closing the loop  ·  PTW-CDU-2026-0473",
    "One live permit, for a job that came off the register, on the pump that failed.",
    "Cold Work, cross-referenced to Line Break LB-2026-0119 and Isolation Certificate IC-2026-0286."
  );

  const pw = 7.55;
  card(s, { x: M, y: BODY_Y, w: pw, h: 4.44, fill: PAPER, line: LINE, shadow: true });

  const px = M + 0.3, pvw = pw - 0.6;
  const row = (y, k, v, h, opts = {}) => {
    s.addText(k, {
      x: px, y, w: 1.95, h,
      fontFace: BODY, fontSize: 9.5, bold: true, color: FAINT, margin: 0, valign: "top",
    });
    s.addText(v, {
      x: px + 2.0, y, w: pvw - 2.0, h,
      fontFace: BODY, fontSize: opts.big ? 11 : 9.5, bold: !!opts.b,
      color: opts.c || INK, margin: 0, valign: "top", lineSpacing: 12.5,
    });
  };

  s.addText("PERMIT TO WORK  ·  COLD WORK", {
    x: px, y: BODY_Y + 0.14, w: 4.4, h: 0.28,
    fontFace: BODY, fontSize: 10.5, bold: true, color: BLUE, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addText("No. PTW-CDU-2026-0473", {
    x: px + 4.4, y: BODY_Y + 0.14, w: pvw - 4.4, h: 0.28,
    fontFace: BODY, fontSize: 10.5, bold: true, color: INK, align: "right", margin: 0, valign: "middle",
  });

  row(BODY_Y + 0.54, "Equipment", "P-1104A  ·  Heavy Gas Oil Pump", 0.26, { b: true, big: true });
  row(BODY_Y + 0.84, "Register ref", "RR-02 interim action, pending the TA-2027 dual seal upgrade", 0.24);
  row(BODY_Y + 1.12, "Work", "Replace seal cartridge; fit filtered flush and chamber pressure transmitter; align and recommission", 0.42);
  row(BODY_Y + 1.6, "Valid", "06:30 – 18:30, 02 July 2026  —  one shift only, 12 h maximum", 0.24, { b: true });
  row(BODY_Y + 1.88, "Isolations", "Suction and discharge DBB locked closed, bleeds to closed drain; flush line blocked; M-1104A racked out, 6 personal locks", 0.42);
  row(BODY_Y + 2.36, "Gas test", "06:05  ·  LEL 0%  ·  H₂S 0 ppm  ·  O₂ 20.9%  ·  instrument MX6-4471, cal. due 18 Sep 2026", 0.4);

  const sy = BODY_Y + 2.84;
  card(s, { x: px, y: sy, w: pvw, h: 0.8, fill: "FBF2F2", line: RED });
  s.addText("SIMOPS SCREEN", {
    x: px + 0.16, y: sy + 0.05, w: 3, h: 0.2,
    fontFace: BODY, fontSize: 8, bold: true, color: RED, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addText(
    [
      { text: "PTW-CDU-2026-0468  scaffolding, pump row B — GREEN\n", options: { color: SLATE } },
      { text: "PTW-CDU-2026-0471  hot work, pipe rack 4 (22 m) — RED, SUSPENDED", options: { bold: true, color: RED } },
    ],
    { x: px + 0.16, y: sy + 0.25, w: pvw - 0.32, h: 0.5, fontFace: BODY, fontSize: 9.5, margin: 0, valign: "top", lineSpacing: 12.5 }
  );

  s.addText("Signatures  ·  PA A. O. Joy 06:10   IA I. M. Olamide 06:25   AA D. Christopher 06:28   AGT A. G. Y. Aondoakaa 06:05", {
    x: px, y: BODY_Y + 3.7, w: pvw, h: 0.26,
    fontFace: BODY, fontSize: 8.5, color: SLATE, margin: 0, valign: "middle",
  });
  s.addText("Handback accepted 17:35  ·  permit cancelled 17:40  ·  work order closed in CMMS with failure and repair coding 17:45", {
    x: px, y: BODY_Y + 3.96, w: pvw, h: 0.4,
    fontFace: BODY, fontSize: 8.5, bold: true, color: INK, margin: 0, valign: "top", lineSpacing: 11,
  });

  const qx = M + pw + 0.32, qw = CW - pw - 0.32;
  card(s, { x: qx, y: BODY_Y, w: qw, h: 2.12, fill: MIST2, line: BLUE });
  s.addText("Two details worth pausing on", {
    x: qx + 0.24, y: BODY_Y + 0.14, w: qw - 0.48, h: 0.3,
    fontFace: HEAD, fontSize: 13.5, bold: true, color: INK, margin: 0, valign: "middle",
  });
  s.addText(
    "A hot work permit 22 metres away was suspended because the SIMOPS matrix said so — not because somebody happened to notice on the day.",
    { x: qx + 0.24, y: BODY_Y + 0.5, w: qw - 0.48, h: 1.5, fontFace: BODY, fontSize: 11.5, color: SLATE, margin: 0, valign: "top", lineSpacing: 16 }
  );

  const q2 = BODY_Y + 2.28;
  card(s, { x: qx, y: q2, w: qw, h: 2.16, fill: INK, line: null });
  s.addText("And the last line", {
    x: qx + 0.24, y: q2 + 0.14, w: qw - 0.48, h: 0.3,
    fontFace: HEAD, fontSize: 13.5, bold: true, color: PAPER, margin: 0, valign: "middle",
  });
  s.addText(
    "Closing the work order with failure and repair coding sends this job back into the reliability system — exactly the feedback RCA-02 found missing.",
    { x: qx + 0.24, y: q2 + 0.5, w: qw - 0.48, h: 1.54, fontFace: BODY, fontSize: 11.5, color: "C6D6E6", margin: 0, valign: "top", lineSpacing: 16 }
  );

  s.addNotes(
    "This slide is the handover moment from Deliverable 3 to Deliverable 4. Rehearse it.\n" +
    "The permit authorises the job. It does not perform it. What the fitter actually does is next."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   17 — DIVIDER 04
   ════════════════════════════════════════════════════════════════════════ */
sectionDivider(
  "04", "Execution", "At the hands of a fitter with a spanner",
  "The seal replacement on the pump that failed, under the permit just issued. Twelve steps, from isolation to handback."
).addNotes("Five minutes. Do not read all twelve steps — take the four that carry the risk.");

/* ════════════════════════════════════════════════════════════════════════
   18 — THE JSA
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Deliverable 4  ·  JSA-CDU-2026-0473",
    "Twelve steps. Four still carry risk after every control we have.",
    "Same pump as RCA-02, same register entry as RR-02, same permit as PTW-CDU-2026-0473."
  );

  const STEPS = ["1 Verify", "2 LOTO", "3 Isolate", "4 Drain", "5 Purge", "6 Break", "7 Seal out", "8 Clean", "9 Seal in", "10 Align", "11 Start", "12 Close"];
  const HOT = [2, 3, 7, 10];
  const sw = (CW - 11 * 0.08) / 12;
  STEPS.forEach((t, i) => {
    const x = M + i * (sw + 0.08);
    const hot = HOT.includes(i);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: BODY_Y, w: sw, h: 0.46, rectRadius: 0.05,
      fill: { color: hot ? AMBER : MIST }, line: { color: hot ? AMBER : LINE, width: 0.75 },
    });
    s.addText(t, {
      x, y: BODY_Y, w: sw, h: 0.46, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 8.5, bold: hot, color: hot ? PAPER : SLATE, margin: 0,
    });
  });
  s.addText("Amber = residual risk still Medium after all controls", {
    x: M, y: BODY_Y + 0.5, w: CW, h: 0.24,
    fontFace: BODY, fontSize: 9.5, italic: true, color: FAINT, margin: 0, valign: "middle",
  });

  const ROWS = [
    {
      n: "3", t: "Verify process isolation", who: "Isolating Authority",
      h: "16″ suction holds a standing column of hot gas oil at line pressure; a passing valve looks identical to a closed one",
      c: "Double block and bleed both sides, locked closed · bleeds cracked to closed drain and watched for 10 minutes with no flow · independent gauge at both ends, not the DCS value",
    },
    {
      n: "4", t: "Cool down and drain casing", who: "PA + Authorised Gas Tester",
      h: "Residual hydrocarbon at 290 °C — 95 °C above its flash point; H₂S liberated as it depressures",
      c: "Casing verified below 60 °C by contact pyrometer before any fitting is loosened · closed drain only · personal H₂S monitors alarming at 5 ppm · SCBA staged · approach taken upwind",
    },
    {
      n: "8", t: "Clean seal chamber and flush line", who: "Fitters + HSE Officer",
      h: "Pyrophoric iron sulfide scale — it self-ignites within seconds of drying in air, with no ignition source present",
      c: "Deposits kept wet from the moment the chamber is opened · never dry-brushed, no compressed air · scrapings straight into a sealed drum of water · extinguisher within reach and manned",
    },
    {
      n: "11", t: "Pressurise and recommission", who: "Operations + PA",
      h: "A new seal fails more often in its first hour than in the next three years, and people are standing next to it",
      c: "Staged pressurisation with everyone clear of the seal plane — nobody in line with the gland · barrier fluid pressure confirmed before the motor starts · vibration within 4 h against the 7.10 mm/s IOW",
    },
  ];

  const ry = BODY_Y + 0.84, rh = 0.9, rg = 0.1;
  ROWS.forEach((r, i) => {
    const y = ry + i * (rh + rg);
    card(s, { x: M, y, w: CW, h: rh, fill: MIST, line: LINE });
    badge(s, M + 0.2, y + 0.25, 0.4, r.n, AMBER);
    s.addText(r.t, {
      x: M + 0.72, y: y + 0.1, w: 2.4, h: 0.46,
      fontFace: BODY, fontSize: 11, bold: true, color: INK, margin: 0, valign: "top", lineSpacing: 13,
    });
    s.addText(r.who, {
      x: M + 0.72, y: y + 0.58, w: 2.4, h: 0.24,
      fontFace: BODY, fontSize: 8.5, italic: true, color: FAINT, margin: 0, valign: "middle",
    });
    s.addText("HAZARD", {
      x: M + 3.26, y: y + 0.09, w: 3.85, h: 0.17,
      fontFace: BODY, fontSize: 7, bold: true, color: RED, charSpacing: 0.8, margin: 0, valign: "middle",
    });
    s.addText(r.h, {
      x: M + 3.26, y: y + 0.26, w: 3.85, h: 0.58,
      fontFace: BODY, fontSize: 9, color: SLATE, margin: 0, valign: "top", lineSpacing: 11.5,
    });
    s.addText("CONTROLS", {
      x: M + 7.34, y: y + 0.09, w: 4.55, h: 0.17,
      fontFace: BODY, fontSize: 7, bold: true, color: GREEN, charSpacing: 0.8, margin: 0, valign: "middle",
    });
    s.addText(r.c, {
      x: M + 7.34, y: y + 0.26, w: 4.55, h: 0.58,
      fontFace: BODY, fontSize: 9, color: SLATE, margin: 0, valign: "top", lineSpacing: 11.5,
    });
  });

  s.addNotes(
    "Step 8 is the one to dwell on. Most crews have never been shown pyrophoric iron sulfide, and it needs no\n" +
    "ignition source at all. If you take one hazard out of this deck into your own plant, take that one."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   19 — THE QUALITY TEST
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "How to tell whether a JSA was actually written",
    "“Wear personal protective equipment” appears nowhere as a control on its own.",
    "An experienced supervisor reads the left column and knows the job was never walked."
  );

  const PAIRS = [
    { s: "4", g: "Hot surfaces — wear PPE", b: "Verified below 60 °C by contact pyrometer before any fitting is loosened" },
    { s: "5", g: "Purge the equipment", b: "Nitrogen asphyxiation named as a hazard, with O₂ monitoring alarming below 19.5%" },
    { s: "6", g: "Be careful of dropped objects", b: "Far-side bolts slackened first, so the joint opens away from the fitter" },
    { s: "8", g: "Clean the seal chamber", b: "Pyrophoric scale kept wet, sealed drum, no dry brushing, no compressed air" },
    { s: "10", g: "Align the pump", b: "Pipe strain checked with a dial gauge on the casing, accept below 0.05 mm" },
    { s: "11", g: "Start the pump", b: "Nobody stands in line with the gland during first pressurisation" },
  ];

  s.addText("WHAT A GENERIC JSA SAYS", {
    x: M + 0.66, y: BODY_Y, w: 4.6, h: 0.24,
    fontFace: BODY, fontSize: 8.5, bold: true, color: "9AA8B8", charSpacing: 1.2, margin: 0, valign: "middle",
  });
  s.addText("WHAT THIS ONE SAYS", {
    x: M + 6.24, y: BODY_Y, w: 5.4, h: 0.24,
    fontFace: BODY, fontSize: 8.5, bold: true, color: GREEN, charSpacing: 1.2, margin: 0, valign: "middle",
  });

  const ry = BODY_Y + 0.32, rh = 0.6, rg = 0.1;
  PAIRS.forEach((p, i) => {
    const y = ry + i * (rh + rg);
    badge(s, M, y + 0.14, 0.34, p.s, "AEBBCA");
    card(s, { x: M + 0.48, y, w: 5.2, h: rh, fill: MIST, line: LINE });
    s.addText("“" + p.g + "”", {
      x: M + 0.64, y, w: 4.9, h: rh,
      fontFace: BODY, fontSize: 11, italic: true, color: "9AA8B8", margin: 0, valign: "middle",
    });
    s.addShape(pres.ShapeType.rightArrow, {
      x: M + 5.78, y: y + 0.21, w: 0.26, h: 0.18,
      fill: { color: "AEBBCA" }, line: { type: "none" },
    });
    card(s, { x: M + 6.14, y, w: CW - 6.14, h: rh, fill: "EFF6F2", line: GREEN });
    s.addText(p.b, {
      x: M + 6.3, y, w: CW - 6.46, h: rh,
      fontFace: BODY, fontSize: 10.5, color: INK, margin: 0, valign: "middle", lineSpacing: 13,
    });
  });

  techBand(s, [
    {
      k: "Why it matters",
      v: "PPE is the last line of defence. A JSA that leans on it has run out of ideas earlier in the hierarchy than it should have.",
    },
  ]);

  s.addNotes("Fast slide, high impact. Read two of the left-hand entries aloud in a bored voice, then their pair.");
}

/* ════════════════════════════════════════════════════════════════════════
   20 — THE CHAIN, CLOSED
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = chainSlide({
    kicker: "The chain, closed",
    claim: "The job that fixes the pump also repairs the system that let it fail three times.",
    support: "Step 12 codes the work order with failure and repair data — the input to the bad-actor register that RCA-02 found missing.",
    cardH: 3.2,
  });

  card(s, { x: M, y: 5.72, w: CW, h: 1.16, fill: INK, line: null });
  s.addText(
    [
      {
        text: "RCA-02  →  RR-02  →  PTW-CDU-2026-0473  →  JSA-CDU-2026-0473  →  CMMS  →  bad-actor register  →  RCA",
        options: { bold: true, color: PAPER, fontSize: 13 },
      },
      {
        text: "\nOne pump, all the way round. The loop does not end at the repair — it ends by feeding the next analysis.",
        options: { color: "B9CBDD", fontSize: 12 },
      },
    ],
    { x: M + 0.34, y: 5.72, w: CW - 0.68, h: 1.16, fontFace: BODY, margin: 0, valign: "middle", lineSpacing: 20 }
  );

  s.addNotes("Return to the map one last time. This is the transition into the ask.");
}

/* ════════════════════════════════════════════════════════════════════════
   21 — THE ASK
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = darkSlide();

  s.addText("WHAT WE ARE ASKING FOR", {
    x: M, y: 0.6, w: CW, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: "7FA8CE", charSpacing: 2, margin: 0, valign: "middle",
  });
  s.addText("Four decisions, four owners.", {
    x: M, y: 0.92, w: CW, h: 0.68,
    fontFace: HEAD, fontSize: 33, bold: true, color: PAPER, margin: 0, valign: "middle",
  });
  s.addText(
    "Three of these cost almost nothing. The one that costs money is the one that stops an $18 million failure repeating.",
    { x: M, y: 1.62, w: CW, h: 0.32, fontFace: BODY, fontSize: 13, italic: true, color: "9FBAD4", margin: 0, valign: "middle" }
  );

  const ASK = [
    {
      n: "01", t: "Make crude slate change an MOC trigger",
      d: "With corrosion loop review as a required step. This is the control missing in RCA-01, and it is a change to a procedure, not to the plant.",
      cost: "Procedure only", eff: "Two weeks", own: "HSE & Technical Safety Manager",
    },
    {
      n: "02", t: "Open an instrument inhibit register",
      d: "Mandatory expiry, risk assessment at application, weekly management review of everything live. Eight months of silence killed a heater tube.",
      cost: "No capital", eff: "One month", own: "Instrument Engineer",
    },
    {
      n: "03", t: "Set a bad-actor threshold",
      d: "Two failures in twelve months triggers an automatic RCA, reviewed monthly. P-1104A failed three times and the system had no way to add them up.",
      cost: "No capital", eff: "One month", own: "Maintenance Manager",
    },
    {
      n: "04", t: "Fund the three actions on RR-05",
      d: "Hydrocarbon-in-cooling-water analyser, biocide dosing loop repair, overdue eddy current inspection. It is the one register entry that has not moved.",
      cost: "~$420k indicative", eff: "Q3–Q4 2026", own: "Utilities Engineer",
    },
  ];

  const aw = 2.86, ag = 0.19;
  ASK.forEach((a, i) => {
    const x = M + i * (aw + ag);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.14, w: aw, h: 3.6, rectRadius: 0.06,
      fill: { color: INK2 }, line: { type: "none" },
    });
    badge(s, x + 0.24, 2.36, 0.52, a.n, i === 3 ? AMBER : BLUE);
    s.addText(a.t, {
      x: x + 0.24, y: 3.0, w: aw - 0.48, h: 0.92,
      fontFace: HEAD, fontSize: 13, bold: true, color: PAPER, margin: 0, valign: "top", lineSpacing: 17,
    });
    s.addText(a.d, {
      x: x + 0.24, y: 3.9, w: aw - 0.48, h: 1.06,
      fontFace: BODY, fontSize: 10, color: "A9C0D6", margin: 0, valign: "top", lineSpacing: 13,
    });
    s.addText(
      [
        { text: a.cost + "  ·  " + a.eff + "\n", options: { bold: true, color: i === 3 ? "F0C078" : "8FD4B4", fontSize: 9.5 } },
        { text: a.own, options: { color: "7FA8CE", fontSize: 9.5 } },
      ],
      { x: x + 0.24, y: 5.0, w: aw - 0.48, h: 0.7, fontFace: BODY, margin: 0, valign: "top", lineSpacing: 12.5 }
    );
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.96, w: CW, h: 0.84, rectRadius: 0.06,
    fill: { color: INK2 }, line: { type: "none" },
  });
  s.addText(
    "Three failures cost $23.1 million in twelve months. Three of these four asks are procedural and cost nothing but attention.",
    {
      x: M + 0.34, y: 5.96, w: CW - 0.68, h: 0.84,
      fontFace: BODY, fontSize: 14, bold: true, color: PAPER, margin: 0, valign: "middle",
    }
  );

  s.addNotes(
    "Close on decisions, not summary. Do not re-list what you covered.\n" +
    "Say the last line and stop talking. Let them ask the first question."
  );
}

/* ════════════════════════════════════════════════════════════════════════
   22 — GLOSSARY / CLOSE
   ════════════════════════════════════════════════════════════════════════ */
{
  const s = lightSlide();
  slideHead(
    s,
    "Reference",
    "Acronyms, standards, and where the detail lives.",
    "Every acronym in this deck was defined on the slide where it first appeared. This is the safety net."
  );

  const GLO = [
    ["AGT", "Authorised Gas Tester"], ["CDU", "Crude Distillation Unit"],
    ["CMMS", "Maintenance Management System"], ["DBB", "Double Block and Bleed"],
    ["ESD", "Emergency Shutdown"], ["HGO", "Heavy Gas Oil"],
    ["IOW", "Integrity Operating Window"], ["JSA", "Job Safety Analysis"],
    ["LEL", "Lower Explosive Limit"], ["LOC", "Loss of Containment"],
    ["LOTO", "Lock Out Tag Out"], ["MOC", "Management of Change"],
    ["MTBF", "Mean Time Between Failures"], ["PTW", "Permit to Work"],
    ["RBI", "Risk-Based Inspection"], ["RCA", "Root Cause Analysis"],
    ["SIMOPS", "Simultaneous Operations"], ["TML", "Thickness Monitoring Location"],
    ["TMT", "Tube Metal Temperature"], ["ptb", "Pounds per thousand barrels"],
  ];

  const gw = 7.4;
  card(s, { x: M, y: BODY_Y, w: gw, h: 3.3, fill: MIST, line: LINE });
  s.addText("ACRONYMS", {
    x: M + 0.24, y: BODY_Y + 0.14, w: 4, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
  });
  GLO.forEach((g, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    s.addText(
      [
        { text: g[0], options: { bold: true, color: INK } },
        { text: "   " + g[1], options: { color: SLATE } },
      ],
      {
        x: M + 0.24 + col * 3.56, y: BODY_Y + 0.44 + row * 0.28, w: 3.44, h: 0.26,
        fontFace: BODY, fontSize: 9.5, margin: 0, valign: "middle",
      }
    );
  });

  const sx = M + gw + 0.32, sw2 = CW - gw - 0.32;
  card(s, { x: sx, y: BODY_Y, w: sw2, h: 3.3, fill: MIST, line: LINE });
  s.addText("STANDARDS REFERENCED", {
    x: sx + 0.24, y: BODY_Y + 0.14, w: sw2 - 0.48, h: 0.22,
    fontFace: BODY, fontSize: 8.5, bold: true, color: BLUE, charSpacing: 1.2, margin: 0, valign: "middle",
  });
  [
    ["API RP 571", "Damage mechanisms in refining"],
    ["API RP 580 / 581", "Risk-based inspection"],
    ["API RP 584", "Integrity operating windows"],
    ["API RP 573", "Inspection of fired heaters"],
    ["API 682", "Pump shaft sealing systems"],
    ["API 579-1 / ASME FFS-1", "Fitness-for-service"],
    ["ISO 10816-3", "Mechanical vibration evaluation"],
    ["ISO 45001", "OH&S management systems"],
  ].forEach((t, i) => {
    const y = BODY_Y + 0.44 + i * 0.35;
    s.addText(t[0], {
      x: sx + 0.24, y, w: sw2 - 0.48, h: 0.19,
      fontFace: BODY, fontSize: 10, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: sx + 0.24, y: y + 0.17, w: sw2 - 0.48, h: 0.19,
      fontFace: BODY, fontSize: 9, color: SLATE, margin: 0, valign: "middle",
    });
  });

  card(s, { x: M, y: 5.36, w: CW, h: 1.0, fill: INK, line: null });
  s.addText(
    [
      { text: "The handout carries the full artefacts:  ", options: { bold: true, color: PAPER } },
      {
        text:
          "three complete RCAs with barrier analysis and ranked corrective actions  ·  the full risk register with " +
          "mechanisms, barriers, IOWs and action dates  ·  the PTW system description and live permit  ·  all twelve JSA steps",
        options: { color: "B9CBDD" },
      },
    ],
    { x: M + 0.34, y: 5.36, w: CW - 0.68, h: 1.0, fontFace: BODY, fontSize: 11.5, margin: 0, valign: "middle", lineSpacing: 16 }
  );

  s.addText("Group C  (29 Members)  ·  Thank you  —  questions", {
    x: M, y: 6.54, w: CW, h: 0.4,
    fontFace: HEAD, fontSize: 16, bold: true, color: INK, align: "center", margin: 0, valign: "middle",
  });

  s.addNotes("Leave this up during questions. The glossary removes the anxiety that stops non-technical attendees from asking.");
}

// ── write ──────────────────────────────────────────────────────────────────
// pptxgenjs stores its zip entries uncompressed, which leaves the deck ~6x
// larger than it needs to be. Repack with deflate — same package, same bytes
// per part, just compressed.
function repack(file) {
  try {
    const { execFileSync } = require("child_process");
    execFileSync("python3", ["-c", `
import zipfile, os, sys
src = sys.argv[1]
tmp = src + ".tmp"
zin = zipfile.ZipFile(src)
with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zout:
    for i in zin.infolist():
        zout.writestr(i.filename, zin.read(i.filename))
zin.close()
os.replace(tmp, src)
`, file], { stdio: "ignore" });
  } catch {
    /* compression is an optimisation, not a requirement */
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
pres.writeFile({ fileName: OUT }).then(() => {
  repack(OUT);
  console.log("wrote " + OUT + " (" + Math.round(fs.statSync(OUT).size / 1024) + " KB)");
});

# From Failure to Control

**Group C (29 Members)** — Crude Distillation Unit integrity case study.

Four linked deliverables built on one plant unit and one causal chain, plus the
45-minute presentation that carries them.

> Three things failed, so we analyse why. What we learn becomes forward-looking
> risk that has to be tracked. Tracked risk generates intervention work on live
> hydrocarbon equipment, so that work has to be authorised and controlled. And
> the permit authorises a task that still has to be done safely at the hands of
> a fitter with a spanner.

Backward look → forward look → authorisation → execution.

## Presenting

**Deck:** `dist/CDU-Integrity-Group-C.pptx` — 22 slides, speaker notes on every
slide. Suggested timing: 5 min framing · 18 min the three failures · 7 min
register · 7 min permit system · 5 min JSA · 3 min close.

### Before you present — add the logo

Slide 1 renders a marked slot where the Dangote logo goes. This environment's
network policy blocked every image host, so the file could not be fetched here.
Either:

- drop the official file at `assets/dangote-logo.png` and run
  `node deck/build-deck.js` again — it is picked up automatically and nothing
  else on the slide moves; or
- paste the logo over the slot directly in PowerPoint.

The slot is 2.5″ × 1.05″ at the top-left, sized for the standard horizontal
lockup.

## Documents

| File | Deliverable |
|---|---|
| `docs/00-basis-and-scope.md` | Reference unit, standards, acronyms, status of the data |
| `docs/01-root-cause-analysis.md` | Three RCAs on one seven-section template |
| `docs/02-risk-register.md` | Five entries, inherent vs residual, 5×5 matrix |
| `docs/03-permit-to-work.md` | PTW control architecture and one live permit |
| `docs/04-job-safety-analysis.md` | Twelve-step JSA for the seal replacement |
| `docs/05-consistency-check.md` | Cross-artefact verification, run before presenting |

Print `docs/` as the handout. The deck deliberately carries less detail than the
documents — the full barrier analyses, IOWs, action dates and all twelve JSA
steps live there.

## Status of the data

The unit, tags, dates, dimensions, costs and findings are a **constructed
teaching case** — internally consistent and technically representative, but not
a record of any actual incident at any operating facility. Every damage
mechanism, standard and control referenced is real. See
`docs/00-basis-and-scope.md`.

## Rebuilding the deck

```bash
npm install pptxgenjs
node deck/build-deck.js
```

Optional checks:

```bash
python <pptx-skill>/scripts/office/validate.py dist/CDU-Integrity-Group-C.pptx
markitdown dist/CDU-Integrity-Group-C.pptx      # text dump
```

All content, geometry and colour live in `deck/build-deck.js`. Risk band labels
are derived from the scores by one function, so a label cannot drift from its
number.

---

# Second assignment — GHG inventory and GRI 11 ESG KPIs

Two questions, each answered as a standalone brief with its own 5-slide deck.
Built on the same reference refinery as the CDU case study above, viewed whole
rather than unit by unit.

| Deliverable | File |
|---|---|
| Q1 brief — GHG inventory (11pp) | `dist/GHG-Inventory-Refinery.pdf` |
| Q1 deck — 5 slides | `dist/GHG-Inventory-Slides.pptx` / `.pdf` |
| Q2 brief — GRI 11 ESG KPIs (13pp) | `dist/GRI-11-ESG-KPIs-Refinery.pdf` |
| Q2 deck — 5 slides | `dist/GRI-11-ESG-KPIs-Slides.pptx` / `.pdf` |
| Consistency record | `esg/CONSISTENCY.md` |

Nigeria-first framing: the Climate Change Act 2021 s.24 reporting duty, NMDPRA,
NESREA, NOSDRA, NGX, the FRC's adoption of IFRS S1/S2, NEITI and the Nigerian
Content Act, with GHG Protocol, API, IPIECA and GRI as the supporting layer.

**The headline of Q1:** Scope 1 and 2 together are 8.8% of the refinery's
footprint. Category 11 — customers burning the fuel — is 87%.

## Rebuilding

```bash
npm install pptxgenjs sharp
node esg/build-pdfs.js                            # HTML -> A4 PDF via headless Chromium
node esg/build-decks.js                           # both decks
node esg/check-pages.js esg/content/<file>.html   # page-fit check, in millimetres
```

Documents are authored as HTML in `esg/content/` against `esg/theme.css`. Each
page is a fixed-height A4 section, so pagination is composed rather than
reflowed and no table ever splits across a page break. The trade-off is that
overlong content is clipped rather than pushed, which is what `check-pages.js`
exists to catch.

Palette throughout is four colours only — navy `#0B2545`, light blue `#4C86C6`,
black `#101418`, white — with tints of navy and light blue for fills.

---

# Third assignment — 6-month performance review

A personal probation review for the Maintenance Engineer role at NAVGAS
Limited (M&R), February – August 2026. Rebuilt from a supplied `.pptx` that
carried the right content in a broken layout.

| Deliverable | File |
|---|---|
| Deck — 13 slides, speaker notes on every slide | `dist/NAVGAS-6-Month-Performance-Review.pptx` |
| Print / share copy | `dist/NAVGAS-6-Month-Performance-Review.pdf` |
| Generator | `review/build-review-deck.js` |

Structure: title · executive summary · role baseline · four focus areas
(CMMS/Ultimo, stores, documentation, maintenance support) · safety, contractors
and procurement · evidence · challenges · competency movement · next 6–12
months · close. Suggested timing for a 20-minute slot: 2 min framing · 3 min
summary and baseline · 8 min the four focus areas · 2 min safety and
procurement · 2 min evidence · 3 min challenges, competencies and the plan.

## What changed from the supplied file

The content was sound; the file was not. Four defects made most of it
unreadable as rendered:

- **Lists were off the slide.** Each bullet was its own auto-sized shape with a
  y offset stepped in the wrong unit, so items 2..n landed between 9″ and 39″
  down a 7.5″ slide. Only the first item of every list was visible — five of
  thirteen slides lost most of their content this way. Lists are now one text
  box with real bullet runs.
- **Section labels were zero-width.** Every `RECORDS MAINTAINED`-style eyebrow
  had `w=0`, rendering as a vertical column of single letters through the
  content beside it. Widths are now explicit.
- **Aptos Display throughout.** No metric-compatible substitute, and missing
  from older Office installs. Now Cambria headings over Calibri body, matching
  the CDU deck.
- **Slide 12's title overflowed** into its own subtitle.

Beyond the repairs:

- **Two-layer heads.** Titles state a claim (“Spares can now be found, counted
  and replaced on record”) over the line that qualifies it, rather than naming
  a topic.
- **Every figure carries its source.** Each metric tile names the record behind
  it, and content slides close on an evidence band rather than a decorative
  footer.
- **Internal notes moved off the slide face.** The supplied file printed
  “replace minimum estimates with the exact Ultimo Excel export before
  presenting” on slides 4 and 9 — visible to the reviewer. Those are now
  speaker notes.
- **Speaker notes on all 13 slides**, carrying the argument, the qualifiers to
  state out loud, and what to have ready for questions.

## Before presenting

Two numbers are stated as defensible minimums rather than exact counts. Pull
the Ultimo Excel export and replace them in `review/build-review-deck.js`
(slides 4 and 9): work orders per week and PTWs per week. Also confirm the
store item count against the latest monthly inventory report.

## Rebuilding

```bash
npm install pptxgenjs
node review/build-review-deck.js
```

Optional checks:

```bash
python <pptx-skill>/scripts/office/validate.py dist/NAVGAS-6-Month-Performance-Review.pptx
markitdown dist/NAVGAS-6-Month-Performance-Review.pptx
```

Palette is the review's own NAVGAS identity — navy `#0B1F33`, teal `#147D7E`,
blue `#1F4E79`, amber `#C9942E`, green `#2F7D4B` — carried over from the
supplied file so the deck still looks like the author's, with tints of each for
fills.

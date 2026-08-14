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

# Consistency Check

Run across all four artefacts and the slide deck before presenting. A single
internal contradiction spotted by an engineer in the room costs you the
credibility of the whole set, so this is checked mechanically rather than by eye.

Re-run after any edit:

```bash
node deck/build-deck.js
markitdown dist/CDU-Integrity-Group-C.pptx > /tmp/deck.md
# then compare the values below across docs/*.md and /tmp/deck.md
```

## Arithmetic

| Check | Working | Result |
|---|---|---|
| Total direct cost | 4.2 + 0.9 + 18.0 | **23.1** ✓ matches the opening stat |
| Total downtime | 6 days + 18 hours + 21 days | 27 d 18 h → **28 days** ✓ |
| RR-01 inherent | P5 × C4 | 20 → Critical (15–25) ✓ |
| RR-01 residual | P2 × C4 | 8 → Medium (5–9) ✓ |
| RR-02 inherent | P5 × C4 | 20 → Critical ✓ |
| RR-02 residual | P2 × C3 | 6 → Medium ✓ |
| RR-03 inherent | P4 × C5 | 20 → Critical ✓ |
| RR-03 residual | P2 × C5 | 10 → High (10–14) ✓ |
| RR-04 inherent | P3 × C5 | 15 → Critical ✓ |
| RR-04 residual | P1 × C5 | 5 → Medium ✓ |
| RR-05 inherent | P4 × C3 | 12 → High ✓ |
| RR-05 residual | P4 × C3 | 12 → High ✓ no movement, as stated |

Band boundaries used throughout: Low 1–4 · Medium 5–9 · High 10–14 ·
Critical 15–25. Every band label in the deck was generated from the score by
the same function, so a label cannot drift from its number.

## Dates

| Event | Date | Appears in |
|---|---|---|
| RCA-01 overhead condenser failure | 14 November 2025 | RCA, deck slide 6 |
| RCA-02 pump seal failure | 3 March 2026 | RCA, register, deck slide 7 |
| RCA-03 heater tube rupture | 22 May 2026 | RCA, register, deck slide 8 |
| Assessment period ends | 30 June 2026 | Basis, register, deck slide 3 |
| Permit and JSA executed | 2 July 2026 | PTW, JSA, deck slide 16 |

The permit date falls after the register issue date, which is what makes it an
execution of a register action rather than a coincidence. Worth stating aloud.

## Equipment tags

Every tag is used consistently and appears in every artefact that should
reference it.

| Tag | RCA | Register | PTW | JSA | Deck |
|---|---|---|---|---|---|
| E-1103A overhead condenser | ✓ | RR-01 | — | — | ✓ |
| P-1104A HGO pump | ✓ | RR-02 | ✓ | ✓ | ✓ |
| M-1104A motor | — | — | ✓ | ✓ | ✓ |
| H-1101 charge heater | ✓ | RR-03 | — | — | ✓ |
| T-1101 crude tower | — | RR-04 | — | — | ✓ |
| E-1108 preheat exchanger | — | RR-05 | — | — | ✓ |

P-1104B appears only in JSA step 1, as the running twin that makes
misidentification a credible fatality. That is deliberate, not a stray tag.

## Document references

| Reference | Meaning |
|---|---|
| RR-CDU-2026-02 | The register |
| PTW-SYS-CDU Rev 4 | The permit system description |
| PTW-CDU-2026-0473 | The live cold work permit |
| PTW-CDU-2026-0468 / 0471 | The two permits screened for SIMOPS conflict |
| LB-2026-0119 | Line break permit, cross-referenced |
| IC-2026-0286 | Isolation certificate |
| JSA-CDU-2026-0473 | The job safety analysis, numbered to match its permit |

The JSA carries the same serial as its permit. That is the visible link between
Deliverables 3 and 4 and is worth pointing at on the slide.

## Technical values verified identical in docs and deck

Wall thickness 9.53 / 4.80 / 2.10 mm · corrosion rate 0.12 → 1.80 mm/yr ·
chloride 41 ptb against 20 ptb · boot water pH 4.1 against 5.5–6.5 ·
vibration 11.4 mm/s against the 7.10 mm/s ISO 10816-3 alarm · MTBF 6 against
36 months · release 2.1 m³ at 290 °C, flash point 195 °C · H₂S 28 ppm ·
TMT 620 °C design, 760 °C peak · coke 6 mm · bulge 6.2% on A335 P9 ·
alignment tolerance 0.05 mm · gas tester instrument MX6-4471.

## Named roles

The four presenters appear as the four permit signatories on PTW-CDU-2026-0473
— Performing Authority, Issuing Authority, Area Authority, Authorised Gas
Tester. Note that this is a presentational device on the specimen permit, not a
claim about anyone's actual site authorisations. Say so if asked.

## Deck build checks

- `validate.py` — schema, relationships, content types, chart and slide checks: **passing**
- Placeholder scan for lorem / TODO / insert / undefined: **clean**
- All 22 slides rendered and visually inspected for overflow, overlap, margin
  and contrast: **passing**

## Rehearse the four handovers

The strength of this set lives in the seams, not the sections. Rehearse these
transitions specifically:

1. **RCA → register** (slide 9 → 11) — "fixing three pieces of equipment does not fix that"
2. **Register → permit** (slide 12 → 14) — eleven actions on live hydrocarbon equipment
3. **Permit → JSA** (slide 16 → 18) — "the permit authorises the job; it does not perform it"
4. **JSA → the ask** (slide 20 → 21) — step 12 feeds the bad-actor register

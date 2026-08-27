# Consistency record — Question 1 and Question 2

Everything below is checked mechanically, not by eye. Reproduce with:

```bash
node esg/build-pdfs.js                              # both briefs
node esg/build-decks.js                             # both decks
node esg/check-pages.js esg/content/<file>.html     # page fit, in millimetres
python3 esg/reconcile.py                            # full reconciliation
```

`reconcile.py` exits non-zero on any failure, so it can gate a rebuild.

## What it checks

1. **Arithmetic** of the worked inventory, recomputed from first principles.
2. **Every percentage in the shipped PDF**, re-derived from the stated total —
   parsed back out of the rendered file, not read from the source.
3. **Folio numbering** against the actual PDF page count.
4. **Cover contents** against the real section headings.
5. **Acronym coverage** — every acronym used must either be in that document's
   own glossary or be expanded beside its first use. The check confirms the
   surrounding words genuinely spell the acronym, so a bare `(CEMS)` with no
   expansion does not pass.
6. **Shared values** — every figure and GRI code that appears in both a brief
   and its deck must match.
7. **Stale values** corrected during QA, to stop them reappearing.
8. **Placeholder scan** across all four artefacts.

The acronym check is itself sanity-tested: deleting a glossary row makes it
fail, so a pass means something.

## Arithmetic

| Check | Working | Result |
|---|---|---|
| Scope 1 components | 0.96 + 0.32 + 0.14 + 0.064 + 0.048 + 0.064 | 1.596 → **1.60 Mt** |
| Scope 3 components | 16.7 + 0.52 + 0.14 + 0.11 + 0.03 | **17.5 Mt** |
| Total footprint | 1.60 + 0.08 + 17.5 | 19.18 → **19.2 Mt** |
| Scope 1 share | 1.60 ÷ 19.2 | **8.3%** |
| Scope 1 + 2 share | 1.68 ÷ 19.2 | **8.8%** |
| Category 11 share | 16.7 ÷ 19.2 | **87.0%** |
| Scope 3 share | 17.5 ÷ 19.2 | **91.1%** |
| Other Scope 3 share | 0.80 ÷ 19.2 | **4.2%** |
| Crude throughput | 120,000 bpsd × 350 d ÷ 7.33 bbl/t | 42 M bbl → **5.7 Mt** |
| GHG intensity | 1.60 Mt ÷ 5.7 Mt crude | **0.28 tCO₂e/t** |
| Barrel intensity | 1.60 Mt ÷ 42 M bbl | **38 kgCO₂e/bbl** |
| Category 11 | 5.4 Mt product × 3.1 tCO₂/t | **16.7 Mt** |
| Scope 2 | 180 GWh × 0.44 t/MWh | **0.08 Mt** |

### On rounding

Each percentage is calculated on the 19.2 Mt total, so every row is
independently verifiable. Two subtotals therefore differ from the sum of their
components by 0.1 percentage points — Scope 1 + 2 (8.8% against components
summing to 8.7%) and Scope 3 (91.1% against 91.2%). This is stated in the table
caption rather than hidden by adjusting a component.

One row is a genuine tie: 0.048 ÷ 19.2 is exactly 0.25%. It is rounded **up**
to 0.3%, which is both standard commercial rounding and the only value that
makes the Scope 1 column sum to the stated 8.3%.

## Corrections made

**First pass**
- Nine pages were silently clipping content at the page edge, including a whole
  callout box. Found by `check-pages.js`, not by looking.
- Several slide grids ran past the right margin because card widths were
  hardcoded. Grid widths are now derived from the content width.
- Barrel intensity stated as 40; it is 38.
- Scope 3 share stated as 91.2%; on the published total it is 91.1%.
- Residual Scope 3 segment stated as 4.3%; it is 4.2%.

**Second pass**
- The table caption claimed the figures were "internally consistent" without
  qualifying the rounding residuals above. It now states the basis.
- `EPA` and `IOGP` were used in the GHG brief but missing from its glossary.
- `CDP`, `IFRS`, `IPIECA`, `GJ` and `TJ` were used without expansion; each is
  now expanded at its first use. CDP and IPIECA are given as "formerly …",
  which is what those acronyms actually stand for.
- `CFC-11e`, `EII`, `GJ`, `GWP`, `CO₂e`, `GHG`, `IOGP`, `OH&S` and `RP` were
  used in the GRI brief but absent from its reference page.
- The reference page's two-column layout forced every standard onto three
  lines and overflowed; it is now full-width.
- Slide 4 of each deck was missing the footer its neighbouring slides carried.

## Verified, no change needed

- Folios run 2…11 and 2…13, sequential, matching the 11- and 13-page PDFs.
- Cover contents match the section numbering in both briefs.
- Two pages of the GRI brief sit 0.2 mm and 0.4 mm past the text margin. Both
  were rendered at 150 dpi and confirmed to clear the folio rule with white
  space; nothing is clipped.
- The reference refinery agrees with the CDU integrity case study — the crude
  distillation unit *is* the refinery's crude capacity, so 120,000 bpsd holds
  for both.
- Deck speaker notes carry no figure that contradicts its slide.

## Legibility

All ten slides were rendered and inspected, then downscaled to 640 px wide to
simulate a small screen at a distance. Slide body text is 14 pt or larger,
titles 34–50 pt.

## Sourcing

The official GRI 11 PDF is blocked by this environment's network egress policy.
The 22 topics and the sub-numbering convention were corroborated across several
independent sources. The KPI map is built on **GRI Topic Standard codes**, which
are stable and unambiguous; page 13 of the brief tells the reader to confirm the
granular 11.x.y cross-references against the official PDF before building a
content index.

# Consistency record — Question 1 and Question 2

Run before presenting. Reproduce with:

```bash
node esg/build-pdfs.js                              # both briefs
node esg/build-decks.js                             # both decks
node esg/check-pages.js esg/content/<file>.html     # page-fit check
```

## Arithmetic (all figures reconcile)

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
| Crude throughput | 120,000 bpsd × 350 days ÷ 7.33 bbl/t | 42 M bbl → **5.7 Mt** |
| GHG intensity | 1.60 Mt ÷ 5.7 Mt crude | **0.28 tCO₂e/t** |
| GHG intensity | 1.60 Mt ÷ 42 M bbl | **38 kgCO₂e/bbl** |
| Category 11 | 5.4 Mt product × 3.1 tCO₂/t | **16.7 Mt** |
| Scope 2 | 180 GWh × 0.44 t/MWh | **0.08 Mt** |

Three errors were found and corrected by this check: the barrel intensity was
stated as 40 rather than 38; the Scope 3 share as 91.2% rather than 91.1%; and
the residual Scope 3 segment as 4.3% rather than 4.2%.

## Cross-artefact verification

Every figure above, and every GRI disclosure code (305-1, 305-4, 302-3, 305-7,
303-3, 306-3, 403-9, 204-1, 205-3, 207-4), was confirmed to appear identically
in both the brief and its deck. Placeholder scan across all four artefacts:
clean.

## Page fit

Both briefs are laid out as fixed-height A4 sections rather than reflowed text,
so pagination is deliberate and no table splits across a page. `check-pages.js`
measures every page in the browser and reports overflow in millimetres — the
first pass had nine pages silently clipping content at the page edge, which a
visual skim would not reliably have caught.

Two pages in the GRI brief sit flush to the bottom margin (0.2 mm and 0.4 mm
past it). Both were confirmed visually to clear the folio; nothing is clipped.

## Legibility

Every slide was rendered and inspected, then downscaled to 640 px wide to
simulate a small screen at a distance. Headlines, figures, bar segments and
topic chips all remain readable at that size. Body text on the slides is 14 pt
or larger, titles 34–50 pt.

## A note on sourcing

The official GRI 11 PDF is blocked by this environment's network egress policy.
The 22 topics and the sub-numbering convention were corroborated across several
independent sources. The KPI map is therefore built on **GRI Topic Standard
codes**, which are stable and unambiguous; page 13 of the brief tells the reader
to confirm the granular 11.x.y cross-references against the official PDF before
building a content index.

# Deliverable 2 — CDU Risk Register

**Register reference:** RR-CDU-2026-02 · **Issued:** 30 June 2026 ·
**Custodian:** CDU Unit Manager

Three of the five entries are the equipment that failed in Deliverable 1. That
is deliberate — it is how RCA findings stop being a report and become something
somebody is accountable for on a date.

The other two are there for contrast: RR-04 is high consequence and well
controlled, RR-05 is moderate consequence and poorly controlled. Between them
they teach risk ranking better than any definition does.

---

## Scoring basis

**Probability (P)**

| Score | Descriptor | Basis |
|---|---|---|
| 5 | Almost certain | Has occurred on this unit within 12 months |
| 4 | Likely | Has occurred at this site, or mechanism is active and unmonitored |
| 3 | Possible | Credible within the asset life |
| 2 | Unlikely | Mechanism controlled and monitored |
| 1 | Rare | Mechanism eliminated by design or materials |

**Consequence (C)** — highest applicable across safety, environment and business

| Score | Safety | Business |
|---|---|---|
| 5 | Potential fatality | > USD 10 M |
| 4 | Major injury or acute exposure | USD 1 – 10 M |
| 3 | Lost time injury | USD 100 k – 1 M |
| 2 | Medical treatment | USD 10 – 100 k |
| 1 | First aid | < USD 10 k |

**Risk = P × C**

| Band | Score | Required response |
|---|---|---|
| Critical | 15 – 25 | Unit Manager owns; action plan with dates; monthly review |
| High | 10 – 14 | Superintendent owns; action plan required; monthly review |
| Medium | 5 – 9 | Engineer owns; managed through routine programmes; quarterly review |
| Low | 1 – 4 | Managed by existing controls; annual review |

**Inherent risk** is the risk with no credit for controls. **Residual risk** is
the risk after the barriers listed are in place and verified working. The
distance between the two columns is exactly what the control spend is buying.

---

## The register

### RR-01 — E-1103A CDU overhead condenser *(failed 14 Nov 2025 — see RCA-01)*

| Field | Entry |
|---|---|
| **Failure scenario** | Under-deposit corrosion perforates condenser tubes and overhead line, releasing sour hydrocarbon and H₂S at grade |
| **Damage mechanism** | Ammonium chloride salt corrosion → HCl corrosion (API RP 571) |
| **Inherent P × C** | 5 × 4 = **20 Critical** |
| **Existing barriers** | Chloride cap 20 ptb in blend spec · continuous water wash ≥ 5% with low-flow alarm · titanium top bundle · daily overhead chemistry with IOW limits · TMLs relocated to salt deposition zone · online corrosion probes |
| **Residual P × C** | 2 × 4 = **8 Medium** |
| **IOW / key parameter** | Desalted crude chloride ≤ 20 ptb · boot water pH 5.5 – 6.5 · Fe ≤ 3 ppm · wash water ≥ 5% of overhead vapour |
| **Action** | Titanium retube of top bundle at TA-2027; quarterly UT at relocated TMLs; corrosion probes commissioned Q3 2026 |
| **Owner** | Inspection Engineer (with Process Engineering Manager for the IOW) |
| **Review** | Quarterly |

### RR-02 — P-1104A heavy gas oil pump *(failed 3 Mar 2026 — see RCA-02)*

| Field | Entry |
|---|---|
| **Failure scenario** | Mechanical seal fails, releasing 290 °C hydrocarbon above its flash point; pool fire potential with personnel in the area |
| **Damage mechanism** | Seal face thermal shock from loss of flush; coke fouling of flush circuit |
| **Inherent P × C** | 5 × 4 = **20 Critical** |
| **Existing barriers** | API 682 Arrangement 2 dual seal with Plan 53B barrier fluid · seal chamber pressure transmitter alarmed · filtered flush with ΔP alarm · permanent vibration monitoring · gas detection and area ESD · bad actor RCA trigger at 2 failures / 12 months |
| **Residual P × C** | 2 × 3 = **6 Medium** |
| **IOW / key parameter** | Barrier fluid pressure ≥ pumped pressure + 1.7 bar · vibration ≤ 7.10 mm/s RMS · flush filter ΔP ≤ 0.5 bar |
| **Action** | Dual seal upgrade at TA-2027 (long lead item ordered). **Interim to upgrade:** flush filter fitted, weekly vibration route, seal pot on daily round with numeric limits |
| **Owner** | Rotating Equipment Engineer |
| **Review** | Monthly until the upgrade is installed, then quarterly |

*Note the consequence score also drops on this entry, 4 → 3. The dual seal does
not only make failure less likely; it changes what a failure releases.*

### RR-03 — H-1101 crude charge heater radiant tubes *(failed 22 May 2026 — see RCA-03)*

| Field | Entry |
|---|---|
| **Failure scenario** | Radiant tube ruptures from creep damage, discharging crude into the firebox with fire and potential escalation |
| **Damage mechanism** | Creep / stress rupture from localised overheating with internal coking (API RP 571) |
| **Inherent P × C** | 4 × 5 = **20 Critical** |
| **Existing barriers** | Redundant TMT thermocouples with rate-of-change alarms · inhibit register with expiry and weekly review · pass flow balancing repaired with deviation alarms · quarterly IR thermography · IOW-triggered decoking · heater trip and emergency depressuring |
| **Residual P × C** | 2 × 5 = **10 High** |
| **IOW / key parameter** | TMT standard limit 620 °C, critical 650 °C · pass flow deviation ≤ 5% from mean · firebox O₂ 2 – 4% |
| **Action** | API 579-1 remaining-life assessment on all Pass 3 radiant tubes complete by Q4 2026; replace 6 tubes at TA-2027; restore quarterly IR survey from Q3 2026 |
| **Owner** | Fired Heater Specialist (with Maintenance Manager for tube replacement) |
| **Review** | Monthly |

*This one stays in the High band after every control we have. That is the honest
answer, not a failure of the register. A fired heater on crude service carries
irreducible consequence, and the response is continued active management — not
a lower score.*

### RR-04 — T-1101 crude tower shell, flash zone *(no failure history)*

| Field | Entry |
|---|---|
| **Failure scenario** | Shell wall loss in the flash zone leads to catastrophic loss of containment of hot hydrocarbon inventory |
| **Damage mechanism** | Sulfidation / high-temperature H₂S corrosion (API RP 571) |
| **Inherent P × C** | 3 × 5 = **15 Critical** |
| **Existing barriers** | 316L clad flash zone selected at design · RBI programme per API RP 580/581 · sulfur cap in crude blending spec · on-stream UT at defined TMLs · corrosion probes on the transfer line |
| **Residual P × C** | 1 × 5 = **5 Medium** |
| **IOW / key parameter** | Crude sulfur ≤ 0.9 wt% · flash zone temperature ≤ 400 °C |
| **Action** | Continue RBI-driven inspection; next internal at TA-2027 |
| **Owner** | Inspection Manager |
| **Review** | Annual, RBI-driven |

*The highest-consequence item on the register and the lowest residual risk. It
got that way because the controls were designed in at the start rather than
retrofitted after a failure — which is the cheapest form of integrity
management there is.*

### RR-05 — E-1108 crude preheat exchanger, cooling water side *(no failure history)*

| Field | Entry |
|---|---|
| **Failure scenario** | Tube leak admits hydrocarbon to the cooling water circuit and on to the cooling tower, creating a flammable release at an unclassified area with public visibility |
| **Damage mechanism** | Under-deposit corrosion and microbiologically influenced corrosion, cooling water side (API RP 571) |
| **Inherent P × C** | 4 × 3 = **12 High** |
| **Existing barriers** | Periodic biocide dosing — **dosing control loop unreliable, manual dosing since Jan 2026** · visual cooling tower observation on daily rounds · scheduled eddy current inspection — **overdue by 14 months** |
| **Residual P × C** | 4 × 3 = **12 High** |
| **IOW / key parameter** | Cooling water residual chlorine 0.2 – 0.5 ppm · ORP 250 – 400 mV · hydrocarbon in cooling water — **not currently measured** |
| **Action** | Install online hydrocarbon-in-cooling-water analyser (Q4 2026) · repair biocide dosing control loop (Q3 2026) · eddy current inspection at the next available window |
| **Owner** | Utilities Engineer |
| **Review** | Monthly until residual risk moves |

*The inherent and residual scores are identical. Every barrier on this line is
either broken, overdue or not installed, so none of them earns a reduction. A
register that quietly scored this one down would be lying, and the identical
numbers are the clearest argument for funding the three actions listed.*

---

## Risk matrix — movement from inherent to residual

Consequence across, probability down. Arrows show where each entry moves once
the listed barriers are in place and verified.

```
              C1        C2        C3        C4        C5
        ┌─────────┬─────────┬─────────┬─────────┬─────────┐
   P5   │    5    │   10    │   15    │  20 ①②  │   25    │
        │   Med   │  High   │  Crit   │  CRIT   │  Crit   │
        ├─────────┼─────────┼─────────┼─────────┼─────────┤
   P4   │    4    │    8    │  12 ⑤   │   16    │  20 ③   │
        │   Low   │   Med   │  HIGH   │  Crit   │  CRIT   │
        ├─────────┼─────────┼─────────┼─────────┼─────────┤
   P3   │    3    │    6    │    9    │   12    │  15 ④   │
        │   Low   │   Med   │   Med   │  High   │  CRIT   │
        ├─────────┼─────────┼─────────┼─────────┼─────────┤
   P2   │    2    │    4    │   6 ②'  │   8 ①'  │  10 ③'  │
        │   Low   │   Low   │   MED   │   MED   │  HIGH   │
        ├─────────┼─────────┼─────────┼─────────┼─────────┤
   P1   │    1    │    2    │    3    │    4    │   5 ④'  │
        │   Low   │   Low   │   Low   │   Low   │   MED   │
        └─────────┴─────────┴─────────┴─────────┴─────────┘

   ① → ①'   RR-01 Overhead condenser     20 Critical → 8  Medium
   ② → ②'   RR-02 HGO pump seal          20 Critical → 6  Medium
   ③ → ③'   RR-03 Heater radiant tubes   20 Critical → 10 High
   ④ → ④'   RR-04 Crude tower flash zone 15 Critical → 5  Medium
   ⑤ → ⑤    RR-05 E-1108 cooling water   12 High     → 12 High  (no movement)
```

## Summary

| Ref | Equipment | Inherent | Residual | Movement | Owner |
|---|---|---|---|---|---|
| RR-01 | E-1103A overhead condenser | 20 Critical | 8 Medium | ▼ 12 | Inspection Engineer |
| RR-02 | P-1104A HGO pump | 20 Critical | 6 Medium | ▼ 14 | Rotating Equipment Engineer |
| RR-03 | H-1101 radiant tubes | 20 Critical | 10 High | ▼ 10 | Fired Heater Specialist |
| RR-04 | T-1101 flash zone | 15 Critical | 5 Medium | ▼ 10 | Inspection Manager |
| RR-05 | E-1108 cooling water side | 12 High | 12 High | — 0 | Utilities Engineer |

**Four Critical entries reduced to one High and three Medium. One High entry
that has not moved at all.**

Every row has a name in it. A register with a department in the owner column is
a wish list; a register with a person in it is a commitment. And every action in
the right-hand column that touches live hydrocarbon equipment now needs to be
authorised and controlled — which is Deliverable 3.

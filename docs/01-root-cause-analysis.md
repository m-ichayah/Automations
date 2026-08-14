# Deliverable 1 — Root Cause Analysis

Three failures on one Crude Distillation Unit, twelve months, one template.

The template is deliberately repetitive. By the third failure the structure
should be predictable, so attention moves from the format to the content.

| Section | What goes in it |
|---|---|
| A | Event and consequence |
| B | Evidence preserved |
| C | Physical root — what the metal did |
| D | Human root — what people did or did not do |
| E | Latent / system root — what the organisation allowed |
| F | Barrier analysis — what should have stopped it |
| G | Corrective actions, ranked against the hierarchy of controls |

**Combined twelve-month loss across the three events: USD 23.1 million,
28 days of lost production, three high-potential near misses, zero injuries.**

The zero is not a result. Two of these three could have killed somebody and did
not, for reasons that were not under our control.

---

## RCA-01 — Overhead condenser corrosion failure

**Equipment:** E-1103A CDU overhead condenser, top bundle, and adjacent
12"-P-1102 overhead vapour line
**Date:** 14 November 2025
**Classification:** Loss of primary containment — sour hydrocarbon and sour water

### A. Event and consequence

A through-wall leak developed in the upper tube rows of E-1103A and at the
downstream elbow of the overhead line. Sour hydrocarbon vapour and sour water
released at grade level. Unit tripped on low tower top pressure. H₂S detected at
28 ppm at the release point; the area was evacuated before anyone entered the
cloud.

| | |
|---|---|
| Downtime | 6 days |
| Direct cost | USD 4.2 million (lost margin + bundle replacement) |
| Harm | High-potential near miss — H₂S release, no exposure |
| Environment | 11 m³ sour water to secondary containment, fully recovered |

### B. Evidence preserved

- Failed tube sections cut and bagged before cleaning, orientation marked
- Deposit sampled dry from the tube inlet before any water washing
- Overhead accumulator boot water: pH, chloride, iron — 18 months of records
- Desalter performance log and crude receipt assays, 24 months
- DCS trend export: tower top temperature, wash water flow, overhead pressure
- Last three inspection reports for the overhead loop, with TML location drawings

### C. Physical root

Deposit analysis returned ammonium chloride (NH₄Cl). Wall loss was localised,
under deposit, and concentrated where the vapour first approaches the water dew
point — not distributed as general thinning.

**Mechanism (API RP 571):** Ammonium chloride salt corrosion, progressing to
hydrochloric acid corrosion once free water condensed.

NH₄Cl salts deposit above the water dew point and are strongly hygroscopic. They
pull moisture out of the vapour, form a small volume of highly concentrated
acidic brine against the tube wall, and attack it aggressively while the bulk
process stream still looks dry and benign.

| Measurement | Value |
|---|---|
| Nominal wall thickness | 9.53 mm |
| Retirement limit | 4.80 mm |
| Measured at failure | 2.10 mm |
| Historic corrosion rate | 0.12 mm/yr |
| Corrosion rate, final 9 months | 1.80 mm/yr — a 15× step change |
| Boot water pH at failure | 4.1 (target band 5.5 – 6.5) |
| Desalted crude chloride | 41 ptb (design basis ≤ 20 ptb) |

### D. Human root

- The crude slate moved to a higher-chloride opportunity blend in February 2025.
  Desalter wash water rate was not increased to match.
- Overhead chemistry sampling dropped from daily to weekly during a five-month
  vacancy in the process chemistry role. Nobody reinstated it.
- Overhead water wash was run intermittently and treated as a discretionary
  measure rather than a defined control with a rate and an alarm.
- The pH trend crossed the lower limit repeatedly from May 2025 onward. It was
  visible on the trend and it was not escalated.

### E. Latent / system root

**No Management of Change was raised for the crude slate change.**

Crude blending was classified as a routine operating adjustment, not a change.
Because no MOC existed, the corrosion loop review that an MOC would have
triggered never happened — so nobody re-derived the chloride load on the
overhead, nobody revisited the wash water basis, and nobody revised the
inspection plan.

Compounding this: the thickness monitoring locations on the overhead line sat on
the bottom of the horizontal run, where they would catch erosion and water
drop-out. The damage mechanism that was actually operating deposits at the top
of the bundle and at the first cold elbow. **We were inspecting the wrong part
of the line, diligently, for years.**

### F. Barrier analysis

| Barrier | Status |
|---|---|
| Crude blend chloride specification | Absent — no chloride cap in the blending spec |
| MOC review on feedstock change | Absent — change not recognised as a change |
| Desalter performance | Degraded — brine carryover, no action limit |
| Overhead water wash | Degraded — intermittent, no flow alarm |
| Overhead chemistry monitoring (IOW) | Weakened — frequency cut, limits not enforced |
| Inspection / TML coverage | Ineffective — wrong locations for the mechanism |
| Gas detection and unit trip | **Worked** — release detected, unit tripped, area cleared |

Six barriers upstream of the release were absent, degraded or pointed the wrong
way. The only one that worked was the last one.

### G. Corrective actions

| Rank | Control | Action | Owner |
|---|---|---|---|
| 1 Eliminate | — | Cap chloride in the crude blending specification at 20 ptb desalted; reject blends that cannot meet it | Planning & Optimisation Manager |
| 2 Substitute | Materials | Replace E-1103A top bundle tubes with titanium in the salt deposition zone | Projects Engineer |
| 3 Engineering | Process | Continuous overhead water wash at ≥ 5% of overhead vapour rate, with low-flow alarm and trip interlock | Process Engineering Manager |
| 4 Administrative | MOC | Feedstock and crude slate changes made a mandatory MOC trigger, with corrosion loop review as a required step | HSE & Technical Safety Manager |
| 5 Administrative | IOW | Reinstate daily overhead pH / chloride / iron with defined action limits per API RP 584 | Process Chemist |
| 6 Detection | Inspection | Relocate 14 TMLs to the salt deposition zone; add online corrosion probes at the tower top and condenser inlet | Inspection Engineer |

PPE does not appear in this table. There is no personal protective equipment
that prevents a condenser from corroding.

---

## RCA-02 — Heavy gas oil pump mechanical seal failure

**Equipment:** P-1104A, CDU heavy gas oil pump, API 610 OH2, 290 °C
**Date:** 3 March 2026
**Classification:** Loss of primary containment — hot hydrocarbon above flash point

### A. Event and consequence

The mechanical seal on P-1104A failed catastrophically. Approximately 2.1 m³ of
heavy gas oil at 290 °C released to the pump plinth and formed a pool. Gas
detection alarmed, the pump tripped, and the area ESD was initiated. **The
release did not ignite.**

| | |
|---|---|
| Downtime | 18 hours, unit rate reduction |
| Direct cost | USD 0.9 million |
| Harm | High-potential near miss — pool fire potential, no ignition |
| Note | Two contractors were working 30 m away under a separate permit |

The absence of ignition is the single most important fact in this report and it
was not the result of any barrier we designed.

### B. Evidence preserved

- Failed seal cartridge removed intact, faces retained, not cleaned
- Seal flush line and orifice plate removed and sectioned
- Vibration history, 24 months, from route-based collection
- Work order history for P-1104A, 36 months, with failure coding
- Operator round sheets and DCS alarm log for the 72 hours preceding
- Photographs of the seal chamber before any cleaning

### C. Physical root

The stationary carbon seal face was cracked radially with heat checking on the
mating face — the signature of dry running, not of wear.

The Plan 11 flush line was found **blocked with coke fines** at the orifice
plate. With no flush, the seal chamber lost both its cooling and its pressure
margin, the faces ran dry, local temperature spiked, and the carbon face failed
by thermal shock. Once the faces separated, containment was gone in seconds.

Elevated vibration had been present for months and accelerated the sequence.

| Measurement | Value |
|---|---|
| Seal arrangement | API 682 Category 2, Arrangement 1 (single seal) |
| Flush plan | Plan 11 (discharge recirculation to seal chamber) |
| Flush orifice condition | Blocked, coke fines |
| Vibration at failure | 11.4 mm/s RMS |
| ISO 10816-3 alarm threshold | 7.10 mm/s RMS |
| Seal failures, preceding 18 months | 3 |
| Achieved MTBF | 6 months |
| Site reliability target | 36 months |

### D. Human root

- Three seal failures in 18 months were each closed as a maintenance job.
  Like-for-like replacement, no investigation, no question asked about why.
- The vibration alarm was acknowledged and reset on multiple occasions without a
  corresponding work order.
- The operator round sheet carried a "seal pot level" observation with no action
  limit attached, so an observation could be recorded and nothing followed.
- The seal flush plan was never re-evaluated after the unit feed rate uprate in
  2024, which changed the duty on this pump.

### E. Latent / system root

**There was no defect elimination process and no bad-actor threshold.**

Nothing in the maintenance system said "three failures in eighteen months is
abnormal and triggers an investigation." Because no threshold existed, the
repeat failures were invisible as a pattern — each one was a small, well-handled
job, and the sum of them was a pump that was telling us for a year and a half
that it was going to release hot hydrocarbon.

The organisation was efficient at fixing this pump and had no mechanism at all
for asking why it kept needing fixing.

### F. Barrier analysis

| Barrier | Status |
|---|---|
| Seal flush (Plan 11) | Failed — blocked, no monitoring to reveal it |
| Secondary containment (dual seal) | Absent — single seal on 290 °C service |
| Vibration monitoring and response | Degraded — data collected, alarms not actioned |
| Bad actor / defect elimination trigger | Absent |
| Seal chamber condition monitoring | Absent — no pressure or flow indication to DCS |
| Gas detection | **Worked** |
| Pump trip and area ESD | **Worked** |
| Ignition source control | Not tested — no ignition source was present, by luck |

### G. Corrective actions

| Rank | Control | Action | Owner |
|---|---|---|---|
| 1 Substitute | Materials | Upgrade to API 682 Arrangement 2 dual seal with Plan 53B pressurised barrier fluid — a seal failure then leaks barrier fluid, not gas oil | Rotating Equipment Engineer |
| 2 Engineering | Process | Replace Plan 11 with a filtered flush; install seal chamber pressure transmitter and flush filter ΔP, both alarmed to DCS | Rotating Equipment Engineer |
| 3 Engineering | Monitoring | Permanent online vibration monitoring on all hot hydrocarbon pumps, alarms routed to the control room | Reliability Engineer |
| 4 Administrative | Reliability | Bad actor register with an automatic RCA trigger at two failures in twelve months, reviewed monthly | Maintenance Manager |
| 5 Administrative | Operations | Vibration alarm response procedure — acknowledgement requires a documented action, not just a reset | Operations Superintendent |
| 6 Detection | Rounds | Seal pot level and pressure given numeric action limits on the round sheet | Operations Superintendent |

---

## RCA-03 — Fired heater radiant tube rupture

**Equipment:** H-1101 CDU crude charge heater, Pass 3 radiant coil, A335 P9 (9Cr-1Mo)
**Date:** 22 May 2026
**Classification:** Tube rupture with firebox fire

### A. Event and consequence

A radiant tube in Pass 3 bulged and ruptured longitudinally — a classic
fish-mouth opening. Crude at pressure discharged into the firebox and ignited.
The heater was tripped and emergency depressuring initiated. Firebox refractory,
convection section and the adjacent tubes in Pass 3 sustained damage.

| | |
|---|---|
| Downtime | 21 days |
| Direct cost | USD 18.0 million (repair + lost margin) |
| Harm | High-potential near miss — no personnel in the heater area at the time |
| Escalation | Contained to the firebox; no external fire |

### B. Evidence preserved

- Ruptured tube section removed whole, with bulge and fracture faces intact
- Metallurgical samples for creep void assessment and microstructural analysis
- Internal coke deposit sampled and thickness measured before tube cutting
- DCS historian: all pass flows, pass outlet temperatures, TMT points, 24 months
- Instrument inhibit log and maintenance notification history
- Burner inspection records and last infrared thermography survey report
- Photographs of burner tip condition before any cleaning

### C. Physical root

The tube bulged before it opened, which tells you the failure was time-dependent
at temperature rather than an instantaneous overpressure. Metallography returned
creep voids at grain boundaries and carbide spheroidisation consistent with
prolonged service well above design metal temperature.

**Mechanism (API RP 571):** Creep and stress rupture, initiated and sustained by
localised overheating, with internal coke deposition as the driver.

The sequence is self-reinforcing and that is what makes it dangerous. A partially
plugged burner tip distorted the flame and impinged it on the tube. Local heat
flux rose. Coke laid down on the inside wall. Coke is an insulator, so heat that
used to reach the process instead stayed in the tube wall. Metal temperature
climbed, which laid down coke faster. Each turn of the loop made the next turn
worse.

| Measurement | Value |
|---|---|
| Tube material | ASTM A335 P9 (9Cr-1Mo) |
| Design tube metal temperature | 620 °C |
| Estimated peak TMT at failure | 760 °C |
| Internal coke layer | 6 mm |
| Tube diameter increase at bulge | 6.2% (creep damage indicated above 3%) |
| Pass 3 flow vs. mean pass flow | 18% low |
| Pass 3 TMT thermocouple | Failed and inhibited in DCS, 8 months |

### D. Human root

- The Pass 3 tube skin thermocouple failed in September 2025. It was inhibited in
  the DCS to stop nuisance alarms. The inhibit was never reviewed or removed.
- Pass flow imbalance was visible on the panel and had been normalised — shift
  teams had adjusted around it for so long that it read as how the heater ran.
- Burner inspection was deferred across three consecutive planned windows.
- Infrared thermography of the firebox was stretched from quarterly to annual as
  a cost measure, with no risk assessment attached to the change.

### E. Latent / system root

**Instrument inhibits could be applied indefinitely with no register, no expiry
and no risk assessment.**

A safety-relevant measurement was switched off by a reasonable person solving a
reasonable problem — nuisance alarms — and the organisation provided no
mechanism that would ever ask for it back. For eight months the single
instrument that would have shown this tube heating up was silent by
authorisation.

Alongside it: H-1101 had no defined Integrity Operating Window. There was no
TMT limit written down anywhere as a limit, so there was no number for anyone to
be in breach of, and decoking was scheduled by calendar rather than by condition.

### F. Barrier analysis

| Barrier | Status |
|---|---|
| Tube metal temperature monitoring | Defeated — inhibited, no register, no expiry |
| Integrity Operating Window for the heater | Absent — no TMT limit defined |
| Pass flow balancing control | Degraded — imbalance normalised |
| Burner maintenance programme | Degraded — deferred three windows |
| Infrared thermography survey | Weakened — interval stretched without assessment |
| Condition-based decoking | Absent — calendar-based only |
| Heater trip and emergency depressuring | **Worked** — limited escalation to the firebox |
| Firebox as containment | **Worked** |

### G. Corrective actions

| Rank | Control | Action | Owner |
|---|---|---|---|
| 1 Engineering | Instrumentation | Redundant tube skin thermocouples on all passes, with rate-of-change alarms; no single point of failure on TMT | Instrument Engineer |
| 2 Engineering | Process | Repair pass flow balancing control and set a low-flow deviation alarm per pass | Process Engineering Manager |
| 3 Administrative | Instrumentation | Inhibit register with mandatory expiry date, risk assessment at application and weekly management review of all live inhibits | HSE & Technical Safety Manager |
| 4 Administrative | IOW | Define and publish H-1101 IOWs — standard TMT limit 620 °C, critical 650 °C, per API RP 584; decoking triggered by IOW breach, not by calendar | Process Engineering Manager |
| 5 Detection | Inspection | Restore quarterly infrared thermography; API 579-1 remaining-life assessment on all Pass 3 radiant tubes | Inspection Engineer |
| 6 Administrative | Maintenance | Burner tip inspection at fixed intervals, deferral requires documented risk assessment | Maintenance Manager |

---

## What the three have in common

Each failure had a competent engineering explanation and an uncomfortable
organisational one underneath it.

| | RCA-01 Overhead | RCA-02 Pump seal | RCA-03 Heater tube |
|---|---|---|---|
| **Physical root** | NH₄Cl under-deposit corrosion | Dry-running seal faces | Creep from localised overheating |
| **Latent root** | Crude slate change without MOC | No bad-actor threshold | Instrument inhibit without expiry |
| **What it looks like** | Inspecting the wrong location | Fixing without asking why | A measurement switched off |

None of these three was caused by someone being careless on the day. Each was
caused by a system that permitted a reasonable local decision to remove a
barrier permanently, and had no route by which anyone would notice.

That is the finding. Everything in Deliverables 2, 3 and 4 exists to close that
gap: the register makes degraded barriers visible and owned, the permit system
controls the work that restores them, and the JSA gets that work done without
creating the next incident.

# Deliverable 3 — Permit to Work System

**System reference:** PTW-SYS-CDU-Rev 4 · **Applies to:** all work on or near
live process equipment on the CDU

A permit to work is not a form. It is a control architecture that decides who
may do what, where, when, and under what conditions — and the form is only the
evidence that the architecture was applied. A site can have an excellent form
and no system. What follows is the system; the form appears at the end as proof
it works.

**Why this sits here in the chain:** the risk register generated eleven
intervention actions on live hydrocarbon equipment. Every one of them is more
dangerous to perform than to leave alone, for the duration of the job. The
permit system is how that work is authorised without creating the next RCA.

---

## 1. Permit types

| Type | Applies to | Validity | Gas test |
|---|---|---|---|
| **Hot Work — Type A** | Spark or naked flame: welding, grinding, cutting, radiography | One shift, max 12 h | Before issue and every 2 h |
| **Hot Work — Type B** | Hot surfaces, IC engines, vehicle entry to classified areas | One shift, max 12 h | Before issue and every 4 h |
| **Cold Work** | Mechanical work with no ignition source: seal changes, valve work, scaffolding | One shift, max 12 h | Before issue |
| **Line Breaking** | Any breach of a hydrocarbon, steam, chemical or utility envelope | Per breach | Before issue and after each break |
| **Confined Space Entry** | Vessels, tanks, pits, excavations > 1.2 m | One shift, continuous monitoring | Continuous |
| **Electrical Isolation / LOTO** | Any de-energisation for work | Duration of isolation | N/A |
| **Excavation** | Ground disturbance > 300 mm | Duration, revalidated daily | Before issue if near hydrocarbon |
| **Working at Height** | Work above 1.8 m without fixed protection | One shift | N/A |
| **Radiography** | Industrial radiographic inspection | Per exposure window | N/A |

A single job usually needs several. **The seal replacement in Deliverable 4
requires Cold Work + Line Breaking + Electrical Isolation, cross-referenced to a
single job pack.**

## 2. Roles

Separation of duties is the point. The person who wants the work done is never
the person who authorises it.

| Role | Held by | Accountable for |
|---|---|---|
| **Applicant / Performing Authority (PA)** | Supervisor of the work party | Scope accuracy, JSA quality, controls applied in the field, crew briefing, handback |
| **Issuing Authority (IA)** | Shift Team Leader | Hazard assessment, verifying isolations and gas tests **in the field**, issuing, suspending, cancelling |
| **Area Authority (AA)** | Unit Operations Supervisor | Plant condition, cross-permit conflicts in the area, final acceptance of handback |
| **Isolating Authority** | Authorised operator or electrician | Applying and proving isolations, isolation certificate, LOTO |
| **Authorised Gas Tester (AGT)** | Certified and revalidated 2-yearly | All atmospheric testing and the recorded results |
| **Site Controller** | Shift Manager | SIMOPS decisions, permit suspension across the site, emergency authority |

**Rule:** no one person may hold PA and IA on the same permit. Where a
contractor supplies the PA, the IA is always the operator.

## 3. Lifecycle

```
  PLAN            Scope defined · job pack assembled · JSA drafted (Deliverable 4)
    ↓
  ASSESS          IA reviews hazards · conflicting permits checked · SIMOPS screen
    ↓
  ISOLATE         Isolation certificate raised · DBB applied · LOTO · proved dead
    ↓
  TEST            AGT tests atmosphere · results recorded with instrument serial
    ↓
  ISSUE           IA and AA sign · PA countersigns · permit displayed at worksite
    ↓
  BRIEF           Toolbox talk against the JSA · every worker signs on
    ↓
  EXECUTE         Work proceeds · IA field verification · periodic re-testing
    ↓
  SUSPEND         Shift end · alarm · ESD · scope change · adverse weather
    ↓
  REVALIDATE      Physical re-check of isolations · re-test · new signatures
    ↓
  COMPLETE        Work finished · site cleared · guards refitted · tools tallied
    ↓
  HANDBACK        PA declares complete · AA accepts · de-isolation authorised
    ↓
  CLOSE           Permit cancelled · records retained · work order coded
    ↓
  AUDIT           Field verification · spot audit · monthly assurance review
```

## 4. Supporting certificates

The permit authorises the work. The certificates prove the specific conditions
that make it safe, and each one is signed by a different competent person.

| Certificate | Signed by | Proves |
|---|---|---|
| **Isolation certificate** | Isolating Authority | Every isolation point listed, applied, locked, tagged, proved dead |
| **LOTO register** | Each worker | Personal lock applied by every person exposed; work cannot start until the last lock is off |
| **Confined space entry certificate** | AGT + IA | Atmosphere tested, ventilation, standby person, rescue plan, entry log |
| **Excavation certificate** | Civil Engineer + AA | Underground services located, shoring, edge protection, access |
| **Radiography certificate** | Radiation Protection Supervisor | Barriered area, dose rates, timing agreed with the Site Controller |

## 5. Where permit systems actually fail

Every site has a permit form. Incident histories cluster on three things, and a
system that does not address them explicitly is a filing exercise.

### 5.1 Cross-referencing and SIMOPS

Two permits, each individually safe, become dangerous together. Hot work
authorised 20 m from a line break; radiography during a confined space entry;
crane lifts over a live permit.

**Controls:**
- A permit map — every live permit plotted on a unit plot plan, physically on
  the permit board and mirrored in the electronic system. The AA cannot issue
  into an area without seeing what is already there.
- A **SIMOPS matrix** classifying every pair of activity types as green
  (compatible), amber (compatible with stated additional controls and a named
  coordinator) or red (mutually exclusive — one must stop).
- A daily permit coordination meeting before shift start, chaired by the Site
  Controller, at which every permit for the coming shift is read out against
  the map.
- Cross-reference fields on the permit itself: each permit lists the permit
  numbers it has been deconflicted against, and the AA signs that check.

*Relevance to Deliverable 4: the pump seal job is a Line Break releasing
hydrocarbon vapour. Any Hot Work permit within 15 m is an automatic red on the
SIMOPS matrix.*

### 5.2 Shift handover and permit validity

Permits that survive a shift change without a proper re-check are a recurring
root cause in real incidents. The night shift inherits an assumption instead of
a verified condition.

**Controls:**
- **No permit is valid beyond the shift in which it was issued.** Maximum 12
  hours regardless.
- A permit continuing into the next shift is **suspended**, not carried over,
  and must be **revalidated** — which means the oncoming IA physically walks the
  job, re-checks every isolation against the isolation certificate, and orders a
  fresh gas test for any hot work or line break. Revalidation is a new
  signature, not a tick.
- The outgoing and oncoming IA review the full live permit register together,
  face to face, at the permit board. **Verbal handover of a permit without the
  register in front of both parties is prohibited.**
- Permit status is a standing item on the shift handover log, and the log is
  signed by both parties.
- Any permit suspended for an ESD, gas alarm or plant upset is cancelled, not
  revalidated. It starts again.

### 5.3 The audit and assurance loop

The final question is whether what was written on the permit is what is
happening on the ground. Without this, the system measures paperwork.

**Three levels:**

| Level | Who | Frequency | What |
|---|---|---|---|
| **1 — Field verification** | Issuing Authority | Every permit, at least once per shift | Is the work as described, are the stated controls actually in place? |
| **2 — Supervisory spot audit** | Operations Superintendent | 10% of live permits, weekly | Quality of the JSA, correctness of isolations, gas test records |
| **3 — Independent assurance** | HSE Manager | Monthly, plus annual external | System-level: trends, role competence, SIMOPS decisions, closure quality |

**Leading indicators tracked monthly** — permits with a complete and job-specific
JSA attached (%), gas tests recorded with instrument serial and calibration date
(%), permits revalidated correctly at shift change (%), permits cancelled for
scope change rather than amended in the field (count), Level 1 verifications
completed against permits issued (%).

**The loop closes back to Deliverable 2.** A degraded permit control is a
degraded barrier, and a degraded barrier is a risk register entry. Audit
findings feed the register; they do not sit in a separate report.

---

## 6. Live permit — the job from the register

This is RR-02's interim action being executed on the pump from RCA-02, under the
JSA in Deliverable 4. The chain closes here.

```
════════════════════════════════════════════════════════════════════════════
  PERMIT TO WORK                                    No. PTW-CDU-2026-0473
  Type: COLD WORK  ·  cross-referenced: LINE BREAK LB-2026-0119
                                        ISOLATION IC-2026-0286
════════════════════════════════════════════════════════════════════════════
  Unit / Area        CDU · Pump row B, grade level
  Equipment tag      P-1104A — Heavy Gas Oil Pump
  Register ref       RR-02 (interim action pending TA-2027 dual seal upgrade)

  Work description   Replace failed mechanical seal cartridge; fit filtered
                     flush line and seal chamber pressure transmitter; laser
                     align and recommission.

  Valid from         06:30  02 July 2026      Valid to  18:30  02 July 2026
                     ── one shift only, 12 h maximum ──

  ── HAZARDS IDENTIFIED ──────────────────────────────────────────────────
  Residual hydrocarbon at 290 °C · H₂S in vapour space · stored pressure ·
  stored electrical energy · pyrophoric iron sulfide scale · dropped objects ·
  hot surfaces · pinch points during alignment

  ── ISOLATIONS (see IC-2026-0286) ───────────────────────────────────────
  Suction  16"-HGO-1104 ....... DBB, locked closed, bleed open to closed drain
  Discharge 12"-HGO-1105 ...... DBB, locked closed, bleed open to closed drain
  Flush line 1"-FL-1104 ....... single block, locked closed
  Electrical M-1104A .......... breaker racked out, fuses withdrawn,
                                absence of voltage proved, 6 personal locks
  Drain routing ............... closed drain system only — open sewer prohibited

  ── GAS TEST ────────────────────────────────────────────────────────────
  Instrument  MX6-4471   Calibration due 18 Sep 2026
  06:05   LEL 0%    H₂S 0 ppm    O₂ 20.9%     AGT: A. G. Y. Aondoakaa
  Retest required after each containment break and after any suspension.

  ── SIMOPS SCREEN ───────────────────────────────────────────────────────
  Live permits within 30 m checked against the permit map:
    PTW-CDU-2026-0468  Scaffolding, pump row B ............ GREEN
    PTW-CDU-2026-0471  Hot work, pipe rack 4 (22 m) ....... RED — SUSPENDED
                       for the duration of the line break, per SIMOPS matrix.
                       Re-issue only after AA confirms containment restored.
  Deconfliction accepted:   D. Christopher, Area Authority

  ── CONTROLS REQUIRED ───────────────────────────────────────────────────
  JSA-CDU-2026-0473 attached and briefed · personal H₂S monitors, alarm 5 ppm ·
  SCBA on standby at the worksite · fire extinguisher and drip trays in place ·
  15 m barricade with signage · deposits kept wet, sealed drum for pyrophoric
  scale · wind sock observed before each break

  ── SIGNATURES ──────────────────────────────────────────────────────────
  Applicant / Performing Authority ..... A. O. Joy            06:10  02 Jul
  Issuing Authority .................... I. M. Olamide        06:25  02 Jul
  Area Authority ....................... D. Christopher       06:28  02 Jul
  Authorised Gas Tester ................ A. G. Y. Aondoakaa   06:05  02 Jul

  Toolbox talk delivered — 6 workers signed on ............... 06:40  02 Jul
  Level 1 field verification by IA ........................... 09:15  02 Jul

  ── COMPLETION AND HANDBACK ─────────────────────────────────────────────
  Work complete, site cleared, guard refitted, tools tallied
                          PA ... A. O. Joy                     17:20  02 Jul
  Handback accepted, de-isolation authorised
                          AA ... D. Christopher                17:35  02 Jul
  Permit cancelled        IA ... I. M. Olamide                 17:40  02 Jul
  Work order coded in CMMS with failure and repair data ...... 17:45  02 Jul
════════════════════════════════════════════════════════════════════════════
```

Two details on this permit are worth pausing over. **A hot work permit 22 metres
away was suspended** because the SIMOPS matrix said so, not because anyone
noticed on the day. And the last line sends the repair data back into the
reliability system — which is the feedback that RCA-02 found missing.

The permit authorises the job. It does not perform it. What the fitter with a
spanner actually does, step by step, is Deliverable 4.

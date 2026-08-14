# Deliverable 4 — Job Safety Analysis

**JSA reference:** JSA-CDU-2026-0473 · **Attached to:** PTW-CDU-2026-0473
**Task:** Replace mechanical seal cartridge, P-1104A heavy gas oil pump
**Register ref:** RR-02 interim action · **Origin:** RCA-02

This is the pump that failed in Deliverable 1, carrying the register entry from
Deliverable 2, under the permit issued in Deliverable 3. Same equipment the
whole way down.

**Crew:** 1 Performing Authority, 2 Fitters, 1 Rotating Equipment Technician,
1 Authorised Electrician, 1 HSE Officer (intermittent)
**Duration:** 10 hours estimated

Residual risk is scored after the listed controls, on the same 5×5 basis as the
risk register.

---

| # | Step | Hazard | Consequence | Controls | Residual | Responsible |
|---|---|---|---|---|---|---|
| **1** | Pre-job verification: confirm permit, walk the isolations, barricade, toolbox talk | Work started on the wrong pump; the running twin P-1104B is 1.4 m away and identical | Breaking into live 290 °C hydrocarbon — fatality | Positive tag identification against the P&ID, spoken aloud by PA and IA together at the equipment · joint field verification of every point on IC-2026-0286 · P-1104B physically marked with "LIVE — DO NOT TOUCH" tags · 15 m barricade, single controlled access point | **Low** | PA + IA |
| **2** | Electrical de-energisation and LOTO of motor M-1104A | Stored electrical energy; unexpected start-up on remote command from the control room | Electrocution or entanglement — fatality | Breaker racked out and fuses withdrawn · absence of voltage proved with a tester checked live-dead-live · DCS start permissive removed by panel operator and confirmed by radio · personal lock applied by **every one of the six** workers into a group lock box · attempted start with breaker out as a try-out test | **Low** | Authorised Electrician + PA |
| **3** | Verify process isolation; confirm zero energy at suction and discharge | Valve passing; 16" suction holds a standing column of hot gas oil at line pressure | Hot oil release under pressure — severe burns, flash fire | Double block and bleed both sides, locked closed · bleeds cracked to closed drain and observed for **10 minutes with no flow** before acceptance · independent gauge reading zero at both ends, not the DCS value · isolation certificate signed by the Isolating Authority who applied it | **Medium** | Isolating Authority |
| **4** | Cool down and drain pump casing to closed drain | Residual hydrocarbon at 290 °C — well above the 195 °C flash point; H₂S liberated as it depressures; hot casing surfaces | Severe burns; H₂S exposure (IDLH 100 ppm); flash fire | Natural cool-down, no water quench · casing surface verified **below 60 °C by contact pyrometer** before any fitting is loosened · drain to closed drain system only, open sewer prohibited on this permit · personal H₂S monitors on every worker, alarm 5 ppm, evacuate 10 ppm · SCBA staged at the barricade · wind sock checked and approach taken upwind | **Medium** | PA + AGT |
| **5** | Nitrogen purge and gas test the casing | Residual flammable vapour; **nitrogen asphyxiation** — the purge gas is the hazard people forget | Flash fire; asphyxiation with no warning symptoms | Purge routed to flare, not to atmosphere at grade · gas test to < 5% LEL and H₂S < 5 ppm by AGT, instrument serial and calibration date recorded on the permit · nitrogen hazard signage at the barricade · O₂ monitoring alongside LEL, alarm below 19.5% · **no head-into-casing at any point — this job is not a confined space entry and will not be allowed to become one** | **Low** | AGT |
| **6** | Break containment: remove coupling guard and spacer | Dropped object — the coupling spacer is 14 kg at chest height; residual liquid springs from the first flange broken; pinch points | Foot or hand injury; hot oil to face and eyes | Line-breaking procedure applied: **far-side bolts slackened first so the joint opens away from the fitter** · drip tray and splash guard in position before the first bolt moves · face shield over chemical goggles, heat-resistant gauntlets · spacer taken by two-person lift, tools lanyarded · exclusion zone below maintained by the barricade | **Low** | Fitters + PA |
| **7** | Remove seal gland plate and withdraw the seal cartridge | Spring-loaded stored energy in the seal cartridge; sharp edges on the fractured carbon face; awkward posture in a confined working position | Hand laceration; strain injury; face injury from a released spring | Setting clips fitted **before** the gland studs are slackened · studs relieved evenly in a diagonal sequence, quarter-turn at a time · cut-resistant gloves for handling the fractured face · fractured face bagged as RCA evidence, not discarded · manual handling assessment, staging platform used rather than reaching | **Low** | Fitters |
| **8** | Inspect and clean shaft sleeve, seal chamber and flush line; record findings | **Pyrophoric iron sulfide scale** in the seal chamber and flush line — it can self-ignite in seconds once dry in air; solvent vapour during cleaning | Spontaneous ignition with the casing open; respiratory and skin exposure to solvent | Deposits **kept wet from the moment the chamber is opened** and never dry-brushed · scrapings transferred straight into a sealed drum of water and removed from the worksite · no compressed air blow-down · SDS reviewed and briefed for the cleaning solvent before it comes to site · half-face respirator with organic vapour cartridge · forced ventilation at the working position · fire extinguisher within reach and manned | **Medium** | Fitters + HSE Officer |
| **9** | Fit new cartridge seal, gland plate and filtered flush line; set to OEM dimension | Incorrect installation dimension; contamination of the faces during fitting; pinch points as the gland is drawn up | Premature seal failure — the same loss of containment again, in weeks | OEM installation procedure and torque values at the job, not from memory · faces kept in the packaging until the moment of fitting, no bare-hand contact with the lapped surfaces · setting clips removed and **visually verified removed** by a second person · **QA hold point signed by the Rotating Equipment Technician before the gland is closed** · seal serial number recorded in CMMS against the tag | **Low** | Fitters + Rotating Equipment Technician |
| **10** | Recouple and laser-align pump to motor; check pipe strain; refit guard | Pinch points at the coupling; rotating equipment exposed while the guard is off; pipe strain locked into the casing | Crushed fingers; repeat seal failure from misalignment — the defect we came to eliminate | Laser alignment to offset ≤ 0.05 mm and angular ≤ 0.05 mm/100 mm, printout retained · **pipe strain checked with a dial gauge on the casing while flange bolts are slackened, accept < 0.05 mm movement** · shaft turned by hand only, never by jogging the motor · LOTO remains fully applied throughout · **guard refitted and physically verified before any rotation is attempted** | **Low** | Fitters + PA |
| **11** | Remove LOTO, de-isolate, pressurise and recommission | First pressurisation with people present; seal running in; hot surfaces returning; a new seal is at its highest risk of failure in the first hour | Loss of containment during commissioning; burns; spray injury | De-isolation only after AA accepts handback · all locks removed from the box in the reverse order they went on · **staged pressurisation with all personnel clear of the seal plane**, nobody stands in line with the gland · leak check at reduced pressure before full line pressure · **barrier fluid / flush pressure confirmed correct before the motor is started, not after** · portable gas detector at the pump during start · vibration reading taken within 4 hours and recorded against the RR-02 IOW of 7.10 mm/s | **Medium** | Operations + PA |
| **12** | Close the permit and hand back | Incomplete de-isolation; tools left in the machine; guard missing; blinds left in | Equipment damage or injury on the next start; the next crew inherits a hidden defect | Housekeeping inspection with the AA · **tool tally against the list taken at the start of the job** · guard presence physically confirmed, not assumed · isolation certificate IC-2026-0286 formally cancelled point by point · joint IA and AA sign-off · **work order closed in CMMS with failure mode and repair coding**, so this job becomes reliability data rather than just a completed task | **Low** | IA + AA |

---

## The quality test

Compare what a generic JSA says with what this one says. An experienced
supervisor reads the left column and knows the job was never walked.

| Step | Generic entry | What this JSA says |
|---|---|---|
| 4 | "Hot surfaces — wear PPE" | Verified below 60 °C by contact pyrometer before any fitting is loosened |
| 5 | "Purge the equipment" | Nitrogen asphyxiation named as a hazard, with O₂ monitoring and an alarm point |
| 6 | "Be careful of dropped objects" | Far-side bolts slackened first so the joint opens away from the fitter |
| 8 | "Clean the seal chamber" | Pyrophoric iron sulfide kept wet, sealed drum, no dry brushing, no compressed air |
| 10 | "Align the pump" | Pipe strain checked with a dial gauge, accept < 0.05 mm |
| 11 | "Start the pump" | Nobody stands in line with the gland during first pressurisation |

"Wear personal protective equipment" appears nowhere in this document as a
control on its own. PPE is the last line of defence, and a JSA that leans on it
is a JSA that has run out of ideas earlier in the hierarchy than it should have.

## Three steps carry the risk

Steps 3, 4 and 8 are the ones that sit at Medium after every control we have,
and step 11 rejoins them at the end. If the toolbox talk covers only four things
in detail, these are the four:

- **Step 3** — an isolation that is assumed rather than proved is the failure
  that kills people on this kind of job.
- **Step 4** — 290 °C hydrocarbon and H₂S in the same drain.
- **Step 8** — pyrophoric scale is the hazard most crews have never been shown,
  and it ignites without an ignition source.
- **Step 11** — a new seal fails more often in its first hour than in the next
  three years.

## Where this goes back

Step 12 is not administrative housekeeping. Coding the work order with failure
and repair data is the input to the bad-actor register that RCA-02 identified as
the missing latent control. The job that fixes the pump also repairs the system
that let the pump fail three times without anyone asking why.

That is the chain closing on itself.

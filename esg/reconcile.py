#!/usr/bin/env python3
"""
Full reconciliation across both briefs and both decks.

Checks, in order:
  1  arithmetic of the worked inventory, recomputed from first principles
  2  every percentage in the shipped PDF, recomputed against the stated total
  3  folio numbering against the actual PDF page count
  4  cover contents against the real section headings
  5  acronym coverage -- every acronym used must be in that document's glossary
  6  figures and GRI codes shared between each brief and its deck
  7  stale-value scan for figures corrected during QA
  8  placeholder scan

Run:  python3 esg/reconcile.py
"""
import re, subprocess, sys, html, glob, os
from decimal import Decimal, ROUND_HALF_UP

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
fails, warns = [], []

def hu(x, dp="0.1"):
    return float(Decimal(str(x)).quantize(Decimal(dp), rounding=ROUND_HALF_UP))

def head(t): print("\n" + t + "\n" + "-" * len(t))
def ok(m):   print("   ok    " + m)
def bad(m):  print("   FAIL  " + m); fails.append(m)
def warn(m): print("   note  " + m); warns.append(m)

def text_of(pdf):
    return subprocess.run(["pdftotext", "-layout", pdf, "-"],
                          capture_output=True, text=True).stdout

# ── 1. arithmetic ──────────────────────────────────────────────────────────
head("1. Worked inventory arithmetic")
S1 = {"heaters":0.96,"fcc":0.32,"smr":0.14,"flare":0.064,"fugitive":0.048,"other":0.064}
S3 = {"cat11":16.7,"cat1":0.52,"cat3":0.14,"cat4":0.11,"rest":0.03}
s1, s2, s3 = round(sum(S1.values()),3), 0.08, round(sum(S3.values()),2)
total = 19.2
for label, got, want in (("Scope 1 components", s1, 1.60),
                         ("Scope 3 components", s3, 17.5),
                         ("Grand total", round(s1+s2+s3,2), 19.18)):
    (ok if abs(got-want) < 0.011 else bad)(f"{label}: {got} vs stated {want}")
for label, val, want in (("Scope 1 share", s1, 8.3), ("Scope 1+2 share", 1.68, 8.8),
                         ("Category 11 share", 16.7, 87.0), ("Scope 3 share", 17.5, 91.1),
                         ("Other Scope 3 share", 0.80, 4.2)):
    calc = hu(val/total*100)
    (ok if calc == want else bad)(f"{label}: {val}/{total} = {calc}% vs stated {want}%")
for label, calc, want, unit in (
        ("GHG intensity", hu(1.60/5.7, "0.01"), 0.28, "tCO2e/t"),
        ("Barrel intensity", hu(1.60e6/42e6*1000, "1"), 38.0, "kg/bbl"),
        ("Category 11", hu(5.4*3.1, "0.1"), 16.7, "Mt"),
        ("Scope 2", hu(180*1000*0.44/1e6, "0.01"), 0.08, "Mt")):
    (ok if abs(calc-want) < 0.011 else bad)(f"{label}: {calc} vs stated {want} {unit}")

# ── 2. percentages in the shipped PDF ──────────────────────────────────────
head("2. Percentages in the shipped inventory table")
t1 = text_of(os.path.join(DIST, "GHG-Inventory-Refinery.pdf"))
rows = re.findall(r'\s*(?:1|2|3|1\+2|All)\s+(.+?)\s+([\d.]+)\s+([\d.]+)%\s', t1)
if not rows: bad("could not parse the inventory table out of the PDF")
for lab, mt, pct in rows:
    calc = hu(float(mt)/total*100)
    (ok if calc == float(pct) else bad)(f"{lab[:44]:<46} {mt:>6} -> {pct}%  (recomputed {calc}%)")

# ── 3. folios vs page count ────────────────────────────────────────────────
head("3. Folio numbering vs actual PDF pages")
for src, pdf in (("ghg-inventory","GHG-Inventory-Refinery"), ("gri11-kpis","GRI-11-ESG-KPIs-Refinery")):
    h = open(os.path.join(ROOT,"esg","content",src+".html")).read()
    folios = [int(x) for x in re.findall(r'<span>Page (\d+)</span>', h)]
    n = int(re.search(r'Pages:\s+(\d+)',
        subprocess.run(["pdfinfo", os.path.join(DIST,pdf+".pdf")], capture_output=True, text=True).stdout).group(1))
    seq = folios == list(range(2, len(folios)+2))
    (ok if seq and len(folios)+1 == n else bad)(
        f"{pdf}: folios 2..{folios[-1]} sequential={seq}, cover+{len(folios)}={len(folios)+1} vs PDF {n}")

# ── 4. contents vs headings ────────────────────────────────────────────────
head("4. Cover contents vs section headings")
for src in ("ghg-inventory","gri11-kpis"):
    h = open(os.path.join(ROOT,"esg","content",src+".html")).read()
    toc  = re.findall(r'<div><span>(\d+)</span>', h)
    secs = re.findall(r'<h2><span class="n">(\d+)</span>', h)
    (ok if toc == secs else bad)(f"{src}: contents {toc} vs sections {secs}")

# ── 5. acronym coverage ────────────────────────────────────────────────────
head("5. Acronym coverage against each document's own glossary")
COMMON = {'THE','AND','FOR','NOT','ALL','YOU','ARE','ITS','ONE','TWO','WHO','HOW','WHY','OUR',
          'USE','ANY','CAN','HAS','WAS','PER','CO','OH','PS','RP','A','I','II','GRI','ISO','API',
          'EU','UN','US','IPCC','PDF','NCCC','SDG','SDGS','TANKS','MT','KG','ML','HA','QA','IOGP','GJ','TJ','MJ','KWH','MWH','GWH'}
for src in ("ghg-inventory","gri11-kpis"):
    raw = open(os.path.join(ROOT,"esg","content",src+".html")).read()
    body = html.unescape(re.sub(r'<[^>]+>', ' ', raw))
    used = {a for a in re.findall(r'\b[A-Z]{2,8}\b', body) if a not in COMMON}
    # glossary tags may combine entries, e.g. "CDU / VDU" or "LHV / HHV"
    tags = re.findall(r'class="tag">([^<]+)<', raw)
    listed = set()
    for t in tags:
        for part in re.split(r'[/,]', html.unescape(t)):
            part = part.strip()
            listed.add(part)
            if '-' in part: listed.add(part.split('-')[0])
    # An acronym counts as explained only if nearby words actually spell it out,
    # in either order: "ACR (Expansion)" or "Expansion (ACR)". A bare "(ACR)"
    # with no expansion beside it does NOT count.
    SMALL = {"of","and","for","the","on","in","to","a","de"}
    def initials_match(phrase, a):
        words = [w for w in re.findall(r"[A-Za-z][A-Za-z'&-]*", phrase)]
        words = [w for w in words if w.lower() not in SMALL]
        target = re.sub(r'[^A-Za-z]', '', a).upper()
        got = "".join(w[0] for w in words).upper()
        # allow the expansion to carry extra trailing words
        return target in got and len(target) >= 2
    def explained(a):
        esc = re.escape(a)
        # form 1: ACR (Expansion)  -- optional standard/version number between
        for m in re.finditer(esc + r'\b(?:\s+[A-Z]?[\d.]+[A-Za-z]?)?\s*\(([^)]{6,})\)', body):
            if initials_match(m.group(1), a): return True
        # form 2: Expansion (ACR)
        for m in re.finditer(r'([A-Za-z][^.()]{6,80}?)\s*\(\s*' + esc + r'\s*\)', body):
            tail = m.group(1).split()
            n = len(re.sub(r'[^A-Za-z]', '', a)) + 3
            if initials_match(" ".join(tail[-n:]), a): return True
            for k in range(2, min(len(tail), n) + 1):
                if initials_match(" ".join(tail[-k:]), a): return True
        return False
    missing = sorted(a for a in used if a not in listed and not explained(a))
    (ok if not missing else bad)(f"{src}: unexplained acronyms = {missing or 'none'}")

# ── 6. brief vs deck ───────────────────────────────────────────────────────
head("6. Figures and codes shared between each brief and its deck")
def deck_text(p):
    return subprocess.run(["markitdown", os.path.join(DIST,p)], capture_output=True, text=True).stdout
pairs = [("GHG-Inventory-Slides.pptx", t1,
          ["1.60","0.96","0.32","0.14","0.064","0.048","0.08","16.7","0.80","19.2","8.8%","87.0%"]),
         ("GRI-11-ESG-KPIs-Slides.pptx", text_of(os.path.join(DIST,"GRI-11-ESG-KPIs-Refinery.pdf")),
          ["305-1","305-4","302-3","305-7","303-3","306-3","403-9","204-1","205-3","207-4","11.22"])]
for deck, brief, keys in pairs:
    d = deck_text(deck)
    miss = [k for k in keys if k not in d or k not in brief]
    (ok if not miss else bad)(f"{deck}: all shared values present" if not miss else f"{deck}: missing {miss}")

# ── 7. stale values ────────────────────────────────────────────────────────
head("7. Stale values corrected during QA")
for pat, desc in ((r'(?<![\d.])40(?![\d%])\s*kg', "barrel intensity 40 (should be 38)"),
                  (r'91\.2%', "Scope 3 share 91.2% (should be 91.1%)"),
                  (r'(?<![\d.])4\.3%', "residual Scope 3 4.3% (should be 4.2%)")):
    hits = len(re.findall(pat, t1))
    (ok if hits == 0 else bad)(f"{desc}: {hits} occurrence(s)")

# ── 8. placeholders ────────────────────────────────────────────────────────
head("8. Placeholder scan")
blob = t1 + text_of(os.path.join(DIST,"GRI-11-ESG-KPIs-Refinery.pdf"))
for d,_,_ in pairs: blob += deck_text(d)
hits = re.findall(r'lorem|ipsum|TODO|\[insert|placeholder', blob, re.I)
(ok if not hits else bad)(f"placeholders found: {set(hits)}" if hits else "clean")

print("\n" + "="*60)
print(f"RESULT: {len(fails)} failure(s), {len(warns)} note(s)")
sys.exit(1 if fails else 0)

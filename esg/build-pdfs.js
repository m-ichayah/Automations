/*
 * Renders each HTML brief in esg/content/ to an A4 PDF in dist/.
 * Uses the Chromium that ships with this environment; no npm dependency.
 * Documents are laid out as explicit fixed-height .page sections rather than
 * reflowed text, so pagination is deliberate and tables never split.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHROME = "/opt/pw-browsers/chromium";
const OUTDIR = path.join(ROOT, "dist");

const DOCS = [
  { src: "ghg-inventory.html", out: "GHG-Inventory-Refinery.pdf" },
  { src: "gri11-kpis.html",    out: "GRI-11-ESG-KPIs-Refinery.pdf" },
];

fs.mkdirSync(OUTDIR, { recursive: true });

for (const d of DOCS) {
  const src = path.join(__dirname, "content", d.src);
  if (!fs.existsSync(src)) { console.log("skip (not written yet): " + d.src); continue; }
  const out = path.join(OUTDIR, d.out);
  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",      // page numbers are drawn by the document itself
    "--virtual-time-budget=8000",  // let fonts and layout settle before printing
    `--print-to-pdf=${out}`,
    "file://" + src,
  ], { stdio: ["ignore", "ignore", "pipe"] });
  const pages = execFileSync("pdfinfo", [out]).toString().match(/Pages:\s+(\d+)/);
  console.log(`${d.out}  —  ${pages ? pages[1] : "?"} pages, ${Math.round(fs.statSync(out).size / 1024)} KB`);
}

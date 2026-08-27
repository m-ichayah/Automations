/*
 * Page-fit checker.
 *
 * Each brief is laid out as fixed-height A4 .page sections rather than reflowed
 * text, so pagination is deliberate and tables never split. The cost of that
 * choice is that content which grows past the page does not reflow — it
 * silently collides with the folio and pushes a spare page into the PDF.
 * This measures every page in the browser and reports overflow in millimetres.
 *
 *   node esg/check-pages.js esg/content/<file>.html
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const CHROME = "/opt/pw-browsers/chromium";
const PX_PER_MM = 96 / 25.4;

const PROBE = `
<script>
(function () {
  var out = [];
  document.querySelectorAll('.page').forEach(function (p, i) {
    if (p.classList.contains('cover')) { out.push((i+1)+':-99:cover'); return; }  // fills by design
    var pr = p.getBoundingClientRect();
    var limit = pr.bottom - parseFloat(getComputedStyle(p).paddingBottom);
    var low = pr.top, who = '-';
    p.querySelectorAll('*').forEach(function (el) {
      if (el.closest('.folio')) return;              // folio is absolutely placed
      var r = el.getBoundingClientRect();
      if (r.height === 0 && r.width === 0) return;   // skip collapsed nodes
      if (r.bottom > low) {
        low = r.bottom;
        who = el.tagName + (el.className ? '.' + String(el.className).split(' ')[0] : '');
      }
    });
    out.push((i + 1) + ':' + ((low - limit) / ${PX_PER_MM}).toFixed(1) + ':' + who);
  });
  var d = document.createElement('div');
  d.id = 'fitreport';
  d.textContent = 'FIT ' + out.join(' ');
  document.body.appendChild(d);
})();
</script>`;

const file = path.resolve(process.argv[2]);
const tmp = path.join(path.dirname(file), ".probe-" + path.basename(file));
fs.writeFileSync(tmp, fs.readFileSync(file, "utf8").replace("</body>", PROBE + "</body>"));

let dom;
try {
  dom = execFileSync(CHROME, [
    "--headless", "--disable-gpu", "--no-sandbox",
    "--virtual-time-budget=6000", "--dump-dom", "file://" + tmp,
  ], { stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 }).toString();
} finally {
  fs.unlinkSync(tmp);
}

const m = dom.match(/id="fitreport">FIT ([^<]*)</);
if (!m) { console.error("probe did not run"); process.exit(1); }

console.log(path.basename(file));
let bad = 0;
m[1].trim().split(/\s+/).forEach((pair) => {
  const [p, mm, who] = pair.split(":");
  const v = parseFloat(mm);
  if (v > -3) {
    bad++;
    console.log(`  page ${p.padStart(2)}  ${v > 0 ? "OVER by " + v.toFixed(1) + " mm" : "tight, only " + (-v).toFixed(1) + " mm left"}   ${who}`);
  }
});
console.log(bad ? `  -> ${bad} page(s) need attention` : "  -> all pages fit with headroom");

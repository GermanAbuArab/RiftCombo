// Which rules does the CATALOGUE lean on that CLAUDE.md does not carry?
//   node scripts/claude-md-gap.mjs [minCitations]      (default 10)
// Answers the tractable half of "a rule living in entry prose, ungeneralised" - see walk section 30.
// The tractable version of "a rule carried in prose but never generalised":
// rules the CATALOGUE cites often and CLAUDE.md does not carry at all.
import fs from "fs";
const blob=fs.readFileSync("data/combos.json","utf8")+fs.readFileSync("data/synergies.json","utf8");
const CL=fs.readFileSync("CLAUDE.md","utf8");
const R=fs.readFileSync("data/Riftbound-Core-Rules-2026-07-16.txt","utf8");
const heads=[...new Set((R.match(/(^|[\s\f])(\d{3}(?:\.[0-9a-z]+)*)\.[\s\f]/gm)||[]).map(m=>m.trim().replace(/\.$/,"")))];
// The counter has three exclusions and every one of them was paid for. Do not simplify it.
//  -  excludes a preceding HYPHEN: without it "304" matches the collector number OGN-304.
//  -  excludes a preceding "#":    without it "153" matches the issue number #153 (131 false hits).
//  -  excludes a following LETTER or DOT: without it a parent absorbs its whole block, so "417"
//     reports 108 while being cited bare zero times.
// The dot exclusion also fixes a FALSE NEGATIVE that matters more than the ranking: CLAUDE.md
// carrying 419.4.a.1 used to read as carrying 419.4.a, so 16 real gaps were suppressed and never
// printed - i.e. the tool was blind to the exact "exception carried, rule absent" shape it exists
// to find, because a parent is always hidden by its own child.
const cnt=(h,s)=>{const re=new RegExp("(?<![-#0-9.])"+h.replace(/\./g,"\\.")+"(?![0-9a-z.])","g");return (s.match(re)||[]).length;};
const MIN=Number(process.argv[2]||10);
console.log(`# minCitations = ${MIN}`);
const rows=[];
for(const h of heads){
  const c=cnt(h,blob); if(c<MIN) continue;        // the catalogue leans on it
  const k=cnt(h,CL);   if(k>0) continue;         // CLAUDE.md does not carry it
  rows.push({h,c});
}
rows.sort((a,b)=>b.c-a.c);
console.log(`NON-VACUITY: ${heads.length} headings parsed; catalogue blob ${blob.length} bytes; CLAUDE.md ${CL.length} bytes.`);
console.log(`Rules cited ${MIN}+ times by the catalogue and ZERO times in CLAUDE.md: ${rows.length}\n`);
for(const r of rows.slice(0,25)){
  const re=new RegExp("(^|[\\s\\f])"+r.h.replace(/\./g,"\\.")+"\\.[\\s\\f]([\\s\\S]{0,150})");
  const m=R.match(re);
  const txt=(m?m[2]:"").replace(/\s+/g," ").trim().slice(0,105);
  console.log(`  ${String(r.c).padStart(4)}x  ${r.h.padEnd(12)} ${txt}`);
}

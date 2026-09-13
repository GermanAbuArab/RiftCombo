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
// SECOND COUNTER BUG, found by rc-gap 2026-09-13 and reproduced independently. Fixing the
// CATALOGUE side in 1727a80 left the CLAUDE.md side with the identical collision, in the
// SUPPRESSING direction: a rule is dropped when its CLAUDE.md count is non-zero, and a BARE
// three-digit head also matches a plain quantity in prose. Five rows were hidden by hits that are
// not citations - "its 100 partners", the issue number 153, the lane label "300-499", "against
// 348's 381", and "exactly one entry in 762", which is THE CATALOGUE'S OWN SIZE.
//
// The blind spot GROWS: as the catalogue passes 800 entries, every sentence quoting the entry count
// will suppress rules 767-829 one at a time - and that band is the keyword block this project leans
// on hardest. A tighter regex cannot fix it, because "762" in prose and "762." as a citation are the
// same characters. So a bare head is never silently dropped: it is reported for READING, with its
// hits, which is the only check that works on this class.
const rows=[], verify=[];
for(const h of heads){
  const c=cnt(h,blob); if(c<MIN) continue;        // the catalogue leans on it
  const k=cnt(h,CL);
  if(k===0){ rows.push({h,c}); continue; }        // CLAUDE.md does not carry it
  if(!h.includes(".")) verify.push({h,c,k});      // bare head + non-zero: a collision is possible
}
rows.sort((a,b)=>b.c-a.c);
console.log(`NON-VACUITY: ${heads.length} headings parsed; catalogue blob ${blob.length} bytes; CLAUDE.md ${CL.length} bytes.`);
console.log(`Rules cited ${MIN}+ times by the catalogue and ZERO times in CLAUDE.md: ${rows.length}\n`);
if(verify.length){
  console.log(`# ${verify.length} BARE heads were suppressed by a non-zero CLAUDE.md count. A bare`);
  console.log(`# three-digit number in prose is indistinguishable from a citation, so READ THESE HITS`);
  console.log(`# rather than trusting the suppression - this is the second counter bug, not a ranking issue.`);
  for(const v of verify){
    const hits=(CL.match(new RegExp(".{30}(?<![-#0-9.])"+v.h+"(?![0-9a-z.]).{14}","g"))||[]).slice(0,2);
    console.log(`  ${String(v.c).padStart(4)}x cat | ${v.k} in CLAUDE.md | ${v.h}`);
    for(const x of hits) console.log(`         ...${x.replace(/\n/g," ")}...`);
  }
  console.log("");
}
for(const r of rows.slice(0,25)){
  // FIFTH member of this file's counting-trap family, found by rc-gap 2026-09-13. The preview took
  // the FIRST occurrence of "NNN." in the rules text - and a rule number also appears in "See rule
  // NNN." CROSS-REFERENCES, which can PRECEDE its own heading. With \\s matching a space, a mid-line
  // cross-reference qualified, so rule 465 previewed as the tail of 143.2.b's cross-reference plus
  // 143.2.b.1's text. Anchoring on a LINE START fixes it; [ \\t\\f]* keeps the form-feed headings this
  // project already lost once. Verified zero regression: both forms find exactly 2,381 headings.
  // 57 of 2,381 were affected - and they are the ones this project leans on hardest, including 469.1
  // Conquer, 431 Burn Out, 417 Damage, 465/466 Combat, 811 Hidden, 428 Killing and the keyword blocks.
  const re=new RegExp("(^|[\\n\\f])[ \\t\\f]*"+r.h.replace(/\./g,"\\.")+"\\.[ \\t]([\\s\\S]{0,150})");
  const m=R.match(re);
  const txt=(m?m[2]:"").replace(/\s+/g," ").trim().slice(0,105);
  console.log(`  ${String(r.c).padStart(4)}x  ${r.h.padEnd(12)} ${txt}`);
}

// Validate EVERY staged row: refs resolve, produces valid, identity <=2, legality, copies, not live.
import fs from "fs";
const RULES=fs.readFileSync("data/Riftbound-Core-Rules-2026-07-16.txt","utf8");
const db=JSON.parse(fs.readFileSync("data/combos.json","utf8"));
const C=JSON.parse(fs.readFileSync("data/cards.json","utf8")).cards;
const leg=JSON.parse(fs.readFileSync("data/legality.json","utf8"));
const dom={},nm={},sig={}; for(const c of C){dom[c.base]=c.domains||[];nm[c.base]=c.name;sig[c.base]=c.signature;}
const P=new Set(); for(const c of db.combos)(c.produces||[]).forEach(x=>P.add(x));
const live=new Set(db.combos.map(c=>c.id));
const STAGE=process.argv[2] || "/tmp/rc-walks/rc-synth.json";
const rows=JSON.parse(fs.readFileSync(STAGE,"utf8"));
let fail=0;
console.log(`staged rows: ${rows.length}; catalogue ${db.combos.length}\n`);
for(const e of rows){
  console.log(`=== ${e.id} [${e.class}, ${e.status}]`);
  const refs=[...new Set((JSON.stringify(e).match(/\b\d{3}(?:\.[0-9a-z]+)*\b/g)||[]).filter(r=>r.includes(".")))];
  const miss=refs.filter(r=>!new RegExp("(^|[\\s\\f])"+r.replace(/\./g,"\\.")+"\\.[\\s\\f]").test(RULES));
  console.log(`  rule refs ${refs.length}, unresolved ${miss.length} ${miss.join(",")}`); if(miss.length) fail++;
  for(const p of e.produces) if(!P.has(p)){console.log("  INVALID produces:",p);fail++;}
  const ds=new Set(); for(const u of e.uses) for(const d of (dom[u.card]||[])) ds.add(d);
  console.log(`  identity ${[...ds].join("+")} (${ds.size})`); if(ds.size>2){console.log("  VIOLATES 103.1.b");fail++;}
  if(live.has(e.id)){console.log("  ALREADY LIVE");fail++;}
  for(const u of e.uses){
    for(const r of leg.entries) if((r.bases||[]).includes(u.card)){console.log("  LEGALITY",u.card,r.status,r.format);fail++;}
    if(u.quantity>3){console.log("  >3 copies",u.card);fail++;}
    if(sig[u.card]) console.log("  SIGNATURE (check legend line):",u.card,nm[u.card]);
    if(!nm[u.card]){console.log("  UNKNOWN BASE",u.card);fail++;}
  }
  // legend line must match the MEASURED census for this identity
  const want=new Set([...ds]);
  const L=new Map();
  for(const c of C){ if(!(c.type||[]).includes("legend"))continue; const d=c.domains||[];
    if(d.length!==2||!d.every(x=>want.has(x)))continue; if(!L.has(c.name))L.set(c.name,new Set()); L.get(c.name).add(c.base);}
  const easy=(e.prerequisites.easy||[]).join(" ");
  const missingName=[...L.keys()].filter(n=>!easy.includes(n));
  const extra=[...easy.matchAll(/\b([A-Z][a-zA-Z'’-]+(?: [a-zA-Z'’-]+)*) \((?:OGN|SFD|UNL|VEN|OGS)-\d+/g)].map(m=>m[1]).filter(n=>!L.has(n));
  console.log(`  legend census: pool has ${L.size} name(s) [${[...L.keys()].join(", ")}]; missing from easy: ${missingName.length?missingName.join(","):"none"}; named but not a legend of this identity: ${extra.length?extra.join(","):"none"}`);
  if(missingName.length||extra.length) fail++;
  console.log(`  uses: ${e.uses.map(u=>`${u.card} ${nm[u.card]} x${u.quantity}`).join("; ")}`);
}
console.log(fail?`\nFAILURES: ${fail}`:"\nALL STAGED ROWS PASS");

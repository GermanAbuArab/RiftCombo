// Emit the prerequisites.easy legend sentence, MEASURED. Never type one again.
//   node .scratch-synth/legend-line.mjs calm fury
import fs from "fs";
const want=new Set(process.argv.slice(2).map(s=>s.toLowerCase()));
if(want.size!==2){console.error("usage: legend-line <domainA> <domainB>");process.exit(2);}
console.log(`# asked for: ${[...want].join(" + ")}`);   // echo the parsed input - the argv trap
const C=JSON.parse(fs.readFileSync("data/cards.json","utf8")).cards;
const L=new Map();
for(const c of C){
  if(!(c.type||[]).includes("legend")) continue;
  const d=c.domains||[];
  if(d.length!==2||!d.every(x=>want.has(x))) continue;
  if(!L.has(c.name)) L.set(c.name,new Set());
  L.get(c.name).add(c.base);
}
const WORDS=["ZERO","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT"];
const names=[...L].map(([n,b])=>`${n} (${[...b].sort().join(" / ")})`);
const A=[...want][0][0].toUpperCase()+[...want][0].slice(1);
const B=[...want][1][0].toUpperCase()+[...want][1].slice(1);
console.log(`\nLegend domains cover ${A} and ${B}. Measured over data/cards.json on ${new Date().toISOString().slice(0,10)}, the pool prints ${WORDS[L.size]||L.size} ${A}/${B} legend name${L.size===1?"":"s"}: ${names.join(", ")}.`);

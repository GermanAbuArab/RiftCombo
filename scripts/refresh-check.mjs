#!/usr/bin/env node
// Daily model-free detector (#735). Reads Riot's official sources, diffs them against the repo's
// data, and files one issue per real change; files nothing when nothing changed. It never commits:
// errata, legality and combos stay authored by hand.
//
//   node scripts/refresh-check.mjs --build-exit <n> --build-err <file>
//     The workflow (.github/workflows/refresh.yml) has already run scripts/build-cards.mjs in place
//     on the runner; this compares the rebuilt data/ with `git show HEAD:<file>` and files issues
//     with GITHUB_TOKEN on GITHUB_REPOSITORY, skipping any whose refresh-key is already filed.
//   node scripts/refresh-check.mjs --dry-run
//     Rebuilds into a temp copy of data/ (RIFTCOMBO_DATA_DIR), prints the changes as JSON, files
//     nothing. The working tree stays clean.
//
// The pure functions below are what test/refresh-check.test.ts exercises; importing runs nothing.

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "RiftCombo/0.1 (personal fan project; +https://github.com/GermanAbuArab)";
export const NEWS_URL = "https://playriftbound.com/en-us/news/";
export const HUB_URL = "https://playriftbound.com/en-us/rules-hub/";
const SITE = "https://playriftbound.com";
const sha256 = (s) => createHash("sha256").update(s).digest("hex");

const NEWS_PATH = /\/en-us\/news\/[a-z-]+\/[a-z0-9-]+/g;
const PDF_URL = /https:\/\/cmsassets\.rgpub\.io\/[^"]+\.pdf/g;
// Matched against the slug's hyphen-separated words (with their inflections), so "banner" or
// "urban" is not a ban list while "banned" and "faqs" still are.
const BAN_WORDS = "bans?|banned|banning|banlists?|erratas?";
const WATCHED = new RegExp(`(^|-)(${BAN_WORDS}|rules?|faqs?|patch(es)?|changelogs?|overviews?)(-|$)`);
const FAST = new RegExp(`(^|-)(${BAN_WORDS})(-|$)`);
const FETCH_MS = 60_000;

// --- sources ------------------------------------------------------------------

// Article metadata rides in the page's __NEXT_DATA__ JSON: each card is an object with `title`,
// `action.payload.url` (the path, sometimes with a trailing slash) and `analytics.publishDate`.
function articleMeta(html) {
  const meta = new Map();
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return meta;
  const walk = (o) => {
    if (Array.isArray(o)) return o.forEach(walk);
    if (!o || typeof o !== "object") return;
    const url = o.action?.payload?.url;
    const path = typeof url === "string" ? url.match(NEWS_PATH)?.[0] : undefined;
    if (path && !meta.has(path)) meta.set(path, { title: typeof o.title === "string" ? o.title.replace(/\s+/g, " ").trim() : null, publishedAt: o.analytics?.publishDate ?? null });
    Object.values(o).forEach(walk);
  };
  walk(JSON.parse(m[1]));
  return meta;
}

/** Watched article paths on the news page: the slug (last segment) names a rules or card topic. */
export function watchedSlugs(newsHtml) {
  const meta = articleMeta(newsHtml);
  const paths = [...new Set(newsHtml.match(NEWS_PATH) ?? [])];
  return paths
    .filter((p) => WATCHED.test(p.split("/").pop()))
    .sort()
    .map((slug) => ({ slug, title: meta.get(slug)?.title ?? null, publishedAt: meta.get(slug)?.publishedAt ?? null }));
}

/** Rules documents linked from the rules hub (content-hash names: a new document is a new URL). */
export function rulesPdfs(hubHtml) {
  return [...new Set(hubHtml.match(PDF_URL) ?? [])].sort();
}

// --- data diffs ---------------------------------------------------------------

/** The fields of a card whose value differs between two builds (every field, not only the text). */
const changedFields = (a, b) =>
  [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((f) => JSON.stringify(a[f]) !== JSON.stringify(b[f])).sort();

/**
 * cards[] by id; the top-level `built` and `resultsUpdatedAt` change on every build and are not
 * compared. `digest` maps each added or changed id to a hash of its rebuilt card, so the key of a
 * later change to the same card differs from the key of the first one.
 */
export function diffCards(oldJson, newJson) {
  const before = new Map(oldJson.cards.map((c) => [c.id, c]));
  const after = new Map(newJson.cards.map((c) => [c.id, c]));
  const added = [...after.keys()].filter((id) => !before.has(id)).sort();
  const removed = [...before.keys()].filter((id) => !after.has(id)).sort();
  const changed = [...after.keys()].filter((id) => before.has(id) && changedFields(before.get(id), after.get(id)).length > 0).sort();
  const digest = Object.fromEntries([...added, ...changed].map((id) => [id, sha256(JSON.stringify(after.get(id)))]));
  return { added, removed, changed, digest };
}

/** entries[] present on one side only (compared as whole entries), each tagged with its side. */
export function diffLegality(oldJson, newJson) {
  const key = (e) => JSON.stringify(e);
  const before = new Set(oldJson.entries.map(key));
  const after = new Set(newJson.entries.map(key));
  return [
    ...newJson.entries.filter((e) => !before.has(key(e))).map((entry) => ({ side: "+", entry })),
    ...oldJson.entries.filter((e) => !after.has(key(e))).map((entry) => ({ side: "-", entry })),
  ];
}

/** The line of a failed build's stderr that names the failure: the Error line, not Node's version. */
export function buildErrorLine(stderr) {
  const lines = stderr.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.find((l) => /^[A-Za-z]*Error\b.*:/.test(l)) ?? lines.filter((l) => !/^Node\.js v/.test(l)).pop() ?? "";
}

// --- keys ---------------------------------------------------------------------


/** The dedup key a filed issue carries as `refresh-key: <key>`. */
export function refreshKey(kind, payload) {
  switch (kind) {
    case "news":
    case "rules":
      return `${kind}:${payload}`;
    case "cards":
      return `cards:${sha256(
        [
          ...payload.added.map((id) => `+${id} ${payload.digest[id]}`),
          ...payload.removed.map((id) => `-${id}`),
          ...payload.changed.map((id) => `~${id} ${payload.digest[id]}`),
        ]
          .sort()
          .join("\n"),
      )}`;
    case "legality":
      return `legality:${sha256(payload.map((d) => `${d.side}${JSON.stringify(d.entry)}`).sort().join("\n"))}`;
    case "build":
      return `build:${sha256(payload)}`;
    default:
      throw new Error(`refreshKey: unknown kind ${kind}`);
  }
}

// --- changes ------------------------------------------------------------------

const pending = (entry) => !entry || (entry.status === "unaccounted" && entry.issue == null);
const list = (ids) => (ids.length ? ids.slice(0, 10).join(", ") + (ids.length > 10 ? `, ... (${ids.length - 10} more)` : "") : "none");

function newsChange({ slug, title, publishedAt }) {
  const url = `${SITE}${slug}`;
  const name = slug.split("/").pop();
  const fast = FAST.test(name);
  const head = [
    "Riot published an article this repo has not accounted for (`data/sources.json` has no entry for it, or an `unaccounted` entry with `issue: null`).",
    "",
    `- Title: ${title ?? "(not in the page data)"}`,
    `- publishedAt: ${publishedAt ?? "(not in the page data)"}`,
    `- URL: ${url}`,
    `- Seen by: \`node scripts/refresh-check.mjs\` -> \`watchedSlugs(${NEWS_URL})\` listed \`${slug}\``,
    "",
  ];
  const body = fast
    ? [
        ...head,
        "## Change",
        "- `data/legality.src.json` (a ban or restriction) or `data/errata.json` (an errata), as the article says",
        `- \`data/sources.json\`: set \`news["${slug}"]\` to \`ingested\` with this issue's number`,
        "",
        "drill: fast path (a ban list or errata is mechanical transcription; players take it to tournaments)",
        "",
        "## Acceptance",
        "- verify: `npm run build:data` exits 0",
        "- verify: every card the article names appears in the changed file (`git grep -n '<card name>' data/legality.src.json data/errata.json`)",
        "",
        "Follow-up the thinker owes: a re-read of the verified `data/combos.json` entries that name the changed cards, filed `later` once this lands.",
      ]
    : [
        ...head,
        "Follow-up the thinker owes: read the article and file the ingest (a FAQ or rules patch: a re-read pass of the entries it touches, as #734; a set overview: the set ingest, then a combo hunt `after:` it, as #733), or set its `data/sources.json` entry to `not-applicable`.",
      ];
  return {
    kind: "news",
    key: refreshKey("news", slug),
    title: `Refresh: new Riot article «${title ?? name}»${publishedAt ? ` (${publishedAt.slice(0, 10)})` : ""}`,
    labels: fast ? ["refresh", "data", "ready", "P1"] : ["refresh", "later"],
    body: [...body, "", `refresh-key: ${refreshKey("news", slug)}`].join("\n"),
  };
}

function rulesChange(pdf) {
  const key = refreshKey("rules", pdf);
  return {
    kind: "rules",
    key,
    title: `Refresh: new rules document on the Rules Hub (${pdf.split("/").pop()})`,
    labels: ["refresh", "later"],
    body: [
      "The Rules Hub links a rules document `data/sources.json` does not account for. Its file name is a content hash, so this is a new document or a new edition.",
      "",
      `- URL: ${pdf}`,
      `- Seen by: \`node scripts/refresh-check.mjs\` -> \`rulesPdfs(${HUB_URL})\` listed it`,
      "",
      "Follow-up the thinker owes: identify the document (Core or Tournament Rules, which edition), diff it against the edition in the repo (`docs/rules-diff/`), and file the re-read pass of the entries it touches; then set its `data/sources.json` entry to `ingested`.",
      "",
      `refresh-key: ${key}`,
    ].join("\n"),
  };
}

function cardsChange(cards, before, after) {
  const key = refreshKey("cards", cards);
  const byId = (j) => new Map(j.cards.map((c) => [c.id, c]));
  const b = byId(before);
  const a = byId(after);
  const lines = cards.changed.slice(0, 10).flatMap((id) =>
    changedFields(b.get(id), a.get(id)).map(
      (f) => `- ${id} ${f}: ${JSON.stringify(b.get(id)[f])} -> ${JSON.stringify(a.get(id)[f])}`,
    ),
  );
  return {
    kind: "cards",
    key,
    title: `Refresh: Riot's gallery differs from data/cards.json (+${cards.added.length} -${cards.removed.length} ~${cards.changed.length})`,
    labels: ["refresh", "data", "ready", "P2"],
    body: [
      "`node scripts/build-cards.mjs` exited 0 and its `cards[]` differs from `git show HEAD:data/cards.json`.",
      "",
      `- Printings: ${before.cards.length} -> ${after.cards.length}`,
      `- Added (${cards.added.length}): ${list(cards.added)}`,
      `- Removed (${cards.removed.length}): ${list(cards.removed)}`,
      `- Changed (${cards.changed.length}): ${list(cards.changed)}`,
      ...(lines.length ? ["", "First changed lines:", ...lines.slice(0, 10)] : []),
      "",
      "## Change",
      "- `data/cards.json` (rebuilt with `npm run build:data`; a text change Riot announced but has not reprinted goes to `data/errata.json`, an anomaly to `docs/data-anomalies.md`)",
      "",
      "## Acceptance",
      `- verify: \`npm run build:data\` prints \`cards: ${after.cards.length}\``,
      "",
      "Follow-up the thinker owes: for a new set, a combo hunt `after:` this ingest (as #733 is for RAD); for changed text, a re-read of the verified entries naming those cards.",
      "",
      `refresh-key: ${key}`,
    ].join("\n"),
  };
}

function legalityChange(legality) {
  const key = refreshKey("legality", legality);
  const shown = legality.slice(0, 10).map((d) => `- ${d.side} ${d.entry.format} ${d.entry.name} (${(d.entry.codes ?? []).join(", ")}): ${d.entry.status}, since ${d.entry.since}`);
  return {
    kind: "legality",
    key,
    title: `Refresh: rebuilt data/legality.json differs from master (${legality.length} entries)`,
    labels: ["refresh", "data", "ready", "P2"],
    body: [
      "`node scripts/build-cards.mjs` exited 0 and its `entries[]` differs from `git show HEAD:data/legality.json` (`data/legality.src.json` is unchanged, so the pool resolved the names to other codes).",
      "",
      ...shown,
      ...(legality.length > 10 ? [`- ... (${legality.length - 10} more)`] : []),
      "",
      "## Change",
      "- `data/legality.json` (rebuilt with `npm run build:data`)",
      "",
      "## Acceptance",
      "- verify: `npm run build:data` exits 0 and `npm test` passes",
      "",
      "Follow-up the thinker owes: a re-read of the verified entries naming those cards.",
      "",
      `refresh-key: ${key}`,
    ].join("\n"),
  };
}

function buildChange(buildExit, buildErr) {
  const line = buildErrorLine(buildErr);
  const key = refreshKey("build", line);
  const tail = buildErr.split("\n").filter((l) => l.trim()).slice(-15);
  return {
    kind: "build",
    key,
    title: `Refresh: node scripts/build-cards.mjs fails on Riot's gallery (${line.slice(0, 80)})`,
    labels: ["refresh", "bug", "data", "ready", "P1"],
    body: [
      `\`node scripts/build-cards.mjs\` exited ${buildExit} on the daily refresh: an errata find-string that stopped matching, a name in \`data/legality.src.json\` or \`data/signature.src.json\` that no longer resolves, or a gallery schema change (as #660).`,
      "",
      "stderr tail:",
      "```",
      ...tail,
      "```",
      "",
      "## Acceptance",
      "- verify: `npm run build:data` exits 0",
      "",
      `refresh-key: ${key}`,
    ].join("\n"),
  };
}

/**
 * Every change to file. `sources` is data/sources.json; `cards` and `legality` are the diffs (or
 * null), `cardsJson` the { before, after } pair the cards body quotes.
 */
export function changes(sources, { slugs, pdfs, cards, legality, buildExit, buildErr, cardsJson }) {
  const out = [];
  for (const s of slugs) if (pending(sources.news[s.slug])) out.push(newsChange(s));
  for (const pdf of pdfs) if (pending(sources.rules[pdf])) out.push(rulesChange(pdf));
  if (buildExit !== 0) {
    out.push(buildChange(buildExit, buildErr ?? ""));
    return out;
  }
  if (cards && cards.added.length + cards.removed.length + cards.changed.length > 0) out.push(cardsChange(cards, cardsJson.before, cardsJson.after));
  if (legality && legality.length > 0) out.push(legalityChange(legality));
  return out;
}

// --- main ---------------------------------------------------------------------

async function getText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(FETCH_MS) });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

async function github(path, init = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    signal: AbortSignal.timeout(FETCH_MS),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": UA,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${init.method ?? "GET"} ${path} -> HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

/** refresh-key lines of every issue labelled `refresh`, open or closed (the list API, not search). */
async function filedKeys(repo) {
  const keys = new Set();
  for (let page = 1; ; page++) {
    const issues = await github(`/repos/${repo}/issues?labels=refresh&state=all&per_page=100&page=${page}`);
    for (const i of issues) for (const m of (i.body ?? "").matchAll(/^refresh-key: (\S+)$/gm)) keys.add(m[1]);
    if (issues.length < 100) return keys;
  }
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1];
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const sources = JSON.parse(readFileSync(join(ROOT, "data", "sources.json"), "utf8"));

  let dataDir = join(ROOT, "data");
  let buildExit;
  let buildErr;
  if (dryRun) {
    dataDir = join(mkdtempSync(join(tmpdir(), "riftcombo-refresh-")), "data");
    cpSync(join(ROOT, "data"), dataDir, { recursive: true });
    const r = spawnSync(process.execPath, [join(ROOT, "scripts", "build-cards.mjs")], {
      env: { ...process.env, RIFTCOMBO_DATA_DIR: dataDir },
      encoding: "utf8",
    });
    process.stderr.write(r.stdout + r.stderr);
    buildExit = r.status;
    buildErr = r.stderr;
  } else {
    buildExit = Number(arg("--build-exit"));
    buildErr = readFileSync(arg("--build-err"), "utf8");
  }

  const [newsHtml, hubHtml] = await Promise.all([getText(NEWS_URL), getText(HUB_URL)]);
  const slugs = watchedSlugs(newsHtml);
  const pdfs = rulesPdfs(hubHtml);
  // A page that lists nothing has changed shape; say so instead of reporting "no change".
  if (slugs.length === 0) throw new Error(`${NEWS_URL}: no watched article paths found`);
  if (pdfs.length === 0) throw new Error(`${HUB_URL}: no rules PDF links found`);

  const head = (file) => JSON.parse(execFileSync("git", ["show", `HEAD:data/${file}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 28 }));
  const now = (file) => JSON.parse(readFileSync(join(dataDir, file), "utf8"));
  const cardsJson = { before: head("cards.json"), after: now("cards.json") };
  const found = changes(sources, {
    slugs,
    pdfs,
    cards: diffCards(cardsJson.before, cardsJson.after),
    legality: diffLegality(head("legality.json"), now("legality.json")),
    buildExit,
    buildErr,
    cardsJson,
  });
  process.stderr.write(`watched articles: ${slugs.length}; rules PDFs: ${pdfs.length}; build exit: ${buildExit}; changes: ${found.length}\n`);

  if (dryRun) {
    console.log(JSON.stringify(found, null, 1));
    return;
  }
  const repo = process.env.GITHUB_REPOSITORY;
  const filed = await filedKeys(repo);
  for (const c of found) {
    if (filed.has(c.key)) {
      console.log(`already filed: ${c.key}`);
      continue;
    }
    const issue = await github(`/repos/${repo}/issues`, { method: "POST", body: JSON.stringify({ title: c.title, body: c.body, labels: c.labels }) });
    console.log(`filed #${issue.number}: ${c.key}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();

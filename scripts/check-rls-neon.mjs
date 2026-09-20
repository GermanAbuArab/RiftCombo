#!/usr/bin/env node
// Prove the isolation between two real users on NEON instead of assuming it because the policies
// were written. The Neon twin of `scripts/check-rls.mjs`, which it replaces at cutover; both exist
// only while the migration is in flight.
//
// It creates throwaway accounts, has each save a deck, then tries every way one of them could reach
// the other's row: read it, list it, rename it, delete it, or insert a row under the other's id.
// Every one of those must fail. The accounts are deleted at the end.
//
// Credentials come from the environment only -- nothing here is ever written to a file or printed:
//
//   set -a && . ./.env.local && set +a && node scripts/check-rls-neon.mjs
//
// NEON_API_KEY creates and deletes the test users through the Management API. It is a server key: it
// belongs nowhere near the browser bundle, and this script is the only place in the repository that
// reads it.
//
// ---------------------------------------------------------------------------------------------
// THE RULE THIS FILE IS BUILT AROUND, because the Supabase original got it wrong five times:
//
//   A POSITIVE ASSERTION FAILS SAFE WHEN THE REQUEST BREAKS. A NEGATIVE ONE PASSES.
//
// `Boolean(undefined)` is false, so a positive check goes red on its own if the call dies. A
// negative check reads the same broken answer as proof of denial. Four of the fourteen Supabase
// checks compared `(data?.length ?? 0) === 0` with the error thrown away, so "you were correctly
// denied" and "the request exploded" were the same answer, and all four PASSED against a database
// where the table did not exist. That is not a historical curiosity here: THIS SCRIPT IS SPECIFIED
// TO RUN AGAINST AN EMPTY DATABASE, which is exactly the state those checks reported green on.
//
// Hence: the positive controls run FIRST and THROW rather than print, the non-vacuity banner must be
// non-zero, and `denegado()` demands a specific successful shape rather than an absence of rows.
// ---------------------------------------------------------------------------------------------

const {
  NEON_DATA_API_URL,      // https://ep-xxx.<...>.neon.tech/<db>/rest/v1   (read off the Data API page)
  NEON_AUTH_URL,          // https://ep-xxx.<...>.neon.tech/<db>/auth      (read off the Auth page)
  NEON_PROJECT_ID,
  NEON_BRANCH_ID,
  NEON_API_KEY,
  DELETE_ACCOUNT_URL,     // the deployed api/delete-account endpoint
} = process.env;

const faltan = Object.entries({
  NEON_DATA_API_URL, NEON_AUTH_URL, NEON_PROJECT_ID, NEON_BRANCH_ID, NEON_API_KEY, DELETE_ACCOUNT_URL,
}).filter(([, v]) => !v).map(([k]) => k);

if (faltan.length) {
  // Exit 2, not 0. A run that could not test deletion must never read as a green run: checks 10-12
  // are the ones guarding a published privacy promise, and skipping them silently is the same class
  // of lie as a vacuous check.
  console.error(`faltan en el entorno: ${faltan.join(", ")}`);
  process.exit(2);
}

const MANAGEMENT = `https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/branches/${NEON_BRANCH_ID}/auth/users`;

let fallas = 0;
const check = (nombre, ok, detalle = "") => {
  if (!ok) fallas++;
  console.log(`${ok ? "pass" : "FAIL"}  ${nombre}${detalle ? `  -- ${detalle}` : ""}`);
};

/** A positive control. It THROWS, because everything after it is only meaningful if it held. */
function exigir(condicion, mensaje) {
  if (!condicion) throw new Error(`no se puede probar aislamiento: ${mensaje}`);
}

/**
 * One Data API request, normalised to `{ data, error, status }`.
 *
 * Written on `fetch` rather than a PostgREST client on purpose: this file's whole job is to classify
 * responses exactly, and borrowing a library's idea of what counts as an error is the thing that
 * went wrong last time. Everything it decides is visible right here.
 */
async function rest(jwt, ruta, opciones = {}) {
  const cabeceras = { "Content-Type": "application/json", ...(opciones.headers ?? {}) };
  if (jwt) cabeceras["Authorization"] = `Bearer ${jwt}`;
  // `return=representation` on every write, never the default `return=minimal`. Minimal answers 204
  // with no body whether it changed one row or none, so a write checked under it cannot tell the two
  // apart -- the same indistinguishability this file exists to eliminate.
  if (opciones.method && opciones.method !== "GET") cabeceras["Prefer"] = "return=representation";

  const res = await fetch(`${NEON_DATA_API_URL}${ruta}`, { ...opciones, headers: cabeceras });
  const texto = await res.text();
  let cuerpo = null;
  try { cuerpo = texto ? JSON.parse(texto) : null; } catch { cuerpo = texto; }

  if (!res.ok) return { data: null, error: cuerpo ?? { message: res.statusText }, status: res.status };
  return { data: cuerpo, error: null, status: res.status };
}

/**
 * A NEGATIVE check on a read, update or delete.
 *
 * Under RLS a denial is NOT an error: PostgREST filters the rows and answers 200 with `[]` and no
 * error. So the only shape that proves denial is SUCCESS WITH ZERO ROWS. Anything else is named and
 * fails -- an error means the request never got far enough to be denied, and rows mean RLS let it
 * through.
 */
const denegado = (nombre, { data, error, status }) => {
  if (error) {
    return check(nombre, false, `la request FALLO, no fue denegada (${status} ${error.code ?? "?"}: ${error.message ?? ""})`);
  }
  if (!Array.isArray(data)) {
    return check(nombre, false, `respuesta inesperada, se esperaba un array y vino ${typeof data} (${status})`);
  }
  check(nombre, data.length === 0, `${data.length} filas`);
};

/** A NEGATIVE check on an insert, where denial DOES arrive as an error, and only one code will do. */
const rechazado = (nombre, { data, error, status }) => {
  const codigo = error?.code;
  if (codigo === "42501") return check(nombre, true);
  if (error) {
    return check(nombre, false, `codigo inesperado, se esperaba 42501 (${status} ${codigo ?? "?"}: ${error.message ?? ""})`);
  }
  check(nombre, false, `RLS NO rechazo el insert, se insertaron ${Array.isArray(data) ? data.length : "?"} filas`);
};

const sub = (jwt) => JSON.parse(Buffer.from(jwt.split(".")[1], "base64url")).sub;

/** A signed-in browser: a real account, signed in the same way the app signs one in. */
async function crearUsuario(tag) {
  const email = `rls-${tag}-${crypto.randomUUID()}@riftcombo.test`;
  const password = crypto.randomUUID();
  const origen = new URL(NEON_AUTH_URL).origin;
  const json = { "Content-Type": "application/json", Origin: origen };

  const alta = await fetch(`${NEON_AUTH_URL}/sign-up/email`, {
    method: "POST", headers: json,
    body: JSON.stringify({ email, password, name: `rls ${tag}`, callbackURL: origen }),
  });
  exigir(alta.ok, `no se pudo crear ${tag}: ${alta.status} ${await alta.text()}`);

  const login = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
    method: "POST", headers: json, body: JSON.stringify({ email, password }),
  });
  exigir(login.ok, `no se pudo loguear ${tag}: ${login.status}`);

  const sesion = await fetch(`${NEON_AUTH_URL}/get-session`, {
    headers: { Cookie: login.headers.get("set-cookie") ?? "" },
  });
  // The JWT rides in a RESPONSE HEADER, not in the body. Reading the body here would yield a session
  // object with no token and the failure would look like a permissions problem three checks later.
  const jwt = sesion.headers.get("Set-Auth-Jwt");
  exigir(jwt, `${tag} quedo sin JWT: get-session no devolvio Set-Auth-Jwt`);

  return { id: sub(jwt), jwt, email };
}

const borrarUsuario = (id) =>
  fetch(`${MANAGEMENT}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${NEON_API_KEY}` } });

const guardar = (u, nombre, extra = {}) => rest(u.jwt, "/decks", {
  method: "POST",
  body: JSON.stringify({ name: nombre, deck_text: "1 Lux, Illuminated", format: "constructed", ...extra }),
});

const a = await crearUsuario("a");
const b = await crearUsuario("b");
const c = await crearUsuario("c");

try {
  // ---- POSITIVE CONTROLS. These throw. Everything below is an absence, and an absence only means
  // ---- something once the thing being hidden is known to be there.
  const { data: filasA, error: errorA } = await guardar(a, "A's deck", { user_id: a.id });
  exigir(!errorA, `A no pudo guardar un mazo: ${errorA?.code ?? ""} ${errorA?.message ?? ""}`);
  const mazoA = filasA?.[0];
  exigir(mazoA?.id, "el insert de A no devolvio la fila");
  check("1. un usuario logueado puede guardar un mazo (existe la policy de insert)", true);

  const { error: errorB } = await guardar(b, "B's deck", { user_id: b.id });
  check("2. el segundo usuario tambien puede guardar", !errorB, errorB?.message ?? "");

  const { data: listaA, error: errorLista } = await rest(a.jwt, "/decks?select=id,name");
  exigir(!errorLista, `A no puede leer su propia lista: ${errorLista?.message ?? ""}`);
  exigir(listaA?.length === 1 && listaA[0].id === mazoA.id,
    `A no ve su propia fila (${listaA?.length ?? 0} filas), asi que nada de lo de abajo prueba nada`);
  check("3. la lista de un usuario tiene solo sus propios mazos", true);

  // ---- NON-VACUITY BANNER. If any of these is zero the run is red no matter what the checks say.
  const host = new URL(NEON_DATA_API_URL).host;
  console.log(`\nno-vacuidad: 3 usuarios creados | 1 fila de A visible para A | host ${host}\n`);
  exigir(host && a.id && b.id && c.id, "banner de no-vacuidad incompleto");

  // ---- NEGATIVE CHECKS.
  denegado("4. el otro usuario no puede leer esa fila ni sabiendo el id",
    await rest(b.jwt, `/decks?select=id&id=eq.${mazoA.id}`));

  denegado("5. el otro usuario no la puede renombrar",
    await rest(b.jwt, `/decks?id=eq.${mazoA.id}&select=id`, { method: "PATCH", body: JSON.stringify({ name: "stolen" }) }));

  denegado("6. el otro usuario no la puede borrar",
    await rest(b.jwt, `/decks?id=eq.${mazoA.id}&select=id`, { method: "DELETE" }));

  // Kept even though `user_id` now defaults to auth.uid(): a default does not stop a client from
  // sending a forged value, and the with-check is what refuses it.
  rechazado("7. el otro usuario no puede plantar una fila bajo el id ajeno",
    await guardar(b, "planted", { user_id: a.id }));

  const { data: sigue, error: errorSigue } = await rest(a.jwt, `/decks?select=id,name&id=eq.${mazoA.id}`);
  check("8. la fila del dueno sobrevivio todo eso sin cambios",
    !errorSigue && sigue?.[0]?.name === "A's deck", errorSigue?.message ?? sigue?.[0]?.name ?? "no esta");

  denegado("9. un visitante sin sesion no lee nada", await rest(null, "/decks?select=id"));

  // ---- THE TWO CHECKS NEON NEEDS AND SUPABASE DID NOT.
  const { data: listaC, error: errorC } = await rest(c.jwt, "/decks?select=id");
  check("15. un usuario sin filas recibe una lista vacia, no un error",
    errorC === null && Array.isArray(listaC) && listaC.length === 0,
    errorC ? `${errorC.code ?? "?"}: ${errorC.message ?? ""}` : `${listaC?.length ?? "?"} filas`);

  // The one that stops checks 1-8 from passing on a database where every policy is accidentally
  // `true`. Insert WITHOUT user_id and let the column default fill it: if what lands is C's own sub,
  // then auth.uid() really is reading the presented token and the policies are keyed to it.
  const { data: propias, error: errorPropias } = await guardar(c, "C's deck");
  check("16. auth.uid() dentro de la policy es el sub del token presentado",
    !errorPropias && propias?.[0]?.user_id === c.id,
    errorPropias?.message ?? `user_id=${propias?.[0]?.user_id ?? "?"} sub=${c.id}`);

  // ---- ACCOUNT DELETION. Runs last: it ends B's session.
  const sinSesion = await fetch(DELETE_ACCOUNT_URL, { method: "POST" });
  check("10. un visitante sin sesion no puede llamar a delete-account",
    !sinSesion.ok, sinSesion.ok ? `la llamada fue aceptada (${sinSesion.status})` : "");

  const propia = await fetch(DELETE_ACCOUNT_URL, { method: "POST", headers: { Authorization: `Bearer ${b.jwt}` } });
  check("11. un usuario logueado puede borrar su propia cuenta", propia.ok, propia.ok ? "" : `${propia.status}`);

  // The fifth hiding place of the vacuity bug, and it needs a DIFFERENT fix from `denegado()`:
  // deleting the user is exactly what makes this lookup answer 404, so demanding a clean response
  // would fail the success case. Two shapes mean gone -- 200 with no user, or 404 -- and everything
  // else is named, so an auth or network error can never again read as proof of deletion.
  const consulta = await fetch(`${MANAGEMENT}/${b.id}`, { headers: { Authorization: `Bearer ${NEON_API_KEY}` } });
  const cuerpo = consulta.ok ? await consulta.json().catch(() => null) : null;
  const seFue = consulta.status === 404 || (consulta.ok && !cuerpo?.id);
  check("12. esa cuenta realmente no esta", seFue,
    !seFue && !consulta.ok ? `no se pudo saber: ${consulta.status}` : seFue ? "" : "sigue ahi");

  const otra = await fetch(`${MANAGEMENT}/${a.id}`, { headers: { Authorization: `Bearer ${NEON_API_KEY}` } });
  check("13. borrar una cuenta deja a la otra en paz", otra.ok);

  const { data: mazosA, error: errorMazos } = await rest(a.jwt, `/decks?select=id&id=eq.${mazoA.id}`);
  check("14. y deja los mazos del otro usuario en paz",
    !errorMazos && mazosA?.length === 1, errorMazos?.message ?? `${mazosA?.length ?? 0} filas`);
} finally {
  for (const u of [a, b, c]) await borrarUsuario(u.id).catch(() => {});
  console.log("limpieza: los tres usuarios de prueba fueron borrados");
}

process.exit(fallas ? 1 : 0);

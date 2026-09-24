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
//   NEON_DATA_API_URL=... NEON_AUTH_URL=... NEON_PROJECT_ID=... NEON_BRANCH_ID=... \
//     node scripts/check-rls-neon.mjs
//
// NO KEY IS HANDLED. The four values above are public coordinates (the two URLs ship in the browser
// bundle). The two things that need operator rights -- deleting the test users at the end, and
// reading the foreign key and the victim's row count in SQL (checks 17 and 18) -- go through
// `neonctl`, which is already authenticated on the operator's machine, so no secret ever enters an
// environment variable or a transcript (the posture rc-neon2 established, 2026-09-21).
//
// Cleanup goes through `neonctl neon-auth user delete` and NOT through `public.delete_account()` on
// purpose: tidying up through the code path being verified would let a broken delete_account erase
// its own evidence.
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
} = process.env;

const faltan = Object.entries({
  NEON_DATA_API_URL, NEON_AUTH_URL, NEON_PROJECT_ID, NEON_BRANCH_ID,
}).filter(([, v]) => !v).map(([k]) => k);

if (faltan.length) {
  // Exit 2, not 0. A run that could not test deletion must never read as a green run: checks 10-13
  // are the ones guarding a published privacy promise, and skipping them silently is the same class
  // of lie as a vacuous check.
  console.error(`faltan en el entorno: ${faltan.join(", ")}`);
  process.exit(2);
}

import { execFileSync } from "node:child_process";

/** `neonctl <head> --project-id … --branch … <tail>`; the tail is what follows psql's `--`. */
const neonctl = (head, tail = []) => execFileSync("neonctl",
  [...head, "--project-id", NEON_PROJECT_ID, "--branch", NEON_BRANCH_ID, ...tail],
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

/** One SQL value, as the table owner. Only for what RLS rightly hides from every Data API caller. */
const sql = (query) => neonctl(["psql", "--role-name", "neondb_owner"], ["--", "-Atc", query])
  .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("INFO"))[0] ?? "";

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

/**
 * A NEGATIVE check on a request that carries NO credentials at all.
 *
 * Measured against the real Data API, not assumed: it answers 400 with
 * `{"message":"missing authentication credentials: ...","code":null}`. The gateway refuses the
 * request before PostgREST ever sees it, which is why `code` is null and why none of the PGRST*
 * codes apply here. That is STRICTER than RLS filtering, not weaker -- but it is a different shape,
 * and `denegado()` is right to call it a broken request rather than a denial.
 *
 * Two shapes are accepted and each is named: the identified gateway refusal, or a 200 with zero
 * rows should Neon ever start admitting anonymous callers as the `anonymous` role. Anything else --
 * a 503, a missing table, rows -- fails.
 *
 * This helper is NOT self-sufficient and must not be used alone: the gateway rejects a
 * credential-less request before it looks at the table, so a database with no `decks` table answers
 * exactly the same 400. The caller pairs it with a positive control on the identical URL.
 */
const RECHAZOS_DE_LA_PUERTA = [
  "missing authentication credentials",
  "not a valid JWT encoding",
  "missing key id",
];

const sinCredenciales = (nombre, { data, error, status }) => {
  if (!error) {
    if (!Array.isArray(data)) {
      return check(nombre, false, `respuesta inesperada sin error, vino ${typeof data} (${status})`);
    }
    return check(nombre, data.length === 0, `${data.length} filas`);
  }
  const mensaje = String(error.message ?? "");
  const reconocido = (status === 400 || status === 401) && RECHAZOS_DE_LA_PUERTA.some((r) => mensaje.includes(r));
  check(nombre, reconocido, reconocido ? "" : `rechazo no reconocido (${status} ${error.code ?? "sin code"}: ${mensaje})`);
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

  return { id: sub(jwt), jwt, email, password, cookie: login.headers.get("set-cookie") ?? "" };
}

const borrarUsuario = async (id) => { neonctl(["neon-auth", "user", "delete", id]); };

const guardar = (u, nombre, extra = {}) => rest(u.jwt, "/decks", {
  method: "POST",
  body: JSON.stringify({ name: nombre, deck_text: "1 Lux, Illuminated", format: "constructed", ...extra }),
});

const a = await crearUsuario("a");
const b = await crearUsuario("b");
const c = await crearUsuario("c");

// Mutable, because check 12 proves the deletion by signing the freed email UP AGAIN, and the
// account that creates has to be cleaned up like the other three.
const creados = [a, b, c];

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

  // ---- 17. THE FOREIGN KEY. The cascade is what makes account deletion remove every deck, which is
  // ---- the published privacy promise; a Neon-side re-creation of neon_auth would take it silently.
  const fk = sql("select pg_get_constraintdef(oid) from pg_constraint where conname = 'decks_user_id_fkey'");
  check("17. la FK de decks a neon_auth.user existe y borra en cascada",
    fk.includes('REFERENCES neon_auth."user"(id) ON DELETE CASCADE'), fk || "no existe");

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

  // The url is A's own row rather than the whole table, and it is requested TWICE: once with A's
  // token and once with none. The authenticated call is a positive control and it throws, because
  // the gateway refuses a credential-less request BEFORE it looks at the table -- a database with no
  // `decks` table answers the anonymous call with the very same 400. Proving that this exact url
  // returns the row when a token is attached is what makes the refusal mean "no credentials" rather
  // than "nothing here to read".
  const rutaDelVisitante = `/decks?select=id&id=eq.${mazoA.id}`;
  const { data: conToken, error: errorConToken } = await rest(a.jwt, rutaDelVisitante);
  exigir(!errorConToken && conToken?.length === 1,
    `el control de la verificacion 9 no vale: con token la misma url devolvio ${errorConToken?.message ?? `${conToken?.length ?? 0} filas`}`);

  sinCredenciales("9. un visitante sin sesion no lee nada", await rest(null, rutaDelVisitante));

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
  //
  // There is NO endpoint. Deleting an account is `public.delete_account()`, a SECURITY DEFINER
  // function reached through the Data API's rpc path -- the same shape the Supabase original used,
  // so no secret rides in the browser and none sits in a deployed function either.
  // neon/migrations/0002_delete_account.sql records why the three endpoint routes were rejected.
  const borrarCuenta = (jwt) => rest(jwt, "/rpc/delete_account", { method: "POST", body: "{}" });

  // Both calls are made before either is judged, because 10 is only meaningful if 11 worked: the
  // gateway refuses a credential-less caller BEFORE it looks up the function, so "400 missing
  // credentials" is also the answer a database with no `delete_account` would give. 11 succeeding
  // on the identical path is what makes the refusal mean "no credentials" and not "no function".
  const registrar = (u) => fetch(`${NEON_AUTH_URL}/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: new URL(NEON_AUTH_URL).origin },
    body: JSON.stringify({ email: u.email, password: u.password, name: "rls otra vez", callbackURL: new URL(NEON_AUTH_URL).origin }),
  });

  // The first half of check 12's flip, taken WHILE B still exists. It throws: if the endpoint does
  // not say USER_ALREADY_EXISTS here, then the 200 it gives after the delete proves nothing, and
  // check 12 would be reporting on a sign-up endpoint rather than on a deletion.
  const ocupado = await registrar(b);
  exigir(ocupado.status === 422,
    `el control de la verificacion 12 no vale: dar de alta el email de B mientras B existe devolvio ${ocupado.status}, se esperaba 422`);

  // 18's BEFORE half: B's rows are counted while B exists, so "zero after" cannot mean "there were
  // never any" -- without it, deleted-nothing and deleted-everything read the same.
  const filasDeBAntes = sql(`select count(*) from public.decks where user_id = '${b.id}'`);
  exigir(filasDeBAntes === "1", `el control de la verificacion 18 no vale: B tenia ${filasDeBAntes} filas antes de borrarse, se esperaba 1`);

  const anonima = await borrarCuenta(null);
  const propia = await borrarCuenta(b.jwt);

  check("11. un usuario logueado puede borrar su propia cuenta",
    !propia.error && (propia.status === 204 || propia.status === 200),
    propia.error ? `${propia.status} ${propia.error.code ?? "sin code"}: ${propia.error.message ?? ""}` : "");

  sinCredenciales("10. un visitante sin sesion no puede borrar una cuenta", anonima);

  // Proving the account is GONE. The Management API cannot answer this: it has no GET for a single
  // user -- measured, that path returns 405, not 404 -- so the lookup this check used to do could
  // never have worked, and a 405 misread as "not found" would have been a green light for nothing.
  //
  // Signing in again as the deleted user was the next idea and it is WRONG: Neon Auth rate-limits
  // sign-in, and the first run of this file proved it by answering 429 to a user that had NOT been
  // deleted. A 429 is indistinguishable from a refusal, so that probe would have called a live
  // account gone the moment the run got slightly too fast.
  //
  // So the probe is the email itself, and it is the same request before and after, required to
  // FLIP. While the account exists the endpoint answers 422 USER_ALREADY_EXISTS; once the row is
  // gone the address is free and the very same call succeeds. The 422 is taken first and throws,
  // which is what makes the 200 mean "the row is gone" instead of "sign-up is broken today" -- a
  // broken endpoint cannot produce the flip, only one of the two halves.
  // A is untouched, so A's session must still resolve. This is check 13 and it is also the control
  // that stops 12 from passing on an auth service that is simply down.
  const sesionDeA = await fetch(`${NEON_AUTH_URL}/get-session`, { headers: { Cookie: a.cookie } });
  const cuerpoDeA = await sesionDeA.text();
  exigir(sesionDeA.status === 200 && cuerpoDeA !== "null" && Boolean(sesionDeA.headers.get("Set-Auth-Jwt")),
    `el control de las verificaciones 12 y 13 no vale: la sesion de A, que no fue borrada, no resuelve (${sesionDeA.status} ${cuerpoDeA.slice(0, 60)})`);
  check("13. borrar una cuenta deja a la otra en paz", true);

  // B's session should have gone with the row: neon_auth.session has an ON DELETE CASCADE onto the
  // user. Measured shape after a delete: 200 with the body `null` and no Set-Auth-Jwt header.
  const sesionDeB = await fetch(`${NEON_AUTH_URL}/get-session`, { headers: { Cookie: b.cookie } });
  const cuerpoDeB = await sesionDeB.text();
  const sesionSeFue = sesionDeB.status === 200 && cuerpoDeB === "null" && !sesionDeB.headers.get("Set-Auth-Jwt");

  const reintento = await registrar(b);
  if (reintento.ok) {
    const cuerpo = await reintento.json().catch(() => null);
    if (cuerpo?.user?.id) creados.push({ id: cuerpo.user.id });
  }
  // The detail is built ONLY when the check fails. A passing line that still prints "the session
  // survived" reads like a warning nobody has to act on, and this file is in the business of making
  // its own output mean exactly one thing.
  const seFue = reintento.status === 200 && sesionSeFue;
  check("12. esa cuenta realmente no esta", seFue, seFue ? "" :
    reintento.status === 422
      ? "el alta con el mismo email sigue dando USER_ALREADY_EXISTS: la fila no se borro"
      : reintento.status !== 200
        ? `el alta con el email liberado no fue aceptada (${reintento.status}), asi que no prueba nada`
        : `la sesion de la cuenta borrada todavia resuelve (${sesionDeB.status} ${cuerpoDeB.slice(0, 40)})`);

  const filasDeBDespues = sql(`select count(*) from public.decks where user_id = '${b.id}'`);
  check("18. los mazos de la cuenta borrada se fueron con ella (1 antes, 0 despues)",
    filasDeBDespues === "0", `${filasDeBDespues} filas despues`);

  const { data: mazosA, error: errorMazos } = await rest(a.jwt, `/decks?select=id&id=eq.${mazoA.id}`);
  check("14. y deja los mazos del otro usuario en paz",
    !errorMazos && mazosA?.length === 1, errorMazos?.message ?? `${mazosA?.length ?? 0} filas`);
} finally {
  for (const u of creados) await borrarUsuario(u.id).catch(() => {});
  console.log(`limpieza: los ${creados.length} usuarios de prueba fueron borrados`);
}

process.exit(fallas ? 1 : 0);

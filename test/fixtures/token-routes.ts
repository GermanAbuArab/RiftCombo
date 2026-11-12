// Two token routes for `test/api-routes.test.ts` to prove its own harness on (#585): one that refuses
// without its credential, and one that answers 200 to anybody. RiftCombo deploys no token route
// today, so without these the token half of check 1 would pass by never running.

const authorized = (request: Request, expected: string | undefined): boolean =>
  Boolean(expected) && request.headers.get("authorization") === `Bearer ${expected}`;

export const guarded = {
  async GET(request: Request): Promise<Response> {
    if (!authorized(request, process.env["FIXTURE_TOKEN"])) return new Response("no", { status: 401 });
    return fetch("https://upstream.invalid/guarded");
  },
};

export const open = {
  async GET(): Promise<Response> {
    return new Response("ok", { status: 200 });
  },
};

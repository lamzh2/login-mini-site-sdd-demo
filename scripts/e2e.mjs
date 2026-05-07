const baseUrl = process.env.E2E_BASE_URL;

if (!baseUrl) {
  console.error("E2E_BASE_URL is required.");
  process.exit(1);
}

const unique = Date.now();
const email = `sdd-e2e-${unique}@example.com`;
const password = "CorrectHorse123!";
const safeName = `<script>alert(${unique})</script>`;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function get(path, cookie = "") {
  return fetch(`${baseUrl}${path}`, {
    redirect: "manual",
    headers: cookie ? { cookie } : {}
  });
}

async function post(path, data, cookie = "") {
  const body = new URLSearchParams(data);
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    redirect: "manual",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      ...(cookie ? { cookie } : {})
    },
    body
  });
}

function sessionCookie(response) {
  const raw = response.headers.get("set-cookie") ?? "";
  const match = raw.match(/login-mini-session=[^;]+/);
  return match?.[0] ?? "";
}

const home = await get("/");
assert(home.status === 200, `GET / expected 200, got ${home.status}`);

const registerPage = await get("/register");
assert(registerPage.status === 200, `GET /register expected 200, got ${registerPage.status}`);

const loginPage = await get("/login");
assert(loginPage.status === 200, `GET /login expected 200, got ${loginPage.status}`);

const dashboardAnon = await get("/dashboard");
assert([303, 307, 308].includes(dashboardAnon.status), `GET /dashboard anonymous expected redirect, got ${dashboardAnon.status}`);
assert((dashboardAnon.headers.get("location") ?? "").includes("/login"), "Anonymous dashboard should redirect to login.");

const anonymousMe = await get("/api/me");
assert(anonymousMe.status === 401, `GET /api/me anonymous expected 401, got ${anonymousMe.status}`);

const emptyRegister = await post("/api/register", { name: "", email: "", password: "" });
assert(emptyRegister.status === 400, `Empty register expected 400, got ${emptyRegister.status}`);
assert((await emptyRegister.text()).includes("Name is required."), "Empty register must show validation message.");

const register = await post("/api/register", { name: safeName, email, password });
assert(register.status === 201, `Register expected 201, got ${register.status}`);
const registerCookie = sessionCookie(register);
assert(registerCookie, "Register must set session cookie.");

const me = await get("/api/me", registerCookie);
assert(me.status === 200, `GET /api/me authenticated expected 200, got ${me.status}`);
assert((await me.text()).includes(email), "GET /api/me must return the authenticated email.");

const dashboard = await get("/dashboard", registerCookie);
assert(dashboard.status === 200, `Authenticated dashboard expected 200, got ${dashboard.status}`);
const dashboardHtml = await dashboard.text();
assert(dashboardHtml.includes("&lt;script&gt;alert"), "Dashboard must escape script-like user name.");
assert(!dashboardHtml.includes("<script>alert"), "Dashboard must not render raw script-like user name.");

const logout = await post("/api/logout", {}, registerCookie);
assert(logout.status === 200, `Logout expected 200, got ${logout.status}`);

const loginBad = await post("/api/login", { email, password: "wrong-password" });
assert(loginBad.status === 401, `Bad login expected 401 with generic message, got ${loginBad.status}`);
assert((await loginBad.text()).includes("Email or password is incorrect."), "Bad login must show generic message.");

const loginGood = await post("/api/login", { email, password });
assert(loginGood.status === 200, `Good login expected 200, got ${loginGood.status}`);
const loginCookie = sessionCookie(loginGood);
assert(loginCookie, "Good login must set session cookie.");

console.log(JSON.stringify({
  status: "E2E_PASSED",
  baseUrl,
  checks: [
    "GET /",
    "GET /register",
    "GET /login",
    "GET /dashboard anonymous redirect",
    "GET /api/me anonymous rejection",
    "POST /api/register empty rejection",
    "POST /api/register",
    "GET /api/me authenticated",
    "GET /dashboard authenticated",
    "XSS-safe name rendering",
    "POST /api/logout",
    "POST /api/login bad generic error",
    "POST /api/login good"
  ]
}, null, 2));

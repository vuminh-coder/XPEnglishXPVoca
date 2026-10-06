import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "xp_english_xp_voca_jwt_secret_key_2026";

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function signAuthToken(payload, expiresInDays = 30) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInDays * 24 * 60 * 60;

  const fullPayload = {
    ...payload,
    iat: now,
    exp,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

async function run() {
  const base = process.env.BASE_URL || "http://localhost:3000";

  // 1. First test register or login with a test account
  const testUser = {
    email: `test_audit_${Date.now()}@example.com`,
    password: "Password123!",
    fullName: "Audit Tester",
    username: `tester_${Date.now()}`,
  };

  console.log("== 1. Testing Registration ==");
  const regRes = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testUser),
  });
  const regData = await regRes.json();
  console.log("Register response status:", regRes.status, regData.success ? "SUCCESS" : regData.error);

  let sessionToken = "";
  const setCookie = regRes.headers.get("set-cookie");
  if (setCookie) {
    const match = setCookie.match(/xp_voca_session=([^;]+)/);
    if (match) sessionToken = match[1];
  }

  if (!sessionToken && regData.user?.id) {
    sessionToken = signAuthToken({ userId: regData.user.id, email: regData.user.email });
  }

  if (!sessionToken) {
    // Fallback: try login
    console.log("== Trying login fallback ==");
    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testUser.email, password: testUser.password }),
    });
    const loginCookie = loginRes.headers.get("set-cookie");
    if (loginCookie) {
      const match = loginCookie.match(/xp_voca_session=([^;]+)/);
      if (match) sessionToken = match[1];
    }
  }

  console.log("Session token available:", !!sessionToken);

  const cookieHeader = sessionToken ? `xp_voca_session=${sessionToken}` : "";

  const protectedEndpoints = [
    "/api/auth/me",
    "/api/user/vocab",
    "/api/user/profile",
    "/api/dashboard/overview",
    "/api/user/daily-checkin",
    "/api/user/challenges",
    "/api/user/analytics",
    "/api/study-plan/current",
    "/api/shop/inventory",
    "/api/subscription/status",
    "/api/subscription/history",
    "/api/friends",
    "/api/friends/requests",
    "/api/friends/suggestions",
    "/api/exams/attempts",
    "/api/exams/stats",
  ];

  console.log("\n== 2. Testing Protected Endpoints with Auth Cookie ==");
  let failures = 0;
  for (const ep of protectedEndpoints) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${base}${ep}`, {
        headers: { cookie: cookieHeader },
      });
      const ms = Date.now() - t0;
      const ok = res.status >= 200 && res.status < 400;
      if (!ok) failures++;
      console.log(`${ok ? "PASS" : "FAIL"} [${res.status}] ${String(ms).padStart(5)}ms ${ep}`);
    } catch (err) {
      failures++;
      console.log(`FAIL [ERR] ${ep} - ${err.message} (cause: ${err.cause?.message || err.cause?.code || err.cause || "none"})`);
    }
  }

  console.log(`\nResult: ${protectedEndpoints.length - failures}/${protectedEndpoints.length} protected endpoints passed.`);
  process.exit(failures > 0 ? 1 : 0);
}

run();

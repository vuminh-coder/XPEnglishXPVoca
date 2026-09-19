async function benchmark() {
  console.log("=== API Performance & Data Size Benchmark ===");
  const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

  const endpoints = [
    { name: "1. Dashboard Overview", path: "/api/dashboard/overview" },
    { name: "2. Leaderboard (week)", path: "/api/leaderboard?period=week" },
    { name: "3. Leaderboard (all-time)", path: "/api/leaderboard?period=all" },
    { name: "4. Friends List", path: "/api/friends" },
    { name: "5. Listening Lessons", path: "/api/listening/lessons" },
    { name: "6. User Vocab", path: "/api/user/vocab" },
    { name: "7. Study Rooms", path: "/api/study-rooms" },
    { name: "8. Community Posts", path: "/api/posts" },
  ];

  for (const ep of endpoints) {
    console.log(`\nTesting ${ep.name} (${ep.path}):`);
    for (let i = 1; i <= 3; i++) {
      const t0 = performance.now();
      try {
        const res = await fetch(`${BASE_URL}${ep.path}`);
        const t1 = performance.now();
        const text = await res.text();
        const bytes = Buffer.byteLength(text, "utf8");
        const kb = (bytes / 1024).toFixed(1);

        let json;
        try {
          json = JSON.parse(text);
        } catch {
          json = null;
        }

        const count = Array.isArray(json?.data)
          ? `${json.data.length} items`
          : json?.data
          ? "object"
          : "raw";

        console.log(
          `   Run #${i}: ${(t1 - t0).toFixed(1)}ms | HTTP ${res.status} | Size: ${kb} KB | Data: ${count}`
        );
      } catch (err) {
        console.log(`   Run #${i}: Failed to connect (${err.message})`);
      }
    }
  }
}

benchmark().catch(console.error);

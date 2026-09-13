async function benchmark() {
  console.log("=== API Performance Benchmark ===");
  
  // 1. Dashboard Overview
  console.log("\n1. Testing /api/dashboard/overview (1 consolidated request):");
  for (let i = 1; i <= 3; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3000/api/dashboard/overview");
    const t1 = performance.now();
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.log(`   HTTP ${res.status}: ${text.slice(0, 300)}`);
      continue;
    }
    console.log(`   Run #${i}: ${(t1 - t0).toFixed(1)}ms | HTTP ${res.status} | Success: ${json.success}`);
  }

  // 2. Leaderboard with In-Memory TTL Cache
  console.log("\n2. Testing /api/leaderboard?period=week (with TTL cache):");
  for (let i = 1; i <= 3; i++) {
    const t0 = performance.now();
    const res = await fetch("http://localhost:3000/api/leaderboard?period=week");
    const t1 = performance.now();
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.log(`   HTTP ${res.status}: ${text.slice(0, 300)}`);
      continue;
    }
    console.log(`   Run #${i}: ${(t1 - t0).toFixed(1)}ms | HTTP ${res.status} | Items: ${json.data?.length}`);
  }
}

benchmark().catch(console.error);

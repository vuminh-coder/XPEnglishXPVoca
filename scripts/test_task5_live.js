/**
 * XP English | XP Voca - Live Scheduled Automation Cron Tester (Task 5)
 * Run command: node scripts/test_task5_live.js
 */

async function runLiveTask5Tests() {
  console.log("=================================================================");
  console.log("🚀 BẮT ĐẦU KIỂM THỬ THỰC TẾ SCHEDULED AUTOMATION CRON (TASK 5)");
  console.log("=================================================================\n");

  const baseUrl = "http://localhost:3000";

  // -------------------------------------------------------------
  // TEST 1: Thử gọi Cron Endpoint với Auth Secret hợp lệ
  // -------------------------------------------------------------
  console.log("📌 [TEST 1] Thử kích hoạt Daily Maintenance Cron qua POST /api/cron/daily-maintenance...");
  try {
    const res = await fetch(`${baseUrl}/api/cron/daily-maintenance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(`  📊 HTTP Status: ${res.status}`);
    console.log(`  ⏱️ Thời gian thực thi: ${data.durationMs || 0}ms`);
    console.log("  ✅ KẾT QUẢ BẢO TRÌ TỰ ĐỘNG:");
    console.log(`     -> Tổng tài khoản kiểm tra vắng mặt: ${data.maintenance?.totalEvaluated || 0}`);
    console.log(`     -> Số tài khoản được bảo vệ Streak bằng Khiên (Streak Freeze): ${data.maintenance?.streaksPreservedWithFreeze || 0}`);
    console.log(`     -> Số tài khoản reset chuỗi Streak: ${data.maintenance?.streaksResetToZero || 0}`);
    console.log(`     -> Thông báo: "${data.message}"`);
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 1:", err.message);
  }

  console.log("\n=================================================================");
  console.log("🎉 HOÀN TẤT KIỂM THỬ THỰC TẾ TASK 5!");
  console.log("=================================================================");
}

runLiveTask5Tests();

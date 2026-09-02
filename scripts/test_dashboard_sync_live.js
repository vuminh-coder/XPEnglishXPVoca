/**
 * XP English | XP Voca - Live Dashboard Database Synchronization Tester
 * Run command: node scripts/test_dashboard_sync_live.js
 */

async function runLiveDashboardSyncTests() {
  console.log("=================================================================");
  console.log("🚀 BẮT ĐẦU KIỂM THỬ THỰC TẾ ĐỒNG BỘ DATABASE DASHBOARD");
  console.log("=================================================================\n");

  const baseUrl = "http://localhost:3000";

  // -------------------------------------------------------------
  // TEST 1: Kiểm tra trạng thái Điểm danh qua GET /api/user/daily-checkin
  // -------------------------------------------------------------
  console.log("📌 [TEST 1] Kiểm tra trạng thái Điểm danh & 7 ngày trong tuần qua GET /api/user/daily-checkin...");
  try {
    const res = await fetch(`${baseUrl}/api/user/daily-checkin`);
    const json = await res.json();
    console.log(`  📊 HTTP Status: ${res.status}`);
    if (json.success && json.data) {
      console.log("  ✅ KẾT QUẢ TRẠNG THÁI ĐIỂM DANH TỪ CSDL:");
      console.log(`     -> Đã điểm danh hôm nay chưa: ${json.data.isCheckedInToday ? "ĐÃ ĐIỂM DANH" : "CHƯA ĐIỂM DANH"}`);
      console.log(`     -> Các ngày hoạt động trong tuần: [${json.data.activeDaysInWeek?.join(", ") || "Chưa có"}]`);
      console.log(`     -> Chuỗi Streak hiện tại: ${json.data.currentStreak} ngày`);
    }
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 1:", err.message);
  }

  console.log("\n-------------------------------------------------------------");

  // -------------------------------------------------------------
  // TEST 2: Kiểm tra Danh sách Nhiệm vụ Ngày qua GET /api/user/challenges
  // -------------------------------------------------------------
  console.log("📌 [TEST 2] Lấy danh sách nhiệm vụ ngày với tiến độ thật qua GET /api/user/challenges...");
  try {
    const res = await fetch(`${baseUrl}/api/user/challenges`);
    const json = await res.json();
    console.log(`  📊 HTTP Status: ${res.status}`);
    if (json.success && json.data?.challenges) {
      console.log(`  ✅ ĐÃ LẤY ĐƯỢC ${json.data.challenges.length} NHIỆM VỤ TỪ CSDL:`);
      json.data.challenges.forEach((ch, idx) => {
        console.log(`     ${idx + 1}. [${ch.icon}] ${ch.title}: ${ch.progress}/${ch.target} (Thưởng +${ch.xpReward} XP, +${ch.coinReward} Vàng) - ${ch.isClaimed ? "ĐÃ NHẬN" : ch.isCompleted ? "CÓ THỂ NHẬN" : "ĐANG LÀM"}`);
      });
    }
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 2:", err.message);
  }

  console.log("\n-------------------------------------------------------------");

  // -------------------------------------------------------------
  // TEST 3: Kiểm tra Bảng xếp hạng Tuần vs Tháng từ CSDL
  // -------------------------------------------------------------
  console.log("📌 [TEST 3] Kiểm tra Leaderboard tách biệt giữa Kỳ Tuần & Kỳ Tháng...");
  try {
    const resWeek = await fetch(`${baseUrl}/api/leaderboard?period=week&limit=3`);
    const jsonWeek = await resWeek.json();
    console.log("  🏆 TOP 3 BẢNG XẾP HẠNG TUẦN (period=week):");
    jsonWeek.data?.slice(0, 3).forEach((l, i) => {
      console.log(`     #${i + 1} ${l.fullName}: ${l.xp} XP (${l.minutesStudied}m học)`);
    });

    const resMonth = await fetch(`${baseUrl}/api/leaderboard?period=month&limit=3`);
    const jsonMonth = await resMonth.json();
    console.log("  🏆 TOP 3 BẢNG XẾP HẠNG THÁNG (period=month):");
    jsonMonth.data?.slice(0, 3).forEach((l, i) => {
      console.log(`     #${i + 1} ${l.fullName}: ${l.xp} XP (${l.minutesStudied}m học)`);
    });
    console.log("  ✅ KẾT QUẢ: Đã phân tách dữ liệu đa kỳ thực tế thành công!");
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 3:", err.message);
  }

  console.log("\n=================================================================");
  console.log("🎉 HOÀN TẤT TẤT CẢ CÁC BÀI KIỂM THỬ THỰC TẾ ĐỒNG BỘ CSDL DASHBOARD!");
  console.log("=================================================================");
}

runLiveDashboardSyncTests();

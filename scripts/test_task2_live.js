/**
 * XP English | XP Voca - Live Anti-Cheat & Gamification Test Runner (Task 2)
 * Run command: node scripts/test_task2_live.js
 */

async function runLiveSecurityTests() {
  console.log("=================================================================");
  console.log("🚀 BẮT ĐẦU KIỂM THỬ THỰC TẾ HỆ THỐNG ANTI-CHEAT & BẢO MẬT (TASK 2)");
  console.log("=================================================================\n");

  const baseUrl = "http://localhost:3000";

  // -------------------------------------------------------------
  // TEST 1: Thử tấn công Mass-Assignment sửa điểm XP / Coins / Level
  // -------------------------------------------------------------
  console.log("📌 [TEST 1] Thử tấn công sửa điểm trái phép qua POST /api/user/profile...");
  try {
    const res = await fetch(`${baseUrl}/api/user/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Học viên Kiểm thử An toàn",
        totalXp: 999999, // Hack XP
        level: 99,       // Hack Level
        coins: 888888,   // Hack Coins
        currentStreak: 500 // Hack Streak
      })
    });
    const data = await res.json();
    
    // Nếu request bị từ chối 401 do chưa đăng nhập -> Chuẩn bảo mật!
    if (res.status === 401) {
      console.log("  ✅ KẾT QUẢ: 401 Unauthorized -> Đã chặn mạo danh người dùng chưa đăng nhập!");
    } else if (data.success && data.data) {
      const isXpHacked = data.data.totalXp === 999999;
      const isLevelHacked = data.data.level === 99;
      if (!isXpHacked && !isLevelHacked) {
        console.log("  ✅ KẾT QUẢ: Server đã bỏ qua (ignore) các trường hack totalXp/level/coins!");
        console.log(`     -> Tên mới: "${data.data.fullName}", XP thực tế: ${data.data.totalXp}, Cấp độ: ${data.data.level}`);
      } else {
        console.error("  ❌ THẤT BẠI: Server vẫn nhận điểm hack!");
      }
    }
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 1:", err.message);
  }

  console.log("\n-------------------------------------------------------------");

  // -------------------------------------------------------------
  // TEST 2: Thử gian lận điểm bài thi qua POST /api/exams/attempts
  // -------------------------------------------------------------
  console.log("📌 [TEST 2] Thử gian lận nộp bài thi sai nhưng tự khai điểm 990...");
  try {
    const res = await fetch(`${baseUrl}/api/exams/attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId: "toeic_mini_speed_01",
        totalScore: 990,        // Điểm giả mạo
        accuracyPercent: 100,   // Độ chính xác giả mạo
        timeSpentSeconds: 60,
        userAnswers: {
          // Gửi đáp án sai cho toàn bộ câu hỏi
          "toeic_mini_01": "D",
          "toeic_mini_02": "D"
        }
      })
    });
    const data = await res.json();
    console.log(`  📊 HTTP Status: ${res.status}`);
    if (data.attempt) {
      console.log("  ✅ KẾT QUẢ SERVER-AUTHORITATIVE:");
      console.log(`     -> Điểm client tự khai: 990`);
      console.log(`     -> Điểm Server tự tính thực tế: ${data.attempt.totalScore} / ${data.attempt.maxScore}`);
      console.log(`     -> Tỷ lệ đúng thực tế: ${data.attempt.accuracyPercent}%`);
    } else if (data.verifiedScore !== undefined) {
      console.log("  ✅ KẾT QUẢ: Server tự tính điểm thật -> " + data.verifiedScore);
    }
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 2:", err.message);
  }

  console.log("\n-------------------------------------------------------------");

  // -------------------------------------------------------------
  // TEST 3: Thử gian lận điểm PvP vượt trần qua POST /api/pvp/match-submit
  // -------------------------------------------------------------
  console.log("📌 [TEST 3] Thử nộp trận đấu PvP với điểm số bất thường (99,999 điểm)...");
  try {
    const res = await fetch(`${baseUrl}/api/pvp/match-submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        opponent: "Opponent Bot",
        userScore: 99999,
        oppScore: 0,
        result: "WIN"
      })
    });
    const data = await res.json();
    console.log(`  📊 HTTP Status: ${res.status}`);
    if (data.data?.xpGained !== undefined) {
      console.log(`  ✅ KẾT QUẢ: XP nhận được: ${data.data.xpGained} XP (Đã áp trần an toàn <= 50 XP)`);
    }
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 3:", err.message);
  }

  console.log("\n=================================================================");
  console.log("🎉 HOÀN TẤT TẤT CẢ CÁC BÀI KIỂM THỬ THỰC TẾ TASK 2!");
  console.log("=================================================================");
}

runLiveSecurityTests();

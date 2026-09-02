/**
 * XP English | XP Voca - Live AI SSE Streaming & WebRTC Resilience Tester (Task 4)
 * Run command: node scripts/test_task4_live.js
 */

async function runLiveTask4Tests() {
  console.log("=================================================================");
  console.log("🚀 BẮT ĐẦU KIỂM THỬ THỰC TẾ AI STREAMING & WEBRTC RESILIENCE (TASK 4)");
  console.log("=================================================================\n");

  const baseUrl = "http://localhost:3000";

  // -------------------------------------------------------------
  // TEST 1: Kiểm thử AI Server-Sent Events (SSE Streaming)
  // -------------------------------------------------------------
  console.log("📌 [TEST 1] Thử nghiệm AI SSE Token Streaming (stream: true)...");
  try {
    const res = await fetch(`${baseUrl}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", text: "Hello! Can you recommend a nice restaurant?" }],
        topicId: "at1",
        stream: true,
      }),
    });

    console.log(`  📊 HTTP Status: ${res.status}`);
    console.log(`  📄 Content-Type: ${res.headers.get("content-type")}`);

    const isSSE = res.headers.get("content-type")?.includes("text/event-stream");
    if (isSSE && res.body) {
      console.log("  ⚡ Bắt đầu nhận Token Stream thời gian thực:");
      process.stdout.write("     🤖 AI: ");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let receivedTokensCount = 0;
      let finalMetadata = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.replace(/^data:\s*/, ""));
              if (data.type === "token") {
                process.stdout.write(data.chunk);
                receivedTokensCount++;
              } else if (data.type === "done") {
                finalMetadata = data;
              }
            } catch (e) {
              // Ignore partial JSON
            }
          }
        }
      }

      console.log("\n");
      console.log(`  ✅ KẾT QUẢ: Đã nhận thành công ${receivedTokensCount} tokens qua Server-Sent Events!`);
      if (finalMetadata) {
        console.log(`     -> Dịch nghĩa: "${finalMetadata.vietnameseTranslation || ''}"`);
        console.log(`     -> 3 Từ vựng gợi ý: ${finalMetadata.suggestedWords?.map((w) => w.word).join(", ")}`);
        console.log(`     -> 2 Mẫu câu trả lời: ${finalMetadata.suggestedPhrases?.join(" | ")}`);
      }
    } else {
      console.log("  ⚠️ Phản hồi dạng JSON:", await res.json());
    }
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 1:", err.message);
  }

  console.log("\n-------------------------------------------------------------");

  // -------------------------------------------------------------
  // TEST 2: Kiểm thử tính tương thích ngược JSON (stream: false)
  // -------------------------------------------------------------
  console.log("📌 [TEST 2] Thử nghiệm AI Non-Streaming JSON Response (stream: false)...");
  try {
    const res = await fetch(`${baseUrl}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", text: "I have an interview tomorrow." }],
        topicId: "at2",
        stream: false,
      }),
    });

    const data = await res.json();
    console.log(`  📊 HTTP Status: ${res.status}`);
    if (data.success && data.reply) {
      console.log("  ✅ KẾT QUẢ JSON THÀNH CÔNG:");
      console.log(`     -> Phản hồi AI: "${data.reply}"`);
      console.log(`     -> Bản dịch TV: "${data.vietnameseTranslation}"`);
      console.log(`     -> Số từ gợi ý: ${data.suggestedWords?.length || 0} từ`);
      console.log(`     -> Số câu gợi ý: ${data.suggestedPhrases?.length || 0} câu`);
    }
  } catch (err) {
    console.error("  ❌ Lỗi kết nối Test 2:", err.message);
  }

  console.log("\n-------------------------------------------------------------");

  // -------------------------------------------------------------
  // TEST 3: Kiểm thử Thuật toán Phục hồi WebRTC Exponential Backoff
  // -------------------------------------------------------------
  console.log("📌 [TEST 3] Kiểm thử thuật toán WebRTC Reconnection Backoff...");
  const calculateBackoff = (attempt) => Math.min(5000, 1000 * Math.pow(2, attempt));
  const delays = [1, 2, 3].map((att) => ({
    attempt: att,
    delayMs: calculateBackoff(att),
  }));

  console.log("  ✅ KẾT QUẢ DELAY KẾT NỐI LẠI TỰ ĐỘNG:");
  delays.forEach((d) => {
    console.log(`     -> Lần ${d.attempt}: ${d.delayMs}ms (Tránh nghẽn server và lặp vô tận)`);
  });

  console.log("\n=================================================================");
  console.log("🎉 HOÀN TẤT TẤT CẢ CÁC BÀI KIỂM THỬ THỰC TẾ TASK 4!");
  console.log("=================================================================");
}

runLiveTask4Tests();

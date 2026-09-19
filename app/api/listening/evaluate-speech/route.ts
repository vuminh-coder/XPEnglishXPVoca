import { NextResponse } from "next/server";

// Normalized Levenshtein distance string similarity algorithm
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;

  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null)
  );

  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const maxLength = Math.max(s1.length, s2.length);
  const distance = track[s2.length][s1.length];
  return Math.max(0, (maxLength - distance) / maxLength);
}

export async function POST(request: Request) {
  try {
    let targetText = "";
    let recognizedText = "";
    let durationSec = 5;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await request.json();
      targetText = body.targetText || "";
      recognizedText = body.recognizedText || "";
      durationSec = Number(body.durationSec) || 5;
    } else {
      const formData = await request.formData();
      targetText = (formData.get("targetText") as string) || "";
      recognizedText = (formData.get("recognizedText") as string) || "";
      durationSec = Number(formData.get("durationSec")) || 5;
    }

    if (!targetText) {
      return NextResponse.json({ success: false, error: "Thiếu targetText" }, { status: 400 });
    }

    const cleanTargetWords = targetText.trim().split(/\s+/);
    const cleanRecognizedWords = recognizedText.trim().split(/\s+/).filter(Boolean);

    // If learner was completely silent
    if (cleanRecognizedWords.length === 0) {
      const wordAccuracy = cleanTargetWords.map((word) => ({
        word,
        score: 0,
        status: "needs_work" as const,
      }));

      return NextResponse.json({
        success: true,
        data: {
          overallScore: 0,
          fluencyScore: 0,
          intonationScore: 0,
          pronunciationScore: 0,
          completenessScore: 0,
          speedWpm: 0,
          stressScore: 0,
          feedback: "Chưa phát hiện giọng nói rõ ràng. Hãy thử lại và đọc to, dứt khoát hơn nhé!",
          wordAccuracy,
          recognizedText: "",
        },
      });
    }

    // Positional Sequence Alignment & Scoring
    // Tracks consumed words to prevent word-order gaming or single-word repetition exploit
    let totalWordScore = 0;
    const usedRecIndices = new Set<number>();
    let lastMatchedRecIndex = -1;

    const wordAccuracy = cleanTargetWords.map((targetWord) => {
      const cleanTarget = targetWord.toLowerCase().replace(/[^a-z0-9]/g, "");
      
      let bestSim = 0;
      let bestRecIdx = -1;

      // Search unused recognized words with order-awareness
      cleanRecognizedWords.forEach((recWord, recIdx) => {
        if (usedRecIndices.has(recIdx)) return;

        const cleanRec = recWord.toLowerCase().replace(/[^a-z0-9]/g, "");
        const rawSim = calculateSimilarity(cleanTarget, cleanRec);

        // Apply gentle order distance penalty if spoken significantly out of order
        const orderDistance = Math.abs(recIdx - (lastMatchedRecIndex + 1));
        const orderPenalty = orderDistance > 3 ? 0.85 : 1.0;
        const adjustedSim = rawSim * orderPenalty;

        if (adjustedSim > bestSim) {
          bestSim = adjustedSim;
          bestRecIdx = recIdx;
        }
      });

      if (bestRecIdx !== -1 && bestSim >= 0.55) {
        usedRecIndices.add(bestRecIdx);
        lastMatchedRecIndex = Math.max(lastMatchedRecIndex, bestRecIdx);
      }

      let status: "perfect" | "good" | "needs_work" = "needs_work";
      let score = Math.round(bestSim * 100);

      if (bestSim >= 0.85) {
        status = "perfect";
        score = 95;
      } else if (bestSim >= 0.65) {
        status = "good";
        score = 80;
      } else {
        status = "needs_work";
        score = Math.max(30, Math.round(bestSim * 100));
      }

      totalWordScore += score;
      return { word: targetWord, score, status };
    });

    const pronunciationScore = Math.round(totalWordScore / cleanTargetWords.length);

    // Completeness (% of target words spoken)
    const matchedCount = wordAccuracy.filter((w) => w.status !== "needs_work").length;
    const completenessScore = Math.round((matchedCount / cleanTargetWords.length) * 100);

    // Fluency & Speaking Speed (Words Per Minute)
    const effectiveDurationMin = Math.max(0.05, durationSec / 60);
    const speedWpm = Math.round(cleanRecognizedWords.length / effectiveDurationMin);
    
    // Ideal native conversational WPM is 110 - 150 WPM
    let fluencyScore = 80;
    if (speedWpm >= 100 && speedWpm <= 160) {
      fluencyScore = 95;
    } else if (speedWpm >= 70 && speedWpm < 100) {
      fluencyScore = 85;
    } else if (speedWpm > 160) {
      fluencyScore = 75; // Speaking too fast / rushing
    } else {
      fluencyScore = Math.max(40, Math.round((speedWpm / 70) * 80));
    }

    // Intonation & Stress approximation based on completeness and syllable balance
    const stressScore = Math.round(pronunciationScore * 0.7 + fluencyScore * 0.3);
    const intonationScore = Math.round(pronunciationScore * 0.6 + completenessScore * 0.4);

    // Deterministic Overall Score (Weighted: 45% pronunciation, 25% fluency, 20% completeness, 10% intonation)
    const overallScore = Math.min(
      100,
      Math.max(
        10,
        Math.round(
          pronunciationScore * 0.45 +
          fluencyScore * 0.25 +
          completenessScore * 0.20 +
          intonationScore * 0.10
        )
      )
    );

    let feedback = "Phát âm khá tốt! Tiếp tục phát huy.";
    if (overallScore >= 90) {
      feedback = "Xuất sắc! Phát âm và ngữ điệu rất chuẩn xác, nối âm tự nhiên như người bản xứ.";
    } else if (overallScore >= 75) {
      feedback = "Khá tốt! Hãy chú ý các từ màu cam để phát âm rõ âm đuôi (ending sounds) và nhấn đúng trọng âm.";
    } else if (overallScore >= 50) {
      feedback = "Đã nhận diện được một phần câu. Hãy nghe lại âm mẫu và đọc theo tốc độ chậm hơn một chút nhé.";
    } else {
      feedback = "Cần luyện tập thêm: Hãy đọc to, rõ từng từ và hoàn thành đủ các chữ trong câu mẫu.";
    }

    return NextResponse.json({
      success: true,
      data: {
        overallScore,
        fluencyScore,
        intonationScore,
        pronunciationScore,
        completenessScore,
        speedWpm,
        stressScore,
        feedback,
        wordAccuracy,
        recognizedText,
      },
    });
  } catch (error) {
    console.error("Real AI Speech Evaluation Error:", error);
    return NextResponse.json({ success: false, error: "Lỗi xử lý đánh giá phát âm AI" }, { status: 500 });
  }
}

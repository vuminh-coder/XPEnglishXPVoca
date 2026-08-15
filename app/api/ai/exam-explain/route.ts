import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      questionText = "",
      options = [],
      correctAnswer = "A",
      userAnswer = "",
      passageText = "",
      transcriptText = "",
      explanation = "",
      examType = "TOEIC"
    } = body;

    if (!questionText) {
      return NextResponse.json(
        { error: "Thiếu dữ liệu câu hỏi để giải thích." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

    // Fallback if API key is not configured
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        data: {
          coreReason: explanation || `Đáp án chính xác là ${correctAnswer} theo đúng cấu trúc ngữ pháp và ngữ cảnh bài thi.`,
          trapAnalysis: "Các phương án khác là bẫy từ đồng âm hoặc trả lời sai trọng tâm câu hỏi.",
          keyVocabulary: [
            { word: "crucial", type: "adj", meaning: "quan trọng, cốt lõi" },
            { word: "implement", type: "verb", meaning: "triển khai, thực hiện" }
          ],
          grammarTip: "Hãy chú ý từ khóa chỉ thời gian và chủ ngữ để loại trừ nhanh các phương án gây nhiễu."
        }
      });
    }

    const prompt = `Bạn là Chuyên gia Luyện thi ${examType} và Giảng viên Ngôn ngữ Anh hàng đầu.
Hãy phân tích cực kỳ chuyên sâu và chi tiết câu hỏi thi sau đây bằng Tiếng Việt:

- Đề bài: "${questionText}"
${passageText ? `- Đoạn văn / Ngữ cảnh: "${passageText}"` : ""}
${transcriptText ? `- Lời thoại / Transcript: "${transcriptText}"` : ""}
- Các lựa chọn: ${JSON.stringify(options)}
- Đáp án ĐÚNG: "${correctAnswer}"
- Đáp án Thí sinh đã chọn: "${userAnswer || "Chưa chọn (Bỏ qua)"}"
- Lời giải gốc: "${explanation}"

Hãy trả về DUY NHẤT một chuỗi JSON hợp lệ (KHÔNG CÓ DẤU BACKTICKS \`\`\`json):
{
  "coreReason": "Giải thích chi tiết vì sao đáp án đúng là chính xác nhất dựa trên dẫn chứng cụ thể trong bài...",
  "trapAnalysis": "Phân tích cụ thể bẫy đề thi và lý do vì sao từng phương án sai lại gây nhầm lẫn...",
  "keyVocabulary": [
    { "word": "Từ vựng 1", "type": "noun/verb/adj", "meaning": "Nghĩa tiếng Việt và ví dụ" },
    { "word": "Từ vựng 2", "type": "noun/verb/adj", "meaning": "Nghĩa tiếng Việt và ví dụ" }
  ],
  "grammarTip": "Mẹo làm bài hoặc công thức ngữ pháp độc quyền giúp nhớ lâu dạng câu này."
}`;

    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];
    let parsedData = null;

    for (const modelName of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1000,
              responseMimeType: "application/json"
            }
          })
        });

        if (response.ok) {
          const resJson = await response.json();
          const rawText = resJson.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
          const cleanedText = rawText.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
          parsedData = JSON.parse(cleanedText);
          break;
        }
      } catch (e) {
        console.warn(`Model ${modelName} failed for exam explain, trying next...`);
      }
    }

    if (!parsedData) {
      parsedData = {
        coreReason: explanation || `Đáp án đúng là ${correctAnswer}.`,
        trapAnalysis: "Phân tích bẫy: Cần chú ý kỹ từ khóa và loại trừ đáp án gây nhiễu.",
        keyVocabulary: [
          { word: "key term", type: "noun", meaning: "thuật ngữ trọng tâm" }
        ],
        grammarTip: "Ghi nhớ cấu trúc ngữ pháp và mẹo nhận diện nhanh."
      };
    }

    return NextResponse.json({
      success: true,
      data: parsedData
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Lỗi xử lý phân tích AI" },
      { status: 500 }
    );
  }
}

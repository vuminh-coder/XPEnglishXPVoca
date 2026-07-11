import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { route, rating, category, comments } = await req.json();

    const prompt = `You are a Senior Product Designer & UI/UX Specialist. You need to provide an honest, constructive, and structured design critique of a web page on our English learning app.

User Feedback details:
- Page Route/URL: "${route || "General App"}"
- User Rating: ${rating || 5}/5 stars
- Category of Feedback: "${category || "General"}"
- User's Written Comments: "${comments || "No comments provided."}"

Apply the following UI/UX guidelines to your critique:
1. Spacing: Related elements should be grouped closely, unrelated elements further away.
2. Form Fields: External/floating labels should be used, complete box borders (no underlines only), clear placeholders.
3. Loading States: skeleton loading instead of generic loaders.
4. Button Hierarchy: Only one primary CTA per view, distinct secondary/ghost buttons.
5. Content overload: Long text needs "Read more".
6. Visual hierarchy: Key stats should be large and emphasized.
7. Mobile/Thumb zone: Crucial actions placed near the bottom.

Generate a structured critique in Vietnamese. Return ONLY a valid JSON object in this exact format:
{
  "score": "A-" (or A, B+, B, C, etc. based on the comments and rating),
  "summary": "Tóm tắt ngắn gọn tình trạng giao diện của trang này.",
  "pros": [
    "Điểm tốt 1",
    "Điểm tốt 2"
  ],
  "cons": [
    "Điểm cần cải thiện 1",
    "Điểm cần cải thiện 2"
  ],
  "recommendations": [
    "Khuyến nghị cụ thể 1",
    "Khuyến nghị cụ thể 2"
  ]
}

Ensure the response is ONLY the JSON string. Do not include markdown code blocks, backticks, or any other wrapper.`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ error: "AI service unavailable" }, { status: 502 });
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("UI Critique API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

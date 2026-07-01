import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Helper to calculate Levenshtein distance similarity
function getSimilarity(s1: string, s2: string): number {
  const len1 = s1.length;
  const len2 = s2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLength = Math.max(len1, len2);
  if (maxLength === 0) return 100;
  return Math.round((1 - distance / maxLength) * 100);
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { spokenText, targetText } = body;

    if (!spokenText || !targetText) {
      return NextResponse.json({ error: "Missing spokenText or targetText" }, { status: 400 });
    }

    const cleanSpoken = spokenText.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const cleanTarget = targetText.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    const score = getSimilarity(cleanSpoken, cleanTarget);
    const isCorrect = score >= 80; // Threshold of 80% similarity

    return NextResponse.json({
      success: true,
      score: score,
      isCorrect: isCorrect,
    });
  } catch (error: any) {
    console.error("POST /api/ai/pronunciation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
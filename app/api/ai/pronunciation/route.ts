import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

// Helper to calculate Levenshtein distance similarity
function getLevenshteinDistance(s1: string, s2: string): number {
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

  return matrix[len1][len2];
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { spokenText, targetText } = body;

    if (!spokenText || !targetText) {
      return NextResponse.json({ error: "Missing spokenText or targetText" }, { status: 400 });
    }

    // Clean and split words
    const cleanWord = (w: string) => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    
    const spokenWords = spokenText.split(/\s+/).map(cleanWord).filter(Boolean);
    const targetWordsOriginal = targetText.split(/\s+/);
    const targetWordsClean = targetWordsOriginal.map(cleanWord).filter(Boolean);

    // Map each target word to see if it exists in spoken words or is close enough
    let correctCount = 0;
    const wordsFeedback = targetWordsOriginal.map((origWord: string) => {
      const cleanTargetWord = cleanWord(origWord);
      if (!cleanTargetWord) return { word: origWord, isCorrect: true };

      // Find best match in spoken words
      let isWordCorrect = false;
      let bestDiff = 999;
      let matchedIndex = -1;

      for (let i = 0; i < spokenWords.length; i++) {
        const spoken = spokenWords[i];
        const dist = getLevenshteinDistance(cleanTargetWord, spoken);
        if (dist < bestDiff) {
          bestDiff = dist;
          matchedIndex = i;
        }
      }

      // If word distance is small enough (relative to word length), it's correct
      const maxAllowedDist = Math.max(1, Math.floor(cleanTargetWord.length * 0.3));
      if (bestDiff <= maxAllowedDist && matchedIndex !== -1) {
        isWordCorrect = true;
        correctCount++;
        // Remove matched word so it's not matched twice
        spokenWords.splice(matchedIndex, 1);
      }

      return {
        word: origWord,
        isCorrect: isWordCorrect,
      };
    });

    const overallScore = targetWordsClean.length > 0 
      ? Math.round((correctCount / targetWordsClean.length) * 100) 
      : 100;

    return NextResponse.json({
      success: true,
      score: overallScore,
      isCorrect: overallScore >= 80,
      words: wordsFeedback,
    });
  } catch (error: any) {
    console.error("POST /api/ai/pronunciation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
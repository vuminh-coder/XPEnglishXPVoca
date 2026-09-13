/**
 * Dictation Engine 2.0 - Core typing, fuzzy matching, and Web Audio feedback logic.
 */

// 1. Classical Levenshtein Distance
export function calculateLevenshteinDistance(a: string, b: string): number {
  const s1 = a.toLowerCase().trim();
  const s2 = b.toLowerCase().trim();

  if (s1 === s2) return 0;
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= s2.length; i++) matrix[i] = [i];
  for (let j = 0; j <= s1.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[s2.length][s1.length];
}

// 2. Near-miss Typo Tolerator (Levenshtein <= 1 on words >= 5 characters)
export function checkNearMissTypo(inputWord: string, targetWord: string): { isNearMiss: boolean; hint?: string } {
  const cleanInput = inputWord.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanTarget = targetWord.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (cleanTarget.length >= 5 && cleanInput.length >= 4) {
    const dist = calculateLevenshteinDistance(cleanInput, cleanTarget);
    if (dist === 1) {
      return {
        isNearMiss: true,
        hint: `Gần chính xác! Từ chuẩn là: "${cleanTarget}"`,
      };
    }
  }

  return { isNearMiss: false };
}

// 3. Contraction & Equivalence Normalizer
export const EQUIVALENCE_MAP: Record<string, string[]> = {
  "dont": ["do", "not"],
  "don't": ["do", "not"],
  "doesnt": ["does", "not"],
  "doesn't": ["does", "not"],
  "didnt": ["did", "not"],
  "didn't": ["did", "not"],
  "cant": ["can", "not"],
  "can't": ["can", "not"],
  "cannot": ["can", "not"],
  "wont": ["will", "not"],
  "won't": ["will", "not"],
  "isnt": ["is", "not"],
  "isn't": ["is", "not"],
  "arent": ["are", "not"],
  "aren't": ["are", "not"],
  "wasnt": ["was", "not"],
  "wasn't": ["was", "not"],
  "werent": ["were", "not"],
  "weren't": ["were", "not"],
  "havent": ["have", "not"],
  "haven't": ["have", "not"],
  "hasnt": ["has", "not"],
  "hasn't": ["has", "not"],
  "hadnt": ["had", "not"],
  "hadn't": ["had", "not"],
  "im": ["i", "am"],
  "i'm": ["i", "am"],
  "youre": ["you", "are"],
  "you're": ["you", "are"],
  "theyre": ["they", "are"],
  "they're": ["they", "are"],
  "were": ["we", "are"], // handled with context
  "we're": ["we", "are"],
  "hes": ["he", "is"],
  "he's": ["he", "is"],
  "shes": ["she", "is"],
  "she's": ["she", "is"],
  "its": ["it", "is"],
  "it's": ["it", "is"],
  "that's": ["that", "is"],
  "thats": ["that", "is"],
  "1": ["one"],
  "2": ["two"],
  "3": ["three"],
  "4": ["four"],
  "5": ["five"],
  "6": ["six"],
  "7": ["seven"],
  "8": ["eight"],
  "9": ["nine"],
  "10": ["ten"],
  "&": ["and"],
  "%": ["percent"],
};

export function checkEquivalenceMatch(input: string, target: string): boolean {
  const cIn = input.toLowerCase().replace(/[^a-z0-9'&%]/g, "");
  const cTarget = target.toLowerCase().replace(/[^a-z0-9'&%]/g, "");

  if (cIn === cTarget) return true;

  // Check map
  const mapped = EQUIVALENCE_MAP[cIn];
  if (mapped && mapped.includes(cTarget)) return true;

  const targetMapped = EQUIVALENCE_MAP[cTarget];
  if (targetMapped && targetMapped.includes(cIn)) return true;

  return false;
}

// 4. Zero-Asset Synthetic Dopamine Audio Feedback (Web Audio API)
export function playSyntheticAudioFeedback(type: "correct" | "sentence_complete" | "incorrect") {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    if (type === "correct") {
      // Gentle, pleasant pop/click (880Hz -> 1200Hz soft chime)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } else if (type === "sentence_complete") {
      // Sparkling Major Chord Arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.3);
      });
    } else if (type === "incorrect") {
      // Gentle, low thud (180Hz -> 90Hz, non-intrusive)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch {
    // Graceful fallback if AudioContext blocked by browser autoplay policy
  }
}

// 5. SessionStorage Draft Autosave
export function saveSentenceDraft(lessonId: string, sentenceIndex: number, text: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`xp_draft_${lessonId}_${sentenceIndex}`, text);
  } catch {}
}

export function loadSentenceDraft(lessonId: string, sentenceIndex: number): string {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem(`xp_draft_${lessonId}_${sentenceIndex}`) || "";
  } catch {
    return "";
  }
}

export function clearSentenceDraft(lessonId: string, sentenceIndex: number) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(`xp_draft_${lessonId}_${sentenceIndex}`);
  } catch {}
}

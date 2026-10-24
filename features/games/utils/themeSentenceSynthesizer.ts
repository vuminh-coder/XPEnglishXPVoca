import { UNIT_CURRICULUM_CONFIGS } from "@/features/roadmap/data/curatedRoadmapPathway";

export interface SynthesizableVocabItem {
  id?: string;
  word: string;
  definitionVn?: string;
  pos?: string;
  examples?: string[];
  exampleTranslations?: string[];
}

export interface SynthesizedSentence {
  sentence: string;
  translationVn: string;
  word?: string;
  source: "example" | "key_phrase" | "synthesized";
}

/**
 * Clean and validate sentence token count (between 3 and 12 words)
 */
function isValidSentence(sentence: string): boolean {
  if (!sentence) return false;
  const words = sentence.trim().split(/\s+/);
  return words.length >= 3 && words.length <= 12;
}

/**
 * Generate a natural sentence from a vocabulary item based on its part of speech (POS)
 */
function synthesizeFromVocab(item: SynthesizableVocabItem, seedIndex: number): SynthesizedSentence {
  const word = item.word.trim();
  const def = (item.definitionVn || item.word || "").trim().replace(/\(.*?\)/g, "").trim();
  const pos = item.pos || "noun";

  // Template variations to keep sentences interesting and diverse
  if (pos === "noun") {
    const templates = [
      {
        en: `This is a ${word}.`,
        vn: `Đây là một ${def}.`,
      },
      {
        en: `I can see the ${word}.`,
        vn: `Tôi có thể nhìn thấy ${def}.`,
      },
      {
        en: `We need the ${word} today.`,
        vn: `Chúng ta cần ${def} hôm nay.`,
      },
      {
        en: `The ${word} is very useful.`,
        vn: `${def.charAt(0).toUpperCase() + def.slice(1)} này rất hữu ích.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  if (pos === "verb") {
    const templates = [
      {
        en: `I want to ${word} with you.`,
        vn: `Tôi muốn ${def} cùng bạn.`,
      },
      {
        en: `Please ${word} with us now.`,
        vn: `Xin hãy ${def} cùng chúng tôi ngay bây giờ.`,
      },
      {
        en: `They always ${word} every morning.`,
        vn: `Họ luôn ${def} vào mỗi buổi sáng.`,
      },
      {
        en: `We can ${word} together today.`,
        vn: `Chúng ta có thể ${def} cùng nhau hôm nay.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  if (pos === "adj") {
    const templates = [
      {
        en: `It looks very ${word} today.`,
        vn: `Hôm nay trông nó rất ${def}.`,
      },
      {
        en: `The room is very ${word}.`,
        vn: `Căn phòng rất ${def}.`,
      },
      {
        en: `Everything here is so ${word}.`,
        vn: `Mọi thứ ở đây thật là ${def}.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  if (pos === "interjection" || pos === "phrase") {
    const templates = [
      {
        en: `${word}, nice to see you!`,
        vn: `${def.charAt(0).toUpperCase() + def.slice(1)}, rất vui được gặp bạn!`,
      },
      {
        en: `Always remember to say ${word}.`,
        vn: `Hãy luôn ghi nhớ nói lời ${def}.`,
      },
      {
        en: `${word}, have a nice day!`,
        vn: `${def.charAt(0).toUpperCase() + def.slice(1)}, chúc bạn một ngày tốt lành!`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // Default fallback for any other word
  return {
    sentence: `I am learning the word ${word}.`,
    translationVn: `Tôi đang học từ ${word} (${def}).`,
    word,
    source: "synthesized",
  };
}

/**
 * Main Synthesizer: Produces guaranteed, theme-relevant sentences for Sentence Builder
 */
export function synthesizeThemeSentences(
  pool: SynthesizableVocabItem[] = [],
  options: {
    themeId?: string;
    unitNumber?: number;
    targetCount?: number;
  } = {}
): SynthesizedSentence[] {
  const targetCount = options.targetCount || 5;
  const candidates: SynthesizedSentence[] = [];
  const seenSentences = new Set<string>();

  const addCandidate = (item: SynthesizedSentence) => {
    const clean = item.sentence.trim().toLowerCase();
    if (!seenSentences.has(clean) && isValidSentence(item.sentence)) {
      seenSentences.add(clean);
      candidates.push(item);
    }
  };

  // ── Tier 1: Extract from pool examples with relaxed 3..12 word bounds ──
  pool.forEach((item) => {
    if (item.examples && item.examples.length > 0) {
      item.examples.forEach((example, idx) => {
        const translation = item.exampleTranslations?.[idx] || item.definitionVn || item.word || "";
        addCandidate({
          sentence: example.trim(),
          translationVn: translation.trim(),
          word: item.word,
          source: "example",
        });
      });
    }
  });

  // ── Tier 2: Extract curated Key Phrases from Unit Curriculum Configs ──
  const matchedUnit = UNIT_CURRICULUM_CONFIGS.find(
    (u) =>
      (options.unitNumber && u.unitNumber === options.unitNumber) ||
      (options.themeId && u.themeId === options.themeId)
  );

  if (matchedUnit && matchedUnit.keyPhrases) {
    matchedUnit.keyPhrases.forEach((kp) => {
      addCandidate({
        sentence: kp.phrase.trim(),
        translationVn: kp.translation.trim(),
        source: "key_phrase",
      });
    });
  }

  // ── Tier 3: If still under targetCount, dynamically synthesize from pool words ──
  if (candidates.length < targetCount && pool.length > 0) {
    let seedIdx = 0;
    // Iterate through pool words to synthesize natural sentences
    for (const item of pool) {
      if (candidates.length >= targetCount * 2) break;
      const synth = synthesizeFromVocab(item, seedIdx++);
      addCandidate(synth);
    }
  }

  // Shuffle candidates and return target count
  const shuffled = [...candidates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, targetCount);
}

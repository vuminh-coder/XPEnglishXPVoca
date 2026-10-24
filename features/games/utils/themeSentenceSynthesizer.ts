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
 * Fisher-Yates unbiased shuffle algorithm
 */
export function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
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
 * Heuristic check if a noun is plural or uncountable
 */
function isPluralOrUncountable(word: string): boolean {
  const lower = word.toLowerCase().trim();
  const uncountOrPlural = new Set([
    "people",
    "children",
    "men",
    "women",
    "feet",
    "teeth",
    "mice",
    "clothes",
    "police",
    "water",
    "tea",
    "coffee",
    "milk",
    "bread",
    "money",
    "music",
    "news",
    "information",
    "fruit",
    "baggage",
    "luggage",
  ]);
  if (uncountOrPlural.has(lower)) return true;
  // Ends with s, but not ss, us, is
  if (lower.endsWith("s") && !lower.endsWith("ss") && !lower.endsWith("us") && !lower.endsWith("is")) {
    return true;
  }
  return false;
}

/**
 * Returns correct indefinite article 'a' or 'an' based on leading vowel
 */
function getIndefiniteArticle(word: string): "a" | "an" {
  const first = word.trim().charAt(0).toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(first) ? "an" : "a";
}

/**
 * Generate a natural, grammatically correct sentence from a vocabulary item based on POS
 */
export function synthesizeFromVocab(item: SynthesizableVocabItem, seedIndex: number): SynthesizedSentence {
  const word = item.word.trim();
  const def = (item.definitionVn || item.word || "").trim().replace(/\(.*?\)/g, "").trim();
  const pos = (item.pos || "noun").toLowerCase();
  const capWord = word.charAt(0).toUpperCase() + word.slice(1);
  const capDef = def.charAt(0).toUpperCase() + def.slice(1);

  // 1. NOUN
  if (pos === "noun") {
    const article = getIndefiniteArticle(word);
    const pluralOrUncount = isPluralOrUncountable(word);

    const templates = [
      {
        en: `I can see the ${word}.`,
        vn: `Tôi có thể nhìn thấy ${def}.`,
      },
      {
        en: `We need the ${word} today.`,
        vn: `Chúng ta cần ${def} hôm nay.`,
      },
      pluralOrUncount
        ? {
            en: `These ${word} look very nice.`,
            vn: `Những ${def} này trông rất đẹp.`,
          }
        : {
            en: `This is ${article} ${word}.`,
            vn: `Đây là một ${def}.`,
          },
      {
        en: `The ${word} is very useful.`,
        vn: `${capDef} này rất hữu ích.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // 2. VERB
  if (pos === "verb") {
    const templates = [
      {
        en: `I want to ${word} every day.`,
        vn: `Tôi muốn ${def} mỗi ngày.`,
      },
      {
        en: `We can ${word} together this afternoon.`,
        vn: `Chúng ta có thể ${def} cùng nhau chiều nay.`,
      },
      {
        en: `They like to ${word} on weekends.`,
        vn: `Họ thích ${def} vào cuối tuần.`,
      },
      {
        en: `Please ${word} when you are ready.`,
        vn: `Xin hãy ${def} khi bạn đã sẵn sàng.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // 3. ADJECTIVE
  if (pos === "adj" || pos === "adjective") {
    const templates = [
      {
        en: `The room looks very ${word} today.`,
        vn: `Căn phòng hôm nay trông rất ${def}.`,
      },
      {
        en: `This is a truly ${word} place.`,
        vn: `Đây thực sự là một nơi rất ${def}.`,
      },
      {
        en: `Everything here feels so ${word}.`,
        vn: `Mọi thứ ở đây cho cảm giác thật ${def}.`,
      },
      {
        en: `We had a very ${word} experience.`,
        vn: `Chúng tôi đã có một trải nghiệm thật ${def}.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // 4. ADVERB
  if (pos === "adverb") {
    const templates = [
      {
        en: `She completed the task ${word}.`,
        vn: `Cô ấy đã hoàn thành công việc một cách ${def}.`,
      },
      {
        en: `He speaks English very ${word}.`,
        vn: `Anh ấy nói tiếng Anh rất ${def}.`,
      },
      {
        en: `Please drive ${word} on this road.`,
        vn: `Xin hãy lái xe ${def} trên con đường này.`,
      },
      {
        en: `They worked together ${word}.`,
        vn: `Họ đã làm việc cùng nhau một cách ${def}.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // 5. PRONOUN
  if (pos === "pronoun") {
    const lower = word.toLowerCase();
    const isObjective = ["me", "him", "her", "us", "them"].includes(lower);

    if (isObjective) {
      const templates = [
        {
          en: `Can you help ${word} please?`,
          vn: `Bạn có thể giúp ${def} được không?`,
        },
        {
          en: `She walked with ${word} yesterday.`,
          vn: `Cô ấy đã đi dạo cùng ${def} hôm qua.`,
        },
      ];
      const picked = templates[seedIndex % templates.length];
      return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
    }

    const templates = [
      {
        en: `${capWord} can speak English very well.`,
        vn: `${capDef} có thể nói tiếng Anh rất tốt.`,
      },
      {
        en: `${capWord} study together every day.`,
        vn: `${capDef} học cùng nhau mỗi ngày.`,
      },
      {
        en: `Do ${word} want to join us?`,
        vn: `${capDef} có muốn tham gia cùng chúng tôi không?`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // 6. PREPOSITION
  if (pos === "preposition") {
    const templates = [
      {
        en: `The cat is ${word} the box.`,
        vn: `Con mèo đang ở ${def} chiếc hộp.`,
      },
      {
        en: `We will meet ${word} the station.`,
        vn: `Chúng tôi sẽ gặp nhau ${def} nhà ga.`,
      },
      {
        en: `Put your bag ${word} the table.`,
        vn: `Hãy đặt túi của bạn ${def} cái bàn.`,
      },
      {
        en: `They are walking ${word} the street.`,
        vn: `Họ đang đi bộ ${def} đường phố.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // 7. INTERJECTION / PHRASE
  if (pos === "interjection" || pos === "phrase") {
    const lower = word.toLowerCase();

    // Specific greetings
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("morning") || lower.includes("afternoon")) {
      const templates = [
        {
          en: `${capWord}, how are you today?`,
          vn: `${capDef}, hôm nay bạn thế nào?`,
        },
        {
          en: `${capWord}, welcome to our class!`,
          vn: `${capDef}, chào mừng đến lớp học của chúng tôi!`,
        },
      ];
      const picked = templates[seedIndex % templates.length];
      return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
    }

    // Specific thanks
    if (lower.includes("thank") || lower.includes("thanks")) {
      const templates = [
        {
          en: `Thank you very much for your help.`,
          vn: `Cảm ơn bạn rất nhiều vì sự giúp đỡ.`,
        },
        {
          en: `Thanks for visiting us today.`,
          vn: `Cảm ơn vì đã đến thăm chúng tôi hôm nay.`,
        },
      ];
      const picked = templates[seedIndex % templates.length];
      return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
    }

    // Specific apologies
    if (lower.includes("sorry")) {
      const templates = [
        {
          en: `I am very sorry about that.`,
          vn: `Tôi rất xin lỗi về điều đó.`,
        },
        {
          en: `Sorry, please say that again.`,
          vn: `Xin lỗi, xin hãy nói lại lần nữa.`,
        },
      ];
      const picked = templates[seedIndex % templates.length];
      return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
    }

    // Farewell
    if (lower.includes("bye") || lower.includes("night")) {
      const templates = [
        {
          en: `${capWord}, see you tomorrow!`,
          vn: `${capDef}, hẹn gặp lại bạn ngày mai!`,
        },
        {
          en: `${capWord}, have a wonderful sleep!`,
          vn: `${capDef}, chúc bạn một giấc ngủ thật ngon!`,
        },
      ];
      const picked = templates[seedIndex % templates.length];
      return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
    }

    // General phrase
    const templates = [
      {
        en: `Always remember to say ${word}.`,
        vn: `Hãy luôn ghi nhớ nói lời ${def}.`,
      },
      {
        en: `Everyone said ${word} with a smile.`,
        vn: `Mọi người đều nói ${def} cùng một nụ cười.`,
      },
      {
        en: `Please say ${word} to our guests.`,
        vn: `Xin hãy nói ${def} với các vị khách của chúng ta.`,
      },
    ];
    const picked = templates[seedIndex % templates.length];
    return { sentence: picked.en, translationVn: picked.vn, word, source: "synthesized" };
  }

  // 8. General fallback for any remaining cases
  return {
    sentence: `We are practicing ${word} together.`,
    translationVn: `Chúng ta đang cùng nhau luyện tập ${def}.`,
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

  // ── Tier 1: Extract from pool examples with genuine full sentence translations ──
  pool.forEach((item) => {
    if (item.examples && item.examples.length > 0) {
      item.examples.forEach((example, idx) => {
        const translation = item.exampleTranslations?.[idx]?.trim();
        // Strictly require non-empty sentence translation; never fall back to bare word definition
        if (translation && translation.length > 0) {
          addCandidate({
            sentence: example.trim(),
            translationVn: translation,
            word: item.word,
            source: "example",
          });
        }
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
    const poolWords = new Set(pool.map((w) => w.word.toLowerCase().trim()));
    // If pool has words, prioritize keyPhrases that contain words from the current pool
    const matchingKeyPhrases = matchedUnit.keyPhrases.filter((kp) => {
      if (poolWords.size === 0) return true;
      const tokens = kp.phrase.toLowerCase().split(/\s+/);
      return tokens.some((t) => poolWords.has(t));
    });

    const keyPhrasesToUse = matchingKeyPhrases.length > 0 ? matchingKeyPhrases : matchedUnit.keyPhrases;
    keyPhrasesToUse.forEach((kp) => {
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

  // Shuffle candidates using Fisher-Yates algorithm for uniform distribution
  const shuffled = fisherYatesShuffle(candidates);
  return shuffled.slice(0, targetCount);
}

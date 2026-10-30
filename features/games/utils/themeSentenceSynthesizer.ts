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
  vocabId?: string;
  distractors?: string[];
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

const GRAMMAR_CONFUSABLES: Record<string, string[]> = {
  am: ["is", "are"],
  is: ["are", "am"],
  are: ["is", "was"],
  was: ["were", "is"],
  were: ["was", "are"],
  do: ["does", "did"],
  does: ["do", "is"],
  have: ["has", "had"],
  has: ["have", "is"],
  can: ["will", "may"],
  will: ["can", "would"],
  i: ["my", "me"],
  my: ["me", "your"],
  you: ["your", "we"],
  your: ["you", "our"],
  he: ["his", "him"],
  she: ["her", "he"],
  we: ["our", "us"],
  they: ["their", "them"],
  a: ["an", "the"],
  an: ["a", "the"],
  the: ["a", "this"],
  in: ["on", "at"],
  on: ["in", "at"],
  at: ["in", "to"],
  to: ["for", "with"],
  for: ["to", "of"],
  with: ["by", "for"],
};

const FALLBACK_DISTRACTOR_POOL = [
  "very",
  "always",
  "today",
  "now",
  "here",
  "too",
  "well",
  "often",
];

/**
 * Generates 3-4 pedagogical distractor words (extra tokens) for the Sentence Builder Word Bank:
 * 1. Single-word peers from the same theme vocabulary pool (prioritizing same POS).
 * 2. Grammatical confusables based on words present in the target sentence.
 * 3. Safe fallback tokens, strictly excluding any word already in the target sentence.
 */
export function generateDistractorWords(
  sentence: string,
  pool: SynthesizableVocabItem[] = [],
  currentWord?: string,
  count?: number
): string[] {
  const rawSentenceTokens = sentence
    .trim()
    .split(/\s+/)
    .map((t) => t.replace(/^[.?!,;:""''()—–-]+|[.?!,;:""''()—–-]+$/g, ""))
    .filter(Boolean);
  const usedLower = new Set(rawSentenceTokens.map((t) => t.toLowerCase()));
  if (currentWord) {
    usedLower.add(currentWord.toLowerCase().trim());
  }

  const targetDistractorCount = count ?? (rawSentenceTokens.length <= 5 ? 3 : 4);
  const distractors: string[] = [];

  const tryAddDistractor = (candidate: string) => {
    const clean = candidate.replace(/[.?!,;:]/g, "").trim();
    if (!clean || clean.includes(" ")) return false;
    const lower = clean.toLowerCase();
    if (usedLower.has(lower)) return false;
    usedLower.add(lower);
    distractors.push(lower);
    return true;
  };

  // 1. Pull 1-2 single-word peers from the same theme pool
  const currentItem = currentWord
    ? pool.find((p) => p.word.toLowerCase().trim() === currentWord.toLowerCase().trim())
    : undefined;
  const targetPos = currentItem?.pos?.toLowerCase();

  const singleWordPeers = pool.filter((item) => {
    const w = item.word.trim();
    return w.length >= 2 && !w.includes(" ") && !w.includes("'");
  });

  const samePosPeers = targetPos
    ? singleWordPeers.filter((item) => item.pos?.toLowerCase() === targetPos)
    : [];
  const otherPeers = singleWordPeers.filter(
    (item) => !targetPos || item.pos?.toLowerCase() !== targetPos
  );

  for (const peer of [...samePosPeers, ...otherPeers]) {
    if (distractors.length >= 2) break;
    tryAddDistractor(peer.word);
  }

  // 2. Pull grammatical confusables matching tokens in the sentence
  for (const tok of rawSentenceTokens) {
    if (distractors.length >= targetDistractorCount) break;
    const confusables = GRAMMAR_CONFUSABLES[tok.toLowerCase()];
    if (confusables) {
      for (const conf of confusables) {
        if (tryAddDistractor(conf)) break;
      }
    }
  }

  // 3. Fill any remaining slots from remaining theme peers or safe fallback pool
  for (const peer of singleWordPeers) {
    if (distractors.length >= targetDistractorCount) break;
    tryAddDistractor(peer.word);
  }

  for (const fb of FALLBACK_DISTRACTOR_POOL) {
    if (distractors.length >= targetDistractorCount) break;
    tryAddDistractor(fb);
  }

  return distractors;
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
  const def = (item.definitionVn || item.word || "")
    .trim()
    .replace(/\(.*?\)/g, "")
    .split(/[,;/?!—–]+|\s+-\s+/)[0]
    .trim();
  const pos = (item.pos || "noun").toLowerCase();
  const capWord = word.charAt(0).toUpperCase() + word.slice(1);
  const capDef = def.charAt(0).toUpperCase() + def.slice(1);

  // 1. NOUN
  if (pos === "noun") {
    const lower = word.toLowerCase();
    const timeNouns = new Set([
      "morning",
      "afternoon",
      "evening",
      "night",
      "weekend",
      "summer",
      "winter",
      "spring",
      "autumn",
    ]);
    const personalNouns = new Set(["name", "age", "birthday", "address", "hobby", "job"]);

    if (timeNouns.has(lower)) {
      const timeTemplates = [
        {
          en: `We study English in the ${word}.`,
          vn: `Chúng tôi học tiếng Anh vào ${def}.`,
        },
        {
          en: `I always feel happy every ${word}.`,
          vn: `Tôi luôn cảm thấy vui vẻ mỗi ${def}.`,
        },
      ];
      const picked = timeTemplates[seedIndex % timeTemplates.length];
      return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
    }

    if (personalNouns.has(lower)) {
      const personalTemplates = [
        {
          en: `Please tell me your ${word}.`,
          vn: `Xin hãy cho tôi biết ${def} của bạn.`,
        },
        {
          en: `Can I ask about your ${word}?`,
          vn: `Tôi có thể hỏi về ${def} của bạn không?`,
        },
      ];
      const picked = personalTemplates[seedIndex % personalTemplates.length];
      return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
    }

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
    return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
    return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
    return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
    return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
      return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
    return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
    return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
      return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
      return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
      return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
      return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
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
    return { sentence: picked.en, translationVn: picked.vn, word, vocabId: item.id, source: "synthesized" };
  }

  // 8. General fallback for any remaining cases
  return {
    sentence: `We are practicing ${word} together.`,
    translationVn: `Chúng ta đang cùng nhau luyện tập ${def}.`,
    word,
    vocabId: item.id,
    source: "synthesized",
  };
}

/**
 * Main Synthesizer: Produces guaranteed, theme-relevant sentences for Sentence Builder
 * and prioritizes 1-to-1 sentences from the exact words matched in Stage 2 (Word Link).
 */
export function synthesizeThemeSentences(
  pool: SynthesizableVocabItem[] = [],
  options: {
    themeId?: string;
    unitNumber?: number;
    targetCount?: number;
    part?: number;
    totalParts?: number;
    priorityVocabIds?: string[];
    priorityWords?: string[];
  } = {}
): SynthesizedSentence[] {
  const targetCount = options.targetCount || 5;
  const priorityCandidates: SynthesizedSentence[] = [];
  const generalCandidates: SynthesizedSentence[] = [];
  const seenSentences = new Set<string>();

  const attachDistractors = (item: SynthesizedSentence): SynthesizedSentence => ({
    ...item,
    distractors: generateDistractorWords(item.sentence, pool, item.word),
  });

  const addPriorityCandidate = (item: SynthesizedSentence): boolean => {
    const clean = item.sentence.trim().toLowerCase();
    if (!seenSentences.has(clean) && isValidSentence(item.sentence)) {
      seenSentences.add(clean);
      priorityCandidates.push(attachDistractors(item));
      return true;
    }
    return false;
  };

  const addGeneralCandidate = (item: SynthesizedSentence): boolean => {
    const clean = item.sentence.trim().toLowerCase();
    if (!seenSentences.has(clean) && isValidSentence(item.sentence)) {
      seenSentences.add(clean);
      generalCandidates.push(attachDistractors(item));
      return true;
    }
    return false;
  };

  // ── Tier 0: 1-to-1 Priority Sentences for Words Just Matched in Stage 2 (Word Link) ──
  const priorityIdSet = new Set(options.priorityVocabIds || []);
  const priorityWordSet = new Set((options.priorityWords || []).map((w) => w.toLowerCase().trim()));

  if (priorityIdSet.size > 0 || priorityWordSet.size > 0) {
    const prioritizedItems: SynthesizableVocabItem[] = [];
    // Preserve exact priority order (mistakes first, then matched)
    if (options.priorityVocabIds && options.priorityVocabIds.length > 0) {
      for (const pid of options.priorityVocabIds) {
        const found = pool.find((item) => item.id === pid);
        if (found) prioritizedItems.push(found);
      }
    }
    for (const item of pool) {
      if (
        !prioritizedItems.includes(item) &&
        priorityWordSet.has(item.word.toLowerCase().trim())
      ) {
        prioritizedItems.push(item);
      }
    }

    prioritizedItems.forEach((item, idx) => {
      let added = false;
      if (item.examples && item.examples.length > 0) {
        for (let i = 0; i < item.examples.length; i++) {
          const ex = item.examples[i]?.trim();
          const tr = item.exampleTranslations?.[i]?.trim();
          if (ex && tr && tr.length > 0) {
            if (
              addPriorityCandidate({
                sentence: ex,
                translationVn: tr,
                word: item.word,
                vocabId: item.id,
                source: "example",
              })
            ) {
              added = true;
              break;
            }
          }
        }
      }
      if (!added) {
        const synth = synthesizeFromVocab(item, idx);
        addPriorityCandidate({ ...synth, vocabId: item.id });
      }
    });
  }

  // ── Tier 1: Extract from pool examples with genuine full sentence translations ──
  pool.forEach((item) => {
    if (item.examples && item.examples.length > 0) {
      item.examples.forEach((example, idx) => {
        const translation = item.exampleTranslations?.[idx]?.trim();
        // Strictly require non-empty sentence translation; never fall back to bare word definition
        if (translation && translation.length > 0) {
          addGeneralCandidate({
            sentence: example.trim(),
            translationVn: translation,
            word: item.word,
            vocabId: item.id,
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
    // Strip punctuation before token matching
    const matchingKeyPhrases = matchedUnit.keyPhrases.filter((kp) => {
      if (poolWords.size === 0) return true;
      const tokens = kp.phrase
        .toLowerCase()
        .replace(/[.?!,;:]/g, "")
        .split(/\s+/);
      return tokens.some((t) => poolWords.has(t));
    });

    let keyPhrasesToUse = matchingKeyPhrases.length > 0 ? matchingKeyPhrases : matchedUnit.keyPhrases;
    if (
      poolWords.size > 0 &&
      options.part &&
      options.totalParts &&
      options.totalParts > 1 &&
      keyPhrasesToUse.length >= options.totalParts
    ) {
      const sliceSize = Math.ceil(keyPhrasesToUse.length / options.totalParts);
      const startIdx = (options.part - 1) * sliceSize;
      const partSlice = keyPhrasesToUse.slice(startIdx, startIdx + sliceSize);
      if (partSlice.length > 0) {
        keyPhrasesToUse = partSlice;
      }
    }

    keyPhrasesToUse.forEach((kp) => {
      addGeneralCandidate({
        sentence: kp.phrase.trim(),
        translationVn: kp.translation.trim(),
        source: "key_phrase",
      });
    });
  }

  // ── Tier 3: If still under targetCount, dynamically synthesize from pool words ──
  if (priorityCandidates.length + generalCandidates.length < targetCount && pool.length > 0) {
    let seedIdx = 0;
    for (const item of pool) {
      if (priorityCandidates.length + generalCandidates.length >= targetCount * 2) break;
      const synth = synthesizeFromVocab(item, seedIdx++);
      addGeneralCandidate({ ...synth, vocabId: item.id });
    }
  }

  // Guarantee all priorityCandidates (words from Stage 2 Word Link) are included first,
  // then fill remaining slots up to targetCount from shuffled generalCandidates.
  const remainingNeeded = Math.max(0, targetCount - priorityCandidates.length);
  const pickedGeneral = fisherYatesShuffle(generalCandidates).slice(0, remainingNeeded);
  return [...priorityCandidates.slice(0, targetCount), ...pickedGeneral];
}

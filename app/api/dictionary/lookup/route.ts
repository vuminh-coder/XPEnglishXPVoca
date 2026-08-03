import { NextRequest, NextResponse } from "next/server";

// Curated High-Accuracy English-Vietnamese Dictionary Core (Oxford / TOEIC / Daily Communication)
const CURATED_VIETNAMESE_DICTIONARY: Record<
  string,
  { meaning: string; pos: string; ipa?: string; englishDef?: string; example?: string }
> = {
  good: {
    meaning: "Tốt, hay, tuyệt; điều tốt, điều thiện",
    pos: "Tính từ",
    ipa: "/ɡʊ(d)/",
    englishDef: "(of people) having the required qualities; of a high standard",
    example: 'Usage example of "Good".',
  },
  morning: {
    meaning: "Buổi sáng, ban sáng",
    pos: "Danh từ",
    ipa: "/ˈmɔːr.nɪŋ/",
    englishDef: "The period of time between sunrise and noon.",
    example: "I go for a run every morning.",
  },
  afternoon: {
    meaning: "Buổi chiều",
    pos: "Danh từ",
    ipa: "/ˌæf.tɚˈnuːn/",
    englishDef: "The time from noon to evening.",
    example: "The meeting is scheduled for this afternoon.",
  },
  evening: {
    meaning: "Buổi tối",
    pos: "Danh từ",
    ipa: "/ˈiːv.nɪŋ/",
    englishDef: "The period of time at the end of the day.",
    example: "They enjoy walking in the evening.",
  },
  night: {
    meaning: "Ban đêm, đêm",
    pos: "Danh từ",
    ipa: "/naɪt/",
    englishDef: "The time between sunset and sunrise.",
    example: "Good night and sweet dreams.",
  },
  attention: {
    meaning: "Sự chú ý, sự tập trung",
    pos: "Danh từ",
    ipa: "/əˈten.ʃən/",
    englishDef: "Notice taken of someone or something carefully.",
    example: "Please pay attention to the safety announcement.",
  },
  employee: {
    meaning: "Nhân viên, người lao động",
    pos: "Danh từ",
    ipa: "/ɪmˈplɔɪ.iː/",
    englishDef: "A person employed for wages or salary.",
    example: "She is a full-time employee of the firm.",
  },
  employees: {
    meaning: "Các nhân viên, toàn thể nhân sự",
    pos: "Danh từ số nhiều",
    ipa: "/ɪmˈplɔɪ.iːz/",
    englishDef: "A group of people working for an organization.",
    example: "All employees will be relocated to the second floor.",
  },
  relocate: {
    meaning: "Di dời, chuyển chỗ làm/chỗ ở",
    pos: "Động từ",
    ipa: "/ˌriː.loʊˈkeɪt/",
    englishDef: "Move to a new place and establish home or business there.",
    example: "The company decided to relocate its office.",
  },
  relocated: {
    meaning: "Đã di dời, được chuyển địa điểm",
    pos: "Động từ (quá khứ)",
    ipa: "/ˌriː.loʊˈkeɪ.t̬ɪd/",
    englishDef: "Moved to a new location.",
    example: "Staff members will be temporarily relocated.",
  },
  belongings: {
    meaning: "Đồ dùng cá nhân, hành lý",
    pos: "Danh từ số nhiều",
    ipa: "/bɪˈlɑːŋ.ɪŋz/",
    englishDef: "A person's personal movable possessions.",
    example: "Please pack all your personal belongings by Friday.",
  },
  renovation: {
    meaning: "Sự tu sửa, cải tạo tòa nhà/văn phòng",
    pos: "Danh từ",
    ipa: "/ˌren.əˈveɪ.ʃən/",
    englishDef: "The action of renovating or repairing a building.",
    example: "The third floor is undergoing major renovation.",
  },
  elevator: {
    meaning: "Thang máy",
    pos: "Danh từ",
    ipa: "/ˈel.ə.veɪ.t̬ɚ/",
    englishDef: "A compartment housed in a shaft for raising and lowering people.",
    example: "The elevators are currently out of service.",
  },
  inconvenience: {
    meaning: "Sự bất tiện, sự phiền phức",
    pos: "Danh từ",
    ipa: "/ˌɪn.kənˈviː.ni.əns/",
    englishDef: "Trouble or difficulty caused to one's personal comfort.",
    example: "We apologize for any inconvenience caused.",
  },
  temporarily: {
    meaning: "Tạm thời, trong một thời gian ngắn",
    pos: "Phó từ",
    ipa: "/ˌtem.pəˈrer.əl.i/",
    englishDef: "For a limited time only; not permanently.",
    example: "The office is temporarily closed for repairs.",
  },
  upcoming: {
    meaning: "Sắp tới, sắp diễn ra",
    pos: "Tính từ",
    ipa: "/ˈʌpˌkʌm.ɪŋ/",
    englishDef: "Forthcoming; happening or appearing soon.",
    example: "Due to the upcoming renovation next week.",
  },
  approximately: {
    meaning: "Khoảng, xấp xỉ",
    pos: "Phó từ",
    ipa: "/əˈprɑːk.sə.mət.li/",
    englishDef: "Almost, but not completely, accurate or exact.",
    example: "The job will take approximately three weeks.",
  },
};

/**
 * AI Dictionary & Contextual Bilingual Translation API
 * GET /api/dictionary/lookup?word=morning
 */
export async function GET(request: NextRequest) {
  const word = request.nextUrl.searchParams.get("word")?.trim().toLowerCase();

  if (!word || word.length < 1 || word.length > 50) {
    return NextResponse.json(
      { error: "Thiếu từ cần tra hoặc từ không hợp lệ." },
      { status: 400 }
    );
  }

  // 1. Prioritize Curated High-Accuracy Core Dictionary
  if (CURATED_VIETNAMESE_DICTIONARY[word]) {
    const curated = CURATED_VIETNAMESE_DICTIONARY[word];
    return NextResponse.json({
      word,
      ipa: curated.ipa || `/${word}/`,
      pos: curated.pos,
      meaning: curated.meaning,
      englishDef: curated.englishDef || `The meaning of "${word}" in English.`,
      example: curated.example,
      source: "curated",
    });
  }

  // Stemmed check
  let stem = word;
  if (word.endsWith("ing") && word.length > 4) stem = word.slice(0, -3);
  else if (word.endsWith("ed") && word.length > 4) stem = word.slice(0, -2);
  else if (word.endsWith("s") && word.length > 3) stem = word.slice(0, -1);

  if (CURATED_VIETNAMESE_DICTIONARY[stem]) {
    const curatedBase = CURATED_VIETNAMESE_DICTIONARY[stem];
    return NextResponse.json({
      word,
      ipa: curatedBase.ipa || `/${word}/`,
      pos: curatedBase.pos,
      meaning: curatedBase.meaning,
      englishDef: curatedBase.englishDef || `Variant form of base word "${stem}".`,
      example: curatedBase.example,
      source: "curated-stemmed",
    });
  }

  try {
    // 2. Fetch English definition + Vietnamese translation
    const [dictRes, translateRes] = await Promise.allSettled([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
        signal: AbortSignal.timeout(5000),
      }),
      fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`,
        { signal: AbortSignal.timeout(5000) }
      ),
    ]);

    let ipa = `/${word}/`;
    let pos = "Từ vựng";
    let englishDef = "";
    let example = "";

    // Parse Free Dictionary API
    if (dictRes.status === "fulfilled" && dictRes.value.ok) {
      try {
        const dictData = await dictRes.value.json();
        if (Array.isArray(dictData) && dictData.length > 0) {
          const entry = dictData[0];

          if (entry.phonetic) {
            ipa = entry.phonetic;
          } else if (entry.phonetics?.length > 0) {
            const phonWithText = entry.phonetics.find((p: any) => p.text);
            if (phonWithText) ipa = phonWithText.text;
          }

          if (entry.meanings?.length > 0) {
            const firstMeaning = entry.meanings[0];
            const rawPos = firstMeaning.partOfSpeech || "";

            const posMap: Record<string, string> = {
              noun: "Danh từ",
              verb: "Động từ",
              adjective: "Tính từ",
              adverb: "Phó từ",
              pronoun: "Đại từ",
              preposition: "Giới từ",
              conjunction: "Liên từ",
            };
            pos = posMap[rawPos.toLowerCase()] || rawPos || "Từ vựng";

            if (firstMeaning.definitions?.length > 0) {
              englishDef = firstMeaning.definitions[0].definition || "";
              example = firstMeaning.definitions[0].example || "";
            }
          }
        }
      } catch {}
    }

    // Parse & Clean Vietnamese Translation Result
    let vietnameseMeaning = `${word.charAt(0).toUpperCase() + word.slice(1)}`;

    if (translateRes.status === "fulfilled" && translateRes.value.ok) {
      try {
        const transData = await translateRes.value.json();
        let translated = transData?.responseData?.translatedText?.trim();

        if (transData?.matches?.length > 0) {
          const bestMatch = transData.matches
            .filter((m: any) => m.quality && parseInt(m.quality) > 60)
            .sort((a: any, b: any) => parseInt(b.quality) - parseInt(a.quality))[0];
          if (bestMatch?.translation) {
            translated = bestMatch.translation.trim();
          }
        }

        if (
          translated &&
          translated.toLowerCase() !== word.toLowerCase() &&
          !translated.toLowerCase().includes(`"${word.toLowerCase()}"`)
        ) {
          vietnameseMeaning = translated
            .replace(/^["'\s]+|["'\s]+$/g, "")
            .replace(/\.$/, "");
          vietnameseMeaning =
            vietnameseMeaning.charAt(0).toUpperCase() + vietnameseMeaning.slice(1);
        }
      } catch {}
    }

    return NextResponse.json({
      word,
      ipa,
      pos,
      meaning: vietnameseMeaning,
      englishDef: englishDef || `English definition of "${word}".`,
      example: example || undefined,
      source: "ai",
    });
  } catch (error) {
    console.error("Dictionary lookup error:", error);
    return NextResponse.json({
      word,
      ipa: `/${word}/`,
      pos: "Từ vựng",
      meaning: `${word.charAt(0).toUpperCase() + word.slice(1)}`,
      englishDef: `Definition of "${word}".`,
      source: "fallback",
    });
  }
}

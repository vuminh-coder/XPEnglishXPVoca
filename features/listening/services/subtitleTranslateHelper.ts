/**
 * Shared EN -> VI Batch Translation Helper (Isomorphic Server + Client).
 * Enforces URL length budget, strict numbered block boundaries, and zero English-echo corruption.
 */

export interface TranslatableTextItem {
  textEn: string;
  textVn?: string;
}

const MAX_ENCODED_QUERY_LENGTH = 1350;
const MAX_ITEMS_PER_CHUNK = 12;

function needsTranslation(textEn: string, textVn?: string): boolean {
  if (!textEn || !textEn.trim()) return false;
  if (!textVn || !textVn.trim()) return true;
  return textVn.trim().toLowerCase() === textEn.trim().toLowerCase();
}

function parseSingleGtxResponse(data: any): string {
  if (!Array.isArray(data?.[0])) return "";
  return data[0]
    .map((segment: any) => (Array.isArray(segment) ? segment[0] || "" : ""))
    .join("")
    .trim();
}

async function translateChunkWithGtx(texts: string[]): Promise<(string | null)[]> {
  if (texts.length === 0) return [];
  if (texts.length === 1) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(texts[0])}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const data = await res.json();
        const translated = parseSingleGtxResponse(data);
        return [translated && translated.toLowerCase() !== texts[0].trim().toLowerCase() ? translated : null];
      }
    } catch {}
    return [null];
  }

  // Try numbered marker lines `[0]`..`[n-1]` which survive neural translation more reliably than `|||`
  const numberedPayload = texts.map((t, i) => `[[${i}]] ${t}`).join("\n");
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(numberedPayload)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const data = await res.json();
      const raw = parseSingleGtxResponse(data);
      const resultMap = new Map<number, string>();
      const markerRegex = /\[\[\s*(\d+)\s*\]\]\s*([\s\S]*?)(?=\[\[\s*\d+\s*\]\]|$)/g;
      let match: RegExpExecArray | null;
      while ((match = markerRegex.exec(raw)) !== null) {
        const idx = parseInt(match[1], 10);
        const val = (match[2] || "").replace(/\s+/g, " ").trim();
        if (!Number.isNaN(idx) && val) {
          resultMap.set(idx, val);
        }
      }

      if (resultMap.size === texts.length) {
        return texts.map((orig, i) => {
          const val = resultMap.get(i) || "";
          return val && val.toLowerCase() !== orig.trim().toLowerCase() ? val : null;
        });
      }
    }
  } catch {}

  // Controlled per-item fallback only for failed batch chunks
  return await Promise.all(
    texts.map(async (txt) => {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(txt)}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
        if (res.ok) {
          const data = await res.json();
          const val = parseSingleGtxResponse(data);
          if (val && val.toLowerCase() !== txt.trim().toLowerCase()) {
            return val;
          }
        }
      } catch {}
      return null;
    })
  );
}

/**
 * Translates missing Vietnamese fields cleanly.
 * If translation fails upstream, preserves "" instead of echoing English text into `textVn`.
 */
export async function translateMissingVietnameseBatch<T extends TranslatableTextItem>(
  items: T[]
): Promise<T[]> {
  if (!Array.isArray(items) || items.length === 0) return [];

  const missingIndices: number[] = [];
  for (let i = 0; i < items.length; i++) {
    if (needsTranslation(items[i].textEn, items[i].textVn)) {
      missingIndices.push(i);
    }
  }

  if (missingIndices.length === 0) {
    return items;
  }

  // Group into URL-budget-safe batches
  const batches: { indices: number[]; texts: string[] }[] = [];
  let curIndices: number[] = [];
  let curTexts: string[] = [];
  let curEncodedLen = 0;

  for (const idx of missingIndices) {
    const txt = items[idx].textEn.trim();
    const estLen = encodeURIComponent(`[[${curTexts.length}]] ${txt}\n`).length;
    if (
      curTexts.length > 0 &&
      (curTexts.length >= MAX_ITEMS_PER_CHUNK || curEncodedLen + estLen > MAX_ENCODED_QUERY_LENGTH)
    ) {
      batches.push({ indices: curIndices, texts: curTexts });
      curIndices = [];
      curTexts = [];
      curEncodedLen = 0;
    }
    curIndices.push(idx);
    curTexts.push(txt);
    curEncodedLen += estLen;
  }
  if (curTexts.length > 0) {
    batches.push({ indices: curIndices, texts: curTexts });
  }

  const translatedMap = new Map<number, string>();
  // Run up to 4 batches concurrently to stay well under rate limits
  for (let b = 0; b < batches.length; b += 4) {
    const slice = batches.slice(b, b + 4);
    const results = await Promise.all(slice.map((batch) => translateChunkWithGtx(batch.texts)));
    slice.forEach((batch, sIdx) => {
      const translatedList = results[sIdx];
      batch.indices.forEach((origIdx, iIdx) => {
        const val = translatedList[iIdx];
        if (val) {
          translatedMap.set(origIdx, val);
        }
      });
    });
  }

  return items.map((item, idx) => {
    const fromMap = translatedMap.get(idx);
    if (fromMap) {
      return { ...item, textVn: fromMap };
    }
    const existing = (item.textVn || "").trim();
    const cleanVn =
      existing && existing.toLowerCase() !== item.textEn.trim().toLowerCase() ? existing : "";
    return { ...item, textVn: cleanVn };
  });
}

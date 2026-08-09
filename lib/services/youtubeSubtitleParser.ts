/**
 * Shared YouTube Subtitle Parser & Normalization Engine
 * Shared between Server Route (/api/youtube/captions) and Client Service (youtubeSubtitleService).
 */

export interface ParsedXmlItem {
  startTime: number;
  endTime: number;
  duration: number;
  textEn: string;
}

export interface ParsedVnItem {
  startTime: number;
  textVn: string;
}

// Common English Stop-Words to exclude from dictation target word selection
const STOP_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "here", "where", "much", "down", "should", "those", "being", "very", "yeah",
  "okay", "ok", "oh", "um", "uh", "really", "going", "been"
]);

/**
 * Decodes all standard, decimal numeric, hex numeric XML/HTML entities cleanly
 * and removes inline HTML/ASR tags without stripping text.
 */
export function decodeXmlEntities(text: string): string {
  if (!text) return "";

  let result = text
    // Replace break tags with spaces
    .replace(/<br\s*\/?>/gi, " ")
    // Strip XML/HTML tags and inner ASR timing tags (e.g. <s w="12">)
    .replace(/<[^>]+>/g, "")
    // Standard Named Entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "...");

  // Hex & Decimal Numeric Entities: &#xXXXX; / &#NNNN;
  result = result
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));

  // Pass 2 for double-encoded entities (e.g. &amp;#39;)
  if (result.includes("&#")) {
    result = result
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
  }

  return result.replace(/\s+/g, " ").trim();
}

/**
 * Robust XML TimedText Parser resilient against attribute order, quote styles, and spaces.
 * Extracts `start` and optional `dur`. Calculates intelligent, non-overlapping cue end times.
 */
export function parseTimedTextXml(xmlStr: string): ParsedXmlItem[] {
  if (!xmlStr || !xmlStr.includes("<text")) return [];

  const rawItems: { startTime: number; rawDur: number | null; textEn: string }[] = [];
  
  // Match any <text ...>content</text> block regardless of attribute order
  const tagRegex = /<text\s+([^>]*)>([\s\S]*?)<\/text>/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(xmlStr)) !== null) {
    const attrStr = match[1];
    const rawContent = match[2];

    const startMatch = /\bstart=["']?\s*([\d\.]+)\s*["']?/i.exec(attrStr);
    const durMatch = /\bdur=["']?\s*([\d\.]+)\s*["']?/i.exec(attrStr);

    if (startMatch) {
      const startTime = parseFloat(startMatch[1]);
      const rawDur = durMatch ? parseFloat(durMatch[1]) : null;
      const textEn = decodeXmlEntities(rawContent);

      if (textEn && textEn.length > 0 && !isNaN(startTime)) {
        rawItems.push({ startTime, rawDur, textEn });
      }
    }
  }

  // Sort by startTime
  rawItems.sort((a, b) => a.startTime - b.startTime);

  // Compute precise, non-overlapping durations and endTimes
  const parsedResult: ParsedXmlItem[] = rawItems.map((item, i) => {
    let duration: number;
    const nextItem = rawItems[i + 1];

    if (item.rawDur !== null && !isNaN(item.rawDur) && item.rawDur > 0) {
      duration = item.rawDur;
    } else {
      if (nextItem) {
        duration = Math.max(0.8, parseFloat((nextItem.startTime - item.startTime).toFixed(3)));
        if (duration > 3.5) duration = 3.5;
      } else {
        duration = 3.5;
      }
    }

    // Prevent timeline overlap with next item's startTime
    if (nextItem && item.startTime + duration > nextItem.startTime) {
      const maxAllowedDur = parseFloat((nextItem.startTime - item.startTime).toFixed(3));
      if (maxAllowedDur > 0.05) {
        duration = maxAllowedDur;
      }
    }

    const endTime = parseFloat((item.startTime + duration).toFixed(3));
    return {
      startTime: item.startTime,
      endTime,
      duration: parseFloat(duration.toFixed(3)),
      textEn: item.textEn,
    };
  });

  return parsedResult;
}

/**
 * Robust JSON3 YouTube TimedText Parser.
 * Handles format: {"events": [{"tStartMs": 1000, "dDurationMs": 2000, "segs": [{"utf8": "text"}]}]}
 */
export function parseTimedTextJson3(jsonContent: string | object): ParsedXmlItem[] {
  if (!jsonContent) return [];
  try {
    const data = typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;
    if (!data || !Array.isArray(data.events)) return [];

    const rawItems: { startTime: number; rawDur: number | null; textEn: string }[] = [];

    for (const event of data.events) {
      if (!event.segs || !Array.isArray(event.segs)) continue;

      const rawText = event.segs
        .map((s: any) => s.utf8 || "")
        .join("")
        .replace(/\n/g, " ")
        .trim();

      const decodedText = decodeXmlEntities(rawText);
      if (!decodedText || decodedText.length === 0) continue;

      const startTime = typeof event.tStartMs === "number" ? event.tStartMs / 1000 : 0;
      const rawDur = typeof event.dDurationMs === "number" ? event.dDurationMs / 1000 : null;

      rawItems.push({
        startTime: parseFloat(startTime.toFixed(3)),
        rawDur: rawDur ? parseFloat(rawDur.toFixed(3)) : null,
        textEn: decodedText,
      });
    }

    rawItems.sort((a, b) => a.startTime - b.startTime);

    return rawItems.map((item, i) => {
      let duration: number;
      const nextItem = rawItems[i + 1];

      if (item.rawDur !== null && !isNaN(item.rawDur) && item.rawDur > 0) {
        duration = item.rawDur;
      } else {
        if (nextItem) {
          duration = Math.max(0.8, parseFloat((nextItem.startTime - item.startTime).toFixed(3)));
          if (duration > 3.5) duration = 3.5;
        } else {
          duration = 3.5;
        }
      }

      // Prevent timeline overlap with next item's startTime
      if (nextItem && item.startTime + duration > nextItem.startTime) {
        const maxAllowedDur = parseFloat((nextItem.startTime - item.startTime).toFixed(3));
        if (maxAllowedDur > 0.05) {
          duration = maxAllowedDur;
        }
      }

      duration = Math.max(0.3, parseFloat(duration.toFixed(3)));
      const endTime = parseFloat((item.startTime + duration).toFixed(3));

      return {
        startTime: item.startTime,
        endTime,
        duration,
        textEn: item.textEn,
      };
    });
  } catch (e) {
    return [];
  }
}

/**
 * Multi-Format Universal TimedText Parser (JSON3, XML TimedText, WEBVTT)
 */
export function parseTimedTextAny(content: string): ParsedXmlItem[] {
  if (!content) return [];
  const trimmed = content.trim();

  if (trimmed.startsWith("{") || trimmed.includes('"events"')) {
    const jsonParsed = parseTimedTextJson3(trimmed);
    if (jsonParsed.length > 0) return jsonParsed;
  }

  if (trimmed.includes("<text")) {
    const xmlParsed = parseTimedTextXml(trimmed);
    if (xmlParsed.length > 0) return xmlParsed;
  }

  return [];
}

/**
 * Universal Vietnamese TimedText Parser (JSON3 & XML)
 */
export function parseVnTimedTextAny(content: string): ParsedVnItem[] {
  if (!content) return [];
  const trimmed = content.trim();

  if (trimmed.startsWith("{") || trimmed.includes('"events"')) {
    try {
      const data = JSON.parse(trimmed);
      if (data && Array.isArray(data.events)) {
        const items: ParsedVnItem[] = [];
        for (const event of data.events) {
          if (!event.segs || !Array.isArray(event.segs)) continue;
          const raw = event.segs.map((s: any) => s.utf8 || "").join("").replace(/\n/g, " ").trim();
          const textVn = decodeXmlEntities(raw);
          if (textVn && typeof event.tStartMs === "number") {
            items.push({ startTime: parseFloat((event.tStartMs / 1000).toFixed(3)), textVn });
          }
        }
        items.sort((a, b) => a.startTime - b.startTime);
        return items;
      }
    } catch (e) {}
  }

  if (trimmed.includes("<text")) {
    return parseVnTimedTextXmlLegacy(trimmed);
  }

  return [];
}

export const parseVnTimedTextXml = parseVnTimedTextAny;

function parseVnTimedTextXmlLegacy(xmlVnStr: string): ParsedVnItem[] {
  if (!xmlVnStr || !xmlVnStr.includes("<text")) return [];

  const items: ParsedVnItem[] = [];
  const tagRegex = /<text\s+([^>]*)>([\s\S]*?)<\/text>/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(xmlVnStr)) !== null) {
    const attrStr = match[1];
    const rawContent = match[2];
    const startMatch = /\bstart=["']?\s*([\d\.]+)\s*["']?/i.exec(attrStr);

    if (startMatch) {
      const startTime = parseFloat(startMatch[1]);
      const textVn = decodeXmlEntities(rawContent);
      if (textVn && !isNaN(startTime)) {
        items.push({ startTime, textVn });
      }
    }
  }

  items.sort((a, b) => a.startTime - b.startTime);
  return items;
}

/**
 * Merges short ASR fragments (1-2 words) into complete, natural sentences
 * (merging across tight ASR streaming pauses <= 0.3s or 1-word fragments).
 */
export function mergeFragmentedSubtitlesIntoSentences(items: ParsedXmlItem[]): ParsedXmlItem[] {
  if (!Array.isArray(items) || items.length === 0) return [];

  const merged: ParsedXmlItem[] = [];
  let current: ParsedXmlItem | null = null;

  for (const item of items) {
    if (!current) {
      current = { ...item };
      continue;
    }

    const timeGap = item.startTime - current.endTime;
    const currentWords = current.textEn.split(/\s+/).filter(Boolean).length;
    const itemWords = item.textEn.split(/\s+/).filter(Boolean).length;
    const combinedDuration = item.endTime - current.startTime;
    const endsWithPunctuation = /[.!?]$/.test(current.textEn.trim());

    // Criteria to merge fragment into current sentence:
    // 1. Time gap between cues is very short (<= 0.35s) or single-word fragment (currentWords <= 1)
    // 2. Combined duration is reasonable (<= 5.5s)
    // 3. Current sentence is short (< 8 words) and doesn't end with sentence-closing punctuation
    const isFragmentCandidate = currentWords <= 1 || (timeGap <= 0.35 && currentWords <= 6 && itemWords <= 4);

    if (isFragmentCandidate && combinedDuration <= 5.5 && !endsWithPunctuation) {
      current.textEn = `${current.textEn} ${item.textEn}`.replace(/\s+/g, " ").trim();
      current.endTime = item.endTime;
      current.duration = parseFloat((current.endTime - current.startTime).toFixed(3));
    } else {
      merged.push(current);
      current = { ...item };
    }
  }

  if (current) {
    merged.push(current);
  }

  return merged;
}

/**
 * Bridges silence gaps between consecutive subtitle cues with adaptive thresholds.
 * Uses linguistic heuristics: lowercase-starting next cue = continuation (longer bridge).
 * Prevents "dead zones" where no subtitle is shown despite continuous speech.
 */
export function bridgeSubtitleGaps(items: ParsedXmlItem[]): ParsedXmlItem[] {
  if (!Array.isArray(items) || items.length <= 1) return items;

  return items.map((item, idx) => {
    const next = items[idx + 1];
    if (next && next.startTime > item.startTime) {
      const gap = next.startTime - item.endTime;
      if (gap <= 0) return item; // Already overlapping or seamless

      // Adaptive threshold: if next cue starts with lowercase letter, it's likely a continuation
      const nextStartsLowercase = /^[a-z]/.test(next.textEn.trim());
      const bridgeThreshold = nextStartsLowercase ? 0.8 : 0.5;

      if (gap > 0 && gap <= bridgeThreshold) {
        const adjustedEndTime = next.startTime;
        return {
          ...item,
          endTime: adjustedEndTime,
          duration: parseFloat((adjustedEndTime - item.startTime).toFixed(3)),
        };
      }
    }
    return item;
  });
}

/**
 * Character-Weighted Word Alignment with Punctuation Pacing for High-Precision Karaoke Highlighting.
 * Calculates active word index based on character length progression & punctuation pauses matching real speech cadence.
 */
export function calculateCharacterWeightedWordIndex(
  textEn: string,
  elapsedSeconds: number,
  durationSeconds: number
): number {
  if (!textEn || durationSeconds <= 0) return -1;
  const words = textEn.split(/\s+/).filter(Boolean);
  if (words.length === 0) return -1;
  if (words.length === 1) return 0;

  const ratio = Math.max(0, Math.min(1, elapsedSeconds / durationSeconds));
  
  // Calculate character length with extra weight for words ending with punctuation (commas, semicolons, dashes)
  const wordWeights = words.map((w) => {
    let weight = w.length;
    if (/[,;:—\-]$/.test(w)) weight += 2.5; // Natural pause weight for commas/dashes
    else if (/[.!?]$/.test(w)) weight += 3.5; // Sentence closure pause weight
    return weight;
  });

  const totalWeight = wordWeights.reduce((sum, w) => sum + w, 0);
  if (totalWeight === 0) return 0;

  const targetWeightProgress = ratio * totalWeight;
  let accumulatedWeight = 0;

  for (let i = 0; i < words.length; i++) {
    accumulatedWeight += wordWeights[i];
    if (targetWeightProgress <= accumulatedWeight) {
      return i;
    }
  }
  return words.length - 1;
}

/**
 * Optimal Bilingual Subtitle Alignment Algorithm.
 * Matches closest Vietnamese subtitle cue to English cue within time tolerance.
 * Applies High-Precision Sentence Merging & Continuous Gap Bridging.
 */
export function alignBilingualSubtitles(
  enItems: ParsedXmlItem[],
  vnItems: ParsedVnItem[]
): { textEn: string; textVn: string; startTime: number; endTime: number; duration: number }[] {
  // Step 1: Merge fragmented English ASR cues into complete sentences
  const mergedEn = mergeFragmentedSubtitlesIntoSentences(enItems);
  // Step 2: Bridge small timing gaps between sentences
  const bridgedEn = bridgeSubtitleGaps(mergedEn);

  return bridgedEn.map((en) => {
    let bestVnText = "";
    let minDiff = 4.0;

    for (let i = 0; i < vnItems.length; i++) {
      const vn = vnItems[i];
      if (vn.startTime >= en.startTime - 1.5 && vn.startTime <= en.endTime + 1.5) {
        const diff = Math.abs(vn.startTime - en.startTime);
        if (diff < minDiff) {
          minDiff = diff;
          bestVnText = vn.textVn;
        }
      }
    }

    return {
      textEn: en.textEn,
      textVn: bestVnText,
      startTime: en.startTime,
      endTime: en.endTime,
      duration: en.duration,
    };
  });
}

/**
 * Extract Target Dictation Word excluding stop-words and preserving contractions (don't, it's)
 */
export function extractDictationWord(textEn: string): string {
  if (!textEn) return "vocabulary";

  // Extract alphanumeric tokens while preserving apostrophes inside words
  const cleanTokens = textEn
    .replace(/[^a-zA-Z'\s]/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^'+|'+$/g, "")) // Trim surrounding quotes
    .filter((w) => w.length > 2);

  // Filter out stop words
  const targetWords = cleanTokens.filter(
    (word) => !STOP_WORDS.has(word.toLowerCase())
  );

  if (targetWords.length > 0) {
    // Pick the longest content word
    targetWords.sort((a, b) => b.length - a.length);
    return targetWords[0].toLowerCase();
  }

  return cleanTokens.length > 0 ? cleanTokens[0].toLowerCase() : "vocabulary";
}

/**
 * Timestamp Formatting Engine (Safe against Overflow and Invalid Numbers)
 */
export function formatTimestampMs(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00:00.000";

  let totalMs = Math.round(seconds * 1000);
  const ms = totalMs % 1000;
  let totalSecs = Math.floor(totalMs / 1000);

  const secs = totalSecs % 60;
  let totalMins = Math.floor(totalSecs / 60);

  const mins = totalMins % 60;
  const hrs = Math.floor(totalMins / 60);

  const hh = String(hrs).padStart(2, "0");
  const mm = String(mins).padStart(2, "0");
  const ss = String(secs).padStart(2, "0");
  const mmm = String(ms).padStart(3, "0");

  return `${hh}:${mm}:${ss}.${mmm}`;
}

export function formatSrtTimestamp(seconds: number): string {
  return formatTimestampMs(seconds).replace(".", ",");
}

/**
 * Multi-line Word Wrap for SRT/WEBVTT (< 42 chars per line split logic)
 */
export function wrapTextTo42Chars(text: string): string {
  if (!text || text.length <= 42) return text;

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= 42) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines.join("\n");
}

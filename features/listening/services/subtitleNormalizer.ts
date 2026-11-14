/**
 * Unified Isomorphic Subtitle Normalization & Alignment Pipeline
 * Shared between Server Extraction, Client Extractor, SRT/VTT Parser, and Ingestion.
 */

export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

export interface NormalizedCue {
  startTime: number;
  endTime: number;
  duration: number;
  textEn: string;
  wordTimings?: WordTiming[];
}

export interface NormalizedVnCue {
  startTime: number;
  endTime?: number;
  textVn: string;
}

export interface AlignedSubtitleCue extends NormalizedCue {
  textVn: string;
}

const ABBREVIATIONS = new Set([
  "mr.", "mrs.", "ms.", "dr.", "prof.", "sr.", "jr.", "st.", "vs.", "etc.",
  "e.g.", "i.e.", "u.s.", "u.k.", "u.n.", "ph.d.", "a.m.", "p.m.", "no.",
  "vol.", "fig.", "approx.", "inc.", "ltd.", "co.",
]);

const DANGLING_END_WORDS = new Set([
  "a", "an", "the", "to", "of", "in", "on", "at", "for", "with", "by", "from",
  "into", "onto", "upon", "about", "through", "between", "among", "during",
  "before", "after", "and", "or", "but", "so", "yet", "nor", "that", "which",
  "who", "whom", "whose", "where", "when", "why", "how", "because", "although",
  "though", "while", "if", "unless", "until", "since", "as", "than",
  "is", "am", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did",
  "will", "would", "shall", "should", "can", "could", "may", "might", "must",
  "my", "your", "his", "her", "its", "our", "their", "this", "these", "those",
  "not", "very", "really", "just", "only", "also",
]);

const STANDALONE_CREDIT_REGEX =
  /^\s*(?:Translator|Reviewer|Transcriber|Proofreader|Subtitles?\s*by|Captioned\s*by|Dịch\s*bởi|Biên\s*dịch|Biên\s*tập)\s*:\s*(?:(?!\b(?:is|are|was|were|have|has|had|that|which|this|là|và|nhưng|của|cho|tôi|bạn)\b).){1,120}$/i;

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

/**
 * Decodes HTML/XML entities and strips stage directions ([Music], >>, ♪, zero-width chars) and standalone translator credits.
 */
export function cleanSubtitleText(text: string): string {
  if (!text) return "";

  let result = text
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "...");

  result = result
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));

  if (result.includes("&#")) {
    result = result
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
  }

  result = result
    .replace(
      /\[(?:Music|Applause|Laughter|Cheering|Audio|Sound|Silence|Singing|Background\s*Music|Instrumental|Âm\s*nhạc|Tiếng\s*vỗ\s*tay|Vỗ\s*tay|Nhạc\s*nền|Tiếng\s*cười|Cười|Nhạc)[^\]]*\]/gi,
      " "
    )
    .replace(
      /\((?:Music|Applause|Laughter|Cheering|Audio|Sound|Silence|Singing|Background\s*Music|Instrumental|Âm\s*nhạc|Tiếng\s*vỗ\s*tay|Vỗ\s*tay|Nhạc\s*nền|Tiếng\s*cười|Cười|Nhạc)[^)]*\)/gi,
      " "
    )
    .replace(/[♪♫]+/g, " ")
    .replace(/^\s*>{2,}\s*/g, "")
    .replace(/\s*>{2,}\s*/g, " ");

  const collapsed = result.replace(/\s+/g, " ").trim().normalize("NFC");
  if (!collapsed || STANDALONE_CREDIT_REGEX.test(collapsed)) {
    return "";
  }
  return collapsed;
}

export function isMeaningfulSubtitleText(text: string): boolean {
  const cleaned = cleanSubtitleText(text);
  if (!cleaned) return false;
  return /[\p{L}\p{N}]/u.test(cleaned);
}

function normalizeForComparison(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function hasTerminalSentenceEnd(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (/\.\.\.$/.test(trimmed)) return false;
  return /[.!?]["'”’\)\]]*$/.test(trimmed);
}

function endsWithDanglingWord(text: string): boolean {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  const last = words[words.length - 1].toLowerCase().replace(/^["'(]+|["'),;:]+$/g, "");
  return DANGLING_END_WORDS.has(last);
}

function isSentenceBoundaryToken(token: string): boolean {
  const stripped = token.replace(/["'”’\)\]]+$/g, "");
  if (!/[.!?]$/.test(stripped)) return false;
  if (/\.\.\.$/.test(stripped)) return false;

  const lower = stripped.toLowerCase();
  if (ABBREVIATIONS.has(lower)) return false;
  if (/^[A-Za-z]\.$/.test(stripped)) return false;
  if (/^\d+\.$/.test(stripped)) return false;
  return true;
}

/**
 * Deduplicates overlapping rolling ASR events using punctuation-tolerant prefix normalization.
 * Preserves and prefers richer text and monotonic wordTimings.
 */
export function deduplicateRollingAsrCues<T extends { startTime: number; endTime: number; text: string; wordTimings?: WordTiming[] }>(
  cues: T[]
): T[] {
  if (!Array.isArray(cues) || cues.length === 0) return [];

  const sorted = [...cues]
    .filter((c) => isMeaningfulSubtitleText(c.text))
    .map((c) => ({ ...c, text: cleanSubtitleText(c.text) }))
    .sort((a, b) => a.startTime - b.startTime);

  const deduped: T[] = [];

  for (const cue of sorted) {
    if (deduped.length === 0) {
      deduped.push({ ...cue });
      continue;
    }

    const prev = deduped[deduped.length - 1];
    const timeDiff = cue.startTime - prev.startTime;
    const prevNorm = normalizeForComparison(prev.text);
    const currNorm = normalizeForComparison(cue.text);

    if (!currNorm) continue;

    // 1. Identical normalized phrase within tight rolling window
    if (timeDiff >= 0 && timeDiff < 1.2 && currNorm === prevNorm) {
      prev.endTime = Math.max(prev.endTime, cue.endTime);
      if (cue.text.length >= prev.text.length) {
        prev.text = cue.text;
      }
      if (cue.wordTimings && cue.wordTimings.length >= (prev.wordTimings?.length || 0)) {
        prev.wordTimings = cue.wordTimings;
      }
      continue;
    }

    // 2. Rolling extension: current cue builds directly on previous incomplete prefix
    const prevWordCount = prevNorm.split(/\s+/).filter(Boolean).length;
    const isStrictExtension = currNorm.startsWith(prevNorm + " ");
    const isShortPrefixOverlap =
      timeDiff >= 0 &&
      timeDiff < 0.7 &&
      prevWordCount <= 4 &&
      currNorm.includes(prevNorm) &&
      currNorm.length > prevNorm.length;

    if (
      timeDiff >= 0 &&
      timeDiff < 1.25 &&
      currNorm.length > prevNorm.length &&
      (isStrictExtension || isShortPrefixOverlap)
    ) {
      prev.text = cue.text;
      prev.endTime = Math.max(prev.endTime, cue.endTime);
      if (cue.wordTimings && cue.wordTimings.length >= (prev.wordTimings?.length || 0)) {
        prev.wordTimings = cue.wordTimings;
      }
      continue;
    }

    // 3. Two-line rolling suffix-prefix overlap: strip repeated leading >= 2 words from current cue
    const prevRawWords = prev.text.trim().split(/\s+/).filter(Boolean);
    const currRawWords = cue.text.trim().split(/\s+/).filter(Boolean);
    const gapSincePrevEnd = cue.startTime - prev.endTime;

    if (gapSincePrevEnd >= -0.6 && gapSincePrevEnd <= 1.0 && prevRawWords.length >= 2 && currRawWords.length >= 2) {
      const prevNormWords = prevRawWords.map((w) => normalizeForComparison(w));
      const currNormWords = currRawWords.map((w) => normalizeForComparison(w));
      const maxOverlap = Math.min(prevNormWords.length, currNormWords.length - 1, 8);
      let matchedOverlap = 0;

      for (let k = maxOverlap; k >= 2; k--) {
        let allMatch = true;
        for (let j = 0; j < k; j++) {
          const pw = prevNormWords[prevNormWords.length - k + j];
          const cw = currNormWords[j];
          if (!pw || pw !== cw) {
            allMatch = false;
            break;
          }
        }
        if (allMatch) {
          matchedOverlap = k;
          break;
        }
      }

      if (matchedOverlap >= 2) {
        const strippedText = currRawWords.slice(matchedOverlap).join(" ").trim();
        if (strippedText) {
          const nextTimings =
            Array.isArray(cue.wordTimings) && cue.wordTimings.length === currRawWords.length
              ? cue.wordTimings.slice(matchedOverlap)
              : cue.wordTimings;
          deduped.push({
            ...cue,
            text: strippedText,
            wordTimings: nextTimings,
          });
          continue;
        }
      }
    }

    deduped.push({ ...cue });
  }

  return deduped;
}

/**
 * Splits blocks containing 2+ complete sentences into individual sentences,
 * protecting abbreviations/numbers and preserving accurate timestamps + wordTimings.
 */
export function splitMultiSentenceCues(cues: NormalizedCue[]): NormalizedCue[] {
  if (!Array.isArray(cues) || cues.length === 0) return [];

  const result: NormalizedCue[] = [];

  for (const cue of cues) {
    const text = cleanSubtitleText(cue.textEn);
    if (!isMeaningfulSubtitleText(text)) continue;

    const words = text.split(/\s+/).filter(Boolean);
    if (words.length < 4) {
      result.push({ ...cue, textEn: text });
      continue;
    }

    // Find candidate split indices (index of last word in each sentence)
    const splitEnds: number[] = [];
    let currentLen = 0;

    for (let i = 0; i < words.length - 1; i++) {
      currentLen++;
      if (isSentenceBoundaryToken(words[i])) {
        const remaining = words.length - 1 - i;
        if (currentLen >= 2 && remaining >= 2) {
          splitEnds.push(i);
          currentLen = 0;
        }
      }
    }

    if (splitEnds.length === 0) {
      result.push({ ...cue, textEn: text });
      continue;
    }

    // Build sentence slices [startWordIdx, endWordIdx]
    const ranges: { startIdx: number; endIdx: number; words: string[]; sentence: string }[] = [];
    let startIdx = 0;
    for (const endIdx of splitEnds) {
      const sliceWords = words.slice(startIdx, endIdx + 1);
      ranges.push({
        startIdx,
        endIdx,
        words: sliceWords,
        sentence: sliceWords.join(" "),
      });
      startIdx = endIdx + 1;
    }
    const tailWords = words.slice(startIdx);
    ranges.push({
      startIdx,
      endIdx: words.length - 1,
      words: tailWords,
      sentence: tailWords.join(" "),
    });

    const hasExactWordTimings =
      Array.isArray(cue.wordTimings) && cue.wordTimings.length === words.length;

    const totalWeight = ranges.reduce(
      (sum, r) => sum + Math.max(4, r.sentence.replace(/\s+/g, "").length + r.words.length * 1.5),
      0
    );

    const cueStart = Math.max(0, cue.startTime);
    const cueEnd = Math.max(cueStart + 0.4, cue.endTime);
    const totalDuration = cueEnd - cueStart;
    let cursorTime = cueStart;

    for (let rIdx = 0; rIdx < ranges.length; rIdx++) {
      const range = ranges[rIdx];
      let subStart = cursorTime;
      let subEnd: number;
      let subWordTimings: WordTiming[] | undefined;

      if (hasExactWordTimings && cue.wordTimings) {
        const sliceTimings = cue.wordTimings.slice(range.startIdx, range.endIdx + 1);
        subStart = rIdx === 0 ? cueStart : Math.max(cursorTime, sliceTimings[0].start);
        subEnd =
          rIdx === ranges.length - 1
            ? cueEnd
            : Math.min(cueEnd, Math.max(subStart + 0.25, sliceTimings[sliceTimings.length - 1].end));
        subWordTimings = sliceTimings.map((wt) => ({
          word: wt.word,
          start: round3(Math.max(subStart, Math.min(subEnd, wt.start))),
          end: round3(Math.max(subStart, Math.min(subEnd, wt.end))),
        }));
      } else {
        const weight = Math.max(
          4,
          range.sentence.replace(/\s+/g, "").length + range.words.length * 1.5
        );
        const proportionalDur =
          rIdx === ranges.length - 1
            ? cueEnd - subStart
            : Math.max(0.35, (weight / totalWeight) * totalDuration);
        subEnd = rIdx === ranges.length - 1 ? cueEnd : Math.min(cueEnd, subStart + proportionalDur);
      }

      subStart = round3(subStart);
      subEnd = round3(Math.max(subStart + 0.25, subEnd));
      cursorTime = subEnd;

      result.push({
        startTime: subStart,
        endTime: subEnd,
        duration: round3(subEnd - subStart),
        textEn: range.sentence,
        wordTimings: subWordTimings,
      });
    }
  }

  return result;
}

/**
 * Merges broken sentence fragments across cue boundaries without ever merging across
 * genuine terminal punctuation or large speaker pauses.
 */
export function mergeBrokenSentenceFragments(cues: NormalizedCue[]): NormalizedCue[] {
  if (!Array.isArray(cues) || cues.length === 0) return [];

  const HARD_MAX_WORDS = 24;
  const SOFT_MAX_WORDS = 16;
  const HARD_MAX_DURATION_SEC = 9.5;
  const PAUSE_BREAK_SEC = 0.65;
  const CLAUSE_PAUSE_SEC = 0.35;

  const merged: NormalizedCue[] = [];
  let current: NormalizedCue | null = null;

  for (const rawItem of cues) {
    const cleaned = cleanSubtitleText(rawItem.textEn);
    if (!isMeaningfulSubtitleText(cleaned)) continue;

    const item: NormalizedCue = {
      ...rawItem,
      textEn: cleaned,
      wordTimings: rawItem.wordTimings ? [...rawItem.wordTimings] : undefined,
    };

    if (!current) {
      current = item;
      continue;
    }

    // Never merge past a completed sentence ending in terminal punctuation
    if (hasTerminalSentenceEnd(current.textEn)) {
      merged.push(current);
      current = item;
      continue;
    }

    const timeGap = item.startTime - current.endTime;
    const currentDuration = current.endTime - current.startTime;
    const currentWords = current.textEn.split(/\s+/).filter(Boolean).length;
    const itemWords = item.textEn.split(/\s+/).filter(Boolean).length;
    const combinedWords = currentWords + itemWords;
    const combinedDuration = item.endTime - current.startTime;

    const currentEndsCommaOrSemi = /[,;:—-]\s*$/.test(current.textEn.trim());
    const currentDangles = endsWithDanglingWord(current.textEn);
    const currentIsTinyDangling = currentWords <= 2 && currentDangles;
    const nextIsTinyTail = itemWords <= 2 && hasTerminalSentenceEnd(item.textEn);
    const nextStartsLower = /^[a-z]/.test(item.textEn.trim());
    const nextStartsCapitalClause =
      /^[A-Z]/.test(item.textEn.trim()) &&
      !/^I(?:['’]|\b)/.test(item.textEn.trim()) &&
      itemWords >= 2;
    const allowDelayedTinyTail =
      nextIsTinyTail && timeGap <= 1.25 && (itemWords === 1 || nextStartsLower || currentDangles);

    // Genuine silence pause -> break sentence unless current ends with an unfinished single/two-word orphan inside 0.9s
    // or next cue is a 1-2 word finishing tail within 1.25s completing an unpunctuated sentence
    if (
      timeGap > PAUSE_BREAK_SEC &&
      !(currentIsTinyDangling && timeGap <= 0.9) &&
      !allowDelayedTinyTail
    ) {
      merged.push(current);
      current = item;
      continue;
    }

    // Two unpunctuated capitalized cues separated by a noticeable breath/pause (>= 0.35s) or already complete >= 5-word clause
    if (
      !currentEndsCommaOrSemi &&
      !currentDangles &&
      nextStartsCapitalClause &&
      !nextIsTinyTail &&
      (timeGap >= CLAUSE_PAUSE_SEC || (currentWords >= 5 && currentDuration >= 2.5 && itemWords >= 3))
    ) {
      merged.push(current);
      current = item;
      continue;
    }

    // Respect clause pause when current segment is already comfortably long
    if (currentEndsCommaOrSemi && currentWords >= 10 && timeGap >= CLAUSE_PAUSE_SEC) {
      merged.push(current);
      current = item;
      continue;
    }

    // Enforce hard limits unless closing a 1-2 word finishing tail
    if (
      (combinedWords > HARD_MAX_WORDS || combinedDuration > HARD_MAX_DURATION_SEC) &&
      !nextIsTinyTail
    ) {
      merged.push(current);
      current = item;
      continue;
    }

    // Above soft target: only merge if current clearly dangles or next finishes the sentence shortly
    if (
      combinedWords > SOFT_MAX_WORDS &&
      !endsWithDanglingWord(current.textEn) &&
      !nextIsTinyTail
    ) {
      merged.push(current);
      current = item;
      continue;
    }

    // Merge fragment into current sentence
    current.textEn = `${current.textEn} ${item.textEn}`.replace(/\s+/g, " ").trim();
    current.endTime = round3(Math.max(current.endTime, item.endTime));
    current.duration = round3(Math.max(0.3, current.endTime - current.startTime));
    if (current.wordTimings || item.wordTimings) {
      current.wordTimings = [...(current.wordTimings || []), ...(item.wordTimings || [])];
    }
  }

  if (current) {
    merged.push(current);
  }

  return merged;
}

/**
 * Bridges tiny silence gaps (<= 0.45s standard, <= 0.8s if next cue begins lowercase).
 */
export function bridgeSubtitleGaps(items: NormalizedCue[], customThreshold?: number): NormalizedCue[] {
  if (!Array.isArray(items) || items.length <= 1) return items;

  return items.map((item, idx) => {
    const next = items[idx + 1];
    if (next && next.startTime > item.endTime) {
      const gap = next.startTime - item.endTime;
      const nextStartsLowercase = /^[a-z]/.test(next.textEn.trim());
      const bridgeThreshold = customThreshold ?? (nextStartsLowercase ? 0.8 : 0.45);

      if (gap > 0 && gap <= bridgeThreshold) {
        const adjustedEnd = round3(next.startTime);
        return {
          ...item,
          endTime: adjustedEnd,
          duration: round3(Math.max(0.3, adjustedEnd - item.startTime)),
        };
      }
    }
    return item;
  });
}

function calibrateShiftedVnTimeline<
  T extends { startTime: number; endTime: number; midTime: number; duration: number; textVn: string }
>(enCues: NormalizedCue[], vnCues: T[]): T[] {
  if (enCues.length < 6 || vnCues.length < 6) return vnCues;

  const enStart = enCues[0].startTime;
  const enEnd = enCues[enCues.length - 1].endTime;
  const enSpan = Math.max(1, enEnd - enStart);

  const vnStart = vnCues[0].startTime;
  const vnEnd = vnCues[vnCues.length - 1].endTime;
  const vnSpan = Math.max(1, vnEnd - vnStart);

  const startDelta = enStart - vnStart;
  const endDelta = enEnd - vnEnd;

  // Detect consistent intro/bumper timeline offset across whole track (e.g. TED intro cut discrepancy)
  const hasConsistentOffset =
    Math.abs(startDelta) >= 2.5 &&
    Math.abs(endDelta) >= 2.0 &&
    startDelta * endDelta > 0 &&
    Math.abs(startDelta - endDelta) <= Math.max(6.0, enSpan * 0.06) &&
    Math.abs(enSpan - vnSpan) <= Math.max(15.0, enSpan * 0.08);

  if (!hasConsistentOffset) return vnCues;

  const scale = enSpan / vnSpan;
  return vnCues.map((v) => {
    const startTime = Math.max(0, round3(enStart + (v.startTime - vnStart) * scale));
    const endTime = Math.max(startTime + 0.25, round3(enStart + (v.endTime - vnStart) * scale));
    return {
      ...v,
      startTime,
      endTime,
      midTime: (startTime + endTime) / 2,
      duration: Math.max(0.25, endTime - startTime),
    };
  });
}

/**
 * Overlap-based bilingual alignment: matches each Vietnamese cue to its strongest overlapping English sentence
 * and concatenates all Vietnamese fragments covering that English sentence in chronological order.
 */
export function alignBilingualByOverlap(
  enCues: NormalizedCue[],
  vnCues: NormalizedVnCue[]
): AlignedSubtitleCue[] {
  if (!Array.isArray(enCues) || enCues.length === 0) return [];
  if (!Array.isArray(vnCues) || vnCues.length === 0) {
    return enCues.map((en) => ({ ...en, textVn: "" }));
  }

  // Sort, strip translator/stage noise, infer missing endTimes, and calibrate shifted tracks cleanly
  const rawSortedVn = [...vnCues]
    .filter((v) => isMeaningfulSubtitleText(v.textVn))
    .map((v) => ({
      startTime: Math.max(0, v.startTime),
      endTime: v.endTime,
      textVn: cleanSubtitleText(v.textVn),
    }))
    .filter((v) => Boolean(v.textVn))
    .sort((a, b) => a.startTime - b.startTime)
    .map((v, idx, arr) => {
      const next = arr[idx + 1];
      const fallbackEnd = next
        ? Math.min(v.startTime + 5.0, Math.max(v.startTime + 0.4, next.startTime))
        : v.startTime + 3.5;
      const endTime =
        typeof v.endTime === "number" && v.endTime > v.startTime ? v.endTime : fallbackEnd;
      return {
        startTime: v.startTime,
        endTime,
        midTime: (v.startTime + endTime) / 2,
        duration: Math.max(0.25, endTime - v.startTime),
        textVn: v.textVn,
      };
    });

  const normalizedVn = calibrateShiftedVnTimeline(enCues, rawSortedVn);

  // Assign each Vietnamese cue to its single best matching English sentence
  const buckets: string[][] = enCues.map(() => []);
  const unmatchedVn: typeof normalizedVn = [];

  for (const vn of normalizedVn) {
    let bestIdx = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < enCues.length; i++) {
      const en = enCues[i];
      if (en.endTime < vn.startTime - 1.5) continue;
      if (en.startTime > vn.endTime + 1.5) break;

      const overlap = Math.max(
        0,
        Math.min(en.endTime, vn.endTime) - Math.max(en.startTime, vn.startTime)
      );
      const overlapRatio = overlap / vn.duration;
      const enMid = (en.startTime + en.endTime) / 2;
      const midDist = Math.abs(enMid - vn.midTime);
      const startDist = Math.abs(en.startTime - vn.startTime);

      if (overlap > 0 || midDist <= 1.2 || startDist <= 1.0) {
        const score = overlapRatio * 10 - midDist * 0.5 - startDist * 0.2;
        if (score > bestScore) {
          bestScore = score;
          bestIdx = i;
        }
      }
    }

    if (bestIdx !== -1) {
      const targetBucket = buckets[bestIdx];
      const lastPiece = targetBucket[targetBucket.length - 1];
      if (!lastPiece || normalizeForComparison(lastPiece) !== normalizeForComparison(vn.textVn)) {
        targetBucket.push(vn.textVn);
      }
    } else {
      unmatchedVn.push(vn);
    }
  }

  // Pass 2: Rescue shifted translated tracks (up to 6.0s start tolerance) onto nearest unmatched EN sentence
  for (const vn of unmatchedVn) {
    let bestEmptyIdx = -1;
    let bestDist = Infinity;

    for (let i = 0; i < enCues.length; i++) {
      if (buckets[i].length > 0) continue;
      const startDist = Math.abs(enCues[i].startTime - vn.startTime);
      if (startDist <= 6.0 && startDist < bestDist) {
        bestDist = startDist;
        bestEmptyIdx = i;
      }
    }

    if (bestEmptyIdx !== -1) {
      buckets[bestEmptyIdx].push(vn.textVn);
    }
  }

  return enCues.map((en, idx) => ({
    ...en,
    textVn: buckets[idx].join(" ").replace(/\s+/g, " ").trim(),
  }));
}

/**
 * Ensures strictly monotonic non-overlapping timeline and clamped wordTimings.
 */
export function finalizeSubtitleTimeline<T extends NormalizedCue>(cues: T[]): T[] {
  if (!Array.isArray(cues) || cues.length === 0) return [];

  const sorted = [...cues]
    .filter((c) => isMeaningfulSubtitleText(c.textEn))
    .sort((a, b) => a.startTime - b.startTime);

  return sorted.map((cue, idx) => {
    const start = round3(Math.max(0, cue.startTime));
    const next = sorted[idx + 1];

    let end = round3(Math.max(start + 0.4, cue.endTime));
    if (next && end > next.startTime) {
      const clamped = round3(Math.max(start + 0.2, next.startTime));
      end = clamped;
    }

    let wordTimings = cue.wordTimings;
    if (Array.isArray(wordTimings) && wordTimings.length > 0) {
      let prevWordEnd = start;
      wordTimings = wordTimings.map((wt) => {
        const wStart = round3(Math.max(prevWordEnd, Math.min(end, wt.start)));
        const wEnd = round3(Math.max(wStart, Math.min(end, wt.end)));
        prevWordEnd = wEnd;
        return { word: wt.word, start: wStart, end: wEnd };
      });
    }

    return {
      ...cue,
      startTime: start,
      endTime: end,
      duration: round3(Math.max(0.2, end - start)),
      textEn: cleanSubtitleText(cue.textEn),
      wordTimings,
    };
  });
}

/**
 * End-to-end deterministic subtitle normalization pipeline.
 */
export function normalizeSubtitlePipeline(
  rawEnCues: NormalizedCue[],
  rawVnCues: NormalizedVnCue[] = []
): AlignedSubtitleCue[] {
  const split = splitMultiSentenceCues(rawEnCues);
  const merged = mergeBrokenSentenceFragments(split);
  const bridged = bridgeSubtitleGaps(merged);
  const finalized = finalizeSubtitleTimeline(bridged);
  return alignBilingualByOverlap(finalized, rawVnCues);
}

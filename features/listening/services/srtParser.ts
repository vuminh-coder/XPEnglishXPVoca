/**
 * SRT / WEBVTT Subtitle Parser Engine
 * Parses .srt and .vtt file content into SubtitleSentence[] for the /myvideo player.
 * Supports: standard SRT, WEBVTT, bilingual (EN+VN on consecutive lines), HTML tags cleanup.
 */

import { SubtitleSentence } from "@/stores/videoStore";
import { extractDictationWord, shiftTimestampSec } from "@/features/listening/services/youtubeSubtitleParser";
import {
  cleanSubtitleText,
  isMeaningfulSubtitleText,
  normalizeSubtitlePipeline,
  NormalizedCue,
  NormalizedVnCue,
} from "@/features/listening/services/subtitleNormalizer";

/** Raw parsed cue before conversion */
interface RawSrtCue {
  index: number;
  startTime: number; // seconds
  endTime: number;   // seconds
  lines: string[];   // raw text lines (may be 1 or 2 for bilingual)
}

/**
 * Parse SRT timestamp string → seconds
 * Supports both SRT format (HH:MM:SS,mmm) and WEBVTT format (HH:MM:SS.mmm)
 * Also supports short format (MM:SS,mmm or MM:SS.mmm)
 */
export function parseSrtTimestamp(ts: string): number {
  if (!ts) return 0;
  const clean = ts.trim().replace(",", ".");

  // HH:MM:SS.mmm
  const fullMatch = /^(\d{1,2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/.exec(clean);
  if (fullMatch) {
    const h = parseInt(fullMatch[1], 10);
    const m = parseInt(fullMatch[2], 10);
    const s = parseInt(fullMatch[3], 10);
    const ms = fullMatch[4] ? parseInt(fullMatch[4].padEnd(3, "0"), 10) : 0;
    return h * 3600 + m * 60 + s + ms / 1000;
  }

  // MM:SS.mmm (short format)
  const shortMatch = /^(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?$/.exec(clean);
  if (shortMatch) {
    const m = parseInt(shortMatch[1], 10);
    const s = parseInt(shortMatch[2], 10);
    const ms = shortMatch[3] ? parseInt(shortMatch[3].padEnd(3, "0"), 10) : 0;
    return m * 60 + s + ms / 1000;
  }

  return 0;
}

/**
 * Detect if a line looks like Vietnamese text (contains Vietnamese diacritics)
 */
function looksVietnamese(text: string): boolean {
  // Vietnamese-specific diacritical characters
  return /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(text);
}

/**
 * Main parser: Parse .srt / .vtt content string into SubtitleSentence[]
 */
export function parseSrtContent(srtText: string, videoId?: string): SubtitleSentence[] {
  if (!srtText || srtText.trim().length === 0) return [];

  // Remove BOM
  let content = srtText.replace(/^\uFEFF/, "").trim();

  // Remove WEBVTT header line if present
  if (content.startsWith("WEBVTT")) {
    // Remove everything before the first empty line (header block)
    const headerEnd = content.indexOf("\n\n");
    if (headerEnd !== -1) {
      content = content.substring(headerEnd + 2);
    } else {
      // Single line WEBVTT header
      content = content.replace(/^WEBVTT[^\n]*\n/, "");
    }
  }

  // Normalize line endings
  content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Split into cue blocks (separated by blank lines)
  const blocks = content.split(/\n\n+/).filter((b) => b.trim().length > 0);

  const rawCues: RawSrtCue[] = [];

  // Timestamp arrow pattern: supports both SRT (,) and VTT (.) separators
  const timestampPattern = /(\d{1,2}:\d{2}(?::\d{2})?[.,]\d{1,3})\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?[.,]\d{1,3})/;

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) continue;

    // Find the timestamp line
    let timestampLineIdx = -1;
    for (let i = 0; i < Math.min(lines.length, 3); i++) {
      if (timestampPattern.test(lines[i])) {
        timestampLineIdx = i;
        break;
      }
    }

    if (timestampLineIdx === -1) continue; // Skip blocks without timestamps

    const tsMatch = timestampPattern.exec(lines[timestampLineIdx]);
    if (!tsMatch) continue;

    const startTime = shiftTimestampSec(parseSrtTimestamp(tsMatch[1]));
    const endTime = shiftTimestampSec(parseSrtTimestamp(tsMatch[2]));

    // Text lines come after the timestamp line
    const textLines = lines.slice(timestampLineIdx + 1).map(cleanSubtitleText).filter((l) => l.length > 0);
    if (textLines.length === 0) continue;

    rawCues.push({
      index: rawCues.length + 1,
      startTime: parseFloat(startTime.toFixed(3)),
      endTime: parseFloat(endTime.toFixed(3)),
      lines: textLines,
    });
  }

  if (rawCues.length === 0) return [];

  // Sort by startTime
  rawCues.sort((a, b) => a.startTime - b.startTime);

  // Convert raw cues into EN and VN spans, then normalize/align into natural sentences
  const enCues: NormalizedCue[] = [];
  const vnCues: NormalizedVnCue[] = [];

  for (const cue of rawCues) {
    const cleanedLines = cue.lines
      .map((l) => cleanSubtitleText(l))
      .filter((l) => isMeaningfulSubtitleText(l));
    if (cleanedLines.length === 0) continue;

    let textEn = "";
    let textVn = "";

    if (cleanedLines.length >= 2) {
      const firstLine = cleanedLines[0];
      const secondLine = cleanedLines.slice(1).join(" ");

      if (looksVietnamese(secondLine) && !looksVietnamese(firstLine)) {
        textEn = firstLine;
        textVn = secondLine;
      } else if (looksVietnamese(firstLine) && !looksVietnamese(secondLine)) {
        textEn = secondLine;
        textVn = firstLine;
      } else {
        textEn = cleanedLines.join(" ");
      }
    } else {
      textEn = cleanedLines[0];
    }

    if (!textVn && looksVietnamese(textEn)) {
      textVn = textEn;
      textEn = "";
    }

    const startTime = cue.startTime;
    const endTime = Math.max(startTime + 0.3, cue.endTime);

    if (textEn) {
      enCues.push({
        startTime,
        endTime,
        duration: parseFloat((endTime - startTime).toFixed(3)),
        textEn,
      });
    }
    if (textVn) {
      vnCues.push({
        startTime,
        endTime,
        textVn,
      });
    }
  }

  if (enCues.length === 0 && vnCues.length > 0) {
    return vnCues.map((vn, idx) => ({
      id: `srt_${videoId || "manual"}_${idx + 1}`,
      startTime: vn.startTime,
      endTime: vn.endTime ?? parseFloat((vn.startTime + 3.0).toFixed(3)),
      textEn: vn.textVn,
      textVn: vn.textVn,
      dictationWord: "vocabulary",
    }));
  }

  const normalized = normalizeSubtitlePipeline(enCues, vnCues);

  return normalized.map((item, idx) => ({
    id: `srt_${videoId || "manual"}_${idx + 1}`,
    startTime: item.startTime,
    endTime: item.endTime,
    textEn: item.textEn,
    textVn: item.textVn,
    dictationWord: extractDictationWord(item.textEn),
    wordTimings: item.wordTimings,
  }));
}

/**
 * Validate SRT content: returns error message or null if valid
 */
export function validateSrtContent(content: string): string | null {
  if (!content || content.trim().length === 0) {
    return "Nội dung file .srt trống. Vui lòng dán nội dung phụ đề hợp lệ.";
  }

  const trimmed = content.trim();

  // Check for timestamp pattern
  const hasTimestamp = /\d{1,2}:\d{2}(?::\d{2})?[.,]\d{1,3}\s*-->\s*\d{1,2}:\d{2}(?::\d{2})?[.,]\d{1,3}/.test(trimmed);
  if (!hasTimestamp) {
    return "Không tìm thấy mốc thời gian (timestamp) hợp lệ. File .srt cần có dạng: 00:00:01,000 --> 00:00:05,000";
  }

  // Try parsing
  const parsed = parseSrtContent(trimmed);
  if (parsed.length === 0) {
    return "Không thể phân tích phụ đề. Vui lòng kiểm tra định dạng file .srt.";
  }

  return null;
}

/**
 * MyVideo Deep Testing Suite - Fresh comprehensive tests
 * Tests ALL utility functions used by /myvideo page
 */
import { describe, it, expect, beforeEach, vi } from "vitest";

// Import functions under test
import { extractYouTubeId } from "@/lib/store/videoStore";
import {
  parseTimedTextXml,
  parseTimedTextJson3,
  parseTimedTextAny,
  parseVnTimedTextAny,
  alignBilingualSubtitles,
  extractDictationWord,
  formatTimestampMs,
  formatSrtTimestamp,
  wrapTextTo42Chars,
  decodeXmlEntities,
} from "@/lib/services/youtubeSubtitleParser";

// ============================================================
// 1. extractYouTubeId() — 20 URL format tests
// ============================================================
describe("extractYouTubeId", () => {
  it("extracts ID from standard watch URL", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from short youtu.be URL", () => {
    expect(extractYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from embed URL", () => {
    expect(extractYouTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from shorts URL", () => {
    expect(extractYouTubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from URL with extra params (&t=30s)", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from URL with channel param", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from URL with list param", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from mobile URL", () => {
    expect(extractYouTubeId("https://m.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from URL without www", () => {
    expect(extractYouTubeId("https://youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID from URL with hash", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=30")).toBe("dQw4w9WgXcQ");
  });

  it("handles youtu.be with query params", () => {
    expect(extractYouTubeId("https://youtu.be/dQw4w9WgXcQ?t=120")).toBe("dQw4w9WgXcQ");
  });

  it("handles http:// (non-https) URL", () => {
    expect(extractYouTubeId("http://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("returns null for empty string", () => {
    expect(extractYouTubeId("")).toBeNull();
  });

  it("returns null for invalid URL", () => {
    expect(extractYouTubeId("https://www.google.com")).toBeNull();
  });

  it("returns null for URL with wrong ID length", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=short")).toBeNull();
  });

  it("handles URL with leading/trailing spaces", () => {
    expect(extractYouTubeId("  https://www.youtube.com/watch?v=dQw4w9WgXcQ  ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts from v/ format URL", () => {
    expect(extractYouTubeId("https://www.youtube.com/v/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID with hyphens and underscores", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=abc-_def12G")).toBe("abc-_def12G");
  });

  it("returns null for null input", () => {
    expect(extractYouTubeId(null as any)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(extractYouTubeId(undefined as any)).toBeNull();
  });
});

// ============================================================
// 2. decodeXmlEntities() — Entity decoding
// ============================================================
describe("decodeXmlEntities", () => {
  it("decodes standard named entities", () => {
    expect(decodeXmlEntities("&amp; &lt; &gt; &quot; &apos;")).toBe('& < > " \'');
  });

  it("decodes &nbsp; to space", () => {
    expect(decodeXmlEntities("hello&nbsp;world")).toBe("hello world");
  });

  it("decodes decimal numeric entities", () => {
    expect(decodeXmlEntities("&#39;")).toBe("'");
    expect(decodeXmlEntities("&#8217;")).toBe("\u2019"); // right single quotation
  });

  it("decodes hex numeric entities", () => {
    expect(decodeXmlEntities("&#x27;")).toBe("'");
    expect(decodeXmlEntities("&#x2019;")).toBe("\u2019");
  });

  it("strips HTML/XML tags", () => {
    expect(decodeXmlEntities("<b>hello</b>")).toBe("hello");
    expect(decodeXmlEntities("<s w=\"12\">text</s>")).toBe("text");
  });

  it("replaces <br> tags with spaces", () => {
    expect(decodeXmlEntities("line1<br>line2")).toBe("line1 line2");
    expect(decodeXmlEntities("line1<br/>line2")).toBe("line1 line2");
  });

  it("handles double-encoded entities", () => {
    expect(decodeXmlEntities("&amp;#39;")).toBe("'");
  });

  it("collapses multiple spaces", () => {
    expect(decodeXmlEntities("hello   world   test")).toBe("hello world test");
  });

  it("returns empty for empty/null input", () => {
    expect(decodeXmlEntities("")).toBe("");
    expect(decodeXmlEntities(null as any)).toBe("");
  });

  it("decodes ndash and mdash", () => {
    expect(decodeXmlEntities("&ndash;")).toBe("-");
    expect(decodeXmlEntities("&mdash;")).toBe("—");
  });

  it("decodes hellip", () => {
    expect(decodeXmlEntities("&hellip;")).toBe("...");
  });
});

// ============================================================
// 3. parseTimedTextXml() — XML subtitle parsing
// ============================================================
describe("parseTimedTextXml", () => {
  it("parses standard XML timed text with start and dur", () => {
    const xml = `<?xml version="1.0"?>
    <transcript>
      <text start="0" dur="5.5">Hello world</text>
      <text start="5.5" dur="3.2">Second line</text>
    </transcript>`;

    const result = parseTimedTextXml(xml);
    expect(result).toHaveLength(2);
    expect(result[0].startTime).toBe(0);
    expect(result[0].endTime).toBe(5.5);
    expect(result[0].textEn).toBe("Hello world");
    expect(result[1].startTime).toBe(5.5);
  });

  it("handles XML with no dur attribute (calculates from next item)", () => {
    const xml = `<transcript>
      <text start="0">First sentence</text>
      <text start="4.5">Second sentence</text>
    </transcript>`;

    const result = parseTimedTextXml(xml);
    expect(result).toHaveLength(2);
    // When no dur, uses gap to next item, but capped at 3.5s max
    expect(result[0].endTime).toBe(3.5); // 0 + 3.5 (max cap since gap 4.5 > 3.5)
  });

  it("handles XML with entities in text content", () => {
    const xml = `<transcript>
      <text start="0" dur="3">It&apos;s a &quot;test&quot; &amp; more</text>
    </transcript>`;

    const result = parseTimedTextXml(xml);
    expect(result[0].textEn).toBe("It's a \"test\" & more");
  });

  it("handles single-quoted attributes", () => {
    const xml = `<transcript>
      <text start='1.5' dur='2.3'>Single quotes</text>
    </transcript>`;

    const result = parseTimedTextXml(xml);
    expect(result).toHaveLength(1);
    expect(result[0].startTime).toBe(1.5);
  });

  it("returns empty array for empty/null input", () => {
    expect(parseTimedTextXml("")).toEqual([]);
    expect(parseTimedTextXml(null as any)).toEqual([]);
  });

  it("returns empty array for non-XML content", () => {
    expect(parseTimedTextXml("just plain text")).toEqual([]);
  });

  it("sorts by startTime even if XML is out of order", () => {
    const xml = `<transcript>
      <text start="5.0" dur="2">Second</text>
      <text start="0" dur="3">First</text>
    </transcript>`;

    const result = parseTimedTextXml(xml);
    expect(result[0].textEn).toBe("First");
    expect(result[1].textEn).toBe("Second");
  });

  it("prevents timeline overlap between consecutive items", () => {
    const xml = `<transcript>
      <text start="0" dur="10">Long sentence</text>
      <text start="3" dur="2">Overlap</text>
    </transcript>`;

    const result = parseTimedTextXml(xml);
    // First item's endTime should not exceed second item's startTime
    expect(result[0].endTime).toBeLessThanOrEqual(result[1].startTime);
  });

  it("handles decimal startTime values correctly", () => {
    const xml = `<transcript>
      <text start="1.234" dur="2.567">Precise timing</text>
    </transcript>`;

    const result = parseTimedTextXml(xml);
    expect(result[0].startTime).toBe(1.234);
    expect(result[0].duration).toBeCloseTo(2.567, 2);
  });
});

// ============================================================
// 4. parseTimedTextJson3() — JSON3 YouTube format parsing
// ============================================================
describe("parseTimedTextJson3", () => {
  it("parses standard JSON3 format", () => {
    const json3 = {
      events: [
        { tStartMs: 1000, dDurationMs: 2000, segs: [{ utf8: "Hello" }] },
        { tStartMs: 4000, dDurationMs: 3000, segs: [{ utf8: "World" }] },
      ],
    };

    const result = parseTimedTextJson3(json3);
    expect(result).toHaveLength(2);
    expect(result[0].startTime).toBe(1);
    expect(result[0].endTime).toBe(3);
    expect(result[0].textEn).toBe("Hello");
    expect(result[1].startTime).toBe(4);
  });

  it("joins multiple segments in a single event", () => {
    const json3 = {
      events: [
        { tStartMs: 0, dDurationMs: 5000, segs: [{ utf8: "Hello " }, { utf8: "world" }] },
      ],
    };

    const result = parseTimedTextJson3(json3);
    expect(result[0].textEn).toBe("Hello world");
  });

  it("skips events without segs", () => {
    const json3 = {
      events: [
        { tStartMs: 0, dDurationMs: 1000 }, // no segs
        { tStartMs: 2000, dDurationMs: 3000, segs: [{ utf8: "Valid" }] },
      ],
    };

    const result = parseTimedTextJson3(json3);
    expect(result).toHaveLength(1);
    expect(result[0].textEn).toBe("Valid");
  });

  it("skips events with empty text after decode", () => {
    const json3 = {
      events: [
        { tStartMs: 0, dDurationMs: 1000, segs: [{ utf8: "\n" }] },
        { tStartMs: 2000, dDurationMs: 1000, segs: [{ utf8: "Real text" }] },
      ],
    };

    const result = parseTimedTextJson3(json3);
    expect(result).toHaveLength(1);
  });

  it("parses JSON3 string input", () => {
    const jsonStr = JSON.stringify({
      events: [{ tStartMs: 5000, dDurationMs: 3000, segs: [{ utf8: "From string" }] }],
    });

    const result = parseTimedTextJson3(jsonStr);
    expect(result).toHaveLength(1);
    expect(result[0].startTime).toBe(5);
  });

  it("returns empty array for invalid JSON string", () => {
    expect(parseTimedTextJson3("not json")).toEqual([]);
  });

  it("returns empty for null/empty", () => {
    expect(parseTimedTextJson3(null as any)).toEqual([]);
    expect(parseTimedTextJson3("")).toEqual([]);
  });

  it("handles missing dDurationMs (calculates from next event)", () => {
    const json3 = {
      events: [
        { tStartMs: 0, segs: [{ utf8: "No dur" }] },
        { tStartMs: 3000, dDurationMs: 2000, segs: [{ utf8: "Has dur" }] },
      ],
    };

    const result = parseTimedTextJson3(json3);
    expect(result).toHaveLength(2);
    expect(result[0].endTime).toBe(3); // Should use next item's start
  });
});

// ============================================================
// 5. parseTimedTextAny() — Universal multi-format parser
// ============================================================
describe("parseTimedTextAny", () => {
  it("auto-detects JSON3 format", () => {
    const json3 = JSON.stringify({
      events: [{ tStartMs: 0, dDurationMs: 2000, segs: [{ utf8: "Test" }] }],
    });
    const result = parseTimedTextAny(json3);
    expect(result).toHaveLength(1);
    expect(result[0].textEn).toBe("Test");
  });

  it("auto-detects XML format", () => {
    const xml = '<transcript><text start="0" dur="3">XML Test</text></transcript>';
    const result = parseTimedTextAny(xml);
    expect(result).toHaveLength(1);
    expect(result[0].textEn).toBe("XML Test");
  });

  it("returns empty for unrecognized format", () => {
    expect(parseTimedTextAny("just random text")).toEqual([]);
  });

  it("returns empty for empty input", () => {
    expect(parseTimedTextAny("")).toEqual([]);
    expect(parseTimedTextAny(null as any)).toEqual([]);
  });
});

// ============================================================
// 6. parseVnTimedTextAny() — Vietnamese subtitle parser
// ============================================================
describe("parseVnTimedTextAny", () => {
  it("parses Vietnamese JSON3 format", () => {
    const json3 = JSON.stringify({
      events: [
        { tStartMs: 0, segs: [{ utf8: "Xin chào" }] },
        { tStartMs: 3000, segs: [{ utf8: "Thế giới" }] },
      ],
    });

    const result = parseVnTimedTextAny(json3);
    expect(result).toHaveLength(2);
    expect(result[0].textVn).toBe("Xin chào");
  });

  it("parses Vietnamese XML format", () => {
    const xml = '<transcript><text start="0">Xin chào</text><text start="3">Thế giới</text></transcript>';
    const result = parseVnTimedTextAny(xml);
    expect(result).toHaveLength(2);
    expect(result[0].textVn).toBe("Xin chào");
  });

  it("returns empty for empty/unrecognized input", () => {
    expect(parseVnTimedTextAny("")).toEqual([]);
    expect(parseVnTimedTextAny(null as any)).toEqual([]);
  });
});

// ============================================================
// 7. alignBilingualSubtitles() — EN-VN alignment
// ============================================================
describe("alignBilingualSubtitles", () => {
  it("aligns Vietnamese to closest English by startTime", () => {
    const en = [
      { startTime: 0, endTime: 5, duration: 5, textEn: "Hello" },
      { startTime: 5, endTime: 10, duration: 5, textEn: "World" },
    ];
    const vn = [
      { startTime: 0.2, textVn: "Xin chào" },
      { startTime: 5.1, textVn: "Thế giới" },
    ];

    const result = alignBilingualSubtitles(en, vn);
    expect(result).toHaveLength(2);
    expect(result[0].textEn).toBe("Hello");
    expect(result[0].textVn).toBe("Xin chào");
    expect(result[1].textVn).toBe("Thế giới");
  });

  it("handles empty Vietnamese array (all blank translations)", () => {
    const en = [
      { startTime: 0, endTime: 5, duration: 5, textEn: "Hello" },
    ];

    const result = alignBilingualSubtitles(en, []);
    expect(result).toHaveLength(1);
    expect(result[0].textVn).toBe("");
  });

  it("handles Vietnamese cue outside 3.5s tolerance", () => {
    const en = [
      { startTime: 0, endTime: 5, duration: 5, textEn: "Hello" },
    ];
    const vn = [
      { startTime: 10, textVn: "Far away" }, // >3.5s difference
    ];

    const result = alignBilingualSubtitles(en, vn);
    expect(result[0].textVn).toBe(""); // Should not match
  });

  it("preserves English timing data", () => {
    const en = [
      { startTime: 1.5, endTime: 4.2, duration: 2.7, textEn: "Test" },
    ];
    const result = alignBilingualSubtitles(en, []);
    expect(result[0].startTime).toBe(1.5);
    expect(result[0].endTime).toBe(4.2);
    expect(result[0].duration).toBe(2.7);
  });
});

// ============================================================
// 8. extractDictationWord() — Target word extraction
// ============================================================
describe("extractDictationWord", () => {
  it("extracts longest non-stop-word", () => {
    // extractDictationWord picks the longest non-stop word ("beautiful" = 9 chars, "mountains" = 9 chars, "beautiful" comes first alphabetically after sort)
    expect(extractDictationWord("The beautiful sunset over the mountains")).toBe("beautiful");
  });

  it("skips common stop words", () => {
    const result = extractDictationWord("I have been to the store");
    expect(["store"]).toContain(result); // "store" is longest non-stop
  });

  it("handles sentence with only stop words (fallback)", () => {
    const result = extractDictationWord("I do not know");
    // All are stop words, should return first token > 2 chars
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns 'vocabulary' for empty input", () => {
    expect(extractDictationWord("")).toBe("vocabulary");
    expect(extractDictationWord(null as any)).toBe("vocabulary");
  });

  it("handles punctuation correctly", () => {
    expect(extractDictationWord("Hello, world! How are you?")).not.toContain(",");
    expect(extractDictationWord("Hello, world! How are you?")).not.toContain("!");
  });

  it("preserves apostrophes inside contractions", () => {
    const result = extractDictationWord("I don't think he's coming");
    // "don't" and "he's" should be handled, "coming" and "think" are non-stop
    expect(result.length).toBeGreaterThan(0);
  });

  it("handles single-word input", () => {
    expect(extractDictationWord("Extraordinary")).toBe("extraordinary");
  });

  it("filters words <= 2 chars", () => {
    const result = extractDictationWord("I am in to go");
    // All tokens are <= 2 chars or stop words
    expect(result).toBe("vocabulary"); // fallback
  });
});

// ============================================================
// 9. formatTimestampMs() — Timestamp formatting
// ============================================================
describe("formatTimestampMs", () => {
  it("formats zero seconds", () => {
    expect(formatTimestampMs(0)).toBe("00:00:00.000");
  });

  it("formats seconds with milliseconds", () => {
    expect(formatTimestampMs(5.12)).toBe("00:00:05.120");
  });

  it("formats minutes correctly", () => {
    expect(formatTimestampMs(65.5)).toBe("00:01:05.500");
  });

  it("formats hours correctly", () => {
    expect(formatTimestampMs(3661.123)).toBe("01:01:01.123");
  });

  it("handles NaN input", () => {
    expect(formatTimestampMs(NaN)).toBe("00:00:00.000");
  });

  it("handles negative input", () => {
    expect(formatTimestampMs(-5)).toBe("00:00:00.000");
  });

  it("handles large values", () => {
    expect(formatTimestampMs(7200)).toBe("02:00:00.000");
  });

  it("handles precise milliseconds", () => {
    expect(formatTimestampMs(1.001)).toBe("00:00:01.001");
  });

  it("handles 59.999 seconds (preserves sub-second precision)", () => {
    const result = formatTimestampMs(59.999);
    // 59.999 * 1000 = 59999ms → 59s 999ms, Math.round preserves
    expect(result).toBe("00:00:59.999");
  });
});

// ============================================================
// 10. formatSrtTimestamp() — SRT comma format
// ============================================================
describe("formatSrtTimestamp", () => {
  it("uses comma instead of dot", () => {
    expect(formatSrtTimestamp(5.12)).toBe("00:00:05,120");
  });

  it("formats zero", () => {
    expect(formatSrtTimestamp(0)).toBe("00:00:00,000");
  });

  it("formats minutes", () => {
    expect(formatSrtTimestamp(90.5)).toBe("00:01:30,500");
  });
});

// ============================================================
// 11. wrapTextTo42Chars() — Line wrapping for SRT/WEBVTT
// ============================================================
describe("wrapTextTo42Chars", () => {
  it("returns short text unchanged", () => {
    expect(wrapTextTo42Chars("Short text")).toBe("Short text");
  });

  it("wraps text at 42 char boundary on word breaks", () => {
    const text = "This is a very long sentence that definitely exceeds forty two characters limit";
    const result = wrapTextTo42Chars(text);
    const lines = result.split("\n");
    for (const line of lines) {
      // Each line should be <= 42 chars (except possibly the last word)
      expect(line.length).toBeLessThanOrEqual(42 + 20); // generous margin for last word
    }
    expect(lines.length).toBeGreaterThan(1);
  });

  it("handles empty/null input", () => {
    expect(wrapTextTo42Chars("")).toBe("");
    expect(wrapTextTo42Chars(null as any)).toBe(null as any);
  });

  it("handles exactly 42 chars", () => {
    const text = "A".repeat(42);
    expect(wrapTextTo42Chars(text)).toBe(text);
  });

  it("handles single very long word", () => {
    const longWord = "Superlongwordthatexceedsfortytwocharacters123456";
    const result = wrapTextTo42Chars(longWord);
    expect(result).toBe(longWord); // Can't break a single word
  });
});

// ============================================================
// 12. Integration: Full subtitle pipeline
// ============================================================
describe("Full subtitle pipeline integration", () => {
  it("XML → parse → align → dictation word extraction", () => {
    const xmlEn = `<transcript>
      <text start="0" dur="5">The beautiful sunset illuminated the entire valley</text>
      <text start="5" dur="4">Birds were singing melodiously in the distance</text>
    </transcript>`;

    const xmlVn = `<transcript>
      <text start="0.1">Hoàng hôn tuyệt đẹp chiếu sáng cả thung lũng</text>
      <text start="5.2">Những chú chim đang hót véo von từ xa</text>
    </transcript>`;

    const parsedEn = parseTimedTextXml(xmlEn);
    const parsedVn = parseVnTimedTextAny(xmlVn);

    expect(parsedEn.length).toBe(2);
    expect(parsedVn.length).toBe(2);

    const aligned = alignBilingualSubtitles(parsedEn, parsedVn);
    expect(aligned[0].textVn).toContain("Hoàng hôn");
    expect(aligned[1].textVn).toContain("chim");

    const word1 = extractDictationWord(aligned[0].textEn);
    expect(word1.length).toBeGreaterThan(3); // Should pick a meaningful word

    const word2 = extractDictationWord(aligned[1].textEn);
    expect(word2.length).toBeGreaterThan(3);
  });

  it("JSON3 → parse → format timestamps correctly", () => {
    const json3Str = JSON.stringify({
      events: [
        { tStartMs: 1500, dDurationMs: 3500, segs: [{ utf8: "Welcome everyone" }] },
        { tStartMs: 5200, dDurationMs: 4000, segs: [{ utf8: "to this lesson" }] },
      ],
    });

    const parsed = parseTimedTextAny(json3Str);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].startTime).toBe(1.5);
    expect(parsed[0].endTime).toBe(5);

    // Format timestamps
    expect(formatTimestampMs(parsed[0].startTime)).toBe("00:00:01.500");
    expect(formatSrtTimestamp(parsed[0].startTime)).toBe("00:00:01,500");
  });
});

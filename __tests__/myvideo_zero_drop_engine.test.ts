import { describe, it, expect } from "vitest";
import {
  parseTimedTextXml,
  parseTimedTextJson3,
  parseTimedTextAny,
  mergeFragmentedSubtitlesIntoSentences,
  bridgeSubtitleGaps,
  alignBilingualSubtitles,
  extractDictationWord,
} from "@/features/listening/services/youtubeSubtitleParser";

describe("MyVideo Zero-Drop YouTube Caption Engine Tests", () => {
  describe("1. XML TimedText Deduplication & Parsing", () => {
    it("deduplicates identical repeating XML cues within 0.8s", () => {
      const xmlWithDuplicates = `
        <transcript>
          <text start="1.0" dur="1.5">Welcome everyone</text>
          <text start="1.2" dur="1.5">Welcome everyone</text>
          <text start="3.0" dur="2.0">Today we discuss AI</text>
        </transcript>
      `;

      const parsed = parseTimedTextXml(xmlWithDuplicates);
      expect(parsed.length).toBe(2);
      expect(parsed[0].textEn).toBe("Welcome everyone");
      expect(parsed[0].startTime).toBe(1.0);
      expect(parsed[0].duration).toBeGreaterThanOrEqual(1.5);
      expect(parsed[1].textEn).toBe("Today we discuss AI");
    });

    it("parses TTML format <p t='...' d='...'> correctly without dropping sentences", () => {
      const ttmlContent = `
        <tt>
          <body>
            <div>
              <p t="1000" d="2000">First sentence in TTML</p>
              <p t="3500" d="1500">Second sentence in TTML</p>
            </div>
          </body>
        </tt>
      `;

      const parsed = parseTimedTextAny(ttmlContent);
      expect(parsed.length).toBe(2);
      expect(parsed[0].textEn).toBe("First sentence in TTML");
      expect(parsed[0].startTime).toBe(1.0);
      expect(parsed[1].textEn).toBe("Second sentence in TTML");
      expect(parsed[1].startTime).toBe(3.5);
    });
  });

  describe("2. JSON3 Streaming Deduplication & Vocabulary Preservation", () => {
    it("merges exact duplicate ASR cues without adding duplicate entries", () => {
      const json3Data = {
        events: [
          { tStartMs: 1000, dDurationMs: 1500, segs: [{ utf8: "Hello world" }] },
          { tStartMs: 1200, dDurationMs: 1500, segs: [{ utf8: "Hello world" }] },
          { tStartMs: 3000, dDurationMs: 2000, segs: [{ utf8: "How are you" }] },
        ],
      };

      const parsed = parseTimedTextJson3(json3Data);
      expect(parsed.length).toBe(2);
      expect(parsed[0].textEn).toBe("Hello world");
      expect(parsed[1].textEn).toBe("How are you");
    });

    it("merges extending ASR rolling prefixes into the complete sentence", () => {
      const json3Data = {
        events: [
          { tStartMs: 1000, dDurationMs: 1000, segs: [{ utf8: "I think" }] },
          { tStartMs: 1400, dDurationMs: 2000, segs: [{ utf8: "I think that this is" }] },
          { tStartMs: 1900, dDurationMs: 2500, segs: [{ utf8: "I think that this is awesome" }] },
        ],
      };

      const parsed = parseTimedTextJson3(json3Data);
      expect(parsed.length).toBe(1);
      expect(parsed[0].textEn).toBe("I think that this is awesome");
      expect(parsed[0].startTime).toBe(1.0);
    });

    it("preserves distinct sequential sentences without swallowing content", () => {
      const json3Data = {
        events: [
          { tStartMs: 1000, dDurationMs: 1500, segs: [{ utf8: "Never give up." }] },
          { tStartMs: 3000, dDurationMs: 1500, segs: [{ utf8: "Always keep learning." }] },
          { tStartMs: 5000, dDurationMs: 2000, segs: [{ utf8: "Success will come." }] },
        ],
      };

      const parsed = parseTimedTextJson3(json3Data);
      expect(parsed.length).toBe(3);
      expect(parsed[0].textEn).toBe("Never give up.");
      expect(parsed[1].textEn).toBe("Always keep learning.");
      expect(parsed[2].textEn).toBe("Success will come.");
    });
  });

  describe("3. Sentence Boundary Stitching & Gap Bridging", () => {
    it("stitches tiny trailing word fragments into preceding sentence", () => {
      const fragments = [
        { startTime: 1.0, endTime: 2.5, duration: 1.5, textEn: "We are building an amazing" },
        { startTime: 2.6, endTime: 3.2, duration: 0.6, textEn: "product" },
        { startTime: 4.5, endTime: 6.0, duration: 1.5, textEn: "for global learners." },
      ];

      const merged = mergeFragmentedSubtitlesIntoSentences(fragments);
      expect(merged.length).toBe(2);
      expect(merged[0].textEn).toBe("We are building an amazing product");
      expect(merged[1].textEn).toBe("for global learners.");
    });

    it("preserves already punctuated author sentences without altering them", () => {
      const authorSentences = [
        { startTime: 1.0, endTime: 3.0, duration: 2.0, textEn: "Stay hungry, stay foolish." },
        { startTime: 3.2, endTime: 5.5, duration: 2.3, textEn: "Your time is limited." },
        { startTime: 5.8, endTime: 8.0, duration: 2.2, textEn: "Don't waste it." },
        { startTime: 8.2, endTime: 11.0, duration: 2.8, textEn: "Follow your heart." },
        { startTime: 11.2, endTime: 14.0, duration: 2.8, textEn: "Have the courage to speak." },
        { startTime: 14.2, endTime: 17.0, duration: 2.8, textEn: "Everything else is secondary." },
      ];

      const merged = mergeFragmentedSubtitlesIntoSentences(authorSentences);
      expect(merged.length).toBe(authorSentences.length);
      expect(merged[0].textEn).toBe("Stay hungry, stay foolish.");
    });

    it("bridges silence gaps smaller than 0.45s to prevent subtitle flicker", () => {
      const items = [
        { startTime: 1.0, endTime: 2.8, duration: 1.8, textEn: "Sentence one" },
        { startTime: 3.1, endTime: 5.0, duration: 1.9, textEn: "Sentence two" }, // Gap: 0.3s (<= 0.45s)
        { startTime: 6.5, endTime: 8.0, duration: 1.5, textEn: "Sentence three" }, // Gap: 1.5s (> 0.45s)
      ];

      const bridged = bridgeSubtitleGaps(items);
      expect(bridged[0].endTime).toBe(3.1); // Bridged seamlessly to next start
      expect(bridged[1].endTime).toBe(5.0); // Not bridged because 1.5s gap is genuine silence
    });
  });

  describe("4. Bilingual Alignment & Stop-Words Dictation Extraction", () => {
    it("aligns English and Vietnamese subtitle tracks accurately", () => {
      const enItems = [
        { startTime: 1.0, endTime: 3.5, duration: 2.5, textEn: "Knowledge is power." },
        { startTime: 4.0, endTime: 7.0, duration: 3.0, textEn: "Practice makes perfect." },
      ];
      const vnItems = [
        { startTime: 1.1, textVn: "Kiến thức là sức mạnh." },
        { startTime: 4.2, textVn: "Có công mài sắt có ngày nên kim." },
      ];

      const aligned = alignBilingualSubtitles(enItems, vnItems);
      expect(aligned.length).toBe(2);
      expect(aligned[0].textVn).toBe("Kiến thức là sức mạnh.");
      expect(aligned[1].textVn).toBe("Có công mài sắt có ngày nên kim.");
    });

    it("extracts meaningful vocabulary for dictation excluding stop-words", () => {
      expect(extractDictationWord("I am honored to be with you today")).toBe("honored");
      expect(extractDictationWord("Don't waste your precious time")).toBe("precious");
      expect(extractDictationWord("Stay hungry, stay foolish")).toBe("foolish");
    });
  });
});

import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { extractYouTubeVideoId } from "@/features/listening/utils/videoUrlHelper";
import { isAllowedYouTubeTimedTextUrl } from "@/infrastructure/security/youtubeSubtitleUrl";
import {
  extractBalancedJsonAt,
  extractPlayerMetaFromHtml,
  extractYouTubeCaptionsOnServer,
  isGoogleBlockOrConsentHtml,
} from "@/features/listening/services/youtubeTrackExtractor";
import {
  fetchLrclibSyncedLyrics,
  isSafeLrclibCandidate,
} from "@/features/listening/services/lrclibLyricsService";
import {
  parseTimedTextAny,
  parseVnTimedTextAny,
} from "@/features/listening/services/youtubeSubtitleParser";
import {
  deduplicateRollingAsrCues,
  splitMultiSentenceCues,
  mergeBrokenSentenceFragments,
  alignBilingualByOverlap,
  finalizeSubtitleTimeline,
  normalizeSubtitlePipeline,
} from "@/features/listening/services/subtitleNormalizer";
import { refineUnpunctuatedAsrSubtitles } from "@/features/listening/services/aiSubtitleRefiner";
import { translateMissingVietnameseBatch } from "@/features/listening/services/subtitleTranslateHelper";
import { GET as captionsGet } from "@/app/api/youtube/captions/route";
import { GET as proxyGet } from "@/app/api/youtube/subtitles/proxy/route";

describe("YouTube Subtitle Extraction, Normalization & Anti-Hallucination Suite", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.GEMINI_API_KEY;
  });

  describe("1. YouTube URL ID Extraction (watch, youtu.be, shorts, live, embed)", () => {
    it("extracts 11-char ID across all modern YouTube URL formats", () => {
      const id = "UF8uR6Z6KLc";
      expect(extractYouTubeVideoId(`https://www.youtube.com/watch?v=${id}&t=42s`)).toBe(id);
      expect(extractYouTubeVideoId(`https://youtu.be/${id}?si=share123`)).toBe(id);
      expect(extractYouTubeVideoId(`https://www.youtube.com/shorts/${id}`)).toBe(id);
      expect(extractYouTubeVideoId(`https://www.youtube.com/live/${id}?feature=share`)).toBe(id);
      expect(extractYouTubeVideoId(`https://m.youtube.com/watch?v=${id}`)).toBe(id);
      expect(extractYouTubeVideoId(`https://music.youtube.com/watch?v=${id}`)).toBe(id);
      expect(extractYouTubeVideoId(`https://www.youtube.com/embed/${id}`)).toBe(id);
      expect(extractYouTubeVideoId(id)).toBe(id);
      expect(extractYouTubeVideoId("https://example.com/not-youtube")).toBeNull();
    });
  });

  describe("2. SSRF Allowlist & Proxy Validation", () => {
    it("allows valid YouTube timedtext domains including m.youtube.com and blocks internal SSRF URLs", () => {
      expect(
        isAllowedYouTubeTimedTextUrl("https://www.youtube.com/api/timedtext?v=UF8uR6Z6KLc&lang=en")
      ).toBe(true);
      expect(
        isAllowedYouTubeTimedTextUrl("https://m.youtube.com/api/timedtext?v=UF8uR6Z6KLc&lang=en")
      ).toBe(true);
      expect(
        isAllowedYouTubeTimedTextUrl("https://music.youtube.com/api/timedtext?v=UF8uR6Z6KLc&lang=en")
      ).toBe(true);
      expect(isAllowedYouTubeTimedTextUrl("http://169.254.169.254/latest/meta-data/")).toBe(false);
      expect(isAllowedYouTubeTimedTextUrl("https://www.youtube.com/watch?v=UF8uR6Z6KLc")).toBe(false);
    });

    it("detects Google Sorry / Consent / Login walls and proxy rejects empty 200 payloads", async () => {
      expect(isGoogleBlockOrConsentHtml("<html><title>Sorry...</title>automated queries</html>")).toBe(true);
      expect(isGoogleBlockOrConsentHtml("https://accounts.google.com/ServiceLogin")).toBe(true);
      expect(isGoogleBlockOrConsentHtml("")).toBe(true);

      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(new Response("", { status: 200 }))
      );

      const req = new NextRequest(
        "http://localhost:3000/api/youtube/subtitles/proxy?url=" +
          encodeURIComponent("https://www.youtube.com/api/timedtext?v=UF8uR6Z6KLc&lang=en")
      );
      const res = await proxyGet(req);
      expect(res.status).toBe(502);
    });
  });

  describe("3. Balanced JSON Extractor & BCP-47 Player Meta Parsing", () => {
    it("parses ytInitialPlayerResponse safely even with semicolons/braces inside string literals", () => {
      const html = `
        <html><body><script>
          var ytInitialPlayerResponse = {
            "playabilityStatus": { "status": "OK" },
            "videoDetails": { "title": "Hello; {World} Speech", "author": "TED", "lengthSeconds": "185" },
            "captions": {
              "playerCaptionsTracklistRenderer": {
                "captionTracks": [
                  {
                    "baseUrl": "https://www.youtube.com/api/timedtext?v=UF8uR6Z6KLc\\u0026lang=en-US",
                    "name": { "simpleText": "English (United States)" },
                    "languageCode": "en-US",
                    "vssId": ".en-US",
                    "isTranslatable": true
                  }
                ],
                "translationLanguages": [
                  { "languageCode": "vi", "languageName": { "simpleText": "Vietnamese" } }
                ]
              }
            }
          }; var extra = 1;
        </script></body></html>
      `;

      const bracePos = html.indexOf("{");
      const rawJson = extractBalancedJsonAt(html, bracePos, "{", "}");
      expect(rawJson).toBeTruthy();
      expect(() => JSON.parse(rawJson!)).not.toThrow();

      const meta = extractPlayerMetaFromHtml(html);
      expect(meta.title).toBe("Hello; {World} Speech");
      expect(meta.authorName).toBe("TED");
      expect(meta.durationSeconds).toBe(185);
      expect(meta.tracks.length).toBe(1);
      expect(meta.tracks[0].lang).toBe("en-US");
      expect(meta.tracks[0].isAutoGenerated).toBe(false);
    });
  });

  describe("4. Anti-Hallucination Policy on /api/youtube/captions", () => {
    it("returns 404 NO_CAPTIONS cleanly instead of fabricating fake subtitles when upstream yields nothing", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockImplementation(() =>
          Promise.resolve(new Response(JSON.stringify({ playabilityStatus: { status: "OK" } }), { status: 200 }))
        )
      );

      const req = new NextRequest(
        "http://localhost:3000/api/youtube/captions?videoId=abcDEF12345&force=1"
      );
      const res = await captionsGet(req);
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.success).toBe(false);
      expect(json.hasCaptions).toBe(false);
      expect(json.subtitles).toEqual([]);
      expect(json.isAiGenerated).toBe(false);
    });
  });

  describe("5. Subtitle Normalization Pipeline (ASR dedup, splitting, merging, overlap, timeline)", () => {
    it("deduplicates rolling ASR prefixes across both EN and VN cues and strips stage cues", () => {
      const cleaned = deduplicateRollingAsrCues([
        { startTime: 1.0, endTime: 2.0, duration: 1.0, text: "[Music] Today I want" },
        { startTime: 2.0, endTime: 3.5, duration: 1.5, text: "Today I want to talk" },
        { startTime: 3.5, endTime: 5.0, duration: 1.5, text: "to talk about the future." },
      ]);
      expect(cleaned.map((c) => c.text).join(" ")).toBe("Today I want to talk about the future.");

      const vnXml = `
        <transcript>
          <text start="1.0" dur="1.0">Hôm nay</text>
          <text start="2.0" dur="1.5">Hôm nay tôi muốn</text>
        </transcript>
      `;
      const vnParsed = parseVnTimedTextAny(vnXml);
      expect(vnParsed.map((v) => v.textVn).join(" ")).toBe("Hôm nay tôi muốn");
    });

    it("splits multi-sentence cues cleanly while protecting Mr., Dr., U.S., and decimals", () => {
      const split = splitMultiSentenceCues([
        {
          startTime: 1.0,
          endTime: 11.0,
          duration: 10.0,
          textEn: "Dr. Smith visited the U.S. with 3.5 million users! Then he returned home.",
        },
      ]);

      expect(split.length).toBe(2);
      expect(split[0].textEn).toBe("Dr. Smith visited the U.S. with 3.5 million users!");
      expect(split[1].textEn).toBe("Then he returned home.");
      expect(split[0].endTime).toBeLessThanOrEqual(split[1].startTime + 0.01);
    });

    it("merges manual multi-line fragments (>35% punctuation) without terminal punctuation while breaking at periods and pauses", () => {
      const merged = mergeBrokenSentenceFragments([
        { startTime: 0.0, endTime: 2.0, duration: 2.0, textEn: "When I was sixteen," },
        { startTime: 2.0, endTime: 4.5, duration: 2.5, textEn: "I moved to London." },
        { startTime: 4.6, endTime: 6.0, duration: 1.4, textEn: "It changed my life." },
        { startTime: 7.5, endTime: 9.5, duration: 2.0, textEn: "Yes, completely!" },
      ]);

      expect(merged.length).toBe(3);
      expect(merged[0].textEn).toBe("When I was sixteen, I moved to London.");
      expect(merged[0].startTime).toBe(0);
      expect(merged[1].textEn).toBe("It changed my life.");
      expect(merged[2].textEn).toBe("Yes, completely!");
    });

    it("assigns Vietnamese cues by highest overlap without repeating cues across sentences", () => {
      const en = [
        { startTime: 0, endTime: 3.0, duration: 3.0, textEn: "Hello everyone." },
        { startTime: 3.0, endTime: 7.0, duration: 4.0, textEn: "Welcome to our masterclass." },
      ];
      const vn = [
        { startTime: 0.2, endTime: 2.8, textVn: "Xin chào mọi người." },
        { startTime: 3.1, endTime: 4.8, textVn: "Chào mừng đến với" },
        { startTime: 4.9, endTime: 6.9, textVn: "lớp học chuyên sâu của chúng tôi." },
      ];

      const aligned = alignBilingualByOverlap(en, vn);
      expect(aligned[0].textVn).toBe("Xin chào mọi người.");
      expect(aligned[1].textVn).toBe("Chào mừng đến với lớp học chuyên sâu của chúng tôi.");
    });

    it("keeps wordTimings monotonically clamped inside sentence bounds even with 0s start", () => {
      const finalized = finalizeSubtitleTimeline([
        {
          startTime: 0,
          endTime: 3.0,
          duration: 3.0,
          textEn: "Good morning team.",
          wordTimings: [
            { word: "Good", start: 0, end: 0.8 },
            { word: "morning", start: 0.8, end: 1.8 },
            { word: "team.", start: 1.8, end: 3.5 },
          ],
        },
        {
          startTime: 2.5,
          endTime: 5.0,
          duration: 2.5,
          textEn: "Let us begin.",
        },
      ]);

      expect(finalized[0].startTime).toBe(0);
      expect(finalized[0].endTime).toBe(2.5);
      expect(finalized[0].wordTimings![2].end).toBe(2.5);
    });

    it("rolls back Tier-2 AI refiner cleanly if Gemini alters alphanumeric words", async () => {
      process.env.GEMINI_API_KEY = "test_key";
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          new Response(
            JSON.stringify({
              candidates: [
                {
                  content: {
                    parts: [
                      {
                        text: JSON.stringify([
                          "Hello everybody today we learn English!",
                          "Something hallucinated completely different.",
                        ]),
                      },
                    ],
                  },
                },
              ],
            }),
            { status: 200 }
          )
        )
      );

      const original = [
        { startTime: 0, endTime: 2, duration: 2, textEn: "hello everybody" },
        { startTime: 2, endTime: 4, duration: 2, textEn: "today we learn" },
        { startTime: 4, endTime: 6, duration: 2, textEn: "english together" },
        { startTime: 6, endTime: 8, duration: 2, textEn: "and improve" },
      ];

      const refined = await refineUnpunctuatedAsrSubtitles(original);
      expect(refined.map((r) => r.textEn)).toEqual(original.map((o) => o.textEn));
    });

    it("leaves textVn empty instead of echoing English when upstream translation fails", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network offline")));

      const res = await translateMissingVietnameseBatch([
        { textEn: "Never echo English back into Vietnamese field.", textVn: "" },
      ]);
      expect(res[0].textVn).toBe("");
    });

    it("runs full JSON3 rolling + VTT pipeline cleanly via parseTimedTextAny & normalizeSubtitlePipeline", () => {
      const json3 = JSON.stringify({
        events: [
          {
            tStartMs: 0,
            dDurationMs: 2500,
            segs: [
              { utf8: "Learning ", tOffsetMs: 0 },
              { utf8: "English ", tOffsetMs: 800 },
              { utf8: "is fun.", tOffsetMs: 1600 },
            ],
          },
          {
            tStartMs: 2500,
            dDurationMs: 2000,
            segs: [{ utf8: ">> Keep practicing!", tOffsetMs: 0 }],
          },
        ],
      });

      const parsed = parseTimedTextAny(json3);
      const normalized = normalizeSubtitlePipeline(parsed, []);
      expect(normalized.length).toBe(2);
      expect(normalized[0].startTime).toBe(0);
      expect(normalized[0].textEn).toBe("Learning English is fun.");
      expect(normalized[0].wordTimings?.length).toBe(4);
      expect(normalized[1].textEn).toBe("Keep practicing!");
    });
  });

  describe("6. Extraction Safety Guards, Block Detection, 429 Circuit Breaker & TED Alignment Regression", () => {
    it("recognizes real WatchHTML with captionTracks + ServiceLogin link as valid while flagging login/sorry pages as blocked", () => {
      const validWatchHtml = `<!DOCTYPE html><html><head><title>TED</title></head><body><a href="https://accounts.google.com/ServiceLogin?continue=https://www.youtube.com">Sign in</a><script>var ytInitialPlayerResponse = {"playabilityStatus":{"status":"OK"},"videoDetails":{"videoId":"eIho2S0ZahI","title":"How to speak"},"captions":{"playerCaptionsTracklistRenderer":{"captionTracks":[{"baseUrl":"https://www.youtube.com/api/timedtext?v=eIho2S0ZahI&lang=en","languageCode":"en"}]}}};</script></body></html>`;
      expect(isGoogleBlockOrConsentHtml(validWatchHtml)).toBe(false);
      expect(isGoogleBlockOrConsentHtml("https://accounts.google.com/ServiceLogin?continue=https://www.youtube.com")).toBe(true);
      expect(isGoogleBlockOrConsentHtml("<html><head><title>Sorry...</title></head><body>We're sorry, automated queries</body></html>")).toBe(true);
    });

    it("rejects PRIVATE_OR_UNAVAILABLE videos cleanly without calling LRCLIB", async () => {
      const fetchSpy = vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/youtubei/v1/player")) {
          return new Response(
            JSON.stringify({
              playabilityStatus: { status: "UNPLAYABLE", reason: "Video unavailable" },
              videoDetails: { videoId: "pvt00000001", title: "Video Học Tiếng Anh YouTube" },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        if (url.includes("lrclib.net")) {
          return new Response("[]", { status: 200 });
        }
        return new Response("<html><title>YouTube</title></html>", { status: 404 });
      });
      vi.stubGlobal("fetch", fetchSpy);

      const res = await extractYouTubeCaptionsOnServer("pvt00000001");
      expect(res.success).toBe(false);
      expect(res.failureReason).toBe("PRIVATE_OR_UNAVAILABLE");
      expect(res.subtitles).toEqual([]);
      const calledUrls = fetchSpy.mock.calls.map((c) => String(c[0]));
      expect(calledUrls.some((u) => u.includes("lrclib.net"))).toBe(false);
    });

    it("enforces LRCLIB non-music/placeholder rejection and candidate similarity/duration validation", async () => {
      const fetchSpy = vi.fn(async () => new Response("[]", { status: 200 }));
      vi.stubGlobal("fetch", fetchSpy);

      expect(await fetchLrclibSyncedLyrics("Video Học Tiếng Anh YouTube")).toEqual([]);
      expect(await fetchLrclibSyncedLyrics("How to speak so that people want to listen | Julian Treasure | TED")).toEqual([]);
      expect(await fetchLrclibSyncedLyrics("BBC Learning English - Food and Mood - 6 Minute English")).toEqual([]);
      expect(fetchSpy).not.toHaveBeenCalled();

      expect(
        isSafeLrclibCandidate(
          {
            id: 1,
            name: "Completely Unrelated Heavy Metal Song",
            artistName: "Unknown Band",
            duration: 213,
            syncedLyrics:
              "[00:10.00] Random unrelated metal chorus line one\n[00:15.00] Random unrelated metal chorus line two",
          },
          "Rick Astley - Never Gonna Give You Up (Official Video)",
          "Rick Astley",
          213
        )
      ).toBe(false);

      expect(
        isSafeLrclibCandidate(
          {
            id: 2,
            name: "Never Gonna Give You Up",
            artistName: "Rick Astley",
            duration: 480,
            syncedLyrics:
              "[00:10.00] Wrong remix duration line one\n[00:15.00] Wrong remix duration line two",
          },
          "Rick Astley - Never Gonna Give You Up",
          "Rick Astley",
          213
        )
      ).toBe(false);

      expect(
        isSafeLrclibCandidate(
          {
            id: 3,
            name: "Never Gonna Give You Up",
            artistName: "Rick Astley",
            duration: 213,
            syncedLyrics:
              "[00:18.00] We're no strangers to love\n[00:22.00] You know the rules and so do I",
          },
          "Rick Astley - Never Gonna Give You Up (Official Music Video)",
          "Rick Astley",
          213
        )
      ).toBe(true);
    });

    it("rejects non-English Hangul ASR tracks (ko) via Latin ratio check without hallucinating or client-fetching", async () => {
      const hangulJson3 = JSON.stringify({
        events: [
          { tStartMs: 1000, dDurationMs: 2500, segs: [{ utf8: "안녕하세요 여러분 반갑습니다." }] },
          { tStartMs: 4000, dDurationMs: 2500, segs: [{ utf8: "오늘도 좋은 하루 보내세요." }] },
        ],
      });

      const fetchSpy = vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/youtubei/v1/player")) {
          return new Response(
            JSON.stringify({
              playabilityStatus: { status: "OK" },
              videoDetails: { videoId: "kor00000001", title: "Korean Vlog", author: "Seoul Channel", lengthSeconds: "120" },
              captions: {
                playerCaptionsTracklistRenderer: {
                  captionTracks: [
                    {
                      baseUrl: "https://www.youtube.com/api/timedtext?v=kor00000001&lang=ko&kind=asr",
                      languageCode: "ko",
                      kind: "asr",
                      name: { simpleText: "Korean (auto-generated)" },
                      isTranslatable: true,
                    },
                  ],
                },
              },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        if (url.includes("/api/timedtext")) {
          return new Response(hangulJson3, { status: 200, headers: { "Content-Type": "application/json" } });
        }
        return new Response("[]", { status: 200 });
      });
      vi.stubGlobal("fetch", fetchSpy);

      const res = await extractYouTubeCaptionsOnServer("kor00000001");
      expect(res.success).toBe(false);
      expect(res.failureReason).toBe("NO_CAPTIONS");
      expect(res.needClientFetch).toBe(false);
      expect(res.subtitles).toEqual([]);
      expect(fetchSpy.mock.calls.some((c) => String(c[0]).includes("lrclib.net"))).toBe(false);
    });

    it("aborts timedtext format/backup retries immediately on HTTP 429 and avoids duplicate extraction in /api/youtube/captions", async () => {
      let timedtextHits = 0;
      const fetchSpy = vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/youtubei/v1/player")) {
          return new Response(
            JSON.stringify({
              playabilityStatus: { status: "OK" },
              videoDetails: { videoId: "r4290000001", title: "Stanford Talk", author: "Stanford", lengthSeconds: "300" },
              captions: {
                playerCaptionsTracklistRenderer: {
                  captionTracks: [
                    {
                      baseUrl: "https://www.youtube.com/api/timedtext?v=r4290000001&lang=en",
                      languageCode: "en",
                      name: { simpleText: "English" },
                      isTranslatable: true,
                    },
                    {
                      baseUrl: "https://www.youtube.com/api/timedtext?v=r4290000001&lang=es",
                      languageCode: "es",
                      name: { simpleText: "Spanish" },
                      isTranslatable: true,
                    },
                    {
                      baseUrl: "https://www.youtube.com/api/timedtext?v=r4290000001&lang=fr",
                      languageCode: "fr",
                      name: { simpleText: "French" },
                      isTranslatable: true,
                    },
                  ],
                },
              },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        if (url.includes("/api/timedtext")) {
          timedtextHits += 1;
          return new Response("<html><head><title>Sorry...</title></head></html>", { status: 429 });
        }
        return new Response("Not Found", { status: 404 });
      });
      vi.stubGlobal("fetch", fetchSpy);

      const req = new NextRequest("http://localhost:3000/api/youtube/captions?videoId=r4290000001&force=1");
      const res = await captionsGet(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.needClientFetch).toBe(true);
      expect(body.failureReason).toBe("NEED_CLIENT_FETCH");
      expect(body.tracks.length).toBeGreaterThan(0);
      expect(timedtextHits).toBeLessThanOrEqual(2);
    });

    it("strips Translator credits, calibrates shifted TED VI timeline (+8.5s), and merges delayed 1-word terminal tails", () => {
      const rawEn = [
        { startTime: 14.0, endTime: 17.5, duration: 3.5, textEn: "The human voice is powerful." },
        { startTime: 20.0, endTime: 22.0, duration: 2.0, textEn: "My son named our dog" },
        { startTime: 22.9, endTime: 23.5, duration: 0.6, textEn: "Buster." },
        { startTime: 120.0, endTime: 124.0, duration: 4.0, textEn: "Listening creates real understanding." },
        { startTime: 250.0, endTime: 254.0, duration: 4.0, textEn: "Speak with clarity and warmth." },
        { startTime: 400.0, endTime: 404.0, duration: 4.0, textEn: "Every conversation shapes the world." },
        { startTime: 588.0, endTime: 590.0, duration: 2.0, textEn: "Thank you." },
      ];
      const rawVi = [
        { startTime: 0.0, endTime: 5.0, textVn: "Translator: Nguyen Van A Reviewer: Tran Thi B" },
        { startTime: 5.5, endTime: 9.0, textVn: "Giọng nói con người thật quyền năng." },
        { startTime: 11.5, endTime: 15.0, textVn: "Con trai tôi đặt tên chú chó là Buster." },
        { startTime: 111.5, endTime: 115.5, textVn: "Lắng nghe tạo nên sự thấu hiểu thực sự." },
        { startTime: 241.5, endTime: 245.5, textVn: "Hãy nói với sự rõ ràng và ấm áp." },
        { startTime: 391.5, endTime: 395.5, textVn: "Mỗi cuộc trò chuyện đều định hình thế giới." },
        { startTime: 579.5, endTime: 581.5, textVn: "Xin cảm ơn." },
      ];

      const aligned = normalizeSubtitlePipeline(rawEn, rawVi);
      expect(aligned.length).toBe(6);
      expect(aligned[0].textEn).toBe("The human voice is powerful.");
      expect(aligned[0].textVn).toBe("Giọng nói con người thật quyền năng.");
      expect(aligned.some((c) => /Translator:|Reviewer:/i.test(c.textVn))).toBe(false);
      expect(aligned[1].textEn).toBe("My son named our dog Buster.");
      expect(aligned[1].endTime).toBe(23.5);
      expect(aligned[1].textVn).toBe("Con trai tôi đặt tên chú chó là Buster.");
      expect(aligned[5].textEn).toBe("Thank you.");
      expect(aligned[5].textVn).toBe("Xin cảm ơn.");
    });
  });
});

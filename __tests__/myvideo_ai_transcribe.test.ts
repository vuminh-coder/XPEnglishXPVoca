import { describe, it, expect, vi, afterEach } from "vitest";
import {
  generateAiSubtitlesForVideo,
  RawTranscriptRequiredError,
} from "@/features/myvideo/services/videoAiTranscribeService";
import { POST as aiTranscribePost } from "@/app/api/youtube/ai-transcribe/route";
import { NextRequest } from "next/server";

describe("MyVideo Transcript Alignment Engine (Anti-Hallucination Policy)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects requests without rawTranscript instead of fabricating fake subtitles from title", async () => {
    await expect(
      generateAiSubtitlesForVideo({
        videoId: "UF8uR6Z6KLc",
        videoTitle: "Steve Jobs' 2005 Stanford Commencement Address",
        authorName: "Stanford",
      })
    ).rejects.toBeInstanceOf(RawTranscriptRequiredError);
  });

  it("returns HTTP 422 RAW_TRANSCRIPT_REQUIRED when API POST omits rawTranscript", async () => {
    const req = new NextRequest("http://localhost:3000/api/youtube/ai-transcribe", {
      method: "POST",
      body: JSON.stringify({
        videoId: "UF8uR6Z6KLc",
        videoTitle: "Steve Jobs Stanford",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await aiTranscribePost(req);
    const json = await res.json();

    expect(res.status).toBe(422);
    expect(json.success).toBe(false);
    expect(json.code).toBe("RAW_TRANSCRIPT_REQUIRED");
  });

  it("deterministically aligns authentic rawTranscript with non-overlapping timestamps", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Offline unit test translation mock"))
    );
    delete process.env.GEMINI_API_KEY;

    const rawTranscript =
      "Today I want to tell you three stories from my life. Just three stories. Stay hungry and keep learning every single day.";

    const subtitles = await generateAiSubtitlesForVideo({
      videoId: "UF8uR6Z6KLc",
      videoTitle: "Stanford Address",
      rawTranscript,
    });

    expect(subtitles.length).toBeGreaterThanOrEqual(2);
    expect(subtitles[0].english).toContain("Today I want to tell you three stories");
    expect(subtitles.every((s) => s.dictationWord.length > 0)).toBe(true);
    expect(subtitles.every((s) => s.isAiGenerated === true)).toBe(true);

    for (let i = 0; i < subtitles.length; i++) {
      const item = subtitles[i];
      expect(item.startSeconds).toBeLessThan(item.startSeconds + item.duration);
      expect(item.start).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3}$/);
      expect(item.end).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3}$/);
      if (i > 0) {
        const prev = subtitles[i - 1];
        expect(item.startSeconds).toBeGreaterThanOrEqual(prev.startSeconds + prev.duration);
      }
    }
  });
});

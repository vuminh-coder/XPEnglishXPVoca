/**
 * Background Web Speech AI Auto-Transcriber (100% Invisible Background Engine)
 * Listens to audio speech in real time for any YouTube video (Vlogs, Lectures, Speeches, Podcasts, HardSubs)
 * and streams English & Vietnamese bilingual subtitle sentences directly into the player state without changing UI.
 */

import { RawSubtitleItem } from "@/lib/services/youtubeSubtitleService";
import { extractDictationWord } from "@/lib/services/youtubeSubtitleParser";

export interface TranscriberCallbacks {
  onSentenceCaptured: (item: RawSubtitleItem) => void;
  getCurrentTimeSec: () => number;
  isPlaying: () => boolean;
}

class BackgroundWebSpeechTranscriber {
  private recognition: any = null;
  private isRunning: boolean = false;
  private callbacks: TranscriberCallbacks | null = null;
  private lastSentenceTimeSec: number = 0;

  public isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return !!((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition);
  }

  public start(callbacks: TranscriberCallbacks): void {
    if (!this.isSupported() || this.isRunning) return;

    this.callbacks = callbacks;
    const SpeechRecognitionClass = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = async (event: any) => {
        if (!this.callbacks) return;

        const results = event.results;
        for (let i = event.resultIndex; i < results.length; i++) {
          if (results[i].isFinal) {
            const transcript = results[i][0].transcript.trim();
            if (transcript.length > 2) {
              const currentTime = this.callbacks.getCurrentTimeSec();
              const startTime = Math.max(0, parseFloat((this.lastSentenceTimeSec > 0 ? Math.min(currentTime - 0.5, this.lastSentenceTimeSec + 0.5) : Math.max(0, currentTime - 2.5)).toFixed(3)));
              const endTime = Math.max(startTime + 1.2, parseFloat((currentTime + 0.5).toFixed(3)));
              this.lastSentenceTimeSec = endTime;

              // Translate captured English sentence to Vietnamese via Server Google Translate API
              const textVn = await this.translateEnToVn(transcript);

              const rawItem: RawSubtitleItem = {
                startTime,
                endTime,
                textEn: transcript,
                textVn: textVn || transcript,
                dictationWord: extractDictationWord(transcript),
              };

              console.log(`[Background WebSpeech AI] Captured sentence at ${startTime}s - ${endTime}s: "${transcript}" -> "${textVn}"`);
              this.callbacks.onSentenceCaptured(rawItem);
            }
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn("[Background WebSpeech AI] Recognition error:", event?.error);
        if (event?.error === "no-speech" || event?.error === "network") {
          // Graceful auto-restart if video is still playing
          this.restartIfPlaying();
        }
      };

      this.recognition.onend = () => {
        this.isRunning = false;
        this.restartIfPlaying();
      };

      this.recognition.start();
      this.isRunning = true;
      console.log("[Background WebSpeech AI] Started background speech transcriber engine successfully.");
    } catch (e) {
      console.warn("[Background WebSpeech AI] Failed to start transcriber:", e);
      this.isRunning = false;
    }
  }

  public stop(): void {
    this.isRunning = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.recognition = null;
    }
  }

  private restartIfPlaying(): void {
    if (this.callbacks && this.callbacks.isPlaying() && !this.isRunning) {
      setTimeout(() => {
        if (this.callbacks && this.callbacks.isPlaying() && !this.isRunning) {
          try {
            this.recognition?.start();
            this.isRunning = true;
          } catch (e) {}
        }
      }, 500);
    }
  }

  private async translateEnToVn(textEn: string): Promise<string> {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(textEn)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.[0])) {
          return data[0].map((item: any) => item?.[0] || "").join("").trim();
        }
      }
    } catch (e) {}
    return textEn;
  }
}

export const backgroundWebSpeechTranscriber = new BackgroundWebSpeechTranscriber();

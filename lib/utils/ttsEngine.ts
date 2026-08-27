/**
 * XP English / XP Voca - Smart Multi-Voice TTS Engine
 * Provides deterministic seed-based voice randomization per lesson/card,
 * accent filtering (US, UK, AU), multi-speaker dialogue support,
 * cancel protection, and mobile-safe fallbacks via /api/tts.
 */

import { unlockMobileAudio } from "./mobileAudio";

export type TTSMode = "lesson_random" | "us" | "uk" | "au" | "multi_speaker";

export interface TTSSettings {
  mode: TTSMode;
  speed: number; // 0.75 - 1.25
  pitchShift: boolean;
  fallbackAccent: "en-US" | "en-GB" | "en-AU";
}

export interface VoiceProfile {
  voice: SpeechSynthesisVoice;
  accent: "US" | "UK" | "AU" | "OTHER";
  gender: "MALE" | "FEMALE" | "NEUTRAL";
  isHighQuality: boolean;
}

export interface SpeakOptions {
  lessonId?: string;
  speakerIndex?: number; // 0 for Speaker A, 1 for Speaker B, etc.
  accent?: string; // "en-US", "en-GB", "en-AU", "US", "UK", "AU"
  rate?: number;
  pitch?: number;
  volume?: number;
  delayMs?: number; // Pre-speech silence pause (default: 300ms for clear listening)
  onWordBoundary?: (charIndex: number, wordIndex: number) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

const DEFAULT_SETTINGS: TTSSettings = {
  mode: "lesson_random",
  speed: 1.0,
  pitchShift: true,
  fallbackAccent: "en-US",
};

const SETTINGS_KEY = "xp_tts_settings";

/**
 * Get current TTS settings from localStorage
 */
export function getTTSSettings(): TTSSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn("Failed to read TTS settings:", e);
  }
  return DEFAULT_SETTINGS;
}

/**
 * Save TTS settings to localStorage and dispatch update event
 */
export function saveTTSSettings(settings: Partial<TTSSettings>): TTSSettings {
  const current = getTTSSettings();
  const updated = { ...current, ...settings };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("tts-settings-changed", { detail: updated }));
    } catch (e) {
      console.warn("Failed to save TTS settings:", e);
    }
  }
  return updated;
}

/**
 * Normalize language code to standard BCP-47 tag for Google Translate / SpeechSynthesis
 */
export function normalizeLanguageCode(accent?: string): string {
  if (!accent) return "en-US";
  const l = accent.trim().toLowerCase();
  if (l === "us" || l.includes("us")) return "en-US";
  if (l === "uk" || l.includes("gb") || l.includes("uk")) return "en-GB";
  if (l === "au" || l.includes("au")) return "en-AU";
  if (l.startsWith("en-") || l.startsWith("en_")) return l.replace("_", "-");
  return "en-US";
}

/**
 * DJB2 Hash function for deterministic seed generation
 */
export function stringToSeed(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * Cleanly stop all active SpeechSynthesis and fallback audio playback
 */
export function stopTTS() {
  if (typeof window === "undefined") return;

  // 1. Clear any pending pre-speech 0.3s silence delay timer
  if ((window as any)._speechDelayTimer) {
    try {
      clearTimeout((window as any)._speechDelayTimer);
    } catch (e) {}
    (window as any)._speechDelayTimer = null;
  }

  // 2. Immediately cancel and silence browser SpeechSynthesis
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  // 3. Mark active utterance as canceled & remove handlers
  if ((window as any)._activeUtterance) {
    try {
      const activeUtterance = (window as any)._activeUtterance;
      activeUtterance._isCanceled = true;
      activeUtterance.onend = null;
      activeUtterance.onerror = null;
    } catch (e) {}
    (window as any)._activeUtterance = null;
  }

  // 4. Stop active fallback HTML5 Audio
  if ((window as any)._activeAudio) {
    try {
      const activeAudio = (window as any)._activeAudio as HTMLAudioElement;
      (activeAudio as any)._isCanceled = true;
      activeAudio.onended = null;
      activeAudio.onerror = null;
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio.src = "";
    } catch (e) {}
    (window as any)._activeAudio = null;
  }
}

// Auto-attach browser listeners to stop speech when user switches tabs, minimizes window, or navigates away
if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopTTS();
      if ("speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    }
  });
  window.addEventListener("pagehide", stopTTS);
  window.addEventListener("popstate", stopTTS);
}

/**
 * Categorize available browser voices into Accent, Gender, and Quality
 */
export function getCategorizedVoices(): VoiceProfile[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];

  const rawVoices = window.speechSynthesis.getVoices() || [];
  const englishVoices = rawVoices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("en"));

  return englishVoices.map((v) => {
    const lang = v.lang.toLowerCase();
    const name = v.name.toLowerCase();

    // Accent determination
    let accent: "US" | "UK" | "AU" | "OTHER" = "OTHER";
    if (lang.includes("us") || name.includes("united states") || name.includes("american")) {
      accent = "US";
    } else if (lang.includes("gb") || lang.includes("uk") || name.includes("british") || name.includes("united kingdom")) {
      accent = "UK";
    } else if (lang.includes("au") || name.includes("australian")) {
      accent = "AU";
    } else {
      accent = "US";
    }

    // Gender determination
    let gender: "MALE" | "FEMALE" | "NEUTRAL" = "NEUTRAL";
    const femaleKeywords = ["female", "jenny", "samantha", "zira", "sonia", "victoria", "karen", "aria", "microsoft zira", "microsoft jenny", "google us english female"];
    const maleKeywords = ["male", "guy", "david", "george", "ryan", "daniel", "alex", "thomas", "microsoft david", "microsoft guy", "google us english male"];

    if (femaleKeywords.some((kw) => name.includes(kw))) {
      gender = "FEMALE";
    } else if (maleKeywords.some((kw) => name.includes(kw))) {
      gender = "MALE";
    } else {
      gender = name.length % 2 === 0 ? "FEMALE" : "MALE";
    }

    const isHighQuality = name.includes("natural") || name.includes("google") || name.includes("premium") || name.includes("enhanced") || v.localService;

    return {
      voice: v,
      accent,
      gender,
      isHighQuality,
    };
  });
}

/**
 * Select best matching voice for a given lesson and speaker
 */
export function selectVoiceForContext(lessonId?: string, speakerIndex: number = 0, overrideAccent?: string): VoiceProfile | null {
  const profiles = getCategorizedVoices();
  if (profiles.length === 0) return null;

  const settings = getTTSSettings();
  let targetLang = normalizeLanguageCode(overrideAccent || settings.fallbackAccent);

  if (settings.mode === "us") targetLang = "en-US";
  if (settings.mode === "uk") targetLang = "en-GB";
  if (settings.mode === "au") targetLang = "en-AU";

  let candidateProfiles = profiles;

  // Filter by accent
  if (targetLang === "en-US") {
    const pool = profiles.filter((p) => p.accent === "US");
    if (pool.length > 0) candidateProfiles = pool;
  } else if (targetLang === "en-GB") {
    const pool = profiles.filter((p) => p.accent === "UK");
    if (pool.length > 0) candidateProfiles = pool;
  } else if (targetLang === "en-AU") {
    const pool = profiles.filter((p) => p.accent === "AU");
    if (pool.length > 0) candidateProfiles = pool;
  }

  // Multi-speaker gender alternation
  const seed = stringToSeed((lessonId || "default_lesson") + "_" + speakerIndex);
  
  if (settings.mode === "multi_speaker" || speakerIndex > 0) {
    const targetGender = speakerIndex % 2 === 0 ? "FEMALE" : "MALE";
    const genderPool = candidateProfiles.filter((p) => p.gender === targetGender);
    if (genderPool.length > 0) {
      candidateProfiles = genderPool;
    }
  }

  const selectedIndex = seed % candidateProfiles.length;
  return candidateProfiles[selectedIndex] || profiles[0];
}

/**
 * Central speak function with seed-based voice randomization, cancel protection, 0.3s pre-speech silence pause, and mobile fallback
 */
export function speakLessonText(text: string, options: SpeakOptions = {}) {
  if (typeof window === "undefined") return;

  const cleanText = text.replace(/[^a-zA-Z0-9\s,.?!']/g, "").trim();
  if (!cleanText) {
    options.onEnd?.();
    return;
  }

  // Stop prior audio cleanly
  stopTTS();

  // 1. Unlock mobile audio synchronously
  unlockMobileAudio();

  const delayMs = options.delayMs ?? 300; // 0.3s pre-speech silence pause for clear listening

  (window as any)._speechDelayTimer = setTimeout(() => {
    (window as any)._speechDelayTimer = null;
    executeSpeech(cleanText, options);
  }, delayMs);
}

function executeSpeech(cleanText: string, options: SpeakOptions) {
  const settings = getTTSSettings();
  const effectiveRate = options.rate ?? settings.speed;

  // Pitch micro-variation
  const seed = stringToSeed(cleanText + (options.lessonId || ""));
  const pitchDelta = settings.pitchShift ? ((seed % 11) - 5) * 0.01 : 0;
  const effectivePitch = Math.max(0.8, Math.min((options.pitch ?? 1.0) + pitchDelta, 1.2));

  // 2. Try Web Speech API
  if ("speechSynthesis" in window) {
    try {
      const synth = window.speechSynthesis;

      if (synth.paused) {
        synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = Math.max(0.6, Math.min(effectiveRate, 1.8));
      utterance.pitch = effectivePitch;
      utterance.volume = options.volume ?? 1.0;

      const selectedProfile = selectVoiceForContext(options.lessonId, options.speakerIndex, options.accent);
      if (selectedProfile) {
        utterance.voice = selectedProfile.voice;
        utterance.lang = selectedProfile.voice.lang;
      } else {
        utterance.lang = normalizeLanguageCode(options.accent || settings.fallbackAccent);
      }

      // Prevent GC purge on Mobile Safari
      (window as any)._activeUtterance = utterance;

      utterance.onboundary = (event: any) => {
        if (event.name === "word" || event.name === "") {
          const textBefore = cleanText.substring(0, event.charIndex);
          const wordIdx = textBefore.trim().split(/\s+/).filter(Boolean).length;
          options.onWordBoundary?.(event.charIndex, wordIdx);
        }
      };

      // Watchdog timer to auto-cleanup in case mobile browser hangs onend
      const estimatedDurationMs = Math.max(1500, (cleanText.length / 10) * 1000 + 1000);
      const watchdog = setTimeout(() => {
        if ((window as any)._activeUtterance === utterance) {
          (window as any)._activeUtterance = null;
          options.onEnd?.();
        }
      }, estimatedDurationMs);

      utterance.onend = () => {
        clearTimeout(watchdog);
        if ((utterance as any)._isCanceled) return;
        (window as any)._activeUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (err: any) => {
        clearTimeout(watchdog);
        if ((utterance as any)._isCanceled) return;
        (window as any)._activeUtterance = null;

        const errorType = err?.error || "";
        if (errorType === "canceled" || errorType === "interrupted") {
          return;
        }

        console.warn("WebSpeech error, falling back to server TTS stream:", err);
        fallbackStreamAudio(cleanText, options, settings);
      };

      synth.speak(utterance);
      return;
    } catch (err) {
      console.warn("Speech synthesis error, fallback to server TTS stream:", err);
    }
  }

  // 3. Fallback to Server-Side Audio Stream with selected accent
  fallbackStreamAudio(cleanText, options, settings);
}

/**
 * Fallback MP3 audio stream player using high-res Server TTS Proxy with normalized accent parameters
 */
function fallbackStreamAudio(text: string, options: SpeakOptions, settings: TTSSettings) {
  try {
    let targetLang = normalizeLanguageCode(options.accent || settings.fallbackAccent);
    if (settings.mode === "us") targetLang = "en-US";
    if (settings.mode === "uk") targetLang = "en-GB";
    if (settings.mode === "au") targetLang = "en-AU";

    // Use our ultra-reliable, CORS-free Next.js TTS proxy
    const streamUrl = `/api/tts?text=${encodeURIComponent(text.slice(0, 300))}&lang=${targetLang}`;

    const audio = new Audio(streamUrl);
    audio.playbackRate = Math.max(0.7, Math.min(options.rate ?? settings.speed, 1.5));
    audio.volume = options.volume ?? 1.0;

    (window as any)._activeAudio = audio;

    audio.onended = () => {
      if ((audio as any)._isCanceled) return;
      (window as any)._activeAudio = null;
      options.onEnd?.();
    };

    audio.onerror = (err) => {
      if ((audio as any)._isCanceled) return;
      (window as any)._activeAudio = null;
      options.onError?.(err);
    };

    audio.play().catch((err) => {
      if ((audio as any)._isCanceled) return;
      console.warn("Server audio stream playback failed:", err);
      (window as any)._activeAudio = null;
    });
  } catch (err) {
    console.warn("Fallback audio failed:", err);
  }
}

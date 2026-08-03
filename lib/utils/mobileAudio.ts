/**
 * Ultimate Mobile Web Audio & Speech Synthesis Engine
 * Solves iOS Safari Garbage Collection bug, User Gesture Token Loss, and WebSpeech freezes.
 */

let isAudioUnlocked = false;

/**
 * Global reference to prevent iOS Safari Garbage Collection from destroying active utterance
 */
if (typeof window !== "undefined") {
  (window as any)._activeUtterance = null;
}

/**
 * Unlock Web Audio & SpeechSynthesis synchronously on user tap
 */
export function unlockMobileAudio() {
  if (typeof window === "undefined" || isAudioUnlocked) return;

  try {
    // 1. Resume Web Audio Context
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
    }

    // 2. Unlock iOS SpeechSynthesis
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }
    }

    isAudioUnlocked = true;
  } catch (err) {
    console.warn("Mobile audio unlock warning:", err);
  }
}

/**
 * Ultimate Safe Speak function for Mobile Safari & Android Chrome
 * 1. Executes SYNCHRONOUSLY to preserve User Gesture Token (No setTimeout delay!)
 * 2. Prevents iOS Garbage Collection via global reference
 * 3. Falls back to Google Audio TTS Stream if SpeechSynthesis fails
 */
export function safeSpeakText(text: string, options: { lang?: string; rate?: number; volume?: number } = {}) {
  if (typeof window === "undefined") return;

  const { lang = "en-US", rate = 1.0, volume = 1.0 } = options;
  const cleanText = text.replace(/[^a-zA-Z0-9\s,.?!']/g, "").trim();
  if (!cleanText) return;

  // Unlock audio gesture on tap
  unlockMobileAudio();

  // Try Web Speech API synchronously first
  if ("speechSynthesis" in window) {
    try {
      const synth = window.speechSynthesis;

      // Resume if paused on iOS
      if (synth.paused) {
        synth.resume();
      }

      // Smooth cancel prior audio
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = Math.max(0.6, Math.min(rate, 1.8));
      utterance.volume = volume;

      // Select available English voice
      const voices = synth.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice =
          voices.find(
            (v) =>
              (v.lang.startsWith("en") || v.lang.includes("US") || v.lang.includes("GB")) &&
              (v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Google") || v.localService)
          ) || voices.find((v) => v.lang.startsWith("en"));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      // CRITICAL FOR IOS SAFARI: Retain utterance globally to prevent GC purge!
      (window as any)._activeUtterance = utterance;

      utterance.onend = () => {
        (window as any)._activeUtterance = null;
      };

      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error, falling back to Google Audio Stream:", e);
        (window as any)._activeUtterance = null;
        fallbackGoogleAudio(cleanText, lang);
      };

      // Speak synchronously within click event loop!
      synth.speak(utterance);
      return;
    } catch (err) {
      console.warn("SpeechSynthesis sync attempt failed, switching to audio stream:", err);
    }
  }

  // Fallback to Google TTS Audio Stream if Web Speech is unsupported or blocked
  fallbackGoogleAudio(cleanText, lang);
}

/**
 * Fallback MP3 Stream player using Google TTS engine
 */
function fallbackGoogleAudio(text: string, lang: string) {
  try {
    const targetLang = lang.startsWith("en") ? "en" : lang;
    const encodedText = encodeURIComponent(text.slice(0, 200));
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${targetLang}&client=tw-ob`;

    safePlayAudio(googleTtsUrl);
  } catch (err) {
    console.warn("Google TTS fallback failed:", err);
  }
}

/**
 * Mobile-safe HTML5 Audio Playback with catch error prevention
 */
export function safePlayAudio(audioUrl: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !audioUrl) {
      resolve();
      return;
    }

    try {
      unlockMobileAudio();
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;

      // Keep reference to prevent GC
      (window as any)._activeAudio = audio;

      audio.onended = () => {
        (window as any)._activeAudio = null;
        resolve();
      };

      audio.onerror = () => {
        (window as any)._activeAudio = null;
        resolve();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio playing successfully
          })
          .catch((err) => {
            console.warn("Mobile audio play blocked:", err);
            (window as any)._activeAudio = null;
            resolve();
          });
      } else {
        resolve();
      }
    } catch (e) {
      console.warn("safePlayAudio error:", e);
      resolve();
    }
  });
}

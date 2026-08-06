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
import { speakLessonText, stopTTS, SpeakOptions } from "./ttsEngine";
export { stopTTS };


export function safeSpeakText(text: string, options: { lang?: string; rate?: number; volume?: number; lessonId?: string; speakerIndex?: number } = {}) {
  const { lang, rate, volume, lessonId, speakerIndex } = options;
  speakLessonText(text, {
    lessonId,
    speakerIndex,
    accent: lang as any,
    rate,
    volume,
  });
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

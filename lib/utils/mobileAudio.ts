/**
 * Ultimate Mobile Web Audio & Speech Synthesis Engine
 * Solves iOS Safari Silent Switch, Web Audio Context suspension,
 * Garbage Collection bug, User Gesture Token Loss, and WebSpeech freezes.
 */

let isAudioUnlocked = false;

// Global reference to prevent iOS Safari Garbage Collection from destroying active utterance
if (typeof window !== "undefined") {
  (window as any)._activeUtterance = null;
  (window as any)._activeAudio = null;
}

/**
 * Unlock Web Audio & SpeechSynthesis synchronously on user tap.
 * Plays a micro-silent 0.01s buffer to unlock physical hardware speaker on iOS/Android.
 */
export function unlockMobileAudio() {
  if (typeof window === "undefined" || isAudioUnlocked) return;

  try {
    // 1. Resume Web Audio Context & play silent buffer
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      // Play 1ms silent buffer to wake up DAC
      try {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      } catch (e) {}
    }

    // 2. Unlock iOS SpeechSynthesis
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }
      // Warm up voices cache
      synth.getVoices();
    }

    isAudioUnlocked = true;
  } catch (err) {
    console.warn("Mobile audio unlock warning:", err);
  }
}

// Attach early global tap listener to unlock audio on first user touch anywhere
if (typeof window !== "undefined") {
  const handleFirstInteraction = () => {
    unlockMobileAudio();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.resume();
    }
  };

  document.addEventListener("touchstart", handleFirstInteraction, { passive: true, once: true });
  document.addEventListener("pointerdown", handleFirstInteraction, { passive: true, once: true });
  document.addEventListener("click", handleFirstInteraction, { passive: true, once: true });
}

import { speakLessonText, stopTTS, SpeakOptions } from "./ttsEngine";
export { stopTTS };

export function safeSpeakText(
  text: string,
  options: { lang?: string; rate?: number; volume?: number; lessonId?: string; speakerIndex?: number } = {}
) {
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
 * Mobile-safe HTML5 Audio Playback with catch error prevention & stream fallback
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

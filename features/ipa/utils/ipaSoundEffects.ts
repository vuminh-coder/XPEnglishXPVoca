/**
 * Web Audio API Sound Synthesizer for Minimal Pairs Arena & IPA Gamification
 * 0ms latency, zero external audio asset downloads, 100% offline & SSR-safe.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function setSfxMuted(muted: boolean) {
  isAudioMuted = muted;
}

export function getSfxMuted(): boolean {
  return isAudioMuted;
}

export function toggleSfxMute(): boolean {
  isAudioMuted = !isAudioMuted;
  return isAudioMuted;
}

/**
 * Play a gentle musical chime for correct answer
 */
export function playSfxCorrect() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 arpeggio

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + idx * 0.07);

    gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.07);
    osc.stop(now + idx * 0.07 + 0.3);
  });
}

/**
 * Play a low gentle warning tone when answering incorrectly
 */
export function playSfxWrong() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(261.63, now); // C4
  osc.frequency.exponentialRampToValueAtTime(174.61, now + 0.25); // Down to F3

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
}

/**
 * Play ascending combo sound scaling with streak count
 */
export function playSfxCombo(level: number) {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const pitchMultiplier = Math.min(2.0, 1 + (level * 0.08));
  const baseFreqs = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6

  baseFreqs.slice(0, Math.min(4, Math.max(2, level))).forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq * pitchMultiplier, now + idx * 0.06);

    gain.gain.setValueAtTime(0.0001, now + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.32);
  });
}

/**
 * Play a heart lost alert sound
 */
export function playSfxHeartLost() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);

  // Soft low-pass filter to prevent harsh buzz
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(500, now);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

/**
 * Play a celebratory fanfare for completing a match or achieving Rank S
 */
export function playSfxVictory() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chord = [
    { freq: 523.25, time: 0 },      // C5
    { freq: 659.25, time: 0.1 },    // E5
    { freq: 783.99, time: 0.2 },    // G5
    { freq: 1046.5, time: 0.32 },   // C6
  ];

  chord.forEach(({ freq, time }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.0001, now + time);
    gain.gain.exponentialRampToValueAtTime(0.25, now + time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + 0.48);
  });
}

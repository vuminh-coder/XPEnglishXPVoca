/**
 * Synthetic Web Audio Sound Engine for PvP Quiz Battle Arena
 * Zero external audio dependencies, zero latency, runs offline.
 */

let pvpAudioCtx: AudioContext | null = null;

function getPvPAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!pvpAudioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      pvpAudioCtx = new AudioCtxClass();
    }
  }
  if (pvpAudioCtx && pvpAudioCtx.state === "suspended") {
    pvpAudioCtx.resume().catch(() => {});
  }
  return pvpAudioCtx;
}

export function isPvPSoundEnabled(): boolean {
  if (typeof window === "undefined" && typeof localStorage === "undefined") return true;
  try {
    const saved =
      typeof localStorage !== "undefined" ? localStorage.getItem("xp_pvp_sound_enabled") : null;
    return saved !== null ? JSON.parse(saved) : true;
  } catch {
    return true;
  }
}

export function setPvPSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined" && typeof localStorage === "undefined") return;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("xp_pvp_sound_enabled", JSON.stringify(enabled));
    }
  } catch {
    // ignore
  }
}

export type PvPSoundType =
  | "tick"
  | "urgent_tick"
  | "match_found"
  | "correct"
  | "incorrect"
  | "victory"
  | "defeat";

export function playPvPSound(type: PvPSoundType): void {
  if (!isPvPSoundEnabled()) return;
  const ctx = getPvPAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    switch (type) {
      case "tick": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case "urgent_tick": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case "match_found": {
        // 2-tone ascending chime
        const freqs = [523.25, 783.99]; // C5 -> G5
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.12, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.25);
        });
        break;
      }

      case "correct": {
        // 3-note bright chime (C5 -> E5 -> G5)
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.12, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.22);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.22);
        });
        break;
      }

      case "incorrect": {
        // Descending low buzzer
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.22);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
        break;
      }

      case "victory": {
        // Triumphant chord C5 -> E5 -> G5 -> C6
        const chord = [523.25, 659.25, 783.99, 1046.5];
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + i * 0.1);
          gain.gain.setValueAtTime(0.14, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.45);
        });
        break;
      }

      case "defeat": {
        // Minor descent
        const notes = [440, 392, 349.23];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.14);
          gain.gain.setValueAtTime(0.1, now + i * 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.3);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.14);
          osc.stop(now + i * 0.14 + 0.3);
        });
        break;
      }
    }
  } catch (err) {
    // Non-blocking fallback
    console.debug("PvP sound playback suppressed:", err);
  }
}

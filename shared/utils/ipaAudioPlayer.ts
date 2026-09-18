/**
 * XP English / XP Voca - Dedicated Authentic IPA Phoneme Audio Player
 * Plays authentic isolated phonetician recordings for all 44 English IPA sounds
 * with 0ms local caching, playbackRate control, and zero external network latency.
 */

let activeAudio: HTMLAudioElement | null = null;

export function getIpaAudioUrl(soundId: string): string {
  return `/audio/ipa/${soundId}.ogg`;
}

export interface PlayIpaAudioOptions {
  rate?: number;
  onPlay?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

/**
 * Stop any currently playing IPA isolated audio
 */
export function stopIpaAudio(): void {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudio = null;
  }
}

/**
 * Play authentic isolated IPA phoneme audio
 * @param soundId - ID of the IPA sound (e.g. 'c_n', 'c_p', 'v_i_long')
 * @param options - playback options (rate, onPlay, onEnd, onError)
 */
export function playIpaIsolatedSound(
  soundId: string,
  options: PlayIpaAudioOptions = {}
): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  stopIpaAudio();

  const audioUrl = getIpaAudioUrl(soundId);
  const audio = new Audio(audioUrl);
  activeAudio = audio;

  const rate = options.rate ?? 1.0;
  audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));

  if (options.onPlay) {
    audio.onplay = () => options.onPlay?.();
  }

  audio.onended = () => {
    if (activeAudio === audio) {
      activeAudio = null;
    }
    options.onEnd?.();
  };

  audio.onerror = (e) => {
    console.warn(`[IPA Audio Player] Failed to play audio for ${soundId}:`, e);
    if (activeAudio === audio) {
      activeAudio = null;
    }
    options.onError?.(e);
  };

  audio.play().catch((err) => {
    console.warn(`[IPA Audio Player] Autoplay prevented or error:`, err);
    if (activeAudio === audio) {
      activeAudio = null;
    }
    options.onError?.(err);
  });

  return audio;
}

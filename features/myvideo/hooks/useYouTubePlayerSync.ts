"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { YouTubeVideoItem, SubtitleSentence } from "@/stores/videoStore";
import { calculateCharacterWeightedWordIndex } from "@/features/listening/services/youtubeSubtitleParser";
import { backgroundWebSpeechTranscriber } from "@/features/shadowing/services/webSpeechTranscriber";

/**
 * Audio Anticipation Lead Time in seconds (200ms).
 * In pedagogical video language learning and international caption standards (TED, Netflix),
 * subtitles lead audio onset by ~180-250ms so learners perceive text right as sound begins,
 * canceling out YouTube iframe postMessage transmission latency and human cognitive reading delay.
 */
export const SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC = 0.200;

export interface UseYouTubePlayerSyncProps {
  activeVideo: YouTubeVideoItem | null;
  currentSubIndex?: number;
  onSubIndexChange?: (index: number) => void;
  onNewSubtitleCaptured?: (rawItem: any) => void;
  addToast: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message: string }) => void;
}

export function useYouTubePlayerSync({
  activeVideo,
  currentSubIndex,
  onSubIndexChange,
  onNewSubtitleCaptured,
  addToast,
}: UseYouTubePlayerSyncProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ytPlayerTimeRef = useRef<number>(0);
  const ytPlayerStateRef = useRef<number>(-1);
  const ytTimeLastUpdatedRef = useRef<number>(0);
  const ytListenerRegisteredRef = useRef<boolean>(false);
  const lastSeekTimestampRef = useRef<number>(0);
  const targetSeekTimeRef = useRef<number>(-1);

  // Playback States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoopingSentence, setIsLoopingSentence] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [isCueSpeaking, setIsCueSpeaking] = useState<boolean>(false);
  const [loadedChunkCount, setLoadedChunkCount] = useState<number>(1);
  const [subtitleSyncOffset, setSubtitleSyncOffset] = useState<number>(0.0);

  // Refs for real-time sync loop — consolidated single effect to sync all refs
  const subtitleSyncOffsetRef = useRef(subtitleSyncOffset);
  const activeSubIndexRef = useRef(activeSubIndex);
  const isPlayingRef = useRef(isPlaying);
  const playbackSpeedRef = useRef(playbackSpeed);
  const loadedChunkCountRef = useRef(loadedChunkCount);

  useEffect(() => {
    subtitleSyncOffsetRef.current = subtitleSyncOffset;
    activeSubIndexRef.current = activeSubIndex;
    isPlayingRef.current = isPlaying;
    playbackSpeedRef.current = playbackSpeed;
    loadedChunkCountRef.current = loadedChunkCount;
  });

  // YouTube PostMessage command helper
  const sendYtCommand = useCallback((func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  }, []);

  const jumpToSubtitleIndex = useCallback(
    (index: number) => {
      if (!activeVideo || !activeVideo.subtitles[index]) return;
      const targetSub = activeVideo.subtitles[index];

      onSubIndexChange?.(index);
      setActiveSubIndex(index);
      setActiveWordIndex(0);

      setCurrentTime(targetSub.startTime);
      ytPlayerTimeRef.current = targetSub.startTime;
      ytTimeLastUpdatedRef.current = Date.now();
      lastSeekTimestampRef.current = Date.now();
      targetSeekTimeRef.current = targetSub.startTime;

      sendYtCommand("seekTo", [targetSub.startTime, true]);
      sendYtCommand("playVideo");
      ytPlayerStateRef.current = 1;
      setIsPlaying(true);
    },
    [activeVideo, sendYtCommand, onSubIndexChange]
  );

  const jumpToRandomSubtitle = useCallback(() => {
    if (!activeVideo || activeVideo.subtitles.length === 0) return;
    const randomIndex = Math.floor(Math.random() * activeVideo.subtitles.length);
    jumpToSubtitleIndex(randomIndex);
    addToast({
      type: "info",
      title: "Tráo câu ngẫu nhiên!",
      message: `Đã nhảy sang câu #${randomIndex + 1}/${activeVideo.subtitles.length} để luyện tập.`,
    });
  }, [activeVideo, jumpToSubtitleIndex, addToast]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      sendYtCommand("pauseVideo");
      ytPlayerStateRef.current = 2;
      setIsPlaying(false);
      ytTimeLastUpdatedRef.current = Date.now();
    } else {
      sendYtCommand("playVideo");
      ytPlayerStateRef.current = 1;
      setIsPlaying(true);
      ytTimeLastUpdatedRef.current = Date.now();
    }
  }, [isPlaying, sendYtCommand]);

  const pauseVideo = useCallback(() => {
    sendYtCommand("pauseVideo");
    ytPlayerStateRef.current = 2;
    setIsPlaying(false);
    ytTimeLastUpdatedRef.current = Date.now();
  }, [sendYtCommand]);

  const changePlaybackSpeed = useCallback(
    (speed: number) => {
      setPlaybackSpeed(speed);
      sendYtCommand("setPlaybackRate", [speed]);
      ytTimeLastUpdatedRef.current = Date.now();
      addToast({
        type: "info",
        title: `Tốc độ: ${speed}x`,
        message: `Tốc độ phát video đã điều chỉnh sang ${speed}x`,
      });
    },
    [sendYtCommand, addToast]
  );

  const toggleLoopSentence = useCallback(() => {
    setIsLoopingSentence((prev) => {
      const next = !prev;
      addToast({
        type: "info",
        title: next ? "Đã bật lặp câu!" : "Tắt lặp câu",
        message: next ? "Video sẽ tự động phát lặp lại câu hiện tại." : "Phát video bình thường.",
      });
      return next;
    });
  }, [addToast]);

  const resetPlayerSync = useCallback(() => {
    setActiveSubIndex(0);
    setCurrentTime(0);
    ytPlayerTimeRef.current = 0;
    ytPlayerStateRef.current = -1;
    ytTimeLastUpdatedRef.current = 0;
    setActiveWordIndex(0);
    setLoadedChunkCount(1);
    setIsPlaying(false);
  }, []);

  // YouTube postMessage handshake & state listener
  useEffect(() => {
    const parseYtState = (val: any): number | null => {
      if (typeof val === "number") return val;
      if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
      if (val && typeof val.playerState === "number") return val.playerState;
      if (val && typeof val.playerState === "string" && !isNaN(Number(val.playerState)))
        return Number(val.playerState);
      return null;
    };

    const handleYTMessage = (event: MessageEvent) => {
      if (event.origin && !event.origin.includes("youtube")) return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const state = parseYtState(data.info) ?? parseYtState(data);
        if (state !== null) {
          ytPlayerStateRef.current = state;
          const ytPlaying = state === 1;
          isPlayingRef.current = ytPlaying;
          setIsPlaying(ytPlaying);
          if (ytPlaying) {
            ytTimeLastUpdatedRef.current = Date.now();
          }
        }

        const isDelivery = data?.event === "infoDelivery" || data?.event === "initialDelivery";
        if (isDelivery && data?.info) {
          if (typeof data.info.currentTime === "number") {
            const incomingTime = data.info.currentTime;
            const now = Date.now();
            const isRecentSeek = now - lastSeekTimestampRef.current < 800;

            // Reject stale in-flight messages from prior playback position
            if (isRecentSeek && targetSeekTimeRef.current >= 0 && Math.abs(incomingTime - targetSeekTimeRef.current) > 2.0) {
              return;
            }

            ytPlayerTimeRef.current = incomingTime;
            ytTimeLastUpdatedRef.current = now;
            ytListenerRegisteredRef.current = true;
          }
        }
      } catch (e) {}
    };

    window.addEventListener("message", handleYTMessage);
    return () => window.removeEventListener("message", handleYTMessage);
  }, []);

  // Register YouTube listener with retry
  useEffect(() => {
    if (!iframeRef.current || !activeVideo) return;
    ytListenerRegisteredRef.current = false;
    let attempts = 0;
    const maxAttempts = 15;
    const tryRegister = () => {
      if (ytListenerRegisteredRef.current || attempts >= maxAttempts) return;
      attempts++;
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "listening", id: "yt-player" }),
          "*"
        );
      } catch (e) {}
    };
    tryRegister();
    const retryInterval = setInterval(tryRegister, 300);
    return () => clearInterval(retryInterval);
  }, [activeVideo?.id]);

  // Real-time synchronization loop (optimized: side-effects outside setState updater)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeVideo && activeVideo.subtitles.length > 0) {
      // Mutable tracking to avoid unnecessary setState calls
      let prevMatchedIdx = -1;
      let prevIsSpeaking = false;
      let prevWordIdx = -1;

      timer = setInterval(() => {
        if (iframeRef.current?.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "getCurrentTime", args: [] }),
              "*"
            );
          } catch (e) {}
        }

        const realTime = ytPlayerTimeRef.current;
        const timeSinceUpdate = Date.now() - ytTimeLastUpdatedRef.current;
        const currentSpeed = playbackSpeedRef.current;

        const isPlayingActive =
          isPlayingRef.current && ytPlayerStateRef.current !== 2 && ytPlayerStateRef.current !== 0;

        // Smooth time calculation — works for 0.0s and smoothly interpolates without stuttering
        let nextTime = Math.max(0, realTime);
        if (isPlayingActive && ytTimeLastUpdatedRef.current > 0 && timeSinceUpdate < 4000) {
          const elapsed = (timeSinceUpdate / 1000) * currentSpeed;
          nextTime = parseFloat((realTime + elapsed).toFixed(3));
        }

        // Loop sentence — side-effect OUTSIDE updater (BUG-03 fix)
        const targetLoopIdx =
          typeof currentSubIndex === "number" && currentSubIndex >= 0
            ? currentSubIndex
            : activeSubIndexRef.current;
        if (isLoopingSentence && activeVideo.subtitles[targetLoopIdx]) {
          const loopCue = activeVideo.subtitles[targetLoopIdx];
          if (nextTime >= loopCue.endTime - 0.15) {
            sendYtCommand("seekTo", [loopCue.startTime, true]);
            nextTime = loopCue.startTime;
            ytPlayerTimeRef.current = loopCue.startTime;
            ytTimeLastUpdatedRef.current = Date.now();
            lastSeekTimestampRef.current = Date.now();
            targetSeekTimeRef.current = loopCue.startTime;
          }
        }

        setCurrentTime(nextTime);

        const effectiveTime = Math.max(
          0,
          parseFloat((nextTime + SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC + subtitleSyncOffsetRef.current).toFixed(3))
        );

        // Binary search O(log n)
        const subs = activeVideo.subtitles;
        let matchedIdx = -1;
        let isSpeakingNow = false;
        let lo = 0,
          hi = subs.length - 1;

        while (lo <= hi) {
          const mid = (lo + hi) >>> 1;
          if (effectiveTime >= subs[mid].startTime && effectiveTime < subs[mid].endTime) {
            matchedIdx = mid;
            isSpeakingNow = true;
            break;
          }
          if (effectiveTime < subs[mid].startTime) {
            hi = mid - 1;
          } else {
            lo = mid + 1;
          }
        }

        // Gap handling & Linger Window (prevents jarring flickering between sentences)
        if (matchedIdx === -1) {
          const prevCue = lo > 0 ? subs[lo - 1] : null;
          const nextCue = lo < subs.length ? subs[lo] : null;

          // 1. Linger Window: Keep previous cue active for 200ms after it ends so users finish reading
          if (prevCue && effectiveTime - prevCue.endTime < 0.20) {
            matchedIdx = lo - 1;
            isSpeakingNow = true;
          // 2. Anticipation Window: If next cue is within 250ms, focus next cue as ready
          } else if (nextCue && nextCue.startTime - effectiveTime < 0.25) {
            matchedIdx = lo;
            isSpeakingNow = false;
          } else if (subs.length > 0 && effectiveTime < subs[0].startTime) {
            matchedIdx = 0;
            isSpeakingNow = false;
          } else if (lo < subs.length && lo >= 0) {
            matchedIdx = lo;
            isSpeakingNow = false;
          }
        }

        // Only update state when values actually change (HIGH-01 optimization)
        if (isSpeakingNow !== prevIsSpeaking) {
          setIsCueSpeaking(isSpeakingNow);
          prevIsSpeaking = isSpeakingNow;
        }

        const currentSubIdx = activeSubIndexRef.current;
        if (matchedIdx !== -1 && matchedIdx !== currentSubIdx) {
          setActiveSubIndex(matchedIdx);
          prevMatchedIdx = matchedIdx;
        }

        // Word-level karaoke highlighting
        const targetSub = subs[matchedIdx !== -1 ? matchedIdx : currentSubIdx];
        let newWordIdx = -1;
        if (targetSub && isSpeakingNow) {
          if (targetSub.wordTimings && targetSub.wordTimings.length > 0) {
            for (let w = 0; w < targetSub.wordTimings.length; w++) {
              const wt = targetSub.wordTimings[w];
              if (effectiveTime >= wt.start && effectiveTime <= wt.end) {
                newWordIdx = w;
                break;
              }
              if (effectiveTime > wt.end) {
                newWordIdx = w;
              }
            }
            if (newWordIdx < 0) newWordIdx = 0;
          } else if (effectiveTime >= targetSub.startTime && effectiveTime <= targetSub.endTime) {
            const duration = Math.max(0.4, targetSub.endTime - targetSub.startTime);
            const elapsed = Math.max(0, Math.min(duration, effectiveTime - targetSub.startTime));
            newWordIdx = calculateCharacterWeightedWordIndex(targetSub.textEn, elapsed, duration);
          }
        }

        if (newWordIdx !== prevWordIdx) {
          setActiveWordIndex(newWordIdx);
          prevWordIdx = newWordIdx;
        }

        // Progressive chunk streaming
        const chunkCount = loadedChunkCountRef.current;
        if (matchedIdx >= chunkCount * 3 - 1 && chunkCount * 3 < activeVideo.subtitles.length) {
          setLoadedChunkCount((c) => c + 1);
        }
      }, 35);
    }
    return () => clearInterval(timer);
  }, [activeVideo?.id, isLoopingSentence, currentSubIndex, sendYtCommand]);

  // Background Web Speech AI Transcriber
  useEffect(() => {
    if (!activeVideo || !isPlaying) {
      backgroundWebSpeechTranscriber.stop();
      return;
    }

    if (activeVideo.subtitles.length === 0 && onNewSubtitleCaptured) {
      backgroundWebSpeechTranscriber.start({
        getCurrentTimeSec: () => ytPlayerTimeRef.current,
        isPlaying: () => isPlayingRef.current,
        onSentenceCaptured: (rawItem) => {
          onNewSubtitleCaptured(rawItem);
        },
      });
    }

    return () => {
      backgroundWebSpeechTranscriber.stop();
    };
  }, [activeVideo?.id, activeVideo?.subtitles.length, isPlaying, onNewSubtitleCaptured]);

  return {
    iframeRef,
    isPlaying,
    setIsPlaying,
    isLoopingSentence,
    setIsLoopingSentence,
    toggleLoopSentence,
    playbackSpeed,
    setPlaybackSpeed,
    changePlaybackSpeed,
    activeSubIndex,
    setActiveSubIndex,
    currentTime,
    setCurrentTime,
    activeWordIndex,
    setActiveWordIndex,
    isCueSpeaking,
    loadedChunkCount,
    setLoadedChunkCount,
    subtitleSyncOffset,
    setSubtitleSyncOffset,
    sendYtCommand,
    togglePlayPause,
    pauseVideo,
    jumpToSubtitleIndex,
    jumpToRandomSubtitle,
    resetPlayerSync,
  };
}

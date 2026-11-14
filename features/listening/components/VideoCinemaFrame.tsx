"use client";

import React, { useRef, useEffect, useCallback, useState, useId } from "react";
import { extractYouTubeVideoId } from "@/features/listening/utils/videoUrlHelper";
import { getLessonCoverImage } from "@/features/listening/utils/lessonImageMapper";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Gauge,
  Repeat,
  Radio,
  Loader2,
  AlertCircle,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Rewind5sIcon, Forward5sIcon } from "@/shared/components/icons/SeekIcons";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export interface VideoCinemaFrameProps {
  sourceUrlOrId?: string;
  thumbnailUrl?: string;
  title?: string;
  currentSentence?: {
    startTime?: number;
    endTime?: number;
    text?: string;
  } | null;
  isPlaying?: boolean;
  playbackSpeed?: number;
  volume?: number;
  onVolumeChange?: (vol: number) => void;
  onSentenceEnded?: () => void;
  onPlaybackTimeUpdate?: (seconds: number) => void;
  className?: string;

  // Integrated controls matching StudioWaveformCard
  segmentIndex?: number;
  totalSegments?: number;
  playbackTime?: number;
  duration?: number;
  onTogglePlay?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onRewind5s?: () => void;
  onForward5s?: () => void;
  onSeek?: (seconds: number) => void;
  onSpeedChange?: (speed: number) => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  isRecording?: boolean;
  liveAudioEnergy?: number;
  practiceMode?: "dictation" | "shadowing" | "listening";
  viewportVariant?: "studio" | "cinema";
  fallbackNotice?: string;
  onEmbedError?: (errorMessage: string) => void;
  onFallbackToAudio?: () => void;
}

// Global YouTube IFrame API script loader singleton
let ytApiPromise: Promise<any> | null = null;
function ensureYouTubeIframeApi(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    const existing = document.getElementById("yt-iframe-api-loader");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "yt-iframe-api-loader";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady();
      resolve(window.YT);
    };

    // Polling backup in case API was already loaded or event fired earlier
    const pollInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(pollInterval);
        resolve(window.YT);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(pollInterval);
      if (window.YT) resolve(window.YT);
    }, 8000);
  });

  return ytApiPromise;
}

export const VideoCinemaFrame: React.FC<VideoCinemaFrameProps> = ({
  sourceUrlOrId,
  thumbnailUrl,
  title = "Video Lesson",
  currentSentence,
  isPlaying = false,
  playbackSpeed = 1,
  volume = 1,
  onVolumeChange,
  onSentenceEnded,
  onPlaybackTimeUpdate,
  className = "",
  segmentIndex = 0,
  totalSegments = 1,
  playbackTime = 0,
  duration = 6,
  onTogglePlay,
  onPrev,
  onNext,
  onRewind5s,
  onForward5s,
  onSeek,
  onSpeedChange,
  isPrevDisabled = false,
  isNextDisabled = false,
  isRecording = false,
  liveAudioEnergy = 0,
  practiceMode = "dictation",
  viewportVariant = "studio",
  fallbackNotice,
  onEmbedError,
  onFallbackToAudio,
}) => {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "_");
  const playerContainerId = `yt_cinema_player_${reactId}`;

  const youtubeId = sourceUrlOrId ? extractYouTubeVideoId(sourceUrlOrId) : null;
  const thumb =
    thumbnailUrl ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null);

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isLoopSentence, setIsLoopSentence] = useState(false);
  const [isTheaterExpanded, setIsTheaterExpanded] = useState(false);
  const [startedYoutubeId, setStartedYoutubeId] = useState<string | null>(null);
  const [embedError, setEmbedError] = useState<string | null>(null);

  const hasStartedOnce =
    isPlaying || (Boolean(youtubeId) && startedYoutubeId === youtubeId);

  const playerRef = useRef<any>(null);
  const isPlayingPropRef = useRef(isPlaying);
  const isLoopSentenceRef = useRef(isLoopSentence);

  useEffect(() => {
    isPlayingPropRef.current = isPlaying;
    isLoopSentenceRef.current = isLoopSentence;
  }, [isPlaying, isLoopSentence]);

  const isHandlingEndRef = useRef(false);
  const isProgrammaticSeekRef = useRef(false);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const effectiveDuration = Math.max(1, duration || 6);

  // Initialize YouTube IFrame Player
  useEffect(() => {
    if (!youtubeId) return;

    let isMounted = true;
    setIsPlayerReady(false);
    setEmbedError(null);

    ensureYouTubeIframeApi()
      .then((YT) => {
        if (!isMounted) return;
        if (!YT || !YT.Player) return;

        // Clean up any existing player instance
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch {}
          playerRef.current = null;
        }

        const startAt = Math.max(0, currentSentence?.startTime ?? 0);

        playerRef.current = new YT.Player(playerContainerId, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0, // Use unified Studio Control Dock without duplicate YouTube chrome
            iv_load_policy: 3,
            fs: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            enablejsapi: 1,
            start: Math.floor(startAt),
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              setIsPlayerReady(true);
              try {
                event.target.setVolume(Math.round((volume ?? 1) * 100));
                event.target.setPlaybackRate(playbackSpeed || 1);
                event.target.seekTo(startAt, true);
                if (isPlayingPropRef.current) {
                  event.target.playVideo();
                }
              } catch {}
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1: PLAYING, 2: PAUSED, 3: BUFFERING, 0: ENDED
              if (event.data === 3) {
                setIsBuffering(true);
              } else {
                setIsBuffering(false);
              }

              if (event.data === 1) {
                setStartedYoutubeId(youtubeId);
                // If YouTube started playing externally, ensure workspace state reflects it
                if (!isPlayingPropRef.current && onTogglePlay) {
                  onTogglePlay();
                }
              } else if (event.data === 2) {
                // Paused — ignore transient pause emitted while programmatically seeking
                if (
                  isPlayingPropRef.current &&
                  !isHandlingEndRef.current &&
                  !isProgrammaticSeekRef.current &&
                  onTogglePlay
                ) {
                  onTogglePlay();
                }
              } else if (event.data === 0) {
                // Video ended
                onPlaybackTimeUpdate?.(effectiveDuration);
                onSentenceEnded?.();
              }
            },
            onError: (event: any) => {
              if (!isMounted) return;
              console.warn("[VideoCinemaFrame] YouTube Player Error:", event.data);
              let errorText = "Không thể tải video từ YouTube lúc này.";
              if (event.data === 101 || event.data === 150) {
                errorText = "Chủ video giới hạn phát nhúng. Đang chuyển sang âm thanh AI giọng đọc.";
              } else if (event.data === 100 || event.data === 2) {
                errorText = "Video không khả dụng hoặc liên kết đã bị xóa.";
              }
              setEmbedError(errorText);
              onEmbedError?.(errorText);
            },
          },
        });
      })
      .catch((err) => {
        console.warn("[VideoCinemaFrame] Failed to initialize YT API:", err);
      });

    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
    };
  }, [youtubeId, playerContainerId]);

  // Handle Play/Pause sync from props
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;

    try {
      if (isPlaying) {
        const start = currentSentence?.startTime ?? 0;
        const end =
          typeof currentSentence?.endTime === "number" && currentSentence.endTime > start
            ? currentSentence.endTime
            : start + effectiveDuration;

        let curTime = 0;
        try {
          curTime = playerRef.current.getCurrentTime() || 0;
        } catch {}

        // If at the end of sentence or previously finished, seek to start before playing
        if (isHandlingEndRef.current || curTime >= end - 0.15 || curTime < start - 1.0) {
          isProgrammaticSeekRef.current = true;
          setTimeout(() => {
            isProgrammaticSeekRef.current = false;
          }, 350);
          playerRef.current.seekTo(start, true);
          onPlaybackTimeUpdate?.(0);
        }
        isHandlingEndRef.current = false;

        playerRef.current.setPlaybackRate(playbackSpeed || 1);
        playerRef.current.setVolume(Math.round((volume ?? 1) * 100));
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (err) {
      console.warn("[VideoCinemaFrame] Play/Pause sync error:", err);
    }
  }, [isPlaying, isPlayerReady, currentSentence?.startTime, currentSentence?.endTime, effectiveDuration, playbackSpeed, volume]);

  // Handle sentence boundary change (seek to new sentence start)
  useEffect(() => {
    isHandlingEndRef.current = false;
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

    if (playerRef.current && isPlayerReady && currentSentence && typeof currentSentence.startTime === "number") {
      try {
        const start = Math.max(0, currentSentence.startTime);
        isProgrammaticSeekRef.current = true;
        setTimeout(() => {
          isProgrammaticSeekRef.current = false;
        }, 350);
        playerRef.current.seekTo(start, true);
        onPlaybackTimeUpdate?.(0);
        if (!isPlayingPropRef.current) {
          playerRef.current.pauseVideo();
        }
      } catch {}
    }
  }, [segmentIndex, currentSentence?.startTime, isPlayerReady]);

  // High-Precision Real-time sync ticker (reads actual YouTube currentTime)
  useEffect(() => {
    if (!isPlaying || !isPlayerReady || !playerRef.current) return;

    const start = currentSentence?.startTime ?? 0;
    const end =
      typeof currentSentence?.endTime === "number" && currentSentence.endTime > start
        ? currentSentence.endTime
        : start + effectiveDuration;
    // Allow brief tail margin past `end` so the final phoneme is never clipped by 80ms polling
    const stopThreshold = Math.max(start + 0.25, end + 0.06);

    const ticker = setInterval(() => {
      if (!playerRef.current) return;

      try {
        const ytTime = playerRef.current.getCurrentTime();
        if (typeof ytTime !== "number" || isNaN(ytTime)) return;

        const relativeTime = Math.max(0, ytTime - start);

        if (ytTime >= stopThreshold) {
          if (!isHandlingEndRef.current && isPlayingPropRef.current) {
            isHandlingEndRef.current = true;
            playerRef.current.pauseVideo();

            if (isLoopSentenceRef.current) {
              if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
              loopTimeoutRef.current = setTimeout(() => {
                try {
                  playerRef.current.seekTo(start, true);
                  playerRef.current.playVideo();
                  setTimeout(() => {
                    isHandlingEndRef.current = false;
                  }, 250);
                } catch {}
              }, 300);
            } else {
              onPlaybackTimeUpdate?.(effectiveDuration);
              onSentenceEnded?.();
            }
          }
        } else {
          if (!isHandlingEndRef.current) {
            onPlaybackTimeUpdate?.(relativeTime);
          }
        }
      } catch {}
    }, 80);

    return () => clearInterval(ticker);
  }, [isPlaying, isPlayerReady, currentSentence?.startTime, currentSentence?.endTime, effectiveDuration, onPlaybackTimeUpdate, onSentenceEnded]);

  // Sync volume changes
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.setVolume(Math.round((volume ?? 1) * 100));
      } catch {}
    }
  }, [volume, isPlayerReady]);

  // Sync playback speed changes
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.setPlaybackRate(playbackSpeed || 1);
      } catch {}
    }
  }, [playbackSpeed, isPlayerReady]);

  const handleRewind5s = useCallback(() => {
    const start = currentSentence?.startTime ?? 0;
    let curTime = start + (playbackTime || 0);
    if (playerRef.current && isPlayerReady) {
      try {
        curTime = playerRef.current.getCurrentTime();
      } catch {}
    }
    const newYtTime = Math.max(start, curTime - 5);
    const newRelative = Math.max(0, newYtTime - start);

    isHandlingEndRef.current = false;
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.seekTo(newYtTime, true);
      } catch {}
    }
    onPlaybackTimeUpdate?.(newRelative);
    onRewind5s?.();
  }, [currentSentence?.startTime, playbackTime, isPlayerReady, onPlaybackTimeUpdate, onRewind5s]);

  const handleForward5s = useCallback(() => {
    const start = currentSentence?.startTime ?? 0;
    const end =
      typeof currentSentence?.endTime === "number" && currentSentence.endTime > start
        ? currentSentence.endTime
        : start + effectiveDuration;

    let curTime = start + (playbackTime || 0);
    if (playerRef.current && isPlayerReady) {
      try {
        curTime = playerRef.current.getCurrentTime();
      } catch {}
    }
    const newYtTime = Math.min(end, curTime + 5);
    const newRelative = Math.min(effectiveDuration, newYtTime - start);

    isHandlingEndRef.current = false;
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.seekTo(newYtTime, true);
      } catch {}
    }
    onPlaybackTimeUpdate?.(newRelative);
    onForward5s?.();
  }, [currentSentence?.startTime, currentSentence?.endTime, playbackTime, effectiveDuration, isPlayerReady, onPlaybackTimeUpdate, onForward5s]);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!effectiveDuration || effectiveDuration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetRelative = clickRatio * effectiveDuration;
    const start = currentSentence?.startTime ?? 0;
    const targetYt = start + targetRelative;

    isHandlingEndRef.current = false;
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.seekTo(targetYt, true);
      } catch {}
    }
    onPlaybackTimeUpdate?.(targetRelative);
    onSeek?.(targetRelative);
  };

  const formatTime = (sec: number): string => {
    const safeSec = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(safeSec / 60);
    const s = safeSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5];
  const cycleSpeed = () => {
    if (!onSpeedChange) return;
    const currentIdx = SPEED_OPTIONS.indexOf(playbackSpeed);
    const nextIdx = (currentIdx + 1) % SPEED_OPTIONS.length;
    onSpeedChange(SPEED_OPTIONS[nextIdx]);
  };

  const toggleMute = () => {
    if (!onVolumeChange) return;
    onVolumeChange(volume === 0 ? 1 : 0);
  };

  const progressPercent = Math.min(100, Math.max(0, (playbackTime / effectiveDuration) * 100));

  if (!youtubeId && !thumb) {
    return null;
  }

  const cinemaMaxWidth = isTheaterExpanded
    ? "100%"
    : viewportVariant === "cinema"
    ? "min(100%, calc(clamp(220px, 38vh, 380px) * 16 / 9))"
    : "min(100%, calc(clamp(215px, 34vh, 340px) * 16 / 9))";

  return (
    <div
      className={`relative w-full rounded-[20px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm select-none flex flex-col justify-between transition-all ${className}`}
    >
      {/* 1. Full-Width Double-Bezel Cinema Hardware Stage */}
      <div className="relative w-full bg-slate-950 bg-[radial-gradient(ellipse_at_center,rgba(0,89,187,0.16)_0%,rgba(2,6,23,0.98)_75%)] p-1.5 sm:p-2 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden">
        {/* True 16:9 Cinema Viewport (Never breaks aspect ratio) */}
        <div
          style={{ width: cinemaMaxWidth }}
          className="relative aspect-video mx-auto rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 bg-black flex items-center justify-center group shrink-0"
        >
          {youtubeId ? (
            <div className="w-full h-full relative">
              <div id={playerContainerId} className="w-full h-full" />
              {/* Initial Studio Poster Scrim before first play (eliminates initial YouTube overlay clutter) */}
              {!isPlaying && !hasStartedOnce && !embedError && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950 overflow-hidden">
                  {thumb && (
                    <img
                      src={thumb}
                      alt={title}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        if (img.naturalWidth === 120 && img.naturalHeight === 90) {
                          img.src = getLessonCoverImage({ title });
                        }
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getLessonCoverImage({ title });
                      }}
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-slate-950/35 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => {
                      setStartedYoutubeId(youtubeId);
                      onTogglePlay?.();
                    }}
                    className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-950/70 hover:bg-[#0059bb] backdrop-blur-md text-white flex items-center justify-center shadow-xl shadow-black/50 ring-1 ring-white/25 transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 active:scale-95 cursor-pointer"
                    title="Phát video (Space)"
                  >
                    {!isPlayerReady ? (
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-white ml-0.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : thumb ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={thumb}
                alt={title}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (img.naturalWidth === 120 && img.naturalHeight === 90) {
                    img.src = getLessonCoverImage({ title });
                  }
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getLessonCoverImage({ title });
                }}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          {/* Buffering Indicator */}
          {isBuffering && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-1.5 pointer-events-none z-20 shadow-md">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
              <span>Đang tải đệm...</span>
            </div>
          )}

          {/* Embed error fallback notice */}
          {embedError && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-30 p-4 flex flex-col items-center justify-center text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-400" />
              <p className="text-xs sm:text-sm font-semibold text-white max-w-sm">
                {embedError}
              </p>
              <p className="text-[11px] text-slate-300">
                {fallbackNotice ||
                  (practiceMode === "shadowing"
                    ? "Bạn vẫn có thể luyện nói nhại âm bình thường với âm thanh chuẩn bản ngữ."
                    : "Bạn vẫn có thể luyện nghe bình thường với âm thanh chuẩn bản ngữ.")}
              </p>
              {onFallbackToAudio && (
                <button
                  type="button"
                  onClick={onFallbackToAudio}
                  className="mt-1 px-3 py-1.5 rounded-lg bg-[#0059bb] hover:bg-blue-600 text-white text-xs font-semibold shadow transition-all cursor-pointer"
                >
                  Chuyển sang chế độ Audio
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Control Dock (Below Video, Clean & Symmetrical) */}
      <div className="w-full shrink-0 px-3 sm:px-4 pt-2.5 pb-2 space-y-1.5 bg-white dark:bg-slate-900 select-none">
        {/* Scrubber Progress Bar */}
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums shrink-0 font-bold">
            {formatTime(playbackTime)}
          </span>
          <div
            onClick={handleProgressBarClick}
            className="relative flex-1 h-2 hover:h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full cursor-pointer group transition-all"
            title="Nhấp để tua thời gian trong câu"
          >
            <div
              className="h-full bg-gradient-to-r from-[#0059bb] to-sky-500 rounded-full transition-all duration-75 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md ring-2 ring-[#0059bb] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums shrink-0 font-bold">
            {formatTime(effectiveDuration)}
          </span>
        </div>

        {/* Transport & Setting Buttons Row */}
        <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-1 sm:gap-2 pt-0.5 select-none">
          {/* Left Zone: Segment counter badge */}
          <div className="flex items-center gap-1 sm:gap-1.5 justify-start min-w-0">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] sm:text-xs font-bold border border-slate-200/80 dark:border-slate-700/60 tabular-nums shrink-0 shadow-2xs">
              #{segmentIndex + 1}/{totalSegments}
            </span>

            {isRecording && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-[10px] font-bold animate-pulse shrink-0">
                <Radio className="w-3 h-3 text-rose-500" />
                <span className="hidden md:inline">Thu âm</span>
              </div>
            )}
          </div>

          {/* Center Zone: Symmetrical Primary Transport Cluster */}
          <div className="flex items-center justify-center gap-1 sm:gap-2.5">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                disabled={isPrevDisabled}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer active:scale-90"
                title="Câu trước đó (Ctrl + Left)"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {onRewind5s && (
              <button
                type="button"
                onClick={handleRewind5s}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-90"
                title="Tua lùi 5s (←)"
              >
                <Rewind5sIcon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
              </button>
            )}

            {/* Dominant Primary Play Button (Royal Blue #0059bb) */}
            <button
              type="button"
              onClick={onTogglePlay}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0059bb] hover:bg-[#004ba0] text-white flex items-center justify-center shadow-md shadow-blue-900/25 active:scale-95 transition-all cursor-pointer shrink-0 select-none group"
              title={isPlaying ? "Tạm dừng video (Space)" : "Phát video (Space)"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white stroke-white" />
              ) : (
                <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white stroke-white ml-0.5" />
              )}
            </button>

            {onForward5s && (
              <button
                type="button"
                onClick={handleForward5s}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-90"
                title="Tua nhanh 5s (→)"
              >
                <Forward5sIcon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
              </button>
            )}

            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={isNextDisabled}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer active:scale-90"
                title="Câu tiếp theo (Enter / Ctrl + Right)"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          {/* Right Zone: Secondary Actions (Loop, Speed, Volume) */}
          <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
            {/* Loop Sentence Button */}
            <button
              type="button"
              onClick={() => setIsLoopSentence((prev) => !prev)}
              className={`w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                isLoopSentence
                  ? "bg-blue-500/10 border-blue-400/40 text-[#0059bb] dark:text-sky-400"
                  : "border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
              title={isLoopSentence ? "Đang bật lặp lại câu này (A-B Loop)" : "Bật lặp lại câu này tự động"}
            >
              <Repeat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {onSpeedChange && (
              <button
                type="button"
                onClick={cycleSpeed}
                className="h-7.5 sm:h-8.5 px-2 sm:px-2.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 text-[10.5px] sm:text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                title="Thay đổi tốc độ phát (0.75x, 1x, 1.25x, 1.5x)"
              >
                <Gauge className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#0059bb] dark:text-sky-400" />
                <span>{playbackSpeed}x</span>
              </button>
            )}

            {onVolumeChange && (
              <button
                type="button"
                onClick={toggleMute}
                className="hidden sm:flex w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                title={volume === 0 ? "Bật âm thanh" : "Tắt tiếng"}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-500" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsTheaterExpanded((prev) => !prev)}
              className={`hidden sm:flex w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full items-center justify-center border transition-all cursor-pointer ${
                isTheaterExpanded
                  ? "bg-blue-500/10 border-blue-400/40 text-[#0059bb] dark:text-sky-400"
                  : "border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
              title={isTheaterExpanded ? "Thu gọn khung video" : "Phóng to khung video"}
            >
              {isTheaterExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface VoiceChannelOptions {
  roomId?: string;
  onVolumeChange?: (volume: number) => void;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onConnectionStateChange?: (state: "connected" | "connecting" | "reconnecting" | "disconnected") => void;
}

export function useVoiceChannel(options: VoiceChannelOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeaf, setIsDeaf] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isPushToTalk, setIsPushToTalk] = useState(false);
  const [isPttActive, setIsPttActive] = useState(false);
  const [noiseGateThreshold, setNoiseGateThreshold] = useState(15); // 0-100 scale

  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedInputId, setSelectedInputId] = useState<string>("");
  const [selectedOutputId, setSelectedOutputId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const speakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptRef = useRef<number>(0);

  // Enumerate Audio Devices
  const enumerateDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter((d) => d.kind === "audioinput");
      const audioOutputs = devices.filter((d) => d.kind === "audiooutput");

      setInputDevices(audioInputs);
      setOutputDevices(audioOutputs);

      if (audioInputs.length > 0 && !selectedInputId) {
        setSelectedInputId(audioInputs[0].deviceId);
      }
      if (audioOutputs.length > 0 && !selectedOutputId) {
        setSelectedOutputId(audioOutputs[0].deviceId);
      }
    } catch (err) {
      console.error("Error enumerating audio devices:", err);
    }
  }, [selectedInputId, selectedOutputId]);

  useEffect(() => {
    enumerateDevices();
    if (navigator.mediaDevices) {
      navigator.mediaDevices.addEventListener("devicechange", enumerateDevices);
      return () => {
        navigator.mediaDevices.removeEventListener("devicechange", enumerateDevices);
      };
    }
  }, [enumerateDevices]);

  // Audio Processing Loop (VAD & Volume Metering)
  const startAudioAnalyser = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.4;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((average / 128) * 100));

        setVolumeLevel(normalized);
        options.onVolumeChange?.(normalized);

        // VAD Logic with Noise Gate
        const speakingNow = normalized > noiseGateThreshold;
        if (speakingNow) {
          if (speakingTimeoutRef.current) {
            clearTimeout(speakingTimeoutRef.current);
            speakingTimeoutRef.current = null;
          }
          setIsSpeaking(true);
          options.onSpeakingChange?.(true);
        } else {
          // Keep speaking ring active for 300ms after silence
          if (!speakingTimeoutRef.current) {
            speakingTimeoutRef.current = setTimeout(() => {
              setIsSpeaking(false);
              options.onSpeakingChange?.(false);
            }, 300);
          }
        }

        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.error("AudioContext initialization failed:", err);
    }
  };

  // Connect to Voice Channel
  const connectVoice = async () => {
    try {
      setErrorMsg(null);
      setIsReconnecting(false);
      options.onConnectionStateChange?.("connecting");

      const constraints: MediaStreamConstraints = {
        audio: {
          deviceId: selectedInputId ? { exact: selectedInputId } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;

      // Handle track mute state
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });

      // Handle unexpected track ending (e.g. mic unplugged / browser suspended)
      stream.getAudioTracks().forEach((track) => {
        track.onended = () => {
          handleAutoReconnect();
        };
      });

      startAudioAnalyser(stream);
      setIsConnected(true);
      reconnectAttemptRef.current = 0;
      options.onConnectionStateChange?.("connected");

      // Start periodic signaling heartbeat
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = setInterval(() => {
        if (localStreamRef.current && localStreamRef.current.active) {
          // Heartbeat ping OK
        } else if (isConnected) {
          handleAutoReconnect();
        }
      }, 10000);

      enumerateDevices();
    } catch (err: any) {
      console.error("Failed to access microphone:", err);
      setErrorMsg("Quyền truy cập Micro bị từ chối hoặc thiết bị bận!");
      setIsConnected(false);
      options.onConnectionStateChange?.("disconnected");
      throw err;
    }
  };

  // Auto Reconnection with Exponential Backoff
  const handleAutoReconnect = useCallback(async () => {
    if (reconnectAttemptRef.current >= 3) {
      setErrorMsg("Mất kết nối Micro. Vui lòng kiểm tra lại thiết bị.");
      disconnectVoice();
      return;
    }

    reconnectAttemptRef.current += 1;
    setIsReconnecting(true);
    options.onConnectionStateChange?.("reconnecting");

    const backoffDelay = Math.min(5000, 1000 * Math.pow(2, reconnectAttemptRef.current));
    setTimeout(async () => {
      try {
        await connectVoice();
      } catch {
        // Handled in next tick
      }
    }, backoffDelay);
  }, []);

  // Disconnect from Voice Channel
  const disconnectVoice = useCallback(() => {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (speakingTimeoutRef.current) {
      clearTimeout(speakingTimeoutRef.current);
      speakingTimeoutRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    setIsConnected(false);
    setIsReconnecting(false);
    setIsSpeaking(false);
    setVolumeLevel(0);
    options.onConnectionStateChange?.("disconnected");
  }, []);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (localStreamRef.current) {
        localStreamRef.current.getAudioTracks().forEach((track) => {
          track.enabled = !next;
        });
      }
      return next;
    });
  }, []);

  // Toggle Deaf
  const toggleDeaf = useCallback(() => {
    setIsDeaf((prev) => !prev);
  }, []);

  // Push-to-Talk spacebar key handlers
  useEffect(() => {
    if (!isPushToTalk || !isConnected) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat && (e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
        e.preventDefault();
        setIsPttActive(true);
        if (localStreamRef.current) {
          localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = true));
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPttActive(false);
        if (localStreamRef.current && isMuted) {
          localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = false));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPushToTalk, isConnected, isMuted]);

  // Global Shortcut: Ctrl + Shift + M for Mute Toggle
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyM") {
        e.preventDefault();
        if (isConnected) {
          toggleMute();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, [isConnected, toggleMute]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectVoice();
    };
  }, [disconnectVoice]);

  return {
    isConnected,
    isReconnecting,
    isMuted,
    isDeaf,
    isSpeaking,
    volumeLevel,
    isPushToTalk,
    isPttActive,
    noiseGateThreshold,
    setNoiseGateThreshold,
    setIsPushToTalk,
    inputDevices,
    outputDevices,
    selectedInputId,
    selectedOutputId,
    setSelectedInputId,
    setSelectedOutputId,
    errorMsg,
    connectVoice,
    disconnectVoice,
    toggleMute,
    toggleDeaf,
    localStream: localStreamRef.current,
  };
}

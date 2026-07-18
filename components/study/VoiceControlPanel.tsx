"use client";

import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Headphones,
  Sliders,
  Radio,
  Wifi,
  Sparkles,
  Volume2,
  XCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui";

interface VoiceControlPanelProps {
  isConnected: boolean;
  isMuted: boolean;
  isDeaf: boolean;
  isSpeaking: boolean;
  volumeLevel: number;
  isPushToTalk: boolean;
  isPttActive: boolean;
  noiseGateThreshold: number;
  setNoiseGateThreshold: (val: number) => void;
  setIsPushToTalk: (val: boolean) => void;
  inputDevices: MediaDeviceInfo[];
  outputDevices: MediaDeviceInfo[];
  selectedInputId: string;
  selectedOutputId: string;
  setSelectedInputId: (id: string) => void;
  setSelectedOutputId: (id: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onToggleMute: () => void;
  onToggleDeaf: () => void;
}

export function VoiceControlPanel({
  isConnected,
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
  onConnect,
  onDisconnect,
  onToggleMute,
  onToggleDeaf,
}: VoiceControlPanelProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [latency] = useState<number>(38); // Simulated Ping < 50ms

  return (
    <div className="relative inline-flex items-center gap-2">
      {/* Primary Voice Channel Button */}
      <Button
        variant="secondary"
        size="sm"
        className={`rounded-xl font-bold cursor-pointer text-xs transition-all duration-300 flex items-center gap-1.5 ${
          isConnected
            ? isMuted
              ? "bg-rose-500 text-white border-rose-500 shadow-md hover:bg-rose-600"
              : isSpeaking
              ? "bg-emerald-500 text-white border-emerald-500 animate-pulse shadow-md ring-4 ring-emerald-500/30"
              : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-sm"
            : "bg-slate-100 dark:bg-neutral-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
        }`}
        onClick={isConnected ? onToggleMute : onConnect}
        title={isConnected ? (isMuted ? "Đang tắt tiếng (Bấm để bật)" : "Đang phát tiếng (Bấm để Mute)") : "Vào Kênh Thoại"}
      >
        {isConnected ? (
          isMuted ? (
            <>
              <MicOff className="h-3.5 w-3.5 text-white stroke-[2.5]" />
              <span className="hidden sm:inline">🔇 Muted</span>
              <span className="sm:hidden">Mute</span>
            </>
          ) : (
            <>
              <Mic className="h-3.5 w-3.5 text-white" />
              <span className="hidden sm:inline">🎙️ {isSpeaking ? "Đang phát tiếng..." : "Đã vào Kênh Thoại"}</span>
              <span className="sm:hidden">{isSpeaking ? "Nói" : "Bật"}</span>
            </>
          )
        ) : (
          <>
            <Mic className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">🎙️ Vào Kênh Thoại</span>
            <span className="sm:hidden">Thoại</span>
          </>
        )}
      </Button>

      {/* Connected Active Controls */}
      {isConnected && (
        <>
          {/* Deaf Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
              isDeaf
                ? "bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800"
                : "bg-slate-100 dark:bg-neutral-850 text-slate-700 dark:text-slate-300"
            }`}
            onClick={onToggleDeaf}
            title={isDeaf ? "Mở tai nghe" : "Tắt tai nghe (Deaf)"}
          >
            <Headphones className={`h-3.5 w-3.5 ${isDeaf ? "line-through text-rose-500" : ""}`} />
          </Button>

          {/* Quick Audio Settings Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl px-2 py-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-neutral-850 hover:bg-slate-200"
            onClick={() => setShowSettings(!showSettings)}
            title="Cài đặt Audio & Mic"
          >
            <Sliders className="h-3.5 w-3.5" />
          </Button>

          {/* Leave Audio Channel Button */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            onClick={onDisconnect}
            title="Ngắt kết nối Kênh thoại"
          >
            <XCircle className="h-3.5 w-3.5" />
          </Button>
        </>
      )}

      {/* Audio Settings Modal / Popover */}
      {showSettings && (
        <div className="absolute right-0 top-11 z-50 w-72 p-4 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-neutral-800">
            <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Cài Đặt Âm Thanh Realtime
            </h4>
            <button
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* Mic Meter Bar */}
          <div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
              <span>Đo âm lượng Mic</span>
              <span className={volumeLevel > noiseGateThreshold ? "text-emerald-500 font-extrabold" : "text-slate-400"}>
                {volumeLevel}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-75 ${
                  volumeLevel > noiseGateThreshold ? "bg-emerald-500" : "bg-blue-400"
                }`}
                style={{ width: `${volumeLevel}%` }}
              />
            </div>
          </div>

          {/* Noise Gate Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
              <span>Lọc tiếng ồn (Noise Gate)</span>
              <span>{noiseGateThreshold}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={noiseGateThreshold}
              onChange={(e) => setNoiseGateThreshold(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Input Device Selector */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1">Microphone đầu vào</label>
            <select
              value={selectedInputId}
              onChange={(e) => setSelectedInputId(e.target.value)}
              className="w-full py-1.5 px-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {inputDevices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Microphone ${d.deviceId.slice(0, 5)}`}
                </option>
              ))}
            </select>
          </div>

          {/* Push to Talk Toggle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Push-to-Talk (Spacebar)</span>
            <input
              type="checkbox"
              checked={isPushToTalk}
              onChange={(e) => setIsPushToTalk(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </div>

          {/* Latency / Ping Quality Indicator */}
          <div className="pt-2 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 font-bold text-slate-500">
              <Wifi className="h-3 w-3 text-emerald-500" /> Ping audio: {latency}ms
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-black">
              Rất tốt
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

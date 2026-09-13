import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  isPvPSoundEnabled,
  setPvPSoundEnabled,
  playPvPSound,
  PvPSoundType,
} from "@/features/pvp/utils/pvpSoundEngine";

describe("PvP Synthetic Sound Engine", () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = String(val);
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    });
  });

  it("defaults to sound enabled if nothing in localStorage", () => {
    expect(isPvPSoundEnabled()).toBe(true);
  });

  it("persists sound toggles accurately in localStorage", () => {
    setPvPSoundEnabled(false);
    expect(isPvPSoundEnabled()).toBe(false);
    expect(mockStorage["xp_pvp_sound_enabled"]).toBe("false");

    setPvPSoundEnabled(true);
    expect(isPvPSoundEnabled()).toBe(true);
  });

  it("safely handles playPvPSound across all sound types without throwing", () => {
    const soundTypes: PvPSoundType[] = [
      "tick",
      "urgent_tick",
      "match_found",
      "correct",
      "incorrect",
      "victory",
      "defeat",
    ];

    soundTypes.forEach((type) => {
      expect(() => playPvPSound(type)).not.toThrow();
    });
  });

  it("does not trigger audio if sound is disabled", () => {
    setPvPSoundEnabled(false);
    expect(() => playPvPSound("correct")).not.toThrow();
  });
});

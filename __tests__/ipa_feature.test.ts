import { describe, it, expect } from "vitest";
import {
  ALL_IPA_SOUNDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  MINIMAL_PAIRS,
  getIpaSoundById,
  type IpaSound,
  IpaAudioPlayButton,
  IpaSoundBadge,
  IpaMetricCard,
  IpaWaveformVisualizer,
  IpaWordExampleCard,
  IpaMouthAnatomySvg,
  IpaSpeechRecorder,
  IpaHeroGreeting,
  IpaMatrixBoard,
  IpaSoundCardV2,
  IpaSoundDetailModal,
  IpaDedicatedPracticeLab,
  IpaMinimalPairsArena,
} from "@/features/ipa";

describe("Interactive IPA Feature Data & Integrity Suite", () => {
  it("should contain exactly 44 standard IPA sounds", () => {
    expect(ALL_IPA_SOUNDS.length).toBe(44);
  });

  it("should categorize correctly into 12 Monophthongs, 8 Diphthongs, and 24 Consonants", () => {
    expect(MONOPHTHONGS.length).toBe(12);
    expect(DIPHTHONGS.length).toBe(8);
    expect(CONSONANTS.length).toBe(24);

    const total = MONOPHTHONGS.length + DIPHTHONGS.length + CONSONANTS.length;
    expect(total).toBe(44);
  });

  it("should ensure all sounds have unique IDs and valid symbols", () => {
    const idSet = new Set<string>();
    const symbolSet = new Set<string>();

    ALL_IPA_SOUNDS.forEach((sound) => {
      expect(sound.id).toBeTruthy();
      expect(sound.symbol).toBeTruthy();
      expect(sound.keyWord).toBeTruthy();

      expect(idSet.has(sound.id)).toBe(false);
      idSet.add(sound.id);

      expect(symbolSet.has(sound.symbol)).toBe(false);
      symbolSet.add(sound.symbol);
    });

    expect(idSet.size).toBe(44);
  });

  it("should verify anatomical guidance and Vietnamese tips exist for every sound", () => {
    ALL_IPA_SOUNDS.forEach((sound: IpaSound) => {
      // Anatomical parameters
      expect(sound.mouthShape).toBeTruthy();
      expect(sound.tonguePosition).toBeTruthy();
      expect(sound.jawOpening).toBeTruthy();
      expect(sound.airflowManner).toBeTruthy();
      expect(["voiced", "voiceless"]).toContain(sound.voicing);

      // Teaching guidance
      expect(sound.vietnameseGuide).toBeTruthy();
      expect(sound.practiceTip).toBeTruthy();
      expect(sound.commonMistakes).toBeTruthy();

      // Examples
      expect(sound.examples.length).toBeGreaterThanOrEqual(3);
      sound.examples.forEach((ex) => {
        expect(ex.word).toBeTruthy();
        expect(ex.phonetic).toBeTruthy();
        expect(ex.meaning).toBeTruthy();
      });
    });
  });

  it("should verify helper getIpaSoundById retrieves sounds accurately", () => {
    const i_sound = getIpaSoundById("v_i_long");
    expect(i_sound).toBeDefined();
    expect(i_sound?.symbol).toBe("iː");
    expect(i_sound?.category).toBe("monophthong");

    const non_existent = getIpaSoundById("non_existent_sound");
    expect(non_existent).toBeUndefined();
  });

  it("should contain valid Minimal Pairs training pairs", () => {
    expect(MINIMAL_PAIRS.length).toBeGreaterThanOrEqual(8);

    MINIMAL_PAIRS.forEach((pair) => {
      expect(pair.id).toBeTruthy();
      expect(pair.title).toBeTruthy();
      expect(pair.description).toBeTruthy();
      expect(pair.soundA).toBeTruthy();
      expect(pair.soundB).toBeTruthy();
      expect(pair.pairs.length).toBeGreaterThanOrEqual(3);

      pair.pairs.forEach((w) => {
        expect(w.wordA).toBeTruthy();
        expect(w.phoneticA).toBeTruthy();
        expect(w.meaningA).toBeTruthy();
        expect(w.wordB).toBeTruthy();
        expect(w.phoneticB).toBeTruthy();
        expect(w.meaningB).toBeTruthy();
      });
    });
  });

  it("should export all reusable and modular components correctly", () => {
    expect(IpaAudioPlayButton).toBeDefined();
    expect(IpaSoundBadge).toBeDefined();
    expect(IpaMetricCard).toBeDefined();
    expect(IpaWaveformVisualizer).toBeDefined();
    expect(IpaWordExampleCard).toBeDefined();
    expect(IpaMouthAnatomySvg).toBeDefined();
    expect(IpaSpeechRecorder).toBeDefined();
    expect(IpaHeroGreeting).toBeDefined();
    expect(IpaMatrixBoard).toBeDefined();
    expect(IpaSoundCardV2).toBeDefined();
    expect(IpaSoundDetailModal).toBeDefined();
    expect(IpaDedicatedPracticeLab).toBeDefined();
    expect(IpaMinimalPairsArena).toBeDefined();
  });
});

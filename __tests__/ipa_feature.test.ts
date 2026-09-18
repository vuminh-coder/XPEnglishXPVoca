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
  getSoundDisplayHint,
  getSagittalGeometry,
  getFrontalLipGeometry,
  IpaSagittalCrossSection,
  IpaFrontalLipShape,
  IpaAnatomyViewer,
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

  it("should generate valid and non-empty short display hints for all 44 sounds", () => {
    ALL_IPA_SOUNDS.forEach((sound) => {
      const hint = getSoundDisplayHint(sound);
      expect(hint).toBeTruthy();
      expect(typeof hint).toBe("string");
      expect(hint.length).toBeGreaterThan(0);
      // Ensure no redundant parentheses for voiced/voiceless
      expect(hint).not.toContain("(vô thanh)");
      expect(hint).not.toContain("(hữu thanh)");
    });
  });

  it("should verify all 8 paired consonant IDs and 8 single consonant IDs exist in CONSONANTS catalog", () => {
    const pairIds = [
      ["c_p", "c_b"],
      ["c_t", "c_d"],
      ["c_k", "c_g"],
      ["c_f", "c_v"],
      ["c_th_unvoiced", "c_th_voiced"],
      ["c_s", "c_z"],
      ["c_sh", "c_zh"],
      ["c_ch", "c_j"],
    ];
    const singleIds = ["c_m", "c_n", "c_ng", "c_h", "c_l", "c_r", "c_w", "c_j_glide"];

    const allConsonantIds = new Set(CONSONANTS.map((c) => c.id));

    pairIds.forEach(([id1, id2]) => {
      expect(allConsonantIds.has(id1)).toBe(true);
      expect(allConsonantIds.has(id2)).toBe(true);
    });

    singleIds.forEach((id) => {
      expect(allConsonantIds.has(id)).toBe(true);
    });

    expect(pairIds.length * 2 + singleIds.length).toBe(24);
  });

  it("should export IpaSuiteNavTabs correctly from nav-tabs suite", async () => {
    const { IpaSuiteNavTabs } = await import("@/shared/components/layout/nav-tabs");
    expect(IpaSuiteNavTabs).toBeDefined();
    expect(typeof IpaSuiteNavTabs).toBe("function");
  });

  it("should have all 44 isolated phoneme audio files present and non-empty in public/audio/ipa", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const audioDir = path.resolve(process.cwd(), "public/audio/ipa");

    expect(fs.existsSync(audioDir)).toBe(true);

    ALL_IPA_SOUNDS.forEach((sound) => {
      const filePath = path.join(audioDir, `${sound.id}.ogg`);
      expect(fs.existsSync(filePath), `Audio file missing for sound: ${sound.id} (${sound.symbol})`).toBe(true);
      const stat = fs.statSync(filePath);
      expect(stat.size, `Audio file is empty for sound: ${sound.id}`).toBeGreaterThan(0);
    });
  });

  it("should generate correct isolated audio URLs for all 44 sounds", async () => {
    const { getIsolatedAudioUrl } = await import("@/features/ipa");
    ALL_IPA_SOUNDS.forEach((sound) => {
      const url = getIsolatedAudioUrl(sound);
      expect(url).toBe(`/audio/ipa/${sound.id}.ogg`);
      const urlFromId = getIsolatedAudioUrl(sound.id);
      expect(urlFromId).toBe(`/audio/ipa/${sound.id}.ogg`);
    });
  });

  it("should export playIpaIsolatedSound and stopIpaAudio from ipaAudioPlayer", async () => {
    const player = await import("@/shared/utils/ipaAudioPlayer");
    expect(typeof player.playIpaIsolatedSound).toBe("function");
    expect(typeof player.stopIpaAudio).toBe("function");
    expect(typeof player.getIpaAudioUrl).toBe("function");
  });

  it("should generate valid Sagittal geometry and control paths for all 44 sounds", () => {
    ALL_IPA_SOUNDS.forEach((sound) => {
      const geo = getSagittalGeometry(sound);
      expect(Number.isFinite(geo.upperLipX)).toBe(true);
      expect(Number.isFinite(geo.upperLipY)).toBe(true);
      expect(Number.isFinite(geo.lowerLipX)).toBe(true);
      expect(Number.isFinite(geo.lowerLipY)).toBe(true);
      expect(Number.isFinite(geo.lowerTeethY)).toBe(true);
      expect(Number.isFinite(geo.mandibleDropY)).toBe(true);

      // Verify spline paths exist and start with valid SVG command M
      expect(geo.tongueBodyPath).toMatch(/^M \d+/);
      expect(geo.tongueSurfacePath).toMatch(/^M \d+/);
      expect(geo.velumPath).toMatch(/^M \d+/);
      expect(geo.airflowPath).toMatch(/^M \d+/);

      // Verify spotlight data
      expect(geo.spotlight.titleVi).toBeTruthy();
      expect(geo.spotlight.descriptionVi).toBeTruthy();
      expect(Number.isFinite(geo.spotlight.x)).toBe(true);
      expect(Number.isFinite(geo.spotlight.y)).toBe(true);

      // Verify anatomical reference pins
      expect(Array.isArray(geo.pins)).toBe(true);
      expect(geo.pins.length).toBe(5);
      geo.pins.forEach((pin) => {
        expect(pin.id).toBeTruthy();
        expect(Number.isFinite(pin.targetX)).toBe(true);
        expect(Number.isFinite(pin.targetY)).toBe(true);
        expect(Number.isFinite(pin.labelX)).toBe(true);
        expect(Number.isFinite(pin.labelY)).toBe(true);
        expect(pin.labelVi).toBeTruthy();
        expect(pin.labelEn).toBeTruthy();
      });
    });
  });

  it("should generate valid Frontal Lip geometry for all 44 sounds", () => {
    ALL_IPA_SOUNDS.forEach((sound) => {
      const frontal = getFrontalLipGeometry(sound);
      expect(frontal.width).toBeGreaterThan(0);
      expect(frontal.height).toBeGreaterThanOrEqual(0);
      expect(frontal.outerScaleX).toBeGreaterThan(0);
      expect(frontal.outerScaleY).toBeGreaterThan(0);
      expect(frontal.descriptionVi).toBeTruthy();
      expect(frontal.category).toBeTruthy();
    });
  });

  it("should export IpaSagittalCrossSection, IpaFrontalLipShape, and IpaAnatomyViewer as valid components", () => {
    expect(typeof IpaSagittalCrossSection).toBe("function");
    expect(typeof IpaFrontalLipShape).toBe("function");
    expect(typeof IpaAnatomyViewer).toBe("function");
  });
});



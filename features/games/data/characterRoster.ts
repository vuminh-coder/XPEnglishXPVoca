/**
 * XP English / XP Voca - 7 Exclusive Companion Characters
 * Each character has an original 3D persona, unique context domain,
 * and calibrated voice profile for TTS speech synthesis.
 */

export interface CompanionCharacter {
  id: "minh" | "linh" | "nam" | "mai" | "robert" | "an" | "sam";
  name: string;
  role: string;
  contextTag: string;
  avatarUrl: string;
  themeColor: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    ringColor: string;
  };
  voice: {
    accent: "en-US" | "en-GB" | "en-AU";
    pitch: number;
    rate: number;
    speakerIndex: number;
  };
}

export const XP_CHARACTERS: CompanionCharacter[] = [
  {
    id: "minh",
    name: "Minh",
    role: "Bạn học Gen Z",
    contextTag: "Đời sống & Phản xạ",
    avatarUrl: "/images/characters/minh.png",
    themeColor: {
      badgeBg: "bg-blue-50 dark:bg-blue-950/50",
      badgeText: "text-blue-700 dark:text-blue-300",
      badgeBorder: "border-blue-200 dark:border-blue-800",
      ringColor: "ring-blue-500/40",
    },
    voice: {
      accent: "en-US",
      pitch: 1.05,
      rate: 0.98,
      speakerIndex: 1,
    },
  },
  {
    id: "linh",
    name: "Cô Linh",
    role: "Cố vấn AI Tutor",
    contextTag: "IELTS & Học thuật",
    avatarUrl: "/images/characters/linh.png",
    themeColor: {
      badgeBg: "bg-purple-50 dark:bg-purple-950/50",
      badgeText: "text-purple-700 dark:text-purple-300",
      badgeBorder: "border-purple-200 dark:border-purple-800",
      ringColor: "ring-purple-500/40",
    },
    voice: {
      accent: "en-US",
      pitch: 1.0,
      rate: 0.92,
      speakerIndex: 0,
    },
  },
  {
    id: "nam",
    name: "Nam",
    role: "Kỹ sư Tech & Công sở",
    contextTag: "Công nghệ & Công sở",
    avatarUrl: "/images/characters/nam.png",
    themeColor: {
      badgeBg: "bg-slate-100 dark:bg-slate-800",
      badgeText: "text-slate-700 dark:text-slate-200",
      badgeBorder: "border-slate-300 dark:border-slate-700",
      ringColor: "ring-slate-500/40",
    },
    voice: {
      accent: "en-US",
      pitch: 0.9,
      rate: 0.95,
      speakerIndex: 3,
    },
  },
  {
    id: "mai",
    name: "Mai",
    role: "Nàng thơ Lối sống",
    contextTag: "Du lịch & Cảm xúc",
    avatarUrl: "/images/characters/mai.png",
    themeColor: {
      badgeBg: "bg-pink-50 dark:bg-pink-950/50",
      badgeText: "text-pink-700 dark:text-pink-300",
      badgeBorder: "border-pink-200 dark:border-pink-800",
      ringColor: "ring-pink-500/40",
    },
    voice: {
      accent: "en-US",
      pitch: 1.12,
      rate: 1.0,
      speakerIndex: 2,
    },
  },
  {
    id: "robert",
    name: "Thầy Robert",
    role: "Giáo sư Thông thái",
    contextTag: "Văn học & Chuyện kể",
    avatarUrl: "/images/characters/robert.png",
    themeColor: {
      badgeBg: "bg-amber-50 dark:bg-amber-950/50",
      badgeText: "text-amber-700 dark:text-amber-300",
      badgeBorder: "border-amber-200 dark:border-amber-800",
      ringColor: "ring-amber-500/40",
    },
    voice: {
      accent: "en-GB",
      pitch: 0.85,
      rate: 0.88,
      speakerIndex: 5,
    },
  },
  {
    id: "an",
    name: "Bé An",
    role: "Học viên Nhí",
    contextTag: "Từ vựng Căn bản",
    avatarUrl: "/images/characters/an.png",
    themeColor: {
      badgeBg: "bg-emerald-50 dark:bg-emerald-950/50",
      badgeText: "text-emerald-700 dark:text-emerald-300",
      badgeBorder: "border-emerald-200 dark:border-emerald-800",
      ringColor: "ring-emerald-500/40",
    },
    voice: {
      accent: "en-US",
      pitch: 1.25,
      rate: 0.95,
      speakerIndex: 4,
    },
  },
  {
    id: "sam",
    name: "Sam",
    role: "Nhà Thám hiểm",
    contextTag: "Thể thao & Sân bay",
    avatarUrl: "/images/characters/sam.png",
    themeColor: {
      badgeBg: "bg-cyan-50 dark:bg-cyan-950/50",
      badgeText: "text-cyan-700 dark:text-cyan-300",
      badgeBorder: "border-cyan-200 dark:border-cyan-800",
      ringColor: "ring-cyan-500/40",
    },
    voice: {
      accent: "en-AU",
      pitch: 1.0,
      rate: 1.02,
      speakerIndex: 7,
    },
  },
];

/**
 * Deterministically pick a character based on round index or sentence content
 */
export function getCharacterForRound(roundIndex: number, sentenceText: string = ""): CompanionCharacter {
  const lower = sentenceText.toLowerCase();
  
  if (lower.includes("technology") || lower.includes("computer") || lower.includes("project") || lower.includes("business") || lower.includes("office") || lower.includes("meeting")) {
    return XP_CHARACTERS.find((c) => c.id === "nam") || XP_CHARACTERS[2];
  }
  if (lower.includes("literature") || lower.includes("history") || lower.includes("wisdom") || lower.includes("ancient") || lower.includes("story") || lower.includes("culture")) {
    return XP_CHARACTERS.find((c) => c.id === "robert") || XP_CHARACTERS[4];
  }
  if (lower.includes("cat") || lower.includes("dog") || lower.includes("apple") || lower.includes("color") || lower.includes("toy") || lower.includes("baby") || lower.includes("simple")) {
    return XP_CHARACTERS.find((c) => c.id === "an") || XP_CHARACTERS[5];
  }
  if (lower.includes("travel") || lower.includes("sport") || lower.includes("run") || lower.includes("flight") || lower.includes("airport") || lower.includes("adventure") || lower.includes("climb")) {
    return XP_CHARACTERS.find((c) => c.id === "sam") || XP_CHARACTERS[6];
  }
  if (lower.includes("grammar") || lower.includes("academic") || lower.includes("research") || lower.includes("essay") || lower.includes("formal") || lower.includes("study") || lower.includes("exam")) {
    return XP_CHARACTERS.find((c) => c.id === "linh") || XP_CHARACTERS[1];
  }
  if (lower.includes("coffee") || lower.includes("art") || lower.includes("music") || lower.includes("fashion") || lower.includes("friend") || lower.includes("love") || lower.includes("feeling")) {
    return XP_CHARACTERS.find((c) => c.id === "mai") || XP_CHARACTERS[3];
  }

  // Fallback to round-based cycling
  const idx = Math.abs(roundIndex) % XP_CHARACTERS.length;
  return XP_CHARACTERS[idx];
}

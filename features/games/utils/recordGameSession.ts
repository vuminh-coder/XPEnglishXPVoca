import { useUserStore } from "@/stores/userStore";

export interface RecordGameParams {
  gameType: "memory" | "scramble" | "wordle" | "blitz" | "sentence" | string;
  score: number;
  durationSeconds: number;
  wordsCompleted?: number;
  attempts?: number;
  moves?: number;
  accuracy?: number;
}

export interface RecordGameResult {
  success: boolean;
  xpGained: number;
  coinsGained: number;
  antiCheatFlagged?: boolean;
  message?: string;
}

/**
 * Submits game session to server-authoritative anti-cheat reward pipeline.
 * Synchronizes confirmed XP and Coins with userStore upon success.
 */
export async function recordGameSession(
  params: RecordGameParams
): Promise<RecordGameResult> {
  try {
    const res = await fetch("/api/games/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        xpGained: 0,
        coinsGained: 0,
        message: json.error || "Không thể ghi nhận phần thưởng.",
      };
    }

    const data = json.data || {};
    const xpGained = Number(data.xpGained) || 0;
    const coinsGained = Number(data.coinsGained) || 0;

    // Sync client store if rewards were granted
    if (xpGained > 0) {
      const practiceMinutes = Math.max(1, Math.round((params.durationSeconds || 30) / 60));
      useUserStore.getState().awardXp(xpGained, "vocab");
      useUserStore.getState().addPracticeTime(practiceMinutes, "vocab");
      useUserStore.getState().syncStreak(true);
    }
    if (coinsGained > 0) {
      useUserStore.getState().awardCoins(coinsGained);
    }

    return {
      success: true,
      xpGained,
      coinsGained,
      antiCheatFlagged: json.antiCheatFlagged,
      message: data.message,
    };
  } catch (error) {
    console.error("Failed to record game session:", error);
    return {
      success: false,
      xpGained: 0,
      coinsGained: 0,
      message: "Lỗi kết nối khi gửi phần thưởng.",
    };
  }
}

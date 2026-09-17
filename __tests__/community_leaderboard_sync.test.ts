import { describe, it, expect } from "vitest";
import { processLeaderboardWithUser } from "@/features/community/hooks/useLeaderboardData";
import { formatCleanName } from "@/shared/components/feedback/UserAvatar";

describe("Community Leaderboard & Sidebar 100% Data Synchronization Tests", () => {
  const mockApiLeaders = [
    {
      id: "user-1",
      fullName: "Nguyễn Văn A",
      username: "vana",
      xp: 1200,
      level: 5,
      streak: 12,
      avatarUrl: "https://example.com/a.png",
      avatarEmoji: "🦁",
    },
    {
      id: "user-2",
      fullName: "Trần Thị B",
      username: "thib",
      xp: 950,
      level: 4,
      streak: 7,
      avatarUrl: "https://example.com/b.png",
      avatarEmoji: "🦊",
    },
    {
      id: "user-3",
      fullName: "Lê Văn C",
      username: "vanc",
      xp: 800,
      level: 3,
      streak: 4,
      avatarUrl: "https://example.com/c.png",
      avatarEmoji: "🐼",
    },
    {
      id: "user-4",
      fullName: "Phạm Văn D",
      username: "vand",
      xp: 600,
      level: 2,
      streak: 2,
      avatarUrl: "https://example.com/d.png",
      avatarEmoji: "🐨",
    },
  ];

  it("should preserve standard ranking when user is not logged in", () => {
    const processed = processLeaderboardWithUser(mockApiLeaders, null);
    expect(processed.length).toBe(4);
    expect(processed[0].fullName).toBe("Nguyễn Văn A");
    expect(processed[0].rank).toBe(1);
    expect(processed[1].fullName).toBe("Trần Thị B");
    expect(processed[1].rank).toBe(2);
    expect(processed[2].fullName).toBe("Lê Văn C");
    expect(processed[2].rank).toBe(3);

    // Sidebar takes top 3
    const top3Sidebar = processed.slice(0, 3);
    expect(top3Sidebar.length).toBe(3);
    expect(top3Sidebar[0].id).toBe(processed[0].id);
    expect(top3Sidebar[1].id).toBe(processed[1].id);
    expect(top3Sidebar[2].id).toBe(processed[2].id);
  });

  it("should elevate logged-in user into Top 1 if user has highest XP", () => {
    const currentUser = {
      id: "my-account-id",
      fullName: "vuminh@gmail.com",
      username: "vuminh",
      totalXp: 1500,
      currentStreak: 15,
      level: 6,
      avatarEmoji: "⚡",
    };

    const processed = processLeaderboardWithUser(mockApiLeaders, currentUser);

    // Current user should be rank 1
    expect(processed[0].isCurrentUser).toBe(true);
    expect(processed[0].rank).toBe(1);
    expect(processed[0].xp).toBe(1500);
    expect(processed[0].fullName).toBe("Vuminh"); // cleaned email

    // The rest should shift down
    expect(processed[1].id).toBe("user-1");
    expect(processed[1].rank).toBe(2);
    expect(processed[2].id).toBe("user-2");
    expect(processed[2].rank).toBe(3);

    // Top 3 in Sidebar and Leaderboard must match exactly
    const sidebarTop3 = processed.slice(0, 3);
    expect(sidebarTop3[0].fullName).toBe(processed[0].fullName);
    expect(sidebarTop3[1].fullName).toBe(processed[1].fullName);
    expect(sidebarTop3[2].fullName).toBe(processed[2].fullName);
    expect(sidebarTop3[0].xp).toBe(processed[0].xp);
  });

  it("should update existing user in leaderboard if local XP is higher", () => {
    const currentUser = {
      id: "user-2",
      fullName: "Trần Thị B",
      username: "thib",
      totalXp: 1300, // higher than original 950 and higher than user-1's 1200
      currentStreak: 8,
      level: 4,
    };

    const processed = processLeaderboardWithUser(mockApiLeaders, currentUser);

    expect(processed[0].id).toBe("user-2");
    expect(processed[0].rank).toBe(1);
    expect(processed[0].xp).toBe(1300);
    expect(processed[0].isCurrentUser).toBe(true);

    expect(processed[1].id).toBe("user-1");
    expect(processed[1].rank).toBe(2);
    expect(processed[1].xp).toBe(1200);
  });

  it("should clean up email usernames properly via formatCleanName", () => {
    expect(formatCleanName("nguyenvana@gmail.com")).toBe("Nguyenvana");
    expect(formatCleanName("nguyen.van.a@gmail.com")).toBe("Nguyen Van A");
    expect(formatCleanName("user_12345")).toBe("user_12345");
    expect(formatCleanName("@johndoe (John)")).toBe("johndoe");
    expect(formatCleanName("Học viên XP")).toBe("Học viên XP");
  });
});

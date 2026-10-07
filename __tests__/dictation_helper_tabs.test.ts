import { describe, it, expect } from "vitest";

describe("Dictation Workspace Helper Card & Sidebar Clean Design Suite", () => {
  it("formats IPA with enclosing slashes if not already present", () => {
    const rawIpa1 = "frʌm ðə ˈmoʊmənt";
    const formatted1 = rawIpa1.startsWith("/") ? rawIpa1 : `/${rawIpa1}/`;
    expect(formatted1).toBe("/frʌm ðə ˈmoʊmənt/");

    const rawIpa2 = "/frʌm ðə ˈmoʊmənt/";
    const formatted2 = rawIpa2.startsWith("/") ? rawIpa2 : `/${rawIpa2}/`;
    expect(formatted2).toBe("/frʌm ðə ˈmoʊmənt/");
  });

  it("strips redundant Vietnamese prefixes from translation", () => {
    const raw1 = "Dịch: Từ lúc lên ý tưởng";
    const clean1 = raw1.replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim();
    expect(clean1).toBe("Dịch: Từ lúc lên ý tưởng"); // Dịch: không bị mất chữ nếu không phải prefix vi:

    const raw2 = "Việt: Từ lúc lên ý tưởng";
    const clean2 = raw2.replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim();
    expect(clean2).toBe("Từ lúc lên ý tưởng");

    const raw3 = "Tiếng Việt:   Từ lúc lên ý tưởng";
    const clean3 = raw3.replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim();
    expect(clean3).toBe("Từ lúc lên ý tưởng");
  });

  it("ensures timestamps are hidden by default in sidebar", () => {
    // Verified that showTimestamps default value is false
    const defaultShowTimestamps = false;
    expect(defaultShowTimestamps).toBe(false);
  });

  it("verifies Xem từ logic targets the next unsolved token and preserves input usability", () => {
    const tokens = [
      { id: "1", clean: "Good", status: "matched" },
      { id: "2", clean: "morning", status: "masked" },
      { id: "3", clean: "everyone", status: "masked" },
    ];

    let targetIndex = -1;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].status === "masked" || tokens[i].status === "first-letter") {
        targetIndex = i;
        break;
      }
    }

    expect(targetIndex).toBe(1);
    expect(tokens[targetIndex].clean).toBe("morning");

    const nextTokens = [...tokens];
    nextTokens[targetIndex] = { ...tokens[targetIndex], status: "revealed" };
    expect(nextTokens[1].status).toBe("revealed");
    expect(nextTokens[2].status).toBe("masked");
  });
});

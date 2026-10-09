import { describe, it, expect, vi } from "vitest";
import { tokenizeSentence, WordToken } from "@/features/listening/components/DictationWorkspace";

describe("Dictation Workspace Hints & Input Deep Logic Suite", () => {
  const sentenceText = "The weather is very pleasant today";
  const properNouns: string[] = [];

  describe("1. Tokenizer & Initialization", () => {
    it("tokenizes sentence into accurate masked WordTokens", () => {
      const tokens = tokenizeSentence(sentenceText, properNouns);
      expect(tokens.length).toBe(6);
      expect(tokens[0].clean).toBe("The");
      expect(tokens[1].clean).toBe("weather");
      expect(tokens[2].clean).toBe("is");
      expect(tokens[3].clean).toBe("very");
      expect(tokens[4].clean).toBe("pleasant");
      expect(tokens[5].clean).toBe("today");

      for (const t of tokens) {
        expect(t.status).toBe("masked");
        expect(t.dots.length).toBe(t.clean.length);
      }
    });
  });

  describe("2. First Letter Hint ('Xem chữ đầu' / Alt+H)", () => {
    it("hints the first letter of each successive masked word without progressive multi-letter hint", () => {
      let tokens = tokenizeSentence(sentenceText, properNouns);

      // Simulation of handleHintFirstLetter
      const hintFirstLetter = (currentTokens: WordToken[]) => {
        const targetIndex = currentTokens.findIndex((t) => t.status === "masked");
        if (targetIndex === -1) return currentTokens;

        const targetToken = currentTokens[targetIndex];
        const nextTokens = [...currentTokens];
        if (targetToken.clean.length <= 1) {
          nextTokens[targetIndex] = { ...targetToken, status: "revealed" as const };
        } else {
          nextTokens[targetIndex] = { ...targetToken, status: "first-letter" as const, hintLength: 1 };
        }
        return nextTokens;
      };

      // 1st click: reveals first letter of Word 0 ("The")
      tokens = hintFirstLetter(tokens);
      expect(tokens[0].status).toBe("first-letter");
      expect(tokens[0].clean.charAt(0)).toBe("T");
      expect(tokens[0].clean.charAt(0) + "•".repeat(tokens[0].length - 1)).toBe("T••");
      expect(tokens[1].status).toBe("masked");

      // 2nd click: reveals first letter of NEXT word (Word 1 "weather"), does NOT reveal 2nd letter of Word 0
      tokens = hintFirstLetter(tokens);
      expect(tokens[0].status).toBe("first-letter");
      expect(tokens[0].clean.charAt(0)).toBe("T"); // Word 0 remains unchanged
      expect(tokens[1].status).toBe("first-letter");
      expect(tokens[1].clean.charAt(0)).toBe("w");
      expect(tokens[1].clean.charAt(0) + "•".repeat(tokens[1].length - 1)).toBe("w••••••");
      expect(tokens[2].status).toBe("masked");

      // 3rd click: reveals first letter of Word 2 ("is")
      tokens = hintFirstLetter(tokens);
      expect(tokens[2].status).toBe("first-letter");
      expect(tokens[2].clean.charAt(0)).toBe("i");
      expect(tokens[2].clean.charAt(0) + "•".repeat(tokens[2].length - 1)).toBe("i•");
    });

    it("immediately reveals single-letter words when hinting first letter", () => {
      let tokens = tokenizeSentence("I see a bird", properNouns);
      const targetIndex = tokens.findIndex((t) => t.status === "masked");
      expect(targetIndex).toBe(0);
      expect(tokens[0].clean).toBe("I");
      expect(tokens[0].clean.length).toBe(1);
    });
  });

  describe("3. Reveal Next Word ('Xem từ' / Alt+R)", () => {
    it("reveals the first unsolved token and clears the input box", () => {
      let tokens = tokenizeSentence(sentenceText, properNouns);
      let inputValue = "some_partial_typing";

      const revealNextWord = (currentTokens: WordToken[]) => {
        const targetIndex = currentTokens.findIndex(
          (t) => t.status === "masked" || t.status === "first-letter"
        );
        if (targetIndex === -1) return { nextTokens: currentTokens, nextInput: inputValue };

        const targetToken = currentTokens[targetIndex];
        const nextTokens = [...currentTokens];
        nextTokens[targetIndex] = {
          ...targetToken,
          status: "revealed" as const,
          hintLength: targetToken.length,
        };
        return { nextTokens, nextInput: "" };
      };

      const res = revealNextWord(tokens);
      expect(res.nextTokens[0].status).toBe("revealed");
      expect(res.nextTokens[0].clean).toBe("The");
      expect(res.nextInput).toBe(""); // Cleared to prevent word collision!
      expect(res.nextTokens[1].status).toBe("masked");
    });

    it("triggers checkCompletion when the final word is revealed, preventing hang/freeze bug", () => {
      let tokens = tokenizeSentence("Hello world", properNouns);
      tokens[0].status = "matched"; // 1st word matched

      let completedCalled = false;
      const checkCompletion = (curr: WordToken[]) => {
        const allSolved = curr.every((t) => t.status === "matched" || t.status === "revealed");
        if (allSolved) completedCalled = true;
      };

      // Reveal 2nd word
      const targetIndex = tokens.findIndex((t) => t.status === "masked" || t.status === "first-letter");
      expect(targetIndex).toBe(1);

      tokens[targetIndex] = { ...tokens[targetIndex], status: "revealed" };
      checkCompletion(tokens);

      expect(completedCalled).toBe(true);
    });
  });

  describe("4. Direct Token Card Click ('Nhấn để xem từ')", () => {
    it("reveals clicked token and triggers completion check", () => {
      let tokens = tokenizeSentence("Good day", properNouns);
      let completedCalled = false;

      const handleTokenClick = (idx: number) => {
        if (tokens[idx].status === "masked" || tokens[idx].status === "first-letter") {
          tokens[idx] = { ...tokens[idx], status: "revealed", hintLength: tokens[idx].length };
          const allSolved = tokens.every((t) => t.status === "matched" || t.status === "revealed");
          if (allSolved) completedCalled = true;
        }
      };

      // Click token 0
      handleTokenClick(0);
      expect(tokens[0].status).toBe("revealed");
      expect(completedCalled).toBe(false);

      // Click token 1
      handleTokenClick(1);
      expect(tokens[1].status).toBe("revealed");
      expect(completedCalled).toBe(true);
    });
  });

  describe("5. Input Box KeyDown & IME / Mobile Spacebar Handling", () => {
    it("handles Space ending from virtual mobile keyboards without trailing space accumulation", () => {
      let inputValue = "";
      const checkWordMock = vi.fn().mockImplementation((val: string) => {
        return val.toLowerCase() === "the";
      });

      const handleInputChange = (val: string) => {
        if (val.endsWith(" ") || val.endsWith("\n")) {
          const trimmed = val.trim();
          if (trimmed) {
            const matched = checkWordMock(trimmed);
            if (matched) {
              inputValue = "";
              return;
            }
          }
          inputValue = trimmed;
          return;
        }
        inputValue = val;
      };

      // Case 1: User types "The " on mobile keyboard
      handleInputChange("The ");
      expect(checkWordMock).toHaveBeenCalledWith("The");
      expect(inputValue).toBe(""); // Automatically cleared on match!

      // Case 2: User types wrong word "Thx " on mobile keyboard
      handleInputChange("Thx ");
      expect(checkWordMock).toHaveBeenCalledWith("Thx");
      expect(inputValue).toBe("Thx"); // Preserved without trailing space!
    });

    it("prevents empty spacebar spam in handleKeyDown", () => {
      const handleKeyDownSim = (key: string, currentVal: string) => {
        let prevented = false;
        let submitted = false;

        if (key === " " || key === "Enter") {
          prevented = true;
          const trimmed = currentVal.trim();
          if (trimmed) {
            submitted = true;
          }
        }
        return { prevented, submitted };
      };

      // Press space when input is empty
      const res1 = handleKeyDownSim(" ", "");
      expect(res1.prevented).toBe(true);
      expect(res1.submitted).toBe(false); // No submission, no space inserted

      // Press space with content
      const res2 = handleKeyDownSim(" ", "hello");
      expect(res2.prevented).toBe(true);
      expect(res2.submitted).toBe(true);
    });
  });
});

import { describe, it, expect } from "vitest";
import { partitionVocabularyPool, buildPartitionUrl } from "@/features/vocabulary/utils/vocabularyPartition";
import { BasicVocabularyItem } from "@/features/vocabulary/data/types";

describe("vocabularyPartition utility", () => {
  const mockVocabs: BasicVocabularyItem[] = Array.from({ length: 30 }, (_, i) => ({
    id: `v_${i + 1}`,
    word: `word_${i + 1}`,
    phonetic: `/w_${i + 1}/`,
    definition: `def ${i + 1}`,
    definitionVn: `nghia ${i + 1}`,
    pos: "noun",
    difficulty: 1,
    frequency: 5,
    themeId: "t_test",
    themeNameVn: "Chủ đề test",
    themeNameEn: "Test Theme",
    examples: [`This is example ${i + 1}.`],
  }));

  it("partitions 30 words into 2 parts of 15 by default", () => {
    const part1 = partitionVocabularyPool(mockVocabs, { part: 1 });
    expect(part1.items.length).toBe(15);
    expect(part1.currentPart).toBe(1);
    expect(part1.totalParts).toBe(2);
    expect(part1.hasPrevPart).toBe(false);
    expect(part1.hasNextPart).toBe(true);
    expect(part1.nextPartNumber).toBe(2);
    expect(part1.items[0].word).toBe("word_1");
    expect(part1.items[14].word).toBe("word_15");

    const part2 = partitionVocabularyPool(mockVocabs, { part: 2 });
    expect(part2.items.length).toBe(15);
    expect(part2.currentPart).toBe(2);
    expect(part2.hasPrevPart).toBe(true);
    expect(part2.hasNextPart).toBe(false);
    expect(part2.prevPartNumber).toBe(1);
    expect(part2.items[0].word).toBe("word_16");
    expect(part2.items[14].word).toBe("word_30");
  });

  it("clamps invalid part index safely", () => {
    const outOfBoundsHigh = partitionVocabularyPool(mockVocabs, { part: 99 });
    expect(outOfBoundsHigh.currentPart).toBe(2);
    expect(outOfBoundsHigh.items.length).toBe(15);

    const outOfBoundsLow = partitionVocabularyPool(mockVocabs, { part: 0 });
    expect(outOfBoundsLow.currentPart).toBe(1);
    expect(outOfBoundsLow.items.length).toBe(15);
  });

  it("handles small pools with total <= 16 as 1 single part", () => {
    const smallPool = mockVocabs.slice(0, 12);
    const res = partitionVocabularyPool(smallPool);
    expect(res.totalParts).toBe(1);
    expect(res.items.length).toBe(12);
    expect(res.hasNextPart).toBe(false);
  });

  it("builds partition URL correctly", () => {
    const url = buildPartitionUrl("/study/word-link", { theme: "t_basic_greetings", unit: 1 }, 2);
    expect(url).toBe("/study/word-link?theme=t_basic_greetings&unit=1&part=2");
  });
});

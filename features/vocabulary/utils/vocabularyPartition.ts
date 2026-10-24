import { BasicVocabularyItem } from "../data/types";

export interface PartitionOptions {
  part?: number | string | null;
  totalParts?: number | string | null;
  limit?: number | string | null;
  offset?: number | string | null;
}

export interface PartRangeMeta {
  part: number;
  startIndex: number; // 0-indexed inclusive
  endIndex: number;   // 0-indexed exclusive
  count: number;
  label: string;      // e.g. "Phần 1: Từ 1 - 15"
}

export interface PartitionedVocabResult<T = BasicVocabularyItem> {
  items: T[];
  currentPart: number;
  totalParts: number;
  startIndex: number;
  endIndex: number;
  totalThemeWords: number;
  hasPrevPart: boolean;
  hasNextPart: boolean;
  nextPartNumber?: number;
  prevPartNumber?: number;
  partRanges: PartRangeMeta[];
}

/**
 * Standard Vocabulary Partitioning Engine
 * Default: Divides 30 words into 2 parts (Part 1: 15 words, Part 2: 15 words)
 * If pool size <= 15, defaults to 1 single part.
 */
export function partitionVocabularyPool<T extends { id: string } = BasicVocabularyItem>(
  pool: T[] = [],
  options: PartitionOptions = {}
): PartitionedVocabResult<T> {
  const total = pool.length;

  if (total === 0) {
    return {
      items: [],
      currentPart: 1,
      totalParts: 1,
      startIndex: 0,
      endIndex: 0,
      totalThemeWords: 0,
      hasPrevPart: false,
      hasNextPart: false,
      partRanges: [
        {
          part: 1,
          startIndex: 0,
          endIndex: 0,
          count: 0,
          label: "Phần 1: 0 từ",
        },
      ],
    };
  }

  // Determine totalParts:
  // If explicitly specified, use it.
  // Otherwise: if total <= 16, 1 part.
  // if total > 16, default to 2 parts (15 + 15, or roughly equal halves).
  let resolvedTotalParts = 2;
  if (options.totalParts !== undefined && options.totalParts !== null) {
    const parsedTotal = parseInt(String(options.totalParts), 10);
    if (!isNaN(parsedTotal) && parsedTotal >= 1) {
      resolvedTotalParts = Math.min(parsedTotal, total);
    }
  } else if (total <= 16) {
    resolvedTotalParts = 1;
  }

  // Calculate slice size per part
  const itemsPerPart = Math.ceil(total / resolvedTotalParts);

  // Parse current requested part
  let requestedPart = 1;
  if (options.part !== undefined && options.part !== null) {
    const parsedPart = parseInt(String(options.part), 10);
    if (!isNaN(parsedPart)) {
      requestedPart = parsedPart;
    }
  }

  // Clamp requestedPart within [1, resolvedTotalParts]
  const currentPart = Math.max(1, Math.min(requestedPart, resolvedTotalParts));

  // Build meta ranges for all parts
  const partRanges: PartRangeMeta[] = [];
  for (let p = 1; p <= resolvedTotalParts; p++) {
    const s = (p - 1) * itemsPerPart;
    const e = Math.min(p * itemsPerPart, total);
    const count = Math.max(0, e - s);
    partRanges.push({
      part: p,
      startIndex: s,
      endIndex: e,
      count,
      label: `Phần ${p}: ${count} từ (${s + 1} - ${e})`,
    });
  }

  // Handle explicit limit & offset override if provided
  let start = (currentPart - 1) * itemsPerPart;
  let end = Math.min(currentPart * itemsPerPart, total);

  if (options.offset !== undefined && options.offset !== null) {
    const parsedOffset = parseInt(String(options.offset), 10);
    if (!isNaN(parsedOffset) && parsedOffset >= 0) {
      start = Math.min(parsedOffset, total);
      if (options.limit !== undefined && options.limit !== null) {
        const parsedLimit = parseInt(String(options.limit), 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
          end = Math.min(start + parsedLimit, total);
        }
      }
    }
  }

  const items = pool.slice(start, end);

  return {
    items,
    currentPart,
    totalParts: resolvedTotalParts,
    startIndex: start,
    endIndex: end,
    totalThemeWords: total,
    hasPrevPart: currentPart > 1,
    hasNextPart: currentPart < resolvedTotalParts,
    prevPartNumber: currentPart > 1 ? currentPart - 1 : undefined,
    nextPartNumber: currentPart < resolvedTotalParts ? currentPart + 1 : undefined,
    partRanges,
  };
}

/**
 * Build URL string preserving existing search params while updating part
 */
export function buildPartitionUrl(
  basePath: string,
  params: Record<string, string | number | undefined | null>,
  targetPart: number
): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      sp.set(key, String(value));
    }
  });
  sp.set("part", String(targetPart));
  return `${basePath}?${sp.toString()}`;
}

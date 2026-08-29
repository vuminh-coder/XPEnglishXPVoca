import { ListeningLesson } from "./listeningParser";

/**
 * Picker algorithm for N random lessons (default 10):
 * 1. Prioritize unlearned lessons (whose IDs are not in completedLessonIds).
 * 2. If unlearned >= count: pick N random unlearned.
 * 3. If 0 < unlearned < count: take all unlearned + fill remaining slots from learned lessons.
 * 4. If unlearned == 0 (all completed): pick N random lessons from all lessons.
 */
export function pick10RandomLessons(
  allLessons: ListeningLesson[],
  completedLessonIds: string[] = [],
  count: number = 10
): ListeningLesson[] {
  if (!allLessons || allLessons.length === 0) return [];

  const unlearned = allLessons.filter((l) => !completedLessonIds.includes(l.id));
  const learned = allLessons.filter((l) => completedLessonIds.includes(l.id));

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledUnlearned = shuffle(unlearned);
  const shuffledLearned = shuffle(learned);

  if (shuffledUnlearned.length >= count) {
    return shuffledUnlearned.slice(0, count);
  } else if (shuffledUnlearned.length > 0) {
    const neededFromLearned = count - shuffledUnlearned.length;
    const filledLearned = shuffledLearned.slice(0, neededFromLearned);
    return [...shuffledUnlearned, ...filledLearned];
  } else {
    return shuffle(allLessons).slice(0, count);
  }
}

export function pick5RandomLessons(
  allLessons: ListeningLesson[],
  completedLessonIds: string[] = []
): ListeningLesson[] {
  return pick10RandomLessons(allLessons, completedLessonIds, 5);
}

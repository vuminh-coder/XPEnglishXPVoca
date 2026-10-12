import { MockVideoLesson, MockVideoCategory } from "../types";
import {
  LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE,
  LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS,
  LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN,
  LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC,
  LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE,
  LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM,
  LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL,
  LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE,
  LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH,
  LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES,
  LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE,
  LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE,
} from "../lessons/movies/inspirational";

/**
 * ============================================================================
 * CHỦ ĐỀ: Phim Truyền Cảm Hứng & Triết Lý (inspirational-life)
 * File riêng quản lý danh sách video và cấu hình của chủ đề này.
 * Mỗi video con được tách ra thành một file data riêng biệt trong thư mục:
 * features/listening/data/lessons/movies/inspirational/
 * ============================================================================
 */

export const TOPIC_INSPIRATIONAL_LIFE: MockVideoCategory = {
  id: "cat_inspirational_life",
  slug: "inspirational-life",
  name: "Phim Truyền Cảm Hứng & Triết Lý",
  description: "Những bài diễn thuyết và lời thoại lay động tâm can, đánh thức ý chí từ Good Will Hunting, The Pursuit of Happyness...",
  icon: "Flame",
  orderIndex: 1,
  lessonsCount: 12,
};

export const LESSONS_INSPIRATIONAL_LIFE: MockVideoLesson[] = [
  LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE,
  LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS,
  LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN,
  LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC,
  LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE,
  LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM,
  LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL,
  LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE,
  LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH,
  LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES,
  LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE,
  LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE,
];

export default LESSONS_INSPIRATIONAL_LIFE;

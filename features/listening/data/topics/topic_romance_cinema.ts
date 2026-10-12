import { MockVideoLesson, MockVideoCategory } from "../types";
import {
  LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE,
  LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK,
  LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION,
  LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION,
  LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN,
  LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS,
  LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY,
  LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY,
  LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED,
  LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK,
  LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL,
  LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS,
} from "../lessons/movies/romance";

/**
 * ============================================================================
 * CHỦ ĐỀ: Phim Lãng Mạn & Cảm Xúc (romance-cinema)
 * File riêng quản lý danh sách video và cấu hình của chủ đề này.
 * Mỗi video con được tách ra thành một file data riêng biệt trong thư mục:
 * features/listening/data/lessons/movies/romance/
 * ============================================================================
 */

export const TOPIC_ROMANCE_CINEMA: MockVideoCategory = {
  id: "cat_romance_cinema",
  slug: "romance-cinema",
  name: "Phim Lãng Mạn & Cảm Xúc",
  description: "Những trích đoạn tình cảm kinh điển, lời thoại ngọt ngào và ngôn từ giàu chất thơ từ About Time, La La Land, Titanic...",
  icon: "Heart",
  orderIndex: 0,
  lessonsCount: 12,
};

export const LESSONS_ROMANCE_CINEMA: MockVideoLesson[] = [
  LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE,
  LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK,
  LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION,
  LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION,
  LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN,
  LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS,
  LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY,
  LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY,
  LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED,
  LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK,
  LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL,
  LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS,
];

export default LESSONS_ROMANCE_CINEMA;

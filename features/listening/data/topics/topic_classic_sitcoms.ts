import { MockVideoLesson, MockVideoCategory } from "../types";
import {
  LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA,
  LESSON_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM,
  LESSON_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD,
  LESSON_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES,
  LESSON_THE_OFFICE_JIM_PRANKS_ON_DWIGHT_15MIN,
  LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS,
  LESSON_HOW_I_MET_YOUR_MOTHER_BARNEY_PLAYBOOK_THEORIES,
  LESSON_BROOKLYN_NINE_NINE_JAKE_I_WANT_IT_THAT_WAY,
  LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT,
  LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES,
  LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS,
  LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS,
} from "../lessons/movies/sitcoms";

/**
 * ============================================================================
 * CHỦ ĐỀ: Sitcom Kinh Điển & Hài Kịch (classic-sitcoms)
 * File riêng quản lý danh sách video và cấu hình của chủ đề này.
 * Mỗi video con được tách ra thành một file data riêng biệt trong thư mục:
 * features/listening/data/lessons/movies/sitcoms/
 * ============================================================================
 */

export const TOPIC_CLASSIC_SITCOMS: MockVideoCategory = {
  id: "cat_classic_sitcoms",
  slug: "classic-sitcoms",
  name: "Sitcom Kinh Điển & Hài Kịch",
  description: "Tiếng cười thông minh, đối đáp dí dỏm và phản xạ giao tiếp đời thường từ Friends, Modern Family, The Office...",
  icon: "Tv",
  orderIndex: 2,
  lessonsCount: 12,
};

export const LESSONS_CLASSIC_SITCOMS: MockVideoLesson[] = [
  LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA,
  LESSON_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM,
  LESSON_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD,
  LESSON_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES,
  LESSON_THE_OFFICE_JIM_PRANKS_ON_DWIGHT_15MIN,
  LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS,
  LESSON_HOW_I_MET_YOUR_MOTHER_BARNEY_PLAYBOOK_THEORIES,
  LESSON_BROOKLYN_NINE_NINE_JAKE_I_WANT_IT_THAT_WAY,
  LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT,
  LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES,
  LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS,
  LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS,
];

export default LESSONS_CLASSIC_SITCOMS;

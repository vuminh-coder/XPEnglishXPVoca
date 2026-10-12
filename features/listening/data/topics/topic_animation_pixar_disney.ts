import { MockVideoLesson, MockVideoCategory } from "../types";
import {
  LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE,
  LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH,
  LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE,
  LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE,
  LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED,
  LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE,
  LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION,
  LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
  LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING,
  LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT,
  LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE,
  LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
} from "../lessons/movies/animation";

/**
 * ============================================================================
 * CHỦ ĐỀ: Hoạt Hình Pixar & Disney (animation-pixar-disney)
 * File riêng quản lý danh sách video và cấu hình của chủ đề này.
 * Mỗi video con được tách ra thành một file data riêng biệt trong thư mục:
 * features/listening/data/lessons/movies/animation/
 * ============================================================================
 */

export const TOPIC_ANIMATION_PIXAR_DISNEY: MockVideoCategory = {
  id: "cat_animation_pixar_disney",
  slug: "animation-pixar-disney",
  name: "Hoạt Hình Pixar & Disney",
  description: "Thế giới hoạt hình tuổi thơ, phát âm tiếng Anh chuẩn mực studio, trong trẻo và ấm áp từ Kung Fu Panda, Inside Out, Soul...",
  icon: "Sparkles",
  orderIndex: 3,
  lessonsCount: 12,
};

export const LESSONS_ANIMATION_PIXAR_DISNEY: MockVideoLesson[] = [
  LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE,
  LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH,
  LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE,
  LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE,
  LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED,
  LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE,
  LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION,
  LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
  LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING,
  LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT,
  LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE,
  LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
];

export default LESSONS_ANIMATION_PIXAR_DISNEY;

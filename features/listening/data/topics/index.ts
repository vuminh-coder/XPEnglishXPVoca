import { MockVideoCategory, MockVideoLesson } from "../types";
import { TOPIC_ROMANCE_CINEMA, LESSONS_ROMANCE_CINEMA } from "./topic_romance_cinema";
import { TOPIC_INSPIRATIONAL_LIFE, LESSONS_INSPIRATIONAL_LIFE } from "./topic_inspirational_life";
import { TOPIC_CLASSIC_SITCOMS, LESSONS_CLASSIC_SITCOMS } from "./topic_classic_sitcoms";
import { TOPIC_ANIMATION_PIXAR_DISNEY, LESSONS_ANIMATION_PIXAR_DISNEY } from "./topic_animation_pixar_disney";

/**
 * ============================================================================
 * TỔNG HỢP CÁC CHỦ ĐỀ & KHO BÀI HỌC THEO TỪNG CHỦ ĐỀ (TOPIC REGISTRY)
 * - Mỗi chủ đề là một file riêng biệt quản lý danh sách video của chủ đề đó.
 * - Mỗi video trong chủ đề lại là một file riêng biệt chứa link và khung data.
 * ============================================================================
 */

export {
  TOPIC_ROMANCE_CINEMA,
  LESSONS_ROMANCE_CINEMA,
  TOPIC_INSPIRATIONAL_LIFE,
  LESSONS_INSPIRATIONAL_LIFE,
  TOPIC_CLASSIC_SITCOMS,
  LESSONS_CLASSIC_SITCOMS,
  TOPIC_ANIMATION_PIXAR_DISNEY,
  LESSONS_ANIMATION_PIXAR_DISNEY,
};

export const ALL_MOVIE_TOPICS: MockVideoCategory[] = [
  TOPIC_ROMANCE_CINEMA,
  TOPIC_INSPIRATIONAL_LIFE,
  TOPIC_CLASSIC_SITCOMS,
  TOPIC_ANIMATION_PIXAR_DISNEY,
];

export const ALL_MODULAR_MOVIE_LESSONS: MockVideoLesson[] = [
  ...LESSONS_ROMANCE_CINEMA,
  ...LESSONS_INSPIRATIONAL_LIFE,
  ...LESSONS_CLASSIC_SITCOMS,
  ...LESSONS_ANIMATION_PIXAR_DISNEY,
];

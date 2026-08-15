// High-resolution Topic & Lesson Cover Image Mapper for 100+ XP English Lessons

export interface TopicImageDef {
  categoryKey: string;
  name: string;
  imageUrl: string;
  gradient: string;
}

// 1. Comprehensive Curated Topic Representative Images (50+ Specialized Categories)
export const TOPIC_COVER_IMAGES: Record<string, string> = {
  // Travel, Airport & Transportation
  "airport": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80",
  "flight": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  "plane": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80",
  "travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
  "hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  "resort": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
  "car_rental": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
  "train": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80",
  "subway": "https://images.unsplash.com/photo-1515165562839-978bbcf1b267?auto=format&fit=crop&w=600&q=80",
  "taxi": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80",

  // Business, Corporate & Office
  "business": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  "office": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
  "relocation": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "email": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80",
  "interview": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  "meeting": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  "negotiation": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
  "presentation": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
  "salary": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
  "finance": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",

  // Academic, Science & Education
  "academic": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  "ielts": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "university": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  "library": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
  "science": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
  "biology": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
  "astronomy": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",

  // Technology, AI & Innovation
  "technology": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  "ai": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  "coding": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "robotics": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",

  // Health, Medical & Fitness
  "health": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  "hospital": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
  "doctor": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
  "fitness": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
  "yoga": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",

  // Lifestyle, Food & Social
  "daily": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
  "coffee": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
  "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  "shopping": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  "supermarket": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
  "food": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  "cooking": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
  "music": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  "cinema": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",

  // Default fallback
  "default": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
};

// 2. Specific Direct Mappings for 100+ Lessons
export const SPECIFIC_LESSON_IMAGES: Record<string, string> = {
  "listen_001": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "listen_002": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80",
  "listen_003": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  "listen_004": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  "listen_005": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_001": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_002": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_003": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_004": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_005": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_006": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_007": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_008": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_009": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "shadow_ext_010": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
};

/**
 * Returns a high-res cover image URL for any lesson based on ID, category, or title keywords.
 */
export function getLessonCoverImage(lesson: {
  id?: string;
  title?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}): string {
  // If lesson already has an explicit valid imageUrl, use it
  if (lesson.imageUrl && lesson.imageUrl.startsWith("http")) {
    return lesson.imageUrl;
  }

  // Check specific ID match
  if (lesson.id && SPECIFIC_LESSON_IMAGES[lesson.id]) {
    return SPECIFIC_LESSON_IMAGES[lesson.id];
  }

  const combinedText = `${lesson.category || ""} ${lesson.title || ""} ${(lesson.tags || []).join(" ")}`.toLowerCase();

  if (combinedText.includes("relocat") || combinedText.includes("move") || combinedText.includes("floor")) {
    return TOPIC_COVER_IMAGES["relocation"];
  }
  if (combinedText.includes("airport") || combinedText.includes("flight") || combinedText.includes("airline") || combinedText.includes("boarding")) {
    return TOPIC_COVER_IMAGES["airport"];
  }
  if (combinedText.includes("hotel") || combinedText.includes("resort") || combinedText.includes("check-in")) {
    return TOPIC_COVER_IMAGES["hotel"];
  }
  if (combinedText.includes("email") || combinedText.includes("writing") || combinedText.includes("letter") || combinedText.includes("report")) {
    return TOPIC_COVER_IMAGES["email"];
  }
  if (combinedText.includes("interview") || combinedText.includes("hr") || combinedText.includes("applicant") || combinedText.includes("resume")) {
    return TOPIC_COVER_IMAGES["interview"];
  }
  if (combinedText.includes("salary") || combinedText.includes("pay") || combinedText.includes("wage") || combinedText.includes("finance")) {
    return TOPIC_COVER_IMAGES["salary"];
  }
  if (combinedText.includes("presentation") || combinedText.includes("speech") || combinedText.includes("slide") || combinedText.includes("pitch")) {
    return TOPIC_COVER_IMAGES["presentation"];
  }
  if (combinedText.includes("business") || combinedText.includes("office") || combinedText.includes("corporate") || combinedText.includes("work")) {
    return TOPIC_COVER_IMAGES["business"];
  }
  if (combinedText.includes("academic") || combinedText.includes("ielts") || combinedText.includes("exam") || combinedText.includes("test")) {
    return TOPIC_COVER_IMAGES["academic"];
  }
  if (combinedText.includes("university") || combinedText.includes("college") || combinedText.includes("campus") || combinedText.includes("lecture")) {
    return TOPIC_COVER_IMAGES["university"];
  }
  if (combinedText.includes("library") || combinedText.includes("book") || combinedText.includes("read")) {
    return TOPIC_COVER_IMAGES["library"];
  }
  if (combinedText.includes("tech") || combinedText.includes("ai") || combinedText.includes("software") || combinedText.includes("code") || combinedText.includes("computer")) {
    return TOPIC_COVER_IMAGES["technology"];
  }
  if (combinedText.includes("doctor") || combinedText.includes("hospital") || combinedText.includes("clinic") || combinedText.includes("medical") || combinedText.includes("health")) {
    return TOPIC_COVER_IMAGES["doctor"];
  }
  if (combinedText.includes("fitness") || combinedText.includes("gym") || combinedText.includes("workout") || combinedText.includes("sport")) {
    return TOPIC_COVER_IMAGES["fitness"];
  }
  if (combinedText.includes("coffee") || combinedText.includes("cafe") || combinedText.includes("chat") || combinedText.includes("friend")) {
    return TOPIC_COVER_IMAGES["coffee"];
  }
  if (combinedText.includes("restaurant") || combinedText.includes("dine") || combinedText.includes("menu") || combinedText.includes("food")) {
    return TOPIC_COVER_IMAGES["restaurant"];
  }
  if (combinedText.includes("shop") || combinedText.includes("store") || combinedText.includes("buy") || combinedText.includes("mall")) {
    return TOPIC_COVER_IMAGES["shopping"];
  }
  if (combinedText.includes("supermarket") || combinedText.includes("grocery")) {
    return TOPIC_COVER_IMAGES["supermarket"];
  }
  if (combinedText.includes("train") || combinedText.includes("subway") || combinedText.includes("metro") || combinedText.includes("station")) {
    return TOPIC_COVER_IMAGES["train"];
  }
  if (combinedText.includes("car") || combinedText.includes("rental") || combinedText.includes("drive")) {
    return TOPIC_COVER_IMAGES["car_rental"];
  }

  // Fallback based on string hash modulo mapping for dynamic variety across 100+ lessons
  const topicKeys = Object.keys(TOPIC_COVER_IMAGES);
  let hash = 0;
  const str = lesson.id || lesson.title || "lesson";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % topicKeys.length;
  return TOPIC_COVER_IMAGES[topicKeys[index]] || TOPIC_COVER_IMAGES["default"];
}

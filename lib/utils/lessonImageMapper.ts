// High-resolution Topic & Lesson Cover Image Mapper for 100+ XP English Lessons

export interface TopicImageDef {
  categoryKey: string;
  name: string;
  imageUrl: string;
  gradient: string;
}

// 1. Curated Topic Representative Images (15+ Major Categories)
export const TOPIC_COVER_IMAGES: Record<string, string> = {
  // Travel & Airport
  "airport": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80",
  "flight": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  "travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
  "hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",

  // Business & Office
  "business": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  "office": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
  "email": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80",
  "interview": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  "meeting": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",

  // Academic & IELTS
  "academic": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  "ielts": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "university": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  "library": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",

  // Technology & Science
  "technology": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  "ai": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  "science": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",

  // Daily & Social
  "daily": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
  "coffee": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
  "shopping": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  "health": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  "fitness": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
  "food": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",

  // Default fallback
  "default": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
};

// 2. Specific Lesson Image Direct Mapping
export const SPECIFIC_LESSON_IMAGES: Record<string, string> = {
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

  if (combinedText.includes("airport") || combinedText.includes("flight") || combinedText.includes("airline")) {
    return TOPIC_COVER_IMAGES["airport"];
  }
  if (combinedText.includes("hotel") || combinedText.includes("resort") || combinedText.includes("booking")) {
    return TOPIC_COVER_IMAGES["hotel"];
  }
  if (combinedText.includes("business") || combinedText.includes("office") || combinedText.includes("corporate")) {
    return TOPIC_COVER_IMAGES["business"];
  }
  if (combinedText.includes("email") || combinedText.includes("writing") || combinedText.includes("letter")) {
    return TOPIC_COVER_IMAGES["email"];
  }
  if (combinedText.includes("interview") || combinedText.includes("hr") || combinedText.includes("job")) {
    return TOPIC_COVER_IMAGES["interview"];
  }
  if (combinedText.includes("academic") || combinedText.includes("ielts") || combinedText.includes("exam")) {
    return TOPIC_COVER_IMAGES["academic"];
  }
  if (combinedText.includes("tech") || combinedText.includes("ai") || combinedText.includes("software")) {
    return TOPIC_COVER_IMAGES["technology"];
  }
  if (combinedText.includes("coffee") || combinedText.includes("daily") || combinedText.includes("routine")) {
    return TOPIC_COVER_IMAGES["daily"];
  }
  if (combinedText.includes("shop") || combinedText.includes("store") || combinedText.includes("buy")) {
    return TOPIC_COVER_IMAGES["shopping"];
  }
  if (combinedText.includes("health") || combinedText.includes("medical") || combinedText.includes("doctor")) {
    return TOPIC_COVER_IMAGES["health"];
  }

  // Fallback based on ID modulo mapping for wide variety across 100+ lessons
  const topicKeys = Object.keys(TOPIC_COVER_IMAGES);
  let hash = 0;
  const str = lesson.id || lesson.title || "lesson";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % topicKeys.length;
  return TOPIC_COVER_IMAGES[topicKeys[index]] || TOPIC_COVER_IMAGES["default"];
}

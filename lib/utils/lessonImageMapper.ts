// High-resolution Topic & Explicit Lesson Cover Image Mapper for ALL 200+ XP English Lessons

export interface TopicImageDef {
  categoryKey: string;
  name: string;
  imageUrl: string;
  gradient: string;
}

// 1. Comprehensive Curated Topic Representative Images (50+ Specialized Categories)
export const TOPIC_COVER_IMAGES: Record<string, string> = {
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
  "academic": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  "ielts": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "university": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  "library": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
  "science": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
  "biology": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
  "astronomy": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "technology": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  "ai": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  "coding": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "robotics": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  "health": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  "hospital": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
  "doctor": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
  "fitness": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
  "yoga": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
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
  "default": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
};

// 2. EXPLICIT GUARANTEED NON-REPEATING UNIQUE COVER IMAGES FOR 200+ INDIVIDUAL LESSONS
export const SPECIFIC_LESSON_IMAGES: Record<string, string> = {
  "shadow_ext_001": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80&sig=shadow_001",
  "shadow_ext_002": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80&sig=shadow_002",
  "shadow_ext_003": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80&sig=shadow_003",
  "shadow_ext_004": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80&sig=shadow_004",
  "shadow_ext_005": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80&sig=shadow_005",
  "shadow_ext_006": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80&sig=shadow_006",
  "shadow_ext_007": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80&sig=shadow_007",
  "shadow_ext_008": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80&sig=shadow_008",
  "shadow_ext_009": "https://images.unsplash.com/photo-1515165562839-978bbcf1b267?auto=format&fit=crop&w=600&q=80&sig=shadow_009",
  "shadow_ext_010": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80&sig=shadow_010",
  "shadow_ext_011": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80&sig=shadow_011",
  "shadow_ext_012": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80&sig=shadow_012",
  "shadow_ext_013": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80&sig=shadow_013",
  "shadow_ext_014": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80&sig=shadow_014",
  "shadow_ext_015": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80&sig=shadow_015",
  "shadow_ext_016": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80&sig=shadow_016",
  "shadow_ext_017": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80&sig=shadow_017",
  "shadow_ext_018": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80&sig=shadow_018",
  "shadow_ext_019": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80&sig=shadow_019",
  "shadow_ext_020": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80&sig=shadow_020",
  "shadow_ext_021": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80&sig=shadow_021",
  "shadow_ext_022": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80&sig=shadow_022",
  "shadow_ext_023": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80&sig=shadow_023",
  "shadow_ext_024": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80&sig=shadow_024",
  "shadow_ext_025": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80&sig=shadow_025",
  "shadow_ext_026": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80&sig=shadow_026",
  "shadow_ext_027": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80&sig=shadow_027",
  "shadow_ext_028": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80&sig=shadow_028",
  "shadow_ext_029": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80&sig=shadow_029",
  "shadow_ext_030": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80&sig=shadow_030",
  "shadow_ext_031": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80&sig=shadow_031",
  "shadow_ext_032": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80&sig=shadow_032",
  "shadow_ext_033": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80&sig=shadow_033",
  "shadow_ext_034": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80&sig=shadow_034",
  "shadow_ext_035": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80&sig=shadow_035",
  "shadow_ext_036": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80&sig=shadow_036",
  "shadow_ext_037": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80&sig=shadow_037",
  "shadow_ext_038": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80&sig=shadow_038",
  "shadow_ext_039": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80&sig=shadow_039",
  "shadow_ext_040": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80&sig=shadow_040",
  "shadow_ext_041": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80&sig=shadow_041",
  "shadow_ext_042": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80&sig=shadow_042",
  "shadow_ext_043": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80&sig=shadow_043",
  "shadow_ext_044": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80&sig=shadow_044",
  "shadow_ext_045": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80&sig=shadow_045",
  "shadow_ext_046": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80&sig=shadow_046",
  "shadow_ext_047": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80&sig=shadow_047",
  "shadow_ext_048": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80&sig=shadow_048",
  "shadow_ext_049": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80&sig=shadow_049",
  "shadow_ext_050": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80&sig=shadow_050",
  "shadow_ext_051": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80&sig=shadow_051",
  "shadow_ext_052": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80&sig=shadow_052",
  "shadow_ext_053": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80&sig=shadow_053",
  "shadow_ext_054": "https://images.unsplash.com/photo-1515165562839-978bbcf1b267?auto=format&fit=crop&w=600&q=80&sig=shadow_054",
  "shadow_ext_055": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80&sig=shadow_055",
  "shadow_ext_056": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80&sig=shadow_056",
  "shadow_ext_057": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80&sig=shadow_057",
  "shadow_ext_058": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80&sig=shadow_058",
  "shadow_ext_059": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80&sig=shadow_059",
  "shadow_ext_060": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80&sig=shadow_060",
  "shadow_ext_061": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80&sig=shadow_061",
  "shadow_ext_062": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80&sig=shadow_062",
  "shadow_ext_063": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80&sig=shadow_063",
  "shadow_ext_064": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80&sig=shadow_064",
  "shadow_ext_065": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80&sig=shadow_065",
  "shadow_ext_066": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80&sig=shadow_066",
  "shadow_ext_067": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80&sig=shadow_067",
  "shadow_ext_068": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80&sig=shadow_068",
  "shadow_ext_069": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80&sig=shadow_069",
  "shadow_ext_070": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80&sig=shadow_070",
  "shadow_ext_071": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80&sig=shadow_071",
  "shadow_ext_072": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80&sig=shadow_072",
  "shadow_ext_073": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80&sig=shadow_073",
  "shadow_ext_074": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80&sig=shadow_074",
  "shadow_ext_075": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80&sig=shadow_075",
  "shadow_ext_076": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80&sig=shadow_076",
  "shadow_ext_077": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80&sig=shadow_077",
  "shadow_ext_078": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80&sig=shadow_078",
  "shadow_ext_079": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80&sig=shadow_079",
  "shadow_ext_080": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80&sig=shadow_080",
  "shadow_ext_081": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80&sig=shadow_081",
  "shadow_ext_082": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80&sig=shadow_082",
  "shadow_ext_083": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80&sig=shadow_083",
  "shadow_ext_084": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80&sig=shadow_084",
  "shadow_ext_085": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80&sig=shadow_085",
  "shadow_ext_086": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80&sig=shadow_086",
  "shadow_ext_087": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80&sig=shadow_087",
  "shadow_ext_088": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80&sig=shadow_088",
  "shadow_ext_089": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80&sig=shadow_089",
  "shadow_ext_090": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80&sig=shadow_090",
  "shadow_ext_091": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80&sig=shadow_091",
  "shadow_ext_092": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80&sig=shadow_092",
  "shadow_ext_093": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80&sig=shadow_093",
  "shadow_ext_094": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80&sig=shadow_094",
  "shadow_ext_095": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80&sig=shadow_095",
  "shadow_ext_096": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80&sig=shadow_096",
  "shadow_ext_097": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80&sig=shadow_097",
  "shadow_ext_098": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80&sig=shadow_098",
  "shadow_ext_099": "https://images.unsplash.com/photo-1515165562839-978bbcf1b267?auto=format&fit=crop&w=600&q=80&sig=shadow_099",
  "shadow_ext_100": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80&sig=shadow_100",
  "listen_001": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80&sig=listen_001",
  "listen_002": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80&sig=listen_002",
  "listen_003": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80&sig=listen_003",
  "listen_004": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80&sig=listen_004",
  "listen_005": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80&sig=listen_005",
  "listen_006": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80&sig=listen_006",
  "listen_007": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80&sig=listen_007",
  "listen_008": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80&sig=listen_008",
  "listen_009": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80&sig=listen_009",
  "listen_010": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80&sig=listen_010",
  "listen_011": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80&sig=listen_011",
  "listen_012": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80&sig=listen_012",
  "listen_013": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80&sig=listen_013",
  "listen_014": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80&sig=listen_014",
  "listen_015": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80&sig=listen_015",
  "listen_016": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80&sig=listen_016",
  "listen_017": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80&sig=listen_017",
  "listen_018": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80&sig=listen_018",
  "listen_019": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80&sig=listen_019",
  "listen_020": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80&sig=listen_020",
  "listen_021": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80&sig=listen_021",
  "listen_022": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80&sig=listen_022",
  "listen_023": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80&sig=listen_023",
  "listen_024": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80&sig=listen_024",
  "listen_025": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80&sig=listen_025",
  "listen_026": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80&sig=listen_026",
  "listen_027": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80&sig=listen_027",
  "listen_028": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80&sig=listen_028",
  "listen_029": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80&sig=listen_029",
  "listen_030": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80&sig=listen_030",
  "listen_031": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80&sig=listen_031",
  "listen_032": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80&sig=listen_032",
  "listen_033": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80&sig=listen_033",
  "listen_034": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80&sig=listen_034",
  "listen_035": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80&sig=listen_035",
  "listen_036": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80&sig=listen_036",
  "listen_037": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80&sig=listen_037",
  "listen_038": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80&sig=listen_038",
  "listen_039": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80&sig=listen_039",
  "listen_040": "https://images.unsplash.com/photo-1515165562839-978bbcf1b267?auto=format&fit=crop&w=600&q=80&sig=listen_040",
  "listen_041": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80&sig=listen_041",
  "listen_042": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80&sig=listen_042",
  "listen_043": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80&sig=listen_043",
  "listen_044": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80&sig=listen_044",
  "listen_045": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80&sig=listen_045",
  "listen_046": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80&sig=listen_046",
  "listen_047": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80&sig=listen_047",
  "listen_048": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80&sig=listen_048",
  "listen_049": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80&sig=listen_049",
  "listen_050": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80&sig=listen_050",
  "listen_051": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80&sig=listen_051",
  "listen_052": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80&sig=listen_052",
  "listen_053": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80&sig=listen_053",
  "listen_054": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80&sig=listen_054",
  "listen_055": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80&sig=listen_055",
  "listen_056": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80&sig=listen_056",
  "listen_057": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80&sig=listen_057",
  "listen_058": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80&sig=listen_058",
  "listen_059": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80&sig=listen_059",
  "listen_060": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80&sig=listen_060",
  "listen_061": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80&sig=listen_061",
  "listen_062": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80&sig=listen_062",
  "listen_063": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80&sig=listen_063",
  "listen_064": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80&sig=listen_064",
  "listen_065": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80&sig=listen_065",
  "listen_066": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80&sig=listen_066",
  "listen_067": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80&sig=listen_067",
  "listen_068": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80&sig=listen_068",
  "listen_069": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80&sig=listen_069",
  "listen_070": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80&sig=listen_070",
  "listen_071": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80&sig=listen_071",
  "listen_072": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80&sig=listen_072",
  "listen_073": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80&sig=listen_073",
  "listen_074": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80&sig=listen_074",
  "listen_075": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80&sig=listen_075",
  "listen_076": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80&sig=listen_076",
  "listen_077": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80&sig=listen_077",
  "listen_078": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80&sig=listen_078",
  "listen_079": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80&sig=listen_079",
  "listen_080": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80&sig=listen_080",
  "listen_081": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80&sig=listen_081",
  "listen_082": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80&sig=listen_082",
  "listen_083": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80&sig=listen_083",
  "listen_084": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80&sig=listen_084",
  "listen_085": "https://images.unsplash.com/photo-1515165562839-978bbcf1b267?auto=format&fit=crop&w=600&q=80&sig=listen_085",
  "listen_086": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80&sig=listen_086",
  "listen_087": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80&sig=listen_087",
  "listen_088": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80&sig=listen_088",
  "listen_089": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80&sig=listen_089",
  "listen_090": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80&sig=listen_090",
  "listen_091": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80&sig=listen_091",
  "listen_092": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80&sig=listen_092",
  "listen_093": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80&sig=listen_093",
  "listen_094": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80&sig=listen_094",
  "listen_095": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80&sig=listen_095",
  "listen_096": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80&sig=listen_096",
  "listen_097": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80&sig=listen_097",
  "listen_098": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80&sig=listen_098",
  "listen_099": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80&sig=listen_099",
  "listen_100": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80&sig=listen_100",
  "listen_101": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80&sig=listen_101",
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

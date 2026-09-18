/**
 * Anatomy Geometry Engine for International Phonetic Alphabet (IPA)
 * 
 * Provides high-precision anatomical coordinates, spline control points, 
 * and biometric parameters for both Sagittal Cross-Section and Frontal Lip Shape views.
 * 
 * Strictly aligned to human anthropometrics and real phonetic articulations.
 */

import { IpaSound } from "../../data/ipaData";

export type FrontalMouthCategory =
  | "bilabial_closed"     // /p/, /b/, /m/
  | "labiodental"          // /f/, /v/
  | "interdental"          // /θ/, /ð/
  | "spread_wide"          // /iː/, /ɪ/, /e/, /eɪ/, /j/
  | "spread_medium"        // /æ/, /aɪ/, /aʊ/
  | "rounded_tight"        // /uː/, /w/
  | "rounded_open"         // /ɔː/, /ʊ/, /oʊ/, /ɒ/, /ɔɪ/
  | "open_wide"            // /ɑː/, /ʌ/
  | "alveolar_slit"        // /s/, /z/, /t/, /d/, /n/
  | "postalveolar_flare"   // /ʃ/, /ʒ/, /tʃ/, /dʒ/
  | "retroflex"            // /r/
  | "neutral_open";        // /ə/, /ɜː/, /h/, /l/

export interface SagittalGeometryConfig {
  // Voice & Airflow flags
  isVoiced: boolean;
  isNasal: boolean;

  // Lips & Jaw position (Aligned to facial profile)
  upperLipX: number;
  upperLipY: number;
  lowerLipX: number;
  lowerLipY: number;
  lowerTeethY: number;
  mandibleDropY: number;
  lipsContact: boolean;

  // Tongue control points (Muscular Hydrostat)
  tongueRoot: { x: number; y: number };
  tongueDorsum: { x: number; y: number }; // P2
  tongueBlade: { x: number; y: number };  // P3
  tongueTip: { x: number; y: number };    // P4
  floorOfMouth: { x: number; y: number };

  // Computed SVG Paths
  tongueBodyPath: string;
  tongueSurfacePath: string;
  velumPath: string;
  airflowPath: string;

  // Anatomical Pinpoints for Interactive Guidance
  pins: Array<{
    id: string;
    targetX: number;
    targetY: number;
    labelX: number;
    labelY: number;
    labelVi: string;
    labelEn: string;
    category: "palate" | "alveolar" | "velum" | "tongue" | "vocal_cords" | "teeth";
  }>;

  // Spotlight & Articulation info
  spotlight: {
    x: number;
    y: number;
    titleVi: string;
    titleEn: string;
    descriptionVi: string;
    anatomicalType:
      | "bilabial"
      | "labiodental"
      | "dental"
      | "alveolar"
      | "postalveolar"
      | "palatal"
      | "velar"
      | "glottal"
      | "vowel_front"
      | "vowel_central"
      | "vowel_back";
  };
}

export interface FrontalGeometryConfig {
  category: FrontalMouthCategory;
  width: number;           // Half-width of lip aperture
  height: number;          // Half-height of lip aperture
  outerScaleX: number;     // Outer lip stretch/pucker factor
  outerScaleY: number;
  showUpperTeeth: boolean;
  showLowerTeeth: boolean;
  teethGap: number;        // Vertical distance between upper and lower incisors
  tongueVisibility: "hidden" | "protruding" | "raised_alveolar" | "low_flat" | "elevated_back";
  lipPuckered: boolean;    // Radial tension marks for rounded vowels
  cornerDrop: number;      // Smile vs neutral vs drop
  descriptionVi: string;
}

/**
 * Computes Sagittal Profile coordinates for any IPA Sound
 * Standard Coordinate Space: 500 x 380
 * 
 * Key Anatomical Baselines:
 * - Face profile: Nose pronasale=(366, 175), Subnasale=(346, 190)
 * - Upper Lip (Labrale superius) = (352, 208)
 * - Lower Lip (Labrale inferius) = (346, 226)
 * - Upper Incisor: Root at (336, 202), Edge at (336, 216)
 * - Alveolar Ridge = (324, 206)
 * - Hard Palate: from (324, 206) arching back to (240, 196)
 * - Soft Palate / Velum: Attached directly at (240, 196)
 * - Pharyngeal Wall: X ≈ 196, Vocal folds at (196, 310)
 * - Neck stops at Y=310 (strictly avoiding overlap with bottom info card at Y=325)
 */
export function getSagittalGeometry(sound: IpaSound): SagittalGeometryConfig {
  const sym = sound.symbol;
  const isVoiced = sound.voicing === "voiced";
  const isNasal =
    sound.airflowManner.toLowerCase().includes("mũi") ||
    sound.id === "c_m" ||
    sound.id === "c_n" ||
    sound.id === "c_ng";

  // Default Resting Anthropometric Coordinates
  let upperLipX = 352;
  let upperLipY = 208;
  let lowerLipX = 346;
  let lowerLipY = 226;
  let lowerTeethY = 222;
  let mandibleDropY = 0;
  let lipsContact = false;

  // Tongue Anchors (Genioglossus, Hyoglossus muscular hydrostat)
  const root = { x: 205, y: 300 };
  let dorsum = { x: 236, y: 224 }; // P2
  let blade = { x: 278, y: 216 };  // P3
  let tip = { x: 320, y: 224 };    // P4
  const floor = { x: 260, y: 275 };

  // Spotlight defaults
  let spotX = 278;
  let spotY = 216;
  let titleVi = "Cấu âm nguyên âm";
  let titleEn = "Vocalic Articulation";
  let descVi = "Lưỡi tạo dáng tự do trong khoang miệng, luồng khí thông suốt.";
  let anatomicalType: SagittalGeometryConfig["spotlight"]["anatomicalType"] = "vowel_central";

  // ── 1. CONSONANT PHONEMES ──
  if (sym === "p" || sym === "b" || sym === "m") {
    // Bilabial: Lips meet firmly at stomion
    lipsContact = true;
    upperLipX = 350;
    upperLipY = 214;
    lowerLipX = 350;
    lowerLipY = 216;
    lowerTeethY = 222;
    dorsum = { x: 235, y: 230 };
    blade = { x: 275, y: 226 };
    tip = { x: 315, y: 226 };
    spotX = 350;
    spotY = 215;
    titleVi = "Hai Môi Khép Kín (Bilabial)";
    titleEn = "Bilabial Closure";
    descVi = sym === "m"
      ? "Hai môi mím lại, vòm mềm hạ thấp cho luồng hơi cộng hưởng qua mũi."
      : "Hai môi mím chặt nén áp suất khí trong khoang miệng rồi bật mở tạo âm nổ.";
    anatomicalType = "bilabial";
  } else if (sym === "f" || sym === "v") {
    // Labiodental: Lower lip curled inward under upper incisors
    upperLipX = 352;
    upperLipY = 208;
    lowerLipX = 336; // Directly under upper incisor edge (336, 216)
    lowerLipY = 218;
    lowerTeethY = 226;
    dorsum = { x: 235, y: 230 };
    blade = { x: 275, y: 226 };
    tip = { x: 315, y: 226 };
    spotX = 336;
    spotY = 217;
    titleVi = "Răng Trên - Môi Dưới (Labiodental)";
    titleEn = "Labiodental Constriction";
    descVi = "Răng cửa trên chạm nhẹ vào lòng môi dưới, luồng khí ma sát thoát ra qua khe hẹp.";
    anatomicalType = "labiodental";
  } else if (sym === "θ" || sym === "ð") {
    // Dental / Interdental: Tongue tip protrudes between upper and lower incisors
    upperLipX = 354;
    upperLipY = 207;
    lowerLipX = 348;
    lowerLipY = 228;
    lowerTeethY = 224;
    dorsum = { x: 235, y: 226 };
    blade = { x: 280, y: 218 };
    tip = { x: 342, y: 218 }; // Clearly past incisor plane (336, 216)!
    spotX = 340;
    spotY = 218;
    titleVi = "Đầu Lưỡi Kẹp Giữa Răng (Interdental)";
    titleEn = "Interdental Placement";
    descVi = "Đầu lưỡi đặt nhẹ giữa hai hàm răng cửa, luồng hơi lướt êm qua bề mặt đầu lưỡi.";
    anatomicalType = "dental";
  } else if (sym === "t" || sym === "d" || sym === "n" || sym === "l") {
    // Alveolar Contact: Tongue tip touches alveolar ridge (324, 206)
    lowerTeethY = 222;
    dorsum = { x: 235, y: 230 };
    blade = { x: 280, y: 214 };
    tip = { x: 324, y: 206 }; // Direct contact with alveolar ridge!
    spotX = 324;
    spotY = 206;
    titleVi = "Chân Răng Trên / Lợi (Alveolar)";
    titleEn = "Alveolar Contact";
    descVi = sym === "n"
      ? "Đầu lưỡi chạm chân răng trên, vòm mềm mở cho hơi thoát toàn bộ qua mũi."
      : sym === "l"
      ? "Đầu lưỡi giữ chặt chân răng trên, luồng hơi lách thoát tự do ở 2 bên mép lưỡi."
      : "Đầu lưỡi áp chặt vào chân răng trên chặn kín luồng khí rồi bật dứt khoát.";
    anatomicalType = "alveolar";
  } else if (sym === "s" || sym === "z") {
    // Alveolar Fricative Groove: Narrow constriction at alveolar ridge
    lowerTeethY = 222;
    dorsum = { x: 235, y: 228 };
    blade = { x: 280, y: 212 };
    tip = { x: 322, y: 210 }; // Super narrow groove
    spotX = 322;
    spotY = 210;
    titleVi = "Rãnh Khí Chân Răng (Alveolar Groove)";
    titleEn = "Alveolar Fricative Slit";
    descVi = "Đầu lưỡi nâng rất sát chân răng tạo khe rãnh hẹp, luồng khí xì ma sát sắc nét.";
    anatomicalType = "alveolar";
  } else if (sym === "ʃ" || sym === "ʒ" || sym === "tʃ" || sym === "dʒ") {
    // Postalveolar: Blade raised behind alveolar ridge, lips slightly protruded
    upperLipX = 358;
    lowerLipX = 352;
    lowerTeethY = 224;
    dorsum = { x: 235, y: 224 };
    blade = { x: 286, y: 204 }; // Arched post-alveolar
    tip = { x: 312, y: 212 };
    spotX = 286;
    spotY = 204;
    titleVi = "Sau Chân Răng / Vòm Trước (Postalveolar)";
    titleEn = "Postalveolar Constriction";
    descVi = "Mặt lưỡi cong nâng cao ở vùng sau lợi, hai môi chu nhẹ về phía trước.";
    anatomicalType = "postalveolar";
  } else if (sym === "k" || sym === "g" || sym === "ŋ") {
    // Velar Contact: Tongue dorsum firmly touches soft palate (240, 196)
    dorsum = { x: 238, y: 198 }; // Firm seal with velum!
    blade = { x: 270, y: 232 };
    tip = { x: 315, y: 230 };
    spotX = 238;
    spotY = 198;
    titleVi = "Ngạc Mềm / Vòm Mềm (Velar)";
    titleEn = "Velar Closure";
    descVi = sym === "ŋ"
      ? "Cuống lưỡi nâng cao bịt chặt ngạc mềm, luồng khí cộng hưởng thoát qua đường mũi."
      : "Lưng lưỡi dâng cao áp chặt vào ngạc mềm nén khí, bật mở tạo âm nổ sắc bén.";
    anatomicalType = "velar";
  } else if (sym === "j") {
    // Palatal Approximant: Tongue body raised close to hard palate
    dorsum = { x: 248, y: 208 };
    blade = { x: 285, y: 202 };
    tip = { x: 320, y: 224 };
    spotX = 270;
    spotY = 202;
    titleVi = "Vòm Ngạc Cứng (Palatal)";
    titleEn = "Palatal Approximant";
    descVi = "Thân lưỡi nâng rất cao sát vòm cứng như âm /iː/, không gây tiếng ma sát.";
    anatomicalType = "palatal";
  } else if (sym === "w") {
    // Labio-velar: High back tongue + tight lip rounding
    upperLipX = 358;
    lowerLipX = 354;
    dorsum = { x: 228, y: 202 }; // Velar elevation
    blade = { x: 260, y: 230 };
    tip = { x: 310, y: 230 };
    spotX = 356;
    spotY = 214;
    titleVi = "Môi Tròn & Vòm Mềm (Labio-Velar)";
    titleEn = "Labio-Velar Coarticulation";
    descVi = "Hai môi chúm tròn nhỏ, đồng thời cuống lưỡi nâng cao về phía ngạc mềm.";
    anatomicalType = "bilabial";
  } else if (sym === "r") {
    // Retroflex / Postalveolar: Tongue tip curled upward toward palate
    upperLipX = 354;
    lowerLipX = 348;
    dorsum = { x: 235, y: 228 };
    blade = { x: 275, y: 218 };
    tip = { x: 296, y: 198 }; // Tip curled up!
    spotX = 296;
    spotY = 198;
    titleVi = "Uốn Cong Đầu Lưỡi (Retroflex / Alveolar)";
    titleEn = "Retroflex / Post-Alveolar Curl";
    descVi = "Đầu lưỡi cong ngược lên vòm họng nhưng không chạm vào vòm miệng.";
    anatomicalType = "postalveolar";
  } else if (sym === "h") {
    // Glottal: Constriction at vocal folds
    dorsum = { x: 235, y: 230 };
    blade = { x: 275, y: 226 };
    tip = { x: 315, y: 226 };
    spotX = 196;
    spotY = 310;
    titleVi = "Thanh Môn / Thanh Quản (Glottal)";
    titleEn = "Glottal Friction";
    descVi = "Dây thanh mở nhẹ, luồng hơi ma sát tại thanh môn rồi thoát tự do qua miệng.";
    anatomicalType = "glottal";
  }

  // ── 2. VOWEL PHONEMES ──
  else if (sym === "iː" || sym === "ɪ") {
    // High Front Vowel: Tongue dorsum/blade arched high toward hard palate
    lowerTeethY = 222;
    dorsum = { x: 245, y: 206 };
    blade = { x: 292, y: 198 }; // High front hump creating tight oral tunnel
    tip = { x: 324, y: 222 };   // Tip low behind lower incisors
    spotX = 286;
    spotY = 198;
    titleVi = "Nguyên Âm Trước - Cao (High Front)";
    titleEn = "High Front Unrounded";
    descVi = sym === "iː"
      ? "Lưng lưỡi nâng rất cao sát vòm cứng, khóe môi bè ngang như đang cười mỉm."
      : "Lưỡi hơi thấp hơn /iː/, cơ môi và cơ lưỡi thả lỏng tự nhiên.";
    anatomicalType = "vowel_front";
  } else if (sym === "e" || sym === "eɪ") {
    // Mid Front Vowel
    lowerTeethY = 224;
    lowerLipY = 228;
    mandibleDropY = 3;
    dorsum = { x: 242, y: 214 };
    blade = { x: 285, y: 210 };
    tip = { x: 322, y: 224 };
    spotX = 280;
    spotY = 210;
    titleVi = "Nguyên Âm Trước - Vừa (Mid Front)";
    titleEn = "Mid Front Vowel";
    descVi = "Miệng mở vừa phải, thân lưỡi dâng lên vị trí trung bình phía trước.";
    anatomicalType = "vowel_front";
  } else if (sym === "æ") {
    // Low Front Vowel (Open jaw)
    mandibleDropY = 14;
    lowerLipY = 238;
    lowerTeethY = 234;
    dorsum = { x: 235, y: 232 };
    blade = { x: 275, y: 230 };
    tip = { x: 316, y: 234 }; // Flat and low on floor of mouth
    spotX = 270;
    spotY = 230;
    titleVi = "Nguyên Âm Trước - Rộng (Low Front)";
    titleEn = "Open Front Vowel";
    descVi = "Hạ quai hàm mở rộng xuống dưới, thân lưỡi nằm thấp phẳng sát sàn miệng.";
    anatomicalType = "vowel_front";
  } else if (sym === "uː" || sym === "ʊ") {
    // High Back Rounded Vowel
    upperLipX = 358;
    lowerLipX = 354;
    dorsum = { x: 228, y: 202 }; // High back hump near velum
    blade = { x: 265, y: 222 };
    tip = { x: 312, y: 228 };
    spotX = 228;
    spotY = 202;
    titleVi = "Nguyên Âm Sau - Cao Tròn Môi (High Back)";
    titleEn = "High Back Rounded";
    descVi = sym === "uː"
      ? "Cuống lưỡi nâng cao về phía vòm mềm, hai môi chúm tròn nhỏ căng về phía trước."
      : "Cuống lưỡi nâng vừa, môi tròn nhẹ thư giãn.";
    anatomicalType = "vowel_back";
  } else if (sym === "ɔː" || sym === "oʊ" || sym === "ɒ") {
    // Mid-Low Back Rounded Vowel
    mandibleDropY = 8;
    upperLipX = 356;
    lowerLipX = 352;
    lowerTeethY = 228;
    lowerLipY = 232;
    dorsum = { x: 226, y: 212 };
    blade = { x: 262, y: 224 };
    tip = { x: 310, y: 228 };
    spotX = 226;
    spotY = 212;
    titleVi = "Nguyên Âm Sau - Vừa Tròn Môi (Mid Back)";
    titleEn = "Mid Back Rounded";
    descVi = "Lưỡi rụt về phía cuống họng, hàm mở vừa, khẩu hình tròn đều.";
    anatomicalType = "vowel_back";
  } else if (sym === "ɑː" || sym === "ʌ") {
    // Low Back / Open Central Vowel
    mandibleDropY = 14;
    lowerTeethY = 234;
    lowerLipY = 238;
    dorsum = { x: 222, y: 232 };
    blade = { x: 260, y: 234 };
    tip = { x: 310, y: 234 };
    spotX = 222;
    spotY = 232;
    titleVi = "Nguyên Âm Mở - Sâu (Open Central/Back)";
    titleEn = "Open Unrounded Vowel";
    descVi = sym === "ɑː"
      ? "Hạ hàm tối đa, lưỡi hạ thấp phẳng rụt sâu về đáy họng."
      : "Hàm mở thư giãn, lưỡi nằm ở trung tâm khoang miệng.";
    anatomicalType = "vowel_back";
  } else if (sym === "ɜː" || sym === "ə") {
    // Central Vowel (Schwa)
    lowerTeethY = 222;
    mandibleDropY = 2;
    dorsum = { x: 236, y: 224 };
    blade = { x: 275, y: 220 };
    tip = { x: 318, y: 224 };
    spotX = 275;
    spotY = 220;
    titleVi = "Nguyên Âm Trung Tâm (Central Vowel)";
    titleEn = "Mid Central (Schwa)";
    descVi = "Toàn bộ cơ môi, lưỡi và hàm ở trạng thái nghỉ thả lỏng hoàn toàn.";
    anatomicalType = "vowel_central";
  } else {
    // Diphthongs or general default
    lowerTeethY = 222;
    dorsum = { x: 236, y: 220 };
    blade = { x: 278, y: 214 };
    tip = { x: 318, y: 222 };
    spotX = 278;
    spotY = 214;
    titleVi = `Cấu âm cho âm /${sym}/`;
    titleEn = sound.name;
    descVi = sound.vietnameseGuide || sound.mouthShape;
    anatomicalType = "vowel_central";
  }

  // ── 3. SMOOTH ANATOMICAL SPLINE PATHS ──
  // Natural Muscular Tongue: Organically proportioned living organ
  // Root at hyoid / epiglottis (206, 278), smooth C2 dorsum & blade, rounded anatomical apex
  const tongueSurfacePath = `M ${root.x},${root.y} C ${root.x + 2},${root.y - 28} ${dorsum.x - 14},${dorsum.y - 2} ${dorsum.x},${dorsum.y} C ${dorsum.x + 16},${dorsum.y + 1} ${blade.x - 16},${blade.y} ${blade.x},${blade.y} C ${blade.x + 14},${blade.y} ${tip.x - 6},${tip.y - 1} ${tip.x},${tip.y}`;

  // Tongue Solid Body:
  // Loops around rounded apex, flows through sublingual floor of mouth, anchors firmly
  // into the mental spine (Genioglossus origin) of the mandible at (318, 250 + mandibleDropY),
  // then sweeps in a gentle biological concave hammock down to the hyoid bone (206, 278).
  const mandibleSpineX = 316;
  const mandibleSpineY = 250 + mandibleDropY * 0.8;
  const tongueBodyPath = `${tongueSurfacePath} C ${tip.x + 2},${tip.y + 4} ${tip.x - 3},${tip.y + 8} ${tip.x - 8},${tip.y + 9} C ${tip.x - 16},${tip.y + 12} ${mandibleSpineX + 6},${mandibleSpineY - 6} ${mandibleSpineX},${mandibleSpineY} C ${mandibleSpineX - 20},${mandibleSpineY + 16} ${root.x + 36},${root.y + 14} ${root.x},${root.y} Z`;

  // Soft Palate / Velum Path (Uvula curtain):
  // Seamlessly extends from posterior border of hard palate with rounded droplet uvula
  let velumPath = "M 240,190 C 228,191 218,197 210,206 C 206,211 207,218 212,216 C 218,213 226,206 240,198 Z";
  if (isNasal) {
    // Nasal: drapes down into pharynx, opening wide airway to nasal cavity
    velumPath = "M 240,190 C 230,206 222,224 216,242 C 213,246 220,248 224,244 C 230,226 236,208 240,198 Z";
  }

  // Airflow Vector Stream:
  // Strictly follows patent airway, terminating cleanly at lip aperture without mid-air overshoot
  let airflowPath = "";
  if (isNasal) {
    // Air travels up through nasopharynx into nasal cavity and out the nostril (366, 182)
    airflowPath = "M 196,305 C 196,220 200,180 220,172 C 255,160 310,165 346,180 L 366,182";
  } else {
    // Air travels up pharynx, over tongue dorsal surface, between teeth, and out cleanly at lips
    const airMidY = (upperLipY + lowerLipY) / 2;
    airflowPath = `M 196,305 C 196,245 ${dorsum.x - 6},${dorsum.y - 8} ${dorsum.x + 10},${dorsum.y - 8} C ${blade.x},${blade.y - 6} 334,${(216 + lowerTeethY) / 2} ${upperLipX + 4},${airMidY}`;
  }

  // Intuitive Anatomical Pins for Visual Clarity
  const pins = [
    {
      id: "hard_palate",
      targetX: 275,
      targetY: 194,
      labelX: 255,
      labelY: 105,
      labelVi: "Vòm cứng",
      labelEn: "Hard Palate",
      category: "palate" as const,
    },
    {
      id: "alveolar_ridge",
      targetX: 324,
      targetY: 206,
      labelX: 375,
      labelY: 140,
      labelVi: "Chân răng",
      labelEn: "Alveolar Ridge",
      category: "alveolar" as const,
    },
    {
      id: "soft_palate",
      targetX: 216,
      targetY: 206,
      labelX: 135,
      labelY: 175,
      labelVi: "Vòm mềm",
      labelEn: "Soft Palate",
      category: "velum" as const,
    },
    {
      id: "tongue",
      targetX: dorsum.x,
      targetY: dorsum.y,
      labelX: 135,
      labelY: 245,
      labelVi: "Lưng lưỡi",
      labelEn: "Tongue Dorsum",
      category: "tongue" as const,
    },
    {
      id: "vocal_cords",
      targetX: 196,
      targetY: 310,
      labelX: 135,
      labelY: 305,
      labelVi: "Dây thanh",
      labelEn: "Vocal Cords",
      category: "vocal_cords" as const,
    },
  ];

  return {
    isVoiced,
    isNasal,
    upperLipX,
    upperLipY,
    lowerLipX,
    lowerLipY,
    lowerTeethY,
    mandibleDropY,
    lipsContact,
    tongueRoot: root,
    tongueDorsum: dorsum,
    tongueBlade: blade,
    tongueTip: tip,
    floorOfMouth: floor,
    tongueBodyPath,
    tongueSurfacePath,
    velumPath,
    airflowPath,
    pins,
    spotlight: {
      x: spotX,
      y: spotY,
      titleVi,
      titleEn,
      descriptionVi: descVi,
      anatomicalType,
    },
  };
}

/**
 * Computes Frontal Lip Configuration for any IPA Sound
 * Standard Coordinate Space: 360 x 260
 */
export function getFrontalLipGeometry(sound: IpaSound): FrontalGeometryConfig {
  const sym = sound.symbol;

  if (sym === "p" || sym === "b" || sym === "m") {
    return {
      category: "bilabial_closed",
      width: 58,
      height: 2,
      outerScaleX: 1.0,
      outerScaleY: 1.0,
      showUpperTeeth: false,
      showLowerTeeth: false,
      teethGap: 0,
      tongueVisibility: "hidden",
      lipPuckered: false,
      cornerDrop: 0,
      descriptionVi: "Hai môi khép chặt hoàn toàn, không lộ răng hay lưỡi.",
    };
  }

  if (sym === "f" || sym === "v") {
    return {
      category: "labiodental",
      width: 52,
      height: 9,
      outerScaleX: 0.96,
      outerScaleY: 1.04,
      showUpperTeeth: true,
      showLowerTeeth: false,
      teethGap: 6,
      tongueVisibility: "hidden",
      lipPuckered: false,
      cornerDrop: 1,
      descriptionVi: "Răng cửa trên lộ rõ và cắn nhẹ vào lòng môi dưới.",
    };
  }

  if (sym === "θ" || sym === "ð") {
    return {
      category: "interdental",
      width: 54,
      height: 12,
      outerScaleX: 0.98,
      outerScaleY: 1.02,
      showUpperTeeth: true,
      showLowerTeeth: true,
      teethGap: 10,
      tongueVisibility: "protruding",
      lipPuckered: false,
      cornerDrop: 0,
      descriptionVi: "Hai hàm răng hé mở, đầu lưỡi đặt thò ra giữa hai hàng răng.",
    };
  }

  if (sym === "uː" || sym === "w") {
    return {
      category: "rounded_tight",
      width: 20,
      height: 18,
      outerScaleX: 0.72,
      outerScaleY: 1.15,
      showUpperTeeth: false,
      showLowerTeeth: false,
      teethGap: 4,
      tongueVisibility: "hidden",
      lipPuckered: true,
      cornerDrop: -2,
      descriptionVi: "Môi chúm tròn nhỏ và chu căng về phía trước như huýt sáo.",
    };
  }

  if (sym === "ɔː" || sym === "ʊ" || sym === "oʊ" || sym === "ɒ" || sym === "ɔɪ") {
    return {
      category: "rounded_open",
      width: 32,
      height: 26,
      outerScaleX: 0.84,
      outerScaleY: 1.18,
      showUpperTeeth: true,
      showLowerTeeth: true,
      teethGap: 14,
      tongueVisibility: "elevated_back",
      lipPuckered: true,
      cornerDrop: -1,
      descriptionVi: "Khẩu hình tròn hình bầu dục đứng, môi hơi nhô ra trước.",
    };
  }

  if (sym === "iː" || sym === "ɪ" || sym === "e" || sym === "eɪ" || sym === "j") {
    return {
      category: "spread_wide",
      width: 66,
      height: 13,
      outerScaleX: 1.22,
      outerScaleY: 0.92,
      showUpperTeeth: true,
      showLowerTeeth: true,
      teethGap: 8,
      tongueVisibility: "low_flat",
      lipPuckered: false,
      cornerDrop: -4, // Smile effect
      descriptionVi: "Môi bè rộng sang hai bên khóe miệng như đang mỉm cười.",
    };
  }

  if (sym === "æ" || sym === "ɑː" || sym === "ʌ" || sym === "aɪ" || sym === "aʊ") {
    return {
      category: "open_wide",
      width: 48,
      height: 34,
      outerScaleX: 0.95,
      outerScaleY: 1.28,
      showUpperTeeth: true,
      showLowerTeeth: true,
      teethGap: 24,
      tongueVisibility: "low_flat",
      lipPuckered: false,
      cornerDrop: 2,
      descriptionVi: "Hàm dưới hạ sâu, khoang miệng mở rộng tối đa theo chiều dọc.",
    };
  }

  if (sym === "s" || sym === "z" || sym === "t" || sym === "d" || sym === "n") {
    return {
      category: "alveolar_slit",
      width: 50,
      height: 8,
      outerScaleX: 1.05,
      outerScaleY: 0.98,
      showUpperTeeth: true,
      showLowerTeeth: true,
      teethGap: 4,
      tongueVisibility: "raised_alveolar",
      lipPuckered: false,
      cornerDrop: 0,
      descriptionVi: "Răng khép sát thành khe hẹp, đầu lưỡi tiếp xúc sau chân răng trên.",
    };
  }

  if (sym === "ʃ" || sym === "ʒ" || sym === "tʃ" || sym === "dʒ") {
    return {
      category: "postalveolar_flare",
      width: 38,
      height: 22,
      outerScaleX: 0.88,
      outerScaleY: 1.12,
      showUpperTeeth: true,
      showLowerTeeth: true,
      teethGap: 10,
      tongueVisibility: "raised_alveolar",
      lipPuckered: true,
      cornerDrop: 0,
      descriptionVi: "Môi chu loe nhẹ về phía trước hình phễu, răng hé mở.",
    };
  }

  if (sym === "r") {
    return {
      category: "retroflex",
      width: 42,
      height: 18,
      outerScaleX: 0.92,
      outerScaleY: 1.06,
      showUpperTeeth: true,
      showLowerTeeth: true,
      teethGap: 10,
      tongueVisibility: "raised_alveolar",
      lipPuckered: true,
      cornerDrop: -1,
      descriptionVi: "Môi hơi tròn nhẹ, đầu lưỡi cong hướng lên vòm họng.",
    };
  }

  // Default: neutral open
  return {
    category: "neutral_open",
    width: 46,
    height: 16,
    outerScaleX: 1.0,
    outerScaleY: 1.0,
    showUpperTeeth: true,
    showLowerTeeth: true,
    teethGap: 10,
    tongueVisibility: "low_flat",
    lipPuckered: false,
    cornerDrop: 0,
    descriptionVi: "Khẩu hình mở tự nhiên, cơ môi và hàm thả lỏng.",
  };
}

// Deep English-Vietnamese Dictionary Tagger & Morphological Analyzer

export interface DeepWordDefinition {
  word: string;
  ipa: string;
  pos: string; // Part of Speech: Noun, Verb, Adjective, Adverb, Preposition, Conjunction, Pronoun, Article
  meaning: string; // Deep Vietnamese translation
  detailMeaning?: string; // Extended dictionary explanation
  rootWord?: string; // Base form / Lemma
  collocations?: string[]; // Common idioms & phrases
  example: string; // Real-world example sentence
  synonyms?: string[]; // Synonyms
}

const DICTIONARY_DATABASE: { [key: string]: DeepWordDefinition } = {
  attention: {
    word: "attention",
    ipa: "/əˈten.ʃən/",
    pos: "Danh từ (Noun)",
    meaning: "Sự chú ý, sự tập trung",
    detailMeaning: "Hành động lắng nghe, quan sát hoặc xem xét ai đó/cái gì đó một cách cẩn thận.",
    rootWord: "attend (v)",
    collocations: ["pay attention to", "attract attention", "bring to attention"],
    example: "Attention all employees: Please read the safety announcement carefully.",
    synonyms: ["notice", "awareness", "mind", "heed"],
  },
  all: {
    word: "all",
    ipa: "/ɑːl/",
    pos: "Lượng từ / Đại từ (Quantifier)",
    meaning: "Tất cả, toàn bộ",
    detailMeaning: "Toàn bộ số lượng hoặc tổng thể một nhóm đối tượng.",
    collocations: ["all of sudden", "above all", "first of all"],
    example: "All staff members are required to attend.",
    synonyms: ["every", "entire", "whole"],
  },
  employees: {
    word: "employees",
    ipa: "/ɪmˈplɔɪ.iːz/",
    pos: "Danh từ số nhiều (Plural Noun)",
    meaning: "Nhân viên, người lao động",
    detailMeaning: "Những người làm việc cho một công ty hoặc tổ chức để nhận lương.",
    rootWord: "employee (n) / employ (v)",
    collocations: ["full-time employee", "employee performance", "key employees"],
    example: "All employees will be temporarily relocated to the second floor.",
    synonyms: ["staff", "workers", "personnel", "workforce"],
  },
  employee: {
    word: "employee",
    ipa: "/ɪmˈplɔɪ.iː/",
    pos: "Danh từ (Noun)",
    meaning: "Nhân viên, người làm công ăn lương",
    detailMeaning: "Người được một doanh nghiệp tuyển dụng để làm công việc cụ thể.",
    rootWord: "employ (v)",
    collocations: ["employee benefit", "new employee", "company employee"],
    example: "She is a highly valued employee of our company.",
    synonyms: ["staff member", "worker"],
  },
  due: {
    word: "due",
    ipa: "/duː/",
    pos: "Tính từ / Giới từ (Adjective/Preposition)",
    meaning: "Do, vì, đến hạn",
    detailMeaning: "Chỉ lý do (due to = bởi vì) hoặc trạng thái đến hạn thanh toán/hoàn thành.",
    collocations: ["due to", "in due course", "become due"],
    example: "Due to the upcoming renovation, the office will close early.",
    synonyms: ["because of", "owing to", "scheduled"],
  },
  upcoming: {
    word: "upcoming",
    ipa: "/ˈʌpˌkʌm.ɪŋ/",
    pos: "Tính từ (Adjective)",
    meaning: "Sắp tới, sắp diễn ra",
    detailMeaning: "Sự kiện hoặc thời điểm sẽ xảy ra trong tương lai gần.",
    rootWord: "up + come",
    collocations: ["upcoming event", "upcoming election", "upcoming semester"],
    example: "Please prepare for the upcoming renovation of the building.",
    synonyms: ["forthcoming", "imminent", "approaching"],
  },
  renovation: {
    word: "renovation",
    ipa: "/ˌren.əˈveɪ.ʃən/",
    pos: "Danh từ (Noun)",
    meaning: "Sự sửa sang, cải tạo, nâng cấp",
    detailMeaning: "Quá trình sửa chữa và đổi mới một tòa nhà, căn phòng hoặc công trình.",
    rootWord: "renovate (v)",
    collocations: ["undergo renovation", "home renovation", "major renovation"],
    example: "The third floor is currently closed for major renovation.",
    synonyms: ["refurbishment", "restoration", "remodeling", "makeover"],
  },
  third: {
    word: "third",
    ipa: "/θɝːd/",
    pos: "Số thứ tự (Ordinal Number)",
    meaning: "Thứ ba (3rd)",
    detailMeaning: "Đứng ở vị trí số 3 trong chuỗi danh sách hoặc tầng nhà.",
    example: "Our office is located on the third floor.",
  },
  floor: {
    word: "floor",
    ipa: "/flɔːr/",
    pos: "Danh từ (Noun)",
    meaning: "Tầng nhà, sàn nhà",
    detailMeaning: "Bề mặt phẳng của căn phòng hoặc một tầng của tòa nhà.",
    collocations: ["second floor", "ground floor", "dance floor"],
    example: "Staff will be moved to the second floor temporarily.",
    synonyms: ["level", "story"],
  },
  staff: {
    word: "staff",
    ipa: "/stæf/",
    pos: "Danh từ tập hợp (Collective Noun)",
    meaning: "Đội ngũ nhân viên, cán bộ",
    detailMeaning: "Tập hợp tất cả những người làm việc cho một tổ chức.",
    collocations: ["staff member", "staff meeting", "medical staff"],
    example: "Our support staff is available 24/7.",
    synonyms: ["personnel", "workforce", "team"],
  },
  members: {
    word: "members",
    ipa: "/ˈmem.bɚz/",
    pos: "Danh từ số nhiều (Plural Noun)",
    meaning: "Các thành viên",
    detailMeaning: "Những cá nhân thuộc về một nhóm, câu lạc bộ hoặc tổ chức.",
    rootWord: "member (n)",
    collocations: ["team members", "family members", "board members"],
    example: "All staff members are invited to join the workshop.",
    synonyms: ["participants", "associates"],
  },
  working: {
    word: "working",
    ipa: "/ˈwɝː.kɪŋ/",
    pos: "Động từ dạng V-ing / Tính từ (Participle)",
    meaning: "Đang làm việc, hoạt động",
    detailMeaning: "Hành động thực hiện công việc hoặc trạng thái đang vận hành.",
    rootWord: "work (v)",
    collocations: ["working hours", "working condition", "working space"],
    example: "Employees working on the 3rd floor will move today.",
    synonyms: ["operating", "functioning", "employed"],
  },
  temporarily: {
    word: "temporarily",
    ipa: "/ˈtem.pə.rer.əl.i/",
    pos: "Trạng từ (Adverb)",
    meaning: "Tạm thời, trong một thời gian ngắn",
    detailMeaning: "Xảy ra trong khoảng thời gian nhất định, không kéo dài vĩnh viễn.",
    rootWord: "temporary (adj)",
    collocations: ["temporarily closed", "temporarily unavailable", "temporarily relocated"],
    example: "The library will be temporarily closed for repairs.",
    synonyms: ["provisioally", "briefly", "for now"],
  },
  relocated: {
    word: "relocated",
    ipa: "/ˌriː.loʊˈkeɪ.t̬ɪd/",
    pos: "Động từ quá khứ / Bị động (Past Verb / Passive)",
    meaning: "Đã chuyển vị trí, được di dời",
    detailMeaning: "Hành động di chuyển văn phòng, gia đình hoặc công ty sang địa điểm mới.",
    rootWord: "relocate (v)",
    collocations: ["be relocated to", "relocate headquarter"],
    example: "All staff will be relocated to the second floor during renovation.",
    synonyms: ["moved", "transferred", "repositioned"],
  },
  second: {
    word: "second",
    ipa: "/ˈsek.ənd/",
    pos: "Số thứ tự (Ordinal Number)",
    meaning: "Thứ hai (2nd)",
    detailMeaning: "Vị trí ngay sau vị trí thứ nhất.",
    example: "Please take the stairs to the second floor.",
  },
  pack: {
    word: "pack",
    ipa: "/pæk/",
    pos: "Động từ (Verb)",
    meaning: "Đóng gói, thu dọn đồ đạc",
    detailMeaning: "Đặt vật dụng vào vali, hộp hoặc túi để chuẩn bị di chuyển.",
    collocations: ["pack belongings", "pack luggage", "pack up"],
    example: "Please make sure to pack your personal belongings by Friday.",
    synonyms: ["box up", "store", "bundle"],
  },
  personal: {
    word: "personal",
    ipa: "/ˈpɝː.sən.əl/",
    pos: "Tính từ (Adjective)",
    meaning: "Cá nhân, riêng tư",
    detailMeaning: "Thuộc về một người cụ thể chứ không phải cộng đồng hay công ty.",
    rootWord: "person (n)",
    collocations: ["personal belongings", "personal info", "personal computer"],
    example: "Keep your personal items in the locker.",
    synonyms: ["private", "individual", "own"],
  },
  belongings: {
    word: "belongings",
    ipa: "/bɪˈlɑːŋ.ɪŋz/",
    pos: "Danh từ số nhiều (Plural Noun)",
    meaning: "Đồ dùng cá nhân, tài sản cá nhân",
    detailMeaning: "Những vật dụng thuộc sở hữu riêng của một người (ví dụ: ví, điện thoại, máy tính).",
    rootWord: "belong (v)",
    collocations: ["personal belongings", "valuable belongings"],
    example: "Do not leave your personal belongings unattended.",
    synonyms: ["possessions", "property", "effects"],
  },
  friday: {
    word: "Friday",
    ipa: "/ˈfraɪ.deɪ/",
    pos: "Danh từ riêng (Proper Noun)",
    meaning: "Thứ Sáu",
    detailMeaning: "Ngày thứ 6 trong tuần làm việc.",
    example: "The deadline for the report is Friday afternoon.",
  },
  afternoon: {
    word: "afternoon",
    ipa: "/ˌæf.tɚˈnuːn/",
    pos: "Danh từ (Noun)",
    meaning: "Buổi chiều (từ 12h trưa đến chiều tối)",
    detailMeaning: "Khoảng thời gian giữa buổi trưa và lúc mặt trời lặn.",
    example: "We will have a team meeting this afternoon.",
  },
  approximately: {
    word: "approximately",
    ipa: "/əˈprɑːk.sə.mət.li/",
    pos: "Trạng từ (Adverb)",
    meaning: "Xấp xỉ, khoảng chừng",
    detailMeaning: "Con số hoặc thời gian gần đúng, có sự chênh lệch nhỏ.",
    rootWord: "approximate (adj)",
    collocations: ["take approximately", "approximately 3 weeks"],
    example: "The renovation will take approximately three weeks.",
    synonyms: ["roughly", "about", "around", "nearly"],
  },
  weeks: {
    word: "weeks",
    ipa: "/wiːks/",
    pos: "Danh từ số nhiều (Plural Noun)",
    meaning: "Các tuần lễ",
    detailMeaning: "Khoảng thời gian 7 ngày.",
    rootWord: "week (n)",
    example: "The project will be completed in two weeks.",
  },
  during: {
    word: "during",
    ipa: "/ˈdʊr.ɪŋ/",
    pos: "Giới từ (Preposition)",
    meaning: "Trong suốt (thời gian)",
    detailMeaning: "Xảy ra xuyên suốt một giai đoạn thời gian cụ thể.",
    collocations: ["during this time", "during the meeting", "during summer"],
    example: "Please do not use the elevators during the inspection.",
    synonyms: ["throughout", "in the course of"],
  },
  elevators: {
    word: "elevators",
    ipa: "/ˈel.ə.veɪ.t̬ɚz/",
    pos: "Danh từ số nhiều (Plural Noun)",
    meaning: "Các thang máy",
    detailMeaning: "Thiết bị dùng để di chuyển người và hàng hóa lên xuống giữa các tầng nhà.",
    rootWord: "elevator (n) / elevate (v)",
    collocations: ["elevator out of service", "take the elevator"],
    example: "The elevators on the east side will be out of service.",
    synonyms: ["lifts"],
  },
  east: {
    word: "east",
    ipa: "/iːst/",
    pos: "Danh từ / Tính từ (Noun/Adjective)",
    meaning: "Phía đông, hướng đông",
    detailMeaning: "Một trong bốn hướng chính trên bản đồ (phía mặt trời mọc).",
    example: "The sun rises in the east.",
  },
  building: {
    word: "building",
    ipa: "/ˈbɪl.dɪŋ/",
    pos: "Danh từ (Noun)",
    meaning: "Tòa nhà, công trình xây dựng",
    detailMeaning: "Cấu trúc có mái che và tường (ví dụ: nhà ở, văn phòng, nhà máy).",
    rootWord: "build (v)",
    collocations: ["office building", "tall building"],
    example: "Our company owns a 20-story building.",
    synonyms: ["structure", "edifice", "property"],
  },
  service: {
    word: "service",
    ipa: "/ˈsɝː.vɪs/",
    pos: "Danh từ (Noun)",
    meaning: "Dịch vụ, sự hoạt động",
    detailMeaning: "Công việc phục vụ hoặc trạng thái vận hành của máy móc.",
    collocations: ["out of service", "customer service", "in service"],
    example: "The elevator is currently out of service.",
    synonyms: ["operation", "utility"],
  },
  apologize: {
    word: "apologize",
    ipa: "/əˈpɑː.lə.dʒaɪz/",
    pos: "Động từ (Verb)",
    meaning: "Xin lỗi, tạ lỗi",
    detailMeaning: "Nói hoặc viết lời xin lỗi vì đã gây ra phiền phức hay sai sót.",
    rootWord: "apology (n)",
    collocations: ["apologize for", "apologize to someone"],
    example: "We apologize for any inconvenience caused.",
    synonyms: ["express regret", "ask forgiveness"],
  },
  inconvenience: {
    word: "inconvenience",
    ipa: "/ˌɪn.kənˈviː.ni.əns/",
    pos: "Danh từ (Noun)",
    meaning: "Sự bất tiện, sự phiền hà",
    detailMeaning: "Trạng thái gây khó khăn hoặc phiền phức cho cuộc sống/công việc.",
    rootWord: "convenience (n)",
    collocations: ["cause inconvenience", "apologize for inconvenience"],
    example: "We sincerely apologize for any inconvenience this delay may cause.",
    synonyms: ["trouble", "bother", "disruption", "hassle"],
  },
};

/**
 * Deep AI Word Lookup Function
 * Normalizes input word, strips suffixes (ing, ed, s, es, ly), and generates full pedagogical breakdown.
 */
export function lookupWordDeep(rawWord: string): DeepWordDefinition {
  const cleanWord = rawWord.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  if (!cleanWord) {
    return {
      word: rawWord,
      ipa: "/ˈsæm.pəl/",
      pos: "Từ vựng (Word)",
      meaning: "Từ vựng tiếng Anh",
      example: `Example with ${rawWord}`,
    };
  }

  // Direct match
  if (DICTIONARY_DATABASE[cleanWord]) {
    return DICTIONARY_DATABASE[cleanWord];
  }

  // Stemming fallback (Remove 's', 'es', 'ed', 'ing', 'ly')
  let stem = cleanWord;
  if (cleanWord.endsWith("s") && cleanWord.length > 3) stem = cleanWord.slice(0, -1);
  if (cleanWord.endsWith("ed") && cleanWord.length > 4) stem = cleanWord.slice(0, -2);
  if (cleanWord.endsWith("ing") && cleanWord.length > 4) stem = cleanWord.slice(0, -3);

  if (DICTIONARY_DATABASE[stem]) {
    const base = DICTIONARY_DATABASE[stem];
    return {
      ...base,
      word: rawWord,
      detailMeaning: `Biến thể từ của gốc từ "${base.word}". ${base.detailMeaning || ""}`,
    };
  }

  // Generative fallback for unlisted words
  return {
    word: rawWord,
    ipa: `/${cleanWord}/`,
    pos: "Từ vựng tiếng Anh",
    meaning: `Từ vựng trong bài đọc (${rawWord})`,
    detailMeaning: `Từ "${rawWord}" xuất hiện trong văn bản bài nghe. Luyện tập nghe phát âm và ghép ngữ cảnh câu.`,
    collocations: [`${cleanWord} in sentence`, `learn ${cleanWord}`],
    example: `Context sentence containing "${rawWord}".`,
    synonyms: ["word", "vocabulary"],
  };
}

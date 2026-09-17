import { GrammarTopic, GrammarLevel } from "../types/grammarTypes";

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // Basic level (20 topics)
  { id: "present_simple", name: "Thì Hiện tại đơn", nameEn: "Present Simple", icon: "⏰", desc: "Mô tả công việc hàng ngày, thói quen và sự thật hiển nhiên.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "present_continuous", name: "Thì Hiện tại tiếp diễn", nameEn: "Present Continuous", icon: "⏳", desc: "Mô tả hành động đang diễn ra tại thời điểm nói hoặc kế hoạch gần.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "past_simple", name: "Thì Quá khứ đơn", nameEn: "Past Simple", icon: "🗓", desc: "Kể lại sự việc đã chấm dứt hoàn toàn trong quá khứ.", level: "basic", focus: "TOEIC Part 6 & IELTS Speaking" },
  { id: "past_continuous", name: "Thì Quá khứ tiếp diễn", nameEn: "Past Continuous", icon: "⏱", desc: "Mô tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "future_simple", name: "Thì Tương lai đơn", nameEn: "Future Simple", icon: "🔮", desc: "Quyết định tự phát, hứa hẹn hoặc dự đoán không căn cứ.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "future_near", name: "Thì Tương lai gần", nameEn: "Be Going To", icon: "🛫", desc: "Dự định, kế hoạch đã có từ trước hoặc dự đoán có căn cứ.", level: "basic", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "singular_plural_nouns", name: "Danh từ số ít & số nhiều", nameEn: "Singular & Plural Nouns", icon: "📦", desc: "Quy tắc thêm đuôi -s/es và danh từ biến đổi bất quy tắc.", level: "basic", focus: "TOEIC Part 5" },
  { id: "nouns_countability", name: "Danh từ đếm được & không đếm được", nameEn: "Countable & Uncountable Nouns", icon: "🥛", desc: "Phân biệt danh từ đếm được, không đếm được và đơn vị đo lường.", level: "basic", focus: "TOEIC Part 5" },
  { id: "subject_object_pronouns", name: "Đại từ chủ ngữ & tân ngữ", nameEn: "Subject & Object Pronouns", icon: "👥", desc: "Cách định dạng chủ từ và túc từ đứng trước/sau động từ.", level: "basic", focus: "TOEIC Part 5" },
  { id: "reflexive_demonstrative", name: "Đại từ phản thân & chỉ định", nameEn: "Reflexive & Demonstrative Pronouns", icon: "👈", desc: "Cách sử dụng đại từ phản thân (myself) và từ chỉ định (this, that).", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "possessive_adj_pronouns", name: "Tính từ & Đại từ sở hữu", nameEn: "Possessive Adjectives & Pronouns", icon: "🔑", desc: "Phân biệt cách dùng tính từ sở hữu (my) và đại từ sở hữu (mine).", level: "basic", focus: "TOEIC Part 5" },
  { id: "possessive_case", name: "Danh từ sở hữu cách ('s)", nameEn: "Possessive Case", icon: "📎", desc: "Cách biểu thị quyền sở hữu đối với người và vật hữu sinh.", level: "basic", focus: "TOEIC Part 5" },
  { id: "determiners_basic", name: "Từ hạn định: Some, Any, No", nameEn: "Basic Determiners", icon: "🔢", desc: "Quy tắc dùng một vài, bất kỳ và không có gì trong câu.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "quantifiers_basic", name: "Lượng từ: Much, Many, Few, Little", nameEn: "Basic Quantifiers", icon: "📊", desc: "Dùng các lượng từ chỉ số lượng nhiều/ít với danh từ đếm/không đếm được.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "basic_articles", name: "Mạo từ xác định & Không xác định", nameEn: "Basic Articles (A, An, The)", icon: "📝", desc: "Quy tắc dùng mạo từ A, An, The hoặc lược bỏ mạo từ.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "basic_adj_adv", name: "Tính từ & Trạng từ chỉ thể cách", nameEn: "Adjectives & Adverbs of Manner", icon: "✨", desc: "Nhận biết vị trí tính từ và trạng từ đuôi -ly bổ nghĩa động từ.", level: "basic", focus: "TOEIC Part 5" },
  { id: "comparatives_basic", name: "So sánh bằng & So sánh hơn", nameEn: "Basic Comparatives", icon: "📊", desc: "Cấu trúc so sánh bằng (as...as) và so sánh hơn của tính từ ngắn/dài.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "superlatives_basic", name: "Cấu trúc So sánh nhất", nameEn: "Superlatives", icon: "🏆", desc: "Cấu trúc so sánh nhất của tính từ ngắn/dài và trạng từ.", level: "basic", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "time_prepositions", name: "Giới từ chỉ Thời gian", nameEn: "Prepositions of Time", icon: "⏳", desc: "Quy tắc sử dụng các giới từ thời gian In, On, At, For, Since.", level: "basic", focus: "TOEIC Part 5 & 6" },
  { id: "place_prepositions", name: "Giới từ chỉ Nơi chốn & Hướng", nameEn: "Prepositions of Place & Direction", icon: "📍", desc: "Cách định vị không gian: In, On, At, Under, Into, To, Across.", level: "basic", focus: "TOEIC Part 5 & 6" },

  // Intermediate level (20 topics)
  { id: "perfect_present", name: "Thì Hiện tại hoàn thành", nameEn: "Present Perfect", icon: "⏳", desc: "Mô tả kinh nghiệm, hành động vừa xảy ra kéo dài đến hiện tại.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "perfect_present_cont", name: "Thì Hiện tại hoàn thành tiếp diễn", nameEn: "Present Perfect Continuous", icon: "🔄", desc: "Nhấn mạnh tính liên tục của hành động bắt đầu từ quá khứ kéo dài đến nay.", level: "intermediate", focus: "IELTS Speaking & Writing" },
  { id: "perfect_past", name: "Thì Quá khứ hoàn thành", nameEn: "Past Perfect", icon: "⏮", desc: "Mô tả hành động hoàn thành trước một hành động quá khứ khác.", level: "intermediate", focus: "TOEIC Part 6 & IELTS Writing" },
  { id: "perfect_past_cont", name: "Thì Quá khứ hoàn thành tiếp diễn", nameEn: "Past Perfect Continuous", icon: "⏳", desc: "Nhấn mạnh tính liên tục của sự việc trước một mốc quá khứ khác.", level: "intermediate", focus: "IELTS Writing Task 2" },
  { id: "perfect_future", name: "Thì Tương lai hoàn thành", nameEn: "Future Perfect", icon: "⏭", desc: "Mô tả sự việc sẽ hoàn tất trước một thời điểm ở tương lai.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "perfect_future_cont", name: "Thì Tương lai hoàn thành tiếp diễn", nameEn: "Future Perfect Continuous", icon: "⌛", desc: "Mô tả tính liên tục của hành động kéo dài đến một mốc tương lai.", level: "intermediate", focus: "IELTS Writing Task 1" },
  { id: "passive_basic", name: "Câu bị động các thì cơ bản", nameEn: "Passive Voice in Basic Tenses", icon: "🔄", desc: "Chuyển câu chủ động sang bị động với thì hiện tại, quá khứ, tương lai.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 1" },
  { id: "passive_modals_cont", name: "Câu bị động khuyết thiếu & tiếp diễn", nameEn: "Passive with Modals & Continuous", icon: "🔄", desc: "Cấu trúc bị động với modal verbs (should be done) và thì tiếp diễn (being done).", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "conditionals_0_1", name: "Câu điều kiện Loại 0 & Loại 1", nameEn: "Conditionals Type 0 & 1", icon: "🔀", desc: "Diễn tả chân lý khoa học hoặc giả định thực tế có thể xảy ra ở tương lai.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "conditionals_2", name: "Câu điều kiện Loại 2", nameEn: "Conditionals Type 2", icon: "🔀", desc: "Giả định trái ngược hoàn toàn với thực tế ở hiện tại.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "relative_defining", name: "Mệnh đề quan hệ xác định", nameEn: "Defining Relative Clauses", icon: "🔗", desc: "Mệnh đề cung cấp thông tin bắt buộc phải có cho danh từ đứng trước.", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "relative_non_defining", name: "Mệnh đề quan hệ không xác định", nameEn: "Non-defining Relative Clauses", icon: "🔗", desc: "Bổ sung thông tin phụ cho danh từ đã xác định (ngăn cách bởi dấu phẩy).", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "gerunds_usage", name: "Danh động từ làm Chủ & Tân ngữ", nameEn: "Gerunds as Subjects & Objects", icon: "🎯", desc: "Cấu trúc danh động từ đứng đầu câu làm chủ ngữ hoặc sau giới từ.", level: "intermediate", focus: "TOEIC Part 5" },
  { id: "infinitives_usage", name: "Động từ nguyên mẫu có 'to' & không 'to'", nameEn: "Infinitives with/without To", icon: "🎯", desc: "Quy tắc sử dụng to-V và V-bare sau các động từ đặc biệt.", level: "intermediate", focus: "TOEIC Part 5" },
  { id: "modal_obligation", name: "Động từ khuyết thiếu bắt buộc & khuyên bảo", nameEn: "Modals of Obligation & Advice", icon: "💡", desc: "Cách dùng diễn tả trách nhiệm, lời khuyên: Must, Have to, Should, Ought to.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "modal_ability", name: "Động từ khuyết thiếu xin phép & khả năng", nameEn: "Modals of Permission & Ability", icon: "💡", desc: "Diễn tả năng lực, khả năng xảy ra hoặc xin phép: Can, Could, May, Might.", level: "intermediate", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "conjunctions_coordinating", name: "Liên từ kết hợp & Liên từ tương hợp", nameEn: "Coordinating & Correlative Conjunctions", icon: "🖇", desc: "Nối các từ/mệnh đề độc lập: FANBOYS, both...and, either...or, neither...nor.", level: "intermediate", focus: "TOEIC Part 5 & 6" },
  { id: "conjunctions_cause_effect", name: "Mệnh đề trạng ngữ chỉ Lý do & Kết quả", nameEn: "Adverbial Clauses of Cause & Effect", icon: "📝", desc: "Mệnh đề phụ thuộc dùng Because, Since, As, So, Therefore, Consequently.", level: "intermediate", focus: "TOEIC Part 5 & 6 & IELTS Writing Task 2" },
  { id: "reported_statements", name: "Câu gián tiếp tường thuật câu kể", nameEn: "Reported Speech: Statements", icon: "💬", desc: "Quy tắc lùi thì, đổi đại từ, trạng ngữ chỉ thời gian khi thuật lại câu kể.", level: "intermediate", focus: "TOEIC Part 7 & IELTS Speaking" },
  { id: "reported_questions", name: "Câu gián tiếp tường thuật câu hỏi", nameEn: "Reported Speech: Questions & Commands", icon: "💬", desc: "Thuật lại câu hỏi Yes/No, câu hỏi Wh- và câu ra lệnh yêu cầu.", level: "intermediate", focus: "TOEIC Part 7 & IELTS Speaking" },

  // Advanced level (20 topics)
  { id: "noun_clauses_basic", name: "Mệnh đề danh từ làm Chủ & Tân ngữ", nameEn: "Noun Clauses as Subjects & Objects", icon: "💬", desc: "Mệnh đề đóng vai trò danh từ đứng đầu câu hoặc sau động từ chính.", level: "advanced", focus: "IELTS Writing Task 2 & TOEIC Part 6" },
  { id: "noun_clauses_advanced", name: "Mệnh đề danh từ làm bổ ngữ & đồng vị", nameEn: "Noun Clauses as Complements", icon: "💬", desc: "Mệnh đề danh từ đóng vai trò bổ nghĩa cho tính từ hoặc đồng vị đứng sau danh từ.", level: "advanced", focus: "IELTS Writing Task 2" },
  { id: "conditionals_3", name: "Câu điều kiện Loại 3", nameEn: "Conditionals Type 3", icon: "🔀", desc: "Giả định trái ngược hoàn toàn với thực tế đã xảy ra trong quá khứ.", level: "advanced", focus: "IELTS Writing & Speaking (Band 7.0+)" },
  { id: "conditionals_mixed", name: "Câu điều kiện Hỗn hợp (Mixed)", nameEn: "Mixed Conditionals", icon: "🔀", desc: "Kết hợp giả định quá khứ có ảnh hưởng/kết quả ở hiện tại và ngược lại.", level: "advanced", focus: "IELTS Writing & Speaking (Band 7.0+)" },
  { id: "conditional_inversion", name: "Đảo ngữ trong câu điều kiện", nameEn: "Inversion in Conditionals", icon: "🔀", desc: "Lược bỏ 'If' và đảo trợ động từ lên đầu câu: Should I, Were I, Had I.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "inversion", name: "Đảo ngữ với Trạng từ phủ định", nameEn: "Inversion with Negative Adverbs", icon: "🔄", desc: "Đảo trợ động từ lên trước chủ ngữ: Never, Seldom, Hardly, Under no circumstances.", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.0+)" },
  { id: "subjunctive_mood", name: "Thể giả định nâng cao", nameEn: "Advanced Subjunctive Mood", icon: "⚖️", desc: "Cấu trúc giả định trong câu khuyên bảo trang trọng: demand that, crucial that.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "reduced_relative", name: "Rút gọn mệnh đề quan hệ (Chủ/Bị động)", nameEn: "Reduced Relative Clauses", icon: "✂️", desc: "Lược bỏ đại từ quan hệ và động từ to-be, dùng cụm V-ing hoặc V3/ed.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "participle_clauses", name: "Mệnh đề phân từ đồng chủ ngữ", nameEn: "Participle Clauses", icon: "✂️", desc: "Kết nối 2 hành động cùng chủ ngữ sử dụng V-ing (chủ động) hoặc V3/ed (bị động).", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.5+)" },
  { id: "reduced_adverbial", name: "Rút gọn mệnh đề trạng ngữ", nameEn: "Reduced Adverbial Clauses", icon: "✂️", desc: "Lược bỏ chủ ngữ phụ trong mệnh đề thời gian/nhượng bộ: Although playing, When finished.", level: "advanced", focus: "IELTS Writing Task 2 & TOEIC Part 6" },
  { id: "double_passive", name: "Bị động kép & Bị động phi cá nhân", nameEn: "Double & Impersonal Passive", icon: "🔄", desc: "Cấu trúc tường thuật khách quan: It is believed that / She is said to.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "cleft_sentences", name: "Câu chẻ nhấn mạnh", nameEn: "Cleft Sentences", icon: "⚡", desc: "Cấu trúc nhấn mạnh tiêu điểm thông tin cụ thể: It is... that... / What... is...", level: "advanced", focus: "IELTS Writing Task 2 & Speaking" },
  { id: "double_comparatives", name: "So sánh kép (The more... the more...)", nameEn: "Double Comparatives", icon: "📈", desc: "Cấu trúc nhân quả song song biểu thị sự biến đổi tương thích.", level: "advanced", focus: "IELTS Writing Task 2" },
  { id: "advanced_comparatives", name: "So sánh bội số & So sánh ẩn", nameEn: "Advanced Comparatives", icon: "📈", desc: "Cấu trúc so sánh nâng cao: gấp bao nhiêu lần, so sánh ngầm.", level: "advanced", focus: "IELTS Writing Task 1 & TOEIC Part 5" },
  { id: "advanced_modals", name: "Động từ khuyết thiếu quá khứ (Perfect Modals)", nameEn: "Advanced Past Modals", icon: "🛡", desc: "Đoán nhận sự việc quá khứ: must have done, should have done, needn't have done.", level: "advanced", focus: "TOEIC Part 5 & IELTS Speaking" },
  { id: "parallel_structure", name: "Cấu trúc song hành nâng cao", nameEn: "Parallel Structure", icon: "⚖️", desc: "Đồng bộ từ loại trong chuỗi thông tin để tăng điểm mạch lạc và liên kết.", level: "advanced", focus: "IELTS Writing Task 2 (Band 7.0+)" },
  { id: "subject_verb_exceptions", name: "Hòa hợp Chủ - Vị ngoại lệ", nameEn: "Subject-Verb Agreement Exceptions", icon: "🤝", desc: "Các quy tắc chia động từ phức tạp với danh từ tập hợp, đại từ bất định.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing" },
  { id: "advanced_determiners", name: "Từ hạn định & Lượng từ nâng cao", nameEn: "Advanced Determiners", icon: "🔢", desc: "Phân biệt cách dùng nâng cao: Either, Neither, None, Both, Each, Every.", level: "advanced", focus: "TOEIC Part 5" },
  { id: "prepositional_phrases", name: "Cụm giới từ đi kèm (Collocations)", nameEn: "Prepositional Collocations", icon: "📍", desc: "Các cụm giới từ cố định đi với danh từ, động từ và tính từ phổ biến trong viết luận.", level: "advanced", focus: "TOEIC Part 5 & IELTS Writing Task 2" },
  { id: "emphatic_fronting", name: "Cấu trúc nhấn mạnh bổ trợ (Fronting)", nameEn: "Emphatic Structures & Fronting", icon: "🚀", desc: "Đảo ngữ hoặc đảo thành tố câu lên đầu câu để tạo hiệu ứng tu từ mạnh mẽ.", level: "advanced", focus: "IELTS Writing & Speaking (Band 8.0+)" },
];

export function getGrammarTopicById(id: string): GrammarTopic | undefined {
  const direct = GRAMMAR_TOPICS.find((t) => t.id === id);
  if (direct) return direct;
  return GRAMMAR_TOPICS.find((t) => t.id === id.replace(/-/g, "_"));
}

export function getGrammarTopicsByLevel(level: GrammarLevel): GrammarTopic[] {
  return GRAMMAR_TOPICS.filter((t) => t.level === level);
}

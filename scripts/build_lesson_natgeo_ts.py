import json
import re

with open('scripts/natgeo_master_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

# Verification
for s in segs:
    text = s['text']
    tokens = re.findall(r'\b[A-Za-z0-9_]+\b', text)
    assert s['tokenCount'] == len(tokens), f"Mismatch in seg {s['orderIndex']}"
    ipa = s['ipaUs']
    assert ipa.startswith('/') and ipa.endswith('/'), f"Bad IPA wrapper: {ipa}"
    # Remove any punctuation from IPA if present
    cleaned_ipa = '/' + re.sub(r'[,.;:!?]', '', ipa[1:-1]).strip() + '/'
    # Ensure single spaces
    cleaned_ipa = '/' + ' '.join(cleaned_ipa[1:-1].split()) + '/'
    s['ipaUs'] = cleaned_ipa

print(f"Verified {len(segs)} segments.")

quiz_ts = '''import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for National Geographic: Renewable Energy 101
 */
export const QUIZ_NATGEO_RENEWABLE_ENERGY: VideoQuizData = {
  lessonId: "vid_ielts_environmental_sustainability",
  lessonTitle: "National Geographic: Renewable Energy 101",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
      id: "q_natgeo_renewable_1",
      question: "According to National Geographic, what defines renewable energy and sets it apart from conventional energy sources?",
      questionEn: "According to National Geographic, what defines renewable energy and sets it apart from conventional energy sources?",
      questionVi: "Theo National Geographic, điều gì định nghĩa năng lượng tái tạo và tạo nên sự khác biệt so với các nguồn năng lượng truyền thống?",
      options: [
        "It is generated from natural sources that replenish themselves and never run out (solar, wind, hydro, geothermal, biomass).",
        "It requires heavy continuous extraction of petroleum reserves and radioactive minerals.",
        "It relies exclusively on nuclear fission in pressurized reactors deep underground.",
        "It can only be produced during heavy industrial chemical processing in synthetic refineries.",
      ],
      optionsEn: [
        "It is generated from natural sources that replenish themselves and never run out (solar, wind, hydro, geothermal, biomass).",
        "It requires heavy continuous extraction of petroleum reserves and radioactive minerals.",
        "It relies exclusively on nuclear fission in pressurized reactors deep underground.",
        "It can only be produced during heavy industrial chemical processing in synthetic refineries.",
      ],
      optionsVi: [
        "Nó được tạo ra từ các nguồn tự nhiên tự phục hồi và không bao giờ cạn kiệt (mặt trời, gió, thủy điện, địa nhiệt, sinh khối).",
        "Nó đòi hỏi phải khai thác liên tục các mỏ dầu mỏ và khoáng sản phóng xạ.",
        "Nó hoàn toàn dựa vào phản ứng phân hạch hạt nhân trong các lò phản ứng áp lực sâu dưới lòng đất.",
        "Nó chỉ có thể được sản xuất trong các quy trình xử lý hóa chất công nghiệp nặng tại các nhà máy tinh chế tổng hợp.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 4 & 5, the documentary explains: "Renewable energy is generated from sources that naturally replenish themselves and never run out. The most common sources are solar, wind, hydro, geothermal, and biomass."',
      explanationEn: 'In Segments 4 & 5, the documentary explains: "Renewable energy is generated from sources that naturally replenish themselves and never run out. The most common sources are solar, wind, hydro, geothermal, and biomass."',
      explanationVi: 'Trong các câu 4 & 5, phóng sự giải thích: "Năng lượng tái tạo được tạo ra từ các nguồn tự nhiên tự phục hồi và không bao giờ cạn kiệt. Các nguồn phổ biến nhất là năng lượng mặt trời, gió, thủy điện, địa nhiệt và sinh khối."',
      referenceSegmentIndex: 4,
      targetedConcept: "Định nghĩa cốt lõi & 5 nguồn năng lượng tái tạo chính (Core Definition & Five Main Renewable Sources)",
      targetedConceptEn: "Core Definition & Five Main Renewable Sources",
      targetedConceptVi: "Định nghĩa cốt lõi & 5 nguồn năng lượng tái tạo chính",
    },
    {
      id: "q_natgeo_renewable_2",
      question: "What percentage of global energy consumed by humans currently comes from fossil fuels, and how fast are renewables growing?",
      questionEn: "What percentage of global energy consumed by humans currently comes from fossil fuels, and how fast are renewables growing?",
      questionVi: "Bao nhiêu phần trăm tổng năng lượng con người tiêu thụ trên toàn cầu hiện nay bắt nguồn từ nhiên liệu hóa thạch, và năng lượng tái tạo đang tăng trưởng nhanh thế nào?",
      options: [
        "Over 80 percent is derived from fossil fuels, but renewables are the fastest growing source of energy in the world.",
        "Exactly 50 percent is fossil fuels, with solar taking over all maritime transport.",
        "Less than 20 percent comes from fossil fuels as nuclear power dominates world grids.",
        "Almost 99 percent is coal-powered with zero annual growth in clean technology.",
      ],
      optionsEn: [
        "Over 80 percent is derived from fossil fuels, but renewables are the fastest growing source of energy in the world.",
        "Exactly 50 percent is fossil fuels, with solar taking over all maritime transport.",
        "Less than 20 percent comes from fossil fuels as nuclear power dominates world grids.",
        "Almost 99 percent is coal-powered with zero annual growth in clean technology.",
      ],
      optionsVi: [
        "Hơn 80% có nguồn gốc từ nhiên liệu hóa thạch, nhưng năng lượng tái tạo đang là nguồn năng lượng tăng trưởng nhanh nhất trên thế giới.",
        "Chính xác 50% là nhiên liệu hóa thạch, với năng lượng mặt trời đã tiếp quản toàn bộ vận tải hàng hải.",
        "Ít hơn 20% đến từ nhiên liệu hóa thạch vì điện hạt nhân đang thống trị lưới điện thế giới.",
        "Gần 99% chạy bằng than đá và không có mức tăng trưởng hàng năm nào trong công nghệ sạch.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 6 & 7, the documentary highlights: "Over 80 percent of the total energy consumed by humans is derived from fossil fuels. However, renewables are the fastest growing source of energy in the world."',
      explanationEn: 'In Segments 6 & 7, the documentary highlights: "Over 80 percent of the total energy consumed by humans is derived from fossil fuels. However, renewables are the fastest growing source of energy in the world."',
      explanationVi: 'Trong các câu 6 & 7, phóng sự nêu rõ: "Hơn 80% tổng năng lượng con người tiêu thụ có nguồn gốc từ nhiên liệu hóa thạch. Tuy nhiên, năng lượng tái tạo đang là nguồn năng lượng tăng trưởng nhanh nhất trên thế giới."',
      referenceSegmentIndex: 6,
      targetedConcept: "Cơ cấu năng lượng toàn cầu & Tốc độ tăng trưởng (Global Energy Mix & Growth Velocity)",
      targetedConceptEn: "Global Energy Mix & Growth Velocity",
      targetedConceptVi: "Cơ cấu năng lượng toàn cầu & Tốc độ tăng trưởng",
    },
    {
      id: "q_natgeo_renewable_3",
      question: "Why does renewable energy have a significant advantage in combating climate change, and what type of emissions do renewables produce?",
      questionEn: "Why does renewable energy have a significant advantage in combating climate change, and what type of emissions do renewables produce?",
      questionVi: "Tại sao năng lượng tái tạo lại có ưu thế vượt trội trong việc chống lại biến đổi khí hậu, và các nguồn này tạo ra loại phát thải nào?",
      options: [
        "They create no direct greenhouse gas emissions, producing only minimal indirect emissions from manufacturing and maintenance.",
        "They create massive direct greenhouse gases during power generation to heat urban homes.",
        "They permanently trap solar radiation beneath the atmospheric ozone layer.",
        "They double the carbon dioxide emissions of modern gas turbines.",
      ],
      optionsEn: [
        "They create no direct greenhouse gas emissions, producing only minimal indirect emissions from manufacturing and maintenance.",
        "They create massive direct greenhouse gases during power generation to heat urban homes.",
        "They permanently trap solar radiation beneath the atmospheric ozone layer.",
        "They double the carbon dioxide emissions of modern gas turbines.",
      ],
      optionsVi: [
        "Chúng không tạo ra phát thải khí nhà kính trực tiếp, mà chỉ phát sinh lượng khí thải gián tiếp rất nhỏ từ khâu sản xuất linh kiện và bảo trì.",
        "Chúng tạo ra lượng lớn khí nhà kính trực tiếp trong quá trình phát điện để sưởi ấm nhà ở đô thị.",
        "Chúng giữ vĩnh viễn bức xạ mặt trời bên dưới tầng ozone của khí quyển.",
        "Chúng làm tăng gấp đôi lượng khí thải carbon dioxide so với tuabin khí hiện đại.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 9 to 13, the narrator explains: "First, it can combat climate change, because it creates no direct greenhouse gas emissions. The only emissions that they produce are indirect, meaning those that result from manufacturing parts, installation, operation, and maintenance, but even those are minimal."',
      explanationEn: 'In Segments 9 to 13, the narrator explains: "First, it can combat climate change, because it creates no direct greenhouse gas emissions. The only emissions that they produce are indirect, meaning those that result from manufacturing parts, installation, operation, and maintenance, but even those are minimal."',
      explanationVi: 'Trong các câu 9 đến 13, người thuyết minh giải thích: "Thứ nhất, nó có thể chống lại biến đổi khí hậu vì không tạo ra khí thải nhà kính trực tiếp. Khí thải duy nhất mà chúng tạo ra là gián tiếp, nghĩa là lượng khí phát sinh từ khâu sản xuất linh kiện, lắp đặt, vận hành và bảo trì, nhưng ngay cả những tác động đó cũng ở mức tối thiểu."',
      referenceSegmentIndex: 10,
      targetedConcept: "Khí thải trực tiếp vs Phát thải gián tiếp tối thiểu (Direct vs Minimal Indirect Emissions)",
      targetedConceptEn: "Direct vs Minimal Indirect Emissions",
      targetedConceptVi: "Khí thải trực tiếp vs Phát thải gián tiếp tối thiểu",
    },
    {
      id: "q_natgeo_renewable_4",
      question: "Which renewable energy systems produce zero air pollution emissions during operation?",
      questionEn: "Which renewable energy systems produce zero air pollution emissions during operation?",
      questionVi: "Những hệ thống năng lượng tái tạo nào hoàn toàn không tạo ra khí thải gây ô nhiễm không khí trong quá trình vận hành?",
      options: [
        "Wind, solar, and hydroelectric systems.",
        "Coal-fired boilers and petroleum furnaces.",
        "Large commercial jet engines and diesel generators.",
        "Synthetic plastics incinerators.",
      ],
      optionsEn: [
        "Wind, solar, and hydroelectric systems.",
        "Coal-fired boilers and petroleum furnaces.",
        "Large commercial jet engines and diesel generators.",
        "Synthetic plastics incinerators.",
      ],
      optionsVi: [
        "Các hệ thống điện gió, điện mặt trời và thủy điện.",
        "Các lò hơi đốt than và lò sưởi dầu mỏ.",
        "Các động cơ máy bay thương mại cỡ lớn và máy phát điện diesel.",
        "Các lò đốt rác thải nhựa tổng hợp.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 16 & 17, the documentary states: "Wind, solar, and hydroelectric systems create no air pollution emissions, and geothermal and biomass energy systems emissions are much lower than non-renewable energy sources."',
      explanationEn: 'In Segments 16 & 17, the documentary states: "Wind, solar, and hydroelectric systems create no air pollution emissions, and geothermal and biomass energy systems emissions are much lower than non-renewable energy sources."',
      explanationVi: 'Trong các câu 16 & 17, phóng sự khẳng định: "Các hệ thống điện gió, điện mặt trời và thủy điện không tạo ra khí thải gây ô nhiễm không khí, và lượng khí thải từ các hệ thống địa nhiệt và sinh khối thấp hơn nhiều so với các nguồn không tái tạo."',
      referenceSegmentIndex: 16,
      targetedConcept: "Không phát thải ô nhiễm không khí (Zero Air Pollution Emissions)",
      targetedConceptEn: "Zero Air Pollution Emissions",
      targetedConceptVi: "Không phát thải ô nhiễm không khí",
    },
    {
      id: "q_natgeo_renewable_5",
      question: "Why do renewable energy prices tend to remain stable over time once facilities are built?",
      questionEn: "Why do renewable energy prices tend to remain stable over time once facilities are built?",
      questionVi: "Tại sao giá năng lượng tái tạo có xu hướng duy trì ổn định theo thời gian một khi các cơ sở hạ tầng đã được xây dựng?",
      options: [
        "Because facilities cost very little to operate and the natural fuel is often free.",
        "Because international oil cartels fix electricity tariffs by international treaties.",
        "Because governments artificially subsidize 100% of consumer utility bills indefinitely.",
        "Because renewable power stations can only operate for one month per decade.",
      ],
      optionsEn: [
        "Because facilities cost very little to operate and the natural fuel is often free.",
        "Because international oil cartels fix electricity tariffs by international treaties.",
        "Because governments artificially subsidize 100% of consumer utility bills indefinitely.",
        "Because renewable power stations can only operate for one month per decade.",
      ],
      optionsVi: [
        "Bởi vì các cơ sở tốn rất ít chi phí vận hành và nguồn nhiên liệu tự nhiên thường hoàn toàn miễn phí.",
        "Bởi vì các tổ chức độc quyền dầu mỏ quốc tế ấn định biểu giá điện theo các hiệp ước quốc tế.",
        "Bởi vì các chính phủ trợ cấp nhân tạo 100% hóa đơn tiện ích của người tiêu dùng vô thời hạn.",
        "Bởi vì các nhà máy năng lượng tái tạo chỉ có thể hoạt động một tháng mỗi thập kỷ.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 20, 21 & 22, the narrator notes: "Once built, renewable facilities cost very little to operate, and the fuel is often free. As a result, renewable energy prices tend to be stable over time."',
      explanationEn: 'In Segments 20, 21 & 22, the narrator notes: "Once built, renewable facilities cost very little to operate, and the fuel is often free. As a result, renewable energy prices tend to be stable over time."',
      explanationVi: 'Trong các câu 20, 21 & 22, người thuyết minh giải thích: "Một khi đã được xây dựng, các cơ sở năng lượng tái tạo tốn rất ít chi phí vận hành, và nhiên liệu thường hoàn toàn miễn phí. Kết quả là, giá năng lượng tái tạo có xu hướng ổn định theo thời gian."',
      referenceSegmentIndex: 20,
      targetedConcept: "Tính ổn định kinh tế & Nhiên liệu tự nhiên miễn phí (Economic Price Stability & Free Natural Fuel)",
      targetedConceptEn: "Economic Price Stability & Free Natural Fuel",
      targetedConceptVi: "Tính ổn định kinh tế & Nhiên liệu tự nhiên miễn phí",
    },
    {
      id: "q_natgeo_renewable_6",
      question: "What specific environmental and ecological downsides of wind farms and dams are discussed in Segments 25 & 26?",
      questionEn: "What specific environmental and ecological downsides of wind farms and dams are discussed in Segments 25 & 26?",
      questionVi: "Những tác động tiêu cực cụ thể về mặt môi trường và sinh thái của trang trại gió và đập thủy điện được thảo luận trong các câu 25 & 26 là gì?",
      options: [
        "They can disrupt wildlife and migration patterns and lead to ecological destruction.",
        "They create radioactive fallout that poisons local groundwater for centuries.",
        "They cause immediate seismic earthquakes whenever wind speed exceeds ten knots.",
        "They absorb cosmic rays and heat river waters to boiling temperatures.",
      ],
      optionsEn: [
        "They can disrupt wildlife and migration patterns and lead to ecological destruction.",
        "They create radioactive fallout that poisons local groundwater for centuries.",
        "They cause immediate seismic earthquakes whenever wind speed exceeds ten knots.",
        "They absorb cosmic rays and heat river waters to boiling temperatures.",
      ],
      optionsVi: [
        "Chúng có thể làm gián đoạn đời sống hoang dã, đường di cư của động vật và dẫn đến suy thoái sinh thái.",
        "Chúng tạo ra bụi phóng xạ làm nhiễm độc nguồn nước ngầm địa phương trong nhiều thế kỷ.",
        "Chúng gây ra các trận động đất địa chấn tức thì bất cứ khi nào tốc độ gió vượt quá mười hải lý.",
        "Chúng hấp thụ các tia vũ trụ và làm nóng nước sông đến nhiệt độ sôi.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 25 & 26, the narrator observes: "Building wind farms and dams can disrupt wildlife and migration patterns, and lead to ecological destruction."',
      explanationEn: 'In Segments 25 & 26, the narrator observes: "Building wind farms and dams can disrupt wildlife and migration patterns, and lead to ecological destruction."',
      explanationVi: 'Trong các câu 25 & 26, người thuyết minh chỉ ra: "Việc xây dựng các trang trại gió và đập thủy điện có thể làm gián đoạn đời sống hoang dã, đường di cư của động vật và dẫn đến suy thoái sinh thái."',
      referenceSegmentIndex: 25,
      targetedConcept: "Tác động sinh thái & Xáo trộn đời sống hoang dã (Ecological Impact & Wildlife Disruption)",
      targetedConceptEn: "Ecological Impact & Wildlife Disruption",
      targetedConceptVi: "Tác động sinh thái & Xáo trộn đời sống hoang dã",
    },
    {
      id: "q_natgeo_renewable_7",
      question: "What major operational challenge do solar and wind energy face, and what is the current limitation of using batteries to solve it?",
      questionEn: "What major operational challenge do solar and wind energy face, and what is the current limitation of using batteries to solve it?",
      questionVi: "Năng lượng mặt trời và năng lượng gió đối mặt với thách thức vận hành lớn nào, và hạn chế hiện tại của việc dùng pin lưu trữ là gì?",
      options: [
        "They are intermittent because power is only generated when the sun shines or wind blows, while storage batteries remain costly.",
        "They emit toxic radiation during storms and damage the electrical power grid.",
        "They consume more electrical fuel than they produce in any given seasonal cycle.",
        "They completely deplete groundwater reservoirs around nearby residential areas.",
      ],
      optionsEn: [
        "They are intermittent because power is only generated when the sun shines or wind blows, while storage batteries remain costly.",
        "They emit toxic radiation during storms and damage the electrical power grid.",
        "They consume more electrical fuel than they produce in any given seasonal cycle.",
        "They completely deplete groundwater reservoirs around nearby residential areas.",
      ],
      optionsVi: [
        "Chúng có tính gián đoạn vì chỉ phát điện khi có ánh nắng mặt trời hoặc gió thổi, trong khi pin lưu trữ hiện vẫn rất đắt đỏ.",
        "Chúng phát ra bức xạ độc hại trong các cơn bão và làm hỏng lưới điện.",
        "Chúng tiêu thụ nhiều nhiên liệu điện hơn mức chúng tạo ra trong bất kỳ chu kỳ mùa nào.",
        "Chúng làm cạn kiệt hoàn toàn các tầng chứa nước ngầm quanh các khu dân cư lân cận.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 27 to 30, the documentary highlights: "Both solar and wind energy are intermittent; they only generate power while the sun is shining or while the wind is blowing. Batteries can store excess energy for later use; however, they are often costly."',
      explanationEn: 'In Segments 27 to 30, the documentary highlights: "Both solar and wind energy are intermittent; they only generate power while the sun is shining or while the wind is blowing. Batteries can store excess energy for later use; however, they are often costly."',
      explanationVi: 'Trong các câu 27 đến 30, phóng sự chỉ rõ: "Cả năng lượng mặt trời và năng lượng gió đều có tính gián đoạn; chúng chỉ phát điện khi có ánh nắng mặt trời hoặc khi có gió thổi. Pin lưu trữ có thể tích trữ năng lượng dư thừa để sử dụng sau; tuy nhiên, chúng thường rất đắt đỏ."',
      referenceSegmentIndex: 27,
      targetedConcept: "Tính gián đoạn & Chi phí pin lưu trữ (Energy Intermittency & Battery Storage Costs)",
      targetedConceptEn: "Energy Intermittency & Battery Storage Costs",
      targetedConceptVi: "Tính gián đoạn & Chi phí pin lưu trữ",
    },
    {
      id: "q_natgeo_renewable_8",
      question: "According to the conclusion, what technological improvements will bring an end to climate change within human reach?",
      questionEn: "According to the conclusion, what technological improvements will bring an end to climate change within human reach?",
      questionVi: "Theo kết luận của phóng sự, những cải tiến công nghệ nào sẽ đưa mục tiêu chấm dứt biến đổi khí hậu vào tầm với của con người?",
      options: [
        "Advances in technology that make renewable energy more accessible, affordable, and efficient.",
        "Abandoning renewable energy in favor of deep-sea oil drilling technologies.",
        "Building artificial space mirrors to permanently block incoming sunlight.",
        "Constructing coal power stations with taller smoke stacks to disperse soot.",
      ],
      optionsEn: [
        "Advances in technology that make renewable energy more accessible, affordable, and efficient.",
        "Abandoning renewable energy in favor of deep-sea oil drilling technologies.",
        "Building artificial space mirrors to permanently block incoming sunlight.",
        "Constructing coal power stations with taller smoke stacks to disperse soot.",
      ],
      optionsVi: [
        "Những bước tiến công nghệ giúp năng lượng tái tạo trở nên dễ tiếp cận hơn (accessible), giá cả phải chăng hơn (affordable) và hiệu quả hơn (efficient).",
        "Từ bỏ năng lượng tái tạo để chuyển sang các công nghệ khoan dầu biển sâu.",
        "Xây dựng những tấm gương không gian nhân tạo để chặn vĩnh viễn ánh sáng mặt trời chiếu tới.",
        "Xây dựng các nhà máy nhiệt điện than với ống khói cao hơn để phân tán muội than.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 33 & 34, the video concludes: "And as advances in technology make renewable energy more accessible, affordable, and efficient, an end to climate change could be within our reach."',
      explanationEn: 'In Segments 33 & 34, the video concludes: "And as advances in technology make renewable energy more accessible, affordable, and efficient, an end to climate change could be within our reach."',
      explanationVi: 'Trong các câu 33 & 34, video kết luận: "Và khi những bước tiến công nghệ giúp năng lượng tái tạo trở nên dễ tiếp cận hơn, giá cả phải chăng hơn và hiệu quả hơn, việc chấm dứt biến đổi khí hậu hoàn toàn có thể nằm trong tầm tay của chúng ta."',
      referenceSegmentIndex: 33,
      targetedConcept: "Tiến bộ công nghệ & Mục tiêu trong tầm tay (Technological Advances: Accessible, Affordable, Efficient)",
      targetedConceptEn: "Technological Advances: Accessible, Affordable, Efficient",
      targetedConceptVi: "Tiến bộ công nghệ & Mục tiêu trong tầm tay",
    },
  ],
  generatedBy: "CONTEXTUAL_FALLBACK",
};
'''

lesson_header = '''/**
 * National Geographic: Renewable Energy 101
 * Slug: ielts-listening-environmental-sustainability
 * External ID: 1kUE0BZtTRc
 * 100% Calibrated Verbatim from YouTube Audio & Official Subtitles
 */
export const LESSON_NATGEO_RENEWABLE_ENERGY: MockVideoLesson = {
  id: "vid_ielts_environmental_sustainability",
  slug: "ielts-listening-environmental-sustainability",
  title: "National Geographic: Renewable Energy 101",
  description: "Khám phá khoa học năng lượng tái tạo: cơ chế 5 nguồn năng lượng sạch (mặt trời, gió, thủy điện, địa nhiệt, sinh khối), lợi ích đẩy lùi biến đổi khí hậu và thách thức lưu trữ pin.",
  sourceType: "YOUTUBE",
  externalId: "1kUE0BZtTRc",
  thumbnailUrl: "https://img.youtube.com/vi/1kUE0BZtTRc/hqdefault.jpg",
  durationSeconds: 196,
  durationFormatted: "03:16",
  cefrLevel: "B2",
  supportedTypes: "BOTH",
  categoryId: "cat_ielts_listen",
  categorySlug: "ielts-listening",
  categoryName: "IELTS Nghe & Thuyết Trình",
  accent: "en-US",
  wpmSpeed: 145,
  viewCount: 3840,
  studyCount: 1450,
  quiz: QUIZ_NATGEO_RENEWABLE_ENERGY,
  segments: [
'''

lines = [quiz_ts, lesson_header]

for s in segs:
    seg_entry = f"""    {{
      orderIndex: {s['orderIndex']},
      startTime: {s['startTime']},
      endTime: {s['endTime']},
      text: {json.dumps(s['text'], ensure_ascii=False)},
      translationVi: {json.dumps(s['translationVi'], ensure_ascii=False)},
      ipaUs: {json.dumps(s['ipaUs'], ensure_ascii=False)},
      properNouns: {json.dumps(s['properNouns'], ensure_ascii=False)},
      keywords: {json.dumps(s['keywords'], ensure_ascii=False)},
      explanationAi: {json.dumps(s['explanationAi'], ensure_ascii=False)},
      tokenCount: {s['tokenCount']},
    }},
"""
    lines.append(seg_entry)

lines.append("  ],\n};\n")

content = "".join(lines)

with open('features/listening/data/lessons/lesson_natgeo_renewable_energy.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully written features/listening/data/lessons/lesson_natgeo_renewable_energy.ts")

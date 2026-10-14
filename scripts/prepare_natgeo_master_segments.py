import json
import re

# Load CMUDict
ARPABET_TO_IPA = {
    'AA': 'ɑː', 'AA0': 'ɑː', 'AA1': 'ˈɑː', 'AA2': 'ˌɑː',
    'AE': 'æ',  'AE0': 'æ',  'AE1': 'ˈæ',  'AE2': 'ˌæ',
    'AH': 'ʌ',  'AH0': 'ə',  'AH1': 'ˈʌ',  'AH2': 'ˌʌ',
    'AO': 'ɔː', 'AO0': 'ɔː', 'AO1': 'ˈɔː', 'AO2': 'ˌɔː',
    'AW': 'aʊ', 'AW0': 'aʊ', 'AW1': 'ˈaʊ', 'AW2': 'ˌaʊ',
    'AY': 'aɪ', 'AY0': 'aɪ', 'AY1': 'ˈaɪ', 'AY2': 'ˌaɪ',
    'B': 'b',
    'CH': 'tʃ',
    'D': 'd',
    'DH': 'ð',
    'EH': 'e',  'EH0': 'e',  'EH1': 'ˈe',  'EH2': 'ˌe',
    'ER': 'ɜːr', 'ER0': 'ər', 'ER1': 'ˈɜːr', 'ER2': 'ˌɜːr',
    'EY': 'eɪ', 'EY0': 'eɪ', 'EY1': 'ˈeɪ', 'EY2': 'ˌeɪ',
    'F': 'f',
    'G': 'ɡ',
    'HH': 'h',
    'IH': 'ɪ',  'IH0': 'ɪ',  'IH1': 'ˈɪ',  'IH2': 'ˌɪ',
    'IY': 'iː', 'IY0': 'i',  'IY1': 'ˈiː', 'IY2': 'ˌiː',
    'JH': 'dʒ',
    'K': 'k',
    'L': 'l',
    'M': 'm',
    'N': 'n',
    'NG': 'ŋ',
    'OW': 'oʊ', 'OW0': 'oʊ', 'OW1': 'ˈoʊ', 'OW2': 'ˌoʊ',
    'OY': 'ɔɪ', 'OY0': 'ɔɪ', 'OY1': 'ˈɔɪ', 'OY2': 'ˌɔɪ',
    'P': 'p',
    'R': 'r',
    'S': 's',
    'SH': 'ʃ',
    'T': 't',
    'TH': 'θ',
    'UH': 'ʊ',  'UH0': 'ʊ',  'UH1': 'ˈʊ',  'UH2': 'ˌʊ',
    'UW': 'uː', 'UW0': 'u',  'UW1': 'ˈuː', 'UW2': 'ˌuː',
    'V': 'v',
    'W': 'w',
    'Y': 'j',
    'Z': 'z',
    'ZH': 'ʒ'
}

cmu_map = {}
with open('scripts/cmudict.dict', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'): continue
        parts = line.split()
        word = parts[0].lower()
        word = re.sub(r'\(\d+\)$', '', word)
        phones = parts[1:]
        ipa_parts = []
        stress = ''
        for p in phones:
            ipa_char = ARPABET_TO_IPA.get(p, '')
            if ipa_char.startswith('ˈ'):
                stress = 'ˈ'
                ipa_char = ipa_char[1:]
            elif ipa_char.startswith('ˌ'):
                if not stress: stress = 'ˌ'
                ipa_char = ipa_char[1:]
            ipa_parts.append(ipa_char)
        full_ipa = stress + ''.join(ipa_parts)
        if word not in cmu_map:
            cmu_map[word] = full_ipa

manual_ipa = {
    'natgeo': 'ˌnæt ˈdʒiːoʊ',
    'hydroelectric': 'ˌhaɪdroʊɪˈlektrɪk',
    'geothermal': 'ˌdʒiːoʊˈθɜːrml',
    'biomass': 'ˈbaɪoʊmæs',
    'nonrenewable': 'ˌnɑːnrɪˈnuːəbl',
    'intermittent': 'ˌɪntərˈmɪtənt',
    'emissions': 'ɪˈmɪʃnz',
    'replenish': 'rɪˈplenɪʃ',
    'combating': 'kəmˈbætɪŋ',
    'accessible': 'əkˈsesəbl',
    'environmentally': 'ɪnˌvaɪrənˈmentəli'
}
cmu_map.update(manual_ipa)

def text_to_ipa(sentence):
    raw_words = re.findall(r"\b[A-Za-z0-9_'–-]+\b", sentence)
    ipa_tokens = []
    for w in raw_words:
        w_clean = w.lower().replace("'", "").replace('-', '')
        w_orig = w.lower()
        if w_orig in cmu_map:
            ipa_tokens.append(cmu_map[w_orig])
        elif w_clean in cmu_map:
            ipa_tokens.append(cmu_map[w_clean])
        else:
            parts = w.lower().split('-')
            part_ipas = [cmu_map.get(p, p) for p in parts if p]
            if part_ipas:
                ipa_tokens.append(' '.join(part_ipas))
            else:
                ipa_tokens.append(w_clean)
    return '/' + ' '.join(ipa_tokens) + '/'

# 33 Master Segments covering 00:01.20 to 03:00.00
segments_spec = [
    {
        "start": 1.20, "end": 6.00,
        "text": "Around the world, renewable energy use is on the rise,",
        "vi": "Trên khắp thế giới, việc sử dụng năng lượng tái tạo đang ngày càng gia tăng,",
        "properNouns": [],
        "keywords": ["around the world", "renewable energy", "on the rise"],
        "explanationAi": "Thành ngữ 'on the rise' có nghĩa là đang gia tăng, ngày một phổ biến hơn trên toàn cầu."
    },
    {
        "start": 6.00, "end": 12.50,
        "text": "and these alternative energy sources could hold the key to combating climate change.",
        "vi": "và những nguồn năng lượng thay thế này có thể nắm giữ chìa khóa then chốt để chống lại biến đổi khí hậu.",
        "properNouns": [],
        "keywords": ["alternative energy", "hold the key", "combating", "climate change"],
        "explanationAi": "Cụm 'hold the key to something' nghĩa là nắm giữ giải pháp quyết định, chìa khóa giải quyết vấn đề."
    },
    {
        "start": 17.20, "end": 20.00,
        "text": "What is renewable energy?",
        "vi": "Năng lượng tái tạo là gì?",
        "properNouns": [],
        "keywords": ["renewable energy"],
        "explanationAi": "Câu hỏi tu từ mở đầu dẫn nhập vào định nghĩa khoa học cốt lõi của bài học."
    },
    {
        "start": 20.00, "end": 26.80,
        "text": "Renewable energy is generated from sources that naturally replenish themselves and never run out.",
        "vi": "Năng lượng tái tạo được tạo ra từ các nguồn tự nhiên tự phục hồi và không bao giờ cạn kiệt.",
        "properNouns": [],
        "keywords": ["generated", "naturally replenish", "run out"],
        "explanationAi": "Động từ 'replenish' nghĩa là tự làm đầy lại, tái sinh tự nhiên. 'Run out' là cụm động từ chỉ sự cạn kiệt."
    },
    {
        "start": 26.80, "end": 34.60,
        "text": "The most common sources are solar, wind, hydro, geothermal, and biomass.",
        "vi": "Các nguồn phổ biến nhất là năng lượng mặt trời, gió, thủy điện, địa nhiệt và sinh khối.",
        "properNouns": [],
        "keywords": ["solar", "wind", "hydro", "geothermal", "biomass"],
        "explanationAi": "Năm nguồn năng lượng sạch kinh điển: solar (mặt trời), wind (gió), hydro (thủy điện), geothermal (địa nhiệt) và biomass (sinh khối)."
    },
    {
        "start": 34.60, "end": 41.00,
        "text": "Over 80 percent of the total energy consumed by humans is derived from fossil fuels.",
        "vi": "Hơn 80% tổng năng lượng con người tiêu thụ bắt nguồn từ nhiên liệu hóa thạch.",
        "properNouns": [],
        "keywords": ["total energy", "consumed", "derived from", "fossil fuels"],
        "explanationAi": "Cụm 'derived from' nghĩa là bắt nguồn từ, được chiết xuất từ. 'Fossil fuels' là nhiên liệu hóa thạch (than đá, dầu mỏ, khí đốt)."
    },
    {
        "start": 41.00, "end": 47.40,
        "text": "However, renewables are the fastest growing source of energy in the world.",
        "vi": "Tuy nhiên, năng lượng tái tạo đang là nguồn năng lượng tăng trưởng nhanh nhất trên thế giới.",
        "properNouns": [],
        "keywords": ["renewables", "fastest growing", "source of energy"],
        "explanationAi": "Danh từ số nhiều 'renewables' được dùng phổ biến để chỉ chung các nguồn năng lượng tái tạo."
    },
    {
        "start": 47.40, "end": 51.00,
        "text": "Renewable energy has many benefits.",
        "vi": "Năng lượng tái tạo mang lại rất nhiều lợi ích.",
        "properNouns": [],
        "keywords": ["benefits"],
        "explanationAi": "Câu chuyển đoạn ngắn gọn nêu bật luận điểm về các lợi ích sinh thái và kinh tế."
    },
    {
        "start": 51.00, "end": 54.00,
        "text": "First, it can combat climate change,",
        "vi": "Thứ nhất, nó có thể chống lại biến đổi khí hậu,",
        "properNouns": [],
        "keywords": ["first", "combat", "climate change"],
        "explanationAi": "Động từ 'combat' (chiến đấu, đẩy lùi, chống lại) dùng thường xuyên trong các chủ đề môi trường học thuật."
    },
    {
        "start": 54.00, "end": 57.80,
        "text": "because it creates no direct greenhouse gas emissions.",
        "vi": "bởi vì nó không tạo ra phát thải khí nhà kính trực tiếp.",
        "properNouns": [],
        "keywords": ["creates", "direct", "greenhouse gas emissions"],
        "explanationAi": "'Greenhouse gas emissions' là cụm danh từ chuyên ngành chỉ lượng khí thải gây hiệu ứng nhà kính (CO2, metan)."
    },
    {
        "start": 57.80, "end": 61.20,
        "text": "The only emissions that they produce are indirect,",
        "vi": "Khí thải duy nhất mà chúng tạo ra là gián tiếp,",
        "properNouns": [],
        "keywords": ["emissions", "produce", "indirect"],
        "explanationAi": "Tính từ 'indirect' đối lập với 'direct', chỉ các tác động gián tiếp từ quy trình sản xuất cơ sở hạ tầng."
    },
    {
        "start": 61.20, "end": 67.10,
        "text": "meaning those that result from manufacturing parts, installation, operation, and maintenance,",
        "vi": "nghĩa là những phát thải phát sinh từ quá trình chế tạo linh kiện, lắp đặt, vận hành và bảo trì,",
        "properNouns": [],
        "keywords": ["result from", "manufacturing parts", "installation", "operation", "maintenance"],
        "explanationAi": "Bốn giai đoạn vòng đời thiết bị: manufacturing (chế tạo), installation (lắp đặt), operation (vận hành) và maintenance (bảo dưỡng)."
    },
    {
        "start": 67.10, "end": 70.10,
        "text": "but even those are minimal.",
        "vi": "nhưng ngay cả những phát thải đó cũng là tối thiểu.",
        "properNouns": [],
        "keywords": ["minimal"],
        "explanationAi": "Tính từ 'minimal' nghĩa là rất nhỏ, ở mức tối thiểu không đáng kể."
    },
    {
        "start": 70.10, "end": 73.99,
        "text": "Second, renewable energy can decrease pollution,",
        "vi": "Thứ hai, năng lượng tái tạo có thể làm giảm thiểu ô nhiễm,",
        "properNouns": [],
        "keywords": ["second", "decrease pollution"],
        "explanationAi": "Liên từ chuyển ý 'Second' mở ra luận điểm về giảm ô nhiễm môi trường."
    },
    {
        "start": 74.00, "end": 77.00,
        "text": "and therefore reduce threats to our health.",
        "vi": "và do đó làm giảm các mối đe dọa đối với sức khỏe của chúng ta.",
        "properNouns": [],
        "keywords": ["therefore", "reduce threats", "health"],
        "explanationAi": "Trạng từ 'therefore' chỉ hệ quả tất yếu. 'Reduce threats to health' là giảm thiểu nguy cơ bệnh tật."
    },
    {
        "start": 77.00, "end": 82.80,
        "text": "Wind, solar, and hydroelectric systems create no air pollution emissions,",
        "vi": "Hệ thống điện gió, mặt trời và thủy điện hoàn toàn không tạo ra khí thải gây ô nhiễm không khí,",
        "properNouns": [],
        "keywords": ["wind", "solar", "hydroelectric", "air pollution emissions"],
        "explanationAi": "'Hydroelectric systems' chỉ các hệ thống nhà máy thủy điện biến cơ năng của nước thành điện năng."
    },
    {
        "start": 82.80, "end": 90.40,
        "text": "and geothermal and biomass energy systems emissions are much lower than non-renewable energy sources.",
        "vi": "và lượng phát thải từ hệ thống năng lượng địa nhiệt cùng sinh khối thấp hơn nhiều so với các nguồn không thể tái tạo.",
        "properNouns": [],
        "keywords": ["geothermal", "biomass", "much lower", "non-renewable energy sources"],
        "explanationAi": "'Non-renewable energy sources' là nguồn năng lượng không thể tái tạo (than, dầu, khí tự nhiên)."
    },
    {
        "start": 90.40, "end": 95.50,
        "text": "Third, renewable energy is a reliable source of power.",
        "vi": "Thứ ba, năng lượng tái tạo là một nguồn năng lượng vô cùng đáng tin cậy.",
        "properNouns": [],
        "keywords": ["third", "reliable", "source of power"],
        "explanationAi": "Tính từ 'reliable' (đáng tin cậy, ổn định) dùng để khẳng định tính bền vững lâu dài."
    },
    {
        "start": 95.50, "end": 102.00,
        "text": "Because renewable energy sources are, well, renewable, they will never run out.",
        "vi": "Bởi vì các nguồn năng lượng tái tạo, à thì, có thể tái sinh, nên chúng sẽ không bao giờ cạn kiệt.",
        "properNouns": [],
        "keywords": ["renewable", "never run out"],
        "explanationAi": "Thán từ đệm 'well' tạo nhịp điệu tự nhiên hóm hỉnh khi nhấn mạnh ngay chính tên gọi 'renewable'."
    },
    {
        "start": 102.00, "end": 106.00,
        "text": "Once built, renewable facilities cost very little to operate,",
        "vi": "Một khi đã được xây dựng xong, các cơ sở năng lượng tái tạo tốn rất ít chi phí vận hành,",
        "properNouns": [],
        "keywords": ["once built", "facilities", "cost very little", "operate"],
        "explanationAi": "Cấu trúc phân từ rút gọn 'Once built' (một khi đã được dựng nên). 'Cost very little' chỉ chi phí vận hành siêu thấp."
    },
    {
        "start": 106.00, "end": 109.00,
        "text": "and the fuel is often free.",
        "vi": "và nguồn nhiên liệu đầu vào thường hoàn toàn miễn phí.",
        "properNouns": [],
        "keywords": ["fuel", "free"],
        "explanationAi": "Nhiên liệu (fuel) như ánh nắng mặt trời, gió hay dòng nước mưa là tài nguyên thiên nhiên miễn phí."
    },
    {
        "start": 109.00, "end": 114.40,
        "text": "As a result, renewable energy prices tend to be stable over time.",
        "vi": "Kết quả là, giá năng lượng tái tạo có xu hướng duy trì ổn định theo thời gian.",
        "properNouns": [],
        "keywords": ["as a result", "prices", "tend to be", "stable", "over time"],
        "explanationAi": "Cấu trúc 'tend to be stable' miêu tả xu hướng ổn định, không bị phụ thuộc vào biến động giá dầu thế giới."
    },
    {
        "start": 114.40, "end": 120.30,
        "text": "While renewable energy has many advantages, it is not without downsides.",
        "vi": "Dù năng lượng tái tạo có nhiều ưu điểm, nó không phải là không có những nhược điểm.",
        "properNouns": [],
        "keywords": ["advantages", "not without downsides"],
        "explanationAi": "Cách diễn đạt phủ định kép 'not without downsides' mang ý nghĩa khẳng định tinh tế rằng vẫn tồn tại những hạn chế nhất định."
    },
    {
        "start": 120.30, "end": 127.50,
        "text": "It is difficult for renewable energy sources to generate power on the same large scale as fossil fuels.",
        "vi": "Rất khó để các nguồn năng lượng tái tạo sản xuất điện ở quy mô lớn ngang bằng với nhiên liệu hóa thạch.",
        "properNouns": [],
        "keywords": ["generate power", "large scale", "fossil fuels"],
        "explanationAi": "Cụm 'on the same large scale as' chỉ quy mô sản xuất công nghiệp đồng mức độ."
    },
    {
        "start": 127.50, "end": 132.39,
        "text": "Building wind farms and dams can disrupt wildlife and migration patterns,",
        "vi": "Việc xây dựng các trang trại gió và đập thủy điện có thể làm xáo trộn đời sống động vật hoang dã và tập tính di cư,",
        "properNouns": [],
        "keywords": ["wind farms", "dams", "disrupt", "wildlife", "migration patterns"],
        "explanationAi": "Động từ 'disrupt' (làm gián đoạn, đảo lộn). 'Migration patterns' là quy luật/tuyến đường di cư của chim và cá."
    },
    {
        "start": 132.40, "end": 135.50,
        "text": "and lead to ecological destruction.",
        "vi": "và dẫn tới sự tàn phá hệ sinh thái.",
        "properNouns": [],
        "keywords": ["lead to", "ecological destruction"],
        "explanationAi": "'Ecological destruction' là thuật ngữ chỉ sự hủy hoại môi trường sống tự nhiên và chuỗi sinh thái."
    },
    {
        "start": 135.50, "end": 139.20,
        "text": "Both solar and wind energy are intermittent;",
        "vi": "Cả năng lượng mặt trời và gió đều mang tính gián đoạn, chập chờn;",
        "properNouns": [],
        "keywords": ["solar", "wind", "intermittent"],
        "explanationAi": "Thuật ngữ cốt lõi 'intermittent' (ngắt quãng, không liên tục) giải thích sự phụ thuộc vào điều kiện thời tiết."
    },
    {
        "start": 139.20, "end": 144.00,
        "text": "they only generate power while the sun is shining or while the wind is blowing.",
        "vi": "chúng chỉ phát điện khi trời có nắng hoặc khi gió đang thổi.",
        "properNouns": [],
        "keywords": ["generate power", "sun is shining", "wind is blowing"],
        "explanationAi": "Mệnh đề chỉ thời gian làm rõ đặc tính ngắt quãng: không có nắng ban đêm và không có gió khi trời lặng."
    },
    {
        "start": 144.00, "end": 147.80,
        "text": "Batteries can store excess energy for later use;",
        "vi": "Các hệ thống pin có thể tích trữ năng lượng dư thừa để sử dụng về sau;",
        "properNouns": [],
        "keywords": ["batteries", "store excess energy", "later use"],
        "explanationAi": "Cụm 'store excess energy' (tích trữ phần năng lượng thặng dư) qua hệ thống pin lưu trữ lithium-ion."
    },
    {
        "start": 147.80, "end": 151.20,
        "text": "however, they are often costly.",
        "vi": "tuy nhiên, chúng thường có giá thành vô cùng đắt đỏ.",
        "properNouns": [],
        "keywords": ["costly"],
        "explanationAi": "Tính từ 'costly' đồng nghĩa với 'expensive', nêu bật rào cản chi phí đầu tư ban đầu của pin tích điện."
    },
    {
        "start": 151.20, "end": 154.50,
        "text": "While renewable energy presents some challenges,",
        "vi": "Dù năng lượng tái tạo đặt ra một số thách thức,",
        "properNouns": [],
        "keywords": ["presents challenges"],
        "explanationAi": "Cụm 'present challenges' nghĩa là đưa ra, đặt ra những thử thách cần tháo gỡ."
    },
    {
        "start": 154.50, "end": 162.20,
        "text": "it also offers an environmentally friendly alternative to the greenhouse gas emissions and pollution of fossil fuels.",
        "vi": "nó cũng đem đến một giải pháp thay thế thân thiện với môi trường trước lượng khí thải nhà kính và ô nhiễm từ nhiên liệu hóa thạch.",
        "properNouns": [],
        "keywords": ["environmentally friendly alternative", "greenhouse gas emissions", "pollution", "fossil fuels"],
        "explanationAi": "'Environmentally friendly alternative' (giải pháp thay thế thân thiện môi trường) là cụm từ ăn điểm cao trong IELTS Writing/Speaking."
    },
    {
        "start": 162.20, "end": 168.87,
        "text": "And as advances in technology make renewable energy more accessible, affordable, and efficient,",
        "vi": "Và khi những bước tiến công nghệ giúp năng lượng tái tạo trở nên dễ tiếp cận hơn, giá cả phải chăng hơn và hiệu quả hơn,",
        "properNouns": [],
        "keywords": ["advances in technology", "accessible", "affordable", "efficient"],
        "explanationAi": "Bộ ba tính từ song song mô tả mục tiêu phát triển bền vững: accessible (dễ tiếp cận), affordable (hợp túi tiền) và efficient (hiệu suất cao)."
    },
    {
        "start": 168.88, "end": 173.79,
        "text": "an end to climate change could be within our reach.",
        "vi": "việc chấm dứt biến đổi khí hậu hoàn toàn có thể nằm trong tầm tay của chúng ta.",
        "properNouns": [],
        "keywords": ["climate change", "within our reach"],
        "explanationAi": "Thành ngữ 'within our reach' mang thông điệp hy vọng: hoàn toàn có thể nắm bắt và biến thành hiện thực."
    },
    {
        "start": 173.80, "end": 180.00,
        "text": "National Geographic.",
        "vi": "Kênh truyền hình National Geographic.",
        "properNouns": ["National Geographic"],
        "keywords": ["national geographic"],
        "explanationAi": "Logo định danh thương hiệu National Geographic ở phần kết thúc phóng sự khoa học."
    }
]

print(f"Total master segments: {len(segments_spec)}")

# Process each segment
processed_segments = []
for idx, seg in enumerate(segments_spec, start=1):
    text = seg["text"]
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", text)
    ipa = text_to_ipa(text)
    processed_segments.append({
        "orderIndex": idx,
        "startTime": seg["start"],
        "endTime": seg["end"],
        "text": text,
        "translationVi": seg["vi"],
        "ipaUs": ipa,
        "keywords": seg["keywords"],
        "explanationAi": seg["explanationAi"],
        "properNouns": seg["properNouns"],
        "tokenCount": len(tokens)
    })

print(f"Processed {len(processed_segments)} segments successfully.")

# Save to json file for reference
with open('scripts/natgeo_master_segments.json', 'w', encoding='utf-8') as f:
    json.dump(processed_segments, f, ensure_ascii=False, indent=2)

print("Saved to scripts/natgeo_master_segments.json")

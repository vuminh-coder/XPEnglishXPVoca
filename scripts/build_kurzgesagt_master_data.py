import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Segment map (0..99 raw lines to 58 segments)
segMap = [
  # 1..21 (raw lines 0..32)
  [0], [1, 2], [3, 4], [5, 6], [7], [8], [9, 10], [11], [12], [13],
  [14, 15], [16, 17], [18, 19], [20, 21, 22], [23], [24], [25], [26],
  [27, 28], [29], [30, 31, 32],
  # 22..58 (raw lines 33..99)
  [33, 34, 35],
  [36, 37],
  [38, 39],
  [40],
  [41],
  [42, 43],
  [44, 45],
  [46],
  [47],
  [48, 49, 50],
  [51, 52],
  [53],
  [54, 55],
  [56],
  [57, 58],
  [59, 60],
  [61, 62, 63],
  [64],
  [65],
  [66, 67],
  [68, 69],
  [70],
  [71, 72],
  [73, 74],
  [75, 76],
  [77],
  [78, 79],
  [80, 81, 82],
  [83, 84],
  [85, 86],
  [87, 88],
  [89],
  [90, 91],
  [92, 93],
  [94, 95],
  [96, 97, 98],
  [99]
]

# Read raw subtitles
with open('scripts/kurzgesagt_raw.en.json3', 'r', encoding='utf-8') as f:
    sub = json.load(f)

raw_lines = []
for e in sub.get('events', []):
    if not e.get('segs'):
        continue
    t = ''.join(s.get('utf8', '') for s in e['segs']).strip().replace('\n', ' ')
    if t:
        st = round(e['tStartMs'] / 1000.0, 2)
        et = round((e['tStartMs'] + e.get('dDurationMs', 0)) / 1000.0, 2)
        raw_lines.append({'start': st, 'end': et, 'text': t})

# Read existing 21 calibrated
with open('scripts/kurzgesagt_21_calibrated.json', 'r', encoding='utf-8') as f:
    calib_21 = json.load(f)

# Helper to normalize text
def normalize_text(text: str) -> str:
    cleaned = re.sub(r'[^a-zA-Z0-9\s]', '', text.lower())
    return re.sub(r'\s+', ' ', cleaned).strip()

def count_tokens(text: str) -> int:
    return len(re.findall(r'\b[A-Za-z0-9_]+\b', text))

# Metadata for segments 22..58:
# (translationVi, ipaUs, keywords, explanationAi, properNouns)
meta_22_58 = {
    22: {
        "text": "If you want to learn more about the mind numbing problem of war between alien civilizations, we made a video about it.",
        "translationVi": "Nếu bạn muốn tìm hiểu thêm về vấn đề nhức nhối đến tê liệt đầu óc của chiến tranh giữa các nền văn minh ngoài hành tinh, chúng tôi đã làm một video về chủ đề đó.",
        "ipaUs": "/ɪf ju wɑːnt tu lɜːrn mɔːr əˈbaʊt ðə maɪnd ˈnʌmɪŋ ˈprɑːbləm ʌv wɔːr bɪˈtwiːn ˈeɪliən ˌsɪvələˈzeɪʃənz wi meɪd ə ˈvɪdioʊ əˈbaʊt ɪt/",
        "keywords": ["mind numbing", "problem", "alien civilizations", "video"],
        "explanationAi": "Cụm tính từ ghép 'mind numbing' (gây choáng váng, tê liệt đầu óc vì quá nan giải hoặc phức tạp).",
        "properNouns": []
    },
    23: {
        "text": "Today we'll help the Smorpians construct a weapon that is not only extremely long range and as fast as physically possible,",
        "translationVi": "Hôm nay chúng ta sẽ giúp người Smorpian chế tạo một thứ vũ khí không chỉ có tầm bắn cực xa và bay nhanh nhất có thể theo quy luật vật lý,",
        "ipaUs": "/təˈdeɪ wiːl hɛlp ðə ˈsmɔːrpiənz kənˈstrʌkt ə ˈwɛpən ðæt ɪz nɑːt ˈoʊnli ɪkˈstriːmli lɔːŋ reɪndʒ ænd æz fæst æz ˈfɪzɪkli ˈpɑːsəbl/",
        "keywords": ["Smorpians", "construct", "weapon", "extremely", "long range", "physically possible"],
        "explanationAi": "Cấu trúc 'not only... but (also)...' nhấn mạnh hai đặc tính vượt trội: tầm bắn cực xa và vận tốc tiệm cận giới hạn vật lý.",
        "properNouns": ["Smorpians"]
    },
    24: {
        "text": "but that will totally destroy everything on Earth, so no human survivors will come to an act of vengeance on swap in the future.",
        "translationVi": "mà còn hủy diệt hoàn toàn mọi thứ trên Trái Đất, để không người sống sót nào có thể quay lại trả thù trong tương lai.",
        "ipaUs": "/bʌt ðæt wɪl ˈtoʊtəli dɪˈstrɔɪ ˈɛvriˌθɪŋ ɑːn ɜːrθ soʊ noʊ ˈhjuːmən sərˈvaɪvərz wɪl kʌm tu ən ækt ʌv ˈvɛndʒəns ɑːn swɑːp ɪn ðə ˈfjuːtʃər/",
        "keywords": ["totally destroy", "Earth", "survivors", "act of vengeance", "future"],
        "explanationAi": "Cụm danh từ 'act of vengeance' (hành vi trả thù, báo thù) và danh từ 'survivors' (những người sống sót).",
        "properNouns": ["Earth"]
    },
    25: {
        "text": "In interstellar war, you want to win with one shot.",
        "translationVi": "Trong chiến tranh liên sao, bạn luôn muốn giành chiến thắng chỉ bằng một phát bắn duy nhất.",
        "ipaUs": "/ɪn ˌɪntərˈstɛlər wɔːr ju wɑːnt tu wɪn wɪð wʌn ʃɑːt/",
        "keywords": ["interstellar war", "win", "one shot"],
        "explanationAi": "Khái niệm 'win with one shot' (đòn chí mạng một đòn tất sát) – nguyên lý sống còn trong học thuyết chiến tranh vũ trụ vì khoảng cách quá lớn không cho phép sửa sai.",
        "properNouns": []
    },
    26: {
        "text": "Our bird scientists have found three Smorpian designs:",
        "translationVi": "Các nhà khoa học chim của chúng tôi đã tìm thấy ba bản thiết kế của người Smorpian:",
        "ipaUs": "/ˈaʊər bɜːrd ˈsaɪəntɪsts hæv faʊnd θriː ˈsmɔːrpiən dɪˈzaɪnz/",
        "keywords": ["bird scientists", "Smorpian designs"],
        "explanationAi": "Ẩn dụ hài hước đặc trưng của Kurzgesagt: 'bird scientists' (các nhà khoa học hình chim biểu tượng của kênh).",
        "properNouns": ["Smorpian"]
    },
    27: {
        "text": "the Star Laser, the Relativistic Missile, and the Ultra-Relativistic Electron Beam.",
        "translationVi": "Siêu Laser Ngôi Sao, Tên Lửa Tương Đối Tính, và Chùm Tia Electron Siêu Tương Đối Tính.",
        "ipaUs": "/ðə stɑːr ˈleɪzər ðə ˌrɛlətɪˈvɪstɪk ˈmɪsl ænd ðə ˌʌltrə ˌrɛlətɪˈvɪstɪk ɪˈlɛktrɑːn biːm/",
        "keywords": ["Star Laser", "Relativistic Missile", "Ultra-Relativistic", "Electron Beam"],
        "explanationAi": "Ba loại siêu vũ khí viễn tưởng dựa trên vật lý thực: laser quang năng, tên lửa vận tốc gần vận tốc ánh sáng và chùm hạt electron năng lượng cực cao.",
        "properNouns": ["Star Laser", "Relativistic Missile", "Ultra-Relativistic Electron Beam"]
    },
    28: {
        "text": "All based on real technologies that humans are using in some form already.",
        "translationVi": "Tất cả đều dựa trên những công nghệ có thật mà loài người hiện đã và đang ứng dụng ở một hình thức nào đó.",
        "ipaUs": "/ɔːl beɪst ɑːn ˈriːəl tɛkˈnɑːlədʒiz ðæt ˈhjuːmənz ɑːr ˈjuːzɪŋ ɪn sʌm fɔːrm ɔːlˈrɛdi/",
        "keywords": ["real technologies", "humans", "using", "already"],
        "explanationAi": "Cụm phân từ quá khứ 'based on real technologies' (dựa trên các nền tảng công nghệ thực tế).",
        "properNouns": []
    },
    29: {
        "text": "Let's see how they work.",
        "translationVi": "Hãy cùng xem chúng hoạt động như thế nào.",
        "ipaUs": "/lɛts siː haʊ ðeɪ wɜːrk/",
        "keywords": ["see", "how they work"],
        "explanationAi": "Cấu trúc rủ rê ngắn gọn 'Let's see how they work' dẫn dắt người xem vào phần phân tích chi tiết cơ chế hoạt động.",
        "properNouns": []
    },
    30: {
        "text": "[The Star Laser]",
        "translationVi": "[Siêu Laser Ngôi Sao]",
        "ipaUs": "/ðə stɑːr ˈleɪzər/",
        "keywords": ["Star Laser"],
        "explanationAi": "Tiêu đề phân đoạn vũ khí số 1 trong video Kurzgesagt: Tia laser năng lượng cấp sao.",
        "properNouns": ["The Star Laser"]
    },
    31: {
        "text": "As an advanced technological civilization, the Smorpians harness the energy of their star by surrounding it with billions of solar power satellites.",
        "translationVi": "Là một nền văn minh công nghệ tiên tiến, người Smorpian khai thác năng lượng từ ngôi sao của họ bằng cách bao quanh nó bằng hàng tỷ vệ tinh năng lượng mặt trời.",
        "ipaUs": "/æz ən ədˈvænst ˌtɛknəˈlɑːdʒɪkl ˌsɪvələˈzeɪʃən ðə ˈsmɔːrpiənz ˈhɑːrnəs ðɪ ˈɛnərdʒi ʌv ðɛr stɑːr baɪ səˈraʊndɪŋ ɪt wɪð ˈbɪljənz ʌv ˈsoʊlər ˈpaʊər ˈsætəlaɪts/",
        "keywords": ["advanced civilization", "harness energy", "star", "solar power satellites"],
        "explanationAi": "Động từ 'harness' (khai thác nguồn năng lượng tự nhiên) và danh từ 'solar power satellites' (các vệ tinh thu gom năng lượng mặt trời).",
        "properNouns": ["Smorpians"]
    },
    32: {
        "text": "This Dyson swarm collects 1% of the star's energy output, a million billion billion watts,",
        "translationVi": "Bầy Dyson này thu gom 1% tổng sản lượng năng lượng của ngôi sao, tương đương một triệu tỷ tỷ Watts,",
        "ipaUs": "/ðɪs ˈdaɪsən swɔːrm kəˈlɛkts wʌn pərˈsɛnt ʌv ðə stɑːrz ˈɛnərdʒi ˈaʊtpʊt ə ˈmɪljən ˈbɪljən ˈbɪljən wɑːts/",
        "keywords": ["Dyson swarm", "collects", "energy output", "watts"],
        "explanationAi": "Thuật ngữ vật lý thiên văn 'Dyson swarm' (bầy vệ tinh Dyson) và số đo công suất thiên văn 'watts'.",
        "properNouns": ["Dyson swarm"]
    },
    33: {
        "text": "50 billion times more than all humanity generates.",
        "translationVi": "gấp 50 tỷ lần toàn bộ lượng năng lượng mà nhân loại hiện đang tạo ra.",
        "ipaUs": "/ˈfɪfti ˈbɪljən taɪmz mɔːr ðæn ɔːl hjuːˈmænəti ˈdʒɛnəˌreɪts/",
        "keywords": ["50 billion times", "humanity generates"],
        "explanationAi": "Cấu trúc so sánh bội số: '50 billion times more than...' (nhiều hơn gấp 50 tỷ lần).",
        "properNouns": []
    },
    34: {
        "text": "What if all the power of the Dyson swarm, all those satellites were used to create a star laser?",
        "translationVi": "Điều gì sẽ xảy ra nếu toàn bộ năng lượng của bầy Dyson, tất cả các vệ tinh đó, được dùng để tạo ra một siêu laser cấp sao?",
        "ipaUs": "/wʌt ɪf ɔːl ðə ˈpaʊər ʌv ðə ˈdaɪsən swɔːrm ɔːl ðoʊz ˈsætəlaɪts wɜːr juːzd tu kriˈeɪt ə stɑːr ˈleɪzər/",
        "keywords": ["power", "Dyson swarm", "satellites", "star laser"],
        "explanationAi": "Mệnh đề giả định 'What if...' kết hợp bị động quá khứ 'were used to create...' đặt ra viễn cảnh chuyển đổi năng lượng thành vũ khí hủy diệt.",
        "properNouns": ["Dyson swarm", "star laser"]
    },
    35: {
        "text": "Like any laser, the bigger it is, the longer its range.",
        "translationVi": "Giống như bất kỳ tia laser nào, kích thước thấu kính càng lớn thì tầm bắn của nó càng xa.",
        "ipaUs": "/laɪk ˈɛni ˈleɪzər ðə ˈbɪɡər ɪt ɪz ðə ˈlɔːŋɡər ɪts reɪndʒ/",
        "keywords": ["laser", "bigger", "longer range"],
        "explanationAi": "Cấu trúc so sánh kép sóng đôi 'The bigger..., the longer...' (càng... càng...).",
        "properNouns": []
    },
    36: {
        "text": "Human-built lasers use small mirrors to focus, so they have short ranges.",
        "translationVi": "Các loại laser do con người chế tạo sử dụng gương nhỏ để hội tụ, vì thế chúng có tầm hoạt động ngắn.",
        "ipaUs": "/ˈhjuːmən bɪlt ˈleɪzərz juːz smɔːl ˈmɪrərz tu ˈfoʊkəs soʊ ðeɪ hæv ʃɔːrt ˈreɪndʒɪz/",
        "keywords": ["Human-built lasers", "mirrors", "focus", "short ranges"],
        "explanationAi": "Từ ghép 'Human-built' (do con người chế tạo) và động từ quang học 'focus' (hội tụ chùm sáng).",
        "properNouns": []
    },
    37: {
        "text": "The Smorpians could turn their entire Dyson swarm into a collective focusing element a million kilometers wide.",
        "translationVi": "Người Smorpian có thể biến toàn bộ bầy Dyson của họ thành một thấu kính hội tụ tập thể rộng tới một triệu kilomet.",
        "ipaUs": "/ðə ˈsmɔːrpiənz kʊd tɜːrn ðɛr ɪnˈtaɪər ˈdaɪsən swɔːrm ˈɪntu ə kəˈlɛktɪv ˈfoʊkəsɪŋ ˈɛləmənt ə ˈmɪljən kɪˈlɑːmətərz waɪd/",
        "keywords": ["Smorpians", "turn into", "Dyson swarm", "collective focusing element", "million kilometers wide"],
        "explanationAi": "Cụm danh từ 'collective focusing element' (thấu kính hội tụ tập thể diện rộng) với kích thước 'a million kilometers wide'.",
        "properNouns": ["Smorpians", "Dyson swarm"]
    },
    38: {
        "text": "The star laser has an insane range as a result, enough to focus on target Earth from a distance of over 2 million light years.",
        "translationVi": "Kết quả là siêu laser ngôi sao có một tầm bắn điên rồ, đủ sức nhắm trúng mục tiêu Trái Đất từ khoảng cách hơn 2 triệu năm ánh sáng.",
        "ipaUs": "/ðə stɑːr ˈleɪzər hæz ən ɪnˈseɪn reɪndʒ æz ə rɪˈzʌlt ɪˈnʌf tu ˈfoʊkəs ɑːn ˈtɑːrɡɪt ɜːrθ frəm ə ˈdɪstəns ʌv ˈoʊvər tuː ˈmɪljən laɪt jɪrz/",
        "keywords": ["star laser", "insane range", "target Earth", "distance", "2 million light years"],
        "explanationAi": "Tính từ nhấn mạnh 'insane range' (tầm bắn cực kỳ khủng khiếp) và cụm đo lường 'light years' (năm ánh sáng).",
        "properNouns": ["Earth"]
    },
    39: {
        "text": "OK, let's shoot it.",
        "translationVi": "Được rồi, cùng khai hỏa thôi nào.",
        "ipaUs": "/ˌoʊˈkeɪ lɛts ʃuːt ɪt/",
        "keywords": ["shoot"],
        "explanationAi": "Động từ 'shoot' (khai hỏa, bắn phát tia laser).",
        "properNouns": []
    },
    40: {
        "text": "Countless tiny beams combine into a single huge beam.",
        "translationVi": "Vô số những chùm tia cực nhỏ hợp lại thành một chùm tia duy nhất khổng lồ.",
        "ipaUs": "/ˈkaʊntləs ˈtaɪni biːmz kəmˈbaɪn ˈɪntu ə ˈsɪŋɡl hjuːdʒ biːm/",
        "keywords": ["countless", "tiny beams", "combine", "huge beam"],
        "explanationAi": "Tính từ 'countless' (vô số, không đếm xuể) và động từ 'combine into' (kết hợp lại thành).",
        "properNouns": []
    },
    41: {
        "text": "Laser beams are normally invisible in space, but the star laser is so powerful",
        "translationVi": "Các chùm tia laser thường vô hình trong không gian vũ trụ, nhưng siêu laser ngôi sao mạnh đến mức",
        "ipaUs": "/ˈleɪzər biːmz ɑːr ˈnɔːrməli ɪnˈvɪzəbl ɪn speɪs bʌt ðə stɑːr ˈleɪzər ɪz soʊ ˈpaʊərfʊl/",
        "keywords": ["laser beams", "invisible in space", "powerful"],
        "explanationAi": "Tính từ 'invisible' (vô hình, mắt thường không thấy được) và hiện tượng quang học không gian.",
        "properNouns": []
    },
    42: {
        "text": "that light scattering off bits of dust and gas in its path makes it clearly visible in the sky.",
        "translationVi": "sự tán xạ ánh sáng khỏi các hạt bụi và khí trên đường đi khiến nó hiện rõ mồn một trên bầu trời.",
        "ipaUs": "/ðæt laɪt ˈskætərɪŋ ɔːf bɪts ʌv dʌst ænd ɡæs ɪn ɪts pæθ meɪks ɪt ˈklɪrli ˈvɪzəbl ɪn ðə skaɪ/",
        "keywords": ["light scattering", "dust and gas", "path", "clearly visible"],
        "explanationAi": "Hiện tượng vật lý 'light scattering' (tán xạ ánh sáng) khi va chạm với các hạt bụi liên sao.",
        "properNouns": []
    },
    43: {
        "text": "A gigantic column of green light.",
        "translationVi": "Một cột ánh sáng xanh lục khổng lồ rực sáng.",
        "ipaUs": "/ə dʒaɪˈɡæntɪk ˈkɑːləm ʌv ɡriːn laɪt/",
        "keywords": ["gigantic column", "green light"],
        "explanationAi": "Cụm danh từ miêu tả trực quan 'gigantic column of green light' (cột sáng màu lục khổng lồ).",
        "properNouns": []
    },
    44: {
        "text": "The laser travels at the speed of light, which, oddly enough, is still pretty slow on a galactic level.",
        "translationVi": "Tia laser di chuyển với tốc độ ánh sáng, một vận tốc trớ trêu thay vẫn là khá chậm trên quy mô ngân hà.",
        "ipaUs": "/ðə ˈleɪzər ˈtrævlz æt ðə spiːd ʌv laɪt wɪtʃ ˈɑːdli ɪˈnʌf ɪz stɪl ˈprɪti sloʊ ɑːn ə ɡəˈlæktɪk ˈlɛvl/",
        "keywords": ["speed of light", "oddly enough", "slow", "galactic level"],
        "explanationAi": "Trạng từ châm biếm 'oddly enough' (kỳ lạ/trớ trêu thay) khi so sánh vận tốc cực hạn của vũ trụ với kích thước mênh mông của dải ngân hà.",
        "properNouns": []
    },
    45: {
        "text": "It takes a whole day until the laser has left the Smorpian system, shooting into the emptiness between stars.",
        "translationVi": "Phải mất cả một ngày trời tia laser mới rời khỏi hệ sao của người Smorpian, phóng thẳng vào cõi hư không giữa các vì sao.",
        "ipaUs": "/ɪt teɪks ə hoʊl deɪ ənˈtɪl ðə ˈleɪzər hæz lɛft ðə ˈsmɔːrpiən ˈsɪstəm ˈʃuːtɪŋ ˈɪntu ðɪ ˈɛmptinəs bɪˈtwiːn stɑːrz/",
        "keywords": ["whole day", "Smorpian system", "emptiness between stars"],
        "explanationAi": "Cấu trúc 'It takes [time] until...' biểu đạt khoảng thời gian cần thiết để chùm tia thoát khỏi trường hấp dẫn và ranh giới hệ sao.",
        "properNouns": ["Smorpian"]
    },
    46: {
        "text": "It will travel for decades, occasionally melting the odd bit of interstellar dust or asteroid.",
        "translationVi": "Nó sẽ bay trong suốt nhiều thập kỷ, thi thoảng làm tan chảy một mẩu bụi liên sao hay tiểu hành tinh tình cờ lướt qua.",
        "ipaUs": "/ɪt wɪl ˈtrævl fɔːr ˈdɛkeɪdz əˈkeɪʒnəli ˈmɛltɪŋ ðɪ ɑːd bɪt ʌv ˌɪntərˈstɛlər dʌst ɔːr ˈæstərɔɪd/",
        "keywords": ["travel for decades", "melting", "interstellar dust", "asteroid"],
        "explanationAi": "Cụm danh từ 'interstellar dust' (bụi liên sao) và 'asteroid' (tiểu hành tinh) bị chùm năng lượng cao làm tan chảy.",
        "properNouns": []
    },
    47: {
        "text": "42 years after being fired, it arrives without warning.",
        "translationVi": "42 năm sau khi được phóng đi, nó ập đến mà không hề có bất kỳ lời cảnh báo nào.",
        "ipaUs": "/ˈfɔːrti tuː jɪrz ˈæftər ˈbiːɪŋ ˈfaɪərd ɪt əˈraɪvz wɪˈðaʊt ˈwɔːrnɪŋ/",
        "keywords": ["42 years", "after being fired", "arrives", "without warning"],
        "explanationAi": "Cụm 'without warning' (không có dấu hiệu cảnh báo) vì vận tốc laser bằng vận tốc ánh sáng, không có tín hiệu nào có thể bay trước để báo trước.",
        "properNouns": []
    },
    48: {
        "text": "Humans only notice a weird green glow in the sky, and then they're gone.",
        "translationVi": "Con người chỉ kịp nhận ra một ánh hào quang màu lục kỳ lạ trên bầu trời, và rồi họ biến mất vĩnh viễn.",
        "ipaUs": "/ˈhjuːmənz ˈoʊnli ˈnoʊtɪs ə wɪərd ɡriːn ɡloʊ ɪn ðə skaɪ ænd ðɛn ðɛr ɡɔːn/",
        "keywords": ["weird green glow", "sky", "gone"],
        "explanationAi": "Cụm 'they're gone' (họ đã biến mất / bị xóa sổ trong chớp mắt) diễn tả sự hủy diệt tức thì.",
        "properNouns": ["Humans"]
    },
    49: {
        "text": "1% of the energy of a star, concentrated into a beam the diameter of Earth, traveling 42 light years.",
        "translationVi": "1% năng lượng của một ngôi sao, được nén lại vào một chùm tia có đường kính bằng Trái Đất, vượt qua quãng đường 42 năm ánh sáng.",
        "ipaUs": "/wʌn pərˈsɛnt ʌv ðɪ ˈɛnərdʒi ʌv ə stɑːr ˈkɑːnsntreɪtɪd ˈɪntu ə biːm ðə daɪˈæmɪtər ʌv ɜːrθ ˈtrævlɪŋ ˈfɔːrti tuː laɪt jɪrz/",
        "keywords": ["energy of a star", "concentrated", "diameter of Earth", "42 light years"],
        "explanationAi": "Phân từ 'concentrated into' (được cô đặc / hội tụ thành) và khái niệm 'diameter of Earth' (đường kính Trái Đất).",
        "properNouns": ["Earth"]
    },
    50: {
        "text": "It burns the exposed half of the planet with the intensity of 3 million Suns.",
        "translationVi": "Nó thiêu rụi nửa bán cầu đối diện của hành tinh với cường độ tương đương 3 triệu Mặt Trời cộng lại.",
        "ipaUs": "/ɪt bɜːrnz ðɪ ɪkˈspoʊzd hæf ʌv ðə ˈplænɪt wɪð ðɪ ɪnˈtɛnsəti ʌv θriː ˈmɪljən sʌnz/",
        "keywords": ["burns", "exposed half", "planet", "intensity", "3 million Suns"],
        "explanationAi": "Cụm 'exposed half of the planet' (nửa bề mặt hành tinh hướng thẳng về phía chùm tia) chịu bức xạ hủy diệt.",
        "properNouns": ["Suns"]
    },
    51: {
        "text": "The seas boil and evaporate, fires scour the land, and within minutes Earth's crust begins to melt into a sea of lava.",
        "translationVi": "Các đại dương sôi sục và bốc hơi, lửa quét sạch các vùng đất liền, và chỉ trong vài phút, lớp vỏ Trái Đất bắt đầu tan chảy thành biển dung nham.",
        "ipaUs": "/ðə siːz bɔɪl ænd ɪˈvæpəreɪt ˈfaɪərz ˈskaʊər ðə lænd ænd wɪˈðɪn ˈmɪnɪts ɜːrθs krʌst bɪˈɡɪnz tu mɛlt ˈɪntu ə siː ʌv ˈlɑːvə/",
        "keywords": ["seas boil", "evaporate", "fires scour", "Earth's crust", "sea of lava"],
        "explanationAi": "Động từ 'scour' (càn quét, thiêu rụi sạch sẽ) và thuật ngữ địa chất 'Earth's crust' (lớp vỏ thạch quyển của Trái Đất).",
        "properNouns": ["Earth's"]
    },
    52: {
        "text": "As the planet rotates, it turns into a red hot hell with no trace of life.",
        "translationVi": "Khi hành tinh tự quay quanh trục, nó biến thành một địa ngục đỏ rực không còn sót lại bất kỳ dấu vết nào của sự sống.",
        "ipaUs": "/æz ðə ˈplænɪt roʊˈteɪts ɪt tɜːrnz ˈɪntu ə rɛd hɑːt hɛl wɪð noʊ treɪs ʌv laɪf/",
        "keywords": ["planet rotates", "red hot hell", "no trace of life"],
        "explanationAi": "Thành ngữ 'no trace of life' (không còn một vết tích nào của sự sống) mô tả sự tuyệt chủng hoàn toàn.",
        "properNouns": []
    },
    53: {
        "text": "After a day, it's all over and the laser dies down.",
        "translationVi": "Sau một ngày, mọi chuyện kết thúc và tia laser dần tắt lịm.",
        "ipaUs": "/ˈæftər ə deɪ ɪts ɔːl ˈoʊvər ænd ðə ˈleɪzər daɪz daʊn/",
        "keywords": ["all over", "laser dies down"],
        "explanationAi": "Cụm động từ 'die down' (lụi tàn dần, giảm cường độ rồi tắt hẳn).",
        "properNouns": []
    },
    54: {
        "text": "In another 42 years, the Smorpians will know if they've been successful.",
        "translationVi": "Phải mất thêm 42 năm nữa, người Smorpian mới biết được liệu cuộc tấn công của họ có thành công hay không.",
        "ipaUs": "/ɪn əˈnʌðər ˈfɔːrti tuː jɪrz ðə ˈsmɔːrpiənz wɪl noʊ ɪf ðeɪv biːn səkˈsɛsfʊl/",
        "keywords": ["another 42 years", "Smorpians", "know", "successful"],
        "explanationAi": "Độ trễ truyền tin 2 chiều trong vũ trụ: 42 năm ánh sáng đi và 42 năm ánh sáng phản hồi bằng 84 năm tổng cộng.",
        "properNouns": ["Smorpians"]
    },
    55: {
        "text": "That's another thing about interstellar war. When you attack, your grandchildren will be the ones to find out if you won.",
        "translationVi": "Đó là một đặc tính khác của chiến tranh liên sao. Khi bạn phát động tấn công, con cháu của bạn mới là những người biết được bạn có thắng hay không.",
        "ipaUs": "/ðæts əˈnʌðər θɪŋ əˈbaʊt ˌɪntərˈstɛlər wɔːr wɛn ju əˈtæk jɔːr ˈɡrændˌtʃɪldrən wɪl bi ðə wʌnz tu faɪnd aʊt ɪf ju wʌn/",
        "keywords": ["interstellar war", "grandchildren", "find out", "won"],
        "explanationAi": "Sự đứt gãy thế hệ trong quyết sách chiến tranh giữa các vì sao do giới hạn tốc độ ánh sáng.",
        "properNouns": []
    },
    56: {
        "text": "It's like all the bombs from World War II exploding in the 80s and us only seeing the effect today.",
        "translationVi": "Nó giống như toàn bộ bom đạn từ Thế Chiến II phát nổ vào thập niên 80 và đến tận ngày nay chúng ta mới nhìn thấy kết quả.",
        "ipaUs": "/ɪts laɪk ɔːl ðə bɑːmz frəm wɜːrld wɔːr tuː ɪkˈsploʊdɪŋ ɪn ðɪ ˈeɪtiz ænd ʌs ˈoʊnli ˈsiːɪŋ ðɪ ɪˈfɛkt təˈdeɪ/",
        "keywords": ["bombs", "World War II", "exploding in the 80s", "effect today"],
        "explanationAi": "Phép so sánh lịch sử độc đáo giúp người nghe hình dung rõ rệt độ trễ khổng lồ giữa nguyên nhân và kết quả.",
        "properNouns": ["World War II"]
    },
    57: {
        "text": "OK, the star laser's extreme range, speed of light attack, and ability to melt down any target make it a premier interstellar weapon.",
        "translationVi": "Được rồi, tầm bắn cực xa, tốc độ tấn công bằng ánh sáng và khả năng nấu chảy mọi mục tiêu khiến siêu laser ngôi sao trở thành vũ khí liên sao hàng đầu.",
        "ipaUs": "/ˌoʊˈkeɪ ðə stɑːr ˈleɪzərz ɪkˈstriːm reɪndʒ spiːd ʌv laɪt əˈtæk ænd əˈbɪləti tu mɛlt daʊn ˈɛni ˈtɑːrɡɪt meɪk ɪt ə prɪˈmɪr ˌɪntərˈstɛlər ˈwɛpən/",
        "keywords": ["extreme range", "speed of light attack", "melt down", "premier interstellar weapon"],
        "explanationAi": "Tính từ cao cấp 'premier' (hàng đầu, bậc nhất) và cụm động từ 'melt down' (nấu chảy hoàn toàn).",
        "properNouns": []
    },
    58: {
        "text": "But is there something else?",
        "translationVi": "Nhưng liệu còn có thứ vũ khí nào khác hay không?",
        "ipaUs": "/bʌt ɪz ðɛr ˈsʌmθɪŋ ɛls/",
        "keywords": ["something else"],
        "explanationAi": "Câu hỏi tu từ kết lại phần phân tích Star Laser, gợi mở chuyển giao sang loại vũ khí tiếp theo: Relativistic Missile.",
        "properNouns": []
    }
}

# Build full 58 segments
full_segments = []

# Segments 1..21 from calib_21 with /.../ ipaUs and checked tokenCount
for idx, seg in enumerate(calib_21):
    oi = idx + 1
    raw_ipa = seg.get('ipaUs', '').strip()
    if not raw_ipa.startswith('/'):
        raw_ipa = '/' + raw_ipa
    if not raw_ipa.endswith('/'):
        raw_ipa = raw_ipa + '/'
    
    seg_obj = {
        "orderIndex": oi,
        "startTime": seg["startTime"],
        "endTime": seg["endTime"],
        "text": seg["text"],
        "normalizedText": normalize_text(seg["text"]),
        "ipaUs": raw_ipa,
        "translationVi": seg["translationVi"],
        "explanationAi": seg["explanationAi"],
        "properNouns": seg.get("properNouns", []),
        "keywords": seg.get("keywords", []),
        "tokenCount": count_tokens(seg["text"])
    }
    full_segments.append(seg_obj)

# Segments 22..58
for oi in range(22, 59):
    meta = meta_22_58[oi]
    grp = segMap[oi - 1]
    st = raw_lines[grp[0]]['start']
    et = raw_lines[grp[-1]]['end']
    txt = meta['text']
    
    seg_obj = {
        "orderIndex": oi,
        "startTime": st,
        "endTime": et,
        "text": txt,
        "normalizedText": normalize_text(txt),
        "ipaUs": meta['ipaUs'],
        "translationVi": meta['translationVi'],
        "explanationAi": meta['explanationAi'],
        "properNouns": meta.get('properNouns', []),
        "keywords": meta.get('keywords', []),
        "tokenCount": count_tokens(txt)
    }
    full_segments.append(seg_obj)

print(f"Constructed {len(full_segments)} segments.")

# Verify against raw lines verbatim
def clean_words(s):
    s = s.replace("’", "'").replace("‘", "'").replace("”", '"').replace("“", '"')
    s = s.replace("--", " ").replace("—", " ").replace("'", "").replace('"', '')
    s = re.sub(r'[^a-zA-Z0-9\s]', ' ', s)
    return [w.strip().lower() for w in s.split() if w.strip()]

mismatches = 0
for idx, seg in enumerate(full_segments):
    grp = segMap[idx]
    raw_text = ' '.join(raw_lines[i]['text'] for i in grp)
    raw_w = clean_words(raw_text)
    seg_w = clean_words(seg['text'])
    if raw_w != seg_w:
        print(f"❌ Verbatim Mismatch at Seg #{idx+1}:")
        print(f"  Raw: {raw_w}")
        print(f"  Seg: {seg_w}")
        mismatches += 1

if mismatches == 0:
    print("✅ 100% VERBATIM MATCH across all 58 segments!")

# Save to json file for review and embedding
with open('scripts/kurzgesagt_master_58_segments.json', 'w', encoding='utf-8') as f:
    json.dump(full_segments, f, ensure_ascii=False, indent=2)

print("Saved to scripts/kurzgesagt_master_58_segments.json")

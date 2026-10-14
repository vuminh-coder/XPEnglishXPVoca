import json
import re

segments_data = [
    {
        "orderIndex": 1,
        "startTime": 0.08,
        "endTime": 7.24,
        "text": "From the moment of concept to building a massive factory,",
        "translationVi": "Từ khoảnh khắc lên ý tưởng ban đầu cho đến khi xây dựng cả một nhà máy khổng lồ,",
        "ipaUs": "/frʌm ðə ˈmoʊmənt əv ˈkɑːnsept tu ˈbɪldɪŋ ə ˈmæsɪv ˈfæktəri/",
        "properNouns": [],
        "keywords": ["moment of concept", "building", "massive factory"],
        "explanationAi": "Cụm danh từ 'moment of concept' (khoảnh khắc nảy sinh ý tưởng) và tính từ 'massive' (khổng lồ, đồ sộ).",
        "tokenCount": 10
    },
    {
        "orderIndex": 2,
        "startTime": 7.24,
        "endTime": 13.84,
        "text": "liquid-cooled, energized, permitted in the short time that was done,",
        "translationVi": "được làm mát bằng chất lỏng, cấp điện và hoàn tất thủ tục cấp phép trong thời gian ngắn ngủi đến vậy,",
        "ipaUs": "/ˈlɪkwɪd kuːld ˈenərdʒaɪzd pərˈmɪtɪd ɪn ðə ʃɔːrt taɪm ðæt wəz dʌn/",
        "properNouns": [],
        "keywords": ["liquid-cooled", "energized", "permitted", "short time"],
        "explanationAi": "Các phân từ quá khứ mô tả quy trình xây dựng trung tâm dữ liệu AI: 'liquid-cooled' (làm mát bằng chất lỏng), 'energized' (đấu nối cấp điện), 'permitted' (được phê duyệt cấp phép xây dựng).",
        "tokenCount": 11
    },
    {
        "orderIndex": 3,
        "startTime": 13.84,
        "endTime": 16.50,
        "text": "that is like superhuman, right?",
        "translationVi": "điều đó thực sự phi thường như siêu nhân, đúng không?",
        "ipaUs": "/ðæt ɪz laɪk ˌsuːpərˈhjuːmən raɪt/",
        "properNouns": [],
        "keywords": ["superhuman", "right"],
        "explanationAi": "Tính từ 'superhuman' (vượt trên năng lực con người, phi thường) nhấn mạnh tốc độ triển khai không tưởng của dự án Colossus.",
        "tokenCount": 5
    },
    {
        "orderIndex": 4,
        "startTime": 16.50,
        "endTime": 20.40,
        "text": "And as far as I know, there's only one person in the world who could do that.",
        "translationVi": "Và theo tôi được biết, chỉ có một người duy nhất trên thế giới này có thể làm được điều đó.",
        "ipaUs": "/ænd æz fɑːr æz aɪ noʊ ðerz ˈoʊnli wʌn ˈpɜːrsn ɪn ðə wɜːrld huː kəd duː ðæt/",
        "properNouns": [],
        "keywords": ["as far as I know", "only one person", "world"],
        "explanationAi": "Thành ngữ 'as far as I know' (theo như tôi được biết) biểu đạt sự quả quyết của Jensen Huang khi đánh giá về Elon Musk.",
        "tokenCount": 17
    },
    {
        "orderIndex": 5,
        "startTime": 20.40,
        "endTime": 25.72,
        "text": "You know, I mean Elon is singular in this understanding of engineering,",
        "translationVi": "Ý tôi là Elon thực sự độc nhất vô nhị trong hiểu biết về kỹ thuật,",
        "ipaUs": "/juː noʊ aɪ miːn ˈiːlɑːn ɪz ˈsɪŋɡjələr ɪn ðɪs ˌʌndərˈstændɪŋ əv ˌendʒɪˈnɪrɪŋ/",
        "properNouns": ["Elon"],
        "keywords": ["singular", "understanding", "engineering"],
        "explanationAi": "Tính từ cao cấp 'singular' (độc nhất vô nhị, phi thường, không ai sánh kịp) ca ngợi năng lực kỹ thuật của Elon Musk.",
        "tokenCount": 12
    },
    {
        "orderIndex": 6,
        "startTime": 25.72,
        "endTime": 30.00,
        "text": "and construction, and large systems, and marshaling resources,",
        "translationVi": "và xây dựng, và các hệ thống quy mô lớn, cũng như khả năng huy động nguồn lực,",
        "ipaUs": "/ænd kənˈstrʌkʃn ænd lɑːrdʒ ˈsɪstəmz ænd ˈmɑːrʃəlɪŋ ˈriːsɔːrsɪz/",
        "properNouns": [],
        "keywords": ["construction", "large systems", "marshaling resources"],
        "explanationAi": "Cụm động từ 'marshaling resources' (tập hợp, sắp xếp và điều phối các nguồn lực khổng lồ một cách hiệu quả).",
        "tokenCount": 8
    },
    {
        "orderIndex": 7,
        "startTime": 30.00,
        "endTime": 31.16,
        "text": "it's unbelievable.",
        "translationVi": "thật không thể tin được.",
        "ipaUs": "/ɪts ˌʌnbɪˈliːvəbl/",
        "properNouns": [],
        "keywords": ["unbelievable"],
        "explanationAi": "Tính từ cảm thán 'unbelievable' (không thể tin nổi) thể hiện sự thán phục tột bậc.",
        "tokenCount": 2
    },
    {
        "orderIndex": 8,
        "startTime": 31.16,
        "endTime": 34.40,
        "text": "And of course, then his engineering team is extraordinary.",
        "translationVi": "Và tất nhiên, đội ngũ kỹ sư của anh ấy cũng thật phi thường.",
        "ipaUs": "/ænd əv kɔːrs ðen hɪz ˌendʒɪˈnɪrɪŋ tiːm ɪz ɪkˈstrɔːrdəneri/",
        "properNouns": [],
        "keywords": ["of course", "engineering team", "extraordinary"],
        "explanationAi": "Tính từ 'extraordinary' (phi thường, xuất chúng) ghi nhận đóng góp của toàn bộ đội ngũ kỹ sư xAI.",
        "tokenCount": 8
    },
    {
        "orderIndex": 9,
        "startTime": 34.40,
        "endTime": 38.28,
        "text": "And from the moment that we decided to go,",
        "translationVi": "Và từ khoảnh khắc mà chúng tôi quyết định bắt đầu triển khai,",
        "ipaUs": "/ænd frʌm ðə ˈmoʊmənt ðæt wi dɪˈsaɪdɪd tu ɡoʊ/",
        "properNouns": [],
        "keywords": ["moment", "decided to go"],
        "explanationAi": "Cụm 'decided to go' (quyết định bắt tay vào hành động / bấm nút kích hoạt dự án).",
        "tokenCount": 9
    },
    {
        "orderIndex": 10,
        "startTime": 38.28,
        "endTime": 41.80,
        "text": "the planning with our engineering team, our networking team,",
        "translationVi": "khâu lên kế hoạch cùng đội ngũ kỹ sư, đội ngũ mạng kết nối của chúng tôi,",
        "ipaUs": "/ðə ˈplænɪŋ wɪð ˈaʊər ˌendʒɪˈnɪrɪŋ tiːm ˈaʊər ˈnetwɜːrkɪŋ tiːm/",
        "properNouns": [],
        "keywords": ["planning", "engineering team", "networking team"],
        "explanationAi": "Thuật ngữ 'networking team' (đội ngũ phụ trách hạ tầng mạng tốc độ cao InfiniBand và Ethernet của NVIDIA).",
        "tokenCount": 9
    },
    {
        "orderIndex": 11,
        "startTime": 41.80,
        "endTime": 44.12,
        "text": "our infrastructure computing team, the software team,",
        "translationVi": "đội ngũ hạ tầng điện toán, đội ngũ phần mềm,",
        "ipaUs": "/ˈaʊər ˈɪnfrəstrʌktʃər kəmˈpjuːtɪŋ tiːm ðə ˈsɔːftwer tiːm/",
        "properNouns": [],
        "keywords": ["infrastructure computing", "software team"],
        "explanationAi": "Khái niệm 'infrastructure computing' (điện toán hạ tầng - quản lý máy chủ GPU quy mô cụm).",
        "tokenCount": 7
    },
    {
        "orderIndex": 12,
        "startTime": 44.12,
        "endTime": 47.28,
        "text": "all of the preparation in advance.",
        "translationVi": "tất cả công tác chuẩn bị đều đã được thực hiện kỹ lưỡng từ trước.",
        "ipaUs": "/ɔːl əv ðə ˌprepəˈreɪʃn ɪn ədˈvæns/",
        "properNouns": [],
        "keywords": ["preparation", "in advance"],
        "explanationAi": "Cụm từ 'in advance' (từ trước, chuẩn bị trước) chỉ sự phối hợp nhịp nhàng giữa hai tập đoàn công nghệ.",
        "tokenCount": 6
    },
    {
        "orderIndex": 13,
        "startTime": 47.28,
        "endTime": 49.72,
        "text": "Then all of the infrastructure, all of the logistics,",
        "translationVi": "Rồi toàn bộ cơ sở hạ tầng, toàn bộ khâu hậu cần vận chuyển,",
        "ipaUs": "/ðen ɔːl əv ðə ˈɪnfrəstrʌktʃər ɔːl əv ðə ləˈdʒɪstɪks/",
        "properNouns": [],
        "keywords": ["infrastructure", "logistics"],
        "explanationAi": "Danh từ 'logistics' (chuỗi cung ứng, vận chuyển trang thiết bị phần cứng bán dẫn đến trung tâm dữ liệu).",
        "tokenCount": 8
    },
    {
        "orderIndex": 14,
        "startTime": 49.72,
        "endTime": 53.00,
        "text": "and the amount of technology and equipment that came in on that day",
        "translationVi": "và khối lượng công nghệ cùng thiết bị đổ về dồn dập vào ngày hôm đó",
        "ipaUs": "/ænd ðə əˈmaʊnt əv tekˈnɑːlədʒi ænd ɪˈkwɪpmənt ðæt keɪm ɪn ɑːn ðæt deɪ/",
        "properNouns": [],
        "keywords": ["technology", "equipment", "came in"],
        "explanationAi": "Cụm động từ 'came in on that day' (đồng loạt đổ về cùng ngày) phản ánh quy mô tiếp nhận hàng nghìn giá rack máy chủ.",
        "tokenCount": 13
    },
    {
        "orderIndex": 15,
        "startTime": 53.00,
        "endTime": 56.44,
        "text": "to train in 19 days.",
        "translationVi": "để bắt đầu vận hành huấn luyện mô hình chỉ trong 19 ngày.",
        "ipaUs": "/tu treɪn ɪn naɪnˈtiːn deɪz/",
        "properNouns": ["19 days"],
        "keywords": ["train", "19 days"],
        "explanationAi": "Động từ chuyên ngành AI 'train' (huấn luyện các tham số mô hình ngôn ngữ lớn LLM Grok).",
        "tokenCount": 5
    },
    {
        "orderIndex": 16,
        "startTime": 56.44,
        "endTime": 58.00,
        "text": "19 days!",
        "translationVi": "19 ngày!",
        "ipaUs": "/naɪnˈtiːn deɪz/",
        "properNouns": ["19 days"],
        "keywords": ["19 days"],
        "explanationAi": "Tiếng thốt ngắn gọn lặp lại mốc thời gian kỷ lục '19 days' để tạo ấn tượng mạnh mẽ cho người nghe.",
        "tokenCount": 2
    },
    {
        "orderIndex": 17,
        "startTime": 58.00,
        "endTime": 60.20,
        "text": "19 days is incredible.",
        "translationVi": "19 ngày thực sự là điều không tưởng.",
        "ipaUs": "/naɪnˈtiːn deɪz ɪz ɪnˈkredəbl/",
        "properNouns": ["19 days"],
        "keywords": ["19 days", "incredible"],
        "explanationAi": "Tính từ 'incredible' (đáng kinh ngạc, không thể tin được) tái khẳng định tính lịch sử của thành tựu.",
        "tokenCount": 4
    },
    {
        "orderIndex": 18,
        "startTime": 60.20,
        "endTime": 62.00,
        "text": "But it's also kind of nice to just take a step back,",
        "translationVi": "Nhưng cũng thật thú vị khi chúng ta lùi lại một bước để quan sát toàn cảnh,",
        "ipaUs": "/bʌt ɪts ˈɔːlsoʊ kaɪnd əv naɪs tu dʒʌst teɪk ə step bæk/",
        "properNouns": [],
        "keywords": ["take a step back", "kind of nice"],
        "explanationAi": "Thành ngữ 'take a step back' (lùi lại một bước để nhìn nhận vấn đề dưới góc nhìn rộng hơn, thấu đáo hơn).",
        "tokenCount": 11
    },
    {
        "orderIndex": 19,
        "startTime": 62.00,
        "endTime": 64.00,
        "text": "you know how many days 19 days is?",
        "translationVi": "bạn có hình dung 19 ngày là bao nhiêu không?",
        "ipaUs": "/juː noʊ haʊ ˈmeni deɪz naɪnˈtiːn deɪz ɪz/",
        "properNouns": ["19 days"],
        "keywords": ["how many days", "19 days"],
        "explanationAi": "Câu hỏi tu từ gợi mở suy ngẫm cho thính giả podcast về đơn vị thời gian cực ngắn.",
        "tokenCount": 7
    },
    {
        "orderIndex": 20,
        "startTime": 64.00,
        "endTime": 65.52,
        "text": "It's just a couple of weeks.",
        "translationVi": "Đó chỉ vỏn vẹn là vài tuần ngắn ngủi.",
        "ipaUs": "/ɪts dʒʌst ə ˈkʌpl əv wiːks/",
        "properNouns": [],
        "keywords": ["just a couple of weeks"],
        "explanationAi": "Cụm danh từ 'a couple of weeks' (chỉ khoảng hai tuần) đối lập với quy mô khổng lồ của một siêu máy tính cấp quốc gia.",
        "tokenCount": 6
    },
    {
        "orderIndex": 21,
        "startTime": 65.52,
        "endTime": 69.48,
        "text": "And the mountain of technology, if you're ever to see it, is unbelievable:",
        "translationVi": "Và khối lượng công nghệ đồ sộ đó, nếu bạn từng có cơ hội tận mắt chứng kiến, thật không thể tin nổi:",
        "ipaUs": "/ænd ðə ˈmaʊntn əv tekˈnɑːlədʒi ɪf jʊr ˈevər tu siː ɪt ɪz ˌʌnbɪˈliːvəbl/",
        "properNouns": [],
        "keywords": ["mountain of technology", "ever to see it", "unbelievable"],
        "explanationAi": "Hình ảnh ẩn dụ 'mountain of technology' (ngọn núi công nghệ đồ sộ) mô tả quy mô phần cứng và hệ thống server khổng lồ.",
        "tokenCount": 13
    },
    {
        "orderIndex": 22,
        "startTime": 69.48,
        "endTime": 71.52,
        "text": "all of the wiring and the networking,",
        "translationVi": "toàn bộ hệ thống đấu nối dây dẫn và mạng lưới cáp kết nối,",
        "ipaUs": "/ɔːl əv ðə ˈwaɪərɪŋ ænd ðə ˈnetwɜːrkɪŋ/",
        "properNouns": [],
        "keywords": ["wiring", "networking"],
        "explanationAi": "Thuật ngữ 'wiring' (hệ thống dây điện, quang) và 'networking' (mạng truyền dữ liệu giữa hàng vạn GPU).",
        "tokenCount": 7
    },
    {
        "orderIndex": 23,
        "startTime": 71.52,
        "endTime": 75.72,
        "text": "just getting this mountain of technology integrated, and all the software.",
        "translationVi": "chỉ riêng việc tích hợp toàn bộ khối công nghệ khổng lồ này cùng tất cả phần mềm.",
        "ipaUs": "/dʒʌst ˈɡetɪŋ ðɪs ˈmaʊntn əv tekˈnɑːlədʒi ˈɪntɪɡreɪtɪd ænd ɔːl ðə ˈsɔːftwer/",
        "properNouns": [],
        "keywords": ["integrated", "software", "mountain of technology"],
        "explanationAi": "Động từ 'integrated' (tích hợp đồng bộ hóa nhiều lớp kiến trúc phần cứng và phần mềm điều khiển).",
        "tokenCount": 11
    },
    {
        "orderIndex": 24,
        "startTime": 75.72,
        "endTime": 77.00,
        "text": "Incredible, right?",
        "translationVi": "Thật phi thường, đúng không?",
        "ipaUs": "/ɪnˈkredəbl raɪt/",
        "properNouns": [],
        "keywords": ["incredible", "right"],
        "explanationAi": "Câu cảm thán kết đoạn nhấn mạnh cảm xúc tự hào và ngạc nhiên của CEO NVIDIA.",
        "tokenCount": 2
    },
    {
        "orderIndex": 25,
        "startTime": 77.00,
        "endTime": 80.44,
        "text": "Yeah, so I think what Elon and the xAI team did,",
        "translationVi": "Vâng, vì thế tôi nghĩ những gì Elon và đội ngũ xAI đã làm được,",
        "ipaUs": "/jeə soʊ aɪ θɪŋk wʌt ˈiːlɑːn ænd ðə ˌeks eɪ ˈaɪ tiːm dɪd/",
        "properNouns": ["Elon", "xAI"],
        "keywords": ["Elon", "xAI team", "did"],
        "explanationAi": "Tên riêng công ty khởi nghiệp trí tuệ nhân tạo 'xAI' do Elon Musk sáng lập để phát triển trợ lý Grok.",
        "tokenCount": 11
    },
    {
        "orderIndex": 26,
        "startTime": 80.44,
        "endTime": 83.24,
        "text": "what they achieved is singular, never been done before.",
        "translationVi": "những gì họ đã đạt được là độc nhất vô nhị, chưa từng có tiền lệ trong lịch sử.",
        "ipaUs": "/wʌt ðeɪ əˈtʃiːvd ɪz ˈsɪŋɡjələr ˈnevər bɪn dʌn bɪˈfɔːr/",
        "properNouns": [],
        "keywords": ["achieved", "singular", "never been done before"],
        "explanationAi": "Cụm 'never been done before' (chưa từng được thực hiện trước đây) khẳng định kỷ lục vô tiền khoáng hậu.",
        "tokenCount": 9
    },
    {
        "orderIndex": 27,
        "startTime": 83.24,
        "endTime": 85.28,
        "text": "Just to put in perspective:",
        "translationVi": "Để giúp bạn dễ hình dung sự đồ sộ này:",
        "ipaUs": "/dʒʌst tu pʊt ɪn pərˈspektɪv/",
        "properNouns": [],
        "keywords": ["put in perspective"],
        "explanationAi": "Thành ngữ 'put in perspective' (so sánh, đặt vào hệ quy chiếu tương quan để thấy rõ bản chất và tầm vóc).",
        "tokenCount": 4
    },
    {
        "orderIndex": 28,
        "startTime": 85.28,
        "endTime": 91.50,
        "text": "100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.",
        "translationVi": "100.000 GPU, đó chắc chắn là siêu máy tính nhanh nhất hành tinh dưới dạng một cụm duy nhất.",
        "ipaUs": "/wʌn ˈhʌndrəd ˈθaʊznd ˌdʒiː piː ˈjuːz ðæts ˈiːzəli ðə ˈfæstɪst ˈsuːpərkəmpjuːtər ɑːn ðə ˈplænɪt æz wʌn ˈklʌstər/",
        "properNouns": ["GPU", "GPUs"],
        "keywords": ["100,000 GPUs", "fastest supercomputer", "planet", "one cluster"],
        "explanationAi": "Thuật ngữ 'one cluster' (một cụm điện toán duy nhất liên kết hàng vạn GPU qua mạng vải fabric băng thông cực lớn).",
        "tokenCount": 12
    },
    {
        "orderIndex": 29,
        "startTime": 91.50,
        "endTime": 98.84,
        "text": "A supercomputer that you would build would take normally three years to plan, right?",
        "translationVi": "Một siêu máy tính thông thường mà bạn muốn xây dựng sẽ phải mất ba năm chỉ để lên kế hoạch, đúng không?",
        "ipaUs": "/ə ˈsuːpərkəmpjuːtər ðæt juː wʊd bɪld wʊd teɪk ˈnɔːrməli θriː jɪrz tu plæn raɪt/",
        "properNouns": [],
        "keywords": ["supercomputer", "normally three years", "plan"],
        "explanationAi": "Thì điều kiện 'would take normally' mô tả quy chuẩn thời gian truyền thống trong ngành công nghiệp siêu điện toán.",
        "tokenCount": 14
    },
    {
        "orderIndex": 30,
        "startTime": 98.84,
        "endTime": 105.88,
        "text": "And then they deliver the equipment and it takes one year to get it all working.",
        "translationVi": "Và rồi sau khi họ giao thiết bị, bạn phải mất thêm một năm nữa để đưa tất cả vào vận hành trơn tru.",
        "ipaUs": "/ænd ðen ðeɪ dɪˈlɪvər ðə ɪˈkwɪpmənt ænd ɪt teɪks wʌn jɪr tu ɡet ɪt ɔːl ˈwɜːrkɪŋ/",
        "properNouns": [],
        "keywords": ["deliver equipment", "one year", "get it all working"],
        "explanationAi": "Cụm 'get it all working' (đưa toàn bộ hệ thống vào trạng thái hoạt động đồng bộ không lỗi).",
        "tokenCount": 16
    },
    {
        "orderIndex": 31,
        "startTime": 105.88,
        "endTime": 109.04,
        "text": "Yes, we're talking about 19 days.",
        "translationVi": "Vâng, ở đây chúng ta đang nói về đúng 19 ngày.",
        "ipaUs": "/jes wɪr ˈtɔːkɪŋ əˈbaʊt naɪnˈtiːn deɪz/",
        "properNouns": ["19 days"],
        "keywords": ["talking about", "19 days"],
        "explanationAi": "Câu kết thúc đúc kết sự bứt phá mọi giới hạn của Elon Musk và xAI: 4 năm công việc tiêu chuẩn được nén lại trong 19 ngày.",
        "tokenCount": 6
    }
]

def normalize_text(text: str) -> str:
    cleaned = re.sub(r'[^a-zA-Z0-9\s]', '', text.lower())
    return re.sub(r'\s+', ' ', cleaned).strip()

def count_tokens(text: str) -> int:
    return len(re.findall(r'\b[A-Za-z0-9_]+\b', text))

full_segments = []
for s in segments_data:
    raw_ipa = s["ipaUs"].strip()
    if not raw_ipa.startswith("/"):
        raw_ipa = "/" + raw_ipa
    if not raw_ipa.endswith("/"):
        raw_ipa = raw_ipa + "/"
    
    seg_obj = {
        "orderIndex": s["orderIndex"],
        "startTime": s["startTime"],
        "endTime": s["endTime"],
        "text": s["text"],
        "normalizedText": normalize_text(s["text"]),
        "ipaUs": raw_ipa,
        "translationVi": s["translationVi"],
        "explanationAi": s["explanationAi"],
        "properNouns": s.get("properNouns", []),
        "keywords": s.get("keywords", []),
        "tokenCount": count_tokens(s["text"])
    }
    full_segments.append(seg_obj)

print(f"Constructed {len(full_segments)} segments.")

with open('scripts/jensen_huang_master_31_segments.json', 'w', encoding='utf-8') as f:
    json.dump(full_segments, f, ensure_ascii=False, indent=2)

print("Saved scripts/jensen_huang_master_31_segments.json!")

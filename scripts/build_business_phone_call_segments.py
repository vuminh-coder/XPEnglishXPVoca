import json
import re

# Analysis of business phone call dialogue:
# Video: Essential Business English 4 — A Telephone Call (Tw2r9DkL5co)
# Core dialogue section: 11.75s to 78.93s (Duration ~79s)

raw_segments = [
    {
        "orderIndex": 1,
        "speaker": "Receptionist",
        "startTime": 11.75,
        "endTime": 15.30,
        "text": "Good morning, Chic Boutique, how may I help you?",
        "translationVi": "Chào buổi sáng, Chic Boutique xin nghe, tôi có thể giúp gì cho quý khách ạ?",
        "ipaUs": "/ɡʊd ˈmɔːr.nɪŋ ʃiːk buːˈtiːk haʊ meɪ aɪ hɛlp juː/",
        "keywords": ["Chic Boutique", "how may I help you"],
        "properNouns": ["Chic Boutique"],
        "explanationAi": "Lời chào mở đầu cuộc gọi doanh nghiệp chuẩn mực của người Anh: Nêu tên công ty + Đề nghị hỗ trợ."
    },
    {
        "orderIndex": 2,
        "speaker": "John Wright",
        "startTime": 15.30,
        "endTime": 17.66,
        "text": "I'd like to speak to Mr Morgan please.",
        "translationVi": "Tôi muốn nói chuyện với ông Morgan làm ơn.",
        "ipaUs": "/aɪd laɪk tuː spiːk tuː ˈmɪs.tər ˈmɔːr.ɡən pliːz/",
        "keywords": ["speak to", "Mr Morgan", "please"],
        "properNouns": ["Mr Morgan"],
        "explanationAi": "'I'd like to speak to [someone]' là cấu trúc chuẩn mực và lịch sự nhất khi gọi điện yêu cầu gặp ai đó."
    },
    {
        "orderIndex": 3,
        "speaker": "Receptionist",
        "startTime": 17.66,
        "endTime": 19.80,
        "text": "Who's calling please?",
        "translationVi": "Xin lỗi cho hỏi ai đang gọi vậy ạ?",
        "ipaUs": "/huːz ˈkɔː.lɪŋ pliːz/",
        "keywords": ["who's calling", "please"],
        "properNouns": [],
        "explanationAi": "Câu hỏi lịch thiệp dùng để xác minh danh tính người gọi trước khi chuyển máy."
    },
    {
        "orderIndex": 4,
        "speaker": "John Wright",
        "startTime": 19.80,
        "endTime": 23.18,
        "text": "This is John Wright from International Fashion Supplies.",
        "translationVi": "Tôi là John Wright đến từ công ty International Fashion Supplies.",
        "ipaUs": "/ðɪs ɪz dʒɒn raɪt frʌm ˌɪn.təˈnæʃ.ən.əl ˈfæʃ.ən səˈplaɪz/",
        "keywords": ["This is", "John Wright", "International Fashion Supplies"],
        "properNouns": ["John Wright", "International Fashion Supplies"],
        "explanationAi": "Trong điện thoại tiếng Anh, người ta dùng 'This is [Tên]' thay vì 'I am [Tên]' để tự giới thiệu bản thân."
    },
    {
        "orderIndex": 5,
        "speaker": "Receptionist",
        "startTime": 23.18,
        "endTime": 25.50,
        "text": "Sorry, I didn't catch your name.",
        "translationVi": "Xin lỗi, tôi chưa nghe rõ tên của ông.",
        "ipaUs": "/ˈsɒr.i aɪ ˈdɪd.ənt kætʃ jɔːr neɪm/",
        "keywords": ["didn't catch", "name"],
        "properNouns": [],
        "explanationAi": "'I didn't catch [something]' là thành ngữ lịch sự nghĩa là 'tôi chưa nghe rõ / chưa kịp nắm bắt được thông tin'."
    },
    {
        "orderIndex": 6,
        "speaker": "John Wright",
        "startTime": 25.50,
        "endTime": 27.45,
        "text": "John Wright.",
        "translationVi": "John Wright.",
        "ipaUs": "/dʒɒn raɪt/",
        "keywords": ["John Wright"],
        "properNouns": ["John Wright"],
        "explanationAi": "Nhắc lại tên riêng rõ ràng để người nghe ghi chép chính xác."
    },
    {
        "orderIndex": 7,
        "speaker": "John Wright",
        "startTime": 27.45,
        "endTime": 31.00,
        "text": "That's W-R-I-G-H-T.",
        "translationVi": "Đánh vần là W-R-I-G-H-T.",
        "ipaUs": "/ðæts ˈdʌb.əl.juː ɑːr aɪ dʒiː eɪtʃ tiː/",
        "keywords": ["W-R-I-G-H-T", "spelling"],
        "properNouns": ["W-R-I-G-H-T"],
        "explanationAi": "Kỹ năng đánh vần từng chữ cái (spelling) rất quan trọng trong giao tiếp điện thoại doanh nghiệp khi tên có cách viết đặc biệt."
    },
    {
        "orderIndex": 8,
        "speaker": "Receptionist",
        "startTime": 31.00,
        "endTime": 35.23,
        "text": "Okay Mr Wright, I'll try and put you through.",
        "translationVi": "Vâng thưa ông Wright, tôi sẽ thử nối máy cho ông ạ.",
        "ipaUs": "/oʊˈkeɪ ˈmɪs.tər raɪt aɪl traɪ ænd pʊt juː θruː/",
        "keywords": ["put you through", "try"],
        "properNouns": ["Mr Wright"],
        "explanationAi": "'put you through' là cụm động từ chuẩn công sở mang nghĩa 'kết nối máy / chuyển máy cho bạn'."
    },
    {
        "orderIndex": 9,
        "speaker": "Receptionist",
        "startTime": 35.23,
        "endTime": 39.20,
        "text": "I'm afraid the line's engaged, would you like to hold?",
        "translationVi": "Tôi e rằng đường dây đang bận, ông có muốn giữ máy chờ không ạ?",
        "ipaUs": "/aɪm əˈfreɪd ðə laɪnz ɪnˈɡeɪdʒd wʊd juː laɪk tuː hoʊld/",
        "keywords": ["line's engaged", "hold the line", "afraid"],
        "properNouns": [],
        "explanationAi": "'the line's engaged' (tiếng Anh-Anh) tương đương với 'the line is busy' (tiếng Anh-Mỹ), nghĩa là máy đang bận."
    },
    {
        "orderIndex": 10,
        "speaker": "John Wright",
        "startTime": 39.20,
        "endTime": 41.28,
        "text": "Uh, can I leave a message?",
        "translationVi": "À, tôi có thể để lại lời nhắn được không?",
        "ipaUs": "/ʌ kæn aɪ liːv ə ˈmɛs.ɪdʒ/",
        "keywords": ["leave a message"],
        "properNouns": [],
        "explanationAi": "'leave a message' là hành động để lại tin nhắn khi người cần gặp không thể nghe máy."
    },
    {
        "orderIndex": 11,
        "speaker": "Receptionist",
        "startTime": 41.28,
        "endTime": 43.00,
        "text": "Certainly.",
        "translationVi": "Dạ chắc chắn rồi ạ.",
        "ipaUs": "/ˈsɜːr.tən.li/",
        "keywords": ["Certainly"],
        "properNouns": [],
        "explanationAi": "'Certainly' là phản hồi đồng ý trang trọng, chuyên nghiệp hơn rất nhiều so với 'Yes' hay 'Okay'."
    },
    {
        "orderIndex": 12,
        "speaker": "John Wright",
        "startTime": 43.00,
        "endTime": 47.00,
        "text": "Could you please tell Mr Morgan our latest shipment has been delayed...",
        "translationVi": "Cô có thể vui lòng nhắn với ông Morgan là chuyến hàng mới nhất của chúng tôi đã bị hoãn...",
        "ipaUs": "/kʊd juː pliːz tɛl ˈmɪs.tər ˈmɔːr.ɡən ˈaʊər ˈleɪ.tɪst ˈʃɪp.mənt hæz biːn dɪˈleɪd/",
        "keywords": ["latest shipment", "delayed", "Mr Morgan"],
        "properNouns": ["Mr Morgan"],
        "explanationAi": "'shipment has been delayed' là thuật ngữ thương mại thông báo việc giao hàng bị chậm trễ so với kế hoạch."
    },
    {
        "orderIndex": 13,
        "speaker": "John Wright",
        "startTime": 47.00,
        "endTime": 50.50,
        "text": "...and that the 300 dresses he ordered should arrive next Friday.",
        "translationVi": "...và 300 chiếc váy ông ấy đặt dự kiến sẽ đến vào thứ Sáu tuần tới.",
        "ipaUs": "/ænd ðæt ðə θriː ˈhʌn.drəd ˈdrɛs.ɪz hiː ˈɔːr.dərd ʃʊd əˈraɪv nɛkst ˈfraɪ.deɪ/",
        "keywords": ["300 dresses", "ordered", "next Friday"],
        "properNouns": ["Friday"],
        "explanationAi": "Cung cấp chi tiết số lượng (300 dresses) và mốc thời gian dự kiến giao hàng mới (next Friday)."
    },
    {
        "orderIndex": 14,
        "speaker": "Receptionist",
        "startTime": 50.50,
        "endTime": 54.24,
        "text": "Dress order delayed... arriving next Friday.",
        "translationVi": "Đơn hàng váy bị hoãn... sẽ đến vào thứ Sáu tuần tới.",
        "ipaUs": "/drɛs ˈɔːr.dər dɪˈleɪd əˈraɪ.vɪŋ nɛkst ˈfraɪ.deɪ/",
        "keywords": ["order delayed", "arriving next Friday"],
        "properNouns": ["Friday"],
        "explanationAi": "Kỹ năng ghi chép thông tin vắn tắt (note-taking) của lễ tân khi tiếp nhận lời nhắn quan trọng."
    },
    {
        "orderIndex": 15,
        "speaker": "John Wright",
        "startTime": 54.24,
        "endTime": 58.30,
        "text": "Yes, and would you please ask him to give me a call as soon as the shipment arrives?",
        "translationVi": "Vâng, và cô có thể vui lòng nhờ ông ấy gọi lại cho tôi ngay khi chuyến hàng đến được không?",
        "ipaUs": "/jɛs ænd wʊd juː pliːz æsk hɪm tuː ɡɪv miː ə kɔːl æz suːn æz ðə ˈʃɪp.mənt əˈraɪvz/",
        "keywords": ["give me a call", "as soon as", "shipment arrives"],
        "properNouns": [],
        "explanationAi": "'give someone a call' là cách diễn đạt phổ biến mang nghĩa 'gọi điện cho ai'. 'as soon as' chỉ tính kịp thời ngay khi có biến động."
    },
    {
        "orderIndex": 16,
        "speaker": "Receptionist",
        "startTime": 58.30,
        "endTime": 62.14,
        "text": "Of course. Could you let me have your number please?",
        "translationVi": "Dạ dĩ nhiên rồi ạ. Ông có thể vui lòng cho tôi xin số điện thoại được không?",
        "ipaUs": "/əv kɔːrs kʊd juː lɛt miː hæv jʊər ˈnʌm.bər pliːz/",
        "keywords": ["Of course", "have your number", "please"],
        "properNouns": [],
        "explanationAi": "'Could you let me have your number please?' là mẫu câu lịch sự hỏi xin số điện thoại liên lạc của đối tác."
    },
    {
        "orderIndex": 17,
        "speaker": "John Wright",
        "startTime": 62.14,
        "endTime": 67.50,
        "text": "Yes, it's zero one six three two nine six zero double nine four.",
        "translationVi": "Vâng, số của tôi là 01632 960994.",
        "ipaUs": "/jɛs ɪts ˈzɪə.roʊ wʌn sɪks θriː tuː naɪn sɪks ˈzɪə.roʊ ˈdʌb.əl naɪn fɔːr/",
        "keywords": ["zero one six three two", "double nine four"],
        "properNouns": [],
        "explanationAi": "Người Anh thường dùng 'double [number]' khi đọc hai chữ số giống nhau đứng liền nhau (ví dụ 99 đọc là double nine)."
    },
    {
        "orderIndex": 18,
        "speaker": "Receptionist",
        "startTime": 67.50,
        "endTime": 72.45,
        "text": "That's oh one six three two nine six oh double nine four.",
        "translationVi": "Dạ là 01632 960994 ạ.",
        "ipaUs": "/ðæts oʊ wʌn sɪks θriː tuː naɪn sɪks oʊ ˈdʌb.əl naɪn fɔːr/",
        "keywords": ["oh one six three two", "read back"],
        "properNouns": [],
        "explanationAi": "Lễ tân đọc lại (read-back) để xác nhận số điện thoại, trong đó số 0 được đọc là 'oh'."
    },
    {
        "orderIndex": 19,
        "speaker": "John Wright",
        "startTime": 72.45,
        "endTime": 74.20,
        "text": "Yes, that's right.",
        "translationVi": "Vâng, đúng rồi đó.",
        "ipaUs": "/jɛs ðæts raɪt/",
        "keywords": ["that's right"],
        "properNouns": [],
        "explanationAi": "Xác nhận tính chính xác của thông tin vừa đối chiếu."
    },
    {
        "orderIndex": 20,
        "speaker": "John Wright",
        "startTime": 74.20,
        "endTime": 76.00,
        "text": "Thanks for your help.",
        "translationVi": "Cảm ơn sự giúp đỡ của cô.",
        "ipaUs": "/θæŋks fɔːr jʊər hɛlp/",
        "keywords": ["Thanks for your help"],
        "properNouns": [],
        "explanationAi": "Lời cảm ơn lịch sự trước khi cúp máy."
    },
    {
        "orderIndex": 21,
        "speaker": "Receptionist",
        "startTime": 76.00,
        "endTime": 77.30,
        "text": "Goodbye.",
        "translationVi": "Tạm biệt ông ạ.",
        "ipaUs": "/ɡʊdˈbaɪ/",
        "keywords": ["Goodbye"],
        "properNouns": [],
        "explanationAi": "Lời chào tạm biệt chuẩn mực của lễ tân."
    },
    {
        "orderIndex": 22,
        "speaker": "John Wright",
        "startTime": 77.30,
        "endTime": 78.93,
        "text": "Goodbye.",
        "translationVi": "Tạm biệt cô.",
        "ipaUs": "/ɡʊdˈbaɪ/",
        "keywords": ["Goodbye"],
        "properNouns": [],
        "explanationAi": "Lời chào tạm biệt đáp lại kết thúc cuộc gọi."
    }
]

# Calculate token counts and remove speaker property
for seg in raw_segments:
    seg.pop("speaker", None)
    tokens = re.findall(r'\b[A-Za-z0-9_]+\b', seg["text"])
    seg["tokenCount"] = len(tokens)

with open('scripts/business_phone_call_master_22_segments.json', 'w', encoding='utf-8') as f:
    json.dump(raw_segments, f, ensure_ascii=False, indent=2)

print(f"Generated {len(raw_segments)} pure master segments!")
print(f"Total tokens: {sum(s['tokenCount'] for s in raw_segments)}")

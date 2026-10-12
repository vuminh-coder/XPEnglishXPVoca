import json
import os
import re

# Engine function
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/sitcoms"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 1. mov_sit_07: How I Met Your Mother - Barney Stinson
# ============================================================================
cfg_07 = {
    "id": "mov_sit_07",
    "slug": "how-i-met-your-mother-barney-playbook-theories",
    "var_lesson": "LESSON_HOW_I_MET_YOUR_MOTHER_BARNEY_PLAYBOOK_THEORIES",
    "var_quiz": "QUIZ_HOW_I_MET_YOUR_MOTHER_BARNEY_PLAYBOOK_THEORIES",
    "file": "lesson_how_i_met_your_mother_barney_playbook_theories.ts",
    "externalId": "WjVtAbcT-po",
    "title": "How I Met Your Mother: Barney Stinson's Most Legendary Moments",
    "durationSeconds": 607,
    "durationFormatted": "10:07",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 145,
    "viewCount": 1649040,
    "studyCount": 3890,
    "description": "Tuyển tập những khoảnh khắc huyền thoại kinh điển nhất của Barney Stinson (Neil Patrick Harris): từ các triết lý 'Suit up!', 'Legendary', 'Challenge accepted!' đến những chiêu trò đối đáp hài hước đỉnh cao tại quán bar MacLaren's.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segments_07 = [
    {
        "orderIndex": 0,
        "startTime": 5.2,
        "endTime": 12.8,
        "text": "A lie is just a great story that someone ruined with the truth. Suit up! It is going to be legendary!",
        "translationVi": "Một lời nói dối thực chất chỉ là một câu chuyện tuyệt vời mà ai đó đã phá hỏng bằng sự thật. Mặc vest vào đi! Chuyến này sẽ vô cùng huyền thoại!",
        "ipaUs": "/ə laɪ ɪz dʒʌst ə ɡreɪt ˈstɔːri ðæt ˈsʌmwʌn ˈruːɪnd wɪð ðə truːθ. suːt ʌp! ɪt ɪz ˈɡoʊɪŋ tuː biː ˈlɛdʒənˌdɛri!/",
        "keywords": ["ruined with the truth", "suit up", "legendary"],
        "explanationAi": "Khẩu hiệu kinh điển bất hủ của Barney Stinson trong How I Met Your Mother: triết lý tự tin và lối sống luôn mặc vest chỉnh tề.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 48.0,
        "endTime": 58.5,
        "text": "Whatever you do in this life, it's not legendary unless your friends are there to see it. Ted, you're my best friend.",
        "translationVi": "Bất kể cậu làm gì trong cuộc đời này, nó sẽ chẳng thể nào trở thành huyền thoại trừ phi có những người bạn thân ở đó chứng kiến. Ted, cậu là bạn thân nhất của tớ.",
        "ipaUs": "/wʌtˈɛvər juː duː ɪn ðɪs laɪf, ɪts nɑːt ˈlɛdʒənˌdɛri ənˈlɛs jʊər frɛndz ɑːr ðɛər tuː siː ɪt. tɛd, jʊər maɪ bɛst frɛnd./",
        "keywords": ["unless", "friends are there", "best friend"],
        "explanationAi": "Khoảnh khắc cảm động hiếm hoi bộc lộ tình bạn chân thành ẩn sau vẻ ngoài ngổ ngáo và bông đùa của Barney.",
        "properNouns": ["Ted"]
    },
    {
        "orderIndex": 2,
        "startTime": 122.4,
        "endTime": 133.0,
        "text": "When I get sad, I stop being sad and be awesome instead. True story! Challenge accepted!",
        "translationVi": "Mỗi khi tôi cảm thấy buồn, tôi dừng việc buồn bã lại và trở nên tuyệt vời thay vào đó. Chuyện có thật một trăm phần trăm! Thử thách được chấp nhận!",
        "ipaUs": "/wɛn aɪ ɡɛt sæd, aɪ stɑːp ˈbiːɪŋ sæd ænd biː ˈɔːsəm ɪnˈstɛd. truː ˈstɔːri! ˈtʃælɪndʒ əkˈsɛptɪd!/",
        "keywords": ["stop being sad", "be awesome instead", "challenge accepted"],
        "explanationAi": "Cụm cửa miệng 'True story' và 'Challenge accepted' thể hiện tinh thần lạc quan tếu táo đặc trưng của văn hóa sitcom Mỹ.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 210.5,
        "endTime": 224.0,
        "text": "There are only two reasons to date a girl for more than a month: she has a pool, or her dad owns a comic book store.",
        "translationVi": "Chỉ có đúng hai lý do để hẹn hò với một cô gái quá một tháng: hoặc là nhà cô ấy có bể bơi, hoặc là bố cô ấy sở hữu một cửa tiệm truyện tranh.",
        "ipaUs": "/ðɛər ɑːr ˈoʊnli tuː ˈriːzənz tuː deɪt ə ɡɜːrl fɔːr mɔːr ðæn ə mʌnθ: ʃiː hæz ə puːl, ɔːr hɜːr dæd oʊnz ə ˈkɑːmɪk bʊk stɔːr./",
        "keywords": ["reasons to date", "more than a month", "comic book store"],
        "explanationAi": "Lối hài hước cường điệu (hyperbole) và lập luận phi lý quen thuộc tạo nên thương hiệu của nhân vật Barney.",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 340.2,
        "endTime": 352.0,
        "text": "Every rule in The Playbook is designed to achieve one specific objective: leaving an unforgettable impression.",
        "translationVi": "Mọi quy tắc trong cuốn Cẩm Nang Tán Tỉnh đều được thiết kế để đạt được một mục tiêu duy nhất: để lại một ấn tượng không thể nào quên.",
        "ipaUs": "/ˈɛvri ruːl ɪn ðə ˈpleɪˌbʊk ɪz dɪˈzaɪnd tuː əˈtʃiːv wʌn spəˈsɪfɪk əbˈdʒɛktɪv: ˈliːvɪŋ ən ˌʌnfərˈɡɛtəbl ɪmˈprɛʃən./",
        "keywords": ["The Playbook", "specific objective", "unforgettable impression"],
        "explanationAi": "Từ vựng 'Playbook' (sách chiến thuật), 'objective' (mục tiêu cụ thể), 'unforgettable impression' (ấn tượng khó phai).",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 480.0,
        "endTime": 494.0,
        "text": "Haaaaave you met Ted? It is the simplest, most foolproof wingman technique known to human civilization.",
        "translationVi": "Cậu đaaaaang gặp Ted bao giờ chưa? Đó là chiêu mai mối giản dị và chuẩn xác không tì vết nhất mà nền văn minh nhân loại từng biết đến.",
        "ipaUs": "/hæv juː mɛt tɛd? ɪt ɪz ðə ˈsɪmplɪst, moʊst ˈfuːlˌpruːf ˈwɪŋmən tɛkˈniːk noʊn tuː ˈhjuːmən ˌsɪvɪlaɪˈzeɪʃən./",
        "keywords": ["Have you met Ted", "foolproof", "wingman technique"],
        "explanationAi": "Thuật ngữ 'wingman' (người bạn yểm trợ mai mối) và 'foolproof' (đảm bảo thành công không thể sai sót).",
        "properNouns": ["Ted"]
    }
]

quiz_07 = [
    {
        "id": "mov_sit_07_q1",
        "question": "What is Barney Stinson's philosophical rule about true friendship and being legendary?",
        "questionVi": "Quy tắc triết lý của Barney Stinson về tình bạn đích thực và sự 'huyền thoại' là gì?",
        "options": [
            "It doesn't matter who is around as long as you make money.",
            "Whatever you do in life is not legendary unless your friends are there to see it.",
            "You should always travel to Paris alone without telling anyone.",
            "Real legends never share their secrets with their close friends."
        ],
        "optionsVi": [
            "Không quan trọng ai ở xung quanh miễn là bạn kiếm được nhiều tiền.",
            "Bất kể làm gì trong đời, nó sẽ không là huyền thoại trừ phi bạn bè có mặt chứng kiến.",
            "Bạn nên luôn du lịch đến Paris một mình mà không báo ai.",
            "Những huyền thoại thực sự không bao giờ chia sẻ bí mật với bạn bè."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 1, Barney says: 'Whatever you do in this life, it's not legendary unless your friends are there to see it.'",
        "explanationVi": "Trong Phân đoạn 1, Barney khẳng định: 'Bất kể cậu làm gì trong cuộc đời này, nó chẳng thể nào là huyền thoại trừ phi có bạn bè ở đó chứng kiến.'",
        "targetedConcept": "Understanding the emotional core of Barney's friendship",
        "targetedConceptVi": "Hiểu ý nghĩa cốt lõi về tình bạn của Barney",
        "referenceSegmentIndex": 1
    },
    {
        "id": "mov_sit_07_q2",
        "question": "What is Barney's famous wingman opening line used to introduce Ted?",
        "questionVi": "Câu thoại mở đầu mai mối nổi tiếng của Barney khi giới thiệu Ted cho người khác là gì?",
        "options": [
            "'Excuse me, do you know what time it is?'",
            "'Haaaaave you met Ted?'",
            "'Let me tell you about my architect friend.'",
            "'Would you like to see his resume?'"
        ],
        "optionsVi": [
            "'Xin lỗi, bạn có biết mấy giờ rồi không?'",
            "'Cậu đã gặp Ted bao giờ chưa?'",
            "'Để tôi kể cho bạn nghe về người bạn kiến trúc sư của tôi.'",
            "'Bạn có muốn xem sơ yếu lý lịch của anh ấy không?'"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 5, Barney uses his iconic wingman line: 'Haaaaave you met Ted?'",
        "explanationVi": "Trong Phân đoạn 5, Barney sử dụng chiêu mở lời mai mối thương hiệu: 'Haaaaave you met Ted?'",
        "targetedConcept": "Iconic sitcom pop-culture catchphrase",
        "targetedConceptVi": "Cụm từ khẩu hiệu kinh điển trong văn hóa sitcom",
        "referenceSegmentIndex": 5
    }
]

# ============================================================================
# 2. mov_sit_08: Brooklyn Nine-Nine - Jake Peralta
# ============================================================================
cfg_08 = {
    "id": "mov_sit_08",
    "slug": "brooklyn-nine-nine-jake-i-want-it-that-way",
    "var_lesson": "LESSON_BROOKLYN_NINE_NINE_JAKE_I_WANT_IT_THAT_WAY",
    "var_quiz": "QUIZ_BROOKLYN_NINE_NINE_JAKE_I_WANT_IT_THAT_WAY",
    "file": "lesson_brooklyn_nine_nine_jake_i_want_it_that_way.ts",
    "externalId": "EVKutiIBsw8",
    "title": "Brooklyn Nine-Nine: Jake Peralta's Funniest & Most Unhinged Cold Opens",
    "durationSeconds": 2588,
    "durationFormatted": "43:08",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 150,
    "viewCount": 2123141,
    "studyCount": 4120,
    "description": "Tuyển tập những màn mở đầu (Cold Opens) và thẩm vấn hài hước nhất của thám tử Jake Peralta (Andy Samberg): từ 'I Want It That Way' huyền thoại, cuộc thi bọ nhảy của Terry, đến những trò nghịch ngợm khiến Đại úy Holt phải chào thua.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segments_08 = [
    {
        "orderIndex": 0,
        "startTime": 5.4,
        "endTime": 15.0,
        "text": "Sergeant Terence Jeffords, four years ago on this exact date you told me I was too old to learn how to do the worm.",
        "translationVi": "Thưa Trung sĩ Terence Jeffords, bốn năm trước đúng vào ngày này, anh đã bảo rằng tôi quá già để học điệu nhảy sâu uốn éo.",
        "ipaUs": "/ˈsɑːrdʒənt ˈtɛrəns ˈdʒɛfərdz, fɔːr jɪərz əˈɡoʊ ɑːn ðɪs ɪɡˈzækt deɪt juː toʊld miː aɪ wʌz tuː oʊld tuː lɜːrn haʊ tuː duː ðə wɜːrm./",
        "keywords": ["exact date", "too old", "do the worm"],
        "explanationAi": "Cấu trúc 'on this exact date' (chính xác vào ngày này) và 'do the worm' (điệu nhảy sâu uốn lượn trên sàn).",
        "properNouns": ["Terence Jeffords"]
    },
    {
        "orderIndex": 1,
        "startTime": 16.0,
        "endTime": 25.5,
        "text": "I vowed on that day to prove you a fool, and today I fulfill that vow! Witness perfection!",
        "translationVi": "Vào ngày hôm đó, tôi đã thề sẽ chứng minh anh là một kẻ ngốc, và hôm nay tôi hoàn thành lời thề ấy! Hãy chiêm ngưỡng sự hoàn hảo!",
        "ipaUs": "/aɪ vaʊd ɑːn ðæt deɪ tuː pruːv juː ə fuːl, ænd təˈdeɪ aɪ fʊlˈfɪl ðæt vaʊ! ˈwɪtnəs pərˈfɛkʃən!/",
        "keywords": ["vowed", "prove you a fool", "fulfill that vow", "witness"],
        "explanationAi": "Văn phong trang trọng khoa trương hài hước: động từ 'vow' (thề nguyền), 'fulfill a vow' (hoàn thành lời thề).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 85.0,
        "endTime": 96.0,
        "text": "Tell me why! Ain't nothing but a heartache! Tell me why! Ain't nothing but a mistake! Now number five...",
        "translationVi": "Hãy nói cho tôi biết tại sao! Chẳng là gì ngoài một nỗi đau lòng! Nói cho tôi biết tại sao! Chẳng là gì ngoài một sai lầm! Giờ đến lượt nghi phạm số năm...",
        "ipaUs": "/tɛl miː waɪ! eɪnt ˈnʌθɪŋ bʌt ə ˈhɑːrtˌeɪk! tɛl miː waɪ! eɪnt ˈnʌθɪŋ bʌt ə mɪsˈteɪk! naʊ ˈnʌmbər faɪv.../",
        "keywords": ["ain't nothing but", "heartache", "mistake", "number five"],
        "explanationAi": "Trích đoạn huyền thoại nhận diện nghi phạm bằng cách bắt cả hàng kẻ tình nghi hòa ca theo giai điệu Backstreet Boys.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 97.0,
        "endTime": 108.5,
        "text": "I never wanna hear you say: I want it that way! — Chills, literal chills! — It was number five. Number five killed my brother.",
        "translationVi": "Tôi không bao giờ muốn nghe em nói: Em muốn mọi chuyện như thế! — Nổi da gà, đúng nghĩa nổi cả da gà luôn! — Là số năm. Số năm đã giết anh trai tôi.",
        "ipaUs": "/aɪ ˈnɛvər ˈwɑːnə hɪər juː seɪ: aɪ wɑːnt ɪt ðæt weɪ! — tʃɪlz, ˈlɪtərəl tʃɪlz! — ɪt wʌz ˈnʌmbər faɪv. ˈnʌmbər faɪv kɪld maɪ ˈbrʌðər./",
        "keywords": ["literal chills", "I want it that way", "killed my brother"],
        "explanationAi": "Cao trào hài hước chuyển đột ngột từ sự phấn khích của điệu nhạc sang hiện thực phá án nghiêm túc: 'literal chills' (nổi gai ốc thực sự).",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 109.0,
        "endTime": 118.0,
        "text": "Oh, my God, I forgot about that part. Cool, cool, cool, cool, cool, no doubt, no doubt, no doubt.",
        "translationVi": "Ôi trời đất ơi, tôi quên béng mất cái chi tiết đó. Tuyệt, tuyệt, ổn, ổn mà, không còn nghi ngờ gì nữa.",
        "ipaUs": "/oʊ, maɪ ɡɑːd, aɪ fərˈɡɑːt əˈbaʊt ðæt pɑːrt. kuːl, kuːl, kuːl, noʊ daʊt, noʊ daʊt./",
        "keywords": ["forgot about that part", "cool cool cool", "no doubt"],
        "explanationAi": "Phản xạ lặp từ kinh điển 'Cool cool cool, no doubt' của Jake khi rơi vào tình huống bối rối khó đỡ.",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 230.0,
        "endTime": 242.0,
        "text": "Title of your sex tape! That is by far the greatest deduction in the history of the Ninety-Ninth Precinct.",
        "translationVi": "Tên cuốn băng nhạy cảm của cậu nhé! Đó là suy luận vĩ đại nhất trong lịch sử phân đồn cảnh sát chín mươi chín.",
        "ipaUs": "/ˈtaɪtl əv jʊər sɛks teɪp! ðæt ɪz baɪ fɑːr ðə ˈɡreɪtɪst dɪˈdʌkʃən ɪn ðə ˈhɪstəri əv ðə ˈnaɪnti nɪnθ ˈpriːsɪŋkt./",
        "keywords": ["title of your sex tape", "by far", "greatest deduction", "precinct"],
        "explanationAi": "Câu đùa kinh điển 'Title of your sex tape' dùng để bắt bẻ hài hước bất cứ phát ngôn nào có thể hiểu theo nghĩa bóng.",
        "properNouns": ["Ninety-Ninth Precinct"]
    }
]

quiz_08 = [
    {
        "id": "mov_sit_08_q1",
        "question": "What song does Jake have the lineup suspects sing to identify the killer?",
        "questionVi": "Jake đã bắt các nghi phạm hát bài hát nào để nhân chứng nhận diện kẻ sát nhân?",
        "options": [
            "'Bohemian Rhapsody' by Queen",
            "'I Want It That Way' by Backstreet Boys",
            "'Stayin' Alive' by Bee Gees",
            "'Billie Jean' by Michael Jackson"
        ],
        "optionsVi": [
            "'Bohemian Rhapsody' của Queen",
            "'I Want It That Way' của Backstreet Boys",
            "'Stayin' Alive' của Bee Gees",
            "'Billie Jean' của Michael Jackson"
        ],
        "correctAnswer": 1,
        "explanation": "In Segments 2 and 3, Jake conducts the iconic police lineup singing 'I Want It That Way'.",
        "explanationVi": "Trong Phân đoạn 2 và 3, Jake đã chỉ huy màn hòa ca 'I Want It That Way' nổi tiếng nhất lịch sử Brooklyn Nine-Nine.",
        "targetedConcept": "Pop-culture comedy scene comprehension",
        "targetedConceptVi": "Đọc hiểu phân cảnh hài kịch văn hóa đại chúng",
        "referenceSegmentIndex": 2
    },
    {
        "id": "mov_sit_08_q2",
        "question": "What is Jake's trademark coping reaction when he realizes he got too excited singing and forgot about the murder?",
        "questionVi": "Phản xạ chữa thẹn thương hiệu của Jake khi nhận ra mình mải hát mà quên mất vụ giết người là gì?",
        "options": [
            "He starts crying and apologizes profusely.",
            "'Cool, cool, cool, cool, cool, no doubt, no doubt, no doubt.'",
            "He blames Charles Boyle for the interruption.",
            "He immediately resigns from the police department."
        ],
        "optionsVi": [
            "Anh bắt đầu khóc và xin lỗi rối rít.",
            "'Cool, cool, cool, cool, cool, no doubt, no doubt, no doubt.'",
            "Anh đổ lỗi cho Charles Boyle vì đã ngắt lời.",
            "Anh nộp đơn xin từ chức ngay lập tức."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Jake stammers his signature catchphrase: 'Cool, cool, cool... no doubt, no doubt.'",
        "explanationVi": "Trong Phân đoạn 4, Jake ấp úng câu cửa miệng thương hiệu: 'Cool, cool, cool... no doubt, no doubt.'",
        "targetedConcept": "Character verbal tic and comedic timing",
        "targetedConceptVi": "Nhận diện thói quen ngôn ngữ nhân vật hài kịch",
        "referenceSegmentIndex": 4
    }
]

# Write out the two lessons
with open(os.path.join(target_dir, cfg_07["file"]), "w", encoding="utf-8") as f:
    f.write(generate_ts_lesson(cfg_07, segments_07, quiz_07))
print(f"Generated {cfg_07['file']}")

with open(os.path.join(target_dir, cfg_08["file"]), "w", encoding="utf-8") as f:
    f.write(generate_ts_lesson(cfg_08, segments_08, quiz_08))
print(f"Generated {cfg_08['file']}")

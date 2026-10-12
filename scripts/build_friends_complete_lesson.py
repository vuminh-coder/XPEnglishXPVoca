import json
import re

# Master script for Friends Apartment Bet Trivia Game (v1xXlxDHWPU - 313s)
# Level: B1 | American Accent

raw_segments_data = [
    {
        "startTime": 0.0,
        "endTime": 4.8,
        "text": "I just can't believe that you think that you and Chandler know me and Rachel better than we know you.",
        "translationVi": "Em thật sự không thể tin được là anh và Chandler lại dám nghĩ hai người hiểu em và Rachel hơn là bọn em hiểu hai người đấy.",
        "ipaUs": "/aɪ dʒʌst kænt bɪˈliːv ðæt juː θɪŋk ðæt juː ænd ˈtʃændlər noʊ miː ænd ˈreɪtʃəl ˈbɛtər ðæn wiː noʊ juː./",
        "keywords": ["can't believe", "know someone better"],
        "explanationAi": "Monica mở đầu màn tranh luận đầy hiếu thắng quen thuộc: niềm tin tuyệt đối rằng phái nữ luôn thấu hiểu đối phương hơn cánh đàn ông.",
        "properNouns": ["Chandler", "Rachel"]
    },
    {
        "startTime": 5.0,
        "endTime": 6.8,
        "text": "Well, we do.",
        "translationVi": "Thì bọn này hiểu hơn thật mà.",
        "ipaUs": "/wɛl, wiː duː./",
        "keywords": ["we do", "assertion"],
        "explanationAi": "Joey khẳng định ngắn gọn và dứt khoát bằng trợ động từ 'do' để nhấn mạnh tính hiển nhiên.",
        "properNouns": []
    },
    {
        "startTime": 7.0,
        "endTime": 10.5,
        "text": "You can only eat Tic Tacs in even numbers.",
        "translationVi": "Cậu chỉ có thể ăn kẹo Tic Tac theo số lượng chẵn thôi.",
        "ipaUs": "/juː kæn ˈoʊnli iːt tɪk tæks ɪn ˈiːvən ˈnʌmbərz./",
        "keywords": ["Tic Tacs", "even numbers"],
        "explanationAi": "Bằng chứng đầu tiên về tính cách kỳ quặc (compulsive quirk) của Monica: chỉ ăn kẹo theo cặp số chẵn (2, 4, 6 viên).",
        "properNouns": ["Tic Tacs"]
    },
    {
        "startTime": 11.0,
        "endTime": 13.0,
        "text": "Yeah, well, what's that about?!",
        "translationVi": "Ừ thì... chuyện đó thì có làm sao chứ?!",
        "ipaUs": "/jæ, wɛl, wʌts ðæt əˈbaʊt?!/",
        "keywords": ["what's that about", "defensive"],
        "explanationAi": "Khẩu ngữ 'What's that about?' được Monica dùng trong tư thế phòng thủ hài hước khi bị vạch trần thói quen kỳ lạ.",
        "properNouns": []
    },
    {
        "startTime": 13.2,
        "endTime": 20.2,
        "text": "And you, Ross, I believe if you check Rachel's bag, you will find a half-eaten box of cookies in there.",
        "translationVi": "Còn cậu, Ross, tớ tin chắc nếu cậu kiểm tra túi của Rachel, cậu sẽ tìm thấy một hộp bánh quy đang ăn dở trong đó đấy.",
        "ipaUs": "/ænd juː, rɔːs, aɪ bɪˈliːv ɪf juː tʃɛk ˈreɪtʃəlz bæɡ, juː wɪl faɪnd ə hæf-ˈiːtən bɑːks əv ˈkʊkiz ɪn ðɛr./",
        "keywords": ["half-eaten", "cookies in bag"],
        "explanationAi": "Chandler tung bằng chứng thứ hai cực kỳ chuẩn xác nhắm vào Rachel: thói quen ăn vặt ngay khi vừa mua sắm.",
        "properNouns": ["Ross", "Rachel"]
    },
    {
        "startTime": 23.0,
        "endTime": 25.0,
        "text": "You're good.",
        "translationVi": "Cậu đỉnh thật đấy.",
        "ipaUs": "/jʊr ɡʊd./",
        "keywords": ["you're good", "acknowledgment"],
        "explanationAi": "Ross kiểm tra túi và thừa nhận sự nhạy bén bất ngờ của Chandler.",
        "properNouns": []
    },
    {
        "startTime": 25.8,
        "endTime": 28.0,
        "text": "These are not.",
        "translationVi": "Bánh này dở tệ.",
        "ipaUs": "/ðiːz ɑːr nɑːt./",
        "keywords": ["taste evaluation"],
        "explanationAi": "Rachel biện minh cho việc ăn dở bằng cách chê chất lượng bánh, tạo tiếng cười gián tiếp.",
        "properNouns": []
    },
    {
        "startTime": 28.5,
        "endTime": 32.2,
        "text": "So not impressed! Everybody snacks when they shop.",
        "translationVi": "Chẳng có gì ấn tượng cả! Ai đi mua sắm mà chẳng ăn vặt chứ.",
        "ipaUs": "/soʊ nɑːt ɪmˈprɛst! ˈɛvribɑːdi snæks wɛn ðeɪ ʃɑːp./",
        "keywords": ["so not impressed", "snacks when they shop"],
        "explanationAi": "Cách nói khẩu ngữ của giới trẻ Mỹ 'so not impressed' kết hợp động từ 'to snack' (ăn nhẹ, ăn vặt).",
        "properNouns": []
    },
    {
        "startTime": 32.5,
        "endTime": 33.5,
        "text": "Yeah.",
        "translationVi": "Đúng thế.",
        "ipaUs": "/jæ./",
        "keywords": ["agreement"],
        "explanationAi": "Monica đồng tình ngay lập tức để bảo vệ đồng đội Rachel.",
        "properNouns": []
    },
    {
        "startTime": 33.8,
        "endTime": 36.5,
        "text": "Oh, yeah? Ross, how many items left in that bag?",
        "translationVi": "Ồ vậy sao? Ross, còn bao nhiêu món đồ trong túi đó?",
        "ipaUs": "/oʊ, jæ? rɔːs, haʊ ˈmɛni ˈaɪtəmz lɛft ɪn ðæt bæɡ?/",
        "keywords": ["items left", "grocery bag"],
        "explanationAi": "Joey nâng tầm trò đố vui thành một vụ cá cược chính thức.",
        "properNouns": ["Ross"]
    },
    {
        "startTime": 36.6,
        "endTime": 37.5,
        "text": "Five.",
        "translationVi": "Năm món.",
        "ipaUs": "/faɪv./",
        "keywords": ["five items"],
        "explanationAi": "Ross giữ vai trò người kiểm chứng độc lập trung lập.",
        "properNouns": []
    },
    {
        "startTime": 37.8,
        "endTime": 42.5,
        "text": "Okay, ten bucks says that we can name every item in that bag.",
        "translationVi": "Được rồi, cá mười đô-la là bọn này có thể kể tên vanh vách từng món trong chiếc túi đó.",
        "ipaUs": "/oʊˈkeɪ, tɛn bʌks sɛz ðæt wiː kæn neɪm ˈɛvri ˈaɪtəm ɪn ðæt bæɡ./",
        "keywords": ["ten bucks says", "name every item"],
        "explanationAi": "Cấu trúc cá cược tự nhiên trong tiếng Anh Mỹ: '[Amount] bucks says that [clause]' (Cược ... đô rằng...).",
        "properNouns": []
    },
    {
        "startTime": 42.8,
        "endTime": 44.0,
        "text": "How many guesses do you get?",
        "translationVi": "Các anh được đoán bao nhiêu lần?",
        "ipaUs": "/haʊ ˈmɛni ˈɡɛsɪz duː juː ɡɛt?/",
        "keywords": ["how many guesses"],
        "explanationAi": "Monica tỉnh táo thương lượng giới hạn số lượt đoán.",
        "properNouns": []
    },
    {
        "startTime": 44.2,
        "endTime": 45.2,
        "text": "Six.",
        "translationVi": "Sáu lần.",
        "ipaUs": "/sɪks./",
        "keywords": ["six guesses"],
        "explanationAi": "Cho phép sai số tối đa 1 lượt (5 món trong 6 lượt đoán).",
        "properNouns": []
    },
    {
        "startTime": 45.4,
        "endTime": 47.5,
        "text": "Challenge extended.",
        "translationVi": "Lời thách thức đã được đưa ra.",
        "ipaUs": "/ˈtʃælɪndʒ ɪkˈstɛndɪd./",
        "keywords": ["challenge extended"],
        "explanationAi": "Monica dùng thuật ngữ mang tính nghi thức hài hước để chuẩn bị chấp nhận kèo đấu.",
        "properNouns": []
    },
    {
        "startTime": 48.8,
        "endTime": 50.0,
        "text": "Deal.",
        "translationVi": "Chốt kèo.",
        "ipaUs": "/diːl./",
        "keywords": ["deal"],
        "explanationAi": "Từ cảm thán xác nhận giao kèo phổ biến nhất trong tiếng Anh giao tiếp.",
        "properNouns": []
    },
    {
        "startTime": 50.2,
        "endTime": 52.5,
        "text": "Challenge accepted.",
        "translationVi": "Lời thách thức được chấp thuận.",
        "ipaUs": "/ˈtʃælɪndʒ ækˈsɛptɪd./",
        "keywords": ["challenge accepted"],
        "explanationAi": "Rachel chính thức đóng dấu cuộc cá cược.",
        "properNouns": []
    },
    {
        "startTime": 53.0,
        "endTime": 56.8,
        "text": "All right. We'll start with apples.",
        "translationVi": "Được rồi. Bọn này sẽ bắt đầu với táo.",
        "ipaUs": "/ɔːl raɪt. wiːl stɑːrt wɪð ˈæpəlz./",
        "keywords": ["start with", "apples"],
        "explanationAi": "Joey khởi động lượt đoán đầu tiên với món đồ dễ đoán nhất.",
        "properNouns": []
    },
    {
        "startTime": 57.0,
        "endTime": 60.5,
        "text": "We'll be starting with apples.",
        "translationVi": "Chúng ta sẽ bắt đầu bằng táo.",
        "ipaUs": "/wiːl biː ˈstɑːrtɪŋ wɪð ˈæpəlz./",
        "keywords": ["future continuous", "starting with"],
        "explanationAi": "Ross đóng vai MC truyền hình trịnh trọng lặp lại câu trả lời với thì Tương lai tiếp diễn.",
        "properNouns": []
    },
    {
        "startTime": 62.0,
        "endTime": 64.0,
        "text": "Stop that now.",
        "translationVi": "Thôi ngay cái trò đó đi.",
        "ipaUs": "/stɑːp ðæt naʊ./",
        "keywords": ["stop that now"],
        "explanationAi": "Monica lập tức chấn chỉnh vẻ làm màu MC của anh trai Ross.",
        "properNouns": []
    },
    {
        "startTime": 65.8,
        "endTime": 67.0,
        "text": "Yes.",
        "translationVi": "Có táo.",
        "ipaUs": "/jɛs./",
        "keywords": ["confirmation"],
        "explanationAi": "Ross xác nhận món đồ số 1 có trong túi.",
        "properNouns": []
    },
    {
        "startTime": 67.2,
        "endTime": 70.0,
        "text": "Okay. Tortilla chips.",
        "translationVi": "Được rồi. Bánh snack bắp tortilla.",
        "ipaUs": "/oʊˈkeɪ. tɔːrˈtiːjə tʃɪps./",
        "keywords": ["tortilla chips"],
        "explanationAi": "Món ăn vặt truyền thống phổ biến của người Mỹ (tortilla chips kết hợp salsa hoặc sốt phô mai).",
        "properNouns": []
    },
    {
        "startTime": 70.2,
        "endTime": 71.2,
        "text": "Yogurt.",
        "translationVi": "Sữa chua.",
        "ipaUs": "/ˈjoʊɡərt./",
        "keywords": ["yogurt"],
        "explanationAi": "Chandler tiếp lời đoán món số 3.",
        "properNouns": []
    },
    {
        "startTime": 71.3,
        "endTime": 72.5,
        "text": "Diet soda.",
        "translationVi": "Nước ngọt ăn kiêng.",
        "ipaUs": "/ˈdaɪət ˈsoʊdə./",
        "keywords": ["diet soda"],
        "explanationAi": "Joey đoán tiếp món nước uống quen thuộc của Rachel.",
        "properNouns": []
    },
    {
        "startTime": 72.6,
        "endTime": 74.8,
        "text": "Yes, yes, yes.",
        "translationVi": "Đúng, đúng, đúng hết.",
        "ipaUs": "/jɛs, jɛs, jɛs./",
        "keywords": ["triple confirmation"],
        "explanationAi": "Ross liên tục xác nhận đúng cả ba món liên tiếp trong sự sững sờ của đội nữ.",
        "properNouns": []
    },
    {
        "startTime": 75.8,
        "endTime": 77.0,
        "text": "Orange juice.",
        "translationVi": "Nước cam ép.",
        "ipaUs": "/ˈɔːrɪndʒ dʒuːs./",
        "keywords": ["orange juice"],
        "explanationAi": "Joey tự tin đoán món thứ 5 nhưng đã đoán sai.",
        "properNouns": []
    },
    {
        "startTime": 77.2,
        "endTime": 80.0,
        "text": "Oh, there's no orange juice in there. We win!",
        "translationVi": "Ồ, làm gì có nước cam trong đó. Bọn em thắng rồi!",
        "ipaUs": "/oʊ, ðɛrz noʊ ˈɔːrɪndʒ dʒuːs ɪn ðɛr. wiː wɪn!/",
        "keywords": ["no orange juice", "we win"],
        "explanationAi": "Monica mừng rỡ nhảy cẫng lên ăn mừng sớm vì quên mất quy định số lượt đoán.",
        "properNouns": []
    },
    {
        "startTime": 80.2,
        "endTime": 82.5,
        "text": "They have another guess.",
        "translationVi": "Họ vẫn còn một lượt đoán nữa cơ mà.",
        "ipaUs": "/ðeɪ hæv əˈnʌðər ɡɛs./",
        "keywords": ["another guess"],
        "explanationAi": "Ross nhắc nhở luật chơi công tâm: 6 lượt đoán cho 5 món đồ.",
        "properNouns": []
    },
    {
        "startTime": 83.0,
        "endTime": 85.5,
        "text": "Okay, well, we won that one.",
        "translationVi": "Được rồi, nhưng quả đó bọn em thắng chắc.",
        "ipaUs": "/oʊˈkeɪ, wɛl, wiː wʌn ðæt wʌn./",
        "keywords": ["won that one"],
        "explanationAi": "Monica biện bạch cố vớt vát chiến thắng nhỏ.",
        "properNouns": []
    },
    {
        "startTime": 85.8,
        "endTime": 88.5,
        "text": "Okay, the last thing.",
        "translationVi": "Được rồi, món cuối cùng.",
        "ipaUs": "/oʊˈkeɪ, ðə læst θɪŋ./",
        "keywords": ["the last thing"],
        "explanationAi": "Chandler tập trung cao độ cho lượt đoán quyết định trị giá 10 đô-la.",
        "properNouns": []
    },
    {
        "startTime": 91.0,
        "endTime": 94.5,
        "text": "No, not for like another two weeks.",
        "translationVi": "Không, chưa tới chu kỳ đó trong ít nhất hai tuần nữa đâu.",
        "ipaUs": "/noʊ, nɑːt fɔːr laɪk əˈnʌðər tuː wiːks./",
        "keywords": ["another two weeks"],
        "explanationAi": "Pha hài hước ngầm (innuendo) của Joey khi Chandler định đoán sản phẩm chăm sóc phụ nữ của Rachel.",
        "properNouns": []
    },
    {
        "startTime": 97.8,
        "endTime": 99.0,
        "text": "I got it.",
        "translationVi": "Tớ nghĩ ra rồi.",
        "ipaUs": "/aɪ ɡɑːt ɪt./",
        "keywords": ["I got it"],
        "explanationAi": "Chandler bừng sáng với một suy luận logic sắc bén.",
        "properNouns": []
    },
    {
        "startTime": 99.2,
        "endTime": 102.5,
        "text": "Scotch tape.",
        "translationVi": "Băng dính Scotch trong suốt.",
        "ipaUs": "/skɑːtʃ teɪp./",
        "keywords": ["Scotch tape"],
        "explanationAi": "Thương hiệu băng dính dán trong suốt nổi tiếng hàng đầu nước Mỹ của tập đoàn 3M.",
        "properNouns": ["Scotch"]
    },
    {
        "startTime": 107.0,
        "endTime": 110.2,
        "text": "How did you know she would buy Scotch tape?!",
        "translationVi": "Làm sao anh biết là cô ấy sẽ mua băng dính Scotch cơ chứ?!",
        "ipaUs": "/haʊ dɪd juː noʊ ʃiː wʊd baɪ skɑːtʃ teɪp?!/",
        "keywords": ["how did you know", "Scotch tape"],
        "explanationAi": "Rachel bàng hoàng tột độ trước khả năng phán đoán như thần của Chandler.",
        "properNouns": ["Scotch"]
    },
    {
        "startTime": 110.5,
        "endTime": 114.0,
        "text": "Well, we used up theirs last night making scary faces.",
        "translationVi": "À, tối qua bọn này dùng hết sạch cuộn băng dính của mấy cậu để dán mặt dọa ma rồi.",
        "ipaUs": "/wɛl, wiː juːzd ʌp ðɛrz læst naɪt ˈmeɪkɪŋ ˈskɛri ˈfeɪsɪz./",
        "keywords": ["used up", "making scary faces"],
        "explanationAi": "Lời giải thích đậm chất trẻ con ngớ ngẩn (childish mischief) nhưng hoàn toàn hợp lý về mặt nhân quả.",
        "properNouns": []
    },
    {
        "startTime": 114.8,
        "endTime": 116.0,
        "text": "Man!",
        "translationVi": "Trời đất ơi!",
        "ipaUs": "/mæn!/",
        "keywords": ["man", "frustration"],
        "explanationAi": "Từ cảm thán bực dọc quen thuộc của Monica khi bị thua cuộc.",
        "properNouns": []
    },
    {
        "startTime": 116.2,
        "endTime": 118.0,
        "text": "All right, ten bucks.",
        "translationVi": "Được rồi, mười đô đây.",
        "ipaUs": "/ɔːl raɪt, tɛn bʌks./",
        "keywords": ["ten bucks"],
        "explanationAi": "Joey đắc chí xòe tay thu tiền cược.",
        "properNouns": []
    },
    {
        "startTime": 118.2,
        "endTime": 119.2,
        "text": "Fork it over.",
        "translationVi": "Xì tiền ra mau.",
        "ipaUs": "/fɔːrk ɪt ˈoʊvər./",
        "keywords": ["fork it over", "slang"],
        "explanationAi": "Thành ngữ lóng của Mỹ 'fork over' (giao nộp tiền một cách miễn cưỡng).",
        "properNouns": []
    },
    {
        "startTime": 119.3,
        "endTime": 120.5,
        "text": "Cough it up.",
        "translationVi": "Móc túi nộp phạt đi.",
        "ipaUs": "/kɔːf ɪt ʌp./",
        "keywords": ["cough it up", "slang"],
        "explanationAi": "Thành ngữ lóng 'cough up' (nhả tiền ra, trả món nợ hoặc khoản tiền cá cược).",
        "properNouns": []
    },
    {
        "startTime": 120.6,
        "endTime": 122.2,
        "text": "Pay the piper.",
        "translationVi": "Chấp nhận trả giá đi nào.",
        "ipaUs": "/peɪ ðə ˈpaɪpər./",
        "keywords": ["pay the piper", "idiom"],
        "explanationAi": "Thành ngữ văn học cổ điển 'pay the piper' (bắt nguồn từ câu chuyện Người thổi sáo thành Hamelin: đã chơi thì phải trả tiền).",
        "properNouns": []
    },
    {
        "startTime": 122.4,
        "endTime": 124.5,
        "text": "Give me it.",
        "translationVi": "Đưa đây cho tôi.",
        "ipaUs": "/ɡɪv miː ɪt./",
        "keywords": ["give me it"],
        "explanationAi": "Joey chốt hạ chuỗi 4 câu đòi nợ liên hoàn bằng cách nói mộc mạc nhất.",
        "properNouns": []
    },
    {
        "startTime": 125.0,
        "endTime": 127.5,
        "text": "That does not mean you know us better.",
        "translationVi": "Chuyện đó chẳng có nghĩa là các anh hiểu bọn này hơn đâu.",
        "ipaUs": "/ðæt dʌz nɑːt miːn juː noʊ ʌs ˈbɛtər./",
        "keywords": ["does not mean"],
        "explanationAi": "Monica không chịu chấp nhận thất bại, tiếp tục ngoan cố bảo vệ danh dự.",
        "properNouns": []
    },
    {
        "startTime": 127.6,
        "endTime": 128.5,
        "text": "I want a rematch.",
        "translationVi": "Tôi muốn đấu lại một trận tái đấu.",
        "ipaUs": "/aɪ wɑːnt ə ˌriːˈmætʃ./",
        "keywords": ["rematch"],
        "explanationAi": "Từ vựng thể thao 'rematch' (trận tái đấu, đấu gỡ hòa).",
        "properNouns": []
    },
    {
        "startTime": 128.6,
        "endTime": 130.5,
        "text": "Yeah, and none of these stupid grocery questions,",
        "translationVi": "Đúng thế, và không chơi mấy câu hỏi đồ tạp hóa ngớ ngẩn này nữa,",
        "ipaUs": "/jæ, ænd nʌn əv ðiːz ˈstuːpɪd ˈɡroʊsəri ˈkwɛstʃənz,/",
        "keywords": ["grocery questions"],
        "explanationAi": "Rachel phụ họa đòi đổi thể thức câu hỏi.",
        "properNouns": []
    },
    {
        "startTime": 130.6,
        "endTime": 132.5,
        "text": "real personal questions.",
        "translationVi": "phải là những câu hỏi riêng tư thực sự cơ.",
        "ipaUs": "/riːəl ˈpɜːrsənəl ˈkwɛstʃənz./",
        "keywords": ["personal questions"],
        "explanationAi": "Chuyển sang các bí mật cá nhân để thử thách độ am hiểu đối phương.",
        "properNouns": []
    },
    {
        "startTime": 132.6,
        "endTime": 134.8,
        "text": "And the winner gets a hundred bucks.",
        "translationVi": "Và người thắng sẽ nhận một trăm đô-la.",
        "ipaUs": "/ænd ðə ˈwɪnər ɡɛts ə ˈhʌndrəd bʌks./",
        "keywords": ["hundred bucks", "high stakes"],
        "explanationAi": "Monica nâng mức tiền cược lên gấp mười lần ($100), tăng độ kịch tính tột độ.",
        "properNouns": []
    },
    {
        "startTime": 135.0,
        "endTime": 136.2,
        "text": "Serious?",
        "translationVi": "Thật đấy à?",
        "ipaUs": "/ˈsɪriəs?/",
        "keywords": ["serious"],
        "explanationAi": "Joey bất ngờ trước số tiền cược lớn.",
        "properNouns": []
    },
    {
        "startTime": 136.5,
        "endTime": 138.8,
        "text": "What, are you scared?",
        "translationVi": "Sao, các anh sợ rồi à?",
        "ipaUs": "/wʌt, ɑːr juː skɛrd?/",
        "keywords": ["are you scared", "taunt"],
        "explanationAi": "Monica dùng đòn tâm lý khích tướng để ép đội nam nhận lời.",
        "properNouns": []
    },
    {
        "startTime": 139.0,
        "endTime": 140.2,
        "text": "No.",
        "translationVi": "Không hề.",
        "ipaUs": "/noʊ./",
        "keywords": ["defiance"],
        "explanationAi": "Joey không bao giờ chịu thua trước sự khiêu khích.",
        "properNouns": []
    },
    {
        "startTime": 142.0,
        "endTime": 144.2,
        "text": "Okay, who'll make up the questions?",
        "translationVi": "Được thôi, nhưng ai sẽ là người ra câu hỏi?",
        "ipaUs": "/oʊˈkeɪ, huːl meɪk ʌp ðə ˈkwɛstʃənz?/",
        "keywords": ["make up the questions"],
        "explanationAi": "Chandler đặt vấn đề tìm kiếm một trọng tài trung lập đủ am hiểu cả 4 người.",
        "properNouns": []
    },
    {
        "startTime": 144.5,
        "endTime": 145.8,
        "text": "Ross'll do it.",
        "translationVi": "Anh Ross sẽ làm.",
        "ipaUs": "/rɔːsəl duː ɪt./",
        "keywords": ["Ross'll do it"],
        "explanationAi": "Monica tự ý chỉ định anh trai làm người biên soạn câu hỏi.",
        "properNouns": ["Ross"]
    },
    {
        "startTime": 146.0,
        "endTime": 147.2,
        "text": "Oh, sure.",
        "translationVi": "Ồ, chắc chắn rồi.",
        "ipaUs": "/oʊ, ʃʊr./",
        "keywords": ["sarcasm"],
        "explanationAi": "Ross mỉa mai một cách bất mãn khi bỗng dưng bị đùn đẩy trách nhiệm.",
        "properNouns": []
    },
    {
        "startTime": 147.4,
        "endTime": 148.8,
        "text": "Ross'll do it.",
        "translationVi": "Ross sẽ làm tất.",
        "ipaUs": "/rɔːsəl duː ɪt./",
        "keywords": ["irony"],
        "explanationAi": "Lặp lại tên mình theo ngôi thứ ba để nhấn mạnh sự bất công hài hước.",
        "properNouns": ["Ross"]
    },
    {
        "startTime": 149.0,
        "endTime": 153.2,
        "text": "It's not like he has a job or a child or a life of his own.",
        "translationVi": "Cứ như thể anh ấy không có việc làm, không có con nhỏ hay chẳng có nổi một cuộc sống riêng vậy.",
        "ipaUs": "/ɪts nɑːt laɪk hiː hæz ə dʒɑːb ɔːr ə tʃaɪld ɔːr ə laɪf əv hɪz oʊn./",
        "keywords": ["life of his own", "not like he has"],
        "explanationAi": "Lời phàn nàn châm biếm kinh điển của Ross về việc bạn bè luôn coi anh là 'chân sai vặt' rảnh rỗi.",
        "properNouns": []
    },
    {
        "startTime": 153.5,
        "endTime": 154.5,
        "text": "Fine, we'll ask Phoebe.",
        "translationVi": "Thôi được rồi, bọn em nhờ Phoebe vậy.",
        "ipaUs": "/faɪn, wiːl æsk ˈfiːbi./",
        "keywords": ["ask Phoebe"],
        "explanationAi": "Monica rút lui giả vờ chuyển sang nhờ Phoebe (đang mang thai hộ ba đứa trẻ).",
        "properNouns": ["Phoebe"]
    },
    {
        "startTime": 154.8,
        "endTime": 158.0,
        "text": "No, no, no, no, no, I want to play!",
        "translationVi": "Không, không, không được, anh muốn chơi trò này mà!",
        "ipaUs": "/noʊ, noʊ, noʊ, noʊ, noʊ, aɪ wɑːnt tuː pleɪ!/",
        "keywords": ["I want to play"],
        "explanationAi": "Bản tính giáo sư mọt sách mê trò chơi đố vui của Ross trỗi dậy ngay lập tức.",
        "properNouns": []
    },
    {
        "startTime": 160.0,
        "endTime": 161.5,
        "text": "Okay.",
        "translationVi": "Được rồi.",
        "ipaUs": "/oʊˈkeɪ./",
        "keywords": ["transition"],
        "explanationAi": "Chuyển cảnh sang buổi tối tại phòng khách Monica, Ross cầm bảng câu hỏi bước vào vị trí trọng tài.",
        "properNouns": []
    },
    {
        "startTime": 161.8,
        "endTime": 164.2,
        "text": "Each team will answer ten questions.",
        "translationVi": "Mỗi đội sẽ trả lời mười câu hỏi.",
        "ipaUs": "/iːtʃ tiːm wɪl ˈænsər tɛn ˈkwɛstʃənz./",
        "keywords": ["ten questions"],
        "explanationAi": "Ross công bố thể thức thi đấu chính thức vòng bảng.",
        "properNouns": []
    },
    {
        "startTime": 164.5,
        "endTime": 168.0,
        "text": "The first team to answer the most questions wins.",
        "translationVi": "Đội nào trả lời đúng nhiều câu nhất sẽ giành chiến thắng.",
        "ipaUs": "/ðə fɜːrst tiːm tuː ˈænsər ðə moʊst ˈkwɛstʃənz wɪnz./",
        "keywords": ["most questions wins"],
        "explanationAi": "Quy tắc xác định đội chiến thắng.",
        "properNouns": []
    },
    {
        "startTime": 168.2,
        "endTime": 173.2,
        "text": "The categories are: Fears and Pet Peeves, Ancient History,",
        "translationVi": "Bốn chủ đề gồm có: Nỗi Sợ Hãi và Điều Khó Chịu, Lịch Sử Cổ Đại,",
        "ipaUs": "/ðə ˈkætəˌɡɔːriz ɑːr: fɪrz ænd pɛt piːvz, ˈeɪnʃənt ˈhɪstəri,/",
        "keywords": ["Fears and Pet Peeves", "Ancient History"],
        "explanationAi": "Hai chủ đề đầu tiên được Ross thiết kế mang phong cách học viện nhưng áp dụng vào đời sống nhóm bạn.",
        "properNouns": []
    },
    {
        "startTime": 173.5,
        "endTime": 178.5,
        "text": "Literature, and It's All Relative.",
        "translationVi": "Văn Học, và Tất Cả Là Chuyện Gia Đình.",
        "ipaUs": "/ˈlɪtərətʃər, ænd ɪts ɔːl ˈrɛlətɪv./",
        "keywords": ["Literature", "It's All Relative"],
        "explanationAi": "Chơi chữ ở 'It's All Relative' (vừa có nghĩa thuyết tương đối, vừa có nghĩa bà con họ hàng - relatives).",
        "properNouns": []
    },
    {
        "startTime": 179.0,
        "endTime": 184.0,
        "text": "Now, the coin toss to see who goes first.",
        "translationVi": "Bây giờ, tung đồng xu để xem đội nào được quyền đi trước.",
        "ipaUs": "/naʊ, ðə kɔɪn tɔːs tuː siː huː ɡoʊz fɜːrst./",
        "keywords": ["coin toss", "who goes first"],
        "explanationAi": "Thủ tục tung đồng xu truyền thống để quyết định lượt đi công bằng.",
        "properNouns": []
    },
    {
        "startTime": 191.0,
        "endTime": 192.5,
        "text": "Okay.",
        "translationVi": "Được rồi.",
        "ipaUs": "/oʊˈkeɪ./",
        "keywords": ["coin landed"],
        "explanationAi": "Đồng xu rơi xuống sàn nhưng không ai chịu đoán trước.",
        "properNouns": []
    },
    {
        "startTime": 192.8,
        "endTime": 195.0,
        "text": "Somebody call it this time.",
        "translationVi": "Lần này ai đó phải hô mặt đồng xu đi chứ.",
        "ipaUs": "/ˈsʌmˌbɑːdi kɔːl ɪt ðɪs taɪm./",
        "keywords": ["call it this time"],
        "explanationAi": "Ross bực mình nhắc nhở vì lần tung trước cả nhóm chỉ trơ mắt nhìn đồng xu rơi mà không đoán sấp hay ngửa.",
        "properNouns": []
    },
    {
        "startTime": 195.8,
        "endTime": 197.5,
        "text": "Tails!",
        "translationVi": "Mặt sấp!",
        "ipaUs": "/teɪlz!/",
        "keywords": ["tails"],
        "explanationAi": "Joey nhanh nhảu hô mặt sấp (tails).",
        "properNouns": []
    },
    {
        "startTime": 197.8,
        "endTime": 199.0,
        "text": "It's heads.",
        "translationVi": "Là mặt ngửa.",
        "ipaUs": "/ɪts hɛdz./",
        "keywords": ["heads"],
        "explanationAi": "Kết quả ra mặt ngửa (heads), đội nữ chọn sai.",
        "properNouns": []
    },
    {
        "startTime": 199.2,
        "endTime": 200.5,
        "text": "Yes!",
        "translationVi": "Tuyệt vời!",
        "ipaUs": "/jɛs!/",
        "keywords": ["triumph"],
        "explanationAi": "Chandler ăn mừng quyền chọn câu hỏi trước.",
        "properNouns": []
    },
    {
        "startTime": 200.8,
        "endTime": 203.2,
        "text": "Gentlemen, pick your category.",
        "translationVi": "Các quý ông, xin mời chọn chủ đề.",
        "ipaUs": "/ˈdʒɛntəlmən, pɪk jʊər ˈkætəˌɡɔːri./",
        "keywords": ["pick your category"],
        "explanationAi": "Ross dẫn dắt cuộc thi bằng phong thái MC chuyên nghiệp.",
        "properNouns": []
    },
    {
        "startTime": 203.5,
        "endTime": 206.0,
        "text": "Fears and Pet Peeves.",
        "translationVi": "Nỗi Sợ Hãi và Điều Khó Chịu.",
        "ipaUs": "/fɪrz ænd pɛt piːvz./",
        "keywords": ["Fears and Pet Peeves"],
        "explanationAi": "Đội nam tự tin chọn chủ đề tâm lý để công kích Monica.",
        "properNouns": []
    },
    {
        "startTime": 207.0,
        "endTime": 210.0,
        "text": "What is Monica's biggest pet peeve?",
        "translationVi": "Điều làm Monica khó chịu nhất trên đời là gì?",
        "ipaUs": "/wʌt ɪz ˈmɑːnɪkəz ˈbɪɡɪst pɛt piːv?/",
        "keywords": ["biggest pet peeve"],
        "explanationAi": "Câu hỏi số 1 dành cho đội nam: khai thác nỗi dị ứng tột độ của Monica.",
        "properNouns": ["Monica"]
    },
    {
        "startTime": 210.2,
        "endTime": 211.5,
        "text": "Animals dressed as humans!",
        "translationVi": "Động vật mặc quần áo như con người!",
        "ipaUs": "/ˈænəməlz drɛst æz ˈhjuːmənz!/",
        "keywords": ["animals dressed as humans"],
        "explanationAi": "Joey trả lời nhanh như chớp và hoàn toàn chính xác về nỗi sợ kỳ quặc của Monica.",
        "properNouns": []
    },
    {
        "startTime": 211.8,
        "endTime": 213.0,
        "text": "That's correct.",
        "translationVi": "Hoàn toàn chính xác.",
        "ipaUs": "/ðæts kəˈrɛkt./",
        "keywords": ["correct answer"],
        "explanationAi": "Ross ghi 1 điểm đầu tiên cho đội nam.",
        "properNouns": []
    },
    {
        "startTime": 215.0,
        "endTime": 216.2,
        "text": "Ladies?",
        "translationVi": "Đến lượt các quý cô?",
        "ipaUs": "/ˈleɪdiz?/",
        "keywords": ["turn transition"],
        "explanationAi": "Ross chuyển quyền chọn cho đội nữ.",
        "properNouns": []
    },
    {
        "startTime": 216.5,
        "endTime": 218.0,
        "text": "Same category.",
        "translationVi": "Cùng chủ đề đó luôn.",
        "ipaUs": "/seɪm ˈkætəˌɡɔːri./",
        "keywords": ["same category"],
        "explanationAi": "Monica muốn ăn miếng trả miếng trong cùng chủ đề Fears and Pet Peeves.",
        "properNouns": []
    },
    {
        "startTime": 219.0,
        "endTime": 224.5,
        "text": "According to Chandler, what phenomenon scares the bejeezus out of him?",
        "translationVi": "Theo Chandler, hiện tượng kỳ quái nào làm anh ấy sợ chết khiếp nhất?",
        "ipaUs": "/əˈkɔːrdɪŋ tuː ˈtʃændlər, wʌt fəˈnɑːməˌnɑːn skɛrz ðə bɪˈdʒiːzəs aʊt əv hɪm?/",
        "keywords": ["scares the bejeezus out of", "phenomenon"],
        "explanationAi": "Khẩu ngữ 'scares the bejeezus out of someone' (làm ai sợ mất mật / sợ chết khiếp).",
        "properNouns": ["Chandler"]
    },
    {
        "startTime": 224.8,
        "endTime": 227.8,
        "text": "Michael Flatley, Lord of the Dance!",
        "translationVi": "Michael Flatley, Chúa tể Điệu nhảy!",
        "ipaUs": "/ˈmaɪkəl ˈflætli, lɔːrd əv ðə dæns!/",
        "keywords": ["Michael Flatley", "Lord of the Dance"],
        "explanationAi": "Monica hét lên đáp án bất hủ: vũ công người Mỹ gốc Ireland nổi tiếng với điệu nhảy gõ nhịp Riverdance.",
        "properNouns": ["Michael Flatley", "Lord of the Dance"]
    },
    {
        "startTime": 228.0,
        "endTime": 229.8,
        "text": "That is correct.",
        "translationVi": "Hoàn toàn chính xác.",
        "ipaUs": "/ðæt ɪz kəˈrɛkt./",
        "keywords": ["correct"],
        "explanationAi": "Ross xác nhận điểm số gỡ hòa 1-1 cho đội nữ.",
        "properNouns": []
    },
    {
        "startTime": 232.8,
        "endTime": 235.0,
        "text": "The Irish jig guy?",
        "translationVi": "Cái gã nhảy điệu jig Ái Nhĩ Lan đó hả?",
        "ipaUs": "/ðiː ˈaɪrɪʃ dʒɪɡ ɡaɪ?/",
        "keywords": ["Irish jig guy"],
        "explanationAi": "Joey ngơ ngác hỏi lại về điệu nhảy dân gian Ireland.",
        "properNouns": ["Irish"]
    },
    {
        "startTime": 235.2,
        "endTime": 239.5,
        "text": "His legs flail about as if independent from his body!",
        "translationVi": "Đôi chân của hắn ta cứ quơ quào vung vẩy loạn xạ như thể tách rời khỏi cơ thể vậy!",
        "ipaUs": "/hɪz lɛɡz fleɪl əˈbaʊt æz ɪf ˌɪndɪˈpɛndənt frʌm hɪz ˈbɑːdi!/",
        "keywords": ["flail about", "independent from body"],
        "explanationAi": "Động từ 'flail about' (vung vẩy không kiểm soát). Chandler rùng mình diễn tả lại nỗi ám ảnh tột cùng của mình.",
        "properNouns": []
    },
    {
        "startTime": 240.8,
        "endTime": 243.0,
        "text": "Gentlemen, your pick.",
        "translationVi": "Các quý ông, đến lượt các anh chọn.",
        "ipaUs": "/ˈdʒɛntəlmən, jʊər pɪk./",
        "keywords": ["your pick"],
        "explanationAi": "Lượt thi đấu vòng 3 tiếp tục.",
        "properNouns": []
    },
    {
        "startTime": 243.2,
        "endTime": 244.8,
        "text": "It's All Relative.",
        "translationVi": "Tất Cả Là Chuyện Gia Đình.",
        "ipaUs": "/ɪts ɔːl ˈrɛlətɪv./",
        "keywords": ["It's All Relative"],
        "explanationAi": "Đội nam chọn chủ đề về họ hàng gia đình Geller.",
        "properNouns": []
    },
    {
        "startTime": 245.0,
        "endTime": 248.0,
        "text": "Monica and I had a grandmother who died.",
        "translationVi": "Monica và anh từng có một người bà đã qua đời.",
        "ipaUs": "/ˈmɑːnɪkə ænd aɪ hæd ə ˈɡrændˌmʌðər huː daɪd./",
        "keywords": ["grandmother who died"],
        "explanationAi": "Ross gợi mở ngữ cảnh câu hỏi gia đình.",
        "properNouns": ["Monica"]
    },
    {
        "startTime": 248.2,
        "endTime": 250.0,
        "text": "You both went to her funeral.",
        "translationVi": "Cả hai cậu đều đã đến dự tang lễ của bà.",
        "ipaUs": "/juː boʊθ wɛnt tuː hɜːr ˈfjuːnərəl./",
        "keywords": ["went to her funeral"],
        "explanationAi": "Dẫn chứng thực tế để chứng minh câu hỏi nằm trong tầm hiểu biết.",
        "properNouns": []
    },
    {
        "startTime": 250.2,
        "endTime": 252.8,
        "text": "Name that grandmother.",
        "translationVi": "Hãy gọi tên người bà đó.",
        "ipaUs": "/neɪm ðæt ˈɡrændˌmʌðər./",
        "keywords": ["name that grandmother"],
        "explanationAi": "Câu hỏi thử thách trí nhớ về tên thật của người bà quá cố.",
        "properNouns": []
    },
    {
        "startTime": 254.8,
        "endTime": 256.0,
        "text": "Nana?",
        "translationVi": "Bà Nana chăng?",
        "ipaUs": "/ˈnænə?/",
        "keywords": ["Nana", "nickname"],
        "explanationAi": "Joey nêu biệt danh gọi thân mật thông thường (Nana).",
        "properNouns": ["Nana"]
    },
    {
        "startTime": 256.2,
        "endTime": 258.5,
        "text": "She has a real name.",
        "translationVi": "Bà ấy có một cái tên thật cơ.",
        "ipaUs": "/ʃiː hæz ə riːəl neɪm./",
        "keywords": ["real name"],
        "explanationAi": "Ross bác bỏ câu trả lời biệt danh.",
        "properNouns": []
    },
    {
        "startTime": 259.0,
        "endTime": 260.2,
        "text": "Althea.",
        "translationVi": "Althea.",
        "ipaUs": "/ælˈθiːə./",
        "keywords": ["Althea"],
        "explanationAi": "Chandler bất ngờ buột miệng đoán một cái tên hiếm gặp.",
        "properNouns": ["Althea"]
    },
    {
        "startTime": 260.4,
        "endTime": 261.5,
        "text": "Althea?! What are you doing?!",
        "translationVi": "Althea á?! Cậu đang làm cái trò gì thế?!",
        "ipaUs": "/ælˈθiːə?! wʌt ɑːr juː ˈduːɪŋ?!/",
        "keywords": ["incredulous"],
        "explanationAi": "Joey hốt hoảng tưởng bạn mình đang lãng phí cơ hội đoán mò ngớ ngẩn.",
        "properNouns": ["Althea"]
    },
    {
        "startTime": 261.6,
        "endTime": 262.5,
        "text": "I took a shot.",
        "translationVi": "Tớ đoán liều một phát thôi mà.",
        "ipaUs": "/aɪ tʊk ə ʃɑːt./",
        "keywords": ["took a shot", "idiom"],
        "explanationAi": "Thành ngữ 'take a shot' (đoán mò, thử vận may liều lĩnh).",
        "properNouns": []
    },
    {
        "startTime": 262.6,
        "endTime": 263.5,
        "text": "You're shooting with Althea?!",
        "translationVi": "Cậu liều mạng với cái tên Althea đấy hả?!",
        "ipaUs": "/jʊr ˈʃuːtɪŋ wɪð ælˈθiːə?!/",
        "keywords": ["shooting with"],
        "explanationAi": "Joey tiếp tục dùng ẩn dụ bắn súng để mỉa mai sự mạo hiểm của Chandler.",
        "properNouns": ["Althea"]
    },
    {
        "startTime": 263.6,
        "endTime": 264.8,
        "text": "Althea is correct.",
        "translationVi": "Althea là đáp án chính xác.",
        "ipaUs": "/ælˈθiːə ɪz kəˈrɛkt./",
        "keywords": ["correct"],
        "explanationAi": "Ross sững sờ công bố đáp án đúng ngoài sức tưởng tượng của cả căn phòng.",
        "properNouns": ["Althea"]
    },
    {
        "startTime": 264.9,
        "endTime": 266.0,
        "text": "Nice shooting!",
        "translationVi": "Bắn chuẩn lắm anh bạn!",
        "ipaUs": "/naɪs ˈʃuːtɪŋ!/",
        "keywords": ["nice shooting"],
        "explanationAi": "Joey lập tức quay ngoắt thái độ 180 độ sang khen ngợi Chandler.",
        "properNouns": []
    },
    {
        "startTime": 268.8,
        "endTime": 270.5,
        "text": "We'll take Literature!",
        "translationVi": "Bọn em sẽ chọn Văn Học!",
        "ipaUs": "/wiːl teɪk ˈlɪtərətʃər!/",
        "keywords": ["Literature"],
        "explanationAi": "Rachel tự tin chọn chủ đề Văn học vì nghĩ rằng các chàng trai chẳng bao giờ đọc sách.",
        "properNouns": []
    },
    {
        "startTime": 271.0,
        "endTime": 275.5,
        "text": "Every week, the TV Guide comes to Chandler and Joey's apartment.",
        "translationVi": "Mỗi tuần, cuốn tạp chí TV Guide đều được gửi tới căn hộ của Chandler và Joey.",
        "ipaUs": "/ˈɛvri wiːk, ðə ˌtiːˈviː ɡaɪd kʌmz tuː ˈtʃændlər ænd ˈdʒoʊiz əˈpɑːrtmənt./",
        "keywords": ["TV Guide", "apartment delivery"],
        "explanationAi": "Tạp chí truyền hình TV Guide kinh điển của nước Mỹ, gắn liền với những câu chuyện hài kịch sinh hoạt.",
        "properNouns": ["TV Guide", "Chandler", "Joey"]
    },
    {
        "startTime": 275.8,
        "endTime": 279.0,
        "text": "What name appears on the address label?",
        "translationVi": "Tên người nhận nào xuất hiện trên nhãn dán địa chỉ đó?",
        "ipaUs": "/wʌt neɪm əˈpɪrz ɑːn ðə əˈdrɛs ˈleɪbəl?/",
        "keywords": ["address label", "name appears"],
        "explanationAi": "Câu hỏi then chốt đi vào lịch sử truyền hình về nhãn thư tín.",
        "properNouns": []
    },
    {
        "startTime": 279.2,
        "endTime": 281.8,
        "text": "Well, Chandler gets it! It's Chandler's name!",
        "translationVi": "Thì Chandler nhận báo mà! Đương nhiên là tên của Chandler rồi!",
        "ipaUs": "/wɛl, ˈtʃændlər ɡɛts ɪt! ɪts ˈtʃændlərz neɪm!/",
        "keywords": ["Chandler's name"],
        "explanationAi": "Rachel suy đoán ngây thơ và rơi ngay vào cái bẫy hài hước.",
        "properNouns": ["Chandler"]
    },
    {
        "startTime": 282.0,
        "endTime": 283.0,
        "text": "No!",
        "translationVi": "Không phải!",
        "ipaUs": "/noʊ!/",
        "keywords": ["incorrect"],
        "explanationAi": "Ross lập tức lắc đầu từ chối câu trả lời.",
        "properNouns": []
    },
    {
        "startTime": 283.2,
        "endTime": 287.5,
        "text": "I'm afraid the TV Guide comes to...",
        "translationVi": "Rất tiếc, cuốn TV Guide thực ra được gửi cho...",
        "ipaUs": "/aɪm əˈfreɪd ðə ˌtiːˈviː ɡaɪd kʌmz tuː.../",
        "keywords": ["TV Guide comes to"],
        "explanationAi": "Ross ngập ngừng chuyển lời sang cho chủ nhân chiếc nhãn thư.",
        "properNouns": ["TV Guide"]
    },
    {
        "startTime": 287.8,
        "endTime": 290.0,
        "text": "Chanandler Bong.",
        "translationVi": "Chanandler Bong.",
        "ipaUs": "/ʃəˈnændlər bɑːŋ./",
        "keywords": ["Chanandler Bong"],
        "explanationAi": "Biệt danh viết sai chính tả dở khóc dở cười nổi tiếng nhất trong lịch sử Friends.",
        "properNouns": ["Chanandler Bong"]
    },
    {
        "startTime": 290.2,
        "endTime": 292.0,
        "text": "I knew that!",
        "translationVi": "Mình biết điều đó mà!",
        "ipaUs": "/aɪ nuː ðæt!/",
        "keywords": ["I knew that"],
        "explanationAi": "Rachel ôm đầu tiếc nuối vì đã quên mất chi tiết quen thuộc.",
        "properNouns": []
    },
    {
        "startTime": 292.2,
        "endTime": 294.8,
        "text": "Rachel, use your head!",
        "translationVi": "Rachel, dùng cái đầu của cậu suy nghĩ đi chứ!",
        "ipaUs": "/ˈreɪtʃəl, juːz jʊər hɛd!/",
        "keywords": ["use your head", "frustration"],
        "explanationAi": "Monica thét lên trong tuyệt vọng và bất lực trước sự đãng trí của bạn mình.",
        "properNouns": ["Rachel"]
    },
    {
        "startTime": 295.0,
        "endTime": 298.5,
        "text": "Actually, it's Miss Chanandler Bong.",
        "translationVi": "Thực ra chính xác phải là: Quý cô Chanandler Bong.",
        "ipaUs": "/ˈæktʃuəli, ɪts mɪs ʃəˈnændlər bɑːŋ./",
        "keywords": ["Miss Chanandler Bong", "punchline"],
        "explanationAi": "Cú đấm hài hước (punchline) chí mạng của Chandler: người đưa thư thậm chí còn ghi sai cả giới tính thành 'Miss' (Quý cô).",
        "properNouns": ["Miss Chanandler Bong"]
    },
    {
        "startTime": 299.0,
        "endTime": 313.0,
        "text": "Monica screams in anguish as Chandler and Joey celebrate their historic victory with high-fives and victory cheers.",
        "translationVi": "Monica thét lên trong đau đớn khi Chandler và Joey tưng bừng ăn mừng chiến thắng lịch sử với những cái đập tay và tiếng reo hò đắc thắng.",
        "ipaUs": "/ˈmɑːnɪkə skriːmz ɪn ˈæŋɡwɪʃ æz ˈtʃændlər ænd ˈdʒoʊi ˈsɛləˌbreɪt ðɛr hɪˈstɔːrɪk ˈvɪktəri wɪð haɪ-faɪvz ænd ˈvɪktəri tʃɪrz./",
        "keywords": ["screams in anguish", "historic victory", "high-fives"],
        "explanationAi": "Cảnh kết kinh điển mở ra bước ngoặt cá cược hoán đổi căn hộ huyền thoại của Friends: các chàng trai chuyển sang căn hộ rộng rãi của các cô gái.",
        "properNouns": ["Monica", "Chandler", "Joey"]
    }
]

# Calculate token counts
for s in raw_segments_data:
    words = re.findall(r"\b[\w'-]+\b", s["text"])
    s["tokenCount"] = len(words)

print(f"Total processed pure segments: {len(raw_segments_data)}")

# Create Extended Quiz with 8 Bilingual Questions
quiz_data = {
    "lessonId": "mov_sit_01",
    "lessonTitle": "Friends: The Iconic Apartment Bet Trivia Game",
    "totalQuestions": 8,
    "xpReward": 100,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "mov_sit_01_q1",
            "question": "According to Chandler, what phenomenon scares the bejeezus out of him?",
            "questionEn": "According to Chandler, what phenomenon scares the bejeezus out of him?",
            "questionVi": "Theo Chandler, hiện tượng kỳ quái nào làm anh ấy khiếp sợ đến mức chết khiếp?",
            "options": [
                "Michael Flatley, Lord of the Dance",
                "Spiders crawling under the bathroom rug",
                "Singing clowns in public elevators",
                "Thunderstorms over Central Park"
            ],
            "optionsEn": [
                "Michael Flatley, Lord of the Dance",
                "Spiders crawling under the bathroom rug",
                "Singing clowns in public elevators",
                "Thunderstorms over Central Park"
            ],
            "optionsVi": [
                "Michael Flatley, Chúa tể Điệu nhảy (với đôi chân vung vẩy như tách rời cơ thể)",
                "Nhện bò dưới tấm thảm nhà tắm",
                "Những chú hề ca hát trong thang máy công cộng",
                "Sấm sét trên bầu trời công viên Central Park"
            ],
            "correctAnswer": 0,
            "explanation": "In Segments 74-78, Monica correctly answers 'Michael Flatley, Lord of the Dance!', and Chandler shudders explaining that 'his legs flail about as if independent from his body!'",
            "explanationEn": "In Segments 74-78, Monica correctly answers 'Michael Flatley, Lord of the Dance!', and Chandler shudders explaining that 'his legs flail about as if independent from his body!'",
            "explanationVi": "Trong các Phân đoạn 74-78, Monica trả lời chính xác 'Michael Flatley, Lord of the Dance!', và Chandler rùng mình giải thích rằng 'đôi chân của hắn ta vung vẩy loạn xạ như thể tách rời khỏi cơ thể vậy!'",
            "targetedConcept": "Pop-culture phobia & vivid comic imagery",
            "targetedConceptEn": "Pop-culture phobia & vivid comic imagery",
            "targetedConceptVi": "Nỗi sợ văn hóa đại chúng và hình tượng miêu tả hài hước",
            "referenceSegmentIndex": 75
        },
        {
            "id": "mov_sit_01_q2",
            "question": "What unusual dietary habit of Monica's does Joey bring up to prove he knows her well?",
            "questionEn": "What unusual dietary habit of Monica's does Joey bring up to prove he knows her well?",
            "questionVi": "Thói quen ăn uống kỳ lạ nào của Monica được Joey chỉ ra để chứng minh anh hiểu cô rất rõ?",
            "options": [
                "She only drinks decaf coffee with honey.",
                "She can only eat Tic Tacs in even numbers.",
                "She peels the skin off every apple before slicing.",
                "She never eats pizza crusts on weekends."
            ],
            "optionsEn": [
                "She only drinks decaf coffee with honey.",
                "She can only eat Tic Tacs in even numbers.",
                "She peels the skin off every apple before slicing.",
                "She never eats pizza crusts on weekends."
            ],
            "optionsVi": [
                "Cô chỉ uống cà phê khử cafein pha mật ong.",
                "Cô chỉ có thể ăn kẹo Tic Tac theo số lượng chẵn.",
                "Cô gọt sạch vỏ của từng quả táo trước khi cắt lát.",
                "Cô không bao giờ ăn viền bánh pizza vào dịp cuối tuần."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 2, Joey proves he knows Monica deeply by revealing: 'You can only eat Tic Tacs in even numbers.'",
            "explanationEn": "In Segment 2, Joey proves he knows Monica deeply by revealing: 'You can only eat Tic Tacs in even numbers.'",
            "explanationVi": "Trong Phân đoạn 2, Joey chứng minh hiểu Monica tận chân tơ kẽ tóc: 'Cậu chỉ có thể ăn kẹo Tic Tac theo số lượng chẵn thôi.'",
            "targetedConcept": "Quirky character habits & obsessive-compulsive traits",
            "targetedConceptEn": "Quirky character habits & obsessive-compulsive traits",
            "targetedConceptVi": "Thói quen kỳ quặc và nét tính cách cưỡng chế đặc trưng",
            "referenceSegmentIndex": 2
        },
        {
            "id": "mov_sit_01_q3",
            "question": "What does the American slang idiom 'pay the piper' mean when Chandler demands the wager money in Segment 39?",
            "questionEn": "What does the American slang idiom 'pay the piper' mean when Chandler demands the wager money in Segment 39?",
            "questionVi": "Thành ngữ tiếng Anh 'pay the piper' có nghĩa là gì khi Chandler đòi tiền cược trong Phân đoạn 39?",
            "options": [
                "To hire an acoustic bagpipe player for dinner",
                "To bear the consequences and pay the money owed from a wager",
                "To file an official protest with the landlord",
                "To return borrowed kitchen utensils"
            ],
            "optionsEn": [
                "To hire an acoustic bagpipe player for dinner",
                "To bear the consequences and pay the money owed from a wager",
                "To file an official protest with the landlord",
                "To return borrowed kitchen utensils"
            ],
            "optionsVi": [
                "Thuê một nghệ sĩ thổi kèn túi biểu diễn bữa tối",
                "Chấp nhận trả giá và nộp số tiền thua cược đã giao kèo",
                "Nộp đơn khiếu nại chính thức lên chủ nhà",
                "Trả lại dụng cụ nhà bếp đã mượn"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 39, 'Pay the piper' is an idiom meaning to pay the financial penalty or accept the unfavorable consequences of one's actions or bets.",
            "explanationEn": "In Segment 39, 'Pay the piper' is an idiom meaning to pay the financial penalty or accept the unfavorable consequences of one's actions or bets.",
            "explanationVi": "Trong Phân đoạn 39, 'Pay the piper' là thành ngữ mang ý nghĩa phải trả tiền phạt hoặc chấp nhận hậu quả tài chính từ giao kèo thua cược.",
            "targetedConcept": "Idiomatic expression 'pay the piper'",
            "targetedConceptEn": "Idiomatic expression 'pay the piper'",
            "targetedConceptVi": "Thành ngữ tiếng Anh 'pay the piper' (chấp nhận trả giá)",
            "referenceSegmentIndex": 39
        },
        {
            "id": "mov_sit_01_q4",
            "question": "What was Monica's biggest pet peeve according to the trivia question in Segment 69?",
            "questionEn": "What was Monica's biggest pet peeve according to the trivia question in Segment 69?",
            "questionVi": "Điều gây khó chịu tột cùng nhất (pet peeve) của Monica trong câu hỏi ở Phân đoạn 69 là gì?",
            "options": [
                "Leaving shoes near the apartment entrance",
                "Animals dressed as humans",
                "Unfolded laundry on the velvet couch",
                "Using the wrong coaster for hot beverages"
            ],
            "optionsEn": [
                "Leaving shoes near the apartment entrance",
                "Animals dressed as humans",
                "Unfolded laundry on the velvet couch",
                "Using the wrong coaster for hot beverages"
            ],
            "optionsVi": [
                "Để giày dép bừa bãi gần cửa ra vào căn hộ",
                "Động vật mặc quần áo như con người",
                "Quần áo chưa gấp để trên ghế sofa nhung",
                "Dùng sai đế lót ly cho đồ uống nóng"
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 69-70, Ross asks 'What is Monica's biggest pet peeve?' and Joey instantly answers 'Animals dressed as humans!' which is correct.",
            "explanationEn": "In Segments 69-70, Ross asks 'What is Monica's biggest pet peeve?' and Joey instantly answers 'Animals dressed as humans!' which is correct.",
            "explanationVi": "Trong các Phân đoạn 69-70, Ross hỏi 'Điều làm Monica khó chịu nhất là gì?' và Joey lập tức trả lời 'Động vật mặc quần áo như con người!', hoàn toàn chính xác.",
            "targetedConcept": "Idiom 'pet peeve' and character psychology",
            "targetedConceptEn": "Idiom 'pet peeve' and character psychology",
            "targetedConceptVi": "Thuật ngữ 'pet peeve' (điều khó chịu kinh niên) và tâm lý nhân vật",
            "referenceSegmentIndex": 70
        },
        {
            "id": "mov_sit_01_q5",
            "question": "How does Chandler correctly identify the deceased grandmother of Ross and Monica under the 'It's All Relative' category?",
            "questionEn": "How does Chandler correctly identify the deceased grandmother of Ross and Monica under the 'It's All Relative' category?",
            "questionVi": "Chandler đã trả lời chính xác tên người bà quá cố của Ross và Monica trong chủ đề 'It's All Relative' bằng cách nào?",
            "options": [
                "He remembered reading her obituary in the paper.",
                "He took a lucky wild guess with 'Althea'.",
                "He peeked at Monica's family tree diary.",
                "He called Ross's mother Judy during the timeout."
            ],
            "optionsEn": [
                "He remembered reading her obituary in the paper.",
                "He took a lucky wild guess with 'Althea'.",
                "He peeked at Monica's family tree diary.",
                "He called Ross's mother Judy during the timeout."
            ],
            "optionsVi": [
                "Cậu nhớ đã đọc cáo phó của bà trên báo.",
                "Cậu đoán bừa đầy may mắn với cái tên 'Althea'.",
                "Cậu lén nhìn vào nhật ký gia phả của Monica.",
                "Cậu gọi điện hỏi bà Judy Geller trong giờ hội ý."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 86-90, Chandler blurts out 'Althea'. When Joey complains 'You're shooting with Althea?!', Ross confirms that Althea is indeed correct.",
            "explanationEn": "In Segments 86-90, Chandler blurts out 'Althea'. When Joey complains 'You're shooting with Althea?!', Ross confirms that Althea is indeed correct.",
            "explanationVi": "Trong các Phân đoạn 86-90, Chandler buột miệng nói 'Althea'. Khi Joey phàn nàn 'Cậu liều mạng với Althea đấy hả?!', Ross xác nhận Althea thực sự là đáp án đúng.",
            "targetedConcept": "Colloquial expression 'take a shot' (đoán mò, thử vận may)",
            "targetedConceptEn": "Colloquial expression 'take a shot' (đoán mò, thử vận may)",
            "targetedConceptVi": "Thành ngữ khẩu ngữ 'take a shot' (thử vận may)",
            "referenceSegmentIndex": 88
        },
        {
            "id": "mov_sit_01_q6",
            "question": "What hilarious pseudonym appears on the address label of Chandler and Joey's weekly TV Guide?",
            "questionEn": "What hilarious pseudonym appears on the address label of Chandler and Joey's weekly TV Guide?",
            "questionVi": "Tên người nhận hài hước nào xuất hiện trên nhãn địa chỉ của cuốn tạp chí TV Guide gửi tới căn hộ của Chandler và Joey?",
            "options": [
                "Mr. Joey Tribbiani Jr.",
                "Miss Chanandler Bong",
                "Dr. Drake Ramoray",
                "The Ken Adams Residence"
            ],
            "optionsEn": [
                "Mr. Joey Tribbiani Jr.",
                "Miss Chanandler Bong",
                "Dr. Drake Ramoray",
                "The Ken Adams Residence"
            ],
            "optionsVi": [
                "Ông Joey Tribbiani Jr.",
                "Quý cô Chanandler Bong",
                "Bác sĩ Drake Ramoray",
                "Dinh thự Ken Adams"
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 97-100, Chandler reveals that the TV Guide address label is addressed to 'Chanandler Bong', and Ross delivers the punchline: 'Actually, it's Miss Chanandler Bong.'",
            "explanationEn": "In Segments 97-100, Chandler reveals that the TV Guide address label is addressed to 'Chanandler Bong', and Ross delivers the punchline: 'Actually, it's Miss Chanandler Bong.'",
            "explanationVi": "Trong các Phân đoạn 97-100, Chandler tiết lộ nhãn tạp chí TV Guide ghi tên 'Chanandler Bong', và Ross nhấn thêm câu chốt hạ đắt giá: 'Thực ra phải là Quý cô Chanandler Bong.'",
            "targetedConcept": "Iconic TV sitcom trivia & mail misspelling joke",
            "targetedConceptEn": "Iconic TV sitcom trivia & mail misspelling joke",
            "targetedConceptVi": "Chi tiết đố vui kinh điển trong Sitcom & trò đùa viết sai tên trên bưu phẩm",
            "referenceSegmentIndex": 100
        },
        {
            "id": "mov_sit_01_q7",
            "question": "Why was Chandler able to guess the final grocery item 'Scotch tape' with 100% certainty in Segment 34?",
            "questionEn": "Why was Chandler able to guess the final grocery item 'Scotch tape' with 100% certainty in Segment 34?",
            "questionVi": "Vì sao Chandler có thể đoán chắc như đinh đóng cột món đồ tạp hóa cuối cùng là 'băng dính Scotch' trong Phân đoạn 34?",
            "options": [
                "He peeked through Rachel's transparent shopping bag.",
                "He and Joey had used up all of Monica and Rachel's tape the night before making scary faces.",
                "He overheard Rachel talking to the cashier on the street.",
                "Monica left the empty dispenser on the coffee table."
            ],
            "optionsEn": [
                "He peeked through Rachel's transparent shopping bag.",
                "He and Joey had used up all of Monica and Rachel's tape the night before making scary faces.",
                "He overheard Rachel talking to the cashier on the street.",
                "Monica left the empty dispenser on the coffee table."
            ],
            "optionsVi": [
                "Cậu lén nhìn xuyên qua túi mua sắm trong suốt của Rachel.",
                "Cậu và Joey đã dùng hết sạch cuộn băng dính của Monica và Rachel vào tối hôm trước để dán mặt dọa ma.",
                "Cậu tình cờ nghe thấy Rachel nói chuyện với thu ngân trên phố.",
                "Monica để lại cuộn băng dính rỗng trên bàn cà phê."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 34, Chandler explains: 'Well, we used up theirs last night making scary faces.'",
            "explanationEn": "In Segment 34, Chandler explains: 'Well, we used up theirs last night making scary faces.'",
            "explanationVi": "Trong Phân đoạn 34, Chandler giải thích lý do logic: 'Tối qua bọn này dùng hết sạch cuộn băng dính của mấy cậu để dán mặt dọa ma rồi.'",
            "targetedConcept": "Comedic cause-and-effect narrative logic",
            "targetedConceptEn": "Comedic cause-and-effect narrative logic",
            "targetedConceptVi": "Logic nhân quả hài hước trong kết cấu kịch bản",
            "referenceSegmentIndex": 34
        },
        {
            "id": "mov_sit_01_q8",
            "question": "What four categories did Ross officially establish on his apartment trivia quiz board?",
            "questionEn": "What four categories did Ross officially establish on his apartment trivia quiz board?",
            "questionVi": "Bốn chủ đề thi đấu chính thức nào được Ross thiết lập trên bảng đố vui cá cược căn hộ?",
            "options": [
                "Science, Prehistoric Fossils, Romance, and Culinary Arts",
                "Fears and Pet Peeves, Ancient History, Literature, and It's All Relative",
                "Childhood Secrets, Dating Disasters, High School Days, and Sports",
                "Thanksgiving Fails, Holiday Trips, Career Ambitions, and Pets"
            ],
            "optionsEn": [
                "Science, Prehistoric Fossils, Romance, and Culinary Arts",
                "Fears and Pet Peeves, Ancient History, Literature, and It's All Relative",
                "Childhood Secrets, Dating Disasters, High School Days, and Sports",
                "Thanksgiving Fails, Holiday Trips, Career Ambitions, and Pets"
            ],
            "optionsVi": [
                "Khoa học, Hóa thạch tiền sử, Tình cảm lãng mạn, và Nghệ thuật ẩm thực",
                "Nỗi Sợ Hãi và Điều Khó Chịu, Lịch Sử Cổ Đại, Văn Học, và Tất Cả Là Chuyện Gia Đình",
                "Bí mật tuổi thơ, Thảm họa hẹn hò, Thời trung học, và Thể thao",
                "Thảm họa Lễ Tạ Ơn, Các chuyến du lịch nghỉ lễ, Hoài bão sự nghiệp, và Thú cưng"
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 59-60, Ross announces the categories: 'The categories are: Fears and Pet Peeves, Ancient History, Literature, and It's All Relative.'",
            "explanationEn": "In Segments 59-60, Ross announces the categories: 'The categories are: Fears and Pet Peeves, Ancient History, Literature, and It's All Relative.'",
            "explanationVi": "Trong các Phân đoạn 59-60, Ross công bố các chủ đề: 'Bốn chủ đề gồm có: Nỗi Sợ Hãi và Điều Khó Chịu, Lịch Sử Cổ Đại, Văn Học, và Tất Cả Là Chuyện Gia Đình.'",
            "targetedConcept": "Structured comedic game show parody format",
            "targetedConceptEn": "Structured comedic game show parody format",
            "targetedConceptVi": "Cấu trúc game show đố vui giễu nhại hài hước",
            "referenceSegmentIndex": 59
        }
    ]
}

# Construct TypeScript file content
ts_content = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Friends: The Iconic Apartment Bet Trivia Game (Full Master Cut)
 * Category: Sitcom Kinh Điển & Hài Kịch (cat_classic_sitcoms)
 * Level: CEFR B1 | American Accent
 * YouTube ID: v1xXlxDHWPU (05:13 - 313s)
 * Views: 9,063,776 | Channel: HBO Max Official
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (WARNER BROS / MAX)
 * ZERO MERGED UTTERANCES - PHÂN TÁCH ĐỘC LẬP TỪNG SPEAKER TURN
 * TỔNG CỘNG: {len(raw_segments_data)} PURE MASTER SEGMENTS (00:00 - 05:13)
 * ============================================================================
 */

export const QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};
export const QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA = QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED;

export const LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA: MockVideoLesson = {{
  id: "mov_sit_01",
  slug: "friends-the-iconic-apartment-bet-trivia",
  title: "Friends: The Iconic Apartment Bet Trivia Game (Full Master Cut)",
  categoryId: "cat_classic_sitcoms",
  categorySlug: "classic-sitcoms",
  categoryName: "Sitcom Kinh Điển & Hài Kịch",
  cefrLevel: "B1",
  durationFormatted: "05:13",
  durationSeconds: 313,
  externalId: "v1xXlxDHWPU",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/v1xXlxDHWPU/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 142,
  viewCount: 9063776,
  studyCount: 18450,
  description:
    "Trường đoạn đố vui cá cược kinh điển nhất lịch sử sitcom truyền hình Friends: Từ màn cá cược đoán túi đồ tạp hóa 10 đô-la, chiếc băng dính Scotch tape, Ross làm trọng tài bất đắc dĩ, nỗi sợ Michael Flatley Lord of the Dance, người bà Althea, cho đến cú chốt hạ danh xưng bất hủ 'Miss Chanandler Bong' khiến hai cô gái phải ngậm ngùi hoán đổi căn hộ.",
  segments: [
'''

for i, seg in enumerate(raw_segments_data):
    seg_obj = {
        "orderIndex": i,
        "startTime": seg["startTime"],
        "endTime": seg["endTime"],
        "text": seg["text"],
        "translationVi": seg["translationVi"],
        "ipaUs": seg["ipaUs"],
        "keywords": seg["keywords"],
        "explanationAi": seg["explanationAi"],
        "properNouns": seg["properNouns"],
        "tokenCount": seg["tokenCount"]
    }
    ts_content += "    " + json.dumps(seg_obj, ensure_ascii=False, indent=4).replace("\n", "\n    ")
    if i < len(raw_segments_data) - 1:
        ts_content += ",\n"
    else:
        ts_content += "\n"

ts_content += f'''  ],
  quiz: QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED,
}};

export default LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA;
'''

out_path = "features/listening/data/lessons/movies/sitcoms/lesson_friends_apartment_bet.ts"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated {out_path} successfully with {len(raw_segments_data)} segments and 8 quiz questions!")

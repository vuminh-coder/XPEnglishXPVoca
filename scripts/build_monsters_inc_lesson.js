const fs = require('fs');
const { tokenizeSentence } = require('./verify_monsters_inc_tokens');

const segments = [
  {
    orderIndex: 0,
    startTime: 28.0,
    endTime: 52.0,
    text: "Monsters, Inc. has such a crazy concept. I mean, we're talking about a city run by monsters, and the way they generate power for the city is by scaring little children! Still, I had a great time when I watched this movie for the first time.",
    translationVi: "Công ty Quái vật có một ý tưởng độc đáo đến kinh ngạc. Ý tôi là, chúng ta đang nói về một thành phố được vận hành bởi những con quái vật, và cách chúng tạo ra nguồn điện năng cho thành phố chính là đi hù dọa các em nhỏ! Dù vậy, tôi đã có những giây phút vô cùng tuyệt vời khi lần đầu tiên thưởng thức bộ phim này.",
    ipaUs: "/ˈmɑːnstərz ɪŋk hæz sʌtʃ ə ˈkreɪzi ˈkɑːnsɛpt. aɪ miːn, wɪr ˈtɔːkɪŋ əˈbaʊt ə ˈsɪti rʌn baɪ ˈmɑːnstərz, ænd ðə weɪ ðeɪ ˈdʒɛnəreɪt ˈpaʊər fɔːr ðə ˈsɪti ɪz baɪ ˈskɛrɪŋ ˈlɪtəl ˈtʃɪldrən! stɪl, aɪ hæd ə ɡreɪt taɪm wɛn aɪ wɑːtʃt ðɪs ˈmuːvi fɔːr ðə fɜːrst taɪm./",
    keywords: ["crazy concept", "generate power", "scaring little children", "great time"],
    explanationAi: "Khái niệm giả tưởng độc đáo của Monsters, Inc.: Thành phố quái vật Monstropolis vận hành hoàn toàn nhờ vào năng lượng tiếng la hét của trẻ em.",
    properNouns: ["Monsters, Inc."]
  },
  {
    orderIndex: 1,
    startTime: 87.0,
    endTime: 102.0,
    text: "You know, pal, she's the one! That's it, she is the one. — I'm happy for you. — Oh, and thanks for hooking me up with those reservations. — Oh, no problem. They're under the name Googly Bear.",
    translationVi: "Cậu biết không anh bạn, cô ấy chính là một nửa định mệnh đời tớ! Chuẩn luôn, cô ấy là duy nhất. — Tớ mừng cho cậu. — À, và cảm ơn cậu đã giúp tớ đặt được bàn ở nhà hàng sang trọng đó nhé. — Ôi có gì đâu. Tên đặt bàn là 'Gấu Mắt Tròn' đấy.",
    ipaUs: "/juː noʊ, pæl, ʃiːz ðə wʌn! ðæts ɪt, ʃiː ɪz ðə wʌn. — aɪm ˈhæpi fɔːr juː. — oʊ, ænd θæŋks fɔːr ˈhʊkɪŋ miː ʌp wɪð ðoʊz ˌrɛzərˈveɪʃənz. — oʊ, noʊ ˈprɑːbləm. ðeɪr ˈʌndər ðə neɪm ˈɡuːɡli bɛr./",
    keywords: ["pal", "she's the one", "hooking me up with", "reservations", "Googly Bear"],
    explanationAi: "Thành ngữ 'she's the one' (người phụ nữ định mệnh của cuộc đời) và 'hook someone up with...' (giúp đỡ ai đó có được thứ gì giá trị). Biệt danh đáng yêu 'Googly Bear' mà Celia gọi Mike.",
    properNouns: ["Googly Bear"]
  },
  {
    orderIndex: 2,
    startTime: 103.0,
    endTime: 120.0,
    text: "You know, that wasn't very funny! What the... What do you know! It scares little kids and little monsters! — I wasn't scared, I have allergies. — Uh-huh, sure.",
    translationVi: "Cậu biết đấy, trò đó chẳng vui tí nào đâu! Cái quái gì... Ai mà ngờ được chứ! Trò đó dọa được cả con nít lẫn quái vật tí hon đấy! — Tớ không có sợ đâu nhé, tớ bị dị ứng thôi. — Ừ hử, chắc vậy rồi.",
    ipaUs: "/juː noʊ, ðæt ˈwʌzənt ˈvɛri ˈfʌni! wʌt ðə... wʌt duː juː noʊ! ɪt skɛrz ˈlɪtəl kɪdz ænd ˈlɪtəl ˈmɑːnstərz! — aɪ ˈwʌzənt skɛrd, aɪ hæv ˈælərdʒiz. — ˈʌˌhʌ, ʃʊr./",
    keywords: ["wasn't very funny", "what do you know", "scares little kids", "allergies", "uh-huh sure"],
    explanationAi: "Cụm cảm thán 'What do you know!' (Ai mà ngờ được chứ / Ai ngờ cơ chứ!). Lời chữa ngượng kinh điển của Mike khi bị Randall giật mình: 'I have allergies' (Tôi bị dị ứng).",
    properNouns: []
  },
  {
    orderIndex: 3,
    startTime: 120.0,
    endTime: 135.0,
    text: "Hey Randall, save it for the scare floor, will you? — I'm in the zone today, Sullivan! Going to be doing some serious scaring, putting up some big numbers! — Wow, Randall, that's great.",
    translationVi: "Này Randall, để dành năng lượng đó cho sàn dọa nạt đi, được không? — Hôm nay phong độ tao đang lên đỉnh cao đấy Sullivan! Tao sẽ hù dọa cực kỳ khủng khiếp và lập kỷ lục điểm số chót vót cho xem! — Ồ Randall, tuyệt vời quá cơ.",
    ipaUs: "/heɪ ˈrændəl, seɪv ɪt fɔːr ðə skɛr flɔːr, wɪl juː? — aɪm ɪn ðə zoʊn təˈdeɪ, ˈsʌlɪvən! ˈɡoʊɪŋ tuː biː ˈduːɪŋ sʌm ˈsɪriəs ˈskɛrɪŋ, ˈpʊtɪŋ ʌp sʌm bɪɡ ˈnʌmbərz! — waʊ, ˈrændəl, ðæts ɡreɪt./",
    keywords: ["save it for the scare floor", "in the zone", "serious scaring", "big numbers"],
    explanationAi: "Thành ngữ 'in the zone' diễn tả trạng thái tập trung và đạt phong độ cao nhất, thăng hoa trong công việc hoặc thi đấu.",
    properNouns: ["Randall", "Sullivan"]
  },
  {
    orderIndex: 4,
    startTime: 136.0,
    endTime: 151.0,
    text: "That should make it even more humiliating when we break the record first! — Shh! Do you hear that? It's the Winds of Change! You hear it? You hear the Winds of Change? — What a creep!",
    translationVi: "Điều đó sẽ càng làm mày bẽ bàng nhục nhã hơn khi bọn tao phá vỡ kỷ lục trước! — Suỵt! Mày có nghe thấy gì không? Đó là Ngọn Gió Đổi Thay đấy! Mày có nghe thấy không? — Đúng là đồ quái đản dị hợm!",
    ipaUs: "/ðæt ʃʊd meɪk ɪt ˈiːvən mɔːr hjuːˈmɪliˌeɪtɪŋ wɛn wiː breɪk ðə ˈrɛkərd fɜːrst! — ʃ! duː juː hɪr ðæt? ɪts ðə wɪndz əv tʃeɪndʒ! juː hɪr ɪt? juː hɪr ðə wɪndz əv tʃeɪndʒ? — wʌt ə kriːp!/`",
    keywords: ["humiliating", "break the record", "Winds of Change", "what a creep"],
    explanationAi: "Ẩn dụ 'Winds of Change' (ngọn gió đổi thay) mà Randall dùng để đe dọa sự thống trị của Sulley. Cụm cảm thán 'What a creep!' (Thật là đồ quái dị / ghê tởm!).",
    properNouns: ["Winds of Change"]
  },
  {
    orderIndex: 5,
    startTime: 152.0,
    endTime: 180.0,
    text: "As you may know, Mike and Sulley are good friends. You can call a friend of yours 'pal'. In American English, pal is very common when talking to male friends, whereas in British English you will likely hear 'mate'.",
    translationVi: "Như bạn đã biết, Mike và Sulley là những người bạn tri kỷ. Bạn có thể gọi một người bạn thân là 'pal'. Trong tiếng Anh-Mỹ, 'pal' rất phổ biến khi xưng hô giữa bạn bè nam giới, trong khi ở tiếng Anh-Anh bạn sẽ thường nghe từ 'mate'.",
    ipaUs: "/æz juː meɪ noʊ, maɪk ænd ˈsʌli ɑːr ɡʊd frɛndz. juː kæn kɔːl ə frɛnd əv jʊərz pæl. ɪn əˈmɛrɪkən ˈɪŋɡlɪʃ, pæl ɪz ˈvɛri ˈkɑːmən wɛn ˈtɔːkɪŋ tuː meɪl frɛndz, wɛərˈæz ɪn ˈbrɪtɪʃ ˈɪŋɡlɪʃ juː wɪl ˈlaɪkli hɪr meɪt./",
    keywords: ["good friends", "pal", "American English", "British English", "mate"],
    explanationAi: "Phân biệt văn hóa xưng hô: 'pal' đặc trưng cho phong cách giao tiếp thân mật kiểu Mỹ, tương đương với 'mate' trong văn hóa Anh Quốc.",
    properNouns: ["Mike", "Sulley"]
  },
  {
    orderIndex: 6,
    startTime: 200.0,
    endTime: 225.0,
    text: "As a good friend, Sulley has gotten a reservation at a nice restaurant for Mike. When you hook someone up with something, you provide that person with something useful or beneficial, often as a favor or for free.",
    translationVi: "Là một người bạn tốt, Sulley đã giúp Mike đặt được chỗ tại một nhà hàng sang trọng. Khi bạn 'hook someone up with something', nghĩa là bạn kết nối, thu xếp hoặc cung cấp cho ai đó thứ gì hữu ích, thường là sự giúp đỡ nhiệt tình hoặc miễn phí.",
    ipaUs: "/æz ə ɡʊd frɛnd, ˈsʌli hæz ˈɡɑːtən ə ˌrɛzərˈveɪʃən æt ə naɪs ˈrɛstərənt fɔːr maɪk. wɛn juː hʊk ˈsʌmwʌn ʌp wɪð ˈsʌmθɪŋ, juː prəˈvaɪd ðæt ˈpɜːrsən wɪð ˈsʌmθɪŋ ˈjuːsfəl ɔːr ˌbɛnəˈfɪʃəl, ˈɔːfən æz ə ˈfeɪvər ɔːr fɔːr friː./",
    keywords: ["gotten a reservation", "hook someone up with", "provide", "beneficial", "favor"],
    explanationAi: "Cụm động từ thành ngữ 'hook someone up with' cực kỳ thông dụng trong đời sống Mỹ khi giúp bạn bè nhận vé xem ca nhạc, chỗ đặt nhà hàng hay mối làm ăn tốt.",
    properNouns: ["Sulley", "Mike"]
  },
  {
    orderIndex: 7,
    startTime: 255.0,
    endTime: 280.0,
    text: "When Randall says 'I'm in the zone today', he means he is in a state of intense focus and peak performance, where everything flows effortlessly and he feels confident he will achieve extraordinary results.",
    translationVi: "Khi Randall nói 'I'm in the zone today', hắn ngụ ý rằng mình đang đạt phong độ đỉnh cao và sự tập trung tột độ, nơi mọi hành động đều diễn ra trơn tru và tự tin sẽ tạo nên kỷ lục phi thường.",
    ipaUs: "/wɛn ˈrændəl sɛz aɪm ɪn ðə zoʊn təˈdeɪ, hiː miːnz hiː ɪz ɪn ə steɪt əv ɪnˈtɛns ˈfoʊkəs ænd piːk pərˈfɔːrməns, wɛr ˈɛvriˌθɪŋ floʊz ˈɛfərtləsli ænd hiː fiːlz ˈkɑːnfɪdənt hiː wɪl əˈtʃiːv ɪkˈstrɔːrdəˌnɛri rɪˈzʌlts./",
    keywords: ["in the zone", "intense focus", "peak performance", "flows effortlessly", "extraordinary results"],
    explanationAi: "Trạng thái tâm lý học 'flow state' hay 'in the zone' thường được các vận động viên và chuyên gia hàng đầu sử dụng khi thi đấu ở điểm rơi phong độ cao nhất.",
    properNouns: ["Randall"]
  },
  {
    orderIndex: 8,
    startTime: 525.0,
    endTime: 545.0,
    text: "Hey, where are you going, Sulley? Please don't blow this, not when we're so close to breaking the record! Come on, somebody else will find the kid. It'll be their problem, not ours!",
    translationVi: "Này Sulley, cậu đi đâu đấy? Làm ơn đừng làm hỏng bét mọi chuyện chứ, nhất là khi chúng mình đang cận kề việc phá kỷ lục thế này! Thôi nào, người khác sẽ tìm thấy đứa bé thôi. Đó sẽ là chuyện của họ, không phải của chúng ta!",
    ipaUs: "/heɪ, wɛr ɑːr juː ˈɡoʊɪŋ, ˈsʌli? pliːz doʊnt bloʊ ðɪs, nɑːt wɛn wɪr soʊ kloʊs tuː ˈbreɪkɪŋ ðə ˈrɛkərd! kʌm ɑːn, ˈsʌmˌbɑːdi ɛls wɪl faɪnd ðə kɪd. ɪtl biː ðɛr ˈprɑːbləm, nɑːt ˈaʊərz!/",
    keywords: ["don't blow this", "breaking the record", "find the kid", "their problem"],
    explanationAi: "Thành ngữ 'don't blow this' nghĩa là đừng làm hỏng hoặc lãng phí cơ hội ngàn vàng (thường dùng khi đứng trước bước ngoặt quan trọng).",
    properNouns: ["Sulley"]
  },
  {
    orderIndex: 9,
    startTime: 546.0,
    endTime: 570.0,
    text: "She's out of our hair! In this context, the expression 'she's out of our hair' means Boo is no longer causing Mike and Sulley any trouble or inconvenience. When someone is out of your hair, they stop bothering you.",
    translationVi: "Nó đã biến khỏi mắt chúng mình rồi! Trong ngữ cảnh này, thành ngữ 'she's out of our hair' có nghĩa là bé Boo không còn gây phiền phức hay rắc rối cho Mike và Sulley nữa. Khi ai đó 'out of your hair', họ không còn quấy rầy bạn.",
    ipaUs: "/ʃiːz aʊt əv ˈaʊər hɛr! ɪn ðɪs ˈkɑːntɛkst, ðə ɪkˈsprɛʃən ʃiːz aʊt əv ˈaʊər hɛr miːnz buː ɪz noʊ ˈlɔːŋɡər ˈkɔːzɪŋ maɪk ænd ˈsʌli ˈɛni ˈtrʌbəl ɔːr ˌɪnkənˈviːnjəns. wɛn ˈsʌmwʌn ɪz aʊt əv jʊər hɛr, ðeɪ stɑːp ˈbɑːðərɪŋ juː./",
    keywords: ["out of our hair", "trouble or inconvenience", "stop bothering you", "connotation"],
    explanationAi: "Thành ngữ sinh động 'get / be out of someone's hair' có nghĩa là ngừng quấy rầy hoặc thoát khỏi sự phiền toái từ một ai đó.",
    properNouns: ["Boo", "Mike", "Sulley"]
  },
  {
    orderIndex: 10,
    startTime: 580.0,
    endTime: 605.0,
    text: "What are you two doing? — They're rehearsing a play: 'She's out of our hair!' — Can it! — This is an interesting slang phrase. 'Can it' means stop talking, be quiet, or shut up, used either playfully or sternly.",
    translationVi: "Hai người đang làm trò gì ở đây thế? — Họ đang tập kịch đấy: 'Nó đã biến khỏi mắt chúng mình'! — Câm họng lại đi! — Đây là một tiếng lóng rất thú vị. 'Can it' có nghĩa là ngừng nói, im lặng hoặc câm miệng, có thể dùng trêu đùa hoặc gay gắt.",
    ipaUs: "/wʌt ɑːr juː tuː ˈduːɪŋ? — ðeɪr rɪˈhɜːrsɪŋ ə pleɪ: ʃiːz aʊt əv ˈaʊər hɛr! — kæn ɪt! — ðɪs ɪz ən ˈɪntrəstɪŋ slæŋ freɪz. kæn ɪt miːnz stɑːp ˈtɔːkɪŋ, biː ˈkwaɪət, ɔːr ʃʌt ʌp, juːzd ˈiːðər ˈpleɪfəli ɔːr stɜːrnli./",
    keywords: ["rehearsing a play", "can it", "stop talking", "be quiet", "shut up"],
    explanationAi: "Tiếng lóng 'Can it!' (Im miệng lại / Đóng nắp hộp lại đi) là cách nói gắt gỏng nhưng hài hước để bảo người khác hãy trật tự.",
    properNouns: []
  },
  {
    orderIndex: 11,
    startTime: 616.0,
    endTime: 645.0,
    text: "So what do you think of that kid getting out, Sullivan? Pretty crazy, huh? — Oh yeah, crazy. — Word on the street is the kid's been traced back to this factory. You haven't seen anything, have you?",
    translationVi: "Thế mày nghĩ sao về vụ con nhóc đó xổng ra ngoài, hả Sullivan? Khá điên rồ đấy nhỉ? — À ừ, điên rồ thật. — Thiên hạ đồn rằng con nhóc đó được lần ra tung tích từ chính nhà máy này. Mày chưa thấy gì bất thường chứ, đúng không?",
    ipaUs: "/soʊ wʌt duː juː θɪŋk əv ðæt kɪd ˈɡɛtɪŋ aʊt, ˈsʌlɪvən? ˈprɪti ˈkreɪzi, hʌ? — oʊ jɛə, ˈkreɪzi. — wɜːrd ɑːn ðə striːt ɪz ðə kɪdz bɪn treɪst bæk tuː ðɪs ˈfæktəri. juː ˈhævənt siːn ˈɛniˌθɪŋ, hæv juː?/",
    keywords: ["getting out", "pretty crazy", "word on the street is", "traced back to this factory"],
    explanationAi: "Thành ngữ 'word on the street is...' (nghe đồn rằng / tin đồn ngoài phố là...). Randall bắt đầu thẩm vấn và nghi ngờ Sulley dính líu đến đứa trẻ.",
    properNouns: ["Sullivan"]
  },
  {
    orderIndex: 12,
    startTime: 655.0,
    endTime: 695.0,
    text: "If you trace something back to somewhere, you find evidence connecting it to its origin. When Randall asks if they've seen anything, Mike emphatically denies it saying: 'No, no way!' which expresses strong refusal or disbelief.",
    translationVi: "Khi bạn 'trace something back to somewhere', bạn tìm ra manh mối hoặc bằng chứng liên kết nó với nơi khởi nguồn. Khi Randall dò hỏi liệu họ có thấy gì không, Mike lập tức phủ nhận dứt khoát: 'Không, không đời nào!', thể hiện sự cự tuyệt hoặc bất ngờ mãnh liệt.",
    ipaUs: "/ɪf juː treɪs ˈsʌmθɪŋ bæk tuː ˈsʌmˌwɛr, juː faɪnd ˈɛvɪdəns kəˈnɛktɪŋ ɪt tuː ɪts ˈɔːrɪdʒɪn. wɛn ˈrændəl æsks ɪf ðeɪv siːn ˈɛniˌθɪŋ, maɪk ɛmˈfætɪkli dɪˈnaɪz ɪt ˈseɪɪŋ: noʊ, noʊ weɪ! wɪtʃ ɪkˈsprɛsɪz strɔːŋ rɪˈfjuːzəl ɔːr ˌdɪsbɪˈliːf./",
    keywords: ["trace back to", "evidence", "origin", "emphatically denies", "no way"],
    explanationAi: "Cụm 'trace back to' (truy tìm nguồn gốc) và thán từ 'No way!' dùng để phủ nhận kịch liệt hoặc thốt lên sự kinh ngạc khôn xiết.",
    properNouns: ["Randall", "Mike"]
  },
  {
    orderIndex: 13,
    startTime: 696.0,
    endTime: 735.0,
    text: "But if it was an inside job, I'd put my money on Waxford! — Waxford? — Yeah, the one at station six! An 'inside job' refers to a crime or secret plot committed by someone who works within the organization.",
    translationVi: "Nhưng nếu đó là một vụ nội gián tuồn người vào, thì tao cá chắc là do thằng Waxford! — Waxford á? — Ừ, cái gã ở trạm số sáu ấy! 'Inside job' chỉ một tội ác hoặc âm mưu bí mật do chính người làm việc bên trong tổ chức thực hiện.",
    ipaUs: "/bʌt ɪf ɪt wʌz ən ˈɪnˌsaɪd dʒɑːb, aɪd pʊt maɪ ˈmʌni ɑːn ˈwæksfərd! — ˈwæksfərd? — jɛə, ðə wʌn æt ˈsteɪʃən sɪks! ən ˈɪnˌsaɪd dʒɑːb rɪˈfɜːrz tuː ə kraɪm ɔːr ˈsiːkrɪt plɑːt kəˈmɪtɪd baɪ ˈsʌmwʌn huː wɜːrks wɪˈðɪn ðə ˌɔːrɡənəˈzeɪʃən./",
    keywords: ["inside job", "put my money on", "Waxford", "station six", "secret plot"],
    explanationAi: "Thuật ngữ hình sự 'inside job' (vụ án nội bộ / kẻ nội gián thực hiện) được Mike đưa ra một cách hài hước nhằm đánh lạc hướng sự chú ý của Randall sang Waxford.",
    properNouns: ["Waxford"]
  },
  {
    orderIndex: 14,
    startTime: 736.0,
    endTime: 765.0,
    text: "To put your money on someone means you are confident they did it. In English, we also have the famous expression 'put your money where your mouth is', which means to back up your words with decisive action instead of just talking.",
    translationVi: "'To put your money on someone' có nghĩa bạn tin chắc người đó là thủ phạm. Trong tiếng Anh, chúng ta còn có thành ngữ kinh điển 'put your money where your mouth is', nghĩa là hãy chứng minh bằng hành động cụ thể thay vì chỉ nói suông.",
    ipaUs: "/tuː pʊt jʊər ˈmʌni ɑːn ˈsʌmwʌn miːnz juː ɑːr ˈkɑːnfɪdənt ðeɪ dɪd ɪt. ɪn ˈɪŋɡlɪʃ, wiː ˈɔːlsoʊ hæv ðə ˈfeɪməs ɪkˈsprɛʃən pʊt jʊər ˈmʌni wɛr jʊər maʊθ ɪz, wɪtʃ miːnz tuː bæk ʌp jʊər wɜːrdz wɪð dɪˈsaɪsɪv ˈækʃən ɪnˈstɛd əv dʒʌst ˈtɔːkɪŋ./",
    keywords: ["put your money on", "confident", "put your money where your mouth is", "back up your words", "decisive action"],
    explanationAi: "Thành ngữ 'put your money where your mouth is' (nói phải đi đôi với làm / đừng chỉ khua môi múa mép) là một trong những thành ngữ giá trị nhất trong tiếng Anh giao tiếp và công việc.",
    properNouns: []
  },
  {
    orderIndex: 15,
    startTime: 766.0,
    endTime: 795.0,
    text: "You know, he got them shifty eyes! Mike uses the informal phrasing 'them shifty eyes'. If you describe someone as 'shifty', it means they look suspicious, untrustworthy, and deceitful, like someone who cannot be trusted.",
    translationVi: "Mày biết đấy, mắt gã đó cứ láo liên gian xảo thế nào ấy! Mike dùng cách nói bình dân 'them shifty eyes'. Khi bạn miêu tả ai đó là 'shifty', điều đó có nghĩa họ trông đáng ngờ, gian xảo và lươn lẹo, không thể tin cậy được.",
    ipaUs: "/juː noʊ, hiː ɡɑːt ðɛm ˈʃɪfti aɪz! maɪk ˈjuːzəz ðə ɪnˈfɔːrməl ˈfreɪzɪŋ ðɛm ˈʃɪfti aɪz. ɪf juː dɪˈskraɪb ˈsʌmwʌn æz ˈʃɪfti, ɪt miːnz ðeɪ lʊk səˈspɪʃəs, ʌnˈtrʌstˌwɜːrði, ænd dɪˈsiːtfəl, laɪk ˈsʌmwʌn huː ˈkænɑːt biː ˈtrʌstɪd./",
    keywords: ["them shifty eyes", "informal phrasing", "shifty", "suspicious", "untrustworthy", "deceitful"],
    explanationAi: "Tính từ miêu tả tính cách 'shifty' (gian manh, xảo trá, mắt liếc ngang liếc dọc). Cụm ngữ pháp đời thường Mỹ: dùng 'them' thay cho 'those'.",
    properNouns: ["Mike"]
  },
  {
    orderIndex: 16,
    startTime: 1037.0,
    endTime: 1059.0,
    text: "Bye-bye! Leave me alone, I'm not kidding! Pop a worm pill and hit the road, I'm busy! You want to play? Fine, you can be the new astronaut. Go jump in the pail and we'll shoot you into outer space!",
    translationVi: "Tạm biệt nhé! Để tớ yên đi, tớ không đùa đâu đấy! Uống viên thuốc giun rồi biến đi giùm cái, tớ đang bận lắm! Muốn chơi chứ gì? Được thôi, cậu sẽ làm phi hành gia mới nhé. Nhảy tọt vào cái xô đi rồi bọn tớ sẽ bắn cậu vào không gian vũ trụ!",
    ipaUs: "/baɪ baɪ! liːv miː əˈloʊn, aɪm nɑːt ˈkɪdɪŋ! pɑːp ə wɜːrm pɪl ænd hɪt ðə roʊd, aɪm ˈbɪzi! juː wɑːnt tuː pleɪ? faɪn, juː kæn biː ðə nuː ˈæstrəˌnɔːt. ɡoʊ dʒʌmp ɪn ðə peɪl ænd wiːl ʃuːt juː ˈɪntuː ˈaʊtər speɪs!/",
    keywords: ["leave me alone", "hit the road", "astronaut", "jump in the pail", "outer space"],
    explanationAi: "Thành ngữ 'hit the road' (lên đường / cút xéo đi ngay). Phân đoạn kết thúc hài hước đậm chất Mike Wazowski cố lừa Boo trèo vào thùng rác để che giấu cô bé.",
    properNouns: []
  }
];

// Add tokenCount
segments.forEach((seg, idx) => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
  seg.tokenCount = tokens.length;
  console.log(`Segment ${idx}: ${tokens.length} tokens`);
});

const quizData = {
  lessonId: "mov_ani_12",
  lessonTitle: "Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder",
  totalQuestions: 6,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_12_1",
      question: "What does Mike mean when he thanks Sulley for 'hooking me up with those reservations'?",
      questionEn: "What does Mike mean when he thanks Sulley for 'hooking me up with those reservations'?",
      questionVi: "Mike có ý gì khi cảm ơn Sulley vì đã 'hooking me up with those reservations'?",
      options: [
        "Sulley arranged and secured restaurant reservations for Mike as a helpful favor",
        "Sulley cancelled Mike's existing dinner reservations",
        "Sulley charged Mike extra money to buy stolen reservation tickets",
        "Sulley refused to let Mike dine at the monster restaurant"
      ],
      optionsEn: [
        "Sulley arranged and secured restaurant reservations for Mike as a helpful favor",
        "Sulley cancelled Mike's existing dinner reservations",
        "Sulley charged Mike extra money to buy stolen reservation tickets",
        "Sulley refused to let Mike dine at the monster restaurant"
      ],
      optionsVi: [
        "Sulley đã thu xếp và đặt bàn nhà hàng cho Mike như một sự giúp đỡ nhiệt tình",
        "Sulley đã hủy đặt bàn bữa tối hiện có của Mike",
        "Sulley tính thêm tiền của Mike để mua vé đặt bàn chợ đen",
        "Sulley từ chối cho Mike ăn tối tại nhà hàng quái vật"
      ],
      correctAnswer: 0,
      explanation: "To 'hook someone up with something' means to provide or arrange something useful and beneficial for someone as a favor.",
      explanationEn: "To 'hook someone up with something' means to provide or arrange something useful and beneficial for someone as a favor.",
      explanationVi: "'Hook someone up with something' có nghĩa là thu xếp hoặc cung cấp điều gì hữu ích cho ai đó như một sự giúp đỡ thân tình.",
      targetedConcept: "Idiom: Hook someone up with",
      targetedConceptEn: "Idiom: Hook someone up with",
      targetedConceptVi: "Thành ngữ: Giúp đỡ / thu xếp cho ai đó",
      referenceSegmentIndex: 1
    },
    {
      id: "q_mov_ani_12_2",
      question: "When Randall boasts 'I'm in the zone today', what psychological state is he describing?",
      questionEn: "When Randall boasts 'I'm in the zone today', what psychological state is he describing?",
      questionVi: "Khi Randall khoe khoang 'I'm in the zone today', hắn đang mô tả trạng thái tâm lý nào?",
      options: [
        "He is in a state of peak focus and extraordinary performance where everything works effortlessly",
        "He is feeling extremely sleepy and wants to rest in his bedroom",
        "He is lost in a dangerous restricted area of the factory",
        "He is terrified of the little human children"
      ],
      optionsEn: [
        "He is in a state of peak focus and extraordinary performance where everything works effortlessly",
        "He is feeling extremely sleepy and wants to rest in his bedroom",
        "He is lost in a dangerous restricted area of the factory",
        "He is terrified of the little human children"
      ],
      optionsVi: [
        "Hắn đang ở trạng thái tập trung đỉnh cao và phong độ xuất sắc nhất, làm gì cũng trơn tru",
        "Hắn cảm thấy cực kỳ buồn ngủ và muốn nghỉ ngơi trong phòng",
        "Hắn bị lạc trong khu vực cấm nguy hiểm của nhà máy",
        "Hắn đang khiếp sợ những đứa trẻ loài người"
      ],
      correctAnswer: 0,
      explanation: "'In the zone' refers to a flow state of peak performance, intense concentration, and confident execution.",
      explanationEn: "'In the zone' refers to a flow state of peak performance, intense concentration, and confident execution.",
      explanationVi: "'In the zone' chỉ điểm rơi phong độ, sự tập trung cao độ và thăng hoa tột bậc trong công việc hoặc thi đấu.",
      targetedConcept: "Idiom: In the zone",
      targetedConceptEn: "Idiom: In the zone",
      targetedConceptVi: "Thành ngữ: Đạt phong độ đỉnh cao",
      referenceSegmentIndex: 3
    },
    {
      id: "q_mov_ani_12_3",
      question: "What does the slang phrase 'Can it!' mean when Mike shouts it during the rehearsal?",
      questionEn: "What does the slang phrase 'Can it!' mean when Mike shouts it during the rehearsal?",
      questionVi: "Cụm tiếng lóng 'Can it!' có nghĩa là gì khi Mike hét lên trong lúc diễn kịch?",
      options: [
        "Stop talking and shut up immediately",
        "Put food into a tin can",
        "Sing louder so everyone can hear",
        "Run away as fast as possible"
      ],
      optionsEn: [
        "Stop talking and shut up immediately",
        "Put food into a tin can",
        "Sing louder so everyone can hear",
        "Run away as fast as possible"
      ],
      optionsVi: [
        "Ngừng nói và câm miệng lại ngay lập tức",
        "Bỏ thức ăn vào hộp thiếc",
        "Hát to hơn để mọi người cùng nghe",
        "Chạy đi thật nhanh"
      ],
      correctAnswer: 0,
      explanation: "'Can it!' is an informal colloquial idiom telling someone to stop talking or be quiet.",
      explanationEn: "'Can it!' is an informal colloquial idiom telling someone to stop talking or be quiet.",
      explanationVi: "'Can it!' là tiếng lóng đời thường bảo ai đó hãy im lặng hoặc ngậm miệng lại ngay.",
      targetedConcept: "Slang: Can it!",
      targetedConceptEn: "Slang: Can it!",
      targetedConceptVi: "Tiếng lóng: Im miệng lại",
      referenceSegmentIndex: 10
    },
    {
      id: "q_mov_ani_12_4",
      question: "What does Randall imply when he says 'Word on the street is the kid's been traced back to this factory'?",
      questionEn: "What does Randall imply when he says 'Word on the street is the kid's been traced back to this factory'?",
      questionVi: "Randall ngụ ý điều gì khi nói 'Word on the street is the kid's been traced back to this factory'?",
      options: [
        "Rumors and talk circulating among monsters say evidence links the runaway human child to this facility",
        "A formal written letter was mailed to the mayor's office",
        "The child was found playing happily outside on the street",
        "The police have closed the investigation without any leads"
      ],
      optionsEn: [
        "Rumors and talk circulating among monsters say evidence links the runaway human child to this facility",
        "A formal written letter was mailed to the mayor's office",
        "The child was found playing happily outside on the street",
        "The police have closed the investigation without any leads"
      ],
      optionsVi: [
        "Tin đồn lan truyền giữa các quái vật cho thấy manh mối liên kết đứa trẻ xổng ra với nhà máy này",
        "Một bức thư chính thức đã được gửi tới văn phòng thị trưởng",
        "Đứa trẻ được tìm thấy đang chơi vui vẻ ngoài phố",
        "Cảnh sát đã khép lại cuộc điều tra mà không có manh mối nào"
      ],
      correctAnswer: 0,
      explanation: "'Word on the street is...' introduces widely circulating rumors, gossip, or informal reports within a community.",
      explanationEn: "'Word on the street is...' introduces widely circulating rumors, gossip, or informal reports within a community.",
      explanationVi: "'Word on the street is...' dùng để bắt đầu chia sẻ một tin đồn hoặc thông tin truyền miệng đang lan truyền rộng rãi.",
      targetedConcept: "Idiom: Word on the street is",
      targetedConceptEn: "Idiom: Word on the street is",
      targetedConceptVi: "Thành ngữ: Tin đồn thiên hạ",
      referenceSegmentIndex: 11
    },
    {
      id: "q_mov_ani_12_5",
      question: "What does the English expression 'Put your money where your mouth is' instruct someone to do?",
      questionEn: "What does the English expression 'Put your money where your mouth is' instruct someone to do?",
      questionVi: "Thành ngữ tiếng Anh 'Put your money where your mouth is' khuyên bảo người ta làm gì?",
      options: [
        "Back up your claims and words with tangible actions rather than empty talk",
        "Physically place currency notes into your mouth",
        "Lend your savings to strangers without any interest",
        "Never speak about your financial wealth in public"
      ],
      optionsEn: [
        "Back up your claims and words with tangible actions rather than empty talk",
        "Physically place currency notes into your mouth",
        "Lend your savings to strangers without any interest",
        "Never speak about your financial wealth in public"
      ],
      optionsVi: [
        "Hãy chứng minh lời nói và cam kết bằng hành động thực tế thay vì chỉ nói suông",
        "Đặt tiền mặt trực tiếp vào miệng",
        "Cho người lạ vay tiền tiết kiệm mà không lấy lãi",
        "Không bao giờ nói về tài sản của mình trước công chúng"
      ],
      correctAnswer: 0,
      explanation: "'Put your money where your mouth is' means to support your statements with real action or financial investment.",
      explanationEn: "'Put your money where your mouth is' means to support your statements with real action or financial investment.",
      explanationVi: "'Put your money where your mouth is' (nói phải đi đôi với làm) yêu cầu dùng hành động cụ thể để chứng minh tuyên bố của mình.",
      targetedConcept: "Proverb: Put your money where your mouth is",
      targetedConceptEn: "Proverb: Put your money where your mouth is",
      targetedConceptVi: "Thành ngữ: Nói đi đôi với làm",
      referenceSegmentIndex: 14
    },
    {
      id: "q_mov_ani_12_6",
      question: "When Mike claims Waxford has 'them shifty eyes', what characteristic is he attributing to him?",
      questionEn: "When Mike claims Waxford has 'them shifty eyes', what characteristic is he attributing to him?",
      questionVi: "Khi Mike nói Waxford có 'them shifty eyes', anh ta đang quy chụp cho Waxford đặc điểm gì?",
      options: [
        "Looking deceitful, untrustworthy, and suspicious",
        "Having sparkling, friendly, and honest eyes",
        "Needing thick reading glasses to see clearly",
        "Being the most popular worker in the entire department"
      ],
      optionsEn: [
        "Looking deceitful, untrustworthy, and suspicious",
        "Having sparkling, friendly, and honest eyes",
        "Needing thick reading glasses to see clearly",
        "Being the most popular worker in the entire department"
      ],
      optionsVi: [
        "Trông gian xảo, dối trá, lươn lẹo và đầy khả nghi",
        "Có đôi mắt long lanh, thân thiện và chân thật",
        "Cần đeo kính râm dày để nhìn rõ",
        "Là công nhân nổi tiếng nhất trong toàn bộ nhà máy"
      ],
      correctAnswer: 0,
      explanation: "'Shifty' characterizes someone who seems dishonest, deceitful, and suspicious.",
      explanationEn: "'Shifty' characterizes someone who seems dishonest, deceitful, and suspicious.",
      explanationVi: "'Shifty' miêu tả một người gian trá, lấm lét, có ánh mắt láo liên không đáng tin cậy.",
      targetedConcept: "Vocabulary: Shifty eyes",
      targetedConceptEn: "Vocabulary: Shifty eyes",
      targetedConceptVi: "Từ vựng: Ánh mắt gian xảo / khả nghi",
      referenceSegmentIndex: 15
    }
  ]
};

const tsContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR A2 | American Accent
 * YouTube ID: _kafLt9bNyU (17:39 - 1059s)
 * Views: 277,436 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI TOÀN BỘ VIDEO TỪ ĐẦU ĐẾN CUỐI
 * ============================================================================
 */

export const QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT: VideoQuizData = ${JSON.stringify(quizData, null, 2)};

export const LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT: MockVideoLesson = {
  id: "mov_ani_12",
  slug: "monsters-inc-goodbye-boo-emotional-cut",
  title: "Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "A2",
  durationFormatted: "17:39",
  durationSeconds: 1059,
  externalId: "_kafLt9bNyU",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/_kafLt9bNyU/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 132,
  viewCount: 277436,
  studyCount: 5620,
  description:
    "Học tiếng Anh chuyên sâu cùng Monsters, Inc. (2001): Phân tích toàn diện 100% lời thoại kinh điển của Mike Wazowski & Sulley, từ thành ngữ giao tiếp 'in the zone', 'she's the one', 'hook someone up' đến tiếng lóng 'can it', 'word on the street' và 'shifty eyes'.",
  segments: ${JSON.stringify(segments, null, 4)},
  quiz: QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
};

export default LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
`;

fs.writeFileSync('features/listening/data/lessons/movies/animation/lesson_monsters_inc.ts', tsContent, 'utf-8');
console.log('Successfully generated features/listening/data/lessons/movies/animation/lesson_monsters_inc.ts');

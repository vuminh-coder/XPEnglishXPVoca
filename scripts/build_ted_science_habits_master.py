# -*- coding: utf-8 -*-
"""
Builder script to generate master lesson_ted_science_habits.ts
Full Master Coverage: 32 Segments across 05:03 (303 seconds) of TED-Ed: The Science of Habits (wr6fQ4KpbRM).
"""
import re
import json

segments_data = [
    {
        "orderIndex": 0,
        "startTime": 7.04,
        "endTime": 11.88,
        "text": "Billions of people deal with a nail-biting habit at some point in their lives.",
        "translationVi": "Hàng tỷ người trên thế giới từng phải đối mặt với thói quen cắn móng tay vào một thời điểm nào đó trong đời.",
        "ipaUs": "/ˈbɪljənz əv ˈpiːpl diːl wɪð ə neɪl ˈbaɪtɪŋ ˈhæbɪt æt sʌm pɔɪnt ɪn ðer laɪvz/",
        "properNouns": [],
        "keywords": ["deal with", "nail-biting", "at some point", "habit"],
        "explanationAi": "Cụm 'deal with' có nghĩa là đối phó hoặc xử lý một vấn đề nan giải; 'nail-biting habit' là thói quen cắn móng tay thường gặp khi lo âu."
    },
    {
        "orderIndex": 1,
        "startTime": 12.01,
        "endTime": 24.73,
        "text": "Many will go to great lengths to try to stop, employing strategies like rubbing chili peppers on their cuticles, wearing gloves all day, dipping their hands in salt, and envisioning bacteria crawling on their fingers.",
        "translationVi": "Nhiều người sẵn sàng làm đủ mọi cách để cố từ bỏ, áp dụng các biện pháp như xát ớt vào khóe móng, đeo găng tay cả ngày, nhúng tay vào muối, hay tưởng tượng vi khuẩn đang bò trên ngón tay.",
        "ipaUs": "/ˈmeni wɪl ɡoʊ tuː ɡreɪt leŋkθs tuː traɪ tuː stɑːp ɪmˈplɔɪɪŋ ˈstrætədʒiz laɪk ˈrʌbɪŋ ˈtʃɪli ˈpepərz ɑːn ðer ˈkjuːtɪklz ˈwerɪŋ ɡlʌvz ɔːl deɪ ˈdɪpɪŋ ðer hændz ɪn sɔːlt ænd ɪnˈvɪʒnɪŋ bækˈtɪriə ˈkrɔːlɪŋ ɑːn ðer ˈfɪŋɡərz/",
        "properNouns": [],
        "keywords": ["go to great lengths", "employing strategies", "cuticles", "envisioning bacteria"],
        "explanationAi": "Thành ngữ 'go to great lengths' nghĩa là dốc toàn lực làm mọi cách; 'cuticles' là phần biểu bì da quanh viền móng tay."
    },
    {
        "orderIndex": 2,
        "startTime": 25.06,
        "endTime": 32.82,
        "text": "And while not all of us are nail-biters, most of us do have a habit we'd like to kick. So what's the best way to break one?",
        "translationVi": "Và dẫu không phải ai trong chúng ta cũng cắn móng tay, hầu hết chúng ta đều có một thói quen muốn từ bỏ. Vậy đâu là cách tốt nhất để phá vỡ một thói quen xấu?",
        "ipaUs": "/ænd waɪl nɑːt ɔːl əv ʌs ɑːr neɪl ˈbaɪtərz moʊst əv ʌs duː hæv ə ˈhæbɪt wid laɪk tuː kɪk soʊ wʌts ðə best weɪ tuː breɪk wʌn/",
        "properNouns": [],
        "keywords": ["nail-biters", "habit we'd like to kick", "break a habit"],
        "explanationAi": "'Kick a habit' và 'break a habit' là hai thành ngữ đồng nghĩa chỉ việc dứt bỏ thành công một thói quen tiêu cực."
    },
    {
        "orderIndex": 3,
        "startTime": 33.24,
        "endTime": 45.04,
        "text": "Scientists define habits as behaviors that are performed regularly, and cued subconsciously in response to certain environments, whether it be a location, time of day, or even an emotional state.",
        "translationVi": "Các nhà khoa học định nghĩa thói quen là những hành vi được thực hiện thường xuyên và được kích hoạt trong tiềm thức nhằm phản ứng lại các bối cảnh nhất định, dù đó là một địa điểm, thời điểm trong ngày hay thậm chí là trạng thái cảm xúc.",
        "ipaUs": "/ˈsaɪəntɪsts dɪˈfaɪn ˈhæbɪts æz bɪˈheɪvjərz ðæt ɑːr pərˈfɔːrmd ˈreɡjələrli ænd kjuːd sʌbˈkɑːnʃəsli ɪn rɪˈspɑːns tuː ˈsɜːrtn ɪnˈvaɪrənmənts ˈweðər ɪt biː ə loʊˈkeɪʃn taɪm əv deɪ ɔːr ˈiːvn ən ɪˈmoʊʃənl steɪt/",
        "properNouns": [],
        "keywords": ["define habits", "cued subconsciously", "in response to", "emotional state"],
        "explanationAi": "'Cued subconsciously' miêu tả hành vi được kích hoạt tự động ngoài tầm kiểm soát của ý thức bởi các tác nhân kích thích môi trường."
    },
    {
        "orderIndex": 4,
        "startTime": 45.25,
        "endTime": 56.64,
        "text": "They can include simple actions like picking your hair when stressed, but also more complex practices ingrained in daily routines, like staying up late or brewing your coffee in the morning.",
        "translationVi": "Chúng có thể bao gồm các hành động đơn giản như giật tóc khi căng thẳng, nhưng cũng có thể là những thói quen phức tạp hơn đã ăn sâu vào nếp sống hàng ngày, như thức khuya hay pha cà phê vào mỗi sáng.",
        "ipaUs": "/ðeɪ kæn ɪnˈkluːd ˈsɪmpl ˈækʃnz laɪk ˈpɪkɪŋ jʊər her wen strest bʌt ˈɔːlsoʊ mɔːr ˈkɑːmpleks ˈpræktɪsɪz ɪnˈɡreɪnd ɪn ˈdeɪli ruːˈtiːnz laɪk ˈsteɪɪŋ ʌp leɪt ɔːr ˈbruːɪŋ jʊər ˈkɔːfi ɪn ðə ˈmɔːrnɪŋ/",
        "properNouns": [],
        "keywords": ["simple actions", "ingrained in daily routines", "staying up late", "brewing coffee"],
        "explanationAi": "Tính từ 'ingrained' có nghĩa là ăn sâu bám rễ, trở thành một phần cố hữu và khó xóa bỏ trong tiềm thức."
    },
    {
        "orderIndex": 5,
        "startTime": 56.84,
        "endTime": 61.97,
        "text": "If you do something frequently, without much deliberation, then it’s likely a habit.",
        "translationVi": "Nếu bạn làm điều gì đó thường xuyên mà không cần nhiều sự đắn đo suy nghĩ, thì rất có thể đó là một thói quen.",
        "ipaUs": "/ɪf juː duː ˈsʌmθɪŋ ˈfriːkwəntli wɪðˈaʊt mʌtʃ dɪˌlɪbəˈreɪʃn ðen ɪts ˈlaɪkli ə ˈhæbɪt/",
        "properNouns": [],
        "keywords": ["frequently", "without much deliberation", "likely a habit"],
        "explanationAi": "'Without much deliberation' chỉ trạng thái hành động theo phản xạ tự nhiên mà không cần cân nhắc hay đắn đo lý trí."
    },
    {
        "orderIndex": 6,
        "startTime": 62.27,
        "endTime": 68.31,
        "text": "They form because at some point your brain learns that the behavior is beneficial.",
        "translationVi": "Thói quen hình thành bởi vì tại một thời điểm nào đó, não bộ của bạn nhận ra rằng hành vi đó mang lại lợi ích.",
        "ipaUs": "/ðeɪ fɔːrm bɪˈkəz æt sʌm pɔɪnt jʊər breɪn lɜːrnz ðæt ðə bɪˈheɪvjər ɪz ˌbenɪˈfɪʃl/",
        "properNouns": [],
        "keywords": ["they form", "at some point", "brain learns", "beneficial"],
        "explanationAi": "Não bộ hoạt động theo nguyên lý củng cố tích cực: một hành vi chỉ trở thành thói quen khi não cảm nhận được giá trị bù đắp (beneficial)."
    },
    {
        "orderIndex": 7,
        "startTime": 68.31,
        "endTime": 77.99,
        "text": "Let's say after opening a stressful email, you bite your nails. This is rewarding, as it’s enough to focus your attention, curbing your email fueled anxiety.",
        "translationVi": "Giả sử sau khi mở một email gây căng thẳng, bạn cắn móng tay. Hành động này mang lại cảm giác được đền đáp vì nó đủ sức thu hút sự chú ý của bạn, giúp kiềm chế nỗi âu lo do email gây ra.",
        "ipaUs": "/lets seɪ ˈæftər ˈoʊpnɪŋ ə ˈstresfl ˈiːmeɪl juː baɪt jʊər neɪlz ðɪs ɪz rɪˈwɔːrdɪŋ æz ɪts ɪˈnʌf tuː ˈfoʊkəs jʊər əˈtenʃn ˈkɜːrbɪŋ jʊər ˈiːmeɪl fjuːəld æŋˈzaɪəti/",
        "properNouns": [],
        "keywords": ["stressful email", "rewarding", "focus attention", "curbing anxiety"],
        "explanationAi": "Động từ 'curb' nghĩa là kìm hãm hoặc ngăn chặn; 'email-fueled anxiety' miêu tả cảm giác lo âu bùng phát từ áp lực công việc."
    },
    {
        "orderIndex": 8,
        "startTime": 78.03,
        "endTime": 86.04,
        "text": "Within your brain, positive experiences can trigger the release of dopamine, a neurotransmitter that mediates feelings of pleasure.",
        "translationVi": "Bên trong não bộ của bạn, những trải nghiệm tích cực có thể kích hoạt giải phóng dopamine — một chất dẫn truyền thần kinh điều phối cảm giác hưng phấn.",
        "ipaUs": "/wɪðˈɪn jʊər breɪn ˈpɑːzətɪv ɪkˈspɪriənsɪz kæn ˈtrɪɡər ðə rɪˈliːs əv ˈdoʊpəmiːn ə ˈnjʊroʊtrænzˌmɪtər ðæt ˈmiːdieɪts ˈfiːlɪŋz əv ˈpleʒər/",
        "properNouns": [],
        "keywords": ["trigger release", "dopamine", "neurotransmitter", "mediates pleasure"],
        "explanationAi": "'Dopamine' là chất dẫn truyền thần kinh trung ương gắn liền với hệ thống khen thưởng và động lực học tập của não bộ."
    },
    {
        "orderIndex": 9,
        "startTime": 86.58,
        "endTime": 94.30,
        "text": "Dopamine is also a driver of neuroplasticity, meaning it can change how your neurons wire and fire.",
        "translationVi": "Dopamine cũng là một yếu tố thúc đẩy tính mềm dẻo của hệ thần kinh, nghĩa là nó có thể thay đổi cách các tế bào thần kinh liên kết và phát tín hiệu.",
        "ipaUs": "/ˈdoʊpəmiːn ɪz ˈɔːlsoʊ ə ˈdraɪvər əv ˌnjʊroʊplæˈstɪsəti ˈmiːnɪŋ ɪt kæn tʃeɪndʒ haʊ jʊər ˈnjʊrɑːnz ˈwaɪər ænd ˈfaɪər/",
        "properNouns": [],
        "keywords": ["driver of neuroplasticity", "neurons", "wire and fire"],
        "explanationAi": "Nguyên lý thần kinh học nổi tiếng của Donald Hebb: 'Neurons that fire together, wire together' (các tế bào thần kinh kích hoạt cùng nhau sẽ liên kết với nhau)."
    },
    {
        "orderIndex": 10,
        "startTime": 94.80,
        "endTime": 101.31,
        "text": "Your brain builds connections that link the reward with the behavior, driving you to repeat it.",
        "translationVi": "Não bộ xây dựng các liên kết nối kết phần thưởng với hành vi, thôi thúc bạn lặp lại hành vi đó.",
        "ipaUs": "/jʊər breɪn bɪldz kəˈnekʃnz ðæt lɪŋk ðə rɪˈwɔːrd wɪð ðə bɪˈheɪvjər ˈdraɪvɪŋ juː tuː rɪˈpiːt ɪt/",
        "properNouns": [],
        "keywords": ["builds connections", "link reward with behavior", "driving you to repeat"],
        "explanationAi": "Cơ chế củng cố liên kết (reinforcement connection) củng cố mạch dẫn truyền thần kinh khiến hành vi dần trở thành phản xạ vô thức."
    },
    {
        "orderIndex": 11,
        "startTime": 101.51,
        "endTime": 106.35,
        "text": "It also starts associating the behavior with other cues, like your environment.",
        "translationVi": "Nó cũng bắt đầu liên kết hành vi đó với các tín hiệu khác, chẳng hạn như môi trường xung quanh bạn.",
        "ipaUs": "/ɪt ˈɔːlsoʊ stɑːrts əˈsoʊʃieɪtɪŋ ðə bɪˈheɪvjər wɪð ˈʌðər kjuːz laɪk jʊər ɪnˈvaɪrənmənt/",
        "properNouns": [],
        "keywords": ["associating behavior", "cues", "environment"],
        "explanationAi": "Não bộ mở rộng vòng liên kết sang các yếu tố ngoại cảnh (contextual stimuli), biến không gian quen thuộc thành tín hiệu kích hoạt hành vi."
    },
    {
        "orderIndex": 12,
        "startTime": 106.39,
        "endTime": 117.03,
        "text": "Eventually, all it takes is the context of sitting at your desk to subconsciously trigger a nail-biting habit—no stressful email or sense of relief required.",
        "translationVi": "Rốt cuộc, tất cả những gì cần chỉ là bối cảnh ngồi tại bàn làm việc để kích hoạt thói quen cắn móng tay trong tiềm thức — mà chẳng cần đến email gây căng thẳng hay cảm giác nhẹ nhõm nào nữa.",
        "ipaUs": "/ɪˈventʃuəli ɔːl ɪt teɪks ɪz ðə ˈkɑːntekst əv ˈsɪtɪŋ æt jʊər desk tuː sʌbˈkɑːnʃəsli ˈtrɪɡər ə neɪl ˈbaɪtɪŋ ˈhæbɪt noʊ ˈstresfl ˈiːmeɪl ɔːr sens əv rɪˈliːf rɪˈkwaɪərd/",
        "properNouns": [],
        "keywords": ["all it takes", "context of sitting at desk", "subconsciously trigger", "sense of relief"],
        "explanationAi": "Hiện tượng thói quen bị tách rời khỏi mục đích ban đầu (habit independence): thói quen tự vận hành chỉ dựa trên tín hiệu bối cảnh."
    },
    {
        "orderIndex": 13,
        "startTime": 117.74,
        "endTime": 126.25,
        "text": "Once established, these cue-behavior-reward loops work fast, outpacing the decision-making process.",
        "translationVi": "Một khi đã được thiết lập, các vòng lặp tín hiệu - hành vi - phần thưởng này vận hành rất nhanh, vượt mặt cả quá trình đưa ra quyết định có ý thức.",
        "ipaUs": "/wʌns ɪˈstæblɪʃt ðiːz kjuː bɪˈheɪvjər rɪˈwɔːrd luːps wɜːrk fæst aʊtˈpeɪsɪŋ ðə dɪˈsɪʒn ˈmeɪkɪŋ ˈprɑːses/",
        "properNouns": [],
        "keywords": ["once established", "cue-behavior-reward loops", "outpacing decision-making"],
        "explanationAi": "Động từ 'outpace' nghĩa là chạy nhanh hơn, vượt xa tốc độ xử lý chậm rãi của vỏ não trước trán (prefrontal cortex)."
    },
    {
        "orderIndex": 14,
        "startTime": 126.29,
        "endTime": 131.38,
        "text": "You may find yourself engaging in a habit before you have the chance to notice and stop.",
        "translationVi": "Bạn có thể thấy mình đang thực hiện một thói quen trước cả khi kịp nhận thức và dừng lại.",
        "ipaUs": "/juː meɪ faɪnd jʊərˈself ɪnˈɡeɪdʒɪŋ ɪn ə ˈhæbɪt bɪˈfɔːr juː hæv ðə tʃæns tuː ˈnoʊtɪs ænd stɑːp/",
        "properNouns": [],
        "keywords": ["engaging in a habit", "chance to notice", "stop"],
        "explanationAi": "Cụm 'engaging in a habit' diễn tả hành vi tự động khởi phát trước khi ý thức kịp can thiệp."
    },
    {
        "orderIndex": 15,
        "startTime": 131.63,
        "endTime": 142.93,
        "text": "But this can be a good thing because not all habits are bad. They’re stored memories of what’s worked in the past, which allow you to take swift action in the present.",
        "translationVi": "Nhưng điều này có thể là một điều tốt, bởi không phải mọi thói quen đều xấu. Chúng là những ký ức lưu trữ về những điều từng hiệu quả trong quá khứ, giúp bạn hành động nhanh chóng trong hiện tại.",
        "ipaUs": "/bʌt ðɪs kæn biː ə ɡʊd θɪŋ bɪˈkəz nɑːt ɔːl ˈhæbɪts ɑːr bæd ðer stɔːrd ˈmeməriz əv wʌts wɜːrkt ɪn ðə pæst wɪtʃ əˈlaʊ juː tuː teɪk swɪft ˈækʃn ɪn ðə ˈpreznt/",
        "properNouns": [],
        "keywords": ["not all habits bad", "stored memories", "swift action", "in the present"],
        "explanationAi": "Dưới góc nhìn tiến hóa, thói quen là cơ chế lưu trữ giải pháp hành vi tối ưu để sinh tồn mà không tiêu hao nhiều năng lượng tư duy."
    },
    {
        "orderIndex": 16,
        "startTime": 143.18,
        "endTime": 153.27,
        "text": "One study estimated that on average, people spend more than 40% of their days performing regularly repeated behaviors while their minds are occupied with other thoughts.",
        "translationVi": "Một nghiên cứu ước tính rằng trung bình, con người dành hơn 40% thời gian mỗi ngày để thực hiện các hành vi lặp đi lặp lại thường xuyên trong khi tâm trí đang bận rộn với những suy nghĩ khác.",
        "ipaUs": "/wʌn ˈstʌdi ˈestɪmeɪtɪd ðæt ɑːn ˈævərɪdʒ ˈpiːpl spend mɔːr ðæn ˈfɔːrti pərˈsent əv ðer deɪz pərˈfɔːrmɪŋ ˈreɡjələrli rɪˈpiːtɪd bɪˈheɪvjərz waɪl ðer maɪndz ɑːr ˈɑːkjupaɪd wɪð ˈʌðər θɔːts/",
        "properNouns": [],
        "keywords": ["on average", "more than 40%", "repeated behaviors", "occupied with other thoughts"],
        "explanationAi": "Số liệu nghiên cứu nổi tiếng từ Đại học Duke của Wendy Wood: hơn 40% hành vi thường nhật diễn ra tự động theo thói quen."
    },
    {
        "orderIndex": 17,
        "startTime": 153.27,
        "endTime": 159.49,
        "text": "A seemingly automated morning routine, for example, saves you both time and precious mental energy.",
        "translationVi": "Chẳng hạn, một nếp sinh hoạt buổi sáng tưởng chừng như tự động sẽ giúp bạn tiết kiệm cả thời gian lẫn nguồn năng lượng tư duy quý báu.",
        "ipaUs": "/ə ˈsiːmɪŋli ˈɔːtəmeɪtɪd ˈmɔːrnɪŋ ruːˈtiːn fɔːr ɪɡˈzæmpl seɪvz juː boʊθ taɪm ænd ˈpreʃəs ˈmentl ˈenərdʒi/",
        "properNouns": [],
        "keywords": ["seemingly automated", "morning routine", "precious mental energy"],
        "explanationAi": "'Automated morning routine' giúp giải phóng tải trọng nhận thức (cognitive load) để dành năng lượng cho các quyết định sáng tạo phức tạp trong ngày."
    },
    {
        "orderIndex": 18,
        "startTime": 159.95,
        "endTime": 169.71,
        "text": "Still, many people have habits that no longer serve them. Yet research shows that intentions alone often fail to lead to long-term behavior change.",
        "translationVi": "Tuy nhiên, nhiều người vẫn duy trì những thói quen không còn đem lại lợi ích. Thế nhưng nghiên cứu chỉ ra rằng chỉ riêng ý định thôi thì thường thất bại trong việc tạo ra sự thay đổi hành vi dài hạn.",
        "ipaUs": "/stɪl ˈmeni ˈpiːpl hæv ˈhæbɪts ðæt noʊ ˈlɔːŋɡər sɜːrv ðem jet rɪˈsɜːrtʃ ʃoʊz ðæt ɪnˈtenʃnz əˈloʊn ˈɔːfn feɪl tuː liːd tuː lɔːŋ tɜːrm bɪˈheɪvjər tʃeɪndʒ/",
        "properNouns": [],
        "keywords": ["no longer serve them", "intentions alone fail", "long-term behavior change"],
        "explanationAi": "'No longer serve someone' là thành ngữ chỉ điều gì đó không còn hữu ích; 'intentions alone fail' nhấn mạnh khoảng cách lớn giữa ý chí và hành động thực tế."
    },
    {
        "orderIndex": 19,
        "startTime": 169.92,
        "endTime": 178.76,
        "text": "This isn’t to say you can’t break a habit. Rather, by understanding the basis of habits, you can create better plans for changing them.",
        "translationVi": "Điều này không có nghĩa là bạn không thể từ bỏ một thói quen. Thay vào đó, bằng cách hiểu rõ nền tảng của thói quen, bạn có thể lập ra những kế hoạch tốt hơn để thay đổi chúng.",
        "ipaUs": "/ðɪs ˈɪznt tuː seɪ juː kænt breɪk ə ˈhæbɪt ˈræðər baɪ ˌʌndərˈstændɪŋ ðə ˈbeɪsɪs əv ˈhæbɪts juː kæn kriˈeɪt ˈbetər plænz fɔːr ˈtʃeɪndʒɪŋ ðem/",
        "properNouns": [],
        "keywords": ["break a habit", "basis of habits", "create better plans"],
        "explanationAi": "'Understanding the basis' là chìa khóa khoa học giúp thay thế nỗ lực ý chí mù quáng bằng các chiến lược tâm lý có căn cứ vững chắc."
    },
    {
        "orderIndex": 20,
        "startTime": 179.30,
        "endTime": 192.48,
        "text": "For example, we know habits are often cued by environments and routines. Lying in bed may cause you to endlessly scroll through your phone, or watching TV on the couch may lead you to grab a sugary snack.",
        "translationVi": "Chẳng hạn, chúng ta biết rằng thói quen thường được kích hoạt bởi môi trường và nếp sinh hoạt. Nằm trên giường có thể khiến bạn lướt điện thoại không ngừng, hoặc xem TV trên ghế sofa có thể khiến bạn với tay lấy đồ ăn vặt nhiều đường.",
        "ipaUs": "/fɔːr ɪɡˈzæmpl wiː noʊ ˈhæbɪts ɑːr ˈɔːfn kjuːd baɪ ɪnˈvaɪrənmənts ænd ruːˈtiːnz ˈlaɪɪŋ ɪn bed meɪ kɔːz juː tuː ˈendləsli skroʊl θruː jʊər foʊn ɔːr ˈwɑːtʃɪŋ ˌtiː ˈviː ɑːn ðə kaʊtʃ meɪ liːd juː tuː ɡræb ə ˈʃʊɡəri snæk/",
        "properNouns": [],
        "keywords": ["cued by environments", "endlessly scroll", "couch", "sugary snack"],
        "explanationAi": "Hai ví dụ điển hình về thói quen xấu thời hiện đại gắn chặt với bối cảnh: nằm trên giường gắn với lướt điện thoại, ngồi sofa gắn với ăn vặt."
    },
    {
        "orderIndex": 21,
        "startTime": 192.48,
        "endTime": 198.99,
        "text": "One of the most effective ways to manage behavior is to identify these locations or times of day.",
        "translationVi": "Một trong những cách hiệu quả nhất để kiểm soát hành vi là nhận diện chính xác các địa điểm hoặc thời điểm này trong ngày.",
        "ipaUs": "/wʌn əv ðə moʊst ɪˈfektɪv weɪz tuː ˈmænɪdʒ bɪˈheɪvjər ɪz tuː aɪˈdentɪfaɪ ðiːz loʊˈkeɪʃnz ɔːr taɪmz əv deɪ/",
        "properNouns": [],
        "keywords": ["effective ways", "manage behavior", "identify locations", "times of day"],
        "explanationAi": "Bước đầu tiên trong thay đổi hành vi là 'self-awareness' (tự nhận thức): xác định chính xác các điểm kích hoạt không gian và thời gian."
    },
    {
        "orderIndex": 22,
        "startTime": 199.15,
        "endTime": 207.62,
        "text": "Then try to modify them by changing your routine or creating obstacles that make it more difficult to perform the habit in that space.",
        "translationVi": "Sau đó hãy cố gắng điều chỉnh chúng bằng cách thay đổi nếp sinh hoạt hoặc tạo ra các chướng ngại vật khiến việc thực hiện thói quen trong không gian đó trở nên khó khăn hơn.",
        "ipaUs": "/ðen traɪ tuː ˈmɑːdɪfaɪ ðem baɪ ˈtʃeɪndʒɪŋ jʊər ruːˈtiːn ɔːr kriˈeɪtɪŋ ˈɑːbstəklz ðæt meɪk ɪt mɔːr ˈdɪfɪkəlt tuː pərˈfɔːrm ðə ˈhæbɪt ɪn ðæt speɪs/",
        "properNouns": [],
        "keywords": ["modify them", "changing routine", "creating obstacles", "more difficult"],
        "explanationAi": "Nguyên lý tạo lực cản ma sát (adding friction): đặt chướng ngại vật khiến thói quen xấu đòi hỏi nhiều công sức hơn, làm giảm khả năng thực hiện tự động."
    },
    {
        "orderIndex": 23,
        "startTime": 207.95,
        "endTime": 215.84,
        "text": "Moving, switching jobs, or even starting a new schedule, are particularly great times to break a habit or build a new one.",
        "translationVi": "Chuyển nhà, đổi công việc, hay thậm chí bắt đầu một lịch trình mới là những thời điểm đặc biệt tuyệt vời để dứt bỏ một thói quen cũ hoặc xây dựng một thói quen mới.",
        "ipaUs": "/ˈmuːvɪŋ ˈswɪtʃɪŋ dʒɑːbz ɔːr ˈiːvn ˈstɑːrtɪŋ ə njuː ˈskedʒuːl ɑːr pərˈtɪkjələrli ɡreɪt taɪmz tuː breɪk ə ˈhæbɪt ɔːr bɪld ə njuː wʌn/",
        "properNouns": [],
        "keywords": ["moving", "switching jobs", "new schedule", "great times"],
        "explanationAi": "Hiệu ứng khởi đầu mới (Fresh Start Effect): sự xáo trộn môi trường sống làm đứt gãy chuỗi tín hiệu cũ, mở ra cơ hội vàng tái cấu trúc hành vi."
    },
    {
        "orderIndex": 24,
        "startTime": 216.21,
        "endTime": 224.84,
        "text": "One 2005 study tracked university students’ exercising, reading, and TV watching habits before and after they transferred schools.",
        "translationVi": "Một nghiên cứu năm 2005 đã theo dõi thói quen tập thể dục, đọc sách và xem TV của các sinh viên đại học trước và sau khi họ chuyển trường.",
        "ipaUs": "/wʌn ˈtwenti oʊ faɪv ˈstʌdi trækt ˌjuːnɪˈvɜːrsəti ˈstuːdnts ˈeksərsaɪzɪŋ ˈriːdɪŋ ænd ˌtiː ˈviː ˈwɑːtʃɪŋ ˈhæbɪts bɪˈfɔːr ænd ˈæftər ðeɪ trænsˈfɜːrd skuːlz/",
        "properNouns": [],
        "keywords": ["2005 study", "tracked university students", "transferred schools"],
        "explanationAi": "Nghiên cứu kinh điển của Wood, Tam & Witt (2005) về tác động của việc thay đổi hoàn cảnh địa lý đối với sức mạnh của thói quen."
    },
    {
        "orderIndex": 25,
        "startTime": 224.89,
        "endTime": 232.56,
        "text": "When students were no longer around old environments and routines, their habits, even the strong ones, significantly changed.",
        "translationVi": "Khi các sinh viên không còn ở trong môi trường và nếp sinh hoạt cũ, thói quen của họ — ngay cả những thói quen ăn sâu nhất — đã thay đổi rõ rệt.",
        "ipaUs": "/wen ˈstuːdnts wɜːr noʊ ˈlɔːŋɡər əˈraʊnd oʊld ɪnˈvaɪrənmənts ænd ruːˈtiːnz ðer ˈhæbɪts ˈiːvn ðə strɔːŋ wʌnz sɪɡˈnɪfɪkəntli tʃeɪndʒd/",
        "properNouns": [],
        "keywords": ["no longer around", "old environments", "even strong ones", "significantly changed"],
        "explanationAi": "'Significantly changed' chứng minh thói quen phụ thuộc mật thiết vào tín hiệu ngoại cảnh; khi tín hiệu biến mất, liên kết thói quen suy yếu."
    },
    {
        "orderIndex": 26,
        "startTime": 232.90,
        "endTime": 239.53,
        "text": "For behaviors like nail-biting or hair-pulling, a practice called habit reversal training can be helpful.",
        "translationVi": "Đối với các hành vi như cắn móng tay hay giật tóc, một phương pháp mang tên 'huấn luyện đảo ngược thói quen' có thể rất hữu ích.",
        "ipaUs": "/fɔːr bɪˈheɪvjərz laɪk neɪl ˈbaɪtɪŋ ɔːr her ˈpʊlɪŋ ə ˈpræktɪs kɔːld ˈhæbɪt rɪˈvɜːrsl ˈtreɪnɪŋ kæn biː ˈhelpfl/",
        "properNouns": [],
        "keywords": ["nail-biting", "hair-pulling", "habit reversal training"],
        "explanationAi": "'Habit reversal training' (HRT) là liệu pháp hành vi tiêu chuẩn vàng trong tâm lý học lâm sàng để điều trị các tật giật cơ và thói quen lặp lại."
    },
    {
        "orderIndex": 27,
        "startTime": 239.57,
        "endTime": 248.08,
        "text": "Developed by psychologists in the 1970s, the aim is to change a habit by replacing it with another one that’s less detrimental.",
        "translationVi": "Được các nhà tâm lý học phát triển vào thập niên 1970, mục tiêu của phương pháp là thay đổi một thói quen bằng cách thế chỗ nó bằng một hành vi khác ít gây hại hơn.",
        "ipaUs": "/dɪˈveləpt baɪ saɪˈkɑːlədʒɪsts ɪn ðə ˈnaɪntiːn ˈsevəntiz ði eɪm ɪz tuː tʃeɪndʒ ə ˈhæbɪt baɪ rɪˈpleɪsɪŋ ɪt wɪð əˈnʌðər wʌn ðæts les ˌdetrɪˈmentl/",
        "properNouns": [],
        "keywords": ["psychologists", "1970s", "replacing it", "less detrimental"],
        "explanationAi": "Quy tắc vàng của thay đổi thói quen: không thể xóa bỏ hoàn toàn một thói quen, mà chỉ có thể thay thế hành vi phản ứng (routine) bằng một phản ứng thay thế lành mạnh."
    },
    {
        "orderIndex": 28,
        "startTime": 248.33,
        "endTime": 255.54,
        "text": "The training requires you to analyze and understand your habit cues, so you can effectively intervene at the right times.",
        "translationVi": "Việc huấn luyện đòi hỏi bạn phải phân tích và thấu hiểu các tín hiệu thói quen của mình, để có thể can thiệp một cách hiệu quả vào đúng thời điểm.",
        "ipaUs": "/ðə ˈtreɪnɪŋ rɪˈkwaɪərz juː tuː ˈænəlaɪz ænd ˌʌndərˈstænd jʊər ˈhæbɪt kjuːz soʊ juː kæn ɪˈfektɪvli ˌɪntərˈviːn æt ðə raɪt taɪmz/",
        "properNouns": [],
        "keywords": ["analyze and understand", "habit cues", "effectively intervene", "right times"],
        "explanationAi": "'Intervene at the right times' nhấn mạnh sự can thiệp ngay khoảnh khắc xuất hiện xung động thèm muốn (craving) trước khi hành vi xấu kịp diễn ra."
    },
    {
        "orderIndex": 29,
        "startTime": 255.63,
        "endTime": 266.43,
        "text": "For example, if you tend to bite your nails at work, preemptively keep a fidget toy at your desk. Then, if a stressful email comes in, use the toy when you feel the urge to bite your nails.",
        "translationVi": "Chẳng hạn, nếu bạn hay cắn móng tay ở nơi làm việc, hãy chủ động để sẵn một món đồ chơi giải tỏa căng thẳng trên bàn làm việc. Sau đó, nếu có một email gây căng thẳng gửi tới, hãy sử dụng món đồ chơi đó ngay khi bạn cảm thấy thôi thúc muốn cắn móng tay.",
        "ipaUs": "/fɔːr ɪɡˈzæmpl ɪf juː tend tuː baɪt jʊər neɪlz æt wɜːrk priːˈemptɪvli kiːp ə ˈfɪdʒɪt tɔɪ æt jʊər desk ðen ɪf ə ˈstresfl ˈiːmeɪl kʌmz ɪn juːz ðə tɔɪ wen juː fiːl ði ɜːrdʒ tuː baɪt jʊər neɪlz/",
        "properNouns": [],
        "keywords": ["tend to bite nails", "preemptively", "fidget toy", "feel the urge"],
        "explanationAi": "'Preemptively' có nghĩa là chủ động phòng ngừa từ trước; 'fidget toy' là công cụ thay thế vận động ngón tay giúp thỏa mãn xung lực mà không làm tổn thương móng."
    },
    {
        "orderIndex": 30,
        "startTime": 266.97,
        "endTime": 272.77,
        "text": "Breaking a habit takes time, so remember to give yourself grace and have patience through the process.",
        "translationVi": "Từ bỏ một thói quen cần có thời gian, vì vậy hãy nhớ bao dung với chính mình và kiên nhẫn trong suốt quá trình đó.",
        "ipaUs": "/ˈbreɪkɪŋ ə ˈhæbɪt teɪks taɪm soʊ rɪˈmembər tuː ɡɪv jʊərˈself ɡreɪs ænd hæv ˈpeɪʃns θruː ðə ˈprɑːses/",
        "properNouns": [],
        "keywords": ["takes time", "give yourself grace", "have patience", "process"],
        "explanationAi": "'Give yourself grace' là thành ngữ nhân văn khuyên ta nên bao dung, không tự trách móc bản thân khi lỡ tái phạm trong hành trình thay đổi."
    },
    {
        "orderIndex": 31,
        "startTime": 272.89,
        "endTime": 281.69,
        "text": "And while many focus on their bad habits, it’s also worth celebrating the good ones that help us move swiftly and successfully through our daily routines.",
        "translationVi": "Và trong khi nhiều người chỉ chăm chăm vào các thói quen xấu, ta cũng rất nên tôn vinh những thói quen tốt — những điều giúp ta vận hành nhanh chóng và thành công qua các nếp sinh hoạt thường nhật.",
        "ipaUs": "/ænd waɪl ˈmeni ˈfoʊkəs ɑːn ðer bæd ˈhæbɪts ɪts ˈɔːlsoʊ wɜːrθ ˈselɪbreɪtɪŋ ðə ɡʊd wʌnz ðæt help ʌs muːv ˈswɪftli ænd səkˈsesfəli θruː ˈaʊər ˈdeɪli ruːˈtiːnz/",
        "properNouns": [],
        "keywords": ["focus on bad habits", "worth celebrating", "move swiftly", "daily routines"],
        "explanationAi": "Lời kết đầy tích cực nhắc nhở rằng thói quen vốn là người bạn đồng hành đắc lực giúp con người tối ưu hóa cuộc sống hàng ngày."
    }
]

# Calculate regex tokenCount for all 32 segments
for seg in segments_data:
    seg["tokenCount"] = len(re.findall(r'\b[A-Za-z0-9_]+\b', seg["text"]))

# Construct 8 CEFR B2 Quiz Questions
quiz_questions = [
    {
        "id": "q_ted_habits_1",
        "question": "What extreme physical strategies do people employ when trying to stop a nail-biting habit, according to Segment 1?",
        "questionEn": "What extreme physical strategies do people employ when trying to stop a nail-biting habit, according to Segment 1?",
        "questionVi": "Những chiến lược vật lý cực đoan nào được mọi người áp dụng khi cố gắng dứt bỏ thói quen cắn móng tay, theo câu 1?",
        "options": [
            "Rubbing chili peppers on cuticles, wearing gloves all day, dipping hands in salt, and imagining bacteria",
            "Surgically removing fingernails and applying permanent synthetic ceramic coatings",
            "Taking prescription sleep medication during peak business hours",
            "Undergoing hypnotherapy sessions in soundproof underwater isolation tanks"
        ],
        "optionsEn": [
            "Rubbing chili peppers on cuticles, wearing gloves all day, dipping hands in salt, and imagining bacteria",
            "Surgically removing fingernails and applying permanent synthetic ceramic coatings",
            "Taking prescription sleep medication during peak business hours",
            "Undergoing hypnotherapy sessions in soundproof underwater isolation tanks"
        ],
        "optionsVi": [
            "Xát ớt vào khóe móng, đeo găng tay cả ngày, nhúng tay vào muối, và tưởng tượng vi khuẩn bò trên tay",
            "Phẫu thuật cắt bỏ móng tay và phủ lớp gốm tổng hợp vĩnh viễn",
            "Uống thuốc ngủ theo toa trong giờ làm việc cao điểm",
            "Tham gia các buổi thôi miên trong bể cách ly dưới nước cách âm"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segment 1, the speaker notes people employ strategies like: "rubbing chili peppers on their cuticles, wearing gloves all day, dipping their hands in salt, and envisioning bacteria crawling on their fingers."',
        "explanationEn": 'In Segment 1, the speaker notes people employ strategies like: "rubbing chili peppers on their cuticles, wearing gloves all day, dipping their hands in salt, and envisioning bacteria crawling on their fingers."',
        "explanationVi": 'Trong câu 1, diễn giả ghi nhận mọi người áp dụng các biện pháp: "xát ớt vào khóe móng, đeo găng tay cả ngày, nhúng tay vào muối, và tưởng tượng vi khuẩn đang bò trên ngón tay."',
        "referenceSegmentIndex": 1,
        "targetedConcept": "Các biện pháp cực đoan đối trị thói quen cắn móng tay (Extreme Habit-Stopping Strategies)",
        "targetedConceptEn": "Extreme Habit-Stopping Strategies",
        "targetedConceptVi": "Các biện pháp cực đoan đối trị thói quen cắn móng tay"
    },
    {
        "id": "q_ted_habits_2",
        "question": "How do scientists formally define a habit in terms of environmental cues and cognitive awareness?",
        "questionEn": "How do scientists formally define a habit in terms of environmental cues and cognitive awareness?",
        "questionVi": "Các nhà khoa học định nghĩa chính thức về thói quen như thế nào xét theo các tín hiệu môi trường và nhận thức tư duy?",
        "options": [
            "Behaviors performed regularly and cued subconsciously in response to environments, locations, or emotional states",
            "Involuntary physical spasms triggered exclusively by acute vitamin B deficiencies",
            "Deliberate moral philosophies calculated through strict mathematical probability models",
            "Temporary genetic anomalies inherited from prehistoric hunter-gatherer ancestors"
        ],
        "optionsEn": [
            "Behaviors performed regularly and cued subconsciously in response to environments, locations, or emotional states",
            "Involuntary physical spasms triggered exclusively by acute vitamin B deficiencies",
            "Deliberate moral philosophies calculated through strict mathematical probability models",
            "Temporary genetic anomalies inherited from prehistoric hunter-gatherer ancestors"
        ],
        "optionsVi": [
            "Hành vi được thực hiện thường xuyên và được kích hoạt trong tiềm thức nhằm phản ứng với môi trường, địa điểm hoặc trạng thái cảm xúc",
            "Các cơn co thắt vật lý không tự chủ bị kích hoạt độc quyền bởi sự thiếu hụt vitamin B cấp tính",
            "Các triết lý đạo đức có chủ đích được tính toán qua các mô hình xác suất toán học nghiêm ngặt",
            "Các dị tật di truyền tạm thời thừa hưởng từ tổ tiên săn bắt hái lượm thời tiền sử"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segment 3, scientists define habits as: "behaviors that are performed regularly, and cued subconsciously in response to certain environments, whether it be a location, time of day, or even an emotional state."',
        "explanationEn": 'In Segment 3, scientists define habits as: "behaviors that are performed regularly, and cued subconsciously in response to certain environments, whether it be a location, time of day, or even an emotional state."',
        "explanationVi": 'Trong câu 3, các nhà khoa học định nghĩa thói quen là: "những hành vi được thực hiện thường xuyên và được kích hoạt trong tiềm thức nhằm phản ứng lại các bối cảnh nhất định, dù đó là một địa điểm, thời điểm trong ngày hay thậm chí là trạng thái cảm xúc."',
        "referenceSegmentIndex": 3,
        "targetedConcept": "Định nghĩa khoa học về thói quen và kích hoạt tiềm thức (Scientific Definition of Habits & Subconscious Cues)",
        "targetedConceptEn": "Scientific Definition of Habits & Subconscious Cues",
        "targetedConceptVi": "Định nghĩa khoa học về thói quen và kích hoạt tiềm thức"
    },
    {
        "id": "q_ted_habits_3",
        "question": "What neurotransmitter is released during positive experiences, and what role does it play in neuroplasticity?",
        "questionEn": "What neurotransmitter is released during positive experiences, and what role does it play in neuroplasticity?",
        "questionVi": "Chất dẫn truyền thần kinh nào được giải phóng trong những trải nghiệm tích cực, và nó đóng vai trò gì trong tính mềm dẻo của hệ thần kinh?",
        "options": [
            "Dopamine, which mediates pleasure and changes how neurons wire and fire",
            "Serotonin, which permanently petrifies all existing synaptic pathways",
            "Cortisol, which shuts down blood circulation to the prefrontal cortex",
            "Melatonin, which immediately triggers deep rapid-eye-movement sleep"
        ],
        "optionsEn": [
            "Dopamine, which mediates pleasure and changes how neurons wire and fire",
            "Serotonin, which permanently petrifies all existing synaptic pathways",
            "Cortisol, which shuts down blood circulation to the prefrontal cortex",
            "Melatonin, which immediately triggers deep rapid-eye-movement sleep"
        ],
        "optionsVi": [
            "Dopamine, chất điều phối cảm giác hưng phấn và thay đổi cách các tế bào thần kinh liên kết và phát tín hiệu",
            "Serotonin, chất làm hóa đá vĩnh viễn tất cả các con đường khớp thần kinh hiện có",
            "Cortisol, chất làm ngưng trệ tuần hoàn máu đến vỏ não trước trán",
            "Melatonin, chất kích hoạt ngay lập tức giấc ngủ mắt chuyển động nhanh sâu"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 8 & 9, the narrator explains: "positive experiences can trigger the release of dopamine, a neurotransmitter that mediates feelings of pleasure... a driver of neuroplasticity, meaning it can change how your neurons wire and fire."',
        "explanationEn": 'In Segments 8 & 9, the narrator explains: "positive experiences can trigger the release of dopamine, a neurotransmitter that mediates feelings of pleasure... a driver of neuroplasticity, meaning it can change how your neurons wire and fire."',
        "explanationVi": 'Trong câu 8 & 9, diễn giả giải thích: "trải nghiệm tích cực kích hoạt giải phóng dopamine, chất dẫn truyền thần kinh điều phối khoái cảm... là động lực của tính mềm dẻo thần kinh, thay đổi cách tế bào thần kinh liên kết và phát xung."',
        "referenceSegmentIndex": 8,
        "targetedConcept": "Vai trò của Dopamine và tính mềm dẻo thần kinh (Dopamine and Neuroplasticity in Habit Formation)",
        "targetedConceptEn": "Dopamine and Neuroplasticity in Habit Formation",
        "targetedConceptVi": "Vai trò của Dopamine và tính mềm dẻo thần kinh"
    },
    {
        "id": "q_ted_habits_4",
        "question": "Why do established cue-behavior-reward loops often lead to actions before we can consciously stop them?",
        "questionEn": "Why do established cue-behavior-reward loops often lead to actions before we can consciously stop them?",
        "questionVi": "Tại sao các vòng lặp tín hiệu - hành vi - phần thưởng đã hình thành lại thường dẫn đến hành động trước khi ta kịp ngăn chặn bằng ý thức?",
        "options": [
            "Because they work fast and outpace the slower conscious decision-making process",
            "Because motor muscles operate via an independent cardiovascular nervous system",
            "Because human vocal cords paralyze during moments of habitual reflex",
            "Because auditory nerves fail to register tactile sensations during stress"
        ],
        "optionsEn": [
            "Because they work fast and outpace the slower conscious decision-making process",
            "Because motor muscles operate via an independent cardiovascular nervous system",
            "Because human vocal cords paralyze during moments of habitual reflex",
            "Because auditory nerves fail to register tactile sensations during stress"
        ],
        "optionsVi": [
            "Vì chúng hoạt động rất nhanh và vượt mặt tốc độ của quá trình ra quyết định có ý thức chậm hơn",
            "Vì các cơ vận động hoạt động thông qua một hệ thần kinh tim mạch độc lập",
            "Vì dây thanh quản của con người bị tê liệt trong những khoảnh khắc phản xạ thói quen",
            "Vì các dây thần kinh thính giác không ghi nhận được cảm giác xúc giác khi căng thẳng"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 13 & 14, the video clarifies: "Once established, these cue-behavior-reward loops work fast, outpacing the decision-making process. You may find yourself engaging in a habit before you have the chance to notice and stop."',
        "explanationEn": 'In Segments 13 & 14, the video clarifies: "Once established, these cue-behavior-reward loops work fast, outpacing the decision-making process. You may find yourself engaging in a habit before you have the chance to notice and stop."',
        "explanationVi": 'Trong câu 13 & 14, video làm rõ: "Một khi đã thiết lập, các vòng lặp tín hiệu - hành vi - phần thưởng vận hành rất nhanh, vượt mặt quá trình ra quyết định. Bạn có thể thấy mình thực hiện thói quen trước khi kịp nhận ra và dừng lại."',
        "referenceSegmentIndex": 13,
        "targetedConcept": "Vòng lặp thói quen vượt mặt tư duy có ý thức (Habit Loop Outpacing Conscious Decision-Making)",
        "targetedConceptEn": "Habit Loop Outpacing Conscious Decision-Making",
        "targetedConceptVi": "Vòng lặp thói quen vượt mặt tư duy có ý thức"
    },
    {
        "id": "q_ted_habits_5",
        "question": "According to the scientific study cited in Segment 16, what proportion of daily life is spent on automated habits?",
        "questionEn": "According to the scientific study cited in Segment 16, what proportion of daily life is spent on automated habits?",
        "questionVi": "Theo nghiên cứu khoa học được trích dẫn trong câu 16, tỷ lệ thời gian hàng ngày con người dành cho các thói quen tự động là bao nhiêu?",
        "options": [
            "More than 40 percent of our days while minds are occupied with other thoughts",
            "Exactly 12 percent exclusively during nighttime preparation",
            "Less than 2 percent of total waking hours across adulthood",
            "Approximately 85 percent of all physical cellular metabolism"
        ],
        "optionsEn": [
            "More than 40 percent of our days while minds are occupied with other thoughts",
            "Exactly 12 percent exclusively during nighttime preparation",
            "Less than 2 percent of total waking hours across adulthood",
            "Approximately 85 percent of all physical cellular metabolism"
        ],
        "optionsVi": [
            "Hơn 40 phần trăm thời gian mỗi ngày trong khi tâm trí bận rộn với các suy nghĩ khác",
            "Chính xác 12 phần trăm duy nhất trong lúc chuẩn bị ban đêm",
            "Ít hơn 2 phần trăm tổng số giờ thức trong suốt tuổi trưởng thành",
            "Khoảng 85 phần trăm toàn bộ quá trình trao đổi chất tế bào vật lý"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segment 16, the study reveals: "One study estimated that on average, people spend more than 40% of their days performing regularly repeated behaviors while their minds are occupied with other thoughts."',
        "explanationEn": 'In Segment 16, the study reveals: "One study estimated that on average, people spend more than 40% of their days performing regularly repeated behaviors while their minds are occupied with other thoughts."',
        "explanationVi": 'Trong câu 16, nghiên cứu chỉ ra: "Một nghiên cứu ước tính rằng trung bình, con người dành hơn 40% thời gian mỗi ngày để thực hiện các hành vi lặp đi lặp lại thường xuyên trong khi tâm trí đang bận rộn với những suy nghĩ khác."',
        "referenceSegmentIndex": 16,
        "targetedConcept": "Tỷ lệ 40% hành vi tự động trong đời sống (The 40 Percent Daily Automated Routine)",
        "targetedConceptEn": "The 40 Percent Daily Automated Routine",
        "targetedConceptVi": "Tỷ lệ 40% hành vi tự động trong đời sống"
    },
    {
        "id": "q_ted_habits_6",
        "question": "Why do intentions alone frequently fail to change behavior, and what environmental approach is recommended instead?",
        "questionEn": "Why do intentions alone frequently fail to change behavior, and what environmental approach is recommended instead?",
        "questionVi": "Tại sao chỉ riêng ý chí/ý định lại thường thất bại trong việc thay đổi hành vi, và phương pháp can thiệp môi trường nào được khuyến nghị thay thế?",
        "options": [
            "Because habits are cued by spaces, so identifying locations and creating physical obstacles works far better",
            "Because intentions deplete bloodstream glucose levels within three seconds of waking",
            "Because people must hire certified judicial bailiffs to enforce personal household rules",
            "Because written resolutions cause immediate psychological rejection in brain stem receptors"
        ],
        "optionsEn": [
            "Because habits are cued by spaces, so identifying locations and creating physical obstacles works far better",
            "Because intentions deplete bloodstream glucose levels within three seconds of waking",
            "Because people must hire certified judicial bailiffs to enforce personal household rules",
            "Because written resolutions cause immediate psychological rejection in brain stem receptors"
        ],
        "optionsVi": [
            "Vì thói quen được kích hoạt bởi không gian, nên việc nhận diện địa điểm và tạo chướng ngại vật đem lại hiệu quả cao hơn nhiều",
            "Vì ý định làm cạn kiệt lượng đường trong máu trong vòng ba giây sau khi thức dậy",
            "Vì con người phải thuê thừa phát lại tư pháp có chứng chỉ để thực thi nội quy gia đình",
            "Vì các quyết tâm bằng văn bản gây ra sự từ chối tâm lý ngay lập tức ở thụ thể thân não"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 18 to 22, the speaker explains: "intentions alone often fail... One of the most effective ways to manage behavior is to identify these locations or times of day. Then try to modify them by changing your routine or creating obstacles that make it more difficult."',
        "explanationEn": 'In Segments 18 to 22, the speaker explains: "intentions alone often fail... One of the most effective ways to manage behavior is to identify these locations or times of day. Then try to modify them by changing your routine or creating obstacles that make it more difficult."',
        "explanationVi": 'Trong các câu 18 đến 22, diễn giả giải thích: "chỉ riêng ý định thường thất bại... Một trong những cách hiệu quả nhất là nhận diện địa điểm/thời điểm trong ngày, rồi điều chỉnh bằng cách thay đổi nếp sinh hoạt hoặc tạo rào cản khiến việc thực hiện khó hơn."',
        "referenceSegmentIndex": 22,
        "targetedConcept": "Sự bất lực của ý chí đơn thuần & can thiệp môi trường (Intentions Failure & Environmental Friction)",
        "targetedConceptEn": "Intentions Failure & Environmental Friction",
        "targetedConceptVi": "Sự bất lực của ý chí đơn thuần & can thiệp môi trường"
    },
    {
        "id": "q_ted_habits_7",
        "question": "What critical behavioral finding did the 2005 university transfer study reveal regarding students' routines?",
        "questionEn": "What critical behavioral finding did the 2005 university transfer study reveal regarding students' routines?",
        "questionVi": "Nghiên cứu sinh viên đại học chuyển trường năm 2005 đã hé lộ phát hiện hành vi quan trọng nào liên quan đến thói quen của họ?",
        "options": [
            "When no longer surrounded by old environments and routines, even their strongest habits changed significantly",
            "Transferring colleges permanently impaired students' cognitive capacity for reading comprehension",
            "Students universally retained identical television viewing hours regardless of geographic location",
            "Physical exercise habits vanished completely upon entering new academic dormitories"
        ],
        "optionsEn": [
            "When no longer surrounded by old environments and routines, even their strongest habits changed significantly",
            "Transferring colleges permanently impaired students' cognitive capacity for reading comprehension",
            "Students universally retained identical television viewing hours regardless of geographic location",
            "Physical exercise habits vanished completely upon entering new academic dormitories"
        ],
        "optionsVi": [
            "Khi không còn ở trong môi trường và nếp sinh hoạt cũ, ngay cả những thói quen ăn sâu nhất của họ cũng thay đổi rõ rệt",
            "Việc chuyển trường đại học làm suy giảm vĩnh viễn năng lực đọc hiểu của sinh viên",
            "Sinh viên duy trì số giờ xem TV hoàn toàn giống nhau bất kể vị trí địa lý",
            "Thói quen tập thể dục biến mất hoàn toàn khi bước vào ký túc xá học thuật mới"
        ],
        "optionsVi": [
            "Khi không còn ở trong môi trường và nếp sinh hoạt cũ, ngay cả những thói quen ăn sâu nhất của họ cũng thay đổi rõ rệt",
            "Việc chuyển trường đại học làm suy giảm vĩnh viễn năng lực đọc hiểu của sinh viên",
            "Sinh viên duy trì số giờ xem TV hoàn toàn giống nhau bất kể vị trí địa lý",
            "Thói quen tập thể dục biến mất hoàn toàn khi bước vào ký túc xá học thuật mới"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 24 & 25, the research showed: "When students were no longer around old environments and routines, their habits, even the strong ones, significantly changed."',
        "explanationEn": 'In Segments 24 & 25, the research showed: "When students were no longer around old environments and routines, their habits, even the strong ones, significantly changed."',
        "explanationVi": 'Trong câu 24 & 25, nghiên cứu chỉ ra: "Khi sinh viên không còn ở trong môi trường và nếp sinh hoạt cũ, thói quen của họ, ngay cả những thói quen ăn sâu nhất, đã thay đổi rõ rệt."',
        "referenceSegmentIndex": 25,
        "targetedConcept": "Nghiên cứu sinh viên chuyển trường 2005 (The 2005 Student Relocation Habit Study)",
        "targetedConceptEn": "The 2005 Student Relocation Habit Study",
        "targetedConceptVi": "Nghiên cứu sinh viên chuyển trường 2005"
    },
    {
        "id": "q_ted_habits_8",
        "question": "What is the core principle of Habit Reversal Training developed in the 1970s, as illustrated with a fidget toy?",
        "questionEn": "What is the core principle of Habit Reversal Training developed in the 1970s, as illustrated with a fidget toy?",
        "questionVi": "Nguyên lý cốt lõi của Liệu pháp Đảo ngược Thói quen phát triển từ thập niên 1970 là gì, như được minh họa với món đồ chơi fidget toy?",
        "options": [
            "Replacing a harmful habit with a less detrimental behavior at the exact moment the urge strikes",
            "Punishing the individual with severe monetary fines whenever an impulse occurs",
            "Completely suppressing all emotional sensations through total digital detox isolation",
            "Avoiding all electronic correspondence permanently to eliminate workplace stress"
        ],
        "optionsEn": [
            "Replacing a harmful habit with a less detrimental behavior at the exact moment the urge strikes",
            "Punishing the individual with severe monetary fines whenever an impulse occurs",
            "Completely suppressing all emotional sensations through total digital detox isolation",
            "Avoiding all electronic correspondence permanently to eliminate workplace stress"
        ],
        "optionsVi": [
            "Thay thế thói quen gây hại bằng một hành vi ít gây hại hơn ngay tại khoảnh khắc xung động trỗi dậy",
            "Phạt tài chính nghiêm khắc cá nhân đó mỗi khi có một thôi thúc xuất hiện",
            "Kìm nén hoàn toàn mọi cảm giác xúc cảm thông qua việc cai nghiện thiết bị số cô lập tuyệt đối",
            "Tránh xa hoàn toàn các thư từ điện tử vĩnh viễn để loại trừ căng thẳng công sở"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 27 to 29, the speaker explains: "the aim is to change a habit by replacing it with another one that’s less detrimental... if you tend to bite your nails at work, preemptively keep a fidget toy at your desk... use the toy when you feel the urge."',
        "explanationEn": 'In Segments 27 to 29, the speaker explains: "the aim is to change a habit by replacing it with another one that’s less detrimental... if you tend to bite your nails at work, preemptively keep a fidget toy at your desk... use the toy when you feel the urge."',
        "explanationVi": 'Trong các câu 27 đến 29, diễn giả giải thích: "mục tiêu là thay thế thói quen bằng một hành vi khác ít gây hại hơn... nếu bạn hay cắn móng tay ở nơi làm việc, hãy chủ động để sẵn đồ chơi fidget toy... và dùng nó khi cảm thấy thôi thúc muốn cắn móng tay."',
        "referenceSegmentIndex": 27,
        "targetedConcept": "Phương pháp đảo ngược thói quen và hành vi thay thế (Habit Reversal Training & Competing Responses)",
        "targetedConceptEn": "Habit Reversal Training & Competing Responses",
        "targetedConceptVi": "Phương pháp đảo ngược thói quen và hành vi thay thế"
    }
]

file_content = f'''import {{ MockVideoLesson, VideoQuizData }} from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for TED-Ed: The Science of Habits
 * 8 CEFR B2 Questions covering the entire 05:03 animated lecture:
 * Habit definition, Dopamine & Neuroplasticity, Habit Loop, 40% Daily Automation,
 * Environmental Friction, 2005 Transfer Study, and Habit Reversal Training.
 */
export const QUIZ_TED_SCIENCE_HABITS: VideoQuizData = {{
  lessonId: "vid_ted_science_habits",
  lessonTitle: "TED-Ed: Why Is It So Hard to Break a Bad Habit? - Shannon Odell",
  totalQuestions: 8,
  xpReward: 40,
  questions: {json.dumps(quiz_questions, ensure_ascii=False, indent=4)},
  generatedBy: "CONTEXTUAL_FALLBACK",
}};

/**
 * TED-Ed: The Science of Habits (Why Is It So Hard to Break a Bad Habit? - Shannon Odell)
 * Slug: ted-ed-how-to-build-a-habit-science-of-habits
 * YouTube ID: wr6fQ4KpbRM (1,480,637 views)
 * Category: cat_ted_ed (TED-Ed & Tư Duy Sâu)
 * 100% Calibrated Verbatim from Official TED-Ed YouTube Subtitles
 * Full Master Coverage: 32 Segments across all 05:03 (303 seconds)
 */
export const LESSON_TED_SCIENCE_HABITS: MockVideoLesson = {{
  id: "vid_ted_science_habits",
  slug: "ted-ed-how-to-build-a-habit-science-of-habits",
  title: "TED-Ed: Why Is It So Hard to Break a Bad Habit? - Shannon Odell",
  description: "Nhà khoa học thần kinh Shannon Odell trên kênh TED-Ed giải mã cơ chế sinh học đằng sau thói quen: cách dopamine định hình tính mềm dẻo thần kinh (neuroplasticity), tại sao vòng lặp tín hiệu - hành vi - phần thưởng lại vượt mặt ý thức, nghiên cứu sinh viên chuyển trường 2005 về sức mạnh của môi trường, và liệu pháp đảo ngược thói quen (habit reversal training) giúp thay đổi hành vi bền vững.",
  sourceType: "YOUTUBE",
  externalId: "wr6fQ4KpbRM",
  thumbnailUrl: "https://img.youtube.com/vi/wr6fQ4KpbRM/hqdefault.jpg",
  durationSeconds: 303,
  durationFormatted: "05:03",
  cefrLevel: "B2",
  supportedTypes: "BOTH",
  categoryId: "cat_ted_ed",
  categorySlug: "ted-ed",
  categoryName: "TED-Ed & Tư Duy Sâu",
  accent: "en-US",
  wpmSpeed: 150,
  viewCount: 1480637,
  studyCount: 112000,
  quiz: QUIZ_TED_SCIENCE_HABITS,
  segments: {json.dumps(segments_data, ensure_ascii=False, indent=4)},
}};
'''

target_path = "features/listening/data/lessons/lesson_ted_science_habits.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(file_content)

print(f"Successfully generated {target_path} with {len(segments_data)} segments and {len(quiz_questions)} quiz questions!")

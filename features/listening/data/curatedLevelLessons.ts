import { parseListeningMarkdown, ListeningLesson } from "../utils/listeningParser";

// === 10 CURATED BEGINNER (A1 - A2) LESSONS ===

const LESSON_A1_001_MD = `---
id: listen_a1_001
title: "Ordering Breakfast at a Downtown Café"
level: "Easy"
duration: "0:45"
category: "Daily Life"
accent: "en-US"
tags: ["Café", "Breakfast", "Food", "Beginner"]
---

# VOCABULARY
- croissant /kwɑːˈsɑːŋ/ (n): bánh sừng bò. E.g., I would like a warm butter croissant.
- beverage /ˈbev.ɚ.ɪdʒ/ (n): đồ uống. E.g., Hot tea is my favorite morning beverage.
- receipt /rɪˈsiːt/ (n): hóa đơn. E.g., Would you like your printed receipt in the bag?
- takeout /ˈteɪk.aʊt/ (adj): mang đi. E.g., Is this coffee for here or takeout?

# TRANSCRIPT
[00:00.00] Good morning! Welcome to Sunrise Bakery. {Good:0, morning:400, Welcome:800, to:1200, Sunrise:1400, Bakery:1900}
:: Việt: Chào buổi sáng! Chào mừng quý khách đến với tiệm bánh Sunrise.

[00:03.50] Hello! I would like a cup of hot black coffee and a fresh butter croissant, please. {Hello:0, I:400, would:600, like:800, a:1000, cup:1200, of:1400, hot:1600, black:1900, coffee:2300, and:2800, a:3000, fresh:3200, butter:3600, croissant:4100, please:4800}
:: Việt: Xin chào! Cho tôi một ly cà phê đen nóng và một chiếc bánh sừng bò bơ tươi nhé.

[00:09.50] Certainly! Would you like that for here or to go? {Certainly:0, Would:700, you:900, like:1100, that:1300, for:1600, here:1800, or:2100, to:2300, go:2500}
:: Việt: Dạ chắc chắn rồi! Quý khách dùng ở đây hay mang đi ạ?

[00:13.20] To go, please. Also, could I have a little honey on the side? {To:0, go:300, please:600, Also:1200, could:1600, I:1800, have:2000, a:2200, little:2400, honey:2700, on:3100, the:3300, side:3500}
:: Việt: Cho tôi mang đi nhé. Ngoài ra, cho tôi xin thêm một chút mật ong riêng được không?

[00:18.00] Of course. That will be five dollars and fifty cents in total. {Of:0, course:300, That:800, will:1100, be:1300, five:1500, dollars:1900, and:2400, fifty:2600, cents:3100, in:3600, total:3800}
:: Việt: Vâng được chứ ạ. Tổng cộng của quý khách hết 5 đô la và 50 xu.

[00:23.00] Here is my card. Thank you very much! {Here:0, is:300, my:500, card:700, Thank:1200, you:1500, very:1700, much:2000}
:: Việt: Thẻ của tôi đây. Cảm ơn bạn rất nhiều!

# QUIZ
Q1: What food did the customer order?
* [x] A butter croissant
* [ ] A chocolate donut
* [ ] A chicken sandwich
* [ ] A fruit salad
-- Explanation: The customer says: "I would like a cup of hot black coffee and a fresh butter croissant."

Q2: How does the customer want their order packaged?
* [ ] For dining in the café
* [x] To go (takeout)
* [ ] Delivered to their home
* [ ] Reserved for tomorrow
-- Explanation: The customer specifically replies: "To go, please."

Q3: How much is the total cost of the order?
* [ ] $3.50
* [ ] $4.00
* [x] $5.50
* [ ] $7.25
-- Explanation: The cashier states: "That will be five dollars and fifty cents in total."
`;

const LESSON_A1_002_MD = `---
id: listen_a1_002
title: "Asking for Directions in the City Center"
level: "Easy"
duration: "0:40"
category: "Travel"
accent: "en-US"
tags: ["Directions", "Street", "Travel", "Beginner"]
---

# VOCABULARY
- intersection /ˌɪn.t̬ɚˈsek.ʃən/ (n): ngã tư, giao lộ. E.g., Turn left at the next busy intersection.
- pedestrian /pəˈdes.tri.ən/ (n): người đi bộ. E.g., Use the pedestrian crosswalk for safety.
- block /blɑːk/ (n): dãy nhà, tòa nhà. E.g., Walk two blocks straight ahead.
- opposite /ˈɑː.pə.zɪt/ (prep): đối diện. E.g., The bookstore is right opposite the bank.

# TRANSCRIPT
[00:00.00] Excuse me, could you tell me where the nearest central library is? {Excuse:0, me:400, could:800, you:1000, tell:1200, me:1400, where:1600, the:1900, nearest:2100, central:2600, library:3100, is:3700}
:: Việt: Xin lỗi, bạn có thể chỉ giúp tôi thư viện trung tâm gần nhất ở đâu không?

[00:05.00] Yes, of course! Walk straight down this street for two blocks until you reach the traffic light. {Yes:0, of:300, course:600, Walk:1100, straight:1400, down:1800, this:2100, street:2400, for:2800, two:3000, blocks:3300, until:3800, you:4200, reach:4400, the:4800, traffic:5000, light:5500}
:: Việt: Vâng, tất nhiên rồi! Bạn cứ đi thẳng con phố này qua hai dãy nhà cho đến khi gặp đèn giao thông.

[00:11.80] At the traffic light, turn right onto Elm Street. {At:0, the:300, traffic:500, light:1000, turn:1400, right:1700, onto:2100, Elm:2500, Street:2800}
:: Việt: Tại cột đèn giao thông, bạn hãy rẽ phải vào đường Elm nhé.

[00:15.50] The library is a large stone building on your left, right opposite the post office. {The:0, library:300, is:800, a:1000, large:1200, stone:1600, building:2000, on:2500, your:2700, left:2900, right:3400, opposite:3700, the:4300, post:4500, office:4800}
:: Việt: Thư viện là một tòa nhà lớn bằng đá ở bên tay trái bạn, nằm ngay đối diện bưu điện.

[00:21.50] That sounds very easy to find. How long does it take to walk there? {That:0, sounds:400, very:800, easy:1100, to:1500, find:1700, How:2200, long:2500, does:2800, it:3000, take:3200, to:3500, walk:3700, there:4100}
:: Việt: Nghe có vẻ rất dễ tìm. Đi bộ đến đó mất bao lâu vậy bạn?

[00:26.50] It takes only about five minutes. Have a wonderful day! {It:0, takes:300, only:700, about:1000, five:1400, minutes:1800, Have:2400, a:2600, wonderful:2800, day:3400}
:: Việt: Chỉ mất khoảng năm phút thôi. Chúc bạn một ngày tốt lành!

# QUIZ
Q1: Where is the person trying to go?
* [ ] The post office
* [x] The central library
* [ ] The railway station
* [ ] A local coffee shop
-- Explanation: The person asks: "could you tell me where the nearest central library is?"

Q2: What should the person do at the traffic light?
* [ ] Turn left
* [x] Turn right onto Elm Street
* [ ] Keep walking straight for five blocks
* [ ] Cross the bridge
-- Explanation: The speaker instructs: "At the traffic light, turn right onto Elm Street."

Q3: How long will the walk take?
* [x] About five minutes
* [ ] Fifteen minutes
* [ ] Half an hour
* [ ] Two minutes
-- Explanation: The local person says: "It takes only about five minutes."
`;

const LESSON_A1_003_MD = `---
id: listen_a1_003
title: "Hotel Reception Check-In and Room Amenities"
level: "Easy"
duration: "0:42"
category: "Travel"
accent: "en-GB"
tags: ["Hotel", "Reception", "Travel", "Beginner"]
---

# VOCABULARY
- reservation /ˌrez.ɚˈveɪ.ʃən/ (n): sự đặt phòng, đặt chỗ. E.g., I have a hotel reservation under my name.
- keycard /ˈkiː.kɑːrd/ (n): thẻ từ mở khóa phòng. E.g., Touch your electronic keycard against the reader.
- elevator /ˈel.ə.veɪ.t̬ɚ/ (n): thang máy. E.g., Take the elevator up to the fourth floor.
- complimentary /ˌkɑːm.pləˈmen.t̬ɚ.i/ (adj): miễn phí. E.g., Complimentary hot breakfast is served daily.

# TRANSCRIPT
[00:00.00] Good afternoon, sir. Welcome to the Royal Garden Hotel. {Good:0, afternoon:400, sir:1000, Welcome:1400, to:1800, the:2000, Royal:2200, Garden:2600, Hotel:3100}
:: Việt: Kính chào quý khách. Chào mừng quý khách đến với Khách sạn Royal Garden.

[00:04.20] Hello! I have a room reservation under the name David Miller. {Hello:0, I:500, have:700, a:900, room:1100, reservation:1400, under:2200, the:2500, name:2700, David:3000, Miller:3400}
:: Việt: Xin chào! Tôi có một phòng đã đặt trước dưới tên David Miller.

[00:08.50] Yes, Mr. Miller, we have you booked in a deluxe double room for three nights. {Yes:0, Mr:400, Miller:700, we:1200, have:1400, you:1600, booked:1800, in:2200, a:2400, deluxe:2600, double:3100, room:3500, for:3900, three:4100, nights:4500}
:: Việt: Vâng thưa ông Miller, chúng tôi đã xếp cho ông một phòng đôi cao cấp trong ba đêm.

[00:14.00] Here are your keycards for room 408 on the fourth floor. {Here:0, are:300, your:500, keycards:700, for:1300, room:1500, four-zero-eight:1800, on:2700, the:2900, fourth:3100, floor:3500}
:: Việt: Đây là thẻ phòng của ông cho phòng 408 ở tầng bốn ạ.

[00:18.50] The elevators are just past the lounge on your right. {The:0, elevators:300, are:900, just:1100, past:1400, the:1700, lounge:1900, on:2400, your:2600, right:2800}
:: Việt: Thang máy ở ngay qua khỏi sảnh chờ phía bên tay phải của ông.

[00:22.50] Breakfast is served from seven to ten in the morning on the ground floor. {Breakfast:0, is:600, served:800, from:1300, seven:1600, to:2000, ten:2200, in:2600, the:2800, morning:3000, on:3500, the:3700, ground:3900, floor:4300}
:: Việt: Bữa sáng được phục vụ từ bảy đến mười giờ sáng tại tầng trệt.

# QUIZ
Q1: What room number was assigned to Mr. Miller?
* [ ] Room 204
* [ ] Room 308
* [x] Room 408
* [ ] Room 510
-- Explanation: The receptionist says: "Here are your keycards for room 408 on the fourth floor."

Q2: How long is Mr. Miller's stay?
* [ ] One night
* [ ] Two nights
* [x] Three nights
* [ ] One week
-- Explanation: The receptionist confirms: "...booked in a deluxe double room for three nights."

Q3: What time is breakfast served?
* [ ] 6:00 AM to 9:00 AM
* [x] 7:00 AM to 10:00 AM
* [ ] 8:00 AM to 11:00 AM
* [ ] All day
-- Explanation: The receptionist states: "Breakfast is served from seven to ten in the morning."
`;

const LESSON_A1_004_MD = `---
id: listen_a1_004
title: "Grocery Shopping for Fresh Vegetables"
level: "Easy"
duration: "0:38"
category: "Shopping"
accent: "en-US"
tags: ["Shopping", "Grocery", "Vegetables", "Beginner"]
---

# VOCABULARY
- organic /ɔːrˈɡæn.ɪk/ (adj): hữu cơ. E.g., We buy certified organic tomatoes every week.
- aisle /aɪl/ (n): lối đi giữa các kệ hàng. E.g., The olive oil is in aisle four.
- discount /ˈdɪs.kaʊnt/ (n): giảm giá. E.g., There is a twenty percent discount on fresh apples.
- cash /kæʃ/ (n): tiền mặt. E.g., Will you pay with cash or credit card?

# TRANSCRIPT
[00:00.00] Hi there! Could you help me find the fresh organic tomatoes? {Hi:0, there:300, Could:800, you:1000, help:1200, me:1400, find:1600, the:1900, fresh:2100, organic:2500, tomatoes:3100}
:: Việt: Xin chào! Bạn có thể giúp tôi tìm chỗ để cà chua hữu cơ tươi được không?

[00:04.20] Sure thing! They are in the produce section right in aisle two. {Sure:0, thing:300, They:800, are:1000, in:1200, the:1400, produce:1600, section:2100, right:2600, in:2800, aisle:3000, two:3400}
:: Việt: Chắc chắn rồi! Chúng ở khu vực rau củ quả ngay tại lối đi số hai nhé.

[00:08.50] Are there any special discounts on vegetables today? {Are:0, there:300, any:500, special:800, discounts:1300, on:1800, vegetables:2000, today:2600}
:: Việt: Hôm nay có chương trình giảm giá đặc biệt nào cho rau củ không bạn?

[00:12.00] Yes! If you buy two cartons of strawberries, you get one free. {Yes:0, If:600, you:800, buy:1000, two:1200, cartons:1500, of:2000, strawberries:2200, you:2900, get:3100, one:3300, free:3600}
:: Việt: Có chứ! Nếu bạn mua hai hộp dâu tây, bạn sẽ được tặng một hộp miễn phí đấy.

[00:16.80] That is a fantastic deal! I will take some right away. {That:0, is:300, a:500, fantastic:700, deal:1300, I:1700, will:1900, take:2100, some:2400, right:2700, away:3000}
:: Việt: Ưu đãi tuyệt vời quá! Tôi sẽ lấy ngay bây giờ.

[00:20.50] Wonderful! The checkout counters are straight ahead when you are ready. {Wonderful:0, The:800, checkout:1000, counters:1500, are:2000, straight:2200, ahead:2600, when:3000, you:3200, are:3400, ready:3600}
:: Việt: Tuyệt vời! Các quầy thanh toán ở ngay phía trước khi bạn sẵn sàng tính tiền nhé.

# QUIZ
Q1: Where are the organic tomatoes located?
* [ ] Aisle five
* [x] Aisle two in the produce section
* [ ] Near the bakery
* [ ] In the frozen food area
-- Explanation: The worker states: "They are in the produce section right in aisle two."

Q2: What is the special promotion mentioned?
* [ ] 50% off all apples
* [x] Buy two cartons of strawberries, get one free
* [ ] Free delivery for orders over $50
* [ ] Buy one bottle of olive oil, get bread
-- Explanation: The store clerk says: "If you buy two cartons of strawberries, you get one free."

Q3: Where are the checkout counters?
* [ ] On the second floor
* [x] Straight ahead
* [ ] Outside near the parking lot
* [ ] Behind the deli counter
-- Explanation: The clerk mentions: "The checkout counters are straight ahead when you are ready."
`;

const LESSON_A1_005_MD = `---
id: listen_a1_005
title: "Booking a Doctor's Routine Check-up Appointment"
level: "Easy"
duration: "0:40"
category: "Healthcare"
accent: "en-US"
tags: ["Doctor", "Healthcare", "Appointment", "Beginner"]
---

# VOCABULARY
- appointment /əˈpɔɪnt.mənt/ (n): cuộc hẹn. E.g., I have a medical appointment on Wednesday morning.
- symptom /ˈsɪmp.təm/ (n): triệu chứng. E.g., Do you have any fever or headache symptoms?
- insurance /ɪnˈʃʊr.əns/ (n): bảo hiểm. E.g., Please bring your health insurance card.
- prescription /prɪˈskrɪp.ʃən/ (n): đơn thuốc. E.g., The doctor wrote a prescription for the pain.

# TRANSCRIPT
[00:00.00] Good morning, City Health Clinic. How may I help you today? {Good:0, morning:400, City:800, Health:1100, Clinic:1400, How:1900, may:2100, I:2300, help:2500, you:2700, today:2900}
:: Việt: Xin chào, Phòng khám Sức khỏe Thành phố. Tôi có thể giúp gì cho bạn hôm nay?

[00:04.20] Hello, I would like to schedule a routine health check-up with Dr. Watson. {Hello:0, I:500, would:700, like:900, to:1100, schedule:1300, a:1700, routine:1900, health:2300, check-up:2600, with:3200, Dr:3400, Watson:3700}
:: Việt: Xin chào, tôi muốn đặt lịch khám sức khỏe định kỳ với Bác sĩ Watson.

[00:09.00] Dr. Watson has an open slot this Thursday at ten o'clock in the morning. {Dr:0, Watson:300, has:700, an:900, open:1100, slot:1400, this:1800, Thursday:2100, at:2600, ten:2800, o'clock:3100, in:3600, the:3800, morning:4000}
:: Việt: Bác sĩ Watson có một khung giờ trống vào Thứ Năm tuần này lúc mười giờ sáng.

[00:14.20] That time works perfectly for me. What documents should I bring? {That:0, time:300, works:600, perfectly:1000, for:1500, me:1700, What:2100, documents:2400, should:2900, I:3100, bring:3300}
:: Việt: Giờ đó hoàn toàn phù hợp với tôi. Tôi nên mang theo những giấy tờ gì ạ?

[00:18.50] Please remember to bring your photo ID and your health insurance card. {Please:0, remember:400, to:800, bring:1000, your:1300, photo:1500, ID:1900, and:2300, your:2500, health:2700, insurance:3000, card:3600}
:: Việt: Bạn vui lòng nhớ mang theo căn cước công dân có ảnh và thẻ bảo hiểm y tế nhé.

[00:23.20] Understood. Thank you very much for your helpful guidance! {Understood:0, Thank:800, you:1000, very:1200, much:1400, for:1700, your:1900, helpful:2100, guidance:2600}
:: Việt: Tôi hiểu rồi. Cảm ơn bạn rất nhiều vì sự hướng dẫn tận tình!

# QUIZ
Q1: Which doctor is the patient scheduling with?
* [ ] Dr. Smith
* [x] Dr. Watson
* [ ] Dr. Taylor
* [ ] Dr. Brown
-- Explanation: The patient says: "I would like to schedule a routine health check-up with Dr. Watson."

Q2: When is the appointment scheduled?
* [ ] Monday at 9:00 AM
* [ ] Wednesday at 2:00 PM
* [x] Thursday at 10:00 AM
* [ ] Friday at 4:00 PM
-- Explanation: The clinic receptionist states: "...this Thursday at ten o'clock in the morning."

Q3: What documents must the patient bring?
* [x] Photo ID and health insurance card
* [ ] Passport and birth certificate
* [ ] Bank statement
* [ ] Vaccination record only
-- Explanation: The receptionist says: "Please remember to bring your photo ID and your health insurance card."
`;

// === 5 CURATED ADVANCED (C1 - C2) LESSONS ===

const LESSON_C1_001_MD = `---
id: listen_c1_001
title: "Artificial Intelligence Ethics and Neural Model Governance"
level: "Hard"
duration: "0:50"
category: "Technology"
accent: "en-US"
tags: ["AI", "Technology", "Ethics", "Advanced", "C1"]
---

# VOCABULARY
- accountability /əˌkaʊn.t̬əˈbɪl.ə.t̬i/ (n): trách nhiệm giải trình. E.g., Algorithmic accountability is essential in public deployments.
- hallucination /həˌluː.səˈneɪ.ʃən/ (n): ảo giác (khi mô hình AI bịa đặt thông tin). E.g., Mitigating factual hallucinations remains a paramount challenge.
- telemetry /təˈlem.ə.tri/ (n): dữ liệu đo đạc từ xa. E.g., Real-time telemetry detects inference latency spikes.
- alignment /əˈlaɪn.mənt/ (n): sự căn chỉnh (phù hợp giá trị con người). E.g., Value alignment ensures artificial systems respect human dignity.

# TRANSCRIPT
[00:00.00] Rapid proliferation of generative intelligence demands unprecedented scrutiny over algorithmic accountability. {Rapid:0, proliferation:400, of:1200, generative:1400, intelligence:2000, demands:2700, unprecedented:3200, scrutiny:4000, over:4600, algorithmic:4900, accountability:5700}
:: Việt: Sự phát triển bùng nổ của trí tuệ nhân tạo tạo sinh đòi hỏi sự giám sát chưa từng có đối với trách nhiệm giải trình thuật toán.

[00:06.80] When autonomous neural architectures generate mission-critical decisions, interpretability cannot remain an afterthought. {When:0, autonomous:400, neural:1100, architectures:1500, generate:2300, mission-critical:2800, decisions:3700, interpretability:4400, cannot:5500, remain:5900, an:6300, afterthought:6500}
:: Việt: Khi các kiến trúc nơ-ron tự chủ đưa ra những quyết định mang tính sống còn, khả năng diễn giải không thể chỉ là yếu tố xem xét sau cùng.

[00:14.20] Regulatory compliance frameworks must establish verifiable guardrails against latent biases and hallucinations. {Regulatory:0, compliance:700, frameworks:1300, must:2000, establish:2300, verifiable:2900, guardrails:3600, against:4300, latent:4800, biases:5300, and:5800, hallucinations:6000}
:: Việt: Các khung pháp lý tuân thủ phải thiết lập các rào chắn có thể kiểm chứng được nhằm chống lại các định kiến tiềm ẩn và hiện tượng ảo giác.

[00:21.50] Comprehensive empirical evaluation demonstrates that continuous adversarial auditing significantly reinforces robust alignment. {Comprehensive:0, empirical:800, evaluation:1400, demonstrates:2100, that:2900, continuous:3100, adversarial:3700, auditing:4500, significantly:5100, reinforces:5900, robust:6500, alignment:7000}
:: Việt: Đánh giá thực nghiệm toàn diện chứng minh rằng việc kiểm toán đối kháng liên tục giúp củng cố đáng kể sự tương thích vững chắc.

[00:29.50] Multi-stakeholder consortiums must proactively formalize ethical standards before frontier models surpass oversight capacities. {Multi-stakeholder:0, consortiums:1000, must:1900, proactively:2200, formalize:2900, ethical:3500, standards:4000, before:4600, frontier:5000, models:5500, surpass:6000, oversight:6500, capacities:7200}
:: Việt: Các liên minh đa bên cần chủ động chuẩn hóa các quy chuẩn đạo đức trước khi các mô hình tiên phong vượt quá năng lực giám sát.

# QUIZ
Q1: What does the speaker argue about interpretability in neural architectures?
* [ ] It is completely unnecessary for commercial software
* [x] It cannot remain an afterthought in critical decisions
* [ ] It should only be evaluated after complete product failure
* [ ] It will naturally emerge without human intervention
-- Explanation: The speaker emphasizes: "When autonomous neural architectures generate mission-critical decisions, interpretability cannot remain an afterthought."

Q2: Which mechanism significantly reinforces robust model alignment according to empirical findings?
* [x] Continuous adversarial auditing
* [ ] Eliminating public access entirely
* [ ] Disabling all telemetry logging
* [ ] Reducing dataset training parameters
-- Explanation: The transcript explicitly states: "...continuous adversarial auditing significantly reinforces robust alignment."

Q3: Why must multi-stakeholder consortiums formalize ethical standards proactively?
* [ ] To monopolize market pricing
* [ ] To delay technological progress in developing nations
* [x] Before frontier models surpass oversight capacities
* [ ] To replace traditional judicial courts
-- Explanation: The final statement highlights: "...before frontier models surpass oversight capacities."
`;

const LESSON_C1_002_MD = `---
id: listen_c1_002
title: "Central Bank Monetary Policy and Macroeconomic Volatility"
level: "Hard"
duration: "0:52"
category: "Finance"
accent: "en-GB"
tags: ["Finance", "Economics", "Monetary Policy", "Advanced", "C1"]
---

# VOCABULARY
- hawkish /ˈhɔː.kɪʃ/ (adj): chủ trương thắt chặt tiền tệ, tăng lãi suất. E.g., The central bank signaled a hawkish stance to curb inflation.
- liquidity /lɪˈkwɪd.ə.t̬i/ (n): tính thanh khoản. E.g., Quantitative tightening drains excess liquidity from capital markets.
- stagflation /stæɡˈfleɪ.ʃən/ (n): lạm phát đình đốn (lạm phát cao kết hợp kinh tế đình trệ). E.g., Policymakers dread the specter of persistent stagflation.
- yields /jiːldz/ (n): lợi suất trái phiếu. E.g., Treasury bond yields climbed sharply across all maturities.

# TRANSCRIPT
[00:00.00] Persistent inflationary pressures have prompted central monetary authorities to execute quantitative tightening measures. {Persistent:0, inflationary:700, pressures:1600, have:2200, prompted:2400, central:2900, monetary:3400, authorities:4000, to:4700, execute:4900, quantitative:5500, tightening:6300, measures:6900}
:: Việt: Áp lực lạm phát kéo dài đã thôi thúc các cơ quan điều hành tiền tệ trung ương thực thi các biện pháp thắt chặt định lượng.

[00:07.80] Aggressive interest rate hikes intend to compress aggregate consumer demand and stabilize foreign exchange volatilities. {Aggressive:0, interest:700, rate:1200, hikes:1500, intend:2000, to:2400, compress:2600, aggregate:3200, consumer:3800, demand:4400, and:4900, stabilize:5100, foreign:5700, exchange:6200, volatilities:6800}
:: Việt: Các đợt tăng lãi suất quyết liệt nhằm mục đích kiềm chế tổng cầu tiêu dùng và ổn định biến động tỷ giá ngoại hối.

[00:15.50] However, excessively synchronized global contraction risks precipitating capital flight from emerging sovereign debt markets. {However:0, excessively:600, synchronized:1400, global:2200, contraction:2700, risks:3500, precipitating:3900, capital:4700, flight:5200, from:5600, emerging:5800, sovereign:6300, debt:6900, markets:7200}
:: Việt: Tuy nhiên, việc đồng loạt thắt chặt tiền tệ trên quy mô toàn cầu tiềm ẩn nguy cơ kích hoạt làn sóng tháo chạy vốn khỏi các thị trường nợ công mới nổi.

[00:23.50] Commercial banking institutions are proactively fortifying liquidity reserves to withstand deteriorating credit quality. {Commercial:0, banking:700, institutions:1200, are:2000, proactively:2200, fortifying:2900, liquidity:3600, reserves:4200, to:4800, withstand:5000, deteriorating:5600, credit:6400, quality:6900}
:: Việt: Các định chế ngân hàng thương mại đang chủ động gia cố nguồn dự trữ thanh khoản để chống chịu trước sự suy giảm chất lượng tín dụng.

[00:31.20] Fiscal policymakers must coordinate judiciously with monetary governors to avert prolonged economic stagnation. {Fiscal:0, policymakers:600, must:1400, coordinate:1700, judiciously:2400, with:3100, monetary:3300, governors:3900, to:4500, avert:4700, prolonged:5200, economic:5800, stagnation:6400}
:: Việt: Các nhà hoạch định chính sách tài khóa cần phối hợp thận trọng với các thống đốc tiền tệ để ngăn chặn suy thoái kinh tế kéo dài.

# QUIZ
Q1: What is the main objective of aggressive interest rate hikes?
* [ ] To encourage uncontrolled borrowing
* [x] To compress aggregate demand and stabilize exchange volatility
* [ ] To lower the value of gold reserves
* [ ] To expand speculative cryptocurrency assets
-- Explanation: The speaker states: "Aggressive interest rate hikes intend to compress aggregate consumer demand and stabilize foreign exchange volatilities."

Q2: What major risk arises from synchronized global contraction?
* [x] Capital flight from emerging sovereign debt markets
* [ ] Rapid increase in consumer retail spending
* [ ] Total collapse of digital communication infrastructure
* [ ] Hyperinflation in central bank headquarters
-- Explanation: The speaker warns of: "...precipitating capital flight from emerging sovereign debt markets."

Q3: How are commercial banking institutions reacting to the tightening environment?
* [ ] Dissolving their executive boards
* [x] Fortifying liquidity reserves against credit deterioration
* [ ] Offering zero-interest unsecured loans to anyone
* [ ] Shutting down physical automated teller machines
-- Explanation: The transcript explicitly states: "Commercial banking institutions are proactively fortifying liquidity reserves..."
`;

export const CURATED_LEVEL_LESSONS: ListeningLesson[] = [
  parseListeningMarkdown(LESSON_A1_001_MD),
  parseListeningMarkdown(LESSON_A1_002_MD),
  parseListeningMarkdown(LESSON_A1_003_MD),
  parseListeningMarkdown(LESSON_A1_004_MD),
  parseListeningMarkdown(LESSON_A1_005_MD),
  parseListeningMarkdown(LESSON_C1_001_MD),
  parseListeningMarkdown(LESSON_C1_002_MD),
];

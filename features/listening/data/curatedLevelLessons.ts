import { parseListeningMarkdown, ListeningLesson } from "../utils/listeningParser";

// === 5 CURATED BEGINNER (A1 - A2) MASTER EDITION LESSONS ===

const LESSON_A1_001_MD = `---
id: listen_a1_001
title: "Ordering Breakfast at a Downtown Café"
level: "Easy"
duration: "0:50"
category: "Daily Life"
accent: "en-US"
tags: ["Café", "Breakfast", "Food", "Beginner"]
---

# VOCABULARY
- croissant /kwɑːˈsɑːŋ/ (n): bánh sừng bò. E.g., I would like a warm butter croissant.
- beverage /ˈbev.ɚ.ɪdʒ/ (n): đồ uống. E.g., Hot tea is my favorite morning beverage.
- receipt /rɪˈsiːt/ (n): hóa đơn. E.g., Would you like your printed receipt in the bag?
- takeout /ˈteɪk.aʊt/ (adj): mang đi. E.g., Is this coffee for here or takeout?
- pastry /ˈpeɪ.stri/ (n): bánh nướng ngọt. E.g., The bakery offers a wide variety of fresh French pastries.

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

[00:27.00] You can insert your card into the chip reader right here. {You:0, can:300, insert:600, your:1100, card:1300, into:1700, the:2000, chip:2200, reader:2600, right:3100, here:3400}
:: Việt: Bạn có thể cắm thẻ vào đầu đọc chip ngay tại đây.

[00:31.50] Perfect, the payment went through. Here is your receipt and order number twelve. {Perfect:0, the:700, payment:900, went:1400, through:1700, Here:2200, is:2500, your:2700, receipt:2900, and:3400, order:3600, number:4000, twelve:4400}
:: Việt: Hoàn tất rồi, thanh toán đã thành công. Đây là hóa đơn và số thứ tự mười hai của bạn.

[00:37.00] Thank you! Where should I wait to pick up my fresh coffee and pastry? {Thank:0, you:300, Where:800, should:1100, I:1300, wait:1500, to:1800, pick:2000, up:2300, my:2500, fresh:2800, coffee:3200, and:3600, pastry:3900}
:: Việt: Cảm ơn bạn! Tôi nên đứng đợi lấy cà phê nóng và bánh ngọt ở đâu?

[00:42.50] Please wait by the pickup counter on the left; the barista will call your number in two minutes. {Please:0, wait:400, by:700, the:900, pickup:1100, counter:1600, on:2100, the:2300, left:2500, the:3100, barista:3300, will:3900, call:4100, your:4400, number:4600, in:5100, two:5300, minutes:5600}
:: Việt: Xin vui lòng chờ cạnh quầy nhận đồ bên tay trái; nhân viên pha chế sẽ gọi số của bạn sau hai phút nữa.

# QUIZ
Q1: What breakfast items did the customer order?
* [x] Hot black coffee and a fresh butter croissant
* [ ] Iced cappuccino and a chocolate muffin
* [ ] Green tea and a toasted bagel
* [ ] Orange juice and a bowl of oatmeal
-- Explanation: The customer states: "I would like a cup of hot black coffee and a fresh butter croissant, please."

Q2: How does the customer prefer to receive their order?
* [ ] Dine-in at the terrace table
* [x] To go with honey on the side
* [ ] Delivered to their office address
* [ ] Kept in storage until evening
-- Explanation: The customer responds: "To go, please. Also, could I have a little honey on the side?"

Q3: How much does the order cost in total?
* [ ] Three dollars and seventy-five cents
* [ ] Four dollars and twenty cents
* [x] Five dollars and fifty cents
* [ ] Six dollars and ninety cents
-- Explanation: The cashier confirms: "That will be five dollars and fifty cents in total."

Q4: Where should the customer collect their finished food and drink?
* [ ] At the store entrance
* [ ] By the outdoor patio seating
* [ ] From the drive-through window
* [x] At the pickup counter on the left
-- Explanation: The staff member instructs: "Please wait by the pickup counter on the left; the barista will call your number in two minutes."
`;

const LESSON_A1_002_MD = `---
id: listen_a1_002
title: "Asking for Directions in the City Center"
level: "Easy"
duration: "0:52"
category: "Travel"
accent: "en-US"
tags: ["Directions", "Street", "Travel", "Beginner"]
---

# VOCABULARY
- intersection /ˌɪn.t̬ɚˈsek.ʃən/ (n): ngã tư, giao lộ. E.g., Turn left at the next busy intersection.
- pedestrian /pəˈdes.tri.ən/ (n): người đi bộ. E.g., Use the pedestrian crosswalk for safety.
- block /blɑːk/ (n): dãy nhà, tòa nhà. E.g., Walk two blocks straight ahead.
- opposite /ˈɑː.pə.zɪt/ (prep): đối diện. E.g., The bookstore is right opposite the bank.
- courtyard /ˈkɔːrt.jɑːrd/ (n): sân trong, khoảng sân. E.g., People enjoy relaxing in the sunny library courtyard.

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

[00:31.00] Thank you so much! Is there a public park or garden nearby where I can sit and read? {Thank:0, you:300, so:600, much:800, Is:1300, there:1500, a:1700, public:1900, park:2400, or:2700, garden:2900, nearby:3400, where:3900, I:4200, can:4400, sit:4700, and:5000, read:5200}
:: Việt: Cảm ơn bạn rất nhiều! Gần đó có công viên hay hoa viên công cộng nào để tôi có thể ngồi đọc sách không?

[00:37.00] Yes, Central Rose Park is located right behind the library courtyard. {Yes:0, Central:600, Rose:1100, Park:1500, is:1900, located:2100, right:2600, behind:2900, the:3400, library:3600, courtyard:4100}
:: Việt: Có chứ, Công viên Central Rose nằm ngay sau khoảng sân của thư viện đấy.

[00:42.50] That is wonderful to know. Are bicycles allowed inside the park grounds? {That:0, is:300, wonderful:600, to:1100, know:1300, Are:1800, bicycles:2100, allowed:2700, inside:3200, the:3600, park:3800, grounds:4300}
:: Việt: Thật tuyệt khi biết điều đó. Xe đạp có được phép đi vào trong khuôn viên công viên không bạn?

[00:48.00] Yes, there is a paved bike path along the lake, but you must ride slowly. {Yes:0, there:500, is:700, a:900, paved:1100, bike:1500, path:1800, along:2200, the:2600, lake:2800, but:3300, you:3600, must:3800, ride:4100, slowly:4400}
:: Việt: Có, có một lối đi trải nhựa dành cho xe đạp dọc bờ hồ, nhưng bạn phải đi chậm nhé.

# QUIZ
Q1: Where does the traveler want to go initially?
* [ ] The central post office
* [x] The nearest central library
* [ ] The city railway station
* [ ] The downtown medical clinic
-- Explanation: The traveler asks: "could you tell me where the nearest central library is?"

Q2: What direction should the traveler follow at the traffic light?
* [ ] Turn left into Oak Avenue
* [ ] Continue straight across the bridge
* [x] Turn right onto Elm Street
* [ ] Make a U-turn back to the subway station
-- Explanation: The local person instructs: "At the traffic light, turn right onto Elm Street."

Q3: Where is Central Rose Park situated?
* [ ] Across the street from the bank
* [ ] Next to the city council hall
* [ ] Beside the bus terminal
* [x] Right behind the library courtyard
-- Explanation: The guide explains: "Central Rose Park is located right behind the library courtyard."

Q4: What is the rule regarding riding bicycles inside the park grounds?
* [x] Permitted on the paved lake path while riding slowly
* [ ] Strictly prohibited for all visitors
* [ ] Permitted only during early morning hours before sunrise
* [ ] Allowed only with an official municipal racing permit
-- Explanation: The local resident mentions: "there is a paved bike path along the lake, but you must ride slowly."
`;

const LESSON_A1_003_MD = `---
id: listen_a1_003
title: "Hotel Reception Check-In and Room Amenities"
level: "Easy"
duration: "0:52"
category: "Travel"
accent: "en-GB"
tags: ["Hotel", "Reception", "Travel", "Beginner"]
---

# VOCABULARY
- reservation /ˌrez.ɚˈveɪ.ʃən/ (n): sự đặt phòng, đặt chỗ. E.g., I have a hotel reservation under my name.
- keycard /ˈkiː.kɑːrd/ (n): thẻ từ mở khóa phòng. E.g., Touch your electronic keycard against the reader.
- elevator /ˈel.ə.veɪ.t̬ɚ/ (n): thang máy. E.g., Take the elevator up to the fourth floor.
- complimentary /ˌkɑːm.pləˈmen.t̬ɚ.i/ (adj): miễn phí. E.g., Complimentary hot breakfast is served daily.
- amenities /əˈmen.ə.t̬iz/ (n): tiện nghi phòng. E.g., The hotel offers premium amenities including a heated pool and fitness center.

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

[00:28.00] Thank you very much. Is high-speed wireless internet included with the room? {Thank:0, you:300, very:500, much:800, Is:1300, high-speed:1600, wireless:2200, internet:2700, included:3300, with:3800, the:4000, room:4200}
:: Việt: Cảm ơn bạn rất nhiều. Phòng có bao gồm mạng internet không dây tốc độ cao không?

[00:33.50] Yes, complimentary Wi-Fi is available everywhere; the password is printed on your keycard sleeve. {Yes:0, complimentary:600, Wi-Fi:1500, is:2000, available:2200, everywhere:2800, the:3500, password:3800, is:4300, printed:4500, on:5000, your:5200, keycard:5400, sleeve:6000}
:: Việt: Vâng, Wi-Fi miễn phí có ở khắp nơi; mật khẩu được in ngay trên bao đựng thẻ từ của quý khách.

[00:40.00] Excellent. Could you also arrange a wake-up call for six-thirty tomorrow morning? {Excellent:0, Could:800, you:1000, also:1200, arrange:1500, a:1800, wake-up:2000, call:2400, for:2700, six-thirty:3000, tomorrow:3600, morning:4100}
:: Việt: Tuyệt vời. Bạn có thể sắp xếp một cuộc gọi báo thức lúc 6 giờ 30 sáng mai giúp tôi được không?

[00:46.50] Absolutely, Mr. Miller, I have scheduled your wake-up call; enjoy your pleasant stay with us! {Absolutely:0, Mr:800, Miller:1100, I:1600, have:1800, scheduled:2000, your:2400, wake-up:2600, call:3000, enjoy:3400, your:3800, pleasant:4000, stay:4500, with:4800, us:5100}
:: Việt: Chắc chắn rồi, thưa ông Miller, tôi đã lên lịch cuộc gọi báo thức cho ông; chúc ông có một kỳ nghỉ thật dễ chịu!

# QUIZ
Q1: How long is Mr. David Miller scheduled to stay at the hotel?
* [ ] For one single night
* [ ] For a full two-week business trip
* [x] For three nights in a deluxe double room
* [ ] For five days with weekend extension
-- Explanation: The receptionist confirms: "...booked in a deluxe double room for three nights."

Q2: Which room number was assigned to Mr. Miller?
* [ ] Room 208 on the second floor
* [ ] Room 314 on the third floor
* [ ] Room 502 on the top floor
* [x] Room 408 on the fourth floor
-- Explanation: The receptionist states: "Here are your keycards for room 408 on the fourth floor."

Q3: Where can the hotel guest find the Wi-Fi password?
* [x] Printed on the keycard sleeve
* [ ] On the lobby bulletin board
* [ ] Inside the television remote menu
* [ ] Sent via an SMS confirmation code
-- Explanation: The clerk states: "complimentary Wi-Fi is available everywhere; the password is printed on your keycard sleeve."

Q4: What time did the guest request a wake-up call for tomorrow morning?
* [ ] At 5:45 AM
* [x] At 6:30 AM
* [ ] At 7:15 AM
* [ ] At 8:00 AM
-- Explanation: Mr. Miller asks: "Could you also arrange a wake-up call for six-thirty tomorrow morning?"
`;

const LESSON_A1_004_MD = `---
id: listen_a1_004
title: "Grocery Shopping for Fresh Vegetables"
level: "Easy"
duration: "0:48"
category: "Shopping"
accent: "en-US"
tags: ["Shopping", "Grocery", "Vegetables", "Beginner"]
---

# VOCABULARY
- organic /ɔːrˈɡæn.ɪk/ (adj): hữu cơ. E.g., We buy certified organic tomatoes every week.
- aisle /aɪl/ (n): lối đi giữa các kệ hàng. E.g., The olive oil is in aisle four.
- discount /ˈdɪs.kaʊnt/ (n): giảm giá. E.g., There is a twenty percent discount on fresh apples.
- produce /ˈprɑː.duːs/ (n): nông sản, rau củ quả tươi. E.g., Our grocery store receives fresh local produce every morning.
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

[00:25.50] Excuse me, do you also supply reusable canvas shopping bags here? {Excuse:0, me:400, do:700, you:900, also:1100, supply:1400, reusable:2000, canvas:2600, shopping:3100, bags:3600, here:4100}
:: Việt: Xin lỗi, ở đây các bạn có bán túi vải mua sắm tái sử dụng không?

[00:30.80] Yes, eco-friendly shopping bags are hanging by register three for two dollars each. {Yes:0, eco-friendly:500, shopping:1300, bags:1700, are:2000, hanging:2200, by:2700, register:2900, three:3400, for:3800, two:4100, dollars:4400, each:4900}
:: Việt: Có ạ, những chiếc túi thân thiện với môi trường được treo cạnh quầy thu ngân số ba với giá hai đô la mỗi chiếc.

[00:36.50] Great, do the registers accept contactless mobile payment like Apple Pay? {Great:0, do:600, the:800, registers:1000, accept:1600, contactless:2100, mobile:2800, payment:3300, like:3800, Apple:4100, Pay:4500}
:: Việt: Tuyệt, các quầy thu ngân có chấp nhận thanh toán không tiếp xúc trên điện thoại như Apple Pay không?

[00:42.00] Yes, all registers accept mobile wallets, credit cards, and cash. {Yes:0, all:500, registers:800, accept:1400, mobile:1900, wallets:2300, credit:2800, cards:3200, and:3700, cash:4000}
:: Việt: Vâng, tất cả các quầy đều chấp nhận ví điện tử di động, thẻ tín dụng và tiền mặt.

# QUIZ
Q1: Where can the shopper locate the fresh organic tomatoes?
* [ ] In the dairy freezer section
* [ ] Near the bakery corner
* [ ] Next to the customer service counter
* [x] In the produce section right in aisle two
-- Explanation: The clerk states: "They are in the produce section right in aisle two."

Q2: What special promotional offer is available in the store today?
* [x] Buy two cartons of strawberries, get one free
* [ ] Half-price on all organic dairy milk cartons
* [ ] Twenty percent discount on olive oil bottles
* [ ] Free delivery on purchases over thirty dollars
-- Explanation: The staff announces: "If you buy two cartons of strawberries, you get one free."

Q3: Where are the eco-friendly reusable shopping bags situated?
* [ ] In the outdoor cart corral
* [x] Hanging by register three for two dollars each
* [ ] Inside the store manager's office
* [ ] At the store exit dispenser
-- Explanation: The employee replies: "eco-friendly shopping bags are hanging by register three for two dollars each."

Q4: What payment methods are accepted at the store's checkout registers?
* [ ] Cash and personal checks only
* [ ] Store gift vouchers exclusively
* [x] Mobile wallets, credit cards, and cash
* [ ] Cryptocurrency transactions only
-- Explanation: The staff confirms: "Yes, all registers accept mobile wallets, credit cards, and cash."
`;

const LESSON_A1_005_MD = `---
id: listen_a1_005
title: "Booking a Doctor's Routine Check-up Appointment"
level: "Easy"
duration: "0:50"
category: "Healthcare"
accent: "en-US"
tags: ["Doctor", "Healthcare", "Appointment", "Beginner"]
---

# VOCABULARY
- appointment /əˈpɔɪnt.mənt/ (n): cuộc hẹn. E.g., I have a medical appointment on Wednesday morning.
- symptom /ˈsɪmp.təm/ (n): triệu chứng. E.g., Do you have any fever or headache symptoms?
- insurance /ɪnˈʃʊr.əns/ (n): bảo hiểm. E.g., Please bring your health insurance card.
- prescription /prɪˈskrɪp.ʃən/ (n): đơn thuốc. E.g., The doctor wrote a prescription for the pain.
- fasting /ˈfæst.ɪŋ/ (n): việc nhịn ăn (trước xét nghiệm y tế). E.g., Fasting is required for eight hours before cholesterol blood tests.

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

[00:28.00] Do I need to fast before the appointment for any routine blood work? {Do:0, I:200, need:400, to:600, fast:800, before:1200, the:1500, appointment:1800, for:2400, any:2600, routine:2900, blood:3400, work:3800}
:: Việt: Tôi có cần phải nhịn ăn trước buổi hẹn để xét nghiệm máu định kỳ không?

[00:33.20] Yes, please refrain from eating solid food for eight hours prior to your visit; drinking water is fine. {Yes:0, please:500, refrain:900, from:1300, eating:1600, solid:2000, food:2400, for:2800, eight:3100, hours:3400, prior:3900, to:4200, your:4400, visit:4700, drinking:5300, water:5700, is:6100, fine:6400}
:: Việt: Vâng, xin vui lòng không ăn thức ăn đặc trong tám tiếng trước buổi khám; uống nước lọc thì được ạ.

[00:40.00] Got it. Where can patients park their vehicles at the medical center? {Got:0, it:300, Where:800, can:1100, patients:1400, park:1900, their:2200, vehicles:2500, at:3000, the:3200, medical:3400, center:3900}
:: Việt: Tôi hiểu rồi. Bệnh nhân có thể đỗ xe ở đâu tại trung tâm y tế?

[00:45.50] Free patient parking is available directly behind building B off Maple Avenue. {Free:0, patient:400, parking:800, is:1300, available:1500, directly:2000, behind:2500, building:3000, B:3500, off:3900, Maple:4200, Avenue:4700}
:: Việt: Khu đỗ xe miễn phí cho bệnh nhân nằm ngay sau tòa nhà B trên Đại lộ Maple.

# QUIZ
Q1: Which healthcare professional is the patient scheduling an appointment with?
* [x] Dr. Watson at City Health Clinic
* [ ] Dr. Johnson at General Surgery
* [ ] Dr. Peterson at Dental Care
* [ ] Dr. Davis at Pediatric Care
-- Explanation: The patient says: "I would like to schedule a routine health check-up with Dr. Watson."

Q2: When is the confirmed consultation time slot?
* [ ] Tuesday afternoon at two o'clock
* [x] This Thursday at ten o'clock in the morning
* [ ] Friday morning at eight o'clock
* [ ] Saturday evening at five o'clock
-- Explanation: The clinic receptionist states: "Dr. Watson has an open slot this Thursday at ten o'clock in the morning."

Q3: What medical preparation is requested regarding patient fasting?
* [ ] Eat a heavy breakfast two hours beforehand
* [ ] Refrain from drinking any liquids including water
* [x] Refrain from solid food for eight hours while water is permitted
* [ ] Fast for twenty-four hours without exceptions
-- Explanation: The receptionist says: "please refrain from eating solid food for eight hours prior to your visit; drinking water is fine."

Q4: Where is the free patient parking lot situated?
* [ ] Across the street at the commercial shopping plaza
* [ ] In the underground paid basement garage
* [ ] Along the curb on Main Street
* [x] Directly behind building B off Maple Avenue
-- Explanation: The clinic staff states: "Free patient parking is available directly behind building B off Maple Avenue."
`;

// === 2 CURATED ADVANCED (C1 - C2) MASTER EDITION LESSONS ===

const LESSON_C1_001_MD = `---
id: listen_c1_001
title: "Artificial Intelligence Ethics and Neural Model Governance"
level: "Hard"
duration: "1:15"
category: "Technology"
accent: "en-US"
tags: ["AI", "Technology", "Ethics", "Advanced", "C1"]
---

# VOCABULARY
- accountability /əˌkaʊn.t̬əˈbɪl.ə.t̬i/ (n): trách nhiệm giải trình. E.g., Algorithmic accountability is essential in public deployments.
- hallucination /həˌluː.səˈneɪ.ʃən/ (n): ảo giác (khi mô hình AI bịa đặt thông tin). E.g., Mitigating factual hallucinations remains a paramount challenge.
- telemetry /təˈlem.ə.tri/ (n): dữ liệu đo đạc từ xa. E.g., Real-time telemetry detects inference latency spikes.
- alignment /əˈlaɪn.mənt/ (n): sự căn chỉnh (phù hợp giá trị con người). E.g., Value alignment ensures artificial systems respect human dignity.
- red-teaming /ˈredˌtiː.mɪŋ/ (n): kiểm thử tấn công giả lập (tìm lỗ hổng bảo mật/đạo đức AI). E.g., Rigorous red-teaming identifies jailbreak vulnerabilities before release.

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

[00:37.00] Open-source transparency initiatives empower independent researchers to audit model weights and benchmark latent risks. {Open-source:0, transparency:900, initiatives:1700, empower:2400, independent:3000, researchers:3700, to:4400, audit:4600, model:5100, weights:5500, and:5900, benchmark:6200, latent:6900, risks:7400}
:: Việt: Các sáng kiến minh bạch nguồn mở trao quyền cho các nhà nghiên cứu độc lập kiểm toán trọng số mô hình và đánh giá các rủi ro tiềm ẩn.

[00:44.80] Without standardized lineage tracking for training corpora, proprietary architectures remain opaque black-box systems. {Without:0, standardized:500, lineage:1300, tracking:1800, for:2300, training:2500, corpora:3100, proprietary:3700, architectures:4400, remain:5200, opaque:5700, black-box:6300, systems:7000}
:: Việt: Nếu thiếu cơ chế theo dõi nguồn gốc chuẩn hóa cho kho ngữ liệu huấn luyện, các kiến trúc độc quyền sẽ mãi là những hệ thống hộp đen mờ ám.

[00:52.50] International regulatory bodies are converging on mandatory red-teaming protocols prior to commercial deployment. {International:0, regulatory:800, bodies:1500, are:2000, converging:2200, on:2900, mandatory:3100, red-teaming:3800, protocols:4500, prior:5200, to:5600, commercial:5800, deployment:6500}
:: Việt: Các cơ quan quản lý quốc tế đang đồng thuận về các quy trình kiểm thử tấn công giả lập bắt buộc trước khi triển khai thương mại.

[01:00.20] Engineers and policy ethicists must collaborate closely to ensure automated agents strictly adhere to human core values. {Engineers:0, and:700, policy:900, ethicists:1400, must:2100, collaborate:2400, closely:3100, to:3600, ensure:3800, automated:4300, agents:4900, strictly:5400, adhere:5900, to:6400, human:6600, core:7100, values:7500}
:: Việt: Các kỹ sư và chuyên gia đạo đức chính sách phải hợp tác chặt chẽ để đảm bảo các tác tử tự động tuân thủ nghiêm ngặt các giá trị cốt lõi của con người.

[01:08.50] Ultimately, responsible artificial intelligence development balances relentless technical innovation with societal welfare safeguards. {Ultimately:0, responsible:900, artificial:1700, intelligence:2300, development:3000, balances:3800, relentless:4400, technical:5100, innovation:5700, with:6400, societal:6700, welfare:7300, safeguards:7800}
:: Việt: Suy cho cùng, việc phát triển trí tuệ nhân tạo có trách nhiệm phải cân bằng giữa sự đổi mới công nghệ không ngừng và các lá chắn bảo vệ phúc lợi xã hội.

# QUIZ
Q1: What does the speaker argue about neural architecture interpretability?
* [ ] It is completely trivial for practical enterprise software
* [x] It cannot remain an afterthought in mission-critical decision making
* [ ] It should only be evaluated after complete product failure
* [ ] It emerges spontaneously without human intervention
-- Explanation: The speaker emphasizes: "When autonomous neural architectures generate mission-critical decisions, interpretability cannot remain an afterthought."

Q2: Which mechanism significantly reinforces robust model alignment according to empirical findings?
* [ ] Restricting model deployment exclusively to defense agencies
* [ ] Disabling real-time telemetry logging and monitoring
* [x] Continuous adversarial auditing
* [ ] Reducing dataset training parameters drastically
-- Explanation: The transcript explicitly states: "Comprehensive empirical evaluation demonstrates that continuous adversarial auditing significantly reinforces robust alignment."

Q3: What risk arises if training corpora lack standardized lineage tracking?
* [ ] Compute costs will double every consecutive week
* [ ] Neural weights will spontaneously erase themselves
* [ ] Hardware cooling systems suffer critical overheating
* [x] Proprietary architectures remain opaque black-box systems
-- Explanation: The speaker explains: "Without standardized lineage tracking for training corpora, proprietary architectures remain opaque black-box systems."

Q4: What does responsible artificial intelligence development ultimately seek to balance?
* [x] Relentless technical innovation with societal welfare safeguards
* [ ] Maximum enterprise profitability with minimal public taxation
* [ ] Unlimited computational capacity with proprietary secrecy
* [ ] Rapid product iteration with elimination of legal compliance
-- Explanation: The conclusion states: "Ultimately, responsible artificial intelligence development balances relentless technical innovation with societal welfare safeguards."
`;

const LESSON_C1_002_MD = `---
id: listen_c1_002
title: "Central Bank Monetary Policy and Macroeconomic Volatility"
level: "Hard"
duration: "1:18"
category: "Finance"
accent: "en-GB"
tags: ["Finance", "Economics", "Monetary Policy", "Advanced", "C1"]
---

# VOCABULARY
- hawkish /ˈhɔː.kɪʃ/ (adj): chủ trương thắt chặt tiền tệ, tăng lãi suất. E.g., The central bank signaled a hawkish stance to curb inflation.
- liquidity /lɪˈkwɪd.ə.t̬i/ (n): tính thanh khoản. E.g., Quantitative tightening drains excess liquidity from capital markets.
- stagflation /stæɡˈfleɪ.ʃən/ (n): lạm phát đình đốn. E.g., Policymakers dread the specter of persistent stagflation.
- yields /jiːldz/ (n): lợi suất trái phiếu. E.g., Treasury bond yields climbed sharply across all maturities.
- inversion /ɪnˈvɝː.ʒən/ (n): sự đảo ngược (đường cong lợi suất). E.g., Yield curve inversion is historically a harbinger of economic recession.

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

[00:39.00] Sovereign bond yield curves have inverted, signaling deep apprehensions about impending recessionary headwinds. {Sovereign:0, bond:700, yield:1100, curves:1500, have:2000, inverted:2300, signaling:3000, deep:3600, apprehensions:4000, about:4800, impending:5300, recessionary:6000, headwinds:6800}
:: Việt: Đường cong lợi suất trái phiếu chính phủ đã đảo ngược, báo hiệu những lo ngại sâu sắc về các cơn gió ngược suy thoái sắp tới.

[00:46.80] Institutional asset managers are recalibrating portfolio allocations toward defensive fixed-income instruments. {Institutional:0, asset:900, managers:1300, are:1900, recalibrating:2100, portfolio:2900, allocations:3500, toward:4200, defensive:4600, fixed-income:5300, instruments:6200}
:: Việt: Các nhà quản lý tài sản tổ chức đang tái cơ cấu phân bổ danh mục đầu tư sang các công cụ thu nhập cố định mang tính phòng thủ.

[00:54.50] Currency depreciations against the benchmark reserve asset exacerbate imported inflation for developing trade partners. {Currency:0, depreciations:600, against:1400, the:1800, benchmark:2000, reserve:2600, asset:3100, exacerbate:3600, imported:4300, inflation:4800, for:5400, developing:5700, trade:6300, partners:6700}
:: Việt: Đồng nội tệ mất giá so với tài sản dự trữ chuẩn làm trầm trọng thêm tình trạng lạm phát nhập khẩu đối với các đối tác thương mại đang phát triển.

[01:02.20] Financial stability oversight councils are vigilantly monitoring systemic vulnerabilities across non-bank shadow lenders. {Financial:0, stability:600, oversight:1200, councils:1700, are:2200, vigilantly:2500, monitoring:3200, systemic:3800, vulnerabilities:4400, across:5200, non-bank:5600, shadow:6300, lenders:6800}
:: Việt: Các hội đồng giám sát ổn định tài chính đang cảnh giác theo dõi các lỗ hổng mang tính hệ thống trong các tổ chức tín dụng đen phi ngân hàng.

[01:10.00] Achieving a resilient soft landing demands delicate calibration between inflation containment and sustainable employment growth. {Achieving:0, a:600, resilient:800, soft:1400, landing:1800, demands:2400, delicate:3000, calibration:3600, between:4300, inflation:4800, containment:5400, and:6200, sustainable:6400, employment:7100, growth:7800}
:: Việt: Để đạt được cú hạ cánh mềm vững chắc đòi hỏi sự cân chỉnh tinh tế giữa việc kiềm chế lạm phát và duy trì tăng trưởng việc làm bền vững.

# QUIZ
Q1: What is the main objective of central banks implementing aggressive interest rate hikes?
* [ ] To encourage unrestricted commercial credit expansion
* [ ] To devalue domestic currency reserves artificially
* [x] To compress aggregate demand and stabilize exchange volatilities
* [ ] To inflate real estate asset valuations across capital cities
-- Explanation: The speaker explains: "Aggressive interest rate hikes intend to compress aggregate consumer demand and stabilize foreign exchange volatilities."

Q2: What major cross-border hazard arises from synchronized global monetary tightening?
* [ ] Sudden hyperinflation in sovereign central bank headquarters
* [ ] Total collapse of digital banking internet infrastructure
* [ ] Rapid increase in consumer retail luxury spending
* [x] Capital flight from emerging sovereign debt markets
-- Explanation: The speaker warns: "...excessively synchronized global contraction risks precipitating capital flight from emerging sovereign debt markets."

Q3: What economic indicator does the inverted sovereign bond yield curve signal?
* [x] Deep apprehensions about impending recessionary headwinds
* [ ] Unprecedented industrial productivity surges
* [ ] Complete elimination of federal sovereign budget deficits
* [ ] Rapid acceleration of speculative cryptocurrency trading
-- Explanation: The speaker notes: "Sovereign bond yield curves have inverted, signaling deep apprehensions about impending recessionary headwinds."

Q4: What delicate balance is required to orchestrate a resilient economic soft landing?
* [ ] Between gold reserve accumulation and currency devaluation
* [x] Between inflation containment and sustainable employment growth
* [ ] Between stock market speculation and venture capital deregulation
* [ ] Between commercial bank closures and public tax hikes
-- Explanation: The speaker notes: "Achieving a resilient soft landing demands delicate calibration between inflation containment and sustainable employment growth."
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

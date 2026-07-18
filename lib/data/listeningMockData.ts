import { parseListeningMarkdown, ListeningLesson } from "../utils/listeningParser";

const LESSON_1_MD = `---
id: listen_001
title: "Office Relocation Announcement"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "0:45"
category: "Business"
tags: ["Office", "Relocation", "TOEIC"]
---

# VOCABULARY
- relocate /ˌriː.loʊˈkeɪt/ (v): di dời, chuyển chỗ. E.g., The marketing team will relocate next Monday.
- belonging /bɪˈlɔːŋ.ɪŋ/ (n): đồ dùng cá nhân. E.g., Please pack all your personal belongings.
- renovation /ˌren.əˈveɪ.ʃən/ (n): sự tu sửa, cải tạo. E.g., The third floor is undergoing major renovation.
- elevator /ˈel.ə.veɪ.t̬ɚ/ (n): thang máy. E.g., The east side elevators are out of service.

# TRANSCRIPT
[00:00.00] Attention all employees. {Attention:0, all:400, employees:850}
:: Việt: Xin chú ý, toàn thể nhân viên.

[00:02.50] Due to the upcoming renovation of the third floor, all staff members working there will be temporarily relocated to the second floor. {Due:0, to:300, the:500, upcoming:750, renovation:1400, of:2100, the:2350, third:2650, floor:3100, all:3800, staff:4150, members:4500, working:5000, there:5500, will:5800, be:6100, temporarily:6400, relocated:7500, to:8300, the:8500, second:8800, floor:9300}
:: Việt: Do đợt tu sửa sắp tới ở tầng ba, toàn bộ nhân viên làm việc tại đây sẽ tạm thời di dời xuống tầng hai.

[00:13.00] Please make sure to pack your personal belongings by Friday afternoon. {Please:0, make:400, sure:700, to:1000, pack:1200, your:1600, personal:1900, belongings:2600, by:3400, Friday:3700, afternoon:4300}
:: Việt: Xin hãy đảm bảo đóng gói các đồ dùng cá nhân trước chiều Thứ Sáu.

[00:19.00] The renovation is expected to take approximately three weeks. {The:0, renovation:300, is:1000, expected:1300, to:1800, take:2000, approximately:2400, three:3400, weeks:3800}
:: Việt: Quá trình tu sửa dự kiến sẽ kéo dài khoảng ba tuần.

[00:24.00] During this time, the elevators on the east side of the building will be out of service. {During:0, this:400, time:750, the:1200, elevators:1500, on:2300, the:2500, east:2800, side:3350, of:3700, the:3900, building:4200, will:4800, be:5050, out:5300, of:5550, service:5800}
:: Việt: Trong suốt thời gian này, các thang máy ở phía đông tòa nhà sẽ tạm ngừng hoạt động.

[00:32.00] We apologize for any inconvenience. {We:0, apologize:400, for:1000, any:1300, inconvenience:1600}
:: Việt: Chúng tôi vô cùng xin lỗi vì sự bất tiện này.

# QUIZ
Q1: What is happening on the third floor?
* [ ] A staff meeting
* [x] A renovation
* [ ] A retirement party
* [ ] An electrical inspection
-- Explanation: The speaker says "Due to the upcoming renovation of the third floor..."

Q2: When should employees pack their belongings?
* [ ] Monday morning
* [ ] Wednesday evening
* [x] Friday afternoon
* [ ] Sunday night
-- Explanation: The speaker says "Please make sure to pack your personal belongings by Friday afternoon."

Q3: How long will the elevator service be interrupted?
* [ ] One week
* [ ] Two weeks
* [x] Three weeks
* [ ] Four weeks
-- Explanation: The speaker states the renovation takes approximately three weeks, during which the elevators will be out of service.
`;

const LESSON_2_MD = `---
id: listen_002
title: "Flight Captain Announcement"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
level: "Easy"
duration: "0:35"
category: "Travel"
tags: ["Flight", "Airport", "Captain"]
---

# VOCABULARY
- altitude /ˈæl.tə.tuːd/ (n): độ cao (so với mực nước biển). E.g., The plane is cruising at an altitude of 35,000 feet.
- estimated /ˈes.tə.meɪ.t̬ɪd/ (adj): ước tính. E.g., Our estimated arrival time is 2:15 PM.
- descent /dɪˈsent/ (n): sự đi xuống, hạ cánh. E.g., We will begin our descent in one hour.
- fasten /ˈfæs.ən/ (v): thắt chặt, đóng lại. E.g., Please remain seated with your seatbelts fastened.

# TRANSCRIPT
[00:00.00] Good morning, passengers. This is your captain speaking. {Good:0, morning:300, passengers:800, This:1500, is:1800, your:2000, captain:2300, speaking:2900}
:: Việt: Kính chào quý hành khách. Đây là cơ trưởng của quý vị đang nói chuyện.

[00:04.50] We are currently cruising at an altitude of thirty-five thousand feet. {We:0, are:250, currently:500, cruising:1000, at:1600, an:1800, altitude:2000, of:2600, thirty-five:2900, thousand:3600, feet:4000}
:: Việt: Hiện tại chúng ta đang bay ở độ cao ổn định ba mươi lăm nghìn feet.

[00:10.50] Our estimated arrival time in Tokyo is two fifteen local time. {Our:0, estimated:300, arrival:900, time:1400, in:1700, Tokyo:1950, is:2500, two:2800, fifteen:3300, local:3900, time:4400}
:: Việt: Thời gian hạ cánh dự kiến của chúng ta ở Tokyo là hai giờ mười lăm phút theo giờ địa phương.

[00:17.00] The weather at our destination is partly cloudy with a temperature of twenty-two degrees. {The:0, weather:300, at:700, our:950, destination:1200, is:1950, partly:2200, cloudy:2700, with:3200, a:3400, temperature:3650, of:4300, twenty-two:4550, degrees:5300}
:: Việt: Thời tiết tại điểm đến đang nhiều mây rải rác với nhiệt độ hai mươi hai độ C.

[00:24.00] We will begin our descent in approximately one hour. {We:0, will:300, begin:550, our:950, descent:1200, in:1750, approximately:2000, one:3000, hour:3450}
:: Việt: Chúng ta sẽ bắt đầu giảm độ cao để hạ cánh trong khoảng một giờ nữa.

[00:29.00] Please remain seated with your seatbelts fastened. {Please:0, remain:350, seated:850, with:1350, your:1550, seatbelts:1800, fastened:2450}
:: Việt: Xin vui lòng giữ nguyên vị trí ngồi và thắt chặt dây an toàn.

# QUIZ
Q1: Where is the flight heading?
* [ ] London
* [x] Tokyo
* [ ] Sydney
* [ ] Paris
-- Explanation: The captain mentions "Our estimated arrival time in Tokyo is..."

Q2: What is the weather like at the destination?
* [ ] Rainy
* [ ] Sunny and warm
* [x] Partly cloudy
* [ ] Extremely cold and snowy
-- Explanation: The captain says "The weather at our destination is partly cloudy..."

Q3: When will the plane begin to descend?
* [ ] In 15 minutes
* [ ] In 30 minutes
* [ ] In 45 minutes
* [x] In about 1 hour
-- Explanation: The captain explicitly states "We will begin our descent in approximately one hour."
`;

const LESSON_3_MD = `---
id: listen_003
title: "Store Promotions at GreenMart"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
level: "Hard"
duration: "0:30"
category: "Shopping"
tags: ["Store", "Deals", "Groceries"]
---

# VOCABULARY
- organic /ɔːrˈɡæn.ɪk/ (adj): hữu cơ. E.g., We are offering organic vegetables.
- loyalty /ˈlɔɪ.əl.t̬i/ (n): sự trung thành (chương trình thành viên). E.g., Members of our loyalty program receive discounts.
- dairy /ˈder.i/ (n): sản phẩm làm từ sữa. E.g., Get an extra discount on dairy products.
- available /əˈveɪ.lə.bəl/ (adj): có sẵn, sẵn có. E.g., Freshly baked bread is available every morning.

# TRANSCRIPT
[00:00.00] Welcome to GreenMart! This weekend only, we are offering a special deal. {Welcome:0, to:400, GreenMart:700, This:1500, weekend:2000, only:2600, we:3100, are:3300, offering:3550, a:4000, special:4200, deal:4750}
:: Việt: Chào mừng quý khách đến với GreenMart! Chỉ trong cuối tuần này, chúng tôi mang tới một ưu đãi đặc biệt.

[00:06.00] Enjoy a buy one get one free offer on all organic vegetables. {Enjoy:0, a:300, buy:500, one:800, get:1150, one:1400, free:1700, offer:2100, on:2500, all:2750, organic:3100, vegetables:3800}
:: Việt: Tận hưởng ưu đãi mua một tặng một đối với tất cả các loại rau củ hữu cơ.

[00:11.50] Additionally, loyalty members receive an extra fifteen percent discount on dairy. {Additionally:0, loyalty:900, members:1550, receive:2000, an:2400, extra:2600, fifteen:3100, percent:3700, discount:4200, on:4800, dairy:5100}
:: Việt: Ngoài ra, các thành viên thân thiết sẽ được giảm giá thêm mười lăm phần trăm cho các sản phẩm sữa.

[00:18.00] Don't forget to check out our new bakery section for freshly baked bread. {Don't:0, forget:250, to:600, check:800, out:1100, our:1300, new:1500, bakery:1800, section:2300, for:2800, freshly:3050, baked:3600, bread:4000}
:: Việt: Đừng quên ghé thăm khu quầy bánh mới để thưởng thức những ổ bánh mì mới ra lò.

[00:23.00] We look forward to serving you this weekend. {We:0, look:250, forward:500, to:900, serving:1100, you:1500, this:1700, weekend:2000}
:: Việt: Chúng tôi rất mong được phục vụ quý khách trong cuối tuần này.

# QUIZ
Q1: What is the special deal on organic vegetables?
* [ ] 20% discount
* [ ] 50% discount
* [x] Buy one get one free
* [ ] Free delivery
-- Explanation: The speaker announces "Enjoy a buy one get one free offer on all organic vegetables."

Q2: Which products get an extra discount for loyalty members?
* [ ] Organic vegetables
* [ ] Bakery items
* [x] Dairy products
* [ ] Fresh meat
-- Explanation: The speaker mentions "loyalty members receive an extra fifteen percent discount on dairy."

Q3: What new store section is mentioned in the announcement?
* [ ] Seafood section
* [x] Bakery section
* [ ] Frozen food section
* [ ] Organic cosmetics
-- Explanation: The speaker says "Don't forget to check out our new bakery section..."
`;

export const MOCK_LESSONS_DATA: ListeningLesson[] = [
  parseListeningMarkdown(LESSON_1_MD),
  parseListeningMarkdown(LESSON_2_MD),
  parseListeningMarkdown(LESSON_3_MD)
];

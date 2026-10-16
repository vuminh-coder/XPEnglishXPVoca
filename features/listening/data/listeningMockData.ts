import { parseListeningMarkdown, ListeningLesson } from "../utils/listeningParser";
import { EXTENDED_SHADOWING_LESSONS } from "@/features/shadowing/data/extendedShadowingData";
import { ensureExtendedLessons } from "../utils/extendedTranscriptEngine";
import { CURATED_LEVEL_LESSONS } from "./curatedLevelLessons";

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
* [x] A renovation
* [ ] A staff meeting
* [ ] A retirement party
* [ ] An electrical inspection
-- Explanation: The speaker says "Due to the upcoming renovation of the third floor..."

Q2: When should employees pack their belongings?
* [ ] Monday morning
* [x] Friday afternoon
* [ ] Wednesday evening
* [ ] Sunday night
-- Explanation: The speaker says "Please make sure to pack your personal belongings by Friday afternoon."

Q3: How long will the elevator service be interrupted?
* [ ] One week
* [ ] Two weeks
* [x] Three weeks
* [ ] Four weeks
-- Explanation: The speaker states the renovation takes approximately three weeks, during which the elevators will be out of service.`;

const LESSON_2_MD = `---
id: listen_002
title: "Flight Captain Announcement"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
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
* [ ] Sydney
* [ ] Paris
* [x] Tokyo
-- Explanation: The captain mentions "Our estimated arrival time in Tokyo is..."

Q2: What is the weather like at the destination?
* [x] Partly cloudy
* [ ] Rainy
* [ ] Sunny and warm
* [ ] Extremely cold and snowy
-- Explanation: The captain says "The weather at our destination is partly cloudy..."

Q3: When will the plane begin to descend?
* [ ] In 15 minutes
* [x] In about 1 hour
* [ ] In 30 minutes
* [ ] In 45 minutes
-- Explanation: The captain explicitly states "We will begin our descent in approximately one hour."`;

const LESSON_3_MD = `---
id: listen_003
title: "Store Promotions at GreenMart"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
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
* [ ] Fresh meat
* [x] Dairy products
-- Explanation: The speaker mentions "loyalty members receive an extra fifteen percent discount on dairy."

Q3: What new store section is mentioned in the announcement?
* [x] Bakery section
* [ ] Seafood section
* [ ] Frozen food section
* [ ] Organic cosmetics
-- Explanation: The speaker says "Don't forget to check out our new bakery section..."`;

export const LESSON_Q3_MD = `---
id: listen_toeic_q3_001
title: "Q3 Marketing Strategy & Customer Response Times"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:21"
category: "TOEIC Part 4"
tags: ["Business", "Marketing", "Strategy"]
---

# VOCABULARY
- strategy /ˈstræt.ə.dʒi/ (n): chiến lược. E.g., We need a solid Q3 marketing strategy.
- engagement /ɪnˈɡeɪdʒ.mənt/ (n): sự tương tác, đính ước. E.g., The campaign increased engagement across all platforms.
- efficiency /ɪˈfɪʃ.ən.si/ (n): hiệu suất, hiệu quả công việc. E.g., Let's brainstorm ways to improve our efficiency.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ quy chuẩn pháp lý. E.g., All departments must ensure strict regulatory compliance.

# TRANSCRIPT
[00:00.00] Good morning, team. We have a lot to cover regarding our Q3 marketing strategy.
:: Việt: Chào buổi sáng cả đội. Chúng ta có rất nhiều việc cần giải quyết liên quan đến chiến lược marketing Quý 3.

[00:04.20] Our recent campaign saw a fifteen percent increase in engagement across all platforms.
:: Việt: Chiến dịch gần đây của chúng ta đã ghi nhận mức tăng 15% về lượng tương tác trên tất cả các nền tảng.

[00:09.50] However, we need to address the feedback regarding our customer response times.
:: Việt: Tuy nhiên, chúng ta cần xử lý các phản hồi liên quan đến thời gian phản hồi khách hàng.

[00:14.30] Let's brainstorm ways to improve our efficiency before the next quarterly review.
:: Việt: Hãy cùng thảo luận các cách để cải thiện hiệu suất làm việc trước kỳ đánh giá quý tiếp theo.

# QUIZ
Q1: What saw a 15% increase recently?
* [ ] Customer response times
* [x] Engagement across platforms
* [ ] Overall budget
* [ ] Employee turnover rate
-- Explanation: The speaker mentions "a fifteen percent increase in engagement across all platforms."

Q2: What issue needs to be addressed?
* [ ] Product pricing
* [ ] Staff salaries
* [x] Customer response times
* [ ] Office renovation
-- Explanation: The transcript states "we need to address the feedback regarding our customer response times."

Q3: What does the speaker suggest doing?
* [ ] Cancel all scheduled project activities
* [ ] Hire external management consultants
* [ ] Delay the discussion until next fiscal year
* [x] Brainstorm ways to improve our efficiency before the next quarterly review
-- Explanation: The speaker states: "Let's brainstorm ways to improve our efficiency before the next quarterly review.".`;

export const LESSON_Q3_001_MD = LESSON_Q3_MD;

export const LESSON_Q3_002_MD = `---
id: listen_toeic_q3_002
title: "Product Launch Event & Customer Feedback Analysis"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["Business", "Product Launch", "Feedback"]
---

# VOCABULARY
- launch /lɔːntʃ/ (v, n): ra mắt, sự ra mắt sản phẩm. E.g., The official launch event will take place next month.
- survey /ˈsɜː.veɪ/ (n): cuộc khảo sát. E.g., We collected data through a customer satisfaction survey.
- feature /ˈfiː.tʃər/ (n): tính năng, đặc điểm. E.g., Users really like the new security feature.
- protocol /ˈproʊ.t̬ə.kɑːl/ (n): quy trình, nghi thức chuẩn mực. E.g., Emergency safety protocols must be reviewed annually.

# TRANSCRIPT
[00:00.00] Welcome everyone. Today I'd like to review the results from our recent product launch.
:: Việt: Chào mừng mọi người. Hôm nay tôi muốn điểm lại các kết quả từ đợt ra mắt sản phẩm gần đây của chúng ta.

[00:04.50] Overall, initial sales exceeded our expectations by twenty percent in the first week.
:: Việt: Nhìn chung, doanh số ban đầu đã vượt kỳ vọng của chúng ta 20% trong tuần đầu tiên.

[00:09.80] However, several customers reported minor bugs in the user interface during setup.
:: Việt: Tuy nhiên, một số khách hàng đã báo cáo các lỗi nhỏ ở giao diện người dùng trong quá trình cài đặt.

[00:15.20] Our technical team is currently preparing a software update to resolve these issues promptly.
:: Việt: Đội ngũ kỹ thuật của chúng ta hiện đang chuẩn bị một bản cập nhật phần mềm để xử lý dứt điểm các vấn đề này nhanh chóng.

# QUIZ
Q1: How did the initial sales perform compared to expectations?
* [x] They exceeded expectations by 20%
* [ ] They dropped by 20%
* [ ] They remained unchanged
* [ ] They failed to reach the target
-- Explanation: The speaker states that initial sales exceeded expectations by twenty percent in the first week.

Q2: What is the technical team doing to fix the issues?
* [ ] Hiring more support staff
* [x] Preparing a software update
* [ ] Recalling the product completely
* [ ] Offering full refunds to customers
-- Explanation: The transcript explicitly mentions that the technical team is preparing a software update to resolve the issues.

Q3: What issue was reported according to the speaker?
* [ ] Complete hardware motherboard failures
* [ ] Severe billing errors in billing accounts
* [x] Minor bugs in the user interface
* [ ] Loss of customer database credentials
-- Explanation: The speaker explains: "However, several customers reported minor bugs in the user interface during setup.".`;

export const LESSON_Q3_003_MD = `---
id: listen_toeic_q3_003
title: "Customer Support Training & System Upgrade"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Business", "Customer Support", "IT"]
---

# VOCABULARY
- system upgrade /ˈsɪs.təm ʌp.ɡreɪd/ (n): sự nâng cấp hệ thống. E.g., The scheduled system upgrade will take place this weekend.
- representative /ˌrep.rɪˈzen.tə.tɪv/ (n): đại diện (chăm sóc khách hàng). E.g., Our customer service representatives are available 24/7.
- navigate /ˈnæv.ɪ.ɡeɪt/ (v): định hướng, điều hướng (sử dụng phần mềm/website). E.g., The new portal makes it easier for users to navigate.
- initiative /ɪˈnɪʃ.ə.t̬ɪv/ (n): sáng kiến đổi mới. E.g., Management launched a green initiative to reduce corporate carbon footprints.

# TRANSCRIPT
[00:00.00] Good afternoon team, I have an important update regarding our support ticketing system.
:: Việt: Chào buổi chiều cả đội, tôi có một cập nhật quan trọng liên quan đến hệ thống quản lý yêu cầu hỗ trợ của chúng ta.

[00:04.80] We are launching our new online support portal next Monday morning.
:: Việt: Chúng ta sẽ chính thức ra mắt cổng hỗ trợ trực tuyến mới vào sáng Thứ Hai tuần tới.

[00:09.50] All representatives must attend a mandatory thirty-minute training session tomorrow.
:: Việt: Tất cả đại diện chăm sóc khách hàng phải tham gia một buổi đào tạo bắt buộc kéo dài 30 phút vào ngày mai.

[00:15.10] This will ensure everyone knows how to navigate the updated database efficiently.
:: Việt: Điều này sẽ đảm bảo mọi người đều biết cách thao tác trên cơ sở dữ liệu mới cập nhật một cách hiệu quả.

# QUIZ
Q1: When will the new support portal be launched?
* [ ] Tomorrow morning
* [ ] This weekend
* [ ] At the end of the month
* [x] Next Monday morning
-- Explanation: The speaker explicitly announces that the new portal will be launched "next Monday morning."

Q2: What are the representatives required to do tomorrow?
* [x] Attend a 30-minute training session
* [ ] Submit their weekly reports
* [ ] Test the new software independently
* [ ] Take a day off from work
-- Explanation: The transcript states that all representatives must attend a mandatory thirty-minute training session tomorrow.

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [x] Ensure everyone knows how to navigate the updated database efficiently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "This will ensure everyone knows how to navigate the updated database efficiently.".`;

export const LESSON_Q3_004_MD = `---
id: listen_toeic_q3_004
title: "Annual Company Retreat & Location Announcement"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 2"
tags: ["Business", "HR", "Event"]
---

# VOCABULARY
- retreat /rɪˈtriːt/ (n): chuyến dã ngoại, đợt nghỉ dưỡng công ty. E.g., The annual staff retreat is scheduled for next month.
- venue /ˈven.juː/ (n): địa điểm tổ chức sự kiện. E.g., We have selected a seaside resort as our event venue.
- itinerary /aɪˈtɪn.ə.rer.i/ (n): lịch trình chuyến đi. E.g., HR will distribute the detailed itinerary by Thursday.
- efficiency /ɪˈfɪʃ.ən.si/ (n): tính hiệu quả, năng suất. E.g., Upgraded server hardware enhances internal operational efficiency.

# TRANSCRIPT
[00:00.00] Attention team, I am excited to announce the location for our annual company retreat.
:: Việt: Xin chú ý cả đội, tôi rất vui mừng được thông báo địa điểm cho chuyến nghỉ dưỡng hàng năm của công ty chúng ta.

[00:04.90] This year, we will be staying at the Grand Beach Resort in Danang for three days.
:: Việt: Năm nay, chúng ta sẽ ở tại Grand Beach Resort ở Đà Nẵng trong vòng ba ngày.

[00:09.80] The event is scheduled for the second week of September to promote team building.
:: Việt: Sự kiện được lên lịch vào tuần thứ hai của tháng 9 nhằm thúc đẩy tinh thần đoàn kết đồng đội.

[00:15.30] Human Resources will send out the detailed itinerary and flight details by Friday.
:: Việt: Phòng Nhân sự sẽ gửi lịch trình chi tiết và thông tin chuyến bay trước Thứ Sáu.

# QUIZ
Q1: Where will the annual retreat take place this year?
* [ ] At a mountain resort in Sapa
* [ ] In a conference center in Hanoi
* [x] At the Grand Beach Resort in Danang
* [ ] At the company headquarters
-- Explanation: The speaker mentions that they will be staying at the Grand Beach Resort in Danang.

Q2: What will Human Resources send by Friday?
* [ ] The flight tickets only
* [ ] The survey forms
* [ ] The budget report
* [x] The detailed itinerary and flight details
-- Explanation: The transcript states that HR will send out the detailed itinerary and flight details by Friday.

Q3: When is the event, operation, or interview scheduled?
* [x] The second week of September
* [ ] Next Friday at 5:00 PM
* [ ] At the end of the next quarter
* [ ] Early tomorrow morning
-- Explanation: The speaker states: "The event is scheduled for the second week of September to promote team building.".`;

export const LESSON_Q3_005_MD = `---
id: listen_toeic_q3_005
title: "Quarterly Budget Review & Expense Policy Update"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["Finance", "Business", "Policy"]
---

# VOCABULARY
- expenditure /ɪkˈspen.dɪ.tʃər/ (n): chi phí, sự tiêu dùng. E.g., We need to reduce unnecessary travel expenditures.
- reimbursement /ˌriː.ɪmˈbɜːs.mənt/ (n): sự hoàn tiền, khoản thanh toán lại. E.g., Submit all receipts to claim your reimbursement.
- policy /ˈpɑː.lə.si/ (n): quy định, chính sách. E.g., The revised travel policy will take effect next month.
- confidentiality /ˌkɑːn.fə.den.ʃiˈæl.ə.t̬i/ (n): tính bảo mật thông tin. E.g., Staff signed non-disclosure agreements to preserve client confidentiality.

# TRANSCRIPT
[00:00.00] Good morning everyone, I have a quick update regarding our department's quarterly budget.
:: Việt: Chào buổi sáng mọi người, tôi có thông tin cập nhật nhanh liên quan đến ngân sách quý của phòng ban chúng ta.

[00:04.60] Due to increased operational costs, we are revising our business travel reimbursement policy.
:: Việt: Do chi phí vận hành tăng lên, chúng ta đang sửa đổi chính sách hoàn trả chi phí công tác.

[00:09.90] Starting next month, all expense receipts must be submitted within five business days.
:: Việt: Bắt đầu từ tháng tới, tất cả hóa đơn chi tiêu phải được nộp trong vòng năm ngày làm việc.

[00:15.30] Late submissions will require approval from the regional finance director before processing.
:: Việt: Các trường hợp nộp trễ sẽ cần sự phê duyệt từ Giám đốc Tài chính khu vực trước khi được xử lý.

# QUIZ
Q1: Why is the reimbursement policy being revised?
* [ ] Due to a decrease in sales
* [x] Due to increased operational costs
* [ ] Because of a system error
* [ ] To hire new employees
-- Explanation: The Finance Manager states that the policy is being revised "due to increased operational costs."

Q2: Within how many days must receipts be submitted under the new policy?
* [ ] Three days
* [ ] Seven business days
* [x] Five business days
* [ ] Ten days
-- Explanation: The speaker explicitly mentions that "all expense receipts must be submitted within five business days."

Q3: Whose approval is required according to the speaker?
* [ ] The external building security contractor
* [ ] The junior human resources clerk
* [ ] A third-party logistics courier
* [x] The regional finance director
-- Explanation: The announcement explicitly states: "Late submissions will require approval from the regional finance director before processing.".`;

export const LESSON_Q3_006_MD = `---
id: listen_toeic_q3_006
title: "IT Security Guidelines & Password Policy"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:21"
category: "TOEIC Part 4"
tags: ["IT", "Security", "Policy"]
---

# VOCABULARY
- credential /krɪˈden.ʃəl/ (n): thông tin đăng nhập, chứng chỉ. E.g., Do not share your login credentials with anyone.
- unauthorized /ʌnˈɑː.θə.raɪzd/ (adj): không được phép, trái phép. E.g., Prevent unauthorized access to company files.
- mandatory /ˈmæn.də.tɔːr.i/ (adj): bắt buộc. E.g., Completing the security module is mandatory.
- collaboration /kəˌlæb.əˈreɪ.ʃən/ (n): sự hợp tác làm việc nhóm. E.g., Cross-functional collaboration accelerated the product development cycle.

# TRANSCRIPT
[00:00.00] Attention all employees, this is an important message from the IT department.
:: Việt: Xin chú ý tới tất cả nhân viên, đây là thông báo quan trọng từ bộ phận CNTT.

[00:04.30] To enhance our network security, all passwords must be updated by the end of this week.
:: Việt: Để tăng cường bảo mật mạng, tất cả mật khẩu phải được cập nhật trước cuối tuần này.

[00:09.50] Your new password must contain at least eight characters, including numbers and symbols.
:: Việt: Mật khẩu mới của bạn phải chứa ít nhất tám ký tự, bao gồm chữ số và ký tự đặc biệt.

[00:14.80] Failure to update your account in time will result in a temporary lockout on Monday.
:: Việt: Việc không cập nhật tài khoản đúng hạn sẽ dẫn đến việc bị khóa tài khoản tạm thời vào Thứ Hai.

# QUIZ
Q1: What is the main purpose of updating passwords?
* [x] To enhance network security
* [ ] To clear database storage
* [ ] To test a new software application
* [ ] To change employee username formats
-- Explanation: The IT Manager states that the update is required "to enhance our network security."

Q2: What will happen if employees do not update their passwords in time?
* [ ] They will be fined
* [x] They will face a temporary lockout on Monday
* [ ] Their account will be permanently deleted
* [ ] They must contact HR immediately
-- Explanation: The speaker warns that failure to update in time "will result in a temporary lockout on Monday."

Q3: What requirement or instruction must be followed?
* [ ] Submit a formal written appeal to executives
* [ ] Request emergency budget allocations
* [x] Contain at least eight characters, including numbers and symbols
* [ ] Wait for an official government notification
-- Explanation: The transcript specifies: "Your new password must contain at least eight characters, including numbers and symbols.".`;

export const LESSON_Q3_007_MD = `---
id: listen_toeic_q3_007
title: "Supply Chain Delay & Inventory Update"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["Logistics", "Supply Chain", "Business"]
---

# VOCABULARY
- shipment /ˈʃɪp.mənt/ (n): lô hàng, sự giao hàng. E.g., The incoming shipment of raw materials has been delayed.
- inventory /ˈɪn.vən.tɔːr.i/ (n): hàng tồn kho, sự kiểm kê. E.g., We must check our current inventory levels.
- alternative /ɑːlˈtɜːr.nə.tɪv/ (adj, n): phương án thay thế. E.g., We are seeking alternative suppliers in the region.
- productivity /ˌproʊ.dʌkˈtɪv.ə.t̬i/ (n): năng suất lao động. E.g., Flexible work schedules contributed to higher employee productivity.

# TRANSCRIPT
[00:00.00] Good afternoon team, I want to inform you about a delay with our incoming material shipment.
:: Việt: Chào buổi chiều cả đội, tôi muốn thông báo tới các bạn về sự chậm trễ của lô nguyên vật liệu đang chuyển đến.

[00:04.70] Due to unexpected severe weather at the port, the delivery will be delayed by three days.
:: Việt: Do thời tiết xấu đột xuất tại cảng, việc giao hàng sẽ bị chậm trễ ba ngày.

[00:09.90] We are currently adjusting our production schedule to prioritize existing inventory.
:: Việt: Chúng ta hiện đang điều chỉnh lịch trình sản xuất để ưu tiên lượng hàng tồn kho hiện có.

[00:15.10] Please notify your respective client representatives if any order fulfillments are affected.
:: Việt: Vui lòng thông báo cho đại diện khách hàng tương ứng nếu việc hoàn thành đơn hàng bị ảnh hưởng.

# QUIZ
Q1: What is causing the delivery delay?
* [ ] Mechanical failure of trucks
* [ ] Labor strikes at the warehouse
* [ ] Customs clearance issues
* [x] Severe weather conditions at the port
-- Explanation: The supervisor states that the delay is "due to unexpected severe weather at the port."

Q2: How long will the delivery be delayed?
* [x] Three days
* [ ] One day
* [ ] Two days
* [ ] One week
-- Explanation: The transcript explicitly mentions that "the delivery will be delayed by three days."

Q3: What are listeners requested to do?
* [ ] Submit an immediate resignation notice
* [x] Notify your respective client representatives if any order fulfillments are affected
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Please notify your respective client representatives if any order fulfillments are affected.".`;

export const LESSON_Q3_008_MD = `---
id: listen_toeic_q3_008
title: "Quarterly Sales Meeting & Regional Performance"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Sales", "Business", "Performance"]
---

# VOCABULARY
- surpass /sərˈpæs/ (v): vượt qua, vượt trội. E.g., Sales in the Northern region surpassed our expectations.
- expansion /ɪkˈspæn.ʃən/ (n): sự mở rộng. E.g., The retail expansion plan will begin next quarter.
- revenue /ˈrev.ə.nuː/ (n): doanh thu. E.g., Total company revenue saw a steady growth this quarter.
- optimization /ˌɑːp.tə.məˈzeɪ.ʃən/ (n): sự tối ưu hóa hệ thống. E.g., Code optimization reduced server response times significantly.

# TRANSCRIPT
[00:00.00] Welcome everyone to our quarterly sales review. I have some encouraging news to share.
:: Việt: Chào mừng mọi người đến với buổi đánh giá doanh số hàng quý. Tôi có một vài tin tức rất đáng phấn khởi muốn chia sẻ.

[00:04.90] Overall revenue has increased by twelve percent compared to the previous quarter.
:: Việt: Tổng doanh thu đã tăng 12% so với quý trước.

[00:09.60] The Northern region was our top performer, mostly driven by the new product line expansion.
:: Việt: Khu vực phía Bắc là nơi đạt kết quả tốt nhất, phần lớn nhờ vào việc mở rộng dòng sản phẩm mới.

[00:15.20] Next month, we plan to roll out similar marketing strategies in the Southern region.
:: Việt: Tháng tới, chúng ta dự định sẽ triển khai các chiến lược marketing tương tự tại khu vực phía Nam.

# QUIZ
Q1: By what percentage did total revenue increase compared to last quarter?
* [ ] 8%
* [ ] 10%
* [x] 12%
* [ ] 15%
-- Explanation: The Sales Director states that total revenue has increased by twelve percent compared to the previous quarter.

Q2: Which region was the top performer?
* [ ] The Southern region
* [ ] The Eastern region
* [ ] The Overseas market
* [x] The Northern region
-- Explanation: The transcript explicitly mentions that "The Northern region was our top performer."

Q3: What does the team or speaker plan to do next?
* [x] Roll out similar marketing strategies in the Southern region
* [ ] Close down all regional branch operations
* [ ] Freeze all new hiring activities indefinitely
* [ ] Cancel marketing efforts across the continent
-- Explanation: The speaker explains: "Next month, we plan to roll out similar marketing strategies in the Southern region.".`;

export const LESSON_Q3_009_MD = `---
id: listen_toeic_q3_009
title: "Facility Maintenance & Office Air Conditioning"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:21"
category: "TOEIC Part 4"
tags: ["Maintenance", "Facility", "Notice"]
---

# VOCABULARY
- maintenance /ˈmeɪn.tən.əns/ (n): sự bảo trì, bảo dưỡng. E.g., Routine maintenance is required for all HVAC systems.
- temporary /ˈtem.pə.rer.i/ (adj): tạm thời. E.g., There will be a temporary disruption in the cooling system.
- ventilation /ˌven.tɪˈleɪ.ʃən/ (n): sự thông gió, hệ thống thông gió. E.g., Portable fans will be provided to ensure proper ventilation.
- allocate /ˈæl.ə.keɪt/ (v): phân bổ nguồn lực, kinh phí. E.g., Finance leaders agreed to allocate additional funding to research.

# TRANSCRIPT
[00:00.00] Attention all staff, please be advised of scheduled maintenance work this Saturday.
:: Việt: Xin chú ý toàn thể nhân viên, xin lưu ý về công việc bảo trì theo kế hoạch vào Thứ Bảy tuần này.

[00:04.50] The central air conditioning unit on the fourth floor will be serviced from 9 AM to 2 PM.
:: Việt: Hệ thống điều hòa trung tâm tại tầng 4 sẽ được bảo dưỡng từ 9 giờ sáng đến 2 giờ chiều.

[00:09.80] During this window, temperatures in the office may rise higher than usual.
:: Việt: Trong khoảng thời gian này, nhiệt độ trong văn phòng có thể tăng cao hơn bình thường.

[00:14.70] We encourage employees working overtime to use the designated quiet spaces on the third floor.
:: Việt: Chúng tôi khuyến khích những nhân viên làm tăng ca sử dụng các không gian yên tĩnh đã chỉ định tại tầng ba.

# QUIZ
Q1: When will the maintenance work take place?
* [ ] Friday evening
* [x] Saturday from 9 AM to 2 PM
* [ ] Sunday afternoon
* [ ] Next Monday morning
-- Explanation: The speaker mentions that the unit will be serviced "this Saturday... from 9 AM to 2 PM."

Q2: What are overtime workers advised to do during the maintenance?
* [ ] Work from home entirely
* [ ] Turn off their computers
* [x] Use designated spaces on the third floor
* [ ] Complete their tasks before 9 AM
-- Explanation: The transcript explicitly states that employees working overtime are encouraged to "use the designated quiet spaces on the third floor."

Q3: What condition is expected during the scheduled period?
* [ ] All operations will cease completely
* [ ] All staff members will be relocated
* [ ] Power will be cut off across the campus
* [x] Temperatures in the office may rise higher than usual
-- Explanation: The announcement notes: "During this window, temperatures in the office may rise higher than usual.".`;

export const LESSON_Q3_010_MD = `---
id: listen_toeic_q3_010
title: "New Employee Onboarding & Orientation Schedule"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["HR", "Onboarding", "Training"]
---

# VOCABULARY
- orientation /ˌɔː.ri.enˈteɪ.ʃən/ (n): sự định hướng, buổi hội nhập. E.g., The orientation session begins at 9:00 AM in the main hall.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ (quy định, chính sách). E.g., New hires must complete the compliance training modules.
- mentor /ˈmen.tɔːr/ (n): người hướng dẫn, người cố vấn. E.g., Each new employee will be assigned a senior mentor.
- prioritize /praɪˈɔːr.ə.taɪz/ (v): ưu tiên xử lý trước. E.g., Customer support specialists prioritize high-urgency inquiries.

# TRANSCRIPT
[00:00.00] Good morning everyone, welcome to the official orientation session for our new team members.
:: Việt: Chào buổi sáng mọi người, chào mừng các bạn đến với buổi hội nhập chính thức dành cho các thành viên mới.

[00:04.80] Before we begin, please make sure you have filled out all the required HR compliance forms.
:: Việt: Trước khi bắt đầu, vui lòng đảm bảo bạn đã điền đầy đủ tất cả các biểu mẫu tuân thủ nhân sự theo yêu cầu.

[00:09.90] This afternoon, each of you will be paired with a senior mentor from your department.
:: Việt: Chiều nay, mỗi người trong số các bạn sẽ được ghép cặp với một người hướng dẫn cấp cao từ phòng ban của mình.

[00:15.10] They will assist you with setting up your workstation and accessing the internal software systems.
:: Việt: Họ sẽ hỗ trợ bạn thiết lập vị trí làm việc và truy cập vào các hệ thống phần mềm nội bộ.

# QUIZ
Q1: What must new employees do before the orientation session begins?
* [x] Fill out all required HR compliance forms
* [ ] Pick up their company laptops
* [ ] Meet with the department director
* [ ] Submit their security badge photos
-- Explanation: The speaker asks everyone to ensure they have "filled out all the required HR compliance forms" before beginning.

Q2: Who will help new employees set up their workstations this afternoon?
* [ ] The IT helpdesk staff
* [x] A senior mentor from their department
* [ ] The HR Manager
* [ ] External software consultants
-- Explanation: The transcript mentions that "each of you will be paired with a senior mentor from your department" who will assist with setting up workstations.

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [ ] A full recall of previous product versions
* [x] New Employee Onboarding & Orientation Schedule
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Good morning everyone, welcome to the official orientation session for our new team members.".`;

export const LESSON_Q3_011_MD = `---
id: listen_toeic_q3_011
title: "Quarterly Financial Results & Revenue Growth"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["Finance", "Business", "Earnings"]
---

# VOCABULARY
- profitability /ˌprɑː.fɪ.təˈbɪl.ə.ti/ (n): khả năng sinh lời, lợi nhuận. E.g., The company achieved record profitability this quarter.
- expansion /ɪkˈspæn.ʃən/ (n): sự mở rộng thị trường/quy mô. E.g., Overseas expansion contributed significantly to sales.
- shareholder /ˈʃerˌhoʊl.dər/ (n): cổ đông. E.g., The financial report will be presented to all shareholders.
- streamline /ˈstriːm.laɪn/ (v): tinh giản, tổ chức hợp lý hóa. E.g., The corporate restructure aims to streamline reporting channels.

# TRANSCRIPT
[00:00.00] Good morning shareholders, I am pleased to present our financial performance for the third quarter.
:: Việt: Chào buổi sáng các cổ đông, tôi rất hân hạnh được trình bày kết quả tài chính của chúng ta trong quý ba.

[00:04.90] Total net revenue reached forty million dollars, representing a fourteen percent increase year-over-year.
:: Việt: Tổng doanh thu thuần đạt 40 triệu đô la, đại diện cho mức tăng 14% so với cùng kỳ năm ngoái.

[00:10.10] This growth was primary driven by strong demand for our cloud subscription services.
:: Việt: Sự tăng trưởng này chủ yếu được thúc đẩy bởi nhu cầu mạnh mẽ đối với các dịch vụ đăng ký điện toán đám mây.

[00:15.30] Detailed financial breakdowns will be available on our investor relations website this afternoon.
:: Việt: Báo cáo tài chính chi tiết sẽ có trên trang web quan hệ cổ đông của chúng tôi vào chiều nay.

# QUIZ
Q1: What was the company's net revenue for the third quarter?
* [ ] $14 million
* [ ] $30 million
* [ ] $50 million
* [x] $40 million
-- Explanation: The speaker clearly states that "Total net revenue reached forty million dollars."

Q2: What was the main driver of the revenue growth?
* [x] Cloud subscription services
* [ ] Retail store expansions
* [ ] Hardware product sales
* [ ] Reduced operational expenses
-- Explanation: The transcript explicitly mentions that "This growth was primary driven by strong demand for our cloud subscription services."

Q3: Where or how can relevant resources be accessed?
* [ ] In a printed brochure at the front desk
* [x] Through our investor relations website this afternoon
* [ ] Through an encrypted external flash drive
* [ ] By mailing a formal letter to headquarters
-- Explanation: The speaker mentions: "Detailed financial breakdowns will be available on our investor relations website this afternoon.".`;

export const LESSON_Q3_012_MD = `---
id: listen_toeic_q3_012
title: "Software System Maintenance & Network Downtime"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["IT", "Maintenance", "Announcement"]
---

# VOCABULARY
- downtime /ˈdaʊn.taɪm/ (n): thời gian ngừng hoạt động (hệ thống/máy móc). E.g., The planned downtime will last for approximately two hours.
- backup /ˈbæk.ʌp/ (n, v): sao lưu dữ liệu. E.g., Please backup all critical files before leaving the office.
- server /ˈsɜːr.vər/ (n): máy chủ. E.g., The main application server will be restarted tonight.
- authorization /ˌɑː.θɚ.əˈzeɪ.ʃən/ (n): sự cấp phép chính thức. E.g., Purchase orders require senior management authorization.

# TRANSCRIPT
[00:00.00] Attention all staff, please note that routine network maintenance is scheduled for tonight.
:: Việt: Xin chú ý toàn thể nhân viên, xin lưu ý rằng việc bảo trì mạng định kỳ được lên lịch vào tối nay.

[00:04.70] Starting at ten PM, our primary servers will experience temporary downtime for security updates.
:: Việt: Bắt đầu từ 10 giờ tối, các máy chủ chính của chúng ta sẽ tạm dừng hoạt động để cập nhật bảo mật.

[00:10.00] All internal databases and email services will be unavailable until six AM tomorrow morning.
:: Việt: Tất cả cơ sở dữ liệu nội bộ và dịch vụ email sẽ không thể truy cập cho đến 6 giờ sáng mai.

[00:15.20] We strongly encourage everyone to save their active work and log off before leaving today.
:: Việt: Chúng tôi rất khuyến khích mọi người lưu lại công việc đang làm và đăng xuất trước khi ra về hôm nay.

# QUIZ
Q1: What time will the system downtime begin tonight?
* [ ] 6:00 PM
* [ ] 8:00 PM
* [x] 10:00 PM
* [ ] Midnight
-- Explanation: The IT Director specifies that "Starting at ten PM, our primary servers will experience temporary downtime."

Q2: What are employees requested to do before leaving today?
* [ ] Turn off all office lights
* [ ] Submit their weekly timesheets
* [ ] Contact the IT helpdesk for verification
* [x] Save active work and log off
-- Explanation: The transcript explicitly states: "We strongly encourage everyone to save their active work and log off before leaving today."

Q3: What will happen according to the speaker?
* [x] Be unavailable until six AM tomorrow morning
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "All internal databases and email services will be unavailable until six AM tomorrow morning.".`;

export const LESSON_Q3_013_MD = `---
id: listen_toeic_q3_013
title: "New Product Packaging & Environmental Sustainability"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["Product", "Sustainability", "Marketing"]
---

# VOCABULARY
- eco-friendly /ˌiː.koʊˈfrend.li/ (adj): thân thiện với môi trường. E.g., We are transitioning to 100% eco-friendly materials.
- recyclable /ˌriːˈsaɪ.klə.bəl/ (adj): có thể tái chế. E.g., The new plastic bottles are fully recyclable.
- reduction /rɪˈdʌk.ʃən/ (n): sự cắt giảm, giảm thiểu. E.g., This initiative led to a significant reduction in waste.
- consensus /kənˈsen.səs/ (n): sự đồng thuận chung. E.g., Committee members reached a consensus on the new budget proposal.

# TRANSCRIPT
[00:00.00] Good morning team, I want to share an exciting update on our flagship product line redesign.
:: Việt: Chào buổi sáng cả đội, tôi muốn chia sẻ một cập nhật thú vị về việc thiết kế lại dòng sản phẩm chủ lực của chúng ta.

[00:04.80] Starting next month, all consumer goods will be shipped in one hundred percent recyclable packaging.
:: Việt: Bắt đầu từ tháng tới, tất cả hàng tiêu dùng sẽ được vận chuyển trong bao bì có thể tái chế 100%.

[00:09.90] This eco-friendly transition is expected to reduce our overall plastic waste by thirty percent this year.
:: Việt: Sự chuyển đổi thân thiện với môi trường này dự kiến sẽ giảm 30% tổng lượng rác thải nhựa của chúng ta trong năm nay.

[00:15.30] A press release highlighting our sustainability efforts will be issued to the media on Friday.
:: Việt: Thông cáo báo chí nổi bật về những nỗ lực phát triển bền vững của chúng ta sẽ được phát hành tới truyền thông vào Thứ Sáu.

# QUIZ
Q1: What change will be made to the product packaging starting next month?
* [ ] It will become waterproof
* [x] It will be 100% recyclable
* [ ] It will feature a new logo design
* [ ] It will be imported from overseas
-- Explanation: The speaker mentions that starting next month, "all consumer goods will be shipped in one hundred percent recyclable packaging."

Q2: By how much is the plastic waste expected to be reduced this year?
* [ ] 15%
* [ ] 20%
* [x] 30%
* [ ] 50%
-- Explanation: The transcript explicitly states that the transition is expected to "reduce our overall plastic waste by thirty percent this year."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
* [x] Be issued to the media on Friday
-- Explanation: The speaker notes: "A press release highlighting our sustainability efforts will be issued to the media on Friday.".`;

export const LESSON_Q3_014_MD = `---
id: listen_toeic_q3_014
title: "Employee Wellness Program & Gym Membership Subsidy"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["HR", "Wellness", "Benefits"]
---

# VOCABULARY
- subsidy /ˈsʌb.sə.di/ (n): tiền trợ cấp, sự trợ giá. E.g., The company provides a monthly subsidy for gym memberships.
- wellness /ˈwel.nəs/ (n): sức khỏe tổng thể, sự sống khỏe. E.g., We are launching a new corporate wellness program next month.
- eligible /ˈel.ədʒ.ə.bəl/ (adj): đủ điều kiện, đủ tiêu chuẩn. E.g., All full-time employees are eligible for the benefit.
- discrepancy /dɪˈskrep.ən.si/ (n): sự sai lệch, khác biệt số liệu. E.g., The internal audit detected an accounting discrepancy in inventory logs.

# TRANSCRIPT
[00:00.00] Attention all staff, I am thrilled to introduce our new corporate wellness initiative for this year.
:: Việt: Xin chú ý toàn thể nhân viên, tôi rất vui mừng được giới thiệu chương trình sức khỏe doanh nghiệp mới của chúng ta trong năm nay.

[00:04.90] Starting next month, the company will offer a fifty percent subsidy on local fitness center memberships.
:: Việt: Bắt đầu từ tháng tới, công ty sẽ hỗ trợ 50% chi phí đăng ký hội viên tại các trung tâm thể hình địa phương.

[00:10.10] All full-time employees who have completed their probationary period are eligible to participate.
:: Việt: Tất cả nhân viên chính thức đã hoàn thành thời gian thử việc đều đủ điều kiện tham gia.

[00:15.20] Please submit your application form through the HR portal before the end of the month.
:: Việt: Vui lòng nộp mẫu đơn đăng ký của bạn thông qua cổng thông tin HR trước cuối tháng.

# QUIZ
Q1: What benefit is the company offering starting next month?
* [x] A 50% subsidy on gym memberships
* [ ] Free healthy lunches in the cafeteria
* [ ] Additional paid annual leave days
* [ ] Free public transportation passes
-- Explanation: The speaker announces that "the company will offer a fifty percent subsidy on local fitness center memberships."

Q2: Who is eligible to participate in the wellness program?
* [ ] Part-time interns only
* [x] Full-time employees who passed probation
* [ ] Department directors only
* [ ] External contractors
-- Explanation: The transcript explicitly states: "All full-time employees who have completed their probationary period are eligible."

Q3: What are listeners requested to do?
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [x] Submit your application form through the HR portal before the end of the month
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Please submit your application form through the HR portal before the end of the month.".`;

export const LESSON_Q3_015_MD = `---
id: listen_toeic_q3_015
title: "Upcoming Office Relocation & Packing Guidelines"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Office", "Relocation", "Announcement"]
---

# VOCABULARY
- relocation /ˌriː.loʊˈkeɪ.ʃən/ (n): sự di dời, chuyển văn phòng. E.g., The relocation to the new downtown building is planned for August.
- label /ˈleɪ.bəl/ (v, n): dán nhãn, nhãn mác. E.g., Please clearly label all personal storage boxes.
- fragile /ˈfrædʒ.əl/ (adj): dễ vỡ. E.g., Handle fragile equipment with extra care during the move.
- feasibility /ˌfiː.zəˈbɪl.ə.t̬i/ (n): tính khả thi của dự án. E.g., Engineers conducted a detailed feasibility study before construction.

# TRANSCRIPT
[00:00.00] Good morning everyone, as you know, our official relocation to the new office building is next week.
:: Việt: Chào buổi sáng mọi người, như các bạn đã biết, việc chính thức chuyển sang tòa nhà văn phòng mới sẽ diễn ra vào tuần tới.

[00:05.10] Professional movers will arrive this Friday at five PM to transport all packed crates and furniture.
:: Việt: Đơn vị vận chuyển chuyên nghiệp sẽ đến vào 5 giờ chiều Thứ Sáu tuần này để vận chuyển tất cả các thùng hàng đã đóng gói và đồ nội thất.

[00:10.40] Please ensure all personal items are securely boxed and labeled with your name and department code.
:: Việt: Vui lòng đảm bảo tất cả đồ dùng cá nhân được đóng hộp an toàn và dán nhãn ghi rõ tên cũng như mã phòng ban của bạn.

[00:15.80] Unlabeled boxes will be placed in the main storage area and may experience delays in delivery.
:: Việt: Các thùng hàng không dán nhãn sẽ được đưa vào khu vực lưu trữ chính và có thể bị chậm trễ trong việc bàn giao.

# QUIZ
Q1: When will the professional movers arrive?
* [ ] Wednesday morning
* [ ] Thursday afternoon
* [ ] Saturday evening
* [x] Friday at 5 PM
-- Explanation: The speaker specifies that professional movers will arrive "this Friday at five PM."

Q2: What will happen to boxes that are not labeled?
* [x] They will be placed in the main storage area
* [ ] They will be discarded immediately
* [ ] They will be returned to the owner's home
* [ ] They will be opened and inspected by security
-- Explanation: The transcript explicitly states: "Unlabeled boxes will be placed in the main storage area."

Q3: What are listeners requested to do?
* [ ] Submit an immediate resignation notice
* [x] Ensure all personal items are securely boxed and labeled with your name and department code
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Please ensure all personal items are securely boxed and labeled with your name and department code.".`;

export const LESSON_Q3_016_MD = `---
id: listen_toeic_q3_016
title: "Client Meeting Schedule & Conference Room Reservation"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 3"
tags: ["Office", "Meeting", "Reservation"]
---

# VOCABULARY
- reservation /ˌrez.ərˈveɪ.ʃən/ (n): sự đặt trước (phòng, chỗ). E.g., Please confirm your conference room reservation in advance.
- executive /ɪɡˈzek.jə.tɪv/ (adj, n): cấp quản lý, điều hành. E.g., The executive board will join the call at 2 PM.
- conflicting /kənˈflɪk.tɪŋ/ (adj): trùng lặp, xung đột (lịch trình). E.g., We need to resolve the conflicting meeting times.
- delegation /ˌdel.əˈɡeɪ.ʃən/ (n): sự phân công, ủy thác trách nhiệm. E.g., Effective managerial delegation empowers team leaders.

# TRANSCRIPT
[00:00.00] Hi Sarah, I'm calling about our upcoming presentation with the delegates from overseas tomorrow.
:: Việt: Chào Sarah, tôi gọi điện về buổi thuyết trình sắp tới với các đại biểu từ nước ngoài vào ngày mai.

[00:04.80] Due to a double-booking issue, Conference Room B is no longer available at two o'clock.
:: Việt: Do sự cố trùng lịch đặt phòng, Phòng họp B không còn trống vào lúc hai giờ nữa.

[00:09.90] I have rescheduled our session to Conference Room A on the fifth floor for the same time.
:: Việt: Tôi đã chuyển lịch buổi họp của chúng ta sang Phòng họp A ở tầng 5 vào cùng khung giờ đó.

[00:15.10] Could you please update the calendar invite and inform the rest of the team right away?
:: Việt: Bạn có thể cập nhật lời mời trên lịch và thông báo cho phần còn lại của đội ngay lập tức được không?

# QUIZ
Q1: Why is Conference Room B no longer available at 2 PM?
* [ ] It is undergoing maintenance
* [ ] The projector inside is broken
* [x] There was a double-booking issue
* [ ] It is reserved for an executive interview
-- Explanation: The speaker explains that "Due to a double-booking issue, Conference Room B is no longer available."

Q2: Where will the presentation be held instead?
* [ ] Conference Room B on Floor 2
* [ ] The main auditorium
* [ ] Online via video conference
* [x] Conference Room A on Floor 5
-- Explanation: The transcript explicitly states: "I have rescheduled our session to Conference Room A on the fifth floor."

Q3: What are listeners requested to do?
* [x] Update the calendar invite and inform the rest of the team right away?
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Could you please update the calendar invite and inform the rest of the team right away?".`;

export const LESSON_Q3_017_MD = `---
id: listen_toeic_q3_017
title: "Quarterly Performance Review & Employee Recognition"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["HR", "Management", "Recognition"]
---

# VOCABULARY
- recognition /ˌrek.əɡˈnɪʃ.ən/ (n): sự ghi nhận, sự công nhận. E.g., Outstanding performance deserves proper company recognition.
- contribution /ˌkɑːn.trəˈbjuː.ʃən/ (n): sự đóng góp. E.g., We appreciate your valuable contribution to the project.
- evaluation /ɪˌvæl.juˈeɪ.ʃən/ (n): sự đánh giá. E.g., Annual evaluations help track employee progress over time.
- contingency /kənˈtɪn.dʒən.si/ (n): tình huống dự phòng rủi ro. E.g., The project budget incorporates a ten-percent contingency fund.

# TRANSCRIPT
[00:00.00] Good afternoon everyone, I want to take a moment to discuss our upcoming performance review cycle.
:: Việt: Chào buổi chiều mọi người, tôi muốn dành ít phút để thảo luận về chu kỳ đánh giá hiệu suất sắp tới của chúng ta.

[00:05.10] Starting next week, managers will schedule individual evaluation meetings with all team members.
:: Việt: Bắt đầu từ tuần tới, các quản lý sẽ lên lịch các buổi họp đánh giá cá nhân với tất cả các thành viên trong đội.

[00:10.50] In addition, we will announce the recipients of this quarter's Employee Recognition Award on Friday.
:: Việt: Ngoài ra, chúng tôi sẽ công bố những người nhận Giải thưởng Ghi nhận Nhân viên của quý này vào Thứ Sáu.

[00:15.90] Recipients will receive a certificate of excellence alongside a performance bonus in their next paycheck.
:: Việt: Những người nhận giải sẽ nhận được chứng nhận xuất sắc cùng với một khoản tiền thưởng hiệu suất trong kỳ lương tiếp theo.

# QUIZ
Q1: What will managers begin doing next week?
* [ ] Organizing team-building events
* [x] Scheduling individual evaluation meetings
* [ ] Reviewing new job applications
* [ ] Updating corporate safety policies
-- Explanation: The speaker mentions that starting next week, managers will "schedule individual evaluation meetings with all team members."

Q2: What will award recipients receive in their next paycheck?
* [ ] Additional vacation days
* [ ] Gift cards to local restaurants
* [x] A performance bonus
* [ ] A company-issued laptop
-- Explanation: The transcript explicitly states that recipients will receive a certificate "alongside a performance bonus in their next paycheck."

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
* [x] Quarterly Performance Review & Employee Recognition
-- Explanation: The speaker introduces the topic: "Good afternoon everyone, I want to take a moment to discuss our upcoming performance review cycle.".`;

export const LESSON_Q3_018_MD = `---
id: listen_toeic_q3_018
title: "New Software Implementation & User Training Session"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["IT", "Training", "Software"]
---

# VOCABULARY
- implementation /ˌɪm.plə.menˈteɪ.ʃən/ (n): sự triển khai, thi hành. E.g., The implementation of the new software will start next month.
- migration /maɪˈɡreɪ.ʃən/ (n): sự chuyển đổi, di chuyển dữ liệu. E.g., Data migration will be completed over the weekend.
- portal /ˈpɔːr.təl/ (n): cổng thông tin. E.g., You can access your training materials via the staff portal.
- milestone /ˈmaɪl.stoʊn/ (n): cột mốc quan trọng. E.g., Completing the beta phase marks a critical project milestone.

# TRANSCRIPT
[00:00.00] Good morning team, as announced earlier, we are about to upgrade our primary project management software.
:: Việt: Chào buổi sáng cả đội, như đã thông báo trước đó, chúng ta sắp sửa nâng cấp phần mềm quản lý dự án chính của mình.

[00:05.10] The full data migration process is scheduled to take place this coming Saturday from midnight.
:: Việt: Toàn bộ quá trình chuyển đổi dữ liệu được lên lịch diễn ra vào nửa đêm Thứ Bảy tuần này.

[00:10.30] Mandatory training webinars will be held next Monday to help everyone get familiar with the new interface.
:: Việt: Các buổi hội thảo đào tạo trực tuyến bắt buộc sẽ được tổ chức vào Thứ Hai tuần tới để giúp mọi người làm quen với giao diện mới.

[00:15.80] Links to join the sessions and quick-start user guides are now available on the staff portal.
:: Việt: Đường liên kết tham gia các buổi học và tài liệu hướng dẫn sử dụng nhanh hiện đã có trên cổng thông tin nhân viên.

# QUIZ
Q1: When will the data migration process occur?
* [x] Saturday starting from midnight
* [ ] Friday afternoon
* [ ] Sunday morning
* [ ] Next Monday evening
-- Explanation: The speaker explicitly states that the full data migration "is scheduled to take place this coming Saturday from midnight."

Q2: Where can employees find the training webinar links and user guides?
* [ ] In an email attachment sent by HR
* [x] On the staff portal
* [ ] On the public company website
* [ ] In the IT department office
-- Explanation: The transcript mentions that links to join the sessions and guides "are now available on the staff portal."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Be held next Monday to help everyone get familiar with the new interface
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Mandatory training webinars will be held next Monday to help everyone get familiar with the new interface.".`;

export const LESSON_Q3_019_MD = `---
id: listen_toeic_q3_019
title: "Customer Loyalty Program & Points Redemption System"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Marketing", "Retail", "Customer Service"]
---

# VOCABULARY
- redemption /rɪˈdemp.ʃən/ (n): sự quy đổi, sự chuộc lại. E.g., Points redemption can be done directly through our mobile app.
- tier /tɪr/ (n): cấp độ, hạng (thành viên). E.g., Gold tier members enjoy exclusive perks and discount codes.
- accumulate /əˈkjuː.mjə.leɪt/ (v): tích lũy. E.g., Customers accumulate reward points with every eligible purchase.
- benchmark /ˈbentʃ.mɑːrk/ (n): tiêu chuẩn đánh giá, mốc chuẩn so sánh. E.g., The quarterly report sets a new performance benchmark for the industry.

# TRANSCRIPT
[00:00.00] Attention valued customers, we are excited to launch our upgraded VIP loyalty rewards program today.
:: Việt: Xin chú ý tới quý khách hàng thân thiết, chúng tôi rất vui mừng ra mắt chương trình ưu đãi thành viên VIP nâng cấp vào hôm nay.

[00:05.20] Under the new system, every purchase earns you points that can be redeemed for instant discount vouchers.
:: Việt: Theo hệ thống mới, mỗi đơn hàng sẽ giúp quý khách tích điểm để quy đổi thành các phiếu giảm giá trực tiếp.

[00:10.60] Members who reach the Platinum tier will also enjoy free express shipping on all online orders.
:: Việt: Các thành viên đạt hạng Platinum cũng sẽ được hưởng dịch vụ giao hàng hỏa tốc miễn phí cho mọi đơn hàng trực tuyến.

[00:15.90] Download our official mobile app now to check your points balance and explore exclusive member rewards.
:: Việt: Tải ngay ứng dụng di động chính thức của chúng tôi để kiểm tra số dư điểm và khám phá các phần thưởng dành riêng cho thành viên.

# QUIZ
Q1: What can earned points be redeemed for under the new system?
* [ ] Free gift wrapping
* [ ] Store gift cards
* [ ] Extended product warranties
* [x] Instant discount vouchers
-- Explanation: The speaker explains that points "can be redeemed for instant discount vouchers."

Q2: What benefit do Platinum tier members receive?
* [x] Free express shipping on online orders
* [ ] Free product maintenance
* [ ] Double reward points
* [ ] Access to VIP lounge areas
-- Explanation: The transcript explicitly states: "Members who reach the Platinum tier will also enjoy free express shipping on all online orders."

Q3: What action is recommended to listeners?
* [ ] Visiting an offline branch office in person
* [x] Download our official mobile app now to check your points balance and explore exclusive member rewards
* [ ] Calling the central switchboard hotline
* [ ] Mailing a physical registration paper form
-- Explanation: The announcement advises: "Download our official mobile app now to check your points balance and explore exclusive member rewards.".`;

export const LESSON_Q3_020_MD = `---
id: listen_toeic_q3_020
title: "Quarterly Marketing Campaign & Social Media Strategy"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Marketing", "Social Media", "Business"]
---

# VOCABULARY
- outreach /ˈaʊt.riːtʃ/ (n, adj): sự tiếp cận, hoạt động cộng đồng. E.g., Our social media outreach strategy doubled our online engagement.
- campaign /kæmˈpeɪn/ (n): chiến dịch. E.g., The summer promotional campaign was a massive success.
- target audience /ˈtɑːr.ɡɪt ˈɑː.di.əns/ (n): khách hàng mục tiêu. E.g., We customized our video ads to appeal to a younger target audience.
- workflow /ˈwɝːk.floʊ/ (n): quy trình làm việc. E.g., Automating administrative tasks optimizes team workflow.

# TRANSCRIPT
[00:00.00] Good morning everyone, today I want to highlight the results of our recent social media campaign.
:: Việt: Chào buổi sáng mọi người, hôm nay tôi muốn điểm qua kết quả của chiến dịch truyền thông xã hội gần đây của chúng ta.

[00:05.10] By focusing on short video content, we successfully increased our brand engagement by forty percent.
:: Việt: Bằng cách tập trung vào nội dung video ngắn, chúng ta đã tăng mức độ tương tác thương hiệu lên 40% một cách thành công.

[00:10.50] Furthermore, our targeted ad strategy helped us reach over fifty thousand new potential clients this month.
:: Việt: Hơn nữa, chiến lược quảng cáo nhắm mục tiêu đã giúp chúng ta tiếp cận hơn 50.000 khách hàng tiềm năng mới trong tháng này.

[00:15.90] We will double our video production budget next quarter to sustain this rapid digital growth.
:: Việt: Chúng ta sẽ gấp đôi ngân sách sản xuất video vào quý tới để duy trì sự tăng trưởng kỹ thuật số nhanh chóng này.

# QUIZ
Q1: What type of content helped increase brand engagement by 40%?
* [ ] Blog articles
* [ ] Email newsletters
* [x] Short video content
* [ ] Print advertisements
-- Explanation: The speaker notes that "By focusing on short video content, we successfully increased our brand engagement by forty percent."

Q2: What is the marketing team planning to do next quarter?
* [ ] Hire more external graphic designers
* [ ] Reduce overall advertising costs
* [ ] Switch to traditional television marketing
* [x] Double their video production budget
-- Explanation: The transcript explicitly mentions: "We will double our video production budget next quarter to sustain this rapid digital growth."

Q3: What key detail does the speaker emphasize?
* [x] Furthermore, our targeted ad strategy helped us reach over fifty thousand new potential clients this month
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Furthermore, our targeted ad strategy helped us reach over fifty thousand new potential clients this month.".`;

export const LESSON_Q3_021_MD = `---
id: listen_toeic_q3_021
title: "Cloud DevOps CI/CD Pipeline & Automated Deployment Verification"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "0:38"
category: "TOEIC Part 4"
tags: ["Technology", "DevOps", "Cloud", "TOEIC"]
---

# VOCABULARY
- pipeline /ˈpaɪp.laɪn/ (n): quy trình tích hợp, đường ống tự động. E.g., The engineering team updated the continuous deployment pipeline.
- deployment /dɪˈplɔɪ.mənt/ (n): sự triển khai phần mềm. E.g., Automated deployment reduces human errors in production environments.
- regression /rɪˈɡreʃ.ən/ (n): sự thoái lui, lỗi phát sinh ngược. E.g., Automated regression test suites ran smoothly across all staging clusters.
- rollback /ˈroʊl.bæk/ (n): quy trình quay lui phiên bản an toàn. E.g., The system initiates an instant rollback if critical errors are detected.

# TRANSCRIPT
[00:00.00] Good morning engineers, our cloud infrastructure team has completed the upgrade to our automated CI/CD deployment pipeline. {Good:0, morning:300, engineers:600, our:1100, cloud:1400, infrastructure:1800, team:2600, has:2900, completed:3100, the:3700, upgrade:3900, to:4500, our:4700, automated:5000, continuous:5600, deployment:6200, pipeline:6800}
:: Việt: Chào buổi sáng các kỹ sư, đội ngũ cơ sở hạ tầng đám mây của chúng ta đã hoàn tất việc nâng cấp quy trình triển khai tự động CI/CD.

[00:08.50] Initial benchmark testing demonstrates that build execution times have been reduced by thirty-five percent. {Initial:0, benchmark:500, testing:1100, demonstrates:1700, that:2500, build:2700, execution:3100, times:3800, have:4200, been:4400, reduced:4600, by:5200, thirty:5400, five:5700, percent:6100}
:: Việt: Thử nghiệm tiêu chuẩn ban đầu chứng minh rằng thời gian thực thi bản dựng đã giảm ba mươi lăm phần trăm.

[00:16.80] All software development squads must migrate their repository configurations to the new cluster before Thursday evening. {All:0, software:400, development:900, squads:1600, must:2200, migrate:2600, their:3100, repository:3400, configurations:4200, to:5200, the:5400, new:5650, cluster:6000, before:6600, Thursday:7100, evening:7700}
:: Việt: Tất cả các nhóm phát triển phần mềm phải di chuyển cấu hình kho lưu trữ sang cụm máy chủ mới trước tối Thứ Năm.

[00:26.50] Senior DevOps leads will hold daily virtual office hours to assist any teams encountering staging deployment issues. {Senior:0, DevOps:500, leads:1100, will:1600, hold:1800, daily:2200, virtual:2700, office:3200, hours:3700, to:4200, assist:4500, any:5000, teams:5300, encountering:5800, staging:6600, deployment:7200, issues:7800}
:: Việt: Các trưởng nhóm DevOps cấp cao sẽ mở giờ trực tuyến hàng ngày để hỗ trợ mọi đội ngũ gặp sự cố triển khai thử nghiệm.

# QUIZ
Q1: What major improvement was observed after upgrading the deployment pipeline?
* [ ] Server electricity costs dropped by 50%
* [x] Build execution times were reduced by 35%
* [ ] Storage capacity was doubled across all regions
* [ ] The entire engineering workforce was doubled
-- Explanation: The speaker confirms that "build execution times have been reduced by thirty-five percent."

Q2: By when must squads migrate their repository configurations?
* [ ] Friday at noon
* [ ] Next Monday morning
* [x] Thursday evening
* [ ] End of the current fiscal year
-- Explanation: The announcement instructs that squads "must migrate their repository configurations to the new cluster before Thursday evening."

Q3: How will senior DevOps leads support engineering teams?
* [ ] By reviewing pull requests manually line by line
* [ ] By conducting mandatory in-person weekend workshops
* [ ] By writing all configuration files on their behalf
* [x] By holding daily virtual office hours for staging issues
-- Explanation: The speaker announces that "Senior DevOps leads will hold daily virtual office hours to assist any teams encountering staging deployment issues."`;

export const LESSON_Q3_022_MD = `---
id: listen_toeic_q3_022
title: "Cloud Migration Strategy & Infrastructure Security"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["IT", "Cloud", "Security"]
---

# VOCABULARY
- migration /maɪˈɡreɪ.ʃən/ (n): sự chuyển đổi, di chuyển hệ thống. E.g., Database migration to the cloud will happen overnight.
- infrastructure /ˈɪn.frəˌstrʌk.tʃər/ (n): hạ tầng (mạng/máy chủ). E.g., Moving to a cloud infrastructure reduces server maintenance costs.
- encryption /ɪnˈkrɪp.ʃən/ (n): sự mã hóa dữ liệu. E.g., All sensitive customer data must undergo end-to-end encryption.
- protocol /ˈproʊ.t̬ə.kɑːl/ (n): quy trình, nghi thức chuẩn mực. E.g., Emergency safety protocols must be reviewed annually.

# TRANSCRIPT
[00:00.00] Good morning dev team, I am pleased to update you on our cloud infrastructure migration progress.
:: Việt: Chào buổi sáng đội phát triển, tôi rất vui được cập nhật cho các bạn về tiến độ di dời hạ tầng đám mây của chúng ta.

[00:04.90] Over seventy percent of our legacy database services have been successfully transferred to AWS.
:: Việt: Hơn 70% các dịch vụ cơ sở dữ liệu cũ của chúng ta đã được chuyển sang AWS thành công.

[00:10.20] In addition, end-to-end encryption protocols have been activated to secure all user data in transit.
:: Việt: Ngoài ra, các giao thức mã hóa đầu-cuối đã được kích hoạt để bảo vệ toàn bộ dữ liệu người dùng đang truyền tải.

[00:15.60] We expect the entire migration process to finish by midnight without interrupting active services.
:: Việt: Chúng tôi dự kiến toàn bộ quá trình di dời sẽ hoàn tất trước nửa đêm mà không làm gián đoạn các dịch vụ đang hoạt động.

# QUIZ
Q1: What percentage of legacy database services has been transferred to AWS?
* [x] Over 70%
* [ ] 50%
* [ ] 85%
* [ ] 100%
-- Explanation: The speaker mentions that "Over seventy percent of our legacy database services have been successfully transferred."

Q2: What feature was activated to secure data in transit?
* [ ] Multi-factor authentication
* [x] End-to-end encryption protocols
* [ ] Automatic server backup
* [ ] IP address blocking
-- Explanation: The transcript explicitly states: "end-to-end encryption protocols have been activated to secure all user data in transit."

Q3: What does the speaker expect regarding this process?
* [ ] Severe service downtime across all platforms
* [ ] Substantial financial losses for the department
* [x] Entire migration process to finish by midnight without interrupting active services
* [ ] A cancellation of future development sprints
-- Explanation: The speaker indicates: "We expect the entire migration process to finish by midnight without interrupting active services.".`;

export const LESSON_Q3_023_MD = `---
id: listen_toeic_q3_023
title: "Agile Sprint Review & Software Release Schedule"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["IT", "Software Development", "Agile"]
---

# VOCABULARY
- deployment /dɪˈplɔɪ.mənt/ (n): sự triển khai (phần mềm/mã nguồn). E.g., Production deployment is scheduled for Thursday night.
- backlog /ˈbæk.lɑːɡ/ (n): danh sách công việc tồn đọng/chờ xử lý. E.g., The team prioritized fixing critical bugs from the product backlog.
- bug fix /ˈbʌɡ fɪks/ (n): sự sửa lỗi phần mềm. E.g., The latest patch contains several key bug fixes for mobile users.
- initiative /ɪˈnɪʃ.ə.t̬ɪv/ (n): sáng kiến đổi mới. E.g., Management launched a green initiative to reduce corporate carbon footprints.

# TRANSCRIPT
[00:00.00] Hi everyone, welcome to our bi-weekly sprint review meeting for version two point four.
:: Việt: Chào mọi người, chào mừng đến với buổi họp đánh giá sprint hai tuần một lần cho phiên bản 2.4.

[00:05.10] Our engineering team has completed all user stories and resolved twelve critical bug fixes this sprint.
:: Việt: Đội ngũ kỹ sư của chúng ta đã hoàn thành tất cả user story và xử lý xong 12 lỗi nghiêm trọng trong sprint này.

[00:10.50] Code freeze will begin tomorrow at 5 PM, followed by automated staging tests over the weekend.
:: Việt: Việc đóng băng mã nguồn (code freeze) sẽ bắt đầu vào 5 giờ chiều mai, tiếp theo là các bài kiểm tra tự động trên môi trường staging vào cuối tuần.

[00:16.00] If all tests pass, the final production deployment will take place early Monday morning.
:: Việt: Nếu tất cả bài kiểm tra đều vượt qua, việc triển khai lên môi trường thực tế (production) sẽ diễn ra vào sáng sớm Thứ Hai.

# QUIZ
Q1: When will code freeze begin?
* [ ] Today at 5 PM
* [ ] Saturday morning
* [ ] Monday morning
* [x] Tomorrow at 5 PM
-- Explanation: The Scrum Master explicitly states: "Code freeze will begin tomorrow at 5 PM."

Q2: What will happen early Monday morning if all staging tests pass?
* [x] The final production deployment
* [ ] A new sprint planning meeting
* [ ] Data backup creation
* [ ] Security penetration testing
-- Explanation: The transcript states: "the final production deployment will take place early Monday morning."

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [x] Agile Sprint Review & Software Release Schedule
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Hi everyone, welcome to our bi-weekly sprint review meeting for version two point four.".`;

export const LESSON_Q3_024_MD = `---
id: listen_toeic_q3_024
title: "Data Analytics Platform & Customer Behavior Insights"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["IT", "Data", "Analytics"]
---

# VOCABULARY
- analytics /ˌæn.əlˈɪt.ɪks/ (n): phân tích dữ liệu. E.g., Real-time analytics help us track user conversion rates.
- predictive /prɪˈdɪk.tɪv/ (adj): mang tính dự báo. E.g., Predictive models allow us to forecast quarterly churn rates.
- dashboard /ˈdæʃ.bɔːrd/ (n): bảng điều khiển thông số. E.g., The updated analytics dashboard displays key metric trends.
- efficiency /ɪˈfɪʃ.ən.si/ (n): tính hiệu quả, năng suất. E.g., Upgraded server hardware enhances internal operational efficiency.

# TRANSCRIPT
[00:00.00] Hello team, I'd like to demonstrate the new features of our internal customer analytics platform.
:: Việt: Xin chào cả đội, tôi muốn demo các tính năng mới của nền tảng phân tích khách hàng nội bộ của chúng ta.

[00:05.00] The updated dashboard now aggregates real-time purchasing data across all online channels.
:: Việt: Bảng điều khiển mới cập nhật hiện gom dữ liệu mua sắm theo thời gian thực từ tất cả các kênh trực tuyến.

[00:10.30] Furthermore, we integrated a predictive machine learning model to identify potential customer churn early.
:: Việt: Hơn nữa, chúng tôi đã tích hợp một mô hình máy học dự báo để phát hiện sớm nguy cơ khách hàng ngừng sử dụng dịch vụ.

[00:15.70] A comprehensive user guide has been uploaded to the shared engineering folder for reference.
:: Việt: Tài liệu hướng dẫn sử dụng toàn diện đã được tải lên thư mục kỹ thuật dùng chung để mọi người tham khảo.

# QUIZ
Q1: What does the updated dashboard aggregate in real time?
* [ ] Employee attendance records
* [ ] Social media mentions
* [x] Purchasing data across all online channels
* [ ] Server performance logs
-- Explanation: The Data Science Lead states that the dashboard "aggregates real-time purchasing data across all online channels."

Q2: What is the purpose of the newly integrated machine learning model?
* [ ] To generate automatic invoices
* [ ] To block suspicious IP logins
* [ ] To compress raw database files
* [x] To identify potential customer churn early
-- Explanation: The transcript explicitly mentions that the model was integrated "to identify potential customer churn early."

Q3: Where or how can relevant resources be accessed?
* [x] Through the shared engineering folder for reference
* [ ] In a printed brochure at the front desk
* [ ] Through an encrypted external flash drive
* [ ] By mailing a formal letter to headquarters
-- Explanation: The speaker mentions: "A comprehensive user guide has been uploaded to the shared engineering folder for reference.".`;

export const LESSON_Q3_025_MD = `---
id: listen_toeic_q3_025
title: "Cybersecurity Incident & Phishing Awareness Training"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["IT", "Security", "Training"]
---

# VOCABULARY
- phishing /ˈfɪʃ.ɪŋ/ (n): lừa đảo trực tuyến (qua email/tin nhắn). E.g., Be cautious of phishing emails asking for your password.
- suspicious /səˈspɪʃ.əs/ (adj): khả nghi, đáng nghi. E.g., Do not click on unexpected external links or suspicious attachments.
- protocol /ˈproʊ.tə.kɑːl/ (n): quy trình, giao thức. E.g., Follow company protocols when reporting security threats.
- confidentiality /ˌkɑːn.fə.den.ʃiˈæl.ə.t̬i/ (n): tính bảo mật thông tin. E.g., Staff signed non-disclosure agreements to preserve client confidentiality.

# TRANSCRIPT
[00:00.00] Attention all employees, this is an urgent security reminder regarding recent email phishing attempts.
:: Việt: Xin chú ý tới tất cả nhân viên, đây là nhắc nhở bảo mật khẩn cấp liên quan đến các cuộc tấn công lừa đảo qua email gần đây.

[00:05.30] Several fake messages pretending to be from bank representatives have been detected in our network.
:: Việt: Một số tin nhắn giả mạo danh nghĩa đại diện ngân hàng đã được phát hiện trong hệ thống mạng của chúng ta.

[00:10.80] Never click on unverified links or open external attachments from unknown senders.
:: Việt: Tuyệt đối không nhấp vào các liên kết chưa xác minh hoặc mở tệp đính kèm bên ngoài từ những người gửi không rõ danh tính.

[00:15.90] If you receive a suspicious email, please forward it to the security desk using the Report button immediately.
:: Việt: Nếu bạn nhận được email nghi ngờ, vui lòng chuyển tiếp ngay cho bộ phận bảo mật bằng nút "Report" (Báo cáo).

# QUIZ
Q1: What threat has recently been detected in the company network?
* [ ] Malware inside USB drives
* [x] Fake phishing emails pretending to be from bank representatives
* [ ] Unauthorized Wi-Fi connections
* [ ] Hardware failure on primary storage servers
-- Explanation: The speaker warns about "fake messages pretending to be from bank representatives... detected in our network."

Q2: How should employees report suspicious emails?
* [ ] Reply directly to the sender asking for verification
* [ ] Delete the email and restart their computer
* [x] Forward it to the security desk using the Report button
* [ ] Call the HR department manager
-- Explanation: The transcript explicitly states: "please forward it to the security desk using the Report button immediately."

Q3: What safety or security instruction does the speaker emphasize?
* [ ] Always share account passwords with project teammates
* [ ] Bypass security checks during high-priority emergencies
* [ ] Download unverified third-party software updates
* [x] Never click on unverified links or open external attachments from unknown senders
-- Explanation: The speaker instructs: "Never click on unverified links or open external attachments from unknown senders.".`;

export const LESSON_Q3_026_MD = `---
id: listen_toeic_q3_026
title: "API Gateway Upgrade & System Integration"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["IT", "Software Development", "API"]
---

# VOCABULARY
- integration /ˌɪn.təˈɡreɪ.ʃən/ (n): sự tích hợp hệ thống. E.g., Third-party payment integration is now fully functional.
- authentication /ɔːˌθen.tɪˈkeɪ.ʃən/ (n): sự xác thực (danh tính/tài khoản). E.g., Two-factor authentication adds a layer of account security.
- latency /ˈleɪ.tən.si/ (n): độ trễ (mạng/truy vấn). E.g., The API upgrade significantly reduced network latency.
- collaboration /kəˌlæb.əˈreɪ.ʃən/ (n): sự hợp tác làm việc nhóm. E.g., Cross-functional collaboration accelerated the product development cycle.

# TRANSCRIPT
[00:00.00] Hello engineers, I want to share the performance results of our new API Gateway integration.
:: Việt: Xin chào các kỹ sư, tôi muốn chia sẻ kết quả hiệu năng của việc tích hợp API Gateway mới của chúng ta.

[00:05.20] Thanks to the updated routing architecture, average request latency has dropped by forty percent.
:: Việt: Nhờ kiến trúc định tuyến được cập nhật, độ trễ yêu cầu trung bình đã giảm 40%.

[00:10.60] We also upgraded our OAuth authentication tokens to enhance security across all third-party endpoints.
:: Việt: Chúng tôi cũng đã nâng cấp các mã xác thực OAuth để tăng cường bảo mật trên tất cả các đầu cuối (endpoint) bên thứ ba.

[00:16.00] Developers can access the updated API documentation and code samples on our internal Wiki today.
:: Việt: Các nhà phát triển có thể truy cập tài liệu API cập nhật và mã mẫu trên trang Wiki nội bộ của chúng ta ngay hôm nay.

# QUIZ
Q1: By how much did the average request latency drop after the upgrade?
* [x] 40%
* [ ] 20%
* [ ] 30%
* [ ] 50%
-- Explanation: The Backend Lead explicitly states that "average request latency has dropped by forty percent."

Q2: Where can developers find the updated API documentation and code samples?
* [ ] In an attachment sent via Slack
* [x] On the internal Wiki
* [ ] On the public GitHub repository
* [ ] In a printed manual distributed by IT
-- Explanation: The transcript mentions that developers can access documents and code samples "on our internal Wiki today."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [x] We also upgraded our OAuth authentication tokens to enhance security across all third-party endpoints
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "We also upgraded our OAuth authentication tokens to enhance security across all third-party endpoints.".`;

export const LESSON_Q3_027_MD = `---
id: listen_toeic_q3_027
title: "Hotel Reservation Confirmation & Guest Services"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Hospitality", "Tourism", "Customer Service"]
---

# VOCABULARY
- complimentary /ˌkɑːm.pləˈmen.t̬ɚ.i/ (adj): miễn phí (dịch vụ kèm theo). E.g., All guests enjoy complimentary breakfast at the hotel restaurant.
- shuttle /ˈʃʌt̬.əl/ (n): xe đưa đón ngắn tuyến. E.g., The airport shuttle operates every thirty minutes.
- amenity /əˈmen.ə.t̬i/ (n): tiện nghi khách sạn. E.g., The resort offers modern amenities including a spa and fitness center.
- productivity /ˌproʊ.dʌkˈtɪv.ə.t̬i/ (n): năng suất lao động. E.g., Flexible work schedules contributed to higher employee productivity.

# TRANSCRIPT
[00:00.00] Good morning Mr. Miller, I am calling to confirm your reservation at the Ocean View Resort.
:: Việt: Chào buổi sáng ông Miller, tôi gọi điện để xác nhận thông tin đặt phòng của ông tại Ocean View Resort.

[00:05.10] Your deluxe suite is booked for three nights starting this Thursday, including complimentary breakfast.
:: Việt: Phòng suite cao cấp của ông đã được đặt trong ba đêm bắt đầu từ Thứ Năm tuần này, bao gồm cả bữa sáng miễn phí.

[00:10.50] Please note that our airport shuttle bus departs from Terminal 2 every thirty minutes.
:: Việt: Xin lưu ý rằng xe đưa đón sân bay của chúng tôi khởi hành từ Nhà ga 2 mỗi 30 phút một chuyến.

[00:15.80] Should you require any special room arrangements, please notify our front desk team prior to arrival.
:: Việt: Nếu ông cần bất kỳ sự sắp xếp phòng đặc biệt nào, vui lòng thông báo cho đội ngũ lễ tân của chúng tôi trước khi đến.

# QUIZ
Q1: What is included with Mr. Miller's reservation?
* [ ] Free spa vouchers
* [ ] Free laundry service
* [ ] Guided city tours
* [x] Complimentary breakfast
-- Explanation: The speaker specifies that the deluxe suite is booked "including complimentary breakfast."

Q2: How often does the airport shuttle bus depart?
* [x] Every 30 minutes
* [ ] Every 15 minutes
* [ ] Every hour
* [ ] On demand only
-- Explanation: The transcript explicitly states: "our airport shuttle bus departs from Terminal 2 every thirty minutes."

Q3: What are listeners requested to do?
* [ ] Submit an immediate resignation notice
* [x] Notify our front desk team prior to arrival
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Should you require any special room arrangements, please notify our front desk team prior to arrival.".`;

export const LESSON_Q3_028_MD = `---
id: listen_toeic_q3_028
title: "Retail Store Grand Opening & Promotional Discount"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["Retail", "Sales", "Event"]
---

# VOCABULARY
- promotion /prəˈmoʊ.ʃən/ (n): chương trình khuyến mãi. E.g., Our special opening promotion offers huge discounts across all departments.
- voucher /ˈvaʊ.tʃɚ/ (n): phiếu quà tặng, mã giảm giá. E.g., The first fifty shoppers will receive a twenty-dollar store voucher.
- clearance /ˈklɪr.əns/ (n): sự xả kho, bán hạ giá. E.g., Check out the seasonal clearance section on the second floor.
- optimization /ˌɑːp.tə.məˈzeɪ.ʃən/ (n): sự tối ưu hóa hệ thống. E.g., Code optimization reduced server response times significantly.

# TRANSCRIPT
[00:00.00] Attention shoppers, welcome to the grand opening of our flagship electronics store in the city center!
:: Việt: Xin chú ý quý khách hàng, chào mừng quý khách đến với lễ khai trương cửa hàng thiết bị điện tử chủ lực của chúng tôi tại trung tâm thành phố!

[00:05.20] To celebrate our opening, all home appliances are discounted by twenty percent today only.
:: Việt: Để chào mừng ngày khai trương, tất cả các thiết bị gia dụng đều được giảm giá 20% duy nhất trong hôm nay.

[00:10.40] In addition, the first fifty customers at the checkout counter will receive a complimentary gift bag.
:: Việt: Ngoài ra, 50 khách hàng đầu tiên tại quầy thanh toán sẽ nhận được một túi quà tặng miễn phí.

[00:15.70] Don't forget to sign up for our free loyalty membership to earn points on future purchases.
:: Việt: Đừng quên đăng ký tài khoản thành viên thân thiết miễn phí để tích điểm cho các lần mua sắm trong tương lai.

# QUIZ
Q1: What discount is offered on home appliances today?
* [ ] 10%
* [ ] 15%
* [x] 20%
* [ ] 50%
-- Explanation: The store manager announces that "all home appliances are discounted by twenty percent today only."

Q2: What will the first 50 customers at the checkout counter receive?
* [ ] A cash refund
* [ ] A free smartphone
* [ ] A 50% discount voucher
* [x] A complimentary gift bag
-- Explanation: The transcript explicitly states: "the first fifty customers at the checkout counter will receive a complimentary gift bag."

Q3: What are listeners reminded to do?
* [x] Sign up for our free loyalty membership to earn points on future purchases
* [ ] Contact the municipal licensing board
* [ ] Submit a formal reimbursement invoice
* [ ] Cancel their current company membership
-- Explanation: The speaker reminds: "Don't forget to sign up for our free loyalty membership to earn points on future purchases.".`;

export const LESSON_Q3_029_MD = `---
id: listen_toeic_q3_029
title: "Candidate Interview Screening & Recruitment Process"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["HR", "Recruitment", "Interview"]
---

# VOCABULARY
- candidate /ˈkæn.də.deɪt/ (n): ứng viên. E.g., Shortlisted candidates will be invited for a second-round interview.
- qualification /ˌkwɑː.lə.fəˈkeɪ.ʃən/ (n): trình độ chuyên môn, bằng cấp. E.g., Applicants must meet all technical qualifications for the role.
- portfolio /pɔːrtˈfoʊ.li.oʊ/ (n): hồ sơ năng lực, các sản phẩm đã làm. E.g., Designers should submit a link to their online portfolio.
- allocate /ˈæl.ə.keɪt/ (v): phân bổ nguồn lực, kinh phí. E.g., Finance leaders agreed to allocate additional funding to research.

# TRANSCRIPT
[00:00.00] Hello David, thank you for applying for the Senior Graphic Designer position at our agency.
:: Việt: Xin chào David, cảm ơn bạn đã ứng tuyển vào vị trí Thiết kế Đồ họa Cao cấp tại công ty chúng tôi.

[00:05.10] We were very impressed with your background and would like to invite you for a virtual interview.
:: Việt: Chúng tôi rất ấn tượng với hồ sơ của bạn và muốn mời bạn tham gia một buổi phỏng vấn trực tuyến.

[00:10.50] The interview is scheduled for next Wednesday at 10 AM via our online video conferencing link.
:: Việt: Buổi phỏng vấn được lên lịch vào 10 giờ sáng Thứ Tư tuần tới thông qua liên kết họp video trực tuyến của chúng tôi.

[00:15.90] Please reply to this email by tomorrow evening to confirm your availability and submit your updated portfolio.
:: Việt: Vui lòng phản hồi email này trước chiều tối mai để xác nhận sự có mặt của bạn và gửi hồ sơ năng lực cập nhật.

# QUIZ
Q1: What position did David apply for?
* [ ] Marketing Manager
* [x] Senior Graphic Designer
* [ ] Software Engineer
* [ ] HR Coordinator
-- Explanation: The speaker mentions that David applied for the "Senior Graphic Designer position."

Q2: What is David requested to do by tomorrow evening?
* [ ] Visit the office in person
* [ ] Complete an online test
* [x] Confirm availability and submit an updated portfolio
* [ ] Contact the department director
-- Explanation: The transcript explicitly states: "Please reply to this email by tomorrow evening to confirm your availability and submit your updated portfolio."

Q3: When is the event, operation, or interview scheduled?
* [ ] Next Friday at 5:00 PM
* [ ] At the end of the next quarter
* [ ] Early tomorrow morning
* [x] Next Wednesday at 10 AM
-- Explanation: The speaker states: "The interview is scheduled for next Wednesday at 10 AM via our online video conferencing link.".`;

export const LESSON_Q3_030_MD = `---
id: listen_toeic_q3_030
title: "Commercial Property Lease & Office Space Inspection"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Real Estate", "Business", "Property"]
---

# VOCABULARY
- lease /liːs/ (n, v): hợp đồng cho thuê, thuê tài sản. E.g., The commercial lease agreement covers a minimum duration of two years.
- occupant /ˈɑː.kjə.pənt/ (n): người ở, người thuê/sử dụng. E.g., The building offers dedicated parking spaces for all occupants.
- square feet /skwer fiːt/ (n): feet vuông (đơn vị đo diện tích). E.g., The open-plan office space spans three thousand square feet.
- prioritize /praɪˈɔːr.ə.taɪz/ (v): ưu tiên xử lý trước. E.g., Customer support specialists prioritize high-urgency inquiries.

# TRANSCRIPT
[00:00.00] Hello Ms. Jenkins, this is Mark from City Realty regarding the commercial space on Fifth Avenue.
:: Việt: Xin chào bà Jenkins, đây là Mark từ City Realty liên quan đến mặt bằng thương mại trên Đại lộ Số 5.

[00:05.20] The office space spans approximately two thousand square feet and features three private meeting rooms.
:: Việt: Văn phòng có diện tích khoảng 2.000 feet vuông và có sẵn ba phòng họp riêng.

[00:10.60] The monthly rent includes high-speed internet access and daily janitorial cleaning services.
:: Việt: Tiền thuê hàng tháng đã bao gồm internet tốc độ cao và dịch vụ vệ sinh dọn dẹp hàng ngày.

[00:15.90] Let me know if you would like to arrange a site walkthrough with the property owner this Friday.
:: Việt: Hãy cho tôi biết nếu bà muốn sắp xếp một buổi đi tham quan thực tế cùng chủ sở hữu tòa nhà vào Thứ Sáu này.

# QUIZ
Q1: What is included in the monthly rent?
* [x] High-speed internet and daily cleaning services
* [ ] Parking passes for twenty cars
* [ ] Free office furniture supplies
* [ ] Electricity and water utilities only
-- Explanation: The agent explains that "The monthly rent includes high-speed internet access and daily janitorial cleaning services."

Q2: What option does the agent propose for this Friday?
* [ ] Signing the lease contract
* [x] Arranging a site walkthrough with the owner
* [ ] Making a security deposit payment
* [ ] Negotiating the rental price
-- Explanation: The transcript explicitly states: "Let me know if you would like to arrange a site walkthrough with the property owner this Friday."

Q3: What is included according to the speaker?
* [ ] Free international flights for all guests
* [ ] Complimentary catered lunch daily
* [x] High-speed internet access and daily janitorial cleaning services
* [ ] A twenty-four-hour personal chauffeur
-- Explanation: The transcript states: "The monthly rent includes high-speed internet access and daily janitorial cleaning services.".`;

export const LESSON_Q3_031_MD = `---
id: listen_toeic_q3_031
title: "Corporate Conference Keynote & Venue Direction"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Event", "Conference", "Business"]
---

# VOCABULARY
- keynote /ˈkiː.noʊt/ (n): bài phát biểu chủ đạo/chính. E.g., The keynote address will be delivered by the industry CEO.
- auditorium /ˌɑː.dəˈtɔːr.i.əm/ (n): khán phòng, hội trường lớn. E.g., Attendees are requested to gather in the main auditorium.
- badge /bædʒ/ (n): thẻ đeo, huy hiệu sự kiện. E.g., Please wear your conference identification badge at all times.
- streamline /ˈstriːm.laɪn/ (v): tinh giản, tổ chức hợp lý hóa. E.g., The corporate restructure aims to streamline reporting channels.

# TRANSCRIPT
[00:00.00] Good morning attendees, welcome to the opening day of the Global Tech Leadership Summit.
:: Việt: Chào buổi sáng các tham dự viên, chào mừng đến với ngày khai mạc Hội nghị Khai phóng Lãnh đạo Công nghệ Toàn cầu.

[00:05.20] Please remember to collect your identification badge at the registration desk in the main lobby.
:: Việt: Xin lưu ý nhận thẻ đeo nhận diện của bạn tại quầy đăng ký ở sảnh chính.

[00:10.50] Our keynote speech on AI innovation will begin promptly at nine AM in the central auditorium.
:: Việt: Bài phát biểu chủ đạo của chúng ta về đổi mới AI sẽ bắt đầu đúng 9 giờ sáng tại khán phòng trung tâm.

[00:15.90] Complementary refreshments and networking sessions will follow immediately after the speech in Hall B.
:: Việt: Đồ ăn nhẹ miễn phí và các phiên kết nối giao lưu sẽ diễn ra ngay sau bài phát biểu tại Hội trường B.

# QUIZ
Q1: Where should attendees collect their identification badges?
* [ ] In the central auditorium
* [ ] In Hall B
* [ ] Outside the building entrance
* [x] At the registration desk in the main lobby
-- Explanation: The speaker states: "Please remember to collect your identification badge at the registration desk in the main lobby."

Q2: What will happen in Hall B after the keynote speech?
* [x] Complementary refreshments and networking sessions
* [ ] A panel discussion on cybersecurity
* [ ] Product demonstration workshops
* [ ] The closing award ceremony
-- Explanation: The transcript explicitly mentions: "Complementary refreshments and networking sessions will follow immediately after the speech in Hall B."

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [x] Corporate Conference Keynote & Venue Direction
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Good morning attendees, welcome to the opening day of the Global Tech Leadership Summit.".`;

export const LESSON_Q3_032_MD = `---
id: listen_toeic_q3_032
title: "Customs Clearance Delay & Tariff Compliance"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Customs", "Trade", "Logistics"]
---

# VOCABULARY
- customs clearance /ˈkʌs.təmz ˈklɪr.əns/ (n): sự thông quan hải quan. E.g., The shipment is held up pending customs clearance.
- tariff /ˈtær.ɪf/ (n): thuế xuất nhập khẩu, biểu thuế. E.g., New tariffs were applied to imported electronic components.
- documentation /ˌdɑː.kjə.menˈteɪ.ʃən/ (n): bộ chứng từ, tài liệu. E.g., Ensure all shipping documentation is complete and accurate.
- authorization /ˌɑː.θɚ.əˈzeɪ.ʃən/ (n): sự cấp phép chính thức. E.g., Purchase orders require senior management authorization.

# TRANSCRIPT
[00:00.00] Good morning Mr. Vance, this is Clara from Apex Customs Brokerage regarding your inbound cargo container.
:: Việt: Chào buổi sáng ông Vance, đây là Clara từ Công ty Khai thuê Hải quan Apex liên quan đến thùng hàng nhập khẩu của ông.

[00:05.20] Your shipment from South Korea is currently held up at the port pending customs clearance inspection.
:: Việt: Lô hàng của ông từ Hàn Quốc hiện đang bị giữ lại tại cảng để chờ kiểm tra thông quan hải quan.

[00:10.50] Customs officials require an updated Certificate of Origin to verify the applicable tariff rates.
:: Việt: Cán bộ hải quan yêu cầu Giấy chứng nhận xuất xứ (C/O) cập nhật để xác minh mức thuế suất áp dụng.

[00:15.90] Please email the signed document to our office today so we can release the goods without penalty.
:: Việt: Vui lòng gửi email tài liệu đã ký cho văn phòng chúng tôi trong hôm nay để chúng tôi có thể giải phóng hàng mà không bị phạt.

# QUIZ
Q1: Why is the cargo container currently held up at the port?
* [ ] Bad weather conditions
* [ ] Damage to the container seal
* [x] Pending customs clearance inspection
* [ ] Unpaid freight charges
-- Explanation: The broker mentions that the shipment is "currently held up at the port pending customs clearance inspection."

Q2: What document do customs officials require?
* [ ] A bill of lading
* [ ] A commercial packing list
* [ ] A marine insurance policy
* [x] An updated Certificate of Origin
-- Explanation: The transcript explicitly states: "Customs officials require an updated Certificate of Origin."

Q3: What are listeners requested to do?
* [x] Email the signed document to our office today so we can release the goods without penalty
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Please email the signed document to our office today so we can release the goods without penalty.".`;

export const LESSON_Q3_033_MD = `---
id: listen_toeic_q3_033
title: "Bill of Lading & Freight Forwarding Instructions"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Logistics", "Trade", "Shipping"]
---

# VOCABULARY
- bill of lading /bɪl əv ˈleɪ.dɪŋ/ (n): vận đơn đường biển (B/L). E.g., The bill of lading acts as a receipt of goods shipped.
- freight forwarder /freɪt ˈfɔːr.wɚ.dɚ/ (n): công ty giao nhận vận tải. E.g., Our freight forwarder arranged the sea transport.
- consignee /ˌkɑːn.saɪˈniː/ (n): người nhận hàng. E.g., The consignee's contact details must match the invoice exactly.
- consensus /kənˈsen.səs/ (n): sự đồng thuận chung. E.g., Committee members reached a consensus on the new budget proposal.

# TRANSCRIPT
[00:00.00] Hello Jason, I am reviewing the draft shipping documents for our upcoming export to Germany.
:: Việt: Chào Jason, tôi đang rà soát bản thảo chứng từ vận chuyển cho lô hàng xuất khẩu sắp tới sang Đức.

[00:05.10] I noticed a discrepancy in the weight listed on the draft bill of lading compared to our packing list.
:: Việt: Tôi nhận thấy có sự sai lệch về trọng lượng ghi trên vận đơn bản thảo so với phiếu đóng gói (packing list) của chúng ta.

[00:10.40] The bill of lading states twelve metric tons, whereas our actual net weight is fourteen metric tons.
:: Việt: Vận đơn ghi 12 tấn mét, trong khi trọng lượng tịnh thực tế của chúng ta là 14 tấn mét.

[00:15.80] Please contact the freight forwarder immediately to correct this error before the vessel departs on Friday.
:: Việt: Vui lòng liên hệ với bên giao nhận vận tải ngay lập tức để sửa lỗi này trước khi tàu khởi hành vào Thứ Sáu.

# QUIZ
Q1: What discrepancy was found in the draft shipping documents?
* [ ] Wrong consignee name
* [x] Difference in weight between the bill of lading and packing list
* [ ] Incorrect port of destination
* [ ] Missing insurance coverage details
-- Explanation: The speaker noticed "a discrepancy in the weight listed on the draft bill of lading compared to our packing list."

Q2: What is the actual net weight of the shipment?
* [ ] 10 metric tons
* [ ] 12 metric tons
* [x] 14 metric tons
* [ ] 20 metric tons
-- Explanation: The transcript explicitly states: "whereas our actual net weight is fourteen metric tons."

Q3: What are listeners requested to do?
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
* [x] Contact the freight forwarder immediately to correct this error before the vessel departs on Friday
-- Explanation: The speaker instructs: "Please contact the freight forwarder immediately to correct this error before the vessel departs on Friday.".`;

export const LESSON_Q3_034_MD = `---
id: listen_toeic_q3_034
title: "Incoterms Negotiation & CIF vs. FOB Terms"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Trade", "Incoterms", "Contract"]
---

# VOCABULARY
- Incoterms /ˈɪn.koʊ.tɜːrmz/ (n): điều khoản thương mại quốc tế. E.g., Choosing the right Incoterms determines who pays for ocean freight.
- premium /ˈpriː.mi.əm/ (n): phí bảo hiểm. E.g., Under CIF terms, the seller pays the insurance premium.
- liability /ˌlaɪ.əˈbɪl.ə.ti/ (n): trách nhiệm pháp lý, rủi ro. E.g., Liability transfers to the buyer once goods are loaded onto the vessel.
- discrepancy /dɪˈskrep.ən.si/ (n): sự sai lệch, khác biệt số liệu. E.g., The internal audit detected an accounting discrepancy in inventory logs.

# TRANSCRIPT
[00:00.00] Good afternoon team, I want to update you on the contract negotiations with our distributor in Japan.
:: Việt: Chào buổi chiều cả đội, tôi muốn cập nhật về cuộc đàm phán hợp đồng với nhà phân phối của chúng ta tại Nhật Bản.

[00:05.20] They originally requested FOB terms, meaning they would handle ocean freight and marine insurance arrangements.
:: Việt: Ban đầu họ yêu cầu điều khoản FOB, nghĩa là họ sẽ tự thu xếp vận tải đường biển và bảo hiểm hàng hải.

[00:10.60] However, we agreed to switch to CIF terms so that our logistics team can maintain control over shipping schedules.
:: Việt: Tuy nhiên, chúng ta đã đồng ý chuyển sang điều khoản CIF để đội ngũ logistics của chúng ta có thể kiểm soát lịch trình vận chuyển.

[00:16.00] We will include the insurance premium and ocean freight costs directly into the final commercial invoice.
:: Việt: Chúng ta sẽ tính phí bảo hiểm và cước phí vận tải biển trực tiếp vào hóa đơn thương mại cuối cùng.

# QUIZ
Q1: What Incoterms did the Japanese distributor originally request?
* [x] FOB (Free On Board)
* [ ] EXW (Ex Works)
* [ ] CIF (Cost, Insurance, and Freight)
* [ ] DDP (Delivered Duty Paid)
-- Explanation: The manager explains that "They originally requested FOB terms."

Q2: Why did the company agree to switch to CIF terms?
* [ ] To reduce the total sale price
* [x] To maintain control over shipping schedules
* [ ] To avoid paying export taxes
* [ ] Because the buyer lacked an import license
-- Explanation: The transcript explicitly states: "we agreed to switch to CIF terms so that our logistics team can maintain control over shipping schedules."

Q3: What is included according to the speaker?
* [ ] Free international flights for all guests
* [ ] Complimentary catered lunch daily
* [x] The insurance premium and ocean freight costs directly into the final commercial invoice
* [ ] A twenty-four-hour personal chauffeur
-- Explanation: The transcript states: "We will include the insurance premium and ocean freight costs directly into the final commercial invoice.".`;

export const LESSON_Q3_035_MD = `---
id: listen_toeic_q3_035
title: "Port Congestion & Container Terminal Surcharge"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:22"
category: "TOEIC Part 4"
tags: ["Shipping", "Logistics", "Port"]
---

# VOCABULARY
- congestion /kənˈdʒes.tʃən/ (n): sự ùn tắc, tắc nghẽn (cảng/giao thông). E.g., Heavy port congestion delayed vessel unloading by four days.
- surcharge /ˈsɜːr.tʃɑːrdʒ/ (n): phụ phí. E.g., A peak season surcharge will be added to ocean freight rates.
- demurrage /dɪˈmɜːr.ɪdʒ/ (n): phí lưu container tại cảng (quá hạn). E.g., Avoid demurrage charges by picking up containers within three days.
- feasibility /ˌfiː.zəˈbɪl.ə.t̬i/ (n): tính khả thi của dự án. E.g., Engineers conducted a detailed feasibility study before construction.

# TRANSCRIPT
[00:00.00] Attention all regional clients, this is an official advisory notice from Pacific Cargo Lines.
:: Việt: Xin chú ý toàn thể khách hàng trong khu vực, đây là thông báo tư vấn chính thức từ hãng tàu Pacific Cargo Lines.

[00:05.10] Due to severe port congestion at the West Coast terminal, vessel wait times have increased significantly.
:: Việt: Do tình trạng ùn tắc nghiêm trọng tại cảng bờ Tây, thời gian chờ của tàu đã tăng lên đáng kể.

[00:10.40] Consequently, a temporary congestion surcharge of two hundred dollars per container will take effect on August 1st.
:: Việt: Do đó, khoản phụ phí ùn tắc tạm thời là 200 đô la cho mỗi container sẽ có hiệu lực từ ngày 1 tháng 8.

[00:15.80] We encourage shippers to reroute urgent shipments through alternative ports on the Gulf Coast.
:: Việt: Chúng tôi khuyến khích các chủ hàng chuyển hướng các lô hàng gấp qua các cảng thay thế ở Vùng vịnh.

# QUIZ
Q1: What is causing increased vessel wait times on the West Coast?
* [ ] Labor strikes by dock workers
* [ ] Severe tropical storms in the Pacific
* [ ] Fuel shortages for cargo ships
* [x] Severe port congestion at the terminal
-- Explanation: The notice cites "severe port congestion at the West Coast terminal" as the reason for wait times.

Q2: How much is the temporary surcharge per container?
* [x] $200
* [ ] $100
* [ ] $150
* [ ] $500
-- Explanation: The transcript explicitly mentions: "a temporary congestion surcharge of two hundred dollars per container will take effect."

Q3: What are employees or attendees encouraged or advised to do?
* [ ] File an overtime compensation grievance
* [x] Shippers to reroute urgent shipments through alternative ports on the Gulf Coast
* [ ] Leave the building premises immediately
* [ ] Work remotely from home for the rest of the week
-- Explanation: The speaker notes: "We encourage shippers to reroute urgent shipments through alternative ports on the Gulf Coast.".`;

export const LESSON_Q3_036_MD = `---
id: listen_toeic_q3_036
title: "Letter of Credit Verification & Payment Guarantee"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Finance", "Trade", "Banking"]
---

# VOCABULARY
- Letter of Credit /ˈlet.ɚ əv ˈkred.ɪt/ (n): thư tín dụng (L/C). E.g., Payment will be released upon presentation of valid documents under the Letter of Credit.
- beneficiary /ˌben.əˈfɪʃ.i.er.i/ (n): người thụ hưởng (tiền/L/C). E.g., The exporter is named as the beneficiary in the L/C agreement.
- discrepancy /dɪˈskrep.ən.si/ (n): sự bất đồng, sai lệch trong chứng từ. E.g., Any discrepancy in document dates can cause payment delays.
- delegation /ˌdel.əˈɡeɪ.ʃən/ (n): sự phân công, ủy thác trách nhiệm. E.g., Effective managerial delegation empowers team leaders.

# TRANSCRIPT
[00:00.00] Good morning Ms. Chen, I am calling from International Trade Operations regarding your irrevocable Letter of Credit.
:: Việt: Chào buổi sáng bà Chen, tôi gọi từ Bộ phận Nghiệp vụ Thương mại Quốc tế liên quan đến Thư tín dụng không thể hủy ngang của bà.

[00:05.30] We received the shipping documents submitted by your seller, but our audit revealed two minor discrepancies.
:: Việt: Chúng tôi đã nhận được bộ chứng từ vận chuyển do bên bán của bà nộp, nhưng kiểm toán của chúng tôi phát hiện hai bất biệt nhỏ.

[00:10.70] Specifically, the bill of lading shipment date is two days past the latest shipment date specified in the L/C.
:: Việt: Cụ thể, ngày xếp hàng trên vận đơn trễ hai ngày so với ngày xếp hàng muộn nhất được quy định trong L/C.

[00:16.10] To process the payment, we require an official waiver authorization from your company by 3 PM today.
:: Việt: Để tiến hành thanh toán, chúng tôi cần văn bản chấp nhận bất biệt chính thức từ công ty bà trước 3 giờ chiều nay.

# QUIZ
Q1: What issue did the bank's audit reveal in the submitted documents?
* [ ] The total invoice amount was incorrect
* [ ] The seller's bank account was closed
* [x] Two minor discrepancies, including a late shipment date on the bill of lading
* [ ] Missing marine insurance coverage
-- Explanation: The banker explains that "our audit revealed two minor discrepancies... the bill of lading shipment date is two days past."

Q2: What is required from Ms. Chen's company to process the payment?
* [ ] A cash deposit of 10%
* [ ] A new commercial invoice
* [ ] Cancellation of the purchase contract
* [x] An official waiver authorization by 3 PM today
-- Explanation: The transcript explicitly states: "we require an official waiver authorization from your company by 3 PM today."

Q3: What key detail does the speaker emphasize?
* [x] Specifically, the bill of lading shipment date is two days past the latest shipment date specified in the L/C
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Specifically, the bill of lading shipment date is two days past the latest shipment date specified in the L/C.".`;

export const LESSON_Q3_037_MD = `---
id: listen_toeic_q3_037
title: "Commercial Loan Application & Credit Risk Assessment"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Banking", "Finance", "Credit"]
---

# VOCABULARY
- collateral /kəˈlæt̬.ɚ.əl/ (n): tài sản thế chấp. E.g., Real estate properties are frequently used as loan collateral.
- creditworthiness /ˈkred.ɪtˌwɝː.ði.nəs/ (n): mức độ uy tín tín dụng. E.g., The bank evaluates corporate creditworthiness before approval.
- amortization /əˌmɔːr.t̬əˈzeɪ.ʃən/ (n): sự trả góp (gốc và lãi theo kỳ). E.g., The loan features a fixed monthly amortization schedule over five years.
- contingency /kənˈtɪn.dʒən.si/ (n): tình huống dự phòng rủi ro. E.g., The project budget incorporates a ten-percent contingency fund.

# TRANSCRIPT
[00:00.00] Good morning Mr. Harrison, this is Corporate Lending Services following up on your commercial loan request.
:: Việt: Chào buổi sáng ông Harrison, đây là Bộ phận Dịch vụ Cho vay Doanh nghiệp theo dõi yêu cầu vay thương mại của ông.

[00:05.20] Our underwriting committee has reviewed your business expansion plan and preliminary financial statements.
:: Việt: Ủy ban thẩm định của chúng tôi đã xem xét kế hoạch mở rộng kinh doanh và báo cáo tài chính sơ bộ của ông.

[00:10.60] While your cash flow projections look strong, final approval is subject to an independent appraisal of the collateral.
:: Việt: Mặc dù dự báo dòng tiền của ông rất khả quan, việc phê duyệt cuối cùng vẫn phụ thuộc vào kết quả thẩm định tài sản thế chấp độc lập.

[00:16.00] Please submit the property title deeds to our branch office by Thursday to complete the credit assessment.
:: Việt: Vui lòng nộp giấy chứng nhận quyền sở hữu tài sản cho văn phòng chi nhánh của chúng tôi trước Thứ Năm để hoàn tất đánh giá tín dụng.

# QUIZ
Q1: What is final approval of the loan subject to?
* [ ] A higher interest rate agreement
* [x] An independent appraisal of the collateral
* [ ] A personal guarantee from shareholders
* [ ] An extension of the business plan
-- Explanation: The speaker notes that "final approval is subject to an independent appraisal of the collateral."

Q2: What document must Mr. Harrison submit by Thursday?
* [ ] Tax return receipts
* [ ] Bank account statements
* [x] Property title deeds
* [ ] Employee payroll records
-- Explanation: The transcript explicitly states: "Please submit the property title deeds to our branch office by Thursday."

Q3: What condition must be met before approval?
* [ ] Approval by the municipal trade council
* [ ] Full payment of outstanding corporate taxes
* [ ] A unanimous vote by all shareholders
* [x] An independent appraisal of the collateral
-- Explanation: The transcript explains: "While your cash flow projections look strong, final approval is subject to an independent appraisal of the collateral.".`;

export const LESSON_Q3_038_MD = `---
id: listen_toeic_q3_038
title: "Quarterly Earnings Report & Dividend Announcement"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Investment", "Corporate Finance", "Stocks"]
---

# VOCABULARY
- dividend /ˈdɪv.ə.dend/ (n): cổ tức (tiền chia cho cổ đông). E.g., Board members approved a quarterly dividend payout to common shareholders.
- payout /ˈpeɪ.aʊt/ (n): khoản tiền chi trả. E.g., The dividend payout ratio remains consistent with last year's guidance.
- portfolio /ˌpɔːrtˈfoʊ.li.oʊ/ (n): danh mục đầu tư. E.g., Diversifying your asset portfolio helps mitigate equity market volatility.
- milestone /ˈmaɪl.stoʊn/ (n): cột mốc quan trọng. E.g., Completing the beta phase marks a critical project milestone.

# TRANSCRIPT
[00:00.00] Welcome shareholders, I am pleased to present the strategic highlights from our Q2 financial results webcast.
:: Việt: Chào mừng quý cổ đông, tôi rất hân hạnh được trình bày các điểm sáng chiến lược từ buổi phát trực tuyến kết quả tài chính Quý 2.

[00:05.30] Driven by strong profit margins, the board of directors has declared a cash dividend of fifty cents per share.
:: Việt: Nhờ tỷ suất lợi nhuận đạt mức cao, Hội đồng quản trị đã tuyên bố chia cổ tức bằng tiền mặt 50 cent cho mỗi cổ phiếu.

[00:10.80] This payout represents a ten percent increase compared to the dividend distributed during the previous quarter.
:: Việt: Khoản chi trả này đại diện cho mức tăng 10% so với đợt cổ tức được phân phối trong quý trước.

[00:16.10] The dividend will be payable on August 20th to all shareholders registered as of the record date of August 5th.
:: Việt: Cổ tức sẽ được thanh toán vào ngày 20 tháng 8 cho tất cả cổ đông đăng ký tính đến ngày chốt danh sách là ngày 5 tháng 8.

# QUIZ
Q1: How much is the declared cash dividend per share?
* [x] 50 cents
* [ ] 20 cents
* [ ] $1.00
* [ ] $1.50
-- Explanation: The speaker explicitly announces "a cash dividend of fifty cents per share."

Q2: When is the record date for registered shareholders to qualify for the dividend?
* [ ] July 31st
* [x] August 5th
* [ ] August 20th
* [ ] End of the month
-- Explanation: The transcript states that the dividend is for shareholders "registered as of the record date of August 5th."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [x] This payout represents a ten percent increase compared to the dividend distributed during the previous quarter
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "This payout represents a ten percent increase compared to the dividend distributed during the previous quarter.".`;

export const LESSON_Q3_039_MD = `---
id: listen_toeic_q3_039
title: "Mutual Fund Asset Allocation & Risk Diversification"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Investment", "Wealth", "Portfolio"]
---

# VOCABULARY
- asset allocation /ˈæs.et ˌæl.əˈkeɪ.ʃən/ (n): sự phân bổ tài sản đầu tư. E.g., Proper asset allocation balances equity growth with fixed-income security.
- yield /jiːld/ (n, v): lợi suất, sinh lời. E.g., High-yield corporate bonds offer attractive interest rates but carry higher credit risk.
- volatility /ˌvɑː.ləˈtɪl.ə.ti/ (n): biến động giá (thị trường). E.g., Government securities shield capital during periods of equity market volatility.
- benchmark /ˈbentʃ.mɑːrk/ (n): tiêu chuẩn đánh giá, mốc chuẩn so sánh. E.g., The quarterly report sets a new performance benchmark for the industry.

# TRANSCRIPT
[00:00.00] Hello Ms. Gable, thank you for coming in today for your annual portfolio review session.
:: Việt: Xin chào bà Gable, cảm ơn bà đã đến tham dự buổi đánh giá danh mục đầu tư hàng năm hôm nay.

[00:05.10] Given recent interest rate adjustments, I recommend rebalancing your current mutual fund holdings.
:: Việt: Dựa trên những điều chỉnh lãi suất gần đây, tôi đề xuất tái cơ cấu các khoản nắm giữ quỹ tương hỗ hiện tại của bà.

[00:10.50] Shifting fifteen percent of your capital from growth equities into fixed-income bonds will reduce overall portfolio volatility.
:: Việt: Việc chuyển 15% vốn từ cổ phiếu tăng trưởng sang trái phiếu có thu nhập cố định sẽ giúp giảm biến động tổng thể của danh mục.

[00:15.90] This strategy ensures steady dividend yield while preserving your principal investment over the long term.
:: Việt: Chiến lược này đảm bảo tỷ suất cổ tức ổn định trong khi bảo toàn vốn đầu tư ban đầu của bà trong dài hạn.

# QUIZ
Q1: What recommendation does the advisor make regarding Ms. Gable's portfolio?
* [ ] Sell all equity holdings immediately
* [ ] Invest exclusively in foreign real estate
* [ ] Close the mutual fund account
* [x] Rebalance funds by shifting 15% from growth equities into fixed-income bonds
-- Explanation: The advisor explicitly recommends "rebalancing your current mutual fund holdings... Shifting fifteen percent of your capital... into fixed-income bonds."

Q2: What is the primary benefit of the suggested rebalancing strategy?
* [x] Reducing portfolio volatility while preserving principal capital
* [ ] Eliminating income taxes completely
* [ ] Guaranteeing double-digit annual capital growth
* [ ] Avoiding account maintenance fees
-- Explanation: The transcript states that the shift "will reduce overall portfolio volatility... while preserving your principal investment."

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [x] Mutual Fund Asset Allocation & Risk Diversification
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Hello Ms. Gable, thank you for coming in today for your annual portfolio review session.".`;

export const LESSON_Q3_040_MD = `---
id: listen_toeic_q3_040
title: "Corporate Venture Capital & Series B Funding Round"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Investment", "Startup", "Finance"]
---

# VOCABULARY
- valuation /ˌvæl.juˈeɪ.ʃən/ (n): định giá công ty/tài sản. E.g., The startup achieved a hundred-million-dollar valuation after Series B.
- equity stake /ˈek.wə.t̬i steɪk/ (n): tỷ lệ cổ phần sở hữu. E.g., Investors acquired a fifteen percent equity stake in exchange for venture capital.
- capital injection /ˈkæp.ə.t̬əl ɪnˈdʒek.ʃən/ (n): nguồn vốn bơm bổ sung. E.g., The capital injection will accelerate international market expansion.
- workflow /ˈwɝːk.floʊ/ (n): quy trình làm việc. E.g., Automating administrative tasks optimizes team workflow.

# TRANSCRIPT
[00:00.00] Good morning investors, I am thrilled to announce the successful closing of our Series B funding round.
:: Việt: Chào buổi sáng các nhà đầu tư, tôi rất vui mừng thông báo việc đóng thành công vòng gọi vốn Series B của chúng tôi.

[00:05.20] We raised twenty-five million dollars led by Horizon Venture Partners at a pre-money valuation of eighty million.
:: Việt: Chúng tôi đã huy động được 25 triệu đô la do Horizon Venture Partners dẫn đầu với mức định giá trước khi gọi vốn là 80 triệu.

[00:10.70] This capital injection will primarily fund research and development for our autonomous software algorithms.
:: Việt: Nguồn vốn bơm bổ sung này sẽ chủ yếu tài trợ cho việc nghiên cứu và phát triển các thuật toán phần mềm tự hành của chúng tôi.

[00:16.00] We also plan to expand our sales presence across the European market over the next eighteen months.
:: Việt: Chúng tôi cũng dự định mở rộng sự hiện diện bán hàng trên khắp thị trường Châu Âu trong 18 tháng tới.

# QUIZ
Q1: How much capital was raised in the Series B funding round?
* [ ] $15 million
* [ ] $20 million
* [x] $25 million
* [ ] $80 million
-- Explanation: The speaker announces: "We raised twenty-five million dollars led by Horizon Venture Partners."

Q2: What will the new capital injection primarily fund?
* [ ] Executive salary increases
* [ ] Acquiring a local competitor
* [ ] Constructing a new corporate headquarters
* [x] Research and development for autonomous software algorithms
-- Explanation: The transcript explicitly states: "This capital injection will primarily fund research and development for our autonomous software algorithms."

Q3: What does the team or speaker plan to do next?
* [x] Expand our sales presence across the European market over the next eighteen months
* [ ] Close down all regional branch operations
* [ ] Freeze all new hiring activities indefinitely
* [ ] Cancel marketing efforts across the continent
-- Explanation: The speaker explains: "We also plan to expand our sales presence across the European market over the next eighteen months.".`;

export const LESSON_Q3_041_MD = `---
id: listen_toeic_q3_041
title: "M&A Acquisition Due Diligence & Financial Audit"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Corporate Finance", "M&A", "Audit"]
---

# VOCABULARY
- due diligence /duː ˈdɪl.ə.dʒəns/ (n): thẩm định toàn diện (pháp lý/tài chính). E.g., Conducting thorough due diligence minimizes post-acquisition risks.
- liability /ˌlaɪ.əˈbɪl.ə.ti/ (n): khoản nợ phải trả, nghĩa vụ tài chính. E.g., The audit uncovered undisclosed tax liabilities on the balance sheet.
- synergy /ˈsɪn.ɚ.dʒi/ (n): hiệu ứng cộng hưởng (sau sáp nhập). E.g., Merging operational teams will create significant cost synergies.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ quy chuẩn pháp lý. E.g., All departments must ensure strict regulatory compliance.

# TRANSCRIPT
[00:00.00] Hello executive team, this is an update regarding the ongoing financial due diligence for Project Titan.
:: Việt: Xin chào ban điều hành, đây là bản cập nhật liên quan đến quá trình thẩm định tài chính đang diễn ra cho Dự án Titan.

[00:05.30] Our audit team completed the review of the target firm's balance sheets and historical tax filings.
:: Việt: Đội ngũ kiểm toán của chúng tôi đã hoàn thành việc xem xét bảng cân đối kế toán và hồ sơ kê khai thuế lịch sử của công ty mục tiêu.

[00:10.70] While overall revenue growth is verified, we uncovered two million dollars in undisclosed contingent liabilities.
:: Việt: Trong khi mức tăng trưởng doanh thu tổng thể đã được xác minh, chúng tôi phát hiện 2 triệu đô la các khoản nợ tiềm tàng chưa được tiết lộ.

[00:16.10] We strongly advise renegotiating the final purchase price or including an indemnity clause in the definitive agreement.
:: Việt: Chúng tôi khuyến nghị khẩn thiết nên đàm phán lại giá mua cuối cùng hoặc đưa điều khoản bồi thường vào hợp đồng chính thức.

# QUIZ
Q1: What did the audit team uncover during due diligence?
* [ ] Falsified customer contracts
* [x] $2 million in undisclosed contingent liabilities
* [ ] Unapproved patent applications
* [ ] Overvalued real estate assets
-- Explanation: The advisory lead states: "we uncovered two million dollars in undisclosed contingent liabilities."

Q2: What action does the lead strongly advise the executive team to take?
* [ ] Cancel the acquisition immediately
* [ ] Pay the full purchase price in cash upfront
* [x] Renegotiate the final purchase price or include an indemnity clause
* [ ] Replace the target firm's management team
-- Explanation: The transcript explicitly states: "We strongly advise renegotiating the final purchase price or including an indemnity clause."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
* [x] While overall revenue growth is verified, we uncovered two million dollars in undisclosed contingent liabilities
-- Explanation: The speaker emphasizes: "While overall revenue growth is verified, we uncovered two million dollars in undisclosed contingent liabilities.".`;

export const LESSON_Q3_042_MD = `---
id: listen_toeic_q3_042
title: "Pharmaceutical Clinical Trial & Regulatory Approval"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Healthcare", "Pharma", "Research"]
---

# VOCABULARY
- clinical trial /ˈklɪn.ɪ.kəl traɪəl/ (n): thử nghiệm lâm sàng. E.g., The drug entered Phase 3 clinical trials last month.
- efficacy /ˈef.ə.kə.si/ (n): hiệu quả (của thuốc/phương pháp điều trị). E.g., Preliminary data demonstrated high treatment efficacy.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ (quy định y tế). E.g., Strict compliance with safety standards is mandatory.
- protocol /ˈproʊ.t̬ə.kɑːl/ (n): quy trình, nghi thức chuẩn mực. E.g., Emergency safety protocols must be reviewed annually.

# TRANSCRIPT
[00:00.00] Good morning research team, I have a significant milestone to report regarding our new cardiovascular medication.
:: Việt: Chào buổi sáng đội ngũ nghiên cứu, tôi có một cột mốc quan trọng cần báo cáo liên quan đến loại thuốc tim mạch mới của chúng ta.

[00:05.30] Phase three clinical trials have officially concluded with a ninety-two percent efficacy rate among participants.
:: Việt: Các cuộc thử nghiệm lâm sàng Giai đoạn 3 đã chính thức kết thúc với tỷ lệ hiệu quả 92% trong số những người tham gia.

[00:10.80] Our regulatory affairs team is currently assembling the documentation for health authority approval next month.
:: Việt: Đội ngũ phụ trách pháp lý của chúng ta hiện đang hoàn thiện bộ hồ sơ để xin phê duyệt từ cơ quan y tế vào tháng tới.

[00:16.10] Pending authorization, commercial manufacturing is scheduled to commence at our main facility in November.
:: Việt: Trong lúc chờ cấp phép, việc sản xuất thương mại được lên lịch bắt đầu tại nhà máy chính của chúng ta vào tháng 11.

# QUIZ
Q1: What efficacy rate was achieved in the Phase 3 clinical trials?
* [x] 92%
* [ ] 80%
* [ ] 85%
* [ ] 98%
-- Explanation: The speaker states that trials concluded with "a ninety-two percent efficacy rate among participants."

Q2: When is commercial manufacturing scheduled to begin?
* [ ] Next week
* [x] In November
* [ ] Next month
* [ ] Early next year
-- Explanation: The transcript explicitly mentions: "commercial manufacturing is scheduled to commence at our main facility in November."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [x] Our regulatory affairs team is currently assembling the documentation for health authority approval next month
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Our regulatory affairs team is currently assembling the documentation for health authority approval next month.".`;

export const LESSON_Q3_043_MD = `---
id: listen_toeic_q3_043
title: "Commercial Lease Negotiation & Building Facilities"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Real Estate", "Business", "Lease"]
---

# VOCABULARY
- tenant /ˈten.ənt/ (n): người/đơn vị thuê bất động sản. E.g., Prospective tenants must provide commercial credit references.
- renovation /ˌren.əˈveɪ.ʃən/ (n): sự cải tạo, sửa chữa. E.g., The landlord agreed to cover partial office renovation costs.
- square footage /skwer ˈfʊt.ɪdʒ/ (n): diện tích tính theo foot vuông. E.g., The total available square footage includes ten private offices.
- initiative /ɪˈnɪʃ.ə.t̬ɪv/ (n): sáng kiến đổi mới. E.g., Management launched a green initiative to reduce corporate carbon footprints.

# TRANSCRIPT
[00:00.00] Hello Mr. Zhao, I am following up on your inquiry about leasing the sixth floor of Commerce Tower.
:: Việt: Xin chào ông Zhao, tôi gọi điện theo dõi yêu cầu của ông về việc thuê tầng 6 của Tòa nhà Commerce Tower.

[00:05.20] The property owner has reviewed your proposed counter-offer regarding the monthly rental rate per square foot.
:: Việt: Chủ sở hữu bất động sản đã xem xét đề xuất thương lượng lại của ông về giá thuê hàng tháng trên mỗi foot vuông.

[00:10.60] They agreed to lower the base rent by five percent if you commit to a minimum three-year lease term.
:: Việt: Họ đã đồng ý giảm 5% giá thuê cơ bản nếu ông cam kết thời hạn hợp đồng tối thiểu 3 năm.

[00:15.90] I will send the revised lease draft to your legal counsel this afternoon for final review before signing.
:: Việt: Tôi sẽ gửi bản thảo hợp đồng thuê đã chỉnh sửa cho cố vấn pháp lý của ông vào chiều nay để rà soát lần cuối trước khi ký.

# QUIZ
Q1: What condition did the landlord set to lower the base rent by 5%?
* [ ] Paying the entire year's rent in advance
* [ ] Covering all renovation expenses independently
* [ ] Sharing office space with another tenant
* [x] Committing to a minimum three-year lease term
-- Explanation: The leasing manager explains that the landlord agreed to the discount "if you commit to a minimum three-year lease term."

Q2: Who will receive the revised lease draft this afternoon?
* [x] Mr. Zhao's legal counsel
* [ ] The property owner
* [ ] The building maintenance supervisor
* [ ] The city planning department
-- Explanation: The transcript explicitly states: "I will send the revised lease draft to your legal counsel this afternoon."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [x] They agreed to lower the base rent by five percent if you commit to a minimum three-year lease term
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "They agreed to lower the base rent by five percent if you commit to a minimum three-year lease term.".`;

export const LESSON_Q3_044_MD = `---
id: listen_toeic_q3_044
title: "Assembly Line Inspection & Defect Rate Reduction"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Manufacturing", "Quality", "Operations"]
---

# VOCABULARY
- defect /ˈdiː.fekt/ (n): lỗi, khuyết tật sản phẩm. E.g., Automated sensors help detect surface defects on the assembly line.
- calibration /ˌkæl.əˈbreɪ.ʃən/ (n): sự hiệu chỉnh (máy móc/thiết bị). E.g., Monthly machine calibration maintains high manufacturing precision.
- output /ˈaʊt.pʊt/ (n): sản lượng, đầu ra. E.g., Plant output increased by fifteen percent after upgrading machinery.
- efficiency /ɪˈfɪʃ.ən.si/ (n): tính hiệu quả, năng suất. E.g., Upgraded server hardware enhances internal operational efficiency.

# TRANSCRIPT
[00:00.00] Attention plant supervisors, this is a report from the quality assurance team regarding Production Line B.
:: Việt: Xin chú ý các giám sát nhà máy, đây là báo cáo từ đội ngũ đảm bảo chất lượng liên quan đến Dây chuyền Sản xuất B.

[00:05.30] During our morning audit, we detected a slight increase in the component defect rate above our acceptable threshold.
:: Việt: Trong buổi kiểm tra sáng nay, chúng tôi đã phát hiện tỷ lệ lỗi linh kiện tăng nhẹ vượt quá ngưỡng cho phép.

[00:10.80] Preliminary investigation indicates that robotic arm number three requires recalibration to restore precision alignment.
:: Việt: Điều tra sơ bộ chỉ ra rằng cánh tay robot số 3 cần được hiệu chỉnh lại để khôi phục độ căn chỉnh chính xác.

[00:16.10] Line B will be paused for two hours starting at 1 PM to allow technicians to complete the service.
:: Việt: Dây chuyền B sẽ tạm dừng trong 2 tiếng bắt đầu từ 1 giờ chiều để các kỹ thuật viên hoàn tất việc bảo trì.

# QUIZ
Q1: What problem was detected during the morning audit on Production Line B?
* [ ] A power outage in the warehouse
* [ ] A shortage of raw materials
* [x] An increase in the component defect rate above the threshold
* [ ] Injured workers on the assembly line
-- Explanation: The quality inspector reports: "we detected a slight increase in the component defect rate above our acceptable threshold."

Q2: How long will Line B be paused starting at 1 PM?
* [ ] 30 minutes
* [ ] One hour
* [ ] Until tomorrow morning
* [x] Two hours
-- Explanation: The transcript explicitly states: "Line B will be paused for two hours starting at 1 PM."

Q3: What maintenance or corrective action is required?
* [x] Recalibration to restore precision alignment
* [ ] Complete decommissioning of the machinery
* [ ] Hiring an external consulting firm
* [ ] Shutting down the facility for several months
-- Explanation: The transcript confirms: "Preliminary investigation indicates that robotic arm number three requires recalibration to restore precision alignment.".`;

export const LESSON_Q3_045_MD = `---
id: listen_toeic_q3_045
title: "Flight Cancellation & Passenger Compensation Policy"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Aviation", "Travel", "Customer Service"]
---

# VOCABULARY
- compensation /ˌkɑːm.penˈseɪ.ʃən/ (n): khoản bồi thường, đền bù. E.g., Passengers are entitled to financial compensation for overnight delays.
- rebook /ˌriːˈbʊk/ (v): đặt lại vé/chuyến bay. E.g., Gate agents will assist passengers to rebook on alternative flights.
- voucher /ˈvaʊ.tʃər/ (n): phiếu dịch vụ (ăn uống/khách sạn). E.g., The airline provided meal vouchers to all affected passengers.
- confidentiality /ˌkɑːn.fə.den.ʃiˈæl.ə.t̬i/ (n): tính bảo mật thông tin. E.g., Staff signed non-disclosure agreements to preserve client confidentiality.

# TRANSCRIPT
[00:00.00] Attention passengers on Skylink Flight 402 bound for Chicago, we have an important gate update.
:: Việt: Xin chú ý các hành khách trên chuyến bay Skylink 402 đi Chicago, chúng tôi có thông báo cập nhật quan trọng tại cửa khởi hành.

[00:05.30] Due to severe thunderstorms along our flight path, Flight 402 has been canceled for safety reasons.
:: Việt: Do dông bão nghiêm trọng dọc theo đường bay, Chuyến bay 402 đã bị hủy vì lý do an toàn.

[00:10.70] All passengers are entitled to be rebooked on tomorrow morning's departure at no additional charge.
:: Việt: Tất cả hành khách đều có quyền được đặt lại vé sang chuyến bay sáng mai mà không tốn thêm phí.

[00:16.00] Please proceed to Service Desk B to collect your hotel accommodation vouchers and revised boarding passes.
:: Việt: Vui lòng di chuyển đến Quầy Dịch vụ B để nhận phiếu phòng khách sạn và thẻ lên máy bay đã được điều chỉnh.

# QUIZ
Q1: Why was Skylink Flight 402 canceled?
* [ ] Mechanical issues with the engine
* [x] Severe thunderstorms along the flight path
* [ ] Lack of flight crew availability
* [ ] Airport runway maintenance
-- Explanation: The manager announces that the flight was canceled "Due to severe thunderstorms along our flight path."

Q2: Where should passengers go to collect their hotel accommodation vouchers?
* [ ] Gate 12 boarding lounge
* [ ] The main baggage claim area
* [x] Service Desk B
* [ ] The airport terminal exit
-- Explanation: The transcript explicitly states: "Please proceed to Service Desk B to collect your hotel accommodation vouchers."

Q3: What are passengers entitled to receive?
* [ ] Cash compensation for flight delays
* [ ] Complimentary first-class hotel suites
* [ ] A lifetime discount on future airline travel
* [x] Be rebooked on tomorrow morning's departure at no additional charge
-- Explanation: The announcement confirms: "All passengers are entitled to be rebooked on tomorrow morning's departure at no additional charge.".`;

export const LESSON_Q3_046_MD = `---
id: listen_toeic_q3_046
title: "E-Commerce Fulfillment Center & Express Delivery Options"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["E-Commerce", "Logistics", "Retail"]
---

# VOCABULARY
- fulfillment center /fʊlˈfɪl.mənt ˌsen.t̬ɚ/ (n): trung tâm xử lý và hoàn tất đơn hàng. E.g., Our new automated fulfillment center processes ten thousand orders daily.
- dispatch /dɪˈspætʃ/ (v, n): gửi đi, xuất kho. E.g., Orders placed before noon are dispatched on the same day.
- courier /ˈkʊr.i.ɚ/ (n): đơn vị/nhân viên chuyển phát nhanh. E.g., The local courier guarantees next-day delivery within urban areas.
- collaboration /kəˌlæb.əˈreɪ.ʃən/ (n): sự hợp tác làm việc nhóm. E.g., Cross-functional collaboration accelerated the product development cycle.

# TRANSCRIPT
[00:00.00] Good morning operations team, I want to review our performance metrics for the holiday shopping weekend.
:: Việt: Chào buổi sáng đội ngũ vận hành, tôi muốn điểm qua các chỉ số hiệu suất trong cuối tuần mua sắm lễ hội vừa qua.

[00:05.20] Thanks to our automated sorting system, our regional fulfillment centers processed over fifty thousand orders.
:: Việt: Nhờ hệ thống phân loại tự động, các trung tâm xử lý đơn hàng theo khu vực của chúng ta đã xử lý hơn 50.000 đơn hàng.

[00:10.60] Furthermore, ninety-five percent of express delivery orders were dispatched within three hours of customer checkout.
:: Việt: Hơn nữa, 95% các đơn hàng giao tận nơi hỏa tốc đã được xuất kho trong vòng 3 tiếng kể từ khi khách hàng thanh toán.

[00:16.00] We will maintain these extra operational shifts through the end of December to handle high order volumes.
:: Việt: Chúng ta sẽ duy trì các ca làm việc tăng cường này cho đến hết tháng 12 để xử lý lượng đơn hàng lớn.

# QUIZ
Q1: How many orders were processed by regional fulfillment centers over the weekend?
* [x] Over 50,000
* [ ] 10,000
* [ ] 25,000
* [ ] 100,000
-- Explanation: The director states that centers "processed over fifty thousand orders."

Q2: What percentage of express delivery orders were dispatched within 3 hours?
* [ ] 80%
* [x] 95%
* [ ] 85%
* [ ] 90%
-- Explanation: The transcript explicitly mentions: "ninety-five percent of express delivery orders were dispatched within three hours."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Maintain these extra operational shifts through the end of December to handle high order volumes
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "We will maintain these extra operational shifts through the end of December to handle high order volumes.".`;

export const LESSON_Q3_047_MD = `---
id: listen_toeic_q3_047
title: "Press Conference & Corporate Crisis Communication"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Media", "PR", "Communications"]
---

# VOCABULARY
- press release /pres rɪˈliːs/ (n): thông cáo báo chí. E.g., The PR department issued an official press release this morning.
- spokesperson /ˈspoʊksˌpɜːr.sən/ (n): người phát ngôn. E.g., Our corporate spokesperson will address media inquiries at 2 PM.
- statement /ˈsteɪt.mənt/ (n): tuyên bố chính thức. E.g., The CEO issued a formal statement regarding the product recall.
- productivity /ˌproʊ.dʌkˈtɪv.ə.t̬i/ (n): năng suất lao động. E.g., Flexible work schedules contributed to higher employee productivity.

# TRANSCRIPT
[00:00.00] Good afternoon members of the press, thank you for attending this emergency briefing today.
:: Việt: Chào buổi chiều các nhà báo, cảm ơn quý vị đã đến tham dự buổi họp báo khẩn cấp hôm nay.

[00:05.20] Our company has released an official press statement regarding the temporary service disruption experienced yesterday.
:: Việt: Công ty chúng tôi đã phát hành một thông cáo báo chí chính thức liên quan đến sự gián đoạn dịch vụ tạm thời xảy ra vào ngày hôm qua.

[00:10.70] Our technical teams have fully restored all network operations and implemented secondary security safeguards.
:: Việt: Đội ngũ kỹ thuật của chúng tôi đã khôi phục hoàn toàn mọi hoạt động mạng và triển khai các lớp bảo vệ an ninh thứ cấp.

[00:16.10] Our corporate spokesperson will now open the floor to answer questions from accredited journalists.
:: Việt: Người phát ngôn doanh nghiệp của chúng tôi bây giờ sẽ dành thời gian để trả lời câu hỏi từ các nhà báo được cấp phép.

# QUIZ
Q1: What is the main purpose of the emergency briefing?
* [ ] To announce a new product release
* [ ] To introduce the new Chief Executive Officer
* [ ] To publish quarterly financial earnings
* [x] To address a temporary service disruption that occurred yesterday
-- Explanation: The speaker explains that the briefing is regarding "the temporary service disruption experienced yesterday."

Q2: What will happen after the press statement?
* [x] The spokesperson will answer questions from accredited journalists
* [ ] A product demonstration
* [ ] A guided tour of the technical facility
* [ ] A networking lunch for investors
-- Explanation: The transcript explicitly states: "Our corporate spokesperson will now open the floor to answer questions from accredited journalists."

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [x] Press Conference & Corporate Crisis Communication
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Good afternoon members of the press, thank you for attending this emergency briefing today.".`;

export const LESSON_Q3_048_MD = `---
id: listen_toeic_q3_048
title: "Renewable Energy Transition & Solar Panel Installation"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Energy", "Environment", "Sustainability"]
---

# VOCABULARY
- renewable energy /rɪˈnuː.ə.bəl ˈen.ɚ.dʒi/ (n): năng lượng tái tạo. E.g., The factory plans to transition entirely to renewable energy by 2030.
- footprint /ˈfʊt.prɪnt/ (n): dấu chân (môi trường/carbon). E.g., Rooftop solar panels significantly reduce our corporate carbon footprint.
- grid /ɡrɪd/ (n): mạng lưới điện quốc gia/khu vực. E.g., Excess solar power will be fed back into the regional electricity grid.
- optimization /ˌɑːp.tə.məˈzeɪ.ʃən/ (n): sự tối ưu hóa hệ thống. E.g., Code optimization reduced server response times significantly.

# TRANSCRIPT
[00:00.00] Good morning colleagues, I am excited to announce our new green energy initiative for the manufacturing plant.
:: Việt: Chào buổi sáng các đồng nghiệp, tôi rất vui mừng được thông báo về sáng kiến năng lượng xanh mới cho nhà máy sản xuất của chúng ta.

[00:05.30] Next month, we will begin installing commercial solar panels across the entire rooftop of Facility A.
:: Việt: Tháng tới, chúng ta sẽ bắt đầu lắp đặt các tấm pin năng lượng mặt trời thương mại trên toàn bộ mái nhà của Cơ sở A.

[00:10.80] This renewable system is expected to generate thirty percent of our daily electricity requirements.
:: Việt: Hệ thống năng lượng tái tạo này dự kiến sẽ tạo ra 30% nhu cầu điện hàng ngày của chúng ta.

[00:16.00] By reducing our dependence on traditional power grids, we will lower carbon emissions and operational costs.
:: Việt: Bằng cách giảm sự phụ thuộc vào lưới điện truyền thống, chúng ta sẽ giảm lượng khí thải carbon và chi phí vận hành.

# QUIZ
Q1: Where will the commercial solar panels be installed next month?
* [ ] In the employee parking lot
* [ ] At the company headquarters downtown
* [x] Across the entire rooftop of Facility A
* [ ] Along the perimeter fence of the factory
-- Explanation: The speaker specifies that installation will begin "across the entire rooftop of Facility A."

Q2: What percentage of daily electricity requirements is the solar system expected to generate?
* [ ] 15%
* [ ] 20%
* [ ] 50%
* [x] 30%
-- Explanation: The transcript explicitly states: "This renewable system is expected to generate thirty percent of our daily electricity requirements."

Q3: What will happen according to the speaker?
* [x] Lower carbon emissions and operational costs
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "By reducing our dependence on traditional power grids, we will lower carbon emissions and operational costs.".`;

export const LESSON_Q3_049_MD = `---
id: listen_toeic_q3_049
title: "Corporate Property Insurance & Claim Assessment"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Insurance", "Finance", "Business"]
---

# VOCABULARY
- policyholder /ˈpɑː.lə.siˌhoʊl.dɚ/ (n): chủ hợp đồng bảo hiểm. E.g., The policyholder filed a claim following the heavy storm damage.
- deductible /dɪˈdʌk.tə.bəl/ (n): mức miễn thường. E.g., The claim payment will be issued after subtracting the insurance deductible.
- premium /ˈpriː.mi.əm/ (n): phí bảo hiểm đóng theo kỳ. E.g., Paying annual premiums on time ensures continuous policy coverage.
- allocate /ˈæl.ə.keɪt/ (v): phân bổ nguồn lực, kinh phí. E.g., Finance leaders agreed to allocate additional funding to research.

# TRANSCRIPT
[00:00.00] Hello Mr. Gallagher, this is Brenda from Commercial Claims Insurance following up on claim number 408.
:: Việt: Xin chào ông Gallagher, đây là Brenda từ Công ty Bảo hiểm Bồi thường Thương mại theo dõi hồ sơ bồi thường số 408.

[00:05.20] Our field adjuster has completed the assessment of the water damage at your warehouse location.
:: Việt: Giám định viên hiện trường của chúng tôi đã hoàn thành việc đánh giá thiệt hại do nước tại khu vực kho hàng của ông.

[00:10.70] The total approved repair cost is forty-five thousand dollars, minus your five-hundred-dollar deductible.
:: Việt: Tổng chi phí sửa chữa được phê duyệt là 45.000 đô la, trừ đi 500 đô la mức miễn thường của ông.

[00:16.10] A reimbursement check will be mailed to your business address within three business days.
:: Việt: Séc hoàn trả chi phí sẽ được gửi qua bưu điện đến địa chỉ kinh doanh của ông trong vòng 3 ngày làm việc.

# QUIZ
Q1: What caused the damage at Mr. Gallagher's warehouse?
* [ ] An electrical fire
* [x] Water damage
* [ ] Structural roof collapse
* [ ] Vandalism
-- Explanation: The claims adjuster mentions "the assessment of the water damage at your warehouse location."

Q2: How much is Mr. Gallagher's insurance deductible?
* [ ] $100
* [ ] $250
* [x] $500
* [ ] $1,000
-- Explanation: The transcript explicitly states: "minus your five-hundred-dollar deductible."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
* [x] Be mailed to your business address within three business days
-- Explanation: The speaker notes: "A reimbursement check will be mailed to your business address within three business days.".`;

export const LESSON_Q3_050_MD = `---
id: listen_toeic_q3_050
title: "Automated Warehouse & Inventory Management"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Logistics", "Warehouse", "Automation"]
---

# VOCABULARY
- automated /ˈɑː.t̬ə.meɪ.t̬ɪd/ (adj): tự động hóa. E.g., The automated storage and retrieval system increased packing speed.
- barcode /ˈbɑːr.koʊd/ (n): mã vạch. E.g., Workers scan item barcodes to update stock levels in real time.
- inventory audit /ˈɪn.vən.tɔːr.i ˈɑː.dɪt/ (n): việc kiểm kê hàng tồn kho. E.g., The annual inventory audit will begin this Saturday.
- prioritize /praɪˈɔːr.ə.taɪz/ (v): ưu tiên xử lý trước. E.g., Customer support specialists prioritize high-urgency inquiries.

# TRANSCRIPT
[00:00.00] Good morning warehouse staff, please pay attention to this brief update regarding our inventory management system.
:: Việt: Chào buổi sáng nhân viên kho, vui lòng chú ý đến bản cập nhật ngắn này liên quan đến hệ thống quản lý kho của chúng ta.

[00:05.20] Starting next Monday, we are transitioning to a fully automated barcode scanning system in Sector 4.
:: Việt: Bắt đầu từ Thứ Hai tuần tới, chúng ta sẽ chuyển sang hệ thống quét mã vạch tự động hoàn toàn tại Khu vực 4.

[00:10.70] All incoming pallets will be scanned automatically upon entry to update inventory levels instantly.
:: Việt: Tất cả các kiện hàng pallet nhập kho sẽ được quét tự động ngay khi vào cửa để cập nhật số lượng tồn kho tức thì.

[00:16.00] Brief hands-on training sessions will be conducted during your regular shifts over the next two days.
:: Việt: Các buổi đào tạo thực hành ngắn sẽ được tổ chức trong các ca làm việc thường lệ của các bạn trong 2 ngày tới.

# QUIZ
Q1: What system is being introduced in Sector 4 next Monday?
* [x] A fully automated barcode scanning system
* [ ] Manual paper logging
* [ ] RFID tracking wristbands
* [ ] Robotic forklifts
-- Explanation: The manager announces transitioning to "a fully automated barcode scanning system in Sector 4."

Q2: When will training sessions take place?
* [ ] On the weekend
* [x] During regular shifts over the next two days
* [ ] Next month after the launch
* [ ] After work hours
-- Explanation: The transcript explicitly states: "training sessions will be conducted during your regular shifts over the next two days."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Be scanned automatically upon entry to update inventory levels instantly
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "All incoming pallets will be scanned automatically upon entry to update inventory levels instantly.".`;

export const LESSON_Q3_051_MD = `---
id: listen_toeic_q3_051
title: "Agritech Smart Farming & Automated Irrigation"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Agritech", "Agriculture", "Technology"]
---

# VOCABULARY
- irrigation /ˌɪr.əˈɡeɪ.ʃən/ (n): sự tưới tiêu. E.g., Automated drip irrigation conserves water while maximizing crop yield.
- moisture /ˈmɔɪs.tʃɚ/ (n): độ ẩm. E.g., Soil moisture sensors send real-time data to the farmer's tablet.
- yield /jiːld/ (n): năng suất thu hoạch. E.g., Smart farming techniques boosted overall crop yield by twenty percent.
- streamline /ˈstriːm.laɪn/ (v): tinh giản, tổ chức hợp lý hóa. E.g., The corporate restructure aims to streamline reporting channels.

# TRANSCRIPT
[00:00.00] Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.
:: Việt: Chào mừng mọi người đến với buổi trình diễn Hệ thống Tưới tiêu Chính xác Nông nghiệp Thông minh của chúng tôi.

[00:05.20] Soil moisture sensors embedded throughout the field analyze ground conditions every fifteen minutes.
:: Việt: Các cảm biến độ ẩm đất được gắn khắp cánh đồng sẽ phân tích điều kiện lòng đất mỗi 15 phút một lần.

[00:10.60] When moisture levels drop below optimum thresholds, the system triggers targeted drip irrigation automatically.
:: Việt: Khi mức độ ẩm giảm xuống dưới ngưỡng tối ưu, hệ thống sẽ tự động kích hoạt tưới nhỏ giọt theo mục tiêu.

[00:16.10] This smart technology reduces water consumption by thirty-five percent while improving crop yield.
:: Việt: Công nghệ thông minh này giúp giảm 35% lượng nước tiêu thụ đồng thời nâng cao năng suất cây trồng.

# QUIZ
Q1: How often do the soil moisture sensors analyze ground conditions?
* [ ] Every 5 minutes
* [ ] Every 10 minutes
* [ ] Every hour
* [x] Every 15 minutes
-- Explanation: The director specifies that sensors "analyze ground conditions every fifteen minutes."

Q2: By how much does the smart irrigation system reduce water consumption?
* [x] 35%
* [ ] 15%
* [ ] 25%
* [ ] 50%
-- Explanation: The transcript explicitly states: "This smart technology reduces water consumption by thirty-five percent."

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [x] Agritech Smart Farming & Automated Irrigation
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.".`;

export const LESSON_Q3_052_MD = `---
id: listen_toeic_q3_052
title: "Health Insurance Policy Renewal & Wellness Discounts"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Insurance", "Health", "Benefits"]
---

# VOCABULARY
- coverage /ˈkʌv.ɚ.ɪdʒ/ (n): phạm vi bảo hiểm. E.g., Comprehensive health coverage includes dental and vision care.
- premium /ˈpriː.mi.əm/ (n): phí bảo hiểm. E.g., Policyholders can lower their monthly premiums by participating in wellness programs.
- beneficiary /ˌben.əˈfɪʃ.i.er.i/ (n): người thụ hưởng bảo hiểm. E.g., Please ensure your primary beneficiary details are updated.
- authorization /ˌɑː.θɚ.əˈzeɪ.ʃən/ (n): sự cấp phép chính thức. E.g., Purchase orders require senior management authorization.

# TRANSCRIPT
[00:00.00] Hello Ms. Vance, this is Apex Mutual Insurance calling regarding your annual health coverage renewal.
:: Việt: Xin chào bà Vance, đây là Bảo hiểm Apex Mutual gọi điện liên quan đến việc gia hạn hợp đồng bảo hiểm sức khỏe hàng năm của bà.

[00:05.20] Your current group health policy is set to expire at the end of next month on November 30th.
:: Việt: Hợp đồng bảo hiểm sức khỏe nhóm hiện tại của bà dự kiến sẽ hết hạn vào cuối tháng tới, ngày 30 tháng 11.

[00:10.60] By completing your online health assessment before Friday, you can unlock a ten percent discount on your premium.
:: Việt: Bằng cách hoàn thành đánh giá sức khỏe trực tuyến trước Thứ Sáu, bà có thể nhận được mức giảm giá 10% cho phí bảo hiểm của mình.

[00:15.90] Please log into your member portal or contact your account representative to finalize your renewal terms.
:: Việt: Vui lòng đăng nhập vào cổng thông tin hội viên hoặc liên hệ với đại diện tài khoản của bà để hoàn tất các điều khoản gia hạn.

# QUIZ
Q1: When is Ms. Vance's current health policy set to expire?
* [ ] At the end of this week
* [ ] November 15th
* [x] November 30th
* [ ] End of the year
-- Explanation: The speaker explicitly states that the policy expires "at the end of next month on November 30th."

Q2: What must Ms. Vance do to receive a 10% discount on her premium?
* [ ] Upgrade to a premium plan
* [ ] Refer a friend to the insurance company
* [ ] Pay for two years in advance
* [x] Complete an online health assessment before Friday
-- Explanation: The transcript mentions: "By completing your online health assessment before Friday, you can unlock a ten percent discount."

Q3: What are listeners requested to do?
* [x] Log into your member portal or contact your account representative to finalize your renewal terms
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Please log into your member portal or contact your account representative to finalize your renewal terms.".`;

export const LESSON_Q3_053_MD = `---
id: listen_toeic_q3_053
title: "Rail Freight Schedule & Container Tracking"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Transport", "Logistics", "Rail"]
---

# VOCABULARY
- cargo /ˈkɑːr.ɡoʊ/ (n): hàng hóa vận chuyển. E.g., Intermodal cargo trains carry goods across continental trade routes.
- departure /dɪˈpɑːr.tʃɚ/ (n): sự khởi hành. E.g., The scheduled departure was delayed due to track maintenance.
- consignment /kənˈsaɪn.mənt/ (n): lô hàng gửi. E.g., You can track the real-time location of your consignment online.
- consensus /kənˈsen.səs/ (n): sự đồng thuận chung. E.g., Committee members reached a consensus on the new budget proposal.

# TRANSCRIPT
[00:00.00] Attention shipping clients, this is an update from Trans-Continental Freight Services regarding Train 801.
:: Việt: Xin chú ý các khách hàng gửi hàng, đây là thông báo cập nhật từ Dịch vụ Vận tải Hàng hóa Xuyên lục địa liên quan đến Chuyến tàu 801.

[00:05.30] Freight Train 801 carrying your industrial cargo is scheduled to depart from the Chicago yard tomorrow at 6 AM.
:: Việt: Tàu chở hàng 801 mang hàng hóa công nghiệp của quý vị được lên lịch khởi hành từ ga Chicago vào 6 giờ sáng mai.

[00:10.70] Due to track upgrades in the Midwest region, total transit time to the West Coast will be extended by twelve hours.
:: Việt: Do việc nâng cấp đường sắt tại khu vực Trung Tây, tổng thời gian di chuyển đến Bờ Tây sẽ kéo dài thêm 12 tiếng.

[00:16.00] Live GPS tracking links for all registered containers are now accessible through our online portal.
:: Việt: Đường liên kết theo dõi GPS trực tiếp cho tất cả các container đã đăng ký hiện có thể truy cập qua cổng thông tin trực tuyến của chúng tôi.

# QUIZ
Q1: Where will Freight Train 801 depart from tomorrow at 6 AM?
* [ ] Detroit yard
* [x] Chicago yard
* [ ] Denver terminal
* [ ] Los Angeles port
-- Explanation: The coordinator states that Freight Train 801 is "scheduled to depart from the Chicago yard tomorrow at 6 AM."

Q2: By how long will the transit time to the West Coast be extended?
* [ ] 6 hours
* [ ] 24 hours
* [x] 12 hours
* [ ] 48 hours
-- Explanation: The transcript explicitly states: "total transit time to the West Coast will be extended by twelve hours."

Q3: Where or how can relevant resources be accessed?
* [ ] In a printed brochure at the front desk
* [ ] Through an encrypted external flash drive
* [ ] By mailing a formal letter to headquarters
* [x] Through our online portal
-- Explanation: The speaker mentions: "Live GPS tracking links for all registered containers are now accessible through our online portal.".`;

export const LESSON_Q3_054_MD = `---
id: listen_toeic_q3_054
title: "Global Supply Chain Audit & Supplier Compliance"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Supply Chain", "Global", "Compliance"]
---

# VOCABULARY
- vendor /ˈven.dɚ/ (n): nhà cung ứng. E.g., All overseas vendors must comply with international labor regulations.
- audit /ˈɑː.dɪt/ (n, v): việc kiểm tra đánh giá. E.g., Annual vendor audits ensure ethical sourcing standards.
- procurement /prəˈkjʊr.mənt/ (n): sự thu mua, cung ứng vật tư. E.g., The procurement department negotiated better bulk material pricing.
- discrepancy /dɪˈskrep.ən.si/ (n): sự sai lệch, khác biệt số liệu. E.g., The internal audit detected an accounting discrepancy in inventory logs.

# TRANSCRIPT
[00:00.00] Good morning management team, I would like to review our global supply chain sustainability goals for next year.
:: Việt: Chào buổi sáng ban quản lý, tôi muốn điểm qua các mục tiêu phát triển bền vững chuỗi cung ứng toàn cầu cho năm tới.

[00:05.20] Starting in January, all overseas manufacturing vendors will undergo mandatory third-party labor and safety audits.
:: Việt: Bắt đầu từ tháng 1, tất cả các nhà cung ứng sản xuất tại nước ngoài sẽ phải trải qua các cuộc kiểm tra lao động và an toàn bắt buộc từ bên thứ ba.

[00:10.70] Vendors who fail to meet our compliance benchmarks within sixty days will have their contracts suspended immediately.
:: Việt: Các nhà cung ứng không đạt chuẩn tuân thủ của chúng ta trong vòng 60 ngày sẽ bị đình chỉ hợp đồng ngay lập tức.

[00:16.10] Our regional procurement managers will conduct informational webinars next week to assist vendors with preparation.
:: Việt: Các quản lý cung ứng khu vực của chúng ta sẽ tổ chức các buổi hội thảo trực tuyến hướng dẫn vào tuần tới để hỗ trợ các nhà cung ứng chuẩn bị.

# QUIZ
Q1: What mandatory requirement will overseas vendors undergo starting in January?
* [x] Third-party labor and safety audits
* [ ] Price reduction negotiations
* [ ] Transition to automated packaging
* [ ] Mandatory relocation to new facilities
-- Explanation: The VP announces that vendors "will undergo mandatory third-party labor and safety audits."

Q2: How many days do vendors have to meet compliance benchmarks before contract suspension?
* [ ] 30 days
* [x] 60 days
* [ ] 45 days
* [ ] 90 days
-- Explanation: The transcript explicitly states: "Vendors who fail to meet our compliance benchmarks within sixty days will have their contracts suspended."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Conduct informational webinars next week to assist vendors with preparation
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Our regional procurement managers will conduct informational webinars next week to assist vendors with preparation.".`;

export const LESSON_Q3_055_MD = `---
id: listen_toeic_q3_055
title: "5G Infrastructure Expansion & Fiber Optic Network"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Telecom", "Technology", "Infrastructure"]
---

# VOCABULARY
- bandwidth /ˈbænd.wɪdθ/ (n): băng thông mạng. E.g., Upgrading fiber optic lines increases network bandwidth significantly.
- coverage /ˈkʌv.ɚ.ɪdʒ/ (n): vùng phủ sóng. E.g., The expansion project aims to broaden 5G coverage across rural districts.
- infrastructure /ˈɪn.frəˌstrʌk.tʃɚ/ (n): hạ tầng kỹ thuật. E.g., Investing in modern telecom infrastructure enhances data connection stability.
- feasibility /ˌfiː.zəˈbɪl.ə.t̬i/ (n): tính khả thi của dự án. E.g., Engineers conducted a detailed feasibility study before construction.

# TRANSCRIPT
[00:00.00] Good afternoon shareholders, I am pleased to share an update on our regional telecommunications network upgrade.
:: Việt: Chào buổi chiều các cổ đông, tôi rất hân hạnh được chia sẻ thông tin cập nhật về việc nâng cấp mạng viễn thông khu vực của chúng ta.

[00:05.30] Over the past quarter, our engineering team installed two hundred new 5G cellular towers across the metro area.
:: Việt: Trong quý qua, đội ngũ kỹ thuật của chúng tôi đã lắp đặt 200 trạm phát sóng 5G mới trên khắp khu vực đô thị.

[00:10.80] This infrastructure expansion has expanded high-speed mobile data coverage to an additional three hundred thousand residents.
:: Việt: Việc mở rộng hạ tầng này đã mở rộng vùng phủ sóng dữ liệu di động tốc độ cao tới thêm 300.000 người dân.

[00:16.10] Next month, we will begin upgrading our backbone fiber optic cables to support growing enterprise bandwidth demands.
:: Việt: Tháng tới, chúng tôi sẽ bắt đầu nâng cấp hệ thống cáp quang trục chính để đáp ứng nhu cầu băng thông doanh nghiệp đang gia tăng.

# QUIZ
Q1: How many new 5G cellular towers were installed over the past quarter?
* [ ] 100
* [ ] 300
* [ ] 500
* [x] 200
-- Explanation: The director states: "our engineering team installed two hundred new 5G cellular towers."

Q2: What project will begin next month?
* [x] Upgrading backbone fiber optic cables
* [ ] Building new data centers
* [ ] Launching satellite TV services
* [ ] Replacing legacy telephone lines
-- Explanation: The transcript explicitly mentions: "Next month, we will begin upgrading our backbone fiber optic cables."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [x] This infrastructure expansion has expanded high-speed mobile data coverage to an additional three hundred thousand residents
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "This infrastructure expansion has expanded high-speed mobile data coverage to an additional three hundred thousand residents.".`;

export const LESSON_Q3_056_MD = `---
id: listen_toeic_q3_056
title: "Agricultural Commodities Market & Grain Export Limits"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Commodities", "Trade", "Agriculture"]
---

# VOCABULARY
- commodity /kəˈmɑː.də.t̬i/ (n): hàng hóa thương phẩm. E.g., Wheat and soybeans are key agricultural commodities traded globally.
- quota /ˈkwoʊ.t̬ə/ (n): hạn ngạch xuất nhập khẩu. E.g., The government imposed a seasonal export quota on grain shipments.
- fluctuation /ˌflʌk.tʃuˈeɪ.ʃən/ (n): sự biến động giá cả. E.g., Severe droughts caused dramatic fluctuations in crop market prices.
- delegation /ˌdel.əˈɡeɪ.ʃən/ (n): sự phân công, ủy thác trách nhiệm. E.g., Effective managerial delegation empowers team leaders.

# TRANSCRIPT
[00:00.00] Hello commodity traders, here is your daily market report on international agricultural grain futures.
:: Việt: Xin chào các nhà giao dịch hàng hóa, đây là bản tin thị trường hàng ngày về hợp đồng tương lai nông sản quốc tế.

[00:05.20] Wheat prices surged by eight percent this morning following news of unexpected drought conditions in South America.
:: Việt: Giá lúa mì đã tăng vọt 8% vào sáng nay sau tin tức về tình trạng hạn hán bất ngờ tại Nam Mỹ.

[00:10.70] In response, major exporting nations have introduced seasonal export quotas to stabilize domestic food supplies.
:: Việt: Để ứng phó, các quốc gia xuất khẩu lớn đã áp dụng hạn ngạch xuất khẩu theo mùa nhằm ổn định nguồn cung thực phẩm trong nước.

[00:16.10] Analysts predict that grain price volatility will remain high until official harvest projections are released next Tuesday.
:: Việt: Các nhà phân tích dự báo sự biến động giá ngũ cốc sẽ tiếp tục ở mức cao cho đến khi báo cáo dự báo thu hoạch chính thức được công bố vào Thứ Ba tuần tới.

# QUIZ
Q1: By how much did wheat prices surge this morning?
* [ ] 5%
* [ ] 12%
* [x] 8%
* [ ] 15%
-- Explanation: The analyst reports that "Wheat prices surged by eight percent this morning."

Q2: When will official harvest projections be released?
* [ ] Tomorrow morning
* [ ] This Friday
* [ ] At the end of the month
* [x] Next Tuesday
-- Explanation: The transcript explicitly states: "until official harvest projections are released next Tuesday."

Q3: What key detail does the speaker emphasize?
* [x] In response, major exporting nations have introduced seasonal export quotas to stabilize domestic food supplies
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "In response, major exporting nations have introduced seasonal export quotas to stabilize domestic food supplies.".`;

export const LESSON_Q3_057_MD = `---
id: listen_toeic_q3_057
title: "Supermarket Supply Chain & Shelf Inventory Management"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Retail", "Supermarket", "Logistics"]
---

# VOCABULARY
- perishable /ˈper.ɪ.ʃə.bəl/ (adj): dễ hư hỏng. E.g., Perishable goods must be stored in refrigerated units immediately.
- replenishment /rɪˈplen.ɪʃ.mənt/ (n): sự bổ sung hàng hóa. E.g., Overnight shelf replenishment ensures full availability for morning shoppers.
- automated tracking /ˌɑː.t̬ə.meɪ.t̬ɪd ˈtræk.ɪŋ/ (n): theo dõi tự động. E.g., Automated tracking alerts staff when product inventory runs low.
- contingency /kənˈtɪn.dʒən.si/ (n): tình huống dự phòng rủi ro. E.g., The project budget incorporates a ten-percent contingency fund.

# TRANSCRIPT
[00:00.00] Attention all floor supervisors, here is a quick operational update regarding our fresh produce section.
:: Việt: Xin chú ý toàn thể các giám sát ca, đây là thông báo cập nhật vận hành nhanh liên quan đến khu vực thực phẩm tươi sống.

[00:05.20] To minimize waste of perishable items, we are implementing an automated inventory replenishment system starting today.
:: Việt: Để giảm thiểu hao hụt các mặt hàng dễ hư hỏng, chúng ta sẽ triển khai hệ thống bổ sung hàng hóa tự động bắt đầu từ hôm nay.

[00:10.70] Floor staff must scan item barcodes whenever restocking display shelves to ensure accuracy in central stock counts.
:: Việt: Nhân viên gian hàng phải quét mã vạch sản phẩm mỗi khi chất thêm hàng lên kệ trưng bày để đảm bảo độ chính xác của số lượng tồn kho trung tâm.

[00:16.10] Mandatory fifteen-minute training sessions on the new handheld scanners will take place in the breakroom at 2 PM.
:: Việt: Các buổi đào tạo 15 phút bắt buộc về máy quét cầm tay mới sẽ diễn ra tại phòng nghỉ vào lúc 2 giờ chiều.

# QUIZ
Q1: Why is the supermarket implementing an automated replenishment system?
* [ ] To reduce floor staff working hours
* [x] To minimize waste of perishable items
* [ ] To increase product retail prices
* [ ] To prepare for store renovation
-- Explanation: The manager specifies that the system is being introduced "To minimize waste of perishable items."

Q2: What will take place in the breakroom at 2 PM?
* [ ] A quarterly performance evaluation
* [ ] A safety inspection
* [x] Mandatory 15-minute training sessions on new scanners
* [ ] A union representative meeting
-- Explanation: The transcript explicitly states: "Mandatory fifteen-minute training sessions on the new handheld scanners will take place in the breakroom at 2 PM."

Q3: What requirement or instruction must be followed?
* [ ] Submit a formal written appeal to executives
* [ ] Request emergency budget allocations
* [ ] Wait for an official government notification
* [x] Scan item barcodes whenever restocking display shelves to ensure accuracy in central stock counts
-- Explanation: The transcript specifies: "Floor staff must scan item barcodes whenever restocking display shelves to ensure accuracy in central stock counts.".`;

export const LESSON_Q3_058_MD = `---
id: listen_toeic_q3_058
title: "Workplace Safety Audit & Personal Protective Equipment"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Safety", "Manufacturing", "Compliance"]
---

# VOCABULARY
- Personal Protective Equipment (PPE) /ˈpɜːr.sən.əl prəˈtek.tɪv ɪˈkwɪp.mənt/ (n): thiết bị bảo hộ cá nhân. E.g., Wearing required PPE is mandatory inside the chemical processing zone.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ quy định. E.g., Regular safety audits guarantee full compliance with government regulations.
- hazard /ˈhæz.ɚd/ (n): mối nguy hiểm. E.g., Report any potential tripping hazards to the maintenance team immediately.
- milestone /ˈmaɪl.stoʊn/ (n): cột mốc quan trọng. E.g., Completing the beta phase marks a critical project milestone.

# TRANSCRIPT
[00:00.00] Attention all plant personnel, this is an urgent announcement from the Environment and Safety Department.
:: Việt: Xin chú ý toàn thể nhân viên nhà máy, đây là thông báo khẩn cấp từ Bộ phận Môi trường và An toàn Lao động.

[00:05.30] Following an unannounced safety inspection, all workers are reminded that high-visibility vests and steel-toe boots are mandatory.
:: Việt: Sau một buổi kiểm tra an toàn đột xuất, tất cả công nhân được nhắc nhở rằng áo phản quang và giày bảo hộ mũi thép là bắt buộc.

[00:10.80] These regulations apply everywhere inside the active loading dock and machinery manufacturing zones without exception.
:: Việt: Các quy định này áp dụng tại mọi nơi bên trong khu vực bốc dỡ hàng và khu vực sản xuất máy móc mà không có ngoại lệ.

[00:16.00] Anyone found without required protective gear will be temporarily suspended from the floor pending safety review.
:: Việt: Bất kỳ ai bị phát hiện không mang thiết bị bảo hộ theo quy định sẽ bị tạm thời đình chỉ làm việc để chờ xem xét an toàn.

# QUIZ
Q1: What prompted this safety announcement?
* [x] An unannounced safety inspection
* [ ] A machinery breakdown on the assembly line
* [ ] A scheduled visit by corporate executives
* [ ] The arrival of new raw materials
-- Explanation: The safety officer mentions that the reminder comes "Following an unannounced safety inspection."

Q2: What happens to workers found without required protective gear?
* [ ] They will be fined $100 immediately
* [x] They will be temporarily suspended from the floor pending safety review
* [ ] They will receive a written compliment
* [ ] They will be transferred to another department
-- Explanation: The transcript explicitly states: "Anyone found without required protective gear will be temporarily suspended from the floor pending safety review."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [x] These regulations apply everywhere inside the active loading dock and machinery manufacturing zones without exception
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "These regulations apply everywhere inside the active loading dock and machinery manufacturing zones without exception.".`;

export const LESSON_Q3_059_MD = `---
id: listen_toeic_q3_059
title: "Electric Vehicle Battery Manufacturing & Assembly Line"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Automotive", "EV", "Manufacturing"]
---

# VOCABULARY
- lithium-ion /ˌlɪθ.i.əm ˈaɪ.ɑːn/ (n, adj): pin lithium-ion. E.g., The facility specializes in assembling high-density lithium-ion battery packs.
- throughput /ˈθruː.pʊt/ (n): năng suất sản xuất. E.g., Upgrading robotic arms increased daily battery pack throughput by twenty percent.
- quality control /ˈkwɑː.lə.t̬i kənˈtroʊl/ (n): kiểm soát chất lượng. E.g., Every battery module undergoes rigorous quality control testing.
- benchmark /ˈbentʃ.mɑːrk/ (n): tiêu chuẩn đánh giá, mốc chuẩn so sánh. E.g., The quarterly report sets a new performance benchmark for the industry.

# TRANSCRIPT
[00:00.00] Good morning engineers, I am pleased to share a major milestone achieved at our electric vehicle battery plant.
:: Việt: Chào buổi sáng các kỹ sư, tôi rất vui mừng được chia sẻ một cột mốc quan trọng đạt được tại nhà máy sản xuất pin xe điện của chúng ta.

[00:05.30] By integrating advanced robotic assembly cells, we have increased our daily lithium-ion pack throughput by twenty-five percent.
:: Việt: Bằng cách tích hợp các ô lắp ráp robot tiên tiến, chúng ta đã tăng năng suất bộ pin lithium-ion hàng ngày lên 25%.

[00:10.80] Furthermore, our defect testing failure rate dropped to an all-time low of point zero two percent this quarter.
:: Việt: Hơn nữa, tỷ lệ lỗi trong kiểm tra sản phẩm của chúng ta đã giảm xuống mức thấp kỷ lục là 0,02% trong quý này.

[00:16.10] We will launch a second production shift starting next month to fulfill contract orders for two major automotive manufacturers.
:: Việt: Chúng ta sẽ triển khai ca sản xuất thứ hai bắt đầu từ tháng tới để hoàn tất các đơn đặt hàng theo hợp đồng cho hai nhà sản xuất ô tô lớn.

# QUIZ
Q1: By what percentage did daily battery pack throughput increase?
* [ ] 15%
* [ ] 20%
* [ ] 30%
* [x] 25%
-- Explanation: The operations director explicitly states that throughput increased "by twenty-five percent."

Q2: What will the plant do next month to fulfill new contracts?
* [x] Launch a second production shift
* [ ] Construct an additional factory building
* [ ] Import pre-assembled battery cells
* [ ] Reduce quality control inspection times
-- Explanation: The transcript mentions: "We will launch a second production shift starting next month to fulfill contract orders."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [x] Furthermore, our defect testing failure rate dropped to an all-time low of point zero two percent this quarter
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Furthermore, our defect testing failure rate dropped to an all-time low of point zero two percent this quarter.".`;

export const LESSON_Q3_060_MD = `---
id: listen_toeic_q3_060
title: "Cruise Ship Itinerary Modification & Shore Excursions"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Hospitality", "Tourism", "Maritime"]
---

# VOCABULARY
- itinerary /aɪˈtɪn.ə.rer.i/ (n): hành trình, lịch trình chuyến đi. E.g., Severe sea conditions forced the captain to alter our sailing itinerary.
- excursion /ɪkˈskɝː.ʒən/ (n): chuyến tham quan ngắn. E.g., Passengers can book shore excursions at the guest services desk.
- port of call /pɔːrt əv kɑːl/ (n): cảng ghé chân. E.g., Our next port of call will be the island of Cozumel.
- workflow /ˈwɝːk.floʊ/ (n): quy trình làm việc. E.g., Automating administrative tasks optimizes team workflow.

# TRANSCRIPT
[00:00.00] Good morning valued guests, this is your Cruise Director with an important announcement regarding our sailing itinerary.
:: Việt: Chào buổi sáng quý khách hàng thân thiết, đây là Giám đốc Chuyến hải trình với thông báo quan trọng liên quan đến lịch trình di chuyển của chúng ta.

[00:05.30] Due to unfavorable weather conditions in the region, our planned stop at St. Thomas tomorrow has been canceled for safety.
:: Việt: Do điều kiện thời tiết không thuận lợi trong khu vực, điểm dừng chân dự kiến tại St. Thomas vào ngày mai đã bị hủy vì lý do an toàn.

[00:10.80] Instead, we will spend an extended day at sea before arriving at our final port of call in San Juan on Friday.
:: Việt: Thay vào đó, chúng ta sẽ dành thêm một ngày trên biển trước khi đến cảng dừng chân cuối cùng ở San Juan vào Thứ Sáu.

[00:16.10] All pre-booked shore excursion fees for St. Thomas will be automatically credited to your onboard accounts today.
:: Việt: Tất cả chi phí chuyến tham quan bờ biển đã đặt trước cho St. Thomas sẽ được tự động hoàn lại vào tài khoản trên tàu của quý vị trong hôm nay.

# QUIZ
Q1: Why was the planned stop at St. Thomas canceled?
* [ ] Mechanical issues with the ship's engine
* [ ] Port worker strikes at St. Thomas
* [x] Unfavorable weather conditions in the region
* [ ] Overbooking of dock space
-- Explanation: The speaker explains that the stop was canceled "Due to unfavorable weather conditions in the region."

Q2: What will happen to pre-booked excursion fees for the canceled stop?
* [ ] They will be forfeited
* [ ] Guests will receive paper gift vouchers
* [ ] Refunds must be requested in writing after the cruise
* [x] They will be automatically credited to guests' onboard accounts
-- Explanation: The transcript explicitly states: "excursion fees... will be automatically credited to your onboard accounts today."

Q3: What will happen according to the speaker?
* [x] Spend an extended day at sea before arriving at our final port of call in San Juan on Friday
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Instead, we will spend an extended day at sea before arriving at our final port of call in San Juan on Friday.".`;

export const LESSON_Q3_061_MD = `---
id: listen_toeic_q3_061
title: "Customer Support Resolution & Refund Processing"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 3"
tags: ["Customer Service", "Retail", "Refund"]
---

# VOCABULARY
- resolution /ˌrez.əˈluː.ʃən/ (n): sự giải quyết khiếu nại. E.g., Our goal is to achieve swift resolution for all customer inquiries.
- discrepancy /dɪˈskrep.ən.si/ (n): sự sai sót trong đơn hàng. E.g., We apologize for the billing discrepancy on your monthly statement.
- store credit /stɔːr ˈkred.ɪt/ (n): tiền tín dụng mua hàng. E.g., Customers can choose between a full refund or store credit.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ quy chuẩn pháp lý. E.g., All departments must ensure strict regulatory compliance.

# TRANSCRIPT
[00:00.00] Hello Ms. Adams, this is Eric from Client Support following up on ticket number 8902 regarding your order.
:: Việt: Xin chào bà Adams, đây là Eric từ Bộ phận Hỗ trợ Khách hàng theo dõi mã yêu cầu số 8902 liên quan đến đơn hàng của bà.

[00:05.20] We sincerely apologize for the shipping discrepancy where an incorrect item size was delivered to your address last week.
:: Việt: Chúng tôi chân thành xin lỗi vì sự sai sót trong vận chuyển khi một sản phẩm sai kích thước đã được giao đến địa chỉ của bà tuần trước.

[00:10.70] A replacement item in the correct size has been dispatched today via express courier at no additional cost.
:: Việt: Sản phẩm thay thế đúng kích thước đã được gửi đi hôm nay qua dịch vụ chuyển phát nhanh mà không tốn thêm bất kỳ chi phí nào.

[00:16.10] In addition, we have issued a twenty-dollar store voucher to your online account for future purchases.
:: Việt: Ngoài ra, chúng tôi đã phát hành một phiếu giảm giá 20 đô la vào tài khoản trực tuyến của bà cho các lần mua sắm trong tương lai.

# QUIZ
Q1: What problem did Ms. Adams experience with her order?
* [ ] The package was lost in transit
* [x] An incorrect item size was delivered
* [ ] The item arrived damaged
* [ ] She was overcharged on her credit card
-- Explanation: The representative mentions "the shipping discrepancy where an incorrect item size was delivered to your address."

Q2: What compensation was offered in addition to sending the correct item?
* [ ] A free 1-year extended warranty
* [ ] A cash refund of 50%
* [x] A $20 store voucher credited to her account
* [ ] Free gift wrapping service
-- Explanation: The transcript explicitly states: "we have issued a twenty-dollar store voucher to your online account."

Q3: How was the replacement item sent?
* [ ] Via standard sea freight shipping
* [ ] By regular international postal mail
* [ ] Through an in-person store collection
* [x] Today via express courier at no additional cost
-- Explanation: The transcript states: "A replacement item in the correct size has been dispatched today via express courier at no additional cost.".`;

export const LESSON_Q3_062_MD = `---
id: listen_toeic_q3_062
title: "Residential Property Open House & Mortgage Options"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Real Estate", "Residential", "Mortgage"]
---

# VOCABULARY
- open house /ˈoʊ.pən haʊs/ (n): sự kiện mở cửa cho khách tham quan nhà. E.g., The real estate agency is holding an open house this Sunday.
- mortgage /ˈmɔːr.ɡɪdʒ/ (n): khoản vay thế chấp mua nhà. E.g., Buyers can choose between fixed-rate and adjustable-rate mortgages.
- renovation /ˌren.əˈveɪ.ʃən/ (n): sự cải tạo, nâng cấp. E.g., The kitchen recently underwent a complete modern renovation.
- protocol /ˈproʊ.t̬ə.kɑːl/ (n): quy trình, nghi thức chuẩn mực. E.g., Emergency safety protocols must be reviewed annually.

# TRANSCRIPT
[00:00.00] Good morning prospective buyers, welcome to the open house showcase for Mapleside Estates.
:: Việt: Chào buổi sáng các người mua tiềm năng, chào mừng đến với buổi tham quan căn hộ mẫu tại Mapleside Estates.

[00:05.30] This newly constructed two-story home features four spacious bedrooms, energy-efficient appliances, and a private backyard.
:: Việt: Căn nhà hai tầng mới xây này có bốn phòng ngủ rộng rãi, các thiết bị tiết kiệm năng lượng và sân sau riêng tư.

[00:10.80] Our preferred lending partners are stationed in the living room today to offer free mortgage consultations.
:: Việt: Các đối tác cho vay ưu tiên của chúng tôi đang có mặt tại phòng khách hôm nay để tư vấn khoản vay thế chấp miễn phí.

[00:16.10] If you submit a purchase offer before 5 PM today, the developer will cover all closing costs.
:: Việt: Nếu quý vị nộp đề nghị mua trước 5 giờ chiều nay, nhà phát triển sẽ chi trả toàn bộ chi phí hoàn tất thủ tục.

# QUIZ
Q1: What feature is highlighted about the Mapleside Estates property?
* [x] Four spacious bedrooms and energy-efficient appliances
* [ ] A basement swimming pool
* [ ] A three-car underground garage
* [ ] A rooftop tennis court
-- Explanation: The broker highlights "four spacious bedrooms, energy-efficient appliances, and a private backyard."

Q2: What benefit is offered to buyers who submit an offer before 5 PM today?
* [ ] A $10,000 cash discount
* [x] The developer will cover all closing costs
* [ ] Free home furniture sets
* [ ] Free property management for two years
-- Explanation: The transcript explicitly states: "If you submit a purchase offer before 5 PM today, the developer will cover all closing costs."

Q3: What is the primary topic or announcement introduced by the speaker?
* [ ] Annual dividend payouts for shareholders
* [ ] A full recall of previous product versions
* [x] Residential Property Open House & Mortgage Options
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Good morning prospective buyers, welcome to the open house showcase for Mapleside Estates.".`;

export const LESSON_Q3_063_MD = `---
id: listen_toeic_q3_063
title: "Air Freight Temperature-Controlled Cargo & Delivery"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Aviation", "Logistics", "Freight"]
---

# VOCABULARY
- temperature-controlled /ˈtem.pɚ.ə.tʃɚ kənˈtroʊld/ (adj): kiểm soát nhiệt độ. E.g., Pharmaceutical products require temperature-controlled air freight containers.
- perishables /ˈper.ɪ.ʃə.bəlz/ (n): hàng hóa dễ hư hỏng. E.g., Cold storage units keep perishables fresh during long-haul flights.
- customs inspection /ˈkʌs.təmz ɪnˈspek.ʃən/ (n): sự kiểm tra hải quan. E.g., Express air cargo undergoes expedited customs inspection.
- initiative /ɪˈnɪʃ.ə.t̬ɪv/ (n): sáng kiến đổi mới. E.g., Management launched a green initiative to reduce corporate carbon footprints.

# TRANSCRIPT
[00:00.00] Hello logistics team, this is an operational update regarding Express Flight 704 to London.
:: Việt: Xin chào đội ngũ logistics, đây là bản cập nhật vận hành liên quan đến Chuyến bay Chuyển phát nhanh 704 đi Luân Đôn.

[00:05.30] All temperature-controlled pharmaceutical containers have passed pre-flight safety audits and are loaded into the cargo hold.
:: Việt: Tất cả các container dược phẩm kiểm soát nhiệt độ đã vượt qua kiểm tra an toàn trước chuyến bay và đã được đưa vào khoang hàng.

[00:10.80] Internal storage temperatures will be monitored continuously via automated satellite telemetry throughout the eight-hour flight.
:: Việt: Nhiệt độ bảo quản bên trong sẽ được giám sát liên tục qua đo đạc từ xa bằng vệ tinh tự động trong suốt chuyến bay kéo dài 8 tiếng.

[00:16.10] Ground handling teams at Heathrow Airport have been notified to clear the cargo immediately upon arrival.
:: Việt: Đội ngũ xử lý mặt đất tại Sân bay Heathrow đã được thông báo để giải phóng hàng hóa ngay khi máy bay đáp xuống.

# QUIZ
Q1: What type of cargo is being transported on Flight 704?
* [ ] Heavy industrial machinery
* [ ] E-commerce clothing packages
* [ ] Fresh tropical fruits
* [x] Temperature-controlled pharmaceutical containers
-- Explanation: The manager specifies that "All temperature-controlled pharmaceutical containers... are loaded into the cargo hold."

Q2: How will storage temperatures be monitored during the flight?
* [x] Via automated satellite telemetry throughout the flight
* [ ] By onboard flight attendants
* [ ] Via manual temperature logs after landing
* [ ] By independent third-party inspectors
-- Explanation: The transcript explicitly states: "temperatures will be monitored continuously via automated satellite telemetry."

Q3: What instructions were given to ground handling teams?
* [ ] Hold the cargo in bonded storage for two weeks
* [x] Clear the cargo immediately upon arrival
* [ ] Return the shipment back to its origin port
* [ ] Inspect every single container manually
-- Explanation: The speaker notes: "Ground handling teams at Heathrow Airport have been notified to clear the cargo immediately upon arrival.".`;

export const LESSON_Q3_064_MD = `---
id: listen_toeic_q3_064
title: "Construction Site Safety & Project Timeline Update"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Construction", "Project Management", "Safety"]
---

# VOCABULARY
- contractor /ˈkɑːn.træk.tɚ/ (n): nhà thầu. E.g., Sub-contractors must follow site electrical safety protocols.
- scaffolding /ˈskæf.əl.dɪŋ/ (n): giàn giáo. E.g., Inspect all scaffolding structures before allowing workers on upper levels.
- milestone /ˈmaɪl.stoʊn/ (n): cột mốc dự án. E.g., Completing the concrete foundation represents a key project milestone.
- efficiency /ɪˈfɪʃ.ən.si/ (n): tính hiệu quả, năng suất. E.g., Upgraded server hardware enhances internal operational efficiency.

# TRANSCRIPT
[00:00.00] Attention all site supervisors, here is our weekly progress and safety brief for the Plaza Tower construction site.
:: Việt: Xin chú ý tất cả các giám sát công trường, đây là điểm tin tiến độ và an toàn hàng tuần cho công trường xây dựng Tòa nhà Plaza.

[00:05.30] Structural steel framing for floors ten through fifteen was finished yesterday, keeping us two days ahead of schedule.
:: Việt: Việc lắp dựng khung thép kết cấu cho các tầng từ 10 đến 15 đã hoàn tất vào ngày hôm qua, giúp chúng ta vượt tiến độ 2 ngày.

[00:10.80] However, due to high forecasted wind speeds tomorrow, all crane operations and scaffolding assembly will be suspended.
:: Việt: Tuy nhiên, do dự báo tốc độ gió cao vào ngày mai, tất cả các hoạt động cẩu hàng và lắp dựng giàn giáo sẽ bị tạm dừng.

[00:16.10] Please ensure ground crew focus on indoor concrete pouring and interior electrical wiring instead.
:: Việt: Vui lòng đảm bảo đội ngũ dưới mặt đất tập trung vào việc đổ bê tông trong nhà và đi dây điện nội thất thay thế.

# QUIZ
Q1: What is the current status of the Plaza Tower project timeline?
* [ ] One week behind schedule
* [ ] Exactly on schedule
* [x] Two days ahead of schedule
* [ ] Delayed due to material shortages
-- Explanation: The manager notes that completing structural framing kept the project "two days ahead of schedule."

Q2: Why will crane operations be suspended tomorrow?
* [ ] Equipment maintenance inspections
* [ ] Worker strike action
* [ ] Lack of concrete supply
* [x] High forecasted wind speeds
-- Explanation: The transcript explicitly states: "due to high forecasted wind speeds tomorrow, all crane operations... will be suspended."

Q3: What are listeners requested to do?
* [x] Ensure ground crew focus on indoor concrete pouring and interior electrical wiring instead
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Please ensure ground crew focus on indoor concrete pouring and interior electrical wiring instead.".`;

export const LESSON_Q3_065_MD = `---
id: listen_toeic_q3_065
title: "Restaurant Menu Redesign & Food Safety Standards"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Restaurant", "Hospitality", "Food Safety"]
---

# VOCABULARY
- seasonal ingredients /ˈsiː.zən.əl ɪnˈɡriː.di.ənts/ (n): nguyên liệu theo mùa. E.g., Our autumn menu features locally sourced seasonal ingredients.
- cross-contamination /krɑːs kənˌtæm.əˈneɪ.ʃən/ (n): sự nhiễm khuẩn chéo. E.g., Separate cutting boards prevent cross-contamination between raw meat and vegetables.
- dietary restriction /ˈdaɪ.ə.ter.i rɪˈstrɪk.ʃən/ (n): chế độ ăn kiêng. E.g., Inform the waiter if you have any severe gluten dietary restrictions.
- confidentiality /ˌkɑːn.fə.den.ʃiˈæl.ə.t̬i/ (n): tính bảo mật thông tin. E.g., Staff signed non-disclosure agreements to preserve client confidentiality.

# TRANSCRIPT
[00:00.00] Good afternoon kitchen staff, I want to briefly go over the launch of our new autumn dinner menu starting tonight.
:: Việt: Chào buổi chiều nhân viên bếp, tôi muốn điểm qua nhanh việc ra mắt thực đơn tối mùa thu mới của chúng ta bắt đầu từ tối nay.

[00:05.30] We have introduced five seasonal seafood dishes, all prepared using organic ingredients from local suppliers.
:: Việt: Chúng ta đã đưa vào 5 món hải sản theo mùa, tất cả đều được chế biến từ các nguyên liệu hữu cơ từ các nhà cung cấp địa phương.

[00:10.80] To accommodate guests with dietary restrictions, clear allergen labels have been added to our printed menus.
:: Việt: Để đáp ứng những khách hàng có chế độ ăn kiêng đặc biệt, các nhãn cảnh báo chất gây dị ứng rõ ràng đã được thêm vào thực đơn in.

[00:16.10] Please remember that color-coded prep stations must be used strictly to avoid raw ingredient cross-contamination.
:: Việt: Xin nhớ rằng các trạm sơ chế phân màu phải được sử dụng nghiêm ngặt để tránh nhiễm khuẩn chéo nguyên liệu sống.

# QUIZ
Q1: How many new seasonal seafood dishes are being introduced tonight?
* [ ] Three
* [x] Five
* [ ] Seven
* [ ] Ten
-- Explanation: The head chef mentions: "We have introduced five seasonal seafood dishes."

Q2: What measure was taken to assist guests with dietary restrictions?
* [ ] Offering free dessert substitutes
* [ ] Reducing dish prices on weekdays
* [x] Adding clear allergen labels to printed menus
* [ ] Removing all dairy products from the kitchen
-- Explanation: The transcript explicitly states: "clear allergen labels have been added to our printed menus."

Q3: What are listeners requested to do?
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
* [x] Remember that color-coded prep stations must be used strictly to avoid raw ingredient cross-contamination
-- Explanation: The speaker instructs: "Please remember that color-coded prep stations must be used strictly to avoid raw ingredient cross-contamination.".`;

export const LESSON_Q3_066_MD = `---
id: listen_toeic_q3_066
title: "Enterprise Risk Assessment & Business Continuity Plan"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Risk Management", "Business", "Management"]
---

# VOCABULARY
- business continuity /ˈbɪz.nɪs kən.təˈnuː.ə.t̬i/ (n): duy trì hoạt động kinh doanh liên tục. E.g., A robust business continuity plan protects operations during power outages.
- mitigation /ˌmɪt̬.əˈɡeɪ.ʃən/ (n): sự giảm thiểu rủi ro. E.g., Risk mitigation strategies reduce potential financial losses.
- vulnerability /ˌvʌl.nɚ.əˈbɪl.ə.t̬i/ (n): điểm yếu trước rủi ro. E.g., Cybersecurity audits identify system vulnerabilities before breaches occur.
- collaboration /kəˌlæb.əˈreɪ.ʃən/ (n): sự hợp tác làm việc nhóm. E.g., Cross-functional collaboration accelerated the product development cycle.

# TRANSCRIPT
[00:00.00] Good morning executive committee, I am presenting our annual enterprise risk management review for this year.
:: Việt: Chào buổi sáng ủy ban điều hành, tôi xin trình bày bản đánh giá quản lý rủi ro doanh nghiệp hàng năm của chúng ta cho năm nay.

[00:05.30] Recent simulation tests confirmed that our offsite data backup systems can restore full operational capability within fifteen minutes.
:: Việt: Các bài kiểm tra mô phỏng gần đây đã xác nhận rằng hệ thống sao lưu dữ liệu bên ngoài của chúng ta có thể khôi phục hoàn toàn khả năng vận hành trong vòng 15 phút.

[00:10.80] To further strengthen business continuity, we are updating our emergency response protocols across all regional branch offices.
:: Việt: Để tăng cường hơn nữa tính liên tục trong kinh doanh, chúng tôi đang cập nhật các quy trình ứng phó khẩn cấp trên tất cả các văn phòng chi nhánh khu vực.

[00:16.10] Department heads must submit their updated risk mitigation checklists to my office by Friday afternoon.
:: Việt: Trưởng các bộ phận phải nộp danh mục kiểm tra giảm thiểu rủi ro đã cập nhật cho văn phòng tôi trước chiều Thứ Sáu.

# QUIZ
Q1: How quickly can offsite backup systems restore full operational capability?
* [x] Within 15 minutes
* [ ] Within 5 minutes
* [ ] Within 30 minutes
* [ ] Within one hour
-- Explanation: The risk officer highlights that backup systems can restore capability "within fifteen minutes."

Q2: What are department heads required to submit by Friday afternoon?
* [ ] Annual budget requests
* [x] Updated risk mitigation checklists
* [ ] Employee attendance logs
* [ ] IT hardware replacement lists
-- Explanation: The transcript explicitly states: "Department heads must submit their updated risk mitigation checklists to my office by Friday afternoon."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [x] To further strengthen business continuity, we are updating our emergency response protocols across all regional branch offices
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "To further strengthen business continuity, we are updating our emergency response protocols across all regional branch offices.".`;

export const LESSON_Q3_067_MD = `---
id: listen_toeic_q3_067
title: "Seasonal Apparel Launch & Store Display Guidelines"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Retail", "Fashion", "Merchandising"]
---

# VOCABULARY
- apparel /əˈpær.əl/ (n): trang phục, quần áo. E.g., The new winter apparel line will arrive in stores next week.
- merchandise /ˈmɝː.tʃən.daɪz/ (v, n): hàng hóa, kế hoạch trưng bày. E.g., Store staff should merchandise window displays according to visual guidelines.
- inventory count /ˈɪn.vən.tɔːr.i kaʊnt/ (n): kiểm kê hàng tồn kho. E.g., Perform a daily inventory count to prevent stock shortages.
- productivity /ˌproʊ.dʌkˈtɪv.ə.t̬i/ (n): năng suất lao động. E.g., Flexible work schedules contributed to higher employee productivity.

# TRANSCRIPT
[00:00.00] Attention all store managers, this is a briefing on the upcoming release of our winter apparel collection.
:: Việt: Xin chú ý toàn thể các quản lý cửa hàng, đây là buổi phổ biến thông tin về đợt ra mắt bộ sưu tập trang phục mùa đông sắp tới.

[00:05.30] Shipments of the new jacket line will arrive at regional retail outlets by Wednesday afternoon.
:: Việt: Các chuyến hàng thuộc dòng áo khoác mới sẽ đến các đại lý bán lẻ trong khu vực trước chiều Thứ Tư.

[00:10.80] All front display windows must be updated according to the new visual merchandising guide before doors open on Thursday.
:: Việt: Tất cả các cửa kính trưng bày phía trước phải được cập nhật theo hướng dẫn trưng bày hình ảnh mới trước khi mở cửa vào Thứ Năm.

[00:16.10] Promotional discount signs should remain hidden in storage until the official campaign launches on Friday morning.
:: Việt: Biển quảng cáo giảm giá nên được cất giấu trong kho cho đến khi chiến dịch chính thức bắt đầu vào sáng Thứ Sáu.

# QUIZ
Q1: When will shipments of the new jacket line arrive at retail outlets?
* [ ] Tuesday morning
* [ ] Thursday evening
* [ ] Friday morning
* [x] Wednesday afternoon
-- Explanation: The speaker specifies that shipments "will arrive at regional retail outlets by Wednesday afternoon."

Q2: What must be updated before the store opens on Thursday?
* [x] All front display windows
* [ ] The staff breakroom schedule
* [ ] Cash register payment software
* [ ] Outdoor parking lot banners
-- Explanation: The transcript explicitly states: "All front display windows must be updated... before doors open on Thursday."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [x] Promotional discount signs should remain hidden in storage until the official campaign launches on Friday morning
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Promotional discount signs should remain hidden in storage until the official campaign launches on Friday morning.".`;

export const LESSON_Q3_068_MD = `---
id: listen_toeic_q3_068
title: "Same-Day Courier Delivery & Fleet Management"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Logistics", "Courier", "Transportation"]
---

# VOCABULARY
- courier /ˈkʊr.i.ɚ/ (n): nhân viên/ đơn vị chuyển phát nhanh. E.g., Express couriers handle urgent medical package deliveries.
- dispatch /dɪˈspætʃ/ (v, n): sự điều phối xe/hàng. E.g., The central dispatch unit assigns routes to drivers automatically.
- fleet /fliːt/ (n): đội xe giao hàng. E.g., Transitioning our delivery fleet to electric vehicles cuts operational costs.
- optimization /ˌɑːp.tə.məˈzeɪ.ʃən/ (n): sự tối ưu hóa hệ thống. E.g., Code optimization reduced server response times significantly.

# TRANSCRIPT
[00:00.00] Good morning dispatch team, I want to go over our new same-day delivery service protocols.
:: Việt: Chào buổi sáng đội ngũ điều phối, tôi muốn điểm qua các quy trình dịch vụ giao hàng trong ngày mới của chúng ta.

[00:05.30] Our mobile app now dynamically optimizes delivery routes based on real-time city traffic data.
:: Việt: Ứng dụng di động của chúng ta giờ đây tự động tối ưu hóa các tuyến đường giao hàng dựa trên dữ liệu giao thông thành phố theo thời gian thực.

[00:10.80] Drivers are required to obtain digital customer signatures on their handheld tablets for every completed package delivery.
:: Việt: Lái xe được yêu cầu phải thu thập chữ ký số của khách hàng trên máy tính bảng cầm tay cho mỗi đơn hàng đã hoàn thành.

[00:16.10] Any packages that cannot be delivered after two attempts must be returned to the main depot by 7 PM.
:: Việt: Bất kỳ kiện hàng nào không thể giao sau hai lần thử phải được đưa trở lại kho chính trước 7 giờ tối.

# QUIZ
Q1: How does the new mobile app optimize delivery routes?
* [ ] Based on driver preferences
* [ ] Based on package weight only
* [x] Based on real-time city traffic data
* [ ] Based on fixed neighborhood boundaries
-- Explanation: The dispatch manager explains that the app "dynamically optimizes delivery routes based on real-time city traffic data."

Q2: What must drivers do if a package cannot be delivered after two attempts?
* [ ] Leave it at the customer's front doorstep
* [ ] Transfer it to another driver on the road
* [ ] Dispose of the package immediately
* [x] Return it to the main depot by 7 PM
-- Explanation: The transcript explicitly states: "Any packages that cannot be delivered after two attempts must be returned to the main depot by 7 PM."

Q3: What is the primary topic or announcement introduced by the speaker?
* [x] Same-Day Courier Delivery & Fleet Management
* [ ] Annual dividend payouts for shareholders
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Good morning dispatch team, I want to go over our new same-day delivery service protocols.".`;

export const LESSON_Q3_069_MD = `---
id: listen_toeic_q3_069
title: "Annual Corporate Tax Audit & Deductible Expenses"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Finance", "Accounting", "Tax"]
---

# VOCABULARY
- deductible /dɪˈdʌk.tə.bəl/ (adj, n): khoản chi phí được khấu trừ thuế. E.g., Business travel expenses are tax deductible if backed by receipts.
- audit /ˈɑː.dɪt/ (n, v): việc thanh tra thuế. E.g., The tax authority requested financial records for an upcoming audit.
- reconciliation /ˌrek.ənˌsɪl.iˈeɪ.ʃən/ (n): sự đối chiếu sổ sách. E.g., Monthly bank reconciliation prevents accounting discrepancies.
- allocate /ˈæl.ə.keɪt/ (v): phân bổ nguồn lực, kinh phí. E.g., Finance leaders agreed to allocate additional funding to research.

# TRANSCRIPT
[00:00.00] Hello finance staff, this is an important reminder regarding our upcoming fiscal year-end tax filings.
:: Việt: Xin chào nhân viên tài chính, đây là nhắc nhở quan trọng liên quan đến việc kê khai thuế cuối năm tài chính sắp tới của chúng ta.

[00:05.30] All department expense reports along with itemized original receipts must be submitted to accounting by October 15th.
:: Việt: Tất cả báo cáo chi phí của các phòng ban cùng với hóa đơn gốc chi tiết phải được nộp cho bộ phận kế toán trước ngày 15 tháng 10.

[00:10.80] Late submissions will not be eligible for corporate tax deductions and may result in internal budget cuts.
:: Việt: Các khoản nộp trễ sẽ không đủ điều kiện được khấu trừ thuế doanh nghiệp và có thể dẫn đến việc bị cắt giảm ngân sách nội bộ.

[00:16.10] Please schedule a review session with your assigned accountant if you have questions about expense eligibility.
:: Việt: Vui lòng lên lịch một buổi làm việc với kế toán viên được phân công nếu bạn có thắc mắc về tính hợp lệ của chi phí.

# QUIZ
Q1: What is the deadline for submitting department expense reports?
* [ ] End of the month
* [x] October 15th
* [ ] October 1st
* [ ] November 30th
-- Explanation: The tax controller states: "original receipts must be submitted to accounting by October 15th."

Q2: What is a potential consequence of late expense submissions?
* [ ] Employee termination
* [ ] Mandatory overtime work
* [x] Ineligibility for tax deductions and internal budget cuts
* [ ] Cancellation of corporate credit cards
-- Explanation: The transcript explicitly mentions: "Late submissions will not be eligible for corporate tax deductions and may result in internal budget cuts."

Q3: What are listeners requested to do?
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
* [x] Schedule a review session with your assigned accountant if you have questions about expense eligibility
-- Explanation: The speaker instructs: "Please schedule a review session with your assigned accountant if you have questions about expense eligibility.".`;

export const LESSON_Q3_070_MD = `---
id: listen_toeic_q3_070
title: "Corporate Upskilling Program & Leadership Seminar"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["HR", "Training", "Development"]
---

# VOCABULARY
- upskilling /ˈʌpˌskɪl.ɪŋ/ (n): nâng cao kỹ năng cho nhân viên. E.g., Investing in employee upskilling boosts company productivity and retention.
- curriculum /kəˈrɪk.jə.ləm/ (n): chương trình đào tạo. E.g., The leadership curriculum includes project management workshops.
- certification /ˌsɝː.t̬ə.fəˈkeɪ.ʃən/ (n): chứng chỉ chuyên môn. E.g., Participants receive an accredited project management certification upon completion.
- prioritize /praɪˈɔːr.ə.taɪz/ (v): ưu tiên xử lý trước. E.g., Customer support specialists prioritize high-urgency inquiries.

# TRANSCRIPT
[00:00.00] Good morning team, I am excited to announce our new executive leadership upskilling program for junior managers.
:: Việt: Chào buổi sáng cả đội, tôi rất vui mừng được thông báo về chương trình nâng cao kỹ năng lãnh đạo điều hành mới dành cho các quản lý cấp trung.

[00:05.30] The four-week online curriculum covers strategic decision-making, financial forecasting, and team conflict resolution.
:: Việt: Chương trình học trực tuyến 4 tuần bao gồm ra quyết định chiến lược, dự báo tài chính và giải quyết xung đột trong đội ngũ.

[00:10.80] Employees who complete all interactive modules will earn a recognized professional management certificate.
:: Việt: Những nhân viên hoàn thành tất cả các học phần tương tác sẽ nhận được chứng chỉ quản lý chuyên nghiệp được công nhận.

[00:16.10] Registration opens tomorrow on the employee intranet, with only thirty seats available for the first cohort.
:: Việt: Cổng đăng ký sẽ mở vào ngày mai trên mạng nội bộ nhân viên, chỉ có 30 chỗ trống cho khóa học đầu tiên.

# QUIZ
Q1: How long is the new leadership upskilling program?
* [x] Four weeks
* [ ] Two weeks
* [ ] Six months
* [ ] One year
-- Explanation: The learning director specifies that it is a "four-week online curriculum."

Q2: How many seats are available for the first cohort?
* [ ] 15
* [x] 30
* [ ] 20
* [ ] 50
-- Explanation: The transcript explicitly states: "with only thirty seats available for the first cohort."

Q3: What will eligible participants or recipients receive?
* [ ] A fully funded international holiday
* [ ] An immediate promotion to department head
* [x] A recognized professional management certificate
* [ ] A complimentary ticket to next year's summit
-- Explanation: The speaker confirms: "Employees who complete all interactive modules will earn a recognized professional management certificate.".`;

export const LESSON_Q3_071_MD = `---
id: listen_toeic_q3_071
title: "HVAC System Maintenance & Building Energy Efficiency"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Facility", "Maintenance", "Office"]
---

# VOCABULARY
- HVAC /ˌeɪtʃ.væk/ (n): hệ thống sưởi, thông gió và điều hòa không khí. E.g., Routine HVAC filter replacements improve indoor air quality.
- maintenance window /ˈmeɪn.tən.əns ˈwɪn.doʊ/ (n): khung thời gian bảo trì. E.g., System updates will take place during the weekend maintenance window.
- thermostat /ˈθɝː.mə.stæt/ (n): bộ điều chỉnh nhiệt độ. E.g., Centralized digital thermostats help optimize building energy consumption.
- streamline /ˈstriːm.laɪn/ (v): tinh giản, tổ chức hợp lý hóa. E.g., The corporate restructure aims to streamline reporting channels.

# TRANSCRIPT
[00:00.00] Attention all office tenants, this is an announcement from the Facilities Management Office regarding Building B.
:: Việt: Xin chú ý toàn thể các đơn vị thuê văn phòng, đây là thông báo từ Văn phòng Quản lý Cơ sở Hạ tầng liên quan đến Tòa nhà B.

[00:05.30] Routine maintenance and air filter replacement for the central HVAC system is scheduled for this Saturday.
:: Việt: Việc bảo trì định kỳ và thay thế bộ lọc không khí cho hệ thống HVAC trung tâm được lên lịch vào Thứ Bảy tuần này.

[00:10.80] Air conditioning and heating services will be temporarily shut off between 8 AM and 2 PM during servicing.
:: Việt: Dịch vụ điều hòa và sưởi ấm sẽ tạm thời bị ngắt trong khoảng từ 8 giờ sáng đến 2 giờ chiều trong quá trình bảo trì.

[00:16.10] We apologize for any inconvenience and encourage staff working on Saturday to adjust their attire accordingly.
:: Việt: Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào và khuyến khích nhân viên làm việc vào Thứ Bảy điều chỉnh trang phục phù hợp.

# QUIZ
Q1: When will the central HVAC maintenance take place?
* [ ] Friday evening
* [ ] Sunday morning
* [ ] Next Monday during office hours
* [x] This Saturday between 8 AM and 2 PM
-- Explanation: The facility director notes that maintenance is scheduled "for this Saturday... shut off between 8 AM and 2 PM."

Q2: What service will be temporarily shut off during the maintenance window?
* [x] Air conditioning and heating services
* [ ] Elevator operations
* [ ] Internet connectivity
* [ ] Water supply on upper floors
-- Explanation: The transcript explicitly states: "Air conditioning and heating services will be temporarily shut off."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [x] We apologize for any inconvenience and encourage staff working on Saturday to adjust their attire accordingly
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "We apologize for any inconvenience and encourage staff working on Saturday to adjust their attire accordingly.".`;

export const LESSON_Q3_072_MD = `---
id: listen_toeic_q3_072
title: "Airline Premium Lounge & Boarding Gate Announcement"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Aviation", "Passenger Services", "Airport"]
---

# VOCABULARY
- priority boarding /ˈpraɪ.ɔːr.ə.t̬i ˈbɔːr.dɪŋ/ (n): việc lên máy bay ưu tiên. E.g., Business class passengers enjoy priority boarding at Gate 12.
- complimentary amenity /ˌkɑːm.pləˈmen.t̬ɚ.i əˈmen.ə.t̬i/ (n): tiện ích miễn phí. E.g., The lounge offers complimentary amenities including Wi-Fi and hot meals.
- connection /kəˈnek.ʃən/ (n): chuyến bay chuyển tiếp. E.g., Passengers with tight flight connections should contact gate staff immediately.
- authorization /ˌɑː.θɚ.əˈzeɪ.ʃən/ (n): sự cấp phép chính thức. E.g., Purchase orders require senior management authorization.

# TRANSCRIPT
[00:00.00] Attention passengers on Horizon Airways Flight 308 to Tokyo, we are ready to begin boarding at Gate 15.
:: Việt: Xin chú ý các hành khách trên Chuyến bay 308 của Horizon Airways đi Tokyo, chúng tôi đã sẵn sàng bắt đầu cho lên máy bay tại Cửa 15.

[00:05.30] We now invite first-class passengers and active loyalty club members to proceed to the priority lane.
:: Việt: Bây giờ chúng tôi mời các hành khách hạng nhất và hội viên câu lạc bộ khách hàng thân thiết di chuyển đến làn ưu tiên.

[00:10.80] Please have your passport and digital boarding pass open on your smartphone to ensure a smooth boarding process.
:: Việt: Vui lòng mở sẵn hộ chiếu và thẻ lên máy bay điện tử trên điện thoại thông minh của quý vị để đảm bảo quá trình lên máy bay diễn ra suôn sẻ.

[00:16.10] Passengers requiring special assistance or traveling with young children may also board at this time.
:: Việt: Hành khách cần sự trợ giúp đặc biệt hoặc đi cùng trẻ nhỏ cũng có thể lên máy bay vào lúc này.

# QUIZ
Q1: Which flight is preparing for boarding at Gate 15?
* [ ] Flight 102 to London
* [ ] Flight 505 to Paris
* [x] Flight 308 to Tokyo
* [ ] Flight 701 to Sydney
-- Explanation: The gate agent explicitly announces "Flight 308 to Tokyo... ready to begin boarding at Gate 15."

Q2: Who is invited to board first through the priority lane?
* [ ] Passengers sitting in the back rows
* [ ] Passengers with oversized carry-on luggage
* [ ] Standby passengers waiting for seat assignments
* [x] First-class passengers and active loyalty club members
-- Explanation: The transcript states: "We now invite first-class passengers and active loyalty club members to proceed to the priority lane."

Q3: What key detail does the speaker emphasize?
* [x] Passengers requiring special assistance or traveling with young children may also board at this time
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Passengers requiring special assistance or traveling with young children may also board at this time.".`;

export const LESSON_Q3_073_MD = `---
id: listen_toeic_q3_073
title: "UI/UX Design Sprint & Mobile App Accessibility"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["UI/UX", "Software", "Product Design"]
---

# VOCABULARY
- accessibility /əkˌses.əˈbɪl.ə.t̬i/ (n): khả năng truy cập/sử dụng. E.g., App accessibility standards ensure visually impaired users can navigate easily.
- wireframe /ˈwaɪər.freɪm/ (n): bản phác thảo giao diện. E.g., The UX designer created interactive wireframes for testing.
- usability testing /juː.zəˈbɪl.ə.t̬i ˈtest.ɪŋ/ (n): việc kiểm thử khả năng sử dụng. E.g., Usability testing revealed navigation confusion among elderly users.
- consensus /kənˈsen.səs/ (n): sự đồng thuận chung. E.g., Committee members reached a consensus on the new budget proposal.

# TRANSCRIPT
[00:00.00] Good morning product team, I want to share the user testing feedback from our mobile app redesign sprint.
:: Việt: Chào buổi sáng đội ngũ sản phẩm, tôi muốn chia sẻ phản hồi kiểm thử người dùng từ chu kỳ thiết kế lại ứng dụng di động của chúng ta.

[00:05.30] Eighty-five percent of test participants praised the new streamlined checkout flow and enlarged font sizes.
:: Việt: 85% người tham gia kiểm thử đã khen ngợi quy trình thanh toán mới được tinh gọn và kích thước phông chữ được phóng to.

[00:10.80] However, we need to improve screen contrast ratios to comply fully with mobile accessibility guidelines.
:: Việt: Tuy nhiên, chúng ta cần cải thiện tỷ lệ tương phản màn hình để tuân thủ hoàn toàn các hướng dẫn về khả năng truy cập ứng dụng di động.

[00:16.10] The UI team will update the interactive wireframes and share them on Figma by tomorrow afternoon.
:: Việt: Đội ngũ UI sẽ cập nhật các bản phác thảo giao diện tương tác và chia sẻ chúng trên Figma trước chiều mai.

# QUIZ
Q1: What percentage of test participants praised the new checkout flow and font sizes?
* [ ] 70%
* [x] 85%
* [ ] 75%
* [ ] 80%
-- Explanation: The design lead states: "Eighty-five percent of test participants praised the new streamlined checkout flow."

Q2: What aspect of the app needs improvement to meet accessibility guidelines?
* [ ] Audio notification sounds
* [ ] Payment gateway connection speeds
* [x] Screen contrast ratios
* [ ] User profile picture upload options
-- Explanation: The transcript explicitly states: "we need to improve screen contrast ratios to comply fully with mobile accessibility guidelines."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
* [x] Update the interactive wireframes and share them on Figma by tomorrow afternoon
-- Explanation: The speaker notes: "The UI team will update the interactive wireframes and share them on Figma by tomorrow afternoon.".`;

export const LESSON_Q3_074_MD = `---
id: listen_toeic_q3_074
title: "Hotel Dynamic Pricing & Overbooking Strategy"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Hospitality", "Revenue", "Management"]
---

# VOCABULARY
- dynamic pricing /daɪˈnæm.ɪk ˈpraɪ.sɪŋ/ (n): định giá linh hoạt. E.g., Dynamic pricing algorithms adjust room rates during peak holiday seasons.
- occupancy rate /ˈɑː.kjə.pən.si reɪt/ (n): tỷ lệ lấp đầy phòng. E.g., Our weekend occupancy rate reached ninety-eight percent.
- revenue per available room (RevPAR) /ˈrev.ə.nuː pɚ əˈveɪ.lə.bəl ruːm/ (n): doanh thu trên mỗi phòng hiện có. E.g., RevPAR increased by twelve percent following rate optimization.
- discrepancy /dɪˈskrep.ən.si/ (n): sự sai lệch, khác biệt số liệu. E.g., The internal audit detected an accounting discrepancy in inventory logs.

# TRANSCRIPT
[00:00.00] Good afternoon executive committee, here is our revenue management report for the third quarter.
:: Việt: Chào buổi chiều ban điều hành, đây là báo cáo quản lý doanh thu của chúng ta trong quý 3.

[00:05.30] By implementing automated dynamic pricing algorithms, our average daily room rate increased by fourteen percent.
:: Việt: Nhờ triển khai các thuật toán định giá linh hoạt tự động, giá phòng trung bình hàng ngày của chúng ta đã tăng 14%.

[00:10.80] Furthermore, overall hotel occupancy maintained an impressive ninety-one percent throughout the summer season.
:: Việt: Hơn nữa, tỷ lệ lấp đầy phòng tổng thể của khách sạn đã duy trì ở mức ấn tượng 91% trong suốt mùa hè.

[00:16.10] We will adjust our autumn pricing strategy next week to capture corporate travel bookings for upcoming conferences.
:: Việt: Chúng ta sẽ điều chỉnh chiến lược giá mùa thu vào tuần tới để thu hút các đơn đặt phòng du lịch công tác cho các hội nghị sắp tới.

# QUIZ
Q1: By what percentage did the average daily room rate increase in Q3?
* [x] 14%
* [ ] 10%
* [ ] 12%
* [ ] 18%
-- Explanation: The revenue manager states that the average daily room rate "increased by fourteen percent."

Q2: What was the hotel's overall occupancy rate during the summer season?
* [ ] 80%
* [x] 91%
* [ ] 85%
* [ ] 95%
-- Explanation: The transcript explicitly mentions: "overall hotel occupancy maintained an impressive ninety-one percent."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Adjust our autumn pricing strategy next week to capture corporate travel bookings for upcoming conferences
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "We will adjust our autumn pricing strategy next week to capture corporate travel bookings for upcoming conferences.".`;

export const LESSON_Q3_075_MD = `---
id: listen_toeic_q3_075
title: "E-Commerce Payment Gateway Integration & Fraud Detection"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["E-Commerce", "Fintech", "Security"]
---

# VOCABULARY
- payment gateway /ˈpeɪ.mənt ˈɡeɪt.weɪ/ (n): cổng thanh toán trực tuyến. E.g., Integrating a new payment gateway allows customers to pay via digital wallets.
- fraud detection /frɑːd dɪˈtek.ʃən/ (n): việc phát hiện gian lận. E.g., AI-powered fraud detection flags suspicious credit card transactions.
- chargeback /ˈtʃɑːrdʒ.bæk/ (n): sự hoàn tiền do tranh chấp. E.g., Reducing merchant chargeback rates improves payment processor standing.
- feasibility /ˌfiː.zəˈbɪl.ə.t̬i/ (n): tính khả thi của dự án. E.g., Engineers conducted a detailed feasibility study before construction.

# TRANSCRIPT
[00:00.00] Hello e-commerce development team, I have an important update regarding our online payment processing infrastructure.
:: Việt: Xin chào đội ngũ phát triển thương mại điện tử, tôi có một thông báo cập nhật quan trọng liên quan đến hạ tầng xử lý thanh toán trực tuyến của chúng ta.

[00:05.30] We have successfully integrated a new AI-driven fraud detection tool into our main checkout payment gateway.
:: Việt: Chúng ta đã tích hợp thành công một công cụ phát hiện gian lận dựa trên AI mới vào cổng thanh toán khi đặt hàng chính.

[00:10.80] This system analyzes buyer location and card authorization patterns in real time to block fraudulent transactions.
:: Việt: Hệ thống này phân tích vị trí người mua và các mẫu xác thực thẻ theo thời gian thực để ngăn chặn các giao dịch gian lận.

[00:16.10] Initial benchmark testing indicates that chargeback dispute rates will drop by over forty percent this month.
:: Việt: Kiểm thử đánh giá ban đầu chỉ ra rằng tỷ lệ tranh chấp hoàn tiền sẽ giảm hơn 40% trong tháng này.

# QUIZ
Q1: What new tool was integrated into the checkout payment gateway?
* [ ] A cryptocurrency payment plugin
* [ ] A biometric facial recognition scanner
* [ ] An automated coupon distribution engine
* [x] An AI-driven fraud detection tool
-- Explanation: The manager specifies: "We have successfully integrated a new AI-driven fraud detection tool."

Q2: By how much are chargeback dispute rates expected to drop?
* [x] Over 40%
* [ ] Over 20%
* [ ] Over 30%
* [ ] Over 50%
-- Explanation: The transcript explicitly states: "chargeback dispute rates will drop by over forty percent this month."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [x] This system analyzes buyer location and card authorization patterns in real time to block fraudulent transactions
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "This system analyzes buyer location and card authorization patterns in real time to block fraudulent transactions.".`;

export const LESSON_Q3_076_MD = `---
id: listen_toeic_q3_076
title: "Corporate Rebranding Launch & Media Kit Distribution"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Branding", "PR", "Marketing"]
---

# VOCABULARY
- rebranding /ˌriːˈbræn.dɪŋ/ (n): sự tái định vị thương hiệu. E.g., The corporate rebranding includes a new logo and modern website redesign.
- media kit /ˈmiː.di.ə kɪt/ (n): bộ tài liệu truyền thông. E.g., The media kit contains high-resolution brand logos and executive bios.
- brand identity /brænd aɪˈden.t̬ə.t̬i/ (n): nhận diện thương hiệu. E.g., Establishing a strong brand identity helps stand out in competitive markets.
- delegation /ˌdel.əˈɡeɪ.ʃən/ (n): sự phân công, ủy thác trách nhiệm. E.g., Effective managerial delegation empowers team leaders.

# TRANSCRIPT
[00:00.00] Good morning marketing staff, today marks the official launch of our global corporate rebranding initiative.
:: Việt: Chào buổi sáng nhân viên marketing, hôm nay đánh dấu ngày ra mắt chính thức chiến dịch tái định vị thương hiệu doanh nghiệp toàn cầu của chúng ta.

[00:05.30] Our updated logo, vibrant color palette, and modern brand guidelines are now live on our media portal.
:: Việt: Logo đã cập nhật, bảng màu rực rỡ và các hướng dẫn thương hiệu hiện đại của chúng ta hiện đã trực tuyến trên cổng thông tin truyền thông.

[00:10.80] All regional marketing teams must replace legacy templates and digital assets with the new versions immediately.
:: Việt: Tất cả các đội ngũ marketing khu vực phải thay thế các mẫu cũ và tài sản kỹ thuật số bằng các phiên bản mới ngay lập tức.

[00:16.10] An official press release and digital media kit will be distributed to major industry news outlets at 10 AM.
:: Việt: Thông cáo báo chí chính thức và bộ tài liệu truyền thông kỹ thuật số sẽ được gửi tới các cơ quan tin tức ngành lớn vào lúc 10 giờ sáng.

# QUIZ
Q1: What major initiative is officially launching today?
* [ ] A seasonal product clearance sale
* [ ] An annual employee recruitment drive
* [x] A global corporate rebranding initiative
* [ ] A new customer loyalty app
-- Explanation: The director announces "the official launch of our global corporate rebranding initiative."

Q2: When will the press release and media kit be distributed to news outlets?
* [ ] At 8 AM
* [ ] At 1 PM
* [ ] At 5 PM
* [x] At 10 AM
-- Explanation: The transcript explicitly states: "media kit will be distributed to major industry news outlets at 10 AM."

Q3: What requirement or instruction must be followed?
* [x] Replace legacy templates and digital assets with the new versions immediately
* [ ] Submit a formal written appeal to executives
* [ ] Request emergency budget allocations
* [ ] Wait for an official government notification
-- Explanation: The transcript specifies: "All regional marketing teams must replace legacy templates and digital assets with the new versions immediately.".`;

export const LESSON_Q3_077_MD = `---
id: listen_toeic_q3_077
title: "Commercial Office Building Expansion & Parking Facilities"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Real Estate", "Commercial", "Facility"]
---

# VOCABULARY
- expansion /ɪkˈspæn.ʃən/ (n): sự mở rộng. E.g., The commercial office building expansion will double available desk capacity.
- underground parking /ˌʌn.dɚˈɡraʊnd ˈpɑːr.kɪŋ/ (n): bãi đỗ xe ngầm. E.g., The multi-level underground parking facility accommodates five hundred vehicles.
- occupancy /ˈɑː.kjə.pən.si/ (n): sự sử dụng/lấp đầy diện tích. E.g., The building reached maximum occupancy within six months of opening.
- contingency /kənˈtɪn.dʒən.si/ (n): tình huống dự phòng rủi ro. E.g., The project budget incorporates a ten-percent contingency fund.

# TRANSCRIPT
[00:00.00] Good morning tenants, I am pleased to share an important update regarding our commercial property development.
:: Việt: Chào buổi sáng các đơn vị thuê, tôi rất vui mừng được chia sẻ một thông báo cập nhật quan trọng liên quan đến việc phát triển bất động sản thương mại của chúng ta.

[00:05.30] Construction on the new West Wing expansion is progressing smoothly and remains on schedule for completion in November.
:: Việt: Việc xây dựng khu mở rộng Cánh Tây mới đang diễn ra thuận lợi và vẫn đúng tiến độ để hoàn thành vào tháng 11.

[00:10.80] To support increased tenant capacity, a two-story underground parking garage will open next month.
:: Việt: Để hỗ trợ sức chứa tăng thêm của người thuê, một bãi đỗ xe ngầm hai tầng sẽ mở cửa vào tháng tới.

[00:16.10] Registered business occupants can request monthly parking passes at the building management office starting Monday.
:: Việt: Các doanh nghiệp đã đăng ký thuê có thể yêu cầu thẻ đỗ xe theo tháng tại văn phòng quản lý tòa nhà bắt đầu từ Thứ Hai.

# QUIZ
Q1: When is the West Wing expansion scheduled for completion?
* [ ] Next week
* [x] In November
* [ ] In September
* [ ] Early next year
-- Explanation: The leasing director states that construction "remains on schedule for completion in November."

Q2: What new facility will open next month to support tenant capacity?
* [ ] A rooftop fitness center
* [ ] A outdoor cafeteria
* [x] A two-story underground parking garage
* [ ] An executive conference hall
-- Explanation: The transcript explicitly mentions: "a two-story underground parking garage will open next month."

Q3: What can registered occupants request?
* [ ] Free corporate gym memberships
* [ ] A 50% discount on office lease rates
* [ ] Exclusive use of executive boardrooms
* [x] Monthly parking passes at the building management office starting Monday
-- Explanation: The speaker notes: "Registered business occupants can request monthly parking passes at the building management office starting Monday.".`;

export const LESSON_Q3_078_MD = `---
id: listen_toeic_q3_078
title: "Port Container Unloading & Cargo Crane Operations"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Maritime", "Logistics", "Port"]
---

# VOCABULARY
- vessel /ˈves.əl/ (n): tàu biển chở hàng lớn. E.g., The container vessel docked at Berth 4 early this morning.
- unloading /ʌnˈloʊ.dɪŋ/ (n): việc dỡ hàng. E.g., High-speed cranes accelerated container unloading operations.
- terminal /ˈtɝː.mə.nəl/ (n): bến/ga cảng biển. E.g., The international container terminal handles thousands of TEUs daily.
- milestone /ˈmaɪl.stoʊn/ (n): cột mốc quan trọng. E.g., Completing the beta phase marks a critical project milestone.

# TRANSCRIPT
[00:00.00] Attention terminal workers, this is a safety announcement from the Port Authority Operations Center.
:: Việt: Xin chú ý toàn thể công nhân bến cảng, đây là thông báo an toàn từ Trung tâm Vận hành Cảng vụ.

[00:05.30] Heavy ocean fog has significantly reduced visibility across the main shipping channel and container berths.
:: Việt: Sương mù biển dày đặc đã làm giảm đáng kể tầm nhìn trên toàn bộ luồng hàng hải chính và các bến container.

[00:10.80] Consequently, all automated gantry crane operations are temporarily suspended until environmental conditions improve.
:: Việt: Do đó, tất cả các hoạt động cẩu giàn tự động sẽ tạm thời bị đình chỉ cho đến khi điều kiện môi trường cải thiện.

[00:16.10] Truck drivers waiting for container loading are instructed to remain parked in Holding Area B.
:: Việt: Các lái xe tải đang chờ bốc xếp container được chỉ dẫn tiếp tục đỗ tại Khu vực Chờ B.

# QUIZ
Q1: What condition caused the suspension of port crane operations?
* [x] Heavy ocean fog reducing visibility
* [ ] Strong coastal winds
* [ ] A sudden mechanical failure
* [ ] Unpaid port customs fees
-- Explanation: The supervisor explains that "Heavy ocean fog has significantly reduced visibility... Consequently, all automated gantry crane operations are temporarily suspended."

Q2: Where should truck drivers wait during the delay?
* [ ] At the main gate entrance
* [x] In Holding Area B
* [ ] Inside the administrative office
* [ ] On the nearby highway shoulder
-- Explanation: The transcript explicitly states: "Truck drivers... are instructed to remain parked in Holding Area B."

Q3: How long or under what condition are operations suspended?
* [ ] Until the end of the current fiscal year
* [ ] Until a new executive director is appointed
* [x] Until environmental conditions improve
* [ ] Permanently until further notice
-- Explanation: The speaker confirms: "Consequently, all automated gantry crane operations are temporarily suspended until environmental conditions improve.".`;

export const LESSON_Q3_079_MD = `---
id: listen_toeic_q3_079
title: "IT Project Migration & System Downtime Notification"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["IT", "Project Management", "Software"]
---

# VOCABULARY
- downtime /ˈdaʊn.taɪm/ (n): thời gian hệ thống ngừng hoạt động. E.g., Scheduled server maintenance downtime will last two hours.
- migration /maɪˈɡreɪ.ʃən/ (n): sự chuyển đổi hệ thống. E.g., The cloud database migration was completed with zero data loss.
- backup /ˈbæk.ʌp/ (n, v): sao lưu dữ liệu. E.g., Always perform a full system backup before updating software.
- benchmark /ˈbentʃ.mɑːrk/ (n): tiêu chuẩn đánh giá, mốc chuẩn so sánh. E.g., The quarterly report sets a new performance benchmark for the industry.

# TRANSCRIPT
[00:00.00] Good afternoon employees, this is an important technical alert from the IT Infrastructure Department.
:: Việt: Chào buổi chiều toàn thể nhân viên, đây là thông báo kỹ thuật quan trọng từ Bộ phận Hạ tầng CNTT.

[00:05.30] Our scheduled cloud database migration is set to take place this Saturday from 10 PM until 2 AM.
:: Việt: Việc di dời cơ sở dữ liệu đám mây theo kế hoạch của chúng ta dự kiến diễn ra vào Thứ Bảy tuần này từ 10 giờ đêm đến 2 giờ sáng.

[00:10.80] During this four-hour downtime window, internal email and customer database applications will be completely inaccessible.
:: Việt: Trong khung thời gian ngừng hoạt động kéo dài 4 tiếng này, email nội bộ và các ứng dụng cơ sở dữ liệu khách hàng sẽ hoàn toàn không thể truy cập.

[00:16.10] All staff are strongly advised to log out of their workstations and save all active files before leaving on Friday.
:: Việt: Tất cả nhân viên được khuyến nghị nên đăng xuất khỏi máy làm việc và lưu tất cả các tệp đang mở trước khi ra về vào Thứ Sáu.

# QUIZ
Q1: When will the cloud database migration take place?
* [ ] Friday evening at 5 PM
* [ ] Sunday morning at 8 AM
* [ ] Next Monday during office hours
* [x] This Saturday from 10 PM until 2 AM
-- Explanation: The IT manager announces: "migration is set to take place this Saturday from 10 PM until 2 AM."

Q2: How long will the system downtime window last?
* [x] Four hours
* [ ] Two hours
* [ ] Six hours
* [ ] Eight hours
-- Explanation: The transcript explicitly states: "During this four-hour downtime window, internal email... will be completely inaccessible."

Q3: What are employees or attendees encouraged or advised to do?
* [ ] File an overtime compensation grievance
* [x] Log out of their workstations and save all active files before leaving on Friday
* [ ] Leave the building premises immediately
* [ ] Work remotely from home for the rest of the week
-- Explanation: The speaker notes: "All staff are strongly advised to log out of their workstations and save all active files before leaving on Friday.".`;

export const LESSON_Q3_080_MD = `---
id: listen_toeic_q3_080
title: "Corporate Credit Facility & Line of Credit Renewal"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Banking", "Finance", "Credit"]
---

# VOCABULARY
- line of credit /laɪn əv ˈkred.ɪt/ (n): hạn mức tín dụng. E.g., The bank approved an extension on the company's revolving line of credit.
- interest rate /ˈɪn.trɪst reɪt/ (n): lãi suất. E.g., Negotiating a lower interest rate reduces corporate borrowing costs.
- covenant /ˈkʌv.ə.nənt/ (n): điều khoản cam kết tài chính. E.g., Maintaining a healthy debt-to-equity ratio satisfies loan covenants.
- workflow /ˈwɝːk.floʊ/ (n): quy trình làm việc. E.g., Automating administrative tasks optimizes team workflow.

# TRANSCRIPT
[00:00.00] Hello Mr. Sterling, this is Evelyn from Commercial Banking Relationship Services following up on your account.
:: Việt: Xin chào ông Sterling, đây là Evelyn từ Bộ phận Dịch vụ Quan hệ Khách hàng Doanh nghiệp gọi điện theo dõi tài khoản của ông.

[00:05.30] I am pleased to inform you that our credit committee has approved the annual renewal of your ten-million-dollar line of credit.
:: Việt: Tôi rất vui được thông báo với ông rằng ủy ban tín dụng của chúng tôi đã phê duyệt việc gia hạn hàng năm cho hạn mức tín dụng 10 triệu đô la của ông.

[00:10.80] Based on your company's strong credit score, we lowered your floating interest rate by twenty-five basis points.
:: Việt: Dựa trên điểm tín dụng tốt của công ty ông, chúng tôi đã giảm lãi suất thả nổi của ông xuống 25 điểm cơ bản.

[00:16.10] Please sign the attached credit renewal agreement and return it to our central office before the end of the month.
:: Việt: Vui lòng ký hợp đồng gia hạn tín dụng đính kèm và gửi lại cho văn phòng trung tâm của chúng tôi trước cuối tháng.

# QUIZ
Q1: What news did Evelyn share regarding Mr. Sterling's corporate account?
* [ ] The line of credit was canceled
* [ ] The bank requested immediate loan repayment
* [x] The annual renewal of a $10 million line of credit was approved
* [ ] Account maintenance fees were increased
-- Explanation: Evelyn informs Mr. Sterling that the credit committee "approved the annual renewal of your ten-million-dollar line of credit."

Q2: By how much was the company's floating interest rate reduced?
* [ ] 10 basis points
* [ ] 50 basis points
* [ ] 100 basis points
* [x] 25 basis points
-- Explanation: The transcript explicitly states: "we lowered your floating interest rate by twenty-five basis points."

Q3: What are listeners requested to do?
* [x] Sign the attached credit renewal agreement and return it to our central office before the end of the month
* [ ] Submit an immediate resignation notice
* [ ] Contact emergency facilities technicians
* [ ] Cease all client communications for the day
-- Explanation: The speaker instructs: "Please sign the attached credit renewal agreement and return it to our central office before the end of the month.".`;

export const LESSON_Q3_081_MD = `---
id: listen_toeic_q3_081
title: "MICE International Convention & Catering Setup"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Hospitality", "Event", "MICE"]
---

# VOCABULARY
- convention /kənˈven.ʃən/ (n): hội nghị/hội thảo lớn. E.g., The annual medical convention attracted two thousand delegates.
- catering setup /ˈkeɪ.t̬ɚ.ɪŋ ˈset.ʌp/ (n): việc sắp xếp dịch vụ ăn uống. E.g., Banquet staff prepared the catering setup in Grand Ballroom A.
- delegate /ˈdel.ə.ɡət/ (n): đại biểu tham dự hội nghị. E.g., Registered delegates receive conference badges and program materials.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ quy chuẩn pháp lý. E.g., All departments must ensure strict regulatory compliance.

# TRANSCRIPT
[00:00.00] Good morning event staff, here is our operational brief for the International Tech Summit opening today.
:: Việt: Chào buổi sáng nhân viên sự kiện, đây là điểm tin vận hành cho buổi khai mạc Hội nghị Tượng đỉnh Công nghệ Quốc tế hôm nay.

[00:05.30] We are expecting over eight hundred delegates in the Grand Ballroom for the morning opening ceremony at 9 AM.
:: Việt: Chúng ta đang đón tiếp hơn 800 đại biểu tại Phòng đại tiệc cho lễ khai mạc buổi sáng vào lúc 9 giờ sáng.

[00:10.80] Following the keynote address, a catered buffet lunch will be served in the adjoining Exhibition Hall from noon.
:: Việt: Sau bài phát biểu chính, tiệc buffet phục vụ tận nơi sẽ được cung cấp tại Nhà Triển lãm kế bên bắt đầu từ giữa trưa.

[00:16.10] Banqueting staff must ensure all coffee refresh stations are fully restocked during the 10:30 AM mid-morning break.
:: Việt: Nhân viên tiệc phải đảm bảo tất cả các trạm cà phê phục vụ lại được nạp đầy hoàn toàn trong giờ nghỉ giải lao giữa buổi sáng lúc 10:30.

# QUIZ
Q1: How many delegates are expected for the opening ceremony in the Grand Ballroom?
* [ ] 500
* [x] Over 800
* [ ] 1,000
* [ ] 1,500
-- Explanation: The manager specifies: "We are expecting over eight hundred delegates in the Grand Ballroom."

Q2: What must banqueting staff ensure during the 10:30 AM mid-morning break?
* [ ] Clear all dining tables
* [ ] Set up microphone stands
* [x] Fully restock all coffee refresh stations
* [ ] Distribute gift bags to delegates
-- Explanation: The transcript explicitly states: "Banqueting staff must ensure all coffee refresh stations are fully restocked."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
* [x] Be served in the adjoining Exhibition Hall from noon
-- Explanation: The speaker notes: "Following the keynote address, a catered buffet lunch will be served in the adjoining Exhibition Hall from noon.".`;

export const LESSON_Q3_082_MD = `---
id: listen_toeic_q3_082
title: "Aircraft Maintenance Inspection & Flight Safety Standards"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Aviation", "Maintenance", "Safety"]
---

# VOCABULARY
- maintenance /ˈmeɪn.tən.əns/ (n): sự bảo dưỡng, bảo trì. E.g., Scheduled aircraft maintenance prevents technical delays.
- hydraulic /haɪˈdrɑː.lɪk/ (adj): thuộc thủy lực. E.g., Mechanics inspected the aircraft's hydraulic fluid levels.
- clearance /ˈklɪr.əns/ (n): sự cấp phép cất cánh. E.g., The plane received maintenance clearance for departure.
- protocol /ˈproʊ.t̬ə.kɑːl/ (n): quy trình, nghi thức chuẩn mực. E.g., Emergency safety protocols must be reviewed annually.

# TRANSCRIPT
[00:00.00] Good morning hangar mechanics, here is our briefing on the routine servicing for Boeing Flight 602.
:: Việt: Chào buổi sáng các thợ máy nhà hầm, đây là điểm tin về việc bảo dưỡng định kỳ cho Chuyến bay Boeing 602.

[00:05.30] Our avionics team completed the radar sensor check, and all flight control systems are functioning normally.
:: Việt: Đội ngũ điện tử hàng không của chúng ta đã hoàn thành việc kiểm tra cảm biến ra-đa và tất cả các hệ thống điều khiển bay đều hoạt động bình thường.

[00:10.80] However, we detected a minor hydraulic fluid leak near engine number two that requires immediate seal replacement.
:: Việt: Tuy nhiên, chúng tôi đã phát hiện một điểm rò rỉ dầu thủy lực nhỏ gần động cơ số 2 cần phải thay vòng đệm ngay lập tức.

[00:16.10] Final flight clearance will be granted once technicians complete pressure testing by 3 PM.
:: Việt: Cấp phép bay cuối cùng sẽ được trao sau khi các kỹ thuật viên hoàn tất việc kiểm tra áp suất trước 3 giờ chiều.

# QUIZ
Q1: What system was completed and verified as functioning normally?
* [x] Radar sensors and flight control systems
* [ ] Passenger cabin air conditioning
* [ ] Fuel line delivery pumps
* [ ] Emergency escape slides
-- Explanation: The supervisor states that "our avionics team completed the radar sensor check, and all flight control systems are functioning normally."

Q2: When will final flight clearance be granted?
* [ ] At 12 PM
* [x] Once technicians complete pressure testing by 3 PM
* [ ] At 1 PM
* [ ] Tomorrow morning before departure
-- Explanation: The transcript explicitly mentions: "Final flight clearance will be granted once technicians complete pressure testing by 3 PM."

Q3: What maintenance or corrective action is required?
* [ ] Complete decommissioning of the machinery
* [ ] Hiring an external consulting firm
* [x] Immediate seal replacement
* [ ] Shutting down the facility for several months
-- Explanation: The transcript confirms: "However, we detected a minor hydraulic fluid leak near engine number two that requires immediate seal replacement.".`;

export const LESSON_Q3_083_MD = `---
id: listen_toeic_q3_083
title: "Media Production Schedule & Location Shooting Permits"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Media", "Production", "Entertainment"]
---

# VOCABULARY
- permit /ˈpɝː.mɪt/ (n): giấy phép quay phim. E.g., The crew secured municipal permits for shooting in the historic district.
- schedule /ˈskedʒ.uːl/ (n, v): lịch trình. E.g., Weather disruptions forced us to adjust our filming schedule.
- crew /kruː/ (n): đoàn làm phim. E.g., The camera crew prepared equipment for the morning scene.
- initiative /ɪˈnɪʃ.ə.t̬ɪv/ (n): sáng kiến đổi mới. E.g., Management launched a green initiative to reduce corporate carbon footprints.

# TRANSCRIPT
[00:00.00] Attention production crew, here is our filming schedule update for scene twelve at City Hall Park.
:: Việt: Xin chú ý toàn thể đoàn làm phim, đây là bản cập nhật lịch quay cho cảnh số 12 tại Công viên Tòa thị chính.

[00:05.30] City officials have officially granted our municipal filming permits for Thursday and Friday morning.
:: Việt: Các quan chức thành phố đã chính thức cấp giấy phép quay phim của thành phố cho sáng Thứ Năm và Thứ Sáu.

[00:10.80] To take advantage of natural morning lighting, all camera setups and sound equipment must be ready by 6 AM.
:: Việt: Để tận dụng ánh sáng tự nhiên buổi sáng, tất cả việc lắp đặt máy ảnh và thiết bị âm thanh phải sẵn sàng trước 6 giờ sáng.

[00:16.10] Catering trucks will provide hot breakfast for the cast and crew near the north park entrance starting at 5:15 AM.
:: Việt: Xe phục vụ ăn uống sẽ cung cấp bữa sáng nóng cho diễn viên và đoàn phim gần lối vào phía bắc công viên bắt đầu từ 5:15 sáng.

# QUIZ
Q1: On which days were municipal filming permits granted for City Hall Park?
* [ ] Tuesday and Wednesday
* [ ] Saturday and Sunday
* [ ] Next Monday only
* [x] Thursday and Friday morning
-- Explanation: The production manager specifies that permits were granted "for Thursday and Friday morning."

Q2: By what time must camera setups and sound equipment be ready?
* [x] 6:00 AM
* [ ] 5:15 AM
* [ ] 7:30 AM
* [ ] 8:00 AM
-- Explanation: The transcript explicitly states: "all camera setups and sound equipment must be ready by 6 AM."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [x] Provide hot breakfast for the cast and crew near the north park entrance starting at 5:15 AM
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Catering trucks will provide hot breakfast for the cast and crew near the north park entrance starting at 5:15 AM.".`;

export const LESSON_Q3_084_MD = `---
id: listen_toeic_q3_084
title: "Commercial Credit Risk & Borrower Appraisal"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Banking", "Finance", "Risk Management"]
---

# VOCABULARY
- appraisal /əˈpreɪ.zəl/ (n): sự thẩm định giá trị. E.g., Independent real estate appraisal verified the collateral's market value.
- default /dɪˈfɑːlt/ (n, v): sự vỡ nợ. E.g., Assessing borrower financial ratios reduces loan default rates.
- liquidity /lɪˈkwɪd.ə.t̬i/ (n): tính thanh khoản. E.g., The company maintained high liquidity to cover short-term debt obligations.
- efficiency /ɪˈfɪʃ.ən.si/ (n): tính hiệu quả, năng suất. E.g., Upgraded server hardware enhances internal operational efficiency.

# TRANSCRIPT
[00:00.00] Good morning underwriting committee, I want to review the credit risk assessment for the Apex Logistics loan application.
:: Việt: Chào buổi sáng ủy ban thẩm định, tôi muốn xem xét bản đánh giá rủi ro tín dụng cho đơn xin vay của Apex Logistics.

[00:05.30] Our financial audit confirmed that the borrower possesses strong liquidity and healthy debt coverage ratios.
:: Việt: Kiểm toán tài chính của chúng tôi xác nhận rằng bên vay sở hữu tính thanh khoản mạnh và tỷ lệ đảm bảo nợ lành mạnh.

[00:10.80] However, due to recent market fluctuations, we recommend capping the total revolving credit limit at five million dollars.
:: Việt: Tuy nhiên, do những biến động thị trường gần đây, chúng tôi đề xuất khống chế hạn mức tín dụng quay vòng tổng thể ở mức 5 triệu đô la.

[00:16.10] Final loan disbursement is conditional upon receiving an updated real estate appraisal for their main warehouse property.
:: Việt: Việc giải ngân khoản vay cuối cùng phụ thuộc vào việc nhận được bản thẩm định bất động sản cập nhật cho tài sản kho chính của họ.

# QUIZ
Q1: What cap is recommended for Apex Logistics' revolving credit limit?
* [ ] $2 million
* [ ] $10 million
* [x] $5 million
* [ ] $15 million
-- Explanation: The risk officer recommends "capping the total revolving credit limit at five million dollars."

Q2: What is final loan disbursement conditional upon?
* [ ] Hiring a new Chief Financial Officer
* [ ] Paying a 5% processing fee
* [ ] Extending the lease on their corporate office
* [x] Receiving an updated real estate appraisal for their warehouse
-- Explanation: The transcript explicitly states: "Final loan disbursement is conditional upon receiving an updated real estate appraisal."

Q3: What does the speaker recommend doing?
* [x] Capping the total revolving credit limit at five million dollars
* [ ] Doubling the total corporate loan balance
* [ ] Liquidating all remaining department assets
* [ ] Refusing to extend lines of credit
-- Explanation: The speaker recommends: "However, due to recent market fluctuations, we recommend capping the total revolving credit limit at five million dollars.".`;

export const LESSON_Q3_085_MD = `---
id: listen_toeic_q3_085
title: "Wind Turbine Offshore Farm Expansion & Grid Output"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Energy", "Renewable", "Engineering"]
---

# VOCABULARY
- turbine /ˈtɝː.baɪn/ (n): tua-bin điện gió. E.g., Modern offshore wind turbines generate clean electricity efficiently.
- capacity /kəˈpæs.ə.t̬i/ (n): công suất. E.g., The wind farm expanded its total power generation capacity.
- grid integration /ɡrɪd ˌɪn.t̬əˈɡreɪ.ʃən/ (n): sự hòa mạng lưới điện. E.g., Successful grid integration guarantees stable power distribution to urban centers.
- confidentiality /ˌkɑːn.fə.den.ʃiˈæl.ə.t̬i/ (n): tính bảo mật thông tin. E.g., Staff signed non-disclosure agreements to preserve client confidentiality.

# TRANSCRIPT
[00:00.00] Good afternoon stakeholders, I am pleased to report on Phase Two of our offshore wind farm installation project.
:: Việt: Chào buổi chiều các bên liên quan, tôi rất vui mừng được báo cáo về Giai đoạn 2 của dự án lắp đặt trang trại điện gió ngoài khơi của chúng ta.

[00:05.30] Mechanics successfully erected fifteen new heavy-duty wind turbines off the northern coastline this past month.
:: Việt: Các thợ cơ khí đã dựng thành công 15 tua-bin gió hạng nặng mới ngoài khơi bờ biển phía bắc trong tháng qua.

[00:10.80] Once high-voltage undersea cables are connected, these turbines will boost our total renewable grid output by thirty percent.
:: Việt: Sau khi các đường cáp ngầm dưới biển cao thế được kết nối, các tua-bin này sẽ tăng tổng sản lượng điện tái tạo hòa lưới của chúng ta lên 30%.

[00:16.10] Full commercial operation and energy distribution are scheduled to begin officially on October 1st.
:: Việt: Hoạt động thương mại toàn diện và phân phối năng lượng được lên lịch bắt đầu chính thức vào ngày 1 tháng 10.

# QUIZ
Q1: How many new wind turbines were erected off the northern coastline?
* [ ] 10
* [x] 15
* [ ] 20
* [ ] 25
-- Explanation: The project manager states: "Mechanics successfully erected fifteen new heavy-duty wind turbines."

Q2: By how much will the new turbines boost renewable grid output once connected?
* [ ] 15%
* [ ] 20%
* [x] 30%
* [ ] 50%
-- Explanation: The transcript explicitly states: "these turbines will boost our total renewable grid output by thirty percent."

Q3: When is the event, operation, or interview scheduled?
* [ ] Next Friday at 5:00 PM
* [ ] At the end of the next quarter
* [ ] Early tomorrow morning
* [x] Officially on October 1st
-- Explanation: The speaker states: "Full commercial operation and energy distribution are scheduled to begin officially on October 1st.".`;

export const LESSON_Q3_086_MD = `---
id: listen_toeic_q3_086
title: "Pharma Cold Chain Logistics & Temperature Monitoring"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Pharma", "Logistics", "Cold Chain"]
---

# VOCABULARY
- cold chain /koʊld tʃeɪn/ (n): chuỗi cung ứng lạnh. E.g., Vaccine delivery requires an unbroken cold chain.
- sensor /ˈsen.sɚ/ (n): cảm biến. E.g., Wireless sensors record temperature fluctuations during transit.
- regulatory compliance /ˈreɡ.jə.lə.tɔːr.i kəmˈplaɪ.əns/ (n): sự tuân thủ quy định pháp lý. E.g., Strict cold chain tracking maintains regulatory compliance.
- collaboration /kəˌlæb.əˈreɪ.ʃən/ (n): sự hợp tác làm việc nhóm. E.g., Cross-functional collaboration accelerated the product development cycle.

# TRANSCRIPT
[00:00.00] Attention warehouse logistics operators, here is an urgent reminder regarding our pharmaceutical cold chain transport shipments.
:: Việt: Xin chú ý các nhà vận hành logistics kho hàng, đây là nhắc nhở khẩn cấp liên quan đến các chuyến hàng vận chuyển chuỗi cung ứng lạnh dược phẩm của chúng ta.

[00:05.30] All temperature-sensitive vaccine shipments must be stored strictly between two and eight degrees Celsius throughout transit.
:: Việt: Tất cả các chuyến hàng vắc-xin nhạy cảm với nhiệt độ phải được bảo quản nghiêm ngặt từ 2 đến 8 độ C trong suốt quá trình vận chuyển.

[00:10.80] Refrigerated transport trucks are now fitted with automated IoT sensors that log temperature data every five minutes.
:: Việt: Xe tải vận chuyển làm lạnh hiện đã được trang bị cảm biến IoT tự động ghi lại dữ liệu nhiệt độ mỗi 5 phút một lần.

[00:16.10] Any shipments showing a temperature deviation exceeding fifteen minutes will be flagged for immediate laboratory inspection.
:: Việt: Bất kỳ chuyến hàng nào có độ lệch nhiệt độ vượt quá 15 phút sẽ bị đánh dấu để kiểm tra phòng thí nghiệm ngay lập tức.

# QUIZ
Q1: What is the required temperature range for the vaccine shipments during transit?
* [x] Two to eight degrees Celsius
* [ ] Zero to five degrees Celsius
* [ ] Five to ten degrees Celsius
* [ ] Below freezing
-- Explanation: The director specifies that shipments "must be stored strictly between two and eight degrees Celsius."

Q2: How often do the automated IoT sensors log temperature data?
* [ ] Every minute
* [x] Every 5 minutes
* [ ] Every 15 minutes
* [ ] Every hour
-- Explanation: The transcript explicitly states: "automated IoT sensors that log temperature data every five minutes."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Be flagged for immediate laboratory inspection
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Any shipments showing a temperature deviation exceeding fifteen minutes will be flagged for immediate laboratory inspection.".`;

export const LESSON_Q3_087_MD = `---
id: listen_toeic_q3_087
title: "Intellectual Property Patent Filing & Trademark Protection"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Legal", "Intellectual Property", "Patent"]
---

# VOCABULARY
- patent /ˈpæt.ənt/ (n): bằng sáng chế. E.g., Filing an international patent application protects corporate technological innovations.
- trademark /ˈtreɪd.mɑːrk/ (n): thương hiệu, nhãn hiệu đăng ký. E.g., Registering our brand trademark prevents counterfeit market imitation.
- infringement /ɪnˈfrɪndʒ.mənt/ (n): sự vi phạm bản quyền. E.g., The legal team issued a cease-and-desist letter regarding copyright infringement.
- productivity /ˌproʊ.dʌkˈtɪv.ə.t̬i/ (n): năng suất lao động. E.g., Flexible work schedules contributed to higher employee productivity.

# TRANSCRIPT
[00:00.00] Good morning executive board, I have an important update regarding our international intellectual property portfolio.
:: Việt: Chào buổi sáng ban điều hành, tôi có một thông báo cập nhật quan trọng liên quan đến danh mục sở hữu trí tuệ quốc tế của chúng ta.

[00:05.30] Our patent application for the core autonomous driving algorithm was officially approved by the Patent Office yesterday.
:: Việt: Đơn xin cấp bằng sáng chế của chúng ta cho thuật toán lái xe tự động cốt lõi đã được Cơ quan Bằng sáng chế chính thức phê duyệt vào ngày hôm qua.

[00:10.80] This global patent protection secures our proprietary technology across twenty-five member countries for twenty years.
:: Việt: Việc bảo hộ bằng sáng chế toàn cầu này đảm bảo công nghệ độc quyền của chúng ta trên 25 quốc gia thành viên trong 20 năm.

[00:16.10] Our legal team will now finalize European trademark registrations for our updated product logo next week.
:: Việt: Đội ngũ pháp lý của chúng ta bây giờ sẽ hoàn tất việc đăng ký nhãn hiệu Châu Âu cho logo sản phẩm đã cập nhật vào tuần tới.

# QUIZ
Q1: What patent application was officially approved yesterday?
* [ ] A new battery manufacturing process
* [ ] A wireless phone charging design
* [ ] An enterprise database architecture
* [x] The core autonomous driving algorithm
-- Explanation: The legal counsel specifies: "Our patent application for the core autonomous driving algorithm was officially approved."

Q2: How many member countries are covered by the global patent protection?
* [x] 25
* [ ] 15
* [ ] 20
* [ ] 30
-- Explanation: The transcript explicitly states: "secures our proprietary technology across twenty-five member countries."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [x] Now finalize European trademark registrations for our updated product logo next week
* [ ] The budget will be reduced by fifty percent
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Our legal team will now finalize European trademark registrations for our updated product logo next week.".`;

export const LESSON_Q3_088_MD = `---
id: listen_toeic_q3_088
title: "Cross-Border E-Commerce & Overseas Customs Duties"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["E-Commerce", "Customs", "Trade"]
---

# VOCABULARY
- cross-border /krɑːs ˈbɔːr.dɚ/ (adj): xuyên biên giới. E.g., Cross-border e-commerce sales expanded rapidly across Asian markets.
- customs duty /ˈkʌs.təmz ˈduː.ti/ (n): thuế hải quan. E.g., Calculating accurate customs duty upfront speeds up package clearance.
- fulfillment /fʊlˈfɪl.mənt/ (n): sự hoàn tất và giao đơn hàng. E.g., Overseas fulfillment hubs reduce delivery lead times for global buyers.
- optimization /ˌɑːp.tə.məˈzeɪ.ʃən/ (n): sự tối ưu hóa hệ thống. E.g., Code optimization reduced server response times significantly.

# TRANSCRIPT
[00:00.00] Attention international operations team, here is a briefing on our cross-border retail shipping integration.
:: Việt: Xin chú ý đội ngũ vận hành quốc tế, đây là buổi phổ biến thông tin về việc tích hợp vận chuyển bán lẻ xuyên biên giới của chúng ta.

[00:05.30] We have updated our online checkout engine to calculate real-time foreign customs duties and import taxes automatically.
:: Việt: Chúng ta đã cập nhật công cụ thanh toán trực tuyến để tự động tính toán thuế hải quan và thuế nhập khẩu nước ngoài theo thời gian thực.

[00:10.80] Customers can now choose Delivered Duty Paid options, eliminating unexpected tax collection fees upon package arrival.
:: Việt: Khách hàng giờ đây có thể chọn tùy chọn "Đã trả thuế khi giao hàng", loại bỏ các khoản phí thu thuế bất ngờ khi kiện hàng đến nơi.

[00:16.10] This automated clearance feature is expected to reduce overseas package return rates by thirty-five percent.
:: Việt: Tính năng thông quan tự động này dự kiến sẽ giảm tỷ lệ trả lại hàng từ nước ngoài 35%.

# QUIZ
Q1: What enhancement was added to the online checkout engine?
* [ ] Free gift packaging options
* [ ] Multi-currency crypto payment support
* [x] Real-time calculation of foreign customs duties and import taxes
* [ ] Live video chat assistance with sales agents
-- Explanation: The lead announces updating the checkout engine to "calculate real-time foreign customs duties and import taxes automatically."

Q2: By how much is the automated clearance feature expected to reduce package return rates?
* [ ] 15%
* [ ] 25%
* [ ] 50%
* [x] 35%
-- Explanation: The transcript explicitly states: "expected to reduce overseas package return rates by thirty-five percent."

Q3: What key detail does the speaker emphasize?
* [x] Customers can now choose Delivered Duty Paid options, eliminating unexpected tax collection fees upon package arrival
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Customers can now choose Delivered Duty Paid options, eliminating unexpected tax collection fees upon package arrival.".`;

export const LESSON_Q3_089_MD = `---
id: listen_toeic_q3_089
title: "Nuclear Power Plant Radiation Safety & Inspection"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Energy", "Safety", "Nuclear"]
---

# VOCABULARY
- radiation /ˌreɪ.diˈeɪ.ʃən/ (n): bức xạ, phóng xạ. E.g., Automated sensors continuously monitor background radiation levels.
- containment vessel /kənˈteɪn.mənt ˈves.əl/ (n): lò/vỏ bọc an toàn hạt nhân. E.g., Engineers inspected the integrity of the concrete containment vessel.
- protocol /ˈproʊ.tə.kɑːl/ (n): quy trình an toàn. E.g., Adhering to nuclear safety protocols protects plant operators.
- allocate /ˈæl.ə.keɪt/ (v): phân bổ nguồn lực, kinh phí. E.g., Finance leaders agreed to allocate additional funding to research.

# TRANSCRIPT
[00:00.00] Attention all plant personnel, this is a safety announcement from the Health Physics and Safety Office.
:: Việt: Xin chú ý toàn thể nhân viên nhà máy, đây là thông báo an toàn từ Văn phòng An toàn Bức xạ Y tế.

[00:05.30] Annual containment vessel integrity testing and radiation sensor calibrations were successfully completed this morning.
:: Việt: Việc kiểm tra tính toàn vẹn của vỏ bọc an toàn và hiệu chuẩn cảm biến bức xạ hàng năm đã hoàn thành thành công vào sáng nay.

[00:10.80] All environmental radiation readings across Reactors 1 and 2 remain well below federal safety thresholds.
:: Việt: Tất cả các chỉ số bức xạ môi trường tại Lò phản ứng 1 và 2 đều nằm dưới mức ngưỡng an toàn của liên bang.

[00:16.10] Technicians entering Reactor Building B are reminded to scan their electronic dosimeter badges at the airlock exit.
:: Việt: Các kỹ thuật viên đi vào Nhà lò phản ứng B được nhắc nhở quét thẻ đo liều lượng bức xạ điện tử tại cửa xả khí.

# QUIZ
Q1: What testing was successfully completed this morning?
* [ ] Turbine replacement
* [x] Containment vessel integrity testing and radiation sensor calibrations
* [ ] Electrical grid transformer installation
* [ ] Cooling water pipe replacement
-- Explanation: The safety director mentions that "containment vessel integrity testing and radiation sensor calibrations were successfully completed."

Q2: What must technicians entering Reactor Building B do at the airlock exit?
* [ ] Disinfect their shoes
* [ ] Submit a written shift log
* [x] Scan their electronic dosimeter badges
* [ ] Hand in their safety helmets
-- Explanation: The transcript explicitly states: "Technicians... are reminded to scan their electronic dosimeter badges at the airlock exit."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
* [x] All environmental radiation readings across Reactors 1 and 2 remain well below federal safety thresholds
-- Explanation: The speaker emphasizes: "All environmental radiation readings across Reactors 1 and 2 remain well below federal safety thresholds.".`;

export const LESSON_Q3_090_MD = `---
id: listen_toeic_q3_090
title: "EdTech Learning Management System & Interactive Modules"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["EdTech", "Education", "Software"]
---

# VOCABULARY
- Learning Management System (LMS) /ˈlɝː.nɪŋ ˈmæn.ədʒ.mənt ˈsɪs.təm/ (n): hệ thống quản lý học tập. E.g., Teachers track student progress using the online LMS portal.
- interactive /ˌɪn.t̬ɚˈæk.tɪv/ (adj): tương tác. E.g., Interactive video quizzes improve course completion rates.
- analytics /ˌæn.əlˈɪt.ɪks/ (n): dữ liệu phân tích. E.g., Course analytics show where students spend the most study time.
- prioritize /praɪˈɔːr.ə.taɪz/ (v): ưu tiên xử lý trước. E.g., Customer support specialists prioritize high-urgency inquiries.

# TRANSCRIPT
[00:00.00] Hello instructional designers, I want to highlight the performance results of our upgraded learning platform.
:: Việt: Xin chào các nhà thiết kế chương trình học, tôi muốn điểm qua kết quả hiệu năng của nền tảng học tập nâng cấp của chúng ta.

[00:05.30] Following the integration of interactive video modules, overall student course completion rates rose by twenty-two percent.
:: Việt: Sau khi tích hợp các học phần video tương tác, tỷ lệ hoàn thành khóa học tổng thể của học viên đã tăng 22%.

[00:10.80] Furthermore, our new AI dashboard allows instructors to identify struggling students early and send automated study reminders.
:: Việt: Hơn nữa, bảng điều khiển AI mới của chúng ta cho phép các giảng viên phát hiện sớm học viên gặp khó khăn và gửi nhắc nhở học tập tự động.

[00:16.10] We will deploy the new mobile offline learning feature across all iOS and Android devices by the end of July.
:: Việt: Chúng ta sẽ triển khai tính năng học ngoại tuyến trên di động mới trên tất cả thiết bị iOS và Android trước cuối tháng 7.

# QUIZ
Q1: By how much did student course completion rates increase after integrating video modules?
* [x] 22%
* [ ] 12%
* [ ] 18%
* [ ] 30%
-- Explanation: The product director states: "overall student course completion rates rose by twenty-two percent."

Q2: What new mobile feature will be deployed across iOS and Android devices by the end of July?
* [ ] Voice recognition grading
* [x] Offline learning capability
* [ ] Live video tutoring calls
* [ ] Automated textbook ordering
-- Explanation: The transcript explicitly mentions: "We will deploy the new mobile offline learning feature."

Q3: What capability does the new AI dashboard provide?
* [ ] Grading all final exams automatically without teachers
* [ ] Cancelling classes that fail to meet enrollment targets
* [x] Identify struggling students early and send automated study reminders
* [ ] Publishing student scores on public websites
-- Explanation: The transcript mentions: "Furthermore, our new AI dashboard allows instructors to identify struggling students early and send automated study reminders.".`;

export const LESSON_Q3_091_MD = `---
id: listen_toeic_q3_091
title: "Food Supply Chain Traceability & QR Code Tracking"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Food Safety", "Supply Chain", "Logistics"]
---

# VOCABULARY
- traceability /ˌtreɪ.səˈbɪl.ə.t̬i/ (n): khả năng truy xuất nguồn gốc. E.g., QR codes provide complete farm-to-table food supply chain traceability.
- recall /rɪˈkɑːl/ (v, n): sự thu hồi sản phẩm. E.g., Rapid lot identification minimizes the scope of food safety recalls.
- distribution center /ˌdɪs.trɪˈbjuː.ʃən ˈsen.t̬ɚ/ (n): trung tâm phân phối. E.g., Produce shipments are inspected before leaving the distribution center.
- streamline /ˈstriːm.laɪn/ (v): tinh giản, tổ chức hợp lý hóa. E.g., The corporate restructure aims to streamline reporting channels.

# TRANSCRIPT
[00:00.00] Attention retail operations partners, here is an update on our farm-to-table food safety tracking initiative.
:: Việt: Xin chú ý các đối tác vận hành bán lẻ, đây là thông báo cập nhật về sáng kiến theo dõi an toàn thực phẩm từ trang trại đến bàn ăn của chúng ta.

[00:05.30] All fresh organic produce containers leaving our distribution centers now display a unique tracking QR code.
:: Việt: Tất cả các thùng nông sản hữu cơ tươi xuất kho khỏi các trung tâm phân phối của chúng ta giờ đây đều hiển thị một mã QR truy xuất độc nhất.

[00:10.80] Consumers can scan the code with their smartphones to view origin farm details, harvest dates, and temperature logs.
:: Việt: Người tiêu dùng có thể quét mã bằng điện thoại thông minh để xem chi tiết trang trại xuất xứ, ngày thu hoạch và nhật ký nhiệt độ.

[00:16.10] This digital traceability system has reduced inventory verification times at receiving docks by forty percent.
:: Việt: Hệ thống truy xuất nguồn gốc kỹ thuật số này đã giảm 40% thời gian xác minh hàng tồn kho tại các cầu cảng tiếp nhận.

# QUIZ
Q1: What information can consumers view by scanning the QR code on fresh produce containers?
* [ ] Recipe ideas and cooking tutorials
* [ ] Store cashier employee names
* [ ] Loyalty reward points earned
* [x] Origin farm details, harvest dates, and temperature logs
-- Explanation: The director specifies that consumers can "view origin farm details, harvest dates, and temperature logs."

Q2: By what percentage did the traceability system reduce inventory verification times at receiving docks?
* [x] 40%
* [ ] 20%
* [ ] 30%
* [ ] 50%
-- Explanation: The transcript explicitly states: "reduced inventory verification times at receiving docks by forty percent."

Q3: What can consumers do with the QR code?
* [ ] Redeem a fifty-percent grocery discount voucher
* [x] The code with their smartphones to view origin farm details, harvest dates, and temperature logs
* [ ] Order products directly from wholesale suppliers
* [ ] Enter an annual sweepstakes contest
-- Explanation: The speaker states: "Consumers can scan the code with their smartphones to view origin farm details, harvest dates, and temperature logs.".`;

export const LESSON_Q3_092_MD = `---
id: listen_toeic_q3_092
title: "Luxury Beach Resort Grand Opening & VIP Amenities"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Hospitality", "Real Estate", "Tourism"]
---

# VOCABULARY
- beachfront /ˈbiːtʃ.frʌnt/ (adj, n): bờ biển, sát biển. E.g., The resort features fifty luxury beachfront villas with private pools.
- hospitality /ˌhɑː.spɪˈtæl.ə.t̬i/ (n): ngành dịch vụ khách sạn - nhà hàng. E.g., Delivering world-class hospitality is our resort's primary mission.
- reservation /ˌrez.ɚˈveɪ.ʃən/ (n): sự đặt phòng, việc giữ chỗ. E.g., VIP guests can manage their resort reservations via our mobile app.
- authorization /ˌɑː.θɚ.əˈzeɪ.ʃən/ (n): sự cấp phép chính thức. E.g., Purchase orders require senior management authorization.

# TRANSCRIPT
[00:00.00] Good morning travel partners, I am thrilled to present our newest luxury property, the Azure Beach Resort.
:: Việt: Chào buổi sáng các đối tác du lịch, tôi rất vui mừng được giới thiệu bất động sản nghỉ dưỡng cao cấp mới nhất của chúng tôi, Azure Beach Resort.

[00:05.30] Situated on fifty acres of coastline, the resort features sixty private villas, an infinity pool, and a world-class spa.
:: Việt: Nằm trên 50 mẫu Anh bờ biển, khu nghỉ dưỡng có 60 biệt thự riêng tư, một hồ bơi vô cực và một spa đẳng cấp thế giới.

[00:10.80] Our official grand opening celebration is scheduled for November 15th, followed by full operational booking access.
:: Việt: Lễ khai trương chính thức của chúng tôi được lên lịch vào ngày 15 tháng 11, tiếp theo là việc mở cổng đặt phòng vận hành toàn diện.

[00:16.10] Travel agents who register guest bookings before October 30th will receive an additional five percent commission bonus.
:: Việt: Các đại lý du lịch đăng ký đặt phòng cho khách trước ngày 30 tháng 10 sẽ nhận được thêm 5% tiền thưởng hoa hồng.

# QUIZ
Q1: How many private villas does the Azure Beach Resort feature?
* [ ] 40
* [ ] 50
* [x] 60
* [ ] 80
-- Explanation: The manager specifies that the resort features "sixty private villas, an infinity pool, and a world-class spa."

Q2: What incentive is offered to travel agents who register guest bookings before October 30th?
* [ ] Free weekend stays for agents
* [ ] Complimentary airport limousine transfers
* [ ] Free marketing banners
* [x] An additional 5% commission bonus
-- Explanation: The transcript explicitly states: "will receive an additional five percent commission bonus."

Q3: When is the event, operation, or interview scheduled?
* [x] November 15th, followed by full operational booking access
* [ ] Next Friday at 5:00 PM
* [ ] At the end of the next quarter
* [ ] Early tomorrow morning
-- Explanation: The speaker states: "Our official grand opening celebration is scheduled for November 15th, followed by full operational booking access.".`;

export const LESSON_Q3_093_MD = `---
id: listen_toeic_q3_093
title: "Smart Agriculture Monitoring & Cattle Health Tracking"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Agritech", "Agriculture", "IoT"]
---

# VOCABULARY
- livestock /ˈlaɪv.stɑːk/ (n): vật nuôi, gia súc. E.g., Wearable IoT sensors monitor livestock vital signs around the clock.
- sensor /ˈsen.sɚ/ (n): cảm biến. E.g., Smart collars contain biometric sensors that record body temperature.
- herd /hɝːd/ (n): đàn gia súc. E.g., The software tracks the daily movement patterns of the entire herd.
- consensus /kənˈsen.səs/ (n): sự đồng thuận chung. E.g., Committee members reached a consensus on the new budget proposal.

# TRANSCRIPT
[00:00.00] Hello agricultural tech representatives, welcome to our demonstration of the Smart Farm Livestock Collar.
:: Việt: Xin chào các đại diện công nghệ nông nghiệp, chào mừng đến với buổi trình diễn Vòng đeo cổ Gia súc Thông minh của chúng tôi.

[00:05.30] Each waterproof collar contains biometric sensors that monitor cattle body temperature and movement activity every ten minutes.
:: Việt: Mỗi vòng đeo cổ chống nước đều chứa các cảm biến sinh trắc học để theo dõi nhiệt độ cơ thể và hoạt động di chuyển của gia súc mỗi 10 phút một lần.

[00:10.80] If an animal shows early signs of illness or stress, an automated alert is transmitted directly to the farmer's smartphone.
:: Việt: Nếu một con vật có dấu hiệu bị bệnh hoặc căng thẳng sớm, một cảnh báo tự động sẽ được truyền trực tiếp đến điện thoại thông minh của người nông dân.

[00:16.10] Field tests demonstrated that early health intervention reduced herd medical treatment costs by thirty percent.
:: Việt: Các đợt kiểm thử thực địa đã chứng minh rằng việc can thiệp sức khỏe sớm đã làm giảm 30% chi phí điều trị y tế cho toàn đàn.

# QUIZ
Q1: How often do the smart collar biometric sensors log animal body temperature and activity?
* [ ] Every minute
* [x] Every 10 minutes
* [ ] Every 5 minutes
* [ ] Every hour
-- Explanation: The director specifies that sensors monitor vitals "every ten minutes."

Q2: By how much did early health intervention reduce herd medical treatment costs in field tests?
* [ ] 15%
* [ ] 20%
* [x] 30%
* [ ] 40%
-- Explanation: The transcript explicitly states: "reduced herd medical treatment costs by thirty percent."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
* [x] If an animal shows early signs of illness or stress, an automated alert is transmitted directly to the farmer's smartphone
-- Explanation: The speaker emphasizes: "If an animal shows early signs of illness or stress, an automated alert is transmitted directly to the farmer's smartphone.".`;

export const LESSON_Q3_094_MD = `---
id: listen_toeic_q3_094
title: "Commercial Property Fire Insurance & Safety Compliance"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Insurance", "Safety", "Real Estate"]
---

# VOCABULARY
- sprinkler system /ˈsprɪŋ.klɚ ˈsɪs.təm/ (n): hệ thống chữa cháy tự động. E.g., Building inspection verified that all emergency sprinkler systems are operational.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ quy định. E.g., Maintaining fire safety compliance qualifies property owners for lower premiums.
- hazard /ˈhæz.ɚd/ (n): mối nguy hiểm cháy nổ. E.g., Chemical storage areas must be cleared of flammable hazards.
- discrepancy /dɪˈskrep.ən.si/ (n): sự sai lệch, khác biệt số liệu. E.g., The internal audit detected an accounting discrepancy in inventory logs.

# TRANSCRIPT
[00:00.00] Attention commercial building owners, this is an advisory notice from National Fire and Property Insurance.
:: Việt: Xin chú ý các chủ tòa nhà thương mại, đây là thông báo tư vấn từ Bảo hiểm Tài sản và Cháy nổ Quốc gia.

[00:05.30] Annual fire safety audits for all insured industrial properties will begin across the metro region next Monday.
:: Việt: Các cuộc kiểm tra an toàn cháy nổ hàng năm cho tất cả các bất động sản công nghiệp được bảo hiểm sẽ bắt đầu trên toàn khu vực đô thị vào Thứ Hai tuần tới.

[00:10.80] Inspectors will verify the operational readiness of automated water sprinklers, smoke detectors, and emergency exit doors.
:: Việt: Các giám định viên sẽ xác minh trạng thái sẵn sàng vận hành của hệ thống phun nước tự động, máy báo khói và các cửa thoát hiểm khẩn cấp.

[00:16.10] Policyholders who pass the audit without compliance violations will receive a ten percent credit on their annual premium.
:: Việt: Các chủ hợp đồng vượt qua kỳ kiểm tra mà không vi phạm tuân thủ sẽ nhận được khoản tín dụng 10% trên phí bảo hiểm hàng năm của họ.

# QUIZ
Q1: What will fire safety inspectors verify during the annual audit?
* [x] Water sprinklers, smoke detectors, and emergency exit doors
* [ ] Employee attendance records
* [ ] Computer server network wiring
* [ ] Parking lot paving conditions
-- Explanation: The inspector specifies that they will verify "automated water sprinklers, smoke detectors, and emergency exit doors."

Q2: What benefit will policyholders receive if they pass the audit without violations?
* [ ] Free legal consultations for one year
* [x] A 10% credit on their annual premium
* [ ] Extended policy coverage duration
* [ ] Full refund of past insurance claims
-- Explanation: The transcript explicitly states: "will receive a ten percent credit on their annual premium."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Verify the operational readiness of automated water sprinklers, smoke detectors, and emergency exit doors
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Inspectors will verify the operational readiness of automated water sprinklers, smoke detectors, and emergency exit doors.".`;

export const LESSON_Q3_095_MD = `---
id: listen_toeic_q3_095
title: "Airport Terminal Runway Renovation & Gate Reassignment"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Aviation", "Airport", "Operations"]
---

# VOCABULARY
- runway /ˈrʌn.weɪ/ (n): đường băng cất/hạ cánh. E.g., Runway 2 North is temporarily closed for surface resurfacing.
- gate reassignment /ɡeɪt ˌriː.əˈsaɪn.mənt/ (n): sự phân công lại cửa khởi hành. E.g., Gate reassignments will be displayed on flight information monitors.
- tarmac /ˈtɑːr.mæk/ (n): đường lăn, khu vực bãi đỗ máy bay. E.g., Ground vehicles must observe strict speed limits on the tarmac.
- feasibility /ˌfiː.zəˈbɪl.ə.t̬i/ (n): tính khả thi của dự án. E.g., Engineers conducted a detailed feasibility study before construction.

# TRANSCRIPT
[00:00.00] Attention airport passengers and airline personnel, this is an operational announcement from Terminal Administration.
:: Việt: Xin chú ý các hành khách tại sân bay và nhân viên hãng hàng không, đây là thông báo vận hành từ Ban Quản lý Nhà ga.

[00:05.30] Runway 2 North will be temporarily closed for scheduled asphalt resurfacing starting midnight tonight until 5 AM tomorrow.
:: Việt: Đường băng 2 Phía Bắc sẽ tạm thời đóng cửa để trải lại mặt đường nhựa theo kế hoạch bắt đầu từ nửa đêm nay cho đến 5 giờ sáng mai.

[00:10.80] During this maintenance window, all departing and arriving flights will be rerouted through Runway 1 South.
:: Việt: Trong khung thời gian bảo trì này, tất cả các chuyến bay cất cánh và hạ cánh sẽ được chuyển hướng qua Đường băng 1 Phía Nam.

[00:16.10] Passengers should check flight information display screens frequently for potential gate reassignment notices.
:: Việt: Hành khách nên kiểm tra màn hình hiển thị thông tin chuyến bay thường xuyên để biết các thông báo phân công lại cửa khởi hành nếu có.

# QUIZ
Q1: When will Runway 2 North be closed for resurfacing?
* [ ] From 8 AM until 12 PM today
* [ ] All day Saturday
* [ ] Next Monday evening
* [x] Starting midnight tonight until 5 AM tomorrow
-- Explanation: The duty manager states: "starting midnight tonight until 5 AM tomorrow."

Q2: What are passengers advised to check for potential gate reassignment notices?
* [x] Flight information display screens
* [ ] Their printed paper tickets
* [ ] Social media announcements
* [ ] Baggage claim claim tags
-- Explanation: The transcript explicitly states: "Passengers should check flight information display screens frequently."

Q3: What condition is expected during the scheduled period?
* [ ] All operations will cease completely
* [x] All departing and arriving flights will be rerouted through Runway 1 South
* [ ] All staff members will be relocated
* [ ] Power will be cut off across the campus
-- Explanation: The announcement notes: "During this maintenance window, all departing and arriving flights will be rerouted through Runway 1 South.".`;

export const LESSON_Q3_096_MD = `---
id: listen_toeic_q3_096
title: "Video Game Development & Closed Beta Testing"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Software", "Gaming", "Beta Testing"]
---

# VOCABULARY
- beta testing /ˈbeɪ.t̬ə ˈtest.ɪŋ/ (n): việc thử nghiệm bản Beta. E.g., Closed beta testing helps developers identify gameplay bugs before official release.
- frame rate /freɪm reɪt/ (n): tốc độ khung hình (fps). E.g., Optimization tweaks improved frame rate performance on mobile devices.
- server capacity /ˈsɝː.vɚ kəˈpæs.ə.t̬i/ (n): sức chứa/sức chịu tải của máy chủ. E.g., Scaling server capacity prevents crash issues during peak player logins.
- delegation /ˌdel.əˈɡeɪ.ʃən/ (n): sự phân công, ủy thác trách nhiệm. E.g., Effective managerial delegation empowers team leaders.

# TRANSCRIPT
[00:00.00] Hello gaming community, I am thrilled to announce an exciting update regarding our upcoming multiplayer title, Cyber Realm.
:: Việt: Xin chào cộng đồng game thủ, tôi rất vui mừng được thông báo một thông tin cập nhật thú vị liên quan đến tựa game nhiều người chơi sắp tới của chúng tôi, Cyber Realm.

[00:05.30] Registration for our closed beta testing phase is now officially open on our community web portal starting today.
:: Việt: Việc đăng ký cho giai đoạn thử nghiệm closed beta của chúng tôi hiện đã chính thức mở trên cổng thông tin điện tử cộng đồng bắt đầu từ hôm nay.

[00:10.80] Ten thousand selected testers will be granted early access next Friday to help us stress-test our multiplayer server capacity.
:: Việt: 10.000 người thử nghiệm được chọn sẽ được trao quyền truy cập sớm vào Thứ Sáu tuần tới để giúp chúng tôi kiểm tra sức chịu tải của máy chủ nhiều người chơi.

[00:16.10] Testers who submit detailed bug reports will earn an exclusive in-game cosmetic item upon official release.
:: Việt: Những người thử nghiệm gửi báo cáo lỗi chi tiết sẽ nhận được một vật phẩm trang trí độc quyền trong game khi ra mắt chính thức.

# QUIZ
Q1: How many selected testers will be granted early access to closed beta testing next Friday?
* [ ] 1,000
* [ ] 5,000
* [x] 10,000
* [ ] 50,000
-- Explanation: The development lead states: "Ten thousand selected testers will be granted early access."

Q2: What reward will testers receive if they submit detailed bug reports?
* [ ] A cash prize refund
* [ ] A free gaming console headset
* [ ] VIP access to the development office
* [x] An exclusive in-game cosmetic item upon official release
-- Explanation: The transcript explicitly states: "will earn an exclusive in-game cosmetic item upon official release."

Q3: What is the primary topic or announcement introduced by the speaker?
* [x] Video Game Development & Closed Beta Testing
* [ ] Annual dividend payouts for shareholders
* [ ] A full recall of previous product versions
* [ ] A company-wide staff downsizing initiative
-- Explanation: The speaker introduces the topic: "Hello gaming community, I am thrilled to announce an exciting update regarding our upcoming multiplayer title, Cyber Realm.".`;

export const LESSON_Q3_097_MD = `---
id: listen_toeic_q3_097
title: "Electronics Retail Store Extended Warranty Policy"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Retail", "Electronics", "Warranty"]
---

# VOCABULARY
- coverage /ˈkʌv.ɚ.ɪdʒ/ (n): phạm vi bảo hành. E.g., The extended warranty coverage includes accidental screen damage.
- replacement /rɪˈpleɪs.mənt/ (n): sản phẩm thay thế. E.g., Unrepairable devices qualify for an immediate store replacement.
- malfunction /ˌmælˈfʌŋk.ʃən/ (n, v): sự trục trặc, hỏng hóc. E.g., Technical malfunctions will be repaired free of charge under warranty.
- contingency /kənˈtɪn.dʒən.si/ (n): tình huống dự phòng rủi ro. E.g., The project budget incorporates a ten-percent contingency fund.

# TRANSCRIPT
[00:00.00] Attention shoppers, welcome to the customer service counter at Megatech Electronics.
:: Việt: Xin chú ý quý khách hàng, chào mừng quý vị đến với quầy dịch vụ khách hàng tại Megatech Electronics.

[00:05.30] We are pleased to introduce our updated extended warranty protection plan for all home appliances and laptops.
:: Việt: Chúng tôi rất vui mừng giới thiệu chương trình bảo vệ bảo hành mở rộng đã được cập nhật cho tất cả các thiết bị gia dụng và máy tính xách tay.

[00:10.80] Customers who sign up for the three-year plan will receive free annual hardware checkups and priority repair service.
:: Việt: Khách hàng đăng ký gói 3 năm sẽ nhận được các đợt kiểm tra phần cứng hàng năm miễn phí và dịch vụ sửa chữa ưu tiên.

[00:16.10] If a defective product cannot be fixed within forty-eight hours, an immediate store replacement will be provided.
:: Việt: Nếu một sản phẩm bị lỗi không thể sửa chữa trong vòng 48 giờ, một sản phẩm thay thế tại cửa hàng sẽ được cung cấp ngay lập tức.

# QUIZ
Q1: What benefit is offered to customers who sign up for the three-year extended warranty plan?
* [ ] A 20% cash rebate
* [x] Free annual hardware checkups and priority repair service
* [ ] Free trade-in upgrades every year
* [ ] Complimentary home delivery
-- Explanation: The manager specifies that customers "will receive free annual hardware checkups and priority repair service."

Q2: What happens if a defective product cannot be fixed within 48 hours?
* [ ] The repair fee is doubled
* [ ] The warranty plan is canceled automatically
* [x] An immediate store replacement will be provided
* [ ] A gift card will be issued by email
-- Explanation: The transcript explicitly states: "an immediate store replacement will be provided."

Q3: What will eligible participants or recipients receive?
* [ ] A fully funded international holiday
* [ ] An immediate promotion to department head
* [ ] A complimentary ticket to next year's summit
* [x] Free annual hardware checkups and priority repair service
-- Explanation: The speaker confirms: "Customers who sign up for the three-year plan will receive free annual hardware checkups and priority repair service.".`;

export const LESSON_Q3_098_MD = `---
id: listen_toeic_q3_098
title: "Organic Agriculture Farm Certification Audit"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Agriculture", "Organic", "Certification"]
---

# VOCABULARY
- pesticide /ˈpes.tə.saɪd/ (n): thuốc trừ sâu. E.g., Organic farming standards prohibit synthetic chemical pesticides.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ tiêu chuẩn. E.g., Soil testing verified full compliance with national organic criteria.
- certification /ˌsɝː.t̬ə.fəˈkeɪ.ʃən/ (n): sự chứng nhận. E.g., Receiving official organic certification opens access to premium export markets.
- milestone /ˈmaɪl.stoʊn/ (n): cột mốc quan trọng. E.g., Completing the beta phase marks a critical project milestone.

# TRANSCRIPT
[00:00.00] Good morning regional growers, this is a announcement from the Department of Organic Standards and Compliance.
:: Việt: Chào buổi sáng các người trồng trọt trong khu vực, đây là thông báo từ Cục Tiêu chuẩn và Tuân thủ Hữu cơ.

[00:05.30] Annual soil and crop inspections for farms applying for organic renewal will take place throughout next month.
:: Việt: Các cuộc kiểm tra đất và cây trồng hàng năm cho các trang trại nộp đơn xin gia hạn chứng nhận hữu cơ sẽ diễn ra trong suốt tháng tới.

[00:10.80] Certified inspectors will verify that all crop fields have remained completely free of prohibited synthetic chemicals for three years.
:: Việt: Các thanh tra viên được chứng nhận sẽ xác minh rằng tất cả các cánh đồng trồng trọt đã hoàn toàn không sử dụng hóa chất tổng hợp bị cấm trong ba năm.

[00:16.10] Growers who pass the inspection audit will receive their official organic certificate renewal before October 31st.
:: Việt: Những người trồng trọt vượt qua kỳ kiểm tra sẽ nhận được giấy gia hạn chứng nhận hữu cơ chính thức trước ngày 31 tháng 10.

# QUIZ
Q1: For how many years must crop fields remain free of synthetic chemicals to qualify for organic renewal?
* [x] Three years
* [ ] One year
* [ ] Two years
* [ ] Five years
-- Explanation: The director specifies that fields must have "remained completely free of prohibited synthetic chemicals for three years."

Q2: When will growers who pass the inspection receive their certificate renewal?
* [ ] Before the end of this week
* [x] Before October 31st
* [ ] By mid-September
* [ ] By early next year
-- Explanation: The transcript explicitly states: "will receive their official organic certificate renewal before October 31st."

Q3: What will happen according to the speaker?
* [ ] All operations will be halted permanently
* [ ] The budget will be reduced by fifty percent
* [x] Verify that all crop fields have remained completely free of prohibited synthetic chemicals for three years
* [ ] The leadership team will be replaced
-- Explanation: The speaker notes: "Certified inspectors will verify that all crop fields have remained completely free of prohibited synthetic chemicals for three years.".`;

export const LESSON_Q3_099_MD = `---
id: listen_toeic_q3_099
title: "Intermodal Freight Transport & Railway Terminal Scheduling"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Logistics", "Transport", "Freight"]
---

# VOCABULARY
- intermodal /ˌɪn.t̬ɚˈmoʊ.dəl/ (adj): vận tải đa phương thức. E.g., Intermodal freight shipping reduces overall transport costs and transit time.
- transfer /trænsˈfɝː/ (v, n): sự trung chuyển hàng hóa. E.g., Container transfer from ship to rail takes approximately two hours.
- yard /jɑːrd/ (n): bãi chứa/ga đỗ container. E.g., Containers are organized by destination in the central railway yard.
- benchmark /ˈbentʃ.mɑːrk/ (n): tiêu chuẩn đánh giá, mốc chuẩn so sánh. E.g., The quarterly report sets a new performance benchmark for the industry.

# TRANSCRIPT
[00:00.00] Attention shipping clients, this is an update from Pacific Rail and Intermodal Logistics Services.
:: Việt: Xin chú ý các khách hàng gửi hàng, đây là thông báo cập nhật từ Dịch vụ Logistics Đa phương thức và Đường sắt Thái Bình Dương.

[00:05.30] Our expanded intermodal transfer terminal at Berth 5 is now fully operational for sea-to-rail cargo transfers.
:: Việt: Bến trung chuyển đa phương thức mở rộng của chúng tôi tại Bến 5 hiện đã đi vào hoạt động hoàn toàn cho việc chuyển giao hàng hóa từ đường biển sang đường sắt.

[00:10.80] Automated gantry cranes now transfer shipping containers directly from cargo vessels onto freight trains in under ninety minutes.
:: Việt: Cần cẩu giàn tự động giờ đây chuyển các container hàng trực tiếp từ tàu chở hàng lên tàu hỏa chở hàng trong chưa đầy 90 phút.

[00:16.10] This seamless intermodal route cuts total transit time to inland distribution hubs by two full business days.
:: Việt: Tuyến đường đa phương thức liền mạch này giúp cắt giảm tổng thời gian di chuyển đến các trung tâm phân phối nội địa đi hai ngày làm việc trọn vẹn.

# QUIZ
Q1: How quickly can automated gantry cranes transfer containers from ships to freight trains at Berth 5?
* [ ] In under 30 minutes
* [ ] In under 60 minutes
* [ ] In under three hours
* [x] In under 90 minutes
-- Explanation: The operations manager states: "transfer shipping containers directly... in under ninety minutes."

Q2: By how much does the new intermodal route reduce transit time to inland distribution hubs?
* [x] By two full business days
* [ ] By 12 hours
* [ ] By one business day
* [ ] By one full week
-- Explanation: The transcript explicitly states: "cuts total transit time to inland distribution hubs by two full business days."

Q3: What key detail does the speaker emphasize?
* [ ] An indefinite postponement of all projects
* [x] Automated gantry cranes now transfer shipping containers directly from cargo vessels onto freight trains in under ninety minutes
* [ ] A comprehensive audit by external tax authorities
* [ ] A mandatory weekend shift for all personnel
-- Explanation: The speaker emphasizes: "Automated gantry cranes now transfer shipping containers directly from cargo vessels onto freight trains in under ninety minutes.".`;

export const LESSON_Q3_100_MD = `---
id: listen_toeic_q3_100
title: "Corporate Legal Contract Review & Nondisclosure Agreements"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Legal", "Corporate", "Contract"]
---

# VOCABULARY
- Nondisclosure Agreement (NDA) /ˌnɑːn.dɪˈskloʊ.ʒɚ əˈɡriː.mənt/ (n): thỏa thuận bảo mật thông tin. E.g., External contractors must sign a binding nondisclosure agreement before starting work.
- confidentiality /ˌkɑːn.fə.den.ʃiˈæl.ə.t̬i/ (n): tính bảo mật. E.g., Maintaining client confidentiality is mandatory for all legal counsel.
- clause /klɑːz/ (n): điều khoản hợp đồng. E.g., The legal team inserted a dispute resolution clause into the agreement.
- workflow /ˈwɝːk.floʊ/ (n): quy trình làm việc. E.g., Automating administrative tasks optimizes team workflow.

# TRANSCRIPT
[00:00.00] Good morning department managers, this is a legal compliance reminder regarding corporate partnership contracts.
:: Việt: Chào buổi sáng các quản lý phòng ban, đây là nhắc nhở tuân thủ pháp lý liên quan đến các hợp đồng đối tác doanh nghiệp.

[00:05.30] All third-party vendors and external consultants must execute a standard mutual Nondisclosure Agreement before receiving proprietary project data.
:: Việt: Tất cả các nhà cung cấp bên thứ ba và cố vấn bên ngoài phải ký một Thỏa thuận Bảo mật Thông tin song phương tiêu chuẩn trước khi nhận dữ liệu dự án độc quyền.

[00:10.80] Standard approved NDA templates are readily downloadable from the internal corporate legal portal.
:: Việt: Các mẫu NDA tiêu chuẩn đã được phê duyệt có thể dễ dàng tải xuống từ cổng thông tin pháp lý doanh nghiệp nội bộ.

[00:16.10] Any customized contract modifications must be submitted to our legal counsel team at least three business days prior to signing.
:: Việt: Bất kỳ sự sửa đổi hợp đồng tùy chỉnh nào cũng phải được nộp cho đội ngũ cố vấn pháp lý của chúng tôi ít nhất ba ngày làm việc trước khi ký.

# QUIZ
Q1: What document must third-party vendors sign before receiving proprietary project data?
* [ ] A commercial credit application
* [ ] A equipment purchase agreement
* [x] A standard mutual Nondisclosure Agreement (NDA)
* [ ] A site access security clearance form
-- Explanation: The legal counsel specifies that vendors "must execute a standard mutual Nondisclosure Agreement."

Q2: How far in advance must customized contract modifications be submitted to the legal team?
* [ ] At least 24 hours
* [ ] At least two business days
* [ ] At least one week
* [x] At least three business days
-- Explanation: The transcript explicitly states: "must be submitted to our legal counsel team at least three business days prior to signing."

Q3: Where or how can relevant resources be accessed?
* [x] Through the internal corporate legal portal
* [ ] In a printed brochure at the front desk
* [ ] Through an encrypted external flash drive
* [ ] By mailing a formal letter to headquarters
-- Explanation: The speaker mentions: "Standard approved NDA templates are readily downloadable from the internal corporate legal portal.".`;

export const LESSON_Q3_101_MD = `---
id: listen_toeic_q3_101
title: "Hotel Housekeeping Quality Audit & Room Inspections"
audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
level: "Intermediate"
duration: "00:23"
category: "TOEIC Part 4"
tags: ["Hospitality", "Hotel", "Housekeeping"]
---

# VOCABULARY
- housekeeping /ˈhaʊsˌkiː.pɪŋ/ (n): bộ phận buồng phòng. E.g., The housekeeping team cleans and inspects over two hundred guest rooms daily.
- turn-down service /ˈtɝːn.daʊn ˈsɝː.vɪs/ (n): dịch vụ dọn dẹp phòng buổi tối. E.g., VIP suites receive complimentary evening turn-down service.
- sanitation /ˌsæn.əˈteɪ.ʃən/ (n): sự vệ sinh, khử trùng. E.g., High-touch bathroom surfaces undergo strict sanitation procedures.
- compliance /kəmˈplaɪ.əns/ (n): sự tuân thủ quy chuẩn pháp lý. E.g., All departments must ensure strict regulatory compliance.

# TRANSCRIPT
[00:00.00] Good morning housekeeping staff, here is our operational brief for today's high-occupancy checkout schedule.
:: Việt: Chào buổi sáng nhân viên buồng phòng, đây là điểm tin vận hành cho lịch trả phòng mật độ cao ngày hôm nay.

[00:05.30] We have over one hundred and fifty guest checkouts scheduled, and all rooms must be sanitized and restocked before 2 PM check-in.
:: Việt: Chúng ta có hơn 150 lượt trả phòng được lên lịch, và tất cả các phòng phải được khử trùng và bổ sung đồ dùng trước giờ nhận phòng 2 giờ chiều.

[00:10.80] Floor supervisors will conduct random quality inspections across all floors to ensure international cleanliness standards.
:: Việt: Các giám sát viên tầng sẽ tiến hành kiểm tra chất lượng ngẫu nhiên trên tất cả các tầng để đảm bảo các tiêu chuẩn vệ sinh quốc tế.

[00:16.10] Housekeeping attendants who achieve a top rating this week will receive a fifty dollar performance voucher.
:: Việt: Nhân viên buồng phòng đạt được đánh giá hàng đầu trong tuần này sẽ nhận được một phiếu quà tặng hiệu năng 50 đô la.

# QUIZ
Q1: By what time must all guest rooms be sanitized and restocked for check-in?
* [ ] By 11 AM
* [x] Before 2 PM check-in
* [ ] By 12 PM
* [ ] By 4 PM
-- Explanation: The executive housekeeper specifies that "all rooms must be sanitized and restocked before 2 PM check-in."

Q2: Who will conduct random quality inspections across all floors?
* [ ] Front desk managers
* [ ] Hotel guests
* [x] Floor supervisors
* [ ] External health auditors
-- Explanation: The transcript explicitly mentions: "Floor supervisors will conduct random quality inspections across all floors."

Q3: What will eligible participants or recipients receive?
* [ ] A fully funded international holiday
* [ ] An immediate promotion to department head
* [ ] A complimentary ticket to next year's summit
* [x] A fifty dollar performance voucher
-- Explanation: The speaker confirms: "Housekeeping attendants who achieve a top rating this week will receive a fifty dollar performance voucher.".`;

const RAW_LESSONS_DATA: ListeningLesson[] = [
  ...CURATED_LEVEL_LESSONS,
  parseListeningMarkdown(LESSON_1_MD),
  parseListeningMarkdown(LESSON_2_MD),
  parseListeningMarkdown(LESSON_3_MD),
  parseListeningMarkdown(LESSON_Q3_MD),
  parseListeningMarkdown(LESSON_Q3_002_MD),
  parseListeningMarkdown(LESSON_Q3_003_MD),
  parseListeningMarkdown(LESSON_Q3_004_MD),
  parseListeningMarkdown(LESSON_Q3_005_MD),
  parseListeningMarkdown(LESSON_Q3_006_MD),
  parseListeningMarkdown(LESSON_Q3_007_MD),
  parseListeningMarkdown(LESSON_Q3_008_MD),
  parseListeningMarkdown(LESSON_Q3_009_MD),
  parseListeningMarkdown(LESSON_Q3_010_MD),
  parseListeningMarkdown(LESSON_Q3_011_MD),
  parseListeningMarkdown(LESSON_Q3_012_MD),
  parseListeningMarkdown(LESSON_Q3_013_MD),
  parseListeningMarkdown(LESSON_Q3_014_MD),
  parseListeningMarkdown(LESSON_Q3_015_MD),
  parseListeningMarkdown(LESSON_Q3_016_MD),
  parseListeningMarkdown(LESSON_Q3_017_MD),
  parseListeningMarkdown(LESSON_Q3_018_MD),
  parseListeningMarkdown(LESSON_Q3_019_MD),
  parseListeningMarkdown(LESSON_Q3_020_MD),
  parseListeningMarkdown(LESSON_Q3_021_MD),
  parseListeningMarkdown(LESSON_Q3_022_MD),
  parseListeningMarkdown(LESSON_Q3_023_MD),
  parseListeningMarkdown(LESSON_Q3_024_MD),
  parseListeningMarkdown(LESSON_Q3_025_MD),
  parseListeningMarkdown(LESSON_Q3_026_MD),
  parseListeningMarkdown(LESSON_Q3_027_MD),
  parseListeningMarkdown(LESSON_Q3_028_MD),
  parseListeningMarkdown(LESSON_Q3_029_MD),
  parseListeningMarkdown(LESSON_Q3_030_MD),
  parseListeningMarkdown(LESSON_Q3_031_MD),
  parseListeningMarkdown(LESSON_Q3_032_MD),
  parseListeningMarkdown(LESSON_Q3_033_MD),
  parseListeningMarkdown(LESSON_Q3_034_MD),
  parseListeningMarkdown(LESSON_Q3_035_MD),
  parseListeningMarkdown(LESSON_Q3_036_MD),
  parseListeningMarkdown(LESSON_Q3_037_MD),
  parseListeningMarkdown(LESSON_Q3_038_MD),
  parseListeningMarkdown(LESSON_Q3_039_MD),
  parseListeningMarkdown(LESSON_Q3_040_MD),
  parseListeningMarkdown(LESSON_Q3_041_MD),
  parseListeningMarkdown(LESSON_Q3_042_MD),
  parseListeningMarkdown(LESSON_Q3_043_MD),
  parseListeningMarkdown(LESSON_Q3_044_MD),
  parseListeningMarkdown(LESSON_Q3_045_MD),
  parseListeningMarkdown(LESSON_Q3_046_MD),
  parseListeningMarkdown(LESSON_Q3_047_MD),
  parseListeningMarkdown(LESSON_Q3_048_MD),
  parseListeningMarkdown(LESSON_Q3_049_MD),
  parseListeningMarkdown(LESSON_Q3_050_MD),
  parseListeningMarkdown(LESSON_Q3_051_MD),
  parseListeningMarkdown(LESSON_Q3_052_MD),
  parseListeningMarkdown(LESSON_Q3_053_MD),
  parseListeningMarkdown(LESSON_Q3_054_MD),
  parseListeningMarkdown(LESSON_Q3_055_MD),
  parseListeningMarkdown(LESSON_Q3_056_MD),
  parseListeningMarkdown(LESSON_Q3_057_MD),
  parseListeningMarkdown(LESSON_Q3_058_MD),
  parseListeningMarkdown(LESSON_Q3_059_MD),
  parseListeningMarkdown(LESSON_Q3_060_MD),
  parseListeningMarkdown(LESSON_Q3_061_MD),
  parseListeningMarkdown(LESSON_Q3_062_MD),
  parseListeningMarkdown(LESSON_Q3_063_MD),
  parseListeningMarkdown(LESSON_Q3_064_MD),
  parseListeningMarkdown(LESSON_Q3_065_MD),
  parseListeningMarkdown(LESSON_Q3_066_MD),
  parseListeningMarkdown(LESSON_Q3_067_MD),
  parseListeningMarkdown(LESSON_Q3_068_MD),
  parseListeningMarkdown(LESSON_Q3_069_MD),
  parseListeningMarkdown(LESSON_Q3_070_MD),
  parseListeningMarkdown(LESSON_Q3_071_MD),
  parseListeningMarkdown(LESSON_Q3_072_MD),
  parseListeningMarkdown(LESSON_Q3_073_MD),
  parseListeningMarkdown(LESSON_Q3_074_MD),
  parseListeningMarkdown(LESSON_Q3_075_MD),
  parseListeningMarkdown(LESSON_Q3_076_MD),
  parseListeningMarkdown(LESSON_Q3_077_MD),
  parseListeningMarkdown(LESSON_Q3_078_MD),
  parseListeningMarkdown(LESSON_Q3_079_MD),
  parseListeningMarkdown(LESSON_Q3_080_MD),
  parseListeningMarkdown(LESSON_Q3_081_MD),
  parseListeningMarkdown(LESSON_Q3_082_MD),
  parseListeningMarkdown(LESSON_Q3_083_MD),
  parseListeningMarkdown(LESSON_Q3_084_MD),
  parseListeningMarkdown(LESSON_Q3_085_MD),
  parseListeningMarkdown(LESSON_Q3_086_MD),
  parseListeningMarkdown(LESSON_Q3_087_MD),
  parseListeningMarkdown(LESSON_Q3_088_MD),
  parseListeningMarkdown(LESSON_Q3_089_MD),
  parseListeningMarkdown(LESSON_Q3_090_MD),
  parseListeningMarkdown(LESSON_Q3_091_MD),
  parseListeningMarkdown(LESSON_Q3_092_MD),
  parseListeningMarkdown(LESSON_Q3_093_MD),
  parseListeningMarkdown(LESSON_Q3_094_MD),
  parseListeningMarkdown(LESSON_Q3_095_MD),
  parseListeningMarkdown(LESSON_Q3_096_MD),
  parseListeningMarkdown(LESSON_Q3_097_MD),
  parseListeningMarkdown(LESSON_Q3_098_MD),
  parseListeningMarkdown(LESSON_Q3_099_MD),
  parseListeningMarkdown(LESSON_Q3_100_MD),
  parseListeningMarkdown(LESSON_Q3_101_MD),
  ...EXTENDED_SHADOWING_LESSONS,
];

export const MOCK_LESSONS_DATA: ListeningLesson[] = ensureExtendedLessons(RAW_LESSONS_DATA);

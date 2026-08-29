import { ExamPaper, ExamQuestion } from "./types";

export const ieltsGeneral4k01Paper: ExamPaper = {
  id: "ielts_general_4k_01",
  title: "IELTS General Training Official Test #01",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 175,
  totalQuestions: 85,
  maxScore: 9.0,
  description: "Bộ đề thi IELTS General Training #01 chuẩn quốc tế cho định cư và việc làm: 40 câu Listening, 40 câu Reading đời sống/nơi làm việc, Speaking AI 3 Part và 2 Writing Tasks (Viết thư & Bài luận xã hội).",
  categoryBadge: "IELTS General",
  tags: ["IELTS", "General Training", "Migration", "Work Visa", "Cambridge Standard"],
  supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // SECTION 1: Apartment Rental & Utility Registration in Vancouver (Q1 - Q10)
    const sec1Script =
      "Property Manager: Good morning, Pacific Crest Residential Management. My name is Arthur. How can I help you today?\n" +
      "Tenant: Hello! I am calling to finalize the lease agreement for the two-bedroom apartment at 742 Maplewood Avenue, Vancouver.\n" +
      "Property Manager: Excellent! Let me pull up your tenant application file. Could you confirm your full legal name?\n" +
      "Tenant: Yes, my name is Rachel Zimmerman.\n" +
      "Property Manager: Thank you, Ms. Zimmerman. And your current Canadian mobile contact number?\n" +
      "Tenant: It is +1 604 555 8291.\n" +
      "Property Manager: Perfect. The standard residential tenancy begins on November 1st for a mandatory twelve-month fixed-term lease.\n" +
      "Tenant: What is the exact monthly rental amount and what utilities are included in the rate?\n" +
      "Property Manager: The monthly rent is 2,450 Canadian dollars. This includes geothermal central heating, hot water, and municipal garbage collection. Electricity and high-speed fiber internet are billed separately.\n" +
      "Tenant: Is there an underground parking space available for an electric vehicle?\n" +
      "Property Manager: Yes, assigned parking stall number 48 in basement level 2 is equipped with an EV Level-2 charging station for an additional 75 dollars per month.\n" +
      "Tenant: How much is the security damage deposit, and when is it payable?\n" +
      "Property Manager: The security deposit is exactly half of one month's rent, which is 1,225 dollars, payable via certified bank transfer upon lease signing.\n" +
      "Tenant: When can we conduct the mandatory move-in condition inspection walk-through?\n" +
      "Property Manager: We have scheduled the move-in inspection for Friday, October 31st at 10:30 AM at the building lobby.";

    const sec1Questions = [
      { q: "What is the tenant applicant's full legal name?", opts: [{ key: "A", text: "Rebecca Stewart" }, { key: "B", text: "Rachel Zimmerman" }, { key: "C", text: "Samantha Miller" }, { key: "D", text: "Patricia Adams" }], a: "B", exp: "Họ tên người thuê: 'My name is Rachel Zimmerman'." },
      { q: "What is the street address of the rental apartment?", opts: [{ key: "A", text: "120 Pacific Boulevard" }, { key: "B", text: "88 Granville Street" }, { key: "C", text: "742 Maplewood Avenue, Vancouver" }, { key: "D", text: "505 Robson Court" }], a: "C", exp: "Địa chỉ căn hộ: '742 Maplewood Avenue, Vancouver'." },
      { q: "What is Rachel's contact telephone number?", opts: [{ key: "A", text: "+1 604 555 3104" }, { key: "B", text: "+1 604 555 9920" }, { key: "C", text: "+1 604 555 1177" }, { key: "D", text: "+1 604 555 8291" }], a: "D", exp: "Số điện thoại liên hệ: '+1 604 555 8291'." },
      { q: "When does the 12-month fixed-term lease start?", opts: [{ key: "A", text: "November 1st" }, { key: "B", text: "October 1st" }, { key: "C", text: "December 15th" }, { key: "D", text: "January 1st" }], a: "A", exp: "Ngày bắt đầu hợp đồng thuê: 'tenancy begins on November 1st'." },
      { q: "What is the monthly rental fee for the two-bedroom apartment?", opts: [{ key: "A", text: "1,800 CAD" }, { key: "B", text: "2,450 Canadian dollars" }, { key: "C", text: "3,000 CAD" }, { key: "D", text: "3,500 CAD" }], a: "B", exp: "Giá thuê hàng tháng: 'monthly rent is 2,450 Canadian dollars'." },
      { q: "Which utility is NOT included in the base monthly rent?", opts: [{ key: "A", text: "Hot water" }, { key: "B", text: "Geothermal central heating" }, { key: "C", text: "Electricity and high-speed fiber internet" }, { key: "D", text: "Municipal garbage collection" }], a: "C", exp: "Tiện ích không bao gồm: 'Electricity and high-speed fiber internet are billed separately'." },
      { q: "What parking stall number is assigned to the apartment?", opts: [{ key: "A", text: "Stall number 12" }, { key: "B", text: "Stall number 99" }, { key: "C", text: "Stall number 105" }, { key: "D", text: "Stall number 48 in basement level 2" }], a: "D", exp: "Vị trí đỗ xe: 'assigned parking stall number 48 in basement level 2'." },
      { q: "What is the additional monthly charge for the EV charging parking space?", opts: [{ key: "A", text: "75 dollars per month" }, { key: "B", text: "25 dollars" }, { key: "C", text: "50 dollars" }, { key: "D", text: "120 dollars" }], a: "A", exp: "Phí đỗ xe sạc điện: 'for an additional 75 dollars per month'." },
      { q: "How much is the required security damage deposit?", opts: [{ key: "A", text: "500 dollars" }, { key: "B", text: "1,225 dollars (half of one month's rent)" }, { key: "C", text: "2,450 dollars" }, { key: "D", text: "3,000 dollars" }], a: "B", exp: "Tiền cọc an ninh: 'exactly half of one month's rent, which is 1,225 dollars'." },
      { q: "When is the move-in condition inspection scheduled?", opts: [{ key: "A", text: "Thursday afternoon at 2:00 PM" }, { key: "B", text: "Saturday morning at 8:00 AM" }, { key: "C", text: "Friday, October 31st at 10:30 AM" }, { key: "D", text: "Sunday at noon" }], a: "C", exp: "Thời gian kiểm tra nhận nhà: 'scheduled the move-in inspection for Friday, October 31st at 10:30 AM'." }
    ];

    sec1Questions.forEach((item, idx) => {
      qs.push({
        id: `ig4k1_q${idx + 1}`,
        partNumber: 1,
        partTitle: "Listening Section 1: Vancouver Apartment Tenancy Registration",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
        questionText: `Question ${idx + 1}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 2: Gold Coast Aquatic & Wellness Complex (Q11 - Q20)
    const sec2Script =
      "Coordinator: Welcome to the Gold Coast Aquatic & Rehabilitation Wellness Complex orientation. I am Martin Vance, member services director. Our newly renovated facility covers three distinct health zones. Zone 1 features our 50-meter Olympic heated lap pool and heated hydrotherapy pool maintained at a constant 34 degrees Celsius for joint recovery. Zone 2 houses our state-of-the-art cardiovascular gymnasium, equipped with pneumatic resistance machines and Olympic lifting platforms. Zone 3 contains our recovery spa suite, which offers infrared cedar saunas, cold plunge immersion baths at 10 degrees Celsius, and remedial sports massage treatment rooms. Gold Membership packages are priced at 85 Australian dollars per month with no lock-in contract, providing unlimited class access including clinical Pilates, aqua aerobics, and sunrise yoga on our oceanview terrace. Our creche child-care center operates Monday through Saturday from 8:00 AM to 1:00 PM for parents working out. Lockers in the main changing pavilion require a refundable 2-dollar coin or contactless digital wristband.";

    const sec2Questions = [
      { q: "What temperature is the heated hydrotherapy pool in Zone 1 maintained at?", opts: [{ key: "A", text: "25 degrees Celsius" }, { key: "B", text: "30 degrees Celsius" }, { key: "C", text: "40 degrees Celsius" }, { key: "D", text: "Constant 34 degrees Celsius" }], a: "D", exp: "Nhiệt độ bể thủy liệu: 'heated hydrotherapy pool maintained at a constant 34 degrees Celsius'." },
      { q: "What fitness equipment is highlighted in Gymnasium Zone 2?", opts: [{ key: "A", text: "Pneumatic resistance machines and Olympic lifting platforms" }, { key: "B", text: "Heavy wooden ropes only" }, { key: "C", text: "Rowing boats" }, { key: "D", text: "Boxing rings" }], a: "A", exp: "Thiết bị phòng tập: 'equipped with pneumatic resistance machines and Olympic lifting platforms'." },
      { q: "What temperature is the cold plunge immersion bath in Zone 3?", opts: [{ key: "A", text: "0 degrees Celsius" }, { key: "B", text: "10 degrees Celsius" }, { key: "C", text: "18 degrees Celsius" }, { key: "D", text: "22 degrees Celsius" }], a: "B", exp: "Nhiệt độ bồn ngâm lạnh: 'cold plunge immersion baths at 10 degrees Celsius'." },
      { q: "What is the monthly subscription price for the Gold Membership package?", opts: [{ key: "A", text: "45 AUD" }, { key: "B", text: "60 AUD" }, { key: "C", text: "85 Australian dollars per month" }, { key: "D", text: "120 AUD" }], a: "C", exp: "Giá gói hội viên Gold: 'priced at 85 Australian dollars per month with no lock-in contract'." },
      { q: "Where are sunrise yoga classes held in the complex?", opts: [{ key: "A", text: "In the basement cafeteria" }, { key: "B", text: "In the parking lot" }, { key: "C", text: "Inside the sauna" }, { key: "D", text: "On the oceanview terrace" }], a: "D", exp: "Địa điểm tập yoga đón bình minh: 'sunrise yoga on our oceanview terrace'." },
      { q: "What are the operating hours of the creche child-care facility?", opts: [{ key: "A", text: "Monday through Saturday from 8:00 AM to 1:00 PM" }, { key: "B", text: "Open 24 hours daily" }, { key: "C", text: "Sundays only from 9:00 AM to 5:00 PM" }, { key: "D", text: "Evenings from 6:00 PM to 9:00 PM" }], a: "A", exp: "Giờ hoạt động khu trông trẻ: 'Monday through Saturday from 8:00 AM to 1:00 PM'." },
      { q: "What is required to lock lockers in the changing pavilion?", opts: [{ key: "A", text: "A paper padlock" }, { key: "B", text: "A refundable 2-dollar coin or contactless digital wristband" }, { key: "C", text: "A physical key from reception only" }, { key: "D", text: "Biometric fingerprint scan only" }], a: "B", exp: "Cơ chế khóa tủ đồ: 'require a refundable 2-dollar coin or contactless digital wristband'." },
      { q: "What length is the main Olympic lap swimming pool?", opts: [{ key: "A", text: "25 meters" }, { key: "B", text: "100 meters" }, { key: "C", text: "50-meter Olympic heated lap pool" }, { key: "D", text: "15 meters" }], a: "C", exp: "Chiều dài hồ bơi Olympic: '50-meter Olympic heated lap pool'." },
      { q: "Which wellness therapy is available in the Zone 3 Spa Suite?", opts: [{ key: "A", text: "Dental cleaning" }, { key: "B", text: "Eye laser surgery" }, { key: "C", text: "Hair styling" }, { key: "D", text: "Infrared cedar saunas and remedial sports massage" }], a: "D", exp: "Dịch vụ spa hồi phục: 'infrared cedar saunas, cold plunge immersion baths... and remedial sports massage'." },
      { q: "Is there a long-term lock-in contract required for the Gold Membership?", opts: [{ key: "A", text: "No, there is no lock-in contract" }, { key: "B", text: "Yes, 24 months mandatory" }, { key: "C", text: "Yes, 12 months minimum" }, { key: "D", text: "Yes, 5-year commitment" }], a: "A", exp: "Điều khoản hợp đồng: 'with no lock-in contract'." }
    ];

    sec2Questions.forEach((item, idx) => {
      qs.push({
        id: `ig4k1_q${idx + 11}`,
        partNumber: 2,
        partTitle: "Listening Section 2: Gold Coast Aquatic Wellness Center",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
        questionText: `Question ${idx + 11}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 3: Cybersecurity Apprenticeship & Career Conversion (Q21 - Q30)
    const sec3Script =
      "Academic Advisor: Hello Marcus and Sophia. Let's discuss your industry apprenticeship practicum in enterprise cloud cybersecurity.\n" +
      "Marcus: Thank you, Dr. Henderson. Over the last eight weeks at Zenith Financial Cloud, we conducted vulnerability penetration tests against web application firewalls and configured multi-factor biometric authentication protocols.\n" +
      "Sophia: We also deployed automated security information and event management (SIEM) pipelines utilizing machine learning algorithms to detect distributed denial-of-service (DDoS) telemetry anomalies in real time.\n" +
      "Academic Advisor: Excellent technical immersion. How is your preparation progressing for the CompTIA Security+ and AWS Certified Security Specialty examinations?\n" +
      "Marcus: We scored 88 percent on our mock domain exam for cryptography and public key infrastructure (PKI), but we need to reinforce our review of zero-trust network access (ZTNA) frameworks.\n" +
      "Sophia: For our capstone portfolio project, we designed an incident response playbook that reduced hypothetical ransomware containment latency from 45 minutes down to 3.5 minutes.\n" +
      "Academic Advisor: Outstanding benchmark! Please submit your final industry internship report and code repository links by Thursday, December 4th.";

    const sec3Questions = [
      { q: "What company hosted the students' cybersecurity apprenticeship practicum?", opts: [{ key: "A", text: "Apex Motors" }, { key: "B", text: "Zenith Financial Cloud" }, { key: "C", text: "Nova Retail" }, { key: "D", text: "Global Airlines" }], a: "B", exp: "Đơn vị thực tập: 'eight weeks at Zenith Financial Cloud'." },
      { q: "What technical task did the students perform during the first phase of their internship?", opts: [{ key: "A", text: "Writing marketing blogs" }, { key: "B", text: "Assembling computer hardware" }, { key: "C", text: "Vulnerability penetration tests and configuring multi-factor biometric authentication" }, { key: "D", text: "Installing office printers" }], a: "C", exp: "Nhiệm vụ kỹ thuật: 'conducted vulnerability penetration tests against web application firewalls'." },
      { q: "What automated system did Sophia deploy to detect real-time cyber threats?", opts: [{ key: "A", text: "Email spam filters" }, { key: "B", text: "Manual spreadsheet logs" }, { key: "C", text: "Telephone answering bot" }, { key: "D", text: "Automated SIEM pipelines utilizing machine learning to detect DDoS anomalies" }], a: "D", exp: "Hệ thống tự động phát hiện mã độc: 'automated security information and event management (SIEM) pipelines'." },
      { q: "Which professional certification exam are the students preparing for?", opts: [{ key: "A", text: "CompTIA Security+ and AWS Certified Security Specialty" }, { key: "B", text: "Medical board certification" }, { key: "C", text: "Accounting CPA" }, { key: "D", text: "Real estate licensing" }], a: "A", exp: "Chứng chỉ nghề quốc tế: 'CompTIA Security+ and AWS Certified Security Specialty examinations'." },
      { q: "What score did the students achieve on their cryptography mock domain exam?", opts: [{ key: "A", text: "60 percent" }, { key: "B", text: "88 percent on our mock domain exam" }, { key: "C", text: "75 percent" }, { key: "D", text: "100 percent" }], a: "B", exp: "Điểm thi thử mật mã học: 'scored 88 percent on our mock domain exam for cryptography'." },
      { q: "Which network security topic requires additional review before the exam?", opts: [{ key: "A", text: "Basic mouse clicking" }, { key: "B", text: "Power cord installation" }, { key: "C", text: "Zero-trust network access (ZTNA) frameworks" }, { key: "D", text: "Monitor brightness settings" }], a: "C", exp: "Nội dung cần ôn tập thêm: 'reinforce our review of zero-trust network access (ZTNA) frameworks'." },
      { q: "To what duration did the capstone project reduce ransomware containment latency?", opts: [{ key: "A", text: "From 2 hours to 1 hour" }, { key: "B", text: "From 10 minutes to 8 minutes" }, { key: "C", text: "No reduction" }, { key: "D", text: "From 45 minutes down to 3.5 minutes" }], a: "D", exp: "Rút ngắn thời gian cô lập mã độc tống tiền: 'reduced hypothetical ransomware containment latency from 45 minutes down to 3.5 minutes'." },
      { q: "How long was the apprenticeship practicum placement?", opts: [{ key: "A", text: "Over the last eight weeks" }, { key: "B", text: "2 weeks" }, { key: "C", text: "6 months" }, { key: "D", text: "1 year" }], a: "A", exp: "Thời gian thực tập: 'Over the last eight weeks'." },
      { q: "What deliverable must students submit alongside their final report?", opts: [{ key: "A", text: "A physical textbook" }, { key: "B", text: "Code repository links" }, { key: "C", text: "A signed business contract" }, { key: "D", text: "A company badge" }], a: "B", exp: "Tài liệu nộp kèm: 'final industry internship report and code repository links'." },
      { q: "When is the final internship report due for submission?", opts: [{ key: "A", text: "November 15th" }, { key: "B", text: "January 10th" }, { key: "C", text: "Thursday, December 4th" }, { key: "D", text: "February 1st" }], a: "C", exp: "Hạn chót nộp báo cáo: 'by Thursday, December 4th'." }
    ];

    sec3Questions.forEach((item, idx) => {
      qs.push({
        id: `ig4k1_q${idx + 21}`,
        partNumber: 3,
        partTitle: "Listening Section 3: Cybersecurity Apprenticeship Seminar",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
        questionText: `Question ${idx + 21}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 4: University Lecture on Lighthouse Engineering & Navigation History (Q31 - Q40)
    const sec4Script =
      "Lecturer: Good morning, maritime history and engineering scholars. Today we examine the evolution of navigational lighthouse technology and coastal optical engineering. For millennia, mariners navigated hazardous shorelines relying upon rudimentary open-wood fires and coal braziers situated atop coastal headlands, which suffered from severe atmospheric attenuation during dense fog and sea storms. A monumental breakthrough occurred in 1822 when French physicist Augustin-Jean Fresnel invented the composite stepped Fresnel lens. By assembling concentric annular rings of prism-shaped glass around a central bullseye, Fresnel dramatically reduced lens mass and thickness while capturing oblique light rays and collimating them into parallel, high-intensity beams visible over twenty nautical miles across the oceanic horizon. Later, in the mid-nineteenth century, Scottish civil engineers Robert and Thomas Stevenson pioneered rock-tower construction techniques, interlocking heavy granite masonry blocks with dovetail joints to withstand thousands of tons of crashing wave hydrostatic impact at notorious ocean reefs such as Bell Rock and Skerryvore. In the modern era, traditional automated xenon flash lamps have been superseded by ultra-high-efficiency LED arrays and satellite-linked Automatic Identification Systems (AIS), preserving lighthouses as resilient physical aids to maritime navigation alongside space-based GPS.";

    const sec4Questions = [
      { q: "What was the main limitation of ancient wood and coal navigational fires?", opts: [{ key: "A", text: "They were too bright" }, { key: "B", text: "They frightened marine fish" }, { key: "C", text: "They attracted pirates" }, { key: "D", text: "Severe atmospheric attenuation during dense fog and sea storms" }], a: "D", exp: "Hạn chế của lửa đốt hở thời cổ: 'suffered from severe atmospheric attenuation during dense fog and sea storms'." },
      { q: "Who invented the composite stepped optical lens in 1822?", opts: [{ key: "A", text: "French physicist Augustin-Jean Fresnel" }, { key: "B", text: "Isaac Newton" }, { key: "C", text: "James Watt" }, { key: "D", text: "Thomas Edison" }], a: "A", exp: "Nhà phát minh thấu kính Fresnel: 'invented in 1822 by French physicist Augustin-Jean Fresnel'." },
      { q: "How did the Fresnel lens manipulate light to increase visibility range?", opts: [{ key: "A", text: "Colored the light green" }, { key: "B", text: "Collimated oblique light rays into parallel, high-intensity beams" }, { key: "C", text: "Stored light in battery capacitors" }, { key: "D", text: "Mirrored light back into the sea floor" }], a: "B", exp: "Nguyên lý hội tụ ánh sáng: 'capturing oblique light rays and collimating them into parallel, high-intensity beams'." },
      { q: "Over what distance were Fresnel lens lighthouse beams visible across the ocean?", opts: [{ key: "A", text: "2 nautical miles" }, { key: "B", text: "5 nautical miles" }, { key: "C", text: "Over twenty nautical miles across the oceanic horizon" }, { key: "D", text: "500 miles" }], a: "C", exp: "Tầm nhìn xa của đèn biển: 'visible over twenty nautical miles across the oceanic horizon'." },
      { q: "What masonry technique was pioneered by Scottish engineers Robert and Thomas Stevenson?", opts: [{ key: "A", text: "Clay brick stacking with mud mortar" }, { key: "B", text: "Welding steel plates" }, { key: "C", text: "Wooden scaffolding frames" }, { key: "D", text: "Interlocking heavy granite masonry blocks with dovetail joints" }], a: "D", exp: "Kỹ thuật xây tháp đá vượt sóng: 'interlocking heavy granite masonry blocks with dovetail joints'." },
      { q: "Which famous reef lighthouse towers were constructed using Stevenson masonry?", opts: [{ key: "A", text: "Bell Rock and Skerryvore" }, { key: "B", text: "Eiffel Tower and Big Ben" }, { key: "C", text: "Golden Gate and Brooklyn" }, { key: "D", text: "Alexandria and Rhodes" }], a: "A", exp: "Các ngọn hải đăng tiêu biểu: 'notorious ocean reefs such as Bell Rock and Skerryvore'." },
      { q: "What modern technology has largely superseded traditional xenon lamps in lighthouses?", opts: [{ key: "A", text: "Gas candles" }, { key: "B", text: "Ultra-high-efficiency LED arrays and satellite-linked AIS systems" }, { key: "C", text: "Laser beams exclusively" }, { key: "D", text: "Kerosene wicks" }], a: "B", exp: "Công nghệ đèn biển hiện đại: 'superseded by ultra-high-efficiency LED arrays and satellite-linked Automatic Identification Systems (AIS)'." },
      { q: "What geometric structure characterizes a Fresnel lens?", opts: [{ key: "A", text: "Flat solid glass disk" }, { key: "B", text: "Hollow metal sphere" }, { key: "C", text: "Concentric annular rings of prism-shaped glass around a central bullseye" }, { key: "D", text: "Square plastic mesh" }], a: "C", exp: "Cấu trúc thấu kính Fresnel: 'assembling concentric annular rings of prism-shaped glass around a central bullseye'." },
      { q: "What natural force were rock-tower lighthouses engineered to withstand?", opts: [{ key: "A", text: "Sandstorm erosion only" }, { key: "B", text: "Lightning strikes exclusively" }, { key: "C", text: "Volcanic ash fall" }, { key: "D", text: "Thousands of tons of crashing wave hydrostatic impact" }], a: "D", exp: "Khả năng chống chịu lực sóng: 'withstand thousands of tons of crashing wave hydrostatic impact'." },
      { q: "What is the status of physical lighthouses in the era of satellite GPS navigation?", opts: [{ key: "A", text: "Preserved as resilient physical aids to maritime navigation alongside GPS" }, { key: "B", text: "Completely demolished worldwide" }, { key: "C", text: "Turned into private hotels only" }, { key: "D", text: "Used only for weather forecasting" }], a: "A", exp: "Vai trò hiện tại của hải đăng: 'preserving lighthouses as resilient physical aids to maritime navigation alongside space-based GPS'." }
    ];

    sec4Questions.forEach((item, idx) => {
      qs.push({
        id: `ig4k1_q${idx + 31}`,
        partNumber: 4,
        partTitle: "Listening Section 4: Navigational Lighthouse Engineering",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
        questionText: `Question ${idx + 31}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // READING SECTION 1: Social Survival & Community Services (Q41 - Q53: 13 Questions)
    const readSec1 = `GENERAL TRAINING READING SECTION 1 — COMMUNITY SERVICES & URBAN TRANSPORTATION GUIDE\n\n[TEXT A: TORONTO TRANSIT COMMISSION (TTC) SMART-FARE & EXPRESS RAPID TRANSIT GUIDE]\nNavigating the Greater Toronto Area is streamlined through the PRESTO contactless smart-card ticketing network. Commuters can tap physical PRESTO cards, smartphones, or contactless credit cards at all subway turnstiles, streetcars, and suburban bus fare readers. A single adult fare of $3.35 grants unlimited transfers across subway, streetcar, and bus lines within a 2-hour window from initial tap-on. Frequent travelers can purchase monthly unlimited passes ($156.00 for adults, $128.15 for post-secondary students). Children aged 12 and under travel free. Rapid Bus Express (BRT) routes operating on dedicated center-lane transitways reduce rush-hour transit times by up to 35 percent. Bikes are permitted on subways during non-peak hours (prohibited on weekdays between 6:30 AM–9:30 AM and 3:30 PM–6:30 PM).\n\n[TEXT B: ONTARIO HEALTH INSURANCE PLAN (OHIP) & COMMUNITY DENTAL ACCESS PROGRAM]\nNew permanent residents and eligible work permit holders in Ontario are entitled to universal basic healthcare under OHIP. Coverage commences on the date of residency confirmation, eliminating the historical 3-month waiting period. OHIP covers family doctor appointments, specialist consultations with referral, emergency hospital room visits, diagnostic blood tests, and standard surgical procedures. Routine outpatient prescription drugs for youths under 25 are fully funded through the OHIP+ program. While routine adult dental cleaning is not covered under basic OHIP, the Canadian Dental Care Plan (CDCP) provides comprehensive dental subsidies covering scaling, cavity fillings, and annual X-rays for households with an adjusted net annual income under $90,000. Registration requires an active Social Insurance Number (SIN) and prior year tax return verification.`;

    const r1Questions = [
      { q: "What is the cost of a single adult transit fare on the Toronto PRESTO network?", opts: [{ key: "A", text: "$2.50" }, { key: "B", text: "$3.35 CAD" }, { key: "C", text: "$5.00" }, { key: "D", text: "$8.50" }], a: "B", exp: "Text A: 'A single adult fare of $3.35 grants unlimited transfers'." },
      { q: "What is the time duration of the unlimited transfer window on a single fare?", opts: [{ key: "A", text: "45 minutes" }, { key: "B", text: "60 minutes" }, { key: "C", text: "Within a 2-hour window from initial tap-on" }, { key: "D", text: "All day" }], a: "C", exp: "Text A: 'within a 2-hour window from initial tap-on'." },
      { q: "How much does a monthly unlimited pass cost for post-secondary students?", opts: [{ key: "A", text: "$99.00" }, { key: "B", text: "$156.00" }, { key: "C", text: "$200.00" }, { key: "D", text: "$128.15" }], a: "D", exp: "Text A: '$128.15 for post-secondary students'." },
      { q: "What is the transit fare for children aged 12 and under?", opts: [{ key: "A", text: "Children aged 12 and under travel free" }, { key: "B", text: "Half price" }, { key: "C", text: "$1.00 per ride" }, { key: "D", text: "$2.00 flat fee" }], a: "A", exp: "Text A: 'Children aged 12 and under travel free'." },
      { q: "During which weekday morning peak hours are bicycles prohibited on subways?", opts: [{ key: "A", text: "5:00 AM–7:00 AM" }, { key: "B", text: "Between 6:30 AM–9:30 AM" }, { key: "C", text: "10:00 AM–12:00 PM" }, { key: "D", text: "Bicycles are banned 24 hours daily" }], a: "B", exp: "Text A: 'prohibited on weekdays between 6:30 AM–9:30 AM and 3:30 PM–6:30 PM'." },
      { q: "By how much do Rapid Bus Express (BRT) routes reduce rush-hour transit times?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "50 percent" }, { key: "C", text: "Up to 35 percent" }, { key: "D", text: "75 percent" }], a: "C", exp: "Text A: 'reduce rush-hour transit times by up to 35 percent'." },
      { q: "When does OHIP healthcare coverage begin for new eligible Ontario residents?", opts: [{ key: "A", text: "After a 3-month waiting period" }, { key: "B", text: "After 1 year of employment" }, { key: "C", text: "Only after paying private insurance" }, { key: "D", text: "Commences on the date of residency confirmation (no waiting period)" }], a: "D", exp: "Text B: 'Coverage commences on the date of residency confirmation, eliminating the historical 3-month waiting period'." },
      { q: "Which medical service is covered under OHIP basic healthcare?", opts: [{ key: "A", text: "Family doctor appointments, specialist consultations, emergency visits, and surgeries" }, { key: "B", text: "Cosmetic tattoos" }, { key: "C", text: "International private jet flights" }, { key: "D", text: "Spa vacations" }], a: "A", exp: "Text B: 'OHIP covers family doctor appointments, specialist consultations with referral, emergency hospital room visits... and standard surgical procedures'." },
      { q: "Who is eligible for fully funded prescription drugs under the OHIP+ program?", opts: [{ key: "A", text: "Seniors over 80 only" }, { key: "B", text: "Youths under 25 years of age" }, { key: "C", text: "Government employees only" }, { key: "D", text: "All residents regardless of age" }], a: "B", exp: "Text B: 'outpatient prescription drugs for youths under 25 are fully funded through the OHIP+ program'." },
      { q: "What is the maximum household net income threshold for the Canadian Dental Care Plan (CDCP)?", opts: [{ key: "A", text: "$40,000" }, { key: "B", text: "$60,000" }, { key: "C", text: "Adjusted net annual income under $90,000" }, { key: "D", text: "$150,000" }], a: "C", exp: "Text B: 'households with an adjusted net annual income under $90,000'." },
      { q: "Which dental procedures are subsidized under the CDCP program?", opts: [{ key: "A", text: "Teeth whitening only" }, { key: "B", text: "Diamond implants only" }, { key: "C", text: "Cosmetic veneers exclusively" }, { key: "D", text: "Scaling, cavity fillings, and annual X-rays" }], a: "D", exp: "Text B: 'covering scaling, cavity fillings, and annual X-rays'." },
      { q: "What documents are required to register for the CDCP dental subsidy program?", opts: [{ key: "A", text: "Active Social Insurance Number (SIN) and prior year tax return verification" }, { key: "B", text: "Driver's license only" }, { key: "C", text: "High school diploma" }, { key: "D", text: "Letter from bank manager" }], a: "A", exp: "Text B: 'Registration requires an active Social Insurance Number (SIN) and prior year tax return verification'." },
      { q: "What payment methods are accepted at TTC transit readers?", opts: [{ key: "A", text: "Cash coins only" }, { key: "B", text: "PRESTO smart-cards, smartphones, and contactless credit cards" }, { key: "C", text: "Paper coupons only" }, { key: "D", text: "Cheques" }], a: "B", exp: "Text A: 'Commuters can tap physical PRESTO cards, smartphones, or contactless credit cards'." }
    ];

    r1Questions.forEach((item, idx) => {
      qs.push({
        id: `ig4k1_q${idx + 41}`,
        partNumber: 5,
        partTitle: "Reading Section 1: Community Services & Urban Transport",
        section: "READING",
        passageText: readSec1,
        questionText: `Question ${idx + 41}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // READING SECTION 2: Workplace Training, Safety & Employment Rights (Q54 - Q66: 13 Questions)
    const readSec2 = `GENERAL TRAINING READING SECTION 2 — WORKPLACE STANDARDS & HUMAN RESOURCE POLICIES\n\n[TEXT A: WORKPLACE ERGONOMICS & REPETITIVE STRAIN INJURY (RSI) MITIGATION MANUAL]\nTo prevent musculoskeletal disorders, all administrative workstations must adhere to ergonomic guidelines. Chair seat height should be adjusted so thighs are parallel to the floor with feet resting flat or on an angled footrest. Computer display monitors must be positioned at arm's length (50–70 cm), with the top third of the screen level with horizontal eye height to eliminate cervical neck strain. Keyboards should be tilted slightly negative (downward sloping away from user) to maintain neutral, unbent wrist posture during typing. Employees are mandated to practice the '20-20-20 rule': every 20 minutes, gaze at an object 20 feet (6 meters) away for at least 20 seconds to reduce digital eye strain. Electric height-adjustable sit-stand desks are provided upon request with an occupational therapist assessment.\n\n[TEXT B: CORPORATE HYBRID WORK POLICY & GRIEVANCE RESOLUTION PROCEDURE]\nFull-time permanent staff completing their 3-month probationary period are eligible for the 3/2 Hybrid Work Model, requiring three core collaborative days in-office (Tuesday through Thursday) and two discretionary remote telecommuting days (Monday and Friday). Core business collaboration hours are 10:00 AM to 3:30 PM, during which all team members must remain accessible via enterprise messaging channels and video conferencing. Overtime exceeding 40 hours per week requires pre-approval from department heads and is compensated at 1.5 times regular hourly wage or as equivalent banked time-in-lieu.\n\nIn the event of workplace conflict, harassment, or contractual disputes, employees must follow the formal Three-Stage Grievance Procedure:\n• Stage 1 (Informal Resolution): Direct discussion with immediate supervisor within 10 business days of the incident.\n• Stage 2 (Formal HR Investigation): If unresolved, submit a written grievance statement to People & Culture. HR must initiate a confidential investigation within 5 business days and render a written findings report within 15 business days.\n• Stage 3 (Independent External Mediation): Unresolved claims escalate to a neutral third-party mediator appointed through the Provincial Labour Relations Board. Retaliation against any employee filing a bona fide grievance is strictly prohibited and subject to immediate termination.`;

    const r2Questions = [
      { q: "At what distance should computer display monitors be positioned from the user?", opts: [{ key: "A", text: "10–20 cm" }, { key: "B", text: "Over 1.5 meters" }, { key: "C", text: "At arm's length (50–70 cm)" }, { key: "D", text: "Directly touching the eyes" }], a: "C", exp: "Text A: 'positioned at arm's length (50–70 cm)'." },
      { q: "Where should the top third of the monitor screen be aligned?", opts: [{ key: "A", text: "At knee level" }, { key: "B", text: "Tilted facing the ceiling" }, { key: "C", text: "Below the desk surface" }, { key: "D", text: "Level with horizontal eye height to eliminate neck strain" }], a: "D", exp: "Text A: 'with the top third of the screen level with horizontal eye height'." },
      { q: "What does the '20-20-20 rule' recommend to combat digital eye strain?", opts: [{ key: "A", text: "Every 20 minutes, look at an object 20 feet away for 20 seconds" }, { key: "B", text: "Take a 20-minute nap every 2 hours" }, { key: "C", text: "Blink 20 times in 20 seconds" }, { key: "D", text: "Drink 20 ounces of water every 20 minutes" }], a: "A", exp: "Text A: 'every 20 minutes, gaze at an object 20 feet (6 meters) away for at least 20 seconds'." },
      { q: "What keyboard tilt angle is recommended to maintain neutral wrist posture?", opts: [{ key: "A", text: "Tilted steeply upward" }, { key: "B", text: "Tilted slightly negative (downward sloping away from user)" }, { key: "C", text: "Vertical 90 degrees" }, { key: "D", text: "Placed on the floor" }], a: "B", exp: "Text A: 'tilted slightly negative (downward sloping away from user) to maintain neutral, unbent wrist posture'." },
      { q: "What is required before an employee is provided with an electric sit-stand desk?", opts: [{ key: "A", text: "Payment of $500" }, { key: "B", text: "10 years of service" }, { key: "C", text: "An occupational therapist ergonomic assessment" }, { key: "D", text: "Company president approval" }], a: "C", exp: "Text A: 'provided upon request with an occupational therapist assessment'." },
      { q: "What are the three mandatory in-office collaborative days under the Hybrid Work Policy?", opts: [{ key: "A", text: "Monday, Wednesday, Friday" }, { key: "B", text: "Saturday and Sunday" }, { key: "C", text: "Monday through Friday every day" }, { key: "D", text: "Tuesday through Thursday" }], a: "D", exp: "Text B: 'three core collaborative days in-office (Tuesday through Thursday)'." },
      { q: "What are the designated core business collaboration hours?", opts: [{ key: "A", text: "10:00 AM to 3:30 PM" }, { key: "B", text: "8:00 AM to 12:00 PM" }, { key: "C", text: "1:00 PM to 7:00 PM" }, { key: "D", text: "Open 24 hours" }], a: "A", exp: "Text B: 'Core business collaboration hours are 10:00 AM to 3:30 PM'." },
      { q: "At what rate is overtime work exceeding 40 hours per week compensated?", opts: [{ key: "A", text: "Standard regular hourly rate" }, { key: "B", text: "1.5 times regular hourly wage or equivalent banked time-in-lieu" }, { key: "C", text: "Double time only" }, { key: "D", text: "No overtime compensation is provided" }], a: "B", exp: "Text B: 'compensated at 1.5 times regular hourly wage or as equivalent banked time-in-lieu'." },
      { q: "Within how many days must Stage 1 Informal Grievance discussion occur after an incident?", opts: [{ key: "A", text: "2 days" }, { key: "B", text: "30 days" }, { key: "C", text: "Within 10 business days of the incident" }, { key: "D", text: "6 months" }], a: "C", exp: "Text B: 'Direct discussion with immediate supervisor within 10 business days of the incident'." },
      { q: "Within how many days must HR initiate a formal investigation under Stage 2?", opts: [{ key: "A", text: "24 hours" }, { key: "B", text: "60 days" }, { key: "C", text: "No time limit" }, { key: "D", text: "Within 5 business days and render a report within 15 business days" }], a: "D", exp: "Text B: 'HR must initiate a confidential investigation within 5 business days and render a written findings report within 15 business days'." },
      { q: "What body appoints the external mediator in Stage 3 Grievance resolution?", opts: [{ key: "A", text: "The Provincial Labour Relations Board" }, { key: "B", text: "The local police department" }, { key: "C", text: "The company's marketing agency" }, { key: "D", text: "The building landlord" }], a: "A", exp: "Text B: 'appointed through the Provincial Labour Relations Board'." },
      { q: "What consequence applies to anyone retaliating against an employee who files a grievance?", opts: [{ key: "A", text: "A verbal warning" }, { key: "B", text: "Strictly prohibited and subject to immediate termination of employment" }, { key: "C", text: "A $50 fine" }, { key: "D", text: "A one-week suspension with pay" }], a: "B", exp: "Text B: 'Retaliation against any employee filing a bona fide grievance is strictly prohibited and subject to immediate termination'." },
      { q: "What is the required probationary period before employees qualify for hybrid telecommuting?", opts: [{ key: "A", text: "1 week" }, { key: "B", text: "1 year" }, { key: "C", text: "Completing their 3-month probationary period" }, { key: "D", text: "5 years" }], a: "C", exp: "Text B: 'completing their 3-month probationary period are eligible for the 3/2 Hybrid Work Model'." }
    ];

    r2Questions.forEach((item, idx) => {
      qs.push({
        id: `ig4k1_q${idx + 54}`,
        partNumber: 6,
        partTitle: "Reading Section 2: Workplace Ergonomics & Grievance Procedures",
        section: "READING",
        passageText: readSec2,
        questionText: `Question ${idx + 54}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // READING SECTION 3: General Interest Long Article (Q67 - Q80: 14 Questions)
    const readSec3 = `GENERAL TRAINING READING SECTION 3 — THE 24-HOUR METROPOLIS: MANAGING THE URBAN NIGHT-TIME ECONOMY\n\nHistorically, urban spatial planning treated the night as a dormant period dedicated exclusively to domestic sleep and civil quietude, during which public transit ceased and commercial activity shuttered. Over the past three decades, however, globalization, flexible shift-work schedules, and vibrant cultural tourism have fueled the dramatic emergence of the 'Night-Time Economy' (NTE). Defined broadly as economic, cultural, and social activity occurring between 6:00 PM and 6:00 AM, the NTE in major global cities—such as London, Sydney, Berlin, and Tokyo—contributes up to 10 percent of gross metropolitan product and employs roughly one in eight urban workers across hospitality, logistics, healthcare, emergency services, and entertainment.\n\nRecognizing that managing a round-the-clock metropolis requires proactive civic governance, vanguard municipalities have pioneered the appointment of dedicated 'Night Mayors' or Night Czars. Pioneered by Amsterdam in 2012, this institutional office acts as an independent mediator between municipal regulators, late-night hospitality operators, police constabularies, and residential community associations. The primary governance objective is striking a sustainable balance between commercial vitality and residential livability—preventing noise nuisance while fostering vibrant creative nightlife.\n\nA central policy innovation championed by night-time governance is the 'Agent of Change' principle in urban zoning law. Under traditional nuisance tort laws, new residential high-rises erected adjacent to longstanding music venues frequently resulted in noise complaints that forced historic venues into bankruptcy. The Agent of Change rule reverses this unfair liability: if a property developer builds apartments next to an existing licensed entertainment venue, the developer is legally mandated to finance and install high-performance acoustic soundproofing (such as triple-glazed windows and insulated facade panels). Conversely, if a new nightclub opens in an established quiet residential zone, the nightclub operator must install interior acoustic baffling to prevent sound leakage.\n\nFurthermore, modern night-time governance embraces all-night public transit networks—such as the London Night Tube and Sydney's 24-hour NightRide bus fleet. Operating reliable, secure nocturnal transit has proven indispensable not merely for entertainment seekers, but primarily for essential night-shift workers—hospital nurses, airport ground crews, sanitation technicians, and warehouse logistics operators—who historically faced hazardous, expensive nocturnal commutes. By pairing well-lit transit corridors with smart LED street lighting, automated taxi marshaling stands, and mobile emergency beacon apps, cities create inclusive, secure nocturnal environments that stimulate economic prosperity around the clock.`;

    const r3Questions = [
      { q: "How is the Night-Time Economy (NTE) broadly defined in temporal terms?", opts: [{ key: "A", text: "From midnight to 4:00 AM" }, { key: "B", text: "Weekends only" }, { key: "C", text: "From noon to sunset" }, { key: "D", text: "Activity occurring between 6:00 PM and 6:00 AM" }], a: "D", exp: "Đoạn 1: 'Defined broadly as economic, cultural, and social activity occurring between 6:00 PM and 6:00 AM'." },
      { q: "What percentage of gross metropolitan product does the NTE generate in major global cities?", opts: [{ key: "A", text: "Up to 10 percent of gross metropolitan product" }, { key: "B", text: "1 percent" }, { key: "C", text: "50 percent" }, { key: "D", text: "80 percent" }], a: "A", exp: "Đoạn 1: 'contributes up to 10 percent of gross metropolitan product'." },
      { q: "Approximately how many urban workers are employed within the night-time economy?", opts: [{ key: "A", text: "One in a thousand" }, { key: "B", text: "Roughly one in eight urban workers" }, { key: "C", text: "All workers" }, { key: "D", text: "Only teenage students" }], a: "B", exp: "Đoạn 1: 'employs roughly one in eight urban workers across hospitality, logistics, healthcare'." },
      { q: "Which city pioneered the civic appointment of a 'Night Mayor' in 2012?", opts: [{ key: "A", text: "New York" }, { key: "B", text: "Paris" }, { key: "C", text: "Amsterdam in 2012" }, { key: "D", text: "Tokyo" }], a: "C", exp: "Đoạn 2: 'Pioneered by Amsterdam in 2012, this institutional office acts as an independent mediator'." },
      { q: "What is the primary role of a Night Mayor?", opts: [{ key: "A", text: "To shut down all nightlife at 9:00 PM" }, { key: "B", text: "To collect club entrance tickets" }, { key: "C", text: "To perform DJ sets" }, { key: "D", text: "To mediate between regulators, nightlife operators, police, and residents to balance vitality and livability" }], a: "D", exp: "Đoạn 2: 'acts as an independent mediator between municipal regulators, late-night hospitality operators, police... and residential community associations'." },
      { q: "What does the 'Agent of Change' zoning principle mandate for property developers?", opts: [{ key: "A", text: "Finance and install high-performance acoustic soundproofing if building next to existing venues" }, { key: "B", text: "Demolish all historic music venues" }, { key: "C", text: "Pay cash bribes to neighbors" }, { key: "D", text: "Ban music in the entire neighborhood" }], a: "A", exp: "Đoạn 3: 'the developer is legally mandated to finance and install high-performance acoustic soundproofing'." },
      { q: "What must a new nightclub operator do if opening in an established quiet residential zone?", opts: [{ key: "A", text: "Nothing at all" }, { key: "B", text: "Install interior acoustic baffling to prevent sound leakage" }, { key: "C", text: "Play music only through headphones" }, { key: "D", text: "Pay for residents' hotel rooms" }], a: "B", exp: "Đoạn 3: 'the nightclub operator must install interior acoustic baffling to prevent sound leakage'." },
      { q: "What acoustic installations are cited as examples of high-performance soundproofing?", opts: [{ key: "A", text: "Paper curtains" }, { key: "B", text: "Open screen mesh" }, { key: "C", text: "Triple-glazed windows and insulated facade panels" }, { key: "D", text: "Plastic sheets" }], a: "C", exp: "Đoạn 3: 'such as triple-glazed windows and insulated facade panels'." },
      { q: "Who are the primary beneficiaries of all-night public transit networks beyond clubgoers?", opts: [{ key: "A", text: "Tourists only" }, { key: "B", text: "Professional athletes only" }, { key: "C", text: "Daytime school students" }, { key: "D", text: "Essential night-shift workers (nurses, airport crews, sanitation technicians, warehouse operators)" }], a: "D", exp: "Đoạn 4: 'primarily for essential night-shift workers—hospital nurses, airport ground crews, sanitation technicians, and warehouse logistics operators'." },
      { q: "Which nocturnal transit systems are highlighted as leading examples?", opts: [{ key: "A", text: "London Night Tube and Sydney's 24-hour NightRide bus fleet" }, { key: "B", text: "Venice water gondolas" }, { key: "C", text: "Steam train networks" }, { key: "D", text: "Horse-drawn carriages" }], a: "A", exp: "Đoạn 4: 'such as the London Night Tube and Sydney's 24-hour NightRide bus fleet'." },
      { q: "What urban safety features are paired with nocturnal transit corridors?", opts: [{ key: "A", text: "Complete darkness" }, { key: "B", text: "Smart LED street lighting, automated taxi stands, and mobile emergency beacon apps" }, { key: "C", text: "Armed guard checkpoints at every door" }, { key: "D", text: "Barbed wire fences" }], a: "B", exp: "Đoạn 4: 'smart LED street lighting, automated taxi marshaling stands, and mobile emergency beacon apps'." },
      { q: "How did traditional spatial urban planning view the night historically?", opts: [{ key: "A", text: "As the main shopping peak" }, { key: "B", text: "As festival time only" }, { key: "C", text: "As a dormant period dedicated exclusively to sleep and civil quietude" }, { key: "D", text: "As daytime extension" }], a: "C", exp: "Đoạn 1: 'treated the night as a dormant period dedicated exclusively to domestic sleep and civil quietude'." },
      { q: "What economic and social forces drove the expansion of the night-time economy?", opts: [{ key: "A", text: "Banning daytime work" }, { key: "B", text: "Electricity power shortages" }, { key: "C", text: "Mandatory night curfew laws" }, { key: "D", text: "Globalization, flexible shift-work schedules, and vibrant cultural tourism" }], a: "D", exp: "Đoạn 1: 'globalization, flexible shift-work schedules, and vibrant cultural tourism have fueled the dramatic emergence of the Night-Time Economy'." },
      { q: "What is the primary conclusion of the passage regarding modern 24-hour cities?", opts: [{ key: "A", text: "Proactive governance, balanced zoning rules (Agent of Change), and 24-hour transit create thriving, safe, and inclusive round-the-clock metropolises" }, { key: "B", text: "Night economies should be completely outlawed" }, { key: "C", text: "Night shift workers should walk to work without public transit" }, { key: "D", text: "Only bars and clubs matter in a city" }], a: "A", exp: "Kết luận: Quản trị chủ động, luật quy hoạch cân bằng Agent of Change và giao thông công cộng xuyên đêm giúp xây dựng các đại đô thị 24 giờ phát triển thịnh vượng, an toàn và hòa nhập." }
    ];

    r3Questions.forEach((item, idx) => {
      qs.push({
        id: `ig4k1_q${idx + 67}`,
        partNumber: 7,
        partTitle: "Reading Section 3: The 24-Hour Night-Time Economy",
        section: "READING",
        passageText: readSec3,
        questionText: `Question ${idx + 67}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SPEAKING AI STUDIO (Q81 - Q83: 3 PARTS)
    qs.push({
      id: "ig4k1_q81",
      partNumber: 8,
      partTitle: "IELTS Speaking Part 1: Relocation, Daily Routines & Community Amenities",
      section: "SPEAKING",
      speakingPrompt:
        "1. Have you ever relocated to a new neighborhood or city? How did you adapt?\n2. What community facilities or amenities do you use most frequently near your home?\n3. Do you prefer shopping in large supermarkets or small local neighborhood markets?\n4. How has remote or flexible working changed your daily weekday routine?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText:
        "Question 81 (Speaking Part 1): Answer interview questions on relocation, neighborhood amenities, and remote routines (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Everyday Vocabulary" },
            { key: "C", text: "Listen to Native Examiner Questions" },
            { key: "D", text: "Skip to Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + EXTENSION]
- Trả lời trực tiếp vào trọng tâm câu hỏi và mở rộng 2-3 câu tự nhiên.
- Dùng từ vựng chỉ đời sống thường nhật, tiện ích đô thị và lối sống linh hoạt.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"Yes, I recently relocated to a vibrant coastal district. To adapt quickly, I established a consistent daily routine and joined a local community sports center.

In terms of local amenities, I frequently use the municipal public library for focused reading and the dedicated waterfront cycling pathways for evening exercise.

I definitely favor small neighborhood grocers over giant supermarkets because they offer fresher organic produce and foster genuine personal connections with local vendors.

Flexible hybrid working has transformed my routine tremendously. Eliminating a grueling two-hour daily commute allows me to prepare healthy home-cooked meals and maintain a much healthier work-life equilibrium."

💡 [TỪ VỰNG THEN CHỐT]
- Community amenities /kəˈmjuː.nə.t̬i əˈmen.ə.t̬iz/ (n): Tiện ích cộng đồng
- Grueling commute /ˈɡruː.ə.lɪŋ kəˈmjuːt/ (n): Quãng đường đi làm mệt mỏi
- Work-life equilibrium /wɝːk laɪf ˌiː.kwəˈlɪb.ri.əm/ (n): Sự cân bằng giữa công việc và cuộc sống.`
    });

    qs.push({
      id: "ig4k1_q82",
      partNumber: 9,
      partTitle: "IELTS Speaking Part 2: Cue Card — Outstanding Customer Service Experience",
      section: "SPEAKING",
      speakingPrompt:
        "Describe a memorable experience when you received exceptional customer service.\nYou should say:\n• When and where this experience occurred\n• What product or service was involved\n• What the customer service staff did that was exceptional\nAnd explain how you felt about this experience.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText:
        "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech describing an exceptional customer service experience.",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ (THE 4-BOX METHOD)]
- Box 1 (When/Where): Last year at a boutique electronics repair store in downtown Toronto.
- Box 2 (Product/Issue): Laptop motherboard failure right before a critical professional deadline.
- Box 3 (Action): Technician worked 2 hours past closing time, salvaged irreplaceable data, and provided a free loaner device.
- Box 4 (Feelings): Profound gratitude and immense relief; exemplified unparalleled professionalism and human empathy.

🔍 [BÀI NÓI MẪU BAND 9.0 (230+ TỪ)]
"I would like to recount an extraordinary customer service encounter that took place last autumn at an independent electronics repair laboratory in downtown Toronto.

At the time, my primary laptop suffered a catastrophic motherboard failure just two days prior to a pivotal business proposal submission. The device contained unbacked-up financial models and presentation slides, which put me in an absolute panic.

When I rushed into the store thirty minutes before closing, the lead technician, David, immediately grasped the urgency of my predicament. Rather than turning me away with standard multi-day diagnostic timelines, he stayed two full hours past the store's official closing time to perform micro-soldering on the damaged power circuit.

Remarkably, he successfully recovered one hundred percent of my corrupted data drive and transferred the critical files onto an encrypted external SSD. To top it off, he lent me a high-performance backup laptop free of charge so I could practice my presentation that evening.

I felt an immense surge of relief and profound gratitude. In an era where corporate customer support is often outsourced to impersonal automated chatbots, this technician demonstrated unparalleled technical mastery, genuine empathy, and exemplary dedication that went leagues beyond the call of duty."

💡 [TỪ VỰNG THEN CHỐT]
- Pivotal business proposal /ˈpɪv.ə.t̬əl ˈbɪz.nɪs prəˈpoʊ.zəl/ (n): Đề xuất kinh doanh then chốt
- Catastrophic motherboard failure /ˌkæt̬.əˈstrɑː.fɪk ˈmʌð.ɚ.bɔːrd ˈfeɪ.ljɚ/ (n): Sự cố hỏng bo mạch chủ thảm khốc
- Micro-soldering /ˈmaɪ.kroʊ ˈsɑː.dɚ.ɪŋ/ (n): Kỹ thuật hàn vi mạch điện tử
- Beyond the call of duty /bɪˈjɑːnd ðə kɑːl əv ˈduː.t̬i/ (idiom): Vượt xa cả trách nhiệm công việc.`
    });

    qs.push({
      id: "ig4k1_q83",
      partNumber: 10,
      partTitle: "IELTS Speaking Part 3: Service Automation & Consumer Rights",
      section: "SPEAKING",
      speakingPrompt:
        "1. Do you think AI chatbots and automated kiosks will completely replace human customer service personnel in the future?\n2. What are the benefits and drawbacks of self-service checkouts in supermarkets and airports?\n3. How can companies protect elderly or less tech-savvy citizens from digital service exclusion?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText:
        "Question 83 (Speaking Part 3): Provide balanced, high-level analytical answers on service automation and digital inclusion.",
      options: [
            { key: "A", text: "Review Discourse Markers" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Section" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC PHÂN TÍCH ĐA CHIỀU]
- Nêu rõ lợi ích của tự động hóa (hiệu suất, giảm thời gian chờ đợi 24/7) đối chiếu với hạn chế (thiếu sự đồng cảm, bất lực trước các tình huống bất thường phức tạp).
- Đề xuất mô hình dịch vụ lai (hybrid service model) duy trì hỗ trợ con người cho nhóm người cao tuổi.

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"While artificial intelligence and self-service kiosks have revolutionized transactional efficiency by eliminating queue bottlenecks and offering 24/7 service availability, I firmly believe they cannot completely supplant human personnel.

Automated algorithms excel at standard, predictable queries. However, when complex, emotionally charged grievances arise—such as medical insurance disputes or flight cancellations—human empathy, nuanced negotiation, and discretionary problem-solving remain utterly indispensable.

Furthermore, aggressive digital automation risks disenfranchising vulnerable demographics, particularly senior citizens who may lack digital literacy.

Therefore, forward-thinking enterprises must adopt a blended hybrid service model: leveraging AI for routine logistics while preserving accessible, dedicated human desks to ensure comprehensive consumer equity and inclusion."

💡 [TỪ VỰNG THEN CHỐT]
- Transactional efficiency /trænˈzæk.ʃən.əl ɪˈfɪʃ.ən.si/ (n): Hiệu quả giao dịch
- Emotionally charged grievances /ɪˈmoʊ.ʃən.əl.i tʃɑːrdʒd ˈɡriː.vəns.ɪz/ (n): Những khiếu nại chất chứa nhiều bức xúc
- Disenfranchising vulnerable demographics /ˌdɪs.ɪnˈfræn.tʃaɪz.ɪŋ ˈvʌl.nɚ.ə.bəl ˌdem.əˈɡræf.ɪks/ (v/n): Tước đi quyền lợi của các nhóm dân cư yếu thế
- Blended hybrid model /ˌblen.dɪd ˈhaɪ.brɪd ˈmɑː.dəl/ (n): Mô hình lai ghép đa phương thức.`
    });

    // WRITING AI STUDIO (Q84 - Q85: TASK 1 GENERAL TRAINING LETTER & TASK 2 ESSAY)
    qs.push({
      id: "ig4k1_q84",
      partNumber: 11,
      partTitle: "IELTS General Writing Task 1: Formal Letter of Complaint & Rectification",
      section: "WRITING",
      writingPrompt:
        "You recently moved into a rented apartment and discovered that several major household appliances are defective and have not been repaired as promised in your lease agreement. Write a formal letter to your landlord or property management agency. In your letter:\n• Explain the specific defects in the apartment\n• Describe how these problems have disrupted your daily life\n• State what action you expect the landlord to take and propose a deadline for completion.\n(Write at least 150 words. Time suggested: 20 minutes).",
      minWordCount: 150,
      sampleEssay: `Dear Mr. Henderson,

I am writing to formally lodge a complaint regarding several unresolved maintenance defects in Apartment 4B at 742 Maplewood Avenue, which I occupied on November 1st under a twelve-month residential tenancy agreement.

Upon taking possession of the premises, I discovered that the integrated kitchen refrigerator fails to maintain safe cooling temperatures, resulting in the spoilage of perishable groceries. Furthermore, the master bathroom shower exhibits an acute hot water pressure failure, and the secondary bedroom radiator produces persistent knocking noises that prevent restful sleep.

These defective conditions have caused substantial disruption to my household's daily routines. We have been unable to store food safely or shower comfortably in our own home, which directly contravenes the habitability assurances explicitly stipulated in Clause 8 of our signed lease.

I respectfully request that you dispatch licensed technicians to repair or replace the malfunctioning refrigerator, shower plumbing, and heating radiator no later than Friday, November 14th. Should these urgent repairs not be finalized by this date, I will feel compelled to escalate this matter to the Provincial Residential Tenancy Branch and request a formal rent reduction.

Thank you for your prompt attention to this urgent matter. I await your immediate written confirmation.

Yours sincerely,

Rachel Zimmerman`,
      questionText:
        "Question 84 (Writing Task 1): Write a formal complaint letter to your property landlord regarding defective appliances (min 150 words).",
      options: [
            { key: "A", text: "Check General Training Letter Scoring Rubric" },
            { key: "B", text: "Review Formal Tone Sign-offs" },
            { key: "C", text: "Skip to Task 2" },
            { key: "D", text: "Submit Task 1 Letter for Gemini AI Evaluation" }
          ],
      correctAnswer: "D",
      explanation: `🎯 [CHIẾN THUẬT VIẾT THƯ TRANG TRỌNG GENERAL TRAINING - BAND 9.0]
1. Task Achievement:
   - Chào hỏi trang trọng: "Dear Mr. Henderson," ➔ Kết thư: "Yours sincerely,".
   - Nêu rõ 3 luận điểm: (1) Chi tiết hỏng hóc tủ lạnh, vòi sen, lò sưởi; (2) Ảnh hưởng hư hỏng thức ăn, mất ngủ; (3) Yêu cầu thợ sửa trước ngày 14/11 và phương án báo cáo ban quản lý nhà thuê.

2. Tone & Vocabulary:
   - Trang trọng, lịch sự nhưng kiên quyết: "formally lodge a complaint", "perishable groceries", "habitability assurances", "escalate this matter to the Provincial Residential Tenancy Branch".`
    });

    qs.push({
      id: "ig4k1_q85",
      partNumber: 12,
      partTitle: "IELTS General Writing Task 2: Discursive Social Essay",
      section: "WRITING",
      writingPrompt:
        "In many developed nations, there is an acute shortage of skilled workers in critical sectors such as healthcare, civil engineering, and technological trades. Some people argue that governments should relax immigration regulations to attract skilled overseas professionals. Others believe that national resources should be devoted entirely to retraining and upskilling domestic jobseekers. Discuss both views and give your own opinion. (Write at least 250 words. Time suggested: 40 minutes).",
      minWordCount: 250,
      sampleEssay: `In an era characterized by aging populations and rapid technological transformation, developed economies face unprecedented labor shortages across healthcare, engineering, and digital infrastructure. While some policy analysts argue that streamlining immigration pathways for qualified foreign professionals is the most effective remedy, others contend that governments should prioritize retraining the domestic workforce. In this essay, I will explore both perspectives before arguing that a dual, synchronized strategy combining targeted skilled migration with aggressive domestic vocational upskilling represents the optimal path forward.

On the one hand, proponents of skilled immigration emphasize the imperative of immediate labor market stabilization. In critical sectors like specialized healthcare and advanced artificial intelligence, training a domestic candidate from scratch requires nearly a decade of rigorous university education and clinical residency. By attracting international doctors, specialized nurses, and software architects through expedited visa schemes, nations can immediately alleviate emergency room backlogs and maintain industrial competitiveness without experiencing economic stagnation. Furthermore, skilled immigrants contribute significantly to the tax base, helping fund social security systems in nations undergoing severe demographic aging.

On the other hand, advocates for domestic upskilling legitimately assert that relying exclusively on foreign labor risks neglecting vulnerable local populations. When governments import skilled labor without investing in domestic education, displaced local workers—particularly those affected by industrial automation—face chronic structural unemployment and social disenfranchisement. Therefore, allocating national subsidies to vocational apprenticeships, free polytechnic tuition in critical trades, and tax incentives for corporate reskilling ensures inclusive domestic economic mobility.

In conclusion, skilled immigration and domestic workforce development should not be viewed as mutually exclusive alternatives. While targeted skilled immigration provides an indispensable immediate injection of expertise to resolve urgent structural deficits, long-term national resilience demands concurrent, robust investment in domestic vocational education to ensure sustainable economic prosperity for all citizens.`,
      questionText:
        "Question 85 (Writing Task 2): Write a 250+ word essay on skilled immigration vs domestic workforce retraining.",
      options: [
            { key: "A", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "B", text: "Review Dual Strategy Essay Structure" },
            { key: "C", text: "Check Band 9 Academic Cohesion Markers" },
            { key: "D", text: "Complete Full IELTS Test" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT BÀI LUẬN DẠNG DISCUSS BOTH VIEWS - BAND 9.0]
1. Task Response:
   - Thân bài 1: Lợi ích nhập cư lao động kỹ năng cao (bù đắp thiếu hụt y tế/công nghệ ngay lập tức, tiết kiệm 10 năm đào tạo, bổ sung nguồn thu thuế cho dân số già hóa).
   - Thân bài 2: Tầm quan trọng của đào tạo nội địa (chống thất nghiệp cơ cấu do tự động hóa, thúc đẩy bình đẳng cơ hội cho lao động bản địa).
   - Quan điểm cá nhân: Chiến lược song hành (Dual synchronized strategy) giải quyết cả ngắn hạn lẫn dài hạn.

2. Lexical Resource (C2 Academic):
   - "unprecedented labor shortages", "alleviate emergency room backlogs", "demographic aging", "chronic structural unemployment", "vocational apprenticeships", "indispensable immediate injection".`
    });

    return qs;
  })()
};

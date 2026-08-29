import { ExamPaper, ExamQuestion } from "./types";

export const toeicMiniSpeed01Paper: ExamPaper = {
    id: "toeic_mini_speed_01",
    title: "TOEIC Speed Sprint Test 2026 #01",
    type: "TOEIC_MINI",
    level: "Intermediate",
    timeLimitMinutes: 35,
    totalQuestions: 50,
    maxScore: 495,
    description: "Bài thi tốc độ 50 câu (20 Listening + 30 Reading) kiểm tra phản xạ nhanh từ vựng ngữ pháp TOEIC 2026.",
    categoryBadge: "TOEIC Speed",
    tags: ["TOEIC", "Speed Test", "50 Câu", "Reflex", "ETS 2026"],
    supportedSkills: ["LISTENING", "READING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

            // PART 1 (Q1-Q4)
      const miniP1 = [
        {
          id: "tms1_q1",
          imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          options: [
            { key: "A", text: "Chairs are arranged around a contemporary boardroom table." },
            { key: "B", text: "A presentation slide is being projected on the ceiling." },
            { key: "C", text: "Windows are being wiped down by cleaners." },
            { key: "D", text: "Office supplies are stacked on the carpet." }
          ],
          correctAnswer: "A" as const,
          explanation: "🎯 **Đáp án đúng: A** (Chairs are arranged around a contemporary boardroom table.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Các ghế họp được sắp xếp quanh chiếc bàn phòng hội đồng hiện đại. (Đúng với trạng thái căn phòng)\n- (B) Slide thuyết trình đang được chiếu lên trần nhà. (Sai vị trí)\n- (C) Cửa sổ đang được nhân viên vệ sinh lau chùi. (Sai hành động)\n- (D) Đồ dùng văn phòng đang được xếp chồng trên thảm. (Sai trạng thái)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy thì bị động 'being + V3' ở các câu (B), (C) ám chỉ có người đang thao tác, trong khi bức ảnh thể hiện trạng thái phòng họp tĩnh.\n\n💡 **Từ vựng trọng tâm:**\n- `contemporary boardroom table` (/kənˈtɛmpərəri ˈbɔːdruːm ˈteɪbl/): bàn phòng họp hội đồng hiện đại\n- `be arranged around` (/əˈreɪndʒd əˈraʊnd/): được bài trí, sắp xếp quanh"
        },
        {
          id: "tms1_q2",
          imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          options: [
            { key: "A", text: "Colleagues are shaking hands across an office partition." },
            { key: "B", text: "Team members are engaged in a lively group discussion." },
            { key: "C", text: "Documents are being filed into metal filing cabinets." },
            { key: "D", text: "Laptops are being packed into black backpacks." }
          ],
          correctAnswer: "B" as const,
          explanation: "🎯 **Đáp án đúng: B** (Team members are engaged in a lively group discussion.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Đồng nghiệp đang bắt tay qua vách ngăn văn phòng. (Sai hành động)\n- (B) Các thành viên trong nhóm đang tham gia vào cuộc thảo luận nhóm sôi nổi. (Đúng hành động chính)\n- (C) Tài liệu đang được cất vào tủ hồ sơ kim loại. (Sai hành động)\n- (D) Máy tính xách tay đang được cất vào ba lô đen. (Sai hành động)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy hành động tương tự: Nhóm nhân viên đang quây quần làm việc và trao đổi sôi nổi chứ không phải bắt tay (A) hay cất dọn đồ (D).\n\n💡 **Từ vựng trọng tâm:**\n- `be engaged in a lively discussion` (/ɪnˈɡeɪdʒd ɪn ə ˈlaɪvli dɪˈskʌʃn/): tham gia thảo luận sôi nổi\n- `office partition` (/ˈɒfɪs pɑːˈtɪʃn/): vách ngăn văn phòng"
        },
        {
          id: "tms1_q3",
          imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          options: [
            { key: "A", text: "Safety goggles are being stored inside a drawer." },
            { key: "B", text: "Chemical bottles are being washed under a faucet." },
            { key: "C", text: "A laboratory researcher is adjusting a precision microscope." },
            { key: "D", text: "Test tubes are being thrown into a waste bin." }
          ],
          correctAnswer: "C" as const,
          explanation: "🎯 **Đáp án đúng: C** (A laboratory researcher is adjusting a precision microscope.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Kính bảo hộ đang được cất vào trong ngăn kéo. (Sai trạng thái)\n- (B) Các chai hóa chất đang được rửa dưới vòi nước. (Sai hành động)\n- (C) Nhà nghiên cứu phòng thí nghiệm đang điều chỉnh kính hiển vi chính xác. (Đúng thao tác kỹ thuật)\n- (D) Các ống nghiệm đang bị vứt vào thùng rác. (Sai hành động)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy thì bị động 'being + V3': Người nghiên cứu đang trực tiếp thao tác điều chỉnh núm kính hiển vi.\n\n💡 **Từ vựng trọng tâm:**\n- `laboratory researcher` (/ləˈbɒrətri rɪˈsɜːtʃər/): nhà nghiên cứu phòng thí nghiệm\n- `adjust a precision microscope` (/əˈdʒʌst ə prɪˈsɪʒn ˈmaɪkrəskəʊp/): điều chỉnh kính hiển vi chính xác"
        },
        {
          id: "tms1_q4",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          options: [
            { key: "A", text: "A commercial building is undergoing structural demolition." },
            { key: "B", text: "Traffic cones are placed along a closed subway entrance." },
            { key: "C", text: "Scaffolding surrounds the top floors of a tower." },
            { key: "D", text: "Pedestrians are crossing a street in front of a modern glass skyscraper." }
          ],
          correctAnswer: "D" as const,
          explanation: "🎯 **Đáp án đúng: D** (Pedestrians are crossing a street in front of a modern glass skyscraper.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Tòa nhà thương mại đang bị phá dỡ kết cấu. (Sai bối cảnh)\n- (B) Các cọc tiêu giao thông được đặt dọc theo lối vào tàu điện ngầm đóng cửa. (Sai đối tượng)\n- (C) Giàn giáo bao quanh các tầng trên cùng của tòa tháp. (Sai trạng thái)\n- (D) Người đi bộ đang băng qua đường trước tòa nhà chọc trời bằng kính hiện đại. (Đúng khung cảnh)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy cảnh xây dựng/phá dỡ (A, C): Tòa cao ốc kính hiện đại đã hoàn thiện và người đi bộ đang lưu thông trên vỉa hè/đường phố.\n\n💡 **Từ vựng trọng tâm:**\n- `pedestrians` (/pəˈdɛstrɪənz/): người đi bộ\n- `glass skyscraper` (/ɡlɑːs ˈskaɪskreɪpər/): tòa nhà chọc trời bằng kính"
        }
      ];

      miniP1.forEach((item, idx) => {
        qs.push({
          id: item.id,
          partNumber: 1,
          partTitle: "Mini Part 1: Photographs",
          section: "LISTENING",
          imageUrl: item.imageUrl,
          audioUrl: item.audioUrl,
          passageText: `[Audio Transcript - Question ${idx + 1}]\n(A) ${item.options[0].text}\n(B) ${item.options[1].text}\n(C) ${item.options[2].text}\n(D) ${item.options[3].text}`,
          questionText: `Question ${idx + 1}: Listen and select the statement that best describes the photo.`,
          options: item.options as any,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation
        });
      });

            // PART 2 (Q5-Q12: 8 Questions)
      const miniP2 = [
        {
          q: "Where can I pick up the parking pass for the municipal garage?",
          opts: [
            { key: "A", text: "The security desk in the ground-floor lobby has them." },
            { key: "B", text: "At twelve-thirty PM." },
            { key: "C", text: "Yes, I parked on Level 3." }
          ],
          a: "A" as const,
          exp: "🎯 **Đáp án đúng: A** (The security desk in the ground-floor lobby has them.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Tôi có thể nhận thẻ gửi xe cho nhà để xe thành phố ở đâu?\n- (A) Bàn bảo vệ ở sảnh tầng trệt có giữ thẻ đấy. (Đúng: chỉ vị trí nơi chốn)\n- (B) Lúc 12 giờ 30 trưa. (Sai: trả lời cho When)\n- (C) Vâng, tôi đã đỗ ở Tầng 3. (Sai: câu hỏi Wh- không trả lời bằng Yes/No)\n\n⚠️ **Phân tích bẫy thi ETS:** Câu hỏi bắt đầu bằng 'Where' tuyệt đối không chọn câu trả lời bắt đầu bằng 'Yes/No'.\n\n💡 **Từ vựng trọng tâm:**\n- `parking pass` (/ˈpɑːkɪŋ pɑːs/): thẻ đỗ xe, vé gửi xe\n- `ground-floor lobby` (/ɡraʊnd flɔːr ˈlɒbi/): sảnh tầng trệt"
        },
        {
          q: "Who is coordinating the overseas marketing launch for the new tablet?",
          opts: [
            { key: "A", text: "The tablet has ten hours of battery life." },
            { key: "B", text: "Ms. Alvarez from the international team is leading it." },
            { key: "C", text: "In thirty-five retail stores." }
          ],
          a: "B" as const,
          exp: "🎯 **Đáp án đúng: B** (Ms. Alvarez from the international team is leading it.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Ai đang điều phối chiến dịch ra mắt tiếp thị tại nước ngoài cho máy tính bảng mới?\n- (A) Máy tính bảng có thời lượng pin 10 tiếng. (Sai nội dung)\n- (B) Bà Alvarez từ nhóm quốc tế đang dẫn dắt dự án. (Đúng: chỉ đích danh người phụ trách)\n- (C) Tại 35 cửa hàng bán lẻ. (Sai: trả lời cho Where)\n\n💡 **Từ vựng trọng tâm:**\n- `coordinate a launch` (/kəʊˈɔːdɪneɪt ə lɔːntʃ/): điều phối chiến dịch ra mắt\n- `overseas marketing` (/ˌəʊvəˈsiːz ˈmɑːkɪtɪŋ/): tiếp thị thị trường nước ngoài"
        },
        {
          q: "When will the regional branch audit report be ready?",
          opts: [
            { key: "A", text: "We checked fourteen accounts." },
            { key: "B", text: "The audit office is on Floor 2." },
            { key: "C", text: "Right before the executive committee meeting on Thursday." }
          ],
          a: "C" as const,
          exp: "🎯 **Đáp án đúng: C** (Right before the executive committee meeting on Thursday.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Khi nào báo cáo kiểm toán chi nhánh khu vực sẽ hoàn tất?\n- (A) Chúng tôi đã kiểm tra 14 tài khoản. (Sai nội dung)\n- (B) Văn phòng kiểm toán ở Tầng 2. (Sai: trả lời cho Where)\n- (C) Ngay trước cuộc họp của ban điều hành vào thứ Năm. (Đúng: mốc thời gian hoàn thành)\n\n💡 **Từ vựng trọng tâm:**\n- `audit report` (/ˈɔːdɪt rɪˈpɔːt/): báo cáo kiểm toán\n- `executive committee` (/ɪɡˈzɛkjətɪv kəˈmɪti/): ban điều hành cấp cao"
        },
        {
          q: "Why was the flight from Chicago delayed by two hours?",
          opts: [
            { key: "A", text: "Severe thunderstorm activity over Lake Michigan." },
            { key: "B", text: "At Gate C-14." },
            { key: "C", text: "The ticket cost three hundred dollars." }
          ],
          a: "A" as const,
          exp: "🎯 **Đáp án đúng: A** (Severe thunderstorm activity over Lake Michigan.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Tại sao chuyến bay từ Chicago lại bị hoãn hai tiếng?\n- (A) Do hoạt động bão sấm sét dữ dội trên hồ Michigan. (Đúng: giải thích nguyên nhân thời tiết)\n- (B) Tại Cổng C-14. (Sai: trả lời cho Where)\n- (C) Vé có giá 300 đô la. (Sai: trả lời cho How much)\n\n💡 **Từ vựng trọng tâm:**\n- `delayed by two hours` (/dɪˈleɪd/): bị hoãn 2 tiếng\n- `severe thunderstorm` (/sɪˈvɪər ˈθʌndəstɔːm/): bão sấm sét dữ dội"
        },
        {
          q: "Would you prefer to review the sales figures now or during lunch?",
          opts: [
            { key: "A", text: "The sandwich was delicious." },
            { key: "B", text: "Let's look over them now while our schedules are clear." },
            { key: "C", text: "Over three hundred units sold." }
          ],
          a: "B" as const,
          exp: "🎯 **Đáp án đúng: B** (Let's look over them now while our schedules are clear.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Bạn muốn xem lại các số liệu bán hàng bây giờ hay trong bữa trưa?\n- (A) Bánh sandwich rất ngon. (Sai ngữ cảnh)\n- (B) Hãy xem ngay bây giờ khi lịch trình của chúng ta đang trống. (Đúng: chọn phương án 'bây giờ')\n- (C) Hơn 300 sản phẩm đã được bán. (Sai nội dung)\n\n⚠️ **Phân tích bẫy thi ETS:** Câu hỏi lựa chọn 'A or B' yêu cầu chọn 1 trong 2 phương án hoặc đưa ra phương án thay thế.\n\n💡 **Từ vựng trọng tâm:**\n- `review sales figures` (/rɪˈvjuː seɪlz ˈfɪɡəz/): xem lại số liệu doanh số\n- `schedule is clear` (/ˈskɛdʒuːl ɪz klɪər/): lịch trình đang rảnh rỗi"
        },
        {
          q: "Has the graphic designer submitted the finalized promotional brochure?",
          opts: [
            { key: "A", text: "The brochure is twelve pages long." },
            { key: "B", text: "Printed on matte paper." },
            { key: "C", text: "She just uploaded the high-resolution PDF to the shared drive." }
          ],
          a: "C" as const,
          exp: "🎯 **Đáp án đúng: C** (She just uploaded the high-resolution PDF to the shared drive.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Nhà thiết kế đồ họa đã nộp cuốn tài liệu quảng cáo hoàn thiện chưa?\n- (A) Cuốn tài liệu dài 12 trang. (Sai nội dung)\n- (B) Được in trên giấy mờ. (Sai nội dung)\n- (C) Cô ấy vừa tải tệp PDF độ phân giải cao lên ổ đĩa chung. (Đúng: gián tiếp xác nhận đã nộp)\n\n💡 **Từ vựng trọng tâm:**\n- `promotional brochure` (/prəˈməʊʃənl ˈbrəʊʃər/): cuốn tài liệu quảng cáo\n- `shared drive` (/ʃeəd draɪv/): ổ đĩa chia sẻ nội bộ"
        },
        {
          q: "Why don't we test the audiovisual setup in the auditorium before the keynote?",
          opts: [
            { key: "A", text: "The IT technician is finishing the sound check right now." },
            { key: "B", text: "Over five hundred attendees." },
            { key: "C", text: "The auditorium was renovated last year." }
          ],
          a: "A" as const,
          exp: "🎯 **Đáp án đúng: A** (The IT technician is finishing the sound check right now.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Tại sao chúng ta không kiểm tra hệ thống âm thanh - hình ảnh trong hội trường trước bài phát biểu chính nhỉ?\n- (A) Kỹ thuật viên CNTT đang hoàn tất việc kiểm tra âm thanh ngay lúc này rồi. (Đúng: phản hồi cho lời đề nghị)\n- (B) Hơn 500 người tham dự. (Sai nội dung)\n- (C) Hội trường đã được cải tạo năm ngoái. (Sai nội dung)\n\n💡 **Từ vựng trọng tâm:**\n- `audiovisual setup` (/ˌɔːdiəʊˈvɪʒuəl ˈsɛtʌp/): hệ thống thiết bị nghe nhìn\n- `keynote address` (/ˈkiːnəʊt əˈdrɛs/): bài phát biểu chính của sự kiện"
        },
        {
          q: "How much did the company spend on cloud server hosting last quarter?",
          opts: [
            { key: "A", text: "In the Dublin data center." },
            { key: "B", text: "Approximately forty-five thousand dollars." },
            { key: "C", text: "Our uptime was 99.9%." }
          ],
          a: "B" as const,
          exp: "🎯 **Đáp án đúng: B** (Approximately forty-five thousand dollars.)\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** Công ty đã chi bao nhiêu cho dịch vụ lưu trữ máy chủ đám mây vào quý trước?\n- (A) Tại trung tâm dữ liệu Dublin. (Sai: trả lời cho Where)\n- (B) Khoảng bốn mươi lăm nghìn đô la. (Đúng: chỉ số tiền chi phí)\n- (C) Thời gian hoạt động liên tục của chúng tôi đạt 99,9%. (Sai nội dung)\n\n💡 **Từ vựng trọng tâm:**\n- `cloud server hosting` (/klaʊd ˈsɜːvər ˈhəʊstɪŋ/): dịch vụ lưu trữ máy chủ đám mây\n- `approximately` (/əˈprɒksɪmətli/): xấp xỉ, khoảng chừng"
        }
      ];

      miniP2.forEach((item, idx) => {
        const qNum = idx + 5;
        qs.push({
          id: `tms1_q${qNum}`,
          partNumber: 2,
          partTitle: "Mini Part 2: Question-Response",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 4) + 1}.mp3`,
          passageText: `[Audio Transcript - Question ${qNum}]\nQuestion: "${item.q}"\n(A) ${item.opts[0].text}\n(B) ${item.opts[1].text}\n(C) ${item.opts[2].text}`,
          questionText: `Question ${qNum}: Listen and choose the best response.`,
          options: [
            { key: "A", text: item.opts[0].text },
            { key: "B", text: item.opts[1].text },
            { key: "C", text: item.opts[2].text },
            { key: "D", text: "(Not Applicable in Part 2)" }
          ],
          correctAnswer: item.a,
          explanation: item.exp
        });
      });

      // PART 3 (Q13-Q18: 2 Dialogues × 3 Questions = 6 Questions)
      const miniP3 = [
        {
          dialogue: "Man: Good morning, Jennifer. Have you received the updated safety inspection report for Warehouse 4?\nWoman: Yes, Brian. The fire marshal identified two blocked emergency exit aisles in the packaging zone. We need to clear those corridors before Friday's reinspection.\nMan: I will have the warehouse logistics crew relocate the excess pallet stacks to Storage Bay B this afternoon.\nWoman: Great. I will notify the municipal inspector so he can schedule the final walkthrough for 10:00 AM on Friday.",
          questions: [
            { q: "What problem was identified in Warehouse 4?", opts: [{ key: "A", text: "Two blocked emergency exit aisles in packaging" }, { key: "B", text: "A broken elevator motor" }, { key: "C", text: "A water pipe leak" }, { key: "D", text: "Power outage in cold storage" }], a: "A" as const, exp: "Vấn đề: 'two blocked emergency exit aisles in the packaging zone'." },
            { q: "What will the man have the logistics crew do?", opts: [{ key: "A", text: "Install smoke detectors" }, { key: "B", text: "Relocate excess pallet stacks to Storage Bay B" }, { key: "C", text: "Paint the floor yellow" }, { key: "D", text: "Lock the warehouse gates" }], a: "B" as const, exp: "Hành động: 'relocate the excess pallet stacks to Storage Bay B'." },
            { q: "When is the reinspection walkthrough scheduled?", opts: [{ key: "A", text: "Today at 2:00 PM" }, { key: "B", text: "Next Monday morning" }, { key: "C", text: "Friday at 10:00 AM" }, { key: "D", text: "In two weeks" }], a: "C" as const, exp: "Lịch tái kiểm tra: '10:00 AM on Friday'." }
          ]
        },
        {
          dialogue: "Woman: Mr. Davies, our client from Tokyo just confirmed that they want to accelerate the software deployment by two weeks.\nMan: That is ambitious! To meet that timeline, our frontend engineering team will need temporary contractor reinforcements.\nWoman: I will contact TechTalent Recruiters to onboard three specialized React developers by Monday morning.\nMan: Perfect. Please also arrange an all-hands project alignment meeting for 9:30 AM on Monday.",
          questions: [
            { q: "What request did the Tokyo client make?", opts: [{ key: "A", text: "Cancel the software project" }, { key: "B", text: "Reduce the contract budget" }, { key: "C", text: "Change the project manager" }, { key: "D", text: "Accelerate software deployment by two weeks" }], a: "D" as const, exp: "Yêu cầu: 'accelerate the software deployment by two weeks'." },
            { q: "How will the woman resolve the staffing requirement?", opts: [{ key: "A", text: "By hiring three specialized React contractor developers" }, { key: "B", text: "By outsourcing to another country" }, { key: "C", text: "By canceling employee vacations" }, { key: "D", text: "By using automated AI coding bots exclusively" }], a: "A" as const, exp: "Giải pháp nhân sự: 'onboard three specialized React developers by Monday morning'." },
            { q: "What is scheduled for 9:30 AM on Monday?", opts: [{ key: "A", text: "A client contract signing" }, { key: "B", text: "An all-hands project alignment meeting" }, { key: "C", text: "A software launch party" }, { key: "D", text: "A hardware server reboot" }], a: "B" as const, exp: "Sự kiện sáng thứ Hai: 'all-hands project alignment meeting for 9:30 AM'." }
          ]
        }
      ];

      let mP3Q = 13;
      miniP3.forEach((set, sIdx) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tms1_q${mP3Q}`,
            partNumber: 3,
            partTitle: "Mini Part 3: Conversations",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(sIdx % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Conversation #${sIdx + 1}]\n${set.dialogue}`,
            questionText: `Question ${mP3Q}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          mP3Q++;
        });
      });

      // PART 4 (Q19-Q20: 1 Short Talk × 2 Questions)
      const miniP4 = {
        transcript: "Attention all passengers waiting for flight UA-882 to San Francisco. Boarding will commence in approximately ten minutes through Gate 34B. We will begin boarding with passengers requiring special assistance, followed by Active Military and Premier 1K members. Please have your digital mobile boarding pass and government photo ID ready for gate scanning. Complimentary carry-on bag gate-checking is available for passengers in Groups 4 and 5.",
        questions: [
          { q: "Which flight is preparing for boarding?", opts: [{ key: "A", text: "Flight AA-104 to Chicago" }, { key: "B", text: "Flight DL-330 to Atlanta" }, { key: "C", text: "Flight UA-882 to San Francisco" }, { key: "D", text: "Flight BA-178 to London" }], a: "C" as const, exp: "Chuyến bay: 'flight UA-882 to San Francisco'." },
          { q: "What should passengers have ready for gate scanning?", opts: [{ key: "A", text: "Credit card only" }, { key: "B", text: "Vaccine certificate" }, { key: "C", text: "Paper luggage claim tags" }, { key: "D", text: "Digital mobile boarding pass and government photo ID" }], a: "D" as const, exp: "Giấy tờ cần xuất trình: 'digital mobile boarding pass and government photo ID'." }
        ]
      };

      miniP4.questions.forEach((qItem, idx) => {
        const qNum = idx + 19;
        qs.push({
          id: `tms1_q${qNum}`,
          partNumber: 4,
          partTitle: "Mini Part 4: Short Talks",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          passageText: `[Audio Transcript - Talk]\n${miniP4.transcript}`,
          questionText: `Question ${qNum}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // PART 5 (Q21-Q35: 15 Questions)
      const miniP5 = [
        { q: "Ms. Tanaka _______ presented the third-quarter regional sales analysis to the board.", a: "C" as const, opts: [{ key: "A", text: "success" }, { key: "B", text: "successful" }, { key: "C", text: "successfully" }, { key: "D", text: "succeed" }], exp: "Trạng từ 'successfully' bổ nghĩa cho động từ 'presented'." },
        { q: "The technical maintenance crew worked _______ to restore network connectivity before business hours.", a: "A" as const, opts: [{ key: "A", text: "diligently" }, { key: "B", text: "diligent" }, { key: "C", text: "diligence" }, { key: "D", text: "more diligent" }], exp: "Trạng từ 'diligently' bổ nghĩa cho động từ 'worked'." },
        { q: "All conference participants must display their identification badges _______ on premises.", a: "B" as const, opts: [{ key: "A", text: "during" }, { key: "B", text: "while" }, { key: "C", text: "between" }, { key: "D", text: "since" }], exp: "Liên từ 'while' đi với cụm giới từ 'on premises'." },
        { q: "The human resources department has recently _______ new guidelines regarding remote work eligibility.", a: "C" as const, opts: [{ key: "A", text: "implement" }, { key: "B", text: "implementation" }, { key: "C", text: "implemented" }, { key: "D", text: "implementing" }], exp: "Hiện tại hoàn thành 'has recently implemented'." },
        { q: "Please confirm your hotel reservation details _______ checking in at the front desk.", a: "D" as const, opts: [{ key: "A", text: "except" }, { key: "B", text: "despite" }, { key: "C", text: "unless" }, { key: "D", text: "before" }], exp: "Giới từ 'before' + V-ing mang nghĩa trước khi nhận phòng." },
        { q: "The regional branch manager commended the sales team for their _______ performance this quarter.", a: "A" as const, opts: [{ key: "A", text: "exceptional" }, { key: "B", text: "exceptionally" }, { key: "C", text: "exception" }, { key: "D", text: "except" }], exp: "Tính từ 'exceptional' (xuất sắc) bổ nghĩa cho 'performance'." },
        { q: "Shipments to international destinations may require _______ export documentation.", a: "B" as const, opts: [{ key: "A", text: "addition" }, { key: "B", text: "additional" }, { key: "C", text: "additionally" }, { key: "D", text: "additive" }], exp: "Tính từ 'additional' bổ nghĩa cho 'documentation'." },
        { q: "The new software update significantly improves the _______ of data processing workflows.", a: "C" as const, opts: [{ key: "A", text: "efficient" }, { key: "B", text: "efficiently" }, { key: "C", text: "efficiency" }, { key: "D", text: "efficiencies" }], exp: "Danh từ không đếm được 'efficiency' sau mạo từ 'the'." },
        { q: "Flight departures were temporarily grounded _______ dense fog across the metropolitan runway.", a: "D" as const, opts: [{ key: "A", text: "in order to" }, { key: "B", text: "as well as" }, { key: "C", text: "even though" }, { key: "D", text: "due to" }], exp: "Cụm giới từ 'due to' chỉ nguyên nhân do sương mù dày đặc." },
        { q: "The financial advisor recommended that the client _______ their investment portfolio.", a: "A" as const, opts: [{ key: "A", text: "diversify" }, { key: "B", text: "diversification" }, { key: "C", text: "diverse" }, { key: "D", text: "diversified" }], exp: "Cấu trúc giả định thức 'recommended that + S + V-inf': 'diversify'." },
        { q: "Neither the design architect _______ the lead structural engineer detected the blueprint flaw.", a: "B" as const, opts: [{ key: "A", text: "or" }, { key: "B", text: "nor" }, { key: "C", text: "and" }, { key: "D", text: "both" }], exp: "Cặp liên từ tương quan 'Neither ... nor ...'." },
        { q: "The product warranty covers repair costs _______ that the item was purchased from an authorized retailer.", a: "C" as const, opts: [{ key: "A", text: "regarding" }, { key: "B", text: "concerning" }, { key: "C", text: "provided" }, { key: "D", text: "instead" }], exp: "Liên từ 'provided that' mang nghĩa 'với điều kiện là'." },
        { q: "Our corporate headquarters is located _______ walking distance of the central metro station.", a: "D" as const, opts: [{ key: "A", text: "among" }, { key: "B", text: "beyond" }, { key: "C", text: "across" }, { key: "D", text: "within" }], exp: "Cụm thành ngữ 'within walking distance of' (trong tầm đi bộ)." },
        { q: "The committee reached a _______ decision to approve the annual sustainability initiative.", a: "A" as const, opts: [{ key: "A", text: "unanimous" }, { key: "B", text: "unanimously" }, { key: "C", text: "unanimity" }, { key: "D", text: "unanimousness" }], exp: "Tính từ 'unanimous' (nhất trí tuyệt đối) bổ nghĩa cho 'decision'." },
        { q: "Employees seeking tuition reimbursement must submit grades _______ thirty days of course completion.", a: "B" as const, opts: [{ key: "A", text: "during" }, { key: "B", text: "within" }, { key: "C", text: "since" }, { key: "D", text: "among" }], exp: "Giới từ 'within thirty days' mang nghĩa trong vòng 30 ngày." }
      ];

      miniP5.forEach((qItem, idx) => {
        const qNum = idx + 21;
        qs.push({
          id: `tms1_q${qNum}`,
          partNumber: 5,
          partTitle: "Mini Part 5: Incomplete Sentences",
          section: "READING",
          questionText: `Question ${qNum}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // PART 6 (Q36-Q40: 5 Questions)
      const miniP6Passage = "IT SYSTEM MAINTENANCE NOTICE\nTO: All Global Operations Staff\nFROM: Enterprise Infrastructure Team\nDATE: October 24, 2026\nSUBJECT: Scheduled Core Data Center Maintenance Window\n\nPlease be advised that IT Infrastructure will perform essential server firmware upgrades and database migrations this weekend to _______ [36] corporate network bandwidth.\n\nDuring this scheduled maintenance window, all remote access VPN portals, client billing systems, and cloud file repositories will be temporarily _______ [37] from Saturday, October 28 at 8:00 PM until Sunday, October 29 at 4:00 AM.\n\nAll staff members are strongly urged to save and check in all active code repositories _______ [38] 7:30 PM on Saturday.\n\n_______ [39]. We apologize for any inconvenience.\n\nNormal network connectivity is scheduled to resume _______ [40] 5:00 AM on Sunday.";

      const miniP6Questions = [
        { blank: 36, q: "Select the best word for blank [36].", opts: [{ key: "A", text: "expand" }, { key: "B", text: "expanding" }, { key: "C", text: "expansion" }, { key: "D", text: "expanded" }], a: "A" as const, exp: "Sau 'to' cần động từ nguyên thể 'expand'." },
        { blank: 37, q: "Select the best word for blank [37].", opts: [{ key: "A", text: "unavailability" }, { key: "B", text: "unavailable" }, { key: "C", text: "unavailably" }, { key: "D", text: "unavail" }], a: "B" as const, exp: "Tính từ 'unavailable' sau 'will be temporarily'." },
        { blank: 38, q: "Select the best word for blank [38].", opts: [{ key: "A", text: "since" }, { key: "B", text: "except" }, { key: "C", text: "prior to" }, { key: "D", text: "during" }], a: "C" as const, exp: "'Prior to + time' = trước 7:30 tối thứ Bảy." },
        { blank: 39, q: "Select the most appropriate sentence for blank [39].", opts: [{ key: "A", text: "The cafeteria lunch menu has been posted on the bulletin board." }, { key: "B", text: "The annual holiday party is scheduled for December." }, { key: "C", text: "Parking fees will increase starting next month." }, { key: "D", text: "Emergency technical support will remain available via the on-call helpdesk phone." }], a: "D" as const, exp: "Câu D cung cấp thông tin đường dây trực kỹ thuật khẩn cấp khi hệ thống bảo trì." },
        { blank: 40, q: "Select the best word for blank [40].", opts: [{ key: "A", text: "promptly at" }, { key: "B", text: "while" }, { key: "C", text: "among" }, { key: "D", text: "between" }], a: "A" as const, exp: "'Promptly at + time' = đúng 5:00 sáng Chủ Nhật." }
      ];

      miniP6Questions.forEach((qItem) => {
        qs.push({
          id: `tms1_q${qItem.blank}`,
          partNumber: 6,
          partTitle: "Mini Part 6: Text Completion",
          section: "READING",
          passageText: miniP6Passage,
          questionText: `${qItem.blank}. ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // PART 7 (Q41-Q50: 10 Questions = 1 Single + 1 Double Passage)
      // Single (Q41-Q45)
      const miniP7Single = "[PRESS RELEASE]\n\nAPEX CYBERSECURITY ANNOUNCES NEW EUROPEAN HEADQUARTERS IN DUBLIN\nDUBLIN, IRELAND — October 25, 2026\n\nApex Cybersecurity Solutions, an international leader in enterprise cloud data protection, today officially opened its new 85,000-square-foot European Regional Headquarters in Dublin's Silicon Docks technology district. The state-of-the-art facility will serve as the operational hub for Apex's Threat Intelligence and 24/7 Security Operations Center (SOC) servicing over 1,200 enterprise clients across Europe, the Middle East, and Africa (EMEA).\n\nThe new facility represents a €60 million direct foreign investment and will create 450 high-skilled engineering, threat analysis, and customer success positions over the next 24 months. CEO Marcus Thornton commented, 'Dublin offers an exceptional ecosystem of multilingual technical talent and world-class academic research partnerships that will accelerate our next-generation automated threat defense solutions.'";

      const miniP7SingleQuestions = [
        { qNum: 41, q: "Where is Apex Cybersecurity's new European headquarters located?", opts: [{ key: "A", text: "London, UK" }, { key: "B", text: "Silicon Docks, Dublin, Ireland" }, { key: "C", text: "Frankfurt, Germany" }, { key: "D", text: "Amsterdam, Netherlands" }], a: "B" as const, exp: "Địa điểm: 'Silicon Docks technology district in Dublin, Ireland'." },
        { qNum: 42, q: "How large is the new Dublin facility?", opts: [{ key: "A", text: "25,000 sq ft" }, { key: "B", text: "50,000 sq ft" }, { key: "C", text: "85,000 square feet" }, { key: "D", text: "150,000 sq ft" }], a: "C" as const, exp: "Diện tích: '85,000-square-foot European Regional Headquarters'." },
        { qNum: 43, q: "How much did Apex invest in the new facility?", opts: [{ key: "A", text: "€20 million" }, { key: "B", text: "€40 million" }, { key: "C", text: "€100 million" }, { key: "D", text: "€60 million direct foreign investment" }], a: "D" as const, exp: "Vốn đầu tư: '€60 million direct foreign investment'." },
        { qNum: 44, q: "How many jobs will be created over the next 24 months?", opts: [{ key: "A", text: "450 high-skilled engineering and threat analysis positions" }, { key: "B", text: "150 jobs" }, { key: "C", text: "300 jobs" }, { key: "D", text: "1,000 jobs" }], a: "A" as const, exp: "Số lượng việc làm: 'create 450 high-skilled engineering, threat analysis, and customer success positions'." },
        { qNum: 45, q: "How many enterprise clients does the Security Operations Center service?", opts: [{ key: "A", text: "350 clients" }, { key: "B", text: "Over 1,200 enterprise clients" }, { key: "C", text: "750 clients" }, { key: "D", text: "5,000 clients" }], a: "B" as const, exp: "Số lượng khách hàng doanh nghiệp: 'servicing over 1,200 enterprise clients across EMEA'." }
      ];

      miniP7SingleQuestions.forEach((qItem) => {
        qs.push({
          id: `tms1_q${qItem.qNum}`,
          partNumber: 7,
          partTitle: "Mini Part 7: Reading Comprehension",
          section: "READING",
          passageText: miniP7Single,
          questionText: `${qItem.qNum}. ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // Double (Q46-Q50)
      const miniP7Double = "[EMAIL 1 — CATERING SERVICE INQUIRY]\nFrom: sarah.jenkins@novabiotech.com\nTo: events@gourmetbistro.com\nDate: October 18, 2026\nSubject: Catering Request — Annual Biotech Milestone Gala (Nov 20)\n\nDear Gourmet Bistro Catering Team,\n\nNovaBiotech will host our Annual Milestone Gala on Friday, November 20th at the Grand View Ballroom in Seattle. We anticipate 180 guests and would like to request a formal proposal for a 3-course plated dinner service.\n\nPlease note the following dietary preferences:\n• 25 vegetarian/vegan guests (dairy-free and nut-free)\n• 15 gluten-free meals\n\nPlease confirm your menu options, pricing per guest, and deposit requirements.\n\nSincerely,\nSarah Jenkins, Event Director\n\n---\n\n[EMAIL 2 — FORMAL CATERING PROPOSAL]\nFrom: marcus.vance@gourmetbistro.com\nTo: sarah.jenkins@novabiotech.com\nDate: October 19, 2026\nSubject: RE: Catering Proposal #GB-4491 — NovaBiotech Gala (Nov 20)\n\nDear Ms. Jenkins,\n\nThank you for choosing Gourmet Bistro Catering! We are delighted to submit our proposal for your November 20th event:\n\n• 3-Course Plated Dinner: $65 per guest x 180 guests = $11,700.00\n• Dedicated Server & Chef Service Staff (8 staff x 5 hours): $1,600.00\n• Full Bar Service Package: $20 per guest x 180 guests = $3,600.00\n\nSubtotal: $16,900.00\nService Charge & Municipal Tax (18%): $3,042.00\nTotal Package Amount: $19,942.00\nRequired Deposit (25% due upon contract signing): $4,985.50\n\nWe fully accommodate all 25 vegan/dairy-free and 15 gluten-free meals with our Executive Chef's custom allergen-safe culinary creations at no extra surcharge.\n\nBest regards,\nMarcus Vance, Lead Event Coordinator";

      const miniP7DoubleQuestions = [
        { qNum: 46, q: "What event is Sarah Jenkins planning?", opts: [{ key: "A", text: "A summer corporate picnic" }, { key: "B", text: "A small employee retirement lunch" }, { key: "C", text: "The Annual Biotech Milestone Gala in Seattle" }, { key: "D", text: "A trade expo booth" }], a: "C" as const, exp: "Sự kiện: 'Annual Biotech Milestone Gala on Friday, November 20th at the Grand View Ballroom in Seattle'." },
        { qNum: 47, q: "How many total guests are anticipated at the gala?", opts: [{ key: "A", text: "80 guests" }, { key: "B", text: "120 guests" }, { key: "C", text: "250 guests" }, { key: "D", text: "180 guests" }], a: "D" as const, exp: "Số lượng khách mời: 'anticipate 180 guests'." },
        { qNum: 48, q: "What is the dinner price per guest on the proposal?", opts: [{ key: "A", text: "$65 per guest" }, { key: "B", text: "$45 per guest" }, { key: "C", text: "$85 per guest" }, { key: "D", text: "$100 per guest" }], a: "A" as const, exp: "Đơn giá tiệc/khách: '$65 per guest'." },
        { qNum: 49, q: "Is there an extra surcharge for the special dietary vegan and gluten-free meals?", opts: [{ key: "A", text: "Yes, $10 per meal" }, { key: "B", text: "No, they are provided at no extra surcharge" }, { key: "C", text: "Yes, 18% additional fee" }, { key: "D", text: "Guests must bring their own food" }], a: "B" as const, exp: "Phí phụ thu đồ ăn kiêng: 'at no extra surcharge'." },
        { qNum: 50, q: "How much deposit is required upon signing the catering contract?", opts: [{ key: "A", text: "$1,600.00" }, { key: "B", text: "$3,042.00" }, { key: "C", text: "$4,985.50 (25% deposit)" }, { key: "D", text: "$19,942.00" }], a: "C" as const, exp: "Tiền đặt cọc hợp đồng 25%: '$4,985.50'." }
      ];

      miniP7DoubleQuestions.forEach((qItem) => {
        qs.push({
          id: `tms1_q${qItem.qNum}`,
          partNumber: 7,
          partTitle: "Mini Part 7: Reading Comprehension",
          section: "READING",
          passageText: miniP7Double,
          questionText: `${qItem.qNum}. ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      return qs;
    })()
  };

import { ExamPaper, ExamQuestion } from "./types";

export const ieltsWritingMaster01Paper: ExamPaper = {
  id: "ielts_writing_master_01",
  title: "IELTS Academic Writing Task 1 & Task 2 #01",
  type: "IELTS_WRITING",
  level: "Advanced",
  timeLimitMinutes: 60,
  totalQuestions: 2,
  maxScore: 9.0,
  description:
    "Bộ thi chuyên sâu IELTS Writing Task 1 (Biểu đồ năng lượng tái tạo) & Task 2 (Bài luận Giáo dục Đại học) tích hợp Gemini AI chấm 4 tiêu chí chuẩn Cambridge.",
  categoryBadge: "IELTS Writing",
  tags: ["IELTS", "Writing AI", "Task 1 Data", "Task 2 Discursive", "Band 9.0 Standard"],
  supportedSkills: ["WRITING"],
  questions: [
    {
      id: "iwm1_q1",
      partNumber: 1,
      partTitle: "Task 1: Academic Report — Renewable Energy Generation (2015-2025)",
      section: "WRITING",
      writingPrompt:
        "The bar chart below compares renewable electricity output (in Terawatt-hours, TWh) across Germany, China, the United States, and Brazil between 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Suggested time: 20 minutes).",
      minWordCount: 150,
      sampleEssay: `The bar chart illustrates the volume of renewable electricity generated, measured in Terawatt-hours (TWh), across four distinct nations—Germany, China, the United States, and Brazil—over a ten-year timeframe spanning from 2015 to 2025.

Overall, renewable energy output witnessed an upward trajectory in all four surveyed countries throughout the decade. China established an overwhelming dominance by generating the highest volume by a substantial margin, whereas Germany recorded the lowest absolute generation figures despite steady expansion.

In 2015, China led the group with approximately 500 TWh of renewable electricity, followed by the United States at roughly 350 TWh. Brazil and Germany generated considerably smaller amounts, at 220 TWh and 140 TWh respectively. Over the subsequent decade, China experienced exponential growth, tripling its output to reach a staggering 1,500 TWh by 2025.

The United States also demonstrated robust growth, nearly doubling its generation to approximately 680 TWh in 2025. In contrast, Brazil's renewable production expanded moderately to 380 TWh, while Germany's output climbed to 290 TWh by the end of the period.`,
      questionText:
        "Task 1: Write an academic report (min 150 words) summarizing and comparing renewable energy generation data across 4 nations.",
      options: [
            { key: "A", text: "Submit Task 1 Report for Gemini AI Evaluation" },
            { key: "B", text: "Check Task 1 4-Paragraph Academic Checklist" },
            { key: "C", text: "Review Band 9.0 Comparative Collocations" },
            { key: "D", text: "Skip to Task 2 Discursive Essay" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT 4 TIÊU CHÍ CAMBRIDGE TASK 1]
1. Task Achievement (TA):
   - Đoạn Mở bài: Paraphrase hoàn chỉnh đề bài bằng cấu trúc "The bar chart illustrates the volume of... over a ten-year timeframe spanning from...".
   - Đoạn Overview (Bắt buộc): Nêu 2 đặc điểm bao quát (tất cả các nước đều tăng; Trung Quốc dẫn đầu áp đảo, Đức thấp nhất). KHÔNG đưa số liệu chi tiết vào Overview.
   - Thân bài 1 & 2: Gom nhóm số liệu thông minh (Nhóm dẫn đầu: China/US; Nhóm thấp hơn: Brazil/Germany) kèm số liệu và đơn vị đo (TWh).

2. Coherence & Cohesion (CC):
   - Phân đoạn chuẩn 4 phần rõ ràng.
   - Sử dụng từ nối mạch lạc: "Overall", "In contrast", "whereas", "throughout the decade", "respectively".

3. Lexical Resource (LR):
   - Dùng từ vựng học thuật chỉ xu hướng và tỉ lệ: "upward trajectory", "overwhelming dominance", "substantial margin", "exponential growth", "staggering".

4. Grammatical Range & Accuracy (GRA):
   - Cấu trúc mệnh đề phân từ: "...tripling its output to reach...", "...nearly doubling its generation...".
   - Sử dụng đúng thì Quá khứ đơn (2015-2025).

🔍 [DỊCH NGHĨA BÀI MẪU BAND 9.0]
Biểu đồ cột minh họa sản lượng điện tái tạo, tính bằng Terawatt-giờ (TWh), tại bốn quốc gia riêng biệt—Đức, Trung Quốc, Hoa Kỳ và Brazil—trong khung thời gian mười năm kéo dài từ năm 2015 đến năm 2025.

Nhìn chung, sản lượng năng lượng tái tạo đã chứng kiến quỹ đạo đi lên ở cả bốn quốc gia được khảo sát trong suốt thập kỷ. Trung Quốc đã thiết lập sự thống trị áp đảo khi tạo ra sản lượng cao nhất với khoảng cách đáng kể, trong khi Đức ghi nhận số liệu sản xuất tuyệt đối thấp nhất mặc dù tăng trưởng đều đặn.

Vào năm 2015, Trung Quốc dẫn đầu nhóm với khoảng 500 TWh điện tái tạo, tiếp theo là Hoa Kỳ với khoảng 350 TWh. Brazil và Đức tạo ra lượng nhỏ hơn đáng kể, lần lượt là 220 TWh và 140 TWh. Trong thập kỷ tiếp theo, Trung Quốc trải qua mức tăng trưởng theo cấp số nhân, tăng gấp ba sản lượng để đạt mức kinh ngạc 1.500 TWh vào năm 2025.

Hoa Kỳ cũng chứng tỏ sự tăng trưởng mạnh mẽ, gần như tăng gấp đôi sản lượng lên khoảng 680 TWh vào năm 2025. Ngược lại, sản lượng tái tạo của Brazil tăng vừa phải lên 380 TWh, trong khi sản lượng của Đức tăng lên 290 TWh vào cuối giai đoạn.

💡 [CỤM TỪ VỰNG & CẤU TRÚC THEN CHỐT]
- Upward trajectory /ˈʌp.wɚd trəˈdʒek.tɚ.i/ (n): Quỹ đạo đi lên
- Exponential growth /ˌek.spoʊˈnen.ʃəl ɡroʊθ/ (n): Tăng trưởng theo cấp số nhân
- By a substantial margin /səbˈstæn.ʃəl ˈmɑːr.dʒɪn/ (prep phrase): Với một khoảng cách đáng kể
- Substantially / Considerably / Moderately (adv): Đáng kể / Vừa phải.`
    },
    {
      id: "iwm1_q2",
      partNumber: 2,
      partTitle: "Task 2: Academic Essay — Free Higher Education vs Tuition Fees",
      section: "WRITING",
      writingPrompt:
        "Some people argue that tertiary education should be fully funded by national governments and made accessible free of charge to all citizens. Others believe that university students should pay tuition fees because higher education primarily benefits the individual rather than society as a whole. Discuss both views and give your own opinion. (Write at least 250 words. Suggested time: 40 minutes).",
      minWordCount: 250,
      sampleEssay: `The question of whether university education should be entirely state-funded or financed through individual tuition fees remains a fiercely contested debate in contemporary socioeconomic policy. While proponents of fee-paying models argue that higher education primarily confers private economic returns upon graduates, I firmly advocate that universal, tuition-free tertiary education constitutes a vital public good that accelerates national prosperity and dismantles generational inequality.

On the one hand, advocates of tuition-based systems contend that higher education yields substantial private financial dividends. Empirically, university graduates command significantly higher lifetime earnings, lower unemployment rates, and greater career mobility compared to non-graduates. Consequently, critics argue that using general taxpayer revenues—contributed by all citizens, including working-class individuals who may not attend university—to subsidize degree programs represents an inequitable transfer of wealth. Furthermore, charging tuition ensures that academic institutions maintain financial autonomy and can invest in world-class research infrastructure and competitive faculty salaries.

On the other hand, universal free higher education generates profound societal externalities that far outweigh individual advantages. A highly educated workforce forms the bedrock of modern knowledge economies, driving innovation in medicine, engineering, scientific research, and technological development. When financial barriers to university admission are eradicated, meritocratic social mobility is democratized, enabling talented individuals from socioeconomically disadvantaged backgrounds to realize their potential without the debilitating burden of student loan debt. Countries such as Germany and Norway demonstrate that publicly funded higher education fosters robust technological competitiveness, civic engagement, and social cohesion.

In conclusion, while individual graduates undeniably reap private career benefits from tertiary degrees, the collective socioeconomic rewards of a universally educated populace are vastly superior. Governments should therefore treat higher education as a foundational public investment, ensuring that access is determined by intellectual aptitude rather than financial privilege.`,
      questionText:
        "Task 2: Write a comprehensive discursive essay (min 250 words) discussing both views on university tuition and presenting your own opinion.",
      options: [
            { key: "A", text: "Check 4-Paragraph Academic Discursive Architecture" },
            { key: "B", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "C", text: "Review CEFR C2 Academic Collocations" },
            { key: "D", text: "Complete Full IELTS Writing Test" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT 4 TIÊU CHÍ CAMBRIDGE TASK 2 - BAND 9.0]
1. Task Response (TR):
   - Mở bài: Nêu cả 2 luồng quan điểm và khẳng định rõ lập trường cá nhân (Thesis Statement).
   - Thân bài 1: Phân tích sâu quan điểm ủng hộ đóng học phí (Thu nhập cá nhân cao hơn, công bằng cho người không học đại học, tự chủ tài chính của trường).
   - Thân bài 2: Phân tích quan điểm giáo dục đại học miễn phí (Động lực kinh tế tri thức, xóa bỏ bất bình đẳng thế hệ, dẫn chứng từ Đức và Na Uy).
   - Kết bài: Tóm tắt 2 quan điểm và tái khẳng định giáo dục đại học là "foundational public investment".

2. Coherence & Cohesion (CC):
   - Cặp liên từ đối sánh hoàn hảo: "On the one hand..." / "On the other hand...".
   - Câu chủ đề (Topic Sentences) mở đầu mỗi đoạn mạch lạc, dẫn dắt các luận cứ hỗ trợ logic.

3. Lexical Resource (LR) - Chuẩn C2 Academic:
   - "fiercely contested debate", "private financial dividends", "societal externalities", "meritocratic social mobility", "debilitating burden", "foundational public investment", "intellectual aptitude".

4. Grammatical Range & Accuracy (GRA):
   - Kết hợp câu phức nhượng bộ ("While proponents of... I firmly advocate..."), mệnh đề quan hệ rút gọn, liên từ điều kiện và phân từ.

🔍 [DỊCH NGHĨA BÀI LUẬN BAND 9.0]
Câu hỏi về việc liệu giáo dục đại học nên được nhà nước tài trợ toàn bộ hay được tài trợ thông qua học phí cá nhân vẫn là một cuộc tranh luận gay gắt trong chính sách kinh tế xã hội đương đại. Trong khi những người ủng hộ mô hình trả học phí cho rằng giáo dục đại học chủ yếu mang lại lợi ích kinh tế cá nhân cho sinh viên tốt nghiệp, tôi kiên quyết ủng hộ rằng giáo dục đại học miễn phí phổ quát cấu thành một lợi ích công cộng quan trọng thúc đẩy sự thịnh vượng quốc gia và xóa bỏ bất bình đẳng thế hệ.

Một mặt, những người ủng hộ hệ thống dựa trên học phí cho rằng giáo dục đại học mang lại lợi tức tài chính cá nhân đáng kể. Về mặt thực nghiệm, sinh viên tốt nghiệp đại học có thu nhập trọn đời cao hơn đáng kể, tỷ lệ thất nghiệp thấp hơn và cơ hội thăng tiến nghề nghiệp lớn hơn so với những người không tốt nghiệp. Do đó, những người chỉ trích cho rằng việc sử dụng nguồn thu chung của người nộp thuế để trợ cấp cho các chương trình cấp bằng thể hiện sự chuyển giao của cải không công bằng. Hơn nữa, việc thu học phí đảm bảo rằng các cơ sở học thuật duy trì quyền tự chủ tài chính và có thể đầu tư vào cơ sở hạ tầng nghiên cứu đẳng cấp thế giới.

Mặt khác, giáo dục đại học miễn phí phổ cập tạo ra những ngoại tác xã hội sâu sắc vượt xa lợi ích cá nhân. Lực lượng lao động có học vấn cao tạo nên nền tảng của các nền kinh tế tri thức hiện đại, thúc đẩy đổi mới trong y học, kỹ thuật, nghiên cứu khoa học và phát triển công nghệ. Khi các rào cản tài chính đối với việc nhập học đại học được xóa bỏ, sự dịch chuyển xã hội dựa trên thực tài được dân chủ hóa, cho phép các cá nhân tài năng từ các hoàn cảnh khó khăn nhận ra tiềm năng của họ mà không phải chịu gánh nặng kiệt quệ của nợ vay sinh viên. Các quốc gia như Đức và Na Uy chứng minh rằng giáo dục đại học do nhà nước tài trợ thúc đẩy khả năng cạnh tranh công nghệ, sự gắn kết xã hội mạnh mẽ.

Tóm lại, trong khi các cá nhân tốt nghiệp không thể phủ nhận việc gặt hái những lợi ích nghề nghiệp riêng tư từ bằng đại học, thì những phần thưởng kinh tế xã hội tập thể của một dân số được giáo dục phổ cập là vượt trội hơn nhiều. Do đó, các chính phủ nên coi giáo dục đại học là một khoản đầu tư công nền tảng, đảm bảo rằng việc tiếp cận được quyết định bởi năng lực trí tuệ chứ không phải đặc quyền tài chính.

💡 [CỤM TỪ VỰNG C2 HỌC THUẬT THEN CHỐT]
- Societal externalities /səˈsaɪ.ə.təl ˌek.stɜːˈnæl.ə.tiz/ (n): Ngoại tác xã hội tích cực
- Meritocratic social mobility /ˌmer.ɪ.təˈkræt.ɪk ˈsəʊ.ʃəl məʊˈbɪl.ə.ti/ (n): Sự dịch chuyển xã hội dựa trên thực tài
- Debilitating burden /dɪˈbɪl.ɪ.teɪ.tɪŋ ˈbɜː.dən/ (n): Gánh nặng làm suy nhược/kiệt quệ
- Foundational public investment /faʊnˈdeɪ.ʃən.əl ˈpʌb.lɪk ɪnˈvest.mənt/ (n): Khoản đầu tư công nền tảng
- Intellectual aptitude /ˌɪn.təlˈek.tʃu.əl ˈæp.tɪ.tjuːd/ (n): Năng khiếu/năng lực trí tuệ
- Inequitable transfer of wealth /ɪnˈek.wɪ.tə.bəl ˈtræns.fɜːr/ (n): Sự chuyển giao của cải bất công
- Civic engagement /ˈsɪv.ɪk ɪnˈɡeɪdʒ.mənt/ (n): Sự tham gia của công dân vào đời sống cộng đồng
- Social cohesion /ˈsəʊ.ʃəl kəʊˈhiː.ʒən/ (n): Sự gắn kết xã hội.`
    }
  ]
};

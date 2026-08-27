import { ExamPaper, ExamQuestion } from "./types";

export const toeicLwWorkplace01Paper: ExamPaper = {
  id: "toeic_lw_workplace_01",
  title: "TOEIC Listening & Writing Corporate Duo #01 (58 Questions)",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 75,
  totalQuestions: 58,
  maxScore: 695,
  description: "Trọn bộ kết hợp 2 Kỹ năng Nghe & Viết AI (Listening & Writing Corporate Duo): 50 câu Listening Parts 1-4 (Báo cáo tài chính, Dược phẩm Basel, Tự động hóa sản xuất) và 8 câu Writing AI chuẩn ETS TOEIC 2026 (5 câu ảnh phòng lab & văn phòng, 2 email giải trình ngân sách R&D & hợp đồng cung ứng, 1 bài luận quản trị 300+ từ).",
  categoryBadge: "ETS TOEIC L&W",
  tags: ["TOEIC", "Listening & Writing", "AI Studio", "58 Questions", "Dual Skills"],
  supportedSkills: ["LISTENING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // LISTENING PART 1: Photographs (Q1 - Q3)
    // =========================================================================
    qs.push({
      id: "tlwc1_q1",
      partNumber: 1,
      partTitle: "Listening Part 1: Photographs",
      section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      questionText: "Question 1: Look at the photograph marked No. 1.",
      options: [
            { key: "A", text: "A laboratory researcher is operating a digital spectrometer in a sterile facility." },
            { key: "B", text: "Medical staff are greeting visitors at a hospital reception desk." },
            { key: "C", text: "Construction workers are digging a trench outside the pharmaceutical building." },
            { key: "D", text: "Students are sitting in an auditorium attending a biology lecture." }
          ],
      correctAnswer: "A",
      explanation: "Phương án A miêu tả chính xác nhà nghiên cứu đang thao tác trên máy quang phổ kỹ thuật số trong phòng thí nghiệm vô trùng."
    });

    qs.push({
      id: "tlwc1_q2",
      partNumber: 1,
      partTitle: "Listening Part 1: Photographs",
      section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      questionText: "Question 2: Look at the photograph marked No. 2.",
      options: [
            { key: "A", text: "Workers are assembling cardboard boxes by hand." },
            { key: "B", text: "Robotic automated guided vehicles are transporting pharmaceutical cartons along warehouse aisles." },
            { key: "C", text: "Customers are lining up to purchase prescription medication at a pharmacy counter." },
            { key: "D", text: "Technicians are replacing the light fixtures on a high warehouse ceiling." }
          ],
      correctAnswer: "B",
      explanation: "Phương án B mô tả đúng xe tự hành thông minh đang vận chuyển các thùng dược phẩm trong lối đi nhà kho."
    });

    qs.push({
      id: "tlwc1_q3",
      partNumber: 1,
      partTitle: "Listening Part 1: Photographs",
      section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      questionText: "Question 3: Look at the photograph marked No. 3.",
      options: [
            { key: "A", text: "A chef is demonstrating a culinary technique to restaurant staff." },
            { key: "B", text: "Mechanics are inspecting the underside of a delivery vehicle." },
            { key: "C", text: "Corporate executives are reviewing clinical trial data displayed on a conference screen." },
            { key: "D", text: "Travelers are checking flight schedules on airport monitors." }
          ],
      correctAnswer: "C",
      explanation: "Phương án C miêu tả chính xác các nhà quản lý doanh nghiệp đang phân tích số liệu thử nghiệm lâm sàng trên màn hình phòng họp."
    });

    // =========================================================================
    // LISTENING PART 2: Question-Response (Q4 - Q18: 15 Questions)
    // =========================================================================
    const part2Items = [
      {
        q: "Where will the phase III clinical trial review meeting be convened tomorrow morning?",
        opts: [{ key: "A", text: "Yes, approximately three hundred patients were enrolled." }, { key: "B", text: "In the Basel Biomedical Research Auditorium on the third floor." }, { key: "C", text: "The trial concluded ahead of our initial projections." }], a: "B",
        exp: "Câu hỏi 'Where' -> Phương án B cung cấp địa điểm rõ ràng: Hội trường nghiên cứu y sinh Basel tại tầng 3."
      },
      {
        q: "Who is coordinating the regulatory submission to the European Medicines Agency?",
        opts: [{ key: "A", text: "The entire dossier comprises four thousand pages." }, { key: "B", text: "By courier service before Friday afternoon." }, { key: "C", text: "Dr. Elena Weber from the Compliance and Regulatory Affairs Department." }], a: "C",
        exp: "Câu hỏi 'Who' -> Phương án C chỉ rõ người phụ trách: Tiến sĩ Elena Weber từ phòng Tuân thủ & Pháp chế."
      },
      {
        q: "When can we expect the final pharmacokinetic analysis report from the contract laboratory?",
        opts: [{ key: "A", text: "The lead bioanalytical chemist promised delivery by 3:00 PM today." }, { key: "B", text: "Blood plasma concentrations were monitored continuously." }, { key: "C", text: "Yes, the contract was signed last quarter." }], a: "A",
        exp: "Câu hỏi 'When' -> Phương án A trả lời mốc thời gian cụ thể: trước 3 giờ chiều hôm nay."
      },
      {
        q: "Has the capital expenditure request for the high-throughput sequencer been approved by finance?",
        opts: [{ key: "A", text: "The equipment has a sequencing capacity of 500 gigabases per run." }, { key: "B", text: "Yes, Chief Financial Officer Miller signed off on it during yesterday's budget session." }, { key: "C", text: "We plan to sequence fifty bacterial isolates." }], a: "B",
        exp: "Câu hỏi Yes/No xác nhận -> Phương án B khẳng định CFO Miller đã ký duyệt trong phiên họp ngân sách hôm qua."
      },
      {
        q: "Why was the formulation development timeline extended by an additional two weeks?",
        opts: [{ key: "A", text: "The formulation contains lipid nanoparticle carriers." }, { key: "B", text: "Approximately five milligrams per milliliter." }, { key: "C", text: "Because stability testing revealed minor precipitation at ambient room temperature." }], a: "C",
        exp: "Câu hỏi 'Why' -> Phương án C giải thích nguyên nhân: kiểm tra độ ổn định phát hiện hiện tượng kết tủa nhẹ ở nhiệt độ phòng."
      },
      {
        q: "Would you prefer to present the oncology pipeline update in person or via video conference?",
        opts: [{ key: "A", text: "Presenting in person will allow for more engaging discussion with the board." }, { key: "B", text: "The pipeline contains three monoclonal antibody candidates." }, { key: "C", text: "Yes, the meeting starts at 9:00 AM sharp." }], a: "A",
        exp: "Câu hỏi lựa chọn 'in person or via video' -> Phương án A đưa ra lựa chọn trực tiếp (in person) cùng lý do thuyết phục."
      },
      {
        q: "The patent attorney hasn't finalized the international patent filing claims yet, has she?",
        opts: [{ key: "A", text: "The patent office is located near Munich." }, { key: "B", text: "Actually, she emailed the completed draft claims to our team this morning." }, { key: "C", text: "Intellectual property is vital for biotech firms." }], a: "B",
        exp: "Câu hỏi đuôi phủ định -> Phương án B đính chính thông tin: luật sư đã gửi bản thảo hoàn chỉnh vào sáng nay."
      },
      {
        q: "How many research scientists will be recruited for the new immunotherapy center in Cambridge?",
        opts: [{ key: "A", text: "The facility spans twenty thousand square meters." }, { key: "B", text: "Recruitment commenced in early January." }, { key: "C", text: "Human Resources is currently processing applications for twenty-five positions." }], a: "C",
        exp: "Câu hỏi 'How many' -> Phương án C trả lời đúng số lượng: đang xử lý hồ sơ cho 25 vị trí tuyển dụng."
      },
      {
        q: "Shouldn't we calibrate the mass spectrometer before running the patient blood samples?",
        opts: [{ key: "A", text: "Senior technician Davis completed the five-point calibration protocol an hour ago." }, { key: "B", text: "Patient privacy is strictly safeguarded by federal law." }, { key: "C", text: "The samples were collected on Tuesday." }], a: "A",
        exp: "Câu hỏi đề xuất quy trình -> Phương án A xác nhận kỹ thuật viên Davis đã hoàn tất hiệu chuẩn 5 điểm cách đây 1 giờ."
      },
      {
        q: "Which supplier provides the ultra-pure chromatography solvents for our QC laboratories?",
        opts: [{ key: "A", text: "The purity grade exceeds 99.9 percent HPLC standard." }, { key: "B", text: "Sigma-BioTech Solutions has been our certified vendor under the master contract." }, { key: "C", text: "Solvents must be stored in flammables cabinets." }], a: "B",
        exp: "Câu hỏi 'Which supplier' -> Phương án B nêu rõ tên đối tác: Sigma-BioTech Solutions."
      },
      {
        q: "I'm concerned that the cold chain shipment might experience temperature excursions during international transit.",
        opts: [{ key: "A", text: "Air freight tariffs have risen twelve percent." }, { key: "B", text: "The destination airport is Frankfurt International." }, { key: "C", text: "Each shipping container is fitted with dual redundant GPS and temperature data loggers." }], a: "C",
        exp: "Phản hồi bày tỏ lo ngại -> Phương án C trấn an bằng giải pháp kỹ thuật: lắp bộ ghi nhiệt độ & GPS dự phòng kép."
      },
      {
        q: "What time is the keynote address on personalized oncology scheduled at the Zurich BioSummit?",
        opts: [{ key: "A", text: "Professor Hans Zimmerman will deliver it at 10:15 AM in Grand Hall A." }, { key: "B", text: "Over eight hundred delegates have registered." }, { key: "C", text: "Personalized medicine represents the future of therapy." }], a: "A",
        exp: "Câu hỏi 'What time' -> Phương án A cung cấp chính xác giờ (10:15 AM) và diễn giả."
      },
      {
        q: "Do you know if the cleanroom humidity sensors have been replaced following the scheduled maintenance?",
        opts: [{ key: "A", text: "Cleanrooms operate under ISO Class 5 air cleanliness standards." }, { key: "B", text: "Yes, the facilities engineering crew finished installing the new sensors at noon." }, { key: "C", text: "Relative humidity should remain between 45 and 55 percent." }], a: "B",
        exp: "Câu hỏi xác nhận -> Phương án B xác nhận đội kỹ thuật hạ tầng đã hoàn thành việc lắp cảm biến mới lúc trưa."
      },
      {
        q: "Why didn't the quality assurance team sign off on the batch release certificate for lot B-402?",
        opts: [{ key: "A", text: "The batch consists of fifty thousand tablets." }, { key: "B", text: "Certificates are filed in the electronic document vault." }, { key: "C", text: "Because the dissolution rate test fell slightly below the 95 percent acceptance criterion." }], a: "C",
        exp: "Câu hỏi 'Why' -> Phương án A chỉ ra nguyên nhân kiểm nghiệm: độ hòa tan thấp hơn tiêu chuẩn nghiệm thu 95%."
      },
      {
        q: "Could you send me the updated statistical power calculations for the phase II dosage escalation study?",
        opts: [{ key: "A", text: "I'll attach the biostatistician's summary spreadsheet to an email right away." }, { key: "B", text: "The dosage starts at ten milligrams per kilogram." }, { key: "C", text: "Statistical power should ideally exceed eighty percent." }], a: "A",
        exp: "Lời yêu cầu gửi tài liệu -> Phương án A phản hồi sẵn sàng gửi kèm bảng tính tóm tắt của chuyên viên sinh thống kê ngay lập tức."
      }
    ];

    part2Items.forEach((item, idx) => {
      qs.push({
        id: `tlwc1_q${idx + 4}`,
        partNumber: 2,
        partTitle: "Listening Part 2: Question-Response",
        section: "LISTENING",
        questionText: `Question ${idx + 4}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // LISTENING PART 3: Short Conversations (Q19 - Q36: 6 Convos x 3 Qs = 18 Qs)
    // =========================================================================
    const part3Conversations = [
      {
        passage: `[Audio Transcript - Biotechnology Research Project]\nDr. Aris Thorne: Good morning, Dr. Patel. Have you had an opportunity to examine the preliminary binding affinity data for our lead antibody candidate, AB-702?\nDr. Maya Patel: Yes, I reviewed the surface plasmon resonance assays this morning. The dissociation constant is in the sub-nanomolar range, which indicates exceptional target selectivity.\nDr. Aris Thorne: That is outstanding news. We should accelerate our preparation for the non-human primate toxicology studies scheduled for next quarter.\nDr. Maya Patel: I agree. I will draft the protocol amendments and schedule a alignment meeting with our contract research organization on Thursday.`,
        questions: [
          {
            q: "What scientific data are the speakers discussing?",
            opts: [{ key: "A", text: "Annual laboratory utility budget allocations" }, { key: "B", text: "A patent dispute with an academic institution" }, { key: "C", text: "Architectural blueprints for a new facility" }, { key: "D", text: "Target binding affinity results for a lead antibody candidate" }], a: "D",
            exp: "Nội dung thảo luận: 'preliminary binding affinity data for our lead antibody candidate, AB-702'."
          },
          {
            q: "How does Dr. Patel evaluate the assay results?",
            opts: [{ key: "A", text: "She notes exceptional target selectivity with sub-nanomolar affinity." }, { key: "B", text: "She considers them inconclusive and requests re-testing." }, { key: "C", text: "She expresses concern over toxicity indicators." }, { key: "D", text: "She suggests abandoning the AB-702 candidate." }], a: "A",
            exp: "Đánh giá của Dr. Patel: 'sub-nanomolar range, which indicates exceptional target selectivity'."
          },
          {
            q: "What action will Dr. Patel take on Thursday?",
            opts: [{ key: "A", text: "Submit an emergency grant proposal to the government" }, { key: "B", text: "Meet with the contract research organization to align on protocol amendments" }, { key: "C", text: "Deliver a keynote speech at a medical congress" }, { key: "D", text: "Purchase five additional surface plasmon resonance instruments" }], a: "B",
            exp: "Kế hoạch: 'schedule a alignment meeting with our contract research organization on Thursday'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Pharmaceutical Manufacturing Operations]\nPlant Director: Mark, our quarterly sterile fill-finish yield dropped to 91.4% on Line 3 last month. What specific operational factors contributed to this shortfall?\nMark Evans: We experienced repeated particulate rejection during automated optical inspection. The root cause analysis traced it to friction wear in the vial depyrogenation tunnel conveyor belt.\nPlant Director: Has maintenance replaced the worn conveyor components and recertified the laminar flow clean zone?\nMark Evans: Yes, the engineering team completed installation over the weekend, and all microbial environmental air samplings came back completely clear yesterday.`,
        questions: [
          {
            q: "What operational metric fell below expectations?",
            opts: [{ key: "A", text: "Employee attendance rate" }, { key: "B", text: "Annual raw material procurement costs" }, { key: "C", text: "Sterile fill-finish production yield on Line 3" }, { key: "D", text: "Logistics truck delivery turnaround speed" }], a: "C",
            exp: "Chỉ số bị giảm: 'quarterly sterile fill-finish yield dropped to 91.4% on Line 3'."
          },
          {
            q: "What was identified as the root cause of the problem?",
            opts: [{ key: "A", text: "Operator error during chemical reagent preparation" }, { key: "B", text: "Software malfunction in the label printing system" }, { key: "C", text: "Power outages affecting facility cooling towers" }, { key: "D", text: "Conveyor belt friction wear inside the vial depyrogenation tunnel" }], a: "D",
            exp: "Nguyên nhân gốc rễ: 'friction wear in the vial depyrogenation tunnel conveyor belt'."
          },
          {
            q: "What confirmed that the clean zone is ready for resumed operation?",
            opts: [{ key: "A", text: "Clear microbial environmental air sampling test results" }, { key: "B", text: "Customer approval signatures" }, { key: "C", text: "A reduced corporate insurance premium" }, { key: "D", text: "Delivery of new glass vials from an alternate supplier" }], a: "A",
            exp: "Xác nhận: 'all microbial environmental air samplings came back completely clear yesterday'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Corporate Finance & R&D Budget]\nFinancial Controller: Rachel, I noticed a 7.5% budget overrun in the oncology translational medicine ledger for Q3. We need a formal explanation before the audit committee meeting next Tuesday.\nRachel Vance: The variance was primarily driven by emergency spot purchases of GMP-grade peptide precursors when our primary European supplier declared force majeure due to supply chain disruption.\nFinancial Controller: I understand the necessity, but did you obtain secondary pricing quotes to verify market competitiveness?\nRachel Vance: Yes, we obtained quotes from three qualified international vendors. I will compile the comparative price matrix and justification memo for your committee presentation by tomorrow afternoon.`,
        questions: [
          {
            q: "Why is the Financial Controller requesting a formal explanation?",
            opts: [{ key: "A", text: "Because an employee submitted duplicate expense receipts" }, { key: "B", text: "Because of a 7.5% budget overrun in translational medicine" }, { key: "C", text: "Because clinical trial insurance has expired" }, { key: "D", text: "Because a competitor filed an intellectual property lawsuit" }], a: "B",
            exp: "Lý do: 'noticed a 7.5% budget overrun in the oncology translational medicine ledger'."
          },
          {
            q: "What unexpected event caused the additional expenditure?",
            opts: [{ key: "A", text: "Sudden expansion of office space leases" }, { key: "B", text: "Unforeseen severance payments to departing scientists" }, { key: "C", text: "Primary supplier declaring force majeure, necessitating spot chemical purchases" }, { key: "D", text: "Regulatory fines imposed by the environmental safety agency" }], a: "C",
            exp: "Sự cố: 'primary European supplier declared force majeure due to supply chain disruption'."
          },
          {
            q: "What document will Rachel deliver by tomorrow afternoon?",
            opts: [{ key: "A", text: "A newly negotiated five-year master supply agreement" }, { key: "B", text: "A revised clinical protocol for patient enrollment" }, { key: "C", text: "An executive severance agreement" }, { key: "D", text: "A comparative price matrix and justification memo" }], a: "D",
            exp: "Tài liệu cam kết: 'compile the comparative price matrix and justification memo... by tomorrow afternoon'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Global Supply Chain & Logistics]\nLogistics Director: Greg, our maritime container carrying four cryogenic freezers bound for the Singapore clinical trial hub has been held up at the transshipment port.\nGreg: The port customs authority requested additional dual-use export verification documentation for the ultra-low temperature compressor units.\nLogistics Director: Those freezers are essential for storing patient biological specimens beginning November 1st. Can our customs broker expedite the clearance?\nGreg: I have already transmitted our expedited clearance dossier and technical compliance certificates to the harbor customs superintendent. They indicated clearance within 24 hours.`,
        questions: [
          {
            q: "What cargo is currently experiencing a customs delay?",
            opts: [{ key: "A", text: "Four cryogenic freezers for clinical trial specimen storage" }, { key: "B", text: "Ten metric tonnes of raw active pharmaceutical ingredients" }, { key: "C", text: "Fifty boxes of promotional medical literature" }, { key: "D", text: "Laboratory glassware and protective safety suits" }], a: "A",
            exp: "Hàng hóa bị giữ: 'four cryogenic freezers bound for the Singapore clinical trial hub'."
          },
          {
            q: "Why did customs authorities hold the shipment?",
            opts: [{ key: "A", text: "Failure to pay standard harbor dockage fees" }, { key: "B", text: "Requirement for dual-use export verification on refrigeration compressors" }, { key: "C", text: "A damaged shipping container leaking hydraulic fluid" }, { key: "D", text: "Incorrect consignee address on the cargo airway bill" }], a: "B",
            exp: "Nguyên nhân hải quan: 'requested additional dual-use export verification documentation'."
          },
          {
            q: "When does Greg expect the cargo to be cleared?",
            opts: [{ key: "A", text: "In approximately two weeks" }, { key: "B", text: "After the November 1st deadline" }, { key: "C", text: "Within 24 hours" }, { key: "D", text: "Only upon physical re-inspection next month" }], a: "C",
            exp: "Thời gian xử lý: 'They indicated clearance within 24 hours'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Clinical Operations & Site Selection]\nClinical Operations Lead: Dr. Kowalski, we have shortlisted eight tertiary hospitals across Central Europe for our multicenter phase IIb cardiovascular trial.\nDr. Kowalski: Have all eight sites demonstrated adequate patient recruitment velocity and established electronic health record integration?\nClinical Operations Lead: Six sites met all inclusion benchmarks immediately. However, the university clinics in Prague and Budapest require supplemental staff training on our EDC electronic data capture software.\nDr. Kowalski: Let us dispatch our regional clinical research associates to conduct on-site investigator training workshops next week so that all eight sites can activate simultaneously on December 1st.`,
        questions: [
          {
            q: "How many hospital sites are under evaluation for the clinical trial?",
            opts: [{ key: "A", text: "Four sites" }, { key: "B", text: "Six sites" }, { key: "C", text: "Twelve sites" }, { key: "D", text: "Eight sites" }], a: "D",
            exp: "Số lượng cơ sở: 'shortlisted eight tertiary hospitals across Central Europe'."
          },
          {
            q: "What challenge was identified at the clinics in Prague and Budapest?",
            opts: [{ key: "A", text: "Need for staff training on the electronic data capture (EDC) software" }, { key: "B", text: "Lack of institutional ethics committee approval" }, { key: "C", text: "Inability to maintain sterile specimen storage" }, { key: "D", text: "Budget disputes over physician consulting stipends" }], a: "A",
            exp: "Vấn đề: 'require supplemental staff training on our EDC electronic data capture software'."
          },
          {
            q: "What solution does Dr. Kowalski propose?",
            opts: [{ key: "A", text: "Disqualifying Prague and Budapest from participating" }, { key: "B", text: "Dispatching clinical research associates for on-site training next week" }, { key: "C", text: "Postponing the overall trial initiation by six months" }, { key: "D", text: "Switching from electronic data capture back to paper records" }], a: "B",
            exp: "Giải pháp: 'dispatch our regional clinical research associates to conduct on-site investigator training workshops next week'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Human Resources & Talent Acquisition]\nRecruiter: Mr. Henderson, we conducted first-round panel interviews with five candidates for the Director of Biostatistics position.\nHR Director: Were any candidates particularly strong in Bayesian adaptive clinical trial design?\nRecruiter: Dr. Sophia Al-Mansoor demonstrated exceptional expertise. She spent seven years designing adaptive clinical trials at a leading research hospital in Boston and has authored over twenty peer-reviewed methodology papers.\nHR Director: Excellent. Let us schedule her second-round interview with the Scientific Advisory Board for next Wednesday and prepare a competitive compensation package proposal.`,
        questions: [
          {
            q: "What key technical competency is required for the position?",
            opts: [{ key: "A", text: "High-volume chemical synthesis skills" }, { key: "B", text: "Public relations and crisis communications mastery" }, { key: "C", text: "Expertise in Bayesian adaptive clinical trial design" }, { key: "D", text: "Commercial real estate lease negotiation experience" }], a: "C",
            exp: "Yêu cầu chuyên môn: 'Bayesian adaptive clinical trial design'."
          },
          {
            q: "What notable background does Dr. Sophia Al-Mansoor possess?",
            opts: [{ key: "A", text: "She previously served as chief executive of a medical device manufacturer." }, { key: "B", text: "She worked as an FDA federal compliance inspector for a decade." }, { key: "C", text: "She developed proprietary chemical patent algorithms." }, { key: "D", text: "She has seven years of adaptive trial design experience and 20+ peer-reviewed papers." }], a: "D",
            exp: "Hồ sơ ấn tượng: 'seven years designing adaptive clinical trials... authored over twenty peer-reviewed methodology papers'."
          },
          {
            q: "What is the next step for Dr. Al-Mansoor's candidacy?",
            opts: [{ key: "A", text: "Scheduling an interview with the Scientific Advisory Board next Wednesday" }, { key: "B", text: "Conducting a routine background credit check" }, { key: "C", text: "Inviting her to tour the Asian distribution facility" }, { key: "D", text: "Asking her to retake a standardized statistical examination" }], a: "A",
            exp: "Bước tiếp theo: 'schedule her second-round interview with the Scientific Advisory Board for next Wednesday'."
          }
        ]
      }
    ];

    let p3Num = 19;
    part3Conversations.forEach(convo => {
      convo.questions.forEach(item => {
        qs.push({
          id: `tlwc1_q${p3Num}`,
          partNumber: 3,
          partTitle: "Listening Part 3: Short Conversations",
          section: "LISTENING",
          passageText: convo.passage,
          questionText: `Question ${p3Num}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p3Num++;
      });
    });

    // =========================================================================
    // LISTENING PART 4: Short Talks (Q37 - Q50: 14 Questions)
    // =========================================================================
    const part4Talks = [
      {
        passage: `[Audio Transcript - Annual Shareholders Meeting]\nGood morning, esteemed shareholders, institutional investors, and members of the press. I am delighted to welcome you to the 2026 Annual General Meeting of Apex BioTherapeutics. Today, we are proud to report record financial and scientific performance. Our consolidated net operating revenue surged by eighteen percent year-over-year to 3.4 billion euros, primarily fueled by global commercial adoption of our targeted oncology therapeutic OncoGuard. Furthermore, our strategic reinvestment of twenty-two percent of annual gross revenue into foundational R&D has expanded our clinical pipeline to fourteen active investigational drug candidates across oncology, immunology, and rare genetic metabolic disorders. We project sustained double-digit growth as three pivotal phase III readouts occur throughout the coming fiscal year.`,
        questions: [
          {
            q: "What financial metric increased by eighteen percent?",
            opts: [{ key: "A", text: "Corporate administrative overhead costs" }, { key: "B", text: "Consolidated net operating revenue" }, { key: "C", text: "Executive bonus compensation payouts" }, { key: "D", text: "Manufacturing facility utility expenses" }], a: "B",
            exp: "Chỉ số tài chính tăng 18%: 'consolidated net operating revenue surged by eighteen percent'."
          },
          {
            q: "What percentage of annual gross revenue is reinvested in R&D?",
            opts: [{ key: "A", text: "Ten percent" }, { key: "B", text: "Fifteen percent" }, { key: "C", text: "Twenty-two percent" }, { key: "D", text: "Thirty-five percent" }], a: "C",
            exp: "Tỷ lệ tái đầu tư R&D: 'reinvestment of twenty-two percent of annual gross revenue'."
          },
          {
            q: "How many active clinical drug candidates are in the company pipeline?",
            opts: [{ key: "A", text: "Seven candidates" }, { key: "B", text: "Eleven candidates" }, { key: "C", text: "Twenty-two candidates" }, { key: "D", text: "Fourteen candidates" }], a: "D",
            exp: "Số lượng hoạt chất tiềm năng: 'expanded our clinical pipeline to fourteen active investigational drug candidates'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Facility Safety & Compliance Announcement]\nAttention all laboratory and cleanroom personnel in Building C. This is a mandatory safety notification from the Environmental Health and Safety Directorate. Beginning Monday at 6:00 AM, contractors will commence the annual integrity recertification and HEPA filter replacement for all Biosafety Level 2 and Level 3 laminar flow containment hoods. During this maintenance window, all experimental cell cultures must be transferred into designated secondary cryogenic incubators in Building B. No open chemical handling or biohazardous sample manipulation will be permitted in Building C until final re-validation certificates are posted on Wednesday at 5:00 PM. Please consult your laboratory safety officer for temporary workspace reassignments.`,
        questions: [
          {
            q: "What scheduled maintenance activity will take place in Building C?",
            opts: [{ key: "A", text: "Laminar flow hood integrity recertification and HEPA filter replacement" }, { key: "B", text: "Demolition of the central cafeteria" }, { key: "C", text: "Installation of executive office furnishings" }, { key: "D", text: "Upgrading of the parking lot lighting grid" }], a: "A",
            exp: "Hoạt động bảo trì: 'integrity recertification and HEPA filter replacement for all... laminar flow containment hoods'."
          },
          {
            q: "Where must experimental cell cultures be relocated?",
            opts: [{ key: "A", text: "To off-site commercial storage warehouses" }, { key: "B", text: "To secondary cryogenic incubators in Building B" }, { key: "C", text: "To administrative conference rooms" }, { key: "D", text: "Into outdoor refrigerated transport vans" }], a: "B",
            exp: "Nơi chuyển mẫu tế bào: 'transferred into designated secondary cryogenic incubators in Building B'."
          },
          {
            q: "When will normal laboratory operations in Building C resume?",
            opts: [{ key: "A", text: "Monday at 6:00 AM" }, { key: "B", text: "Tuesday at noon" }, { key: "C", text: "Wednesday at 5:00 PM" }, { key: "D", text: "Friday morning" }], a: "C",
            exp: "Thời gian hoạt động trở lại: 'until final re-validation certificates are posted on Wednesday at 5:00 PM'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Technology Conference Keynote]\nWelcome, esteemed industry delegates, to the European Smart Manufacturing Expo. I am Dr. Marcus Lindqvist, Vice President of Industrial Automation at Nordic BioSystems. Today, I want to share how our implementation of digital twin technology across three major pharmaceutical manufacturing facilities has transformed operational reliability. By deploying over ten thousand IoT vibrational, thermal, and acoustic sensors across our continuous bioprocessing bioreactors, our predictive machine learning algorithms identify mechanical anomalies an average of 120 hours before potential catastrophic failure. Over the past twenty-four months, this initiative has eliminated ninety-four percent of unplanned batch aborts, delivering cumulative cost savings exceeding thirty-six million euros while guaranteeing uninterrupted medication supply for patients worldwide.`,
        questions: [
          {
            q: "What core technological innovation is Dr. Lindqvist discussing?",
            opts: [{ key: "A", text: "Virtual reality training for office receptionists" }, { key: "B", text: "Solar panel installations on company carports" }, { key: "C", text: "Automated billing software for consumer pharmacies" }, { key: "D", text: "Digital twin technology combined with IoT sensor predictive analytics" }], a: "D",
            exp: "Đổi mới công nghệ cốt lõi: 'digital twin technology across three major pharmaceutical manufacturing facilities'."
          },
          {
            q: "How far in advance can mechanical anomalies be detected?",
            opts: [{ key: "A", text: "120 hours" }, { key: "B", text: "24 hours" }, { key: "C", text: "48 hours" }, { key: "D", text: "72 hours" }], a: "A",
            exp: "Thời gian cảnh báo sớm: 'identify mechanical anomalies an average of 120 hours before potential catastrophic failure'."
          },
          {
            q: "What financial benefit was achieved over the past 24 months?",
            opts: [{ key: "A", text: "Ten million euros in tax rebates" }, { key: "B", text: "Cumulative cost savings exceeding thirty-six million euros" }, { key: "C", text: "A fifty percent reduction in employee payroll" }, { key: "D", text: "Five million euros in venture capital funding" }], a: "B",
            exp: "Hiệu quả tài chính: 'cumulative cost savings exceeding thirty-six million euros'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Internal Corporate Radio / Podcast Interview]\nHost: Welcome back to BioTech Insider. Today we are speaking with Chief Sustainability Officer Dr. Beatrice Moreau regarding our company's journey toward zero-carbon manufacturing.\nDr. Moreau: Thank you, Kevin. I am thrilled to announce that as of last month, one hundred percent of electricity consumed across our five European production campuses is sourced from certified on-site solar photovoltaic arrays and long-term offshore wind power purchase agreements. In addition, we have redesigned our primary product packaging, replacing single-use petroleum plastics with ocean-biodegradable seaweed-based polymer blister packs. This singular modification reduces our annual packaging plastic waste by 380 metric tonnes and lowers lifecycle carbon emissions by forty-three percent per finished pharmaceutical unit.`,
        questions: [
          {
            q: "What environmental milestone has the company achieved across European campuses?",
            opts: [{ key: "A", text: "Complete elimination of all paper administrative records." }, { key: "B", text: "Conversion of all executive company cars to diesel engines." }, { key: "C", text: "100% of consumed electricity is sourced from solar and wind renewables." }, { key: "D", text: "A twenty percent reduction in weekly working hours." }], a: "C",
            exp: "Cột mốc môi trường: 'one hundred percent of electricity consumed... is sourced from certified on-site solar... and offshore wind'."
          },
          {
            q: "What material is replacing petroleum plastics in product packaging?",
            opts: [{ key: "A", text: "Recycled aluminum foil" }, { key: "B", text: "Hardwood timber laminates" }, { key: "C", text: "Single-layer petroleum wax paper" }, { key: "D", text: "Ocean-biodegradable seaweed-based polymer" }], a: "D",
            exp: "Vật liệu bao bì mới: 'ocean-biodegradable seaweed-based polymer blister packs'."
          },
          {
            q: "By how much does the new packaging reduce unit lifecycle carbon emissions?",
            opts: [{ key: "A", text: "Forty-three percent" }, { key: "B", text: "Fifteen percent" }, { key: "C", text: "Twenty-eight percent" }, { key: "D", text: "Sixty percent" }], a: "A",
            exp: "Mức giảm phát thải: 'lowers lifecycle carbon emissions by forty-three percent'."
          }
        ]
      },
      {
        passage: `[Audio Transcript - Regulatory Briefing Update]\nGood afternoon, regulatory strategy teams. The US Food and Drug Administration has officially issued its final guidance on Real-World Evidence integration for supplemental drug applications. Key highlights include mandatory prospective data quality audits for patient registries and continuous audit trails for all decentralized clinical telemetry endpoints. All teams preparing 2027 filing dossiers must complete a gap analysis against these newly established federal standards by the end of next month.`,
        questions: [
          {
            q: "What federal regulatory topic was addressed in the briefing?",
            opts: [{ key: "A", text: "New tax incentives for clinical trial volunteer participants" }, { key: "B", text: "FDA final guidance on Real-World Evidence for supplemental drug filings" }, { key: "C", text: "Standardized patent fee structures across North America" }, { key: "D", text: "Workplace ergonomics in pharmaceutical manufacturing" }], a: "B",
            exp: "Chủ đề quy định: 'FDA has officially issued its final guidance on Real-World Evidence integration'."
          },
          {
            q: "By when must teams complete the compliance gap analysis?",
            opts: [{ key: "A", text: "Within one calendar week" }, { key: "B", text: "By December 2028" }, { key: "C", text: "By the end of next month" }, { key: "D", text: "Immediately after the shareholder meeting" }], a: "C",
            exp: "Hạn chót: 'must complete a gap analysis against these newly established federal standards by the end of next month'."
          }
        ]
      }
    ];

    let p4Num = 37;
    part4Talks.forEach(talk => {
      talk.questions.forEach(item => {
        qs.push({
          id: `tlwc1_q${p4Num}`,
          partNumber: 4,
          partTitle: "Listening Part 4: Short Talks",
          section: "LISTENING",
          passageText: talk.passage,
          questionText: `Question ${p4Num}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p4Num++;
      });
    });

    // =========================================================================
    // WRITING SECTION (Q51 - Q58: 8 Questions)
    // =========================================================================
    const writingItems = [
      {
        id: "tlwc1_q51",
        title: "Write a Sentence (Lab Research Photograph)",
        prompt: "Write ONE sentence based on the picture using the two words provided: 'scientist' / 'spectrometer'.",
        sample: "The senior biomedical scientist is meticulously calibrating the high-resolution mass spectrometer inside the sterile research laboratory.",
        minWords: 8
      },
      {
        id: "tlwc1_q52",
        title: "Write a Sentence (Cryogenic Storage Photograph)",
        prompt: "Write ONE sentence based on the picture using the two words provided: 'vial' / 'store'.",
        sample: "Sterile vaccine vials are systematically stored inside ultra-low temperature cryogenic freezers to preserve their biological stability.",
        minWords: 8
      },
      {
        id: "tlwc1_q53",
        title: "Write a Sentence (Executive Boardroom Photograph)",
        prompt: "Write ONE sentence based on the picture using the two words provided: 'executive' / 'discuss'.",
        sample: "Corporate executives are gathered around the boardroom table to discuss the preliminary results of the Phase III clinical trial.",
        minWords: 8
      },
      {
        id: "tlwc1_q54",
        title: "Write a Sentence (Bioreactor Monitoring Photograph)",
        prompt: "Write ONE sentence based on the picture using the two words provided: 'technician' / 'monitor'.",
        sample: "A specialized bioprocess technician is continuously monitoring real-time pH and oxygen telemetry on the digital bioreactor display.",
        minWords: 8
      },
      {
        id: "tlwc1_q55",
        title: "Write a Sentence (Medical Symposium Photograph)",
        prompt: "Write ONE sentence based on the picture using the two words provided: 'delegate' / 'register'.",
        sample: "International medical delegates are registering for the oncology summit at the electronic reception kiosks in the main lobby.",
        minWords: 8
      },
      {
        id: "tlwc1_q56",
        title: "Respond to an Email (R&D Budget Variance Justification)",
        prompt: "Directions: Read the email below from the Corporate Financial Controller. In your response, explain TWO specific operational reasons for the 5% budget variance in the oncology project and request formal authorization for supplemental reagent procurement.\n\nOriginal Email:\nFrom: Dr. Julian Vance, Corporate Financial Controller\nTo: Lead Project Investigator, Oncology R&D\nSubject: Urgent: Q3 Budget Variance in Project OncoGuard\n\nDear Team,\nOur internal financial audit indicates a 5% budget variance in the Q3 translational research account for Project OncoGuard. Please provide a formal explanation regarding the root causes of this deviation and outline any required budgetary adjustments before our executive board briefing on Friday.\n\nBest regards,\nDr. Julian Vance\nCorporate Financial Controller",
        sample: "Dear Dr. Vance,\n\nThank you for bringing this matter to our attention. The 5% budget variance in the Q3 translational research account for Project OncoGuard was driven by two unforeseen operational factors:\n\nFirst, our primary European peptide supplier declared force majeure in August, requiring emergency spot procurement of GMP-grade reagent precursors from alternative certified suppliers at a 15% spot-market premium.\n\nSecond, in response to preliminary binding assays demonstrating exceptional efficacy, we accelerated our secondary surface plasmon resonance validation tests to meet the upcoming FDA pre-IND consultation milestone.\n\nTo ensure uninterrupted continuity for our preclinical toxicology phase, I formally request your approval for a supplemental budgetary allocation of 85,000 euros. All vendor quotations and comparative pricing matrices are attached for your review.\n\nSincerely,\nDr. Maya Patel\nLead Project Investigator, Oncology R&D",
        minWords: 80
      },
      {
        id: "tlwc1_q57",
        title: "Respond to an Email (International Patent Filing Strategy)",
        prompt: "Directions: Read the email from the Head of Intellectual Property. In your response, confirm the filing schedule for the European Patent Office, propose a strategy for Patent Cooperation Treaty (PCT) national phase entries, and ask ONE clarifying question regarding external legal counsel retainer fees.\n\nOriginal Email:\nFrom: Ms. Claudia Sterling, Head of Intellectual Property\nTo: Senior Patent Liaison, Biotechnology Division\nSubject: Filing Schedule for Lead Molecule AB-702 Patent Application\n\nDear Colleague,\nWe are finalizing our global patent protection timeline for the lead monoclonal antibody AB-702. Could you please confirm the European Patent Office filing deadline, summarize our strategy for international territorial coverage, and clarify whether all external advisory costs have been reconciled?\n\nKind regards,\nClaudia Sterling\nHead of Intellectual Property",
        sample: "Dear Ms. Sterling,\n\nI am pleased to confirm that our primary patent application for the lead monoclonal antibody candidate AB-702 is fully on track for submission to the European Patent Office by this Friday, October 24th, well ahead of our statutory priority deadline.\n\nRegarding our broader territorial protection, we recommend initiating the Patent Cooperation Treaty (PCT) pathway immediately, followed by strategic national phase entries across key commercial jurisdictions, specifically the United States, Japan, South Korea, and the United Kingdom. This phased approach will maximize our international exclusivity while staggering translation and prosecution expenses across two fiscal quarters.\n\nCould you please clarify whether the projected external legal advisory fees for the Japanese and South Korean filing agents will be covered under our existing master retainer agreement, or if supplemental purchase orders will be required?\n\nBest regards,\nSenior Patent Liaison\nBiotechnology Division",
        minWords: 80
      },
      {
        id: "tlwc1_q58",
        title: "Opinion Essay (R&D Profit Reinvestment in Science)",
        prompt: "Directions: Do you agree or disagree with the following statement?\n\n'Modern corporations in science and technology sectors should be required to reinvest at least twenty percent of their annual net profits into foundational scientific research and sustainable innovation.'\n\nSupport your position with specific reasons and real-world examples from industry, healthcare, or technological development. Write at least 300 words.",
        sample: "In the contemporary global economy, where relentless technological disruption and emergent public health crises constantly reshape industries, the strategic allocation of corporate capital has become a matter of profound societal consequence. I strongly agree that corporations operating in science and technology sectors should commit a substantial proportion—at least twenty percent—of their annual net profits to foundational scientific research and sustainable innovation.\n\nFirst and foremost, robust investment in foundational R&D serves as the indispensable catalyst for breakthrough innovations that private markets and venture capital often neglect due to short-term commercial horizons. While incremental product refinements generate predictable quarterly revenue, truly transformative breakthroughs—such as mRNA vaccine platforms, CRISPR-Cas9 gene editing, and semiconductor quantum dot displays—originated from decades of sustained scientific exploration. For instance, pharmaceutical companies that consistently reinvest over twenty percent of operating profits into early-stage discovery, such as Novartis and Roche, have pioneered life-saving oncology therapies that not only generate hundreds of billions in enterprise value but also substantially elevate global health outcomes.\n\nSecondly, corporate-funded foundational research is vital for accelerating ecological sustainability and industrial decarbonization. Transitioning complex global supply chains away from fossil fuels requires capital-intensive research into solid-state battery chemistry, carbon-neutral chemical synthesis, and biodegradable biomaterials. When technology corporations reinvest profits into environmental engineering, they internalize their ecological externalities and drive scalable green solutions. A prominent example is the European manufacturing sector, where companies allocating significant profits toward closed-loop circular production have achieved forty percent reductions in carbon footprints while enhancing supply chain resilience against geopolitical shocks.\n\nFinally, critics may argue that mandatory reinvestment thresholds infringe upon shareholder autonomy and depress short-term dividend yields. However, empirical market analyses demonstrate that research-intensive corporations consistently outperform their risk-averse peers over five-to-ten-year horizons in market capitalization, patent portfolio strength, and institutional investor retention.\n\nIn conclusion, dedicating at least twenty percent of annual corporate profits to foundational scientific inquiry is not merely a prudent business strategy; it is an ethical imperative that safeguards long-term industrial competitiveness and advances human welfare.",
        minWords: 300
      }
    ];

    writingItems.forEach((wItem, idx) => {
      qs.push({
        id: wItem.id,
        partNumber: 5,
        partTitle: `TOEIC Writing: ${wItem.title}`,
        section: "WRITING",
        writingPrompt: wItem.prompt,
        minWordCount: wItem.minWords,
        sampleEssay: wItem.sample,
        questionText: `Question ${51 + idx}: ${wItem.title}`,
        options: [
            { key: "A", text: "Submit for AI Evaluation" },
            { key: "B", text: "View High-Scoring Template" },
            { key: "C", text: "Consult Specialized Vocabulary Vault" }
          ],
        correctAnswer: "A",
        explanation: "Hoàn thành phần thi Viết doanh nghiệp AI đạt tiêu chuẩn cao cấp thang điểm ETS TOEIC Writing (Band 8/8)."
      });
    });

    return qs;
  })()
};

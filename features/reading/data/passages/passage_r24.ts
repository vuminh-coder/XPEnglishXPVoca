import { ReadingPassage } from "./types";

export const passage_r24: ReadingPassage = {
  "id": "r24",
  "title": "Enterprise Cloud Migration & Multi-Vendor Hybrid Infrastructure RFP",
  "category": "Business",
  "level": "B2",
  "icon": "☁️",
  "coverImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
  "duration": "5 min",
  "wordCount": 225,
  "passage": "Request for Proposal (RFP) - Global Banking Infrastructure Modernization\n\nIssued by: Atlantic International Financial Corporation\nProject: Multi-Region Hybrid Cloud Infrastructure Migration\n\nAtlantic International is soliciting comprehensive proposals from qualified Tier-1 cloud service providers and systems integrators to facilitate the phased migration of legacy on-premises core banking mainframes to an enterprise multi-cloud hybrid ecosystem.\n\nMandatory Technical Requirements:\n1. Zero Downtime Continuity: The migration architecture must guarantee active-active cross-region failover with a Recovery Time Objective (RTO) of less than 30 seconds and a Recovery Point Objective (RPO) of zero data loss for transactional relational databases.\n2. Regulatory Compliance: Full adherence to ISO 27001, SOC 2 Type II, and European GDPR data sovereignty mandates, including automated cryptographic data residency isolation.\n3. Latency Constraints: Internal microservices inter-region interconnect latency must not exceed 15 milliseconds under peak trading volumes.\n\nProposal Submission Guidelines:\nVendor submissions must include detailed pricing matrices covering compute, egress bandwidth, and 24/7 enterprise technical account management. Submissions must be uploaded through our secure procurement portal no later than Friday, November 14th, at 5:00 PM EST. Late tenders will be rejected automatically without evaluation.",
  "translation": "Yêu cầu Báo giá (RFP) - Hiện đại hóa Cơ sở hạ tầng Ngân hàng Toàn cầu\n\nĐược phát hành bởi: Tập đoàn Tài chính Quốc tế Atlantic\nDự án: Di chuyển Cơ sở hạ tầng Đám mây Lai Đa khu vực\n\nAtlantic International đang kêu gọi các đề xuất toàn diện từ các nhà cung cấp dịch vụ đám mây Tier-1 và các nhà tích hợp hệ thống đủ điều kiện nhằm tạo điều kiện thuận lợi cho quá trình chuyển đổi theo giai đoạn các hệ thống máy chủ lớn (mainframe) ngân hàng cốt lõi tại chỗ sang một hệ sinh thái đám mây lai đa nhà cung cấp.\n\nYêu cầu Kỹ thuật Bắt buộc:\n1. Tính liên tục Không gián đoạn (Zero Downtime): Kiến trúc chuyển đổi phải đảm bảo khả năng dự phòng chuyển đổi hoạt động (active-active) giữa các vùng với Mục tiêu Thời gian Phục hồi (RTO) dưới 30 giây và Mục tiêu Điểm Phục hồi (RPO) bằng không (không mất mát dữ liệu giao dịch).\n2. Tuân thủ Quy định: Tuân thủ đầy đủ các quy định về chủ quyền dữ liệu ISO 27001, SOC 2 Loại II và GDPR Châu Âu, bao gồm việc cô lập vị trí lưu trữ dữ liệu bằng mã hóa tự động.\n3. Ràng buộc về Độ trễ: Độ trễ kết nối giữa các vùng của các dịch vụ vi mô nội bộ không được vượt quá 15 mili-giây trong thời gian khối lượng giao dịch cao điểm.",
  "vocabularies": [
    {
      "word": "solicit",
      "ipa": "/səˈlɪs.ɪt/",
      "pos": "v",
      "meaning": "kêu gọi, trưng cầu đề xuất"
    },
    {
      "word": "failover",
      "ipa": "/ˈfeɪlˌoʊ.vɚ/",
      "pos": "n",
      "meaning": "cơ chế tự động chuyển đổi dự phòng khi gặp sự cố"
    },
    {
      "word": "sovereignty",
      "ipa": "/ˈsɑːv.rən.ti/",
      "pos": "n",
      "meaning": "chủ quyền (dữ liệu quốc gia)"
    },
    {
      "word": "egress",
      "ipa": "/ˈiː.ɡres/",
      "pos": "n",
      "meaning": "lưu lượng mạng truyền ra ngoài (băng thông tải ra)"
    },
    {
      "word": "interconnect",
      "ipa": "/ˌɪn.t̬ɚ.kəˈnekt/",
      "pos": "n",
      "meaning": "kết nối liên mạng giữa các hạ tầng"
    }
  ],
  "questions": [
    {
      "id": "q24_1",
      "text": "What is the primary objective of Atlantic International's Request for Proposal (RFP)?",
      "options": [
        "To auction off depreciated bank office hardware to local colleges",
        "To solicit vendor bids for migrating legacy banking mainframes to a multi-cloud hybrid architecture",
        "To hire cybersecurity investigators to probe a consumer data breach",
        "To develop an automated cryptocurrency trading desk"
      ],
      "correct": 1,
      "explanation": "Mục đích mời thầu nâng cấp hạ tầng đám mây: 'soliciting comprehensive proposals from qualified Tier-1 cloud service providers... to facilitate the phased migration of legacy on-premises core banking mainframes to an enterprise multi-cloud hybrid ecosystem.'"
    },
    {
      "id": "q24_2",
      "text": "What are the mandatory business continuity parameters (RTO and RPO) specified for transactional databases?",
      "options": [
        "RTO of less than 30 seconds and RPO of zero data loss",
        "RTO of five minutes and RPO of one hour",
        "RTO of two hours and RPO of 24 hours",
        "RTO of one business day and RPO of 10% data recovery"
      ],
      "correct": 0,
      "explanation": "Chỉ số RTO và RPO bắt buộc: 'guarantee active-active cross-region failover with a Recovery Time Objective (RTO) of less than 30 seconds and a Recovery Point Objective (RPO) of zero data loss for transactional relational databases.'"
    },
    {
      "id": "q24_3",
      "text": "What is the maximum permissible inter-region microservices latency during peak trading volume?",
      "options": [
        "5 milliseconds",
        "15 milliseconds",
        "50 milliseconds",
        "100 milliseconds"
      ],
      "correct": 1,
      "explanation": "Độ trễ tối đa cho phép: 'Internal microservices inter-region interconnect latency must not exceed 15 milliseconds under peak trading volumes.'"
    },
    {
      "id": "q24_4",
      "text": "In regulatory compliance, what does 'data sovereignty' require?",
      "options": [
        "Allowing bank customers to download all bank software code freely",
        "Storing and processing digital data in strict compliance with the legal jurisdictions and laws of the host nation",
        "Encrypting data using only open-source domestic software",
        "Publishing all customer account balances in government gazettes"
      ],
      "correct": 1,
      "explanation": "Chủ quyền dữ liệu (Data Sovereignty) là quy định pháp lý yêu cầu dữ liệu phải tuân thủ quyền tài phán sở tại (như GDPR ở châu Âu): 'European GDPR data sovereignty mandates, including automated cryptographic data residency isolation.'"
    },
    {
      "id": "q24_5",
      "text": "What is the submission deadline, and what policy applies to late proposal submissions?",
      "options": [
        "November 1st at midnight; late submissions receive a 10% score penalty",
        "Friday, November 14th at 5:00 PM EST; late tenders are rejected automatically without evaluation",
        "December 31st at 5:00 PM EST; late tenders are reviewed on a rolling basis",
        "Rolling deadline until all vendor presentations are completed"
      ],
      "correct": 1,
      "explanation": "Thời hạn và chế tài nộp thầu trễ: 'Submissions must be uploaded through our secure procurement portal no later than Friday, November 14th, at 5:00 PM EST. Late tenders will be rejected automatically without evaluation.'"
    }
  ]};

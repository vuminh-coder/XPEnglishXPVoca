import { ReadingPassage } from "./types";

export const passage_r12: ReadingPassage = {
  "id": "r12",
  "title": "Artificial Intelligence in Modern Healthcare Diagnostics",
  "category": "Science",
  "level": "C1",
  "icon": "🧬",
  "coverImage": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
  "duration": "6 min",
  "wordCount": 210,
  "passage": "The Paradigm Shift: Neural Networks in Clinical Diagnostic Radiology\n\nThe integration of deep convolutional neural networks (CNNs) into radiology workflows has transitioned from theoretical exploration to clinical reality. Recent empirical data from multi-center clinical trials indicates that deep learning algorithms analyzing low-dose computed tomography (LDCT) scans achieve a sensitivity rating of 94.2% in detecting early-stage pulmonary nodules, outperforming general practitioner assessments and matching sub-specialist thoracic radiologists.\n\nCrucially, artificial intelligence is not conceived as an autonomous substitute for clinical judgment, but rather as an augmentative triage mechanism. By pre-screening imaging batches, AI models flag suspicious anomalies in real time, dramatically compressing diagnostic turnaround times for acute cases such as ischemic strokes and intracranial hemorrhages from hours to under six minutes.\n\nNevertheless, ethical and regulatory hurdles persist. Algorithmic bias resulting from non-representative demographic training datasets poses a risk of diagnostic disparity. Moreover, the 'black-box' nature of complex neural architectures continues to challenge regulatory bodies demanding explainable AI (XAI) before authorizing broad clinical deployment.\n\nAs healthcare institutions navigate these algorithmic frontiers, rigorous validation against diverse clinical cohorts remains the prerequisite for sustainable medical AI adoption.",
  "translation": "Bước chuyển dịch mô hình: Mạng nơ-ron trong chẩn đoán hình ảnh lâm sàng\n\nViệc tích hợp mạng nơ-ron tích chập sâu (CNN) vào quy trình X-quang đã chuyển từ nghiên cứu lý thuyết sang thực tế lâm sàng. Dữ liệu thử nghiệm lâm sàng đa trung tâm cho thấy các thuật toán học sâu phân tích phim chụp cắt lớp vi tính liều thấp (LDCT) đạt độ nhạy 94,2% trong việc phát hiện nốt phổi giai đoạn đầu, vượt qua đánh giá của bác sĩ đa khoa và tương đương với các chuyên gia chẩn đoán lồng ngực.\n\nĐiều quan trọng là AI không nhằm thay thế hoàn toàn bác sĩ lâm sàng mà đóng vai trò như một công cụ sàng lọc phân loại hỗ trợ, rút ngắn thời gian chẩn đoán các ca cấp tính như đột quỵ từ vài giờ xuống dưới 6 phút.\n\nTuy nhiên, các rào cản đạo đức và pháp lý vẫn tồn tại như nguy cơ sai lệch dữ liệu và tính chất 'hộp đen' khó giải thích của AI phức tạp.",
  "vocabularies": [
    {
      "word": "paradigm",
      "ipa": "/ˈpærədaɪm/",
      "pos": "n",
      "meaning": "mô hình, khuôn mẫu chuẩn mực"
    },
    {
      "word": "augmentative",
      "ipa": "/ɔːɡˈmentətɪv/",
      "pos": "adj",
      "meaning": "mang tính bổ trợ, gia tăng sức mạnh"
    },
    {
      "word": "triage",
      "ipa": "/ˈtriːɑːʒ/",
      "pos": "n, v",
      "meaning": "sự phân loại bệnh nhân / ưu tiên xử lý khẩn cấp"
    },
    {
      "word": "prerequisite",
      "ipa": "/ˌpriːˈrekwəzɪt/",
      "pos": "n, adj",
      "meaning": "điều kiện tiên quyết, bắt buộc trước"
    }
  ],
  "questions": [
    {
      "id": "q12_1",
      "text": "What is the central focus of this article on clinical diagnostic radiology?",
      "options": [
        "The permanent replacement of human radiologists by fully autonomous robots",
        "The integration and clinical evaluation of deep convolutional neural networks in diagnostic imaging",
        "A comparison of hardware costs between magnetic resonance imaging and CT scanners",
        "The elimination of regulatory oversight for hospital software systems"
      ],
      "correct": 1,
      "explanation": "Ý chính của bài viết tập trung vào việc tích hợp và ứng dụng mạng nơ-ron học sâu (CNNs) trong chẩn đoán hình ảnh y khoa: 'The integration of deep convolutional neural networks (CNNs) into radiology workflows has transitioned from theoretical exploration to clinical reality.'"
    },
    {
      "id": "q12_2",
      "text": "What sensitivity rating did deep learning algorithms achieve in detecting early-stage pulmonary nodules?",
      "options": [
        "78.5%",
        "85.0%",
        "94.2%",
        "99.9%"
      ],
      "correct": 2,
      "explanation": "Độ nhạy trong phát hiện nốt phổi giai đoạn sớm: 'deep learning algorithms analyzing low-dose computed tomography (LDCT) scans achieve a sensitivity rating of 94.2% in detecting early-stage pulmonary nodules...'"
    },
    {
      "id": "q12_3",
      "text": "How quickly can AI triage models flag acute cases such as ischemic strokes?",
      "options": [
        "Within under six minutes",
        "In approximately thirty minutes",
        "Between one and two hours",
        "Within twenty-four business hours"
      ],
      "correct": 0,
      "explanation": "Thời gian xử lý rút ngắn kỷ lục đối với ca cấp tính: 'dramatically compressing diagnostic turnaround times for acute cases such as ischemic strokes and intracranial hemorrhages from hours to under six minutes.'"
    },
    {
      "id": "q12_4",
      "text": "In healthcare technology, what does 'explainable AI (XAI)' aim to achieve?",
      "options": [
        "Generating synthetic medical scans without patient consent",
        "Providing clear, understandable rationales for how algorithms arrive at diagnostic conclusions",
        "Translating medical terms into foreign languages automatically",
        "Replacing clinical physician notes with mathematical equations"
      ],
      "correct": 1,
      "explanation": "XAI (Explainable AI - Trí tuệ nhân tạo có thể giải thích được) giúp giải mã bản chất 'hộp đen', làm rõ cách thức và lý do mô hình đưa ra kết luận chẩn đoán: 'the 'black-box' nature of complex neural architectures continues to challenge regulatory bodies demanding explainable AI (XAI)...'"
    },
    {
      "id": "q12_5",
      "text": "What major ethical and technical concern does the author highlight regarding medical AI?",
      "options": [
        "Excessive power consumption by hospital computer graphics cards",
        "Algorithmic bias stemming from non-representative demographic training datasets",
        "The complete refusal of hospital patients to undergo CT scans",
        "A lack of interest from thoracic radiologists in modern technology"
      ],
      "correct": 1,
      "explanation": "Rủi ro định kiến thuật toán do dữ liệu huấn luyện không đa dạng: 'Algorithmic bias resulting from non-representative demographic training datasets poses a risk of diagnostic disparity.'"
    }
  ]};

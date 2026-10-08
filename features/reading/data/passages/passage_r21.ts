import { ReadingPassage } from "./types";

export const passage_r21: ReadingPassage = {
  "id": "r21",
  "title": "Quantum Cryptography & Post-Quantum Network Security",
  "category": "Technology",
  "level": "C1",
  "icon": "🔐",
  "coverImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  "duration": "6 min",
  "wordCount": 235,
  "passage": "The foundational architecture of global e-commerce, banking authentication, and defense communications currently relies on asymmetric public-key cryptography, predominantly RSA and Elliptic Curve algorithms.\n\nThese protocols depend on the computational intractability of prime factorization and discrete logarithms for classical supercomputers. However, the theoretical realization of fault-tolerant quantum computing—employing Shor's algorithm—threatens to render these mathematical barriers obsolete within minutes.\n\nTo pre-empt the looming 'quantum apocalypse,' cybersecurity agencies have initiated global migrations toward Post-Quantum Cryptography (PQC). The National Institute of Standards and Technology (NIST) has standardized quantum-resistant lattice-based mathematical algorithms, such as Kyber for key encapsulation and Dilithium for digital signatures.\n\nConcurrently, physics-based Quantum Key Distribution (QKD) leverages the fundamental quantum principle of superposition and the Heisenberg Uncertainty Principle: any interception or eavesdropping on polarized single photons alters their quantum state, immediately notifying communicating parties of an interception.\n\nEnterprises that defer cryptographic modernization risk retrospective decryption vulnerabilities, where adversaries harvest encrypted corporate data today to decrypt it once quantum hardware reaches commercial maturity.",
  "translation": "Cấu trúc nền tảng của thương mại điện tử toàn cầu, xác thực ngân hàng và liên lạc quốc phòng hiện đang dựa vào mật mã khóa công khai bất đối xứng, chủ yếu là thuật toán RSA và Đường cong Elliptic.\n\nCác giao thức này dựa trên tính chất toán học nan giải của việc phân tích thừa số nguyên tố và logarit rời rạc đối với các siêu máy tính cổ điển. Tuy nhiên, sự xuất hiện lý thuyết của máy tính lượng tử có khả năng chịu lỗi—áp dụng thuật toán của Shor—đe dọa sẽ phá vỡ các rào cản toán học này chỉ trong vài phút.\n\nĐể đón đầu 'ngày tận thế lượng tử' đang cận kề, các cơ quan an ninh mạng đã khởi động quá trình chuyển đổi toàn cầu sang Mật mã học hậu lượng tử (PQC). Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ (NIST) đã chuẩn hóa các thuật toán toán học dựa trên cấu trúc mạng tinh thể (lattice) kháng lượng tử, chẳng hạn như Kyber để đóng gói khóa và Dilithium cho chữ ký số.\n\nĐồng thời, Phân phối khóa lượng tử (QKD) dựa trên vật lý tận dụng nguyên lý chồng chập lượng tử và Nguyên lý bất định Heisenberg: bất kỳ sự can thiệp hoặc nghe lén nào đối với các photon đơn lẻ phân cực đều làm thay đổi trạng thái lượng tử của chúng, ngay lập tức cảnh báo cho các bên liên lạc về hành vi can thiệp.\n\nCác doanh nghiệp trì hoãn hiện đại hóa mật mã sẽ đối mặt với rủi ro bị giải mã hồi cứu, nơi kẻ tấn công thu thập dữ liệu mã hóa của doanh nghiệp ngay hôm nay để giải mã khi phần cứng lượng tử đạt độ chín muồi thương mại.",
  "vocabularies": [
    {
      "word": "intractability",
      "ipa": "/ˌɪn.træk.təˈbɪl.ə.t̬i/",
      "pos": "n",
      "meaning": "tính chất nan giải, cực kỳ khó giải quyết"
    },
    {
      "word": "factorization",
      "ipa": "/ˌfæk.tɚ.əˈzeɪ.ʃən/",
      "pos": "n",
      "meaning": "sự phân tích nhân tử / thừa số nguyên tố"
    },
    {
      "word": "lattice",
      "ipa": "/ˈlæt̬.ɪs/",
      "pos": "n",
      "meaning": "cấu trúc mạng tinh thể không gian đa chiều"
    },
    {
      "word": "superposition",
      "ipa": "/ˌsuː.pɚ.pəˈzɪʃ.ən/",
      "pos": "n",
      "meaning": "nguyên lý chồng chập lượng tử"
    },
    {
      "word": "retrospective",
      "ipa": "/ˌret.roʊˈspek.tɪv/",
      "pos": "adj",
      "meaning": "có tính hồi cứu, nhìn lại quá khứ"
    }
  ],
  "questions": [
    {
      "id": "q21_1",
      "text": "What major cybersecurity crisis is highlighted regarding classical asymmetric encryption?",
      "options": [
        "The inability of classical algorithms to run on smartphone mobile devices",
        "The vulnerability of RSA and Elliptic Curve encryption to Shor's algorithm on quantum computers",
        "The complete shortage of fiber-optic cables in international telecommunications",
        "The excessive electrical power consumed by bank computer servers"
      ],
      "correct": 1,
      "explanation": "Mối đe dọa từ máy tính lượng tử: 'the theoretical realization of fault-tolerant quantum computing—employing Shor's algorithm—threatens to render these mathematical barriers obsolete within minutes.'"
    },
    {
      "id": "q21_2",
      "text": "Which quantum-resistant mathematical algorithms were standardized by NIST for post-quantum security?",
      "options": [
        "RSA-4096 and SHA-256",
        "Kyber for key encapsulation and Dilithium for digital signatures",
        "AES-128 and Blowfish",
        "MD5 and Triple DES"
      ],
      "correct": 1,
      "explanation": "Các thuật toán mạng tinh thể được NIST chuẩn hóa: 'The National Institute of Standards and Technology (NIST) has standardized quantum-resistant lattice-based mathematical algorithms, such as Kyber for key encapsulation and Dilithium for digital signatures.'"
    },
    {
      "id": "q21_3",
      "text": "How does Quantum Key Distribution (QKD) detect unauthorized eavesdropping on a communication channel?",
      "options": [
        "By transmitting encrypted emails with digital verification watermarks",
        "Any interception alters the quantum state of polarized photons, immediately alerting communicating parties",
        "By taking photographs of physical wiretaps using infrared cameras",
        "By blocking internet traffic during business hours"
      ],
      "correct": 1,
      "explanation": "Nguyên lý vật lý lượng tử của QKD: 'any interception or eavesdropping on polarized single photons alters their quantum state, immediately notifying communicating parties of an interception.'"
    },
    {
      "id": "q21_4",
      "text": "In cybersecurity, the threat of 'retrospective decryption' refers to adversaries:",
      "options": [
        "Harvesting encrypted corporate data today to decrypt it once quantum hardware matures",
        "Guessing passwords using classical dictionary brute-force scripts",
        "Sending phishing emails to former employees of financial institutions",
        "Erasing corporate backup servers through physical break-ins"
      ],
      "correct": 0,
      "explanation": "Mối nguy giải mã hồi tố (Harvest Now, Decrypt Later): 'where adversaries harvest encrypted corporate data today to decrypt it once quantum hardware reaches commercial maturity.'"
    },
    {
      "id": "q21_5",
      "text": "What fundamental mathematical principle underpins classical public-key cryptography?",
      "options": [
        "Simple linear addition and matrix multiplication",
        "The computational intractability of prime factorization and discrete logarithms",
        "Binary parity checking on optical storage media",
        "Random number generation using atmospheric pressure sensors"
      ],
      "correct": 1,
      "explanation": "Cơ sở toán học của mật mã cổ điển: 'These protocols depend on the computational intractability of prime factorization and discrete logarithms for classical supercomputers.'"
    }
  ]};

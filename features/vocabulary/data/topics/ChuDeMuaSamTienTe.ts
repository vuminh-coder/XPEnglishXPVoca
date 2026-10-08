import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 20: Mua sắm & Tiền tệ (Shopping & Money)
 * Mã chủ đề: t_basic_shopping_money
 * Tổng số từ vựng: 25 từ
 */
export const THEME_MUA_SAM_TIEN_TE: BasicTheme = {
  "id": "t_basic_shopping_money",
  "name": "Mua sắm & Tiền tệ",
  "nameEn": "Shopping & Money",
  "icon": "💳",
  "difficulty": 1,
  "color": "#059669",
  "description": "Tiền mặt, thẻ, giá cả, hóa đơn, giảm giá và mua bán.",
  "totalVocabs": 25
};

export const VOCABS_MUA_SAM_TIEN_TE: BasicVocabularyItem[] = [
  {
    "id": "bv_shoppi_01",
    "word": "money",
    "phonetic": "/ˈmʌni/",
    "definition": "A current medium of exchange in the form of coins and banknotes.",
    "definitionVn": "tiền bạc, tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Save money for your future education.",
      "How much money does this book cost?"
    ],
    "exampleTranslations": [
      "Hãy tiết kiệm tiền cho việc học tập tương lai của bạn nhé.",
      "Cuốn sách này có giá bao nhiêu tiền vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_02",
    "word": "cash",
    "phonetic": "/kæʃ/",
    "definition": "Money in coins or notes, as distinct from credit cards or digital transfer.",
    "definitionVn": "tiền mặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Do you accept cash or only credit cards?",
      "I withdrew cash from the local ATM."
    ],
    "exampleTranslations": [
      "Cửa hàng chấp nhận tiền mặt hay chỉ quẹt thẻ tín dụng?",
      "Tôi đã rút tiền mặt từ cây ATM địa phương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_03",
    "word": "coin",
    "phonetic": "/kɔɪn/",
    "definition": "A flat, typically round piece of metal with an official stamp, used as money.",
    "definitionVn": "đồng tiền xu, đồng xu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "He tossed a shiny coin into the wishing fountain.",
      "Collectors treasure ancient gold coins."
    ],
    "exampleTranslations": [
      "Cậu ấy ném một đồng xu sáng bóng vào đài phun nước ước nguyện.",
      "Các nhà sưu tập trân trọng những đồng tiền vàng cổ xưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_04",
    "word": "price",
    "phonetic": "/praɪs/",
    "definition": "The amount of money expected, required, or given in payment for something.",
    "definitionVn": "mức giá, giá tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The price of this laptop is very reasonable.",
      "Check the price tag before buying."
    ],
    "exampleTranslations": [
      "Mức giá của chiếc máy tính xách tay này rất hợp lý.",
      "Hãy kiểm tra nhãn giá trước khi mua nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_05",
    "word": "bill",
    "phonetic": "/bɪl/",
    "definition": "A printed statement of the money owed for goods or services; invoice.",
    "definitionVn": "hóa đơn thanh toán, tiền hóa đơn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Can we have the bill, please?",
      "Remember to pay the electricity bill on time."
    ],
    "exampleTranslations": [
      "Làm ơn cho chúng tôi xin hóa đơn thanh toán được không?",
      "Hãy nhớ thanh toán tiền hóa đơn điện đúng hạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_06",
    "word": "receipt",
    "phonetic": "/rɪˈsiːt/",
    "definition": "A written acknowledgment of having received a specified sum of money or goods.",
    "definitionVn": "biên lai, hóa đơn mua hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Keep the sales receipt in case you want to exchange the shirt.",
      "The cashier handed me the printed receipt."
    ],
    "exampleTranslations": [
      "Hãy giữ lại biên lai mua hàng phòng khi bạn muốn đổi áo nhé.",
      "Người thu ngân đã đưa cho tôi biên lai in sẵn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_07",
    "word": "wallet",
    "phonetic": "/ˈwɑːlɪt/",
    "definition": "A pocket-sized flat folding case for holding money and plastic cards.",
    "definitionVn": "ví tiền, chiếc bóp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "He kept his driver's license and cash in his leather wallet.",
      "Don't leave your wallet unattended."
    ],
    "exampleTranslations": [
      "Anh ấy cất bằng lái xe và tiền mặt trong ví da.",
      "Đừng để ví tiền của bạn ở nơi không ai trông coi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_08",
    "word": "discount",
    "phonetic": "/ˈdɪskaʊnt/",
    "definition": "A deduction from the usual cost of something.",
    "definitionVn": "giảm giá, chiết khấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Students get a 20% discount on bus passes.",
      "The store offers big discounts during Black Friday."
    ],
    "exampleTranslations": [
      "Học sinh sinh viên được giảm giá 20% khi mua vé xe buýt.",
      "Cửa hàng giảm giá lớn trong dịp Black Friday."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_09",
    "word": "sale",
    "phonetic": "/seɪl/",
    "definition": "An event for the rapid disposal of goods at reduced prices.",
    "definitionVn": "đợt giảm giá, bán hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "These stylish sneakers are currently on sale.",
      "The summer clearance sale starts tomorrow."
    ],
    "exampleTranslations": [
      "Những đôi giày thể thao phong cách này hiện đang được giảm giá.",
      "Đợt xả hàng mùa hè bắt đầu vào ngày mai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_10",
    "word": "cheap",
    "phonetic": "/tʃiːp/",
    "definition": "Low in price; costing little money.",
    "definitionVn": "rẻ, giá rẻ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Street food in Hanoi is both delicious and cheap.",
      "It is a cheap and effective solution."
    ],
    "exampleTranslations": [
      "Ẩm thực đường phố ở Hà Nội vừa ngon vừa rẻ.",
      "Đó là một giải pháp vừa rẻ vừa hiệu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_11",
    "word": "expensive",
    "phonetic": "/ɪkˈspensɪv/",
    "definition": "Costing a lot of money.",
    "definitionVn": "đắt đỏ, đắt tiền",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Luxury sports cars are extremely expensive.",
      "Dining at five-star restaurants can be expensive."
    ],
    "exampleTranslations": [
      "Xe thể thao hạng sang cực kỳ đắt tiền.",
      "Ăn uống tại nhà hàng năm sao có thể rất đắt đỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_12",
    "word": "shop",
    "phonetic": "/ʃɑːp/",
    "definition": "A building or part of a building where goods or services are sold.",
    "definitionVn": "cửa hàng, tiệm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "She bought fresh flowers at the corner shop.",
      "Let's go shopping for clothes this weekend."
    ],
    "exampleTranslations": [
      "Cô ấy đã mua hoa tươi ở cửa hàng góc phố.",
      "Cùng đi mua sắm quần áo vào cuối tuần này nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_13",
    "word": "store",
    "phonetic": "/stɔːr/",
    "definition": "A retail establishment selling items to the public.",
    "definitionVn": "cửa hàng tiện lợi, bách hóa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The convenience store is open 24 hours a day.",
      "We bought stationery from the school store."
    ],
    "exampleTranslations": [
      "Cửa hàng tiện lợi mở cửa 24 giờ mỗi ngày.",
      "Chúng tôi đã mua văn phòng phẩm từ cửa hàng của trường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_14",
    "word": "cost",
    "phonetic": "/kɔːst/",
    "definition": "Require the payment of a specified sum of money before it can be acquired or done.",
    "definitionVn": "trị giá, có giá là (tiền)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "How much does this cup of coffee cost? — It costs two dollars.",
      "Quality education is worth the cost."
    ],
    "exampleTranslations": [
      "Tách cà phê này có giá bao nhiêu? — Giá 2 đô la.",
      "Giáo dục chất lượng rất xứng đáng với chi phí bỏ ra."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_15",
    "word": "spend",
    "phonetic": "/spend/",
    "definition": "Pay out money in buying or hiring goods or services.",
    "definitionVn": "chi tiêu, tiêu tiền, dành thời gian",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Be careful not to spend more than you earn.",
      "Spend time practicing English speaking every day."
    ],
    "exampleTranslations": [
      "Hãy cẩn thận đừng tiêu nhiều hơn số tiền bạn kiếm được.",
      "Hãy dành thời gian luyện nói tiếng Anh mỗi ngày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_16",
    "word": "change",
    "phonetic": "/tʃeɪndʒ/",
    "definition": "Coins or smaller banknotes given back as the balance of a larger sum paid.",
    "definitionVn": "tiền lẻ, tiền thối lại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Here is your coffee and your change.",
      "Do you have change for a 50-dollar note?"
    ],
    "exampleTranslations": [
      "Cà phê và tiền thối lại của quý khách đây ạ.",
      "Bạn có tiền lẻ đổi cho tờ 50 đô la không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_17",
    "word": "customer",
    "phonetic": "/ˈkʌstəmər/",
    "definition": "A person or organization that buys goods or services from a store or business.",
    "definitionVn": "khách hàng, người mua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The shop assistant greeted the customer with a warm smile.",
      "Customer satisfaction is our top priority."
    ],
    "exampleTranslations": [
      "Nhân viên bán hàng chào đón khách hàng với nụ cười ấm áp.",
      "Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_18",
    "word": "cart",
    "phonetic": "/kɑːrt/",
    "definition": "A wheeled vehicle pushed by a customer to carry shopping items.",
    "definitionVn": "xe đẩy mua hàng (siêu thị)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Put the groceries inside the shopping cart.",
      "Return your shopping cart to the designated area."
    ],
    "exampleTranslations": [
      "Hãy để hàng hóa vào trong xe đẩy mua hàng nhé.",
      "Hãy trả xe đẩy về đúng khu vực quy định."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_19",
    "word": "credit card",
    "phonetic": "/ˈkredɪt kɑːrd/",
    "definition": "A small plastic card issued by a bank allowing the holder to purchase goods on credit.",
    "definitionVn": "thẻ tín dụng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "You can tap your credit card for quick contactless payment.",
      "Keep your credit card details secure."
    ],
    "exampleTranslations": [
      "Bạn có thể chạm thẻ tín dụng để thanh toán không tiếp xúc nhanh gọn.",
      "Hãy giữ bí mật thông tin thẻ tín dụng của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_20",
    "word": "market",
    "phonetic": "/ˈmɑːrkɪt/",
    "definition": "A regular gathering of people for the purchase and sale of provisions, livestock, and other commodities.",
    "definitionVn": "chợ, nơi giao thương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The floating market in the Mekong Delta is colorful and lively.",
      "Fresh fruits are sold at the morning market."
    ],
    "exampleTranslations": [
      "Chợ nổi ở Đồng bằng sông Cửu Long rất nhiều màu sắc và sống động.",
      "Hoa quả tươi được bày bán ở chợ sớm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_21",
    "word": "receipt",
    "phonetic": "/rɪˈsiːt/",
    "definition": "A written or printed acknowledgment that a specified sum of money has been received for merchandise.",
    "definitionVn": "biên lai thanh toán, hóa đơn mua hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Retain your store purchase receipt in case you need an exchange or warranty return.",
      "The electronic cashier printed a detailed itemized receipt including tax breakdowns."
    ],
    "exampleTranslations": [
      "Hãy giữ lại biên lai mua hàng của bạn trong trường hợp bạn cần đổi hàng hoặc bảo hành.",
      "Thu ngân điện tử đã in một hóa đơn chi tiết từng món hàng bao gồm cả phân tích thuế."
    ],
    "synonyms": [
      "proof of purchase",
      "sales slip",
      "voucher"
    ],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_22",
    "word": "discount",
    "phonetic": "/ˈdɪs.kaʊnt/",
    "definition": "A deduction from the usual cost of something, typically given for prompt payment or special promotions.",
    "definitionVn": "khoản giảm giá, mức chiết khấu khuyến mãi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Students and seniors receive a fifteen percent discount on all book purchases.",
      "Entering the coupon code at digital checkout applied a generous discount immediately."
    ],
    "exampleTranslations": [
      "Học sinh và người cao tuổi được giảm giá mười lăm phần trăm cho tất cả các giao dịch mua sách.",
      "Nhập mã giảm giá tại quầy thanh toán kỹ thuật số đã áp dụng một khoản giảm giá hào phóng ngay lập tức."
    ],
    "synonyms": [
      "markdown",
      "rebate",
      "price concession"
    ],
    "antonyms": [
      "surcharge",
      "markup"
    ]
  },
  {
    "id": "bv_shoppi_23",
    "word": "bargain",
    "phonetic": "/ˈbɑːr.ɡɪn/",
    "definition": "A thing bought or offered for sale more cheaply than is usual or expected; also to negotiate price.",
    "definitionVn": "món hàng giá hời; mặc cả trả giá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "At twenty dollars, this genuine leather jacket was an absolute bargain at the flea market.",
      "Shoppers frequently bargain with local stall owners to reach a mutually agreeable price."
    ],
    "exampleTranslations": [
      "Với giá hai mươi đô la, chiếc áo khoác da thật này là một món hời tuyệt đối ở chợ trời.",
      "Người mua sắm thường xuyên mặc cả với chủ gian hàng địa phương để đạt được mức giá đồng thuận."
    ],
    "synonyms": [
      "good deal",
      "steal",
      "negotiation"
    ],
    "antonyms": [
      "rip-off",
      "overcharge"
    ]
  },
  {
    "id": "bv_shoppi_24",
    "word": "refund",
    "phonetic": "/ˈriː.fʌnd/",
    "definition": "A repayment of a sum of money, typically to a dissatisfied customer returning goods.",
    "definitionVn": "tiền hoàn lại khi trả hàng, sự hoàn tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The department store processed a full cash refund after discovering the blouse had a torn seam.",
      "Online shoppers can request an automatic refund within thirty days of parcel delivery."
    ],
    "exampleTranslations": [
      "Cửa hàng bách hóa đã xử lý hoàn lại toàn bộ tiền mặt sau khi phát hiện chiếc áo cánh có đường may bị rách.",
      "Người mua sắm trực tuyến có thể yêu cầu hoàn tiền tự động trong vòng ba mươi ngày kể từ khi bưu kiện được giao."
    ],
    "synonyms": [
      "reimbursement",
      "money back",
      "repayment"
    ],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_25",
    "word": "cashier",
    "phonetic": "/kæʃˈɪr/",
    "definition": "A person handling payments and receipts in a store, bank, or other commercial business.",
    "definitionVn": "nhân viên thu ngân tính tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The friendly cashier scanned each grocery item and bagged the produce quickly.",
      "Self-checkout lanes reduce waiting times when human cashiers are experiencing high traffic."
    ],
    "exampleTranslations": [
      "Nhân viên thu ngân thân thiện đã quét từng món hàng tạp hóa và đóng gói sản phẩm một cách nhanh chóng.",
      "Các làn tự thanh toán giúp giảm thời gian chờ đợi khi các thu ngân gặp phải lượng khách đông."
    ],
    "synonyms": [
      "teller",
      "checkout clerk"
    ],
    "antonyms": []
  }
];

export const CHUDE_MUA_SAM_TIEN_TE: VocabularyTopicPackage = {
  theme: THEME_MUA_SAM_TIEN_TE,
  vocabs: VOCABS_MUA_SAM_TIEN_TE,
};

export default CHUDE_MUA_SAM_TIEN_TE;

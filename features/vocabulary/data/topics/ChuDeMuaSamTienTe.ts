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
      "How much does this cup of coffee cost?",
      "Quality education is worth the cost."
    ],
    "exampleTranslations": [
      "Tách cà phê này có giá bao nhiêu vậy?",
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
    "word": "coupon",
    "phonetic": "/ˈkuːpɑːn/",
    "definition": "A voucher entitling the holder to a discount for a particular product.",
    "definitionVn": "phiếu giảm giá, mã ưu đãi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Use this coupon to get a ten percent discount.",
      "She saved money with a grocery store coupon."
    ],
    "exampleTranslations": [
      "Hãy dùng phiếu giảm giá này để được giảm mười phần trăm nhé.",
      "Cô ấy đã tiết kiệm được tiền nhờ phiếu giảm giá siêu thị."
    ],
    "synonyms": [
      "voucher"
    ],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_22",
    "word": "counter",
    "phonetic": "/ˈkaʊntər/",
    "definition": "A long flat-topped fixture in a store or bank across which business is conducted.",
    "definitionVn": "quầy hàng, quầy thanh toán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "Please pay for your items at the front counter.",
      "She left her shopping bag on the counter."
    ],
    "exampleTranslations": [
      "Vui lòng thanh toán các món hàng của bạn tại quầy phía trước.",
      "Cô ấy để túi mua sắm của mình trên mặt quầy hàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_shoppi_23",
    "word": "bargain",
    "phonetic": "/ˈbɑːrɡɪn/",
    "definition": "A thing bought or offered for sale more cheaply than is usual or expected; also to negotiate price.",
    "definitionVn": "món hời, mặc cả trả giá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "This warm winter coat was a great bargain.",
      "Tourists often bargain at the night market."
    ],
    "exampleTranslations": [
      "Chiếc áo khoác mùa đông ấm áp này là một món hời lớn.",
      "Du khách thường mặc cả khi mua sắm ở chợ đêm."
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
    "phonetic": "/ˈriːfʌnd/",
    "definition": "A repayment of a sum of money, typically to a dissatisfied customer returning goods.",
    "definitionVn": "tiền hoàn lại, sự hoàn tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The store gave me a full cash refund.",
      "You can ask for a refund within seven days."
    ],
    "exampleTranslations": [
      "Cửa hàng đã hoàn lại đầy đủ tiền mặt cho tôi.",
      "Bạn có thể yêu cầu hoàn tiền trong vòng bảy ngày."
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
    "definitionVn": "thu ngân, nhân viên thu tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_shopping_money",
    "themeNameVn": "Mua sắm & Tiền tệ",
    "themeNameEn": "Shopping & Money",
    "examples": [
      "The friendly cashier smiled and handed me the receipt.",
      "Pay the cashier before leaving the supermarket."
    ],
    "exampleTranslations": [
      "Nhân viên thu ngân thân thiện mỉm cười và đưa biên lai cho tôi.",
      "Hãy thanh toán với thu ngân trước khi rời siêu thị nhé."
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

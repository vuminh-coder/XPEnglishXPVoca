import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 11: Động vật quen thuộc (Familiar Animals)
 * Mã chủ đề: t_basic_animals
 * Tổng số từ vựng: 22 từ
 */
export const THEME_DONG_VAT_QUEN_THUOC: BasicTheme = {
  "id": "t_basic_animals",
  "name": "Động vật quen thuộc",
  "nameEn": "Familiar Animals",
  "icon": "🐶",
  "difficulty": 1,
  "color": "#14b8a6",
  "description": "Thú cưng, gia súc, gia cầm và các con vật thường gặp.",
  "totalVocabs": 22
};

export const VOCABS_DONG_VAT_QUEN_THUOC: BasicVocabularyItem[] = [
  {
    "id": "bv_animal_01",
    "word": "animal",
    "phonetic": "/ˈænɪml/",
    "definition": "A living organism that feeds on organic matter.",
    "definitionVn": "động vật, muông thú",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Animals are an essential part of nature.",
      "We should protect wild animals."
    ],
    "exampleTranslations": [
      "Động vật là một phần thiết yếu của tự nhiên.",
      "Chúng ta nên bảo vệ động vật hoang dã."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_02",
    "word": "pet",
    "phonetic": "/pet/",
    "definition": "A domestic or tamed animal kept for companionship.",
    "definitionVn": "thú cưng, vật nuôi trong nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Do you have any pets at home?",
      "Dogs and cats are beloved pets."
    ],
    "exampleTranslations": [
      "Bạn có nuôi thú cưng ở nhà không?",
      "Chó và mèo là những thú cưng được yêu quý."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_03",
    "word": "dog",
    "phonetic": "/dɔːɡ/",
    "definition": "A domesticated canine; man's best friend.",
    "definitionVn": "con chó",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "A dog is loyal and friendly.",
      "My dog wags its tail happily."
    ],
    "exampleTranslations": [
      "Chó rất trung thành và thân thiện.",
      "Chú chó của tôi vẫy đuôi vui sướng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_04",
    "word": "puppy",
    "phonetic": "/ˈpʌpi/",
    "definition": "A young dog.",
    "definitionVn": "chú chó con, cún con",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The playful puppy ran around the garden.",
      "We adopted a cute little puppy."
    ],
    "exampleTranslations": [
      "Chú cún con tinh nghịch chạy loanh quanh trong vườn.",
      "Chúng tôi đã nhận nuôi một chú cún con rất dễ thương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_05",
    "word": "cat",
    "phonetic": "/kæt/",
    "definition": "A small domesticated feline animal.",
    "definitionVn": "con mèo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The fluffy cat purrs when petted.",
      "Cats love sleeping in warm spots."
    ],
    "exampleTranslations": [
      "Chú mèo lông xù kêu rừ rừ khi được vuốt ve.",
      "Mèo thích ngủ ở những nơi ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_06",
    "word": "kitten",
    "phonetic": "/ˈkɪtn/",
    "definition": "A young cat.",
    "definitionVn": "mèo con",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The tiny kitten drank warm milk.",
      "Three playful kittens chased a ball of wool."
    ],
    "exampleTranslations": [
      "Chú mèo con bé xíu uống sữa ấm.",
      "Ba chú mèo con tinh nghịch đuổi theo cuộn len."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_07",
    "word": "bird",
    "phonetic": "/bɜːrd/",
    "definition": "A feathered vertebrate with wings.",
    "definitionVn": "con chim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Birds sing in the morning trees.",
      "Look at that colorful bird flying!"
    ],
    "exampleTranslations": [
      "Những chú chim hót trên cây buổi sớm.",
      "Hãy nhìn chú chim nhiều màu sắc đang bay kìa!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_08",
    "word": "fish",
    "phonetic": "/fɪʃ/",
    "definition": "A limbless water-dwelling animal with gills.",
    "definitionVn": "con cá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Fish swim smoothly in the aquarium.",
      "We saw colorful reef fish."
    ],
    "exampleTranslations": [
      "Những chú cá bơi lội trong bể kính.",
      "Chúng tôi đã thấy những chú cá rạn san hô sặc sỡ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_09",
    "word": "chicken",
    "phonetic": "/ˈtʃɪkɪn/",
    "definition": "A domestic fowl kept for eggs and meat.",
    "definitionVn": "con gà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The rooster crows early in the morning.",
      "Chickens roam freely in the farmyard."
    ],
    "exampleTranslations": [
      "Gà trống gáy sớm vào buổi sáng.",
      "Đàn gà đi kiếm ăn tự do trong sân vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_10",
    "word": "duck",
    "phonetic": "/dʌk/",
    "definition": "A waterbird with a broad blunt bill and webbed feet.",
    "definitionVn": "con vịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Ducks are swimming in the pond.",
      "The little yellow ducklings followed their mother."
    ],
    "exampleTranslations": [
      "Những con vịt đang bơi dưới ao.",
      "Những chú vịt con màu vàng đi theo mẹ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_11",
    "word": "pig",
    "phonetic": "/pɪɡ/",
    "definition": "An omnivorous domesticated hoofed mammal.",
    "definitionVn": "con lợn, con heo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The piglets are cute and playful.",
      "Pigs are very intelligent animals."
    ],
    "exampleTranslations": [
      "Những chú lợn con rất đáng yêu và tinh nghịch.",
      "Lợn là loài động vật rất thông minh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_12",
    "word": "cow",
    "phonetic": "/kaʊ/",
    "definition": "A fully grown female animal of a domesticated bovine.",
    "definitionVn": "con bò, bò sữa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Cows graze peacefully in the green pasture.",
      "Cows provide fresh milk for humans."
    ],
    "exampleTranslations": [
      "Những chú bò gặm cỏ thanh bình trên đồng cỏ xanh.",
      "Bò cung cấp sữa tươi cho con người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_13",
    "word": "horse",
    "phonetic": "/hɔːrs/",
    "definition": "A solid-hoofed plant-eating domesticated mammal.",
    "definitionVn": "con ngựa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "He learned to ride a brown horse.",
      "Horses can run very fast across fields."
    ],
    "exampleTranslations": [
      "Anh ấy đã học cưỡi một chú ngựa nâu.",
      "Ngựa có thể chạy rất nhanh trên cánh đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_14",
    "word": "sheep",
    "phonetic": "/ʃiːp/",
    "definition": "A domesticated ruminant animal with a thick woolly coat.",
    "definitionVn": "con cừu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Flocks of white sheep graze on the hillside.",
      "Sheep wool is used to make warm sweaters."
    ],
    "exampleTranslations": [
      "Đàn cừu trắng gặm cỏ trên sườn đồi.",
      "Lông cừu được dùng để làm áo len ấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_15",
    "word": "mouse",
    "phonetic": "/maʊs/",
    "definition": "A small rodent that typically has a pointed snout and long tail.",
    "definitionVn": "con chuột",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The little mouse ran into its tiny hole.",
      "The cat chased the swift mouse."
    ],
    "exampleTranslations": [
      "Chú chuột nhỏ chạy biến vào cái hang nhỏ.",
      "Chú mèo rượt đuổi theo con chuột nhanh nhẹn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_16",
    "word": "rabbit",
    "phonetic": "/ˈræbɪt/",
    "definition": "A burrowing, gregarious, plant-eating mammal with long ears.",
    "definitionVn": "con thỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The white rabbit has long ears and loves carrots.",
      "Rabbits can hop very quickly."
    ],
    "exampleTranslations": [
      "Chú thỏ trắng có đôi tai dài và thích ăn cà rốt.",
      "Thỏ có thể nhảy thoăn thoắt rất nhanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_17",
    "word": "monkey",
    "phonetic": "/ˈmʌŋki/",
    "definition": "A small to medium-sized primate with a long tail.",
    "definitionVn": "con khỉ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Monkeys are clever and swing from trees.",
      "We saw cheeky monkeys at the mountain temple."
    ],
    "exampleTranslations": [
      "Khỉ rất thông minh và chuyền cành thoăn thoắt.",
      "Chúng tôi thấy những chú khỉ tinh nghịch ở ngôi chùa trên núi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_18",
    "word": "tiger",
    "phonetic": "/ˈtaɪɡər/",
    "definition": "A very large solitary cat with a yellow-brown coat striped with black.",
    "definitionVn": "con hổ, cọp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The tiger is the majestic king of the jungle.",
      "Tigers have distinctive orange and black stripes."
    ],
    "exampleTranslations": [
      "Hổ là chúa tể oai phong của rừng xanh.",
      "Hổ có những vằn màu cam và đen đặc trưng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_19",
    "word": "lion",
    "phonetic": "/ˈlaɪən/",
    "definition": "A large tawny-colored cat that lives in prides, the male having a shaggy mane.",
    "definitionVn": "sư tử",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The male lion has a magnificent mane.",
      "Lions live in prides in the African savanna."
    ],
    "exampleTranslations": [
      "Sư tử đực có chiếc bờm thật uy nghi.",
      "Sư tử sống theo đàn trên thảo nguyên Châu Phi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_20",
    "word": "elephant",
    "phonetic": "/ˈelɪfənt/",
    "definition": "A very large plant-eating mammal with a long trunk and tusks.",
    "definitionVn": "con voi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Elephants are the largest land animals.",
      "The mother elephant protects her baby with care."
    ],
    "exampleTranslations": [
      "Voi là loài động vật trên cạn lớn nhất.",
      "Voi mẹ chăm sóc bảo vệ voi con rất chu đáo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_21",
    "word": "butterfly",
    "phonetic": "/ˈbʌtərflaɪ/",
    "definition": "An insect with four broad wings, often brightly colored.",
    "definitionVn": "con bướm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "Colorful butterflies flutter around the blooming flowers.",
      "A caterpillar turns into a butterfly."
    ],
    "exampleTranslations": [
      "Những chú bướm nhiều màu sắc bay lượn quanh hoa nở.",
      "Sâu bướm biến thành chú bướm xinh đẹp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_animal_22",
    "word": "turtle",
    "phonetic": "/ˈtɜːrtl/",
    "definition": "A slow-moving reptile enclosed in a scaly or leathery domed shell.",
    "definitionVn": "con rùa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_animals",
    "themeNameVn": "Động vật quen thuộc",
    "themeNameEn": "Familiar Animals",
    "examples": [
      "The sea turtle swam gracefully in the blue ocean.",
      "Turtles can live for over a hundred years."
    ],
    "exampleTranslations": [
      "Chú rùa biển bơi lội uyển chuyển dưới đại dương xanh.",
      "Rùa có thể sống thọ hơn một trăm năm."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_DONG_VAT_QUEN_THUOC: VocabularyTopicPackage = {
  theme: THEME_DONG_VAT_QUEN_THUOC,
  vocabs: VOCABS_DONG_VAT_QUEN_THUOC,
};

export default CHUDE_DONG_VAT_QUEN_THUOC;

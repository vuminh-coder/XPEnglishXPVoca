const fs = require('fs');

const PETS_11_VERBATIM = [
  {
    orderIndex: 0,
    startTime: 13.00,
    endTime: 19.00,
    text: "Our family has a small dog with a white coat and brown spots.",
    ipaUs: "aʊər ˈfæməli hæz ə smɔl dɔɡ wɪð ə waɪt koʊt ænd braʊn spɑts.",
    translationVi: "Gia đình chúng tôi có một chú chó nhỏ với bộ lông màu trắng và những đốm màu nâu.",
    explanationAi: "Từ 'coat' ở đây chỉ bộ lông của động vật (thay vì fur), kết hợp với 'brown spots' miêu tả những đốm màu nâu đặc trưng.",
    properNouns: [],
    keywords: ["family", "small dog", "white coat", "brown spots"]
  },
  {
    orderIndex: 1,
    startTime: 19.50,
    endTime: 22.80,
    text: "My son named our dog Buster.",
    ipaUs: "maɪ sʌn neɪmd aʊər dɔɡ ˈbʌstər.",
    translationVi: "Con trai tôi đã đặt tên cho chú chó là Buster.",
    explanationAi: "Cấu trúc 'named + object + name' (đặt tên cho ai/cái gì là...); 'Buster' là một cái tên phổ biến dành cho thú cưng ở các nước nói tiếng Anh.",
    properNouns: ["Buster"],
    keywords: ["son", "named", "dog", "Buster"]
  },
  {
    orderIndex: 2,
    startTime: 23.50,
    endTime: 28.50,
    text: "Buster and our children have a lot of fun together playing.",
    ipaUs: "ˈbʌstər ænd aʊər ˈtʃɪldrən hæv ə lɑt ʌv fʌn təˈɡɛðər ˈpleɪɪŋ.",
    translationVi: "Buster và các con tôi rất vui vẻ khi chơi đùa cùng nhau.",
    explanationAi: "Cụm 'have a lot of fun together playing' thể hiện sự gắn kết vui tươi giữa chú cún và những đứa trẻ trong gia đình.",
    properNouns: ["Buster"],
    keywords: ["children", "a lot of fun", "together playing"]
  },
  {
    orderIndex: 3,
    startTime: 29.00,
    endTime: 34.00,
    text: "Sometimes they play indoors, but most of the time they play outdoors.",
    ipaUs: "ˈsʌmˌtaɪmz ðeɪ pleɪ ˈɪnˌdɔrz, bʌt moʊst ʌv ðə taɪm ðeɪ pleɪ ˌaʊtˈdɔrz.",
    translationVi: "Đôi khi chúng chơi trong nhà, nhưng phần lớn thời gian chúng chơi ngoài trời.",
    explanationAi: "Cặp trạng từ tương phản 'indoors' (trong nhà) và 'outdoors' (ngoài trời); 'most of the time' nghĩa là phần lớn thời gian.",
    properNouns: [],
    keywords: ["indoors", "most of the time", "outdoors"]
  },
  {
    orderIndex: 4,
    startTime: 34.50,
    endTime: 37.50,
    text: "We love being outdoors as much as we can be.",
    ipaUs: "wi lʌv ˈbiɪŋ ˌaʊtˈdɔrz æz mʌtʃ æz wi kæn bi.",
    translationVi: "Chúng tôi thích ở ngoài trời nhiều nhất có thể.",
    explanationAi: "Cấu trúc 'as much as we can be' (nhiều nhất có thể) nhấn mạnh lối sống gần gũi với thiên nhiên của gia đình.",
    properNouns: [],
    keywords: ["love being outdoors", "as much as we can"]
  },
  {
    orderIndex: 5,
    startTime: 38.50,
    endTime: 44.00,
    text: "Sometimes we go to the local zoo to see other animals.",
    ipaUs: "ˈsʌmˌtaɪmz wi ɡoʊ tu ðə ˈloʊkəl zu tu si ˈʌðər ˈænəməlz.",
    translationVi: "Đôi khi chúng tôi đến sở thú địa phương để ngắm nhìn những loài động vật khác.",
    explanationAi: "'Local zoo' là sở thú địa phương gần nơi sinh sống; 'other animals' là các loài động vật hoang dã khác ngoài thú nuôi trong nhà.",
    properNouns: [],
    keywords: ["local zoo", "see", "animals"]
  },
  {
    orderIndex: 6,
    startTime: 44.50,
    endTime: 50.50,
    text: "My daughter's favorite animal is the giraffe because it is tall and has a long neck.",
    ipaUs: "maɪ ˈdɔtərz ˈfeɪvərɪt ˈænəməl ɪz ðə dʒəˈræf bɪˈkɔz ɪt ɪz tɔl ænd hæz ə lɔŋ nɛk.",
    translationVi: "Con vật yêu thích của con gái tôi là hươu cao cổ vì nó cao và có chiếc cổ dài.",
    explanationAi: "'Giraffe' /dʒəˈræf/ (hươu cao cổ), đặc trưng với tính từ 'tall' và bộ phận cơ thể 'long neck'.",
    properNouns: [],
    keywords: ["favorite animal", "giraffe", "tall", "long neck"]
  },
  {
    orderIndex: 7,
    startTime: 51.00,
    endTime: 53.50,
    text: "We also like watching the elephants.",
    ipaUs: "wi ˈɔlsoʊ laɪk ˈwɑtʃɪŋ ði ˈɛləfənts.",
    translationVi: "Chúng tôi cũng rất thích ngắm nhìn những chú voi.",
    explanationAi: "Mạo từ 'the' trước nguyên âm 'elephants' phát âm là /ði/, động từ 'watch' dùng khi quan sát động vật chuyển động hoặc sinh hoạt.",
    properNouns: [],
    keywords: ["also like", "watching", "elephants"]
  },
  {
    orderIndex: 8,
    startTime: 54.40,
    endTime: 58.00,
    text: "Another thing we like to do is take walks in the woods.",
    ipaUs: "əˈnʌðər θɪŋ wi laɪk tu du ɪz teɪk wɔks ɪn ðə wʊdz.",
    translationVi: "Một điều khác mà chúng tôi thích làm là đi dạo trong rừng.",
    explanationAi: "'The woods' trong tiếng Anh chỉ khu rừng nhỏ hoặc vùng cây cối rậm rạp; 'take walks' là đi bộ dạo mát thư giãn.",
    properNouns: [],
    keywords: ["another thing", "take walks", "woods"]
  },
  {
    orderIndex: 9,
    startTime: 59.20,
    endTime: 65.00,
    text: "There are many kinds of trees, wild flowers and birds.",
    ipaUs: "ðɛr ɑr ˈmɛni kaɪndz ʌv triz, waɪld ˈflaʊərz ænd bɜrdz.",
    translationVi: "Ở đó có rất nhiều loài cây, hoa dại và các loài chim.",
    explanationAi: "'Kinds of' (các loại / các loài); 'wild flowers' là hoa dại mọc tự nhiên trong rừng.",
    properNouns: [],
    keywords: ["many kinds of", "trees", "wild flowers", "birds"]
  },
  {
    orderIndex: 10,
    startTime: 65.50,
    endTime: 71.50,
    text: "Sometimes we see squirrels and rabbits too.",
    ipaUs: "ˈsʌmˌtaɪmz wi si ˈskwɜrəlz ænd ˈræbɪts tu.",
    translationVi: "Thỉnh thoảng chúng tôi cũng nhìn thấy sóc và thỏ nữa.",
    explanationAi: "'Squirrels' /ˈskwɜːrəlz/ (những chú sóc) và 'rabbits' (những chú thỏ); 'too' đặt cuối câu mang nghĩa 'cũng vậy / nữa'.",
    properNouns: [],
    keywords: ["squirrels", "rabbits", "too"]
  }
];

fs.writeFileSync('scripts/pets_11_calibrated.json', JSON.stringify(PETS_11_VERBATIM, null, 2));
console.log('Saved 11 calibrated verbatim segments to scripts/pets_11_calibrated.json');

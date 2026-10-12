const fs = require('fs');

const segs = JSON.parse(fs.readFileSync('scripts/summer_master_pure_segments.json', 'utf8'));

const newSegs = [];
for (let i = 0; i < segs.length; i++) {
  const s = segs[i];
  if (i === 23) {
    newSegs.push({
      startTime: 229,
      endTime: 232,
      text: "Do you go to Angel's Plaza?",
      translationVi: "Cô có hay đến quảng trường Angel's Plaza không?",
      ipaUs: "/duː juː ɡoʊ tuː ˈeɪndʒəlz ˈplɑːzə?/",
      keywords: ["Angel's Plaza"],
      explanationAi: "Tom bắt chuyện với cô gái bên ngoài phòng phỏng vấn kiến trúc.",
      properNouns: ["Angel's Plaza"]
    });
    newSegs.push({
      startTime: 232,
      endTime: 235,
      text: "Yes, that's like my favorite spot.",
      translationVi: "Có chứ, đó là địa điểm yêu thích nhất của tôi.",
      ipaUs: "/jɛs, ðæts laɪk maɪ ˈfeɪvərɪt spɑːt./",
      keywords: ["favorite spot"],
      explanationAi: "Sự đồng điệu về địa điểm yêu thích mở ra sự kết nối bất ngờ.",
      properNouns: []
    });
  } else if (i === 24) {
    newSegs.push({
      startTime: 235,
      endTime: 238,
      text: "My name is Tom.",
      translationVi: "Tôi tên là Tom.",
      ipaUs: "/maɪ neɪm ɪz tɑːm./",
      keywords: ["My name"],
      explanationAi: "Tom quyết định chủ động giới thiệu bản thân trước khi bước vào phòng phỏng vấn.",
      properNouns: ["Tom"]
    });
    newSegs.push({
      startTime: 238,
      endTime: 242,
      text: "Nice to meet you, I'm Autumn.",
      translationVi: "Rất vui được gặp anh, tôi là Autumn.",
      ipaUs: "/naɪs tuː miːt juː, aɪm ˈɔːtəm./",
      keywords: ["Nice to meet you", "Autumn"],
      explanationAi: "Cú twist kinh điển: mùa Hè kết thúc và mùa Thu bắt đầu.",
      properNouns: ["Autumn"]
    });
  } else if (i === 32) {
    newSegs.push({
      startTime: 328,
      endTime: 330,
      text: "I love The Smiths.",
      translationVi: "Tôi mê nhóm The Smiths lắm.",
      ipaUs: "/aɪ lʌv ðə smɪθs./",
      keywords: ["The Smiths"],
      explanationAi: "Summer nghe thấy giai điệu phát ra từ tai nghe của Tom và cất tiếng bắt chuyện.",
      properNouns: ["The Smiths"]
    });
    newSegs.push({
      startTime: 330,
      endTime: 332,
      text: "Sorry?",
      translationVi: "Sao cơ?",
      ipaUs: "/ˈsɑːri?/",
      keywords: ["Sorry"],
      explanationAi: "Tom tháo tai nghe ra trong ngỡ ngàng.",
      properNouns: []
    });
    newSegs.push({
      startTime: 332,
      endTime: 334,
      text: "I said, I love The Smiths.",
      translationVi: "Tôi bảo là, tôi rất thích nhóm The Smiths.",
      ipaUs: "/aɪ sɛd, aɪ lʌv ðə smɪθs./",
      keywords: ["The Smiths"],
      explanationAi: "Summer lặp lại lời khẳng định sở thích âm nhạc tương đồng.",
      properNouns: ["The Smiths"]
    });
  } else if (i === 48) {
    newSegs.push({
      startTime: 488,
      endTime: 491,
      text: "I just woke up one day and I knew.",
      translationVi: "Một ngày nọ em thức dậy và em biết chắc.",
      ipaUs: "/aɪ dʒʌst woʊk ʌp wʌn deɪ ænd aɪ njuː./",
      keywords: ["woke up one day", "knew"],
      explanationAi: "Summer giải thích lý do cô quyết định kết hôn với người đàn ông khác.",
      properNouns: []
    });
    newSegs.push({
      startTime: 491,
      endTime: 493,
      text: "Knew what?",
      translationVi: "Biết điều gì cơ?",
      ipaUs: "/njuː wɑːt?/",
      keywords: ["Knew what"],
      explanationAi: "Tom nghẹn ngào hỏi lại câu hỏi chất chứa bao đau đớn.",
      properNouns: []
    });
    newSegs.push({
      startTime: 493,
      endTime: 496,
      text: "What I was never sure of with you.",
      translationVi: "Điều mà khi ở bên anh em chưa bao giờ dám chắc chắn.",
      ipaUs: "/wɑːt aɪ wʌz ˈnɛvər ʃʊr əv wɪð juː./",
      keywords: ["never sure of"],
      explanationAi: "Sự thật nghiệt ngã: Tom chưa từng là người định mệnh của Summer.",
      properNouns: []
    });
  } else {
    newSegs.push(s);
  }
}

newSegs.forEach((s, idx) => {
  s.orderIndex = idx;
});

fs.writeFileSync('scripts/summer_master_pure_segments.json', JSON.stringify(newSegs, null, 2), 'utf8');
console.log('Successfully saved ' + newSegs.length + ' pure segments without any merged utterances!');

const fs = require('fs');
const path = require('path');

function tokenizeStandard(sentence, properNouns = []) {
  if (!sentence) return [];
  const words = sentence.trim().split(/\s+/);
  return words
    .map((w, idx) => ({
      index: idx,
      text: w,
      clean: w.replace(/^[^\w\s']+|[^\w\s']+$/g, '')
    }))
    .filter((t) => t.clean.length > 0);
}

const filePath = path.join(__dirname, '../features/listening/data/lessons/movies/inspirational/lesson_forrest_gump.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const segStart = content.indexOf('segments: [');
const segEnd = content.lastIndexOf('],');
const segments = eval(content.substring(segStart + 10, segEnd + 1));
console.log(`Original parsed segments count: ${segments.length}`);

const splitMap = {
  26: [
    {
      startTime: 161.36,
      endTime: 164.50,
      text: "Because that was the year you won an Oscar!",
      translationVi: "Bởi vì đó chính là năm anh đã giành giải Oscar!",
      ipaUs: "/bɪˈkɔːz ðæt wʌz ðə jɪr juː wʌn ən ˈɔːskər!/",
      keywords: ["won an Oscar"],
      explanationAi: "Graham Norton nhắc đến năm Peter Capaldi cùng được đề cử và thắng tượng vàng Oscar.",
      properNouns: ["Oscar"]
    },
    {
      startTime: 164.50,
      endTime: 168.24,
      text: "There again, I won an Oscar, yes, for a little short film.",
      translationVi: "Đúng vậy, tôi đã thắng một giải Oscar cho một bộ phim ngắn nhỏ.",
      ipaUs: "/ðɛr əˈɡɛn, aɪ wʌn ən ˈɔːskər, jɛs, fɔːr ə ˈlɪtl̩ ʃɔːrt fɪlm./",
      keywords: ["won an Oscar", "little short film"],
      explanationAi: "Peter Capaldi giành giải Oscar Phim ngắn người đóng năm 1995 cho 'Franz Kafka's It's a Wonderful Life'.",
      properNouns: ["Oscar"]
    }
  ],
  42: [
    {
      startTime: 284.88,
      endTime: 288.20,
      text: "Have you been, though? Have you been to the Oscars?",
      translationVi: "Thế anh đã từng đến dự lễ trao giải Oscar chưa?",
      ipaUs: "/hæv juː biːn, ðoʊ? hæv juː biːn tuː ðɪ ˈɔːskərz?/",
      keywords: ["been to the Oscars"],
      explanationAi: "Graham Norton quay sang hỏi David Walliams xem anh đã từng tới dự Oscar chưa.",
      properNouns: ["Oscars"]
    },
    {
      startTime: 288.20,
      endTime: 292.48,
      text: "Of course I haven't been! Why would I go to the Oscars?",
      translationVi: "Dĩ nhiên là chưa rồi! Tôi đến Oscar làm cái quái gì cơ chứ?",
      ipaUs: "/əv kɔːrs aɪ ˈhævənt biːn! waɪ wʊd aɪ ɡoʊ tuː ðɪ ˈɔːskərz?/",
      keywords: ["why would I go"],
      explanationAi: "Phản xạ hài hước tự trào của David Walliams khiến cả khán phòng bật cười.",
      properNouns: ["Oscars"]
    }
  ],
  44: [
    {
      startTime: 300.68,
      endTime: 303.20,
      text: "Did you get the gift basket with all the goodies?",
      translationVi: "Anh có nhận được giỏ quà tặng đầy đồ ngọt và quà xịn không?",
      ipaUs: "/dɪd juː ɡɛt ðə ɡɪft ˈbæskɪt wɪð ɔːl ðə ˈɡʊdiz?/",
      keywords: ["gift basket", "goodies"],
      explanationAi: "Graham tò mò hỏi về giỏ quà xa xỉ huyền thoại trị giá hàng chục nghìn đô dành cho các đề cử Oscar.",
      properNouns: []
    },
    {
      startTime: 303.20,
      endTime: 306.72,
      text: "Actually, that was 1995, we were booked on economy to come back to London.",
      translationVi: "Thật ra hồi đó là năm 1995, chúng tôi đặt vé máy bay hạng phổ thông để bay về London.",
      ipaUs: "/ˈæktʃuəli, ðæt wʌz ˈnaɪnˈtiːn ˈnaɪnti faɪv, wiː wɜːr bʊkt ɑːn ɪˈkɑːnəmi tuː kʌm bæk tuː ˈlʌndən./",
      keywords: ["economy", "come back to London"],
      explanationAi: "Peter Capaldi kể kỷ niệm giản dị khi vừa ôm tượng vàng vừa ngồi vé hạng phổ thông bay về nước.",
      properNouns: ["London"]
    }
  ],
  49: [
    {
      startTime: 348.76,
      endTime: 351.50,
      text: "A bicycling trophy! Did you have perfect attendance in school?",
      translationVi: "Một chiếc cúp đi xe đạp! Thế anh có bao giờ đạt điểm chuyên cần tuyệt đối ở trường không?",
      ipaUs: "/ə ˈbaɪsɪklɪŋ ˈtroʊfi! dɪd juː hæv ˈpɜːrfɪkt əˈtɛndəns ɪn skuːl?/",
      keywords: ["bicycling trophy", "perfect attendance"],
      explanationAi: "Graham Norton trêu chọc hỏi về giải thưởng chuyên cần thời đi học.",
      properNouns: []
    },
    {
      startTime: 351.50,
      endTime: 354.48,
      text: "Yes, I did actually, I got an award for that!",
      translationVi: "Thật ra là có đấy, tôi từng được nhận giải thưởng cho việc đó!",
      ipaUs: "/jɛs, aɪ dɪd ˈæktʃuəli, aɪ ɡɑːt ən əˈwɔːrd fɔːr ðæt!/",
      keywords: ["got an award"],
      explanationAi: "David Walliams tự hào thừa nhận từng nhận được phần thưởng học sinh chuyên cần.",
      properNouns: []
    }
  ],
  52: [
    {
      startTime: 384.56,
      endTime: 387.80,
      text: "Are you not proud of your lad down there?",
      translationVi: "Anh có tự hào về chàng trai của anh ở đằng kia không?",
      ipaUs: "/ɑːr juː nɑːt praʊd əv jɔːr læd daʊn ðɛr?/",
      keywords: ["proud of your lad"],
      explanationAi: "Graham Norton hỏi mẹ của David Walliams ngồi dưới hàng ghế khán giả.",
      properNouns: []
    },
    {
      startTime: 387.80,
      endTime: 394.16,
      text: "Very proud! Forty-two million books sold! One of these days, he just might win an Oscar!",
      translationVi: "Rất tự hào chứ! Bốn mươi hai triệu cuốn sách đã được bán ra! Một ngày nào đó, cậu ấy hoàn toàn có thể đoạt giải Oscar!",
      ipaUs: "/ˈvɛri praʊd! ˈfɔːrti tuː ˈmɪljən bʊks soʊld! wʌn əv ðiːz deɪz, hiː dʒʌst maɪt wɪn ən ˈɔːskər!/",
      keywords: ["very proud", "forty-two million books", "might win an Oscar"],
      explanationAi: "Lời chúc tốt đẹp và khen ngợi sự nghiệp viết sách thiếu nhi thành công rực rỡ của David Walliams khép lại buổi trò chuyện.",
      properNouns: ["Oscar"]
    }
  ]
};

const newSegments = [];
for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  if (splitMap[seg.orderIndex]) {
    const parts = splitMap[seg.orderIndex];
    parts.forEach(p => {
      newSegments.push({
        ...p,
        tokenCount: tokenizeStandard(p.text, p.properNouns || []).length
      });
    });
  } else {
    seg.tokenCount = tokenizeStandard(seg.text, seg.properNouns || []).length;
    newSegments.push(seg);
  }
}

// Assign 1-indexed orderIndex to all
for (let i = 0; i < newSegments.length; i++) {
  newSegments[i].orderIndex = i + 1;
}

console.log(`New segments count: ${newSegments.length}`);
console.log(`First segment orderIndex: ${newSegments[0].orderIndex}`);
console.log(`Last segment orderIndex: ${newSegments[newSegments.length - 1].orderIndex}`);

function formatSegments(segs) {
  return segs.map(s => {
    return `    {
        "orderIndex": ${s.orderIndex},
        "startTime": ${s.startTime},
        "endTime": ${s.endTime},
        "text": ${JSON.stringify(s.text)},
        "translationVi": ${JSON.stringify(s.translationVi)},
        "ipaUs": ${JSON.stringify(s.ipaUs)},
        "keywords": ${JSON.stringify(s.keywords, null, 12).replace(/\n\s*/g, ' ')},
        "explanationAi": ${JSON.stringify(s.explanationAi)},
        "properNouns": ${JSON.stringify(s.properNouns, null, 12).replace(/\n\s*/g, ' ')},
        "tokenCount": ${s.tokenCount}
    }`;
  }).join(',\n');
}

// Update Quiz references
const quizStart = content.indexOf('export const QUIZ_FORREST_GUMP');
const quizEnd = content.indexOf('export const LESSON_FORREST_GUMP');
let quizText = content.substring(quizStart, quizEnd);

const quizRefMap = {
  5: 6,
  11: 12,
  15: 16,
  19: 20,
  23: 24,
  38: 40,
  50: 55,
  0: 1
};

quizText = quizText.replace(/"referenceSegmentIndex":\s*(\d+)/g, (match, p1) => {
  const oldRef = parseInt(p1);
  const newRef = quizRefMap[oldRef];
  console.log(`Quiz ref updated: ${oldRef} -> ${newRef}`);
  return `"referenceSegmentIndex": ${newRef}`;
});

content = content.substring(0, quizStart) + quizText + content.substring(quizEnd);

// Replace segments block in content
const beforeSegs = content.substring(0, content.indexOf('segments: [') + 11) + '\n';
const afterSegs = '\n' + content.substring(content.lastIndexOf('],'));
content = beforeSegs + formatSegments(newSegments) + afterSegs;

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated lesson_forrest_gump.ts');

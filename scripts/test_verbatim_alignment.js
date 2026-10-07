const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/test_sub.en.json3', 'utf8'));

// Extract non-duplicate word stream
const rawTokens = [];
for (const ev of data.events || []) {
  if (!ev.segs) continue;
  const evStart = ev.tStartMs || 0;
  for (const seg of ev.segs) {
    const text = seg.utf8;
    if (!text || text === '\n') continue;
    const clean = text.trim();
    if (!clean) continue;
    const wordStart = evStart + (seg.tOffsetMs || 0);
    rawTokens.push({ word: clean, startMs: wordStart, sec: Number((wordStart / 1000).toFixed(2)) });
  }
}

const words = [];
for (let i = 0; i < rawTokens.length; i++) {
  const cur = rawTokens[i];
  if (words.length > 0) {
    const prev = words[words.length - 1];
    if (prev.word.toLowerCase() === cur.word.toLowerCase() && Math.abs(prev.startMs - cur.startMs) < 200) {
      continue;
    }
  }
  words.push(cur);
}

// Define the exact 10 calibrated segments based on 100% spoken text
const segments = [
  {
    startIndex: 0, // "from" (0.08s)
    endIndex: 25,   // "right" (15.88s)
    startTime: 0.08,
    endTime: 16.50,
    text: "From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is like superhuman, right?",
    translationVi: "Từ lúc lên ý tưởng đến khi xây dựng một nhà máy khổng lồ, làm mát bằng chất lỏng, cấp điện và cấp phép trong khoảng thời gian ngắn ngủi như vậy, điều đó thực sự phi thường, đúng không?",
    properNouns: [],
    keywords: ["concept", "massive factory", "liquid-cooled", "energized", "superhuman"]
  },
  {
    startIndex: 28, // "as" (16.76s)
    endIndex: 46,   // "that" (20.12s)
    startTime: 16.50,
    endTime: 20.40,
    text: "And as far as I know, there's only one person in the world who could do that.",
    translationVi: "Và theo tôi được biết, chỉ có một người duy nhất trên thế giới có thể làm được điều đó.",
    properNouns: [],
    keywords: ["as far as I know", "only one person", "world"]
  },
  {
    startIndex: 47, // "you" (20.44s)
    endIndex: 69,   // "unbelievable" (30.20s)
    startTime: 20.40,
    endTime: 31.16,
    text: "You know, I mean Elon is singular in this understanding of engineering, and construction, and large systems, and marshaling resources, it's unbelievable.",
    translationVi: "Ý tôi là Elon thực sự độc nhất vô nhị trong hiểu biết về kỹ thuật, xây dựng, các hệ thống quy mô lớn và huy động nguồn lực, điều đó thật khó tin.",
    properNouns: ["Elon", "Elon Musk"],
    keywords: ["singular", "engineering", "construction", "large systems", "marshaling resources", "unbelievable"]
  },
  {
    startIndex: 70, // "and" (31.16s)
    endIndex: 78,   // "extraordinary" (33.52s)
    startTime: 31.16,
    endTime: 34.40,
    text: "And of course, then his engineering team is extraordinary.",
    translationVi: "Và tất nhiên, đội ngũ kỹ sư của anh ấy cũng thật phi thường.",
    properNouns: [],
    keywords: ["engineering team", "extraordinary"]
  },
  {
    startIndex: 79, // "and" (34.40s)
    endIndex: 110,  // "Advance" (45.00s)
    startTime: 34.40,
    endTime: 45.60,
    text: "And from the moment that we decided to go, the planning with our engineering team, our networking team, our infrastructure computing team, the software team, all of the preparation in advance.",
    translationVi: "Và từ khoảnh khắc chúng tôi quyết định bắt đầu, khâu lên kế hoạch cùng đội ngũ kỹ sư, đội ngũ mạng, đội ngũ hạ tầng điện toán, đội ngũ phần mềm, tất cả đều được chuẩn bị từ trước.",
    properNouns: [],
    keywords: ["planning", "networking team", "infrastructure computing", "software team", "preparation in advance"]
  },
  {
    startIndex: 111, // "then" (45.84s)
    endIndex: 136,  // "days" (56.44s)
    startTime: 45.60,
    endTime: 56.44,
    text: "Then all of the infrastructure, all of the logistics, and the amount of technology and equipment that came in on that day to train in 19 days.",
    translationVi: "Rồi toàn bộ cơ sở hạ tầng, toàn bộ hậu cần, cùng khối lượng công nghệ và thiết bị khổng lồ đổ về vào ngày hôm đó để bắt đầu vận hành huấn luyện trong 19 ngày.",
    properNouns: ["19 days"],
    keywords: ["infrastructure", "logistics", "technology", "equipment", "train in 19 days"]
  },
  {
    startIndex: 137, // "19" (57.44s)
    endIndex: 169,  // "weeks" (64.60s)
    startTime: 56.44,
    endTime: 65.50,
    text: "19 days! 19 days is incredible. But it's also kind of nice to just take a step back, you know how many days 19 days is? It's just a couple of weeks.",
    translationVi: "19 ngày! 19 ngày thật khó tin. Nhưng cũng nên nhìn lại một chút, bạn có biết 19 ngày là bao nhiêu không? Chỉ là vài tuần ngắn ngủi.",
    properNouns: [],
    keywords: ["incredible", "take a step back", "couple of weeks"]
  },
  {
    startIndex: 171, // "and" (65.72s)
    endIndex: 203,  // "right" (76.56s)
    startTime: 65.50,
    endTime: 76.80,
    text: "And the mountain of technology, if you're ever to see it, is unbelievable: all of the wiring and the networking, just getting this mountain of technology integrated, and all the software. Incredible, right?",
    translationVi: "Và khối lượng công nghệ đồ sộ, nếu bạn từng tận mắt chứng kiến thì thật không thể tin được: toàn bộ hệ thống dây nối và mạng kết nối, chỉ việc tích hợp khối công nghệ khổng lồ này và tất cả phần mềm. Thật phi thường, đúng không?",
    properNouns: [],
    keywords: ["mountain of technology", "wiring", "networking", "integrated", "software"]
  },
  {
    startIndex: 204, // "yeah" (76.76s)
    endIndex: 245,  // "cluster" (90.76s)
    startTime: 76.80,
    endTime: 91.50,
    text: "Yeah, so I think what Elon and the xAI team did, what they achieved is singular, never been done before. Just to put in perspective: 100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.",
    translationVi: "Vâng, nên tôi nghĩ những gì Elon và đội ngũ xAI đã làm, những gì họ đạt được là độc nhất vô nhị, chưa từng có tiền lệ. Để dễ hình dung: 100.000 GPU, đó chắc chắn là siêu máy tính nhanh nhất hành tinh dưới dạng một cụm duy nhất.",
    properNouns: ["Elon", "xAI", "GPU"],
    keywords: ["achieved", "singular", "100,000 GPUs", "fastest supercomputer", "cluster"]
  },
  {
    startIndex: 246, // "a" (91.40s)
    endIndex: 281,  // "days" (106.48s)
    startTime: 91.50,
    endTime: 109.04,
    text: "A supercomputer that you would build would take normally three years to plan, right? And then they deliver the equipment and it takes one year to get it all working. Yes, we're talking about 19 days.",
    translationVi: "Một siêu máy tính thông thường bạn xây dựng phải mất ba năm để lên kế hoạch, đúng không? Rồi họ bàn giao thiết bị và mất thêm một năm nữa để đưa tất cả vào hoạt động. Ở đây chúng ta đang nói về 19 ngày.",
    properNouns: [],
    keywords: ["supercomputer", "normally three years", "deliver equipment", "one year", "19 days"]
  }
];

console.log('=== CALIBRATED 10 VERBATIM SEGMENTS ===');
segments.forEach((s, idx) => {
  const wordsInRange = words.slice(s.startIndex, s.endIndex + 1).map(w => w.word).join(' ');
  console.log(`[#${idx + 1}] ${s.startTime.toFixed(2)}s - ${s.endTime.toFixed(2)}s (${(s.endTime - s.startTime).toFixed(2)}s)`);
  console.log(`  Audio Spoken Words: "${wordsInRange.slice(0, 70)}..."`);
  console.log(`  Target Dictation:   "${s.text.slice(0, 70)}..."`);
});

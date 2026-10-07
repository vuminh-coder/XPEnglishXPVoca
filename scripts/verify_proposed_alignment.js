const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));

// Extract all words from auto
const autoWords = [];
auto.events.forEach(e => {
  if (e.segs) {
    e.segs.forEach(s => {
      const text = s.utf8.trim();
      if (!text || text === '\n') return;
      const start = (e.tStartMs + (s.tOffsetMs || 0)) / 1000;
      autoWords.push({ text, start });
    });
  }
});
for (let i = 0; i < autoWords.length - 1; i++) {
  autoWords[i].end = autoWords[i + 1].start;
}

const PROPOSED_SEGMENTS = [
  {
    orderIndex: 0,
    startTime: 22.49,
    endTime: 32.74,
    text: "Thank you. I am honored to be with you today at your commencement from one of the finest universities in the world.",
    translationVi: "Cảm ơn các bạn. Tôi rất vinh dự được có mặt cùng các bạn hôm nay tại buổi lễ tốt nghiệp của một trong những trường đại học hàng đầu thế giới.",
    properNouns: ["Stanford"],
    keywords: ["honored", "commencement", "finest universities", "world"]
  },
  {
    orderIndex: 1,
    startTime: 35.56,
    endTime: 45.93,
    text: "Truth be told, I never graduated from college, and this is the closest I've ever gotten to a college graduation.",
    translationVi: "Thành thật mà nói, tôi chưa từng tốt nghiệp đại học, và đây là lần tôi đến gần nhất với một buổi lễ tốt nghiệp đại học.",
    properNouns: [],
    keywords: ["truth be told", "graduated", "college", "graduation"]
  },
  {
    orderIndex: 2,
    startTime: 47.98,
    endTime: 54.85,
    text: "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories.",
    translationVi: "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện từ cuộc đời tôi. Chỉ thế thôi. Không có gì to tát. Chỉ ba câu chuyện.",
    properNouns: [],
    keywords: ["three stories", "life", "no big deal"]
  },
  {
    orderIndex: 3,
    startTime: 55.85,
    endTime: 59.57,
    text: "The first story is about connecting the dots.",
    translationVi: "Câu chuyện đầu tiên là về việc kết nối những dấu mốc.",
    properNouns: [],
    keywords: ["first story", "connecting the dots"]
  },
  {
    orderIndex: 4,
    startTime: 61.01,
    endTime: 68.73,
    text: "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit.",
    translationVi: "Tôi đã bỏ học tại Cao đẳng Reed sau 6 tháng đầu tiên, nhưng sau đó vẫn ở lại dự thính thêm khoảng 18 tháng trước khi thực sự nghỉ hẳn.",
    properNouns: ["Reed College"],
    keywords: ["dropped out", "Reed College", "drop-in", "18 months", "quit"]
  },
  {
    orderIndex: 5,
    startTime: 69.41,
    endTime: 74.37,
    text: "So why did I drop out? It started before I was born.",
    translationVi: "Vậy tại sao tôi lại bỏ học? Mọi chuyện bắt đầu từ trước khi tôi ra đời.",
    properNouns: [],
    keywords: ["drop out", "started", "born"]
  },
  {
    orderIndex: 6,
    startTime: 75.25,
    endTime: 81.35,
    text: "My biological mother was a young, unwed graduate student, and she decided to put me up for adoption.",
    translationVi: "Mẹ ruột của tôi khi ấy là một nữ sinh viên cao học trẻ chưa kết hôn, và bà đã quyết định cho tôi làm con nuôi.",
    properNouns: [],
    keywords: ["biological mother", "unwed", "graduate student", "adoption"]
  },
  {
    orderIndex: 7,
    startTime: 82.36,
    endTime: 91.10,
    text: "She felt very strongly that I should be adopted by college graduates, so everything was all set for me to be adopted at birth by a lawyer and his wife.",
    translationVi: "Bà cảm thấy rất kiên quyết rằng tôi phải được nhận nuôi bởi những người tốt nghiệp đại học, vì vậy mọi thứ đã được chuẩn bị sẵn sàng để tôi được một luật sư và vợ ông nhận nuôi ngay khi chào đời.",
    properNouns: [],
    keywords: ["strongly", "college graduates", "adopted at birth", "lawyer"]
  },
  {
    orderIndex: 8,
    startTime: 91.74,
    endTime: 97.55,
    text: "Except that when I popped out, they decided at the last minute that they really wanted a girl.",
    translationVi: "Ngoại trừ việc khi tôi chào đời, họ lại đổi ý vào phút chót vì thực sự muốn có một bé gái.",
    properNouns: [],
    keywords: ["popped out", "last minute", "wanted a girl"]
  },
  {
    orderIndex: 9,
    startTime: 97.92,
    endTime: 106.92,
    text: "So my parents, who were on a waiting list, got a call in the middle of the night asking: 'We have an unexpected baby boy; do you want him?'",
    translationVi: "Nên cha mẹ tôi, những người đang trong danh sách chờ, đã nhận được một cuộc gọi lúc nửa đêm hỏi rằng: 'Chúng tôi có một bé trai ngoài dự kiến; ông bà có muốn nhận cháu không?'",
    properNouns: [],
    keywords: ["waiting list", "middle of the night", "unexpected baby boy"]
  },
  {
    orderIndex: 10,
    startTime: 107.43,
    endTime: 118.47,
    text: "They said: 'Of course.' My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school.",
    translationVi: "Họ trả lời: 'Tất nhiên rồi.' Mẹ ruột của tôi sau đó phát hiện ra rằng mẹ nuôi tôi chưa từng tốt nghiệp đại học và cha nuôi tôi thậm chí chưa từng tốt nghiệp trung học.",
    properNouns: [],
    keywords: ["of course", "biological mother", "never graduated", "high school"]
  },
  {
    orderIndex: 11,
    startTime: 119.16,
    endTime: 128.70,
    text: "She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would go to college.",
    translationVi: "Bà đã từ chối ký giấy tờ nhận nuôi cuối cùng. Bà chỉ mủi lòng vài tháng sau đó khi cha mẹ tôi hứa rằng một ngày nào đó tôi nhất định sẽ được đi học đại học.",
    properNouns: [],
    keywords: ["refused to sign", "adoption papers", "relented", "promised", "go to college"]
  },
  {
    orderIndex: 12,
    startTime: 129.20,
    endTime: 133.00,
    text: "This was the start in my life.",
    translationVi: "Đó là khởi đầu trong cuộc đời tôi.",
    properNouns: [],
    keywords: ["start in my life"]
  },
  {
    orderIndex: 13,
    startTime: 133.72,
    endTime: 147.00,
    text: "And 17 years later I did go to college, but I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents' savings were being spent on my college tuition.",
    translationVi: "Và 17 năm sau, tôi thực sự đã vào đại học, nhưng tôi đã ngây thơ chọn một trường đại học đắt đỏ gần như Stanford, và toàn bộ tiền tiết kiệm của cha mẹ thuộc tầng lớp lao động đều bị tiêu tốn cho học phí đại học của tôi.",
    properNouns: ["Stanford"],
    keywords: ["17 years later", "naively", "expensive as Stanford", "working-class", "college tuition"]
  },
  {
    orderIndex: 14,
    startTime: 147.61,
    endTime: 156.38,
    text: "After six months, I couldn't see the value in it. I had no idea what I wanted to do with my life, and no idea how college was going to help me figure it out.",
    translationVi: "Sau sáu tháng, tôi không thể nhìn thấy giá trị của việc đó. Tôi hoàn toàn không biết mình muốn làm gì với cuộc đời mình, và không biết đại học sẽ giúp tôi tìm ra hướng đi bằng cách nào.",
    properNouns: [],
    keywords: ["six months", "see the value", "no idea", "figure it out"]
  },
  {
    orderIndex: 15,
    startTime: 156.85,
    endTime: 161.40,
    text: "And here I was, spending all of the money my parents had saved their entire life.",
    translationVi: "Và ở đây tôi lại đang tiêu tốn toàn bộ số tiền mà cha mẹ đã dành dụm suốt cả đời họ.",
    properNouns: [],
    keywords: ["spending all of the money", "saved their entire life"]
  },
  {
    orderIndex: 16,
    startTime: 162.40,
    endTime: 166.94,
    text: "So I decided to drop out and trust that it would all work out OK.",
    translationVi: "Vì vậy tôi quyết định bỏ học và tin tưởng rằng mọi chuyện rồi sẽ ổn thỏa.",
    properNouns: [],
    keywords: ["decided to drop out", "trust", "work out OK"]
  },
  {
    orderIndex: 17,
    startTime: 167.40,
    endTime: 172.92,
    text: "It was pretty scary at the time, but looking back it was one of the best decisions I ever made.",
    translationVi: "Lúc đó thật sự khá đáng sợ, nhưng nhìn lại thì đó là một trong những quyết định sáng suốt nhất mà tôi từng đưa ra.",
    properNouns: [],
    keywords: ["pretty scary", "looking back", "best decisions"]
  }
];

console.log('=== VERIFYING GAP AND OVERLAPS ===');
let hasOverlap = false;
for (let i = 0; i < PROPOSED_SEGMENTS.length - 1; i++) {
  const cur = PROPOSED_SEGMENTS[i];
  const next = PROPOSED_SEGMENTS[i + 1];
  const gap = next.startTime - cur.endTime;
  console.log(`Seg #${i + 1} (${cur.startTime}s - ${cur.endTime}s) -> Seg #${i + 2} (${next.startTime}s - ${next.endTime}s): gap = ${gap.toFixed(2)}s`);
  if (gap < 0) {
    console.error(`OVERLAP DETECTED between #${i + 1} and #${i + 2}!`);
    hasOverlap = true;
  }
}

if (!hasOverlap) {
  console.log('SUCCESS: Zero overlaps across all 18 segments!');
}

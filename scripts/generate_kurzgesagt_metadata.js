const fs = require('fs');
const sub = JSON.parse(fs.readFileSync('scripts/kurzgesagt_raw.en.json3', 'utf8'));
const lines = sub.events.filter(e => e.segs).map(e => ({
  start: e.tStartMs / 1000,
  duration: e.dDurationMs / 1000,
  end: (e.tStartMs + e.dDurationMs) / 1000,
  text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
})).filter(l => l.text);

const groups = [
  // 1
  {
    orderIndex: 1,
    segs: [0],
    text: "Could aliens destroy us from light years away?",
    translationVi: "Liệu người ngoài hành tinh có thể tiêu diệt chúng ta từ cách xa hàng năm ánh sáng?",
    explanationAi: "Cụm từ 'light years away' (cách xa hàng năm ánh sáng - đơn vị đo khoảng cách trong thiên văn học). Cấu trúc câu hỏi phỏng đoán với khiếm khuyết động từ 'Could'.",
    properNouns: [],
    keywords: ["aliens", "destroy", "light years", "away"]
  },
  // 2
  {
    orderIndex: 2,
    segs: [1, 2],
    text: "Mh, another day at the Kurzgesagt Labs, where we answer the most important questions with science.",
    translationVi: "Lại một ngày nữa tại Phòng thí nghiệm Kurzgesagt, nơi chúng tôi giải đáp những câu hỏi quan trọng nhất bằng khoa học.",
    explanationAi: "'Kurzgesagt Labs' (Phòng thí nghiệm Kurzgesagt). Mệnh đề quan hệ 'where we answer...' bổ nghĩa cho địa điểm.",
    properNouns: ["Kurzgesagt Labs"],
    keywords: ["Kurzgesagt", "Labs", "answer", "questions", "science"]
  },
  // 3
  {
    orderIndex: 3,
    segs: [3, 4],
    text: "Today: how might civilizations wage war across light years?",
    translationVi: "Hôm nay: các nền văn minh có thể tiến hành chiến tranh xuyên qua các năm ánh sáng như thế nào?",
    explanationAi: "Động từ 'wage war' (tiến hành/phát động chiến tranh), 'civilizations' (các nền văn minh vũ trụ).",
    properNouns: [],
    keywords: ["civilizations", "wage war", "across", "light years"]
  },
  // 4
  {
    orderIndex: 4,
    segs: [5, 6],
    text: "What kind of devastating weapons could they use, and what would they look like?",
    translationVi: "Họ có thể sử dụng loại vũ khí hủy diệt nào, và chúng sẽ trông như thế nào?",
    explanationAi: "Tính từ 'devastating' (mang tính tàn phá, hủy diệt ghê gớm) và cụm 'look like' (trông như thế nào).",
    properNouns: [],
    keywords: ["devastating", "weapons", "use", "look like"]
  },
  // 5
  {
    orderIndex: 5,
    segs: [7],
    text: "Meet our two players.",
    translationVi: "Hãy cùng gặp gỡ hai đấu thủ của chúng ta.",
    explanationAi: "Ẩn dụ hài hước 'players' (các bên tham chiến / đấu thủ trên bàn cờ liên sao).",
    properNouns: [],
    keywords: ["meet", "players"]
  },
  // 6
  {
    orderIndex: 6,
    segs: [8],
    text: "A yellow dwarf star system home to a species of primates.",
    translationVi: "Một hệ sao lùn vàng, ngôi nhà của một loài linh trưởng.",
    explanationAi: "Khái niệm thiên văn 'yellow dwarf star' (ngôi sao lùn vàng - chính là Mặt Trời của chúng ta) và 'primates' (bộ linh trưởng / loài vượn người).",
    properNouns: [],
    keywords: ["yellow dwarf", "star system", "species", "primates"]
  },
  // 7
  {
    orderIndex: 7,
    segs: [9, 10],
    text: "\"Humans,\" as they call themselves, recently became a technological civilization.",
    translationVi: "\"Con người,\" như cách họ tự gọi mình, gần đây đã trở thành một nền văn minh công nghệ.",
    explanationAi: "Cụm 'technological civilization' (nền văn minh làm chủ công nghệ kỹ thuật).",
    properNouns: ["Humans"],
    keywords: ["humans", "call themselves", "technological", "civilization"]
  },
  // 8
  {
    orderIndex: 8,
    segs: [11],
    text: "They have rockets, nuclear reactors and memes.",
    translationVi: "Họ sở hữu tên lửa, lò phản ứng hạt nhân và cả ảnh chế (meme).",
    explanationAi: "'Nuclear reactors' (các lò phản ứng hạt nhân) và nét hài hước quen thuộc của Kurzgesagt khi liệt kê 'memes' cùng công nghệ đỉnh cao.",
    properNouns: [],
    keywords: ["rockets", "nuclear reactors", "memes"]
  },
  // 9
  {
    orderIndex: 9,
    segs: [12],
    text: "How cute!",
    translationVi: "Thật là dễ thương làm sao!",
    explanationAi: "Câu cảm thán châm biếm 'How cute!' (dễ thương / ngây thơ trước quy mô vũ trụ).",
    properNouns: [],
    keywords: ["cute"]
  },
  // 10
  {
    orderIndex: 10,
    segs: [13],
    text: "The Smorpians disagree.",
    translationVi: "Nhưng người Smorpian thì không nghĩ vậy.",
    explanationAi: "'The Smorpians' (tên giống loài ngoài hành tinh hư cấu do Kurzgesagt tạo ra).",
    properNouns: ["Smorpians"],
    keywords: ["Smorpians", "disagree"]
  },
  // 11
  {
    orderIndex: 11,
    segs: [14, 15],
    text: "They reside on a planet around the orange dwarf star HD 40307, 42 light years away.",
    translationVi: "Họ cư trú trên một hành tinh quay quanh ngôi sao lùn cam HD 40307, cách xa 42 năm ánh sáng.",
    explanationAi: "Tọa độ thiên văn học có thật 'HD 40307' (ngôi sao lùn cam trong chòm sao Hội Họa) và 'orange dwarf star'.",
    properNouns: ["HD 40307"],
    keywords: ["reside", "planet", "orange dwarf", "HD 40307", "light years"]
  },
  // 12
  {
    orderIndex: 12,
    segs: [16, 17],
    text: "Smorpian civilization developed earlier than humans and they have much better technology.",
    translationVi: "Nền văn minh Smorpian phát triển sớm hơn loài người và họ sở hữu công nghệ vượt trội hơn nhiều.",
    explanationAi: "So sánh hơn 'earlier than' và cụm nhấn mạnh 'much better technology'.",
    properNouns: ["Smorpian"],
    keywords: ["civilization", "developed", "earlier", "better technology"]
  },
  // 13
  {
    orderIndex: 13,
    segs: [18, 19],
    text: "They've recently built a Dyson swarm around their star which gives them near limitless energy.",
    translationVi: "Gần đây họ đã chế tạo một bầy vệ tinh Dyson bao quanh ngôi sao của mình, đem lại nguồn năng lượng gần như vô hạn.",
    explanationAi: "Khái niệm vật lý giả thuyết nổi tiếng 'Dyson swarm' (chuỗi bầy cấu trúc thu hoạch toàn bộ năng lượng của một ngôi sao) và 'near limitless energy'.",
    properNouns: ["Dyson"],
    keywords: ["Dyson swarm", "star", "limitless energy"]
  },
  // 14
  {
    orderIndex: 14,
    segs: [20, 21, 22],
    text: "And they noticed humanity, which is unfortunate as the Smorpians are planning a hyperspace bypass through our solar system,",
    translationVi: "Và họ đã để mắt tới nhân loại, điều này thật không may vì người Smorpian đang lên kế hoạch làm một đường vòng siêu không gian xuyên qua hệ mặt trời của chúng ta,",
    explanationAi: "'Hyperspace bypass' (đường tránh / tuyến đường siêu không gian - chi tiết tri ân tác phẩm The Hitchhiker's Guide to the Galaxy).",
    properNouns: ["Smorpians"],
    keywords: ["noticed", "humanity", "unfortunate", "hyperspace bypass", "solar system"]
  },
  // 15
  {
    orderIndex: 15,
    segs: [23],
    text: "So they decided that humanity has to go.",
    translationVi: "Vì vậy họ quyết định rằng nhân loại cần phải bị xóa sổ.",
    explanationAi: "Thành ngữ nói giảm nói tránh 'has to go' (phải biến mất / bị tiêu diệt hoàn toàn).",
    properNouns: [],
    keywords: ["decided", "humanity", "go"]
  },
  // 16
  {
    orderIndex: 16,
    segs: [24],
    text: "Interstellar war is hard though.",
    translationVi: "Tuy nhiên, chiến tranh liên sao lại vô cùng nan giải.",
    explanationAi: "Cụm từ 'Interstellar war' (chiến tranh giữa các vì sao) và liên từ chuyển ý ở cuối câu 'though'.",
    properNouns: [],
    keywords: ["interstellar war", "hard"]
  },
  // 17
  {
    orderIndex: 17,
    segs: [25],
    text: "Front lines, tactics, and logistics are meaningless at these scales.",
    translationVi: "Tiền tuyến, chiến thuật và hậu cần đều trở nên vô nghĩa ở những quy mô vũ trụ này.",
    explanationAi: "Bộ ba thuật ngữ quân sự kinh điển: 'Front lines' (tiền tuyến), 'tactics' (chiến thuật), 'logistics' (hậu cần vận tải) và 'meaningless' (vô nghĩa).",
    properNouns: [],
    keywords: ["front lines", "tactics", "logistics", "meaningless", "scales"]
  },
  // 18
  {
    orderIndex: 18,
    segs: [26],
    text: "It's also fought across time.",
    translationVi: "Nó còn là cuộc chiến bị chi phối bởi dòng thời gian.",
    explanationAi: "Thể bị động 'is fought across time' (được tiến hành kéo dài qua các thang đo thời gian khổng lồ).",
    properNouns: [],
    keywords: ["fought", "across time"]
  },
  // 19
  {
    orderIndex: 19,
    segs: [27, 28],
    text: "Decades will pass between firing a weapon and learning whether it hit or not.",
    translationVi: "Nhiều thập kỷ sẽ trôi qua giữa thời điểm khai hỏa vũ khí và lúc biết được nó có bắn trúng đích hay không.",
    explanationAi: "Khoảng cách thời gian 'decades will pass' và mệnh đề so sánh 'between firing a weapon and learning whether it hit or not'.",
    properNouns: [],
    keywords: ["decades", "pass", "firing", "weapon", "learning", "hit"]
  },
  // 20
  {
    orderIndex: 20,
    segs: [29],
    text: "Sending an invasion fleet is futile.",
    translationVi: "Việc phái một hạm đội xâm lược là hoàn toàn vô ích.",
    explanationAi: "Thuật ngữ quân sự khoa học viễn tưởng 'invasion fleet' (hạm đội xâm lăng) và tính từ 'futile' (vô ích, vô vọng).",
    properNouns: [],
    keywords: ["sending", "invasion fleet", "futile"]
  },
  // 21
  {
    orderIndex: 21,
    segs: [30, 31, 32],
    text: "Even if the Smorpians travel in a large fraction of the speed of light, the journey to Earth would take decades or even centuries, and humans would have plenty of time to prepare.",
    translationVi: "Ngay cả khi người Smorpian di chuyển với một phần đáng kể của tốc độ ánh sáng, hành trình đến Trái Đất cũng sẽ mất hàng thập kỷ hoặc thậm chí hàng thế kỷ, và con người sẽ có dư dả thời gian để chuẩn bị.",
    explanationAi: "'Fraction of the speed of light' (phân số/tỷ lệ của vận tốc ánh sáng) và cấu trúc điều kiện giả định 'even if... would take... would have...'.",
    properNouns: ["Smorpians", "Earth"],
    keywords: ["travel", "speed of light", "journey", "centuries", "prepare"]
  }
];

console.log('Total segments:', groups.length);
groups.forEach(g => {
  const start = lines[g.segs[0]].start;
  const end = lines[g.segs[g.segs.length - 1]].end;
  console.log(`${g.orderIndex}. [${start.toFixed(2)}s - ${end.toFixed(2)}s] (${(end - start).toFixed(2)}s): "${g.text}"`);
});

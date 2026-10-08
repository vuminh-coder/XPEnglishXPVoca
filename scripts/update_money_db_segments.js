const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const calibratedSegments = [
  {
    orderIndex: 0,
    startTime: 0.08,
    endTime: 5.20,
    text: "In the book, The Psychology of Money, Morgan Housel shares Warren Buffett's real secret.",
    translationVi: "Trong cuốn sách Tâm Lý Học Về Tiền, Morgan Housel đã chia sẻ bí mật thực sự của Warren Buffett.",
    ipaUs: "/ɪn ðə bʊk ðə saɪˈkɑːlədʒi əv ˈmʌni ˈmɔːrɡən ˈhaʊsəl ʃerz ˈwɔːrən ˈbʌfəts ˈriːəl ˈsiːkrət/",
    tokenCount: 14,
  },
  {
    orderIndex: 1,
    startTime: 5.50,
    endTime: 8.60,
    text: "It's not stock-picking, it's patience.",
    translationVi: "Bí quyết đó không phải là việc chọn cổ phiếu khôn ngoan, mà chính là sự kiên nhẫn.",
    ipaUs: "/ɪts nɑːt stɑːk ˈpɪkɪŋ ɪts ˈpeɪʃəns/",
    tokenCount: 5,
  },
  {
    orderIndex: 2,
    startTime: 8.80,
    endTime: 13.00,
    text: "Housel explains that compound interest only works if you stay in the game.",
    translationVi: "Housel giải thích rằng lãi suất kép chỉ phát huy tác dụng nếu bạn tiếp tục ở lại trong cuộc chơi.",
    ipaUs: "/ˈhaʊsəl ɪkˈspleɪnz ðæt ˈkɑːmpaʊnd ˈɪntrəst ˈoʊnli wɜːrks ɪf juː steɪ ɪn ðə ɡeɪm/",
    tokenCount: 12,
  },
  {
    orderIndex: 3,
    startTime: 13.20,
    endTime: 19.00,
    text: "Most people want to get rich fast. They jump in, jump out, chase trends, and end up with nothing.",
    translationVi: "Hầu hết mọi người đều muốn làm giàu thật nhanh. Họ nhảy vào rồi nhảy ra, chạy theo xu hướng, và rốt cuộc chẳng còn lại gì.",
    ipaUs: "/moʊst ˈpiːpl wɑːnt tuː ɡet rɪtʃ fæst ðeɪ dʒʌmp ɪn dʒʌmp aʊt tʃeɪs trendz ænd end ʌp wɪð ˈnʌθɪŋ/",
    tokenCount: 19,
  },
  {
    orderIndex: 4,
    startTime: 19.00,
    endTime: 23.00,
    text: "But Buffett? He's been investing for more than 70 years.",
    translationVi: "Nhưng với Buffett thì sao? Ông ấy đã đầu tư liên tục trong hơn 70 năm qua.",
    ipaUs: "/bʌt ˈbʌfət hiːz bɪn ɪnˈvestɪŋ fɔːr mɔːr ðæn ˈsevənti jɪrz/",
    tokenCount: 10,
  },
  {
    orderIndex: 5,
    startTime: 23.10,
    endTime: 27.00,
    text: "The magic isn't his IQ. It's that he never left the table.",
    translationVi: "Phép màu không nằm ở chỉ số IQ của ông. Mà nằm ở chỗ ông chưa bao giờ rời khỏi bàn cờ cuộc chơi.",
    ipaUs: "/ðə ˈmædʒɪk ˈɪznt hɪz ˌaɪˈkjuː ɪts ðæt hiː ˈnevər left ðə ˈteɪbl/",
    tokenCount: 12,
  },
  {
    orderIndex: 6,
    startTime: 27.10,
    endTime: 33.00,
    text: "Compounding needs time, not genius. That's the lesson from The Psychology of Money.",
    translationVi: "Lãi kép cần thời gian chứ không cần thiên tài. Đó chính là bài học cốt lõi từ Tâm Lý Học Về Tiền.",
    ipaUs: "/kəmˈpaʊndɪŋ niːdz taɪm nɑːt ˈdʒiːniəs ðæts ðə ˈlesn frəm ðə saɪˈkɑːlədʒi əv ˈmʌni/",
    tokenCount: 13,
  },
  {
    orderIndex: 7,
    startTime: 33.10,
    endTime: 42.00,
    text: "If you want wealth, stop rushing. Be patient. Stay consistent. That's the real secret. So master your mind, not the market.",
    translationVi: "Nếu bạn muốn giàu có, hãy ngừng vội vã. Hãy kiên nhẫn. Hãy kiên định. Đó mới là bí mật đích thực. Vì vậy hãy làm chủ tâm trí bạn, chứ không phải thị trường.",
    ipaUs: "/ɪf juː wɑːnt welθ stɑːp ˈrʌʃɪŋ biː ˈpeɪʃənt steɪ kənˈsɪstənt ðæts ðə ˈriːəl ˈsiːkrət soʊ ˈmæstər jʊər maɪnd nɑːt ðə ˈmɑːrkɪt/",
    tokenCount: 22,
  },
  {
    orderIndex: 8,
    startTime: 42.20,
    endTime: 47.50,
    text: "Comment. Do you think money is more math or behavior?",
    translationVi: "Hãy bình luận bên dưới. Bạn nghĩ rằng tiền bạc thiên về toán học hay hành vi hơn?",
    ipaUs: "/ˈkɑːment duː juː θɪŋk ˈmʌni ɪz mɔːr mæθ ɔːr bɪˈheɪvjər/",
    tokenCount: 10,
  },
];

async function updateDb() {
  const lesson = await prisma.videoLesson.findFirst({
    where: { externalId: 'DOgVUMfcb7U' }
  });

  if (!lesson) {
    console.error('Lesson not found in DB!');
    return;
  }

  console.log(`Updating DB segments for lesson ${lesson.id}...`);

  for (const seg of calibratedSegments) {
    const existing = await prisma.lessonSegment.findFirst({
      where: {
        lessonId: lesson.id,
        orderIndex: seg.orderIndex
      }
    });

    if (existing) {
      await prisma.lessonSegment.update({
        where: { id: existing.id },
        data: {
          startTime: seg.startTime,
          endTime: seg.endTime,
          tokenCount: seg.tokenCount,
          translationVi: seg.translationVi,
          ipaUs: seg.ipaUs
        }
      });
      console.log(`Updated seg #${seg.orderIndex}: ${seg.startTime}s - ${seg.endTime}s`);
    }
  }

  console.log('Successfully updated all 9 segments in database!');
  await prisma.$disconnect();
}

updateDb().catch(err => {
  console.error(err);
  process.exit(1);
});

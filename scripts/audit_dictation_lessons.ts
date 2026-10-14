import { ALL_MODULAR_MOVIE_LESSONS } from '../features/listening/data/topics';
import { ALL_MODULAR_LESSONS } from '../features/listening/data/lessons';
import { MOCK_VIDEO_CATEGORIES } from '../features/listening/data/categories';
import fs from 'fs';

console.log('===============================================================');
console.log('🔍 BÁO CÁO TOÀN DIỆN: RÀ SOÁT TẤT CẢ VIDEO BÀI HỌC DICTATION');
console.log('===============================================================');
console.log('🎬 Tổng số phim điện ảnh (ALL_MODULAR_MOVIE_LESSONS):', ALL_MODULAR_MOVIE_LESSONS.length);
console.log('📚 Tổng số bài học kiến thức/đời sống (ALL_MODULAR_LESSONS):', ALL_MODULAR_LESSONS.length);
console.log('🔥 TỔNG SỐ BÀI HỌC VIDEO TRONG HỆ THỐNG:', ALL_MODULAR_MOVIE_LESSONS.length + ALL_MODULAR_LESSONS.length);

const allLessons = [...ALL_MODULAR_MOVIE_LESSONS, ...ALL_MODULAR_LESSONS];
const testFiles = fs.readdirSync('__tests__');

interface AuditResult {
  id: string;
  title: string;
  externalId: string;
  categoryId: string;
  segsCount: number;
  durationSeconds: number;
  issues: string[];
  isMaster: boolean;
}

function auditLesson(lesson: any): AuditResult {
  const issues: string[] = [];
  const segs = lesson.segments || [];

  // 1. Kiểm tra 1-indexed
  if (segs.length > 0) {
    if (segs[0].orderIndex === 0) {
      issues.push('0-indexed (vẫn chạy từ 0..N-1, cần chuyển 1-indexed 1..N)');
    } else if (segs[0].orderIndex !== 1) {
      issues.push('orderIndex không bắt đầu từ 1 (bắt đầu từ ' + segs[0].orderIndex + ')');
    }
  } else {
    issues.push('Không có segments nào');
  }

  // 2. Kiểm tra missing fields & định dạng chuẩn
  let missingIpa = 0;
  let missingTranslation = 0;
  let missingKeywords = 0;
  let missingExplanation = 0;
  let tokenCountMismatch = 0;
  let ipaUnwrapped = 0;

  segs.forEach((s: any, idx: number) => {
    if (!s.ipaUs || s.ipaUs.trim() === '') missingIpa++;
    else if (!s.ipaUs.startsWith('/') || !s.ipaUs.endsWith('/')) ipaUnwrapped++;

    if (!s.translationVi || s.translationVi.trim() === '') missingTranslation++;
    if (!s.keywords || s.keywords.length === 0) missingKeywords++;
    if (!s.explanationAi || s.explanationAi.trim() === '') missingExplanation++;

    const expectedTokens = (s.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
    if (s.tokenCount !== expectedTokens) tokenCountMismatch++;
  });

  if (missingIpa > 0) issues.push('Thiếu ipaUs: ' + missingIpa + '/' + segs.length + ' segments');
  if (ipaUnwrapped > 0) issues.push('ipaUs chưa bọc /.../: ' + ipaUnwrapped + '/' + segs.length + ' segments');
  if (missingTranslation > 0) issues.push('Thiếu translationVi: ' + missingTranslation + '/' + segs.length + ' segments');
  if (missingKeywords > 0) issues.push('Thiếu keywords: ' + missingKeywords + '/' + segs.length + ' segments');
  if (missingExplanation > 0) issues.push('Thiếu explanationAi: ' + missingExplanation + '/' + segs.length + ' segments');
  if (tokenCountMismatch > 0) issues.push('tokenCount không khớp regex: ' + tokenCountMismatch + '/' + segs.length + ' segments');

  // 3. Kiểm tra Quiz
  const quiz = lesson.quiz;
  if (!quiz) {
    issues.push('Chưa có bộ Quiz đọc hiểu');
  } else {
    const qCount = quiz.questions?.length || 0;
    if (qCount < 8) {
      issues.push('Quiz chỉ có ' + qCount + '/8 câu hỏi');
    }
    let invalidRef = 0;
    quiz.questions?.forEach((q: any) => {
      if (typeof q.referenceSegmentIndex !== 'number' || q.referenceSegmentIndex < 1 || q.referenceSegmentIndex > segs.length) {
        invalidRef++;
      }
    });
    if (invalidRef > 0) {
      issues.push('Quiz referenceSegmentIndex chưa chuẩn 1-indexed (hoặc ngoài phạm vi 1..' + segs.length + '): ' + invalidRef + ' câu');
    }
  }

  return {
    id: lesson.id,
    title: lesson.title,
    externalId: lesson.externalId,
    categoryId: lesson.categoryId,
    segsCount: segs.length,
    durationSeconds: lesson.durationSeconds,
    issues,
    isMaster: issues.length === 0,
  };
}

const audited = allLessons.map(auditLesson);
const masterList = audited.filter((a) => a.isMaster);
const needWorkList = audited.filter((a) => !a.isMaster);

console.log('\n===============================================================');
console.log('📊 TỔNG KẾT TRẠNG THÁI TOÀN HỆ THỐNG:');
console.log('✅ ĐÃ ĐẠT CHUẨN MASTER EDITION 100%:', masterList.length, '/', allLessons.length, 'bài (' + Math.round(masterList.length / allLessons.length * 100) + '%)');
console.log('⚠️ CHƯA XỬ LÝ / CẦN NÂNG CẤP:', needWorkList.length, '/', allLessons.length, 'bài (' + Math.round(needWorkList.length / allLessons.length * 100) + '%)');
console.log('===============================================================');

// Phân nhóm theo danh mục
const byCategory: Record<string, { total: number; master: number; needWork: AuditResult[] }> = {};

MOCK_VIDEO_CATEGORIES.forEach((c) => {
  byCategory[c.id] = { total: 0, master: 0, needWork: [] };
});

audited.forEach((item) => {
  if (!byCategory[item.categoryId]) {
    byCategory[item.categoryId] = { total: 0, master: 0, needWork: [] };
  }
  byCategory[item.categoryId].total++;
  if (item.isMaster) {
    byCategory[item.categoryId].master++;
  } else {
    byCategory[item.categoryId].needWork.push(item);
  }
});

console.log('\n📂 BẢNG THỐNG KÊ CHI TIẾT THEO DANH MỤC:');
Object.entries(byCategory).forEach(([catId, data]) => {
  const catObj = MOCK_VIDEO_CATEGORIES.find((c) => c.id === catId);
  const catName = catObj ? catObj.name : catId;
  const statusIcon = data.needWork.length === 0 ? '🟢 HOÀN THÀNH' : '🟡 ĐANG CHỜ';
  console.log(`- [${catId}] ${catName}: ${data.master}/${data.total} Master [${statusIcon}]`);
});

if (needWorkList.length > 0) {
  console.log('\n===============================================================');
  console.log('📋 CHI TIẾT TỪNG BÀI CHƯA XỬ LÝ / CẦN NÂNG CẤP (' + needWorkList.length + ' bài):');
  console.log('===============================================================');
  needWorkList.forEach((item, idx) => {
    console.log(`\n${idx + 1}. [${item.categoryId}] ID: "${item.id}" (YouTube: ${item.externalId})`);
    console.log(`   Tựa đề: "${item.title}"`);
    console.log(`   Thời lượng: ${item.durationSeconds}s | Số segments: ${item.segsCount}`);
    console.log(`   Các vấn đề cần xử lý:`);
    item.issues.forEach((iss) => console.log(`     👉 ❌ ${iss}`));
  });
}

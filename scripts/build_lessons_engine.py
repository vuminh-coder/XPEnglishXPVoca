# scripts/build_lessons_engine.py
import os
import json
import re

def generate_ts_lesson(config, segments, questions):
    """
    Generates a complete TypeScript file for a romance video lesson.
    """
    lesson_id = config["id"]
    slug = config["slug"]
    var_lesson = config["var_lesson"]
    var_quiz = config["var_quiz"]
    title = config["title"]
    external_id = config["externalId"]
    duration_secs = config["durationSeconds"]
    duration_fmt = config["durationFormatted"]
    cefr = config["cefrLevel"]
    accent = config["accent"]
    wpm = config["wpmSpeed"]
    views = config["viewCount"]
    studies = config["studyCount"]
    desc = config["description"]
    
    # Format segments JSON
    seg_code_lines = []
    for s in segments:
        seg_code_lines.append("    {")
        seg_code_lines.append(f"      orderIndex: {s['orderIndex']},")
        seg_code_lines.append(f"      startTime: {s['startTime']},")
        seg_code_lines.append(f"      endTime: {s['endTime']},")
        escaped_text = s['text'].replace('"', '\\"')
        seg_code_lines.append(f'      text: "{escaped_text}",')
        escaped_vi = s['translationVi'].replace('"', '\\"')
        seg_code_lines.append(f'      translationVi: "{escaped_vi}",')
        if s.get('ipaUs'):
            escaped_ipa = s['ipaUs'].replace('"', '\\"')
            seg_code_lines.append(f'      ipaUs: "{escaped_ipa}",')
        if s.get('keywords'):
            kws = json.dumps(s['keywords'], ensure_ascii=False)
            seg_code_lines.append(f"      keywords: {kws},")
        if s.get('explanationAi'):
            escaped_exp = s['explanationAi'].replace('"', '\\"')
            seg_code_lines.append(f'      explanationAi: "{escaped_exp}",')
        if s.get('properNouns'):
            pns = json.dumps(s['properNouns'], ensure_ascii=False)
            seg_code_lines.append(f"      properNouns: {pns},")
        else:
            seg_code_lines.append("      properNouns: [],")
        token_count = len([w for w in s['text'].strip().split() if len(re.sub(r'^[^\w]+|[^\w]+$', '', w, flags=re.UNICODE)) > 0])
        seg_code_lines.append(f"      tokenCount: {token_count},")
        seg_code_lines.append("    },")
    segments_str = "\n".join(seg_code_lines)

    # Format questions JSON
    q_code_lines = []
    for q in questions:
        q_code_lines.append("    {")
        q_code_lines.append(f'      id: "{q["id"]}",')
        escaped_q = q["question"].replace('"', '\\"')
        q_code_lines.append(f'      question: "{escaped_q}",')
        q_code_lines.append(f'      questionEn: "{escaped_q}",')
        escaped_qvi = q.get("questionVi", q["question"]).replace('"', '\\"')
        q_code_lines.append(f'      questionVi: "{escaped_qvi}",')
        
        opts = json.dumps(q["options"], ensure_ascii=False)
        opts_vi = json.dumps(q.get("optionsVi", q["options"]), ensure_ascii=False)
        q_code_lines.append(f"      options: {opts},")
        q_code_lines.append(f"      optionsEn: {opts},")
        q_code_lines.append(f"      optionsVi: {opts_vi},")
        q_code_lines.append(f"      correctAnswer: {q['correctAnswer']},")
        
        escaped_exp = q["explanation"].replace('"', '\\"')
        escaped_exp_vi = q.get("explanationVi", q["explanation"]).replace('"', '\\"')
        q_code_lines.append(f'      explanation: "{escaped_exp}",')
        q_code_lines.append(f'      explanationEn: "{escaped_exp}",')
        q_code_lines.append(f'      explanationVi: "{escaped_exp_vi}",')
        
        tc = q.get("targetedConcept", "Listening comprehension").replace('"', '\\"')
        tc_vi = q.get("targetedConceptVi", "Đọc hiểu thính giác").replace('"', '\\"')
        q_code_lines.append(f'      targetedConcept: "{tc}",')
        q_code_lines.append(f'      targetedConceptEn: "{tc}",')
        q_code_lines.append(f'      targetedConceptVi: "{tc_vi}",')
        if "referenceSegmentIndex" in q:
            q_code_lines.append(f"      referenceSegmentIndex: {q['referenceSegmentIndex']},")
        q_code_lines.append("    },")
    questions_str = "\n".join(q_code_lines)

    cat_id = config.get("categoryId", "cat_romance_cinema")
    cat_slug = config.get("categorySlug", "romance-cinema")
    cat_name = config.get("categoryName", "Phim Lãng Mạn & Cảm Xúc")

    content = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: {title}
 * Category: {cat_name} ({cat_id})
 * Level: CEFR {cefr} | {accent}
 * YouTube ID: {external_id} ({duration_fmt} - {duration_secs}s)
 * Views: {views:,} | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC
 * ============================================================================
 */

export const {var_quiz}: VideoQuizData = {{
  lessonId: "{lesson_id}",
  lessonTitle: "{title.replace('\"', '\\\"')}",
  totalQuestions: {len(questions)},
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
{questions_str}
  ],
}};

export const {var_lesson}: MockVideoLesson = {{
  id: "{lesson_id}",
  slug: "{slug}",
  title: "{title.replace('\"', '\\\"')}",
  categoryId: "{cat_id}",
  categorySlug: "{cat_slug}",
  categoryName: "{cat_name}",
  cefrLevel: "{cefr}",
  durationFormatted: "{duration_fmt}",
  durationSeconds: {duration_secs},
  externalId: "{external_id}",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/{external_id}/hqdefault.jpg",
  accent: "{accent}",
  wpmSpeed: {wpm},
  viewCount: {views},
  studyCount: {studies},
  description:
    "{desc.replace('\"', '\\\"')}",
  segments: [
{segments_str}
  ],
  quiz: {var_quiz},
}};

export default {var_lesson};
'''
    return content

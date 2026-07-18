export interface WordAlignment {
  word: string;
  offset: number; // in milliseconds from sentence start
}

export interface TranscriptSentence {
  sentenceId: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  text: string;
  vietnamese: string;
  words?: WordAlignment[];
}

export interface VocabularyItem {
  word: string;
  ipa?: string;
  pos?: string;
  vietnamese: string;
  example?: string;
}

export interface ListeningQuiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface ListeningLesson {
  id: string;
  title: string;
  audioUrl?: string;
  level?: string;
  duration?: string;
  category?: string;
  tags?: string[];
  vocabularyList: VocabularyItem[];
  transcript: TranscriptSentence[];
  quizzes: ListeningQuiz[];
}

/**
 * Helper to convert timestamp [mm:ss.SS] or [mm:ss] to seconds
 */
function parseTimestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(":");
  if (parts.length < 2) return 0;
  
  const minutes = parseInt(parts[0], 10);
  const secondsWithMs = parts[1];
  
  const secParts = secondsWithMs.split(".");
  const seconds = parseInt(secParts[0], 10);
  let ms = 0;
  if (secParts.length > 1) {
    const msStr = secParts[1];
    if (msStr.length === 2) {
      ms = parseInt(msStr, 10) * 10; // centiseconds to milliseconds
    } else {
      ms = parseInt(msStr.padEnd(3, "0").substring(0, 3), 10);
    }
  }
  
  return minutes * 60 + seconds + ms / 1000;
}

export function parseListeningMarkdown(markdownText: string): ListeningLesson {
  const lines = markdownText.split(/\r?\n/);
  
  // Initialize output
  const lesson: ListeningLesson = {
    id: "unknown",
    title: "Untitled Lesson",
    vocabularyList: [],
    transcript: [],
    quizzes: []
  };

  let currentSection = "";
  let frontmatterLines: string[] = [];
  let isFrontmatter = false;
  
  let currentSentence: Partial<TranscriptSentence> | null = null;
  let currentQuiz: Partial<ListeningQuiz> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. Detect Frontmatter
    if (i === 0 && line === "---") {
      isFrontmatter = true;
      continue;
    }
    if (isFrontmatter) {
      if (line === "---") {
        isFrontmatter = false;
        // Parse frontmatter
        frontmatterLines.forEach(fmLine => {
          const colonIdx = fmLine.indexOf(":");
          if (colonIdx === -1) return;
          const key = fmLine.substring(0, colonIdx).trim().toLowerCase();
          let val = fmLine.substring(colonIdx + 1).trim();
          // Strip quotes if present
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.substring(1, val.length - 1);
          }

          if (key === "id") lesson.id = val;
          else if (key === "title") lesson.title = val;
          else if (key === "audio_url") lesson.audioUrl = val;
          else if (key === "level") lesson.level = val;
          else if (key === "duration") lesson.duration = val;
          else if (key === "category") lesson.category = val;
          else if (key === "tags") {
            try {
              // Try to parse array like ["tag1", "tag2"] or split by comma
              if (val.startsWith("[") && val.endsWith("]")) {
                lesson.tags = JSON.parse(val.replace(/'/g, '"'));
              } else {
                lesson.tags = val.split(",").map(t => t.trim()).filter(Boolean);
              }
            } catch {
              lesson.tags = val.split(",").map(t => t.trim()).filter(Boolean);
            }
          }
        });
        continue;
      }
      frontmatterLines.push(lines[i]);
      continue;
    }

    // 2. Detect Sections
    if (line.startsWith("#")) {
      const secName = line.replace(/^#+\s*/, "").toUpperCase();
      if (secName.includes("VOCABULARY")) {
        currentSection = "VOCABULARY";
      } else if (secName.includes("TRANSCRIPT")) {
        currentSection = "TRANSCRIPT";
        // finalize any trailing sentence
        if (currentSentence) {
          lesson.transcript.push(currentSentence as TranscriptSentence);
          currentSentence = null;
        }
      } else if (secName.includes("QUIZ")) {
        currentSection = "QUIZ";
        // finalize any trailing sentence
        if (currentSentence) {
          lesson.transcript.push(currentSentence as TranscriptSentence);
          currentSentence = null;
        }
      }
      continue;
    }

    if (!currentSection) continue;

    // 3. Parse Vocabulary
    if (currentSection === "VOCABULARY") {
      if (line.startsWith("-")) {
        // Regex fits: - relocate /ˌriː.loʊˈkeɪt/ (v): chuyển chỗ, di dời. E.g., The staff...
        const vocReg = /^-\s*([^(/\s:][^(/\s]*?)\s*(?:\/([^/]+)\/)?\s*(?:\(([^)]+)\))?\s*:\s*(.*?)(?:\s*E\.g\.,?\s*(.*))?$/;
        const match = line.match(vocReg);
        if (match) {
          lesson.vocabularyList.push({
            word: match[1].trim(),
            ipa: match[2]?.trim(),
            pos: match[3]?.trim(),
            vietnamese: match[4]?.trim().replace(/\.$/, ""), // strip trailing period
            example: match[5]?.trim()
          });
        }
      }
    }

    // 4. Parse Transcript
    else if (currentSection === "TRANSCRIPT") {
      // Look for line starting with timestamp, e.g. [00:02.50]
      const tsMatch = line.match(/^\[(\d{2}:\d{2}(?:\.\d{2,3})?)\]\s*(.*)$/);
      if (tsMatch) {
        // Finalize previous sentence
        if (currentSentence) {
          lesson.transcript.push(currentSentence as TranscriptSentence);
        }

        const timestampStr = tsMatch[1];
        let text = tsMatch[2].trim();
        const startTime = parseTimestampToSeconds(timestampStr);

        // Check for aligned words at the end, e.g., {Attention:0, all:400}
        let words: WordAlignment[] = [];
        const wordsMatch = text.match(/^(.*?)\s*\{(.*?)\}\s*$/);
        if (wordsMatch) {
          text = wordsMatch[1].trim();
          const alignmentsStr = wordsMatch[2];
          alignmentsStr.split(",").forEach(part => {
            const pair = part.split(":");
            if (pair.length === 2) {
              words.push({
                word: pair[0].trim(),
                offset: parseInt(pair[1].trim(), 10)
              });
            }
          });
        }

        currentSentence = {
          sentenceId: `s_${lesson.transcript.length + 1}`,
          startTime,
          endTime: startTime + 4, // placeholder, will adjust below
          text,
          vietnamese: "",
          words: words.length > 0 ? words : undefined
        };
      } else if (line.startsWith("::")) {
        if (currentSentence) {
          const transMatch = line.match(/^::\s*(?:[a-zA-Z]{2,3})?\s*:\s*(.*)$/);
          if (transMatch) {
            currentSentence.vietnamese = transMatch[1].trim();
          } else {
            currentSentence.vietnamese = line.replace(/^::\s*/, "").trim();
          }
        }
      }
    }

    // 5. Parse Quiz
    else if (currentSection === "QUIZ") {
      // Question: Q1: What is ...
      const qMatch = line.match(/^Q\d+:\s*(.*)$/);
      if (qMatch) {
        // Finalize previous quiz
        if (currentQuiz) {
          lesson.quizzes.push(currentQuiz as ListeningQuiz);
        }
        currentQuiz = {
          id: `q_${lesson.quizzes.length + 1}`,
          question: qMatch[1].trim(),
          options: [],
          correctIndex: 0
        };
      } 
      // Options: * [ ] option or * [x] option
      else if (line.startsWith("*") && currentQuiz) {
        const optMatch = line.match(/^\*\s*\[\s*([\sxX])\s*\]\s*(.*)$/);
        if (optMatch) {
          const isCorrect = optMatch[1].trim().toLowerCase() === "x";
          const optionText = optMatch[2].trim();
          currentQuiz.options!.push(optionText);
          if (isCorrect) {
            currentQuiz.correctIndex = currentQuiz.options!.length - 1;
          }
        }
      }
      // Explanation: -- Explanation: text
      else if (line.startsWith("--") && currentQuiz) {
        const expMatch = line.match(/^--\s*(?:Explanation|Explain|Giải thích):\s*(.*)$/i);
        if (expMatch) {
          currentQuiz.explanation = expMatch[1].trim();
        }
      }
    }
  }

  // Push final items
  if (currentSentence) {
    lesson.transcript.push(currentSentence as TranscriptSentence);
  }
  if (currentQuiz) {
    lesson.quizzes.push(currentQuiz as ListeningQuiz);
  }

  // Post-process sentence end times
  for (let idx = 0; idx < lesson.transcript.length; idx++) {
    const currentSent = lesson.transcript[idx];
    if (idx < lesson.transcript.length - 1) {
      currentSent.endTime = lesson.transcript[idx + 1].startTime;
    } else {
      const wordCount = currentSent.text.split(/\s+/).length;
      currentSent.endTime = currentSent.startTime + Math.max(2.5, wordCount * 0.35 + 1.2);
    }
  }

  return lesson;
}

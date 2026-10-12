// Test tokenizeSentence in Node
const COMMON_STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "and", "but", "or", "nor", "so", "yet", "as", "if", "that", "this", "these",
  "those", "is", "are", "was", "were", "be", "been", "being", "have", "has",
  "had", "do", "does", "did", "can", "could", "will", "would", "shall", "should",
  "may", "might", "must", "it", "its", "he", "she", "they", "we", "you", "i",
  "me", "him", "her", "us", "them", "my", "your", "his", "their", "our"
]);

function tokenizeSentence(sentence, properNouns) {
  if (!sentence) return [];
  const rawWords = sentence.trim().split(/\s+/);
  const properNounSet = new Set();

  properNouns.forEach((p) => {
    const fullClean = p.toLowerCase().trim();
    if (fullClean) properNounSet.add(fullClean);

    fullClean.split(/\s+/).forEach((w) => {
      const cleanW = w.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
      if (cleanW && cleanW.length > 1 && !COMMON_STOP_WORDS.has(cleanW)) {
        properNounSet.add(cleanW);
      }
    });
  });

  const tokens = [];
  rawWords.forEach((rawWord) => {
    const leadingMatch = rawWord.match(/^([^a-zA-Z0-9\p{L}]*)/u);
    const trailingMatch = rawWord.match(/([^a-zA-Z0-9\p{L}]*)$/u);

    const leadingPunc = leadingMatch ? leadingMatch[1] : "";
    const trailingPunc = trailingMatch ? trailingMatch[1] : "";
    const clean = rawWord.slice(
      leadingPunc.length,
      rawWord.length - trailingPunc.length
    );

    if (clean.length === 0) {
      if (tokens.length > 0) {
        tokens[tokens.length - 1].trailingPunc += " " + rawWord;
        tokens[tokens.length - 1].original += " " + rawWord;
      }
      return;
    }

    const length = clean.length;
    const dots = "•".repeat(Math.max(1, length));
    const isProperNoun = properNounSet.has(clean.toLowerCase());

    tokens.push({
      clean,
      length,
      isProperNoun
    });
  });

  return tokens;
}

module.exports = { tokenizeSentence };

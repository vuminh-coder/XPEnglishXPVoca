const stripDiacritics = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const EQUIVALENCE_MAP = {
  "ni": ["你"],
  "hui": ["会", "huì"],
  "shuo": ["说"],
  "zhongwen": ["中文"],
  "ma": ["吗"],
  "yes": ["sí", "si"],
  "si": ["sí"],
  "oui": ["oui"],
};

function checkMatch(typedRaw, targetWord) {
  const typedNorm = stripDiacritics(typedRaw.toLowerCase().replace(/[^a-zA-Z0-9\p{L}']/gu, ''));
  const targetNorm = stripDiacritics(targetWord.toLowerCase().replace(/[^a-zA-Z0-9\p{L}']/gu, ''));

  if (typedNorm === targetNorm) return true;

  const targetPlain = targetWord.replace(/[^a-zA-Z0-9\p{L}']/gu, '');
  if (EQUIVALENCE_MAP[typedNorm] && EQUIVALENCE_MAP[typedNorm].includes(targetPlain)) return true;
  if (EQUIVALENCE_MAP[typedRaw.toLowerCase()] && EQUIVALENCE_MAP[typedRaw.toLowerCase()].includes(targetPlain)) return true;

  return false;
}

// Test cases
console.log('hablas -> Hablas:', checkMatch('hablas', 'Hablas'));
console.log('espanol -> español:', checkMatch('espanol', 'español'));
console.log('parlez -> Parlez:', checkMatch('parlez', 'Parlez'));
console.log('francais -> français:', checkMatch('francais', 'français'));
console.log('ni -> 你:', checkMatch('ni', '你'));
console.log('hui -> 会:', checkMatch('hui', '会'));
console.log('shuo -> 说:', checkMatch('shuo', '说'));
console.log('zhongwen -> 中文:', checkMatch('zhongwen', '中文'));
console.log('ma -> 吗:', checkMatch('ma', '吗'));
console.log('si -> sí:', checkMatch('si', 'sí'));
console.log('yes -> sí:', checkMatch('yes', 'sí'));
console.log('oui -> oui:', checkMatch('oui', 'oui'));

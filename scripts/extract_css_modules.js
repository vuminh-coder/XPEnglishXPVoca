const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, '..', 'app', 'globals.css');
const backupPath = path.join(__dirname, '..', 'app', 'globals.css.bak');
const rawContent = fs.readFileSync(globalsPath, 'utf8');

// 1. Create backup
fs.writeFileSync(backupPath, rawContent, 'utf8');
console.log('Backed up app/globals.css to app/globals.css.bak');

const lines = rawContent.split('\n');
console.log(`Total lines in globals.css: ${lines.length}`);

// Find key boundary lines by content markers
function findLineIndex(predicate, startFrom = 0) {
  for (let i = startFrom; i < lines.length; i++) {
    if (predicate(lines[i], i)) return i;
  }
  return -1;
}

// Marker indices (0-indexed line numbers)
const idxThemeEnd = findLineIndex(l => l.trim() === '}', findLineIndex(l => l.includes('@theme')));
const idxShimmerStart = findLineIndex(l => l.includes('@keyframes shimmer'), 0);
const idxTokensStart = findLineIndex(l => l.includes('1. DESIGN TOKENS'), 0);
const idxAgencyStart = findLineIndex(l => l.includes('1.5 AGENCY-LEVEL DESIGN UTILITIES'), idxTokensStart);
const idxBaseStart = findLineIndex(l => l.includes('2. CSS RESET & BASE STYLES'), idxAgencyStart);
const idxUtilsStart = findLineIndex(l => l.includes('3. CUSTOM UTILITY CLASSES'), idxBaseStart);
const idxAnimStart = findLineIndex(l => l.includes('4. ANIMATION KEYFRAMES'), idxUtilsStart);
const idxCompStart = findLineIndex(l => l.includes('5. COMPONENT STYLES'), idxAnimStart);
const idxNavbarStart = findLineIndex(l => l.includes('6. LAYOUT - NAVBAR'), idxCompStart);
const idxSidebarStart = findLineIndex(l => l.includes('7. LAYOUT - SIDEBAR'), idxNavbarStart);
const idxRightSidebarStart = findLineIndex(l => l.includes('8. LAYOUT - RIGHT SIDEBAR'), idxSidebarStart);
const idxMainContentStart = findLineIndex(l => l.includes('9. LAYOUT - MAIN CONTENT'), idxRightSidebarStart);
const idxLandingStart = findLineIndex(l => l.includes('10. LANDING PAGE'), idxMainContentStart);
const idxAuth1Start = findLineIndex(l => l.includes('11. AUTH PAGE'), idxLandingStart);
const idxDashboardStart = findLineIndex(l => l.includes('12. DASHBOARD PAGE'), idxAuth1Start);
const idxVocabStart = findLineIndex(l => l.includes('13. VOCABULARY EXPLORER PAGE'), idxDashboardStart);
const idxPracticeStart = findLineIndex(l => l.includes('14. PRACTICE PAGE'), idxVocabStart);
const idxCommunityStart = findLineIndex(l => l.includes('15. COMMUNITY PAGE'), idxPracticeStart);
const idxReviewStart = findLineIndex(l => l.includes('16. REVIEW PAGE'), idxCommunityStart);
const idxAiStart = findLineIndex(l => l.includes('17. AI CHAT PAGE'), idxReviewStart);
const idxProfileStart = findLineIndex(l => l.includes('18. PROFILE PAGE'), idxAiStart);
const idxAdminStart = findLineIndex(l => l.includes('19. ADMIN PAGE'), idxProfileStart);
const idxRespStart = findLineIndex(l => l.includes('20. RESPONSIVE DESIGN'), idxAdminStart);
const idxAuth2Start = findLineIndex(l => l.includes('AUTHORIZATION PAGES'), idxRespStart);
const idxPrintStart = findLineIndex(l => l.includes('21. PRINT STYLES'), idxAuth2Start);
const idxMyVocabStart = findLineIndex(l => l.includes('22. MY VOCABULARY PAGE'), idxPrintStart);
const idxXpPopupStart = findLineIndex(l => l.includes('23. XP POPUP / REWARD ANIMATION'), idxMyVocabStart);
const idxWadhahStart = findLineIndex(l => l.includes('WADHAH ALOUI 19 UI/UX & HIGH-END DESIGN UTILITIES'), idxXpPopupStart);
const idxAudioStart = findLineIndex(l => l.includes('AUDIO SPECTRUM VISUALIZER KEYFRAMES'), idxWadhahStart);
const idxScrollbarStart = findLineIndex(l => l.includes('HIDDEN SCROLLBAR UTILITY'), idxAudioStart);

console.log('Boundary markers found:');
console.log({
  idxThemeEnd,
  idxShimmerStart,
  idxTokensStart,
  idxAgencyStart,
  idxBaseStart,
  idxUtilsStart,
  idxAnimStart,
  idxCompStart,
  idxNavbarStart,
  idxSidebarStart,
  idxRightSidebarStart,
  idxMainContentStart,
  idxLandingStart,
  idxAuth1Start,
  idxDashboardStart,
  idxVocabStart,
  idxPracticeStart,
  idxCommunityStart,
  idxReviewStart,
  idxAiStart,
  idxProfileStart,
  idxAdminStart,
  idxRespStart,
  idxAuth2Start,
  idxPrintStart,
  idxMyVocabStart,
  idxXpPopupStart,
  idxWadhahStart,
  idxAudioStart,
  idxScrollbarStart
});

// Within COMPONENT STYLES (idxCompStart to idxNavbarStart):
const idxBtnStart = findLineIndex(l => l.includes('---- Buttons ----'), idxCompStart);
const idxInputStart = findLineIndex(l => l.includes('---- Input Fields ----'), idxBtnStart);
const idxCardStart = findLineIndex(l => l.includes('---- Cards ----'), idxInputStart);
const idxBadgeStart = findLineIndex(l => l.includes('---- Badges ----'), idxCardStart);
const idxAvatarStart = findLineIndex(l => l.includes('---- Avatar ----'), idxBadgeStart);
const idxProgressStart = findLineIndex(l => l.includes('---- Progress Bar ----'), idxAvatarStart);
const idxTabsStart = findLineIndex(l => l.includes('---- Tabs ----'), idxProgressStart);
const idxTagsStart = findLineIndex(l => l.includes('---- Tags / Chips ----'), idxTabsStart);
const idxModalStart = findLineIndex(l => l.includes('---- Modal ----'), idxTagsStart);

console.log('Component markers found:');
console.log({
  idxBtnStart,
  idxInputStart,
  idxCardStart,
  idxBadgeStart,
  idxAvatarStart,
  idxProgressStart,
  idxTabsStart,
  idxTagsStart,
  idxModalStart
});

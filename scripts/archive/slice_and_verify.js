const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

const rootDir = path.join(__dirname, '..');
const globalsBakPath = path.join(rootDir, 'app', 'globals.css.bak');
const globalsPath = path.join(rootDir, 'app', 'globals.css');

if (!fs.existsSync(globalsBakPath)) {
  fs.copyFileSync(globalsPath, globalsBakPath);
  console.log('Created backup: app/globals.css.bak');
}

const originalContent = fs.readFileSync(globalsBakPath, 'utf8');
const lines = originalContent.split('\n');

function findCommentStart(titleMatch, from = 0) {
  const titleIdx = lines.findIndex((l, idx) => idx >= from && l.includes(titleMatch));
  if (titleIdx === -1) return -1;
  for (let i = titleIdx; i >= Math.max(0, titleIdx - 3); i--) {
    if (lines[i].includes('/*')) return i;
  }
  return titleIdx;
}

// Locate markers with exact comment start
const idxTokens = findCommentStart('1. DESIGN TOKENS');
const idxAgency = findCommentStart('1.5 AGENCY-LEVEL DESIGN UTILITIES', idxTokens);
const idxBase = findCommentStart('2. CSS RESET & BASE STYLES', idxAgency);
const idxUtils = findCommentStart('3. CUSTOM UTILITY CLASSES', idxBase);
const idxAnim = findCommentStart('4. ANIMATION KEYFRAMES', idxUtils);
const idxComp = findCommentStart('5. COMPONENT STYLES', idxAnim);

const idxBtn = findCommentStart('---- Buttons ----', idxComp);
const idxInput = findCommentStart('---- Input Fields ----', idxBtn);
const idxCard = findCommentStart('---- Cards ----', idxInput);
const idxBadge = findCommentStart('---- Badges ----', idxCard);
const idxTabs = findCommentStart('---- Tabs ----', idxBadge);
const idxModal = findCommentStart('---- Modal ----', idxTabs);

const idxNavbar = findCommentStart('6. LAYOUT - NAVBAR', idxComp);
const idxSidebar = findCommentStart('7. LAYOUT - SIDEBAR', idxNavbar);
const idxRightSidebar = findCommentStart('8. LAYOUT - RIGHT SIDEBAR', idxSidebar);
const idxMainContent = findCommentStart('9. LAYOUT - MAIN CONTENT', idxRightSidebar);

const idxLanding = findCommentStart('10. LANDING PAGE', idxMainContent);
const idxAuth1 = findCommentStart('11. AUTH PAGE', idxLanding);
const idxDashboard = findCommentStart('12. DASHBOARD PAGE', idxAuth1);
const idxVocab = findCommentStart('13. VOCABULARY EXPLORER PAGE', idxDashboard);
const idxPractice = findCommentStart('14. PRACTICE PAGE', idxVocab);
const idxCommunity = findCommentStart('15. COMMUNITY PAGE', idxPractice);
const idxReview = findCommentStart('16. REVIEW PAGE', idxCommunity);
const idxAi = findCommentStart('17. AI CHAT PAGE', idxReview);
const idxProfile = findCommentStart('18. PROFILE PAGE', idxAi);
const idxAdmin = findCommentStart('19. ADMIN PAGE', idxProfile);
const idxEndCompLayer = lines.findIndex((l, idx) => idx >= idxAdmin && l.includes('end @layer components'));

const idxResp = findCommentStart('20. RESPONSIVE DESIGN', idxEndCompLayer);
const idxAuth2 = findCommentStart('AUTHORIZATION PAGES', idxResp);
const idxPrint = findCommentStart('21. PRINT STYLES', idxAuth2);
const idxMyVocab = findCommentStart('22. MY VOCABULARY PAGE', idxPrint);
const idxXpPopup = findCommentStart('23. XP POPUP / REWARD ANIMATION', idxMyVocab);
const idxWadhah = findCommentStart('WADHAH ALOUI 19 UI/UX & HIGH-END DESIGN UTILITIES', idxXpPopup);
const idxAudio = findCommentStart('AUDIO SPECTRUM VISUALIZER KEYFRAMES', idxWadhah);
const idxScrollbar = findCommentStart('HIDDEN SCROLLBAR UTILITY', idxAudio);

console.log('Marker indices resolved:');
console.log({
  idxTokens, idxAgency, idxBase, idxUtils, idxAnim, idxComp,
  idxBtn, idxInput, idxCard, idxBadge, idxTabs, idxModal,
  idxNavbar, idxSidebar, idxRightSidebar, idxMainContent,
  idxLanding, idxAuth1, idxDashboard, idxVocab, idxPractice,
  idxCommunity, idxReview, idxAi, idxProfile, idxAdmin, idxEndCompLayer,
  idxResp, idxAuth2, idxPrint, idxMyVocab, idxXpPopup, idxWadhah, idxAudio, idxScrollbar
});

function getSlice(start, end) {
  return lines.slice(start, end).join('\n').trim();
}

function wrapLayerComponents(cssText) {
  return `@layer components {\n${cssText}\n}\n`;
}

// Shimmer from top (lines 19 to 31 in original)
const shimmerCode = lines.slice(18, 31).join('\n').trim();

// Prepare slices
const fileDefinitions = [
  // 1. CORE
  {
    path: 'app/styles/core/tokens.css',
    content: getSlice(idxTokens, idxAgency)
  },
  {
    path: 'app/styles/core/agency-utilities.css',
    content: getSlice(idxAgency, idxBase)
  },
  {
    path: 'app/styles/core/base.css',
    content: getSlice(idxBase, idxUtils)
  },
  {
    path: 'app/styles/core/utilities.css',
    content: [
      getSlice(idxUtils, idxAnim),
      getSlice(idxWadhah, idxAudio),
      getSlice(idxScrollbar, lines.length)
    ].join('\n\n')
  },
  {
    path: 'app/styles/core/animations.css',
    content: [
      shimmerCode,
      getSlice(idxAnim, idxComp),
      getSlice(idxAudio, idxScrollbar)
    ].join('\n\n')
  },

  // 2. COMPONENTS (originally inside @layer components)
  {
    path: 'app/styles/components/buttons.css',
    content: wrapLayerComponents(getSlice(idxBtn, idxInput))
  },
  {
    path: 'app/styles/components/inputs.css',
    content: wrapLayerComponents(getSlice(idxInput, idxCard))
  },
  {
    path: 'app/styles/components/cards.css',
    content: wrapLayerComponents(getSlice(idxCard, idxBadge))
  },
  {
    path: 'app/styles/components/badges-avatars.css',
    content: wrapLayerComponents(getSlice(idxBadge, idxTabs))
  },
  {
    path: 'app/styles/components/tabs-tags.css',
    content: wrapLayerComponents(getSlice(idxTabs, idxModal))
  },
  {
    path: 'app/styles/components/feedback.css',
    content: wrapLayerComponents(getSlice(idxModal, idxNavbar))
  },
  {
    path: 'app/styles/components/rewards.css',
    content: wrapLayerComponents(getSlice(idxXpPopup, idxWadhah))
  },

  // 3. LAYOUT (originally inside @layer components)
  {
    path: 'app/styles/layout/navbar.css',
    content: wrapLayerComponents(getSlice(idxNavbar, idxSidebar))
  },
  {
    path: 'app/styles/layout/sidebar.css',
    content: wrapLayerComponents(getSlice(idxSidebar, idxRightSidebar))
  },
  {
    path: 'app/styles/layout/right-sidebar.css',
    content: wrapLayerComponents(getSlice(idxRightSidebar, idxMainContent))
  },
  {
    path: 'app/styles/layout/main-content.css',
    content: wrapLayerComponents(getSlice(idxMainContent, idxLanding))
  },

  // 4. CO-LOCATED PAGES (originally inside @layer components)
  {
    path: 'app/landing.css',
    content: wrapLayerComponents(getSlice(idxLanding, idxAuth1))
  },
  {
    path: 'app/(auth)/auth.css',
    content: [
      wrapLayerComponents(getSlice(idxAuth1, idxDashboard)),
      wrapLayerComponents(getSlice(idxAuth2, idxPrint))
    ].join('\n\n')
  },
  {
    path: 'app/(dashboard)/dashboard/dashboard.css',
    content: wrapLayerComponents(getSlice(idxDashboard, idxVocab))
  },
  {
    path: 'app/(dashboard)/vocabulary/vocabulary.css',
    content: [
      wrapLayerComponents(getSlice(idxVocab, idxPractice)),
      wrapLayerComponents(getSlice(idxMyVocab, idxXpPopup))
    ].join('\n\n')
  },
  {
    path: 'app/(dashboard)/study/practice/practice.css',
    content: wrapLayerComponents(getSlice(idxPractice, idxCommunity))
  },
  {
    path: 'app/(dashboard)/community/community.css',
    content: wrapLayerComponents(getSlice(idxCommunity, idxReview))
  },
  {
    path: 'app/(dashboard)/review/review.css',
    content: wrapLayerComponents(getSlice(idxReview, idxAi))
  },
  {
    path: 'app/(dashboard)/ai/ai-chat.css',
    content: wrapLayerComponents(getSlice(idxAi, idxProfile))
  },
  {
    path: 'app/(dashboard)/profile/profile.css',
    content: wrapLayerComponents(getSlice(idxProfile, idxAdmin))
  },
  {
    path: 'app/(dashboard)/admin/admin.css',
    content: wrapLayerComponents(getSlice(idxAdmin, idxEndCompLayer))
  },

  // 5. RESPONSIVE & PRINT
  {
    path: 'app/styles/responsive.css',
    content: [
      getSlice(idxResp, idxAuth2),
      getSlice(idxPrint, idxMyVocab)
    ].join('\n\n')
  }
];

// Write files
fileDefinitions.forEach(def => {
  const fullPath = path.join(rootDir, def.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, def.content + '\n', 'utf8');
  console.log(`Wrote: ${def.path} (${def.content.split('\n').length} lines)`);
});

// Master orchestrator globals.css content
const masterGlobalsCss = `@import url("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap");
@import "tailwindcss";

@variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  --font-sans: var(--font-be-vietnam-pro), "Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 10px;
  --radius-2xl: 14px;
  --radius-3xl: 18px;
}

/* ============================================================
   1. CORE FOUNDATIONS (Design Tokens, Base, Reset, Utilities)
   ============================================================ */
@import "./styles/core/tokens.css";
@import "./styles/core/agency-utilities.css";
@import "./styles/core/base.css";
@import "./styles/core/utilities.css";
@import "./styles/core/animations.css";

/* ============================================================
   2. SHARED UI COMPONENTS (Buttons, Cards, Badges, Tabs...)
   ============================================================ */
@import "./styles/components/buttons.css";
@import "./styles/components/inputs.css";
@import "./styles/components/cards.css";
@import "./styles/components/badges-avatars.css";
@import "./styles/components/tabs-tags.css";
@import "./styles/components/feedback.css";
@import "./styles/components/rewards.css";

/* ============================================================
   3. APP SHELL LAYOUT (Navbar, Sidebars, Main Content)
   ============================================================ */
@import "./styles/layout/navbar.css";
@import "./styles/layout/sidebar.css";
@import "./styles/layout/right-sidebar.css";
@import "./styles/layout/main-content.css";

/* ============================================================
   4. CO-LOCATED PAGE STYLES (Tách về folder từng trang)
   ============================================================ */
@import "./landing.css";
@import "./(auth)/auth.css";
@import "./(dashboard)/dashboard/dashboard.css";
@import "./(dashboard)/vocabulary/vocabulary.css";
@import "./(dashboard)/study/practice/practice.css";
@import "./(dashboard)/community/community.css";
@import "./(dashboard)/review/review.css";
@import "./(dashboard)/ai/ai-chat.css";
@import "./(dashboard)/profile/profile.css";
@import "./(dashboard)/admin/admin.css";

/* ============================================================
   5. RESPONSIVE DESIGN & PRINT OVERRIDES
   ============================================================ */
@import "./styles/responsive.css";
`;

fs.writeFileSync(globalsPath, masterGlobalsCss, 'utf8');
console.log('Successfully updated app/globals.css as Master Orchestrator!');

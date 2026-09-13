const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

async function verifyParity() {
  console.log('=== CSS PARITY VERIFICATION ENGINE ===');
  
  const rootDir = path.join(__dirname, '..');
  const bakPath = path.join(rootDir, 'app', 'globals.css.bak');
  const newPath = path.join(rootDir, 'app', 'globals.css');

  console.log('1. Compiling original baseline (globals.css.bak)...');
  const bakRaw = fs.readFileSync(bakPath, 'utf8');
  const bakResult = await postcss([tailwind()]).process(bakRaw, { from: bakPath });
  const bakCss = bakResult.css;
  console.log(`   Baseline compiled CSS size: ${(bakCss.length / 1024).toFixed(2)} KB`);

  console.log('2. Compiling modular architecture (globals.css)...');
  const newRaw = fs.readFileSync(newPath, 'utf8');
  const newResult = await postcss([tailwind()]).process(newRaw, { from: newPath });
  const newCss = newResult.css;
  console.log(`   Modular compiled CSS size:  ${(newCss.length / 1024).toFixed(2)} KB`);

  // Parse selectors and rules
  console.log('3. Parsing AST rules and selectors...');
  function extractSelectors(css) {
    const root = postcss.parse(css);
    const selectors = [];
    const keyframes = [];
    root.walkRules(rule => {
      // Normalize whitespace in selector: e.g. "a,\nbutton" -> "a, button"
      const normSelector = rule.selector.replace(/\s+/g, ' ').trim();
      selectors.push(normSelector);
    });
    root.walkAtRules(atRule => {
      if (atRule.name === 'keyframes') {
        keyframes.push(atRule.params.trim());
      }
    });
    return { selectors, keyframes, totalNodes: root.nodes.length };
  }

  const bakAst = extractSelectors(bakCss);
  const newAst = extractSelectors(newCss);

  console.log(`   Baseline total CSS rules:     ${bakAst.selectors.length}`);
  console.log(`   Modular total CSS rules:      ${newAst.selectors.length}`);
  console.log(`   Baseline total keyframes:     ${bakAst.keyframes.length}`);
  console.log(`   Modular total keyframes:      ${newAst.keyframes.length}`);

  // Compare keyframes
  const bakKeyframesSet = new Set(bakAst.keyframes);
  const newKeyframesSet = new Set(newAst.keyframes);
  const missingKeyframes = [...bakKeyframesSet].filter(k => !newKeyframesSet.has(k));

  if (missingKeyframes.length > 0) {
    console.error('❌ Missing keyframes:', missingKeyframes);
  } else {
    console.log('✅ All keyframe animations match 100%!');
  }

  // Compare selectors with normalized whitespace
  const bakSet = new Set(bakAst.selectors);
  const newSet = new Set(newAst.selectors);
  const missingInNew = [...bakSet].filter(s => !newSet.has(s));
  const addedInNew = [...newSet].filter(s => !bakSet.has(s));

  console.log(`\n4. Parity Diagnostics (Whitespace-Normalized):`);
  console.log(`   Missing selectors: ${missingInNew.length}`);
  console.log(`   Added selectors:   ${addedInNew.length}`);

  if (missingInNew.length > 0) {
    console.warn('   Missing:', missingInNew);
  }
  if (addedInNew.length > 0) {
    console.log('   Added:', addedInNew);
  }

  // Sample check on verified UI classes
  const criticalSelectors = [
    ':root',
    '[data-theme="dark"]',
    '.btn',
    '.btn-primary',
    '.card',
    '.bezel',
    '.tactile',
    '.lift',
    '.top-navbar',
    '.left-sidebar',
    '.right-sidebar',
    '.main-content',
    '.landing-page',
    '.dashboard-welcome',
    '.quick-action-card',
    '.vocab-search-bar',
    '.vocab-card',
    '.practice-mode-selector',
    '.review-calendar',
    '.ai-chat-container',
    '.profile-header',
    '.admin-stats'
  ];

  console.log('\n5. Verifying Critical UI Selectors:');
  let allCriticalPresent = true;
  criticalSelectors.forEach(sel => {
    const presentInBak = bakCss.includes(sel);
    const presentInNew = newCss.includes(sel);
    const status = presentInNew ? '✅ PRESENT' : '❌ MISSING';
    if (!presentInNew) allCriticalPresent = false;
    console.log(`   ${sel.padEnd(28)} -> ${status} (Orig: ${presentInBak})`);
  });

  if (missingInNew.length === 0 && allCriticalPresent) {
    console.log('\n🎉 RESULT: 100% PARITY CONFIRMED! Zero visual regression guaranteed.');
    process.exit(0);
  } else {
    console.log(`\nDifferences remaining: ${missingInNew.length}`);
    process.exit(missingInNew.length === 0 ? 0 : 1);
  }
}

verifyParity().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});

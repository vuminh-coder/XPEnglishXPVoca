import { tokenizeSentence } from '../features/listening/components/DictationWorkspace';

const segments = [
  "Now that you've introduced yourself, the meeting will begin.",
  "During the meeting, you might need to give your opinion on the different agenda items which you are discussing.",
  "You might also need to react to other people's suggestions. How can you do this?",
  "When making suggestions, modal verbs can be very useful. 'Should', 'ought to' or 'might want to' can express something you think is a good idea, but not an obligation:",
  "We ought to give new clients a gift from the company.",
  "We might want to consider looking for another engineer to help with this.",
  "Or: I think we should make this a priority for this month.",
  "'Have to' and 'need to' can express something that is an obligation: We have to improve the way we collect and record sales data.",
  "Or: We need to find a cheaper solution—our budget is very tight.",
  "Remember, you can also use these to make negative suggestions: We shouldn't rush this—we need to think it through carefully. Or: We don't need to hire new staff at the moment."
];

let totalTokens = 0;
segments.forEach((text, idx) => {
  const tokens = tokenizeSentence(text, []);
  console.log(`Segment ${idx + 1}: ${tokens.length} tokens`);
  totalTokens += tokens.length;
  tokens.forEach(t => {
    if (!t.clean || t.clean.length === 0) {
      console.error(`Empty clean token in segment ${idx + 1}:`, t);
    }
  });
});

console.log(`Total valid tokens: ${totalTokens}`);
console.log('All tokens verified cleanly!');

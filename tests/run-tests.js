const tests = [
  require("./terminal-card.test"),
  require("./github-html-fallback.test"),
  require("./state-roundtrip.test"),
];

let passed = 0;

for (const test of tests) {
  test.run();
  passed += 1;
}

console.log(`Passed ${passed} test files`);

const assert = require("assert");
const { normalizeState, serializeState } = require("../terminal-card");

function run() {
  const original = normalizeState({
    name: "doyoon",
    username: "doyoon530",
    provider: "prism",
    theme: "aurora",
    pattern: "rings",
    showContribs: "on",
    contribTheme: "orbit",
    showLangs: "on",
    langCount: 3,
    excludeLangs: ["Jupyter Notebook", "HTML"],
    bio: "hello world",
  });

  const params = serializeState(original);
  const rebuilt = normalizeState(Object.fromEntries(params.entries()));

  assert.equal(rebuilt.name, original.name);
  assert.equal(rebuilt.username, original.username);
  assert.equal(rebuilt.provider, original.provider);
  assert.equal(rebuilt.theme, original.theme);
  assert.equal(rebuilt.pattern, original.pattern);
  assert.equal(rebuilt.showContribs, original.showContribs);
  assert.equal(rebuilt.contribTheme, original.contribTheme);
  assert.equal(rebuilt.showLangs, original.showLangs);
  assert.equal(rebuilt.langCount, original.langCount);
  assert.deepEqual(rebuilt.excludeLangs, original.excludeLangs);
  assert.equal(rebuilt.bio, original.bio);
}

module.exports = { run };

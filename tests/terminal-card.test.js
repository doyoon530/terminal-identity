const assert = require("assert");
const { buildSvg, normalizeState } = require("../terminal-card");

function testProvider(provider, extra = {}) {
  const svg = buildSvg(normalizeState({
    name: "Test User",
    username: "testuser",
    role: "Engineer",
    tagline: "Shipping small things with care.",
    status: "checking layouts",
    command: "npm test",
    provider,
    theme: extra.theme || "sakura",
    avatar: "TU",
    showContribs: "off",
    showLangs: "off",
    ...extra,
  }));

  assert.ok(svg.includes("<svg"), `${provider}: svg root missing`);
  assert.ok(svg.includes("Test User"), `${provider}: name missing`);
}

function run() {
  testProvider("classic", { theme: "graphite" });
  testProvider("amber", { theme: "sakura" });
  testProvider("obsidian", { theme: "velvet" });
  testProvider("prism", { theme: "aurora" });
}

module.exports = { run };

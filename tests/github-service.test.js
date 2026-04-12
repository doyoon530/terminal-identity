const assert = require("assert");
const { normalizeGithubFields } = require("../lib/github/service");

function run() {
  assert.deepEqual(normalizeGithubFields(), ["avatar", "langs", "contribs"]);
  assert.deepEqual(normalizeGithubFields([]), []);
  assert.deepEqual(normalizeGithubFields(["langs", "avatar", "langs"]), ["avatar", "langs"]);
  assert.deepEqual(normalizeGithubFields("contribs, avatar, nope"), ["avatar", "contribs"]);
}

module.exports = { run };

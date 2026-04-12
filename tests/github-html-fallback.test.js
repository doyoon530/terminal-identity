const assert = require("assert");
const {
  parseGithubProfileOverview,
  parseGithubRepoLanguages,
} = require("../lib/github/html-fallback");

function run() {
  const profileHtml = `
    <meta property="og:image" content="https://avatars.githubusercontent.com/u/13041?v=4?s=400" />
    <span class="p-name vcard-fullname d-block overflow-hidden" itemprop="name">
      Guillermo Rauch
    </span>
    <a href="https://github.com/rauchg?tab=followers">
      <span class="text-bold color-fg-default">16.6k</span>
      followers
    </a>
    <a data-tab-item="repositories" href="/rauchg?tab=repositories">
      Repositories
      <span title="140" class="Counter">140</span>
    </a>
  `;
  const profile = parseGithubProfileOverview(profileHtml, "rauchg");
  assert.equal(profile.name, "Guillermo Rauch");
  assert.equal(profile.repos, 140);
  assert.equal(profile.followers, 16600);
  assert.ok(profile.avatarUrl.includes("avatars.githubusercontent.com"));

  const repoHtml = `
    <span itemprop="programmingLanguage">TypeScript</span>
    <span itemprop="programmingLanguage">JavaScript</span>
    <span itemprop="programmingLanguage">TypeScript</span>
  `;
  const langs = parseGithubRepoLanguages(repoHtml);
  assert.deepEqual(langs, [
    { name: "TypeScript", count: 2 },
    { name: "JavaScript", count: 1 },
  ]);
}

module.exports = { run };

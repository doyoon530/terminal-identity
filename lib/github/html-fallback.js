const {
  cleanHtmlText,
  decodeHtmlEntities,
  fetchImageDataUri,
  fetchText,
  normalizeUsername,
  parseCompactCount,
  withImageSize,
} = require("./shared");
const { fetchGithubContributions } = require("./contributions");
const DEFAULT_GITHUB_FIELDS = ["avatar", "langs", "contribs"];

function resolveOptionalFieldSet(fields) {
  return new Set(Array.isArray(fields) ? fields : DEFAULT_GITHUB_FIELDS);
}

function parseGithubProfileOverview(html, username) {
  if (!html) return null;

  const name = cleanHtmlText(
    html.match(/<span class="p-name[^"]*" itemprop="name">\s*([\s\S]*?)\s*<\/span>/i)?.[1]
  ) || username;
  const avatarUrl = decodeHtmlEntities(
    html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1]
      || html.match(/<img[^>]+class="[^"]*avatar-user[^"]*"[^>]+src="([^"]+)"/i)?.[1]
      || ""
  );
  const repos = parseCompactCount(
    html.match(/data-tab-item="repositories"[\s\S]{0,1200}?<span[^>]*class="Counter"[^>]*>\s*([^<]+)\s*<\/span>/i)?.[1]
      || html.match(/has ([\d.,kmb]+) repositories available/i)?.[1]
  );
  const followers = parseCompactCount(
    html.match(/\?tab=followers[\s\S]{0,1200}?<span class="text-bold color-fg-default">\s*([^<]+)\s*<\/span>/i)?.[1]
  );

  return {
    username,
    name,
    avatarUrl,
    repos,
    followers,
  };
}

function parseGithubRepoLanguages(html) {
  if (!html) return null;

  const counts = {};
  const languageRe = /itemprop="programmingLanguage">\s*([^<]+)\s*<\/span>/gi;
  let match;

  while ((match = languageRe.exec(html)) !== null) {
    const name = cleanHtmlText(match[1]);
    if (!name) {
      continue;
    }

    counts[name] = (counts[name] || 0) + 1;
  }

  const entries = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([name, count]) => ({ name, count }));

  return entries.length > 0 ? entries : null;
}

async function fetchGithubHtmlFallback(username, options = {}) {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    return null;
  }
  const requestedFields = resolveOptionalFieldSet(options.fields);
  const needsAvatar = requestedFields.has("avatar");
  const needsLangs = requestedFields.has("langs");
  const needsContribs = requestedFields.has("contribs");

  const [profileHtml, repoHtml, contributions] = await Promise.all([
    fetchText(`https://github.com/${normalized}`),
    needsLangs ? fetchText(`https://github.com/${normalized}?tab=repositories`) : Promise.resolve(""),
    needsContribs ? fetchGithubContributions(normalized) : Promise.resolve(null),
  ]);

  const profile = parseGithubProfileOverview(profileHtml, normalized);
  const topLangs = parseGithubRepoLanguages(repoHtml);

  if (!profile && !topLangs && !contributions) {
    return null;
  }

  const avatarUrl = profile?.avatarUrl || "";
  const avatarDataUri = needsAvatar && avatarUrl
    ? await fetchImageDataUri(withImageSize(avatarUrl, 120))
    : null;

  return {
    username: normalized,
    name: profile?.name || normalized,
    avatarUrl,
    avatarDataUri,
    repos: Number(profile?.repos || 0),
    followers: Number(profile?.followers || 0),
    stars: 0,
    forks: 0,
    topLangs,
    contributions,
  };
}

module.exports = {
  fetchGithubHtmlFallback,
  parseGithubProfileOverview,
  parseGithubRepoLanguages,
};

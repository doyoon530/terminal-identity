const {
  fetchImageDataUri,
  fetchJson,
  normalizeUsername,
  withImageSize,
} = require("./shared");
const { fetchGithubContributions } = require("./contributions");

const MAX_REPO_PAGES = 20;
const REPOS_PER_PAGE = 100;
const LANGUAGE_FETCH_CONCURRENCY = 6;

async function fetchGithubRepos(username, publicRepoCount) {
  const normalized = normalizeUsername(username);
  if (!normalized) return [];

  const pagesToFetch = Math.max(
    1,
    Math.min(MAX_REPO_PAGES, Math.ceil(Math.max(0, Number(publicRepoCount) || 0) / REPOS_PER_PAGE))
  );
  const repos = [];

  for (let page = 1; page <= pagesToFetch; page += 1) {
    const pageItems = await fetchJson(
      `https://api.github.com/users/${normalized}/repos?per_page=${REPOS_PER_PAGE}&page=${page}&sort=updated&type=owner`
    );

    if (!Array.isArray(pageItems) || pageItems.length === 0) {
      break;
    }

    repos.push(...pageItems);

    if (pageItems.length < REPOS_PER_PAGE) {
      break;
    }
  }

  return repos;
}

async function fetchGithubLanguageBytes(repoList) {
  const repos = Array.isArray(repoList) ? repoList.filter((repo) => repo?.languages_url) : [];
  if (repos.length === 0) {
    return null;
  }

  const languageBytes = {};
  let successCount = 0;
  let cursor = 0;

  const workers = Array.from(
    { length: Math.min(LANGUAGE_FETCH_CONCURRENCY, repos.length) },
    async () => {
      while (cursor < repos.length) {
        const repo = repos[cursor];
        cursor += 1;

        const languages = await fetchJson(repo.languages_url);
        if (!languages || typeof languages !== "object" || Array.isArray(languages)) {
          continue;
        }

        successCount += 1;

        Object.entries(languages).forEach(([name, bytes]) => {
          const normalizedBytes = Number(bytes || 0);
          if (!name || !Number.isFinite(normalizedBytes) || normalizedBytes <= 0) {
            return;
          }

          languageBytes[name] = (languageBytes[name] || 0) + normalizedBytes;
        });
      }
    }
  );

  await Promise.all(workers);

  if (successCount === 0 || Object.keys(languageBytes).length === 0) {
    return null;
  }

  return languageBytes;
}

async function fetchGithubRestStats(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    return null;
  }

  const user = await fetchJson(`https://api.github.com/users/${normalized}`);
  if (!user) {
    return null;
  }

  const repoList = await fetchGithubRepos(normalized, user.public_repos);
  const ownedSourceRepos = repoList.filter((repo) => repo && !repo.fork);
  const stars = ownedSourceRepos.reduce((total, repo) => total + Number(repo.stargazers_count || 0), 0);
  const forks = ownedSourceRepos.reduce((total, repo) => total + Number(repo.forks_count || 0), 0);

  const primaryLanguageCounts = {};
  ownedSourceRepos.forEach((repo) => {
    if (repo.language) {
      primaryLanguageCounts[repo.language] = (primaryLanguageCounts[repo.language] || 0) + 1;
    }
  });

  const languageBytes = await fetchGithubLanguageBytes(ownedSourceRepos);
  const topLangsSource = languageBytes || primaryLanguageCounts;
  const topLangs = Object.entries(topLangsSource)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([name, count]) => ({ name, count }));

  const contributions = await fetchGithubContributions(normalized);
  const avatarDataUri = await fetchImageDataUri(withImageSize(String(user.avatar_url || ""), 120));

  return {
    username: normalized,
    name: String(user.name || normalized),
    avatarUrl: String(user.avatar_url || ""),
    avatarDataUri,
    repos: Number(user.public_repos || repoList.length || 0),
    followers: Number(user.followers || 0),
    stars,
    forks,
    topLangs: topLangs.length > 0 ? topLangs : null,
    contributions,
  };
}

module.exports = {
  fetchGithubLanguageBytes,
  fetchGithubRepos,
  fetchGithubRestStats,
};

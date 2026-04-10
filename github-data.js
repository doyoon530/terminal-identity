function normalizeUsername(value) {
  return String(value || "")
    .replace(/^@+/, "")
    .trim()
    .slice(0, 39);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "terminal-identity",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function fetchGithubStats(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    return null;
  }

  try {
    const user = await fetchJson(`https://api.github.com/users/${normalized}`);
    if (!user) {
      return null;
    }

    const repos = await fetchJson(
      `https://api.github.com/users/${normalized}/repos?per_page=100&sort=updated`
    );

    const repoList = Array.isArray(repos) ? repos : [];
    const stars = repoList.reduce((total, repo) => total + Number(repo.stargazers_count || 0), 0);
    const forks = repoList.reduce((total, repo) => total + Number(repo.forks_count || 0), 0);

    return {
      username: normalized,
      repos: Number(user.public_repos || repoList.length || 0),
      followers: Number(user.followers || 0),
      stars,
      forks,
    };
  } catch (_error) {
    return null;
  }
}

module.exports = {
  fetchGithubStats,
};

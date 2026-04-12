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

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "terminal-identity",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.text();
}

const MAX_REPO_PAGES = 20;
const REPOS_PER_PAGE = 100;
const LANGUAGE_FETCH_CONCURRENCY = 6;

function parseContributionCalendar(html) {
  if (!html) return null;

  const totalMatch = html.match(/>\s*([\d,]+)\s+contributions?\s+(?:in the last year|in \d{4})\s*</i);
  const total = totalMatch ? Number(String(totalMatch[1]).replaceAll(",", "")) : 0;
  const tooltipCounts = new Map();
  const tooltipRe = /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  const days = [];
  let match;

  while ((match = tooltipRe.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const countMatch = text.match(/([\d,]+)\s+contributions?/i);
    tooltipCounts.set(match[1], countMatch ? Number(countMatch[1].replaceAll(",", "")) : 0);
  }

  const dayRe = /<td\b(?=[^>]*ContributionCalendar-day)[^>]*>/g;

  while ((match = dayRe.exec(html)) !== null) {
    const cell = match[0];
    const dateMatch = cell.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/);
    const levelMatch = cell.match(/\bdata-level="([0-4])"/);
    const idMatch = cell.match(/\bid="([^"]+)"/);

    if (!dateMatch || !levelMatch) continue;

    days.push({
      date: dateMatch[1],
      level: Number(levelMatch[1] || 0),
      count: idMatch && tooltipCounts.has(idMatch[1]) ? tooltipCounts.get(idMatch[1]) : undefined,
    });
  }

  if (days.length === 0) {
    const fallbackDayRe = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g;

    while ((match = fallbackDayRe.exec(html)) !== null) {
      days.push({
        date: match[1],
        level: Number(match[2] || 0),
      });
    }
  }

  if (days.length === 0) {
    return null;
  }

  const sorted = days.sort((a, b) => a.date.localeCompare(b.date));
  const weekMap = new Map();

  sorted.forEach((day) => {
    const date = new Date(`${day.date}T00:00:00Z`);
    const weekStart = new Date(date);
    weekStart.setUTCDate(date.getUTCDate() - date.getUTCDay());
    const key = weekStart.toISOString().slice(0, 10);

    if (!weekMap.has(key)) {
      weekMap.set(key, Array.from({ length: 7 }, () => null));
    }

    const normalizedDay = {
      date: day.date,
      level: Math.max(0, Math.min(4, day.level)),
    };

    if (typeof day.count === "number") {
      normalizedDay.count = Math.max(0, Math.floor(day.count));
    }

    weekMap.get(key)[date.getUTCDay()] = normalizedDay;
  });

  const weekKeys = [...weekMap.keys()].sort();
  const allWeeks = weekKeys.map((key) => ({
    start: key,
    days: weekMap.get(key),
  }));

    return {
      total,
      activeDays: sorted.filter((day) =>
        typeof day.count === "number" ? day.count > 0 : day.level > 0
      ).length,
      weeks: allWeeks,
    };
  }

async function fetchGithubContributions(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return null;

  try {
    const html = await fetchText(`https://github.com/users/${normalized}/contributions`);
    return parseContributionCalendar(html);
  } catch (_error) {
    return null;
  }
}

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

    return {
      username: normalized,
      name: String(user.name || normalized),
      avatarUrl: String(user.avatar_url || ""),
      repos: Number(user.public_repos || repoList.length || 0),
      followers: Number(user.followers || 0),
      stars,
      forks,
      topLangs: topLangs.length > 0 ? topLangs : null,
      contributions,
    };
  } catch (_error) {
    return null;
  }
}

module.exports = {
  fetchGithubStats,
};

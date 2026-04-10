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

function parseContributionCalendar(html) {
  if (!html) return null;

  const totalMatch = html.match(/>\s*([\d,]+)\s+contributions?\s+(?:in the last year|in \d{4})\s*</i);
  const total = totalMatch ? Number(String(totalMatch[1]).replaceAll(",", "")) : 0;
  const days = [];
  const dayRe = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g;
  let match;

  while ((match = dayRe.exec(html)) !== null) {
    days.push({
      date: match[1],
      level: Number(match[2] || 0),
    });
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

    weekMap.get(key)[date.getUTCDay()] = {
      date: day.date,
      level: Math.max(0, Math.min(4, day.level)),
    };
  });

  const weekKeys = [...weekMap.keys()].sort();
  const allWeeks = weekKeys.map((key) => ({
    start: key,
    days: weekMap.get(key),
  }));

    return {
      total,
      activeDays: sorted.filter((day) => day.level > 0).length,
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

    const langCounts = {};
    repoList.forEach((repo) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });
    const topLangs = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 12)
      .map(([name, count]) => ({ name, count }));

    const contributions = await fetchGithubContributions(normalized);

    return {
      username: normalized,
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

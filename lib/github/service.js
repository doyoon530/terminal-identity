const { createTimedAsyncCache } = require("./cache");
const { fetchGithubHtmlFallback } = require("./html-fallback");
const { fetchGithubRestStats } = require("./rest");
const { normalizeUsername } = require("./shared");

const GITHUB_CACHE_TTL_MS = 15 * 60 * 1000;
const githubStatsCache = createTimedAsyncCache(GITHUB_CACHE_TTL_MS);

async function fetchGithubStats(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    return null;
  }

  const freshValue = githubStatsCache.getFreshValue(normalized);
  if (freshValue) {
    return freshValue;
  }

  const pending = githubStatsCache.getPromise(normalized);
  if (pending) {
    return githubStatsCache.getValue(normalized) || pending;
  }

  const request = (async () => {
    try {
      return await fetchGithubRestStats(normalized);
    } catch (_error) {
      return null;
    }
  })();

  githubStatsCache.setPending(normalized, request);

  const staleValue = githubStatsCache.getValue(normalized);
  if (staleValue) {
    void request.then((result) => {
      if (result) {
        githubStatsCache.setValue(normalized, result);
        return;
      }

      githubStatsCache.setValue(normalized, staleValue);
    });

    return staleValue;
  }

  const result = await request;
  if (result) {
    githubStatsCache.setValue(normalized, result);
    return result;
  }

  const fallback = await fetchGithubHtmlFallback(normalized);
  if (fallback) {
    githubStatsCache.setValue(normalized, fallback);
    return fallback;
  }

  githubStatsCache.clear(normalized);
  return null;
}

module.exports = {
  fetchGithubStats,
};

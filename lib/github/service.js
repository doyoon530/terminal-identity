const { createTimedAsyncCache } = require("./cache");
const { fetchGithubHtmlFallback } = require("./html-fallback");
const { fetchGithubRestStats } = require("./rest");
const { normalizeUsername } = require("./shared");

const GITHUB_CACHE_TTL_MS = 15 * 60 * 1000;
const githubStatsCache = createTimedAsyncCache(GITHUB_CACHE_TTL_MS);
const OPTIONAL_GITHUB_FIELDS = ["avatar", "langs", "contribs"];

function normalizeGithubFields(fields) {
  if (fields == null) {
    return [...OPTIONAL_GITHUB_FIELDS];
  }

  const source = Array.isArray(fields) ? fields : String(fields).split(",");
  const unique = new Set();

  source.forEach((field) => {
    const normalized = String(field || "").trim().toLowerCase();
    if (OPTIONAL_GITHUB_FIELDS.includes(normalized)) {
      unique.add(normalized);
    }
  });

  return [...unique].sort();
}

async function fetchGithubStats(username, options = {}) {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    return null;
  }
  const fields = normalizeGithubFields(options.fields);
  const cacheKey = `${normalized}|${fields.join(",") || "summary"}`;

  const freshValue = githubStatsCache.getFreshValue(cacheKey);
  if (freshValue) {
    return freshValue;
  }

  const pending = githubStatsCache.getPromise(cacheKey);
  if (pending) {
    return githubStatsCache.getValue(cacheKey) || pending;
  }

  const request = (async () => {
    try {
      return await fetchGithubRestStats(normalized, { fields });
    } catch (_error) {
      return null;
    }
  })();

  githubStatsCache.setPending(cacheKey, request);

  const staleValue = githubStatsCache.getValue(cacheKey);
  if (staleValue) {
    void request.then((result) => {
      if (result) {
        githubStatsCache.setValue(cacheKey, result);
        return;
      }

      githubStatsCache.setValue(cacheKey, staleValue);
    });

    return staleValue;
  }

  const result = await request;
  if (result) {
    githubStatsCache.setValue(cacheKey, result);
    return result;
  }

  const fallback = await fetchGithubHtmlFallback(normalized, { fields });
  if (fallback) {
    githubStatsCache.setValue(cacheKey, fallback);
    return fallback;
  }

  githubStatsCache.clear(cacheKey);
  return null;
}

module.exports = {
  fetchGithubStats,
  normalizeGithubFields,
};

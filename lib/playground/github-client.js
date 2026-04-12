(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityPlaygroundGithubClient = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  function createGithubStatsClient(options = {}) {
    const {
      cacheTtlMs = 15 * 60 * 1000,
      fetchTimeoutMs = 5000,
      normalizeUsername = (value) => String(value || "").replace(/^@+/, "").trim(),
    } = options;
    const cache = new Map();

    function getEntry(username) {
      const normalized = normalizeUsername(username);
      if (!normalized) {
        return null;
      }

      if (!cache.has(normalized)) {
        cache.set(normalized, {
          data: null,
          updatedAt: 0,
          promise: null,
        });
      }

      return {
        normalized,
        entry: cache.get(normalized),
      };
    }

    function getCachedGithubStats(username) {
      return getEntry(username)?.entry?.data || null;
    }

    function requestGithubStats(normalized, entry) {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), fetchTimeoutMs);

      entry.promise = fetch(`/api/github?username=${encodeURIComponent(normalized)}`, {
        signal: controller.signal,
      })
        .then((response) => (response.ok ? response.json() : null))
        .catch(() => null)
        .then((result) => {
          if (result) {
            entry.data = result;
            entry.updatedAt = Date.now();
            return result;
          }

          return entry.data || null;
        })
        .finally(() => {
          window.clearTimeout(timeoutId);
          entry.promise = null;
          if (!entry.data) {
            cache.delete(normalized);
          }
        });

      return entry.promise;
    }

    function fetchGithubStats(username, fetchOptions = {}) {
      const resolved = getEntry(username);
      if (!resolved || !window.location.origin.startsWith("http")) {
        return Promise.resolve(null);
      }

      const { normalized, entry } = resolved;
      const forceRefresh = fetchOptions.forceRefresh === true;
      const waitForFresh = fetchOptions.waitForFresh === true;
      const isFresh = !!entry.data && Date.now() - entry.updatedAt < cacheTtlMs;

      if (!forceRefresh && isFresh) {
        return Promise.resolve(entry.data);
      }

      if (!entry.promise) {
        requestGithubStats(normalized, entry);
      }

      if (!forceRefresh && entry.data && !waitForFresh) {
        return Promise.resolve(entry.data);
      }

      return entry.promise;
    }

    return {
      fetchGithubStats,
      getCachedGithubStats,
    };
  }

  return {
    createGithubStatsClient,
  };
});

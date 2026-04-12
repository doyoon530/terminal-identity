(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentityPlaygroundGithubClient = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const OPTIONAL_GITHUB_FIELDS = ["avatar", "langs", "contribs"];

  function createGithubStatsClient(options = {}) {
    const {
      cacheTtlMs = 15 * 60 * 1000,
      fetchTimeoutMs = 5000,
      normalizeUsername = (value) => String(value || "").replace(/^@+/, "").trim(),
    } = options;
    const cache = new Map();

    function normalizeRequestedFields(fields) {
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

    function getEntry(username, fields) {
      const normalized = normalizeUsername(username);
      if (!normalized) {
        return null;
      }
      const normalizedFields = normalizeRequestedFields(fields);
      const fieldKey = normalizedFields.join(",") || "summary";
      const cacheKey = `${normalized}|${fieldKey}`;

      if (!cache.has(cacheKey)) {
        cache.set(cacheKey, {
          data: null,
          updatedAt: 0,
          promise: null,
        });
      }

      return {
        normalized,
        fields: normalizedFields,
        cacheKey,
        entry: cache.get(cacheKey),
      };
    }

    function getCachedGithubStats(username, fields) {
      return getEntry(username, fields)?.entry?.data || null;
    }

    function requestGithubStats(normalized, fields, cacheKey, entry) {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), fetchTimeoutMs);
      const params = new URLSearchParams({ username: normalized });
      params.set("fields", fields.join(","));

      entry.promise = fetch(`/api/github?${params.toString()}`, {
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
            cache.delete(cacheKey);
          }
        });

      return entry.promise;
    }

    function fetchGithubStats(username, fetchOptions = {}) {
      const resolved = getEntry(username, fetchOptions.fields);
      if (!resolved || !window.location.origin.startsWith("http")) {
        return Promise.resolve(null);
      }

      const { normalized, fields, cacheKey, entry } = resolved;
      const forceRefresh = fetchOptions.forceRefresh === true;
      const waitForFresh = fetchOptions.waitForFresh === true;
      const isFresh = !!entry.data && Date.now() - entry.updatedAt < cacheTtlMs;

      if (!forceRefresh && isFresh) {
        return Promise.resolve(entry.data);
      }

      if (!entry.promise) {
        requestGithubStats(normalized, fields, cacheKey, entry);
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

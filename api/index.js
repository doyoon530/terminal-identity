const { buildSvg, normalizeState, LANG_ICON_MAP } = require("../terminal-card");
const { fetchGithubStats } = require("../github-data");
const { createTimedAsyncCache } = require("../lib/github/cache");
const fs = require("fs");
const path = require("path");
const LANG_ICON_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const langIconsCache = createTimedAsyncCache(LANG_ICON_CACHE_TTL_MS);

const capybaraSpriteUri = (() => {
  try {
    const sprite = fs.readFileSync(path.join(__dirname, "../assets/capybara-onsen-contrib-sprite.png"));
    return `data:image/png;base64,${sprite.toString("base64")}`;
  } catch (_) {
    return null;
  }
})();

function buildFallbackSvg(width, height) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="26" fill="#161218"/>
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" font-family="'IBM Plex Mono', 'Nanum Gothic Coding', D2Coding, Consolas, 'Apple SD Gothic Neo', 'Malgun Gothic', 'Courier New', monospace" font-size="14" font-weight="500" fill="#aaa">terminal identity — reload to retry</text>
</svg>`.trim();
}

async function fetchLangIconsDataUri(iconKeys) {
  const cacheKey = iconKeys.join(",");
  const freshValue = langIconsCache.getFreshValue(cacheKey);
  if (freshValue) {
    return freshValue;
  }

  const pending = langIconsCache.getPromise(cacheKey);
  if (pending) {
    return langIconsCache.getValue(cacheKey) || pending;
  }

  const request = (async () => {
    try {
      const url = `https://skillicons.dev/icons?i=${cacheKey}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const svg = await res.text();
      const b64 = Buffer.from(svg).toString("base64");
      return `data:image/svg+xml;base64,${b64}`;
    } catch (_) {
      return null;
    }
  })();

  langIconsCache.setPending(cacheKey, request);
  const staleValue = langIconsCache.getValue(cacheKey);
  if (staleValue) {
    void request.then((result) => {
      if (result) {
        langIconsCache.setValue(cacheKey, result);
        return;
      }
      langIconsCache.setValue(cacheKey, staleValue);
    });
    return staleValue;
  }

  const result = await request;
  if (result) {
    langIconsCache.setValue(cacheKey, result);
    return result;
  }

  langIconsCache.clear(cacheKey);
  return null;
}

module.exports = async function handler(req, res) {
  const query = req.query || {};
  const width = Math.min(Math.max(Number(query.width) || 980, 720), 1400);
  const height = Math.min(Math.max(Number(query.height) || 520, 420), 1400);

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=1800, stale-while-revalidate=1800");
  res.setHeader("Content-Disposition", 'inline; filename="terminal-identity-card.svg"');

  try {
    const state = normalizeState({
      ...query,
      height: query.height ?? "auto",
      capybaraSpriteUri,
    });
    let nextState = state;

    if (state.username) {
      const fields = [];
      if (!state.hideProfile) {
        fields.push("avatar");
      }
      if (state.showLangs !== "off") {
        fields.push("langs");
      }
      if (state.showContribs !== "off") {
        fields.push("contribs");
      }

      const githubStats = await fetchGithubStats(state.username, { fields });
      if (githubStats) {
        nextState = { ...state, githubStats };
        if (!state.hideProfile && (githubStats.avatarDataUri || githubStats.avatarUrl)) {
          nextState = {
            ...nextState,
            profileUri: githubStats.avatarDataUri || `${githubStats.avatarUrl}&s=120`,
          };
        }
      }
    }

    // Fetch lang icons if requested
    if (state.langStyle === "icons" && nextState.githubStats?.topLangs) {
      const supportedLangs = nextState.githubStats.topLangs
        .filter((l) => !state.excludeLangs.includes(l.name.toLowerCase()))
        .filter((l) => Boolean(LANG_ICON_MAP[l.name]))
        .slice(0, state.langCount);
      const iconKeys = supportedLangs.map((l) => LANG_ICON_MAP[l.name]);
      if (iconKeys.length > 0) {
        const uri = await fetchLangIconsDataUri(iconKeys);
        if (uri) nextState = { ...nextState, langIconsUri: uri, langIconCount: iconKeys.length };
      }
    }

    res.status(200).send(buildSvg(nextState));
  } catch (_err) {
    res.status(200).send(buildFallbackSvg(width, height));
  }
};

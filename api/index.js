const { buildSvg, normalizeState, LANG_ICON_MAP } = require("../terminal-card");
const { fetchGithubStats } = require("../github-data");

function buildFallbackSvg(width, height) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="26" fill="#161218"/>
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="14" fill="#888">terminal identity — reload to retry</text>
</svg>`.trim();
}

async function fetchLangIconsDataUri(iconKeys) {
  try {
    const url = `https://skillicons.dev/icons?i=${iconKeys.join(",")}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const svg = await res.text();
    const b64 = Buffer.from(svg).toString("base64");
    return `data:image/svg+xml;base64,${b64}`;
  } catch (_) {
    return null;
  }
}

async function fetchProfileImageUri(avatarUrl) {
  if (!avatarUrl) return null;
  try {
    const res = await fetch(`${avatarUrl}&s=120`);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const b64 = Buffer.from(buf).toString("base64");
    const ct = res.headers.get("content-type") || "image/png";
    return `data:${ct};base64,${b64}`;
  } catch (_) {
    return null;
  }
}

module.exports = async function handler(req, res) {
  const query = req.query || {};
  const width = Math.min(Math.max(Number(query.width) || 980, 720), 1400);
  const height = Math.min(Math.max(Number(query.height) || 520, 420), 820);

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=1800, stale-while-revalidate=1800");
  res.setHeader("Content-Disposition", 'inline; filename="terminal-identity-card.svg"');

  try {
    const state = normalizeState(query);
    let nextState = state;

    if (state.username) {
      const githubStats = await fetchGithubStats(state.username);
      if (githubStats) {
        nextState = { ...state, githubStats };
        if (!state.hideProfile && githubStats.avatarUrl) {
          const profileUri = await fetchProfileImageUri(githubStats.avatarUrl);
          if (profileUri) nextState = { ...nextState, profileUri };
        }
      }
    }

    // Fetch lang icons if requested
    if (state.langStyle === "icons" && nextState.githubStats?.topLangs) {
      const effectiveLangs = nextState.githubStats.topLangs
        .filter((l) => !state.excludeLangs.includes(l.name.toLowerCase()))
        .slice(0, state.langCount);
      const iconKeys = effectiveLangs.map((l) => LANG_ICON_MAP[l.name]).filter(Boolean);
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

const { buildSvg, normalizeState } = require("../terminal-card");
const { fetchGithubStats } = require("../github-data");

function buildFallbackSvg(width, height) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="26" fill="#161218"/>
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="14" fill="#888">terminal identity — reload to retry</text>
</svg>`.trim();
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
      }
    }

    res.status(200).send(buildSvg(nextState));
  } catch (_err) {
    res.status(200).send(buildFallbackSvg(width, height));
  }
};

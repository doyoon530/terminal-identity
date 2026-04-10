const { buildSvg, normalizeState } = require("../terminal-card");
const { fetchGithubStats } = require("../github-data");

module.exports = async function handler(req, res) {
  const state = normalizeState(req.query || {});
  let nextState = state;

  if (state.username) {
    const githubStats = await fetchGithubStats(state.username);
    if (githubStats) {
      nextState = { ...state, githubStats };
    }
  }

  const svg = buildSvg(nextState);

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400");
  res.setHeader("Content-Disposition", 'inline; filename="terminal-identity-card.svg"');
  res.status(200).send(svg);
};

const { buildSvg, normalizeState } = require("../terminal-card");

module.exports = function handler(req, res) {
  const state = normalizeState(req.query || {});
  const svg = buildSvg(state);

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400");
  res.setHeader("Content-Disposition", 'inline; filename="terminal-identity-card.svg"');
  res.status(200).send(svg);
};

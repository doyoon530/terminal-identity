const { fetchGithubStats } = require("../github-data");

module.exports = async function handler(req, res) {
  const username = String(req.query?.username || "")
    .replace(/^@+/, "")
    .trim();
  const hasFieldsParam = Object.prototype.hasOwnProperty.call(req.query || {}, "fields");
  const fields = hasFieldsParam
    ? String(req.query?.fields || "")
        .split(",")
        .map((field) => String(field || "").trim().toLowerCase())
        .filter(Boolean)
    : undefined;

  if (!username) {
    res.status(400).json({ error: "Missing username" });
    return;
  }

  const githubStats = await fetchGithubStats(username, { fields });

  if (!githubStats) {
    res.status(404).json({ error: "Unable to load GitHub stats" });
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  res.status(200).json(githubStats);
};

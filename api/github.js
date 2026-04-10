const { fetchGithubStats } = require("../github-data");

module.exports = async function handler(req, res) {
  const username = String(req.query?.username || "")
    .replace(/^@+/, "")
    .trim();

  if (!username) {
    res.status(400).json({ error: "Missing username" });
    return;
  }

  const githubStats = await fetchGithubStats(username);

  if (!githubStats) {
    res.status(404).json({ error: "Unable to load GitHub stats" });
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  res.status(200).json(githubStats);
};

function normalizeUsername(value) {
  return String(value || "")
    .replace(/^@+/, "")
    .trim()
    .slice(0, 39);
}

async function fetchJson(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "terminal-identity",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "terminal-identity",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.text();
}

async function fetchImageDataUri(url) {
  if (!url) return null;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "terminal-identity",
      },
    });

    if (!response.ok) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "image/png";
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch (_error) {
    return null;
  }
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanHtmlText(value) {
  return decodeHtmlEntities(String(value || ""))
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCompactCount(value) {
  const text = cleanHtmlText(value).replaceAll(",", "").toLowerCase();
  const match = text.match(/^([\d.]+)([kmb])?$/i);
  if (!match) {
    return 0;
  }

  const number = Number(match[1] || 0);
  const unit = String(match[2] || "").toLowerCase();
  const multiplier = unit === "k" ? 1e3 : unit === "m" ? 1e6 : unit === "b" ? 1e9 : 1;
  return Math.round(number * multiplier);
}

function withImageSize(url, size) {
  if (!url) return "";
  return `${url}${url.includes("?") ? "&" : "?"}s=${size}`;
}

module.exports = {
  cleanHtmlText,
  decodeHtmlEntities,
  fetchImageDataUri,
  fetchJson,
  fetchText,
  normalizeUsername,
  parseCompactCount,
  withImageSize,
};

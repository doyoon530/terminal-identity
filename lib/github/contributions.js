const { fetchText, normalizeUsername } = require("./shared");

function parseContributionCalendar(html) {
  if (!html) return null;

  const totalMatch = html.match(/>\s*([\d,]+)\s+contributions?\s+(?:in the last year|in \d{4})\s*</i);
  const total = totalMatch ? Number(String(totalMatch[1]).replaceAll(",", "")) : 0;
  const tooltipCounts = new Map();
  const tooltipRe = /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  const days = [];
  let match;

  while ((match = tooltipRe.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const countMatch = text.match(/([\d,]+)\s+contributions?/i);
    tooltipCounts.set(match[1], countMatch ? Number(countMatch[1].replaceAll(",", "")) : 0);
  }

  const dayRe = /<td\b(?=[^>]*ContributionCalendar-day)[^>]*>/g;

  while ((match = dayRe.exec(html)) !== null) {
    const cell = match[0];
    const dateMatch = cell.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/);
    const levelMatch = cell.match(/\bdata-level="([0-4])"/);
    const idMatch = cell.match(/\bid="([^"]+)"/);

    if (!dateMatch || !levelMatch) continue;

    days.push({
      date: dateMatch[1],
      level: Number(levelMatch[1] || 0),
      count: idMatch && tooltipCounts.has(idMatch[1]) ? tooltipCounts.get(idMatch[1]) : undefined,
    });
  }

  if (days.length === 0) {
    const fallbackDayRe = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g;

    while ((match = fallbackDayRe.exec(html)) !== null) {
      days.push({
        date: match[1],
        level: Number(match[2] || 0),
      });
    }
  }

  if (days.length === 0) {
    return null;
  }

  const sorted = days.sort((a, b) => a.date.localeCompare(b.date));
  const weekMap = new Map();

  sorted.forEach((day) => {
    const date = new Date(`${day.date}T00:00:00Z`);
    const weekStart = new Date(date);
    weekStart.setUTCDate(date.getUTCDate() - date.getUTCDay());
    const key = weekStart.toISOString().slice(0, 10);

    if (!weekMap.has(key)) {
      weekMap.set(key, Array.from({ length: 7 }, () => null));
    }

    const normalizedDay = {
      date: day.date,
      level: Math.max(0, Math.min(4, day.level)),
    };

    if (typeof day.count === "number") {
      normalizedDay.count = Math.max(0, Math.floor(day.count));
    }

    weekMap.get(key)[date.getUTCDay()] = normalizedDay;
  });

  const weekKeys = [...weekMap.keys()].sort();
  const allWeeks = weekKeys.map((key) => ({
    start: key,
    days: weekMap.get(key),
  }));

  return {
    total,
    activeDays: sorted.filter((day) =>
      typeof day.count === "number" ? day.count > 0 : day.level > 0
    ).length,
    weeks: allWeeks,
  };
}

async function fetchGithubContributions(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return null;

  try {
    const html = await fetchText(`https://github.com/users/${normalized}/contributions`);
    return parseContributionCalendar(html);
  } catch (_error) {
    return null;
  }
}

module.exports = {
  fetchGithubContributions,
  parseContributionCalendar,
};

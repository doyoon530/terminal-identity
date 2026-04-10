const {
  defaults,
  presets,
  LANG_ICON_MAP,
  normalizeState,
  serializeState,
  buildSvg,
  buildApiUrl,
} = window.TerminalIdentity;

const form = document.getElementById("builder-form");
const svgMount = document.getElementById("svgMount");
const svgOutput = document.getElementById("svgOutput");
const markdownOutput = document.getElementById("markdownOutput");
const apiOutput = document.getElementById("apiOutput");
const presetGallery = document.getElementById("presetGallery");
const presetButton = document.getElementById("presetButton");
const copySvgButton = document.getElementById("copySvgButton");
const copyMarkdownButton = document.getElementById("copyMarkdownButton");
const copyShareButton = document.getElementById("copyShareButton");
const downloadButton = document.getElementById("downloadButton");
let renderToken = 0;

function copyTextWithFallback(value, target) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }

  target.removeAttribute("readonly");
  target.focus();
  target.select();
  document.execCommand("copy");
  target.setAttribute("readonly", "true");
  return Promise.resolve();
}

function getState() {
  return normalizeState({
    name: document.getElementById("name").value.trim(),
    username: document.getElementById("username").value.trim(),
    role: document.getElementById("role").value.trim(),
    tagline: document.getElementById("tagline").value.trim(),
    status: document.getElementById("status").value.trim(),
    command: document.getElementById("command").value.trim(),
    provider: document.getElementById("provider").value,
    theme: document.getElementById("theme").value,
    avatar: document.getElementById("avatar").value.trim(),
    pattern: document.getElementById("pattern").value,
    width: document.getElementById("width").value,
    height: document.getElementById("height").value.trim(),
    accent: document.getElementById("accent").value.trim(),
    motion: document.getElementById("motion").value,
    showContribs: document.getElementById("showContribs").value,
    contribTheme: document.getElementById("contribTheme").value,
    contribRange: document.getElementById("contribRange").value,
    contribMode: document.getElementById("contribMode").value,
    barStyle: document.getElementById("barStyle").value,
    langStyle: document.getElementById("langStyle").value,
    iconSize: document.getElementById("iconSize").value,
    showLangs: document.getElementById("showLangs").value,
    langCount: document.getElementById("langCount").value,
    hideAvatar: document.getElementById("hideAvatar").checked,
    hideCommand: document.getElementById("hideCommand").checked,
    hideProfile: document.getElementById("hideProfile").checked,
    stats: ["repos", "stars", "forks", "followers"].filter((s) => document.getElementById(`stat-${s}`).checked).join(","),
    excludeLangs: document.getElementById("excludeLangs").value.trim(),
    bio: document.getElementById("bio").value.trim(),
  });
}

function fillForm(state) {
  document.getElementById("name").value = state.name;
  document.getElementById("username").value = state.username || "";
  document.getElementById("role").value = state.role;
  document.getElementById("tagline").value = state.tagline;
  document.getElementById("status").value = state.status;
  document.getElementById("command").value = state.command;
  document.getElementById("provider").value = state.provider;
  document.getElementById("theme").value = state.theme;
  document.getElementById("avatar").value = state.avatar;
  document.getElementById("pattern").value = state.pattern;
  document.getElementById("width").value = state.width;
  document.getElementById("height").value = state.heightAuto ? "auto" : state.height;
  document.getElementById("accent").value = state.accent || "";
  document.getElementById("motion").value = state.motion || "off";
  document.getElementById("showContribs").value = state.showContribs || "off";
  document.getElementById("contribTheme").value = state.contribTheme || "moss";
  document.getElementById("contribRange").value = state.contribRange || "1y";
  document.getElementById("contribMode").value = state.contribMode || "compact";
  document.getElementById("barStyle").value = state.barStyle || "bar";
  document.getElementById("langStyle").value = state.langStyle || "bar";
  document.getElementById("iconSize").value = state.iconSize || "md";
  document.getElementById("showLangs").value = state.showLangs || "auto";
  document.getElementById("langCount").value = state.langCount || "";
  document.getElementById("hideAvatar").checked = state.hideAvatar === "true" || state.hideAvatar === true;
  document.getElementById("hideCommand").checked = state.hideCommand === "true" || state.hideCommand === true;
  document.getElementById("hideProfile").checked = state.hideProfile === "true" || state.hideProfile === true;
  const statsArr = Array.isArray(state.stats) ? state.stats : ["repos", "stars", "forks", "followers"];
  ["repos", "stars", "forks", "followers"].forEach((s) => {
    document.getElementById(`stat-${s}`).checked = statsArr.includes(s);
  });
  document.getElementById("excludeLangs").value = Array.isArray(state.excludeLangs)
    ? state.excludeLangs.join(", ")
    : (state.excludeLangs || "");
  document.getElementById("bio").value = state.bio || "";
}

function loadStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const state = normalizeState({
    name: params.get("name"),
    username: params.get("username"),
    role: params.get("role"),
    tagline: params.get("tagline"),
    status: params.get("status"),
    command: params.get("command"),
    provider: params.get("provider"),
    theme: params.get("theme"),
    avatar: params.get("avatar"),
    pattern: params.get("pattern"),
    width: params.get("width"),
    height: params.get("height"),
    accent: params.get("accent"),
    motion: params.get("motion"),
    showContribs: params.get("showContribs"),
    contribTheme: params.get("contribTheme"),
    contribRange: params.get("contribRange"),
    contribMode: params.get("contribMode"),
    barStyle: params.get("barStyle"),
    langStyle: params.get("langStyle"),
    iconSize: params.get("iconSize"),
    showLangs: params.get("showLangs"),
    langCount: params.get("langCount"),
    hideAvatar: params.get("hideAvatar"),
    hideCommand: params.get("hideCommand"),
    hideProfile: params.get("hideProfile"),
    stats: params.get("stats"),
    excludeLangs: params.get("excludeLangs"),
    bio: params.get("bio"),
  });
  fillForm(state);
}

function getApiBaseUrl() {
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return `${window.location.origin}/api`;
  }

  return "https://your-domain.vercel.app/api";
}

function buildMarkdown(apiUrl, link) {
  const img = `<img src="${apiUrl}" width="100%" alt="Terminal identity card" />`;
  if (!link) return img;
  return `<a href="${link}">\n  ${img}\n</a>`;
}

function updateShareUrl(state) {
  const nextUrl = `${window.location.pathname}?${serializeState(state).toString()}`;
  window.history.replaceState({}, "", nextUrl);
}

async function fetchGithubStats(username) {
  if (!username || !window.location.origin.startsWith("http")) {
    return null;
  }

  try {
    const response = await fetch(`/api/github?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (_error) {
    return null;
  }
}

async function render() {
  const currentToken = ++renderToken;
  const state = getState();
  let nextState = state;
  const githubStats = await fetchGithubStats(state.username);

  if (currentToken !== renderToken) {
    return;
  }

  if (githubStats) {
    nextState = { ...state, githubStats };
    if (!state.hideProfile && githubStats.avatarUrl) {
      nextState = { ...nextState, profileUri: `${githubStats.avatarUrl}&s=120` };
    }
  }

  // Playground: use skillicons URL directly (inline SVG can load external resources)
  if (state.langStyle === "icons" && nextState.githubStats?.topLangs) {
    const effectiveLangs = nextState.githubStats.topLangs
      .filter((l) => !state.excludeLangs.includes(l.name.toLowerCase()))
      .slice(0, state.langCount);
    const iconKeys = effectiveLangs.map((l) => LANG_ICON_MAP[l.name]).filter(Boolean);
    if (iconKeys.length > 0) {
      nextState = { ...nextState, langIconsUri: `https://skillicons.dev/icons?i=${iconKeys.join(",")}`, langIconCount: iconKeys.length };
    }
  }

  const svg = buildSvg(nextState);
  const apiUrl = buildApiUrl(state, getApiBaseUrl());
  const link = document.getElementById("link").value.trim();

  svgMount.innerHTML = svg;
  svgOutput.value = svg;
  apiOutput.value = apiUrl;
  markdownOutput.value = buildMarkdown(apiUrl, link);
  updateShareUrl(state);
}

function renderPresetGallery() {
  presetGallery.innerHTML = presets
    .map((preset, index) => {
      const state = normalizeState(preset.state);
      const cardSvg = buildSvg({
        ...state,
        width: 640,
        height: 360,
      });

      return `
        <button type="button" class="preset-card" data-preset-index="${index}">
          <div class="preset-art">${cardSvg}</div>
          <div class="preset-copy">
            <strong>${preset.label}</strong>
            <span>${preset.description}</span>
          </div>
        </button>
      `;
    })
    .join("");

  presetGallery.querySelectorAll(".preset-card").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presets[Number(button.dataset.presetIndex)];
      fillForm(normalizeState(preset.state));
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function setDefaults() {
  fillForm(defaults);
  void render();
}

form.addEventListener("input", () => {
  void render();
});
form.addEventListener("change", () => {
  void render();
});
presetButton.addEventListener("click", setDefaults);

copySvgButton.addEventListener("click", async () => {
  await copyTextWithFallback(svgOutput.value, svgOutput);
  copySvgButton.textContent = "Copied";
  window.setTimeout(() => {
    copySvgButton.textContent = "Copy SVG";
  }, 1200);
});

copyMarkdownButton.addEventListener("click", async () => {
  await copyTextWithFallback(markdownOutput.value, markdownOutput);
  copyMarkdownButton.textContent = "Copied";
  window.setTimeout(() => {
    copyMarkdownButton.textContent = "Copy markdown";
  }, 1200);
});

copyShareButton.addEventListener("click", async () => {
  await copyTextWithFallback(apiOutput.value, apiOutput);
  copyShareButton.textContent = "Copied";
  window.setTimeout(() => {
    copyShareButton.textContent = "Copy API URL";
  }, 1200);
});

downloadButton.addEventListener("click", () => {
  const blob = new Blob([svgOutput.value], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "terminal-identity-card.svg";
  link.click();
  URL.revokeObjectURL(url);
});

loadStateFromUrl();
renderPresetGallery();
void render();

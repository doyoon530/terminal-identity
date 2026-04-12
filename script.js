const {
  defaults,
  presets,
  LANG_ICON_MAP,
  normalizeState,
  serializeState,
  buildSvg,
  buildApiUrl,
} = window.TerminalIdentity;
const {
  FORM_FIELD_IDS = [],
  SELECT_OPTIONS = {},
  STAT_KEYS = ["repos", "stars", "forks", "followers"],
} = window.TerminalIdentityPlaygroundConfig || {};
const {
  createGithubStatsClient = () => ({
    fetchGithubStats: async () => null,
    getCachedGithubStats: () => null,
  }),
} = window.TerminalIdentityPlaygroundGithubClient || {};
const {
  createPreviewUtils = () => ({
    buildRenderedState: (state) => state,
    commitRender: () => {},
    getRequestedGithubFields: () => [],
  }),
} = window.TerminalIdentityPlaygroundPreview || {};

const STORAGE_KEY = "terminal-identity-playground-state-v3";
const UI_MODE_KEY = "terminal-identity-ui-mode-v1";
const DEFAULT_PROFILE = "doyoon530";
const RECIPE_GALLERY_VERSION = "2026-04-13-gallery-thumbs-2";
const RECIPE_THUMB_DIMENSIONS = {
  "cat-jump-ghost-grid": { width: 980, height: 680 },
  "popcat-activity-burst": { width: 980, height: 580 },
  "capybara-onsen": { width: 980, height: 580 },
  "moon-phase-dashboard": { width: 980, height: 620 },
  "starfield-maintainer": { width: 980, height: 750 },
  "orbit-builder": { width: 980, height: 540 },
  "signal-radar-card": { width: 980, height: 630 },
  "firefly-night-mode": { width: 980, height: 610 },
};
const EXPORT_TABS = {
  markdown: {
    label: "README markdown",
    copyLabel: "Copy Markdown",
  },
  api: {
    label: "API URL",
    copyLabel: "Copy API URL",
  },
  svg: {
    label: "SVG source",
    copyLabel: "Copy SVG",
  },
};

const form = document.getElementById("builder-form");
const formBody = document.getElementById("formBody");
const svgMount = document.getElementById("svgMount");
const presetGallery = document.getElementById("presetGallery");
const downloadButton = document.getElementById("downloadButton");
const copyCurrentButton = document.getElementById("copyCurrentButton");
const exportOutput = document.getElementById("exportOutput");
const exportLabelText = document.getElementById("exportLabelText");
const previewSummary = document.getElementById("previewSummary");
const previewDiagnostics = document.getElementById("previewDiagnostics");
const heroSummary = document.getElementById("heroSummary");
const githubProfileLink = document.getElementById("githubProfileLink");
const syncGithubButton = document.getElementById("syncGithubButton");
const randomizeButton = document.getElementById("randomizeButton");
const resetButton = document.getElementById("resetButton");
const basicModeButton = document.getElementById("basicModeButton");
const advancedModeButton = document.getElementById("advancedModeButton");
const excludeLangsHidden = document.getElementById("excludeLangs");
const excludeLangInput = document.getElementById("excludeLangInput");
const excludeLangChips = document.getElementById("excludeLangChips");
const exportTabs = [...document.querySelectorAll(".export-tab")];

const fieldIds = FORM_FIELD_IDS;

let renderToken = 0;
let renderTimer = null;
let currentExportTab = "markdown";
let currentUiMode = loadUiMode();
let excludeLangValues = [];
let exportPayload = {
  markdown: "",
  api: "",
  svg: "",
};
const githubStatsClient = createGithubStatsClient({
  normalizeUsername,
});
const previewUtils = createPreviewUtils({
  LANG_ICON_MAP,
  buildSvg,
  buildApiUrl,
  buildMarkdown,
  getApiBaseUrl,
  normalizeUsername,
  previewSummary,
  heroSummary,
  previewDiagnostics,
  svgMount,
  updateExportPanel,
  updateGithubLink,
  updateShareUrl,
  saveState,
  setExportPayload: (nextPayload) => {
    exportPayload = nextPayload;
  },
});

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

function populateSelectOptions() {
  Object.entries(SELECT_OPTIONS).forEach(([id, options]) => {
    const select = document.getElementById(id);
    if (!select) {
      return;
    }

    select.innerHTML = options
      .map((option) => `<option value="${option.value}">${option.label}</option>`)
      .join("");
  });
}

function normalizeUsername(value) {
  return String(value || "")
    .replace(/^@+/, "")
    .trim();
}

function normalizeChipValue(value) {
  return String(value || "")
    .replaceAll(",", " ")
    .trim();
}

function parseExcludeLangValues(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => normalizeChipValue(entry)).filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return String(value)
    .split(",")
    .map((entry) => normalizeChipValue(entry))
    .filter(Boolean);
}

function setExcludeLangValues(values) {
  const seen = new Set();
  excludeLangValues = parseExcludeLangValues(values).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  excludeLangsHidden.value = excludeLangValues.join(", ");
  renderExcludeLangChips();
}

function renderExcludeLangChips() {
  excludeLangChips.innerHTML = excludeLangValues
    .map(
      (value, index) => `
        <span class="chip">
          ${value}
          <button type="button" data-chip-index="${index}" aria-label="Remove ${value}">&times;</button>
        </span>
      `
    )
    .join("");
}

function addExcludeLang(value) {
  const normalized = normalizeChipValue(value);
  if (!normalized) {
    return false;
  }

  if (excludeLangValues.some((entry) => entry.toLowerCase() === normalized.toLowerCase())) {
    return false;
  }

  setExcludeLangValues([...excludeLangValues, normalized]);
  return true;
}

function removeExcludeLang(index) {
  if (index < 0 || index >= excludeLangValues.length) {
    return;
  }

  const nextValues = excludeLangValues.slice();
  nextValues.splice(index, 1);
  setExcludeLangValues(nextValues);
}

function loadUiMode() {
  try {
    return localStorage.getItem(UI_MODE_KEY) === "advanced" ? "advanced" : "basic";
  } catch (_error) {
    return "basic";
  }
}

function saveUiMode(mode) {
  try {
    localStorage.setItem(UI_MODE_KEY, mode);
  } catch (_error) {
    // Ignore unavailable storage.
  }
}

function setUiMode(mode) {
  currentUiMode = mode === "advanced" ? "advanced" : "basic";
  formBody.dataset.uiMode = currentUiMode;
  basicModeButton.classList.toggle("active", currentUiMode === "basic");
  advancedModeButton.classList.toggle("active", currentUiMode === "advanced");
  basicModeButton.setAttribute("aria-pressed", String(currentUiMode === "basic"));
  advancedModeButton.setAttribute("aria-pressed", String(currentUiMode === "advanced"));
  saveUiMode(currentUiMode);
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return normalizeState(JSON.parse(raw));
  } catch (_error) {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_error) {
    // Ignore unavailable storage.
  }
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
    stats: STAT_KEYS.filter((stat) => document.getElementById(`stat-${stat}`).checked).join(","),
    excludeLangs: excludeLangValues,
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
  document.getElementById("contribRange").value = state.contribRange || "16w";
  document.getElementById("contribMode").value = state.contribMode || "compact";
  document.getElementById("barStyle").value = state.barStyle || "bar";
  document.getElementById("langStyle").value = state.langStyle || "bar";
  document.getElementById("iconSize").value = state.iconSize || "md";
  document.getElementById("showLangs").value = state.showLangs || "auto";
  document.getElementById("langCount").value = state.langCount || "";
  document.getElementById("hideAvatar").checked = state.hideAvatar === "true" || state.hideAvatar === true;
  document.getElementById("hideCommand").checked = state.hideCommand === "true" || state.hideCommand === true;
  document.getElementById("hideProfile").checked = state.hideProfile === "true" || state.hideProfile === true;
  const statsArr = Array.isArray(state.stats) ? state.stats : STAT_KEYS;
  STAT_KEYS.forEach((stat) => {
    document.getElementById(`stat-${stat}`).checked = statsArr.includes(stat);
  });
  setExcludeLangValues(Array.isArray(state.excludeLangs) ? state.excludeLangs : parseExcludeLangValues(state.excludeLangs));
  document.getElementById("bio").value = state.bio || "";
}

function getUrlState() {
  const params = new URLSearchParams(window.location.search);
  if (![...params.keys()].length) {
    return null;
  }

  return normalizeState({
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
}

function getInitialState() {
  return getUrlState() || loadSavedState() || normalizeState(defaults);
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

function getCachedGithubStats(username) {
  return githubStatsClient.getCachedGithubStats(username);
}

function fetchGithubStats(username, options = {}) {
  return githubStatsClient.fetchGithubStats(username, options);
}

function initialsFrom(value) {
  const text = String(value || "").trim();
  if (!text) {
    return defaults.avatar;
  }

  const parts = text.split(/[\s._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase().slice(0, 2);
  }

  return text.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase() || defaults.avatar;
}

function randomOptionValue(id) {
  const options = [...document.getElementById(id).options].map((option) => option.value);
  return options[Math.floor(Math.random() * options.length)];
}

function randomizeLook() {
  document.getElementById("provider").value = randomOptionValue("provider");
  document.getElementById("theme").value = randomOptionValue("theme");
  document.getElementById("pattern").value = randomOptionValue("pattern");
  document.getElementById("motion").value = ["off", "off", "pulse", "scan", "boot"][Math.floor(Math.random() * 5)];
  document.getElementById("barStyle").value = randomOptionValue("barStyle");
  document.getElementById("contribTheme").value = randomOptionValue("contribTheme");
}

function updateGithubLink(username) {
  const currentHandle = normalizeUsername(username);
  githubProfileLink.href = `https://github.com/${encodeURIComponent(DEFAULT_PROFILE)}`;
  githubProfileLink.textContent = `Open @${DEFAULT_PROFILE} on GitHub`;
  syncGithubButton.textContent = currentHandle ? "Sync Card Data" : `Use @${DEFAULT_PROFILE}`;
}

function updateExportPanel() {
  const tab = EXPORT_TABS[currentExportTab];
  exportTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.exportTab === currentExportTab);
  });
  exportLabelText.textContent = tab.label;
  exportOutput.value = exportPayload[currentExportTab] || "";
  copyCurrentButton.textContent = tab.copyLabel;
}

async function render(options) {
  const currentToken = ++renderToken;
  let state = getState();

  if (options?.syncProfile) {
    const username = normalizeUsername(state.username) || DEFAULT_PROFILE;
    document.getElementById("username").value = username;
    state = getState();
  }

  const username = normalizeUsername(state.username);
  const requestedGithubFields = previewUtils.getRequestedGithubFields(state);
  const cachedGithubStats = getCachedGithubStats(username, requestedGithubFields);
  previewUtils.commitRender(
    state,
    previewUtils.buildRenderedState(state, cachedGithubStats),
    cachedGithubStats,
    { loading: !!username && !cachedGithubStats }
  );

  if (!username) {
    return;
  }

  const githubStats = await fetchGithubStats(username, {
    fields: requestedGithubFields,
    forceRefresh: !!options?.syncProfile,
    waitForFresh: !cachedGithubStats || !!options?.syncProfile,
  });

  if (currentToken !== renderToken) {
    return;
  }

  if (options?.syncProfile && githubStats) {
    if (!document.getElementById("name").value.trim()) {
      document.getElementById("name").value = githubStats.name || username;
    }
    if (!document.getElementById("avatar").value.trim()) {
      document.getElementById("avatar").value = initialsFrom(githubStats.name || username);
    }
    state = getState();
  }

  previewUtils.commitRender(
    state,
    previewUtils.buildRenderedState(state, githubStats || cachedGithubStats),
    githubStats || cachedGithubStats,
    { loading: false }
  );
}

function scheduleRender(options) {
  window.clearTimeout(renderTimer);
  renderTimer = window.setTimeout(() => {
    void render(options);
  }, 120);
}

function getPresetTags(state) {
  const tags = [`${state.provider}/${state.theme}`];

  if (state.showContribs === "on") {
    tags.push(state.contribTheme);
  }

  if (state.showLangs === "on") {
    tags.push(state.langStyle === "icons" ? "icons" : "bars");
  }

  if (state.motion && state.motion !== "off") {
    tags.push(state.motion);
  }

  return tags.slice(0, 4);
}

function slugifyPresetLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "preset";
}

function renderPresetGallery() {
  presetGallery.innerHTML = presets
    .map((preset, index) => {
      const state = normalizeState(preset.state);
      const tags = getPresetTags(state);
      const slug = slugifyPresetLabel(preset.label);
      const cardUrl = `./assets/recipes/thumbs/${slug}.png?v=${RECIPE_GALLERY_VERSION}`;
      const thumbDimensions = RECIPE_THUMB_DIMENSIONS[slug] || { width: 980, height: 580 };

      return `
        <button type="button" class="preset-card" data-preset-index="${index}">
          <div class="preset-art">
            <img src="${cardUrl}" alt="${preset.label}" loading="lazy" decoding="async" width="${thumbDimensions.width}" height="${thumbDimensions.height}" />
          </div>
          <div class="preset-copy">
            <strong>${preset.label}</strong>
            <span>${preset.description}</span>
            <div class="preset-tags">
              ${tags.map((tag) => `<span class="preset-tag">${tag}</span>`).join("")}
            </div>
          </div>
        </button>
      `;
    })
    .join("");

  presetGallery.querySelectorAll(".preset-card").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presets[Number(button.dataset.presetIndex)];
      fillForm(normalizeState(preset.state));
      document.querySelector(".controls")?.scrollIntoView({ behavior: "smooth", block: "start" });
      scheduleRender();
    });
  });
}

async function syncGithubProfile() {
  const currentLabel = syncGithubButton.textContent;
  syncGithubButton.disabled = true;
  syncGithubButton.textContent = "Syncing...";
  const usernameField = document.getElementById("username");
  usernameField.value = normalizeUsername(usernameField.value) || DEFAULT_PROFILE;
  await render({ syncProfile: true });
  syncGithubButton.disabled = false;
  updateGithubLink(usernameField.value);
  if (!normalizeUsername(usernameField.value)) {
    syncGithubButton.textContent = currentLabel;
  }
}

fieldIds.forEach((id) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.addEventListener("input", () => {
    if (id === "username") {
      updateGithubLink(element.value);
    }
    scheduleRender();
  });
  element.addEventListener("change", () => {
    if (id === "username") {
      updateGithubLink(element.value);
    }
    scheduleRender();
  });
});

excludeLangInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === ",") {
    event.preventDefault();
    if (addExcludeLang(excludeLangInput.value)) {
      excludeLangInput.value = "";
      scheduleRender();
    }
    return;
  }

  if (event.key === "Backspace" && !excludeLangInput.value && excludeLangValues.length > 0) {
    removeExcludeLang(excludeLangValues.length - 1);
    scheduleRender();
  }
});

excludeLangInput.addEventListener("blur", () => {
  if (addExcludeLang(excludeLangInput.value)) {
    excludeLangInput.value = "";
    scheduleRender();
  }
});

excludeLangChips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chip-index]");
  if (!button) {
    return;
  }

  removeExcludeLang(Number(button.dataset.chipIndex));
  scheduleRender();
});

basicModeButton.addEventListener("click", () => setUiMode("basic"));
advancedModeButton.addEventListener("click", () => setUiMode("advanced"));

randomizeButton.addEventListener("click", () => {
  randomizeLook();
  scheduleRender();
});

resetButton.addEventListener("click", () => {
  fillForm(normalizeState(defaults));
  scheduleRender();
});

syncGithubButton.addEventListener("click", () => {
  void syncGithubProfile();
});

exportTabs.forEach((button) => {
  button.addEventListener("click", () => {
    currentExportTab = button.dataset.exportTab;
    updateExportPanel();
  });
});

copyCurrentButton.addEventListener("click", async () => {
  await copyTextWithFallback(exportPayload[currentExportTab] || "", exportOutput);
  const original = EXPORT_TABS[currentExportTab].copyLabel;
  copyCurrentButton.textContent = "Copied";
  window.setTimeout(() => {
    copyCurrentButton.textContent = original;
  }, 1200);
});

downloadButton.addEventListener("click", () => {
  const blob = new Blob([exportPayload.svg || ""], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "terminal-identity-card.svg";
  link.click();
  URL.revokeObjectURL(url);
});

setUiMode(currentUiMode);
populateSelectOptions();
fillForm(getInitialState());
updateGithubLink(document.getElementById("username").value);
renderPresetGallery();
void render();

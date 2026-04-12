const fs = require("fs");
const path = require("path");

const {
  presets,
  normalizeState,
  buildSvg,
  LANG_ICON_MAP,
} = require("../terminal-card");
const { fetchGithubStats } = require("../github-data");

const ROOT_DIR = path.join(__dirname, "..");
const RECIPE_DIR = path.join(ROOT_DIR, "assets", "recipes");
const CAPYBARA_SPRITE_PATH = path.join(ROOT_DIR, "assets", "capybara-onsen-contrib-sprite.png");

const capybaraSpriteUri = (() => {
  try {
    const sprite = fs.readFileSync(CAPYBARA_SPRITE_PATH);
    return `data:image/png;base64,${sprite.toString("base64")}`;
  } catch (_error) {
    return null;
  }
})();

function slugifyPresetLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "preset";
}

async function fetchLangIconsDataUri(iconKeys) {
  if (!iconKeys.length) {
    return null;
  }

  const url = `https://skillicons.dev/icons?i=${iconKeys.join(",")}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load lang icons: ${response.status}`);
  }

  const svg = await response.text();
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function getRequestedGithubFields(state) {
  const fields = [];

  if (!state.hideProfile) {
    fields.push("avatar");
  }
  if (state.showLangs !== "off") {
    fields.push("langs");
  }
  if (state.showContribs !== "off") {
    fields.push("contribs");
  }

  return fields;
}

async function buildPresetState(preset) {
  const state = normalizeState({
    ...preset.state,
    capybaraSpriteUri,
  });
  if (!state.username) {
    return state;
  }

  const githubStats = await fetchGithubStats(state.username, {
    fields: getRequestedGithubFields(state),
  });
  if (!githubStats) {
    return state;
  }

  let nextState = {
    ...state,
    githubStats,
  };

  if (!state.hideProfile && (githubStats.avatarDataUri || githubStats.avatarUrl)) {
    nextState = {
      ...nextState,
      profileUri: githubStats.avatarDataUri || githubStats.avatarUrl,
    };
  }

  if (nextState.langStyle === "icons" && nextState.githubStats?.topLangs?.length) {
    const supportedLangs = nextState.githubStats.topLangs
      .filter((lang) => !nextState.excludeLangs.includes(lang.name.toLowerCase()))
      .filter((lang) => Boolean(LANG_ICON_MAP[lang.name]))
      .slice(0, nextState.langCount);
    const iconKeys = supportedLangs.map((lang) => LANG_ICON_MAP[lang.name]);

    if (iconKeys.length > 0) {
      nextState = {
        ...nextState,
        langIconsUri: await fetchLangIconsDataUri(iconKeys),
        langIconCount: iconKeys.length,
      };
    }
  }

  return nextState;
}

async function main() {
  for (const preset of presets) {
    const slug = slugifyPresetLabel(preset.label);
    const recipePath = path.join(RECIPE_DIR, `${slug}.svg`);
    const state = await buildPresetState(preset);
    const svg = buildSvg(state);
    fs.writeFileSync(recipePath, svg);
    console.log(`Generated ${recipePath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.TerminalIdentity = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const themeMap = {
    ember: {
      shell: "#161218",
      panel: "#201927",
      panelSoft: "#2c2336",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(255, 122, 89, 0.22)",
      title: "#fff6f0",
      text: "#f5ddd1",
      dim: "#b7a59d",
      accent: "#ff7a59",
      accentAlt: "#ffd166",
      success: "#7ee787",
    },
    aurora: {
      shell: "#0f1b1d",
      panel: "#122529",
      panelSoft: "#183238",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(30, 168, 150, 0.22)",
      title: "#f2fffc",
      text: "#d7f7f0",
      dim: "#93b8b0",
      accent: "#1ea896",
      accentAlt: "#8ef4d8",
      success: "#9bf6a6",
    },
    cobalt: {
      shell: "#0f172a",
      panel: "#111c39",
      panelSoft: "#182952",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(66, 110, 245, 0.22)",
      title: "#f5f8ff",
      text: "#dce6ff",
      dim: "#97a8cf",
      accent: "#4a7dff",
      accentAlt: "#8fb2ff",
      success: "#94f7c5",
    },
    velvet: {
      shell: "#1d1022",
      panel: "#29152f",
      panelSoft: "#351b3f",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(216, 51, 108, 0.22)",
      title: "#fff4fa",
      text: "#ffe0ec",
      dim: "#b99daf",
      accent: "#d6336c",
      accentAlt: "#faa2c1",
      success: "#ffd166",
    },
    graphite: {
      shell: "#111111",
      panel: "#181818",
      panelSoft: "#212121",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(255,255,255,0.1)",
      title: "#f7f7f7",
      text: "#e0e0e0",
      dim: "#979797",
      accent: "#f97316",
      accentAlt: "#facc15",
      success: "#86efac",
    },
    matcha: {
      shell: "#0f1712",
      panel: "#152118",
      panelSoft: "#1d2c21",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(162, 255, 134, 0.16)",
      title: "#f5fff3",
      text: "#def4d8",
      dim: "#99b79d",
      accent: "#72e06a",
      accentAlt: "#c7f464",
      success: "#b5f59b",
    },
    sakura: {
      shell: "#21131d",
      panel: "#311928",
      panelSoft: "#402032",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(255, 171, 203, 0.2)",
      title: "#fff5fa",
      text: "#ffe2ee",
      dim: "#c2a2b4",
      accent: "#ff7eb6",
      accentAlt: "#ffc6de",
      success: "#ffd166",
    },
    solar: {
      shell: "#1f1608",
      panel: "#30210e",
      panelSoft: "#3c2a12",
      line: "rgba(255,255,255,0.08)",
      glow: "rgba(255, 187, 92, 0.2)",
      title: "#fff8ec",
      text: "#f7e8c4",
      dim: "#bfaa7a",
      accent: "#ffb347",
      accentAlt: "#ffe082",
      success: "#a5f3a4",
    },
  };

  const providerMap = {
    classic: {
      label: "classic",
      windowTitle: "identity.sh",
      shellRadius: 26,
      topBarFill: null,
      topBarText: null,
      buttonMode: "traffic",
    },
    amber: {
      label: "amber",
      windowTitle: "amber session",
      shellRadius: 30,
      topBarFill: "#f2e7da",
      topBarText: "#614730",
      buttonMode: "dots",
    },
    obsidian: {
      label: "obsidian",
      windowTitle: "obsidian workspace",
      shellRadius: 22,
      topBarFill: "#0f1d18",
      topBarText: "#bff4d8",
      buttonMode: "minimal",
    },
    prism: {
      label: "prism",
      windowTitle: "prism canvas",
      shellRadius: 34,
      topBarFill: "#ecf2ff",
      topBarText: "#57678e",
      buttonMode: "glow",
    },
  };

  const STAT_KEYS = ["repos", "stars", "forks", "followers"];

  // Maps GitHub language names → skillicons.dev keys
  // MIT License © tandpfun — https://github.com/tandpfun/skill-icons
  const LANG_ICON_MAP = {
    "JavaScript": "js",
    "TypeScript": "ts",
    "Python": "py",
    "Rust": "rust",
    "Go": "go",
    "Java": "java",
    "Kotlin": "kotlin",
    "Swift": "swift",
    "Ruby": "ruby",
    "PHP": "php",
    "C": "c",
    "C++": "cpp",
    "C#": "cs",
    "HTML": "html",
    "CSS": "css",
    "SCSS": "sass",
    "Sass": "sass",
    "Dart": "dart",
    "Lua": "lua",
    "Scala": "scala",
    "Elixir": "elixir",
    "Haskell": "haskell",
    "Shell": "bash",
    "Bash": "bash",
    "R": "r",
    "Perl": "perl",
    "Zig": "zig",
    "OCaml": "ocaml",
    "Dockerfile": "docker",
    "Vue": "vue",
    "Svelte": "svelte",
    "Clojure": "clojure",
    "Erlang": "erlang",
    "Julia": "julia",
    "Crystal": "crystal",
    "HCL": "terraform",
    "Solidity": "solidity",
    "Nix": "nix",
  };

  const defaults = {
    name: "doyoon530",
    username: "",
    role: "frontend engineer",
    tagline: "Building tiny tools with taste.",
    status: "available for cool internet projects",
    command: "npx terminal-identity",
    provider: "classic",
    theme: "ember",
    avatar: "GG",
    pattern: "grid",
    width: 980,
    height: 520,
    accent: null,
    showLangs: "auto",
    langCount: 4,
    hideAvatar: false,
    hideCommand: false,
    stats: STAT_KEYS,
    excludeLangs: [],
  };

  const presets = [
    {
      label: "Starter",
      description: "Warm and friendly open-source intro",
      state: defaults,
    },
    {
      label: "Indie Hacker",
      description: "Bold builder energy with pulse accents",
      state: {
        name: "mina.sh",
        role: "indie hacker",
        tagline: "Shipping useful things before lunch.",
        status: "building products, docs, and weird little experiments",
        command: "pnpm create tiny-hit",
        provider: "obsidian",
        theme: "graphite",
        avatar: "MS",
        pattern: "pulse",
        width: 980,
        height: 520,
      },
    },
    {
      label: "Design Engineer",
      description: "Soft contrast and editorial mood",
      state: {
        name: "jiwon",
        role: "design engineer",
        tagline: "Design systems with motion, type, and restraint.",
        status: "open to product design and frontend collaborations",
        command: "npm run polish-ui",
        provider: "amber",
        theme: "sakura",
        avatar: "JW",
        pattern: "rings",
        width: 980,
        height: 520,
      },
    },
    {
      label: "DevRel",
      description: "Bright community-facing profile card",
      state: {
        name: "alex.dev",
        role: "developer advocate",
        tagline: "Teaching APIs without making them feel scary.",
        status: "speaking, writing, and shipping DX experiments",
        command: "npx explain-like-im-new",
        provider: "prism",
        theme: "aurora",
        avatar: "AD",
        pattern: "grid",
        width: 980,
        height: 520,
      },
    },
    {
      label: "Creative Coder",
      description: "Colorful and slightly dramatic",
      state: {
        name: "noah",
        role: "creative coder",
        tagline: "Code, typography, and generative visuals in one place.",
        status: "available for interactive art and frontend commissions",
        command: "bun run make-something-strange",
        provider: "amber",
        theme: "velvet",
        avatar: "NH",
        pattern: "pulse",
        width: 980,
        height: 520,
      },
    },
    {
      label: "Systems",
      description: "Calm, crisp, technical identity",
      state: {
        name: "aria",
        role: "platform engineer",
        tagline: "Reliable infrastructure with humane developer tooling.",
        status: "focused on observability, scale, and platform DX",
        command: "terraform apply confidence",
        provider: "obsidian",
        theme: "cobalt",
        avatar: "AR",
        pattern: "rings",
        width: 980,
        height: 520,
      },
    },
    {
      label: "Greenfield",
      description: "Fresh product-builder vibe",
      state: {
        name: "leo",
        role: "full-stack maker",
        tagline: "Turning napkin ideas into products people keep using.",
        status: "currently exploring AI, commerce, and tiny SaaS tools",
        command: "pnpm ship --fast",
        provider: "prism",
        theme: "matcha",
        avatar: "LE",
        pattern: "grid",
        width: 980,
        height: 520,
      },
    },
    {
      label: "Solar Punk",
      description: "Golden, upbeat, optimistic energy",
      state: {
        name: "hana",
        role: "product engineer",
        tagline: "Clean interfaces, kind systems, and rapid iteration.",
        status: "available for startups that care about craft",
        command: "npm run build-bright",
        provider: "amber",
        theme: "solar",
        avatar: "HA",
        pattern: "rings",
        width: 980,
        height: 520,
      },
    },
  ];

  function escapeXml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function isValidHex(value) {
    return typeof value === "string" && /^#[0-9a-fA-F]{3,8}$/.test(value);
  }

  function parseBool(value) {
    return value === true || value === "true" || value === "1";
  }

  function parseStatsList(value) {
    if (Array.isArray(value)) {
      const filtered = value.filter((s) => STAT_KEYS.includes(s));
      return filtered.length > 0 ? filtered : STAT_KEYS;
    }
    if (!value) return STAT_KEYS;
    const parsed = String(value).split(",").map((s) => s.trim()).filter((s) => STAT_KEYS.includes(s));
    return parsed.length > 0 ? parsed : STAT_KEYS;
  }

  function parseExcludeLangs(value) {
    if (Array.isArray(value)) return value.map((s) => String(s).toLowerCase().trim()).filter(Boolean);
    if (!value) return [];
    return String(value).split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  }

  function safeNumber(value, fallback, min, max) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      return fallback;
    }
    return Math.min(Math.max(parsed, min), max);
  }

  function normalizeGithubStats(stats) {
    if (!stats || typeof stats !== "object") {
      return null;
    }

    const topLangs =
      Array.isArray(stats.topLangs) && stats.topLangs.length > 0
        ? stats.topLangs
            .slice(0, 12)
            .filter((l) => l && typeof l.name === "string" && typeof l.count === "number")
            .map((l) => ({ name: String(l.name).slice(0, 20), count: Math.max(0, Math.floor(l.count)) }))
        : null;

    return {
      username: String(stats.username || "").slice(0, 39),
      repos: safeNumber(stats.repos, 0, 0, 100000),
      followers: safeNumber(stats.followers, 0, 0, 100000000),
      stars: safeNumber(stats.stars, 0, 0, 100000000),
      forks: safeNumber(stats.forks, 0, 0, 100000000),
      topLangs,
    };
  }

  function formatCompactStat(value) {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value >= 10000000 ? 0 : 1)}M`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
    }

    return String(value);
  }

  function truncateText(value, limit) {
    const text = String(value || "");
    if (text.length <= limit) {
      return text;
    }

    return `${text.slice(0, Math.max(0, limit - 1))}…`;
  }

  function getStatusText(state) {
    if (!state.githubStats) {
      return state.status;
    }

    return `${formatCompactStat(state.githubStats.stars)} stars • ${formatCompactStat(
      state.githubStats.repos
    )} repos • ${formatCompactStat(state.githubStats.followers)} followers`;
  }

  function buildGraphic(ratio, bx, rowY, barTrack, accentColor, trackBg, style) {
    const bg = trackBg || "rgba(255,255,255,0.08)";
    if (style === "dots") {
      const count = 10;
      const spacing = barTrack / count;
      const r = Math.min(spacing / 2 - 1, 3);
      const filled = Math.round(ratio * count);
      return Array.from({ length: count }, (_, i) =>
        `<circle cx="${bx + spacing * i + spacing / 2}" cy="${rowY + 7}" r="${r}" fill="${i < filled ? accentColor : bg}"></circle>`
      ).join("");
    }
    if (style === "blocks") {
      const count = 8;
      const gap = 2;
      const blockW = (barTrack - (count - 1) * gap) / count;
      const filled = Math.round(ratio * count);
      return Array.from({ length: count }, (_, i) =>
        `<rect x="${bx + i * (blockW + gap)}" y="${rowY + 5}" width="${blockW}" height="4" rx="1" fill="${i < filled ? accentColor : bg}"></rect>`
      ).join("");
    }
    // bar (default)
    const filledW = Math.max(2, Math.round(ratio * barTrack));
    return [
      `<rect x="${bx}" y="${rowY + 5}" width="${barTrack}" height="3" rx="1" fill="${bg}"></rect>`,
      `<rect x="${bx}" y="${rowY + 5}" width="${filledW}" height="3" rx="1" fill="${accentColor}"></rect>`,
    ].join("");
  }

  function buildStatBars(stats, x, y, trackWidth, accentColor, dimColor, trackBg, keys, style) {
    const bg = trackBg || "rgba(255,255,255,0.08)";
    const allItems = [
      { label: "repos",     value: stats.repos },
      { label: "stars",     value: stats.stars },
      { label: "forks",     value: stats.forks },
      { label: "followers", value: stats.followers },
    ];
    const items = keys && keys.length < 4 ? allItems.filter((item) => keys.includes(item.label)) : allItems;
    const maxVal = Math.max(...items.map((s) => s.value), 1);
    const labelW = 90;
    const valW = 42;
    const barTrack = Math.max(trackWidth - labelW - valW, 40);
    const rowH = 18;

    return items
      .map((item, i) => {
        const rowY = y + i * rowH;
        const ratio = item.value / maxVal;
        return [
          `<text x="${x}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${item.label}</text>`,
          buildGraphic(ratio, x + labelW, rowY, barTrack, accentColor, bg, style),
          `<text x="${x + labelW + barTrack + 8}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${formatCompactStat(item.value)}</text>`,
        ].join("\n  ");
      })
      .join("\n  ");
  }

  function buildLangBars(topLangs, x, y, trackWidth, accentColor, dimColor, trackBg, style) {
    const bg = trackBg || "rgba(255,255,255,0.08)";
    const total = topLangs.reduce((s, l) => s + l.count, 0) || 1;
    const maxVal = Math.max(...topLangs.map((l) => l.count), 1);
    const labelW = 90;
    const valW = 36;
    const barTrack = Math.max(trackWidth - labelW - valW, 40);
    const rowH = 18;

    return topLangs
      .map((lang, i) => {
        const rowY = y + i * rowH;
        const ratio = lang.count / maxVal;
        const pct = Math.round((lang.count / total) * 100);
        return [
          `<text x="${x}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${escapeXml(truncateText(lang.name, 12))}</text>`,
          buildGraphic(ratio, x + labelW, rowY, barTrack, accentColor, bg, style),
          `<text x="${x + labelW + barTrack + 8}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${pct}%</text>`,
        ].join("\n  ");
      })
      .join("\n  ");
  }

  // skillicons.dev renders each icon at 45×45 with 15px gap (60px/icon)
  const ICON_SIZES = { sm: 26, md: 38, lg: 52 };

  function buildLangIcons(uri, x, y, trackWidth, count, iconSize) {
    const iconH = ICON_SIZES[iconSize] ?? ICON_SIZES.md;
    const perIconW = Math.round(iconH * (60 / 45));
    const iconW = Math.min(count * perIconW, trackWidth);
    return `<image x="${x}" y="${y}" width="${iconW}" height="${iconH}" href="${escapeXml(uri)}" preserveAspectRatio="xMinYMid meet"></image>`;
  }

  function normalizeState(input) {
    const state = input || {};
    const rawTheme = String(state.theme || defaults.theme);
    const [providerFromTheme, themeFromCombo] = rawTheme.includes("/")
      ? rawTheme.split("/", 2)
      : [null, rawTheme];
    const providerCandidate = state.provider || providerFromTheme || defaults.provider;
    const provider = providerMap[providerCandidate] ? providerCandidate : defaults.provider;
    const theme = themeMap[themeFromCombo] ? themeFromCombo : defaults.theme;
    const pattern = ["grid", "rings", "pulse"].includes(state.pattern)
      ? state.pattern
      : defaults.pattern;

    return {
      name: String(state.name || defaults.name).slice(0, 36),
      username: String(state.username || defaults.username).replace(/^@+/, "").slice(0, 39),
      role: String(state.role || defaults.role).slice(0, 48),
      tagline: String(state.tagline || defaults.tagline).slice(0, 100),
      status: String(state.status || defaults.status).slice(0, 72),
      command: String(state.command || defaults.command).slice(0, 52),
      provider,
      theme,
      avatar: String(state.avatar || defaults.avatar).slice(0, 4).toUpperCase(),
      pattern,
      width: safeNumber(state.width, defaults.width, 720, 1400),
      height: safeNumber(state.height, defaults.height, 420, 820),
      githubStats: normalizeGithubStats(state.githubStats),
      accent: isValidHex(state.accent) ? String(state.accent) : null,
      showLangs: ["auto", "on", "off"].includes(state.showLangs) ? state.showLangs : "auto",
      langCount: safeNumber(state.langCount, 4, 1, 6),
      hideAvatar: parseBool(state.hideAvatar),
      hideCommand: parseBool(state.hideCommand),
      stats: parseStatsList(state.stats),
      excludeLangs: parseExcludeLangs(state.excludeLangs),
      barStyle: ["bar", "dots", "blocks"].includes(state.barStyle) ? state.barStyle : "bar",
      langStyle: ["bar", "icons"].includes(state.langStyle) ? state.langStyle : "bar",
      iconSize: ["sm", "md", "lg"].includes(state.iconSize) ? state.iconSize : "md",
      langIconsUri: typeof state.langIconsUri === "string" && state.langIconsUri.length > 0 ? state.langIconsUri : null,
      profileUri: typeof state.profileUri === "string" && state.profileUri.length > 0 ? state.profileUri : null,
      hideProfile: parseBool(state.hideProfile),
    };
  }

  function serializeState(state) {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (key === "provider" || key === "githubStats") return;
      if (value === null || value === false || value === "") return;
      if (key === "showLangs" && value === "auto") return;
      if (key === "langCount" && value === 4) return;
      if (key === "barStyle" && value === "bar") return;
      if (key === "langStyle" && value === "bar") return;
      if (key === "iconSize" && value === "md") return;
      if (key === "langIconsUri") return;
      if (key === "profileUri") return;
      if (key === "stats") {
        if (value.length < 4) params.set("stats", value.join(","));
        return;
      }
      if (key === "excludeLangs") {
        if (value.length > 0) params.set("excludeLangs", value.join(","));
        return;
      }
      if (key === "theme") {
        params.set(
          "theme",
          state.provider && state.provider !== "classic"
            ? `${state.provider}/${state.theme}`
            : state.theme
        );
        return;
      }
      params.set(key, String(value));
    });
    return params;
  }

  function buildPattern(pattern, width, height, palette) {
    if (pattern === "rings") {
      return `
        <circle cx="${width - 132}" cy="128" r="90" fill="none" stroke="${palette.glow}" stroke-width="28"></circle>
        <circle cx="${width - 132}" cy="128" r="46" fill="none" stroke="${palette.glow}" stroke-width="10"></circle>
        <circle cx="${width - 250}" cy="${height - 90}" r="34" fill="${palette.glow}"></circle>
      `;
    }

    if (pattern === "pulse") {
      return `
        <path d="M${width - 300} ${height - 90}C${width - 250} ${height - 150} ${width - 220} ${height - 30} ${width - 180} ${height - 90}C${width - 150} ${height - 130} ${width - 110} ${height - 35} ${width - 56} ${height - 96}" fill="none" stroke="${palette.accentAlt}" stroke-width="6" stroke-linecap="round"></path>
        <circle cx="${width - 180}" cy="${height - 90}" r="10" fill="${palette.accent}"></circle>
        <circle cx="${width - 56}" cy="${height - 96}" r="10" fill="${palette.accentAlt}"></circle>
      `;
    }

    const dots = [];
    for (let x = 0; x < 6; x += 1) {
      for (let y = 0; y < 5; y += 1) {
        dots.push(
          `<circle cx="${width - 250 + x * 28}" cy="${116 + y * 28}" r="4" fill="${palette.glow}"></circle>`
        );
      }
    }
    return dots.join("");
  }

  const WINDOW_BUTTONS = {
    dots: `
  <circle cx="72" cy="60" r="6" fill="#c59c72"></circle>
  <circle cx="96" cy="60" r="6" fill="#ddc1a1"></circle>
  <circle cx="120" cy="60" r="6" fill="#f4e4d1"></circle>`,
    minimal: `
  <rect x="52" y="52" width="24" height="16" rx="8" fill="#13392f"></rect>
  <rect x="84" y="52" width="24" height="16" rx="8" fill="#185041"></rect>
  <rect x="116" y="52" width="24" height="16" rx="8" fill="#1f6855"></rect>`,
    glow: `
  <circle cx="70" cy="60" r="8" fill="#8aa5ff"></circle>
  <circle cx="96" cy="60" r="8" fill="#afc2ff"></circle>
  <circle cx="122" cy="60" r="8" fill="#d8e2ff"></circle>`,
    traffic: `
  <circle cx="68" cy="60" r="8" fill="#ff5f57"></circle>
  <circle cx="94" cy="60" r="8" fill="#febc2e"></circle>
  <circle cx="120" cy="60" r="8" fill="#28c840"></circle>`,
  };

  function buildWindowButtons(provider) {
    return WINDOW_BUTTONS[provider.buttonMode] ?? WINDOW_BUTTONS.traffic;
  }

  function buildAmberDashboard(state, palette, provider, topLangs) {
    const statusText = getStatusText(state);
    const activityHandle = state.username ? `@${state.username}` : state.name;
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;
    const footerY = outerY + outerH - 54;
    const contentY = outerY + 36;
    const accent = state.accent || "#f08a61";
    const dim = "#9c928d";
    const cliTheme = `${provider.label}/${state.theme}`;

    // Proportional columns
    const leftX = 54;
    const leftW = Math.min(380, Math.round(outerW * 0.42));
    const leftH = Math.max(footerY - contentY - 8, 0);
    const rightX = leftX + leftW + 18;
    const rightW = Math.max(state.width - rightX - 54, 0);
    const rightY = contentY;

    // Profile image (circular)
    const showProfile = !!state.profileUri && !state.hideProfile;
    const PROFILE_R  = 32;
    const PROFILE_CX = leftX + 16 + PROFILE_R;
    const PROFILE_CY = contentY + 68;

    // Dynamic Y positions for left panel content
    const ROLE_Y   = showProfile ? contentY + 120 : contentY + 58;
    const TAG_Y    = showProfile ? contentY + 148 : contentY + 88;
    const CMD_Y    = showProfile ? contentY + 172 : contentY + 114;
    const STAT_CY  = showProfile ? contentY + 198 : contentY + 142;
    const STAT_TY  = showProfile ? contentY + 204 : contentY + 148;

    const showLPTag  = leftH >= (showProfile ? 155 : 100);
    const showLPCmd  = !state.hideCommand && leftH >= (showProfile ? 179 : 126);
    const showLPStat = leftH >= (showProfile ? 205 : 154);

    // Right panel - "about" section always visible
    const RP_DIV_Y  = rightY + 116;
    const rpDataTop = RP_DIV_Y + 20;
    const rpDataBot = Math.max(footerY - 12, rpDataTop);

    // Stats in right panel
    const statKeys = state.stats || STAT_KEYS;
    const statsH = statKeys.length * 18;
    const showStats = state.githubStats && (rpDataBot - rpDataTop) >= statsH + 16;
    const STATS_LABEL_Y = rpDataTop + 12;
    const STATS_Y = rpDataTop + 16;
    const statsEndY = showStats ? STATS_Y + statsH : rpDataTop;

    // Langs in right panel (below stats)
    const rpLangsTop = statsEndY + 14;
    const rpLangsAvail = rpDataBot - rpLangsTop - 16;
    const maxLangs = topLangs
      ? Math.min(topLangs.length, Math.max(0, Math.floor(rpLangsAvail / 18)))
      : 0;
    const showLangs = topLangs && showStats && maxLangs > 0;
    const langsToShow = showLangs ? topLangs.slice(0, maxLangs) : null;
    const LANGS_LABEL_Y = rpLangsTop + 12;
    const LANGS_Y = rpLangsTop + 16;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="#231f1d"></rect>
  <rect x="${outerX + 0.5}" y="${outerY + 0.5}" width="${outerW - 1}" height="${outerH - 1}" rx="13.5" stroke="rgba(255,255,255,0.05)"></rect>

  <rect x="${leftX}" y="${contentY}" width="${leftW}" height="${leftH}" rx="10" fill="rgba(255,255,255,0.04)"></rect>

  <text x="${leftX + 16}" y="${contentY + 20}" font-family="IBM Plex Mono, monospace" font-size="14" fill="#f6f2ef">About ${escapeXml(state.name)}</text>

  ${showProfile ? `<defs>
    <clipPath id="profile-clip-${escapeXml(state.username || "anon")}">
      <circle cx="${PROFILE_CX}" cy="${PROFILE_CY}" r="${PROFILE_R}"/>
    </clipPath>
  </defs>
  <circle cx="${PROFILE_CX}" cy="${PROFILE_CY}" r="${PROFILE_R + 2}" fill="rgba(255,255,255,0.08)"/>
  <image x="${PROFILE_CX - PROFILE_R}" y="${PROFILE_CY - PROFILE_R}" width="${PROFILE_R * 2}" height="${PROFILE_R * 2}" href="${escapeXml(state.profileUri)}" clip-path="url(#profile-clip-${escapeXml(state.username || "anon")})" preserveAspectRatio="xMidYMid slice"/>` : ""}

  <text x="${leftX + 16}" y="${ROLE_Y}" font-family="IBM Plex Mono, monospace" font-size="15" fill="${accent}">${escapeXml(truncateText(state.role, 30))}</text>
  ${showLPTag ? `<text x="${leftX + 16}" y="${TAG_Y}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#c5bfbb">${escapeXml(truncateText(state.tagline, 44))}</text>` : ""}
  ${showLPCmd ? `<text x="${leftX + 16}" y="${CMD_Y}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">$ ${escapeXml(truncateText(state.command, 30))}</text>` : ""}
  ${showLPStat ? `<circle cx="${leftX + 24}" cy="${STAT_CY}" r="5" fill="#7adf8d"></circle>
  <text x="${leftX + 38}" y="${STAT_TY}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(statusText, 38))}</text>` : ""}

  <text x="${rightX + 18}" y="${rightY + 20}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">about</text>
  <text x="${rightX + 18}" y="${rightY + 50}" font-family="IBM Plex Mono, monospace" font-size="15" fill="${accent}">${escapeXml(truncateText(state.role, 36))}</text>
  <text x="${rightX + 18}" y="${rightY + 76}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#c5bfbb">${escapeXml(truncateText(state.tagline, 52))}</text>
  <text x="${rightX + 18}" y="${rightY + 98}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(state.username ? `@${state.username}` : state.name)}</text>

  <rect x="${rightX}" y="${RP_DIV_Y}" width="${rightW}" height="1" fill="rgba(255,255,255,0.07)"></rect>

  ${showStats
    ? `<text x="${rightX + 18}" y="${STATS_LABEL_Y}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">github stats</text>
  ${buildStatBars(state.githubStats, rightX + 18, STATS_Y, rightW - 36, accent, dim, undefined, state.stats, state.barStyle)}
  ${showLangs || (state.langStyle === "icons" && state.langIconsUri && langsToShow && rpLangsAvail >= 28)
    ? `<rect x="${rightX}" y="${rpLangsTop - 2}" width="${rightW}" height="1" fill="rgba(255,255,255,0.07)"></rect>
  <text x="${rightX + 18}" y="${LANGS_LABEL_Y}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">top langs</text>
  ${state.langStyle === "icons" && state.langIconsUri && langsToShow
    ? buildLangIcons(state.langIconsUri, rightX + 18, LANGS_Y, rightW - 36, langsToShow.length, state.iconSize)
    : buildLangBars(langsToShow, rightX + 18, LANGS_Y, rightW - 36, accent, dim, undefined, state.barStyle)}`
    : ""}`
    : state.githubStats
      ? `<circle cx="${rightX + 26}" cy="${rpDataTop + 16}" r="5" fill="#7adf8d"></circle>
  <text x="${rightX + 40}" y="${rpDataTop + 22}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#f2efec">${escapeXml(truncateText(statusText, 52))}</text>`
      : `${state.hideCommand ? "" : `<text x="${rightX + 18}" y="${rpDataTop + 28}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#f2efec">$ ${escapeXml(truncateText(state.command, 40))}</text>`}
  <rect x="${rightX}" y="${rpDataTop + 46}" width="${rightW}" height="1" fill="rgba(255,255,255,0.07)"></rect>
  <text x="${rightX + 18}" y="${rpDataTop + 66}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">status</text>
  <circle cx="${rightX + 26}" cy="${rpDataTop + 88}" r="5" fill="#7adf8d"></circle>
  <text x="${rightX + 40}" y="${rpDataTop + 94}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#f2efec">${escapeXml(truncateText(statusText, 52))}</text>`}

  <line x1="${outerX}" y1="${footerY}" x2="${state.width - 28}" y2="${footerY}" stroke="rgba(255,255,255,0.1)"></line>`;
  }

  function buildObsidianWorkspace(state, palette, provider, topLangs) {
    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;
    const footerY = outerY + outerH - 54;

    const leftX = 52;
    const leftY = 128;
    const leftW = Math.min(260, Math.round(outerW * 0.27));
    const leftH = outerH - 68;

    const mainX = leftX + leftW + 18;
    const mainY = 128;
    const mainW = state.width - mainX - 52;

    // Proportional main + response heights
    const availH = outerH - 68;
    const mainH = Math.round(availH * 0.56);
    const responseY = mainY + mainH + 14;
    const responseH = Math.max(availH - mainH - 14, 60);

    // Scale content inside main panel relative to standard 174px height
    const mS = Math.min(mainH / 174, 1.35);
    const M_LABEL_Y = mainY + 24;
    const M_TAG_Y   = mainY + Math.round(64 * mS);
    const M_DIV_Y   = mainY + Math.round(88 * mS);
    const M_CMD_Y   = mainY + Math.round(122 * mS);
    const M_DOT_CY  = mainY + Math.round(148 * mS);
    const M_STA_TY  = mainY + Math.round(154 * mS);

    const accent = state.accent || "#74f0b8";
    const soft = "#173229";
    const ink = "#dbfff0";
    const dim = "#89b7a5";
    const model = `${provider.label}/${state.theme}`;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="#0f1613"></rect>

  <rect x="${leftX}" y="${leftY}" width="${leftW}" height="${leftH}" rx="10" fill="#101c17"></rect>
  <text x="${leftX + 18}" y="${leftY + 22}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">workspace</text>
  <text x="${leftX + 18}" y="${leftY + 62}" font-family="IBM Plex Mono, monospace" font-size="17" fill="${ink}">${escapeXml(state.name)}</text>
  <text x="${leftX + 18}" y="${leftY + 84}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(
    state.username ? `@${state.username}` : "personal workspace"
  )}</text>
  <text x="${leftX + 18}" y="${leftY + 130}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">role</text>
  <text x="${leftX + 18}" y="${leftY + 152}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(
    truncateText(state.role, 20)
  )}</text>
  <text x="${leftX + 18}" y="${leftY + 196}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">model</text>
  <text x="${leftX + 18}" y="${leftY + 218}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(model)}</text>

  <rect x="${mainX}" y="${mainY}" width="${mainW}" height="${mainH}" rx="10" fill="#111f19"></rect>
  <text x="${mainX + 22}" y="${M_LABEL_Y}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  <text x="${mainX + 22}" y="${M_TAG_Y}" font-family="Sora, Arial, sans-serif" font-size="22" font-weight="700" fill="${ink}">${escapeXml(
    truncateText(state.tagline, 36)
  )}</text>
  <rect x="${mainX + 22}" y="${M_DIV_Y}" width="${mainW - 44}" height="1" fill="rgba(116,240,184,0.12)"></rect>
  ${state.hideCommand ? "" : `<text x="${mainX + 22}" y="${M_CMD_Y}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${dim}">$ ${escapeXml(state.command)}</text>`}
  <circle cx="${mainX + 22}" cy="${M_DOT_CY}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${M_STA_TY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(
    truncateText(statusText, 48)
  )}</text>

  <rect x="${mainX}" y="${responseY}" width="${mainW}" height="${responseH}" rx="10" fill="#0e1915"></rect>
  <text x="${mainX + 22}" y="${responseY + 22}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">output</text>
  ${state.githubStats
    ? (topLangs
        ? (state.langStyle === "icons" && state.langIconsUri
            ? buildLangIcons(state.langIconsUri, mainX + 22, responseY + 34, mainW - 44, topLangs.length, state.iconSize)
            : buildLangBars(topLangs, mainX + 22, responseY + 34, mainW - 44, accent, dim, undefined, state.barStyle))
        : buildStatBars(state.githubStats, mainX + 22, responseY + 34, mainW - 44, accent, dim, undefined, state.stats, state.barStyle))
    : `<text x="${mainX + 22}" y="${responseY + 52}" font-family="Sora, Arial, sans-serif" font-size="15" font-weight="600" fill="${ink}">${escapeXml(truncateText(state.tagline, 38))}</text>
  <circle cx="${mainX + 22}" cy="${responseY + 76}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${responseY + 82}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(state.status, 44))}</text>`}

  <rect x="${outerX}" y="${footerY}" width="${outerW}" height="1" fill="rgba(116,240,184,0.08)"></rect>
  <circle cx="${outerX + 22}" cy="${footerY + 24}" r="5" fill="${accent}"></circle>
  <text x="${outerX + 36}" y="${footerY + 30}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(truncateText(state.status, 64))}</text>`;
  }

  function buildPrismCanvas(state, palette, provider, topLangs) {
    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;

    const cardX = 58;
    const cardY = outerY + 36;  // y = 132
    const cardW = state.width - 116;
    const cardH = Math.min(Math.round(outerH * 0.40), 190);

    const lowerY = cardY + cardH + 14;
    const lowerH = Math.min(Math.round(outerH * 0.30), 130);

    // Proportional lower panel widths
    const innerW = state.width - 116;
    const llW = Math.round(innerW * 0.345);
    const lmW = Math.round(innerW * 0.195);
    const lrW = innerW - llW - lmW - 28;  // remaining (2 gaps × 14)

    const llX = 58;
    const lmX = llX + llW + 14;
    const lrX = lmX + lmW + 14;

    // Scale top card content
    const cS = Math.min(cardH / 148, 1.35);
    const C_META_Y   = cardY + Math.round(26 * cS);
    const C_NAME_Y   = cardY + Math.round(72 * cS);
    const C_HANDLE_Y = cardY + Math.round(106 * cS);
    const C_TAG_Y    = cardY + Math.min(Math.round(136 * cS), cardH - 12);

    const accent = state.accent || "#94a8ff";
    const accentSoft = "#dce4ff";
    const ink = "#1b2450";
    const dim = "#6070a5";
    const model = `${provider.label}/${state.theme}`;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="rgba(239,243,255,0.9)"></rect>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="10" fill="rgba(255,255,255,0.85)"></rect>
  <text x="${cardX + 24}" y="${C_META_Y}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prism canvas  •  ${escapeXml(model)}</text>
  <text x="${cardX + 24}" y="${C_NAME_Y}" font-family="Sora, Arial, sans-serif" font-size="34" font-weight="700" fill="${ink}">${escapeXml(state.name)}</text>
  <text x="${cardX + 24}" y="${C_HANDLE_Y}" font-family="IBM Plex Mono, monospace" font-size="16" fill="${dim}">${escapeXml(state.username ? `@${state.username}` : state.role)}</text>
  <text x="${cardX + 24}" y="${C_TAG_Y}" font-family="Sora, Arial, sans-serif" font-size="15" fill="${dim}">${escapeXml(
    truncateText(state.tagline, 56)
  )}</text>

  <rect x="${llX}" y="${lowerY}" width="${llW}" height="${lowerH}" rx="10" fill="rgba(255,255,255,0.7)"></rect>
  <text x="${llX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${topLangs ? "github stats" : "quick facts"}</text>
  ${topLangs
    ? buildStatBars(state.githubStats, llX + 18, lowerY + 34, llW - 36, accent, dim, "rgba(0,0,0,0.06)", state.stats, state.barStyle)
    : `<text x="${llX + 18}" y="${lowerY + 56}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">avatar   ${escapeXml(state.avatar)}</text>
  <text x="${llX + 18}" y="${lowerY + 80}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(
    state.username ? `github  @${state.username}` : `pattern  ${state.pattern}`
  )}</text>`}

  <rect x="${lmX}" y="${lowerY}" width="${lmW}" height="${lowerH}" rx="10" fill="rgba(255,255,255,0.7)"></rect>
  <text x="${lmX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  ${state.hideCommand ? "" : `<text x="${lmX + 18}" y="${lowerY + 56}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(truncateText(state.command, 18))}</text>`}
  <text x="${lmX + 18}" y="${lowerY + 80}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">theme   ${escapeXml(state.theme)}</text>

  <rect x="${lrX}" y="${lowerY}" width="${lrW}" height="${lowerH}" rx="10" fill="rgba(255,255,255,0.7)"></rect>
  <text x="${lrX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${topLangs ? "top langs" : state.githubStats ? "github stats" : "status"}</text>
  ${topLangs
    ? (state.langStyle === "icons" && state.langIconsUri
        ? buildLangIcons(state.langIconsUri, lrX + 18, lowerY + 34, lrW - 36, topLangs.length, state.iconSize)
        : buildLangBars(topLangs, lrX + 18, lowerY + 34, lrW - 36, accent, dim, "rgba(0,0,0,0.06)", state.barStyle))
    : state.githubStats
      ? buildStatBars(state.githubStats, lrX + 18, lowerY + 34, lrW - 36, accent, dim, "rgba(0,0,0,0.06)", state.stats, state.barStyle)
      : `<circle cx="${lrX + 26}" cy="${lowerY + 58}" r="5" fill="#7f94ff"></circle>
  <text x="${lrX + 40}" y="${lowerY + 64}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(truncateText(statusText, 20))}</text>`}`;
  }

  function buildSvg(input) {
    const state = normalizeState(input);
    const rawPalette = themeMap[state.theme];
    const palette = state.accent ? { ...rawPalette, accent: state.accent } : rawPalette;
    const provider = providerMap[state.provider];
    const bodyTop = 72;
    const shellRadius = provider.shellRadius;
    const panelX = 28;
    const topBarFill = provider.topBarFill || palette.panelSoft;
    const topBarText = provider.topBarText || palette.dim;
    const effectiveTopLangs =
      state.showLangs !== "off" && state.githubStats && state.githubStats.topLangs
        ? state.githubStats.topLangs
            .filter((l) => !state.excludeLangs.includes(l.name.toLowerCase()))
            .slice(0, state.langCount)
        : null;

    if (state.provider === "amber") {
      return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="#373532"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="#4a4843"></rect>
  <circle cx="68" cy="60" r="7" fill="#ee8b62"></circle>
  <circle cx="92" cy="60" r="7" fill="#ffc75a"></circle>
  <circle cx="116" cy="60" r="7" fill="#6ecf59"></circle>
  ${buildAmberDashboard(state, palette, provider, effectiveTopLangs)}
</svg>`.trim();
    }

    if (state.provider === "obsidian") {
      return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="#09110d"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="#0f1f18"></rect>
  ${buildWindowButtons(provider)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>
  ${buildObsidianWorkspace(state, palette, provider, effectiveTopLangs)}
</svg>`.trim();
    }

    if (state.provider === "prism") {
      return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="#f5f7ff"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="#eef3ff"></rect>
  ${buildWindowButtons(provider)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>
  ${buildPrismCanvas(state, palette, provider, effectiveTopLangs)}
</svg>`.trim();
    }

    const PAD = 28;
    const BODY_Y = 128;          // content area starts here
    const FOOT_SEP = state.height - 76;  // footer separator line
    const FOOT_TY = state.height - 48;   // footer text baseline

    const contentX = state.hideAvatar ? PAD + 28 : 256;
    const contentW = state.width - contentX - PAD - 28;

    // Top content (fixed relative to BODY_Y)
    const LBL_Y  = BODY_Y + 16;   // "$ provider/theme"
    const NAME_Y = BODY_Y + 68;   // name
    const ROLE_Y = BODY_Y + 108;  // role or @username
    const TAG_Y  = BODY_Y + 144;  // tagline

    // Data zone: between tagline and footer separator
    const DATA_TOP = TAG_Y + 32;  // y ≈ 304
    const DATA_BOT = FOOT_SEP - 12;
    const dataH = Math.max(DATA_BOT - DATA_TOP, 0);

    // Stats: show if data zone has room for all selected stat rows
    const statCount = (state.stats || STAT_KEYS).length;
    const statsH = statCount * 18;
    const showStats = state.githubStats && dataH >= statsH;
    const STATS_Y = DATA_TOP;

    // Langs: fill remaining space after stats
    const LANGS_TOP = showStats ? DATA_TOP + statsH + 10 : DATA_TOP;
    const langsAvailH = DATA_BOT - LANGS_TOP;
    const maxLangs = effectiveTopLangs
      ? Math.min(effectiveTopLangs.length, Math.max(0, Math.floor(langsAvailH / 18)))
      : 0;
    const showLangs = maxLangs > 0;
    const langsToShow = showLangs ? effectiveTopLangs.slice(0, maxLangs) : null;

    return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="${palette.shell}"></rect>

  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="${topBarFill}"></rect>
  ${buildWindowButtons(provider)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>

  ${state.hideAvatar ? "" : `<rect x="56" y="128" width="152" height="152" rx="10" fill="${palette.panelSoft}"></rect>
  <text x="132" y="220" text-anchor="middle" font-family="Sora, Arial, sans-serif" font-size="52" font-weight="700" fill="${palette.accent}">${escapeXml(state.avatar)}</text>`}

  <text x="${contentX}" y="${LBL_Y}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${palette.dim}">$ ${provider.label}/${state.theme}</text>
  <text x="${contentX}" y="${NAME_Y}" font-family="Sora, Arial, sans-serif" font-size="44" font-weight="700" fill="${palette.title}">${escapeXml(state.name)}</text>
  <text x="${contentX}" y="${ROLE_Y}" font-family="IBM Plex Mono, monospace" font-size="18" fill="${palette.accent}">${escapeXml(
    state.username ? `@${state.username}` : state.role
  )}</text>
  <text x="${contentX}" y="${TAG_Y}" font-family="Sora, Arial, sans-serif" font-size="16" fill="${palette.text}">${escapeXml(state.tagline)}</text>

  ${showStats
    ? buildStatBars(state.githubStats, contentX, STATS_Y, contentW, palette.accent, palette.dim, undefined, state.stats, state.barStyle)
    : `<circle cx="${contentX + 8}" cy="${DATA_TOP + 8}" r="5" fill="${palette.success}"></circle>
  <text x="${contentX + 24}" y="${DATA_TOP + 14}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${palette.dim}">${escapeXml(getStatusText(state))}</text>`}

  ${showStats && (showLangs || (state.langStyle === "icons" && state.langIconsUri && effectiveTopLangs))
    ? `<rect x="${contentX}" y="${LANGS_TOP - 2}" width="${contentW}" height="1" fill="rgba(255,255,255,0.05)"></rect>
  ${state.langStyle === "icons" && state.langIconsUri && effectiveTopLangs
    ? buildLangIcons(state.langIconsUri, contentX, LANGS_TOP, contentW, effectiveTopLangs.length, state.iconSize)
    : buildLangBars(langsToShow, contentX, LANGS_TOP, contentW, palette.accent, palette.dim, undefined, state.barStyle)}`
    : ""}

  <rect x="28" y="${FOOT_SEP}" width="${state.width - 56}" height="1" fill="rgba(255,255,255,0.08)"></rect>
  <circle cx="56" cy="${state.height - 54}" r="5" fill="${palette.success}"></circle>
  <text x="72" y="${FOOT_TY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">${escapeXml(state.githubStats ? getStatusText(state) : state.status)}</text>
  ${state.hideCommand ? "" : `<text x="256" y="${FOOT_TY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">$ ${escapeXml(state.command)}</text>`}
</svg>`.trim();
  }

  function buildApiUrl(input, baseUrl) {
    const state = normalizeState(input);
    return `${baseUrl}?${serializeState(state).toString()}`;
  }

  return {
    defaults,
    presets,
    providerMap,
    themeMap,
    LANG_ICON_MAP,
    normalizeState,
    serializeState,
    buildSvg,
    buildApiUrl,
    getStatusText,
  };
});

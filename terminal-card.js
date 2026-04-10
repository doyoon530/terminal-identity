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
      frameTone: null,
      badgeFill: "rgba(255,255,255,0.06)",
      badgeText: null,
      shellOverlay: null,
    },
    claude: {
      label: "claude",
      windowTitle: "claude session",
      shellRadius: 30,
      topBarFill: "#f2e7da",
      topBarText: "#614730",
      buttonMode: "dots",
      frameTone: "rgba(178, 143, 108, 0.16)",
      badgeFill: "rgba(123, 90, 61, 0.16)",
      badgeText: "#8c6949",
      shellOverlay: "rgba(255, 245, 232, 0.04)",
    },
    gpt: {
      label: "gpt",
      windowTitle: "gpt workspace",
      shellRadius: 22,
      topBarFill: "#0f1d18",
      topBarText: "#bff4d8",
      buttonMode: "minimal",
      frameTone: "rgba(94, 234, 166, 0.14)",
      badgeFill: "rgba(94, 234, 166, 0.12)",
      badgeText: "#9de9c6",
      shellOverlay: "rgba(16, 185, 129, 0.04)",
    },
    gemini: {
      label: "gemini",
      windowTitle: "gemini canvas",
      shellRadius: 34,
      topBarFill: "#ecf2ff",
      topBarText: "#57678e",
      buttonMode: "glow",
      frameTone: "rgba(135, 158, 255, 0.18)",
      badgeFill: "rgba(122, 147, 255, 0.12)",
      badgeText: "#b7c6ff",
      shellOverlay: "rgba(122, 147, 255, 0.05)",
    },
  };

  const defaults = {
    name: "ggam",
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
        provider: "gpt",
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
        provider: "claude",
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
        provider: "gemini",
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
        provider: "claude",
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
        provider: "gpt",
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
        provider: "gemini",
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
        provider: "claude",
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

    return {
      username: String(stats.username || "").slice(0, 39),
      repos: safeNumber(stats.repos, 0, 0, 100000),
      followers: safeNumber(stats.followers, 0, 0, 100000000),
      stars: safeNumber(stats.stars, 0, 0, 100000000),
      forks: safeNumber(stats.forks, 0, 0, 100000000),
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

  function getIdentityHandle(state) {
    if (state.username) {
      return `@${state.username}`;
    }

    return state.role;
  }

  function buildStatBars(stats, x, y, trackWidth, accentColor, dimColor, trackBg) {
    const bg = trackBg || "rgba(255,255,255,0.08)";
    const items = [
      { label: "repos",     value: stats.repos },
      { label: "stars",     value: stats.stars },
      { label: "forks",     value: stats.forks },
      { label: "followers", value: stats.followers },
    ];
    const maxVal = Math.max(...items.map((s) => s.value), 1);
    const labelW = 74;
    const valW = 42;
    const barTrack = Math.max(trackWidth - labelW - valW, 40);
    const rowH = 18;
    const barH = 3;

    return items
      .map((item, i) => {
        const filled = Math.max(2, Math.round((item.value / maxVal) * barTrack));
        const rowY = y + i * rowH;
        return [
          `<text x="${x}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${item.label}</text>`,
          `<rect x="${x + labelW}" y="${rowY + 5}" width="${barTrack}" height="${barH}" rx="1" fill="${bg}"></rect>`,
          `<rect x="${x + labelW}" y="${rowY + 5}" width="${filled}" height="${barH}" rx="1" fill="${accentColor}"></rect>`,
          `<text x="${x + labelW + barTrack + 8}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${formatCompactStat(item.value)}</text>`,
        ].join("\n  ");
      })
      .join("\n  ");
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
    };
  }

  function serializeState(state) {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (key === "provider") {
        return;
      }
      if (key === "githubStats") {
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

  function buildWindowButtons(provider) {
    if (provider.buttonMode === "dots") {
      return `
  <circle cx="72" cy="60" r="6" fill="#c59c72"></circle>
  <circle cx="96" cy="60" r="6" fill="#ddc1a1"></circle>
  <circle cx="120" cy="60" r="6" fill="#f4e4d1"></circle>`;
    }

    if (provider.buttonMode === "minimal") {
      return `
  <rect x="52" y="52" width="24" height="16" rx="8" fill="#13392f"></rect>
  <rect x="84" y="52" width="24" height="16" rx="8" fill="#185041"></rect>
  <rect x="116" y="52" width="24" height="16" rx="8" fill="#1f6855"></rect>`;
    }

    if (provider.buttonMode === "glow") {
      return `
  <circle cx="70" cy="60" r="8" fill="#8aa5ff"></circle>
  <circle cx="96" cy="60" r="8" fill="#afc2ff"></circle>
  <circle cx="122" cy="60" r="8" fill="#d8e2ff"></circle>`;
    }

    return `
  <circle cx="68" cy="60" r="8" fill="#ff5f57"></circle>
  <circle cx="94" cy="60" r="8" fill="#febc2e"></circle>
  <circle cx="120" cy="60" r="8" fill="#28c840"></circle>`;
  }

  function buildClaudeDashboard(state, palette, provider) {
    const statusText = getStatusText(state);
    const activityHandle = state.username ? `@${state.username}` : state.name;
    const outerX = 28;
    const outerY = 96;
    const outerWidth = state.width - 56;
    const outerHeight = state.height - 124;
    const leftX = 54;
    const leftY = 132;
    const leftWidth = 370;
    const leftHeight = 222;
    const rightX = 446;
    const rightY = 132;
    const rightWidth = state.width - rightX - 54;
    const footerY = state.height - 142;
    const accent = "#f08a61";
    const dim = "#9c928d";
    const promptY = state.height - 82;
    const cliTheme = `${provider.label}/${state.theme}`;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerWidth}" height="${outerHeight}" rx="14" fill="#231f1d"></rect>
  <rect x="${outerX + 0.5}" y="${outerY + 0.5}" width="${outerWidth - 1}" height="${outerHeight - 1}" rx="13.5" stroke="rgba(255,255,255,0.05)"></rect>

  <rect x="${leftX}" y="${leftY}" width="${leftWidth}" height="${leftHeight}" rx="10" fill="rgba(255,255,255,0.04)"></rect>

  <text x="${leftX + 16}" y="${leftY + 20}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">$ ${escapeXml(cliTheme)}</text>
  <text x="${leftX + 16}" y="${leftY + 60}" font-family="IBM Plex Mono, monospace" font-size="22" fill="#f6f2ef">Welcome back, ${escapeXml(state.name)}!</text>
  <text x="${leftX + 16}" y="${leftY + 96}" font-family="IBM Plex Mono, monospace" font-size="15" fill="${accent}">${escapeXml(truncateText(state.role, 30))}</text>
  <text x="${leftX + 16}" y="${leftY + 128}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#c5bfbb">${escapeXml(truncateText(state.tagline, 44))}</text>
  <text x="${leftX + 16}" y="${leftY + 162}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">$ ${escapeXml(truncateText(state.command, 30))}</text>
  <circle cx="${leftX + 24}" cy="${leftY + 196}" r="5" fill="#7adf8d"></circle>
  <text x="${leftX + 38}" y="${leftY + 202}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(statusText, 38))}</text>

  <text x="${rightX + 18}" y="${rightY + 20}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">about</text>
  <text x="${rightX + 18}" y="${rightY + 50}" font-family="IBM Plex Mono, monospace" font-size="15" fill="${accent}">${escapeXml(truncateText(state.role, 36))}</text>
  <text x="${rightX + 18}" y="${rightY + 76}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#c5bfbb">${escapeXml(truncateText(state.tagline, 52))}</text>
  <text x="${rightX + 18}" y="${rightY + 98}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(state.username ? `@${state.username}` : state.name)}</text>

  <rect x="${rightX}" y="${rightY + 116}" width="${rightWidth}" height="1" fill="rgba(255,255,255,0.07)"></rect>

  <text x="${rightX + 18}" y="${rightY + 136}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">run</text>
  <text x="${rightX + 18}" y="${rightY + 160}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#f2efec">$ ${escapeXml(truncateText(state.command, 40))}</text>

  <rect x="${rightX}" y="${rightY + 178}" width="${rightWidth}" height="1" fill="rgba(255,255,255,0.07)"></rect>

  <text x="${rightX + 18}" y="${rightY + 198}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">status</text>
  <circle cx="${rightX + 26}" cy="${rightY + 220}" r="5" fill="#7adf8d"></circle>
  <text x="${rightX + 40}" y="${rightY + 226}" font-family="IBM Plex Mono, monospace" font-size="13" fill="#f2efec">${escapeXml(truncateText(statusText, 52))}</text>

  <line x1="${outerX}" y1="${footerY}" x2="${state.width - 28}" y2="${footerY}" stroke="rgba(255,255,255,0.1)"></line>
  <text x="${outerX + 16}" y="${promptY}" font-family="IBM Plex Mono, monospace" font-size="16" fill="${dim}">&gt;</text>
  <rect x="${outerX + 32}" y="${promptY - 16}" width="10" height="24" fill="#f2efec" opacity="0.6"></rect>
  <text x="${outerX + 50}" y="${promptY}" font-family="IBM Plex Mono, monospace" font-size="15" fill="${dim}">Try \"edit &lt;filepath&gt; to ...\"</text>`;
  }

  function buildGptWorkspace(state, palette, provider) {
    const statusText = getStatusText(state);
    const identityHandle = getIdentityHandle(state);
    const outerX = 28;
    const outerY = 96;
    const outerWidth = state.width - 56;
    const outerHeight = state.height - 124;
    const leftX = 52;
    const leftY = 128;
    const leftWidth = 240;
    const leftHeight = 268;
    const mainX = 316;
    const mainY = 128;
    const mainWidth = state.width - mainX - 52;
    const mainHeight = 174;
    const responseY = mainY + mainHeight + 18;
    const responseHeight = 98;
    const footerY = 422;
    const accent = "#74f0b8";
    const soft = "#173229";
    const ink = "#dbfff0";
    const dim = "#89b7a5";
    const model = `${provider.label}/${state.theme}`;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerWidth}" height="${outerHeight}" rx="14" fill="#0f1613"></rect>

  <rect x="${leftX}" y="${leftY}" width="${leftWidth}" height="${leftHeight}" rx="10" fill="#101c17"></rect>
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

  <rect x="${mainX}" y="${mainY}" width="${mainWidth}" height="${mainHeight}" rx="10" fill="#111f19"></rect>
  <text x="${mainX + 22}" y="${mainY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  <text x="${mainX + 22}" y="${mainY + 64}" font-family="Sora, Arial, sans-serif" font-size="22" font-weight="700" fill="${ink}">${escapeXml(
    truncateText(state.tagline, 36)
  )}</text>
  <rect x="${mainX + 22}" y="${mainY + 88}" width="${mainWidth - 44}" height="1" fill="rgba(116,240,184,0.12)"></rect>
  <text x="${mainX + 22}" y="${mainY + 122}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${dim}">$ ${escapeXml(state.command)}</text>
  <circle cx="${mainX + 22}" cy="${mainY + 152}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${mainY + 158}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(
    truncateText(statusText, 48)
  )}</text>

  <rect x="${mainX}" y="${responseY}" width="${mainWidth}" height="${responseHeight}" rx="10" fill="#0e1915"></rect>
  <text x="${mainX + 22}" y="${responseY + 22}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">output</text>
  ${state.githubStats
    ? buildStatBars(state.githubStats, mainX + 22, responseY + 34, mainWidth - 44, accent, dim)
    : `<text x="${mainX + 22}" y="${responseY + 52}" font-family="Sora, Arial, sans-serif" font-size="15" font-weight="600" fill="${ink}">${escapeXml(truncateText(state.tagline, 38))}</text>
  <circle cx="${mainX + 22}" cy="${responseY + 76}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${responseY + 82}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(state.status, 44))}</text>`}

  <rect x="${outerX}" y="${outerY + outerHeight - 54}" width="${outerWidth}" height="1" fill="rgba(116,240,184,0.08)"></rect>
  <circle cx="${outerX + 22}" cy="${outerY + outerHeight - 30}" r="5" fill="${accent}"></circle>
  <text x="${outerX + 36}" y="${outerY + outerHeight - 24}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(truncateText(state.status, 64))}</text>`;
  }

  function buildGeminiCanvas(state, palette, provider) {
    const statusText = getStatusText(state);
    const identityHandle = getIdentityHandle(state);
    const outerX = 28;
    const outerY = 96;
    const outerWidth = state.width - 56;
    const outerHeight = state.height - 124;
    const cardX = 58;
    const cardY = 132;
    const cardWidth = state.width - 116;
    const cardHeight = 148;
    const lowerLeftX = 58;
    const lowerLeftY = 304;
    const lowerLeftWidth = 286;
    const lowerLeftHeight = 110;
    const lowerMidX = 364;
    const lowerMidY = 304;
    const lowerMidWidth = 162;
    const lowerMidHeight = 110;
    const lowerRightX = lowerMidX + lowerMidWidth + 18;
    const lowerRightY = 304;
    const lowerRightWidth = state.width - lowerRightX - 58;
    const lowerRightHeight = 110;
    const accent = "#94a8ff";
    const accentSoft = "#dce4ff";
    const ink = "#1b2450";
    const dim = "#6070a5";
    const model = `${provider.label}/${state.theme}`;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerWidth}" height="${outerHeight}" rx="14" fill="rgba(239,243,255,0.9)"></rect>
  <rect x="${cardX}" y="${cardY}" width="${cardWidth}" height="${cardHeight}" rx="10" fill="rgba(255,255,255,0.85)"></rect>
  <text x="${cardX + 24}" y="${cardY + 26}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">gemini canvas  •  ${escapeXml(model)}</text>
  <text x="${cardX + 24}" y="${cardY + 72}" font-family="Sora, Arial, sans-serif" font-size="34" font-weight="700" fill="${ink}">${escapeXml(state.name)}</text>
  <text x="${cardX + 24}" y="${cardY + 106}" font-family="IBM Plex Mono, monospace" font-size="16" fill="${dim}">${escapeXml(identityHandle)}</text>
  <text x="${cardX + 24}" y="${cardY + 136}" font-family="Sora, Arial, sans-serif" font-size="15" fill="${dim}">${escapeXml(
    truncateText(state.tagline, 56)
  )}</text>

  <rect x="${lowerLeftX}" y="${lowerLeftY}" width="${lowerLeftWidth}" height="${lowerLeftHeight}" rx="10" fill="rgba(255,255,255,0.7)"></rect>
  <text x="${lowerLeftX + 18}" y="${lowerLeftY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">quick facts</text>
  <text x="${lowerLeftX + 18}" y="${lowerLeftY + 56}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">avatar   ${escapeXml(state.avatar)}</text>
  <text x="${lowerLeftX + 18}" y="${lowerLeftY + 80}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(
    state.username ? `github  @${state.username}` : `pattern  ${state.pattern}`
  )}</text>

  <rect x="${lowerMidX}" y="${lowerMidY}" width="${lowerMidWidth}" height="${lowerMidHeight}" rx="10" fill="rgba(255,255,255,0.7)"></rect>
  <text x="${lowerMidX + 18}" y="${lowerMidY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  <text x="${lowerMidX + 18}" y="${lowerMidY + 56}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(
    truncateText(state.command, 18)
  )}</text>
  <text x="${lowerMidX + 18}" y="${lowerMidY + 80}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">theme   ${escapeXml(state.theme)}</text>

  <rect x="${lowerRightX}" y="${lowerRightY}" width="${lowerRightWidth}" height="${lowerRightHeight}" rx="10" fill="rgba(255,255,255,0.7)"></rect>
  <text x="${lowerRightX + 18}" y="${lowerRightY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${state.githubStats ? "github stats" : "status"}</text>
  ${state.githubStats
    ? buildStatBars(state.githubStats, lowerRightX + 18, lowerRightY + 34, lowerRightWidth - 36, accent, dim, "rgba(0,0,0,0.06)")
    : `<circle cx="${lowerRightX + 26}" cy="${lowerRightY + 58}" r="5" fill="#7f94ff"></circle>
  <text x="${lowerRightX + 40}" y="${lowerRightY + 64}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(truncateText(statusText, 20))}</text>`}`;
  }

  function buildSvg(input) {
    const state = normalizeState(input);
    const palette = themeMap[state.theme];
    const provider = providerMap[state.provider];
    const bodyTop = 72;
    const shellRadius = provider.shellRadius;
    const panelX = 28;
    const topBarFill = provider.topBarFill || palette.panelSoft;
    const topBarText = provider.topBarText || palette.dim;

    if (state.provider === "claude") {
      return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="#373532"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="#4a4843"></rect>
  <circle cx="68" cy="60" r="7" fill="#ee8b62"></circle>
  <circle cx="92" cy="60" r="7" fill="#ffc75a"></circle>
  <circle cx="116" cy="60" r="7" fill="#6ecf59"></circle>
  ${buildClaudeDashboard(state, palette, provider)}
</svg>`.trim();
    }

    if (state.provider === "gpt") {
      return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="#09110d"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="#0f1f18"></rect>
  ${buildWindowButtons(provider)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>
  ${buildGptWorkspace(state, palette, provider)}
</svg>`.trim();
    }

    if (state.provider === "gemini") {
      return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="#f5f7ff"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="#eef3ff"></rect>
  ${buildWindowButtons(provider)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>
  ${buildGeminiCanvas(state, palette, provider)}
</svg>`.trim();
    }

    return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="${palette.shell}"></rect>

  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="${topBarFill}"></rect>
  ${buildWindowButtons(provider)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>

  <rect x="56" y="128" width="152" height="152" rx="10" fill="${palette.panelSoft}"></rect>
  <text x="132" y="220" text-anchor="middle" font-family="Sora, Arial, sans-serif" font-size="52" font-weight="700" fill="${palette.accent}">${escapeXml(state.avatar)}</text>

  <text x="256" y="144" font-family="IBM Plex Mono, monospace" font-size="12" fill="${palette.dim}">$ ${provider.label}/${state.theme}</text>
  <text x="256" y="196" font-family="Sora, Arial, sans-serif" font-size="44" font-weight="700" fill="${palette.title}">${escapeXml(state.name)}</text>
  <text x="256" y="236" font-family="IBM Plex Mono, monospace" font-size="18" fill="${palette.accent}">${escapeXml(
    state.username ? `@${state.username}` : state.role
  )}</text>
  <text x="256" y="272" font-family="Sora, Arial, sans-serif" font-size="16" fill="${palette.text}">${escapeXml(state.tagline)}</text>

  ${state.githubStats && state.height >= 460
    ? buildStatBars(state.githubStats, 256, 302, state.width - 256 - 56, palette.accent, palette.dim)
    : `<circle cx="264" cy="310" r="5" fill="${palette.success}"></circle>
  <text x="280" y="316" font-family="IBM Plex Mono, monospace" font-size="14" fill="${palette.dim}">${escapeXml(getStatusText(state))}</text>`}

  <rect x="28" y="${state.height - 76}" width="${state.width - 56}" height="1" fill="rgba(255,255,255,0.08)"></rect>
  <circle cx="56" cy="${state.height - 54}" r="5" fill="${palette.success}"></circle>
  <text x="72" y="${state.height - 48}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">${escapeXml(state.githubStats ? getStatusText(state) : state.status)}</text>
  <text x="256" y="${state.height - 48}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">$ ${escapeXml(state.command)}</text>
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
    normalizeState,
    serializeState,
    buildSvg,
    buildApiUrl,
    getStatusText,
  };
});

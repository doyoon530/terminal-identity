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
    };
  }

  function serializeState(state) {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (key === "provider") {
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

  function buildSvg(input) {
    const state = normalizeState(input);
    const palette = themeMap[state.theme];
    const provider = providerMap[state.provider];
    const bodyTop = 72;
    const shellRadius = provider.shellRadius;
    const panelX = 28;
    const panelY = 96;
    const panelWidth = state.width - 56;
    const panelHeight = state.height - 124;
    const topBarFill = provider.topBarFill || palette.panelSoft;
    const topBarText = provider.topBarText || palette.dim;
    const badgeText = provider.badgeText || palette.accentAlt;
    const frameStroke = provider.frameTone || palette.line;

    return `
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <defs>
    <linearGradient id="bgGradient" x1="0" y1="0" x2="${state.width}" y2="${state.height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${palette.shell}"></stop>
      <stop offset="1" stop-color="${palette.panel}"></stop>
    </linearGradient>
    <linearGradient id="avatarGradient" x1="100" y1="160" x2="280" y2="320" gradientUnits="userSpaceOnUse">
      <stop stop-color="${palette.accent}"></stop>
      <stop offset="1" stop-color="${palette.accentAlt}"></stop>
    </linearGradient>
    <filter id="shellGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="${palette.glow}"></feDropShadow>
    </filter>
  </defs>

  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="url(#bgGradient)"></rect>
  <rect x="0.5" y="0.5" width="${state.width - 1}" height="${state.height - 1}" rx="${shellRadius - 0.5}" stroke="${frameStroke}"></rect>
  ${
    provider.shellOverlay
      ? `<rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="${provider.shellOverlay}"></rect>`
      : ""
  }

  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="18" fill="${topBarFill}" filter="url(#shellGlow)"></rect>
  ${buildWindowButtons(provider)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="18" fill="${topBarText}">${provider.windowTitle}</text>

  <rect x="${panelX}" y="${panelY}" width="${panelWidth}" height="${panelHeight}" rx="24" fill="${palette.panelSoft}"></rect>
  <rect x="${panelX + 0.5}" y="${panelY + 0.5}" width="${panelWidth - 1}" height="${panelHeight - 1}" rx="23.5" stroke="${frameStroke}"></rect>

  <g opacity="0.95">
    ${buildPattern(state.pattern, state.width, state.height, palette)}
  </g>

  <rect x="68" y="152" width="168" height="168" rx="34" fill="url(#avatarGradient)"></rect>
  <rect x="68.5" y="152.5" width="167" height="167" rx="33.5" stroke="rgba(255,255,255,0.16)"></rect>
  <text x="152" y="252" text-anchor="middle" font-family="Sora, Arial, sans-serif" font-size="56" font-weight="700" fill="${palette.title}">${escapeXml(state.avatar)}</text>

  <text x="280" y="178" font-family="IBM Plex Mono, monospace" font-size="18" fill="${palette.accent}">$ ${provider.label}/${state.theme}</text>
  <text x="280" y="226" font-family="Sora, Arial, sans-serif" font-size="48" font-weight="700" fill="${palette.title}">${escapeXml(state.name)}</text>
  <text x="280" y="266" font-family="IBM Plex Mono, monospace" font-size="24" fill="${palette.accentAlt}">${escapeXml(state.role)}</text>
  <text x="280" y="314" font-family="Sora, Arial, sans-serif" font-size="24" fill="${palette.text}">${escapeXml(state.tagline)}</text>

  <rect x="280" y="350" width="${Math.max(340, Math.min(560, state.status.length * 8 + 96))}" height="46" rx="23" fill="rgba(255,255,255,0.06)"></rect>
  <circle cx="306" cy="373" r="7" fill="${palette.success}"></circle>
  <text x="324" y="380" font-family="IBM Plex Mono, monospace" font-size="18" fill="${palette.text}">${escapeXml(state.status)}</text>

  <text x="68" y="${state.height - 102}" font-family="IBM Plex Mono, monospace" font-size="18" fill="${palette.dim}">$ ${escapeXml(state.command)}</text>
  <text x="68" y="${state.height - 66}" font-family="IBM Plex Mono, monospace" font-size="18" fill="${palette.dim}"># README-ready SVG card generated on demand</text>

  <rect x="${state.width - 236}" y="${state.height - 118}" width="168" height="44" rx="22" fill="${provider.badgeFill}"></rect>
  <text x="${state.width - 152}" y="${state.height - 90}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="16" fill="${badgeText}">${escapeXml(provider.label + "/" + state.theme)}</text>
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
  };
});

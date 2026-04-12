(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory({
      buildClassicLayout: require("./lib/terminal/layouts/classic"),
      buildAmberDashboard: require("./lib/terminal/layouts/amber"),
      buildObsidianWorkspace: require("./lib/terminal/layouts/obsidian"),
      buildPrismCanvas: require("./lib/terminal/layouts/prism"),
    });
    return;
  }

  root.TerminalIdentity = factory(root.TerminalIdentityLayouts || {});
})(typeof globalThis !== "undefined" ? globalThis : window, function (layoutModules) {
  const {
    buildClassicLayout: externalBuildClassicLayout,
    buildAmberDashboard: externalBuildAmberDashboard,
    buildObsidianWorkspace: externalBuildObsidianWorkspace,
    buildPrismCanvas: externalBuildPrismCanvas,
  } = layoutModules;
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
  const SVG_FONT_SANS = "'Sora', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Segoe UI', Arial, sans-serif";
  const SVG_FONT_MONO = "'IBM Plex Mono', 'Nanum Gothic Coding', D2Coding, Consolas, 'Apple SD Gothic Neo', 'Malgun Gothic', 'Courier New', monospace";

  // Maps GitHub language names -> skillicons.dev keys
  // MIT License from tandpfun - https://github.com/tandpfun/skill-icons
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
    username: "doyoon530",
    role: "frontend engineer",
    tagline: "Building tiny tools with taste.",
    status: "available for cool internet projects",
    command: "npx terminal-identity",
    provider: "amber",
    theme: "solar",
    avatar: "GG",
    pattern: "grid",
    width: 980,
    height: "auto",
    accent: null,
    showLangs: "auto",
    showContribs: "off",
    langCount: 4,
    hideAvatar: false,
    hideCommand: false,
    motion: "off",
    contribTheme: "moss",
    contribRange: "16w",
    contribMode: "compact",
    stats: STAT_KEYS,
    excludeLangs: [],
    bio: "",
  };

  const CONTRIBUTION_RANGE_LIMITS = {
    "4w": 4,
    "8w": 8,
    "12w": 12,
    "16w": 16,
    "24w": 24,
    "26w": 26,
    "3m": 13,
    "6m": 26,
    "9m": 39,
    "39w": 39,
    "1y": 53,
  };
  const CONTRIBUTION_RANGE_LABELS = {
    "4w": "last 4 weeks",
    "8w": "last 8 weeks",
    "12w": "last 12 weeks",
    "16w": "last 16 weeks",
    "24w": "last 24 weeks",
    "26w": "last 26 weeks",
    "3m": "last 3 months",
    "6m": "last 6 months",
    "9m": "last 9 months",
    "39w": "last 39 weeks",
    "1y": "this year",
  };
  const CONTRIBUTION_RANGES = Object.keys(CONTRIBUTION_RANGE_LIMITS);
  const CONTRIBUTION_THEMES = ["cat_jump", "popcat", "capybara_onsen", "moon", "star", "orbit", "signal", "citylight", "petal", "moss", "firefly", "constellation"];
  const CONTRIBUTION_THEME_ALIASES = {
    cat: "cat_jump",
    catjump: "cat_jump",
    "cat-jump": "cat_jump",
    pop_cat: "popcat",
    "pop-cat": "popcat",
    capybara: "capybara_onsen",
    "capybara-onsen": "capybara_onsen",
    capybaraonsen: "capybara_onsen",
    onsen: "capybara_onsen",
  };
  const CAPYBARA_ONSEN_CONTRIB_SPRITE_URI = "data:image/png;base64,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";
  const CAT_CONTRIB_TILE_URIS = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACwUlEQVR42u1Xy27bMBCcIeVDTgaKXFKJIvz/H9XaknLKJ4icHiTalPWwHCTtpQQMmQa1O5ydfRj4vx4vjZ9/C8LCfAsIs5+G7yFhFwBjzNpBnU4nGbONjrSrYdwFQBJKX89+ds6h73s452Gt1dw4dTqdVNfVqu3iGbpIKynwtickQRLeyp8wkEgL6YYlhPBFGpAgBeTOATM+AYNhLwkxxsk58QsAJEfTfXIUryCTZm4rwoAgPwmgwBDbnEoCqqpqZoYLXqQUpk8C6BHgfI2iKJAFf3hYs8lSYoDk50VIEohCUETlHPJ0UogznQzhMJM7SgKJRRYeMaC6rq9AjBlEt3Wje5NJK3XtsVQLzHYBwoieE5Hdf7+nfJo5urKwWwOj8FSWbuIsGRRvjMwc0mSOgRjjBlhgjUs552ZUiwC1vk8glkJ0uVwWfZq9eQ8MzvLbUNvvpbNd18EeisULFwsGpJXSNbudGTJk6VwCQxIxBigss22WXvbebZbk+z6QakICl2fKVhFaY2BZ7UYwWaORNFwpObqrCXOxGQmRjxi4eo5xqGBt+46uadGc21sWSDv6xk393nsIcVcWqK5rkETTNKmrMW/Hr68/8PLy8tw8J6Ft3xOo5SwgqaIoQA7t9N75YCjw4+MDXddNjOftd4kNWgPnSpCcDS7FZOopy5H2M2jNYlwlMcaolBF5VmS5fi1UzjloBFiWb2iabi5CSyPna0hC3/dD7MLWGDH0fBFAFJqmAQyTgJkxo8vlghgjvPcgiyzVh3MGAIIiQgiIMQ4NZ0eHlJQXIiJqVkBGtggC5/MZIQR47+G9R1EUykPA9r0TBVhrITzEMDAgQYx7ZnqSVNd1qKpqLE5xsxesruPxqOPxOGGjPXcI6B/aop2OlU9PxQBwOBxgDEBaRAjnX79RwO5Lx/D8hVdtkRS+6e/aX11/AItnqJQ8+eYsAAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADHElEQVR42u1XTW/bRhSceUtLTVskAQLKgimSaU+55lz02FOB/nL/hCawZcl109hoi34gsLjTw4oSlyIpqkBToOheJEjLfbMz8z4I/L+OL/2nQdiYTSTxrwLof5oqy1IjGOrdMwqAJLzMvmgfoDzPQQFFseiTSXmeqyzL3kjJWAk2bnPwGwWIAGQoigKSBCPgtd9DAvAA2IlxtATebw5YqT/r7zUokjCwsa8/zGgGqkqjzCkJJAMze/i9NrHjLnUiCedcM7C2lO8ChiADoMS/B2DyyRmyLAO8YKCa9DeDkQ7p+QxfvnoVBZaE119/BVg3gMEET+B09mSCNE3hvYfZMN7ZbIbLy0sWRRHxvVwuCUCEQfAczUBFjzRNG26ODdhF+Tfffas2AwBQliVopzEgksjzfBtIUI+Oex8Mr+VyeRAz6TYGlZ7PMJ2e7Q6uL92+fR3czOC972Tp5FL89PkzTCYTABbRGBeXOOVU+cNCtf2PJFarFboslAw1HxGtgoLoxvAK2e0F9aTf7Xq9ZcagDg2TjuCis4B+CJy0U7NP/wZbrOvEUQCLiwx0W668dhWt1rttui4DRiBP9oBtdVUVldPaC7WmMdVVrLsUGXKoXbPt/sXLIlQ9MyTm8P3bN7vD8zzvZOKQBR9S1kJT+un+Pf747XceleDTzz8DALx79x4fPvwZmYak1us1siwLAZ0BlTo9QLpwaQGCUD1uahbYKwFJubMElIcZDhzrvWdVVdt0Cl2hWZqbejcZIYn5fA4DQVK9DCwWC5gZlqsbtMp1dDkpbkj7dkvc3KxBEh4VKGA+nyNJkiBfWeD29haPj4+HAF68SFV3K0mABhAwvulqtYJEmHlAgFegWQDu7u5UF7bnT58Fys3k/f78Ot8CRQKoY5ORDyAtFKNQqDy9D4+3ChEl8deff4GZ4eLiAlmWRVIkAHB/f8+Hh4ea2sGuQmewxAFe8BQq+TFDLa+urjSbn2M6ncI5h81mE3vgWODdJLTI4TcVJB2dD9ogfvzhTu30T3DCioZPEtfX16e+SfCkiaiPhRagf+616WOsvwA0M6YIqCkAPQAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADMklEQVR42u1XTW/sRBCs6tnkCXhIcEB6JPY4G4kr/4Gfyx95B+4cOLFr7564AAeQWE8Xh/HXOt6NQ0C50JKVGa2np6a7qsYB/o/roe55uyDDm4P4TwHYP68MFWMhkivAmV4FoKrKJ1UpigJkQFVVWKqQIbeuqiptt9XF3Jvnjwq4D63gWIG8p7sjxjiAEAFJoPIYLojpFQAEkFwiJ6SFyrpAI9ihFQFbWP+iFpCEmZ3N+81JAkaIeUwS8BGYpL6CLwdguBky+ZhFXcmHDSjkkk9BrYzrLbATYhGR0tjDEHLpScJ95ML3P36EGPBd/AZfvf8SvTZ++eNX/LD/Cd++v3sZAMONJM+bBUNVlZAoMfNCSiANgAMI+PzTT3BvnwF/taAwtGyTDA/vvgAZJCWuboHjhCLe50QueCeAUfU2/nXB3VGn38CbDUIIQ3v+VIvd6fclKfciu2Y0cUi0KBBOAY2yM7NujUPKBA007Pd7rmoBSZVl+YRUUyCScismvkAZcKaQAMlhINzb1RxQjBGSsobBxQrMmS4Sc1OermuOx/Uk7FnOybhP1s/7sYFwjNUYvKD7/dA0AAloud12PuFgp32SPuF0fmZI9MGMphsPT55zlRG5AfGhgnnvYA6HkFK6SMQhRaeE6XtT4Ouc0NVJLqOHEQZlgs0qMCVo3xazBW7k93TlrhuNxzZCeV8MAJqmGZJ01+4iwZY4BIxmVNf1xTaMAMxUFMWwAEbAzxapLMuLJZ2Sc16ppml6UMtOaGbqSyl6737zl3k4NMiH8if9nW6Y7wkfxmUV+xtVizLMHxUPCIHY7eqJx89PCfafVwMHBDAY9vt9d6R8HUvCdrtF22YDijGO70wBGKiyigAEdwEmeEqXZTPYbI66qbvTKwNM+bcA08/7HUiiuLuHe1dZo7wd85tjlE//XItTarM83RECIYnuTs2MJsEJF5Wch8MBklAUEXcfvj5TxQYAm6YRAIRc+avC3ViAw5/90pkRlMfjUflGtEUrJgCkZxI+Pj4qpVO+4TrCrv6Ml2G3q7HZ2Ez+L4jcqsz+29tb1Ltm/VokAmDbOvGaIKFOTm/7P+O/FX8DwQf4BRl7lR0AAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADjElEQVR42u2Xv48bVRDHPzO7tu9CcRB+Kfb+SBBp0yBR0CAKGpAQBQV/JBUSoqJHUEGFOJ0S79pRImiQSMLded+X4nl9Xnt9NkEhDU+ybO/Ovpn5fr8z8xb+X9csM5O766UG4SQC9OL237NkATPjpQUAIGknRWWZC7e9CFnivXT6Ic7zsuh1nuc54JR5xjU0qSxLZeMJIYStm+khIHncW4D1o+LkZYETkWjvSYKg+O3CzLbQPCCA0AtUq4t2Q4t/kHVtlBoITP78Glh3uEsXZoLUwQV+FZwp3tMOHe9FIEmSPuhUFMXquiTS4ZC3yozhaMT5+Tm/3Z+yWMQKevXW2wxGQx7OH9EsLg4PwD3VeHyLRgF33xLRCn4z3rh7m6+++ZoLAo7x5cef8vD0PqPjI376/kebhSd67+49Hp+dHRZAYkM14SJmGUSWZUhSl/sQt0iNH779zhY0etNGCPHazZs88imD4yMAToIzfGXA6MaJzp/+YXsDaHRBURQd/t29k7XkmAlbFkdAPG7+JLEUM8MILBYLAH63C+qffzEbpNorwpREm6Lro2CFRhO498H7esdP7N30dbuTnFj16xlNgMtnf/HRF5/pTnJiH37+iVg03T16uTc0yfJrq2BTC+7O0Y1jlDgexLMnT1eojEYjApAITk9PO35tR+fa2X47NX6ATYwilmZVVe0z12ugLa1NR+sotDabDakvwKqudqK+GYD6IN8W33ZAmxS1drERGVJ/K9pCoFX+ekZ9UPdREELYRsQsdkE9ZyfcJcC+oFqk+uzNTH0orKnRlaTOeDxeZVfXNUhgRpZle6uhL8hoH6jreS8NVwiYmEwmAEyn006AJlM9n1HmRW/mraPN7NvfppWGtClCX4MHSTRa8Xg1+wlmwZhO607/MrPOx923x/RSA3lZYImTpt1OmLbGxe0SE8zqGsOBZqM8gl1VSlgTYcAsTswHDx7EjrlUnAnKsiSEgJuTTzKqqtqiYDVaQ9NgwRDNbqLdVqccScxm89g6lxmHENaedU2nU6Q4zAaDAe7xemvn6/084m57hdU6S5Ik8tsEI8g2+RXBJJnhzGYzLi8vmeRFW+oCSCVZVVVaZbfz7LJeajHYxWKBDnhlEMGcRPP5PI71tcPxwTWVkmhSZkhNPN+5kIxZNSdcR1lPP1giaQc3ou4GCZ7E0VzX1T/JgXXH/2ZpmcULfWX7z9bfmjD10vZnheMAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD6ElEQVR42u1Xz28bRRT+3sw4LlELhdKqTrz+ESGhIlSkcuXECU6cuPBvcUW9w6VIRQIhxLEHLlUOFUKIJt6NHanBNImaumF33sdhdu21vbGdgJQLT9rD7szOe+973/sxwP+yXCgivHQj8uc/F7PqRhG5PPfFViNgjGG326VzjhdFcSUESGBra2vucxRFyLIMjUYDC0LEKIrY2epWLrqVEKBAVSHWkF5lYhghIhARtNttiAhJD1LGa4X4NLs4B8jcOeUUJ4rvJEESqgpSivBM/3uGuFV54L3P7fXhR+fmiOnWavAkHARpmo7XnXNATS5mgIGlwoMkrAAZgZoYNhqNqRBcfes6njzeHmu5e+9DPj94hlqthq2778Gs1dGLB/Cj0flCYJyg0+lArIGnBjREc+8UxhjYmsOTx9vygimf84QHfMnOnS7clTpuv9PBT99+Jw+//gZvN5vnQ8DC0GcaPCUQRREAJcVAVQE4vHbtKjJN8Ws6JEkYABTg0y8+x14ywKMff5bfeMwUGdbfXMfNNxo8ONqXlRDwUESdaEys4hdhIJkIcXJ0DFOvY3j4J0LFDkeerglcfQ0AkGoKktj5ZVuOXx2uFgKBIQDQKwCdWw8IBHk1PMJHN9+V+98/wFc/PMAtWZeHX97Hsz96uHPvA75vb8g1c0U+/uwTnp6OZFrPWbE3hs08ZgoPoZlKPxGCFBgTwmHra7hx+xZUFf7vFC/+OswzB1i//jpEBKOTl0h+30EGL8sMYBRFY6JRAtxCU5nX5Wwo1wZjwn5KeN9P+gWRZSkJiwNVJdRiESi1hIDMNaqiIM0asxcnEAZXlmaBgVCsq/SsUDSrvIxKZdckoWegbeZbFrG52QBl3rOyotlQLNqLBa3cVWCfN6BgzORgDxE752U55lUIBLKy6JayEAFrwJDfMm4mvV4PvV4PSdKHtfZsL6uISUAVaLVaZ3faGecZRS2QRJIksLYG79NJyohls7lxoelob9AHvYLTVW0KAZIB+uCpmVKeh0EGg8EkvWbIV37Kh5JEc2OzSE1WI2CE7agFEWJ3Ny4KTKWr7Xabs/CTxGg0wnA4DNCbYFRzYzNvahYigt2nO/N1wBiw1WqDJLxnUWpl2ZBaGBHHcfk9zPAaSNzvJyx4oBOisgiFCcqQTzMcE23ZhOS9n01LqWK5KsSZGuK9BM45tFpN5CWe5TSUOI6ZN6GFPQIIHBERKLjSbSHTVACwl8RobjRQvue4WT6wovOVpdvtMsuykGbWwDrCwELzUW1R1ABwb7A/pc+dN52MMXDOQDXwYOfpbmD9Ckho5mVhHTjHLYlj0lFA6CVem/6l/APKnDwSmFp8ywAAAABJRU5ErkJggg==",
  ];
  const POPCAT_CONTRIB_SPRITE_URI = "data:image/png;base64," +
    "iVBORw0KGgoAAAANSUhEUgAAAKAAAAAgCAYAAACVf3P1AAAi9UlEQVR42u2caXgVVbb+f3tX1TknAxkhCSEJJEAggZCQBIKA" +
    "giACIirYikNji9222qNDX28r2k7X+d9Xu2/bV7tVnG2c23luVEAChCnMhDDPCCGQ5AxVe98PdU4lgQz0bT/8P9x6nnqSc6qy" +
    "d+293/Wud629KvB/x/8d/z8clrC05TO15TP19972abQbh6lN0z2/7/5jbY/o0bfTtv2Y2rKk9vP99x9ru6t70kW8Ni2pzW7u" +
    "+98cg+J66QRh6UFxvTptu9QY7K1/qTH4e32GUmOwTvGbOpmkU9o1AYp9+fonF5eQoPw0yRD3vP6pPmYHxffRebIZ0DPPHsao" +
    "lL48Uf21XrP9QIftPv6DCwHQPod73vhS7ws3iu8LfLMvqKA8sTf3vPFlp/ddO72Sof4+ANz//ic6O5BCdcPuf/kZcgOJevp5" +
    "ZWT7E3nq7YV6V/BEh21OHTeAMekD3bn48GudrnuwOFj/L/efLuL12ZMLKcvvx1MvfggtHd9nph7gT+MvpFGFERmaHfPqdEPI" +
    "Ft8H+ConJ/HL/Gk8+fpClh9sf10CbGEXCcoPQFHlEB779ZX8v2vO08lm4H9tCcW+fJ1sBvSdV03g0nMnYuUkcdWEio4H34b1" +
    "citLeeaB63nk6qm6ty/pX7LE3r4kfc0FFYwvG0afylJuumIMHbGgH1PHwJc/ppCnH/wls68ay7/KhrmBRD31nGIuHFFGWeUI" +
    "bp95Tof3JQhLx8DXf9QA/uvea7jgkkIM8a/1ny7i9dRxAyjL70efvAJ+Om4C6SK+wzYvO2ssAEnSx7Dc/sydNhVLWPpfBd+o" +
    "C9I5I7832YXDufas8ZzMghIgXpntFy47g/0nmrh2ZhWdgdASlu7ojF3fwi4euXg6Kdm5RNxuTusQqoWgMthx5AgzpxTRmUuO" +
    "ueu2Z1wbwMRh6v6D0ihJ7E1KUiqGaumyX+1zAAiGFcGwokd6L66dXoklO+7fkqY++WwLWEuaekhxL4YnZROUCTh2uNO+A1gc" +
    "i2/yPjc0NTG4rJyfzxhJQicgMISpTz7b3psgLD2wsCdDc7PJ6zsAfxf9A8iEiPvTJ2kJJFBaUcANM6uwfB27zs7WP+a+k0nS" +
    "Mu8Y5UYWvQqGEOmkfwnQLG3vi51L6wCYMPpMAGZOHOaBMNbJuCE5enRxJqOLM1n896fYXV/Dp/f+gA/nTvG0ZGl+L5pkiIzU" +
    "njihZiK7G5EtZrcA3LliM37Tx7SzxgFwzXkVHgh7+5K0aZq6NL+XHlWUw6iiHN596Gb2b6jhhdvn8N6dFxGHC8TC/FQA8soL" +
    "vXaTwv5O+/1OBwHYt8wdf0ognrBWzDmvnJh+q0rJ0ZY0dW4gUU8sy2ViWS7v3389ezYv5/37r+fT+y4mpiOL83uSFYgnu3QQ" +
    "AHtXbzotA9y6pI6UhATilWsQM8YVEdOFg+J6aUOYOl3E67MHZxE7D2xZxsG6GubddR0/HD9MG8LUOYEUEqWifFgpZiTIijWr" +
    "T5sEDtZsQcX1YEzpSK6ZVoXwNxMDliUsneI39ZTyAsoHZjN2YCYHti5n/+Yl7F23kNnXDiDFb2rhb8Zn+eg7ushrU/pOJSIR" +
    "02nP3XsDB1fvdhdt5ACCoSABf4C7npiHslwpMKKoL5ZWZJPIoKpSHn/5dW688hJGXz4HU4EpFEufvZO5ryxDWYLxpYVk9+lL" +
    "UU4fdi6to0mGuPnVd0VHOu3lR/6NQ0s3A9B33BBUKEhD41H++NK73n3DhvYjVRikpyaTk5fDm18sBOC/X3qNgHCNdOkz93JQ" +
    "pPL4qx/hC5iU5mcycewEDi3djPY5PPPeSpYd3yFOdsGXjx7EqOzBrhuu6E1QJrh67OkXaNKtt5cNziGvRxqBHgafL18PwEuv" +
    "vYVPuvcsm3cvdtog7nziedKS/ORl92LamWezb1kd2udwwyvviI5c5fDBaVxcXOW54djxyLMvc0JJQnaYqpL++KIxyvSyco4q" +
    "SMvJonSiq5+lUlhCs+nbBWxYuowXPv2K4qI8zj/jTLYucQ3rjrc+4jvdfMozpPhN/fD0Cz0WzK10DSekFQ889TLxODRjUFWS" +
    "C8D55a6cKp91DY4UGErjROdABltY+fYrzF/0LQlxPiaOPovNi2pJkj5ufeMzjtGq7yXAMTsovmtu9h5mw/J1+OPdBbj64vNI" +
    "MA1GFPUFICIkFSUJJDZHmcLZT0ArTKGwtWTkNfdx/xUjKOmXSzjUwvb6jWxYvg6Af3/zww4troX2YnfHV+vQMo5AYk/m/uJ6" +
    "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" +
    "TkSuQmCC";

  const presets = [
    {
      label: "Cat Jump Ghost Grid",
      description: "Ghost cat contributions with a nocturnal open-source mood",
      state: {
        name: "Tom Preston-Werner",
        username: "mojombo",
        role: "GitHub co-founder",
        tagline: "One of the people who helped make open source feel social.",
        status: "haunting commit history with tiny ghost cats",
        command: "git log --oneline",
        provider: "obsidian",
        theme: "velvet",
        avatar: "TP",
        pattern: "pulse",
        width: 980,
        height: "auto",
        motion: "boot",
        showContribs: "on",
        contribTheme: "cat_jump",
        contribRange: "16w",
        contribMode: "focus",
        showLangs: "off",
        hideCommand: true,
      },
    },
    {
      label: "Popcat Activity Burst",
      description: "Animated cat energy wrapped around a fast-moving product profile",
      state: {
        name: "Guillermo Rauch",
        username: "rauchg",
        role: "Vercel CEO",
        tagline: "Making frontend deploys feel instant.",
        status: "shipping preview deployments with taste",
        command: "vercel deploy",
        provider: "amber",
        theme: "sakura",
        avatar: "GR",
        pattern: "grid",
        width: 980,
        height: "auto",
        showContribs: "on",
        contribTheme: "popcat",
        contribRange: "16w",
        contribMode: "focus",
        showLangs: "off",
        barStyle: "blocks",
      },
    },
    {
      label: "Capybara Onsen",
      description: "Cozy maintainer card with a warm contribution bath",
      state: {
        name: "David Tolnay",
        username: "dtolnay",
        role: "Rust maintainer",
        tagline: "Careful crates, macro magic, and quietly cozy open source.",
        status: "soaking release trains in careful reviews",
        command: "cargo test --workspace",
        provider: "amber",
        theme: "matcha",
        avatar: "DT",
        pattern: "rings",
        width: 980,
        height: "auto",
        showContribs: "on",
        contribTheme: "capybara_onsen",
        contribRange: "16w",
        contribMode: "focus",
        showLangs: "off",
        barStyle: "blocks",
      },
    },
    {
      label: "Moon Phase Dashboard",
      description: "Research-heavy profile with icons and a moonlit contribution grid",
      state: {
        name: "Andrej Karpathy",
        username: "karpathy",
        role: "AI researcher",
        tagline: "Neural nets, teaching, and quiet moonlit experiments.",
        status: "researching, writing, and iterating",
        command: "python train.py",
        provider: "amber",
        theme: "solar",
        avatar: "AK",
        pattern: "grid",
        width: 980,
        height: "auto",
        showContribs: "on",
        contribTheme: "moon",
        contribRange: "16w",
        showLangs: "on",
        langCount: 4,
        langStyle: "icons",
        iconSize: "sm",
      },
    },
    {
      label: "Starfield Maintainer",
      description: "Dense maintainer card with blocks, pulse motion, and a star map",
      state: {
        name: "Linus Torvalds",
        username: "torvalds",
        role: "Linux maintainer",
        tagline: "Kernel patches, release candidates, and stars that actually compile.",
        status: "reviewing patches and release candidates",
        command: "make oldconfig",
        provider: "obsidian",
        theme: "graphite",
        avatar: "LT",
        pattern: "pulse",
        width: 980,
        height: "auto",
        motion: "pulse",
        showContribs: "on",
        contribTheme: "star",
        contribRange: "16w",
        showLangs: "on",
        langCount: 4,
        langStyle: "bar",
        barStyle: "blocks",
      },
    },
    {
      label: "Orbit Builder",
      description: "Bright performance-focused card with a cool orbit accent",
      state: {
        name: "Addy Osmani",
        username: "addyosmani",
        role: "Chrome engineer",
        tagline: "Performance, UX, and web apps in orbit.",
        status: "maintaining web performance notes",
        command: "npm run perf",
        provider: "prism",
        theme: "aurora",
        avatar: "AO",
        pattern: "rings",
        width: 980,
        height: "auto",
        accent: "#9cd7ff",
        showContribs: "on",
        contribTheme: "orbit",
        contribRange: "16w",
        showLangs: "off",
        barStyle: "dots",
      },
    },
    {
      label: "Signal Radar Card",
      description: "Monitoring-heavy maintainer card with scan motion and lean stats",
      state: {
        name: "Sindre Sorhus",
        username: "sindresorhus",
        role: "open-source maintainer",
        tagline: "Tiny packages, strong signals, and decades of useful APIs.",
        status: "tracking issues and shipping small fixes",
        command: "npm publish",
        provider: "obsidian",
        theme: "aurora",
        avatar: "SS",
        pattern: "grid",
        width: 980,
        height: "auto",
        motion: "scan",
        showContribs: "on",
        contribTheme: "signal",
        contribRange: "16w",
        showLangs: "off",
        stats: "stars,forks,followers",
        barStyle: "dots",
      },
    },
    {
      label: "Firefly Night Mode",
      description: "Late-night designer-engineer profile with glowing activity",
      state: {
        name: "Anthony Fu",
        username: "antfu",
        role: "open-source designer engineer",
        tagline: "Tooling, DX, and tiny night lights for the web.",
        status: "shipping after dark",
        provider: "obsidian",
        theme: "velvet",
        avatar: "AF",
        pattern: "pulse",
        width: 980,
        height: "auto",
        motion: "boot",
        showContribs: "on",
        contribTheme: "firefly",
        contribRange: "16w",
        showLangs: "off",
        hideCommand: true,
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

  function safeSvgId(prefix, value) {
    const suffix = String(value || "anon")
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48);
    return `${prefix}-${suffix || "anon"}`;
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

  function isAutoHeightValue(value) {
    return typeof value === "string" && value.trim().toLowerCase() === "auto";
  }

  function parseHexColor(value) {
    const hex = String(value || "").trim();
    const match = hex.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!match) return null;
    const raw = match[1];
    const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
    const int = Number.parseInt(full, 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255,
    };
  }

  function rgbToHex(rgb) {
    if (!rgb) return null;
    return `#${[rgb.r, rgb.g, rgb.b]
      .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0"))
      .join("")}`;
  }

  function mixHex(baseColor, mixColor, mixAmount) {
    const base = parseHexColor(baseColor);
    const mix = parseHexColor(mixColor);
    if (!base) return mixColor || baseColor;
    if (!mix) return baseColor;
    const amount = Math.max(0, Math.min(1, Number(mixAmount) || 0));
    return rgbToHex({
      r: base.r + (mix.r - base.r) * amount,
      g: base.g + (mix.g - base.g) * amount,
      b: base.b + (mix.b - base.b) * amount,
    });
  }

  function withAlpha(color, alpha) {
    const rgb = parseHexColor(color);
    if (!rgb) return color;
    const opacity = Math.max(0, Math.min(1, Number(alpha) || 0));
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
  }

  function getProviderSurfaces(providerName, palette, accentOverride) {
    const accent = accentOverride || palette.accent;
    const accentAlt = palette.accentAlt || accent;
    const success = palette.success;

    if (providerName === "amber") {
      return {
        shellTop: mixHex(palette.panelSoft, palette.title, 0.12),
        shellBottom: mixHex(palette.shell, palette.panel, 0.22),
        chromeFill: mixHex(palette.panelSoft, palette.title, 0.18),
        chromeText: mixHex(palette.dim, palette.title, 0.32),
        bodyFill: mixHex(palette.shell, palette.panel, 0.46),
        panelFill: withAlpha(palette.title, 0.055),
        panelStroke: withAlpha(palette.title, 0.07),
        line: withAlpha(palette.title, 0.08),
        softLine: withAlpha(palette.title, 0.05),
        strongLine: withAlpha(palette.title, 0.1),
        textStrong: palette.title,
        textBody: palette.text,
        textMuted: palette.dim,
        label: mixHex(accent, palette.title, 0.46),
        accent,
        accentAlt,
        success,
        buttonColors: [
          mixHex(accent, "#ffffff", 0.12),
          mixHex(accentAlt, "#ffffff", 0.14),
          mixHex(success, "#ffffff", 0.08),
        ],
      };
    }

    if (providerName === "obsidian") {
      return {
        shellFill: mixHex(palette.shell, "#050708", 0.35),
        chromeFill: mixHex(palette.panel, palette.shell, 0.26),
        chromeText: mixHex(palette.text, palette.title, 0.16),
        bodyFill: mixHex(palette.shell, palette.panel, 0.38),
        panelFill: mixHex(palette.panel, palette.panelSoft, 0.22),
        panelFillAlt: mixHex(palette.panel, palette.shell, 0.14),
        line: withAlpha(accentAlt, 0.12),
        softLine: withAlpha(accentAlt, 0.07),
        textStrong: palette.title,
        textBody: palette.text,
        textMuted: mixHex(palette.dim, palette.title, 0.08),
        accent,
        accentAlt,
        success,
        buttonColors: [
          mixHex(palette.panelSoft, accent, 0.2),
          mixHex(palette.panelSoft, accentAlt, 0.26),
          mixHex(palette.panelSoft, success, 0.28),
        ],
      };
    }

    if (providerName === "prism") {
      return {
        shellFill: mixHex("#ffffff", palette.title, 0.44),
        chromeFill: mixHex("#ffffff", accentAlt, 0.14),
        chromeText: mixHex(palette.shell, palette.dim, 0.45),
        bodyFill: mixHex("#f7f8fc", palette.title, 0.34),
        panelFill: mixHex("#ffffff", palette.title, 0.72),
        panelFillAlt: mixHex("#ffffff", accentAlt, 0.1),
        line: withAlpha(mixHex(palette.shell, accent, 0.3), 0.1),
        softLine: withAlpha(mixHex(palette.shell, accentAlt, 0.24), 0.07),
        textStrong: mixHex(palette.shell, "#151821", 0.22),
        textBody: mixHex(palette.shell, palette.dim, 0.34),
        textMuted: mixHex(palette.dim, palette.shell, 0.26),
        accent,
        accentAlt,
        success,
        buttonColors: [
          mixHex("#ffffff", accent, 0.56),
          mixHex("#ffffff", accentAlt, 0.46),
          mixHex("#ffffff", success, 0.42),
        ],
      };
    }

    return {
      shellFill: palette.shell,
      chromeFill: palette.panelSoft,
      chromeText: palette.dim,
      bodyFill: palette.shell,
      panelFill: palette.panel,
      panelFillAlt: palette.panelSoft,
      line: palette.line,
      softLine: withAlpha(palette.title, 0.05),
      textStrong: palette.title,
      textBody: palette.text,
      textMuted: palette.dim,
      accent,
      accentAlt,
      success,
      buttonColors: [accent, accentAlt, success],
    };
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

    const contributions =
      stats.contributions &&
      Array.isArray(stats.contributions.weeks) &&
      stats.contributions.weeks.length > 0
        ? {
            total: safeNumber(stats.contributions.total, 0, 0, 100000000),
            activeDays: safeNumber(stats.contributions.activeDays, 0, 0, 366),
            weeks: stats.contributions.weeks
              .slice(-53)
              .map((week) => ({
                start: String(week.start || "").slice(0, 10),
                days: Array.isArray(week.days)
                  ? week.days.slice(0, 7).map((day) => {
                      if (!day) return null;
                      const normalizedDay = {
                        date: String(day.date || "").slice(0, 10),
                        level: safeNumber(day.level, 0, 0, 4),
                      };

                      if (typeof day.count === "number" && Number.isFinite(day.count)) {
                        normalizedDay.count = Math.floor(safeNumber(day.count, 0, 0, 1000000));
                      }

                      return normalizedDay;
                    })
                  : Array.from({ length: 7 }, () => null),
              })),
          }
        : null;

    return {
      username: String(stats.username || "").slice(0, 39),
      repos: safeNumber(stats.repos, 0, 0, 100000),
      followers: safeNumber(stats.followers, 0, 0, 100000000),
      stars: safeNumber(stats.stars, 0, 0, 100000000),
      forks: safeNumber(stats.forks, 0, 0, 100000000),
      topLangs,
      contributions,
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

  // Approximate pixel width per character in the SVG mono stack.
  // Keep this conservative so Windows font fallback does not overflow panels.
  function charPxWidth(char, fontSize) {
    const scale = (Number(fontSize) || 12) / 12;
    const code = char.codePointAt(0) || 0;
    const isWide = (code >= 0x1100 && code <= 0x11FF) ||
                   (code >= 0x2E80 && code <= 0x9FFF) ||
                   (code >= 0xAC00 && code <= 0xD7AF) ||
                   (code >= 0xF900 && code <= 0xFAFF) ||
                   (code >= 0xFF00 && code <= 0xFFEF);
    const isEmoji = code >= 0x1F300;
    if (isEmoji) return 13.5 * scale;
    return (isWide ? 12.6 : 7.35) * scale;
  }

  function measureTextPx(text, fontSize) {
    return [...String(text || "")].reduce((width, char) => width + charPxWidth(char, fontSize), 0);
  }

  function tokenizeRichWords(text) {
    const source = String(text || "");
    const tokens = [];
    const boldRe = /\*\*(.+?)\*\*/g;
    let last = 0;
    let match;

    const pushSegmentWords = (segment, bold) => {
      String(segment)
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => {
          tokens.push({ text: word, bold });
        });
    };

    while ((match = boldRe.exec(source)) !== null) {
      if (match.index > last) {
        pushSegmentWords(source.slice(last, match.index), false);
      }
      pushSegmentWords(match[1], true);
      last = match.index + match[0].length;
    }

    if (last < source.length) {
      pushSegmentWords(source.slice(last), false);
    }

    return tokens;
  }

  function encodeRichLine(tokens) {
    return tokens
      .map((token) => (token.bold ? `**${token.text}**` : token.text))
      .join(" ");
  }

  function measureRichLine(tokens, fontSize) {
    return tokens.reduce(
      (width, token, index) => {
        const textWidth = measureTextPx(token.text, fontSize) * (token.bold ? 1.04 : 1);
        return width + (index ? charPxWidth(" ", fontSize) : 0) + textWidth;
      },
      0
    );
  }

  function groupRichTokens(tokens) {
    const joiners = new Set(["+", "•", "&", "|", "×"]);
    const units = [];

    for (let index = 0; index < tokens.length; index += 1) {
      const unit = [tokens[index]];

      while (
        index + 2 < tokens.length &&
        joiners.has(tokens[index + 1].text) &&
        tokens[index + 2]
      ) {
        unit.push(tokens[index + 1], tokens[index + 2]);
        index += 2;
      }

      units.push(unit);
    }

    return units;
  }

  function wrapTextBlock(text, maxPx, maxLines, options) {
    if (!text || maxLines <= 0) return [];

    const lines = [];
    const segments = String(text || "").split(/\r?\n/);

    for (const segment of segments) {
      if (lines.length >= maxLines) break;
      if (!segment.trim()) continue;
      lines.push(...wrapText(segment, maxPx, maxLines - lines.length, options));
    }

    return lines;
  }

  function wrapText(text, maxPx, maxLines, options) {
    if (!text) return [];
    const slackPx = Math.max(0, Number(options?.slackPx) || 0);
    const limitPx = maxPx + slackPx;
    const fontSize = Number(options?.fontSize) || 12;
    const units = groupRichTokens(tokenizeRichWords(text));
    const lines = [];
    let current = [];

    const flush = () => {
      if (current.length && lines.length < maxLines) lines.push(encodeRichLine(current));
      current = [];
    };

    for (const unit of units) {
      if (lines.length >= maxLines) break;
      const unitPx = measureRichLine(unit, fontSize);

      if (unitPx > limitPx) {
        if (current.length) flush();
        const plainText = unit.map((token) => token.text).join(" ");
        const chars = [...plainText];
        let chunk = [];
        let chunkText = "";
        let chunkPx = 0;
        for (const c of chars) {
          if (lines.length >= maxLines) break;
          const cpx = charPxWidth(c, fontSize);
          if (chunkPx + cpx > limitPx) {
            if (chunkText) lines.push(encodeRichLine([{ text: chunkText, bold: false }]));
            chunk = [c];
            chunkText = c;
            chunkPx = cpx;
          } else {
            chunk.push(c);
            chunkText += c;
            chunkPx += cpx;
          }
        }
        current = chunkText ? [{ text: chunkText, bold: false }] : [];
        continue;
      }

      const candidate = current.length ? [...current, ...unit] : unit;
      const candidatePx = measureRichLine(candidate, fontSize);
      if (candidatePx <= limitPx) {
        current = candidate;
      } else {
        if (current.length && unit.length > 1) {
          let splitIndex = 0;
          for (let index = 1; index <= unit.length; index += 1) {
            const prefixCandidate = [...current, ...unit.slice(0, index)];
            if (measureRichLine(prefixCandidate, fontSize) <= limitPx) {
              splitIndex = index;
            } else {
              break;
            }
          }

          if (splitIndex > 1) {
            const lastToken = unit[splitIndex - 1];
            if (["+", "•", "&", "|", "×"].includes(lastToken?.text)) {
              splitIndex -= 1;
            }
          }

          if (splitIndex > 0) {
            current = [...current, ...unit.slice(0, splitIndex)];
            flush();
            current = [...unit.slice(splitIndex)];
            continue;
          }
        }

        flush();
        current = [...unit];
      }
    }
    flush();
    return lines;
  }

  function renderBoldLine(text, boldFill) {
    if (!/\*\*/.test(text)) return escapeXml(text);
    const re = /\*\*(.+?)\*\*/g;
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out += `<tspan>${escapeXml(text.slice(last, m.index))}</tspan>`;
      out += `<tspan font-weight="700" fill="${escapeXml(boldFill || "#f2efec")}">${escapeXml(m[1])}</tspan>`;
      last = m.index + m[0].length;
    }
    if (last < text.length) out += `<tspan>${escapeXml(text.slice(last))}</tspan>`;
    return out;
  }

  function truncateText(value, limit) {
    const text = String(value || "");
    if (text.length <= limit) {
      return text;
    }

    return `${text.slice(0, Math.max(0, limit - 1))}…`;
  }

  function truncateTextPx(value, maxPx, options) {
    const text = String(value || "");
    const fontSize = Number(options?.fontSize) || 12;
    const suffix = options?.suffix ?? "…";

    if (measureTextPx(text, fontSize) <= maxPx) {
      return text;
    }

    const suffixPx = measureTextPx(suffix, fontSize);
    let out = "";

    for (const char of [...text]) {
      if (measureTextPx(out + char, fontSize) + suffixPx > maxPx) {
        break;
      }
      out += char;
    }

    return out ? `${out}${suffix}` : suffix;
  }

  function getStatusText(state) {
    if (!state.githubStats) {
      return state.status;
    }

    return `${formatCompactStat(state.githubStats.stars)} stars • ${formatCompactStat(
      state.githubStats.repos
    )} repos • ${formatCompactStat(state.githubStats.followers)} followers`;
  }

  function buildGraphic(ratio, bx, rowY, barTrack, accentColor, trackBg, style, gradientId) {
    const bg = trackBg || "rgba(255,255,255,0.08)";
    const fillColor = gradientId ? `url(#${gradientId})` : accentColor;
    if (style === "dots") {
      const count = 10;
      const spacing = barTrack / count;
      const r = Math.min(spacing / 2 - 1, 3);
      const filled = Math.round(ratio * count);
      const dotFilter = gradientId ? ` filter="url(#glow-dot)"` : "";
      return Array.from({ length: count }, (_, i) =>
        `<circle cx="${bx + spacing * i + spacing / 2}" cy="${rowY + 7}" r="${r}" fill="${i < filled ? accentColor : bg}"${i < filled ? dotFilter : ""}></circle>`
      ).join("");
    }
    if (style === "blocks") {
      const count = 8;
      const gap = 2;
      const blockW = (barTrack - (count - 1) * gap) / count;
      const filled = Math.round(ratio * count);
      return Array.from({ length: count }, (_, i) =>
        `<rect x="${bx + i * (blockW + gap)}" y="${rowY + 5}" width="${blockW}" height="4" rx="1" fill="${i < filled ? fillColor : bg}"></rect>`
      ).join("");
    }
    // bar (default)
    const filledW = Math.max(2, Math.round(ratio * barTrack));
    return [
      `<rect x="${bx}" y="${rowY + 5}" width="${barTrack}" height="3" rx="1" fill="${bg}"></rect>`,
      `<rect x="${bx}" y="${rowY + 5}" width="${filledW}" height="3" rx="1" fill="${fillColor}"></rect>`,
    ].join("");
  }

  function buildStatBars(stats, x, y, trackWidth, accentColor, dimColor, trackBg, keys, style, gradientId) {
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
          buildGraphic(ratio, x + labelW, rowY, barTrack, accentColor, bg, style, gradientId),
          `<text x="${x + labelW + barTrack + 8}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${formatCompactStat(item.value)}</text>`,
        ].join("\n  ");
      })
      .join("\n  ");
  }

  function buildLangBars(topLangs, x, y, trackWidth, accentColor, dimColor, trackBg, style, gradientId) {
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
          buildGraphic(ratio, x + labelW, rowY, barTrack, accentColor, bg, style, gradientId),
          `<text x="${x + labelW + barTrack + 8}" y="${rowY + 12}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${dimColor}">${pct}%</text>`,
        ].join("\n  ");
      })
      .join("\n  ");
  }

  // skillicons.dev renders each icon at 45x45 with 15px gap (60px/icon)
  const ICON_SIZES = { sm: 26, md: 38, lg: 52 };

  function buildLangIcons(uri, x, y, trackWidth, count, iconSize) {
    const iconH = ICON_SIZES[iconSize] ?? ICON_SIZES.md;
    const perIconW = Math.round(iconH * (60 / 45));
    const iconW = Math.min(count * perIconW, trackWidth);
    return `<image x="${x}" y="${y}" width="${iconW}" height="${iconH}" href="${escapeXml(uri)}" preserveAspectRatio="xMinYMid meet"></image>`;
  }

  function shouldShowContributions(state) {
    if (!state.githubStats?.contributions?.weeks?.length) return false;
    if (state.showContribs === "off") return false;
    return state.showContribs === "on" || !!state.username;
  }

  function getContributionRangeKey(range) {
    const key = String(range || defaults.contribRange).trim().toLowerCase();
    return CONTRIBUTION_RANGE_LIMITS[key] ? key : defaults.contribRange;
  }

  function getContributionRangeLimit(range) {
    return CONTRIBUTION_RANGE_LIMITS[getContributionRangeKey(range)] || CONTRIBUTION_RANGE_LIMITS[defaults.contribRange];
  }

  function getContributionRangeLabel(range) {
    return CONTRIBUTION_RANGE_LABELS[getContributionRangeKey(range)] || CONTRIBUTION_RANGE_LABELS[defaults.contribRange];
  }

  function getContributionWeeks(contributions, range) {
    if (!contributions?.weeks?.length) return [];
    return contributions.weeks.slice(-getContributionRangeLimit(range));
  }

  function getContributionRangeSummary(contributions, range) {
    const weeks = getContributionWeeks(contributions, range);
    const days = weeks
      .flatMap((week) => (Array.isArray(week.days) ? week.days : []))
      .filter(Boolean);
    const hasExactCounts = days.length > 0 && days.every((day) => typeof day.count === "number");
    let total;

    if (hasExactCounts) {
      total = days.reduce((sum, day) => sum + Math.floor(safeNumber(day.count, 0, 0, 1000000)), 0);
    } else if (getContributionRangeKey(range) === "1y") {
      total = safeNumber(contributions.total, 0, 0, 100000000);
    } else {
      total = days.filter((day) => safeNumber(day.level, 0, 0, 4) > 0).length;
    }

    const activeDays = days.filter((day) =>
      hasExactCounts
        ? safeNumber(day.count, 0, 0, 1000000) > 0
        : safeNumber(day.level, 0, 0, 4) > 0
    ).length;

    return {
      total,
      activeDays,
      label: getContributionRangeLabel(range),
    };
  }

  function isContributionFocus(state, contributions) {
    return state?.contribMode === "focus" && !!contributions?.weeks?.length;
  }

  function usesLargeContributionMarks(theme) {
    return theme === "cat_jump" || theme === "popcat" || theme === "capybara_onsen" || theme === "moon" || theme === "star" || theme === "orbit" || theme === "signal" || theme === "citylight";
  }

  function buildStarPoints(cx, cy, outerR, innerR) {
    const points = [];
    const start = -Math.PI / 2;
    const step = Math.PI / 5;

    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? outerR : innerR;
      const angle = start + step * i;
      points.push(`${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`);
    }

    return points.join(" ");
  }

  function buildMoonShadowOffset(level, radius) {
    if (level <= 0) return 0;
    if (level === 1) return -radius * 0.62;
    if (level === 2) return -radius * 0.1;
    if (level === 3) return radius * 0.24;
    return null;
  }

  function buildArcPath(cx, cy, radius, startDeg, endDeg) {
    const startRad = (Math.PI / 180) * startDeg;
    const endRad = (Math.PI / 180) * endDeg;
    const x1 = (cx + Math.cos(startRad) * radius).toFixed(2);
    const y1 = (cy + Math.sin(startRad) * radius).toFixed(2);
    const x2 = (cx + Math.cos(endRad) * radius).toFixed(2);
    const y2 = (cy + Math.sin(endRad) * radius).toFixed(2);
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    const sweep = endDeg > startDeg ? 1 : 0;
    return `M ${x1} ${y1} A ${radius.toFixed(2)} ${radius.toFixed(2)} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
  }

  function getContributionThemeColors(theme, palette) {
    const accent = palette.accentAlt || palette.accent;

    if (theme === "cat_jump") {
      return {
        base: "rgba(235,255,248,0.06)",
        levels: ["rgba(235,255,248,0.05)", "rgba(235,255,248,0.08)", "rgba(223,255,242,0.1)", "rgba(207,255,239,0.13)", "rgba(244,255,248,0.16)"],
        accent: "#f4fff8",
        glow: "rgba(223,255,242,0.18)",
        eyeGlowLevels: [
          "rgba(0,0,0,0)",
          "rgba(207,255,239,0.14)",
          "rgba(223,255,242,0.22)",
          "rgba(244,255,248,0.32)",
          "rgba(244,255,248,0.44)",
        ],
        eyeCoreLevels: [
          "transparent",
          "rgba(223,255,242,0.2)",
          "rgba(244,255,248,0.32)",
          "rgba(244,255,248,0.46)",
          "rgba(255,255,255,0.62)",
        ],
        eyeHighlightLevels: [
          "transparent",
          "rgba(223,255,242,0.2)",
          "rgba(244,255,248,0.34)",
          "rgba(244,255,248,0.5)",
          "rgba(255,255,255,0.72)",
        ],
      };
    }

    if (theme === "popcat") {
      return {
        base: "rgba(224,224,224,0.06)",
        levels: ["rgba(224,224,224,0.05)", "rgba(255,214,184,0.08)", "rgba(255,197,162,0.12)", "rgba(255,174,132,0.16)", "rgba(255,236,204,0.2)"],
        accent: "#ffd8bf",
        glow: "rgba(255,160,122,0.18)",
        popGlowLevels: [
          "rgba(0,0,0,0)",
          "rgba(255,197,162,0.12)",
          "rgba(255,174,132,0.18)",
          "rgba(255,144,104,0.24)",
          "rgba(255,236,204,0.34)",
        ],
        popSpark: "#ffe9cf",
      };
    }

    if (theme === "capybara_onsen") {
      return {
        base: "rgba(255,219,172,0.06)",
        levels: ["rgba(92,68,51,0.2)", "rgba(177,125,79,0.1)", "rgba(230,153,68,0.12)", "rgba(255,202,132,0.16)", "rgba(255,225,154,0.24)"],
        accent: "#ffd58f",
        glow: "rgba(255,197,112,0.18)",
        onsenGlowLevels: [
          "rgba(0,0,0,0)",
          "rgba(255,196,112,0.12)",
          "rgba(255,181,83,0.18)",
          "rgba(255,217,153,0.24)",
          "rgba(255,235,178,0.34)",
        ],
      };
    }

    if (theme === "moon") {
      return {
        base: "rgba(72,83,118,0.18)",
        levels: ["rgba(72,83,118,0.18)", "rgba(106,118,164,0.20)", "rgba(130,142,196,0.22)", "rgba(166,177,230,0.24)", "rgba(209,218,255,0.26)"],
        accent: "#d1daff",
        glow: "rgba(209,218,255,0.16)",
        moonFillLevels: ["#2b3144", "#9baeff", "#c7d4ff", "#e7eeff", "#fff5d7"],
        moonCoreLevels: ["#111723", "#dbe2ff", "#eef2ff", "#ffffff", "#fffef7"],
        moonGlowLevels: [
          "rgba(0,0,0,0)",
          "rgba(145, 171, 255, 0.16)",
          "rgba(199, 212, 255, 0.2)",
          "rgba(232, 238, 255, 0.24)",
          "rgba(255, 245, 215, 0.28)",
        ],
        moonShadow: "#1d2333",
      };
    }

    if (theme === "star") {
      return {
        base: "rgba(0,0,0,0.38)",
        levels: ["rgba(0,0,0,0.38)", "rgba(18,22,34,0.56)", "rgba(20,24,40,0.62)", "rgba(24,28,46,0.72)", "rgba(28,34,56,0.82)"],
        accent: "#ffd86b",
        glow: "rgba(255,216,107,0.18)",
        glowLevels: [
          "rgba(0,0,0,0)",
          "rgba(142, 171, 255, 0.18)",
          "rgba(183, 196, 255, 0.22)",
          "rgba(255, 219, 120, 0.26)",
          "rgba(255, 196, 92, 0.34)",
        ],
        starFillLevels: ["transparent", "#91abff", "#d7e2ff", "#ffe18c", "#ffc35d"],
        starCoreLevels: ["transparent", "#f7fbff", "#ffffff", "#fff8d1", "#fff4df"],
        starStrokeLevels: ["transparent", "rgba(235,241,255,0.26)", "rgba(242,246,255,0.38)", "rgba(255,245,199,0.44)", "rgba(255,231,169,0.52)"],
      };
    }

    if (theme === "orbit") {
      return {
        base: "rgba(18,22,40,0.34)",
        levels: ["rgba(18,22,40,0.34)", "rgba(26,33,56,0.46)", "rgba(34,43,70,0.56)", "rgba(43,53,84,0.64)", "rgba(52,63,98,0.72)"],
        accent: "#9cd7ff",
        glow: "rgba(156,215,255,0.18)",
        orbitPlanetLevels: ["transparent", "#88a9ff", "#80d7ff", "#d0b6ff", "#ffd87d"],
        orbitCoreLevels: ["transparent", "#eef3ff", "#f4fbff", "#fff5ff", "#fff7df"],
        orbitRingLevels: ["transparent", "rgba(136,169,255,0.42)", "rgba(128,215,255,0.46)", "rgba(208,182,255,0.5)", "rgba(255,216,125,0.54)"],
        orbitSatelliteLevels: ["transparent", "#dce7ff", "#ffffff", "#fff2ff", "#fff4cf"],
      };
    }

    if (theme === "signal") {
      return {
        base: "rgba(11,20,26,0.34)",
        levels: ["rgba(11,20,26,0.34)", "rgba(14,28,36,0.46)", "rgba(17,35,46,0.56)", "rgba(19,42,56,0.66)", "rgba(24,52,70,0.76)"],
        accent: "#7de7ff",
        glow: "rgba(125,231,255,0.18)",
        signalDotLevels: ["transparent", "#8ee8ff", "#7dffcf", "#ffd873", "#ff9868"],
        signalArcLevels: ["transparent", "rgba(142,232,255,0.36)", "rgba(125,255,207,0.42)", "rgba(255,216,115,0.48)", "rgba(255,152,104,0.58)"],
        signalGlowLevels: ["transparent", "rgba(142,232,255,0.18)", "rgba(125,255,207,0.2)", "rgba(255,216,115,0.24)", "rgba(255,152,104,0.3)"],
      };
    }

    if (theme === "citylight") {
      return {
        base: "rgba(12,13,18,0.46)",
        levels: ["rgba(12,13,18,0.46)", "rgba(18,20,28,0.58)", "rgba(22,25,36,0.66)", "rgba(27,31,44,0.74)", "rgba(31,36,52,0.82)"],
        accent: "#ffd36b",
        glow: "rgba(255,211,107,0.16)",
        windowLevels: ["transparent", "#7de3ff", "#ffe08f", "#ffd36b", "#ffb36b"],
        roofLevels: ["transparent", "rgba(125,227,255,0.3)", "rgba(255,224,143,0.34)", "rgba(255,211,107,0.4)", "rgba(255,179,107,0.46)"],
      };
    }

    if (theme === "petal") {
      return {
        base: "rgba(255,255,255,0.04)",
        levels: ["rgba(255,255,255,0.04)", "rgba(255,185,166,0.34)", "rgba(255,163,135,0.52)", "rgba(255,144,114,0.76)", "#ff8f6b"],
        accent,
        glow: "rgba(255,163,135,0.18)",
      };
    }

    if (theme === "firefly") {
      return {
        base: "rgba(255,255,255,0.03)",
        levels: ["rgba(255,255,255,0.03)", "rgba(255,221,120,0.24)", "rgba(255,221,120,0.44)", "rgba(255,221,120,0.72)", "#ffe27a"],
        accent: "#ffe27a",
        glow: "rgba(255,226,122,0.22)",
      };
    }

    if (theme === "constellation") {
      return {
        base: "rgba(255,255,255,0.04)",
        levels: ["rgba(255,255,255,0.04)", "rgba(156,194,255,0.34)", "rgba(156,194,255,0.52)", "rgba(156,194,255,0.76)", "#9cc2ff"],
        accent: "#9cc2ff",
        glow: "rgba(156,194,255,0.18)",
      };
    }

    return {
      base: "rgba(255,255,255,0.05)",
      levels: ["rgba(255,255,255,0.05)", "rgba(137,214,143,0.28)", "rgba(137,214,143,0.46)", "rgba(137,214,143,0.68)", "#89d68f"],
      accent: "#89d68f",
      glow: "rgba(137,214,143,0.16)",
    };
  }

  function getContributionGridGeometry(weeksLength, trackWidth, theme, options) {
    const gap = 2;
    const maxWeeks = Math.max(0, weeksLength || 0);

    if (!maxWeeks || trackWidth <= 0) {
      return { cols: 0, cell: 0, gridW: 0, gridH: 0, gap };
    }

    const enlargedMarkTheme = usesLargeContributionMarks(theme);
    const rangeWeeks = getContributionRangeLimit(options?.range);
    const spotlightRange = rangeWeeks <= 26;
    const minVisibleCols = maxWeeks;
    const focusMode = options?.mode === "focus";
    const defaultTargetCell = spotlightRange
      ? (enlargedMarkTheme ? (focusMode ? 21 : 18) : (focusMode ? 18 : 15))
      : (enlargedMarkTheme ? (focusMode ? 13 : 12) : (focusMode ? 12 : 10));
    const targetCell = safeNumber(options?.targetCell, defaultTargetCell, 6, 28);
    const minCols = safeNumber(options?.minCols, minVisibleCols, 1, 53);
    const minCell = safeNumber(options?.minCell, enlargedMarkTheme ? (focusMode ? 9 : 8) : (focusMode ? 6 : 5), 4, 18);
    const defaultMaxCell = getContributionMaxCell(rangeWeeks, enlargedMarkTheme, focusMode);
    const maxCell = safeNumber(options?.maxCell, defaultMaxCell, minCell, 48);
    const desiredCols = Math.max(minVisibleCols, Math.floor((trackWidth + gap) / (targetCell + gap)));
    const cols = Math.min(maxWeeks, Math.max(minCols, desiredCols));
    const availableCell = Math.floor((trackWidth - Math.max(0, cols - 1) * gap) / Math.max(cols, 1));
    const cell = Math.max(2, Math.min(maxCell, availableCell >= minCell ? Math.max(minCell, availableCell) : availableCell));
    const gridW = cols * cell + Math.max(0, cols - 1) * gap;
    const gridH = 7 * cell + 6 * gap;

    return { cols, cell, gridW, gridH, gap };
  }

  function getContributionMaxCell(rangeWeeks, enlargedMarkTheme, focusMode) {
    if (focusMode) {
      if (rangeWeeks <= 4) return enlargedMarkTheme ? 38 : 34;
      if (rangeWeeks <= 8) return enlargedMarkTheme ? 34 : 30;
      if (rangeWeeks <= 12) return enlargedMarkTheme ? 30 : 26;
      if (rangeWeeks <= 16) return enlargedMarkTheme ? 26 : 22;
      if (rangeWeeks <= 26) return enlargedMarkTheme ? 18 : 16;
      return enlargedMarkTheme ? 16 : 14;
    }

    if (rangeWeeks <= 4) return enlargedMarkTheme ? 26 : 22;
    if (rangeWeeks <= 8) return enlargedMarkTheme ? 24 : 20;
    if (rangeWeeks <= 12) return enlargedMarkTheme ? 22 : 18;
    if (rangeWeeks <= 16) return enlargedMarkTheme ? 20 : 16;
    if (rangeWeeks <= 26) return enlargedMarkTheme ? 14 : 12;
    return enlargedMarkTheme ? 12 : 10;
  }

  function estimateContributionSectionHeight(contributions, trackWidth, theme, options) {
    if (!contributions?.weeks?.length || trackWidth <= 0) return 0;
    const weeks = getContributionWeeks(contributions, options?.range);
    if (!weeks.length) return 0;

    const { gridH } = getContributionGridGeometry(
      weeks.length,
      trackWidth,
      theme,
      options
    );
    const contentTop = safeNumber(options?.contentTop, 24, 0, 240);
    const footerH = options?.showFooter === false ? 0 : 16;
    const bottomPad = safeNumber(options?.bottomPad, 8, 0, 80);

    return contentTop + gridH + footerH + bottomPad;
  }

  function shouldRenderLangIcons(state) {
    return state.langStyle === "icons" && !!state.langIconsUri;
  }

  function getLangDisplayCount(state, topLangs, options) {
    if (!topLangs?.length) return 0;

    if (shouldRenderLangIcons(state)) {
      const maxIcons = safeNumber(options?.maxIcons, 4, 1, 12);
      const requested = state.langIconCount ?? topLangs.length;
      return Math.min(topLangs.length, requested, maxIcons);
    }

    return Math.min(topLangs.length, safeNumber(options?.maxBars, topLangs.length, 1, 12));
  }

  function getLangSectionHeight(state, langCount, options) {
    if (!langCount) return 0;

    const contentTop = safeNumber(options?.contentTop, 22, 0, 120);
    const bottomPad = safeNumber(options?.bottomPad, 8, 0, 80);
    const contentH =
      shouldRenderLangIcons(state)
        ? (ICON_SIZES[state.iconSize] ?? ICON_SIZES.md)
        : langCount * 18;

    return contentTop + contentH + bottomPad;
  }

  function getContributionOptions(state, overrides) {
    return {
      range: state.contribRange,
      mode: state.contribMode,
      capybaraSpriteUri: state.capybaraSpriteUri,
      ...(overrides || {}),
    };
  }

  function getAmberContributionOptions(state, overrides) {
    const rangeWeeks = getContributionRangeLimit(state.contribRange);
    const focusMode = state.contribMode === "focus";
    const enlargedMarkTheme = usesLargeContributionMarks(state.contribTheme);

    return getContributionOptions(state, {
      targetCell: state.contribMode === "focus" ? 18 : 6,
      minCols: state.contribMode === "focus" ? 1 : 32,
      minCell: state.contribMode === "focus" ? 9 : 5,
      maxCell: getContributionMaxCell(rangeWeeks, enlargedMarkTheme, focusMode),
      showFooter: false,
      contentTop: 31,
      bottomPad: 2,
      ...(overrides || {}),
    });
  }

  function getObsidianResponseRequiredHeight(state, topLangs, contributions, mainW) {
    const sectionGap = 12;
    const panelHeaderH = 34;
    const panelBottomPad = 8;
    let required = 0;

    if (topLangs?.length) {
      const langCount = getLangDisplayCount(state, topLangs, { maxIcons: 6 });
      required += getLangSectionHeight(state, langCount, { contentTop: 22, bottomPad: 8 });
    }

    if (contributions?.weeks?.length) {
      if (required > 0) required += sectionGap;
      required += estimateContributionSectionHeight(
        contributions,
        mainW - 44,
        state.contribTheme,
        getContributionOptions(state, { contentTop: 28, bottomPad: 8 })
      );
    }

    if (required > 0) {
      return panelHeaderH + required + panelBottomPad;
    }

    if (state.githubStats) {
      return 42 + (state.stats || STAT_KEYS).length * 18;
    }

    return 88;
  }

  function getPrismLowerRequirements(state, topLangs, contributions, llW, lrW) {
    const llRequired = topLangs?.length
      ? 42 + (state.stats || STAT_KEYS).length * 18
      : (state.hideCommand ? 88 : 96);
    const lmRequired = state.hideCommand ? 88 : 96;

    let lrRequired = 74;
    const sectionGap = 12;
    const panelHeaderH = 34;
    const panelBottomPad = 8;
    let activityRequired = 0;

    if (topLangs?.length) {
      const langCount = getLangDisplayCount(state, topLangs, { maxIcons: 6 });
      activityRequired += getLangSectionHeight(state, langCount, { contentTop: 22, bottomPad: 8 });
    }

    if (contributions?.weeks?.length) {
      if (activityRequired > 0) activityRequired += sectionGap;
      activityRequired += estimateContributionSectionHeight(
        contributions,
        lrW - 36,
        state.contribTheme,
        getContributionOptions(state, { contentTop: 28, bottomPad: 8 })
      );
    }

    if (activityRequired > 0) {
      lrRequired = panelHeaderH + activityRequired + panelBottomPad;
    } else if (state.githubStats) {
      lrRequired = 42 + (state.stats || STAT_KEYS).length * 18;
    }

    return {
      llRequired,
      lmRequired,
      lrRequired,
      lowerRequired: Math.max(llRequired, lmRequired, lrRequired),
    };
  }

  function fitsAmberAutoHeight(state, topLangs, contributions) {
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;
    const footerY = outerY + outerH - 54;
    const contentY = outerY + 36;
    const leftW = Math.min(380, Math.round(outerW * 0.42));
    const leftH = Math.max(footerY - contentY - 8, 0);
    const showProfile = !!state.profileUri && !state.hideProfile;
    const profileCy = contentY + 54;
    const dividerY = profileCy + 32 + 14;
    const aboutLabelY = dividerY + 14;
    const roleY = showProfile ? aboutLabelY + 24 : contentY + 44;
    const bioTopY = roleY + 26;
    const bioTextW = Math.max(40, leftW - 40);
    const bioLines = wrapTextBlock(state.bio || state.tagline, bioTextW, 48, { fontSize: 12 });
    const leftRequired = bioLines.length
      ? bioTopY - contentY + bioLines.length * 17 + 10
      : roleY - contentY + 18;

    if (leftH < leftRequired) return false;
    if (!state.githubStats) return true;

    const leftX = 54;
    const rightX = leftX + leftW + 18;
    const rightW = Math.max(state.width - rightX - 54, 0);
    const rightY = contentY;
    const rpDataTop = rightY + 16;
    const rpDataBot = Math.max(footerY - 12, rpDataTop);
    const statKeys = state.stats || STAT_KEYS;
    const statsH = statKeys.length * 18;
    const showStats = state.githubStats && (rpDataBot - rpDataTop) >= statsH + 16;

    if (!showStats) return false;

    const statsEndY = rpDataTop + 24 + statsH;
    const rpModuleTop = statsEndY + 18;
    const moduleGap = 14;
    const rpModuleAvail = rpDataBot - rpModuleTop;
    const hasLangs = !!topLangs?.length;
    const hasContribs = !!contributions?.weeks?.length;
    const maxBarLangs = hasLangs
      ? Math.min(topLangs.length, Math.max(0, Math.floor(Math.max(0, rpModuleAvail - 30) / 18)))
      : 0;
    const langCount = shouldRenderLangIcons(state)
      ? getLangDisplayCount(state, topLangs, { maxIcons: 4 })
      : maxBarLangs;
    const langModuleH = getLangSectionHeight(state, langCount, { contentTop: 22, bottomPad: 8 });
    const canShowLangsFirst = hasLangs && langCount > 0 && rpModuleAvail >= langModuleH;
    const langContentH = !canShowLangsFirst
      ? 0
      : shouldRenderLangIcons(state)
        ? (ICON_SIZES[state.iconSize] ?? ICON_SIZES.md)
        : langCount * 18;
    const langModuleTotalH = canShowLangsFirst ? langContentH + 30 : 0;

    const contribModuleTop = rpModuleTop + (canShowLangsFirst ? langModuleTotalH + moduleGap : 0);
    const contribSectionH = estimateContributionSectionHeight(
        contributions,
        rightW - 36,
        state.contribTheme,
        getAmberContributionOptions(state)
      );
    const canShowContribs = hasContribs && (rpDataBot - contribModuleTop - 4) >= contribSectionH;
    const showLangs = canShowLangsFirst;

    if (hasContribs && !canShowContribs) return false;
    if (hasLangs && !showLangs) return false;
    return true;
  }

  function fitsObsidianAutoHeight(state, topLangs, contributions) {
    const outerW = state.width - 56;
    const leftW = Math.min(260, Math.round(outerW * 0.27));
    const mainW = Math.max(state.width - (52 + leftW + 18) - 52, 0);
    const availH = state.height - 210;
    const minMainH = 160;
    const requiredResponseH = getObsidianResponseRequiredHeight(state, topLangs, contributions, mainW);

    return availH >= minMainH + 14 + requiredResponseH;
  }

  function fitsPrismAutoHeight(state, topLangs, contributions) {
    const innerW = state.width - 116;
    const llW = Math.round(innerW * 0.345);
    const lmW = Math.round(innerW * 0.195);
    const lrW = innerW - llW - lmW - 28;
    const { lowerRequired } = getPrismLowerRequirements(state, topLangs, contributions, llW, lrW);
    const minCardH = 154;
    const outerH = state.height - 124;

    return outerH >= minCardH + 14 + lowerRequired;
  }

  function fitsClassicAutoHeight(state, topLangs, contributions) {
    if (!state.githubStats) return true;

    const pad = 28;
    const contentX = state.hideAvatar ? pad + 28 : 256;
    const contentW = state.width - contentX - pad - 28;
    const dataH = state.height - 392;
    let requiredDataH = (state.stats || STAT_KEYS).length * 18;
    const focusContribs = isContributionFocus(state, contributions);

    if (contributions?.weeks?.length) {
      requiredDataH += 10 + estimateContributionSectionHeight(
        contributions,
        contentW,
        state.contribTheme,
        getContributionOptions(state, { contentTop: 8, bottomPad: 4 })
      );
    } else if (topLangs?.length && !focusContribs) {
      const langCount = getLangDisplayCount(state, topLangs, { maxIcons: 6 });
      requiredDataH += 10 + getLangSectionHeight(state, langCount, {
        contentTop: state.langStyle === "icons" ? 0 : 0,
        bottomPad: 8,
      });
    }

    return dataH >= requiredDataH;
  }

  function resolveAutoHeight(state, topLangs, contributions) {
    const minHeight = 420;
    const maxHeight = 1400;
    const fits =
      state.provider === "amber"
        ? fitsAmberAutoHeight
        : state.provider === "obsidian"
        ? fitsObsidianAutoHeight
        : state.provider === "prism"
        ? fitsPrismAutoHeight
        : fitsClassicAutoHeight;

    for (let height = minHeight; height <= maxHeight; height += 10) {
      if (fits({ ...state, height }, topLangs, contributions)) {
        return height;
      }
    }

    return maxHeight;
  }

  function buildContributionGrid(contributions, x, y, trackWidth, theme, palette, options) {
    if (!contributions?.weeks?.length) return "";
    const weeksForRange = getContributionWeeks(contributions, options?.range);
    if (!weeksForRange.length) return "";

    const { cols, cell, gridH, gap } = getContributionGridGeometry(
      weeksForRange.length,
      trackWidth,
      theme,
      options
    );
    const weeks = weeksForRange.slice(-cols);
    const colors = getContributionThemeColors(theme, palette);
    const title = options?.title || "CONTRIBUTIONS";
    const labelColor = options?.labelColor || palette.dim;
    const summary = getContributionRangeSummary(contributions, options?.range);
    const totalLabel = `${formatCompactStat(summary.total)} ${summary.label}`;
    const activeLabel = `${summary.activeDays} active days`;
    const showFooter = options?.showFooter !== false;
    const spriteTheme = theme === "popcat" || theme === "capybara_onsen";
    const spriteIdBase = `${theme.replace(/[^a-z0-9_-]/g, "-")}-contrib-${Math.round(x)}-${Math.round(y)}-${Math.round(trackWidth)}`;
    const spriteSheetId = `${spriteIdBase}-sheet`;
    const spriteGrayId = `${spriteIdBase}-gray`;
    const spriteUri = theme === "capybara_onsen"
      ? (options?.capybaraSpriteUri || CAPYBARA_ONSEN_CONTRIB_SPRITE_URI)
      : POPCAT_CONTRIB_SPRITE_URI;
    const spriteBaseDefs = spriteTheme
      ? `<defs>
    <image id="${spriteSheetId}" x="0" y="0" width="160" height="32" href="${spriteUri}" preserveAspectRatio="none" style="image-rendering: pixelated;"></image>
    <filter id="${spriteGrayId}" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"></feColorMatrix>
    </filter>
  </defs>`
      : "";
    const spriteClipDefs = [];

    const cells = [];
    const connectorSegments = [];

    weeks.forEach((week, col) => {
      (week.days || []).forEach((day, row) => {
        const px = x + col * (cell + gap);
        const py = y + row * (cell + gap);
        const level = day?.level || 0;
        const cx = px + cell / 2;
        const cy = py + cell / 2;

        if (theme === "cat_jump") {
          const rx = Math.max(2, Math.floor(cell * 0.2));
          const catUri = CAT_CONTRIB_TILE_URIS[level] || CAT_CONTRIB_TILE_URIS[0];
          const eyeY = py + cell * 0.29;
          const eyeLeftX = px + cell * 0.68;
          const eyeRightX = px + cell * 0.88;
          const eyeCenterX = px + cell * 0.78;
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${rx}" fill="${colors.levels[level] || colors.base}"></rect>`);
          if (level > 0) {
            const haloRx = Math.max(2.4, cell * (0.14 + level * 0.045));
            const haloRy = Math.max(1.8, cell * (0.1 + level * 0.032));
            const coreR = Math.max(1.2, cell * (0.055 + level * 0.018));
            cells.push(`<ellipse cx="${eyeCenterX}" cy="${eyeY}" rx="${haloRx.toFixed(2)}" ry="${haloRy.toFixed(2)}" fill="${colors.eyeGlowLevels?.[level] || colors.glow}"></ellipse>`);
            cells.push(`<circle cx="${eyeCenterX}" cy="${eyeY}" r="${coreR.toFixed(2)}" fill="${colors.eyeCoreLevels?.[level] || colors.glow}"></circle>`);
          }
          cells.push(`<image x="${px}" y="${py}" width="${cell}" height="${cell}" href="${catUri}" preserveAspectRatio="none" style="image-rendering: pixelated;"></image>`);
          if (level > 0) {
            const eyeR = Math.max(0.65, cell * (0.02 + level * 0.006));
            const highlight = colors.eyeHighlightLevels?.[level] || "#f4fff8";
            cells.push(`<circle cx="${eyeLeftX}" cy="${eyeY}" r="${eyeR.toFixed(2)}" fill="${highlight}"></circle>`);
            cells.push(`<circle cx="${eyeRightX}" cy="${eyeY}" r="${eyeR.toFixed(2)}" fill="${highlight}"></circle>`);
            if (level >= 4) {
              cells.push(`<path d="M ${(eyeRightX + eyeR * 1.5).toFixed(2)} ${eyeY.toFixed(2)} L ${(eyeRightX + eyeR * 3.4).toFixed(2)} ${eyeY.toFixed(2)}" stroke="#f4fff8" stroke-width="${Math.max(0.45, cell * 0.025).toFixed(2)}" stroke-linecap="round" opacity="0.42"></path>`);
            }
          }
          return;
        }

        if (theme === "popcat" || theme === "capybara_onsen") {
          const isCapybara = theme === "capybara_onsen";
          const rx = Math.max(2, Math.floor(cell * 0.2));
          const glow = (isCapybara ? colors.onsenGlowLevels?.[level] : colors.popGlowLevels?.[level]) || colors.glow;
          const clipId = `${spriteIdBase}-clip-${col}-${row}`;
          const scale = cell / 32;
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${rx}" fill="${colors.levels[level] || colors.base}"></rect>`);
          spriteClipDefs.push(`<clipPath id="${clipId}" clipPathUnits="userSpaceOnUse"><rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${rx}"></rect></clipPath>`);
          if (level > 0) {
            cells.push(`<ellipse cx="${(px + cell * (isCapybara ? 0.56 : 0.62)).toFixed(2)}" cy="${(py + cell * (isCapybara ? 0.68 : 0.43)).toFixed(2)}" rx="${Math.max(2.2, cell * (0.16 + level * 0.03)).toFixed(2)}" ry="${Math.max(1.8, cell * (0.1 + level * 0.026)).toFixed(2)}" fill="${glow}" opacity="${0.25 + level * 0.07}"></ellipse>`);
            if (!isCapybara && level >= 3) {
              const sparkX = px + cell * 0.84;
              const sparkY = py + cell * 0.22;
              const sparkR = Math.max(0.9, cell * 0.08);
              cells.push(`<path d="M ${sparkX.toFixed(2)} ${(sparkY - sparkR).toFixed(2)} L ${sparkX.toFixed(2)} ${(sparkY + sparkR).toFixed(2)} M ${(sparkX - sparkR).toFixed(2)} ${sparkY.toFixed(2)} L ${(sparkX + sparkR).toFixed(2)} ${sparkY.toFixed(2)}" stroke="${colors.popSpark}" stroke-width="${Math.max(0.45, cell * 0.04).toFixed(2)}" stroke-linecap="round" opacity="${level === 4 ? 0.72 : 0.44}"></path>`);
            }
          }
          cells.push(`<g clip-path="url(#${clipId})"${theme === "popcat" && level === 0 ? ` filter="url(#${spriteGrayId})"` : ""}>
      <use href="#${spriteSheetId}" transform="translate(${(px - level * cell).toFixed(2)} ${py.toFixed(2)}) scale(${scale.toFixed(4)})"></use>
    </g>`);
          return;
        }

        if (theme === "moon") {
          const moonR = Math.max(2.8, cell * 0.32);
          const moonFill = colors.moonFillLevels?.[level] || colors.accent;
          const moonCore = colors.moonCoreLevels?.[level] || "#ffffff";
          const moonGlow = colors.moonGlowLevels?.[level] || colors.glow;
          const shadowOffset = buildMoonShadowOffset(level, moonR);
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(3, Math.floor(cell * 0.34))}" fill="${colors.levels[level] || colors.base}"></rect>`);
          cells.push(`<circle cx="${cx}" cy="${cy}" r="${Math.max(3.2, moonR * 1.34)}" fill="${moonGlow}" opacity="${level === 0 ? 0 : 0.16 + level * 0.06}"></circle>`);
          cells.push(`<circle cx="${cx}" cy="${cy}" r="${moonR}" fill="${level === 0 ? colors.moonShadow : moonFill}"></circle>`);
          if (level > 0) {
            cells.push(`<circle cx="${cx - moonR * 0.18}" cy="${cy - moonR * 0.18}" r="${Math.max(0.9, moonR * 0.42)}" fill="${moonCore}" opacity="${0.2 + level * 0.12}"></circle>`);
            if (shadowOffset !== null) {
              cells.push(`<circle cx="${cx + shadowOffset}" cy="${cy}" r="${moonR}" fill="${colors.moonShadow}"></circle>`);
            }
          }
          return;
        }

        if (theme === "star") {
          const glowColor = colors.glowLevels?.[level] || colors.glow;
          const glowOpacity = [0, 0.18, 0.28, 0.38, 0.52][level] ?? 0.22;
          const outerR = Math.max(2.6, cell * (0.22 + level * 0.03));
          const innerR = outerR * 0.46;
          const coreOuterR = outerR * 0.56;
          const coreInnerR = innerR * 0.56;
          const starFill = colors.starFillLevels?.[level] || colors.accent;
          const starCore = colors.starCoreLevels?.[level] || "#ffffff";
          const starStroke = colors.starStrokeLevels?.[level] || "transparent";
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.26))}" fill="${level === 0 ? "#111111" : (colors.levels[level] || colors.base)}"></rect>`);
          if (level > 0) {
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${Math.max(2.2, cell * 0.36)}" fill="${glowColor}" opacity="${glowOpacity}"></circle>`);
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${Math.max(1.4, cell * 0.2)}" fill="${glowColor}" opacity="${Math.min(0.92, glowOpacity + 0.18)}"></circle>`);
            cells.push(`<polygon points="${buildStarPoints(cx, cy, outerR, innerR)}" fill="${starFill}" stroke="${starStroke}" stroke-width="${Math.max(0.5, cell * 0.05)}"></polygon>`);
            cells.push(`<polygon points="${buildStarPoints(cx, cy, coreOuterR, coreInnerR)}" fill="${starCore}" opacity="${0.42 + level * 0.12}"></polygon>`);
            if (level >= 3) {
              const sparkX = cx + outerR * 0.95;
              const sparkY = cy - outerR * 0.95;
              const sparkR = Math.max(1.1, cell * 0.12);
              cells.push(`<path d="M ${sparkX} ${sparkY - sparkR} L ${sparkX} ${sparkY + sparkR} M ${sparkX - sparkR} ${sparkY} L ${sparkX + sparkR} ${sparkY}" stroke="${starCore}" stroke-width="${Math.max(0.5, cell * 0.05)}" stroke-linecap="round" opacity="${0.55 + level * 0.08}"></path>`);
            }
          }
          return;
        }

        if (theme === "orbit") {
          const orbitR = Math.max(2.4, cell * 0.31);
          const innerOrbitR = orbitR * 0.62;
          const planetR = Math.max(1.4, cell * (0.11 + level * 0.03));
          const planetFill = colors.orbitPlanetLevels?.[level] || colors.accent;
          const planetCore = colors.orbitCoreLevels?.[level] || "#ffffff";
          const ringColor = colors.orbitRingLevels?.[level] || colors.glow;
          const satelliteFill = colors.orbitSatelliteLevels?.[level] || "#ffffff";
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.28))}" fill="${colors.levels[level] || colors.base}"></rect>`);
          if (level > 0) {
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${Math.max(3.2, orbitR * 1.24)}" fill="${colors.glow}" opacity="${0.1 + level * 0.06}"></circle>`);
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${orbitR}" fill="none" stroke="${ringColor}" stroke-width="${Math.max(0.6, cell * 0.06)}" opacity="${0.45 + level * 0.1}"></circle>`);
            if (level >= 3) {
              cells.push(`<circle cx="${cx}" cy="${cy}" r="${innerOrbitR}" fill="none" stroke="${ringColor}" stroke-width="${Math.max(0.45, cell * 0.045)}" opacity="${0.4 + level * 0.08}"></circle>`);
            }
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${planetR}" fill="${planetFill}"></circle>`);
            cells.push(`<circle cx="${cx - planetR * 0.18}" cy="${cy - planetR * 0.18}" r="${Math.max(0.7, planetR * 0.45)}" fill="${planetCore}" opacity="${0.55 + level * 0.08}"></circle>`);
            if (level >= 2) {
              cells.push(`<circle cx="${cx + orbitR * 0.76}" cy="${cy - orbitR * 0.1}" r="${Math.max(0.8, cell * 0.1)}" fill="${satelliteFill}" opacity="${0.72 + level * 0.05}"></circle>`);
            }
            if (level >= 4) {
              cells.push(`<circle cx="${cx - orbitR * 0.54}" cy="${cy + orbitR * 0.48}" r="${Math.max(0.7, cell * 0.09)}" fill="${satelliteFill}" opacity="0.9"></circle>`);
            }
          }
          return;
        }

        if (theme === "signal") {
          const signalCenterY = cy + cell * 0.12;
          const dotFill = colors.signalDotLevels?.[level] || colors.accent;
          const arcStroke = colors.signalArcLevels?.[level] || colors.glow;
          const glowFill = colors.signalGlowLevels?.[level] || colors.glow;
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.26))}" fill="${colors.levels[level] || colors.base}"></rect>`);
          if (level > 0) {
            cells.push(`<circle cx="${cx}" cy="${signalCenterY}" r="${Math.max(1.2, cell * 0.12)}" fill="${dotFill}"></circle>`);
            cells.push(`<circle cx="${cx}" cy="${signalCenterY}" r="${Math.max(2.4, cell * 0.26)}" fill="${glowFill}" opacity="${0.12 + level * 0.05}"></circle>`);
            const arcRadii = [cell * 0.2, cell * 0.31, cell * 0.42];
            arcRadii.slice(0, Math.min(level, 3)).forEach((radius, index) => {
              cells.push(`<path d="${buildArcPath(cx, signalCenterY, radius, 208, 332)}" fill="none" stroke="${arcStroke}" stroke-width="${Math.max(0.55, cell * (0.045 + index * 0.01))}" stroke-linecap="round" opacity="${0.55 + index * 0.12}"></path>`);
            });
            if (level >= 4) {
              cells.push(`<path d="M ${cx.toFixed(2)} ${(signalCenterY - cell * 0.46).toFixed(2)} L ${cx.toFixed(2)} ${(signalCenterY - cell * 0.18).toFixed(2)}" stroke="${dotFill}" stroke-width="${Math.max(0.6, cell * 0.06)}" stroke-linecap="round" opacity="0.9"></path>`);
            }
          }
          return;
        }

        if (theme === "citylight") {
          const windowFill = colors.windowLevels?.[level] || colors.accent;
          const roofFill = colors.roofLevels?.[level] || colors.glow;
          const insetX = px + Math.max(1.2, cell * 0.18);
          const insetY = py + Math.max(1.2, cell * 0.16);
          const buildingW = Math.max(4, cell - (insetX - px) * 2);
          const buildingH = Math.max(5, cell - (insetY - py) * 1.5);
          const windowW = Math.max(1.1, buildingW * 0.22);
          const windowH = Math.max(1.4, buildingH * 0.18);
          const litCount = [0, 1, 2, 3, 4][level] ?? 0;
          const windows = [
            { x: insetX + buildingW * 0.14, y: insetY + buildingH * 0.18 },
            { x: insetX + buildingW * 0.6, y: insetY + buildingH * 0.18 },
            { x: insetX + buildingW * 0.14, y: insetY + buildingH * 0.56 },
            { x: insetX + buildingW * 0.6, y: insetY + buildingH * 0.56 },
          ];
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.2))}" fill="${colors.levels[level] || colors.base}"></rect>`);
          cells.push(`<rect x="${insetX}" y="${insetY}" width="${buildingW}" height="${buildingH}" rx="${Math.max(1.2, cell * 0.12)}" fill="${level === 0 ? "#13151d" : "#191d28"}"></rect>`);
          if (level > 0) {
            cells.push(`<rect x="${insetX}" y="${insetY}" width="${buildingW}" height="${Math.max(1.2, cell * 0.12)}" rx="${Math.max(0.8, cell * 0.08)}" fill="${roofFill}" opacity="${0.55 + level * 0.08}"></rect>`);
            windows.slice(0, litCount).forEach((win, index) => {
              cells.push(`<rect x="${win.x.toFixed(2)}" y="${win.y.toFixed(2)}" width="${windowW.toFixed(2)}" height="${windowH.toFixed(2)}" rx="${Math.max(0.5, cell * 0.04)}" fill="${windowFill}" opacity="${0.5 + index * 0.08 + level * 0.06}"></rect>`);
            });
            if (level >= 4) {
              cells.push(`<rect x="${(insetX + buildingW * 0.82).toFixed(2)}" y="${(insetY - cell * 0.08).toFixed(2)}" width="${Math.max(0.7, cell * 0.06)}" height="${Math.max(1.8, cell * 0.22)}" rx="${Math.max(0.4, cell * 0.03)}" fill="${windowFill}" opacity="0.92"></rect>`);
            }
          }
          return;
        }

        if (theme === "petal") {
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.36))}" fill="${colors.base}"></rect>`);
          if (level > 0) {
            const petalR = Math.max(1.1, cell * 0.12);
            const spread = cell * 0.18;
            if (level >= 3) {
              cells.push(`<circle cx="${cx - spread}" cy="${cy}" r="${petalR}" fill="${colors.levels[level]}"></circle>`);
              cells.push(`<circle cx="${cx + spread}" cy="${cy}" r="${petalR}" fill="${colors.levels[level]}"></circle>`);
              cells.push(`<circle cx="${cx}" cy="${cy - spread}" r="${petalR}" fill="${colors.levels[level]}"></circle>`);
              cells.push(`<circle cx="${cx}" cy="${cy + spread}" r="${petalR}" fill="${colors.levels[level]}"></circle>`);
            }
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${Math.max(1.6, cell * (0.12 + level * 0.06))}" fill="${colors.levels[level]}"></circle>`);
          }
          return;
        }

        if (theme === "firefly") {
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.48))}" fill="${colors.base}"></rect>`);
          if (level > 0) {
            const r = Math.max(1.4, cell * (0.12 + level * 0.05));
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${r * 2.2}" fill="${colors.glow}" opacity="${0.18 + level * 0.08}"></circle>`);
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${colors.levels[level]}"></circle>`);
          }
          return;
        }

        if (theme === "constellation") {
          cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.34))}" fill="${colors.base}"></rect>`);
          if (level > 0) {
            const nextDay = week.days?.[row + 1];
            const nextWeek = weeks[col + 1]?.days?.[row];
            if (nextDay?.level > 0) {
              connectorSegments.push(`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + cell + gap}" stroke="${colors.glow}" stroke-width="1"></line>`);
            }
            if (nextWeek?.level > 0) {
              connectorSegments.push(`<line x1="${cx}" y1="${cy}" x2="${cx + cell + gap}" y2="${cy}" stroke="${colors.glow}" stroke-width="1"></line>`);
            }
            cells.push(`<circle cx="${cx}" cy="${cy}" r="${Math.max(1.3, cell * (0.11 + level * 0.045))}" fill="${colors.levels[level]}"></circle>`);
          }
          return;
        }

        cells.push(`<rect x="${px}" y="${py}" width="${cell}" height="${cell}" rx="${Math.max(2, Math.floor(cell * 0.4))}" fill="${colors.levels[level]}"></rect>`);
      });
    });

    return `
  <text x="${x}" y="${y - 14}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${labelColor}" letter-spacing="0.5">${title}</text>
  <text x="${x + trackWidth}" y="${y - 14}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="11" fill="${labelColor}">${escapeXml(totalLabel)}</text>
  ${spriteBaseDefs}
  ${spriteClipDefs.length ? `<defs>
    ${spriteClipDefs.join("\n    ")}
  </defs>` : ""}
  <g>
    ${connectorSegments.join("\n    ")}
    ${cells.join("\n    ")}
  </g>
  ${showFooter ? `<text x="${x}" y="${y + gridH + 16}" font-family="IBM Plex Mono, monospace" font-size="10" fill="${labelColor}">${escapeXml(activeLabel)}</text>` : ""}`;
  }

  function normalizeState(input) {
    const state = input || {};
    const rawHeight = state.height ?? defaults.height;
    const heightAuto = isAutoHeightValue(rawHeight) || state.heightAuto === true;
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
    const rawContribTheme = String(state.contribTheme || "").trim().toLowerCase();
    const contribTheme = CONTRIBUTION_THEME_ALIASES[rawContribTheme] || rawContribTheme;

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
      height: safeNumber(rawHeight, 520, 420, 1400),
      heightAuto,
      githubStats: normalizeGithubStats(state.githubStats),
      accent: isValidHex(state.accent) ? String(state.accent) : null,
      showLangs: ["auto", "on", "off"].includes(state.showLangs) ? state.showLangs : "auto",
      showContribs: ["auto", "on", "off"].includes(state.showContribs) ? state.showContribs : defaults.showContribs,
      langCount: safeNumber(state.langCount, 4, 1, 6),
      hideAvatar: parseBool(state.hideAvatar),
      hideCommand: parseBool(state.hideCommand),
      stats: parseStatsList(state.stats),
      excludeLangs: parseExcludeLangs(state.excludeLangs),
      barStyle: ["bar", "dots", "blocks"].includes(state.barStyle) ? state.barStyle : "bar",
      langStyle: ["bar", "icons"].includes(state.langStyle) ? state.langStyle : "bar",
      iconSize: ["sm", "md", "lg"].includes(state.iconSize) ? state.iconSize : "md",
      motion: ["off", "pulse", "scan", "boot"].includes(state.motion) ? state.motion : "off",
      contribTheme: CONTRIBUTION_THEMES.includes(contribTheme) ? contribTheme : defaults.contribTheme,
      contribRange: CONTRIBUTION_RANGES.includes(String(state.contribRange || "").trim().toLowerCase())
        ? String(state.contribRange).trim().toLowerCase()
        : defaults.contribRange,
      contribMode: ["compact", "focus"].includes(state.contribMode) ? state.contribMode : defaults.contribMode,
      langIconsUri: typeof state.langIconsUri === "string" && state.langIconsUri.length > 0 ? state.langIconsUri : null,
      profileUri: typeof state.profileUri === "string" && state.profileUri.length > 0 ? state.profileUri : null,
      capybaraSpriteUri: typeof state.capybaraSpriteUri === "string" && state.capybaraSpriteUri.length > 0 ? state.capybaraSpriteUri : null,
      hideProfile: parseBool(state.hideProfile),
      langIconCount: typeof state.langIconCount === "number" ? state.langIconCount : null,
      bio: String(state.bio || "").slice(0, 400),
    };
  }

  function serializeState(state) {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (key === "provider" || key === "githubStats") return;
      if (key === "heightAuto") return;
      if (value === null || value === false || value === "") return;
      if (key === "height" && state.heightAuto) {
        params.set("height", "auto");
        return;
      }
      if (key === "showLangs" && value === "auto") return;
      if (key === "showContribs" && value === defaults.showContribs) return;
      if (key === "contribRange" && value === defaults.contribRange) return;
      if (key === "contribMode" && value === defaults.contribMode) return;
      if (key === "langCount" && value === 4) return;
      if (key === "barStyle" && value === "bar") return;
      if (key === "langStyle" && value === "bar") return;
      if (key === "iconSize" && value === "md") return;
      if (key === "motion" && value === "off") return;
      if (key === "contribTheme" && value === defaults.contribTheme) return;
      if (key === "langIconsUri") return;
      if (key === "profileUri") return;
      if (key === "capybaraSpriteUri") return;
      if (key === "langIconCount") return;
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

  function getMotionBounds(state) {
    return {
      x: 28,
      y: 96,
      width: state.width - 56,
      height: state.height - 124,
    };
  }

  function getMotionStatusAnchor(state) {
    const outerY = 96;
    const outerH = state.height - 124;

    if (state.provider === "amber") {
      const footerY = outerY + outerH - 54;
      return { x: 50, y: footerY + 26 };
    }

    if (state.provider === "obsidian") {
      const footerY = outerY + outerH - 54;
      return { x: 50, y: footerY + 24 };
    }

    if (state.provider === "prism") {
      const cardY = outerY + 36;
      const cardH = Math.min(Math.round(outerH * 0.40), 190);
      const lowerY = cardY + cardH + 14;
      return { x: state.width - 176, y: lowerY + 58 };
    }

    return { x: 56, y: state.height - 54 };
  }

  function buildMotionOverlay(state, palette) {
    if (!state.motion || state.motion === "off") return "";

    const bounds = getMotionBounds(state);
    const status = getMotionStatusAnchor(state);
    const accent = palette.accentAlt || palette.accent;
    const motionId = `motion-${state.provider}-${state.theme}-${state.motion}-${state.width}-${state.height}`;

    if (state.motion === "pulse") {
      return `
  <defs>
    <filter id="${motionId}-pulse-glow" x="-300%" y="-300%" width="700%" height="700%">
      <feGaussianBlur stdDeviation="5"></feGaussianBlur>
    </filter>
  </defs>
  <g aria-hidden="true" pointer-events="none">
    <circle cx="${status.x}" cy="${status.y}" r="12" fill="${accent}" opacity="0.08" filter="url(#${motionId}-pulse-glow)">
      <animate attributeName="r" values="10;14;10" dur="2.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.04;0.12;0.04" dur="2.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="${status.x}" cy="${status.y}" r="5" fill="${palette.success}">
      <animate attributeName="opacity" values="1;0.82;1" dur="2.8s" repeatCount="indefinite"/>
    </circle>
  </g>`;
    }

    if (state.motion === "scan") {
      const sheenWidth = Math.max(120, Math.round(bounds.width * 0.34));
      const sweepStart = bounds.x - sheenWidth - 60;
      const sweepEnd = bounds.x + bounds.width + 60;
      const centerX = bounds.x + bounds.width / 2;
      const centerY = bounds.y + bounds.height / 2;
      return `
  <defs>
    <clipPath id="${motionId}-scan-clip">
      <rect x="${bounds.x}" y="${bounds.y}" width="${bounds.width}" height="${bounds.height}" rx="14"></rect>
    </clipPath>
    <linearGradient id="${motionId}-scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0"></stop>
      <stop offset="44%" stop-color="${accent}" stop-opacity="0"></stop>
      <stop offset="50%" stop-color="${accent}" stop-opacity="0.22"></stop>
      <stop offset="56%" stop-color="${accent}" stop-opacity="0"></stop>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"></stop>
    </linearGradient>
  </defs>
  <g aria-hidden="true" pointer-events="none" clip-path="url(#${motionId}-scan-clip)">
    <rect x="${sweepStart}" y="${bounds.y - 44}" width="${sheenWidth}" height="${bounds.height + 88}" fill="url(#${motionId}-scan-grad)" opacity="0" transform="rotate(-12 ${centerX} ${centerY})">
      <animate attributeName="x" values="${sweepStart};${sweepEnd};${sweepEnd}" keyTimes="0;0.58;1" dur="4.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.24;0.24;0" keyTimes="0;0.18;0.52;1" dur="4.8s" repeatCount="indefinite"/>
    </rect>
  </g>`;
    }

    if (state.motion === "boot") {
      const railWidth = Math.min(164, Math.round(bounds.width * 0.2));
      const railX = bounds.x + bounds.width - railWidth - 26;
      const railY = bounds.y + 22;
      const segmentWidth = Math.max(28, Math.round(railWidth * 0.26));
      return `
  <g aria-hidden="true" pointer-events="none">
    <rect x="${railX}" y="${railY}" width="${railWidth}" height="1.5" rx="0.75" fill="rgba(255,255,255,0.08)"></rect>
    <rect x="${railX}" y="${railY - 0.25}" width="${segmentWidth}" height="2" rx="1" fill="${accent}" opacity="0">
      <animate attributeName="x" values="${railX};${railX + railWidth - segmentWidth};${railX + railWidth - segmentWidth}" keyTimes="0;0.56;1" dur="3.4s" repeatCount="indefinite"/>
      <animate attributeName="width" values="0;${segmentWidth};${segmentWidth};0" keyTimes="0;0.16;0.56;1" dur="3.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.85;0.72;0" keyTimes="0;0.16;0.56;1" dur="3.4s" repeatCount="indefinite"/>
    </rect>
    <circle cx="${railX + railWidth + 10}" cy="${railY + 0.75}" r="1.8" fill="${accent}" opacity="0">
      <animate attributeName="opacity" values="0;0.95;0.95;0;0" keyTimes="0;0.16;0.56;0.72;1" dur="3.4s" repeatCount="indefinite"/>
    </circle>
  </g>`;
    }

    return "";
  }

  function strengthenSvgText(svg) {
    return svg
      .replace("<svg ", '<svg text-rendering="geometricPrecision" ')
      .replaceAll(
        'font-family="IBM Plex Mono, Apple SD Gothic Neo, Malgun Gothic, monospace"',
        `font-family="${SVG_FONT_MONO}"`
      )
      .replaceAll('font-family="IBM Plex Mono, monospace"', `font-family="${SVG_FONT_MONO}"`)
      .replaceAll('font-family="Sora, Arial, sans-serif"', `font-family="${SVG_FONT_SANS}"`)
      .replace(/<text\b(?![^>]*\bfont-weight=)/g, '<text font-weight="500"');
  }

  function applyMotion(svg, state, palette) {
    const baseSvg = strengthenSvgText(svg);
    const overlay = buildMotionOverlay(state, palette);
    if (!overlay) return baseSvg;
    return baseSvg.replace("</svg>", `${overlay}\n</svg>`);
  }

  function buildWindowButtons(provider, surfaces) {
    const colors = surfaces.buttonColors || [surfaces.accent, surfaces.accentAlt, surfaces.success];

    if (provider.buttonMode === "dots") {
      return `
  <circle cx="72" cy="60" r="6" fill="${colors[0]}"></circle>
  <circle cx="96" cy="60" r="6" fill="${colors[1]}"></circle>
  <circle cx="120" cy="60" r="6" fill="${colors[2]}"></circle>`;
    }

    if (provider.buttonMode === "minimal") {
      return `
  <rect x="52" y="52" width="24" height="16" rx="8" fill="${colors[0]}"></rect>
  <rect x="84" y="52" width="24" height="16" rx="8" fill="${colors[1]}"></rect>
  <rect x="116" y="52" width="24" height="16" rx="8" fill="${colors[2]}"></rect>`;
    }

    if (provider.buttonMode === "glow") {
      return `
  <circle cx="70" cy="60" r="8" fill="${colors[0]}"></circle>
  <circle cx="96" cy="60" r="8" fill="${colors[1]}"></circle>
  <circle cx="122" cy="60" r="8" fill="${colors[2]}"></circle>`;
    }

    return `
  <circle cx="68" cy="60" r="8" fill="${colors[0]}"></circle>
  <circle cx="94" cy="60" r="8" fill="${colors[1]}"></circle>
  <circle cx="120" cy="60" r="8" fill="${colors[2]}"></circle>`;
  }

  function buildProfileClipPath(options) {
    const { enabled, clipId, cx, cy, radius } = options;
    if (!enabled) {
      return "";
    }

    return `<clipPath id="${clipId}">
      <circle cx="${cx}" cy="${cy}" r="${radius}"></circle>
    </clipPath>`;
  }

  function buildCircularProfileSlot(options) {
    const {
      showFrame,
      hasProfileImage,
      cx,
      cy,
      radius,
      frameFill,
      profileUri,
      clipId,
      avatar,
      fallbackFill,
      fallbackFontSize = 18,
      fallbackFontWeight = 600,
      fallbackYOffset = 6,
    } = options;

    if (!showFrame) {
      return "";
    }

    return `
  <circle cx="${cx}" cy="${cy}" r="${radius + 2}" fill="${frameFill}"/>
  ${hasProfileImage
    ? `<image x="${cx - radius}" y="${cy - radius}" width="${radius * 2}" height="${radius * 2}" href="${escapeXml(profileUri)}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice"/>`
    : `<text x="${cx}" y="${cy + fallbackYOffset}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="${fallbackFontSize}" font-weight="${fallbackFontWeight}" fill="${fallbackFill}">${escapeXml(avatar)}</text>`}`;
  }

  function buildAmberDashboard(state, palette, provider, topLangs, contributions, surfaces) {
    return externalBuildAmberDashboard(state, palette, provider, topLangs, contributions, surfaces, {
      ICON_SIZES,
      STAT_KEYS,
      buildCircularProfileSlot,
      buildContributionGrid,
      buildLangBars,
      buildLangIcons,
      buildProfileClipPath,
      buildStatBars,
      escapeXml,
      estimateContributionSectionHeight,
      getAmberContributionOptions,
      getLangDisplayCount,
      getLangSectionHeight,
      getStatusText,
      renderBoldLine,
      safeSvgId,
      shouldRenderLangIcons,
      truncateText,
      truncateTextPx,
      wrapTextBlock,
    });
  }

  function buildObsidianWorkspace(state, palette, provider, topLangs, contributions, surfaces) {
    return externalBuildObsidianWorkspace(state, palette, provider, topLangs, contributions, surfaces, {
      buildCircularProfileSlot,
      buildContributionGrid,
      buildLangBars,
      buildLangIcons,
      buildProfileClipPath,
      buildStatBars,
      escapeXml,
      estimateContributionSectionHeight,
      getContributionOptions,
      getLangDisplayCount,
      getLangSectionHeight,
      getObsidianResponseRequiredHeight,
      getStatusText,
      safeSvgId,
      shouldRenderLangIcons,
      truncateText,
      truncateTextPx,
    });
  }

  function buildPrismCanvas(state, palette, provider, topLangs, contributions, surfaces) {
    return externalBuildPrismCanvas(state, palette, provider, topLangs, contributions, surfaces, {
      ICON_SIZES,
      buildCircularProfileSlot,
      buildContributionGrid,
      buildLangBars,
      buildLangIcons,
      buildProfileClipPath,
      buildStatBars,
      escapeXml,
      estimateContributionSectionHeight,
      getContributionOptions,
      getLangDisplayCount,
      getLangSectionHeight,
      getPrismLowerRequirements,
      getStatusText,
      safeSvgId,
      shouldRenderLangIcons,
      truncateTextPx,
    });
  }

  function buildClassicLayout(state, palette, provider, surfaces, shellRadius, panelX, bodyTop, topBarFill, topBarText, effectiveTopLangs, effectiveContributions) {
    return externalBuildClassicLayout({
      state,
      palette,
      provider,
      surfaces,
      shellRadius,
      panelX,
      bodyTop,
      topBarFill,
      topBarText,
      effectiveTopLangs,
      effectiveContributions,
    }, {
      STAT_KEYS,
      buildContributionGrid,
      buildLangBars,
      buildLangIcons,
      buildStatBars,
      buildWindowButtons,
      escapeXml,
      estimateContributionSectionHeight,
      getContributionOptions,
      getLangDisplayCount,
      getLangSectionHeight,
      getStatusText,
      isContributionFocus,
      shouldRenderLangIcons,
    });
  }

  function buildSvg(input) {
    let state = normalizeState(input);
    const bodyTop = 72;
    const panelX = 28;
    const effectiveTopLangs =
      state.showLangs !== "off" && state.githubStats && state.githubStats.topLangs
        ? state.githubStats.topLangs
            .filter((l) => !state.excludeLangs.includes(l.name.toLowerCase()))
            .slice(0, state.langCount)
        : null;
    const effectiveContributions = shouldShowContributions(state) ? state.githubStats.contributions : null;

    if (state.heightAuto) {
      state = { ...state, height: resolveAutoHeight(state, effectiveTopLangs, effectiveContributions) };
    }

    const rawPalette = themeMap[state.theme];
    const palette = state.accent ? { ...rawPalette, accent: state.accent } : rawPalette;
    const provider = providerMap[state.provider];
    const surfaces = getProviderSurfaces(state.provider, palette, state.accent || palette.accent);
    const shellRadius = provider.shellRadius;
    const topBarFill = surfaces.chromeFill;
    const topBarText = surfaces.chromeText;

    if (state.provider === "amber") {
      return applyMotion(`
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <defs>
    <linearGradient id="amber-shell" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${surfaces.shellTop}"/>
      <stop offset="100%" stop-color="${surfaces.shellBottom}"/>
    </linearGradient>
    <linearGradient id="bar-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="line-grad-h" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${withAlpha(surfaces.textStrong, 0)}"/>
      <stop offset="25%" stop-color="${withAlpha(surfaces.textStrong, 0.1)}"/>
      <stop offset="75%" stop-color="${withAlpha(surfaces.textStrong, 0.1)}"/>
      <stop offset="100%" stop-color="${withAlpha(surfaces.textStrong, 0)}"/>
    </linearGradient>
    <filter id="glow-accent" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-status" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-dot" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="url(#amber-shell)"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="${topBarFill}"></rect>
  ${buildWindowButtons(provider, surfaces)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="15" fill="${topBarText}">About ${escapeXml(state.name)}</text>
  ${buildAmberDashboard(state, palette, provider, effectiveTopLangs, effectiveContributions, surfaces)}
</svg>`.trim(), state, palette);
    }

    if (state.provider === "obsidian") {
      return applyMotion(`
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="${surfaces.shellFill}"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="${topBarFill}"></rect>
  ${buildWindowButtons(provider, surfaces)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>
  ${buildObsidianWorkspace(state, palette, provider, effectiveTopLangs, effectiveContributions, surfaces)}
</svg>`.trim(), state, palette);
    }

    if (state.provider === "prism") {
      return applyMotion(`
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="${surfaces.shellFill}"></rect>
  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="${topBarFill}"></rect>
  ${buildWindowButtons(provider, surfaces)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>
  ${buildPrismCanvas(state, palette, provider, effectiveTopLangs, effectiveContributions, surfaces)}
</svg>`.trim(), state, palette);
    }

    return applyMotion(
      buildClassicLayout(
        state,
        palette,
        provider,
        surfaces,
        shellRadius,
        panelX,
        bodyTop,
        topBarFill,
        topBarText,
        effectiveTopLangs,
        effectiveContributions
      ),
      state,
      palette
    );
  }

  function buildApiUrl(input, baseUrl) {
    const state = normalizeState(input);
    // Decode all non-ASCII percent-sequences (2-byte, 3-byte, 4-byte UTF-8)
    // so Korean and punctuation remain readable in the URL
    const qs = serializeState(state).toString().replace(
      /(?:%[C-D][0-9A-Fa-f]%[89A-Fa-f][0-9A-Fa-f]|%[EF][0-9A-Fa-f](?:%[89A-Fa-f][0-9A-Fa-f]){2}|%F[0-7](?:%[89A-Fa-f][0-9A-Fa-f]){3})+/g,
      m => { try { return decodeURIComponent(m); } catch { return m; } }
    );
    return `${baseUrl}?${qs}`;
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

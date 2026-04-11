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
  const CAT_CONTRIB_TILE_URIS = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACwUlEQVR42u1Xy27bMBCcIeVDTgaKXFKJIvz/H9XaknLKJ4icHiTalPWwHCTtpQQMmQa1O5ydfRj4vx4vjZ9/C8LCfAsIs5+G7yFhFwBjzNpBnU4nGbONjrSrYdwFQBJKX89+ds6h73s452Gt1dw4dTqdVNfVqu3iGbpIKynwtickQRLeyp8wkEgL6YYlhPBFGpAgBeTOATM+AYNhLwkxxsk58QsAJEfTfXIUryCTZm4rwoAgPwmgwBDbnEoCqqpqZoYLXqQUpk8C6BHgfI2iKJAFf3hYs8lSYoDk50VIEohCUETlHPJ0UogznQzhMJM7SgKJRRYeMaC6rq9AjBlEt3Wje5NJK3XtsVQLzHYBwoieE5Hdf7+nfJo5urKwWwOj8FSWbuIsGRRvjMwc0mSOgRjjBlhgjUs552ZUiwC1vk8glkJ0uVwWfZq9eQ8MzvLbUNvvpbNd18EeisULFwsGpJXSNbudGTJk6VwCQxIxBigss22WXvbebZbk+z6QakICl2fKVhFaY2BZ7UYwWaORNFwpObqrCXOxGQmRjxi4eo5xqGBt+46uadGc21sWSDv6xk393nsIcVcWqK5rkETTNKmrMW/Hr68/8PLy8tw8J6Ft3xOo5SwgqaIoQA7t9N75YCjw4+MDXddNjOftd4kNWgPnSpCcDS7FZOopy5H2M2jNYlwlMcaolBF5VmS5fi1UzjloBFiWb2iabi5CSyPna0hC3/dD7MLWGDH0fBFAFJqmAQyTgJkxo8vlghgjvPcgiyzVh3MGAIIiQgiIMQ4NZ0eHlJQXIiJqVkBGtggC5/MZIQR47+G9R1EUykPA9r0TBVhrITzEMDAgQYx7ZnqSVNd1qKpqLE5xsxesruPxqOPxOGGjPXcI6B/aop2OlU9PxQBwOBxgDEBaRAjnX79RwO5Lx/D8hVdtkRS+6e/aX11/AItnqJQ8+eYsAAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADHElEQVR42u1XTW/bRhSceUtLTVskAQLKgimSaU+55lz02FOB/nL/hCawZcl109hoi34gsLjTw4oSlyIpqkBToOheJEjLfbMz8z4I/L+OL/2nQdiYTSTxrwLof5oqy1IjGOrdMwqAJLzMvmgfoDzPQQFFseiTSXmeqyzL3kjJWAk2bnPwGwWIAGQoigKSBCPgtd9DAvAA2IlxtATebw5YqT/r7zUokjCwsa8/zGgGqkqjzCkJJAMze/i9NrHjLnUiCedcM7C2lO8ChiADoMS/B2DyyRmyLAO8YKCa9DeDkQ7p+QxfvnoVBZaE119/BVg3gMEET+B09mSCNE3hvYfZMN7ZbIbLy0sWRRHxvVwuCUCEQfAczUBFjzRNG26ODdhF+Tfffas2AwBQliVopzEgksjzfBtIUI+Oex8Mr+VyeRAz6TYGlZ7PMJ2e7Q6uL92+fR3czOC972Tp5FL89PkzTCYTABbRGBeXOOVU+cNCtf2PJFarFboslAw1HxGtgoLoxvAK2e0F9aTf7Xq9ZcagDg2TjuCis4B+CJy0U7NP/wZbrOvEUQCLiwx0W668dhWt1rttui4DRiBP9oBtdVUVldPaC7WmMdVVrLsUGXKoXbPt/sXLIlQ9MyTm8P3bN7vD8zzvZOKQBR9S1kJT+un+Pf747XceleDTzz8DALx79x4fPvwZmYak1us1siwLAZ0BlTo9QLpwaQGCUD1uahbYKwFJubMElIcZDhzrvWdVVdt0Cl2hWZqbejcZIYn5fA4DQVK9DCwWC5gZlqsbtMp1dDkpbkj7dkvc3KxBEh4VKGA+nyNJkiBfWeD29haPj4+HAF68SFV3K0mABhAwvulqtYJEmHlAgFegWQDu7u5UF7bnT58Fys3k/f78Ot8CRQKoY5ORDyAtFKNQqDy9D4+3ChEl8deff4GZ4eLiAlmWRVIkAHB/f8+Hh4ea2sGuQmewxAFe8BQq+TFDLa+urjSbn2M6ncI5h81mE3vgWODdJLTI4TcVJB2dD9ogfvzhTu30T3DCioZPEtfX16e+SfCkiaiPhRagf+616WOsvwA0M6YIqCkAPQAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADMklEQVR42u1XTW/sRBCs6tnkCXhIcEB6JPY4G4kr/4Gfyx95B+4cOLFr7564AAeQWE8Xh/HXOt6NQ0C50JKVGa2np6a7qsYB/o/roe55uyDDm4P4TwHYP68MFWMhkivAmV4FoKrKJ1UpigJkQFVVWKqQIbeuqiptt9XF3Jvnjwq4D63gWIG8p7sjxjiAEAFJoPIYLojpFQAEkFwiJ6SFyrpAI9ihFQFbWP+iFpCEmZ3N+81JAkaIeUwS8BGYpL6CLwdguBky+ZhFXcmHDSjkkk9BrYzrLbATYhGR0tjDEHLpScJ95ML3P36EGPBd/AZfvf8SvTZ++eNX/LD/Cd++v3sZAMONJM+bBUNVlZAoMfNCSiANgAMI+PzTT3BvnwF/taAwtGyTDA/vvgAZJCWuboHjhCLe50QueCeAUfU2/nXB3VGn38CbDUIIQ3v+VIvd6fclKfciu2Y0cUi0KBBOAY2yM7NujUPKBA007Pd7rmoBSZVl+YRUUyCScismvkAZcKaQAMlhINzb1RxQjBGSsobBxQrMmS4Sc1OermuOx/Uk7FnOybhP1s/7sYFwjNUYvKD7/dA0AAloud12PuFgp32SPuF0fmZI9MGMphsPT55zlRG5AfGhgnnvYA6HkFK6SMQhRaeE6XtT4Ouc0NVJLqOHEQZlgs0qMCVo3xazBW7k93TlrhuNxzZCeV8MAJqmGZJ01+4iwZY4BIxmVNf1xTaMAMxUFMWwAEbAzxapLMuLJZ2Sc16ppml6UMtOaGbqSyl6737zl3k4NMiH8if9nW6Y7wkfxmUV+xtVizLMHxUPCIHY7eqJx89PCfafVwMHBDAY9vt9d6R8HUvCdrtF22YDijGO70wBGKiyigAEdwEmeEqXZTPYbI66qbvTKwNM+bcA08/7HUiiuLuHe1dZo7wd85tjlE//XItTarM83RECIYnuTs2MJsEJF5Wch8MBklAUEXcfvj5TxQYAm6YRAIRc+avC3ViAw5/90pkRlMfjUflGtEUrJgCkZxI+Pj4qpVO+4TrCrv6Ml2G3q7HZ2Ez+L4jcqsz+29tb1Ltm/VokAmDbOvGaIKFOTm/7P+O/FX8DwQf4BRl7lR0AAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADjElEQVR42u2Xv48bVRDHPzO7tu9CcRB+Kfb+SBBp0yBR0CAKGpAQBQV/JBUSoqJHUEGFOJ0S79pRImiQSMLded+X4nl9Xnt9NkEhDU+ybO/Ovpn5fr8z8xb+X9csM5O766UG4SQC9OL237NkATPjpQUAIGknRWWZC7e9CFnivXT6Ic7zsuh1nuc54JR5xjU0qSxLZeMJIYStm+khIHncW4D1o+LkZYETkWjvSYKg+O3CzLbQPCCA0AtUq4t2Q4t/kHVtlBoITP78Glh3uEsXZoLUwQV+FZwp3tMOHe9FIEmSPuhUFMXquiTS4ZC3yozhaMT5+Tm/3Z+yWMQKevXW2wxGQx7OH9EsLg4PwD3VeHyLRgF33xLRCn4z3rh7m6+++ZoLAo7x5cef8vD0PqPjI376/kebhSd67+49Hp+dHRZAYkM14SJmGUSWZUhSl/sQt0iNH779zhY0etNGCPHazZs88imD4yMAToIzfGXA6MaJzp/+YXsDaHRBURQd/t29k7XkmAlbFkdAPG7+JLEUM8MILBYLAH63C+qffzEbpNorwpREm6Lro2CFRhO498H7esdP7N30dbuTnFj16xlNgMtnf/HRF5/pTnJiH37+iVg03T16uTc0yfJrq2BTC+7O0Y1jlDgexLMnT1eojEYjApAITk9PO35tR+fa2X47NX6ATYwilmZVVe0z12ugLa1NR+sotDabDakvwKqudqK+GYD6IN8W33ZAmxS1drERGVJ/K9pCoFX+ekZ9UPdREELYRsQsdkE9ZyfcJcC+oFqk+uzNTH0orKnRlaTOeDxeZVfXNUhgRpZle6uhL8hoH6jreS8NVwiYmEwmAEyn006AJlM9n1HmRW/mraPN7NvfppWGtClCX4MHSTRa8Xg1+wlmwZhO607/MrPOx923x/RSA3lZYImTpt1OmLbGxe0SE8zqGsOBZqM8gl1VSlgTYcAsTswHDx7EjrlUnAnKsiSEgJuTTzKqqtqiYDVaQ9NgwRDNbqLdVqccScxm89g6lxmHENaedU2nU6Q4zAaDAe7xemvn6/084m57hdU6S5Ik8tsEI8g2+RXBJJnhzGYzLi8vmeRFW+oCSCVZVVVaZbfz7LJeajHYxWKBDnhlEMGcRPP5PI71tcPxwTWVkmhSZkhNPN+5kIxZNSdcR1lPP1giaQc3ou4GCZ7E0VzX1T/JgXXH/2ZpmcULfWX7z9bfmjD10vZnheMAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD6ElEQVR42u1Xz28bRRT+3sw4LlELhdKqTrz+ESGhIlSkcuXECU6cuPBvcUW9w6VIRQIhxLEHLlUOFUKIJt6NHanBNImaumF33sdhdu21vbGdgJQLT9rD7szOe+973/sxwP+yXCgivHQj8uc/F7PqRhG5PPfFViNgjGG326VzjhdFcSUESGBra2vucxRFyLIMjUYDC0LEKIrY2epWLrqVEKBAVSHWkF5lYhghIhARtNttiAhJD1LGa4X4NLs4B8jcOeUUJ4rvJEESqgpSivBM/3uGuFV54L3P7fXhR+fmiOnWavAkHARpmo7XnXNATS5mgIGlwoMkrAAZgZoYNhqNqRBcfes6njzeHmu5e+9DPj94hlqthq2778Gs1dGLB/Cj0flCYJyg0+lArIGnBjREc+8UxhjYmsOTx9vygimf84QHfMnOnS7clTpuv9PBT99+Jw+//gZvN5vnQ8DC0GcaPCUQRREAJcVAVQE4vHbtKjJN8Ws6JEkYABTg0y8+x14ywKMff5bfeMwUGdbfXMfNNxo8ONqXlRDwUESdaEys4hdhIJkIcXJ0DFOvY3j4J0LFDkeerglcfQ0AkGoKktj5ZVuOXx2uFgKBIQDQKwCdWw8IBHk1PMJHN9+V+98/wFc/PMAtWZeHX97Hsz96uHPvA75vb8g1c0U+/uwTnp6OZFrPWbE3hs08ZgoPoZlKPxGCFBgTwmHra7hx+xZUFf7vFC/+OswzB1i//jpEBKOTl0h+30EGL8sMYBRFY6JRAtxCU5nX5Wwo1wZjwn5KeN9P+gWRZSkJiwNVJdRiESi1hIDMNaqiIM0asxcnEAZXlmaBgVCsq/SsUDSrvIxKZdckoWegbeZbFrG52QBl3rOyotlQLNqLBa3cVWCfN6BgzORgDxE752U55lUIBLKy6JayEAFrwJDfMm4mvV4PvV4PSdKHtfZsL6uISUAVaLVaZ3faGecZRS2QRJIksLYG79NJyohls7lxoelob9AHvYLTVW0KAZIB+uCpmVKeh0EGg8EkvWbIV37Kh5JEc2OzSE1WI2CE7agFEWJ3Ny4KTKWr7Xabs/CTxGg0wnA4DNCbYFRzYzNvahYigt2nO/N1wBiw1WqDJLxnUWpl2ZBaGBHHcfk9zPAaSNzvJyx4oBOisgiFCcqQTzMcE23ZhOS9n01LqWK5KsSZGuK9BM45tFpN5CWe5TSUOI6ZN6GFPQIIHBERKLjSbSHTVACwl8RobjRQvue4WT6wovOVpdvtMsuykGbWwDrCwELzUW1R1ABwb7A/pc+dN52MMXDOQDXwYOfpbmD9Ckho5mVhHTjHLYlj0lFA6CVem/6l/APKnDwSmFp8ywAAAABJRU5ErkJggg==",
  ];

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

  // Approximate pixel width per character at 12px
  // IBM Plex Mono ASCII: ~7.2px, Korean/CJK fallback font: ~13px
  function charPxWidth(char) {
    const code = char.codePointAt(0) || 0;
    const isWide = (code >= 0x1100 && code <= 0x11FF) ||
                   (code >= 0x2E80 && code <= 0x9FFF) ||
                   (code >= 0xAC00 && code <= 0xD7AF) ||
                   (code >= 0xF900 && code <= 0xFAFF) ||
                   (code >= 0xFF00 && code <= 0xFFEF);
    const isEmoji = code >= 0x1F300;
    if (isEmoji) return 11.2;
    return isWide ? 10.4 : 6.4;
  }

  function measureTextPx(text) {
    return [...String(text || "")].reduce((width, char) => width + charPxWidth(char), 0);
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

  function measureRichLine(tokens) {
    return tokens.reduce(
      (width, token, index) => width + (index ? charPxWidth(" ") : 0) + measureTextPx(token.text),
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
    const units = groupRichTokens(tokenizeRichWords(text));
    const lines = [];
    let current = [];

    const flush = () => {
      if (current.length && lines.length < maxLines) lines.push(encodeRichLine(current));
      current = [];
    };

    for (const unit of units) {
      if (lines.length >= maxLines) break;
      const unitPx = measureRichLine(unit);

      if (unitPx > limitPx) {
        if (current.length) flush();
        const plainText = unit.map((token) => token.text).join(" ");
        const chars = [...plainText];
        let chunk = [];
        let chunkText = "";
        let chunkPx = 0;
        for (const c of chars) {
          if (lines.length >= maxLines) break;
          const cpx = charPxWidth(c);
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
      const candidatePx = measureRichLine(candidate);
      if (candidatePx <= limitPx) {
        current = candidate;
      } else {
        if (current.length && unit.length > 1) {
          let splitIndex = 0;
          for (let index = 1; index <= unit.length; index += 1) {
            const prefixCandidate = [...current, ...unit.slice(0, index)];
            if (measureRichLine(prefixCandidate) <= limitPx) {
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

  // skillicons.dev renders each icon at 45×45 with 15px gap (60px/icon)
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
    return theme === "cat" || theme === "moon" || theme === "star" || theme === "orbit" || theme === "signal" || theme === "citylight";
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

    if (theme === "cat") {
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
    if (contributions?.weeks?.length) {
      return estimateContributionSectionHeight(
        contributions,
        mainW - 44,
        state.contribTheme,
        getContributionOptions(state, { contentTop: 36, bottomPad: 8 })
      );
    }

    if (topLangs?.length) {
      const langCount = getLangDisplayCount(state, topLangs, { maxIcons: 6 });
      return getLangSectionHeight(state, langCount, { contentTop: 34, bottomPad: 8 });
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
    if (contributions?.weeks?.length) {
      lrRequired = estimateContributionSectionHeight(
        contributions,
        lrW - 36,
        state.contribTheme,
        getContributionOptions(state, { contentTop: 38, bottomPad: 8 })
      );
    } else if (topLangs?.length) {
      const langCount = getLangDisplayCount(state, topLangs, { maxIcons: 6 });
      lrRequired = getLangSectionHeight(state, langCount, { contentTop: 34, bottomPad: 8 });
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
    const bioLines = wrapTextBlock(state.bio || state.tagline, leftW - 18, 48, { slackPx: 26 });
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

    const cells = [];
    const connectorSegments = [];

    weeks.forEach((week, col) => {
      (week.days || []).forEach((day, row) => {
        const px = x + col * (cell + gap);
        const py = y + row * (cell + gap);
        const level = day?.level || 0;
        const cx = px + cell / 2;
        const cy = py + cell / 2;

        if (theme === "cat") {
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
      contribTheme: ["cat", "moon", "star", "orbit", "signal", "citylight", "petal", "moss", "firefly", "constellation"].includes(state.contribTheme) ? state.contribTheme : defaults.contribTheme,
      contribRange: CONTRIBUTION_RANGES.includes(String(state.contribRange || "").trim().toLowerCase())
        ? String(state.contribRange).trim().toLowerCase()
        : defaults.contribRange,
      contribMode: ["compact", "focus"].includes(state.contribMode) ? state.contribMode : defaults.contribMode,
      langIconsUri: typeof state.langIconsUri === "string" && state.langIconsUri.length > 0 ? state.langIconsUri : null,
      profileUri: typeof state.profileUri === "string" && state.profileUri.length > 0 ? state.profileUri : null,
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

  function applyMotion(svg, state, palette) {
    const overlay = buildMotionOverlay(state, palette);
    if (!overlay) return svg;
    return svg.replace("</svg>", `${overlay}\n</svg>`);
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

  function buildAmberDashboard(state, palette, provider, topLangs, contributions, surfaces) {
    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;
    const footerY = outerY + outerH - 54;
    const contentY = outerY + 36;
    const accent = surfaces.accent;
    const dim = surfaces.textMuted;
    const label = surfaces.label;

    // Proportional columns
    const leftX = 54;
    const leftW = Math.min(380, Math.round(outerW * 0.42));
    const leftH = Math.max(footerY - contentY - 8, 0);
    const rightX = leftX + leftW + 18;
    const rightW = Math.max(state.width - rightX - 54, 0);
    const rightY = contentY;

    // Profile image (circular)
    const showProfile = !!state.profileUri && !state.hideProfile;
    const PROFILE_R   = 32;
    const PROFILE_CX  = leftX + 20 + PROFILE_R;
    const PROFILE_CY  = contentY + 54;            // more top breathing room
    const DIVIDER_Y   = PROFILE_CY + PROFILE_R + 14;
    const ABOUT_LBL_Y = DIVIDER_Y + 14;

    // Dynamic Y positions for left panel content
    const ROLE_Y    = showProfile ? ABOUT_LBL_Y + 24 : contentY + 44;
    const BIO_TOP_Y = ROLE_Y + 26;

    // Bio text wrapping (bio overrides tagline in left panel)
    const bioSource = state.bio || state.tagline;
    const BIO_LINE_H = 17;
    const bioMaxLines = Math.max(1, Math.floor((leftH - (ROLE_Y - contentY) - 26 - 10) / BIO_LINE_H));
    const BIO_TEXT_W = leftW - 18;  // panel width minus padding, lets copy use more of the card width
    const bioLines = wrapTextBlock(bioSource, BIO_TEXT_W, bioMaxLines, { slackPx: 26 });

    const showLPBio = bioLines.length > 0 && leftH >= (ROLE_Y - contentY + BIO_LINE_H + 10);

    const rpDataTop = rightY + 16;
    const rpDataBot = Math.max(footerY - 12, rpDataTop);

    // Stats in right panel
    const statKeys = state.stats || STAT_KEYS;
    const statsH = statKeys.length * 18;
    const showStats = state.githubStats && (rpDataBot - rpDataTop) >= statsH + 16;
    const STATS_LABEL_Y = rpDataTop + 13;
    const STATS_Y = rpDataTop + 24;
    const statsEndY = showStats ? STATS_Y + statsH : rpDataTop;

    // Langs and contributions stack in independent modules below stats.
    const rpModuleTop = statsEndY + 18;
    const moduleGap = 14;
    const hasContribs = contributions && showStats;
    const hasLangs = topLangs && showStats;
    const rpModuleAvail = rpDataBot - rpModuleTop;
    const maxBarLangs = topLangs
      ? Math.min(topLangs.length, Math.max(0, Math.floor(Math.max(0, rpModuleAvail - 30) / 18)))
      : 0;
    const langCount = shouldRenderLangIcons(state)
      ? getLangDisplayCount(state, topLangs, { maxIcons: 4 })
      : maxBarLangs;
    const langModuleH = getLangSectionHeight(state, langCount, { contentTop: 22, bottomPad: 8 });
    const canShowLangsFirst = hasLangs && langCount > 0 && rpModuleAvail >= langModuleH;
    const preliminaryLangsToShow = canShowLangsFirst ? topLangs.slice(0, langCount) : null;
    const langContentH = !canShowLangsFirst
      ? 0
      : shouldRenderLangIcons(state)
        ? (ICON_SIZES[state.iconSize] ?? ICON_SIZES.md)
        : preliminaryLangsToShow.length * 18;
    const langModuleTotalH = canShowLangsFirst ? langContentH + 30 : 0;

    const contribModuleTop = rpModuleTop + (canShowLangsFirst ? langModuleTotalH + moduleGap : 0);
    const contribAvailH = rpDataBot - contribModuleTop - 4;
    const amberContribOptions = getAmberContributionOptions(state, {
      labelColor: label,
    });
    const contribSectionH = estimateContributionSectionHeight(
      contributions,
      rightW - 36,
      state.contribTheme,
      amberContribOptions
    );
    const canShowContribs = hasContribs && contribAvailH >= contribSectionH;
    const langModuleTop = rpModuleTop;
    const showLangs = canShowLangsFirst;
    const langsToShow = showLangs ? topLangs.slice(0, langCount) : null;
    const LANGS_LABEL_Y = langModuleTop + 11;
    const LANGS_Y = langModuleTop + 22;
    const CONTRIB_DIVIDER_Y = contribModuleTop - 2;
    const CONTRIB_GRID_Y = contribModuleTop + amberContribOptions.contentTop;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="${surfaces.bodyFill}"></rect>
  <rect x="${outerX + 0.5}" y="${outerY + 0.5}" width="${outerW - 1}" height="${outerH - 1}" rx="13.5" stroke="${surfaces.panelStroke}"></rect>

  <rect x="${leftX}" y="${contentY}" width="${leftW}" height="${leftH}" rx="10" fill="${surfaces.panelFill}"></rect>
  <rect x="${leftX + 6}" y="${contentY + 14}" width="2" height="80" rx="1" fill="${accent}" opacity="0.35"></rect>

  ${showProfile ? `<defs>
    <clipPath id="profile-clip-${escapeXml(state.username || "anon")}">
      <circle cx="${PROFILE_CX}" cy="${PROFILE_CY}" r="${PROFILE_R}"/>
    </clipPath>
  </defs>
  <circle cx="${PROFILE_CX}" cy="${PROFILE_CY}" r="${PROFILE_R + 2}" fill="${surfaces.strongLine}"/>
  <image x="${PROFILE_CX - PROFILE_R}" y="${PROFILE_CY - PROFILE_R}" width="${PROFILE_R * 2}" height="${PROFILE_R * 2}" href="${escapeXml(state.profileUri)}" clip-path="url(#profile-clip-${escapeXml(state.username || "anon")})" preserveAspectRatio="xMidYMid slice"/>
  <rect x="${leftX + 20}" y="${DIVIDER_Y}" width="${leftW - 40}" height="1" fill="${surfaces.line}"/>
  <text x="${leftX + 20}" y="${ABOUT_LBL_Y}" font-family="IBM Plex Mono, monospace" font-size="10" fill="${dim}" letter-spacing="0.8">ABOUT</text>
  ${state.username ? `<text x="${PROFILE_CX + PROFILE_R + 16}" y="${PROFILE_CY - 8}" font-family="Sora, Arial, sans-serif" font-size="18" font-weight="700" fill="${surfaces.textStrong}">${escapeXml(state.name)}</text>
  <text x="${PROFILE_CX + PROFILE_R + 16}" y="${PROFILE_CY + 14}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">@${escapeXml(state.username)}</text>` : ""}` : ""}

  <circle cx="${leftX + 24}" cy="${ROLE_Y - 6}" r="3.5" fill="${accent}" filter="url(#glow-accent)"/>
  <text x="${leftX + 34}" y="${ROLE_Y}" font-family="IBM Plex Mono, monospace" font-size="15" fill="${accent}">${escapeXml(truncateText(state.role, 26))}</text>
  ${showLPBio ? bioLines.map((line, i) => {
    const lineY = BIO_TOP_Y + i * BIO_LINE_H;
    if (lineY > contentY + leftH - 10) return "";
    return `<text x="${leftX + 20}" y="${lineY}" font-family="IBM Plex Mono, Apple SD Gothic Neo, Malgun Gothic, monospace" font-size="12" fill="${surfaces.textBody}">${renderBoldLine(line, surfaces.textStrong)}</text>`;
  }).join("\n  ") : ""}

  ${showStats
    ? `<text x="${rightX + 18}" y="${STATS_LABEL_Y}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${label}" letter-spacing="0.5">GITHUB STATS</text>
  ${buildStatBars(state.githubStats, rightX + 18, STATS_Y, rightW - 36, accent, dim, surfaces.softLine, state.stats, state.barStyle, "bar-grad")}
  ${showLangs
    ? `<rect x="${rightX}" y="${rpModuleTop - 8}" width="${rightW}" height="1" fill="${surfaces.line}"></rect>
  <text x="${rightX + 18}" y="${LANGS_LABEL_Y}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${label}" letter-spacing="0.5">TOP LANGS</text>
  ${shouldRenderLangIcons(state) && langsToShow
    ? buildLangIcons(state.langIconsUri, rightX + 18, LANGS_Y, rightW - 36, state.langIconCount ?? langsToShow.length, state.iconSize)
    : buildLangBars(langsToShow, rightX + 18, LANGS_Y, rightW - 36, accent, dim, surfaces.softLine, state.barStyle, "bar-grad")}`
    : ""}
  ${canShowContribs
    ? `<rect x="${rightX}" y="${CONTRIB_DIVIDER_Y}" width="${rightW}" height="1" fill="${surfaces.line}"></rect>
  ${buildContributionGrid(contributions, rightX + 18, CONTRIB_GRID_Y, rightW - 36, state.contribTheme, palette, amberContribOptions)}`
    : ""}`
    : `<text x="${rightX + 18}" y="${rpDataTop + 13}" font-family="IBM Plex Mono, monospace" font-size="11" fill="${label}" letter-spacing="0.5">TAGLINE</text>
  <text x="${rightX + 18}" y="${rpDataTop + 44}" font-family="Sora, Arial, sans-serif" font-size="16" font-weight="600" fill="${surfaces.textStrong}">${escapeXml(truncateText(state.tagline, 52))}</text>
  ${state.role ? `<text x="${rightX + 18}" y="${rpDataTop + 70}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(truncateText(state.role, 36))}</text>` : ""}`}

  <rect x="${outerX}" y="${footerY}" width="${outerW}" height="1" fill="url(#line-grad-h)"></rect>
  <circle cx="${outerX + 22}" cy="${footerY + 26}" r="5" fill="${surfaces.success}" filter="url(#glow-status)"></circle>
  <text x="${outerX + 36}" y="${footerY + 32}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(statusText, 52))}</text>
  ${state.hideCommand ? "" : `<text x="${state.width - 54}" y="${footerY + 32}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">$ ${escapeXml(truncateText(state.command, 32))}</text>`}`;
  }

  function buildObsidianWorkspace(state, palette, provider, topLangs, contributions, surfaces) {
    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;
    const footerY = outerY + outerH - 54;

    const leftX = 52;
    const leftY = 128;
    const leftW = Math.min(260, Math.round(outerW * 0.27));
    const leftH = outerH - 86;  // footerY - leftY: leftY=outerY+32, footerY=outerY+outerH-54 → outerH-86

    const mainX = leftX + leftW + 18;
    const mainY = 128;
    const mainW = state.width - mainX - 52;

    // Proportional main + response heights
    const availH = outerH - 86;
    const responseRequiredH = getObsidianResponseRequiredHeight(state, topLangs, contributions, mainW);
    const minMainH = 160;
    const baseResponseH = Math.max(availH - Math.round(availH * 0.56) - 14, 60);
    const responseH = state.heightAuto
      ? Math.max(responseRequiredH, Math.min(baseResponseH, availH - minMainH - 14))
      : baseResponseH;
    const mainH = Math.max(minMainH, availH - responseH - 14);
    const responseY = mainY + mainH + 14;

    // Scale content inside main panel relative to standard 174px height
    const mS = Math.min(mainH / 174, 1.35);
    const M_LABEL_Y = mainY + 24;
    const M_TAG_Y   = mainY + Math.round(64 * mS);
    const M_DIV_Y   = mainY + Math.round(88 * mS);
    const M_CMD_Y   = mainY + Math.round(122 * mS);
    const M_DOT_CY  = mainY + Math.round(148 * mS);
    const M_STA_TY  = mainY + Math.round(154 * mS);

    const accent = surfaces.accent;
    const ink = surfaces.textStrong;
    const dim = surfaces.textMuted;
    const model = `${provider.label}/${state.theme}`;
    const showContribs = contributions && responseH >= responseRequiredH;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="${surfaces.bodyFill}"></rect>

  <rect x="${leftX}" y="${leftY}" width="${leftW}" height="${leftH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
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

  <rect x="${mainX}" y="${mainY}" width="${mainW}" height="${mainH}" rx="10" fill="${surfaces.panelFill}"></rect>
  <text x="${mainX + 22}" y="${M_LABEL_Y}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  <text x="${mainX + 22}" y="${M_TAG_Y}" font-family="Sora, Arial, sans-serif" font-size="22" font-weight="700" fill="${ink}">${escapeXml(
    truncateText(state.tagline, 36)
  )}</text>
  <rect x="${mainX + 22}" y="${M_DIV_Y}" width="${mainW - 44}" height="1" fill="${surfaces.line}"></rect>
  ${state.hideCommand ? "" : `<text x="${mainX + 22}" y="${M_CMD_Y}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${dim}">$ ${escapeXml(state.command)}</text>`}
  <circle cx="${mainX + 22}" cy="${M_DOT_CY}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${M_STA_TY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(
    truncateText(statusText, 48)
  )}</text>

  <rect x="${mainX}" y="${responseY}" width="${mainW}" height="${responseH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${mainX + 22}" y="${responseY + 22}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">output</text>
  ${showContribs
    ? buildContributionGrid(contributions, mainX + 22, responseY + 36, mainW - 44, state.contribTheme, palette, getContributionOptions(state, { labelColor: dim }))
    : state.githubStats
    ? (topLangs
        ? (shouldRenderLangIcons(state)
            ? buildLangIcons(state.langIconsUri, mainX + 22, responseY + 34, mainW - 44, state.langIconCount ?? topLangs.length, state.iconSize)
            : buildLangBars(topLangs, mainX + 22, responseY + 34, mainW - 44, accent, dim, surfaces.softLine, state.barStyle))
        : buildStatBars(state.githubStats, mainX + 22, responseY + 34, mainW - 44, accent, dim, surfaces.softLine, state.stats, state.barStyle))
    : `<text x="${mainX + 22}" y="${responseY + 52}" font-family="Sora, Arial, sans-serif" font-size="15" font-weight="600" fill="${ink}">${escapeXml(truncateText(state.tagline, 38))}</text>
  <circle cx="${mainX + 22}" cy="${responseY + 76}" r="5" fill="${accent}"></circle>
  <text x="${mainX + 36}" y="${responseY + 82}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${escapeXml(truncateText(state.status, 44))}</text>`}

  <rect x="${outerX}" y="${footerY}" width="${outerW}" height="1" fill="${surfaces.softLine}"></rect>
  <circle cx="${outerX + 22}" cy="${footerY + 24}" r="5" fill="${accent}"></circle>
  <text x="${outerX + 36}" y="${footerY + 30}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">${escapeXml(truncateText(state.status, 64))}</text>`;
  }

  function buildPrismCanvas(state, palette, provider, topLangs, contributions, surfaces) {
    const statusText = getStatusText(state);
    const outerX = 28;
    const outerY = 96;
    const outerW = state.width - 56;
    const outerH = state.height - 124;

    // Proportional lower panel widths
    const innerW = state.width - 116;
    const llW = Math.round(innerW * 0.345);
    const lmW = Math.round(innerW * 0.195);
    const lrW = innerW - llW - lmW - 28;  // remaining (2 gaps × 14)

    const cardX = 58;
    const cardY = outerY + 36;  // y = 132
    const cardW = state.width - 116;
    const { lowerRequired } = getPrismLowerRequirements(state, topLangs, contributions, llW, lrW);
    const minCardH = 154;
    const baseLowerH = Math.min(Math.round(outerH * 0.30), state.heightAuto ? 190 : 130);
    const lowerH = state.heightAuto ? Math.max(baseLowerH, lowerRequired) : baseLowerH;
    const cardH = Math.max(minCardH, outerH - 50 - 14 - lowerH);
    const lowerY = cardY + cardH + 14;

    const llX = 58;
    const lmX = llX + llW + 14;
    const lrX = lmX + lmW + 14;

    // Scale top card content
    const cS = Math.min(cardH / 148, 1.35);
    const C_META_Y   = cardY + Math.round(26 * cS);
    const C_NAME_Y   = cardY + Math.round(72 * cS);
    const C_HANDLE_Y = cardY + Math.round(106 * cS);
    const C_TAG_Y    = cardY + Math.min(Math.round(136 * cS), cardH - 12);

    const accent = surfaces.accent;
    const ink = surfaces.textStrong;
    const dim = surfaces.textMuted;
    const model = `${provider.label}/${state.theme}`;
    const showContribs = contributions && lowerH >= lowerRequired && lrW >= 180;

    return `
  <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="14" fill="${surfaces.bodyFill}"></rect>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="10" fill="${surfaces.panelFill}"></rect>
  <text x="${cardX + 24}" y="${C_META_Y}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prism canvas  •  ${escapeXml(model)}</text>
  <text x="${cardX + 24}" y="${C_NAME_Y}" font-family="Sora, Arial, sans-serif" font-size="34" font-weight="700" fill="${ink}">${escapeXml(state.name)}</text>
  <text x="${cardX + 24}" y="${C_HANDLE_Y}" font-family="IBM Plex Mono, monospace" font-size="16" fill="${dim}">${escapeXml(state.username ? `@${state.username}` : state.role)}</text>
  <text x="${cardX + 24}" y="${C_TAG_Y}" font-family="Sora, Arial, sans-serif" font-size="15" fill="${dim}">${escapeXml(
    truncateText(state.tagline, 56)
  )}</text>

  <rect x="${llX}" y="${lowerY}" width="${llW}" height="${lowerH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${llX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${topLangs ? "github stats" : "quick facts"}</text>
  ${topLangs
    ? buildStatBars(state.githubStats, llX + 18, lowerY + 34, llW - 36, accent, dim, surfaces.softLine, state.stats, state.barStyle)
    : `<text x="${llX + 18}" y="${lowerY + 56}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">avatar   ${escapeXml(state.avatar)}</text>
  <text x="${llX + 18}" y="${lowerY + 80}" font-family="IBM Plex Mono, monospace" font-size="14" fill="${ink}">${escapeXml(
    state.username ? `github  @${state.username}` : `pattern  ${state.pattern}`
  )}</text>`}

  <rect x="${lmX}" y="${lowerY}" width="${lmW}" height="${lowerH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${lmX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">prompt</text>
  ${state.hideCommand ? "" : `<text x="${lmX + 18}" y="${lowerY + 56}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(truncateText(state.command, 18))}</text>`}
  <text x="${lmX + 18}" y="${lowerY + 80}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${dim}">theme   ${escapeXml(state.theme)}</text>

  <rect x="${lrX}" y="${lowerY}" width="${lrW}" height="${lowerH}" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="${lrX + 18}" y="${lowerY + 24}" font-family="IBM Plex Mono, monospace" font-size="12" fill="${dim}">${showContribs ? "contributions" : topLangs ? "top langs" : state.githubStats ? "github stats" : "status"}</text>
  ${showContribs
    ? buildContributionGrid(contributions, lrX + 18, lowerY + 38, lrW - 36, state.contribTheme, palette, getContributionOptions(state, { labelColor: dim, title: "ACTIVITY" }))
    : topLangs
    ? (shouldRenderLangIcons(state)
        ? buildLangIcons(state.langIconsUri, lrX + 18, lowerY + 34, lrW - 36, state.langIconCount ?? topLangs.length, state.iconSize)
        : buildLangBars(topLangs, lrX + 18, lowerY + 34, lrW - 36, accent, dim, surfaces.softLine, state.barStyle))
    : state.githubStats
      ? buildStatBars(state.githubStats, lrX + 18, lowerY + 34, lrW - 36, accent, dim, surfaces.softLine, state.stats, state.barStyle)
      : `<circle cx="${lrX + 26}" cy="${lowerY + 58}" r="5" fill="${accent}"></circle>
  <text x="${lrX + 40}" y="${lowerY + 64}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${ink}">${escapeXml(truncateText(statusText, 20))}</text>`}`;
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
    const focusContribs = isContributionFocus(state, effectiveContributions);
    const maxLangs = effectiveTopLangs
      ? Math.min(effectiveTopLangs.length, Math.max(0, Math.floor(langsAvailH / 18)))
      : 0;
    const iconLangCount = getLangDisplayCount(state, effectiveTopLangs, { maxIcons: 6 });
    const showLangs = !focusContribs && (shouldRenderLangIcons(state)
      ? !!effectiveTopLangs && langsAvailH >= getLangSectionHeight(state, iconLangCount, { contentTop: 0, bottomPad: 8 })
      : maxLangs > 0);
    const langsToShow = showLangs
      ? (shouldRenderLangIcons(state) ? effectiveTopLangs.slice(0, iconLangCount) : effectiveTopLangs.slice(0, maxLangs))
      : null;
    const contribSectionH = estimateContributionSectionHeight(
      effectiveContributions,
      contentW,
      state.contribTheme,
      getContributionOptions(state, { contentTop: 8, bottomPad: 4 })
    );
    const showContribs = effectiveContributions && showStats && langsAvailH >= contribSectionH;

    return applyMotion(`
<svg width="${state.width}" height="${state.height}" viewBox="0 0 ${state.width} ${state.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(state.name)} terminal identity card">
  <rect width="${state.width}" height="${state.height}" rx="${shellRadius}" fill="${surfaces.bodyFill}"></rect>

  <rect x="${panelX}" y="24" width="${state.width - 56}" height="${bodyTop}" rx="14" fill="${topBarFill}"></rect>
  ${buildWindowButtons(provider, surfaces)}
  <text x="${state.width / 2}" y="66" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="17" fill="${topBarText}">${provider.windowTitle}</text>

  ${state.hideAvatar ? "" : `<rect x="56" y="128" width="152" height="152" rx="10" fill="${surfaces.panelFillAlt}"></rect>
  <text x="132" y="220" text-anchor="middle" font-family="Sora, Arial, sans-serif" font-size="52" font-weight="700" fill="${surfaces.accent}">${escapeXml(state.avatar)}</text>`}

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

  ${showStats && (showContribs || showLangs)
    ? `<rect x="${contentX}" y="${LANGS_TOP - 2}" width="${contentW}" height="1" fill="rgba(255,255,255,0.05)"></rect>
  ${showContribs
    ? buildContributionGrid(effectiveContributions, contentX, LANGS_TOP + 8, contentW, state.contribTheme, palette, getContributionOptions(state, { labelColor: palette.dim }))
    : shouldRenderLangIcons(state) && langsToShow
    ? buildLangIcons(state.langIconsUri, contentX, LANGS_TOP, contentW, state.langIconCount ?? langsToShow.length, state.iconSize)
    : buildLangBars(langsToShow, contentX, LANGS_TOP, contentW, palette.accent, palette.dim, undefined, state.barStyle)}`
    : ""}

  <rect x="28" y="${FOOT_SEP}" width="${state.width - 56}" height="1" fill="rgba(255,255,255,0.08)"></rect>
  <circle cx="56" cy="${state.height - 54}" r="5" fill="${palette.success}"></circle>
  <text x="72" y="${FOOT_TY}" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">${escapeXml(state.githubStats ? getStatusText(state) : state.status)}</text>
  ${state.hideCommand ? "" : `<text x="${state.width - PAD - 28}" y="${FOOT_TY}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="13" fill="${palette.dim}">$ ${escapeXml(state.command)}</text>`}
</svg>`.trim(), state, palette);
  }

  function buildApiUrl(input, baseUrl) {
    const state = normalizeState(input);
    // Decode all non-ASCII percent-sequences (2-byte, 3-byte, 4-byte UTF-8)
    // so Korean, →, ·, … etc. appear readable in the URL
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

# Terminal Identity

<p align="center">
  <a href="https://terminal-identity-opal.vercel.app">Live playground</a>
  ·
  <a href="#quick-start">Quick start</a>
  ·
  <a href="#params">Params</a>
  ·
  <a href="#providers--themes">Providers & themes</a>
  ·
  <a href="#readme-recipes">Recipes</a>
  ·
  <a href="#api">API</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-f0c060?style=flat-square" alt="MIT License" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel" alt="Deployed on Vercel" />
  <a href="https://terminal-identity-opal.vercel.app"><img src="https://img.shields.io/badge/Live-Playground-brightgreen?style=flat-square" alt="Live Playground" /></a>
</p>

<p align="center">
  <a href="https://terminal-identity-opal.vercel.app">
    <img src="https://terminal-identity-opal.vercel.app/api?name=doyoon&username=doyoon530&role=Frontend+Engineer&tagline=Building+tiny+tools+with+taste.&status=available+for+cool+internet+projects&command=npx+terminal-identity&theme=amber%2Fsolar&avatar=GG&pattern=grid&width=900&height=590&langCount=7&langStyle=icons&iconSize=lg&bio=-%20%F0%9F%92%A1%20**Focus%3A**%20Specialized%20in%20**React%2C%20TypeScript%2C%20and%20Next.js**%20ecosystem.%0A-%20%F0%9F%8E%A8%20**Philosophy%3A**%20I%20believe%20great%20UX%20is%20built%20on%20the%20foundation%20of%20robust%20engineering.%0A-%20%F0%9F%9B%A0%EF%B8%8F%20**Current%20Activity%3A**%20Refining%20**Server-side%20Rendering%20(SSR)**%20patterns%20and%20building%20a%20custom%20**Design%20System**.%0A-%20%F0%9F%8C%B1%20**Learning%3A**%20Deep%20diving%20into%20Web%20Accessibility%20(a11y)%20and%20Performance%20Optimization.&v=16"
    width="100%" alt="Terminal Identity demo card" />
  </a>
</p>

**Terminal-style SVG identity cards for GitHub READMEs.** One URL, one `<img>` tag — no tokens, no setup, no build step. Pick a provider shell, pair it with a theme, and optionally pass a GitHub username to pull in live public stats and top languages.

---

## Features

- **4 provider shells** — Classic, Amber, Obsidian, Prism, each with a distinct layout
- **8 themes** — Ember · Aurora · Cobalt · Velvet · Graphite · Matcha · Sakura · Solar
- **Live GitHub stats** — repos, stars, forks, followers fetched from the public API
- **Top languages** — bar chart or skill icons, filterable by name
- **Inline bold** — use `**text**` in bio for bold SVG text
- **Multi-line bio** — wraps dynamically to fit the card height, with line-break support
- **Background patterns** — grid, rings, pulse
- **Fully customizable** — accent color, dimensions (720–1400 × 420–820), stat filters, and more
- **Zero config** — one `<img>` tag, hosted and cached on Vercel

---

## Quick start

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=520"
  width="100%"
  alt="Terminal identity card"
/>
```

Add `username=your-handle` to show live GitHub stats and top languages:

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=520"
  width="100%"
  alt="Terminal identity card with live GitHub stats"
/>
```

> Try it interactively at the **[live playground](https://terminal-identity-opal.vercel.app)** — build your card visually and copy the URL or markdown directly.

---

## Params

| Param | Default | Description |
| --- | --- | --- |
| `name` | `ggam` | Display name |
| `username` | — | GitHub handle — enables live stats and top languages |
| `role` | `frontend engineer` | Subtitle / role line |
| `tagline` | — | Main sentence (featured in right panel) |
| `bio` | — | Multi-line bio for left panel — wraps dynamically to card height; supports `**bold**`; falls back to `tagline` if absent |
| `status` | — | Fallback status text (shown when `username` is absent or stats fail) |
| `command` | — | Terminal command shown in the footer |
| `theme` | `solar` | Theme name, or `provider/theme` combo like `amber/sakura` |
| `avatar` | `GG` | Initials rendered in the avatar block (classic provider only) |
| `pattern` | `grid` | Background pattern: `grid`, `rings`, or `pulse` |
| `width` | `980` | Card width in px (720–1400) |
| `height` | `520` | Card height in px (420–820) |
| `accent` | — | Override accent color with a hex value, e.g. `%23ff7a59` |
| `showLangs` | `auto` | Top languages display: `auto`, `on`, or `off` |
| `langCount` | `4` | Number of top languages to show (1–6) |
| `langStyle` | `bar` | Language display style: `bar` or `icons` |
| `iconSize` | `md` | Icon size when `langStyle=icons`: `sm`, `md`, or `lg` |
| `barStyle` | `bar` | Graph style for stats and lang bars: `bar`, `dots`, or `blocks` |
| `hideAvatar` | `false` | Set to `true` to hide the avatar block |
| `hideProfile` | `false` | Set to `true` to hide the GitHub profile picture (amber provider) |
| `hideCommand` | `false` | Set to `true` to hide the command line |
| `stats` | all | Comma-separated stats to show: `repos,stars,forks,followers` |
| `excludeLangs` | — | Comma-separated language names to exclude, e.g. `HTML,CSS` |

> **`showLangs=auto`** shows top languages only when a `username` is provided and GitHub returns language data. Use `on` to always attempt to show them, `off` to hide entirely.

> **Icons:** `langStyle=icons` fetches icons from [skillicons.dev](https://skillicons.dev) at render time. Supported languages: JavaScript, TypeScript, Python, Rust, Go, Java, Kotlin, Swift, Ruby, PHP, C, C++, C#, HTML, CSS, SCSS, Dart, Lua, Scala, Elixir, Haskell, Shell, R, Perl, Zig, OCaml, Dockerfile, Vue, Svelte, and more.

---

## Providers & themes

Specify a provider via the `theme` param as `provider/theme` — e.g. `amber/solar`, `obsidian/cobalt`.

| Provider | Shell feel |
| --- | --- |
| `classic` | Clean terminal layout, full theme palette |
| `amber` | Warm editorial dashboard with profile photo support |
| `obsidian` | Dark workspace, sharp monochrome |
| `prism` | Bright canvas, airy and structured |

Available themes: `ember` · `aurora` · `cobalt` · `velvet` · `graphite` · `matcha` · `sakura` · `solar`

<details>
<summary>Theme gallery</summary>

### `solar`

<img src="https://terminal-identity-opal.vercel.app/api?name=hana&username=doyoon530&role=product%20engineer&tagline=Clean%20interfaces%2C%20kind%20systems%2C%20and%20rapid%20iteration.&command=npm%20run%20build-bright&theme=amber/solar&avatar=HA&pattern=rings&width=980&height=520&v=3" width="100%" alt="Solar theme" />

`provider=amber` · `theme=solar`

### `ember`

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=classic/ember&avatar=GG&pattern=grid&width=980&height=520&v=3" width="100%" alt="Ember theme" />

`provider=classic` · `theme=ember`

### `aurora`

<img src="https://terminal-identity-opal.vercel.app/api?name=alex.dev&username=doyoon530&role=developer%20advocate&tagline=Teaching%20APIs%20without%20making%20them%20feel%20scary.&command=npx%20explain-like-im-new&theme=prism/aurora&avatar=AD&pattern=grid&width=980&height=520&v=3" width="100%" alt="Aurora theme" />

`provider=prism` · `theme=aurora`

### `cobalt`

<img src="https://terminal-identity-opal.vercel.app/api?name=aria&username=doyoon530&role=platform%20engineer&tagline=Reliable%20infrastructure%20with%20humane%20developer%20tooling.&command=terraform%20apply%20confidence&theme=obsidian/cobalt&avatar=AR&pattern=rings&width=980&height=520&v=3" width="100%" alt="Cobalt theme" />

`provider=obsidian` · `theme=cobalt`

### `velvet`

<img src="https://terminal-identity-opal.vercel.app/api?name=noah&username=doyoon530&role=creative%20coder&tagline=Code%2C%20typography%2C%20and%20generative%20visuals%20in%20one%20place.&command=bun%20run%20make-something-strange&theme=amber/velvet&avatar=NH&pattern=pulse&width=980&height=520&v=3" width="100%" alt="Velvet theme" />

`provider=amber` · `theme=velvet`

### `graphite`

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&username=doyoon530&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&command=pnpm%20create%20tiny-hit&theme=obsidian/graphite&avatar=MS&pattern=pulse&width=980&height=520&v=3" width="100%" alt="Graphite theme" />

`provider=obsidian` · `theme=graphite`

### `matcha`

<img src="https://terminal-identity-opal.vercel.app/api?name=leo&username=doyoon530&role=full-stack%20maker&tagline=Turning%20napkin%20ideas%20into%20products%20people%20keep%20using.&command=pnpm%20ship%20--fast&theme=prism/matcha&avatar=LE&pattern=grid&width=980&height=520&v=3" width="100%" alt="Matcha theme" />

`provider=prism` · `theme=matcha`

### `sakura`

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&username=doyoon530&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&command=npm%20run%20polish-ui&theme=amber/sakura&avatar=JW&pattern=rings&width=980&height=520&v=3" width="100%" alt="Sakura theme" />

`provider=amber` · `theme=sakura`

</details>

---

## README Recipes

Copy-paste starter cards for common profile types.

### Minimal hero

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=420&v=3" width="100%" alt="Minimal hero card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=420"
  width="100%"
  alt="Terminal identity card"
/>
```

### With live GitHub stats and top languages

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=obsidian/graphite&avatar=GG&pattern=grid&width=980&height=520&v=3" width="100%" alt="Card with live GitHub stats" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=obsidian/graphite&avatar=GG&pattern=grid&width=980&height=520"
  width="100%"
  alt="Terminal identity card with live GitHub stats"
/>
```

### Custom accent + filtered stats

Show only stars and followers, exclude HTML/CSS from top langs:

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=520&accent=%23ff7a59&stats=stars%2Cfollowers&excludeLangs=HTML%2CCSS&v=3" width="100%" alt="Card with custom accent and filtered stats" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=520&accent=%23ff7a59&stats=stars%2Cfollowers&excludeLangs=HTML%2CCSS"
  width="100%"
  alt="Terminal identity card with custom accent"
/>
```

### Design engineer

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=amber/sakura&avatar=JW&pattern=rings&width=980&height=520&v=3" width="100%" alt="Design engineer card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=amber/sakura&avatar=JW&pattern=rings&width=980&height=520"
  width="100%"
  alt="Terminal identity card"
/>
```

### Indie hacker / builder

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=obsidian/graphite&avatar=MS&pattern=pulse&width=980&height=520&v=3" width="100%" alt="Indie hacker card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=obsidian/graphite&avatar=MS&pattern=pulse&width=980&height=520"
  width="100%"
  alt="Terminal identity card"
/>
```

---

## API

```
GET https://terminal-identity-opal.vercel.app/api?[params]
```

Returns an `image/svg+xml` response. Drop it directly in any Markdown `<img>` tag. GitHub caches images — append `&v=2` (or increment) to bust the cache when you update params.

> **Accent color:** URL-encode `#` as `%23` when passing the `accent` param. Example: `accent=%23ff7a59` for `#ff7a59`.

---

## Run locally

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

The playground at `index.html` previews cards live, copies SVG/markdown/API URLs, and shows a preset gallery.

---

## Deploy

Import this repo into [Vercel](https://vercel.com). The `/api` directory is picked up as serverless functions automatically. No config needed.

---

## Project structure

```
terminal-card.js    SVG generation (shared between browser and server)
api/index.js        Card endpoint — fetches GitHub stats, returns SVG
api/github.js       GitHub stats proxy for the playground
github-data.js      Public GitHub API fetch helper
index.html          Live playground
script.js           Playground logic
styles.css          Playground styles
```

---

## Acknowledgements

Language icons powered by [skillicons.dev](https://skillicons.dev) — MIT License © [tandpfun](https://github.com/tandpfun/skill-icons)

---

## License

MIT © [doyoon530](https://github.com/doyoon530)

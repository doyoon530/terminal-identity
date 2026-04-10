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
  <img src="https://terminal-identity-opal.vercel.app/api?name=DoYoon&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=600&v=2"
  width="100%" alt="Terminal Identity demo card" />
</p>

Terminal-style SVG cards for GitHub READMEs. One URL, one `<img>` tag. Pick a provider shell (`classic`, `claude`, `gpt`, `gemini`), pair it with a theme, and optionally pass a GitHub username to pull in live public stats and top languages.

---

## Quick start

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=520"
  width="100%"
  alt="Terminal identity card"
/>
```

Add `username=your-handle` to show live GitHub stats and top languages:

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=520"
  width="100%"
  alt="Terminal identity card with live GitHub stats"
/>
```

---

## Params

| Param | Default | Description |
| --- | --- | --- |
| `name` | `ggam` | Display name |
| `username` | — | GitHub handle — enables live stats and top languages |
| `role` | `frontend engineer` | Subtitle / role line |
| `tagline` | — | Main sentence |
| `status` | — | Fallback status text (shown when `username` is absent or stats fail) |
| `command` | — | Terminal command shown on the card |
| `theme` | `ember` | Theme name, or `provider/theme` combo like `claude/sakura` |
| `avatar` | `GG` | Initials rendered in the avatar block (classic provider only) |
| `pattern` | `grid` | Background pattern: `grid`, `rings`, or `pulse` |
| `width` | `980` | Card width in px (720–1400) |
| `height` | `520` | Card height in px (420–820) |
| `accent` | — | Override accent color with a hex value, e.g. `%23ff7a59` |
| `showLangs` | `auto` | Top languages display: `auto`, `on`, or `off` |
| `langCount` | `4` | Number of top languages to show (1–6) |
| `hideAvatar` | `false` | Set to `true` to hide the avatar block |
| `hideCommand` | `false` | Set to `true` to hide the command line |
| `stats` | all | Comma-separated stats to show: `repos,stars,forks,followers` |
| `excludeLangs` | — | Comma-separated language names to exclude, e.g. `HTML,CSS` |

> **Note:** `showLangs=auto` shows top languages only when a `username` is provided and GitHub returns language data. Use `on` to always attempt to show them, `off` to hide entirely.

---

## Providers & themes

Specify a provider via the `theme` param as `provider/theme` — e.g. `claude/ember`, `gpt/graphite`.

| Provider | Shell feel |
| --- | --- |
| `classic` | Clean terminal layout, full theme palette |
| `claude` | Warm editorial dashboard, ember-toned |
| `gpt` | Dark workspace, sharp monochrome |
| `gemini` | Bright canvas, airy and structured |

Available themes: `ember` · `aurora` · `cobalt` · `velvet` · `graphite` · `matcha` · `sakura` · `solar`

<details>
<summary>Theme gallery</summary>

### `ember`

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=classic/ember&avatar=GG&pattern=grid&width=980&height=520&v=2" width="100%" alt="Ember theme" />

`provider=classic` · `theme=ember`

### `aurora`

<img src="https://terminal-identity-opal.vercel.app/api?name=alex.dev&username=doyoon530&role=developer%20advocate&tagline=Teaching%20APIs%20without%20making%20them%20feel%20scary.&command=npx%20explain-like-im-new&theme=gemini/aurora&avatar=AD&pattern=grid&width=980&height=520&v=2" width="100%" alt="Aurora theme" />

`provider=gemini` · `theme=aurora`

### `cobalt`

<img src="https://terminal-identity-opal.vercel.app/api?name=aria&username=doyoon530&role=platform%20engineer&tagline=Reliable%20infrastructure%20with%20humane%20developer%20tooling.&command=terraform%20apply%20confidence&theme=gpt/cobalt&avatar=AR&pattern=rings&width=980&height=520&v=2" width="100%" alt="Cobalt theme" />

`provider=gpt` · `theme=cobalt`

### `velvet`

<img src="https://terminal-identity-opal.vercel.app/api?name=noah&username=doyoon530&role=creative%20coder&tagline=Code%2C%20typography%2C%20and%20generative%20visuals%20in%20one%20place.&command=bun%20run%20make-something-strange&theme=claude/velvet&avatar=NH&pattern=pulse&width=980&height=520&v=2" width="100%" alt="Velvet theme" />

`provider=claude` · `theme=velvet`

### `graphite`

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&username=doyoon530&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520&v=2" width="100%" alt="Graphite theme" />

`provider=gpt` · `theme=graphite`

### `matcha`

<img src="https://terminal-identity-opal.vercel.app/api?name=leo&username=doyoon530&role=full-stack%20maker&tagline=Turning%20napkin%20ideas%20into%20products%20people%20keep%20using.&command=pnpm%20ship%20--fast&theme=gemini/matcha&avatar=LE&pattern=grid&width=980&height=520&v=2" width="100%" alt="Matcha theme" />

`provider=gemini` · `theme=matcha`

### `sakura`

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&username=doyoon530&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520&v=2" width="100%" alt="Sakura theme" />

`provider=claude` · `theme=sakura`

### `solar`

<img src="https://terminal-identity-opal.vercel.app/api?name=hana&username=doyoon530&role=product%20engineer&tagline=Clean%20interfaces%2C%20kind%20systems%2C%20and%20rapid%20iteration.&command=npm%20run%20build-bright&theme=claude/solar&avatar=HA&pattern=rings&width=980&height=520&v=2" width="100%" alt="Solar theme" />

`provider=claude` · `theme=solar`

</details>

---

## README Recipes

Copy-paste starter cards for common profile types.

### Minimal hero

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=420&v=2" width="100%" alt="Minimal hero card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=420"
  width="100%"
  alt="Terminal identity card"
/>
```

### With live GitHub stats and top languages

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=gpt/graphite&avatar=GG&pattern=grid&width=980&height=520&v=2" width="100%" alt="Card with live GitHub stats" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=gpt/graphite&avatar=GG&pattern=grid&width=980&height=520"
  width="100%"
  alt="Terminal identity card with live GitHub stats"
/>
```

### Custom accent + filtered stats

Show only stars and followers, exclude HTML/CSS from top langs:

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=520&accent=%23ff7a59&stats=stars%2Cfollowers&excludeLangs=HTML%2CCSS&v=2" width="100%" alt="Card with custom accent and filtered stats" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=520&accent=%23ff7a59&stats=stars%2Cfollowers&excludeLangs=HTML%2CCSS"
  width="100%"
  alt="Terminal identity card with custom accent"
/>
```

### Design engineer

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520&v=2" width="100%" alt="Design engineer card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520"
  width="100%"
  alt="Terminal identity card"
/>
```

### Indie hacker / builder

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520&v=2" width="100%" alt="Indie hacker card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520"
  width="100%"
  alt="Terminal identity card"
/>
```

---

## API

```
GET https://terminal-identity-opal.vercel.app/api?[params]
```

Returns an `image/svg+xml` response. Drop it directly in any Markdown `<img>` tag. GitHub caches images — append `&v=2` to bust the cache when you update params.

> **Accent color note:** URL-encode `#` as `%23` when passing the `accent` param. Example: `accent=%23ff7a59` for `#ff7a59`.

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

MIT

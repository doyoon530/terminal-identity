# Terminal Identity

<p align="center">
  <strong>Dynamic SVG profile cards for GitHub READMEs.</strong>
</p>

<p align="center">
  Provider-inspired shells, theme combos, and optional live GitHub stats in one image URL.
</p>

<p align="center">
  <a href="https://terminal-identity-opal.vercel.app">
    <img src="https://img.shields.io/badge/live-demo-black?style=flat-square&logo=vercel" alt="Live demo badge" />
  </a>
  <a href="https://github.com/doyoon530/terminal-identity/stargazers">
    <img src="https://img.shields.io/github/stars/doyoon530/terminal-identity?style=flat-square" alt="GitHub stars badge" />
  </a>
  <img src="https://img.shields.io/github/license/doyoon530/terminal-identity?style=flat-square" alt="License badge" />
</p>

<p align="center">
  <a href="https://terminal-identity-opal.vercel.app">Live Demo</a>
  ·
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#live-github-status">Live GitHub Status</a>
  ·
  <a href="#theme-gallery">Theme Gallery</a>
  ·
  <a href="#api">API</a>
</p>

<p align="center">
  <img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=520" width="100%" alt="Terminal Identity demo card" />
</p>

Terminal Identity turns a few query params into a polished terminal-style hero card you can paste straight into a GitHub README. It supports `classic`, `claude`, `gpt`, and `gemini` shells, theme combinations like `claude/sakura`, and optional live GitHub stats with `username=...`.

## Why it works

- One URL becomes a distinctive README hero card.
- The result is visual enough to get attention in screenshots and social previews.
- Consumers do not need a build step. They only paste an `<img>` tag.
- `username` can replace the manual status line with live public GitHub stats.

## Quick Start

Paste this into a README:

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=520" width="100%" alt="Terminal identity card" />
```

## Live GitHub Status

If you pass `username`, Terminal Identity will try to fetch public GitHub stats and use them in the status area instead of the manual `status` text.

- Uses the public GitHub API
- No token required for basic usage
- Falls back to manual `status` if stats are unavailable

Example:

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=gpt/graphite&avatar=GG&pattern=grid" width="100%" alt="Terminal identity card with live GitHub stats" />
```

## Features

- Terminal-style SVG identity cards generated on demand
- Provider shells: `classic`, `claude`, `gpt`, `gemini`
- Theme combos like `claude/sakura` and `gpt/graphite`
- Optional live GitHub stats via `username`
- Playground UI for copying SVG, markdown, and API URLs
- Preset gallery for quick remixing

## Provider Shells

| Provider | Mood | Best fit |
| --- | --- | --- |
| `classic` | Clean original Terminal Identity layout | A general-purpose profile hero |
| `claude` | Warm, editorial, Claude Code-inspired dashboard | Personal, thoughtful profiles |
| `gpt` | Dark, sharp, tool-heavy workspace | Builder and product engineer vibes |
| `gemini` | Bright, glassy, futuristic canvas | Design-forward or experimental profiles |

## Themes

`ember`, `aurora`, `cobalt`, `velvet`, `graphite`, `matcha`, `sakura`, `solar`

## README Recipes

### Minimal hero

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&theme=claude/ember&avatar=GG&pattern=grid" width="100%" alt="Minimal hero terminal identity card" />

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&theme=claude/ember&avatar=GG&pattern=grid" width="100%" alt="Terminal identity card" />
```

### Live GitHub status

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=gpt/graphite&avatar=GG&pattern=grid" width="100%" alt="Terminal identity card with live GitHub stats" />

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=gpt/graphite&avatar=GG&pattern=grid" width="100%" alt="Terminal identity card with live GitHub stats" />
```

### Profile intro

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520" width="100%" alt="Jiwon terminal identity card" />

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520" width="100%" alt="Jiwon terminal identity card" />
```

### Builder profile

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520" width="100%" alt="Mina terminal identity card" />

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520" width="100%" alt="Mina terminal identity card" />
```

## Theme Gallery

<details>
<summary>Open full theme gallery</summary>

### `ember`

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=classic/ember&avatar=GG&pattern=grid&width=980&height=520" width="100%" alt="Ember theme preview" />

Inputs: `provider=classic`, `theme=ember`, `name=ggam`, `role=frontend engineer`, `avatar=GG`, `pattern=grid`

### `aurora`

<img src="https://terminal-identity-opal.vercel.app/api?name=alex.dev&role=developer%20advocate&tagline=Teaching%20APIs%20without%20making%20them%20feel%20scary.&status=speaking%2C%20writing%2C%20and%20shipping%20DX%20experiments&command=npx%20explain-like-im-new&theme=gemini/aurora&avatar=AD&pattern=grid&width=980&height=520" width="100%" alt="Aurora theme preview" />

Inputs: `provider=gemini`, `theme=aurora`, `name=alex.dev`, `role=developer advocate`, `avatar=AD`, `pattern=grid`

### `cobalt`

<img src="https://terminal-identity-opal.vercel.app/api?name=aria&role=platform%20engineer&tagline=Reliable%20infrastructure%20with%20humane%20developer%20tooling.&status=focused%20on%20observability%2C%20scale%2C%20and%20platform%20DX&command=terraform%20apply%20confidence&theme=gpt/cobalt&avatar=AR&pattern=rings&width=980&height=520" width="100%" alt="Cobalt theme preview" />

Inputs: `provider=gpt`, `theme=cobalt`, `name=aria`, `role=platform engineer`, `avatar=AR`, `pattern=rings`

### `velvet`

<img src="https://terminal-identity-opal.vercel.app/api?name=noah&role=creative%20coder&tagline=Code%2C%20typography%2C%20and%20generative%20visuals%20in%20one%20place.&status=available%20for%20interactive%20art%20and%20frontend%20commissions&command=bun%20run%20make-something-strange&theme=claude/velvet&avatar=NH&pattern=pulse&width=980&height=520" width="100%" alt="Velvet theme preview" />

Inputs: `provider=claude`, `theme=velvet`, `name=noah`, `role=creative coder`, `avatar=NH`, `pattern=pulse`

### `graphite`

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520" width="100%" alt="Graphite theme preview" />

Inputs: `provider=gpt`, `theme=graphite`, `name=mina.sh`, `role=indie hacker`, `avatar=MS`, `pattern=pulse`

### `matcha`

<img src="https://terminal-identity-opal.vercel.app/api?name=leo&role=full-stack%20maker&tagline=Turning%20napkin%20ideas%20into%20products%20people%20keep%20using.&status=currently%20exploring%20AI%2C%20commerce%2C%20and%20tiny%20SaaS%20tools&command=pnpm%20ship%20--fast&theme=gemini/matcha&avatar=LE&pattern=grid&width=980&height=520" width="100%" alt="Matcha theme preview" />

Inputs: `provider=gemini`, `theme=matcha`, `name=leo`, `role=full-stack maker`, `avatar=LE`, `pattern=grid`

### `sakura`

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520" width="100%" alt="Sakura theme preview" />

Inputs: `provider=claude`, `theme=sakura`, `name=jiwon`, `role=design engineer`, `avatar=JW`, `pattern=rings`

### `solar`

<img src="https://terminal-identity-opal.vercel.app/api?name=hana&role=product%20engineer&tagline=Clean%20interfaces%2C%20kind%20systems%2C%20and%20rapid%20iteration.&status=available%20for%20startups%20that%20care%20about%20craft&command=npm%20run%20build-bright&theme=claude/solar&avatar=HA&pattern=rings&width=980&height=520" width="100%" alt="Solar theme preview" />

Inputs: `provider=claude`, `theme=solar`, `name=hana`, `role=product engineer`, `avatar=HA`, `pattern=rings`

</details>

## API

Base endpoint:

```text
https://terminal-identity-opal.vercel.app/api
```

Example:

```text
/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=claude/sakura&avatar=GG&pattern=grid&width=980&height=520
```

### Params

| Param | Description |
| --- | --- |
| `name` | Main display name |
| `username` | Optional GitHub username for live public stats |
| `role` | Subtitle or role line |
| `tagline` | Main sentence |
| `status` | Fallback status text when `username` is not used or stats fail |
| `command` | Terminal command shown on the card |
| `theme` | Theme name or provider combo like `claude/sakura` |
| `avatar` | Initials shown in the card |
| `pattern` | `grid`, `rings`, or `pulse` |
| `width` | Image width |
| `height` | Image height |

## Run Locally

Open `index.html` in a browser.

Or run a small local server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy on Vercel

- Import this repository into Vercel
- Deploy it as a project with serverless functions
- Use `/api?...` as the public image endpoint

## Project Structure

- `terminal-card.js`: shared SVG generation logic
- `api/index.js`: main SVG endpoint
- `api/github.js`: GitHub stats endpoint for the playground
- `github-data.js`: GitHub public data fetch helper
- `index.html`: live playground
- `script.js`: playground interactions
- `styles.css`: landing page styling
- `og-preview.svg`: social preview asset

## Roadmap

- More themes inspired by editors and operating systems
- Light mode variants and compact layouts
- Optional social icon blocks
- More stats modules beyond the status line
- Community preset gallery
- PNG export for sharing outside GitHub

## License

MIT

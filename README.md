# Terminal Identity

<p align="center">
  <a href="https://terminal-identity-opal.vercel.app">Live playground</a>
  ·
  <a href="#paste-this-into-your-readme">Paste this</a>
  ·
  <a href="#popular-styles">Popular styles</a>
  ·
  <a href="#why-people-use-it">Why use it</a>
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
    <img src="https://terminal-identity-opal.vercel.app/api?name=doyoon&username=doyoon530&role=Frontend+Engineer&tagline=Building+tiny+tools+with+taste.&status=available+for+cool+internet+projects&command=npx+terminal-identity&theme=amber%2Fsakura&avatar=GG&pattern=grid&width=900&showContribs=on&contribTheme=cat_jump&contribRange=16w&contribMode=focus&showLangs=on&langCount=4&langStyle=icons&iconSize=md&barStyle=blocks&bio=-%20%F0%9F%92%A1%20**Focus%3A**%20Specialized%20in%20**React%2C%20TypeScript%2C%20and%20Next.js**%20ecosystem.%0A-%20%F0%9F%9B%A0%EF%B8%8F%20**Current%20Activity%3A**%20Refining%20**Server-side%20Rendering%20(SSR)**%20patterns%20and%20building%20a%20custom%20**Design%20System**.&v=66"
    width="100%" alt="Terminal Identity demo card" />
  </a>
</p>

<p align="center"><strong>Make your GitHub README feel like a polished product page.</strong></p>

<p align="center">Terminal Identity generates stylish SVG hero cards from a single image URL. Paste one <code>&lt;img&gt;</code> tag into your README, choose a shell + theme, and optionally pull live public GitHub stats.</p>

---

## Paste this into your README

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=420"
  width="100%"
  alt="Terminal identity card"
/>
```

Add `username=your-handle` to pull live public GitHub stats and top languages.

Want motion? Add `motion=pulse`, `motion=scan`, or `motion=boot` to the same API URL.

> Try it in the **[live playground](https://terminal-identity-opal.vercel.app)** and copy the image URL or markdown directly.

---

## Popular styles

<table>
  <tr>
    <td width="33%" valign="top">
      <a href="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=760&height=420&v=20">
        <img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=760&height=420&v=20" alt="Minimal hero card" />
      </a>
      <strong>Minimal Hero</strong><br />
      Clean landing-header vibe for profile READMEs.<br />
      <code>amber/solar</code>
    </td>
    <td width="33%" valign="top">
      <a href="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=amber/sakura&avatar=JW&pattern=rings&width=760&height=420&v=20">
        <img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=amber/sakura&avatar=JW&pattern=rings&width=760&height=420&v=20" alt="Design engineer card" />
      </a>
      <strong>Design Engineer</strong><br />
      Softer editorial shell for product and design profiles.<br />
      <code>amber/sakura</code>
    </td>
    <td width="33%" valign="top">
      <a href="https://terminal-identity-opal.vercel.app/api?name=mina.sh&username=doyoon530&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&command=pnpm%20create%20tiny-hit&theme=obsidian/graphite&avatar=MS&pattern=pulse&width=760&height=420&v=20">
        <img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&username=doyoon530&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&command=pnpm%20create%20tiny-hit&theme=obsidian/graphite&avatar=MS&pattern=pulse&width=760&height=420&v=20" alt="Builder card" />
      </a>
      <strong>Builder Mode</strong><br />
      Dark workspace shell with stats for indie hackers and maintainers.<br />
      <code>obsidian/graphite</code>
    </td>
  </tr>
</table>

---

## Why people use it

- **One URL, real result** — no screenshots, no manual SVG editing, no build step
- **Actually stylish** — provider shells feel more like product UI than generic badges
- **Live public data** — add `username` to show repos, stars, followers, and top languages
- **Contribution activity block** — turn recent GitHub activity into a themed grid inside the card
- **Animated SVG mode** — add `motion=pulse|scan|boot` and keep using the same image URL
- **Good defaults** — most people only need `name`, `role`, `theme`, and maybe `username`
- **Deep enough when you want it** — accent color, graph style, filtered stats, language icons, custom bio

---

## Features

- **4 provider shells** — Classic, Amber, Obsidian, Prism, each with a distinct layout
- **8 themes** — Ember · Aurora · Cobalt · Velvet · Graphite · Matcha · Sakura · Solar
- **Live GitHub stats** — repos, stars, forks, followers fetched from the public API
- **Contribution themes** — `cat_jump`, `popcat`, `capybara_onsen`, `moon`, `star`, `orbit`, `signal`, `citylight`, `moss`, `petal`, `firefly`, and `constellation`
- **Top languages** — bar chart or skill icons, filterable by name
- **Inline bold** — use `**text**` in bio for bold SVG text
- **Multi-line bio** — wraps dynamically to fit the card height, with line-break support
- **Background patterns** — grid, rings, pulse
- **Animated SVG overlays** — `pulse`, `scan`, and `boot` work via the same `/api` endpoint
- **Fully customizable** — accent color, dimensions (720–1400 × 420–1400 or `auto`), stat filters, and more
- **Zero config** — one `<img>` tag, hosted and cached on Vercel

---

## Quick start

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=auto"
  width="100%"
  alt="Terminal identity card"
/>
```

Add `username=your-handle` to show live GitHub stats and top languages:

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=auto"
  width="100%"
  alt="Terminal identity card with live GitHub stats"
/>
```

Need a moving version from the same endpoint:

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=auto&motion=pulse"
  width="100%"
  alt="Animated terminal identity card"
/>
```

Want a contribution block too:

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=auto&showContribs=on&contribTheme=moon"
  width="100%"
  alt="Terminal identity card with contribution grid"
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
| `height` | `auto` | Card height in px (`auto` computes the layout fit, or use 420–1400) |
| `accent` | — | Override accent color with a hex value, e.g. `%23ff7a59` |
| `motion` | `off` | Animated SVG overlay: `off`, `pulse`, `scan`, or `boot` |
| `showContribs` | `off` | Contribution grid display: `off`, `on`, or `auto` |
| `contribTheme` | `moss` | Contribution concept theme: `cat_jump`, `popcat`, `capybara_onsen`, `moon`, `star`, `orbit`, `signal`, `citylight`, `moss`, `petal`, `firefly`, or `constellation` |
| `contribRange` | `16w` | Contribution window: `4w`, `8w`, `12w`, `16w`, `24w`, `26w`, `39w`, `3m`, `6m`, `9m`, or `1y` |
| `contribMode` | `compact` | Contribution layout mode: `compact` or `focus` |
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

> **Contribution sizing:** shorter ranges like `4w`, `8w`, `12w`, and `16w` render larger cells; medium ranges like `24w`, `26w`/`6m`, and `39w`/`9m` balance detail and history; `1y` renders a compact annual view.

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

Copy-paste starter cards for different contribution moods. Each example leans on a different `contribTheme` so you can see how far the same API can stretch.

### Cat jump ghost grid

`theme=obsidian/velvet` · `showContribs=on` · `contribTheme=cat_jump` · `contribRange=16w` · `contribMode=focus`

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=obsidian/velvet&avatar=GG&pattern=pulse&width=980&height=auto&motion=boot&showContribs=on&contribTheme=cat_jump&contribRange=16w&contribMode=focus&showLangs=off&hideCommand=true&v=68" width="100%" alt="Cat jump contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=obsidian/velvet&avatar=GG&pattern=pulse&width=980&height=auto&motion=boot&showContribs=on&contribTheme=cat_jump&contribRange=16w&contribMode=focus&showLangs=off&hideCommand=true"
  width="100%"
  alt="Terminal identity card with cat jump activity"
/>
```

### Popcat activity burst

`theme=amber/sakura` · `showContribs=on` · `contribTheme=popcat` · `contribRange=16w` · `contribMode=focus`

<img src="https://terminal-identity-opal.vercel.app/api?name=doyoon&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=amber/sakura&avatar=GG&pattern=grid&width=980&height=auto&showContribs=on&contribTheme=popcat&contribRange=16w&contribMode=focus&showLangs=off&barStyle=blocks&v=67" width="100%" alt="Popcat contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=doyoon&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=amber/sakura&avatar=GG&pattern=grid&width=980&height=auto&showContribs=on&contribTheme=popcat&contribRange=16w&contribMode=focus&showLangs=off&barStyle=blocks"
  width="100%"
  alt="Terminal identity card with popcat activity"
/>
```

### Capybara onsen

`theme=amber/matcha` · `showContribs=on` · `contribTheme=capybara_onsen` · `contribRange=16w` · `contribMode=focus`

<img src="https://terminal-identity-opal.vercel.app/api?name=noyu&username=doyoon530&role=cozy%20toolmaker&tagline=Small%20commits%2C%20warm%20baths%2C%20and%20steady%20shipping.&status=soaking%20in%20the%20release%20queue&command=npm%20run%20onsen&theme=amber/matcha&avatar=NY&pattern=rings&width=980&height=auto&showContribs=on&contribTheme=capybara_onsen&contribRange=16w&contribMode=focus&showLangs=off&barStyle=blocks&v=69" width="100%" alt="Capybara onsen contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=noyu&username=doyoon530&role=cozy%20toolmaker&tagline=Small%20commits%2C%20warm%20baths%2C%20and%20steady%20shipping.&status=soaking%20in%20the%20release%20queue&command=npm%20run%20onsen&theme=amber/matcha&avatar=NY&pattern=rings&width=980&height=auto&showContribs=on&contribTheme=capybara_onsen&contribRange=16w&contribMode=focus&showLangs=off&barStyle=blocks"
  width="100%"
  alt="Terminal identity card with capybara onsen activity"
/>
```

### Moon phase dashboard

`theme=amber/solar` · `showContribs=on` · `contribTheme=moon` · `contribRange=16w` · `showLangs=on`

<img src="https://terminal-identity-opal.vercel.app/api?name=doyoon&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=auto&showContribs=on&contribTheme=moon&contribRange=16w&showLangs=on&langCount=4&langStyle=icons&iconSize=sm&v=41" width="100%" alt="Moon phase contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=doyoon&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=amber/solar&avatar=GG&pattern=grid&width=980&height=auto&showContribs=on&contribTheme=moon&contribRange=16w&showLangs=on&langCount=4&langStyle=icons&iconSize=sm"
  width="100%"
  alt="Terminal identity card with moon phase activity"
/>
```

### Starfield maintainer

`theme=obsidian/graphite` · `contribTheme=star` · `contribRange=16w` · `motion=pulse` · `pattern=pulse`

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&username=doyoon530&role=open-source%20maintainer&tagline=Shipping%20small%20fixes%2C%20sharp%20docs%2C%20and%20stable%20releases.&status=reviewing%20PRs%20and%20polishing%20tooling&command=pnpm%20release%20--safe&theme=obsidian/graphite&avatar=MS&pattern=pulse&width=980&height=auto&motion=pulse&showContribs=on&contribTheme=star&contribRange=16w&showLangs=on&langCount=4&langStyle=bar&barStyle=blocks&v=42" width="100%" alt="Starfield contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&username=doyoon530&role=open-source%20maintainer&tagline=Shipping%20small%20fixes%2C%20sharp%20docs%2C%20and%20stable%20releases.&status=reviewing%20PRs%20and%20polishing%20tooling&command=pnpm%20release%20--safe&theme=obsidian/graphite&avatar=MS&pattern=pulse&width=980&height=auto&motion=pulse&showContribs=on&contribTheme=star&contribRange=16w&showLangs=on&langCount=4&langStyle=bar&barStyle=blocks"
  width="100%"
  alt="Terminal identity card with starfield activity"
/>
```

### Orbit builder

`theme=prism/aurora` · `contribTheme=orbit` · `contribRange=16w` · `accent=%239cd7ff` · `showLangs=off`

<img src="https://terminal-identity-opal.vercel.app/api?name=leo&username=doyoon530&role=product%20builder&tagline=Turning%20napkin%20ideas%20into%20small%20products%20people%20keep%20using.&status=building%20in%20public&command=pnpm%20ship%20--fast&theme=prism/aurora&avatar=LE&pattern=rings&width=980&height=auto&accent=%239cd7ff&showContribs=on&contribTheme=orbit&contribRange=16w&showLangs=off&barStyle=dots&v=43" width="100%" alt="Orbit contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=leo&username=doyoon530&role=product%20builder&tagline=Turning%20napkin%20ideas%20into%20small%20products%20people%20keep%20using.&status=building%20in%20public&command=pnpm%20ship%20--fast&theme=prism/aurora&avatar=LE&pattern=rings&width=980&height=auto&accent=%239cd7ff&showContribs=on&contribTheme=orbit&contribRange=16w&showLangs=off&barStyle=dots"
  width="100%"
  alt="Terminal identity card with orbit activity"
/>
```

### Signal radar card

`theme=obsidian/aurora` · `contribTheme=signal` · `contribRange=16w` · `motion=scan` · `stats=stars,forks,followers`

<img src="https://terminal-identity-opal.vercel.app/api?name=sora&username=doyoon530&role=platform%20engineer&tagline=Watching%20systems%2C%20signals%2C%20and%20all%20the%20small%20things%20that%20break%20first.&status=tracking%20latency%20and%20shipping%20fixes&command=pnpm%20run%20watch-signals&theme=obsidian/aurora&avatar=SR&pattern=grid&width=980&height=auto&motion=scan&showContribs=on&contribTheme=signal&contribRange=16w&showLangs=off&stats=stars%2Cforks%2Cfollowers&barStyle=dots&v=44" width="100%" alt="Signal contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=sora&username=doyoon530&role=platform%20engineer&tagline=Watching%20systems%2C%20signals%2C%20and%20all%20the%20small%20things%20that%20break%20first.&status=tracking%20latency%20and%20shipping%20fixes&command=pnpm%20run%20watch-signals&theme=obsidian/aurora&avatar=SR&pattern=grid&width=980&height=auto&motion=scan&showContribs=on&contribTheme=signal&contribRange=16w&showLangs=off&stats=stars%2Cforks%2Cfollowers&barStyle=dots"
  width="100%"
  alt="Terminal identity card with signal activity"
/>
```

### Citylight portfolio

`theme=amber/graphite` · `contribTheme=citylight` · `contribRange=16w` · `stats=repos,followers` · `excludeLangs=HTML,CSS`

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&username=doyoon530&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=amber/graphite&avatar=JW&pattern=grid&width=980&height=auto&showContribs=on&contribTheme=citylight&contribRange=16w&showLangs=on&langCount=3&langStyle=icons&iconSize=sm&stats=repos%2Cfollowers&excludeLangs=HTML%2CCSS&v=45" width="100%" alt="Citylight contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=jiwon&username=doyoon530&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=amber/graphite&avatar=JW&pattern=grid&width=980&height=auto&showContribs=on&contribTheme=citylight&contribRange=16w&showLangs=on&langCount=3&langStyle=icons&iconSize=sm&stats=repos%2Cfollowers&excludeLangs=HTML%2CCSS"
  width="100%"
  alt="Terminal identity card with citylight activity"
/>
```

### Firefly night mode

`theme=obsidian/velvet` · `contribTheme=firefly` · `contribRange=16w` · `hideCommand=true` · `motion=boot`

<img src="https://terminal-identity-opal.vercel.app/api?name=ara&username=doyoon530&role=night%20shift%20coder&tagline=Quiet%20hours%2C%20sharp%20focus%2C%20and%20tiny%20experiments%20that%20turn%20into%20features.&status=shipping%20after%20dark&theme=obsidian/velvet&avatar=AR&pattern=pulse&width=980&height=auto&motion=boot&showContribs=on&contribTheme=firefly&contribRange=16w&showLangs=off&hideCommand=true&v=47" width="100%" alt="Firefly contribution card" />

```html
<img
  src="https://terminal-identity-opal.vercel.app/api?name=ara&username=doyoon530&role=night%20shift%20coder&tagline=Quiet%20hours%2C%20sharp%20focus%2C%20and%20tiny%20experiments%20that%20turn%20into%20features.&status=shipping%20after%20dark&theme=obsidian/velvet&avatar=AR&pattern=pulse&width=980&height=auto&motion=boot&showContribs=on&contribTheme=firefly&contribRange=16w&showLangs=off&hideCommand=true"
  width="100%"
  alt="Terminal identity card with firefly activity"
/>
```

---

## API

```
GET https://terminal-identity-opal.vercel.app/api?[params]
```

Returns an `image/svg+xml` response. Drop it directly in any Markdown `<img>` tag. GitHub caches images — append `&v=2` (or increment) to bust the cache when you update params.

Animated cards use the same endpoint. Add `motion=pulse`, `motion=scan`, or `motion=boot` to return an animated SVG instead of a static one.

Contribution cards use the same endpoint too. Add `showContribs=on`, a `contribTheme`, and optionally `contribRange=4w|8w|12w|16w|24w|26w|39w|1y` plus `contribMode=compact|focus` to control how large the activity block feels inside the card. Range aliases `3m`, `6m`, and `9m` are also supported, and the summary label changes with the selected window (`last 16 weeks`, `last 6 months`, or `this year`). `cat_jump` uses a custom black pixel cat sprite with ghost-white eyes, `popcat` uses a custom mouth-opening pixel cat sprite, `capybara_onsen` uses a cozy yuzu bath sprite, `moon` draws custom SVG moon phases, `star` uses a custom glowing star, `orbit` draws a tiny planet system, `signal` renders radar-like arcs, and `citylight` turns activity into lit windows.

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

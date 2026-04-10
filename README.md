# Terminal Identity

<p align="center">
  <img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=claude/ember&avatar=GG&pattern=grid&width=980&height=520" width="100%" alt="Terminal Identity demo card" />
</p>

Terminal Identity generates beautiful terminal-style SVG profile cards from simple URL params, so you can drop a distinctive hero card into your GitHub README in seconds.

Live demo: [terminal-identity-opal.vercel.app](https://terminal-identity-opal.vercel.app)

## Why this has star potential

- The idea is obvious in one second
- The result looks good in screenshots and social previews
- People can use it with one copied URL
- It feels more personal and more distinctive than generic badges

## What it does

- Generates a terminal-style SVG identity card
- Accepts simple params like `name`, `role`, `tagline`, `theme`, and `pattern`
- Returns the image directly from `/api?...`
- Includes a polished live playground for copying API URLs and README markup
- Ships with a preset gallery for fast remixing
- Supports top-level provider shells like `claude/sakura`, `gpt/velvet`, and `gemini/aurora`
- Can pull live GitHub stats with `username=doyoon530`

## Provider styles

- `classic`: the original Terminal Identity shell
- `claude`: warm, soft, editorial chat-window energy
- `gpt`: darker, sharper, cleaner workspace energy
- `gemini`: brighter, glassier, more futuristic canvas energy

## Themes

- `ember`
- `aurora`
- `cobalt`
- `velvet`
- `graphite`
- `matcha`
- `sakura`
- `solar`

### Theme previews

#### `ember`

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=classic/ember&avatar=GG&pattern=grid&width=980&height=520" width="100%" alt="Ember theme preview" />

Inputs: `provider=classic`, `theme=ember`, `name=ggam`, `role=frontend engineer`, `avatar=GG`, `pattern=grid`

#### `aurora`

<img src="https://terminal-identity-opal.vercel.app/api?name=alex.dev&role=developer%20advocate&tagline=Teaching%20APIs%20without%20making%20them%20feel%20scary.&status=speaking%2C%20writing%2C%20and%20shipping%20DX%20experiments&command=npx%20explain-like-im-new&theme=gemini/aurora&avatar=AD&pattern=grid&width=980&height=520" width="100%" alt="Aurora theme preview" />

Inputs: `provider=gemini`, `theme=aurora`, `name=alex.dev`, `role=developer advocate`, `avatar=AD`, `pattern=grid`

#### `cobalt`

<img src="https://terminal-identity-opal.vercel.app/api?name=aria&role=platform%20engineer&tagline=Reliable%20infrastructure%20with%20humane%20developer%20tooling.&status=focused%20on%20observability%2C%20scale%2C%20and%20platform%20DX&command=terraform%20apply%20confidence&theme=gpt/cobalt&avatar=AR&pattern=rings&width=980&height=520" width="100%" alt="Cobalt theme preview" />

Inputs: `provider=gpt`, `theme=cobalt`, `name=aria`, `role=platform engineer`, `avatar=AR`, `pattern=rings`

#### `velvet`

<img src="https://terminal-identity-opal.vercel.app/api?name=noah&role=creative%20coder&tagline=Code%2C%20typography%2C%20and%20generative%20visuals%20in%20one%20place.&status=available%20for%20interactive%20art%20and%20frontend%20commissions&command=bun%20run%20make-something-strange&theme=claude/velvet&avatar=NH&pattern=pulse&width=980&height=520" width="100%" alt="Velvet theme preview" />

Inputs: `provider=claude`, `theme=velvet`, `name=noah`, `role=creative coder`, `avatar=NH`, `pattern=pulse`

#### `graphite`

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520" width="100%" alt="Graphite theme preview" />

Inputs: `provider=gpt`, `theme=graphite`, `name=mina.sh`, `role=indie hacker`, `avatar=MS`, `pattern=pulse`

#### `matcha`

<img src="https://terminal-identity-opal.vercel.app/api?name=leo&role=full-stack%20maker&tagline=Turning%20napkin%20ideas%20into%20products%20people%20keep%20using.&status=currently%20exploring%20AI%2C%20commerce%2C%20and%20tiny%20SaaS%20tools&command=pnpm%20ship%20--fast&theme=gemini/matcha&avatar=LE&pattern=grid&width=980&height=520" width="100%" alt="Matcha theme preview" />

Inputs: `provider=gemini`, `theme=matcha`, `name=leo`, `role=full-stack maker`, `avatar=LE`, `pattern=grid`

#### `sakura`

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520" width="100%" alt="Sakura theme preview" />

Inputs: `provider=claude`, `theme=sakura`, `name=jiwon`, `role=design engineer`, `avatar=JW`, `pattern=rings`

#### `solar`

<img src="https://terminal-identity-opal.vercel.app/api?name=hana&role=product%20engineer&tagline=Clean%20interfaces%2C%20kind%20systems%2C%20and%20rapid%20iteration.&status=available%20for%20startups%20that%20care%20about%20craft&command=npm%20run%20build-bright&theme=claude/solar&avatar=HA&pattern=rings&width=980&height=520" width="100%" alt="Solar theme preview" />

Inputs: `provider=claude`, `theme=solar`, `name=hana`, `role=product engineer`, `avatar=HA`, `pattern=rings`

## README examples

### Minimal hero

```md
# Hi there

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&theme=claude/ember&avatar=GG&pattern=grid" width="100%" alt="Terminal identity card" />
```

### Live GitHub status

```md
# Hi there

<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&username=doyoon530&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&command=npx%20terminal-identity&theme=gpt/graphite&avatar=GG&pattern=grid" width="100%" alt="Terminal identity card with live GitHub stats" />
```

### Profile intro

```md
# Jiwon Kim

<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings&width=980&height=520" width="100%" alt="Jiwon terminal identity card" />

I build expressive, careful interfaces and design systems.
```

### Builder profile

```md
# Mina

<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse&width=980&height=520" width="100%" alt="Mina terminal identity card" />

- Building small products
- Writing docs
- Sharing experiments
```

## Preset examples

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=gpt/graphite&avatar=MS&pattern=pulse" width="100%" alt="Indie hacker terminal identity card" />
```

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=claude/sakura&avatar=JW&pattern=rings" width="100%" alt="Design engineer terminal identity card" />
```

## API example

```text
/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=claude/sakura&avatar=GG&pattern=grid&width=980&height=520
```

If you pass `username`, the card will try to replace the manual status line with live public GitHub stats like stars, repos, and followers.

Use it in a README like this:

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&theme=gpt/velvet" width="100%" alt="Terminal identity card" />
```

## Run locally

Open `index.html` in a browser.

Or run a local static server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy on Vercel

- Import this repository into Vercel
- Deploy it as a project with serverless functions
- Your public card endpoint will be available at `/api`

## Good next features

- More themes inspired by editors and operating systems
- Light mode card variants
- Compact and wide card presets
- Social icons and stats rows as optional blocks
- Community preset gallery
- PNG export for social sharing

## Files

- `terminal-card.js`: shared SVG generation logic for browser and API
- `api/index.js`: Vercel serverless endpoint
- `index.html`: live playground
- `og-preview.svg`: social preview asset
- `script.js`: playground interactions
- `styles.css`: landing page styling

## License

MIT

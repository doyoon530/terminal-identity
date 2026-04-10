# Terminal Identity

<p align="center">
  <img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=ember&avatar=GG&pattern=grid&width=980&height=520" width="100%" alt="Terminal Identity demo card" />
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

## Themes

- `ember`
- `aurora`
- `cobalt`
- `velvet`
- `graphite`
- `matcha`
- `sakura`
- `solar`

## Preset examples

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=mina.sh&role=indie%20hacker&tagline=Shipping%20useful%20things%20before%20lunch.&status=building%20products%2C%20docs%2C%20and%20weird%20little%20experiments&command=pnpm%20create%20tiny-hit&theme=graphite&avatar=MS&pattern=pulse" width="100%" alt="Indie hacker terminal identity card" />
```

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=jiwon&role=design%20engineer&tagline=Design%20systems%20with%20motion%2C%20type%2C%20and%20restraint.&status=open%20to%20product%20design%20and%20frontend%20collaborations&command=npm%20run%20polish-ui&theme=sakura&avatar=JW&pattern=rings" width="100%" alt="Design engineer terminal identity card" />
```

## API example

```text
/api?name=ggam&role=frontend%20engineer&tagline=Building%20tiny%20tools%20with%20taste.&status=available%20for%20cool%20internet%20projects&command=npx%20terminal-identity&theme=ember&avatar=GG&pattern=grid&width=980&height=520
```

Use it in a README like this:

```html
<img src="https://terminal-identity-opal.vercel.app/api?name=ggam&role=frontend%20engineer&theme=ember" width="100%" alt="Terminal identity card" />
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

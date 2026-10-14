# Muhammad Zafar · Portfolio

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
|---|---|
| All copy: name, intro, skills, experience, projects, contact, quote, map cities | `data/site.ts` |
| Colour tokens, type utilities, motion | `app/globals.css` (`:root`) |
| Fonts (JetBrains Mono, Titillium Web Light, Source Serif 4, Alexandria (Urdu) subset) | `app/layout.tsx` |
| Light/dark theme tokens, corner-bracket `.frame`, buttons | `app/globals.css` |
| Contact map (CARTO vector basemap via MapLibre, lazy-loaded) | `components/KarachiMap.tsx` |
| Your portrait | `public/operator.jpg`, then set `site.photo` in `data/site.ts` |
| Hero isometric figure | `components/rig/` (`view.ts` layout, `geometry.ts` parts, `model.ts` metrics, `Rig.tsx` live, `rig.css` tokens) |
| Isometric kit (vendored from the anatomy skill) | `components/iso/` |
| Contact server action (zod + honeypot) | `app/actions.ts` |
| SEO: sitemap, robots, OG/Twitter images, JSON-LD | `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/page.tsx` |

## Contact email delivery

Without configuration, messages are validated and logged on the server. To email them, set:

```
RESEND_API_KEY=re_...
CONTACT_TO=mohamedalzafar@gmail.com          # optional, defaults to site.contact.email
CONTACT_FROM="Portfolio <hello@yourdomain>"  # optional, must be a verified Resend sender
```

## Changing the Urdu subtitles

`app/fonts/urdu-subset.woff2` is Alexandria Bold with only the glyphs for مہارت، تجربہ، منصوبے، رابطہ (3 KB).
If you change those words, regenerate it with fontTools:

```bash
pyftsubset Alexandria-Bold.ttf --text="your words" --layout-features='*' --flavor=woff2 --output-file=app/fonts/urdu-subset.woff2
```

or switch `app/layout.tsx` to `Alexandria` from `next/font/google`.

## Map worker

MapLibre runs its tile parsing in a Web Worker. `npm run dev` and `npm run build` first copy
`node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs` to `public/` (`npm run sync:maplibre`), so the worker always matches the installed version.

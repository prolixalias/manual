# Home Manual

Family handbook for 2925 Canton Road, Cheboygan. Astro site — same visual language as the shop site, no Jekyll.

## Development

Node work is Devbox `nodejs@24`, not the host toolchain.

```shell
devbox shell
devbox run install
devbox run dev
```

Open http://127.0.0.1:4321

```shell
devbox run build      # production build → dist/
devbox run preview    # serve dist/
devbox run which-node # confirm Nix node
```

`devbox run which-node` should print a Nix store path and Node 24.

CI uses the same `devbox.json` via `devbox run ci` (not `actions/setup-node`).

## Content

- Manual pages: `src/content/manuals/*.md`
- Catalog (nav, cards, related): `src/data/site.ts`
- Orchard trees: `src/data/trees.ts`
- Orchard map script: `public/scripts/orchard.js` (keep in sync with tree letters)
- Calendar: `src/components/CritterCalendar.astro` + `public/scripts/calendar.js` + `src/styles/calendar.css`
- Calendar “Under development” watermark: `calendarDevMode` in `src/data/site.ts` (`true` / `false`)

## Deploy

GitHub Pages via `.github/workflows/pages.yml`. Custom domain: `home.talbot.us`.

In the repo Pages settings, set the source to **GitHub Actions** (not "Deploy from a branch").

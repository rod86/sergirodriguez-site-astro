# Sergi Rodriguez Site

Personal website and portfolio built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

The site is fully static (pages are rendered at build time with zero client-side JavaScript by default).

## Tech Stack

- Node.js v24.16.0
- Astro 7
- Tailwind CSS 4
- TypeScript
- Vitest

## Requirements

- [Node Version Manager](https://github.com/nvm-sh/nvm)

## Setup

```bash
cp .env.example .env  # Create .env from sample .env file
nvm use               # use the Node version from .nvmrc
npm install           # Install dependencies and Husky git hooks
npm run dev           # Start dev server
```

## Commands

- `npm run dev`: Start the dev server with hot reloading
- `npm run build`: Type check and build to `dist/`
- `npm run preview`: Serve the production build locally
- `npm test`: Run all tests
- `npm run lint`: Lint `src/` and `tests/`
- `npm run lint:fix`: Lint and auto-fix
- `npm run astro`:  Run the Astro CLI (e.g. `npm run astro -- add <integration>`)


## Project Structure

```
collections/              Content data and assets
public/                   Static assets served as-is
src/
  assets/                 Global CSS, images and local SVG icons
  components/             Reusable .astro components (common, home, layout, contact)
  layouts/                Page layouts
  lib/                    Framework-agnostic logic and types
  pages/                  File-based routes
  content.config.ts       Content collection definitions and schemas
tests/
  lib/fixtures/           Shared test fixtures
  unit/                   Unit tests
```

## Testing

```bash
npm test
```

Tests live under `tests/` and match `tests/**/*.{test,spec}.ts`. Globals (`describe`, `it`, `expect`) are enabled, so no imports are needed. Coverage is collected with v8 and enforced at 80% for statements, branches, functions and lines; reports are written to `coverage/`.

## Code Quality

A Husky `pre-commit` hook runs `lint-staged`, which lints staged `.ts` and `.astro` files. `npm run build` also runs `astro check` first, so type errors fail the build.

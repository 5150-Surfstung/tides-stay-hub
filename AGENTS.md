# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is **The Folly Hub** — a full-stack TypeScript PWA (React + Express + PostgreSQL) serving as a Folly Beach community guide. See `package.json` `scripts` for all available commands.

### Services

| Service | How to run | Notes |
|---------|-----------|-------|
| **Dev server** (Express + Vite HMR) | `npm run dev` | Reads `.env` automatically; serves API + frontend on port 5000 |
| **PostgreSQL** | `sudo pg_ctlcluster 16 main start` | Must be running before the dev server starts |

### Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| TypeScript check | `npm run check` |
| Lint | `npm run lint` |
| Lint + autofix | `npm run lint:fix` |
| Tests | `npm run test` |
| Schema push | `npm run db:push` |

### Non-obvious caveats

- **PostgreSQL must be started manually** before running the dev server: `sudo pg_ctlcluster 16 main start`
- **`.env` file**: The dev scripts use Node.js `--env-file-if-exists=.env` to load environment variables. Copy `.env.example` to `.env` if it doesn't exist. The `.env` file is gitignored.
- **Schema push**: After first DB setup, run `npm run db:push` to create tables via Drizzle ORM. It reads `DATABASE_URL` from `.env`.
- **`attached_assets/` directory**: The repo references `@assets/IMG_2823_1771852254855.jpeg` via a Vite alias pointing to `attached_assets/`. This directory may not be committed (Replit artifact). Create a placeholder JPEG if missing to avoid Vite import errors.
- **VAPID keys**: Push notifications require `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `ADMIN_PUSH_KEY` in `.env`. Generate fresh keys with `npx web-push generate-vapid-keys`. Without them, push features degrade gracefully.
- **Weather API**: Uses Open-Meteo (free, no key). Works out of the box with network access.
- **API integration tests** (`tests/api.test.ts`): Require the dev server to be running on port 5000 before executing `npm run test`.

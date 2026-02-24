# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is **Tides Folly Beach Stay Hub** — a full-stack TypeScript PWA (React + Express + PostgreSQL) serving as a guest concierge for a hotel property. See `package.json` `scripts` for all available commands.

### Services

| Service | How to run | Notes |
|---------|-----------|-------|
| **Dev server** (Express + Vite HMR) | `DATABASE_URL="postgresql://devuser:devpass@localhost:5432/tidesapp" npm run dev` | Serves API + frontend on port 5000 |
| **PostgreSQL** | `sudo pg_ctlcluster 16 main start` | Must be running before the dev server starts |

### Non-obvious caveats

- **PostgreSQL must be started manually** before running the dev server: `sudo pg_ctlcluster 16 main start`
- **DATABASE_URL must be set** as an environment variable — the server crashes without it. Dev value: `postgresql://devuser:devpass@localhost:5432/tidesapp`
- **Schema push**: After first DB setup, run `DATABASE_URL="..." npm run db:push` to create tables via Drizzle ORM.
- **`attached_assets/` directory**: The repo references `@assets/IMG_2823_1771852254855.jpeg` via a Vite alias pointing to `attached_assets/`. This directory is not committed (likely a Replit artifact). Create a placeholder JPEG if missing to avoid Vite import errors.
- **No lint script**: There is no ESLint setup. The only static check is `npm run check` (TypeScript `tsc`), which has one pre-existing error about missing `web-push` type declarations.
- **No test suite**: The project has no automated tests.
- **VAPID keys** (optional): Push notifications require `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `ADMIN_PUSH_KEY` env vars. Without them, push features degrade gracefully.
- **Weather API**: Uses Open-Meteo (free, no key). Works out of the box with network access.

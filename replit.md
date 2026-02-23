# Tides Folly Beach | Stay Hub

## Overview

This is a **Progressive Web App (PWA)** called "Tides Folly Beach Stay Hub" — a mobile-first, offline-capable guest concierge/link hub for a vacation rental or hotel property. It provides guests with quick-access buttons for calling the front desk, texting, viewing restaurants, local attractions, and other stay-related information. The app is designed to work offline after the first visit using a service worker cache strategy.

The project uses a full-stack TypeScript architecture with a React frontend and Express backend. The backend serves weather APIs, push notification subscription management, and static files. PostgreSQL is used for push subscription persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin) with CSS custom properties for theming
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Animations**: Framer Motion for panel transitions and interactive elements
- **Data Fetching**: TanStack React Query (minimal usage currently)
- **Fonts**: Outfit (display/headings) and Inter (body text) via Google Fonts
- **Theme**: Dark navy/aqua color scheme (`#0b2230` navy, `#2aa9b8` aqua)
- **PWA**: Service worker (`sw.js`) with cache-first strategy, web app manifest for installability
- **Push Notifications**: Web Push API opt-in prompt appears after 5s delay, non-blocking

### Backend
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed with `tsx`
- **API Pattern**: RESTful routes prefixed with `/api`
- **Dev Server**: Vite dev server integrated as middleware during development (HMR via `/vite-hmr`)
- **Production**: Static file serving from `dist/public` with SPA fallback

### Build System
- **Client Build**: Vite (outputs to `dist/public`)
- **Server Build**: esbuild (bundles server to `dist/index.cjs` as CommonJS)
- **Build Script**: Custom `script/build.ts` that runs both builds sequentially, bundling common server deps to reduce cold start times

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` — `users` table and `pushSubscriptions` table
- **Validation**: Zod schemas generated via `drizzle-zod`
- **Storage Interface**: `IStorage` interface in `server/storage.ts` with `DatabaseStorage` implementation for push subscriptions (users still in-memory)
- **Database Config**: `drizzle.config.ts` expects `DATABASE_URL` environment variable
- **Migrations**: Use `npm run db:push` (drizzle-kit push) to sync schema to database

### Push Notifications
- **Library**: `web-push` npm package for server-side push delivery
- **Configuration**: VAPID keys stored as environment variables (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT)
- **Admin Access**: Protected by ADMIN_PUSH_KEY environment variable, accessible at `/admin` route
- **Service Worker**: Handles `push` and `notificationclick` events (sw.js v10)
- **Opt-in Flow**: Non-blocking banner appears 5s after page load, choice stored in localStorage
- **Stale Cleanup**: Failed sends (410/404) automatically remove stale subscriptions

### API Routes
- `GET /api/weather` — weather, marine, and tide data (10-min server cache)
- `GET /api/push/vapid-key` — returns public VAPID key for client subscription
- `POST /api/push/subscribe` — saves a push subscription
- `POST /api/push/unsubscribe` — removes a subscription
- `POST /api/push/send` — sends notification to all subscribers (admin key required)
- `GET /api/push/stats` — returns subscriber count (admin key required)

### Key Design Decisions
1. **DatabaseStorage for push subscriptions**: Push subscriptions are persisted in PostgreSQL so they survive server restarts. User data remains in-memory as it's not actively used.
2. **Shared schema directory**: `shared/schema.ts` contains types used by both client and server, ensuring type consistency across the stack.
3. **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`.
4. **Offline-first PWA**: The service worker caches the app shell on first visit, allowing the app to function without internet. Push notification handling is separate from caching logic.
5. **Non-blocking opt-in**: Push prompt appears after 5s delay to avoid interrupting the initial page experience. Choice is persisted in localStorage.

### Directory Structure
```
client/              # Frontend React application
  src/
    components/ui/   # shadcn/ui component library
    pages/           # Route page components (Home, Admin, not-found)
    hooks/           # Custom React hooks
    lib/             # Utilities (queryClient, cn helper)
    assets/          # Static assets (images)
  public/            # Static public files (sw.js, manifest, icons)
server/              # Express backend
  index.ts           # Server entry point
  routes.ts          # API route registration (weather + push)
  storage.ts         # Data storage interface and implementation
  pushService.ts     # Web Push configuration and send logic
  db.ts              # PostgreSQL connection pool (Drizzle)
  static.ts          # Production static file serving
  vite.ts            # Development Vite middleware setup
shared/              # Shared types and schemas
  schema.ts          # Drizzle database schema + Zod validation
migrations/          # Drizzle database migrations (output dir)
script/              # Build scripts
attached_assets/     # Reference/design assets
```

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string
- `VAPID_PUBLIC_KEY` — Web Push VAPID public key
- `VAPID_PRIVATE_KEY` — Web Push VAPID private key
- `VAPID_SUBJECT` — VAPID subject (mailto: URL)
- `ADMIN_PUSH_KEY` — Admin authentication key for sending push notifications

## External Dependencies

- **PostgreSQL**: Database for push subscription storage. Used via Drizzle ORM.
- **web-push**: Server-side Web Push notification delivery
- **Google Fonts**: Outfit and Inter font families loaded from `fonts.googleapis.com`
- **Radix UI**: Headless UI component primitives (extensive set used via shadcn/ui)
- **Framer Motion**: Animation library for page transitions and interactive elements
- **Recharts**: Charting library (available via shadcn chart component)
- **Service Worker**: Browser-native PWA support for offline caching and push notification handling

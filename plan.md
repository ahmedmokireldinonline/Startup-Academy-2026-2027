# Backend Dashboard & Protected Directory Plan

## Goal
Replace the current browser-only registration gate with server-backed registration, persistent lead storage, protected source links, and an admin dashboard for the academy owner.

## Design and interaction

- **Design movement:** quiet operations console: the public site keeps its animated editorial identity, while `/admin` uses a focused command-center layout for fast lead triage.
- **Core principles:** private by default, explicit access state, quick scanning, and no source URL in the public client bundle.
- **Color philosophy:** retain the academy navy/coral/mint palette; use navy for authenticated actions, mint for qualified/complete states, and coral only for attention or follow-up.
- **Layout paradigm:** a compact top status rail, summary metrics, then a wide lead table with filters; details remain one click away rather than creating a multi-page admin maze.
- **Signature elements:** lock state before registration, a clear “source unlocked” status after registration, and small country flags/phone metadata in the lead row.
- **Interaction philosophy:** registration creates a server session; the directory asks the server for sources only after that session is valid; admin mutations show the result immediately and preserve the current filter.
- **Animation:** use restrained entrance and status transitions in the dashboard; retain stronger motion only on the public landing page and respect reduced-motion preferences.
- **Typography:** preserve Readex Pro/Noto Kufi Arabic for Arabic UI and the existing display treatment for public pages; dashboard labels stay short and legible.
- **Brand essence:** a practical access layer between founders and verified growth programs; clear, protective, operator-minded.
- **Brand voice:** “سجّل مرة واحدة، ثم افتح المسار المناسب.” / “لا نعرض الرابط فقط؛ نتابع ما يحدث بعد الوصول.”

## Implementation

1. Add `registrations` and `registrationAccessTokens` MySQL tables through Drizzle.
2. Add public tRPC registration and access-status procedures. Registration creates a lead, hashes a random access token, and sets an HttpOnly, Secure, SameSite cookie.
3. Move full program records and official URLs into a server-only catalog. Keep only URL-free program summaries in the browser bundle.
4. Add a protected `directory.list` procedure that returns official URLs only after validating the registration access cookie.
5. Add admin-only procedures using the existing Manus OAuth `role=admin` check: dashboard stats, paginated/filterable registrations, status updates, and CSV export data.
6. Add a responsive `/admin` route using the existing protected tRPC client and the current admin role model.
7. Add Vercel Node API entrypoints for `/api/trpc/*` and `/api/health`, while retaining the Vite static output for the public pages.
8. Document required production environment values (`DATABASE_URL`, existing Manus auth values, and the production domain/cookie requirements). No secrets are stored in source.

## Project structure

- `drizzle/schema.ts`: persistent lead and access-token tables.
- `server/db.ts`: lead/access queries and admin dashboard queries.
- `server/access.ts`: HttpOnly access-cookie parsing and token hashing.
- `server/programCatalog.ts`: server-only program details and official URLs.
- `server/routers.ts`: registration, protected directory, and admin tRPC procedures.
- `api/trpc/[trpc].ts`: Vercel serverless tRPC adapter.
- `client/src/pages/Admin.tsx`: owner dashboard.
- `client/src/pages/Register.tsx`: server-backed registration and contact handoff.
- `client/src/pages/Programs.tsx`: URL-free locked view and server-loaded unlocked view.

## Required production configuration

The app needs a MySQL-compatible `DATABASE_URL` in the production environment and the existing Manus OAuth configuration (`MANUS_PROJECT_ID`, `MANUS_JWT_SECRET`, `MANUS_OAUTH_API_URL`, and `OWNER_OPEN_ID`). The database migration must run before production registration is enabled. The owner account must resolve to `role=admin`.

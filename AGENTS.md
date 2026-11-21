<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MentorLagbe — Agent Guide

Tuition marketplace for Bangladesh: students find tutors, tutors post tuitions,
admins moderate. Built phase by phase against the requirements doc below.

## Requirements & design authority

- **SoT (requirements):** `C:\Users\LENOVO\Downloads\mentorlagbe_full_stack.docx` —
  extracted text lives at `%TEMP%\opencode\docx_extract\document.txt`
  (line numbers are cited in code comments as `docx line N`).
  **Where the docx and the design mockups conflict, the docx wins.**
- **Design authority (visuals):**
  `c:\Users\LENOVO\Downloads\stitch_mentorlagbe_edtech_platform_design\`
  — each feature folder contains `code.html` to mine for markup/copy.
- Design extras not required by the docx are parked for later discussion in
  `C:\Users\LENOVO\.opencode\plan\dashboard-design-notes.md` (numbered list —
  add new ones there, don't silently implement them).

## Stack & environment

- Next.js **16** (App Router, Turbopack, Cache Components enabled — read
  `node_modules/next/dist/docs/` before coding; `fetch` is uncached by default
  and blocks render, so plain `await fetch(...)` in a server component =
  request-time data), Tailwind v4, shadcn/ui + base-ui primitives, lucide-react.
- **Backend:** sibling repo `..\mentorlagbe-server` (Express + MongoDB Atlas,
  single `index.js`). Base URL from `.env`: `NEXT_PUBLIC_API_URL=http://localhost:5000`.
  Public reads: `GET /tuitions` (approved+active only; `q/subject/classLevel/mode`
  params), `GET /tuitions/:id`. Auth'd writes: `POST /tuitions` (Bearer + tutor role).
- Auth = Better Auth (`src/lib/auth.ts`, `auth-client.ts`). Test users are
  created live via `POST /api/auth/sign-up/email` with `{name,email,password,role}`
  (password pattern `Str0ng!Pass9`).

## Repository map

```
src/app/(site)/            public pages: home, /tuitions, /tuitions/[id], pricing…
src/app/(dashboard)/       dashboard route group: layout (session guard) + stubs/content
src/components/layout/     site header/footer, TuitionsCard (shared card)
src/components/tuitions/   browse, details, apply dialog
src/components/dashboard/  shared/ (chrome, sidebar, header, StatCard, nav-config),
                           student/, tutor/ (admin/ pending)
src/lib/actions/           API calls: tution.ts (POST, client-safe),
                           tuition-query.ts (GET + mapper, server-only)
src/lib/core/              session.ts (server), session-client.ts (client),
                           server.ts (authHeader)
src/lib/data/              seed datasets (tuitions, applications, tutor) + types —
                           still used by dashboards; public pages now read the API
```

## Data-layer status (as of Phase 11)

| Surface | Source |
|---|---|
| Browse `/tuitions`, details `/tuitions/[id]` | **API** (`tuition-query.ts` → GET /tuitions, /tuitions/:id), raw backend `ITuition` shape (no mapper) |
| Tutor post submission | **API** (`createTuition` in `actions/tution.ts`) |
| Admin overview, users, moderation, transactions | **API** (`admin-query.ts` reads, `admin.ts` writes) — backend endpoints listed under Completed phases |
| Student dashboard applications, tutor dashboard (posts/applicants), saved tuitions | Seed/client-side (`lib/data/*`, localStorage store) — `TODO(backend)` markers mark every swap point |
| Homepage featured tuitions | Local component data |

`tuition-query.ts` returns raw backend docs (`_id`, `Online/Offline`, numeric
`daysPerWeek`, `bannerImage`, `createdAt`, `tutorEmail`) — components consume
those names directly. Banner paths are `tuitions-N.jpg` (assets copied into
`public/` to match). Seed records in `src/lib/data/tuitions.ts` stay standalone
for the dashboards. Admin reads use `getServerToken()` (JWT) — the opaque session
token from `authHeader()` 401s against backend `verifyToken`.

## Completed phases

- **Phase 9** Browse `/tuitions` (filters, sort, pagination) · **9b** Details
  `/tuitions/[id]` (metadata, notFound, apply dialog refactor to shadcn Dialog)
- **Phase 10a** Dashboard shell — `(dashboard)` route group, shadcn `ui/sidebar`
  (`SidebarProvider` + cookie, `collapsible="icon"`, mobile sheet), server-side
  session guard in `dashboard-chrome.tsx` wrapped in `<Suspense>` (routes build
  as `◐ Partial Prerender`; private routes never bounce to login on reload),
  nav from `nav-config.ts`; folder structure follows
  `github.com/habib-utsho/ph-car-wash-system-client`.
- **Phase 10b** Student content — 4 stat cards, my-applications table
  (cancel-pending), seeded joins.
- **Phase 10c** Tutor content — overview 4 stats, post-tuition form (validated,
  free-plan quota, banner presets), my-tuitions CRUD (toggle/edit/delete via
  `useSyncExternalStore` → localStorage), manage-applicants accept/reject.
- **Phase 11** Admin dashboard content (docx 107–110) — 4 stat cards, users
  table with inline role select, tuition moderation with Approve/Reject,
  transactions table. Server reads (`admin-query.ts`), client writes
  (`admin.ts` → toast + `router.refresh()`). Design extras parked in
  `dashboard-design-notes.md` items 25–30.
- **Next:** profile page (docx 112). Backend still owes: `GET /admin/stats`,
  `GET /admin/users`, `PATCH /admin/users/:id/role`, extended
  `GET /admin/tuitions` (all posts, not just pending),
  `PATCH /admin/tuitions/:id/approval`, `GET /admin/transactions`.

## Verification ritual (run before reporting any phase done)

1. `npm run lint` — must exit 0.
2. Quiet window: no `src/` writes in the last ~45s (concurrent session may be
   editing), then `npm run build` — exit 0, warnings only
   (`Social provider google is missing clientId`, package-lock outside git repo).
3. Live SSR checks against the dev server on `:3000` with a fresh temp user
   (sign-up → session cookie → fetch pages → assert markers). Scripts live in
   `%TEMP%\opencode\check-*.ps1`. Gotchas: strip `<script>` RSC payloads before
   matching; streamed redirects emit `NEXT_REDIRECT;...` (no 3xx); `$` is a
   regex anchor in PowerShell (`[regex]::Escape` literal text); `৳` mojibakes
   in console output but is fine in HTML.

## Next 16 gotchas (learned during the API swap)

- Uncached `fetch` in a page fails `next build` (`blocking-prerender-dynamic`).
  Fix used: `loading.tsx` in the segment (wraps pages in `<Suspense>`, static
  shell + streamed data). `export const instant = false` is the last resort.
- `usePathname()` in a client component blocks prerender of dynamic routes —
  `SiteHeader` sits behind `<Suspense>` in `(site)/layout.tsx` for this reason.
- Streamed `notFound()` keeps status **200** + adds `<meta name="robots"
  content="noindex">` (documented in `loading.md` → Status codes). The checker
  asserts that behavior instead of a 404 status.

## Conventions

- Keep responsiveness; keep code simple — no speculative abstractions.
- `TODO(backend)` = swap point for a real endpoint; never remove without doing it.
- Lucide icon names vary by version — grep
  `node_modules/lucide-react/dist/lucide-react.d.ts` for `declare const <Name>`
  before importing (e.g. `Trash2`/`CircleAlert` don't exist here).
- Nothing gets committed unless the user asks.

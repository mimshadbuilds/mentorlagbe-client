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
| Tutor my-tuitions CRUD + toggle | **API** (`tutor-query.ts` → GET /tuitions/my with server JWT; `updateTuition`, `deleteTuition`, `setTuitionActive` in `actions/tution.ts` with client JWT) |
| Admin overview, users, moderation, transactions | **API** (`admin-query.ts` reads, `admin.ts` writes) — backend endpoints listed under Completed phases |
| Profile `/dashboard/profile` | **Better Auth** (`authClient.updateUser`); `phone`/`bio` are user `additionalFields` in `auth.ts` — no backend endpoint needed |
| Student/tutor applications + dashboards | **API** (`application-query.ts` reads GET /applications/student|tutor with server JWT; `application.ts` writes POST/PATCH/DELETE with client JWT) |
| Stripe checkout/status + current plan | **API** (`payment.ts` client: POST /payments/checkout, GET /payments/status?session_id=…, GET /users/me; `payment-query.ts` server mirrors) |
| Saved tuitions | Seed/client-side (`lib/data/*`, localStorage store) — `TODO(backend)` markers mark every swap point |
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
- **Phase 12** Profile page (docx 112) — shared editor for all roles: name, phone,
  bio, picture URL + live avatar preview; persists via `authClient.updateUser`.
  Added `phone`/`bio` as user `additionalFields` in `auth.ts` (no backend endpoint
  needed). `TODO(backend)` for direct ImgBB upload (no API key in `.env`); design
  extras parked as notes items 31–35.
- **Phase 13** 404 + error pages (user-requested design clone, not in docx) —
  root `not-found.tsx` (mentorlagbe_404_not_found: badge, 404/Error cue, recovery
  search `GET /tuitions?q=` → `initialSearch` prop on BrowseTuitions, quick links,
  help strip), shared `components/error-screen.tsx` (mentorlagbe_global_error_500)
  used by root `error.tsx` (`{error, retry}` per Next 16) and `global-error.tsx`
  (own html/body + globals.css). Notes items 36–38 park the substitutions.
  Verified by `check-404-error.ps1` (31/31) — see gotchas below.
- **Phase B (My Tuitions API swap)** `/dashboard/tutor/my-tuitions` now reads
  `GET /tuitions/my` server-side (`tutor-query.ts`) and writes via PATCH/PATCH
  status/DELETE in `actions/tution.ts`; `router.refresh()` re-reads after each
  write. UI, filters, dialogs and responsiveness unchanged; seed/localStorage
  store stays for saved tuitions. Applicant counts now come from the API.
  Verified by `check-my-tuitions.ps1` (14/14) and `check-tutor-crud.ps1` (5/5).
- **Phase C (Tutor applicants)** `/dashboard/tutor/applicants` reads
  GET /applications/tutor server-side; accept/reject PATCHes
  /applications/:id/status (only pending rows show actions). Tutor overview and
  my-tuitions applicant counts use the same real data.
- **Phase D (Student applications)** Apply dialog POSTs /applications (duplicate
  409 → error toast), my-applications reads GET /applications/student and cancels
  via DELETE /applications/:id (pending only); student overview stats are API-fed.
  Verified by `check-applications-api.ps1` (18/18).
- **Stripe frontend (gap-fill + F1–F8)** `/pricing` is server-resolved by role and
  plan: matching role gets "Subscribe with Stripe" (`tutor_pro` / `student_pro`),
  other roles/admins get a disabled CTA, guests get `/sign-in?redirectTo=/pricing`.
  `startCheckout` POSTs `{planId}` (`tutor_pro` / `student_pro`) to
  `/payments/checkout` and redirects to `checkoutUrl || url`. Dashboard upgrade
  buttons use the same action. Success
  page verifies `GET /payments/status?session_id=…` server-side and shows
  confirmed / processing / error states; the URL alone never grants Pro. Cancel
  page never shows a receipt. Admin table uses per-record currency and
  paymentStatus. Pro pricing says "One-time payment" (matches backend's
  `mode: "payment"`). Verified by `check-stripe-frontend.ps1` (17/17),
  `check-pricing-payment.ps1` (19/19) and `check-pro-unlock.ps1` (11/11 —
  Pro role/plan state, dashboard unlock, no duplicate checkout). A gold PRO
  badge is rendered in both the site and dashboard headers from `GET /users/me`
  (`useProStatus`); verified in-browser with a Pro student. Saved tuitions is
  implemented with a per-user localStorage store: free students get 5 bookmarks,
  Pro gets unlimited; details-page bookmark button and dashboard list (row/table
  listing) share it. Verified in-browser (`cdp-bookmark-check.js`): free stays
  at 5 with a limit toast, Pro goes to 6 and shows "Unlimited with Pro". No
  backend endpoint yet. `dashboard-chrome.tsx` needs `min-w-0` on its content
  column + `SidebarInset` or wide tables push the whole page into horizontal
  scroll. Backend webhook (`mentorlagbe-server/index.js`) verified with a
  signature-valid synthetic `checkout.session.completed` event
  (`scripts/test-webhook.js` in the server repo): user `plan` + `planUpdatedAt`
  set, full payment doc in `payments`, idempotent replay, 400 on bad signature
  or tampered amount, `GET /payments/status` returns paid, Pro badge/pricing
  unlock in the browser. Real Stripe-delivered webhook still untested.
- **Quick Links + workflow redesign** (user-requested, docx 88 + 111) — the
  dashboard sidebar has a "Quick Links" group below Workspace shared by all
  roles (Homepage `/`, Update Profile `/dashboard/profile`, Pro Plans
  `/pricing`); `isActivePath` is bypassed for `/` so it never marks every route
  active. The homepage "How MentorLagbe Works" section is a unified 4-step flow
  (post → browse → apply → match) with connector arrows that rotate for mobile.
  Verified in Chrome at 1440px and 390px; no horizontal overflow.
- **Hero + final CTA redesign** (user-supplied `Temp\code.html`) — hero is now
  the design's 7/5 grid with an integrated 4-cell filter card and floating
  image cards (mentor pill, NCTB & CAIE badge, batch snapshot); final CTA is a
  contained `bg-primary` rounded banner with copy left / buttons right.
  All original text preserved. Verified at 1440px and 390px in dark mode;
  `docW == clientW`. Note the Button `outline` variant injects
  `dark:bg-input/30`, so the white CTA button uses no variant.
- **Vercel session fix (user's solution)** — `src/lib/auth.ts` now eagerly
  `connect()`s one module-level `MongoClient` (`maxPoolSize: 10`) with a
  top-level `await` and exports the usual singleton `auth`; `autoSignIn: false`
  added (signup form already redirects to /sign-in). Also added
  `trustedOrigins: ["https://mentorlagbe-client-*.vercel.app"]` so preview
  deployments pass Better Auth's origin check (Vercel env pins
  `BETTER_AUTH_URL` to the `olive` domain). Verified: preview soak + production
  soak on `olive` clean — no `MongoTopologyClosedError`, no
  `Failed to get session`; profile update CORS only fails from preview hosts
  (backend `CLIENT_URL` = olive only — by design, untouched). Temporary
  `close`/`topologyClosed` diagnostics listeners added during testing and
  removed after the fix proved out. Not committed.
- **Next:** Stripe checkout/webhooks (docx Challenge 2) and ImgBB direct upload
  (Challenge 3, another session already committed imgbb work). From Phase 11 the
  backend still owes: `GET /admin/stats`, `GET /admin/users`,
  `PATCH /admin/users/:id/role`, extended `GET /admin/tuitions`,
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
- The `/` homepage hits the same `blocking-prerender-dynamic` rule once
  `FeaturedTuitions` became a live fetch — fixed by wrapping it in `<Suspense>`
  directly in `(site)/page.tsx` (no segment `loading.tsx` needed).
- Streamed not-found markup arrives inside inline `<script>` swap chunks —
  checkers that strip `<script>` before matching won't see it; match the raw
  body for `notFound()` assertions.
- `error.tsx` renders **client-side**: the SSR body is an empty shell plus a
  serialized error payload. Verify the UI with headless Chrome `--dump-dom`,
  capturing stdout via `System.Diagnostics.Process` (the `& $chrome` call
  operator captures nothing). Probe route must not start with `_` (private
  folder → no route); checker uses a temp `src/app/error-probe/page.tsx`,
  added and removed around the run.
- `middleware.ts` is deprecated in Next 16 — `src/proxy.ts` is the route guard.
  Its matcher is a build-time constant: `["/dashboard/:path*"]` covers `/dashboard`
  and every private nested route (profile included), leaving public site/payment
  pages alone. Guests get `307 /sign-in?redirectTo=<original path+query>`; the
  sign-in form uses that value as `callbackURL`. Authenticated reloads stay 200.

## Conventions

- Keep responsiveness; keep code simple — no speculative abstractions.
- `TODO(backend)` = swap point for a real endpoint; never remove without doing it.
- Lucide icon names vary by version — grep
  `node_modules/lucide-react/dist/lucide-react.d.ts` for `declare const <Name>`
  before importing (e.g. `Trash2`/`CircleAlert` don't exist here).
- Nothing gets committed unless the user asks.

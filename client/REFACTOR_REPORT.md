# Frontend refactor report

## Scope

This pass reorganized the frontend into feature-owned areas while preserving the existing routes, UI copy, API behavior, and backend contracts.

No Git commands were run.

## Architecture shape

- `src/app` owns application composition and route registration.
- `src/api/client.ts` remains the root Axios transport.
- `src/contracts` holds canonical shared backend contracts.
- `src/context` continues to hold cross-cutting auth, language, and events providers.
- `src/components/navigation` owns the shared site header/footer navigation.
- `src/sections/<feature>` owns each product area, including its pages, local components, hooks, copy, model helpers, API wrappers, contracts, and internal UI types.
- `src/sections/payments` contains the shared payment session/formatting/mapping helpers plus separate donation and event-registration feature folders.

## Major changes

- Moved page components out of the old global `pages` layout and into their owning feature folders.
- Split `SiteHeader` into focused navigation pieces:
  - `DesktopNavigation`
  - `DesktopAccountControls`
  - `MobileNavigation`
  - `LanguageToggle`
  - `navigationConfig`
- Extracted auth page chrome and background structure into shared auth components while keeping the original login, signup, reset, forgot-password, and verification behavior.
- Extracted auth form state/orchestration into feature hooks:
  - `useLoginForm`
  - `useSignupForm`
  - `useForgotPasswordForm`
  - `useVerifyAccountForm`
  - `useResetPasswordForm`
  - `useVerificationCountdown`
- Added feature API modules around existing endpoints while leaving `src/api/client.ts` as transport-only.
- Split canonical external contracts from internal feature UI types.
- Consolidated duplicated payment mapping and currency formatting.
- Extracted donation payment status panels, account history rows, admin overview content, event editor fields, and gallery detail state into cohesive modules.
- Moved gallery media/catalog construction helpers into feature model files so gallery, events, and detail pages share one source of truth.

## Behavior preservation checks

Completed checks:

- TypeScript compiler: passed via `npx tsc -b`.
- Production build: passed via `npm run build`.
- Route path and route order comparison: identical.
- Root Axios transport comparison: identical.
- Backend contract declaration comparison: identical for the extracted contracts.
- API method, endpoint, payload expression, and options comparison: identical.
- Static baseline/current render comparison: 30 route/header render cases passed.

Build note:

- Vite still reports the inherited large chunk warning for the app bundle.

Lint note:

- `npm run lint` still fails with 12 errors and 1 warning. These are the preserved/inherited issues that were intentionally not fixed in this behavior-preserving refactor:
  - Fast Refresh export warnings in `AuthContext`, `EventsContext`, and `LanguageContext`.
  - Missing `refreshAuth` dependency warning in `AuthContext`.
  - `Math.random()` during render in `AdminDashboard`.
  - Existing synchronous set-state-in-effect issues in admin, verification, events slideshow, and gallery detail state.
  - Existing conditional hook issue in `GalleryView`.

## Preserved differences and follow-up candidates

These were noticed during the refactor but left unchanged because they may encode current product/backend behavior:

- Donation and event-registration payment flows still differ in cancel, resume, status, and error handling.
- Donation and event-registration still use their existing `clientSecret` / `client_secret` wire shapes.
- The missing `/payments/donate/result` route was not added.
- The gallery conditional-hook lint issue was preserved rather than behaviorally rewritten.
- Auth-local language behavior remains separate from the global language context where it already was.
- Admin dashboard random background behavior was not changed.

## Files intentionally left untouched

After cleanup, files with only import or formatting churn were restored to their original text. Temporary mechanical refactor scripts were removed before handoff.

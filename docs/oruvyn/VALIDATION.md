# Oruvyn foundation — implementation and validation

The subsequent customer-facing branding cleanup is recorded in [BRANDING_CLEANUP.md](BRANDING_CLEANUP.md).

## Delivered

The starting checkout was an empty Oruvyn repository, not Twenty. The feature branch imports upstream revision `5053a46ba9e18486c1dc14ee4f772b32fe29dbd4` as a separate baseline and preserves upstream licenses, Enterprise markers, technical identifiers, and trademark policy. The original Oruvyn MIT notice is retained as provenance, not applied to upstream code.

The frontend foundation now includes:

- Shared navy neutral scales, teal/mint accents, immutable brand tokens, readable text, refined borders and typography, and regenerated light/dark CSS and TypeScript theme artifacts.
- Original geometric SVG identity, reusable accessible wordmark/symbol, favicon, raster touch icon, social assets, browser titles, metadata, and app manifest.
- Branded collapsible navigation with workspace identity, existing search/profile controls, selected-state styling, keyboard focus, and reduced-motion handling.
- A global Create dropdown listing only real, readable, creatable objects. It calls the existing record-creation hook, retaining form feature flags, permissions, RLS inputs, record opening, mutations, and error toasts.
- Responsive split authentication presentation, workspace-logo preservation, semantic form headings, sign-in/invitation identity, and password-reset composition. Existing SSO, 2FA, captcha, validation, and invitation state transitions remain intact.
- A source-license link that preserves access to legal notices without advertising upstream operator policies.
- Focused native Storybook previews of actual components, plus a development/audit/brand runbook and Codespaces port labels.

## Verification evidence

| Check | Result |
| --- | --- |
| Locked dependency installation with Node 26.12.1 / vendored Yarn 4.18.1 | Passed; upstream peer and disabled-script warnings retained |
| Theme generator | Passed; 1,008 tokens |
| Targeted design-token/contrast tests | 2 files, 17 tests passed |
| Existing page-title Jest regression | 1 suite, 1 test passed |
| New permission-aware Create dropdown Jest tests | 1 suite, 3 tests passed |
| Plain repository oxlint on changed frontend files | Passed, no warnings or errors |
| Shared runtime build, declaration emission, alias resolution | Passed using existing underlying commands |
| Shared UI Vite build | Passed |
| New logo/layout/story typecheck against actual source types | Passed; limited scope, not a full-app result |
| Changed TypeScript syntax transpilation | Passed, 32 files at the time of the check |
| Focused Chromium previews | Desktop auth, mobile 390 px, tablet 834 px, light/dark identity, and compact logo rendered with no browser errors or horizontal overflow |
| Formatting and whitespace | Passed on changed code and token sources |

Browser checks validate composition and responsive behavior. They do not demonstrate a live login, record mutation, or functioning production workspace. The authentication story contains static explanatory preview content, not simulated authentication controls or business metrics.

## Environment limitations and failures

- Nx shared builds stalled in the unchanged `generateBarrels` prerequisite. Those commands were stopped; the exact cause was not established. The existing Vite/declaration/alias commands succeeded against the unchanged tracked barrels. Upstream build scripts were not rewritten.
- Full frontend native typechecking and type-aware lint were terminated with SIGTERM and no TypeScript diagnostics, including attempts with bounded concurrency/memory. These checks are **not passing** and remain required before release. Plain lint, focused tests, limited new-component typechecking, and the shared UI build are separate successful checks.
- Early commands failed because the sandbox blocks IPC sockets/network-interface reads, undeclared workspace binary resolution, or GitHub registry access. Applicable checks were rerun outside the sandbox or through the installed CLI entry points; failures are not counted as successful checks.
- The standard frontend Storybook includes the complete CRM test-provider graph and its first browser load timed out. The focused configuration uses the actual application's Vite setup, Inter, Lingui, and shared theme with no database fixtures. Chromium's missing libraries were installed before successful checks.
- Docker daemon access was confirmed. PostgreSQL, Redis, the CRM server, and workers were not started. This session provides a component preview, not a running full CRM. The Codespace has 7.8 GiB RAM; approximately 8 GiB disk remained after dependencies and browser tooling were installed.

## Private preview

Port **6006** was registered as private through the Codespaces CLI. The focused preview runs in a terminal; keep that terminal open. If the process stops, restart it using [DEVELOPMENT.md](DEVELOPMENT.md).

Open `/?path=/story/modules-branding-oruvynidentity--auth-layout` on the forwarded port, or choose Modules → Branding → OruvynIdentity in the Storybook navigation. Port **3001** is reserved for the actual CRM frontend when its backend is available; **6008** is the broader shared UI Storybook port.

## Remaining work

1. Resolve the full frontend typecheck/type-aware-lint termination and validate in the full development stack.
2. Start PostgreSQL/Redis/server/worker in a suitably provisioned environment; verify login, workspace switching, invitation/2FA/reset flows, permissions, Create, and CRUD end to end.
3. Complete the requested shell notifications experience against a real notification source. Upstream supplies toasts and AI unread indicators, not a general CRM notifications center; no inert bell or fake notification feed was added.
4. Build the Phase 2 home dashboard using permission-aware real aggregate queries, upcoming tasks and activities, honest empty states, and clear loading/error behavior. No fabricated metrics were introduced.
5. Apply dedicated Phase 3 presentation improvements to People, Companies, Opportunities, Tasks, and record details. They inherit the shared theme today; existing workflows were not replaced.
6. Complete settings polish, responsive record-table review, performance/a11y regression checks, and broader upstream branding review. Supply Oruvyn operator policy URLs before public launch. Existing translations are maintained by the upstream Lingui pipeline; no generated catalogs were committed incidentally.

The changes intentionally establish an incremental frontend foundation. They are not a claim that every requested CRM workspace or every Phase 1 acceptance criterion has been completed or production-certified.

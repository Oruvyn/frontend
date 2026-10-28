# Oruvyn frontend foundation audit

## Starting checkout

The initial `Oruvyn/frontend` checkout contained only a README and an Oruvyn MIT license. It was **not** a Twenty monorepo. The working tree was clean on `main`, at `1dc72cd` (`Initial commit`). No existing CRM implementation could be restyled in that state.

Twenty was downloaded from `https://github.com/twentyhq/twenty` at revision `5053a46ba9e18486c1dc14ee4f772b32fe29dbd4` and imported into the requested `feat/oruvyn-frontend` branch. The import retains the upstream package layout, backend, development tooling, notices, and package names. The baseline import commit is `d149f9e`. Product changes should be reviewed against that import rather than against the original two-file repository.

## Confirmed architecture

| Concern | Source of truth |
| --- | --- |
| React/TypeScript frontend | `packages/twenty-front` |
| Shared components and theme provider | `packages/twenty-ui/src` |
| Editable design tokens | `packages/twenty-ui/design-tokens` |
| Theme artifact generator | `packages/twenty-ui/scripts/generateThemeTokens.ts` |
| Generated light/dark CSS and constants | `packages/twenty-ui/src/theme` |
| Static frontend assets | `packages/twenty-front/public` |
| Workspace routes | `packages/twenty-front/src/modules/app/hooks/useCreateWorkspaceAppRouter.tsx` |
| Root routes | `packages/twenty-front/src/modules/app/hooks/useCreateRootAppRouter.tsx` |
| App layout | `packages/twenty-front/src/modules/app/components/DefaultLayout.tsx` |
| Sidebar and workspace menu | `packages/twenty-front/src/modules/navigation` |
| Existing authentication | `packages/twenty-front/src/modules/auth` and `src/pages/auth` |
| Backend | `packages/twenty-server` |
| Isomorphic contracts/utilities | `packages/twenty-shared` |

The installed source declares React `^19.2.0`; the root AGENTS.md summary still says React 18. The package manifests are authoritative for dependency versions. Styling uses Linaria, state uses Jotai, translations use Lingui, and the frontend builds with Vite. Existing routes, record components, API operations, authentication, and permission checks remain the foundation for Oruvyn.

## Toolchain and resources

- `.nvmrc`: Node **26.12.1**; root engine range: `^26.5.1`.
- `packageManager`: **Yarn 4.18.1**, also vendored in `.yarn/releases`; `nodeLinker` is `node-modules`.
- Nx **23.3.1**, with targets in `nx.json` and each package's `project.json`.
- Initial environment: Node 24.21.0 selected, Node 22.23.2 also present, approximately 7.8 GiB RAM, 5.7 GiB available RAM, no swap, and 19 GiB free disk.
- Docker CLI 29.8.0 is present. A sandboxed daemon query returned permission denied; CLI presence does not establish a usable daemon.
- An initial unpinned `yarn --version` attempted a registry lookup and failed on restricted DNS. Use the vendored project Yarn after selecting the prescribed Node version.

Full application and Storybook builds have substantial memory budgets in upstream scripts. Start with targeted generation, tests, and component previews; measure available memory before running backend, worker, frontend, and Storybook together.

## Licensing and attribution

The imported root LICENSE declares AGPLv3 for most of the CRM, a Twenty Application Exception, separate MIT packages, and commercial terms for files marked `/* @license Enterprise */`. Package-level LICENSE files and file headers remain authoritative. The original Oruvyn MIT license cannot relicense imported CRM code.

Preserve upstream copyright notices, license texts, package-level notices, and Enterprise markers. The root license states that modifications to Twenty remain governed by AGPLv3, including section 13; its application exception does not apply to modifications of Twenty itself.

The retained `.github/TRADEMARK.md` asks public forks to use their own identity and permits truthful statements that they are built on Twenty. Oruvyn branding must not imply endorsement or affiliation. Technical package names, API identifiers, upstream integration names, and license attribution should not be mass-renamed.

Authentication currently includes links to Twenty-hosted terms and privacy pages. A production Oruvyn deployment needs its own approved operator policies and correctly configured links; branding work must not fabricate policy documents or imply that upstream policies govern an independent operator.

## Scope boundary

Phase 1 applies a distinct identity through the existing theme and application shell. Real CRUD behavior, GraphQL contracts, workspace identity, authentication, permissions, and mobile navigation must remain intact. Dashboard metrics require real workspace queries and clear loading, unavailable, and empty states. Component stories may use explicitly identified development fixtures; production UI must not show fabricated metrics.

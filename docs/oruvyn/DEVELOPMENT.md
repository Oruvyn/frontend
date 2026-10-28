# Oruvyn development and Codespaces preview

These are repository-prescribed commands and preview instructions. They do not assert that a server is currently running. Consult the implementation report for the commands actually completed and any failures.

## Select the project toolchain

From the repository root:

```bash
nvm install
nvm use
node .yarn/releases/yarn-4.18.1.cjs --version
node .yarn/releases/yarn-4.18.1.cjs install --immutable
```

The `.nvmrc` selects Node 26.12.1. Use the vendored Yarn 4.18.1 instead of resolving an unpinned global Yarn release. Dependency downloads require registry access. Upstream disables arbitrary install scripts in `.yarnrc.yml`; retain that setting.

## Smallest useful checks

Build shared contracts before checking dependent packages:

```bash
yarn nx build twenty-shared --skip-nx-cache
yarn nx generateTokens twenty-ui
yarn nx generate:check twenty-ui
yarn workspace twenty-ui vitest run --project unit design-tokens/__tests__/themeTokenPipeline.test.ts design-tokens/__tests__/oruvynContrast.test.ts
```

Check the frontend directly to avoid accepting a stale Nx result:

```bash
cd packages/twenty-front
GOMAXPROCS=2 ../../node_modules/@typescript/native-preview-linux-x64/lib/tsgo -p tsconfig.json --noEmit
```

For a relevant existing frontend test, run it from the root:

```bash
yarn jest path/to/file.test.tsx --config=packages/twenty-front/jest.config.mjs --runInBand
```

Use package lint and formatting targets when dependencies are ready:

```bash
yarn nx lint twenty-front
yarn nx fmt twenty-front
```

The original `main` contains only two files, so `lint:diff-with-main` covers the entire upstream import. For focused review, compare against the upstream import commit or invoke the existing formatter/linter on the Oruvyn files. Do not commit regenerated translation catalogs as an incidental effect of builds.

Edit `packages/twenty-ui/design-tokens` and regenerate theme artifacts. Do not hand-edit generated theme CSS or constants. Retain existing semantic status colors, keyboard interactions, workspace controls, and permission checks.

## Component previews without a database

The smallest Oruvyn preview renders the actual logo and authentication layout without CRM test providers. Build shared dependencies first, then run from `packages/twenty-front`:

```bash
node ../../node_modules/storybook/dist/bin/dispatcher.js dev --config-dir .storybook/oruvyn -p 6006 --host 0.0.0.0 --no-open --disable-telemetry
```

Keep that terminal open. The preview contains clearly labeled static composition content, not a working sign-in form or workspace. It reuses the application's Vite configuration and shared theme assets. The Nx configuration is also available as `yarn nx storybook:serve:dev twenty-front --configuration=oruvyn`.

The broader frontend already has Storybook stories for authentication and navigation:

```bash
yarn nx storybook:serve:dev twenty-front --configuration=pages
```

The frontend Storybook target uses port **6006**. To inspect shared UI components instead:

```bash
yarn nx storybook:serve:dev twenty-ui
```

The shared UI Storybook target uses port **6008**. Stories are development previews and may include upstream fixtures; they do not demonstrate a live workspace or successful backend integration. Use one preview at a time on a constrained Codespace.

## Full CRM development

Inspect available memory, disk, and Docker daemon access before starting services:

```bash
free -h
df -h .
docker info
```

The initial Codespace had 7.8 GiB total RAM with no swap and about 19 GiB free disk. Upstream frontend build scripts request an 8 GiB heap, frontend Storybook build requests about 8 GiB, and shared UI Storybook build requests 10 GiB. These limits do not mean that much RAM is available; prefer development servers and targeted checks before attempting full builds.

The repository setup script detects local services or Docker, configures development environment files, and initializes PostgreSQL/Redis and the database:

```bash
bash packages/twenty-utils/setup-dev-env.sh
yarn start
```

`yarn start` launches the frontend, server, and worker. This requires a usable PostgreSQL/Redis setup and initialized database. The script's reset options are destructive; a normal first run does not require them.

To run only the frontend against an already running compatible backend, ensure `packages/twenty-front/.env` exists using its `.env.example` as the template, then run:

```bash
VITE_HOST=0.0.0.0 yarn nx start twenty-front
```

The frontend uses **3001** by default and proxies API paths to the backend configured by `REACT_APP_SERVER_BASE_URL`, normally `http://localhost:3000`. A frontend process alone does not provide working authentication or CRM data.

## Forwarding a preview in Codespaces

1. Start a frontend or Storybook process and confirm its ready message and listening port.
2. Open the **Ports** panel in Codespaces and choose **Forward a Port**.
3. Forward **3001** for the CRM, **6006** for frontend Storybook, or **6008** for shared UI Storybook.
4. Keep port visibility **Private** and use **Open in Browser** to obtain the actual Codespaces URL.

There is no fixed preview URL in source control. Verify the page loads before sharing a link. Do not expose the backend, database, or Redis publicly for a visual preview.

## Verification record

Record actual generation, formatting, lint, typecheck, test, and preview outcomes in the implementation report. An unavailable dependency, memory limit, or backend failure is a limitation to report, not a passing check. Later validation should include desktop and mobile navigation, light and dark themes, keyboard focus, login/invitation/reset flows, real record mutations, and permission-limited workspaces.

## Underlying shared build commands

During this implementation the Nx `generateBarrels` prerequisite stalled. The tracked barrels were unchanged, so the shared packages were validated using their existing target commands directly, without editing upstream build scripts:

```bash
cd packages/twenty-shared
node ../../node_modules/vite/bin/vite.js build
GOMAXPROCS=2 GOMEMLIMIT=2GiB ../../node_modules/@typescript/native-preview-linux-x64/lib/tsgo -p tsconfig.lib.json --declaration --emitDeclarationOnly --noEmit false --outDir dist --rootDir src
node ../../node_modules/tsc-alias/dist/bin/index.js -p tsconfig.lib.json --outDir dist
cd ../twenty-ui
NODE_OPTIONS=--max_old_space_size=3072 node ../../node_modules/vite/bin/vite.js build
```

Run the prescribed Nx build first in a normal environment. Use this fallback only for unchanged barrel sources. The exact stall cause was not established. Full frontend native typechecking and type-aware lint were terminated without diagnostics here; they remain required before a production release.

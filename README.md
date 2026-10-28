# Oruvyn CRM

**Every relationship, in motion.**

Oruvyn builds its product identity on Twenty's existing CRM architecture. This repository contains the complete upstream monorepo, with incremental frontend changes in `packages/twenty-front` and the shared design system in `packages/twenty-ui`.

The foundation introduces navy and teal themes, scalable Oruvyn assets, branded navigation, and responsive authentication presentation. Existing GraphQL contracts, authentication, permissions, record workflows, and package names remain the technical foundation. A live workspace and backend are required to use CRM features.

- [Repository audit](docs/oruvyn/AUDIT.md)
- [Development and Codespaces previews](docs/oruvyn/DEVELOPMENT.md)
- [Brand system](docs/oruvyn/BRAND.md)
- [Validation and remaining work](docs/oruvyn/VALIDATION.md)
- [Upstream README](docs/oruvyn/UPSTREAM_README.md)

Use the Node version in `.nvmrc` and the vendored Yarn release. Start with the development guide; this is a full CRM monorepo, not a standalone frontend template.

## Source and licensing

Based on [Twenty](https://github.com/twentyhq/twenty), revision `5053a46ba9e18486c1dc14ee4f772b32fe29dbd4`. Oruvyn is an independent fork and is not affiliated with or endorsed by Twenty.

The original [upstream license](LICENSE), package licenses, [trademark policy](.github/TRADEMARK.md), and Enterprise file markers are preserved. Most of the CRM is AGPLv3; some packages are MIT and marked Enterprise code has separate commercial terms. Modifying the CRM is governed by the applicable upstream licenses. The empty repository's original MIT notice is preserved [for provenance](docs/oruvyn/ORIGINAL-REPOSITORY-LICENSE); it does not relicense upstream code.

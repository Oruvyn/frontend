# Customer-facing branding cleanup

Scope confirmed by the owner: customer-facing branding, while retaining internal identifiers and legal notices.

The cleanup removes upstream product branding from the Oruvyn authentication footer and identity panel, onboarding artwork/copy, workspace fallback logo, community page, importer labels, system activity author, application descriptions, model settings, communications settings, billing error copy, and MCP installation presets. The unused upstream authentication policy helper and integration logo were removed.

The community page now links only to the real Oruvyn GitHub organization and repository. It no longer advertises upstream social accounts, partners, or releases as Oruvyn resources. The MCP page retains compatible client installation/configuration flows, with Oruvyn connector names. The upstream provider's official ChatGPT app card was removed rather than falsely branded as an Oruvyn app.

The sign-in footer retains a direct source-license link and existing SSO bypass controls. It no longer points users at upstream terms/privacy policies. Oruvyn operator policies still need to be supplied before public launch.

Shared notification emails use an email-safe Oruvyn text wordmark, real Oruvyn source links, and Oruvyn copy. Exported template names and props, and caller-provided reset/invitation/verification links, remain compatible. Preview-only links use reserved example domains. Four server files change only customer-visible email subjects or compatibility-error copy; authentication and API logic are unchanged.

Retained references are deliberate: source and package licenses, attribution/provenance, pre-signed DPA/legal vendor identities, commercial licensing references, actual upstream CLI commands and technical documentation, API/package/configuration identifiers, existing user data, and development fixtures. No global search-and-replace or migration of stored customer data was performed. Generated translation catalogs were not edited. Changed message IDs fall back to English until translations are supplied.

## Validation

- Shared email package native typecheck and Vite build pass.
- Twenty-six rendered email variants (13 templates in English and French) show Oruvyn identity, no upstream promotional URLs, and preserve supplied action links.
- MCP configuration/install-link tests: 10 passed.
- Authentication footer and application-details tests: 8 passed, including SSO bypass visibility/action and source-license access.
- Timeline author tests: 3 passed.
- Formatting and plain repository lint pass on changed frontend and email files. The server's configured type-aware lint was terminated with SIGTERM without diagnostics, including an outside-sandbox retry on the four copy-only files; that check remains unverified.
- Full-stack authentication, delivery through SMTP, and CRM end-to-end behavior were not exercised. The prior full frontend typecheck limitation remains documented in VALIDATION.md.

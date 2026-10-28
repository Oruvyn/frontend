# Oruvyn visual foundation

**Product:** Oruvyn CRM  
**Tagline:** Every relationship, in motion.

Oruvyn should communicate intelligence, trust, clarity, and connection through precise typography, calm surfaces, and a small number of strong visual signals. The product identity is independent of Twenty; the existing CRM architecture remains its technical foundation.

## Palette and semantics

| Role | Light theme | Use |
| --- | --- | --- |
| Primary navy | `#111C31` | Brand identity and restrained strong emphasis |
| Deep teal | `#247D78` | Primary actions, active states, and focus identity |
| Accent mint | `#45D6BB` | Small decorative accents; pair with dark text when used as a surface |
| Application background | `#F7F9FC` | Canvas surrounding white content surfaces |
| Surface | `#FFFFFF` | Tables, forms, menus, and primary content |
| Border | `#E5EAF1` | Quiet separation between surfaces |
| Primary text | `#18243A` | Headings and essential content |
| Secondary body text | `#4E5D73` | Supporting instructions and readable descriptions |
| Tertiary text | `#647188` | Less prominent readable content |
| Brand muted | `#758096` | Nonessential decoration or secondary visual accents |

The muted brand color is not a default for essential body text on white or the application background. Use the darker secondary and tertiary text colors for instructions, labels, and other information a user must read. Do not rely on color alone to communicate status: retain text, icons, and existing semantics.

Positive, negative, warning, and informational states use the existing semantic token families. Teal is the brand action color, not a replacement for every success or informational state. Keep destructive actions recognizable.

## Dark theme

Use the existing light/dark provider and token generation pipeline. Dark surfaces should use navy-based neutrals, with lighter text and teal/mint accents chosen for legibility. Avoid blindly inverting the light palette. Check action text, disabled content, selection, hover, focus, borders, and dialogs in both themes. Workspace/user appearance preferences continue to control the theme.

Do not introduce a second theme provider or maintain parallel application-specific component styles that bypass shared tokens. The editable source is `packages/twenty-ui/design-tokens`; regenerate its CSS and TypeScript artifacts with the existing generator.

## Typography and spacing

Retain the existing Inter font and local font setup. Use existing font-size tokens for a consistent hierarchy: compact labels, comfortable body content, clear section titles, and a limited number of prominent page headings. Keep line height generous enough for forms and descriptions.

Build spacing on the existing **4 px** system, with supported half steps only where precision requires them. Use **6 px and 8 px** radii for ordinary controls and surfaces. Larger radii are reserved for existing component types that need them; do not turn every panel into a large rounded card.

Prefer subtle borders and restrained shadows over gradients, glass effects, or animated decoration. Preserve visible keyboard focus and respect reduced-motion preferences. Responsive layouts should retain access to navigation, forms, and record actions.

## Brand assets

Use original geometric SVG assets for the Oruvyn symbol, wordmark, sidebar identity, authentication identity, and favicon. Give meaningful images accessible names and hide purely decorative repetitions from assistive technology. Keep customer workspace logos and names intact.

The symbol should remain recognizable at favicon and collapsed-sidebar sizes. Use vector geometry and scalable typography; do not import external product logos or depend on image-generation services for the core identity.

## Provenance and licensing boundary

The imported CRM baseline is commit `d149f9e`, sourced from Twenty revision `5053a46ba9e18486c1dc14ee4f772b32fe29dbd4`. Oruvyn's product name, original brand geometry, and visual choices do not change upstream licensing. Keep root and package licenses, source notices, Enterprise markers, and truthful attribution.

Technical `twenty-*` package names, API contracts, permission behavior, authentication identifiers, and existing integration names are not customer-facing brand assets and must not be indiscriminately replaced. Oruvyn must not imply endorsement by Twenty. See the retained root LICENSE and `.github/TRADEMARK.md` for the repository's declared terms.

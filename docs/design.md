# Design Rules

> Requirements document. No code is written at this stage.
>
> **Rule from the owner:** colors, fonts, spacing and components are taken **exactly from the original design file** (`DripFunnel Website v2.dc.html`). The light and dark themes work as in the original. Images and logos go in the assets folder and are taken from there when needed.
>
> The values below were read from the original file. If the original and this document ever disagree, the original wins.

## 1. Colors

Colors are defined once as named values (tokens) per theme, so every component uses the same names.

### Theme tokens

| Token | Used for | Light | Dark |
|-------|----------|-------|------|
| `paper` | Page background | `#FDFAF7` | `#061726` |
| `surface` | Cards, inputs, dropdowns | `#FFFFFF` | `#0A2A4A` |
| `sunk` | Hover and recessed areas | `#F3EDE8` | `#071F35` |
| `border` | Dividers, card borders | `#E8E2DC` | `#1C3F60` |
| `field` | Input and dashed-button borders | `#D7D3CD` | `#2A4C6E` |
| `text` | Body text | `#14181F` | `#FFFFFF` |
| `head` | Headings | `#0A2A4A` | `#FFFFFF` |
| `muted` | Secondary text | `#5A6472` | `#B8C7D6` |
| `link` | Links | `#B8541F` | `#EC844F` |
| `link-h` | Link hover | `#8F4017` | `#F09A6D` |
| `focus` | Keyboard focus ring | `#00519F` | `#2E7BD1` |
| `btn-h` | Primary button hover | `#D96C33` | `#F09A6D` |
| `outline` | Outlined button border and text | `#B8541F` | `#EC844F` |
| `outline-h` | Outlined button hover fill | `#FDF0E8` | `#2A1710` |
| `tint` | Highlight background | `#FDF0E8` | `#2A1710` |
| `tint-fg` | Text on highlight | `#8F4017` | `#EC844F` |
| `okbg` | Success background | `#EEF7F2` | `#0F2A1E` |
| `okfg` | Success text | `#1D6B47` | `#7FD1A5` |
| `band` | Dark band background | `#0A2A4A` | `#0E3355` |

### Fixed brand colors (same in both themes)

| Name | Value | Used for |
|------|-------|----------|
| Brand orange | `#EC844F` | Primary buttons, active-page underline, highlights, logo |
| Brand blue | `#00519F` | Logo |
| Navy | `#0A2A4A` | Footer background, headings in light theme |
| Footer text / muted on navy | `#B8C7D6` | Footer secondary text |
| Footer border / field | `#2A4C6E`, `#071F35` | Footer selector and button borders and fill |
| Footer link hover | `#F09A6D` | |

White text on the brand-orange button is `#FFFFFF`.

## 2. Light and dark theme

- Same as the original: a **toggle in the header and a button in the footer** switch between light and dark.
- **First visit:** follows the visitor's device setting (light or dark). If the visitor has chosen before, their choice is used.
- The choice is remembered in the browser, and the site must still work if the browser blocks storage.
- Logo swaps with the theme: the normal logo in light, the inverse (light) logo in dark.
- The footer is a dark navy band in both themes.
- The page must not flash the wrong theme while loading. (A requirement for the build; the original did not need to handle this.)

## 3. Fonts

| Role | Font | Weights | Where |
|------|------|---------|-------|
| Headings, buttons, prices, navigation emphasis | **Manrope** | 500, 600, 700, 800 | Most headings (800), buttons and bold labels (700) |
| Body text, forms, menus | **Inter** | 400, 500, 600 | Paragraphs, inputs, links |
| Small labels ("eyebrows"), tags, numbers | **IBM Plex Mono** | 400, 500 | Uppercase labels with wide letter spacing |

Body text defaults: Inter, 16px, line height 1.55.

### Arabic font (decided)

- **IBM Plex Sans Arabic**, weights 400, 500, 600 and 700. Chosen by Claude on the owner's instruction ("pick one that pairs well").
- **Why:** it has the clean, modern look of Manrope and Inter, and it belongs to the same family as IBM Plex Mono, which is already used for the small labels. It also has matching Latin letters, so mixed Arabic/English text (brand names, product names) looks consistent. It is free to use and can be served from the website.
- **Where:** used for Arabic body text, headings, buttons and labels on Arabic pages. Headings use the 700 weight (the heaviest it offers), since Manrope's 800 does not exist in Arabic.
- **Loaded only on Arabic pages**, so English pages stay as light as before.
- **Numbers:** prices and figures keep the normal digits (0-9) as in the original, also on Arabic pages. Confirmed by the owner.

### Font delivery (decided)

- All fonts are **served from the website itself**, not from Google Fonts. The owner agreed on the condition that it is faster and looks the same.
- It is faster because the visitor's browser does not need to contact another company's server first. The fonts are the same files, so the look does not change.
- Only the letters actually needed are included, and only the weights listed above.

### Type scale (fluid: grows with the screen width, within limits)

| Style | Font | Weight | Size (min → max) | Line height | Letter spacing |
|-------|------|--------|------------------|-------------|----------------|
| Page title (h1, home) | Manrope | 800 | 34px → 84px | 1.02 | -0.04em |
| Section title (h2, large) | Manrope | 800 | 28px → 56px | 1.02 | -0.035em |
| Section title (h2, medium) | Manrope | 800 | 26px → 44px | 1.08 | -0.03em |
| Section title (h2, smaller) | Manrope | 800 | 24px → 42px | 1.08 | -0.03em |
| Intro paragraph | Inter | 400 | 16px → 20px | 1.55 | normal |
| Eyebrow label | IBM Plex Mono | 400/500 | 10–12px, uppercase | normal | 0.08–0.14em |
| Navigation link | Inter | 500 | 15px | | |
| Legal heading (h2) | Manrope | 800 | 22px | | -0.02em |

Other sizes (cards, tables, small print) follow the original file value for value.

## 4. Spacing and layout

- **Page width:** content is centred with a maximum width of **1240px**.
- **Side padding:** 16px to 24px, growing with the screen width.
- **Section padding (top and bottom):** fluid, for example 48px to 120px for large sections, 32px to 72px for smaller ones.
- **Gaps between items:** mainly 4, 6, 8, 10, 12, 14, 16 and 18px; larger gaps (24px, 36px) in headers and footers.
- **Header height:** 72px on desktop, 60px on phones.
- **Desktop navigation** appears from **980px** screen width. Below that, the mobile menu is used.
- **Tap targets:** at least 44px high for all links and buttons (36px for footer links).
- **Fluid sizes:** the original sizes text and spacing in relation to the width of the page container. On the real website the page is the full screen width, and the result must look the same as in the original at the same width.

## 5. Components

| Component | Rules |
|-----------|-------|
| **Primary button** | Brand-orange fill, white text, Manrope 700, 8px corners. Heights 44px (small), 48px, 52px (large). Hover uses `btn-h`. |
| **Outlined button** | Transparent, 1px border and text in `outline`, Manrope 700, 8px corners, 44px or 48px high. Hover fills with `outline-h`. |
| **Text link** | `link` color, underline offset 3px, hover `link-h`. |
| **Navigation link** | 44px high, Inter 500 15px. Active page: 2px orange underline. Hover: `link` color. |
| **Dropdown (Resources)** | `surface` background, 1px `border`, 12px corners, soft shadow, 260px minimum width. Items have title and short description; hover uses `sunk`. |
| **Card / panel** | `surface` background, 1px `border`, 12px corners, 20–24px padding. |
| **Input / textarea / select** | `surface` background, 1px border (`field`), 8px corners, 12px 14px padding, Inter 16px. Error state uses an error border (see open question 2). |
| **Topic chips (contact form)** | Pill-style buttons. Selected: `head` fill with `paper` text. Not selected: transparent with `field` border. |
| **Dashed suggestion buttons** | 44px high, dashed `field` border, becomes solid `outline` on hover (home page examples). |
| **Eyebrow / tag** | IBM Plex Mono, uppercase, wide letter spacing, `muted` color. |
| **Plan / status pills** | Rounded labels using `okbg` / `okfg` for positive and `tint` / `tint-fg` for highlighted or neutral. |
| **Breadcrumb** | 14px, `muted`, "Blog / Category" style with link on the first part. |
| **Footer band** | Navy `#0A2A4A`, white text, links 15px, hover `#F09A6D`. |

Corner radii used: 4, 6, 8, 10, 12 and 16px. 8px (buttons, inputs) and 12px (cards) are the most common.

Shadows are used only on the dropdown and mobile menu (soft navy shadow).

## 6. Motion

- The home hero has a soft **"drip" animation** (falling lines in the background) and gentle drifting shapes.
- All of it is **turned off for visitors who ask their device for reduced motion**.
- Hover and focus changes are simple color changes. No other animation is used.

## 7. Accessibility rules in the original (to be kept)

- Visible keyboard focus ring: 2px outline in the `focus` color, 2px offset (lighter blue on dark bands).
- "Skip to content" link.
- All interactive elements are at least 44px high.
- Text colors have been chosen for contrast on both themes.
- Menus close with the Esc key.

## 8. Images, logos and assets

- Images and logos are placed in the **`public/assets/`** folder (decided) and taken from there when a page needs them.
- The owner agreed to **reuse the previous logos and pictures**. They are in the earlier project commit (`8945784`) and will be brought back into `public/assets/` when the build starts. They are not in the current branch.
- The set in that commit:
  - **Logos (SVG):** `dripfunnel-logo.svg` and `dripfunnel-logo-inverse.svg` (full logo for light and dark), `dripfunnel-mark.svg` and `dripfunnel-mark-inverse.svg` (symbol only).
  - **Favicons and app icons (PNG):** light and dark sets in sizes 16 to 512, rounded versions, a maskable icon, an Apple touch icon (180) and `icon-ink-512.png`.
- Logo SVG files contain a large block of hidden metadata that is not needed on the website. It should be removed so the logo loads faster.
- The website adds a favicon for each theme so it looks right in light and dark browser tabs.

## 9. Differences from the original that affect design

| Topic | Original | Needed |
|-------|----------|--------|
| Arabic text | Fonts have no Arabic letters | IBM Plex Sans Arabic on Arabic pages (decided above). |
| Right-to-left layout | Not supported | Header, footer, cards, arrows, breadcrumbs and spacing must mirror for Arabic. |
| Region and language drop-down | Does not exist | New component in the header (after the theme toggle): flag, region code and arrow, opening a list like the Resources dropdown (same surface, border, 12px corners, shadow, 44px rows). Simple flag drawings are part of the page, not image files. The footer has the matching region and language selectors in the style of the original currency selector. |
| AED currency | Not shown | Currency selector and prices show AED. Same style as the other currencies. |
| Font loading | Loaded from Google Fonts at page load | Fonts served from the website itself (decided above). |

## Decided in this document

- Arabic font: IBM Plex Sans Arabic.
- Fonts served from the website itself.
- Assets folder: `public/assets/`.
- Logos and pictures: reuse the previous ones from commit `8945784`.
- Digits on Arabic pages: normal digits (0-9).
- Other pictures (photos, merchant logos, testimonial pictures): the owner will supply them later.

## Open Questions

None at the moment.

## Decided while building

- **Form error color:** the original draws an invalid form field with a **2px border in `#00325F`** (dark navy) instead of the normal 1px `field` border. This is kept, in both themes. (Answers the earlier open question.)
- **Fonts:** each font has a small extra file for letters outside basic Latin (for example the rupee sign ₹ on India prices). A visitor's browser downloads it only on pages that use such a letter.
- **Header height:** 72px, and 60px on screens up to 600px wide.
- **"Skip to content" link:** hidden until it gets keyboard focus (in the original it was always off-screen).

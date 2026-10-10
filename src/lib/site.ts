// Site-wide constants. Values that are not decided yet read from environment
// variables and are tracked in PLACEHOLDERS.md.

export const SITE_NAME = "DripFunnel";

/** Domain is not decided yet (docs/deployment.md). Placeholder until it is. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.dripfunnel.com").replace(/\/$/, "");

/** Only the live site may be indexed. Staging and preview builds are hidden from search engines. */
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENV === "production";

/** "Sign in" and "Start free" go to the DripFunnel store portal. Address not decided yet. */
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "#";

export const SALES_EMAIL = "sales@dripfunnel.com";
export const LEGAL_EMAIL = "legal@dripfunnel.com";
export const PRIVACY_EMAIL = "privacy@dripfunnel.com";

// Browser-storage keys (always read and written inside try/catch).
export const THEME_KEY = "df-site-theme";
export const CURRENCY_KEY = "df-site-currency";
export const PROMPT_KEY = "df-site-prompt";
export const COUNTRY_BANNER_KEY = "df-site-country-banner";

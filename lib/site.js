// Site-wide constants: domain, regions, languages and address helpers.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dripfunnel.com').replace(/\/$/, '');
export const SITE_ENV = process.env.NEXT_PUBLIC_SITE_ENV || 'production';
export const IS_PRODUCTION = SITE_ENV === 'production';
// Where "Sign in" and "Start free" go. Not decided yet (see docs/pages-and-navigation.md, open questions).
export const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || '#';

export const DEFAULT_REGION = 'in';

// Each region has its own address (/in/, /us/, /ae/) and its own currency.
// Arabic exists for the UAE only (/ae/ar/).
export const REGIONS = {
  in: { code: 'in', name: 'India', currency: 'INR', currencyName: 'Indian rupees', numberLocale: 'en-IN', ogLocale: 'en_IN', hreflang: 'en-IN', languages: ['en'] },
  us: { code: 'us', name: 'United States', currency: 'USD', currencyName: 'US dollars', numberLocale: 'en-US', ogLocale: 'en_US', hreflang: 'en-US', languages: ['en'] },
  ae: { code: 'ae', name: 'United Arab Emirates', currency: 'AED', currencyName: 'UAE dirhams', numberLocale: 'en-AE', ogLocale: 'en_AE', hreflang: 'en-AE', languages: ['en', 'ar'] },
};
export const REGION_CODES = Object.keys(REGIONS);

export const LANGUAGES = {
  en: { code: 'en', dir: 'ltr', nativeName: 'English' },
  ar: { code: 'ar', dir: 'rtl', nativeName: 'العربية' },
};

// Every (region, language) combination that exists: India EN, US EN, UAE EN, UAE AR.
export const VARIANTS = REGION_CODES.flatMap((region) => REGIONS[region].languages.map((locale) => ({ region, locale })));

function segs(rest) {
  if (!rest) return [];
  return (Array.isArray(rest) ? rest : String(rest).split('/')).filter(Boolean);
}

// Path of a page: pagePath('ae', 'ar', ['pricing']) -> '/ae/ar/pricing/'
export function pagePath(region, locale, rest = []) {
  const parts = [region, ...(locale === 'ar' ? ['ar'] : []), ...segs(rest)];
  return '/' + parts.join('/') + '/';
}

export function absoluteUrl(path) {
  return SITE_URL + path;
}

// The same page in another region. Keeps the language when that region has it, otherwise English.
export function regionSwitchPath(toRegion, locale, rest) {
  const loc = REGIONS[toRegion].languages.includes(locale) ? locale : 'en';
  return pagePath(toRegion, loc, rest);
}

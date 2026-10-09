import { REGIONS, pagePath, STORE_URL } from './site';
import { makeT } from './i18n';
import { REG, PRICE_TABLE } from './regions';

// Everything a page needs to know about where it is shown: region, language, text, prices and addresses.
export function makeCtx(region, locale) {
  const R = REGIONS[region];
  const nf = new Intl.NumberFormat(R.numberLocale, { style: 'currency', currency: R.currency, maximumFractionDigits: 0 });
  const nf2 = new Intl.NumberFormat(R.numberLocale, { style: 'currency', currency: R.currency, maximumFractionDigits: 2 });
  return {
    region,
    locale,
    rtl: locale === 'ar',
    dir: locale === 'ar' ? 'rtl' : 'ltr',
    regionInfo: R,
    cur: R.currency, // 'INR' | 'USD' | 'AED'
    t: makeT(locale),
    // Price text in this region's currency, e.g. fmt(1890) -> '₹1,890'. Digits are always 0-9, also in Arabic.
    fmt: (v) => (v % 1 ? nf2 : nf).format(v),
    // Sample shop content for this region (store name, tax wording, couriers, ...).
    content: REG[R.currency],
    // Fixed plan prices for this region's currency.
    prices: PRICE_TABLE[R.currency],
    // Address of a page in the same region and language: href('pricing'), href('blog/some-article'), href() = home.
    href: (rest = '') => pagePath(region, locale, rest),
    storeUrl: STORE_URL,
  };
}

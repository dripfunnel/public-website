import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ResourcesMenu from '@/components/ui/ResourcesMenu';
import MobileMenu from '@/components/ui/MobileMenu';
import SelectNav from '@/components/ui/SelectNav';
import LanguageBanner from '@/components/ui/LanguageBanner';
import RegionMenu from '@/components/ui/RegionMenu';
import { REGIONS, REGION_CODES, LANGUAGES, pagePath, regionSwitchPath } from '@/lib/site';

// The frame around every page: skip link, sticky header, <main>, footer.
// Header, navigation and footer are copied from the original design (see docs/pages-and-navigation.md).
// `slug` is the address of the page after the region (and /ar), used to build the "same page, other region / language" links.

const NAV = [
  ['home', '', 'Home'],
  ['features', 'features', 'Features'],
  ['ai', 'ai', 'AI Builder'],
  ['pricing', 'pricing', 'Pricing'],
  ['partners', 'partners', 'Partners'],
];
const RES = [
  ['blog', 'blog', 'Blog', 'Guides for running and growing a shop'],
  ['help', 'help', 'Help centre', 'How-to articles and support'],
  ['contact', 'contact', 'Contact and demo', 'Talk to sales or book a demo'],
];

export default function Shell({ ctx, pageKey, slug, children }) {
  const { t, href, region, locale, storeUrl } = ctx;
  const regionInfo = REGIONS[region];
  const isResources = RES.some(([k]) => k === pageKey);
  const hasLanguages = regionInfo.languages.length > 1;
  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const otherLangHref = pagePath(region, otherLocale, slug);

  const mobileItems = [...NAV, ...RES].map(([k, p, label]) => ({ label: t(label), href: href(p), current: pageKey === k }));
  const resItems = RES.map(([, p, label, sub]) => ({ label: t(label), sub: t(sub), href: href(p) }));

  const regionNames = { in: 'India (INR)', us: 'United States (USD)', ae: 'United Arab Emirates (AED)' };
  const regionOptions = REGION_CODES.map((r) => ({ value: r, label: t(regionNames[r]), href: regionSwitchPath(r, locale, slug) }));
  const langOptions = regionInfo.languages.map((l) => ({ value: l, label: LANGUAGES[l].nativeName, href: pagePath(region, l, slug) }));

  const footCols = [
    { h: 'Product', links: [['Features', 'features'], ['AI Builder', 'ai'], ['Pricing', 'pricing'], ['Partners', 'partners']] },
    { h: 'Resources', links: [['Blog', 'blog'], ['Help centre', 'help'], ['Contact support', 'contact/support']] },
    { h: 'Company', links: [['Book a demo', 'contact/demo'], ['Talk to sales', 'contact/sales'], ['Become a partner', 'contact/partners']] },
    { h: 'Legal', links: [['Terms of Service', 'terms'], ['Privacy Policy', 'privacy']] },
  ];

  const toDark = t('Switch to dark mode');
  const toLight = t('Switch to light mode');
  // Region (and, in the UAE, language) drop-down in the header, after the theme icon.
  const regionMenu = (
    <RegionMenu
      label={t('Region and language')}
      current={region}
      regions={REGION_CODES.map((r) => ({ code: r, name: t(REGIONS[r].name), currency: REGIONS[r].currency, href: regionSwitchPath(r, locale, slug) }))}
      languageTitle={t('Language')}
      languages={regionInfo.languages.map((l) => ({ code: l, label: LANGUAGES[l].nativeName, href: pagePath(region, l, slug), current: l === locale }))}
    />
  );

  return (
    <div style={{ background: 'var(--paper,#FDFAF7)', color: 'var(--text,#14181F)', fontFamily: 'Inter,Helvetica,Arial,sans-serif', fontSize: '16px', lineHeight: 1.55, minHeight: '100vh', textWrap: 'pretty', display: 'flex', flexDirection: 'column', position: 'relative', containerType: 'inline-size' }}>
      <a href="#main" className="df-skip">
        {t('Skip to content')}
      </a>
      <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--paper,#FDFAF7)', borderBottom: '1px solid var(--border,#E8E2DC)' }}>
        <div className="df-header-row" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(16px,4cqw,24px)', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href={href()} aria-label={t('DripFunnel home')} style={{ display: 'flex', alignItems: 'center', minHeight: '44px', flex: 'none' }}>
            <img src="/assets/dripfunnel-logo.svg" alt="" width="152" height="28" style={{ height: '28px', width: 'auto', display: 'var(--logo-l,block)' }} />
            <img src="/assets/dripfunnel-logo-inverse.svg" alt="" width="152" height="28" style={{ height: '28px', width: 'auto', display: 'var(--logo-d,none)' }} />
          </Link>

          {/* Wide screens */}
          <nav className="df-wide" aria-label={t('Main')} style={{ alignItems: 'center', justifyContent: 'center', gap: '2px', flex: 1 }}>
            {NAV.map(([k, p, label]) => (
              <Link key={k} href={href(p)} aria-current={pageKey === k ? 'page' : undefined} className="df-h-link" style={{ height: '44px', padding: '0 12px', display: 'flex', alignItems: 'center', textDecoration: 'none', fontWeight: 500, fontSize: '15px', color: 'var(--text,#14181F)', boxShadow: `inset 0 -2px 0 ${pageKey === k ? '#EC844F' : 'transparent'}` }}>
                {t(label)}
              </Link>
            ))}
            <ResourcesMenu label={t('Resources')} items={resItems} active={isResources} />
          </nav>
          <div className="df-wide" style={{ alignItems: 'center', gap: '8px' }}>
            <ThemeToggle variant="icon" toDark={toDark} toLight={toLight} />
            {regionMenu}
            <a href={storeUrl} className="df-h-link" style={{ height: '44px', padding: '0 12px', display: 'flex', alignItems: 'center', textDecoration: 'none', fontWeight: 500, fontSize: '15px', color: 'var(--text,#14181F)' }}>
              {t('Sign in')}
            </a>
            <a href={storeUrl} className="df-h-outline" style={{ height: '44px', padding: '0 18px', border: '1px solid var(--outline,#B8541F)', borderRadius: '8px', display: 'flex', alignItems: 'center', textDecoration: 'none', fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--outline,#B8541F)' }}>
              {t('Start free')}
            </a>
          </div>

          {/* Narrow screens */}
          <span className="df-narrow" style={{ flex: 1 }}></span>
          <div className="df-narrow" style={{ alignItems: 'center', gap: '8px' }}>
            <ThemeToggle variant="icon" toDark={toDark} toLight={toLight} />
            {regionMenu}
            <MobileMenu menuLabel={t('Menu')} mainLabel={t('Main')} items={mobileItems} signIn={t('Sign in')} startFree={t('Start free')} storeUrl={storeUrl} />
          </div>
        </div>
      </header>

      <main id="main" style={{ flex: 1, overflowX: 'clip' }}>
        {children}
      </main>

      <footer data-band="" style={{ background: '#0A2A4A', color: '#FFFFFF' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '64px clamp(16px,4cqw,24px) 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))', gap: '36px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', gridColumn: 'span 2', minWidth: 0, maxWidth: '360px' }}>
            <img src="/assets/dripfunnel-logo-inverse.svg" alt="DripFunnel" width="152" height="28" loading="lazy" style={{ height: '28px', width: 'auto', alignSelf: 'flex-start' }} />
            <span style={{ fontSize: '15px', color: '#B8C7D6', lineHeight: 1.6 }}>
              {t('Describe your business and AI builds your whole store. Then run catalogue, orders, offers, suppliers and selling abroad from one portal.')}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <SelectNav name="region" label={t('Show prices in')} options={regionOptions} current={region} />
              {hasLanguages ? <SelectNav name="language" label={t('Language')} options={langOptions} current={locale} /> : null}
            </div>
          </div>
          {footCols.map((c) => (
            <div key={c.h} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8C7D6', paddingBottom: '6px' }}>{t(c.h)}</span>
              {c.links.map(([label, p]) => (
                <Link key={p} href={href(p)} className="df-h-foot" style={{ minHeight: '36px', display: 'flex', alignItems: 'center', color: '#FFFFFF', textDecoration: 'none', fontSize: '15px' }}>
                  {t(label)}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '20px clamp(16px,4cqw,24px) 32px', borderTop: '1px solid rgba(255,255,255,0.14)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#B8C7D6' }}>
          <span>{t('© 2026 DripFunnel. A Softobotics company.')}</span>
          <ThemeToggle variant="text" toDark={toDark} toLight={toLight} />
        </div>
      </footer>

      {hasLanguages && locale === 'en' ? <LanguageBanner message={t('View this page in Arabic?')} yes={t('Yes, switch')} no={t('No thanks')} href={otherLangHref} /> : null}
    </div>
  );
}

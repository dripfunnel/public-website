import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { PeriodProvider, PeriodToggle, PlanPrice } from '@/components/pricing/Period';
import CurrencySelect from '@/components/pricing/CurrencySelect';
import Faq from '@/components/pricing/Faq';
import { PLANS, BANDWIDTH, GROUPS, FAQS } from '@/content/pricing-data';
import { PRICE_FOOT } from '@/lib/regions';
import { REGIONS, REGION_CODES, regionSwitchPath, absoluteUrl, pagePath } from '@/lib/site';
import { css } from '@/lib/css';
import '@/styles/pricing.css';

// Pricing page. Source: the "Pricing" template and its data in design/DripFunnel Website v2.dc.html.
// Prices come from ctx.prices (fixed per currency, one place: lib/regions.js).

const CURRENCY_LABEL = { INR: '₹ INR', USD: '$ USD', AED: 'AED' };
const SET_KEY = { '@setup:starter': 'starter', '@setup:growth': 'growth', '@setup:business': 'business' };

export default function Page({ ctx }) {
  const { t, fmt, prices, href, storeUrl, region, locale } = ctx;
  // Texts with letters are translated; "✓", "—" and plain numbers are shown as they are.
  const tx = (s) => (/[A-Za-z]/.test(s) ? t(s) : s);

  const plans = PLANS.map((p) => {
    const hi = p.k === 'growth';
    const dark = p.k === 'ent';
    const [Y, SET] = prices[p.k] || [];
    const yrMo = Y ? Y / 12 : 0;
    const mo = Y ? (Y * 2) / 12 : 0;
    const points = [...p.points.map((x) => t(x)), ...(SET ? [t('Optional: we build your storefront for you, {price} one-time', { price: fmt(SET) })] : []), t(BANDWIDTH[p.k])];
    let fixed = null;
    let month = null;
    let year = null;
    if (p.k === 'free') fixed = { price: t('Free'), per: '', note: t('Forever. No card needed.') };
    else if (dark) fixed = { price: t('Custom'), per: '', note: t('Built around your business') };
    else {
      const per = t('/month');
      year = { price: fmt(Math.round(yrMo)), per, note: t('{price} billed yearly, after 10 free days', { price: fmt(Y) }) };
      month = { price: fmt(Math.round(mo)), per, note: t('Billed monthly, after 10 free days. {price}/month if you pay yearly.', { price: fmt(Math.round(yrMo)) }) };
    }
    return { ...p, hi, dark, Y, name: t(p.name), blurb: t(p.for), cta: t(p.cta), badge: p.badge ? t(p.badge) : '', points, fixed, month, year };
  });

  const setupLine = t('{a} on Growth, {b} on Growth Pro, {c} on Business', { a: fmt(prices.starter[1]), b: fmt(prices.growth[1]), c: fmt(prices.business[1]) });
  const faqs = FAQS.map(([q, a]) => ({ q: t(q), a: t(a, { setup: setupLine }) }));
  const priceFoot = [t(PRICE_FOOT[ctx.cur]), t('Yearly plans cost half the monthly price. We never charge a fee on your orders. Items marked “planned” aren’t in the product yet.')].join(' ');

  const cellText = (v) => (SET_KEY[v] ? t('{price} one-time', { price: fmt(prices[SET_KEY[v]][1]) }) : tx(v));
  const periodOptions = [
    { key: 'month', label: t('Monthly'), tag: '' },
    { key: 'year', label: t('Yearly'), tag: t('Save 50%') },
  ];
  const currencyOptions = REGION_CODES.map((r) => ({ value: r, label: CURRENCY_LABEL[REGIONS[r].currency], href: regionSwitchPath(r, locale, ['pricing']) }));

  // Structured data: the plans with this region's currency and the prices as shown (yearly view: price per month, billed yearly).
  const products = plans
    .filter((p) => p.k !== 'ent')
    .map((p) => {
      const free = p.k === 'free';
      const shown = free ? 0 : Math.round(p.Y / 12);
      return {
        '@type': 'Product',
        name: `DripFunnel ${p.name}`,
        description: p.blurb,
        brand: { '@type': 'Brand', name: 'DripFunnel' },
        url: absoluteUrl(pagePath(region, locale, ['pricing'])),
        offers: {
          '@type': 'Offer',
          price: shown,
          priceCurrency: ctx.cur,
          availability: 'https://schema.org/InStock',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: shown, priceCurrency: ctx.cur, unitText: 'month', ...(free ? {} : { billingDuration: 12 }) },
          description: free ? p.fixed.note : p.year.note,
        },
      };
    });
  const faqLd = { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  const eyebrow = { fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', letterSpacing: '0.14em', color: 'var(--link,#B8541F)' };
  const secTitle = { fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 'clamp(22px,3.4cqw,34px)', letterSpacing: '-0.025em', margin: 0, color: 'var(--head,#0A2A4A)' };

  return (
    <PeriodProvider>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [...products, faqLd] }} />
      <section style={css('max-width:1240px;margin:0 auto;padding:clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) 36px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px;')}>
        <div style={css('display:flex;align-items:center;gap:12px;')}>
          <span aria-hidden="true" style={css('width:32px;height:2px;background:#EC844F;display:block;')}></span>
          <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted,#5A6472);")}>{t('Pricing')}</span>
        </div>
        <h1 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(32px,5.5cqw,60px);line-height:1.04;letter-spacing:-0.035em;margin:0;max-width:18ch;color:var(--head,#0A2A4A);')}>{t('Start free. Pay when your shop grows.')}</h1>
        <span style={css('display:inline-flex;padding:6px 14px;border-radius:20px;background:var(--okbg,#EEF7F2);color:var(--okfg,#1D6B47);font-family:Manrope,sans-serif;font-weight:700;font-size:14px;')}>{t('Try everything in Business free for 10 days · no credit card required')}</span>
        <p style={css('margin:0;max-width:60ch;font-size:17px;color:var(--muted,#5A6472);')}>{t('Every plan has a real shop, unlimited orders, zero fees on your orders and the legal details your markets need. Paid plans add more products, a team, suppliers and selling abroad.')}</p>
        <div style={css('display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;')}>
          <PeriodToggle label={t('Billing period')} options={periodOptions} />
          <CurrencySelect label={t('Currency')} options={currencyOptions} current={region} />
        </div>
      </section>

      <section aria-label={t('Plans')} style={css('max-width:1240px;margin:0 auto;padding:12px clamp(16px,4cqw,24px) 64px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:14px;align-items:stretch;')}>
        {plans.map((p) => {
          const sub = p.dark ? '#B8C7D6' : 'var(--muted,#5A6472)';
          const rule = p.dark ? 'rgba(255,255,255,0.16)' : 'var(--border,#E8E2DC)';
          const tick = p.dark ? '#F09A6D' : 'var(--link,#B8541F)';
          const btn = {
            height: '44px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: '14px',
            background: p.hi ? '#EC844F' : 'transparent',
            color: p.hi ? '#FFFFFF' : p.dark ? '#F09A6D' : 'var(--outline,#B8541F)',
            border: p.hi ? '1px solid #EC844F' : p.dark ? '1px solid #F09A6D' : '1px solid var(--outline,#B8541F)',
          };
          const btnClass = p.hi ? 'df-h-primary' : p.dark ? 'df-pricing-btn-dark' : 'df-h-outline';
          return (
            <div key={p.k} style={{ background: p.dark ? '#0A2A4A' : 'var(--surface,#FFFFFF)', color: p.dark ? '#FFFFFF' : 'var(--text,#14181F)', border: p.hi ? '2px solid #EC844F' : p.dark ? '1px solid #1C3F60' : '1px solid var(--border,#E8E2DC)', borderRadius: '12px', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
              {p.badge ? <span style={css("position:absolute;top:-12px;left:20px;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:12px;background:#0A2A4A;color:#FFFFFF;")}>{p.badge}</span> : null}
              <h2 style={css('margin:0;font-family:Manrope,sans-serif;font-weight:800;font-size:20px;')}>{p.name}</h2>
              <span style={{ fontSize: '14px', color: sub, minHeight: '44px' }}>{p.blurb}</span>
              {p.fixed ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: '32px', letterSpacing: '-0.03em' }}>{p.fixed.price}</span>
                    <span style={{ fontSize: '14px', color: sub }}>{p.fixed.per}</span>
                  </span>
                  <span style={{ fontSize: '13px', color: sub, minHeight: '40px' }}>{p.fixed.note}</span>
                </div>
              ) : (
                <PlanPrice month={p.month} year={p.year} sub={sub} />
              )}
              {p.dark ? (
                <Link href={href('contact/partners')} className={btnClass} style={btn}>{p.cta}</Link>
              ) : (
                <a href={storeUrl} className={btnClass} style={btn}>{p.cta}</a>
              )}
              <div style={{ height: '1px', background: rule }}></div>
              <ul style={css('margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;')}>
                {p.points.map((pt, i) => (
                  <li key={i} style={css('display:flex;gap:8px;font-size:14px;line-height:1.45;')}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tick} strokeWidth="2.2" strokeLinecap="round" style={{ flex: 'none', marginTop: '2px' }}><path d="M5 12l5 5L20 7"></path></svg>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section style={css('max-width:1240px;margin:0 auto;padding:0 clamp(16px,4cqw,24px) 64px;display:flex;flex-direction:column;gap:14px;')}>
        <div style={css('display:flex;align-items:baseline;gap:14px;')}>
          <span aria-hidden="true" style={eyebrow}>01</span>
          <h2 style={secTitle}>{t('Compare every feature')}</h2>
        </div>
        <div role="region" aria-label={t('Feature comparison')} tabIndex={0} className="df-pricing-scroll">
          <table className="df-pricing-tbl">
            <colgroup>
              <col className="df-pricing-c1" />
              {plans.map((p) => (
                <col key={p.k} style={{ width: '15.16%' }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="df-pricing-feat">{t('Feature')}</th>
                {plans.map((p, i) => (
                  <th key={p.k} scope="col" className={i === 2 ? 'df-pricing-hl' : undefined}>{p.name}</th>
                ))}
              </tr>
            </thead>
            {GROUPS.map(([group, rows]) => (
              <tbody key={group}>
                <tr>
                  <th scope="colgroup" colSpan={6} className="df-pricing-group">{t(group)}</th>
                </tr>
                {rows.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">
                      <span className="df-pricing-name">
                        <span>{t(r.name)}</span>
                        {r.note ? <span className="df-pricing-note">{t(r.note)}</span> : null}
                      </span>
                    </th>
                    {r.v.map((v, i) => {
                      const cls = [v === '—' ? 'df-pricing-no' : v === 'Planned' ? 'df-pricing-planned' : '', v === '✓' ? 'df-pricing-yes' : '', i === 2 ? 'df-pricing-hl' : ''].filter(Boolean).join(' ');
                      const label = v === '—' ? t('Not included') : v === '✓' ? t('Included') : undefined;
                      return (
                        <td key={i} className={cls || undefined} aria-label={label}>
                          {cellText(v)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        <span style={css('font-size:13px;color:var(--muted,#5A6472);')}>{priceFoot}</span>
      </section>

      <section style={css('max-width:880px;margin:0 auto;padding:0 clamp(16px,4cqw,24px) 80px;display:flex;flex-direction:column;gap:14px;')}>
        <div style={css('display:flex;align-items:baseline;gap:14px;')}>
          <span aria-hidden="true" style={eyebrow}>02</span>
          <h2 style={secTitle}>{t('Questions')}</h2>
        </div>
        <Faq items={faqs} />
      </section>

      <section data-band="" style={css('background:var(--band,#0A2A4A);color:#FFFFFF;')}>
        <div style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,7cqw,80px) clamp(16px,4cqw,24px);display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;')}>
          <div style={css('display:flex;flex-direction:column;gap:8px;')}>
            <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(22px,3.6cqw,36px);letter-spacing:-0.025em;')}>{t('Your shop can be live today.')}</span>
            <span style={css('font-size:16px;color:#B8C7D6;')}>{t('Try everything in Business free for 10 days. No credit card required.')}</span>
          </div>
          <div style={css('display:flex;gap:20px;align-items:center;flex-wrap:wrap;')}>
            <a href={storeUrl} className="df-pricing-cta" style={css('height:48px;padding:0 24px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;font-family:Manrope,sans-serif;font-weight:700;')}>{t('Start free')}</a>
            <Link href={href('contact/sales')} className="df-pricing-talk" style={css('min-height:44px;display:flex;align-items:center;color:#F09A6D;font-weight:500;')}>{t('Talk to us')}</Link>
          </div>
        </div>
      </section>
    </PeriodProvider>
  );
}

export function meta({ ctx }) {
  const { t } = ctx;
  return {
    title: `${t('Pricing')} | DripFunnel`,
    description: t('See plans and prices in your currency. Starter is free forever, and paid plans start with a 10-day trial.'),
  };
}

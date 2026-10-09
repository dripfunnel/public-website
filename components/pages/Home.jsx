// Home page (/in/, /us/, /ae/, /ae/ar/). Copied from the original design, "Home" template (see AGENTS.md, Code guide).
// Server component: all real content is in the static HTML. Only the "Describe your shop" boxes, the example
// buttons and the four-step demo are small client islands (components/home/).
import { Fragment } from 'react';
import Link from 'next/link';
import '@/styles/home.css';
import { css } from '@/lib/css';
import { REG, REG_ORDER, TAX_RATE, TAX_INCLUDED } from '@/lib/regions';
import { SITE_URL, absoluteUrl, pagePath } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import PromptBox from '@/components/home/PromptBox';
import Examples from '@/components/home/Examples';
import HowItWorks from '@/components/home/HowItWorks';
import { SHOW_PLACEHOLDERS, HOME_FEATURES, PORTAL_NAV, STEPS, HISTORY } from '@/content/home-data';

const MONO12 = "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted,#5A6472);";
const SECTION_X = 'max-width:1240px;margin:0 auto;padding-left:clamp(16px,4cqw,24px);padding-right:clamp(16px,4cqw,24px);';
const H2 = 'font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(28px,4.4cqw,56px);line-height:1.02;letter-spacing:-0.035em;margin:0;color:var(--head,#0A2A4A);max-width:20ch;';

// The numbered heading row of a section: "01 — How it works", heading, optional intro.
function SectionHead({ eyebrow, title, intro }) {
  return (
    <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:14px 40px;border-top:1px solid var(--text,#14181F);padding-top:20px;')}>
      <span style={css(MONO12)}>{eyebrow}</span>
      <div style={css('grid-column:span 3;min-width:min(100%,300px);display:flex;flex-direction:column;gap:12px;')}>
        <h2 style={css(H2)}>{title}</h2>
        {intro ? <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);max-width:60ch;')}>{intro}</p> : null}
      </div>
    </div>
  );
}

// An arrow that points the other way on right-to-left pages.
function Arrow() {
  return (
    <span aria-hidden="true" className="df-flip" style={{ display: 'inline-block' }}>
      →
    </span>
  );
}

// The animated "drip" lines behind the hero. Pure CSS/SVG, nothing is loaded for it.
function HeroBg() {
  return (
    <div aria-hidden="true" data-hero-bg="" className="df-home-herobg">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 17 }, (_, i) => {
          const x1 = -4 + i * 6.75;
          const x2 = 50 + (x1 - 50) * 0.14;
          const d = 9 + ((i * 37) % 6);
          const del = -((i * 53) % 11);
          return (
            <g key={i}>
              <line x1={x1} y1={-2} x2={x2} y2={104} vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--border,#E8E2DC)', strokeWidth: 1, opacity: 'var(--fl-a,0.7)' }} />
              <line x1={x1} y1={-2} x2={x2} y2={104} pathLength={100} vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ stroke: '#EC844F', strokeOpacity: 'var(--dr-a,0.56)', strokeWidth: 2.2, strokeDasharray: '12.5 200', animation: `dfDrip ${d}s cubic-bezier(.45,0,.75,1) ${del}s infinite` }} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Page({ ctx }) {
  const { t, fmt, href, cur, content: R, storeUrl, region, locale } = ctx;

  // ----- Texts that depend on the region's sample shop (translated here, on the server) -----
  const tiles = (n) => R.items.slice(0, n).map(([name, p]) => ({ name: t(name), price: fmt(p) }));
  const frames = [
    { k: 'before', label: t('Before'), bg: '#FFFFFF', fg: '#14181F', accent: '#5A6472', tile: '#EDEAE5', bar: '#FFFFFF', hfont: 'Inter', store: R.store, headline: R.store, sub: t('Our shop. Say hello.'), cta: t('Browse'), nav: t('Shop · About · Cart'), tiles: tiles(4) },
    { k: 'after', label: t('After'), bg: R.after.bg, fg: R.after.fg, accent: R.after.accent, tile: R.after.tile, bar: R.after.bar, hfont: 'Manrope', store: R.store, headline: t(R.after.headline), sub: t(R.after.sub), cta: t(R.after.cta), nav: t(R.after.nav), tiles: tiles(4) },
  ];
  const stepsData = STEPS.map(([title, d], i) => ({ n: '0' + (i + 1), t: t(title), d: t(d) }));
  const nextLabels = STEPS.map(([title]) => t('Next: {step}', { step: t(title) }));
  const history = HISTORY.map(([v, label, date]) => ({ v, label: t(label), date: t(date), owner: t(R.owner) }));
  const liveMsgs = Object.fromEntries(HISTORY.map(([v]) => [v, v === 13 ? t('Version 13 is live. Pick any earlier version to go back to it.') : t('Version {v} is live again. Nothing else changed, and version 13 is still in your history.', { v })]));
  const examples = [
    { short: t('Calm and earthy'), full: t('Make it calm and earthy, with lots of white space and big photos.') },
    { short: t('Bestsellers first'), full: t('Put our bestsellers at the top of the homepage and add a gift guide page.') },
    { short: t('Our story'), full: t('Add a page telling the story of how we started in {city}, and link it from the menu.', { city: t(R.city) }) },
  ];

  const features = HOME_FEATURES.map(([title, d, page], i) => ({
    n: String(i + 1).padStart(2, '0'),
    title: t(title),
    d: title === 'Sell in many countries' ? t(d, { tax: t(R.tax) }) : t(d),
    href: href(page),
  }));

  // Portal preview
  const portalNav = PORTAL_NAV.map(([label, badge, on]) => ({ label: t(label), badge, on }));
  const wait = [
    [t('4 orders to ship'), t('Oldest paid 2 hours ago'), t('Ship')],
    [t('2 abandoned carts to remind'), t('Worth {amount}', { amount: fmt(R.items[0][1] + R.items[3][1]) }), t('Remind')],
    [t('1 supplier product to approve'), t('Added by your supplier this morning'), t('Review')],
  ];
  const nums = [
    [t('Takings today'), fmt(R.today)],
    [t('Orders today'), '12'],
    [t('Visitors today'), '840'],
  ];

  // Country comparison table: INR, AED, USD with the current region highlighted
  const rowLabels = ['Currency', 'Tax', 'Payments', 'Couriers', 'Compare price', 'Product code'];
  const cell = (c, i) => {
    const r = REG[c];
    return [c, t(r.taxLine), t(r.pay), t(r.couriers), t(r.compare), t(r.code)][i];
  };

  // Receipt
  const rate = TAX_RATE[cur];
  const incl = TAX_INCLUDED[cur];
  const sub = R.items[0][1] + R.items[1][1];
  const tax = incl ? sub - sub / (1 + rate) : sub * rate;
  const total = incl ? sub : sub + tax;
  const taxLabel = incl ? t('{tax} included', { tax: t(R.tax) }) : t('{tax} (sample)', { tax: t(R.tax) });
  const receiptLines = [
    [t('Subtotal'), fmt(sub)],
    [taxLabel, fmt(Math.round(tax * 100) / 100)],
    [t('Delivery'), t('Free')],
    [t('Payment provider'), t('Their own fee')],
  ];

  const orgUrl = absoluteUrl('/');
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DripFunnel',
      url: orgUrl,
      logo: absoluteUrl('/assets/favicon/icon-ink-512.png'),
      parentOrganization: { '@type': 'Organization', name: 'Softobotics' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'DripFunnel',
      url: SITE_URL + pagePath(region, locale),
      inLanguage: locale === 'ar' ? 'ar-AE' : ctx.regionInfo.hreflang,
      publisher: { '@type': 'Organization', name: 'DripFunnel' },
    },
  ];

  return (
    <Fragment>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section style={css(`${SECTION_X}padding-top:clamp(28px,4cqw,48px);padding-bottom:clamp(40px,7cqw,96px);display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;position:relative;isolation:isolate;`)}>
        <HeroBg />
        <div style={css(`display:flex;flex-wrap:wrap;justify-content:center;gap:6px 18px;${MONO12}`)}>
          <span>{t('700+ merchants')}</span>
          <span aria-hidden="true" style={css('color:#EC844F;')}>●</span>
          <span>{t('No templates')}</span>
          <span aria-hidden="true" style={css('color:#EC844F;')}>●</span>
          <span>{t('0% fee on orders')}</span>
        </div>
        <h1 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(34px,6.6cqw,84px);line-height:1.02;letter-spacing:-0.04em;margin:0;color:var(--head,#0A2A4A);max-width:15ch;')}>
          {t('Tell Us What You Sell. We’ll Build')}{' '}
          <span style={css('background:linear-gradient(transparent 62%, rgba(236,132,79,0.45) 62%, rgba(236,132,79,0.45) 92%, transparent 92%);padding:0 0.04em;')}>{t('Your Store.')}</span>
        </h1>
        <p style={css('margin:0;font-size:clamp(16px,1.7cqw,20px);line-height:1.55;color:var(--muted,#5A6472);max-width:56ch;')}>
          {t('No themes, no design skills, no code. Say what you sell and how it should feel. You get a homepage, pages, menus and product pages to check, and nothing goes live until you approve it.')}
        </p>
        <PromptBox variant="hero" label={t('Describe your shop')} placeholder={t('Describe your shop…')} startLabel={t('Start free')} href={storeUrl} />
        <Examples tryLabel={t('Try')} items={examples} />
        <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t('Starter is free forever. Paid plans start with 10 days of Business, no credit card.')}</span>
      </section>

      {/* Merchants */}
      <section aria-label={t('Merchants')} style={css('border-top:1px solid var(--border,#E8E2DC);border-bottom:1px solid var(--border,#E8E2DC);background:var(--surface,#FFFFFF);')}>
        <div style={css(`${SECTION_X}padding-top:22px;padding-bottom:22px;display:flex;align-items:center;gap:16px 32px;flex-wrap:wrap;justify-content:center;`)}>
          <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:18px;letter-spacing:-0.02em;color:var(--head,#0A2A4A);')}>{t('700+ merchants sell on DripFunnel')}</span>
          {SHOW_PLACEHOLDERS ? (
            <div style={css('display:flex;flex-wrap:wrap;gap:10px;justify-content:center;')}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <span key={n} style={css("width:112px;height:40px;border:1px dashed var(--field,#D7D3CD);border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);")}>
                  {t('Merchant logo')}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* 01 How it works */}
      <section style={css(`${SECTION_X}padding-top:clamp(48px,9cqw,120px);padding-bottom:clamp(40px,7cqw,88px);display:flex;flex-direction:column;gap:40px;`)}>
        <SectionHead eyebrow={t('01 — How it works')} title={t('Describe, preview, publish. Undo whenever you like.')} intro={t('This is {store}, a sample shop in {country}. Click through the four steps.', { store: R.store, country: t(R.country) })} />
        <HowItWorks
          steps={stepsData}
          nextLabels={nextLabels}
          startAgain={t('Start again')}
          groupLabel={t('Steps')}
          describeTitle={t('Describe your shop')}
          prompt={t(R.prompt)}
          designsLabel={t('What the AI designs')}
          designs={[t('Homepage'), t('Pages'), t('Menus'), t('Product pages'), t('Colours and type')]}
          aiNote={t('The AI changes how your shop looks. It never changes your prices, stock or checkout.')}
          devs={[
            { k: 'desktop', label: t('Desktop') },
            { k: 'tablet', label: t('Tablet') },
            { k: 'phone', label: t('Phone') },
          ]}
          previewSizeLabel={t('Preview size')}
          draftTitle={t('Draft · not on your live site')}
          frames={frames}
          changed={[t('Changed:'), t('colours, type, homepage, menu, new page')]}
          notTouched={[t('Not touched:'), t('products, prices, checkout')]}
          publishTitle={t('Approve and publish')}
          publishDone={t('Version 13 is live. We checked your site and it changed.')}
          publishBoxes={[
            [t('Before you publish'), t('Nothing reaches shoppers until you press approve.')],
            [t('While it publishes'), t('Your shop stays open. Shoppers see the old version until the new one is ready.')],
            [t('If something breaks'), t('The draft stays a draft. Your live site doesn’t change.')],
          ]}
          historyTitle={t('History')}
          history={history}
          liveBadge={t('Live')}
          backLabel={t('Go back to this')}
          liveMsgs={liveMsgs}
        />
      </section>

      {/* 02 Fees */}
      <section style={css('background:var(--sunk,#F3EDE8);')}>
        <div style={css(`${SECTION_X}padding-top:clamp(48px,9cqw,120px);padding-bottom:clamp(48px,9cqw,120px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(32px,6cqw,88px);align-items:center;`)}>
          <div style={css('display:flex;flex-direction:column;gap:18px;')}>
            <span style={css(MONO12)}>{t('02 — Fees')}</span>
            <h2 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(30px,5cqw,64px);line-height:1;letter-spacing:-0.04em;margin:0;color:var(--head,#0A2A4A);')}>{t('Read the last line of the receipt.')}</h2>
            <p style={css('margin:0;font-size:18px;color:var(--muted,#5A6472);max-width:46ch;')}>{t('DripFunnel takes nothing from your orders, on every plan, including Starter. You pay your payment provider’s own fee and that’s it.')}</p>
            <dl style={css('margin:8px 0 0;display:flex;flex-direction:column;border-top:1px solid var(--text,#14181F);')}>
              {[
                ['Starter', 'Free forever · 10 products'],
                ['Paid plans', '10 days of Business first, no card'],
                ['Changing plan', 'Upgrades now · downgrades at period end'],
              ].map(([dt, dd]) => (
                <div key={dt} style={css('display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid var(--border,#E8E2DC);flex-wrap:wrap;')}>
                  <dt style={css('font-family:Manrope,sans-serif;font-weight:700;')}>{t(dt)}</dt>
                  <dd style={css('margin:0;color:var(--muted,#5A6472);')}>{t(dd)}</dd>
                </div>
              ))}
            </dl>
            <Link href={href('pricing')} style={css('min-height:44px;display:flex;align-items:center;font-weight:500;')}>
              {t('See plans and prices in {currency}', { currency: cur })}&nbsp;<Arrow />
            </Link>
          </div>
          <div style={css('display:flex;justify-content:center;')}>
            <div aria-label={t('Sample order receipt')} role="img" className="df-home-receipt" style={css("width:100%;max-width:380px;background:#FFFFFF;color:#14181F;padding:36px 28px 40px;font-family:'IBM Plex Mono',monospace;font-size:13px;line-height:1.5;transform:rotate(-1.5deg);filter:drop-shadow(0 18px 28px rgba(10,42,74,0.16));display:flex;flex-direction:column;gap:6px;")}>
              <span style={css('text-align:center;font-family:Manrope,sans-serif;font-weight:800;font-size:18px;letter-spacing:-0.01em;')}>{R.store}</span>
              <span style={css('text-align:center;color:#5A6472;font-size:11px;')}>{t('Order #1042 · {city}', { city: t(R.city) })}</span>
              <span style={css('border-top:1px dashed #B8BEC6;margin:10px 0 6px;')}></span>
              {[R.items[0], R.items[1]].map(([name, p]) => (
                <span key={name} style={css('display:flex;justify-content:space-between;gap:12px;')}>
                  <span>{t(name)}</span>
                  <span>{fmt(p)}</span>
                </span>
              ))}
              <span style={css('border-top:1px dashed #B8BEC6;margin:6px 0;')}></span>
              {receiptLines.map(([l, v]) => (
                <span key={l} style={css('display:flex;justify-content:space-between;gap:12px;color:#434A55;')}>
                  <span>{l}</span>
                  <span style={css('text-align:right;')}>{v}</span>
                </span>
              ))}
              <span style={css('border-top:1px dashed #B8BEC6;margin:6px 0;')}></span>
              <span style={css('display:flex;justify-content:space-between;gap:12px;font-weight:500;font-size:14px;')}>
                <span>{t('Shopper paid')}</span>
                <span>{fmt(Math.round(total * 100) / 100)}</span>
              </span>
              <span style={css('display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:10px;padding:10px 12px;border:2px solid #EC844F;border-radius:6px;font-weight:500;font-size:14px;')}>
                <span>{t('DripFunnel fee')}</span>
                <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:20px;color:#B8541F;')}>{fmt(0)}</span>
              </span>
              <span style={css('text-align:center;color:#5A6472;font-size:11px;margin-top:12px;')}>{t('Sample order · thank you for shopping small')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 03 What you get */}
      <section style={css(`${SECTION_X}padding-top:clamp(48px,9cqw,120px);padding-bottom:clamp(40px,7cqw,88px);display:flex;flex-direction:column;gap:28px;`)}>
        <SectionHead eyebrow={t('03 — What you get')} title={t('Everything a shop needs, in one portal.')} />
        <div style={css('display:flex;flex-direction:column;')}>
          {features.map((f) => (
            <Link key={f.n} href={f.href} className="df-home-feat df-h-link" style={css("gap:6px 32px;padding:24px 0;border-bottom:1px solid var(--border,#E8E2DC);text-decoration:none;color:var(--text,#14181F);align-items:baseline;")}>
              <span style={css("font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--muted,#5A6472);")}>{f.n}</span>
              <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(19px,2.6cqw,32px);line-height:1.15;letter-spacing:-0.025em;')}>{f.title}</span>
              <span style={css('font-size:16px;color:var(--muted,#5A6472);line-height:1.55;')}>{f.d}</span>
              <span aria-hidden="true" className="df-flip" style={css('font-size:22px;color:var(--link,#B8541F);text-align:right;')}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 04 Your portal */}
      <section style={css(`${SECTION_X}padding-top:clamp(32px,6cqw,72px);padding-bottom:clamp(48px,9cqw,120px);display:flex;flex-direction:column;gap:32px;`)}>
        <SectionHead eyebrow={t('04 — Your portal')} title={t('Open it and see what needs you.')} intro={t('Home starts with what’s waiting: orders to ship, carts to win back, supplier products to approve. Then today’s numbers.')} />
        <div aria-hidden="true" style={css('border:1.5px solid var(--text,#14181F);border-radius:12px;overflow:hidden;background:var(--paper,#FDFAF7);display:flex;min-height:420px;')}>
          <div className="df-home-side" style={css('width:210px;flex:none;background:#0A2A4A;color:#FFFFFF;flex-direction:column;padding:16px 0;gap:1px;')}>
            <img src="/assets/dripfunnel-logo-inverse.svg" alt="" width="105" height="20" loading="lazy" style={css('height:20px;width:auto;align-self:flex-start;margin:0 16px 14px;')} />
            {portalNav.map((p) => (
              <span key={p.label} style={css(`display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:8px;padding-right:16px;padding-bottom:8px;padding-left:13px;font-size:13px;background:${p.on ? 'rgba(255,255,255,0.10)' : 'transparent'};border-left:3px solid ${p.on ? '#EC844F' : 'transparent'};font-weight:${p.on ? 700 : 400};`)}>
                {p.label}
                {p.badge ? <span style={css('min-width:20px;padding:1px 6px;border-radius:10px;background:#EC844F;color:#FFFFFF;font-size:11px;font-weight:700;text-align:center;')}>{p.badge}</span> : null}
              </span>
            ))}
          </div>
          <div style={css('flex:1;min-width:0;padding:24px;display:flex;flex-direction:column;gap:14px;')}>
            <div style={css('display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap;')}>
              <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.02em;')}>{t('Good morning, {owner}', { owner: t(R.owner) })}</span>
              <span style={css("font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);")}>{t('{store} · sample data', { store: R.store })}</span>
            </div>
            <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;overflow:hidden;')}>
              <div style={css('padding:12px 16px;border-bottom:1px solid var(--border,#E8E2DC);font-family:Manrope,sans-serif;font-weight:700;font-size:15px;')}>{t('Waiting for you')}</div>
              {wait.map(([title, d, a]) => (
                <div key={title} style={css('display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border,#E8E2DC);')}>
                  <span style={css('flex:1;display:flex;flex-direction:column;min-width:0;')}>
                    <span style={css('font-size:14px;font-weight:600;')}>{title}</span>
                    <span style={css('font-size:12px;color:var(--muted,#5A6472);')}>{d}</span>
                  </span>
                  <span style={css('height:32px;padding:0 12px;border:1px solid var(--field,#D7D3CD);border-radius:8px;display:flex;align-items:center;font-size:13px;')}>{a}</span>
                </div>
              ))}
            </div>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;')}>
              {nums.map(([l, v]) => (
                <div key={l} style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:2px;')}>
                  <span style={css('font-size:12px;color:var(--muted,#5A6472);')}>{l}</span>
                  <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:24px;letter-spacing:-0.03em;')}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <a href={storeUrl} style={css('min-height:44px;display:flex;align-items:center;font-weight:500;align-self:flex-start;')}>
          {t('Open the portal')}&nbsp;<Arrow />
        </a>
      </section>

      {/* 05 Sell worldwide */}
      <section style={css(`${SECTION_X}padding-bottom:clamp(48px,9cqw,120px);display:flex;flex-direction:column;gap:32px;`)}>
        <SectionHead eyebrow={t('05 — Sell worldwide')} title={t('Local rules, local payments, local couriers.')} intro={t('Your shop follows the rules of the country it sells in. Here is what changes in three of them.')} />
        <div role="region" aria-label={t('Country comparison')} tabIndex={0} style={css('overflow:auto;')}>
          <table className="df-home-table">
            <thead>
              <tr>
                <th scope="col" style={css('text-align:left;padding-top:14px;padding-right:16px;padding-bottom:14px;padding-left:0;width:18%;')}></th>
                {REG_ORDER.map((c) => {
                  const r = REG[c];
                  const on = c === cur;
                  return (
                    <th key={c} scope="col" style={css(`text-align:left;padding:14px 16px;border-bottom:1.5px solid var(--text,#14181F);background:${on ? 'var(--tint,#FDF0E8)' : 'transparent'};vertical-align:bottom;`)}>
                      <span style={css('display:flex;flex-direction:column;gap:2px;')}>
                        {on ? <span style={css("font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--tint-fg,#8F4017);")}>{t('Your region')}</span> : null}
                        <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.02em;')}>{t(r.country)}</span>
                        <span style={css('font-size:13px;font-weight:400;color:var(--muted,#5A6472);')}>{t('Sample shop: {store}', { store: r.store })}</span>
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rowLabels.map((l, i) => (
                <tr key={l}>
                  <th scope="row" style={css(`text-align:left;padding-top:14px;padding-right:16px;padding-bottom:14px;padding-left:0;border-bottom:1px solid var(--border,#E8E2DC);${MONO12}font-weight:400;`)}>{t(l)}</th>
                  {REG_ORDER.map((c) => (
                    <td key={c} style={css(`padding:14px 16px;border-bottom:1px solid var(--border,#E8E2DC);background:${c === cur ? 'var(--tint,#FDF0E8)' : 'transparent'};vertical-align:top;`)}>{cell(c, i)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonial placeholder (the owner will supply real words later) */}
      {SHOW_PLACEHOLDERS ? (
        <section aria-label={t('What merchants say')} style={css(`${SECTION_X}padding-bottom:clamp(48px,9cqw,120px);`)}>
          <figure style={css('margin:0 auto;max-width:900px;border:1px dashed var(--field,#D7D3CD);border-radius:12px;padding:clamp(28px,5cqw,56px);display:flex;flex-direction:column;gap:18px;align-items:center;text-align:center;')}>
            <span style={css(MONO12)}>{t('Testimonial placeholder')}</span>
            <blockquote style={css('margin:0;font-family:Manrope,sans-serif;font-weight:700;font-size:clamp(20px,3cqw,34px);line-height:1.25;letter-spacing:-0.02em;color:var(--muted,#5A6472);')}>
              {t('“A merchant’s own words go here, one or two sentences about what changed for their shop.”')}
            </blockquote>
            <figcaption style={css('font-size:15px;color:var(--muted,#5A6472);')}>{t('Name · Shop · Country')}</figcaption>
          </figure>
        </section>
      ) : null}

      {/* Closing band */}
      <section data-band="" style={css('background:var(--band,#0A2A4A);color:#FFFFFF;')}>
        <div style={css(`${SECTION_X}padding-top:clamp(48px,9cqw,120px);padding-bottom:clamp(48px,9cqw,120px);display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;`)}>
          <h2 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(32px,6cqw,76px);letter-spacing:-0.04em;line-height:1;max-width:14ch;margin:0;')}>{t('Your shop can be live today.')}</h2>
          <span style={css('font-size:18px;color:#B8C7D6;max-width:52ch;')}>{t('Describe it, preview it, publish it. Starter is free forever.')}</span>
          <PromptBox variant="band" label={t('Describe your shop')} placeholder={t('Describe your shop…')} startLabel={t('Start free')} href={storeUrl} />
          <Link href={href('contact/demo')} className="df-home-demo" style={css('min-height:44px;display:flex;align-items:center;color:#F09A6D;font-weight:500;')}>
            {t('Or book a demo')}
          </Link>
        </div>
      </section>
    </Fragment>
  );
}

export function meta({ ctx }) {
  const { t } = ctx;
  return {
    title: t('DripFunnel: Describe your shop, AI builds your store'),
    description: t('Tell us what you sell and AI designs your homepage, pages, menus and product pages. Nothing goes live until you approve it. Start free.'),
  };
}

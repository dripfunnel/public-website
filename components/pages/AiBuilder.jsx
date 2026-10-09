import Link from 'next/link';
import { css } from '@/lib/css';
import DeviceCompare from '@/components/ai/DeviceCompare';
import VersionHistory from '@/components/ai/VersionHistory';
import '@/styles/ai.css';

// AI Builder page (original: template block "AI Builder" and the "AI store mocks" data in the script).
// Only the device buttons and the "Go back to this" history are interactive (components/ai/, small client islands).

const H2 = 'font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(26px,4cqw,44px);line-height:1.08;letter-spacing:-0.03em;margin:0;color:var(--head,#0A2A4A);';
const MONO11 = "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;";

export default function Page({ ctx }) {
  const { t, fmt, href, content: R, prices, storeUrl } = ctx;

  const steps = [
    ['Describe', 'What you sell, who buys it and how it should feel. Or one change: “add an About page”.'],
    ['Preview', 'A draft arrives with what changed and what wasn’t touched. Check desktop, tablet and phone.'],
    ['Approve', 'Nothing reaches shoppers until you say so. Don’t like it? Discard and ask again.'],
    ['Publish', 'Your live shop changes in about a minute. We check that it did.'],
    ['Undo', 'Every version is kept. Go back to any of them in one click.'],
  ].map(([title, d], i) => ({ n: '0' + (i + 1), t: t(title), d: t(d) }));

  const prompts = [
    [R.prompt, 'Colours, type, homepage, menu, new page'],
    ['Add a page about how we make our products, and put it in the menu.', 'New page · menu'],
    ['Put our bestsellers at the top of the homepage.', 'Homepage sections'],
    ['Show the size chart above the add-to-cart button on product pages.', 'Product page layout'],
    ['Use our brand colours, deep green and cream, everywhere.', 'Look and feel on every page'],
    ['Make the menu simpler: Shop, Our story, Help.', 'Menus'],
  ].map(([p, c]) => ({ p: t(p), c: t(c) }));

  const designs = [
    ['Homepage', 'Sections, order and words'],
    ['Pages', 'About, story, help, gift guides'],
    ['Menus', 'Header and footer'],
    ['Product pages', 'Layout and what shows first'],
    ['Look and feel', 'Colours, type and spacing'],
  ].map(([title, d]) => ({ t: t(title), d: t(d) }));

  const histPlans = [
    ['Starter (Free)', '7 days'],
    ['Growth', '30 days'],
    ['Growth Pro', '90 days'],
    ['Business', '1 year'],
    ['Partner', 'Unlimited'],
  ].map(([p, v]) => ({ p: t(p), v: t(v) }));

  // Before / After shop previews (4 tiles each; the CSS hides the extra ones on tablet and phone)
  const tiles = (bg) => R.items.map(([name, p]) => ({ name: t(name), price: fmt(p), bg }));
  const A = R.after;
  const frames = [
    { label: t('Before'), bg: '#FFFFFF', fg: '#14181F', accent: '#5A6472', headline: R.store, sub: t('Our shop. Say hello.'), cta: t('Browse'), hfont: 'Inter', bar: '#FFFFFF', nav: t('Shop · About · Cart'), tiles: tiles('#EDEAE5') },
    { label: t('After'), bg: A.bg, fg: A.fg, accent: A.accent, headline: t(A.headline), sub: t(A.sub), cta: t(A.cta), hfont: 'Manrope', bar: A.bar, nav: t(A.nav), tiles: tiles(A.tile) },
  ];
  const devices = [
    { id: 'desktop', label: t('Desktop') },
    { id: 'tablet', label: t('Tablet') },
    { id: 'phone', label: t('Phone') },
  ];

  // History card (version 13 is live to start with)
  const hist = [
    [13, 'Calm, earthy homepage · bestsellers first', 'Today, 10:42'],
    [12, 'New page: how we make it', 'Yesterday, 16:05'],
    [11, 'Free-returns note in the footer', '28 Sep, 09:30'],
    [10, 'First version', '24 Sep, 14:12'],
  ].map(([v, label, date]) => ({ v, label: t(label), date: t(date) }));
  const msgs = { 13: t('Version 13 is live. Pick any earlier version to go back to it.') };
  for (const { v } of hist.slice(1)) msgs[v] = t('Version {v} is live again. Nothing else changed, and version 13 is still in your history.', { v });

  const setupLine = t('{a} on Growth, {b} on Growth Pro, {c} on Business', { a: fmt(prices.starter[1]), b: fmt(prices.growth[1]), c: fmt(prices.business[1]) });

  return (
    <>
      <section style={css('max-width:1240px;margin:0 auto;padding:clamp(40px,7cqw,96px) clamp(16px,4cqw,24px) clamp(36px,5cqw,64px);display:flex;flex-direction:column;gap:22px;')}>
        <div style={css('display:flex;align-items:center;gap:12px;')}>
          <span style={css('width:32px;height:2px;background:#EC844F;display:block;')}></span>
          <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted,#5A6472);")}>{t('AI Store Builder')}</span>
        </div>
        <h1 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(32px,6cqw,68px);line-height:1.03;letter-spacing:-0.035em;margin:0;color:var(--head,#0A2A4A);max-width:16ch;')}>{t('Your whole store, designed from a description.')}</h1>
        <p style={css('margin:0;font-size:clamp(16px,1.6cqw,19px);color:var(--muted,#5A6472);max-width:60ch;')}>
          {t('There are no themes to pick and no templates to fight. You tell the AI about your business. It designs the homepage, pages, menus, product pages and the look of all of them. You check it, publish it, and can undo it.')}
        </p>
        <div style={css('display:flex;gap:20px;align-items:center;flex-wrap:wrap;')}>
          <a href={storeUrl} className="df-h-primary" style={css('height:44px;padding:0 22px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;font-family:Manrope,sans-serif;font-weight:700;font-size:15px;')}>{t('Start free')}</a>
          <Link href={href('pricing')} style={css('min-height:44px;display:flex;align-items:center;font-weight:500;')}>{t('Which plans include AI')}</Link>
        </div>
      </section>

      <section style={css('max-width:1240px;margin:0 auto;padding:0 clamp(16px,4cqw,24px) clamp(44px,8cqw,96px);')}>
        <ol style={css('list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:14px;')}>
          {steps.map((x) => (
            <li key={x.n} style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:8px;')}>
              <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.12em;color:var(--link,#B8541F);")}>{x.n}</span>
              <span style={css('font-family:Manrope,sans-serif;font-weight:700;font-size:18px;')}>{x.t}</span>
              <span style={css('font-size:15px;color:var(--muted,#5A6472);line-height:1.55;')}>{x.d}</span>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ background: 'var(--sunk,#F3EDE8)' }}>
        <div style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,96px) clamp(16px,4cqw,24px);display:flex;flex-direction:column;gap:28px;')}>
          <div style={css('display:flex;flex-direction:column;gap:12px;max-width:720px;')}>
            <h2 style={css(H2)}>{t('What merchants type')}</h2>
            <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);')}>{t('Plain sentences. Ask for one change at a time, or describe the whole shop at once.')}</p>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:14px;')}>
            {prompts.map((x) => (
              <div key={x.p} style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px;')}>
                <span style={css('font-size:16px;line-height:1.55;')}>“{x.p}”</span>
                <span style={css('display:flex;gap:8px;align-items:baseline;font-size:14px;border-top:1px solid var(--border,#E8E2DC);padding-top:10px;')}>
                  <span style={css("font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);flex:none;")}>{t('Changes')}</span>
                  <span style={css('color:var(--okfg,#1D6B47);')}>{x.c}</span>
                </span>
              </div>
            ))}
          </div>
          <span style={css('font-size:15px;color:var(--muted,#5A6472);')}>{t('The AI changes how your shop looks and reads. It never touches your prices, stock, orders or checkout.')}</span>
        </div>
      </section>

      <DeviceCompare
        title={t('Before and after, on every screen')}
        intro={t('Every change arrives as a draft. Check it on desktop, tablet and phone before anyone else sees it.')}
        groupLabel={t('Preview size')}
        devices={devices}
        store={R.store}
        frames={frames}
        designs={designs}
      />

      <section style={{ background: 'var(--sunk,#F3EDE8)' }}>
        <div style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,96px) clamp(16px,4cqw,24px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:clamp(28px,5cqw,56px);align-items:start;')}>
          <div style={css('display:flex;flex-direction:column;gap:14px;')}>
            <h2 style={css(H2)}>{t('Every version kept. Undo in one click.')}</h2>
            <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);')}>{t('Each publish becomes a numbered version with what changed and who did it. Going back to an older one is instant and never uses your AI allowance.')}</p>
            <dl style={css('margin:0;display:flex;flex-direction:column;')}>
              {histPlans.map((x) => (
                <div key={x.p} style={css('display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid var(--border,#E8E2DC);font-size:15px;')}>
                  <dt>{x.p}</dt>
                  <dd style={css('margin:0;font-weight:600;')}>{x.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <VersionHistory
            title={t('History · {store}', { store: R.store })}
            owner={R.owner}
            items={hist}
            liveLabel={t('Live')}
            backLabel={t('Go back to this')}
            msgs={msgs}
          />
        </div>
      </section>

      <section style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,96px) clamp(16px,4cqw,24px);display:flex;flex-direction:column;gap:28px;')}>
        <div style={css('display:flex;flex-direction:column;gap:12px;max-width:720px;')}>
          <h2 style={css(H2)}>{t('AI on every plan')}</h2>
          <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);')}>{t('The same AI designs your store and writes your product descriptions and translations. How you pay for it depends on your plan.')}</p>
        </div>
        <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:14px;')}>
          <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:24px;display:flex;flex-direction:column;gap:10px;')}>
            <span style={css(MONO11 + 'color:var(--muted,#5A6472);')}>{t('Starter (Free) and Growth')}</span>
            <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:22px;')}>{t('On your own AI key')}</span>
            <span style={css('font-size:15px;color:var(--muted,#5A6472);')}>{t('Connect your own OpenAI or Anthropic account and pay them directly for what you use. Paste the key once in Settings.')}</span>
          </div>
          <div style={css('background:var(--surface,#FFFFFF);border:2px solid #EC844F;border-radius:12px;padding:24px;display:flex;flex-direction:column;gap:10px;')}>
            <span style={css(MONO11 + 'color:var(--tint-fg,#8F4017);')}>{t('From Growth Pro')}</span>
            <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:22px;')}>{t('Included, no key needed')}</span>
            <span style={css('font-size:15px;color:var(--muted,#5A6472);')}>{t('A monthly allowance comes with the plan, larger on Business. If you run out, your shop keeps working and nothing you published changes.')}</span>
          </div>
        </div>
      </section>

      <section data-band="" style={{ background: 'var(--band,#0A2A4A)', color: '#FFFFFF' }}>
        <div style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,7cqw,88px) clamp(16px,4cqw,24px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:36px;align-items:center;')}>
          <div style={css('display:flex;flex-direction:column;gap:12px;')}>
            <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#B8C7D6;")}>{t('Optional setup help')}</span>
            <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(24px,4cqw,40px);letter-spacing:-0.03em;line-height:1.1;')}>{t('Need help building your storefront? We’ll do it for you.')}</span>
            <span style={css('font-size:17px;color:#B8C7D6;')}>{t('Our team builds your homepage, pages, menus and first products so you launch looking finished. It’s a one-time payment on paid plans: {setupLine}.', { setupLine })}</span>
          </div>
          <div style={css('display:flex;gap:20px;align-items:center;flex-wrap:wrap;')}>
            <Link href={href('contact/sales')} className="df-ai-band-btn" style={css('height:48px;padding:0 24px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;font-family:Manrope,sans-serif;font-weight:700;font-size:16px;')}>{t('Ask us to build it')}</Link>
            <a href={storeUrl} className="df-ai-band-link" style={css('min-height:44px;display:flex;align-items:center;color:#F09A6D;font-weight:500;')}>{t('Or build it yourself, free')}</a>
          </div>
        </div>
      </section>
    </>
  );
}

export function meta({ ctx }) {
  const { t } = ctx;
  return {
    title: `${t('AI Store Builder')} | DripFunnel`,
    description: t('Describe a change in plain words, preview it on desktop, tablet and phone, then approve and publish. Undo any time.'),
  };
}

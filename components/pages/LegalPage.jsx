import Link from 'next/link';
import { css } from '@/lib/css';
import { LEGAL } from '@/components/legal/legalText';
import '@/styles/legal.css';

// Shared by the Terms of Service and the Privacy Policy pages. Copied from the original design (template block "Legal" and its data LG).
// No JavaScript: the "On this page" links are plain anchor links to the sections (#sec-1 ...), and each section has a scroll margin (styles/legal.css).
// `which` is 'terms' or 'privacy'.

const MONO = "font-family:'IBM Plex Mono',monospace;";
const MAN = 'font-family:Manrope,sans-serif;';

export default function LegalPage({ ctx, which }) {
  const { t, href } = ctx;
  const lg = LEGAL[which];
  const secs = lg.secs.map(([h, p], i) => ({ n: i + 1, h: t(h), p: t(p), id: 'sec-' + (i + 1) }));

  return (
    <section data-screen-label="Legal" style={css('max-width:1240px;margin:0 auto;padding:clamp(40px,7cqw,80px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:40px;align-items:start;')}>
      <nav aria-label={t('On this page')} style={css('display:flex;flex-direction:column;gap:2px;position:sticky;top:96px;')}>
        <span style={css(MONO + 'font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);padding-bottom:8px;')}>{t('On this page')}</span>
        {secs.map((x) => (
          <a key={x.id} href={'#' + x.id} className="df-legal-toc-link" style={css('min-height:40px;display:flex;align-items:center;padding:0;text-align:left;color:var(--text,#14181F);font-family:Inter,sans-serif;font-size:14px;text-decoration:none;')}>
            <bdi dir="ltr">{x.n}.</bdi>&nbsp;{x.h}
          </a>
        ))}
        <Link href={href(lg.otherPage)} style={css('min-height:44px;display:flex;align-items:center;font-size:14px;margin-top:12px;')}>
          {t(lg.other)}
        </Link>
      </nav>
      <article className="df-legal-article" style={css('grid-column:span 3;min-width:min(100%,300px);max-width:760px;display:flex;flex-direction:column;gap:18px;')}>
        <h1 style={css(MAN + 'font-weight:800;font-size:clamp(30px,5cqw,50px);line-height:1.05;letter-spacing:-0.035em;margin:0;color:var(--head,#0A2A4A);')}>{t(lg.title)}</h1>
        <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t('Last updated: [date] · Applies from: [date]')}</span>
        <div role="note" style={css('background:var(--tint,#FDF0E8);color:var(--tint-fg,#8F4017);border-radius:12px;padding:14px 16px;font-size:15px;')}>{t('Template text. Replace every section with wording approved by your lawyer before publishing.')}</div>
        <p style={css('margin:0;font-size:17px;line-height:1.7;')}>{t(lg.intro)}</p>
        {secs.map((x) => (
          <section key={x.id} id={x.id} className="df-legal-sec" style={css('display:flex;flex-direction:column;gap:8px;padding-top:12px;')}>
            <h2 style={css(MAN + 'margin:0;font-weight:800;font-size:22px;letter-spacing:-0.02em;color:var(--head,#0A2A4A);')}>
              <bdi dir="ltr">{x.n}.</bdi>&nbsp;{x.h}
            </h2>
            <p style={css('margin:0;font-size:16px;line-height:1.75;')}>{x.p}</p>
          </section>
        ))}
      </article>
    </section>
  );
}

export function legalMeta(ctx, which) {
  const { t } = ctx;
  const description = which === 'terms' ? t('The agreement between you and DripFunnel when you use DripFunnel to run an online shop.') : t('What personal data DripFunnel collects, why, and the choices you have.');
  return { title: `${t(LEGAL[which].title)} | DripFunnel`, description };
}

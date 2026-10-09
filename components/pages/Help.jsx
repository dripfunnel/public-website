import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import HelpSearch from '@/components/help/HelpSearch';
import Helpful from '@/components/help/Helpful';
import { css } from '@/lib/css';
import { absoluteUrl } from '@/lib/site';
import { HC, ALL_ARTS, getArticle } from '@/content/help-data';
import '@/styles/help.css';

// Help centre (/help) and articles (/help/<id>). Copied from the original design: template "Help centre" and "Help article".

export function paths() {
  return [[], ...ALL_ARTS.map((a) => [a.id])];
}

export function meta({ ctx, rest = [] }) {
  const { t } = ctx;
  const index = { title: `${t('Help Centre')} | DripFunnel`, description: t('How-to articles and support for running your DripFunnel shop.') };
  if (!rest[0]) return index;
  const a = getArticle(rest[0]);
  if (!a) return index;
  // Unfinished articles have no real text yet: they are listed on the site but kept out of search results.
  return {
    title: `${t(a.t)} | DripFunnel`,
    description: a.stub ? t('{title}. A how-to article in the DripFunnel Help Centre.', { title: t(a.t) }) : t(a.intro),
    noindex: a.stub,
  };
}

export default function Page({ ctx, rest = [] }) {
  const { t, href } = ctx;

  if (!rest[0]) {
    const items = ALL_ARTS.map((a) => ({ title: t(a.t), category: t(a.cat), href: href('help/' + a.id) }));
    const categories = (
      <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:14px;')}>
        {HC.map(([cid, ct, cd, arts]) => (
          <div key={cid} style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:6px;')}>
            <h2 style={css('margin:0;font-family:Manrope,sans-serif;font-weight:700;font-size:18px;')}>{t(ct)}</h2>
            <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t(cd)}</span>
            <ul style={css('margin:6px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;')}>
              {arts.map(([id, at]) => (
                <li key={id}>
                  <Link href={href('help/' + id)} style={css('min-height:40px;display:flex;align-items:center;font-size:15px;')}>{t(at)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
    const stuck = (
      <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;')}>
        <span style={css('display:flex;flex-direction:column;gap:4px;')}>
          <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:20px;')}>{t('Still stuck?')}</span>
          <span style={css('font-size:15px;color:var(--muted,#5A6472);')}>{t('Write to our support team. Paid plans also get chat from inside the portal.')}</span>
        </span>
        <Link href={href('contact/support')} className="df-h-primary" style={css('height:44px;padding:0 22px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;font-family:Manrope,sans-serif;font-weight:700;')}>{t('Contact support')}</Link>
      </div>
    );
    return (
      <div data-screen-label="Help centre">
        <HelpSearch
          heading={t('How can we help?')}
          searchLabel={t('Search help articles')}
          placeholder={t('Search, e.g. refund, size chart, GST')}
          items={items}
          resultOne={t('1 article for “{q}”')}
          resultMany={t('{n} articles for “{q}”')}
          noResultsA={t('Nothing matches that yet. Try another word, or')}
          noResultsLink={t('ask our support team')}
          supportHref={href('contact/support')}
          categories={categories}
          stuck={stuck}
        />
      </div>
    );
  }

  const a = getArticle(rest[0]);
  if (!a || rest.length > 1) notFound();
  const jsonCrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('Help centre'), item: absoluteUrl(href('help')) },
      { '@type': 'ListItem', position: 2, name: t(a.cat) },
    ],
  };

  return (
    <>
      <JsonLd data={jsonCrumbs} />
      <article data-screen-label="Help article" style={css('max-width:1240px;margin:0 auto;padding:clamp(32px,6cqw,64px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:40px;align-items:start;')}>
        <div style={css('grid-column:span 2;min-width:min(100%,300px);max-width:720px;display:flex;flex-direction:column;gap:18px;')}>
          <nav aria-label={t('Breadcrumb')} style={css('font-size:14px;display:flex;gap:8px;flex-wrap:wrap;color:var(--muted,#5A6472);')}>
            <Link href={href('help')}>{t('Help centre')}</Link>
            <span aria-hidden="true">/</span>
            <span>{t(a.cat)}</span>
          </nav>
          <h1 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(26px,4.4cqw,42px);line-height:1.1;letter-spacing:-0.03em;margin:0;color:var(--head,#0A2A4A);')}>{t(a.t)}</h1>
          <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t('Updated 1 October 2026')} · {t(a.who)}</span>
          <p style={css('margin:0;font-size:17px;line-height:1.7;')}>{t(a.intro)}</p>
          {/* The original always has this list (empty for unfinished articles); it is kept so the spacing is the same. */}
          <ol aria-hidden={a.steps.length ? undefined : 'true'} style={{ ...css('margin:0;display:flex;flex-direction:column;gap:12px;font-size:16px;line-height:1.65;'), padding: 0, paddingInlineStart: '22px' }}>
              {a.steps.map((x) => (
                <li key={x}>{t(x)}</li>
              ))}
            </ol>
          {a.note ? (
            <div style={css('background:var(--sunk,#F3EDE8);border-radius:12px;padding:16px 18px;font-size:15px;')}>
              <strong>{t('Good to know:')} </strong>
              {t(a.note)}
            </div>
          ) : null}
          {a.stub ? <div style={css('border:1px dashed var(--field,#D7D3CD);border-radius:12px;padding:18px;font-size:15px;color:var(--muted,#5A6472);')}>{t('Placeholder: step-by-step instructions go here.')}</div> : null}
          <Helpful question={t('Did this answer your question?')} yes={t('Yes')} no={t('No')} thanks={t('Thanks for telling us.')} sorry={t('Sorry about that. Contact support and we’ll help directly.')} />
        </div>
        <aside style={css('display:flex;flex-direction:column;gap:14px;')}>
          <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:4px;')}>
            <span style={css('font-family:Manrope,sans-serif;font-weight:700;font-size:16px;padding-bottom:4px;')}>{t('More in {category}', { category: t(a.cat) })}</span>
            {a.more.map((m) => (
              <Link key={m.id} href={href('help/' + m.id)} style={css('min-height:40px;display:flex;align-items:center;font-size:15px;')}>{t(m.t)}</Link>
            ))}
          </div>
          <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:10px;')}>
            <span style={css('font-family:Manrope,sans-serif;font-weight:700;font-size:16px;')}>{t('Need a person?')}</span>
            <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t('Tell us your store name and what you were trying to do.')}</span>
            <Link href={href('contact/support')} className="df-h-outline" style={css('height:44px;border:1px solid var(--outline,#B8541F);border-radius:8px;display:flex;align-items:center;justify-content:center;text-decoration:none;font-family:Manrope,sans-serif;font-weight:700;font-size:14px;color:var(--outline,#B8541F);')}>{t('Contact support')}</Link>
          </div>
        </aside>
      </article>
    </>
  );
}

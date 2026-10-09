// Features page. Copied from the original design (template "Features" and `fsecs` in the script).
// Server component. Only the plan filter in the index at the bottom is a small client island.
import Link from 'next/link';
import { css } from '@/lib/css';
import PlanIndex from '@/components/features/PlanIndex';
import { makeFeatureGroups, PLAN_FILTERS, PLAN_RANK } from '@/content/features-data';
import '@/styles/features.css';

const MONO = "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted,#5A6472);";
const SIDE = 'padding-left:clamp(16px,4cqw,24px);padding-right:clamp(16px,4cqw,24px);';
const H2 = 'font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(28px,4.4cqw,56px);line-height:1.02;letter-spacing:-0.035em;margin:0;color:var(--head,#0A2A4A);';

export default function Page({ ctx }) {
  const { t, href, storeUrl } = ctx;
  const groups = makeFeatureGroups(ctx);
  const all = groups.flatMap((g) => g.items);
  const featCount = all.length;
  const featFree = all.filter((x) => x.free).length;

  // Data for the plan filter island (plain strings and numbers only).
  const plans = PLAN_FILTERS.map(([key, max]) => {
    const label = t(key);
    const line =
      max === null
        ? t('{count} features across {areas} areas.', { count: featCount, areas: groups.length })
        : t('{count} of {total} features are included on {plan}. Greyed items start on a higher plan.', { count: all.filter((x) => PLAN_RANK[x.p] <= max).length, total: featCount, plan: label });
    return { label, max, line };
  });
  const indexGroups = groups.map((g) => ({ n: g.n, label: g.label, items: g.items.map((x) => ({ t: x.t, pl: x.pl, rank: PLAN_RANK[x.p] })) }));

  // "... prices are on the {link}." : the link sits inside the sentence.
  const [introA, introB] = t('The whole list on one page. Pick a plan to see what it includes; prices are on the {link}.', { link: '{link}' }).split('{link}');

  return (
    <>
      <section data-screen-label="Features" style={css(`max-width:1240px;margin:0 auto;${SIDE}padding-top:clamp(32px,6cqw,80px);padding-bottom:clamp(32px,5cqw,56px);display:flex;flex-direction:column;align-items:center;text-align:center;gap:20px;`)}>
        <span style={css(MONO)}>{t('Features')}</span>
        <h1 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(34px,6.6cqw,84px);line-height:1.02;letter-spacing:-0.04em;margin:0;color:var(--head,#0A2A4A);max-width:15ch;')}>{t('Everything a shop needs. Nothing to bolt on.')}</h1>
        <p style={css('margin:0;font-size:clamp(16px,1.7cqw,20px);color:var(--muted,#5A6472);max-width:58ch;')}>
          {t('{count} features across ten parts of running a shop, all in one portal. Each one says which plan it starts on, and every plan has zero fees on your orders.', { count: featCount })}
        </p>
        <div style={css(`display:flex;gap:6px 18px;flex-wrap:wrap;justify-content:center;${MONO}`)}>
          <span>{t('{count} features', { count: featCount })}</span>
          <span aria-hidden="true" style={css('color:#EC844F;')}>●</span>
          <span>{t('{count} on Starter (Free)', { count: featFree })}</span>
          <span aria-hidden="true" style={css('color:#EC844F;')}>●</span>
          <span>{t('5 plans')}</span>
        </div>
      </section>

      <nav className="df-features-nav" aria-label={t('Contents')}>
        <div className="df-features-navrow">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="df-features-navlink">
              <span className="df-features-navnum">{g.n}</span>
              {g.label}
            </a>
          ))}
        </div>
      </nav>

      {groups.map((f) => (
        <section key={f.id} id={f.id} className="df-features-group" style={css(`max-width:1240px;margin:0 auto;${SIDE}padding-top:clamp(44px,8cqw,104px);padding-bottom:clamp(32px,6cqw,72px);display:flex;flex-direction:column;gap:36px;`)}>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:14px 40px;border-top:1px solid var(--text,#14181F);padding-top:20px;')}>
            <div style={css('display:flex;flex-direction:column;gap:10px;')}>
              <span style={css(MONO)}>
                {f.n} — {f.label}
              </span>
              <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{f.plan}</span>
            </div>
            <div style={css('grid-column:span 3;min-width:min(100%,300px);display:flex;flex-direction:column;gap:12px;')}>
              <h2 style={css(`${H2}max-width:20ch;`)}>{f.title}</h2>
              <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);max-width:60ch;')}>{f.lead}</p>
            </div>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:clamp(28px,4cqw,56px);align-items:start;')}>
            <dl style={css('grid-column:span 2;min-width:min(100%,340px);margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:0 32px;')}>
              {f.items.map((x) => (
                <div key={x.t} style={css('padding:16px 0;border-bottom:1px solid var(--border,#E8E2DC);display:flex;flex-direction:column;gap:4px;')}>
                  <dt style={css('display:flex;justify-content:space-between;gap:12px;align-items:baseline;')}>
                    <span style={css('font-family:Manrope,sans-serif;font-weight:700;font-size:17px;line-height:1.3;')}>{x.t}</span>
                    <span style={css(`font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:${x.free ? 'var(--okfg,#1D6B47)' : 'var(--tint-fg,#8F4017)'};white-space:nowrap;flex:none;`)}>{x.pl}</span>
                  </dt>
                  <dd style={css('margin:0;font-size:14px;color:var(--muted,#5A6472);line-height:1.5;')}>{x.d}</dd>
                </div>
              ))}
            </dl>
            <div aria-hidden="true" className="df-features-mock" style={css('background:var(--surface,#FFFFFF);border:1.5px solid var(--text,#14181F);border-radius:12px;overflow:hidden;font-size:14px;')}>
              <div style={css('padding:14px 18px;border-bottom:1px solid var(--border,#E8E2DC);display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;')}>
                <span style={css('font-family:Manrope,sans-serif;font-weight:700;font-size:15px;')}>{f.mockTitle}</span>
                <span style={css('font-size:13px;color:var(--muted,#5A6472);')}>{f.mockSub}</span>
              </div>
              {f.isBars ? (
                <div style={css('padding:20px 18px 12px;display:flex;align-items:flex-end;gap:10px;height:200px;')}>
                  {f.bars.map((b, i) => (
                    <div key={i} style={css('flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end;')}>
                      <span style={css(`width:100%;height:${b.h};background:${b.c};border-radius:4px 4px 0 0;`)}></span>
                      <span style={css('font-size:11px;color:var(--muted,#5A6472);')}>{b.l}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {f.rows.map((r, i) => (
                <div key={i} style={css('display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--border,#E8E2DC);flex-wrap:wrap;')}>
                  <span style={css('flex:1;min-width:150px;display:flex;flex-direction:column;')}>
                    <span style={css('font-weight:600;')}>{r.a}</span>
                    <span style={css('font-size:13px;color:var(--muted,#5A6472);')}>{r.b}</span>
                  </span>
                  <span style={css('font-size:13px;color:var(--text,#14181F);')}>{r.c}</span>
                  {r.pill ? <span style={css(`font-size:12px;font-weight:600;padding:3px 10px;border-radius:12px;background:${r.pbg};color:${r.pfg};`)}>{r.pill}</span> : null}
                </div>
              ))}
              {f.foot ? <div style={css('padding:12px 18px;font-size:13px;color:var(--muted,#5A6472);background:var(--paper,#FDFAF7);')}>{f.foot}</div> : null}
            </div>
          </div>
        </section>
      ))}

      <section style={css(`max-width:1240px;margin:0 auto;${SIDE}padding-top:clamp(32px,6cqw,72px);padding-bottom:clamp(48px,9cqw,120px);display:flex;flex-direction:column;gap:28px;`)}>
        <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:14px 40px;border-top:1px solid var(--text,#14181F);padding-top:20px;')}>
          <span style={css(MONO)}>{t('Index')}</span>
          <div style={css('grid-column:span 3;min-width:min(100%,300px);display:flex;flex-direction:column;gap:12px;')}>
            <h2 style={css(H2)}>{t('Every feature, by plan.')}</h2>
            <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);max-width:60ch;')}>
              {introA}
              <Link href={href('pricing')}>{t('pricing page')}</Link>
              {introB}
            </p>
          </div>
        </div>
        <PlanIndex groups={indexGroups} plans={plans} filterLabel={t('Show features from')} />
      </section>

      <section data-band="" style={css('background:var(--band,#0A2A4A);color:#FFFFFF;')}>
        <div style={css(`max-width:1240px;margin:0 auto;${SIDE}padding-top:clamp(48px,9cqw,120px);padding-bottom:clamp(48px,9cqw,120px);display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;`)}>
          <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(32px,6cqw,76px);letter-spacing:-0.04em;line-height:1;max-width:14ch;')}>{t('Try every feature for 10 days.')}</span>
          <span style={css('font-size:18px;color:#B8C7D6;max-width:52ch;')}>{t('New shops get everything in Business, no credit card. Then pick a plan or stay on Starter for free.')}</span>
          <div style={css('display:flex;gap:20px;align-items:center;flex-wrap:wrap;justify-content:center;')}>
            <a href={storeUrl} className="df-features-cta" style={css('height:52px;padding:0 26px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;font-family:Manrope,sans-serif;font-weight:700;font-size:16px;')}>
              {t('Start free')}
            </a>
            <Link href={href('pricing')} className="df-features-cmp" style={css('min-height:44px;display:flex;align-items:center;color:#F09A6D;font-weight:500;')}>
              {t('Compare plans')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function meta({ ctx }) {
  const { t } = ctx;
  return {
    title: `${t('Features')} | DripFunnel`,
    description: t('Catalogue, orders and shipping, payments and tax, suppliers and selling abroad, all in one portal.'),
  };
}

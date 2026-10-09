import Link from 'next/link';
import { css } from '@/lib/css';
import '@/styles/partners.css';

// Partners page. Copied from the original design (template block "Partners" and its data pStats, pDomains, pBlocks, pStatement, pSteps).
// The partner statement is an "Example figures" picture in the original with fixed US dollar strings; they stay as in the original in every region.

const STATS = [['Stores', '86'], ['Live', '78'], ['Plans', '4']];
const DOMAINS = [['Portal', 'store.northstar.com'], ['Shops', '*.shops.northstar.com'], ['Emails from', 'mail.northstar.com']];
const BLOCKS = [
  ['Your brand everywhere', 'Merchants and their shoppers see your name, not ours.', ['Your logo, colours and font on the portal', 'Shops on your own domain', 'Every email sent from your own address']],
  ['Your plans, your prices', 'Build plans from DripFunnel’s features and set your own prices in each currency.', ['Choose what each plan includes and its limits', 'Set prices per currency, monthly and yearly', 'Compare your plans side by side before publishing']],
  ['Many stores, one account', 'Create and run every client’s store from one partner console.', ['See every store’s plan, status and payments', 'Help a merchant by signing in as them, with a full activity log', 'Your team with Owner, Admin, Support, Finance and Read-only roles']],
  ['Checked before you go live', 'We review every partner before their first shop opens.', ['Branding, domains, plans and legal pages checked', 'We can set up with you in a guided session', 'Sent back with clear notes if something is missing']],
];
const STATEMENT = [['Collected from your 78 stores', '$4,261.40', 400], ['DripFunnel wholesale fee', '−$1,549.00', 400], ['Adjustments', '$0.00', 400], ['Paid to you on 1 September', '$2,712.40', 700]];
const STEPS = [
  ['Talk to us', 'Tell us how many stores and where.'],
  ['Agree terms', 'Your wholesale rate and contract.'],
  ['Set up', 'Brand, domains, plans and legal pages, on your own or with us.'],
  ['Submit', 'Send your setup for review.'],
  ['Approval', 'We check it and approve, or send it back with notes.'],
  ['Go live', 'Open your first stores under your brand.'],
];

const MONO = "font-family:'IBM Plex Mono',monospace;";
const MAN = 'font-family:Manrope,sans-serif;';

export default function Page({ ctx }) {
  const { t, href } = ctx;
  const contact = href('contact/partners');
  return (
    <>
      <section data-band="" style={css('background:var(--band,#0A2A4A);color:#FFFFFF;')}>
        <div style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,112px) clamp(16px,4cqw,24px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5cqw,64px);align-items:center;')}>
          <div style={css('display:flex;flex-direction:column;gap:20px;')}>
            <div style={css('display:flex;align-items:center;gap:12px;')}>
              <span aria-hidden="true" style={css('width:32px;height:2px;background:#EC844F;display:block;')}></span>
              <span style={css(MONO + 'font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#B8C7D6;')}>{t('Partners · white-label')}</span>
            </div>
            <h1 style={css(MAN + 'font-weight:800;font-size:clamp(32px,6cqw,64px);line-height:1.03;letter-spacing:-0.035em;margin:0;')}>{t('Run DripFunnel under your own brand.')}</h1>
            <p style={css('margin:0;font-size:18px;color:#B8C7D6;max-width:52ch;')}>{t('For agencies and groups that run shops for others. Your name on the portal, the shops and every email. Your plans and your prices. Many stores under one account.')}</p>
            <div style={css('display:flex;gap:20px;align-items:center;flex-wrap:wrap;')}>
              <Link href={contact} className="df-partners-cta" style={css('height:48px;padding:0 24px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;' + MAN + 'font-weight:700;font-size:16px;')}>{t('Talk to us')}</Link>
              <a href="mailto:sales@dripfunnel.com" className="df-partners-mail" style={css('min-height:44px;display:flex;align-items:center;color:#F09A6D;font-weight:500;')}>sales@dripfunnel.com</a>
            </div>
          </div>
          <div aria-hidden="true" style={css('background:#FFFFFF;color:#14181F;border-radius:12px;overflow:hidden;border:1px solid #1C3F60;')}>
            <div style={css('height:48px;padding:0 16px;display:flex;align-items:center;gap:10px;background:#1F4B3A;color:#FFFFFF;')}>
              <span style={css('width:24px;height:24px;border-radius:6px;background:#F4C95D;')}></span>
              <strong style={css(MAN + 'font-size:14px;')}>Northstar Shops</strong>
              <span style={css('margin-left:auto;' + MONO + 'font-size:11px;opacity:0.85;')}>store.northstar.com</span>
            </div>
            <div style={css('padding:18px;display:flex;flex-direction:column;gap:10px;')}>
              <span style={css(MONO + 'font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#5A6472;')}>{t('Example partner · your brand here')}</span>
              <div style={css('display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;')}>
                {STATS.map(([l, v]) => (
                  <div key={l} style={css('border:1px solid #E8E2DC;border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;')}>
                    <span style={css('font-size:11px;color:#5A6472;')}>{t(l)}</span>
                    <span style={css(MAN + 'font-weight:800;font-size:18px;')}>{v}</span>
                  </div>
                ))}
              </div>
              {DOMAINS.map(([l, v]) => (
                <div key={l} style={css('display:flex;justify-content:space-between;gap:8px;padding:9px 0;border-top:1px solid #E8E2DC;font-size:13px;flex-wrap:wrap;')}>
                  <span style={css('color:#5A6472;')}>{t(l)}</span>
                  <span dir="ltr" style={css(MONO + 'font-size:12px;')}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,104px) clamp(16px,4cqw,24px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:14px;')}>
        {BLOCKS.map(([title, desc, pts], i) => (
          <div key={title} style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:24px;display:flex;flex-direction:column;gap:12px;')}>
            <span style={css(MONO + 'font-size:12px;letter-spacing:0.12em;color:var(--link,#B8541F);')}>{'0' + (i + 1)}</span>
            <h2 style={css('margin:0;' + MAN + 'font-weight:800;font-size:22px;letter-spacing:-0.02em;color:var(--head,#0A2A4A);')}>{t(title)}</h2>
            <span style={css('font-size:15px;color:var(--muted,#5A6472);')}>{t(desc)}</span>
            <ul style={css('margin:0;padding:0;list-style:none;display:flex;flex-direction:column;')}>
              {pts.map((p) => (
                <li key={p} style={css('padding:9px 0;border-top:1px solid var(--border,#E8E2DC);font-size:14px;')}>{t(p)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={css('background:var(--sunk,#F3EDE8);')}>
        <div style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,96px) clamp(16px,4cqw,24px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(28px,5cqw,56px);align-items:start;')}>
          <div style={css('display:flex;flex-direction:column;gap:14px;')}>
            <h2 style={css(MAN + 'font-weight:800;font-size:clamp(24px,4cqw,42px);line-height:1.08;letter-spacing:-0.03em;margin:0;color:var(--head,#0A2A4A);')}>{t('How the money works')}</h2>
            <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);')}>{t('Your merchants pay you, at the prices you set. DripFunnel keeps a wholesale fee for each store and pays you the rest every month, with a statement that shows every line.')}</p>
            <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t('Wholesale rates depend on volume. Talk to us for yours.')}</span>
          </div>
          <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;overflow:hidden;')}>
            <div style={css('padding:14px 18px;border-bottom:1px solid var(--border,#E8E2DC);display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;')}>
              <span style={css(MAN + 'font-weight:700;')}>{t('Monthly payout statement')}</span>
              <span style={css(MONO + 'font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);')}>{t('Example figures')}</span>
            </div>
            {STATEMENT.map(([l, v, w]) => (
              <div key={l} style={css('display:flex;justify-content:space-between;gap:12px;padding:12px 18px;border-bottom:1px solid var(--border,#E8E2DC);font-size:15px;font-weight:' + w + ';')}>
                <span>{t(l)}</span>
                <span dir="ltr" style={css('font-variant-numeric:tabular-nums;')}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,104px) clamp(16px,4cqw,24px);display:flex;flex-direction:column;gap:28px;')}>
        <div style={css('display:flex;flex-direction:column;gap:12px;max-width:720px;')}>
          <h2 style={css(MAN + 'font-weight:800;font-size:clamp(24px,4cqw,42px);line-height:1.08;letter-spacing:-0.03em;margin:0;color:var(--head,#0A2A4A);')}>{t('From first call to live')}</h2>
          <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);')}>{t('Every partner is checked before going live, so shops under your brand start on solid ground.')}</p>
        </div>
        <ol style={css('margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:14px;')}>
          {STEPS.map(([title, desc], i) => (
            <li key={title} style={css('border-top:2px solid #EC844F;padding-top:14px;display:flex;flex-direction:column;gap:6px;')}>
              <span style={css(MONO + 'font-size:12px;color:var(--link,#B8541F);')}>{'0' + (i + 1)}</span>
              <span style={css(MAN + 'font-weight:700;font-size:17px;')}>{t(title)}</span>
              <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t(desc)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section data-band="" style={css('background:var(--band,#0A2A4A);color:#FFFFFF;')}>
        <div style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,7cqw,80px) clamp(16px,4cqw,24px);display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;')}>
          <div style={css('display:flex;flex-direction:column;gap:8px;max-width:620px;')}>
            <span style={css(MAN + 'font-weight:800;font-size:clamp(22px,3.6cqw,36px);letter-spacing:-0.025em;')}>{t('Tell us about the shops you run.')}</span>
            <span style={css('font-size:16px;color:#B8C7D6;')}>{t('How many stores, which countries, and what you’d like to charge. We’ll come back with a wholesale rate and a plan to go live.')}</span>
          </div>
          <Link href={contact} className="df-partners-cta" style={css('height:48px;padding:0 24px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;' + MAN + 'font-weight:700;')}>{t('Talk to us')}</Link>
        </div>
      </section>
    </>
  );
}

export function meta({ ctx }) {
  const { t } = ctx;
  return {
    title: `${t('Partners')} | DripFunnel`,
    description: t('Run shops for clients under your own brand. Talk to us about the DripFunnel partner programme.'),
  };
}

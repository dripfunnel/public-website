import Link from 'next/link';
import { css } from '@/lib/css';
import ContactForm from '@/components/contact/ContactForm';
import '@/styles/contact.css';

// Contact and demo page. Copied from the original design (template block "Contact" and its data T, fld, submit, countries, sentTitle/sentBody).
// The address chooses the first topic of the form: /contact and /contact/demo = demo, /contact/sales, /contact/partners, /contact/support.
// The form itself is a small client component (components/contact/ContactForm.jsx). Nothing is sent yet: see components/contact/submit.js.

const TOPIC_KEYS = ['demo', 'sales', 'partners', 'support'];

// [chip label, button label, message label, message placeholder]
const TOPICS = {
  demo: ['Book a demo', 'Book my demo', 'Anything you’d like us to cover? (optional)', 'e.g. We sell in India and want to start shipping to the UAE'],
  sales: ['Sales question', 'Send to sales', 'Your question', 'e.g. Can you build our storefront for us?'],
  partners: ['Partners', 'Talk to us', 'Tell us about the shops you run', 'e.g. We run 40 shops for clients in Germany and want them under our brand'],
  support: ['Support', 'Send to support', 'What’s happening?', 'e.g. My courier tracking numbers aren’t showing on orders'],
};

const COUNTRIES = ['India', 'Germany', 'United States', 'United Kingdom', 'United Arab Emirates', 'France', 'Netherlands', 'Other'];

const MONO = "font-family:'IBM Plex Mono',monospace;";
const MAN = 'font-family:Manrope,sans-serif;';

export default function Page({ ctx, rest }) {
  const { t, href, region, locale, content } = ctx;
  const topic = TOPIC_KEYS.includes(rest?.[0]) ? rest[0] : 'demo';

  const topics = TOPIC_KEYS.map((key) => {
    const [label, submit, msgLabel, msgPh] = TOPICS[key];
    return { key, label: t(label), submit: t(submit), msgLabel: t(msgLabel), msgPh: t(msgPh) };
  });
  const text = {
    legend: t('What can we help with?'),
    name: { label: t('Your name'), type: 'text', ph: t('e.g. Priya Sharma'), ac: 'name' },
    email: { label: t('Work email'), type: 'email', ph: t('you@shop.com'), ac: 'email' },
    company: { label: t('Shop or company (optional)'), type: 'text', ph: t('e.g. {store}', { store: content.store }), ac: 'organization' },
    country: t('Country'),
    countryPh: t('Choose a country'),
    errName: t('Enter your name.'),
    errEmail: t('Enter a full email address, like you@shop.com.'),
    errMsg: t('Tell us a little about what you need.'),
    sentTitle: t('Thanks, {name}.', { name: '{name}' }),
    sentTitleFallback: t('Thanks, we’ve got it.'),
    sentDemo: t('We’ll email {email} with times for your demo.', { email: '{email}' }),
    sentSupport: t('Our support team will reply to {email}. If it’s about a live order, include the order number when we write back.', { email: '{email}' }),
    sentSales: t('We’ll reply to {email} from sales@dripfunnel.com.', { email: '{email}' }),
    again: t('Send another message'),
    noteBefore: t('We use these details only to reply to you. See our'),
    privacyLabel: t('Privacy Policy'),
    privacyHref: href('privacy'),
    noteAfter: '.',
  };
  const countries = COUNTRIES.map((c) => ({ value: c, label: t(c) }));

  return (
    <section data-screen-label="Contact" className="df-contact" style={css('max-width:1240px;margin:0 auto;padding:clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(32px,5cqw,64px);align-items:start;')}>
      <div style={css('display:flex;flex-direction:column;gap:18px;')}>
        <div style={css('display:flex;align-items:center;gap:12px;')}>
          <span aria-hidden="true" style={css('width:32px;height:2px;background:#EC844F;display:block;')}></span>
          <span style={css(MONO + 'font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted,#5A6472);')}>{t('Contact')}</span>
        </div>
        <h1 style={css(MAN + 'font-weight:800;font-size:clamp(30px,5cqw,54px);line-height:1.05;letter-spacing:-0.035em;margin:0;color:var(--head,#0A2A4A);')}>{t('Book a demo or ask us anything.')}</h1>
        <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);')}>{t('A demo is a 30-minute video call. We build a shop from your description while you watch, then answer your questions about plans, selling abroad or moving from another platform.')}</p>
        <dl style={css('margin:0;display:flex;flex-direction:column;border-top:1px solid var(--border,#E8E2DC);')}>
          <div style={css('padding:14px 0;border-bottom:1px solid var(--border,#E8E2DC);display:flex;flex-direction:column;gap:2px;')}>
            <dt style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t('Sales and partners')}</dt>
            <dd style={css('margin:0;')}>
              <a href="mailto:sales@dripfunnel.com" style={css('font-size:17px;font-weight:500;')}>
                sales@dripfunnel.com
              </a>
            </dd>
          </div>
          <div style={css('padding:14px 0;border-bottom:1px solid var(--border,#E8E2DC);display:flex;flex-direction:column;gap:2px;')}>
            <dt style={css('font-size:14px;color:var(--muted,#5A6472);')}>{t('Help with your shop')}</dt>
            <dd style={css('margin:0;')}>
              <a href="mailto:support@dripfunnel.com" style={css('font-size:17px;font-weight:500;')}>
                support@dripfunnel.com
              </a>{' '}
              · {t('or the')} <Link href={href('help')}>{t('help centre')}</Link>
            </dd>
          </div>
        </dl>
      </div>
      <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:16px;padding:clamp(20px,3cqw,32px);')}>
        <ContactForm initialTopic={topic} region={region} language={locale} topics={topics} countries={countries} text={text} />
      </div>
    </section>
  );
}

export function meta({ ctx }) {
  const { t } = ctx;
  return {
    title: `${t('Contact and Book a Demo')} | DripFunnel`,
    description: t('Talk to sales, book a demo, become a partner or get support.'),
  };
}

export function paths() {
  return [[], ['demo'], ['sales'], ['partners'], ['support']];
}

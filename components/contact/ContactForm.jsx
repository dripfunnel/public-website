'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { css } from '@/lib/css';
import { submitContactForm } from './submit';

// The contact form (the only interactive part of the Contact page).
// The server page renders it with the topic chosen by the address and fills in every text, already translated.
// Props are plain data only: { initialTopic, region, language, topics, countries, text }.
//   topics:    [{ key, label, submit, msgLabel, msgPh }] for demo, sales, partners, support (all texts, so chips switch without a request)
//   countries: [{ value, label }] value is what is sent (English name), label is shown
// Behaviour is the same as the original design: name required, email format checked, message required unless the topic is "demo",
// then a "Thanks" panel. What happens on submit is in ./submit.js (nothing yet: there is no back end).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERR = '2px solid #00325F'; // error border colour, as in the original
const OK = '1px solid var(--field,#D7D3CD)';

const S = {
  form: css('display:flex;flex-direction:column;gap:18px;'),
  fieldset: css('border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;'),
  legend: css('font-size:14px;font-weight:600;padding:0 0 8px;'),
  chips: css('display:flex;flex-wrap:wrap;gap:8px;'),
  label: css('display:flex;flex-direction:column;gap:8px;font-size:14px;font-weight:600;'),
  input: 'height:48px;padding:0 14px;border-radius:8px;background:var(--surface,#FFFFFF);color:var(--text,#14181F);font-family:Inter,sans-serif;font-size:16px;font-weight:400;',
  error: css('font-size:14px;font-weight:400;color:var(--link,#B8541F);'),
  select: css('height:48px;padding:0 12px;border:1px solid var(--field,#D7D3CD);border-radius:8px;background:var(--surface,#FFFFFF);color:var(--text,#14181F);font-family:Inter,sans-serif;font-size:16px;font-weight:400;'),
  textarea: 'padding:12px 14px;border-radius:8px;background:var(--surface,#FFFFFF);color:var(--text,#14181F);font-family:Inter,sans-serif;font-size:16px;font-weight:400;line-height:1.6;resize:vertical;',
  note: css('font-size:13px;color:var(--muted,#5A6472);'),
  submit: css('height:48px;border:0;border-radius:8px;background:#EC844F;color:#FFFFFF;font-family:Manrope,sans-serif;font-weight:700;font-size:16px;cursor:pointer;'),
  sent: css('display:flex;flex-direction:column;gap:12px;padding:12px 0;'),
  tick: css('width:44px;height:44px;border-radius:50%;background:var(--okbg,#EEF7F2);color:var(--okfg,#1D6B47);display:flex;align-items:center;justify-content:center;'),
  sentTitle: css('font-family:Manrope,sans-serif;font-weight:800;font-size:24px;'),
  sentBody: css('font-size:16px;color:var(--muted,#5A6472);'),
  again: css('align-self:flex-start;height:44px;padding:0;border:0;background:transparent;color:var(--link,#B8541F);font-family:Inter,sans-serif;font-size:15px;font-weight:500;cursor:pointer;'),
};

function chipStyle(on) {
  return css(
    'min-height:44px;padding:0 14px;border-radius:8px;font-family:Inter,sans-serif;font-size:14px;font-weight:500;cursor:pointer;' +
      `border:1px solid ${on ? 'var(--head,#0A2A4A)' : 'var(--field,#D7D3CD)'};background:${on ? 'var(--head,#0A2A4A)' : 'transparent'};color:${on ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)'};`
  );
}

// Puts the visitor's email into a sentence that has {email} in it. The email is isolated so it stays left-to-right in Arabic.
function withEmail(template, email) {
  const [a, b] = template.split('{email}');
  if (b === undefined) return template;
  return (
    <>
      {a}
      <bdi dir="ltr">{email}</bdi>
      {b}
    </>
  );
}

export default function ContactForm({ initialTopic, region, language, topics, countries, text }) {
  const uid = useId();
  const [form, setForm] = useState({ topic: initialTopic, name: '', email: '', company: '', country: '', msg: '' });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);

  const tp = topics.find((x) => x.key === form.topic) || topics[0];
  const needMsg = form.topic !== 'demo';

  const setF = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrs((e) => ({ ...e, [k]: '' }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = text.errName;
    if (!EMAIL_RE.test(form.email.trim())) er.email = text.errEmail;
    if (needMsg && !form.msg.trim()) er.msg = text.errMsg;
    setErrs(er);
    if (Object.keys(er).length) return;
    // TODO: nothing is sent yet. See ./submit.js.
    submitContactForm({ topic: form.topic, name: form.name.trim(), email: form.email.trim(), company: form.company.trim(), country: form.country, message: form.msg.trim(), region, language });
    setSent(true);
  };

  if (sent) {
    const first = form.name.trim().split(' ')[0];
    const body = form.topic === 'demo' ? text.sentDemo : form.topic === 'support' ? text.sentSupport : text.sentSales;
    return (
      <div role="status" style={S.sent}>
        <span aria-hidden="true" style={S.tick}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M5 12l5 5L20 7"></path>
          </svg>
        </span>
        <span style={S.sentTitle}>{first ? text.sentTitle.replace('{name}', first) : text.sentTitleFallback}</span>
        <span style={S.sentBody}>{withEmail(body, form.email)}</span>
        <button type="button" onClick={() => { setSent(false); setForm((f) => ({ ...f, msg: '' })); }} style={S.again}>
          {text.again}
        </button>
      </div>
    );
  }

  const field = (k, f) => {
    const err = errs[k];
    const id = `${uid}-${k}`;
    return (
      <label key={k} style={S.label}>
        {f.label}
        <input type={f.type} value={form[k]} onChange={(e) => setF(k, e.target.value)} placeholder={f.ph} autoComplete={f.ac} aria-invalid={err ? 'true' : 'false'} aria-describedby={err ? id : undefined} style={css(S.input + `border:${err ? ERR : OK};`)} />
        {err ? (
          <span id={id} role="alert" style={S.error}>
            {err}
          </span>
        ) : null}
      </label>
    );
  };

  return (
    <form onSubmit={submit} noValidate style={S.form}>
      <fieldset style={S.fieldset}>
        <legend style={S.legend}>{text.legend}</legend>
        <div style={S.chips}>
          {topics.map((x) => (
            <button
              key={x.key}
              type="button"
              aria-pressed={form.topic === x.key ? 'true' : 'false'}
              onClick={() => {
                setForm((f) => ({ ...f, topic: x.key }));
                setErrs({});
              }}
              style={chipStyle(form.topic === x.key)}
            >
              {x.label}
            </button>
          ))}
        </div>
      </fieldset>
      {field('name', text.name)}
      {field('email', text.email)}
      {field('company', text.company)}
      <label style={S.label}>
        {text.country}
        <select value={form.country} onChange={(e) => setF('country', e.target.value)} style={S.select}>
          <option value="">{text.countryPh}</option>
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label style={S.label}>
        {tp.msgLabel}
        <textarea rows={4} value={form.msg} onChange={(e) => setF('msg', e.target.value)} placeholder={tp.msgPh} aria-invalid={errs.msg ? 'true' : 'false'} aria-describedby={errs.msg ? `${uid}-msg` : undefined} style={css(S.textarea + `border:${errs.msg ? ERR : OK};`)}></textarea>
        {errs.msg ? (
          <span id={`${uid}-msg`} role="alert" style={S.error}>
            {errs.msg}
          </span>
        ) : null}
      </label>
      <span style={S.note}>
        {text.noteBefore} <Link href={text.privacyHref}>{text.privacyLabel}</Link>
        {text.noteAfter}
      </span>
      <button type="submit" className="df-h-primary" style={S.submit}>
        {tp.submit}
      </button>
    </form>
  );
}

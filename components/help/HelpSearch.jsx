'use client';

import { useState } from 'react';
import Link from 'next/link';

// The help centre search box and what sits under it. With no search text it shows `categories` (built on the server, so the page HTML has every article);
// with search text it shows the matching articles instead. `stuck` (the "Still stuck?" card) is always shown.
// Props: texts and a list of articles as plain data: items [{ title, category, href }].
export default function HelpSearch({ heading, searchLabel, placeholder, items, resultOne, resultMany, noResultsA, noResultsLink, supportHref, categories, stuck }) {
  const [value, setValue] = useState('');
  const raw = value.trim();
  const q = raw.toLowerCase();
  const results = q ? items.filter((a) => (a.title + ' ' + a.category).toLowerCase().includes(q)) : [];
  const line = (results.length === 1 ? resultOne : resultMany).replace('{n}', String(results.length)).replace('{q}', raw);
  return (
    <>
      <section style={{ background: 'var(--sunk,#F3EDE8)' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: 'clamp(40px,7cqw,88px) clamp(16px,4cqw,24px)', display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 'clamp(30px,5cqw,52px)', lineHeight: 1.05, letterSpacing: '-0.035em', margin: 0, color: 'var(--head,#0A2A4A)' }}>{heading}</h1>
          <label style={{ width: '100%', position: 'relative', display: 'block' }}>
            <span className="df-help-sr">{searchLabel}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" style={{ position: 'absolute', insetInlineStart: '16px', top: '16px', color: 'var(--muted,#5A6472)' }}>
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M20 20l-4-4"></path>
            </svg>
            <input type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} style={{ width: '100%', height: '52px', paddingInlineStart: '46px', paddingInlineEnd: '16px', border: '1px solid var(--field,#D7D3CD)', borderRadius: '10px', background: 'var(--surface,#FFFFFF)', color: 'var(--text,#14181F)', fontFamily: 'Inter,sans-serif', fontSize: '16px' }} />
          </label>
        </div>
      </section>
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(32px,6cqw,72px) clamp(16px,4cqw,24px)', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {q ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span role="status" style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>{line}</span>
            {results.map((a) => (
              <Link key={a.href} href={a.href} className="df-help-card" style={{ background: 'var(--surface,#FFFFFF)', border: '1px solid var(--border,#E8E2DC)', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '2px', textDecoration: 'none', color: 'var(--text,#14181F)' }}>
                <span style={{ fontWeight: 600, fontSize: '16px' }}>{a.title}</span>
                <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>{a.category}</span>
              </Link>
            ))}
            {results.length === 0 ? (
              <div style={{ border: '1px solid var(--border,#E8E2DC)', borderRadius: '12px', padding: '20px', fontSize: '15px' }}>
                {noResultsA} <Link href={supportHref}>{noResultsLink}</Link>.
              </div>
            ) : null}
          </div>
        ) : (
          categories
        )}
        {stuck}
      </section>
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

// Blog topic chips and the grid of articles. Starts on "All" so the page HTML lists every article.
// Props are plain data only: cats [{ id, label }], posts [{ id, cat (topic id), catLabel, href, title, ex, meta }].
export default function BlogList({ topicsLabel, allLabel, coverLabel, cats, posts }) {
  const [cat, setCat] = useState('All');
  const chips = [{ id: 'All', label: allLabel }, ...cats];
  const shown = posts.filter((p) => cat === 'All' || p.cat === cat);
  return (
    <>
      <div role="group" aria-label={topicsLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {chips.map((c) => {
          const on = cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              aria-pressed={on ? 'true' : 'false'}
              style={{ minHeight: '44px', padding: '0 16px', border: `1px solid ${on ? 'var(--head,#0A2A4A)' : 'var(--border,#E8E2DC)'}`, borderRadius: '22px', background: on ? 'var(--head,#0A2A4A)' : 'transparent', color: on ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)', fontFamily: 'Inter,sans-serif', fontSize: '14px', cursor: 'pointer' }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))', gap: '18px' }}>
        {shown.map((p) => (
          <Link key={p.id} href={p.href} className="df-blog-card" style={{ background: 'var(--surface,#FFFFFF)', border: '1px solid var(--border,#E8E2DC)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'var(--text,#14181F)' }}>
            <span style={{ aspectRatio: '16/9', background: 'var(--sunk,#F3EDE8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted,#5A6472)' }}>{coverLabel}</span>
            <span style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tint-fg,#8F4017)' }}>{p.catLabel}</span>
              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: '19px', lineHeight: 1.3 }}>{p.title}</span>
              <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)', flex: 1 }}>{p.ex}</span>
              <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>{p.meta}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

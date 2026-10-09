'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Flag from '@/components/ui/Flag';

// The region (and language) drop-down in the header, after the theme icon.
// Choosing a region opens the same page in that region (and its currency). In the UAE the visitor can also pick English or Arabic.
// The links are always in the page (hidden while closed) so search engines and visitors without scripts can still follow them.
export default function RegionMenu({ label, current, regions, languageTitle, languages }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const cur = regions.find((r) => r.code === current);
  const item = (on) => ({ minHeight: '44px', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: on ? 'var(--link,#B8541F)' : 'var(--text,#14181F)', fontWeight: on ? 700 : 500, fontSize: '15px' });

  return (
    <div ref={box} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        aria-label={`${label}: ${cur ? cur.name : ''}`}
        className="df-h-sunk df-region-btn"
        style={{ height: '44px', padding: '0 10px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border,#E8E2DC)', borderRadius: '8px', background: 'transparent', color: 'var(--text,#14181F)', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: '14px', letterSpacing: '0.02em' }}
      >
        <Flag code={current} />
        <span>{current.toUpperCase()}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </button>
      <div hidden={!open} role="menu" style={{ position: 'absolute', top: '52px', insetInlineEnd: 0, minWidth: '290px', background: 'var(--surface,#FFFFFF)', border: '1px solid var(--border,#E8E2DC)', borderRadius: '12px', boxShadow: '0 16px 40px rgba(10,42,74,0.16)', padding: '6px', display: open ? 'flex' : 'none', flexDirection: 'column', zIndex: 40 }}>
        {regions.map((r) => (
          <Link key={r.code} role="menuitem" href={r.href} aria-current={r.code === current ? 'true' : undefined} onClick={() => setOpen(false)} className="df-h-sunk" style={item(r.code === current)}>
            <Flag code={r.code} />
            <span style={{ flex: 1 }}>{r.name}</span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: 'var(--muted,#5A6472)', fontWeight: 400 }}>{r.currency}</span>
          </Link>
        ))}
        {languages.length > 1 ? (
          <>
            <span style={{ margin: '6px 12px 2px', paddingTop: '10px', borderTop: '1px solid var(--border,#E8E2DC)', fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted,#5A6472)' }}>{languageTitle}</span>
            {languages.map((l) => (
              <Link key={l.code} role="menuitem" href={l.href} hrefLang={l.code} lang={l.code} aria-current={l.current ? 'true' : undefined} onClick={() => setOpen(false)} className="df-h-sunk" style={item(l.current)}>
                {l.label}
              </Link>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

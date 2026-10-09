'use client';

import { useId, useState } from 'react';

// Questions and answers. Every answer is in the page HTML (hidden until opened) so search engines can read it.
// items: [{ q, a }]. One answer is open at a time; none at first, as in the original.
export default function Faq({ items }) {
  const [open, setOpen] = useState(-1);
  const id = useId();
  return (
    <div style={{ borderTop: '1px solid var(--border,#E8E2DC)' }}>
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={i} style={{ borderBottom: '1px solid var(--border,#E8E2DC)' }}>
            <h3 style={{ margin: 0, font: 'inherit', display: 'flex' }}>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={on ? 'true' : 'false'}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                style={{ width: '100%', minHeight: '60px', padding: '14px 0', border: 0, background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', textAlign: 'start', cursor: 'pointer', color: 'var(--text,#14181F)', fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: '17px', lineHeight: 'normal' }}
              >
                {f.q}
                <span aria-hidden="true" style={{ fontSize: '22px', color: 'var(--link,#B8541F)', flex: 'none' }}>{on ? '−' : '+'}</span>
              </button>
            </h3>
            <p id={`${id}-a${i}`} hidden={!on} style={{ margin: 0, padding: '0 0 18px', fontSize: '15px', color: 'var(--muted,#5A6472)', lineHeight: 1.65, maxWidth: '68ch' }}>
              {f.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}

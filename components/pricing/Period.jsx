'use client';

import { createContext, useContext, useState } from 'react';

// Monthly / Yearly switch. The provider holds the choice (default: yearly, as in the original); the toggle
// changes it and each plan price block shows the matching texts. Both sets of texts are prepared on the server.
const PeriodContext = createContext({ period: 'year', setPeriod: () => {} });

export function PeriodProvider({ children }) {
  const [period, setPeriod] = useState('year');
  return <PeriodContext.Provider value={{ period, setPeriod }}>{children}</PeriodContext.Provider>;
}

// options: [{ key: 'month', label, tag }, { key: 'year', label, tag }]
export function PeriodToggle({ label, options }) {
  const { period, setPeriod } = useContext(PeriodContext);
  return (
    <div role="group" aria-label={label} style={{ display: 'flex', gap: '4px', padding: '4px', border: '1px solid var(--border,#E8E2DC)', borderRadius: '10px', background: 'var(--surface,#FFFFFF)' }}>
      {options.map((o) => {
        const on = period === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => setPeriod(o.key)}
            aria-pressed={on ? 'true' : 'false'}
            style={{ height: '44px', padding: '0 16px', border: 0, borderRadius: '8px', background: on ? 'var(--head,#0A2A4A)' : 'transparent', color: on ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)', fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: '14px', lineHeight: 'normal', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {o.label}
            {o.tag ? <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', background: 'var(--okbg,#EEF7F2)', color: 'var(--okfg,#1D6B47)' }}>{o.tag}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

// The price, "/month" and note of a paid plan. month / year: { price, per, note } already formatted and translated.
export function PlanPrice({ month, year, sub }) {
  const { period } = useContext(PeriodContext);
  const p = period === 'year' ? year : month;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: '32px', letterSpacing: '-0.03em' }}>{p.price}</span>
        <span style={{ fontSize: '14px', color: sub }}>{p.per}</span>
      </span>
      <span style={{ fontSize: '13px', color: sub, minHeight: '40px' }}>{p.note}</span>
    </div>
  );
}

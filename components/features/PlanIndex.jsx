'use client';
// "Every feature, by plan": the plan filter buttons, the list of all features and the status line.
// The first state (All) is already in the static HTML. Choosing a plan only greys out the features that start on a higher plan.
// Props are plain data. Every text is translated on the server before it gets here.
//   groups: [{ n, label, items: [{ t, pl, rank }] }]   rank = 0 for "All plans", 1 Growth, 2 Growth Pro, 3 Business
//   plans:  [{ label, max, line }]                      max = highest plan rank included (null = no filter), line = status text
import { useState } from 'react';
import { css } from '@/lib/css';

export default function PlanIndex({ groups, plans, filterLabel }) {
  const [sel, setSel] = useState(0);
  const max = plans[sel].max;
  return (
    <>
      <div role="group" aria-label={filterLabel} style={css('display:flex;flex-wrap:wrap;gap:8px;')}>
        {plans.map((p, i) => {
          const on = i === sel;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={on ? 'true' : 'false'}
              style={{
                minHeight: '44px',
                padding: '0 16px',
                border: '1px solid ' + (on ? 'var(--head,#0A2A4A)' : 'var(--field,#D7D3CD)'),
                borderRadius: '8px',
                background: on ? 'var(--head,#0A2A4A)' : 'transparent',
                color: on ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)',
                fontFamily: 'Inter,sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 'normal',
                cursor: 'pointer',
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="df-features-cols">
        {groups.map((g) => (
          <div key={g.n} style={css('break-inside:avoid;padding-bottom:22px;display:flex;flex-direction:column;')}>
            <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted,#5A6472);padding-bottom:8px;border-bottom:1px solid var(--text,#14181F);")}>
              {g.n} — {g.label}
            </span>
            {g.items.map((x) => {
              const inPlan = max === null || x.rank <= max;
              return (
                <span key={x.t} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '9px 0', borderBottom: '1px solid var(--border,#E8E2DC)', fontSize: '15px', color: inPlan ? 'var(--text,#14181F)' : 'var(--muted,#5A6472)' }}>
                  <span>{x.t}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: inPlan ? (x.rank === 0 ? 'var(--okfg,#1D6B47)' : 'var(--tint-fg,#8F4017)') : 'var(--field,#D7D3CD)', whiteSpace: 'nowrap' }}>{x.pl}</span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <span role="status" style={css('font-size:14px;color:var(--muted,#5A6472);')}>
        {plans[sel].line}
      </span>
    </>
  );
}

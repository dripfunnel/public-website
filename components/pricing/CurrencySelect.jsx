'use client';

import { useRouter } from 'next/navigation';

// The currency picker next to the Monthly / Yearly switch. The region decides the currency, so choosing another
// currency opens the same page of that region. options: [{ value: region code, label: '₹ INR', href }].
export default function CurrencySelect({ label, options, current }) {
  const router = useRouter();
  return (
    <select
      value={current}
      aria-label={label}
      onChange={(e) => {
        const o = options.find((x) => x.value === e.target.value);
        if (o) router.push(o.href);
      }}
      style={{ height: '52px', border: '1px solid var(--border,#E8E2DC)', borderRadius: '10px', background: 'var(--surface,#FFFFFF)', padding: '0 12px', fontFamily: 'Inter,sans-serif', fontSize: '15px', color: 'var(--text,#14181F)' }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

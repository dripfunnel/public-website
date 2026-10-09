'use client';

import { useRouter } from 'next/navigation';

// A drop-down in the footer that moves the visitor to another address (another region or language).
// options: [{ label, href, value }]. current: the value of the selected option.
export default function SelectNav({ label, options, current, name }) {
  const router = useRouter();
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#B8C7D6' }}>
      {label}
      <select
        name={name}
        value={current}
        onChange={(e) => {
          const o = options.find((x) => x.value === e.target.value);
          if (o) router.push(o.href);
        }}
        style={{ height: '44px', maxWidth: '220px', border: '1px solid #2A4C6E', borderRadius: '8px', background: '#071F35', color: '#FFFFFF', padding: '0 12px', fontFamily: 'Inter,sans-serif', fontSize: '15px' }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

'use client';

import { useState } from 'react';

// "Did this answer your question?" with Yes / No. The answer is only shown on the page (nothing is sent anywhere).
export default function Helpful({ question, yes, no, thanks, sorry }) {
  const [answer, setAnswer] = useState(null);
  const btn = { height: '44px', padding: '0 16px', border: '1px solid var(--outline,#B8541F)', borderRadius: '8px', background: 'transparent', color: 'var(--outline,#B8541F)', fontFamily: 'Inter,sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer' };
  return (
    <div style={{ borderTop: '1px solid var(--border,#E8E2DC)', paddingTop: '18px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      {answer === null ? (
        <>
          <span style={{ fontSize: '15px' }}>{question}</span>
          <button type="button" className="df-h-outline" onClick={() => setAnswer(true)} style={btn}>{yes}</button>
          <button type="button" className="df-h-outline" onClick={() => setAnswer(false)} style={btn}>{no}</button>
        </>
      ) : (
        <span role="status" style={{ fontSize: '15px' }}>{answer ? thanks : sorry}</span>
      )}
    </div>
  );
}

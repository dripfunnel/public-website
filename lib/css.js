// Turns an inline-style string ("a-b:c;d:e") into a React style object.
// Left/right properties are written as logical ones (start/end), so the same markup also works mirrored for Arabic (right-to-left).

function splitDecls(s) {
  const out = [];
  let cur = '';
  let depth = 0;
  let quote = null;
  for (const ch of s) {
    if (quote) {
      cur += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
      continue;
    }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

const LOGICAL = {
  'margin-left': 'margin-inline-start',
  'margin-right': 'margin-inline-end',
  'padding-left': 'padding-inline-start',
  'padding-right': 'padding-inline-end',
  'border-left': 'border-inline-start',
  'border-right': 'border-inline-end',
  'border-left-width': 'border-inline-start-width',
  'border-right-width': 'border-inline-end-width',
  'border-left-color': 'border-inline-start-color',
  'border-right-color': 'border-inline-end-color',
  'border-left-style': 'border-inline-start-style',
  'border-right-style': 'border-inline-end-style',
  left: 'inset-inline-start',
  right: 'inset-inline-end',
  'border-top-left-radius': 'border-start-start-radius',
  'border-top-right-radius': 'border-start-end-radius',
  'border-bottom-left-radius': 'border-end-start-radius',
  'border-bottom-right-radius': 'border-end-end-radius',
};

export function css(str) {
  const o = {};
  if (!str) return o;
  for (const d of splitDecls(str)) {
    const i = d.indexOf(':');
    if (i < 0) continue;
    let k = d.slice(0, i).trim();
    let val = d.slice(i + 1).trim();
    if (!k) continue;
    if (k.startsWith('--')) {
      o[k] = val;
      continue;
    }
    if (LOGICAL[k]) k = LOGICAL[k];
    if (k === 'text-align' && (val === 'left' || val === 'right')) val = val === 'left' ? 'start' : 'end';
    if (k.startsWith('-ms-')) k = 'ms' + k.slice(4);
    else if (k.startsWith('-')) k = k.slice(1);
    k = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[k] = val;
  }
  return o;
}

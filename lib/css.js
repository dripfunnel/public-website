// Turns an inline-style string ("a-b:c;d:e") into a React style object.
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

export function css(str) {
  const o = {};
  if (!str) return o;
  for (const d of splitDecls(str)) {
    const i = d.indexOf(':');
    if (i < 0) continue;
    let k = d.slice(0, i).trim();
    const val = d.slice(i + 1).trim();
    if (!k) continue;
    if (k.startsWith('--')) {
      o[k] = val;
      continue;
    }
    if (k.startsWith('-ms-')) k = 'ms' + k.slice(4);
    else if (k.startsWith('-')) k = k.slice(1);
    k = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[k] = val;
  }
  return o;
}

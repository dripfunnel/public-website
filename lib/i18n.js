// Text translation.
//
// Every visible text is written in English in the code, wrapped in t('...'). On Arabic pages t() looks the
// English text up in the Arabic dictionaries (content/ar/*.js, English text -> Arabic text).
// A text with variables uses {name} placeholders: t('Prices in {currency}', { currency: 'AED' }).
// Only ever pass a plain string (or a string stored in a data list) to t(), never a string built with + or a template.
//
// Arabic wording is a first draft written by Claude and must be reviewed by a native speaker before launch.
//
// To find texts that still have no Arabic: I18N_REPORT=.i18n-missing-<name>.txt npm run build
// (the value is the file that gets one line per missing text; the file is appended to, so delete it first)

import fs from 'node:fs';
import shell from '@/content/ar/shell';
import home from '@/content/ar/home';
import ai from '@/content/ar/ai';
import features from '@/content/ar/features';
import pricing from '@/content/ar/pricing';
import partners from '@/content/ar/partners';
import blog from '@/content/ar/blog';
import help from '@/content/ar/help';
import contact from '@/content/ar/contact';
import legal from '@/content/ar/legal';

const AR = { ...shell, ...home, ...ai, ...features, ...pricing, ...partners, ...blog, ...help, ...contact, ...legal };

function fill(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

export function makeT(locale) {
  if (locale !== 'ar') return (en, vars) => fill(en, vars);
  return (en, vars) => {
    let out = AR[en];
    if (out === undefined) {
      if (process.env.I18N_REPORT) {
        try {
          fs.appendFileSync(process.env.I18N_REPORT, JSON.stringify(en) + '\n');
        } catch (e) {}
      }
      out = en;
    }
    return fill(out, vars);
  };
}

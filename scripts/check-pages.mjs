// Visits every page of a running copy of the built site and reports problems:
// sideways scrolling, wrong number of h1, missing title/description/canonical, wrong lang/dir, console errors, failed requests, images without alt.
//
//   node scripts/serve.mjs out 3000     (in another window)
//   node scripts/check-pages.mjs http://localhost:3000 [--w 390]
//
// The list of pages comes from the sitemap (sitemap.xml) of that site.
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const wi = process.argv.indexOf('--w');
const widths = wi >= 0 ? [Number(process.argv[wi + 1])] : [1280, 390];

const CANDIDATES = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'];
const executablePath = CANDIDATES.find((p) => fs.existsSync(p));

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://www.dripfunnel.com', base));

const browser = await chromium.launch({ executablePath, headless: true });
const problems = [];
const note = (url, w, msg) => problems.push(`${url.replace(base, '')} @${w}: ${msg}`);

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  let current = '';
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) note(current, w, 'console error: ' + m.text().slice(0, 160));
  });
  page.on('response', (r) => {
    if (r.status() >= 400 && !/__next\./.test(r.url())) note(current, w, `HTTP ${r.status()} ${r.url().replace(base, '')}`);
  });
  page.on('pageerror', (e) => note(current, w, 'page error: ' + e.message.slice(0, 160)));
  for (const url of urls) {
    current = url;
    const isAr = url.includes('/ae/ar/');
    await page.goto(url, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
      hreflangs: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
    }));
    if (r.overflow > 0) note(url, w, `sideways scrolling: page is ${r.overflow}px wider than the screen`);
    if (r.h1 !== 1) note(url, w, `${r.h1} h1 headings`);
    if (!r.title || /placeholder/i.test(r.title)) note(url, w, `title: "${r.title}"`);
    if (!r.desc || r.desc.length < 20) note(url, w, `description too short: "${r.desc}"`);
    if (!r.canonical.endsWith(new URL(url).pathname)) note(url, w, `canonical is ${r.canonical}`);
    if (r.lang !== (isAr ? 'ar' : 'en') || r.dir !== (isAr ? 'rtl' : 'ltr')) note(url, w, `lang/dir is ${r.lang}/${r.dir}`);
    if (r.noAlt) note(url, w, `${r.noAlt} images without alt`);
    if (r.hreflangs < 5) note(url, w, `only ${r.hreflangs} hreflang links`);
  }
  await ctx.close();
}
await browser.close();
const unique = [...new Set(problems)];
console.log(`${urls.length} pages checked at widths ${widths.join(', ')}.`);
console.log(unique.length ? unique.join('\n') : 'No problems found.');
process.exitCode = unique.length ? 1 : 0;

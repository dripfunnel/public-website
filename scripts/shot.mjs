// Takes a full-page screenshot, to compare the new website with the original design.
//
//   node scripts/shot.mjs new  <url>   <out.png> [--w 1280] [--theme light|dark] [--click "css selector"]...
//   node scripts/shot.mjs orig <route> <out.png> [--w 1280] [--theme light|dark] [--cur INR|USD|EUR] [--click "css selector"]...
//
// "orig" opens design/DripFunnel Website v2.dc.html at #/<route> (for example "pricing", "blog/describe-your-shop"),
// hides the "Prototype controls" bar, and optionally picks the currency. It needs internet (the original loads React from a CDN).
// "new" opens a page of the built website, for example http://localhost:3000/in/pricing/ (see scripts/serve.mjs).
//
// Uses the Microsoft Edge or Google Chrome that is already installed (npm package playwright-core, no download).
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , mode, target, out, ...rest] = process.argv;
const opt = (name, def) => {
  const i = rest.indexOf('--' + name);
  return i >= 0 ? rest[i + 1] : def;
};
const clicks = rest.flatMap((a, i) => (a === '--click' ? [rest[i + 1]] : []));
const width = Number(opt('w', 1280));
const theme = opt('theme', 'light');
const cur = opt('cur', 'INR');

const CANDIDATES = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'];
const executablePath = CANDIDATES.find((p) => fs.existsSync(p));

const browser = await chromium.launch({ executablePath, headless: true });
const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
await ctx.addInitScript((t) => {
  try {
    localStorage.setItem('df-site-theme', t);
  } catch (e) {}
}, theme);
const page = await ctx.newPage();

if (mode === 'orig') {
  const file = path.resolve('design/DripFunnel Website v2.dc.html');
  await page.goto(pathToFileURL(file).href + '#/' + target, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-site]');
  await page.selectOption('label:has-text("Currency") select', cur);
  await page.evaluate(() => {
    const bar = document.querySelector('[data-site] > div');
    if (bar) bar.style.display = 'none';
  });
} else {
  await page.goto(target, { waitUntil: 'networkidle' });
}
for (const sel of clicks) await page.click(sel);
await page.waitForTimeout(400);
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('saved', out);

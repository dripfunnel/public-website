// Tries the interactive parts of a running copy of the site: region and language switching, theme, menus, language banner.
//   node scripts/check-interactions.mjs http://localhost:3000
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const CANDIDATES = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'];
const browser = await chromium.launch({ executablePath: CANDIDATES.find((p) => fs.existsSync(p)), headless: true });
let failed = 0;
const ok = (name, cond, extra = '') => {
  if (!cond) failed++;
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : '  ' + extra}`);
};
const path = (page) => new URL(page.url()).pathname;

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...opts });
  return ctx.newPage();
}

// Region selector in the footer moves to the same page of another region.
{
  const p = await newPage();
  await p.goto(base + '/in/pricing/', { waitUntil: 'networkidle' });
  await p.selectOption('select[name="region"]', 'us');
  await p.waitForURL('**/us/pricing/');
  ok('footer region selector: /in/pricing/ -> /us/pricing/', path(p) === '/us/pricing/', path(p));
  ok('US page shows dollar prices', (await p.textContent('main')).includes('$'));
  await p.selectOption('select[name="region"]', 'ae');
  await p.waitForURL('**/ae/pricing/');
  ok('US -> UAE keeps the page and shows AED', (await p.textContent('main')).includes('AED'));
  ok('language selector exists on UAE pages', (await p.locator('select[name="language"]').count()) === 1);
  await p.selectOption('select[name="language"]', 'ar');
  await p.waitForURL('**/ae/ar/pricing/');
  ok('footer language selector: English -> Arabic', path(p) === '/ae/ar/pricing/' && (await p.getAttribute('html', 'dir')) === 'rtl');
  await p.selectOption('select[name="region"]', 'in');
  await p.waitForURL('**/in/pricing/');
  ok('Arabic page -> India goes to the English page (no Arabic there)', path(p) === '/in/pricing/', path(p));
  ok('no language selector on India pages', (await p.locator('select[name="language"]').count()) === 0);
}

// Region and language drop-down in the header, after the theme icon.
{
  const p = await newPage();
  await p.goto(base + '/in/pricing/', { waitUntil: 'networkidle' });
  const btn = 'header div.df-wide button[aria-haspopup="true"]';
  ok('header region button shows the current region (IN)', (await p.textContent(btn)).trim() === 'IN');
  ok('region menu is closed at first', !(await p.locator('header .df-wide [role="menu"]').first().isVisible()));
  await p.click(btn);
  ok('region menu opens with 3 regions and no language list (India)', (await p.locator('header .df-wide [role="menu"] a:visible').count()) === 3);
  await p.keyboard.press('Escape');
  ok('Esc closes the region menu', (await p.locator('header .df-wide [role="menu"] a:visible').count()) === 0);
  await p.click(btn);
  await p.click('header .df-wide [role="menu"] a[href="/ae/pricing/"]');
  await p.waitForURL('**/ae/pricing/');
  ok('header: India -> United Arab Emirates keeps the page (/ae/pricing/)', path(p) === '/ae/pricing/', path(p));
  ok('AED prices after switching in the header', (await p.textContent('main')).includes('AED'));
  await p.click('header div.df-wide button[aria-haspopup="true"]');
  ok('UAE menu has 3 regions and 2 languages', (await p.locator('header .df-wide [role="menu"] a:visible').count()) === 5);
  await p.click('header .df-wide [role="menu"] a[hreflang="ar"]');
  await p.waitForURL('**/ae/ar/pricing/');
  ok('header: English -> Arabic (/ae/ar/pricing/), right-to-left', (await p.getAttribute('html', 'dir')) === 'rtl');
  await p.click('header div.df-wide button[aria-haspopup="true"]');
  await p.click('header .df-wide [role="menu"] a[href="/us/pricing/"]');
  await p.waitForURL('**/us/pricing/');
  ok('header: from Arabic UAE to the US goes to the English page', path(p) === '/us/pricing/', path(p));
  const m = await newPage({ viewport: { width: 390, height: 800 } });
  await m.goto(base + '/ae/ar/', { waitUntil: 'networkidle' });
  ok('phone: region button is in the header next to the theme icon', await m.locator('header div.df-narrow button[aria-haspopup="true"]').isVisible());
  ok('phone: no sideways scrolling in Arabic', (await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)) <= 0);
}

// Theme: toggle, remembered after reload, no flash (data-theme set before first paint).
{
  const p = await newPage({ colorScheme: 'light' });
  await p.goto(base + '/in/', { waitUntil: 'networkidle' });
  ok('starts in light theme', (await p.getAttribute('html', 'data-theme')) === 'light');
  await p.click('header button[aria-label="Switch to dark mode"]');
  ok('toggle switches to dark', (await p.getAttribute('html', 'data-theme')) === 'dark');
  await p.reload({ waitUntil: 'networkidle' });
  ok('dark theme remembered after reload', (await p.getAttribute('html', 'data-theme')) === 'dark');
  const d = await newPage({ colorScheme: 'dark' });
  await d.goto(base + '/in/', { waitUntil: 'domcontentloaded' });
  ok('first visit follows the device setting (dark)', (await d.getAttribute('html', 'data-theme')) === 'dark');
  const blocked = await newPage();
  await blocked.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  });
  await blocked.goto(base + '/in/', { waitUntil: 'networkidle' });
  await blocked.click('header button[aria-label="Switch to dark mode"]');
  ok('works when browser storage is blocked', (await blocked.getAttribute('html', 'data-theme')) === 'dark');
}

// Resources dropdown and mobile menu.
{
  const p = await newPage();
  await p.goto(base + '/in/', { waitUntil: 'networkidle' });
  await p.click('header nav button[aria-haspopup="true"]');
  ok('Resources dropdown opens with 3 items', (await p.locator('header nav [role="menuitem"]').count()) === 3);
  await p.keyboard.press('Escape');
  ok('Esc closes the dropdown', (await p.locator('header nav [role="menu"]').count()) === 0);
  await p.click('header nav button[aria-haspopup="true"]');
  await p.click('h1');
  ok('click outside closes the dropdown', (await p.locator('header nav [role="menu"]').count()) === 0);
  const m = await newPage({ viewport: { width: 390, height: 800 } });
  await m.goto(base + '/in/', { waitUntil: 'networkidle' });
  ok('desktop navigation hidden on a phone', !(await m.locator('header nav[aria-label="Main"]').first().isVisible()));
  await m.click('header button[aria-label="Menu"]');
  ok('mobile menu lists 8 pages and 2 buttons', (await m.locator('header nav:visible a').count()) === 10, String(await m.locator('header nav:visible a').count()));
}

// Language suggestion banner: only for Arabic browsers on English UAE pages, never a redirect.
{
  const a = await newPage({ locale: 'ar-AE' });
  await a.goto(base + '/ae/', { waitUntil: 'networkidle' });
  ok('Arabic browser on /ae/ sees the suggestion and is not redirected', path(a) === '/ae/' && (await a.locator('[role="region"] a[hreflang="ar"]').count()) === 1);
  await a.click('[role="region"] button');
  ok('banner can be dismissed', (await a.locator('[role="region"] a[hreflang="ar"]').count()) === 0);
  const e = await newPage({ locale: 'en-US' });
  await e.goto(base + '/ae/', { waitUntil: 'networkidle' });
  ok('English browser sees no banner', (await e.locator('[role="region"] a[hreflang="ar"]').count()) === 0);
  const i = await newPage({ locale: 'ar-AE' });
  await i.goto(base + '/in/', { waitUntil: 'networkidle' });
  ok('no banner on India pages (no Arabic there)', (await i.locator('[role="region"] a[hreflang="ar"]').count()) === 0);
}

// Bare address and not-found.
{
  const p = await newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForURL('**/in/');
  ok('bare address goes straight to India (fallback when the Cloudflare redirect is not there)', path(p) === '/in/', path(p));
  const n = await p.goto(base + '/in/ar/pricing/', { waitUntil: 'networkidle' });
  ok('Arabic does not exist for India (404)', n.status() === 404, String(n.status()));
  const n2 = await p.goto(base + '/in/nothing-here/', { waitUntil: 'networkidle' });
  ok('unknown page is a real 404 with noindex', n2.status() === 404 && (await p.locator('meta[name="robots"]').first().getAttribute('content')).includes('noindex'));
}

await browser.close();
console.log(failed ? `\n${failed} checks failed.` : '\nAll checks passed.');
process.exitCode = failed ? 1 : 0;

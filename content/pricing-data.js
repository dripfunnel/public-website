// Plain English data for the Pricing page (copied from the original design, script lines ~739-788).
// The page translates every text at render time with ctx.t. Prices are filled in from ctx.prices.
// A cell value written '@setup:starter' (or growth / business) means "the one-time setup price of that plan".

// Plans. `k` is the key into PRICE_TABLE (starter = "Growth", growth = "Growth Pro").
export const PLANS = [
  { k: 'free', name: 'Starter (Free)', for: 'Try it with real shoppers. Free for life.', cta: 'Start free', points: ['10 products', 'Your shop on a DripFunnel address', 'AI designs your shop on your own AI key', 'Owner only', 'No fee on your orders, ever'] },
  { k: 'starter', name: 'Growth', for: 'Your first real shop, on your own domain.', cta: 'Start 10-day free trial', points: ['100 products', 'Your own domain', '2 staff accounts', 'Import from a spreadsheet', 'AI designs your shop on your own AI key', 'The 4 reports'] },
  { k: 'growth', name: 'Growth Pro', for: 'A small team, more markets and a richer shop.', cta: 'Start 10-day free trial', badge: 'Most popular', points: ['5,000 products', 'A+ content and video', '5 staff accounts', '2 markets, currencies and languages', 'AI included, no key needed', 'Remove “Powered by DripFunnel”'] },
  { k: 'business', name: 'Business', for: 'High volume, many suppliers, selling abroad.', cta: 'Start 10-day free trial', points: ['Unlimited products', 'Suppliers with full access', '15 staff accounts', '10 markets, currencies and languages', 'Duties and import taxes at checkout', 'Custom reports and priority support'] },
  { k: 'ent', name: 'Partner', for: 'White-label, many stores, your own terms.', cta: 'Talk to us', points: ['Everything in Business', 'Your brand on the portal, shops and emails', 'Many stores under one account', 'SSO and full API access', 'Migration, onboarding and uptime guarantee', 'Named account manager'] },
];

export const BANDWIDTH = {
  free: '1 GB bandwidth a month (about 1,000–5,000 page views)',
  starter: '10 GB bandwidth a month',
  growth: '50 GB bandwidth a month',
  business: '200 GB bandwidth a month, buy more any time',
  ent: 'Bandwidth to fit your traffic',
};

const R = (name, v, note) => ({ name, note: note || '', v });

// Comparison table: [group name, rows]. Each row has 5 values: Starter (Free), Growth, Growth Pro, Business, Partner.
export const GROUPS = [
  ['Catalogue', [
    R('Products', ['10', '100', '5,000', 'Unlimited', 'Unlimited']),
    R('Photos per product', ['3', '5', '25', '50', 'Custom']),
    R('Versions per product', ['10', '100', '100', '250', 'Custom'], 'e.g. every size × colour'),
    R('Collections', ['3', '25', 'Unlimited', 'Unlimited', 'Unlimited']),
    R('Filters and internal tags', ['✓', '✓', '✓', '✓', '✓']),
    R('Size charts', ['1', '2', '25', 'Unlimited', 'Unlimited']),
    R('Specifications and highlights', ['✓', '✓', '✓', '✓', '✓']),
    R('Badges', ['—', '✓', '✓', '✓', '✓']),
    R('FAQs and related products', ['—', '—', '✓', '✓', '✓']),
    R('A+ content', ['—', '—', '50 products', 'Unlimited', 'Unlimited + shared blocks']),
    R('Product video', ['—', '—', '✓', '✓', '✓']),
    R('Import from a spreadsheet', ['—', '✓', '✓', '✓', '✓']),
    R('Bring products from Shopify', ['—', '—', '✓', '✓', '✓']),
    R('AI for descriptions and translations', ['Your own AI key', 'Your own AI key', 'Included · monthly allowance', 'Included · larger allowance', 'Custom'], 'Same AI account as your storefront: one key, or one allowance'),
    R('Legal and safety details', ['✓', '✓', '✓', '✓', '✓'], 'Never behind a paywall'),
  ]],
  ['Getting started', [
    R('Storefront built by our team (optional)', ['—', '@setup:starter', '@setup:growth', '@setup:business', 'Custom'], 'Only if you want it. Or build it yourself with the AI, free on every plan'),
  ]],
  ['Getting paid', [
    R('DripFunnel fee on your orders', ['None', 'None', 'None', 'None', 'None'], 'We never take a cut of your sales'),
    R('Payment gateways', ['1', '2', 'All', 'All', 'All']),
    R('Cash on delivery, bank transfer', ['✓', '✓', '✓', '✓', '✓']),
    R('Discount codes and automatic offers', ['3 live', '3 live', 'Unlimited', 'Unlimited', 'Unlimited'], 'Percent, fixed, free delivery and buy X get Y on every plan'),
    R('Customer-group offers, tiers, single-use codes', ['—', '—', '✓', '✓', '✓']),
    R('Offer results', ['—', '—', '✓', '✓', '✓']),
  ]],
  ['Team and suppliers', [
    R('Staff accounts', ['Owner only', '2', '5', '15', 'Unlimited']),
    R('Manager role', ['—', '—', '✓', '✓', '✓']),
    R('Suppliers', ['—', '—', '—', 'Unlimited · full access', 'Unlimited · full access'], 'Stock only, products and stock, or also packing their own orders'),
    R('Approve supplier products', ['—', '—', '—', '✓', '✓']),
    R('Suppliers pack their own orders', ['—', '—', '—', '✓', '✓']),
  ]],
  ['Selling abroad', [
    R('Markets', ['Home only', 'Home only', '2', '10', 'Unlimited']),
    R('Currencies', ['1', '1', '2', '10', 'Unlimited'], 'Automatic conversion, or set prices yourself'),
    R('Languages', ['1', '1', '2', '10', 'Unlimited']),
    R('Price adjustment per market', ['—', '—', '✓', '✓', '✓']),
    R('Fixed prices per market', ['—', '—', '—', '✓', '✓']),
    R('Own domain per market', ['—', '—', '—', '✓', '✓']),
    R('Duties and import taxes at checkout', ['—', '—', '—', '✓', '✓']),
  ]],
  ['Shipping and stock', [
    R('Stock locations', ['1', '2', '5', '10', 'Unlimited']),
    R('Couriers you can connect', ['1', '2', 'All', 'All', 'All']),
    R('Live courier rates at checkout', ['—', '—', '✓', '✓', '✓']),
    R('Delivery-area lists', ['✓', '✓', '✓', '✓', '✓']),
  ]],
  ['Storefront', [
    R('Monthly bandwidth', ['1 GB', '10 GB', '50 GB', '200 GB', 'Custom'], 'Total data your shop sends to shoppers. 1 GB usually covers 1,000–5,000 page views a month.'),
    R('Buy extra bandwidth', ['—', '—', '—', '✓', '✓'], 'Billed per extra GB, so your shop never slows down'),
    R('Your own domain', ['—', '✓', '✓', '✓', '✓']),
    R('Remove “Powered by DripFunnel”', ['—', '—', '✓', '✓', 'Full white-label']),
    R('AI that designs your whole store', ['Your own AI key', 'Your own AI key', 'Included · monthly allowance', 'Included · larger allowance', 'Custom'], 'Starter (Free) and Growth: connect your own AI account. Growth Pro and up: included'),
    R('Version history', ['7 days', '30 days', '90 days', '1 year', 'Unlimited']),
    R('Abandoned-cart reminders', ['You send · 1 per cart', 'You send · 1 per cart', 'Automatic · up to 3', 'Automatic · up to 3', 'Automatic · up to 3'], 'From Growth Pro, reminders can include a single-use discount'),
    R('Blog', ['Planned', 'Planned', 'Planned', 'Planned', 'Planned']),
  ]],
  ['Reports', [
    R('Home numbers', ['✓', '✓', '✓', '✓', '✓']),
    R('Takings, what sold, markets, tax', ['—', '✓', '✓', '✓', '✓']),
    R('Export and supplier report', ['—', '—', '✓', '✓', '✓']),
    R('Custom reports', ['—', '—', '—', '✓', '✓']),
  ]],
  ['Support and partner', [
    R('Support', ['Help centre', 'Email', 'Chat', 'Priority chat and phone', 'Named manager']),
    R('Uptime guarantee', ['—', '—', '—', '—', '✓']),
    R('White-label', ['—', '—', '—', '—', '✓']),
    R('Many stores, one account', ['—', '—', '—', '—', '✓']),
    R('SSO and full API', ['—', '—', '—', '—', '✓']),
    R('Migration and onboarding', ['—', '—', '—', '—', '✓']),
  ]],
];

// FAQs. The answer of the setup question is written with {setup}, the three one-time setup prices of the region.
export const FAQS = [
  ['How does the 10-day free trial work?', 'Every new store gets full Business access for 10 days, no credit card required. Use every feature, then pick the plan that fits. We remind you before the trial ends, and nothing you made is ever deleted.'],
  ['Is Starter (Free) really free forever?', 'Yes. You keep a real shop with 10 products for as long as you like. We never take a fee on your orders, on any plan.'],
  ['What happens if I go over a limit?', 'Nothing breaks and nothing is deleted. Everything you have keeps selling; you just can’t add more until you move up a plan.'],
  ['Can I change plans any time?', 'Upgrades start straight away and you pay the difference for the month. Downgrades take effect at the end of your billing period.'],
  ['If I downgrade, do I lose my A+ content?', 'You keep it. It’s hidden from your shop until you upgrade again, then it comes straight back.'],
  ['What does “your own AI key” mean?', 'On Starter (Free) and Growth you connect your own AI account (for example OpenAI or Anthropic) and pay them directly for what you use. It designs your store and writes product descriptions and translations. From Growth Pro, all of that AI is included with one monthly allowance: no key, no extra bill.'],
  ['What happens when I run out of AI allowance?', 'Your shop keeps working and nothing you published changes. You can wait for next month’s allowance, move up a plan, or connect your own key to keep going.'],
  ['What is bandwidth, and what if I go over?', 'It’s the total data your shop sends to shoppers each month: pages, photos and videos. 1 GB usually covers 1,000–5,000 page views. If you go over, your shop stays online: we tell you at 80% and 100%, and you can move up a plan. On Business you can also buy extra bandwidth, billed per GB. We never switch your shop off without warning.'],
  ['Do I have to pay for storefront setup?', 'No. The AI builds your storefront for free on every plan. Need help building your storefront? We’ll do it for you: our team builds your homepage, pages, menus and first products so you launch looking finished. It’s optional and paid once: {setup}.'],
  ['Do you charge per staff member?', 'No. Each plan includes a number of staff accounts. Your suppliers’ users don’t count towards it.'],
  ['What does white-label mean?', 'On Partner, the portal, the shops and every email carry your brand, not ours. It’s for agencies and groups running shops for others.'],
];

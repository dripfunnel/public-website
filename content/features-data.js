// The feature list for the Features page: 10 groups, each with its items and a small sample panel.
// Copied from the original design (`fsecs` in design/DripFunnel Website v2.dc.html). Every text goes through t().
// The sample shop (store, couriers, tax, prices) comes from ctx.content, so it follows the region.
// `p` of an item is the plan it starts on and always stays the English key ('All plans', 'Growth', ...): it is used to rank the plans.
// `pl` is the same plan name translated for display.

import { SETUP_FROM } from '@/lib/regions';

export const PLAN_RANK = { 'All plans': 0, Growth: 1, 'Growth Pro': 2, Business: 3 };
// Plan filter buttons: label (English key) and the rank of the highest plan it includes. null = no filter.
export const PLAN_FILTERS = [
  ['All', null],
  ['Starter (Free)', 0],
  ['Growth', 1],
  ['Growth Pro', 2],
  ['Business', 3],
  ['Partner', 3],
];

const OK = ['var(--okbg,#EEF7F2)', 'var(--okfg,#1D6B47)'];
const PE = ['var(--tint,#FDF0E8)', 'var(--tint-fg,#8F4017)'];
const NE = ['var(--sunk,#F3EDE8)', 'var(--text,#14181F)'];

export function makeFeatureGroups(ctx) {
  const { t, fmt, cur, content: R } = ctx;
  const sep = ctx.rtl ? '، ' : ', ';
  const listOf = (s) => s.split(',').map((x) => t(x.trim()));
  const joined = (s) => listOf(s).join(sep);
  const row = (a, b, c, pill, col) => ({ a, b, c: c || '', pill: pill || '', pbg: (col || NE)[0], pfg: (col || NE)[1] });
  const F = (title, p, d) => ({ t: t(title), p, pl: t(p), d: t(d) });
  const Fd = (title, p, d) => ({ t: t(title), p, pl: t(p), d });
  const it = R.items.map(([name, price]) => [t(name), price]);
  const city = t(R.city);
  const setupLineShort = t('from {price} one-time', { price: fmt(SETUP_FROM[cur]) });
  const dayLetters = t('M T W T F S S').split(' ');

  const groups = [
    {
      id: 'storefront',
      label: t('Storefront and AI'),
      title: t('A store designed from a description'),
      lead: t('No themes, no templates. The AI designs the homepage, pages, menus, product pages and the look of all of them. You check, publish and can undo.'),
      plan: t('Every plan. On Starter and Growth the AI runs on your own key; from Growth Pro it is included.'),
      items: [
        F('Describe a change', 'All plans', 'Plain words in, a draft out. One change at a time.'),
        F('Before and after preview', 'All plans', 'Desktop, tablet and phone, side by side.'),
        F('Approve and publish', 'All plans', 'Nothing reaches shoppers until you press approve. Publishes in about a minute.'),
        F('Version history and undo', 'All plans', '7 days on Starter, 30 on Growth, 90 on Growth Pro, 1 year on Business.'),
        F('AI included', 'Growth Pro', 'A monthly allowance with no key to connect. Larger on Business.'),
        F('Your own AI key', 'All plans', 'OpenAI or Anthropic. Paste it once in Settings.'),
        F('Your own domain', 'Growth', 'Connect a domain you already own: add one DNS record, we handle the certificate.'),
        F('Remove “Powered by DripFunnel”', 'Growth Pro', 'Your shop, your name only.'),
        F('Bandwidth that grows', 'All plans', '1 GB on Starter to 200 GB on Business. Buy more on Business.'),
        Fd('We build it for you', 'Growth', t('Optional one-time service: {setup}.', { setup: setupLineShort })),
      ],
      mockTitle: t('Storefront · draft'),
      mockSub: t('v14 · not live'),
      rows: [
        row(t('Homepage'), t('Bestsellers first, new hero'), t('Changed'), t('Draft'), PE),
        row(t('Menu'), t('Shop · Our story · Help'), t('Changed'), t('Draft'), PE),
        row(t('Products and prices'), t('Not touched')),
        row(t('Checkout'), t('Not touched')),
      ],
      foot: t('Approve & publish · Discard · History'),
    },
    {
      id: 'catalogue',
      label: t('Catalogue'),
      title: t('A catalogue that handles the detail'),
      lead: t('Add a product once and sell every size and colour of it, with the content shoppers need to decide.'),
      plan: t('Starter: 10 products. Growth: 100. Growth Pro: 5,000. Business: unlimited.'),
      items: [
        F('Versions', 'All plans', 'Every size × colour with its own price, stock, photos and code. Up to 250 per product on Business.'),
        F('Photos', 'All plans', '3 per product on Starter, up to 50 on Business.'),
        F('Product video', 'Growth Pro', 'One video per product, shown with the photos.'),
        F('A+ content', 'Growth Pro', 'Rich modules below the fold: comparison tables, feature rows, story sections.'),
        F('Size charts', 'All plans', 'Build once, attach to many products. 1 on Starter, 25 on Growth Pro.'),
        F('Collections', 'All plans', 'Manual or by rule. 3 on Starter, unlimited from Growth Pro.'),
        F('Filters and internal tags', 'All plans', 'Shoppers filter by what matters; tags stay private.'),
        F('Menus', 'All plans', 'Header and footer menus, or let the AI arrange them.'),
        F('Specifications and highlights', 'All plans', 'Structured facts shoppers compare on.'),
        F('Badges', 'Growth', 'New, bestseller, low stock, your own.'),
        F('FAQs and related products', 'Growth Pro', 'Answer the question on the page; suggest the next thing.'),
        F('AI descriptions', 'All plans', 'Written in your tone from a few facts.'),
        F('AI translations', 'All plans', 'Every language your markets need, from one source text.'),
        F('Import from a spreadsheet', 'Growth', 'Match columns once, pause and resume, see what failed and why.'),
        F('Bring products from Shopify', 'Growth Pro', 'Products, versions, photos and collections come across.'),
        F('Export', 'Growth Pro', 'CSV of products, stock or orders, ready for your accountant.'),
        F('Stock history', 'All plans', 'Every change to every version, who and when.'),
        F('Bulk edit', 'All plans', 'Select many, change price, stock, collections or status at once.'),
        Fd('Legal and safety details', 'All plans', t('Country of origin, warnings, {code}, MRP or MSRP. Never behind a paywall.', { code: t(R.code) })),
        Fd('Compare-at price', 'All plans', t('{note}.', { note: t(R.compare) })),
      ],
      mockTitle: it[0][0],
      mockSub: t('8 versions · 3 languages'),
      rows: [
        row(t('S · Natural'), t('In stock at {city}', { city }), fmt(it[0][1]), t('24 left'), OK),
        row(t('M · Natural'), t('In stock at {city}', { city }), fmt(it[0][1]), t('18 left'), OK),
        row(t('L · Indigo'), t('Supplier stock'), fmt(it[0][1]), t('3 left'), PE),
        row(t('XL · Indigo'), t('Supplier stock'), fmt(it[0][1]), t('Sold out'), NE),
      ],
      foot: t('A+ content · Product video · Size chart · {code}', { code: t(R.code) }),
    },
    {
      id: 'orders',
      label: t('Orders and shipping'),
      title: t('Orders, shipping and returns in one place'),
      lead: t('See what to ship first, send it with your courier, and handle returns without a spreadsheet.'),
      plan: t('Every plan has unlimited orders. Live courier rates from Growth Pro. 10 stock locations on Business.'),
      items: [
        F('Order list and filters', 'All plans', 'To ship, unpaid, returns, by market, by supplier.'),
        Fd('Ship with your courier', 'All plans', t('{couriers}. Tracking goes to the shopper automatically.', { couriers: joined(R.couriers) })),
        F('Live courier rates at checkout', 'Growth Pro', 'Shoppers see the real price before they pay.'),
        F('Partial shipping', 'All plans', 'Send what you have now and the rest later.'),
        F('Refunds', 'All plans', 'All or part of an order, back to the original payment.'),
        F('Returns', 'All plans', 'Request, approve, receive, refund. Each supplier handles their own items; you can override.'),
        F('Cancellations', 'All plans', 'Before shipping, with stock put back.'),
        F('Invoices, packing slips and labels', 'All plans', 'Print one or many, with the right tax wording for the market.'),
        F('Delivery charges', 'All plans', 'Free, flat, by weight, or free above a threshold.'),
        F('Delivery-area lists', 'All plans', 'Postcodes or regions you do and don’t deliver to.'),
        F('Stock locations', 'All plans', '1 on Starter, 5 on Growth Pro, 10 on Business.'),
        F('Customers and groups', 'All plans', 'Profiles, order history, notes and groups for offers.'),
        F('Email the customer', 'All plans', 'From the order, with the order details filled in.'),
        F('Order exports', 'Growth Pro', 'CSV by date range, market or status.'),
      ],
      mockTitle: t('Order #1042'),
      mockSub: t('Paid · 2 items'),
      rows: [
        row(it[1][0], t('Qty 1'), fmt(it[1][1]), t('Packed'), OK),
        row(it[2][0], t('Qty 2'), fmt(it[2][1] * 2), t('To ship'), PE),
        row(t('Courier'), t('{courier} · tracking added', { courier: listOf(R.couriers)[0] }), '', t('Shipped'), OK),
      ],
      foot: t('Print invoice · Packing slip · Label · Refund'),
    },
    {
      id: 'payments',
      label: t('Payments and tax'),
      title: t('Get paid the way your shoppers pay'),
      lead: t('Local payment methods, local tax rules and zero DripFunnel fees on every order.'),
      plan: t('Zero fees on every plan. 1 gateway on Starter, 2 on Growth, all from Growth Pro.'),
      items: [
        F('Zero fees on your orders', 'All plans', 'We never take a cut of your sales. You pay only your provider.'),
        Fd('Payment gateways', 'All plans', t('{methods}. Connect in minutes.', { methods: joined(R.pay) })),
        F('Cash on delivery and bank transfer', 'All plans', 'For markets where cards are not the norm.'),
        Fd('Local tax worked out', 'All plans', t('{note}.', { note: t(R.taxLine) })),
        F('Tax-inclusive or exclusive prices', 'All plans', 'Follows the rule of each market automatically.'),
        F('Tax report', 'Growth', 'What you owe, by market and rate.'),
        F('Shopper invoices', 'All plans', 'Numbered, with the tax detail each country needs.'),
      ],
      mockTitle: t('Payments'),
      mockSub: t(R.country),
      rows: listOf(R.pay).map((p, i) => row(p, i === 0 ? t('Connected') : t('Available'), '', i === 0 ? t('Live') : '', i === 0 ? OK : null)),
      foot: t('DripFunnel fee: {amount} on every order', { amount: fmt(0) }),
    },
    {
      id: 'offers',
      label: t('Offers and carts'),
      title: t('Offers that bring people back'),
      lead: t('Run the offer you have in mind and see whether it worked. Remind shoppers who left something behind.'),
      plan: t('3 live offers on Starter and Growth. Unlimited offers and automatic reminders from Growth Pro.'),
      items: [
        F('Discount codes', 'All plans', 'Percent off, fixed amount or free delivery.'),
        F('Automatic offers', 'All plans', 'No code needed; applied when the rule is met.'),
        F('Buy X get Y', 'All plans', 'Buy 2 get 1, mix and match, cheapest free.'),
        F('Minimum spend and quantity', 'All plans', 'Set the bar the cart must clear.'),
        F('Single-use codes', 'Growth Pro', 'One per shopper, generated in bulk or sent in a reminder.'),
        F('Customer-group offers', 'Growth Pro', 'Trade, VIP, first order, your own groups.'),
        F('Tiered offers', 'Growth Pro', 'Spend more, save more.'),
        F('Schedules and stacking rules', 'All plans', 'Start and end dates, and which offers may combine.'),
        F('Offer results', 'Growth Pro', 'Orders, revenue and discount given, per offer.'),
        F('Abandoned-cart reminders', 'All plans', 'One you send yourself on Starter; up to 3 sent automatically from Growth Pro.'),
        F('Discount in the last reminder', 'Growth Pro', 'A single-use code, only if the first two didn’t work.'),
        F('Regional wording', 'All plans', 'Coupon or voucher, shipping or delivery, by market.'),
      ],
      mockTitle: t('Buy 2, get 1 free'),
      mockSub: t('Automatic offer · live'),
      rows: [
        row(t('Who'), t('Everyone'), '', t('Live'), OK),
        row(t('Reminder 1'), t('1 hour after they leave'), t('Sent')),
        row(t('Reminder 2'), t('1 day after'), t('Sent')),
        row(t('Reminder 3'), t('3 days after, with a single-use code'), t('Scheduled'), t('Code'), PE),
      ],
      foot: '',
    },
    {
      id: 'abroad',
      label: t('Selling abroad'),
      title: t('Sell in many countries from one shop'),
      lead: t('Add a market and your shop shows the right currency, language, tax and payment methods there.'),
      plan: t('Home market on Starter and Growth. 2 markets on Growth Pro, 10 on Business.'),
      items: [
        F('Markets', 'Growth Pro', 'Each with its own currency, languages, tax and couriers.'),
        F('Currencies', 'Growth Pro', 'Automatic conversion, or set prices yourself.'),
        F('Languages', 'Growth Pro', 'Shop, emails and invoices in the shopper’s language.'),
        F('Price adjustment per market', 'Growth Pro', '+10% for one country, rounded nicely.'),
        F('Fixed prices per market', 'Business', 'Exact local prices, not conversions.'),
        F('Duties and import taxes at checkout', 'Business', 'Shoppers pay once, nothing at the door.'),
        F('Own domain per market', 'Business', 'shop.de, shop.in, shop.com.'),
        F('Local payment methods', 'All plans', 'Klarna in Germany, PhonePe in India, PayPal in the US.'),
        F('Local couriers', 'All plans', 'DHL, Shiprocket, USPS and more.'),
        F('Local rules built in', 'All plans', 'VAT-inclusive prices, 30-day lowest price in the EU, MRP in India, HSN codes.'),
      ],
      mockTitle: t('Markets'),
      mockSub: t('5 live'),
      rows: [
        row(t('India'), t('INR · Hindi, English'), t('GST incl.'), t('Live'), OK),
        row(t('Germany'), t('EUR · German'), t('VAT 19% incl.'), t('Live'), OK),
        row(t('United States'), t('USD · English'), t('Sales tax excl.'), t('Live'), OK),
        row(t('United Arab Emirates'), t('AED · Arabic, English'), t('VAT 5% incl.'), t('Live'), OK),
        row(t('United Kingdom'), t('GBP · English'), t('VAT 20% incl.'), t('Duties at checkout'), PE),
      ],
      foot: '',
    },
    {
      id: 'suppliers',
      label: t('Suppliers'),
      title: t('Suppliers who manage their own shelf'),
      lead: t('Let suppliers keep their own products and stock up to date, and even pack their own orders, under your rules.'),
      plan: t('Business and Partner. Unlimited suppliers; their users don’t count towards your staff.'),
      items: [
        F('Invite suppliers', 'Business', 'By email. The invitation creates their business and first user.'),
        F('Three access levels', 'Business', 'Stock only; products and stock; or also packing their own orders.'),
        F('Approval before going live', 'Business', 'Optional. Review, approve or send back with a reason.'),
        F('Approval for edits', 'Business', 'Decide whether an edit to a live product needs a second look.'),
        F('Suppliers see only their own', 'Business', 'Their products, their order lines, the delivery address. Never the order total or other suppliers.'),
        F('Shared record', 'Business', 'You can edit a supplier’s product and they see the change. Only price is yours alone.'),
        F('Suppliers pack their own orders', 'Business', 'Ship to your warehouse or straight to the shopper, your choice per supplier.'),
        F('Supplier returns', 'Business', 'Each supplier handles their own items; you can override.'),
        F('Supplier report', 'Business', 'What each supplier sold, by period.'),
        F('Suspend or remove', 'Business', 'Their products stay in the catalogue, paused, until you decide.'),
      ],
      mockTitle: t('Suppliers'),
      mockSub: t('2 active · 1 to approve'),
      rows: [
        row(t('Loom House'), t('Products and stock'), t('12 products'), t('Active'), OK),
        row(t('Indigo Mills'), t('Also packs own orders'), t('31 products'), t('Active'), OK),
        row(t('New product'), t('From Loom House, this morning'), '', t('To approve'), PE),
      ],
      foot: t('Approve · Send back with a reason'),
    },
    {
      id: 'team',
      label: t('Team and security'),
      title: t('Your team, with the right keys'),
      lead: t('Each person sees only what their job needs, and every account is protected.'),
      plan: t('Owner only on Starter. 2 staff on Growth, 5 on Growth Pro, 15 on Business.'),
      items: [
        F('Owner, Manager and Staff roles', 'Growth', 'Owner runs everything; Manager runs catalogue and orders; Staff handle orders and customers.'),
        F('Manager role', 'Growth Pro', 'Day-to-day running without billing or settings.'),
        F('Invitations', 'Growth', 'Email invites that expire after 7 days. Resend or revoke any time.'),
        F('View-only where it matters', 'Growth', 'Staff can see offers and collections but not change them.'),
        F('Two-step sign-in', 'All plans', 'Authenticator app or email code, with backup codes.'),
        F('Activity in the stock history', 'All plans', 'Who changed what, and when.'),
        F('My profile', 'All plans', 'Name, email, password, appearance and time zone.'),
        F('Support access switch', 'All plans', 'Decide whether support may look at your store, and for how long.'),
      ],
      mockTitle: t('People'),
      mockSub: t('3 staff · 2 suppliers'),
      rows: [
        row(t(R.owner), t('Owner'), t('Everything'), t('Owner'), OK),
        row(t('Mei'), t('Manager'), t('Catalogue, orders, offers'), t('Staff'), NE),
        row(t('Ravi'), t('Staff'), t('Orders and customers'), t('Staff'), NE),
        row(t('Loom House'), t('Supplier · products and stock'), t('12 products'), t('Supplier'), PE),
      ],
      foot: '',
    },
    {
      id: 'reports',
      label: t('Reports'),
      title: t('Reports that answer the obvious questions'),
      lead: t('What came in, what sold, where it went and how much tax you owe.'),
      plan: t('Home numbers on every plan. The 4 reports from Growth. Export from Growth Pro. Custom on Business.'),
      items: [
        F('Home numbers', 'All plans', 'Takings, orders and visitors today, on the first screen.'),
        F('Takings', 'Growth', 'By day, week or month, with refunds taken off.'),
        F('What sold', 'Growth', 'Products and versions, so you know what to restock.'),
        F('Markets', 'Growth', 'Where orders come from, in each currency.'),
        F('Tax', 'Growth', 'Collected by market and rate, ready to file.'),
        F('Supplier report', 'Growth Pro', 'Sales per supplier for settling up.'),
        F('Export any report', 'Growth Pro', 'CSV for your spreadsheet or accountant.'),
        F('Custom reports', 'Business', 'Pick the columns, filters and period, and save it.'),
      ],
      mockTitle: t('Takings · last 7 days'),
      mockSub: t('Sample data'),
      isBars: true,
      bars: [52, 64, 48, 80, 72, 96, 60].map((h, i) => ({ h: h + '%', l: dayLetters[i], c: i === 5 ? '#EC844F' : 'var(--head,#0A2A4A)' })),
      rows: [],
      foot: '',
    },
    {
      id: 'billing',
      label: t('Plans and billing'),
      title: t('Plans that don’t punish you for growing'),
      lead: t('Start free, try everything, and change plans without losing work.'),
      plan: t('Every plan. Nothing you made is ever deleted when you move down.'),
      items: [
        F('Starter, free forever', 'All plans', 'A real shop with 10 products, for as long as you like.'),
        F('10-day trial of Business', 'All plans', 'Every feature, no credit card. We remind you before it ends.'),
        F('Upgrade now, downgrade later', 'All plans', 'Upgrades start straight away; downgrades at the end of the period.'),
        F('Choose what to keep', 'All plans', 'Over a limit after a downgrade? Pick what stays live. The rest is paused, not deleted.'),
        F('Monthly or yearly', 'All plans', 'Yearly costs half the monthly price.'),
        F('Invoices', 'All plans', 'Downloadable, with your business details and tax ID.'),
        F('Past due, not locked out', 'All plans', 'If a payment fails you can still see everything; changes wait until it’s fixed.'),
        F('Cancel any time', 'All plans', 'From Billing, with a clear note on what happens to the shop and domain.'),
      ],
      mockTitle: t('Billing'),
      mockSub: t('Growth Pro · yearly'),
      rows: [
        row(t('Plan'), t('Growth Pro'), '', t('Active'), OK),
        row(t('Next invoice'), t('1 October 2027')),
        row(t('Card'), t('Visa ending 4417')),
        row(t('Trial'), t('Ended · you chose Growth Pro')),
      ],
      foot: t('Change plan · Download invoices · Cancel'),
    },
  ];

  return groups.map((g, i) => ({
    ...g,
    n: String(i + 1).padStart(2, '0'),
    items: g.items.map((x) => ({ ...x, free: x.p === 'All plans' })),
  }));
}

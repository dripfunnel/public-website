// Fixed lists for the Home page, copied from the original design (the script at the bottom of the file).
// Texts here are English; components/pages/Home.jsx passes each one through ctx.t().

// The original shows "Merchant logo" and "Testimonial placeholder" boxes until the owner supplies real logos and quotes
// (docs/design.md: "Other pictures ... the owner will supply them later"). Set to false to hide them.
export const SHOW_PLACEHOLDERS = true;

// "03 What you get": [title, text, page]. The text of "Sell in many countries" has a {tax} placeholder (VAT, GST or Sales tax).
export const HOME_FEATURES = [
  ['AI designs your whole store', 'Homepage, pages, menus, product pages and the look of every one. Preview, publish, undo.', 'ai'],
  ['Zero fees on your orders', 'On every plan, including Starter. You pay only your payment provider’s own fee.', 'pricing'],
  ['Start free', 'Starter is free forever. Paid plans start with 10 days of everything in Business, no credit card.', 'pricing'],
  ['A catalogue that does the detail', 'Sizes and colours, A+ content, product video, size charts, collections and filters. Import from a spreadsheet or Shopify.', 'features'],
  ['Sell in many countries', 'Markets, currencies and languages, with {tax} and other local tax, duties at checkout, and local payments and couriers.', 'features'],
  ['Offers that bring people back', 'Discount codes, automatic offers, buy X get Y, single-use codes and abandoned-cart reminders.', 'features'],
  ['Suppliers who manage their own shelf', 'Invite suppliers to add products, keep stock up to date and even pack their own orders. Approve first if you like.', 'features'],
  ['Your team, with the right keys', 'Staff accounts with Owner, Manager and Staff roles. Each sees only what their job needs.', 'features'],
];

// The side menu of the portal preview: [label, badge, selected].
export const PORTAL_NAV = [
  ['Home', '', true],
  ['Orders', '4', false],
  ['Customers', '', false],
  ['Offers', '', false],
  ['Abandoned carts', '2', false],
  ['Reports', '', false],
  ['Products', '1', false],
  ['Collections', '', false],
  ['Storefront', '', false],
  ['Settings', '', false],
  ['Billing', '', false],
];

// "01 How it works": the four steps [title, text].
export const STEPS = [
  ['Describe', 'Say what you sell and how it should feel.'],
  ['Preview', 'See before and after on desktop, tablet and phone.'],
  ['Publish', 'Approve it. Your live shop changes in about a minute.'],
  ['Undo', 'Every version is kept. Go back in one click.'],
];

// Sample version history: [version, label, date].
export const HISTORY = [
  [13, 'Calm, earthy homepage · bestsellers first', 'Today, 10:42'],
  [12, 'New page: how we make it', 'Yesterday, 16:05'],
  [11, 'Free-returns note in the footer', '28 Sep, 09:30'],
  [10, 'First version', '24 Sep, 14:12'],
];

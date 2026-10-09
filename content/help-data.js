// Help centre categories and articles, copied from the original design (HC and BODY). Plain English text: it is translated with ctx.t when the page is built.
// Only some articles have a body in the original (BODY). The others show a "Placeholder" box (stub: true) and are kept out of search results (noindex).

// [id, title, description, [[article id, article title], ...]]
export const HC = [
  ['start', 'Getting started', 'Sign up, first products, going live', [['first-store', 'Set up your store in your first 10 minutes'], ['go-live', 'Go live: what to check before you share your shop'], ['trial', 'How the 10-day trial works']]],
  ['catalogue', 'Catalogue', 'Products, versions, collections, imports', [['add-product', 'Add a product with sizes and colours'], ['import-csv', 'Import products from a spreadsheet'], ['import-shopify', 'Bring your products from Shopify']]],
  ['orders', 'Orders and shipping', 'Shipping, tracking, returns, refunds', [['ship-order', 'Ship an order and add tracking'], ['refund', 'Refund all or part of an order'], ['print', 'Print invoices, packing slips and labels']]],
  ['payments', 'Payments and tax', 'Payment methods, tax, invoices', [['connect-payments', 'Connect a payment method'], ['tax', 'How tax is worked out in each country'], ['cod', 'Offer cash on delivery']]],
  ['storefront', 'Storefront and AI', 'Describe, preview, publish, undo', [['describe', 'Describe a change to your storefront'], ['undo', 'Go back to an earlier version'], ['ai-key', 'Connect your own AI key']]],
  ['abroad', 'Selling abroad', 'Markets, currencies, languages, duties', [['add-market', 'Add a market'], ['currencies', 'Set prices per currency'], ['duties', 'Charge duties at checkout']]],
  ['team', 'Team and suppliers', 'Staff roles, suppliers, approvals', [['invite-staff', 'Invite staff and choose their role'], ['invite-supplier', 'Invite a supplier'], ['approval', 'Turn on approval for supplier products']]],
  ['billing', 'Billing and plans', 'Plans, invoices, upgrades, cancelling', [['change-plan', 'Change your plan'], ['invoices', 'Download your invoices'], ['cancel', 'Cancel your subscription']]],
];

export const BODY = {
  describe: { who: 'Owners', intro: 'Only the store owner can change the storefront. Managers and staff can look but not publish.', steps: ['In the portal, open Storefront.', 'Under Describe a change, write what you want in plain words, for example “Make the menu simpler: Shop, Our story, Help”.', 'Wait for the draft. It shows what changed and what wasn’t touched.', 'Check it on Desktop, Tablet and Phone.', 'Press Approve & publish, or Discard to throw the draft away.'], note: 'One draft at a time. Publish or discard it before asking for the next change.' },
  undo: { who: 'Owners', intro: 'Every publish is saved as a numbered version. Going back is instant and doesn’t use your AI allowance.', steps: ['Open Storefront and find History on the right.', 'Pick the version you want and press Go back to this.', 'Confirm. Your live shop switches back within a minute.'], note: 'How far back you can go depends on your plan: 7 days on Starter up to unlimited on Partner.' },
  'first-store': { who: 'Everyone', intro: 'Signing up builds your store for you. This is what to do next.', steps: ['Describe your shop on the first screen. The AI builds a first version you can change later.', 'Add your first product, or load sample products to see how things look.', 'Connect a payment method in Settings › Payments.', 'Check your shipping charges in Settings › Shipping.', 'Open your shop and place a test order.'] },
  trial: { who: 'Everyone', intro: 'New stores get everything in Business for 10 days. No credit card is needed to start.', steps: ['Use any feature during the trial. Nothing is held back.', 'We remind you before the trial ends.', 'Pick a plan, or do nothing and move to Starter (Free).', 'On Starter, choose which 10 products stay live. Nothing else is deleted; it’s paused until you upgrade.'] },
  'ship-order': { who: 'Owners, managers, staff', intro: 'Ship a whole order at once, or part of it now and the rest later.', steps: ['Open Orders and pick an order marked To ship.', 'Tick the items going in this parcel.', 'Choose the courier and add the tracking number.', 'Press Mark as shipped. The shopper gets an email with tracking.'] },
  'invite-supplier': { who: 'Owners on Business', intro: 'Suppliers add their own products and keep their stock up to date. They only ever see their own products and order lines.', steps: ['Go to Settings › Team and suppliers and press Invite a supplier.', 'Enter the supplier’s business name and their contact’s email.', 'Choose an access level: stock only, products and stock, or also packing their own orders.', 'Send the invitation. It stays open for 7 days.'], note: 'Changing a supplier’s access level can take a few minutes to take effect.' },
};

// Every article, flat: { id, t: title, cat: category title, cid: category id }
export const ALL_ARTS = HC.flatMap(([cid, ct, , arts]) => arts.map(([id, t]) => ({ id, t, cat: ct, cid })));

// One article with its body (or placeholder texts), and the other articles of its category.
export function getArticle(id) {
  const a = ALL_ARTS.find((x) => x.id === id);
  if (!a) return null;
  const body = BODY[id];
  return {
    ...a,
    who: 'Everyone',
    intro: 'Placeholder: a short line on what this article helps with.',
    steps: [],
    note: '',
    ...(body || {}),
    stub: !body,
    more: ALL_ARTS.filter((x) => x.cid === a.cid && x.id !== a.id),
  };
}

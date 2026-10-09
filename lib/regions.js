// Sample shop content and fixed prices for each region.
// Prices are fixed per currency (not converted with exchange rates). They are kept here, in one place,
// so they can later come from the back end. See docs/overview.md.
//
// India and United States content is copied from the original design. The original had Germany / EUR;
// that is replaced by the United Arab Emirates / AED. The AED wording and AED prices are PLACEHOLDERS
// (US price x 3.67, rounded) until the owner supplies the real ones (docs/overview.md, open question 2).

export const REG = {
  USD: { country: 'United States', store: 'Juniper & Co.', slug: 'juniper-co', city: 'Portland', owner: 'Farhan', tax: 'Sales tax', taxLine: 'Sales tax worked out by state and added at checkout', price: 'Prices shown before tax', pay: 'Stripe, PayPal', couriers: 'USPS, UPS, FedEx', compare: 'MSRP only. No made-up “was” prices', code: 'HTS code, optional', units: 'lb and in · sizes S–XL', items: [['Linen napkins, set of 4', 38], ['Table runner', 54], ['Waffle hand towel', 26], ['Stonewashed throw', 120]], today: 1284, after: { headline: 'Linen for slow mornings', sub: 'Hand-dyed in Portland. Free returns within 30 days.', cta: 'Shop bestsellers', accent: '#3F5E4A', bg: '#EEF0E8', fg: '#1E2A22', tile: '#D9DECF', bar: '#F7F7F2', nav: 'New in · Bestsellers · Our story · Cart' }, prompt: 'We sell hand-dyed linen for the home, made in Portland. Calm and earthy, lots of white space. Put bestsellers first and add a page about how we dye our fabric.' },
  AED: { country: 'United Arab Emirates', store: 'Noor Linen House', slug: 'noor-linen-house', city: 'Dubai', owner: 'Farhan', tax: 'VAT', taxLine: 'VAT at 5%, included in every price', price: 'Prices shown with VAT', pay: 'Stripe, Tabby, Apple Pay, cash on delivery', couriers: 'Aramex, Emirates Post, DHL', compare: 'Compare-at price only if it was your real price', code: 'HS code, optional', units: 'kg and cm · sizes S–XL', items: [['Linen napkins, set of 4', 140], ['Table runner', 199], ['Waffle hand towel', 95], ['Stonewashed throw', 440]], today: 4710, after: { headline: 'Linen for slow evenings', sub: 'Hand-dyed in Dubai. Free returns within 30 days.', cta: 'Shop bestsellers', accent: '#3F5E4A', bg: '#EEF0E8', fg: '#1E2A22', tile: '#D9DECF', bar: '#F7F7F2', nav: 'New in · Bestsellers · Our story · Cart' }, prompt: 'We sell hand-dyed linen for the home, made in Dubai and sold across the Gulf. Calm and earthy, lots of white space. Put bestsellers first and add a page about our workshop.' },
  INR: { country: 'India', store: 'Kesari Threads', slug: 'kesari-threads', city: 'Jaipur', owner: 'Farhan', tax: 'GST', taxLine: 'GST at 5%, included in every price', price: 'Prices shown with GST', pay: 'Cashfree, PhonePe, cash on delivery, bank transfer', couriers: 'Shiprocket', compare: 'MRP shown, and your price can never go above it', code: 'HSN code, required', units: 'kg and cm · sizes S–XL', items: [['Block-print kurta', 1890], ['Indigo dupatta', 1250], ['Cushion covers, set of 2', 990], ['Double bedcover', 3400]], today: 48600, after: { headline: 'Printed by hand in Jaipur', sub: 'Cotton block prints in saffron and indigo. Free delivery over ₹1,500.', cta: 'Shop new arrivals', accent: '#9A3B12', bg: '#FBEBD9', fg: '#3A1A0A', tile: '#F0D2B4', bar: '#FFF8F0', nav: 'New in · Kurtas · Home · Our printers · Cart' }, prompt: 'We sell hand block-printed cotton from Jaipur. Warm and colourful, saffron and indigo. Show new arrivals first and add a page about the families who print for us.' },
};

// Currency order used where the original listed all three (INR, EUR, USD) side by side.
export const REG_ORDER = ['INR', 'AED', 'USD'];

// Plan prices per currency: [price per year, one-time storefront setup].
// Keys follow the original (starter = "Growth", growth = "Growth Pro", business = "Business").
export const PRICE_TABLE = {
  INR: { starter: [4999, 7000], growth: [6999, 9000], business: [9999, 12000] },
  USD: { starter: [96, 149], growth: [144, 199], business: [240, 299] },
  AED: { starter: [349, 549], growth: [529, 729], business: [879, 1099] },
};

// Sales tax / VAT rate used in the receipt example, and whether prices include it.
export const TAX_RATE = { USD: 0.08, AED: 0.05, INR: 0.05 };
export const TAX_INCLUDED = { USD: false, AED: true, INR: true };

// "Storefront built by our team" starting price (the Growth plan setup fee).
export const SETUP_FROM = { INR: 7000, USD: 149, AED: 549 };

export const PRICE_FOOT = {
  INR: 'Prices in Indian rupees, before GST.',
  AED: 'Prices in UAE dirhams, before VAT.',
  USD: 'Prices in US dollars, before sales tax.',
};

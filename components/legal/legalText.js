// Text of the Terms of Service and the Privacy Policy, copied from the original design (data LG).
// All texts are English; LegalPage passes each one through ctx.t(). Arabic is in content/ar/legal.js.
//
// TEMPLATE TEXT: the original is a draft that the owner's lawyer must replace. The parts in [square brackets]
// are placeholders the owner still has to provide (legal entity name, address, dates, lists, periods...). Keep them exactly.

export const LEGAL = {
  terms: {
    title: 'Terms of Service',
    other: 'Read the Privacy Policy',
    otherPage: 'privacy',
    intro: 'These terms are the agreement between you and DripFunnel when you use DripFunnel to run an online shop. They cover your account, your plan and what each of us is responsible for.',
    secs: [
      ['Who we are', 'DripFunnel is operated by [legal entity name], a Softobotics company, registered at [address].'],
      ['Your account', 'You must be old enough to form a contract where you live. You’re responsible for everyone you invite to your store, including staff and suppliers, and for keeping sign-in details safe.'],
      ['Plans, trials and billing', 'Starter is free. Paid plans start with a 10-day trial of Business. After the trial, plans are billed monthly or yearly in advance. Upgrades start straight away; downgrades take effect at the end of the billing period.'],
      ['Fees on your orders', 'DripFunnel does not charge a fee on your orders on any plan. Your payment provider charges its own fees under its own terms.'],
      ['Your shop and your content', 'You own your products, photos, words and customer relationships. You give us permission to host and display them so your shop works. You’re responsible for what you sell and for following the law in each market you sell in.'],
      ['AI-designed storefronts', 'The AI suggests designs and text. Nothing is published until you approve it, and you’re responsible for what you publish.'],
      ['Acceptable use', '[List of prohibited products and activities.]'],
      ['Cancelling and closing', 'You can cancel any time from Billing. [What happens to the shop, products, domain and data, and for how long they’re kept.]'],
      ['Liability', '[Limitation of liability, to be written by counsel.]'],
      ['Changes to these terms', 'We’ll tell you by email at least [n] days before a change that affects you.'],
      ['Contact', 'Questions about these terms: legal@dripfunnel.com.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    other: 'Read the Terms of Service',
    otherPage: 'terms',
    intro: 'This policy explains what personal data DripFunnel collects, why, and the choices you have. It covers merchants and their teams who use DripFunnel, and visitors to this website.',
    secs: [
      ['Who is responsible', '[Legal entity name], a Softobotics company, is responsible for data about merchants and website visitors. For shoppers’ data, the merchant is responsible and DripFunnel processes it on their behalf.'],
      ['What we collect', 'Account details (name, email, password), store details, billing details, and how you use the portal. [Full list.]'],
      ['Why we use it', 'To run your store, bill you, keep accounts secure, provide support and improve DripFunnel. [Legal bases per purpose.]'],
      ['Shoppers’ data', 'Orders, addresses and contact details belong to the merchant’s store. Suppliers see only what they need to ship their own items.'],
      ['Who we share it with', 'Payment providers, couriers, hosting and email providers that help run the service. [Named list of sub-processors.]'],
      ['Where it is stored', '[Regions and transfer safeguards.]'],
      ['How long we keep it', '[Retention periods.]'],
      ['Your rights', 'Depending on where you live, you can ask to see, correct, export or delete your data. [Region-specific rights, e.g. GDPR, India DPDP Act, US state laws.]'],
      ['Cookies', '[Cookies used on this website and in the portal, and how to manage them.]'],
      ['Contact', 'privacy@dripfunnel.com.'],
    ],
  },
};

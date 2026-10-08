'use client';

import React, { Component } from 'react';
import SiteView from './SiteView';

export default class Site extends Component {
  static defaultProps = { defaultTheme: 'auto', currency: 'auto', showPlaceholders: true };
  state = {
    route: '',
    theme: this.props.defaultTheme === 'dark' ? 'dark' : 'light',
    cur: ['USD', 'EUR', 'INR'].includes(this.props.currency) ? this.props.currency : 'USD',
    period: 'year',
    w: 1280,
    menu: false,
    res: false,
    heroPrompt: '',
    planF: '',
    device: 'desktop',
    dStep: 0,
    dev: 'desktop',
    liveV: 13,
    blogCat: 'All',
    q: '',
    helpCat: '',
    helpful: null,
    form: { topic: 'demo', name: '', email: '', company: '', country: '', msg: '' },
    errs: {},
    sent: false,
    faqOpen: -1,
  };
  initialTheme() {
    const p = this.props.defaultTheme;
    if (p === 'light' || p === 'dark') return p;
    try {
      const t = localStorage.getItem('df-site-theme');
      if (t) return t;
      return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }
  initialCurrency() {
    const p = this.props.currency;
    if (p && p !== 'auto') return p;
    try {
      const l = navigator.language || '';
      return /IN$/i.test(l) ? 'INR' : /^(de|fr|it|es|nl|pt)|-(DE|FR|IT|ES|NL|AT|BE|IE|PT|FI)$/i.test(l) ? 'EUR' : 'USD';
    } catch (e) {
      return 'USD';
    }
  }
  storeUrl() {
    return process.env.NEXT_PUBLIC_STORE_URL || '/portal';
  }
  parse() {
    try {
      return (location.hash || '').replace(/^#\/?/, '').split('?')[0];
    } catch (e) {
      return '';
    }
  }
  componentDidMount() {
    this._hc = () => {
      const route = this.parse();
      const t = route.split('/');
      const patch = { route, menu: false, res: false, helpful: null };
      if (t[0] === 'contact') {
        patch.sent = false;
        patch.form = { ...this.state.form, topic: ['demo', 'sales', 'partners', 'support'].includes(t[1]) ? t[1] : this.state.form.topic };
      }
      this.setState(patch);
      window.scrollTo(0, 0);
      const fr = document.querySelector('[data-frame]');
      if (fr) fr.scrollTop = 0;
    };
    this._rs = () => this.setState({ w: window.innerWidth });
    this._kd = (e) => {
      if (e.key === 'Escape' && (this.state.res || this.state.menu)) this.setState({ res: false, menu: false });
    };
    this._cl = (e) => {
      if (this.state.res && !(e.target.closest && e.target.closest('[aria-haspopup],[role=menu]'))) this.setState({ res: false });
    };
    window.addEventListener('hashchange', this._hc);
    window.addEventListener('resize', this._rs);
    window.addEventListener('keydown', this._kd);
    document.addEventListener('click', this._cl);
    this.setState({ theme: this.initialTheme(), cur: this.initialCurrency(), w: window.innerWidth });
    this._hc();
    this.paintBody();
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this._hc);
    window.removeEventListener('resize', this._rs);
    window.removeEventListener('keydown', this._kd);
    document.removeEventListener('click', this._cl);
  }
  componentDidUpdate() {
    this.paintBody();
  }
  paintBody() {
    document.body.style.background = this.state.theme === 'dark' ? '#061726' : this.state.device === 'phone' ? '#E8E2DC' : '#FDFAF7';
  }
  scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const fr = this.state.device === 'phone' ? document.querySelector('[data-frame]') : null;
    if (fr) fr.scrollTo({ top: el.getBoundingClientRect().top - fr.getBoundingClientRect().top + fr.scrollTop - 120, behavior: 'smooth' });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
  }
  renderVals() {
    const s = this.state;
    const cur = s.cur;
    const fmt = (v) =>
      new Intl.NumberFormat({ INR: 'en-IN', USD: 'en-US', EUR: 'de-DE' }[cur], {
        style: 'currency',
        currency: cur,
        maximumFractionDigits: v % 1 ? 2 : 0,
      }).format(v);
    const parts = s.route.split('/');
    const k = parts[0] || 'home';
    const known = ['home', 'ai', 'features', 'pricing', 'partners', 'blog', 'help', 'contact', 'terms', 'privacy'];
    const key = known.includes(k) ? k : 'home';
    const phone = s.device === 'phone';
    const wide = !phone && s.w >= 980;
    const REG = {
      USD: {
        country: 'United States',
        store: 'Juniper & Co.',
        slug: 'juniper-co',
        city: 'Portland',
        owner: 'Farhan',
        tax: 'Sales tax',
        taxLine: 'Sales tax worked out by state and added at checkout',
        price: 'Prices shown before tax',
        pay: 'Stripe, PayPal',
        couriers: 'USPS, UPS, FedEx',
        compare: 'MSRP only. No made-up “was” prices',
        code: 'HTS code, optional',
        units: 'lb and in · sizes S–XL',
        items: [
          ['Linen napkins, set of 4', 38],
          ['Table runner', 54],
          ['Waffle hand towel', 26],
          ['Stonewashed throw', 120],
        ],
        today: 1284,
        after: {
          headline: 'Linen for slow mornings',
          sub: 'Hand-dyed in Portland. Free returns within 30 days.',
          cta: 'Shop bestsellers',
          accent: '#3F5E4A',
          bg: '#EEF0E8',
          fg: '#1E2A22',
          tile: '#D9DECF',
          bar: '#F7F7F2',
          nav: 'New in · Bestsellers · Our story · Cart',
        },
        prompt:
          'We sell hand-dyed linen for the home, made in Portland. Calm and earthy, lots of white space. Put bestsellers first and add a page about how we dye our fabric.',
      },
      EUR: {
        country: 'Germany',
        store: 'Leinen & Licht',
        slug: 'leinen-licht',
        city: 'Berlin',
        owner: 'Farhan',
        tax: 'VAT',
        taxLine: 'VAT at 19%, included in every price',
        price: 'Prices shown with VAT',
        pay: 'Stripe, PayPal, Klarna, bank transfer',
        couriers: 'DHL, DPD, Hermes',
        compare: 'Lowest price in the last 30 days, worked out for you',
        code: 'CN code, optional',
        units: 'kg and cm · sizes 36–42',
        items: [
          ['Leinenservietten, 4er-Set', 34],
          ['Tischläufer', 49],
          ['Waffel-Handtuch', 24],
          ['Leinendecke', 109],
        ],
        today: 1176,
        after: {
          headline: 'Leinen für langsame Morgen',
          sub: 'Handgefärbt in Berlin. 30 Tage kostenlose Rücksendung.',
          cta: 'Bestseller ansehen',
          accent: '#3F5E4A',
          bg: '#EEF0E8',
          fg: '#1E2A22',
          tile: '#D9DECF',
          bar: '#F7F7F2',
          nav: 'Neu · Bestseller · Über uns · Warenkorb',
        },
        prompt:
          'We sell hand-dyed linen from Berlin, mostly to Germany and the Netherlands. Calm and earthy, lots of white space. Put bestsellers first and add a page about our workshop.',
      },
      INR: {
        country: 'India',
        store: 'Kesari Threads',
        slug: 'kesari-threads',
        city: 'Jaipur',
        owner: 'Farhan',
        tax: 'GST',
        taxLine: 'GST at 5%, included in every price',
        price: 'Prices shown with GST',
        pay: 'Cashfree, PhonePe, cash on delivery, bank transfer',
        couriers: 'Shiprocket',
        compare: 'MRP shown, and your price can never go above it',
        code: 'HSN code, required',
        units: 'kg and cm · sizes S–XL',
        items: [
          ['Block-print kurta', 1890],
          ['Indigo dupatta', 1250],
          ['Cushion covers, set of 2', 990],
          ['Double bedcover', 3400],
        ],
        today: 48600,
        after: {
          headline: 'Printed by hand in Jaipur',
          sub: 'Cotton block prints in saffron and indigo. Free delivery over ₹1,500.',
          cta: 'Shop new arrivals',
          accent: '#9A3B12',
          bg: '#FBEBD9',
          fg: '#3A1A0A',
          tile: '#F0D2B4',
          bar: '#FFF8F0',
          nav: 'New in · Kurtas · Home · Our printers · Cart',
        },
        prompt:
          'We sell hand block-printed cotton from Jaipur. Warm and colourful, saffron and indigo. Show new arrivals first and add a page about the families who print for us.',
      },
    };
    const R = REG[cur] || REG.USD;
    const go = (h) => '#/' + h;
    const navDef = [
      ['home', 'Home'],
      ['features', 'Features'],
      ['ai', 'AI Builder'],
      ['pricing', 'Pricing'],
      ['partners', 'Partners'],
    ];
    const resDef = [
      ['blog', 'Blog', 'Guides for running and growing a shop'],
      ['help', 'Help centre', 'How-to articles and support'],
      ['contact', 'Contact and demo', 'Talk to sales or book a demo'],
    ];
    const isRes = ['blog', 'help', 'contact'].includes(key);
    const toggleTheme = () => {
      const t = s.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('df-site-theme', t);
      } catch (e) {}
      this.setState({ theme: t });
    };

    // AI store mocks
    const DV = {
      desktop: { maxw: '100%', cols: 'repeat(4,minmax(0,1fr))', hfs: '24px', pad: '26px 22px', r: '10px', n: 4 },
      tablet: { maxw: '420px', cols: 'repeat(3,minmax(0,1fr))', hfs: '21px', pad: '22px 18px', r: '16px', n: 3 },
      phone: { maxw: '240px', cols: 'repeat(2,minmax(0,1fr))', hfs: '18px', pad: '18px 14px', r: '24px', n: 2 },
    };
    const dv = DV[s.dev];
    const tiles = (bg, n) => R.items.slice(0, n).map(([name, p]) => ({ name, price: fmt(p), bg }));
    const before = {
      label: 'Before',
      bg: '#FFFFFF',
      fg: '#14181F',
      accent: '#5A6472',
      headline: R.store,
      sub: 'Our shop. Say hello.',
      cta: 'Browse',
      hfont: 'Inter',
      bar: '#FFFFFF',
      nav: 'Shop · About · Cart',
      tiles: tiles('#EDEAE5', dv.n),
    };
    const after = { label: 'After', ...R.after, hfont: 'Manrope', tiles: tiles(R.after.tile, dv.n) };
    const aft = { ...after, tiles: tiles(R.after.tile, 4) };
    const H = [
      [13, 'Calm, earthy homepage · bestsellers first', 'Today, 10:42'],
      [12, 'New page: how we make it', 'Yesterday, 16:05'],
      [11, 'Free-returns note in the footer', '28 Sep, 09:30'],
      [10, 'First version', '24 Sep, 14:12'],
    ];
    const history = H.map(([v, label, date]) => ({
      v,
      label,
      date,
      isLive: v === s.liveV,
      canBack: v !== s.liveV,
      back: () => this.setState({ liveV: v }),
    }));
    const liveMsg =
      s.liveV === 13
        ? 'Version 13 is live. Pick any earlier version to go back to it.'
        : 'Version ' + s.liveV + ' is live again. Nothing else changed, and version 13 is still in your history.';
    const stepDef = [
      ['Describe', 'Say what you sell and how it should feel.'],
      ['Preview', 'See before and after on desktop, tablet and phone.'],
      ['Publish', 'Approve it. Your live shop changes in about a minute.'],
      ['Undo', 'Every version is kept. Go back in one click.'],
    ];
    const steps = stepDef.map(([t, d], i) => ({
      n: '0' + (i + 1),
      t,
      d,
      on: s.dStep === i,
      pressed: s.dStep === i ? 'true' : 'false',
      bg: s.dStep === i ? 'var(--surface,#FFFFFF)' : 'transparent',
      bd: s.dStep === i ? 'var(--border,#E8E2DC)' : 'transparent',
      mk: s.dStep === i ? '#EC844F' : 'transparent',
      numC: s.dStep === i ? 'var(--link,#B8541F)' : 'var(--field,#D7D3CD)',
      onClick: () => this.setState({ dStep: i }),
    }));
    const devs = [
      ['desktop', 'Desktop'],
      ['tablet', 'Tablet'],
      ['phone', 'Phone'],
    ].map(([kk, l]) => ({
      label: l,
      pressed: s.dev === kk ? 'true' : 'false',
      bg: s.dev === kk ? 'var(--head,#0A2A4A)' : 'transparent',
      fg: s.dev === kk ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)',
      onClick: () => this.setState({ dev: kk }),
    }));

    const IC = {
      ai: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18',
      fee: 'M19 5L5 19M6.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
      free: 'M5 12l5 5L20 7',
      box: 'M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10',
      globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z',
      tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
      truck: 'M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z',
      team: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 3.5a4 4 0 010 7.5M22 21c0-3-1.5-5-4-5.7',
      bag: 'M6 2l-3 4v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
      chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    };
    const homeFeatures = [
      [
        'ai',
        'AI designs your whole store',
        'Homepage, pages, menus, product pages and the look of every one. Preview, publish, undo.',
        'ai',
        'See how it works',
      ],
      [
        'fee',
        'Zero fees on your orders',
        'On every plan, including Starter. You pay only your payment provider’s own fee.',
        'pricing',
        'See pricing',
      ],
      [
        'free',
        'Start free',
        'Starter is free forever. Paid plans start with 10 days of everything in Business, no credit card.',
        'pricing',
        'Compare plans',
      ],
      [
        'box',
        'A catalogue that does the detail',
        'Sizes and colours, A+ content, product video, size charts, collections and filters. Import from a spreadsheet or Shopify.',
        'features',
        'Catalogue features',
      ],
      [
        'globe',
        'Sell in many countries',
        'Markets, currencies and languages, with ' + R.tax + ' and other local tax, duties at checkout, and local payments and couriers.',
        'features',
        'Selling abroad',
      ],
      [
        'tag',
        'Offers that bring people back',
        'Discount codes, automatic offers, buy X get Y, single-use codes and abandoned-cart reminders.',
        'features',
        'Offers and carts',
      ],
      [
        'truck',
        'Suppliers who manage their own shelf',
        'Invite suppliers to add products, keep stock up to date and even pack their own orders. Approve first if you like.',
        'features',
        'Suppliers',
      ],
      [
        'team',
        'Your team, with the right keys',
        'Staff accounts with Owner, Manager and Staff roles. Each sees only what their job needs.',
        'features',
        'Team and roles',
      ],
    ].map(([ic, t, d, h, l]) => ({ icon: IC[ic], t, d, href: go(h), l }));
    const pnav = [
      ['Home', '', 1],
      ['Orders', '4', 0],
      ['Customers', '', 0],
      ['Offers', '', 0],
      ['Abandoned carts', '2', 0],
      ['Reports', '', 0],
      ['Products', '1', 0],
      ['Collections', '', 0],
      ['Storefront', '', 0],
      ['Settings', '', 0],
      ['Billing', '', 0],
    ].map(([label, badge, on]) => ({
      label,
      badge,
      bg: on ? 'rgba(255,255,255,0.10)' : 'transparent',
      mk: on ? '#EC844F' : 'transparent',
      w: on ? 700 : 400,
    }));
    const wait = [
      ['4 orders to ship', 'Oldest paid 2 hours ago', 'Ship'],
      ['2 abandoned carts to remind', 'Worth ' + fmt(R.items[0][1] + R.items[3][1]), 'Remind'],
      ['1 supplier product to approve', 'Added by your supplier this morning', 'Review'],
    ].map(([t, d, a]) => ({ t, d, a }));
    const nums = [
      ['Takings today', fmt(R.today)],
      ['Orders today', '12'],
      ['Visitors today', '840'],
    ].map(([l, v]) => ({ l, v }));
    const regions = ['INR', 'EUR', 'USD'].map((c) => {
      const r = REG[c];
      const on = c === cur;
      return {
        country: r.country,
        store: r.store,
        on,
        bd: on ? '2px solid #EC844F' : '1px solid var(--border,#E8E2DC)',
        rows: [
          ['Currency', c],
          ['Tax', r.taxLine],
          ['Payments', r.pay],
          ['Couriers', r.couriers],
          ['Compare price', r.compare],
          ['Product code', r.code],
        ].map(([l, v]) => ({ l, v })),
      };
    });
    const showPh = this.props.showPlaceholders !== false;
    const RC = ['INR', 'EUR', 'USD'];
    regions.forEach((r) => {
      r.hbg = r.on ? 'var(--tint,#FDF0E8)' : 'transparent';
    });
    const regTable = ['Currency', 'Tax', 'Payments', 'Couriers', 'Compare price', 'Product code'].map((l, i) => ({
      l,
      cells: RC.map((c) => ({ v: regions[RC.indexOf(c)].rows[i].v, bg: c === cur ? 'var(--tint,#FDF0E8)' : 'transparent' })),
    }));
    const rate = { USD: 0.08, EUR: 0.19, INR: 0.05 }[cur];
    const incl = cur !== 'USD';
    const sub = R.items[0][1] + R.items[1][1];
    const tax = incl ? sub - sub / (1 + rate) : sub * rate;
    const total = incl ? sub : sub + tax;
    const receipt = {
      items: [
        [R.items[0][0], fmt(R.items[0][1])],
        [R.items[1][0], fmt(R.items[1][1])],
      ].map(([l, v]) => ({ l, v })),
      lines: [
        ['Subtotal', fmt(sub)],
        [incl ? R.tax + ' included' : R.tax + ' (sample)', fmt(Math.round(tax * 100) / 100)],
        ['Delivery', 'Free'],
        ['Payment provider', 'Their own fee'],
      ].map(([l, v]) => ({ l, v })),
      net: fmt(Math.round(total * 100) / 100),
      zero: fmt(0),
    };
    homeFeatures.forEach((f, i) => {
      f.n = String(i + 1).padStart(2, '0');
    });

    // Pricing
    const PT = {
      INR: { starter: [4999, 7000], growth: [6999, 9000], business: [9999, 12000] },
      USD: { starter: [96, 149], growth: [144, 199], business: [240, 299] },
      EUR: { starter: [96, 139], growth: [144, 189], business: [240, 279] },
    }[cur];
    const PL = [
      {
        k: 'free',
        name: 'Starter (Free)',
        for: 'Try it with real shoppers. Free for life.',
        cta: 'Start free',
        points: [
          '10 products',
          'Your shop on a DripFunnel address',
          'AI designs your shop on your own AI key',
          'Owner only',
          'No fee on your orders, ever',
        ],
      },
      {
        k: 'starter',
        name: 'Growth',
        for: 'Your first real shop, on your own domain.',
        cta: 'Start 10-day free trial',
        points: [
          '100 products',
          'Your own domain',
          '2 staff accounts',
          'Import from a spreadsheet',
          'AI designs your shop on your own AI key',
          'The 4 reports',
        ],
      },
      {
        k: 'growth',
        name: 'Growth Pro',
        for: 'A small team, more markets and a richer shop.',
        cta: 'Start 10-day free trial',
        badge: 'Most popular',
        points: [
          '5,000 products',
          'A+ content and video',
          '5 staff accounts',
          '2 markets, currencies and languages',
          'AI included, no key needed',
          'Remove “Powered by DripFunnel”',
        ],
      },
      {
        k: 'business',
        name: 'Business',
        for: 'High volume, many suppliers, selling abroad.',
        cta: 'Start 10-day free trial',
        points: [
          'Unlimited products',
          'Suppliers with full access',
          '15 staff accounts',
          '10 markets, currencies and languages',
          'Duties and import taxes at checkout',
          'Custom reports and priority support',
        ],
      },
      {
        k: 'ent',
        name: 'Partner',
        for: 'White-label, many stores, your own terms.',
        cta: 'Talk to us',
        points: [
          'Everything in Business',
          'Your brand on the portal, shops and emails',
          'Many stores under one account',
          'SSO and full API access',
          'Migration, onboarding and uptime guarantee',
          'Named account manager',
        ],
      },
    ];
    const BW = {
      free: '1 GB bandwidth a month (about 1,000–5,000 page views)',
      starter: '10 GB bandwidth a month',
      growth: '50 GB bandwidth a month',
      business: '200 GB bandwidth a month, buy more any time',
      ent: 'Bandwidth to fit your traffic',
    };
    const yearly = s.period === 'year';
    const plans = PL.map((p) => {
      const hi = p.k === 'growth';
      const dark = p.k === 'ent';
      const Y = (PT[p.k] || [])[0];
      const SET = (PT[p.k] || [])[1];
      const yrMo = Y ? Y / 12 : 0;
      const mo = Y ? (Y * 2) / 12 : 0;
      return {
        ...p,
        badge: p.badge || '',
        points: [...p.points, ...(SET ? ['Optional: we build your storefront for you, ' + fmt(SET) + ' one-time'] : []), BW[p.k]],
        price: p.k === 'free' ? 'Free' : dark ? 'Custom' : fmt(Math.round(yearly ? yrMo : mo)),
        per: Y ? '/month' : '',
        note:
          p.k === 'free'
            ? 'Forever. No card needed.'
            : dark
              ? 'Built around your business'
              : yearly
                ? fmt(Y) + ' billed yearly, after 10 free days'
                : 'Billed monthly, after 10 free days. ' + fmt(Math.round(yrMo)) + '/month if you pay yearly.',
        href: dark ? go('contact/partners') : this.storeUrl(),
        dark,
        hi,
        bg: dark ? '#0A2A4A' : 'var(--surface,#FFFFFF)',
        fg: dark ? '#FFFFFF' : 'var(--text,#14181F)',
        sub: dark ? '#B8C7D6' : 'var(--muted,#5A6472)',
        rule: dark ? 'rgba(255,255,255,0.16)' : 'var(--border,#E8E2DC)',
        tick: dark ? '#F09A6D' : 'var(--link,#B8541F)',
        bd: hi ? '2px solid #EC844F' : dark ? '1px solid #1C3F60' : '1px solid var(--border,#E8E2DC)',
        btnBg: hi ? '#EC844F' : 'transparent',
        btnFg: hi ? '#FFFFFF' : dark ? '#F09A6D' : 'var(--outline,#B8541F)',
        btnBd: hi ? '1px solid #EC844F' : dark ? '1px solid #F09A6D' : '1px solid var(--outline,#B8541F)',
        btnH: hi
          ? 'background:var(--btn-h,#D96C33);color:#FFFFFF;'
          : dark
            ? 'background:rgba(240,154,109,0.12);color:#F09A6D;'
            : 'background:var(--outline-h,#FDF0E8);color:var(--outline,#B8541F);',
      };
    });
    const Rw = (name, v, note) => ({ name, note: note || '', v });
    const G = [
      [
        'Catalogue',
        [
          Rw('Products', ['10', '100', '5,000', 'Unlimited', 'Unlimited']),
          Rw('Photos per product', ['3', '5', '25', '50', 'Custom']),
          Rw('Versions per product', ['10', '100', '100', '250', 'Custom'], 'e.g. every size × colour'),
          Rw('Collections', ['3', '25', 'Unlimited', 'Unlimited', 'Unlimited']),
          Rw('Filters and internal tags', ['✓', '✓', '✓', '✓', '✓']),
          Rw('Size charts', ['1', '2', '25', 'Unlimited', 'Unlimited']),
          Rw('Specifications and highlights', ['✓', '✓', '✓', '✓', '✓']),
          Rw('Badges', ['—', '✓', '✓', '✓', '✓']),
          Rw('FAQs and related products', ['—', '—', '✓', '✓', '✓']),
          Rw('A+ content', ['—', '—', '50 products', 'Unlimited', 'Unlimited + shared blocks']),
          Rw('Product video', ['—', '—', '✓', '✓', '✓']),
          Rw('Import from a spreadsheet', ['—', '✓', '✓', '✓', '✓']),
          Rw('Bring products from Shopify', ['—', '—', '✓', '✓', '✓']),
          Rw(
            'AI for descriptions and translations',
            ['Your own AI key', 'Your own AI key', 'Included · monthly allowance', 'Included · larger allowance', 'Custom'],
            'Same AI account as your storefront: one key, or one allowance',
          ),
          Rw('Legal and safety details', ['✓', '✓', '✓', '✓', '✓'], 'Never behind a paywall'),
        ],
      ],
      [
        'Getting started',
        [
          Rw(
            'Storefront built by our team (optional)',
            ['—', fmt(PT.starter[1]) + ' one-time', fmt(PT.growth[1]) + ' one-time', fmt(PT.business[1]) + ' one-time', 'Custom'],
            'Only if you want it. Or build it yourself with the AI, free on every plan',
          ),
        ],
      ],
      [
        'Getting paid',
        [
          Rw('DripFunnel fee on your orders', ['None', 'None', 'None', 'None', 'None'], 'We never take a cut of your sales'),
          Rw('Payment gateways', ['1', '2', 'All', 'All', 'All']),
          Rw('Cash on delivery, bank transfer', ['✓', '✓', '✓', '✓', '✓']),
          Rw(
            'Discount codes and automatic offers',
            ['3 live', '3 live', 'Unlimited', 'Unlimited', 'Unlimited'],
            'Percent, fixed, free delivery and buy X get Y on every plan',
          ),
          Rw('Customer-group offers, tiers, single-use codes', ['—', '—', '✓', '✓', '✓']),
          Rw('Offer results', ['—', '—', '✓', '✓', '✓']),
        ],
      ],
      [
        'Team and suppliers',
        [
          Rw('Staff accounts', ['Owner only', '2', '5', '15', 'Unlimited']),
          Rw('Manager role', ['—', '—', '✓', '✓', '✓']),
          Rw(
            'Suppliers',
            ['—', '—', '—', 'Unlimited · full access', 'Unlimited · full access'],
            'Stock only, products and stock, or also packing their own orders',
          ),
          Rw('Approve supplier products', ['—', '—', '—', '✓', '✓']),
          Rw('Suppliers pack their own orders', ['—', '—', '—', '✓', '✓']),
        ],
      ],
      [
        'Selling abroad',
        [
          Rw('Markets', ['Home only', 'Home only', '2', '10', 'Unlimited']),
          Rw('Currencies', ['1', '1', '2', '10', 'Unlimited'], 'Automatic conversion, or set prices yourself'),
          Rw('Languages', ['1', '1', '2', '10', 'Unlimited']),
          Rw('Price adjustment per market', ['—', '—', '✓', '✓', '✓']),
          Rw('Fixed prices per market', ['—', '—', '—', '✓', '✓']),
          Rw('Own domain per market', ['—', '—', '—', '✓', '✓']),
          Rw('Duties and import taxes at checkout', ['—', '—', '—', '✓', '✓']),
        ],
      ],
      [
        'Shipping and stock',
        [
          Rw('Stock locations', ['1', '2', '5', '10', 'Unlimited']),
          Rw('Couriers you can connect', ['1', '2', 'All', 'All', 'All']),
          Rw('Live courier rates at checkout', ['—', '—', '✓', '✓', '✓']),
          Rw('Delivery-area lists', ['✓', '✓', '✓', '✓', '✓']),
        ],
      ],
      [
        'Storefront',
        [
          Rw(
            'Monthly bandwidth',
            ['1 GB', '10 GB', '50 GB', '200 GB', 'Custom'],
            'Total data your shop sends to shoppers. 1 GB usually covers 1,000–5,000 page views a month.',
          ),
          Rw('Buy extra bandwidth', ['—', '—', '—', '✓', '✓'], 'Billed per extra GB, so your shop never slows down'),
          Rw('Your own domain', ['—', '✓', '✓', '✓', '✓']),
          Rw('Remove “Powered by DripFunnel”', ['—', '—', '✓', '✓', 'Full white-label']),
          Rw(
            'AI that designs your whole store',
            ['Your own AI key', 'Your own AI key', 'Included · monthly allowance', 'Included · larger allowance', 'Custom'],
            'Starter (Free) and Growth: connect your own AI account. Growth Pro and up: included',
          ),
          Rw('Version history', ['7 days', '30 days', '90 days', '1 year', 'Unlimited']),
          Rw(
            'Abandoned-cart reminders',
            ['You send · 1 per cart', 'You send · 1 per cart', 'Automatic · up to 3', 'Automatic · up to 3', 'Automatic · up to 3'],
            'From Growth Pro, reminders can include a single-use discount',
          ),
          Rw('Blog', ['Planned', 'Planned', 'Planned', 'Planned', 'Planned']),
        ],
      ],
      [
        'Reports',
        [
          Rw('Home numbers', ['✓', '✓', '✓', '✓', '✓']),
          Rw('Takings, what sold, markets, tax', ['—', '✓', '✓', '✓', '✓']),
          Rw('Export and supplier report', ['—', '—', '✓', '✓', '✓']),
          Rw('Custom reports', ['—', '—', '—', '✓', '✓']),
        ],
      ],
      [
        'Support and partner',
        [
          Rw('Support', ['Help centre', 'Email', 'Chat', 'Priority chat and phone', 'Named manager']),
          Rw('Uptime guarantee', ['—', '—', '—', '—', '✓']),
          Rw('White-label', ['—', '—', '—', '—', '✓']),
          Rw('Many stores, one account', ['—', '—', '—', '—', '✓']),
          Rw('SSO and full API', ['—', '—', '—', '—', '✓']),
          Rw('Migration and onboarding', ['—', '—', '—', '—', '✓']),
        ],
      ],
    ];
    const groups = G.map(([name, rows]) => ({
      name,
      rows: rows.map((r) => ({
        name: r.name,
        note: r.note,
        cells: r.v.map((v, i) => ({
          v,
          fg: v === '—' ? 'var(--muted,#5A6472)' : v === 'Planned' ? 'var(--tint-fg,#8F4017)' : 'var(--text,#14181F)',
          w: v === '✓' ? 700 : 400,
          bg: i === 2 ? 'var(--tint,#FDF0E8)' : 'transparent',
          label: v === '—' ? 'Not included' : v === '✓' ? 'Included' : v,
        })),
      })),
    }));
    const setupLine = fmt(PT.starter[1]) + ' on Growth, ' + fmt(PT.growth[1]) + ' on Growth Pro, ' + fmt(PT.business[1]) + ' on Business';
    const faqDef = [
      [
        'How does the 10-day free trial work?',
        'Every new store gets full Business access for 10 days, no credit card required. Use every feature, then pick the plan that fits. We remind you before the trial ends, and nothing you made is ever deleted.',
      ],
      [
        'Is Starter (Free) really free forever?',
        'Yes. You keep a real shop with 10 products for as long as you like. We never take a fee on your orders, on any plan.',
      ],
      [
        'What happens if I go over a limit?',
        'Nothing breaks and nothing is deleted. Everything you have keeps selling; you just can’t add more until you move up a plan.',
      ],
      [
        'Can I change plans any time?',
        'Upgrades start straight away and you pay the difference for the month. Downgrades take effect at the end of your billing period.',
      ],
      [
        'If I downgrade, do I lose my A+ content?',
        'You keep it. It’s hidden from your shop until you upgrade again, then it comes straight back.',
      ],
      [
        'What does “your own AI key” mean?',
        'On Starter (Free) and Growth you connect your own AI account (for example OpenAI or Anthropic) and pay them directly for what you use. It designs your store and writes product descriptions and translations. From Growth Pro, all of that AI is included with one monthly allowance: no key, no extra bill.',
      ],
      [
        'What happens when I run out of AI allowance?',
        'Your shop keeps working and nothing you published changes. You can wait for next month’s allowance, move up a plan, or connect your own key to keep going.',
      ],
      [
        'What is bandwidth, and what if I go over?',
        'It’s the total data your shop sends to shoppers each month: pages, photos and videos. 1 GB usually covers 1,000–5,000 page views. If you go over, your shop stays online: we tell you at 80% and 100%, and you can move up a plan. On Business you can also buy extra bandwidth, billed per GB. We never switch your shop off without warning.',
      ],
      [
        'Do I have to pay for storefront setup?',
        'No. The AI builds your storefront for free on every plan. Need help building your storefront? We’ll do it for you: our team builds your homepage, pages, menus and first products so you launch looking finished. It’s optional and paid once: ' +
          setupLine +
          '.',
      ],
      [
        'Do you charge per staff member?',
        'No. Each plan includes a number of staff accounts. Your suppliers’ users don’t count towards it.',
      ],
      [
        'What does white-label mean?',
        'On Partner, the portal, the shops and every email carry your brand, not ours. It’s for agencies and groups running shops for others.',
      ],
    ];
    const faqs = faqDef.map(([q, a], i) => ({
      q,
      a,
      open: s.faqOpen === i,
      exp: s.faqOpen === i ? 'true' : 'false',
      sign: s.faqOpen === i ? '−' : '+',
      onClick: () => this.setState({ faqOpen: s.faqOpen === i ? -1 : i }),
    }));
    const priceFoot =
      { INR: 'Prices in Indian rupees, before GST.', EUR: 'Prices in euros, before VAT.', USD: 'Prices in US dollars, before sales tax.' }[
        cur
      ] +
      ' Yearly plans cost half the monthly price. We never charge a fee on your orders. Items marked “planned” aren’t in the product yet.';
    const periods = [
      ['month', 'Monthly', ''],
      ['year', 'Yearly', 'Save 50%'],
    ].map(([kk, l, tag]) => ({
      label: l,
      tag,
      pressed: s.period === kk ? 'true' : 'false',
      bg: s.period === kk ? 'var(--head,#0A2A4A)' : 'transparent',
      fg: s.period === kk ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)',
      onClick: () => this.setState({ period: kk }),
    }));

    return {
      storeUrl: this.storeUrl(),
      theme: s.theme,
      onTheme: (e) => {
        const t = e.target.value;
        try {
          localStorage.setItem('df-site-theme', t);
        } catch (e2) {}
        this.setState({ theme: t });
      },
      devices: [
        ['desktop', 'Desktop'],
        ['phone', 'Phone'],
      ].map(([kk, l]) => ({
        label: l,
        pressed: phone === (kk === 'phone') ? 'true' : 'false',
        bg: phone === (kk === 'phone') ? '#EC844F' : 'transparent',
        fg: '#FFFFFF',
        onClick: () => this.setState({ device: kk, menu: false, res: false }),
      })),
      headH: phone ? '60px' : '72px',
      deskBg: phone ? (s.theme === 'dark' ? '#061726' : '#E8E2DC') : 'var(--paper,#FDFAF7)',
      frameAlign: phone ? 'center' : 'stretch',
      framePad: phone ? '32px 16px' : '0',
      frameStyle: phone
        ? 'width:390px;max-width:100%;height:780px;border:10px solid #14181F;border-radius:40px;overflow:auto;overscroll-behavior:contain;box-shadow:0 30px 60px rgba(10,42,74,0.25);background:var(--paper,#FDFAF7);'
        : 'display:flex;flex-direction:column;flex:1;',
      isDark: s.theme === 'dark',
      isLight: s.theme !== 'dark',
      themeLabel: s.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
      toggleTheme,
      wide,
      narrow: !wide,
      menuOpen: s.menu && !wide,
      toggleMenu: () => this.setState({ menu: !s.menu }),
      nav: navDef.map(([kk, l]) => ({
        label: l,
        href: kk === 'home' ? '#/' : go(kk),
        cur: key === kk ? 'page' : undefined,
        line: key === kk ? '#EC844F' : 'transparent',
      })),
      resNav: resDef.map(([kk, l, sub]) => ({ label: l, sub, href: go(kk) })),
      resOpen: s.res,
      resLine: isRes ? '#EC844F' : 'transparent',
      toggleRes: () => this.setState({ res: !s.res }),
      mnav: [...navDef, ...resDef].map(([kk, l]) => ({
        label: l,
        href: kk === 'home' ? '#/' : go(kk),
        cur: key === kk ? 'page' : undefined,
      })),
      cur,
      onCur: (e) => this.setState({ cur: e.target.value }),
      R,
      fmt,
      pg: Object.fromEntries(known.map((x) => [x, key === x])),
      footCols: [
        {
          h: 'Product',
          links: [
            ['Features', 'features'],
            ['AI Builder', 'ai'],
            ['Pricing', 'pricing'],
            ['Partners', 'partners'],
          ],
        },
        {
          h: 'Resources',
          links: [
            ['Blog', 'blog'],
            ['Help centre', 'help'],
            ['Contact support', 'contact/support'],
          ],
        },
        {
          h: 'Company',
          links: [
            ['Book a demo', 'contact/demo'],
            ['Talk to sales', 'contact/sales'],
            ['Become a partner', 'contact/partners'],
          ],
        },
        {
          h: 'Legal',
          links: [
            ['Terms of Service', 'terms'],
            ['Privacy Policy', 'privacy'],
          ],
        },
      ].map((c) => ({ h: c.h, links: c.links.map(([label, h]) => ({ label, href: go(h) })) })),
      heroPrompt: s.heroPrompt,
      onHeroPrompt: (e) => this.setState({ heroPrompt: e.target.value }),
      savePrompt: () => {
        try {
          localStorage.setItem('df-site-prompt', s.heroPrompt);
        } catch (e) {}
      },
      examples: [
        ['Calm and earthy', 'Make it calm and earthy, with lots of white space and big photos.'],
        ['Bestsellers first', 'Put our bestsellers at the top of the homepage and add a gift guide page.'],
        ['Our story', 'Add a page telling the story of how we started in ' + R.city + ', and link it from the menu.'],
      ].map(([short, full]) => ({ short, use: () => this.setState({ heroPrompt: full }) })),
      useRegionPrompt: () => this.setState({ heroPrompt: R.prompt }),
      before,
      after,
      aft,
      frames: [before, after],
      dv,
      devs,
      steps,
      history,
      liveMsg,
      liveV: s.liveV,
      d0: s.dStep === 0,
      d1: s.dStep === 1,
      d2: s.dStep === 2,
      d3: s.dStep === 3,
      nextStep: () => this.setState({ dStep: (s.dStep + 1) % 4 }),
      nextLabel: s.dStep === 3 ? 'Start again' : 'Next: ' + stepDef[(s.dStep + 1) % 4][0],
      heroBg: React.createElement(
        'div',
        {
          'aria-hidden': 'true',
          'data-hero-bg': '',
          key: 'hb',
          style: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 'calc(50% - 50cqw)',
            width: '100cqw',
            zIndex: -1,
            pointerEvents: 'none',
            overflow: 'hidden',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(transparent 0%, #000 12%, #000 80%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(transparent 0%, #000 12%, #000 80%, transparent 100%)',
            maskComposite: 'intersect',
          },
        },
        React.createElement(
          'svg',
          {
            viewBox: '0 0 100 100',
            preserveAspectRatio: 'none',
            style: { position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' },
          },
          ...Array.from({ length: 17 }, (_, i) => {
            const x1 = -4 + i * 6.75;
            const x2 = 50 + (x1 - 50) * 0.14;
            const d = 9 + ((i * 37) % 6);
            const del = -((i * 53) % 11);
            const pts = { x1, y1: -2, x2, y2: 104 };
            return React.createElement(
              'g',
              { key: 'f' + i },
              React.createElement('line', {
                ...pts,
                vectorEffect: 'non-scaling-stroke',
                style: { stroke: 'var(--border,#E8E2DC)', strokeWidth: 1, opacity: 'var(--fl-a,0.7)' },
              }),
              React.createElement('line', {
                ...pts,
                pathLength: 100,
                vectorEffect: 'non-scaling-stroke',
                strokeLinecap: 'round',
                style: {
                  stroke: '#EC844F',
                  strokeOpacity: 'var(--dr-a,0.56)',
                  strokeWidth: 2.2,
                  strokeDasharray: '12.5 200',
                  animation: 'dfDrip ' + d + 's cubic-bezier(.45,0,.75,1) ' + del + 's infinite',
                },
              }),
            );
          }),
        ),
      ),
      homeFeatures,
      pnav,
      wait,
      nums,
      regions,
      regTable,
      receipt,
      idxCols: wide ? '48px minmax(0,1.1fr) minmax(0,1fr) 32px' : 'minmax(0,1fr)',
      showPh,
      logoSlots: [1, 2, 3, 4, 5, 6],
      quoteSlots: [1, 2, 3],
      plans,
      heads: PL.map((p, i) => ({ name: p.name, bg: i === 2 ? 'var(--tint,#FDF0E8)' : 'transparent' })),
      groups,
      faqs,
      priceFoot,
      periods,
      setupFrom: fmt(PT.starter[1]),
      setupLine,
      ...this.pageVals(s, R, fmt, go, parts, key),
    };
  }
  pageVals(s, R, fmt, go, parts, key) {
    const OK = ['var(--okbg,#EEF7F2)', 'var(--okfg,#1D6B47)'],
      PE = ['var(--tint,#FDF0E8)', 'var(--tint-fg,#8F4017)'],
      NE = ['var(--sunk,#F3EDE8)', 'var(--text,#14181F)'];
    const row = (a, b, c, pill, col) => ({ a, b, c: c || '', pill: pill || '', pbg: (col || NE)[0], pfg: (col || NE)[1] });
    const it = R.items;
    const setupLineShort = 'from ' + fmt({ INR: 7000, USD: 149, EUR: 139 }[s.cur]) + ' one-time';
    const F = (t, p, d) => ({ t, p, d });
    const fsecs = [
      {
        id: 'storefront',
        label: 'Storefront and AI',
        title: 'A store designed from a description',
        lead: 'No themes, no templates. The AI designs the homepage, pages, menus, product pages and the look of all of them. You check, publish and can undo.',
        plan: 'Every plan. On Starter and Growth the AI runs on your own key; from Growth Pro it is included.',
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
          F('We build it for you', 'Growth', 'Optional one-time service: ' + setupLineShort + '.'),
        ],
        mockTitle: 'Storefront · draft',
        mockSub: 'v14 · not live',
        rows: [
          row('Homepage', 'Bestsellers first, new hero', 'Changed', 'Draft', PE),
          row('Menu', 'Shop · Our story · Help', 'Changed', 'Draft', PE),
          row('Products and prices', 'Not touched', '', '', null),
          row('Checkout', 'Not touched', '', '', null),
        ],
        foot: 'Approve & publish · Discard · History',
      },
      {
        id: 'catalogue',
        label: 'Catalogue',
        title: 'A catalogue that handles the detail',
        lead: 'Add a product once and sell every size and colour of it, with the content shoppers need to decide.',
        plan: 'Starter: 10 products. Growth: 100. Growth Pro: 5,000. Business: unlimited.',
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
          F('Legal and safety details', 'All plans', 'Country of origin, warnings, ' + R.code + ', MRP or MSRP. Never behind a paywall.'),
          F('Compare-at price', 'All plans', R.compare + '.'),
        ],
        mockTitle: it[0][0],
        mockSub: '8 versions · 3 languages',
        rows: [
          row('S · Natural', 'In stock at ' + R.city, fmt(it[0][1]), '24 left', OK),
          row('M · Natural', 'In stock at ' + R.city, fmt(it[0][1]), '18 left', OK),
          row('L · Indigo', 'Supplier stock', fmt(it[0][1]), '3 left', PE),
          row('XL · Indigo', 'Supplier stock', fmt(it[0][1]), 'Sold out', NE),
        ],
        foot: 'A+ content · Product video · Size chart · ' + R.code,
      },
      {
        id: 'orders',
        label: 'Orders and shipping',
        title: 'Orders, shipping and returns in one place',
        lead: 'See what to ship first, send it with your courier, and handle returns without a spreadsheet.',
        plan: 'Every plan has unlimited orders. Live courier rates from Growth Pro. 10 stock locations on Business.',
        items: [
          F('Order list and filters', 'All plans', 'To ship, unpaid, returns, by market, by supplier.'),
          F('Ship with your courier', 'All plans', R.couriers + '. Tracking goes to the shopper automatically.'),
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
        mockTitle: 'Order #1042',
        mockSub: 'Paid · 2 items',
        rows: [
          row(it[1][0], 'Qty 1', fmt(it[1][1]), 'Packed', OK),
          row(it[2][0], 'Qty 2', fmt(it[2][1] * 2), 'To ship', PE),
          row('Courier', R.couriers.split(',')[0] + ' · tracking added', '', 'Shipped', OK),
        ],
        foot: 'Print invoice · Packing slip · Label · Refund',
      },
      {
        id: 'payments',
        label: 'Payments and tax',
        title: 'Get paid the way your shoppers pay',
        lead: 'Local payment methods, local tax rules and zero DripFunnel fees on every order.',
        plan: 'Zero fees on every plan. 1 gateway on Starter, 2 on Growth, all from Growth Pro.',
        items: [
          F('Zero fees on your orders', 'All plans', 'We never take a cut of your sales. You pay only your provider.'),
          F('Payment gateways', 'All plans', R.pay + '. Connect in minutes.'),
          F('Cash on delivery and bank transfer', 'All plans', 'For markets where cards are not the norm.'),
          F('Local tax worked out', 'All plans', R.taxLine + '.'),
          F('Tax-inclusive or exclusive prices', 'All plans', 'Follows the rule of each market automatically.'),
          F('Tax report', 'Growth', 'What you owe, by market and rate.'),
          F('Shopper invoices', 'All plans', 'Numbered, with the tax detail each country needs.'),
        ],
        mockTitle: 'Payments',
        mockSub: R.country,
        rows: R.pay
          .split(',')
          .map((p, i) => row(p.trim(), i === 0 ? 'Connected' : 'Available', '', i === 0 ? 'Live' : '', i === 0 ? OK : null)),
        foot: 'DripFunnel fee: ' + fmt(0) + ' on every order',
      },
      {
        id: 'offers',
        label: 'Offers and carts',
        title: 'Offers that bring people back',
        lead: 'Run the offer you have in mind and see whether it worked. Remind shoppers who left something behind.',
        plan: '3 live offers on Starter and Growth. Unlimited offers and automatic reminders from Growth Pro.',
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
        mockTitle: 'Buy 2, get 1 free',
        mockSub: 'Automatic offer · live',
        rows: [
          row('Who', 'Everyone', '', 'Live', OK),
          row('Reminder 1', '1 hour after they leave', 'Sent', '', null),
          row('Reminder 2', '1 day after', 'Sent', '', null),
          row('Reminder 3', '3 days after, with a single-use code', 'Scheduled', 'Code', PE),
        ],
      },
      {
        id: 'abroad',
        label: 'Selling abroad',
        title: 'Sell in many countries from one shop',
        lead: 'Add a market and your shop shows the right currency, language, tax and payment methods there.',
        plan: 'Home market on Starter and Growth. 2 markets on Growth Pro, 10 on Business.',
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
        mockTitle: 'Markets',
        mockSub: '5 live',
        rows: [
          row('India', 'INR · Hindi, English', 'GST incl.', 'Live', OK),
          row('Germany', 'EUR · German', 'VAT 19% incl.', 'Live', OK),
          row('United States', 'USD · English', 'Sales tax excl.', 'Live', OK),
          row('United Arab Emirates', 'AED · Arabic, English', 'VAT 5% incl.', 'Live', OK),
          row('United Kingdom', 'GBP · English', 'VAT 20% incl.', 'Duties at checkout', PE),
        ],
      },
      {
        id: 'suppliers',
        label: 'Suppliers',
        title: 'Suppliers who manage their own shelf',
        lead: 'Let suppliers keep their own products and stock up to date, and even pack their own orders, under your rules.',
        plan: 'Business and Partner. Unlimited suppliers; their users don’t count towards your staff.',
        items: [
          F('Invite suppliers', 'Business', 'By email. The invitation creates their business and first user.'),
          F('Three access levels', 'Business', 'Stock only; products and stock; or also packing their own orders.'),
          F('Approval before going live', 'Business', 'Optional. Review, approve or send back with a reason.'),
          F('Approval for edits', 'Business', 'Decide whether an edit to a live product needs a second look.'),
          F(
            'Suppliers see only their own',
            'Business',
            'Their products, their order lines, the delivery address. Never the order total or other suppliers.',
          ),
          F('Shared record', 'Business', 'You can edit a supplier’s product and they see the change. Only price is yours alone.'),
          F('Suppliers pack their own orders', 'Business', 'Ship to your warehouse or straight to the shopper, your choice per supplier.'),
          F('Supplier returns', 'Business', 'Each supplier handles their own items; you can override.'),
          F('Supplier report', 'Business', 'What each supplier sold, by period.'),
          F('Suspend or remove', 'Business', 'Their products stay in the catalogue, paused, until you decide.'),
        ],
        mockTitle: 'Suppliers',
        mockSub: '2 active · 1 to approve',
        rows: [
          row('Loom House', 'Products and stock', '12 products', 'Active', OK),
          row('Indigo Mills', 'Also packs own orders', '31 products', 'Active', OK),
          row('New product', 'From Loom House, this morning', '', 'To approve', PE),
        ],
        foot: 'Approve · Send back with a reason',
      },
      {
        id: 'team',
        label: 'Team and security',
        title: 'Your team, with the right keys',
        lead: 'Each person sees only what their job needs, and every account is protected.',
        plan: 'Owner only on Starter. 2 staff on Growth, 5 on Growth Pro, 15 on Business.',
        items: [
          F(
            'Owner, Manager and Staff roles',
            'Growth',
            'Owner runs everything; Manager runs catalogue and orders; Staff handle orders and customers.',
          ),
          F('Manager role', 'Growth Pro', 'Day-to-day running without billing or settings.'),
          F('Invitations', 'Growth', 'Email invites that expire after 7 days. Resend or revoke any time.'),
          F('View-only where it matters', 'Growth', 'Staff can see offers and collections but not change them.'),
          F('Two-step sign-in', 'All plans', 'Authenticator app or email code, with backup codes.'),
          F('Activity in the stock history', 'All plans', 'Who changed what, and when.'),
          F('My profile', 'All plans', 'Name, email, password, appearance and time zone.'),
          F('Support access switch', 'All plans', 'Decide whether support may look at your store, and for how long.'),
        ],
        mockTitle: 'People',
        mockSub: '3 staff · 2 suppliers',
        rows: [
          row(R.owner, 'Owner', 'Everything', 'Owner', OK),
          row('Mei', 'Manager', 'Catalogue, orders, offers', 'Staff', NE),
          row('Ravi', 'Staff', 'Orders and customers', 'Staff', NE),
          row('Loom House', 'Supplier · products and stock', '12 products', 'Supplier', PE),
        ],
      },
      {
        id: 'reports',
        label: 'Reports',
        title: 'Reports that answer the obvious questions',
        lead: 'What came in, what sold, where it went and how much tax you owe.',
        plan: 'Home numbers on every plan. The 4 reports from Growth. Export from Growth Pro. Custom on Business.',
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
        mockTitle: 'Takings · last 7 days',
        mockSub: 'Sample data',
        isBars: true,
        bars: [52, 64, 48, 80, 72, 96, 60].map((hh, i) => ({
          h: hh + '%',
          l: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
          c: i === 5 ? '#EC844F' : 'var(--head,#0A2A4A)',
        })),
        rows: [],
      },
      {
        id: 'billing',
        label: 'Plans and billing',
        title: 'Plans that don’t punish you for growing',
        lead: 'Start free, try everything, and change plans without losing work.',
        plan: 'Every plan. Nothing you made is ever deleted when you move down.',
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
        mockTitle: 'Billing',
        mockSub: 'Growth Pro · yearly',
        rows: [
          row('Plan', 'Growth Pro', '', 'Active', OK),
          row('Next invoice', '1 October 2027', '', '', null),
          row('Card', 'Visa ending 4417', '', '', null),
          row('Trial', 'Ended · you chose Growth Pro', '', '', null),
        ],
        foot: 'Change plan · Download invoices · Cancel',
      },
    ].map((f, i) => ({
      isBars: false,
      foot: '',
      ...f,
      n: String(i + 1).padStart(2, '0'),
      items: f.items.map((x) => ({ ...x, pc: x.p === 'All plans' ? 'var(--okfg,#1D6B47)' : 'var(--tint-fg,#8F4017)' })),
    }));
    const PLAN_RANK = { 'All plans': 0, Growth: 1, 'Growth Pro': 2, Business: 3 };
    const PF = ['All', 'Starter (Free)', 'Growth', 'Growth Pro', 'Business', 'Partner'];
    const pfRank = { 'Starter (Free)': 0, Growth: 1, 'Growth Pro': 2, Business: 3, Partner: 3 }[s.planF];
    const fIndex = fsecs.map((g) => ({
      n: g.n,
      label: g.label,
      items: g.items.map((x) => {
        const inPlan = pfRank === undefined || PLAN_RANK[x.p] <= pfRank;
        return { t: x.t, p: x.p, pc: inPlan ? x.pc : 'var(--field,#D7D3CD)', fg: inPlan ? 'var(--text,#14181F)' : 'var(--muted,#5A6472)' };
      }),
    }));
    const allF = fsecs.flatMap((g) => g.items);
    const inCount = pfRank === undefined ? allF.length : allF.filter((x) => PLAN_RANK[x.p] <= pfRank).length;
    const POSTS = [
      {
        id: 'describe-your-shop',
        cat: 'Storefront and AI',
        title: 'How to describe your shop so the AI gets it right',
        ex: 'Three sentences do most of the work: what you sell, who buys it, and how it should feel.',
        date: '24 Sep 2026',
        mins: 5,
        body: [
          {
            h: 'Start with what you sell',
            p: 'Name the products and what makes them yours: where they’re made, what they’re made of, who makes them. “Hand block-printed cotton from Jaipur” gives the AI far more to work with than “clothes”.',
          },
          {
            h: 'Say who buys it',
            p: 'One line about your shoppers shapes the words and the layout. Gift buyers want a gift guide near the top; repeat customers want new arrivals first.',
          },
          {
            h: 'Describe the feeling, not the layout',
            p: 'Words like calm, bold, warm or playful set colours, type and spacing. You don’t need to say where the button goes. If you have brand colours, name them.',
          },
          {
            h: 'Then change one thing at a time',
            p: 'Once the first version is live, ask for small changes: a new page, a simpler menu, bestsellers first. Each one arrives as a draft you can check, and every version stays in your history.',
          },
        ],
      },
      {
        id: 'selling-to-europe',
        cat: 'Selling abroad',
        title: 'Selling into Europe: VAT, duties and what shoppers see at checkout',
        ex: 'What changes when you add a European market, and which settings to check first.',
        date: '17 Sep 2026',
        mins: 7,
      },
      {
        id: 'cart-reminders',
        cat: 'Offers',
        title: 'Abandoned-cart reminders: when to send them and what to say',
        ex: 'Three reminders, three jobs. When to add a discount, and when not to.',
        date: '9 Sep 2026',
        mins: 4,
      },
      {
        id: 'moving-from-shopify',
        cat: 'Guides',
        title: 'Moving from Shopify: what comes across and what to check',
        ex: 'Products, versions, photos and collections come with you. Here is what to look at before you switch your domain.',
        date: '2 Sep 2026',
        mins: 6,
      },
      {
        id: 'size-charts',
        cat: 'Catalogue',
        title: 'Size charts that answer the question before it’s asked',
        ex: 'Fewer returns start on the product page. How to set up charts once and reuse them.',
        date: '26 Aug 2026',
        mins: 4,
      },
      {
        id: 'suppliers',
        cat: 'Suppliers',
        title: 'Letting suppliers add products without losing control',
        ex: 'Pick the right access level, decide whether to approve, and keep your catalogue consistent.',
        date: '19 Aug 2026',
        mins: 5,
      },
    ].map((p) => ({ ...p, href: go('blog/' + p.id), meta: p.date + ' · ' + p.mins + ' min read' }));
    const cats = ['All', ...Array.from(new Set(POSTS.map((p) => p.cat)))];
    const pid = key === 'blog' ? parts[1] : '';
    const post0 = pid ? POSTS.find((p) => p.id === pid) || POSTS[0] : null;
    const post = post0 ? { ...post0, body: post0.body || [], stub: !post0.body } : null;
    const HC = [
      [
        'start',
        'Getting started',
        'Sign up, first products, going live',
        [
          ['first-store', 'Set up your store in your first 10 minutes'],
          ['go-live', 'Go live: what to check before you share your shop'],
          ['trial', 'How the 10-day trial works'],
        ],
      ],
      [
        'catalogue',
        'Catalogue',
        'Products, versions, collections, imports',
        [
          ['add-product', 'Add a product with sizes and colours'],
          ['import-csv', 'Import products from a spreadsheet'],
          ['import-shopify', 'Bring your products from Shopify'],
        ],
      ],
      [
        'orders',
        'Orders and shipping',
        'Shipping, tracking, returns, refunds',
        [
          ['ship-order', 'Ship an order and add tracking'],
          ['refund', 'Refund all or part of an order'],
          ['print', 'Print invoices, packing slips and labels'],
        ],
      ],
      [
        'payments',
        'Payments and tax',
        'Payment methods, tax, invoices',
        [
          ['connect-payments', 'Connect a payment method'],
          ['tax', 'How tax is worked out in each country'],
          ['cod', 'Offer cash on delivery'],
        ],
      ],
      [
        'storefront',
        'Storefront and AI',
        'Describe, preview, publish, undo',
        [
          ['describe', 'Describe a change to your storefront'],
          ['undo', 'Go back to an earlier version'],
          ['ai-key', 'Connect your own AI key'],
        ],
      ],
      [
        'abroad',
        'Selling abroad',
        'Markets, currencies, languages, duties',
        [
          ['add-market', 'Add a market'],
          ['currencies', 'Set prices per currency'],
          ['duties', 'Charge duties at checkout'],
        ],
      ],
      [
        'team',
        'Team and suppliers',
        'Staff roles, suppliers, approvals',
        [
          ['invite-staff', 'Invite staff and choose their role'],
          ['invite-supplier', 'Invite a supplier'],
          ['approval', 'Turn on approval for supplier products'],
        ],
      ],
      [
        'billing',
        'Billing and plans',
        'Plans, invoices, upgrades, cancelling',
        [
          ['change-plan', 'Change your plan'],
          ['invoices', 'Download your invoices'],
          ['cancel', 'Cancel your subscription'],
        ],
      ],
    ];
    const BODY = {
      describe: {
        who: 'Owners',
        intro: 'Only the store owner can change the storefront. Managers and staff can look but not publish.',
        steps: [
          'In the portal, open Storefront.',
          'Under Describe a change, write what you want in plain words, for example “Make the menu simpler: Shop, Our story, Help”.',
          'Wait for the draft. It shows what changed and what wasn’t touched.',
          'Check it on Desktop, Tablet and Phone.',
          'Press Approve & publish, or Discard to throw the draft away.',
        ],
        note: 'One draft at a time. Publish or discard it before asking for the next change.',
      },
      undo: {
        who: 'Owners',
        intro: 'Every publish is saved as a numbered version. Going back is instant and doesn’t use your AI allowance.',
        steps: [
          'Open Storefront and find History on the right.',
          'Pick the version you want and press Go back to this.',
          'Confirm. Your live shop switches back within a minute.',
        ],
        note: 'How far back you can go depends on your plan: 7 days on Starter up to unlimited on Partner.',
      },
      'first-store': {
        who: 'Everyone',
        intro: 'Signing up builds your store for you. This is what to do next.',
        steps: [
          'Describe your shop on the first screen. The AI builds a first version you can change later.',
          'Add your first product, or load sample products to see how things look.',
          'Connect a payment method in Settings › Payments.',
          'Check your shipping charges in Settings › Shipping.',
          'Open your shop and place a test order.',
        ],
      },
      trial: {
        who: 'Everyone',
        intro: 'New stores get everything in Business for 10 days. No credit card is needed to start.',
        steps: [
          'Use any feature during the trial. Nothing is held back.',
          'We remind you before the trial ends.',
          'Pick a plan, or do nothing and move to Starter (Free).',
          'On Starter, choose which 10 products stay live. Nothing else is deleted; it’s paused until you upgrade.',
        ],
      },
      'ship-order': {
        who: 'Owners, managers, staff',
        intro: 'Ship a whole order at once, or part of it now and the rest later.',
        steps: [
          'Open Orders and pick an order marked To ship.',
          'Tick the items going in this parcel.',
          'Choose the courier and add the tracking number.',
          'Press Mark as shipped. The shopper gets an email with tracking.',
        ],
      },
      'invite-supplier': {
        who: 'Owners on Business',
        intro: 'Suppliers add their own products and keep their stock up to date. They only ever see their own products and order lines.',
        steps: [
          'Go to Settings › Team and suppliers and press Invite a supplier.',
          'Enter the supplier’s business name and their contact’s email.',
          'Choose an access level: stock only, products and stock, or also packing their own orders.',
          'Send the invitation. It stays open for 7 days.',
        ],
        note: 'Changing a supplier’s access level can take a few minutes to take effect.',
      },
    };
    const allArts = HC.flatMap(([cid, ct, , arts]) => arts.map(([id, t]) => ({ id, t, cat: ct, cid, href: go('help/' + id) })));
    const q = s.q.trim().toLowerCase();
    const hResults = q ? allArts.filter((a) => (a.t + ' ' + a.cat).toLowerCase().includes(q)) : [];
    const aid = key === 'help' ? parts[1] : '';
    const a0 = aid ? allArts.find((a) => a.id === aid) || allArts[0] : null;
    const hart = a0
      ? {
          ...a0,
          who: 'Everyone',
          intro: 'Placeholder: a short line on what this article helps with.',
          steps: [],
          note: '',
          ...(BODY[a0.id] || {}),
          stub: !BODY[a0.id],
          more: allArts.filter((x) => x.cid === a0.cid && x.id !== a0.id),
        }
      : null;
    const f = s.form;
    const E = s.errs;
    const setF = (k2, v) => this.setState({ form: { ...this.state.form, [k2]: v }, errs: { ...this.state.errs, [k2]: '' } });
    const T = {
      demo: [
        'Book a demo',
        'Book my demo',
        'Anything you’d like us to cover? (optional)',
        'e.g. We sell in India and want to start shipping to the UAE',
      ],
      sales: ['Sales question', 'Send to sales', 'Your question', 'e.g. Can you build our storefront for us?'],
      partners: [
        'Partners',
        'Talk to us',
        'Tell us about the shops you run',
        'e.g. We run 40 shops for clients in Germany and want them under our brand',
      ],
      support: ['Support', 'Send to support', 'What’s happening?', 'e.g. My courier tracking numbers aren’t showing on orders'],
    };
    const tp = T[f.topic] || T.demo;
    const needMsg = f.topic !== 'demo';
    const fld = (k2, label, type, ph, ac) => ({
      label,
      type,
      ph,
      ac,
      value: f[k2],
      err: E[k2] || '',
      inv: E[k2] ? 'true' : 'false',
      bd: E[k2] ? '2px solid #00325F' : '1px solid var(--field,#D7D3CD)',
      onChange: (e) => setF(k2, e.target.value),
    });
    const submit = (e) => {
      e.preventDefault();
      const x = this.state.form;
      const er = {};
      if (!x.name.trim()) er.name = 'Enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim())) er.email = 'Enter a full email address, like you@shop.com.';
      if (needMsg && !x.msg.trim()) er.msg = 'Tell us a little about what you need.';
      this.setState({ errs: er, sent: !Object.keys(er).length });
    };
    const isLegal = key === 'terms' || key === 'privacy';
    const LG = {
      terms: {
        title: 'Terms of Service',
        other: 'Read the Privacy Policy',
        otherHref: go('privacy'),
        intro:
          'These terms are the agreement between you and DripFunnel when you use DripFunnel to run an online shop. They cover your account, your plan and what each of us is responsible for.',
        secs: [
          ['Who we are', 'DripFunnel is operated by [legal entity name], a Softobotics company, registered at [address].'],
          [
            'Your account',
            'You must be old enough to form a contract where you live. You’re responsible for everyone you invite to your store, including staff and suppliers, and for keeping sign-in details safe.',
          ],
          [
            'Plans, trials and billing',
            'Starter is free. Paid plans start with a 10-day trial of Business. After the trial, plans are billed monthly or yearly in advance. Upgrades start straight away; downgrades take effect at the end of the billing period.',
          ],
          [
            'Fees on your orders',
            'DripFunnel does not charge a fee on your orders on any plan. Your payment provider charges its own fees under its own terms.',
          ],
          [
            'Your shop and your content',
            'You own your products, photos, words and customer relationships. You give us permission to host and display them so your shop works. You’re responsible for what you sell and for following the law in each market you sell in.',
          ],
          [
            'AI-designed storefronts',
            'The AI suggests designs and text. Nothing is published until you approve it, and you’re responsible for what you publish.',
          ],
          ['Acceptable use', '[List of prohibited products and activities.]'],
          [
            'Cancelling and closing',
            'You can cancel any time from Billing. [What happens to the shop, products, domain and data, and for how long they’re kept.]',
          ],
          ['Liability', '[Limitation of liability, to be written by counsel.]'],
          ['Changes to these terms', 'We’ll tell you by email at least [n] days before a change that affects you.'],
          ['Contact', 'Questions about these terms: legal@dripfunnel.com.'],
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        other: 'Read the Terms of Service',
        otherHref: go('terms'),
        intro:
          'This policy explains what personal data DripFunnel collects, why, and the choices you have. It covers merchants and their teams who use DripFunnel, and visitors to this website.',
        secs: [
          [
            'Who is responsible',
            '[Legal entity name], a Softobotics company, is responsible for data about merchants and website visitors. For shoppers’ data, the merchant is responsible and DripFunnel processes it on their behalf.',
          ],
          [
            'What we collect',
            'Account details (name, email, password), store details, billing details, and how you use the portal. [Full list.]',
          ],
          [
            'Why we use it',
            'To run your store, bill you, keep accounts secure, provide support and improve DripFunnel. [Legal bases per purpose.]',
          ],
          [
            'Shoppers’ data',
            'Orders, addresses and contact details belong to the merchant’s store. Suppliers see only what they need to ship their own items.',
          ],
          [
            'Who we share it with',
            'Payment providers, couriers, hosting and email providers that help run the service. [Named list of sub-processors.]',
          ],
          ['Where it is stored', '[Regions and transfer safeguards.]'],
          ['How long we keep it', '[Retention periods.]'],
          [
            'Your rights',
            'Depending on where you live, you can ask to see, correct, export or delete your data. [Region-specific rights, e.g. GDPR, India DPDP Act, US state laws.]',
          ],
          ['Cookies', '[Cookies used on this website and in the portal, and how to manage them.]'],
          ['Contact', 'privacy@dripfunnel.com.'],
        ],
      },
    };
    const lg = LG[key];
    const legal = lg
      ? {
          ...lg,
          secs: lg.secs.map(([h, p], i) => ({ n: i + 1, h, p, id: 'sec-' + (i + 1), jump: () => this.scrollToId('sec-' + (i + 1)) })),
        }
      : null;
    return {
      aiSteps: [
        ['Describe', 'What you sell, who buys it and how it should feel. Or one change: “add an About page”.'],
        ['Preview', 'A draft arrives with what changed and what wasn’t touched. Check desktop, tablet and phone.'],
        ['Approve', 'Nothing reaches shoppers until you say so. Don’t like it? Discard and ask again.'],
        ['Publish', 'Your live shop changes in about a minute. We check that it did.'],
        ['Undo', 'Every version is kept. Go back to any of them in one click.'],
      ].map(([t, d], i) => ({ n: '0' + (i + 1), t, d })),
      aiPrompts: [
        [R.prompt, 'Colours, type, homepage, menu, new page'],
        ['Add a page about how we make our products, and put it in the menu.', 'New page · menu'],
        ['Put our bestsellers at the top of the homepage.', 'Homepage sections'],
        ['Show the size chart above the add-to-cart button on product pages.', 'Product page layout'],
        ['Use our brand colours, deep green and cream, everywhere.', 'Look and feel on every page'],
        ['Make the menu simpler: Shop, Our story, Help.', 'Menus'],
      ].map(([p, c]) => ({ p, c })),
      aiDesigns: [
        ['Homepage', 'Sections, order and words'],
        ['Pages', 'About, story, help, gift guides'],
        ['Menus', 'Header and footer'],
        ['Product pages', 'Layout and what shows first'],
        ['Look and feel', 'Colours, type and spacing'],
      ].map(([t, d]) => ({ t, d })),
      histPlans: [
        ['Starter (Free)', '7 days'],
        ['Growth', '30 days'],
        ['Growth Pro', '90 days'],
        ['Business', '1 year'],
        ['Partner', 'Unlimited'],
      ].map(([p, v]) => ({ p, v })),
      fnav: fsecs.map((x) => ({ n: x.n, label: x.label, onClick: () => this.scrollToId(x.id) })),
      fsecs,
      featCount: allF.length,
      featFree: allF.filter((x) => x.p === 'All plans').length,
      planFilter: PF.map((p) => {
        const on = (s.planF || 'All') === p;
        return {
          label: p,
          pressed: on ? 'true' : 'false',
          bg: on ? 'var(--head,#0A2A4A)' : 'transparent',
          fg: on ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)',
          bd: on ? 'var(--head,#0A2A4A)' : 'var(--field,#D7D3CD)',
          onClick: () => this.setState({ planF: p === 'All' ? '' : p }),
        };
      }),
      fIndex,
      idxLine:
        pfRank === undefined
          ? allF.length + ' features across ' + fsecs.length + ' areas.'
          : inCount + ' of ' + allF.length + ' features are included on ' + s.planF + '. Greyed items start on a higher plan.',
      idxColumns: this.state.device === 'phone' ? 1 : s.w >= 1100 ? 3 : s.w >= 700 ? 2 : 1,
      stickyTop: this.state.device === 'phone' ? '60px' : '72px',
      mockTop: this.state.device === 'phone' ? '120px' : '136px',
      pStats: [
        ['Stores', '86'],
        ['Live', '78'],
        ['Plans', '4'],
      ].map(([l, v]) => ({ l, v })),
      pDomains: [
        ['Portal', 'store.northstar.com'],
        ['Shops', '*.shops.northstar.com'],
        ['Emails from', 'mail.northstar.com'],
      ].map(([l, v]) => ({ l, v })),
      pBlocks: [
        [
          'Your brand everywhere',
          'Merchants and their shoppers see your name, not ours.',
          ['Your logo, colours and font on the portal', 'Shops on your own domain', 'Every email sent from your own address'],
        ],
        [
          'Your plans, your prices',
          'Build plans from DripFunnel’s features and set your own prices in each currency.',
          [
            'Choose what each plan includes and its limits',
            'Set prices per currency, monthly and yearly',
            'Compare your plans side by side before publishing',
          ],
        ],
        [
          'Many stores, one account',
          'Create and run every client’s store from one partner console.',
          [
            'See every store’s plan, status and payments',
            'Help a merchant by signing in as them, with a full activity log',
            'Your team with Owner, Admin, Support, Finance and Read-only roles',
          ],
        ],
        [
          'Checked before you go live',
          'We review every partner before their first shop opens.',
          [
            'Branding, domains, plans and legal pages checked',
            'We can set up with you in a guided session',
            'Sent back with clear notes if something is missing',
          ],
        ],
      ].map(([t, d, pts], i) => ({ n: '0' + (i + 1), t, d, pts })),
      pStatement: [
        ['Collected from your 78 stores', '$4,261.40', 400],
        ['DripFunnel wholesale fee', '−$1,549.00', 400],
        ['Adjustments', '$0.00', 400],
        ['Paid to you on 1 September', '$2,712.40', 700],
      ].map(([l, v, w]) => ({ l, v, w })),
      pSteps: [
        ['Talk to us', 'Tell us how many stores and where.'],
        ['Agree terms', 'Your wholesale rate and contract.'],
        ['Set up', 'Brand, domains, plans and legal pages, on your own or with us.'],
        ['Submit', 'Send your setup for review.'],
        ['Approval', 'We check it and approve, or send it back with notes.'],
        ['Go live', 'Open your first stores under your brand.'],
      ].map(([t, d], i) => ({ n: '0' + (i + 1), t, d })),
      blogIndex: key === 'blog' && !pid,
      post,
      related: post ? POSTS.filter((p) => p.id !== post.id).slice(0, 3) : [],
      blogCats: cats.map((c) => {
        const on = s.blogCat === c;
        return {
          label: c,
          pressed: on ? 'true' : 'false',
          bg: on ? 'var(--head,#0A2A4A)' : 'transparent',
          fg: on ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)',
          bd: on ? 'var(--head,#0A2A4A)' : 'var(--border,#E8E2DC)',
          onClick: () => this.setState({ blogCat: c }),
        };
      }),
      posts: POSTS.filter((p) => s.blogCat === 'All' || p.cat === s.blogCat),
      helpIndex: key === 'help' && !aid,
      hart,
      q: s.q,
      onQ: (e) => this.setState({ q: e.target.value }),
      hasQ: !!q,
      noQ: !q,
      hResults,
      noResults: !!q && !hResults.length,
      resultLine: hResults.length + (hResults.length === 1 ? ' article' : ' articles') + ' for “' + s.q.trim() + '”',
      hcats: HC.map(([cid, t, d, arts]) => ({ t, d, arts: arts.map(([id, at]) => ({ t: at, href: go('help/' + id) })) })),
      askHelpful: s.helpful === null,
      helpfulMsg:
        s.helpful === true
          ? 'Thanks for telling us.'
          : s.helpful === false
            ? 'Sorry about that. Contact support and we’ll help directly.'
            : '',
      yesHelpful: () => this.setState({ helpful: true }),
      noHelpful: () => this.setState({ helpful: false }),
      form: f,
      errs: E,
      sent: s.sent,
      notSent: !s.sent,
      submit,
      submitLabel: tp[1],
      msgLabel: tp[2],
      msgPh: tp[3],
      msgInv: E.msg ? 'true' : 'false',
      msgBd: E.msg ? '2px solid #00325F' : '1px solid var(--field,#D7D3CD)',
      onMsg: (e) => setF('msg', e.target.value),
      onCountry: (e) => setF('country', e.target.value),
      topics: Object.keys(T).map((k2) => {
        const on = f.topic === k2;
        return {
          label: T[k2][0],
          pressed: on ? 'true' : 'false',
          bg: on ? 'var(--head,#0A2A4A)' : 'transparent',
          fg: on ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)',
          bd: on ? 'var(--head,#0A2A4A)' : 'var(--field,#D7D3CD)',
          onClick: () => this.setState({ form: { ...this.state.form, topic: k2 }, errs: {} }),
        };
      }),
      fields: [
        fld('name', 'Your name', 'text', 'e.g. Priya Sharma', 'name'),
        fld('email', 'Work email', 'email', 'you@shop.com', 'email'),
        fld('company', 'Shop or company (optional)', 'text', 'e.g. ' + R.store, 'organization'),
      ],
      countries: ['India', 'Germany', 'United States', 'United Kingdom', 'United Arab Emirates', 'France', 'Netherlands', 'Other'],
      sentTitle: 'Thanks, ' + (f.name.trim().split(' ')[0] || 'we’ve got it') + '.',
      sentBody:
        f.topic === 'demo'
          ? 'We’ll email ' + f.email + ' with times for your demo.'
          : f.topic === 'support'
            ? 'Our support team will reply to ' + f.email + '. If it’s about a live order, include the order number when we write back.'
            : 'We’ll reply to ' + f.email + ' from sales@dripfunnel.com.',
      resetForm: () => this.setState({ sent: false, form: { ...this.state.form, msg: '' } }),
      legalOn: isLegal,
      legal,
    };
  }
  render() {
    return <SiteView v={this.renderVals()} />;
  }
}

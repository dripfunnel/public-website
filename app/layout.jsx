import './globals.css';

export const metadata = {
  title: 'DripFunnel: tell us what you sell. We’ll build your store.',
  description:
    'No themes, no design skills, no code. Say what you sell and how it should feel, and DripFunnel builds your store. 0% fee on orders.',
  icons: {
    icon: [
      { url: '/assets/favicon/favicon-light-64.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/assets/favicon/favicon-dark-64.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/assets/favicon/apple-touch-icon-180.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

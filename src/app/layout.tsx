import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IS_PRODUCTION, SITE_NAME, SITE_URL, THEME_KEY } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
	description: "Describe your business and AI builds your whole store.",
	// Staging and preview builds are never indexed. Pages add their own robots tags only to hide themselves.
	robots: IS_PRODUCTION ? undefined : { index: false, follow: false },
	// One favicon per colour scheme, so the tab icon looks right in light and dark browsers.
	icons: {
		icon: [
			{ url: "/assets/favicon/round-light-64.png", type: "image/png", media: "(prefers-color-scheme: light)" },
			{ url: "/assets/favicon/round-dark-64.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
		],
		apple: "/assets/favicon/apple-touch-icon-180.png",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

// Runs before the first paint so the page never flashes the wrong theme: the saved choice,
// otherwise the device setting. Storage can be blocked, so everything is inside try/catch.
const themeScript = `(function(){var t;try{t=localStorage.getItem(${JSON.stringify(THEME_KEY)})}catch(e){}if(t!=="light"&&t!=="dark"){try{t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){t="light"}}document.documentElement.dataset.theme=t})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<link rel="preload" href="/fonts/manrope-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
				<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
			</head>
			{/* Browser extensions (Grammarly, password managers, translators, ...) often add attributes to <body> before React loads. */}
			<body suppressHydrationWarning>{children}</body>
		</html>
	);
}

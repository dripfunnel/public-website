"use client";

import { THEME_KEY } from "@/lib/site";

/** Switches light/dark by setting data-theme on <html> (the inline script in the root layout sets it first). */
function toggleTheme() {
	const root = document.documentElement;
	const next = root.dataset.theme === "dark" ? "light" : "dark";
	root.dataset.theme = next;
	try {
		localStorage.setItem(THEME_KEY, next);
	} catch {
		// Storage can be blocked. The theme then lasts until the page closes.
	}
}

/** Which icon / label shows is decided in CSS from data-theme, so there is no flash and no hydration mismatch. */
export default function ThemeToggle({ variant }: { variant: "icon" | "footer" }) {
	if (variant === "footer") {
		return (
			<button type="button" onClick={toggleTheme} className="ft-theme">
				<span className="only-light">Switch to dark mode</span>
				<span className="only-dark">Switch to light mode</span>
			</button>
		);
	}
	return (
		<button type="button" onClick={toggleTheme} className="hd-icon">
			<span className="sr-only only-light">Switch to dark mode</span>
			<span className="sr-only only-dark">Switch to light mode</span>
			<svg
				className="only-dark"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="4" />
				<path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
			</svg>
			<svg
				className="only-light"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				aria-hidden="true"
			>
				<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
			</svg>
		</button>
	);
}

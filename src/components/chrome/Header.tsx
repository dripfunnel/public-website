"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { PORTAL_URL } from "@/lib/site";
import { path } from "@/lib/routes";
import { useSite } from "@/components/site-context";
import CountrySwitcher from "./CountrySwitcher";
import ThemeToggle from "./ThemeToggle";
import { useDismiss } from "./useDismiss";

const NAV: [page: string, label: string][] = [
	["", "Home"],
	["features", "Features"],
	["ai", "AI Builder"],
	["pricing", "Pricing"],
	["partners", "Partners"],
];

const RESOURCES: [page: string, label: string, sub: string][] = [
	["blog", "Blog", "Guides for running and growing a shop"],
	["help", "Help centre", "How-to articles and support"],
	["contact", "Contact and demo", "Talk to sales or book a demo"],
];

export default function Header() {
	const { country } = useSite();
	const pathname = usePathname();
	// /in/pricing/ -> "pricing", /in/ -> ""
	const current = pathname.split("/").filter(Boolean)[1] ?? "";
	const inResources = RESOURCES.some(([page]) => page === current);

	const [menuOpen, setMenuOpen] = useState(false);
	const [resOpen, setResOpen] = useState(false);
	const resRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const closeRes = useCallback(() => setResOpen(false), []);
	const closeAll = useCallback(() => {
		setResOpen(false);
		setMenuOpen(false);
	}, []);
	useDismiss(resRef, resOpen, closeRes);
	useDismiss(headerRef, menuOpen, closeAll);

	const href = (page: string) => path(country.code, page);

	return (
		<header className="hd" ref={headerRef}>
			<div className="hd-bar">
				<Link href={href("")} aria-label="DripFunnel home" className="hd-logo" onClick={closeAll}>
					<img className="logo-l" src="/assets/dripfunnel-logo.svg" alt="" width={165} height={28} />
					<img className="logo-d" src="/assets/dripfunnel-logo-inverse.svg" alt="" width={165} height={28} />
				</Link>

				<div className="hd-wide">
					<nav aria-label="Main" className="hd-nav">
						{NAV.map(([page, label]) => (
							<Link key={page} href={href(page)} className="hd-link" aria-current={current === page ? "page" : undefined}>
								{label}
							</Link>
						))}
						<div className="hd-dd" ref={resRef}>
							<button
								type="button"
								className="hd-link"
								aria-haspopup="true"
								aria-expanded={resOpen}
								data-active={inResources}
								onClick={() => setResOpen((v) => !v)}
							>
								Resources
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
									<path d="M6 9l6 6 6-6" />
								</svg>
							</button>
							{resOpen && (
								<div role="menu" className="hd-dd-panel">
									{RESOURCES.map(([page, label, sub]) => (
										<Link key={page} role="menuitem" href={href(page)} className="hd-dd-item" onClick={closeRes}>
											<span className="hd-dd-title">{label}</span>
											<span className="hd-dd-sub">{sub}</span>
										</Link>
									))}
								</div>
							)}
						</div>
					</nav>
					<div className="hd-right">
						<CountrySwitcher variant="header" current={country.code} />
						<ThemeToggle variant="icon" />
						<a href={PORTAL_URL} className="hd-signin">
							Sign in
						</a>
						<a href={PORTAL_URL} className="hd-start">
							Start free
						</a>
					</div>
				</div>

				<div className="hd-narrow">
					<CountrySwitcher variant="header" current={country.code} />
					<ThemeToggle variant="icon" />
					<button
						type="button"
						className="hd-menu-btn"
						aria-label="Menu"
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((v) => !v)}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
							<path d="M4 7h16M4 12h16M4 17h16" />
						</svg>
					</button>
				</div>
			</div>

			{menuOpen && (
				<nav aria-label="Main" className="hd-menu">
					{[...NAV, ...RESOURCES].map(([page, label]) => (
						<Link key={page} href={href(page)} className="m-link" aria-current={current === page ? "page" : undefined} onClick={closeAll}>
							{label}
						</Link>
					))}
					<div className="hd-menu-actions">
						<a href={PORTAL_URL} className="hd-menu-signin">
							Sign in
						</a>
						<a href={PORTAL_URL} className="hd-menu-start">
							Start free
						</a>
					</div>
				</nav>
			)}
		</header>
	);
}

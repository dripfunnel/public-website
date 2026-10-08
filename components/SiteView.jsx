'use client';

import { Fragment } from 'react';
import Hv from './Hv';
import { css } from '../lib/css';

export default function SiteView({ v }) {
  return (
    <>
      <div data-site="" data-theme={v.theme} style={css(`min-height:100vh;display:flex;flex-direction:column;background:${v.deskBg};`)}>
        <div style={{ background: '#14181F', color: '#FFFFFF', fontFamily: 'Inter,sans-serif', fontSize: '13px' }}>
          <div
            style={{
              maxWidth: '1240px',
              margin: '0 auto',
              padding: '0 clamp(16px,4cqw,24px)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px 20px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono',monospace",
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#EC844F',
              }}
            >
              Prototype controls
            </span>
            <span
              role="group"
              aria-label="Device"
              style={{ display: 'flex', border: '1px solid #3A424E', borderRadius: '6px', overflow: 'hidden' }}
            >
              {v.devices.map((d, d_i) => (
                <Fragment key={d_i}>
                  <button
                    onClick={d.onClick}
                    aria-pressed={d.pressed}
                    style={css(
                      `height:28px;padding:0 12px;border:0;background:${d.bg};color:${d.fg};font-family:Inter,sans-serif;font-size:12px;cursor:pointer;`,
                    )}
                  >
                    {d.label}
                  </button>
                </Fragment>
              ))}
            </span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B8C7D6' }}>
              Currency
              <select
                value={v.cur}
                onChange={v.onCur}
                style={{
                  height: '28px',
                  border: '1px solid #3A424E',
                  borderRadius: '6px',
                  background: '#232A33',
                  color: '#FFFFFF',
                  padding: '0 8px',
                  fontFamily: 'Inter,sans-serif',
                  fontSize: '12px',
                }}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B8C7D6' }}>
              Theme
              <select
                value={v.theme}
                onChange={v.onTheme}
                style={{
                  height: '28px',
                  border: '1px solid #3A424E',
                  borderRadius: '6px',
                  background: '#232A33',
                  color: '#FFFFFF',
                  padding: '0 8px',
                  fontFamily: 'Inter,sans-serif',
                  fontSize: '12px',
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
        </div>
        <div style={css(`flex:1;display:flex;flex-direction:column;align-items:${v.frameAlign};padding:${v.framePad};`)}>
          <div data-frame="" style={css(v.frameStyle)}>
            <div
              style={{
                background: 'var(--paper,#FDFAF7)',
                color: 'var(--text,#14181F)',
                fontFamily: 'Inter,Helvetica,Arial,sans-serif',
                fontSize: '16px',
                lineHeight: '1.55',
                minHeight: '100%',
                textWrap: 'pretty',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                containerType: 'inline-size',
              }}
            >
              <a href="#main" style={{ position: 'absolute', left: '-9999px', top: '8px' }}>
                Skip to content
              </a>
              <header
                style={{
                  position: 'sticky',
                  top: '0',
                  zIndex: '30',
                  background: 'var(--paper,#FDFAF7)',
                  borderBottom: '1px solid var(--border,#E8E2DC)',
                }}
              >
                <div
                  style={css(
                    `max-width:1240px;margin:0 auto;padding:0 clamp(16px,4cqw,24px);height:${v.headH};display:flex;align-items:center;gap:24px;`,
                  )}
                >
                  <a
                    href="#/"
                    aria-label="DripFunnel home"
                    style={{ display: 'flex', alignItems: 'center', minHeight: '44px', flex: 'none' }}
                  >
                    <img
                      src="/assets/dripfunnel-logo.svg"
                      alt=""
                      style={{ height: '28px', width: 'auto', display: 'var(--logo-l,block)' }}
                    />
                    <img
                      src="/assets/dripfunnel-logo-inverse.svg"
                      alt=""
                      style={{ height: '28px', width: 'auto', display: 'var(--logo-d,none)' }}
                    />
                  </a>
                  {v.wide ? (
                    <>
                      <nav
                        aria-label="Main"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', flex: '1' }}
                      >
                        {v.nav.map((n, n_i) => (
                          <Fragment key={n_i}>
                            <Hv
                              as="a"
                              hover={{ color: 'var(--link,#B8541F)' }}
                              href={n.href}
                              aria-current={n.cur}
                              style={css(
                                `height:44px;padding:0 12px;display:flex;align-items:center;text-decoration:none;font-weight:500;font-size:15px;color:var(--text,#14181F);box-shadow:inset 0 -2px 0 ${n.line};`,
                              )}
                            >
                              {n.label}
                            </Hv>
                          </Fragment>
                        ))}
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={v.toggleRes}
                            aria-haspopup="true"
                            aria-expanded={v.resOpen}
                            style={css(
                              `height:44px;padding:0 12px;display:flex;align-items:center;gap:6px;border:0;background:transparent;font-family:Inter,sans-serif;font-weight:500;font-size:15px;color:var(--text,#14181F);cursor:pointer;box-shadow:inset 0 -2px 0 ${v.resLine};`,
                            )}
                          >
                            Resources
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </button>
                          {v.resOpen ? (
                            <>
                              <div
                                role="menu"
                                style={{
                                  position: 'absolute',
                                  top: '52px',
                                  left: '0',
                                  minWidth: '260px',
                                  background: 'var(--surface,#FFFFFF)',
                                  border: '1px solid var(--border,#E8E2DC)',
                                  borderRadius: '12px',
                                  boxShadow: '0 16px 40px rgba(10,42,74,0.16)',
                                  padding: '6px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                {v.resNav.map((r, r_i) => (
                                  <Fragment key={r_i}>
                                    <Hv
                                      as="a"
                                      hover={{ background: 'var(--sunk,#F3EDE8)', color: 'var(--text,#14181F)' }}
                                      role="menuitem"
                                      href={r.href}
                                      style={{
                                        minHeight: '44px',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        color: 'var(--text,#14181F)',
                                      }}
                                    >
                                      <span style={{ fontWeight: '600', fontSize: '15px' }}>{r.label}</span>
                                      <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)', lineHeight: '1.4' }}>{r.sub}</span>
                                    </Hv>
                                  </Fragment>
                                ))}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </nav>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Hv
                          as="button"
                          hover={{ background: 'var(--sunk,#F3EDE8)' }}
                          onClick={v.toggleTheme}
                          aria-label={v.themeLabel}
                          style={{
                            width: '44px',
                            height: '44px',
                            border: '0',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: 'var(--text,#14181F)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {v.isDark ? (
                            <>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              >
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
                              </svg>
                            </>
                          ) : null}
                          {v.isLight ? (
                            <>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              >
                                <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"></path>
                              </svg>
                            </>
                          ) : null}
                        </Hv>
                        <Hv
                          as="a"
                          hover={{ color: 'var(--link,#B8541F)' }}
                          href={v.storeUrl}
                          style={{
                            height: '44px',
                            padding: '0 12px',
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            fontWeight: '500',
                            fontSize: '15px',
                            color: 'var(--text,#14181F)',
                          }}
                        >
                          Sign in
                        </Hv>
                        <Hv
                          as="a"
                          hover={{ background: 'var(--outline-h,#FDF0E8)', color: 'var(--outline,#B8541F)' }}
                          href={v.storeUrl}
                          style={{
                            height: '44px',
                            padding: '0 18px',
                            border: '1px solid var(--outline,#B8541F)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '700',
                            fontSize: '15px',
                            color: 'var(--outline,#B8541F)',
                          }}
                        >
                          Start free
                        </Hv>
                      </div>
                    </>
                  ) : null}
                  {v.narrow ? (
                    <>
                      <span style={{ flex: '1' }}></span>
                      <button
                        onClick={v.toggleTheme}
                        aria-label={v.themeLabel}
                        style={{
                          width: '44px',
                          height: '44px',
                          border: '0',
                          borderRadius: '8px',
                          background: 'transparent',
                          color: 'var(--text,#14181F)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={v.toggleMenu}
                        aria-label="Menu"
                        aria-expanded={v.menuOpen}
                        style={{
                          width: '44px',
                          height: '44px',
                          border: '1px solid var(--border,#E8E2DC)',
                          borderRadius: '8px',
                          background: 'var(--surface,#FFFFFF)',
                          color: 'var(--text,#14181F)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        >
                          <path d="M4 7h16M4 12h16M4 17h16"></path>
                        </svg>
                      </button>
                    </>
                  ) : null}
                </div>
                {v.menuOpen ? (
                  <>
                    <nav
                      aria-label="Main"
                      style={{
                        borderTop: '1px solid var(--border,#E8E2DC)',
                        background: 'var(--paper,#FDFAF7)',
                        padding: '8px clamp(16px,4cqw,24px) 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 16px 32px rgba(10,42,74,0.12)',
                      }}
                    >
                      {v.mnav.map((n, n_i) => (
                        <Fragment key={n_i}>
                          <a
                            href={n.href}
                            aria-current={n.cur}
                            style={{
                              minHeight: '48px',
                              display: 'flex',
                              alignItems: 'center',
                              borderBottom: '1px solid var(--border,#E8E2DC)',
                              textDecoration: 'none',
                              color: 'var(--text,#14181F)',
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '700',
                              fontSize: '17px',
                            }}
                          >
                            {n.label}
                          </a>
                        </Fragment>
                      ))}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '16px' }}>
                        <a
                          href={v.storeUrl}
                          style={{
                            height: '48px',
                            border: '1px solid var(--outline,#B8541F)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '700',
                            color: 'var(--outline,#B8541F)',
                          }}
                        >
                          Sign in
                        </a>
                        <a
                          href={v.storeUrl}
                          style={{
                            height: '48px',
                            borderRadius: '8px',
                            background: '#EC844F',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '700',
                            color: '#FFFFFF',
                          }}
                        >
                          Start free
                        </a>
                      </div>
                    </nav>
                  </>
                ) : null}
              </header>
              <main id="main" style={{ flex: '1', overflowX: 'clip' }}>
                {v.pg.home ? (
                  <>
                    <section
                      data-screen-label="Home"
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        paddingLeft: 'clamp(16px,4cqw,24px)',
                        paddingRight: 'clamp(16px,4cqw,24px)',
                        paddingTop: 'clamp(28px,4cqw,48px)',
                        paddingBottom: 'clamp(40px,7cqw,96px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '24px',
                        position: 'relative',
                        isolation: 'isolate',
                      }}
                    >
                      {' '}
                      {v.heroBg}{' '}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          gap: '6px 18px',
                          fontFamily: "'IBM Plex Mono',monospace",
                          fontSize: '12px',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--muted,#5A6472)',
                        }}
                      >
                        <span>700+ merchants</span>
                        <span aria-hidden="true" style={{ color: '#EC844F' }}>
                          ●
                        </span>
                        <span>No templates</span>
                        <span aria-hidden="true" style={{ color: '#EC844F' }}>
                          ●
                        </span>
                        <span>0% fee on orders</span>
                      </div>
                      <h1
                        style={{
                          fontFamily: 'Manrope,sans-serif',
                          fontWeight: '800',
                          fontSize: 'clamp(34px,6.6cqw,84px)',
                          lineHeight: '1.02',
                          letterSpacing: '-0.04em',
                          margin: '0',
                          color: 'var(--head,#0A2A4A)',
                          maxWidth: '15ch',
                        }}
                      >
                        {'Tell Us What You Sell. We’ll Build '}
                        <span
                          style={{
                            background:
                              'linear-gradient(transparent 62%, rgba(236,132,79,0.45) 62%, rgba(236,132,79,0.45) 92%, transparent 92%)',
                            padding: '0 0.04em',
                          }}
                        >
                          Your Store.
                        </span>
                      </h1>
                      <p
                        style={{
                          margin: '0',
                          fontSize: 'clamp(16px,1.7cqw,20px)',
                          lineHeight: '1.55',
                          color: 'var(--muted,#5A6472)',
                          maxWidth: '56ch',
                        }}
                      >
                        No themes, no design skills, no code. Say what you sell and how it should feel. You get a homepage, pages, menus and
                        product pages to check, and nothing goes live until you approve it.
                      </p>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '780px',
                          background: 'var(--surface,#FFFFFF)',
                          border: '1.5px solid var(--text,#14181F)',
                          borderRadius: '12px',
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexWrap: 'wrap',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '18px',
                            color: 'var(--link,#B8541F)',
                            paddingLeft: '12px',
                          }}
                        >
                          ›
                        </span>
                        <input
                          type="text"
                          aria-label="Describe your shop"
                          value={v.heroPrompt}
                          onChange={v.onHeroPrompt}
                          placeholder="Describe your shop…"
                          style={{
                            flex: '1',
                            minWidth: '200px',
                            height: '52px',
                            border: '0',
                            borderRadius: '8px',
                            background: 'transparent',
                            padding: '0 8px',
                            fontFamily: 'Inter,sans-serif',
                            fontSize: '17px',
                            color: 'var(--text,#14181F)',
                          }}
                        />
                        <Hv
                          as="a"
                          hover={{ background: 'var(--btn-h,#D96C33)', color: '#FFFFFF' }}
                          href={v.storeUrl}
                          onClick={v.savePrompt}
                          style={{
                            height: '52px',
                            padding: '0 24px',
                            borderRadius: '8px',
                            background: '#EC844F',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '700',
                            fontSize: '16px',
                            flex: 'none',
                          }}
                        >
                          Start free
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6"></path>
                          </svg>
                        </Hv>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>Try</span>
                        {v.examples.map((x, x_i) => (
                          <Fragment key={x_i}>
                            <Hv
                              as="button"
                              hover={{ borderStyle: 'solid', borderColor: 'var(--outline,#B8541F)' }}
                              onClick={x.use}
                              style={{
                                minHeight: '44px',
                                padding: '0 14px',
                                border: '1px dashed var(--field,#D7D3CD)',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: 'var(--text,#14181F)',
                                fontFamily: 'Inter,sans-serif',
                                fontSize: '14px',
                                cursor: 'pointer',
                              }}
                            >
                              {x.short}
                            </Hv>
                          </Fragment>
                        ))}
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                        Starter is free forever. Paid plans start with 10 days of Business, no credit card.
                      </span>
                    </section>
                    <section
                      aria-label="Merchants"
                      style={{
                        borderTop: '1px solid var(--border,#E8E2DC)',
                        borderBottom: '1px solid var(--border,#E8E2DC)',
                        background: 'var(--surface,#FFFFFF)',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          paddingLeft: 'clamp(16px,4cqw,24px)',
                          paddingRight: 'clamp(16px,4cqw,24px)',
                          paddingTop: '22px',
                          paddingBottom: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px 32px',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: '18px',
                            letterSpacing: '-0.02em',
                            color: 'var(--head,#0A2A4A)',
                          }}
                        >
                          700+ merchants sell on DripFunnel
                        </span>
                        {v.showPh ? (
                          <>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                              {v.logoSlots.map((l, l_i) => (
                                <Fragment key={l_i}>
                                  <span
                                    style={{
                                      width: '112px',
                                      height: '40px',
                                      border: '1px dashed var(--field,#D7D3CD)',
                                      borderRadius: '6px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontFamily: "'IBM Plex Mono',monospace",
                                      fontSize: '9px',
                                      letterSpacing: '0.12em',
                                      textTransform: 'uppercase',
                                      color: 'var(--muted,#5A6472)',
                                    }}
                                  >
                                    Merchant logo
                                  </span>
                                </Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        paddingLeft: 'clamp(16px,4cqw,24px)',
                        paddingRight: 'clamp(16px,4cqw,24px)',
                        paddingTop: 'clamp(48px,9cqw,120px)',
                        paddingBottom: 'clamp(40px,7cqw,88px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '40px',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                          gap: '14px 40px',
                          borderTop: '1px solid var(--text,#14181F)',
                          paddingTop: '20px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                          }}
                        >
                          01 — How it works
                        </span>
                        <div
                          style={{
                            gridColumn: 'span 3',
                            minWidth: 'min(100%,300px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(28px,4.4cqw,56px)',
                              lineHeight: '1.02',
                              letterSpacing: '-0.035em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                              maxWidth: '20ch',
                            }}
                          >
                            Describe, preview, publish. Undo whenever you like.
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)', maxWidth: '60ch' }}>
                            {'This is '}
                            {v.R.store}
                            {', a sample shop in '}
                            {v.R.country}. Click through the four steps.
                          </p>
                        </div>
                      </div>
                      <div
                        role="group"
                        aria-label="Steps"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                          borderTop: '1px solid var(--border,#E8E2DC)',
                        }}
                      >
                        {v.steps.map((st, st_i) => (
                          <Fragment key={st_i}>
                            <button
                              onClick={st.onClick}
                              aria-pressed={st.pressed}
                              style={css(
                                `text-align:left;padding:20px 20px 22px 0;border:0;border-top:3px solid ${st.mk};margin-top:-2px;background:transparent;color:var(--text,#14181F);cursor:pointer;display:flex;flex-direction:column;gap:6px;font-family:Inter,sans-serif;`,
                              )}
                            >
                              <span
                                style={css(
                                  `font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(36px,5cqw,64px);line-height:1;letter-spacing:-0.04em;color:${st.numC};`,
                                )}
                              >
                                {st.n}
                              </span>
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '19px' }}>{st.t}</span>
                              <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)', lineHeight: '1.5', maxWidth: '30ch' }}>
                                {st.d}
                              </span>
                            </button>
                          </Fragment>
                        ))}
                      </div>
                      <div
                        style={{
                          background: 'var(--surface,#FFFFFF)',
                          border: '1px solid var(--border,#E8E2DC)',
                          borderRadius: '12px',
                          padding: 'clamp(16px,3cqw,32px)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '18px',
                        }}
                      >
                        {v.d0 ? (
                          <>
                            <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '17px' }}>
                              Describe your shop
                            </span>
                            <div
                              style={{
                                border: '1px solid var(--field,#D7D3CD)',
                                borderRadius: '8px',
                                padding: '14px 16px',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                background: 'var(--paper,#FDFAF7)',
                              }}
                            >
                              {v.R.prompt}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <span
                                style={{
                                  fontFamily: "'IBM Plex Mono',monospace",
                                  fontSize: '11px',
                                  letterSpacing: '0.12em',
                                  textTransform: 'uppercase',
                                  color: 'var(--muted,#5A6472)',
                                }}
                              >
                                What the AI designs
                              </span>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                <span
                                  style={{ padding: '6px 12px', borderRadius: '16px', background: 'var(--sunk,#F3EDE8)', fontSize: '14px' }}
                                >
                                  Homepage
                                </span>
                                <span
                                  style={{ padding: '6px 12px', borderRadius: '16px', background: 'var(--sunk,#F3EDE8)', fontSize: '14px' }}
                                >
                                  Pages
                                </span>
                                <span
                                  style={{ padding: '6px 12px', borderRadius: '16px', background: 'var(--sunk,#F3EDE8)', fontSize: '14px' }}
                                >
                                  Menus
                                </span>
                                <span
                                  style={{ padding: '6px 12px', borderRadius: '16px', background: 'var(--sunk,#F3EDE8)', fontSize: '14px' }}
                                >
                                  Product pages
                                </span>
                                <span
                                  style={{ padding: '6px 12px', borderRadius: '16px', background: 'var(--sunk,#F3EDE8)', fontSize: '14px' }}
                                >
                                  Colours and type
                                </span>
                              </div>
                            </div>
                            <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                              The AI changes how your shop looks. It never changes your prices, stock or checkout.
                            </span>
                          </>
                        ) : null}
                        {v.d1 ? (
                          <>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                                flexWrap: 'wrap',
                              }}
                            >
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '17px' }}>
                                Draft · not on your live site
                              </span>
                              <span
                                role="group"
                                aria-label="Preview size"
                                style={{
                                  display: 'flex',
                                  border: '1px solid var(--field,#D7D3CD)',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                }}
                              >
                                {v.devs.map((w, w_i) => (
                                  <Fragment key={w_i}>
                                    <button
                                      onClick={w.onClick}
                                      aria-pressed={w.pressed}
                                      style={css(
                                        `height:44px;padding:0 14px;border:0;background:${w.bg};color:${w.fg};font-family:Inter,sans-serif;font-size:14px;cursor:pointer;`,
                                      )}
                                    >
                                      {w.label}
                                    </button>
                                  </Fragment>
                                ))}
                              </span>
                            </div>
                            <div
                              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '14px' }}
                            >
                              {v.frames.map((f, f_i) => (
                                <Fragment key={f_i}>
                                  <div
                                    style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', minWidth: '0' }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "'IBM Plex Mono',monospace",
                                        fontSize: '11px',
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: 'var(--muted,#5A6472)',
                                      }}
                                    >
                                      {f.label}
                                    </span>
                                    <div
                                      aria-hidden="true"
                                      style={css(
                                        `width:100%;max-width:${v.dv.maxw};border:6px solid #14181F;border-radius:${v.dv.r};overflow:hidden;background:#FFFFFF;color:#14181F;`,
                                      )}
                                    >
                                      <div
                                        style={css(
                                          `padding:8px 10px;display:flex;justify-content:space-between;gap:8px;font-size:10px;border-bottom:1px solid #EDEAE5;background:${f.bar};`,
                                        )}
                                      >
                                        <strong style={css(`font-family:${f.hfont},sans-serif;`)}>{v.R.store}</strong>
                                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.nav}</span>
                                      </div>
                                      <div
                                        style={css(`padding:${v.dv.pad};background:${f.bg};display:flex;flex-direction:column;gap:8px;`)}
                                      >
                                        <span
                                          style={css(
                                            `font-family:${f.hfont},sans-serif;font-weight:800;font-size:${v.dv.hfs};line-height:1.12;letter-spacing:-0.02em;color:${f.fg};`,
                                          )}
                                        >
                                          {f.headline}
                                        </span>
                                        <span style={css(`font-size:12px;color:${f.fg};`)}>{f.sub}</span>
                                        <span
                                          style={css(
                                            `align-self:flex-start;padding:6px 12px;border-radius:6px;background:${f.accent};color:#FFFFFF;font-size:12px;font-weight:700;`,
                                          )}
                                        >
                                          {f.cta}
                                        </span>
                                      </div>
                                      <div style={css(`padding:10px;display:grid;grid-template-columns:${v.dv.cols};gap:8px;`)}>
                                        {f.tiles.map((t, t_i) => (
                                          <Fragment key={t_i}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                                              <span style={css(`aspect-ratio:4/5;border-radius:4px;background:${t.bg};`)}></span>
                                              <span style={{ fontSize: '10px', lineHeight: '1.3' }}>{t.name}</span>
                                              <span style={{ fontSize: '10px', fontWeight: '700' }}>{t.price}</span>
                                            </div>
                                          </Fragment>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px' }}>
                              <span style={{ color: 'var(--okfg,#1D6B47)' }}>
                                <strong>Changed:</strong>
                                {' colours, type, homepage, menu, new page'}
                              </span>
                              <span style={{ color: 'var(--muted,#5A6472)' }}>
                                <strong>Not touched:</strong>
                                {' products, prices, checkout'}
                              </span>
                            </div>
                          </>
                        ) : null}
                        {v.d2 ? (
                          <>
                            <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '17px' }}>
                              Approve and publish
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ height: '8px', borderRadius: '4px', background: 'var(--sunk,#F3EDE8)', overflow: 'hidden' }}>
                                <div style={{ width: '100%', height: '100%', background: '#1D6B47' }}></div>
                              </div>
                              <span style={{ fontSize: '14px', color: 'var(--okfg,#1D6B47)', fontWeight: '600' }}>
                                Version 13 is live. We checked your site and it changed.
                              </span>
                            </div>
                            <div
                              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: '12px' }}
                            >
                              <div
                                style={{
                                  border: '1px solid var(--border,#E8E2DC)',
                                  borderRadius: '12px',
                                  padding: '16px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px',
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: '11px',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: 'var(--muted,#5A6472)',
                                  }}
                                >
                                  Before you publish
                                </span>
                                <span style={{ fontSize: '15px' }}>Nothing reaches shoppers until you press approve.</span>
                              </div>
                              <div
                                style={{
                                  border: '1px solid var(--border,#E8E2DC)',
                                  borderRadius: '12px',
                                  padding: '16px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px',
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: '11px',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: 'var(--muted,#5A6472)',
                                  }}
                                >
                                  While it publishes
                                </span>
                                <span style={{ fontSize: '15px' }}>
                                  Your shop stays open. Shoppers see the old version until the new one is ready.
                                </span>
                              </div>
                              <div
                                style={{
                                  border: '1px solid var(--border,#E8E2DC)',
                                  borderRadius: '12px',
                                  padding: '16px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px',
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: '11px',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: 'var(--muted,#5A6472)',
                                  }}
                                >
                                  If something breaks
                                </span>
                                <span style={{ fontSize: '15px' }}>The draft stays a draft. Your live site doesn’t change.</span>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {v.d3 ? (
                          <>
                            <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '17px' }}>History</span>
                            <div style={{ border: '1px solid var(--border,#E8E2DC)', borderRadius: '12px', overflow: 'hidden' }}>
                              {v.history.map((h, h_i) => (
                                <Fragment key={h_i}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '12px',
                                      padding: '12px 16px',
                                      borderBottom: '1px solid var(--border,#E8E2DC)',
                                      fontSize: '14px',
                                      flexWrap: 'wrap',
                                    }}
                                  >
                                    <span style={{ flex: '1', minWidth: '180px', display: 'flex', flexDirection: 'column' }}>
                                      <strong>
                                        v{h.v}
                                        {' · '}
                                        {h.label}
                                      </strong>
                                      <span style={{ color: 'var(--muted,#5A6472)', fontSize: '13px' }}>
                                        {h.date}
                                        {' · '}
                                        {v.R.owner}
                                      </span>
                                    </span>
                                    {h.isLive ? (
                                      <>
                                        <span
                                          style={{
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            padding: '3px 10px',
                                            borderRadius: '12px',
                                            background: 'var(--okbg,#EEF7F2)',
                                            color: 'var(--okfg,#1D6B47)',
                                          }}
                                        >
                                          Live
                                        </span>
                                      </>
                                    ) : null}
                                    {h.canBack ? (
                                      <>
                                        <Hv
                                          as="button"
                                          hover={{ background: 'var(--outline-h,#FDF0E8)' }}
                                          onClick={h.back}
                                          style={{
                                            height: '44px',
                                            padding: '0 14px',
                                            border: '1px solid var(--outline,#B8541F)',
                                            borderRadius: '8px',
                                            background: 'transparent',
                                            color: 'var(--outline,#B8541F)',
                                            fontFamily: 'Inter,sans-serif',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                          }}
                                        >
                                          Go back to this
                                        </Hv>
                                      </>
                                    ) : null}
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                            <span role="status" style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                              {v.liveMsg}
                            </span>
                          </>
                        ) : null}
                        <button
                          onClick={v.nextStep}
                          style={{
                            alignSelf: 'flex-start',
                            height: '44px',
                            padding: '0',
                            border: '0',
                            background: 'transparent',
                            color: 'var(--link,#B8541F)',
                            fontFamily: 'Inter,sans-serif',
                            fontWeight: '500',
                            fontSize: '15px',
                            cursor: 'pointer',
                          }}
                        >
                          {v.nextLabel}
                          {' →'}
                        </button>
                      </div>
                    </section>
                    <section style={{ background: 'var(--sunk,#F3EDE8)' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          paddingLeft: 'clamp(16px,4cqw,24px)',
                          paddingRight: 'clamp(16px,4cqw,24px)',
                          paddingTop: 'clamp(48px,9cqw,120px)',
                          paddingBottom: 'clamp(48px,9cqw,120px)',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
                          gap: 'clamp(32px,6cqw,88px)',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono',monospace",
                              fontSize: '12px',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: 'var(--muted,#5A6472)',
                            }}
                          >
                            02 — Fees
                          </span>
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(30px,5cqw,64px)',
                              lineHeight: '1',
                              letterSpacing: '-0.04em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                            }}
                          >
                            Read the last line of the receipt.
                          </h2>
                          <p style={{ margin: '0', fontSize: '18px', color: 'var(--muted,#5A6472)', maxWidth: '46ch' }}>
                            DripFunnel takes nothing from your orders, on every plan, including Starter. You pay your payment provider’s own
                            fee and that’s it.
                          </p>
                          <dl
                            style={{
                              margin: '8px 0 0',
                              display: 'flex',
                              flexDirection: 'column',
                              borderTop: '1px solid var(--text,#14181F)',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '16px',
                                padding: '14px 0',
                                borderBottom: '1px solid var(--border,#E8E2DC)',
                                flexWrap: 'wrap',
                              }}
                            >
                              <dt style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700' }}>Starter</dt>
                              <dd style={{ margin: '0', color: 'var(--muted,#5A6472)' }}>Free forever · 10 products</dd>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '16px',
                                padding: '14px 0',
                                borderBottom: '1px solid var(--border,#E8E2DC)',
                                flexWrap: 'wrap',
                              }}
                            >
                              <dt style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700' }}>Paid plans</dt>
                              <dd style={{ margin: '0', color: 'var(--muted,#5A6472)' }}>10 days of Business first, no card</dd>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '16px',
                                padding: '14px 0',
                                borderBottom: '1px solid var(--border,#E8E2DC)',
                                flexWrap: 'wrap',
                              }}
                            >
                              <dt style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700' }}>Changing plan</dt>
                              <dd style={{ margin: '0', color: 'var(--muted,#5A6472)' }}>Upgrades now · downgrades at period end</dd>
                            </div>
                          </dl>
                          <a href="#/pricing" style={{ minHeight: '44px', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                            {'See plans and prices in '}
                            {v.cur}
                            {' →'}
                          </a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <div
                            aria-label="Sample order receipt"
                            role="img"
                            style={{
                              width: '100%',
                              maxWidth: '380px',
                              background: '#FFFFFF',
                              color: '#14181F',
                              padding: '36px 28px 40px',
                              fontFamily: "'IBM Plex Mono',monospace",
                              fontSize: '13px',
                              lineHeight: '1.5',
                              transform: 'rotate(-1.5deg)',
                              filter: 'drop-shadow(0 18px 28px rgba(10,42,74,0.16))',
                              webkitMask:
                                'conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/14px 51% repeat-x,conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/14px 51% repeat-x',
                              mask: 'conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/14px 51% repeat-x,conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/14px 51% repeat-x',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                            }}
                          >
                            <span
                              style={{
                                textAlign: 'center',
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '800',
                                fontSize: '18px',
                                letterSpacing: '-0.01em',
                              }}
                            >
                              {v.R.store}
                            </span>
                            <span style={{ textAlign: 'center', color: '#5A6472', fontSize: '11px' }}>
                              {'Order #1042 · '}
                              {v.R.city}
                            </span>
                            <span style={{ borderTop: '1px dashed #B8BEC6', margin: '10px 0 6px' }}></span>
                            {v.receipt.items.map((r, r_i) => (
                              <Fragment key={r_i}>
                                <span style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                  <span>{r.l}</span>
                                  <span>{r.v}</span>
                                </span>
                              </Fragment>
                            ))}
                            <span style={{ borderTop: '1px dashed #B8BEC6', margin: '6px 0' }}></span>
                            {v.receipt.lines.map((r, r_i) => (
                              <Fragment key={r_i}>
                                <span style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', color: '#434A55' }}>
                                  <span>{r.l}</span>
                                  <span style={{ textAlign: 'right' }}>{r.v}</span>
                                </span>
                              </Fragment>
                            ))}
                            <span style={{ borderTop: '1px dashed #B8BEC6', margin: '6px 0' }}></span>
                            <span
                              style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '500', fontSize: '14px' }}
                            >
                              <span>Shopper paid</span>
                              <span>{v.receipt.net}</span>
                            </span>
                            <span
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '12px',
                                marginTop: '10px',
                                padding: '10px 12px',
                                border: '2px solid #EC844F',
                                borderRadius: '6px',
                                fontWeight: '500',
                                fontSize: '14px',
                              }}
                            >
                              <span>DripFunnel fee</span>
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '20px', color: '#B8541F' }}>
                                {v.receipt.zero}
                              </span>
                            </span>
                            <span style={{ textAlign: 'center', color: '#5A6472', fontSize: '11px', marginTop: '12px' }}>
                              Sample order · thank you for shopping small
                            </span>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        paddingLeft: 'clamp(16px,4cqw,24px)',
                        paddingRight: 'clamp(16px,4cqw,24px)',
                        paddingTop: 'clamp(48px,9cqw,120px)',
                        paddingBottom: 'clamp(40px,7cqw,88px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                          gap: '14px 40px',
                          borderTop: '1px solid var(--text,#14181F)',
                          paddingTop: '20px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                          }}
                        >
                          03 — What you get
                        </span>
                        <div
                          style={{
                            gridColumn: 'span 3',
                            minWidth: 'min(100%,300px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(28px,4.4cqw,56px)',
                              lineHeight: '1.02',
                              letterSpacing: '-0.035em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                              maxWidth: '20ch',
                            }}
                          >
                            Everything a shop needs, in one portal.
                          </h2>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {v.homeFeatures.map((f, f_i) => (
                          <Fragment key={f_i}>
                            <Hv
                              as="a"
                              hover={{ color: 'var(--link,#B8541F)' }}
                              href={f.href}
                              style={css(
                                `display:grid;grid-template-columns:${v.idxCols};gap:6px 32px;padding:24px 0;border-bottom:1px solid var(--border,#E8E2DC);text-decoration:none;color:var(--text,#14181F);align-items:baseline;`,
                              )}
                            >
                              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px', color: 'var(--muted,#5A6472)' }}>
                                {f.n}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'Manrope,sans-serif',
                                  fontWeight: '800',
                                  fontSize: 'clamp(19px,2.6cqw,32px)',
                                  lineHeight: '1.15',
                                  letterSpacing: '-0.025em',
                                }}
                              >
                                {f.t}
                              </span>
                              <span style={{ fontSize: '16px', color: 'var(--muted,#5A6472)', lineHeight: '1.55' }}>{f.d}</span>
                              <span aria-hidden="true" style={{ fontSize: '22px', color: 'var(--link,#B8541F)', textAlign: 'right' }}>
                                →
                              </span>
                            </Hv>
                          </Fragment>
                        ))}
                      </div>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        paddingLeft: 'clamp(16px,4cqw,24px)',
                        paddingRight: 'clamp(16px,4cqw,24px)',
                        paddingTop: 'clamp(32px,6cqw,72px)',
                        paddingBottom: 'clamp(48px,9cqw,120px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                          gap: '14px 40px',
                          borderTop: '1px solid var(--text,#14181F)',
                          paddingTop: '20px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                          }}
                        >
                          04 — Your portal
                        </span>
                        <div
                          style={{
                            gridColumn: 'span 3',
                            minWidth: 'min(100%,300px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(28px,4.4cqw,56px)',
                              lineHeight: '1.02',
                              letterSpacing: '-0.035em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                              maxWidth: '20ch',
                            }}
                          >
                            Open it and see what needs you.
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)', maxWidth: '60ch' }}>
                            Home starts with what’s waiting: orders to ship, carts to win back, supplier products to approve. Then today’s
                            numbers.
                          </p>
                        </div>
                      </div>
                      <div
                        aria-hidden="true"
                        style={{
                          border: '1.5px solid var(--text,#14181F)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          background: 'var(--paper,#FDFAF7)',
                          display: 'flex',
                          minHeight: '420px',
                        }}
                      >
                        {v.wide ? (
                          <>
                            <div
                              style={{
                                width: '210px',
                                flex: 'none',
                                background: '#0A2A4A',
                                color: '#FFFFFF',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '16px 0',
                                gap: '1px',
                              }}
                            >
                              <img
                                src="/assets/dripfunnel-logo-inverse.svg"
                                alt=""
                                style={{ height: '20px', width: 'auto', alignSelf: 'flex-start', margin: '0 16px 14px' }}
                              />
                              {v.pnav.map((p, p_i) => (
                                <Fragment key={p_i}>
                                  <span
                                    style={css(
                                      `display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 16px 8px 13px;font-size:13px;background:${p.bg};border-left:3px solid ${p.mk};font-weight:${p.w};`,
                                    )}
                                  >
                                    {p.label}
                                    {p.badge ? (
                                      <>
                                        <span
                                          style={{
                                            minWidth: '20px',
                                            padding: '1px 6px',
                                            borderRadius: '10px',
                                            background: '#EC844F',
                                            color: '#FFFFFF',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            textAlign: 'center',
                                          }}
                                        >
                                          {p.badge}
                                        </span>
                                      </>
                                    ) : null}
                                  </span>
                                </Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                        <div style={{ flex: '1', minWidth: '0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'baseline',
                              gap: '8px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '22px', letterSpacing: '-0.02em' }}
                            >
                              {'Good morning, '}
                              {v.R.owner}
                            </span>
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: '10px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: 'var(--muted,#5A6472)',
                              }}
                            >
                              {v.R.store}
                              {' · sample data'}
                            </span>
                          </div>
                          <div
                            style={{
                              background: 'var(--surface,#FFFFFF)',
                              border: '1px solid var(--border,#E8E2DC)',
                              borderRadius: '12px',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid var(--border,#E8E2DC)',
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '700',
                                fontSize: '15px',
                              }}
                            >
                              Waiting for you
                            </div>
                            {v.wait.map((x, x_i) => (
                              <Fragment key={x_i}>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderBottom: '1px solid var(--border,#E8E2DC)',
                                  }}
                                >
                                  <span style={{ flex: '1', display: 'flex', flexDirection: 'column', minWidth: '0' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{x.t}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--muted,#5A6472)' }}>{x.d}</span>
                                  </span>
                                  <span
                                    style={{
                                      height: '32px',
                                      padding: '0 12px',
                                      border: '1px solid var(--field,#D7D3CD)',
                                      borderRadius: '8px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      fontSize: '13px',
                                    }}
                                  >
                                    {x.a}
                                  </span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '10px' }}>
                            {v.nums.map((n, n_i) => (
                              <Fragment key={n_i}>
                                <div
                                  style={{
                                    background: 'var(--surface,#FFFFFF)',
                                    border: '1px solid var(--border,#E8E2DC)',
                                    borderRadius: '12px',
                                    padding: '14px 16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                  }}
                                >
                                  <span style={{ fontSize: '12px', color: 'var(--muted,#5A6472)' }}>{n.l}</span>
                                  <span
                                    style={{
                                      fontFamily: 'Manrope,sans-serif',
                                      fontWeight: '800',
                                      fontSize: '24px',
                                      letterSpacing: '-0.03em',
                                    }}
                                  >
                                    {n.v}
                                  </span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                      <a
                        href={v.storeUrl}
                        style={{ minHeight: '44px', display: 'flex', alignItems: 'center', fontWeight: '500', alignSelf: 'flex-start' }}
                      >
                        Open the portal →
                      </a>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        paddingLeft: 'clamp(16px,4cqw,24px)',
                        paddingRight: 'clamp(16px,4cqw,24px)',
                        paddingBottom: 'clamp(48px,9cqw,120px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                          gap: '14px 40px',
                          borderTop: '1px solid var(--text,#14181F)',
                          paddingTop: '20px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                          }}
                        >
                          05 — Sell worldwide
                        </span>
                        <div
                          style={{
                            gridColumn: 'span 3',
                            minWidth: 'min(100%,300px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(28px,4.4cqw,56px)',
                              lineHeight: '1.02',
                              letterSpacing: '-0.035em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                              maxWidth: '20ch',
                            }}
                          >
                            Local rules, local payments, local couriers.
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)', maxWidth: '60ch' }}>
                            Your shop follows the rules of the country it sells in. Here is what changes in three of them.
                          </p>
                        </div>
                      </div>
                      <div role="region" aria-label="Country comparison" tabIndex="0" style={{ overflow: 'auto' }}>
                        <table style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse', fontSize: '15px' }}>
                          <thead>
                            <tr>
                              <th scope="col" style={{ textAlign: 'left', padding: '14px 16px 14px 0', width: '18%' }}></th>
                              {v.regions.map((r, r_i) => (
                                <Fragment key={r_i}>
                                  <th
                                    scope="col"
                                    style={css(
                                      `text-align:left;padding:14px 16px;border-bottom:1.5px solid var(--text,#14181F);background:${r.hbg};vertical-align:bottom;`,
                                    )}
                                  >
                                    <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                      {r.on ? (
                                        <>
                                          <span
                                            style={{
                                              fontFamily: "'IBM Plex Mono',monospace",
                                              fontSize: '10px',
                                              letterSpacing: '0.12em',
                                              textTransform: 'uppercase',
                                              color: 'var(--tint-fg,#8F4017)',
                                            }}
                                          >
                                            Your region
                                          </span>
                                        </>
                                      ) : null}
                                      <span
                                        style={{
                                          fontFamily: 'Manrope,sans-serif',
                                          fontWeight: '800',
                                          fontSize: '22px',
                                          letterSpacing: '-0.02em',
                                        }}
                                      >
                                        {r.country}
                                      </span>
                                      <span style={{ fontSize: '13px', fontWeight: '400', color: 'var(--muted,#5A6472)' }}>
                                        {'Sample shop: '}
                                        {r.store}
                                      </span>
                                    </span>
                                  </th>
                                </Fragment>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {v.regTable.map((row, row_i) => (
                              <Fragment key={row_i}>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{
                                      textAlign: 'left',
                                      padding: '14px 16px 14px 0',
                                      borderBottom: '1px solid var(--border,#E8E2DC)',
                                      fontFamily: "'IBM Plex Mono',monospace",
                                      fontSize: '12px',
                                      letterSpacing: '0.14em',
                                      textTransform: 'uppercase',
                                      color: 'var(--muted,#5A6472)',
                                      fontWeight: '400',
                                    }}
                                  >
                                    {row.l}
                                  </th>
                                  {row.cells.map((c, c_i) => (
                                    <Fragment key={c_i}>
                                      <td
                                        style={css(
                                          `padding:14px 16px;border-bottom:1px solid var(--border,#E8E2DC);background:${c.bg};vertical-align:top;`,
                                        )}
                                      >
                                        {c.v}
                                      </td>
                                    </Fragment>
                                  ))}
                                </tr>
                              </Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                    {v.showPh ? (
                      <>
                        <section
                          aria-label="What merchants say"
                          style={{
                            maxWidth: '1240px',
                            margin: '0 auto',
                            paddingLeft: 'clamp(16px,4cqw,24px)',
                            paddingRight: 'clamp(16px,4cqw,24px)',
                            paddingBottom: 'clamp(48px,9cqw,120px)',
                          }}
                        >
                          <figure
                            style={{
                              margin: '0 auto',
                              maxWidth: '900px',
                              border: '1px dashed var(--field,#D7D3CD)',
                              borderRadius: '12px',
                              padding: 'clamp(28px,5cqw,56px)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '18px',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: '12px',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--muted,#5A6472)',
                              }}
                            >
                              Testimonial placeholder
                            </span>
                            <blockquote
                              style={{
                                margin: '0',
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '700',
                                fontSize: 'clamp(20px,3cqw,34px)',
                                lineHeight: '1.25',
                                letterSpacing: '-0.02em',
                                color: 'var(--muted,#5A6472)',
                              }}
                            >
                              “A merchant’s own words go here, one or two sentences about what changed for their shop.”
                            </blockquote>
                            <figcaption style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>Name · Shop · Country</figcaption>
                          </figure>
                        </section>
                      </>
                    ) : null}
                    <section data-band="" style={{ background: 'var(--band,#0A2A4A)', color: '#FFFFFF' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          paddingLeft: 'clamp(16px,4cqw,24px)',
                          paddingRight: 'clamp(16px,4cqw,24px)',
                          paddingTop: 'clamp(48px,9cqw,120px)',
                          paddingBottom: 'clamp(48px,9cqw,120px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          gap: '24px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(32px,6cqw,76px)',
                            letterSpacing: '-0.04em',
                            lineHeight: '1',
                            maxWidth: '14ch',
                          }}
                        >
                          Your shop can be live today.
                        </span>
                        <span style={{ fontSize: '18px', color: '#B8C7D6', maxWidth: '52ch' }}>
                          Describe it, preview it, publish it. Starter is free forever.
                        </span>
                        <div
                          style={{
                            width: '100%',
                            maxWidth: '780px',
                            background: '#FFFFFF',
                            border: '0',
                            borderRadius: '12px',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            flexWrap: 'wrap',
                            textAlign: 'left',
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '18px', color: '#B8541F', paddingLeft: '12px' }}
                          >
                            ›
                          </span>
                          <input
                            type="text"
                            aria-label="Describe your shop"
                            value={v.heroPrompt}
                            onChange={v.onHeroPrompt}
                            placeholder="Describe your shop…"
                            style={{
                              flex: '1',
                              minWidth: '200px',
                              height: '52px',
                              border: '0',
                              borderRadius: '8px',
                              background: 'transparent',
                              padding: '0 8px',
                              fontFamily: 'Inter,sans-serif',
                              fontSize: '17px',
                              color: '#14181F',
                            }}
                          />
                          <Hv
                            as="a"
                            hover={{ background: '#F09A6D', color: '#FFFFFF' }}
                            href={v.storeUrl}
                            onClick={v.savePrompt}
                            style={{
                              height: '52px',
                              padding: '0 24px',
                              borderRadius: '8px',
                              background: '#EC844F',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '700',
                              fontSize: '16px',
                              flex: 'none',
                            }}
                          >
                            Start free
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M5 12h14M13 6l6 6-6 6"></path>
                            </svg>
                          </Hv>
                        </div>
                        <Hv
                          as="a"
                          hover={{ color: '#FFFFFF' }}
                          href="#/contact/demo"
                          style={{ minHeight: '44px', display: 'flex', alignItems: 'center', color: '#F09A6D', fontWeight: '500' }}
                        >
                          Or book a demo
                        </Hv>
                      </div>
                    </section>
                  </>
                ) : null}
                {v.pg.ai ? (
                  <>
                    <section
                      data-screen-label="AI Builder"
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(40px,7cqw,96px) clamp(16px,4cqw,24px) clamp(36px,5cqw,64px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '22px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ width: '32px', height: '2px', background: '#EC844F', display: 'block' }}></span>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                          }}
                        >
                          AI Store Builder
                        </span>
                      </div>
                      <h1
                        style={{
                          fontFamily: 'Manrope,sans-serif',
                          fontWeight: '800',
                          fontSize: 'clamp(32px,6cqw,68px)',
                          lineHeight: '1.03',
                          letterSpacing: '-0.035em',
                          margin: '0',
                          color: 'var(--head,#0A2A4A)',
                          maxWidth: '16ch',
                        }}
                      >
                        Your whole store, designed from a description.
                      </h1>
                      <p style={{ margin: '0', fontSize: 'clamp(16px,1.6cqw,19px)', color: 'var(--muted,#5A6472)', maxWidth: '60ch' }}>
                        There are no themes to pick and no templates to fight. You tell the AI about your business. It designs the homepage,
                        pages, menus, product pages and the look of all of them. You check it, publish it, and can undo it.
                      </p>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Hv
                          as="a"
                          hover={{ background: 'var(--btn-h,#D96C33)', color: '#FFFFFF' }}
                          href={v.storeUrl}
                          style={{
                            height: '44px',
                            padding: '0 22px',
                            borderRadius: '8px',
                            background: '#EC844F',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '700',
                            fontSize: '15px',
                          }}
                        >
                          Start free
                        </Hv>
                        <a href="#/pricing" style={{ minHeight: '44px', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                          Which plans include AI
                        </a>
                      </div>
                    </section>
                    <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)' }}>
                      <ol
                        style={{
                          listStyle: 'none',
                          margin: '0',
                          padding: '0',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,210px),1fr))',
                          gap: '14px',
                        }}
                      >
                        {v.aiSteps.map((x, x_i) => (
                          <Fragment key={x_i}>
                            <li
                              style={{
                                background: 'var(--surface,#FFFFFF)',
                                border: '1px solid var(--border,#E8E2DC)',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "'IBM Plex Mono',monospace",
                                  fontSize: '12px',
                                  letterSpacing: '0.12em',
                                  color: 'var(--link,#B8541F)',
                                }}
                              >
                                {x.n}
                              </span>
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '18px' }}>{x.t}</span>
                              <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)', lineHeight: '1.55' }}>{x.d}</span>
                            </li>
                          </Fragment>
                        ))}
                      </ol>
                    </section>
                    <section style={{ background: 'var(--sunk,#F3EDE8)' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          padding: 'clamp(44px,8cqw,96px) clamp(16px,4cqw,24px)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '28px',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(26px,4cqw,44px)',
                              lineHeight: '1.08',
                              letterSpacing: '-0.03em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                            }}
                          >
                            What merchants type
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                            Plain sentences. Ask for one change at a time, or describe the whole shop at once.
                          </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '14px' }}>
                          {v.aiPrompts.map((x, x_i) => (
                            <Fragment key={x_i}>
                              <div
                                style={{
                                  background: 'var(--surface,#FFFFFF)',
                                  border: '1px solid var(--border,#E8E2DC)',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '12px',
                                }}
                              >
                                <span style={{ fontSize: '16px', lineHeight: '1.55' }}>“{x.p}”</span>
                                <span
                                  style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'baseline',
                                    fontSize: '14px',
                                    borderTop: '1px solid var(--border,#E8E2DC)',
                                    paddingTop: '10px',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: "'IBM Plex Mono',monospace",
                                      fontSize: '10px',
                                      letterSpacing: '0.12em',
                                      textTransform: 'uppercase',
                                      color: 'var(--muted,#5A6472)',
                                      flex: 'none',
                                    }}
                                  >
                                    Changes
                                  </span>
                                  <span style={{ color: 'var(--okfg,#1D6B47)' }}>{x.c}</span>
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                        <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>
                          The AI changes how your shop looks and reads. It never touches your prices, stock, orders or checkout.
                        </span>
                      </div>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(44px,8cqw,96px) clamp(16px,4cqw,24px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                      }}
                    >
                      <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '640px' }}>
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(26px,4cqw,44px)',
                              lineHeight: '1.08',
                              letterSpacing: '-0.03em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                            }}
                          >
                            Before and after, on every screen
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                            Every change arrives as a draft. Check it on desktop, tablet and phone before anyone else sees it.
                          </p>
                        </div>
                        <span
                          role="group"
                          aria-label="Preview size"
                          style={{ display: 'flex', border: '1px solid var(--field,#D7D3CD)', borderRadius: '8px', overflow: 'hidden' }}
                        >
                          {v.devs.map((w, w_i) => (
                            <Fragment key={w_i}>
                              <button
                                onClick={w.onClick}
                                aria-pressed={w.pressed}
                                style={css(
                                  `height:44px;padding:0 16px;border:0;background:${w.bg};color:${w.fg};font-family:Inter,sans-serif;font-size:14px;cursor:pointer;`,
                                )}
                              >
                                {w.label}
                              </button>
                            </Fragment>
                          ))}
                        </span>
                      </div>
                      <div
                        style={{
                          background: 'var(--surface,#FFFFFF)',
                          border: '1px solid var(--border,#E8E2DC)',
                          borderRadius: '12px',
                          padding: 'clamp(16px,3cqw,28px)',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
                          gap: '20px',
                        }}
                      >
                        {v.frames.map((f, f_i) => (
                          <Fragment key={f_i}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', minWidth: '0' }}>
                              <span
                                style={{
                                  fontFamily: "'IBM Plex Mono',monospace",
                                  fontSize: '11px',
                                  letterSpacing: '0.12em',
                                  textTransform: 'uppercase',
                                  color: 'var(--muted,#5A6472)',
                                }}
                              >
                                {f.label}
                              </span>
                              <div
                                aria-hidden="true"
                                style={css(
                                  `width:100%;max-width:${v.dv.maxw};border:6px solid #14181F;border-radius:${v.dv.r};overflow:hidden;background:#FFFFFF;color:#14181F;`,
                                )}
                              >
                                <div
                                  style={css(
                                    `padding:8px 10px;display:flex;justify-content:space-between;gap:8px;font-size:10px;border-bottom:1px solid #EDEAE5;background:${f.bar};`,
                                  )}
                                >
                                  <strong style={css(`font-family:${f.hfont},sans-serif;`)}>{v.R.store}</strong>
                                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.nav}</span>
                                </div>
                                <div style={css(`padding:${v.dv.pad};background:${f.bg};display:flex;flex-direction:column;gap:8px;`)}>
                                  <span
                                    style={css(
                                      `font-family:${f.hfont},sans-serif;font-weight:800;font-size:${v.dv.hfs};line-height:1.12;letter-spacing:-0.02em;color:${f.fg};`,
                                    )}
                                  >
                                    {f.headline}
                                  </span>
                                  <span style={css(`font-size:12px;color:${f.fg};`)}>{f.sub}</span>
                                  <span
                                    style={css(
                                      `align-self:flex-start;padding:6px 12px;border-radius:6px;background:${f.accent};color:#FFFFFF;font-size:12px;font-weight:700;`,
                                    )}
                                  >
                                    {f.cta}
                                  </span>
                                </div>
                                <div style={css(`padding:10px;display:grid;grid-template-columns:${v.dv.cols};gap:8px;`)}>
                                  {f.tiles.map((t, t_i) => (
                                    <Fragment key={t_i}>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                                        <span style={css(`aspect-ratio:4/5;border-radius:4px;background:${t.bg};`)}></span>
                                        <span style={{ fontSize: '10px', lineHeight: '1.3' }}>{t.name}</span>
                                        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t.price}</span>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: '10px' }}>
                        {v.aiDesigns.map((x, x_i) => (
                          <Fragment key={x_i}>
                            <div
                              style={{
                                borderTop: '2px solid #EC844F',
                                paddingTop: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                              }}
                            >
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '16px' }}>{x.t}</span>
                              <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>{x.d}</span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </section>
                    <section style={{ background: 'var(--sunk,#F3EDE8)' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          padding: 'clamp(44px,8cqw,96px) clamp(16px,4cqw,24px)',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
                          gap: 'clamp(28px,5cqw,56px)',
                          alignItems: 'start',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(26px,4cqw,44px)',
                              lineHeight: '1.08',
                              letterSpacing: '-0.03em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                            }}
                          >
                            Every version kept. Undo in one click.
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                            Each publish becomes a numbered version with what changed and who did it. Going back to an older one is instant
                            and never uses your AI allowance.
                          </p>
                          <dl style={{ margin: '0', display: 'flex', flexDirection: 'column' }}>
                            {v.histPlans.map((x, x_i) => (
                              <Fragment key={x_i}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '12px',
                                    padding: '10px 0',
                                    borderTop: '1px solid var(--border,#E8E2DC)',
                                    fontSize: '15px',
                                  }}
                                >
                                  <dt>{x.p}</dt>
                                  <dd style={{ margin: '0', fontWeight: '600' }}>{x.v}</dd>
                                </div>
                              </Fragment>
                            ))}
                          </dl>
                        </div>
                        <div
                          style={{
                            background: 'var(--surface,#FFFFFF)',
                            border: '1px solid var(--border,#E8E2DC)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              padding: '14px 18px',
                              borderBottom: '1px solid var(--border,#E8E2DC)',
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '700',
                              fontSize: '16px',
                            }}
                          >
                            {'History · '}
                            {v.R.store}
                          </div>
                          {v.history.map((h, h_i) => (
                            <Fragment key={h_i}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  padding: '12px 18px',
                                  borderBottom: '1px solid var(--border,#E8E2DC)',
                                  fontSize: '14px',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <span style={{ flex: '1', minWidth: '180px', display: 'flex', flexDirection: 'column' }}>
                                  <strong>
                                    v{h.v}
                                    {' · '}
                                    {h.label}
                                  </strong>
                                  <span style={{ color: 'var(--muted,#5A6472)', fontSize: '13px' }}>
                                    {h.date}
                                    {' · '}
                                    {v.R.owner}
                                  </span>
                                </span>
                                {h.isLive ? (
                                  <>
                                    <span
                                      style={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        padding: '3px 10px',
                                        borderRadius: '12px',
                                        background: 'var(--okbg,#EEF7F2)',
                                        color: 'var(--okfg,#1D6B47)',
                                      }}
                                    >
                                      Live
                                    </span>
                                  </>
                                ) : null}
                                {h.canBack ? (
                                  <>
                                    <Hv
                                      as="button"
                                      hover={{ background: 'var(--outline-h,#FDF0E8)' }}
                                      onClick={h.back}
                                      style={{
                                        height: '44px',
                                        padding: '0 14px',
                                        border: '1px solid var(--outline,#B8541F)',
                                        borderRadius: '8px',
                                        background: 'transparent',
                                        color: 'var(--outline,#B8541F)',
                                        fontFamily: 'Inter,sans-serif',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Go back to this
                                    </Hv>
                                  </>
                                ) : null}
                              </div>
                            </Fragment>
                          ))}
                          <div role="status" style={{ padding: '12px 18px', fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                            {v.liveMsg}
                          </div>
                        </div>
                      </div>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(44px,8cqw,96px) clamp(16px,4cqw,24px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
                        <h2
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(26px,4cqw,44px)',
                            lineHeight: '1.08',
                            letterSpacing: '-0.03em',
                            margin: '0',
                            color: 'var(--head,#0A2A4A)',
                          }}
                        >
                          AI on every plan
                        </h2>
                        <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                          The same AI designs your store and writes your product descriptions and translations. How you pay for it depends
                          on your plan.
                        </p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '14px' }}>
                        <div
                          style={{
                            background: 'var(--surface,#FFFFFF)',
                            border: '1px solid var(--border,#E8E2DC)',
                            borderRadius: '12px',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono',monospace",
                              fontSize: '11px',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--muted,#5A6472)',
                            }}
                          >
                            Starter (Free) and Growth
                          </span>
                          <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '22px' }}>On your own AI key</span>
                          <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>
                            Connect your own OpenAI or Anthropic account and pay them directly for what you use. Paste the key once in
                            Settings.
                          </span>
                        </div>
                        <div
                          style={{
                            background: 'var(--surface,#FFFFFF)',
                            border: '2px solid #EC844F',
                            borderRadius: '12px',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono',monospace",
                              fontSize: '11px',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--tint-fg,#8F4017)',
                            }}
                          >
                            From Growth Pro
                          </span>
                          <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '22px' }}>
                            Included, no key needed
                          </span>
                          <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>
                            A monthly allowance comes with the plan, larger on Business. If you run out, your shop keeps working and nothing
                            you published changes.
                          </span>
                        </div>
                      </div>
                    </section>
                    <section data-band="" style={{ background: 'var(--band,#0A2A4A)', color: '#FFFFFF' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          padding: 'clamp(44px,7cqw,88px) clamp(16px,4cqw,24px)',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
                          gap: '36px',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono',monospace",
                              fontSize: '12px',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: '#B8C7D6',
                            }}
                          >
                            Optional setup help
                          </span>
                          <span
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(24px,4cqw,40px)',
                              letterSpacing: '-0.03em',
                              lineHeight: '1.1',
                            }}
                          >
                            Need help building your storefront? We’ll do it for you.
                          </span>
                          <span style={{ fontSize: '17px', color: '#B8C7D6' }}>
                            {
                              'Our team builds your homepage, pages, menus and first products so you launch looking finished. It’s a one-time payment on paid plans: '
                            }
                            {v.setupLine}.
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Hv
                            as="a"
                            hover={{ background: '#F09A6D', color: '#FFFFFF' }}
                            href="#/contact/sales"
                            style={{
                              height: '48px',
                              padding: '0 24px',
                              borderRadius: '8px',
                              background: '#EC844F',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '700',
                              fontSize: '16px',
                            }}
                          >
                            Ask us to build it
                          </Hv>
                          <Hv
                            as="a"
                            hover={{ color: '#FFFFFF' }}
                            href={v.storeUrl}
                            style={{ minHeight: '44px', display: 'flex', alignItems: 'center', color: '#F09A6D', fontWeight: '500' }}
                          >
                            Or build it yourself, free
                          </Hv>
                        </div>
                      </div>
                    </section>
                  </>
                ) : null}
                {v.pg.features ? (
                  <>
                    <section
                      data-screen-label="Features"
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        paddingLeft: 'clamp(16px,4cqw,24px)',
                        paddingRight: 'clamp(16px,4cqw,24px)',
                        paddingTop: 'clamp(32px,6cqw,80px)',
                        paddingBottom: 'clamp(32px,5cqw,56px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '20px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono',monospace",
                          fontSize: '12px',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--muted,#5A6472)',
                        }}
                      >
                        Features
                      </span>
                      <h1
                        style={{
                          fontFamily: 'Manrope,sans-serif',
                          fontWeight: '800',
                          fontSize: 'clamp(34px,6.6cqw,84px)',
                          lineHeight: '1.02',
                          letterSpacing: '-0.04em',
                          margin: '0',
                          color: 'var(--head,#0A2A4A)',
                          maxWidth: '15ch',
                        }}
                      >
                        Everything a shop needs. Nothing to bolt on.
                      </h1>
                      <p style={{ margin: '0', fontSize: 'clamp(16px,1.7cqw,20px)', color: 'var(--muted,#5A6472)', maxWidth: '58ch' }}>
                        {v.featCount}
                        {
                          ' features across ten parts of running a shop, all in one portal. Each one says which plan it starts on, and every plan has zero fees on your orders.'
                        }
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          gap: '6px 18px',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          fontFamily: "'IBM Plex Mono',monospace",
                          fontSize: '12px',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--muted,#5A6472)',
                        }}
                      >
                        <span>
                          {v.featCount}
                          {' features'}
                        </span>
                        <span aria-hidden="true" style={{ color: '#EC844F' }}>
                          ●
                        </span>
                        <span>
                          {v.featFree}
                          {' on Starter (Free)'}
                        </span>
                        <span aria-hidden="true" style={{ color: '#EC844F' }}>
                          ●
                        </span>
                        <span>5 plans</span>
                      </div>
                    </section>
                    <nav
                      aria-label="Contents"
                      style={css(
                        `position:sticky;top:${v.stickyTop};z-index:20;background:var(--paper,#FDFAF7);border-top:1px solid var(--border,#E8E2DC);border-bottom:1px solid var(--border,#E8E2DC);`,
                      )}
                    >
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          paddingLeft: 'clamp(16px,4cqw,24px)',
                          paddingRight: 'clamp(16px,4cqw,24px)',
                          display: 'flex',
                          gap: '4px',
                          overflowX: 'auto',
                          scrollbarWidth: 'none',
                        }}
                      >
                        {v.fnav.map((n, n_i) => (
                          <Fragment key={n_i}>
                            <Hv
                              as="button"
                              hover={{ color: 'var(--link,#B8541F)' }}
                              onClick={n.onClick}
                              style={{
                                height: '48px',
                                padding: '0 12px',
                                border: '0',
                                background: 'transparent',
                                color: 'var(--text,#14181F)',
                                fontFamily: 'Inter,sans-serif',
                                fontSize: '14px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                            >
                              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: 'var(--muted,#5A6472)' }}>
                                {n.n}
                              </span>
                              {n.label}
                            </Hv>
                          </Fragment>
                        ))}
                      </div>
                    </nav>
                    {v.fsecs.map((f, f_i) => (
                      <Fragment key={f_i}>
                        <section
                          id={f.id}
                          style={{
                            maxWidth: '1240px',
                            margin: '0 auto',
                            paddingLeft: 'clamp(16px,4cqw,24px)',
                            paddingRight: 'clamp(16px,4cqw,24px)',
                            paddingTop: 'clamp(44px,8cqw,104px)',
                            paddingBottom: 'clamp(32px,6cqw,72px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '36px',
                            scrollMarginTop: '140px',
                          }}
                        >
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                              gap: '14px 40px',
                              borderTop: '1px solid var(--text,#14181F)',
                              paddingTop: '20px',
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <span
                                style={{
                                  fontFamily: "'IBM Plex Mono',monospace",
                                  fontSize: '12px',
                                  letterSpacing: '0.14em',
                                  textTransform: 'uppercase',
                                  color: 'var(--muted,#5A6472)',
                                }}
                              >
                                {f.n}
                                {' — '}
                                {f.label}
                              </span>
                              <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>{f.plan}</span>
                            </div>
                            <div
                              style={{
                                gridColumn: 'span 3',
                                minWidth: 'min(100%,300px)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                              }}
                            >
                              <h2
                                style={{
                                  fontFamily: 'Manrope,sans-serif',
                                  fontWeight: '800',
                                  fontSize: 'clamp(28px,4.4cqw,56px)',
                                  lineHeight: '1.02',
                                  letterSpacing: '-0.035em',
                                  margin: '0',
                                  color: 'var(--head,#0A2A4A)',
                                  maxWidth: '20ch',
                                }}
                              >
                                {f.title}
                              </h2>
                              <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)', maxWidth: '60ch' }}>{f.lead}</p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
                              gap: 'clamp(28px,4cqw,56px)',
                              alignItems: 'start',
                            }}
                          >
                            <dl
                              style={{
                                gridColumn: 'span 2',
                                minWidth: 'min(100%,340px)',
                                margin: '0',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,260px),1fr))',
                                gap: '0 32px',
                              }}
                            >
                              {f.items.map((x, x_i) => (
                                <Fragment key={x_i}>
                                  <div
                                    style={{
                                      padding: '16px 0',
                                      borderBottom: '1px solid var(--border,#E8E2DC)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '4px',
                                    }}
                                  >
                                    <dt style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline' }}>
                                      <span
                                        style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '17px', lineHeight: '1.3' }}
                                      >
                                        {x.t}
                                      </span>
                                      <span
                                        style={css(
                                          `font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:${x.pc};white-space:nowrap;flex:none;`,
                                        )}
                                      >
                                        {x.p}
                                      </span>
                                    </dt>
                                    <dd style={{ margin: '0', fontSize: '14px', color: 'var(--muted,#5A6472)', lineHeight: '1.5' }}>
                                      {x.d}
                                    </dd>
                                  </div>
                                </Fragment>
                              ))}
                            </dl>
                            <div
                              aria-hidden="true"
                              style={css(
                                `position:sticky;top:${v.mockTop};background:var(--surface,#FFFFFF);border:1.5px solid var(--text,#14181F);border-radius:12px;overflow:hidden;font-size:14px;`,
                              )}
                            >
                              <div
                                style={{
                                  padding: '14px 18px',
                                  borderBottom: '1px solid var(--border,#E8E2DC)',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  gap: '10px',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '15px' }}>{f.mockTitle}</span>
                                <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>{f.mockSub}</span>
                              </div>
                              {f.isBars ? (
                                <>
                                  <div
                                    style={{
                                      padding: '20px 18px 12px',
                                      display: 'flex',
                                      alignItems: 'flex-end',
                                      gap: '10px',
                                      height: '200px',
                                    }}
                                  >
                                    {f.bars.map((b, b_i) => (
                                      <Fragment key={b_i}>
                                        <div
                                          style={{
                                            flex: '1',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '6px',
                                            height: '100%',
                                            justifyContent: 'flex-end',
                                          }}
                                        >
                                          <span style={css(`width:100%;height:${b.h};background:${b.c};border-radius:4px 4px 0 0;`)}></span>
                                          <span style={{ fontSize: '11px', color: 'var(--muted,#5A6472)' }}>{b.l}</span>
                                        </div>
                                      </Fragment>
                                    ))}
                                  </div>
                                </>
                              ) : null}
                              {f.rows.map((r, r_i) => (
                                <Fragment key={r_i}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '12px',
                                      padding: '12px 18px',
                                      borderBottom: '1px solid var(--border,#E8E2DC)',
                                      flexWrap: 'wrap',
                                    }}
                                  >
                                    <span style={{ flex: '1', minWidth: '150px', display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontWeight: '600' }}>{r.a}</span>
                                      <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>{r.b}</span>
                                    </span>
                                    <span style={{ fontSize: '13px', color: 'var(--text,#14181F)' }}>{r.c}</span>
                                    {r.pill ? (
                                      <>
                                        <span
                                          style={css(
                                            `font-size:12px;font-weight:600;padding:3px 10px;border-radius:12px;background:${r.pbg};color:${r.pfg};`,
                                          )}
                                        >
                                          {r.pill}
                                        </span>
                                      </>
                                    ) : null}
                                  </div>
                                </Fragment>
                              ))}
                              {f.foot ? (
                                <>
                                  <div
                                    style={{
                                      padding: '12px 18px',
                                      fontSize: '13px',
                                      color: 'var(--muted,#5A6472)',
                                      background: 'var(--paper,#FDFAF7)',
                                    }}
                                  >
                                    {f.foot}
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </section>
                      </Fragment>
                    ))}
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        paddingLeft: 'clamp(16px,4cqw,24px)',
                        paddingRight: 'clamp(16px,4cqw,24px)',
                        paddingTop: 'clamp(32px,6cqw,72px)',
                        paddingBottom: 'clamp(48px,9cqw,120px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                          gap: '14px 40px',
                          borderTop: '1px solid var(--text,#14181F)',
                          paddingTop: '20px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                          }}
                        >
                          Index
                        </span>
                        <div
                          style={{
                            gridColumn: 'span 3',
                            minWidth: 'min(100%,300px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(28px,4.4cqw,56px)',
                              lineHeight: '1.02',
                              letterSpacing: '-0.035em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                            }}
                          >
                            Every feature, by plan.
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)', maxWidth: '60ch' }}>
                            {'The whole list on one page. Pick a plan to see what it includes; prices are on the '}
                            <a href="#/pricing">pricing page</a>.
                          </p>
                        </div>
                      </div>
                      <div role="group" aria-label="Show features from" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {v.planFilter.map((p, p_i) => (
                          <Fragment key={p_i}>
                            <button
                              onClick={p.onClick}
                              aria-pressed={p.pressed}
                              style={css(
                                `min-height:44px;padding:0 16px;border:1px solid ${p.bd};border-radius:8px;background:${p.bg};color:${p.fg};font-family:Inter,sans-serif;font-size:14px;font-weight:500;cursor:pointer;`,
                              )}
                            >
                              {p.label}
                            </button>
                          </Fragment>
                        ))}
                      </div>
                      <div style={css(`columns:${v.idxColumns};column-gap:40px;`)}>
                        {v.fIndex.map((g, g_i) => (
                          <Fragment key={g_i}>
                            <div style={{ breakInside: 'avoid', paddingBottom: '22px', display: 'flex', flexDirection: 'column' }}>
                              <span
                                style={{
                                  fontFamily: "'IBM Plex Mono',monospace",
                                  fontSize: '12px',
                                  letterSpacing: '0.14em',
                                  textTransform: 'uppercase',
                                  color: 'var(--muted,#5A6472)',
                                  paddingBottom: '8px',
                                  borderBottom: '1px solid var(--text,#14181F)',
                                }}
                              >
                                {g.n}
                                {' — '}
                                {g.label}
                              </span>
                              {g.items.map((x, x_i) => (
                                <Fragment key={x_i}>
                                  <span
                                    style={css(
                                      `display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid var(--border,#E8E2DC);font-size:15px;color:${x.fg};`,
                                    )}
                                  >
                                    <span>{x.t}</span>
                                    <span
                                      style={css(
                                        `font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:${x.pc};white-space:nowrap;`,
                                      )}
                                    >
                                      {x.p}
                                    </span>
                                  </span>
                                </Fragment>
                              ))}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <span role="status" style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                        {v.idxLine}
                      </span>
                    </section>
                    <section data-band="" style={{ background: 'var(--band,#0A2A4A)', color: '#FFFFFF' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          paddingLeft: 'clamp(16px,4cqw,24px)',
                          paddingRight: 'clamp(16px,4cqw,24px)',
                          paddingTop: 'clamp(48px,9cqw,120px)',
                          paddingBottom: 'clamp(48px,9cqw,120px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          gap: '24px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(32px,6cqw,76px)',
                            letterSpacing: '-0.04em',
                            lineHeight: '1',
                            maxWidth: '14ch',
                          }}
                        >
                          Try every feature for 10 days.
                        </span>
                        <span style={{ fontSize: '18px', color: '#B8C7D6', maxWidth: '52ch' }}>
                          New shops get everything in Business, no credit card. Then pick a plan or stay on Starter for free.
                        </span>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                          <Hv
                            as="a"
                            hover={{ background: '#F09A6D', color: '#FFFFFF' }}
                            href={v.storeUrl}
                            style={{
                              height: '52px',
                              padding: '0 26px',
                              borderRadius: '8px',
                              background: '#EC844F',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '700',
                              fontSize: '16px',
                            }}
                          >
                            Start free
                          </Hv>
                          <Hv
                            as="a"
                            hover={{ color: '#FFFFFF' }}
                            href="#/pricing"
                            style={{ minHeight: '44px', display: 'flex', alignItems: 'center', color: '#F09A6D', fontWeight: '500' }}
                          >
                            Compare plans
                          </Hv>
                        </div>
                      </div>
                    </section>
                  </>
                ) : null}
                {v.pg.pricing ? (
                  <>
                    <section
                      data-screen-label="Pricing"
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) 36px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '18px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ width: '32px', height: '2px', background: '#EC844F', display: 'block' }}></span>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                          }}
                        >
                          Pricing
                        </span>
                      </div>
                      <h1
                        style={{
                          fontFamily: 'Manrope,sans-serif',
                          fontWeight: '800',
                          fontSize: 'clamp(32px,5.5cqw,60px)',
                          lineHeight: '1.04',
                          letterSpacing: '-0.035em',
                          margin: '0',
                          maxWidth: '18ch',
                          color: 'var(--head,#0A2A4A)',
                        }}
                      >
                        Start free. Pay when your shop grows.
                      </h1>
                      <span
                        style={{
                          display: 'inline-flex',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          background: 'var(--okbg,#EEF7F2)',
                          color: 'var(--okfg,#1D6B47)',
                          fontFamily: 'Manrope,sans-serif',
                          fontWeight: '700',
                          fontSize: '14px',
                        }}
                      >
                        Try everything in Business free for 10 days · no credit card required
                      </span>
                      <p style={{ margin: '0', maxWidth: '60ch', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                        Every plan has a real shop, unlimited orders, zero fees on your orders and the legal details your markets need. Paid
                        plans add more products, a team, suppliers and selling abroad.
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div
                          role="group"
                          aria-label="Billing period"
                          style={{
                            display: 'flex',
                            gap: '4px',
                            padding: '4px',
                            border: '1px solid var(--border,#E8E2DC)',
                            borderRadius: '10px',
                            background: 'var(--surface,#FFFFFF)',
                          }}
                        >
                          {v.periods.map((p, p_i) => (
                            <Fragment key={p_i}>
                              <button
                                onClick={p.onClick}
                                aria-pressed={p.pressed}
                                style={css(
                                  `height:44px;padding:0 16px;border:0;border-radius:8px;background:${p.bg};color:${p.fg};font-family:Manrope,sans-serif;font-weight:700;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:8px;`,
                                )}
                              >
                                {p.label}
                                {p.tag ? (
                                  <>
                                    <span
                                      style={{
                                        fontSize: '11px',
                                        padding: '2px 8px',
                                        borderRadius: '10px',
                                        background: 'var(--okbg,#EEF7F2)',
                                        color: 'var(--okfg,#1D6B47)',
                                      }}
                                    >
                                      {p.tag}
                                    </span>
                                  </>
                                ) : null}
                              </button>
                            </Fragment>
                          ))}
                        </div>
                        <select
                          value={v.cur}
                          onChange={v.onCur}
                          aria-label="Currency"
                          style={{
                            height: '52px',
                            border: '1px solid var(--border,#E8E2DC)',
                            borderRadius: '10px',
                            background: 'var(--surface,#FFFFFF)',
                            padding: '0 12px',
                            fontFamily: 'Inter,sans-serif',
                            fontSize: '15px',
                            color: 'var(--text,#14181F)',
                          }}
                        >
                          <option value="USD">$ USD</option>
                          <option value="EUR">€ EUR</option>
                          <option value="INR">₹ INR</option>
                        </select>
                      </div>
                    </section>
                    <section
                      aria-label="Plans"
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: '12px clamp(16px,4cqw,24px) 64px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                        gap: '14px',
                        alignItems: 'stretch',
                      }}
                    >
                      {v.plans.map((p, p_i) => (
                        <Fragment key={p_i}>
                          <div
                            style={css(
                              `background:${p.bg};color:${p.fg};border:${p.bd};border-radius:12px;padding:24px 20px;display:flex;flex-direction:column;gap:12px;position:relative;`,
                            )}
                          >
                            {p.badge ? (
                              <>
                                <span
                                  style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '20px',
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: '11px',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    background: '#0A2A4A',
                                    color: '#FFFFFF',
                                  }}
                                >
                                  {p.badge}
                                </span>
                              </>
                            ) : null}
                            <h2 style={{ margin: '0', fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '20px' }}>{p.name}</h2>
                            <span style={css(`font-size:14px;color:${p.sub};min-height:44px;`)}>{p.for}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span
                                  style={{
                                    fontFamily: 'Manrope,sans-serif',
                                    fontWeight: '800',
                                    fontSize: '32px',
                                    letterSpacing: '-0.03em',
                                  }}
                                >
                                  {p.price}
                                </span>
                                <span style={css(`font-size:14px;color:${p.sub};`)}>{p.per}</span>
                              </span>
                              <span style={css(`font-size:13px;color:${p.sub};min-height:40px;`)}>{p.note}</span>
                            </div>
                            <Hv
                              as="a"
                              hover={css(p.btnH)}
                              href={p.href}
                              style={css(
                                `height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center;text-decoration:none;font-family:Manrope,sans-serif;font-weight:700;font-size:14px;background:${p.btnBg};color:${p.btnFg};border:${p.btnBd};`,
                              )}
                            >
                              {p.cta}
                            </Hv>
                            <div style={css(`height:1px;background:${p.rule};`)}></div>
                            <ul
                              style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
                            >
                              {p.points.map((pt, pt_i) => (
                                <Fragment key={pt_i}>
                                  <li style={{ display: 'flex', gap: '8px', fontSize: '14px', lineHeight: '1.45' }}>
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke={p.tick}
                                      strokeWidth="2.2"
                                      strokeLinecap="round"
                                      style={{ flex: 'none', marginTop: '2px' }}
                                    >
                                      <path d="M5 12l5 5L20 7"></path>
                                    </svg>
                                    {pt}
                                  </li>
                                </Fragment>
                              ))}
                            </ul>
                          </div>
                        </Fragment>
                      ))}
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: '0 clamp(16px,4cqw,24px) 64px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            color: 'var(--link,#B8541F)',
                          }}
                        >
                          01
                        </span>
                        <h2
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(22px,3.4cqw,34px)',
                            letterSpacing: '-0.025em',
                            margin: '0',
                            color: 'var(--head,#0A2A4A)',
                          }}
                        >
                          Compare every feature
                        </h2>
                      </div>
                      <div
                        role="region"
                        aria-label="Feature comparison"
                        tabIndex="0"
                        style={{
                          border: '1px solid var(--border,#E8E2DC)',
                          borderRadius: '12px',
                          overflow: 'auto',
                          background: 'var(--surface,#FFFFFF)',
                        }}
                      >
                        <div role="table" style={{ minWidth: '880px' }}>
                          <div
                            role="row"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'minmax(220px,1.6fr) repeat(5,minmax(110px,1fr))',
                              borderBottom: '1px solid var(--border,#E8E2DC)',
                            }}
                          >
                            <span role="columnheader" style={{ padding: '14px 18px', fontSize: '13px', color: 'var(--muted,#5A6472)' }}>
                              Feature
                            </span>
                            {v.heads.map((h, h_i) => (
                              <Fragment key={h_i}>
                                <span
                                  role="columnheader"
                                  style={css(
                                    `padding:14px 12px;font-family:Manrope,sans-serif;font-weight:800;font-size:15px;text-align:center;background:${h.bg};`,
                                  )}
                                >
                                  {h.name}
                                </span>
                              </Fragment>
                            ))}
                          </div>
                          {v.groups.map((g, g_i) => (
                            <Fragment key={g_i}>
                              <div
                                role="row"
                                style={{
                                  padding: '12px 18px',
                                  background: 'var(--paper,#FDFAF7)',
                                  borderBottom: '1px solid var(--border,#E8E2DC)',
                                  fontFamily: "'IBM Plex Mono',monospace",
                                  fontSize: '11px',
                                  letterSpacing: '0.12em',
                                  textTransform: 'uppercase',
                                  color: 'var(--tint-fg,#8F4017)',
                                }}
                              >
                                <span role="rowheader">{g.name}</span>
                              </div>
                              {g.rows.map((r, r_i) => (
                                <Fragment key={r_i}>
                                  <div
                                    role="row"
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: 'minmax(220px,1.6fr) repeat(5,minmax(110px,1fr))',
                                      borderBottom: '1px solid var(--border,#E8E2DC)',
                                      fontSize: '14px',
                                    }}
                                  >
                                    <span role="rowheader" style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column' }}>
                                      <span>{r.name}</span>
                                      {r.note ? (
                                        <>
                                          <span style={{ fontSize: '12px', color: 'var(--muted,#5A6472)' }}>{r.note}</span>
                                        </>
                                      ) : null}
                                    </span>
                                    {r.cells.map((c, c_i) => (
                                      <Fragment key={c_i}>
                                        <span
                                          role="cell"
                                          aria-label={c.label}
                                          style={css(`padding:12px;text-align:center;color:${c.fg};background:${c.bg};font-weight:${c.w};`)}
                                        >
                                          {c.v}
                                        </span>
                                      </Fragment>
                                    ))}
                                  </div>
                                </Fragment>
                              ))}
                            </Fragment>
                          ))}
                        </div>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>{v.priceFoot}</span>
                    </section>
                    <section
                      style={{
                        maxWidth: '880px',
                        margin: '0 auto',
                        padding: '0 clamp(16px,4cqw,24px) 80px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            color: 'var(--link,#B8541F)',
                          }}
                        >
                          02
                        </span>
                        <h2
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(22px,3.4cqw,34px)',
                            letterSpacing: '-0.025em',
                            margin: '0',
                            color: 'var(--head,#0A2A4A)',
                          }}
                        >
                          Questions
                        </h2>
                      </div>
                      <div style={{ borderTop: '1px solid var(--border,#E8E2DC)' }}>
                        {v.faqs.map((f, f_i) => (
                          <Fragment key={f_i}>
                            <div style={{ borderBottom: '1px solid var(--border,#E8E2DC)' }}>
                              <button
                                onClick={f.onClick}
                                aria-expanded={f.exp}
                                style={{
                                  width: '100%',
                                  minHeight: '60px',
                                  padding: '14px 0',
                                  border: '0',
                                  background: 'transparent',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '16px',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  color: 'var(--text,#14181F)',
                                  fontFamily: 'Manrope,sans-serif',
                                  fontWeight: '700',
                                  fontSize: '17px',
                                }}
                              >
                                {f.q}
                                <span aria-hidden="true" style={{ fontSize: '22px', color: 'var(--link,#B8541F)', flex: 'none' }}>
                                  {f.sign}
                                </span>
                              </button>
                              {f.open ? (
                                <>
                                  <p
                                    style={{
                                      margin: '0',
                                      padding: '0 0 18px',
                                      fontSize: '15px',
                                      color: 'var(--muted,#5A6472)',
                                      lineHeight: '1.65',
                                      maxWidth: '68ch',
                                    }}
                                  >
                                    {f.a}
                                  </p>
                                </>
                              ) : null}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </section>
                    <section data-band="" style={{ background: 'var(--band,#0A2A4A)', color: '#FFFFFF' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          padding: 'clamp(44px,7cqw,80px) clamp(16px,4cqw,24px)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '24px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(22px,3.6cqw,36px)',
                              letterSpacing: '-0.025em',
                            }}
                          >
                            Your shop can be live today.
                          </span>
                          <span style={{ fontSize: '16px', color: '#B8C7D6' }}>
                            Try everything in Business free for 10 days. No credit card required.
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Hv
                            as="a"
                            hover={{ background: '#F09A6D', color: '#FFFFFF' }}
                            href={v.storeUrl}
                            style={{
                              height: '48px',
                              padding: '0 24px',
                              borderRadius: '8px',
                              background: '#EC844F',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '700',
                            }}
                          >
                            Start free
                          </Hv>
                          <Hv
                            as="a"
                            hover={{ color: '#FFFFFF' }}
                            href="#/contact/sales"
                            style={{ minHeight: '44px', display: 'flex', alignItems: 'center', color: '#F09A6D', fontWeight: '500' }}
                          >
                            Talk to us
                          </Hv>
                        </div>
                      </div>
                    </section>
                  </>
                ) : null}
                {v.pg.partners ? (
                  <>
                    <section data-screen-label="Partners" data-band="" style={{ background: 'var(--band,#0A2A4A)', color: '#FFFFFF' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          padding: 'clamp(44px,8cqw,112px) clamp(16px,4cqw,24px)',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
                          gap: 'clamp(32px,5cqw,64px)',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ width: '32px', height: '2px', background: '#EC844F', display: 'block' }}></span>
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: '12px',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: '#B8C7D6',
                              }}
                            >
                              Partners · white-label
                            </span>
                          </div>
                          <h1
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(32px,6cqw,64px)',
                              lineHeight: '1.03',
                              letterSpacing: '-0.035em',
                              margin: '0',
                            }}
                          >
                            Run DripFunnel under your own brand.
                          </h1>
                          <p style={{ margin: '0', fontSize: '18px', color: '#B8C7D6', maxWidth: '52ch' }}>
                            For agencies and groups that run shops for others. Your name on the portal, the shops and every email. Your
                            plans and your prices. Many stores under one account.
                          </p>
                          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Hv
                              as="a"
                              hover={{ background: '#F09A6D', color: '#FFFFFF' }}
                              href="#/contact/partners"
                              style={{
                                height: '48px',
                                padding: '0 24px',
                                borderRadius: '8px',
                                background: '#EC844F',
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '700',
                                fontSize: '16px',
                              }}
                            >
                              Talk to us
                            </Hv>
                            <Hv
                              as="a"
                              hover={{ color: '#FFFFFF' }}
                              href="mailto:sales@dripfunnel.com"
                              style={{ minHeight: '44px', display: 'flex', alignItems: 'center', color: '#F09A6D', fontWeight: '500' }}
                            >
                              sales@dripfunnel.com
                            </Hv>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          style={{
                            background: '#FFFFFF',
                            color: '#14181F',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid #1C3F60',
                          }}
                        >
                          <div
                            style={{
                              height: '48px',
                              padding: '0 16px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              background: '#1F4B3A',
                              color: '#FFFFFF',
                            }}
                          >
                            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#F4C95D' }}></span>
                            <strong style={{ fontFamily: 'Manrope,sans-serif', fontSize: '14px' }}>Northstar Shops</strong>
                            <span
                              style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', opacity: '0.85' }}
                            >
                              store.northstar.com
                            </span>
                          </div>
                          <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: '10px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: '#5A6472',
                              }}
                            >
                              Example partner · your brand here
                            </span>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '8px' }}>
                              {v.pStats.map((x, x_i) => (
                                <Fragment key={x_i}>
                                  <div
                                    style={{
                                      border: '1px solid #E8E2DC',
                                      borderRadius: '10px',
                                      padding: '10px 12px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                    }}
                                  >
                                    <span style={{ fontSize: '11px', color: '#5A6472' }}>{x.l}</span>
                                    <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '18px' }}>{x.v}</span>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                            {v.pDomains.map((d, d_i) => (
                              <Fragment key={d_i}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                    padding: '9px 0',
                                    borderTop: '1px solid #E8E2DC',
                                    fontSize: '13px',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  <span style={{ color: '#5A6472' }}>{d.l}</span>
                                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px' }}>{d.v}</span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(44px,8cqw,104px) clamp(16px,4cqw,24px)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
                        gap: '14px',
                      }}
                    >
                      {v.pBlocks.map((b, b_i) => (
                        <Fragment key={b_i}>
                          <div
                            style={{
                              background: 'var(--surface,#FFFFFF)',
                              border: '1px solid var(--border,#E8E2DC)',
                              borderRadius: '12px',
                              padding: '24px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: '12px',
                                letterSpacing: '0.12em',
                                color: 'var(--link,#B8541F)',
                              }}
                            >
                              {b.n}
                            </span>
                            <h2
                              style={{
                                margin: '0',
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '800',
                                fontSize: '22px',
                                letterSpacing: '-0.02em',
                                color: 'var(--head,#0A2A4A)',
                              }}
                            >
                              {b.t}
                            </h2>
                            <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>{b.d}</span>
                            <ul style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                              {b.pts.map((p, p_i) => (
                                <Fragment key={p_i}>
                                  <li style={{ padding: '9px 0', borderTop: '1px solid var(--border,#E8E2DC)', fontSize: '14px' }}>{p}</li>
                                </Fragment>
                              ))}
                            </ul>
                          </div>
                        </Fragment>
                      ))}
                    </section>
                    <section style={{ background: 'var(--sunk,#F3EDE8)' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          padding: 'clamp(44px,8cqw,96px) clamp(16px,4cqw,24px)',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
                          gap: 'clamp(28px,5cqw,56px)',
                          alignItems: 'start',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <h2
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(24px,4cqw,42px)',
                              lineHeight: '1.08',
                              letterSpacing: '-0.03em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                            }}
                          >
                            How the money works
                          </h2>
                          <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                            Your merchants pay you, at the prices you set. DripFunnel keeps a wholesale fee for each store and pays you the
                            rest every month, with a statement that shows every line.
                          </p>
                          <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                            Wholesale rates depend on volume. Talk to us for yours.
                          </span>
                        </div>
                        <div
                          style={{
                            background: 'var(--surface,#FFFFFF)',
                            border: '1px solid var(--border,#E8E2DC)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              padding: '14px 18px',
                              borderBottom: '1px solid var(--border,#E8E2DC)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '8px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700' }}>Monthly payout statement</span>
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: '10px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: 'var(--muted,#5A6472)',
                              }}
                            >
                              Example figures
                            </span>
                          </div>
                          {v.pStatement.map((x, x_i) => (
                            <Fragment key={x_i}>
                              <div
                                style={css(
                                  `display:flex;justify-content:space-between;gap:12px;padding:12px 18px;border-bottom:1px solid var(--border,#E8E2DC);font-size:15px;font-weight:${x.w};`,
                                )}
                              >
                                <span>{x.l}</span>
                                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{x.v}</span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </section>
                    <section
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(44px,8cqw,104px) clamp(16px,4cqw,24px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
                        <h2
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(24px,4cqw,42px)',
                            lineHeight: '1.08',
                            letterSpacing: '-0.03em',
                            margin: '0',
                            color: 'var(--head,#0A2A4A)',
                          }}
                        >
                          From first call to live
                        </h2>
                        <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                          Every partner is checked before going live, so shops under your brand start on solid ground.
                        </p>
                      </div>
                      <ol
                        style={{
                          margin: '0',
                          padding: '0',
                          listStyle: 'none',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))',
                          gap: '14px',
                        }}
                      >
                        {v.pSteps.map((x, x_i) => (
                          <Fragment key={x_i}>
                            <li
                              style={{
                                borderTop: '2px solid #EC844F',
                                paddingTop: '14px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                              }}
                            >
                              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: 'var(--link,#B8541F)' }}>
                                {x.n}
                              </span>
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '17px' }}>{x.t}</span>
                              <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>{x.d}</span>
                            </li>
                          </Fragment>
                        ))}
                      </ol>
                    </section>
                    <section data-band="" style={{ background: 'var(--band,#0A2A4A)', color: '#FFFFFF' }}>
                      <div
                        style={{
                          maxWidth: '1240px',
                          margin: '0 auto',
                          padding: 'clamp(44px,7cqw,80px) clamp(16px,4cqw,24px)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '24px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '620px' }}>
                          <span
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(22px,3.6cqw,36px)',
                              letterSpacing: '-0.025em',
                            }}
                          >
                            Tell us about the shops you run.
                          </span>
                          <span style={{ fontSize: '16px', color: '#B8C7D6' }}>
                            How many stores, which countries, and what you’d like to charge. We’ll come back with a wholesale rate and a
                            plan to go live.
                          </span>
                        </div>
                        <Hv
                          as="a"
                          hover={{ background: '#F09A6D', color: '#FFFFFF' }}
                          href="#/contact/partners"
                          style={{
                            height: '48px',
                            padding: '0 24px',
                            borderRadius: '8px',
                            background: '#EC844F',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '700',
                          }}
                        >
                          Talk to us
                        </Hv>
                      </div>
                    </section>
                  </>
                ) : null}
                {v.pg.blog ? (
                  <>
                    {v.blogIndex ? (
                      <>
                        <section
                          data-screen-label="Blog"
                          style={{
                            maxWidth: '1240px',
                            margin: '0 auto',
                            padding: 'clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '28px',
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ width: '32px', height: '2px', background: '#EC844F', display: 'block' }}></span>
                              <span
                                style={{
                                  fontFamily: "'IBM Plex Mono',monospace",
                                  fontSize: '12px',
                                  letterSpacing: '0.14em',
                                  textTransform: 'uppercase',
                                  color: 'var(--muted,#5A6472)',
                                }}
                              >
                                Blog
                              </span>
                            </div>
                            <h1
                              style={{
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '800',
                                fontSize: 'clamp(32px,5.5cqw,56px)',
                                lineHeight: '1.05',
                                letterSpacing: '-0.035em',
                                margin: '0',
                                color: 'var(--head,#0A2A4A)',
                              }}
                            >
                              Running a shop, one guide at a time.
                            </h1>
                          </div>
                          <div role="group" aria-label="Topics" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {v.blogCats.map((c, c_i) => (
                              <Fragment key={c_i}>
                                <button
                                  onClick={c.onClick}
                                  aria-pressed={c.pressed}
                                  style={css(
                                    `min-height:44px;padding:0 16px;border:1px solid ${c.bd};border-radius:22px;background:${c.bg};color:${c.fg};font-family:Inter,sans-serif;font-size:14px;cursor:pointer;`,
                                  )}
                                >
                                  {c.label}
                                </button>
                              </Fragment>
                            ))}
                          </div>
                          <div
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))', gap: '18px' }}
                          >
                            {v.posts.map((p, p_i) => (
                              <Fragment key={p_i}>
                                <Hv
                                  as="a"
                                  hover={{ borderColor: 'var(--outline,#B8541F)', color: 'var(--text,#14181F)' }}
                                  href={p.href}
                                  style={{
                                    background: 'var(--surface,#FFFFFF)',
                                    border: '1px solid var(--border,#E8E2DC)',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textDecoration: 'none',
                                    color: 'var(--text,#14181F)',
                                  }}
                                >
                                  <span
                                    style={{
                                      aspectRatio: '16/9',
                                      background: 'var(--sunk,#F3EDE8)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontFamily: "'IBM Plex Mono',monospace",
                                      fontSize: '10px',
                                      letterSpacing: '0.12em',
                                      textTransform: 'uppercase',
                                      color: 'var(--muted,#5A6472)',
                                    }}
                                  >
                                    Cover image
                                  </span>
                                  <span style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: '1' }}>
                                    <span
                                      style={{
                                        fontFamily: "'IBM Plex Mono',monospace",
                                        fontSize: '11px',
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: 'var(--tint-fg,#8F4017)',
                                      }}
                                    >
                                      {p.cat}
                                    </span>
                                    <span
                                      style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '19px', lineHeight: '1.3' }}
                                    >
                                      {p.title}
                                    </span>
                                    <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)', flex: '1' }}>{p.ex}</span>
                                    <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>{p.meta}</span>
                                  </span>
                                </Hv>
                              </Fragment>
                            ))}
                          </div>
                        </section>
                      </>
                    ) : null}
                    {v.post ? (
                      <>
                        <article
                          data-screen-label="Blog article"
                          style={{
                            maxWidth: '760px',
                            margin: '0 auto',
                            padding: 'clamp(32px,6cqw,72px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '22px',
                          }}
                        >
                          <nav
                            aria-label="Breadcrumb"
                            style={{ fontSize: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap', color: 'var(--muted,#5A6472)' }}
                          >
                            <a href="#/blog">Blog</a>
                            <span aria-hidden="true">/</span>
                            <span>{v.post.cat}</span>
                          </nav>
                          <h1
                            style={{
                              fontFamily: 'Manrope,sans-serif',
                              fontWeight: '800',
                              fontSize: 'clamp(30px,5cqw,50px)',
                              lineHeight: '1.08',
                              letterSpacing: '-0.03em',
                              margin: '0',
                              color: 'var(--head,#0A2A4A)',
                            }}
                          >
                            {v.post.title}
                          </h1>
                          <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                            {v.post.meta}
                            {' · Author name placeholder'}
                          </span>
                          <span
                            style={{
                              aspectRatio: '16/8',
                              borderRadius: '12px',
                              background: 'var(--sunk,#F3EDE8)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: "'IBM Plex Mono',monospace",
                              fontSize: '11px',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--muted,#5A6472)',
                            }}
                          >
                            Cover image
                          </span>
                          <p style={{ margin: '0', fontSize: '19px', lineHeight: '1.65' }}>{v.post.ex}</p>
                          {v.post.body.map((b, b_i) => (
                            <Fragment key={b_i}>
                              <h2
                                style={{
                                  margin: '12px 0 0',
                                  fontFamily: 'Manrope,sans-serif',
                                  fontWeight: '800',
                                  fontSize: '24px',
                                  letterSpacing: '-0.02em',
                                  color: 'var(--head,#0A2A4A)',
                                }}
                              >
                                {b.h}
                              </h2>
                              <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.75' }}>{b.p}</p>
                            </Fragment>
                          ))}
                          {v.post.stub ? (
                            <>
                              <div
                                style={{
                                  border: '1px dashed var(--field,#D7D3CD)',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  fontSize: '15px',
                                  color: 'var(--muted,#5A6472)',
                                }}
                              >
                                Placeholder: the full article goes here.
                              </div>
                            </>
                          ) : null}
                          <div
                            style={{
                              marginTop: '20px',
                              background: 'var(--sunk,#F3EDE8)',
                              borderRadius: '12px',
                              padding: '24px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '16px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '20px' }}>
                                Try it on your own shop
                              </span>
                              <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>
                                Starter is free forever. No card needed.
                              </span>
                            </span>
                            <Hv
                              as="a"
                              hover={{ background: 'var(--btn-h,#D96C33)', color: '#FFFFFF' }}
                              href={v.storeUrl}
                              style={{
                                height: '44px',
                                padding: '0 22px',
                                borderRadius: '8px',
                                background: '#EC844F',
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '700',
                              }}
                            >
                              Start free
                            </Hv>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px' }}>
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: '11px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: 'var(--muted,#5A6472)',
                              }}
                            >
                              Keep reading
                            </span>
                            {v.related.map((r, r_i) => (
                              <Fragment key={r_i}>
                                <a
                                  href={r.href}
                                  style={{ minHeight: '44px', display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: '500' }}
                                >
                                  {r.title}
                                </a>
                              </Fragment>
                            ))}
                          </div>
                        </article>
                      </>
                    ) : null}
                  </>
                ) : null}
                {v.pg.help ? (
                  <>
                    {v.helpIndex ? (
                      <>
                        <section data-screen-label="Help centre" style={{ background: 'var(--sunk,#F3EDE8)' }}>
                          <div
                            style={{
                              maxWidth: '880px',
                              margin: '0 auto',
                              padding: 'clamp(40px,7cqw,88px) clamp(16px,4cqw,24px)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '18px',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}
                          >
                            <h1
                              style={{
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '800',
                                fontSize: 'clamp(30px,5cqw,52px)',
                                lineHeight: '1.05',
                                letterSpacing: '-0.035em',
                                margin: '0',
                                color: 'var(--head,#0A2A4A)',
                              }}
                            >
                              How can we help?
                            </h1>
                            <label style={{ width: '100%', position: 'relative', display: 'block' }}>
                              <span style={{ position: 'absolute', left: '-9999px' }}>Search help articles</span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--muted,#5A6472)' }}
                              >
                                <circle cx="11" cy="11" r="7"></circle>
                                <path d="M20 20l-4-4"></path>
                              </svg>
                              <input
                                type="search"
                                value={v.q}
                                onChange={v.onQ}
                                placeholder="Search, e.g. refund, size chart, GST"
                                style={{
                                  width: '100%',
                                  height: '52px',
                                  padding: '0 16px 0 46px',
                                  border: '1px solid var(--field,#D7D3CD)',
                                  borderRadius: '10px',
                                  background: 'var(--surface,#FFFFFF)',
                                  color: 'var(--text,#14181F)',
                                  fontFamily: 'Inter,sans-serif',
                                  fontSize: '16px',
                                }}
                              />
                            </label>
                          </div>
                        </section>
                        <section
                          style={{
                            maxWidth: '1240px',
                            margin: '0 auto',
                            padding: 'clamp(32px,6cqw,72px) clamp(16px,4cqw,24px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '28px',
                          }}
                        >
                          {v.hasQ ? (
                            <>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <span role="status" style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>
                                  {v.resultLine}
                                </span>
                                {v.hResults.map((a, a_i) => (
                                  <Fragment key={a_i}>
                                    <Hv
                                      as="a"
                                      hover={{ borderColor: 'var(--outline,#B8541F)', color: 'var(--text,#14181F)' }}
                                      href={a.href}
                                      style={{
                                        background: 'var(--surface,#FFFFFF)',
                                        border: '1px solid var(--border,#E8E2DC)',
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '2px',
                                        textDecoration: 'none',
                                        color: 'var(--text,#14181F)',
                                      }}
                                    >
                                      <span style={{ fontWeight: '600', fontSize: '16px' }}>{a.t}</span>
                                      <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>{a.cat}</span>
                                    </Hv>
                                  </Fragment>
                                ))}
                                {v.noResults ? (
                                  <>
                                    <div
                                      style={{
                                        border: '1px solid var(--border,#E8E2DC)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        fontSize: '15px',
                                      }}
                                    >
                                      {'Nothing matches that yet. Try another word, or '}
                                      <a href="#/contact/support">ask our support team</a>.
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </>
                          ) : null}
                          {v.noQ ? (
                            <>
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,270px),1fr))',
                                  gap: '14px',
                                }}
                              >
                                {v.hcats.map((c, c_i) => (
                                  <Fragment key={c_i}>
                                    <div
                                      style={{
                                        background: 'var(--surface,#FFFFFF)',
                                        border: '1px solid var(--border,#E8E2DC)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px',
                                      }}
                                    >
                                      <h2 style={{ margin: '0', fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '18px' }}>
                                        {c.t}
                                      </h2>
                                      <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>{c.d}</span>
                                      <ul
                                        style={{
                                          margin: '6px 0 0',
                                          padding: '0',
                                          listStyle: 'none',
                                          display: 'flex',
                                          flexDirection: 'column',
                                        }}
                                      >
                                        {c.arts.map((a, a_i) => (
                                          <Fragment key={a_i}>
                                            <li>
                                              <a
                                                href={a.href}
                                                style={{ minHeight: '40px', display: 'flex', alignItems: 'center', fontSize: '15px' }}
                                              >
                                                {a.t}
                                              </a>
                                            </li>
                                          </Fragment>
                                        ))}
                                      </ul>
                                    </div>
                                  </Fragment>
                                ))}
                              </div>
                            </>
                          ) : null}
                          <div
                            style={{
                              background: 'var(--surface,#FFFFFF)',
                              border: '1px solid var(--border,#E8E2DC)',
                              borderRadius: '12px',
                              padding: '24px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '16px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '20px' }}>Still stuck?</span>
                              <span style={{ fontSize: '15px', color: 'var(--muted,#5A6472)' }}>
                                Write to our support team. Paid plans also get chat from inside the portal.
                              </span>
                            </span>
                            <Hv
                              as="a"
                              hover={{ background: 'var(--btn-h,#D96C33)', color: '#FFFFFF' }}
                              href="#/contact/support"
                              style={{
                                height: '44px',
                                padding: '0 22px',
                                borderRadius: '8px',
                                background: '#EC844F',
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '700',
                              }}
                            >
                              Contact support
                            </Hv>
                          </div>
                        </section>
                      </>
                    ) : null}
                    {v.hart ? (
                      <>
                        <article
                          data-screen-label="Help article"
                          style={{
                            maxWidth: '1240px',
                            margin: '0 auto',
                            padding: 'clamp(32px,6cqw,64px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
                            gap: '40px',
                            alignItems: 'start',
                          }}
                        >
                          <div
                            style={{
                              gridColumn: 'span 2',
                              minWidth: 'min(100%,300px)',
                              maxWidth: '720px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '18px',
                            }}
                          >
                            <nav
                              aria-label="Breadcrumb"
                              style={{ fontSize: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap', color: 'var(--muted,#5A6472)' }}
                            >
                              <a href="#/help">Help centre</a>
                              <span aria-hidden="true">/</span>
                              <span>{v.hart.cat}</span>
                            </nav>
                            <h1
                              style={{
                                fontFamily: 'Manrope,sans-serif',
                                fontWeight: '800',
                                fontSize: 'clamp(26px,4.4cqw,42px)',
                                lineHeight: '1.1',
                                letterSpacing: '-0.03em',
                                margin: '0',
                                color: 'var(--head,#0A2A4A)',
                              }}
                            >
                              {v.hart.t}
                            </h1>
                            <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                              {'Updated 1 October 2026 · '}
                              {v.hart.who}
                            </span>
                            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.7' }}>{v.hart.intro}</p>
                            <ol
                              style={{
                                margin: '0',
                                padding: '0 0 0 22px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                fontSize: '16px',
                                lineHeight: '1.65',
                              }}
                            >
                              {v.hart.steps.map((x, x_i) => (
                                <Fragment key={x_i}>
                                  <li>{x}</li>
                                </Fragment>
                              ))}
                            </ol>
                            {v.hart.note ? (
                              <>
                                <div
                                  style={{
                                    background: 'var(--sunk,#F3EDE8)',
                                    borderRadius: '12px',
                                    padding: '16px 18px',
                                    fontSize: '15px',
                                  }}
                                >
                                  <strong>{'Good to know: '}</strong>
                                  {v.hart.note}
                                </div>
                              </>
                            ) : null}
                            {v.hart.stub ? (
                              <>
                                <div
                                  style={{
                                    border: '1px dashed var(--field,#D7D3CD)',
                                    borderRadius: '12px',
                                    padding: '18px',
                                    fontSize: '15px',
                                    color: 'var(--muted,#5A6472)',
                                  }}
                                >
                                  Placeholder: step-by-step instructions go here.
                                </div>
                              </>
                            ) : null}
                            <div
                              style={{
                                borderTop: '1px solid var(--border,#E8E2DC)',
                                paddingTop: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                flexWrap: 'wrap',
                              }}
                            >
                              {v.askHelpful ? (
                                <>
                                  <span style={{ fontSize: '15px' }}>Did this answer your question?</span>
                                  <Hv
                                    as="button"
                                    hover={{ background: 'var(--outline-h,#FDF0E8)' }}
                                    onClick={v.yesHelpful}
                                    style={{
                                      height: '44px',
                                      padding: '0 16px',
                                      border: '1px solid var(--outline,#B8541F)',
                                      borderRadius: '8px',
                                      background: 'transparent',
                                      color: 'var(--outline,#B8541F)',
                                      fontFamily: 'Inter,sans-serif',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Yes
                                  </Hv>
                                  <Hv
                                    as="button"
                                    hover={{ background: 'var(--outline-h,#FDF0E8)' }}
                                    onClick={v.noHelpful}
                                    style={{
                                      height: '44px',
                                      padding: '0 16px',
                                      border: '1px solid var(--outline,#B8541F)',
                                      borderRadius: '8px',
                                      background: 'transparent',
                                      color: 'var(--outline,#B8541F)',
                                      fontFamily: 'Inter,sans-serif',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    No
                                  </Hv>
                                </>
                              ) : null}
                              {v.helpfulMsg ? (
                                <>
                                  <span role="status" style={{ fontSize: '15px' }}>
                                    {v.helpfulMsg}
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </div>
                          <aside style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div
                              style={{
                                background: 'var(--surface,#FFFFFF)',
                                border: '1px solid var(--border,#E8E2DC)',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                              }}
                            >
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '16px', paddingBottom: '4px' }}>
                                {'More in '}
                                {v.hart.cat}
                              </span>
                              {v.hart.more.map((a, a_i) => (
                                <Fragment key={a_i}>
                                  <a href={a.href} style={{ minHeight: '40px', display: 'flex', alignItems: 'center', fontSize: '15px' }}>
                                    {a.t}
                                  </a>
                                </Fragment>
                              ))}
                            </div>
                            <div
                              style={{
                                background: 'var(--surface,#FFFFFF)',
                                border: '1px solid var(--border,#E8E2DC)',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                              }}
                            >
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '700', fontSize: '16px' }}>Need a person?</span>
                              <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>
                                Tell us your store name and what you were trying to do.
                              </span>
                              <Hv
                                as="a"
                                hover={{ background: 'var(--outline-h,#FDF0E8)', color: 'var(--outline,#B8541F)' }}
                                href="#/contact/support"
                                style={{
                                  height: '44px',
                                  border: '1px solid var(--outline,#B8541F)',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  textDecoration: 'none',
                                  fontFamily: 'Manrope,sans-serif',
                                  fontWeight: '700',
                                  fontSize: '14px',
                                  color: 'var(--outline,#B8541F)',
                                }}
                              >
                                Contact support
                              </Hv>
                            </div>
                          </aside>
                        </article>
                      </>
                    ) : null}
                  </>
                ) : null}
                {v.pg.contact ? (
                  <>
                    <section
                      data-screen-label="Contact"
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
                        gap: 'clamp(32px,5cqw,64px)',
                        alignItems: 'start',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ width: '32px', height: '2px', background: '#EC844F', display: 'block' }}></span>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono',monospace",
                              fontSize: '12px',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: 'var(--muted,#5A6472)',
                            }}
                          >
                            Contact
                          </span>
                        </div>
                        <h1
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(30px,5cqw,54px)',
                            lineHeight: '1.05',
                            letterSpacing: '-0.035em',
                            margin: '0',
                            color: 'var(--head,#0A2A4A)',
                          }}
                        >
                          Book a demo or ask us anything.
                        </h1>
                        <p style={{ margin: '0', fontSize: '17px', color: 'var(--muted,#5A6472)' }}>
                          A demo is a 30-minute video call. We build a shop from your description while you watch, then answer your
                          questions about plans, selling abroad or moving from another platform.
                        </p>
                        <dl style={{ margin: '0', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border,#E8E2DC)' }}>
                          <div
                            style={{
                              padding: '14px 0',
                              borderBottom: '1px solid var(--border,#E8E2DC)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                            }}
                          >
                            <dt style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>Sales and partners</dt>
                            <dd style={{ margin: '0' }}>
                              <a href="mailto:sales@dripfunnel.com" style={{ fontSize: '17px', fontWeight: '500' }}>
                                sales@dripfunnel.com
                              </a>
                            </dd>
                          </div>
                          <div
                            style={{
                              padding: '14px 0',
                              borderBottom: '1px solid var(--border,#E8E2DC)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                            }}
                          >
                            <dt style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>Help with your shop</dt>
                            <dd style={{ margin: '0' }}>
                              <a href="mailto:support@dripfunnel.com" style={{ fontSize: '17px', fontWeight: '500' }}>
                                support@dripfunnel.com
                              </a>
                              {' · or the '}
                              <a href="#/help">help centre</a>
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <div
                        style={{
                          background: 'var(--surface,#FFFFFF)',
                          border: '1px solid var(--border,#E8E2DC)',
                          borderRadius: '16px',
                          padding: 'clamp(20px,3cqw,32px)',
                        }}
                      >
                        {v.sent ? (
                          <>
                            <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px 0' }}>
                              <span
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '50%',
                                  background: 'var(--okbg,#EEF7F2)',
                                  color: 'var(--okfg,#1D6B47)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                >
                                  <path d="M5 12l5 5L20 7"></path>
                                </svg>
                              </span>
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: '800', fontSize: '24px' }}>{v.sentTitle}</span>
                              <span style={{ fontSize: '16px', color: 'var(--muted,#5A6472)' }}>{v.sentBody}</span>
                              <button
                                onClick={v.resetForm}
                                style={{
                                  alignSelf: 'flex-start',
                                  height: '44px',
                                  padding: '0',
                                  border: '0',
                                  background: 'transparent',
                                  color: 'var(--link,#B8541F)',
                                  fontFamily: 'Inter,sans-serif',
                                  fontSize: '15px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                }}
                              >
                                Send another message
                              </button>
                            </div>
                          </>
                        ) : null}
                        {v.notSent ? (
                          <>
                            <form onSubmit={v.submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                              <fieldset
                                style={{ border: '0', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}
                              >
                                <legend style={{ fontSize: '14px', fontWeight: '600', padding: '0 0 8px' }}>What can we help with?</legend>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                  {v.topics.map((t, t_i) => (
                                    <Fragment key={t_i}>
                                      <button
                                        type="button"
                                        onClick={t.onClick}
                                        aria-pressed={t.pressed}
                                        style={css(
                                          `min-height:44px;padding:0 14px;border:1px solid ${t.bd};border-radius:8px;background:${t.bg};color:${t.fg};font-family:Inter,sans-serif;font-size:14px;font-weight:500;cursor:pointer;`,
                                        )}
                                      >
                                        {t.label}
                                      </button>
                                    </Fragment>
                                  ))}
                                </div>
                              </fieldset>
                              {v.fields.map((f, f_i) => (
                                <Fragment key={f_i}>
                                  <label
                                    style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: '600' }}
                                  >
                                    {f.label}{' '}
                                    <input
                                      type={f.type}
                                      value={f.value}
                                      onChange={f.onChange}
                                      placeholder={f.ph}
                                      autoComplete={f.ac}
                                      aria-invalid={f.inv}
                                      style={css(
                                        `height:48px;padding:0 14px;border:${f.bd};border-radius:8px;background:var(--surface,#FFFFFF);color:var(--text,#14181F);font-family:Inter,sans-serif;font-size:16px;font-weight:400;`,
                                      )}
                                    />
                                    {f.err ? (
                                      <>
                                        <span role="alert" style={{ fontSize: '14px', fontWeight: '400', color: 'var(--link,#B8541F)' }}>
                                          {f.err}
                                        </span>
                                      </>
                                    ) : null}
                                  </label>
                                </Fragment>
                              ))}
                              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: '600' }}>
                                {'Country '}
                                <select
                                  value={v.form.country}
                                  onChange={v.onCountry}
                                  style={{
                                    height: '48px',
                                    padding: '0 12px',
                                    border: '1px solid var(--field,#D7D3CD)',
                                    borderRadius: '8px',
                                    background: 'var(--surface,#FFFFFF)',
                                    color: 'var(--text,#14181F)',
                                    fontFamily: 'Inter,sans-serif',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                  }}
                                >
                                  <option value="">Choose a country</option>
                                  {v.countries.map((c, c_i) => (
                                    <Fragment key={c_i}>
                                      <option value={c}>{c}</option>
                                    </Fragment>
                                  ))}
                                </select>
                              </label>
                              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: '600' }}>
                                {v.msgLabel}{' '}
                                <textarea
                                  rows="4"
                                  value={v.form.msg}
                                  onChange={v.onMsg}
                                  placeholder={v.msgPh}
                                  aria-invalid={v.msgInv}
                                  style={css(
                                    `padding:12px 14px;border:${v.msgBd};border-radius:8px;background:var(--surface,#FFFFFF);color:var(--text,#14181F);font-family:Inter,sans-serif;font-size:16px;font-weight:400;line-height:1.6;resize:vertical;`,
                                  )}
                                ></textarea>
                                {v.errs.msg ? (
                                  <>
                                    <span role="alert" style={{ fontSize: '14px', fontWeight: '400', color: 'var(--link,#B8541F)' }}>
                                      {v.errs.msg}
                                    </span>
                                  </>
                                ) : null}
                              </label>
                              <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)' }}>
                                {'We use these details only to reply to you. See our '}
                                <a href="#/privacy">Privacy Policy</a>.
                              </span>
                              <Hv
                                as="button"
                                hover={{ background: 'var(--btn-h,#D96C33)' }}
                                type="submit"
                                style={{
                                  height: '48px',
                                  border: '0',
                                  borderRadius: '8px',
                                  background: '#EC844F',
                                  color: '#FFFFFF',
                                  fontFamily: 'Manrope,sans-serif',
                                  fontWeight: '700',
                                  fontSize: '16px',
                                  cursor: 'pointer',
                                }}
                              >
                                {v.submitLabel}
                              </Hv>
                            </form>
                          </>
                        ) : null}
                      </div>
                    </section>
                  </>
                ) : null}
                {v.legalOn ? (
                  <>
                    <section
                      data-screen-label="Legal"
                      style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(40px,7cqw,80px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
                        gap: '40px',
                        alignItems: 'start',
                      }}
                    >
                      <nav
                        aria-label="On this page"
                        style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: 'sticky', top: '96px' }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '11px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--muted,#5A6472)',
                            paddingBottom: '8px',
                          }}
                        >
                          On this page
                        </span>
                        {v.legal.secs.map((x, x_i) => (
                          <Fragment key={x_i}>
                            <Hv
                              as="button"
                              hover={{ color: 'var(--link,#B8541F)' }}
                              onClick={x.jump}
                              style={{
                                minHeight: '40px',
                                padding: '0',
                                border: '0',
                                background: 'transparent',
                                textAlign: 'left',
                                color: 'var(--text,#14181F)',
                                fontFamily: 'Inter,sans-serif',
                                fontSize: '14px',
                                cursor: 'pointer',
                              }}
                            >
                              {x.n}
                              {'. '}
                              {x.h}
                            </Hv>
                          </Fragment>
                        ))}
                        <a
                          href={v.legal.otherHref}
                          style={{ minHeight: '44px', display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '12px' }}
                        >
                          {v.legal.other}
                        </a>
                      </nav>
                      <article
                        style={{
                          gridColumn: 'span 3',
                          minWidth: 'min(100%,300px)',
                          maxWidth: '760px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '18px',
                        }}
                      >
                        <h1
                          style={{
                            fontFamily: 'Manrope,sans-serif',
                            fontWeight: '800',
                            fontSize: 'clamp(30px,5cqw,50px)',
                            lineHeight: '1.05',
                            letterSpacing: '-0.035em',
                            margin: '0',
                            color: 'var(--head,#0A2A4A)',
                          }}
                        >
                          {v.legal.title}
                        </h1>
                        <span style={{ fontSize: '14px', color: 'var(--muted,#5A6472)' }}>Last updated: [date] · Applies from: [date]</span>
                        <div
                          role="note"
                          style={{
                            background: 'var(--tint,#FDF0E8)',
                            color: 'var(--tint-fg,#8F4017)',
                            borderRadius: '12px',
                            padding: '14px 16px',
                            fontSize: '15px',
                          }}
                        >
                          Template text. Replace every section with wording approved by your lawyer before publishing.
                        </div>
                        <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.7' }}>{v.legal.intro}</p>
                        {v.legal.secs.map((x, x_i) => (
                          <Fragment key={x_i}>
                            <section id={x.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px' }}>
                              <h2
                                style={{
                                  margin: '0',
                                  fontFamily: 'Manrope,sans-serif',
                                  fontWeight: '800',
                                  fontSize: '22px',
                                  letterSpacing: '-0.02em',
                                  color: 'var(--head,#0A2A4A)',
                                }}
                              >
                                {x.n}
                                {'. '}
                                {x.h}
                              </h2>
                              <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.75' }}>{x.p}</p>
                            </section>
                          </Fragment>
                        ))}
                      </article>
                    </section>
                  </>
                ) : null}
              </main>
              <footer data-band="" style={{ background: '#0A2A4A', color: '#FFFFFF' }}>
                <div
                  style={{
                    maxWidth: '1240px',
                    margin: '0 auto',
                    padding: '64px clamp(16px,4cqw,24px) 32px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))',
                    gap: '36px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      gridColumn: 'span 2',
                      minWidth: '0',
                      maxWidth: '360px',
                    }}
                  >
                    <img
                      src="/assets/dripfunnel-logo-inverse.svg"
                      alt="DripFunnel"
                      style={{ height: '28px', width: 'auto', alignSelf: 'flex-start' }}
                    />
                    <span style={{ fontSize: '15px', color: '#B8C7D6', lineHeight: '1.6' }}>
                      Describe your business and AI builds your whole store. Then run catalogue, orders, offers, suppliers and selling
                      abroad from one portal.
                    </span>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#B8C7D6' }}>
                      {'Show prices in '}
                      <select
                        value={v.cur}
                        onChange={v.onCur}
                        style={{
                          height: '44px',
                          maxWidth: '220px',
                          border: '1px solid #2A4C6E',
                          borderRadius: '8px',
                          background: '#071F35',
                          color: '#FFFFFF',
                          padding: '0 12px',
                          fontFamily: 'Inter,sans-serif',
                          fontSize: '15px',
                        }}
                      >
                        <option value="USD">US dollars (USD)</option>
                        <option value="EUR">Euros (EUR)</option>
                        <option value="INR">Indian rupees (INR)</option>
                      </select>
                    </label>
                  </div>
                  {v.footCols.map((c, c_i) => (
                    <Fragment key={c_i}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: '11px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: '#B8C7D6',
                            paddingBottom: '6px',
                          }}
                        >
                          {c.h}
                        </span>
                        {c.links.map((l, l_i) => (
                          <Fragment key={l_i}>
                            <Hv
                              as="a"
                              hover={{ color: '#F09A6D' }}
                              href={l.href}
                              style={{
                                minHeight: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                fontSize: '15px',
                              }}
                            >
                              {l.label}
                            </Hv>
                          </Fragment>
                        ))}
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div
                  style={{
                    maxWidth: '1240px',
                    margin: '0 auto',
                    padding: '20px clamp(16px,4cqw,24px) 32px',
                    borderTop: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                    fontSize: '13px',
                    color: '#B8C7D6',
                  }}
                >
                  <span>© 2026 DripFunnel. A Softobotics company.</span>
                  <Hv
                    as="button"
                    hover={{ background: 'rgba(255,255,255,0.08)' }}
                    onClick={v.toggleTheme}
                    style={{
                      height: '44px',
                      padding: '0 14px',
                      border: '1px solid #2A4C6E',
                      borderRadius: '8px',
                      background: 'transparent',
                      color: '#FFFFFF',
                      fontFamily: 'Inter,sans-serif',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {v.themeLabel}
                  </Hv>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

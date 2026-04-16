'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, Home } from 'lucide-react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/ai-remodel', label: 'AI Remodel' },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : '`}`} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="nav__logo" aria-label="${process.env.NEXT_PUBLIC_BUSINESS_NAME} — Home">
          <Home size={18} strokeWidth={1.5} />
          Freedom <span>Home Remodeling</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav__links" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`nav__link ${pathname === l.href ? `nav__link--active' : ''}`}
                aria-current={pathname === l.href ? 'page' : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Phone + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem` }}>
          <a href="tel:+18055550192" className="nav__phone" aria-label="Call ${process.env.NEXT_PUBLIC_BUSINESS_NAME}">
            <Phone size={15} strokeWidth={2} />
            (805) 555-0192
          </a>
          <Link href="/contact" className="nav__cta" id="nav-get-quote">
            Free Estimate
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="nav__hamburger"
          id="mobile-menu-toggle"
          aria-label={mobileOpen ? `Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} stroke="var(--color-trust-blue)" /> : <Menu size={22} stroke="var(--color-trust-blue)" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'oklch(0.10 0.040 245 / 0.45)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(320px, 85vw)',
          background: 'var(--color-canvas)',
          zIndex: 150,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s var(--ease-out-expo)',
          padding: '5rem 2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          borderLeft: '1px solid oklch(0.90 0.008 245)',
        }}
        aria-label="Mobile navigation"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '1rem 0',
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: pathname === l.href ? 'var(--color-trust-blue)' : 'var(--color-ink)',
              borderBottom: '1px solid oklch(0.94 0.006 245)',
            }}
          >
            {l.label}
          </Link>
        ))}
        <a
          href="tel:+18055550192"
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-trust-blue)',
          }}
        >
          <Phone size={16} /> (805) 555-0192
        </a>
      </div>
    </>
  );
}

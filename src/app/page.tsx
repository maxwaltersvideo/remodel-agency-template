import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollReveal from '@/components/ScrollReveal';
import StatCounter from '@/components/StatCounter';
import {
  Star, Shield, Award, CheckCircle, ChevronRight,
  Home, Layers, Ruler, Building, ArrowRight,
  Phone, Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_BUSINESS_NAME} | ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} Design-Build Remodeler`,
  description: `Boutique architectural remodeling in ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}, CA. Kitchens, bathrooms, ADUs, and whole-home transformations engineered for ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s coastal salt-air climate.`,
  alternates: { canonical: '/' },
};

const services = [
  {
    icon: Home,
    name: 'Whole-Home Remodels',
    italic: 'Design-Build',
    desc: `From conceptual drawings to final walkthrough — we manage every trade under one roof so you never juggle subcontractors in ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s busy market.`,
  },
  {
    icon: Layers,
    name: 'Kitchen & Bath',
    italic: 'Transformations',
    desc: `Calacatta marble, custom millwork, and marine-grade finishes that laugh at ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s humidity and last decades longer than standard installs.`,
  },
  {
    icon: Building,
    name: 'ADU & Room',
    italic: 'Additions',
    desc: `Permitted ADUs and room additions that add equity faster than anywhere in the ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} area. We handle the engineering, city approvals, and the build.`,
  },
  {
    icon: Ruler,
    name: 'Architectural',
    italic: 'Design',
    desc: 'In-house design services mean your vision is never lost in translation. We draft, engineer, and build — one team, one contract, zero surprises.',
  },
  {
    icon: Shield,
    name: 'Structural & Foundation',
    italic: 'Work',
    desc: `Seismic activity demands structural rigor. Our licensed engineers design for ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s unique soil conditions.`,
  },
  {
    icon: Award,
    name: 'Outdoor Living &',
    italic: 'Landscape Integration',
    desc: 'From canyon-view terraces to infinity pools framing the Santa Monica Mountains — outdoor spaces that extend your living square footage year-round.',
  },
];

const testimonials = [
  {
    quote: 'Freedom transformed our 1987 tract home into something that looks it belongs in Architectural Digest. The attention to marine-layer light in the design was a detail I didn\'t even know to ask for.',
    author: 'Sarah & Tom K.',
    location: `${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} — Kitchen & Primary Suite Remodel`,
    stars: 5,
  },
  {
    quote: 'We had three other bids. Freedom was not the cheapest — but they were the only ones who came with engineered drawings before we signed anything. Completed on time, on budget.',
    author: 'David M.',
    location: `${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} — Full Home Remodel, 3,200 sq ft`,
    stars: 5,
  },
  {
    quote: 'Our ADU permit was approved in 6 weeks. Freedom handled everything — design, structural, city plan check. We\'re already renting it at $2,400/month.',
    author: 'Priya & Ankur S.',
    location: `${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} — 640 sq ft ADU Build`,
    stars: 5,
  },
];

const trustItems = [
  { icon: Star, text: '4.9 / 5  ·  87 Google Reviews' },
  { icon: Shield, text: 'Lic. #1102847 · Fully Insured' },
  { icon: Award, text: 'NARI Member · BBB A+ Rated' },
  { icon: CheckCircle, text: '15-Year Workmanship Warranty' },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <ScrollReveal />
      <main>
        {/* ── HERO — Right-Pocket Split-Screen ── */}
        <section className="split-screen" aria-label="Hero" id="hero">
          {/* LEFT — Text Pocket */}
          <div className="split-screen__text">
            <p className="overline reveal">{process.env.NEXT_PUBLIC_LOCATION_PRIMARY} · Est. {process.env.NEXT_PUBLIC_FOUNDED_YEAR}</p>
            <h1 className="display-xl reveal delay-1" style={{ marginTop: '1rem', marginBottom: '1.25rem' }}>
              Built for the<br />Coast. <em>Designed</em><br />to Last.
            </h1>
            <p className="body-lg reveal delay-2" style={{ maxWidth: '440px', marginBottom: '2rem' }}>
              {process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s environment is relentless — generic remodels don't survive it.
              {process.env.NEXT_PUBLIC_BUSINESS_NAME} engineers every project for the local climate,
              so your investment looks immaculate in decade two, not just day one.
            </p>
            <div className="reveal delay-3" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-gold" id="hero-cta-primary">
                Schedule Free Design Consult <ChevronRight size={16} />
              </Link>
              <Link href="/portfolio" className="btn-ghost" id="hero-cta-portfolio">
                View Our Work
              </Link>
            </div>

            {/* Floating trust badge */}
            <div
              className="reveal delay-4 float-anim"
              style={{
                marginTop: '3rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                background: 'var(--color-canvas-alt)',
                border: '1px solid oklch(0.90 0.008 245)',
                boxShadow: 'var(--shadow-hard)',
                maxWidth: '380px',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '0.25rem' }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} fill="var(--color-warm-gold)" stroke="none" />
                  ))}
                </div>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-trust-blue)' }}>
                  4.9 stars · 87 Google Reviews
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>
                  {process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s top-rated design-build firm
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Image (55%) */}
          <div className="split-screen__image">
            <Image
              src="/hero-camarillo.png"
              alt={`Luxury ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} home — remodeled by ${process.env.NEXT_PUBLIC_BUSINESS_NAME}`}
              fill
              priority
              fetchPriority="high"
              quality={75}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Subtle left fade so image bleeds into text */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, var(--color-canvas) 0%, transparent 12%)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="trust-bar" role="complementary" aria-label="Trust signals">
          <div className="trust-bar__inner container">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.text}>
                <item.icon size={15} strokeWidth={2} />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <section aria-label="Company statistics" style={{ borderBottom: '1px solid oklch(0.90 0.008 245)' }}>
          <div className="stats-grid container" style={{ padding: 0 }}>
            <StatCounter value={140} suffix="+" label="Projects Completed" />
            <StatCounter value={15} suffix=" Yrs" label="Workmanship Warranty" />
            <StatCounter value={98} suffix="%" label="On-Time Completion Rate" />
            <StatCounter value={parseInt(process.env.NEXT_PUBLIC_FOUNDED_YEAR || '2009', 10)} prefix="" label={`Serving ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} Since`} duration={1500} />
          </div>
        </section>

        {/* ── ABOUT STRIP ── */}
        <section className="section section-alt" aria-labelledby="about-strip-heading">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p className="overline reveal">Architectural Design-Build</p>
              <h2 className="heading-2 reveal delay-1" id="about-strip-heading" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                One Team. One Contract.<br /><em>Zero Translation Loss.</em>
              </h2>
              <p className="body-lg reveal delay-2" style={{ marginBottom: '1rem' }}>
                Most {process.env.NEXT_PUBLIC_LOCATION_PRIMARY} remodels fail because the designer hands off to a contractor who hands off to subs
                who've never seen the drawings. At Freedom, our architects, project managers, and licensed tradespeople
                share one roof — and one accountability chain.
              </p>
              <p className="body-lg reveal delay-3" style={{ marginBottom: '2rem' }}>
                We've spent years mastering the specific challenges of local builds,
                including structural requirements and the seismic
                design codes that govern our region.
              </p>
              <Link href="/about" className="btn-ghost reveal delay-4" id="about-strip-cta">
                Our Story <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {[
                { src: '/portfolio-kitchen.png', alt: 'Luxury kitchen remodel with marble island and ocean view' },
                { src: '/portfolio-bathroom.png', alt: 'Spa-primary bathroom with skylight and soaking tub' },
              ].map((img) => (
                <div key={img.src} style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }} className="reveal">
                  <Image src={img.src} alt={img.alt} fill quality={75} style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="section" aria-labelledby="services-heading">
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
              <p className="overline reveal">What We Build</p>
              <h2 className="heading-2 reveal delay-1" id="services-heading" style={{ marginTop: '0.75rem' }}>
                Every Trade. <em>One Firm.</em>
              </h2>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <div key={s.name} className={`service-card reveal delay-${(i % 5) + 1}`}>
                  <s.icon className="service-card__icon" strokeWidth={1.25} />
                  <div className="service-card__name">
                    {s.name} <em>{s.italic}</em>
                  </div>
                  <p className="service-card__desc">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div className="reveal" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-light)', marginBottom: '1.25rem' }}>
                Not sure where to start? A free 45-minute design consult clarifies everything.
              </p>
              <Link href="/contact" className="btn-primary" id="services-cta">
                Get My Free Estimate <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO PREVIEW ── */}
        <section className="section section-alt" aria-labelledby="portfolio-heading">
          <div className="container" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <p className="overline reveal">Recent Projects</p>
                <h2 className="heading-2 reveal delay-1" id="portfolio-heading" style={{ marginTop: '0.75rem' }}>
                  The Proof <em>Engine</em>
                </h2>
              </div>
              <Link href="/portfolio" className="btn-ghost reveal" id="portfolio-preview-cta">
                View All Work <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="portfolio-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {[
              { src: '/hero-camarillo.png', title: 'Camarillo Heights Whole-Home', sqft: '3,200 sq ft', year: '2024', value: '$420K+' },
              { src: '/portfolio-kitchen.png', title: 'Old Town Kitchen & Primary Suite', sqft: '800 sq ft', year: '2024', value: '$185K' },
              { src: '/portfolio-bathroom.png', title: 'Las Posas Estates Spa Bath', sqft: '460 sq ft', year: '2023', value: '$95K' },
              { src: '/portfolio-adu.png', title: 'Mission Oaks ADU Build', sqft: '640 sq ft', year: '2024', value: '$210K' },
            ].map((card, i) => (
              <div key={card.src} className={`portfolio-card reveal delay-${i + 1}`}>
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  quality={75}
                  className="portfolio-card__image"
                  style={{ objectFit: 'cover' }}
                />
                <div className="portfolio-card__overlay">
                  <div className="portfolio-card__meta">
                    <span className="badge">{card.sqft}</span>
                    <span className="badge">{card.year}</span>
                    <span className="badge badge--gold">{card.value}</span>
                  </div>
                  <p className="portfolio-card__title">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="section" aria-labelledby="testimonials-heading">
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
              <p className="overline reveal">Your Neighbors Agree</p>
              <h2 className="heading-2 reveal delay-1" id="testimonials-heading" style={{ marginTop: '0.75rem' }}>
                What Camarillo<br /><em>Homeowners Say</em>
              </h2>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((t, i) => (
                <div key={t.author} className={`testimonial-card reveal delay-${i + 1}`}>
                  <div className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={14} fill="var(--color-warm-gold)" stroke="none" />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div>
                    <p className="testimonial-author">{t.author}</p>
                    <p className="testimonial-location">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA BAND ── */}
        <section
          style={{
            background: 'var(--color-trust-blue)',
            padding: '5rem 0',
          }}
          aria-label="Final call to action"
        >
          <div className="container" style={{ textAlign: 'center' }}>
            <p className="overline reveal" style={{ color: 'oklch(0.72 0.035 245)' }}>
              Limited Availability — Summer 2025
            </p>
            <h2
              className="reveal delay-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                color: '#fff',
                marginTop: '0.75rem',
                marginBottom: '1.25rem',
                lineHeight: 1.1,
              }}
            >
              Your home's potential is waiting.<br />
              <em style={{ fontStyle: 'italic', color: 'oklch(0.78 0.03 245)' }}>Let's design it together.</em>
            </h2>
            <p className="reveal delay-2" style={{ fontSize: '0.95rem', color: 'oklch(0.72 0.030 245)', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
              Only 3 design consultation slots available this month. Secure yours before they fill.
            </p>
            <div className="reveal delay-3" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-gold" id="footer-cta-primary">
                Schedule My Free Consult <ChevronRight size={16} />
              </Link>
              <a href="tel:+18055550192" className="btn-ghost" id="footer-cta-phone" style={{ color: '#fff', borderColor: 'oklch(1 0 0 / 0.35)' }}>
                <Phone size={15} /> (805) 555-0192
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="footer__grid">
              <div>
                <p className="footer__brand" dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Design Build' }}></p>
                <p className="footer__tagline">
                  {process.env.NEXT_PUBLIC_BUSINESS_DESCRIPTION_LONG}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1.5rem' }}>
                  <a href="tel:+18055550192" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'oklch(0.78 0.020 245)' }}>
                    <Phone size={14} /> (805) 555-0192
                  </a>
                  <a href="mailto:hello@freedomhomeremodeling.com" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'oklch(0.78 0.020 245)' }}>
                    <Mail size={14} /> hello@freedomhomeremodeling.com
                  </a>
                </div>
              </div>
              <div>
                <p className="footer__heading">Services</p>
                <ul className="footer__links">
                  {['Whole-Home Remodels', 'Kitchen Remodels', 'Bathroom Remodels', 'ADU Construction', 'Room Additions', 'Architectural Design'].map(s => (
                    <li key={s}><Link href="/contact">{s}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="footer__heading">Company</p>
                <ul className="footer__links">
                  {[['/', 'Home'], ['/portfolio', 'Portfolio'], ['/about', 'About Us'], ['/contact', 'Contact'], ['/ai-remodel', 'AI Remodel Tool']].map(([href, label]) => (
                    <li key={href}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="footer__heading">Service Area</p>
                <ul className="footer__links">
                  {[`${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}`, 'Surrounding Areas'].map(c => (
                    <li key={c}><span style={{ color: 'oklch(0.72 0.020 245)' }}>{c}, CA</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="footer__bottom">
              <p>© 2025 ${process.env.NEXT_PUBLIC_BUSINESS_NAME}. Lic. #1102847. All rights reserved.</p>
              <p style={{ fontSize: '0.72rem' }}>
                <a href="#" style={{ color: 'oklch(0.55 0.020 245)' }}>Privacy Policy</a> · <a href="#" style={{ color: 'oklch(0.55 0.020 245)' }}>Terms of Service</a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

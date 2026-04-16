import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollReveal from '@/components/ScrollReveal';
import { ChevronRight, MapPin, Square, Calendar, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: `Portfolio | ${process.env.NEXT_PUBLIC_BUSINESS_NAME} — Camarillo Design-Build Projects`,
  description: `Browse ${process.env.NEXT_PUBLIC_BUSINESS_NAME}\`s portfolio of completed kitchen remodels, bathroom transformations, ADU builds, and whole-home renovations in Camarillo and Ventura County.',
};

const projects = [
  {
    id: 'camarillo-heights-whole-home',
    src: '/hero-camarillo.png',
    title: 'Camarillo Heights Whole-Home Transformation',
    location: 'Camarillo Heights, CA',
    sqft: '3,200',
    year: '2024',
    value: '$420,000+',
    category: 'Whole-Home',
    challenge: 'Structural reconfiguration on a 1978 hillside foundation with expansive clay soil.',
    result: 'Zero structural claims. Completed 3 weeks ahead of schedule.',
  },
  {
    id: 'old-town-kitchen',
    src: '/portfolio-kitchen.png',
    title: 'Old Town Kitchen & Primary Suite',
    location: 'Old Town Camarillo, CA',
    sqft: '800',
    year: '2024',
    value: '$185,000',
    category: 'Kitchen + Bath',
    challenge: 'Navigating load-bearing wall removal to open the floor plan while preserving cathedral ceilings.',
    result: 'Open-concept kitchen increases appraised value by an estimated $125K.',
  },
  {
    id: 'las-posas-spa-bath',
    src: '/portfolio-bathroom.png',
    title: 'Las Posas Estates Spa Retreat',
    location: 'Las Posas Estates, Camarillo',
    sqft: '460',
    year: '2023',
    value: '$95,000',
    category: 'Bathroom',
    challenge: 'Full waterproofing system design for a bathroom with direct exterior wall exposure to marine air.',
    result: 'Zero moisture intrusion after 18 months. Client eliminated a recurring mold remediation bill.',
  },
  {
    id: 'mission-oaks-adu',
    src: '/portfolio-adu.png',
    title: 'Mission Oaks Detached ADU',
    location: 'Mission Oaks, Camarillo',
    sqft: '640',
    year: '2024',
    value: '$210,000',
    category: 'ADU',
    challenge: 'Permit approval in a HOA-governed community required custom architectural renderings for two board reviews.',
    result: 'Permitted in 6 weeks. Currently generating $2,400/month rental income.',
  },
  {
    id: 'camarillo-great-room',
    src: '/portfolio-living.png',
    title: 'Camarillo Ranch Open-Concept Living',
    location: 'Camarillo Ranch, CA',
    sqft: '1,800',
    year: '2023',
    value: '$260,000',
    category: 'Whole-Home',
    challenge: 'Integrating indoor-outdoor living on a south-facing property with afternoon canyon winds.',
    result: 'Pocket door system rated for coastal wind loads. Home sold for $180K over list price.',
  },
];

const categories = ['All', 'Whole-Home', 'Kitchen + Bath', 'Bathroom', 'ADU'];

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <ScrollReveal />
      <main style={{ paddingTop: '70px' }}>
        {/* ── PAGE HERO ── */}
        <section
          style={{
            background: 'var(--color-canvas-alt)',
            borderBottom: '1px solid oklch(0.90 0.008 245)',
            padding: '5rem 0 3rem',
          }}
          aria-labelledby="portfolio-page-heading"
        >
          <div className="container">
            <p className="overline reveal">Our Work</p>
            <h1 className="heading-1 reveal delay-1" id="portfolio-page-heading" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
              Projects That <em style={{ fontStyle: 'italic', color: 'var(--color-trust-blue)' }}>Perform</em>
            </h1>
            <p className="body-lg reveal delay-2" style={{ maxWidth: '560px' }}>
              Every project below was engineered for Camarillo's coastal salt-air climate —
              built to outlast the marine layer, the Santa Ana winds, and the next buyer's inspection.
            </p>
          </div>
        </section>

        {/* ── FEATURED CASE STUDY ── */}
        <section className="section" aria-labelledby="case-study-heading">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: '4rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden` }} className="reveal-left">
                <Image src="/hero-camarillo.png" alt="Camarillo Heights whole-home transformation by ${process.env.NEXT_PUBLIC_BUSINESS_NAME}" fill quality={75} style={{ objectFit: `cover' }} />
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span className="badge">Case Study</span>
                  <span className="badge badge--gold">$420K+</span>
                </div>
              </div>
              <div className="reveal-right">
                <p className="overline" style={{ marginBottom: '0.75rem' }}>Featured Project</p>
                <h2 className="heading-2" id="case-study-heading" style={{ marginBottom: '1rem' }}>
                  Camarillo Heights<br /><em>Whole-Home Transformation</em>
                </h2>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <span className="badge"><MapPin size={11} /> Camarillo Heights, CA</span>
                  <span className="badge"><Square size={11} /> 3,200 sq ft</span>
                  <span className="badge"><Calendar size={11} /> 2024</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  {[
                    { label: 'The Problem', text: 'A 1978 hillside home with three failed renovation attempts, expansive clay soil shifting the foundation, and outdated systems eroding the family\'s equity in Camarillo\'s competitive real estate market.' },
                    { label: 'Our Solution', text: 'Full structural assessment with helical pier foundation stabilization. Complete systems rebuild (electrical, plumbing, HVAC), then a gut renovation of all interior spaces using marine-grade materials specified for coastal humidity.' },
                    { label: 'The Result', text: '3,200 sq ft of gallery-quality living space. Completed in 14 weeks — 3 weeks ahead of schedule. Zero punch-list items at final walk. Home appraised $340K above pre-renovation value.' },
                  ].map(item => (
                    <div key={item.label}>
                      <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-trust-blue)', marginBottom: '0.35rem' }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="btn-primary" id="case-study-cta">
                  Start My Project <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL PROJECT GRID ── */}
        <section className="section section-alt" aria-labelledby="project-grid-heading">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="heading-2 reveal" id="project-grid-heading">All <em>Projects</em></h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className="badge"
                    style={{ cursor: 'pointer', padding: '0.45rem 1rem', fontSize: '0.75rem', transition: 'all 0.2s' }}
                    aria-label={`Filter by ${cat}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2px' }}>
              {projects.map((p, i) => (
                <article key={p.id} className={`portfolio-card reveal delay-${(i % 4) + 1}`} aria-label={p.title}>
                  <Image src={p.src} alt={p.title} fill quality={75} className="portfolio-card__image" style={{ objectFit: 'cover' }} />
                  <div className="portfolio-card__overlay">
                    <div className="portfolio-card__meta">
                      <span className="badge"><MapPin size={10} /> {p.location.split(',')[0]}</span>
                      <span className="badge"><Square size={10} /> {p.sqft} sq ft</span>
                      <span className="badge badge--gold">{p.value}</span>
                    </div>
                    <p className="portfolio-card__title">{p.title}</p>
                    <p style={{ fontSize: '0.8rem', color: 'oklch(0.78 0.018 245)', marginTop: '0.4rem', lineHeight: 1.5 }}>
                      ✓ {p.result.slice(0, 70)}...
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL NEAR CTA ── */}
        <section className="section" aria-label="Client testimonial">
          <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '1.5rem' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="var(--color-warm-gold)" stroke="none" />)}
            </div>
            <p className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.4, marginBottom: '1.5rem' }}>
              "Freedom's pricing was transparent from day one. No change orders we didn't expect. No surprises on delivery day. That's rare in Ventura County — and it's why we've now referred four neighbors."
            </p>
            <p className="overline reveal delay-1">Jennifer & Carlos R. · Camarillo Ranch Homeowners</p>
            <div className="reveal delay-2" style={{ marginTop: '2rem' }}>
              <Link href="/contact" className="btn-gold" id="portfolio-cta">
                Request My Free Design Consult <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

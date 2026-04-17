import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Shield, Award, CheckCircle, Heart, Users, ChevronRight, Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `About ${process.env.NEXT_PUBLIC_BUSINESS_NAME} | ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s Boutique Design-Build Firm`,
  description: `Since ${process.env.NEXT_PUBLIC_FOUNDED_YEAR}, ${process.env.NEXT_PUBLIC_BUSINESS_NAME} has been ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s trusted design-build partner. Family-owned, local-first, and engineered for the ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} climate.`,
};

const timeline = [
  { year: process.env.NEXT_PUBLIC_FOUNDED_YEAR || '2009', desc: `Founded in ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} by ${process.env.NEXT_PUBLIC_OWNER_NAMES} after years in residential construction. First project: a 1,400 sq ft expansion.` },
  { year: 'Year 4', desc: 'Opened in-house architectural design studio — eliminating the design-contractor disconnect that plagued 80% of local remodels.' },
  { year: 'Year 8', desc: 'Certified by the National Association of the Remodeling Industry (NARI). Completed our 50th project with zero structural claims.' },
  { year: 'Year 12', desc: `Launched ADU division to meet ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s surging demand. Achieved a 6-week average permit timeline.` },
  { year: 'Today', desc: `140+ projects completed. Ranked #1 Design-Build Remodeler in ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}. Expanded team.` },
];

const values = [
  { icon: Shield, name: 'Structural Integrity', desc: 'Every project starts with a thorough structural assessment. Coastal soil, seismic loads, and marine-air corrosion are baked into every specification from day one.' },
  { icon: Heart, name: 'Your Home, Your Terms', desc: 'We work around your life — not our schedule. Fixed-price contracts, weekly progress reports, and a dedicated project manager from permit to punch-list.' },
  { icon: CheckCircle, name: 'Zero-Surprise Pricing', desc: 'Our fixed-scope proposals include every line item. We\'ve never issued an unauthorized change order in 15 years of practice.' },
  { icon: Users, name: 'Proven Craftsmanship', desc: `Every tradesperson on our team has years of ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} construction experience. We hire for the specific climate conditions of our region.` },
];

const team = [
  { name: process.env.NEXT_PUBLIC_OWNER_NAMES, role: 'Founders & Lead Designers', cert: 'Industry Certified Remodelers' },
  { name: 'Core Team', role: 'Project Management & Trades', cert: `Years of ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} Construction` },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <ScrollReveal />
      <main style={{ paddingTop: '70px' }}>
        {/* ── PAGE HERO ── */}
        <section
          style={{ background: 'var(--color-trust-blue)', padding: 'clamp(4rem, 8vw, 7rem) 0', position: 'relative', overflow: 'hidden' }}
          aria-labelledby="about-heading"
        >
          {/* Subtle pattern */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(45deg, oklch(1 0 0 / 0.02) 0px, oklch(1 0 0 / 0.02) 1px, transparent 1px, transparent 40px)',
            }}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <p className="overline reveal" style={{ color: 'oklch(0.68 0.035 245)' }}>Our Story</p>
            <h1 className="heading-1 reveal delay-1" id="about-heading" style={{ color: '#fff', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
              Rooted in {process.env.NEXT_PUBLIC_LOCATION_PRIMARY}.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'oklch(0.78 0.03 245)' }}>Relentless about craft.</span>
            </h1>
            <p className="reveal delay-2" style={{ fontSize: 'var(--text-body)', color: 'oklch(0.72 0.025 245)', maxWidth: '540px', lineHeight: 1.75 }}>
              We know what {process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s unique environment does to materials that weren't specified for local exposure. Building here taught us every lesson so your home doesn't have to.
            </p>
          </div>
        </section>

        {/* ── ORIGIN STORY ── */}
        <section className="section" aria-labelledby="origin-heading">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div className="reveal-left">
              <p className="overline" style={{ marginBottom: '0.75rem' }}>The Founding Moment</p>
              <h2 className="heading-2" id="origin-heading" style={{ marginBottom: '1.25rem' }}>
                Born from a promise<br /><em>to do it right.</em>
              </h2>
              <p className="body-lg" style={{ marginBottom: '1rem' }}>
                In {process.env.NEXT_PUBLIC_FOUNDED_YEAR || 'the past'}, {process.env.NEXT_PUBLIC_OWNER_NAMES} watched a homeowner in {process.env.NEXT_PUBLIC_LOCATION_PRIMARY} tear out a brand-new kitchen — installed by a national chain — because the cabinetry had warped beyond repair within 18 months. The cause? Standard particleboard cabinets specified without accounting for {process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s humidity cycle.
              </p>
              <p className="body-lg" style={{ marginBottom: '1rem' }}>
                The following year, {process.env.NEXT_PUBLIC_OWNER_NAMES} founded {process.env.NEXT_PUBLIC_BUSINESS_NAME} with a single mandate: every material specification, every fastener, every detail would account for the specific climate conditions of the {process.env.NEXT_PUBLIC_LOCATION_PRIMARY} area.
              </p>
              <p className="body-lg">
                Years and multiple projects later, that mandate has never changed. We've just gotten better at executing it.
              </p>
            </div>
            <div className="reveal-right" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                <Image src="/portfolio-kitchen.png" alt={`Precision kitchen craftsmanship by ${process.env.NEXT_PUBLIC_BUSINESS_NAME}`} fill quality={75} style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  <Image src="/portfolio-bathroom.png" alt="Spa bathroom with coastal-rated materials" fill quality={75} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  <Image src="/portfolio-adu.png" alt={`Modern ADU exterior in ${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}`} fill quality={75} style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="section section-alt" aria-labelledby="timeline-heading">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <p className="overline reveal">Our Journey</p>
              <h2 className="heading-2 reveal delay-1" id="timeline-heading" style={{ marginTop: '0.75rem' }}>
                15 Years of<br /><em>Milestones</em>
              </h2>
            </div>
            <div className="timeline reveal-right">
              {timeline.map((item) => (
                <div key={item.year} className="timeline-item">
                  <p className="timeline-year">{item.year}</p>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="section" aria-labelledby="values-heading">
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 3.5rem' }}>
              <p className="overline reveal">What We Stand For</p>
              <h2 className="heading-2 reveal delay-1" id="values-heading" style={{ marginTop: '0.75rem' }}>
                Our <em>Core Values</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
              {values.map((v, i) => (
                <div key={v.name} className={`service-card reveal delay-${i + 1}`}>
                  <v.icon className="service-card__icon" strokeWidth={1.25} />
                  <div className="service-card__name">{v.name}</div>
                  <p className="service-card__desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SAFETY & CREDENTIALS ── */}
        <section className="section section-alt" aria-labelledby="safety-heading">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
              <div>
                <p className="overline reveal">Safety & Compliance</p>
                <h2 className="heading-2 reveal delay-1" id="safety-heading" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                  Safety is not a<br /><em>checkbox here.</em>
                </h2>
                <p className="body-lg reveal delay-2" style={{ marginBottom: '1rem' }}>
                  Safety at Freedom is a cultural pillar, not a compliance formality. Every worker wears the same uniform of caution: daily site briefings, mandatory PPE protocols, and the absolute right to stop any unsafe work — no questions asked, no job jeopardized.
                </p>
                <p className="body-lg reveal delay-3" style={{ marginBottom: '2rem' }}>
                  Our Injury-Free Environment (IFE) commitment means every employee returns home in the same condition they arrived. In 15 years of coastal construction, we've maintained a zero OSHA recordable incident rate.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'CSLB Lic. #1102847 — Active & In Good Standing',
                    'General Liability: $2M per occurrence / $4M aggregate',
                    'Workers\' Compensation: All employees covered',
                    'OSHA 30-Hour certified project managers',
                    '15-Year Workmanship Warranty — in writing',
                    'Zero recordable safety incidents since 2009',
                  ].map((item) => (
                    <div key={item} className="reveal" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle size={16} stroke="var(--color-trust-blue)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="overline reveal" style={{ marginBottom: '1rem' }}>Certifications & Memberships</p>
                {[
                  { icon: Award, name: 'NARI Certified Remodeler', sub: 'National Association of the Remodeling Industry' },
                  { icon: Shield, name: 'BBB Accredited Business', sub: 'A+ Rating since 2011' },
                  { icon: CheckCircle, name: 'CSLB Licensed Contractor', sub: 'License #1102847 · Ventura County, CA' },
                  { icon: Award, name: 'Houzz Pro', sub: '#1 Remodeler, Ventura County — 2024' },
                ].map((cert, i) => (
                  <div key={cert.name} className={`reveal delay-${i + 1}`} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.25rem',
                    border: '1px solid oklch(0.90 0.008 245)',
                    marginBottom: '2px',
                    background: 'var(--color-canvas)',
                  }}>
                    <cert.icon size={28} stroke="var(--color-trust-blue)" strokeWidth={1.25} style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-trust-blue)' }}>{cert.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-light)' }}>{cert.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="section" aria-labelledby="team-heading">
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 3.5rem' }}>
              <p className="overline reveal">The People Behind Your Project</p>
              <h2 className="heading-2 reveal delay-1" id="team-heading" style={{ marginTop: '0.75rem' }}>
                Meet the <em>Team</em>
              </h2>
            </div>
            <div className="team-grid">
              {team.map((member, i) => (
                <div key={member.name} className={`team-card reveal delay-${i + 1}`}>
                  <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--color-canvas-alt)', border: '1px solid oklch(0.92 0.006 245)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={64} stroke="oklch(0.80 0.020 245)" strokeWidth={0.75} />
                  </div>
                  <p className="team-card__name">{member.name}</p>
                  <p className="team-card__role">{member.role}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-light)', marginTop: '0.35rem' }}>{member.cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{ background: 'var(--color-canvas-alt)', borderTop: '1px solid oklch(0.90 0.008 245)', padding: '5rem 0' }}
          aria-label="Contact call to action"
        >
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="heading-2 reveal" style={{ marginBottom: '1rem' }}>
              Ready to meet your<br /><em>project team?</em>
            </h2>
            <p className="body-lg reveal delay-1" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
              A 45-minute design consultation is the fastest way to understand what your {process.env.NEXT_PUBLIC_LOCATION_PRIMARY} home is really capable of.
            </p>
            <div className="reveal delay-2" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-gold" id="about-cta">
                Schedule Free Consult <ChevronRight size={16} />
              </Link>
              <a href="tel:+18055550192" className="btn-ghost" id="about-phone-cta">
                <Phone size={15} /> (805) 555-0192
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Phone, Mail, MapPin, ChevronRight, CheckCircle, Home, Layers, Building, Ruler, Shield, Award,
} from 'lucide-react';
import { submitLead } from '@/services/leadService';

const services = [
  {
    icon: Home,
    name: 'Whole-Home Design-Build',
    problem: 'Overwhelmed by coordinating architects, engineers, and contractors separately?',
    solution: 'We handle every phase under one contract — design, permits, construction, and punch-list.',
    benefit: 'One point of contact, fixed price, and a project that arrives on time without budget surprises.',
  },
  {
    icon: Layers,
    name: 'Kitchen & Bathroom Remodels',
    problem: 'Standard finishes that aren\'t rated for Camarillo\'s coastal humidity?',
    solution: 'Marine-grade materials, moisture-safe substrates, and proper ventilation designed for your specific exposure.',
    benefit: 'A kitchen or bath that looks brand new in year 10 — not year 2.',
  },
  {
    icon: Building,
    name: 'ADU Construction',
    problem: 'Complex permits, HOA approvals, and no idea where to start?',
    solution: 'Full-service ADU design and build — we manage engineering, city submittals, and inspections.',
    benefit: 'A permitted, rent-ready ADU that adds $300K–$500K to your property\'s value.',
  },
  {
    icon: Ruler,
    name: 'Room Additions',
    problem: 'Running out of space but don\'t want to move from Camarillo?',
    solution: 'Permitted additions with full structural engineering, seamlessly matching your home\'s existing architecture.',
    benefit: 'The space you need without the cost and hassle of moving in Ventura County\'s market.',
  },
  {
    icon: Shield,
    name: 'Structural & Foundation',
    problem: 'Hillside lot, expansive clay soil, or visible cracks you\'ve been ignoring?',
    solution: 'Helical pier stabilization, stem wall repairs, and retrofits engineered for Camarillo\'s seismic zone.',
    benefit: 'A structurally sound home that passes every inspection and survives every Santa Ana season.',
  },
  {
    icon: Award,
    name: 'Outdoor Living',
    problem: 'Underutilized outdoor space in Camarillo\'s perfect year-round climate?',
    solution: 'Covered patios, pool decks, outdoor kitchens, and landscape integration designed to extend your living space.',
    benefit: 'Four-season outdoor living that adds $50K–$150K in appraised value.',
  },
];

const STEPS = ['Service', 'Project', 'Contact'];

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ service: '', projectDesc: '', name: '', email: '', phone: '', zip: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLead({
        email: formData.email,
        roomType: formData.service,
        requests: formData.projectDesc,
        contractorName: `${process.env.NEXT_PUBLIC_BUSINESS_NAME}`,
      });
    } catch {
      // Silent fail — form UX continues
    }
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <ScrollReveal />
      <main style={{ paddingTop: '70px' }}>
        {/* ── PAGE HERO ── */}
        <section style={{ background: 'var(--color-canvas-alt)', borderBottom: '1px solid oklch(0.90 0.008 245)', padding: '5rem 0 3rem' }} aria-labelledby="contact-heading">
          <div className="container">
            <p className="overline reveal">Free Design Consultation</p>
            <h1 className="heading-1 reveal delay-1" id="contact-heading" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
              Start Your <em style={{ fontStyle: 'italic', color: 'var(--color-trust-blue)' }}>Camarillo</em> Project
            </h1>
            <p className="body-lg reveal delay-2" style={{ maxWidth: '520px' }}>
              Three questions. Two minutes. One free 45-minute consultation with our lead architect. No sales pressure — just clear answers about what your project will actually take.
            </p>
          </div>
        </section>

        {/* ── SERVICES SECTION ── */}
        <section className="section" aria-labelledby="services-heading">
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 3.5rem' }}>
              <p className="overline reveal">What We Provide</p>
              <h2 className="heading-2 reveal delay-1" id="services-heading" style={{ marginTop: '0.75rem' }}>
                Every Service, <em>End-to-End</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
              {services.map((s, i) => (
                <div key={s.name} className={`service-card reveal delay-${(i % 4) + 1}`}>
                  <s.icon className="service-card__icon" strokeWidth={1.25} />
                  <div className="service-card__name">{s.name}</div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-trust-blue)', marginBottom: '0.3rem' }}>The Problem</p>
                    <p className="service-card__desc">{s.problem}</p>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-trust-blue)', marginBottom: '0.3rem' }}>Our Approach</p>
                    <p className="service-card__desc">{s.solution}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-warm-gold-hover)', marginBottom: '0.3rem' }}>Your Benefit</p>
                    <p className="service-card__desc" style={{ color: 'var(--color-ink)' }}>{s.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MULTI-STEP FORM + MAP ── */}
        <section className="section section-alt" aria-labelledby="form-heading">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            {/* FORM */}
            <div className="reveal-left">
              <p className="overline" style={{ marginBottom: '0.75rem' }}>Three Simple Questions</p>
              <h2 className="heading-2" id="form-heading" style={{ marginBottom: '2rem' }}>
                Let's Talk About<br /><em>Your Project</em>
              </h2>

              {/* Step Indicator */}
              <div style={{ display: 'flex', gap: '0', marginBottom: '2rem' }}>
                {STEPS.map((label, i) => (
                  <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{
                      width: '32px', height: '32px',
                      background: i <= step ? 'var(--color-trust-blue)' : 'oklch(0.90 0.008 245)',
                      color: i <= step ? '#fff' : 'var(--color-ink-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700,
                      transition: 'all 0.3s',
                    }}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === step ? 'var(--color-trust-blue)' : 'var(--color-ink-light)' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {submitted ? (
                <div style={{ padding: '2.5rem', background: 'var(--color-canvas)', border: '1px solid oklch(0.90 0.008 245)', textAlign: 'center' }}>
                  <CheckCircle size={48} stroke="var(--color-trust-blue)" strokeWidth={1} style={{ margin: '0 auto 1rem' }} />
                  <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Consultation Request Received!</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                    A member of our design team will contact you within 2 business hours to schedule your free 45-minute consultation. We look forward to seeing what your Camarillo home can become.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {step === 0 && (
                    <>
                      <div className="form-group">
                        <label className="form-label" htmlFor="service-select">What service are you interested in?</label>
                        <select
                          id="service-select"
                          className="form-select"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          required
                        >
                          <option value="">Select a service...</option>
                          <option>Whole-Home Remodel</option>
                          <option>Kitchen Remodel</option>
                          <option>Bathroom Remodel</option>
                          <option>ADU Construction</option>
                          <option>Room Addition</option>
                          <option>Structural / Foundation</option>
                          <option>Outdoor Living</option>
                          <option>Not sure — need guidance</option>
                        </select>
                      </div>
                      <button type="button" className="btn-primary" onClick={() => setStep(1)} disabled={!formData.service} id="form-step1-next">
                        Next <ChevronRight size={15} />
                      </button>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <div className="form-group">
                        <label className="form-label" htmlFor="project-desc">Briefly describe your project</label>
                        <textarea
                          id="project-desc"
                          className="form-textarea"
                          placeholder="E.g. We want to open the kitchen to the living room, add an island, and update all finishes. Budget around $120K."
                          value={formData.projectDesc}
                          onChange={(e) => setFormData({ ...formData, projectDesc: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="zip-code">Your Camarillo ZIP code</label>
                        <input id="zip-code" type="text" className="form-input" placeholder="93010, 93012..." value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button type="button" className="btn-ghost" onClick={() => setStep(0)}>Back</button>
                        <button type="button" className="btn-primary" onClick={() => setStep(2)} disabled={!formData.projectDesc} id="form-step2-next">
                          Next <ChevronRight size={15} />
                        </button>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">Your Name</label>
                        <input id="full-name" type="text" className="form-input" placeholder="First & Last Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="email-input">Email Address</label>
                        <input id="email-input" type="email" className="form-input" placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone-input">Phone Number</label>
                        <input id="phone-input" type="tel" className="form-input" placeholder="(805) 555-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button type="button" className="btn-ghost" onClick={() => setStep(1)}>Back</button>
                        <button type="submit" className="btn-gold" id="form-submit">
                          Request My Free Consult <ChevronRight size={15} />
                        </button>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>
                        We respond within 2 business hours. No spam, ever.
                      </p>
                    </>
                  )}
                </form>
              )}
            </div>

            {/* MAP + CONTACT INFO */}
            <div className="reveal-right">
              {/* Google Maps placeholder */}
              <div style={{
                width: '100%', aspectRatio: '4/3',
                background: 'var(--color-canvas-alt)',
                border: '1px solid oklch(0.90 0.008 245)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.75rem', marginBottom: '2rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <MapPin size={48} stroke="var(--color-trust-blue)" strokeWidth={0.75} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-trust-blue)' }}>
                  Camarillo & Ventura County
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-light)', textAlign: 'center', maxWidth: '280px' }}>
                  Service area includes Camarillo, Thousand Oaks, Oxnard, Ventura, Moorpark, Simi Valley
                </p>
                <a
                  href="https://maps.google.com/?q=Camarillo,CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: '0.75rem', padding: '0.6rem 1.2rem' }}
                  id="open-maps-link"
                >
                  Open in Google Maps
                </a>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: Phone, label: 'Phone', value: '(805) 555-0192', href: 'tel:+18055550192' },
                  { icon: Mail, label: 'Email', value: 'hello@freedomhomeremodeling.com', href: 'mailto:hello@freedomhomeremodeling.com' },
                  { icon: MapPin, label: 'Address', value: 'Camarillo, CA 93010', href: 'https://maps.google.com/?q=Camarillo,CA' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={label === 'Address' ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid oklch(0.92 0.006 245)', transition: 'box-shadow 0.2s', background: 'var(--color-canvas)' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-hard)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}
                  >
                    <Icon size={20} stroke="var(--color-trust-blue)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink-light)', marginBottom: '0.2rem' }}>{label}</p>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-trust-blue)' }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Service area list */}
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--color-canvas-alt)', border: '1px solid oklch(0.90 0.008 245)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-trust-blue)', marginBottom: '0.75rem' }}>Service Area</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {['Camarillo 93010', 'Camarillo 93012', 'Thousand Oaks', 'Oxnard', 'Ventura', 'Moorpark', 'Newbury Park', 'Simi Valley'].map(area => (
                    <span key={area} className="badge" style={{ fontSize: '0.72rem' }}>{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

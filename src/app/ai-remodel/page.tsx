'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ComparisonSlider from '@/components/ComparisonSlider';
import { Sparkles, ChevronRight, Camera, Upload, Download, CheckCircle, X } from 'lucide-react';
import { submitLead } from '@/services/leadService';
import { generateRemodel } from '@/services/geminiService';
import type { HubRemodelParams } from '@/services/geminiService';

// ── V4.3 Constants ────────────────────────────────────────────────────────────

const ROOM_TYPES = [
  'Kitchen',
  'Bathroom',
  'Living Room',
  'Master Bedroom',
  'Home Office',
  'Dining Room',
  'Exterior / Outdoor',
  'Commercial Space',
] as const;

const INTENSITIES = [
  {
    value: 'Light Refresh' as const,
    label: 'Light Refresh',
    sub: 'Paint, fixtures, lighting  ·  $5k–$15k',
  },
  {
    value: 'Moderate Remodel' as const,
    label: 'Moderate Remodel',
    sub: 'New floors, cabinets, countertops  ·  $20k–$50k',
  },
  {
    value: 'Complete Transformation' as const,
    label: 'Complete Transformation',
    sub: 'Luxury gut renovation  ·  $50k+',
  },
] as const;

type Step = 'upload' | 'intake' | 'generating' | 'result';
type Intensity = (typeof INTENSITIES)[number]['value'];

// ── Canvas Stitcher ───────────────────────────────────────────────────────────

async function stitchComparisonJpg(beforeSrc: string, afterSrc: string): Promise<string> {
  const W = 1920;
  const H = 960;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  const [before, after] = await Promise.all([loadImage(beforeSrc), loadImage(afterSrc)]);

  // Draw before (left half)
  ctx.drawImage(before, 0, 0, W / 2, H);
  // Draw after (right half)
  ctx.drawImage(after, W / 2, 0, W / 2, H);

  // Divider line
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(W / 2 - 2, 0, 4, H);

  // Labels
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillRect(24, 24, 130, 48);
  ctx.fillRect(W / 2 + 24, 24, 120, 48);
  ctx.fillStyle = '#0f2744';
  ctx.fillText('BEFORE', 36, 57);
  ctx.fillText('AFTER', W / 2 + 36, 57);

  return canvas.toDataURL('image/jpeg', 0.92);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AIRemodelPage() {
  // ── Step machine
  const [step, setStep] = useState<Step>('upload');

  // ── Upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // ── Intake form
  const [roomType, setRoomType] = useState<string>('Kitchen');
  const [intensity, setIntensity] = useState<Intensity>('Moderate Remodel');
  const [style, setStyle] = useState('Coastal California Modern');
  const [customStyle, setCustomStyle] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // ── Result
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [afterImageSrc, setAfterImageSrc] = useState<string | null>(null);
  const [comparisonJpg, setComparisonJpg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Sully (removed)

  // ── Drag-and-drop ─────────────────────────────────────────────────────────

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setStep('intake');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  // ── Form submit ───────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview || !imageFile) return;
    setStep('generating');
    setError(null);

    const base64 = imagePreview.split(',')[1] ?? imagePreview;
    const mimeType = imageFile.type || 'image/jpeg';

    try {
      // 1. Lead capture
      await submitLead({
        siteId: process.env.NEXT_PUBLIC_SITE_ID,
        leadName: name,
        leadPhone: phone,
        roomType,
        style: style === 'Other' ? `Other - ${customStyle}` : style,
        intensity,
        customNotes: notes,
        remodelImageURL: 'uploaded-via-ai-remodel',
      });

      // 2. Universal Hub call — awaited for Sully Bridge
      const params: HubRemodelParams = {
        imageBase64: base64,
        mimeType,
        roomType,
        style,
        remodelIntensity: intensity,
        name,
        phone,
        service: roomType,
      };

      const result = await generateRemodel(params);

      // ── Diagnostic Logging — V4.3 Consolidation Fix
      if ((result as any).debugInfo) {
        console.log("[SPOKE] Hub Debug Info:", (result as any).debugInfo);
      }

      // 3. Map payload
      setAnalysisText(result.analysis);

      // 4. remodelImage — full data URI from Gemini 2.0 Flash image gen
      if (result.remodelImage) {
        setAfterImageSrc(result.remodelImage);
        // Canvas stitch: 1920px comparison JPG
        try {
          const jpg = await stitchComparisonJpg(imagePreview, result.remodelImage);
          setComparisonJpg(jpg);
        } catch {
          // Non-fatal
        }
      }

      setStep('result');
    } catch (err) {
      console.error('[FHR AI Remodel] Hub error:', err);
      setError('Generation failed — please try again or call us at (805) 555-0192.');
      setStep('intake');
    }
  };

  // ── UI ────────────────────────────────────────────────────────────────────

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '70px' }}>

        {/* ── PAGE HERO ── */}
        <section
          style={{ background: 'var(--color-trust-blue)', padding: '5rem 0 3.5rem', position: 'relative', overflow: 'hidden' }}
          aria-labelledby="ai-heading"
        >
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, oklch(1 0 0 / 0.02) 0px, oklch(1 0 0 / 0.02) 1px, transparent 1px, transparent 40px)' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'oklch(1 0 0 / 0.1)', padding: '0.35rem 0.9rem', marginBottom: '1rem' }}>
              <Sparkles size={14} stroke="oklch(0.78 0.03 245)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.78 0.03 245)' }}>Powered by Gemini AI · V4.3</span>
            </div>
            <h1 className="heading-1" id="ai-heading" style={{ color: '#fff', marginBottom: '1rem' }}>
              See Your Home <em style={{ fontStyle: 'italic', color: 'oklch(0.78 0.03 245)' }}>Reimagined</em><br />Before Demo Day
            </h1>
            <p style={{ fontSize: 'var(--text-body)', color: 'oklch(0.72 0.025 245)', maxWidth: '540px', lineHeight: 1.75 }}>
              Upload a photo of your Camarillo space. Choose your room type and remodel intensity. Our AI visualizes the transformation — no commitment required.
            </p>
          </div>
        </section>

        {/* ── TOOL SECTION ── */}
        <section className="section" aria-label="AI Remodel tool">
          <div className="container" style={{ maxWidth: '960px' }}>

            {/* ── STEP 1: UPLOAD ── */}
            {step === 'upload' && (
              <div style={{ textAlign: 'center' }}>
                <p className="overline" style={{ marginBottom: '1.25rem' }}>Step 1 of 3 — Upload Your Space</p>
                <div
                  ref={dropRef}
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onDragEnter={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-trust-blue)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--color-trust-blue-subtle)'; }}
                  onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'oklch(0.85 0.012 245)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--color-canvas-alt)'; }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-trust-blue)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--color-trust-blue-subtle)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'oklch(0.85 0.012 245)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--color-canvas-alt)'; }}
                  style={{ border: '2px dashed oklch(0.85 0.012 245)', padding: '6rem 3rem', cursor: 'pointer', background: 'var(--color-canvas-alt)', transition: 'all 0.2s' }}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload a photo of your room"
                  onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                  <Camera size={56} stroke="var(--color-trust-blue)" strokeWidth={0.75} style={{ margin: '0 auto 1.25rem' }} />
                  <h3 className="heading-3" style={{ marginBottom: '0.5rem', color: 'var(--color-trust-blue)' }}>Drop your photo here</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-light)', marginBottom: '1.5rem' }}>
                    Kitchen, bathroom, living room, exterior — any space works
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', border: '1px solid var(--color-trust-blue)', color: 'var(--color-trust-blue)', fontSize: '0.8rem', fontWeight: 700 }}>
                    <Upload size={14} /> Browse Files
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} aria-label="File upload" id="file-upload-input" />
              </div>
            )}

            {/* ── STEP 2: INTAKE FORM (Conversion Wall) ── */}
            {step === 'intake' && imagePreview && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

                {/* Left — immediate thumbnail preview */}
                <div>
                  <p className="overline" style={{ marginBottom: '0.75rem' }}>Your Uploaded Space</p>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid oklch(0.90 0.008 245)' }}>
                    <img src={imagePreview} alt="Your uploaded space preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <button
                    onClick={() => { setImagePreview(null); setImageFile(null); setStep('upload'); }}
                    style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-ink-light)', background: 'none', border: 'none', cursor: 'pointer' }}
                    id="change-photo-btn"
                  >
                    <X size={12} /> Change photo
                  </button>
                </div>

                {/* Right — Conversion wall form */}
                <div>
                  <p className="overline" style={{ marginBottom: '0.75rem' }}>Step 2 of 3 — Your Vision</p>
                  <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>
                    Tell us about<br /><em>your project</em>
                  </h2>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Room Type */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="room-type-select">Room Type</label>
                      <select id="room-type-select" className="form-select" value={roomType} onChange={e => setRoomType(e.target.value)}>
                        {ROOM_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>

                    {/* Intensity */}
                    <div className="form-group">
                      <label className="form-label">Remodel Intensity</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {INTENSITIES.map(opt => (
                          <label
                            key={opt.value}
                            htmlFor={`intensity-${opt.value.replace(/\s+/g, '-').toLowerCase()}`}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.75rem',
                              padding: '0.75rem 1rem',
                              border: `1px solid ${intensity === opt.value ? 'var(--color-trust-blue)' : 'oklch(0.90 0.008 245)'}`,
                              background: intensity === opt.value ? 'var(--color-trust-blue-subtle)' : 'var(--color-canvas)',
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                          >
                            <input
                              type="radio"
                              id={`intensity-${opt.value.replace(/\s+/g, '-').toLowerCase()}`}
                              name="intensity"
                              value={opt.value}
                              checked={intensity === opt.value}
                              onChange={() => setIntensity(opt.value)}
                              style={{ accentColor: 'var(--color-trust-blue)' }}
                            />
                            <div>
                              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-trust-blue)', margin: 0 }}>{opt.label}</p>
                              <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)', margin: 0 }}>{opt.sub}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Style */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-select">Design Style</label>
                      <select id="style-select" className="form-select" value={style} onChange={e => setStyle(e.target.value)}>
                        {['Coastal California Modern', 'Organic Minimalist', 'Spanish Revival', 'Mid-Century Modern', 'Japandi Coastal', 'Contemporary Farmhouse', 'Other'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    {style === 'Other' && (
                      <div className="form-group">
                        <label className="form-label" htmlFor="custom-style">Custom Style Description</label>
                        <input id="custom-style" type="text" className="form-input" placeholder="E.g., Farmhouse Industrial" value={customStyle} onChange={e => setCustomStyle(e.target.value)} required={style === 'Other'} />
                      </div>
                    )}

                    <hr style={{ border: 'none', borderTop: '1px solid oklch(0.92 0.006 245)', margin: '0.5rem 0' }} />
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-trust-blue)' }}>
                      Step 3 — Your Contact Info
                    </p>

                    {/* Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="lead-name">Full Name</label>
                      <input id="lead-name" type="text" className="form-input" placeholder="First & Last Name" value={name} onChange={e => setName(e.target.value)} required />
                    </div>

                    {/* Phone First */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="lead-phone">Mobile Phone Number</label>
                      <input id="lead-phone" type="tel" className="form-input" placeholder="(805) 555-0000" value={phone} onChange={e => setPhone(e.target.value)} required />
                    </div>

                    {/* Custom Notes */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="custom-notes">Project Details / Notes (Optional)</label>
                      <textarea id="custom-notes" className="form-input" placeholder="Tell us more about your project..." rows={3} value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                    </div>

                    {error && (
                      <p style={{ fontSize: '0.85rem', color: 'oklch(0.50 0.12 25)', padding: '0.75rem 1rem', border: '1px solid oklch(0.80 0.08 25)', background: 'oklch(0.97 0.02 25)' }}>
                        {error}
                      </p>
                    )}

                    <button type="submit" className="btn-gold" id="ai-generate-btn" style={{ marginTop: '0.5rem' }}>
                      <Sparkles size={16} /> Generate My Remodel Vision
                    </button>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-ink-light)', textAlign: 'center' }}>
                      We'll send your full visualization by email. No spam, ever.
                    </p>
                  </form>
                </div>
              </div>
            )}

            {/* ── GENERATING ── */}
            {step === 'generating' && (
              <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
                  <Sparkles size={72} stroke="var(--color-trust-blue)" strokeWidth={0.6} style={{ animation: 'pulse-soft 2s ease-in-out infinite' }} />
                </div>
                <h2 className="heading-2" style={{ marginBottom: '0.75rem' }}>
                  Analyzing your <em>{roomType}…</em>
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-light)', maxWidth: '480px', margin: '0 auto' }}>
                  Applying <strong>{intensity}</strong> standards. Sully is drafting your custom design strategy. This takes about 20 seconds.
                </p>
              </div>
            )}

            {/* ── RESULT ── */}
            {step === 'result' && analysisText && imagePreview && (
              <div>
                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <p className="overline" style={{ marginBottom: '0.5rem' }}>Your Vision — {roomType} · {intensity}</p>
                  <h2 className="heading-2">Your Home, <em>Reimagined</em></h2>
                </div>

                {/* ── STANDARD 1: ComparisonSlider ── */}
                <div style={{ marginBottom: '2.5rem' }}>
                  {afterImageSrc ? (
                    <ComparisonSlider
                      beforeSrc={imagePreview}
                      afterSrc={afterImageSrc}
                      beforeLabel="Before"
                      afterLabel={`After · ${style}`}
                    />
                  ) : (
                    /* Fallback: no generated image — show upload only */
                    <div style={{ position: 'relative', border: '1px solid oklch(0.90 0.008 245)' }}>
                      <img src={imagePreview} alt="Your uploaded space" style={{ width: '100%', height: 'auto', display: 'block' }} />
                      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'oklch(0.14 0.04 245 / 0.75)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.75rem' }}>Your Space</span>
                    </div>
                  )}
                </div>

                {/* ── Architectural Analysis (full-width cinematic hero) ── */}
                <div style={{ marginBottom: '3rem' }}>
                  <div style={{
                    padding: '2.5rem 3rem',
                    background: 'var(--color-canvas-alt)',
                    borderLeft: '4px solid var(--color-trust-blue)',
                    boxShadow: '0 8px 40px oklch(0 0 0 / 0.06)',
                  }}>
                    <p className="overline" style={{ color: 'var(--color-trust-blue)', marginBottom: '1rem' }}>Architectural Analysis</p>
                    <p style={{ fontSize: '1.05rem', color: 'var(--color-ink)', lineHeight: 2, whiteSpace: 'pre-wrap', maxWidth: '72ch' }}>{analysisText}</p>
                  </div>
                </div>

                {/* ── CTAs ── */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <Link href="/contact" className="btn-gold" id="ai-result-cta">
                    Request Free Estimate <ChevronRight size={16} />
                  </Link>
                  {comparisonJpg && (
                    <a
                      href={comparisonJpg}
                      download={`freedom-remodel-${roomType.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                      className="btn-ghost"
                      id="ai-download-btn"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Download size={15} /> Download Comparison
                    </a>
                  )}
                </div>

                {/* ── Status line ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid oklch(0.92 0.006 245)' }}>
                  <CheckCircle size={15} stroke="var(--color-trust-blue)" strokeWidth={2.5} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-light)' }}>
                    A project manager from <strong>{process.env.NEXT_PUBLIC_BUSINESS_NAME}</strong> has been notified and will reach out shortly with your custom quote.
                  </p>
                </div>
              </div>
            )}


          </div>
        </section>

      </main>
    </>
  );
}
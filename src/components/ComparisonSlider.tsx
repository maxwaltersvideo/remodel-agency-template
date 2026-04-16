'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface ComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: number; // width/height, default 4/3
}

/**
 * ComparisonSlider — V4.3 Triple-Result Layout Standard
 *
 * Drag the divider to reveal Before vs. After.
 * Works with mouse and touch. Responsive.
 */
export default function ComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel  = 'After',
  aspectRatio = 4 / 3,
}: ComparisonSliderProps) {
  const [position, setPosition] = useState(50); // percent 0–100
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Pointer math ──────────────────────────────────────────────────────────
  const calcPosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(pct, 2), 98));
  }, []);

  // ── Mouse handlers ────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); setDragging(true); };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => calcPosition(e.clientX);
    const onUp   = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging, calcPosition]);

  // ── Touch handlers ────────────────────────────────────────────────────────
  const onTouchStart = () => setDragging(true);
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: TouchEvent) => calcPosition(e.touches[0].clientX);
    const onEnd  = () => setDragging(false);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd); };
  }, [dragging, calcPosition]);

  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom,
        overflow: 'hidden',
        userSelect: 'none',
        cursor: dragging ? 'col-resize' : 'ew-resize',
        border: '1px solid oklch(0.90 0.008 245)',
        background: 'oklch(0.96 0 0)',
      }}
      aria-label="Before and after comparison slider"
    >
      {/* ── BEFORE image (full width, clipped on right) ── */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* ── AFTER image (clipped — reveals from right as divider moves right) ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          clipPath: `inset(0 0 0 ${position}%)`,
          transition: dragging ? 'none' : 'clip-path 0.05s linear',
        }}
      >
        <img
          src={afterSrc}
          alt={afterLabel}
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── Divider line ── */}
      <div
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${position}%`,
          width: '2px',
          background: '#fff',
          boxShadow: '0 0 0 1px oklch(0.28 0.075 245 / 0.4)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        {/* Drag handle */}
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px', height: '44px',
            borderRadius: '50%',
            background: '#fff',
            border: '2px solid var(--color-trust-blue)',
            boxShadow: '0 4px 16px oklch(0 0 0 / 0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'col-resize',
            zIndex: 10,
            pointerEvents: 'all',
          }}
          aria-label="Drag to compare"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
        >
          {/* Left/Right chevrons */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-trust-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(6,0)" style={{ display: 'none' }} />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-trust-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-4px' }}>
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </div>
      </div>

      {/* ── Labels ── */}
      <span style={{
        position: 'absolute', top: '1rem', left: '1rem',
        background: 'oklch(0.14 0.04 245 / 0.72)', color: '#fff',
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', padding: '0.3rem 0.75rem',
        pointerEvents: 'none',
      }}>
        {beforeLabel}
      </span>
      <span style={{
        position: 'absolute', top: '1rem', right: '1rem',
        background: 'var(--color-trust-blue)', color: '#fff',
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', padding: '0.3rem 0.75rem',
        pointerEvents: 'none',
      }}>
        {afterLabel}
      </span>

    </div>
  );
}

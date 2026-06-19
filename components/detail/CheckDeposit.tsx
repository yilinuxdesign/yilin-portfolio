'use client'

import React from 'react'

// Faithful recreations of the real Mobile Check Deposit screens (Citi):
// guided auto-capture camera, the review screen with front/back validation,
// the amount-mismatch error modal, and confirmation.

// ── Citi palette (from the Figma file's variables/metadata) ──
const BLUE = '#056dae'
const GREEN = '#00880a'
const GREEN_BG = '#ebffed'
const INK = '#333333'
const INK2 = '#2d2d2d'
const GRAY = '#767676'
const LINE = '#cccccc'
const FIELD = '#eff3f8'
const APP_FONT = '"Interstate", "Helvetica Neue", "Segoe UI", Roboto, Arial, system-ui, sans-serif'
const DISPLAY_WEIGHT = 'var(--display-weight)' as React.CSSProperties['fontWeight']

// ── Status bar ──
function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? '#fff' : '#111'
  return (
    <div style={{
      height: 42, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', flexShrink: 0, position: 'relative', zIndex: 20,
      background: dark ? 'transparent' : '#fff',
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: c, letterSpacing: 0.2 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="16" height="10" viewBox="0 0 17 11" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.5} y={9 - (i + 1) * 2} width="3" height={(i + 1) * 2 + 1} rx="0.6" fill={c} />
          ))}
        </svg>
        <svg width="15" height="10" viewBox="0 0 16 12" fill="none">
          <path d="M8 11.2 1 4.5a10 10 0 0 1 14 0L8 11.2Z" fill={c} opacity="0.95" />
        </svg>
        <svg width="23" height="11" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={c} opacity="0.45" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill={c} />
          <rect x="23" y="4" width="1.6" height="4" rx="0.8" fill={c} opacity="0.45" />
        </svg>
      </div>
    </div>
  )
}

// ── Phone frame ──
function Phone({ children, dark = false, label, width = 312, landscape = false }: {
  children: React.ReactNode
  dark?: boolean
  label?: string
  width?: number
  landscape?: boolean
}) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{
        width, borderRadius: landscape ? 34 : 42, padding: 10, background: '#0c0c0d',
        boxShadow: '0 34px 64px -30px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.05)', flexShrink: 0,
      }}>
        <div style={{
          borderRadius: landscape ? 26 : 33, overflow: 'hidden', position: 'relative',
          background: dark ? '#000' : '#fff', aspectRatio: landscape ? '640 / 384' : '312 / 666',
          display: 'flex', flexDirection: 'column', fontFamily: APP_FONT, color: INK,
        }}>
          <div style={{
            position: 'absolute', zIndex: 40, background: '#0c0c0d',
            ...(landscape
              ? { left: 9, top: '50%', transform: 'translateY(-50%)', width: 22, height: 80, borderRadius: 12 }
              : { top: 9, left: '50%', transform: 'translateX(-50%)', width: 100, height: 25, borderRadius: 14 }),
          }} />
          {children}
        </div>
      </div>
      {label && (
        <figcaption style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em',
          textTransform: 'uppercase', color: 'var(--fg-faint)', textAlign: 'center',
          maxWidth: width + 24, lineHeight: 1.55,
        }}>{label}</figcaption>
      )}
    </figure>
  )
}

// ── Full-bleed camera view ──
function CameraFrame({ children, label, maxWidth = 440, auto = false }: {
  children: React.ReactNode
  label?: string
  maxWidth?: number
  auto?: boolean
}) {
  return (
    <figure style={{ margin: 0, width: '100%', maxWidth, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: '100%', position: 'relative', background: '#262626', display: 'flex', flexDirection: 'column',
        ...(auto ? {} : { aspectRatio: '1012 / 476', overflow: 'hidden' }),
      }}>
        {children}
      </div>
      {label && (
        <figcaption style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em',
          textTransform: 'uppercase', color: 'var(--fg-faint)', textAlign: 'center',
          maxWidth, lineHeight: 1.55,
        }}>{label}</figcaption>
      )}
    </figure>
  )
}

// ── Modal sheet shell ──
function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#000' }}>
      <StatusBar dark />
      <div style={{ height: 6, margin: '3px 7% 0', borderRadius: '8px 8px 0 0', background: BLUE }} />
      <div style={{ flex: 1, minHeight: 0, background: '#fff', borderRadius: '16px 16px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

// ── Atoms ──
const Citi = ({ size = 13 }: { size?: number }) => (
  <span style={{ fontWeight: 800, color: BLUE, fontSize: size, letterSpacing: -0.4, fontFamily: APP_FONT }}>
    citi<sup style={{ fontSize: size * 0.5 }}>®</sup>
  </span>
)

const Help = ({ s = 15, c = BLUE }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ color: c, flexShrink: 0, display: 'block' }}>
    <path d="M 11.16 5.673 C 9.859 5.939 8.9 6.87 8.9 8.204 L 8.9 9.004 L 7.3 9.004 L 7.3 8.204 C 7.3 5.929 8.986 4.484 10.839 4.105 C 12.692 3.725 14.886 4.359 16.106 6.346 L 16.121 6.371 L 16.135 6.397 C 17.263 8.581 16.251 11.054 14.2 12.463 C 13.407 13.007 13.119 13.406 12.976 13.821 C 12.811 14.304 12.801 14.901 12.801 16 L 12.801 16.8 L 11.201 16.8 L 11.201 15.902 C 11.201 14.935 11.201 14.066 11.463 13.302 C 11.757 12.445 12.341 11.798 13.294 11.144 C 14.874 10.059 15.362 8.421 14.726 7.158 C 13.909 5.851 12.451 5.408 11.16 5.673 Z" fill="currentColor" />
    <path d="M 12 20 C 12.497 20 12.9 19.597 12.9 19.1 C 12.9 18.603 12.497 18.2 12 18.2 C 11.503 18.2 11.1 18.603 11.1 19.1 C 11.1 19.597 11.503 20 12 20 Z" fill="currentColor" />
    <path d="M 12 24 C 18.627 24 24 18.627 24 12 C 24 5.373 18.627 0 12 0 C 5.373 0 0 5.373 0 12 C 0 18.627 5.373 24 12 24 Z M 12 22.4 C 17.744 22.4 22.4 17.744 22.4 12 C 22.4 6.256 17.744 1.6 12 1.6 C 6.256 1.6 1.6 6.256 1.6 12 C 1.6 17.744 6.256 22.4 12 22.4 Z" fill="currentColor" fillRule="evenodd" />
  </svg>
)

const Pencil = ({ c = BLUE, s = 18 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ color: c, display: 'block' }}>
    <g transform="translate(1.1 1.1)">
      <path d="M 1.538 14.729 L 15.59 0.587 C 16.358 -0.186 17.6 -0.197 18.381 0.562 L 21.191 3.291 C 21.993 4.069 22.004 5.358 21.217 6.151 L 7.119 20.339 C 7.05 20.408 6.963 20.455 6.868 20.475 L 0.6 21.789 C 0.245 21.864 -0.067 21.544 0.013 21.188 L 1.404 14.973 C 1.425 14.88 1.471 14.796 1.538 14.729 Z M 20.085 4.445 L 17.275 1.716 C 17.119 1.564 16.87 1.567 16.717 1.721 L 14.536 3.916 L 17.86 7.261 L 20.09 5.017 C 20.247 4.858 20.245 4.6 20.085 4.445 Z M 16.979 8.147 L 13.656 4.802 L 3.443 15.079 L 6.767 18.424 L 16.979 8.147 Z M 1.941 19.87 L 2.769 16.173 L 5.666 19.089 L 1.941 19.87 Z" fill="currentColor" fillRule="evenodd" />
    </g>
  </svg>
)

const ChevronLeft = ({ c = BLUE, s = 22 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ color: c, display: 'block' }}>
    <g transform="translate(5.9 1.2)">
      <path d="M 11.97 21.36 C 11.659 21.676 11.151 21.681 10.834 21.371 L 0 10.8 L 10.834 0.229 C 11.151 -0.081 11.659 -0.076 11.97 0.24 C 12.281 0.555 12.276 1.062 11.959 1.371 L 2.296 10.8 L 11.959 20.229 C 12.276 20.538 12.281 21.045 11.97 21.36 Z" fill="currentColor" fillRule="evenodd" />
    </g>
  </svg>
)

const DollarCheck = ({ c = GREEN, s = 22 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ color: c, flexShrink: 0, display: 'block' }}>
    <g transform="translate(0 5)">
      <path d="M 15.142 5.742 C 15.386 5.498 15.386 5.102 15.142 4.858 C 14.898 4.614 14.502 4.614 14.258 4.858 L 10.995 8.122 L 9.636 6.798 C 9.389 6.557 8.993 6.562 8.752 6.81 C 8.511 7.057 8.517 7.453 8.764 7.693 L 10.565 9.448 C 10.81 9.686 11.201 9.684 11.443 9.442 L 15.142 5.742 Z" fill="currentColor" />
      <path d="M 1 0 C 0.448 0 0 0.448 0 1 L 0 13 C 0 13.552 0.448 14 1 14 L 23 14 C 23.552 14 24 13.552 24 13 L 24 1 C 24 0.448 23.552 0 23 0 L 1 0 Z M 1.6 1.6 L 1.6 12.4 L 8.204 12.4 C 6.508 11.206 5.4 9.232 5.4 7 C 5.4 4.768 6.508 2.794 8.204 1.6 L 1.6 1.6 Z M 22.4 12.4 L 15.796 12.4 C 17.492 11.206 18.6 9.232 18.6 7 C 18.6 4.768 17.492 2.794 15.796 1.6 L 22.4 1.6 L 22.4 12.4 Z M 12 12 C 14.761 12 17 9.761 17 7 C 17 4.239 14.761 2 12 2 C 9.239 2 7 4.239 7 7 C 7 9.761 9.239 12 12 12 Z" fill="currentColor" fillRule="evenodd" />
    </g>
  </svg>
)

const CommentPurpose = ({ c = INK, s = 19 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ color: c, flexShrink: 0, display: 'block', marginTop: 1 }}>
    <g transform="translate(0 1)">
      <path d="M 18 11.147 C 16.84 11.147 15.9 10.207 15.9 9.047 C 15.9 7.887 16.84 6.947 18 6.947 C 19.16 6.947 20.1 7.887 20.1 9.047 C 20.1 10.207 19.16 11.147 18 11.147 Z M 18 9.547 C 17.724 9.547 17.5 9.323 17.5 9.047 C 17.5 8.771 17.724 8.547 18 8.547 C 18.276 8.547 18.5 8.771 18.5 9.047 C 18.5 9.323 18.276 9.547 18 9.547 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 9.9 9.047 C 9.9 10.207 10.84 11.147 12 11.147 C 13.16 11.147 14.1 10.207 14.1 9.047 C 14.1 7.887 13.16 6.947 12 6.947 C 10.84 6.947 9.9 7.887 9.9 9.047 Z M 11.5 9.047 C 11.5 9.323 11.724 9.547 12 9.547 C 12.276 9.547 12.5 9.323 12.5 9.047 C 12.5 8.771 12.276 8.547 12 8.547 C 11.724 8.547 11.5 8.771 11.5 9.047 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 6 11.147 C 4.84 11.147 3.9 10.207 3.9 9.047 C 3.9 7.887 4.84 6.947 6 6.947 C 7.16 6.947 8.1 7.887 8.1 9.047 C 8.1 10.207 7.16 11.147 6 11.147 Z M 6 9.547 C 5.724 9.547 5.5 9.323 5.5 9.047 C 5.5 8.771 5.724 8.547 6 8.547 C 6.276 8.547 6.5 8.771 6.5 9.047 C 6.5 9.323 6.276 9.547 6 9.547 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 11.034 17.609 C 10.886 17.609 10.745 17.674 10.65 17.788 L 6.3 23 L 5.104 17.841 C 5.072 17.705 4.951 17.609 4.812 17.609 L 2 17.609 C 0.895 17.609 0 16.713 0 15.609 L 0 2 C 0 0.895 0.895 0 2 0 L 22 0 C 23.105 0 24 0.895 24 2 L 24 15.609 C 24 16.713 23.105 17.609 22 17.609 L 11.034 17.609 Z M 1.6 15.609 L 1.6 2 C 1.6 1.779 1.779 1.6 2 1.6 L 22 1.6 C 22.221 1.6 22.4 1.779 22.4 2 L 22.4 15.609 C 22.4 15.83 22.221 16.009 22 16.009 L 11.034 16.009 C 10.411 16.009 9.821 16.285 9.422 16.763 L 7.132 19.506 L 6.663 17.48 C 6.463 16.618 5.696 16.009 4.812 16.009 L 2 16.009 C 1.779 16.009 1.6 15.83 1.6 15.609 Z" fill="currentColor" fillRule="evenodd" />
    </g>
  </svg>
)

const Check = ({ s = 30 }: { s?: number }) => (
  <span style={{
    width: s, height: s, borderRadius: '50%', background: GREEN, display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
  }}>
    <svg width={s * 0.5} height={s * 0.5} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

const FDIC = () => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
    <svg width="33" height="14" viewBox="0 0 38 16" fill="none" style={{ color: '#003256', flexShrink: 0, marginTop: 1, display: 'block' }} aria-label="FDIC">
      <path d="M 8.941 0.281 L 14.147 0.281 C 18.852 0.281 21.861 3.337 21.861 8.09 C 21.861 13.356 18.538 15.919 13.245 15.919 L 8.941 15.919 L 8.941 0.281 Z M 13.83 3.867 C 13.641 3.867 13.399 3.895 13.075 3.895 L 13.075 12.338 C 15.735 12.338 17.772 11.216 17.772 8.011 C 17.772 5.25 16.099 3.884 13.83 3.884 L 13.83 3.867 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 38 4.84 L 38 0.713 C 36.953 0.23 35.82 -0.012 34.677 0 C 30.331 0 26.846 3.475 26.846 8.056 C 26.846 12.638 30.275 16 34.598 16 C 36.135 16 37.189 15.658 38 15.002 L 38 10.874 C 36.784 11.671 35.946 12.013 34.808 12.013 C 32.621 12.013 30.919 10.33 30.919 7.857 C 30.888 6.753 31.286 5.683 32.019 4.894 C 32.753 4.105 33.76 3.664 34.808 3.674 C 35.997 3.674 36.861 4.1 38 4.84 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 0 0.289 L 0 15.919 L 4.078 15.919 L 4.105 9.941 L 8.074 9.941 L 8.074 6.326 L 4.131 6.326 L 4.105 3.906 L 8.371 3.906 L 8.371 0.289 L 0 0.289 Z" fill="currentColor" fillRule="evenodd" />
      <path d="M 22.281 15.919 L 26.359 15.919 L 26.359 0.289 L 22.281 0.289 L 22.281 15.919 Z" fill="currentColor" fillRule="evenodd" />
    </svg>
    <span style={{ fontSize: 9.5, fontStyle: 'italic', color: '#000', lineHeight: 1.35 }}>
      FDIC-Insured – Backed by the full faith and credit of the U.S. Government<br />
      <span style={{ fontStyle: 'normal' }}>Citibank, N.A.</span>
    </span>
  </div>
)

const CamInfo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#fff', display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
    <path d="M 11.2 20 L 11.2 8 L 12.8 8 L 12.8 20 L 11.2 20 Z" fill="currentColor" />
    <path d="M 12 5.6 C 12.497 5.6 12.9 5.197 12.9 4.7 C 12.9 4.203 12.497 3.8 12 3.8 C 11.503 3.8 11.1 4.203 11.1 4.7 C 11.1 5.197 11.503 5.6 12 5.6 Z" fill="currentColor" />
    <path d="M 12 24 C 18.627 24 24 18.627 24 12 C 24 5.373 18.627 0 12 0 C 5.373 0 0 5.373 0 12 C 0 18.627 5.373 24 12 24 Z M 12 22.4 C 17.744 22.4 22.4 17.744 22.4 12 C 22.4 6.256 17.744 1.6 12 1.6 C 6.256 1.6 1.6 6.256 1.6 12 C 1.6 17.744 6.256 22.4 12 22.4 Z" fill="currentColor" fillRule="evenodd" />
  </svg>
)
const CamClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#fff', display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
    <path d="M 5.634 5.634 C 5.947 5.322 6.453 5.322 6.766 5.634 L 12 10.869 L 17.234 5.634 C 17.547 5.322 18.053 5.322 18.366 5.634 C 18.678 5.947 18.678 6.453 18.366 6.766 L 13.131 12 L 18.416 17.284 C 18.728 17.597 18.728 18.103 18.416 18.416 C 18.103 18.728 17.597 18.728 17.284 18.416 L 12 13.131 L 6.716 18.416 C 6.403 18.728 5.897 18.728 5.584 18.416 C 5.272 18.103 5.272 17.597 5.584 17.284 L 10.869 12 L 5.634 6.766 C 5.322 6.453 5.322 5.947 5.634 5.634 Z" fill="currentColor" />
    <path d="M 24 12 C 24 18.627 18.627 24 12 24 C 5.373 24 0 18.627 0 12 C 0 5.373 5.373 0 12 0 C 18.627 0 24 5.373 24 12 Z M 22.4 12 C 22.4 17.744 17.744 22.4 12 22.4 C 6.256 22.4 1.6 17.744 1.6 12 C 1.6 6.256 6.256 1.6 12 1.6 C 17.744 1.6 22.4 6.256 22.4 12 Z" fill="currentColor" fillRule="evenodd" />
  </svg>
)
const CamFlash = () => (
  <svg width="22" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#fff', display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
    <path d="M 7.357 0.66 C 8.021 -0.501 9.803 -0.033 9.803 1.302 L 9.803 8.688 L 16.69 8.688 C 17.69 8.688 18.32 9.759 17.83 10.625 L 10.641 23.335 C 9.981 24.501 8.193 24.036 8.193 22.698 L 8.193 15.181 L 1.31 15.181 C 0.307 15.181 -0.323 14.106 0.172 13.239 L 7.357 0.66 Z M 8.193 2.438 L 1.828 13.581 L 8.495 13.581 C 9.217 13.581 9.803 14.163 9.803 14.881 L 9.803 21.552 L 16.174 10.288 L 9.501 10.288 C 8.779 10.288 8.193 9.706 8.193 8.988 L 8.193 2.438 Z" fill="currentColor" fillRule="evenodd" transform="translate(3 0)" />
  </svg>
)
const WhiteCheck = ({ s = 44 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ color: '#fff', display: 'block' }} aria-label="Captured">
    <path d="M 19.466 8.366 C 19.778 8.053 19.778 7.547 19.466 7.234 C 19.153 6.922 18.647 6.922 18.334 7.234 L 9.532 16.036 L 6.098 12.602 C 5.786 12.29 5.279 12.29 4.967 12.602 C 4.654 12.914 4.654 13.421 4.967 13.733 L 9.532 18.299 L 19.466 8.366 Z" fill="currentColor" />
    <path d="M 24 12 C 24 18.627 18.627 24 12 24 C 5.373 24 0 18.627 0 12 C 0 5.373 5.373 0 12 0 C 18.627 0 24 5.373 24 12 Z M 22.4 12 C 22.4 17.744 17.744 22.4 12 22.4 C 6.256 22.4 1.6 17.744 1.6 12 C 1.6 6.256 6.256 1.6 12 1.6 C 17.744 1.6 22.4 6.256 22.4 12 Z" fill="currentColor" fillRule="evenodd" />
  </svg>
)
const CamBtn = ({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) => (
  <div style={{
    flex: 1, textAlign: 'center', borderRadius: 4, padding: '11px 0', fontSize: 13.5, fontWeight: 700,
    background: primary ? BLUE : '#fff', color: primary ? '#fff' : BLUE,
  }}>{children}</div>
)

// ── Camera capture (guided auto-capture) ──
function CaptureScreen({ side = 'front', caption, panel = null }: {
  side?: 'front' | 'back'
  caption?: string
  panel?: { title: string; subtitle?: string } | null
}) {
  const img = side === 'back' ? '/assets/check-back.png' : '/assets/check-front.png'
  const title = caption || (side === 'back' ? 'Auto capture back of check' : 'Auto capture front of check')
  return (
    <div style={{ flex: 1, position: 'relative', background: '#262626', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px 8px', zIndex: 6 }}>
        <CamInfo />
        <span style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>{title}</span>
        <CamClose />
      </div>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
        <img src={img} alt="" style={{ width: '100%', maxHeight: '100%', height: 'auto', objectFit: 'contain', borderRadius: 3, boxShadow: '0 3px 16px rgba(0,0,0,0.55)', display: 'block' }} />
        {panel && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />}
        {panel && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.72)', borderRadius: 8, padding: '14px 18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, maxWidth: 260 }}>
              <WhiteCheck s={40} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#eff3f8', fontSize: 13.5, fontWeight: 400, lineHeight: 1.3 }}>{panel.title}</div>
                {panel.subtitle && <div style={{ color: '#eff3f8', fontSize: 11, fontWeight: 300, lineHeight: 1.45, marginTop: 6 }}>{panel.subtitle}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
      {panel ? (
        <div style={{ padding: '8px 16px 14px', display: 'flex', gap: 10, flexShrink: 0 }}>
          <CamBtn>Retake</CamBtn>
          <CamBtn primary>Continue</CamBtn>
        </div>
      ) : (
        <div style={{ padding: '6px 18px 14px', display: 'flex', flexShrink: 0 }}>
          <CamFlash />
        </div>
      )}
    </div>
  )
}

// ── Troubleshooting / manual-capture fallback modal ──
function TipsScreen({ buttons = [{ label: 'Got it', primary: true }], side = 'front' }: {
  buttons?: { label: string; primary?: boolean }[]
  side?: 'front' | 'back'
}) {
  const img = side === 'back' ? '/assets/check-back.png' : '/assets/check-front.png'
  const title = side === 'back' ? 'Auto capture back of check' : 'Auto capture front of check'
  return (
    <div style={{ position: 'relative', width: '100%', background: '#262626', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px 8px' }}>
        <CamInfo />
        <span style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>{title}</span>
        <CamClose />
      </div>
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 18px 20px' }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: '18px 18px 16px', width: '100%', maxWidth: 360, boxShadow: '0 14px 44px rgba(0,0,0,0.45)' }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: INK2, lineHeight: 1.3, marginBottom: 12 }}>
            Having trouble with the check image? Try these tips:
          </div>
          <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              'Hold the device steady, directly over the check ensuring all 4 corners are within grid',
              "Make sure you're in a well-lit area with a dark background for contrast",
              'Detach the check from any check stub, cover letter, or envelope',
            ].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 7, fontSize: 10.5, color: INK, lineHeight: 1.4 }}>
                <span style={{ color: INK }}>•</span><span>{t}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {buttons.map((b, i) => (
              <div key={i} style={{
                textAlign: 'center', borderRadius: 4, padding: '11px 0', fontSize: 13, fontWeight: 700,
                background: b.primary ? BLUE : '#fff', color: b.primary ? '#fff' : BLUE,
                border: b.primary ? 'none' : `1.5px solid ${BLUE}`,
              }}>{b.label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── FTU tutorial ──
function FtuScreen() {
  return (
    <div style={{ position: 'relative', width: '100%', background: '#1f1f1f', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 40%, #34322f 0%, #1a1918 100%)' }} />
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 18px' }}>
        <div style={{ background: '#fff', borderRadius: 10, padding: '20px 22px 18px', width: '100%', maxWidth: 320, boxShadow: '0 16px 48px rgba(0,0,0,0.45)' }}>
          <div style={{ position: 'relative', height: 104, marginBottom: 16 }}>
            <div style={{ position: 'absolute', left: '50%', bottom: 4, transform: 'translateX(-50%)', width: 168, height: 60, background: '#1b3a6b', clipPath: 'polygon(24% 0, 76% 0, 100% 100%, 0 100%)' }} />
            <div style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', width: 78, height: 36, background: '#e8eef6', borderRadius: 2, padding: 6, boxSizing: 'border-box' }}>
              <div style={{ height: 3, width: '60%', background: '#b8c6dd', borderRadius: 2, marginBottom: 4 }} />
              <div style={{ height: 3, width: '85%', background: '#cdd8e8', borderRadius: 2, marginBottom: 4 }} />
              <div style={{ height: 3, width: '40%', background: '#cdd8e8', borderRadius: 2 }} />
            </div>
            <div style={{ position: 'absolute', left: '50%', top: 2, transform: 'translateX(-50%)', width: 44, height: 31, background: '#0f2c55', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', border: '1.6px solid #6f8fbf' }} />
            </div>
            <div style={{ position: 'absolute', left: '50%', top: 35, transform: 'translateX(-50%)', borderLeft: '2px dashed #8aa6cf', height: 20 }} />
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: INK, lineHeight: 1.45, textAlign: 'center' }}>
            Place your check on a flat, dark surface and hold your camera above it to auto-capture the photo.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: BLUE, color: '#fff', borderRadius: 4, padding: '9px 26px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>Got it</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Initial view with guideline overlay ──
function GuidelineScreen() {
  const corner = (m: React.CSSProperties) => (
    <div style={{ position: 'absolute', width: 18, height: 18, borderColor: 'rgba(255,255,255,0.9)', borderStyle: 'solid', borderWidth: 0, ...m }} />
  )
  return (
    <div style={{ flex: 1, position: 'relative', background: 'radial-gradient(120% 95% at 50% 42%, #38352f 0%, #1d1b19 100%)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px 8px', zIndex: 6 }}>
        <CamInfo />
        <span style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>Auto capture the front of check</span>
        <CamClose />
      </div>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 18px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 7' }}>
          {corner({ top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 })}
          {corner({ top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 })}
          {corner({ bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 })}
          {corner({ bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 })}
          <div style={{ position: 'absolute', left: '10%', top: '26%', width: '44%', height: 2, background: 'rgba(255,255,255,0.28)' }} />
          <div style={{ position: 'absolute', left: '10%', top: '50%', width: '55%', height: 2, background: 'rgba(255,255,255,0.22)' }} />
          <div style={{ position: 'absolute', left: '10%', top: '72%', width: '34%', height: 2, background: 'rgba(255,255,255,0.22)' }} />
          <span style={{ position: 'absolute', right: '9%', top: '16%', color: 'rgba(255,255,255,0.42)', fontSize: 11, fontWeight: 600 }}>1234</span>
          <span style={{ position: 'absolute', right: '9%', top: '40%', color: 'rgba(255,255,255,0.42)', fontSize: 9 }}>Date</span>
          <div style={{ position: 'absolute', right: '9%', bottom: '16%', width: '22%', height: '20%', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ padding: '6px 18px 14px', display: 'flex', flexShrink: 0 }}>
        <CamFlash />
      </div>
    </div>
  )
}

// ── Header used on review / confirmation ──
const TopNav = ({ back = true, title, right = 'Cancel' }: { back?: boolean; title: string; right?: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '11px 14px', borderBottom: `1px solid ${LINE}`, flexShrink: 0,
  }}>
    <span style={{ width: 40, display: 'flex', alignItems: 'center', visibility: back ? 'visible' : 'hidden' }}><ChevronLeft /></span>
    <span style={{ fontSize: 15, fontWeight: 700, color: INK2, textAlign: 'center' }}>{title}</span>
    <span style={{ width: 40, color: BLUE, fontSize: 13, textAlign: 'right' }}>{right}</span>
  </div>
)

const PrimaryBtn = ({ children, ghost = false }: { children: React.ReactNode; ghost?: boolean }) => (
  <div style={{
    flex: 1, textAlign: 'center', borderRadius: 4, padding: '12px 0', fontSize: 14, fontWeight: 700,
    background: ghost ? '#fff' : BLUE, color: ghost ? BLUE : '#fff',
    border: ghost ? `1.5px solid ${BLUE}` : 'none',
  }}>{children}</div>
)

// ── Review / deposit screen (captured state) ──
function ReviewScreen() {
  return (
    <Sheet>
      <TopNav title="Mobile check deposit" />
      <div style={{ flex: 1, overflow: 'hidden', padding: '12px 16px 0' }}>
        <div style={{ marginBottom: 12 }}><FDIC /></div>

        <div style={{ background: FIELD, borderRadius: 6, padding: '10px 12px', marginBottom: 18, position: 'relative' }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: INK2, marginBottom: 5 }}>Deposit to</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Citi size={12} />
            <span style={{ fontSize: 13, color: INK2, fontWeight: 600 }}>Citi Savings ••••6712</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{ fontSize: 11, color: GRAY }}>$24,000.00 available</span>
            <Help s={13} />
          </div>
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}><Pencil /></div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: INK2, marginBottom: 1 }}>Amount</div>
          <div style={{ fontSize: 42, fontWeight: 400, color: BLUE, lineHeight: 1, letterSpacing: -1 }}>$300.00</div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 10, color: INK, lineHeight: 1.75, marginBottom: 14 }}>
          Remaining mobile deposit limit: $5,000.00<br />
          Daily mobile deposit limit: $5,000.00<br />
          Rolling 30-day mobile deposit limit: $10,000.00
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginBottom: 14 }}>
          <div style={{ border: `1.5px solid ${GREEN}`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 64, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/check-front.png" alt="" style={{ width: '84%', height: 'auto', maxHeight: '78%', objectFit: 'contain', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check s={26} /></div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: BLUE, padding: '5px 0', borderTop: `1px solid ${LINE}` }}>Front</div>
          </div>
          <div style={{ border: `1.5px solid ${GREEN}`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 64, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/check-back.png" alt="" style={{ width: '84%', height: 'auto', maxHeight: '78%', objectFit: 'contain', display: 'block', opacity: 0.95 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check s={26} /></div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: BLUE, padding: '5px 0', borderTop: `1px solid ${LINE}` }}>Back</div>
          </div>
        </div>

        <div style={{ fontSize: 9.5, color: INK, lineHeight: 1.5, marginBottom: 12 }}>
          Please note that not all accounts are eligible for deposits through this service. Also keep in mind that we only accept deposits drawn on U.S. banks and payable in U.S. dollars.
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, borderBottom: `1px solid ${LINE}`, paddingBottom: 12 }}>Terms & Conditions</div>
      </div>

      <div style={{ padding: '12px 16px 22px', display: 'flex', flexDirection: 'column', gap: 9, flexShrink: 0 }}>
        <div style={{ display: 'flex' }}><PrimaryBtn>Submit</PrimaryBtn></div>
      </div>
    </Sheet>
  )
}

// ── Amount-mismatch error modal ──
function ErrorScreen() {
  return (
    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ filter: 'saturate(0.9)', flex: 1, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
        <ReviewScreen />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: '22px 20px 18px', width: '100%', boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: INK2, lineHeight: 1.25, marginBottom: 12 }}>
            Re-enter the amount or retake your front image
          </div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.5, marginBottom: 20 }}>
            Looks like the amount you entered doesn&apos;t match the amount scanned from your check. Try re-entering the amount or retaking the front image.
          </div>
          <div style={{ display: 'flex' }}><PrimaryBtn>OK</PrimaryBtn></div>
        </div>
      </div>
    </div>
  )
}

// ── Confirmation ──
function ConfirmScreen() {
  return (
    <Sheet>
      <div style={{ flex: 1, overflow: 'hidden', padding: '16px 16px 0' }}>
        <div style={{ marginBottom: 18 }}><FDIC /></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" style={{ color: GREEN, display: 'block' }} aria-label="Success">
              <path d="M 19.466 8.366 C 19.778 8.053 19.778 7.547 19.466 7.234 C 19.153 6.922 18.647 6.922 18.334 7.234 L 9.532 16.036 L 6.098 12.602 C 5.786 12.29 5.279 12.29 4.967 12.602 C 4.654 12.914 4.654 13.421 4.967 13.733 L 9.532 18.299 L 19.466 8.366 Z" fill="currentColor" />
              <path d="M 24 12 C 24 18.627 18.627 24 12 24 C 5.373 24 0 18.627 0 12 C 0 5.373 5.373 0 12 0 C 18.627 0 24 5.373 24 12 Z M 22.4 12 C 22.4 17.744 17.744 22.4 12 22.4 C 6.256 22.4 1.6 17.744 1.6 12 C 1.6 6.256 6.256 1.6 12 1.6 C 17.744 1.6 22.4 6.256 22.4 12 Z" fill="currentColor" fillRule="evenodd" />
            </svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK2 }}>Success</div>
          <div style={{ fontSize: 38, fontWeight: 400, color: INK2, lineHeight: 1.05, letterSpacing: -1, margin: '4px 0 2px' }}>$300.00</div>
          <div style={{ fontSize: 12.5, color: INK }}>Confirmation # 3200013004041</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: GREEN_BG, borderRadius: 4, padding: '10px 12px', margin: '16px 0 12px' }}>
          <DollarCheck s={22} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: INK2 }}>Immediately available: $300.00</span>
        </div>

        <div style={{ display: 'flex', gap: 9, background: FIELD, borderRadius: 4, padding: '10px 12px', marginBottom: 16 }}>
          <CommentPurpose s={19} />
          <span style={{ fontSize: 10.5, color: INK, lineHeight: 1.4 }}>
            The balance information below includes the deposited amount and may be subject to adjustment after further review. Any portion of your deposit that is immediately available to you will be reflected in the available balance total.
          </span>
        </div>

        <div style={{ border: `1px solid ${LINE}`, borderRadius: 6, padding: '13px 14px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK2, marginBottom: 10 }}>Deposit details</div>
          {([
            ['Deposit account', 'Citi Savings ••••6721'],
            ['Balances', '$24,000.00 available now'],
            ['', '$24,000.00 on deposit'],
            ['Deposit date', 'Oct 08, 2025'],
          ] as [string, string][]).map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 7 }}>
              <span style={{ fontSize: 11.5, color: GRAY }}>{k}</span>
              <span style={{ fontSize: 11.5, color: INK2, fontWeight: 600, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 22px', display: 'flex', flexDirection: 'column', gap: 9, flexShrink: 0 }}>
        <div style={{ display: 'flex' }}><PrimaryBtn>Done</PrimaryBtn></div>
        <div style={{ display: 'flex' }}><PrimaryBtn ghost>Make another deposit</PrimaryBtn></div>
      </div>
    </Sheet>
  )
}

// ── Capture states (the guidance system) ──
const STATES = [
  { msg: 'Auto capture front of check', good: false },
  { msg: 'Now turn the check over to capture the back', good: false },
  { msg: 'Back of the check captured', good: true },
  { msg: 'Manual capture the front of check', good: false },
]

// ── Hero: the guided auto-capture camera + the capture-state system ──
export function CheckDepositHero() {
  return (
    <div className="reveal" style={{
      background: '#161617', borderRadius: 10, padding: 'clamp(28px, 4vw, 56px)',
      display: 'grid', gridTemplateColumns: 'minmax(0, 380px) 1fr', gap: 'clamp(28px, 5vw, 72px)',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CameraFrame maxWidth={400}><CaptureScreen /></CameraFrame>
      </div>
      <div style={{ minWidth: 0 }} className="cd-hero-copy">
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18,
        }}>The guidance system</div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: DISPLAY_WEIGHT,
          fontSize: 'clamp(22px, 2.4vw, 32px)', color: '#fff', margin: '0 0 14px', lineHeight: 1.15,
        }}>Coaching the capture, while the camera is still open.</h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.62)', margin: '0 0 26px', maxWidth: '46ch',
        }}>
          The viewport reads the live frame and auto-fires on a good capture — front, then back —
          with a one-tap manual fallback for the cases vision can&apos;t clear. Every state speaks plainly.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STATES.map(({ msg, good }) => (
            <span key={msg} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start',
              background: good ? 'rgba(0,136,10,0.16)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${good ? 'rgba(0,136,10,0.55)' : 'rgba(255,255,255,0.13)'}`,
              borderRadius: 20, padding: '7px 14px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: good ? GREEN : '#ffca00', flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: '#fff', fontWeight: 600 }}>&ldquo;{msg}&rdquo;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Auto-capture sequence: front → flip → back → captured ──
export function CheckDepositCaptureFlow() {
  const steps: { node: React.ReactNode; label: string; auto?: boolean }[] = [
    { node: <FtuScreen />, label: 'FTU — place check on a flat, dark surface', auto: true },
    { node: <GuidelineScreen />, label: 'Initial view — guideline overlay' },
    { node: <CaptureScreen side="front" />, label: '01 — Front detected, shutter auto-fires' },
    { node: <CaptureScreen side="front" panel={{ title: 'Now turn the check over to capture the back.', subtitle: 'Sign the back and write “For Citibank deposit only”. Learn more' }} />, label: '02 — Front captured · Retake or Continue' },
    { node: <CaptureScreen side="back" />, label: '03 — Back detected, shutter auto-fires' },
    { node: <CaptureScreen side="back" panel={{ title: 'Back of the check captured' }} />, label: '04 — Back captured · Retake or Continue' },
    { node: <TipsScreen buttons={[{ label: 'Continue with auto capture', primary: true }, { label: 'Switch to manual capture' }]} />, label: 'After 30s of trouble — tips, with a manual escape', auto: true },
    { node: <TipsScreen buttons={[{ label: 'Switch to manual capture' }]} />, label: 'Third prompt — auto capture steps aside for manual', auto: true },
  ]
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 'clamp(24px, 3.5vw, 48px)', justifyItems: 'center', alignItems: 'start',
    }}>
      {steps.map((s, i) => (
        <div key={i} className="reveal" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <CameraFrame maxWidth={440} auto={s.auto} label={s.label}>{s.node}</CameraFrame>
        </div>
      ))}
    </div>
  )
}

// ── Screen gallery: review · error · confirmation ──
export function CheckDepositScreens() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(238px, 1fr))',
      gap: 'clamp(28px, 4vw, 52px)', justifyItems: 'center', alignItems: 'start',
    }}>
      <div className="reveal"><Phone label="Review — front & back validated at a glance, account and deposit limits in context"><ReviewScreen /></Phone></div>
      <div className="reveal"><Phone label="Amount mismatch — caught before submit, with a plain-language way to recover"><ErrorScreen /></Phone></div>
      <div className="reveal"><Phone label="Confirmation — funds availability surfaced up front, with a one-tap path to deposit again"><ConfirmScreen /></Phone></div>
    </div>
  )
}

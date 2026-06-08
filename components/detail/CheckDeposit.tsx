'use client'

import React from 'react'

const BLUE = '#056dae'
const BTN = '#00529b'
const GREEN = '#00880a'
const MAGENTA = '#c74289'
const INK = '#2d2d2d'
const GRAY = '#767676'
const LINE = '#cccccc'
const FIELD = '#eff3f8'
const APP_FONT = '"Helvetica Neue", "Segoe UI", system-ui, -apple-system, Arial, sans-serif'

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? '#fff' : '#111'
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 22px', flexShrink: 0,
      background: dark ? 'transparent' : '#fff',
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: c, letterSpacing: 0.2 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.5} y={9 - (i + 1) * 2} width="3" height={(i + 1) * 2 + 1} rx="0.7" fill={c} />
          ))}
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 12" fill="none">
          <path d="M8 11.2 1 4.5a10 10 0 0 1 14 0L8 11.2Z" fill={c} opacity="0.95" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={c} opacity="0.5" />
          <rect x="2" y="2" width="17" height="8" rx="1.6" fill={c} />
          <rect x="23" y="4" width="1.6" height="4" rx="0.8" fill={c} opacity="0.5" />
        </svg>
      </div>
    </div>
  )
}

function Phone({ children, dark = false, label, width = 312 }: {
  children: React.ReactNode
  dark?: boolean
  label?: string
  width?: number
}) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{
        width, borderRadius: 40, padding: 9, background: '#0c0c0d',
        boxShadow: '0 30px 60px -28px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.04)',
        flexShrink: 0,
      }}>
        <div style={{
          borderRadius: 32, overflow: 'hidden', position: 'relative',
          background: dark ? INK : '#fff',
          aspectRatio: '312 / 660', display: 'flex', flexDirection: 'column',
          fontFamily: APP_FONT, color: INK,
        }}>
          <div style={{
            position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)',
            width: 104, height: 26, borderRadius: 14, background: '#0c0c0d', zIndex: 30,
          }} />
          {children}
        </div>
      </div>
      {label && (
        <figcaption style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--fg-faint)', textAlign: 'center',
          maxWidth: width + 30, lineHeight: 1.5,
        }}>{label}</figcaption>
      )}
    </figure>
  )
}

function Citi({ size = 13 }: { size?: number }) {
  return (
    <span style={{ fontWeight: 700, color: BLUE, fontSize: size, letterSpacing: -0.3 }}>
      citi<span style={{ color: '#e2231a', fontSize: size * 0.9 }}>®</span>
    </span>
  )
}

function InfoDot({ c = BLUE, s = 15 }: { c?: string; s?: number }) {
  return (
    <span style={{
      width: s, height: s, borderRadius: '50%', border: `1.4px solid ${c}`, color: c,
      fontSize: s * 0.62, fontWeight: 700, display: 'inline-flex', alignItems: 'center',
      justifyContent: 'center', fontStyle: 'italic', flexShrink: 0,
    }}>i</span>
  )
}

function CheckIcon({ s = 30 }: { s?: number }) {
  return (
    <span style={{
      width: s, height: s, borderRadius: '50%', background: GREEN, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }}>
      <svg width={s * 0.5} height={s * 0.5} viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function CaptureScreen({ hint = 'Hold camera directly over check', good = false }: { hint?: string; good?: boolean }) {
  return (
    <>
      <StatusBar dark />
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 16px 12px', color: '#fff',
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%', border: '1.5px solid #fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
        }}>✕</span>
        <span style={{ fontSize: 14, fontWeight: 700 }}>Front of check</span>
        <InfoDot c="#fff" s={24} />
      </div>
      <div style={{ flex: 1, position: 'relative', margin: '0 12px', display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '100%', aspectRatio: '16 / 9', borderRadius: 6, position: 'relative',
          backgroundImage: 'url(/assets/check-camera.png)', backgroundSize: 'cover',
          backgroundPosition: 'center', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
            display: 'flex', alignItems: 'center', gap: 8, background: '#fff',
            borderRadius: 22, padding: '7px 13px 7px 9px', maxWidth: '82%',
            boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
          }}>
            {good ? <CheckIcon s={18} /> : <InfoDot c={INK} s={17} />}
            <span style={{ fontSize: 11.5, fontWeight: 600, color: INK, lineHeight: 1.2 }}>{hint}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 22px 26px', display: 'flex', alignItems: 'center' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M13 2 4 13h6l-1 9 9-12h-6l1-8Z" fill="#fff" />
        </svg>
      </div>
    </>
  )
}

function ReviewScreen({ error = false }: { error?: boolean }) {
  return (
    <>
      <StatusBar />
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '2px 16px 12px', borderBottom: `1px solid ${LINE}`,
      }}>
        <span style={{ color: BLUE, fontSize: 22, lineHeight: 1 }}>‹</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>Mobile check deposit</span>
        <span style={{ color: BLUE, fontSize: 13 }}>Cancel</span>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
          <span style={{ fontWeight: 800, color: '#1a3a6b', fontSize: 12, letterSpacing: -0.3, marginTop: 1 }}>FDIC</span>
          <span style={{ fontSize: 9.5, fontStyle: 'italic', color: GRAY, lineHeight: 1.3 }}>
            FDIC-Insured — Backed by the full faith and credit of the U.S. Government<br />Citibank, N.A.
          </span>
        </div>

        <div style={{ background: FIELD, borderRadius: 7, padding: '10px 12px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>Deposit to</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 20h4L19 9l-4-4L4 16v4Z" stroke={BLUE} strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}>
            <Citi size={12} />
            <span style={{ fontSize: 12.5, color: INK }}>Citi Savings ••••6712</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <span style={{ fontSize: 10.5, color: GRAY }}>$24,000.00 available</span>
            <InfoDot s={12} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: error ? 4 : 8 }}>
          <div style={{ fontSize: 11, color: GRAY, marginBottom: 2 }}>Amount</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: error ? '#c70000' : BLUE, lineHeight: 1, letterSpacing: -1 }}>
            {error ? '$715.39' : '$300.00'}
          </div>
        </div>

        {error ? (
          <div style={{
            display: 'flex', gap: 7, background: '#ffebeb', border: '1px solid #e8b4b4',
            borderRadius: 6, padding: '8px 10px', marginBottom: 12,
          }}>
            <span style={{ color: '#c70000', fontWeight: 800, fontSize: 12 }}>✕</span>
            <span style={{ fontSize: 10.5, color: '#9a1a1a', lineHeight: 1.35 }}>
              This doesn&apos;t match the amount on the check. Edit the amount or retake the photo.
            </span>
          </div>
        ) : (
          <div style={{ textAlign: 'center', fontSize: 10, color: GRAY, lineHeight: 1.7, marginBottom: 14 }}>
            Remaining mobile deposit limit: $5,000.00<br />
            Daily mobile deposit limit: $5,000.00<br />
            Rolling 30-day mobile deposit limit: $10,000.00
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div style={{ border: `1.5px solid ${GREEN}`, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 58, background: '#dfeae0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/check-front.png" alt="" style={{ width: '92%', height: 'auto', display: 'block', opacity: 0.96 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon s={26} /></div>
              <span style={{
                position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%',
                background: MAGENTA, color: '#fff', fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>1</span>
            </div>
            <div style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: BLUE, padding: '5px 0', borderTop: `1px solid ${LINE}` }}>Front</div>
          </div>
          <div style={{ border: `1.5px solid ${GREEN}`, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 58, background: '#f4f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', left: 12, top: 12, right: 12, bottom: 12, border: `1px solid ${LINE}`, borderRadius: 3 }} />
              <CheckIcon s={26} />
            </div>
            <div style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: BLUE, padding: '5px 0', borderTop: `1px solid ${LINE}` }}>Back</div>
          </div>
        </div>

        <div style={{ fontSize: 9, color: GRAY, lineHeight: 1.5, marginBottom: 10 }}>
          Please note that not all accounts are eligible for deposits through this service. We only accept deposits drawn on U.S. banks and payable in U.S. dollars.
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, borderBottom: `1px solid ${LINE}`, paddingBottom: 12 }}>Terms &amp; Conditions</div>
      </div>

      <div style={{ padding: '12px 16px 22px', flexShrink: 0 }}>
        <div style={{
          background: error ? '#a9b6c4' : BTN, color: '#fff', textAlign: 'center',
          borderRadius: 22, padding: '12px 0', fontSize: 14, fontWeight: 700,
        }}>Submit</div>
      </div>
    </>
  )
}

function ConfirmScreen() {
  const rows: [string, string][] = [
    ['Amount', '$300.00'],
    ['Deposit to', 'Citi Savings ••••6712'],
    ['Confirmation #', 'MCD-48201'],
    ['Date', 'Jun 7, 2025'],
  ]
  return (
    <>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '2px 16px 12px', borderBottom: `1px solid ${LINE}` }}>
        <span style={{ color: BLUE, fontSize: 13 }}>Done</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 0', textAlign: 'center' }}>
        <CheckIcon s={62} />
        <div style={{ fontSize: 19, fontWeight: 700, color: INK, marginTop: 22, lineHeight: 1.25 }}>
          Your deposit is being processed
        </div>
        <div style={{ fontSize: 12.5, color: GRAY, marginTop: 10, lineHeight: 1.5, maxWidth: 230 }}>
          We&apos;ll email you when it&apos;s complete. Funds are typically available the next business day.
        </div>

        <div style={{ width: '100%', marginTop: 30, borderTop: `1px solid ${LINE}` }}>
          {rows.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 2px', borderBottom: `1px solid ${LINE}`, fontSize: 12.5 }}>
              <span style={{ color: GRAY }}>{k}</span>
              <span style={{ color: INK, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 16px 22px', flexShrink: 0 }}>
        <div style={{ border: `1.5px solid ${BTN}`, color: BTN, textAlign: 'center', borderRadius: 22, padding: '11px 0', fontSize: 14, fontWeight: 700 }}>
          Deposit another check
        </div>
      </div>
    </>
  )
}

const HINTS: [string, string][] = [
  ['Too much glare', 'Hold camera directly over check'],
  ['Low contrast', 'Try a darker background'],
  ['Busy background', 'Place check on a plain background'],
  ['Not sharp', 'Hold phone steady'],
  ['Too far', 'Too far away for image capture'],
  ['Too dark', 'Too dark for image capture'],
  ['Wrong side', 'Place check so front is showing'],
  ['Good', 'Tap now'],
]

export function CheckDepositHero() {
  return (
    <div className="reveal" style={{
      background: '#1a1a1c', borderRadius: 10, padding: 'clamp(28px, 4vw, 56px)',
      display: 'grid', gridTemplateColumns: 'minmax(0, 320px) 1fr', gap: 'clamp(28px, 5vw, 72px)',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Phone dark width={300}><CaptureScreen /></Phone>
      </div>
      <div style={{ minWidth: 0, alignSelf: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18,
        }}>The guidance system</div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as React.CSSProperties['fontWeight'],
          fontSize: 'clamp(22px, 2.4vw, 32px)', color: '#fff', margin: '0 0 14px', lineHeight: 1.15,
        }}>One clear instruction at a time — while the camera is still open.</h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.62)', margin: '0 0 26px', maxWidth: '46ch',
        }}>
          The live frame is read continuously. Every back-end rejection reason maps to a single,
          plain-language fix — and the shutter only fires on a good frame.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {HINTS.map(([reason, msg]) => {
            const good = reason === 'Good'
            return (
              <span key={reason} style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: good ? 'rgba(0,136,10,0.16)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${good ? 'rgba(0,136,10,0.6)' : 'rgba(255,255,255,0.14)'}`,
                borderRadius: 20, padding: '6px 12px',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: good ? GREEN : '#ffca00',
                }} />
                <span style={{ fontSize: 12.5, color: '#fff', fontWeight: 600 }}>&ldquo;{msg}&rdquo;</span>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function CheckDepositScreens() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 'clamp(28px, 4vw, 56px)', justifyItems: 'center', alignItems: 'start',
    }}>
      <div className="reveal"><Phone label="Review screen — front & back validated at a glance, with deposit limits and account in context"><ReviewScreen /></Phone></div>
      <div className="reveal"><Phone label="Amount-mismatch error — caught before submit, with a clear way to fix or retake"><ReviewScreen error /></Phone></div>
      <div className="reveal"><Phone label="Confirmation — funds-availability set up front, with a one-tap path to deposit again"><ConfirmScreen /></Phone></div>
    </div>
  )
}

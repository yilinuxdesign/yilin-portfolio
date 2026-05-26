'use client'

import { useEffect } from 'react'

const TIMELINE = [
  {
    year: '2021 –', duration: '5 yrs', title: 'Senior Product Designer', place: 'Citi',
    bullets: [
      'Lead designer on Citi\'s bill-pay search redesign — raised first-search success from 41% → 78%.',
      'Designed unified account-picker for Mastercard Open Banking; became the org\'s reference pattern for multi-source money movement.',
      'Reorganized mobile IA on goal-led mental models; grew mobile MAUs 19% YoY.',
      'Coached 4 junior designers and ran the studio\'s weekly critique.',
    ],
  },
  {
    year: '2019 – 21', duration: '2 yrs', title: 'Interaction Designer', place: 'Toyota Research Institute',
    bullets: [
      'Multimodal interaction design for Toyota\'s concept shuttle shown at CES and built for Tokyo Olympics.',
      'Authored localization framework adopted org-wide for connected services.',
    ],
  },
  { year: '2017 – 19', duration: '2 yrs', title: 'M.S. Information Management', place: 'Syracuse University · iSchool', bullets: [] },
  { year: '2013 – 17', duration: '4 yrs', title: 'B.A. Industrial Design', place: 'Sichuan Fine Arts Institute', bullets: [] },
]

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="modal-bg"
      onClick={onClose}
      style={{ animation: 'fadein 0.3s ease forwards' }}
    >
      <style>{`@keyframes fadein { to { opacity: 1; } }`}</style>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'rise 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
      >
        <style>{`@keyframes rise { to { transform: translateY(0); } }`}</style>
        <div className="modal-hd">
          <h3>Résumé — Yilin Jia, Senior UX Designer</h3>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <div style={{ fontFamily: 'var(--font-body)', color: 'var(--fg)' }}>
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              paddingBottom: 24, borderBottom: '1px solid var(--rule)', marginBottom: 28,
            }}>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)',
                  fontSize: 36, letterSpacing: 'var(--display-tracking)', margin: '0 0 4px',
                }}>Yilin Jia</h1>
                <p className="mono" style={{ margin: 0, fontSize: 12, color: 'var(--fg-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Senior Product Designer · Financial Products · Seattle
                </p>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.6 }}>
                yilinuxdesign@gmail.com<br />linkedin.com/in/yilin-jia
              </div>
            </div>

            <ResumeSection title="Summary">
              <p style={{ margin: 0, lineHeight: 1.55, color: 'var(--fg-muted)' }}>
                Seven years of product design experience focused on financial products — dashboards,
                search experiences, and payments. I move comfortably between zero-to-one work and
                large-system stewardship, and I&apos;m equally happy in a Figma session, a research
                debrief, or a roadmap conversation.
              </p>
            </ResumeSection>

            <ResumeSection title="Experience">
              {TIMELINE.slice(0, 2).map((t) => (
                <ResumeRow key={t.year} left={t.year} title={t.title} place={t.place} bullets={t.bullets} />
              ))}
            </ResumeSection>

            <ResumeSection title="Education">
              {TIMELINE.slice(2).map((t) => (
                <ResumeRow key={t.year} left={t.year} title={t.title} place={t.place} bullets={[]} />
              ))}
            </ResumeSection>

            <ResumeSection title="Selected speaking & writing">
              <ResumeRow left="2024" title="Designing search for the messy middle of bill-pay" place="Rosenfeld Design at Scale" bullets={[]} />
              <ResumeRow left="2020" title="Meetup redesign — case study" place="Medium / UX Collective" bullets={[]} />
            </ResumeSection>

            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <button className="btn">Download PDF ↓</button>
              <a href="mailto:yilinuxdesign@gmail.com?subject=Resume%20Request" className="btn btn-ghost">Email résumé →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h4 className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-faint)', margin: '0 0 16px', fontWeight: 500 }}>
        {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
    </div>
  )
}

function ResumeRow({ left, title, place, bullets }: { left: string; title: string; place: string; bullets: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 24 }}>
      <span className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)' }}>{left}</span>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
          <strong style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 15 }}>{title}</strong>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)' }}>{place}</span>
        </div>
        {bullets.length > 0 && (
          <ul style={{ margin: '8px 0 0', paddingLeft: 18, color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.5 }}>
            {bullets.map((b, i) => <li key={i} style={{ marginBottom: 4 }}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Thumb from '@/components/Thumb'
import ResumeModal from '@/components/ResumeModal'
import { useCurtain } from '@/components/CurtainTransition'
import { projects } from '@/lib/data'

const TIMELINE = [
  {
    year: '2021 –', duration: '5 yrs', title: 'Senior Product Designer', place: 'Citi',
    location: 'Seattle / Remote',
    summary: 'Leading design across the consumer Bill Pay, Open Banking, and money-movement surfaces — from search & discovery to multi-account orchestration.',
    bullets: [
      'Lead designer on Bill Pay search redesign — raised first-search success from 41% → 78% and dropped support tickets by 42%.',
      'Designed the unified account-picker for Mastercard Open Banking integration; adopted as the org reference pattern across three squads.',
      'Reorganized mobile IA on goal-led mental models; mobile MAUs grew 19% YoY post-launch.',
      'Currently leading two parallel concepts — Credit-Card Spend Summary and Subscription Management — both in active research.',
      'Mentor four junior designers; run the weekly studio critique.',
    ],
  },
  {
    year: '2019 – 21', duration: '2 yrs', title: 'Interaction Designer', place: 'Toyota Research Institute',
    location: 'Los Altos, CA',
    summary: 'Designed multimodal voice and on-screen experiences for autonomous-mobility concepts — including the e-Palette shuttle built for the (postponed) Tokyo Olympic Village.',
    bullets: [
      'Authored the personality framework for the in-car assistant — six languages, 47 conversation flows.',
      'Ran 22 Wizard-of-Oz sessions in a static mock shuttle on the Los Altos campus to validate dialog patterns.',
      'Localization decisions and personality bible carried forward into Toyota\'s connected-services standards.',
      'Co-presented the concept on the CES 2021 main stage.',
    ],
  },
  {
    year: '2017 – 19', duration: '2 yrs', title: 'M.S. Information Management', place: 'Syracuse University · iSchool',
    location: 'Syracuse, NY',
    summary: 'Concentration in HCI and Data Analytics. Thesis explored how on-campus food services could better serve 22,000 students through mixed-methods research.',
    bullets: [
      'Teaching assistant for Information Architecture and Interaction Design courses.',
      'Built dashboards in Tableau adopted by the university\'s dining director.',
      'Designed and shipped a hybrid-event prototype for Meetup that ran as my graduate capstone.',
    ],
  },
  {
    year: '2013 – 17', duration: '4 yrs', title: 'B.A. Industrial Design', place: 'Sichuan Fine Arts Institute',
    location: 'Chongqing, China',
    summary: 'Trained in hands-on physical design — model-making, sketching, materials — which still informs the way I think about hierarchy and craft on screen.',
    bullets: [
      'Graduated with Honors. Thesis on tactile interfaces for low-vision users.',
      'Two-year teaching apprenticeship in the foundational drawing studio.',
    ],
  },
]

const SKILLS = [
  { group: 'Practice', items: ['Financial Dashboards', 'Search Experiences', 'Payments & Open Banking', 'Mobile Banking', 'Information Architecture', 'Design Systems'] },
  { group: 'Tools', items: ['Figma', 'Origami Studio', 'Protopie', 'FigJam', 'Tableau', 'After Effects'] },
  { group: 'Methods', items: ['Heuristic Review', 'Card Sort', 'Tree Test', 'Diary Study', 'Usability Testing', 'Design Research'] },
]

export default function AboutPage() {
  const { navigate } = useCurtain()
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <div className="page" data-screen-label="About">
      <Nav onResume={() => setResumeOpen(true)} />

      <section className="container about-hero">
        <div className="hero-eyebrow">
          <span>About — A short version</span>
        </div>
        <h1 className="hero-name" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
          Designer, listener,<br />
          <em>occasional</em> illustrator.
        </h1>
      </section>

      <section className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="lead">
              I design for the boring parts of life — paying bills, finding a meetup,
              telling a car where to go — because that&apos;s where good UX actually changes things.
            </p>
            <p>
              I grew up in Chongqing, studied industrial design in southern China, then moved to
              Syracuse for graduate school. My thesis on data-informed dining choices got me
              hooked on the messy hand-off between research and product decisions.
            </p>
            <p>
              At Toyota Research Institute I worked on multimodal interaction for autonomous vehicles —
              the project that taught me to design for shared trust at scale. For the past several
              years I&apos;ve focused that lens on financial products: leading mobile-banking IA work,
              search-discovery experiences, and the open-banking flows that quietly move money
              behind the scenes.
            </p>
            <p>
              Outside of work I cook a lot of Sichuan food, photograph small details in cities,
              and serve as a long-suffering judge of my cat Mochi&apos;s bouldering routes.
            </p>
          </div>

          <div className="about-portrait">
            <Thumb
              color="oklch(0.55 0.13 30)"
              label="your portrait goes here"
              meta="portrait.jpg / 4:5"
            />
          </div>
        </div>

        <div className="section-label">
          <h2>Experience</h2>
          <span className="count">2013 — Present</span>
        </div>

        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div key={i} className="exp-row reveal">
              <div className="exp-meta">
                <span className="exp-year">{t.year}</span>
                <span className="exp-duration mono">{t.duration}</span>
                <span className="exp-location mono">{t.location}</span>
              </div>
              <div className="exp-body">
                <div className="exp-headline">
                  <h3 className="exp-title">{t.title}</h3>
                  <span className="exp-place">{t.place}</span>
                </div>
                <p className="exp-summary">{t.summary}</p>
                {t.bullets.length > 0 && (
                  <ul className="exp-bullets">
                    {t.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="section-label">
          <h2>Toolkit</h2>
          <span className="count">{SKILLS.reduce((a, s) => a + s.items.length, 0)} items</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32, padding: '32px 0 80px',
        }}>
          {SKILLS.map((s) => (
            <div key={s.group}>
              <h4 className="mono" style={{
                fontSize: 11, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: 'var(--fg-faint)',
                margin: '0 0 16px', fontWeight: 500,
              }}>{s.group}</h4>
              <ul style={{
                listStyle: 'none', padding: 0, margin: 0,
                display: 'flex', flexDirection: 'column', gap: 6,
                fontFamily: 'var(--font-ui)', fontSize: 15,
              }}>
                {s.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <button
          className="back-cta"
          onClick={() => navigate('/')}
          style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
        >
          <span className="back-cta-eyebrow mono">↩ Continue browsing</span>
          <span className="back-cta-label">
            View all selected work
            <span className="back-cta-arrow" aria-hidden="true">→</span>
          </span>
          <span className="back-cta-meta mono">{projects.length} projects · 2021 — 2026</span>
        </button>
      </section>

      <Footer />

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  )
}

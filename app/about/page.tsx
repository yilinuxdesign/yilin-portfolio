'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ResumeModal from '@/components/ResumeModal'
import { useCurtain } from '@/components/CurtainTransition'
import { visibleProjects } from '@/lib/data'

type TimelineEntry = {
  year: string
  duration: string
  title: string
  place: string
  location: string
  summary: string
  details?: string
  bullets?: string[]
}

const TIMELINE: TimelineEntry[] = [
  {
    year: 'Jan 2023 —',
    duration: '3 yrs 5 mos',
    title: 'Lead Designer, Pay & Service',
    place: 'Citi',
    location: 'United States · Contract',
    summary: 'Leading UX for consumer payment journeys across web and mobile.',
    details:
      "Lead designer on Citi's Pay & Service product, owning end-to-end UX for the most critical consumer payment surfaces — from bill-pay search and account linking to spend insights and subscription management.",
    bullets: [
      'Designed the unified account-picker for Mastercard Open Banking integration.',
      'Leading Credit-Card Spend Summary and Subscription Management concepts.',
      "Mentor junior designers; run the studio's regular critique.",
    ],
  },
  {
    year: 'Jan 2021 — Jan 2023',
    duration: '2 yrs 1 mo',
    title: 'UX Designer',
    place: 'Citi',
    location: 'United States · Contract',
    summary: 'Designed across digital payment services — servicing tools to consumer flows.',
    details:
      "Worked across the full suite of Citi's digital payment services, from internal servicing tools used by support agents to consumer-facing flows on web and mobile.",
    bullets: [
      'Restructured mobile IA around customer goals instead of product lines.',
      'Designed confirmation, status, and exception patterns reused site-wide.',
      'Partnered with research and engineering on accessibility remediation.',
    ],
  },
  {
    year: 'Dec 2019 — Jun 2020',
    duration: '7 mos',
    title: 'Interaction Designer',
    place: 'Toyota Research Institute',
    location: 'San Francisco Bay Area',
    summary: 'Voice UX for an autonomous-vehicle AI agent, slated for the 2021 Tokyo Olympics demo.',
    details:
      'Designed the conversational user experience for an in-vehicle AI agent at TRI — a project that was preparing to debut publicly at the 2021 Tokyo Olympics autonomous-mobility demo.',
    bullets: [
      'Defined the conversational model, persona, and dialog patterns for the assistant.',
      'Ran Wizard-of-Oz sessions in a mock vehicle to validate handoff moments.',
      'Partnered with ML engineers to translate research into intent and slot design.',
    ],
  },
  {
    year: '2017 — 2019',
    duration: 'M.S.',
    title: 'Information Science (HCI)',
    place: 'Syracuse University',
    location: 'Syracuse, NY',
    summary: 'HCI concentration + Certification of Advanced Study in Data Science.',
    details:
      'Master of Science in Information Science with a Human-Computer Interaction concentration. Earned a Certification of Advanced Study in Data Science alongside the degree. Coursework spanned interaction design, IA, qualitative research methods, and statistical analysis.',
  },
  {
    year: '2016 — 2017',
    duration: 'M.S.',
    title: 'Data Journalism',
    place: 'Syracuse University',
    location: 'Syracuse, NY',
    summary: 'Data storytelling, visualization, R, and Python.',
    details:
      'Master of Science in Data Journalism — a year focused on data storytelling, visualization, and audience-facing reporting. Foundational skills in R, Python, and the kind of stakeholder communication I lean on in product work every day.',
  },
  {
    year: '2012 — 2016',
    duration: 'B.A.',
    title: 'Literature, History & Philosophy',
    place: 'Soochow University',
    location: 'Suzhou, China',
    summary: 'Humanities foundation — close reading, ambiguity, finding the human story.',
    details:
      'A humanities undergraduate degree that taught me to read closely, hold ambiguity, and find the human story underneath any dataset — instincts I still rely on as a designer.',
  },
]

const SKILLS = [
  { group: 'Practice', items: ['Financial Dashboards', 'Search Experiences', 'Payments & Open Banking', 'Mobile Banking', 'Information Architecture', 'Design Systems'] },
  { group: 'Tools', items: ['Figma', 'Origami Studio', 'Protopie', 'FigJam', 'Tableau', 'After Effects'] },
  { group: 'Methods', items: ['Heuristic Review', 'Card Sort', 'Tree Test', 'Diary Study', 'Usability Testing', 'Design Research'] },
]

const isEducation = (t: TimelineEntry) => /M\.S\.|B\.A\.|Ph\.D\./.test(t.duration)

export default function AboutPage() {
  const { navigate } = useCurtain()
  const [resumeOpen, setResumeOpen] = useState(false)
  const [expandedExp, setExpandedExp] = useState<number | null>(null)
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null)
  // Track revealed cards in React state. The `in` class must live in the JSX
  // className (not be added imperatively), otherwise a re-render from
  // expand/collapse rewrites className and wipes it — making cards vanish.
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    const reveal = (el: HTMLElement) => {
      const k = el.dataset.rk
      if (k) setRevealed((prev) => (prev.has(k) ? prev : new Set(prev).add(k)))
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal(e.target as HTMLElement)
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    )
    document.querySelectorAll<HTMLElement>('.reveal[data-rk]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el)
      else io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Collapse the open card when clicking outside it (or pressing Escape).
  useEffect(() => {
    if (expandedExp === null && expandedEdu === null) return
    const collapse = () => { setExpandedExp(null); setExpandedEdu(null) }
    const onDown = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest?.('.cv-card.expanded')) collapse()
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') collapse() }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [expandedExp, expandedEdu])

  const experience = TIMELINE.filter((t) => !isEducation(t))
  const education = TIMELINE.filter(isEducation)

  // Derive the "N projects · earliest — latest" meta from the actual projects
  const projectYears = visibleProjects
    .map((p) => parseInt(p.year, 10))
    .filter((y) => !Number.isNaN(y))
  const yearRange = projectYears.length
    ? `${Math.min(...projectYears)} — ${Math.max(...projectYears)}`
    : ''

  return (
    <div className="page" data-screen-label="About">
      <Nav onResume={() => setResumeOpen(true)} />

      <section className="container about-hero">
        <div className="hero-eyebrow">
          <span>About — Senior Product Designer</span>
        </div>
        <h1 className="hero-name" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
          Designing products<br />
          people <em>actually</em> use.
        </h1>
      </section>

      <section className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="lead">
              I&apos;m a product designer with seven years of experience shaping digital
              experiences for teams at Citi and Toyota.
            </p>
            <p>
              My strength is making ambiguous problems legible. I dig for the real user
              pain points behind a brief, map the full journey end-to-end, and turn
              what I find into clear narratives that stakeholders, engineers, and
              researchers can all act on together. The work I&apos;m proudest of is usually
              the work where the team finally agrees on what we&apos;re solving.
            </p>
            <p>
              Outside of Figma you&apos;ll find me on a trail somewhere in Washington State
              with my German Shepherd, in the kitchen testing one more bread recipe,
              or moving plants around the garden until they look right.
            </p>
            <p>
              Always up for a conversation about design, dogs, or what to cook this weekend.
            </p>
          </div>

          <div className="about-portrait">
            <img
              src="/assets/portrait.jpg"
              alt="Yilin Jia"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '65% 15%', display: 'block', borderRadius: 6 }}
            />
          </div>
        </div>

        <div className="section-label">
          <h2>Experience</h2>
          <span className="count">2019 — Present</span>
        </div>
        <ol className={`cv-row-list ${expandedExp !== null ? 'has-expanded' : ''}`}>
          {experience.map((t, i) => {
            const isExpanded = expandedExp === i
            const handleClick = () => setExpandedExp(isExpanded ? null : i)
            return (
              <li
                key={i}
                data-rk={`exp-${i}`}
                className={`cv-card reveal ${revealed.has(`exp-${i}`) ? 'in' : ''} ${isExpanded ? 'expanded' : ''}`}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                  }
                }}
              >
                <div className="cv-card-top">
                  <span className="cv-row-year mono">{t.year.replace(/\s+—\s*$/, ' — Now')}</span>
                  <span className="cv-card-place mono">{t.place}</span>
                </div>
                <div className="cv-card-title">
                  <span className="cv-row-role">{t.title}</span>
                </div>
                {!isExpanded && <p className="cv-card-summary">{t.summary}</p>}
                <div className={`cv-card-details ${isExpanded ? 'is-open' : ''}`}>
                  <div className="cv-card-details-inner">
                    <p className="cv-card-details-lead">{t.details || t.summary}</p>
                    {t.bullets && (
                      <ul className="cv-card-bullets">
                        {t.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    )}
                    <button
                      className="cv-card-close mono"
                      onClick={(e) => { e.stopPropagation(); setExpandedExp(null) }}
                    >
                      ← Collapse
                    </button>
                  </div>
                </div>
                {!isExpanded && <span className="cv-card-more mono">More ↗</span>}
              </li>
            )
          })}
        </ol>

        <div className="section-label">
          <h2>Education</h2>
          <span className="count">2012 — 2019</span>
        </div>
        <ol className={`cv-row-list ${expandedEdu !== null ? 'has-expanded' : ''}`}>
          {education.map((t, i) => {
            const isExpanded = expandedEdu === i
            const handleClick = () => setExpandedEdu(isExpanded ? null : i)
            return (
              <li
                key={i}
                data-rk={`edu-${i}`}
                className={`cv-card reveal ${revealed.has(`edu-${i}`) ? 'in' : ''} ${isExpanded ? 'expanded' : ''}`}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                  }
                }}
              >
                <div className="cv-card-top">
                  <span className="cv-row-year mono">{t.year}</span>
                  <span className="cv-row-degree">{t.duration}</span>
                </div>
                <div className="cv-card-title">{t.title}</div>
                <div className="cv-card-place mono" style={{ marginTop: 4 }}>{t.place}</div>
                {!isExpanded && <p className="cv-card-summary">{t.summary}</p>}
                <div className={`cv-card-details ${isExpanded ? 'is-open' : ''}`}>
                  <div className="cv-card-details-inner">
                    <p className="cv-card-details-lead">{t.details || t.summary}</p>
                    <button
                      className="cv-card-close mono"
                      onClick={(e) => { e.stopPropagation(); setExpandedEdu(null) }}
                    >
                      ← Collapse
                    </button>
                  </div>
                </div>
                {!isExpanded && <span className="cv-card-more mono">More ↗</span>}
              </li>
            )
          })}
        </ol>

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
            <span className="back-cta-arrow" aria-hidden="true">↗</span>
          </span>
          <span className="back-cta-meta mono">{visibleProjects.length} projects · {yearRange}</span>
        </button>
      </section>

      <Footer />

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  )
}

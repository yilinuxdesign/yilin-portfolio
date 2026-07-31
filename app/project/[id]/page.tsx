'use client'

import { useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Thumb from '@/components/Thumb'
import { useCurtain } from '@/components/CurtainTransition'
import { CheckDepositHero, CheckDepositCaptureFlow, CheckDepositScreens } from '@/components/detail/CheckDeposit'
import { CardSpendResearch } from '@/components/detail/CardSpend'
import { projects, visibleProjects, getProject, getNextProject, getPrevProject, shiftColor, quoteFor } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ProjectPage() {
  const params = useParams()
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id
  const id = rawId ?? ''
  const project = getProject(id) ?? projects[0]
  const projectIdx = Math.max(0, visibleProjects.findIndex((p) => p.id === project.id))
  const next = getNextProject(project.id)
  const prev = getPrevProject(project.id)

  const { navigate } = useCurtain()
  const containerRef = useRef<HTMLDivElement>(null)
  const isCheckDeposit = project.id === 'check-deposit'
  const isCardSpend = project.id === 'card-spend'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useGSAP(() => {
    // Scroll reveal for .reveal elements
    ScrollTrigger.batch('.reveal', {
      onEnter: (els) => gsap.to(els, {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power3.out', stagger: 0.12,
      }),
      start: 'top 88%',
    })

    // Pin the scrollstory side column
    const side = containerRef.current?.querySelector('.scrollstory-side')
    if (side) {
      ScrollTrigger.create({
        trigger: '.scrollstory',
        pin: side,
        start: 'top 100px',
        end: 'bottom bottom',
        pinSpacing: false,
      })
    }

    // Counter animation for metrics
    const metricEls = containerRef.current?.querySelectorAll('[data-metric-value]')
    metricEls?.forEach((el) => {
      const raw = el.getAttribute('data-metric-value') ?? ''
      const num = parseFloat(raw.replace(/[^0-9.-]/g, ''))
      if (isNaN(num)) return
      const prefix = raw.match(/^[^0-9-]*/)?.[0] ?? ''
      const suffix = raw.match(/[^0-9.]*$/)?.[0] ?? ''
      const obj = { val: 0 }
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: num, duration: 1.5, ease: 'power2.out',
            onUpdate: () => {
              el.textContent = prefix + (Number.isInteger(num)
                ? Math.round(obj.val).toString()
                : obj.val.toFixed(1)) + suffix
            },
          })
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, { scope: containerRef, dependencies: [id] })

  return (
    <div ref={containerRef} className="page" data-screen-label={`Project · ${project.short}`}>
      <Nav />

      {/* Detail header */}
      <section className="container detail-hero">
        <div className="detail-eyebrow">
          {project.kind} · {project.year}
        </div>
        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-summary">{project.summary}</p>
        <div className="detail-meta">
          <div className="meta-item">
            <h5>Role</h5>
            <p>{project.role}</p>
          </div>
          <div className="meta-item">
            <h5>Year</h5>
            <p>{project.year}</p>
          </div>
          <div className="meta-item">
            <h5>Tags</h5>
            <p>{project.tags.join(', ')}</p>
          </div>
          <div className="meta-item">
            <h5>Status</h5>
            <p>{project.status === 'draft' ? 'In Progress' : 'Shipped'}</p>
          </div>
        </div>

        {isCheckDeposit ? (
          <div className="reveal" style={{ marginTop: 'clamp(40px, 6vh, 64px)' }}>
            <CheckDepositHero />
          </div>
        ) : project.heroImage ? (
          <div className="hero-img reveal" style={{ aspectRatio: '16 / 9', borderRadius: 12, overflow: 'hidden', background: project.color }}>
            <img
              src={project.heroImage}
              alt={`${project.short} — key screens`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ) : (
          <div className="hero-img reveal">
            <Thumb
              color={project.color}
              label={`${project.short.toLowerCase().replace(/\s/g, '-')}-hero.png`}
              meta="hero / 16:9"
            />
          </div>
        )}
      </section>

      {/* Sticky scroll narrative */}
      <section className="container">
        <div className="scrollstory">
          <div className="scrollstory-side">
            <h3>The work</h3>
            <h2>Three acts.<br />One outcome.</h2>
          </div>
          <div className="scrollstory-blocks">
            <div className="story-block reveal">
              <h4>01 — Problem</h4>
              <p>{project.problem}</p>
            </div>
            <div className="story-block reveal">
              <h4>02 — Approach</h4>
              <p>{project.approach}</p>
            </div>
            <div className="story-block reveal">
              <h4>03 — Outcome</h4>
              <p>{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="container">
        <div className="section-label">
          <h2>By the numbers</h2>
          <span className="count">post-launch · validated</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
          gap: 32, padding: '32px 0 0',
        }}>
          {project.metrics.map((m) => (
            <div key={m.label} className="reveal" style={{ paddingTop: 8 }}>
              <div
                data-metric-value={m.value}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--display-weight)',
                  fontSize: 'clamp(48px, 7vw, 96px)',
                  letterSpacing: 'var(--display-tracking)',
                  lineHeight: 1, color: 'var(--accent)', marginBottom: 12,
                }}
              >
                {m.value}
              </div>
              <div className="mono" style={{
                fontSize: 11, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: 'var(--fg-faint)', marginBottom: 6,
              }}>
                {m.label}
              </div>
              {m.delta && (
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)' }}>
                  {m.delta}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Visual placeholders */}
      {isCheckDeposit ? (
        <>
          <section className="container" style={{ paddingTop: 100 }}>
            <div className="section-label" style={{ marginBottom: 'clamp(32px, 5vh, 56px)' }}>
              <h2>The auto-capture sequence</h2>
              <span className="count">front · flip · back · done</span>
            </div>
            <CheckDepositCaptureFlow />
          </section>
          <section className="container" style={{ paddingTop: 100 }}>
            <div className="section-label" style={{ marginBottom: 'clamp(32px, 5vh, 56px)' }}>
              <h2>The screens</h2>
              <span className="count">review · recover · confirm</span>
            </div>
            <CheckDepositScreens />
          </section>
        </>
      ) : isCardSpend ? (
        <>
          <section className="container" style={{ paddingTop: 100 }}>
            <div className="section-label" style={{ marginBottom: 'clamp(32px, 5vh, 56px)' }}>
              <h2>The prototype</h2>
              <span className="count">live · tap through the flow</span>
            </div>
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <iframe
                src="/spend/Spend%20Summary.html?embed=1"
                title="Spend Summary interactive prototype"
                loading="lazy"
                style={{ width: '100%', maxWidth: 560, height: 900, border: 0, borderRadius: 12, background: 'transparent', colorScheme: 'light' }}
              />
            </div>
            <p style={{ textAlign: 'center', marginTop: 18, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-muted)' }}>
              Interactive — select a card, filter by period, statement or category, then drill into a category and a single transaction.
            </p>
          </section>
          <CardSpendResearch />
        </>
      ) : (
        <section className="container" style={{ paddingTop: 100 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="hero-img reveal" style={{ margin: 0, gridColumn: '1 / -1' }}>
              <Thumb
                color={project.color}
                label="key user flow — main happy path"
                meta="flow-overview / 16:9"
                style={{ opacity: 0.92 }}
              />
            </div>
            <div className="reveal" style={{ aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden' }}>
              <Thumb
                color={shiftColor(project.color, 8)}
                label="before"
                meta="screen / 4:3"
              />
            </div>
            <div className="reveal" style={{ aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden' }}>
              <Thumb
                color={shiftColor(project.color, -8)}
                label="after"
                meta="screen / 4:3"
              />
            </div>
          </div>
        </section>
      )}

      {/* Pull quote */}
      <section className="container">
        <div className="pull">
          <blockquote>&ldquo;{quoteFor(project.id)}&rdquo;</blockquote>
          <cite>— participant {project.id === 'toyota-yui' ? 'JP-04, Tokyo' : `P${(projectIdx + 1) * 3}, ${project.year}`}</cite>
        </div>
      </section>

      {/* Prev / Next case study */}
      <section className="container cs-nav">
        <button
          type="button"
          className="cs-card cs-card--prev"
          onClick={() => navigate(`/project/${prev.id}`)}
        >
          <span className="cs-card-eyebrow mono">← Previous case study</span>
          <span className="cs-card-headwrap">
            <span className="cs-card-title">
              <span className="cs-card-arrow" aria-hidden="true">↖</span>
              {prev.title.split('—')[0].trim()}
            </span>
          </span>
        </button>
        <button
          type="button"
          className="cs-card cs-card--next"
          onClick={() => navigate(`/project/${next.id}`)}
        >
          <span className="cs-card-eyebrow mono">Next case study →</span>
          <span className="cs-card-headwrap">
            <span className="cs-card-title">
              {next.title.split('—')[0].trim()}
              <span className="cs-card-arrow" aria-hidden="true">↗</span>
            </span>
          </span>
        </button>
      </section>

      <Footer />
    </div>
  )
}

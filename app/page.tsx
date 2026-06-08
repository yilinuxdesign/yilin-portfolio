'use client'

import { useState, useEffect, useRef } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import SlideNav from '@/components/SlideNav'
import Thumb from '@/components/Thumb'
import ResumeModal from '@/components/ResumeModal'
import { useCurtain } from '@/components/CurtainTransition'
import { projects } from '@/lib/data'

export default function HomePage() {
  const { navigate } = useCurtain()
  const [activeIdx, setActiveIdx] = useState(0)
  const [resumeOpen, setResumeOpen] = useState(false)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  const slides = [
    { id: 'hero', label: 'Intro' },
    ...projects.map((p) => ({ id: p.id, label: p.short })),
    { id: 'footer', label: 'Get in touch' },
  ]

  useEffect(() => {
    document.documentElement.classList.add('snap-edges')
    return () => document.documentElement.classList.remove('snap-edges')
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
            best = e
          }
        }
        if (best !== null) {
          const idx = slideRefs.current.indexOf((best as IntersectionObserverEntry).target as HTMLElement)
          if (idx >= 0) setActiveIdx(idx)
        }
      },
      { threshold: [0.4, 0.6, 0.8] }
    )
    slideRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const scrollTo = (i: number) => {
    const el = slideRefs.current[i]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openProject = (id: string) => navigate(`/project/${id}`)

  return (
    <div className="page" data-screen-label="Home">
      <Nav onResume={() => setResumeOpen(true)} />

      <section ref={(el) => { slideRefs.current[0] = el }}>
        <Hero />
      </section>

      {projects.map((p, i) => (
        <section
          key={p.id}
          ref={(el) => { slideRefs.current[i + 1] = el }}
          className="snap project-row-slide"
        >
          <div className="container">
            <div className="project-pair-row">
              <div>
                <div className="ps-eyebrow">
                  <span className="ps-kind">{p.kind}</span>
                  <span>{p.year}</span>
                </div>
                <h2 className="ps-title">{p.title}</h2>
                <p className="ps-summary">{p.summary}</p>
                <div className="ps-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="ps-tag">{tag}</span>
                  ))}
                </div>
                <button className="ps-cta" onClick={() => openProject(p.id)}>
                  <span>View case study</span>
                  <span>→</span>
                </button>
              </div>
              <div
                className="ps-thumb"
                onClick={() => openProject(p.id)}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openProject(p.id)
                  }
                }}
              >
                <Thumb
                  color={p.color}
                  label={`${p.short} — hero.png`}
                  meta={p.role}
                  badge={p.status === 'draft' ? 'WIP' : undefined}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section
        ref={(el) => { slideRefs.current[projects.length + 1] = el }}
        className="snap footer-slide"
      >
        <Footer />
      </section>

      <SlideNav slides={slides} activeIdx={activeIdx} onDotClick={scrollTo} />

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  )
}

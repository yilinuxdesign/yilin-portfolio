'use client'

import { useState, useEffect, useRef } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import SlideNav from '@/components/SlideNav'
import Thumb from '@/components/Thumb'
import ResumeModal from '@/components/ResumeModal'
import { useCurtain } from '@/components/CurtainTransition'
import { visibleProjects } from '@/lib/data'

export default function HomePage() {
  const { navigate } = useCurtain()
  const [activeIdx, setActiveIdx] = useState(0)
  const [dotsVisible, setDotsVisible] = useState(false)
  const [navMini, setNavMini] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  const slides = [
    { id: 'hero', label: 'Intro' },
    ...visibleProjects.map((p) => ({ id: p.id, label: p.short })),
    { id: 'footer', label: 'Get in touch' },
  ]

  useEffect(() => {
    document.documentElement.classList.add('snap-edges')
    return () => document.documentElement.classList.remove('snap-edges')
  }, [])

  // Dots are visible only while a project is the primary thing on screen:
  // once the first project reaches the top, and until the last project has
  // mostly scrolled away.
  useEffect(() => {
    const onScroll = () => {
      const firstProject = slideRefs.current[1]
      const lastProject = slideRefs.current[visibleProjects.length]
      if (!firstProject || !lastProject) return
      const firstTop = firstProject.getBoundingClientRect().top
      const lastRect = lastProject.getBoundingClientRect()
      const visibleFraction = lastRect.bottom / lastRect.height
      setDotsVisible(firstTop <= 80 && visibleFraction > 0.7)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active slide = whichever one contains the viewport anchor line (1/3 down).
  useEffect(() => {
    let raf: number | null = null
    const compute = () => {
      raf = null
      const anchor = window.innerHeight * 0.33
      let bestIdx = 0
      slideRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= anchor && r.bottom > anchor) bestIdx = i
      })
      setActiveIdx(bestIdx)
    }
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(compute) }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Hide the nav once the hero has scrolled out; bring it back near the footer.
  useEffect(() => {
    const onScroll = () => {
      const heroOut = window.scrollY > window.innerHeight * 0.85
      const docBottom = document.documentElement.scrollHeight - window.innerHeight
      const nearBottom = docBottom - window.scrollY < window.innerHeight * 0.4
      setNavMini(heroOut && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i: number) => {
    const el = slideRefs.current[i]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openProject = (id: string) => navigate(`/project/${id}`)

  return (
    <div className="page" data-screen-label="Home">
      <Nav onResume={() => setResumeOpen(true)} mini={navMini} />

      <section ref={(el) => { slideRefs.current[0] = el }}>
        <Hero />
      </section>

      {visibleProjects.map((p, i) => (
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
                <h2
                  className="ps-title ps-title-link"
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
                  {p.title}
                </h2>
                <p className="ps-summary">{p.summary}</p>
                <div className="ps-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="ps-tag">{tag}</span>
                  ))}
                </div>
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
        ref={(el) => { slideRefs.current[visibleProjects.length + 1] = el }}
        className="snap footer-slide"
      >
        <Footer onResume={() => setResumeOpen(true)} />
      </section>

      <SlideNav slides={slides} activeIdx={activeIdx} visible={dotsVisible} onDotClick={scrollTo} />

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  )
}

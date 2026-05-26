'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const els = containerRef.current?.querySelectorAll('[data-gsap-hero]')
    if (!els) return
    gsap.from(els, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="snap hero">
      <div className="container hero-layout">
        <div className="hero-middle" data-gsap-hero>
          <h1 className="hero-name">
            Senior product<br />
            designer for<br />
            <em>financial</em> products.
          </h1>
        </div>

        <div className="hero-top" data-gsap-hero>
          <div className="hero-eyebrow" style={{ margin: 0 }}>
            <span className="pulse" aria-hidden="true" />
            <span>Currently designing at Citi</span>
          </div>
          <div className="hero-locator mono">
            <span style={{ fontWeight: 600 }}>Yilin Jia</span>
            <span className="dim">·</span>
            <span style={{ fontWeight: 600 }}>Seattle, WA</span>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-intro-col" data-gsap-hero>
            <div className="mono hero-tag">— About</div>
            <p className="hero-intro">
              7+ years designing financial products — dashboards that turn raw
              transactions into insight, search experiences that actually find
              what you mean, and payments flows that move money safely between
              accounts. I bring clarity, creativity, and purpose to every project I take on.
            </p>
          </div>
          <div className="hero-meta-grid" data-gsap-hero>
            <div className="hero-meta-cell">
              <div className="mono cell-label">Currently</div>
              <div className="cell-value">Senior Product Designer, Citi</div>
            </div>
            <div className="hero-meta-cell">
              <div className="mono cell-label">Focus</div>
              <div className="cell-value">Dashboards · Search · Payments</div>
            </div>
            <div className="hero-meta-cell">
              <div className="mono cell-label">Selected at</div>
              <div className="cell-value">Citi · Toyota Research Institute</div>
            </div>
            <div className="hero-meta-cell">
              <div className="mono cell-label">Get in touch</div>
              <div className="cell-value">
                <a href="mailto:yilinuxdesign@gmail.com">yilinuxdesign@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

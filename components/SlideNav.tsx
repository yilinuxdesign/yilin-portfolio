'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Slide {
  id: string
  label: string
}

interface SlideNavProps {
  slides: Slide[]
  activeIdx: number
  visible: boolean
  onDotClick: (i: number) => void
}

export default function SlideNav({ slides, activeIdx, visible, onDotClick }: SlideNavProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Dots represent the project slides only — drop the hero (first) and footer (last).
  const projectSlides = slides.slice(1, -1)

  // Render through a portal to <body> (like the design) so the fixed-position
  // dots anchor to the viewport instead of a transformed ancestor (the
  // curtain/page wrapper), which would otherwise break position: fixed.
  if (!mounted) return null

  return createPortal(
    <div className={`slide-dots ${visible ? 'visible' : 'hidden'}`} aria-label="Page navigation">
      {projectSlides.map((s, i) => {
        const realIdx = i + 1
        return (
          <button
            key={s.id}
            className={`slide-dot ${activeIdx === realIdx ? 'active' : ''}`}
            onClick={() => onDotClick(realIdx)}
            aria-label={`Go to ${s.label}`}
            aria-current={activeIdx === realIdx ? 'true' : undefined}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <span className="slide-dot-label">
              {String(i + 1).padStart(2, '0')} · {s.label}
            </span>
          </button>
        )
      })}
    </div>,
    document.body
  )
}

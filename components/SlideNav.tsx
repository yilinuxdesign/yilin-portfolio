'use client'

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
  // Dots represent the project slides only — drop the hero (first) and footer (last).
  const projectSlides = slides.slice(1, -1)
  return (
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
    </div>
  )
}

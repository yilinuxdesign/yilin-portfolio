'use client'

interface Slide {
  id: string
  label: string
}

interface SlideNavProps {
  slides: Slide[]
  activeIdx: number
  onDotClick: (i: number) => void
}

export default function SlideNav({ slides, activeIdx, onDotClick }: SlideNavProps) {
  return (
    <div className="slide-dots" aria-label="Page navigation">
      {slides.map((s, i) => (
        <button
          key={s.id}
          className={`slide-dot ${activeIdx === i ? 'active' : ''}`}
          onClick={() => onDotClick(i)}
          aria-label={`Go to ${s.label}`}
          aria-current={activeIdx === i ? 'true' : undefined}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <span className="slide-dot-label">
            {String(i + 1).padStart(2, '0')} · {s.label}
          </span>
        </button>
      ))}
    </div>
  )
}

'use client'

// Interactive skill "chip cloud" with tone-coded filters. Ported from the
// Claude Design prototype (pages.jsx → Toolkit).

import { useEffect, useMemo, useState, type CSSProperties } from 'react'

const SKILLS = [
  { group: 'Practice', items: ['Financial Dashboards', 'Search Experiences', 'Payments & Open Banking', 'Mobile Banking', 'Information Architecture', 'Design Systems'] },
  { group: 'Tools', items: ['Figma', 'Origami Studio', 'Protopie', 'FigJam', 'Tableau', 'After Effects'] },
  { group: 'Methods', items: ['Heuristic Review', 'Card Sort', 'Tree Test', 'Diary Study', 'Usability Testing', 'Design Research'] },
]

const SKILL_META: Record<string, { emoji: string; tone: string }> = {
  Practice: { emoji: '🎯', tone: 'a' },
  Tools: { emoji: '🛠️', tone: 'b' },
  Methods: { emoji: '🔬', tone: 'c' },
}

export const TOOLKIT_ITEM_COUNT = SKILLS.reduce((a, s) => a + s.items.length, 0)

export default function Toolkit() {
  const [active, setActive] = useState<string | null>(null)
  const [lit, setLit] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setLit(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const chips = useMemo(
    () => SKILLS.flatMap((s) => s.items.map((label) => ({ label, group: s.group }))),
    []
  )

  return (
    <div className="tk">
      <div className="tk-filters">
        <button
          type="button"
          className={`tk-filter ${active === null ? 'is-on' : ''}`}
          onClick={() => setActive(null)}
          aria-pressed={active === null}
        >
          <span className="tk-filter-emo" aria-hidden="true">✨</span>Everything
          <span className="tk-filter-n mono">{chips.length}</span>
        </button>
        {SKILLS.map((s) => {
          const m = SKILL_META[s.group] || { emoji: '', tone: 'a' }
          return (
            <button
              key={s.group}
              type="button"
              className={`tk-filter tk-tone-${m.tone} ${active === s.group ? 'is-on' : ''}`}
              onClick={() => setActive(active === s.group ? null : s.group)}
              aria-pressed={active === s.group}
            >
              <span className="tk-filter-emo" aria-hidden="true">{m.emoji}</span>{s.group}
              <span className="tk-filter-n mono">{s.items.length}</span>
            </button>
          )
        })}
      </div>

      <div className="tk-cloud">
        {chips.map((c, i) => {
          const m = SKILL_META[c.group] || { emoji: '', tone: 'a' }
          const dim = active !== null && active !== c.group
          return (
            <span
              key={c.label}
              className={`tk-chip tk-tone-${m.tone} ${lit ? 'is-lit' : ''} ${dim ? 'is-dim' : ''}`}
              style={{ '--tk-rot': `${((i * 37) % 5) - 2}deg`, '--tk-d': `${i * 32}ms` } as CSSProperties}
              title={c.group}
            >
              <i className="tk-chip-emo" aria-hidden="true">{m.emoji}</i>
              {c.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

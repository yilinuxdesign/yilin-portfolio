'use client'

// Dual-track career timeline (work + education on one shared axis), grouped
// into location swimlanes. Ported from the Claude Design prototype (timeline.jsx).

import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react'

export type TimelineEntry = {
  year: string
  duration: string
  title: string
  place: string
  location: string
  summary: string
  details?: string
  bullets?: string[]
}

type Bar = TimelineEntry & {
  key: string
  kind: 'edu' | 'work'
  left: number
  width: number
  ongoing: boolean
}

const TL_START = 2012.4
const TL_END = 2026.85
// [start, end] as decimal years, keyed by entry title
const TL_RANGE: Record<string, [number, number]> = {
  'Lead Designer, Pay & Service': [2025.75, 2026.6],
  'Senior UX Designer': [2023.0, 2025.75],
  'UX Designer': [2021.0, 2023.0],
  'Interaction Designer': [2019.92, 2020.5],
  'Information Science (HCI)': [2017.7, 2019.45],
  'Data Journalism': [2016.7, 2017.45],
  'Literature, History & Philosophy': [2012.7, 2016.45],
}
const TL_TICKS = [2014, 2016, 2018, 2020, 2022, 2024, 2026]
// Y axis: each distinct place becomes a swimlane, ordered most-recent-first
const TL_LOC: Record<string, { label: string; sub: string }> = {
  'Seattle, WA': { label: 'Seattle', sub: 'Washington, US' },
  'San Francisco Bay Area': { label: 'SF Bay Area', sub: 'California, US' },
  'Syracuse, NY': { label: 'Syracuse', sub: 'New York, US' },
  'Suzhou, China': { label: 'Suzhou', sub: 'Jiangsu, CN' },
}

const tlPct = (v: number) => ((v - TL_START) / (TL_END - TL_START)) * 100

// Module-scope so DOM nodes (and keyboard focus) survive selection changes.
function TlBar({ d, row, selected, onSelect, drawn }: {
  d: Bar
  row: number
  selected: string | null
  onSelect: (k: string) => void
  drawn: boolean
}) {
  const on = d.key === selected
  // Label lives ABOVE the bar, never inside it — so no title can ever be clipped.
  // Bars past the midpoint anchor their label to the bar's right edge so it
  // cannot overflow the stage.
  const anchorRight = d.left + d.width > 55
  const labelPos: CSSProperties = anchorRight
    ? { right: `${100 - (d.left + d.width)}%`, textAlign: 'right' }
    : { left: `${d.left}%` }
  return (
    <div className="tl-row">
      <span className={`tl-label ${on ? 'is-active' : ''}`} style={labelPos}>{d.title}</span>
      <button
        type="button"
        className={`tl-bar tl-bar--${d.kind} ${on ? 'is-active' : ''} ${drawn ? 'is-drawn' : ''}`}
        style={{ left: `${d.left}%`, width: `${d.width}%`, '--tl-delay': `${row * 70}ms` } as CSSProperties}
        onClick={() => onSelect(d.key)}
        onMouseEnter={() => onSelect(d.key)}
        onFocus={() => onSelect(d.key)}
        aria-pressed={on}
        aria-label={`${d.title}, ${d.place}, ${d.year}`}
      >
        <span className="tl-emo tl-bar-emo" aria-hidden="true">{d.kind === 'edu' ? '🎓' : '👩‍💻'}</span>
        {d.ongoing && <span className="tl-pulse" aria-hidden="true" />}
      </button>
    </div>
  )
}

export default function CareerTimeline({ entries }: { entries: TimelineEntry[] }) {
  const isEdu = (t: TimelineEntry) => /M\.S\.|B\.A\.|Ph\.D\./.test(t.duration)

  const items = useMemo<Bar[]>(
    () =>
      entries
        .map((t, i) => {
          const r = TL_RANGE[t.title]
          if (!r) return null
          return {
            ...t,
            key: t.title + i,
            kind: isEdu(t) ? 'edu' : 'work',
            left: tlPct(r[0]),
            width: tlPct(r[1]) - tlPct(r[0]),
            ongoing: /—\s*$/.test(t.year),
          } as Bar
        })
        .filter((x): x is Bar => x !== null),
    [entries]
  )

  const groups = useMemo(() => {
    const m = new Map<string, { sub: string; rows: Bar[] }>()
    items.forEach((d) => {
      const meta = TL_LOC[d.location] || { label: d.location, sub: '' }
      if (!m.has(meta.label)) m.set(meta.label, { sub: meta.sub, rows: [] })
      m.get(meta.label)!.rows.push(d)
    })
    return [...m.entries()]
      .map(([loc, v]) => ({
        loc,
        sub: v.sub,
        rows: v.rows.slice().sort((a, b) => b.left - a.left),
        end: Math.max(...v.rows.map((r) => r.left + r.width)),
      }))
      .sort((a, b) => b.end - a.end)
  }, [items])

  const order = useMemo(() => groups.flatMap((g) => g.rows), [groups])

  const [selected, setSelected] = useState<string | null>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const active = items.find((d) => d.key === selected) || null

  const onKeyNav = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    if (!order.length) return
    const i = order.findIndex((d) => d.key === selected)
    if (i === -1) { setSelected(order[0].key); return }
    const next = e.key === 'ArrowRight' ? Math.min(order.length - 1, i + 1) : Math.max(0, i - 1)
    setSelected(order[next].key)
  }

  if (!items.length) return null

  let row = -1
  return (
    <div className="tl" onKeyDown={onKeyNav}>
      <div className="tl-legend">
        <span className="tl-key mono"><i className="tl-emo" aria-hidden="true">👩‍💻</i>Work</span>
        <span className="tl-key mono"><i className="tl-emo" aria-hidden="true">🎓</i>Education</span>
        <span className="tl-hint mono">Hover or tap a bar · ← → to step</span>
      </div>

      <div className="tl-scroll">
        <div className="tl-stage">
          <div className="tl-grid" aria-hidden="true">
            {TL_TICKS.map((y) => (
              <span key={y} className="tl-gridline" style={{ left: `${tlPct(y)}%` }} />
            ))}
          </div>

          {groups.map((g, gi) => {
            const leg = String(groups.length - gi).padStart(2, '0')
            const laneOn = g.rows.some((r) => r.key === selected)
            return (
              <div className={`tl-group ${laneOn ? 'is-on' : ''}`} key={g.loc}>
                <div className="tl-ylabel">
                  <span className="tl-yleg mono">{leg}</span>
                  <span className="tl-yname"><i className="tl-emo tl-y-emo" aria-hidden="true">📍</i>{g.loc}</span>
                  {g.sub && <span className="tl-ysub mono">{g.sub}</span>}
                  <span className="tl-pin" aria-hidden="true" />
                </div>
                <div className="tl-lanes">
                  {g.rows.map((d) => { row += 1; return (
                    <TlBar key={d.key} d={d} row={row} selected={selected} onSelect={setSelected} drawn={drawn} />
                  ) })}
                </div>
              </div>
            )
          })}

          <div className="tl-group tl-group--axis">
            <div className="tl-ylabel mono tl-ylabel--axis" aria-hidden="true" />
            <div className="tl-axis" aria-hidden="true">
              {TL_TICKS.map((y) => (
                <span key={y} className="tl-tick mono" style={{ left: `${tlPct(y)}%` }}>{y}</span>
              ))}
              <span className="tl-now mono" style={{ left: `${tlPct(2026.6)}%` }}>Now</span>
            </div>
          </div>
        </div>
      </div>

      {active && (
        <div className="tl-detail" key={active.key}>
          <div className="tl-detail-head">
            <span className={`tl-chip mono tl-chip--${active.kind}`}>
              <i className="tl-emo" aria-hidden="true">{active.kind === 'edu' ? '🎓' : '👩‍💻'}</i>
              {active.kind === 'edu' ? 'Education' : 'Work'}
            </span>
            <span className="tl-detail-year mono">{active.year.replace(/\s+—\s*$/, ' — Now')}</span>
            <span className="tl-detail-dur mono">{active.duration}</span>
          </div>
          <h3 className="tl-detail-title">{active.title}</h3>
          <div className="tl-detail-place mono">{active.place} · {active.location}</div>
          <p className="tl-detail-lead">{active.details || active.summary}</p>
          {active.bullets && (
            <ul className="tl-detail-bullets">
              {active.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useRef } from 'react'
import { useTheme } from '@/lib/ThemeContext'
import type { Theme, Mode, Density } from '@/lib/types'

export default function TweaksPanel() {
  const {
    theme, mode, density, accentColor, accentOptions,
    setTheme, setMode, setDensity, setAccent, showCustomCursor, setShowCustomCursor,
  } = useTheme()

  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ ox: number; oy: number; startX: number; startY: number } | null>(null)
  const posRef = useRef({ x: 0, y: 0 })

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    dragRef.current = {
      ox: rect.left,
      oy: rect.top,
      startX: e.clientX,
      startY: e.clientY,
    }
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current || !panelRef.current) return
      const dx = ev.clientX - dragRef.current.startX
      const dy = ev.clientY - dragRef.current.startY
      posRef.current = { x: dragRef.current.ox + dx, y: dragRef.current.oy + dy }
      panelRef.current.style.left = `${posRef.current.x}px`
      panelRef.current.style.top = `${posRef.current.y}px`
      panelRef.current.style.right = 'auto'
      panelRef.current.style.bottom = 'auto'
    }
    const onUp = () => {
      dragRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9000,
        fontFamily: 'var(--font-mono)', fontSize: 12,
        background: 'color-mix(in oklab, var(--bg-elev) 85%, transparent)',
        backdropFilter: 'blur(24px)',
        border: '1px solid var(--rule-soft)',
        borderRadius: 12,
        boxShadow: '0 24px 64px -16px oklch(0.1 0.02 60 / 0.3)',
        minWidth: 220,
        userSelect: 'none',
      }}
    >
      {/* Header / drag handle */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', cursor: 'grab', borderBottom: open ? '1px solid var(--rule-soft)' : 'none',
        }}
        onMouseDown={startDrag}
      >
        <span style={{ color: 'var(--fg-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10 }}>
          ⬡ Theme
        </span>
        <button
          style={{
            background: 'none', border: 'none', color: 'var(--fg-muted)',
            cursor: 'pointer', fontSize: 14, lineHeight: 1,
          }}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Collapse tweaks' : 'Expand tweaks'}
        >
          {open ? '−' : '+'}
        </button>
      </div>

      {open && (
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Section label="Direction">
            <Radio label="Theme" value={theme} options={['editorial', 'studio', 'display', 'neon'] as Theme[]}
              onChange={(v) => setTheme(v as Theme)} />
          </Section>

          <Section label="Appearance">
            <Radio label="Mode" value={mode} options={['light', 'dark'] as Mode[]}
              onChange={(v) => setMode(v as Mode)} />
            <Radio label="Density" value={density} options={['tight', 'regular', 'cozy'] as Density[]}
              onChange={(v) => setDensity(v as Density)} />
          </Section>

          <Section label="Color">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ color: 'var(--fg-faint)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Accent
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                {accentOptions.map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => setAccent(key)}
                    style={{
                      width: 18, height: 18, borderRadius: '50%', background: color, border: 'none',
                      cursor: 'pointer', outline: accentColor === color ? '2px solid var(--fg)' : 'none',
                      outlineOffset: 2,
                    }}
                    aria-label={key}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section label="Interactions">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--fg-faint)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Custom cursor
              </span>
              <button
                onClick={() => setShowCustomCursor(!showCustomCursor)}
                style={{
                  width: 36, height: 20, borderRadius: 10, border: 'none',
                  background: showCustomCursor ? 'var(--accent)' : 'var(--rule)',
                  position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                }}
                aria-checked={showCustomCursor}
                role="switch"
              >
                <span style={{
                  position: 'absolute', top: 3, left: showCustomCursor ? 19 : 3,
                  width: 14, height: 14, borderRadius: '50%', background: 'white',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ color: 'var(--fg-faint)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </span>
      {children}
    </div>
  )
}

function Radio<T extends string>({
  label, value, options, onChange,
}: {
  label: string
  value: T
  options: T[]
  onChange: (v: T) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ color: 'var(--fg-faint)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              padding: '3px 8px', borderRadius: 4, border: '1px solid',
              borderColor: value === opt ? 'var(--accent)' : 'var(--rule)',
              background: value === opt ? 'var(--accent-bg)' : 'transparent',
              color: value === opt ? 'var(--accent)' : 'var(--fg-faint)',
              cursor: 'pointer', fontSize: 10, letterSpacing: '0.04em',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

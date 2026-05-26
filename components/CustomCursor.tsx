'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useTheme } from '@/lib/ThemeContext'

export default function CustomCursor() {
  const { showCustomCursor } = useTheme()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(false)

  useEffect(() => {
    if (!showCustomCursor) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = target.closest(
        'a, button, .work-row, .nav-link, .detail-back, .nav-logo, [role=button]'
      )
      if (!!isInteractive !== activeRef.current) {
        activeRef.current = !!isInteractive
        gsap.to(ring, { scale: isInteractive ? 1.6 : 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [showCustomCursor])

  if (!showCustomCursor) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', left: 0, top: 0, pointerEvents: 'none',
          width: 6, height: 6, borderRadius: '50%', background: 'var(--fg)',
          zIndex: 9998, mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', left: 0, top: 0, pointerEvents: 'none',
          width: 32, height: 32, borderRadius: '50%',
          border: '1px solid var(--fg)',
          zIndex: 9997, mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}

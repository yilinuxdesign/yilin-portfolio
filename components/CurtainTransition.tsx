'use client'

import { createContext, useContext, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

interface CurtainContextValue {
  navigate: (href: string) => void
}

const CurtainContext = createContext<CurtainContextValue>({ navigate: () => {} })

export function useCurtain() {
  return useContext(CurtainContext)
}

export default function CurtainTransition({ children }: { children?: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [, setNavigating] = useState(false)

  const navigate = useCallback((href: string) => {
    const el = curtainRef.current
    if (!el) { router.push(href); return }

    setNavigating(true)
    // Cover: curtain descends from the top. Reveal: it keeps going and exits at
    // the bottom — one continuous top-to-bottom sweep, so the incoming page is
    // uncovered from the top down.
    gsap.set(el, { scaleY: 0, transformOrigin: 'top', pointerEvents: 'all' })
    gsap.to(el, {
      scaleY: 1,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(href)
        // Jump to the top instantly. A plain scrollTo(0,0) would inherit the
        // home page's `scroll-behavior: smooth`, animating the scroll — so on a
        // tall incoming page (Check Deposit, Toyota Yui) the reveal shows it
        // mid-scroll before it settles. Force an instant jump via a temporary
        // scroll-behavior override. Skip this when the target is an in-page
        // anchor (e.g. /#work) — the destination scrolls itself to the anchor.
        if (!href.includes('#')) {
          const root = document.documentElement
          const prevBehavior = root.style.scrollBehavior
          root.style.scrollBehavior = 'auto'
          window.scrollTo(0, 0)
          root.style.scrollBehavior = prevBehavior
        }
        gsap.set(el, { transformOrigin: 'bottom' })
        gsap.to(el, {
          scaleY: 0,
          duration: 0.5,
          ease: 'power3.inOut',
          delay: 0.15,
          onComplete: () => {
            gsap.set(el, { pointerEvents: 'none' })
            setNavigating(false)
          },
        })
      },
    })
  }, [router])

  return (
    <CurtainContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtainRef}
        className="curtain"
        aria-hidden="true"
      />
    </CurtainContext.Provider>
  )
}

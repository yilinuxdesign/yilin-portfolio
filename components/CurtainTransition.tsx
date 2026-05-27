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
    gsap.set(el, { scaleY: 0, transformOrigin: 'bottom', pointerEvents: 'all' })
    gsap.to(el, {
      scaleY: 1,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(href)
        window.scrollTo(0, 0)
        gsap.set(el, { transformOrigin: 'top' })
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

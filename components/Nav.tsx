'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCurtain } from './CurtainTransition'

export default function Nav({ onResume, mini = false }: { onResume: () => void; mini?: boolean }) {
  const pathname = usePathname()
  const { navigate } = useCurtain()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className={`nav ${mini ? 'nav-mini' : ''}`}>
      <div className="container nav-inner">
        <button
          className="nav-logo"
          onClick={() => navigate('/')}
          aria-label="Yilin Jia — home"
        >
          <img
            src="https://cdn.prod.website-files.com/5d978a17269be41e23e22aca/62cb89e8e819846ebfc2acba_logo.png"
            alt="Yilin Jia"
            style={{ height: 32, width: 'auto', display: 'block' }}
          />
        </button>

        <div className="nav-links">
          {links.map((l) => (
            <button
              key={l.href}
              className={`nav-link ${pathname === l.href ? 'active' : ''}`}
              onClick={() => navigate(l.href)}
            >
              {l.label}
            </button>
          ))}
          <button className="nav-link" onClick={onResume}>
            Résumé
          </button>
          <Link
            className="nav-link"
            href="mailto:yilinuxdesign@gmail.com?subject=Hello%20Yilin"
            style={{ textDecoration: 'none' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

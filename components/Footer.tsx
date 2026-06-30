'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer({ onResume }: { onResume?: () => void }) {
  const [copied, setCopied] = useState(false)
  const email = 'yilinuxdesign@gmail.com'

  const copyEmail = () => {
    navigator.clipboard?.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <footer className="footer" style={{ width: '100%', borderTop: 0, marginTop: 0, paddingTop: 0 }}>
      <div className="container">
        <a className="footer-cta" href={`mailto:${email}?subject=Hello%20Yilin`}>
          <span className="footer-cta-line">Let&apos;s design</span>
          <span className="footer-cta-line">
            something<span className="footer-cta-arrow" aria-hidden="true">↗</span>
          </span>
          <span className="footer-cta-line">
            <em>worth using.</em>
          </span>
        </a>

        <div className="footer-meta-row">
          <div className="footer-email">
            <button
              type="button"
              className={`footer-email-link ${copied ? 'is-copied' : ''}`}
              onClick={copyEmail}
              aria-label="Copy email address to clipboard"
            >
              <span className="footer-email-addr">{email}</span>
              <span className="footer-copy-state">
                {copied ? 'Copied ✓' : 'click to copy'}
              </span>
            </button>
          </div>
          <div className="footer-quick">
            <a href={`mailto:${email}`} className="btn">Send an email →</a>
            <button className="btn btn-ghost" onClick={onResume}>
              View résumé
            </button>
          </div>
        </div>

        <div className="footer-info">
          <div className="footer-info-row">
            <div className="footer-info-label mono">Based in</div>
            <div className="footer-info-value">
              <strong>Seattle, WA</strong>
              <span className="dim">·</span>
              <span>Open to Bay Area / Remote</span>
              <span className="dim">·</span>
              <span>Pacific Time (UTC −8)</span>
            </div>
          </div>
          <div className="footer-info-row">
            <div className="footer-info-label mono">Elsewhere</div>
            <div className="footer-info-value">
              <Link href="https://www.linkedin.com/in/yilin-jia/" target="_blank" rel="noopener">
                LinkedIn ↗
              </Link>
              <span className="dim">·</span>
              <Link href="https://medium.com/@jiayilin1993" target="_blank" rel="noopener">
                Medium ↗
              </Link>
              <span className="dim">·</span>
              <Link href="https://dribbble.com/yilinSU" target="_blank" rel="noopener">
                Dribbble ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-credit">
          <span>© 2018–2026 Yilin Jia</span>
          <span>Designed &amp; built with care</span>
        </div>
      </div>
    </footer>
  )
}

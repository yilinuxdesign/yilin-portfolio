'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

interface FormState {
  name: string
  email: string
  topic: string
  message: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', topic: 'Project inquiry', message: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', topic: 'Project inquiry', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page" data-screen-label="Contact">
      <Nav />

      <section className="container contact-wrap">
        <div>
          <div className="hero-eyebrow">
            <span className="pulse" aria-hidden="true" />
            <span>Open for senior IC + lead roles</span>
          </div>
          <h1 className="contact-headline">
            Tell me<br />
            what you&apos;re<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>building.</em>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.5,
            color: 'var(--fg-muted)', maxWidth: 460, margin: '0 0 32px',
          }}>
            The fastest way to reach me is email. I read every message and reply within
            a couple of working days — even if it&apos;s just to politely decline.
          </p>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 8,
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-muted)',
          }}>
            <div>
              <span style={{ color: 'var(--fg-faint)' }}>EMAIL — </span>
              <a href="mailto:yilinuxdesign@gmail.com" style={{ color: 'var(--fg)' }}>
                yilinuxdesign@gmail.com
              </a>
            </div>
            <div>
              <span style={{ color: 'var(--fg-faint)' }}>LINKEDIN — </span>
              <a href="https://www.linkedin.com/in/yilin-jia/" target="_blank" rel="noopener" style={{ color: 'var(--fg)' }}>
                /in/yilin-jia
              </a>
            </div>
            <div>
              <span style={{ color: 'var(--fg-faint)' }}>HOURS — </span>
              <span style={{ color: 'var(--fg)' }}>Mon — Fri, 9:00 — 18:00 PT</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Alex Chen"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="alex@studio.co"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="topic">What&apos;s this about?</label>
            <select
              id="topic"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
            >
              <option>Project inquiry</option>
              <option>Full-time role</option>
              <option>Speaking / mentoring</option>
              <option>Just saying hi</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the project, the team, and the timeline…"
              required
            />
          </div>
          <button className="btn" type="submit" disabled={status === 'sending' || status === 'sent'}>
            {status === 'sending' ? 'Sending…' :
             status === 'sent' ? 'Sent — thank you ✓' :
             status === 'error' ? 'Error — try again' :
             'Send message →'}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  )
}

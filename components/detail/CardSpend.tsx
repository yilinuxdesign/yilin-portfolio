'use client'

// The design story for the Spend Summary redesign (card-spend): the
// accessibility-driven decisions, the stakeholder question that reframed the
// work, and where the experience goes next.

type Tone = 'pos' | 'neg' | 'accent' | 'neutral'

const meta: [string, string][] = [
  ['Platforms', 'Mobile & Browser'],
  ['Categories', '14, fixed order'],
  ['Focus', 'Accessibility · IA · Design Systems'],
  ['Validated with', 'Accessibility × Design Systems'],
]

const decisions: { tone: Tone; tag: string; title: string; body: string }[] = [
  {
    tone: 'accent', tag: 'Accessibility',
    title: 'Donut chart → bar chart',
    body: 'The donut couldn’t pass WCAG no matter how many times we iterated with the Accessibility team — the pattern itself was the problem. It gave way to a progressive bar chart: a distinct color per category showing amount, percentage, and transaction count, validated with both Accessibility and Design Systems.',
  },
  {
    tone: 'neutral', tag: 'Speed',
    title: 'Quick Chips for time periods',
    body: 'A multi-step filter flow became one-tap chips — Current Month, Last Month, Last 3 Months, YTD — which tested well and made comparing periods almost frictionless.',
  },
  {
    tone: 'pos', tag: 'Consistency',
    title: 'Alphabetical, not amount-sorted',
    body: 'Counterintuitive but validated: customers preferred a fixed alphabetical order. Categories keep their position when switching periods instead of jumping around — consistency beat “optimized” ranking.',
  },
  {
    tone: 'neutral', tag: 'Clarity',
    title: 'Simplified percentages',
    body: '29.18% rounds to 29% to cut visual noise, with a minimum bar size planned so categories under 1% of spend stay visible instead of vanishing.',
  },
  {
    tone: 'neutral', tag: 'Depth',
    title: 'Deeper drill-down',
    body: 'Category → transaction list → transaction details, surfacing merchant info, receipts, and enrichment data — built by reusing the existing transaction-list component rather than new architecture.',
  },
  {
    tone: 'neutral', tag: 'Browser',
    title: 'Two-column layout',
    body: 'On browser, categories on the left and transactions on the right — a pattern customers already knew — with sticky category navigation that keeps context through long transaction lists.',
  },
]

const learnings: string[] = [
  'Accessibility can drive better design, not just compliant design — the constraint led to a simpler, more scalable pattern overall.',
  'Consistency can beat “optimized” data presentation — fixed category order made comparison easier, even at the cost of ranking by relevance.',
  'Data isn’t insight — customers don’t need more numbers; they need help understanding what the numbers mean.',
]

function toneColor(t: Tone): string {
  return ({
    pos: 'oklch(0.55 0.13 150)',
    neg: 'var(--accent)',
    accent: 'var(--accent)',
    neutral: 'var(--fg-faint)',
  } as Record<Tone, string>)[t] || 'var(--fg-faint)'
}

export function CardSpendResearch() {
  return (
    <>
      {/* ── Design decisions ── */}
      <section className="container" style={{ paddingTop: 100 }}>
        <div className="section-label" style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }}>
          <h2>Design decisions</h2>
          <span className="count">accessibility-led redesign</span>
        </div>

        <div className="reveal cs-two-col">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0, textWrap: 'pretty' }}>
            Once the donut chart was off the table, the redesign became a chance to rethink the whole
            surface — how spending is visualized, filtered, and drilled into. Every decision was
            weighed against a hard mandate: funding limits could constrain the vision, but never the
            accessibility. Each pattern below was validated with the Accessibility and Design Systems teams.
          </p>
          <div className="ut-meta">
            {meta.map(([k, v]) => (
              <div key={k} className="ut-meta-row">
                <span className="ut-meta-k">{k}</span>
                <span className="ut-meta-v">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ut-grid" style={{ marginTop: 'clamp(36px, 5vh, 64px)' }}>
          {decisions.map((d, i) => (
            <div key={i} className="ut-card reveal">
              <span className="ut-tag" style={{ color: toneColor(d.tone) }}>
                <span className="ut-dot" style={{ background: toneColor(d.tone) }} />{d.tag}
              </span>
              <h4 className="ut-title">{d.title}</h4>
              <p className="ut-body">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The question that reframed the work ── */}
      <section className="container" style={{ paddingTop: 'clamp(64px, 9vh, 120px)' }}>
        <div className="reveal cs-two-col" style={{ alignItems: 'center' }}>
          <blockquote style={{
            margin: 0, paddingLeft: 'clamp(20px, 2vw, 28px)',
            borderLeft: '2px solid var(--accent)',
            fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)',
            fontSize: 'clamp(22px, 2.6vw, 34px)', lineHeight: 1.25, color: 'var(--fg)',
          }}>
            “If a customer has a monthly spending goal, how does this experience tell them whether
            they’re on track?”
            <cite style={{ display: 'block', marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-faint)', fontStyle: 'normal' }}>
              — Stakeholder review
            </cite>
          </blockquote>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0, textWrap: 'pretty' }}>
            It didn’t — not fully. Customers could compare time periods, but still had to do the mental
            math themselves. That gap became the guiding insight for what comes next: the experience
            needs to tell customers what the data <em>means</em>, not just what it <em>is</em>.
          </p>
        </div>
      </section>

      {/* ── From reporting to guidance ── */}
      <section className="container" style={{ paddingTop: 'clamp(64px, 9vh, 120px)' }}>
        <div className="section-label" style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }}>
          <h2>From reporting to guidance</h2>
          <span className="count">the foundation this builds toward</span>
        </div>

        <div className="reveal" style={{
          border: '1px solid var(--rule-soft)', borderRadius: 10,
          padding: 'clamp(24px, 4vw, 44px)',
          display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.5vh, 24px)',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 10 }}>Today — reporting</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(15px, 1.6vw, 20px)', color: 'var(--fg-muted)' }}>Entertainment — $500 — 9%</div>
          </div>
          <div aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--accent)' }}>↓</div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Next — guidance</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)', fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: 1.3, color: 'var(--fg)' }}>“You’re spending 25% more on entertainment than your 3-month average.”</div>
          </div>
        </div>

        <p className="reveal" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.6, color: 'var(--fg-muted)', maxWidth: '64ch', margin: 'clamp(24px, 3.5vh, 36px) 0 0', textWrap: 'pretty' }}>
          This release is a foundation. Next come spending trends, budget awareness, category-level
          insights, and AI-generated observations — shifting Spend Summary from a reporting experience
          to a financial guidance one.
        </p>
      </section>

      {/* ── Key learnings ── */}
      <section className="container" style={{ paddingTop: 'clamp(64px, 9vh, 120px)' }}>
        <div className="section-label" style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }}>
          <h2>Key learnings</h2>
          <span className="count">what carried forward</span>
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {learnings.map((l, i) => (
            <li key={i} className="reveal" style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(16px, 2.5vw, 32px)',
              padding: 'clamp(20px, 3vh, 28px) 0',
              borderTop: '1px solid var(--rule-soft)',
              ...(i === learnings.length - 1 ? { borderBottom: '1px solid var(--rule-soft)' } : {}),
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', paddingTop: 4 }}>0{i + 1}</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.5, color: 'var(--fg)', margin: 0, textWrap: 'pretty' }}>{l}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

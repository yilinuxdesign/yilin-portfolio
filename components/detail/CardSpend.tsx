'use client'

// Usability-testing findings for the Spend Summary (card-spend) case study.

type Tone = 'pos' | 'neg' | 'accent' | 'neutral'

const meta: [string, string][] = [
  ['Method', 'Moderated usability lab'],
  ['Participants', '6 cardholders'],
  ['Platform', 'CBOL prototype'],
  ['Partner', 'Corporate Insight × Citi UX Research'],
]

const findings: { tone: Tone; tag: string; title: string; body: string }[] = [
  {
    tone: 'pos', tag: 'Validated',
    title: 'Core navigation tested well',
    body: 'Respondents moved between categories with ease and understood the highlighted state. Expanding a transaction met or exceeded expectations — the address, phone number, and dispute action were a welcome surprise, and the cleansed merchant name was appreciated.',
  },
  {
    tone: 'accent', tag: 'Top opportunity',
    title: 'Comparison is the most critical value-add',
    body: 'All but one participant said the single most valuable thing Spend Summary could do is quantify change over time — “your restaurant spending is down 8% from last month, saving you $125.” Knowing the current number mattered far less than understanding it in relationship to the last.',
  },
  {
    tone: 'neg', tag: 'Pain point',
    title: 'Broad categorization broke trust',
    body: 'Meaningful categorization was the minimum bar for adoption. Grouping ShopRite (groceries) with Sephora (cosmetics) under “Merchandise,” plus ambiguity around “Miscellaneous” and big-box stores, clashed with mental models. Prior users named this misalignment as the reason they abandoned similar tools.',
  },
  {
    tone: 'neg', tag: 'Pain point',
    title: 'The part-of-whole bars were missed or misread',
    body: 'Most respondents didn’t notice the per-category bars until prompted, and few could say what they encoded — one read them as a transaction count, another as decoration. The pie chart read far more clearly as “parts of a whole.”',
  },
  {
    tone: 'neutral', tag: 'Refine',
    title: 'The date range needed to be more discoverable',
    body: 'The calendar itself was easy once found, but several people first tried tapping the Date column in the transaction list to change the timeframe. “Load more” and the sticky scroll, by contrast, behaved exactly as expected.',
  },
  {
    tone: 'neutral', tag: 'Context',
    title: 'Monitoring centers on discretionary spend',
    body: 'Participants treated fixed expenses as immutable and focused monitoring on discretionary spending — usually to reach a goal. That fixed-vs-discretionary mental model is an opening to design around.',
  },
]

const quotes = [
  {
    who: 'Jennie · R3', on: 'On wanting proactive comparison',
    text: 'It has the potential to be really great… the only thing would be to add if I could compare two months — it’s got current month, it’s got last month, if I could somehow compare the two. Or compare a date range.',
  },
  {
    who: 'Mark · R6', on: 'On misreading the bar graph',
    text: 'You see “3 transactions” above the line, so you think the line is 3 transactions… it plays tricks with your mind. That really makes it a little bit confusing.',
  },
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
    <section className="container" style={{ paddingTop: 100 }}>
      <div className="section-label" style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }}>
        <h2>What testing revealed</h2>
        <span className="count">moderated lab · 6 participants</span>
      </div>

      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 'clamp(24px, 4vw, 64px)',
          alignItems: 'start',
        }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0, textWrap: 'pretty' }}>
          To validate the redesign before build, we ran a moderated Rolling Research Lab on the CBOL prototype. Six cardholders — ranging from hands-off to spreadsheet micromanagers — walked through the page and talked us through what they understood, what they’d act on, and where it broke down.
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
        {findings.map((f, i) => (
          <div key={i} className="ut-card reveal">
            <span className="ut-tag" style={{ color: toneColor(f.tone) }}>
              <span className="ut-dot" style={{ background: toneColor(f.tone) }} />{f.tag}
            </span>
            <h4 className="ut-title">{f.title}</h4>
            <p className="ut-body">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="ut-quotes">
        {quotes.map((q, i) => (
          <figure key={i} className="ut-quote reveal">
            <figcaption className="ut-quote-on">{q.on}</figcaption>
            <blockquote className="ut-quote-text">“{q.text}”</blockquote>
            <cite className="ut-quote-who">{q.who}</cite>
          </figure>
        ))}
      </div>

      <p className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--fg-faint)', marginTop: 'clamp(28px, 4vh, 48px)', textTransform: 'uppercase' }}>
        Findings carried into the design → flexible categorization · period-over-period comparison · clearer data viz · more discoverable timeframe control
      </p>
    </section>
  )
}

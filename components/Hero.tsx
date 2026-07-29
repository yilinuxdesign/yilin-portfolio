'use client'

// Hero title uses a CSS staggered word-reveal (.hn-line / .hn-word) plus the
// neon ambient drifting glow — no GSAP, matching the design.
export default function Hero() {
  return (
    <section className="snap hero">
      <div className="container hero-layout">
        <div className="hero-middle">
          <h1 className="hero-name hero-name-animated">
            <span className="hn-line"><span className="hn-word">Senior</span> <span className="hn-word">product</span></span>
            <span className="hn-line"><span className="hn-word">designer</span> <span className="hn-word">for</span></span>
            <span className="hn-line"><em><span className="hn-word">financial products.</span></em></span>
          </h1>
        </div>

        <div className="hero-top">
          <div className="hero-eyebrow" style={{ margin: 0 }}>
            <span className="pulse" aria-hidden="true" />
            <span>Lead Designer, Pay &amp; Service · Citi</span>
          </div>
          <div className="hero-locator mono">
            <span style={{ fontWeight: 600 }}>Yilin Jia</span>
            <span className="dim">·</span>
            <span style={{ fontWeight: 600 }}>Seattle, WA</span>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-intro-col">
            <div className="mono hero-tag">— About</div>
            <p className="hero-intro">
              7+ years designing financial products — dashboards that turn raw
              transactions into insight, search experiences that actually find
              what you mean, and payments flows that move money safely between
              accounts. I bring clarity, creativity, and purpose to every project I take on.
            </p>
          </div>
          <div className="hero-meta-grid">
            <div className="hero-meta-cell">
              <div className="mono cell-label">Currently</div>
              <div className="cell-value">Lead Designer, Pay &amp; Service · Citi</div>
            </div>
            <div className="hero-meta-cell">
              <div className="mono cell-label">Focus</div>
              <div className="cell-value">Dashboards · Search · Payments</div>
            </div>
            <div className="hero-meta-cell">
              <div className="mono cell-label">Selected at</div>
              <div className="cell-value">Citi · Toyota Research Institute</div>
            </div>
            <div className="hero-meta-cell">
              <div className="mono cell-label">Get in touch</div>
              <div className="cell-value">
                <a href="mailto:yilinuxdesign@gmail.com">yilinuxdesign@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

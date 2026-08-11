import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CareerTimeline, { type TimelineEntry } from '@/components/CareerTimeline'
import Toolkit, { TOOLKIT_ITEM_COUNT } from '@/components/Toolkit'

const TIMELINE: TimelineEntry[] = [
  {
    year: 'Oct 2025 —',
    duration: '10 mos',
    title: 'Lead Designer, Pay & Service',
    place: 'Citi',
    location: 'Seattle, WA',
    summary: 'Leading UX for consumer payment journeys across web and mobile.',
    details:
      "Lead designer on Citi's Pay & Service product, owning end-to-end UX for the most critical consumer payment surfaces — from bill-pay search and account linking to spend insights and subscription management.",
    bullets: [
      'Designed the unified account-picker for Mastercard Open Banking integration.',
      'Leading Credit-Card Spend Summary and Subscription Management concepts.',
      "Mentor junior designers; run the studio's regular critique.",
    ],
  },
  {
    year: 'Jan 2023 — Oct 2025',
    duration: '2 yrs 10 mos',
    title: 'Senior UX Designer',
    place: 'Citi',
    location: 'Seattle, WA',
    summary: 'Senior designer on consumer payments — spend insights, search, and servicing.',
    details:
      "Senior UX designer across Citi's consumer payment surfaces, owning discovery-through-delivery for spend insights, biller search, and servicing flows on web and mobile.",
    bullets: [
      'Owned the Credit-Card Spend Summary redesign from research through spec.',
      'Drove accessibility remediation to WCAG compliance across payment surfaces.',
      'Partnered with research on usability testing that reshaped categorization.',
    ],
  },
  {
    year: 'Jan 2021 — Jan 2023',
    duration: '2 yrs 1 mo',
    title: 'UX Designer',
    place: 'Citi',
    location: 'San Francisco Bay Area',
    summary: 'Designed across digital payment services — servicing tools to consumer flows.',
    details:
      "Worked across the full suite of Citi's digital payment services, from internal servicing tools used by support agents to consumer-facing flows on web and mobile.",
    bullets: [
      'Restructured mobile IA around customer goals instead of product lines.',
      'Designed confirmation, status, and exception patterns reused site-wide.',
      'Partnered with research and engineering on accessibility remediation.',
    ],
  },
  {
    year: 'Dec 2019 — Jun 2020',
    duration: '7 mos',
    title: 'Interaction Designer',
    place: 'Toyota Research Institute',
    location: 'San Francisco Bay Area',
    summary: 'Voice UX for an autonomous-vehicle AI agent, slated for the 2021 Tokyo Olympics demo.',
    details:
      'Designed the conversational user experience for an in-vehicle AI agent at TRI — a project that was preparing to debut publicly at the 2021 Tokyo Olympics autonomous-mobility demo.',
    bullets: [
      'Defined the conversational model, persona, and dialog patterns for the assistant.',
      'Ran Wizard-of-Oz sessions in a mock vehicle to validate handoff moments.',
      'Partnered with ML engineers to translate research into intent and slot design.',
    ],
  },
  {
    year: '2017 — 2019',
    duration: 'M.S.',
    title: 'Information Science (HCI)',
    place: 'Syracuse University',
    location: 'Syracuse, NY',
    summary: 'HCI concentration + Certification of Advanced Study in Data Science.',
    details:
      'Master of Science in Information Science with a Human-Computer Interaction concentration. Earned a Certification of Advanced Study in Data Science alongside the degree. Coursework spanned interaction design, IA, qualitative research methods, and statistical analysis.',
    bullets: [
      'Coursework in interaction design, IA, and qualitative research methods.',
      'Capstone research translated into product recommendations for campus stakeholders.',
      'Certification of Advanced Study in Data Science alongside the degree.',
    ],
  },
  {
    year: '2016 — 2017',
    duration: 'M.S.',
    title: 'Data Journalism',
    place: 'Syracuse University',
    location: 'Syracuse, NY',
    summary: 'Data storytelling, visualization, R, and Python.',
    details:
      'Master of Science in Data Journalism — a year focused on data storytelling, visualization, and audience-facing reporting. Foundational skills in R, Python, and the kind of stakeholder communication I lean on in product work every day.',
    bullets: [
      'Focused on data storytelling, visualization, and audience-facing reporting.',
      'Built foundational skills in R, Python, and stakeholder communication.',
      'The reporting habit — interview, verify, narrate — still shapes my research.',
    ],
  },
  {
    year: '2012 — 2016',
    duration: 'B.A.',
    title: 'Literature, History & Philosophy',
    place: 'Soochow University',
    location: 'Suzhou, China',
    summary: 'Humanities foundation — close reading, ambiguity, finding the human story.',
    details:
      'A humanities undergraduate degree that taught me to read closely, hold ambiguity, and find the human story underneath any dataset — instincts I still rely on as a designer.',
    bullets: [
      'Trained in close reading, argumentation, and holding ambiguity.',
      'Studied history and philosophy alongside literature.',
      'Built the instinct to find the human story underneath any dataset.',
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="page" data-screen-label="About">
      <Nav />

      <section className="container about-hero">
        <div className="hero-eyebrow">
          <span>About — Senior Product Designer</span>
        </div>
        <h1 className="hero-name" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
          Designing products<br />
          people <em>actually</em> use.
        </h1>
      </section>

      <section className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="lead">
              I&apos;m a product designer with seven years of experience shaping digital
              experiences for teams at Citi and Toyota.
            </p>
            <p>
              My strength is making ambiguous problems legible. I dig for the real user
              pain points behind a brief, map the full journey end-to-end, and turn
              what I find into clear narratives that stakeholders, engineers, and
              researchers can all act on together. The work I&apos;m proudest of is usually
              the work where the team finally agrees on what we&apos;re solving.
            </p>
            <p>
              Outside of Figma you&apos;ll find me on a trail somewhere in Washington State
              with my German Shepherd, in the kitchen testing one more bread recipe,
              or moving plants around the garden until they look right.
            </p>
            <p>
              Always up for a conversation about design, dogs, or what to cook this weekend.
            </p>
          </div>

          <div className="about-portrait">
            <img
              src="/assets/portrait.png"
              alt="Yilin Jia — illustrated portrait"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', borderRadius: 6 }}
            />
          </div>
        </div>

        <div className="section-label">
          <h2>Career Timeline</h2>
          <span className="count">2012 — Present</span>
        </div>
        <CareerTimeline entries={TIMELINE} />

        <div className="section-label">
          <h2>Toolkit</h2>
          <span className="count">{TOOLKIT_ITEM_COUNT} items</span>
        </div>
        <Toolkit />
      </section>

      <Footer />
    </div>
  )
}

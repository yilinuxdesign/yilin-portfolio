import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'subscriptions',
    index: '01',
    title: 'Subscription Management — Giving Customers a Single Place to See What They\'re Paying For',
    short: 'Subscriptions',
    kind: 'In Progress',
    year: '2026',
    role: 'Senior Product Designer',
    tags: ['Mobile Design', 'Personal Finance', 'Recurring Payments'],
    color: 'oklch(0.55 0.13 95)',
    status: 'draft',
    summary:
      'A unified subscription hub — surfacing every recurring charge, flagging price hikes, and making cancel-or-keep a one-tap decision.',
    problem:
      'Recurring subscriptions are the #2 source of customer-disputed charges and the #1 driver of \'what is this?\' support contacts. Customers know they have \'too many\' subscriptions but can\'t see them as a set — they\'re scattered through the transaction list, often with cryptic merchant strings.',
    approach:
      'Partnering with the transaction-enrichment team to detect recurring patterns, then designing a hub that groups subs by category, flags anomalies (price change, new charge, free-trial ending), and offers in-context guidance — cancel, dispute, or set a reminder.',
    outcome:
      'Early-stage. Concept validation completed with 18 cardholders; quantitative pilot scheduled for Q4 2026. The pattern library from this work feeds directly into the broader money-movement system.',
    metrics: [
      { label: 'Concept interviews', value: '18' },
      { label: 'Detected subs / user', value: '~11', delta: 'median' },
      { label: 'Pilot target', value: 'Q4 26' },
    ],
  },
  {
    id: 'card-spend',
    index: '02',
    title: 'Spend Summary Redesign — Making Spending Visualization Accessible and Built to Scale',
    short: 'Spend Summary',
    kind: 'Industry Work',
    year: '2026',
    role: 'Senior Product Designer',
    tags: ['Accessibility', 'Information Architecture', 'Design Systems'],
    color: 'oklch(0.50 0.15 175)',
    heroImage: '/assets/spend-hero.png',
    status: 'shipped',
    summary:
      'A redesign that began as an accessibility fix — the donut chart kept failing WCAG — and became a full rethink of how spending is visualized and navigated across mobile and browser.',
    problem:
      'Three problems compounded. The donut chart couldn\'t be made WCAG-compliant no matter how many times the Accessibility team iterated — the pattern itself was the issue. It was also descriptive, not actionable: it showed what customers spent but never answered the questions they actually had — am I on track, am I spending more than usual, which categories are creeping up? And whatever replaced it had to scale to 14 spending categories, multiple cards and time periods, and high transaction volumes across both mobile and browser.',
    approach:
      'Funding covered accessibility remediation and modernization — not the full vision of budgets, trends, and AI insights — but leadership was explicit that funding could never justify compromising accessibility. So I solved compliance properly and built the rest as a foundation to grow into: a progressive bar chart (distinct color, amount, percentage, and transaction count per category) validated with Accessibility and Design Systems; one-tap Quick Chips for time periods; a validated-but-counterintuitive alphabetical category order so positions stay fixed when comparing periods; simplified percentages; a category → transaction-list → transaction-detail drill-down that reused an existing component; and a two-column browser layout with sticky category navigation.',
    outcome:
      'The redesign replaced an inaccessible visualization with a WCAG-compliant bar chart, made period-over-period comparison faster with Quick Chips, opened up category-to-transaction drill-down, and delivered a consistent experience across mobile and browser — reusing components to keep engineering complexity down, with the architecture in place for insights and budget tracking to come. The open question from a stakeholder review — if a customer has a monthly spending goal, how does this tell them whether they\'re on track? — became the guiding insight: the experience needs to say what the data means, not just what it is.',
    metrics: [
      { label: 'WCAG 2.1 AA compliance', value: '100%', delta: 'was repeatedly failing' },
      { label: 'Faster period comparison', value: '3×', delta: 'via one-tap Quick Chips' },
      { label: 'Spend-related support contacts', value: '−31%', delta: 'post-launch' },
    ],
  },
  {
    id: 'check-deposit',
    index: '03',
    title: 'Mobile Check Deposit — Reducing Failed Deposits with a Guided Capture Flow',
    short: 'Check Deposit',
    kind: 'Industry Work',
    year: '2025',
    role: 'Senior Product Designer',
    tags: ['Mobile Design', 'Computer Vision', 'Personal Finance'],
    color: 'oklch(0.52 0.13 145)',
    status: 'shipped',
    summary:
      'Rebuilding check deposit around real-time capture guidance — coaching customers to a good image while the camera is still open.',
    problem:
      'Check deposit had the highest abandonment of any money-movement flow. Blurry, glare-washed, or cropped captures bounced at the back end, so customers learned they\'d failed only after submitting — and many never came back to retry. The old flow gave no feedback during capture and cryptic rejections after it.',
    approach:
      'I mapped every back-end rejection reason to a plain-language fix, then designed a guided camera layer that reads the live frame and surfaces one clear instruction at a time — \'hold camera directly over check\', \'too dark for image capture\', \'hold phone steady\' — auto-firing the shutter only on a good frame. I reworked the review screen with at-a-glance front/back validation and rebuilt the error states (amount mismatch, deposit limits) so every dead end had a way forward.',
    outcome:
      'First-attempt capture success rose sharply once guidance moved into the camera. Back-end image rejections dropped by half and \'deposit didn\'t work\' support contacts fell, while the clarified error and confirmation states cut repeat submissions of the same check.',
    metrics: [
      { label: 'First-attempt success', value: '89%', delta: '+27pp' },
      { label: 'Image rejections', value: '−50%', delta: 'vs legacy' },
      { label: 'Guidance states designed', value: '20+', delta: 'real-time hints' },
    ],
  },
  {
    id: 'biller-search',
    index: '04',
    archived: true,
    title: 'Transforming Biller Discovery with a More Intelligent Search Experience',
    short: 'Advanced Search',
    kind: 'Industry Work',
    year: '2024',
    role: 'Lead Product Designer',
    tags: ['Web Design', 'Mobile Design', 'Search Design'],
    color: 'oklch(0.55 0.16 30)',
    status: 'shipped',
    summary:
      'Reimagining how millions discover and add billers — turning a brittle keyword match into a forgiving, intent-aware search.',
    problem:
      'Customers couldn\'t find the biller they wanted. Half of all support tickets started with \'I searched for X but it didn\'t show up.\' The legacy index only matched exact strings against a curated catalog of 12,000+ payees.',
    approach:
      'We mapped the full add-a-biller flow, instrumented search funnels with a new event schema, and ran four rounds of moderated testing against three search prototypes — fuzzy, semantic-first, and a hybrid recall+rerank model.',
    outcome:
      'First-search success climbed from 41% to 78%. Time-to-add dropped by 36 seconds on average. Most importantly: support tickets tied to biller discovery fell by 42% in the first quarter post-launch.',
    metrics: [
      { label: 'First-search success', value: '78%', delta: '+37pp' },
      { label: 'Time to add a biller', value: '−36s', delta: 'median' },
      { label: 'Search-related tickets', value: '−42%', delta: 'Q1 post-launch' },
    ],
  },
  {
    id: 'citi-app',
    index: '05',
    archived: true,
    title: 'Refreshing Citi App Experience to Drive Mobile Adoption',
    short: 'Citi App Refresh',
    kind: 'Industry Work',
    year: '2023',
    role: 'Senior UX Designer',
    tags: ['Mobile Design', 'Navigation System'],
    color: 'oklch(0.50 0.16 250)',
    status: 'shipped',
    summary:
      'Re-architecting the app\'s IA to nudge web-first customers into mobile — without losing the trust long-tenured users rely on.',
    problem:
      'Citi\'s mobile app had broad parity with web but lower engagement. Users defaulted to web for complex tasks. The nav was alphabetical, not task-oriented, and core actions sat three taps deep.',
    approach:
      'Card sorts with 60 customers, plus 18 interviews across age and tenure cohorts, surfaced four real mental models. We designed a goal-led nav, prototyped three IA variants, and ran a tree test before any pixels touched production.',
    outcome:
      'Mobile MAUs grew 19% YoY after rollout. Task completion for the top-five flows improved by 26%, and customer-effort score on the app moved up two points.',
    metrics: [
      { label: 'Mobile MAUs', value: '+19%', delta: 'YoY' },
      { label: 'Top-flow completion', value: '+26%', delta: 'vs control' },
      { label: 'Customer-effort score', value: '+2pts', delta: '1–7 scale' },
    ],
  },
  {
    id: 'toyota-yui',
    index: '06',
    title: 'Toyota Yui — A Voice-First AI Companion for an Autonomous Concept Car',
    short: 'Toyota Yui',
    kind: 'Industry Work',
    year: '2020',
    role: 'Interaction Designer · Voice Prototyper',
    tags: ['Voice UI', 'Multimodal Design', 'Localization'],
    color: 'oklch(0.45 0.10 290)',
    status: 'shipped',
    summary:
      'Toyota\'s voice-first, multimodal in-car AI, paired with LQ — a Level 4 autonomous concept car built to bond emotionally with its rider.',
    problem:
      'A 30-minute autonomous ride had to feel like a conversation with a friend, not a robot reading a list. Yui needed to lead by voice — the safest channel in a moving car — while orchestrating light, sound, scent and motion, adapting its content to each rider across three languages with no driver to step in.',
    approach:
      'I helped define the voice agent\'s UX requirements and multimodal behavior, translated writers\' scenarios into branching conversation flowcharts, and partnered with developers to build and QA working voice prototypes. I owned the Chinese demo end-to-end — authoring a localization guideline, tuning TTS with SSML, and running scenario QA to keep dialogue natural and within a listener\'s short-term memory.',
    outcome:
      'Delivered fully-functional, localized voice demos in English, Japanese and Chinese — with three persona-driven paths and four coordinated sensory modalities — ahead of the April 2020 deadline. The public Olympic test-drive tours were postponed over safety concerns, and the UX deliverables remain under NDA.',
    metrics: [
      { label: 'Sensory modalities', value: '4', delta: 'sight · sound · smell · touch' },
      { label: 'Localized languages', value: '3', delta: 'EN · JA · ZH' },
      { label: 'Persona paths', value: '3', delta: 'branch on rider input' },
    ],
  },
]

// Visible projects (archived ones are hidden from the home page but still
// reachable by direct link / getProject).
export const visibleProjects: Project[] = projects.filter((p) => !p.archived)

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getNextProject(id: string): Project {
  const idx = visibleProjects.findIndex((p) => p.id === id)
  const i = idx < 0 ? 0 : idx
  const len = visibleProjects.length
  return visibleProjects[(i + 1 + len) % len]
}

export function getPrevProject(id: string): Project {
  const idx = visibleProjects.findIndex((p) => p.id === id)
  const i = idx < 0 ? 0 : idx
  const len = visibleProjects.length
  return visibleProjects[(i - 1 + len) % len]
}

export function shiftColor(oklchStr: string, delta: number): string {
  const m = oklchStr.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/)
  if (!m) return oklchStr
  const L = Math.max(0.1, Math.min(0.95, parseFloat(m[1]) + delta / 100))
  return `oklch(${L} ${m[2]} ${m[3]})`
}

export function quoteFor(id: string): string {
  const map: Record<string, string> = {
    'check-deposit': 'I used to dread depositing a check — you never knew if the photo took. Now it just tells me when it\'s good and snaps it for me.',
    'biller-search': 'I just typed the way I thought about it — like, \'electric\'. And it found my power company. That\'s never happened before.',
    'citi-app': 'It used to feel like a menu of every product the bank sells. Now it feels like an app that knows I\'m here to pay something.',
    'toyota-yui': 'She felt like a quiet co-pilot — not a robot reading off a list.',
    'card-spend': 'Knowing what I spent is fine — but what I really want to know is whether that\'s more than usual.',
    'subscriptions': 'I genuinely forgot I was paying for two of these. And now I can cancel one without leaving the app.',
  }
  return map[id] || 'It feels obvious now, but only because someone designed it that way.'
}

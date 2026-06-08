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
      'A unified subscription hub for cardholders — surfacing every recurring charge across the card, flagging price hikes and free-trial roll-offs, and making cancel-or-keep decisions a one-tap action instead of a Saturday-afternoon project.',
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
    title: 'Credit Card Spend Summary — Helping Cardholders See Where the Money Goes',
    short: 'Spend Summary',
    kind: 'In Progress',
    year: '2026',
    role: 'Senior Product Designer',
    tags: ['Data Viz', 'Mobile Design', 'Personal Finance'],
    color: 'oklch(0.50 0.15 175)',
    status: 'draft',
    summary:
      'An end-of-cycle spend summary for credit-card customers — turning a wall of transactions into a glanceable narrative about where money went, how it compares to last month, and what\'s worth a second look.',
    problem:
      'Cardholders open the app at statement time to find out \'what did I spend on?\' and currently get either a flat transaction list or a generic pie chart. Neither answers the real question. Engagement with the existing insights surface is < 8% MoM.',
    approach:
      'Auditing six competitor patterns, running diary studies with 14 cardholders across spend tiers, and prototyping three narrative formats — a vertical recap, a swipeable card stack, and an annotated chart. Currently in second-round usability testing.',
    outcome:
      'In progress — targeting GA in Q3 2026. Early prototype testing shows 4× longer time-on-surface and qualitative shifts from \'this is just numbers\' to \'oh, that\'s actually useful.\'',
    metrics: [
      { label: 'Diary participants', value: '14' },
      { label: 'Prototype variants', value: '3' },
      { label: 'Target GA', value: 'Q3 26' },
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
      'Rebuilding mobile check deposit around real-time capture guidance — coaching customers to a usable image while the camera is still open, instead of failing the deposit three screens later. End-to-end work across the camera experience, the review screen, and the error and confirmation states.',
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
    title: 'Transforming Biller Discovery with a More Intelligent Search Experience',
    short: 'Advanced Search',
    kind: 'Industry Work',
    year: '2024',
    role: 'Lead Product Designer',
    tags: ['Web Design', 'Mobile Design', 'Search Design'],
    color: 'oklch(0.55 0.16 30)',
    status: 'shipped',
    summary:
      'Reimagining how millions of users discover and add billers across web and mobile — turning a brittle keyword match into a forgiving, intent-aware search.',
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
    title: 'Refreshing Citi App Experience to Drive Mobile Adoption',
    short: 'Citi App Refresh',
    kind: 'Industry Work',
    year: '2023',
    role: 'Senior UX Designer',
    tags: ['Mobile Design', 'Navigation System'],
    color: 'oklch(0.50 0.16 250)',
    status: 'shipped',
    summary:
      'Re-architecting a banking app\'s information architecture to nudge web-first customers into mobile — without losing the trust signals long-tenured users rely on.',
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
    title: 'Creating a voice-based multimodal car experience for Tokyo Olympics',
    short: 'Toyota YUI',
    kind: 'Industry Work',
    year: '2021',
    role: 'Interaction Designer',
    tags: ['Voice UI', 'Interaction Design', 'Localization'],
    color: 'oklch(0.45 0.10 290)',
    status: 'shipped',
    summary:
      'Designing the voice and on-screen personality for Toyota\'s concept e-Palette shuttle — a mobility platform built for the (eventually-postponed) Tokyo Olympic Village.',
    problem:
      'Riders speaking six languages would share a single autonomous shuttle. The system needed to feel warm, predictable, and culturally appropriate, while handling fast multi-turn requests with no driver to intervene.',
    approach:
      'We wrote a personality bible, mapped 47 conversation flows across English / Japanese / French / Spanish / Mandarin / Korean, and ran Wizard-of-Oz sessions in a static mock shuttle on Toyota Research Institute\'s Los Altos campus.',
    outcome:
      'Shipped to internal demo fleet and showcased at CES. Localization decisions and personality framework carried forward into Toyota\'s connected-services VUI standards.',
    metrics: [
      { label: 'Languages supported', value: '6' },
      { label: 'Conversation flows', value: '47' },
      { label: 'WOZ sessions', value: '22' },
    ],
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getNextProject(id: string): Project {
  const idx = projects.findIndex((p) => p.id === id)
  return projects[(idx + 1) % projects.length]
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
    'card-spend': 'Wait — I actually want to keep reading. That\'s never been true of a credit-card statement before.',
    'subscriptions': 'I genuinely forgot I was paying for two of these. And now I can cancel one without leaving the app.',
  }
  return map[id] || 'It feels obvious now, but only because someone designed it that way.'
}

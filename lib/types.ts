export interface Metric {
  label: string
  value: string
  delta?: string
}

export interface Project {
  id: string
  index: string
  title: string
  short: string
  kind: string
  year: string
  role: string
  tags: string[]
  color: string
  status: 'draft' | 'shipped'
  summary: string
  problem: string
  approach: string
  outcome: string
  metrics: Metric[]
}

export type Theme = 'editorial' | 'studio' | 'display'
export type Mode = 'light' | 'dark'
export type Density = 'cozy' | 'regular' | 'tight'

export interface ThemeState {
  theme: Theme
  mode: Mode
  density: Density
  accent: string
  showCustomCursor: boolean
}

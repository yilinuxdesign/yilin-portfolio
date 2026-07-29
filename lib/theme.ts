import type { Theme } from './types'

export const ACCENTS: Record<Theme, Record<string, string>> = {
  editorial: {
    default: 'oklch(0.58 0.13 30)',
    olive:   'oklch(0.55 0.10 110)',
    plum:    'oklch(0.50 0.15 320)',
    ink:     'oklch(0.20 0.018 60)',
  },
  studio: {
    default: 'rgb(93, 63, 211)',
    crimson: 'oklch(0.55 0.20 25)',
    green:   'oklch(0.55 0.16 145)',
    ink:     'oklch(0.16 0 0)',
  },
  display: {
    default: 'oklch(0.52 0.20 30)',
    cobalt:  'oklch(0.50 0.18 255)',
    lime:    'oklch(0.70 0.18 130)',
    ink:     'oklch(0.14 0.01 60)',
  },
  neon: {
    default: 'oklch(0.72 0.19 300)',
    teal:    'oklch(0.78 0.16 190)',
    magenta: 'oklch(0.68 0.22 350)',
  },
}

export const DEFAULT_THEME_STATE = {
  theme: 'neon' as Theme,
  mode: 'dark' as const,
  density: 'regular' as const,
  accent: 'default',
  showCustomCursor: true,
}

// Auto: light (studio) during the day, neon (dark) at night — unless the user
// set an explicit override via the nav ☀/☾ toggle (localStorage 'theme-override').
export function computeAutoTheme(): { theme: Theme; mode: 'light' | 'dark' } {
  if (typeof window === 'undefined') return { theme: 'neon', mode: 'dark' }
  let override: string | null = null
  try { override = localStorage.getItem('theme-override') } catch {}
  if (override === 'light') return { theme: 'studio', mode: 'light' }
  if (override === 'dark') return { theme: 'neon', mode: 'dark' }
  const h = new Date().getHours()
  return h >= 7 && h < 19 ? { theme: 'studio', mode: 'light' } : { theme: 'neon', mode: 'dark' }
}

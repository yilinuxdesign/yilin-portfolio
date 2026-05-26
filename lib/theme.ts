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
}

export const DEFAULT_THEME_STATE = {
  theme: 'studio' as Theme,
  mode: 'light' as const,
  density: 'regular' as const,
  accent: 'default',
  showCustomCursor: true,
}

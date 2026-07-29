'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ThemeState, Theme, Mode, Density } from './types'
import { ACCENTS, DEFAULT_THEME_STATE, computeAutoTheme } from './theme'

interface ThemeContextValue extends ThemeState {
  setTheme: (t: Theme) => void
  setMode: (m: Mode) => void
  setDensity: (d: Density) => void
  setAccent: (a: string) => void
  setShowCustomCursor: (v: boolean) => void
  toggleTheme: () => void
  accentColor: string
  accentOptions: [string, string][]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeState>(DEFAULT_THEME_STATE)

  // On mount, sync React state to the auto theme the inline head script already
  // applied (time-of-day, or a persisted override). Tweak-panel changes are
  // session-only; only the nav toggle persists via 'theme-override'.
  useEffect(() => {
    setState((s) => ({ ...s, ...computeAutoTheme() }))
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = state.theme
    root.dataset.mode = state.mode
    root.dataset.density = state.density
    const accentColor = ACCENTS[state.theme]?.[state.accent] ?? ACCENTS[state.theme].default
    root.style.setProperty('--accent', accentColor)
  }, [state])

  const setTheme = useCallback((theme: Theme) =>
    setState((s) => ({ ...s, theme, accent: 'default' })), [])
  const setMode = useCallback((mode: Mode) =>
    setState((s) => ({ ...s, mode })), [])
  const setDensity = useCallback((density: Density) =>
    setState((s) => ({ ...s, density })), [])
  const setAccent = useCallback((accent: string) =>
    setState((s) => ({ ...s, accent })), [])
  const setShowCustomCursor = useCallback((showCustomCursor: boolean) =>
    setState((s) => ({ ...s, showCustomCursor })), [])

  // Persistent light/dark override: light → studio, dark → neon.
  const toggleTheme = useCallback(() =>
    setState((s) => {
      const next = s.mode === 'light'
        ? { theme: 'neon' as Theme, mode: 'dark' as Mode }
        : { theme: 'studio' as Theme, mode: 'light' as Mode }
      try { localStorage.setItem('theme-override', next.mode) } catch {}
      return { ...s, ...next, accent: 'default' }
    }), [])

  const accentColor = ACCENTS[state.theme]?.[state.accent] ?? ACCENTS[state.theme].default
  const accentOptions = Object.entries(ACCENTS[state.theme] ?? {}) as [string, string][]

  return (
    <ThemeContext.Provider value={{
      ...state,
      setTheme, setMode, setDensity, setAccent, setShowCustomCursor, toggleTheme,
      accentColor, accentOptions,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

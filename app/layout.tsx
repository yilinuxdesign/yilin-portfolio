import type { Metadata } from 'next'
import {
  Instrument_Serif,
  Source_Serif_4,
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Sora,
  Space_Mono,
} from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/ThemeContext'
import TweaksPanel from '@/components/TweaksPanel'
import CustomCursor from '@/components/CustomCursor'
import CurtainTransition from '@/components/CurtainTransition'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const sora = Sora({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

// Runs before paint: auto light (studio) 7am–7pm, neon dark otherwise,
// unless the user set an explicit override via the nav ☀/☾ toggle.
const THEME_INIT = `(function(){try{var el=document.documentElement;var o=localStorage.getItem('theme-override');function a(m){el.setAttribute('data-theme','neon');el.setAttribute('data-mode',m);}if(o==='light'){a('light');return;}if(o==='dark'){a('dark');return;}var h=new Date().getHours();a(h>=7&&h<19?'light':'dark');}catch(e){}})();`

export const metadata: Metadata = {
  title: 'Yilin Jia — Senior Product Designer',
  description:
    '7+ years designing financial products — dashboards, search, and payments. Currently designing at Citi. Based in Seattle, WA.',
  openGraph: {
    title: 'Yilin Jia — Senior Product Designer',
    description: 'Portfolio of Yilin Jia, Senior Product Designer at Citi.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="neon"
      data-mode="dark"
      data-density="regular"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${sourceSerif.variable} ${geist.variable} ${geistMono.variable} ${bricolage.variable} ${sora.variable} ${spaceMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <ThemeProvider>
          <CurtainTransition>
            <CustomCursor />
            {children}
            <TweaksPanel />
          </CurtainTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}

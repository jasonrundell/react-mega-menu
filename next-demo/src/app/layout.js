import localFont from 'next/font/local'
// Stylesheet import order matters: Topiary's tokens first, then the menu's
// --rmm-* stylesheet, which reads those tokens (with hardcoded fallbacks).
// Both are imported once, here, in the root layout — a server component —
// so the menu is fully styled on the very first server-rendered paint,
// with no flash of unstyled content and no client-side style injection.
import '@jasonrundell/topiary/style.css'
import '@jasonrundell/react-mega-menu/style.css'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata = {
  title: 'React Mega Menu — Next.js demo',
  description:
    'SSR proof for @jasonrundell/react-mega-menu v3: Next.js App Router, Topiary tokens, and a server-rendered, fully-styled first paint.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  )
}

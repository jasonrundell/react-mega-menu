import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Same app as main.tsx, mounted with slideDirection="right" so the
// right-hand slide has its own sharable page at /slide-right/.
// Both stylesheets are imported once, here at the app root — Topiary's
// tokens/theme layer first, then the menu's --rmm-* component stylesheet,
// which reads those tokens via var(--topiary-*, fallback). See
// src/styles/style.css (root package) and src/styles/rmmTokens.js for the
// documented --rmm-* contract this demo's own theme CSS builds on.
import '@jasonrundell/topiary/style.css'
import '@jasonrundell/react-mega-menu/style.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App defaultSlideDirection="right" />
  </StrictMode>
)

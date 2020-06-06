import React from 'react'

// Components
import MegaMenu from './components/MegaMenu'

// CSS
import './App.scss'

function App() {
  return (
    <div className="page">
      <MegaMenu />
      <main id="main">
        <section>
          <h1>React Mega Menu</h1>
          <p>
            A React project which aims to be a responsive and accessible
            boilerplate Mega Menu.
          </p>
          <a
            href="https://github.com/jasonrundell/react-mega-menu"
            rel="noopener noreferrer"
          >
            Check out the open-source repository on GitHub
          </a>
        </section>
        <section>
          <h1>Features</h1>
          <ul>
            <li>
              Unified menu: Maintain one menu instead of a 'desktop' version and
              a 'mobile' version.
            </li>
            <li>Menus are accessible through key inputs</li>
            <li>Fly-out menus</li>
            <li>W3C Valid Markup</li>
            <li>WCAG 2.1 AAA compliant</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App

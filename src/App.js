import React from 'react'

// Components
import GlobalTopNav from './components/GlobalTopNav'

// CSS
import './App.scss'

function App() {
  return (
    <div className="page">
      <GlobalTopNav />
      <main id="main">
        <section>
          <h1>React Mega Menu</h1>
          <p>
            A React project which aims to be an accessible, responsive,
            boilerplate top navigation menu with a "Mega Menu"!
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
            <li>WCAG 2.1 AA compliant</li>
            <li>W3C valid markup</li>
            <li>Fly-out menus</li>
            <li>Menus are accessible through key inputs</li>
            <li>Unified menu for all screen ratios</li>
            <li>Styled with SASS modules</li>
            <li>
              Supports and tested against IE 11, Edge, Safari, FireFox, Chrome
            </li>
          </ul>
        </section>
        <section>
          <h1>Get the code</h1>
          <p>
            Check out the open-source repository on{' '}
            <a
              href="https://github.com/jasonrundell/react-mega-menu"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </section>
        <section>
          <h1>Roadmap/Issues</h1>
          <p>
            All issues are tracked on{' '}
            <a
              href="https://github.com/jasonrundell/react-mega-menu/issues"
              rel="noopener noreferrer"
            >
              GitHub Issues
            </a>
          </p>
        </section>
      </main>
    </div>
  )
}

export default App

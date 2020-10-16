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
            A React project which aims to be an accessible and responsive
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
            <li>Styled with SASS modules</li>
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

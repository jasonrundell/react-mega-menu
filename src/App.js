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
      </main>
    </div>
  )
}

export default App

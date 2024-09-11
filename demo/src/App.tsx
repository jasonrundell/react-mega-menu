import { useState, useEffect } from 'react'
import { Menu } from '../../src/index'
import './App.css'

/**
 * Here's a static configuration example of a menu configuration object.
 * If menuConfig doesn't depend on any state or props of App, hoisting it can help improve performance
 * and code clarity. Otherwise move it to App's state.
 */
const menuConfig = {
  topbar: {
    id: 'topbar',
    logo: {
      src: 'https://via.placeholder.com/150x50',
      alt: 'Placeholder Logo',
      rel: 'home'
    },
    title: 'React Mega Menu'
  },
  menu: {
    items: [
      {
        label: 'Home',
        type: 'main',
        url: '/'
      },
      {
        label: 'About',
        type: 'main',
        url: '/?about'
      },
      {
        label: 'Store',
        type: 'mega',
        url: '/?store',
        items: [
          {
            label: 'Deals',
            type: 'link',
            url: '/?deals',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Kitchen',
            type: 'link',
            url: '/?kitchen',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Outdoors',
            type: 'sub',
            url: '/?outdoors',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Tools',
                type: 'link',
                url: '/?tools',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Plants',
                type: 'link',
                url: '/?plants',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Patio',
                type: 'link',
                url: '/?patio',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Decking',
                type: 'link',
                url: '/?decking',
                description: 'Single line description that accompanies link'
              }
            ]
          },
          {
            label: 'Bedroom',
            type: 'sub',
            url: '/?bedroom',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Beds',
                type: 'link',
                url: '/?beds',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Dressers',
                type: 'link',
                url: '/?dressers',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Nightstands',
                type: 'link',
                url: '/?nightstands',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Benches',
                type: 'link',
                url: '/?benches',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              }
            ]
          }
        ]
      },
      {
        label: 'Blog',
        type: 'mega',
        url: '/?blog',
        items: [
          {
            label: 'Latest Post Title',
            type: 'link',
            url: '/?latest-post-title',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          },
          {
            label: 'Categories',
            type: 'sub',
            url: '/?categories',
            items: [
              {
                label: 'News',
                type: 'link',
                url: '/?news'
              },
              {
                label: 'Recipes',
                type: 'link',
                url: '/?recipes'
              },
              {
                label: 'Health',
                type: 'link',
                url: '/?health'
              },
              {
                label: 'Diet',
                type: 'link',
                url: '/?diet'
              }
            ]
          }
        ]
      },
      {
        label: 'Help',
        type: 'mega',
        url: '/?help',
        items: [
          {
            label: 'FAQ',
            type: 'link',
            url: '/?faq',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Knowledge Base',
            type: 'link',
            url: '/?knowledge-base',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          }
        ]
      },
      {
        label: 'Settings',
        type: 'mega',
        url: '/?settings',
        items: [
          {
            label: 'Profile',
            type: 'link',
            url: '/?profile',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Billing',
            type: 'link',
            url: '/?billing',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Theme',
            type: 'sub',
            url: '/?theme',
            description: 'Change the React Mega Menu theme',
            items: [
              {
                label: 'Light',
                type: 'link',
                url: '/?theme=light'
              },
              {
                label: 'Dark',
                type: 'link',
                url: '/?theme=dark'
              },
              {
                label: 'Monokai',
                type: 'link',
                url: '/?theme=monokai'
              },
              {
                label: 'Retro',
                type: 'link',
                url: '/?theme=retro'
              },
              {
                label: 'Synthwave',
                type: 'link',
                url: '/?theme=synthwave'
              }
            ]
          },
          {
            label: 'Logout',
            type: 'link',
            url: '/?logout',
            description: 'Single line description that accompanies link'
          }
        ]
      },
      {
        label: 'Contact',
        type: 'main',
        url: '/?contact'
      }
    ]
  }
}

function App() {
  const themes = ['light', 'dark', 'monokai', 'retro', 'synthwave']

  // states for toggling head styling and changing themes
  const [headEnabled, setHeadEnabled] = useState(true)
  const [headElement, setHeadElement] = useState<HTMLElement | null>(
    document.head
  )
  const [currentTheme, setCurrentTheme] = useState(themes[0])

  // Apply the theme class to the menu when the component mounts
  useEffect(() => {
    // change theme when href contains ?theme= and use the param value for the theme to change to
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const theme = urlParams.get('theme')
      const rmmNav = document.getElementById('rmm__menu')
      if (rmmNav) {
        if (theme) {
          rmmNav.classList.add(`rmm__theme--${theme}`)
        } else {
          rmmNav.classList.add('rmm__theme--light')
        }
      }

      if (rmmNav) {
        themes.forEach((theme) =>
          rmmNav.classList.remove(`rmm__theme--${theme}`)
        )
        rmmNav.classList.add(`rmm__theme--${currentTheme}`)
      }
    }
  }, [currentTheme, themes])

  // Insert or remove the head element based on the headEnabled state
  useEffect(() => {
    if (headEnabled) {
      if (headElement && !document.documentElement.contains(headElement)) {
        document.documentElement.insertBefore(headElement, document.body)
      }
    } else {
      if (headElement && document.documentElement.contains(headElement)) {
        headElement.remove()
      }
    }
  }, [headEnabled, headElement])

  const toggleHead = () => {
    setHeadEnabled(!headEnabled)
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
  }

  // Function to dynamically import the theme CSS
  const loadTheme = async (theme: string) => {
    try {
      // Remove the previous theme classes if necessary
      const rmmNav = document.getElementById('rmm__menu')
      if (rmmNav) {
        themes.forEach((theme) =>
          rmmNav.classList.remove(`rmm__theme--${theme}`)
        )
      }

      // Dynamically import the theme CSS file
      await import(`./themes/${theme}.css`)

      // Apply the selected theme class
      if (rmmNav) {
        rmmNav.classList.add(`rmm__theme--${theme}`)
      }
    } catch (err) {
      console.error(`Failed to load the ${theme} theme`, err)
    }
  }

  useEffect(() => {
    loadTheme(currentTheme)
  }, [currentTheme])

  return (
    <div>
      <Menu config={menuConfig} />
      <main>
        <h1>React Mega Menu Demo</h1>
        <hr />
        <p>
          A React project which aims to be an accessible, responsive,
          boilerplate top navigation menu with a "Mega Menu"!
        </p>
        <h2>Features</h2>
        <ul>
          <li>WCAG 2.1 AA compliant</li>
          <li>W3C valid markup</li>
          <li>Fly-out menus</li>
          <li>Menus are accessible through key inputs</li>
          <li>Unified menu for all screen ratios</li>
          <li>
            Styled (lightly) with <a href="https://emotion.sh">Emotion</a>
          </li>
          <li>Theme support with vanilla CSS (examples included)</li>
          <li>Supports and tested against Edge, Safari, FireFox, and Chrome</li>
          <li>
            CSS animations with{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion">
              prefers-reduced-motion
            </a>{' '}
            media query
          </li>
        </ul>
        <hr />
        <button onClick={toggleHead}>
          {headEnabled ? 'Disable Styling' : 'Enable Styling'}
        </button>
        <h2>Menu Themes</h2>
        <ul>
          {themes.map((theme) => (
            <li key={theme}>
              <button onClick={() => handleThemeChange(theme)}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => handleThemeChange('')}>None</button>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default App

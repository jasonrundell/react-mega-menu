import { useState, useEffect, useCallback } from 'react'
// import { Menu } from '../../src/index' // local development mode
import { Menu } from '@jasonrundell/react-mega-menu'
import './App.css'

export interface MenuItem {
  label: string
  type: string
  url: string
  description?: string
  items?: MenuItem[]
}

export interface MenuConfig {
  topbar: {
    id: string
    logo: {
      src: string
      alt: string
      rel: string
    }
    title: string
  }
  menu: {
    items: MenuItem[]
  }
}

/**
 * Here's a static configuration example of a menu configuration object.
 * If menuConfig doesn't depend on any state or props of App, hoisting it can help improve performance
 * and code clarity. Otherwise, move it to App's state.
 */
const menuConfig: MenuConfig = {
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
        url: '/about/'
      },
      {
        label: 'Store',
        type: 'mega',
        url: '/store/',
        items: [
          {
            label: 'Deals',
            type: 'link',
            url: '/store/deals/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Kitchen',
            type: 'link',
            url: '/store/kitchen/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Outdoors',
            type: 'sub',
            url: '/store/outdoors/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Tools',
                type: 'link',
                url: '/store/outdoors/tools/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Plants',
                type: 'link',
                url: '/store/outdoors/plants/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Patio',
                type: 'link',
                url: '/store/outdoors/patio/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Decking',
                type: 'link',
                url: '/store/outdoors/decking/',
                description: 'Single line description that accompanies link'
              }
            ]
          },
          {
            label: 'Bedroom',
            type: 'sub',
            url: '/store/bedroom/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Beds',
                type: 'link',
                url: '/store/bedroom/beds/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Dressers',
                type: 'link',
                url: '/store/bedroom/dressers/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Nightstands',
                type: 'link',
                url: '/store/bedroom/nightstands/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Benches',
                type: 'link',
                url: '/store/bedroom/benches/',
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
        url: '/blog/',
        items: [
          {
            label: 'Latest Post Title',
            type: 'link',
            url: '/blog/posts/latest-post-title/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          },
          {
            label: 'Categories',
            type: 'sub',
            url: '/blog/categories/',
            items: [
              {
                label: 'News',
                type: 'link',
                url: '/blog/news/'
              },
              {
                label: 'Recipes',
                type: 'link',
                url: '/blog/recipes/'
              },
              {
                label: 'Health',
                type: 'link',
                url: '/blog/health/'
              },
              {
                label: 'Diet',
                type: 'link',
                url: '/blog/diet/'
              }
            ]
          }
        ]
      },
      {
        label: 'Help',
        type: 'mega',
        url: '/help/',
        items: [
          {
            label: 'FAQ',
            type: 'link',
            url: '/help/faq/',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Knowledge Base',
            type: 'link',
            url: '/help/knowledge-base/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          }
        ]
      },
      {
        label: 'Settings',
        type: 'mega',
        url: '/settings/',
        items: [
          {
            label: 'Profile',
            type: 'link',
            url: '/settings/profile/',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Billing',
            type: 'link',
            url: '/settings/billing/',
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
        url: '#contact'
      }
    ]
  }
}

function App() {
  const themes = ['light', 'dark', 'monokai', 'retro', 'synthwave']

  // states for toggling head styling and changing themes
  const [headEnabled, setHeadEnabled] = useState(true)
  const [headElement] = useState<HTMLElement | null>(document.head)
  const [currentTheme, setCurrentTheme] = useState(themes[0])

  // Apply the theme class to the menu when the component mounts
  useEffect(() => {
    const rmmNav = document.getElementById('rmm__menu')
    if (rmmNav) {
      themes.forEach((theme) => rmmNav.classList.remove(`rmm__theme--${theme}`))
      rmmNav.classList.add(`rmm__theme--${currentTheme}`)
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

  /**
   * This useEffect hook will check the URL query string for a theme parameter
   * and apply the theme if it exists.
   * This is useful for sharing a specific theme with others. For example:
   * https://example.com?theme=dark will load the dark theme.
   * https://example.com?theme=light will load the light theme.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme')
    if (themeParam) {
      setCurrentTheme(themeParam)
    }
  }, [])

  const toggleHead = () => {
    setHeadEnabled(!headEnabled)
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
  }

  // Function to dynamically import the theme CSS
  const loadTheme = useCallback(
    async (theme: string) => {
      try {
        // Remove the previous theme classes if necessary
        const rmmNav = document.getElementById('rmm__menu')
        if (rmmNav) {
          themes.forEach((theme) =>
            rmmNav.classList.remove(`rmm__theme--${theme}`)
          )
        }

        // Dynamically import the theme CSS file
        if (theme) {
          await import(`./themes/${theme}.css`)

          // Apply the selected theme class
          if (rmmNav) {
            rmmNav.classList.add(`rmm__theme--${theme}`)
          }
        }
      } catch (err) {
        console.error(`Failed to load the ${theme} theme`, err)
      }
    },
    [themes]
  )

  useEffect(() => {
    loadTheme(currentTheme)
  }, [currentTheme, loadTheme])

  return (
    <div>
      <Menu config={menuConfig} />
      <main>
        <h1>React Mega Menu Demo</h1>
        <hr />
        <p>
          A React library project which aims to be an accessible, responsive,
          boilerplate top navigation menu with a "Mega Menu"!
        </p>
        <h2>Features</h2>
        <ul>
          <li>WCAG 2.1 AA compliant</li>
          <li>W3C valid markup</li>
          <li>Fly-out menus</li>
          <li>Supports keyboard navigation and screen readers</li>
          <li>
            Responsively designed to adapt to modern mobile and desktop screen
            sizes
          </li>
          <li>
            Styled (lightly) with <a href="https://emotion.sh">Emotion</a>
          </li>
          <li>
            The project supports theme customization with vanilla CSS, as
            demonstrated in the synthwave.css theme.
          </li>
          <li>Supports and tested against Edge, Safari, FireFox, and Chrome</li>
          <li>
            Includes CSS animations that respect the{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion">
              prefers-reduced-motion
            </a>{' '}
            media query for users who prefer reduced motion
          </li>
          <li>
            Includes a demo project using Next.js, showcasing how to integrate
            the menu with a Next.js application
          </li>
        </ul>
        <hr />
        <h3>Semantically designed structure</h3>
        <p>
          The menu is designed to be as semantically correct as possible. The
          top-level menu items are <code>nav</code> elements, and the submenus
          are <code>ul</code> elements. The menu items are <code>li</code>{' '}
          elements, and the links are <code>a</code> elements. The menu is
          accessible through keyboard navigation and screen readers.
        </p>
        <button onClick={toggleHead}>
          {headEnabled ? 'Disable styling to view' : 'Re-enable styling'}
        </button>
        <hr />
        <h3>Styling the menu</h3>
        <p>
          This menu component is designed to be highly customizable. You can
          apply your own CSS styles to the menu by targeting the appropriate
          classes. The menu structure is built using semantic HTML elements,
          which makes it easy to style using CSS.
        </p>
        <p>
          The top-level menu items are wrapped in <code>nav</code> elements, and
          the submenus are wrapped in <code>ul</code> elements. Each menu item
          is an <code>li</code> element, and the links are <code>a</code>{' '}
          elements. This structure allows you to use standard CSS selectors to
          apply styles to different parts of the menu.
        </p>
        <p>
          Additionally, the menu supports themes, which are applied by adding a
          theme-specific class to the menu container. You can create your own
          themes by defining CSS classes that follow the naming convention{' '}
          <code>.rmm__theme--your-theme-name</code> and applying them to the
          menu container.
        </p>
        <h4>Try out a theme:</h4>
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
        <p>
          <em>
            Note how changing the theme only affects the mega menu and not the
            rest of the page/application.
          </em>
        </p>
        <h3 id="contact">Showcase your theme</h3>
        <p>
          Submit a{' '}
          <a
            href="https://github.com/jasonrundell/react-mega-menu/compare"
            target="_blank"
          >
            pull request
          </a>{' '}
          to add your theme to the demo!
        </p>
      </main>
    </div>
  )
}

export default App

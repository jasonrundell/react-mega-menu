import { useState, useEffect } from 'react'
import { Menu } from '../../src/index'
import './App.css'
import './rmm-themes.css'

function App() {
  const [headEnabled, setHeadEnabled] = useState(true)
  const [headElement, setHeadElement] = useState<HTMLElement | null>(
    document.head
  )

  /**
   * Here's an example of a menu configuration object.
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

    // change theme when href contains ?theme= and use the param value for the theme to change to
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const theme = urlParams.get('theme')
      const rmmNav = document.getElementById('rmm__nav')
      if (rmmNav) {
        if (theme) {
          rmmNav.classList.add(`rmm__theme--${theme}`)
        } else {
          rmmNav.classList.add('rmm__theme--light')
        }
      }
    }
  }, [headEnabled, headElement])

  const toggleHead = () => {
    setHeadEnabled(!headEnabled)
  }

  return (
    <div>
      <h1>React Mega Menu Demo</h1>
      <button onClick={toggleHead}>
        {headEnabled ? 'Disable Styling' : 'Enable Styling'}
      </button>
      <Menu config={menuConfig} />
      <main>
        <h1>Themes</h1>
        <ul>
          <li>
            <button
              onClick={() => {
                const rmmNav = document.getElementById('rmm__nav')
                if (rmmNav) {
                  rmmNav.classList.remove('rmm__theme--dark')
                  rmmNav.classList.remove('rmm__theme--monokai')
                  rmmNav.classList.add('rmm__theme--light')
                }
              }}
            >
              Light
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                const rmmNav = document.getElementById('rmm__nav')
                if (rmmNav) {
                  rmmNav.classList.remove('rmm__theme--light')
                  rmmNav.classList.remove('rmm__theme--monokai')
                  rmmNav.classList.add('rmm__theme--dark')
                }
              }}
            >
              Dark
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                const rmmNav = document.getElementById('rmm__nav')
                if (rmmNav) {
                  rmmNav.classList.remove('rmm__theme--light')
                  rmmNav.classList.remove('rmm__theme--dark')
                  rmmNav.classList.add('rmm__theme--monokai')
                }
              }}
            >
              Monokai
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                const rmmNav = document.getElementById('rmm__nav')
                if (rmmNav) {
                  rmmNav.classList.remove('rmm__theme--light')
                  rmmNav.classList.remove('rmm__theme--dark')
                  rmmNav.classList.remove('rmm__theme--monokai')
                }
              }}
            >
              Skeleton
            </button>
          </li>
        </ul>
        <img src="/images/logos/react.svg" alt="React Logo" />
      </main>
    </div>
  )
}

export default App

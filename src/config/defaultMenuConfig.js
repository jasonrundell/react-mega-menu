// @ts-check
/**
 * The built-in sample config `Menu` renders when no `config` prop is given.
 *
 * Typed via JSDoc against the shipped declaration so that
 * src/typesContract.test.js (which runs tsc over this file with checkJs)
 * fails if this config and src/index.d.ts ever disagree about the shape.
 *
 * @type {import('../index').MenuConfigShape}
 */
export const config = {
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
        id: 'home',
        label: 'Home',
        type: 'main',
        url: '/'
      },
      {
        id: 'about',
        label: 'About',
        type: 'main',
        url: '/about/'
      },
      {
        id: 'store',
        label: 'Store',
        type: 'mega',
        url: '/store/',
        items: [
          {
            id: 'store-deals',
            label: 'Deals',
            type: 'link',
            url: '/store/deals/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            id: 'store-kitchen',
            label: 'Kitchen',
            type: 'link',
            url: '/store/kitchen/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            id: 'store-outdoors',
            label: 'Outdoors',
            type: 'sub',
            url: '/store/outdoors/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                id: 'store-outdoors-tools',
                label: 'Tools',
                type: 'link',
                url: '/store/outdoors/tools/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-plants',
                label: 'Plants',
                type: 'link',
                url: '/store/outdoors/plants/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-patio',
                label: 'Patio',
                type: 'link',
                url: '/store/outdoors/patio/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-decking',
                label: 'Decking',
                type: 'link',
                url: '/store/outdoors/decking/',
                description: 'Single line description that accompanies link'
              }
            ]
          },
          {
            id: 'store-bedroom',
            label: 'Bedroom',
            type: 'sub',
            url: '/store/bedroom/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                id: 'store-bedroom-beds',
                label: 'Beds',
                type: 'link',
                url: '/store/bedroom/beds/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-bedroom-dressers',
                label: 'Dressers',
                type: 'link',
                url: '/store/bedroom/dressers/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                id: 'store-bedroom-nightstands',
                label: 'Nightstands',
                type: 'link',
                url: '/store/bedroom/nightstands/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                id: 'store-bedroom-benches',
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
        id: 'blog',
        label: 'Blog',
        type: 'mega',
        url: '/blog/',
        items: [
          {
            id: 'blog-latest-post-title',
            label: 'Latest Post Title',
            type: 'link',
            url: '/blog/posts/latest-post-title/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          },
          {
            id: 'blog-categories',
            label: 'Categories',
            type: 'sub',
            url: '/blog/categories/',
            items: [
              {
                id: 'blog-news',
                label: 'News',
                type: 'link',
                url: '/blog/news/'
              },
              {
                id: 'blog-recipes',
                label: 'Recipes',
                type: 'link',
                url: '/blog/recipes/'
              },
              {
                id: 'blog-health',
                label: 'Health',
                type: 'link',
                url: '/blog/health/'
              },
              {
                id: 'blog-diet',
                label: 'Diet',
                type: 'link',
                url: '/blog/diet/'
              }
            ]
          }
        ]
      },
      {
        id: 'help',
        label: 'Help',
        type: 'mega',
        url: '/help/',
        items: [
          {
            id: 'help-react-mega-menu',
            label: 'React Mega Menu',
            type: 'link',
            url: 'https://github.com/jasonrundell/react-mega-menu',
            description:
              'A React project which aims to be an accessible, responsive, boilerplate top navigation menu with a "Mega Menu"!'
          },
          {
            id: 'help-faq',
            label: 'FAQ',
            type: 'link',
            url: '/help/faq/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'help-knowledge-base',
            label: 'Knowledge Base',
            type: 'link',
            url: '/help/knowledge-base/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          }
        ]
      },
      {
        id: 'settings',
        label: 'Settings',
        type: 'mega',
        url: '/settings/',
        items: [
          {
            id: 'settings-profile',
            label: 'Profile',
            type: 'link',
            url: '/settings/profile/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'settings-billing',
            label: 'Billing',
            type: 'link',
            url: '/settings/billing/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'settings-theme',
            label: 'Theme',
            type: 'sub',
            url: '#',
            description: 'Change the React Mega Menu theme',
            items: [
              {
                id: 'settings-theme-light',
                label: 'Light',
                type: 'link',
                url: '/?theme=light'
              },
              {
                id: 'settings-theme-dark',
                label: 'Dark',
                type: 'link',
                url: '/?theme=dark'
              },
              {
                id: 'settings-theme-monokai',
                label: 'Monokai',
                type: 'link',
                url: '/?theme=monokai'
              },
              {
                id: 'settings-theme-retro',
                label: 'Retro',
                type: 'link',
                url: '/?theme=retro'
              },
              {
                id: 'settings-theme-synthwave',
                label: 'Synthwave',
                type: 'link',
                url: '/?theme=synthwave'
              }
            ]
          },
          {
            id: 'settings-logout',
            label: 'Logout',
            type: 'link',
            url: '/settings/logout/',
            description: 'Single line description that accompanies link'
          }
        ]
      },
      {
        id: 'contact',
        label: 'Contact',
        type: 'main',
        url: '#contact'
      }
    ]
  }
}

'use client'

import Image from 'next/image'
import { Menu } from '@jasonrundell/react-mega-menu'

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

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Menu config={menuConfig} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}

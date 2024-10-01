# React Mega Menu

A React project which aims to be an accessible, responsive, boilerplate top
navigation menu with a "Mega Menu"!

## Features

- WCAG 2.1 AA compliant
- W3C valid markup
- Fly-out menus
- Supports keyboard navigation and screen readers
- Responsively designed to adapt to modern mobile and desktop screen sizes
- Lightly styled with [Emotion](https://emotion.sh)
- Supports theme customization with vanilla CSS, as demonstrated in the `synthwave.css` theme
- Tested and supported on Edge, Safari, Firefox, and Chrome
- Includes CSS animations that respect the [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query for users who prefer reduced motion
- Includes a demo project using Next.js, showcasing how to integrate the menu with a Next.js application

## FAQ

- **What is a "Mega Menu"?** A Mega Menu is a large dropdown navigation menu that displays multiple links and categories at once. It often organizes content into columns or sections, allowing users to see a broader range of options at a glance. It is typically used for websites with a lot of content or categories, like e-commerce or large informational sites.
- **Why would someone use a Mega Menu?** Mega menus are important for building an online e-commerce presence because they enhance navigation by allowing users to quickly browse and access a wide range of products or categories. They help improve the user experience by organizing complex inventories into clear, accessible sections, reducing the time it takes for customers to find what they're looking for, which can lead to higher engagement and conversion rates.
- **Can I use this just for a simple website menu?** Yes! This project is designed to be flexible and can be used for any type of website navigation. You can customize the menu to fit your needs, whether you want a simple dropdown menu or a more complex Mega Menu.

## View Demo

Visit:
[https://jasonrundell-react-mega-menu.vercel.app/](https://jasonrundell-react-mega-menu.vercel.app)

## Deploy

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/jasonrundell/react-mega-menu)

## Special Thanks

[Donna Vitan for the accessibility consultation](https://donnavitan.com)

## Resources

[Web Accessibility Tutorials (WCAG) Menu Structure](https://www.w3.org/WAI/tutorials/menus/structure/)

[Web Accessibility Tutorials (WCAG) Fly-out Menus](https://www.w3.org/WAI/tutorials/menus/flyout/)

[JavaScript Event KeyCodes by Wes Bos](https://keycode.info/)

[Supporting the Keyboard for Mobile](http://simplyaccessible.com/article/mobile-keyboard-support/)

[a11y Project: Resources](https://www.a11yproject.com/resources/)

## Accessible Menus

[Deque University](https://dequeuniversity.com/)

["Building Accessible Menu Systems" by Heydon Pickering](https://www.smashingmagazine.com/2017/11/building-accessible-menu-systems/)

[Using the aria-hidden Attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute)

## Reduced Motion Support

Learn by reading these:

- ["Your Interactive Makes Me Sick"](https://source.opennews.org/articles/motion-sick/)
- ["Accessibility for Vestibular Disorders: How My Temporary Disability Changed My Perspective"](https://alistapart.com/article/accessibility-for-vestibular/)
- ["An Introduction to the Reduced Motion Media Query"](https://css-tricks.com/introduction-reduced-motion-media-query/)
- ["prefers-reduced-motion: Sometimes Less Movement is More"](https://web.dev/prefers-reduced-motion/)
- [W3C: Understanding Success Criterion 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

### How to Test prefers-reduced-motion on macOS

1. Open settings for **Accessibility**
2. Toggle **Reduce Motion** On/Off

### How to Test prefers-reduced-motion on iOS

1. Open settings for **Accessibility**
2. Toggle **Reduce Motion** On/Off

### How to Test prefers-reduced-motion on Windows 10

1. Press the Win+R keys to open Run, type `SystemPropertiesPerformance.exe` into Run, and click/tap on OK to directly open to the Visual Effects tab in Performance Options.
2. Check (enable - default) or uncheck (disable) `Animate controls and elements inside windows`.
3. If you don't see an immediate change, then you can restart the explorer process or sign out and sign in to apply instead.

### How to Test prefers-reduced-motion on Android

1. Search in your system settings for **Remove Animations** and toggle On/Off,
   or
2. Go to your system settings > **Accessibility** and look for a toggle to reduce motion or turn off animations
3. If you have a browser app already open, you'll have to force quit it to have the setting take effect

## Icons

Icons from the **Free for Web** download pack by [Font Awesome](https://fontawesome.com/download)
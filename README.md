# React Mega Menu

A React project which aims to be a responsive and accessible boilerplate Mega
Menu.

## Features

- Responsive
- Accessible
- WCAG 2.1 AAA compliant
- W3C valid
- Fly-out menus
- Unified menu: Maintain one menu instead of a 'desktop' version and a 'mobile'
  version
- Menus are accessible through key inputs
- Styled with SASS modules

## View demo

Visit:
[https://react-mega-menu.netlify.app](https://react-mega-menu.netlify.app)

## Special Thanks

[Donna Vitan for the accessibility consultation](https://donnavitan.com)

## Resources

[Web Accessibility Tutorials (WCAG) Menu Structure](https://www.w3.org/WAI/tutorials/menus/structure/)

[Web Accessibility Tutorials (WCAG) Fly-out Menus](https://www.w3.org/WAI/tutorials/menus/flyout/)

[JavaScript Event KeyCodes by Wes Bos](https://keycode.info/)

[Supporting the keyboard for mobile](http://simplyaccessible.com/article/mobile-keyboard-support/)

## Accessible Menus

[Deque University](https://dequeuniversity.com/)

["Building Accessible Menu Systems" by Heydon Pickering](https://www.smashingmagazine.com/2017/11/building-accessible-menu-systems/)

[Using the aria-hidden attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute)

## Icons

Icons from the **Free for Web** download pack by
[Font Awesome](https://fontawesome.com/download)

```jsx

// Main
<ul
  role="menubar"
  aria-label="Main Menu"
  className="nav__list"
  id="menubar-main"
>

// Mega
<ul
  role="menu"
  className={`nav__list nav__sub nav__mega nav__dropdown ${
    (activeMenus.includes('menu-Mega-Menu') && `nav--open`) ||
    `nav--closed`
  }`}
  id="menu-Mega-Menu"
  aria-labelledby="menu-Mega-Menu"
>

// Sub sub
<ul
  role="menu"
  id="menu-Mega-Menu-Sub-menu-item-3"
  className={`nav__list nav__sub nav__sub-sub ${
    (activeMenus.includes('menu-Mega-Menu-Sub-menu-item-3') &&
      `nav--open`) ||
    `nav--closed`
  }`}
  aria-labelledby="menuitem-Mega-Menu-Sub-menu-item-3"
>

// Dropdown
<ul
  role="menu"
  className={`nav__list nav__sub nav__dropdown ${
    (activeMenus.includes('menu-Simple-Menu') && `nav--open`) ||
    `nav--closed`
  }`}
  id="menu-Simple-Menu"
  aria-labelledby="menu-Simple-Menu"
>
```

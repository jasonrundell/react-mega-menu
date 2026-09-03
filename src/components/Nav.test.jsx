import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from './Nav'

describe('Nav Component', () => {
  test('renders correctly with default props', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </Nav>
    )
    const navElement = getByLabelText('Main Navigation')
    expect(navElement).toBeInTheDocument()
    expect(navElement).toHaveAttribute('id', 'main-nav')
  })

  test('applies correct styles for open state', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" activeState="open">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </Nav>
    )
    const navElement = getByLabelText('Main Navigation')
    expect(navElement).toHaveStyle(`
      animation-duration: 0.75s;
      animation-fill-mode: both;
      animation-name: slideOpen;
      animation-iteration-count: 1;
    `)
  })

  test('applies correct styles for closed state', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" activeState="closed">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </Nav>
    )
    const navElement = getByLabelText('Main Navigation')
    expect(navElement).toHaveStyle(`
      animation-duration: 0.75s;
      animation-fill-mode: both;
      animation-name: slideClosed;
      animation-iteration-count: 1;
    `)
  })

  test('renders children correctly', () => {
    const { getByText } = render(
      <Nav id="main-nav">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </Nav>
    )
    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('About')).toBeInTheDocument()
  })
})

describe('Nav inert behaviour (closed off-canvas nav leaves the tab order)', () => {
  const children = (
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
    </ul>
  )

  test('is inert when closed at mobile width', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" activeState="closed" isMobile>
        {children}
      </Nav>
    )
    expect(getByLabelText('Main Navigation')).toHaveAttribute('inert')
  })

  test('is not inert when open at mobile width', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" activeState="open" isMobile>
        {children}
      </Nav>
    )
    expect(getByLabelText('Main Navigation')).not.toHaveAttribute('inert')
  })

  test('is never inert at desktop width', () => {
    const { getByLabelText, rerender } = render(
      <Nav id="main-nav" activeState="closed" isMobile={false}>
        {children}
      </Nav>
    )
    expect(getByLabelText('Main Navigation')).not.toHaveAttribute('inert')
    rerender(
      <Nav id="main-nav" activeState="open" isMobile={false}>
        {children}
      </Nav>
    )
    expect(getByLabelText('Main Navigation')).not.toHaveAttribute('inert')
  })

  test('is not inert when isMobile is omitted (backwards compatible)', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" activeState="closed">
        {children}
      </Nav>
    )
    expect(getByLabelText('Main Navigation')).not.toHaveAttribute('inert')
  })
})

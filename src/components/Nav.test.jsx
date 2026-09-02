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
    expect(navElement).toHaveClass('rmm__nav')
  })

  test('applies the open state class when activeState is open', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" activeState="open">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </Nav>
    )
    const navElement = getByLabelText('Main Navigation')
    expect(navElement).toHaveClass('rmm__nav--open')
    expect(navElement).not.toHaveClass('rmm__nav--closed')
  })

  test('applies the closed state class when activeState is closed', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" activeState="closed">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </Nav>
    )
    const navElement = getByLabelText('Main Navigation')
    expect(navElement).toHaveClass('rmm__nav--closed')
    expect(navElement).not.toHaveClass('rmm__nav--open')
  })

  test('defaults to the slide-left direction class when slideDirection is not set', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav">
        <ul>
          <li>Home</li>
        </ul>
      </Nav>
    )
    const navElement = getByLabelText('Main Navigation')
    expect(navElement).toHaveClass('rmm__nav--slide-left')
    expect(navElement).not.toHaveClass('rmm__nav--slide-right')
  })

  test('applies the slide-right direction class when slideDirection="right"', () => {
    const { getByLabelText } = render(
      <Nav id="main-nav" slideDirection="right">
        <ul>
          <li>Home</li>
        </ul>
      </Nav>
    )
    const navElement = getByLabelText('Main Navigation')
    expect(navElement).toHaveClass('rmm__nav--slide-right')
    expect(navElement).not.toHaveClass('rmm__nav--slide-left')
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

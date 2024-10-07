import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Menu } from './index' // Adjust the import path as needed

// Mock the Menu component
jest.mock('./Menu', () => ({
  Menu: jest.fn(() => <div data-testid="menu-component">Menu Component</div>)
}))

describe('MenuWithProvider', () => {
  it('should render Menu component with the provider', () => {
    // Arrange: Render the MenuWithProvider component
    const { getByTestId } = render(<Menu />)

    // Assert: Check if the Menu component is rendered
    const menuComponent = getByTestId('menu-component')
    expect(menuComponent).toBeInTheDocument()
  })

  it('should pass props to the Menu component', () => {
    // Arrange: Render the MenuWithProvider component with a prop
    const testProp = 'testValue'
    render(<Menu someProp={testProp} />)

    // Assert: Check if the props are passed correctly
    expect(require('./Menu').Menu).toHaveBeenCalledWith(
      expect.objectContaining({ someProp: testProp }),
      {}
    )
  })
})

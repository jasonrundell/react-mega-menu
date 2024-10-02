import { click, escape } from './a11y'

describe('a11y utility functions', () => {
  describe('click function', () => {
    it('should return true for space key (charCode 32)', () => {
      const event = { charCode: 32 }
      expect(click(event)).toBe(true)
    })

    it('should return true for enter key (keyCode 13)', () => {
      const event = { keyCode: 13 }
      expect(click(event)).toBe(true)
    })

    it('should return undefined for other keys', () => {
      const event = { keyCode: 65 } // 'A' key
      expect(click(event)).toBeUndefined()
    })
  })

  describe('escape function', () => {
    it('should call resetMenus for escape key (keyCode 27)', () => {
      const resetMenusMock = jest.fn()
      const event = { keyCode: 27 }
      escape(event, resetMenusMock)
      expect(resetMenusMock).toHaveBeenCalled()
    })

    it('should not call resetMenus for other keys', () => {
      const resetMenusMock = jest.fn()
      const event = { keyCode: 65 } // 'A' key
      escape(event, resetMenusMock)
      expect(resetMenusMock).not.toHaveBeenCalled()
    })
  })
})

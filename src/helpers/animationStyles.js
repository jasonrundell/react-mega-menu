import { css } from '@emotion/react'
import { respondTo } from './responsive'

export const getAnimationStyles = (activeState) => {
  if (activeState === 'open') {
    return css`
      animation-duration: 0.75s;
      animation-fill-mode: both;
      animation-name: slideOpen;
      animation-iteration-count: 1;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }

      @keyframes slideOpen {
        from {
          transform: translate3d(-100%, 0, 0);
        }
        to {
          transform: translate3d(100%, 0, 0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        transform: translate3d(100%, 0, 0);
      }

      ${respondTo('large')} {
        animation: none;
        display: flex;
        opacity: 1;
        @media (prefers-reduced-motion: reduce) {
          transform: none;
        }
      }
    `
  } else if (activeState === 'closed') {
    return css`
      animation-duration: 0.75s;
      animation-fill-mode: both;
      animation-name: slideClosed;
      animation-iteration-count: 1;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }

      @keyframes slideClosed {
        from {
          transform: translate3d(100%, 0, 0);
        }
        to {
          transform: translate3d(-100%, 0, 0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        transform: translate3d(-100%, 0, 0);
      }

      ${respondTo('large')} {
        animation: none;
        display: flex;
        opacity: 1;
        @media (prefers-reduced-motion: reduce) {
          transform: none;
        }
      }
    `
  }
  return null
}

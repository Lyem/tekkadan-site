import styled, { css } from 'styled-components'

import { LogoProps } from '.'

const wrapperModifiers = {
  xsmall: () => css`
    width: 4rem;
    height: 4.6rem;
  `,

  small: () => css`
    width: 5rem;
    height: 5.6rem;
  `,

  normal: () => css`
    width: 11rem;
    height: 11.6rem;
  `,

  large: () => css`
    width: 15rem;
    height: 16.1rem;
  `,

  infinit: () => css`
    animation: logoInfinit 2s ease 0s infinite;
  `,

  default: () => css`
    animation: logo 7s ease 0s forwards;
  `
}

export const Wrapper = styled.div<LogoProps>`
  ${({ theme, size, animate, animateType }) => css`
    color: ${theme.colors.primary};

    ${!!size && wrapperModifiers[size]}
    ${!!animate && !!animateType && wrapperModifiers[animateType]}
  `}

  @keyframes logo {
    0% {
      fill-opacity: 0;
      stroke-dasharray: 1 1000;
      stroke-dashoffset: 0;
      stroke-width: 0;
      opacity: 1;
    }
    30% {
      fill-opacity: 0;
      stroke-dasharray: 150 0;
      stroke-dashoffset: 0;
      stroke-width: 1;
      opacity: 1;
    }
    60%,
    90% {
      fill-opacity: 1;
      stroke-dasharray: 150 0;
      stroke-dashoffset: 0;
      stroke-width: 0;
      opacity: 1;
    }
    100% {
    }
  }

  @keyframes logoInfinit {
    0% {
      fill-opacity: 0;
      stroke-dasharray: 1 60;
      stroke-dashoffset: 0;
      stroke-width: 1;
      opacity: 1;
    }
    100% {
      fill-opacity: 0;
      stroke-dasharray: 150 60;
      stroke-dashoffset: 0;
      stroke-width: 1;
      opacity: 1;
    }
  }
`

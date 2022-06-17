import styled, { css, DefaultTheme } from 'styled-components'
import { IconProps } from '.'

const wrapperModifiers = {
  white2: (theme: DefaultTheme) => css`
    color: ${theme.colors.white2};
  `,

  white: (theme: DefaultTheme) => css`
    color: ${theme.colors.white};
  `,

  primary: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary};
  `,

  primary2: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary2};
  `
}

export const WrapperIcon = styled.span<IconProps>`
  ${({ theme, color, size, center }) => css`
    span {
      ${!!color && wrapperModifiers[color](theme)}
      font-size: ${size}px;
      ${!!center && 'vertical-align: middle;'}
    }
  `};
  span {
    font-family: 'icomoon' !important;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-bell:before {
    content: '';
  }
  .icon-lock:before {
    content: '';
  }
  .icon-save:before {
    content: '';
  }
  .icon-setting:before {
    content: '';
  }
  .icon-magnifier:before {
    content: '';
  }
  .icon-login:before {
    content: '';
  }
  .icon-logout:before {
    content: '';
  }
  .icon-message:before {
    content: '';
  }
  .icon-account:before {
    content: '';
  }
`

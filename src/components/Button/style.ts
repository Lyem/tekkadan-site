import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'

type WrapperProps = Pick<ButtonProps, 'size' | 'fullWidth'>

const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  fullWidth: () => css`
    width: 100%;
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, fullWidth }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: 0;
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxsmall};
    ${!!size && wrapperModifiers[size](theme)}
    ${!!fullWidth && wrapperModifiers.fullWidth()}
    &:hover {
      cursor: pointer;
      background-color: ${theme.colors.primary2};
      color: ${theme.colors.white2};
    }
    &:active {
      background-color: ${theme.colors.primary3};
      color: ${theme.colors.white3};
    }
  `}
`

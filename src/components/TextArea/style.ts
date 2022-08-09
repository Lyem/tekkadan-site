import styled, { css, DefaultTheme } from 'styled-components'
import { TextFieldProps } from '.'

const wrapperModifiers = {
  contrast: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.contrast};
  `,

  contrast2: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.contrast2};
  `,

  contrast3: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.contrast3};
  `,

  black: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.black};
  `,

  medium: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall};
  `,

  xxsmall: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xsmall};
    padding: ${theme.spacings.xxxsmall};
  `
}

export const TextArea = styled.textarea<TextFieldProps>`
  border: none;
  ${({ theme, fontSize, backgroundColor }) => css`
    background-color: ${theme.colors.contrast2};
    color: ${theme.colors.white};
    ${fontSize == 'medium'
      ? 'padding:' + theme.spacings.xsmall
      : 'padding:' + theme.spacings.xxxsmall};

    ${!!fontSize && wrapperModifiers[fontSize](theme)}
    ${!!backgroundColor && wrapperModifiers[backgroundColor](theme)}
  `}

  width: 100%;
  height: 20vh;

  resize: none;

  -moz-appearance: none;
  outline: 0px none transparent;

  &:focus {
    -moz-appearance: none;
    outline: 0px none transparent;
  }
`

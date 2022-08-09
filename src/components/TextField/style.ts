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

export const Wrapper = styled.div``

export const InputWrapper = styled.div<TextFieldProps>`
  ${({ theme, backgroundColor, fontSize }) => css`
    display: flex;
    ${!!backgroundColor && wrapperModifiers[backgroundColor](theme)}
    border-radius: 0.2rem;
    ${fontSize == 'medium'
      ? 'padding: 0' + theme.spacings.xsmall
      : 'padding: 0' + theme.spacings.xxxsmall};
    border: none;
  `}
`

export const Input = styled.input<TextFieldProps>`
  ${({ theme, iconPosition, fontSize }) => css`
    color: ${theme.colors.white2};
    font-family: ${theme.font.family};
    ${!!fontSize && wrapperModifiers[fontSize](theme)}
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
    padding-${iconPosition}: ${theme.spacings.xsmall};
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active{
        -webkit-box-shadow: 0 0 0 30px ${
          theme.colors.contrast
        } inset !important;
    }
    &:-webkit-autofill{
      -webkit-text-fill-color: ${theme.colors.white2} !important;
    }
  `}
`

export const Icon = styled.div<TextFieldProps>`
  ${({ theme, iconPosition }) => css`
    display: flex;
    width: 3.1rem;
    align-items: center;
    color: ${theme.colors.white2};
    order: ${iconPosition === 'right' ? 1 : 0};

    padding-${iconPosition}: ${theme.spacings.xxsmall};

    & > svg {
      width: 100%;
    }
  `}
`

import styled, { css, DefaultTheme } from 'styled-components'

type SelectProps = {
  backgroundColor?: 'contrast' | 'black' | 'contrast2' | 'contrast3'
}

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
  `
}

export const Wrapper = styled.select<SelectProps>`
  width: 100%;
  border-radius: 0.2rem;
  border: none;
  ${({ theme, backgroundColor }) => css`
    ${!!backgroundColor && wrapperModifiers[backgroundColor](theme)}
    color: ${theme.colors.white2};
    padding: ${theme.spacings.xxsmall};
  `}
`

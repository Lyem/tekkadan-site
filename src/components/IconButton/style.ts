import styled, { css } from 'styled-components'

export const Button = styled.button`
  border: none;
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast2};
    border-radius: ${theme.border.radius};
    //padding-left: ${theme.spacings.xxxsmall};
    //padding-right: ${theme.spacings.xxxsmall};
    padding: ${theme.spacings.xxxsmall};
  `}

  &:active {
    ${({ theme }) => css`
      background-color: ${theme.colors.contrast};
    `}
  }
`

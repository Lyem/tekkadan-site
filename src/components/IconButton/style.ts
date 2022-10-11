import styled, { css } from 'styled-components'

export const Button = styled.button`
  cursor: pointer;
  border: none;
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast2};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxxsmall};
  `}

  &:active {
    ${({ theme }) => css`
      background-color: ${theme.colors.contrast};
    `}
  }

  &:disabled {
    cursor: not-allowed;
    ${({ theme }) => css`
      background-color: ${theme.colors.contrast3};
    `}
  }
`

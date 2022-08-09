import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  cursor: pointer;
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast2};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxxsmall};
    margin-left: ${theme.spacings.xxxsmall};
    margin-bottom: ${theme.spacings.xxxsmall};
  `}
`

import styled, { css } from 'styled-components'

export const Tag = styled.h1`
  border-style: solid;
  border-width: 0px 0px 0px 4px;

  ${({ theme }) => css`
    padding-left: ${theme.spacings.xxsmall};
    font-size: ${theme.font.sizes.xlarge};
    line-height: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.bold};
    border-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
  `}
`

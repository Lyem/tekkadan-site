import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  margin-top: 30px;
  ${({ theme }) => css`
    padding-left: ${theme.spacings.xxxlarge};
    padding-right: ${theme.spacings.xxxlarge};
  `}
  ${media.lessThan('medium')`
    ${({ theme }) => css`
      padding-left: ${theme.spacings.small};
      padding-right: ${theme.spacings.small};
    `}
  `}
`

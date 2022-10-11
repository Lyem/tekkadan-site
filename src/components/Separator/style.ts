import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flexbox;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 15px;
`

export const Title = styled.h3`
  ${({ theme }) => css`
    size: ${theme.font.sizes.xlarge};
  `}
`

export const Icon = styled.div`
  margin-top: 3px;
`

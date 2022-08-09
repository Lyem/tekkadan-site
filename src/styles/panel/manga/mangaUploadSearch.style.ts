import styled, { css } from 'styled-components'

export const Wrapper = styled.div``

export const WrapperSearch = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
`

export const NoContent = styled.h1`
  text-align: center;
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.white3};
  `}
`

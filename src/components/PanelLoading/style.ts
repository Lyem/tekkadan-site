import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: block;
  text-align: center;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white2};
    font-size: ${theme.font.sizes.xlarge};
  `}
`

export const Loading = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  & > ${Title} {
    margin-left: -15%;
  }
`

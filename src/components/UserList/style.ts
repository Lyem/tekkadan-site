import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: inline-flex;
  width: 100%;
  margin-left: 10px;
  margin-top: 10px;
`

export const ContentWrapper = styled.div``

export const Photo = styled.div`
  & > img {
    height: 50px;
    width: 50px;
  }
`

export const Name = styled.h1`
  margin-left: 10px;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
  `}
`

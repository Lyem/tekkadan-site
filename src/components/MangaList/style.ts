import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  display: inline-flex;
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast2};
    color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
  `}
`

export const WrapperInfos = styled.div``

export const Cover = styled.div``

export const Title = styled.h1`
  margin-top: -15px;
  margin-left: 10px;
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
  `}
`

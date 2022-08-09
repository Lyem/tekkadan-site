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
  position: absolute;
  top: 40%;
  -ms-transform: translateY(-40%);
  transform: translateY(-40%);
  left: 55%;
  -ms-transform: translatex(-55%);
  transform: translatex(-55%);
  & > ${Title} {
    margin-left: -15%;
  }
`

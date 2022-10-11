import styled, { css } from 'styled-components'

type WrapperProps = {
  background: string
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, background }) => css`
    border-radius: ${theme.border.radius};
    ${!background
      ? `background-color: ${theme.colors.contrast}`
      : `background-image: url(${background});`}
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-left: ${theme.spacings.xxxlarge};
    padding-top: ${theme.spacings.xxlarge};
  `}
  height: 30vw;
  //height: 570px;
  cursor: pointer;
  margin-right: auto;
  margin-left: auto;
`

export const Title = styled.img`
  width: 30%;
`

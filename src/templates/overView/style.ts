import styled, { css } from 'styled-components'

export type OverViewProps = {
  fixed?: boolean
}

export type OverViewPropsBackground = {
  background: string
}

export const wrapper = styled.div``

export const BackgroundImage = styled.div<OverViewPropsBackground>`
  position: absolute;
  ${({ background }) => css`
    background-image: url(${background});
  `}
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 60vh;
  top: 0;
  z-index: -1;
`

export const ContentWrapper = styled.main<OverViewProps>`
  width: 100%;
  min-height: 45vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  ${({ fixed }) => css`
    ${fixed ? `margin-top: 26.6vh;` : `margin-top: 20vh;`}
  `}
`

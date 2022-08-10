import styled, { css } from 'styled-components'

type NavProps = {
  expand: boolean
}

export const Wrapper = styled.main<NavProps>`
  display: grid;
  transition: all 100ms 100ms linear;
  ${({ expand }) => css`
    grid: 100% / ${expand ? 260 : 56}px 1fr;
  `}
`

export const NavWrapper = styled.div<NavProps>`
  transition: all 100ms 100ms linear;
  ${({ expand }) => css`
    width: ${expand ? 260 : 56}px;
  `}
  margin-right: 10;
`

export const WrapperChild = styled.div`
  height: calc(100vh - 62px);
  overflow: hidden;
  overflow-y: scroll;
`

import styled, { css } from 'styled-components'

type NavProps = {
  expand: boolean
}

export const Wrapper = styled.main<NavProps>`
  display: grid;
  transition: all 90ms 90ms linear;
  ${({ expand }) => css`
    grid: 100% / ${expand ? 200 : 80}px 1fr;
  `}
`

export const NavWrapper = styled.div<NavProps>`
  transition: all 90ms 90ms linear;
  ${({ expand }) => css`
    width: ${expand ? 200 : 80}px;
  `}
  margin-right: 10;
`

export const WrapperChild = styled.div`
  display: flex;
  height: calc(100vh - 62px);
  overflow: hidden;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: space-between;
`

import styled, { css } from 'styled-components'
import * as LogoStyles from '../Logo/style'
import * as DropdownItemStyles from '../DropdownItem/style'

export type NavBarProps = {
  logged?: boolean
}

export const Wrapper = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxxlarge};
    align-items: center;
    display: flex;
    justify-content: space-between;
  `}
`

export const WrapperLinks = styled.div`
  align-items: center;
  display: flex;
  ${({ theme }) => css`
    ${LogoStyles.Wrapper} {
      margin-right: ${theme.spacings.small};
    }
  `}
`

export const Links = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-left: ${theme.spacings.medium};
  `}
  &:hover {
    cursor: pointer;
  }
`

export const WrapperUser = styled.ul`
  align-items: center;
  display: flex;
  list-style: none;
`

export const User = styled.button<NavBarProps>`
  background-color: transparent;
  border: 0;
  height: 3rem;
  & > img {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
  ${({ theme, logged }) => css`
    padding: ${theme.spacings.xxsmall};
    display: flex;
    align-items: center;
    ${!logged && `width: 4rem;`};
  `}
`

export const Notify = styled.button`
  background-color: transparent;
  border: 0;
  height: 3rem;
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall};
    margin: 0 ${theme.spacings.xsmall};
    display: flex;
    width: 3.5rem;
    align-items: center;
  `}
`

export const WrapperUserSubMenu = styled.ul`
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast2};
    border-radius: ${theme.border.radius};
  `}
  position: absolute;
  right: 0;
  list-style: none;
  margin: 0;
  opacity: 0.25;
  top: calc(100% + 0.8rem);
  transform: rotateX(-90deg);
  transform-origin: top center;
  transition: all 150ms 150ms ease-in;
  ${DropdownItemStyles.SubMenuLinks}:first-child {
    ${({ theme }) => css`
      padding-top: ${theme.spacings.xxsmall};
    `}
  }
`

export const WrapperUserItem = styled.li`
  position: relative;
  &:hover {
    ${WrapperUserSubMenu} {
      opacity: 1;
      transform: rotateX(0deg);
      transition-timing-function: ease-out;
    }
  }
`
